import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import fs from "node:fs/promises";
import { createServer } from "node:net";
import path from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { launchQaBrowser, restrictQaRequests } from "./lib/qa-browser.mjs";

const root = path.resolve(import.meta.dirname, "..");
const output = path.resolve(root, process.env.QA_OUTPUT_DIR || "../reports/browser-pilot");
const routes = ["/", "/website-development/", "/google-ads/", "/ai-search-optimization/", "/case-studies/", "/case-studies/stw-movers-barcelona/", "/contact/"];
await fs.mkdir(output, { recursive: true });
const portProbe = createServer();
portProbe.listen(0, "127.0.0.1");
await once(portProbe, "listening");
const port = portProbe.address().port;
await new Promise(resolve => portProbe.close(resolve));
const base = `http://127.0.0.1:${port}`;
// Do not inherit production proxies or secrets into the local QA server.
const env = Object.fromEntries(["PATH", "HOME", "TMPDIR", "CHROME_PATH", "CI"].filter(key => process.env[key]).map(key => [key, process.env[key]]));
Object.assign(env, { PORT: String(port), NO_INDEX: "true", NODE_ENV: "production", QA_BASE_URL: base, QA_OUTPUT_DIR: output });
const server = spawn(process.execPath, ["server.mjs"], { cwd: root, env, stdio: ["ignore", "pipe", "pipe"] });
let serverError;
server.on("error", error => { serverError = error; });
let browser;
const checks = [];
const errors = [];

function seoFields(source) {
  const doc = typeof source === "string" ? new DOMParser().parseFromString(source, "text/html") : document;
  return {
    title: doc.title,
    description: doc.querySelector('meta[name="description"]')?.content,
    canonical: doc.querySelector('link[rel="canonical"]')?.getAttribute("href"),
    robots: doc.querySelector('meta[name="robots"]')?.content,
    ogTitle: doc.querySelector('meta[property="og:title"]')?.content,
    h1: [...doc.querySelectorAll("h1")].map(node => node.textContent.trim()),
    schemas: [...doc.querySelectorAll('script[type="application/ld+json"]')].map(node => JSON.parse(node.textContent)),
  };
}

try {
  let ready = false;
  for (let attempt = 0; attempt < 100; attempt++) {
    if (serverError) throw serverError;
    assert.equal(server.exitCode, null, "QA server exited before readiness");
    try { ready = (await fetch(`${base}/node-health`, { signal: AbortSignal.timeout(500) })).ok; } catch {}
    if (ready) break;
    await delay(100);
  }
  assert.ok(ready, "QA server readiness timed out");
  browser = await launchQaBrowser();
  const page = await browser.newPage();
  page.on("pageerror", error => errors.push(error.message));
  await restrictQaRequests(page, base);
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  for (const route of routes) {
    const html = await fs.readFile(path.join(root, "out", route, "index.html"), "utf8");
    const expected = await page.evaluate(seoFields, html);
    assert.ok(expected.title && expected.description, `${route}: server-rendered metadata`);
    assert.equal(expected.canonical, `https://crea8ivmedia.com${route}`);
    assert.equal(expected.h1.length, 1, `${route}: one server-rendered H1`);
    assert.ok(expected.schemas.length, `${route}: server-rendered schema`);
    for (const width of [390, 768, 1440]) {
      await page.setViewport({ width, height: 1000 });
      const response = await page.goto(`${base}${route}`, { waitUntil: "networkidle2", timeout: 45000 });
      assert.equal(response.status(), 200, route);
      await page.evaluate(() => document.fonts.ready);
      const actual = await page.evaluate(seoFields);
      assert.deepEqual(actual, expected, `${route}/${width}: hydration preserves SEO fields`);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${route}/${width}: horizontal overflow`);
      if (route === "/") {
        assert.equal(await page.$$eval("[data-primary-service]", nodes => nodes.length), 3);
        assert.equal(await page.$eval(".home-final-cta .home-lux-button", node => node.getAttribute("href")), "/contact/");
        assert.equal(await page.$eval(".premium-cta", node => getComputedStyle(node).backgroundColor), "rgb(255, 104, 1)");
      }
      await page.screenshot({ path: path.join(output, `${route.replaceAll("/", "_")}-${width}.png`) });
      checks.push({ route, width, metadata: "preserved", overflow: false });
    }
  }
  assert.deepEqual(errors, [], "Uncaught browser errors");
  await browser.close();
  browser = undefined;
  const stw = spawn(process.execPath, ["scripts/qa-stw-case-study.mjs"], { cwd: root, env, stdio: "inherit" });
  const [code] = await once(stw, "exit");
  assert.equal(code, 0, "STW interaction regression suite");
  console.log(JSON.stringify({ responsiveChecks: checks.length, stwSuite: "passed", output }));
} catch (error) {
  errors.push(error.message);
  throw error;
} finally {
  await fs.writeFile(path.join(output, "report.json"), JSON.stringify({ checkedAt: new Date().toISOString(), checks, errors, limitations: "Local frontend only; no production submissions, backend delivery, field performance or AI results verified." }, null, 2));
  if (browser) await browser.close();
  if (server.exitCode === null && !serverError) {
    const exited = once(server, "exit");
    server.kill("SIGTERM");
    const timeout = setTimeout(() => server.kill("SIGKILL"), 5000);
    await exited;
    clearTimeout(timeout);
  }
}
