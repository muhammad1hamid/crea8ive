import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import puppeteer from 'puppeteer';

const root = '../reports/website-refinement-2026-10-21';
const before = JSON.parse(await fs.readFile(`${root}/before/route-inventory.json`, 'utf8'));
const after = JSON.parse(await fs.readFile(`${root}/after/route-inventory.json`, 'utf8'));
for (const page of before) {
  const updated = after.find(row => row.route === page.route);
  assert.ok(updated, `Preserved route ${page.route}`);
  for (const field of ['title','description','canonical','robots','h1','schemas','internalLinks']) assert.deepEqual(updated[field], page[field], `${page.route}: ${field} changed`);
}
const report = JSON.parse(await fs.readFile(`${root}/after/rendered-audit.json`, 'utf8'));
assert.deepEqual(report.browserErrors, []);
assert.ok(report.observations.every(row => row.status === 200 && row.overflow <= 1 && row.brokenImages.length === 0));
const browser = await puppeteer.launch({ executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--no-sandbox'] });
const results = [];
try {
  const page = await browser.newPage();
  const base = process.env.QA_BASE_URL || 'http://localhost:4183';
  await page.setRequestInterception(true);
  page.on('request',request=>new URL(request.url()).origin===new URL(base).origin ? request.continue() : request.abort());
  for (const theme of ['dark','light']) {
    await page.evaluateOnNewDocument(value=>localStorage.setItem('crea8iv-theme',value),theme);
    for (const reduced of [true,false]) {
      await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:reduced?'reduce':'no-preference'}]);
      for (const width of [390,768,1440]) {
        await page.setViewport({width,height:1000});
        await page.goto(base,{waitUntil:'networkidle2',timeout:45000});
        await page.waitForSelector('[aria-label="Next website projects"]');
        const rail = '[aria-label="Selected website projects"]';
        await page.$eval(rail,node=>node.scrollIntoView({block:'center',behavior:'instant'}));
        await page.waitForFunction(()=>document.querySelector('[aria-label="Next website projects"]')?.getBoundingClientRect().height>=44);
        await page.click('[aria-label="Next website projects"]');
        await page.waitForFunction(()=>document.querySelector('[aria-label="Selected website projects"]').scrollLeft>0);
        assert.equal(await page.$eval(rail,node=>node.getAttribute('role')),'region');
        const hero = await page.$eval('h1',node=>node.textContent.trim());
        assert.equal(hero,before.find(row=>row.route==='/').h1[0]);
        await page.$eval('.home-premium-position',node=>node.scrollIntoView({block:'center',behavior:'instant'}));
        await page.screenshot({path:`${root}/after/positioning-${theme}-${reduced?'reduced':'normal'}-${width}.png`});
        const cards = await page.$$eval('.home-premium-signal p',nodes=>nodes.map(node=>({width:node.getBoundingClientRect().width,parent:node.parentElement.getBoundingClientRect().width})));
        assert.ok(cards.every(card=>card.parent-card.width<48),'Full-width positioning copy');
        assert.ok(await page.$$eval('.home-premium-signal, .home-conversion-action', nodes=>nodes.every(node=>{
          const style=getComputedStyle(node);
          if(node.matches('.home-premium-signal') && node.closest('[aria-label="Complete growth infrastructure"]')) return style.backgroundImage==='none';
          return node.closest('[data-home-palette]')
            ? style.backgroundImage.startsWith('linear-gradient(115deg,') && style.backgroundColor==='rgb(36, 36, 36)'
            : style.backgroundImage==='none';
        })),'Positioning surfaces must use the approved local treatment, not legacy gradients');
        const contrast = await page.$$eval('.home-premium-signal p',nodes=>{
          const luminance = colour => {
            const rgb = colour.match(/[\d.]+/g).slice(0,3).map(value=>Number(value)/255).map(value=>value<=.04045?value/12.92:((value+.055)/1.055)**2.4);
            return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722;
          };
          return nodes.map(node=>{const fg=luminance(getComputedStyle(node).color);const bg=luminance(getComputedStyle(node.parentElement).backgroundColor);return (Math.max(fg,bg)+.05)/(Math.min(fg,bg)+.05);});
        });
        assert.ok(contrast.every(ratio=>ratio>=4.5),`${theme}: positioning body contrast ${contrast}`);
        assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);
        results.push({theme,width,reduced,projectCarousel:'passed',heroCopy:'unchanged',positioningCopy:'full width',positioningContrast:contrast});
      }
    }
  }
  await page.$eval('.home-conversion-strip button',node=>node.scrollIntoView({block:'center',behavior:'instant'}));
  await page.click('.home-conversion-strip button');
  await page.waitForSelector('[role="dialog"]');
  await page.keyboard.press('Escape');
  await page.setViewport({width:390,height:1000});
  await page.goto(`${base}/results/`,{waitUntil:'networkidle2',timeout:45000});
  const studyRail='[role="region"][aria-label="Client case studies"]';
  await page.waitForSelector(studyRail);
  await page.$eval(studyRail,node=>{node.scrollIntoView({block:'center',behavior:'instant'});node.focus();});
  assert.equal(await page.$eval(studyRail,node=>node.tabIndex),0);
  await page.keyboard.press('ArrowRight');
  await page.waitForFunction(()=>document.querySelector('[aria-label="Client case studies"]').scrollLeft>0);
  await page.screenshot({path:`${root}/after/results-keyboard-390.png`});
  await fs.writeFile(`${root}/interaction-checks.json`,JSON.stringify({preservedRoutes:before.length,metadata:'unchanged',auditEnquiryModal:'opened without submission',resultsRailKeyboard:'passed',checks:results},null,2));
  console.log(JSON.stringify({preservedRoutes:before.length,metadata:'unchanged',responsiveChecks:report.observations.length,interactionChecks:results.length}));
} finally {
  const timeout=setTimeout(()=>browser.process()?.kill('SIGKILL'),5000);
  try { await browser.close(); } finally { clearTimeout(timeout); }
}
