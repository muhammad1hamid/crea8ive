import assert from "node:assert/strict";
import fs from "node:fs/promises";
import puppeteer from "puppeteer";

const root = "../reports/home-brand-interactions-2026-10-21";
await fs.mkdir(root, { recursive: true });
const browser = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true, args: ["--no-sandbox"] });
const checks = [];
try {
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.setRequestInterception(true);
  page.on("request", request => request.method() === "GET" && new URL(request.url()).origin === "http://localhost:4183" ? request.continue() : request.abort());
  for (const theme of ["dark", "light"]) {
    await page.evaluateOnNewDocument(value => localStorage.setItem("crea8iv-theme", value), theme);
    await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
    for (const width of [360, 390, 768, 1440]) {
      await page.setViewport({ width, height: 1000 });
      for (const route of ["/", "/locations/"]) {
        await page.goto(`http://localhost:4183${route}`, { waitUntil: "networkidle2" });
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${route}/${width} overflow`);
        if (width === 1440) {
          const active = await page.$eval('header .nav-link-lux[data-active="true"]', node => ({ background: getComputedStyle(node).backgroundColor, underline: getComputedStyle(node, "::after").transform }));
          assert.equal(active.background, "rgba(0, 0, 0, 0)", "No active navigation bubble");
          assert.notEqual(active.underline, "matrix(0, 0, 0, 1, 0, 0)", "Active underline remains");
        }
        if (route === "/") {
          await page.$eval('[aria-label="Growth diagnostics"]', node => node.scrollIntoView({ block: "center", behavior: "instant" }));
          const cards = await page.$$eval('[aria-label="Growth diagnostics"] > a', nodes => nodes.map(node => ({ height: node.getBoundingClientRect().height, width: node.getBoundingClientRect().width })));
          assert.equal(cards.length, 4);
          assert.ok(cards.every(card => Math.abs(card.height - cards[0].height) < 1), "Diagnostic cards align");
          await page.screenshot({ path: `${root}/${theme}-${width}-diagnostics.png` });
        } else {
          await page.screenshot({ path: `${root}/${theme}-${width}-locations.png` });
        }
        checks.push({ theme, width, route, overflow: false });
      }
    }
  }
  await page.evaluateOnNewDocument(() => localStorage.setItem("crea8iv-theme", "dark"));
  await page.setViewport({ width: 1440, height: 1000 });
  for (const motion of ["reduce", "no-preference"]) {
    await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: motion }]);
    await page.goto("http://localhost:4183/", { waitUntil: "networkidle2" });
    for (const selector of ['.home-service-card', '[data-project]', '.home-creative-rail article', '[aria-label="Growth diagnostics"] > a', '.case-study-rail article', '.tool-card']) {
      if (selector === '.tool-card') await page.$eval('details:has(.tools-discovery-section)', node => { node.open = true; });
      const card = await page.$(selector);
      await page.mouse.move(0, 0);
      await card.evaluate(node => node.scrollIntoView({ block: "center", behavior: "instant" }));
      await card.hover();
      if (motion === "no-preference") {
        await page.waitForFunction(selector => getComputedStyle(document.querySelector(selector)).transform !== "none", {}, selector);
      } else {
        assert.equal(await card.evaluate(node => getComputedStyle(node).transform), "none", `${selector}: reduced-motion lift disabled`);
        assert.ok(await card.evaluate(node => ["none", "0px"].includes(getComputedStyle(node).translate)), `${selector}: reduced-motion translate disabled`);
      }
    }
  }
  assert.deepEqual(errors, []);
  await fs.writeFile(`${root}/qa.json`, JSON.stringify({ checks, hoverModes: ["normal", "reduced"], errors }, null, 2));
  console.log(JSON.stringify({ responsiveChecks: checks.length, hoverChecks: 12, errors }));
} finally {
  await browser.close();
}
