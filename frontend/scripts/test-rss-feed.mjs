#!/usr/bin/env node
/**
 * Post-build validation for the Pinterest/RSS feed (out/rss.xml + out/feed.xml).
 *
 * Run after `npm run export`:
 *   node scripts/test-rss-feed.mjs
 *
 * Validates:
 *  - well-formed XML (via `xmllint --noout`, if available)
 *  - RSS 2.0 root + required namespaces
 *  - every <item> has: title, link, guid isPermaLink="true", pubDate (RFC-822),
 *    dc:creator, category, description, image, media:content, enclosure
 *  - every image/media:content/enclosure URL is absolute (Pinterest requires this)
 *  - rss.xml and feed.xml are identical (same generator, both are aliases)
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "out");

let failures = 0;
let passes = 0;

function check(label, condition) {
  if (condition) {
    passes += 1;
    console.log(`  ✓ ${label}`);
  } else {
    failures += 1;
    console.log(`  ✗ ${label}`);
  }
}

function readFeed(filename) {
  const file = path.join(OUT_DIR, filename);
  if (!existsSync(file)) {
    throw new Error(`${filename} not found in out/ — run \`npm run export\` first`);
  }
  return readFileSync(file, "utf8");
}

function xmllintCheck(filename) {
  const file = path.join(OUT_DIR, filename);
  try {
    execFileSync("xmllint", ["--noout", file], { stdio: "pipe" });
    return true;
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log(`  (xmllint not installed — skipping well-formedness check for ${filename})`);
      return true;
    }
    console.log(String(error.stderr || error.message));
    return false;
  }
}

function extractItems(xml) {
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m) => m[1]);
}

console.log("=== RSS feed validation ===\n");

console.log("rss.xml / feed.xml exist:");
const rssXml = readFeed("rss.xml");
const feedXml = readFeed("feed.xml");
check("rss.xml is non-empty", rssXml.length > 0);
check("feed.xml is non-empty", feedXml.length > 0);
// Both routes independently call `new Date()` during static generation, so
// <lastBuildDate> can legitimately differ by a second or two — normalize it
// before comparing the rest of the (otherwise identical) generated content.
const stripBuildDate = (xml) => xml.replace(/<lastBuildDate>[^<]*<\/lastBuildDate>/, "<lastBuildDate/>");
check(
  "rss.xml and feed.xml are identical (same generator, ignoring lastBuildDate)",
  stripBuildDate(rssXml) === stripBuildDate(feedXml)
);

console.log("\nWell-formed XML:");
check("rss.xml passes xmllint --noout", xmllintCheck("rss.xml"));
check("feed.xml passes xmllint --noout", xmllintCheck("feed.xml"));

console.log("\nRSS 2.0 structure:");
check('starts with <?xml version="1.0" encoding="UTF-8"?>', rssXml.startsWith('<?xml version="1.0" encoding="UTF-8"?>'));
check('has <rss version="2.0" ...>', /<rss\s+version="2\.0"/.test(rssXml));
check("declares media: namespace", /xmlns:media="http:\/\/search\.yahoo\.com\/mrss\/"/.test(rssXml));
check("declares dc: namespace", /xmlns:dc="http:\/\/purl\.org\/dc\/elements\/1\.1\/"/.test(rssXml));
check("declares content: namespace", /xmlns:content="http:\/\/purl\.org\/rss\/1\.0\/modules\/content\/"/.test(rssXml));
check("declares atom: namespace", /xmlns:atom="http:\/\/www\.w3\.org\/2005\/Atom"/.test(rssXml));
check("has <channel><title>", /<channel>[\s\S]*<title>/.test(rssXml));
check("has channel <image><url>", /<image>\s*<url>/.test(rssXml));
check('has self-referencing <atom:link rel="self">', /<atom:link[^>]*rel="self"/.test(rssXml));

const items = extractItems(rssXml);
console.log(`\nArticles detected: ${items.length}`);
check("at least one <item> present", items.length > 0);
check(`item count within the ${50} cap`, items.length <= 50);

console.log("\nPer-item required fields (Pinterest + RSS 2.0):");
const RFC822 = /^[A-Za-z]{3}, \d{2} [A-Za-z]{3} \d{4} \d{2}:\d{2}:\d{2} GMT$/;
let allTitles = true;
let allLinks = true;
let allGuidPermalink = true;
let allPubDatesValid = true;
let allCreators = true;
let allCategories = true;
let allDescriptions = true;
let allImages = true;
let allMediaContent = true;
let allEnclosures = true;
let allImagesAbsolute = true;
let allImagesSameDomain = true;

for (const item of items) {
  if (!/<title>[\s\S]*?<\/title>/.test(item)) allTitles = false;
  if (!/<link>https?:\/\/[^<]+<\/link>/.test(item)) allLinks = false;
  if (!/<guid isPermaLink="true">https?:\/\/[^<]+<\/guid>/.test(item)) allGuidPermalink = false;

  const pubDateMatch = item.match(/<pubDate>([^<]+)<\/pubDate>/);
  if (!pubDateMatch || !RFC822.test(pubDateMatch[1])) allPubDatesValid = false;

  if (!/<dc:creator>/.test(item)) allCreators = false;
  if (!/<category(?:\s[^>]*)?>/.test(item)) allCategories = false;
  if (!/<description>/.test(item)) allDescriptions = false;
  if (!/<image>https?:\/\/[^<]+<\/image>/.test(item)) allImages = false;
  if (!/<media:content\s+url="https?:\/\/[^"]+"\s+medium="image"\s*\/>/.test(item)) allMediaContent = false;
  if (!/<enclosure\s+url="https?:\/\/[^"]+"\s+length="\d+"\s+type="image\/[a-z+]+"\s*\/>/.test(item)) allEnclosures = false;

  const imageMatch = item.match(/<image>([^<]+)<\/image>/);
  if (imageMatch) {
    if (!/^https?:\/\//.test(imageMatch[1])) allImagesAbsolute = false;
    if (!imageMatch[1].startsWith("https://crea8ivmedia.com")) allImagesSameDomain = false;
  } else {
    allImagesAbsolute = false;
  }
}

check("every item has <title>", allTitles);
check("every item has absolute <link>", allLinks);
check('every item has <guid isPermaLink="true">', allGuidPermalink);
check("every item has a valid RFC-822 <pubDate>", allPubDatesValid);
check("every item has <dc:creator> (author)", allCreators);
check("every item has at least one <category>", allCategories);
check("every item has <description>", allDescriptions);
check("every item has <image> (Pinterest)", allImages);
check("every item has <media:content medium=\"image\">", allMediaContent);
check("every item has <enclosure> with type + length", allEnclosures);
check("every image URL is absolute (never relative)", allImagesAbsolute);
check("every image URL is on https://crea8ivmedia.com", allImagesSameDomain);

console.log(`\n=== ${passes} passed, ${failures} failed ===`);

if (failures > 0) {
  process.exitCode = 1;
} else {
  console.log("\nFeed is Pinterest-ready.");
}
