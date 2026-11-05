import { existsSync } from "node:fs";
import puppeteer from "puppeteer";

export function launchQaBrowser() {
  const macChrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  const executablePath = process.env.CHROME_PATH || (existsSync(macChrome) ? macChrome : undefined);
  return puppeteer.launch({ executablePath, headless: true, args: process.env.CI ? ["--no-sandbox"] : [] });
}

export async function restrictQaRequests(page, base) {
  const origin = new URL(base).origin;
  await page.setRequestInterception(true);
  page.on("request", request => {
    const url = new URL(request.url());
    const staticRead = ["GET", "HEAD"].includes(request.method()) && url.origin === origin
      && !/\.php(?:$|\/)|^\/(?:api|app|clinic)(?:\/|$)/i.test(url.pathname);
    const embeddedRead = request.method() === "GET" && ["data:", "blob:"].includes(url.protocol);
    if (staticRead || embeddedRead) request.continue();
    else request.abort();
  });
}
