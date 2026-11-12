import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import puppeteer from 'puppeteer';
import { restrictQaRequests } from './lib/qa-browser.mjs';

const base = process.env.PORTFOLIO_QA_URL || 'http://127.0.0.1:4321';
assert.ok(['127.0.0.1', 'localhost', '[::1]'].includes(new URL(base).hostname), 'Use a local preview only');
const output = process.env.QA_OUTPUT_DIR || path.resolve('../reports/portfolio-cinematic');
const edge = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const executablePath = process.env.CHROME_PATH || (existsSync(edge) ? edge : undefined);
await mkdir(output, { recursive: true });
const browser = await puppeteer.launch({ executablePath, headless: true, protocolTimeout: 20000 });
const checks = [];
const settle = page => page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));

try {
  for (const [width, theme, reduced] of [[1440, 'dark', false], [1440, 'light', false], [768, 'dark', false], [390, 'light', false], [320, 'dark', true]]) {
    const page = await browser.newPage();
    await page.setViewport({ width, height: 900, deviceScaleFactor: 1, isMobile: width < 600, hasTouch: width < 600 });
    await restrictQaRequests(page, base);
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: reduced ? 'reduce' : 'no-preference' }]);
    await page.evaluateOnNewDocument(value => localStorage.setItem('theme', value), theme);
    await page.goto(`${base}/results/`, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForSelector('[data-position]');
    await page.evaluate(value => { document.documentElement.dataset.theme = value; }, theme);
    const root = await page.$('section[data-mode]');
    const count = await page.$$eval('[data-project-id]', elements => elements.length);
    assert.equal(await page.$$eval('[aria-label="Jump to portfolio category"] button', elements => elements.length), 6);
    const last = count - 1;
    const go = async position => {
      await root.evaluate((element, { position, last }) => window.scrollTo({ top: element.offsetTop + position / last * (element.offsetHeight - innerHeight), behavior: 'instant' }), { position, last });
      await page.waitForFunction(value => Math.abs(Number(document.querySelector('[data-position]').dataset.position) - value) < .04, { timeout: 6000 }, position);
      await settle(page);
      assert.ok(Math.abs(await page.$eval('[class*="__stage"]', element => element.getBoundingClientRect().top)) < 1, 'Showcase must remain visible while the document scrolls');
    };
    const snapshot = async name => {
      await page.waitForFunction(() => [...document.querySelectorAll('article[data-project-id]')]
        .filter(element => getComputedStyle(element).visibility !== 'hidden')
        .every(element => [...element.querySelectorAll('img')].every(image => image.complete && image.naturalWidth > 0)), { timeout: 20000 });
      await page.waitForFunction(() => document.querySelector('[data-position]').dataset.scrolling !== 'true');
      await page.evaluate(() => Promise.all([...document.querySelectorAll('[data-project-id] [class*="caption"]')]
        .flatMap(element => element.getAnimations()).map(animation => animation.finished.catch(() => {}))));
      await settle(page);
      assert.equal(await page.$eval('article[data-focused="true"]', card => {
        const imageFrame = card.querySelector('img').parentElement;
        return imageFrame.clientWidth > card.clientWidth + 1 || imageFrame.clientHeight > card.clientHeight + 1;
      }), false, 'Project artwork must fit inside the card without cropping its content');
      await page.screenshot({ path: path.join(output, `${name}-${width}-${theme}${reduced ? '-reduced' : ''}.png`) });
    };
    await go(4);
    for (const position of [0, 1, 2, 4]) {
      await go(position);
      await page.waitForFunction(() => { const image = document.querySelector('article[data-focused="true"] img'); return image.complete && image.naturalWidth > 0; });
      await settle(page);
      const ratios = await page.$eval('article[data-focused="true"]', card => {
        const image = card.querySelector('img');
        return { card: card.clientWidth / card.clientHeight, image: image.naturalWidth / image.naturalHeight };
      });
      assert.ok(Math.abs(ratios.card - ratios.image) < .02, 'Card orientation and shape must follow the actual image without cropping');
      if ([1, 2].includes(position)) await snapshot(position === 1 ? 'stw-image' : 'dental-image');
    }
    await snapshot('showcase');
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    assert.equal(await page.$eval('link[rel="canonical"]', element => element.href), 'https://crea8ivmedia.com/results/');
    if (width === 1440 && theme === 'dark') {
      for (const position of [4.25, 4.5, 4.75]) { await go(position); await snapshot(`transition-${position}`); }
    }
    await go(12); await go(13);
    assert.match(await page.$eval('[aria-live="polite"]', element => element.textContent), /Brand Identity/);
    await go(12);
    await go(0);
    await root.focus(); await page.keyboard.press('ArrowRight');
    await page.waitForFunction(() => document.querySelector('[data-position]').dataset.navigation === 'false' && Math.abs(Number(document.querySelector('[data-position]').dataset.position) - 1) < .04, { timeout: 6000 });
    const scrollBeforeCase = await page.evaluate(() => scrollY);
    await page.keyboard.press('Enter'); await page.waitForSelector('dialog[open]');
    await page.waitForFunction(() => !document.querySelector('[class*="caseShell"]').getAnimations().some(animation => animation.playState === 'running'));
    assert.ok(Math.abs(await page.$eval('[class*="__stage"]', element => element.getBoundingClientRect().top)) < 1, 'The dimmed portfolio must remain behind the case study');
    assert.match(await page.$eval('dialog', element => element.getAttribute('aria-label')), /STW/i);
    await page.screenshot({ path: path.join(output, `case-hero-${width}-${theme}.png`) });
    await page.click('button[class*="caseHint"]');
    await page.waitForFunction(() => document.querySelector('[class*="caseScroll"]').scrollTop > 100);
    await page.waitForFunction(() => {
      const element = document.querySelector('[class*="caseScroll"]');
      return Math.abs(element.scrollTop - (element.scrollHeight - element.clientHeight) / (document.querySelectorAll('[data-story-panel]').length - 1)) < 2;
    });
    await settle(page);
    await page.screenshot({ path: path.join(output, `story-${width}-${theme}.png`) });
    const galleryIndex = await page.$eval('[class*="caseGallery"]', element => Number(element.closest('[data-story-panel]').dataset.storyPanel));
    await page.$eval('[class*="caseScroll"]', (element, index) => {
      element.scrollTop = index / (document.querySelectorAll('[data-story-panel]').length - 1) * (element.scrollHeight - element.clientHeight);
    }, galleryIndex);
    await page.waitForFunction(() => [...document.querySelectorAll('[class*="caseGallery"] img')].slice(0, 2).every(image => image.complete && image.naturalWidth > 0), { timeout: 20000 });
    await settle(page);
    await page.screenshot({ path: path.join(output, `gallery-${width}-${theme}.png`) });
    await page.keyboard.press('Escape');
    await page.waitForFunction(() => !document.querySelector('dialog[open]'), { timeout: 6000 });
    assert.ok(Math.abs(Number(await root.evaluate(element => element.dataset.position)) - 1) < .04);
    assert.ok(Math.abs(await page.evaluate(() => scrollY) - scrollBeforeCase) < 2);
    assert.match(await page.evaluate(() => document.activeElement?.getAttribute('aria-label')), /Explore STW/);
    if (width === 1440 && theme === 'dark') {
      await page.$$eval('[aria-label="Jump to portfolio category"] button', buttons => buttons.find(button => button.textContent === 'E Commerce').click());
      await page.waitForFunction(() => document.querySelector('[data-position]').dataset.navigation === 'false' && Number(document.querySelector('[data-position]').dataset.position) > 14, { timeout: 6000 });
      for (const position of [last, 0, 13]) {
        await go(position); await root.focus(); await page.keyboard.press('Enter');
        await page.waitForSelector('dialog[open]'); await page.keyboard.press('Escape');
        await page.waitForFunction(() => !document.querySelector('dialog[open]'), { timeout: 6000 });
        assert.ok(Math.abs(Number(await root.evaluate(element => element.dataset.position)) - position) < .04);
      }
      await go(1);
    }
    await page.$$eval('button', buttons => buttons.find(button => button.textContent.includes('View All Projects')).click());
    await page.waitForSelector('[data-mode="grid"]');
    await page.$$eval('[aria-label="Filter all projects"] button', buttons => buttons.find(button => button.textContent === 'Brand Identity').click());
    assert.equal(await page.$$eval('[data-project-id]', elements => elements.length), 2);
    await page.click('[data-project-id] button[aria-label^="Explore"]');
    await page.waitForSelector('dialog[open]'); await page.keyboard.press('Escape');
    await page.waitForFunction(() => !document.querySelector('dialog[open]'), { timeout: 6000 });
    await page.$$eval('button', buttons => buttons.find(button => button.textContent.includes('Back to Showcase')).click());
    await page.waitForSelector('[data-mode="orbit"]');
    assert.equal(await page.$$eval('[data-project-id]', elements => elements.length), count);
    assert.ok(Math.abs(Number(await root.evaluate(element => element.dataset.position)) - 1) < .04);
    checks.push({ width, theme, reduced, projects: count, stickyVisible: true, keyboard: true, categoryBoundary: true, caseReturn: true, gridReturn: true });
    console.log(JSON.stringify(checks.at(-1)));
    await page.close();
  }
  await writeFile(path.join(output, 'browser-checks.json'), JSON.stringify(checks, null, 2));
} finally {
  await browser.close();
}
