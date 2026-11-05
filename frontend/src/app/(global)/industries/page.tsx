import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Building2 } from "lucide-react";
import { industryPages } from "@/lib/industry-pages";
import { SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: { absolute: "Industry Growth Systems for Pakistan Businesses | Crea8iv Media" },
  description:
    "Explore Crea8iv Media industry growth systems for restaurants, clinics, architects, interiors, ecommerce, real estate and education brands in Pakistan.",
  alternates: { canonical: `${SITE_URL}/industries/` },
};

function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/industries/#webpage`,
        url: `${SITE_URL}/industries/`,
        name: "Industry Growth Systems for Pakistan Businesses",
        description:
          "Industry solution pages for Crea8iv Media website development, local visibility, ads, content, branding and consultation services.",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#business` },
        inLanguage: "en-PK",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Industries", item: `${SITE_URL}/industries/` },
        ],
      },
      {
        "@type": "ItemList",
        name: "Crea8iv Media industry solution pages",
        itemListElement: industryPages.map((page, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: page.title,
          url: `${SITE_URL}/industries/${page.slug}/`,
          description: page.metaDescription,
        })),
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function IndustriesPage() {
  return (
    <main className="native-page relative isolate overflow-hidden bg-[#050505] text-white">
      <JsonLd />
      <section className="px-6 pb-14 pt-44 lg:px-10 lg:pb-20">
        <div className="mx-auto max-w-[1180px]">
          <p className="lux-eyebrow mb-5">
            <Building2 className="h-3.5 w-3.5" aria-hidden="true" /> Industry solution pages
          </p>
          <h1 className="max-w-4xl font-orbitron text-[clamp(2.35rem,6vw,5.1rem)] font-bold leading-[1.03] tracking-normal text-white">
            Growth systems shaped around how each business category wins trust.
          </h1>
          <p className="mt-6 max-w-3xl font-inter text-lg leading-8 text-white/70">
            These pages connect Crea8iv Media services with buyer intent for restaurants, clinics, architecture, interiors, ecommerce, real estate and education brands in Pakistan.
          </p>
          <div className="mt-9">
            <Link href="/industry-pages.md" className="portfolio-button">
              Open machine-readable index <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 lg:px-10">
        <div className="mx-auto grid max-w-[1180px] gap-4 md:grid-cols-2 xl:grid-cols-3">
          {industryPages.map((page) => (
            <Link key={page.slug} href={`/industries/${page.slug}/`} className="lux-card group block h-full p-6 transition hover:border-[#FF6801]/50">
              <p className="font-orbitron text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF6801]">{page.eyebrow}</p>
              <h2 className="mt-4 font-orbitron text-2xl font-semibold leading-tight text-white">{page.title}</h2>
              <p className="mt-4 font-inter text-sm leading-7 text-white/65">{page.quickAnswer}</p>
              <span className="mt-6 inline-flex items-center gap-2 font-orbitron text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF6801]">
                Open industry page <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
