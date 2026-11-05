import Link from 'next/link';
import ConsultingLink from './ConsultingLink';
import styles from './ConsultingContext.module.css';
import { ARTICLE_TREATMENTS, CASE_TREATMENTS, CONSULTING_DISCIPLINES, CONSULTATION_URL, EDITORIAL_UPDATED } from '@/lib/consulting-editorial';
import type { Discipline } from '@/lib/consulting-editorial';

const serviceDecisions: Record<Discipline, [string,string]> = {
  growth: ['Need to agree the priorities before commissioning a growth programme?', 'Clarify the business constraint, investment sequence and delivery brief before adding more channels.'],
  acquisition: ['Need to diagnose lead quality before launching campaigns?', 'Separate the channel question from the offer, conversion path and follow-up process.'],
  search: ['Need to choose the search work that matters first?', 'Assess discovery questions, technical access and evidence gaps before expanding the content plan.'],
  automation: ['Need to define the workflow before choosing software?', 'Agree ownership, exceptions and handoffs before commissioning CRM or messaging integrations.'],
};
export function ServiceConsultingContext({ discipline }: { discipline: Discipline }) {
  const [question,answer] = serviceDecisions[discipline];
  return <section className={styles.section} aria-labelledby="service-decision-heading">
    <h2 id="service-decision-heading">{question}</h2><p>{answer} Explore <ConsultingLink href={CONSULTING_DISCIPLINES[discipline].url} contentType="service" discipline={discipline} placement="scope_decision" intent="evaluate">Syed Qamar Abbas&apos;s {CONSULTING_DISCIPLINES[discipline].name} consulting</ConsultingLink>.</p>
    <p>Already have an agreed brief? <Link href="/contact/">Discuss agency implementation</Link>. Personal consulting and Crea8iv Media delivery have separate scopes, fees and agreements.</p>
  </section>;
}

export function ArticleConsultingContext({ slug }: { slug: string }) {
  const entry = ARTICLE_TREATMENTS[slug];
  if (!entry) return null;
  const discipline = entry.discipline ? CONSULTING_DISCIPLINES[entry.discipline] : null;
  return <section className={styles.section} aria-labelledby="business-decision-heading">
    <p className={styles.label}>What this means for your business</p>
    <h2 id="business-decision-heading">{entry.question}</h2>
    <p>{entry.answer}</p><p>{entry.tradeoff}</p>
    {entry.evidence && <p>{entry.evidence.context} <Link href={`/case-studies/${entry.evidence.slug}/`}>Read the {CASE_TREATMENTS[entry.evidence.slug]?.client || entry.evidence.slug.replaceAll('-', ' ')} case study</Link>.</p>}
    <p>{entry.nextStep}{discipline ? <> <ConsultingLink href={discipline.url} discipline={entry.discipline!} contentType="article" placement="business_decision">Syed Qamar Abbas&apos;s {discipline.name} consulting</ConsultingLink>.</> : null}</p>
    {entry.consultation && <p>Need help choosing your priorities? <ConsultingLink href={CONSULTATION_URL} discipline={entry.discipline || 'growth'} contentType="article" placement="decision_consultation" intent="request_consultation">Explore personal strategic consultation</ConsultingLink>. Agency implementation has a separate scope and fee.</p>}
    <p className={styles.label}>Editorial decision note added <time dateTime={EDITORIAL_UPDATED}>30 September 2026</time> by Crea8iv Media.{discipline && <> <Link href="/syed-qamar-abbas/">Founder relationship</Link>.</>}</p>
  </section>;
}

export function CaseConsultingContext({ slug }: { slug: string }) {
  const entry = CASE_TREATMENTS[slug];
  if (!entry) return null;
  const discipline = CONSULTING_DISCIPLINES[entry.discipline];
  return <section className={styles.section} aria-labelledby="strategic-context-heading">
    <p className={styles.label}>Current editorial interpretation · <time dateTime={EDITORIAL_UPDATED}>30 September 2026</time></p>
    <h2 id="strategic-context-heading">{entry.question}</h2>
    <p>{entry.reasoning}</p>
    <div className={styles.columns}>
      <div><h3>The trade-off for a similar business</h3><p>{entry.tradeoff}</p><h3>What to take from this project</h3><p>{entry.lesson}</p></div>
      <div><h3>Evidence you can inspect</h3><p>{entry.evidence} <a href={entry.evidenceUrl}>Explore {entry.client}&apos;s public website</a>.</p><h3>Measurement status</h3><p>{entry.outcome}</p></div>
    </div>
    <p>This analysis is based on the agency project account. The original decision process and individual project responsibilities are not documented here. Delivery is credited to Crea8iv Media.</p>
    <p>Facing a similar decision? Explore <ConsultingLink href={discipline.url} discipline={entry.discipline} contentType="case_study" placement="strategic_context" intent="evaluate">Syed Qamar Abbas&apos;s {discipline.name} consulting</ConsultingLink> to assess your priorities before commissioning implementation.</p>
    <p>Have an agreed brief? <Link href="/contact/">Discuss implementation with Crea8iv Media</Link>. Personal consulting and agency delivery have separate scopes, agreements and fees. <Link href="/syed-qamar-abbas/">About the founder relationship</Link>.</p>
  </section>;
}
