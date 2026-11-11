import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Check } from "lucide-react";
import { ServiceConsultingContext } from "@/components/ConsultingContext";
import { ConnectedJourney, ConnectedJourneyCard } from "@/components/HomepageConnectedJourney";
import { InsightsSection } from "@/components/HomepageEditorial";
import { FaqSection } from "@/components/HomepageFaq";
import actionStyles from "@/components/homepage-final-cta.module.css";
import { NotchedProjectCard } from "@/components/ui/notched-project-card";
import { getPageUrl, marketingAutomationPage, proofStats } from "@/lib/growth-pages";
import { automationCases, automationFaqs, automationStages, capabilityIcons, relatedArticles } from "./marketing-automation-content";
import styles from "./marketing-automation.module.css";

const page = marketingAutomationPage;

export const metadata: Metadata = {
  title: { absolute: marketingAutomationPage.title },
  description: marketingAutomationPage.description,
  alternates: { canonical: getPageUrl(marketingAutomationPage.slug) },
  openGraph: {
    title: marketingAutomationPage.title,
    description: marketingAutomationPage.description,
    url: getPageUrl(marketingAutomationPage.slug),
    type: "website",
  },
};

export default function MarketingAutomationPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Marketing Automation",
    description: marketingAutomationPage.description,
    url: getPageUrl(marketingAutomationPage.slug),
    provider: { "@type": "Organization", name: "Crea8iv Media", url: "https://crea8ivmedia.com/" },
    areaServed: ["Rawalpindi", "Islamabad", "Pakistan"],
  };

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <header className={styles.hero} aria-labelledby="automation-title">
        <div className={styles.inner}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{page.eyebrow}</span>
          </nav>
          <div className={styles.heroLayout}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>Marketing automation · Rawalpindi &amp; Islamabad</p>
              <h1 id="automation-title">WhatsApp automation <em>that keeps leads moving.</em></h1>
              <p className={styles.lead}>Ads, websites, Google Maps and social content bring in enquiries. Fast replies, a clear CRM pipeline and timely follow-up help your team turn them into bookings and sales conversations.</p>
              <div className={styles.actions}>
                <Link href={page.ctaHref ?? "/contact/"} className={actionStyles.primary}>
                  {page.ctaLabel} <ArrowUpRight size={18} aria-hidden="true" />
                </Link>
                <Link href={page.secondaryCtaHref ?? "/results/"} className={actionStyles.secondary}>
                  {page.secondaryCtaLabel ?? "View Results"} <ArrowUpRight size={18} aria-hidden="true" />
                </Link>
              </div>
              <a href="#automation-workflow" className={styles.textLink}>
                See how it works <ArrowDown size={17} aria-hidden="true" />
              </a>
            </div>
            {page.visual && (
              <figure className={styles.heroVisual}>
                <Image
                  src={page.visual.image}
                  alt={page.visual.alt}
                  width={960}
                  height={540}
                  sizes="(max-width: 640px) 92vw, (max-width: 899px) 640px, (max-width: 1399px) 46vw, 620px"
                  preload
                />
                <figcaption>
                  <span>From enquiry to follow-up</span>
                  <strong>WhatsApp · Bookings · CRM</strong>
                </figcaption>
              </figure>
            )}
          </div>
        </div>
      </header>

      <div className={styles.proofBand}>
        <dl className={`${styles.inner} ${styles.proofGrid}`}>
          {proofStats.map(({ value, label }) => (
            <div key={label}>
              <dt>{value}</dt>
              <dd>{label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <section className={styles.section} aria-labelledby="automation-capabilities-title">
        <div className={styles.inner}>
          <div className={styles.heading}>
            <p className={styles.eyebrow}>What we automate</p>
            <h2 id="automation-capabilities-title">Keep enquiries moving <em>at every handoff.</em></h2>
            <p>Give your team a clear way to respond, confirm a booking and follow up when a conversation goes quiet.</p>
          </div>
          <ol className={styles.capabilityGrid}>
            {page.sections.map(({ title, body, items }, index) => (
              <ConnectedJourneyCard
                key={title}
                title={title}
                description={body}
                image={capabilityIcons[title] ?? "/img/homepage/service-orbit/06-automation.webp"}
                number={index + 1}
                containedIcon
              >
                <ul className={styles.capabilityList}>
                  {items.map((item) => (
                    <li key={item}><Check size={17} aria-hidden="true" />{item}</li>
                  ))}
                </ul>
              </ConnectedJourneyCard>
            ))}
          </ol>
        </div>
      </section>

      <ConnectedJourney
        id="automation-workflow"
        headingId="automation-workflow-title"
        eyebrow="An example workflow"
        heading={<>From the first message <em>to the next step.</em></>}
        intro={<p>A WhatsApp enquiry can trigger a reply, reach the right person and get a clear next step in the CRM.</p>}
        stages={automationStages}
      />

      <section className={styles.section} aria-labelledby="automation-cases-title">
        <div className={styles.inner}>
          <div className={styles.heading}>
            <p className={styles.eyebrow}>Case studies by industry</p>
            <h2 id="automation-cases-title">See how different businesses <em>handle enquiries.</em></h2>
            <p>Explore how appointment flows, WhatsApp, reviews and consultation paths fit into the work for each industry.</p>
          </div>
          <div className={styles.caseGrid}>
            {automationCases.map((study) => (
              <NotchedProjectCard
                key={study.href}
                href={study.href}
                title={study.title}
                description={study.result}
                badge={study.industry}
                tags={[...study.services]}
                image={study.image}
                surface="var(--automation-ground)"
                className={styles.caseCard}
              />
            ))}
          </div>
          <div className={styles.sectionAction}>
            <Link href="/case-studies/" className={actionStyles.primary}>Explore Case Studies <ArrowUpRight size={18} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <InsightsSection
        id="automation-insights"
        eyebrow="Related insights"
        issue="Campaigns & follow-up"
        heading={<>Get better at <em>following up.</em></>}
        intro="Read about clinic reminders, WhatsApp lead routing and how to plan a Meta Ads budget."
        linkLabel="Explore all insights"
        articles={relatedArticles}
      />

      <FaqSection
        id="automation-questions"
        headingId="automation-faq-title"
        eyebrow="Before we begin"
        heading={<>Marketing automation <em>FAQs.</em></>}
        description="What to plan for replies, bookings and CRM follow-up."
        items={automationFaqs}
        centered
      />

      <div className={`${styles.inner} ${styles.consultation}`}>
        <ServiceConsultingContext discipline="automation" />
      </div>

      <section className={actionStyles.section} aria-labelledby="automation-cta-title">
        <div className={`${actionStyles.card} ${styles.closing}`}>
          <div className={`${actionStyles.copy} ${styles.closingCopy}`}>
            <h2 id="automation-cta-title">Ready to build <em>your follow-up system?</em></h2>
            <p className={actionStyles.intro}>Tell us your industry, city and where enquiries tend to stall. We’ll map the channels, pages and follow-up steps to work on first.</p>
          </div>
          <div className={styles.closingActions}>
            <Link href="/contact/" className={actionStyles.primary}>Book Free Growth Audit <ArrowUpRight size={18} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
