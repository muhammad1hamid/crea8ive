import fs from 'node:fs/promises';
import path from 'node:path';
import {launch,ready,save,base,out,wait} from './audit-lib.mjs';
const browser=await launch();
try{const p=await browser.newPage();await ready(p,base+'/');
 const urls=JSON.parse(await fs.readFile(path.join(out,'sitemap-urls.json'),'utf8')).filter(u=>!u.endsWith('/sitemap.xml'));
 for(const route of ['/services/','/our-services/','/portfolio/','/our-team/','/careers/','/qa-audit-nonexistent-20261014/'])if(!urls.includes(base+route))urls.push(base+route);
 const results=[];
 for(let i=0;i<urls.length;i+=3){
  const batch=await p.evaluate(async urls=>Promise.all(urls.map(async url=>{try{const start=performance.now(),r=await fetch(url,{signal:AbortSignal.timeout(25000)}),html=await r.text();const doc=new DOMParser().parseFromString(html,'text/html');const q=s=>doc.querySelector(s);return {requested:url,url:r.url,status:r.status,contentType:r.headers.get('content-type'),ms:Math.round(performance.now()-start),bytes:new TextEncoder().encode(html).length,title:q('title')?.textContent,description:q('meta[name=description]')?.content,canonical:q('link[rel=canonical]')?.getAttribute('href'),robots:q('meta[name=robots]')?.content,h1:[...doc.querySelectorAll('h1')].map(e=>e.textContent.trim()),headings:[...doc.querySelectorAll('h2,h3')].map(e=>e.textContent.trim()),og:{title:q('meta[property="og:title"]')?.content,description:q('meta[property="og:description"]')?.content,url:q('meta[property="og:url"]')?.content,image:q('meta[property="og:image"]')?.content},links:[...doc.querySelectorAll('a[href]')].map(e=>({href:e.getAttribute('href'),text:e.textContent.trim().slice(0,100)})),images:[...doc.images].map(e=>({src:e.getAttribute('src'),alt:e.getAttribute('alt')})),schema:[...doc.querySelectorAll('script[type="application/ld+json"]')].map(e=>{try{return JSON.parse(e.textContent)}catch{return {invalid:true}}}),headers:Object.fromEntries(['content-security-policy','x-frame-options','strict-transport-security','x-content-type-options','referrer-policy','cache-control','x-robots-tag'].map(h=>[h,r.headers.get(h)])),challenge:html.includes('Checking your browser before accessing')};}catch(e){return {requested:url,error:String(e)};}})),urls.slice(i,i+3));
  results.push(...batch);await save('crawl-results.json',results);console.log(JSON.stringify({done:results.length,total:urls.length,last:batch.map(x=>({url:x.requested,status:x.status,title:x.title,error:x.error}))}));await wait(180);
 }
 const broken=results.filter(x=>x.status>=400||x.error||x.challenge);await save('crawl-summary.json',{total:results.length,html:results.filter(x=>x.contentType?.includes('text/html')).length,broken});
}finally{await browser.close();}
