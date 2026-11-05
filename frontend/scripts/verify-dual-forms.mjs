import puppeteer from 'puppeteer';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const browser=await puppeteer.launch({headless:true});const checks=[];
try{
const page=await browser.newPage();await page.setRequestInterception(true);let fail=true,payload;
page.on('request',r=>{if(r.url().includes('/enquiries/submit.php')){payload=JSON.parse(r.postData());return r.respond({status:fail?503:200,contentType:'application/json',body:JSON.stringify(fail?{ok:false}:{ok:true,reference:'CM-LOCAL-MOCK'})});}return new URL(r.url()).hostname==='127.0.0.1'||r.url().startsWith('data:')?r.continue():r.abort();});
const check=(name,pass)=>{assert.ok(pass,name);checks.push(name);};
for(const ar of [false,true]){
 await page.goto('http://127.0.0.1:3120/qa/?utm_source=dual-test&utm_medium=local&utm_campaign=growth',{waitUntil:'networkidle0'});
 await page.goto(`http://127.0.0.1:3120/qa/${ar?'ar/':''}contact/?service=seo`,{waitUntil:'networkidle0'});
 for(const [name,value] of Object.entries({name:ar?'اختبار محلي':'Local QA',company:'Test only',phone:'+974 0000 0000',email:'test@example.invalid',goal:ar?'تحسين مسار العملاء':'Improve qualified enquiries'}))await page.type(`[name=${name}]`,value);
 await page.select('[name=budget]','scope-first');await page.click('[name=consent]');
 fail=true;await page.click('form button');await page.waitForSelector('[role=alert]');check(`${ar?'AR':'EN'} failure shown`,Boolean(await page.$('[role=alert]')));check('Business goal satisfies backend requirements when details omitted',payload.requirements===payload.goal);check('Service and entry attribution preserved',payload.service==='seo'&&payload.source==='dual-test'&&payload.landing_page==='/qa/');check('Correct form language',payload.language===(ar?'ar-QA':'en-QA'));
 fail=false;await page.click('form button');await page.waitForSelector('[role=status]');check(`${ar?'AR':'EN'} success requires backend acknowledgement`,(await page.$eval('[role=status]',e=>e.textContent)).includes('CM-LOCAL-MOCK'));
}
await fs.writeFile('../reports/dual-market/forms.json',JSON.stringify({checks,scope:'Mocked local endpoint for browser error/retry/success and payload verification. No actual lead or production submission.'},null,2));console.log(checks);
}finally{await browser.close();}
