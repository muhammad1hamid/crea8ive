import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const out=path.join(root,'out');
const origin='https://crea8ivmedia.com';
const sitemap=await readFile(path.join(out,'sitemap.xml'),'utf8');
const urls=new Set([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]));
async function collect(dir) {
  for(const entry of await readdir(dir,{withFileTypes:true})) {
    if(entry.isDirectory() && !['_next','portfolio-assets','portfolio-optimized','img','assets','wp-content'].includes(entry.name)) await collect(path.join(dir,entry.name));
    else if(entry.isFile()&&entry.name.endsWith('.html')) {
      const html=await readFile(path.join(dir,entry.name),'utf8');
      for(const match of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
        const href=match[1].replaceAll('&amp;','&');
        if(!href.startsWith('/')&&!href.startsWith(origin)) continue;
        const url=new URL(href,origin);url.hash='';
        if(url.origin===origin&&!url.pathname.startsWith('/admin')&&!url.pathname.startsWith('/_next')) urls.add(url.href);
      }
    }
  }
}
await collect(out);
const queue=[...urls],results=[];
async function fetchText(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
  return { response, body: await response.text() };
}
async function worker(){while(queue.length){const url=queue.shift();try{let { response, body }=await fetchText(url);
      if(response.ok&&response.headers.get('content-type')?.includes('text/html')) {
        const pathname=decodeURIComponent(new URL(response.url).pathname);
        const file=path.join(out,pathname.endsWith('/')?pathname+'index.html':pathname);
        let expected;try{expected=await readFile(file,'utf8');}catch{}
        const title=text=>text.match(/<title>([\s\S]*?)<\/title>/i)?.[1];
        if(expected&&title(expected)&&title(body)!==title(expected)){
          const retryUrl = new URL(url);
          retryUrl.searchParams.set('verify', Date.now().toString());
          ({ response, body }=await fetchText(retryUrl.href));
          if(title(body)!==title(expected))throw new Error('Live page title does not match exported page');
        }
      }
      results.push({url,status:response.status,final:response.url,ok:response.ok});}catch(error){results.push({url,ok:false,error:error.message});}}}
await Promise.all(Array.from({length:8},worker));
const failures=results.filter(r=>!r.ok);
const reportDir=path.join(root,'.deploy');
await mkdir(reportDir,{recursive:true});
await writeFile(path.join(reportDir,'live-route-audit.json'),JSON.stringify({checkedAt:new Date().toISOString(),total:results.length,failures,results},null,2));
console.log(`Checked ${results.length} sitemap and internal-link URLs; ${failures.length} failures.`);
if(failures.length){console.error(JSON.stringify(failures,null,2));process.exitCode=1;}
