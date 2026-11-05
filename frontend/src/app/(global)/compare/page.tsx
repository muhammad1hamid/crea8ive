import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { comparisonPages } from "@/lib/comparison-pages";
import { SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: { absolute: "Website and Software Comparisons Pakistan | Crea8iv Media" },
  description:
    "Compare website companies, freelancers, WordPress, custom websites, growth agencies, SaaS MVPs and custom software options for Pakistan businesses.",
  alternates: { canonical: `${SITE_URL}/compare/` },
  openGraph: {
    title: "Website and Software Comparisons Pakistan | Crea8iv Media",
    description:
      "Decision pages for Pakistan businesses comparing website development, software development, SaaS, CRM and growth options.",
    url: `${SITE_URL}/compare/`,
    type: "website",
    images: [{ url: `${SITE_URL}/img/crea8iv-search-preview.png`, width: 1200, height: 630, alt: "Crea8iv Media comparison pages" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Website and Software Comparisons Pakistan | Crea8iv Media",
    description: "Comparison pages for website and software buyers in Pakistan.",
    images: [`${SITE_URL}/img/crea8iv-search-preview.png`],
  },
};

function JsonLd() {
  const url = `${SITE_URL}/compare/`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: "Website and Software Comparisons Pakistan",
        description:
          "Crea8iv Media comparison pages for website development, software development, SaaS, CRM and growth decisions in Pakistan.",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#business` },
        inLanguage: "en-PK",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Comparisons", item: url },
        ],
      },
      {
        "@type": "ItemList",
        name: "Crea8iv Media comparison pages",
        itemListElement: comparisonPages.map((page, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: page.title,
          url: `${SITE_URL}/compare/${page.slug}/`,
        })),
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function ComparePage() {
  return (
    <main className="native-page relative isolate overflow-hidden bg-[#050505] text-white">
      <JsonLd />
      <section className="px-6 pb-16 pt-44 lg:px-10 lg:pb-20">
        <div className="mx-auto max-w-[1180px]">
          <p className="lux-eyebrow mb-5">
            <ArrowLeftRight className="h-3.5 w-3.5" aria-hidden="true" /> Comparison hub
          </p>
          <h1 className="max-w-4xl font-orbitron text-[clamp(2.4rem,6vw,5.2rem)] font-bold leading-[1.03] tracking-normal text-white">
            Compare website, software and growth options before you spend.
          </h1>
          <p className="mt-6 max-w-3xl font-inter text-lg leading-8 text-white/70">
            These pages help Pakistan businesses compare common digital decisions:
            freelancer vs company, WordPress vs custom, developer vs growth agency,
            off-the-shelf tools vs custom software, and SaaS MVP vs full product.
          </p>
        </div>
      </section>

      <section className="px-6 pb-20 lg:px-10">
        <div className="mx-auto grid max-w-[1180px] gap-5 md:grid-cols-2 xl:grid-cols-3">
          {comparisonPages.map((page) => (
            <Link key={page.slug} href={`/compare/${page.slug}/`} className="lux-card group block h-full p-6 transition hover:border-[#FF6801]/50">
              <ArrowLeftRight className="h-6 w-6 text-[#FF6801]" aria-hidden="true" />
              <p className="mt-5 font-orbitron text-[10px] font-bold uppercase tracking-[0.18em] text-[#FF6801]">{page.eyebrow}</p>
              <h2 className="mt-3 font-orbitron text-xl font-semibold leading-tight text-white">{page.title}</h2>
              <p className="mt-4 line-clamp-4 font-inter text-sm leading-7 text-white/64">{page.summary}</p>
              <div className="mt-5 space-y-2">
                {[page.optionA, page.optionB].map((option) => (
                  <div key={option} className="flex gap-2 font-inter text-xs leading-5 text-white/52">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#FF6801]" aria-hidden="true" />
                    <span>{option}</span>
                  </div>
                ))}
              </div>
              <span className="mt-6 inline-flex items-center gap-2 font-orbitron text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF6801]">
                Compare options <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
