import assert from "node:assert/strict";
import fs from "node:fs/promises";
import puppeteer from "puppeteer";

const base=process.env.QA_BASE_URL || "http://localhost:4173";
const directory="/private/tmp/crea8iv-visual-release";
await fs.mkdir(directory,{recursive:true});
const routes=["/","/website-development/","/social-media-management/","/case-studies/","/case-studies/home-studio-interiors/","/case-studies/black-petals/","/case-studies/buildscape/","/website-portfolio/","/tools/","/tools/website-roi-calculator/","/blog/anatomy-ai-ready-business-website/","/contact/","/pricing/"];
const results=[];
const browser=await puppeteer.launch({executablePath:"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",headless:true,args:["--no-sandbox"]});
try {
 const page=await browser.newPage();
 await page.setRequestInterception(true);
 page.on("request",r=>new URL(r.url()).hostname==="localhost"?r.continue():r.abort());
 const errors=[];page.on("pageerror",error=>errors.push(error.message));
 for(const theme of ["dark","light"]){
  await page.evaluateOnNewDocument(theme=>localStorage.setItem("crea8iv-theme",theme),theme);
  for(const width of [390,1440]){
   await page.setViewport({width,height:950});
   for(const route of routes){
    errors.length=0;
    const response=await page.goto(base+route,{waitUntil:"networkidle2"});
    assert.equal(response.status(),200,route);
    await page.evaluate(()=>document.fonts.ready);
    await page.addStyleTag({content:"*{scroll-behavior:auto!important} main section{content-visibility:visible!important}"});
    const headings=await page.$$("h2");
    const selected=[0,Math.floor(headings.length/2),headings.length-1];
    for(const i of [...new Set(selected)].filter(i=>i>=0&&i<headings.length)){
     await headings[i].evaluate(el=>scrollTo(0,scrollY+el.getBoundingClientRect().top-120));
     await new Promise(r=>setTimeout(r,160));
     await page.screenshot({path:`${directory}/${route.replaceAll("/","_")||"home"}-${theme}-${width}-${i}.png`});
    }
    const state=await page.evaluate(()=>{
     const visible=el=>{const r=el.getBoundingClientRect();return r.width>0&&r.height>0&&getComputedStyle(el).visibility!=="hidden"};
     return {
      overflow:document.documentElement.scrollWidth>innerWidth+1,
      // Font ascenders can extend beyond line-height without being clipped.
      clippedHeadings:[...document.querySelectorAll("h1,h2,h3")].filter(visible).filter(el=>{const s=getComputedStyle(el);return (/hidden|clip/.test(s.overflowX)&&el.scrollWidth>el.clientWidth+2)||(/hidden|clip/.test(s.overflowY)&&el.scrollHeight>el.clientHeight+3);}).map(el=>el.textContent.trim()),
      brokenImages:[...document.images].filter(visible).filter(el=>el.complete&&el.naturalWidth===0).map(el=>el.getAttribute("src")),
      smallControls:[...document.querySelectorAll('button')].filter(visible).filter(el=>{const r=el.getBoundingClientRect();return r.width<40||r.height<40}).map(el=>({name:el.getAttribute("aria-label")||el.textContent.trim(),width:el.clientWidth,height:el.clientHeight})),
      unlabelledFields:[...document.querySelectorAll('input:not([type="hidden"]),textarea,select')].filter(visible).filter(el=>!el.labels?.length&&!el.getAttribute("aria-label")&&!el.getAttribute("aria-labelledby")).map(el=>el.name||el.type),
     };
    });
    results.push({route,theme,width,...state,errors:[...errors]});
    console.log(JSON.stringify(results.at(-1)));
   }
  }
 }
 await fs.writeFile(`${directory}/results.json`,JSON.stringify(results,null,2));
 assert.ok(results.every(r=>!r.overflow&&!r.clippedHeadings.length&&!r.brokenImages.length&&!r.errors.length&&!r.smallControls.length&&!r.unlabelledFields.length),"Visual regressions: inspect results.json");
 console.log(`Visual sweep passed ${results.length} page/theme/viewport combinations.`);
}finally{
 const timeout=setTimeout(()=>browser.process()?.kill("SIGKILL"),5000);
 try{await browser.close();}finally{clearTimeout(timeout);}
}
