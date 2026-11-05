import puppeteer from 'puppeteer';
import path from 'node:path';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const browser=await puppeteer.launch({headless:true,args:['--no-sandbox']});try {
const page=await browser.newPage();
await page.setRequestInterception(true);let failForm=false;
page.on('request',r=>{if(failForm&&r.url().includes('/enquiries/submit.php'))return r.respond({status:503,contentType:'application/json',body:'{"error":"test unavailable"}'});return new URL(r.url()).hostname==='127.0.0.1'||r.url().startsWith('data:')?r.continue():r.abort();});
const checks=[];const check=(name,ok)=>{assert.ok(ok,name);checks.push(name);};
const go=async path=>page.goto('http://127.0.0.1:3118'+path,{waitUntil:'networkidle0'});
const events=()=>page.evaluate(()=>window.dataLayer.map(x=>x[1]||x.event).filter(Boolean));
await go('/qa/tools/website-roi-calculator/');await page.click('.qa-tool button');await page.waitForSelector('.qa-result');
check('ROI illustrative calculation', (await page.$eval('.qa-result',e=>e.textContent)).includes('1,000 QAR')&&(await page.$eval('.qa-result',e=>e.textContent)).includes('15.0 months'));
await page.$eval('.qa-tool input',e=>{e.value='-1';});check('Negative numeric input invalid',await page.$eval('.qa-tool input',e=>!e.checkValidity()));
await go('/qa/tools/lead-response-calculator/');await page.click('.qa-tool button');await page.waitForSelector('.qa-result');check('Response workload calculation',(await page.$eval('.qa-result',e=>e.textContent)).includes('25.0 handling hours')&&(await page.$eval('.qa-result',e=>e.textContent)).includes('57%'));
for(const slug of ['ai-visibility-checker','seo-audit','local-seo-audit']){
 await go('/qa/tools/'+slug+'/');await page.click('.qa-check input');await page.click('.qa-tool button');await page.waitForSelector('.qa-result');check(slug+' returns ungated result',(await page.$eval('.qa-result',e=>e.textContent)).includes('1 of 8'));
 check(slug+' analytics emits start and complete',(await events()).includes('qatar_audit_start')&&(await events()).includes('qatar_audit_complete'));
}
await page.evaluate(()=>sessionStorage.clear());await go('/qa/?utm_source=qa-test&utm_medium=local&utm_campaign=qatar-verification&utm_content=hero');
await go('/qa/contact/');check('Attribution retained',await page.evaluate(()=>JSON.parse(sessionStorage.getItem('crea8iv-qatar-entry')).source==='qa-test'));
const fill=async(ar)=>{
 for(const [name,value] of Object.entries({name:ar?'اختبار محلي':'Local Test',company:'Local QA only',phone:'+974 0000 0000',email:'qatar-qa@example.invalid',goal:ar?'اختبار مسار النمو':'Verify local form persistence',requirements:ar?'هذا طلب اختبار محلي فقط.':'Local test only. No real enquiry.'}))await page.type(`[name="${name}"]`,value);
 await page.select('[name="service"]','seo');await page.select('[name="budget"]','scope-first');await page.click('[name="consent"]');
};
await page.click('form button');check('Empty form blocks submission',await page.$eval('[name="name"]',e=>!e.checkValidity()));
await fill(false);failForm=true;await page.click('form button');await page.waitForSelector('[role="alert"]');check('Backend failure shown without success',!(await events()).includes('qatar_form_submit'));
failForm=false;await page.click('form button');await page.waitForSelector('[role="status"]');check('English enquiry persists with reference',(await page.$eval('[role="status"]',e=>e.textContent)).includes('CM-'));
check('Submit event only after success',(await events()).filter(x=>x==='qatar_form_submit').length===1);
await go('/qa/ar/contact/');await fill(true);await page.click('form button');await page.waitForSelector('[role="status"]');check('Arabic enquiry persists with reference',(await page.$eval('[role="status"]',e=>e.textContent)).includes('CM-'));
await go('/qa/ar/services/seo/');check('Arabic language switch maps to matching English service',await page.$eval('.qa-market-controls > a[lang="en"]',e=>e.getAttribute('href')==='/qa/services/seo/'));
await page.setViewport({width:375,height:812});await page.click('header button[aria-controls="mobile-navigation-drawer"]');await page.waitForSelector('[role="dialog"]');check('Mobile menu expands',Boolean(await page.$('[role="dialog"]')));
await page.keyboard.press('Tab');check('Keyboard focus remains usable',await page.evaluate(()=>document.activeElement.tagName==='A'));
await fs.writeFile(path.join(process.env.QATAR_REPORT_DIR || path.resolve('..','reports','qatar'),'functional-release.json'),JSON.stringify({checks,passed:checks.length,scope:'Local browser, isolated PHP storage; no external analytics requests'},null,2));console.log(checks);} finally { await browser.close(); }
