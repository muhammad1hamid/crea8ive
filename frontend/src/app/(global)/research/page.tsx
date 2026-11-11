import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ConnectedJourneyCard } from "@/components/HomepageConnectedJourney";
import { FaqSection } from "@/components/HomepageFaq";
import { ResourceChecklist, ResourceClosing, ResourceHeading, ResourceHero } from "@/components/resource/ResourcePage";
import resourceStyles from "@/components/resource/resource-page.module.css";
import { BUSINESS_DETAILS, SITE_URL } from "@/lib/site-config";
import styles from "./research.module.css";

const PAGE_URL = `${SITE_URL}/research/`;
const LAST_UPDATED = "2026-10-08";

const researchObjectives = ["Authority", "Rankings", "AI citations", "Branded demand", "Qualified leads", "Revenue"];

const authorityPillars = [
  {
    title: "Website Development",
    body: "Performance, conversion paths, technical SEO, redesign risk, Next.js versus WordPress decisions and international delivery models.",
    href: "/website-development/",
    icon: "03-websites",
  },
  {
    title: "SEO and AI Visibility",
    body: "Search architecture, local SEO, AI citation readiness, entity clarity, structured data, answer blocks and content evidence.",
    href: "/ai-search-optimization/",
    icon: "02-seo-ai",
  },
  {
    title: "Google Ads and Acquisition",
    body: "Search intent, landing pages, tracking, lead quality, campaign waste, conversion feedback and customer acquisition economics.",
    href: "/google-ads/",
    icon: "05-paid-ads",
  },
] as const;

const researchPrograms = [
  {
    title: "AI Search Visibility Benchmark",
    icon: "service-orbit/02-seo-ai",
    status: "Planned study",
    question: "How often do Pakistani service businesses appear in ChatGPT, Gemini, Perplexity and Google AI results for commercial discovery prompts?",
    method: "Fixed prompt set, recorded platform, date, market context, visible sources, cited URLs and mention quality.",
  },
  {
    title: "Website Conversion Benchmark",
    icon: "service-orbit/03-websites",
    status: "Planned study",
    question: "What separates high-trust service websites from sites that look good but fail to generate qualified enquiries?",
    method: "Review a defined sample against mobile UX, page speed, content clarity, proof, forms, WhatsApp paths and analytics readiness.",
  },
  {
    title: "Local SEO and Maps Evidence Review",
    icon: "connected-journey/01-discover",
    status: "Planned study",
    question: "Which public signals are consistently present for businesses appearing strongly in local search and Google Maps?",
    method: "Track categories, service wording, profile completeness, review signals, landing pages, NAP consistency and visible proof.",
  },
  {
    title: "Google Ads Waste and Lead Quality Review",
    icon: "service-orbit/05-paid-ads",
    status: "Planned study",
    question: "Where do small and mid-sized service businesses lose budget before a lead becomes sales-ready?",
    method: "Compare search intent, negatives, landing-page fit, conversion tracking, call handling, CRM stages and qualified lead feedback.",
  },
] as const;

const operatingRules = [
  "Publish methodology before findings.",
  "Separate observations from causal claims.",
  "Show dates, sample criteria and limitations.",
  "Use client data only when permission and evidence support it.",
  "Do not turn DR, DA or AI mentions into the main business objective.",
  "Connect research to service decisions, not generic promotion.",
] as const;

const flagshipAssets = [
  { label: "AI visibility growth plan", href: "/ai-visibility-growth/" },
  { label: "AI content roadmap", href: "/ai-visibility-content-roadmap/" },
  { label: "AI citation sources", href: "/ai-citation-sources/" },
  { label: "Case studies", href: "/case-studies/" },
  { label: "Website portfolio", href: "/website-portfolio/" },
  { label: "AI visibility checker", href: "/tools/ai-visibility-checker/" },
] as const;

const faqs = [
  {
    question: "What is Crea8iv Media Research?",
    answer:
      "Crea8iv Media Research is the agency's public methodology and evidence program for studying website performance, SEO, AI visibility, Google Ads, lead quality and acquisition systems. It publishes methods, studies and practical findings when data is verified.",
  },
  {
    question: "Does this page claim completed benchmark results?",
    answer:
      "No. Research programs marked as planned are research directions, not completed findings. Crea8iv Media should publish numbers only after a sample, method, collection date and limitations are documented.",
  },
  {
    question: "How does research support client decisions?",
    answer:
      "Research helps buyers compare options before investing in websites, SEO, ads or automation. The goal is to make decisions clearer, then connect strategy to implementation when a scoped project is ready.",
  },
  {
    question: "Is DR or DA the main objective?",
    answer:
      "No. DR and DA are third-party authority indicators. The practical objective is stronger evidence, rankings, AI citations, branded demand, qualified leads and revenue.",
  },
] as const;

export const metadata: Metadata = {
  title: { absolute: "Research | Crea8iv Media" },
  description:
    "Crea8iv Media Research documents planned studies, methodology and evidence standards for website development, SEO, AI visibility and Google Ads acquisition.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Research | Crea8iv Media",
    description:
      "Methodology-first research for website development, SEO, AI visibility, Google Ads and acquisition systems.",
    url: PAGE_URL,
    siteName: BUSINESS_DETAILS.brandName,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/img/services/ad-concepts/growth-system-ad-concept.webp`,
        width: 1200,
        height: 675,
        alt: "Crea8iv Media research and authority systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Research | Crea8iv Media",
    description:
      "Methodology-first research for website development, SEO, AI visibility, Google Ads and acquisition systems.",
    images: [`${SITE_URL}/img/services/ad-concepts/growth-system-ad-concept.webp`],
  },
};

function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: "Crea8iv Media Research",
        description: metadata.description,
        datePublished: LAST_UPDATED,
        dateModified: LAST_UPDATED,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        about: [
          { "@id": `${SITE_URL}/#organization` },
          { "@type": "Thing", name: "website development research" },
          { "@type": "Thing", name: "AI search visibility" },
          { "@type": "Thing", name: "Google Ads acquisition" },
        ],
        inLanguage: "en-PK",
        breadcrumb: { "@id": `${PAGE_URL}#breadcrumb` },
      },
      {
        "@type": "ItemList",
        "@id": `${PAGE_URL}#planned-studies`,
        name: "Crea8iv Media planned research programs",
        itemListElement: researchPrograms.map((program, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: program.title,
          description: program.question,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${PAGE_URL}#faq`,
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${PAGE_URL}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Research", item: PAGE_URL },
        ],
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function ResearchPage() {
  return (
    <main className={resourceStyles.page}>
      <JsonLd />
      <ResourceHero
        id="research-title"
        breadcrumb="Research"
        eyebrow="Crea8iv Media · Research"
        heading={<>Research to help you <em>verify growth decisions.</em></>}
        intro="We document how we study websites, SEO, AI visibility and Google Ads acquisition. Our research draws on recorded observations, client proof and public benchmarks to help businesses compare their options."
        art={{
          src: "/img/homepage/buyer-journey/02-check-brand-v2.webp",
          alt: "A magnifying glass and a checkmark shield beside evidence cards",
          width: 1120,
          height: 800,
        }}
        actions={[
          { href: "#planned-studies", label: "Browse planned studies" },
          { href: "/research.md", label: "Read research brief" },
        ]}
      />

      <section className={`${resourceStyles.section} ${resourceStyles.band}`} aria-labelledby="research-objective-title">
        <div className={resourceStyles.inner}>
          <ResourceHeading
            id="research-objective-title"
            eyebrow="Primary objective"
            heading={<>How research supports <em>business growth.</em></>}
            intro="DR and DA are tracked as secondary indicators."
          />
          <ol className={styles.objective}>
            {researchObjectives.map((objective, index) => (
              <li key={objective}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{objective}</li>
            ))}
          </ol>
        </div>
      </section>

      <section className={resourceStyles.section} aria-labelledby="pillars-heading">
        <div className={resourceStyles.inner}>
          <ResourceHeading
            id="pillars-heading"
            eyebrow="Authority pillars"
            heading={<>Three areas <em>we study.</em></>}
          />
          <ol className={`${resourceStyles.cards} ${styles.pillars}`} data-columns="3">
            {authorityPillars.map(({ title, body, href, icon }, index) => (
              <ConnectedJourneyCard
                key={title}
                title={title}
                description={body}
                image={`/img/homepage/service-orbit/${icon}.webp`}
                number={index + 1}
                containedIcon
              >
                <Link href={href} className={resourceStyles.textLink}>
                  View cluster <ArrowUpRight size={17} aria-hidden="true" />
                </Link>
              </ConnectedJourneyCard>
            ))}
          </ol>
        </div>
      </section>

      <section id="planned-studies" className={`${resourceStyles.section} ${resourceStyles.band}`} aria-labelledby="programs-heading">
        <div className={resourceStyles.inner}>
          <ResourceHeading
            id="programs-heading"
            eyebrow="Research programs"
            heading={<>Planned studies <em>and their methods.</em></>}
            intro="Each card states the research question and how we plan to study it. Findings will follow once the data and limitations are documented."
          />
          <ol className={resourceStyles.cards}>
            {researchPrograms.map(({ title, status, question, method, icon }, index) => (
              <ConnectedJourneyCard
                key={title}
                title={title}
                description={question}
                image={`/img/homepage/${icon}.webp`}
                number={index + 1}
                containedIcon
              >
                <div className={styles.studyDetails}>
                  <span className={styles.studyStatus}>{status}</span>
                  <p><strong>Method</strong> {method}</p>
                </div>
              </ConnectedJourneyCard>
            ))}
          </ol>
        </div>
      </section>

      <section className={resourceStyles.section} aria-labelledby="rules-heading">
        <div className={resourceStyles.inner}>
          <ResourceHeading
            id="rules-heading"
            eyebrow="Evidence standards"
            heading={<>How we collect <em>and use evidence.</em></>}
          />
          <div className={styles.evidenceLayout}>
            <div>
              <h3>Evidence rules</h3>
              <ResourceChecklist items={operatingRules} />
            </div>
            <div>
              <h3>Connected resources</h3>
              <ul className={styles.assetLinks}>
                {flagshipAssets.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className={resourceStyles.textLink}>{label} <ArrowUpRight size={16} aria-hidden="true" /></Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <FaqSection
        id="research-faq"
        headingId="faq-heading"
        eyebrow="Research FAQ"
        heading={<>Questions about <em>our research.</em></>}
        description="How we plan studies, use evidence and connect findings to client decisions."
        items={faqs}
        centered
      />

      <ResourceClosing
        id="research-next-step"
        heading={<>Read the method <em>behind the work.</em></>}
        intro="Open the research brief or see how the AI visibility plan puts monitoring and evidence into practice."
        actions={[
          { href: "/research.md", label: "Read research brief" },
          { href: "/ai-visibility-growth/", label: "AI visibility plan" },
        ]}
      />
    </main>
  );
}
