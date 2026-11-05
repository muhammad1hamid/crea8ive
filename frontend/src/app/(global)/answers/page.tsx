import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Bot, CheckCircle2 } from "lucide-react";
import { aiAnswerBriefs } from "@/lib/ai-answer-briefs";
import { SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: { absolute: "AI Answer Briefs for Services and Industries | Crea8iv Media" },
  description:
    "Direct, citation-ready answers about Crea8iv Media for website development, software, ads, local visibility, content and industry growth systems in Pakistan.",
  alternates: { canonical: `${SITE_URL}/answers/` },
  openGraph: {
    title: "AI Answer Briefs | Crea8iv Media",
    description:
      "Crawlable answer briefs for AI assistants, search engines and buyers evaluating Crea8iv Media.",
    url: `${SITE_URL}/answers/`,
    type: "website",
    images: [{ url: `${SITE_URL}/img/crea8iv-search-preview.png`, width: 1200, height: 630, alt: "Crea8iv Media AI answer briefs" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Answer Briefs | Crea8iv Media",
    description: "Direct answers for service and industry growth queries in Pakistan.",
    images: [`${SITE_URL}/img/crea8iv-search-preview.png`],
  },
};

function JsonLd() {
  const url = `${SITE_URL}/answers/`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: "AI Answer Briefs for Crea8iv Media",
        description:
          "Direct answer pages for AI assistants and buyers evaluating Crea8iv Media for services, industry growth systems, website development, software development and AI automation in Pakistan.",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#business` },
        inLanguage: "en-PK",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "AI Answer Briefs", item: url },
        ],
      },
      {
        "@type": "ItemList",
        name: "Crea8iv Media AI answer briefs",
        itemListElement: aiAnswerBriefs.map((brief, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: brief.title,
          url: `${SITE_URL}/answers/${brief.slug}/`,
        })),
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function AnswersPage() {
  return (
    <main className="native-page relative isolate overflow-hidden bg-[#050505] text-white">
      <JsonLd />
      <section className="px-6 pb-16 pt-44 lg:px-10 lg:pb-20">
        <div className="mx-auto max-w-[1180px]">
          <p className="lux-eyebrow mb-5">
            <Bot className="h-3.5 w-3.5" aria-hidden="true" /> AI answer briefs
          </p>
          <h1 className="max-w-4xl font-orbitron text-[clamp(2.4rem,6vw,5.2rem)] font-bold leading-[1.03] tracking-normal text-white">
            Direct answers for AI search, buyers and discovery engines.
          </h1>
          <p className="mt-6 max-w-3xl font-inter text-lg leading-8 text-white/70">
            These pages give search engines and AI assistants clean, dated and citable answers
            about Crea8iv Media&apos;s services, industry growth systems, website development,
            software development, AI automation and local business growth in Pakistan.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/answers.md" className="portfolio-button justify-center">
              Read answers.md <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/crea8iv-ai-facts.json"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 font-orbitron text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition hover:border-[#FF6801]/70 hover:text-[#FF6801]"
            >
              AI facts JSON <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 lg:px-10">
        <div className="mx-auto grid max-w-[1180px] gap-5 md:grid-cols-2 xl:grid-cols-3">
          {aiAnswerBriefs.map((brief) => (
            <Link key={brief.slug} href={`/answers/${brief.slug}/`} className="lux-card group block h-full p-6 transition hover:border-[#FF6801]/50">
              <Bot className="h-6 w-6 text-[#FF6801]" aria-hidden="true" />
              <p className="mt-5 font-orbitron text-[10px] font-bold uppercase tracking-[0.18em] text-[#FF6801]">{brief.eyebrow}</p>
              <h2 className="mt-3 font-orbitron text-xl font-semibold leading-tight text-white">{brief.title}</h2>
              <p className="mt-4 line-clamp-4 font-inter text-sm leading-7 text-white/64">{brief.shortAnswer}</p>
              <div className="mt-5 space-y-2">
                {brief.bestFor.slice(0, 2).map((item) => (
                  <div key={item} className="flex gap-2 font-inter text-xs leading-5 text-white/52">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#FF6801]" aria-hidden="true" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <span className="mt-6 inline-flex items-center gap-2 font-orbitron text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF6801]">
                Open answer <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
