import {launch,ready,save,base} from './audit-lib.mjs';
const browser=await launch();
try{const p=await browser.newPage();await ready(p,base+'/');
 const docs=await p.evaluate(async()=>{const out=[];for(const u of ['/robots.txt','/sitemap-index.xml','/sitemap.xml','/sitemap_index.xml','/llms.txt']){try{const r=await fetch(u);out.push({path:u,status:r.status,headers:Object.fromEntries(r.headers),body:await r.text()});}catch(e){out.push({path:u,error:String(e)});}}return out;});
 await save('discovery-documents.json',docs);
 const urls=[...new Set(docs.filter(x=>x.path.includes('sitemap')&&x.body).flatMap(x=>[...x.body.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1])))];
 await save('sitemap-urls.json',urls);
 console.log(JSON.stringify({documents:docs.map(x=>({path:x.path,status:x.status,bytes:x.body?.length})),count:urls.length,urls:urls.slice(0,45)}));
}finally{await browser.close();}
