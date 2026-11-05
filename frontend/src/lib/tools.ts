export type ToolCategory =
  | "SEO"
  | "AI Visibility"
  | "Local SEO"
  | "Ads"
  | "Website"
  | "ROI"
  | "Healthcare";

export type ToolMode =
  | "ai-visibility"
  | "local-seo"
  | "seo-audit"
  | "website-performance"
  | "marketing-roi"
  | "meta-ads"
  | "google-ads"
  | "patient-retention"
  | "website-roi"
  | "schema-generator";

export type ToolPage = {
  slug: string;
  name: string;
  title: string;
  description: string;
  updated?: string;
  benefit: string;
  category: ToolCategory;
  icon: string;
  mode: ToolMode;
  inputSummary: string;
  checks: string[];
  howItWorks: string[];
  audience: string[];
  interpretation: string;
  serviceHref: string;
  serviceLabel: string;
  resourceLinks: { label: string; href: string }[];
  relatedTools: string[];
  faqs: { question: string; answer: string }[];
};

export const TOOL_CATEGORIES = ["All", "SEO", "AI Visibility", "Local SEO", "Ads", "Website", "ROI", "Healthcare"] as const;

export const tools: ToolPage[] = [
  {
    slug: "ai-visibility-checker",
    name: "AI Visibility Checker",
    title: "Free AI Visibility Checker",
    description: "Estimate whether your brand is ready to be understood by ChatGPT, Google AI Overviews, Gemini, Claude, Perplexity, Copilot, and other AI answer systems.",
    benefit: "Find the entity, content, schema, crawler, authority, and proof gaps that make your brand harder for AI search systems to understand, cite, and compare.",
    category: "AI Visibility",
    icon: "AI",
    mode: "ai-visibility",
    inputSummary: "Website URL, brand name, industry, location, services, competitors, official profiles, citations, and visible website signals that AI systems can verify.",
    checks: [
      "Entity clarity: brand, founder, location, category, and service facts",
      "Schema coverage for Organization, LocalBusiness, Service, Article, FAQ, and WebApplication entities",
      "Answer-ready content for cost, fit, process, proof, service scope, and next steps",
      "Citation readiness through case studies, founder attribution, reviews, and third-party profiles",
      "Technical accessibility through crawlable HTML, sitemap inclusion, robots access, and canonical URLs",
      "Competitor and category context for comparison-style AI answers",
    ],
    howItWorks: [
      "Enter public business details, services, competitors, and official profiles.",
      "Mark the AI visibility signals already visible on your website and external profiles.",
      "Review readiness score, confidence, citation risk, prompt tests, and prioritized fixes.",
      "Use the result to decide whether to fix entity facts, service pages, schema, content, internal links, or authority first.",
    ],
    audience: ["Local service businesses", "Healthcare and clinic brands", "Pakistan SMEs preparing for AI search", "SEO, GEO, AEO, and LLMO teams"],
    interpretation: "This estimates AI visibility readiness and citation risk from the signals you provide. It does not query ChatGPT, Gemini, Claude, Perplexity, Copilot, or Google AI Overviews in real time, so use it as a structured readiness audit before live prompt tracking.",
    serviceHref: "/ai-search-optimization/",
    serviceLabel: "AI Search Optimization",
    resourceLinks: [
      { label: "AI Search Optimization", href: "/ai-search-optimization/" },
      { label: "AI Visibility Targets", href: "/ai-visibility-targets/" },
      { label: "AI Visibility Playbook", href: "/playbooks/ai-visibility-business-website-pakistan/" },
      { label: "Machine-readable services", href: "/services.md" },
      { label: "Machine-readable pricing", href: "/pricing.md" },
    ],
    relatedTools: ["seo-audit", "schema-markup-generator", "local-seo-audit"],
    faqs: [
      { question: "Does this check live AI citations?", answer: "No. It scores visible website and entity-readiness signals only. Live AI citation tracking needs repeated prompt checks across ChatGPT, Google AI Overviews, Gemini, Claude, Perplexity, and Copilot." },
      { question: "What improves AI visibility?", answer: "Clear business facts, structured data, answer-ready service pages, FAQs, consistent official profiles, case studies, reviews, and credible third-party references improve AI visibility readiness." },
      { question: "What should I fix first after a low AI visibility score?", answer: "Fix entity clarity first: business name, legal name, founder, location, services, canonical URLs, contact details, and official profiles. Then improve service-page answer blocks, schema, and proof." },
      { question: "Is AI visibility the same as SEO?", answer: "No. SEO helps pages rank in search results. AI visibility also requires extractable answers, entity consistency, structured data, and corroborating sources that AI systems can cite or summarize." },
      { question: "Can a small Pakistan business use this tool?", answer: "Yes. The tool is designed for local service businesses, clinics, restaurants, real estate teams, ecommerce brands, and B2B companies that need clearer visibility in search and AI answer systems." },
    ],
  },
  {
    slug: "local-seo-audit",
    name: "Local SEO Audit Tool",
    title: "Free Local SEO Audit Tool",
    description: "Audit local SEO readiness for Rawalpindi, Islamabad, and Pakistan service-area businesses, including Google Business Profile signals, map-pack trust, NAP clarity, reviews, service pages, and local schema.",
    updated: "2026-09-19",
    benefit: "Find the website, Google Business Profile, review, map-pack, local-schema, and service-area gaps that make a local business harder to rank, trust, and contact.",
    category: "Local SEO",
    icon: "MAP",
    mode: "local-seo",
    inputSummary: "Business name, website, primary city, service areas, main services, Google Business Profile URL, NAP details, reviews, location proof, service pages, and local schema signals.",
    checks: [
      "NAP visibility and consistency across website, footer, contact page, and Google Business Profile",
      "Rawalpindi, Islamabad, neighborhood, and service-area relevance without thin doorway pages",
      "Google Business Profile completeness: categories, services, photos, reviews, posts, hours, and contact paths",
      "Map-pack trust signals such as reviews, local proof, directions, phone, WhatsApp, and business details",
      "LocalBusiness, Organization, Service, FAQPage, BreadcrumbList, and WebSite schema readiness",
      "Service plus city internal-link structure between homepage, GBP page, service pages, blog guides, and contact",
      "Local landing-page quality: helpful copy, proof, FAQs, pricing or consultation path, and mobile conversion",
    ],
    howItWorks: [
      "Add the business, city, service areas, primary services, and Google Business Profile details.",
      "Mark the local website, GBP, review, schema, and map-pack signals already visible to customers.",
      "Review the score by priority: trust, relevance, crawlability, GBP support, and conversion readiness.",
      "Fix the missing items by updating service pages, contact details, local schema, reviews, photos, and internal links.",
    ],
    audience: ["Restaurants in Islamabad", "Clinics and aesthetic brands", "Salons and spas", "Builders, architects, and interiors teams", "Rawalpindi and Islamabad service businesses", "Local SEO and GBP teams"],
    interpretation: "This scores the local SEO and GBP-support signals you provide. It does not access private Google Business Profile data or guarantee map-pack rankings, but it helps identify the public signals a local business should strengthen before expecting stronger Maps visibility.",
    serviceHref: "/google-business-profile-growth/",
    serviceLabel: "Google Business Profile Growth",
    resourceLinks: [
      { label: "Google Business Profile Growth", href: "/google-business-profile-growth/" },
      { label: "Local SEO for clinics and salons", href: "/blog/local-seo-for-salons-and-aesthetic-clinics-in-pakistan/" },
      { label: "Google reviews for Islamabad restaurants", href: "/blog/how-restaurants-in-islamabad-can-get-more-google-reviews/" },
      { label: "Machine-readable services", href: "/services.md" },
      { label: "Results", href: "/results/" },
    ],
    relatedTools: ["seo-audit", "ai-visibility-checker", "schema-markup-generator"],
    faqs: [
      { question: "Does this audit my Google Business Profile?", answer: "No. Private GBP performance data needs a legitimate connected account or API. This tool audits the public GBP and website-support signals you can confirm manually." },
      { question: "What is the fastest local SEO win?", answer: "Make business name, address, phone, service areas, main services, reviews, directions, WhatsApp, and contact paths obvious and consistent across the website and Google Business Profile." },
      { question: "Can this help a Rawalpindi or Islamabad business?", answer: "Yes. The checklist is written for service-area businesses that need stronger local relevance in Rawalpindi, Islamabad, nearby neighborhoods, and Pakistan commercial searches." },
      { question: "Which schema matters for local SEO?", answer: "LocalBusiness, Organization, Service, WebSite, WebPage, BreadcrumbList, and FAQPage schema usually matter most, as long as the facts match visible page content." },
      { question: "Does a high score guarantee Google Maps ranking?", answer: "No. Rankings depend on relevance, distance, prominence, competition, reviews, behavioral signals, and profile quality. The score shows what to improve, not a guaranteed ranking outcome." },
    ],
  },
  {
    slug: "seo-audit",
    name: "Website SEO Audit Tool",
    title: "Free Website SEO Audit Tool",
    description: "Review metadata, headings, canonical signals, schema, links, content depth, performance basics, and AI search readiness.",
    benefit: "Spot technical and content issues that may be holding back organic traffic.",
    category: "SEO",
    icon: "SEO",
    mode: "seo-audit",
    inputSummary: "Website URL plus on-page SEO details copied from the page or checked manually.",
    checks: ["HTTPS and clean URL", "Title and meta description", "H1 and headings", "Canonical and robots", "Schema and Open Graph", "Internal links and alt text"],
    howItWorks: ["Enter the page URL.", "Mark the main SEO signals.", "Get what is working, what hurts visibility, and what to fix first."],
    audience: ["Business owners", "Marketing teams", "Website owners preparing for SEO"],
    interpretation: "This static audit is a guided technical checklist. Full crawling requires Search Console, logs, and crawler data.",
    serviceHref: "/growth-systems/",
    serviceLabel: "Growth Systems",
    resourceLinks: [{ label: "Growth Systems", href: "/growth-systems/" }, { label: "Blog", href: "/blog/" }],
    relatedTools: ["ai-visibility-checker", "website-performance-checker", "schema-markup-generator"],
    faqs: [
      { question: "Can this crawl my full website?", answer: "No. It uses the URL and signals you provide, avoiding fake server-side crawl claims." },
      { question: "What score should I aim for?", answer: "Aim for 80+ on important landing pages. Below 60 usually means core metadata, structure, content, or schema is missing." },
    ],
  },
  {
    slug: "website-performance-checker",
    name: "Website Performance / Conversion Checker",
    title: "Free Website Performance Checker",
    description: "Check mobile readiness, CTA visibility, trust signals, navigation clarity, contact friction, and conversion paths.",
    benefit: "Find friction points that stop visitors from becoming inquiries, bookings, or customers.",
    category: "Website",
    icon: "UX",
    mode: "website-performance",
    inputSummary: "Website URL, primary goal, device focus, and conversion/readability signals.",
    checks: ["Mobile layout", "CTA visibility", "Navigation clarity", "Contact friction", "Trust proof", "Accessibility basics"],
    howItWorks: ["Enter the page and goal.", "Check UX, trust, mobile, and accessibility signals.", "Use the output to prioritize conversion fixes."],
    audience: ["Website owners", "Landing page teams", "Businesses buying ads or SEO traffic"],
    interpretation: "This is about growth readiness and conversion friction, not a duplicate technical SEO audit.",
    serviceHref: "/website-development/",
    serviceLabel: "Website Development",
    resourceLinks: [{ label: "Website Development", href: "/website-development/" }, { label: "Results", href: "/results/" }],
    relatedTools: ["website-roi-calculator", "seo-audit", "marketing-roi-calculator"],
    faqs: [
      { question: "Is this a speed test?", answer: "No. It includes basic performance signals but focuses on conversion and usability." },
      { question: "What usually improves conversion first?", answer: "Clear hero messaging, visible CTAs, trust proof, fast mobile pages, and low-friction WhatsApp or form paths." },
    ],
  },
  {
    slug: "marketing-roi-calculator",
    name: "Marketing ROI Calculator",
    title: "Free Marketing ROI Calculator",
    description: "Calculate revenue, cost per lead, CAC, ROAS, ROI, estimated profit, and break-even performance from marketing spend.",
    benefit: "Understand whether your marketing spend is creating profitable customers.",
    category: "ROI",
    icon: "ROI",
    mode: "marketing-roi",
    inputSummary: "Marketing spend, leads, lead-to-customer conversion rate, average sale value, and margin.",
    checks: ["Revenue", "Cost per lead", "CAC", "ROAS", "ROI", "Estimated profit"],
    howItWorks: ["Enter spend and lead volume.", "Adjust close rate, sale value, and margin.", "Review revenue, profit, CAC, and break-even numbers."],
    audience: ["Founders", "Marketing managers", "Local businesses comparing growth channels"],
    interpretation: "Use this as a planning estimate. Real ROI depends on lead quality, margins, repeat purchases, and attribution accuracy.",
    serviceHref: "/growth-systems/",
    serviceLabel: "Growth Systems",
    resourceLinks: [{ label: "Pricing", href: "/pricing/" }, { label: "Results", href: "/results/" }],
    relatedTools: ["meta-ads-budget-calculator", "google-ads-budget-calculator", "website-roi-calculator"],
    faqs: [
      { question: "Should ROI include gross margin?", answer: "Yes. Profit-based ROI is clearer than revenue-only ROAS when margin data is available." },
      { question: "What if I do not know conversion rate?", answer: "Start conservative, then replace assumptions with CRM and sales data." },
    ],
  },
  {
    slug: "meta-ads-budget-calculator",
    name: "Meta Ads Budget Calculator",
    title: "Free Meta Ads Budget Calculator",
    description: "Estimate Facebook and Instagram ad leads, customers, CAC, revenue, ROAS, and break-even CPL from editable assumptions.",
    benefit: "Plan Meta Ads economics before increasing budget.",
    category: "Ads",
    icon: "FB",
    mode: "meta-ads",
    inputSummary: "Industry, monthly budget, average CPL, lead-to-customer rate, and average customer value.",
    checks: ["Estimated leads", "Estimated customers", "CAC", "Estimated revenue", "ROAS", "Break-even CPL"],
    howItWorks: ["Choose an industry context.", "Enter budget and CPL.", "Adjust sales conversion and value to test economics."],
    audience: ["Facebook and Instagram advertisers", "Clinics and salons", "Local service brands"],
    interpretation: "These are planning estimates. Creative, offer, audience, follow-up speed, and landing path affect actual CPL and CAC.",
    serviceHref: "/meta-ads/",
    serviceLabel: "Meta Ads",
    resourceLinks: [{ label: "Meta Ads", href: "/meta-ads/" }, { label: "Campaign results", href: "/results/" }],
    relatedTools: ["marketing-roi-calculator", "google-ads-budget-calculator", "website-roi-calculator"],
    faqs: [
      { question: "What is break-even CPL?", answer: "The highest cost per lead you can afford before the campaign stops covering expected customer value." },
      { question: "Why do Meta Ads results vary?", answer: "Audience quality, creative, offer strength, response speed, landing page clarity, and sales process all matter." },
    ],
  },
  {
    slug: "google-ads-budget-calculator",
    name: "Google Ads Budget / ROAS Calculator",
    title: "Free Google Ads Budget Calculator",
    description: "Estimate Google Ads clicks, leads, customers, CPA, revenue, ROAS, and break-even CPC from editable assumptions.",
    benefit: "See whether your search budget and CPC targets can produce profitable lead volume.",
    category: "Ads",
    icon: "G",
    mode: "google-ads",
    inputSummary: "Monthly budget, average CPC, landing-page conversion rate, lead-to-sale rate, and sale value.",
    checks: ["Estimated clicks", "Estimated leads", "Estimated customers", "CPA", "Estimated revenue", "Break-even CPC"],
    howItWorks: ["Enter spend and CPC.", "Adjust landing-page and sales conversion.", "Review traffic, revenue, ROAS, and break-even CPC."],
    audience: ["Search advertisers", "Service companies", "High-intent local advertisers"],
    interpretation: "Use this before launch to test economics, then replace assumptions with real Google Ads and CRM data.",
    serviceHref: "/google-ads/",
    serviceLabel: "Google Ads",
    resourceLinks: [{ label: "Google Ads", href: "/google-ads/" }, { label: "Results", href: "/results/" }],
    relatedTools: ["marketing-roi-calculator", "meta-ads-budget-calculator", "website-performance-checker"],
    faqs: [
      { question: "What is a good ROAS?", answer: "It depends on margin and close rate. Strong revenue ROAS can still be weak profit if margins are thin." },
      { question: "Why include landing-page conversion rate?", answer: "Search clicks only matter when the page turns them into calls, forms, bookings, or WhatsApp conversations." },
    ],
  },
  {
    slug: "patient-retention-roi-calculator",
    name: "Patient Retention ROI Calculator",
    title: "Patient Retention ROI Calculator",
    description: "Estimate recovered appointments, revenue, net return, and ROI multiple from reactivating inactive clinic patients.",
    benefit: "Estimate what a patient reactivation system could recover from an existing database.",
    category: "Healthcare",
    icon: "RX",
    mode: "patient-retention",
    inputSummary: "Inactive patients, average treatment value, booking rate, and monthly system or campaign cost.",
    checks: ["Potential appointments", "Recovered revenue", "Estimated net return", "ROI multiple"],
    howItWorks: ["Enter inactive patients and treatment value.", "Set expected booking rate.", "Compare recovered revenue with system cost."],
    audience: ["Clinics", "Dental practices", "Aesthetic clinics", "Healthcare marketers"],
    interpretation: "This is a financial planning tool only. It does not make medical claims or guarantee patient outcomes.",
    serviceHref: "/software-products/#patientflow",
    serviceLabel: "PatientFlow",
    resourceLinks: [{ label: "PatientFlow", href: "/software-products/#patientflow" }, { label: "Healthcare results", href: "/results/" }],
    relatedTools: ["website-roi-calculator", "meta-ads-budget-calculator", "local-seo-audit"],
    faqs: [
      { question: "Does this predict patient health outcomes?", answer: "No. It estimates business-side appointment and revenue scenarios only." },
      { question: "What affects reactivation rate?", answer: "Database quality, consent, offer relevance, timing, follow-up speed, and clinic capacity." },
    ],
  },
  {
    slug: "website-roi-calculator",
    name: "Website ROI / Lost Leads Calculator",
    title: "Website ROI Calculator",
    description: "Estimate how much revenue a low-converting website may be costing based on traffic, conversion rate, close rate, and customer value.",
    benefit: "See the monthly and annual value of improving website conversion.",
    category: "Website",
    icon: "$",
    mode: "website-roi",
    inputSummary: "Monthly visitors, current and target conversion rates, lead-to-sale rate, and average customer value.",
    checks: ["Current leads", "Potential leads", "Additional customers", "Monthly revenue difference", "Annual revenue difference"],
    howItWorks: ["Enter traffic and current conversion rate.", "Set a realistic target rate.", "Estimate added leads, customers, and revenue."],
    audience: ["Website owners", "Businesses running ads", "Teams planning a redesign or CRO project"],
    interpretation: "This estimates upside from conversion improvement and should be validated with analytics and sales data.",
    serviceHref: "/website-development/",
    serviceLabel: "Website Development",
    resourceLinks: [{ label: "Website Development", href: "/website-development/" }, { label: "Pricing", href: "/pricing/" }],
    relatedTools: ["website-performance-checker", "marketing-roi-calculator", "seo-audit"],
    faqs: [
      { question: "What conversion rate should I target?", answer: "Start with a conservative improvement. Even 1% to 2% can materially change lead volume." },
      { question: "What counts as a website conversion?", answer: "Calls, WhatsApp clicks, forms, bookings, downloads, and qualified quote requests." },
    ],
  },
  {
    slug: "schema-markup-generator",
    name: "Schema Markup Generator",
    title: "Free Schema Markup Generator",
    description: "Generate clean JSON-LD for Organization, LocalBusiness, Person, Service, Article, FAQPage, BreadcrumbList, and AI-search entity clarity.",
    updated: "2026-09-14",
    benefit: "Create valid starter JSON-LD that helps search engines and AI systems understand real business, page, service, author, and FAQ facts without misleading ratings or unsupported claims.",
    category: "SEO",
    icon: "{}",
    mode: "schema-generator",
    inputSummary: "Schema type plus the real business, page, service, article, FAQ, person, image, URL, or breadcrumb details you want to mark up.",
    checks: [
      "Required schema fields for the selected entity type",
      "Clean JSON-LD output that can be copied into page HTML",
      "Organization, LocalBusiness, Person, Service, Article, FAQPage, and BreadcrumbList coverage",
      "Implementation notes for visible-content alignment and entity consistency",
      "Validation warnings for unsupported ratings, fake reviews, vague authors, and hidden claims",
      "AI-search readiness signals such as stable URLs, clear names, descriptions, and connected entities",
    ],
    howItWorks: [
      "Choose the schema type that matches the visible page purpose.",
      "Add only real, supportable facts that users can also see on the page.",
      "Copy the JSON-LD and place it in the relevant page HTML.",
      "Validate the markup before publishing and keep it aligned when page content changes.",
    ],
    audience: ["SEO teams", "Developers", "Local businesses", "Content teams", "Business owners improving AI-search entity clarity"],
    interpretation: "Generated schema is a starter for implementation planning. Always validate the JSON-LD and ensure it matches visible page content, because unsupported schema can reduce trust and create search-quality risk.",
    serviceHref: "/ai-search-optimization/",
    serviceLabel: "Structured Data and AI Search",
    resourceLinks: [
      { label: "AI Search Optimization", href: "/ai-search-optimization/" },
      { label: "AI Visibility Checker", href: "/tools/ai-visibility-checker/" },
      { label: "Machine-readable services", href: "/services.md" },
      { label: "Website Development", href: "/website-development/" },
    ],
    relatedTools: ["seo-audit", "ai-visibility-checker", "local-seo-audit"],
    faqs: [
      { question: "Can I add fake ratings?", answer: "No. Do not add ratings, reviews, prices, authors, or entities that are not real and visible. Schema should describe the page truthfully, not manufacture trust signals." },
      { question: "Where should JSON-LD go?", answer: "Place JSON-LD in the page HTML, usually in the head or rendered page output, then validate it with a structured data testing tool before publishing." },
      { question: "Which schema types matter most for a local agency website?", answer: "Organization, LocalBusiness, WebSite, WebPage, Service, Person, Article, BreadcrumbList, FAQPage, and WebApplication schema usually matter most for an agency website with service pages, founder pages, blogs, and tools." },
      { question: "Does schema guarantee Google rankings or AI citations?", answer: "No. Schema helps systems understand entities and page facts, but rankings and AI citations still depend on crawlability, helpful content, authority, freshness, links, and user trust." },
      { question: "How should schema support AI search visibility?", answer: "Use schema to connect the business, founder, service, page, article, tool, location, and official URLs with stable identifiers that match visible content and machine-readable files." },
    ],
  },
];

export const toolsBySlug = Object.fromEntries(tools.map((tool) => [tool.slug, tool])) as Record<string, ToolPage>;

export const featuredToolSlugs = ["ai-visibility-checker", "seo-audit", "local-seo-audit", "website-roi-calculator"] as const;

export const serviceToolMap: Record<string, string[]> = {
  "google-business-profile-growth": ["local-seo-audit"],
  "meta-ads": ["meta-ads-budget-calculator", "marketing-roi-calculator"],
  "google-ads": ["google-ads-budget-calculator", "website-performance-checker"],
  "website-development": ["website-roi-calculator", "website-performance-checker", "seo-audit"],
  "growth-systems": ["seo-audit", "ai-visibility-checker", "marketing-roi-calculator"],
  "our-services": ["seo-audit", "website-roi-calculator", "meta-ads-budget-calculator"],
  "marketing-automation": ["patient-retention-roi-calculator", "website-roi-calculator"],
  "ai-search-optimization": ["ai-visibility-checker", "schema-markup-generator", "seo-audit"],
};
