import assert from "node:assert/strict";
import fs from "node:fs/promises";
import puppeteer from "puppeteer";

const root = "../reports/home-hierarchy-2026-10-21";
const before = await fs.readFile(`${root}/before/index.html`, "utf8");
const current = await fs.readFile("out/index.html", "utf8");
const browser = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true, args: ["--no-sandbox"] });
const checks = [];
try {
  const page = await browser.newPage();
  const content = await page.evaluate(({before, current}) => {
    const read = html => {
      const document = new DOMParser().parseFromString(html, "text/html");
      const text = selector => [...document.querySelectorAll(selector)].map(node => node.textContent.replace(/\s+/g, " ").trim()).filter(Boolean);
      return { paragraphs: text("p"), headings: text("h1,h2,h3"), links: [...document.querySelectorAll("a[href]")].map(node => node.getAttribute("href")) };
    };
    const a = read(before), b = read(current);
    return { missingParagraphs: a.paragraphs.filter(value => !b.paragraphs.includes(value)), missingHeadings: a.headings.filter(value => !b.headings.includes(value)), missingLinks: a.links.filter(value => !b.links.includes(value)) };
  }, { before, current });
  assert.deepEqual(content, { missingParagraphs: [], missingHeadings: [], missingLinks: [] });
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.setRequestInterception(true);
  page.on("request", request => request.method() === "GET" && new URL(request.url()).origin === "http://localhost:4183" ? request.continue() : request.abort());
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  for (const theme of ["dark", "light"]) {
    await page.evaluateOnNewDocument(value => localStorage.setItem("crea8iv-theme", value), theme);
    for (const width of [360, 390, 768, 1024, 1440, 1920]) {
      await page.setViewport({ width, height: 1000 });
      await page.goto("http://localhost:4183/", { waitUntil: "networkidle2" });
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${width}: overflow`);
      assert.equal(await page.$$eval('[data-featured-project="buildscape"]', nodes => nodes.length), 1);
      assert.equal(await page.$$eval('[aria-label="Selected website projects"] [data-project="buildscape"]', nodes => nodes.length), 0, "Featured work is not duplicated in its gallery");
      assert.equal(await page.$$eval('[data-primary-service]', nodes => nodes.length), 3);
      assert.equal(await page.$$eval('[data-supporting-service]', nodes => nodes.length), 7);
      if (width < 768) {
        assert.equal(await page.$eval('.home-services-grid', node => getComputedStyle(node).display), "grid", "Primary services are readable rows, not another carousel");
        const rows = await page.$$eval('[data-primary-service]', nodes => nodes.map(node => node.getBoundingClientRect().top));
        assert.ok(rows[1] > rows[0] && rows[2] > rows[1], "All three primary services stack on mobile");
      }
      assert.equal(await page.$$eval('.home-luxury-story > section', nodes => nodes.length), 9);
      assert.ok(await page.evaluate(() => document.querySelector('[data-primary-service]').compareDocumentPosition(document.querySelector('#featured-case-studies')) & Node.DOCUMENT_POSITION_FOLLOWING), "Services precede the case-study rail");
      const summary = await page.$('details:has(.tools-discovery-section) > summary');
      await summary.evaluate(node => node.scrollIntoView({ block: "center", behavior: "instant" }));
      await summary.focus();
      await page.keyboard.press("Enter");
      await page.waitForSelector('details[open] .tool-card');
      await page.keyboard.press("Enter");
      assert.equal(await summary.evaluate(node => node.parentElement.open), false);
      assert.equal(await page.$eval('.home-final-cta .home-lux-button', node => node.getAttribute("href")), "/contact/");
      const preview = await page.$('[data-featured-project] button[title="Enlarge image"]');
      await preview.evaluate(node => node.scrollIntoView({block:"center",behavior:"instant"}));
      await preview.click();
      await page.waitForSelector('dialog[open]');
      await page.keyboard.press("Escape");
      await page.waitForFunction(() => !document.querySelector('dialog[open]'));
      if ([390, 1440].includes(width)) {
        for (const selector of ['.home-website-proof', '[aria-label="Complete growth infrastructure"]', '.home-final-cta']) {
          await page.$eval(selector, node => node.scrollIntoView({ block: "start", behavior: "instant" }));
          await page.screenshot({ path: `${root}/${theme}-${width}-${selector.replace(/[^a-zA-Z]+/g,"-")}.png` });
        }
      }
      checks.push({ theme, width, contentPreserved: true, hierarchy: "passed", toolsKeyboard: "passed" });
    }
  }
  assert.deepEqual(errors, []);
  await fs.writeFile(`${root}/qa.json`, JSON.stringify({ content, checks, errors }, null, 2));
  console.log(JSON.stringify({ responsiveChecks: checks.length, contentPreserved: true, errors }));
} finally { await browser.close(); }
