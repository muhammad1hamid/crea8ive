export const WHATSAPP_NUMBER = "923135147935";
export const WHATSAPP_MESSAGE =
  "Hi Crea8iv Media, I want to grow my business. Can you guide me?";

export const proofStats = [
  { value: "Rawalpindi", label: "Local team serving Twin Cities businesses" },
  { value: "7", label: "Growth channels connected into one system" },
  { value: "Weekly", label: "Optimization and reporting rhythm" },
  { value: "Free", label: "Growth audit before the first proposal" },
];

export const serviceGroups = [
  {
    name: "Paid Growth",
    services: [
      { title: "Meta Ads", href: "/meta-ads/", outcome: "WhatsApp inquiries, lead forms, booked calls" },
      { title: "Google Ads", href: "/google-ads/", outcome: "High-intent search traffic and tracked conversions" },
    ],
  },
  {
    name: "Local Visibility",
    services: [
      { title: "Google Business Profile", href: "/google-business-profile-growth/", outcome: "More calls from Google Maps and local search" },
      { title: "AI Search Optimization", href: "/ai-search-optimization/", outcome: "Clear entity signals for Google AI, ChatGPT, and answer engines" },
    ],
  },
  {
    name: "Conversion Assets",
    services: [
      { title: "Website Development", href: "/website-development/", outcome: "Fast pages that turn visitors into leads" },
      { title: "Marketing Automation", href: "/marketing-automation/", outcome: "Follow-up systems for missed leads, bookings, and reviews" },
    ],
  },
  {
    name: "Creative Engine",
    services: [
      { title: "Social Media Management", href: "/social-media-management/", outcome: "Consistent content, trust, and community touchpoints" },
      { title: "Content Creation", href: "/content-creation/", outcome: "Reels, posts, captions, and campaign-ready creative" },
      { title: "Branding & Creative", href: "/branding-and-creative/", outcome: "Visual identity, ad creative, and brand credibility" },
    ],
  },
];

export const caseStudies = [
  {
    title: "Clinic Growth System",
    slug: "healthcare-growth-system",
    industry: "Healthcare & Clinics",
    result: "Patient trust, booking paths, and local visibility",
    services: ["Website", "GBP", "Meta Ads", "Content"],
    image: "/assets/mirror/images.unsplash.com/photo-1629909613654-28e377c37b09-3776f433a183.jpg",
    summary:
      "A clinic-focused growth system built around trust signals, service education, Google Maps visibility, and appointment-ready CTAs.",
  },
  {
    title: "Salon WhatsApp Leads",
    slug: "salon-whatsapp-leads",
    industry: "Salons & Aesthetic Clinics",
    result: "Offer-led campaigns routed directly to WhatsApp",
    services: ["Meta Ads", "Creative", "WhatsApp Automation"],
    image: "/assets/mirror/images.unsplash.com/photo-1626785774573-4b799315345d-14c59de6dbec.jpg",
    summary:
      "A campaign model for beauty and aesthetics brands that turns seasonal offers, reels, and retargeting into chat-based bookings.",
  },
  {
    title: "Restaurant Local Demand",
    slug: "restaurant-local-demand",
    industry: "Restaurants & Cafes",
    result: "Google Maps, review, and content system for local discovery",
    services: ["GBP", "Content", "Reviews", "Meta Ads"],
    image: "/assets/mirror/images.unsplash.com/photo-1517248135467-4c7edcad34c4-33d10f35a76c.jpg",
    summary:
      "A local visibility engine for restaurants that combines Google profile hygiene, review prompts, food content, and geo-targeted offers.",
  },
  {
    title: "Architecture Authority",
    slug: "architecture-authority",
    industry: "Architecture & Interiors",
    result: "Portfolio-led authority across search and social",
    services: ["Branding", "Website", "Content", "Lead Gen"],
    image: "/assets/mirror/images.unsplash.com/photo-1505693416388-ac5ce068fe85-0c0bf1da95d7.jpg",
    summary:
      "A premium visual system for architects and interiors brands that makes projects, awards, and consultations easy to discover.",
  },
];

export const portfolioItems = [
  {
    title: "Healthcare Website Systems",
    type: "Websites",
    href: "/portfolio/websites/",
    image: "/assets/mirror/images.unsplash.com/photo-1588776814546-1ffcf47267a5-a4a6589932a5.jpg",
    detail: "Trust-first clinic pages with service education, booking paths, and local SEO foundations.",
  },
  {
    title: "Restaurant Creative Grids",
    type: "Graphics",
    href: "/portfolio/graphics/",
    image: "/assets/mirror/images.unsplash.com/photo-1517248135467-4c7edcad34c4-33d10f35a76c.jpg",
    detail: "Campaign-ready food visuals, menu pushes, seasonal offers, and social content systems.",
  },
  {
    title: "Reels & Short-Form Video",
    type: "Video",
    href: "/portfolio/reels/",
    image: "/assets/mirror/images.unsplash.com/photo-1611162616475-46b635cb6868-e6c231648f36.jpg",
    detail: "Short-form creative planned for attention, retargeting, and platform-native storytelling.",
  },
  {
    title: "Lead Generation Campaigns",
    type: "Campaigns",
    href: "/portfolio/campaigns/",
    image: "/assets/mirror/images.unsplash.com/photo-1460925895917-afdab827c52f-92ec1e923ff6.jpg",
    detail: "Meta Ads, Google Ads, WhatsApp flows, landing pages, and reporting tied together.",
  },
];

export const serviceEnhancements: Record<
  string,
  {
    eyebrow: string;
    headline: string;
    outcome: string;
    visualConcept: {
      title: string;
      scene: string;
      proofNote: string;
    };
    deliverables: string[];
    process: string[];
    metrics: { value: string; label: string }[];
    cta: string;
  }
> = {
  "meta-ads": {
    eyebrow: "Meta Ads Growth System",
    headline: "Facebook and Instagram campaigns built for WhatsApp inquiries, forms, and booked calls.",
    outcome: "We connect offer strategy, creatives, targeting, retargeting, tracking, and weekly optimization into one lead engine.",
    visualConcept: {
      title: "Ad dashboard to WhatsApp flow",
      scene: "A realistic performance dashboard connected to campaign creatives, retargeting audiences, and WhatsApp lead conversations.",
      proofNote: "Concept visuals explain the system. Real campaign proof should use verified screenshots and actual metrics only.",
    },
    deliverables: ["Audience and offer strategy", "Creative testing plan", "Pixel and conversion setup", "WhatsApp or lead-form funnel", "Weekly performance actions"],
    process: ["Audit", "Offer and funnel map", "Creative launch", "Retargeting", "Scale winners"],
    metrics: [
      { value: "Weekly", label: "Optimization cycle" },
      { value: "3", label: "Core audience layers" },
      { value: "24h", label: "Lead-response target" },
    ],
    cta: "Get a Meta Ads Audit",
  },
  "google-ads": {
    eyebrow: "Google Ads Search System",
    headline: "Capture buyers already searching for your service in Rawalpindi, Islamabad, and Pakistan.",
    outcome: "We build search intent maps, campaign structures, conversion tracking, and landing-page alignment so every click has a job.",
    visualConcept: {
      title: "Search intent to booked inquiry",
      scene: "High-intent search terms flowing into calls, forms, WhatsApp chats, and a simple conversion report.",
      proofNote: "Keep keyword and cost examples clearly educational unless they come from a verified account export.",
    },
    deliverables: ["Keyword and competitor research", "Search campaign build", "Negative keyword plan", "Call and form tracking", "Monthly optimization report"],
    process: ["Audit", "Intent map", "Campaign build", "Conversion QA", "Optimize"],
    metrics: [
      { value: "Search", label: "High-intent traffic" },
      { value: "Tracked", label: "Calls, forms, WhatsApp" },
      { value: "Monthly", label: "Search-term cleanup" },
    ],
    cta: "Check Google Ads Fit",
  },
  "google-business-profile-growth": {
    eyebrow: "Google Maps Growth System",
    headline: "Turn your Google Business Profile into a steady local discovery and call channel.",
    outcome: "We improve profile completeness, services, photos, reviews, posts, local content, and conversion paths.",
    visualConcept: {
      title: "Local map visibility engine",
      scene: "A local business appearing across Maps, reviews, photos, calls, directions, and nearby-service discovery.",
      proofNote: "Use conceptual map visuals for education and real GBP screenshots only when permission and data are verified.",
    },
    deliverables: ["GBP audit", "Service/category optimization", "Review growth system", "Photo and post calendar", "Local ranking checklist"],
    process: ["Audit", "Clean up", "Optimize", "Review flow", "Report"],
    metrics: [
      { value: "Maps", label: "Local discovery focus" },
      { value: "Reviews", label: "Trust-building engine" },
      { value: "Monthly", label: "Posts and improvements" },
    ],
    cta: "Get a Google Maps Audit",
  },
  "website-development": {
    eyebrow: "Conversion Website System",
    headline: "Fast, SEO-ready websites that help visitors trust you and contact you.",
    outcome: "We build websites around speed, mobile UX, trust signals, service clarity, WhatsApp/contact CTAs, and tracking.",
    visualConcept: {
      title: "Before and after conversion path",
      scene: "An outdated page transforming into a fast mobile-first website with trust blocks, CTAs, forms, and analytics.",
      proofNote: "Generated website concepts should never replace real portfolio screenshots or measurable launch QA.",
    },
    deliverables: ["UX and page strategy", "Responsive development", "Lead capture forms", "SEO foundations", "Analytics and pixel setup"],
    process: ["Discovery", "Wireframe", "Design", "Build", "Launch QA"],
    metrics: [
      { value: "Mobile", label: "First buyer journey" },
      { value: "SEO", label: "Technical foundation" },
      { value: "Forms", label: "Lead capture paths" },
    ],
    cta: "Request Website Audit",
  },
  "social-media-management": {
    eyebrow: "Social Trust System",
    headline: "Consistent social media that builds trust before the buyer talks to you.",
    outcome: "We plan, create, schedule, engage, and report so your brand looks active, credible, and ready for inquiries.",
    visualConcept: {
      title: "Monthly content operating system",
      scene: "A content calendar, reels, stories, captions, and engagement signals organized around one brand message.",
      proofNote: "Use real published posts for proof galleries and conceptual visuals for process explanation.",
    },
    deliverables: ["Monthly content calendar", "Posts, reels, and stories", "Caption and hashtag system", "Community management", "Monthly reporting"],
    process: ["Brand audit", "Calendar", "Production", "Publishing", "Report"],
    metrics: [
      { value: "30+", label: "Monthly content touchpoints" },
      { value: "Reels", label: "Attention format" },
      { value: "Reports", label: "Clarity on what works" },
    ],
    cta: "Plan My Monthly Content",
  },
  "content-creation": {
    eyebrow: "Content Production System",
    headline: "Reels, posts, scripts, and campaign creative built from one organized content engine.",
    outcome: "We turn shoots, offers, services, and proof into reusable content for organic social, ads, and landing pages.",
    visualConcept: {
      title: "One shoot, many assets",
      scene: "A realistic production setup turning one shoot into reels, ad variations, posts, stories, and website visuals.",
      proofNote: "Conceptual production images can set the mood, but portfolio assets should show real delivered creative.",
    },
    deliverables: ["Shoot planning", "Reels and short-form edits", "Static post designs", "Ad creative variants", "Repurposing calendar"],
    process: ["Brief", "Script", "Shoot", "Edit", "Repurpose"],
    metrics: [
      { value: "1 shoot", label: "Multiple content assets" },
      { value: "Ads", label: "Creative-ready outputs" },
      { value: "Social", label: "Platform-specific formats" },
    ],
    cta: "Book a Content Shoot",
  },
  "branding-and-creative": {
    eyebrow: "Brand Identity System",
    headline: "Visual identity and creative that make your business look credible before the first call.",
    outcome: "We create brand systems, social templates, ad creatives, and presentation assets that keep your message consistent.",
    visualConcept: {
      title: "Premium brand kit workspace",
      scene: "Logo system, color palette, typography, ad layouts, and social templates arranged like a premium design review.",
      proofNote: "Do not imply a client identity was created unless the work is real and approved for portfolio use.",
    },
    deliverables: ["Logo and identity direction", "Brand kit", "Social templates", "Ad creatives", "Presentation and print assets"],
    process: ["Discovery", "Concept", "Design", "Refine", "Handover"],
    metrics: [
      { value: "Brand kit", label: "Consistency foundation" },
      { value: "Ads", label: "Campaign-ready visuals" },
      { value: "Social", label: "Reusable templates" },
    ],
    cta: "Start a Brand Project",
  },
  "marketing-automation": {
    eyebrow: "Lead Automation System",
    headline: "Follow-up systems that stop good leads from going cold after the first message.",
    outcome: "We connect WhatsApp, CRM stages, reminders, booking confirmations, review requests, and reporting into a practical lead-recovery workflow.",
    visualConcept: {
      title: "WhatsApp to CRM recovery flow",
      scene: "New inquiries moving from WhatsApp into pipeline stages, reminders, appointment confirmations, and review prompts.",
      proofNote: "Automation visuals should explain the flow without exposing private customer messages or CRM data.",
    },
    deliverables: ["WhatsApp reply templates", "CRM pipeline stages", "Missed-lead recovery prompts", "Appointment reminders", "Review request sequence"],
    process: ["Map", "Write", "Automate", "Test", "Report"],
    metrics: [
      { value: "Fast", label: "Response-time focus" },
      { value: "CRM", label: "Lead stage clarity" },
      { value: "Reviews", label: "Follow-up opportunity" },
    ],
    cta: "Automate My Leads",
  },
  "ai-search-optimization": {
    eyebrow: "AI Visibility System",
    headline: "Make your business easier for search engines and AI answer systems to understand.",
    outcome: "We improve entity clarity, service facts, schema, FAQs, citations, local profiles, and answer-ready content without disturbing your existing SEO foundation.",
    visualConcept: {
      title: "Entity graph and answer readiness",
      scene: "Business facts, services, reviews, FAQs, schema, and citations connecting into Google AI, ChatGPT, Gemini, and Perplexity-style answer surfaces.",
      proofNote: "Use conceptual AI-search visuals for education; do not claim live AI citations unless they are verified.",
    },
    deliverables: ["Entity and profile audit", "Service and FAQ structure", "Schema recommendations", "Answer-engine content plan", "Citation consistency checklist"],
    process: ["Audit", "Structure", "Schema", "Content", "Validate"],
    metrics: [
      { value: "Entity", label: "Brand clarity" },
      { value: "Schema", label: "Machine-readable facts" },
      { value: "FAQs", label: "Answer-ready content" },
    ],
    cta: "Check My AI Visibility",
  },
};
