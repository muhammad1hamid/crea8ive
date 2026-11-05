import { COMPANY } from '@/data/company';
import { qatarPages, arabicPages, alternatePath, UPDATED } from './catalogue';
export function qatarSitemapEntries(){return [false,true].flatMap(ar=>(ar?arabicPages:qatarPages).filter(p=>!p.noindex).map(p=>{
 const url=`${COMPANY.website}/qa/${ar?'ar/':''}${p.slug?`${p.slug}/`:''}`;const alternate=alternatePath(p.slug,ar);
 return {url,lastModified:UPDATED,...(alternate?{alternates:{languages:{'en-QA':ar?`${COMPANY.website}${alternate}`:url,'ar-QA':ar?url:`${COMPANY.website}${alternate}`,'x-default':ar?`${COMPANY.website}${alternate}`:url}}}:{})};
}));}
export const xmlEscape=(value:string)=>value.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
