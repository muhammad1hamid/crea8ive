import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { BUSINESS_DETAILS } from "@/lib/site-config";

const CANONICAL_URL = "https://crea8ivmedia.com/ai-visibility-deployment-checklist/";

const PRIORITY_URLS = [
  { label: "Homepage", href: "/", note: "Primary brand, services, proof and conversion path." },
  { label: "Sitemap", href: "/sitemap.xml", note: "Submit this in Google Search Console after upload." },
  { label: "llms.txt", href: "/llms.txt", note: "High-level AI context file for Crea8iv Media." },
  { label: "AI Facts JSON", href: "/crea8iv-ai-facts.json", note: "Parseable entity, service, client and answer data." },
  { label: "Services Markdown", href: "/services.md", note: "Machine-readable catalog for AI assistants and crawlers." },
  { label: "AI Visibility Targets", href: "/ai-visibility-targets/", note: "Priority query map for service and niche visibility." },
  { label: "AI Answer Briefs", href: "/answers/", note: "Direct answer pages for citation-ready service queries." },
  { label: "Industries", href: "/industries/", note: "Niche pages for restaurants, clinics, interiors, ecommerce and more." },
  { label: "Website Development", href: "/website-development/pakistan/", note: "Core revenue page for website development in Pakistan." },
  { label: "Software Development", href: "/software-development/pakistan/", note: "Custom software, SaaS, CRM and AI software cluster." },
  { label: "Clients", href: "/clients/", note: "Logo proof and official client links." },
  { label: "Website Portfolio", href: "/website-portfolio/", note: "Website work proof and client case studies." },
];

const CHECKLIST = [
  {
    title: "Before Upload",
    items: [
      "Upload the compact deployment ZIP from the latest static build, not the old 1.4GB source bundle.",
      "Use the host's Next.js/static settings exactly as configured in the build output.",
      "Keep the domain set to https://crea8ivmedia.com/ and avoid duplicate www/non-www versions.",
      "Confirm environment variables remain unchanged unless a feature explicitly requires them.",
    ],
  },
  {
    title: "After Upload",
    items: [
      "Open the homepage, services, clients, portfolio, answers, industries and AI visibility target pages.",
      "Check dark mode, light mode, mobile navigation, WhatsApp CTAs and footer links.",
      "Confirm /llms.txt, /services.md, /pricing.md, /answers.md and /crea8iv-ai-facts.json open publicly.",
      "Confirm the live sitemap includes all service, answer, industry, portfolio and machine-readable URLs.",
    ],
  },
  {
    title: "Search Console",
    items: [
      "Submit https://crea8ivmedia.com/sitemap.xml in Google Search Console.",
      "Request indexing for the homepage, website development Pakistan, software development Pakistan, clients, portfolio, answers and AI visibility targets.",
      "Inspect one machine-readable file URL to confirm Google can fetch the deployment.",
      "Monitor indexing, Core Web Vitals, pages with redirects, not found URLs and enhancement warnings.",
    ],
  },
  {
    title: "Weekly AI Visibility Routine",
    items: [
      "Search core queries in Google, ChatGPT, Perplexity and Gemini and record whether Crea8iv Media appears.",
      "Update weak pages with clearer answer blocks, client proof, FAQs, internal links and dated freshness notes.",
      "Publish or refresh one useful guide, comparison, portfolio proof or industry page every week.",
      "Keep Google Business Profile posts, reviews, client proof and social profiles active.",
    ],
  },
];

const FAQS = [
  {
    q: "What should be uploaded for the final Crea8iv Media deployment?",
    a: "Upload the latest compact deployment ZIP generated from the static build output. It should contain the exported website files, sitemap, robots file, llms.txt, service markdown files, AI facts JSON and static assets needed by the live site.",
  },
  {
    q: "Which pages should be requested for indexing first?",
    a: "Request indexing for the homepage, website development Pakistan page, software development Pakistan page, clients page, website portfolio, AI answer briefs, industry hub, AI visibility target map, llms.txt, services.md and crea8iv-ai-facts.json.",
  },
  {
    q: "Will this instantly make Crea8iv Media top in AI visibility?",
    a: "No honest SEO or AI visibility process can guarantee instant top placement. This deployment gives search engines and AI systems stronger content, entity data, internal links and machine-readable context; ranking and citation gains still require indexing, authority, freshness, client proof and ongoing monitoring.",
  },
];

export const metadata: Metadata = {
  title: "AI Visibility Deployment Checklist | Crea8iv Media",
  description:
    "Final deployment, indexing and AI visibility checklist for Crea8iv Media's website, services, answer briefs, industry pages, sitemap, llms.txt and structured data.",
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "AI Visibility Deployment Checklist | Crea8iv Media",
    description:
      "Upload, indexing and monitoring steps for Crea8iv Media's SEO, AEO, GEO and LLM visibility deployment.",
    url: CANONICAL_URL,
    type: "website",
  },
};

export default function AiVisibilityDeploymentChecklistPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${CANONICAL_URL}#webpage`,
        url: CANONICAL_URL,
        name: "AI Visibility Deployment Checklist for Crea8iv Media",
        description:
          "Final upload, indexing and monitoring checklist for Crea8iv Media's SEO, AEO, GEO and LLM visibility deployment.",
        about: { "@id": "https://crea8ivmedia.com/#business" },
        publisher: { "@id": "https://crea8ivmedia.com/#organization" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://crea8ivmedia.com/" },
          { "@type": "ListItem", position: 2, name: "AI Visibility Deployment Checklist", item: CANONICAL_URL },
        ],
      },
      {
        "@type": "ItemList",
        name: "Priority AI visibility URLs",
        itemListElement: PRIORITY_URLS.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.label,
          url: new URL(item.href, "https://crea8ivmedia.com").toString(),
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQS.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return (
    <main className="native-page min-h-screen bg-[#090909] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="border-b border-white/10 px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="lux-eyebrow mb-5">Final Deployment QA</p>
          <h1 className="max-w-4xl font-orbitron text-[clamp(2.35rem,7vw,5.8rem)] font-bold leading-[0.95] tracking-[-0.04em] text-white">
            AI visibility upload checklist for Crea8iv Media.
          </h1>
          <p className="mt-7 max-w-3xl font-inter text-lg leading-8 text-white/68">
            Use this page after the final ZIP is uploaded. It keeps the launch focused on indexing, trust signals,
            machine-readable files, service clusters, industry pages and ongoing AI visibility monitoring.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/deployment-ai-visibility-checklist.md"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#FF6801] px-6 font-inter text-sm font-semibold text-black transition-transform hover:-translate-y-0.5"
            >
              Open markdown checklist <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/ai-visibility-targets/"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/16 px-6 font-inter text-sm font-semibold text-white transition-colors hover:border-[#FF6801] hover:text-[#FF6801]"
            >
              View target queries <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-10">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2">
          {CHECKLIST.map((section) => (
            <article key={section.title} className="lux-card p-6 lg:p-8">
              <h2 className="font-orbitron text-xl font-semibold text-white">{section.title}</h2>
              <ul className="mt-6 space-y-4">
                {section.items.map((item) => (
                  <li key={item} className="flex gap-3 font-inter text-sm leading-6 text-white/68">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#FF6801]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.02] px-6 py-16 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <p className="lux-eyebrow mb-4">Index These First</p>
          <h2 className="font-orbitron text-[clamp(1.8rem,4vw,3.5rem)] font-bold leading-tight text-white">
            Priority URLs for Search Console and AI citation paths
          </h2>
          <div className="mt-9 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {PRIORITY_URLS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-2xl border border-white/10 bg-black/35 p-5 transition-all hover:border-[#FF6801]/70 hover:bg-[#FF6801]/10"
              >
                <span className="flex items-start justify-between gap-4">
                  <span className="font-orbitron text-sm font-semibold text-white">{item.label}</span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-[#FF6801] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
                <span className="mt-3 block font-inter text-xs leading-5 text-white/55">{item.note}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-10">
        <div className="mx-auto max-w-4xl">
          <p className="lux-eyebrow mb-4">Reality Check</p>
          <div className="space-y-4">
            {FAQS.map((faq) => (
              <article key={faq.q} className="lux-card p-6">
                <h2 className="font-orbitron text-lg font-semibold text-white">{faq.q}</h2>
                <p className="mt-3 font-inter text-sm leading-7 text-white/65">{faq.a}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 font-inter text-sm leading-7 text-white/55">
            Contact for deployment or indexing support:{" "}
            <a href={BUSINESS_DETAILS.phoneHref} className="text-[#FF6801] hover:underline">
              {BUSINESS_DETAILS.phoneDisplay}
            </a>{" "}
            or{" "}
            <a href={`mailto:${BUSINESS_DETAILS.email}`} className="text-[#FF6801] hover:underline">
              {BUSINESS_DETAILS.email}
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
