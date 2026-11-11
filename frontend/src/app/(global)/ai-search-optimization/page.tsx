import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ServiceConsultingContext } from "@/components/ConsultingContext";
import { ConnectedJourneyCard } from "@/components/HomepageConnectedJourney";
import { DeliveryProcess } from "@/components/HomepageDeliveryProcess";
import { InsightsSection } from "@/components/HomepageEditorial";
import { FaqSection } from "@/components/HomepageFaq";
import actionStyles from "@/components/homepage-final-cta.module.css";
import { ResourceChecklist, ResourceClosing, ResourceHeading, ResourceHero } from "@/components/resource/ResourcePage";
import resource from "@/components/resource/resource-page.module.css";
import serviceStyles from "@/components/resource/service-revamp.module.css";
import { AI_SEARCH_FAQS, AUTHORITY_TOPICS } from "@/lib/authority-data";
import { BUSINESS_DETAILS, SITE_URL } from "@/lib/site-config";
import styles from "./ai-search.module.css";

const PAGE_URL = `${SITE_URL}/ai-search-optimization/`;
const LAST_UPDATED_ISO = "2026-09-09";
const LAST_UPDATED_LABEL = "September 9, 2026";

const SYSTEMS = [
  "Google AI Overviews",
  "ChatGPT",
  "Gemini",
  "Claude",
  "Perplexity",
  "Microsoft Copilot",
  "Meta AI",
  "Apple Intelligence",
] as const;

const WORKFLOW = [
  {
    title: "Entity Foundation",
    body: "Define the canonical organization, founder, services, locations, social profiles, and source-of-truth pages that should be reused across the web.",
  },
  {
    title: "Extractable Content",
    body: "Publish direct answer blocks, definitions, comparison tables, FAQs, dated guides, and author attribution so AI systems can quote the right passage.",
  },
  {
    title: "Structured Data",
    body: "Connect Organization, Person, WebSite, WebPage, Article, Service, FAQPage, BreadcrumbList, LocalBusiness, and Offer schema with stable @id values.",
  },
  {
    title: "Evidence and Refresh",
    body: "Document case studies, original observations, research notes, updates, and editorial changes so claims can be verified and refreshed over time.",
  },
] as const;

const READINESS_CHECKS = [
  {
    title: "Can AI systems identify the business entity?",
    body: "The page should make the company name, legal name, founder, location, services, and canonical profiles easy to connect without guessing.",
    href: "/services.md",
    cta: "View service source",
  },
  {
    title: "Can the page answer buyer questions directly?",
    body: "Priority service pages should include short answer blocks for cost, fit, process, timelines, proof, and next steps before longer explanation.",
    href: "/tools/ai-visibility-checker/",
    cta: "Check AI visibility",
  },
  {
    title: "Does structured data match visible content?",
    body: "Organization, Person, Service, WebPage, BreadcrumbList, Article, and WebApplication schema should describe facts that users can also see.",
    href: "/tools/schema-markup-generator/",
    cta: "Review schema",
  },
  {
    title: "Can an AI agent understand commercial scope?",
    body: "Pricing, service fit, exclusions, and contact paths should be available in crawlable pages and machine-readable files without relying on JavaScript.",
    href: "/pricing.md",
    cta: "View pricing source",
  },
  {
    title: "Is AI visibility being measured as an operating system?",
    body: "Priority queries, AI citations, Search Console data, proof refreshes, third-party mentions and lead actions should be tracked on a weekly and monthly rhythm.",
    href: "/ai-visibility-growth/",
    cta: "View growth plan",
  },
] as const;

const AI_SEARCH_SERVICE_FACTS = [
  {
    label: "Best fit",
    value: "Service businesses, clinics, restaurants, real estate teams, ecommerce brands, and B2B companies that need clearer search and AI visibility.",
  },
  {
    label: "Core deliverables",
    value: "Entity cleanup, answer blocks, schema alignment, machine-readable files, internal links, tool CTAs, and evidence-backed service content.",
  },
  {
    label: "First priority",
    value: "Make the brand, founder, location, services, prices, proof, and next action understandable without requiring an AI system to infer missing facts.",
  },
  {
    label: "Commercial path",
    value: "Connect AI visibility work to consultation, service pages, pricing, tools, and lead capture instead of treating it as a separate content exercise.",
  },
] as const;

const factIcons = ["01-discover", "02-explore", "03-trust", "04-enquire"];
const processArt = ["understand-chameleon", "plan-chess", "build-launch-rocket", "learn-improve-owl"];
const topicIcons = ["02-seo-ai", "01-strategy", "02-seo-ai", "05-paid-ads", "06-automation", "03-websites"];

const evidenceSignals = [
  "Consistent organization, local business, website, service, article, person and breadcrumb schema.",
  "Canonical founder and company pages that make the entity easy to identify.",
  "Public llms.txt and pricing information for AI assistants and search tools.",
  "Direct answers supported by strategy, examples and FAQs.",
  "Visible contact, legal, pricing, location and service information.",
];

const firstReview = [
  "Current search, page and entity signals that can be verified.",
  "Priority fixes for service pages, supporting content and structured data.",
  "An implementation order tied to leads, trust and discoverability.",
];

const articles = [
  { href: "/blog/what-is-ai-search-optimization/", title: "What Is AI Search Optimization?", description: "A plain-English guide to the entities, evidence and technical signals that help search systems understand a business.", image: "/wp-content/uploads/2026/08/what-is-ai-search-optimization-blog-thumbnail-ai-regenerated-v4.webp", topic: "AI search" },
  { href: "/blog/aeo-vs-seo/", title: "AEO vs SEO", description: "See what answer-first search changes and how it works alongside traditional SEO.", image: "/wp-content/uploads/2026/08/aeo-vs-seo-blog-thumbnail-ai-regenerated-v4.webp", topic: "AEO" },
  { href: "/blog/geo-vs-seo/", title: "GEO vs SEO", description: "Compare generative-engine optimisation with SEO and decide where citation readiness fits into your plan.", image: "/wp-content/uploads/2026/08/geo-vs-seo-blog-thumbnail-ai-regenerated-v4.webp", topic: "GEO" },
];

export const metadata: Metadata = {
  title: { absolute: "AI Search Optimization Agency in Pakistan | Crea8iv Media" },
  description:
    "Crea8iv Media helps businesses prepare for AI search in Pakistan with entity SEO, structured data, answer blocks and AI citation readiness.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "AI Search Optimization Agency in Pakistan | Crea8iv Media",
    description:
      "A first-party resource on AI visibility, entity SEO, answer-engine optimization and AI-ready content architecture for Pakistan businesses.",
    url: PAGE_URL,
    siteName: "Crea8iv Media",
    type: "website",
    images: [{ url: `${SITE_URL}/img/crea8iv-white-3d-logo.webp`, width: 900, height: 713, alt: "Crea8iv Media" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Search Optimization Agency in Pakistan | Crea8iv Media",
    description:
      "Entity SEO, structured data and AI citation readiness for businesses in Pakistan.",
  },
};

function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: "AI Search Optimization, AEO, GEO and LLMO",
        description: metadata.description,
        datePublished: "2026-08-15",
        dateModified: LAST_UPDATED_ISO,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: [
          { "@type": "Thing", name: "AI Search Optimization" },
          { "@type": "Thing", name: "Answer Engine Optimization" },
          { "@type": "Thing", name: "Generative Engine Optimization" },
          { "@type": "Thing", name: "Large Language Model Optimization" },
          { "@id": `${SITE_URL}/#organization` },
        ],
        author: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        breadcrumb: { "@id": `${PAGE_URL}#breadcrumb` },
        inLanguage: "en-PK",
      },
      {
        "@type": "Service",
        "@id": `${PAGE_URL}#service`,
        serviceType: "AI Search Optimization",
        name: "AI Search Optimization, AEO, GEO and LLMO - Crea8iv Media",
        description:
          "Entity SEO, structured data, AI-ready content architecture, answer blocks, FAQ systems, and citation-readiness consulting for businesses.",
        audience: {
          "@type": "BusinessAudience",
          audienceType: "Pakistan businesses evaluating SEO, AEO, GEO, entity SEO, structured data, and AI search visibility.",
        },
        serviceOutput: [
          "AI visibility audit",
          "Entity SEO cleanup",
          "Answer-ready service content",
          "Structured data alignment",
          "Machine-readable service and pricing files",
          "Internal linking and conversion path recommendations",
        ],
        provider: { "@id": `${SITE_URL}/#business` },
        areaServed: [
          { "@type": "Country", name: "Pakistan" },
          { "@type": "City", name: "Rawalpindi" },
          { "@type": "City", name: "Islamabad" },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${PAGE_URL}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "AI Search Optimization", item: PAGE_URL },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${PAGE_URL}#faq`,
        mainEntity: AI_SEARCH_FAQS.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function AiSearchOptimizationPage() {
  return (
    <main className={resource.page}>
      <JsonLd />
      <ResourceHero
        id="ai-search-title"
        breadcrumb="AI Search Optimization"
        eyebrow="AEO, GEO, LLMO and Entity SEO"
        heading={<>AI Search Optimization <em>for businesses in Pakistan.</em></>}
        intro="Make your business easier for search engines and AI assistants to understand, summarise and cite accurately. We start with clear first-party answers, consistent business facts, structured data and evidence people can verify."
        note={<>Last updated <time dateTime={LAST_UPDATED_ISO}>{LAST_UPDATED_LABEL}</time></>}
        art={{ src: "/img/homepage/service-orbit/02-seo-ai.webp", alt: "A magnifying glass, search bar and AI chip representing search visibility", width: 512, height: 512, cutout: true }}
        actions={[
          { href: "/tools/ai-visibility-checker/", label: "Run AI visibility check" },
          { href: "#readiness", label: "Explore readiness checks" },
        ]}
      />

      <section className={`${resource.section} ${resource.band}`} aria-labelledby="ai-search-scope">
        <div className={resource.inner}>
          <ResourceHeading
            id="ai-search-scope"
            eyebrow="Direct answer"
            heading={<>What does AI search optimisation <em>include?</em></>}
            intro="It connects entity SEO, structured data, answer-first content, machine-readable service information, internal links and proof. Together these make it easier to understand what a business offers, who it serves, why it is credible and how buyers can contact it."
          />
          <div className={styles.systems}>
            <h3>Systems covered</h3>
            <ul>{SYSTEMS.map((system) => <li key={system}>{system}</li>)}</ul>
          </div>
          <ol className={resource.cards} data-columns="4">
            {AI_SEARCH_SERVICE_FACTS.map(({ label, value }, index) => (
              <ConnectedJourneyCard key={label} title={label} description={value} image={`/img/homepage/connected-journey/${factIcons[index]}.webp`} number={index + 1} containedIcon />
            ))}
          </ol>
        </div>
      </section>

      <DeliveryProcess
        id="ai-search-process"
        headingId="ai-search-process-title"
        eyebrow="How it works"
        heading={<>Make the facts <em>easier to find and verify.</em></>}
        intro="Start with consistent business information. Then connect clear answers, matching schema and evidence that can be reviewed over time."
        steps={WORKFLOW.map(({ title, body }, index) => ({ title, description: body, image: processArt[index], alt: "" }))}
        mobileSequence={{ label: "Structured data setup", steps: ["Choose the relevant schema", "Match visible facts", "Link stable identifiers", "Validate the markup"] }}
      />

      <section id="readiness" className={resource.section} aria-labelledby="ai-readiness-title">
        <div className={resource.inner}>
          <ResourceHeading
            id="ai-readiness-title"
            eyebrow="AI visibility audit"
            heading={<>Find the gaps <em>worth fixing first.</em></>}
            intro="Check whether search systems can identify the business, understand its services, extract useful answers and connect claims to visible evidence."
          />
          <ol className={styles.readiness}>
            {READINESS_CHECKS.map(({ title, body, href, cta }, index) => (
              <li key={title}>
                <span className={styles.number} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{title}</h3><p>{body}</p><Link href={href} className={resource.textLink}>{cta} <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={`${resource.section} ${resource.band}`} aria-labelledby="ai-topics-title">
        <div className={resource.inner}>
          <ResourceHeading
            id="ai-topics-title"
            eyebrow="Service scope"
            heading={<>Connect AI visibility <em>to the wider growth plan.</em></>}
            intro="Explore the related services and resources that support discovery, measurement and follow-up."
          />
          <ol className={`${resource.cards} ${styles.topicCards}`} data-columns="3">
            {AUTHORITY_TOPICS.map(({ title, description, href }, index) => (
              <ConnectedJourneyCard key={title} title={title} description={description} image={`/img/homepage/service-orbit/${topicIcons[index]}.webp`} number={index + 1} containedIcon>
                <Link href={href} className={resource.textLink}>Explore {title} <ArrowUpRight size={16} aria-hidden="true" /></Link>
              </ConnectedJourneyCard>
            ))}
          </ol>
        </div>
      </section>

      <section className={resource.section} aria-labelledby="ai-evidence-title">
        <div className={resource.inner}>
          <ResourceHeading
            id="ai-evidence-title"
            eyebrow="Machine-readable trust"
            heading={<>Keep the sources <em>clear and consistent.</em></>}
            intro="These are the authority signals this site maintains so people and search systems can check the same information."
          />
          <ResourceChecklist items={evidenceSignals} columns={2} />
          <div className={styles.auditLinks}>
            <Link href="/case-studies/stw-movers-barcelona/" className={resource.textLink}>STW Movers: search architecture and traveller answers <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className={`${resource.section} ${resource.band}`} aria-labelledby="ai-first-review">
        <div className={resource.inner}>
          <ResourceHeading
            id="ai-first-review"
            eyebrow="Start with evidence"
            heading={<>Agree an implementation order <em>before committing.</em></>}
            intro="Use an audit to see what is already clear, where evidence is weak and which commercial pages need a better next step."
          />
          <ResourceChecklist items={firstReview} columns={2} />
          <div className={styles.auditLinks}>
            <Link href="/consultation/" className={actionStyles.primary}>Book consultation <ArrowUpRight size={17} aria-hidden="true" /></Link>
            <Link href="/pricing/" className={resource.textLink}>View pricing <ArrowUpRight size={17} aria-hidden="true" /></Link>
            <Link href="/results/" className={resource.textLink}>View results <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <InsightsSection id="ai-search-insights" eyebrow="Supporting reading" issue="AI search" heading={<>Learn how <em>AI search and SEO fit together.</em></>} intro="Explore the differences between AI search, answer engines and traditional SEO." linkLabel="Browse all insights" articles={articles} />

      <FaqSection
        id="ai-search-faq"
        headingId="ai-search-faq-title"
        eyebrow="AI search FAQ"
        heading={<>Frequently asked <em>questions.</em></>}
        description="What AI search optimisation means, how it relates to SEO and what makes a source easier to cite."
        items={AI_SEARCH_FAQS.map(({ q, a }) => ({ question: q, answer: a }))}
        centered
      />

      <div className={`${resource.inner} ${serviceStyles.consulting}`}><ServiceConsultingContext discipline="search" /></div>

      <ResourceClosing
        id="ai-search-next-step"
        heading={<>Plan your <em>AI visibility audit.</em></>}
        intro="Share your website and the questions buyers ask. We’ll discuss which pages, evidence and technical checks should come first."
        actions={[
          { href: "/contact/", label: "Request AI Visibility Audit" },
          { href: `mailto:${BUSINESS_DETAILS.email}`, label: "Email Crea8iv Media" },
        ]}
      />
    </main>
  );
}
