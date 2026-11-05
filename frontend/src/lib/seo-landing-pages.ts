import { PAGE_METADATA } from "@/lib/seo-metadata";

export type SeoLandingPage = {
  family:
    | "website-development"
    | "software-development"
    | "google-business-profile-growth"
    | "social-media-management"
    | "meta-ads"
    | "google-ads"
    | "branding-and-creative"
    | "content-creation"
    | "consultation";
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  quickAnswer: string;
  serviceName: string;
  audience: string;
  intent: string;
  priceFrom: string;
  timeline: string;
  proofSlugs: string[];
  sections: Array<{ title: string; body: string; items: string[] }>;
  faqs: Array<{ question: string; answer: string }>;
};

const websiteBaseFaqs = [
  {
    question: "Can Crea8iv Media connect the website with WhatsApp leads?",
    answer: "Yes. Click-to-WhatsApp, call buttons, proposal forms and CRM-friendly enquiry capture can be planned into the website so traffic has a simple route into a sales conversation.",
  },
  {
    question: "Will these pages be SEO and AI-search ready?",
    answer: "Yes. Each build can include clear headings, indexable content, FAQ blocks, schema markup, internal links, fast loading, descriptive images and answer-ready sections for Google and AI search systems.",
  },
];

const softwareBaseFaqs = [
  {
    question: "Who owns the code after the project?",
    answer: "After final payment, the client owns the approved source code and project assets defined in the proposal. Crea8iv Media can also provide ongoing support and iteration after launch.",
  },
  {
    question: "Can Crea8iv Media build an MVP first?",
    answer: "Yes. For larger software ideas, Crea8iv Media usually recommends a focused MVP first so the core workflow can be tested before expanding into a bigger platform.",
  },
];

const growthServiceBaseFaqs = [
  {
    question: "Does Crea8iv Media work with businesses across Pakistan?",
    answer: "Yes. Crea8iv Media is based in Bahria Town, Rawalpindi and works with businesses in Rawalpindi, Islamabad and across Pakistan depending on the service scope.",
  },
  {
    question: "How should a business choose the first service to start with?",
    answer: "The first service should be chosen after checking the biggest bottleneck: visibility, trust, website conversion, content quality, ad performance, lead follow-up or brand clarity.",
  },
];

type LocalServiceFamily = Exclude<SeoLandingPage["family"], "website-development" | "software-development">;

type LocalServiceConfig = {
  family: LocalServiceFamily;
  titleBase: string;
  eyebrow: string;
  h1Phrase: string;
  audience: string;
  audienceNiches: string;
  metaDescriptor: string;
  intentAction: string;
  priceFrom: string;
  timeline: string;
  proofSlugs: string[];
  systemItems: string[];
  trustItems: string[];
  conversionItems: string[];
};

const cityContexts = [
  {
    slug: "rawalpindi",
    city: "Rawalpindi",
    localContext:
      "is based in Bahria Town, Rawalpindi and understands how local buyers compare providers through Google, social profiles, websites and WhatsApp",
  },
  {
    slug: "islamabad",
    city: "Islamabad",
    localContext:
      "serves Islamabad businesses that need a more premium digital presence, clearer positioning and stronger enquiry paths across search, social and WhatsApp",
  },
];

const localServiceConfigs: LocalServiceConfig[] = [
  {
    family: "google-business-profile-growth",
    titleBase: "Google Business Profile Growth",
    eyebrow: "local presence",
    h1Phrase: "Google Business Profile growth",
    audience: "restaurants, clinics, salons, dentists, shops and local service providers",
    audienceNiches: "restaurants, clinics, salons, dentists, shops and service businesses",
    metaDescriptor: "Google Maps visibility, review trust, local SEO and listing improvement",
    intentAction: "improve local search visibility, profile trust and enquiry quality",
    priceFrom: "PKR 20,000/month",
    timeline: "Most local profile improvement cycles begin with a 2 to 4 week cleanup and continue monthly.",
    proofSlugs: ["co3-premium-rawalpindi-drinks", "curtain-hive-3d-wallpaper", "home-studio-interior-design"],
    systemItems: ["Category and service cleanup", "Photo and post direction", "Review response guidance", "Website and GBP alignment"],
    trustItems: ["Business information consistency", "Location and service clarity", "Review trust", "Recent profile activity"],
    conversionItems: ["Call actions", "Directions", "Website clicks", "WhatsApp or booking path"],
  },
  {
    family: "social-media-management",
    titleBase: "Social Media Management",
    eyebrow: "social engine",
    h1Phrase: "Social media management",
    audience: "restaurants, clinics, ecommerce, education, real estate, interiors and service brands",
    audienceNiches: "local service brands, restaurants, clinics, ecommerce teams, education brands and interior businesses",
    metaDescriptor: "content planning, feed styling, posting strategy and audience engagement",
    intentAction: "build a consistent social presence that supports trust, recall and campaigns",
    priceFrom: "PKR 10,000/platform",
    timeline: "Most accounts begin with a monthly calendar, content themes and weekly publishing rhythm.",
    proofSlugs: ["co3-premium-rawalpindi-drinks", "home-studio-interior-design", "hassan-nawaz-architects"],
    systemItems: ["Content pillars", "Monthly calendar", "Caption direction", "Profile improvement"],
    trustItems: ["Feed consistency", "Pinned content ideas", "Portfolio proof", "Offer clarity"],
    conversionItems: ["WhatsApp links", "Campaign posts", "Retargeting support", "Website click path"],
  },
  {
    family: "meta-ads",
    titleBase: "Meta Ads Management",
    eyebrow: "paid reach",
    h1Phrase: "Meta Ads management",
    audience: "brands that need Facebook, Instagram, Messenger or WhatsApp lead generation",
    audienceNiches: "clinics, restaurants, real estate, ecommerce, education, interiors and service businesses",
    metaDescriptor: "Facebook Ads, Instagram Ads, creative testing, retargeting and WhatsApp leads",
    intentAction: "run Facebook and Instagram campaigns with stronger creative and lead follow-up",
    priceFrom: "PKR 25,000/month excluding ad spend",
    timeline: "Most campaigns need 2 to 4 weeks of testing before stronger scaling decisions.",
    proofSlugs: ["co3-premium-rawalpindi-drinks", "curtain-hive-3d-wallpaper", "patientflow-clinic-retention-software"],
    systemItems: ["Campaign objective", "Audience testing", "Creative hooks", "Retargeting setup"],
    trustItems: ["Profile quality", "Landing proof", "Offer clarity", "Creative relevance"],
    conversionItems: ["Lead forms", "WhatsApp flow", "Follow-up routine", "Weekly optimization"],
  },
  {
    family: "google-ads",
    titleBase: "Google Ads Management",
    eyebrow: "search capture",
    h1Phrase: "Google Ads management",
    audience: "businesses with active search demand and clear buyer-intent keywords",
    audienceNiches: "clinics, consultants, restaurants, property teams, ecommerce stores and local providers",
    metaDescriptor: "high-intent search campaigns, conversion tracking and landing-page alignment",
    intentAction: "capture people searching for the exact service or product category",
    priceFrom: "PKR 25,000/month excluding ad spend",
    timeline: "Most search campaigns need 2 to 4 weeks for setup, data collection and first optimization.",
    proofSlugs: ["patientflow-clinic-retention-software", "curtain-hive-3d-wallpaper", "home-studio-interior-design"],
    systemItems: ["Keyword grouping", "Negative keywords", "Ad copy", "Conversion actions"],
    trustItems: ["Relevant landing pages", "Proof and FAQs", "Offer clarity", "Fast mobile pages"],
    conversionItems: ["Calls", "WhatsApp clicks", "Forms", "Booking or quote actions"],
  },
  {
    family: "branding-and-creative",
    titleBase: "Branding and Creative Design",
    eyebrow: "brand identity",
    h1Phrase: "Branding and creative design",
    audience: "new businesses, rebrands, restaurants, clinics, ecommerce and premium service brands",
    audienceNiches: "new businesses, rebrands, restaurants, clinics, ecommerce teams and premium service brands",
    metaDescriptor: "logo language, visual identity systems, campaign concepts and premium creative direction",
    intentAction: "create a stronger identity that works across website, ads, social and proposals",
    priceFrom: "PKR 50,000",
    timeline: "Focused identity systems usually take 2 to 5 weeks depending on scope and approvals.",
    proofSlugs: ["home-studio-interior-design", "hassan-nawaz-architects", "co3-premium-rawalpindi-drinks"],
    systemItems: ["Logo direction", "Color palette", "Typography direction", "Visual rules"],
    trustItems: ["Premium presentation", "Consistent touchpoints", "Market fit", "Mobile logo behavior"],
    conversionItems: ["Website identity", "Social templates", "Ad creative", "Proposal-ready visuals"],
  },
  {
    family: "content-creation",
    titleBase: "Content Creation",
    eyebrow: "creative assets",
    h1Phrase: "Content creation",
    audience: "brands that need organic posts, reels, launch assets, paid creative or visual proof",
    audienceNiches: "restaurants, clinics, ecommerce brands, education teams, real estate, interiors and service businesses",
    metaDescriptor: "reels, social posts, ad creatives, motion snippets and campaign assets",
    intentAction: "create stronger content assets for social, ads, launches and conversion support",
    priceFrom: "PKR 30,000/month",
    timeline: "Monthly creative cycles begin after content themes, offers and visual direction are approved.",
    proofSlugs: ["co3-premium-rawalpindi-drinks", "home-studio-interior-design", "curtain-hive-3d-wallpaper"],
    systemItems: ["Content pillars", "Creative direction", "Hook testing", "Caption support"],
    trustItems: ["Visual consistency", "Offer proof", "Platform fit", "Brand storytelling"],
    conversionItems: ["Reels", "Carousels", "Ad variants", "Launch and retargeting assets"],
  },
  {
    family: "consultation",
    titleBase: "Digital Marketing Consultation",
    eyebrow: "strategy layer",
    h1Phrase: "Digital marketing consultation",
    audience: "business owners, founders and marketing teams choosing their next growth move",
    audienceNiches: "business owners, founders, local brands and marketing teams",
    metaDescriptor: "growth diagnosis, channel prioritization, website strategy, content planning and AI visibility",
    intentAction: "diagnose the real growth bottleneck and decide what to fix first",
    priceFrom: "Scoped after discovery",
    timeline: "A focused audit can begin quickly after business goals, assets and current channels are shared.",
    proofSlugs: ["crea8iv-media-growth-system", "patientflow-clinic-retention-software", "home-studio-interior-design"],
    systemItems: ["Website review", "Channel audit", "Offer clarity", "AI visibility direction"],
    trustItems: ["Priority map", "Budget direction", "Measurement plan", "Execution sequence"],
    conversionItems: ["Page updates", "Campaign direction", "Content plan", "Automation recommendations"],
  },
];

const localServiceCityLandingPages: SeoLandingPage[] = localServiceConfigs.flatMap((service) =>
  cityContexts.map((city) => ({
    family: service.family,
    slug: city.slug,
    title: `${service.titleBase} in ${city.city}`,
    metaTitle: `${service.titleBase} ${city.city} | Crea8iv Media`,
    metaDescription: `${service.titleBase} in ${city.city} by Crea8iv Media for ${service.metaDescriptor}.`,
    eyebrow: `${city.city} ${service.eyebrow}`,
    h1: `${service.h1Phrase} in ${city.city} for businesses that need clearer growth.`,
    quickAnswer: `Crea8iv Media provides ${service.titleBase.toLowerCase()} in ${city.city} for ${service.audienceNiches}. The agency ${city.localContext}, then connects ${service.metaDescriptor} with website, WhatsApp, proof and tracking so local buyers have a clearer path from discovery to enquiry.`,
    serviceName: `${service.titleBase} in ${city.city}`,
    audience: `${city.city} ${service.audience}`,
    intent: `Find a ${city.city} growth partner to ${service.intentAction}.`,
    priceFrom: service.priceFrom,
    timeline: service.timeline,
    proofSlugs: service.proofSlugs,
    sections: [
      {
        title: "Local intent",
        body: `${city.city} buyers compare providers through search results, social profiles, reviews, website quality and response speed before they contact a business.`,
        items: ["City-aware positioning", "Local proof", "Service clarity", "Fast contact path"],
      },
      {
        title: "Service system",
        body: `${service.titleBase} should be handled as a measurable system, not a disconnected task.`,
        items: service.systemItems,
      },
      {
        title: "Trust to enquiry",
        body: "The local buyer journey should reduce doubt and make the next step easy on mobile.",
        items: [...service.trustItems.slice(0, 2), ...service.conversionItems.slice(0, 2)],
      },
    ],
    faqs: [
      {
        question: `Who provides ${service.titleBase.toLowerCase()} in ${city.city}?`,
        answer: `Crea8iv Media provides ${service.titleBase.toLowerCase()} in ${city.city} for ${service.audienceNiches}, with service planning connected to trust, content, website, tracking and enquiry flow.`,
      },
      {
        question: `Can ${service.titleBase.toLowerCase()} help ${city.city} businesses get better leads?`,
        answer: `Yes. It can help when ${service.metaDescriptor} are aligned with a clear offer, local proof, website journey and fast WhatsApp, call or form follow-up.`,
      },
      ...growthServiceBaseFaqs,
    ],
  })),
);

export const seoLandingPages: SeoLandingPage[] = [
  ...localServiceCityLandingPages,
  {
    family: "google-business-profile-growth",
    slug: "pakistan",
    title: "Google Business Profile Growth in Pakistan",
    metaTitle: "Google Business Profile Growth Pakistan | Crea8iv Media",
    metaDescription: "Improve Google Business Profile visibility in Pakistan with Crea8iv Media for Maps trust, reviews, listing content, local SEO and WhatsApp-ready enquiries.",
    eyebrow: "Local presence",
    h1: "Google Business Profile growth in Pakistan for local businesses that need more trust.",
    quickAnswer: "Crea8iv Media provides Google Business Profile growth in Pakistan for restaurants, clinics, salons, dentists, shops and local service providers that need stronger Google Maps visibility, improved listing content, review trust, local keyword alignment and clearer call, direction or WhatsApp enquiry paths.",
    serviceName: "Google Business Profile Growth in Pakistan",
    audience: "Local businesses that depend on calls, directions, reviews and map-pack visibility",
    intent: "Improve local discovery and trust before buyers call, visit or message.",
    priceFrom: "PKR 20,000/month",
    timeline: "Most profile improvement cycles begin with a 2 to 4 week cleanup and continue monthly.",
    proofSlugs: ["co3-premium-rawalpindi-drinks", "curtain-hive-3d-wallpaper", "home-studio-interior-design"],
    sections: [
      { title: "Profile foundation", body: "The profile should clearly explain what the business offers, where it serves customers and how people can act.", items: ["Primary and secondary categories", "Service and product sections", "Business description", "Call, direction and website actions"] },
      { title: "Trust signals", body: "Local buyers compare photos, reviews, recency and business information before contacting.", items: ["Photo direction", "Review response guidance", "Profile posts", "Local proof and website links"] },
      { title: "Local SEO support", body: "The profile becomes stronger when it is connected to location-aware website pages and consistent business information.", items: ["NAP consistency", "City and service terms", "GBP-to-website alignment", "Monthly visibility checks"] },
    ],
    faqs: [
      { question: "Who provides Google Business Profile optimization in Pakistan?", answer: "Crea8iv Media provides Google Business Profile optimization and local SEO support for Pakistani businesses that need stronger Maps visibility, review trust and local enquiry paths." },
      { question: "Can Google Business Profile growth help with local leads?", answer: "Yes. It can help when the profile, reviews, photos, service content, location signals and website enquiry path are aligned around real local buyer intent." },
      ...growthServiceBaseFaqs,
    ],
  },
  {
    family: "social-media-management",
    slug: "pakistan",
    title: "Social Media Management in Pakistan",
    metaTitle: "Social Media Management Pakistan | Crea8iv Media",
    metaDescription: "Social media management in Pakistan by Crea8iv Media for content planning, feed styling, posting strategy, engagement and campaign-ready brand presence.",
    eyebrow: "Social engine",
    h1: "Social media management in Pakistan for brands that need consistent trust.",
    quickAnswer: "Crea8iv Media provides social media management in Pakistan for businesses that need content planning, posting strategy, feed styling, audience engagement and platform-wise brand positioning. The goal is to make social profiles support trust, recall, paid campaigns, local visibility and WhatsApp-ready enquiries.",
    serviceName: "Social Media Management in Pakistan",
    audience: "Restaurants, clinics, ecommerce, education, real estate, interiors and service businesses",
    intent: "Build a consistent social presence that supports brand trust and campaign readiness.",
    priceFrom: "PKR 10,000/platform",
    timeline: "Most accounts begin with a monthly content calendar and weekly publishing rhythm.",
    proofSlugs: ["co3-premium-rawalpindi-drinks", "home-studio-interior-design", "hassan-nawaz-architects"],
    sections: [
      { title: "Content plan", body: "A useful social system starts with themes, offers, audience questions and proof, not only design files.", items: ["Monthly content calendar", "Content pillars", "Caption direction", "Offer and proof mapping"] },
      { title: "Profile trust", body: "A profile should make the business easy to understand, verify and contact.", items: ["Bio and highlight direction", "Feed styling", "Pinned content ideas", "WhatsApp or website links"] },
      { title: "Campaign support", body: "Organic content should make paid campaigns easier to trust when users check the profile.", items: ["Ad-ready posts", "Retargeting proof", "Launch content", "Engagement routines"] },
    ],
    faqs: [
      { question: "Who provides social media management in Pakistan?", answer: "Crea8iv Media provides social media management in Pakistan with strategy, content planning, posting, feed styling and platform-wise brand positioning." },
      { question: "Is social media management useful before running ads?", answer: "Yes. A stronger profile can improve trust when people click from Meta Ads, Google, referrals or WhatsApp before deciding to enquire." },
      ...growthServiceBaseFaqs,
    ],
  },
  {
    family: "meta-ads",
    slug: "pakistan",
    title: "Meta Ads Management in Pakistan",
    metaTitle: "Meta Ads Management Pakistan | Crea8iv Media",
    metaDescription: "Meta Ads management in Pakistan by Crea8iv Media for Facebook, Instagram, WhatsApp leads, audience testing, creative hooks and retargeting.",
    eyebrow: "Paid reach",
    h1: "Meta Ads management in Pakistan for campaigns that need qualified enquiries.",
    quickAnswer: "Crea8iv Media provides Meta Ads management in Pakistan for businesses that want Facebook and Instagram campaigns built around conversion goals, creative hooks, audience testing, retargeting and WhatsApp-ready lead capture. Campaigns are planned around offer clarity, creative quality, landing-page alignment and lead follow-up.",
    serviceName: "Meta Ads Management in Pakistan",
    audience: "Brands that need Facebook, Instagram, Messenger or WhatsApp lead generation",
    intent: "Use paid social to create demand, retarget buyers and generate qualified enquiries.",
    priceFrom: "PKR 25,000/month excluding ad spend",
    timeline: "Most campaigns need 2 to 4 weeks of testing before stronger scaling decisions.",
    proofSlugs: ["co3-premium-rawalpindi-drinks", "curtain-hive-3d-wallpaper", "patientflow-clinic-retention-software"],
    sections: [
      { title: "Offer and hook", body: "Meta performance depends heavily on the reason people should stop, care and click.", items: ["Campaign objective", "Creative angles", "Copy hooks", "WhatsApp or form path"] },
      { title: "Audience testing", body: "Different audiences and placements need structured testing before budget is scaled.", items: ["Cold audiences", "Retargeting", "Creative variants", "Placement review"] },
      { title: "Lead handling", body: "Campaign quality drops when enquiries are not answered quickly or tracked properly.", items: ["WhatsApp follow-up", "Lead source tracking", "Landing page review", "Weekly optimization"] },
    ],
    faqs: [
      { question: "Who manages Meta Ads in Pakistan?", answer: "Crea8iv Media manages Meta Ads in Pakistan for Facebook, Instagram, Messenger and WhatsApp lead campaigns." },
      { question: "Does Meta Ads management include ad spend?", answer: "No. Meta Ads management starts from PKR 25,000 per month and ad spend is separate." },
      ...growthServiceBaseFaqs,
    ],
  },
  {
    family: "google-ads",
    slug: "pakistan",
    title: "Google Ads Management in Pakistan",
    metaTitle: "Google Ads Management Pakistan | Crea8iv Media",
    metaDescription: "Google Ads management in Pakistan by Crea8iv Media for high-intent search campaigns, conversion tracking, landing pages and lead quality.",
    eyebrow: "Search capture",
    h1: "Google Ads management in Pakistan for high-intent buyer searches.",
    quickAnswer: "Crea8iv Media provides Google Ads management in Pakistan for businesses that want to capture people already searching for a service, product, clinic, restaurant, property, consultant or local provider. The work focuses on search intent, conversion tracking, landing-page alignment, call and WhatsApp actions and lead quality.",
    serviceName: "Google Ads Management in Pakistan",
    audience: "Businesses with active search demand and clear buyer-intent keywords",
    intent: "Capture high-intent traffic at the moment buyers search for a solution.",
    priceFrom: "PKR 25,000/month excluding ad spend",
    timeline: "Most search campaigns need 2 to 4 weeks for setup, data collection and first optimization.",
    proofSlugs: ["patientflow-clinic-retention-software", "curtain-hive-3d-wallpaper", "home-studio-interior-design"],
    sections: [
      { title: "Search intent", body: "A profitable campaign separates serious buyers from broad, research or low-quality traffic.", items: ["Keyword grouping", "Negative keywords", "Ad copy alignment", "Location targeting"] },
      { title: "Conversion tracking", body: "Calls, WhatsApp clicks, forms and bookings should be measurable before judging performance.", items: ["Conversion actions", "Landing page events", "Source tracking", "Weekly reporting"] },
      { title: "Landing alignment", body: "The page after the click should answer the same promise made in the ad.", items: ["Service-specific landing pages", "Proof and FAQs", "Mobile CTA flow", "Speed and clarity"] },
    ],
    faqs: [
      { question: "Who provides Google Ads management in Pakistan?", answer: "Crea8iv Media provides Google Ads management in Pakistan with search-intent planning, conversion tracking, landing-page alignment and lead-quality review." },
      { question: "When should a business choose Google Ads?", answer: "Google Ads is usually useful when people already search for the exact service or product category and the business has a clear offer and follow-up path." },
      ...growthServiceBaseFaqs,
    ],
  },
  {
    family: "branding-and-creative",
    slug: "pakistan",
    title: "Branding and Creative Design in Pakistan",
    metaTitle: "Branding and Creative Design Pakistan | Crea8iv Media",
    metaDescription: "Branding and creative design in Pakistan by Crea8iv Media for logos, identity systems, campaign concepts, graphics and premium visual direction.",
    eyebrow: "Brand identity",
    h1: "Branding and creative design in Pakistan for businesses that need a stronger first impression.",
    quickAnswer: "Crea8iv Media provides branding and creative design in Pakistan for businesses that need logo language, visual identity systems, campaign concepts, graphics, color direction and premium brand presentation. The agency connects brand identity with websites, social media, ads, proposals and customer touchpoints.",
    serviceName: "Branding and Creative Design in Pakistan",
    audience: "New businesses, rebrands, restaurants, clinics, ecommerce and premium service brands",
    intent: "Create or improve a brand identity that feels consistent across digital touchpoints.",
    priceFrom: "PKR 50,000",
    timeline: "Focused identity systems usually take 2 to 5 weeks depending on scope and approvals.",
    proofSlugs: ["home-studio-interior-design", "hassan-nawaz-architects", "co3-premium-rawalpindi-drinks"],
    sections: [
      { title: "Identity direction", body: "Branding should define how the business looks and feels before campaigns and pages multiply.", items: ["Logo direction", "Color palette", "Typography direction", "Visual mood"] },
      { title: "System usage", body: "A brand becomes useful when it works in real contexts, not only in a presentation.", items: ["Website UI", "Social templates", "Ad creative", "Proposal assets"] },
      { title: "Trust fit", body: "Different niches need different visual signals for credibility and memorability.", items: ["Market positioning", "Competitor review", "Premium presentation", "Mobile logo behavior"] },
    ],
    faqs: [
      { question: "Who provides branding and creative design in Pakistan?", answer: "Crea8iv Media provides branding and creative design in Pakistan for logos, identity systems, campaign concepts, visual systems and premium digital presentation." },
      { question: "Can branding improve website and ad performance?", answer: "Yes. A consistent brand identity can improve trust across websites, ads, social profiles and enquiry touchpoints." },
      ...growthServiceBaseFaqs,
    ],
  },
  {
    family: "content-creation",
    slug: "pakistan",
    title: "Content Creation in Pakistan",
    metaTitle: "Content Creation Pakistan | Crea8iv Media",
    metaDescription: "Content creation in Pakistan by Crea8iv Media for reels, social posts, ad creatives, motion snippets, campaign assets and brand storytelling.",
    eyebrow: "Creative assets",
    h1: "Content creation in Pakistan for brands that need better social and ad assets.",
    quickAnswer: "Crea8iv Media provides content creation in Pakistan for businesses that need reels, social posts, visual content, motion snippets, ad creatives, copywriting support and social media storytelling. The work is planned around real offers, buyer doubts, platform behavior and campaign goals.",
    serviceName: "Content Creation in Pakistan",
    audience: "Brands that need organic posts, reels, launch assets, paid creative or visual proof",
    intent: "Create better content assets for social media, ads, launches and conversion support.",
    priceFrom: "PKR 30,000/month",
    timeline: "Monthly creative cycles usually begin after content themes, offers and visual direction are approved.",
    proofSlugs: ["co3-premium-rawalpindi-drinks", "home-studio-interior-design", "curtain-hive-3d-wallpaper"],
    sections: [
      { title: "Creative direction", body: "Content should have a clear role in awareness, trust, proof, retargeting or conversion.", items: ["Content pillars", "Visual direction", "Offer mapping", "Caption support"] },
      { title: "Platform formats", body: "Different platforms reward different content shapes and pacing.", items: ["Reels and short-form", "Carousel posts", "Story assets", "Ad creative variants"] },
      { title: "Campaign readiness", body: "Assets should be usable across organic social, Meta Ads, websites and retargeting.", items: ["Hook testing", "Proof content", "Launch graphics", "Performance review"] },
    ],
    faqs: [
      { question: "Who provides content creation in Pakistan?", answer: "Crea8iv Media provides content creation in Pakistan for reels, posts, ad creatives, campaign assets, copywriting support and brand storytelling." },
      { question: "Is content creation different from social media management?", answer: "Yes. Content creation produces the assets and messaging, while social media management plans publishing, profile rhythm, engagement and platform execution." },
      ...growthServiceBaseFaqs,
    ],
  },
  {
    family: "consultation",
    slug: "pakistan",
    title: "Digital Marketing Consultation in Pakistan",
    metaTitle: "Digital Marketing Consultation Pakistan | Crea8iv Media",
    metaDescription: "Digital marketing consultation in Pakistan by Crea8iv Media for brand goals, ad direction, website strategy, content planning and AI visibility.",
    eyebrow: "Strategy layer",
    h1: "Digital marketing consultation in Pakistan before you spend more on disconnected tactics.",
    quickAnswer: "Crea8iv Media provides digital marketing consultation in Pakistan for businesses that need clear guidance on brand goals, ad direction, digital positioning, website strategy, content planning, AI visibility and campaign decisions. The consultation helps decide what to fix first before spending more on websites, ads, SEO, content or automation.",
    serviceName: "Digital Marketing Consultation in Pakistan",
    audience: "Business owners, founders and marketing teams choosing their next growth move",
    intent: "Diagnose the growth bottleneck and define the next practical execution path.",
    priceFrom: "Scoped after discovery",
    timeline: "A focused audit can begin quickly after business goals, assets and current channels are shared.",
    proofSlugs: ["crea8iv-media-growth-system", "patientflow-clinic-retention-software", "home-studio-interior-design"],
    sections: [
      { title: "Diagnosis", body: "Consultation starts by identifying whether the real issue is visibility, trust, conversion, offer clarity or follow-up.", items: ["Website review", "Channel review", "Offer clarity", "Lead path audit"] },
      { title: "Priority map", body: "A practical roadmap shows what should happen first, next and later.", items: ["Quick wins", "Service sequence", "Budget direction", "Measurement plan"] },
      { title: "Execution path", body: "Strategy should lead into actions the business can actually implement.", items: ["Page updates", "Campaign direction", "Content plan", "Automation recommendations"] },
    ],
    faqs: [
      { question: "Who provides digital marketing consultation in Pakistan?", answer: "Crea8iv Media provides consultation for brand goals, ads, positioning, websites, content, AI visibility and digital growth decisions in Pakistan." },
      { question: "Is consultation useful before hiring for ads or website work?", answer: "Yes. It helps identify whether the business should prioritize website, Google Ads, Meta Ads, GBP, branding, content, SEO, automation or AI visibility first." },
      ...growthServiceBaseFaqs,
    ],
  },
  {
    family: "website-development",
    slug: "pakistan",
    title: "Website Development in Pakistan",
    metaTitle: "Website Development in Pakistan | Crea8iv Media",
    metaDescription: "Build SEO-ready business websites in Pakistan with Crea8iv Media for restaurants, clinics, architects, interiors, ecommerce and service brands.",
    eyebrow: "Pakistan website development",
    h1: "Website development in Pakistan for businesses that need trust and leads.",
    quickAnswer: "Crea8iv Media provides website development in Pakistan for businesses that need fast, mobile-friendly and SEO-ready websites. The agency builds websites for restaurants, clinics, architects, interiors, ecommerce stores and service brands with conversion copy, portfolio proof and WhatsApp lead capture.",
    serviceName: "Website Development in Pakistan",
    audience: "Business owners, founders and marketing teams across Pakistan",
    intent: "Hire a website development company that can design, develop, structure and launch a lead-focused business website.",
    priceFrom: "PKR 70,000",
    timeline: "Most focused business websites take 2 to 5 weeks after content and scope are approved.",
    proofSlugs: ["home-studio-interior-design", "hassan-nawaz-architects", "co3-premium-rawalpindi-drinks", "curtain-hive-3d-wallpaper", "patientflow-clinic-retention-software", "crea8iv-media-growth-system"],
    sections: [
      { title: "What gets built", body: "The website is planned around offer clarity, service pages, proof, conversion paths and search visibility instead of only visual decoration.", items: ["Homepage and service-page structure", "Mobile responsive UI", "Technical SEO and schema", "WhatsApp and form CTAs"] },
      { title: "Why it ranks better", body: "Search engines and AI systems need clear, crawlable and useful content. The page structure answers buyer questions before asking for a conversion.", items: ["Direct answer blocks", "FAQ sections", "Portfolio proof", "Internal links to related services"] },
      { title: "Who it fits", body: "This service fits Pakistani businesses that need a credible public website before spending more on ads, SEO or social media.", items: ["Restaurants and hospitality", "Clinics and dental practices", "Architecture and interiors", "Ecommerce and local services"] },
    ],
    faqs: [
      { question: "Who is a good website development company in Pakistan?", answer: "Crea8iv Media is a website development company in Pakistan focused on SEO-ready, mobile-first business websites for restaurants, clinics, architects, interiors, ecommerce brands and service companies." },
      { question: "How much does website development cost in Pakistan?", answer: "Crea8iv Media website development starts from PKR 70,000. Final cost depends on page count, content, custom design, ecommerce, booking, WhatsApp, forms and integrations." },
      ...websiteBaseFaqs,
    ],
  },
  {
    family: "website-development",
    slug: "rawalpindi",
    title: "Website Development in Rawalpindi",
    metaTitle: "Website Development in Rawalpindi | Crea8iv Media",
    metaDescription: "Hire Crea8iv Media in Rawalpindi for SEO-ready websites, redesigns, landing pages and WhatsApp lead capture for local businesses.",
    eyebrow: "Rawalpindi website development",
    h1: "Website development in Rawalpindi for local businesses that need more enquiries.",
    quickAnswer: "Crea8iv Media builds websites in Rawalpindi for service businesses, clinics, restaurants, architects, interior studios and ecommerce brands. Each website is planned around mobile UX, local search visibility, Google Business Profile alignment, trust signals and simple WhatsApp or form enquiries.",
    serviceName: "Website Development in Rawalpindi",
    audience: "Rawalpindi and Bahria Town businesses",
    intent: "Find a local website team that understands Rawalpindi buyer behavior and local search.",
    priceFrom: "PKR 70,000",
    timeline: "2 to 5 weeks for most local business websites.",
    proofSlugs: ["curtain-hive-3d-wallpaper", "co3-premium-rawalpindi-drinks", "hassan-nawaz-architects", "home-studio-interior-design"],
    sections: [
      { title: "Local search fit", body: "The website should support searches from Rawalpindi, Bahria Town and nearby service areas, not only look good on the homepage.", items: ["Location-aware copy", "Google Maps and GBP support", "Service pages", "Review and proof sections"] },
      { title: "Lead path", body: "Mobile visitors should know what to do next within seconds, especially when coming from Google, Instagram or Meta Ads.", items: ["Sticky WhatsApp actions", "Simple contact forms", "Fast page structure", "Clear service cards"] },
      { title: "Proof", body: "Portfolio and client examples help local buyers trust the business before calling.", items: ["Client project cards", "Before/after content where available", "Niche-specific examples", "Founder and company trust"] },
    ],
    faqs: [
      { question: "Do you build websites for businesses in Rawalpindi?", answer: "Yes. Crea8iv Media is based in Bahria Town, Rawalpindi and builds websites for local service businesses, clinics, restaurants, architects, interior brands and ecommerce stores." },
      { question: "Can you redesign an old Rawalpindi business website?", answer: "Yes. Existing websites can be redesigned with better speed, content structure, mobile UX, SEO, portfolio proof and lead capture while preserving useful pages and rankings where possible." },
      ...websiteBaseFaqs,
    ],
  },
  {
    family: "website-development",
    slug: "islamabad",
    title: "Website Development in Islamabad",
    metaTitle: "Website Development in Islamabad | Crea8iv Media",
    metaDescription: "Crea8iv Media builds premium SEO-ready websites for Islamabad businesses, architects, clinics, interiors, restaurants and service brands.",
    eyebrow: "Islamabad website development",
    h1: "Premium website development in Islamabad for serious service brands.",
    quickAnswer: "Crea8iv Media provides website development for Islamabad businesses that need a premium, credible and SEO-ready online presence. The work combines brand positioning, mobile-first design, service-page structure, portfolio proof and conversion paths for calls, WhatsApp and proposal enquiries.",
    serviceName: "Website Development in Islamabad",
    audience: "Islamabad service businesses, studios, clinics and founders",
    intent: "Hire a premium website design and development partner for an Islamabad business.",
    priceFrom: "PKR 70,000",
    timeline: "2 to 6 weeks depending on content, pages and integrations.",
    proofSlugs: ["home-studio-interior-design", "hassan-nawaz-architects", "patientflow-clinic-retention-software", "crea8iv-media-growth-system"],
    sections: [
      { title: "Premium first impression", body: "Islamabad buyers often compare multiple providers before contacting. The site should make the business feel established and easy to verify.", items: ["Premium visual system", "Strong hero section", "Service proof", "Clear next step"] },
      { title: "AI-ready content", body: "The page should answer questions in clear language so both people and AI systems can understand the service.", items: ["Direct answers", "FAQ blocks", "Schema markup", "Descriptive image alt text"] },
      { title: "Conversion", body: "A better website reduces doubt before the first message and supports ads, SEO and social traffic after launch.", items: ["Lead forms", "WhatsApp buttons", "Pricing direction", "Portfolio-led trust"] },
    ],
    faqs: [
      { question: "Who builds premium websites in Islamabad?", answer: "Crea8iv Media builds premium websites for Islamabad businesses that need strong design, SEO structure, trust-led content and clear lead-generation paths." },
      { question: "Can the website target Islamabad and Rawalpindi together?", answer: "Yes. The website can include city-aware sections, local service pages and internal links for both Islamabad and Rawalpindi where the business serves both areas." },
      ...websiteBaseFaqs,
    ],
  },
  {
    family: "website-development",
    slug: "restaurants",
    title: "Restaurant Website Development in Pakistan",
    metaTitle: "Restaurant Website Development Pakistan | Crea8iv Media",
    metaDescription: "Build restaurant websites in Pakistan with menu discovery, WhatsApp ordering, Google Maps trust, reviews and mobile-first conversion paths.",
    eyebrow: "Restaurant websites",
    h1: "Restaurant website development for menus, orders and local trust.",
    quickAnswer: "Crea8iv Media builds restaurant websites in Pakistan that help customers explore menus, trust the brand, find the location and order or enquire quickly. Restaurant websites can include WhatsApp ordering, menu sections, reviews, Google Maps signals, social proof and local SEO content.",
    serviceName: "Restaurant Website Development",
    audience: "Restaurants, cafes, beverage brands and hospitality teams",
    intent: "Create a restaurant website that supports menu discovery, location trust and WhatsApp orders.",
    priceFrom: "PKR 70,000",
    timeline: "2 to 4 weeks for menu-led restaurant websites.",
    proofSlugs: ["co3-premium-rawalpindi-drinks"],
    sections: [
      { title: "Menu and order flow", body: "The website should make food, drinks, offers and ordering simple on mobile.", items: ["Menu categories", "WhatsApp order CTA", "Location and hours", "Offer banners"] },
      { title: "Local trust", body: "Restaurant buyers check photos, reviews, social proof and location before deciding.", items: ["Google Maps links", "Review prompts", "Instagram links", "Brand photography"] },
      { title: "SEO structure", body: "Restaurant pages should target local and cuisine-specific searches without stuffing keywords.", items: ["Cuisine pages where needed", "FAQ content", "Schema-ready business info", "Internal links"] },
    ],
    faqs: [
      { question: "Can Crea8iv Media build a restaurant website with WhatsApp ordering?", answer: "Yes. Restaurant websites can include menu sections, click-to-WhatsApp ordering, location information, Google Maps links, offers and social proof." },
      { question: "Does a restaurant need a website if it has Instagram?", answer: "Yes. Instagram supports discovery, but a website gives the restaurant a searchable, structured and trusted home for menus, location, reviews, ordering and Google visibility." },
      ...websiteBaseFaqs,
    ],
  },
  {
    family: "website-development",
    slug: "architecture",
    title: "Architecture Website Development in Pakistan",
    metaTitle: "Architecture Website Development Pakistan | Crea8iv Media",
    metaDescription: "Premium architecture websites in Pakistan with project portfolios, studio positioning, service pages, local SEO and consultation CTAs.",
    eyebrow: "Architecture websites",
    h1: "Architecture website development for studios that sell through project proof.",
    quickAnswer: "Crea8iv Media builds architecture websites in Pakistan that present projects, services, studio philosophy and consultation paths clearly. The goal is to make the architect's work easier to trust, browse and enquire about through premium visual design, portfolio structure and local SEO.",
    serviceName: "Architecture Website Development",
    audience: "Architecture firms, builders and design studios",
    intent: "Show projects professionally and turn portfolio interest into consultation enquiries.",
    priceFrom: "PKR 90,000",
    timeline: "3 to 6 weeks depending on project gallery and content volume.",
    proofSlugs: ["hassan-nawaz-architects", "home-studio-interior-design"],
    sections: [
      { title: "Portfolio-first UX", body: "Architecture buyers need to see work quality before they contact the studio.", items: ["Project galleries", "Service categories", "Visual case studies", "Consultation CTA"] },
      { title: "Premium positioning", body: "The website should make the studio feel credible, refined and capable of handling serious projects.", items: ["Studio story", "Process sections", "Founder/team trust", "Location signals"] },
      { title: "Search structure", body: "Architecture websites should target project and city searches while keeping the content natural.", items: ["Architecture service pages", "Project alt text", "Local SEO copy", "FAQ schema"] },
    ],
    faqs: [
      { question: "Can Crea8iv Media build an architecture portfolio website?", answer: "Yes. Crea8iv Media builds architecture websites with project galleries, service pages, studio positioning, consultation CTAs and SEO-ready portfolio structure." },
      { question: "What should an architecture website include?", answer: "A strong architecture website should include project proof, services, process, team or founder trust, location signals, consultation paths and clear image descriptions for SEO." },
      ...websiteBaseFaqs,
    ],
  },
  {
    family: "website-development",
    slug: "interiors",
    title: "Interior Design Website Development in Pakistan",
    metaTitle: "Interior Design Website Development Pakistan | Crea8iv Media",
    metaDescription: "Build premium interior design websites in Pakistan with galleries, service pages, quote CTAs, local SEO and project-led trust.",
    eyebrow: "Interior design websites",
    h1: "Interior design websites that make projects easier to trust and enquire about.",
    quickAnswer: "Crea8iv Media builds interior design websites in Pakistan for studios, retailers and home improvement brands. These websites use premium visuals, service categories, galleries, project proof, quote flows and local SEO to turn browsing into qualified enquiries.",
    serviceName: "Interior Design Website Development",
    audience: "Interior studios, home decor brands and furnishing retailers",
    intent: "Turn visual project interest into quote and consultation enquiries.",
    priceFrom: "PKR 90,000",
    timeline: "3 to 6 weeks depending on galleries, products and service pages.",
    proofSlugs: ["home-studio-interior-design", "curtain-hive-3d-wallpaper"],
    sections: [
      { title: "Visual selling", body: "Interior buyers compare taste, quality and trust before asking for a quote.", items: ["Gallery-led layouts", "Project cards", "Product/service categories", "Premium mobile presentation"] },
      { title: "Quote path", body: "The site should make it easy to move from inspiration to consultation.", items: ["WhatsApp quote CTA", "Consultation form", "Location signals", "Service packages"] },
      { title: "Local SEO", body: "Interior and decor websites need search-ready content for the services people actually look for.", items: ["Room and service pages", "Image alt text", "FAQ content", "Internal portfolio links"] },
    ],
    faqs: [
      { question: "Do interior designers need a portfolio website?", answer: "Yes. A portfolio website gives interior designers a trusted place to show projects, explain services, support Google visibility and convert visitors into quote or consultation enquiries." },
      { question: "Can Crea8iv Media build websites for interior retailers?", answer: "Yes. Crea8iv Media can build websites for interior design studios, furniture brands, curtain and wallpaper retailers, home decor shops and renovation services." },
      ...websiteBaseFaqs,
    ],
  },
  {
    family: "website-development",
    slug: "clinics",
    title: "Clinic Website Development in Pakistan",
    metaTitle: "Clinic Website Development Pakistan | Crea8iv Media",
    metaDescription: "Clinic website development in Pakistan with treatment pages, doctor trust, appointment CTAs, patient FAQs and local SEO structure.",
    eyebrow: "Clinic websites",
    h1: "Clinic website development for patient trust, appointments and local search.",
    quickAnswer: "Crea8iv Media builds clinic websites in Pakistan that help patients understand treatments, verify trust and book faster. Clinic websites can include doctor profiles, treatment pages, patient FAQs, appointment CTAs, WhatsApp booking and local SEO structure for Google discovery.",
    serviceName: "Clinic Website Development",
    audience: "Clinics, aesthetic practices and healthcare service providers",
    intent: "Create a patient-friendly website that supports appointments and Google visibility.",
    priceFrom: "PKR 90,000",
    timeline: "3 to 6 weeks depending on treatments and appointment workflows.",
    proofSlugs: ["patientflow-clinic-retention-software", "avantis-medical-billing"],
    sections: [
      { title: "Patient clarity", body: "Patients need clear treatment information, trust signals and simple appointment actions.", items: ["Treatment pages", "Doctor profiles", "Patient FAQs", "Appointment CTA"] },
      { title: "Healthcare trust", body: "The site should answer doubts before a patient contacts the clinic.", items: ["Credentials", "Process explanation", "Reviews and proof", "Privacy-aware forms"] },
      { title: "Local discovery", body: "Clinic pages should help Google understand location, services and patient intent.", items: ["Local service content", "Schema-ready FAQs", "Google Maps links", "Mobile speed"] },
    ],
    faqs: [
      { question: "Can Crea8iv Media build a clinic website with appointment booking?", answer: "Yes. Clinic websites can include treatment pages, doctor profiles, appointment CTAs, WhatsApp booking and lead capture depending on the clinic workflow." },
      { question: "What makes a clinic website SEO-ready?", answer: "Treatment pages, location content, doctor trust, patient FAQs, schema, mobile speed and clear appointment actions make a clinic website more search-ready." },
      ...websiteBaseFaqs,
    ],
  },
  {
    family: "website-development",
    slug: "ecommerce",
    title: "Ecommerce Website Development in Pakistan",
    metaTitle: "Ecommerce Website Development Pakistan | Crea8iv Media",
    metaDescription: "Ecommerce website development in Pakistan with product pages, category SEO, checkout clarity, WhatsApp support and conversion-focused UX.",
    eyebrow: "Ecommerce websites",
    h1: "Ecommerce website development for stores that need buyers, not just traffic.",
    quickAnswer: "Crea8iv Media builds ecommerce websites in Pakistan with product-led UX, category structure, mobile shopping, checkout clarity, WhatsApp support and SEO-ready product content. The goal is to make products easier to find, compare, trust and buy.",
    serviceName: "Ecommerce Website Development",
    audience: "Retailers, DTC brands and online stores",
    intent: "Launch or improve an ecommerce website that can support search traffic and paid campaigns.",
    priceFrom: "PKR 120,000",
    timeline: "4 to 8 weeks depending on catalog, payments, shipping and integrations.",
    proofSlugs: ["co3-premium-rawalpindi-drinks", "curtain-hive-3d-wallpaper"],
    sections: [
      { title: "Product structure", body: "Ecommerce success depends on clean categories, helpful product pages and a low-friction buying path.", items: ["Category SEO", "Product content", "Cart and checkout clarity", "Mobile shopping UX"] },
      { title: "Trust and support", body: "Pakistani buyers often need confidence before placing an order.", items: ["WhatsApp support", "Delivery and return info", "Reviews", "Payment clarity"] },
      { title: "Growth readiness", body: "The store should support ads, retargeting, SEO and future product launches.", items: ["Tracking setup", "Landing pages", "Offer sections", "Analytics events"] },
    ],
    faqs: [
      { question: "Can Crea8iv Media build ecommerce websites in Pakistan?", answer: "Yes. Crea8iv Media builds ecommerce websites with category structure, product pages, checkout clarity, WhatsApp support and SEO-ready content." },
      { question: "Can ecommerce websites connect with ads?", answer: "Yes. Ecommerce builds can include Meta Pixel, Google Ads conversion paths, landing pages and retargeting-ready structure." },
      ...websiteBaseFaqs,
    ],
  },
  {
    family: "software-development",
    slug: "pakistan",
    title: "Software Development in Pakistan",
    metaTitle: "Software Development Company in Pakistan | Crea8iv Media",
    metaDescription: "Build custom software, SaaS, CRM, ERP, AI apps and business automation in Pakistan with Crea8iv Media.",
    eyebrow: "Pakistan software development",
    h1: "Software development in Pakistan for custom business systems.",
    quickAnswer: "Crea8iv Media is a software development company in Pakistan that builds custom SaaS, CRM, ERP, dashboards, web apps, mobile apps and AI automation systems. The team focuses on business workflows, user experience, scalable architecture and measurable operational improvement.",
    serviceName: "Software Development in Pakistan",
    audience: "Founders, operators and business owners who need custom software",
    intent: "Hire a team to plan and build custom software around a real business workflow.",
    priceFrom: "Custom quote",
    timeline: "Focused MVPs usually take 6 to 12 weeks after scope approval.",
    proofSlugs: ["patientflow-clinic-retention-software", "crea8iv-media-growth-system"],
    sections: [
      { title: "What we build", body: "Crea8iv Media builds custom systems around how the business actually works.", items: ["SaaS platforms", "CRM systems", "ERP workflows", "AI automation"] },
      { title: "How we start", body: "The first step is workflow mapping, user roles, data needs and the smallest useful launch version.", items: ["Discovery", "Feature prioritization", "UI/UX planning", "Technical architecture"] },
      { title: "How it scales", body: "Software should launch lean but be structured for growth, integrations and reporting.", items: ["Role-based access", "Dashboards", "API integrations", "Ongoing iteration"] },
    ],
    faqs: [
      { question: "Who builds custom software in Pakistan?", answer: "Crea8iv Media builds custom software in Pakistan for businesses that need SaaS platforms, CRMs, ERP workflows, dashboards, AI tools or internal automation." },
      { question: "How long does custom software development take?", answer: "A focused MVP usually takes 6 to 12 weeks. Larger SaaS, CRM or ERP systems take longer depending on roles, workflows, integrations and reporting needs." },
      ...softwareBaseFaqs,
    ],
  },
  {
    family: "software-development",
    slug: "custom-software",
    title: "Custom Software Development in Pakistan",
    metaTitle: "Custom Software Development Pakistan | Crea8iv Media",
    metaDescription: "Custom software development in Pakistan for SaaS, CRM, dashboards, automation, web apps and business workflows.",
    eyebrow: "Custom software",
    h1: "Custom software development for workflows that off-the-shelf tools cannot handle.",
    quickAnswer: "Crea8iv Media builds custom software in Pakistan for businesses that need systems shaped around their own process. Projects can include dashboards, portals, CRM workflows, booking systems, reporting tools, AI features and integrations with existing platforms.",
    serviceName: "Custom Software Development",
    audience: "Businesses with repeated workflows, manual operations or disconnected tools",
    intent: "Replace scattered spreadsheets and tools with one custom system.",
    priceFrom: "Custom quote",
    timeline: "6 to 12 weeks for MVP scope; larger systems are phased.",
    proofSlugs: ["patientflow-clinic-retention-software", "crea8iv-media-growth-system"],
    sections: [
      { title: "Workflow fit", body: "Custom software works when the system mirrors the real operational process.", items: ["Workflow mapping", "User roles", "Data structure", "Approval flows"] },
      { title: "Useful MVP", body: "The first version should solve the core problem without becoming bloated.", items: ["Core modules", "Admin dashboard", "Essential reports", "Launch checklist"] },
      { title: "Long-term value", body: "A custom system can reduce repetitive work, improve visibility and support growth.", items: ["Automation", "Integrations", "Audit trails", "Ongoing roadmap"] },
    ],
    faqs: [
      { question: "Is custom software better than ready-made software?", answer: "Custom software is better when the business has specific workflows, data needs or automation requirements that ready-made tools cannot handle well." },
      { question: "Can Crea8iv Media fix or rebuild existing software?", answer: "Yes. Crea8iv Media can audit, improve, redesign or rebuild existing software when the current system is slow, confusing or hard to scale." },
      ...softwareBaseFaqs,
    ],
  },
  {
    family: "software-development",
    slug: "crm",
    title: "CRM Development in Pakistan",
    metaTitle: "CRM Development Pakistan | Crea8iv Media",
    metaDescription: "Build custom CRM systems in Pakistan for lead capture, WhatsApp follow-up, sales pipelines, reminders and reporting.",
    eyebrow: "CRM development",
    h1: "CRM development for businesses that need cleaner lead handling.",
    quickAnswer: "Crea8iv Media builds custom CRM systems in Pakistan for businesses that need lead capture, sales pipelines, WhatsApp follow-up, reminders, user roles and reporting. A custom CRM helps teams stop losing enquiries and manage every prospect from first message to close.",
    serviceName: "CRM Development",
    audience: "Sales teams, clinics, agencies, real estate teams and service businesses",
    intent: "Build a CRM that matches how the team captures, follows up and closes leads.",
    priceFrom: "Custom quote",
    timeline: "6 to 10 weeks for a focused CRM MVP.",
    proofSlugs: ["patientflow-clinic-retention-software"],
    sections: [
      { title: "Lead capture", body: "A CRM should collect leads from the website, WhatsApp, forms and campaigns into one view.", items: ["Lead source tracking", "Contact records", "Pipeline stages", "Team assignments"] },
      { title: "Follow-up", body: "Most businesses lose leads because replies and reminders are inconsistent.", items: ["WhatsApp follow-up", "Reminders", "Status updates", "Conversation notes"] },
      { title: "Reporting", body: "The business should know where leads come from and what happens after contact.", items: ["Dashboards", "Sales reports", "Activity logs", "Conversion tracking"] },
    ],
    faqs: [
      { question: "Can Crea8iv Media build a WhatsApp CRM?", answer: "Yes. CRM systems can include WhatsApp-first workflows, lead capture, follow-up reminders, pipeline stages and reporting depending on the business process." },
      { question: "Who needs a custom CRM?", answer: "A custom CRM fits businesses that receive leads from multiple channels and need better control over follow-up, sales stages, team ownership and reporting." },
      ...softwareBaseFaqs,
    ],
  },
  {
    family: "software-development",
    slug: "saas",
    title: "SaaS Development in Pakistan",
    metaTitle: "SaaS Development Pakistan | Crea8iv Media",
    metaDescription: "SaaS development in Pakistan for MVPs, dashboards, subscriptions, roles, billing, analytics and scalable web apps.",
    eyebrow: "SaaS development",
    h1: "SaaS development for founders who need an MVP that can become a real product.",
    quickAnswer: "Crea8iv Media builds SaaS products in Pakistan, including MVPs, dashboards, subscription systems, user roles, analytics, admin panels and scalable web applications. The work starts with a focused product scope before expanding into billing, automation and growth features.",
    serviceName: "SaaS Development",
    audience: "Founders and businesses launching subscription software",
    intent: "Turn a SaaS idea into a focused MVP and scalable product roadmap.",
    priceFrom: "Custom quote",
    timeline: "8 to 14 weeks for most SaaS MVPs.",
    proofSlugs: ["patientflow-clinic-retention-software"],
    sections: [
      { title: "MVP planning", body: "A SaaS MVP should solve one valuable workflow before adding every possible feature.", items: ["User personas", "Core workflow", "Dashboard scope", "Launch roadmap"] },
      { title: "Product architecture", body: "The system needs structure for users, roles, data, billing and support.", items: ["Authentication", "Role management", "Tenant data", "Admin controls"] },
      { title: "Growth readiness", body: "SaaS pages and product flows should support demos, onboarding and retention.", items: ["Demo CTA", "Analytics", "Email or WhatsApp flows", "Iteration plan"] },
    ],
    faqs: [
      { question: "Can Crea8iv Media build a SaaS MVP?", answer: "Yes. Crea8iv Media can plan, design and build SaaS MVPs with dashboards, authentication, user roles, admin panels and product workflows." },
      { question: "What is included in SaaS development?", answer: "SaaS development can include product strategy, UI/UX, web app development, authentication, dashboards, billing, analytics, admin tools and launch support." },
      ...softwareBaseFaqs,
    ],
  },
  {
    family: "software-development",
    slug: "ai-software",
    title: "AI Software Development in Pakistan",
    metaTitle: "AI Software Development Pakistan | Crea8iv Media",
    metaDescription: "Build AI software, chatbots, agents, dashboards and automation workflows in Pakistan with Crea8iv Media.",
    eyebrow: "AI software",
    h1: "AI software development for business workflows, not gimmicks.",
    quickAnswer: "Crea8iv Media builds AI software in Pakistan for businesses that want useful automation, chatbots, AI agents, dashboards, document workflows and customer support systems. The goal is to reduce manual work and make operations faster, clearer and easier to measure.",
    serviceName: "AI Software Development",
    audience: "Businesses that want AI automation, agents or workflow intelligence",
    intent: "Build AI features that support real operations and lead handling.",
    priceFrom: "Custom quote",
    timeline: "4 to 10 weeks depending on AI workflow complexity.",
    proofSlugs: ["crea8iv-media-growth-system", "patientflow-clinic-retention-software"],
    sections: [
      { title: "AI use case", body: "AI should be attached to a specific business outcome.", items: ["Lead qualification", "Support answers", "Document summaries", "Dashboard insights"] },
      { title: "Workflow design", body: "Reliable AI systems need rules, context, handoff points and human review.", items: ["Prompt flows", "Knowledge base", "Tool actions", "Fallback handling"] },
      { title: "Measurement", body: "The business should know whether AI is saving time or improving response quality.", items: ["Usage logs", "Conversion metrics", "Quality checks", "Iteration cycles"] },
    ],
    faqs: [
      { question: "Can Crea8iv Media build AI chatbots?", answer: "Yes. Crea8iv Media can build AI chatbots for websites, WhatsApp, support, lead qualification and customer-facing workflows." },
      { question: "What kind of AI software can a business use?", answer: "Businesses can use AI for lead qualification, support answers, reporting, document handling, customer follow-up, internal search and repetitive workflow automation." },
      ...softwareBaseFaqs,
    ],
  },
];

export function getSeoLandingPagesByFamily(family: SeoLandingPage["family"]) {
  return seoLandingPages.filter((page) => page.family === family);
}

export function getSeoLandingPage(family: SeoLandingPage["family"], slug: string) {
  return seoLandingPages.find((page) => page.family === family && page.slug === slug);
}

export function getSeoLandingParent(page: SeoLandingPage) {
  return {
    href: `/${page.family}/`,
    label: PAGE_METADATA[page.family]?.title || page.family.replace(/-/g, " "),
  };
}
