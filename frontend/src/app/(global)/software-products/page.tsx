import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bot, Code2, Gauge, MessagesSquare, ShieldCheck, Target } from "lucide-react";
import SoftwareProductsShowcase from "@/components/SoftwareProductsShowcase";
import { BUSINESS_DETAILS, SITE_URL } from "@/lib/site-config";
import { PAGE_METADATA, pageUrl } from "@/lib/seo-metadata";
import { SOFTWARE_PRODUCTS } from "@/lib/software-products";
import { CARD_VISUALS } from "@/lib/card-visuals";

const slug = "software-products";
const details = PAGE_METADATA[slug];
const canonical = pageUrl(slug);

export const metadata: Metadata = {
  title: { absolute: details.title },
  description: details.description,
  alternates: { canonical },
  openGraph: {
    title: details.title,
    description: details.description,
    url: canonical,
    siteName: BUSINESS_DETAILS.brandName,
    type: "website",
    images: [{ url: `${SITE_URL}/img/crea8iv-white-3d-logo.webp`, width: 900, height: 713, alt: "Software products built by Crea8iv Media" }],
  },
  twitter: {
    card: "summary_large_image",
    title: details.title,
    description: details.description,
    images: [`${SITE_URL}/img/crea8iv-white-3d-logo.webp`],
  },
};

const faqs = [
  {
    question: "What is PatientFlow?",
    answer:
      "PatientFlow is patient retention software for clinics. It helps clinics reactivate dormant patients, automate WhatsApp recalls and reminders, fill appointment gaps, and track recovered revenue.",
  },
  {
    question: "Can Crea8iv Media build custom software for my business?",
    answer:
      "Yes. Alongside its own software products, Crea8iv Media designs custom SaaS platforms, CRM and ERP systems, web applications, mobile apps, integrations and AI automation for growing businesses.",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${canonical}#webpage`,
      url: canonical,
      name: details.title,
      description: details.description,
      abstract: details.summary,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#organization` },
      breadcrumb: { "@id": `${canonical}#breadcrumb` },
      mainEntity: { "@id": `${canonical}#products` },
      datePublished: "2026-06-22",
      dateModified: "2026-07-27",
      inLanguage: "en-PK",
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${canonical}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Our Software", item: canonical },
      ],
    },
    {
      "@type": "ItemList",
      "@id": `${canonical}#products`,
      name: "Software products built by Crea8iv Media",
      itemListElement: SOFTWARE_PRODUCTS.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "WebPage",
          name: product.name,
          description: product.description,
          url: product.productUrl,
          creator: { "@id": `${SITE_URL}/#organization` },
          provider: { "@id": `${SITE_URL}/#business` },
        },
      })),
    },
    {
      "@type": "FAQPage",
      "@id": `${canonical}#faq`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ],
};

const productPrinciples = [
  {
    icon: Target,
    title: "Built around one costly problem",
    text: "Each product starts with a clear revenue leak, then removes the repetitive work that keeps teams from fixing it.",
  },
  {
    icon: MessagesSquare,
    title: "Designed for how customers respond",
    text: "WhatsApp-first communication keeps outreach, follow-up and customer history on the channel people already check.",
  },
  {
    icon: Gauge,
    title: "Measured beyond activity",
    text: "Campaigns and conversations connect to appointments, pipeline movement, retention and revenue—not vanity metrics.",
  },
  {
    icon: ShieldCheck,
    title: "Ready for real operations",
    text: "Roles, auditability, structured workflows and secure access make the products useful for growing teams, not just demos.",
  },
];

const productVisuals = [
  { title: "PatientFlow", visual: CARD_VISUALS.crmDevelopment },
] as const;

export default function SoftwareProductsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="relative overflow-hidden px-5 pb-16 pt-36 sm:px-8 lg:px-10 lg:pb-20 lg:pt-44">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[640px] w-[900px] -translate-x-1/2 rounded-full bg-[#FF6801]/10 blur-[150px]" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1240px] text-center">
          <nav className="mb-8 flex items-center justify-center gap-2 font-orbitron text-[10px] uppercase tracking-[0.16em] text-white/45" aria-label="Breadcrumb">
            <Link href="/" className="transition-colors hover:text-[#FF6801]">Home</Link>
            <span aria-hidden="true">/</span>
            <span className="text-white/70">Our Software</span>
          </nav>
          <p className="font-orbitron text-[11px] font-semibold uppercase tracking-[0.22em] text-[#FF6801]">Built and operated by Crea8iv Media</p>
          <h1 className="mx-auto mt-5 max-w-5xl font-syne text-5xl font-bold leading-[1.02] text-white sm:text-6xl lg:text-8xl">
            Software built to turn <span className="text-[#FF6801]">follow-up into growth.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl font-inter text-lg leading-8 text-white/65">
            PatientFlow supports clinic teams with patient reactivation, WhatsApp follow-ups, appointment reminders and retention workflows.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#software-products" className="inline-flex items-center gap-2 rounded-full bg-[#FF6801] px-7 py-4 font-orbitron text-[11px] font-bold uppercase tracking-[0.14em] text-[#1c0d00] transition-all hover:bg-[#FF6801] hover:shadow-[0_0_30px_rgba(255,104,1,0.35)]">
              Explore the Products <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <Link href="/software-development/" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-4 font-orbitron text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:border-[#FF6801]/60 hover:text-[#FF6801]">
              Need Custom Software? <Code2 className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mx-auto mt-12 grid max-w-xl gap-4">
            {productVisuals.map((visual) => (
              <div key={visual.title} className="group relative aspect-video overflow-hidden rounded-[22px] border border-white/10 bg-black shadow-[0_22px_60px_rgba(0,0,0,.34)] transition duration-500 hover:-translate-y-1 hover:border-[#FF6801]/60 hover:shadow-[0_30px_80px_rgba(0,0,0,.48),0_0_34px_rgba(255,104,1,.14)]">
                <Image
                  src={visual.visual.image}
                  alt={visual.visual.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 320px"
                  className="object-cover transition duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <p className="absolute bottom-4 left-4 font-orbitron text-[10px] uppercase tracking-[0.18em] text-white/82">{visual.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SoftwareProductsShowcase showIntro={false} />

      <section className="px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1240px]">
          <div className="max-w-3xl">
            <p className="font-orbitron text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF6801]">Product philosophy</p>
            <h2 className="mt-4 font-syne text-4xl font-bold leading-tight text-white sm:text-5xl">Built for the work between interest and revenue.</h2>
            <p className="mt-5 font-inter text-base leading-7 text-white/60 sm:text-lg">Our products focus on the operational moments where leads go cold, customers disappear, appointments remain empty and follow-up becomes inconsistent.</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {productPrinciples.map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-[24px] border border-white/[0.08] bg-white/[0.025] p-6">
                <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FF6801]/10 text-[#FF6801]"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                <h3 className="font-syne text-xl font-bold text-white">{title}</h3>
                <p className="mt-3 font-inter text-sm leading-6 text-white/55">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.06] bg-white/[0.02] px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-[1240px] gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#FF6801]/30 bg-[#FF6801]/10 text-[#FF6801]"><Bot className="h-7 w-7" aria-hidden="true" /></span>
            <h2 className="mt-6 font-syne text-4xl font-bold leading-tight text-white sm:text-5xl">Need something built around your own workflow?</h2>
          </div>
          <div>
            <p className="font-inter text-lg leading-8 text-white/65">The same team behind PatientFlow builds custom SaaS, CRM, ERP, web, mobile and AI automation systems for businesses with a specific operational problem to solve.</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/software-development/" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FF6801] px-7 py-4 font-orbitron text-[11px] font-bold uppercase tracking-[0.13em] text-[#1c0d00] transition-all hover:bg-[#FF6801]">
                Explore Custom Development <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/contact/" className="inline-flex items-center justify-center rounded-full border border-white/15 px-7 py-4 font-orbitron text-[11px] font-semibold uppercase tracking-[0.13em] text-white transition-colors hover:border-[#FF6801]/60 hover:text-[#FF6801]">Discuss Your Product</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[960px]">
          <p className="text-center font-orbitron text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF6801]">Questions</p>
          <h2 className="mt-4 text-center font-syne text-4xl font-bold text-white sm:text-5xl">Software products, clearly defined.</h2>
          <div className="mt-10 space-y-4">
            {faqs.map((faq) => (
              <article key={faq.question} className="rounded-[22px] border border-white/[0.08] bg-white/[0.025] px-6 py-6 sm:px-8">
                <h3 className="font-syne text-xl font-bold text-white">{faq.question}</h3>
                <p className="mt-3 font-inter leading-7 text-white/60">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
