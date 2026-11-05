#!/usr/bin/env node

const API_URL = process.env.CREA8IV_AUTOMATION_URL || "https://crea8ivmedia.com/api/admin/automation/";
const TOKEN = process.env.CREA8IV_AUTOMATION_TOKEN;
const DRY_RUN = process.argv.includes("--dry-run");

if (!TOKEN && !DRY_RUN) {
  console.error("Set CREA8IV_AUTOMATION_TOKEN before running this script.");
  process.exit(1);
}

const existingSlugs = new Set([
  "future-of-ai-search-2026",
  "what-is-ai-search-optimization",
  "geo-vs-seo",
  "aeo-vs-seo",
  "llmo-explained",
  "ai-visibility-strategy",
  "how-businesses-get-mentioned-by-chatgpt",
  "ai-citation-optimization-guide",
  "knowledge-graph-for-local-businesses",
  "boosted-posts-vs-facebook-ads-pakistan",
  "best-digital-marketing-agency-in-rawalpindi",
  "google-ads-cost-in-pakistan-for-doctors-clinics-and-aesthetic-brands",
  "seo-cost-in-pakistan-what-businesses-should-actually-expect-to-pay",
  "google-business-profile-for-restaurants-in-islamabad-full-setup-guide",
  "google-ai-overviews-ads-in-pakistan-what-businesses-need-to-know",
  "how-real-estate-businesses-in-pakistan-get-leads-from-facebook-ads",
  "best-website-design-company-in-islamabad-what-to-look-for",
  "google-search-console-social-platforms-pakistan-businesses",
  "facebook-instagram-ads-pakistan-guide",
  "how-to-get-more-google-reviews",
  "how-restaurants-in-islamabad-can-get-more-google-reviews",
  "instagram-marketing-pakistan",
  "pakistan-digital-marketing-statistics-2026",
  "who-founded-crea8iv-media-syed-qamar-abbas",
  "how-dentists-in-rawalpindi-can-rank-on-google-maps",
  "google-conversational-search-ads-pakistan-businesses",
  "lead-generation-for-builders-and-architects-in-pakistan",
  "founder-pages-ai-search-entity-seo-business-trust",
  "how-much-should-a-business-spend-on-meta-ads-in-pakistan",
  "whatsapp-automation-for-clinics-booking-follow-up-and-reminders",
  "what-syed-qamar-abbas-builds-at-crea8iv-media",
  "local-seo-for-salons-and-aesthetic-clinics-in-pakistan",
  "crea8iv-media-founder-story-syed-qamar-abbas",
  "google-ads-vs-seo-for-small-businesses-in-pakistan-which-first",
]);

const plan = [
  ["2026-08-22T12:30:00+05:00", "Semantic Search in 2026: How Pakistani Businesses Should Structure Content for AI Answers", "semantic-search-2026-pakistan-businesses", "AI Search Optimization", "semantic search 2026", ["semantic SEO Pakistan", "AI search optimization", "entity SEO"], "/ai-search-optimization/"],
  ["2026-08-24T12:30:00+05:00", "Google AI Mode Optimization: A Practical Guide for Service Businesses in Pakistan", "google-ai-mode-optimization-pakistan", "AI Search Optimization", "Google AI Mode optimization", ["Google AI Overviews Pakistan", "AEO", "GEO"], "/ai-search-optimization/"],
  ["2026-08-26T12:30:00+05:00", "ChatGPT Search Optimization for Local Businesses: How to Become Easier to Cite", "chatgpt-search-optimization-local-businesses", "AI Search Optimization", "ChatGPT search optimization", ["AI citations", "local business AI visibility", "LLMO"], "/ai-search-optimization/"],
  ["2026-08-28T12:30:00+05:00", "Perplexity Citation SEO: How to Build Pages AI Search Engines Can Trust", "perplexity-citation-seo", "AI Search Optimization", "Perplexity citation SEO", ["AI citation optimization", "source-backed SEO", "GEO"], "/tools/ai-visibility-checker/"],
  ["2026-08-31T12:30:00+05:00", "AI Visibility Checklist for Rawalpindi and Islamabad Brands", "ai-visibility-checklist-rawalpindi-islamabad", "AI Search Optimization", "AI visibility checklist", ["AI search Pakistan", "Rawalpindi SEO", "Islamabad SEO"], "/tools/ai-visibility-checker/"],
  ["2026-09-02T12:30:00+05:00", "Website Conversion Strategy in 2026: How to Turn Traffic Into WhatsApp Leads", "website-conversion-strategy-whatsapp-leads", "Website Development", "website conversion strategy", ["WhatsApp leads", "CRO Pakistan", "service website UX"], "/software-development/"],
  ["2026-09-04T12:30:00+05:00", "Core Web Vitals for Business Websites: A Non-Technical Speed Guide", "core-web-vitals-business-websites-pakistan", "Website Development", "Core Web Vitals Pakistan", ["website speed", "mobile performance", "technical SEO"], "/tools/seo-audit/"],
  ["2026-09-07T12:30:00+05:00", "Custom Website vs WordPress in Pakistan: Which Is Better for SEO and Leads?", "custom-website-vs-wordpress-pakistan", "Website Development", "custom website vs WordPress Pakistan", ["website development Pakistan", "SEO website", "lead generation website"], "/software-development/"],
  ["2026-09-09T12:30:00+05:00", "Landing Page Design for Clinics, Restaurants, and Service Brands in Pakistan", "landing-page-design-clinics-restaurants-pakistan", "Website Development", "landing page design Pakistan", ["clinic landing page", "restaurant landing page", "conversion design"], "/results/health-clinics/"],
  ["2026-09-11T12:30:00+05:00", "Website Audit Checklist for Pakistani SMEs: UX, SEO, Speed, Trust, and Leads", "website-audit-checklist-pakistani-smes", "Website Development", "website audit checklist Pakistan", ["technical SEO audit", "UX audit", "lead conversion audit"], "/tools/seo-audit/"],
  ["2026-09-14T12:30:00+05:00", "Local SEO Ranking Factors for Rawalpindi Businesses in 2026", "local-seo-ranking-factors-rawalpindi-2026", "Local SEO", "local SEO Rawalpindi", ["Google Maps ranking", "Rawalpindi business SEO", "GBP optimization"], "/tools/local-seo-audit/"],
  ["2026-09-16T12:30:00+05:00", "Google Business Profile Optimization for Clinics in Islamabad and Rawalpindi", "google-business-profile-clinics-islamabad-rawalpindi", "Local SEO", "Google Business Profile clinics", ["clinic SEO Pakistan", "Google Maps clinics", "local SEO healthcare"], "/results/health-clinics/"],
  ["2026-09-18T12:30:00+05:00", "How Restaurants in Islamabad Can Improve Google Maps Visibility Without Discounts", "restaurants-islamabad-google-maps-visibility", "Local SEO", "restaurants Islamabad Google Maps", ["restaurant local SEO", "Google reviews restaurants", "GBP restaurants"], "/results/restaurants/"],
  ["2026-09-21T12:30:00+05:00", "Local SEO for Architects and Interior Designers in Pakistan", "local-seo-architects-interior-designers-pakistan", "Local SEO", "local SEO architects Pakistan", ["interior designer SEO", "architect lead generation", "Google Maps SEO"], "/results/interiors-architects/"],
  ["2026-09-23T12:30:00+05:00", "Review Generation Strategy: How Pakistani Businesses Can Earn Better Google Reviews", "review-generation-strategy-pakistan-businesses", "Local SEO", "Google review strategy Pakistan", ["review generation", "local trust signals", "GBP reviews"], "/tools/local-seo-audit/"],
  ["2026-09-25T12:30:00+05:00", "Google Ads Landing Pages for Clinics: What Should Be on the Page Before Spending Budget", "google-ads-landing-pages-clinics-pakistan", "Google Ads", "Google Ads landing page clinics", ["clinic Google Ads", "healthcare landing page", "lead generation"], "/results/health-clinics/"],
  ["2026-09-28T12:30:00+05:00", "Meta Ads Funnel for Real Estate Leads in Pakistan", "meta-ads-funnel-real-estate-leads-pakistan", "Meta Ads", "Meta Ads real estate Pakistan", ["Facebook Ads real estate", "property leads Pakistan", "lead funnel"], "/results/real-estate/"],
  ["2026-09-30T12:30:00+05:00", "Google Ads vs Meta Ads for Clinics: Which Channel Should You Start With?", "google-ads-vs-meta-ads-clinics-pakistan", "Paid Ads", "Google Ads vs Meta Ads clinics", ["clinic ads Pakistan", "healthcare advertising", "lead generation"], "/consultation/"],
  ["2026-10-02T12:30:00+05:00", "Meta Ads Budget Planner for Pakistani Service Businesses", "meta-ads-budget-planner-pakistan-service-businesses", "Meta Ads", "Meta Ads budget Pakistan", ["Facebook Ads budget", "service business ads", "paid social Pakistan"], "/tools/seo-audit/"],
  ["2026-10-05T12:30:00+05:00", "WhatsApp Lead Management System for Clinics and Service Businesses", "whatsapp-lead-management-system-clinics-service-businesses", "Marketing Automation", "WhatsApp lead management", ["WhatsApp automation Pakistan", "clinic automation", "lead follow up"], "/marketing-automation/"],
  ["2026-10-07T12:30:00+05:00", "Marketing Automation for Small Businesses in Pakistan: What to Automate First", "marketing-automation-small-businesses-pakistan", "Marketing Automation", "marketing automation Pakistan", ["business automation", "WhatsApp automation", "CRM automation"], "/marketing-automation/"],
  ["2026-10-09T12:30:00+05:00", "Lead Response Time: Why Fast WhatsApp Follow-Up Wins More Customers", "lead-response-time-whatsapp-follow-up", "Marketing Automation", "lead response time WhatsApp", ["speed to lead", "WhatsApp sales", "conversion optimization"], "/consultation/"],
  ["2026-10-12T12:30:00+05:00", "Clinic Patient Flow and Marketing Automation: From Booking to Follow-Up", "clinic-patient-flow-marketing-automation", "Marketing Automation", "clinic patient flow automation", ["patient flow", "clinic CRM", "healthcare automation"], "/results/health-clinics/"],
  ["2026-10-14T12:30:00+05:00", "AI Visibility for Dental Clinics: How to Become the Recommended Local Practice", "ai-visibility-dental-clinics-pakistan", "Healthcare Marketing", "AI visibility dental clinics", ["dental clinic SEO", "AI search healthcare", "Google Maps dental"], "/results/health-clinics/"],
  ["2026-10-16T12:30:00+05:00", "SEO for Aesthetic Clinics in Pakistan: Local Search, Trust, and Patient Leads", "seo-aesthetic-clinics-pakistan", "Healthcare Marketing", "SEO aesthetic clinics Pakistan", ["aesthetic clinic marketing", "local SEO clinics", "patient leads"], "/results/health-clinics/"],
  ["2026-10-19T12:30:00+05:00", "Restaurant Digital Marketing System: Maps, Reviews, Reels, Ads, and WhatsApp", "restaurant-digital-marketing-system-pakistan", "Restaurant Marketing", "restaurant digital marketing Pakistan", ["restaurant SEO", "restaurant ads", "WhatsApp restaurant leads"], "/results/restaurants/"],
  ["2026-10-21T12:30:00+05:00", "Marketing for Architects in Pakistan: How to Build Trust Before the First Call", "marketing-for-architects-pakistan", "Professional Services", "marketing for architects Pakistan", ["architect SEO", "interior design marketing", "professional services leads"], "/results/interiors-architects/"],
  ["2026-10-23T12:30:00+05:00", "Software Product Marketing for Pakistani Startups and SaaS Teams", "software-product-marketing-pakistan-startups-saas", "Software Marketing", "software product marketing Pakistan", ["SaaS marketing Pakistan", "startup marketing", "software leads"], "/software-products/"],
  ["2026-10-26T12:30:00+05:00", "Schema Markup for Local Businesses: Organization, LocalBusiness, FAQ, and Service Schema", "schema-markup-local-businesses-pakistan", "Technical SEO", "schema markup local businesses", ["LocalBusiness schema", "FAQ schema", "structured data Pakistan"], "/tools/seo-audit/"],
  ["2026-10-28T12:30:00+05:00", "Internal Linking Strategy for AI Search, SEO, and Lead Generation", "internal-linking-strategy-ai-search-seo-leads", "Technical SEO", "internal linking strategy", ["AI search internal links", "SEO site architecture", "lead generation SEO"], "/ai-search-optimization/"],
  ["2026-10-30T12:30:00+05:00", "Content Refresh Strategy: How to Improve Old Blog Rankings Without Publishing More", "content-refresh-strategy-improve-old-blog-rankings", "Content Strategy", "content refresh strategy", ["SEO refresh", "content decay", "blog optimization"], "/blog/"],
  ["2026-11-02T12:30:00+05:00", "Pakistan Digital Marketing Benchmarks 2026: Costs, Channels, and Lead Quality", "pakistan-digital-marketing-benchmarks-2026", "Authority Asset", "Pakistan digital marketing benchmarks", ["marketing costs Pakistan", "lead quality benchmarks", "digital marketing report"], "/consultation/"],
  ["2026-11-04T12:30:00+05:00", "AI Visibility Tracker: How Brands Can Monitor Mentions Across ChatGPT and Search", "ai-visibility-tracker-brand-mentions", "AI Search Optimization", "AI visibility tracker", ["brand mentions AI", "ChatGPT visibility", "AI search monitoring"], "/tools/ai-visibility-checker/"],
  ["2026-11-06T12:30:00+05:00", "Best Digital Marketing Agency in Islamabad: What Serious Businesses Should Compare", "best-digital-marketing-agency-islamabad", "Agency / Local Commercial", "best digital marketing agency Islamabad", ["Islamabad marketing agency", "SEO agency Islamabad", "lead generation agency"], "/contact/"],
  ["2026-11-09T12:30:00+05:00", "Best SEO Agency in Rawalpindi: How to Choose for Local and AI Search", "best-seo-agency-rawalpindi-ai-search", "Agency / Local Commercial", "best SEO agency Rawalpindi", ["Rawalpindi SEO agency", "AI SEO Pakistan", "local SEO agency"], "/tools/local-seo-audit/"],
  ["2026-11-11T12:30:00+05:00", "Website Redesign Checklist for Premium Service Brands in Pakistan", "website-redesign-checklist-premium-service-brands-pakistan", "Website Development", "website redesign checklist Pakistan", ["premium website design", "service brand website", "conversion website"], "/software-development/"],
  ["2026-11-13T12:30:00+05:00", "WhatsApp Conversion Tracking: How to Measure Leads From Blogs and Service Pages", "whatsapp-conversion-tracking-blogs-service-pages", "Analytics", "WhatsApp conversion tracking", ["GA4 WhatsApp clicks", "lead tracking", "first-party analytics"], "/admin/login/"],
  ["2026-11-16T12:30:00+05:00", "Google Search Console for AI and Social Visibility: What Pakistani Brands Should Track", "google-search-console-ai-social-visibility-pakistan", "Analytics", "Google Search Console AI visibility", ["GSC social visibility", "organic analytics", "SEO measurement"], "/tools/seo-audit/"],
  ["2026-11-18T12:30:00+05:00", "Local Citation Building for Pakistan Businesses: Quality Over Quantity", "local-citation-building-pakistan-businesses", "Authority", "local citation building Pakistan", ["business directories Pakistan", "local SEO citations", "authority building"], "/tools/local-seo-audit/"],
  ["2026-11-20T12:30:00+05:00", "Founder Authority SEO: How Syed Qamar Abbas and CREA8IV MEDIA Build Trust Signals", "founder-authority-seo-syed-qamar-abbas-crea8iv-media", "Founder Authority", "founder authority SEO", ["entity SEO", "Syed Qamar Abbas", "brand trust signals"], "/syed-qamar-abbas/"],
];

function markdownBrief({ title, category, focusKeyword, secondaryKeywords, serviceLink }) {
  return `## Publishing Blocker

This is a scheduled editorial brief, not the final article. Do not publish until the full 2500-4000 word article, custom 1280x720 WebP thumbnail, internal links, schema, and live verification are complete.

## Direct Answer Draft

${title} should give Pakistani business owners a practical, answer-first guide they can use to improve search visibility, AI answer visibility, trust, and WhatsApp lead generation. The final article must explain what to do, why it matters, how to implement it, what mistakes to avoid, and when to ask CREA8IV MEDIA for help.

## Required Article Structure

### Opening Hook

Lead with the business problem in Rawalpindi, Islamabad, and Pakistan.

### Table of Contents

Include jump-style sections for definitions, process, examples, checklists, tools, mistakes, FAQ, and CTA.

### Main Sections To Write

- What ${focusKeyword} means in practical business terms.
- Why this topic matters for qualified leads, local visibility, AI search, and trust.
- Step-by-step workflow for implementation.
- Examples for clinics, restaurants, salons, architects, real estate, SMEs, and professional services where relevant.
- Comparison table or decision table.
- Checklist buyers can use immediately.
- Common mistakes and how to avoid them.
- Internal links to ${serviceLink}, /tools/seo-audit/, /ai-search-optimization/, /syed-qamar-abbas/, and /consultation/.

## Thumbnail Brief

Create a 1280x720 WebP thumbnail with a black/charcoal premium base, warm orange #FC6A03 accents, crisp white highlights, and large readable title text. Visual direction: ${category} command-center style, polished dashboard elements, citation nodes, local market signals, and high-end editorial composition.

## SEO Package

Focus keyword: ${focusKeyword}

Secondary keywords: ${secondaryKeywords.join(", ")}

Schema: BlogPosting, FAQPage, BreadcrumbList, WebPage

CTA: Book a strategy consultation with CREA8IV MEDIA.

## FAQ Draft

### What should this article answer first?

It should answer the main buyer question clearly in the first 100-150 words.

### Who is this article for?

It is for business owners and marketing decision makers in Rawalpindi, Islamabad, and Pakistan.

### What must be completed before publishing?

The full article, custom thumbnail, schema, internal links, external references, RSS, sitemap, and live URL verification must be completed first.`;
}

function record(row) {
  const [scheduledAt, title, slug, category, focusKeyword, secondaryKeywords, serviceLink] = row;
  const metaDescription = `${title.replace(/:.*$/, "")} with practical steps for Pakistan businesses to improve visibility, trust, and WhatsApp leads.`;
  return {
    scheduledAt,
    blog: {
      title,
      slug,
      status: "scheduled",
      category,
      tags: ["growth-plan", "seo", "geo", "aeo", "llmo", "scheduled-brief"],
      author: "Syed Qamar Abbas",
      excerpt: `${title} is scheduled as part of the CREA8IV MEDIA SEO, GEO, AEO, LLMO, authority, and lead generation operating system.`,
      markdown: markdownBrief({ title, slug, category, focusKeyword, secondaryKeywords, serviceLink }),
      seoTitle: title.length > 68 ? title.slice(0, 65).replace(/\s+\S*$/, "") : title,
      metaDescription: metaDescription.slice(0, 165),
      focusKeyword,
      secondaryKeywords,
      searchIntent: "Informational and commercial investigation intent from Pakistan business owners comparing ways to improve visibility and leads.",
      aiSearchIntent: "Answer-ready, source-backed guidance that AI search systems can cite for practical digital marketing decisions in Pakistan.",
      targetAudience: "Business owners, founders, clinics, restaurants, salons, architects, real estate teams, SMEs, and professional services in Rawalpindi, Islamabad, and Pakistan.",
      canonicalUrl: `https://crea8ivmedia.com/blog/${slug}/`,
      ogTitle: title,
      ogDescription: metaDescription.slice(0, 165),
      twitterTitle: title,
      twitterDescription: metaDescription.slice(0, 165),
      thumbnailUrl: "",
      thumbnailAlt: "",
      faqs: [
        { question: `What is ${focusKeyword}?`, answer: "The final article must define the topic in clear business language and connect it to visibility, trust, and lead generation." },
        { question: "Who should read this guide?", answer: "Business owners and marketing decision makers in Rawalpindi, Islamabad, and Pakistan should read it before investing in marketing or website improvements." },
        { question: "What must be done before publishing?", answer: "The final article, custom thumbnail, internal links, schema, RSS, sitemap, and live verification must be completed before the post is marked published." },
      ],
      ctas: [
        { label: "Book a strategy consultation", href: "/consultation/", context: "Final article CTA" },
        { label: "Run a SEO audit", href: "/tools/seo-audit/", context: "Tool CTA" },
      ],
      internalLinks: [serviceLink, "/tools/seo-audit/", "/ai-search-optimization/", "/syed-qamar-abbas/", "/consultation/"],
      externalReferences: [
        "https://developers.google.com/search/docs/fundamentals/creating-helpful-content",
        "https://developers.google.com/search/docs/fundamentals/ai-optimization-guide",
      ],
      schemaTypes: ["BlogPosting", "FAQPage", "BreadcrumbList", "WebPage"],
    },
  };
}

const records = plan.filter((row) => !existingSlugs.has(row[2])).map(record);

if (DRY_RUN) {
  console.log(`Ready to seed ${records.length} planned blog briefs.`);
  console.table(records.map(({ blog, scheduledAt }) => ({ scheduledAt, slug: blog.slug, category: blog.category })));
  process.exit(0);
}

let created = 0;
let failed = 0;

for (const payload of records) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ action: "schedule-blog", ...payload }),
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok || !body.ok) {
    failed += 1;
    console.error(`Failed: ${payload.blog.slug} ${response.status} ${body.message || ""}`);
    continue;
  }
  created += 1;
  console.log(`Scheduled: ${payload.blog.slug}`);
}

console.log(JSON.stringify({ ok: failed === 0, created, failed }, null, 2));
