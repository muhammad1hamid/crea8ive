import assert from "node:assert/strict";
import fs from "node:fs/promises";
import puppeteer from "puppeteer";

const base=process.env.QA_BASE_URL||"http://localhost:4173";
const directory="/private/tmp/crea8iv-home-composition";
await fs.mkdir(directory,{recursive:true});
const browser=await puppeteer.launch({executablePath:"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",headless:true,args:["--no-sandbox"]});
try{
 const page=await browser.newPage();
 await page.setRequestInterception(true);
 page.on("request",r=>new URL(r.url()).hostname==="localhost"?r.continue():r.abort());
 for(const theme of ["dark","light"]){
  await page.evaluateOnNewDocument(t=>localStorage.setItem("crea8iv-theme",t),theme);
  for(const width of [320,390,768,1024,1440]){
   await page.setViewport({width,height:1000});
   await page.goto(base,{waitUntil:"networkidle2"});
   await page.evaluate(()=>document.fonts.ready);
   // Force actual section sizes for deterministic below-fold screenshots.
   await page.addStyleTag({content:".home-luxury-story>section{content-visibility:visible!important}"});
   for(const[name,selector]of [["logos",".home-logo-marquee"],["work",".home-website-proof"],["process",".home-growth-process"],["founder",".home-founder-mark"],["closing",".home-final-cta"]]){
    await page.$eval(selector,el=>scrollTo(0,scrollY+el.getBoundingClientRect().top-110));
    await new Promise(r=>setTimeout(r,250));
    await page.screenshot({path:`${directory}/${name}-${theme}-${width}.png`});
   }
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true,`${theme} ${width} overflow`);
   assert.equal(await page.$eval(".home-founder-mark img",el=>getComputedStyle(el).objectFit),"contain");
   const logo=await page.$eval('.home-logo-marquee a[class*="logo"]',el=>{
    const box=el.getBoundingClientRect(),style=getComputedStyle(el),image=el.querySelector("img");
    return {width:box.width,height:box.height,radius:style.borderRadius,padding:parseFloat(getComputedStyle(image).paddingLeft)/box.width,fit:getComputedStyle(image).objectFit};
   });
   assert.equal(logo.width,logo.height,"Logo frames remain circular");
   assert.equal(logo.radius,"50%");
   assert.ok(logo.width>=(width<640?116:144),"Client marks are prominent");
   assert.ok(logo.padding<.04,"No excessive white padding around client marks");
   assert.equal(logo.fit,"contain","Client artwork is not cropped");
   const gloss=await page.$eval('.home-website-proof a[data-project]',el=>({background:getComputedStyle(el).backgroundImage,shadow:getComputedStyle(el).boxShadow}));
   assert.ok(gloss.background.includes("linear-gradient"),"Website cards have a glossy surface");
   assert.notEqual(gloss.shadow,"none");
   if(width>=768){
    const columns=await page.$eval(".home-process-list",el=>getComputedStyle(el).gridTemplateColumns.split(" ").length);
    assert.equal(columns,3,"Three-part desktop process");
   }
   await page.$eval('[aria-label="Pause logo motion"]',el=>el.scrollIntoView({block:"center"}));
   await page.click('[aria-label="Pause logo motion"]');
   await page.waitForSelector('[aria-label="Play logo motion"]');
   const hit=await page.$eval(".home-final-cta .home-lux-button",el=>({width:el.getBoundingClientRect().width,height:el.getBoundingClientRect().height}));
   assert.ok(hit.width>=200&&hit.height>=44);
   console.log(JSON.stringify({theme,width,overflow:false,process:"passed",founder:"uncropped",logoControls:"passed",closingCTA:hit}));
  }
 }
}finally{
 const timeout=setTimeout(()=>browser.process()?.kill("SIGKILL"),5000);
 try{await browser.close();}finally{clearTimeout(timeout);}
}
