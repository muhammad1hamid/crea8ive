import { ChartNoAxesCombined, LifeBuoy, MessageCircle, Workflow } from "lucide-react";

export const capabilities = [
  { image: "service-orbit/01-strategy", title: "Strategy & planning", copy: "Define the audience, offer, page structure and conversion goals for business websites, service sites and campaign landing pages." },
  { image: "connected-journey/02-explore", title: "UI/UX & design", copy: "Use clear type, service pages and visual proof to guide buyers. Give portfolio sites room for galleries and a clear path to consult." },
  { image: "service-orbit/06-automation", title: "Development & integration", copy: "Build custom WordPress sites, booking systems and WooCommerce or Shopify stores. Connect appointments, catalogues, checkout and lead handling as needed." },
  { image: "connected-journey/05-follow-through", title: "Performance & optimization", copy: "Review loading, mobile usability and search structure. Check analytics against the enquiries, bookings or sales the site is built for." },
];

export const features = [
  { icon: MessageCircle, title: "WhatsApp click-to-chat", copy: "Give visitors a direct way to message your team from relevant pages." },
  { icon: Workflow, title: "Lead capture forms", copy: "Send enquiries to email, WhatsApp notifications or a CRM, depending on the agreed setup." },
  { icon: ChartNoAxesCombined, title: "Analytics and Search Console", copy: "Understand how people find the site and what they do once they arrive." },
  { icon: LifeBuoy, title: "Six months of post-launch support", copy: "The existing support scope covers bugs, updates and minor changes after launch." },
];

export const technical = [
  { image: "05-follow-through", title: "Website performance", copy: "Optimize loading and Core Web Vitals through efficient assets and clean page structure." },
  { image: "02-explore", title: "Responsive experience", copy: "Start with mobile layouts and check navigation, content and enquiry paths across screen sizes." },
  { image: "03-trust", title: "Security and reliability", copy: "Set up SSL and test key forms, links and integrations before launch." },
  { image: "01-discover", title: "Search readiness and maintainability", copy: "Plan headings, metadata, internal links and schema. For redesigns, review important URLs and tracking so the migration can be planned alongside the design." },
];

export const industryExamples: Record<string, { image: string; alt: string; label: string }> = {
  "/website-development/restaurants/": {
    image: "/img/portfolio/websites/co3-premium-rawalpindi-drinks-website-showcase.webp",
    alt: "CO3 Premium drinks website shown on desktop and mobile with menu and ordering actions",
    label: "Restaurant example · CO3 Premium",
  },
  "/website-development/architecture/": {
    image: "/img/portfolio/websites/hassan-nawaz-architects-website-showcase.webp",
    alt: "Hassan Nawaz Architects website presentation with architecture projects and consultation actions",
    label: "Architecture example · HN Architects",
  },
  "/website-development/interiors/": {
    image: "/img/portfolio/websites/home-studio-interior-design-website-showcase.webp",
    alt: "Home Studio interior design website presentation with project galleries",
    label: "Interiors example · Home Studio",
  },
  "/website-development/clinics/": {
    image: "/img/portfolio/websites/patientflow-clinic-retention-software-website-showcase.webp",
    alt: "PatientFlow healthcare software website concept shown on desktop and mobile",
    label: "Healthcare software concept · PatientFlow",
  },
  "/website-development/ecommerce/": {
    image: "/img/case-studies/black-petals/black-petals-live-desktop.webp",
    alt: "Black Petals live flower shop website with products and shopping navigation",
    label: "Ecommerce example · Black Petals",
  },
  "/website-development/pakistan/": {
    image: "/img/portfolio/websites/crea8iv-media-growth-system-website-showcase.webp",
    alt: "Crea8iv Media business website presentation with services and project enquiry paths",
    label: "Business example · Crea8iv Media",
  },
};

export const process = [
  { image: "understand-chameleon", alt: "", title: "Understand", description: "Review your audience, offers, current website and how enquiries reach your team." },
  { image: "plan-chess", alt: "", title: "Plan & design", description: "Map the homepage and service pages, clarify copy and proof, and agree on the routes visitors should take." },
  { image: "build-launch-rocket", alt: "", title: "Build & test", description: "Develop responsive pages and check speed, forms, search structure and agreed integrations." },
  { image: "learn-improve-owl", alt: "", title: "Launch & improve", description: "Review the live site, support handover and use analytics to guide follow-up improvements." },
];

export const packages = [
  { title: "Starter Business Website", price: "PKR 70,000+", copy: "A lead-generation site for a smaller service business.", includes: ["Up to 5 pages", "Mobile optimization", "Basic on-page SEO", "WhatsApp integration"] },
  { title: "Professional Business + Blog", price: "PKR 120,000+", copy: "For businesses that need more service pages and a place to publish.", includes: ["8 to 10 pages", "Blog integration", "SEO structure", "Hosting setup guidance"] },
  { title: "eCommerce Online Store", price: "PKR 180,000+", copy: "For product businesses that need a catalogue, cart and checkout.", includes: ["Up to 50 products", "WooCommerce or Shopify", "Mobile-first store build", "Basic conversion setup"] },
  { title: "Custom Web Application", price: "Quote based", custom: true, copy: "For projects with advanced features, integrations or workflows.", includes: ["Requirement-based scoping", "Custom features", "Flexible architecture", "Project-specific timeline"] },
];

export const toolIcons: Partial<Record<string, string>> = {
  "website-roi-calculator": "/img/homepage/connected-journey/05-follow-through.webp",
  "website-performance-checker": "/img/homepage/service-orbit/03-websites.webp",
  "seo-audit": "/img/homepage/connected-journey/01-discover.webp",
};

export const timeline = {
  q: "How long does it take to build a website in Rawalpindi?",
  a: "A standard five-page business website usually takes 10 to 15 working days from content delivery to launch. More complex ecommerce or custom functionality projects can take four to six weeks.",
};

export const articles = [
  {
    title: "Best Website Design Company in Islamabad: What to Look For",
    href: "/blog/best-website-design-company-in-islamabad-what-to-look-for/",
    image: "/wp-content/uploads/2026/06/website-cost-pakistan-premium-cover.webp",
    category: "Website strategy",
    description: "Questions to ask about scope, mobile usability, search and support before choosing a partner.",
  },
  {
    title: "Lead Generation for Builders and Architects in Pakistan",
    href: "/blog/lead-generation-for-builders-and-architects-in-pakistan/",
    image: "/wp-content/uploads/2026/06/digital-marketing-cost-pakistan-premium-cover.webp",
    category: "Conversion",
    description: "How project proof and clear enquiry paths support a steadier pipeline for built-environment businesses.",
  },
  {
    title: "SEO Cost in Pakistan: What Businesses Should Actually Expect to Pay",
    href: "/blog/seo-cost-in-pakistan-what-businesses-should-actually-expect-to-pay/",
    image: "/wp-content/uploads/2026/06/seo-services-pakistan-premium-cover.webp",
    category: "SEO and websites",
    description: "A breakdown of the work and scope that influence what SEO costs.",
  },
];
