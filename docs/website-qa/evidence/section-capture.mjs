import path from 'node:path';
import {launch,ready,save,base,out,wait,instrument} from './audit-lib.mjs';
const routes=process.argv.slice(2);const browser=await launch();
try{const warm=await browser.newPage();await ready(warm,base+'/');await warm.close();
for(const route of routes){const slug=route==='/'?'home':route.slice(1,-1).replaceAll('/','-');const p=await browser.newPage();await instrument(p);const records=[];
for(const width of [1440,390]){
 await p.setViewport({width,height:width===1440?1000:844,deviceScaleFactor:1});await ready(p,base+route);
 const headings=await p.$$eval('h2',hs=>hs.map((e,i)=>({index:i,text:e.textContent.trim()})));
 const selections=headings.length>18?headings.filter((x,i)=>i<12||i>=headings.length-3):headings;
 for(const h of selections){
  await p.evaluate(i=>{const e=document.querySelectorAll('h2')[i];if(e)e.scrollIntoView({block:'start',behavior:'instant'});scrollBy({top:-120,behavior:'instant'});},h.index);await wait(1100);
  // Capture after the real section has entered the viewport and lazy media has had time to load.
  const file=`${slug}-${width}-section-${String(h.index+1).padStart(2,'0')}.png`;
  await p.screenshot({path:path.join(out,file)});
  const view=await p.evaluate(()=>({scrollY,height:document.documentElement.scrollHeight,text:document.body.innerText,visibleImages:[...document.images].filter(e=>{const r=e.getBoundingClientRect();return r.width&&r.height&&r.top<innerHeight&&r.bottom>0;}).map(e=>({src:e.currentSrc,alt:e.alt,loaded:e.complete&&e.naturalWidth>0})),headings:[...document.querySelectorAll('h1,h2,h3')].filter(e=>{const r=e.getBoundingClientRect();return r.top<innerHeight&&r.bottom>0}).map(e=>({text:e.textContent,style:{color:getComputedStyle(e).color,opacity:getComputedStyle(e).opacity,visibility:getComputedStyle(e).visibility},html:e.outerHTML.slice(0,500)}))}));
  records.push({width,heading:h.text,file,...view});
 }
 await p.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await wait(1500);await p.screenshot({path:path.join(out,`${slug}-${width}-settled-hero.png`)});
}
await save(`${slug}-sections.json`,records);console.log(JSON.stringify({route,captures:records.length}));await p.close();}
}finally{await browser.close();}
