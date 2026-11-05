import fs from 'node:fs/promises';
import puppeteer from 'puppeteer';

const phase=process.argv[2] || 'before';
const output=`../reports/website-refinement-2026-10-21/templates-${phase}`;
await fs.mkdir(output,{recursive:true});
const routes=['/','/website-development/','/website-development/islamabad/','/google-ads/','/ai-search-optimization/','/social-media-management/','/branding-and-creative/','/software-development/','/google-business-profile-growth/','/our-services/','/about/','/contact/','/pricing/','/consultation/','/blog/','/blog/anatomy-ai-ready-business-website/','/case-studies/','/case-studies/home-studio-interiors/','/case-studies/stw-movers-barcelona/','/results/','/tools/','/tools/google-ads-budget-calculator/','/locations/','/qatar/','/us/','/industries/','/answers/','/research/'];
const browser=await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--no-sandbox']});
try {
 const page=await browser.newPage();
 await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
 await page.setRequestInterception(true);
 page.on('request',r=>new URL(r.url()).origin==='http://localhost:4183'?r.continue():r.abort());
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const records=[];
 for(const route of routes) for(const width of [390,768,1440]) {
  await page.setViewport({width,height:1000});
  const response=await page.goto(`http://localhost:4183${route}`,{waitUntil:'domcontentloaded',timeout:45000});
  await page.evaluate(()=>document.fonts.ready);
  await new Promise(r=>setTimeout(r,120));
  const slug=route.replaceAll('/','_');
  const selectors=route==='/'?['.diagnostic-grid','.home-industry-systems','.home-growth-process','.home-final-cta']:['#main-content h2'];
  let shot=0;
  for(const selector of selectors) {
   const nodes=await page.$$(selector);
   for(const node of nodes.slice(0,route==='/'?1:3)) {
    await node.evaluate(el=>el.scrollIntoView({block:'center'}));
    await page.screenshot({path:`${output}/${slug}-${width}-section-${shot++}.png`});
   }
  }
  if(route==='/contact/'||route==='/') {
   await page.$eval('footer',el=>el.scrollIntoView({block:'start'}));
   await page.screenshot({path:`${output}/${slug}-${width}-footer.png`});
  }
  records.push({route,width,status:response.status(),...await page.evaluate(()=>({overflow:document.documentElement.scrollWidth-innerWidth,headings:[...document.querySelectorAll('h1')].map(n=>n.textContent.trim()),forms:[...document.forms].map(f=>({action:f.getAttribute('action'),fields:[...f.elements].map(n=>({name:n.getAttribute('name'),type:n.getAttribute('type')}))})),sections:[...document.querySelectorAll('main section,.legacy-content section')].map(n=>({className:n.className,heading:n.querySelector('h2,h3')?.textContent.trim(),height:Math.round(n.getBoundingClientRect().height)}))}))});
 }
 await fs.writeFile(`${output}/summary.json`,JSON.stringify({phase,records,errors:[...new Set(errors)]},null,2));
 console.log(JSON.stringify({phase,views:records.length,overflow:records.filter(r=>r.overflow>1).map(({route,width,overflow})=>({route,width,overflow})),errors:[...new Set(errors)]}));
}finally{const timer=setTimeout(()=>browser.process()?.kill('SIGKILL'),5000);try{await browser.close();}finally{clearTimeout(timer);}}
