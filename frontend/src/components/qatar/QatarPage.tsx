import type { Metadata } from 'next';
import Image from 'next/image';
import { COMPANY, QATAR_CONTACT, qatarBusinessDescription } from '@/data/company';
import { alternatePath, getQatarPage, pricingPackages, UPDATED } from '@/data/qatar/catalogue';
import type { QatarPage as PageData, QatarLink } from '@/data/qatar/types';
import QatarContact from './QatarContact';
import QatarTool from './QatarTool';
import QatarNavigation from './QatarNavigation';
import QatarHome from './QatarHome';
import QatarGrowthSystem from './QatarGrowthSystem';
import QatarVisibility from './QatarVisibility';
import QatarIndustryJourney from './QatarIndustryJourney';

export function qatarMetadata(page:PageData,ar=false):Metadata{
 const url=`${COMPANY.website}/qa/${ar?'ar/':''}${page.slug?`${page.slug}/`:''}`;
 const alternate=alternatePath(page.slug,ar);
 const languages=alternate?{'en-QA':ar?`${COMPANY.website}${alternate}`:url,'ar-QA':ar?url:`${COMPANY.website}${alternate}`,'x-default':ar?`${COMPANY.website}${alternate}`:url}:undefined;
 return {metadataBase:new URL(COMPANY.website),title:{absolute:page.title},description:page.description,alternates:{canonical:url,languages},robots:{index:!page.noindex,follow:true},openGraph:{type:page.kind==='article'?'article':'website',title:page.title,description:page.description,url,siteName:COMPANY.brandName,locale:ar?'ar_QA':'en_QA',...(alternate?{alternateLocale:[ar?'en_QA':'ar_QA']}:{}),images:[{url:'/img/crea8iv-search-preview.png',width:1200,height:630,alt:ar?'شعار Crea8iv Media':'Crea8iv Media brand logo'}]},twitter:{card:'summary_large_image',title:page.title,description:page.description,images:['/img/crea8iv-search-preview.png']},icons:{icon:'/favicon.ico',apple:'/apple-touch-icon.png'}};
}
function Cards({links}:{links:QatarLink[]}){return <div className="qa-cards">{links.map(link=><a className="qa-card" href={link.href} key={link.href}><span className="qa-card-title">{link.label}<span aria-hidden="true">↗</span></span>{link.detail&&<p>{link.detail}</p>}</a>)}</div>;}
export default function QatarPage({page,ar=false}:{page:PageData;ar?:boolean}){
 const base=ar?'/qa/ar/':'/qa/';const url=`${COMPANY.website}${base}${page.slug?`${page.slug}/`:''}`;
 const local=(slug:string)=>ar&&getQatarPage(slug,true)?`${base}${slug?`${slug}/`:''}`:`/qa/${slug?`${slug}/`:''}`;
 const cta=page.cta||(ar?'اطلب مراجعة نمو مجانية':'Plan My Growth');
 const service=page.slug.startsWith('services/')?page.slug.slice(9):page.slug==='automation'?'ai-automation':page.slug==='software'?'custom-software':page.slug==='ai-visibility'?'ai-visibility':page.slug==='content-production'?'video-production':'complete-growth-system';
 const contactHref=`${local('contact')}?service=${encodeURIComponent(service)}`;
 const schema={ '@context':'https://schema.org','@graph':[
  {'@type':page.kind==='article'?'Article':page.kind==='contact'?'ContactPage':'WebPage','@id':`${url}#page`,url,name:page.heading,headline:page.heading,description:page.description,inLanguage:ar?'ar-QA':'en-QA',...(page.kind==='article'?{datePublished:UPDATED,dateModified:UPDATED,author:{'@type':'Organization',name:COMPANY.brandName,'@id':`${COMPANY.website}/#organization`},publisher:{'@id':`${COMPANY.website}/#organization`},image:`${COMPANY.website}/img/crea8iv-search-preview.png`}:{}),isPartOf:{'@type':'WebSite','@id':`${COMPANY.website}/#website`,url:COMPANY.website,name:COMPANY.brandName}},
  {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Crea8iv Media',item:`${COMPANY.website}/`},{'@type':'ListItem',position:2,name:ar?'قطر':'Qatar',item:`${COMPANY.website}${base}`},...(page.slug?[{'@type':'ListItem',position:3,name:page.heading,item:url}]:[])]},
  ...(page.kind==='service'?[{'@type':'Service',name:page.heading,description:page.intro,url,areaServed:{'@type':'Country',name:'Qatar'},provider:{'@id':`${COMPANY.website}/#organization`}}]:[]),
 ]};
 return <><QatarNavigation slug={page.slug} ar={ar}/><div className={`qa ${ar?'qa-ar':''}`}>
 <a className="qa-skip" href="#main-content">{ar?'انتقل إلى المحتوى':'Skip to content'}</a>
 <main id="main-content" tabIndex={-1} className={`qa-main qa-kind-${page.kind}`}>
 {page.kind==='home'?<QatarHome ar={ar}/>:<>
 <div className="qa-breadcrumb"><a href="/">Crea8iv Media</a><span>/</span><a href={base}>{ar?'قطر':'Qatar'}</a>{page.slug&&<><span>/</span><span>{page.heading}</span></>}</div>
 <section className="qa-hero">
 <div className="qa-hero-copy"><p className="qa-eyebrow">{page.eyebrow||(ar?'Crea8iv Media · قطر':'Crea8iv Media · Qatar')}</p><h1>{page.heading}</h1><p className="qa-lead">{page.intro}</p>{page.kind==='article'?<p className="qa-byline">{ar?'إعداد Crea8iv Media · آخر تحديث':'By Crea8iv Media · Updated'} <time dateTime={UPDATED}>{UPDATED}</time></p>:page.kind!=='contact'&&<div className="qa-actions"><a href={contactHref} className="qa-button">{cta} <span aria-hidden="true">↗</span></a><a href={QATAR_CONTACT.whatsapp} className="qa-text-link">{ar?QATAR_CONTACT.labelAr:QATAR_CONTACT.label}</a></div>}</div>
 </section>
 <div className="qa-content">
 {['automation','services/ai-automation','services/whatsapp-automation','services/crm-automation','software'].includes(page.slug)&&<QatarGrowthSystem ar={ar} embedded/>}
 {['ai-visibility','services/ai-visibility'].includes(page.slug)&&<QatarVisibility ar={ar} embedded/>}
 {page.kind==='industry'&&<QatarIndustryJourney slug={page.slug.split('/').pop()!} ar={ar}/>}

 {page.kind==='contact'&&<QatarContact ar={ar}/>}
 {page.kind==='tool'&&<QatarTool slug={page.slug.split('/').pop()!}/>}
 {page.kind==='pricing'&&<section className="qa-section"><h2>{ar?'نطاقات التعاون':'Choose the scope that fits'}</h2><div className="qa-cards">{pricingPackages.map(p=><article className="qa-card" key={p.name}><h3>{p.name}</h3><p>{p.scope}</p><p>{p.fit}</p><strong>{p.price===null?'Custom proposal · QAR':`${p.currency} ${p.price.toLocaleString()}`}</strong><a href={local('contact')} className="qa-text-link">Request proposal ↗</a></article>)}</div></section>}
 {page.sections.map((section,i)=><section className="qa-section" key={`${section.title}-${i}`}><div className="qa-section-heading"><span className="qa-index" aria-hidden="true">{String(i+1).padStart(2,'0')}</span><h2>{section.title}</h2></div>{section.body&&<p className="qa-section-body">{section.body}</p>}{section.items&&<ul className="qa-list">{section.items.map(item=><li key={item}>{item}</li>)}</ul>}{section.links&&<Cards links={section.links}/>}</section>)}
 {page.faqs&&<section className="qa-section"><h2>{ar?'أسئلة شائعة':'Questions, answered.'}</h2><div className="qa-faqs">{page.faqs.map(f=><details key={f.question}><summary>{f.question}</summary><p>{f.answer}</p></details>)}</div></section>}
 {page.sources&&<section className="qa-section qa-sources"><h2>{ar?'المصادر والمنهج':'Sources & further reading'}</h2><p>{ar?'أمثلة التطبيق توضيحية ما لم يُذكر خلاف ذلك.':'Business scenarios are illustrative unless explicitly identified as documented work. Platform guidance can change; consult the linked primary sources.'}</p><ul>{page.sources.map(s=><li key={s.href}><a href={s.href}>{s.label}</a></li>)}</ul></section>}
 {page.related&&<section className="qa-section"><h2>{ar?'خطوتك التالية':'Continue the journey.'}</h2><Cards links={page.related}/></section>}
 {page.kind!=='contact'&&<section className="qa-final-cta"><div><p className="qa-eyebrow">{ar?'لنبدأ بالأولوية الصحيحة':'Start with the right priority'}</p><h2>{ar?'ما الذي يحتاجه نموك الآن؟':'What needs to work better?'}</h2><p>{ar?'شاركنا التحدي لنحدد الخطوة التالية معاً.':'Tell us about the challenge. We’ll help define a useful next step.'}</p></div><a className="qa-button" href={contactHref}>{cta} ↗</a></section>}
 </div>
 </>}
 </main>
 <footer className="qa-footer"><div><Image src="/img/logo.webp" alt="Crea8iv Media" width={100} height={64}/><p>{ar?'نربط التسويق والتقنية بالنمو.':'Marketing and technology, connected to growth.'}</p></div><nav aria-label={ar?'روابط إضافية':'Footer links'}><a href={local('services')}>{ar?'الخدمات':'Services'}</a><a href="/qa/tools/">{ar?'أدوات مجانية · EN':'Free tools'}</a><a href={local('about')}>{ar?'من نحن':'About'}</a><a href="/qa/doha/">{ar?'خدمة شركات الدوحة · EN':'Serving Doha'}</a><a href="/qa/answers/">{ar?'إجابات · EN':'Business answers'}</a><a href="/qa/research/">{ar?'منهج البحث · EN':'Research methodology'}</a></nav><div><a href={`mailto:${QATAR_CONTACT.email}`}>{QATAR_CONTACT.email}</a><a href={`tel:${QATAR_CONTACT.phone.replace(/[^+0-9]/g,'')}`} dir="ltr">{QATAR_CONTACT.phone}</a><p>{COMPANY.qatarPhone?(ar?'رقم أعمال قطر':'Qatar business contact'):(ar?'رقم الأعمال الرسمي في باكستان':'Official Pakistan business contact')}</p></div><div className="qa-legal"><p>{qatarBusinessDescription(ar)}</p><a href="/contact/">{ar?'عمليات باكستان':'Pakistan operations'}</a><a href={local('contact')}>{ar?'استفسارات سوق قطر':'Qatar market enquiries'}</a><p>© {new Date().getFullYear()} {COMPANY.brandName}</p><a href="/company-verification/">{ar?'معلومات النشاط':'Business information'}</a><a href="/privacy-policy/">{ar?'الخصوصية':'Privacy'}</a><a href="/terms-and-conditions/">{ar?'الشروط':'Terms'}</a></div></footer>
 {page.kind!=='contact'&&page.kind!=='tool'&&<div className="qa-mobile-cta"><a href={contactHref} className="qa-button">{ar?'اطلب مراجعة النمو':'Request Growth Audit'}</a><a href={QATAR_CONTACT.whatsapp}>{ar?'واتساب':'WhatsApp'}</a></div>}
 <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/>
 </div></>;
}
