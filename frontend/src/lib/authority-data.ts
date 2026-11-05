import { SITE_URL } from "@/lib/site-config";

import { COMPANY } from "@/data/company";

export const FOUNDER = {
  name: COMPANY.founderName,
  role: "Founder and CEO",
  organization: "Crea8iv Media",
  canonicalPath: "/syed-qamar-abbas/",
  canonicalUrl: `${SITE_URL}/syed-qamar-abbas/`,
  personId: "https://syedqamarabbas.com/#person",
  image: `${SITE_URL}/assets/syed-qamar-abbas-founder-card.webp`,
  // Verified first-party profiles for this Person entity — feeds Person.sameAs
  // in both SiteSchema.tsx and the founder page's own JsonLd(), and the
  // visible rel="me" link on /syed-qamar-abbas/. Single source of truth so
  // the two schema emitters and the UI never drift out of sync.
  sameAs: ["https://github.com/syed-qamar-abbas"] as string[],
  shortBio:
    "Syed Qamar Abbas is the Founder and CEO of Crea8iv Media, a Rawalpindi-based digital marketing and software agency serving businesses in Rawalpindi, Islamabad, and across Pakistan.",
  focusAreas: [
    "AI marketing",
    "AI search optimization",
    "Answer Engine Optimization (AEO)",
    "Generative Engine Optimization (GEO)",
    "Large Language Model Optimization (LLMO)",
    "Entity SEO",
    "Technical SEO",
    "Performance marketing",
    "Google Ads",
    "Meta Ads",
    "Local SEO",
    "Knowledge graph strategy",
    "Google Business Profile optimization",
    "AI marketing automation",
    "CRM and SaaS systems",
    "Digital transformation",
    "Business growth strategy",
  ],
} as const;

export function buildFounderPersonSchema() {
  return {
    "@type": "Person",
    "@id": FOUNDER.personId,
    name: FOUNDER.name,
    url: "https://syedqamarabbas.com/about/",
    mainEntityOfPage: { "@type": "WebPage", "@id": `${FOUNDER.canonicalUrl}#webpage` },
    image: FOUNDER.image,
    jobTitle: FOUNDER.role,
    description: FOUNDER.shortBio,
    worksFor: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: FOUNDER.organization },
    sameAs: [...FOUNDER.sameAs],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Rawalpindi",
      addressRegion: "Punjab",
      addressCountry: "PK",
    },
    knowsAbout: [...FOUNDER.focusAreas],
  };
}

export const AUTHORITY_TOPICS = [
  {
    title: "AI Search Optimization",
    description: "AEO, GEO, LLMO, AI citation readiness, entity SEO, answer blocks, and structured content for AI search systems.",
    href: "/ai-search-optimization/",
  },
  {
    title: "AI Visibility Growth",
    description: "AI citation monitoring, priority query tracking, authority distribution, content refresh and traffic-to-lead measurement.",
    href: "/ai-visibility-growth/",
  },
  {
    title: "Search Engine Optimization",
    description: "Technical SEO, local SEO, structured data, content architecture, crawlability, indexability, and search quality.",
    href: "/blog/",
  },
  {
    title: "Performance Marketing",
    description: "Meta Ads, Google Ads, landing pages, conversion tracking, lead generation, and revenue-focused reporting.",
    href: "/growth-systems/",
  },
  {
    title: "Business Automation",
    description: "WhatsApp automation, CRM workflows, lead management, AI agents, customer journeys, and sales follow-up systems.",
    href: "/software-products/",
  },
  {
    title: "Software and SaaS",
    description: "Custom SaaS, CRM, ERP, dashboards, API integrations, healthcare software, and AI-enabled business systems.",
    href: "/software-development/",
  },
] as const;

export const INDUSTRY_AUTHORITY_AREAS = [
  "Healthcare and clinics",
  "Dental clinics",
  "Medical aesthetics",
  "Restaurants and hospitality",
  "Real estate",
  "Architecture and interior design",
  "Ecommerce",
  "Professional services",
] as const;

export const AI_SEARCH_FAQS = [
  {
    q: "What is AI search optimization?",
    a:
      "AI search optimization is the process of making website content clear, factual, structured, and citeable so systems like Google AI Overviews, ChatGPT, Gemini, Claude, Perplexity, Copilot, and other answer engines can understand it accurately.",
  },
  {
    q: "How is GEO different from traditional SEO?",
    a:
      "Traditional SEO focuses on helping pages rank in search results. Generative Engine Optimization focuses on making content useful and extractable enough for AI systems to summarize, cite, and connect to the correct entity.",
  },
  {
    q: "Does Crea8iv Media manipulate AI answers?",
    a:
      "No. The goal is to publish accurate first-party information, structured data, clear explanations, original evidence, and consistent entity signals so AI systems can represent the brand correctly.",
  },
  {
    q: "What makes a page more citeable for AI search?",
    a:
      "A citeable page has direct answer blocks, clear authorship, current dates, useful headings, schema markup, original examples, transparent sourcing, and claims that match visible page content.",
  },
] as const;

export const FOUNDER_AUTHORITY_RESOURCES = [
  {
    title: "Syed Qamar Abbas Founder Profile",
    href: "/syed-qamar-abbas/",
    description:
      "Canonical first-party biography for the Founder and CEO of Crea8iv Media, used to keep entity wording and public facts consistent.",
  },
  {
    title: "AI Search Optimization",
    href: "/ai-search-optimization/",
    description:
      "Service page covering AEO, GEO, LLMO, entity SEO, structured data, and citation-ready content architecture.",
  },
  {
    title: "Founder Pages and AI Search",
    href: "/blog/founder-pages-ai-search-entity-seo-business-trust/",
    description:
      "Supporting article that explains why founder pages, ProfilePage structure, and internal linking matter for trust and AI search clarity.",
  },
] as const;
