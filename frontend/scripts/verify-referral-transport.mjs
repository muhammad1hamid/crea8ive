import puppeteer from 'puppeteer';
import fs from 'node:fs';
import path from 'node:path';
const browser=await puppeteer.launch({headless:true,args:['--no-sandbox']});
const base=process.env.AUDIT_BASE || 'http://localhost:3013';
const report={requests:[],queue:[],note:'GA collection requests intercepted locally; no synthetic consultation was sent. This does not verify receipt in GA4 reports.'};
try {
 const page=await browser.newPage();
 await page.setRequestInterception(true);
 page.on('request',request=>{
  const url=request.url();
  if(/google-analytics\.com\/.*collect/.test(url)) {
   report.requests.push({url,body:request.postData()||''});return request.respond({status:204});
  }
  if(/clarity\.ms|connect\.facebook\.net/.test(url))return request.abort();
  return request.continue();
 });
 await page.goto(base+'/blog/lead-generation-for-builders-and-architects-in-pakistan/',{waitUntil:'networkidle2'});
 await page.keyboard.press('Tab');
 await new Promise(r=>setTimeout(r,7000));
 await page.evaluate(()=>{const a=document.querySelector('[data-consulting-link]');a.addEventListener('click',e=>e.preventDefault());a.focus();});
 await page.keyboard.press('Enter');
 await new Promise(r=>setTimeout(r,6000));
 report.queue=await page.evaluate(()=>Array.from(window.dataLayer||[]).map(x=>Array.isArray(x)?x:Object.prototype.toString.call(x)==='[object Arguments]'?Array.from(x):x).filter(x=>Array.isArray(x)&&x[1]==='consulting_referral'));
 const referralHits=report.requests.filter(r=>decodeURIComponent(r.url+' '+r.body).includes('consulting_referral'));
 report.referralRequests=referralHits.length;
 report.singleQueuedEvent=report.queue.length===1;
 const dir=path.resolve(import.meta.dirname,'../../reports/consulting-editorial');
 fs.writeFileSync(path.join(dir,'analytics-transport.json'),JSON.stringify(report,null,2));
 console.log(JSON.stringify({referralRequests:report.referralRequests,singleQueuedEvent:report.singleQueuedEvent,note:report.note}));
 if(!report.singleQueuedEvent)process.exitCode=1;
} finally {await browser.close();}
