import puppeteer from 'puppeteer';
import fs from 'node:fs/promises';
import path from 'node:path';
const base=process.env.DUAL_BASE||'http://127.0.0.1:3120';
const root=path.resolve('../reports/dual-market/after');await fs.mkdir(root,{recursive:true});
const browser=await puppeteer.launch({headless:true});
const rows=[],errors=[];
try {
 const page=await browser.newPage();await page.setRequestInterception(true);
 page.on('request',r=>new URL(r.url()).origin===base||r.url().startsWith('data:')?r.continue():r.abort());
 page.on('pageerror',e=>errors.push(e.message));
 const routes=['/','/qa/','/qa/ar/','/qa/ai-visibility/','/qa/automation/','/qa/services/seo/','/qa/industries/real-estate/','/qa/contact/','/qa/ar/contact/','/our-services/','/website-development/','/about/','/contact/','/blog/','/tools/'];
 for(const route of routes)for(const width of [375,430,768,1024,1440,1920]){
  await page.setViewport({width,height:960});await page.goto(base+route,{waitUntil:'networkidle0',timeout:90000});
  const state=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,h1s:document.querySelectorAll('h1').length,h1Size:document.querySelector('h1')?getComputedStyle(document.querySelector('h1')).fontSize:null,brokenImages:[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.getAttribute('src'))}));
  let violations=[];
  if([375,1440].includes(width)){await page.addScriptTag({path:path.resolve('node_modules/axe-core/axe.min.js')});violations=await page.evaluate(async()=>{const r=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}});return r.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}));});}
  if(['/', '/qa/', '/qa/ar/'].includes(route))await page.screenshot({path:path.join(root,`${route==='/'?'pakistan':route.replaceAll('/','_')}-${width}.png`),fullPage:true});
  rows.push({route,width,...state,violations});
  await fs.writeFile(path.join(root,'validation-progress.json'),JSON.stringify({rows,errors},null,2));
 }
 const functional=[];const check=(name,pass)=>{functional.push({name,pass});};
 await page.goto(base+'/qa/contact/?service=seo',{waitUntil:'networkidle0'});check('Contextual service preselection',await page.$eval('[name=service]',e=>e.value==='seo'));
 await page.goto(base+'/qa/contact/?service=invalid',{waitUntil:'networkidle0'});check('Unknown service rejected',await page.$eval('[name=service]',e=>e.value===''));
 await page.setJavaScriptEnabled(false);await page.goto(base+'/qa/',{waitUntil:'networkidle0'});await page.click('.qa-growth-stage:nth-child(5) summary');check('WhatsApp stage works without JavaScript',await page.$eval('.qa-growth-stage:nth-child(5)',e=>e.open));check('Visible headline without JavaScript',await page.$eval('h1',e=>e.getBoundingClientRect().height>0));await page.setJavaScriptEnabled(true);
 await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);await page.goto(base+'/qa/',{waitUntil:'networkidle0'});check('Reduced motion hero',await page.$eval('h1',e=>getComputedStyle(e).animationName==='none'));
 await page.focus('.qa-growth-stage:nth-child(2) summary');await page.keyboard.press('Enter');check('Keyboard stage disclosure',await page.$eval('.qa-growth-stage:nth-child(2)',e=>e.open));
 await fs.writeFile(path.join(root,'validation.json'),JSON.stringify({rows,errors,functional,scope:'Local Chromium. External requests blocked. No production form submissions.'},null,2));
 console.log(JSON.stringify({samples:rows.length,overflows:rows.filter(r=>r.overflow),broken:rows.filter(r=>r.brokenImages.length),accessibility:rows.filter(r=>r.violations.length),errors,functional},null,2));
}finally{await browser.close();}
