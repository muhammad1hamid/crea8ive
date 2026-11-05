import type { Metadata } from "next";
import { ServiceConsultingContext } from '@/components/ConsultingContext';
import Link from "next/link";
import { AI_SEARCH_FAQS, AUTHORITY_TOPICS } from "@/lib/authority-data";
import { BUSINESS_DETAILS, SITE_URL } from "@/lib/site-config";

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
    <div className="native-page">
      <JsonLd />
      <section className="px-6 pb-16 pt-36 lg:px-10 lg:pt-44">
        <div className="mx-auto max-w-[1120px]">
          <nav className="mb-8 flex flex-wrap items-center gap-2 font-orbitron text-[10px] uppercase tracking-[0.16em] text-white/45" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-brand-300">Home</Link>
            <span>/</span>
            <span className="text-white/72">AI Search Optimization</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <div>
              <p className="lux-eyebrow mb-5">AEO, GEO, LLMO and Entity SEO</p>
              <h1 className="font-syne text-[clamp(2.45rem,5.7vw,5.6rem)] font-bold leading-[0.97] text-white">
                AI Search Optimization for Businesses in Pakistan
              </h1>
              <p className="mt-7 max-w-[780px] font-inter text-lg leading-8 text-white/72">
                AI search optimization helps businesses become easier for search engines and AI
                assistants to understand, summarize, and cite accurately. Crea8iv Media approaches
                this through factual first-party content, entity SEO, structured data, answer-ready
                pages, internal linking, and consistent brand evidence.
              </p>
              <p className="mt-5 max-w-[780px] font-inter text-base leading-8 text-white/66">
                The objective is not to manipulate AI systems. The objective is to make public
                information clearer, more useful, and more verifiable for people and machines.
              </p>
              <p className="mt-5 font-orbitron text-[11px] uppercase tracking-[0.16em] text-white/45">
                Last updated: {LAST_UPDATED_LABEL}
              </p>
            </div>

            <aside className="lux-card p-6">
              <p className="font-orbitron text-[11px] uppercase tracking-[0.18em] text-brand-300">Systems Covered</p>
              <ul className="mt-5 space-y-3">
                {SYSTEMS.map((system) => (
                  <li key={system} className="flex gap-3 font-inter text-sm leading-6 text-white/72">
                    <span className="text-[#FF6801]">-</span>
                    <span>{system}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 lg:px-10">
        <div className="mx-auto max-w-[1120px]">
          <p className="lux-eyebrow mb-4">Direct Answer</p>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
            <div>
              <h2 className="font-orbitron text-2xl font-bold text-white">What does AI search optimization include?</h2>
              <p className="mt-4 font-inter text-base leading-7 text-white/70">
                AI search optimization includes entity SEO, structured data, answer-first content,
                machine-readable service information, internal linking, proof signals, and conversion
                paths that help search engines and AI assistants understand what a business offers,
                who it serves, why it is credible, and how buyers should contact it.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/tools/ai-visibility-checker/" className="hero-chip rounded-full border border-[#FF6801]/50 bg-[#1a0b02]/60 px-4 py-2.5 text-sm text-white/90 hover:border-[#FF6801]">
                  Run AI visibility check
                </Link>
                <Link href="/consultation/" className="hero-chip rounded-full border border-white/20 bg-white/[0.04] px-4 py-2.5 text-sm text-white/90 hover:border-[#FF6801]/70">
                  Book consultation
                </Link>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {AI_SEARCH_SERVICE_FACTS.map((fact) => (
                <div key={fact.label} className="lux-card p-5">
                  <h3 className="font-orbitron text-[12px] uppercase tracking-[0.16em] text-brand-300">{fact.label}</h3>
                  <p className="mt-3 font-inter text-sm leading-6 text-white/66">{fact.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 lg:px-10">
        <div className="mx-auto max-w-[1120px]">
          <p className="lux-eyebrow mb-4">How It Works</p>
          <h2 className="font-orbitron text-2xl font-bold text-white">The AI visibility operating model</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {WORKFLOW.map((item) => (
              <div key={item.title} className="lux-card p-6">
                <h3 className="font-orbitron text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-3 font-inter text-sm leading-7 text-white/66">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-12 lg:px-10">
        <div className="mx-auto max-w-[1120px]">
          <p className="lux-eyebrow mb-4">Service Scope</p>
          <h2 className="font-orbitron text-2xl font-bold text-white">What Crea8iv Media builds for AI search readiness</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {AUTHORITY_TOPICS.map((topic) => (
              <Link key={topic.title} href={topic.href} className="lux-card block p-6 transition hover:border-[#FF6801]/50">
                <h3 className="font-orbitron text-base font-semibold text-white">{topic.title}</h3>
                <p className="mt-3 font-inter text-sm leading-6 text-white/64">{topic.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-12 lg:px-10">
        <div className="mx-auto max-w-[920px]">
          <p className="lux-eyebrow mb-4">Machine-Readable Trust</p>
          <h2 className="font-orbitron text-2xl font-bold text-white">Authority signals this site maintains</h2>
          <ul className="mt-6 space-y-4 font-inter text-base leading-7 text-white/70">
            <li>Consistent organization, local business, website, service, article, person, and breadcrumb schema.</li>
            <li>Canonical founder and company pages for entity disambiguation.</li>
            <li>Public `llms.txt` and pricing information for AI assistants and agentic search tools.</li>
            <li>Content pages that answer direct questions before expanding into strategy, examples, and FAQs.</li>
            <li>Visible contact, legal, pricing, location, and service information for trust and verification.</li>
          </ul>
        </div>
      </section>

      <section className="px-6 py-12 lg:px-10">
        <div className="mx-auto max-w-[1120px]">
          <p className="lux-eyebrow mb-4">AI Visibility Audit</p>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
            <div>
              <h2 className="font-orbitron text-2xl font-bold text-white">What should a Pakistan business fix first?</h2>
              <p className="mt-4 font-inter text-base leading-7 text-white/66">
                A practical AI search audit should first verify whether AI systems can identify the
                business, understand the service scope, extract buyer-ready answers, and connect
                claims to visible proof. Crea8iv Media prioritizes fixes that improve both search
                visibility and lead quality.
              </p>
            </div>
            <div className="grid gap-4">
              {READINESS_CHECKS.map((item) => (
                <Link key={item.title} href={item.href} className="lux-card block p-6 transition hover:border-[#FF6801]/50">
                  <h3 className="font-orbitron text-[15px] font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 font-inter text-sm leading-7 text-white/64">{item.body}</p>
                  <span className="mt-4 inline-flex font-orbitron text-[11px] uppercase tracking-[0.14em] text-brand-300">
                    {item.cta}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.08] bg-[#080706] px-6 py-12 lg:px-10">
        <div className="mx-auto grid max-w-[1120px] gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <div>
            <p className="lux-eyebrow mb-4">Start With Evidence</p>
            <h2 className="font-orbitron text-2xl font-bold text-white">Plan an AI search project around the gaps that affect visibility</h2>
            <p className="mt-4 max-w-[720px] font-inter text-base leading-7 text-white/66">
              An AI visibility audit should show what search systems can already understand about the business, where the evidence is weak, and which commercial pages need the clearest next-step path. It is a practical starting point before committing to ongoing content, technical, or entity work.
            </p>
          </div>
          <div className="lux-card p-6">
            <p className="font-orbitron text-[11px] uppercase tracking-[0.18em] text-brand-300">A useful first review</p>
            <ul className="mt-5 space-y-3 font-inter text-sm leading-6 text-white/70">
              <li>Current search, page, and entity signals that can be verified.</li>
              <li>Priority fixes for service pages, supporting content, and structured data.</li>
              <li>A focused implementation order tied to leads, trust, and discoverability.</li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact/" className="hero-chip rounded-full border border-[#FF6801]/50 bg-[#1a0b02]/60 px-4 py-2.5 text-sm text-white/90 hover:border-[#FF6801]">
                Request AI Visibility Audit
              </Link>
              <Link href="/pricing/" className="hero-chip rounded-full border border-white/20 bg-white/[0.04] px-4 py-2.5 text-sm text-white/90 hover:border-[#FF6801]/70">
                View pricing
              </Link>
              <Link href="/results/" className="hero-chip rounded-full border border-white/20 bg-white/[0.04] px-4 py-2.5 text-sm text-white/90 hover:border-[#FF6801]/70">
                View results
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.08] bg-[#080706] px-6 py-12 lg:px-10">
        <div className="mx-auto max-w-[1120px]">
          <p className="lux-eyebrow mb-4">Supporting Reading</p>
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div className="max-w-[760px]">
              <h2 className="font-orbitron text-2xl font-bold text-white">Recent articles that strengthen this AI search cluster</h2>
              <p className="mt-4 font-inter text-base leading-7 text-white/66">
                Internal links work best when service pages and supporting articles reinforce the same entity, trust, and conversion signals.
              </p>
            </div>
            <Link href="/blog/" className="portfolio-text-link">
              Browse all insights
            </Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                href: "/blog/what-is-ai-search-optimization/",
                title: "What Is AI Search Optimization?",
                body: "Start with a plain-English explanation of the entities, evidence, content, and technical signals that make AI visibility possible.",
              },
              {
                href: "/blog/aeo-vs-seo/",
                title: "AEO vs SEO",
                body: "See what answer-first search changes, what classic SEO still controls, and how both systems work together.",
              },
              {
                href: "/blog/geo-vs-seo/",
                title: "GEO vs SEO",
                body: "Compare generative-engine optimization with SEO and decide where AI citation readiness belongs in your growth plan.",
              },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="lux-card block p-6 transition hover:border-[#FF6801]/50">
                <h3 className="font-orbitron text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-3 font-inter text-sm leading-7 text-white/64">{item.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 pt-12 lg:px-10">
        <div className="mx-auto max-w-[860px]">
          <p className="lux-eyebrow mb-4">AI Search FAQ</p>
          <h2 className="font-orbitron text-2xl font-bold text-white">Frequently Asked Questions</h2>
          <div className="mt-6 space-y-4">
            {AI_SEARCH_FAQS.map((faq) => (
              <div key={faq.q} className="lux-card p-6">
                <h3 className="font-orbitron text-[15px] font-semibold text-white">{faq.q}</h3>
                <p className="mt-2 font-inter text-sm leading-7 text-white/66">{faq.a}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/case-studies/stw-movers-barcelona/" className="inline-flex min-h-11 items-center text-[var(--icon-color)] underline underline-offset-4">
              STW Movers: search architecture and traveller answers
            </Link>
            <Link href="/contact/" className="hero-chip rounded-full border border-[#FF6801]/50 bg-[#1a0b02]/60 px-5 py-3 text-sm text-white/90 hover:border-[#FF6801]">
              Request AI Visibility Audit
            </Link>
            <Link href={`mailto:${BUSINESS_DETAILS.email}`} className="hero-chip rounded-full border border-white/20 bg-white/[0.04] px-5 py-3 text-sm text-white/90 hover:border-[#FF6801]/70">
              Email Crea8iv Media
            </Link>
          </div>
        </div>
      </section>
      <ServiceConsultingContext discipline="search" />
    </div>
  );
}
