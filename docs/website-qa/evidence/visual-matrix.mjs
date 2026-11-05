import fs from 'node:fs/promises';
import path from 'node:path';
import {launch,ready,save,base,out,wait,scrollAll,instrument,inspect} from './audit-lib.mjs';
const primary=['/','/our-services/','/growth-systems/','/website-development/','/meta-ads/','/google-ads/','/ai-search-optimization/','/results/','/case-studies/','/about/','/pricing/','/contact/','/locations/','/qatar/'];
const secondary=['/social-media-management/','/content-creation/','/branding-and-creative/','/marketing-automation/','/google-business-profile-growth/','/software-development/','/website-portfolio/','/case-studies/buildscape/','/our-team/','/clients/','/company-verification/','/consultation/','/tools/','/tools/website-roi-calculator/','/blog/','/industries/','/platforms/','/privacy-policy/','/terms-and-conditions/','/us/'];
const selected=process.argv[2]==='secondary'?secondary:primary;
const browser=await launch();
try{
 const warm=await browser.newPage();await ready(warm,base+'/');await warm.close();
 for(const route of selected){
  const slug=route==='/'?'home':route.slice(1,-1).replaceAll('/','--');
  const page=await browser.newPage();const events=await instrument(page);
  try{
   await page.setViewport({width:1440,height:1000,deviceScaleFactor:1});
   const navigation=await ready(page,base+route);await scrollAll(page);
   const widths=primary.includes(route)?[1440,390,320,375,768,1024,1280,1920]:[1440,390];
   for(const width of widths){
    await page.setViewport({width,height:width<768?844:1000,deviceScaleFactor:1});await page.evaluate(()=>scrollTo(0,0));await wait(750);
    if(width===390)await scrollAll(page);
    const data=await inspect(page);Object.assign(data,{route,capturedAt:new Date().toISOString(),browser:await browser.version(),navigation,events:structuredClone(events)});
    await save(`${slug}-${width}-dark.json`,data);
    await page.screenshot({path:path.join(out,`${slug}-${width}-dark-hero.png`)});
    if([1440,390].includes(width))await page.screenshot({path:path.join(out,`${slug}-${width}-dark-full.png`),fullPage:true});
    console.log(JSON.stringify({route,width,height:data.height,overflow:data.width-width,broken:data.images.filter(i=>!i.loaded).length,errors:events.pageErrors.length}));
   }
   // Use the site's actual theme toggle, not a fabricated stylesheet or redesign.
   for(const width of [1440,390]){
    await page.setViewport({width,height:width===390?844:1000,deviceScaleFactor:1});await page.evaluate(()=>scrollTo(0,0));await wait(350);
    if(await page.evaluate(()=>document.documentElement.dataset.theme!=='light')){
     const toggles=await page.$$('button[data-theme-toggle]');for(const t of toggles){const box=await t.boundingBox();if(box&&box.width){await t.click();break;}}
    }
    await wait(650);await scrollAll(page);
    const data=await inspect(page);await save(`${slug}-${width}-light.json`,{...data,route,capturedAt:new Date().toISOString()});
    await page.screenshot({path:path.join(out,`${slug}-${width}-light-full.png`),fullPage:true});
    await page.screenshot({path:path.join(out,`${slug}-${width}-light-hero.png`)});
   }
   await page.evaluate(()=>localStorage.setItem('crea8iv-theme','dark'));
  }catch(e){await save(`${slug}-error.json`,{error:String(e),events});console.log(JSON.stringify({route,error:String(e)}));}
  finally{await page.close();}
 }
}finally{await browser.close();}
