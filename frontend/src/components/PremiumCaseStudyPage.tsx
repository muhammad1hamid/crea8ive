import Image from "next/image";
import { CaseConsultingContext } from "@/components/ConsultingContext";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CheckCircle2,
  ClipboardCheck,
  ExternalLink,
  FileText,
  Globe2,
  Layers3,
  MessageCircle,
  MonitorSmartphone,
  SearchCheck,
  Sparkles,
  TableProperties,
} from "lucide-react";
import { BUSINESS_DETAILS, SITE_URL } from "@/lib/site-config";
import type { PremiumCaseStudy } from "@/lib/premium-case-studies";
import EvidenceMedia from "@/components/EvidenceMedia";
import styles from "./case-study-body.module.css";

type PremiumCaseStudyPageProps = {
  study: PremiumCaseStudy;
};

function absoluteUrl(path: string) {
  return path.startsWith("http") ? path : `${SITE_URL}${path}`;
}

function createWhatsappHref(study: PremiumCaseStudy) {
  const phone = BUSINESS_DETAILS.phone.replace(/[^0-9]/g, "");
  const text = `Hi Crea8iv Media - I viewed the ${study.clientName} case study and want to discuss a similar project.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

function JsonLd({ study }: PremiumCaseStudyPageProps) {
  const faqId = `${study.caseStudyUrl}#faq`;
  const graph: Array<Record<string, unknown>> = [
    {
      "@type": ["CreativeWork", "Article"],
      "@id": `${study.caseStudyUrl}#creative-work`,
      name: study.metaTitle,
      headline: study.heroTitle,
      genre: "Case Study",
      description: study.metaDescription,
      url: study.caseStudyUrl,
      image: absoluteUrl(study.socialImage),
      inLanguage: "en-PK",
      dateModified: "2026-10-01",
      author: { "@id": `${SITE_URL}/#organization` },
      publisher: { "@id": `${SITE_URL}/#organization` },
      creator: { "@id": `${SITE_URL}/#organization` },
      provider: { "@id": `${SITE_URL}/#organization` },
      about: {
        "@type": "Organization",
        "@id": `${study.clientUrl}#organization`,
        name: study.clientName,
        legalName: study.clientLegalName,
        url: study.clientUrl,
        areaServed: study.market,
        description: study.industry,
      },
      workExample: study.deliverables,
      mainEntityOfPage: { "@id": `${study.caseStudyUrl}#webpage` },
    },
    {
      "@type": "WebPage",
      "@id": `${study.caseStudyUrl}#webpage`,
      url: study.caseStudyUrl,
      name: study.metaTitle,
      description: study.metaDescription,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${study.caseStudyUrl}#creative-work` },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: absoluteUrl(study.socialImage),
      },
      breadcrumb: { "@id": `${study.caseStudyUrl}#breadcrumb` },
      inLanguage: "en-PK",
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${study.caseStudyUrl}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Case Studies", item: `${SITE_URL}/case-studies/` },
        { "@type": "ListItem", position: 3, name: study.clientName, item: study.caseStudyUrl },
      ],
    },
  ];

  if (study.faq?.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": faqId,
      mainEntity: study.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    });
  }

  const data = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="lux-eyebrow mb-4">
      <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> {children}
    </p>
  );
}

export default function PremiumCaseStudyPage({ study }: PremiumCaseStudyPageProps) {
  const whatsappHref = createWhatsappHref(study);
  const style = {
    "--case-accent": "var(--icon-color)",
    "--case-accent-soft": "var(--green-soft)",
  } as CSSProperties;

  return (
    <article className={`native-page relative isolate overflow-hidden bg-[#050505] text-white ${styles.page}`} style={style}>
      <JsonLd study={study} />

      <section className="relative overflow-hidden px-6 pb-16 pt-44 lg:px-10 lg:pb-24">
        <div className="relative mx-auto grid max-w-[1320px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <nav className="mb-8 flex flex-wrap items-center gap-2 font-inter text-sm text-white/55" aria-label="Breadcrumb">
              <Link href="/" className="transition hover:text-[var(--case-accent)]">Home</Link>
              <span>/</span>
              <Link href="/case-studies/" className="transition hover:text-[var(--case-accent)]">Case Studies</Link>
              <span>/</span>
              <span className="text-white/82">{study.clientName}</span>
            </nav>
            <p className="lux-eyebrow mb-5">
              <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" /> {study.eyebrow}
            </p>
            <h1 className="max-w-5xl font-orbitron text-[clamp(2rem,5vw,4.6rem)] font-bold leading-[1.05] tracking-normal text-white">
              {study.heroTitle}
            </h1>
            <p className="mt-6 max-w-3xl font-inter text-lg leading-8 text-white/70">{study.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {[study.industry, study.location, study.statusLabel].map((item) => (
                <span key={item} className="rounded-full border border-white/12 bg-white/[0.045] px-4 py-2 font-inter text-xs text-white/72">
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href={study.clientUrl} target="_blank" rel="noopener noreferrer" className="portfolio-button justify-center">
                View Live Website <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="portfolio-text-link justify-center">
                Start a Similar Project <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            {study.clientAnchorText ? (
              <p className="mt-5 font-inter text-sm leading-7 text-white/58">
                Live project:{" "}
                <a href={study.clientUrl} target="_blank" rel="noopener noreferrer" className="text-white underline decoration-[var(--case-accent)] underline-offset-4 transition hover:text-[var(--case-accent)]">
                  {study.clientAnchorText}
                </a>
              </p>
            ) : null}
          </div>
          <figure className="case-study-media-card overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] shadow-2xl shadow-black/40">
            <div className="case-study-media-stage relative aspect-[16/11] bg-black/60">
              <Image
                src={study.heroImage.src}
                alt={study.heroImage.alt}
                fill
                className="object-contain object-center"
                sizes="(min-width: 1024px) 54vw, 100vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
            </div>
            <figcaption className="border-t border-white/10 px-5 py-4 font-inter text-sm text-white/62">{study.heroImage.caption}</figcaption>
          </figure>
        </div>
      </section>

      <section className="px-6 py-14 lg:px-10">
        <div className="mx-auto max-w-[1320px]">
          <SectionLabel>Project Snapshot</SectionLabel>
          <div className="grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-3">
            {study.snapshot.map((item) => (
              <div key={item.label} className="bg-[#0d0d0d] p-6">
                <p className="font-inter text-xs uppercase tracking-[0.24em] text-white/38">{item.label}</p>
                <p className="mt-3 font-inter text-base leading-7 text-white/80">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {study.overview ? (
        <section className="px-6 py-16 lg:px-10">
          <div className="mx-auto grid max-w-[1320px] gap-8 rounded-lg border border-white/10 bg-white/[0.035] p-7 md:p-10 lg:grid-cols-[0.82fr_1.18fr]">
            <div>
              <SectionLabel>Project Overview</SectionLabel>
              <h2 className="font-syne text-[clamp(2rem,4vw,3.4rem)] font-semibold leading-tight tracking-normal text-white">
                {study.overview.title}
              </h2>
            </div>
            <div>
              <p className="font-inter text-lg leading-8 text-white/70">{study.overview.body}</p>
              {study.overview.points?.length ? (
                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {study.overview.points.map((point) => (
                    <div key={point} className="flex gap-3">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[var(--case-accent)]" aria-hidden="true" />
                      <p className="font-inter text-sm leading-7 text-white/68">{point}</p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      <section className="px-6 py-16 lg:px-10">
        <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <SectionLabel>The Challenge</SectionLabel>
            <h2 className="font-syne text-[clamp(2rem,4vw,3.6rem)] font-semibold leading-tight tracking-normal text-white">
              More than a beautiful website.
            </h2>
            <p className="mt-5 font-inter text-lg leading-8 text-white/68">{study.challenge.intro}</p>
          </div>
          <div className="grid gap-4">
            {study.challenge.points.map((point) => (
              <div key={point} className="flex gap-4 rounded-lg border border-white/10 bg-white/[0.035] p-5">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[var(--case-accent)]" aria-hidden="true" />
                <p className="font-inter text-base leading-7 text-white/74">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-10">
        <div className="mx-auto max-w-[1320px]">
          <SectionLabel>The Strategy</SectionLabel>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {study.strategy.map((item, index) => (
              <article key={item.title} className="rounded-lg border border-white/10 bg-white/[0.035] p-6">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-md border border-white/10 bg-[var(--case-accent-soft)] text-[var(--case-accent)]">
                  {index % 4 === 0 ? <Layers3 className="h-5 w-5" /> : index % 4 === 1 ? <MessageCircle className="h-5 w-5" /> : index % 4 === 2 ? <SearchCheck className="h-5 w-5" /> : <Globe2 className="h-5 w-5" />}
                </div>
                <h3 className="font-syne text-2xl font-semibold tracking-normal text-white">{item.title}</h3>
                <p className="mt-4 font-inter text-sm leading-7 text-white/65">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-10">
        <div className="mx-auto grid max-w-[1320px] gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <figure className="case-study-media-card overflow-hidden rounded-lg border border-white/10 bg-white/[0.035]">
            <div className="case-study-media-stage relative aspect-[16/10] bg-black/65">
              <Image
                src={study.desktopImage.src}
                alt={study.desktopImage.alt}
                fill
                className="object-contain object-center p-1"
                sizes="(min-width: 1024px) 56vw, 100vw"
              />
            </div>
            <figcaption className="border-t border-white/10 px-5 py-4 font-inter text-sm text-white/62">{study.desktopImage.caption}</figcaption>
          </figure>
          <div className="rounded-lg border border-white/10 bg-white/[0.035] p-7">
            <SectionLabel>{study.execution.title}</SectionLabel>
            <p className="font-inter text-lg leading-8 text-white/70">{study.execution.body}</p>
            <div className="mt-7 grid gap-3">
              {study.execution.points.map((point) => (
                <div key={point} className="flex gap-3">
                  <ClipboardCheck className="mt-1 h-4 w-4 shrink-0 text-[var(--case-accent)]" aria-hidden="true" />
                  <p className="font-inter text-sm leading-7 text-white/68">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-10">
        <div className="mx-auto grid max-w-[1320px] gap-8 lg:grid-cols-[0.74fr_1.26fr]">
          <figure className="case-study-media-card overflow-hidden rounded-lg border border-white/10 bg-white/[0.035]">
            <div className="case-study-media-stage relative aspect-[9/16] max-h-[820px] bg-black/65">
              <Image
                src={study.mobileImage.src}
                alt={study.mobileImage.alt}
                fill
                className="object-contain object-center"
                sizes="(min-width: 1024px) 32vw, 86vw"
              />
            </div>
            <figcaption className="border-t border-white/10 px-5 py-4 font-inter text-sm text-white/62">{study.mobileImage.caption}</figcaption>
          </figure>
          <div>
            <SectionLabel>Key Deliverables</SectionLabel>
            <div className="grid gap-3 sm:grid-cols-2">
              {study.deliverables.map((item) => (
                <div key={item} className="rounded-lg border border-white/10 bg-white/[0.035] px-5 py-4">
                  <p className="font-inter text-sm font-semibold leading-6 text-white/82">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 rounded-lg border border-white/10 bg-[var(--case-accent-soft)] p-7">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-md bg-black/25 text-[var(--case-accent)]">
                <FileText className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="font-syne text-3xl font-semibold tracking-normal text-white">{study.evidenceTitle}</h2>
              <p className="mt-4 font-inter text-base leading-8 text-white/72">{study.evidenceCopy}</p>
            </div>
          </div>
        </div>
      </section>

      {study.responsiveShowcase ? (
        <section className="px-6 py-16 lg:px-10">
          <div className="mx-auto grid max-w-[1320px] gap-8 rounded-lg border border-white/10 bg-white/[0.035] p-5 md:p-7 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:p-9">
            <div>
              <SectionLabel>Responsive Showcase</SectionLabel>
              <h2 className="font-syne text-[clamp(2rem,4vw,3.6rem)] font-semibold leading-tight tracking-normal text-white">
                {study.responsiveShowcase.title}
              </h2>
              <p className="mt-5 font-inter text-base leading-8 text-white/68">{study.responsiveShowcase.body}</p>
              {study.responsiveShowcase.points?.length ? (
                <div className="mt-7 grid gap-3">
                  {study.responsiveShowcase.points.map((point) => (
                    <div key={point} className="flex gap-3">
                      <MonitorSmartphone className="mt-1 h-4 w-4 shrink-0 text-[var(--case-accent)]" aria-hidden="true" />
                      <p className="font-inter text-sm leading-7 text-white/68">{point}</p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
            <figure className="case-study-media-card overflow-hidden rounded-lg border border-white/10 bg-black/45">
              <div className="case-study-media-stage relative aspect-[16/11] bg-black/75">
                <Image
                  src={study.responsiveShowcase.src}
                  alt={study.responsiveShowcase.alt}
                  fill
                  className="object-contain object-center"
                  sizes="(min-width: 1024px) 52vw, 92vw"
                />
              </div>
              <figcaption className="border-t border-white/10 px-5 py-4 font-inter text-sm text-white/62">{study.responsiveShowcase.caption}</figcaption>
            </figure>
          </div>
        </section>
      ) : null}

      <section className="px-6 py-16 lg:px-10">
        <div className="mx-auto max-w-[1320px]">
          <SectionLabel>Creative Consistency</SectionLabel>
          {study.slug === "home-studio-interiors" ? (
            <p className="mb-7 max-w-3xl font-inter text-base leading-8 text-white/64">
              The Home Studio Interiors social proof is shown as complete supplied grid screenshots, so the full content direction can be inspected instead of cropped into small decorative previews.
            </p>
          ) : null}
          <div className="horizontal-scroll-region case-study-rail grid grid-flow-col auto-cols-[minmax(300px,86vw)] gap-5 overflow-x-auto pb-4 md:grid-flow-row md:auto-cols-auto md:grid-cols-2 md:overflow-visible xl:grid-cols-3">
            {study.creativeExamples.map((item) => (
              <article key={item.title} className="case-study-media-card overflow-hidden rounded-lg border border-white/10 bg-white/[0.035]">
                <div className={`case-study-media-stage relative bg-black/70 ${study.slug === "home-studio-interiors" ? "aspect-[9/18]" : "aspect-[9/16]"}`}>
                  <EvidenceMedia src={item.src} alt={item.alt} className="object-contain object-center" sizes="(min-width: 1280px) 31vw, (min-width: 768px) 48vw, 86vw" />
                </div>
                <div className="border-t border-white/10 p-6">
                  <h3 className="font-syne text-2xl font-semibold tracking-normal text-white">{item.title}</h3>
                  <p className="mt-3 font-inter text-sm leading-7 text-white/64">{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {study.evidenceMetrics?.length ? (
        <section className="px-6 py-16 lg:px-10">
          <div className="mx-auto max-w-[1320px]">
            <SectionLabel>Verified Performance Evidence</SectionLabel>
            <div className="grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 md:grid-cols-2 xl:grid-cols-4">
              {study.evidenceMetrics.map((metric) => (
                <div key={`${metric.label}-${metric.value}`} className="bg-[#0d0d0d] p-6">
                  <p className="font-inter text-xs uppercase tracking-[0.22em] text-white/42">{metric.label}</p>
                  <p className="mt-4 font-orbitron text-[clamp(1.7rem,3vw,2.7rem)] font-bold leading-none text-white">{metric.value}</p>
                  <p className="mt-4 font-inter text-sm leading-7 text-white/62">{metric.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {study.proofGallery?.length ? (
        <section className="px-6 py-16 lg:px-10">
          <div className="mx-auto max-w-[1320px]">
            <SectionLabel>Evidence Gallery</SectionLabel>
            <div className="horizontal-scroll-region case-study-rail grid grid-flow-col auto-cols-[minmax(310px,88vw)] gap-5 overflow-x-auto pb-4 md:grid-flow-row md:auto-cols-auto md:grid-cols-2 md:overflow-visible">
              {study.proofGallery.map((item) => (
                <article key={item.src} className="case-study-media-card overflow-hidden rounded-lg border border-white/10 bg-white/[0.035]">
                  <div className="case-study-media-stage relative aspect-[16/10] bg-black/70">
                    <EvidenceMedia src={item.src} alt={item.alt} className="object-contain object-center" sizes="(min-width: 1024px) 48vw, 88vw" />
                  </div>
                  <div className="border-t border-white/10 p-6">
                    <h3 className="font-syne text-2xl font-semibold tracking-normal text-white">{item.title}</h3>
                    <p className="mt-3 font-inter text-sm leading-7 text-white/64">{item.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="px-6 py-16 lg:px-10" aria-labelledby={`${study.slug}-search-ai-answers`}>
        <div className="mx-auto max-w-[1320px]">
          <SectionLabel>SEO, AEO, GEO, AIO and SXO</SectionLabel>
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <h2 id={`${study.slug}-search-ai-answers`} className="font-syne text-[clamp(2rem,4vw,3.4rem)] font-semibold leading-tight tracking-normal text-white">
                Direct answers for readers, search engines and AI systems.
              </h2>
              <p className="mt-5 font-inter text-base leading-8 text-white/66">
                This section turns the case study into a clearer evaluation page: what problem was solved, what Crea8iv Media delivered and what evidence can be inspected.
              </p>
            </div>
            <div className="grid gap-4">
              <article className="rounded-lg border border-white/10 bg-white/[0.035] p-6">
                <h3 className="font-syne text-xl font-semibold tracking-normal text-white">What business problem did the project address?</h3>
                <p className="mt-3 font-inter text-sm leading-7 text-white/64">{study.overview?.body ?? study.challenge.intro}</p>
              </article>
              <article className="rounded-lg border border-white/10 bg-white/[0.035] p-6">
                <h3 className="font-syne text-xl font-semibold tracking-normal text-white">What did Crea8iv Media deliver?</h3>
                <p className="mt-3 font-inter text-sm leading-7 text-white/64">
                  {study.deliverables.slice(0, 6).join(", ")}. The full scope is listed in the deliverables and related services sections.
                </p>
              </article>
              <article className="rounded-lg border border-white/10 bg-white/[0.035] p-6">
                <h3 className="font-syne text-xl font-semibold tracking-normal text-white">What evidence can a reader inspect?</h3>
                <p className="mt-3 font-inter text-sm leading-7 text-white/64">{study.evidenceCopy}</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-10">
        <div className="mx-auto grid max-w-[1320px] gap-8 lg:grid-cols-2">
          <div className="rounded-lg border border-white/10 bg-white/[0.035] p-7">
            <SectionLabel>Results and Expected Outcomes</SectionLabel>
            <div className="grid gap-4">
              {study.outcomes.map((item) => (
                <div key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[var(--case-accent)]" aria-hidden="true" />
                  <p className="font-inter text-base leading-7 text-white/72">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.035] p-7">
            <SectionLabel>Technology and Stack</SectionLabel>
            <div className="flex flex-wrap gap-3">
              {study.technology.map((item) => (
                <span key={item} className="rounded-full border border-white/12 bg-black/25 px-4 py-2 font-inter text-sm text-white/72">
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-8 rounded-lg border border-white/10 bg-black/25 p-5">
              <TableProperties className="mb-4 h-5 w-5 text-[var(--case-accent)]" aria-hidden="true" />
              <p className="font-inter text-sm leading-7 text-white/65">
                Metrics are published only when supplied, approved and supported by a defined source and date range. This page focuses on verified work and practical system outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {study.faq?.length ? (
        <section className="px-6 py-16 lg:px-10">
          <div className="mx-auto max-w-[980px]">
            <SectionLabel>Case Study SEO FAQ</SectionLabel>
            <div className="grid gap-4">
              {study.faq.map((item) => (
                <details key={item.question} className="group rounded-lg border border-white/10 bg-white/[0.035] p-6">
                  <summary className="cursor-pointer list-none font-syne text-xl font-semibold tracking-normal text-white outline-none focus-visible:ring-2 focus-visible:ring-[var(--case-accent)]">
                    {item.question}
                  </summary>
                  <p className="mt-4 font-inter text-sm leading-7 text-white/66">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="px-6 py-16 lg:px-10">
        <div className="mx-auto grid max-w-[1320px] gap-8 rounded-lg border border-white/10 bg-white/[0.035] p-7 md:p-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionLabel>Related Crea8iv Services</SectionLabel>
            <h2 className="font-syne text-3xl font-semibold tracking-normal text-white">Connected work, not isolated pages.</h2>
            <p className="mt-4 font-inter text-base leading-8 text-white/68">
              Each case study connects website design, search, AI visibility, creative production and conversion strategy into a public system the client can keep improving.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {study.serviceLinks.map((link) => (
              <Link key={link.href} href={link.href} className="group flex items-center justify-between rounded-lg border border-white/10 bg-black/25 px-5 py-4 font-inter text-sm font-semibold text-white/78 transition hover:border-[var(--case-accent)] hover:text-white">
                {link.label}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CaseConsultingContext slug={study.slug} />
      <section className="px-6 pb-24 pt-8 lg:px-10 lg:pb-32">
        <div className="mx-auto max-w-[1120px] text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-md border border-white/10 bg-[var(--case-accent-soft)] text-[var(--case-accent)]">
            <MonitorSmartphone className="h-6 w-6" aria-hidden="true" />
          </div>
          <h2 className="font-orbitron text-[clamp(2rem,4vw,4rem)] font-bold leading-tight tracking-normal text-white">
            {study.closingTitle ?? "Want a premium website and growth system for your business?"}
          </h2>
          <p className="mx-auto mt-5 max-w-3xl font-inter text-lg leading-8 text-white/68">
            {study.closingCopy ?? "Crea8iv Media helps ambitious brands build premium digital experiences designed for visibility, trust and conversion-focused growth."}
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="portfolio-button justify-center">
              Start Your Project <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <Link href="/results/" className="portfolio-text-link justify-center">
              View More Work <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-10 grid gap-4 text-left md:grid-cols-2">
            <Link href="/consultation/" className="group rounded-lg border border-white/10 bg-white/[0.035] p-6 transition hover:border-[var(--case-accent)]">
              <p className="font-inter text-xs uppercase tracking-[0.22em] text-[var(--case-accent)]">Need strategy?</p>
              <h3 className="mt-3 font-syne text-2xl font-semibold tracking-normal text-white">Clarify what to do first.</h3>
              <p className="mt-3 font-inter text-sm leading-7 text-white/62">Use consultation when the priority is diagnosis, positioning, channel choice or investment direction before execution.</p>
            </Link>
            <Link href="/contact/" className="group rounded-lg border border-white/10 bg-white/[0.035] p-6 transition hover:border-[var(--case-accent)]">
              <p className="font-inter text-xs uppercase tracking-[0.22em] text-[var(--case-accent)]">Need implementation?</p>
              <h3 className="mt-3 font-syne text-2xl font-semibold tracking-normal text-white">Bring the delivery brief to Crea8iv Media.</h3>
              <p className="mt-3 font-inter text-sm leading-7 text-white/62">Use the agency path when website, SEO, ads, content, automation or growth-system execution needs a team.</p>
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
