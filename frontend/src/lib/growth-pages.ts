import { SITE_URL } from "@/lib/site-config";

export type StrategicPageConfig = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  headline: string;
  intro: string;
  bullets: string[];
  sections: { title: string; body: string; items: string[] }[];
  ctaLabel?: string;
  ctaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  showPortfolio?: boolean;
  showCases?: boolean;
  relatedInsights?: { title: string; href: string; description: string }[];
  visual?: { image: string; alt: string };
};

export const proofStats = [
  { value: "Rawalpindi", label: "Local team serving Twin Cities businesses" },
  { value: "7", label: "Growth channels connected into one system" },
  { value: "Weekly", label: "Optimization and reporting rhythm" },
  { value: "Free", label: "Growth audit before the first proposal" },
] as const;

export const portfolioItems = [
  {
    title: "Website Systems",
    type: "Websites",
    href: "/portfolio/websites/",
    image: "/img/services/ad-concepts/website-development-ad-concept.webp",
    detail: "Mobile-first pages with trust blocks, service clarity, WhatsApp CTAs, and SEO foundations.",
  },
  {
    title: "Graphics & Branding",
    type: "Graphics",
    href: "/portfolio/graphics/",
    image: "/img/services/ad-concepts/brand-identity-ad-concept.webp",
    detail: "Brand identity, campaign graphics, post grids, ad creatives, and premium visual systems.",
  },
  {
    title: "Reels & Video",
    type: "Video",
    href: "/portfolio/reels/",
    image: "/img/services/ad-concepts/content-reels-ad-concept.webp",
    detail: "Short-form creative planned for hooks, trust, retargeting, and platform-native storytelling.",
  },
  {
    title: "Lead Campaigns",
    type: "Campaigns",
    href: "/portfolio/campaigns/",
    image: "/img/services/ad-concepts/lead-generation-ad-concept.webp",
    detail: "Meta Ads, Google Ads, WhatsApp flows, landing pages, and reporting connected together.",
  },
] as const;

export const caseStudyItems = [
  {
    title: "Healthcare Growth Systems",
    industry: "Healthcare & Clinics",
    href: "/case-studies/healthcare/",
    image: "/portfolio-optimized/Health%20Clinics/Grid%20preview/WhatsApp%20Image%202026-06-28%20at%2012.48.59%20AM.webp",
    result: "Patient trust, local visibility, and appointment-ready journeys.",
    services: ["Website", "Google Maps", "Meta Ads", "Content"],
  },
  {
    title: "Restaurant Local Demand",
    industry: "Restaurants & Cafes",
    href: "/case-studies/restaurants/",
    image: "/portfolio-optimized/Resturants/grid%20preview/Blaster%20Ramadan%20grid.webp",
    result: "Menu visibility, review prompts, food content, and offer-led campaigns.",
    services: ["GBP", "Reels", "Reviews", "Campaigns"],
  },
  {
    title: "Salon WhatsApp Leads",
    industry: "Salons & Aesthetic Clinics",
    href: "/case-studies/salons/",
    image: "/img/services/ad-concepts/lead-generation-ad-concept.webp",
    result: "Offer-led creative routed into WhatsApp and booking follow-up.",
    services: ["Meta Ads", "Creative", "WhatsApp", "Retargeting"],
  },
  {
    title: "Architecture Authority",
    industry: "Real Estate & Architecture",
    href: "/case-studies/real-estate-architecture/",
    image: "/portfolio-optimized/Interiors%20%26%20Architects%20/grid%20preview/coworking%20grid.webp",
    result: "Portfolio-led authority across search, social, and consultation paths.",
    services: ["Website", "Branding", "Content", "Lead Gen"],
  },
  {
    title: "Ecommerce Product Presence",
    industry: "Ecommerce",
    href: "/case-studies/ecommerce/",
    image: "/portfolio-optimized/E%20commerce/Grid%20Preview/WhatsApp%20Image%202026-06-28%20at%201.02.53%20AM.webp",
    result: "Product visuals, offer assets, and conversion-ready campaign structure.",
    services: ["Creative", "Product", "Meta Ads", "Landing Pages"],
  },
] as const;

export const portfolioPages: Record<string, StrategicPageConfig> = {
  index: {
    slug: "portfolio",
    title: "Crea8iv Media Portfolio | Websites, Graphics, Reels & Campaigns",
    description:
      "Browse Crea8iv Media portfolio work across websites, graphics, reels, branding, and lead generation campaigns for Pakistani businesses.",
    eyebrow: "Portfolio",
    headline: "A clearer home for Crea8iv's websites, graphics, reels, and campaign work.",
    intro:
      "Visual proof should be easy to inspect. This portfolio hub organizes Crea8iv work by the way clients buy: websites, graphics, reels, and campaigns.",
    bullets: [
      "Website builds that create trust and inquiries",
      "Creative systems for restaurants, clinics, ecommerce, and architecture",
      "Campaign assets connected to Meta Ads, Google Ads, WhatsApp, and reporting",
    ],
    sections: [
      { title: "Websites", body: "Conversion-focused pages for clinics, ecommerce, local services, and premium brands.", items: ["Mobile-first UX", "SEO-ready structure", "Lead capture and WhatsApp CTAs"] },
      { title: "Graphics", body: "Social, brand, and ad creatives that make the business look credible fast.", items: ["Post grids", "Ad creatives", "Brand identity assets"] },
      { title: "Reels & Campaigns", body: "Short-form content and paid campaign assets designed for attention and inquiries.", items: ["Reels", "Offer creatives", "Retargeting assets"] },
    ],
    showPortfolio: true,
  },
  websites: {
    slug: "portfolio/websites",
    title: "Website Portfolio | Crea8iv Media",
    description: "Website portfolio by Crea8iv Media: fast, mobile-first, SEO-ready business websites built to convert visitors into leads.",
    eyebrow: "Website Portfolio",
    headline: "Website projects built around trust, speed, and lead capture.",
    intro: "Every website should make the buyer feel confident, understand the offer, and know exactly how to contact the business.",
    bullets: ["Clinic and healthcare website systems", "Business and service websites", "Ecommerce and landing-page experiences"],
    sections: [
      { title: "Conversion Foundation", body: "The website's job is to turn traffic into action.", items: ["Clear hero CTA", "WhatsApp and form paths", "Trust and proof blocks"] },
      { title: "Performance", body: "Speed and mobile UX affect both buyers and search engines.", items: ["Responsive layouts", "Lazy-loaded media", "SEO metadata"] },
      { title: "Growth Ready", body: "Websites connect to ads, SEO, GBP, analytics, and retargeting.", items: ["Tracking setup", "Service pages", "Campaign landing pages"] },
    ],
    showPortfolio: true,
  },
  graphics: {
    slug: "portfolio/graphics",
    title: "Graphics & Branding Portfolio | Crea8iv Media",
    description: "Crea8iv Media graphics and branding portfolio for social media posts, ad creatives, brand identity, and visual campaigns.",
    eyebrow: "Graphics Portfolio",
    headline: "Creative assets that make brands look active, premium, and ready to buy from.",
    intro: "Graphics are not decoration. They are trust signals, offer carriers, and ad assets that help campaigns work.",
    bullets: ["Social media grids", "Ad creative systems", "Logo and brand identity assets"],
    sections: [
      { title: "Social Presence", body: "Consistent visuals help the brand look alive before prospects inquire.", items: ["Post templates", "Story assets", "Grid planning"] },
      { title: "Ad Creative", body: "Paid campaigns need clear hooks, offers, and formats.", items: ["Static ads", "Offer creatives", "Retargeting graphics"] },
      { title: "Brand Identity", body: "Visual consistency improves trust across website, ads, and social.", items: ["Logo direction", "Color systems", "Brand kits"] },
    ],
    showPortfolio: true,
  },
  reels: {
    slug: "portfolio/reels",
    title: "Reels & Video Portfolio | Crea8iv Media",
    description: "Crea8iv Media reels and video portfolio for restaurants, clinics, salons, interiors, ecommerce, and local business campaigns.",
    eyebrow: "Reels Portfolio",
    headline: "Short-form content planned for attention, trust, and retargeting.",
    intro: "Reels and short videos work best when they are connected to offers, services, ads, and a follow-up path.",
    bullets: ["Restaurant and product reels", "Clinic and salon education videos", "Architecture and interior visual stories"],
    sections: [
      { title: "Planning", body: "The strongest shoot starts with the offer and audience.", items: ["Hook list", "Shot list", "Platform format plan"] },
      { title: "Production", body: "Each shoot should create multiple useful assets.", items: ["Reels", "Stories", "Ad versions"] },
      { title: "Distribution", body: "Content gets more value when it fuels campaigns and retargeting.", items: ["Organic posts", "Paid ads", "Website embeds"] },
    ],
    showPortfolio: true,
  },
  campaigns: {
    slug: "portfolio/campaigns",
    title: "Campaign Portfolio | Crea8iv Media",
    description: "Crea8iv Media campaign portfolio covering Meta Ads, Google Ads, WhatsApp funnels, local SEO, and conversion systems.",
    eyebrow: "Campaign Portfolio",
    headline: "Campaign systems that connect creative, traffic, conversion, and reporting.",
    intro: "The best campaigns are not isolated ads. They connect audience, offer, creative, landing path, WhatsApp or form flow, and weekly optimization.",
    bullets: ["Meta Ads and retargeting", "Google Ads and search intent", "WhatsApp lead flows and reporting"],
    sections: [
      { title: "Offer", body: "The campaign needs a reason for people to act now.", items: ["Service offer", "Seasonal offer", "Consultation offer"] },
      { title: "Traffic", body: "Choose the right traffic source for the buyer intent.", items: ["Meta Ads", "Google Ads", "Google Maps"] },
      { title: "Conversion", body: "Make the next step simple and trackable.", items: ["WhatsApp", "Forms", "Calls"] },
    ],
    showCases: true,
  },
};

export const caseStudyPages: Record<string, StrategicPageConfig> = {
  index: {
    slug: "case-studies",
    title: "Digital Marketing Case Studies | Crea8iv Media",
    description: "Explore Crea8iv Media case studies by industry: clinics, salons, restaurants, ecommerce, real estate, architecture, websites, and paid campaigns.",
    eyebrow: "Case Studies",
    headline: "Proof organized by industry, problem, channel, and outcome.",
    intro: "Case studies should show what changed for the business: the challenge, the system built, the channels used, and the outcome.",
    bullets: ["Healthcare and clinic growth systems", "Salon, restaurant, real estate, and ecommerce campaigns", "Website, Google Maps, content, and paid ads proof"],
    sections: [
      { title: "Challenge", body: "What stood between the business and growth.", items: ["Weak visibility", "No clear booking path", "Low trust online"] },
      { title: "System", body: "The combination of channels Crea8iv built.", items: ["Ads", "GBP and SEO", "Website and automation"] },
      { title: "Outcome", body: "The business result that matters.", items: ["More inquiries", "More calls", "Better conversion paths"] },
    ],
    showCases: true,
  },
  healthcare: {
    slug: "case-studies/healthcare",
    title: "Healthcare Marketing Case Studies | Crea8iv Media",
    description: "Healthcare and clinic marketing case studies by Crea8iv Media for patient trust, Google Maps visibility, content, websites, and lead generation.",
    eyebrow: "Healthcare Case Studies",
    headline: "Patient trust systems for clinics and healthcare brands.",
    intro: "Healthcare marketing needs clarity, sensitivity, speed, trust, and a booking path that feels simple for patients.",
    bullets: ["Clinic website trust blocks", "Google Maps and review systems", "Educational reels and Meta Ads campaigns"],
    sections: [
      { title: "Trust", body: "Patients need clear proof before they inquire.", items: ["Doctor/service clarity", "Reviews", "Before-after-safe proof"] },
      { title: "Visibility", body: "Clinics compete strongly on local intent.", items: ["GBP optimization", "Local SEO", "Service pages"] },
      { title: "Conversion", body: "Every channel should lead to a booking action.", items: ["WhatsApp", "Call CTAs", "Follow-up reminders"] },
    ],
    showCases: true,
  },
  restaurants: {
    slug: "case-studies/restaurants",
    title: "Restaurant Marketing Case Studies | Crea8iv Media",
    description: "Restaurant and cafe marketing case studies by Crea8iv Media for Google Maps, food content, reviews, reels, offers, and local campaigns.",
    eyebrow: "Restaurant Case Studies",
    headline: "Local demand systems for restaurants, cafes, and food brands.",
    intro: "Restaurants need discoverability, appetite-building creative, reviews, location signals, and offers that create repeat visits.",
    bullets: ["Food reels and content grids", "Google Maps and review prompts", "Offer-led paid campaigns"],
    sections: [
      { title: "Discovery", body: "People choose food brands through maps, reels, and reviews.", items: ["GBP", "Reviews", "Geo content"] },
      { title: "Desire", body: "Food content must make the menu feel immediate.", items: ["Reels", "Seasonal creative", "Menu pushes"] },
      { title: "Repeat Demand", body: "Campaigns should bring people back.", items: ["Offers", "Retargeting", "WhatsApp broadcasts"] },
    ],
    showCases: true,
  },
  salons: {
    slug: "case-studies/salons",
    title: "Salon & Aesthetic Marketing Case Studies | Crea8iv Media",
    description: "Salon and aesthetic clinic marketing case studies by Crea8iv Media for WhatsApp bookings, Meta Ads, reels, trust content, and local visibility.",
    eyebrow: "Salon Case Studies",
    headline: "Booking systems for salons and aesthetic clinics.",
    intro: "Beauty and aesthetics buyers respond to proof, offers, trust, and fast chat-based booking paths.",
    bullets: ["Offer-led Meta Ads", "Reels and service education", "WhatsApp booking flows"],
    sections: [
      { title: "Offer", body: "A clear package or consultation hook starts the conversation.", items: ["Seasonal offers", "Service bundles", "Consultation prompts"] },
      { title: "Proof", body: "Visual confidence matters before booking.", items: ["Reels", "Transformation content", "Reviews"] },
      { title: "Follow-Up", body: "Fast responses increase booking rates.", items: ["WhatsApp replies", "Reminder templates", "Retargeting"] },
    ],
    showCases: true,
  },
  "real-estate-architecture": {
    slug: "case-studies/real-estate-architecture",
    title: "Real Estate & Architecture Case Studies | Crea8iv Media",
    description: "Real estate, architecture, and interiors marketing case studies by Crea8iv Media for portfolio websites, branding, social content, and lead generation.",
    eyebrow: "Real Estate & Architecture",
    headline: "Portfolio-led systems for high-consideration buyers.",
    intro: "Architecture, interiors, and real estate brands need strong visual proof, authority, and clear consultation paths.",
    bullets: ["Portfolio websites", "Premium creative systems", "Lead generation campaigns"],
    sections: [
      { title: "Authority", body: "High-value services need trust before inquiry.", items: ["Project proof", "Founder story", "Service positioning"] },
      { title: "Visual Systems", body: "The work should look premium across every channel.", items: ["Website", "Social grids", "Presentation assets"] },
      { title: "Lead Capture", body: "Consultation paths should be visible and trackable.", items: ["Forms", "WhatsApp", "Retargeting"] },
    ],
    showCases: true,
  },
  ecommerce: {
    slug: "case-studies/ecommerce",
    title: "Ecommerce Marketing Case Studies | Crea8iv Media",
    description: "Ecommerce marketing case studies by Crea8iv Media for product creative, Meta Ads, landing pages, social content, and conversion systems.",
    eyebrow: "Ecommerce Case Studies",
    headline: "Product creative and campaigns that make buying easier.",
    intro: "Ecommerce growth needs strong visuals, offer clarity, landing pages, tracking, and retargeting.",
    bullets: ["Product content systems", "Meta Ads and retargeting", "Landing page conversion paths"],
    sections: [
      { title: "Product Clarity", body: "Customers need to understand the offer fast.", items: ["Product visuals", "Benefit copy", "Bundles"] },
      { title: "Campaign Assets", body: "Creative must carry hooks and reasons to buy.", items: ["Static ads", "Reels", "Retargeting"] },
      { title: "Conversion", body: "Traffic needs a frictionless next step.", items: ["Landing pages", "Tracking", "Checkout support"] },
    ],
    showCases: true,
  },
};

export const marketingAutomationPage: StrategicPageConfig = {
  slug: "marketing-automation",
  title: "Marketing Automation & WhatsApp CRM | Crea8iv Media",
  description:
    "Marketing automation services for Rawalpindi and Islamabad businesses: WhatsApp Business automation, CRM pipelines, clinic booking reminders, lead follow-up, review requests and reactivation flows.",
  eyebrow: "Marketing Automation",
  headline: "WhatsApp automation and follow-up systems that stop good leads from going cold.",
  intro:
    "Ads, websites, Google Maps, and social content create inquiries. Automation makes sure those inquiries get an instant response, structured follow-up, cleaner CRM capture, and reminders that help Rawalpindi and Islamabad businesses convert more leads into real bookings and sales conversations.",
  bullets: [
    "WhatsApp Business auto-replies, lead routing, and after-hours capture",
    "Clinic, salon, and service-business booking reminders with no-show reduction flows",
    "CRM pipelines, review requests, missed-lead reactivation, and follow-up automation",
  ],
  sections: [
    {
      title: "WhatsApp Lead Handling",
      body: "Most Pakistan businesses already use WhatsApp as the primary inquiry channel. The gap is not traffic. The gap is slow replies, weak routing, and lost messages after office hours.",
      items: ["Instant first-response flows", "Lead qualification questions", "Department or branch routing"],
    },
    {
      title: "Clinic and Booking Automation",
      body: "Clinics, salons, consultants, and local service brands need a cleaner way to confirm appointments, reduce no-shows, and follow up without making staff repeat the same tasks all day.",
      items: ["Booking confirmation sequences", "Appointment reminder workflows", "Post-visit or post-consultation follow-up"],
    },
    {
      title: "CRM and Reactivation",
      body: "A strong automation setup keeps new leads moving, brings old leads back into conversation, and asks for reviews when the customer experience is still fresh.",
      items: ["Missed-lead reminder cadence", "Review request automation", "Cold-lead reactivation campaigns"],
    },
  ],
  relatedInsights: [
    {
      title: "WhatsApp Automation for Clinics: Booking, Follow-Up, and Reminders",
      href: "/blog/whatsapp-automation-for-clinics-booking-follow-up-and-reminders/",
      description: "A focused guide for clinics that need faster reply handling, booking flow structure, and reminder automation.",
    },
    {
      title: "How Real Estate Businesses in Pakistan Get Leads from Facebook Ads",
      href: "/blog/how-real-estate-businesses-in-pakistan-get-leads-from-facebook-ads/",
      description: "Shows how offer clarity, WhatsApp routing, and faster follow-up improve lead quality after the click.",
    },
    {
      title: "How Much Should a Business Spend on Meta Ads in Pakistan?",
      href: "/blog/how-much-should-a-business-spend-on-meta-ads-in-pakistan/",
      description: "Useful for businesses pairing click-to-WhatsApp demand generation with a stronger follow-up and CRM system.",
    },
  ],
  visual: {
    image: "/img/services/ad-concepts/ai-automation-ad-concept.webp",
    alt: "Minimal WhatsApp automation and CRM follow-up visual by Crea8iv Media",
  },
  ctaLabel: "Build My Follow-Up System",
  showCases: true,
};

export function getPageUrl(slug: string) {
  return `${SITE_URL}/${slug}/`;
}
