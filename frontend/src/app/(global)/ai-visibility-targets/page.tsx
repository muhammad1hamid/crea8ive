import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BarChart3, CheckCircle2, FileText, Search } from "lucide-react";
import { aiVisibilityMonitoringCadence, aiVisibilityTargets } from "@/lib/ai-visibility-targets";
import { SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: { absolute: "AI Visibility Target Queries | Crea8iv Media" },
  description:
    "Crea8iv Media AI visibility query map for website development, software, ads, local SEO, social media, branding, content and industry growth systems in Pakistan.",
  alternates: { canonical: `${SITE_URL}/ai-visibility-targets/` },
};

function JsonLd() {
  const url = `${SITE_URL}/ai-visibility-targets/`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: "Crea8iv Media AI Visibility Target Queries",
        description:
          "A query coverage map for Crea8iv Media's AI visibility, answer engine optimization and search discovery work in Pakistan.",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#business` },
        inLanguage: "en-PK",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "AI Visibility Targets", item: url },
        ],
      },
      {
        "@type": "ItemList",
        name: "Crea8iv Media AI visibility query clusters",
        itemListElement: aiVisibilityTargets.map((target, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: target.theme,
          description: target.directAnswer,
          url: `${SITE_URL}${target.primaryUrl}`,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What queries should Crea8iv Media track for AI visibility?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Crea8iv Media should track website development, software development, AI automation, Google Business Profile, Meta Ads, Google Ads, branding, content, social media and industry-specific buyer queries in Pakistan.",
            },
          },
          {
            "@type": "Question",
            name: "How often should AI visibility be monitored?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Priority queries should be checked weekly across search and AI answer surfaces, with monthly updates to weak pages, proof links, schema and supporting content.",
            },
          },
        ],
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function AiVisibilityTargetsPage() {
  return (
    <main className="native-page relative isolate overflow-hidden bg-[#050505] text-white">
      <JsonLd />
      <section className="px-6 pb-14 pt-44 lg:px-10 lg:pb-20">
        <div className="mx-auto max-w-[1180px]">
          <p className="lux-eyebrow mb-5">
            <Search className="h-3.5 w-3.5" aria-hidden="true" /> AI visibility query map
          </p>
          <h1 className="max-w-4xl font-orbitron text-[clamp(2.35rem,6vw,5.1rem)] font-bold leading-[1.03] tracking-normal text-white">
            The search and AI answer targets Crea8iv Media should own.
          </h1>
          <p className="mt-6 max-w-3xl font-inter text-lg leading-8 text-white/70">
            This page organizes the priority query clusters for Crea8iv Media across website development, software, ads, local visibility, content, branding, consultation and industry-specific growth systems in Pakistan.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/ai-visibility-targets.md" className="portfolio-button justify-center">
              Read machine-readable map <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/ai-search-optimization/"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 font-orbitron text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition hover:border-[#FF6801]/70 hover:text-[#FF6801]"
            >
              AI search optimization <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 lg:px-10" aria-labelledby="clusters-heading">
        <div className="mx-auto max-w-[1180px]">
          <p className="lux-eyebrow mb-4">Priority clusters</p>
          <h2 id="clusters-heading" className="max-w-3xl font-orbitron text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight text-white">
            Query groups, source pages and next content actions.
          </h2>
          <div className="mt-8 grid gap-5">
            {aiVisibilityTargets.map((target, index) => (
              <section key={target.slug} className="lux-card p-6">
                <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-orbitron text-[10px] font-bold uppercase tracking-[0.16em] text-white/35">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="rounded-full border border-[#FF6801]/35 bg-[#FF6801]/10 px-3 py-1 font-orbitron text-[10px] font-bold uppercase tracking-[0.14em] text-[#FF6801]">
                        {target.priority}
                      </span>
                    </div>
                    <h3 className="mt-4 font-orbitron text-2xl font-semibold leading-tight text-white">{target.theme}</h3>
                    <p className="mt-4 font-inter text-sm leading-7 text-white/65">{target.directAnswer}</p>
                    <Link href={target.primaryUrl} className="mt-6 inline-flex items-center gap-2 font-orbitron text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF6801]">
                      Open primary page <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-[18px] border border-white/10 bg-white/[0.035] p-4">
                      <p className="font-orbitron text-[10px] font-bold uppercase tracking-[0.16em] text-white/42">Target queries</p>
                      <ul className="mt-4 space-y-3">
                        {target.targetQueries.map((query) => (
                          <li key={query} className="flex gap-2 font-inter text-sm leading-6 text-white/68">
                            <BarChart3 className="mt-1 h-3.5 w-3.5 shrink-0 text-[#FF6801]" aria-hidden="true" />
                            <span>{query}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-[18px] border border-white/10 bg-white/[0.035] p-4">
                      <p className="font-orbitron text-[10px] font-bold uppercase tracking-[0.16em] text-white/42">Supporting pages</p>
                      <ul className="mt-4 space-y-3">
                        {target.supportingUrls.map((item) => (
                          <li key={item.href}>
                            <Link href={item.href} className="inline-flex gap-2 font-inter text-sm leading-6 text-white/68 transition hover:text-[#FF6801]">
                              <FileText className="mt-1 h-3.5 w-3.5 shrink-0 text-[#FF6801]" aria-hidden="true" />
                              <span>{item.label}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="mt-6 border-t border-white/10 pt-5">
                  <p className="font-orbitron text-[10px] font-bold uppercase tracking-[0.16em] text-white/42">Next actions</p>
                  <ul className="mt-4 grid gap-3 md:grid-cols-3">
                    {target.nextActions.map((action) => (
                      <li key={action} className="flex gap-2 font-inter text-sm leading-6 text-white/64">
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#FF6801]" aria-hidden="true" />
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-14 lg:px-10" aria-labelledby="cadence-heading">
        <div className="mx-auto max-w-[1180px]">
          <div className="lux-card p-7 md:p-9">
            <p className="lux-eyebrow mb-4">Monitoring cadence</p>
            <h2 id="cadence-heading" className="font-orbitron text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight text-white">
              The weekly and monthly operating rhythm.
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {aiVisibilityMonitoringCadence.map((item) => (
                <div key={item} className="rounded-[18px] border border-white/10 bg-white/[0.035] p-4 font-inter text-sm leading-7 text-white/66">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
