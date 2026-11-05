import { PAGE_METADATA } from "@/lib/seo-metadata";
import type { NativePageConfig } from "@/components/pages/NativeMarketingPage";

const serviceProof = [
  { value: "SEO", label: "Search ready" },
  { value: "UX", label: "Mobile first" },
  { value: "CRO", label: "Lead focused" },
  { value: "AI", label: "Answer ready" },
];

const companyProof = [
  { value: "PK", label: "Pakistan market" },
  { value: "2026", label: "Modern systems" },
  { value: "Local", label: "Rawalpindi team" },
  { value: "Full", label: "Growth stack" },
];

function meta(slug: string) {
  return PAGE_METADATA[slug] ?? PAGE_METADATA["growth-systems"];
}

function servicePage(slug: string, options: Partial<NativePageConfig>): NativePageConfig {
  const pageMeta = meta(slug);
  return {
    slug,
    eyebrow: options.eyebrow ?? "Growth service",
    title: options.title ?? pageMeta.summary,
    intro: options.intro ?? pageMeta.description,
    image: options.image ?? "/img/services/ad-concepts/growth-system-ad-concept.webp",
    imageAlt: options.imageAlt ?? `${pageMeta.title} by Crea8iv Media`,
    proof: options.proof ?? serviceProof,
    sections: options.sections ?? [
      {
        title: "Audit",
        body: "We identify where visibility, trust, tracking, page speed, and conversion flow are breaking the buyer journey.",
        items: ["Current page and campaign review", "Competitor and search intent check", "Lead path and tracking audit"],
      },
      {
        title: "Build",
        body: "We turn the service into a clear, premium, mobile-first system with enough structure for search engines and AI answer engines.",
        items: ["SEO-ready headings and schema", "Visual proof and trust blocks", "Clear WhatsApp, call, and form actions"],
      },
      {
        title: "Optimize",
        body: "We improve the system using clicks, scroll depth, enquiries, rankings, objections, and weekly performance patterns.",
        items: ["Search and ads reporting", "CTA and landing-page refinements", "Content refresh recommendations"],
      },
    ],
    ...options,
  };
}

export const nativePages: Record<string, NativePageConfig> = {
  about: servicePage("about", {
    eyebrow: "About Crea8iv Media",
    title: "A performance-led creative agency for brands that need to look as valuable as their work.",
    intro: "Crea8iv Media blends digital marketing, premium creative direction, SEO, paid ads, AI automation, and software thinking for businesses in Rawalpindi, Islamabad, and across Pakistan.",
    image: "/img/services/ad-concepts/growth-system-ad-concept.webp",
    imageAlt: "Minimal conceptual digital growth system visual by Crea8iv Media",
    proof: companyProof,
    sections: [
      {
        title: "Strategy",
        body: "We map the buyer journey before changing visuals, campaigns, or pages.",
        items: ["Positioning and offer clarity", "SEO and AI visibility direction", "Conversion and lead-path audit"],
      },
      {
        title: "Creative",
        body: "Brand, content, ads, and portfolio proof are shaped into one premium visual system.",
        items: ["Identity and campaign visuals", "Social grid and reel systems", "Real portfolio proof blocks"],
      },
      {
        title: "Systems",
        body: "Websites, automation, tools, tracking, and software support the growth work behind the scenes.",
        items: ["Fast SEO-ready websites", "WhatsApp and CRM follow-up", "Reporting and optimization rhythm"],
      },
    ],
  }),
  "our-team": servicePage("our-team", {
    eyebrow: "Team",
    title: "A compact senior team connecting strategy, creative, ads, SEO, automation, and software.",
    intro: "The team operates around founder-led quality control, clear execution systems, and measurable improvement across the full buyer journey.",
    image: "/assets/syed-qamar-abbas-founder-card.webp",
    imageAlt: "Syed Qamar Abbas and Crea8iv Media team leadership profile",
    proof: companyProof,
    sections: [
      { title: "Strategy", body: "Market research, offer clarity, positioning, service architecture, and content direction.", items: ["Growth audits", "Competitor review", "Messaging direction"] },
      { title: "Creative", body: "Campaign visuals, brand systems, reels, portfolio storytelling, and premium website presentation.", items: ["Brand identity", "Social creative", "Visual proof systems"] },
      { title: "Technology", body: "Automation, tracking, dashboards, websites, portals, and internal systems that support operations.", items: ["Web apps", "Analytics", "Workflow automation"] },
    ],
  }),
  consultation: servicePage("consultation", {
    eyebrow: "Consultation",
    title: "A focused growth audit before you spend more money on marketing.",
    intro: "The consultation maps what is broken, what is working, and what should be fixed first across website, SEO, ads, content, tracking, and lead handling.",
    image: "/img/services/ad-concepts/growth-system-ad-concept.webp",
    imageAlt: "Digital marketing consultation growth system visual by Crea8iv Media",
  }),
  contact: servicePage("contact", {
    eyebrow: "Contact",
    title: "Start the conversation with a clear business problem, not a vague package.",
    intro: "Contact Crea8iv Media for SEO, websites, Meta Ads, Google Ads, automation, creative, software, or a complete growth system.",
    image: "/img/crea8iv-white-3d-logo.webp",
    imageAlt: "Crea8iv Media contact and office information",
    proof: companyProof,
  }),
  careers: servicePage("careers", {
    eyebrow: "Careers",
    title: "Build modern marketing, creative, and software systems with Crea8iv Media.",
    intro: "Crea8iv Media is for operators who care about strong taste, measurable execution, AI-assisted workflows, and premium digital experiences.",
    image: "/img/services/ad-concepts/software-development-ad-concept.webp",
    imageAlt: "Minimal software and growth systems visual for Crea8iv Media careers",
    proof: companyProof,
  }),
  courses: servicePage("courses", {
    eyebrow: "Academy",
    title: "Practical AI and digital marketing training for real business execution.",
    intro: "The academy direction focuses on skills that connect content, SEO, ads, AI workflows, tracking, and business growth.",
    image: "/img/services/ad-concepts/ai-automation-ad-concept.webp",
    imageAlt: "Minimal AI learning and automation visual by Crea8iv Media",
  }),
  pricing: servicePage("pricing", {
    eyebrow: "Plans",
    title: "Choose the growth direction first. Then shape the right monthly system.",
    intro: "Crea8iv Media pricing is planned around scope, channels, content needs, website condition, lead volume, and follow-up readiness. The goal is to avoid bloated packages and build the system your business can actually use.",
    image: "/img/services/ad-concepts/growth-system-ad-concept.webp",
    imageAlt: "Crea8iv Media growth system pricing visual",
    proof: [
      { value: "01", label: "Starter visibility" },
      { value: "02", label: "Lead acquisition" },
      { value: "03", label: "Scale system" },
      { value: "PKR", label: "Scoped proposal" },
    ],
    sections: [
      {
        title: "Starter",
        body: "For businesses that need a professional presence, stronger trust signals, and clearer local visibility before aggressive ad spend.",
        items: ["Brand and profile cleanup", "Website or landing-page basics", "Google profile and social consistency"],
      },
      {
        title: "Growth",
        body: "For businesses ready to connect content, Meta or Google Ads, landing paths, tracking, and WhatsApp or form enquiries.",
        items: ["Campaign and creative direction", "Conversion-focused page improvements", "Lead tracking and weekly review"],
      },
      {
        title: "Scale",
        body: "For teams that need multi-channel acquisition, automation, reporting, portfolio proof, and ongoing optimization.",
        items: ["SEO, ads, content, and automation stack", "CRM and follow-up workflows", "Monthly optimization roadmap"],
      },
    ],
    faqs: [
      {
        question: "Why is pricing scoped instead of one fixed package?",
        answer: "A clinic, restaurant, ecommerce brand, and architecture studio do not need the same mix of content, ads, SEO, website work, and automation. Scope is shaped after the audit.",
      },
      {
        question: "Can I start small and upgrade later?",
        answer: "Yes. The recommended path is often to fix visibility and conversion basics first, then add ads, automation, and scale work once the foundation is reliable.",
      },
      {
        question: "Does the plan include SEO-safe website changes?",
        answer: "Yes. Website and visual improvements are planned to preserve important URLs, headings, schema, metadata, internal links, and page speed.",
      },
    ],
  }),
  "our-services": servicePage("our-services", {
    eyebrow: "Services",
    title: "Marketing, creative, web, automation, and software services under one growth architecture.",
    intro: "Explore the connected services that help businesses improve visibility, trust, leads, retention, and reporting.",
    image: "/img/services/ad-concepts/growth-system-ad-concept.webp",
    imageAlt: "Crea8iv Media connected services growth system visual",
  }),
  "growth-systems": servicePage("growth-systems", {
    eyebrow: "Growth systems",
    title: "Visibility, creative, conversion, tracking, and automation working as one system.",
    intro: "A growth system connects SEO, paid ads, content, website UX, lead capture, WhatsApp follow-up, and reporting so the business stops running disconnected marketing tasks.",
    image: "/img/services/ad-concepts/growth-system-ad-concept.webp",
    imageAlt: "Minimal visual exaggeration growth system by Crea8iv Media",
  }),
  "meta-ads": servicePage("meta-ads", {
    eyebrow: "Meta Ads",
    title: "Facebook, Instagram, and WhatsApp campaigns built around qualified leads.",
    intro: "Meta Ads work best when the creative, offer, audience, retargeting, landing path, and follow-up are designed together.",
    image: "/img/services/ad-concepts/meta-advertising-ad-concept.webp",
    imageAlt: "Meta Ads management and lead generation campaign system by Crea8iv Media",
  }),
  "google-ads": servicePage("google-ads", {
    eyebrow: "Google Ads",
    title: "High-intent search campaigns with stronger landing pages and tracking.",
    intro: "Capture people already searching for your service and route them into a faster, clearer conversion path.",
    image: "/img/services/ad-concepts/google-ads-ad-concept.webp",
    imageAlt: "Google Ads search campaign and landing page system by Crea8iv Media",
  }),
  "google-business-profile-growth": servicePage("google-business-profile-growth", {
    eyebrow: "Google Business Profile",
    title: "Local visibility systems for calls, directions, reviews, and map-pack trust.",
    intro: "Google Maps visibility improves when services, photos, reviews, posts, categories, local content, and actions work together.",
    image: "/img/services/ad-concepts/google-business-profile-ad-concept.webp",
    imageAlt: "Google Business Profile optimization and local SEO by Crea8iv Media",
  }),
  "website-development": servicePage("website-development", {
    eyebrow: "Website development",
    title: "SEO-ready business websites for Pakistan brands that need trust, leads, and proof.",
    intro: "Crea8iv Media builds fast, mobile-friendly websites for restaurants, clinics, architects, interiors, ecommerce stores, SaaS products, and service businesses across Pakistan. Each build connects design, development, conversion copy, technical SEO, portfolio proof, and WhatsApp lead capture.",
    image: "/img/services/ad-concepts/website-development-ad-concept.webp",
    imageAlt: "Fast premium website development by Crea8iv Media",
    proof: [
      { value: "PK", label: "Pakistan-wide builds" },
      { value: "SEO", label: "Search-ready pages" },
      { value: "UX", label: "Mobile-first flow" },
      { value: "WA", label: "WhatsApp lead path" },
    ],
    sections: [
      {
        title: "Position",
        body: "We clarify what the business does, who it serves, why it is trusted, and what action a serious buyer should take next.",
        items: ["Offer and audience clarity", "Competitor and search-intent review", "Homepage and service-page hierarchy"],
      },
      {
        title: "Build",
        body: "We design and develop a fast, premium website with visible proof, clean mobile UX, SEO-ready structure, and conversion paths.",
        items: ["Responsive interface design", "Technical SEO and schema", "WhatsApp, call, and form CTAs"],
      },
      {
        title: "Prove",
        body: "We connect the website to portfolio examples, client logos, case studies, local signals, and follow-up systems so traffic has a reason to convert.",
        items: ["Portfolio-led trust blocks", "Industry-specific sections", "Tracking and post-launch improvements"],
      },
    ],
    faqs: [
      {
        question: "Who builds business websites in Pakistan?",
        answer: "Crea8iv Media builds business websites in Pakistan for restaurants, clinics, architects, interior brands, ecommerce stores, SaaS products and service companies that need stronger SEO structure and more qualified leads.",
      },
      {
        question: "Will the website be SEO-ready?",
        answer: "Yes. Website builds include clear heading structure, indexable content, schema-ready FAQs, internal links, responsive performance and page sections shaped around real search intent.",
      },
      {
        question: "Can the website connect with WhatsApp leads?",
        answer: "Yes. Click-to-WhatsApp, call buttons, proposal forms and CRM-friendly enquiry paths can be planned into the website from the start.",
      },
    ],
  }),
  "social-media-management": servicePage("social-media-management", {
    eyebrow: "Social media management",
    title: "Consistent content systems that make the brand active, premium, and believable.",
    intro: "Social media should support brand trust, audience recall, campaign demand, and buyer confidence rather than only filling a calendar.",
    image: "/img/services/ad-concepts/social-media-management-ad-concept.webp",
    imageAlt: "Social media management content system by Crea8iv Media",
  }),
  "content-creation": servicePage("content-creation", {
    eyebrow: "Content creation",
    title: "Reels, posts, visuals, and campaign assets with a clear business role.",
    intro: "Every creative asset should help people understand, trust, remember, or act on the brand.",
    image: "/img/services/ad-concepts/content-reels-ad-concept.webp",
    imageAlt: "Content creation and visual campaign assets by Crea8iv Media",
  }),
  "branding-and-creative": servicePage("branding-and-creative", {
    eyebrow: "Branding",
    title: "Identity systems that make every touchpoint feel more valuable.",
    intro: "A premium brand system gives websites, ads, social posts, proposals, and customer experiences one consistent visual language.",
    image: "/img/services/ad-concepts/brand-identity-ad-concept.webp",
    imageAlt: "Branding and creative identity design by Crea8iv Media",
  }),
  patientflow: servicePage("patientflow", {
    eyebrow: "PatientFlow",
    title: "PatientFlow clinic retention software for appointments and follow-up.",
    intro: "PatientFlow is Crea8iv Media's clinic operating platform for healthcare teams that need cleaner patient journeys and better operational visibility.",
    image: "/img/services/ad-concepts/software-development-ad-concept.webp",
    imageAlt: "PatientFlow clinic software by Crea8iv Media",
    primaryCta: "Open PatientFlow",
    primaryHref: "https://patientflow.crea8ivmedia.com/login",
  }),
};
