import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import puppeteer from 'puppeteer';

const root = path.resolve(import.meta.dirname, '../..');
const directory = path.join(root, 'reports/consulting-editorial');
await mkdir(directory, { recursive: true });
const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
try {
  const page = await browser.newPage();
  const sitemap = await fetch('https://crea8ivmedia.com/sitemap.xml').then(r => r.text());
  const urls = await page.evaluate(xml => [...new DOMParser().parseFromString(xml, 'text/xml').querySelectorAll('loc')].map(e => e.textContent), sitemap);
  const contentUrls = urls.filter(url => /\/(?:blog|case-studies)\/[^/]+\/$/.test(url) && !url.includes('/blog/page/'));
  const destinations = ['about/', 'selected-work/', 'business-growth-consultation/', 'expertise/growth-strategy/', 'expertise/customer-acquisition/', 'expertise/seo-ai-search/', 'expertise/automation-strategy/'].map(p => `https://syedqamarabbas.com/${p}`);
  const records = [];
  for (const url of [...destinations, ...contentUrls]) {
    const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
    const html = await response.text();
    const extracted = await page.evaluate(source => {
      const doc = new DOMParser().parseFromString(source, 'text/html');
      const content = doc.querySelector('.post-details-content') || doc.querySelector('main') || doc.body;
      content.querySelectorAll('script,style,nav,footer').forEach(e => e.remove());
      return {
        title: doc.title,
        canonical: doc.querySelector('link[rel=canonical]')?.getAttribute('href'),
        headings: [...content.querySelectorAll('h1,h2,h3')].map(e => e.textContent.trim()),
        text: content.textContent.replace(/\s+/g, ' ').trim(),
        links: [...content.querySelectorAll('a[href]')].map(e => ({ label: e.textContent.trim(), href: e.getAttribute('href') })),
      };
    }, html);
    records.push({ url, status: response.status, finalUrl: response.url, ...extracted });
  }
  await writeFile(path.join(directory, 'live-source-audit.json'), JSON.stringify({ checkedAt: new Date().toISOString(), records }, null, 2));
  console.log(JSON.stringify({ pages: records.length, destinations: records.slice(0, destinations.length).map(({url,status,title})=>({url,status,title})), errors: records.filter(r=>r.status!==200).map(r=>({url:r.url,status:r.status})) }, null, 2));
} finally { await browser.close(); }
