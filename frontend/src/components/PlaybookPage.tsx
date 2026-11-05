import Link from "next/link";
import { ArrowUpRight, CheckCircle2, ClipboardCheck, FileText, MessageCircle, Route } from "lucide-react";
import { BUSINESS_DETAILS, SITE_URL } from "@/lib/site-config";
import { playbookPages, type PlaybookPage as PlaybookPageData } from "@/lib/playbook-pages";

function playbookUrl(slug: string) {
  return `${SITE_URL}/playbooks/${slug}/`;
}

function JsonLd({ page }: { page: PlaybookPageData }) {
  const url = playbookUrl(page.slug);
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HowTo",
        "@id": `${url}#howto`,
        name: page.title,
        description: page.summary,
        datePublished: page.updated,
        dateModified: page.updated,
        author: { "@id": `${SITE_URL}/syed-qamar-abbas/#person` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        image: `${SITE_URL}/img/crea8iv-search-preview.png`,
        step: page.steps.map((step, index) => ({
          "@type": "HowToStep",
          position: index + 1,
          name: step.name,
          text: step.text,
        })),
      },
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
        mainEntity: { "@id": `${url}#howto` },
        inLanguage: "en-PK",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Playbooks", item: `${SITE_URL}/playbooks/` },
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
        name: "Crea8iv Media how-to playbooks",
        itemListElement: playbookPages.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.title,
          url: playbookUrl(item.slug),
        })),
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function PlaybookPage({ page }: { page: PlaybookPageData }) {
  const related = playbookPages.filter((item) => item.slug !== page.slug).slice(0, 3);
  const whatsappHref = `https://wa.me/${BUSINESS_DETAILS.phone.replace(/[^0-9]/g, "")}?text=Hi%20Crea8iv%20Media%20-%20I%20read%20your%20playbook%20and%20want%20help%20planning%20my%20project.`;

  return (
    <article className="native-page relative isolate overflow-hidden bg-[#050505] text-white">
      <JsonLd page={page} />

      <section className="px-6 pb-14 pt-44 lg:px-10 lg:pb-20">
        <div className="mx-auto max-w-[1180px]">
          <nav className="mb-8 flex flex-wrap items-center gap-2 font-inter text-sm text-white/55" aria-label="Breadcrumb">
            <Link href="/" className="transition hover:text-[#FF6801]">Home</Link>
            <span>/</span>
            <Link href="/playbooks/" className="transition hover:text-[#FF6801]">Playbooks</Link>
            <span>/</span>
            <span className="text-white/82">{page.title}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
            <div>
              <p className="lux-eyebrow mb-5">
                <ClipboardCheck className="h-3.5 w-3.5" aria-hidden="true" /> {page.eyebrow}
              </p>
              <h1 className="max-w-4xl font-orbitron text-[clamp(2.35rem,6vw,5.1rem)] font-bold leading-[1.03] tracking-normal text-white">
                {page.h1}
              </h1>
              <p className="mt-6 max-w-3xl font-inter text-lg leading-8 text-white/70">{page.summary}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="portfolio-button justify-center">
                  Plan this with us <MessageCircle className="h-4 w-4" aria-hidden="true" />
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
                <Route className="h-4 w-4" aria-hidden="true" />
                Expected outcome
              </div>
              <p className="mt-4 font-inter text-sm leading-7 text-white/70">{page.outcome}</p>
              <p className="mt-5 border-t border-white/10 pt-5 font-orbitron text-[10px] uppercase tracking-[0.14em] text-white/44">
                Updated {page.updated}
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 lg:px-10" aria-labelledby="best-fit-heading">
        <div className="mx-auto max-w-[1180px]">
          <p className="lux-eyebrow mb-4">Best fit</p>
          <h2 id="best-fit-heading" className="font-orbitron text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight text-white">
            Use this playbook when the project needs structure before execution.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {page.bestFor.map((item) => (
              <div key={item} className="lux-card p-5">
                <CheckCircle2 className="h-5 w-5 text-[#FF6801]" aria-hidden="true" />
                <p className="mt-4 font-inter text-sm font-semibold leading-6 text-white/78">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-12 lg:px-10" aria-labelledby="steps-heading">
        <div className="mx-auto max-w-[1180px]">
          <p className="lux-eyebrow mb-4">HowTo schema</p>
          <h2 id="steps-heading" className="font-orbitron text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight text-white">
            Step-by-step checklist.
          </h2>
          <div className="mt-8 space-y-5">
            {page.steps.map((step, index) => (
              <section key={step.name} className="lux-card grid gap-6 p-6 lg:grid-cols-[120px_minmax(0,1fr)_340px]">
                <div className="font-orbitron text-5xl font-bold leading-none text-white/12">{String(index + 1).padStart(2, "0")}</div>
                <div>
                  <h3 className="font-orbitron text-xl font-semibold text-white">{step.name}</h3>
                  <p className="mt-4 font-inter text-sm leading-7 text-white/65">{step.text}</p>
                </div>
                <ul className="space-y-3">
                  {step.checks.map((check) => (
                    <li key={check} className="flex gap-3 font-inter text-sm leading-6 text-white/68">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#FF6801]" aria-hidden="true" />
                      <span>{check}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-12 lg:px-10" aria-labelledby="support-heading">
        <div className="mx-auto grid max-w-[1180px] gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="lux-eyebrow mb-4">Support system</p>
            <h2 id="support-heading" className="font-orbitron text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight text-white">
              What Crea8iv Media connects around this work.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {page.tools.map((tool) => (
              <div key={tool.name} className="lux-card p-5">
                <h3 className="font-orbitron text-base font-semibold text-white">{tool.name}</h3>
                <p className="mt-3 font-inter text-sm leading-6 text-white/62">{tool.purpose}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-12 lg:px-10" aria-labelledby="evidence-heading">
        <div className="mx-auto max-w-[1180px]">
          <p className="lux-eyebrow mb-4">Evidence links</p>
          <h2 id="evidence-heading" className="font-orbitron text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight text-white">
            Related pages that support this playbook.
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
            Questions this playbook answers.
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

      <section className="px-6 pb-20 pt-8 lg:px-10" aria-labelledby="related-playbooks-heading">
        <div className="mx-auto max-w-[1180px]">
          <p className="lux-eyebrow mb-4">More playbooks</p>
          <h2 id="related-playbooks-heading" className="font-orbitron text-2xl font-bold text-white">Related planning pages</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <Link key={item.slug} href={`/playbooks/${item.slug}/`} className="lux-card block p-5 transition hover:border-[#FF6801]/50">
                <h3 className="font-orbitron text-base font-semibold text-white">{item.title}</h3>
                <p className="mt-2 line-clamp-3 font-inter text-sm leading-6 text-white/62">{item.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
