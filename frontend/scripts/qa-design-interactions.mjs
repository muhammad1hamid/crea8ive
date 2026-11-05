import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import puppeteer from 'puppeteer';

const root='../reports/website-refinement-2026-10-21';
const before=JSON.parse(await fs.readFile(`${root}/templates-before/summary.json`,'utf8'));
const after=JSON.parse(await fs.readFile(`${root}/templates-after/summary.json`,'utf8'));
assert.deepEqual(after.errors,[]);
for(const row of after.records){
 assert.equal(row.status,200,`${row.route}: HTTP response`);
 assert.ok(row.overflow<=1,`${row.route}/${row.width}: overflow ${row.overflow}`);
 const original=before.records.find(n=>n.route===row.route&&n.width===row.width);
 assert.deepEqual(row.headings,original.headings,`${row.route}: H1 preservation`);
 assert.deepEqual(row.forms,original.forms,`${row.route}: form field/action preservation`);
}
const browser=await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--no-sandbox']});
const results=[];
try{
 const page=await browser.newPage();
 const errors=[];page.on('pageerror',error=>errors.push(error.message));
 await page.setRequestInterception(true);
 page.on('request',r=>r.method()==='GET'&&new URL(r.url()).origin==='http://localhost:4183'?r.continue():r.abort());
 for(const theme of ['dark','light']){
  await page.evaluateOnNewDocument(value=>localStorage.setItem('crea8iv-theme',value),theme);
  for(const width of [390,768,1440]){
   await page.setViewport({width,height:1000});
   await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
   await page.goto('http://localhost:4183/blog/',{waitUntil:'networkidle2',timeout:45000});
   await page.evaluate(()=>document.fonts.ready);
   await page.waitForSelector('input[type="search"]');
   await page.type('input[type="search"]','no-match-for-design-qa-214958');
   await page.waitForFunction(()=>document.body.innerText.includes('No articles matched this filter.'));
   await page.$eval('input[type="search"]',node=>{node.focus();node.select();});await page.keyboard.press('Backspace');
   await page.waitForFunction(()=>document.querySelectorAll('.cm-blog-card').length>0);
   assert.ok(await page.$$eval('.cm-blog-card h2',nodes=>nodes.every(node=>node.getBoundingClientRect().height>20)),'Visible text titles');
   assert.ok(await page.$$eval('.cm-blog-card img',nodes=>nodes.every(node=>getComputedStyle(node).objectFit==='contain')),'Uncropped blog images');
   for(const button of await page.$$('button[aria-pressed]')){
    if(await button.evaluate(node=>node.textContent==='SEO')){await button.click();assert.equal(await button.evaluate(node=>node.getAttribute('aria-pressed')),'true');break;}
   }
   await page.screenshot({path:`${root}/templates-after/blog-filter-${theme}-${width}.png`});
   await page.goto('http://localhost:4183/contact/',{waitUntil:'networkidle2',timeout:45000});
   await page.waitForSelector('#partnership-enquiry select[name="service"]');
   await page.select('#partnership-enquiry select[name="service"]','google-ads');
   await page.waitForSelector('input[name="adSpend"]');
   await page.select('#partnership-enquiry select[name="service"]','web-development');
   await page.waitForSelector('select[name="websiteProject"]');
   const controls=await page.$$eval('#partnership-enquiry .registration-input',nodes=>nodes.map(node=>({font:parseFloat(getComputedStyle(node).fontSize),height:node.getBoundingClientRect().height})));
   assert.ok(controls.every(control=>control.font>=16&&control.height>=44),'Readable touch-friendly enquiry controls');
   await page.$eval('#partnership-enquiry',node=>node.scrollIntoView({block:'start'}));
   assert.ok(await page.$eval('#partnership-enquiry',node=>node.getBoundingClientRect().top>=90),'Enquiry anchor clears fixed header');
   await page.screenshot({path:`${root}/templates-after/contact-form-${theme}-${width}.png`});
   if(width===390){
    const menu=await page.$('header .mobile-menu-button');
    await menu.evaluate(node=>node.scrollIntoView({block:'center'}));
    await menu.click();
    await page.waitForFunction(()=>document.querySelector('header .mobile-menu-button')?.getAttribute('aria-expanded')==='true');
    await page.keyboard.press('Escape');
    await page.waitForFunction(()=>document.querySelector('header .mobile-menu-button')?.getAttribute('aria-expanded')==='false');
   }
   results.push({theme,width,blogSearch:'passed',visibleTitles:'passed',imageFit:'passed',conditionalEnquiryFields:'passed',formSubmission:'not attempted'});
  }
 }
 assert.deepEqual(errors,[]);
 await fs.writeFile(`${root}/template-interactions.json`,JSON.stringify({templateViews:after.records.length,checks:results,browserErrors:errors,productionChanged:false},null,2));
 console.log(JSON.stringify({templateViews:after.records.length,interactionCombinations:results.length,browserErrors:errors}));
}finally{const timer=setTimeout(()=>browser.process()?.kill('SIGKILL'),5000);try{await browser.close();}finally{clearTimeout(timer);}}
