import assert from "node:assert/strict";
import fs from "node:fs/promises";
import puppeteer from "puppeteer";

const base = process.env.QA_BASE_URL || "http://localhost:4173";
const directory = "/private/tmp/crea8iv-agency-body";
await fs.mkdir(directory,{recursive:true});
const browser = await puppeteer.launch({executablePath:"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",headless:true,args:["--no-sandbox"]});
try {
 const page = await browser.newPage();
 await page.setRequestInterception(true);
 page.on("request",r=>new URL(r.url()).hostname==="localhost"?r.continue():r.abort());
 const errors=[];
 page.on("pageerror",error=>errors.push(error.message));
 for(const theme of ["dark","light"]){
  await page.evaluateOnNewDocument(value=>localStorage.setItem("crea8iv-theme",value),theme);
  for(const width of [320,390,768,1440]){
   errors.length=0;
   await page.setViewport({width,height:1000});
   await page.goto(base,{waitUntil:"networkidle2"});
   const order=await page.$$eval("h2",nodes=>nodes.map(n=>n.textContent));
   assert.ok(order.indexOf("Websites made for the way buyers decide.") < order.indexOf("Not random marketing. Complete growth systems."));
   for(const [name,selector]of [["proof",".home-website-proof"],["services",'[aria-label="Complete growth infrastructure"]'],["industry",".home-industry-systems"]]){
    await page.$eval(selector,el=>el.scrollIntoView({block:"start"}));
    await new Promise(r=>setTimeout(r,350));
    await page.$eval(selector,el=>scrollTo(0,scrollY+el.getBoundingClientRect().top-110));
    await page.screenshot({path:`${directory}/${name}-${theme}-${width}.png`});
   }
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true,`${width} overflow`);
   if(width<768){
    const target=await page.$('.home-industry-systems button[title="Enlarge image"]');
    assert.equal(await target.$eval("span svg",el=>getComputedStyle(el).stroke),"rgb(255, 255, 255)","Enlarge icon stays visible in both themes");
    await target.scrollIntoView();
    await target.click();
    await page.waitForSelector("dialog[open]");
    await page.click('dialog[open] [aria-label="Zoom image"]');
    assert.equal(await page.$eval('dialog[open] [data-zoom]',el=>el.dataset.zoom),"true");
    await page.keyboard.press("Escape");
    assert.equal(await page.evaluate(()=>document.activeElement?.getAttribute("title")),"Enlarge image");
    await page.click('[data-quick-contact] [aria-label="Open Crea8iv Media assistant"]');
    await page.waitForSelector('[data-assistant-root] [role="dialog"]');
    await page.click('[data-assistant-root] [aria-label="Close assistant"]');
   }
   assert.deepEqual(errors,[]);
   console.log(JSON.stringify({theme,width,proofOrder:"passed",overflow:false}));
  }
 }
 await page.goto(`${base}/case-studies/home-studio-interiors/`,{waitUntil:"networkidle2"});
 const evidence=await page.$$('button[title="Enlarge image"]');
 assert.ok(evidence.length>=6,"All creative/evidence galleries must be inspectable");
 await evidence[0].scrollIntoView(); await evidence[0].click();
 await page.waitForSelector("dialog[open] img");
 await page.keyboard.press("Escape");
 await page.goto(`${base}/contact/`,{waitUntil:"networkidle2"});
 assert.equal(await page.$$eval('[data-theme-toggle]',nodes=>nodes.filter(n=>n.getBoundingClientRect().width>0).length),1,"One theme control");
 await page.evaluate(()=>scrollTo(0,700));
 await page.waitForSelector('[data-quick-contact]');
 await page.focus('input[name="name"],input[type="text"]');
 assert.equal(await page.$eval('[data-quick-contact]',el=>getComputedStyle(el).visibility),"hidden");
 console.log(JSON.stringify({evidenceImages:evidence.length,themeControl:"passed",formClearance:"passed"}));
}finally{
 const timeout=setTimeout(()=>browser.process()?.kill("SIGKILL"),5000);
 try{await browser.close();}finally{clearTimeout(timeout);}
}
