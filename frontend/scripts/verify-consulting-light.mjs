import puppeteer from 'puppeteer';
import fs from 'node:fs';
import path from 'node:path';
const dir=path.resolve(import.meta.dirname,'../../reports/consulting-editorial');
const base=process.env.AUDIT_BASE || 'http://localhost:3013';
const browser=await puppeteer.launch({headless:true,args:['--no-sandbox']});const results=[];
try {
 for(const width of [390,1440]) {
  const page=await browser.newPage();await page.setViewport({width,height:900});
  for(const route of ['/case-studies/buildscape/','/blog/lead-generation-for-builders-and-architects-in-pakistan/','/syed-qamar-abbas/']) {
   await page.goto(base+route,{waitUntil:'networkidle2'});
   const state=await page.evaluate(()=>{
    document.documentElement.dataset.theme='light';
    const section=document.querySelector('section[aria-labelledby="business-decision-heading"],section[aria-labelledby="strategic-context-heading"],#core-expertise');
    window.scrollTo(0,section.getBoundingClientRect().top+scrollY-150);
    return {overflow:document.documentElement.scrollWidth>innerWidth+1,color:getComputedStyle(section.querySelector('p')).color,linkColor:getComputedStyle(section.querySelector('a')).color};
   });
   await page.screenshot({path:path.join(dir,`light-${route.split('/').filter(Boolean).at(-1)}-${width}.png`)});
   results.push({route,width,...state});
  }await page.close();
 }
}finally{await browser.close();}
fs.writeFileSync(path.join(dir,'light-validation.json'),JSON.stringify(results,null,2));console.log(results);
if(results.some(r=>r.overflow))process.exitCode=1;
