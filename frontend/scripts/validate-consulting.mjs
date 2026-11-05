import puppeteer from 'puppeteer';
import fs from 'node:fs';
import path from 'node:path';
const dir=path.resolve(import.meta.dirname,'../../reports/consulting-editorial');
const base=process.env.AUDIT_BASE || 'http://localhost:3013';
const pilot=['/case-studies/buildscape/','/case-studies/the-smile-xperts/','/blog/lead-generation-for-builders-and-architects-in-pakistan/','/blog/google-business-profile-clinics-islamabad-rawalpindi/','/blog/whatsapp-automation-for-clinics-booking-follow-up-and-reminders/'];
const pages=process.env.FULL_AUDIT ? JSON.parse(fs.readFileSync(path.join(dir,'content-map.json'),'utf8')).rows.map(r=>new URL(r.url).pathname).concat('/syed-qamar-abbas/','/growth-systems/','/meta-ads/','/marketing-automation/','/ai-search-optimization/') : pilot;
const browser=await puppeteer.launch({headless:true,args:['--no-sandbox']});
const results=[];
try {
 for(const viewport of [{width:1440,height:1000},{width:390,height:844}]) {
  const page=await browser.newPage(); await page.setViewport(viewport);
  const errors=[]; page.on('pageerror',e=>errors.push(e.message));
  for(const route of pages) {
   const start=errors.length; const response=await page.goto(base+route,{waitUntil:'networkidle2'});
   const state=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth+1,canonical:document.querySelector('link[rel=canonical]')?.href,links:[...document.querySelectorAll('[data-consulting-link]')].map(a=>a.href),schema:[...document.querySelectorAll('script[type="application/ld+json"]')].map(s=>JSON.parse(s.textContent)),heading:!!document.querySelector('#business-decision-heading,#strategic-context-heading,#founder-title,#service-decision-heading')}));
   let events=[];
   if(state.links.length) {
    await page.evaluate(()=>{window.__referrals=[];window.gtag=(...args)=>window.__referrals.push(args);document.querySelector('[data-consulting-link]').addEventListener('click',e=>e.preventDefault());document.querySelector('[data-consulting-link]').focus();});
    await page.keyboard.press('Enter');
    events=await page.evaluate(()=>window.__referrals.filter(e=>e[1]==='consulting_referral'));
   }
   results.push({route,width:viewport.width,status:response.status(),...state,events,errors:errors.slice(start)});
   if(pilot.includes(route)) {
    const section=await page.$('section[aria-labelledby="strategic-context-heading"],section[aria-labelledby="business-decision-heading"]');
    if(section) await section.screenshot({path:path.join(dir,`pilot-${route.split('/').filter(Boolean).at(-1)}-${viewport.width}.png`)});
   }
  }
  await page.close();
 }
} finally {await browser.close();}
const errors=results.filter(r=>r.status!==200||r.overflow||r.errors.length||!r.heading||(r.links.length&&r.events.length!==1));
fs.writeFileSync(path.join(dir,process.env.FULL_AUDIT?'full-validation.json':'pilot-validation.json'),JSON.stringify({base,results,failures:errors},null,2));
console.log(JSON.stringify({checks:results.length,failures:errors.map(r=>({route:r.route,width:r.width,overflow:r.overflow,errors:r.errors,events:r.events.length,heading:r.heading}))},null,2));
if(errors.length)process.exitCode=1;
