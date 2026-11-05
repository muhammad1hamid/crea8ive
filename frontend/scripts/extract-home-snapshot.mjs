#!/usr/bin/env node
/**
 * One-time content snapshot: extracts the homepage's WordPress-rendered
 * content region from the LIVE static site's HTML into
 * content-snapshot/home.json.
 *
 * Why: WordPress no longer serves crea8ivmedia.com (REST API and all
 * wp-content plugin/theme assets 404 — verified 2026-07-06), so builds can't
 * fetch the homepage content from the API anymore. The deployed HTML is the
 * canonical surviving copy of that content. lib/wordpress falls back to this
 * snapshot when the API is unreachable, keeping the homepage byte-identical.
 *
 * The extracted region is WordPressContent's SSR output: the inline <style>
 * blocks it renders, immediately followed by the `.tx-page-content` container.
 * Re-running the (idempotent) page transforms over this content is a no-op.
 *
 * Usage: node scripts/extract-home-snapshot.mjs [source-url]
 */
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Source may be a URL or a local HTML file (e.g. the July 3 static export's
// index.html — the last build rendered with live WordPress data).
const SOURCE = process.argv[2] || "https://crea8ivmedia.com/";
const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "content-snapshot", "home.json");

let html;
if (/^https?:\/\//.test(SOURCE)) {
  const res = await fetch(SOURCE, { headers: { "User-Agent": "crea8iv-snapshot" } });
  if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${SOURCE}`);
  html = await res.text();
} else {
  html = readFileSync(SOURCE, "utf8");
}

const meta = (re) => {
  const m = html.match(re);
  return m ? m[1].trim() : "";
};
const title = meta(/<title>([^<]*)<\/title>/i);
const description = meta(/<meta name="description" content="([^"]*)"/i);
const canonical = meta(/<link rel="canonical" href="([^"]*)"/i) || "https://crea8ivmedia.com/";
const ogImage = meta(/<meta property="og:image" content="([^"]*)"/i);

// Locate the WordPressContent container. The className may carry extra tokens
// (e.g. the wpcss-guard added later), so match on the tx-page-content token.
const openMatch = html.match(/<div[^>]*class="[^"]*\btx-page-content\b[^"]*"[^>]*>/i);
if (!openMatch) throw new Error("tx-page-content container not found in source HTML");
const openIdx = html.indexOf(openMatch[0]);

// Balanced-scan to the matching </div>.
let depth = 0;
const tagRe = /<\/?div\b[^>]*>/gi;
tagRe.lastIndex = openIdx;
let end = -1;
let m;
while ((m = tagRe.exec(html))) {
  if (m[0][1] === "/") depth -= 1;
  else if (!m[0].endsWith("/>")) depth += 1;
  if (depth === 0) {
    end = m.index;
    break;
  }
}
if (end < 0) throw new Error("Unbalanced tx-page-content container");
const inner = html.slice(openIdx + openMatch[0].length, end);

// Collect the consecutive <style> blocks WordPressContent rendered directly
// before its container (per-section colours/backgrounds).
const before = html.slice(0, openIdx);
const styleBlocks = [];
let cursor = before.length;
for (;;) {
  const trimmed = before.slice(0, cursor).replace(/\s+$/, "");
  if (!trimmed.toLowerCase().endsWith("</style>")) break;
  const start = trimmed.toLowerCase().lastIndexOf("<style");
  if (start < 0) break;
  styleBlocks.unshift(trimmed.slice(start));
  cursor = start;
}

const contentHtml = styleBlocks.join("\n") + inner;
if (contentHtml.length < 10000) {
  throw new Error(`Extracted content suspiciously small (${contentHtml.length} chars) — aborting`);
}

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(
  OUT,
  JSON.stringify(
    {
      extractedAt: new Date().toISOString(),
      source: SOURCE,
      slug: "home",
      link: canonical,
      title,
      description,
      ogImage,
      contentHtml,
    },
    null,
    2
  )
);
console.log(`Snapshot written: ${OUT}`);
console.log(`  title: ${title}`);
console.log(`  styles: ${styleBlocks.length} block(s), content: ${contentHtml.length} chars`);
