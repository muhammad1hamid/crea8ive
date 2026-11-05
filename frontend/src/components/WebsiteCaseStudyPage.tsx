import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, FileText, Globe2, MessageCircle, MonitorSmartphone } from "lucide-react";
import { BUSINESS_DETAILS, SITE_URL } from "@/lib/site-config";
import { websitePortfolioItems, type WebsitePortfolioItem } from "@/lib/website-portfolio";

function caseStudyUrl(slug: string) {
  return `${SITE_URL}/website-portfolio/${slug}/`;
}

function absoluteUrl(href: string) {
  return href.startsWith("http") ? href : `${SITE_URL}${href}`;
}

function JsonLd({ item }: { item: WebsitePortfolioItem }) {
  const url = caseStudyUrl(item.slug);
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${url}#creative-work`,
        name: `${item.brand} - ${item.title}`,
        headline: item.title,
        description: item.summary,
        url,
        sameAs: absoluteUrl(item.href),
        image: `${SITE_URL}${item.image}`,
        keywords: item.seoKeywords.join(", "),
        creator: { "@id": `${SITE_URL}/#organization` },
        provider: { "@id": `${SITE_URL}/#organization` },
        workExample: item.services,
        about: item.category,
        spatialCoverage: item.location,
        dateModified: "2026-09-01",
        inLanguage: "en-PK",
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: `${item.brand} Website Portfolio Case Study | Crea8iv Media`,
        description: item.summary,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${url}#creative-work` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        inLanguage: "en-PK",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Website Portfolio", item: `${SITE_URL}/website-portfolio/` },
          { "@type": "ListItem", position: 3, name: item.brand, item: url },
        ],
      },
      {
        "@type": "ItemList",
        name: "Crea8iv Media website portfolio case studies",
        itemListElement: websitePortfolioItems.map((portfolioItem, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: `${portfolioItem.brand} - ${portfolioItem.title}`,
          url: caseStudyUrl(portfolioItem.slug),
        })),
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function WebsiteCaseStudyPage({ item }: { item: WebsitePortfolioItem }) {
  const related = websitePortfolioItems.filter((portfolioItem) => portfolioItem.slug !== item.slug).slice(0, 3);
  const whatsappHref = `https://wa.me/${BUSINESS_DETAILS.phone.replace(/[^0-9]/g, "")}?text=Hi%20Crea8iv%20Media%20-%20I%20viewed%20the%20${encodeURIComponent(item.brand)}%20website%20case%20study%20and%20want%20a%20similar%20website.`;

  return (
    <article className="native-page relative isolate overflow-hidden bg-[#050505] text-white">
      <JsonLd item={item} />

      <section className="px-6 pb-14 pt-44 lg:px-10 lg:pb-20">
        <div className="mx-auto max-w-[1180px]">
          <nav className="mb-8 flex flex-wrap items-center gap-2 font-inter text-sm text-white/55" aria-label="Breadcrumb">
            <Link href="/" className="transition hover:text-[#FF6801]">Home</Link>
            <span>/</span>
            <Link href="/website-portfolio/" className="transition hover:text-[#FF6801]">Website Portfolio</Link>
            <span>/</span>
            <span className="text-white/82">{item.brand}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
            <div>
              <p className="lux-eyebrow mb-5">
                <MonitorSmartphone className="h-3.5 w-3.5" aria-hidden="true" /> {item.category}
              </p>
              <h1 className="max-w-4xl font-orbitron text-[clamp(2.35rem,6vw,5.1rem)] font-bold leading-[1.03] tracking-normal text-white">
                {item.brand}: {item.title}
              </h1>
              <p className="mt-6 max-w-3xl font-inter text-lg leading-8 text-white/70">{item.summary}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href={absoluteUrl(item.href)} target="_blank" rel="noopener noreferrer" className="portfolio-button justify-center">
                  {item.linkLabel} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 font-orbitron text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition hover:border-[#FF6801]/70 hover:text-[#FF6801]"
                >
                  Ask for similar work <MessageCircle className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            <aside className="lux-card p-6">
              <div className="flex items-center gap-2 font-orbitron text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF6801]">
                <Globe2 className="h-4 w-4" aria-hidden="true" />
                Project context
              </div>
              <dl className="mt-5 space-y-4 font-inter text-sm">
                <div>
                  <dt className="text-white/42">Location</dt>
                  <dd className="mt-1 text-white/76">{item.location}</dd>
                </div>
                <div>
                  <dt className="text-white/42">Category</dt>
                  <dd className="mt-1 text-white/76">{item.category}</dd>
                </div>
                <div>
                  <dt className="text-white/42">Updated</dt>
                  <dd className="mt-1 text-white/76">2026-09-01</dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 lg:px-10" aria-labelledby="visual-proof-heading">
        <div className="mx-auto max-w-[1180px]">
          <div className="lux-card overflow-hidden p-4">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[18px] border border-white/10 bg-black">
              <Image
                src={item.image}
                alt={item.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 1180px"
                className="object-cover"
                priority
              />
            </div>
          </div>
          <h2 id="visual-proof-heading" className="sr-only">Visual website proof</h2>
        </div>
      </section>

      <section className="px-6 py-12 lg:px-10" aria-labelledby="scope-heading">
        <div className="mx-auto grid max-w-[1180px] gap-5 lg:grid-cols-3">
          <section className="lux-card p-6">
            <p className="lux-eyebrow mb-4">Services</p>
            <h2 id="scope-heading" className="font-orbitron text-xl font-semibold text-white">Scope represented</h2>
            <ul className="mt-5 space-y-3">
              {item.services.map((service) => (
                <li key={service} className="flex gap-3 font-inter text-sm leading-6 text-white/68">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#FF6801]" aria-hidden="true" />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="lux-card p-6">
            <p className="lux-eyebrow mb-4">Outcomes</p>
            <h2 className="font-orbitron text-xl font-semibold text-white">Design intent</h2>
            <ul className="mt-5 space-y-3">
              {item.outcomes.map((outcome) => (
                <li key={outcome} className="flex gap-3 font-inter text-sm leading-6 text-white/68">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#FF6801]" aria-hidden="true" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="lux-card p-6">
            <p className="lux-eyebrow mb-4">SEO themes</p>
            <h2 className="font-orbitron text-xl font-semibold text-white">Search context</h2>
            <ul className="mt-5 space-y-3">
              {item.seoKeywords.map((keyword) => (
                <li key={keyword} className="flex gap-3 font-inter text-sm leading-6 text-white/68">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#FF6801]" aria-hidden="true" />
                  <span>{keyword}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </section>

      <section className="px-6 py-12 lg:px-10" aria-labelledby="proof-heading">
        <div className="mx-auto grid max-w-[1180px] gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="lux-eyebrow mb-4">Proof summary</p>
            <h2 id="proof-heading" className="font-orbitron text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight text-white">
              What this project shows about Crea8iv Media website work.
            </h2>
          </div>
          <div className="lux-card p-6">
            <p className="font-inter text-sm leading-7 text-white/68">
              This portfolio item shows how Crea8iv Media frames a website around a specific
              business category, buyer intent, visual trust, responsive presentation and a clear
              next action. It should be used as portfolio proof, not as a guaranteed ranking,
              revenue or performance claim.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Link href="/website-development/" className="rounded-full border border-white/10 px-4 py-3 font-orbitron text-[10px] font-bold uppercase tracking-[0.14em] text-white/70 transition hover:border-[#FF6801]/55 hover:text-[#FF6801]">
                Website development
              </Link>
              <Link href="/playbooks/plan-business-website-pakistan/" className="rounded-full border border-white/10 px-4 py-3 font-orbitron text-[10px] font-bold uppercase tracking-[0.14em] text-white/70 transition hover:border-[#FF6801]/55 hover:text-[#FF6801]">
                Planning playbook
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 lg:px-10" aria-labelledby="related-heading">
        <div className="mx-auto max-w-[1180px]">
          <p className="lux-eyebrow mb-4">More website proof</p>
          <h2 id="related-heading" className="font-orbitron text-2xl font-bold text-white">Related website case studies</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {related.map((relatedItem) => (
              <Link key={relatedItem.slug} href={`/website-portfolio/${relatedItem.slug}/`} className="lux-card group block p-4 transition hover:border-[#FF6801]/50">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[14px] border border-white/10 bg-black">
                  <Image
                    src={relatedItem.image}
                    alt={relatedItem.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.025]"
                  />
                </div>
                <FileText className="mt-5 h-5 w-5 text-[#FF6801]" aria-hidden="true" />
                <h3 className="mt-3 font-orbitron text-base font-semibold text-white">{relatedItem.brand}</h3>
                <p className="mt-2 line-clamp-2 font-inter text-sm leading-6 text-white/62">{relatedItem.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
