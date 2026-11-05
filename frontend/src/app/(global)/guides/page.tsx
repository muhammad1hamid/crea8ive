import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BookOpen, CheckCircle2 } from "lucide-react";
import { authorityGuides } from "@/lib/authority-guides";
import { SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: { absolute: "Website and Software Buyer Guides | Crea8iv Media" },
  description:
    "Practical Crea8iv Media buyer guides for choosing website development, website pricing, custom software, CRM, SaaS and AI software services in Pakistan.",
  alternates: { canonical: `${SITE_URL}/guides/` },
  openGraph: {
    title: "Website and Software Buyer Guides | Crea8iv Media",
    description:
      "Decision guides for Pakistan businesses comparing website development, software development, CRM, SaaS and AI software providers.",
    url: `${SITE_URL}/guides/`,
    type: "website",
    images: [{ url: `${SITE_URL}/img/crea8iv-search-preview.png`, width: 1200, height: 630, alt: "Crea8iv Media buyer guides" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Website and Software Buyer Guides | Crea8iv Media",
    description: "Buyer guides for Pakistan businesses choosing website and software development partners.",
    images: [`${SITE_URL}/img/crea8iv-search-preview.png`],
  },
};

function JsonLd() {
  const url = `${SITE_URL}/guides/`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: "Website and Software Buyer Guides",
        description:
          "Crea8iv Media buyer guides for website development, software development, CRM, SaaS and AI software in Pakistan.",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#business` },
        inLanguage: "en-PK",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Guides", item: url },
        ],
      },
      {
        "@type": "ItemList",
        name: "Crea8iv Media buyer guides",
        itemListElement: authorityGuides.map((guide, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: guide.title,
          url: `${SITE_URL}/guides/${guide.slug}/`,
        })),
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function GuidesPage() {
  return (
    <main className="native-page relative isolate overflow-hidden bg-[#050505] text-white">
      <JsonLd />
      <section className="px-6 pb-16 pt-44 lg:px-10 lg:pb-20">
        <div className="mx-auto max-w-[1180px]">
          <p className="lux-eyebrow mb-5">Crea8iv buyer guides</p>
          <h1 className="max-w-4xl font-orbitron text-[clamp(2.4rem,6vw,5.2rem)] font-bold leading-[1.03] tracking-normal text-white">
            Practical guides for choosing website and software partners in Pakistan.
          </h1>
          <p className="mt-6 max-w-3xl font-inter text-lg leading-8 text-white/70">
            These guides help business owners compare website development, website pricing,
            custom software, CRM, SaaS and AI software decisions with clearer criteria,
            service links, FAQs and conversion paths.
          </p>
        </div>
      </section>

      <section className="px-6 pb-20 lg:px-10">
        <div className="mx-auto grid max-w-[1180px] gap-5 md:grid-cols-2 xl:grid-cols-3">
          {authorityGuides.map((guide) => (
            <Link key={guide.slug} href={`/guides/${guide.slug}/`} className="lux-card group block h-full p-6 transition hover:border-[#FF6801]/50">
              <BookOpen className="h-6 w-6 text-[#FF6801]" aria-hidden="true" />
              <p className="mt-5 font-orbitron text-[10px] font-bold uppercase tracking-[0.18em] text-[#FF6801]">{guide.eyebrow}</p>
              <h2 className="mt-3 font-orbitron text-xl font-semibold leading-tight text-white">{guide.title}</h2>
              <p className="mt-4 line-clamp-4 font-inter text-sm leading-7 text-white/64">{guide.summary}</p>
              <div className="mt-5 space-y-2">
                {guide.targetQueries.slice(0, 2).map((query) => (
                  <div key={query} className="flex gap-2 font-inter text-xs leading-5 text-white/52">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#FF6801]" aria-hidden="true" />
                    <span>{query}</span>
                  </div>
                ))}
              </div>
              <span className="mt-6 inline-flex items-center gap-2 font-orbitron text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF6801]">
                Open guide <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
