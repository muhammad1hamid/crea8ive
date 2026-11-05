#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const frontendDir = path.join(root, "frontend");
const rssPath = path.join(frontendDir, "out", "rss.xml");
const publicDir = path.join(frontendDir, "public");
const backupDir = path.join(root, "tmp", "thumbnail-standard-backups-20260912");

if (!fs.existsSync(rssPath)) {
  throw new Error(`RSS file not found. Run npm run export first: ${rssPath}`);
}

fs.mkdirSync(backupDir, { recursive: true });

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

function cleanTitle(title) {
  const withoutYear = title.replace(/\s*\((?:20\d{2}|Step-by-Step,\s*20\d{2})\)\s*/gi, " ");
  const beforeColon = withoutYear.split(":")[0].trim();
  const source = beforeColon.length >= 12 ? beforeColon : withoutYear.trim();
  return source
    .replace(/\bThe Complete Guide\b/gi, "Guide")
    .replace(/\bWhat Every Business Needs to Know\b/gi, "Business Guide")
    .replace(/\bHow to\b/gi, "How To")
    .replace(/\s+/g, " ")
    .trim();
}

function kickerFor(title, category) {
  const value = `${title} ${category}`.toLowerCase();
  if (value.includes("wordpress") || value.includes("website") || value.includes("web design")) {
    return "Website Growth";
  }
  if (value.includes("ai") || value.includes("geo") || value.includes("aeo") || value.includes("llmo") || value.includes("semantic")) {
    return "AI Visibility";
  }
  if (value.includes("google business") || value.includes("maps") || value.includes("local seo") || value.includes("reviews")) {
    return "Local SEO";
  }
  if (value.includes("ads") || value.includes("facebook") || value.includes("instagram") || value.includes("meta")) {
    return "Paid Growth";
  }
  if (value.includes("founder") || value.includes("syed qamar")) {
    return "Brand Authority";
  }
  if (value.includes("whatsapp") || value.includes("automation")) {
    return "Automation";
  }
  return category || "Growth Guide";
}

function fontSizeFor(title) {
  const length = title.length;
  if (length <= 16) return 82;
  if (length <= 24) return 76;
  if (length <= 34) return 68;
  if (length <= 44) return 58;
  if (length <= 56) return 50;
  return 44;
}

const rss = fs.readFileSync(rssPath, "utf8");
const itemMatches = [...rss.matchAll(/<item>([\s\S]*?)<\/item>/g)];
const items = [];
const seenPaths = new Set();

for (const match of itemMatches) {
  const item = match[1];
  const titleMatch = item.match(/<title>([\s\S]*?)<\/title>/);
  const categoryMatch = item.match(/<category><!\[CDATA\[([\s\S]*?)\]\]><\/category>/);
  const imageMatch = item.match(/<image>([\s\S]*?)<\/image>/);
  if (!titleMatch || !imageMatch) continue;

  const title = stripTags(decodeXml(titleMatch[1]));
  const category = categoryMatch ? stripTags(decodeXml(categoryMatch[1])) : "";
  const imageUrl = stripTags(decodeXml(imageMatch[1]));
  if (!imageUrl.startsWith("https://crea8ivmedia.com/wp-content/")) continue;

  const publicPath = imageUrl.replace("https://crea8ivmedia.com/", "");
  const absolutePath = path.join(publicDir, publicPath);
  if (!fs.existsSync(absolutePath)) continue;
  if (seenPaths.has(absolutePath)) continue;
  seenPaths.add(absolutePath);

  items.push({
    title: cleanTitle(title),
    kicker: kickerFor(title, category),
    absolutePath,
    publicPath,
  });
}

console.log(`Applying thumbnail standard to ${items.length} images.`);

const browser = await puppeteer.launch({ headless: "new" });
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 1 });

for (const [index, item] of items.entries()) {
  const original = fs.readFileSync(item.absolutePath);
  const backupPath = path.join(backupDir, item.publicPath.replace(/\//g, "__"));
  if (!fs.existsSync(backupPath)) {
    fs.writeFileSync(backupPath, original);
  }

  const mime = item.absolutePath.endsWith(".png") ? "image/png" : item.absolutePath.endsWith(".jpg") || item.absolutePath.endsWith(".jpeg") ? "image/jpeg" : "image/webp";
  const image = original.toString("base64");
  const titleSize = fontSizeFor(item.title);
  const html = `<!doctype html>
  <html>
    <head>
      <style>
        * { box-sizing: border-box; }
        body { margin: 0; width: 1280px; height: 720px; overflow: hidden; font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif; background: #050505; }
        .frame { position: relative; width: 1280px; height: 720px; }
        img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .shade { position: absolute; inset: 0; background:
          linear-gradient(90deg, rgba(0,0,0,.91) 0%, rgba(0,0,0,.76) 27%, rgba(0,0,0,.30) 60%, rgba(0,0,0,.10) 100%),
          linear-gradient(180deg, rgba(0,0,0,.22) 0%, rgba(0,0,0,.04) 48%, rgba(0,0,0,.42) 100%);
        }
        .brand { position: absolute; top: 50px; left: 70px; display: flex; align-items: center; gap: 12px; color: rgba(255,255,255,.80); font-size: 21px; font-weight: 900; letter-spacing: .08em; text-transform: uppercase; text-shadow: 0 5px 24px rgba(0,0,0,.65); }
        .mark { width: 14px; height: 14px; border-radius: 50%; background: #FC6A03; box-shadow: 0 0 24px rgba(252,106,3,.88); }
        .copy { position: absolute; left: 70px; bottom: 72px; width: 610px; }
        .kicker { display: inline-flex; align-items: center; max-width: 560px; padding: 11px 17px; border: 1px solid rgba(252,106,3,.55); background: rgba(252,106,3,.17); color: #fff4e9; border-radius: 999px; font-size: 23px; font-weight: 900; line-height: 1; box-shadow: 0 18px 50px rgba(252,106,3,.18); text-shadow: 0 3px 18px rgba(0,0,0,.55); }
        h1 { margin: 24px 0 0; color: #fff; font-size: ${titleSize}px; line-height: .95; font-weight: 950; letter-spacing: 0; text-wrap: balance; text-shadow: 0 8px 36px rgba(0,0,0,.76), 0 2px 2px rgba(0,0,0,.5); }
        .rule { width: 116px; height: 7px; margin-top: 28px; border-radius: 999px; background: linear-gradient(90deg, #FC6A03, rgba(255,255,255,.86)); box-shadow: 0 0 30px rgba(252,106,3,.67); }
      </style>
    </head>
    <body>
      <main class="frame">
        <img src="data:${mime};base64,${image}" alt="">
        <div class="shade"></div>
        <div class="brand"><span class="mark"></span><span>CREA8IV MEDIA</span></div>
        <section class="copy">
          <div class="kicker">${item.kicker}</div>
          <h1>${item.title.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</h1>
          <div class="rule"></div>
        </section>
      </main>
    </body>
  </html>`;

  await page.setContent(html, { waitUntil: "domcontentloaded", timeout: 0 });
  const pngPath = path.join("/private/tmp", `crea8iv-thumbnail-standard-${index}.png`);
  await page.screenshot({ path: pngPath, type: "png" });
  execFileSync("/opt/homebrew/bin/cwebp", ["-quiet", "-q", "86", pngPath, "-o", item.absolutePath]);
  console.log(`${index + 1}/${items.length} ${item.publicPath}`);
}

await browser.close();
