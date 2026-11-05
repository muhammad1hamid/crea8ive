import Link from "next/link";
import { ArrowLeftRight, ArrowUpRight, CheckCircle2, FileText, MessageCircle, Scale } from "lucide-react";
import { BUSINESS_DETAILS, SITE_URL } from "@/lib/site-config";
import { comparisonPages, type ComparisonPage as ComparisonPageData } from "@/lib/comparison-pages";

function comparisonUrl(slug: string) {
  return `${SITE_URL}/compare/${slug}/`;
}

function JsonLd({ page }: { page: ComparisonPageData }) {
  const url = comparisonUrl(page.slug);
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: page.title,
        description: page.metaDescription,
        datePublished: page.updated,
        dateModified: page.updated,
        author: { "@id": `${SITE_URL}/syed-qamar-abbas/#person` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        mainEntityOfPage: { "@id": `${url}#webpage` },
        image: `${SITE_URL}/img/crea8iv-search-preview.png`,
        inLanguage: "en-PK",
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: page.metaTitle,
        description: page.metaDescription,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#business` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        inLanguage: "en-PK",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Comparisons", item: `${SITE_URL}/compare/` },
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
        name: "Crea8iv Media comparison pages",
        itemListElement: comparisonPages.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.title,
          url: comparisonUrl(item.slug),
        })),
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function ComparisonPage({ page }: { page: ComparisonPageData }) {
  const related = comparisonPages.filter((item) => item.slug !== page.slug).slice(0, 4);
  const whatsappHref = `https://wa.me/${BUSINESS_DETAILS.phone.replace(/[^0-9]/g, "")}?text=Hi%20Crea8iv%20Media%20-%20I%20read%20your%20comparison%20page%20and%20want%20help%20choosing%20the%20right%20option.`;

  return (
    <article className="native-page relative isolate overflow-hidden bg-[#050505] text-white">
      <JsonLd page={page} />

      <section className="px-6 pb-14 pt-44 lg:px-10 lg:pb-20">
        <div className="mx-auto max-w-[1180px]">
          <nav className="mb-8 flex flex-wrap items-center gap-2 font-inter text-sm text-white/55" aria-label="Breadcrumb">
            <Link href="/" className="transition hover:text-[#FF6801]">Home</Link>
            <span>/</span>
            <Link href="/compare/" className="transition hover:text-[#FF6801]">Comparisons</Link>
            <span>/</span>
            <span className="text-white/82">{page.title}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
            <div>
              <p className="lux-eyebrow mb-5">
                <ArrowLeftRight className="h-3.5 w-3.5" aria-hidden="true" /> {page.eyebrow}
              </p>
              <h1 className="max-w-4xl font-orbitron text-[clamp(2.35rem,6vw,5.1rem)] font-bold leading-[1.03] tracking-normal text-white">
                {page.h1}
              </h1>
              <p className="mt-6 max-w-3xl font-inter text-lg leading-8 text-white/70">{page.summary}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="portfolio-button justify-center">
                  Ask for recommendation <MessageCircle className="h-4 w-4" aria-hidden="true" />
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
              <div className="flex items-center gap-2 font-orbitron text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF6801]">
                <Scale className="h-4 w-4" aria-hidden="true" />
                Short verdict
              </div>
              <p className="mt-4 font-inter text-sm leading-7 text-white/70">{page.verdict}</p>
              <p className="mt-5 border-t border-white/10 pt-5 font-orbitron text-[10px] uppercase tracking-[0.14em] text-white/44">
                Updated {page.updated}
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 lg:px-10" aria-labelledby="best-fit-heading">
        <div className="mx-auto grid max-w-[1180px] gap-5 lg:grid-cols-2">
          <div className="lux-card p-6">
            <h2 id="best-fit-heading" className="font-orbitron text-2xl font-bold text-white">Best for {page.optionA}</h2>
            <ul className="mt-6 space-y-4">
              {page.bestForA.map((item) => (
                <li key={item} className="flex gap-3 font-inter text-sm leading-7 text-white/68">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#FF6801]" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lux-card p-6">
            <h2 className="font-orbitron text-2xl font-bold text-white">Best for {page.optionB}</h2>
            <ul className="mt-6 space-y-4">
              {page.bestForB.map((item) => (
                <li key={item} className="flex gap-3 font-inter text-sm leading-7 text-white/68">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#FF6801]" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 lg:px-10" aria-labelledby="comparison-table-heading">
        <div className="mx-auto max-w-[1180px]">
          <p className="lux-eyebrow mb-4">Comparison table</p>
          <h2 id="comparison-table-heading" className="font-orbitron text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight text-white">
            {page.optionA} vs {page.optionB}
          </h2>
          <div className="mt-8 overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.035]">
            <div className="grid border-b border-white/10 bg-white/[0.04] font-orbitron text-[10px] font-bold uppercase tracking-[0.16em] text-white/62 md:grid-cols-[0.8fr_1fr_1fr_0.9fr]">
              <div className="p-4">Factor</div>
              <div className="p-4">{page.optionA}</div>
              <div className="p-4">{page.optionB}</div>
              <div className="p-4">Recommendation</div>
            </div>
            {page.comparisonRows.map((row) => (
              <div key={row.factor} className="grid border-b border-white/10 last:border-b-0 md:grid-cols-[0.8fr_1fr_1fr_0.9fr]">
                <div className="p-4 font-orbitron text-sm font-semibold text-white">{row.factor}</div>
                <div className="p-4 font-inter text-sm leading-6 text-white/58">{row.optionA}</div>
                <div className="p-4 font-inter text-sm leading-6 text-white/72">{row.optionB}</div>
                <div className="p-4 font-inter text-sm font-semibold leading-6 text-[#FF6801]">{row.recommendation}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-12 lg:px-10">
        <div className="mx-auto grid max-w-[1180px] gap-5 md:grid-cols-3">
          {page.sections.map((section) => (
            <section key={section.title} className="lux-card h-full p-6">
              <h2 className="font-orbitron text-xl font-semibold leading-tight text-white">{section.title}</h2>
              <p className="mt-4 font-inter text-sm leading-7 text-white/65">{section.body}</p>
              <ul className="mt-5 space-y-3">
                {section.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 font-inter text-sm leading-6 text-white/68">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#FF6801]" aria-hidden="true" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>

      <section className="px-6 py-12 lg:px-10" aria-labelledby="evidence-heading">
        <div className="mx-auto max-w-[1180px]">
          <p className="lux-eyebrow mb-4">Evidence links</p>
          <h2 id="evidence-heading" className="font-orbitron text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight text-white">
            Related Crea8iv pages to verify the recommendation.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {page.evidenceLinks.map((link) => (
              <Link key={link.href} href={link.href} className="lux-card group block h-full p-5 transition hover:border-[#FF6801]/50">
                <FileText className="h-5 w-5 text-[#FF6801]" aria-hidden="true" />
                <h3 className="mt-4 font-orbitron text-base font-semibold text-white">{link.label}</h3>
                <p className="mt-2 font-inter text-sm leading-6 text-white/62">{link.note}</p>
                <span className="mt-5 inline-flex items-center gap-2 font-orbitron text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF6801]">
                  Open page <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-12 lg:px-10" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-[900px]">
          <p className="lux-eyebrow mb-4">FAQ schema</p>
          <h2 id="faq-heading" className="font-orbitron text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-tight text-white">
            Buyer questions.
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

      <section className="px-6 pb-20 pt-8 lg:px-10" aria-labelledby="related-comparisons-heading">
        <div className="mx-auto max-w-[1180px]">
          <p className="lux-eyebrow mb-4">More comparisons</p>
          <h2 id="related-comparisons-heading" className="font-orbitron text-2xl font-bold text-white">Related shortlist pages</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {related.map((item) => (
              <Link key={item.slug} href={`/compare/${item.slug}/`} className="lux-card block p-5 transition hover:border-[#FF6801]/50">
                <h3 className="font-orbitron text-base font-semibold text-white">{item.title}</h3>
                <p className="mt-2 line-clamp-2 font-inter text-sm leading-6 text-white/62">{item.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
