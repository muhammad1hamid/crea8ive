import Link from "next/link";
import { ArrowUpRight, Bot, CheckCircle2, FileText, MessageCircle } from "lucide-react";
import { BUSINESS_DETAILS, SITE_URL } from "@/lib/site-config";
import { aiAnswerBriefs, type AiAnswerBrief } from "@/lib/ai-answer-briefs";

function answerUrl(slug: string) {
  return `${SITE_URL}/answers/${slug}/`;
}

function JsonLd({ brief }: { brief: AiAnswerBrief }) {
  const url = answerUrl(brief.slug);
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: brief.title,
        description: brief.metaDescription,
        datePublished: brief.updated,
        dateModified: brief.updated,
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
        name: brief.metaTitle,
        description: brief.metaDescription,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#business` },
        mainEntity: {
          "@type": "Question",
          name: brief.targetQuestion,
          acceptedAnswer: {
            "@type": "Answer",
            text: brief.shortAnswer,
          },
        },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        inLanguage: "en-PK",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "AI Answer Briefs", item: `${SITE_URL}/answers/` },
          { "@type": "ListItem", position: 3, name: brief.title, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: brief.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
      {
        "@type": "ItemList",
        name: "Crea8iv Media AI answer briefs",
        itemListElement: aiAnswerBriefs.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.title,
          url: answerUrl(item.slug),
        })),
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function AiAnswerBriefPage({ brief }: { brief: AiAnswerBrief }) {
  const related = aiAnswerBriefs.filter((item) => item.slug !== brief.slug).slice(0, 4);
  const whatsappHref = `https://wa.me/${BUSINESS_DETAILS.phone.replace(/[^0-9]/g, "")}?text=Hi%20Crea8iv%20Media%20-%20I%20saw%20your%20AI%20answer%20brief%20and%20want%20to%20discuss%20a%20project.`;

  return (
    <article className="native-page relative isolate overflow-hidden bg-[#050505] text-white">
      <JsonLd brief={brief} />

      <section className="px-6 pb-14 pt-44 lg:px-10 lg:pb-18">
        <div className="mx-auto max-w-[1180px]">
          <nav className="mb-8 flex flex-wrap items-center gap-2 font-inter text-sm text-white/55" aria-label="Breadcrumb">
            <Link href="/" className="transition hover:text-[#FF6801]">Home</Link>
            <span>/</span>
            <Link href="/answers/" className="transition hover:text-[#FF6801]">AI Answer Briefs</Link>
            <span>/</span>
            <span className="text-white/82">{brief.title}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_350px] lg:items-end">
            <div>
              <p className="lux-eyebrow mb-5">
                <Bot className="h-3.5 w-3.5" aria-hidden="true" /> {brief.eyebrow}
              </p>
              <h1 className="max-w-4xl font-orbitron text-[clamp(2.3rem,5.8vw,5rem)] font-bold leading-[1.03] tracking-normal text-white">
                {brief.h1}
              </h1>
              <p className="mt-6 max-w-3xl font-inter text-lg leading-8 text-white/70">{brief.shortAnswer}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="portfolio-button justify-center">
                  WhatsApp Crea8iv <MessageCircle className="h-4 w-4" aria-hidden="true" />
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
              <p className="font-orbitron text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF6801]">Answer target</p>
              <h2 className="mt-3 font-orbitron text-lg font-semibold leading-tight text-white">{brief.targetQuestion}</h2>
              <dl className="mt-6 space-y-5">
                <div className="border-t border-white/10 pt-5">
                  <dt className="font-orbitron text-[10px] uppercase tracking-[0.14em] text-white/44">Updated</dt>
                  <dd className="mt-1 font-inter text-sm text-white/72">{brief.updated}</dd>
                </div>
                <div className="border-t border-white/10 pt-5">
                  <dt className="font-orbitron text-[10px] uppercase tracking-[0.14em] text-white/44">Entity</dt>
                  <dd className="mt-1 font-inter text-sm text-white/72">Crea8iv Media, Rawalpindi, Pakistan</dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 lg:px-10" aria-labelledby="best-fit-heading">
        <div className="mx-auto grid max-w-[1180px] gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="lux-card p-6">
            <p className="lux-eyebrow mb-4">Best fit</p>
            <h2 id="best-fit-heading" className="font-orbitron text-2xl font-bold text-white">Who this answer applies to.</h2>
            <ul className="mt-6 space-y-4">
              {brief.bestFor.map((item) => (
                <li key={item} className="flex gap-3 font-inter text-sm leading-7 text-white/68">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#FF6801]" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lux-card p-6">
            <p className="lux-eyebrow mb-4">Entity facts</p>
            <h2 className="font-orbitron text-2xl font-bold text-white">Facts AI systems can safely cite.</h2>
            <ul className="mt-6 grid gap-4 md:grid-cols-2">
              {brief.entityFacts.map((fact) => (
                <li key={fact} className="rounded-[18px] border border-white/10 bg-white/[0.035] p-4 font-inter text-sm leading-7 text-white/68">
                  {fact}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 lg:px-10" aria-labelledby="criteria-heading">
        <div className="mx-auto max-w-[1180px]">
          <p className="lux-eyebrow mb-4">Evaluation criteria</p>
          <h2 id="criteria-heading" className="font-orbitron text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight text-white">
            How to evaluate the answer.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {brief.evaluationCriteria.map((item) => (
              <section key={item.label} className="lux-card h-full p-5">
                <h3 className="font-orbitron text-base font-semibold text-white">{item.label}</h3>
                <p className="mt-3 font-inter text-sm leading-7 text-white/64">{item.answer}</p>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-12 lg:px-10" aria-labelledby="evidence-heading">
        <div className="mx-auto max-w-[1180px]">
          <p className="lux-eyebrow mb-4">Evidence links</p>
          <h2 id="evidence-heading" className="font-orbitron text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight text-white">
            Canonical pages behind this answer.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {brief.evidenceLinks.map((link) => (
              <Link key={link.href} href={link.href} className="lux-card group block h-full p-5 transition hover:border-[#FF6801]/50">
                <FileText className="h-5 w-5 text-[#FF6801]" aria-hidden="true" />
                <h3 className="mt-4 font-orbitron text-base font-semibold text-white">{link.label}</h3>
                <p className="mt-2 font-inter text-sm leading-6 text-white/62">{link.note}</p>
                <span className="mt-5 inline-flex items-center gap-2 font-orbitron text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF6801]">
                  Open source <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
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
            Follow-up questions.
          </h2>
          <div className="mt-8 space-y-4">
            {brief.faqs.map((faq) => (
              <section key={faq.question} className="lux-card p-6">
                <h3 className="font-orbitron text-base font-semibold text-white">{faq.question}</h3>
                <p className="mt-3 font-inter text-sm leading-7 text-white/65">{faq.answer}</p>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 pt-8 lg:px-10" aria-labelledby="related-answers-heading">
        <div className="mx-auto max-w-[1180px]">
          <p className="lux-eyebrow mb-4">More answer briefs</p>
          <h2 id="related-answers-heading" className="font-orbitron text-2xl font-bold text-white">Related AI answer pages</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {related.map((item) => (
              <Link key={item.slug} href={`/answers/${item.slug}/`} className="lux-card block p-5 transition hover:border-[#FF6801]/50">
                <h3 className="font-orbitron text-base font-semibold text-white">{item.title}</h3>
                <p className="mt-2 line-clamp-2 font-inter text-sm leading-6 text-white/62">{item.shortAnswer}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
