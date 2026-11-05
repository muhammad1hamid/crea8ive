import { industries } from '@/data/qatar/catalogue';

export default function QatarIndustryJourney({slug,ar=false}:{slug:string;ar?:boolean}) {
 const industry=industries.find(item=>item.slug===slug);
 if(!industry)return null;
 const arabicJourneys:Record<string,string[]>={
  'real-estate':['اكتشاف المشروع','مراجعة العقار','تحديد الاحتياج','محادثة الوكيل','المعاينة','العرض'],
  'restaurants-hospitality':['اكتشاف المكان','استكشاف القائمة','الحجز أو الطلب','الزيارة','الملاحظات','العودة'],
 };
 // Do not put untranslated explanatory copy into Arabic pages.
 const steps=ar?arabicJourneys[slug]:industry.journey.split('→').map(x=>x.trim());
 if(!steps)return null;
 return <section className="qa-industry-journey" aria-labelledby="industry-journey-title"><p className="qa-eyebrow">{ar?'رحلة عميلك':'YOUR CUSTOMER’S DECISION JOURNEY'}</p><h2 id="industry-journey-title">{ar?'صمّم النمو حول القرار التالي.':industry.summary}</h2><ol>{steps.map((step,i)=><li key={step}><span>0{i+1}</span><strong>{step}</strong></li>)}</ol><p>{ar?'مسار توضيحي نكيّفه مع نشاطك وعملائك.':'An illustrative journey, adapted to your actual offer and sales process.'}</p></section>;
}
