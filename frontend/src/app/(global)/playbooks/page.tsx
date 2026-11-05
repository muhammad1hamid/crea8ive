import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, ClipboardCheck } from "lucide-react";
import { playbookPages } from "@/lib/playbook-pages";
import { SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: { absolute: "Website and Software Playbooks Pakistan | Crea8iv Media" },
  description:
    "Step-by-step website, software, redesign and AI visibility playbooks for Pakistan businesses planning stronger digital growth systems.",
  alternates: { canonical: `${SITE_URL}/playbooks/` },
  openGraph: {
    title: "Website and Software Playbooks Pakistan | Crea8iv Media",
    description:
      "How-to playbooks for business websites, redesigns, custom software MVPs and AI visibility in Pakistan.",
    url: `${SITE_URL}/playbooks/`,
    type: "website",
    images: [{ url: `${SITE_URL}/img/crea8iv-search-preview.png`, width: 1200, height: 630, alt: "Crea8iv Media playbooks" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Website and Software Playbooks Pakistan | Crea8iv Media",
    description: "Step-by-step digital growth playbooks for Pakistan businesses.",
    images: [`${SITE_URL}/img/crea8iv-search-preview.png`],
  },
};

function JsonLd() {
  const url = `${SITE_URL}/playbooks/`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: "Website and Software Playbooks Pakistan",
        description:
          "Crea8iv Media playbooks for planning business websites, website redesigns, custom software MVPs and AI visibility.",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#business` },
        inLanguage: "en-PK",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Playbooks", item: url },
        ],
      },
      {
        "@type": "ItemList",
        name: "Crea8iv Media how-to playbooks",
        itemListElement: playbookPages.map((page, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: page.title,
          url: `${SITE_URL}/playbooks/${page.slug}/`,
        })),
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function PlaybooksPage() {
  return (
    <main className="native-page relative isolate overflow-hidden bg-[#050505] text-white">
      <JsonLd />
      <section className="px-6 pb-16 pt-44 lg:px-10 lg:pb-20">
        <div className="mx-auto max-w-[1180px]">
          <p className="lux-eyebrow mb-5">
            <ClipboardCheck className="h-3.5 w-3.5" aria-hidden="true" /> Playbook hub
          </p>
          <h1 className="max-w-4xl font-orbitron text-[clamp(2.4rem,6vw,5.2rem)] font-bold leading-[1.03] tracking-normal text-white">
            Step-by-step digital growth playbooks for Pakistan businesses.
          </h1>
          <p className="mt-6 max-w-3xl font-inter text-lg leading-8 text-white/70">
            These pages turn Crea8iv Media&apos;s website, software and AI visibility process into clear checklists:
            what to plan, what to verify, what to avoid and which next step makes sense before spending on a build.
          </p>
        </div>
      </section>

      <section className="px-6 pb-20 lg:px-10">
        <div className="mx-auto grid max-w-[1180px] gap-5 md:grid-cols-2">
          {playbookPages.map((page) => (
            <Link key={page.slug} href={`/playbooks/${page.slug}/`} className="lux-card group block h-full p-6 transition hover:border-[#FF6801]/50">
              <ClipboardCheck className="h-6 w-6 text-[#FF6801]" aria-hidden="true" />
              <p className="mt-5 font-orbitron text-[10px] font-bold uppercase tracking-[0.18em] text-[#FF6801]">{page.eyebrow}</p>
              <h2 className="mt-3 font-orbitron text-xl font-semibold leading-tight text-white">{page.title}</h2>
              <p className="mt-4 line-clamp-4 font-inter text-sm leading-7 text-white/64">{page.summary}</p>
              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                {page.bestFor.slice(0, 4).map((fit) => (
                  <div key={fit} className="flex gap-2 font-inter text-xs leading-5 text-white/52">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#FF6801]" aria-hidden="true" />
                    <span>{fit}</span>
                  </div>
                ))}
              </div>
              <span className="mt-6 inline-flex items-center gap-2 font-orbitron text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF6801]">
                Open playbook <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
