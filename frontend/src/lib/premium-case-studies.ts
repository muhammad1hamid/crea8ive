import { SITE_URL } from "@/lib/site-config";
import { premiumCaseStudyRecordSchema } from "@/lib/data-contracts";

export type PremiumCaseStudy = {
  slug: string;
  clientName: string;
  clientLegalName?: string;
  clientUrl: string;
  clientAnchorText?: string;
  caseStudyUrl: string;
  metaTitle: string;
  metaDescription: string;
  socialImage: string;
  heroTitle: string;
  subtitle: string;
  eyebrow: string;
  statusLabel: string;
  industry: string;
  location: string;
  market: string;
  platform: string;
  heroImage: {
    src: string;
    alt: string;
    caption: string;
  };
  desktopImage: {
    src: string;
    alt: string;
    caption: string;
  };
  mobileImage: {
    src: string;
    alt: string;
    caption: string;
  };
  accent: string;
  accentSoft: string;
  snapshot: Array<{ label: string; value: string }>;
  overview?: {
    title: string;
    body: string;
    points?: string[];
  };
  challenge: {
    intro: string;
    points: string[];
  };
  strategy: Array<{ title: string; body: string }>;
  execution: {
    title: string;
    body: string;
    points: string[];
  };
  deliverables: string[];
  outcomes: string[];
  technology: string[];
  evidenceTitle: string;
  evidenceCopy: string;
  responsiveShowcase?: {
    src: string;
    alt: string;
    title: string;
    body: string;
    caption: string;
    points?: string[];
  };
  creativeExamples: Array<{
    src: string;
    alt: string;
    title: string;
    body: string;
  }>;
  evidenceMetrics?: Array<{
    label: string;
    value: string;
    note: string;
  }>;
  proofGallery?: Array<{
    src: string;
    alt: string;
    title: string;
    body: string;
  }>;
  serviceLinks: Array<{ label: string; href: string }>;
  closingTitle?: string;
  closingCopy?: string;
  faq?: Array<{ question: string; answer: string }>;
};

const caseStudyBase = `${SITE_URL}/case-studies`;

export const premiumCaseStudies: Record<string, PremiumCaseStudy> = premiumCaseStudyRecordSchema.parse({
  "the-smile-xperts": {
    slug: "the-smile-xperts",
    clientName: "The Smile Xperts",
    clientUrl: "https://thesmilexperts.com/",
    caseStudyUrl: `${caseStudyBase}/the-smile-xperts/`,
    metaTitle: "The Smile Xperts Dental Case Study | Crea8iv Media",
    metaDescription:
      "See how Crea8iv Media built a premium dental website, SEO architecture, AI visibility system, Google Business Profile strategy, Meta Ads funnel, and Instagram growth direction for The Smile Xperts in Islamabad.",
    socialImage: "/img/case-studies/the-smile-xperts/the-smile-xperts-social-preview.png",
    heroTitle: "The Smile Xperts: Building a Premium Dental Growth Engine in Islamabad",
    subtitle:
      "Crea8iv Media partnered with The Smile Xperts to redesign its digital presence into a premium healthcare brand experience - combining a luxury website, local SEO, AI visibility, Google Business Profile optimization, Meta Ads, Instagram management, and appointment-focused conversion strategy.",
    eyebrow: "Dental brand, website, SEO and growth system",
    statusLabel: "Growth system launched for ongoing improvement",
    industry: "Dental Clinic / Healthcare",
    location: "Islamabad, Pakistan",
    market: "F-8 Islamabad and surrounding patient search demand",
    platform: "Next.js, responsive UI, structured data and static deployment",
    heroImage: {
      src: "/img/case-studies/the-smile-xperts/the-smile-xperts-logo.webp",
      alt: "The Smile Xperts brand mark used in the premium dental website case study",
      caption: "Brand-led digital experience for a modern specialist dental clinic.",
    },
    desktopImage: {
      src: "/img/case-studies/the-smile-xperts/the-smile-xperts-live-desktop.png",
      alt: "Desktop screenshot of The Smile Xperts website homepage",
      caption: "Live website presentation with specialist-led dental service positioning.",
    },
    mobileImage: {
      src: "/img/case-studies/the-smile-xperts/the-smile-xperts-live-mobile.png",
      alt: "Mobile screenshot of The Smile Xperts appointment-focused website",
      caption: "Mobile-first browsing with clear booking and WhatsApp action paths.",
    },
    accent: "#47b9ff",
    accentSoft: "rgba(71,185,255,.18)",
    snapshot: [
      { label: "Client", value: "The Smile Xperts" },
      { label: "Industry", value: "Dental Clinic / Healthcare" },
      { label: "Location", value: "Islamabad, Pakistan" },
      { label: "Services", value: "Website redesign, UI/UX, local SEO, AI visibility, GBP, Meta Ads, Instagram and conversion strategy" },
      { label: "Website", value: "thesmilexperts.com" },
      { label: "Status", value: "Optimization currently in progress" },
    ],
    challenge: {
      intro:
        "The Smile Xperts needed more than a basic clinic website. The digital experience had to communicate specialist dental care, premium trust, doctor authority and a patient-friendly path from service research to appointment inquiry.",
      points: [
        "Competitive dental search demand across Islamabad.",
        "Need for premium healthcare positioning without losing clinical clarity.",
        "Service-specific pages for implants, orthodontics, root canal treatment, oral surgery and cosmetic dentistry.",
        "Stronger doctor authority signals and clear location identity.",
        "Mobile-first conversion through WhatsApp, booking CTAs and appointment-focused page structure.",
      ],
    },
    strategy: [
      {
        title: "Premium Dental Brand Experience",
        body:
          "Crea8iv Media shaped a clean white-and-blue healthcare direction that feels specialist, calm and premium. The interface uses generous spacing, clinical photography, crisp hierarchy and service-led navigation to help patients understand care options quickly.",
      },
      {
        title: "Conversion-Focused Website System",
        body:
          "The website is structured around booking behavior: service CTAs, WhatsApp actions, doctor availability cues, mobile-friendly contact paths and treatment pages that help a visitor move from research to consultation without friction.",
      },
      {
        title: "Local SEO for Islamabad",
        body:
          "The search architecture supports intent around dentist in Islamabad, dental clinic Islamabad, dental implants Islamabad, orthodontist Islamabad, root canal Islamabad, wisdom tooth removal Islamabad and cosmetic dentist Islamabad.",
      },
      {
        title: "AI Search, AEO, GEO and LLMO",
        body:
          "The site is organized so Google, ChatGPT, Gemini, Perplexity and other answer systems can better understand who The Smile Xperts are, where the clinic is located, what services are offered, which doctors practice there and how patients can book.",
      },
      {
        title: "Google Business Profile Growth",
        body:
          "GBP optimization is planned and managed around accurate categories, service descriptions, appointment links, photos, posts, review strategy and local ranking signals. Ranking or call increases are not claimed without approved reporting.",
      },
      {
        title: "Meta Ads and Instagram Management",
        body:
          "The growth direction connects lead campaigns, retargeting, reels, doctor authority content, educational before-and-after style communication where approved, and a WhatsApp-led enquiry flow.",
      },
    ],
    execution: {
      title: "Execution",
      body:
        "The work combines design, content architecture and technical SEO so the clinic can present a premium patient experience while building a stronger foundation for search and AI discovery.",
      points: [
        "Homepage redesign with specialist-led positioning.",
        "Treatment pages and SEO content architecture.",
        "Doctor profile and authority content paths.",
        "Schema.org structured data, sitemap, robots and llms.txt planning.",
        "Mobile optimization and appointment-focused interface patterns.",
        "Footer agency attribution and performance-conscious static deployment.",
      ],
    },
    deliverables: [
      "Premium clinic website",
      "SEO landing pages",
      "Doctor authority pages",
      "Article and content architecture",
      "AI visibility layer",
      "WhatsApp conversion system",
      "Google Business Profile strategy",
      "Meta Ads funnel",
      "Instagram growth direction",
      "Creative production system",
    ],
    outcomes: [
      "Stronger premium brand perception online.",
      "Improved service discoverability foundation.",
      "Better mobile appointment journey.",
      "More structured local SEO presence.",
      "Stronger doctor authority signals.",
      "Website prepared for Google and AI discovery.",
      "Clearer pathway from visitor to WhatsApp or appointment inquiry.",
    ],
    technology: [
      "Next.js",
      "Static export",
      "Responsive UI",
      "Schema.org structured data",
      "Optimized images",
      "SEO metadata",
      "Sitemap",
      "llms.txt",
      "Accessibility-conscious components",
    ],
    evidenceTitle: "Work in Practice",
    evidenceCopy:
      "No fabricated performance metrics are published here. The case study focuses on the live website, verified digital assets and the growth system currently being established.",
    creativeExamples: [
      {
        src: "/img/case-studies/the-smile-xperts/the-smile-xperts-brand-guideline-cover.webp",
        alt: "The Smile Xperts brand guideline cover artwork",
        title: "Brand System",
        body: "A healthcare visual language built around clarity, clinical trust and premium patient confidence.",
      },
      {
        src: "/img/case-studies/the-smile-xperts/the-smile-xperts-reel-poster.webp",
        alt: "The Smile Xperts social reel poster creative",
        title: "Social Content",
        body: "Short-form creative designed to support doctor authority, service awareness and patient education.",
      },
      {
        src: "/img/case-studies/the-smile-xperts/the-smile-xperts-details-post.webp",
        alt: "The Smile Xperts detail-focused Instagram creative",
        title: "Service Communication",
        body: "Visual content that makes specialist dental care easier to understand before a patient books.",
      },
    ],
    serviceLinks: [
      { label: "Website Development", href: "/website-development/" },
      { label: "AI Search Optimization", href: "/ai-search-optimization/" },
      { label: "Meta Ads", href: "/meta-ads/" },
      { label: "Social Media Management", href: "/social-media-management/" },
    ],
  },
  "home-studio-interiors": {
    slug: "home-studio-interiors",
    clientName: "Home Studio Interiors",
    clientUrl: "https://homestudiointeriors.pk/",
    caseStudyUrl: `${caseStudyBase}/home-studio-interiors/`,
    metaTitle: "Home Studio Interiors Case Study | Luxury Website, SEO, Ads and Funnel",
    metaDescription:
      "See how Crea8iv Media built Home Studio Interiors' luxury website, SEO foundation, Google Business Profile, Meta lead campaigns, social visibility and automated enquiry funnel.",
    socialImage: "/img/case-studies/home-studio-interiors/home-studio-social-preview.png",
    heroTitle: "Luxury Growth System for Home Studio Interiors",
    subtitle:
      "Crea8iv Media partnered with Home Studio Interiors to build a premium interior-design growth engine: luxury website design, technical SEO, Google Business Profile setup, Meta lead generation, social content, WhatsApp and Messenger automation, sales-funnel handling and ongoing visibility work across Islamabad and Rawalpindi.",
    eyebrow: "Luxury interiors website, SEO, ads and funnel case study",
    statusLabel: "Website, visibility and lead system delivered",
    industry: "Interior Design / Turnkey Home Interiors",
    location: "Islamabad and Rawalpindi, Pakistan",
    market: "Homeowners, renovators and residential interior clients",
    platform: "Astro, Tailwind CSS, static deployment and structured data",
    heroImage: {
      src: "/img/case-studies/home-studio-interiors/home-studio-brand-guideline-cover.webp",
      alt: "Home Studio Interiors premium brand guideline cover",
      caption: "A luxury interiors identity translated into website, content and conversion systems.",
    },
    desktopImage: {
      src: "/img/case-studies/home-studio-interiors/proof/home-studio-live-desktop-2026.webp",
      alt: "Desktop screenshot of Home Studio Interiors luxury website",
      caption: "Desktop experience with premium positioning, service navigation and quote-focused actions.",
    },
    mobileImage: {
      src: "/img/case-studies/home-studio-interiors/proof/home-studio-live-mobile-2026.webp",
      alt: "Mobile screenshot of Home Studio Interiors website quote flow",
      caption: "Mobile-first service discovery with call and quote actions for homeowners.",
    },
    accent: "#ff9b36",
    accentSoft: "rgba(255,155,54,.2)",
    snapshot: [
      { label: "Client", value: "Home Studio Interiors" },
      { label: "Industry", value: "Interior Design / Home Improvement" },
      { label: "Location", value: "Islamabad and Rawalpindi, Pakistan" },
      { label: "Services", value: "Website, SEO, GBP, Meta Ads, content, automation, funnel and sales support" },
      { label: "Website", value: "homestudiointeriors.pk" },
      { label: "Status", value: "Ongoing visibility, lead generation and enquiry handling support" },
    ],
    challenge: {
      intro:
        "Home Studio Interiors needed more than a beautiful website. The business had to look credible for premium residential projects, explain its turnkey interior scope clearly, generate consistent enquiries, keep social content active and move interested homeowners from discovery to quote conversations without losing them across channels.",
      points: [
        "Present kitchens, wardrobes, media walls, vanities, doors and remodeling services without overwhelming visitors.",
        "Create a luxury digital brand experience aligned with interior design expectations.",
        "Create and grow the Google Business Profile so searchers could call, chat and visit the website.",
        "Use paid campaigns to generate interior-design enquiries while separating intake, qualification and follow-up.",
        "Set up WhatsApp, Instagram, Facebook and Messenger responses so new enquiries did not depend on one manual inbox.",
        "Support content shooting, creative direction, hiring and sales handling so marketing activity connected to business operations.",
      ],
    },
    strategy: [
      {
        title: "Premium Brand Experience",
        body:
          "The visual direction uses a refined dark interior palette, warm orange accents, editorial spacing and project-led imagery so the brand feels appropriate for high-value residential interiors instead of a generic renovation service.",
      },
      {
        title: "Service-Led Search Architecture",
        body:
          "The site separates kitchens, wardrobes, media walls, vanities, doors, projects, FAQs, process and service areas so homeowners can evaluate one need at a time while search engines can understand the business by service, location and intent.",
      },
      {
        title: "SEO, AEO, GEO, AIO and SXO",
        body:
          "The visibility layer covers Technical SEO, On-Page SEO, Topical Authority, Entity and Semantic SEO, Off-Page SEO, Featured Snippets, question-based content, Voice Search SEO, FAQ optimization, AI Overview optimization, AI citations, LLM visibility, brand mentions, entity signals, AI recommendations, AI Search Visibility, AI Content Optimization, AI Mode Optimization, AI Search Analytics, search intent, UX and page experience, CRO, content experience, engagement and retention.",
      },
      {
        title: "Lead Funnel and Automation",
        body:
          "Paid campaigns, Google Business Profile actions, website CTAs and social inboxes were connected to a practical funnel: intake, qualification, follow-up, not-interested tracking, later-stage callbacks and converted lead tracking.",
      },
    ],
    execution: {
      title: "A-to-Z Execution",
      body:
        "The project combined brand presentation, website production, search architecture, local profile growth, creative production, paid acquisition, enquiry automation and operational sales support so the marketing system could move a prospect from first impression to a project conversation.",
      points: [
        "Homepage, about, service, project, blog, contact, FAQ and process page architecture.",
        "Service pages for kitchens, wardrobes, vanities, media walls and doors.",
        "Google Business Profile creation, optimization and performance monitoring.",
        "Islamabad and Rawalpindi local visibility structure with rank-focused service and location signals.",
        "LocalBusiness, WebSite, Service, FAQ and Breadcrumb structured data planning.",
        "llms.txt, ai-context.json, sitemap and robots support.",
        "Image optimization, lightweight JavaScript and Hostinger-ready deployment.",
        "Meta lead campaigns for kitchen, full-home interiors, architecture and hiring needs.",
        "Instagram, Facebook, Messenger and WhatsApp auto-response flows for faster enquiry handling.",
        "Lead Center pipeline structure for intake, qualified, not interested, do-it-later, not answering, switch-off and converted leads.",
        "Content shooting, premium social creative and feed management for ongoing brand presence.",
        "Salesperson and staff hiring support noted in the project brief, connected to the same growth system.",
      ],
    },
    deliverables: [
      "Luxury interior design website",
      "Responsive static front-end",
      "Service-specific SEO pages",
      "Local SEO architecture",
      "Google Business Profile setup and optimization",
      "Technical SEO, On-Page SEO, Topical Authority, Entity and Semantic SEO, Off-Page SEO",
      "AEO: Featured Snippets, Question-Based Content, Voice Search SEO, FAQ Optimization and AI Overview Optimization",
      "GEO: AI Citations, LLM Visibility, Brand Mentions, Entity Signals and AI Recommendations",
      "AIO: AI Search Visibility, AI Content Optimization, AI Overview, AI Mode Optimization and AI Search Analytics",
      "SXO: Search Intent, UX and Page Experience, CRO, Content Experience, Engagement and Retention",
      "AI-readable context layer",
      "FAQ and guide content structure",
      "WhatsApp quote flow",
      "Instagram, Facebook and Messenger automation",
      "Meta Ads campaign setup and optimization",
      "Lead Center pipeline management",
      "Sales and hiring support",
      "Content shooting and premium social creatives",
      "Schema and metadata",
      "Optimized images",
      "Hostinger deployment readiness",
    ],
    outcomes: [
      "A premium website experience aligned with high-value interior design expectations.",
      "Clearer service discovery for kitchens, wardrobes, media walls, doors, vanities and full-home interiors.",
      "Google Business Profile activity with 53 calls and 26 chat clicks recorded from May to August 2026.",
      "Meta Ads campaigns recorded 792 lead-form results and 654 messaging conversations in the supplied campaign export.",
      "Social visibility increased across Instagram and Facebook, with screenshot-backed reach, views, clicks, visits and follows.",
      "Lead tracking moved beyond raw enquiries into intake, qualified, follow-up and converted stages.",
      "Automation reduced the risk of missed enquiries across WhatsApp, Instagram, Facebook and Messenger.",
      "The system supported regular potential-client calls and high-intent project conversations reported in the project brief.",
    ],
    technology: [
      "Astro",
      "Tailwind CSS",
      "Static website generation",
      "WebP image optimization",
      "Lightweight JavaScript",
      "Schema.org structured data",
      "llms.txt",
      "ai-context.json",
      "Hostinger deployment",
    ],
    evidenceTitle: "Work in Practice",
    evidenceCopy:
      "This case study uses supplied screenshots and a Meta Ads CSV export as the evidence base. Platform figures are shown with their source context and date ranges where visible. Operational items such as staff hiring support, content shooting and automation scope are included as project-scope notes from the brief rather than independent analytics claims.",
    responsiveShowcase: {
      src: "/img/portfolio/websites/home-studio-interior-design-website-showcase.webp",
      alt: "Home Studio Interiors combined desktop and mobile website showcase",
      title: "Desktop and mobile website system in one view",
      body:
        "The combined showcase presents the public website and mobile experience together, so readers can inspect how the luxury visual language, service discovery and quote actions translate across screen sizes.",
      caption: "Combined website presentation supplied for the Home Studio Interiors case study.",
      points: [
        "Desktop view communicates premium positioning, services, projects and contact paths.",
        "Mobile view keeps call, quote and service exploration accessible for social and local-search traffic.",
        "The showcase is displayed as a complete visual, not cropped into a decorative background.",
      ],
    },
    creativeExamples: [
      {
        src: "/img/case-studies/home-studio-interiors/proof/instagram-grid-01.webp",
        alt: "Home Studio Interiors Instagram grid showing premium residence and kitchen content",
        title: "Premium Social Direction",
        body: "The feed uses luxury interior renders, project narratives and detail-led captions to make the studio feel aspirational while staying connected to real service categories.",
      },
      {
        src: "/img/case-studies/home-studio-interiors/proof/instagram-grid-02.webp",
        alt: "Home Studio Interiors Instagram grid showing kitchen education and interior detail posts",
        title: "Detail-Led Luxury Feed",
        body: "The grid balances aspirational interior imagery with practical prompts around kitchens, surfaces, storage, finishes and premium home planning.",
      },
      {
        src: "/img/case-studies/home-studio-interiors/proof/instagram-grid-03.webp",
        alt: "Home Studio Interiors Instagram grid showing renovation, kitchen and residence content",
        title: "Renovation and Kitchen Demand",
        body: "Posts connect visual inspiration to buyer problems such as outdated kitchens, missing wow factors, storage issues and full-home renovation planning.",
      },
      {
        src: "/img/case-studies/home-studio-interiors/proof/instagram-grid-04.webp",
        alt: "Home Studio Interiors Instagram grid with luxury interiors and kitchen education posts",
        title: "Content and Education",
        body: "Content themes include luxury finishes, kitchen planning, wardrobes, renovation prompts and design details that support both inspiration and enquiry intent.",
      },
      {
        src: "/img/case-studies/home-studio-interiors/proof/instagram-grid-05.webp",
        alt: "Home Studio Interiors Instagram grid with design detail and planning content",
        title: "Project-Led Creative",
        body: "Visuals mix finished interiors, planning references and problem-aware creative so the brand can attract both dream-home inspiration and practical project enquiries.",
      },
    ],
    evidenceMetrics: [
      {
        label: "Meta Ads Spend",
        value: "PKR 260,248.94",
        note: "Total spend across 14 campaigns in the supplied Meta Ads CSV export for the reporting window ending September 30, 2026.",
      },
      {
        label: "Meta Ads Reach",
        value: "297,766",
        note: "CSV total reach across lead, messaging, conversion-lead and engagement campaigns.",
      },
      {
        label: "Meta Ads Impressions",
        value: "910,409",
        note: "CSV total impressions across the same campaign export.",
      },
      {
        label: "Lead Form Results",
        value: "792",
        note: "CSV total for campaigns using actions:leadgen.other, with PKR 179,086.45 spend and an average cost of about PKR 226.12 per lead-form result.",
      },
      {
        label: "Messaging Conversations",
        value: "654",
        note: "CSV total for campaigns using messaging conversation results, supporting WhatsApp, Messenger and inbox-led follow-up.",
      },
      {
        label: "Visible Lead Screenshots",
        value: "780",
        note: "Four supplied ad screenshots show 519, 151, 57 and 53 form leads with PKR 176,093.65 visible spend.",
      },
      {
        label: "Google Profile Calls",
        value: "53",
        note: "Google Business Profile calls recorded for May to August 2026, with 22 calls visible for August 2026.",
      },
      {
        label: "Google Profile Chats",
        value: "26",
        note: "Google Business Profile chat clicks recorded for May to August 2026, with 12 chat clicks visible for August 2026.",
      },
      {
        label: "Instagram Views",
        value: "163.6K",
        note: "Instagram screenshot shows views up 482.9%, with 41.9K reach, 2.4K interactions, 1.9K link clicks, 2.6K visits and 320 follows.",
      },
      {
        label: "Facebook Views",
        value: "697.9K",
        note: "Facebook screenshot shows views up 1.0K%, with 151.8K viewers, 7.7K link clicks, 6.4K visits and 218 follows.",
      },
      {
        label: "Lead Center Intake",
        value: "79",
        note: "Meta Lead Center screenshot shows 79 intake leads, 49 qualified, 10 converted leads and a 1.1% conversion rate summary.",
      },
      {
        label: "Qualified Leads",
        value: "49",
        note: "Visible Lead Center board separates qualification from raw intake, with additional follow-up states for not interested, do it later and not answering.",
      },
    ],
    proofGallery: [
      {
        src: "/img/portfolio/websites/home-studio-interior-design-website-showcase.webp",
        alt: "Home Studio Interiors website and mobile showcase in one presentation image",
        title: "Website and Mobile Showcase",
        body: "The website presentation shows desktop and mobile views together, connecting the luxury visual identity to a responsive conversion path.",
      },
      {
        src: "/img/case-studies/home-studio-interiors/proof/google-business-profile-calls.webp",
        alt: "Google Business Profile performance screenshot showing 53 calls for Home Studio Interiors",
        title: "Google Business Profile Calls",
        body: "The profile recorded 53 calls from May to August 2026, including 22 calls in August 2026. This supports the local visibility and direct-enquiry layer.",
      },
      {
        src: "/img/case-studies/home-studio-interiors/proof/google-business-profile-chat-clicks.webp",
        alt: "Google Business Profile performance screenshot showing 26 chat clicks for Home Studio Interiors",
        title: "Google Business Profile Chat Clicks",
        body: "The profile recorded 26 chat clicks from May to August 2026, including 12 chat clicks in August 2026.",
      },
      {
        src: "/img/case-studies/home-studio-interiors/proof/meta-ads-kitchen-leads.webp",
        alt: "Meta Ads screenshot showing Home Studio Kitchen Leads campaign performance",
        title: "Kitchen Lead Campaign",
        body: "The Home Studio Kitchen Leads campaign screenshot shows 519 form leads, PKR 99,625.03 spent and PKR 191.96 cost per lead.",
      },
      {
        src: "/img/case-studies/home-studio-interiors/proof/meta-ads-july-full-home.webp",
        alt: "Meta Ads screenshot showing July full home interiors lead campaign performance",
        title: "Full Home Interiors - July",
        body: "The July 2026 full-home interiors campaign screenshot shows 151 form leads, PKR 26,649.27 spent and PKR 176.49 cost per lead.",
      },
      {
        src: "/img/case-studies/home-studio-interiors/proof/meta-ads-aug-full-home.webp",
        alt: "Meta Ads screenshot showing August full home interiors lead campaign performance",
        title: "Full Home Interiors - August",
        body: "The August 2026 full-home interiors campaign screenshot shows 57 form leads, PKR 25,500.52 spent and PKR 447.38 cost per lead.",
      },
      {
        src: "/img/case-studies/home-studio-interiors/proof/meta-ads-hn-architects.webp",
        alt: "Meta Ads screenshot showing HN Architects campaign performance",
        title: "Architecture Audience Campaign",
        body: "The HN Architects lead campaign screenshot shows 53 form leads, PKR 24,318.83 spent and PKR 458.85 cost per lead.",
      },
      {
        src: "/img/case-studies/home-studio-interiors/proof/meta-lead-center.webp",
        alt: "Meta Lead Center screenshot showing intake qualified and converted lead stages",
        title: "Lead Funnel Board",
        body: "The Lead Center board shows 79 intake leads, 49 qualified leads, 10 converted leads in the summary, plus follow-up columns for not interested, do it later, not answering and switch off.",
      },
      {
        src: "/img/case-studies/home-studio-interiors/proof/instagram-insights.webp",
        alt: "Instagram insights screenshot for Home Studio Interiors",
        title: "Instagram Growth",
        body: "Instagram reporting shows 163.6K views, 41.9K reach, 2.4K content interactions, 1.9K link clicks, 2.6K visits and 320 follows.",
      },
      {
        src: "/img/case-studies/home-studio-interiors/proof/facebook-insights.webp",
        alt: "Facebook insights screenshot for Home Studio Interiors",
        title: "Facebook Growth",
        body: "Facebook reporting shows 697.9K views, 151.8K viewers, 770 content interactions, 7.7K link clicks, 6.4K visits and 218 follows.",
      },
      {
        src: "/img/case-studies/home-studio-interiors/proof/home-studio-live-desktop-2026.webp",
        alt: "Desktop view of Home Studio Interiors luxury website",
        title: "Luxury Website Experience",
        body: "The live website presents full-home interiors, service categories, premium design cues and direct quote actions for desktop visitors.",
      },
      {
        src: "/img/case-studies/home-studio-interiors/proof/home-studio-live-mobile-2026.webp",
        alt: "Mobile view of Home Studio Interiors luxury website",
        title: "Mobile Quote Path",
        body: "The mobile experience keeps call, quote and service exploration visible for homeowners browsing from social, search or Google Business Profile.",
      },
    ],
    serviceLinks: [
      { label: "Website Development", href: "/website-development/" },
      { label: "Branding and Creative", href: "/branding-and-creative/" },
      { label: "AI Search Optimization", href: "/ai-search-optimization/" },
      { label: "Local SEO Services", href: "/google-business-profile-growth/" },
      { label: "Meta Ads", href: "/meta-ads/" },
      { label: "Marketing Automation", href: "/marketing-automation/" },
    ],
    closingTitle: "Need a luxury website, local visibility and a working lead funnel?",
    closingCopy:
      "Crea8iv Media can connect brand presentation, SEO, Google Business Profile, paid campaigns, automation and sales follow-up into one practical growth system.",
    faq: [
      {
        question: "What did Crea8iv Media do for Home Studio Interiors?",
        answer:
          "Crea8iv Media delivered a luxury website, service-led SEO architecture, Google Business Profile setup and optimization, Meta Ads campaigns, Instagram and Facebook creative, WhatsApp and Messenger automation, lead pipeline organization, content support and sales or staffing support noted in the project brief.",
      },
      {
        question: "Which SEO work was included?",
        answer:
          "The work covered Technical SEO, On-Page SEO, Topical Authority, Entity and Semantic SEO, Off-Page SEO, AEO for question-led answers and featured snippets, GEO and AIO signals for AI search visibility, and SXO improvements for search intent, UX, CRO and retention.",
      },
      {
        question: "What performance evidence is available?",
        answer:
          "The supplied evidence includes Google Business Profile screenshots showing 53 calls and 26 chat clicks for May to August 2026, social screenshots showing Instagram and Facebook visibility, a Meta Lead Center board and a Meta Ads CSV export with 14 campaigns, PKR 260,248.94 spend, 910,409 impressions and 297,766 reach.",
      },
      {
        question: "How were leads handled after campaigns generated enquiries?",
        answer:
          "The funnel separated intake, qualified leads, not interested, do it later, not answering, switch off and converted leads. Automation across WhatsApp, Instagram, Facebook and Messenger supported faster responses while sales follow-up handled project-fit conversations.",
      },
      {
        question: "Does this case study guarantee the same results for another interior design business?",
        answer:
          "No. The case study documents Home Studio Interiors' supplied platform evidence, campaign export and implementation scope. Results depend on market, offer, budget, sales follow-up, service capacity and measurement setup.",
      },
    ],
  },
  "co3-premium-liquid-shop": {
    slug: "co3-premium-liquid-shop",
    clientName: "CO3 Premium Liquid Shop",
    clientUrl: "https://co3premiumliquids.com/",
    caseStudyUrl: `${caseStudyBase}/co3-premium-liquid-shop/`,
    metaTitle: "CO3 Case Study | Cafe Website & SEO by Crea8iv Media",
    metaDescription:
      "See how Crea8iv Media designed and developed a premium cafe website, admin-managed menu system, WhatsApp ordering flow, local SEO architecture and AI visibility layer for CO3 Premium Liquid Shop.",
    socialImage: "/img/case-studies/co3-premium-liquid-shop/co3-social-preview.png",
    heroTitle: "CO3 Premium Liquid Shop - Premium Drinks Brand Website, Admin System and Local SEO",
    subtitle:
      "Crea8iv Media designed and developed a luxury mobile-first website and complete digital ordering ecosystem for CO3 Premium Liquid Shop, a premium bubble tea, coffee, ice cream and soda brand in Bahria Town Rawalpindi.",
    eyebrow: "Premium food and beverage website, admin system and local SEO",
    statusLabel: "Production-ready deployment on the client domain",
    industry: "Food and Beverage / Cafe / Bubble Tea / Dessert Drinks",
    location: "Bahria Town Phase 4, Rawalpindi, Pakistan",
    market: "Bahria Town Phase 1-8, Rawalpindi and nearby Islamabad",
    platform: "Next.js 14, Tailwind CSS, PHP, SQLite and Hostinger",
    heroImage: {
      src: "/img/case-studies/co3-premium-liquid-shop/co3-premium-logo-hero.png",
      alt: "CO3 Premium Liquid Shop logo artwork",
      caption: "A premium drinks identity translated into a mobile-first ordering experience.",
    },
    desktopImage: {
      src: "/img/case-studies/co3-premium-liquid-shop/co3-social-preview.png",
      alt: "CO3 Premium Liquid Shop website top-screen screenshot",
      caption: "Premium drinks website built around product photography, offers and WhatsApp ordering.",
    },
    mobileImage: {
      src: "/img/case-studies/co3-premium-liquid-shop/co3-live-mobile.png",
      alt: "Mobile screenshot of CO3 Premium Liquid Shop website",
      caption: "App-like mobile browsing for menu discovery and quick ordering.",
    },
    accent: "#d7a23c",
    accentSoft: "rgba(215,162,60,.2)",
    snapshot: [
      { label: "Client", value: "CO3 Premium Liquid Shop" },
      { label: "Industry", value: "Food and Beverage / Cafe / Bubble Tea / Dessert Drinks" },
      { label: "Location", value: "Bahria Town Rawalpindi, Pakistan" },
      { label: "Market", value: "Rawalpindi, Islamabad and Bahria Town Phase 1-8" },
      { label: "Platform", value: "Next.js, Tailwind CSS, PHP, SQLite and Hostinger" },
      { label: "Services", value: "UI/UX, development, admin panel, SEO, local SEO, AI visibility and deployment" },
    ],
    challenge: {
      intro:
        "CO3 needed more than a basic menu website. The brand needed a premium digital experience that could represent its playful luxury identity, showcase product photography, support mobile customers, drive WhatsApp orders and let the owner manage products, offers and settings without expensive infrastructure.",
      points: [
        "Preserve the CO3 brand while elevating the digital presentation.",
        "Make the menu easy to browse on mobile like a lightweight app.",
        "Support WhatsApp ordering with product, flavour, size, quantity, customer name and delivery address details.",
        "Keep the public site static-export friendly for Hostinger shared hosting.",
        "Create a local SEO and AI visibility foundation for Bahria Town Phase 1-8, Rawalpindi and Islamabad.",
      ],
    },
    strategy: [
      {
        title: "Preserve and Elevate the Brand",
        body:
          "The interface uses a cream, teal and gold system that keeps CO3's premium drinks identity intact while making the website feel polished, tactile and product-led.",
      },
      {
        title: "Mobile-First Ordering",
        body:
          "The experience behaves like a lightweight storefront: app-like navigation, sticky mobile actions, product cards, WhatsApp buttons and an order modal that captures the details needed for manual fulfilment.",
      },
      {
        title: "Admin Without Heavy Infrastructure",
        body:
          "A PHP and SQLite admin panel lets the CO3 team manage products, offers, settings, logos and uploaded images. Public menu data is pulled from /admin/api.php with fallback product data for reliability.",
      },
      {
        title: "Search and AI Readiness",
        body:
          "Metadata, schema, sitemap, robots, llms.txt, FAQ answer blocks and a Bahria Town Phase 1-8 local SEO page help Google, AI Overviews and LLMs understand the brand, products, location and ordering paths.",
      },
      {
        title: "Hostinger Deployment Workflow",
        body:
          "The build is designed for static export, Hostinger shared hosting compatibility, GitHub version control and a practical production deployment workflow.",
      },
    ],
    execution: {
      title: "What We Built",
      body:
        "Crea8iv Media delivered a complete premium digital transformation for CO3 Premium Liquid Shop, covering brand experience, front-end development, admin management, ordering flow, SEO and deployment.",
      points: [
        "Luxury website experience with responsive layouts, product visuals, gallery, offers and conversion-focused sections.",
        "Mobile bottom navigation, product cards, WhatsApp ordering and a structured order modal.",
        "PHP and SQLite admin panel for products, offers, settings, logo management and image uploads.",
        "Live data API integration from /admin/api.php with fallback product/menu data.",
        "Local SEO for Bahria Town Phase 1-8, Rawalpindi and Islamabad.",
        "Schema, sitemap, robots, llms.txt and creative agency attribution.",
      ],
    },
    deliverables: [
      "Premium website UI/UX design",
      "Next.js 14 static-export front-end",
      "Tailwind CSS design system",
      "Framer Motion animations",
      "PWA add-to-home-screen setup",
      "Product menu architecture",
      "WhatsApp ordering flow",
      "PHP and SQLite admin panel",
      "Product image upload integration",
      "Live data API integration",
      "Fallback menu data",
      "SEO metadata and schema",
      "Local SEO architecture",
      "llms.txt for AI visibility",
      "Sitemap and robots optimization",
      "Hostinger deployment workflow",
    ],
    outcomes: [
      "Premium brand presentation online.",
      "Mobile-first ordering experience.",
      "Admin-managed product and offer system.",
      "Faster customer path to WhatsApp orders.",
      "Search-friendly architecture.",
      "Local SEO foundation for Bahria Town Phase 1-8, Rawalpindi and Islamabad.",
      "AI-readable business and product signals.",
      "Production-ready deployment on the client's official domain.",
    ],
    technology: [
      "Next.js 14 App Router",
      "Static export",
      "Tailwind CSS",
      "Framer Motion",
      "Lenis",
      "Swiper",
      "PHP",
      "SQLite",
      "Hostinger shared hosting",
      "GitHub",
      "WhatsApp ordering integration",
    ],
    evidenceTitle: "Results and Outcomes",
    evidenceCopy:
      "No traffic, revenue, ranking or conversion numbers are claimed. The outcomes below describe the delivered system and the expected strategic role of the website.",
    creativeExamples: [
      {
        src: "/img/case-studies/co3-premium-liquid-shop/co3-boba-drink-post.webp",
        alt: "CO3 product creative featuring a premium boba drink",
        title: "Product-Led Creative",
        body: "Visual assets keep the drinks vivid, premium and directly connected to the ordering experience.",
      },
      {
        src: "/img/case-studies/co3-premium-liquid-shop/co3-brand-guideline-cover.webp",
        alt: "CO3 brand guideline cover artwork",
        title: "Brand Consistency",
        body: "The cream, teal and gold system carries through website UI, product visuals and campaign assets.",
      },
      {
        src: "/img/case-studies/co3-premium-liquid-shop/co3-reel-poster.webp",
        alt: "CO3 social reel poster artwork",
        title: "Social-Ready Assets",
        body: "Short-form creative supports offer visibility, product discovery and WhatsApp-led customer action.",
      },
    ],
    serviceLinks: [
      { label: "Website Development", href: "/website-development/" },
      { label: "AI Search Optimization", href: "/ai-search-optimization/" },
      { label: "Google Business Profile Growth", href: "/google-business-profile-growth/" },
      { label: "Branding and Creative", href: "/branding-and-creative/" },
    ],
    faq: [
      {
        question: "Who designed the CO3 Premium Liquid Shop website?",
        answer: "The CO3 Premium Liquid Shop website was designed and developed by Crea8iv Media.",
      },
      {
        question: "What services did Crea8iv Media provide for CO3?",
        answer:
          "Crea8iv Media provided website design, development, admin panel development, product and menu integration, WhatsApp ordering, SEO, local SEO, AI visibility optimization and deployment.",
      },
      {
        question: "Is this a restaurant or cafe website case study?",
        answer:
          "Yes. CO3 is a premium drinks, bubble tea, coffee, ice cream and soda brand, and this project is an example of a premium food and beverage website with admin-managed menu content.",
      },
      {
        question: "Can Crea8iv Media build similar websites for cafes and restaurants in Pakistan?",
        answer:
          "Yes. Crea8iv Media builds premium websites, ordering flows, SEO systems and admin panels for cafes, restaurants, food brands and local businesses in Pakistan.",
      },
    ],
  },
  "hassan-nawaz-architects": {
    slug: "hassan-nawaz-architects",
    clientName: "HN",
    clientUrl: "https://hassannawazarchitects.com/",
    clientAnchorText: "HN website",
    caseStudyUrl: `${caseStudyBase}/hassan-nawaz-architects/`,
    metaTitle: "HN Case Study | Complete Digital Growth System by Crea8iv Media",
    metaDescription:
      "See how Crea8iv Media built a complete digital growth system for HN, including branding, website design, SEO, content, WhatsApp leads, local SEO, social media and campaign strategy.",
    socialImage: "/img/portfolio/websites/hassan-nawaz-architects-website-showcase.webp",
    heroTitle: "How Crea8iv Media Built a Complete Digital Growth System for HN",
    subtitle:
      "A premium full-service case study across brand strategy, website design and development, SEO, content, portfolio presentation, WhatsApp inquiry flow, social media support, campaign planning, local visibility and ongoing creative guidance.",
    eyebrow: "Brand, website, SEO and digital growth system",
    statusLabel: "Complete digital foundation for ongoing growth",
    industry: "Architecture / Interior Design / 3D Visualization",
    location: "Islamabad and Rawalpindi, Pakistan",
    market: "Islamabad, Rawalpindi and Pakistan-wide service-business visibility",
    platform: "Premium website, SEO structure, local visibility, campaign readiness and analytics foundation",
    heroImage: {
      src: "/img/portfolio/websites/hassan-nawaz-architects-website-showcase.webp",
      alt: "HN website showcase by Crea8iv Media",
      caption: "A complete digital growth system built around brand trust, portfolio proof, search visibility and WhatsApp inquiries.",
    },
    desktopImage: {
      src: "/img/portfolio/websites/hassan-nawaz-architects-website-showcase.webp",
      alt: "HN premium website preview",
      caption: "The website presents HN as a premium service brand with clear navigation, project context and conversion paths.",
    },
    mobileImage: {
      src: "/img/case-studies/hassan-nawaz-architects/hn-architects-portfolio-cover.webp",
      alt: "HN Architects portfolio cover visual used in the architecture case study",
      caption: "Premium project presentation supported by architecture and interiors visual assets.",
    },
    accent: "#ff8a22",
    accentSoft: "rgba(255,138,34,.2)",
    snapshot: [
      { label: "Client", value: "HN / Hassan Nawaz Architects" },
      { label: "Industry", value: "Architecture, interiors, exterior design, 3D visualization and consultancy" },
      { label: "Location", value: "DHA II Islamabad, serving Islamabad, Rawalpindi and Pakistan" },
      { label: "Services", value: "Brand strategy, website design and development, SEO, content, portfolio presentation, WhatsApp leads, social support, Meta Ads strategy, local SEO and analytics" },
      { label: "Website", value: "hassannawazarchitects.com" },
      { label: "Status", value: "Live website and ongoing digital growth foundation" },
    ],
    overview: {
      title: "A complete digital system, not just a website.",
      body:
        "HN needed a premium digital presence that could explain the business clearly, present portfolio work professionally, support search and local visibility, create trust with future clients and move interested visitors toward WhatsApp inquiries. The project was designed and developed by Crea8iv Media as a connected foundation for brand visibility, content, campaigns and lead generation rather than a one-off website launch.",
      points: [
        "Premium brand strategy and digital positioning.",
        "Website design, development and mobile responsive UI/UX.",
        "SEO structure, content strategy and website copywriting.",
        "WhatsApp inquiry flow, campaign readiness and performance tracking.",
      ],
    },
    challenge: {
      intro:
        "HN needed more than a beautiful online portfolio. The business needed a digital presence that could make the brand easier to understand, easier to trust and easier to contact across website, search, social and paid campaign journeys.",
      points: [
        "Create a premium digital identity that matched the quality of the work.",
        "Explain services, positioning and project capabilities without making the website feel generic.",
        "Present portfolio and project work in a way future clients could evaluate quickly.",
        "Improve mobile browsing, website copy and clear inquiry paths.",
        "Build SEO, local SEO and technical foundations without keyword stuffing or guaranteed ranking claims.",
        "Prepare the brand for social media marketing, Meta Ads strategy, Google Business Profile support and ongoing performance review.",
      ],
    },
    strategy: [
      {
        title: "Brand Strategy and Digital Positioning",
        body:
          "Crea8iv Media positioned HN as a premium, credible service brand by aligning visual direction, messaging, portfolio proof, service clarity and inquiry paths around one consistent public presence.",
      },
      {
        title: "Website Design and Development",
        body:
          "The website was designed and developed with responsive UI/UX, clear navigation, service-led page structure, mobile-friendly layouts and project presentation that helps visitors understand HN before making contact.",
      },
      {
        title: "Content and Portfolio Presentation",
        body:
          "Website copy, content hierarchy and portfolio sections were shaped to communicate what HN does, why the work is credible and how a potential client can start a conversation.",
      },
      {
        title: "SEO, Local Visibility and Technical Foundation",
        body:
          "The project includes SEO structure, technical optimization, local SEO support, Google Business Profile alignment, metadata, crawlable links, structured data, sitemap files, robots.txt, llms.txt and AI-readable business context.",
      },
      {
        title: "Lead Generation and WhatsApp Flow",
        body:
          "Visible calls to action, consultation-focused copy, header and mobile contact paths, footer links and WhatsApp inquiry prompts were improved so interested visitors have a simple next step.",
      },
      {
        title: "Marketing and Campaign Support",
        body:
          "Crea8iv Media supported HN with social media marketing direction, Meta Ads and paid campaign strategy, creative guidance, analytics setup and ongoing marketing recommendations for long-term improvement.",
      },
    ],
    execution: {
      title: "Services Delivered",
      body:
        "Crea8iv Media delivered the project as a complete business growth foundation, connecting brand, website, content, search, campaign planning and lead-generation paths into one practical system.",
      points: [
        "Brand strategy, digital positioning and premium visual direction.",
        "Website design, frontend development, static deployment and mobile responsive UI/UX.",
        "Website copywriting, content strategy, service communication and portfolio presentation.",
        "SEO structure, technical optimization, structured data, sitemap and robots setup.",
        "Local SEO support, Google Business Profile guidance and location relevance for Islamabad and Rawalpindi.",
        "Lead generation flow, WhatsApp inquiry optimization and consultation-focused calls to action.",
        "Social media marketing support, Meta Ads and paid campaign strategy.",
        "Analytics and performance tracking foundation for ongoing review.",
      ],
    },
    deliverables: [
      "Brand strategy and digital positioning",
      "Website strategy",
      "Website design and development",
      "Mobile responsive UI/UX",
      "Static website deployment",
      "Content strategy and website copywriting",
      "Portfolio and project presentation",
      "Technical SEO",
      "SEO structure and metadata optimization",
      "Local SEO for Islamabad and Rawalpindi",
      "Google Business Profile support",
      "Service and location page architecture",
      "Structured data and AI-readable context",
      "llms.txt implementation",
      "sitemap.xml and sitemap_index.xml setup",
      "robots.txt optimization",
      "Lead generation flow",
      "WhatsApp lead CTA optimization",
      "Social media marketing support",
      "Meta Ads and paid campaign strategy",
      "Analytics and performance tracking",
      "Ongoing creative and marketing guidance",
    ],
    outcomes: [
      "A premium digital brand presentation for HN.",
      "Clearer service and project communication for future clients.",
      "A mobile-responsive website built for trust and inquiry behavior.",
      "Search-friendly architecture for long-term SEO and local visibility.",
      "More visible WhatsApp and consultation inquiry paths.",
      "A marketing-ready foundation for social media, Meta Ads and paid campaign planning.",
      "Analytics and performance tracking structure for ongoing improvement.",
    ],
    technology: [
      "Static website deployment",
      "Responsive front-end",
      "Mobile UI/UX",
      "Website copywriting",
      "Technical SEO",
      "Schema.org structured data",
      "Canonical URLs",
      "XML sitemap",
      "Image sitemap",
      "Sitemap index",
      "robots.txt",
      "llms.txt",
      "Google Business Profile support",
      "WhatsApp conversion links",
      "Analytics and performance tracking",
    ],
    evidenceTitle: "Why This Project Matters",
    evidenceCopy:
      "This project matters because it shows how a professional service business can move beyond a basic website into a connected digital growth system. HN now has a stronger public foundation across brand presentation, website experience, SEO, content, portfolio proof, WhatsApp inquiry flow, local visibility, campaign readiness and ongoing marketing direction. No fake rankings, traffic numbers, awards or lead counts are claimed.",
    creativeExamples: [
      {
        src: "/img/client-logos/optimized/hassan-nawaz-architects.webp",
        alt: "HN brand logo",
        title: "Brand Positioning",
        body: "The digital system gives HN a clearer public identity that can carry across the website, social media and campaign materials.",
      },
      {
        src: "/img/portfolio/websites/hassan-nawaz-architects-website-showcase.webp",
        alt: "HN website showcase visual",
        title: "Website and UX",
        body: "The website translates brand credibility, services, portfolio context and calls to action into a polished inquiry journey.",
      },
      {
        src: "/img/case-studies/hassan-nawaz-architects/hn-architects-portfolio-cover.webp",
        alt: "HN Architects portfolio cover asset",
        title: "Portfolio and Content",
        body: "Project presentation and website copy help future clients understand the quality of work before starting a conversation.",
      },
    ],
    serviceLinks: [
      { label: "Website Development", href: "/website-development/" },
      { label: "Branding and Creative", href: "/branding-and-creative/" },
      { label: "AI Search Optimization", href: "/ai-search-optimization/" },
      { label: "Meta Ads Strategy", href: "/meta-ads/" },
      { label: "Local SEO Services", href: "/google-business-profile-growth/" },
    ],
    closingTitle: "Need a complete digital growth system for your business?",
    closingCopy: "Work with Crea8iv Media to build a premium website, stronger brand presence, SEO foundation, campaign-ready content and clearer lead-generation paths.",
    faq: [
      {
        question: "Who provided digital services for HN?",
        answer:
          "Crea8iv Media provided complete digital services for HN, including brand strategy, website design and development, SEO, content strategy, portfolio presentation, WhatsApp inquiry optimization, social media support, Meta Ads strategy, local SEO, analytics and ongoing creative guidance.",
      },
      {
        question: "Did Crea8iv Media design and develop the HN website?",
        answer:
          "Yes. The HN website was designed and developed by Crea8iv Media as part of a broader digital growth system.",
      },
      {
        question: "What makes this more than a website project?",
        answer:
          "The project connects brand positioning, website UI/UX, copywriting, SEO structure, portfolio presentation, WhatsApp lead flow, social media support, paid campaign strategy, Google Business Profile guidance and analytics.",
      },
      {
        question: "Does this case study claim guaranteed rankings or fake results?",
        answer:
          "No. The case study describes the strategy, services and digital foundation delivered. It does not claim guaranteed rankings, fake traffic numbers, fake leads or invented performance results.",
      },
      {
        question: "Can Crea8iv Media build similar systems for other businesses?",
        answer:
          "Yes. Crea8iv Media builds brand, website, SEO, content, campaign and lead-generation systems for businesses that need a more professional and growth-focused digital presence.",
      },
    ],
  },
  "black-petals": {
    slug: "black-petals",
    clientName: "Black Petals",
    clientUrl: "https://blackpetals.us/",
    clientAnchorText: "Black Petals flower delivery website",
    caseStudyUrl: `${caseStudyBase}/black-petals/`,
    metaTitle: "Black Petals NYC Flower Delivery Case Study | Crea8iv Media",
    metaDescription:
      "A performance case study for Black Petals, an NYC-focused flower delivery brand supported by Crea8iv Media across Google Ads, SEO, website management, AEO, GEO, AIO and SXO.",
    socialImage: "/img/case-studies/black-petals/black-petals-live-desktop.webp",
    heroTitle: "Black Petals: Scaling NYC Flower Delivery Visibility, Traffic and Revenue",
    subtitle:
      "Crea8iv Media supports Black Petals across Google Ads, SEO and website management for the United States market, with special focus on New York City flower delivery demand. The engagement spans two years and connects acquisition strategy, Shopify performance review, search intent, AI visibility and ongoing store experience improvements.",
    eyebrow: "NYC flower delivery, Google Ads, SEO and Shopify growth",
    statusLabel: "Ongoing growth partnership",
    industry: "Ecommerce Flower Delivery",
    location: "United States, especially New York City",
    market: "NYC flower delivery, same-day flowers, floral gifts and event arrangements",
    platform: "Shopify, Google Ads, Google Search and analytics reporting",
    heroImage: {
      src: "/img/case-studies/black-petals/black-petals-live-desktop.webp",
      alt: "Black Petals desktop website showing Fall Flowers and same-day delivery in NYC",
      caption: "Live Black Petals storefront with seasonal flower merchandising and NYC delivery positioning.",
    },
    desktopImage: {
      src: "/img/case-studies/black-petals/shopify-marketing-annual.webp",
      alt: "Shopify analytics showing Black Petals annual sales, sessions and conversion data",
      caption: "Shopify annual analytics evidence for the Sep. 1, 2025 to Aug. 31, 2026 reporting window.",
    },
    mobileImage: {
      src: "/img/case-studies/black-petals/black-petals-live-mobile.webp",
      alt: "Black Petals mobile website with urgent order call bar and Fall Flowers hero",
      caption: "Mobile storefront view with urgent ordering, navigation, search, cart and same-day delivery messaging.",
    },
    accent: "#ff4d8d",
    accentSoft: "rgba(255,77,141,.16)",
    snapshot: [
      { label: "Client", value: "Black Petals" },
      { label: "Market", value: "United States, especially New York City" },
      { label: "Engagement", value: "Two-year working relationship, confirmed by the client brief" },
      { label: "Services", value: "Google Ads, SEO, website management, analytics review and conversion experience support" },
      { label: "Website", value: "blackpetals.us" },
      { label: "Evidence", value: "Google Ads and Shopify screenshots supplied on 30 September 2026" },
    ],
    overview: {
      title: "A flower delivery growth system built around high-intent NYC demand.",
      body:
        "Black Petals competes in a crowded ecommerce category where customers search with urgent, local and occasion-based intent. Crea8iv Media's role is to keep the website, paid search, SEO structure and conversion experience aligned around real buying behavior: same-day flower delivery, flowers near me, florist near me, birthday flowers, seasonal collections and NYC delivery queries.",
      points: [
        "Google Ads account views show active same-day flower delivery search ads and campaign-level reporting.",
        "Shopify analytics screenshots show annual revenue, session, channel and conversion evidence.",
        "The live site screenshots show desktop and mobile merchandising for Fall Flowers, gifts and same-day NYC delivery.",
        "The case study separates screenshot-supported evidence from strategic interpretation.",
      ],
    },
    challenge: {
      intro:
        "Flower delivery customers often need a clear answer fast: what can be delivered, when it can arrive, whether the store serves their area and whether the brand feels trustworthy enough for a time-sensitive gift. Black Petals also competes against major floral marketplaces and local NYC florists in paid and organic search.",
      points: [
        "High-intent queries such as flower delivery NYC, flowers near me, florist near me and same-day flower delivery require precise landing pages, ad messaging and product paths.",
        "Paid media must balance broad seasonal demand with purchase-focused search terms and mobile-heavy behavior.",
        "The Shopify experience needs clean merchandising, urgency cues, collection navigation, cart confidence and mobile ordering clarity.",
        "Search visibility work has to support technical SEO, topical authority, entity clarity and answer-style content without weakening the luxury floral brand.",
        "AI search and answer systems need extractable, consistent information about the brand, products, location context and delivery capabilities.",
      ],
    },
    strategy: [
      {
        title: "Google Ads for Purchase Intent",
        body:
          "Campaign work focuses on search demand tied to flower delivery, same-day NYC delivery, birthday flowers, best-selling flowers and seasonal purchasing. A supplied ad preview shows a same-day flower delivery ad with sitelinks for Same-Day Flower Delivery, Birthday Flowers, Same-Day Room Delivery and Best Selling Flowers.",
      },
      {
        title: "Technical and On-Page SEO",
        body:
          "The SEO scope covers Technical SEO, On-Page SEO, Topical Authority, Entity and Semantic SEO, Off-Page SEO, crawlable store architecture, metadata, collection naming, internal links, product-category relevance, page headings and clean intent alignment for users searching by occasion, product type and delivery need.",
      },
      {
        title: "Topical Authority and Entity SEO",
        body:
          "Content and site structure are planned around Black Petals as a flower delivery entity: NYC service relevance, floral product categories, occasions, delivery windows, local terminology and semantic relationships between bouquets, gifts, events, hospitals and urgent ordering.",
      },
      {
        title: "AEO and AI Overview Readiness",
        body:
          "The AEO layer supports Featured Snippets, Question-Based Content, Voice Search SEO, FAQ Optimization and AI Overview Optimization by turning common buyer questions into clear page copy and snippet-friendly answers covering same-day delivery, order timing, location coverage, product selection and urgent order behavior.",
      },
      {
        title: "GEO, AIO and LLM Visibility",
        body:
          "The GEO and AIO layer supports AI Citations, LLM Visibility, Brand Mentions, Entity Signals, AI Recommendations, AI Search Visibility, AI Content Optimization, AI Overview, AI Mode Optimization and AI Search Analytics. The supplied Shopify channel table includes ChatGPT and chatgpt.com rows, which are treated as observed attribution rows rather than proof of full AI-search attribution.",
      },
      {
        title: "SXO and Website Management",
        body:
          "SXO connects Search Intent, UX and Page Experience, CRO, Content Experience, Engagement and Retention so traffic has a clearer path from query to product to cart.",
      },
    ],
    execution: {
      title: "What Crea8iv Media Manages",
      body:
        "The engagement combines paid search management, SEO strategy, website management and evidence review. The work is designed to improve acquisition quality and store experience while keeping Black Petals positioned for NYC flower delivery demand.",
      points: [
        "Google Ads search campaign structure and ad asset refinement for high-intent NYC flower delivery queries.",
        "Landing-page and collection alignment for same-day delivery, birthday flowers, best sellers and seasonal flower demand.",
        "SEO improvements across Technical SEO, On-Page SEO, Topical Authority, Entity and Semantic SEO and Off-Page SEO visibility planning.",
        "AEO improvements for Featured Snippets, Question-Based Content, Voice Search SEO, FAQ Optimization and AI Overview Optimization.",
        "GEO and AIO work for AI Citations, LLM Visibility, Brand Mentions, Entity Signals, AI Recommendations, AI Content Optimization, AI Mode Optimization and AI Search Analytics review.",
        "SXO improvements across Search Intent, UX and Page Experience, CRO, Content Experience, Engagement and Retention.",
        "Website management for seasonal merchandising, mobile presentation, promotion messaging and performance review.",
      ],
    },
    deliverables: [
      "Google Ads management",
      "Search campaign and ad asset optimization",
      "Shopify website management",
      "Technical SEO",
      "On-Page SEO",
      "Topical authority planning",
      "Entity and semantic SEO",
      "Off-page SEO planning",
      "AEO: Featured Snippets, Question-Based Content, Voice Search SEO, FAQ Optimization and AI Overview Optimization",
      "GEO: AI Citations, LLM Visibility, Brand Mentions, Entity Signals and AI Recommendations",
      "AIO: AI Search Visibility, AI Content Optimization, AI Overview, AI Mode Optimization and AI Search Analytics",
      "SXO: Search Intent, UX and Page Experience, CRO, Content Experience, Engagement and Retention",
      "Seasonal merchandising support",
      "Analytics and performance reporting",
    ],
    outcomes: [
      "Shopify annual analytics screenshot shows US$190,193.54 total sales for Sep. 1, 2025 to Aug. 31, 2026, up 383% versus the comparison period shown in the screenshot.",
      "The same annual Shopify view shows 61,636 sessions, up 332%, and 1,375 completed conversions at a 2.23% conversion rate. The conversion rate is shown as down 12%, so the case study does not frame it as a conversion-rate win.",
      "A Shopify Growth view for the last 365 days shows US$148,858.87 in sales attributed to marketing out of US$202,983.88 total store sales, with Google Search shown as the largest visible channel card.",
      "Google Ads account view for Jan. 30, 2025 to Sep. 30, 2026 shows 695K impressions, 4.16K conversions, US$4.76 cost per conversion and US$19.8K cost in the selected account view.",
      "A supplied Google Ads ad preview shows an enabled and eligible same-day NYC flower delivery search ad with 36,377 impressions, 819 clicks and 2.25% CTR.",
      "Shopify channel evidence shows search, direct, email, social and AI-referral style rows appearing in the reporting interface, including Google Search, ChatGPT and chatgpt.com rows in different reports.",
      "Mobile and desktop website screenshots show a live seasonal storefront with same-day NYC delivery messaging, urgent order phone visibility, product navigation and cart/search access.",
    ],
    technology: [
      "Shopify",
      "Google Ads",
      "Google Search campaigns",
      "Google Ads auction insights",
      "Shopify analytics",
      "Shopify Growth reports",
      "Ecommerce SEO",
      "AEO",
      "GEO",
      "AIO",
      "SXO",
      "CRO review",
      "Website management",
      "Seasonal merchandising",
    ],
    evidenceTitle: "How to Read the Evidence",
    evidenceCopy:
      "The screenshots are treated as source-backed evidence from specific platform views. Google Ads conversions, Shopify store sales and Shopify channel attribution are different reporting systems, so the case study does not combine them into one unverified ROI claim. The numbers are useful because they show scale, intent, channel mix and store performance across the supplied views.",
    creativeExamples: [
      {
        src: "/img/case-studies/black-petals/black-petals-live-desktop.webp",
        alt: "Black Petals desktop storefront with Fall Flowers hero and same-day NYC delivery badge",
        title: "Desktop Storefront",
        body: "Seasonal flower merchandising, offer messaging, category navigation and a clear same-day NYC delivery promise support urgent ecommerce buying behavior.",
      },
      {
        src: "/img/case-studies/black-petals/black-petals-live-mobile.webp",
        alt: "Black Petals mobile storefront with urgent call bar and Fall Flowers hero",
        title: "Mobile Storefront",
        body: "The mobile interface makes urgent ordering, phone access, search, cart and seasonal shopping easier to reach from a small screen.",
      },
      {
        src: "/img/case-studies/black-petals/google-ads-search-ad.webp",
        alt: "Google Ads preview for same-day flower delivery NYC ad",
        title: "Search Ad Evidence",
        body: "The supplied ad preview shows same-day delivery messaging, NYC intent, a live destination path and supporting sitelinks for purchase-focused browsing.",
      },
    ],
    evidenceMetrics: [
      {
        label: "Annual Shopify Sales",
        value: "US$190.2K",
        note: "Shopify screenshot for Sep. 1, 2025 to Aug. 31, 2026 shows total sales of US$190,193.54, up 383% versus the comparison period shown.",
      },
      {
        label: "Annual Sessions",
        value: "61,636",
        note: "Shopify annual view shows sessions up 332%, with mobile and desktop both contributing visible traffic growth.",
      },
      {
        label: "Google Ads View",
        value: "695K",
        note: "Google Ads account view for Jan. 30, 2025 to Sep. 30, 2026 shows 695K impressions, 4.16K conversions and US$4.76 cost per conversion.",
      },
      {
        label: "Search Ad Clicks",
        value: "819",
        note: "The most-shown search ad card shows 36,377 impressions, 819 clicks and 2.25% CTR for a same-day NYC flower delivery ad.",
      },
    ],
    proofGallery: [
      {
        src: "/img/case-studies/black-petals/google-ads-search-ad.webp",
        alt: "Most-shown Google search ad for same-day flower delivery NYC",
        title: "Most-shown search ad",
        body: "Enabled, eligible search ad for same-day flower delivery NYC with 36,377 impressions, 819 clicks and 2.25% CTR in the supplied Google Ads card.",
      },
      {
        src: "/img/case-studies/black-petals/google-ads-auction-insights.webp",
        alt: "Google Ads auction insights with competitor impression share comparison",
        title: "Auction insight context",
        body: "The auction insights view places Black Petals beside competitors such as bouqs.com, ftd.com, DoorDash, UrbanStems and Avas Flowers. The exact competitor rates are not used as claims.",
      },
      {
        src: "/img/case-studies/black-petals/google-ads-overview-performance.webp",
        alt: "Google Ads overview with demographics, search auction insights and top searches",
        title: "Search demand and audience clues",
        body: "The Google Ads overview shows demographic and day-hour views plus search terms such as flowers near me, flower shop near me, florist near me, flower delivery NYC, birthday, roses, orchids and bouquet of flowers.",
      },
      {
        src: "/img/case-studies/black-petals/google-ads-device-campaigns.webp",
        alt: "Google Ads devices and campaign performance table",
        title: "Mobile-heavy paid behavior",
        body: "The devices card shows mobile phones carrying most visible cost, impressions and clicks. The campaign table shows several visible campaigns, including NYC Flower Delivery, Performance Max and sale campaigns.",
      },
      {
        src: "/img/case-studies/black-petals/google-ads-home-chart.webp",
        alt: "Google Ads home chart showing impressions, conversions, cost per conversion and cost",
        title: "Paid account scale",
        body: "The selected Google Ads account view shows 695K impressions, 4.16K conversions, US$4.76 cost per conversion and US$19.8K cost for Jan. 30, 2025 to Sep. 30, 2026.",
      },
      {
        src: "/img/case-studies/black-petals/shopify-sessions-funnel.webp",
        alt: "Shopify analytics showing sessions, conversion rate, checkout funnel, device sessions and location sessions",
        title: "Annual store sessions and funnel",
        body: "Shopify shows 61,636 sessions, 2,484 added-to-cart sessions, 2,421 reached-checkout sessions and 1,375 completed conversions for the annual comparison window.",
      },
      {
        src: "/img/case-studies/black-petals/shopify-growth-thirty-day.webp",
        alt: "Shopify Growth last 30 days marketing-attributed sales and channel cards",
        title: "Recent marketing attribution view",
        body: "The last-30-days Shopify Growth view shows US$17,914.86 in sales attributed to marketing out of US$26,113.89 total store sales, with visible Google Search, Direct, chatgpt.com and Omnisend cards.",
      },
      {
        src: "/img/case-studies/black-petals/shopify-growth-annual.webp",
        alt: "Shopify Growth last 365 days marketing-attributed sales and channel cards",
        title: "Last-365-days marketing view",
        body: "The last-365-days Shopify Growth view shows US$148,858.87 in marketing-attributed sales out of US$202,983.88 total store sales, plus channel cards for Google Search, Direct, chatgpt.com and Omnisend.",
      },
      {
        src: "/img/case-studies/black-petals/shopify-channel-attribution.webp",
        alt: "Shopify channel attribution table with Google Search, ChatGPT, Omnisend, Bing and other rows",
        title: "Short-window channel table",
        body: "The Sep. 15 to Sep. 19, 2026 Shopify channel table shows Google Search organic, Direct, Omnisend, Bing organic and ChatGPT rows. It is a short-window view and is not treated as complete attribution.",
      },
      {
        src: "/img/case-studies/black-petals/shopify-marketing-annual.webp",
        alt: "Shopify annual sales over time and sales breakdown for Black Petals",
        title: "Annual sales evidence",
        body: "The annual Shopify screenshot shows US$190,193.54 total sales, US$158,700.77 net sales, US$16,603.93 shipping charges and US$108.65 average order value for the displayed annual comparison window.",
      },
      {
        src: "/img/case-studies/black-petals/black-petals-live-desktop.webp",
        alt: "Black Petals live desktop website with Fall Flowers hero",
        title: "Desktop customer experience",
        body: "The live desktop storefront shows collection navigation, promotional bar, seasonal hero messaging and a product browsing section for flowers and exclusive gifts.",
      },
      {
        src: "/img/case-studies/black-petals/black-petals-live-mobile.webp",
        alt: "Black Petals live mobile website with Fall Flowers hero",
        title: "Mobile customer experience",
        body: "The mobile storefront shows an urgent order phone bar, compact navigation, cart access, delivery offer messaging and same-day NYC positioning above the product grid.",
      },
    ],
    serviceLinks: [
      { label: "Google Ads", href: "/google-ads/" },
      { label: "AI Search Optimization", href: "/ai-search-optimization/" },
      { label: "Website Development", href: "/website-development/" },
      { label: "Marketing Automation", href: "/marketing-automation/" },
      { label: "Content Creation", href: "/content-creation/" },
      { label: "Results", href: "/results/" },
    ],
    closingTitle: "Need an ecommerce growth system with evidence, not guesses?",
    closingCopy:
      "Crea8iv Media helps ecommerce brands connect paid acquisition, SEO, AI visibility, website management and conversion experience into a measurable operating system.",
    faq: [
      {
        question: "What services does Crea8iv Media provide for Black Petals?",
        answer:
          "Crea8iv Media supports Black Petals with Google Ads, SEO, website management, analytics review and search experience improvements. The stated SEO scope includes Technical SEO, On-Page SEO, Topical Authority, Entity and Semantic SEO and Off-Page SEO planning.",
      },
      {
        question: "Does this case study include AEO, GEO, AIO and SXO work?",
        answer:
          "Yes. The case study documents AEO for Featured Snippets, Question-Based Content, Voice Search SEO, FAQ Optimization and AI Overview Optimization; GEO for AI Citations, LLM Visibility, Brand Mentions, Entity Signals and AI Recommendations; AIO for AI Search Visibility, AI Content Optimization, AI Overview, AI Mode Optimization and AI Search Analytics; and SXO for Search Intent, UX and Page Experience, CRO, Content Experience, Engagement and Retention.",
      },
      {
        question: "Which market does Black Petals target?",
        answer:
          "Black Petals serves the United States market with special focus on New York City flower delivery demand, including same-day flower delivery and urgent floral gifting behavior.",
      },
      {
        question: "Are the performance numbers guaranteed outcomes?",
        answer:
          "No. The performance numbers are reported from supplied Google Ads and Shopify screenshots with their visible date ranges and contexts. They are not presented as guaranteed results for another business.",
      },
      {
        question: "Can Crea8iv Media manage similar ecommerce growth systems?",
        answer:
          "Yes. Crea8iv Media can support ecommerce brands with Google Ads, SEO, AI visibility, website management, analytics review and conversion-focused customer experience improvements.",
      },
    ],
  },
});

for (const [key, study] of Object.entries(premiumCaseStudies)) {
  if (key !== study.slug) {
    throw new Error(`Premium case study key "${key}" does not match slug "${study.slug}".`);
  }
}

export const premiumCaseStudySlugs = Object.keys(premiumCaseStudies);
