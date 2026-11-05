import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  FileText,
  MessageCircle,
  Scale,
} from "lucide-react";
import { BUSINESS_DETAILS, SITE_URL } from "@/lib/site-config";
import { authorityGuides, type AuthorityGuide } from "@/lib/authority-guides";

function guideUrl(slug: string) {
  return `${SITE_URL}/guides/${slug}/`;
}

function JsonLd({ guide }: { guide: AuthorityGuide }) {
  const url = guideUrl(guide.slug);
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: guide.title,
        description: guide.metaDescription,
        datePublished: guide.updated,
        dateModified: guide.updated,
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
        name: guide.metaTitle,
        description: guide.metaDescription,
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
          { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides/` },
          { "@type": "ListItem", position: 3, name: guide.title, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: guide.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
      {
        "@type": "ItemList",
        name: "Crea8iv Media website and software buyer guides",
        itemListElement: authorityGuides.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.title,
          url: guideUrl(item.slug),
        })),
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function AuthorityGuidePage({ guide }: { guide: AuthorityGuide }) {
  const relatedGuides = authorityGuides.filter((item) => item.slug !== guide.slug);

  return (
    <article className="native-page relative isolate overflow-hidden bg-[#050505] text-white">
      <JsonLd guide={guide} />

      <section className="px-6 pb-14 pt-44 lg:px-10 lg:pb-20">
        <div className="mx-auto max-w-[1180px]">
          <nav className="mb-8 flex flex-wrap items-center gap-2 font-inter text-sm text-white/55" aria-label="Breadcrumb">
            <Link href="/" className="transition hover:text-[#FF6801]">Home</Link>
            <span>/</span>
            <Link href="/guides/" className="transition hover:text-[#FF6801]">Guides</Link>
            <span>/</span>
            <span className="text-white/82">{guide.title}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
            <div>
              <p className="lux-eyebrow mb-5">{guide.eyebrow}</p>
              <h1 className="max-w-4xl font-orbitron text-[clamp(2.35rem,6vw,5.1rem)] font-bold leading-[1.03] tracking-normal text-white">
                {guide.h1}
              </h1>
              <p className="mt-6 max-w-3xl font-inter text-lg leading-8 text-white/70">{guide.summary}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link href={guide.primaryCta.href} className="portfolio-button justify-center">
                  {guide.primaryCta.label} <MessageCircle className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href={guide.secondaryCta.href}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 font-orbitron text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition hover:border-[#FF6801]/70 hover:text-[#FF6801]"
                >
                  {guide.secondaryCta.label} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <aside className="lux-card p-6">
              <div className="flex items-center gap-2 font-orbitron text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF6801]">
                <BookOpen className="h-4 w-4" aria-hidden="true" />
                Guide facts
              </div>
              <dl className="mt-5 space-y-5">
                <div className="border-b border-white/10 pb-5">
                  <dt className="font-orbitron text-[10px] uppercase tracking-[0.14em] text-white/44">Updated</dt>
                  <dd className="mt-1 font-inter text-sm text-white/72">{guide.updated}</dd>
                </div>
                <div className="border-b border-white/10 pb-5">
                  <dt className="font-orbitron text-[10px] uppercase tracking-[0.14em] text-white/44">Reading time</dt>
                  <dd className="mt-1 font-inter text-sm text-white/72">{guide.readingTime}</dd>
                </div>
                <div>
                  <dt className="font-orbitron text-[10px] uppercase tracking-[0.14em] text-white/44">Related service</dt>
                  <dd className="mt-2">
                    <Link href={guide.relatedService.href} className="inline-flex items-center gap-2 font-inter text-sm text-[#FF6801] hover:text-white">
                      {guide.relatedService.label} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 lg:px-10" aria-labelledby="target-queries-heading">
        <div className="mx-auto max-w-[1180px]">
          <div className="lux-card p-6">
            <p className="font-orbitron text-[10px] font-bold uppercase tracking-[0.18em] text-[#FF6801]">Query coverage</p>
            <h2 id="target-queries-heading" className="mt-3 font-orbitron text-2xl font-bold text-white">
              Search and AI-answer queries this guide supports.
            </h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {guide.targetQueries.map((query) => (
                <span key={query} className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 font-inter text-sm text-white/70">
                  {query}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 lg:px-10" aria-labelledby="criteria-heading">
        <div className="mx-auto max-w-[1180px]">
          <div className="mb-8">
            <p className="lux-eyebrow mb-4">Decision criteria</p>
            <h2 id="criteria-heading" className="font-orbitron text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight text-white">
              What buyers should check before hiring.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {guide.decisionCriteria.map((item) => (
              <div key={item.label} className="lux-card p-5">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#FF6801]" aria-hidden="true" />
                  <div>
                    <h3 className="font-orbitron text-[15px] font-semibold text-white">{item.label}</h3>
                    <p className="mt-2 font-inter text-sm leading-7 text-white/64">{item.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-12 lg:px-10" aria-labelledby="comparison-heading">
        <div className="mx-auto max-w-[1180px]">
          <p className="lux-eyebrow mb-4">Shortlist framework</p>
          <h2 id="comparison-heading" className="font-orbitron text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight text-white">
            Weak option vs strong option.
          </h2>
          <div className="mt-8 overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.035]">
            <div className="grid border-b border-white/10 bg-white/[0.04] font-orbitron text-[10px] font-bold uppercase tracking-[0.16em] text-white/62 md:grid-cols-[0.75fr_1fr_1fr]">
              <div className="p-4">Factor</div>
              <div className="p-4">Weak signal</div>
              <div className="p-4">Strong signal</div>
            </div>
            {guide.comparisonRows.map((row) => (
              <div key={row.factor} className="grid border-b border-white/10 last:border-b-0 md:grid-cols-[0.75fr_1fr_1fr]">
                <div className="p-4 font-orbitron text-sm font-semibold text-white">{row.factor}</div>
                <div className="p-4 font-inter text-sm leading-6 text-white/58">{row.weakOption}</div>
                <div className="p-4 font-inter text-sm leading-6 text-white/74">{row.strongOption}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-12 lg:px-10">
        <div className="mx-auto grid max-w-[1180px] gap-5 md:grid-cols-3">
          {guide.sections.map((section) => (
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

      <section className="px-6 py-12 lg:px-10" aria-labelledby="proof-links-heading">
        <div className="mx-auto max-w-[1180px]">
          <p className="lux-eyebrow mb-4">Proof and next reading</p>
          <h2 id="proof-links-heading" className="font-orbitron text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight text-white">
            Connected pages that reinforce this guide.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {guide.proofLinks.map((link) => (
              <Link key={link.href} href={link.href} className="lux-card group block h-full p-5 transition hover:border-[#FF6801]/50">
                <FileText className="h-5 w-5 text-[#FF6801]" aria-hidden="true" />
                <h3 className="mt-4 font-orbitron text-base font-semibold text-white">{link.label}</h3>
                <p className="mt-2 font-inter text-sm leading-6 text-white/62">{link.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 font-orbitron text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF6801]">
                  Open page <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-12 lg:px-10">
        <div className="mx-auto max-w-[900px]">
          <p className="lux-eyebrow mb-4">FAQ schema</p>
          <h2 className="font-orbitron text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-tight text-white">
            Direct answers for buyer and AI shortlist questions.
          </h2>
          <div className="mt-8 space-y-4">
            {guide.faqs.map((faq) => (
              <section key={faq.question} className="lux-card p-6">
                <h3 className="font-orbitron text-base font-semibold text-white">{faq.question}</h3>
                <p className="mt-3 font-inter text-sm leading-7 text-white/65">{faq.answer}</p>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-[980px] rounded-[28px] border border-[#FF6801]/25 bg-[linear-gradient(135deg,rgba(255,104,1,0.14),rgba(255,255,255,0.035))] p-8 text-center">
          <Scale className="mx-auto h-7 w-7 text-[#FF6801]" aria-hidden="true" />
          <h2 className="mt-5 font-orbitron text-[clamp(2rem,5vw,3.4rem)] font-bold leading-tight text-white">
            Need a practical recommendation for your business?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-inter text-base leading-8 text-white/68">
            Send your niche, current website or software idea, location and lead goal. The first call is used to map the best next step before you commit to a build.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/contact/" className="portfolio-button justify-center">
              Book free growth audit <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href={`https://wa.me/${BUSINESS_DETAILS.phone.replace(/[^0-9]/g, "")}?text=Hi%20Crea8iv%20Media%20-%20I%20read%20your%20guide%20and%20want%20to%20discuss%20a%20project.`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 font-orbitron text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition hover:border-[#FF6801]/70 hover:text-[#FF6801]"
            >
              WhatsApp now <MessageCircle className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 lg:px-10" aria-labelledby="related-guides-heading">
        <div className="mx-auto max-w-[1180px]">
          <p className="lux-eyebrow mb-4">More guides</p>
          <h2 id="related-guides-heading" className="font-orbitron text-2xl font-bold text-white">Related Crea8iv Media buyer guides</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {relatedGuides.map((item) => (
              <Link key={item.slug} href={`/guides/${item.slug}/`} className="lux-card block p-5 transition hover:border-[#FF6801]/50">
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
