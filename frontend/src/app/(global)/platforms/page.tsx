import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Boxes,
  BrainCircuit,
  Check,
  CheckCircle2,
  ChevronRight,
  Cloud,
  Code2,
  GraduationCap,
  HeartPulse,
  Layers3,
  LockKeyhole,
  Network,
  RefreshCw,
  SearchCheck,
  ServerCog,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import { BUSINESS_DETAILS, SITE_URL } from "@/lib/site-config";
import { PLATFORMS, PLATFORM_FAQS } from "@/lib/platforms";
import styles from "./platforms.module.css";

const canonical = `${SITE_URL}/platforms/`;
const title = "AI Software Platforms in Pakistan | Crea8iv Media";
const description =
  "Explore Crea8iv Media AI software platforms for healthcare, education, and enterprise growth in Pakistan.";
const summary =
  "Crea8iv Media builds a connected ecosystem of cloud platforms for healthcare providers, educational institutions, modern businesses, and enterprise teams.";
const socialImage = `${SITE_URL}/img/crea8iv-white-3d-logo.webp`;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "AI software platforms",
    "healthcare software",
    "education technology platform",
    "business communication platform",
    "enterprise automation software",
    "SaaS platforms Pakistan",
    "Crea8iv Media software",
  ],
  alternates: { canonical },
  authors: [{ name: BUSINESS_DETAILS.brandName, url: SITE_URL }],
  creator: BUSINESS_DETAILS.brandName,
  publisher: BUSINESS_DETAILS.brandName,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    title,
    description,
    url: canonical,
    siteName: BUSINESS_DETAILS.brandName,
    type: "website",
    locale: "en_PK",
    images: [{ url: socialImage, width: 900, height: 713, alt: "Crea8iv Media intelligent software platform ecosystem" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [socialImage],
  },
};

const platformIcons: Record<(typeof PLATFORMS)[number]["icon"], LucideIcon> = {
  heart: HeartPulse,
  graduation: GraduationCap,
  network: Network,
};

const platformSchema = PLATFORMS.map((platform) => ({
  "@type": "WebPage",
  "@id": `${canonical}#${platform.id}`,
  name: platform.name,
  url: platform.url,
  description: platform.description,
  audience: { "@type": "Audience", audienceType: platform.audience },
  creator: { "@id": `${SITE_URL}/#organization` },
  provider: { "@id": `${SITE_URL}/#organization` },
  isPartOf: { "@id": `${canonical}#platform-list` },
  potentialAction: { "@type": "ViewAction", target: platform.url },
}));

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: BUSINESS_DETAILS.brandName,
      legalName: BUSINESS_DETAILS.legalName,
      url: SITE_URL,
      logo: { "@id": `${SITE_URL}/#logo` },
      owns: PLATFORMS.map((platform) => ({ "@id": `${canonical}#${platform.id}` })),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: BUSINESS_DETAILS.brandName,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-PK",
    },
    {
      "@type": "WebPage",
      "@id": `${canonical}#webpage`,
      url: canonical,
      name: title,
      description,
      abstract: summary,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: [{ "@id": `${SITE_URL}/#organization` }, { "@id": `${canonical}#platform-list` }],
      mainEntity: { "@id": `${canonical}#platform-list` },
      breadcrumb: { "@id": `${canonical}#breadcrumb` },
  datePublished: "2026-07-18",
      dateModified: "2026-07-27",
      inLanguage: "en-PK",
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["#platform-summary", "#platforms-list", "#platforms-faq"],
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${canonical}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Platforms", item: canonical },
      ],
    },
    {
      "@type": "ItemList",
      "@id": `${canonical}#platform-list`,
      name: "Crea8iv Media software platforms",
      numberOfItems: PLATFORMS.length,
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      itemListElement: PLATFORMS.map((platform, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: { "@id": `${canonical}#${platform.id}` },
      })),
    },
    ...platformSchema,
    {
      "@type": "FAQPage",
      "@id": `${canonical}#faq-schema`,
      mainEntity: PLATFORM_FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
    {
      "@type": "SiteNavigationElement",
      "@id": `${canonical}#navigation`,
      name: ["Platforms", ...PLATFORMS.map((platform) => platform.name)],
      url: [canonical, ...PLATFORMS.map((platform) => platform.url)],
      isPartOf: { "@id": `${SITE_URL}/#website` },
    },
  ],
};

const capabilities = [
  { icon: BrainCircuit, title: "AI Powered", text: "Intelligent workflows that reduce repetitive decisions and operational friction." },
  { icon: Cloud, title: "Cloud Native", text: "Responsive platforms designed for reliable access, updates, and distributed teams." },
  { icon: ShieldCheck, title: "Enterprise Security", text: "Security-aware architecture, access controls, and responsible data handling." },
  { icon: Workflow, title: "Automation First", text: "Automations connect people, tasks, communication, and operational triggers." },
  { icon: Layers3, title: "Scalable Architecture", text: "Modular foundations designed to support growing users, data, and workflows." },
  { icon: Sparkles, title: "Modern User Experience", text: "Clear, accessible interfaces built around the way real teams complete work." },
] as const;

const industries = [
  { name: "Healthcare", description: "Patient operations and clinic communication", href: "#patientflow", platform: "PatientFlow", icon: HeartPulse },
  { name: "Education", description: "Examinations and institutional workflows", href: "#examflow", platform: "ExamFlow + X-Tempora", icon: GraduationCap },
  { name: "Enterprise", description: "Connected systems and tailored software architecture", href: "/software-development/", platform: "Custom Solutions", icon: Boxes },
] as const;

const flow = ["Lead Generation", "Communication", "Operations", "Automation", "Analytics", "Growth"] as const;

const technology = [
  { icon: BrainCircuit, label: "AI", text: "Assistive intelligence and workflow decision support" },
  { icon: RefreshCw, label: "Automation", text: "Event-driven processes and reliable follow-up" },
  { icon: Code2, label: "APIs", text: "Integration-ready services and connected data" },
  { icon: Cloud, label: "Cloud", text: "Responsive access and scalable infrastructure" },
  { icon: LockKeyhole, label: "Security", text: "Access control, data protection, and auditability" },
  { icon: ServerCog, label: "Scalability", text: "Architecture designed to grow with demand" },
] as const;

const freeToolHighlights = [
  {
    title: "AI Visibility Checker",
    href: "/tools/ai-visibility-checker/",
    label: "AI search",
    image: "/img/services/ad-concepts/ai-automation-ad-concept.webp",
    icon: Sparkles,
  },
  {
    title: "Local SEO Audit",
    href: "/tools/local-seo-audit/",
    label: "Maps",
    image: "/img/services/ad-concepts/google-business-profile-ad-concept.webp",
    icon: SearchCheck,
  },
  {
    title: "Marketing ROI Calculator",
    href: "/tools/marketing-roi-calculator/",
    label: "ROI",
    image: "/img/services/ad-concepts/growth-system-ad-concept.webp",
    icon: BrainCircuit,
  },
] as const;

function PlatformMark({ platform, size = "large" }: { platform: (typeof PLATFORMS)[number]; size?: "small" | "large" }) {
  const Icon = platformIcons[platform.icon];
  const dimensions = size === "small" ? "h-8 w-8" : "h-14 w-14";

  if ("logo" in platform && platform.logo) {
    return (
      <span className={`${dimensions} relative block shrink-0 overflow-hidden rounded-full border border-[#FF6801]/28 bg-white`}>
        <Image src={platform.logo} alt={`${platform.name} logo`} fill sizes={size === "small" ? "32px" : "56px"} className="object-contain" />
      </span>
    );
  }

  return (
    <span className={`${dimensions} flex shrink-0 items-center justify-center rounded-full border border-[#FF6801]/30 bg-[#FF6801]/10 text-[#FF6801]`}>
      <Icon className={size === "small" ? "h-4 w-4" : "h-6 w-6"} aria-hidden="true" />
    </span>
  );
}

export default function PlatformsPage() {
  return (
    <div className="overflow-hidden bg-[#050403] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />

      <section className="relative border-b border-white/[0.08] px-6 pb-20 pt-32 sm:px-8 sm:pt-36 lg:px-10 lg:pb-24 lg:pt-36">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,104,1,.055),transparent_32%)]" />
        <div className="relative mx-auto max-w-[1440px]">
          <nav aria-label="Breadcrumb" className="mb-10 flex items-center gap-2 font-inter text-xs text-white/45">
            <Link href="/" className="transition-colors hover:text-[#FF6801]">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span aria-current="page" className="text-white/72">Platforms</span>
          </nav>

          <div className="grid items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-8">
            <div className="max-w-[700px]">
              <p className="font-orbitron text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF6801]">Crea8iv software ecosystem</p>
              <h1 className="mt-6 font-syne text-[clamp(3rem,5vw,5.5rem)] font-semibold leading-[0.96] tracking-normal text-[#f4efe8]">
                One Ecosystem.<br />
                <span className="text-[#d98a50]">Multiple Intelligent Platforms.</span>
              </h1>
              <p id="platform-summary" className="mt-7 max-w-[650px] pr-10 font-inter text-base leading-8 text-white/66 sm:pr-0 sm:text-lg">
                AI-powered platforms built by Crea8iv Media to help healthcare providers, educational institutions, and modern businesses automate operations, improve efficiency, and accelerate growth.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link href="/contact/#cmContactForm" className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#FF6801] px-7 font-orbitron text-[11px] font-bold uppercase tracking-[0.13em] text-[#1a0b02] shadow-[0_18px_48px_rgba(255,104,1,.22)] transition-all hover:-translate-y-0.5 hover:bg-[#FF6801] hover:shadow-[0_22px_58px_rgba(255,104,1,.3)]">
                  Book Demo <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </Link>
                <Link href="#platforms-list" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.035] px-7 font-orbitron text-[11px] font-semibold uppercase tracking-[0.13em] text-white transition-all hover:-translate-y-0.5 hover:border-[#FF6801]/60 hover:bg-[#FF6801]/8">
                  Explore Platforms <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
              <p className="mt-7 font-inter text-xs text-white/38">Product ecosystem by Crea8iv Media · Updated July 27, 2026</p>
            </div>

            <figure className={styles.ecosystem} aria-label="Connected Crea8iv Media intelligent software ecosystem">
              {[1, 2, 3, 4, 5, 6].map((line) => <span key={line} className={`${styles.connector} ${styles[`connector${line}`]}`} aria-hidden="true" />)}
              <div className={styles.hub}>
                <Image src="/img/crea8iv-white-3d-logo.webp" alt="Crea8iv Media platform core" width={100} height={80} className="platform-ecosystem-logo platform-ecosystem-logo-dark mb-6 h-auto w-[92px] object-contain" priority />
                <Image src="/img/crea8iv-platform-logo-transparent.png" alt="Crea8iv Media platform core" width={100} height={100} className="platform-ecosystem-logo platform-ecosystem-logo-light mb-6 h-auto w-[106px] object-contain" priority />
              </div>
              {PLATFORMS.map((platform, index) => (
                <Link key={platform.id} href={`#${platform.id}`} className={`${styles.node} ${styles[`node${index + 1}`]}`} aria-label={`Explore ${platform.name}`}>
                  <PlatformMark platform={platform} size="small" />
                  <span className="min-w-0">
                    <span className="block truncate font-syne text-sm font-semibold text-white">{platform.name}</span>
                    <span className="mt-0.5 block truncate font-inter text-[9px] uppercase tracking-[0.1em] text-white/42">{platform.category}</span>
                  </span>
                </Link>
              ))}
            </figure>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-8 lg:px-10 lg:py-28" aria-labelledby="platform-overview-title">
        <div className="mx-auto grid max-w-[1240px] gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div>
            <p className="font-orbitron text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF6801]">Platform overview</p>
            <h2 id="platform-overview-title" className="mt-4 font-syne text-4xl font-semibold leading-tight text-[#f4efe8] sm:text-5xl">Software built as one intelligent ecosystem.</h2>
          </div>
          <div className="border-l border-[#FF6801]/35 pl-6 sm:pl-8">
            <p className="font-inter text-lg leading-8 text-white/68 sm:text-xl sm:leading-9">Crea8iv Media platforms turn disconnected operational tasks into clear digital workflows. Each product solves a focused problem, while shared principles across cloud delivery, automation, data, and user experience create a foundation that can grow with the organization.</p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 font-inter text-sm text-white/50">
              <Link href="/software-development/" className="inline-flex items-center gap-2 transition-colors hover:text-[#FF6801]">Custom software development <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></Link>
              <Link href="/marketing-automation/" className="inline-flex items-center gap-2 transition-colors hover:text-[#FF6801]">Marketing automation <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></Link>
              <Link href="/ai-search-optimization/" className="inline-flex items-center gap-2 transition-colors hover:text-[#FF6801]">AI search systems <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.08] bg-white/[0.018] px-6 py-14 sm:px-8 lg:px-10" aria-labelledby="platform-tools-title">
        <div className="mx-auto grid max-w-[1240px] gap-8 lg:grid-cols-[0.62fr_1.38fr] lg:items-center">
          <div>
            <p className="font-orbitron text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF6801]">Free tools</p>
            <h2 id="platform-tools-title" className="mt-3 font-syne text-3xl font-semibold leading-tight text-[#f4efe8] sm:text-4xl">
              Quick growth checks before a platform decision.
            </h2>
            <p className="mt-4 font-inter text-sm leading-7 text-white/58">
              Use Crea8iv tools to audit visibility, ROI, local search, schema, and conversion readiness before choosing a bigger build.
            </p>
            <Link href="/tools/" className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#FF6801]/38 px-5 py-3 font-orbitron text-[10px] font-bold uppercase tracking-[0.14em] text-[#FF6801] transition hover:bg-[#FF6801] hover:text-[#1a0b02]">
              View all free tools <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {freeToolHighlights.map(({ title: toolTitle, href, label, image, icon: Icon }) => (
              <Link key={toolTitle} href={href} className="group overflow-hidden rounded-[20px] border border-white/[0.1] bg-white/[0.04] p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,.1)] transition hover:-translate-y-1 hover:border-[#FF6801]/52 hover:bg-white/[0.065]">
                <div className="relative aspect-video overflow-hidden rounded-[15px] bg-black">
                  <Image src={image} alt={`${toolTitle} free tool visual`} fill sizes="(max-width: 768px) 100vw, 260px" className="object-cover transition duration-700 group-hover:scale-105" />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/66 via-transparent to-white/[0.05]" />
                  <span className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-[#FF6801]/32 bg-black/58 text-[#FF6801] backdrop-blur">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
                <div className="px-1 pb-1 pt-3">
                  <p className="font-orbitron text-[8px] font-bold uppercase tracking-[0.18em] text-[#FF6801]">{label}</p>
                  <h3 className="mt-1 font-syne text-lg font-semibold leading-tight text-white">{toolTitle}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="platforms-list" className="scroll-mt-28 border-y border-white/[0.08] bg-white/[0.018] px-6 py-20 sm:px-8 lg:px-10 lg:py-28" aria-labelledby="platform-list-title">
        <div className="mx-auto max-w-[1440px]">
          <div className="max-w-3xl">
            <p className="font-orbitron text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF6801]">Six focused platforms</p>
            <h2 id="platform-list-title" className="mt-4 font-syne text-4xl font-semibold leading-tight text-[#f4efe8] sm:text-5xl lg:text-6xl">Built for the systems organizations rely on.</h2>
            <p className="mt-5 font-inter text-base leading-8 text-white/58 sm:text-lg">Healthcare, education, communication, and operations products designed around real institutional workflows.</p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {PLATFORMS.map((platform, index) => {
              const external = platform.learnMoreHref.startsWith("http");
              return (
                <article id={platform.id} key={platform.id} className={`${styles.platformCard} scroll-mt-28 rounded-[24px] border border-white/[0.1] bg-[#0b0b0b] p-6 sm:p-8 ${index === 0 ? "lg:col-span-2 lg:grid lg:grid-cols-[0.8fr_1.2fr] lg:gap-10" : ""}`} aria-labelledby={`${platform.id}-title`}>
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <PlatformMark platform={platform} />
                      <span className="flex flex-wrap items-center justify-end gap-2">
                        {"isNew" in platform && platform.isNew ? (
                          <span className="rounded-full border border-[#FF6801]/34 bg-[#FF6801]/12 px-2.5 py-1 font-orbitron text-[8px] font-bold uppercase tracking-[0.14em] text-[#FF6801]">New</span>
                        ) : null}
                        <span className="font-orbitron text-[9px] font-bold uppercase tracking-[0.16em] text-[#FF6801]">Platform {String(index + 1).padStart(2, "0")}</span>
                      </span>
                    </div>
                    <p className="mt-7 font-inter text-[10px] font-bold uppercase tracking-[0.18em] text-white/42">{platform.category}</p>
                    <h3 id={`${platform.id}-title`} className="mt-2 font-syne text-3xl font-semibold text-white sm:text-4xl">{platform.name}</h3>
                    <p className="mt-4 font-inter text-sm leading-7 text-white/60 sm:text-base">{platform.description}</p>
                  </div>

                  <div className={index === 0 ? "mt-8 lg:mt-0 lg:border-l lg:border-white/[0.09] lg:pl-10" : "mt-8"}>
                    <p className="font-orbitron text-[9px] font-bold uppercase tracking-[0.18em] text-white/40">Core capabilities</p>
                    <ul className="mt-4 grid grid-cols-2 gap-3" aria-label={`${platform.name} features`}>
                      {platform.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 font-inter text-xs leading-5 text-white/70 sm:text-sm">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#FF6801]" aria-hidden="true" /> {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-7 grid grid-cols-2 gap-3 sm:flex sm:flex-row">
                      <Link href={platform.learnMoreHref} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/14 px-5 font-orbitron text-[10px] font-semibold uppercase tracking-[0.12em] text-white transition-all hover:border-[#FF6801]/60 hover:bg-[#FF6801]/8">
                        Learn More {external ? <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" /> : <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />}
                      </Link>
                      <Link href={platform.demoHref} className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#FF6801] px-5 font-orbitron text-[10px] font-bold uppercase tracking-[0.12em] text-[#1a0b02] transition-all hover:bg-[#FF6801]">Book Demo</Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-8 lg:px-10 lg:py-28" aria-labelledby="why-platforms-title">
        <div className="mx-auto max-w-[1440px]">
          <div className="max-w-3xl">
            <p className="font-orbitron text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF6801]">Platform principles</p>
            <h2 id="why-platforms-title" className="mt-4 font-syne text-4xl font-semibold text-[#f4efe8] sm:text-5xl">Designed for operational confidence.</h2>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-[24px] border border-white/[0.09] bg-white/[0.09] sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map(({ icon: Icon, title: itemTitle, text }) => (
              <article key={itemTitle} className="group bg-[#090909] p-7 transition-colors hover:bg-[#0d0b0a] sm:p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#FF6801]/25 bg-[#FF6801]/8 text-[#FF6801] transition-transform group-hover:scale-105"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                <h3 className="mt-6 font-syne text-2xl font-semibold text-white">{itemTitle}</h3>
                <p className="mt-3 font-inter text-sm leading-7 text-white/55">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.08] bg-white/[0.018] px-6 py-20 sm:px-8 lg:px-10 lg:py-28" aria-labelledby="industries-title">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="font-orbitron text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF6801]">Industry systems</p>
            <h2 id="industries-title" className="mt-4 font-syne text-4xl font-semibold leading-tight text-[#f4efe8] sm:text-5xl">Technology shaped around how each industry works.</h2>
            <p className="mt-5 font-inter leading-7 text-white/56">Each industry has different operational pressure. The platform architecture starts with that context.</p>
          </div>
          <div className="divide-y divide-white/[0.09] border-y border-white/[0.09]">
            {industries.map(({ name, description: industryDescription, href, platform, icon: Icon }, index) => (
              <Link key={name} href={href} className="group grid gap-4 py-6 transition-colors hover:bg-white/[0.018] sm:grid-cols-[54px_1fr_auto] sm:items-center sm:px-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 text-white/62 transition-all group-hover:border-[#FF6801]/50 group-hover:bg-[#FF6801]/8 group-hover:text-[#FF6801]"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                <span>
                  <span className="font-syne text-2xl font-semibold text-white">{name}</span>
                  <span className="mt-1 block font-inter text-sm text-white/48">{industryDescription}</span>
                </span>
                <span className="flex items-center justify-between gap-4 font-orbitron text-[9px] uppercase tracking-[0.14em] text-[#FF6801] sm:justify-end">{platform}<span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/12 transition-transform group-hover:translate-x-1"><ArrowRight className="h-3.5 w-3.5" aria-hidden="true" /></span></span>
                <span className="sr-only">Industry {index + 1}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-8 lg:px-10 lg:py-28" aria-labelledby="connected-title">
        <div className="mx-auto max-w-[1440px]">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-orbitron text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF6801]">One connected ecosystem</p>
            <h2 id="connected-title" className="mt-4 font-syne text-4xl font-semibold leading-tight text-[#f4efe8] sm:text-5xl lg:text-6xl">From first signal to sustainable growth.</h2>
            <p className="mt-5 font-inter text-base leading-8 text-white/58 sm:text-lg">Every platform supports a different operational layer. Together, they create a clearer flow from demand and communication to coordinated work, automation, insight, and growth.</p>
          </div>
          <ol className={`${styles.flowTrack} mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-6`} aria-label="Connected platform workflow">
            {flow.map((item, index) => (
              <li key={item} className="relative z-[1] flex items-center gap-4 rounded-[16px] border border-white/[0.1] bg-[#090909] p-4 lg:flex-col lg:gap-4 lg:text-center">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#FF6801]/42 bg-[#120a05] font-orbitron text-[9px] font-bold text-[#FF6801]">{String(index + 1).padStart(2, "0")}</span>
                <span className="font-syne text-base font-semibold text-white">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-white/[0.08] bg-white/[0.018] px-6 py-20 sm:px-8 lg:px-10 lg:py-28" aria-labelledby="technology-title">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div>
              <p className="font-orbitron text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF6801]">Technology foundation</p>
              <h2 id="technology-title" className="mt-4 font-syne text-4xl font-semibold leading-tight text-[#f4efe8] sm:text-5xl">Modern cloud infrastructure, built to evolve.</h2>
            </div>
            <p className="max-w-2xl font-inter text-base leading-8 text-white/58 sm:text-lg">The ecosystem combines AI, automation, APIs, cloud delivery, security, and scalable architecture. Technology choices are guided by reliability, maintainability, and the operational context of each platform.</p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {technology.map(({ icon: Icon, label, text }) => (
              <article key={label} className="group flex min-h-[150px] items-start gap-5 rounded-[20px] border border-white/[0.09] bg-[#090909] p-6 transition-all hover:-translate-y-1 hover:border-[#FF6801]/40">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FF6801]/9 text-[#FF6801]"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                <div><h3 className="font-syne text-xl font-semibold text-white">{label}</h3><p className="mt-2 font-inter text-sm leading-6 text-white/52">{text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="platforms-faq" className="scroll-mt-28 px-6 py-20 sm:px-8 lg:px-10 lg:py-28" aria-labelledby="faq-title">
        <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[0.65fr_1.35fr]">
          <div>
            <p className="font-orbitron text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF6801]">Platform FAQ</p>
            <h2 id="faq-title" className="mt-4 font-syne text-4xl font-semibold leading-tight text-[#f4efe8] sm:text-5xl">Clear answers for platform teams.</h2>
            <p className="mt-5 font-inter leading-7 text-white/52">Direct information for buyers, operators, search engines, and AI answer systems.</p>
          </div>
          <div className="divide-y divide-white/[0.1] border-y border-white/[0.1]">
            {PLATFORM_FAQS.map((faq, index) => (
              <details key={faq.question} className="group py-5" open={index === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-syne text-lg font-semibold text-white marker:hidden sm:text-xl">
                  {faq.question}
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/12 text-[#FF6801] transition-transform group-open:rotate-45"><Check className="h-4 w-4" aria-hidden="true" /></span>
                </summary>
                <p className="max-w-3xl pt-4 font-inter text-sm leading-7 text-white/58 sm:text-base">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/[0.08] px-6 py-20 sm:px-8 lg:px-10 lg:py-28" aria-labelledby="platform-cta-title">
        <div className="mx-auto max-w-[1240px] rounded-[28px] border border-[#FF6801]/28 bg-[linear-gradient(130deg,#17100c,#090909_54%,#130a05)] px-6 py-14 text-center shadow-[inset_0_1px_0_rgba(255,255,255,.1),0_32px_90px_rgba(0,0,0,.35)] sm:px-10 lg:py-20">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#FF6801]/38 bg-[#FF6801]/10 text-[#FF6801]"><Bot className="h-6 w-6" aria-hidden="true" /></span>
          <h2 id="platform-cta-title" className="mx-auto mt-6 max-w-3xl font-syne text-4xl font-semibold leading-tight text-[#f4efe8] sm:text-5xl lg:text-6xl">Ready to Scale Your Organization?</h2>
          <p className="mx-auto mt-5 max-w-2xl font-inter text-base leading-8 text-white/58 sm:text-lg">Choose the right platform, connect multiple systems, or discuss an enterprise solution built around your operational requirements.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/contact/#cmContactForm" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#FF6801] px-7 font-orbitron text-[11px] font-bold uppercase tracking-[0.13em] text-[#1a0b02] transition-all hover:-translate-y-0.5 hover:bg-[#FF6801]">Book a Demo <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
            <Link href="/contact/" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 px-7 font-orbitron text-[11px] font-semibold uppercase tracking-[0.13em] text-white transition-all hover:-translate-y-0.5 hover:border-[#FF6801]/60 hover:bg-white/[0.04]">Talk to Sales</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
