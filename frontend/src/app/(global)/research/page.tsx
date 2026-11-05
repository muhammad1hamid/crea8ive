import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  BarChart3,
  BookOpenCheck,
  FileCheck2,
  LineChart,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { BUSINESS_DETAILS, SITE_URL } from "@/lib/site-config";

const PAGE_URL = `${SITE_URL}/research/`;
const LAST_UPDATED = "2026-10-08";

const authorityPillars = [
  {
    title: "Website Development",
    body: "Performance, conversion paths, technical SEO, redesign risk, Next.js versus WordPress decisions and international delivery models.",
    href: "/website-development/",
  },
  {
    title: "SEO and AI Visibility",
    body: "Search architecture, local SEO, AI citation readiness, entity clarity, structured data, answer blocks and content evidence.",
    href: "/ai-search-optimization/",
  },
  {
    title: "Google Ads and Acquisition",
    body: "Search intent, landing pages, tracking, lead quality, campaign waste, conversion feedback and customer acquisition economics.",
    href: "/google-ads/",
  },
] as const;

const researchPrograms = [
  {
    title: "AI Search Visibility Benchmark",
    status: "Planned study",
    question: "How often do Pakistani service businesses appear in ChatGPT, Gemini, Perplexity and Google AI results for commercial discovery prompts?",
    method: "Fixed prompt set, recorded platform, date, market context, visible sources, cited URLs and mention quality.",
  },
  {
    title: "Website Conversion Benchmark",
    status: "Planned study",
    question: "What separates high-trust service websites from sites that look good but fail to generate qualified enquiries?",
    method: "Review a defined sample against mobile UX, page speed, content clarity, proof, forms, WhatsApp paths and analytics readiness.",
  },
  {
    title: "Local SEO and Maps Evidence Review",
    status: "Planned study",
    question: "Which public signals are consistently present for businesses appearing strongly in local search and Google Maps?",
    method: "Track categories, service wording, profile completeness, review signals, landing pages, NAP consistency and visible proof.",
  },
  {
    title: "Google Ads Waste and Lead Quality Review",
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
    <main className="native-page relative isolate overflow-hidden bg-[#050505] text-white">
      <JsonLd />
      <section className="px-6 pb-14 pt-44 lg:px-10 lg:pb-20">
        <div className="mx-auto max-w-[1180px]">
          <nav className="mb-8 flex flex-wrap items-center gap-2 font-orbitron text-[10px] uppercase tracking-[0.16em] text-white/45" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-brand-300">Home</Link>
            <span>/</span>
            <span className="text-white/72">Research</span>
          </nav>
          <p className="lux-eyebrow mb-5">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Authority research
          </p>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <div>
              <h1 className="max-w-5xl font-orbitron text-[clamp(2.35rem,6vw,5.2rem)] font-bold leading-[1.03] tracking-normal text-white">
                Research should make growth decisions easier to verify.
              </h1>
              <p className="mt-6 max-w-3xl font-inter text-lg leading-8 text-white/70">
                Crea8iv Media Research is a methodology-first hub for website development, SEO, AI visibility and Google Ads acquisition. The purpose is to turn real observations, client proof and public benchmarks into useful decision assets without inventing results.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link href="/research.md" className="portfolio-button justify-center">
                  Read research brief <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/ai-visibility-growth/"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 font-orbitron text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition hover:border-[#FF6801]/70 hover:text-[#FF6801]"
                >
                  AI visibility plan <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
            <aside className="lux-card p-6">
              <p className="font-orbitron text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF6801]">Primary objective</p>
              <p className="mt-5 font-inter text-xl leading-8 text-white">
                Authority -&gt; rankings -&gt; AI citations -&gt; branded demand -&gt; qualified leads -&gt; revenue.
              </p>
              <p className="mt-5 font-inter text-sm leading-7 text-white/62">
                DR and DA are tracked as secondary indicators. They are not treated as the main business outcome.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 lg:px-10" aria-labelledby="pillars-heading">
        <div className="mx-auto max-w-[1180px]">
          <p className="lux-eyebrow mb-4">
            <BookOpenCheck className="h-3.5 w-3.5" aria-hidden="true" /> Authority pillars
          </p>
          <h2 id="pillars-heading" className="max-w-4xl font-orbitron text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight text-white">
            Three clusters keep authority concentrated.
          </h2>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {authorityPillars.map((pillar) => (
              <article key={pillar.title} className="lux-card p-6">
                <h3 className="font-orbitron text-xl font-semibold text-white">{pillar.title}</h3>
                <p className="mt-4 font-inter text-sm leading-7 text-white/66">{pillar.body}</p>
                <Link href={pillar.href} className="mt-6 inline-flex items-center gap-2 font-orbitron text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF6801]">
                  View cluster <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-12 lg:px-10" aria-labelledby="programs-heading">
        <div className="mx-auto max-w-[1180px]">
          <p className="lux-eyebrow mb-4">
            <BarChart3 className="h-3.5 w-3.5" aria-hidden="true" /> Research programs
          </p>
          <h2 id="programs-heading" className="max-w-4xl font-orbitron text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight text-white">
            Planned studies are labeled before findings are published.
          </h2>
          <div className="mt-8 grid gap-5">
            {researchPrograms.map((program, index) => (
              <article key={program.title} className="lux-card p-6">
                <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
                  <div>
                    <span className="font-orbitron text-[10px] font-bold uppercase tracking-[0.16em] text-white/35">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-3 rounded-full border border-[#FF6801]/35 bg-[#FF6801]/10 px-3 py-1 text-center font-orbitron text-[10px] font-bold uppercase tracking-[0.14em] text-[#FF6801]">
                      {program.status}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-orbitron text-2xl font-semibold text-white">{program.title}</h3>
                    <p className="mt-4 font-inter text-base leading-8 text-white/74">{program.question}</p>
                    <p className="mt-4 font-inter text-sm leading-7 text-white/54">
                      <strong className="text-white/82">Method:</strong> {program.method}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-12 lg:px-10" aria-labelledby="rules-heading">
        <div className="mx-auto grid max-w-[1180px] gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <div className="lux-card p-7">
            <p className="lux-eyebrow mb-4">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" /> Evidence rules
            </p>
            <h2 id="rules-heading" className="font-orbitron text-3xl font-bold leading-tight text-white">
              Useful research has boundaries.
            </h2>
            <ul className="mt-6 space-y-4">
              {operatingRules.map((rule) => (
                <li key={rule} className="flex gap-3 font-inter text-sm leading-7 text-white/68">
                  <FileCheck2 className="mt-1 h-4 w-4 shrink-0 text-[#FF6801]" aria-hidden="true" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lux-card p-7">
            <p className="lux-eyebrow mb-4">
              <Search className="h-3.5 w-3.5" aria-hidden="true" /> Connected assets
            </p>
            <h2 className="font-orbitron text-3xl font-bold leading-tight text-white">
              Evidence should connect to decisions.
            </h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {flagshipAssets.map((asset) => (
                <Link key={asset.href} href={asset.href} className="rounded-[18px] border border-white/10 bg-white/[0.035] p-4 font-inter text-sm leading-6 text-white/72 transition hover:border-[#FF6801]/45 hover:text-white">
                  {asset.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-14 lg:px-10" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-[1180px]">
          <p className="lux-eyebrow mb-4">
            <LineChart className="h-3.5 w-3.5" aria-hidden="true" /> Research FAQ
          </p>
          <h2 id="faq-heading" className="max-w-4xl font-orbitron text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight text-white">
            Clear answers before deeper studies.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {faqs.map((faq) => (
              <article key={faq.question} className="lux-card p-6">
                <h3 className="font-orbitron text-lg font-semibold text-white">{faq.question}</h3>
                <p className="mt-4 font-inter text-sm leading-7 text-white/66">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
