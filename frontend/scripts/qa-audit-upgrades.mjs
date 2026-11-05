import assert from "node:assert/strict";
import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import puppeteer from "puppeteer";

const root = path.resolve(import.meta.dirname, "../out");
const server = http.createServer(async (req, res) => {
  try {
    let file = path.join(root, decodeURIComponent(new URL(req.url, "http://localhost").pathname));
    if ((await fs.stat(file)).isDirectory()) file = path.join(file, "index.html");
    res.setHeader("Content-Type", ({ ".html": "text/html", ".css": "text/css", ".js": "application/javascript", ".webp": "image/webp" })[path.extname(file)] || "application/octet-stream");
    res.end(await fs.readFile(file));
  } catch { res.statusCode = 404; res.end(); }
});
await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
let browser;
try {
  browser = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true, args: ["--no-sandbox"] });
  for (const width of [390, 1440]) {
    const page = await browser.newPage();
    await page.setViewport({ width, height: 900 });
    await page.setRequestInterception(true);
    page.on("request", req => new URL(req.url()).hostname === "127.0.0.1" ? req.continue() : req.abort());
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    const base = `http://127.0.0.1:${server.address().port}`;
    await page.goto(base + "/tools/", { waitUntil: "networkidle0" });
    await page.waitForFunction(() => window.fbq?.queue.some(entry => entry[0] === "init"));
    assert.equal(await page.evaluate(() => window.fbq.queue.filter(entry => entry[0] === "init").length), 1);
    assert.equal(await page.evaluate(() => window.fbq.queue.filter(entry => entry[0] === "track" && entry[1] === "PageView").length), 1);
    assert.equal(await page.evaluate(() => window.dataLayer.filter(entry => entry[0] === "config").length), 1);
    assert.equal(await page.evaluate(() => document.querySelector("h1").textContent.includes("Audit.")), true);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), true);
    assert.equal(await page.evaluate(() => [...document.querySelectorAll('[data-tool-card] img')].every(img => getComputedStyle(img).objectFit === "contain")), true);
    if (width === 390) {
      await page.evaluate(() => document.querySelector("#tools-carousel").scrollIntoView());
      await page.click('button[aria-label="Next tool"]');
      await page.waitForFunction(() => document.querySelector('#tools-carousel').scrollLeft > 100);
      assert.equal(await page.evaluate(() => window.dataLayer.filter(entry => entry[0] === "event" && entry[1] === "carousel_next").length), 1);
      await page.evaluate(() => [...document.querySelectorAll('[aria-label="Tool categories"] button')].find(button => button.textContent === 'SEO').click());
      assert.equal(await page.evaluate(() => document.querySelectorAll('[aria-label="Tool categories"] button[aria-pressed="true"]').length), 1);
      await page.waitForFunction(() => document.querySelector("#tools-carousel").scrollLeft === 0);
      await page.waitForFunction(() => document.querySelectorAll('#tools-carousel [data-category="SEO"]').length === 2 && document.querySelectorAll('#tools-carousel [data-tool-card]').length === 2);
    }
    await page.screenshot({ path: `/private/tmp/audit-tools-${width}.png` });
    await page.goto(base + "/tools/google-ads-budget-calculator/", { waitUntil: "networkidle0" });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), true);
    assert.equal(await page.evaluate(() => {
      const tool = document.querySelector('#use-tool');
      const info = [...document.querySelectorAll('h2')].find(node => node.textContent === 'What the tool checks');
      return !!tool && !!info && !!(tool.compareDocumentPosition(info) & Node.DOCUMENT_POSITION_FOLLOWING);
    }), true);
    await page.screenshot({ path: `/private/tmp/audit-calculator-${width}.png` });
    await page.evaluate(() => {
      const field = document.querySelector('#use-tool input[name="closeRate"]');
      field.value = "101";
    });
    assert.equal(await page.evaluate(() => document.querySelector('#use-tool form').checkValidity()), false);
    await page.evaluate(() => {
      document.querySelector('#use-tool input[name="closeRate"]').value = "18";
      document.querySelector('#use-tool form').requestSubmit();
    });
    await page.waitForSelector('#use-tool section[aria-live="polite"]');
    assert.equal(await page.evaluate(() => window.dataLayer.filter(entry => entry[0] === "event" && entry[1] === "free_tool_result").length), 1);
    assert.deepEqual(errors, []);
    console.log(JSON.stringify({ width, overflow: false, carousel: "passed", queuedEvents: "passed", calculatorOrder: "passed", pageErrors: errors }));
    await page.close();
  }
} finally {
  await browser?.close();
  await new Promise(resolve => server.close(resolve));
}
