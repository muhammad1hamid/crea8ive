import puppeteer from 'puppeteer';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const base = process.env.VERIFY_BASE || 'http://localhost:3012';
const browser = await puppeteer.launch({headless:true});
fs.mkdirSync('.deploy/market-qa',{recursive:true});
try {
  const page = await browser.newPage();
  let submitted;
  await page.setRequestInterception(true);
  page.on('request', request => {
    if (request.url().endsWith('/enquiries/submit.php')) {
      submitted=JSON.parse(request.postData());
      return request.respond({status:200,contentType:'application/json',body:JSON.stringify({ok:true,reference:'LOCAL-QA-ONLY'})});
    }
    if (!request.url().startsWith(base)) return request.abort();
    request.continue();
  });
  for (const width of [390,768,1440]) {
    await page.setViewport({width,height:900,deviceScaleFactor:1});
    for (const theme of ['dark','light']) {
      await page.goto(`${base}/qatar/`,{waitUntil:'networkidle0'});
      await page.evaluate(t=>document.documentElement.setAttribute('data-theme',t),theme);
      await page.evaluate(async () => {
        for (const image of document.querySelectorAll('main img')) {
          image.scrollIntoView();
          await image.decode();
        }
        window.scrollTo(0, document.body.scrollHeight);
      });
      await new Promise(resolve=>setTimeout(resolve,700));
      await page.evaluate(()=>window.scrollTo(0,0));
      assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Overflow ${width} ${theme}`);
      assert.equal(await page.$$eval('main h1',els=>els.length),1);
      const broken=await page.$$eval('main img',els=>els.filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src));
      assert.deepEqual(broken,[]);
      await page.screenshot({path:`.deploy/market-qa/qatar-${width}-${theme}.png`,fullPage:true});
    }
  }
  await page.goto(`${base}/us/?utm_source=qa&utm_content=button`,{waitUntil:'networkidle0'});
  await page.type('input[name=company]','Local QA');
  await page.type('input[name=name]','Test User');
  await page.type('input[name=email]','qa@example.com');
  await page.select('select[name=type]','project');
  await page.select('select[name=service]','google-ads');
  assert(await page.$('input[name=adSpend]'));
  await page.type('textarea[name=requirements]','Local mocked form test only.');
  await page.click('input[name=consent]');
  await page.click('form button[type=submit], form button:not([type])');
  await page.waitForSelector('[role=status]');
  assert.equal(submitted.country,'United States');
  assert.equal(submitted.service,'google-ads');
  assert.equal(submitted.landing_page,'/qatar/','First page attribution retained');
  const events=await page.evaluate(()=>window.dataLayer||[]);
  assert(!JSON.stringify(events).includes('qa@example.com'),'PII in analytics');
  console.log('PASS: desktop/tablet/mobile dark/light; mocked enquiry success, conditional fields, first landing retained, no email in analytics.');
} finally { await browser.close(); }
