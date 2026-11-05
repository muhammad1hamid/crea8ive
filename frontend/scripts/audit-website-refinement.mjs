import fs from 'node:fs/promises';
import path from 'node:path';
import puppeteer from 'puppeteer';

const phase = process.argv[2] || 'before';
const base = process.env.QA_BASE_URL || 'http://localhost:4183';
const output = path.resolve('../reports/website-refinement-2026-10-21', phase);
await fs.mkdir(output, { recursive: true });
const sitemap = await fs.readFile('out/sitemap.xml', 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => new URL(match[1]).pathname);
const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--no-sandbox'] });
try {
  const page = await browser.newPage();
  const inventory = [];
  for (const route of urls) {
    const file = path.join('out', route.endsWith('/') ? `${route}index.html` : route);
    const html = await fs.readFile(file, 'utf8');
    inventory.push(await page.evaluate(({ html, route }) => {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const meta = name => doc.querySelector(`meta[name="${name}"]`)?.content || '';
      const schemas = [...doc.querySelectorAll('script[type="application/ld+json"]')].map(node => { try { return { valid: true, value: JSON.parse(node.textContent) }; } catch { return { valid: false }; } });
      return { route, title: doc.title, description: meta('description'), canonical: doc.querySelector('link[rel="canonical"]')?.getAttribute('href'), robots: meta('robots'), h1: [...doc.querySelectorAll('h1')].map(node => node.textContent.trim()), sections: [...doc.querySelectorAll('#main-content section')].map(node => ({ id: node.id, className: node.className, heading: node.querySelector('h2,h3')?.textContent.trim() || '' })), schemas, internalLinks: [...new Set([...doc.querySelectorAll('a[href^="/"]')].map(node => node.getAttribute('href')))], unlabelledImages: doc.querySelectorAll('img:not([alt])').length };
    }, { html, route }));
  }
  await fs.writeFile(path.join(output, 'route-inventory.json'), JSON.stringify(inventory, null, 2));
  const sample = ['/', '/our-services/', '/website-development/', '/google-ads/', '/ai-search-optimization/', '/case-studies/', '/case-studies/stw-movers-barcelona/', '/case-studies/home-studio-interiors/', '/blog/', '/blog/anatomy-ai-ready-business-website/', '/about/', '/contact/', '/tools/'];
  const observations = [];
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.setRequestInterception(true);
  page.on('request', request => new URL(request.url()).origin === new URL(base).origin ? request.continue() : request.abort());
  for (const route of sample) {
    const widths = route === '/' ? [360, 375, 390, 430, 768, 1024, 1280, 1440, 1920] : [390, 768, 1440];
    for (const width of widths) {
      await page.setViewport({ width, height: 1000 });
      const response = await page.goto(`${base}${route}`, { waitUntil: 'domcontentloaded', timeout: 45000 });
      await page.evaluate(() => document.fonts.ready);
      await new Promise(resolve => setTimeout(resolve, 200));
      const record = await page.evaluate(() => ({
        title: document.title,
        overflow: document.documentElement.scrollWidth - innerWidth,
        h1: [...document.querySelectorAll('h1')].map(node => node.textContent.trim()),
        sections: [...document.querySelectorAll('main section')].map(node => ({ heading: node.querySelector('h2,h3')?.textContent.trim() || '', height: Math.round(node.getBoundingClientRect().height) })),
        premiumCards: [...document.querySelectorAll('.home-premium-signal')].map(node => ({ width: Math.round(node.getBoundingClientRect().width), height: Math.round(node.getBoundingClientRect().height) })),
        smallButtons: [...document.querySelectorAll('button')].filter(node => { const rect = node.getBoundingClientRect(); return rect.width > 0 && rect.height > 0 && (rect.width < 24 || rect.height < 24); }).map(node => ({ text: node.textContent.trim(), label: node.getAttribute('aria-label') })),
        brokenImages: [...document.images].filter(node => node.complete && !node.naturalWidth).map(node => node.getAttribute('src')),
      }));
      observations.push({ route, width, status: response.status(), ...record });
      const name = route.replaceAll('/', '_') || 'home';
      if ([390, 768, 1440].includes(width)) await page.screenshot({ path: path.join(output, `${name}-${width}.png`) });
      if (route === '/' && [390, 1440].includes(width)) {
        for (const [name, selector] of [['positioning', '.home-premium-position'], ['shortcuts', '.home-conversion-strip'], ['services', '.home-services-grid']]) {
          await page.$eval(selector, node => node.scrollIntoView({ block: 'center' }));
          await page.screenshot({ path: path.join(output, `${name}-${width}.png`) });
        }
      }
    }
  }
  const report = { phase, capturedAt: new Date().toISOString(), source: 'Local static export; analytics and Search Console unavailable', routes: inventory.length, observations, browserErrors: [...new Set(errors)] };
  await fs.writeFile(path.join(output, 'rendered-audit.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ routes: inventory.length, renderedChecks: observations.length, overflow: observations.filter(row => row.overflow > 1).map(({route,width,overflow}) => ({route,width,overflow})), invalidSchemaPages: inventory.filter(row => row.schemas.some(schema => !schema.valid)).length, browserErrors: report.browserErrors }));
} finally {
  const timeout = setTimeout(() => browser.process()?.kill('SIGKILL'), 5000);
  try { await browser.close(); } finally { clearTimeout(timeout); }
}
