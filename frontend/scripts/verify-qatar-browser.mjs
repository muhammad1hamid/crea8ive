import puppeteer from 'puppeteer';
import path from 'node:path';
import fs from 'node:fs/promises';
const root=process.env.QATAR_REPORT_DIR || path.resolve('..','reports','qatar');
const browser=await puppeteer.launch({headless:true,args:['--no-sandbox']});
try {
const page=await browser.newPage();
await page.setRequestInterception(true);
page.on('request',r=>new URL(r.url()).hostname==='127.0.0.1'||r.url().startsWith('data:')?r.continue():r.abort());
const errors=[];page.on('pageerror',e=>errors.push(e.message));
const routes=['/qa/','/qa/ar/','/qa/services/seo/','/qa/ar/services/seo/','/qa/contact/','/qa/ar/contact/','/qa/pricing/','/qa/tools/website-roi-calculator/'];
const rows=[];await fs.mkdir(`${root}/screenshots`,{recursive:true});
for(const route of routes)for(const width of [375,430,768,1024,1440,1920]){
 await page.setViewport({width,height:960});
 await page.goto('http://127.0.0.1:3118'+route,{waitUntil:'networkidle0'});
 await page.evaluate(async()=>{await Promise.all([...document.images].map(i=>{i.loading='eager';return i.decode().catch(()=>{});}));});
 const state=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,lang:document.documentElement.lang,dir:document.documentElement.dir,h1:document.querySelector('h1')?.textContent,brokenImages:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src)}));
 const file=`${route.replaceAll('/','_')}-${width}.png`;await page.screenshot({path:`${root}/screenshots/${file}`,fullPage:true});
 let violations=[];
 if([375,1440].includes(width)){
  await page.addScriptTag({path:path.resolve('node_modules/axe-core/axe.min.js')});
  violations=await page.evaluate(async()=>{const r=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}});return r.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)}));});
 }
 rows.push({route,...state,violations,screenshot:file});
}
await fs.writeFile(`${root}/responsive-release.json`,JSON.stringify({rows,errors},null,2));
console.log(JSON.stringify({viewports:rows.length,overflows:rows.filter(x=>x.scrollWidth>x.width),brokenImages:rows.filter(x=>x.brokenImages.length),accessibility:rows.filter(x=>x.violations.length),errors},null,2));
} finally { await browser.close(); }
