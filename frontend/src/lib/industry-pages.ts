export type IndustryServiceStackItem = {
  name: string;
  href: string;
  role: string;
};

export type IndustryProofLink = {
  label: string;
  href: string;
  note: string;
};

export type IndustryFaq = {
  question: string;
  answer: string;
};

export type IndustryPage = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  updated: string;
  audience: string;
  quickAnswer: string;
  painPoints: string[];
  serviceStack: IndustryServiceStackItem[];
  proofLinks: IndustryProofLink[];
  faqs: IndustryFaq[];
};

export const industryPages: IndustryPage[] = [
  {
    slug: "restaurants-cafes",
    title: "Restaurant and cafe growth systems",
    metaTitle: "Restaurant Marketing & Website Growth Pakistan",
    metaDescription:
      "Crea8iv Media builds restaurant and cafe growth systems with websites, Google Business Profile, social media, Meta Ads, Google Ads and WhatsApp lead paths.",
    eyebrow: "Hospitality growth",
    h1: "Restaurant, cafe and beverage brands need fast trust, local discovery and clear ordering paths.",
    updated: "2026-09-01",
    audience: "Restaurants, cafes, beverage brands, bakeries, food courts and hospitality teams in Pakistan.",
    quickAnswer:
      "Crea8iv Media supports restaurants, cafes and beverage brands with menu-led websites, Google Business Profile growth, social media management, Meta Ads, Google Ads, content creation and WhatsApp-first conversion paths. The focus is local visibility, visual trust, clear offers and easier customer action.",
    painPoints: [
      "Customers check menu, location, reviews and Instagram before deciding.",
      "Weak photos, slow websites and unclear ordering paths reduce enquiries.",
      "Paid traffic performs better when the restaurant has strong local proof and a mobile-first page.",
      "Google Maps, social proof and WhatsApp ordering need to work as one system.",
    ],
    serviceStack: [
      { name: "Website Development", href: "/website-development/restaurants/", role: "Build menu, location, offer, gallery and WhatsApp enquiry pages." },
      { name: "Google Business Profile Growth", href: "/google-business-profile-growth/pakistan/", role: "Improve Maps presence, categories, posts, service areas and review signals." },
      { name: "Social Media Management", href: "/social-media-management/pakistan/", role: "Create a consistent feed, campaign rhythm and trust-building content." },
      { name: "Meta Ads", href: "/meta-ads/pakistan/", role: "Promote offers, launches, seasonal menus and WhatsApp lead campaigns." },
      { name: "Google Ads", href: "/google-ads/pakistan/", role: "Capture high-intent searches for nearby dining, delivery and catering." },
      { name: "Content Creation", href: "/content-creation/pakistan/", role: "Produce reels, food visuals, offer posts and launch assets." },
    ],
    proofLinks: [
      { label: "CO3 Premium direction", href: "/website-portfolio/", note: "Restaurant and beverage website direction proof." },
      { label: "Selected clients", href: "/clients/", note: "Client logo and official profile references." },
      { label: "Google Business Profile restaurant guide", href: "/blog/google-business-profile-for-restaurants-in-islamabad-full-setup-guide/", note: "Supporting local discovery guide." },
      { label: "Restaurant website development", href: "/website-development/restaurants/", note: "Specialist website page for restaurant intent." },
    ],
    faqs: [
      {
        question: "Does Crea8iv Media build restaurant websites in Pakistan?",
        answer:
          "Yes. Crea8iv Media builds restaurant, cafe and beverage websites with mobile menu discovery, location trust, WhatsApp enquiry paths, SEO structure and campaign-ready landing sections.",
      },
      {
        question: "Which digital marketing services matter most for restaurants?",
        answer:
          "Restaurants usually need Google Business Profile growth, social content, strong food visuals, Meta Ads for demand creation, Google Ads for high-intent search and a mobile-friendly website that makes ordering or enquiry easy.",
      },
    ],
  },
  {
    slug: "clinics-dental",
    title: "Clinic, dental and aesthetic growth systems",
    metaTitle: "Clinic & Dental Website, SEO and Ads Pakistan",
    metaDescription:
      "Crea8iv Media builds clinic, dental and aesthetic growth systems with websites, Google Business Profile, Google Ads, Meta Ads, content and patient enquiry paths.",
    eyebrow: "Healthcare visibility",
    h1: "Clinics need patient trust before traffic can become appointments.",
    updated: "2026-09-01",
    audience: "Dental clinics, aesthetic clinics, healthcare practices, specialists and patient-focused service providers.",
    quickAnswer:
      "Crea8iv Media supports clinics, dental practices and aesthetic providers with treatment-led websites, Google Business Profile optimization, Google Ads, Meta Ads, social media, content creation and patient enquiry flows. The goal is clearer treatment information, stronger trust signals and easier appointment action.",
    painPoints: [
      "Patients compare treatments, doctors, reviews, location and pricing cues before contacting a clinic.",
      "A generic website makes specialist services look less credible than they are.",
      "Healthcare ads need landing pages that explain treatments without overpromising.",
      "Local SEO, appointment CTAs and patient FAQs should reduce uncertainty before the first message.",
    ],
    serviceStack: [
      { name: "Website Development", href: "/website-development/clinics/", role: "Build treatment pages, doctor trust, FAQs and appointment paths." },
      { name: "Google Business Profile Growth", href: "/google-business-profile-growth/pakistan/", role: "Improve Maps visibility, service categories, posts and local trust signals." },
      { name: "Google Ads", href: "/google-ads/pakistan/", role: "Capture active treatment, dentist, clinic and consultation searches." },
      { name: "Meta Ads", href: "/meta-ads/pakistan/", role: "Run awareness, retargeting and consultation campaigns." },
      { name: "Content Creation", href: "/content-creation/pakistan/", role: "Create educational visuals, service creatives and patient-friendly content." },
      { name: "Consultation", href: "/consultation/pakistan/", role: "Clarify campaign direction, conversion paths and patient acquisition priorities." },
    ],
    proofLinks: [
      { label: "Clinic website development", href: "/website-development/clinics/", note: "Specialist page for clinic and dental website intent." },
      { label: "PatientFlow website proof", href: "/website-portfolio/", note: "Healthcare SaaS website direction and clinic retention positioning." },
      { label: "Health clinic results cluster", href: "/results/", note: "Healthcare-focused proof category." },
      { label: "Selected clients", href: "/clients/", note: "Client and proof-link hub." },
    ],
    faqs: [
      {
        question: "Does Crea8iv Media build clinic and dental websites?",
        answer:
          "Yes. Crea8iv Media builds clinic and dental websites with treatment pages, patient FAQs, appointment CTAs, local SEO structure, trust sections and mobile-friendly layouts.",
      },
      {
        question: "Can Crea8iv Media manage clinic ads?",
        answer:
          "Crea8iv Media can support clinic Google Ads and Meta Ads with campaign strategy, landing-page alignment, creative testing, conversion tracking and WhatsApp or form-based enquiry paths.",
      },
    ],
  },
  {
    slug: "architects-interiors",
    title: "Architecture and interior brand growth systems",
    metaTitle: "Architecture & Interior Website Marketing Pakistan",
    metaDescription:
      "Crea8iv Media builds architecture, interior and home-improvement growth systems with premium websites, portfolios, branding, content, SEO and lead paths.",
    eyebrow: "Design-led services",
    h1: "Architecture and interior brands sell through visual proof, taste and consultation confidence.",
    updated: "2026-09-01",
    audience: "Architecture studios, interior designers, home decor brands, furniture teams and home-improvement businesses.",
    quickAnswer:
      "Crea8iv Media supports architecture, interiors and home-improvement brands with portfolio-led websites, branding, content creation, social media management, Google Ads, Meta Ads and consultation-first conversion paths. The focus is premium visual presentation, project proof, local search visibility and qualified enquiries.",
    painPoints: [
      "Buyers need to see project quality before booking a consultation.",
      "Weak portfolio structure hides strong work and reduces premium perception.",
      "Interior and architecture leads require location, style, budget and service clarity.",
      "Search, social and website proof should reinforce one clear design position.",
    ],
    serviceStack: [
      { name: "Website Development", href: "/website-development/architecture/", role: "Create premium project portfolios, service pages and consultation paths." },
      { name: "Branding and Creative", href: "/branding-and-creative/pakistan/", role: "Sharpen identity, visual language, proposal style and campaign direction." },
      { name: "Content Creation", href: "/content-creation/pakistan/", role: "Create project visuals, before-after assets, reels and design-led posts." },
      { name: "Social Media Management", href: "/social-media-management/pakistan/", role: "Keep Instagram, Facebook and LinkedIn presence consistent with the portfolio." },
      { name: "Google Ads", href: "/google-ads/pakistan/", role: "Capture high-intent searches for interiors, architects and home improvement." },
      { name: "Meta Ads", href: "/meta-ads/pakistan/", role: "Retarget portfolio viewers and promote consultation offers." },
    ],
    proofLinks: [
      { label: "Home Studio case study", href: "/website-portfolio/", note: "Interior design website proof with portfolio and local SEO structure." },
      { label: "Hassan Nawaz Architects case study", href: "/website-portfolio/", note: "Architecture website direction and consultation-first journey." },
      { label: "Curtain Hive case study", href: "/website-portfolio/", note: "Interior retail website system with WhatsApp quote flow." },
      { label: "Interior website development", href: "/website-development/interiors/", note: "Specialist page for interiors and home decor intent." },
    ],
    faqs: [
      {
        question: "Does Crea8iv Media build websites for architects and interior designers?",
        answer:
          "Yes. Crea8iv Media builds portfolio-led websites for architects, interior designers and home-improvement brands with project galleries, service pages, local SEO structure and consultation CTAs.",
      },
      {
        question: "What should an architecture or interior website show first?",
        answer:
          "It should quickly show the brand's style, project quality, service area, consultation path and proof. Buyers usually need visual confidence before they contact a design or architecture team.",
      },
    ],
  },
  {
    slug: "ecommerce-retail",
    title: "Ecommerce and retail growth systems",
    metaTitle: "Ecommerce Website Development, Ads, Content and Branding in Pakistan",
    metaDescription:
      "Crea8iv Media builds ecommerce and retail growth systems with product-led websites, Meta Ads, Google Ads, content, branding and conversion paths.",
    eyebrow: "Retail growth",
    h1: "Ecommerce and retail brands need product clarity, trust and repeatable acquisition.",
    updated: "2026-09-01",
    audience: "Ecommerce stores, fashion brands, beauty brands, organic products, retail shops and product-led businesses.",
    quickAnswer:
      "Crea8iv Media supports ecommerce and retail brands with product-led websites, category SEO, Meta Ads, Google Ads, branding, content creation and conversion-focused landing pages. The focus is clearer product presentation, trust signals, campaign creative and easier purchase or WhatsApp action.",
    painPoints: [
      "Customers need product clarity, delivery confidence and brand trust before buying.",
      "Ads become expensive when product pages are unclear or slow.",
      "Organic discovery needs category pages, content and structured product information.",
      "Visual identity, creative assets and retargeting must feel consistent across channels.",
    ],
    serviceStack: [
      { name: "Website Development", href: "/website-development/ecommerce/", role: "Build product, category, checkout and WhatsApp support paths." },
      { name: "Meta Ads", href: "/meta-ads/pakistan/", role: "Test creatives, audiences, retargeting and product-led campaigns." },
      { name: "Google Ads", href: "/google-ads/pakistan/", role: "Capture high-intent product, brand and category searches." },
      { name: "Branding and Creative", href: "/branding-and-creative/pakistan/", role: "Improve packaging language, campaign identity and product presentation." },
      { name: "Content Creation", href: "/content-creation/pakistan/", role: "Create product posts, reels, launch visuals and ad creatives." },
      { name: "Consultation", href: "/consultation/pakistan/", role: "Prioritize catalog, offer, funnel and campaign direction." },
    ],
    proofLinks: [
      { label: "Ecommerce website development", href: "/website-development/ecommerce/", note: "Specialist ecommerce website service page." },
      { label: "Ecommerce results cluster", href: "/results/", note: "Ecommerce-focused proof category." },
      { label: "Ajwad Naturals", href: "https://www.ajwadnaturals.com/", note: "Selected external client proof link." },
      { label: "Houbb client work", href: "/clients/", note: "Selected Crea8iv Media client work." },
    ],
    faqs: [
      {
        question: "Does Crea8iv Media build ecommerce websites in Pakistan?",
        answer:
          "Yes. Crea8iv Media builds ecommerce websites with product pages, category structure, mobile-first UX, checkout clarity, WhatsApp support and campaign-ready landing sections.",
      },
      {
        question: "Which marketing channels are useful for ecommerce growth?",
        answer:
          "Ecommerce brands usually need product-led website structure, Meta Ads for discovery and retargeting, Google Ads for high-intent search, strong product content and consistent brand identity.",
      },
    ],
  },
  {
    slug: "real-estate-builders",
    title: "Real estate and builder growth systems",
    metaTitle: "Real Estate Website Development, Ads and Lead Generation in Pakistan",
    metaDescription:
      "Crea8iv Media supports real estate, builders and property teams with websites, landing pages, Google Ads, Meta Ads, creative content and lead systems.",
    eyebrow: "Property lead systems",
    h1: "Real estate buyers need project proof, location clarity and fast enquiry paths.",
    updated: "2026-09-01",
    audience: "Real estate agencies, builders, developers, property consultants and project sales teams.",
    quickAnswer:
      "Crea8iv Media supports real estate and builder teams with project landing pages, website development, Meta Ads, Google Ads, content creation, Google Business Profile growth and lead capture systems. The goal is clearer property positioning, stronger trust signals and more qualified enquiries.",
    painPoints: [
      "Property buyers compare location, pricing cues, developer credibility and project visuals.",
      "Lead forms and WhatsApp CTAs must be easy to use on mobile.",
      "Real estate ads need landing pages that explain the project, not only a generic form.",
      "Follow-up quality matters because property decisions are rarely instant.",
    ],
    serviceStack: [
      { name: "Website Development", href: "/website-development/pakistan/", role: "Build project, inventory, location and enquiry pages." },
      { name: "Meta Ads", href: "/meta-ads/pakistan/", role: "Generate awareness, retargeting and WhatsApp leads for projects." },
      { name: "Google Ads", href: "/google-ads/pakistan/", role: "Capture high-intent searches around locations, projects and property types." },
      { name: "Google Business Profile Growth", href: "/google-business-profile-growth/pakistan/", role: "Support local trust and Maps visibility for offices and sales locations." },
      { name: "Content Creation", href: "/content-creation/pakistan/", role: "Create walkthrough visuals, launch creatives and project posts." },
      { name: "Marketing Automation", href: "/marketing-automation/", role: "Support lead routing, follow-up and CRM workflows." },
    ],
    proofLinks: [
      { label: "Website development in Pakistan", href: "/website-development/pakistan/", note: "Business website development service page." },
      { label: "Meta Ads in Pakistan", href: "/meta-ads/pakistan/", note: "Paid reach service page for demand creation." },
      { label: "Google Ads in Pakistan", href: "/google-ads/pakistan/", note: "Search capture service page." },
      { label: "Real estate and architecture results", href: "/results/", note: "Related proof category." },
    ],
    faqs: [
      {
        question: "Can Crea8iv Media build real estate landing pages?",
        answer:
          "Yes. Crea8iv Media can build real estate and builder landing pages with project information, location context, visuals, lead forms, WhatsApp CTAs and campaign tracking.",
      },
      {
        question: "What helps real estate campaigns convert better?",
        answer:
          "Clear project positioning, location proof, visuals, pricing cues, fast WhatsApp or form enquiry paths, retargeting and organized follow-up usually improve real estate campaign quality.",
      },
    ],
  },
  {
    slug: "education-academies",
    title: "Education and academy growth systems",
    metaTitle: "Academy Website, Ads and Student Leads Pakistan",
    metaDescription:
      "Crea8iv Media supports academies, course brands and education teams with websites, Meta Ads, Google Ads, content, social media and student enquiry systems.",
    eyebrow: "Education growth",
    h1: "Education brands need clear course value, proof and simple admission enquiries.",
    updated: "2026-09-01",
    audience: "Academies, training institutes, course creators, education platforms and learning brands.",
    quickAnswer:
      "Crea8iv Media supports academies and education brands with course websites, landing pages, Meta Ads, Google Ads, social media management, content creation and student enquiry systems. The focus is clearer course positioning, trust, admission CTAs and campaign-ready lead capture.",
    painPoints: [
      "Students and parents need course clarity, fee cues, outcomes and trust signals.",
      "Generic social posts rarely explain why a course is worth joining.",
      "Education campaigns need fast landing pages with admission and WhatsApp paths.",
      "Course content, ads and website copy should answer objections before enquiry.",
    ],
    serviceStack: [
      { name: "Website Development", href: "/website-development/pakistan/", role: "Build course pages, admission paths, FAQs and student enquiry flows." },
      { name: "Meta Ads", href: "/meta-ads/pakistan/", role: "Promote admissions, course launches and retargeting campaigns." },
      { name: "Google Ads", href: "/google-ads/pakistan/", role: "Capture course, academy and training searches." },
      { name: "Social Media Management", href: "/social-media-management/pakistan/", role: "Maintain consistent course communication and community trust." },
      { name: "Content Creation", href: "/content-creation/pakistan/", role: "Create course reels, explainers, launch posts and offer creatives." },
      { name: "Consultation", href: "/consultation/pakistan/", role: "Clarify offer structure, funnel, page content and channel priorities." },
    ],
    proofLinks: [
      { label: "Cake Art Academy", href: "https://cakeartacademy.org/", note: "Selected external academy proof link." },
      { label: "ExamFlow", href: "https://xtempora.org/projects/examflow", note: "Education software product reference." },
      { label: "Website development in Pakistan", href: "/website-development/pakistan/", note: "Business website development service page." },
      { label: "Digital marketing consultation", href: "/consultation/pakistan/", note: "Planning support for course and campaign direction." },
    ],
    faqs: [
      {
        question: "Does Crea8iv Media build websites for academies?",
        answer:
          "Yes. Crea8iv Media can build academy and education websites with course pages, admission CTAs, FAQs, student enquiry paths, SEO structure and campaign-ready landing sections.",
      },
      {
        question: "How should academies generate student leads online?",
        answer:
          "Academies usually need clear course pages, social proof, admission CTAs, Meta Ads for awareness and retargeting, Google Ads for high-intent course searches and content that explains outcomes and next steps.",
      },
    ],
  },
];

export function getIndustryPage(slug: string) {
  return industryPages.find((page) => page.slug === slug);
}
