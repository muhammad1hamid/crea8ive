import Header, { type NavItem } from '@/components/layout/Header';
import { alternatePath, getQatarPage } from '@/data/qatar/catalogue';

export default function QatarNavigation({slug,ar=false}:{slug:string;ar?:boolean}) {
 const route=(path:string)=>ar&&getQatarPage(path,true)?`/qa/ar/${path?path+'/':''}`:`/qa/${path?path+'/':''}`;
 const item=(label:string,arabic:string,path:string)=>({label,displayLabel:ar?arabic:label,href:route(path)});
 const nav:NavItem[]=[
  item('Home','الرئيسية',''),
  {...item('Solutions','الحلول','services'),children:[
   item('Growth Systems','منظومات النمو','services/digital-marketing'),item('AI Search Optimization','الظهور في الذكاء الاصطناعي','services/ai-visibility'),item('SEO','تحسين محركات البحث','services/seo'),item('Google Ads','إعلانات جوجل','services/google-ads'),item('Meta Ads','إعلانات ميتا · EN','services/meta-ads'),item('Social Media Management','إدارة التواصل الاجتماعي','services/social-media-management'),item('Website Development','تطوير المواقع','services/web-development'),item('Content Creation','إنتاج المحتوى','content-production'),item('Marketing Automation','أتمتة الأعمال','services/ai-automation'),item('WhatsApp Automation','أتمتة واتساب','services/whatsapp-automation'),item('Industries','القطاعات · EN','industries'),item('All Services','جميع الخدمات','services')
  ]},
  item('Plans','الأسعار · EN','pricing'),item('Insights','المقالات · EN','insights'),
  {...item('About','من نحن','about'),children:[item('About Crea8iv','عن Crea8iv','about'),item('Contact','تواصل معنا','contact'),item('Free Tools','أدوات مجانية · EN','tools'),{label:'Company Verification',displayLabel:ar?'معلومات النشاط · EN':'Business information',href:'/company-verification/'}]},
 ];
 const alt=alternatePath(slug,ar);
 const language=alt||(ar?'/qa/':'/qa/ar/');
 return <Header navItems={nav} homeHref={route('')} ctaHref={route('contact')} ar={ar} showTheme={false} utility={<div className="qa-market-controls" dir="ltr"><details className="qa-market-switch"><summary>QATAR <span aria-hidden="true">⌄</span></summary><div><a href="/" lang="en">Pakistan ↗</a><a href="/qa/" aria-current="true">Qatar</a></div></details><span className="qa-control-divider"/><a href={language} lang={ar?'en':'ar'} hrefLang={ar?'en-QA':'ar-QA'} data-qa-event="qatar_language_switch" aria-label={ar?'Read this page in English':alt?'اقرأ هذه الصفحة بالعربية':'الرئيسية بالعربية'}>{ar?'EN':'العربية'}</a></div>}/>;
}
