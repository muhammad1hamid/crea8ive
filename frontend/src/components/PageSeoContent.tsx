import { PAGE_SEO_CONTENT } from "@/lib/page-seo-content";
import { pageUrl } from "@/lib/seo-metadata";
import { selectedWebsiteProof, websiteIndustryTargets } from "@/lib/website-service-proof";
import { ArrowUpRight, CheckCircle2, MonitorSmartphone } from "lucide-react";
import Link from "next/link";

/**
 * Appends AEO/SEO content (intro answer-block + FAQ answer-blocks) plus
 * Service + FAQPage + Breadcrumb JSON-LD to the BOTTOM of an existing service
 * page. The Elementor design above is untouched. Renders nothing for slugs
 * without configured content.
 */
export default function PageSeoContent({ slug, schemaOnly = false }: { slug: string; schemaOnly?: boolean }) {
  const data = PAGE_SEO_CONTENT[slug];
  if (!data) return null;

  const url = pageUrl(slug);
  const isWebsiteDevelopment = slug === "website-development";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        serviceType: data.serviceName,
        name: `${data.serviceName} — Crea8iv Media`,
        description: data.intro,
        provider: { "@id": "https://crea8ivmedia.com/#business" },
        areaServed: [
          { "@type": "City", name: "Rawalpindi" },
          { "@type": "City", name: "Islamabad" },
          { "@type": "Country", name: "Pakistan" },
        ],
        offers: { "@type": "Offer", priceCurrency: "PKR", price: data.price },
        ...(isWebsiteDevelopment
          ? {
              audience: [
                { "@type": "Audience", audienceType: "restaurants" },
                { "@type": "Audience", audienceType: "clinics and dental practices" },
                { "@type": "Audience", audienceType: "architecture and interior design firms" },
                { "@type": "Audience", audienceType: "ecommerce and local service businesses" },
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Website Development Services in Pakistan",
                itemListElement: websiteIndustryTargets.map((item) => ({
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: item.title,
                    description: item.description,
                    provider: { "@id": "https://crea8ivmedia.com/#business" },
                  },
                })),
              },
              workExample: selectedWebsiteProof.map((item) => ({
                "@type": "CreativeWork",
                name: `${item.brand} ${item.title}`,
                description: item.summary,
                url: item.external ? item.href : `https://crea8ivmedia.com${item.href.startsWith("/") ? item.href : `/${item.href}`}`,
                image: `https://crea8ivmedia.com${item.image}`,
              })),
            }
          : {}),
      },
      {
        "@type": "FAQPage",
        mainEntity: data.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  const schema = <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
  if (schemaOnly) return schema;

  return (
    <div className="native-page">
      {schema}

      {/* Hairline divider between the Elementor design and the appended content */}
      <div className="mx-auto my-4 h-px max-w-7xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <section className="px-6 py-16 lg:px-10">
        <div className="mx-auto max-w-[860px]">
          {/* Intro answer block (AEO snippet target) */}
          <p className="lux-eyebrow mb-4">{data.eyebrow}</p>
          <h2 className="font-orbitron text-[clamp(1.6rem,3.5vw,2.4rem)] font-bold leading-tight text-white">
            {data.heading}
          </h2>
          <p className="mt-4 font-inter text-base leading-relaxed text-white/70">{data.intro}</p>
          
          {/* EEAT Author Trust Signal */}
          <div className="mt-6 flex items-center gap-3 border-l-2 border-[#FF6801] pl-4">
            <div className="text-sm">
              <p className="font-orbitron font-semibold text-white">Strategy & Content by Syed Qamar Abbas</p>
              <p className="font-inter text-white/50 text-[13px]">Founder & CEO, Crea8iv Media</p>
            </div>
          </div>

          {isWebsiteDevelopment ? <WebsiteDevelopmentProofBlocks /> : null}

          {data.relatedLinks?.length ? (
            <div className="mt-10">
              <h3 className="font-orbitron text-xl font-bold text-white">Related Guides and Next Steps</h3>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {data.relatedLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="lux-card block h-full p-5 transition hover:border-brand-500/50 hover:bg-white/[0.045]"
                  >
                    <p className="font-orbitron text-sm font-semibold text-white">{link.label}</p>
                    <p className="mt-2 font-inter text-sm leading-relaxed text-white/65">{link.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          {/* FAQ answer blocks */}
          <h3 className="mt-12 font-orbitron text-xl font-bold text-white">Frequently Asked Questions</h3>
          <div className="mt-6 space-y-4">
            {data.faqs.map((f) => (
              <div key={f.q} className="lux-card p-6">
                <h4 className="font-orbitron text-[15px] font-semibold text-white">{f.q}</h4>
                <p className="mt-2 font-inter text-sm leading-relaxed text-white/65">{f.a}</p>
              </div>
            ))}
          </div>

          <section className="mt-10 border-t border-white/10 pt-8" aria-labelledby={`${slug}-service-cta`}>
            <p className="font-orbitron text-[11px] uppercase tracking-[0.18em] text-brand-300">Plan the next step</p>
            <h3 id={`${slug}-service-cta`} className="mt-3 font-orbitron text-xl font-bold text-white">
              Ready to discuss {data.serviceName} for your business?
            </h3>
            <p className="mt-3 max-w-2xl font-inter text-sm leading-7 text-white/65">
              Review the current service pricing, then share your goals, location, and lead target so the recommended scope matches the work you actually need.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/pricing/" className="hero-chip rounded-full border border-[#FF6801]/50 bg-[#1a0b02]/60 px-5 py-3 text-sm text-white/90 hover:border-[#FF6801]">
                View pricing
              </Link>
              <Link href="/contact/" className="hero-chip rounded-full border border-white/20 bg-white/[0.04] px-5 py-3 text-sm text-white/90 hover:border-[#FF6801]/70">
                Request a proposal
              </Link>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}

function isExternalHref(href: string) {
  return /^https?:\/\//i.test(href);
}

function WebsiteDevelopmentProofBlocks() {
  return (
    <>
      <section className="mt-12" aria-labelledby="website-industries-heading">
        <div className="flex items-end justify-between gap-5">
          <div>
            <p className="font-orbitron text-[11px] uppercase tracking-[0.18em] text-brand-300">Niche website systems</p>
            <h3 id="website-industries-heading" className="mt-3 font-orbitron text-2xl font-bold leading-tight text-white">
              Websites for the business categories buyers actually search.
            </h3>
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {websiteIndustryTargets.map((industry) => (
            <Link
              key={industry.title}
              href={industry.href}
              className="lux-card group block h-full p-5 transition hover:border-[#FF6801]/50 hover:bg-white/[0.045]"
            >
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#FF6801]" aria-hidden="true" />
                <div>
                  <h4 className="font-orbitron text-[15px] font-semibold text-white">{industry.title}</h4>
                  <p className="mt-2 font-inter text-sm leading-7 text-white/64">{industry.description}</p>
                  <span className="mt-4 inline-flex items-center gap-2 font-orbitron text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF6801]">
                    Explore page <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12" aria-labelledby="website-proof-heading">
        <p className="inline-flex items-center gap-2 font-orbitron text-[11px] uppercase tracking-[0.18em] text-brand-300">
          <MonitorSmartphone className="h-4 w-4" aria-hidden="true" /> Website portfolio proof
        </p>
        <h3 id="website-proof-heading" className="mt-3 font-orbitron text-2xl font-bold leading-tight text-white">
          Selected websites and project directions by Crea8iv Media.
        </h3>
        <p className="mt-3 font-inter text-sm leading-7 text-white/64">
          These examples help search engines and AI systems connect Crea8iv Media with real website work across architecture, interiors, hospitality, healthcare, SaaS and agency positioning.
        </p>
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {selectedWebsiteProof.map((item) => {
            const external = isExternalHref(item.href);
            const CardTag = external ? "a" : Link;
            const cardProps = external
              ? { href: item.href, target: "_blank", rel: "noopener noreferrer" }
              : { href: item.href };

            return (
              <CardTag
                key={item.slug}
                {...cardProps}
                className="group block h-full overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.035] transition hover:-translate-y-1 hover:border-brand-500/45 hover:bg-white/[0.05]"
                aria-label={`${external ? "Open" : "View"} ${item.brand} website project`}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#0d0906]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    width={640}
                    height={480}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-contain"
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
                  <h4 className="mt-2 font-orbitron text-lg font-semibold leading-tight text-white">{item.title}</h4>
                  <p className="mt-3 font-inter text-sm leading-6 text-white/62">{item.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.services.slice(0, 2).map((service) => (
                      <span key={service} className="rounded-full border border-white/12 bg-white/[0.035] px-3 py-1.5 font-inter text-xs text-white/62">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </CardTag>
            );
          })}
        </div>
      </section>
    </>
  );
}
