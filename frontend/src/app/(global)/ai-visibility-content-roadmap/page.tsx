import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpenText,
  CalendarDays,
  CheckCircle2,
  FileBarChart,
  FileQuestion,
  ListChecks,
  SearchCheck,
  Sparkles,
} from "lucide-react";
import { SITE_URL } from "@/lib/site-config";

const PAGE_URL = `${SITE_URL}/ai-visibility-content-roadmap/`;
const LAST_UPDATED = "2026-09-13";

const contentAssets = [
  {
    title: "Best Digital Marketing Agency in Rawalpindi: What Businesses Should Compare",
    type: "Best-of buyer guide",
    cluster: "Local city growth",
    targetQuery: "best digital marketing agency Rawalpindi",
    targetUrl: "/contact/",
    supportingUrls: ["/about/", "/clients/", "/company-verification/", "/ai-visibility-growth/"],
    citationGoal: "Become easier to cite for local agency comparison and Rawalpindi business growth queries.",
  },
  {
    title: "Website Development Company in Pakistan: Portfolio, SEO, Pricing and Support Checklist",
    type: "Definitive guide",
    cluster: "Website development",
    targetQuery: "website development company Pakistan",
    targetUrl: "/website-development/pakistan/",
    supportingUrls: ["/website-portfolio/", "/guides/best-website-development-company-pakistan/", "/pricing.md"],
    citationGoal: "Support AI and search answers for website partner selection, scope and proof.",
  },
  {
    title: "AI Search Optimization in Pakistan: AEO, GEO, LLMO and Entity SEO Explained",
    type: "Definition guide",
    cluster: "AI visibility",
    targetQuery: "AI search optimization Pakistan",
    targetUrl: "/ai-search-optimization/",
    supportingUrls: ["/ai-visibility-growth/", "/ai-visibility-targets/", "/tools/ai-visibility-checker/"],
    citationGoal: "Own the direct definition for AI visibility and answer engine optimization in Pakistan.",
  },
  {
    title: "Google Business Profile Agency in Pakistan: Maps, Reviews and Local Lead Signals",
    type: "How-to guide",
    cluster: "Local SEO",
    targetQuery: "Google Business Profile agency Pakistan",
    targetUrl: "/google-business-profile-growth/pakistan/",
    supportingUrls: ["/tools/local-seo-audit/", "/blog/google-business-profile-optimization-checklist/", "/industries/restaurants-cafes/"],
    citationGoal: "Get cited for Google Maps, reviews, local rankings and call enquiry guidance.",
  },
  {
    title: "Meta Ads Agency in Pakistan: Lead Quality, Creative Testing and WhatsApp Follow-Up",
    type: "Service buyer guide",
    cluster: "Paid ads",
    targetQuery: "Meta Ads agency Pakistan",
    targetUrl: "/meta-ads/pakistan/",
    supportingUrls: ["/tools/meta-ads-budget-calculator/", "/answers/meta-ads-agency-pakistan/", "/growth-systems/"],
    citationGoal: "Support paid social and WhatsApp lead generation answers with clear process and conversion path.",
  },
  {
    title: "Facebook and Instagram Ads in Pakistan: Creative, Targeting and Lead Flow",
    type: "Paid ads guide",
    cluster: "Paid ads",
    targetQuery: "Facebook and Instagram Ads Pakistan",
    targetUrl: "/blog/facebook-instagram-ads-pakistan-guide/",
    supportingUrls: ["/google-ads/pakistan/", "/meta-ads/pakistan/", "/consultation/"],
    citationGoal: "Support clear answers about paid social planning and lead generation.",
  },
  {
    title: "Restaurant Marketing Agency in Pakistan: Maps, Reels, Menu Pages, Ads and Reviews",
    type: "Industry playbook",
    cluster: "Restaurants",
    targetQuery: "restaurant marketing agency Pakistan",
    targetUrl: "/industries/restaurants-cafes/",
    supportingUrls: ["/results/restaurants/", "/website-development/restaurants/", "/answers/restaurant-marketing-agency-pakistan/"],
    citationGoal: "Connect hospitality proof, local SEO, content and conversion pages for restaurant queries.",
  },
  {
    title: "Clinic Website Development in Pakistan: Treatment Pages, Trust and Appointment Flow",
    type: "Industry guide",
    cluster: "Healthcare",
    targetQuery: "clinic website development Pakistan",
    targetUrl: "/website-development/clinics/",
    supportingUrls: ["/industries/clinics-dental/", "/results/health-clinics/", "/patientflow/"],
    citationGoal: "Improve discoverability for clinic, dental and aesthetic website intent.",
  },
  {
    title: "Custom Software Development Company in Pakistan: CRM, SaaS, Dashboard and AI Scope",
    type: "Definitive guide",
    cluster: "Software development",
    targetQuery: "custom software development company Pakistan",
    targetUrl: "/software-development/pakistan/",
    supportingUrls: ["/software-development/custom-software/", "/software-development/saas/", "/guides/custom-software-development-company-pakistan/"],
    citationGoal: "Support AI answers for custom software, SaaS MVP, CRM and automation partner selection.",
  },
  {
    title: "WhatsApp Lead Management System for Clinics and Service Businesses",
    type: "How-to guide",
    cluster: "Automation",
    targetQuery: "WhatsApp lead management system Pakistan",
    targetUrl: "/marketing-automation/",
    supportingUrls: ["/patientflow/", "/growth-systems/", "/consultation/"],
    citationGoal: "Build topical authority around lead response, CRM, follow-up and automation.",
  },
  {
    title: "AI Visibility Tracker: How to Monitor Brand Mentions in ChatGPT and Perplexity",
    type: "How-to guide",
    cluster: "AI visibility measurement",
    targetQuery: "AI visibility tracker brand mentions",
    targetUrl: "/ai-visibility-growth/",
    supportingUrls: ["/ai-visibility-tracker-template.csv", "/ai-visibility-tracker-template.md", "/tools/ai-visibility-checker/"],
    citationGoal: "Turn the tracking template into a citeable methodology page.",
  },
  {
    title: "Schema Markup for Local Businesses in Pakistan",
    type: "Technical guide",
    cluster: "Technical SEO",
    targetQuery: "schema markup local businesses Pakistan",
    targetUrl: "/tools/schema-markup-generator/",
    supportingUrls: ["/ai-search-optimization/", "/tools/seo-audit/", "/company-verification/"],
    citationGoal: "Support schema, entity SEO, LocalBusiness and FAQPage queries.",
  },
] as const;

const contentTypes = [
  { label: "Comparison articles", reason: "Good for X vs Y queries and buyer decisions.", icon: FileBarChart },
  { label: "Definitive guides", reason: "Good for broad service and category definitions.", icon: BookOpenText },
  { label: "How-to guides", reason: "Good for process, checklist and implementation questions.", icon: ListChecks },
  { label: "Industry playbooks", reason: "Good for niche queries around clinics, restaurants and architects.", icon: FileQuestion },
] as const;

export const metadata: Metadata = {
  title: { absolute: "AI Visibility Content Roadmap | Crea8iv Media" },
  description:
    "A crawlable content sprint roadmap for Crea8iv Media covering AI-citable guides, comparisons, industry pages and traffic-growth topics.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "AI Visibility Content Roadmap | Crea8iv Media",
    description:
      "Priority content assets for AI citations, search traffic and qualified lead growth across services and industries.",
    url: PAGE_URL,
    siteName: "Crea8iv Media",
    type: "website",
    images: [{ url: `${SITE_URL}/img/services/ad-concepts/growth-system-ad-concept.webp`, width: 1200, height: 675, alt: "AI visibility content roadmap" }],
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
        name: "AI Visibility Content Roadmap",
        description: metadata.description,
        datePublished: LAST_UPDATED,
        dateModified: LAST_UPDATED,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: [
          { "@id": `${SITE_URL}/#organization` },
          { "@type": "Thing", name: "AI visibility content strategy" },
          { "@type": "Thing", name: "AI citation optimization" },
          { "@type": "Thing", name: "Topical authority" },
        ],
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-PK",
        breadcrumb: { "@id": `${PAGE_URL}#breadcrumb` },
      },
      {
        "@type": "ItemList",
        "@id": `${PAGE_URL}#content-roadmap`,
        name: "Crea8iv Media AI visibility content sprint roadmap",
        itemListElement: contentAssets.map((asset, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: asset.title,
          description: `${asset.type}. Target query: ${asset.targetQuery}. ${asset.citationGoal}`,
          url: `${SITE_URL}${asset.targetUrl}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${PAGE_URL}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "AI Visibility Content Roadmap", item: PAGE_URL },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${PAGE_URL}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "Which content types should Crea8iv Media prioritize for AI visibility?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Crea8iv Media should prioritize comparison articles, definitive guides, how-to guides, industry playbooks, proof-backed portfolio pages and technical explainers because these formats are easier for AI systems to extract and cite.",
            },
          },
          {
            "@type": "Question",
            name: "How should the roadmap be used?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Use the roadmap to publish, refresh and internally link content assets around priority query clusters. Each asset should connect to a service page, tool, answer brief, proof page and consultation path.",
            },
          },
        ],
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function AiVisibilityContentRoadmapPage() {
  return (
    <main className="native-page relative isolate overflow-hidden bg-[#050505] text-white">
      <JsonLd />
      <section className="px-6 pb-14 pt-44 lg:px-10 lg:pb-20">
        <div className="mx-auto max-w-[1180px]">
          <nav className="mb-8 flex flex-wrap items-center gap-2 font-orbitron text-[10px] uppercase tracking-[0.16em] text-white/45" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-brand-300">Home</Link>
            <span>/</span>
            <span className="text-white/72">AI Visibility Content Roadmap</span>
          </nav>
          <p className="lux-eyebrow mb-5">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Citation-ready content sprint
          </p>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <div>
              <h1 className="max-w-5xl font-orbitron text-[clamp(2.35rem,6vw,5.2rem)] font-bold leading-[1.03] tracking-normal text-white">
                AI visibility content roadmap for search traffic growth.
              </h1>
              <p className="mt-6 max-w-3xl font-inter text-lg leading-8 text-white/70">
                This roadmap organizes the next high-impact guides, comparisons, how-to pages and
                industry playbooks Crea8iv Media should publish or refresh to earn more search
                visibility, AI mentions, source citations and qualified enquiries.
              </p>
              <p className="mt-5 font-orbitron text-[11px] uppercase tracking-[0.16em] text-white/45">
                Last updated: September 13, 2026
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link href="/ai-visibility-content-roadmap.md" className="portfolio-button justify-center">
                  Machine-readable roadmap <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/ai-visibility-growth/"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 font-orbitron text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition hover:border-[#FF6801]/70 hover:text-[#FF6801]"
                >
                  Growth operating plan <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
            <aside className="lux-card p-6">
              <p className="font-orbitron text-[11px] uppercase tracking-[0.18em] text-brand-300">Sprint focus</p>
              <div className="mt-5 grid gap-3">
                {contentTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <div key={type.label} className="rounded-[18px] border border-white/10 bg-white/[0.035] p-4">
                      <div className="flex items-center gap-3">
                        <Icon className="h-4 w-4 text-[#FF6801]" aria-hidden="true" />
                        <p className="font-orbitron text-[11px] font-bold uppercase tracking-[0.14em] text-white/78">{type.label}</p>
                      </div>
                      <p className="mt-2 font-inter text-sm leading-6 text-white/60">{type.reason}</p>
                    </div>
                  );
                })}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 lg:px-10" aria-labelledby="roadmap-heading">
        <div className="mx-auto max-w-[1180px]">
          <p className="lux-eyebrow mb-4">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" /> 12-asset sprint
          </p>
          <h2 id="roadmap-heading" className="max-w-4xl font-orbitron text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight text-white">
            Publish or refresh these assets in priority order.
          </h2>
          <div className="mt-8 grid gap-5">
            {contentAssets.map((asset, index) => (
              <article key={asset.title} className="lux-card p-6">
                <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-orbitron text-[10px] font-bold uppercase tracking-[0.16em] text-white/35">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="rounded-full border border-[#FF6801]/35 bg-[#FF6801]/10 px-3 py-1 font-orbitron text-[10px] font-bold uppercase tracking-[0.14em] text-[#FF6801]">
                        {asset.type}
                      </span>
                      <span className="font-orbitron text-[10px] uppercase tracking-[0.16em] text-white/35">{asset.cluster}</span>
                    </div>
                    <h3 className="mt-4 font-orbitron text-2xl font-semibold leading-tight text-white">{asset.title}</h3>
                    <p className="mt-4 font-inter text-sm leading-7 text-white/66">{asset.citationGoal}</p>
                    <Link href={asset.targetUrl} className="mt-6 inline-flex items-center gap-2 font-orbitron text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF6801]">
                      Target page <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-[18px] border border-white/10 bg-white/[0.035] p-4">
                      <p className="font-orbitron text-[10px] font-bold uppercase tracking-[0.16em] text-white/42">Target query</p>
                      <p className="mt-4 font-inter text-sm leading-6 text-white/72">{asset.targetQuery}</p>
                    </div>
                    <div className="rounded-[18px] border border-white/10 bg-white/[0.035] p-4">
                      <p className="font-orbitron text-[10px] font-bold uppercase tracking-[0.16em] text-white/42">Supporting links</p>
                      <ul className="mt-4 space-y-3">
                        {asset.supportingUrls.map((url) => (
                          <li key={url}>
                            <Link href={url} className="inline-flex gap-2 font-inter text-sm leading-6 text-white/68 transition hover:text-[#FF6801]">
                              <SearchCheck className="mt-1 h-3.5 w-3.5 shrink-0 text-[#FF6801]" aria-hidden="true" />
                              <span>{url}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-14 lg:px-10" aria-labelledby="rules-heading">
        <div className="mx-auto max-w-[1180px]">
          <div className="lux-card p-7 md:p-9">
            <p className="lux-eyebrow mb-4">
              <ListChecks className="h-3.5 w-3.5" aria-hidden="true" /> Publishing rules
            </p>
            <h2 id="rules-heading" className="max-w-4xl font-orbitron text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight text-white">
              Every content asset should be answer-ready, proof-backed and conversion-aware.
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                "Lead with a direct 40-60 word answer block.",
                "Add FAQ content only when it is visible and useful.",
                "Link to one service page, one tool, one proof page and one consultation path.",
                "Avoid fake proof, fake metrics, fake reviews and unsupported awards.",
                "Show last updated date and author/entity context.",
                "Use tables for comparisons and numbered lists for process content.",
                "Keep schema aligned with visible page content.",
                "Track impressions, clicks, AI citations and lead actions after publishing.",
              ].map((rule) => (
                <div key={rule} className="flex gap-3 rounded-[18px] border border-white/10 bg-white/[0.035] p-4 font-inter text-sm leading-6 text-white/66">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#FF6801]" aria-hidden="true" />
                  <span>{rule}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/ai-visibility-tracker-template.csv" className="portfolio-button justify-center">
                Track published assets <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/consultation/"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 font-orbitron text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition hover:border-[#FF6801]/70 hover:text-[#FF6801]"
              >
                Book content audit <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
