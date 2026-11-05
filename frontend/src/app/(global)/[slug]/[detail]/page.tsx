import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getMarket } from '@/data/markets';
import { services, cityPlans, expandedMarkets, expansionPaths } from '@/data/market-expansion';
import PartnershipEnquiry from '@/components/PartnershipEnquiry';
import { shortMarketName } from '@/components/markets/MarketPage';
import '@/components/markets/markets.css';
const origin='https://crea8ivmedia.com';
type MarketDetailParams={slug:string;detail:string};
type Props={params:Promise<MarketDetailParams>};
export const dynamicParams=false;
export function generateStaticParams(){return expansionPaths.map(p=>{const [slug,detail]=p.split('/');return {slug,detail};});}
function resolve({slug,detail}:MarketDetailParams){
  const market=getMarket(slug); if(!market||slug==='qatar')return null;
  const service=services.find(s=>s.slug===detail);
  const city=cityPlans[slug]?.slug===detail?cityPlans[slug]:undefined;
  if(!service&&!city)return null;
  return {market,service,city,url:`${origin}/${slug}/${detail}/`};
}
export async function generateMetadata({params}:Props):Promise<Metadata>{
  const resolvedParams=await params;
  const page=resolve(resolvedParams);if(!page)return {};
  const {market:m,service:s,city:c,url}=page;
  const marketName=shortMarketName(m.name);
  const title=s?`${s.name} for ${marketName} | Crea8iv`:`${c!.name} Web Design, Ads & SEO | Crea8iv`;
  const description=s?`Discuss ${s.name.toLowerCase()} for your ${m.name} business. A scoped delivery programme with clear ownership, practical reporting and Pakistan-based expertise.`:c!.intro;
  return {title:{absolute:title},description,alternates:{canonical:url,...(s?{languages:Object.fromEntries(expandedMarkets.map(x=>[x.locale,`${origin}/${x.slug}/${s.slug}/`]))}:{})},openGraph:{title,description,url,type:'website',locale:m.locale.replace('-','_'),images:[`${origin}/img/portfolio/websites/buildscape/buildscape-production-card-20260927.webp`]},twitter:{card:'summary_large_image',title,description,images:[`${origin}/img/portfolio/websites/buildscape/buildscape-production-card-20260927.webp`]}};
}
export default async function MarketDetail({params}:Props){
  const resolvedParams=await params;
  const page=resolve(resolvedParams);if(!page)notFound();
  const {market:m,service:s,city:c,url}=page;
  const region=['us','uk','uae'].includes(m.slug)?`the ${m.name}`:m.name;
  const title=s?`${s.name} for businesses in ${region}`:c!.heading;
  const intro=s?m[s.field]:c!.intro;
  const name=s?s.name:c!.name;
  const faqs=s?[[s.question,s.answer],[m.question,m.answer]]:[[c!.question,c!.answer],[m.question,m.answer]];
  const graph={'@context':'https://schema.org','@graph':[
    {'@type':'WebPage','@id':`${url}#page`,url,name:title,inLanguage:m.locale,isPartOf:{'@id':`${origin}/#website`},publisher:{'@id':`${origin}/#organization`}},
    {'@type':'Service','@id':`${url}#service`,name:s?s.name:'Website development, Google Ads and SEO',description:intro,provider:{'@id':`${origin}/#organization`},areaServed:{'@type':s?'Country':'City',name:s?m.name:c!.name},url},
    {'@type':'BreadcrumbList',itemListElement:[['Home','/'],['Locations','/locations/'],[m.name,`/${m.slug}/`],[name,`/${m.slug}/${resolvedParams.detail}/`]].map(([n,p],i)=>({'@type':'ListItem',position:i+1,name:n,item:origin+p}))},
    {'@type':'FAQPage',mainEntity:faqs.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))},
  ]};
  return <main className="market-page"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(graph).replace(/</g,'\\u003c')}}/><nav className="market-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/locations/">Locations</Link><span>/</span><Link href={`/${m.slug}/`}>{m.name}</Link><span>/</span><span>{name}</span></nav>
    <header className="market-intro"><p className="market-eyebrow">CREA8IV MEDIA / REMOTE DELIVERY FROM PAKISTAN</p><h1>{title}</h1><p>{intro}</p><a href="#partnership-enquiry" className="market-cta">{s?s.cta:'Discuss your project'}</a><Link className="market-secondary" href={`/${m.slug}/`}>Explore {m.name} services</Link></header>
    <section className="market-section"><h2>{s?'What the engagement covers':'Decisions to make before the brief'}</h2>{(s?s.steps:c!.priorities).map((text,i)=><article className="market-service" key={text}><h3>0{i+1} / {s?['Assess','Implement','Review'][i]:['Service coverage','Buyer journey','Enquiry ownership'][i]}</h3><p>{text}</p></article>)}</section>
    <section className="market-section"><h2>{s?'Fit the work to your operating model':'Choose the work that addresses the constraint'}</h2>{s?<><p>{cityPlans[m.slug].priorities[services.findIndex(x=>x.slug===s.slug)]}</p><p>Start with a documented scope: your offer, content owner, access requirements and approval process. Existing accounts and assets remain under the agreed ownership arrangements. Third-party subscriptions, media budgets and integration dependencies are identified before work begins.</p><Link href={s.global}>Our {s.name.toLowerCase()} approach</Link></>:services.map(x=><article className="market-service" key={x.slug}><h3><Link href={`/${m.slug}/${x.slug}/`}>{x.name}</Link></h3><p>{m[x.field]}</p></article>)}</section>
    <section className="market-section"><h2>Relevant delivery evidence</h2><p>Review the <Link href="/case-studies/buildscape/">Buildscape case study</Link> for website and integrated delivery, or <Link href="/case-studies/the-smile-xperts/">The Smile Xperts</Link> for healthcare presentation and enquiry journeys. These are agency-work examples, not claims of {c?c.name:m.name} clients or verified Google Ads results.</p><Link href="/case-studies/buildscape/"><Image src="/img/portfolio/websites/buildscape/buildscape-production-card-20260927.webp" alt="Buildscape website case study" width={1200} height={800} loading="lazy" style={{width:'100%',maxWidth:720,height:'auto',marginTop:24}}/></Link></section>
    <section className="market-section"><h2>Reporting and collaboration</h2><p>{s?s.measure:'Agree what counts as an enquiry, a qualified opportunity and a sale. Review each separately, with its date range and source limitations. More traffic alone is not evidence of better business outcomes.'}</p><p>{m.collaboration}</p><p>Crea8iv Media is based in Rawalpindi, Pakistan. This page describes a market served, not a local office. Review our <Link href="/company-verification/">business information</Link> before supplier onboarding.</p></section>
    <section className="market-section"><h2>Questions before starting</h2>{faqs.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</section>
    <nav className="market-selector" aria-label="Related services and location">{services.filter(x=>x!==s).map(x=><Link key={x.slug} href={`/${m.slug}/${x.slug}/`}>{x.name}</Link>)}{s&&<Link href={`/${m.slug}/${cityPlans[m.slug].slug}/`}>{cityPlans[m.slug].name} planning guide</Link>}</nav>
    <PartnershipEnquiry market={m.name} initialService={s?.form}/>
  </main>;
}
