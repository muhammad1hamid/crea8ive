import assert from "node:assert/strict";
import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import puppeteer from "puppeteer";

const root = path.resolve(import.meta.dirname, "../out");
const screenshots = process.env.QA_SCREENSHOTS || "/private/tmp/crea8iv-colour-qa";
await fs.mkdir(screenshots, { recursive: true });
const server = http.createServer(async (req, res) => {
  try {
    let file = path.join(root, decodeURIComponent(new URL(req.url, "http://localhost").pathname));
    if ((await fs.stat(file)).isDirectory()) file = path.join(file, "index.html");
    res.setHeader("Content-Type", ({ ".html": "text/html", ".css": "text/css", ".js": "application/javascript", ".json": "application/json", ".svg": "image/svg+xml", ".webp": "image/webp", ".woff2": "font/woff2" })[path.extname(file)] || "application/octet-stream");
    res.end(await fs.readFile(file));
  } catch { res.statusCode = 404; res.end(); }
});
await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
const base = `http://127.0.0.1:${server.address().port}`;
const routes = ["/", "/website-development/", "/software-development/", "/case-studies/", "/case-studies/home-studio-interiors/", "/tools/", "/blog/anatomy-ai-ready-business-website/", "/pricing/", "/contact/", "/qatar/"];
const results = [];
const failures = [];
let browser;
try {
  browser = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true, args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on("request", req => new URL(req.url()).hostname === "127.0.0.1" ? req.continue() : req.abort());
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  for (const theme of ["dark", "light"]) {
    await page.evaluateOnNewDocument(value => localStorage.setItem("crea8iv-theme", value), theme);
    for (const width of [390, 1440]) {
      await page.setViewport({ width, height: 1000 });
      for (const route of routes) {
        errors.length = 0;
        const response = await page.goto(base + route, { waitUntil: "networkidle0" });
        assert.equal(response.status(), 200, route);
        await page.evaluate(() => document.fonts.ready);
        const state = await page.evaluate(() => {
          const rgb = value => value.match(/[\d.]+/g)?.slice(0, 3).map(Number);
          const luminance = channels => channels.map(value => value / 255).map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4).reduce((sum, value, index) => sum + value * [.2126, .7152, .0722][index], 0);
          const actions = [...document.querySelectorAll(".premium-cta,.desktop-cta-lux,.brand-action,.portfolio-button,.legacy-content :is(.btn-primary,.cm-btn-main,.cm-price-btn,.cm-cta-btn)")].filter(el => el.getBoundingClientRect().height > 0).map(el => {
            const style = getComputedStyle(el);
            const fg = rgb(style.color);
            const stops = style.backgroundImage.match(/rgb\([^)]+\)/g);
            const backgrounds = stops?.length ? stops.map(rgb) : [rgb(style.backgroundColor)];
            const a = luminance(fg);
            const ratio = Math.min(...backgrounds.map(bg => {
              const b = luminance(bg);
              return (Math.max(a, b) + .05) / (Math.min(a, b) + .05);
            }));
            return { label: el.textContent.trim().slice(0, 60), colour: style.color, background: style.backgroundColor, gradient: style.backgroundImage, ratio };
          });
          const nav = document.querySelector(".nav-pill");
          const media = [...document.querySelectorAll(".case-study-media-stage img,[data-tool-card] img")];
          return {
            overflow: document.documentElement.scrollWidth > innerWidth + 1,
            theme: document.documentElement.dataset.theme,
            ambient: !!document.querySelector(".ambient-ember,.ambient-grade"),
            navBorder: nav ? rgb(getComputedStyle(nav).borderColor) : null,
            actions,
            mediaUncropped: media.every(el => getComputedStyle(el).objectFit === "contain"),
            headings: document.querySelectorAll("h1").length,
          };
        });
        assert.equal(state.overflow, false, `${theme} ${width} ${route}: page overflow`);
        assert.equal(state.ambient, false, `${route}: ambient wash`);
        assert.equal(state.mediaUncropped, true, `${route}: cropped evidence media`);
        for (const action of state.actions) if (action.ratio < 4.5) failures.push(`${theme} ${width} ${route}: ${JSON.stringify(action)}`);
        if (state.navBorder) assert.ok(state.navBorder[0] <= state.navBorder[1] + 40, `${route}: orange navigation border`);
        if (route === "/" && theme === "dark") {
          assert.equal(await page.evaluate(() => [...document.querySelectorAll(".premium-hero-features svg")].every(el => getComputedStyle(el).color !== "rgb(255, 104, 1)")), true);
        }
        if (route === "/website-development/" && theme === "light") {
          assert.equal(await page.evaluate(() => [...document.querySelectorAll(".legacy-content .hero-tags li,.legacy-content .micro-label")].every(el => getComputedStyle(el).color !== "rgb(255, 255, 255)")), true, "Legacy light-mode labels remain readable");
          assert.equal(await page.$eval(".legacy-content .wire-line", el => getComputedStyle(el).backgroundColor), "rgb(105, 125, 117)", "Light-mode wireframe stays visible");
        }
        const name = route === "/" ? "home" : route.replaceAll("/", "-").replace(/^-|-$/g, "");
        await page.screenshot({ path: path.join(screenshots, `${name}-${theme}-${width}.png`) });
        if (route === "/" || route === "/tools/") {
          await page.evaluate(() => scrollTo(0, 1100));
          await page.screenshot({ path: path.join(screenshots, `${name}-body-${theme}-${width}.png`) });
        }
        assert.deepEqual(errors, [], `${route}: browser errors`);
        results.push({ route, theme, width, actions: state.actions.length, overflow: false, mediaUncropped: true });
        console.log(JSON.stringify(results.at(-1)));
      }
    }
  }
  for (const width of [320, 768, 1024]) {
    await page.setViewport({ width, height: 1000 });
    await page.goto(base, { waitUntil: "networkidle0" });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), true, `${width}: homepage overflow`);
  }
  await page.setViewport({ width: 390, height: 1000 });
  await page.goto(base, { waitUntil: "networkidle0" });
  await page.focus(".mobile-menu-button");
  assert.ok(await page.evaluate(() => parseFloat(getComputedStyle(document.activeElement).outlineWidth) >= 2), "Visible keyboard focus");
  await page.click(".mobile-menu-button");
  await page.waitForSelector(".mobile-lux-drawer .brand-action");
  assert.equal(await page.$eval(".mobile-menu-button", el => el.getAttribute("aria-expanded")), "true");
  assert.equal(await page.$eval(".mobile-lux-drawer .brand-action", el => getComputedStyle(el).color), "rgb(23, 11, 3)");
  await page.screenshot({ path: path.join(screenshots, "mobile-menu-light.png") });
  await page.click('.mobile-lux-drawer [aria-label="Close menu"]');
  await page.waitForFunction(() => document.querySelector(".mobile-menu-button").getAttribute("aria-expanded") === "false");
  await page.click(".premium-cta");
  await page.waitForSelector('[role="dialog"][aria-modal="true"]');
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), true, "Lead dialog overflow");
  await fs.writeFile(path.join(screenshots, "results.json"), JSON.stringify(results, null, 2));
  assert.deepEqual(failures, [], "Action contrast regressions");
  console.log(`Colour QA passed: ${results.length} route/theme/viewport combinations and 3 additional homepage widths.`);
} finally {
  await browser?.close();
  server.closeAllConnections();
  await new Promise(resolve => server.close(resolve));
}
