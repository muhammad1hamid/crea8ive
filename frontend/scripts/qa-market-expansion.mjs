import assert from 'node:assert/strict';
import puppeteer from 'puppeteer';
const base=process.env.VERIFY_BASE||'http://localhost:3012';
const countries=['us','uk','canada','australia','uae','saudi-arabia'];
const cities=['new-york','london','toronto','sydney','dubai','riyadh'];
const services=['web-development','google-ads-management','ai-visibility-seo'];
const paths=countries.flatMap((c,i)=>[...services,cities[i]].map(s=>`/${c}/${s}/`));
const browser=await puppeteer.launch({headless:true});
const errors=[];
try{
 const page=await browser.newPage();
 await page.setRequestInterception(true);
 page.on('request',r=>r.url().startsWith(base)?r.continue():r.abort());
 page.on('pageerror',e=>errors.push(e.message));
 for(const route of paths){
  await page.setViewport({width:390,height:844});
  const response=await page.goto(base+route,{waitUntil:'networkidle0'});assert.equal(response.status(),200);
  const result=await page.evaluate(()=>({h1:document.querySelectorAll('main h1').length,overflow:document.documentElement.scrollWidth>innerWidth,canonical:document.querySelector('link[rel=canonical]')?.href,schemas:[...document.querySelectorAll('script[type="application/ld+json"]')].map(s=>JSON.parse(s.textContent)),service:document.querySelector('[name=service]')?.value,links:[...document.querySelectorAll('main a')].map(a=>a.getAttribute('href'))}));
  assert.equal(result.h1,1,route);assert(!result.overflow,route);assert.equal(result.canonical,'https://crea8ivmedia.com'+route);
  if(route.includes('google-ads-management'))assert.equal(result.service,'google-ads');
  assert(result.links.includes('/'+route.split('/')[1]+'/'));
 }
 for(const width of [390,768,1440])for(const theme of ['light','dark']){
  await page.setViewport({width,height:1000});await page.goto(base+'/us/web-development/',{waitUntil:'networkidle0'});
  await page.evaluate(t=>document.documentElement.dataset.theme=t,theme);
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.screenshot({path:`.deploy/market-qa/service-${width}-${theme}.png`});
 }
 assert.deepEqual(errors,[]);
 console.log(`PASS: ${paths.length} expansion pages; metadata, schema parsing, mobile overflow, selected service, and six theme/viewport screenshots.`);
}finally{await browser.close();}
