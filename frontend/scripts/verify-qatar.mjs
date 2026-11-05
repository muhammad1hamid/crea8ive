import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const outputRoot = path.resolve(process.env.QATAR_EXPORT_DIR || path.join(root, "out"));
const redirects = JSON.parse(await readFile(path.join(root, "src/data/qatar-redirects.json"), "utf8"));
const sitemapIndex = await readFile(path.join(outputRoot, "sitemap-index.xml"), "utf8");
const sitemap = await readFile(path.join(outputRoot, "sitemap.xml"), "utf8");
const robots = await readFile(path.join(outputRoot, "robots.txt"), "utf8");
const qatarPage = await readFile(path.join(outputRoot, "qatar/index.html"), "utf8");

assert.equal(Object.keys(redirects).length, 94, "Unexpected Qatar legacy redirect count");
assert.ok(Object.keys(redirects).every((source) => source.startsWith("/qa/") || source === "/qa/" || source === "/sitemap-qatar.xml"), "Unexpected source path in Qatar redirect map");
assert.ok(!sitemapIndex.includes("/qa/") && !sitemap.includes("/qa/"), "Legacy Qatar URLs remain in a sitemap");
assert.ok(!sitemapIndex.includes("sitemap-qatar.xml"), "Legacy Qatar sitemap is still referenced");
assert.ok(robots.includes("sitemap-index.xml") && robots.includes("sitemap.xml"), "Robots file is missing the active sitemap references");
assert.match(qatarPage, /<title>[^<]+<\/title>/, "Qatar landing page is missing a title");
assert.match(qatarPage, /<h1(?:\s|>)/, "Qatar landing page is missing its primary heading");

try {
  await access(path.join(outputRoot, "qa"));
  assert.fail("Retired /qa/ pages should not be exported");
} catch (error) {
  if (error?.code !== "ENOENT") throw error;
}

const targetFiles = new Map();
for (const [source, target] of Object.entries(redirects)) {
  const url = new URL(target, "https://crea8ivmedia.com");
  const relativePath = decodeURIComponent(url.pathname).replace(/^\/+/, "");
  const targetBase = path.resolve(outputRoot, relativePath);
  assert.ok(targetBase.startsWith(`${outputRoot}${path.sep}`) || targetBase === outputRoot, `${source}: target escapes export root`);
  const candidates = url.pathname.endsWith("/")
    ? [path.join(targetBase, "index.html")]
    : [targetBase, `${targetBase}.html`, path.join(targetBase, "index.html")];
  let filePath;
  for (const candidate of candidates) {
    try {
      await access(candidate);
      filePath = candidate;
      break;
    } catch {
      continue;
    }
  }
  assert.ok(filePath, `${source}: exported target is missing (${target})`);

  let html = targetFiles.get(filePath);
  if (!html) {
    html = await readFile(filePath, "utf8");
    targetFiles.set(filePath, html);
  }
  if (url.hash) {
    const id = decodeURIComponent(url.hash.slice(1));
    assert.ok(html.includes(`id="${id}"`) || html.includes(`name="${id}"`), `${source}: target anchor is missing (${target})`);
  }
}

console.log(`PASS: ${Object.keys(redirects).length} legacy redirects resolve to ${targetFiles.size} exported destinations; active Qatar sitemap and landing page are valid.`);
