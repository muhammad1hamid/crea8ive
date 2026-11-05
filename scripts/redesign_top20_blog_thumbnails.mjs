#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/%20/g, " ")), "..");
const frontendDir = path.join(root, "frontend");
const publicDir = path.join(frontendDir, "public");
const rssPath = path.join(frontendDir, "out/rss.xml");
const backupDir = path.join(root, "tmp/thumbnail-standard-backups-20260912");
const aiBackgroundDir = path.join(root, "project/design-assets/blog-thumbnail-backgrounds/top20-ai-series-2026-09-12");

const cleanSourcesByPublicPath = new Map([
  [
    "wp-content/uploads/2026/09/laravel-vs-wordpress-blog-thumbnail.webp",
    "/Users/mac/.codex/generated_images/01a09453-6832-7f92-a205-a9068d0bcf8c/call_jNmKYSIn6HfoKCI5DPKthdlO.png",
  ],
  [
    "wp-content/uploads/2026/09/why-cheap-websites-fail-blog-thumbnail.webp",
    "/Users/mac/.codex/generated_images/01a09453-6832-7f92-a205-a9068d0bcf8c/call_Z22W3l97vsqsHi9agUO8OIHE.png",
  ],
]);

const aiBackgroundsByTitle = new Map([
  ["Why Cheap Websites Fail", "why-cheap-websites-fail.png"],
  ["Laravel vs WordPress", "laravel-vs-wordpress.png"],
  ["Next.js vs WordPress", "nextjs-vs-wordpress.png"],
  ["Custom Website vs WordPress", "custom-website-vs-wordpress.png"],
  ["Website vs Landing Page", "website-vs-landing-page.png"],
  ["Building AI Authority", "building-ai-authority.png"],
  ["Top AI Search Ranking Factors", "top-ai-search-ranking-factors.png"],
  ["Why Websites Lose AI Visibility", "why-websites-lose-ai-visibility.png"],
  ["AI Overviews Complete Guide", "ai-overviews-complete-guide.png"],
  ["Semantic Search in 2026", "semantic-search-in-2026.png"],
  ["Knowledge Graph for Local Businesses", "knowledge-graph-for-local-businesses.png"],
  ["AI Citation Optimization Guide", "ai-citation-optimization-guide.png"],
  ["How Businesses Get Mentioned by ChatGPT", "how-businesses-get-mentioned-by-chatgpt.png"],
  ["Boosted Posts vs Facebook Ads in Pakistan", "boosted-posts-vs-facebook-ads-in-pakistan.png"],
  ["AI Visibility Strategy", "ai-visibility-strategy.png"],
  ["LLMO Explained", "llmo-explained.png"],
  ["AEO vs SEO", "aeo-vs-seo.png"],
  ["GEO vs SEO", "geo-vs-seo.png"],
  ["What Is AI Search Optimization?", "what-is-ai-search-optimization.png"],
  ["The Future of AI Search in 2026", "future-of-ai-search-2026.png"],
]);

function decodeXml(value) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function stripTags(value) {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function fitTitle(title) {
  const length = title.length;
  if (length <= 16) return 66;
  if (length <= 24) return 60;
  if (length <= 34) return 54;
  if (length <= 44) return 48;
  if (length <= 58) return 41;
  if (length <= 72) return 35;
  return 31;
}

function categoryLabel(title, category) {
  const value = `${title} ${category}`.toLowerCase();
  if (value.includes("facebook") || value.includes("ads") || value.includes("boosted")) return "Paid Growth";
  if (value.includes("wordpress") || value.includes("website") || value.includes("landing page")) return "Website Growth";
  if (value.includes("citation") || value.includes("chatgpt") || value.includes("visibility") || value.includes("ai") || value.includes("geo") || value.includes("aeo") || value.includes("llmo") || value.includes("semantic") || value.includes("knowledge graph")) return "AI Visibility";
  return category || "Growth Guide";
}

function backupPathFor(publicPath) {
  return path.join(backupDir, publicPath.replace(/\//g, "__"));
}

const rss = fs.readFileSync(rssPath, "utf8");
const items = [...rss.matchAll(/<item>([\s\S]*?)<\/item>/g)]
  .slice(0, 20)
  .map((match) => {
    const source = match[1];
    const title = stripTags(decodeXml(source.match(/<title>([\s\S]*?)<\/title>/)?.[1] || ""));
    const category = stripTags(decodeXml(source.match(/<category><!\[CDATA\[([\s\S]*?)\]\]><\/category>/)?.[1] || ""));
    const publicPath = stripTags(decodeXml(source.match(/<image>https:\/\/crea8ivmedia\.com\/([^<]+)<\/image>/)?.[1] || ""));
    return {
      title,
      category,
      label: categoryLabel(title, category),
      publicPath,
      outputPath: path.join(publicDir, publicPath),
    };
  })
  .filter((item) => item.title && item.publicPath && fs.existsSync(item.outputPath));

console.log(`Redesigning ${items.length} top blog thumbnails.`);

const browser = await puppeteer.launch({ headless: "new" });
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 1 });

for (const [index, item] of items.entries()) {
  const aiBackground = aiBackgroundsByTitle.get(item.title);
  const aiBackgroundPath = aiBackground ? path.join(aiBackgroundDir, aiBackground) : "";
  const cleanSource = cleanSourcesByPublicPath.get(item.publicPath);
  const sourcePath = aiBackgroundPath && fs.existsSync(aiBackgroundPath)
    ? aiBackgroundPath
    : cleanSource && fs.existsSync(cleanSource)
    ? cleanSource
    : fs.existsSync(backupPathFor(item.publicPath))
      ? backupPathFor(item.publicPath)
      : item.outputPath;
  const image = fs.readFileSync(sourcePath).toString("base64");
  const extension = path.extname(sourcePath).toLowerCase();
  const mime = extension === ".png" ? "image/png" : extension === ".jpg" || extension === ".jpeg" ? "image/jpeg" : "image/webp";
  const titleSize = fitTitle(item.title);

  const html = `<!doctype html>
  <html>
    <head>
      <style>
        * { box-sizing: border-box; }
        body { margin: 0; width: 1280px; height: 720px; overflow: hidden; font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif; background: #050505; }
        .frame { position: relative; width: 1280px; height: 720px; isolation: isolate; }
        img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transform: scale(1.055); filter: saturate(1.02) contrast(1.04) brightness(1.02); }
        .shade { position: absolute; inset: 0; background:
          radial-gradient(circle at 80% 21%, rgba(252,106,3,.08), transparent 32%),
          linear-gradient(90deg, rgba(0,0,0,.72) 0%, rgba(0,0,0,.48) 29%, rgba(0,0,0,.12) 58%, rgba(0,0,0,0) 100%),
          linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.04) 54%, rgba(0,0,0,.18) 100%);
          z-index: 1;
        }
        .grain { position: absolute; inset: 0; z-index: 2; opacity: .08; background-image: linear-gradient(115deg, rgba(255,255,255,.035), transparent 30%, rgba(252,106,3,.045) 66%, transparent 82%); }
        .copy { position: absolute; left: 72px; bottom: 58px; width: 650px; z-index: 3; }
        .copy:before { content: ""; position: absolute; left: -28px; top: -24px; width: 680px; height: calc(100% + 54px); border-radius: 24px; background: linear-gradient(90deg, rgba(0,0,0,.34), rgba(0,0,0,.18) 58%, rgba(0,0,0,0)); filter: blur(10px); z-index: -1; }
        .label { display: inline-flex; align-items: center; max-width: 560px; padding: 8px 13px; border: 1px solid rgba(252,106,3,.28); background: rgba(8,8,8,.34); color: rgba(255,244,235,.88); border-radius: 999px; font-size: 18px; font-weight: 520; line-height: 1; box-shadow: 0 10px 28px rgba(0,0,0,.22); text-shadow: 0 2px 10px rgba(0,0,0,.58); }
        h1 { margin: 18px 0 0; color: rgba(255,255,255,.96); font-size: ${titleSize}px; max-width: 650px; line-height: 1.02; font-weight: 560; letter-spacing: 0; text-wrap: balance; text-shadow: 0 8px 28px rgba(0,0,0,.82), 0 1px 2px rgba(0,0,0,.48); }
        .rule { width: 76px; height: 3px; margin-top: 21px; border-radius: 999px; background: linear-gradient(90deg, rgba(252,106,3,.82), rgba(255,255,255,.54)); box-shadow: 0 0 12px rgba(252,106,3,.22); }
        .corner { position: absolute; left: 40px; top: 34px; width: 7px; height: 7px; border-radius: 999px; background: rgba(252,106,3,.72); box-shadow: 0 0 16px rgba(252,106,3,.22); z-index: 3; }
      </style>
    </head>
    <body>
      <main class="frame">
        <img src="data:${mime};base64,${image}" alt="">
        <div class="shade"></div>
        <div class="grain"></div>
        <div class="corner"></div>
        <section class="copy">
          <div class="label">${escapeHtml(item.label)}</div>
          <h1>${escapeHtml(item.title)}</h1>
          <div class="rule"></div>
        </section>
      </main>
    </body>
  </html>`;

  await page.setContent(html, { waitUntil: "domcontentloaded", timeout: 0 });
  const pngPath = path.join("/private/tmp", `crea8iv-top20-redesign-${index}.png`);
  await page.screenshot({ path: pngPath, type: "png" });
  execFileSync("/opt/homebrew/bin/cwebp", ["-quiet", "-q", "88", pngPath, "-o", item.outputPath]);
  console.log(`${index + 1}/20 ${item.title}`);
}

await browser.close();
