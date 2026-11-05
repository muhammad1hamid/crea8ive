import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, ExternalLink } from "lucide-react";
import { caseStudyShowcaseItems, showcaseItemToCreativeWork } from "@/lib/case-study-showcase";
import { SITE_URL } from "@/lib/site-config";
import styles from "@/components/case-study-body.module.css";

const caseStudyFaq = [
  {
    question: "What is included in Crea8iv Media case studies?",
    answer:
      "Crea8iv Media case studies document verified project scope, public website work, creative systems, SEO foundations, AI visibility work, conversion paths and live proof where available.",
  },
  {
    question: "Does Crea8iv Media publish fake results or ranking claims?",
    answer:
      "No. The case-study archive avoids unsupported traffic, revenue, ranking, lead and ROAS claims. Results are only published when they are supplied, approved and tied to a clear source and date range.",
  },
  {
    question: "Why do some cards say client proof instead of case study?",
    answer:
      "Some clients currently have proof links or portfolio evidence without enough approved facts for a full case study. Those entries are labelled honestly until a complete evidence-led case study can be published.",
  },
] as const;

export const metadata: Metadata = {
  title: { absolute: "Client Case Studies & Proof | Crea8iv Media" },
  description:
    "Explore Crea8iv Media case studies and client proof for premium websites, local SEO, AI visibility, creative production, admin systems and conversion-focused growth systems.",
  alternates: { canonical: `${SITE_URL}/case-studies/` },
  openGraph: {
    title: "Client Case Studies & Proof | Crea8iv Media",
    description:
      "Evidence-led case studies from Crea8iv Media covering website design, SEO, AI visibility, creative production and conversion systems.",
    url: `${SITE_URL}/case-studies/`,
    siteName: "Crea8iv Media",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function CaseStudiesPage() {
  const pageUrl = `${SITE_URL}/case-studies/`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        name: "Client Case Studies & Proof | Crea8iv Media",
        url: pageUrl,
        description: metadata.description,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        about: ["website design", "SEO", "AI visibility", "conversion strategy", "digital marketing proof"],
        mainEntity: { "@id": `${pageUrl}#case-study-list` },
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#case-study-list`,
        name: "Crea8iv Media case studies and proof",
        itemListElement: caseStudyShowcaseItems.map((item, index) => showcaseItemToCreativeWork(item, index + 1)),
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: caseStudyFaq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Case Studies", item: pageUrl },
        ],
      },
    ],
  };

  return (
    <main className="native-page relative isolate overflow-hidden bg-[#050505] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="relative overflow-hidden px-6 pb-16 pt-44 lg:px-10 lg:pb-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_16%,rgba(var(--decorative-rgb),.04),transparent_34%),radial-gradient(circle_at_12%_8%,rgba(255,255,255,.08),transparent_28%),linear-gradient(180deg,#101010,#050505_72%)]" />
        <div className="relative mx-auto max-w-[1320px]">
          <p className="lux-eyebrow mb-5">
            <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" /> Evidence-led client work
          </p>
          <h1 className="max-w-5xl font-orbitron text-[clamp(2.2rem,5vw,5rem)] font-bold leading-[1.04] tracking-normal text-white">
            Premium case studies and client proof built around real work, not inflated claims.
          </h1>
          <p className="mt-6 max-w-3xl font-inter text-lg leading-8 text-white/70">
            Explore selected Crea8iv Media engagements, platform proof and client links across website design, front-end development, local SEO, AI visibility, creative systems, admin panels and conversion-focused growth architecture.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24 lg:px-10 lg:pb-32">
        <div
          className={`${styles.archive} horizontal-scroll-region case-study-rail mx-auto grid max-w-[1440px] grid-flow-col auto-cols-[minmax(310px,88vw)] gap-6 overflow-x-auto pb-4 md:grid-flow-row md:auto-cols-auto md:grid-cols-2 md:overflow-visible xl:grid-cols-3`}
          role="region"
          aria-label="Crea8iv Media case study cards"
          tabIndex={0}
        >
          {caseStudyShowcaseItems.map((study) => (
            <article key={study.id} className="group overflow-hidden rounded-lg border border-white/10 bg-white/[0.035]">
              <Link href={study.primaryHref} className="block">
                <div className="case-study-media-stage relative aspect-[16/9] overflow-hidden bg-black/70">
                  <Image
                    src={study.image}
                    alt={study.imageAlt}
                    fill
                    className={`transition duration-500 group-hover:opacity-95 ${
                      study.id === "cake-art-academy" ? "object-contain p-10" : "object-contain"
                    }`}
                    sizes="(min-width: 1024px) 31vw, (min-width: 768px) 48vw, 86vw"
                  />
                </div>
                <div className="p-6">
                  <p className="font-inter text-xs uppercase tracking-[0.24em] text-white/42">{study.industry}</p>
                  <h2 className="mt-4 font-syne text-2xl font-semibold leading-tight tracking-normal text-white">{study.name}</h2>
                  <p className="mt-3 font-inter text-sm leading-7 text-white/64">{study.eyebrow}</p>
                  <div className="mt-5 flex items-center gap-2 font-inter text-sm font-semibold text-[var(--icon-color)]">
                    {study.primaryLabel} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                  </div>
                </div>
              </Link>
              {study.secondaryHref ? (
                <div className="border-t border-white/10 px-6 py-4">
                  {study.secondaryExternal ? (
                    <a href={study.secondaryHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-inter text-sm text-white/62 transition hover:text-white">
                      {study.secondaryLabel} <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  ) : (
                    <Link href={study.secondaryHref} className="inline-flex items-center gap-2 font-inter text-sm text-white/62 transition hover:text-white">
                      {study.secondaryLabel} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 px-6 pb-24 lg:px-10 lg:pb-32" aria-labelledby="case-study-faq-heading">
        <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="lux-eyebrow mb-4">Proof standards</p>
            <h2 id="case-study-faq-heading" className="font-syne text-3xl font-semibold leading-tight text-white sm:text-4xl">
              Evidence-led work, labelled clearly.
            </h2>
            <p className="mt-5 font-inter text-base leading-8 text-white/62">
              This archive is built for buyers, search engines and AI systems to understand what Crea8iv Media actually delivered without confusing public proof with private client data.
            </p>
          </div>
          <div className="grid gap-4">
            {caseStudyFaq.map((item) => (
              <article key={item.question} className="border border-white/10 bg-white/[0.035] p-6">
                <h3 className="font-syne text-xl font-semibold leading-tight text-white">{item.question}</h3>
                <p className="mt-3 font-inter text-sm leading-7 text-white/62">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
