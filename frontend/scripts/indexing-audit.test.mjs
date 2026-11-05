import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, writeFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { auditIndexing, isRobotsBlocked, readIndexingFields } from "./lib/indexing-audit.mjs";

test("Hostinger rules preserve every reviewed canonical redirect", async () => {
  const root = path.resolve(import.meta.dirname, "..");
  const redirects = JSON.parse(await readFile(path.join(root, "src/data/legacy-redirects.json"), "utf8"));
  const htaccess = await readFile(path.join(root, "public/.htaccess"), "utf8");
  let conditional = false;
  const rules = [];
  for (const line of htaccess.split(/\r?\n/)) {
    if (/^\s*RewriteCond\s/.test(line)) conditional = true;
    const match = line.match(/^\s*RewriteRule\s+(\S+)\s+(\S+)\s+\[([^\]]+)\]/);
    if (!match) continue;
    if (!conditional && /\bR=301\b/i.test(match[3])) rules.push({ pattern: new RegExp(match[1]), destination: match[2] });
    conditional = false;
  }
  for (const [source, destination] of Object.entries(redirects)) {
    const rule = rules.find((item) => item.pattern.test(source.slice(1)));
    assert.equal(rule?.destination, destination, source);
  }
});

test("Googlebot obeys the matching robots group and longest allow rule", () => {
  const robots = "User-agent: *\nAllow: /\nDisallow: /search/\nDisallow: /*/feed/\nAllow: /search/public/\n\nUser-agent: Bingbot\nAllow: /\n";
  assert.equal(isRobotsBlocked("/search/private/", robots), true);
  assert.equal(isRobotsBlocked("/blog/post/feed/", robots), true);
  assert.equal(isRobotsBlocked("/search/public/", robots), false);
  assert.equal(isRobotsBlocked("/search/private/", robots, "bingbot"), false);
  assert.equal(isRobotsBlocked("/website-development/", robots), false);
});

test("SEO extraction reads actual head tags in either attribute order", () => {
  const fields = readIndexingFields(`<head><link href='https://crea8ivmedia.com/service/' rel='canonical'><meta content='max-snippet:-1, NOINDEX' name='googlebot'></head><script>const example='<meta name="robots" content="index">';</script>`);
  assert.deepEqual(fields.canonicals, ["https://crea8ivmedia.com/service/"]);
  assert.equal(fields.noindex, true);
});

test("release audit rejects conflicting sitemap signals and redirect chains", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "crea8iv-indexing-"));
  const origin = "https://crea8ivmedia.com";
  async function page(slug, head) { await mkdir(path.join(root, slug), { recursive: true }); await writeFile(path.join(root, slug, "index.html"), `<head>${head}</head><body>Public content</body>`); }
  try {
    await page("service", `<link rel="canonical" href="${origin}/service/">`);
    await writeFile(path.join(root, "robots.txt"), "User-agent: *\nAllow: /\n");
    await writeFile(path.join(root, "sitemap.xml"), `<urlset><url><loc>${origin}/service/</loc></url></urlset>`);
    assert.deepEqual((await auditIndexing(root, { "/old/": "/service/" })).errors, []);
    await page("service", `<link href="${origin}/other/" rel="canonical"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0; url=/other/">`);
    await writeFile(path.join(root, "robots.txt"), "User-agent: *\nDisallow: /service/\n");
    const result = await auditIndexing(root, { "/old/": "/service/", "/service/": "/other/" });
    for (const expected of ["blocked for Googlebot", "matching canonical", "noindex", "redirect stub", "redirect source", "redirect chain", "missing destination"])
      assert.ok(result.errors.some((error) => error.includes(expected)), expected);
  } finally { await rm(root, { recursive: true, force: true }); }
});
