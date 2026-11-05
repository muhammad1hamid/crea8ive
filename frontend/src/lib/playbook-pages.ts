export type PlaybookStep = {
  name: string;
  text: string;
  checks: string[];
};

export type PlaybookPage = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  updated: string;
  summary: string;
  outcome: string;
  bestFor: string[];
  steps: PlaybookStep[];
  tools: Array<{ name: string; purpose: string }>;
  evidenceLinks: Array<{ label: string; href: string; note: string }>;
  faqs: Array<{ question: string; answer: string }>;
};

export const playbookPages: PlaybookPage[] = [
  {
    slug: "plan-business-website-pakistan",
    title: "How to Plan a Business Website in Pakistan",
    metaTitle: "How to Plan a Business Website in Pakistan | Crea8iv Media",
    metaDescription:
      "Step-by-step business website planning playbook for Pakistan: audience, offer, pages, proof, SEO, WhatsApp, forms and launch checks.",
    eyebrow: "Website planning playbook",
    h1: "Plan a business website that can rank, build trust and convert.",
    updated: "2026-09-01",
    summary:
      "A business website in Pakistan should be planned around the buyer journey before design starts. The right plan clarifies who the site serves, what the offer is, which pages need to exist, what proof supports trust, and how visitors will contact the business through WhatsApp, calls or forms.",
    outcome:
      "Use this playbook to create a clear website scope before design and development, so the final site has a stronger SEO structure, cleaner mobile experience and a more obvious lead path.",
    bestFor: ["Restaurants and cafes", "Clinics and dental practices", "Architecture and interior studios", "Ecommerce and service businesses"],
    steps: [
      {
        name: "Define the buyer and primary conversion",
        text:
          "Start by naming the exact buyer, location and action the website should create. A restaurant may need WhatsApp orders, a clinic may need appointments, and an architecture studio may need consultation enquiries.",
        checks: ["Buyer type is clear", "Primary CTA is chosen", "Service area is defined", "WhatsApp, call or form path is selected"],
      },
      {
        name: "Map the core page structure",
        text:
          "Plan the homepage, service pages, about page, portfolio or proof page, FAQ section, contact page and any niche landing pages before visual design starts.",
        checks: ["Homepage role is clear", "Service pages are separated", "Portfolio proof has a place", "Contact page has complete business details"],
      },
      {
        name: "Write the offer and trust proof",
        text:
          "Each page should quickly explain what the business does, who it serves, why it is credible and what the visitor should do next.",
        checks: ["Headline is specific", "Benefits are scannable", "Proof is visible", "CTA wording matches user intent"],
      },
      {
        name: "Build SEO and AI answer structure",
        text:
          "Add direct answer paragraphs, FAQ blocks, internal links, service-area wording, descriptive headings and schema so Google and AI systems can understand the page.",
        checks: ["Page has one clear H1", "FAQs answer real buyer questions", "Schema matches visible content", "Internal links support related pages"],
      },
      {
        name: "Prepare launch and measurement",
        text:
          "Before launch, check mobile speed, image compression, form delivery, WhatsApp links, analytics events, redirects and sitemap inclusion.",
        checks: ["Forms work", "WhatsApp opens correctly", "Sitemap includes pages", "Analytics and conversion checks are ready"],
      },
    ],
    tools: [
      { name: "Website Development", purpose: "Design and development of the conversion-ready website." },
      { name: "SEO Structure", purpose: "Metadata, headings, schema, URLs and internal links." },
      { name: "WhatsApp Lead Flow", purpose: "Click-to-WhatsApp, direct enquiry and follow-up path." },
    ],
    evidenceLinks: [
      { label: "Website Development", href: "/website-development/", note: "Main service page for website planning and development." },
      { label: "Best Website Company Guide", href: "/guides/best-website-development-company-pakistan/", note: "Buyer guide for choosing a website partner." },
      { label: "Website Cost Guide", href: "/guides/website-development-cost-pakistan/", note: "Pricing and scope planning guide." },
      { label: "Website Company vs Freelancer", href: "/compare/website-development-company-vs-freelancer-pakistan/", note: "Comparison for delivery-model decisions." },
    ],
    faqs: [
      {
        question: "What should a business website include in Pakistan?",
        answer:
          "A business website should include a clear homepage, service pages, proof or portfolio, FAQs, contact details, WhatsApp or form lead capture, SEO metadata, responsive design and a sitemap.",
      },
      {
        question: "Should SEO be planned before website design?",
        answer:
          "Yes. SEO should be planned before design so the site architecture, headings, service pages, internal links and schema support search visibility from the start.",
      },
    ],
  },
  {
    slug: "website-redesign-seo-migration-pakistan",
    title: "Website Redesign SEO Migration Checklist Pakistan",
    metaTitle: "Website Redesign SEO Migration Checklist Pakistan | Crea8iv Media",
    metaDescription:
      "Website redesign and SEO migration checklist for Pakistan businesses that need a new design without losing rankings, traffic, leads or tracking.",
    eyebrow: "Redesign checklist",
    h1: "Redesign a website without losing search visibility or leads.",
    updated: "2026-09-01",
    summary:
      "A website redesign should improve trust, speed and conversion without breaking the pages, links and search signals that already work. The safest process documents the existing site, protects important URLs, improves content carefully and tests every lead path before launch.",
    outcome:
      "Use this checklist when an old website needs a better visual system, clearer copy, faster mobile experience and SEO-safe launch path.",
    bestFor: ["Outdated websites", "Slow mobile sites", "Businesses changing design direction", "Websites with existing Google traffic"],
    steps: [
      {
        name: "Inventory the existing website",
        text:
          "List every indexed page, important landing page, high-traffic URL, contact form, WhatsApp link, image and downloadable asset before editing the design.",
        checks: ["Current URLs are listed", "Important pages are identified", "Existing metadata is captured", "Forms and tracking are documented"],
      },
      {
        name: "Decide what to keep, improve or remove",
        text:
          "Preserve pages that already rank or convert. Rewrite weak content, merge duplicate sections and remove pages that have no buyer or search purpose.",
        checks: ["Ranking pages are protected", "Duplicate content is merged", "Weak copy is rewritten", "No useful proof is lost"],
      },
      {
        name: "Map redirects and internal links",
        text:
          "If URLs change, map old URLs to the closest new URLs. Update navigation, footer links, sitemap and internal links so visitors and crawlers can move cleanly.",
        checks: ["Redirect map exists", "Broken links are checked", "Sitemap is updated", "Breadcrumbs and canonicals match new URLs"],
      },
      {
        name: "Improve conversion paths",
        text:
          "The redesign should make next steps easier. Place WhatsApp, call, booking or proposal CTAs where intent is strongest, especially on mobile.",
        checks: ["Primary CTA is visible", "Mobile tap targets are large enough", "Contact options are clear", "Lead destination is tested"],
      },
      {
        name: "Run final launch QA",
        text:
          "Test responsive layouts, speed, image loading, schema, forms, WhatsApp, sitemap, robots.txt, analytics and key pages before uploading the final build.",
        checks: ["Responsive QA passes", "Schema is valid", "Forms deliver", "No major layout shift is visible"],
      },
    ],
    tools: [
      { name: "Redesign Audit", purpose: "Find design, content, UX, SEO and conversion gaps." },
      { name: "SEO Migration", purpose: "Protect URLs, metadata, links, schema and sitemap entries." },
      { name: "Conversion QA", purpose: "Test forms, WhatsApp, calls and proposal CTAs before launch." },
    ],
    evidenceLinks: [
      { label: "Website Development", href: "/website-development/", note: "Main website redesign and development service." },
      { label: "Website Cost Guide", href: "/guides/website-development-cost-pakistan/", note: "Scope and pricing factors for redesigns." },
      { label: "WordPress vs Custom", href: "/compare/wordpress-vs-custom-website-pakistan/", note: "Platform decision support." },
      { label: "Contact", href: "/contact/", note: "Start a redesign audit or project discussion." },
    ],
    faqs: [
      {
        question: "Can a redesign hurt SEO?",
        answer:
          "Yes, a redesign can hurt SEO if URLs, headings, internal links, content, redirects, metadata or schema are removed without planning. A proper migration checklist reduces that risk.",
      },
      {
        question: "What should be tested before a redesigned website goes live?",
        answer:
          "Test mobile layout, page speed, forms, WhatsApp links, call links, redirects, sitemap, robots.txt, metadata, schema and analytics events before launch.",
      },
    ],
  },
  {
    slug: "plan-custom-software-mvp-pakistan",
    title: "How to Plan a Custom Software MVP in Pakistan",
    metaTitle: "How to Plan a Custom Software MVP in Pakistan | Crea8iv Media",
    metaDescription:
      "Step-by-step custom software MVP planning guide for Pakistan founders and businesses: workflows, roles, features, data, integrations and launch roadmap.",
    eyebrow: "Software MVP playbook",
    h1: "Plan a custom software MVP before building the full product.",
    updated: "2026-09-01",
    summary:
      "A custom software MVP should solve one important workflow for real users before the product grows into a larger platform. Good MVP planning defines the users, core problem, minimum feature set, data model, integrations, dashboard needs and launch feedback loop.",
    outcome:
      "Use this playbook to reduce software build risk, avoid unnecessary modules and define a first version that can be designed, developed, tested and improved with real usage.",
    bestFor: ["SaaS founders", "CRM and dashboard projects", "AI automation workflows", "Internal business systems"],
    steps: [
      {
        name: "Write the workflow problem",
        text:
          "Describe the manual process, missed lead, reporting gap or customer experience problem the software must solve. Avoid starting with features before the workflow is clear.",
        checks: ["Main workflow is documented", "Business problem is specific", "Users are named", "Success metric is defined"],
      },
      {
        name: "Define user roles and permissions",
        text:
          "List who will use the system, what each role can view, what each role can edit and where approvals or admin controls are needed.",
        checks: ["Roles are listed", "Permissions are clear", "Admin actions are defined", "Sensitive data is identified"],
      },
      {
        name: "Choose the MVP feature set",
        text:
          "Keep only the features required to complete the core workflow. Move advanced reports, extra modules and nice-to-have automation into later roadmap phases.",
        checks: ["Must-have features are separated", "Later features are parked", "MVP scope is realistic", "Launch timeline is easier to estimate"],
      },
      {
        name: "Map data and integrations",
        text:
          "Define the records, fields, dashboards, notifications and integrations needed for the MVP, including WhatsApp, forms, payments, CRM or AI where relevant.",
        checks: ["Core records are named", "Required fields are listed", "Integrations are prioritized", "Dashboard metrics are selected"],
      },
      {
        name: "Plan QA, launch and iteration",
        text:
          "Test the MVP with real roles and real scenarios. After launch, collect feedback, review usage and decide which roadmap items should be built next.",
        checks: ["Test scenarios exist", "Pilot users are selected", "Feedback loop is ready", "Next phase criteria are defined"],
      },
    ],
    tools: [
      { name: "Software Discovery", purpose: "Map workflows, roles, data and business goals." },
      { name: "MVP UX", purpose: "Design the first usable interface around the core workflow." },
      { name: "Custom Development", purpose: "Build SaaS, CRM, dashboards, portals or automation systems." },
    ],
    evidenceLinks: [
      { label: "Software Development", href: "/software-development/", note: "Main software development service." },
      { label: "SaaS Development", href: "/software-development/saas/", note: "SaaS MVP and product development." },
      { label: "Custom Software Guide", href: "/guides/custom-software-development-company-pakistan/", note: "Buyer guide for custom software partners." },
      { label: "SaaS MVP vs Full Product", href: "/compare/saas-mvp-vs-full-software-product-pakistan/", note: "Comparison for scope decisions." },
    ],
    faqs: [
      {
        question: "What should a software MVP include?",
        answer:
          "A software MVP should include the core user journey, essential roles, required data, main dashboard, basic notifications, launch-ready QA and a feedback loop for the next version.",
      },
      {
        question: "Why not build the full software product first?",
        answer:
          "Building the full product first can waste budget if the workflow, user demand or feature priorities are not validated. An MVP helps test the core product before deeper investment.",
      },
    ],
  },
  {
    slug: "ai-visibility-business-website-pakistan",
    title: "AI Visibility Checklist for Business Websites in Pakistan",
    metaTitle: "AI Visibility Checklist for Business Websites Pakistan | Crea8iv Media",
    metaDescription:
      "AI visibility checklist for Pakistan business websites: answer blocks, schema, llms.txt, pricing.md, service pages, FAQs, comparisons and internal links.",
    eyebrow: "AI visibility playbook",
    h1: "Make a business website easier for AI systems to understand and cite.",
    updated: "2026-09-01",
    summary:
      "AI visibility improves when a website gives search engines and AI assistants clear, extractable and trustworthy information. A strong setup includes direct answer blocks, service pages, schema, FAQs, comparison pages, buyer guides, machine-readable files and accurate entity details.",
    outcome:
      "Use this checklist to make business, website development and software development pages easier to parse for Google AI Overviews, ChatGPT, Perplexity, Gemini, Claude and Copilot.",
    bestFor: ["Service businesses", "Website development agencies", "Software companies", "Local businesses targeting AI search"],
    steps: [
      {
        name: "Create direct answer blocks",
        text:
          "Each important page should answer the main query in a short self-contained paragraph near the top or in an extractable section.",
        checks: ["Primary query is clear", "Answer is concise", "Brand and service are named", "Location is included where relevant"],
      },
      {
        name: "Add schema that matches visible content",
        text:
          "Use Organization, LocalBusiness, Article, FAQPage, HowTo, BreadcrumbList and ItemList schema only where the content exists on the page.",
        checks: ["Schema is accurate", "FAQ content is visible", "Breadcrumbs match page structure", "Dates are current"],
      },
      {
        name: "Publish machine-readable resources",
        text:
          "Add files such as llms.txt, services.md, pricing.md, website-development.md and software-development.md so AI agents can parse services without relying only on visual pages.",
        checks: ["llms.txt exists", "Services are structured", "Pricing notes are parseable", "Citation guidance is included"],
      },
      {
        name: "Build guides, comparisons and playbooks",
        text:
          "Support buyer-stage queries with guides, comparison pages and how-to playbooks that explain decisions in balanced, useful language.",
        checks: ["Buyer guides exist", "Comparison pages exist", "How-to pages exist", "Internal links connect clusters"],
      },
      {
        name: "Refresh and monitor",
        text:
          "Update dates, pricing notes, service pages and AI visibility checks regularly. Track whether the brand appears for target queries across search and AI tools.",
        checks: ["Last updated dates are visible", "Priority queries are tracked", "Content refresh cycle is scheduled", "Unsupported claims are removed"],
      },
    ],
    tools: [
      { name: "AI Search Optimization", purpose: "Entity SEO, AEO, GEO, LLMO and answer architecture." },
      { name: "Schema Optimization", purpose: "Structured data for search and AI understanding." },
      { name: "Content Architecture", purpose: "Guides, comparisons, playbooks and service clusters." },
    ],
    evidenceLinks: [
      { label: "AI Search Optimization", href: "/ai-search-optimization/", note: "Main service page for AI visibility." },
      { label: "AI Answer Briefs", href: "/answers/", note: "Short answer pages built for extraction." },
      { label: "Buyer Guides", href: "/guides/", note: "Decision guides for website and software buyers." },
      { label: "Comparisons", href: "/compare/", note: "Comparison pages for high-intent AI queries." },
    ],
    faqs: [
      {
        question: "What is AI visibility for a business website?",
        answer:
          "AI visibility means the website is structured so AI search systems can understand, summarize and cite the business for relevant service, location and buyer-intent queries.",
      },
      {
        question: "Do machine-readable files help AI visibility?",
        answer:
          "Machine-readable files can help AI agents parse services, pricing, positioning and citation guidance more easily, especially when paired with strong public pages and schema.",
      },
    ],
  },
];

export function getPlaybookPage(slug: string) {
  return playbookPages.find((page) => page.slug === slug);
}
