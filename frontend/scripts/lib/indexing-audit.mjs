import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const origin = "https://crea8ivmedia.com";
const unescapeXml = (value) => value.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(["'])(.*?)\2/g)].map((match) => [match[1].toLowerCase(), unescapeXml(match[3])]));
}

export function readIndexingFields(html) {
  const head = html.split(/<\/head\s*>/i)[0];
  const canonicals = [...head.matchAll(/<link\b[^>]*>/gi)].map(([tag]) => attributes(tag)).filter((attrs) => attrs.rel?.toLowerCase() === "canonical").map((attrs) => attrs.href);
  const robots = [...head.matchAll(/<meta\b[^>]*>/gi)].map(([tag]) => attributes(tag)).filter((attrs) => /^(robots|googlebot)$/i.test(attrs.name || "")).map((attrs) => attrs.content || "");
  return { canonicals, noindex: robots.some((value) => /(?:^|[\s,])(?:noindex|none)(?:$|[\s,])/i.test(value)), refresh: /<meta\b[^>]*http-equiv=["']refresh["']/i.test(head) };
}

export function isRobotsBlocked(pathname, text, agent = "googlebot") {
  const groups = [];
  let group = null;
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.replace(/#.*/, "").trim();
    const separator = line.indexOf(":");
    if (separator < 0) continue;
    const field = line.slice(0, separator).toLowerCase();
    const value = line.slice(separator + 1).trim();
    if (field === "user-agent") {
      if (!group || group.rules.length) { group = { agents: [], rules: [] }; groups.push(group); }
      group.agents.push(value.toLowerCase());
    } else if (group && ["allow", "disallow"].includes(field) && value) group.rules.push({ allow: field === "allow", pattern: value });
  }
  const exact = groups.filter((item) => item.agents.includes(agent));
  const selected = exact.length ? exact : groups.filter((item) => item.agents.includes("*"));
  const matches = selected.flatMap((item) => item.rules).filter(({ pattern }) => {
    const anchored = pattern.endsWith("$");
    const source = (anchored ? pattern.slice(0, -1) : pattern).split("*").map((part) => part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join(".*");
    return new RegExp(`^${source}${anchored ? "$" : ""}`).test(pathname);
  }).sort((a, b) => b.pattern.replace(/[*$]/g, "").length - a.pattern.replace(/[*$]/g, "").length || Number(b.allow) - Number(a.allow));
  return matches.length > 0 && !matches[0].allow;
}

export async function auditIndexing(outputDir, legacyRedirects, qatarRedirects = {}) {
  const sitemap = await readFile(path.join(outputDir, "sitemap.xml"), "utf8");
  const robots = await readFile(path.join(outputDir, "robots.txt"), "utf8");
  const entries = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, block]) => ({ url: unescapeXml(block.match(/<loc>(.*?)<\/loc>/)?.[1] || ""), lastmod: block.match(/<lastmod>(.*?)<\/lastmod>/)?.[1] }));
  const errors = [];
  const seen = new Set();
  for (const { url, lastmod } of entries) {
    let parsed;
    try { parsed = new URL(url); } catch { errors.push(`${url}: invalid absolute URL`); continue; }
    const pathname = parsed.pathname;
    if (seen.has(url)) errors.push(`${url}: duplicate sitemap URL`);
    seen.add(url);
    if (parsed.origin !== origin || parsed.search || parsed.hash || !pathname.endsWith("/")) errors.push(`${url}: sitemap must use canonical HTTPS page URLs`);
    if (Object.hasOwn(legacyRedirects, pathname) || Object.hasOwn(qatarRedirects, pathname) || /^\/(website-portfolio|results)\/[^/]+\/$/.test(pathname)) errors.push(`${url}: redirect source must not be in the sitemap`);
    if (isRobotsBlocked(pathname, robots)) errors.push(`${url}: blocked for Googlebot by robots.txt`);
    if (lastmod && (!Number.isFinite(Date.parse(lastmod)) || Date.parse(lastmod) > Date.now())) errors.push(`${url}: invalid or future lastmod`);
    const file = path.resolve(outputDir, `.${decodeURIComponent(pathname)}`, "index.html");
    if (!file.startsWith(path.resolve(outputDir) + path.sep)) { errors.push(`${url}: path escapes output directory`); continue; }
    let html;
    try { html = await readFile(file, "utf8"); } catch { errors.push(`${url}: missing exported page`); continue; }
    const fields = readIndexingFields(html);
    if (fields.canonicals.length !== 1 || fields.canonicals[0] !== url) errors.push(`${url}: expected one matching canonical, received ${JSON.stringify(fields.canonicals)}`);
    if (fields.noindex) errors.push(`${url}: rendered noindex directive`);
    if (fields.refresh) errors.push(`${url}: rendered redirect stub`);
  }
  if (!entries.length) errors.push("Sitemap has no page URLs");

  // Known migrations must resolve directly to a real, indexable destination.
  for (const [source, destination] of Object.entries(legacyRedirects)) {
    if (Object.hasOwn(legacyRedirects, destination) || Object.hasOwn(qatarRedirects, destination)) errors.push(`${source}: redirect chain through ${destination}`);
    const file = path.join(outputDir, destination.replace(/^\//, ""), "index.html");
    try {
      if (!(await stat(file)).isFile()) throw new Error("Not a file");
      const { canonicals, noindex } = readIndexingFields(await readFile(file, "utf8"));
      if (noindex || canonicals[0] !== `${origin}${destination}`) errors.push(`${source}: destination is not indexable and canonical`);
    } catch { errors.push(`${source}: missing destination ${destination}`); }
  }
  return { sitemapPages: entries.length, reviewedRedirects: Object.keys(legacyRedirects).length, errors };
}
