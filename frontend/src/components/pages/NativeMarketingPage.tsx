import PartnershipEnquiry from "@/components/PartnershipEnquiry";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, MapPin, MessageCircle } from "lucide-react";
import { BUSINESS_DETAILS, SITE_URL } from "@/lib/site-config";
import LeadTriggerButton from "@/components/LeadTriggerButton";
import ServiceResources from "@/components/ServiceResources";
import { getServiceTone } from "@/lib/service-tones";
import bodyStyles from "../case-study-body.module.css";

export type NativePageConfig = {
  slug: string;
  eyebrow: string;
  title: string;
  intro: string;
  image: string;
  imageAlt: string;
  primaryCta?: string;
  primaryHref?: string;
  secondaryCta?: string;
  secondaryHref?: string;
  proof: Array<{ label: string; value: string }>;
  sections: Array<{ title: string; body: string; items: string[] }>;
  faqs?: Array<{ question: string; answer: string }>;
};

export default function NativeMarketingPage({ page }: { page: NativePageConfig }) {
  const jsonLd = nativePageJsonLd(page);

  return (
    <div className={`native-page brand-site-shell overflow-hidden bg-[#050505] text-white ${bodyStyles.page}`} data-service-tone={getServiceTone(page.slug)}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="relative px-6 pb-16 pt-36 sm:px-8 lg:px-10 lg:pb-24 lg:pt-44">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(var(--decorative-rgb),.04),transparent_32%),linear-gradient(180deg,rgba(255,255,255,.035),transparent_42%)]" />
        <div className="relative mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <div>
            <nav className="mb-8 flex flex-wrap items-center gap-2 font-orbitron text-[10px] uppercase tracking-[0.16em] text-white/45" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-[#FF6801]">Home</Link>
              <span>/</span>
              <span className="text-white/72">{page.eyebrow}</span>
            </nav>
            <p className="portfolio-kicker">{page.eyebrow}</p>
            <h1 className="mt-5 max-w-5xl font-syne text-[clamp(2.45rem,5.7vw,5.7rem)] font-bold leading-[0.97] text-white">
              {page.title}
            </h1>
            <p className="mt-7 max-w-[820px] text-base leading-8 text-white/70 sm:text-lg">{page.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {page.primaryHref ? (
                <Link
                  href={page.primaryHref}
                  className="portfolio-button justify-center"
                  target={page.primaryHref.startsWith("http") ? "_blank" : undefined}
                  rel={page.primaryHref.startsWith("http") ? "noreferrer" : undefined}
                >
                  {page.primaryCta ?? "Open"} <ArrowUpRight className="h-4 w-4" />
                </Link>
              ) : (
                <LeadTriggerButton className="portfolio-button justify-center" eventLabel={`${page.slug}-native-primary`}>
                  {page.primaryCta ?? "Book Free Growth Audit"} <ArrowUpRight className="h-4 w-4" />
                </LeadTriggerButton>
              )}
              <Link href={page.secondaryHref ?? "/results/"} className="portfolio-text-link justify-center">
                {page.secondaryCta ?? "View Results"} <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
            {["about", "contact", "pricing", "consultation"].includes(page.slug) && <Link href="/company-verification/" className="registration-proof mt-5 inline-block min-h-11 text-sm text-[#ff9b57] underline">Pakistan sole proprietorship · Business information</Link>}
          </div>

          <aside className="lux-card p-5">
            <div className="relative aspect-video overflow-hidden rounded-[18px] border border-white/10 bg-black">
              <Image
                src={page.image}
                alt={page.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/42 via-transparent to-white/[0.03]" />
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2">
              {page.proof.map((item) => (
                <div key={item.label} className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
                  <p className="font-syne text-2xl font-semibold text-[var(--icon-color)]">{item.value}</p>
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white/50">{item.label}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {page.slug === "contact" && <PartnershipEnquiry />}
      <ServiceResources slug={page.slug} />
      <section className="border-y border-white/[0.08] bg-[#080706] px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-[1440px] gap-5 lg:grid-cols-3">
          {page.sections.map((section) => (
            <article key={section.title} className="lux-card p-6">
              <h2 className="font-orbitron text-xl font-semibold text-white">{section.title}</h2>
              <p className="mt-4 text-sm leading-7 text-white/64">{section.body}</p>
              <ul className="mt-6 grid gap-3">
                {section.items.map((item) => (
                  <li key={item} className="flex gap-3 border-t border-white/10 pt-3 text-sm text-white/72">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--icon-color)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-[1440px] gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="lux-card p-6">
            <p className="portfolio-kicker"><MapPin className="h-3.5 w-3.5" /> Rawalpindi office</p>
            <h2 className="mt-4 font-syne text-4xl font-semibold leading-tight text-white">A local growth team with a measurable delivery rhythm.</h2>
            <p className="mt-5 text-sm leading-7 text-white/62">{BUSINESS_DETAILS.address}</p>
            <p className="mt-3 text-sm leading-7 text-white/62">{BUSINESS_DETAILS.phoneDisplay} · {BUSINESS_DETAILS.email}</p>
          </div>
          <div className="grid gap-4">
            {(page.faqs ?? defaultFaqs()).map((faq) => (
              <article key={faq.question} className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
                <h3 className="font-orbitron text-lg font-semibold text-white">{faq.question}</h3>
                <p className="mt-3 text-sm leading-7 text-white/64">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/[0.09] bg-[#080706] px-6 py-16 text-center sm:px-8 lg:px-10 lg:py-24">
        <div className="relative mx-auto max-w-4xl">
          <p className="portfolio-kicker justify-center"><MessageCircle className="h-3.5 w-3.5" /> Start with a quick audit</p>
          <h2 className="mt-5 font-syne text-4xl font-semibold leading-[.95] text-white sm:text-6xl">Want this built around your business?</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/62">
            Share your industry, city, and current marketing problem. We will map the fastest path to better visibility, trust, and qualified leads.
          </p>
          <LeadTriggerButton className="portfolio-button mt-9" eventLabel={`${page.slug}-native-final`}>
            Book Free Growth Audit <ArrowUpRight className="h-4 w-4" />
          </LeadTriggerButton>
        </div>
      </section>
    </div>
  );
}

function defaultFaqs() {
  return [
    {
      question: "Who is this service for?",
      answer: "It is for Pakistan-based businesses that need stronger online trust, better conversion paths, clearer content, and measurable growth systems.",
    },
    {
      question: "How does Crea8iv Media start the work?",
      answer: "We start with an audit of the current website, search visibility, creative quality, tracking, and lead handling before recommending the first build phase.",
    },
    {
      question: "Can this connect with ads, SEO, and automation?",
      answer: "Yes. Every page is planned to connect brand presentation, SEO structure, paid campaigns, WhatsApp or form actions, and reporting.",
    },
  ];
}

function nativePageJsonLd(page: NativePageConfig) {
  const url = `${SITE_URL}/${page.slug}/`;
  const faqs = page.faqs ?? defaultFaqs();

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: page.title,
        description: page.intro,
        isPartOf: {
          "@type": "WebSite",
          name: "Crea8iv Media",
          url: SITE_URL,
        },
        about: {
          "@type": "Organization",
          name: "Crea8iv Media",
          url: SITE_URL,
          telephone: BUSINESS_DETAILS.phoneDisplay,
          email: BUSINESS_DETAILS.email,
          address: BUSINESS_DETAILS.address,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: page.title,
            item: url,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };
}
