import assert from "node:assert/strict";
import fs from "node:fs/promises";
import puppeteer from "puppeteer";

const base = process.env.QA_BASE_URL || "http://localhost:4173";
const directory = "/private/tmp/crea8iv-service-design";
await fs.mkdir(directory, { recursive: true });
const browser = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true, args: ["--no-sandbox"] });
try {
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on("request", request => ["localhost", "127.0.0.1"].includes(new URL(request.url()).hostname) ? request.continue() : request.abort());
  for (const theme of ["dark", "light"]) {
    await page.evaluateOnNewDocument(value => localStorage.setItem("crea8iv-theme", value), theme);
    for (const width of [390, 1440]) {
      await page.setViewport({ width, height: 1000 });
      await page.goto(base, { waitUntil: "networkidle2", timeout: 120000 });
      await page.evaluate(() => document.fonts.ready);
      const colours = await page.$$eval(".premium-hero-features a > svg:first-child", icons => icons.map(icon => getComputedStyle(icon).color));
      assert.ok(new Set(colours).size >= 5, "Service icons need distinct category colours");
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), true, "Page overflow");
      for (const [name, selector] of [["hero", ".premium-hero"], ["positioning", ".home-premium-position"], ["actions", ".home-conversion-strip"], ["tools", ".tools-discovery-section"], ["websites", ".home-website-proof"]]) {
        await page.$eval(selector, el => el.scrollIntoView({ block: "start" }));
        await new Promise(resolve => setTimeout(resolve, 300));
        await page.$eval(selector, el => window.scrollTo(0, window.scrollY + el.getBoundingClientRect().top - 100));
        await new Promise(resolve => setTimeout(resolve, 200));
        await page.screenshot({ path: `${directory}/${name}-${theme}-${width}.png` });
      }
      if (width === 390) {
        const cards = await page.$$eval(".home-premium-signal", nodes => nodes.map(node => ({ height: node.getBoundingClientRect().height, width: node.getBoundingClientRect().width, icon: !!node.querySelector("svg") })));
        assert.ok(cards.every(card => card.height < 240 && card.width < 330 && card.icon), JSON.stringify(cards));
        assert.equal(await page.$eval(".home-conversion-grid", el => getComputedStyle(el).display), "grid");
        assert.ok(await page.$$eval(".home-conversion-action", nodes => nodes.every(el => el.getBoundingClientRect().width < 190 && !!el.querySelector("svg"))), "Compact quick actions");
        assert.ok(await page.$eval(".tools-discovery-grid > article", el => el.getBoundingClientRect().left >= 20), "Tool carousel first-card gutter");
      }
      const media = await page.$eval('[data-project="buildscape"] img', image => {
        const rect = image.getBoundingClientRect();
        const frame = image.parentElement.getBoundingClientRect();
        return { ratio: rect.width / rect.height, gap: frame.height - rect.height };
      });
      assert.ok(Math.abs(media.ratio - 720 / 500) < .02 && Math.abs(media.gap) < 2, JSON.stringify(media));
      await page.$eval('[aria-label="Next website projects"]', el => el.scrollIntoView({ block: "center" }));
      await new Promise(resolve => setTimeout(resolve, 400));
      await page.click('[aria-label="Next website projects"]');
      await page.waitForFunction(() => document.querySelector('[aria-label="Selected website projects"]').scrollLeft > 20);
      console.log(JSON.stringify({ theme, width, iconColours: new Set(colours).size, compactCards: true, buildscapeRatio: media.ratio, carousel: "passed" }));
    }
  }
} finally { await browser.close(); }
