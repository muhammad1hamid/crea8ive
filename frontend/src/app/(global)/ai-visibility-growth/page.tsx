import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  FileSearch,
  Globe2,
  Link2,
  RefreshCcw,
  Sparkles,
} from "lucide-react";
import { aiVisibilityTargets } from "@/lib/ai-visibility-targets";
import { BUSINESS_DETAILS, SITE_URL } from "@/lib/site-config";

const PAGE_URL = `${SITE_URL}/ai-visibility-growth/`;
const LAST_UPDATED = "2026-09-13";

const priorityQueries = [
  "best digital marketing agency Rawalpindi",
  "website development company Pakistan",
  "AI search optimization Pakistan",
  "Google Business Profile agency Pakistan",
  "Meta Ads agency Pakistan",
  "restaurant marketing agency Pakistan",
  "clinic website development Pakistan",
  "custom software development company Pakistan",
] as const;

const operatingCadence = [
  {
    title: "Weekly AI citation check",
    body: "Run the priority query set in Google Search, visible AI results, ChatGPT with search, Perplexity and Gemini. Log whether Crea8iv Media is cited, mentioned, absent or described incorrectly.",
    icon: FileSearch,
  },
  {
    title: "Monthly page refresh",
    body: "Update pages with weak clicks or weak AI visibility by improving direct answer blocks, proof links, FAQ depth, schema alignment and internal links.",
    icon: RefreshCcw,
  },
  {
    title: "Authority distribution",
    body: "Create off-site signals through Google Business Profile posts, founder LinkedIn content, YouTube transcripts, partner mentions, directory consistency and useful community answers.",
    icon: Link2,
  },
  {
    title: "Traffic to lead capture",
    body: "Measure WhatsApp clicks, call clicks, form starts, consultation visits and tool usage so AI and organic visibility turns into qualified enquiries.",
    icon: BarChart3,
  },
] as const;

const ninetyDayPlan = [
  {
    phase: "Weeks 1-2",
    title: "Measurement and entity cleanup",
    actions: [
      "Create a weekly query tracking sheet for AI mentions, citations, competitors and source URLs.",
      "Confirm entity consistency across website, Google Business Profile, social profiles, founder page and machine-readable files.",
      "Add missing SameAs, proof and source-of-truth links only where they are real and public.",
    ],
  },
  {
    phase: "Weeks 3-4",
    title: "Top service page upgrades",
    actions: [
      "Refresh the top eight service pages with direct answer blocks for fit, scope, pricing, timeline, proof and next step.",
      "Connect every priority service page to one tool, one answer brief, one proof page and one consultation path.",
      "Check that FAQ schema matches visible FAQs and avoids unsupported claims.",
    ],
  },
  {
    phase: "Month 2",
    title: "Authority content sprint",
    actions: [
      "Publish high-intent guides around AI visibility, local SEO, website development, clinics, restaurants, ads and automation.",
      "Create comparison pages where buyers naturally ask X vs Y questions.",
      "Add one portfolio or proof update for each priority industry cluster when real evidence is available.",
    ],
  },
  {
    phase: "Month 3",
    title: "Distribution and citation building",
    actions: [
      "Repurpose guides into founder LinkedIn posts, Google Business Profile posts, YouTube scripts and short answer assets.",
      "Build consistent third-party mentions without fake awards, fake metrics or unsupported claims.",
      "Review Search Console and AI mention logs to decide the next content cluster.",
    ],
  },
] as const;

const conversionSignals = [
  "WhatsApp click from AI, service and tool pages",
  "Consultation page visits from blog, guide and answer pages",
  "Form submits by service category",
  "Tool completions and related CTA clicks",
  "Search Console impressions and clicks by query cluster",
  "AI referral and assistant traffic where analytics exposes it",
] as const;

const trackerFields = [
  "Query and cluster",
  "Platform checked",
  "Crea8iv mention/citation status",
  "Cited source URL",
  "Competitors cited",
  "Description accuracy",
  "Search Console metrics",
  "Lead actions",
  "Next action and owner",
] as const;

export const metadata: Metadata = {
  title: { absolute: "AI Visibility Growth Plan for Crea8iv Media" },
  description:
    "Crea8iv Media's AI visibility growth operating plan for tracking AI citations, improving traffic, strengthening authority and converting organic demand into leads.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "AI Visibility Growth Plan for Crea8iv Media",
    description:
      "A crawlable operating plan for AI citation monitoring, query clusters, authority signals and traffic-to-lead measurement.",
    url: PAGE_URL,
    siteName: "Crea8iv Media",
    type: "website",
    images: [{ url: `${SITE_URL}/img/services/ad-concepts/ai-automation-ad-concept.webp`, width: 1200, height: 675, alt: "AI visibility growth system" }],
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
        name: "AI Visibility Growth Plan for Crea8iv Media",
        description: metadata.description,
        datePublished: LAST_UPDATED,
        dateModified: LAST_UPDATED,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: [
          { "@id": `${SITE_URL}/#organization` },
          { "@type": "Thing", name: "AI visibility" },
          { "@type": "Thing", name: "Answer engine optimization" },
          { "@type": "Thing", name: "Generative engine optimization" },
          { "@type": "Thing", name: "AI citation monitoring" },
        ],
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-PK",
        breadcrumb: { "@id": `${PAGE_URL}#breadcrumb` },
      },
      {
        "@type": "HowTo",
        "@id": `${PAGE_URL}#howto`,
        name: "How Crea8iv Media should grow AI visibility and traffic",
        description:
          "A 90-day operating workflow for AI citation tracking, content refresh, authority building and conversion measurement.",
        totalTime: "P90D",
        step: ninetyDayPlan.map((phase, index) => ({
          "@type": "HowToStep",
          position: index + 1,
          name: `${phase.phase}: ${phase.title}`,
          text: phase.actions.join(" "),
        })),
      },
      {
        "@type": "ItemList",
        "@id": `${PAGE_URL}#queries`,
        name: "Priority AI visibility and SEO queries",
        itemListElement: priorityQueries.map((query, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: query,
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${PAGE_URL}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "AI Visibility Growth", item: PAGE_URL },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${PAGE_URL}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "How can Crea8iv Media improve AI visibility?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Crea8iv Media can improve AI visibility by tracking priority queries, publishing extractable answer blocks, keeping schema aligned with visible content, strengthening real proof pages and building consistent third-party entity signals.",
            },
          },
          {
            "@type": "Question",
            name: "Which traffic signals should be monitored?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The most useful signals are AI mentions, source citations, Search Console impressions and clicks, WhatsApp clicks, call clicks, form submissions, tool completions and consultation page visits.",
            },
          },
        ],
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function AiVisibilityGrowthPage() {
  return (
    <main className="native-page relative isolate overflow-hidden bg-[#050505] text-white">
      <JsonLd />
      <section className="px-6 pb-14 pt-44 lg:px-10 lg:pb-20">
        <div className="mx-auto max-w-[1180px]">
          <nav className="mb-8 flex flex-wrap items-center gap-2 font-orbitron text-[10px] uppercase tracking-[0.16em] text-white/45" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-brand-300">Home</Link>
            <span>/</span>
            <span className="text-white/72">AI Visibility Growth</span>
          </nav>
          <p className="lux-eyebrow mb-5">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> AI visibility and traffic gain
          </p>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <div>
              <h1 className="max-w-5xl font-orbitron text-[clamp(2.35rem,6vw,5.25rem)] font-bold leading-[1.03] tracking-normal text-white">
                AI visibility growth plan for Crea8iv Media.
              </h1>
              <p className="mt-6 max-w-3xl font-inter text-lg leading-8 text-white/70">
                This page turns AI SEO into an operating system: priority query tracking, answer-ready
                content, schema-safe pages, real proof, third-party authority and traffic-to-lead
                measurement for {BUSINESS_DETAILS.brandName}.
              </p>
              <p className="mt-5 font-orbitron text-[11px] uppercase tracking-[0.16em] text-white/45">
                Last updated: September 13, 2026
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link href="/ai-visibility-growth-plan.md" className="portfolio-button justify-center">
                  Machine-readable plan <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/ai-visibility-content-roadmap/"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#FF6801]/45 bg-[#1a0b02]/60 px-6 py-3 font-orbitron text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition hover:border-[#FF6801] hover:text-[#FF6801]"
                >
                  Content roadmap <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/ai-citation-sources/"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#FF6801]/45 bg-[#1a0b02]/60 px-6 py-3 font-orbitron text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition hover:border-[#FF6801] hover:text-[#FF6801]"
                >
                  Citation sources <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/ai-visibility-tracker-template.csv"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 font-orbitron text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition hover:border-[#FF6801]/70 hover:text-[#FF6801]"
                >
                  Download tracker CSV <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/tools/ai-visibility-checker/"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 font-orbitron text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition hover:border-[#FF6801]/70 hover:text-[#FF6801]"
                >
                  Run AI visibility checker <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
            <aside className="lux-card p-6">
              <p className="font-orbitron text-[11px] uppercase tracking-[0.18em] text-brand-300">Priority query set</p>
              <ul className="mt-5 space-y-3">
                {priorityQueries.map((query) => (
                  <li key={query} className="flex gap-3 font-inter text-sm leading-6 text-white/72">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF6801]" />
                    <span>{query}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 lg:px-10" aria-labelledby="cadence-heading">
        <div className="mx-auto max-w-[1180px]">
          <p className="lux-eyebrow mb-4">Operating cadence</p>
          <h2 id="cadence-heading" className="max-w-4xl font-orbitron text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight text-white">
            What should be checked, improved and measured every week.
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {operatingCadence.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="lux-card p-5">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#FF6801]/30 bg-[#FF6801]/10 text-[#FF6801]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-orbitron text-lg font-semibold leading-tight text-white">{item.title}</h3>
                  <p className="mt-3 font-inter text-sm leading-6 text-white/64">{item.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-12 lg:px-10" aria-labelledby="template-heading">
        <div className="mx-auto max-w-[1180px]">
          <div className="lux-card p-7 md:p-9">
            <p className="lux-eyebrow mb-4">
              <FileSearch className="h-3.5 w-3.5" aria-hidden="true" /> Tracking template
            </p>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
              <div>
                <h2 id="template-heading" className="font-orbitron text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight text-white">
                  Use one format to monitor AI citations, competitors and lead actions.
                </h2>
                <p className="mt-4 font-inter text-base leading-7 text-white/68">
                  The tracker template turns weekly AI visibility checks into a repeatable process.
                  It records whether Crea8iv Media is mentioned, cited, described correctly, losing
                  to competitors, or missing conversion opportunities.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Link href="/ai-visibility-tracker-template.csv" className="portfolio-button justify-center">
                    Open CSV template <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link
                    href="/ai-visibility-tracker-template.md"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 font-orbitron text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition hover:border-[#FF6801]/70 hover:text-[#FF6801]"
                  >
                    Read tracker guide <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {trackerFields.map((field) => (
                  <div key={field} className="rounded-[18px] border border-white/10 bg-white/[0.035] p-4 font-inter text-sm leading-6 text-white/66">
                    {field}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 lg:px-10" aria-labelledby="ninety-day-heading">
        <div className="mx-auto max-w-[1180px]">
          <p className="lux-eyebrow mb-4">90-day action plan</p>
          <h2 id="ninety-day-heading" className="max-w-4xl font-orbitron text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight text-white">
            A focused rollout for more AI mentions, organic traffic and qualified leads.
          </h2>
          <div className="mt-8 grid gap-5">
            {ninetyDayPlan.map((phase, index) => (
              <article key={phase.phase} className="lux-card p-6">
                <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
                  <div>
                    <p className="font-orbitron text-[10px] font-bold uppercase tracking-[0.16em] text-white/35">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-3 font-orbitron text-[12px] font-bold uppercase tracking-[0.16em] text-[#FF6801]">{phase.phase}</p>
                    <h3 className="mt-3 font-orbitron text-2xl font-semibold leading-tight text-white">{phase.title}</h3>
                  </div>
                  <ul className="grid gap-3 md:grid-cols-3">
                    {phase.actions.map((action) => (
                      <li key={action} className="flex gap-3 rounded-[18px] border border-white/10 bg-white/[0.035] p-4 font-inter text-sm leading-6 text-white/66">
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#FF6801]" aria-hidden="true" />
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-12 lg:px-10" aria-labelledby="clusters-heading">
        <div className="mx-auto max-w-[1180px]">
          <p className="lux-eyebrow mb-4">Traffic clusters</p>
          <h2 id="clusters-heading" className="max-w-4xl font-orbitron text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight text-white">
            Connect every query cluster to a service page, proof page, tool and next step.
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {aiVisibilityTargets.slice(0, 8).map((target) => (
              <article key={target.slug} className="lux-card p-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-[#FF6801]/35 bg-[#FF6801]/10 px-3 py-1 font-orbitron text-[10px] font-bold uppercase tracking-[0.14em] text-[#FF6801]">
                    {target.priority}
                  </span>
                  <span className="font-orbitron text-[10px] uppercase tracking-[0.16em] text-white/35">{target.theme}</span>
                </div>
                <p className="mt-4 font-inter text-sm leading-7 text-white/66">{target.directAnswer}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link href={target.primaryUrl} className="inline-flex items-center gap-2 font-orbitron text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF6801]">
                    Primary page <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                  <Link href="/ai-visibility-targets/" className="inline-flex items-center gap-2 font-orbitron text-[10px] font-bold uppercase tracking-[0.16em] text-white/50 hover:text-[#FF6801]">
                    Full target map <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-14 lg:px-10" aria-labelledby="measurement-heading">
        <div className="mx-auto max-w-[1180px]">
          <div className="lux-card p-7 md:p-9">
            <p className="lux-eyebrow mb-4">
              <Globe2 className="h-3.5 w-3.5" aria-hidden="true" /> Lead measurement
            </p>
            <h2 id="measurement-heading" className="max-w-3xl font-orbitron text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight text-white">
              AI visibility should be judged by useful traffic and qualified enquiries.
            </h2>
            <p className="mt-5 max-w-3xl font-inter text-base leading-7 text-white/70">
              See how search architecture, traveller answers and enquiry preparation connect in our{" "}
              <Link href="/case-studies/stw-movers-barcelona/" className="inline-flex min-h-11 items-center text-[var(--icon-color)] underline underline-offset-4">STW Movers Barcelona case study</Link>.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {conversionSignals.map((signal) => (
                <div key={signal} className="rounded-[18px] border border-white/10 bg-white/[0.035] p-4 font-inter text-sm leading-7 text-white/66">
                  {signal}
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/consultation/" className="portfolio-button justify-center">
                Book AI visibility audit <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/tools/"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 font-orbitron text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition hover:border-[#FF6801]/70 hover:text-[#FF6801]"
              >
                View free tools <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
