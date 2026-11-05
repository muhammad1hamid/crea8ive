import assert from "node:assert/strict";
import fs from "node:fs/promises";
import puppeteer from "puppeteer";

const directory = "/private/tmp/crea8iv-hero-lock";
await fs.mkdir(directory, { recursive: true });
const mode = process.argv[2] || "check";
const browser = await puppeteer.launch({ executablePath:"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless:true, args:["--no-sandbox"] });
try {
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on("request", request => new URL(request.url()).hostname === "localhost" ? request.continue() : request.abort());
  for (const theme of ["dark", "light"]) {
    await page.evaluateOnNewDocument(value => localStorage.setItem("crea8iv-theme", value), theme);
    for (const width of [390,1440]) {
      await page.setViewport({ width, height:1000 });
      await page.goto(process.env.QA_BASE_URL || "http://localhost:4173/", {waitUntil:"networkidle2"});
      await page.evaluate(() => document.fonts.ready);
      await page.addStyleTag({content:"*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}"});
      await new Promise(resolve=>setTimeout(resolve,1800));
      const hero = await page.$(".premium-hero");
      const state = await hero.evaluate(el => ({html:el.innerHTML, width:el.getBoundingClientRect().width,height:el.getBoundingClientRect().height,headline:el.querySelector("h1").innerText}));
      const target = `${directory}/${theme}-${width}`;
      await hero.screenshot({path:`${target}-${mode}.png`});
      if (mode === "baseline") await fs.writeFile(`${target}.json`,JSON.stringify(state));
      else {
        const baseline = JSON.parse(await fs.readFile(`${target}.json`,"utf8"));
        assert.equal(state.width,baseline.width);
        assert.equal(state.height,baseline.height);
        assert.equal(state.headline,baseline.headline);
        assert.equal(state.html,baseline.html,"Hero markup changed");
        // A fixed header paints over the hero screenshot and its logo can be
        // rasterised differently. Compare the hero, not that unrelated overlay.
        const sources=await Promise.all([`${target}-baseline.png`,`${target}-check.png`].map(async file=>`data:image/png;base64,${(await fs.readFile(file)).toString("base64")}`));
        const difference=await page.evaluate(async sources=>{
          const images=await Promise.all(sources.map(async source=>{
            const image=new Image();image.src=source;await image.decode();
            const canvas=document.createElement("canvas");canvas.width=image.naturalWidth;canvas.height=image.naturalHeight-96;
            const context=canvas.getContext("2d");context.drawImage(image,0,-96);
            return context.getImageData(0,0,canvas.width,canvas.height).data;
          }));
          let sum=0,material=0;
          for(let k=0;k<images[0].length;k+=4){let maximum=0;for(let i=0;i<3;i++){const delta=Math.abs(images[0][k+i]-images[1][k+i]);sum+=delta;maximum=Math.max(maximum,delta);}if(maximum>20)material++;}
          return {mean:sum/(images[0].length/4*3),material:material/(images[0].length/4)};
        },sources);
        assert.ok(difference.mean<.1 && difference.material<.001,`${theme} ${width}: ${JSON.stringify(difference)}`);
      }
      console.log(`${mode}: ${theme} ${width} hero ${state.width} x ${state.height}`);
    }
  }
} finally {
  const timeout=setTimeout(()=>browser.process()?.kill("SIGKILL"),5000);
  try { await browser.close(); } finally { clearTimeout(timeout); }
}
