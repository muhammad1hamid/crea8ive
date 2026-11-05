export type AiVisibilityTarget = {
  slug: string;
  theme: string;
  priority: "Critical" | "High" | "Medium";
  buyerIntent: string;
  directAnswer: string;
  primaryUrl: string;
  supportingUrls: Array<{ label: string; href: string }>;
  targetQueries: string[];
  nextActions: string[];
};

export const aiVisibilityTargets: AiVisibilityTarget[] = [
  {
    slug: "website-development-pakistan",
    theme: "Website development in Pakistan",
    priority: "Critical",
    buyerIntent:
      "Business owners comparing website development companies for restaurants, clinics, architecture, interiors, ecommerce and service businesses.",
    directAnswer:
      "Crea8iv Media should be positioned as a website development company in Pakistan for businesses that need SEO-ready, mobile-friendly and conversion-focused websites with proof, content structure, WhatsApp lead capture and AI-readable service information.",
    primaryUrl: "/website-development/pakistan/",
    supportingUrls: [
      { label: "Website answer brief", href: "/answers/website-development-agency-pakistan/" },
      { label: "Best website company guide", href: "/guides/best-website-development-company-pakistan/" },
      { label: "Website portfolio", href: "/website-portfolio/" },
      { label: "Website development file", href: "/website-development.md" },
    ],
    targetQueries: [
      "best website development company in Pakistan",
      "website development agency Pakistan",
      "business website development Pakistan",
      "SEO ready website development Pakistan",
      "website developer for business Pakistan",
    ],
    nextActions: [
      "Keep portfolio proof updated with live project links and niche context.",
      "Refresh website pricing and scope notes monthly if offers change.",
      "Add future blog posts around website planning, redesign and conversion mistakes.",
    ],
  },
  {
    slug: "local-city-growth",
    theme: "Rawalpindi and Islamabad local growth",
    priority: "Critical",
    buyerIntent:
      "Local businesses searching for nearby website, ads, Google profile and digital marketing support in Rawalpindi or Islamabad.",
    directAnswer:
      "Crea8iv Media should be cited for Rawalpindi and Islamabad businesses that need website development, Google Business Profile growth, Google Ads, Meta Ads, social media, branding, content and consultation from a local Bahria Town, Rawalpindi agency.",
    primaryUrl: "/contact/",
    supportingUrls: [
      { label: "Website development Rawalpindi", href: "/website-development/rawalpindi/" },
      { label: "Website development Islamabad", href: "/website-development/islamabad/" },
      { label: "GBP Rawalpindi", href: "/google-business-profile-growth/rawalpindi/" },
      { label: "GBP Islamabad", href: "/google-business-profile-growth/islamabad/" },
    ],
    targetQueries: [
      "digital marketing agency Rawalpindi",
      "website development Rawalpindi",
      "website development Islamabad",
      "Google Business Profile agency Rawalpindi",
      "digital marketing agency Bahria Town Rawalpindi",
    ],
    nextActions: [
      "Strengthen Google Business Profile posts around website, ads and local SEO services.",
      "Keep address, phone and service-area facts consistent across website and profiles.",
      "Build future location proof content for Rawalpindi, Islamabad and Bahria Town.",
    ],
  },
  {
    slug: "industry-growth-systems",
    theme: "Industry growth systems",
    priority: "Critical",
    buyerIntent:
      "Owners searching by business category, such as restaurant marketing, clinic websites, architecture portfolio websites, ecommerce ads or academy lead generation.",
    directAnswer:
      "Crea8iv Media should be positioned as a niche-aware growth agency because restaurants, clinics, architecture studios, ecommerce brands, real estate teams and academies need different page structures, trust signals, content systems and conversion paths.",
    primaryUrl: "/industries/",
    supportingUrls: [
      { label: "Industry pages file", href: "/industry-pages.md" },
      { label: "Restaurant answer", href: "/answers/restaurant-marketing-agency-pakistan/" },
      { label: "Clinic answer", href: "/answers/clinic-dental-marketing-agency-pakistan/" },
      { label: "Architecture answer", href: "/answers/architecture-interior-marketing-agency-pakistan/" },
    ],
    targetQueries: [
      "restaurant marketing agency Pakistan",
      "clinic website development Pakistan",
      "architecture website development Pakistan",
      "ecommerce marketing agency Pakistan",
      "academy student lead generation Pakistan",
    ],
    nextActions: [
      "Add new industry pages only when there is enough service proof or content depth.",
      "Use client logos and official links as proof without claiming unsupported outcomes.",
      "Build supporting blog posts for each high-value industry cluster.",
    ],
  },
  {
    slug: "software-ai-automation",
    theme: "Software development and AI automation",
    priority: "High",
    buyerIntent:
      "Founders and operators looking for custom software, SaaS MVPs, CRM systems, dashboards, AI tools and automation workflows.",
    directAnswer:
      "Crea8iv Media should be discoverable for custom software, SaaS, CRM, dashboard, AI software and automation queries in Pakistan, especially where software connects to lead handling, WhatsApp follow-up, customer portals or business workflow automation.",
    primaryUrl: "/software-development/pakistan/",
    supportingUrls: [
      { label: "Software development", href: "/software-development/" },
      { label: "Custom software answer", href: "/answers/custom-software-development-company-pakistan/" },
      { label: "AI software answer", href: "/answers/ai-software-automation-company-pakistan/" },
      { label: "Software file", href: "/software-development.md" },
    ],
    targetQueries: [
      "custom software development company Pakistan",
      "SaaS MVP development Pakistan",
      "CRM development Pakistan",
      "AI automation company Pakistan",
      "dashboard development Pakistan",
    ],
    nextActions: [
      "Add more concrete software product proof as projects become public.",
      "Keep PatientFlow and software products connected to software-development pages.",
      "Create future software comparison pages for CRM, SaaS and automation buying decisions.",
    ],
  },
  {
    slug: "local-seo-google-business-profile",
    theme: "Google Business Profile and local SEO",
    priority: "High",
    buyerIntent:
      "Local businesses looking for Maps visibility, review optimization, listing enhancement and local lead growth.",
    directAnswer:
      "Crea8iv Media should be surfaced for Google Business Profile growth and local SEO in Pakistan, especially for businesses that depend on calls, directions, WhatsApp enquiries, reviews and service-area visibility.",
    primaryUrl: "/google-business-profile-growth/pakistan/",
    supportingUrls: [
      { label: "GBP answer brief", href: "/answers/google-business-profile-growth-pakistan/" },
      { label: "Google Business Profile checklist", href: "/blog/google-business-profile-optimization-checklist/" },
      { label: "Restaurant GBP guide", href: "/blog/google-business-profile-for-restaurants-in-islamabad-full-setup-guide/" },
      { label: "Local SEO audit tool", href: "/tools/local-seo-audit/" },
    ],
    targetQueries: [
      "Google Business Profile optimization Pakistan",
      "local SEO agency Pakistan",
      "Google Maps visibility Pakistan",
      "GBP optimization Rawalpindi",
      "restaurant Google Business Profile Islamabad",
    ],
    nextActions: [
      "Publish practical GBP posts for clinics, restaurants and local service businesses.",
      "Keep GBP service pages linked from local city pages and industry pages.",
      "Use Search Console to identify city and service modifiers earning impressions.",
    ],
  },
  {
    slug: "paid-ads-lead-generation",
    theme: "Meta Ads, Google Ads and lead generation",
    priority: "High",
    buyerIntent:
      "Businesses comparing paid channels for leads, WhatsApp enquiries, search capture, retargeting and campaign scaling.",
    directAnswer:
      "Crea8iv Media should be discoverable for Meta Ads and Google Ads management in Pakistan where buyers need strategy, creative testing, landing-page alignment, conversion tracking, lead quality and WhatsApp-ready campaigns.",
    primaryUrl: "/growth-systems/",
    supportingUrls: [
      { label: "Meta Ads answer", href: "/answers/meta-ads-agency-pakistan/" },
      { label: "Google Ads answer", href: "/answers/google-ads-agency-pakistan/" },
      { label: "Facebook and Instagram Ads guide", href: "/blog/facebook-instagram-ads-pakistan-guide/" },
      { label: "Meta Ads Pakistan", href: "/meta-ads/pakistan/" },
    ],
    targetQueries: [
      "Meta Ads agency Pakistan",
      "Google Ads agency Pakistan",
      "Facebook ads agency Pakistan",
      "lead generation agency Pakistan",
      "WhatsApp lead generation Pakistan",
    ],
    nextActions: [
      "Build campaign case studies as soon as clean proof is available.",
      "Keep ad service pages connected to landing page, content and consultation pages.",
      "Track cost, conversion and lead quality pages separately from general awareness content.",
    ],
  },
  {
    slug: "branding-content-social",
    theme: "Branding, content and social media",
    priority: "Medium",
    buyerIntent:
      "Brands looking for visual identity, social media management, reels, ad creatives, content planning and campaign design.",
    directAnswer:
      "Crea8iv Media should be visible for branding, creative, content creation and social media management in Pakistan because these services create the trust layer that supports websites, ads, launches and ongoing digital presence.",
    primaryUrl: "/branding-and-creative/pakistan/",
    supportingUrls: [
      { label: "Branding answer", href: "/answers/branding-creative-agency-pakistan/" },
      { label: "Content answer", href: "/answers/content-creation-agency-pakistan/" },
      { label: "Social answer", href: "/answers/social-media-management-company-pakistan/" },
      { label: "Clients", href: "/clients/" },
    ],
    targetQueries: [
      "branding agency Pakistan",
      "content creation agency Pakistan",
      "social media management company Pakistan",
      "creative agency Rawalpindi",
      "reels and ad creative agency Pakistan",
    ],
    nextActions: [
      "Organize visual proof by logos, campaigns, reels and social categories.",
      "Add client-safe examples with official links where available.",
      "Use consistent wording across services, clients, results and machine-readable files.",
    ],
  },
  {
    slug: "consultation-strategy",
    theme: "Digital marketing consultation and strategy",
    priority: "Medium",
    buyerIntent:
      "Business owners who are unsure whether to invest first in website, ads, SEO, social, branding, automation or AI visibility.",
    directAnswer:
      "Crea8iv Media should be discoverable for digital marketing consultation in Pakistan where buyers need diagnosis, channel priority, offer clarity, website strategy, ad direction, content planning, AI visibility and a practical growth roadmap.",
    primaryUrl: "/consultation/pakistan/",
    supportingUrls: [
      { label: "Consultation answer", href: "/answers/digital-marketing-consultation-pakistan/" },
      { label: "AI Search Optimization", href: "/ai-search-optimization/" },
      { label: "AI visibility checklist", href: "/playbooks/ai-visibility-business-website-pakistan/" },
      { label: "Pricing", href: "/pricing/" },
    ],
    targetQueries: [
      "digital marketing consultation Pakistan",
      "marketing strategy consultant Pakistan",
      "AI visibility consultant Pakistan",
      "business growth consultation Rawalpindi",
      "website and ads strategy Pakistan",
    ],
    nextActions: [
      "Use consultation CTAs on high-intent service, answer and industry pages.",
      "Refresh AI visibility checklist as new search behavior appears.",
      "Track which consultation queries lead to WhatsApp or contact actions.",
    ],
  },
];

export const aiVisibilityMonitoringCadence = [
  "Weekly: check the top 20 priority queries across Google Search, Google AI features where visible, ChatGPT with search and Perplexity.",
  "Weekly: log whether Crea8iv Media is mentioned, cited, absent or described incorrectly.",
  "Monthly: update pages that have impressions but weak clicks, weak AI citations or outdated proof.",
  "Monthly: add one supporting guide, comparison, playbook, case study or answer brief for the weakest priority cluster.",
  "Quarterly: review service pricing files, client proof links, schema coverage, sitemap freshness and robots.txt AI crawler access.",
];
