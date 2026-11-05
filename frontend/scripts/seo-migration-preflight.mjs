import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const DEFAULT_LIVE_SITEMAP = "https://crea8ivmedia.com/sitemap.xml";
const DEFAULT_LOCAL_SITEMAP = path.join(process.cwd(), "out", "sitemap.xml");

function getArg(name, fallback) {
  const prefix = `--${name}=`;
  const found = process.argv.find((arg) => arg.startsWith(prefix));
  return found ? found.slice(prefix.length) : fallback;
}

async function loadText(source) {
  if (/^https?:\/\//i.test(source)) {
    const response = await fetch(source, {
      headers: { "user-agent": "Crea8ivMediaMigrationPreflight/1.0" },
    });

    if (!response.ok) {
      throw new Error(`${source} returned HTTP ${response.status}`);
    }

    return response.text();
  }

  return readFile(source, "utf8");
}

function extractUrls(xml) {
  const urls = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)]
    .map((match) => match[1].trim())
    .filter(Boolean);

  return [...new Set(urls)].sort();
}

function diff(left, right) {
  const rightSet = new Set(right);
  return left.filter((item) => !rightSet.has(item));
}

function printList(label, items) {
  console.log(`${label}: ${items.length}`);
  for (const item of items) {
    console.log(`  - ${item}`);
  }
}

const liveSource = getArg("live", DEFAULT_LIVE_SITEMAP);
const localSource = getArg("local", DEFAULT_LOCAL_SITEMAP);

const requiredExportFiles = [
  "out/index.html",
  "out/robots.txt",
  "out/sitemap.xml",
  "out/sitemap_index.xml",
  "out/.htaccess",
];

for (const file of requiredExportFiles) {
  if (!existsSync(path.join(process.cwd(), file))) {
    throw new Error(`Missing required export file: ${file}`);
  }
}

const [liveXml, localXml] = await Promise.all([
  loadText(liveSource),
  loadText(localSource),
]);

const liveUrls = extractUrls(liveXml);
const localUrls = extractUrls(localXml);
const missing = diff(liveUrls, localUrls);
const extra = diff(localUrls, liveUrls);

console.log("Crea8iv Media SEO migration preflight");
console.log(`Live sitemap:  ${liveSource}`);
console.log(`Local sitemap: ${localSource}`);
console.log(`Live URLs:     ${liveUrls.length}`);
console.log(`Local URLs:    ${localUrls.length}`);
printList("Missing locally", missing);
printList("Extra locally", extra);

if (missing.length || extra.length) {
  console.error("FAILED: sitemap URL parity is not exact. Do not deploy.");
  process.exit(1);
}

console.log("PASSED: exported sitemap exactly matches the live sitemap URL set.");
