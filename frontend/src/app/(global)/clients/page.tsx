import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Globe2, Sparkles } from "lucide-react";
import { CLIENT_LOGOS } from "@/lib/client-logos";
import { websitePortfolioItems } from "@/lib/website-portfolio";
import { BUSINESS_DETAILS, SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: { absolute: "Clients and Website Portfolio Proof Pakistan | Crea8iv Media" },
  description:
    "Explore selected Crea8iv Media client logos, website portfolio links and proof categories across interiors, architecture, healthcare, restaurants, ecommerce, education and software.",
  alternates: { canonical: `${SITE_URL}/clients/` },
  openGraph: {
    title: "Clients and Website Portfolio Proof Pakistan | Crea8iv Media",
    description:
      "Selected client logos, portfolio links and website proof from Crea8iv Media in Pakistan.",
    url: `${SITE_URL}/clients/`,
    type: "website",
    images: [{ url: `${SITE_URL}/img/crea8iv-search-preview.png`, width: 1200, height: 630, alt: "Crea8iv Media client proof" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clients and Website Portfolio Proof Pakistan | Crea8iv Media",
    description: "Selected client logos and website portfolio proof from Crea8iv Media.",
    images: [`${SITE_URL}/img/crea8iv-search-preview.png`],
  },
};

const proofGroups = [
  {
    title: "Website systems",
    body: "Responsive websites and product pages planned around trust, search visibility, lead capture and mobile conversion.",
    links: ["/website-development/", "/results/", "/playbooks/plan-business-website-pakistan/"],
  },
  {
    title: "Brand identity and creative",
    body: "Logo systems, visual identity, social creative and campaign assets that make the business easier to recognize across channels.",
    links: ["/branding-and-creative/", "/results/logo-identity/", "/results/brand-guidelines/"],
  },
  {
    title: "Software and automation",
    body: "Custom software, SaaS, CRM, AI workflows and automation planning for businesses that need workflow-specific systems.",
    links: ["/software-development/", "/software-products/", "/playbooks/plan-custom-software-mvp-pakistan/"],
  },
] as const;

function absoluteUrl(href?: string) {
  if (!href) return undefined;
  return href.startsWith("http") ? href : `${SITE_URL}${href}`;
}

function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/clients/#webpage`,
        url: `${SITE_URL}/clients/`,
        name: "Crea8iv Media Clients and Portfolio Proof",
        description:
          "Selected Crea8iv Media client logos, official links and website portfolio proof for businesses evaluating digital marketing, website development, software and brand work.",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#business` },
        inLanguage: "en-PK",
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/clients/#org-proof`,
        name: BUSINESS_DETAILS.brandName,
        url: SITE_URL,
        legalName: BUSINESS_DETAILS.legalName,
        knowsAbout: [
          "Website development in Pakistan",
          "Software development in Pakistan",
          "Brand identity design",
          "AI search optimization",
          "Digital marketing systems",
        ],
        subjectOf: websitePortfolioItems.map((item) => ({
          "@type": "CreativeWork",
          name: `${item.brand} - ${item.title}`,
          url: absoluteUrl(item.href),
          image: `${SITE_URL}${item.image}`,
          description: item.summary,
          keywords: item.seoKeywords.join(", "),
        })),
      },
      {
        "@type": "ItemList",
        name: "Selected Crea8iv Media client proof links",
        itemListElement: CLIENT_LOGOS.map((client, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: client.name,
          url: absoluteUrl(client.href) ?? `${SITE_URL}/clients/`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/clients/#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Clients", item: `${SITE_URL}/clients/` },
        ],
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function ClientsPage() {
  return (
    <main className="native-page relative isolate overflow-hidden bg-[#050505] text-white">
      <JsonLd />

      <section className="px-6 pb-16 pt-44 lg:px-10 lg:pb-20">
        <div className="mx-auto max-w-[1180px]">
          <p className="lux-eyebrow mb-5">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Client proof
          </p>
          <h1 className="max-w-5xl font-orbitron text-[clamp(2.4rem,6vw,5.2rem)] font-bold leading-[1.03] tracking-normal text-white">
            Selected client logos and website portfolio proof.
          </h1>
          <p className="mt-6 max-w-3xl font-inter text-lg leading-8 text-white/70">
            Crea8iv Media works across website development, brand identity, digital marketing,
            software and AI visibility. This page gives buyers and AI systems a clearer,
            structured view of selected client links, project categories and related proof pages.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/results/" className="portfolio-button justify-center">
              View full portfolio <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/website-development/"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 font-orbitron text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition hover:border-[#FF6801]/70 hover:text-[#FF6801]"
            >
              Website development <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 lg:px-10" aria-labelledby="client-logos-heading">
        <div className="mx-auto max-w-[1180px]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="lux-eyebrow mb-4">Selected clients</p>
              <h2 id="client-logos-heading" className="max-w-3xl font-orbitron text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight text-white">
                Logos and official proof links.
              </h2>
            </div>
            <p className="max-w-md font-inter text-sm leading-7 text-white/58">
              Each logo is shown inside a fixed proof tile so the mark stays visible, balanced and uncropped.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {CLIENT_LOGOS.map((client) => {
              const external = client.href?.startsWith("http");
              const href = client.href ?? "/results/logo-identity/";
              const content = (
                <>
                  <span className="relative flex aspect-[1.9] w-full items-center justify-center rounded-lg border border-white/10 bg-white/[0.035] p-5">
                    <Image
                      src={client.src}
                      alt={`${client.name} logo`}
                      width={220}
                      height={120}
                      sizes="(max-width: 640px) 50vw, (max-width: 1280px) 25vw, 220px"
                      className="max-h-full w-auto max-w-full object-contain"
                    />
                  </span>
                  <span className="mt-4 flex items-center justify-between gap-3">
                    <span>
                      <span className="block font-orbitron text-base font-semibold text-white">{client.name}</span>
                      <span className="mt-1 block font-inter text-xs leading-5 text-white/52">
                        {external ? "Official external proof link" : "Portfolio identity proof"}
                      </span>
                    </span>
                    <Globe2 className="h-4 w-4 shrink-0 text-[#FF6801]" aria-hidden="true" />
                  </span>
                </>
              );

              return external ? (
                <a key={client.name} href={href} target="_blank" rel="noopener noreferrer" className="lux-card group block h-full p-4 transition hover:border-[#FF6801]/50">
                  {content}
                </a>
              ) : (
                <Link key={client.name} href={href} className="lux-card group block h-full p-4 transition hover:border-[#FF6801]/50">
                  {content}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-12 lg:px-10" aria-labelledby="website-proof-heading">
        <div className="mx-auto max-w-[1180px]">
          <p className="lux-eyebrow mb-4">Website proof</p>
          <h2 id="website-proof-heading" className="max-w-4xl font-orbitron text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight text-white">
            Website systems buyers can inspect.
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {websitePortfolioItems.map((item) => (
              <Link key={item.slug} href={item.href} target={item.external ? "_blank" : undefined} rel={item.external ? "noopener noreferrer" : undefined} className="lux-card group block h-full p-4 transition hover:border-[#FF6801]/50">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[18px] border border-white/10 bg-black">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition duration-700 group-hover:scale-[1.025]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/65 px-3 py-1.5 font-orbitron text-[9px] font-bold uppercase tracking-[0.14em] text-white/76">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="mt-5 font-orbitron text-xl font-semibold text-white">{item.brand}</h3>
                  <p className="mt-2 font-inter text-sm font-semibold text-[#FF6801]">{item.title}</p>
                  <p className="mt-3 font-inter text-sm leading-7 text-white/62">{item.summary}</p>
                  <ul className="mt-5 grid gap-2 sm:grid-cols-3">
                    {item.outcomes.map((outcome) => (
                      <li key={outcome} className="flex gap-2 font-inter text-xs leading-5 text-white/56">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#FF6801]" aria-hidden="true" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                  <span className="mt-6 inline-flex items-center gap-2 font-orbitron text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF6801]">
                    Read case study <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 pt-12 lg:px-10" aria-labelledby="proof-groups-heading">
        <div className="mx-auto max-w-[1180px]">
          <p className="lux-eyebrow mb-4">Proof categories</p>
          <h2 id="proof-groups-heading" className="max-w-4xl font-orbitron text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight text-white">
            Connect the proof to the service you need.
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {proofGroups.map((group) => (
              <section key={group.title} className="lux-card p-6">
                <h3 className="font-orbitron text-xl font-semibold text-white">{group.title}</h3>
                <p className="mt-4 font-inter text-sm leading-7 text-white/62">{group.body}</p>
                <div className="mt-6 space-y-3">
                  {group.links.map((href) => (
                    <Link key={href} href={href} className="flex items-center justify-between gap-3 rounded-full border border-white/10 px-4 py-3 font-orbitron text-[10px] font-bold uppercase tracking-[0.14em] text-white/70 transition hover:border-[#FF6801]/55 hover:text-[#FF6801]">
                      <span>{href.replaceAll("/", " ").trim() || "home"}</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
