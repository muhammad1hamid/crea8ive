import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Reveal, { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { FOUNDER, FOUNDER_AUTHORITY_RESOURCES } from "@/lib/authority-data";
import { getSeoLandingPagesByFamily } from "@/lib/seo-landing-pages";
import { PAGE_METADATA, pageUrl } from "@/lib/seo-metadata";
import { BUSINESS_DETAILS } from "@/lib/site-config";
import { SOFTWARE_SERVICE_VISUALS } from "@/lib/card-visuals";

export const metadata: Metadata = {
  title: { absolute: PAGE_METADATA["software-development"].title },
  description: PAGE_METADATA["software-development"].description,
  alternates: { canonical: pageUrl("software-development") },
  openGraph: {
    title: PAGE_METADATA["software-development"].title,
    description: PAGE_METADATA["software-development"].description,
    url: pageUrl("software-development"),
    siteName: "Crea8iv Media",
    type: "website",
    images: [{ url: "https://crea8ivmedia.com/img/crea8iv-white-3d-logo.webp", width: 900, height: 713, alt: "Crea8iv Media" }],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_METADATA["software-development"].title,
    description: PAGE_METADATA["software-development"].description,
    images: ["https://crea8ivmedia.com/img/crea8iv-white-3d-logo.webp"],
  },
};

// ─── DATA ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  { icon: "🧩", title: "SaaS Development", desc: "Multi-tenant, subscription-ready platforms with billing, dashboards & user management built in.", visual: SOFTWARE_SERVICE_VISUALS["SaaS Development"] },
  { icon: "📇", title: "CRM Development", desc: "Custom CRMs that capture leads, automate follow-up, and turn pipelines into revenue.", visual: SOFTWARE_SERVICE_VISUALS["CRM Development"] },
  { icon: "🏭", title: "ERP Solutions", desc: "Unify inventory, finance, HR & operations into one system your whole team trusts.", visual: SOFTWARE_SERVICE_VISUALS["ERP Solutions"] },
  { icon: "📱", title: "Mobile Apps", desc: "Native-feel iOS & Android apps engineered for speed, retention, and store rankings.", visual: SOFTWARE_SERVICE_VISUALS["Mobile Apps"] },
  { icon: "🤖", title: "AI Applications", desc: "AI agents, chatbots & workflow automation that cut manual work and scale output.", visual: SOFTWARE_SERVICE_VISUALS["AI Applications"] },
  { icon: "⚙️", title: "Automation Systems", desc: "Connect your tools and remove repetitive work with reliable business automation.", visual: SOFTWARE_SERVICE_VISUALS["Automation Systems"] },
  { icon: "🏢", title: "Enterprise Software", desc: "Secure, scalable systems built to handle real load, real compliance, real growth.", visual: SOFTWARE_SERVICE_VISUALS["Enterprise Software"] },
  { icon: "🌐", title: "Custom Web Apps", desc: "Fast, SEO-ready web applications tailored to your exact business logic.", visual: SOFTWARE_SERVICE_VISUALS["Custom Web Apps"] },
];

const INDUSTRIES = [
  "Healthcare", "Real Estate", "Restaurants", "Education", "Ecommerce", "Finance",
  "Logistics", "Manufacturing", "Marketing Agencies", "Law Firms", "Clinics",
];

const SAAS_FEATURES = [
  { t: "Multi-Tenant Architecture", d: "One codebase, isolated data per client — scale to thousands of accounts safely." },
  { t: "Subscription Systems", d: "Plans, trials, upgrades & dunning handled automatically." },
  { t: "Billing Systems", d: "Stripe / local gateway integration with invoices, proration & tax." },
  { t: "Dashboards & Analytics", d: "Real-time metrics your users and your team actually act on." },
  { t: "User & Role Management", d: "Granular permissions, teams, SSO and audit trails." },
  { t: "API Integrations", d: "Connect any third-party service with clean, documented APIs." },
];

const AI_FEATURES = [
  { t: "AI Agents", d: "Autonomous assistants that handle tasks end-to-end, not just chat." },
  { t: "Chatbots", d: "Lead-qualifying, support-resolving bots on web & WhatsApp." },
  { t: "Automation", d: "AI workflows that route, summarize, and decide at scale." },
  { t: "AI Dashboards", d: "Natural-language analytics — ask your data a question, get an answer." },
  { t: "AI Workflows", d: "Chain models + tools into reliable, repeatable business processes." },
];

const PROCESS = [
  { n: "01", t: "Discovery", d: "We map your goals, users, and the real problem worth solving." },
  { n: "02", t: "Planning", d: "Scope, architecture, timeline and a fixed, transparent roadmap." },
  { n: "03", t: "UI / UX", d: "Conversion-focused, accessible interfaces your users love." },
  { n: "04", t: "Development", d: "Modern, tested, scalable code shipped in weekly sprints." },
  { n: "05", t: "Testing", d: "QA, security & performance testing before anything goes live." },
  { n: "06", t: "Launch", d: "Smooth deployment, monitoring, and a confident go-live." },
  { n: "07", t: "Growth", d: "Ongoing support, iteration, and scaling as you grow." },
];

const STACK = [
  "Next.js", "React", "Node.js", "TypeScript", "Python", "Laravel",
  "PostgreSQL", "MongoDB", "AWS", "Vercel", "OpenAI", "Stripe",
];

const CASE_STUDIES = [
  { tag: "SaaS", t: "Multi-Tenant Booking Platform", d: "Subscription SaaS with billing & dashboards. Placeholder — real case study coming soon.", metric: "3× faster onboarding" },
  { tag: "AI", t: "WhatsApp AI Lead Bot", d: "AI chatbot that qualifies and routes leads 24/7. Placeholder — real case study coming soon.", metric: "60s avg response" },
  { tag: "CRM", t: "Custom Agency CRM", d: "Pipeline + automation CRM for a marketing team. Placeholder — real case study coming soon.", metric: "40% less manual work" },
];

const SOFTWARE_SEO_PAGES = getSeoLandingPagesByFamily("software-development");

const FAQS = [
  { q: "What is a software development company?", a: "A software development company designs, builds, tests, and maintains custom software — web apps, mobile apps, SaaS, CRM, ERP and AI systems — tailored to a business's exact needs. Crea8iv Media is a software development company in Rawalpindi & Islamabad serving clients across Pakistan." },
  { q: "Do you build custom software or only use templates?", a: "We build fully custom software around your business logic. No rigid templates — your system, your workflows, your data, engineered to scale." },
  { q: "What is SaaS development?", a: "SaaS development is building cloud software that customers access by subscription. It includes multi-tenant architecture, billing, dashboards, and user management — everything needed to run a subscription product." },
  { q: "How much does custom software development cost in Pakistan?", a: "Cost depends on scope, complexity, and integrations. Simple tools start lower; full SaaS or ERP platforms cost more. We give a fixed, transparent quote after a free discovery call." },
  { q: "How long does it take to build custom software?", a: "A focused MVP typically ships in 6–12 weeks. Larger platforms take longer. We work in weekly sprints so you see progress continuously." },
  { q: "Can you build a CRM for my business?", a: "Yes. We build custom CRMs with lead capture, pipelines, automation, and reporting — designed around how your team actually sells." },
  { q: "What is ERP software and do I need it?", a: "ERP (Enterprise Resource Planning) unifies inventory, finance, HR, and operations into one system. You need it when spreadsheets and disconnected tools start slowing your business down." },
  { q: "Do you develop mobile apps for iOS and Android?", a: "Yes. We build native-feel iOS and Android apps engineered for speed, retention, and app-store visibility." },
  { q: "Can you add AI features to my software?", a: "Yes. We add AI agents, chatbots, automation, and AI dashboards — including OpenAI-powered features — to new or existing products." },
  { q: "What is multi-tenant SaaS architecture?", a: "Multi-tenant means one application serves many customers while keeping each customer's data isolated and secure. It's the standard architecture for scalable SaaS." },
  { q: "Do you integrate payment and billing systems?", a: "Yes. We integrate Stripe and local gateways with subscriptions, invoices, proration, and tax handling." },
  { q: "Will my software be scalable?", a: "Yes. We architect for scale from day one — so your system handles growth in users, data, and traffic without rewrites." },
  { q: "Do you provide ongoing support after launch?", a: "Yes. We offer ongoing support, monitoring, and iteration so your product keeps improving after go-live." },
  { q: "What technologies do you use?", a: "We use modern, proven stacks: Next.js, React, Node.js, TypeScript, Python, Laravel, PostgreSQL, MongoDB, AWS, Vercel, OpenAI, and Stripe." },
  { q: "Can you rebuild or fix existing software?", a: "Yes. We audit, refactor, modernize, or rebuild existing systems — and add new features or AI capabilities." },
  { q: "Do you build business automation software?", a: "Yes. We connect your tools and automate repetitive workflows so your team spends time on work that matters." },
  { q: "Which industries do you build software for?", a: "We build for healthcare, real estate, restaurants, education, ecommerce, finance, logistics, manufacturing, agencies, law firms, and clinics." },
  { q: "Do you sign an NDA?", a: "Yes. We're happy to sign an NDA before discussing your project in detail. Your idea and data stay protected." },
  { q: "Who owns the code you build?", a: "You do. On final payment, you own 100% of the source code and intellectual property." },
  { q: "Can you build an MVP first?", a: "Yes — and we recommend it. We ship a focused MVP fast, validate with real users, then scale based on evidence." },
  { q: "Do you build dashboards and admin panels?", a: "Yes. Real-time dashboards, admin panels, and analytics are core to most systems we build." },
  { q: "Can you integrate with my existing tools?", a: "Yes. We integrate CRMs, ERPs, payment systems, marketing tools, and any service with an API." },
  { q: "Is custom software better than off-the-shelf?", a: "Custom software fits your exact workflow, scales with you, and removes monthly per-seat limits. Off-the-shelf is faster to start but rarely fits as you grow." },
  { q: "Do you build AI chatbots for WhatsApp?", a: "Yes. We build WhatsApp AI chatbots that qualify leads, answer questions, and route conversations 24/7." },
  { q: "How do I start a project with Crea8iv Media?", a: "Book a free discovery call. We'll map your goals, scope the build, and send a fixed proposal — no obligation." },
];

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl("software-development")}#webpage`,
        url: pageUrl("software-development"),
        name: PAGE_METADATA["software-development"].title,
        description: PAGE_METADATA["software-development"].description,
        abstract: PAGE_METADATA["software-development"].summary,
        isPartOf: { "@id": "https://crea8ivmedia.com/#website" },
        about: [{ "@id": "https://crea8ivmedia.com/#organization" }, { "@id": FOUNDER.personId }],
        author: { "@id": FOUNDER.personId },
        breadcrumb: { "@id": `${pageUrl("software-development")}#breadcrumb` },
        inLanguage: "en-PK",
      },
      {
        "@type": "Service",
        "@id": "https://crea8ivmedia.com/software-development/#service",
        serviceType: "Software Development",
        name: "Software Development — Crea8iv Media",
        description:
          "Custom software, SaaS, CRM, ERP, mobile apps and AI applications built to scale businesses in Rawalpindi, Islamabad and across Pakistan.",
        provider: {
          "@type": "ProfessionalService",
          name: BUSINESS_DETAILS.brandName,
          legalName: BUSINESS_DETAILS.legalName,
          url: "https://crea8ivmedia.com",
          telephone: BUSINESS_DETAILS.phone,
          email: BUSINESS_DETAILS.email,
          areaServed: ["Rawalpindi", "Islamabad", "Pakistan"],
          address: {
            "@type": "PostalAddress",
            streetAddress: BUSINESS_DETAILS.streetAddress,
            addressLocality: BUSINESS_DETAILS.addressLocality,
            addressRegion: BUSINESS_DETAILS.addressRegion,
            postalCode: BUSINESS_DETAILS.postalCode,
            addressCountry: BUSINESS_DETAILS.addressCountry,
          },
        },
        areaServed: [
          { "@type": "City", name: "Rawalpindi" },
          { "@type": "City", name: "Islamabad" },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Software Development Services",
          itemListElement: SERVICES.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.title },
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl("software-development")}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://crea8ivmedia.com/" },
          { "@type": "ListItem", position: 2, name: "Software Development", item: pageUrl("software-development") },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function SoftwareDevelopmentPage() {
  return (
    <div className="native-page relative overflow-hidden">
      <JsonLd />

      {/* HERO */}
      <section className="relative px-6 pt-48 pb-20 lg:px-10">
        <div className="mx-auto max-w-[1100px] text-center">
          <Reveal>
            <p className="lux-eyebrow mb-6 justify-center">Software Development Company</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="font-orbitron text-[clamp(2.4rem,6vw,4.6rem)] font-bold leading-[1.05] tracking-normal text-white">
              Custom Software Built To{" "}
              <span className="text-transparent bg-clip-text bg-molten">Scale Businesses</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl font-inter text-lg leading-relaxed text-white/70">
              SaaS, CRM, ERP, mobile apps and AI applications — engineered in Rawalpindi &amp;
              Islamabad to grow with your business, not hold it back.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/contact" variant="solid" size="lg">Book Discovery Call</Button>
              <Button href="/contact" variant="primary" size="lg">Get a Proposal</Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-[1280px]">
          <Reveal className="mb-12 text-center">
            <p className="lux-eyebrow mb-4 justify-center">What We Build</p>
            <h2 className="font-orbitron text-[clamp(1.8rem,4vw,3rem)] font-bold text-white">
              Software That Moves Your Business
            </h2>
          </Reveal>
          <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s) => (
              <RevealItem key={s.title}>
                <div className="lux-card group h-full overflow-hidden p-4 transition duration-500 hover:-translate-y-1 hover:border-[#FF6801]/50 hover:shadow-[0_26px_70px_rgba(0,0,0,.42),0_0_28px_rgba(255,104,1,.12)]">
                  <div className="relative mb-5 aspect-video overflow-hidden rounded-[18px] border border-white/10 bg-black">
                    <Image
                      src={s.visual.image}
                      alt={s.visual.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/52 via-transparent to-white/[0.03]" />
                  </div>
                  <div className="mb-4 text-3xl">{s.icon}</div>
                  <h3 className="font-orbitron text-lg font-semibold text-white">{s.title}</h3>
                  <p className="mt-2 font-inter text-sm leading-relaxed text-white/60">{s.desc}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* SOFTWARE SEO CLUSTER */}
      <section className="px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-[1280px]">
          <Reveal className="mb-12 text-center">
            <p className="lux-eyebrow mb-4 justify-center">Software Development Guides</p>
            <h2 className="font-orbitron text-[clamp(1.8rem,4vw,3rem)] font-bold text-white">
              Explore custom software paths by project type
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-inter text-base leading-7 text-white/62">
              Focused pages for founders and business owners searching for custom software,
              CRM, SaaS and AI development in Pakistan.
            </p>
          </Reveal>
          <RevealGroup className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {SOFTWARE_SEO_PAGES.map((page) => (
              <RevealItem key={page.slug}>
                <Link
                  href={`/software-development/${page.slug}/`}
                  className="lux-card group block h-full p-6 transition hover:border-[#FF6801]/50 hover:bg-white/[0.045]"
                >
                  <p className="font-orbitron text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF6801]">
                    {page.eyebrow}
                  </p>
                  <h3 className="mt-3 font-orbitron text-lg font-semibold leading-tight text-white">{page.title}</h3>
                  <p className="mt-3 line-clamp-4 font-inter text-sm leading-6 text-white/62">{page.quickAnswer}</p>
                  <span className="mt-5 inline-flex items-center gap-2 font-orbitron text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF6801]">
                    Open guide <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                  </span>
                </Link>
              </RevealItem>
            ))}
            <RevealItem>
              <Link
                href="/guides/custom-software-development-company-pakistan/"
                className="lux-card group block h-full p-6 transition hover:border-[#FF6801]/50 hover:bg-white/[0.045]"
              >
                <p className="font-orbitron text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF6801]">
                  Buyer guide
                </p>
                <h3 className="mt-3 font-orbitron text-lg font-semibold leading-tight text-white">
                  How to choose a custom software development company
                </h3>
                <p className="mt-3 line-clamp-4 font-inter text-sm leading-6 text-white/62">
                  A practical guide for comparing software partners, MVP scope, CRM,
                  SaaS, AI features, ownership, usability and launch risk.
                </p>
                <span className="mt-5 inline-flex items-center gap-2 font-orbitron text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF6801]">
                  Open guide <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </span>
              </Link>
            </RevealItem>
            <RevealItem>
              <Link
                href="/playbooks/plan-custom-software-mvp-pakistan/"
                className="lux-card group block h-full p-6 transition hover:border-[#FF6801]/50 hover:bg-white/[0.045]"
              >
                <p className="font-orbitron text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF6801]">
                  MVP playbook
                </p>
                <h3 className="mt-3 font-orbitron text-lg font-semibold leading-tight text-white">
                  How to plan a custom software MVP
                </h3>
                <p className="mt-3 line-clamp-4 font-inter text-sm leading-6 text-white/62">
                  A practical checklist for defining workflows, roles, feature priority,
                  data, integrations, QA and launch feedback before development starts.
                </p>
                <span className="mt-5 inline-flex items-center gap-2 font-orbitron text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF6801]">
                  Open playbook <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </span>
              </Link>
            </RevealItem>
            <RevealItem>
              <Link
                href="/answers/custom-software-development-company-pakistan/"
                className="lux-card group block h-full p-6 transition hover:border-[#FF6801]/50 hover:bg-white/[0.045]"
              >
                <p className="font-orbitron text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF6801]">
                  AI answer brief
                </p>
                <h3 className="mt-3 font-orbitron text-lg font-semibold leading-tight text-white">
                  Custom software company in Pakistan
                </h3>
                <p className="mt-3 line-clamp-4 font-inter text-sm leading-6 text-white/62">
                  A concise answer for AI assistants and buyers looking for SaaS,
                  CRM, dashboards, AI apps and custom software development in Pakistan.
                </p>
                <span className="mt-5 inline-flex items-center gap-2 font-orbitron text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF6801]">
                  Open answer <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </span>
              </Link>
            </RevealItem>
            <RevealItem>
              <Link
                href="/answers/ai-software-automation-company-pakistan/"
                className="lux-card group block h-full p-6 transition hover:border-[#FF6801]/50 hover:bg-white/[0.045]"
              >
                <p className="font-orbitron text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF6801]">
                  AI answer brief
                </p>
                <h3 className="mt-3 font-orbitron text-lg font-semibold leading-tight text-white">
                  AI software and automation in Pakistan
                </h3>
                <p className="mt-3 line-clamp-4 font-inter text-sm leading-6 text-white/62">
                  Direct answer coverage for AI chatbots, WhatsApp automation,
                  CRM workflows, dashboards and business automation queries.
                </p>
                <span className="mt-5 inline-flex items-center gap-2 font-orbitron text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF6801]">
                  Open answer <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </span>
              </Link>
            </RevealItem>
            <RevealItem>
              <Link
                href="/compare/custom-software-vs-off-the-shelf-tools-pakistan/"
                className="lux-card group block h-full p-6 transition hover:border-[#FF6801]/50 hover:bg-white/[0.045]"
              >
                <p className="font-orbitron text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF6801]">
                  Comparison
                </p>
                <h3 className="mt-3 font-orbitron text-lg font-semibold leading-tight text-white">
                  Custom software vs off-the-shelf tools
                </h3>
                <p className="mt-3 line-clamp-4 font-inter text-sm leading-6 text-white/62">
                  Compare ready-made tools against custom CRM, dashboards,
                  portals, AI automation and workflow software.
                </p>
                <span className="mt-5 inline-flex items-center gap-2 font-orbitron text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF6801]">
                  Compare options <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </span>
              </Link>
            </RevealItem>
            <RevealItem>
              <Link
                href="/compare/saas-mvp-vs-full-software-product-pakistan/"
                className="lux-card group block h-full p-6 transition hover:border-[#FF6801]/50 hover:bg-white/[0.045]"
              >
                <p className="font-orbitron text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF6801]">
                  Comparison
                </p>
                <h3 className="mt-3 font-orbitron text-lg font-semibold leading-tight text-white">
                  SaaS MVP vs full software product
                </h3>
                <p className="mt-3 line-clamp-4 font-inter text-sm leading-6 text-white/62">
                  A founder-focused page for deciding whether to validate a
                  SaaS MVP first or build a broader software product.
                </p>
                <span className="mt-5 inline-flex items-center gap-2 font-orbitron text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF6801]">
                  Compare options <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </span>
              </Link>
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      {/* WHY CHOOSE US + TECH STACK */}
      <section className="px-6 py-20 lg:px-10">
        <div className="mx-auto grid max-w-[1280px] items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="lux-eyebrow mb-4">Why Crea8iv Media</p>
            <h2 className="font-orbitron text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-tight text-white">
              We Build Products, Not Just Projects
            </h2>
            <ul className="mt-8 space-y-4">
              {[
                ["Outcome-Driven", "We build to grow revenue and cut cost — not to tick feature lists."],
                ["You Own Everything", "100% source code and IP transfer on completion."],
                ["Scalable By Design", "Architected for growth from day one — no costly rewrites."],
                ["Transparent & Fixed", "Clear scope, fixed quote, weekly sprint updates."],
              ].map(([t, d]) => (
                <li key={t} className="flex gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#FF6801]/40 text-[#FF6801]">✓</span>
                  <span><span className="font-semibold text-white">{t}.</span> <span className="text-white/60">{d}</span></span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="lux-card p-8">
              <h3 className="font-orbitron text-lg font-semibold text-white">Technology Stack</h3>
              <p className="mt-2 text-sm text-white/60">Modern, proven, scalable tools.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {STACK.map((tech) => (
                  <span key={tech} className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-inter text-sm text-white/80">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-[1280px] text-center">
          <Reveal className="mb-10">
            <p className="lux-eyebrow mb-4 justify-center">Industries We Serve</p>
            <h2 className="font-orbitron text-[clamp(1.8rem,4vw,3rem)] font-bold text-white">
              Software For Every Sector
            </h2>
          </Reveal>
          <Reveal>
            <div className="flex flex-wrap justify-center gap-3">
              {INDUSTRIES.map((i) => (
                <span key={i} className="rounded-full border border-[#FF6801]/30 bg-transparent px-5 py-2.5 font-inter text-[15px] text-white/85 transition-colors hover:border-[#FF6801] hover:bg-[#FF6801]/10">
                  {i}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* SAAS SECTION */}
      <section className="px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-[1280px]">
          <Reveal className="mb-12 text-center">
            <p className="lux-eyebrow mb-4 justify-center">SaaS Development</p>
            <h2 className="font-orbitron text-[clamp(1.8rem,4vw,3rem)] font-bold text-white">
              Everything Your SaaS Needs To Scale
            </h2>
          </Reveal>
          <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SAAS_FEATURES.map((f) => (
              <RevealItem key={f.t}>
                <div className="lux-card h-full p-6">
                  <h3 className="font-orbitron text-base font-semibold text-[#FF6801]">{f.t}</h3>
                  <p className="mt-2 font-inter text-sm leading-relaxed text-white/60">{f.d}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* AI SECTION */}
      <section className="px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-[1280px]">
          <Reveal className="mb-12 text-center">
            <p className="lux-eyebrow mb-4 justify-center">AI Development</p>
            <h2 className="font-orbitron text-[clamp(1.8rem,4vw,3rem)] font-bold text-white">
              AI That Does The Work
            </h2>
          </Reveal>
          <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {AI_FEATURES.map((f) => (
              <RevealItem key={f.t}>
                <div className="lux-card h-full p-6">
                  <h3 className="font-orbitron text-base font-semibold text-[#FF6801]">{f.t}</h3>
                  <p className="mt-2 font-inter text-sm leading-relaxed text-white/60">{f.d}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* PROCESS */}
      <section className="px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-[1280px]">
          <Reveal className="mb-12 text-center">
            <p className="lux-eyebrow mb-4 justify-center">Our Process</p>
            <h2 className="font-orbitron text-[clamp(1.8rem,4vw,3rem)] font-bold text-white">
              From Idea To Launch To Growth
            </h2>
          </Reveal>
          <RevealGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p) => (
              <RevealItem key={p.n}>
                <div className="lux-card h-full p-6">
                  <div className="font-orbitron text-2xl font-bold text-[#FF6801]">{p.n}</div>
                  <h3 className="mt-3 font-orbitron text-base font-semibold text-white">{p.t}</h3>
                  <p className="mt-2 font-inter text-sm leading-relaxed text-white/60">{p.d}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-[1280px]">
          <Reveal className="mb-12 text-center">
            <p className="lux-eyebrow mb-4 justify-center">Case Studies</p>
            <h2 className="font-orbitron text-[clamp(1.8rem,4vw,3rem)] font-bold text-white">
              Real Systems, Real Outcomes
            </h2>
          </Reveal>
          <RevealGroup className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {CASE_STUDIES.map((c) => (
              <RevealItem key={c.t}>
                <div className="lux-card h-full p-6">
                  <span className="inline-block rounded-full border border-[#FF6801]/40 px-3 py-1 font-orbitron text-[10px] uppercase tracking-widest text-[#FF6801]">{c.tag}</span>
                  <h3 className="mt-4 font-orbitron text-lg font-semibold text-white">{c.t}</h3>
                  <p className="mt-2 font-inter text-sm leading-relaxed text-white/60">{c.d}</p>
                  <div className="mt-4 font-orbitron text-xl font-bold text-[#FF6801]">{c.metric}</div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-[860px]">
          <Reveal className="mb-12 text-center">
            <p className="lux-eyebrow mb-4 justify-center">FAQs</p>
            <h2 className="font-orbitron text-[clamp(1.8rem,4vw,3rem)] font-bold text-white">
              Software Development Questions
            </h2>
          </Reveal>
          <div className="space-y-4">
            {FAQS.map((f) => (
              <Reveal key={f.q}>
                <div className="lux-card p-6">
                  <h3 className="font-orbitron text-[15px] font-semibold text-white">{f.q}</h3>
                  <p className="mt-2 font-inter text-sm leading-relaxed text-white/65">{f.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-[1180px]">
          <Reveal>
            <div className="grid gap-8 rounded-[28px] border border-[#FF6801]/20 bg-[linear-gradient(135deg,rgba(255,104,1,0.12),rgba(255,255,255,0.03))] p-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
              <div>
                <p className="lux-eyebrow mb-4">Founder And Service Context</p>
                <h2 className="font-orbitron text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-white">
                  Software buyers should be able to verify the company entity behind the build
                </h2>
                <p className="mt-5 max-w-2xl font-inter text-base leading-8 text-white/68">
                  {FOUNDER.name} is the Founder and CEO of {FOUNDER.organization}. Linking the
                  founder profile from this service page gives buyers, search engines, and AI
                  assistants a direct first-party path from software-development intent into the
                  verified company leadership record.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link href={FOUNDER.canonicalPath} className="inline-flex items-center justify-center rounded-full bg-[#FF6801] px-6 py-3 font-orbitron text-[11px] font-bold uppercase tracking-[0.14em] text-[#1c0d00] transition-all hover:shadow-[0_0_30px_rgba(255,104,1,0.35)]">
                    View Founder Profile
                  </Link>
                  <Link href="/ai-search-optimization/" className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 font-orbitron text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:border-[#FF6801]/60 hover:text-[#FF6801]">
                    Explore AI Search Optimization
                  </Link>
                </div>
              </div>

              <div className="grid gap-4">
                {FOUNDER_AUTHORITY_RESOURCES.map((resource) => (
                  <Link
                    key={resource.href}
                    href={resource.href}
                    className="rounded-[22px] border border-white/[0.08] bg-black/20 p-5 transition hover:border-[#FF6801]/45 hover:bg-black/30"
                  >
                    <h3 className="font-orbitron text-sm font-semibold uppercase tracking-[0.08em] text-white">
                      {resource.title}
                    </h3>
                    <p className="mt-2 font-inter text-sm leading-6 text-white/58">{resource.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-[900px] text-center">
          <Reveal>
            <h2 className="font-orbitron text-[clamp(2rem,5vw,3.4rem)] font-bold leading-tight text-white">
              Ready To Build Software That Scales?
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-inter text-lg text-white/70">
              Book a free discovery call. We&apos;ll map your idea, scope the build, and send a fixed proposal — no obligation.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/contact" variant="solid" size="lg">Book Discovery Call</Button>
              <Button href="/contact" variant="primary" size="lg">Start a Project</Button>
            </div>
            <p className="mt-6 font-inter text-sm text-white/40">
              📍 Bahria Town, Rawalpindi · +92 313 5147935 · Serving Rawalpindi &amp; Islamabad
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
