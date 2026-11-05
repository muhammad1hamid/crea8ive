import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  MapPin,
  MessageCircle,
  MonitorSmartphone,
  Sparkles,
} from "lucide-react";
import { BUSINESS_DETAILS, SITE_URL } from "@/lib/site-config";
import {
  getSeoLandingPagesByFamily,
  getSeoLandingParent,
  seoLandingPages,
  type SeoLandingPage as SeoLandingPageData,
} from "@/lib/seo-landing-pages";
import { websitePortfolioItems } from "@/lib/website-portfolio";
import detailStyles from "./service-body.module.css";

const SEO_LANDING_LAST_UPDATED_ISO = "2026-09-07";
const SEO_LANDING_LAST_UPDATED_LABEL = "September 7, 2026";

const SEO_LANDING_VISUALS: Record<SeoLandingPageData["family"], { image: string; alt: string; label: string }> = {
  "website-development": {
    image: "/img/services/ad-concepts/website-development-ad-concept.webp",
    alt: "Minimal website development transformation visual by Crea8iv Media",
    label: "Conversion site",
  },
  "software-development": {
    image: "/img/services/ad-concepts/software-development-ad-concept.webp",
    alt: "Minimal custom software development system visual by Crea8iv Media",
    label: "Software system",
  },
  "google-business-profile-growth": {
    image: "/img/services/ad-concepts/google-business-profile-ad-concept.webp",
    alt: "Minimal local SEO and Google Business Profile map visibility visual by Crea8iv Media",
    label: "Local visibility",
  },
  "social-media-management": {
    image: "/img/services/ad-concepts/social-media-management-ad-concept.webp",
    alt: "Minimal social media management content engine visual by Crea8iv Media",
    label: "Content engine",
  },
  "meta-ads": {
    image: "/img/services/ad-concepts/meta-advertising-ad-concept.webp",
    alt: "Minimal Meta Ads lead flow visual by Crea8iv Media",
    label: "Lead flow",
  },
  "google-ads": {
    image: "/img/services/ad-concepts/google-ads-ad-concept.webp",
    alt: "Minimal Google Ads search intent visual by Crea8iv Media",
    label: "Search intent",
  },
  "branding-and-creative": {
    image: "/img/services/ad-concepts/brand-identity-ad-concept.webp",
    alt: "Minimal brand identity system visual by Crea8iv Media",
    label: "Identity system",
  },
  "content-creation": {
    image: "/img/services/ad-concepts/content-reels-ad-concept.webp",
    alt: "Minimal content creation and reels visual by Crea8iv Media",
    label: "Shoot to assets",
  },
  consultation: {
    image: "/img/services/ad-concepts/growth-system-ad-concept.webp",
    alt: "Minimal digital growth consultation system visual by Crea8iv Media",
    label: "Growth audit",
  },
};

function fullUrl(path: string) {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

function pageUrl(page: SeoLandingPageData) {
  return `${SITE_URL}/${page.family}/${page.slug}/`;
}

function clusterLabel(page: SeoLandingPageData) {
  if (page.family === "website-development") return "Website development";
  if (page.family === "software-development") return "Software development";
  return page.serviceName.replace(/\s+in Pakistan$/i, "");
}

function JsonLd({ page }: { page: SeoLandingPageData }) {
  const url = pageUrl(page);
  const parent = getSeoLandingParent(page);
  const label = clusterLabel(page);
  const proofItems = page.proofSlugs
    .map((slug) => websitePortfolioItems.find((item) => item.slug === slug))
    .filter((item): item is (typeof websitePortfolioItems)[number] => Boolean(item));

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: page.metaTitle,
        description: page.metaDescription,
        inLanguage: "en-PK",
        dateModified: SEO_LANDING_LAST_UPDATED_ISO,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#business` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: `${page.serviceName} - Crea8iv Media`,
        serviceType: page.serviceName,
        description: page.quickAnswer,
        provider: { "@id": `${SITE_URL}/#business` },
        areaServed: [
          { "@type": "Country", name: "Pakistan" },
          { "@type": "City", name: "Rawalpindi" },
          { "@type": "City", name: "Islamabad" },
        ],
        audience: { "@type": "Audience", audienceType: page.audience },
        offers: {
          "@type": "Offer",
          priceCurrency: "PKR",
          price: page.priceFrom,
          availability: "https://schema.org/InStock",
          url,
        },
        workExample: proofItems.map((item) => ({
          "@type": "CreativeWork",
          name: `${item.brand} - ${item.title}`,
          description: item.summary,
          url: fullUrl(item.href),
          image: fullUrl(item.image),
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: parent.label, item: fullUrl(parent.href) },
          { "@type": "ListItem", position: 3, name: page.title, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: page.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
      {
        "@type": "ItemList",
        name: `${label} pages by Crea8iv Media`,
        itemListElement: getSeoLandingPagesByFamily(page.family).map((relatedPage, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: relatedPage.title,
          url: pageUrl(relatedPage),
        })),
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function SeoLandingPage({ page }: { page: SeoLandingPageData }) {
  const parent = getSeoLandingParent(page);
  const siblings = getSeoLandingPagesByFamily(page.family).filter((item) => item.slug !== page.slug);
  const relatedPages = siblings.length
    ? siblings
    : seoLandingPages
        .filter((item) => item.slug === "pakistan" && item.family !== page.family)
        .slice(0, 6);
  const proofItems = page.proofSlugs
    .map((slug) => websitePortfolioItems.find((item) => item.slug === slug))
    .filter((item): item is (typeof websitePortfolioItems)[number] => Boolean(item));
  const label = clusterLabel(page);
  const visual = SEO_LANDING_VISUALS[page.family];

  return (
    <div className={`${detailStyles.landing} native-page relative isolate overflow-hidden bg-[#050505] text-white`}>
      <JsonLd page={page} />

      <section className="px-6 pb-16 pt-44 lg:px-10 lg:pb-20">
        <div className="mx-auto max-w-[1180px]">
          <nav className="mb-8 flex flex-wrap items-center gap-2 font-inter text-sm text-white/55" aria-label="Breadcrumb">
            <Link href="/" className="transition hover:text-[#FF6801]">Home</Link>
            <span>/</span>
            <Link href={parent.href} className="transition hover:text-[#FF6801]">{parent.label}</Link>
            <span>/</span>
            <span className="text-white/82">{page.title}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-end">
            <div>
              <p className="lux-eyebrow mb-5">{page.eyebrow}</p>
              <h1 className="max-w-4xl font-orbitron text-[clamp(2.4rem,6vw,5.2rem)] font-bold leading-[1.03] tracking-normal text-white">
                {page.h1}
              </h1>
              <p className="mt-6 max-w-3xl font-inter text-lg leading-8 text-white/70">
                {page.quickAnswer}
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link href="/contact/" className="portfolio-button justify-center">
                  Book Free Growth Audit <MessageCircle className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href={parent.href}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 font-orbitron text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition hover:border-[#FF6801]/70 hover:text-[#FF6801]"
                >
                  View main service <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <aside className="lux-card p-6" aria-label="Project direction">
              <div className="relative mb-6 aspect-video overflow-hidden rounded-[18px] border border-white/10 bg-black">
                <Image
                  src={visual.image}
                  alt={visual.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 390px"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/48 via-transparent to-white/[0.04]" aria-hidden="true" />
                <span className="absolute bottom-4 left-4 rounded-full border border-white/15 bg-black/62 px-3 py-2 font-orbitron text-[9px] font-bold uppercase tracking-[0.14em] text-white/82">
                  {visual.label}
                </span>
              </div>
              <p className="font-orbitron text-[10px] font-bold uppercase tracking-[0.18em] text-[#FF6801]">
                Crea8iv planning brief
              </p>
              <div className="mt-5 space-y-5">
                {[
                  { icon: MonitorSmartphone, label: "Audience", value: page.audience },
                  { icon: Sparkles, label: "Intent", value: page.intent },
                  { icon: MapPin, label: "Starting point", value: page.priceFrom },
                  { icon: Clock3, label: "Typical timeline", value: page.timeline },
                  { icon: Clock3, label: "Last updated", value: SEO_LANDING_LAST_UPDATED_LABEL },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="border-b border-white/10 pb-5 last:border-b-0 last:pb-0">
                    <div className="flex items-center gap-2 font-orbitron text-[10px] font-bold uppercase tracking-[0.14em] text-white/46">
                      <Icon className="h-4 w-4 text-[#FF6801]" aria-hidden="true" />
                      {label}
                    </div>
                    <p className="mt-2 font-inter text-sm leading-6 text-white/72">{value}</p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="px-6 py-14 lg:px-10">
        <div className="mx-auto max-w-[1180px]">
          <div className="grid gap-5 md:grid-cols-3">
            {page.sections.map((section) => (
              <article key={section.title} className="lux-card h-full p-6">
                <h2 className="font-orbitron text-xl font-semibold leading-tight text-white">{section.title}</h2>
                <p className="mt-4 font-inter text-sm leading-7 text-white/65">{section.body}</p>
                <ul className="mt-5 space-y-3">
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-3 font-inter text-sm leading-6 text-white/68">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#FF6801]" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {proofItems.length ? (
        <section className="px-6 py-14 lg:px-10" aria-labelledby="seo-landing-proof">
          <div className="mx-auto max-w-[1180px]">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="lux-eyebrow mb-4">Portfolio proof</p>
                <h2 id="seo-landing-proof" className="font-orbitron text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight text-white">
                  Related work that supports this service.
                </h2>
              </div>
              <Link href="/results/" className="inline-flex items-center gap-2 font-orbitron text-[11px] font-semibold uppercase tracking-[0.14em] text-[#FF6801]">
                View full portfolio <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {proofItems.map((item) => {
                const inner = (
                  <>
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#0d0906]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.imageAlt}
                        width={640}
                        height={480}
                        loading="lazy"
                        decoding="async"
                        className="service-proof-image h-full w-full object-contain"
                      />
                      <span className="absolute left-4 top-4 max-w-[82%] border border-white/15 bg-black/58 px-3 py-2 font-orbitron text-[9px] font-bold uppercase tracking-[0.14em] text-white/82">
                        {item.category}
                      </span>
                      <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center border border-white/20 bg-black/50 text-white transition group-hover:border-[#FF6801] group-hover:bg-[#FF6801] group-hover:text-[#160a03]">
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </div>
                    <div className="p-5">
                      <p className="font-orbitron text-[10px] font-black uppercase tracking-[0.18em] text-[#FF6801]">{item.brand}</p>
                      <h3 className="mt-2 font-orbitron text-lg font-semibold leading-tight text-white">{item.title}</h3>
                      <p className="mt-3 font-inter text-sm leading-6 text-white/62">{item.summary}</p>
                    </div>
                  </>
                );

                const className = "group block h-full overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.035] transition hover:-translate-y-1 hover:border-brand-500/45 hover:bg-white/[0.05]";

                return /^https?:\/\//i.test(item.href) ? (
                  <a key={item.slug} href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
                    {inner}
                  </a>
                ) : (
                  <Link key={item.slug} href={item.href} className={className}>
                    {inner}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      <section className="px-6 py-14 lg:px-10" aria-labelledby="seo-landing-cluster">
        <div className="mx-auto max-w-[1180px]">
          <p className="lux-eyebrow mb-4">{label} SEO cluster</p>
          <h2 id="seo-landing-cluster" className="max-w-3xl font-orbitron text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight text-white">
            Explore related {label.toLowerCase()} paths.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {relatedPages.map((relatedPage) => (
              <Link
                key={relatedPage.slug}
                href={`/${relatedPage.family}/${relatedPage.slug}/`}
                className="lux-card block h-full p-5 transition hover:border-[#FF6801]/50 hover:bg-white/[0.045]"
              >
                <p className="font-orbitron text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF6801]">{relatedPage.eyebrow}</p>
                <h3 className="mt-3 font-orbitron text-lg font-semibold leading-tight text-white">{relatedPage.title}</h3>
                <p className="mt-3 line-clamp-3 font-inter text-sm leading-6 text-white/62">{relatedPage.quickAnswer}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-14 lg:px-10">
        <div className="mx-auto max-w-[900px]">
          <p className="lux-eyebrow mb-4">Answer-ready FAQ</p>
          <h2 className="font-orbitron text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-tight text-white">
            Questions buyers and AI assistants ask before shortlisting an agency.
          </h2>
          <div className="mt-8 space-y-4">
            {page.faqs.map((faq) => (
              <article key={faq.question} className="lux-card p-6">
                <h3 className="font-orbitron text-base font-semibold text-white">{faq.question}</h3>
                <p className="mt-3 font-inter text-sm leading-7 text-white/65">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-[980px] rounded-[28px] border border-[#FF6801]/25 bg-[linear-gradient(135deg,rgba(255,104,1,0.14),rgba(255,255,255,0.035))] p-8 text-center">
          <p className="lux-eyebrow mb-4 justify-center">Start with clarity</p>
          <h2 className="font-orbitron text-[clamp(2rem,5vw,3.4rem)] font-bold leading-tight text-white">
            Want {page.serviceName.toLowerCase()} for your business?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-inter text-base leading-8 text-white/68">
            Share your business, location, website or software goal, and the lead flow you want.
            Crea8iv Media will map the recommended scope before development starts.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/contact/" className="portfolio-button justify-center">
              Request proposal <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href={`https://wa.me/${BUSINESS_DETAILS.phone.replace(/[^0-9]/g, "")}?text=Hi%20Crea8iv%20Media%20-%20I%20want%20to%20discuss%20${encodeURIComponent(page.serviceName)}.`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 font-orbitron text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition hover:border-[#FF6801]/70 hover:text-[#FF6801]"
            >
              WhatsApp now <MessageCircle className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
