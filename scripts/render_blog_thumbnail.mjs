#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer";

const [source, destination, title, label = "Website Growth"] = process.argv.slice(2);
if (!source || !destination || !title) throw new Error("Usage: node scripts/render_blog_thumbnail.mjs SOURCE DESTINATION TITLE [LABEL]");
const data = fs.readFileSync(source).toString("base64");
const extension = path.extname(source).toLowerCase();
const mime = extension === ".png" ? "image/png" : extension === ".jpg" || extension === ".jpeg" ? "image/jpeg" : "image/webp";
const safe = (value) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const size = title.length <= 18 ? 64 : title.length <= 28 ? 56 : title.length <= 42 ? 48 : 40;
const html = `<!doctype html><style>*{box-sizing:border-box}body{margin:0;width:1280px;height:720px;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial;background:#050505}.frame{position:relative;width:1280px;height:720px;isolation:isolate}img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transform:scale(1.055);filter:saturate(1.02) contrast(1.04)}.shade{position:absolute;inset:0;background:radial-gradient(circle at 76% 24%,rgba(252,106,3,.08),transparent 31%),linear-gradient(90deg,rgba(0,0,0,.74),rgba(0,0,0,.47) 31%,rgba(0,0,0,.1) 61%,transparent)}.copy{position:absolute;left:72px;bottom:58px;width:640px}.label{display:inline-block;padding:8px 13px;border:1px solid rgba(252,106,3,.32);border-radius:999px;background:rgba(6,6,6,.3);color:rgba(255,244,235,.9);font-size:18px;font-weight:520}h1{margin:18px 0 0;color:#fff;font-size:${size}px;line-height:1.03;font-weight:540;letter-spacing:-1px;text-wrap:balance;text-shadow:0 8px 28px #000}.rule{width:76px;height:3px;margin-top:20px;border-radius:3px;background:linear-gradient(90deg,#fc6a03,rgba(255,255,255,.55))}.corner{position:absolute;top:34px;left:40px;width:7px;height:7px;border-radius:50%;background:#fc6a03}</style><main class="frame"><img src="data:${mime};base64,${data}"><div class="shade"></div><div class="corner"></div><section class="copy"><div class="label">${safe(label)}</div><h1>${safe(title)}</h1><div class="rule"></div></section></main>`;
const browser = await puppeteer.launch({
  headless: "new",
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  args: ["--disable-gpu", "--no-sandbox", "--disable-setuid-sandbox"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: "domcontentloaded" });
const png = "/private/tmp/crea8iv-thumbnail-overlay.png";
await page.screenshot({ path: png, type: "png" });
await browser.close();
fs.mkdirSync(path.dirname(destination), { recursive: true });
execFileSync("/opt/homebrew/bin/cwebp", ["-quiet", "-q", "88", png, "-o", destination]);
