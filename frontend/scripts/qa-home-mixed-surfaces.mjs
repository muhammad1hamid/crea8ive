import assert from "node:assert/strict";
import fs from "node:fs/promises";
import puppeteer from "puppeteer";

const root = "../reports/home-mixed-surfaces-2026-10-21";
await fs.mkdir(root, { recursive: true });
const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
  args: ["--no-sandbox"],
});
const checks = [];
try {
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.setRequestInterception(true);
  page.on("request", request => request.method() === "GET" && new URL(request.url()).origin === "http://localhost:4183" ? request.continue() : request.abort());
  for (const theme of ["dark", "light"]) {
    await page.evaluateOnNewDocument(value => localStorage.setItem("crea8iv-theme", value), theme);
    for (const width of [360, 390, 768, 1440]) {
      for (const motion of ["reduce", "no-preference"]) {
        await page.setViewport({ width, height: 1000 });
        await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: motion }]);
        await page.goto("http://localhost:4183/", { waitUntil: "networkidle2" });
        const sections = await page.$$eval(".home-luxury-story > section", nodes => {
          const luminance = rgb => rgb.slice(0, 3).map(n => n / 255).map(n => n <= .04045 ? n / 12.92 : ((n + .055) / 1.055) ** 2.4).reduce((sum, n, i) => sum + n * [.2126, .7152, .0722][i], 0);
          return nodes.map(node => {
            const heading = node.querySelector("h2");
            const bg = getComputedStyle(node).backgroundColor;
            const fg = getComputedStyle(heading || node).color;
            const a = luminance(bg.match(/[\d.]+/g).map(Number));
            const b = luminance(fg.match(/[\d.]+/g).map(Number));
            return { heading: heading?.textContent.trim(), bg, fg, contrast: (Math.max(a, b) + .05) / (Math.min(a, b) + .05) };
          });
        });
        assert.ok(sections.every(section => section.bg === "rgb(24, 24, 24)"), "All homepage bands stay dark");
        assert.ok(sections.every(section => section.contrast >= 4.5), JSON.stringify(sections.filter(section => section.contrast < 4.5)));
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `Overflow ${width}`);
        await page.$eval('.home-website-proof', node => node.scrollIntoView({block:'center',behavior:'instant'}));
        await page.waitForFunction(() => document.querySelector('[aria-label="Selected website projects"] [data-project]').getBoundingClientRect().width > 0);
        const projects = await page.$$eval('[aria-label="Selected website projects"] [data-project]', nodes => nodes.slice(0, 3).map(node => {
          const box = node.getBoundingClientRect();
          const media = node.querySelector("img").parentElement.getBoundingClientRect();
          return { width: box.width, height: box.height, mediaHeight: media.height, fit: getComputedStyle(node.querySelector("img")).objectFit };
        }));
        assert.ok(projects.every(project => Math.abs(project.width - projects[0].width) < 1 && Math.abs(project.height - projects[0].height) < 1 && Math.abs(project.mediaHeight - projects[0].mediaHeight) < 1 && project.fit === "contain"), `Project cards align without cropping: ${JSON.stringify({theme,width,projects})}`);
        assert.equal(await page.$$eval('[aria-label="Complete growth infrastructure"] .home-services-grid img', nodes => nodes.length), 0, "Services use icons rather than mismatched posters");
        assert.equal(await page.$$eval('[data-primary-service] .home-service-icon svg', nodes => nodes.length), 3, "Three primary services have icons");
        assert.equal(await page.$$eval('[data-supporting-service]', nodes => nodes.length), 7, "Supporting service copy remains available");
        const labels = await page.$$eval('.home-industry-chips span, .home-industry-number', nodes => nodes.map(node => getComputedStyle(node).color));
        assert.ok(labels.every(color => color === "rgb(203, 198, 193)"), "Small labels follow the dark-band palette");
        assert.equal(await page.$eval("h1", node => node.innerText.replace(/\s+/g, " ").trim()), "Websites that convert. Marketing that connects. Built for growth.");
        const next = await page.$('button[aria-label="Next logos"]');
        await next.evaluate(node => node.scrollIntoView({ block: "center", behavior: "instant" }));
        const before = await page.$eval('[aria-label="Brand identity logo carousel"]', node => node.scrollLeft);
        await next.click();
        await page.waitForFunction(position => document.querySelector('[aria-label="Brand identity logo carousel"]').scrollLeft > position + 100, {}, before);
        if (motion === "reduce") {
          await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
          await page.screenshot({ path: `${root}/${theme}-${width}-hero.png` });
          for (const selector of [".home-logo-marquee", ".home-website-proof", '[aria-label="Complete growth infrastructure"]', ".home-premium-position", ".home-industry-systems"]) {
            const element = await page.$(selector);
            await element.evaluate(node => node.scrollIntoView({ block: "start", behavior: "instant" }));
            await page.screenshot({ path: `${root}/${theme}-${width}-${selector.replace(/[^a-zA-Z]+/g, "-")}.png` });
          }
        }
        checks.push({ theme, width, motion, sections, smallLabelPalette: "passed" });
      }
    }
  }
  assert.deepEqual(errors, []);
  await fs.writeFile(`${root}/qa.json`, JSON.stringify({ checks, errors }, null, 2));
  console.log(JSON.stringify({ responsiveThemeMotionChecks: checks.length, errors }));
} finally {
  let timer;
  try {
    await Promise.race([
      browser.close(),
      new Promise(resolve => {
        timer = setTimeout(() => {
          browser.disconnect();
          browser.process()?.kill("SIGKILL");
          resolve();
        }, 5000);
      }),
    ]);
  } finally {
    clearTimeout(timer);
    browser.process()?.kill("SIGKILL");
  }
}
// The standalone runner has flushed its report; intercepted requests can retain handles.
process.exit(0);
