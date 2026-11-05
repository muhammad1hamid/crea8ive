import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { launchQaBrowser, restrictQaRequests } from "./lib/qa-browser.mjs";

const base = process.env.QA_BASE_URL || "http://localhost:4181";
const route = "/case-studies/stw-movers-barcelona/";
const canonical = `https://crea8ivmedia.com${route}`;
const output = path.resolve(process.env.QA_OUTPUT_DIR || "../reports/browser-pilot", "stw");
await fs.mkdir(output, { recursive: true });
const browser = await launchQaBrowser();

try {
  const page = await browser.newPage();
  await page.setCacheEnabled(false);
  if (new URL(base).protocol === "https:") {
    // Allow the host's normal browser check before restricting third-party QA requests.
    await page.goto(`${base}${route}`, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForSelector("article h1", { timeout: 30000 });
  }
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  await restrictQaRequests(page, base);
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);

  for (const theme of ["dark", "light"]) {
    await page.evaluateOnNewDocument(value => localStorage.setItem("crea8iv-theme", value), theme);
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewport({ width, height: 1000 });
      const response = await page.goto(`${base}${route}`, { waitUntil: "domcontentloaded", timeout: 45000 });
      assert.ok([200, 304].includes(response.status()), "Successful page response or valid cached response");
      await page.evaluate(() => document.fonts.ready);
      await page.waitForFunction(() => [...document.querySelectorAll("article > header img")].every(image => image.complete && image.naturalWidth > 0));
      assert.equal(await page.$$eval("h1", nodes => nodes.length), 1);
      assert.equal(await page.$eval('link[rel="canonical"]', node => node.href), canonical);
      assert.equal(await page.$eval('meta[property="og:type"]', node => node.content), "article");
      assert.ok(await page.$eval("h1", node => node.textContent.includes("STW Movers")));
      const graphs = await page.$$eval('script[type="application/ld+json"]', nodes => nodes.flatMap(node => {
        const data = JSON.parse(node.textContent);
        return data["@graph"] || [data];
      }));
      const article = graphs.find(node => node["@type"] === "Article" && node.url === canonical);
      assert.ok(article);
      assert.equal(article.datePublished, "2026-10-20");
      assert.equal(article.dateModified, "2026-10-20");
      assert.equal(article.author.name, "Crea8iv Media");
      assert.ok(!JSON.stringify(article).includes("aggregateRating"));
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), true, `${theme}/${width}: page overflow`);

      for (const [name, selector] of [["hero", "h1"], ["website", 'figure div[class*="desktopFrame"]'], ["architecture", "#architecture"], ["content", "#content"], ["measurement", "#measurement"], ["cta", "#project-heading"]]) {
        if (name === "hero") await page.evaluate(() => scrollTo(0, 0));
        else await page.$eval(selector, node => scrollTo(0, scrollY + node.getBoundingClientRect().top - 112));
        await new Promise(resolve => setTimeout(resolve, 150));
        await page.screenshot({ path: `${output}/${name}-${theme}-${width}.png` });
      }
      const missingImages = await page.$$eval('article img', nodes => nodes.filter(node => node.complete && !node.naturalWidth).map(node => node.src));
      assert.deepEqual(missingImages, []);
      const fits = await page.$$eval('article button[title="Enlarge image"] img', nodes => nodes.map(node => getComputedStyle(node).objectFit));
      assert.ok(fits.every(value => value === "contain"));
      const first = await page.$('article button[title="Enlarge image"]');
      await first.evaluate(node => node.scrollIntoView({ block: "center" }));
      await first.focus(); await page.keyboard.press("Enter");
      await page.waitForSelector("dialog[open]");
      await page.click('[aria-label="Zoom image"]');
      await page.waitForSelector('[data-zoom="true"]');
      await page.keyboard.press("Escape");
      assert.equal(await page.$eval('article button[title="Enlarge image"]', node => document.activeElement === node), true);

      const cta = await page.$('article button[class*="primaryButton"]');
      await cta.evaluate(node => node.scrollIntoView({ block: "center" }));
      assert.ok((await cta.boundingBox()).height >= 44);
      await cta.click();
      await page.waitForSelector('[role="dialog"]');
      await page.keyboard.press("Escape");
      console.log(JSON.stringify({ theme, width, metadata: "passed", overflow: false, images: "passed", imageViewer: "passed", enquiryCTA: "passed" }));
    }
  }

  const internalLinks = await page.$$eval('article a[href^="/"]', nodes => [...new Set(nodes.map(node => node.getAttribute("href")))]);
  for (const href of internalLinks) assert.equal((await fetch(`${base}${href}`)).status, 200, href);
  const imageUrls = await page.$$eval("article img", nodes => [...new Set(nodes.map(node => node.src))]);
  for (const url of imageUrls) {
    const response = await fetch(url);
    assert.equal(response.status, 200, url);
    assert.ok(response.headers.get("content-type").startsWith("image/"));
    assert.ok((await response.arrayBuffer()).byteLength > 0);
  }
  for (const path of ["/case-studies/", "/website-development/", "/google-ads/", "/ai-search-optimization/", "/ai-visibility-growth/"]) {
    const html = await (await fetch(`${base}${path}`)).text();
    assert.ok(html.includes(route), `Incoming case-study link from ${path}`);
  }
  const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
  assert.ok(sitemap.includes(canonical), "Sitemap inclusion");
  assert.deepEqual(errors, []);
  console.log(JSON.stringify({ internalLinks: internalLinks.length, incomingLinks: 5, sitemap: "passed", browserErrors: 0 }));
} finally {
  const timeout = setTimeout(() => browser.process()?.kill("SIGKILL"), 5000);
  try { await browser.close(); } finally { clearTimeout(timeout); }
}
