import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ConsultingLink from '@/components/ConsultingLink';
import styles from '@/components/ConsultingContext.module.css';
import { FOUNDER } from '@/lib/authority-data';
import { CASE_TREATMENTS, CONSULTING_DISCIPLINES, CONSULTATION_URL, EDITORIAL_UPDATED } from '@/lib/consulting-editorial';

const canonical = 'https://crea8ivmedia.com/syed-qamar-abbas/';
const description = 'Meet Syed Qamar Abbas, founder of Crea8iv Media. Explore his consulting disciplines, agency project evidence and the difference between strategy and implementation.';
export const metadata: Metadata = {
 title: { absolute: 'Syed Qamar Abbas | Founder of Crea8iv Media' }, description,
 alternates: { canonical },
 openGraph: { title: 'Syed Qamar Abbas | Founder of Crea8iv Media', description, url: canonical, type: 'profile', images: [{url:FOUNDER.image,alt:'Syed Qamar Abbas, founder of Crea8iv Media'}] },
 twitter: { card: 'summary_large_image', title:'Syed Qamar Abbas | Founder of Crea8iv Media', description, images:[FOUNDER.image] },
};
const disciplines = {
 growth: 'Business priorities, positioning, investment decisions and growth constraints. Useful when the question is what to fund, sequence or stop.',
 acquisition: 'Lead quality, channel choices, conversion and customer journeys. Useful when attention is not becoming the right conversations.',
 search: 'Search strategy, local discovery, content architecture and AI visibility. Useful when customers cannot find or evaluate accurate information about the business.',
 automation: 'Lead handling, workflow design, CRM priorities and operational friction. Useful when unclear handoffs or repetitive administration limit progress.',
} as const;

export default function FounderPage() {
 const schema = {
  '@context':'https://schema.org', '@graph':[
   {'@type':'ProfilePage','@id':`${canonical}#webpage`,url:canonical,name:'Syed Qamar Abbas | Founder of Crea8iv Media',description,
    mainEntity:{'@id':FOUNDER.personId},publisher:{'@id':'https://crea8ivmedia.com/#organization'},
    datePublished:'2026-07-10',dateModified:EDITORIAL_UPDATED,breadcrumb:{'@id':`${canonical}#breadcrumb`}},
   {'@type':'BreadcrumbList','@id':`${canonical}#breadcrumb`,itemListElement:[
    {'@type':'ListItem',position:1,name:'Home',item:'https://crea8ivmedia.com/'},
    {'@type':'ListItem',position:2,name:'Syed Qamar Abbas',item:canonical}]},
  ],
 };
 return <article className="luxury-page pb-16">
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}} />
  <header className="px-6 pt-16 lg:px-10">
   <div className="mx-auto max-w-[1180px]">
    <nav aria-label="Breadcrumb" className="mb-8 text-sm"><Link href="/">Home</Link> / <span>Syed Qamar Abbas</span></nav>
    <p className="lux-eyebrow">Founder &amp; CEO, Crea8iv Media</p>
    <h1 id="founder-title" className="mt-4 font-syne text-4xl font-bold leading-tight sm:text-6xl">Syed Qamar Abbas</h1>
    <p className="mt-6 max-w-3xl text-lg leading-8">Syed Qamar Abbas is the founder and CEO of Crea8iv Media, a Rawalpindi-based digital marketing and software agency. His personal consulting practice focuses on growth strategy, customer acquisition, SEO and AI search, and automation strategy.</p>
    <p className="mt-4 max-w-3xl leading-8">The relationship is straightforward: personal consulting helps frame business decisions; Crea8iv Media provides team execution and documented project work. A founder relationship does not, by itself, establish authorship or an individual role on a project.</p>
    <figure className="mt-8 max-w-[760px] overflow-hidden rounded-lg">
     <Image src="/assets/syed-qamar-abbas-founder-card.webp" alt="Syed Qamar Abbas, founder and CEO of Crea8iv Media" width={1728} height={1152} sizes="(max-width: 800px) 90vw, 760px" priority />
    </figure>
   </div>
  </header>
  <section id="executive-summary" className={styles.section}>
   <h2>Leadership, consulting and delivery</h2>
   <p>Crea8iv Media is the agency behind the delivery accounts on this website. Syed&apos;s personal site describes his consulting approach and disciplines separately. The agency&apos;s case studies should be evaluated on their stated scope and evidence, not assumed to be personal consulting results.</p>
   <p><ConsultingLink href="https://syedqamarabbas.com/about/" contentType="founder" discipline="growth" placement="biography" intent="learn">Read Syed Qamar Abbas&apos;s personal biography</ConsultingLink>, or <Link href="/about/">learn about the Crea8iv Media team and agency</Link>.</p>
  </section>
  <section id="core-expertise" className={styles.section}>
   <h2>Consulting disciplines</h2>
   <div className={styles.columns}>{Object.entries(CONSULTING_DISCIPLINES).map(([key,item])=><div key={key}>
    <h3>{item.name.charAt(0).toUpperCase()+item.name.slice(1)}</h3><p>{disciplines[key as keyof typeof disciplines]}</p>
    <p><ConsultingLink href={item.url} contentType="founder" discipline={key} placement="discipline" intent="evaluate">Explore {item.name} consulting</ConsultingLink></p>
   </div>)}</div>
  </section>
  <section id="selected-work" className={styles.section}>
   <h2>Agency work you can inspect</h2>
   <p>These projects are credited to Crea8iv Media. No personal strategy, writing or review responsibility is assigned here without an approved role record. Current editorial interpretation is dated and kept distinct from the original delivery account.</p>
   <div className={styles.columns}>{Object.entries(CASE_TREATMENTS).map(([slug,item])=><div key={slug}>
    <h3><Link href={`/case-studies/${slug}/`}>{item.client}</Link></h3><p>{item.question}</p><p>{item.outcome}</p>
   </div>)}</div>
   <p><ConsultingLink href="https://syedqamarabbas.com/selected-work/" contentType="founder" discipline="growth" placement="selected_work" intent="evaluate">Explore the selected-work context on Syed&apos;s personal site</ConsultingLink>. Detailed delivery evidence stays in the agency case studies.</p>
  </section>
  <section id="next-step" className={styles.section}>
   <h2>Choose the right next step</h2>
   <div className={styles.columns}>
    <div><h3>Need to decide what to do?</h3><p>Explore personal strategic consultation when the brief, priorities or investment decision is not yet clear.</p>
     <p><ConsultingLink href={CONSULTATION_URL} contentType="founder" discipline="growth" placement="consultation" intent="request_consultation">Review the personal business growth consultation</ConsultingLink>.</p>
     <p>The personal site advertised PKR 20,000 when checked on 30 September 2026. Confirm current scope, fee and arrangements there before proceeding. This page does not promise a duration, availability or specific deliverables.</p></div>
    <div><h3>Have a brief and need delivery?</h3><p>Discuss website development, content, search, campaigns or implementation with the agency team.</p><p><Link href="/contact/">Discuss implementation with Crea8iv Media</Link>.</p><p>Personal consulting and agency execution have separate scopes, fees and agreements. A consultation does not automatically commission an agency project.</p></div>
   </div>
  </section>
  <section id="editorial-record" className={styles.section}>
   <h2>Attribution and evidence</h2>
   <p>Writing, review and project contribution are different responsibilities. Agency articles retain editorial responsibility or a supported named byline. No review credit is implied by linking to this profile.</p>
   <p>Updated <time dateTime={EDITORIAL_UPDATED}>30 September 2026</time>. Biography and consulting scope are based on the agency record and the linked personal-site pages. No new attributed founder commentary or quotation is presented here.</p>
  </section>
 </article>;
}
