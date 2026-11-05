import puppeteer from '../../../node_modules/puppeteer/lib/puppeteer/puppeteer.js';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const out=path.dirname(fileURLToPath(import.meta.url));
const browser=await puppeteer.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,args:['--disable-background-networking','--disable-extensions','--no-first-run']});
try {
 const page=await browser.newPage();
 await page.setViewport({width:1440,height:1000,deviceScaleFactor:1});
 const errors=[];page.on('pageerror',e=>errors.push(String(e)));
 const response=await page.goto('https://crea8ivmedia.com/',{waitUntil:'networkidle2',timeout:60000});
 await page.waitForFunction(()=>!document.body.innerText.includes('Checking your browser') && document.querySelector('header'),{timeout:45000}).catch(()=>{});
 await new Promise(r=>setTimeout(r,4000));
 await page.screenshot({path:path.join(out,'discovery-home-1440.png'),fullPage:true});
 const data=await page.evaluate(()=>({url:location.href,title:document.title,text:document.body.innerText,links:[...document.querySelectorAll('a[href]')].map(a=>({text:a.innerText,href:a.href})),scripts:[...document.scripts].map(s=>s.src).filter(Boolean),theme:document.documentElement.dataset.theme}));
 Object.assign(data,{status:response.status(),headers:response.headers(),errors,browser:await browser.version(),capturedAt:new Date().toISOString()});
 await fs.writeFile(path.join(out,'discovery.json'),JSON.stringify(data,null,2));
 console.log(JSON.stringify({status:data.status,url:data.url,title:data.title,browser:data.browser,text:data.text.slice(0,8500),errors}));
} finally {await browser.close();}
