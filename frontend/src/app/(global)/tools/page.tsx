import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ToolsHubClient from "@/app/(global)/tools/ToolsHubClient";
import { SITE_URL } from "@/lib/site-config";
import { tools } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free Growth Tools for SEO, Ads & ROI",
  description: "Use free Crea8iv Media tools for SEO audits, AI visibility, local SEO, Meta Ads, Google Ads, website ROI, conversion checks, and schema markup.",
  keywords: [
    "free SEO tools Pakistan",
    "AI visibility checker",
    "marketing ROI calculator",
    "Meta Ads budget calculator",
    "Google Ads budget calculator",
    "website ROI calculator",
    "schema markup generator",
  ],
  alternates: { canonical: `${SITE_URL}/tools/` },
  openGraph: {
    title: "Free Growth Tools | Crea8iv Media",
    description: "Practical free tools for SEO, AI visibility, advertising, local search, conversion, ROI, and business growth.",
    url: `${SITE_URL}/tools/`,
    siteName: "Crea8iv Media",
  },
};

export default function ToolsHubPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/tools/#webpage`,
        name: "Free Growth Tools",
        description: metadata.description,
        url: `${SITE_URL}/tools/`,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: tools.map((tool, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "WebPage",
              name: tool.name,
              url: `${SITE_URL}/tools/${tool.slug}/`,
              description: tool.benefit,
            },
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/tools/#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Free Growth Tools", item: `${SITE_URL}/tools/` },
        ],
      },
    ],
  };

  return (
    <div className="native-page overflow-hidden bg-[#050505] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="relative px-6 pb-16 pt-36 lg:px-10 lg:pb-24 lg:pt-44">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_22%,rgba(var(--decorative-rgb),.04),transparent_34%),linear-gradient(180deg,rgba(255,255,255,.035),transparent_42%)]" />
        <div className="relative mx-auto max-w-[1440px]">
          <nav className="mb-8 flex flex-wrap items-center gap-2 font-orbitron text-[10px] uppercase tracking-[0.16em] text-white/45" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#FF6801]">Home</Link>
            <span>/</span>
            <span className="text-white/72">Free Growth Tools</span>
          </nav>
          <p className="portfolio-kicker">Free Growth Tools</p>
          <h1 className="mt-6 max-w-5xl font-syne text-[clamp(2.45rem,5.7vw,5.6rem)] font-bold leading-[0.97] text-white">
            Audit. Measure. Improve. Grow.
          </h1>
          <p className="mt-7 max-w-[820px] text-lg leading-8 text-white/72">
            Practical tools for SEO, AI visibility, advertising, local search, conversion and business growth.
            Get the primary result first, then request a detailed review only if it helps.
          </p>
          <Link href="#tools-directory" className="portfolio-button mt-8">
            Browse Tools <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
      <div id="tools-directory">
        <ToolsHubClient />
      </div>
      <section className="px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="portfolio-kicker">Why This Hub Exists</p>
            <h2 className="mt-5 font-syne text-4xl font-bold leading-tight text-white sm:text-5xl">Useful tools build better buying decisions.</h2>
          </div>
          <div className="grid gap-4 text-sm leading-7 text-white/68 md:grid-cols-2">
            <p>These tools help business owners understand the numbers and visibility signals before spending more on ads, SEO, websites, or automation.</p>
            <p>Audit-style tools are honest about their limits: this static-friendly site does not query private GBP data, AI platforms, or full crawlers.</p>
          </div>
        </div>
      </section>
      <section className="border-t border-white/[0.08] bg-[#080706] px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-3">
          <HubGuide
            title="Use tools as SEO entry points"
            copy="Each calculator and audit page targets a clear buyer problem: visibility, budget, conversion, local discovery, or schema. Link them from blog posts and service pages so users can act immediately after reading."
          />
          <HubGuide
            title="Measure assisted conversions"
            copy="Track tool results, downloads, shares, service clicks, and WhatsApp requests in GA4. The strongest tool is the one that creates qualified conversations, not just pageviews."
          />
          <HubGuide
            title="Build linkable assets"
            copy="Turn popular tool outputs into checklists, examples, templates, and short reports. These assets can earn backlinks from business blogs, startup communities, agencies, and local directories."
          />
        </div>
      </section>
    </div>
  );
}

function HubGuide({ title, copy }: { title: string; copy: string }) {
  return (
    <article className="rounded-[24px] border border-white/10 bg-black/30 p-6">
      <h2 className="font-orbitron text-xl font-semibold text-white">{title}</h2>
      <p className="mt-4 text-sm leading-7 text-white/66">{copy}</p>
    </article>
  );
}
