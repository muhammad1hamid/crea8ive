import WebsitePortfolioGrid from "@/components/WebsitePortfolioGrid";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, MonitorSmartphone } from "lucide-react";
import { SITE_URL } from "@/lib/site-config";
import { websitePortfolioItems } from "@/lib/website-portfolio";

export const metadata: Metadata = {
  title: { absolute: "Website Design Portfolio Pakistan | Crea8iv Media" },
  description:
    "Explore Crea8iv Media website projects for interiors, architecture, restaurants, healthcare, SaaS, fitness and digital marketing.",
  alternates: { canonical: `${SITE_URL}/website-portfolio/` },
  openGraph: {
    title: "Website Design Portfolio Pakistan | Crea8iv Media",
    description:
      "Selected responsive website designs with direct project links.",
    url: `${SITE_URL}/website-portfolio/`,
    type: "website",
    images: [{ url: `${SITE_URL}/img/crea8iv-search-preview.png`, width: 1200, height: 630, alt: "Crea8iv Media website portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Design Portfolio Pakistan | Crea8iv Media",
    description: "Selected website projects by Crea8iv Media.",
    images: [`${SITE_URL}/img/crea8iv-search-preview.png`],
  },
};

function JsonLd() {
  const url = `${SITE_URL}/website-portfolio/`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: "Crea8iv Media Website Portfolio",
        description:
          "A grid of selected website projects by Crea8iv Media.",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#business` },
        inLanguage: "en-PK",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Website Portfolio", item: url },
        ],
      },
      {
        "@type": "ItemList",
        name: "Crea8iv Media website portfolio",
        itemListElement: websitePortfolioItems.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: `${item.brand} - ${item.title}`,
          url: item.href.startsWith("http") ? item.href : `${SITE_URL}${item.href}`,
        })),
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function WebsitePortfolioPage() {
  const featuredItems = websitePortfolioItems.slice(0, 5);

  return (
    <main className="native-page relative isolate overflow-hidden bg-[#050505] text-white">
      <JsonLd />
      <section className="relative overflow-hidden px-6 pb-16 pt-44 lg:px-10 lg:pb-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(255,104,1,.18),transparent_34%),linear-gradient(180deg,rgba(255,255,255,.035),transparent_46%)]" />
        <div className="relative mx-auto grid max-w-[1320px] gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
          <div>
            <p className="lux-eyebrow mb-5">
              <MonitorSmartphone className="h-3.5 w-3.5" aria-hidden="true" /> Website portfolio
            </p>
            <h1 className="max-w-5xl font-orbitron text-[clamp(2.4rem,6vw,5.2rem)] font-bold leading-[1.03] tracking-normal text-white">
              Selected websites. Visual proof before the full archive.
            </h1>
            <p className="mt-6 max-w-3xl font-inter text-lg leading-8 text-white/70">
              A quick visual summary of website work across agency, clinic, restaurant, interiors, SaaS, and service brands. Open the full grid below for the detailed portfolio.
            </p>
            <div className="mt-7 flex flex-wrap gap-2.5">
              {["Responsive", "SEO-ready", "Portfolio-led", "Conversion-focused"].map((item) => (
                <span key={item} className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.045] px-4 py-2 text-xs text-white/70">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#FF6801]" aria-hidden="true" /> {item}
                </span>
              ))}
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="#website-portfolio-grid" className="portfolio-button justify-center">View full grid <ArrowUpRight className="h-4 w-4" /></Link>
              <Link href="/contact/" className="portfolio-text-link justify-center">Plan a website <ArrowUpRight className="h-4 w-4" /></Link>
            </div>
          </div>
          <div className="website-portfolio-collage" aria-label="Website portfolio visual summary">
            {featuredItems.map((item, index) => (
              <Link key={item.slug} href={item.href} className={`website-portfolio-collage-card website-portfolio-collage-card-${index + 1}`}>
                <Image src={item.image} alt={item.imageAlt} fill sizes="(max-width: 1024px) 46vw, 300px" className="object-cover" priority={index < 2} />
                <span>{item.brand}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="website-portfolio-grid" className="scroll-mt-28 px-6 pb-20 lg:px-10">
        <div className="mx-auto max-w-[1440px]"><WebsitePortfolioGrid /></div>
      </section>
    </main>
  );
}
