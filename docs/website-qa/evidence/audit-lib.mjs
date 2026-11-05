import puppeteer from '../../../node_modules/puppeteer/lib/puppeteer/puppeteer.js';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
export const out=path.dirname(fileURLToPath(import.meta.url));
export const base='https://crea8ivmedia.com';
export const wait=ms=>new Promise(r=>setTimeout(r,ms));
export const save=(name,data)=>fs.writeFile(path.join(out,name),typeof data==='string'?data:JSON.stringify(data,null,2));
export async function launch(){return puppeteer.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,args:['--disable-background-networking','--disable-extensions','--no-first-run'],protocolTimeout:120000});}
export async function ready(page,url){
 let statuses=[]; const listener=r=>{if(r.request().isNavigationRequest()&&r.frame()===page.mainFrame())statuses.push({url:r.url(),status:r.status()});};
 page.on('response',listener);
 await page.goto(url,{waitUntil:'domcontentloaded',timeout:60000});
 await page.waitForFunction(()=>document.body&&!document.body.innerText.includes('Checking your browser')&&document.readyState!=='loading',{timeout:60000}).catch(()=>{});
 await page.waitForSelector('header',{timeout:15000}).catch(()=>{});
 await page.evaluate(()=>document.fonts.ready).catch(()=>{});await wait(1800);
 page.off('response',listener);return statuses;
}
export async function scrollAll(page){
 let height=await page.evaluate(()=>document.documentElement.scrollHeight);
 for(let y=0;y<height;y+=650){await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),y);await wait(220);height=await page.evaluate(()=>document.documentElement.scrollHeight);if(y>60000)break;}
 await wait(1200);await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await wait(500);
}
export async function instrument(page){
 const events={console:[],pageErrors:[],httpErrors:[],failed:[],blockedWrites:[]};
 page.on('console',m=>{if(['error','warn'].includes(m.type()))events.console.push({type:m.type(),text:m.text().slice(0,900)});});
 page.on('pageerror',e=>events.pageErrors.push(String(e)));
 page.on('response',r=>{if(r.status()>=400)events.httpErrors.push({url:r.url(),status:r.status(),type:r.request().resourceType()});});
 page.on('requestfailed',r=>events.failed.push({url:r.url(),type:r.resourceType(),failure:r.failure()?.errorText}));
 await page.setRequestInterception(true);
 page.on('request',r=>{if(!['GET','HEAD','OPTIONS'].includes(r.method())){events.blockedWrites.push({url:r.url().split('?')[0],method:r.method()});r.abort();}else r.continue();});
 await page.evaluateOnNewDocument(()=>{
  window.__qaPerf={lcp:[],shifts:[],longtasks:[]};
  for(const [type,key] of [['largest-contentful-paint','lcp'],['layout-shift','shifts'],['longtask','longtasks']]){try{new PerformanceObserver(list=>{for(const e of list.getEntries())window.__qaPerf[key].push({start:e.startTime,duration:e.duration,value:e.value,hadRecentInput:e.hadRecentInput,element:e.element?.outerHTML?.slice(0,300)});}).observe({type,buffered:true});}catch{}}
 });return events;
}
export async function inspect(page){return page.evaluate(()=>{
 const visible=e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return r.width>0&&r.height>0&&s.visibility!=='hidden'&&s.display!=='none';};
 const rect=e=>{const r=e.getBoundingClientRect();return {x:Math.round(r.x),y:Math.round(r.y+scrollY),w:Math.round(r.width),h:Math.round(r.height)};};
 const label=e=>(e.getAttribute('aria-label')||e.innerText||e.getAttribute('title')||'').trim().slice(0,120);
 const controls=[...document.querySelectorAll('button,a[href],input:not([type=hidden]),select,textarea')].filter(visible);
 return {url:location.href,title:document.title,theme:document.documentElement.dataset.theme,viewport:{width:innerWidth,height:innerHeight},width:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight,
 description:document.querySelector('meta[name=description]')?.content,canonical:document.querySelector('link[rel=canonical]')?.href,robots:document.querySelector('meta[name=robots]')?.content,lang:document.documentElement.lang,
 headings:[...document.querySelectorAll('h1,h2,h3,h4')].filter(visible).map(e=>({level:e.tagName,text:e.innerText,...rect(e),font:getComputedStyle(e).fontFamily,size:getComputedStyle(e).fontSize,lineHeight:getComputedStyle(e).lineHeight})),
 text:document.body.innerText,
 links:[...document.querySelectorAll('a[href]')].map(e=>({text:label(e),href:e.href,target:e.target,rel:e.rel,...rect(e)})),
 images:[...document.images].map(e=>({src:e.currentSrc||e.src,alt:e.getAttribute('alt'),loaded:e.complete&&e.naturalWidth>0,naturalWidth:e.naturalWidth,naturalHeight:e.naturalHeight,loading:e.loading,...rect(e)})),
 overflow:[...document.querySelectorAll('body *')].filter(e=>visible(e)&&e.getBoundingClientRect().right>innerWidth+2&&getComputedStyle(e).position!=='fixed').slice(0,50).map(e=>({tag:e.tagName,class:String(e.className).slice(0,140),text:label(e),...rect(e)})),
 unnamedControls:controls.filter(e=>!label(e)&&!e.labels?.length&&!e.querySelector('img[alt]:not([alt=""])')).map(e=>({tag:e.tagName,type:e.type,html:e.outerHTML.slice(0,400),...rect(e)})),
 smallTargets:controls.filter(e=>{const r=e.getBoundingClientRect();return r.width<24||r.height<24;}).map(e=>({tag:e.tagName,text:label(e),...rect(e)})),
 controls:controls.map(e=>({tag:e.tagName,type:e.type,text:label(e),name:e.name,required:e.required,placeholder:e.placeholder,labels:e.labels?[...e.labels].map(l=>l.innerText):undefined,...rect(e)})),
 forms:[...document.forms].map(f=>({action:f.action,method:f.method,fields:[...f.elements].map(e=>({tag:e.tagName,type:e.type,name:e.name,required:e.required,label:e.labels?[...e.labels].map(l=>l.innerText).join(' '):e.getAttribute('aria-label')}))})),
 mainLandmarks:document.querySelectorAll('main,[role=main]').length,
 schema:[...document.querySelectorAll('script[type="application/ld+json"]')].map(e=>{try{return JSON.parse(e.textContent);}catch{return {invalid:true};}}),
 perf:{...window.__qaPerf,navigation:performance.getEntriesByType('navigation').map(e=>e.toJSON()),paint:performance.getEntriesByType('paint').map(e=>e.toJSON()),resources:performance.getEntriesByType('resource').map(e=>({name:e.name,type:e.initiatorType,duration:e.duration,transfer:e.transferSize,encoded:e.encodedBodySize,decoded:e.decodedBodySize}))}
 };});}
