import puppeteer from "puppeteer";

const urls = process.argv.slice(2);

if (!urls.length) {
  console.error("Usage: node scripts/mobile-performance-probe.mjs <url> [url...]");
  process.exit(1);
}

const profile = {
  offline: false,
  downloadThroughput: (1.6 * 1024 * 1024) / 8,
  uploadThroughput: (750 * 1024) / 8,
  latency: 150,
};

function round(value) {
  return Math.round(Number(value || 0));
}

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

try {
for (const url of urls) {
    const pageUrl = new URL(url);
    const page = await browser.newPage();
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 3 });

    const client = await page.createCDPSession();
    await client.send("Network.enable");
    await client.send("Performance.enable");
    await client.send("Emulation.setCPUThrottlingRate", { rate: 4 });
    await client.send("Network.emulateNetworkConditions", profile);

    let transferBytes = 0;
    page.on("response", async (response) => {
      const request = response.request();
      if (!request.url().startsWith(pageUrl.origin)) return;
      try {
        const headers = response.headers();
        const size = Number(headers["content-length"] || 0);
        if (size > 0) transferBytes += size;
      } catch {}
    });

    await page.evaluateOnNewDocument(() => {
      window.__crea8ivVitals = { lcp: 0, fcp: 0, cls: 0 };
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const latest = entries[entries.length - 1];
        window.__crea8ivVitals.lcp = latest.startTime;
      }).observe({ type: "largest-contentful-paint", buffered: true });
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (entry.name === "first-contentful-paint") {
            window.__crea8ivVitals.fcp = entry.startTime;
          }
        }
      }).observe({ type: "paint", buffered: true });
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!entry.hadRecentInput) {
            window.__crea8ivVitals.cls += entry.value;
          }
        }
      }).observe({ type: "layout-shift", buffered: true });
    });

    const started = Date.now();
    await page.goto(url, { waitUntil: "networkidle2", timeout: 45000 });
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const vitals = await page.evaluate(() => window.__crea8ivVitals);
    const timing = await page.evaluate(() => {
      const nav = performance.getEntriesByType("navigation")[0];
      return {
        ttfb: nav.responseStart - nav.requestStart,
        transfer: performance.getEntriesByType("resource").reduce((sum, entry) => sum + (entry.transferSize || 0), 0),
      };
    });
    const [lcpElement, largestResources] = await page.evaluate(() => {
      const candidates = [...document.querySelectorAll("img, h1, h2, p, video")].map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          tag: element.tagName.toLowerCase(),
          text: element.textContent?.trim().replace(/\s+/g, " ").slice(0, 90) || "",
          src: element.getAttribute("src") || element.querySelector("img")?.getAttribute("src") || "",
          area: Math.round(rect.width * rect.height),
          top: Math.round(rect.top),
        };
      });
      const largestElement = candidates.filter((item) => item.area > 0 && item.top < window.innerHeight).sort((a, b) => b.area - a.area)[0];
      const resources = performance
        .getEntriesByType("resource")
        .map((entry) => ({
          name: entry.name.replace(location.origin, ""),
          transferSize: entry.transferSize || 0,
          startTime: Math.round(entry.startTime),
          duration: Math.round(entry.duration),
        }))
        .sort((a, b) => b.transferSize - a.transferSize)
        .slice(0, 8);
      return [largestElement, resources];
    });

    console.log(
      JSON.stringify({
        url,
        elapsedMs: Date.now() - started,
        lcpMs: round(vitals.lcp),
        fcpMs: round(vitals.fcp),
        ttfbMs: round(timing.ttfb),
        cls: Number(vitals.cls.toFixed(4)),
        transferKb: Math.round((timing.transfer || transferBytes) / 1024),
        likelyLargestViewportElement: lcpElement,
        largestResources,
      }),
    );

    await page.close();
  }
} finally {
  await browser.close();
}
