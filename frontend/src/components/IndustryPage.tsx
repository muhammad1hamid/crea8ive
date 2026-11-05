import Link from "next/link";
import { ArrowUpRight, Building2, CheckCircle2, FileText, Layers3, MessageCircle } from "lucide-react";
import { BUSINESS_DETAILS, SITE_URL } from "@/lib/site-config";
import { industryPages, type IndustryPage as IndustryPageData } from "@/lib/industry-pages";

function industryUrl(slug: string) {
  return `${SITE_URL}/industries/${slug}/`;
}

function isExternal(href: string) {
  return href.startsWith("http");
}

function JsonLd({ page }: { page: IndustryPageData }) {
  const url = industryUrl(page.slug);
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: page.metaTitle,
        description: page.metaDescription,
        dateModified: page.updated,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#business` },
        provider: { "@id": `${SITE_URL}/#organization` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        mainEntity: { "@id": `${url}#industry-service-stack` },
        inLanguage: "en-PK",
      },
      {
        "@type": "ItemList",
        "@id": `${url}#industry-service-stack`,
        name: `${page.title} service stack`,
        itemListElement: page.serviceStack.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          url: isExternal(item.href) ? item.href : `${SITE_URL}${item.href}`,
          description: item.role,
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Industries", item: `${SITE_URL}/industries/` },
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
        name: "Crea8iv Media industry solution pages",
        itemListElement: industryPages.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.title,
          url: industryUrl(item.slug),
        })),
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function IndustryPage({ page }: { page: IndustryPageData }) {
  const related = industryPages.filter((item) => item.slug !== page.slug).slice(0, 4);
  const whatsappHref = `https://wa.me/${BUSINESS_DETAILS.phone.replace(/[^0-9]/g, "")}?text=Hi%20Crea8iv%20Media%20-%20I%20saw%20your%20${encodeURIComponent(page.title)}%20page%20and%20want%20to%20discuss%20a%20project.`;

  return (
    <article className="native-page relative isolate overflow-hidden bg-[#050505] text-white">
      <JsonLd page={page} />

      <section className="px-6 pb-14 pt-44 lg:px-10 lg:pb-20">
        <div className="mx-auto max-w-[1180px]">
          <nav className="mb-8 flex flex-wrap items-center gap-2 font-inter text-sm text-white/55" aria-label="Breadcrumb">
            <Link href="/" className="transition hover:text-[#FF6801]">Home</Link>
            <span>/</span>
            <Link href="/industries/" className="transition hover:text-[#FF6801]">Industries</Link>
            <span>/</span>
            <span className="text-white/82">{page.title}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
            <div>
              <p className="lux-eyebrow mb-5">
                <Building2 className="h-3.5 w-3.5" aria-hidden="true" /> {page.eyebrow}
              </p>
              <h1 className="max-w-4xl font-orbitron text-[clamp(2.25rem,5.8vw,5rem)] font-bold leading-[1.03] tracking-normal text-white">
                {page.h1}
              </h1>
              <p className="mt-6 max-w-3xl font-inter text-lg leading-8 text-white/70">{page.quickAnswer}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="portfolio-button justify-center">
                  Discuss this industry <MessageCircle className="h-4 w-4" aria-hidden="true" />
                </a>
                <Link
                  href="/contact/"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 font-orbitron text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition hover:border-[#FF6801]/70 hover:text-[#FF6801]"
                >
                  Book free audit <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <aside className="lux-card p-6">
              <p className="font-orbitron text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF6801]">Best fit</p>
              <h2 className="mt-3 font-orbitron text-xl font-semibold leading-tight text-white">{page.audience}</h2>
              <p className="mt-6 border-t border-white/10 pt-5 font-orbitron text-[10px] uppercase tracking-[0.14em] text-white/44">
                Updated {page.updated}
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 lg:px-10" aria-labelledby="pain-points-heading">
        <div className="mx-auto grid max-w-[1180px] gap-5 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="lux-eyebrow mb-4">Buyer intent</p>
            <h2 id="pain-points-heading" className="font-orbitron text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight text-white">
              What buyers need before they contact you.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {page.painPoints.map((item) => (
              <div key={item} className="lux-card p-5">
                <CheckCircle2 className="h-5 w-5 text-[#FF6801]" aria-hidden="true" />
                <p className="mt-4 font-inter text-sm leading-7 text-white/68">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-12 lg:px-10" aria-labelledby="stack-heading">
        <div className="mx-auto max-w-[1180px]">
          <p className="lux-eyebrow mb-4">
            <Layers3 className="h-3.5 w-3.5" aria-hidden="true" /> Service stack
          </p>
          <h2 id="stack-heading" className="max-w-3xl font-orbitron text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight text-white">
            The connected services this industry usually needs.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {page.serviceStack.map((item, index) => (
              <Link key={item.name} href={item.href} className="lux-card group block h-full p-5 transition hover:border-[#FF6801]/50">
                <span className="font-orbitron text-[10px] font-bold uppercase tracking-[0.16em] text-white/36">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 font-orbitron text-xl font-semibold leading-tight text-white">{item.name}</h3>
                <p className="mt-3 font-inter text-sm leading-7 text-white/64">{item.role}</p>
                <span className="mt-5 inline-flex items-center gap-2 font-orbitron text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF6801]">
                  Open service <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-12 lg:px-10" aria-labelledby="proof-heading">
        <div className="mx-auto max-w-[1180px]">
          <p className="lux-eyebrow mb-4">Proof and source links</p>
          <h2 id="proof-heading" className="font-orbitron text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight text-white">
            Pages that support this recommendation.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {page.proofLinks.map((link) => {
              const card = (
                <span className="lux-card group block h-full p-5 transition hover:border-[#FF6801]/50">
                  <FileText className="h-5 w-5 text-[#FF6801]" aria-hidden="true" />
                  <span className="mt-4 block font-orbitron text-base font-semibold text-white">{link.label}</span>
                  <span className="mt-2 block font-inter text-sm leading-6 text-white/62">{link.note}</span>
                  <span className="mt-5 inline-flex items-center gap-2 font-orbitron text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF6801]">
                    Open proof <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                  </span>
                </span>
              );

              return isExternal(link.href) ? (
                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                  {card}
                </a>
              ) : (
                <Link key={link.href} href={link.href}>
                  {card}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-12 lg:px-10" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-[900px]">
          <p className="lux-eyebrow mb-4">FAQ schema</p>
          <h2 id="faq-heading" className="font-orbitron text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-tight text-white">
            Questions buyers ask before choosing an agency.
          </h2>
          <div className="mt-8 space-y-4">
            {page.faqs.map((faq) => (
              <section key={faq.question} className="lux-card p-6">
                <h3 className="font-orbitron text-base font-semibold text-white">{faq.question}</h3>
                <p className="mt-3 font-inter text-sm leading-7 text-white/65">{faq.answer}</p>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-14 lg:px-10">
        <div className="mx-auto max-w-[1180px]">
          <div className="lux-card p-7 md:p-9">
            <p className="lux-eyebrow mb-4">Related industries</p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <Link key={item.slug} href={`/industries/${item.slug}/`} className="rounded-[18px] border border-white/10 bg-white/[0.035] p-4 transition hover:border-[#FF6801]/55">
                  <span className="font-orbitron text-sm font-semibold text-white">{item.title}</span>
                  <span className="mt-2 block font-inter text-xs leading-5 text-white/55">{item.audience}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
