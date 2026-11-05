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

export interface ToolPage {
  slug: string;
  name: string;
  shortName: string;
  title: string;
  description: string;
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
}

export const TOOL_CATEGORIES = ["All", "SEO", "AI Visibility", "Local SEO", "Ads", "Website", "ROI", "Healthcare"] as const;

export const tools: ToolPage[] = [
  {
    slug: "ai-visibility-checker",
    name: "AI Visibility Checker",
    shortName: "AI Visibility",
    title: "Free AI Visibility Checker | Crea8iv Media",
    description: "Check whether your business website gives AI search systems clear entity, content, schema, and citation signals.",
    benefit: "Find the gaps that make your brand harder for AI search and answer engines to understand.",
    category: "AI Visibility",
    icon: "AI",
    mode: "ai-visibility",
    inputSummary: "Website URL, brand name, industry, location, services, competitors, and visible website signals.",
    checks: ["Brand/entity clarity", "Service and location specificity", "Schema coverage", "FAQ and answer content", "Citation readiness", "Technical accessibility"],
    howItWorks: ["Enter your public business details.", "Mark the signals already visible on your website.", "Review the score, category breakdown, and prioritized fixes."],
    audience: ["Local service businesses", "Healthcare and clinic brands", "Businesses investing in SEO, GEO, AEO, or LLMO"],
    interpretation: "A high score means the website has clear, machine-readable business facts. It does not mean any AI platform has cited the brand.",
    serviceHref: "/ai-search-optimization/",
    serviceLabel: "AI Search Optimization",
    resourceLinks: [
      { label: "AI Search Optimization guide", href: "/ai-search-optimization/" },
      { label: "Blog resources", href: "/blog/" },
    ],
    relatedTools: ["seo-audit", "schema-markup-generator", "local-seo-audit"],
    faqs: [
      { question: "Does this tool check ChatGPT, Gemini, Claude, or Perplexity citations?", answer: "No. This static tool evaluates visible readiness signals only. It does not query AI platforms or claim live AI citations." },
      { question: "What improves AI visibility?", answer: "Clear business facts, strong service pages, structured data, helpful FAQ content, consistent profiles, and credible third-party references all help search systems understand an entity." },
    ],
  },
  {
    slug: "local-seo-audit",
    name: "Local SEO Audit Tool",
    shortName: "Local SEO",
    title: "Free Local SEO Audit Tool | Crea8iv Media",
    description: "Score your local website foundations for Google Maps, city-service relevance, trust, NAP visibility, and local schema readiness.",
    benefit: "See whether your website supports local search, map visibility, and local buyer trust.",
    category: "Local SEO",
    icon: "MAP",
    mode: "local-seo",
    inputSummary: "Business name, website, location, main service, and local website/GBP support signals.",
    checks: ["NAP visibility", "Local landing page optimization", "LocalBusiness schema", "Reviews/testimonials", "Service plus location structure", "Contact and map signals"],
    howItWorks: ["Add your business and city details.", "Check the local SEO signals present on the website.", "Use the priority list to fix missing trust and relevance signals."],
    audience: ["Restaurants", "Clinics", "Salons", "Builders", "Any local business competing in Google Maps"],
    interpretation: "The score reflects website-side local signals. It does not use private Google Business Profile data.",
    serviceHref: "/google-business-profile-growth/",
    serviceLabel: "Google Business Profile Growth",
    resourceLinks: [
      { label: "Google Business Profile service", href: "/google-business-profile-growth/" },
      { label: "Restaurant local case studies", href: "/case-studies/restaurants/" },
    ],
    relatedTools: ["seo-audit", "ai-visibility-checker", "schema-markup-generator"],
    faqs: [
      { question: "Does this audit access my Google Business Profile?", answer: "No. It scores website and public local signals you provide. Private GBP insights require a legitimate connected account or API." },
      { question: "What is the fastest local SEO win?", answer: "Make the business name, address, phone, services, city, reviews, and contact paths obvious on the site and consistent with external profiles." },
    ],
  },
  {
    slug: "seo-audit",
    name: "Website SEO Audit Tool",
    shortName: "SEO Audit",
    title: "Free Website SEO Audit Tool | Crea8iv Media",
    description: "Review title tags, meta descriptions, headings, canonical signals, schema, links, content depth, and AI search readiness.",
    benefit: "Spot the technical and content issues that may be holding back organic traffic.",
    category: "SEO",
    icon: "SEO",
    mode: "seo-audit",
    inputSummary: "Website URL plus on-page SEO details copied from the page or checked manually.",
    checks: ["HTTPS and clean URL", "Title/meta description", "H1 and heading hierarchy", "Canonical and robots", "Schema and Open Graph", "Internal links and image alt text"],
    howItWorks: ["Enter the page URL.", "Paste or check the main SEO signals.", "Get a score with what is working, what hurts visibility, and what to fix first."],
    audience: ["Business owners", "Marketing teams", "Website owners preparing for SEO work"],
    interpretation: "This static audit is a guided technical checklist. For full crawling, pair it with Search Console, logs, and a crawler.",
    serviceHref: "/growth-systems/",
    serviceLabel: "SEO and Growth Systems",
    resourceLinks: [
      { label: "Growth systems", href: "/growth-systems/" },
      { label: "Blog resources", href: "/blog/" },
    ],
    relatedTools: ["ai-visibility-checker", "website-performance-checker", "schema-markup-generator"],
    faqs: [
      { question: "Can this tool crawl my full website?", answer: "No. The current site is static, so this tool uses the URL and the signals you provide. It avoids pretending to run a server-side crawl." },
      { question: "What score should I aim for?", answer: "Aim for 80+ on key landing pages. Below 60 usually means important metadata, structure, schema, or content signals are missing." },
    ],
  },
  {
    slug: "website-performance-checker",
    name: "Website Performance / Conversion Checker",
    shortName: "Performance",
    title: "Free Website Performance Checker | Crea8iv Media",
    description: "Check mobile readiness, CTA visibility, trust signals, navigation clarity, contact friction, and conversion paths.",
    benefit: "Find the friction points that stop visitors from becoming inquiries, bookings, or customers.",
    category: "Website",
    icon: "UX",
    mode: "website-performance",
    inputSummary: "Website URL, primary goal, device focus, and conversion/readability signals.",
    checks: ["Mobile layout", "CTA visibility", "Navigation clarity", "Contact friction", "Trust and proof", "Accessibility basics"],
    howItWorks: ["Enter the page and its main conversion goal.", "Check the UX, trust, mobile, and accessibility signals.", "Use the output to prioritize conversion fixes."],
    audience: ["Website owners", "Landing page teams", "Businesses buying ads or SEO traffic"],
    interpretation: "This score is about growth readiness, not a duplicate SEO score. It focuses on whether people can trust and contact the business quickly.",
    serviceHref: "/website-development/",
    serviceLabel: "Website Development",
    resourceLinks: [
      { label: "Website portfolio", href: "/portfolio/websites/" },
      { label: "Website development", href: "/website-development/" },
    ],
    relatedTools: ["website-roi-calculator", "seo-audit", "marketing-roi-calculator"],
    faqs: [
      { question: "Is this a speed test?", answer: "No. It includes basic performance signals, but it is primarily a conversion and usability checker." },
      { question: "What usually improves conversion first?", answer: "Clear hero messaging, visible CTAs, trust proof, fast mobile pages, and low-friction WhatsApp or form paths usually create the fastest lift." },
    ],
  },
  {
    slug: "marketing-roi-calculator",
    name: "Marketing ROI Calculator",
    shortName: "Marketing ROI",
    title: "Free Marketing ROI Calculator | Crea8iv Media",
    description: "Calculate revenue, cost per lead, CAC, ROAS, ROI, profit, and break-even performance from your marketing spend.",
    benefit: "Understand whether your marketing spend is creating profitable customers.",
    category: "ROI",
    icon: "ROI",
    mode: "marketing-roi",
    inputSummary: "Marketing spend, leads, lead-to-customer conversion rate, average sale value, and margin.",
    checks: ["Revenue", "Cost per lead", "Customer acquisition cost", "ROAS", "ROI", "Estimated profit"],
    howItWorks: ["Enter spend and lead volume.", "Adjust conversion rate, sale value, and margin.", "Review revenue, profit, CAC, and break-even numbers."],
    audience: ["Founders", "Marketing managers", "Local businesses comparing growth channels"],
    interpretation: "Use the result as a planning estimate. Real ROI depends on sales quality, fulfilment costs, repeat purchases, and attribution accuracy.",
    serviceHref: "/growth-systems/",
    serviceLabel: "Growth Systems",
    resourceLinks: [
      { label: "Pricing", href: "/pricing/" },
      { label: "Results", href: "/results/" },
    ],
    relatedTools: ["meta-ads-budget-calculator", "google-ads-budget-calculator", "website-roi-calculator"],
    faqs: [
      { question: "Should ROI include gross margin?", answer: "Yes. Revenue ROAS is useful, but profit-based ROI is clearer when you know your gross margin." },
      { question: "What if I do not know my conversion rate?", answer: "Start with a conservative estimate, then update it once your CRM or sales records show real lead-to-customer performance." },
    ],
  },
  {
    slug: "meta-ads-budget-calculator",
    name: "Meta Ads Budget Calculator",
    shortName: "Meta Ads Budget",
    title: "Free Meta Ads Budget Calculator | Crea8iv Media",
    description: "Estimate Facebook and Instagram ad leads, customers, CAC, revenue, ROAS, and break-even CPL from editable assumptions.",
    benefit: "Plan Meta Ads economics before increasing budget.",
    category: "Ads",
    icon: "FB",
    mode: "meta-ads",
    inputSummary: "Industry, monthly budget, average CPL, lead-to-customer rate, and average customer value.",
    checks: ["Estimated leads", "Estimated customers", "CAC", "Estimated revenue", "ROAS", "Break-even CPL"],
    howItWorks: ["Choose an industry context.", "Enter your monthly budget and CPL.", "Adjust sales conversion and customer value to see budget economics."],
    audience: ["Businesses running Facebook or Instagram ads", "Clinics and salons", "Local service brands"],
    interpretation: "The numbers are planning estimates. Campaign creative, offer, follow-up speed, and landing path can change actual CPL and CAC.",
    serviceHref: "/meta-ads/",
    serviceLabel: "Meta Ads",
    resourceLinks: [
      { label: "Meta Ads service", href: "/meta-ads/" },
      { label: "Campaign portfolio", href: "/portfolio/campaigns/" },
    ],
    relatedTools: ["marketing-roi-calculator", "google-ads-budget-calculator", "website-roi-calculator"],
    faqs: [
      { question: "What is break-even CPL?", answer: "Break-even CPL is the highest cost per lead you can afford before the campaign stops covering the expected gross value of new customers." },
      { question: "Why do Meta Ads results vary?", answer: "Audience quality, creative, offer strength, response speed, landing page clarity, and sales process all affect outcomes." },
    ],
  },
  {
    slug: "google-ads-budget-calculator",
    name: "Google Ads Budget / ROAS Calculator",
    shortName: "Google Ads Budget",
    title: "Free Google Ads Budget Calculator | Crea8iv Media",
    description: "Estimate Google Ads clicks, leads, customers, CPA, revenue, ROAS, and break-even CPC from editable assumptions.",
    benefit: "See whether your search budget and CPC targets can produce profitable lead volume.",
    category: "Ads",
    icon: "G",
    mode: "google-ads",
    inputSummary: "Monthly budget, average CPC, landing-page conversion rate, lead-to-sale rate, and sale value.",
    checks: ["Estimated clicks", "Estimated leads", "Estimated customers", "CPA", "Estimated revenue", "ROAS", "Break-even CPC"],
    howItWorks: ["Enter spend and expected CPC.", "Adjust landing-page and sales conversion assumptions.", "Review projected traffic, revenue, ROAS, and break-even CPC."],
    audience: ["Businesses buying search traffic", "Service companies", "High-intent local advertisers"],
    interpretation: "Use this before launch to test economics, then replace assumptions with real Google Ads and CRM data.",
    serviceHref: "/google-ads/",
    serviceLabel: "Google Ads",
    resourceLinks: [
      { label: "Google Ads service", href: "/google-ads/" },
      { label: "Results", href: "/results/" },
    ],
    relatedTools: ["marketing-roi-calculator", "meta-ads-budget-calculator", "website-performance-checker"],
    faqs: [
      { question: "What is a good ROAS for Google Ads?", answer: "It depends on margin and close rate. A campaign can have strong revenue ROAS but weak profit if margins are thin or sales conversion is low." },
      { question: "Why include landing-page conversion rate?", answer: "Search clicks only become valuable when the landing page turns them into calls, forms, bookings, or WhatsApp conversations." },
    ],
  },
  {
    slug: "patient-retention-roi-calculator",
    name: "Patient Retention ROI Calculator",
    shortName: "Patient Retention",
    title: "Patient Retention ROI Calculator | Crea8iv Media",
    description: "Estimate recovered appointments, revenue, net return, and ROI multiple from reactivating inactive clinic patients.",
    benefit: "Estimate what a patient reactivation system could recover from an existing database.",
    category: "Healthcare",
    icon: "RX",
    mode: "patient-retention",
    inputSummary: "Inactive patients, treatment value, booking rate, and monthly system or campaign cost.",
    checks: ["Potential appointments", "Recovered revenue", "Estimated net return", "ROI multiple"],
    howItWorks: ["Enter inactive patient count and average treatment value.", "Set an expected reactivation booking rate.", "Compare recovered revenue with system or campaign cost."],
    audience: ["Clinics", "Dental practices", "Aesthetic clinics", "Healthcare marketers"],
    interpretation: "The calculator is a financial planning tool only. It does not make medical claims or guarantee patient outcomes.",
    serviceHref: "/marketing-automation/",
    serviceLabel: "PatientFlow and Automation",
    resourceLinks: [
      { label: "Marketing automation", href: "/marketing-automation/" },
      { label: "Healthcare case studies", href: "/case-studies/healthcare/" },
    ],
    relatedTools: ["website-roi-calculator", "meta-ads-budget-calculator", "local-seo-audit"],
    faqs: [
      { question: "Does this predict patient health outcomes?", answer: "No. It estimates business-side appointment and revenue scenarios from patient reactivation activity." },
      { question: "What affects reactivation rate?", answer: "Database quality, consent, offer relevance, timing, follow-up speed, and clinic capacity all affect booking rates." },
    ],
  },
  {
    slug: "website-roi-calculator",
    name: "Website ROI / Lost Leads Calculator",
    shortName: "Website ROI",
    title: "Website ROI Calculator | Estimate Lost Leads & Revenue",
    description: "Estimate how much revenue a low-converting website may be costing based on traffic, conversion rate, close rate, and customer value.",
    benefit: "See the monthly and annual value of improving website conversion.",
    category: "Website",
    icon: "$",
    mode: "website-roi",
    inputSummary: "Monthly visitors, current and target conversion rates, lead-to-sale rate, and average customer value.",
    checks: ["Current leads", "Potential leads", "Additional customers", "Monthly revenue difference", "Annual revenue difference"],
    howItWorks: ["Enter traffic and current conversion rate.", "Set a realistic target conversion rate.", "Estimate added leads, customers, and revenue."],
    audience: ["Website owners", "Businesses running ads", "Teams planning a redesign or CRO project"],
    interpretation: "The result estimates upside from conversion improvement. It should be validated with analytics and sales data.",
    serviceHref: "/website-development/",
    serviceLabel: "Website Development",
    resourceLinks: [
      { label: "Website portfolio", href: "/portfolio/websites/" },
      { label: "Pricing", href: "/pricing/" },
    ],
    relatedTools: ["website-performance-checker", "marketing-roi-calculator", "seo-audit"],
    faqs: [
      { question: "What conversion rate should I target?", answer: "Use a conservative improvement first. Even a move from 1% to 2% can materially change lead volume when traffic is meaningful." },
      { question: "What counts as a website conversion?", answer: "Calls, WhatsApp clicks, forms, bookings, downloads, and qualified quote requests can all count if they are tracked." },
    ],
  },
  {
    slug: "schema-markup-generator",
    name: "Schema Markup Generator",
    shortName: "Schema Generator",
    title: "Free Schema Markup Generator | Crea8iv Media",
    description: "Generate clean JSON-LD for Organization, LocalBusiness, Person, Service, Article, FAQPage, and BreadcrumbList schema.",
    benefit: "Create valid starter JSON-LD without adding misleading reviews, ratings, or unsupported claims.",
    category: "SEO",
    icon: "{}",
    mode: "schema-generator",
    inputSummary: "Schema type plus the real business, page, article, FAQ, or breadcrumb details you want to mark up.",
    checks: ["Required fields", "JSON-LD output", "Copy button", "Implementation notes", "Validation warnings"],
    howItWorks: ["Choose a schema type.", "Add only real facts that are visible or supportable.", "Copy the JSON-LD and validate it before publishing."],
    audience: ["SEO teams", "Developers", "Business owners improving structured data"],
    interpretation: "Generated schema is a starter. Always validate and ensure the markup matches visible page content.",
    serviceHref: "/ai-search-optimization/",
    serviceLabel: "Structured Data and AI Search",
    resourceLinks: [
      { label: "AI Search Optimization", href: "/ai-search-optimization/" },
      { label: "Website development", href: "/website-development/" },
    ],
    relatedTools: ["seo-audit", "ai-visibility-checker", "local-seo-audit"],
    faqs: [
      { question: "Can I add fake reviews or ratings?", answer: "No. Do not add ratings, reviews, prices, authors, or entities that are not real and visible on the page." },
      { question: "Where should JSON-LD go?", answer: "Place the script in the page HTML, typically in the head or body, then validate with a structured data testing tool." },
    ],
  },
];

export const toolsBySlug = Object.fromEntries(tools.map((tool) => [tool.slug, tool])) as Record<string, ToolPage>;

export const featuredTools = ["ai-visibility-checker", "seo-audit", "local-seo-audit", "website-roi-calculator"];

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
