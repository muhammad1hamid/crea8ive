'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
export function qatarEvent(event:string,properties:Record<string,string|number|boolean>={}) {
 const w=window as Window & {gtag?:(...args:unknown[])=>void;dataLayer?:unknown[]};
 const data={market:'qatar',language:window.location.pathname.startsWith('/qa/ar')?'ar-QA':'en-QA',page_path:window.location.pathname,...properties};
 // Use one GA4 emission; do not also push the same custom GTM event.
 if(w.gtag)w.gtag('event',event,data); else (w.dataLayer ||= []).push({event,...data});
}
export default function QatarEvents(){
 const pathname=usePathname();
 useEffect(()=>{
  try {
   if(!sessionStorage.getItem('crea8iv-qatar-entry')) {
    const query=new URLSearchParams(location.search);let referrer='';try{referrer=document.referrer?new URL(document.referrer).origin:'';}catch{}
    sessionStorage.setItem('crea8iv-qatar-entry',JSON.stringify({landing_page:location.pathname,referrer,...Object.fromEntries(['source','medium','campaign','content'].map(k=>[k,(query.get(`utm_${k}`)||'').slice(0,150)]))}));
   }
  } catch { /* Storage may be unavailable; form still works. */ }
  qatarEvent('qatar_page_view');
  if(pathname?.includes('/pricing'))qatarEvent('qatar_pricing_view');
  if(pathname?.includes('/work/'))qatarEvent('qatar_case_study_view');
  const handler=(e:MouseEvent)=>{const link=(e.target as Element).closest<HTMLElement>('a,button');if(!link)return;
   const href=link.getAttribute('href')||'';
   if(link.dataset.qaEvent)qatarEvent(link.dataset.qaEvent);
   else if(href.startsWith('https://wa.me/'))qatarEvent('qatar_whatsapp_click');
   else if(href.startsWith('tel:'))qatarEvent('qatar_call_click');
   else if(href.includes('/contact'))qatarEvent('qatar_service_cta_click');
  };
  document.addEventListener('click',handler);return()=>document.removeEventListener('click',handler);
 },[pathname]);
 return null;
}
