import { Activity, ChartNoAxesCombined, ClipboardList, CodeXml, Gauge, LayoutTemplate, LifeBuoy, MessageCircle, MonitorSmartphone, Rocket, Search, ShieldCheck, Workflow } from "lucide-react";

export const capabilities = [
  { icon: ClipboardList, title: "Strategy & planning", copy: "Define the audience, offers, page structure and conversion goals for business and service websites or campaign landing pages." },
  { icon: LayoutTemplate, title: "UI/UX & design", copy: "Use clear typography, service pages and visual proof to guide buyers toward action. Portfolio sites make room for project galleries and consultation paths." },
  { icon: CodeXml, title: "Development & integration", copy: "Build custom WordPress sites, booking systems and WooCommerce or Shopify stores. Connect appointments, product catalogues, checkout and lead handling as needed." },
  { icon: Gauge, title: "Performance & optimization", copy: "Review loading, mobile usability and search structure. Use analytics to check whether the site supports the enquiries, bookings or sales it was built for." },
];

export const features = [
  { icon: MessageCircle, title: "WhatsApp click-to-chat", copy: "Give visitors a direct way to message your team from relevant pages." },
  { icon: Workflow, title: "Lead capture forms", copy: "Send enquiries to email, WhatsApp notifications or a CRM, depending on the agreed setup." },
  { icon: ChartNoAxesCombined, title: "Analytics and Search Console", copy: "Understand how people find the site and what they do once they arrive." },
  { icon: LifeBuoy, title: "Six months of post-launch support", copy: "The existing support scope covers bugs, updates and minor changes after launch." },
];

export const technical = [
  { icon: Activity, title: "Website performance", copy: "Optimize loading and Core Web Vitals through efficient assets and clean page structure." },
  { icon: MonitorSmartphone, title: "Responsive experience", copy: "Start with mobile layouts and check navigation, content and enquiry paths across screen sizes." },
  { icon: ShieldCheck, title: "Security and reliability", copy: "Set up SSL and test key forms, links and integrations before launch." },
  { icon: Search, title: "Search readiness and maintainability", copy: "Plan headings, metadata, internal links and schema. For redesigns, review important URLs and tracking so the migration can be planned alongside the design." },
];

export const process = [
  { icon: Search, title: "Understand", copy: "Review your audience, offers, current website and how enquiries reach your team." },
  { icon: ClipboardList, title: "Plan & design", copy: "Map the homepage and service pages, clarify copy and proof, and agree on the routes visitors should take." },
  { icon: CodeXml, title: "Build & test", copy: "Develop responsive pages and check speed, forms, search structure and agreed integrations." },
  { icon: Rocket, title: "Launch & improve", copy: "Review the live site, support handover and use analytics to guide follow-up improvements." },
];

export const packages = [
  { title: "Starter Business Website", price: "PKR 70,000+", copy: "A lead-generation site for a smaller service business.", includes: ["Up to 5 pages", "Mobile optimization", "Basic on-page SEO", "WhatsApp integration"] },
  { title: "Professional Business + Blog", price: "PKR 120,000+", copy: "For businesses that need more service pages and a place to publish.", includes: ["8 to 10 pages", "Blog integration", "SEO structure", "Hosting setup guidance"] },
  { title: "eCommerce Online Store", price: "PKR 180,000+", copy: "For product businesses that need a catalogue, cart and checkout.", includes: ["Up to 50 products", "WooCommerce or Shopify", "Mobile-first store build", "Basic conversion setup"] },
  { title: "Custom Web Application", price: "Quote based", copy: "For projects with advanced features, integrations or workflows.", includes: ["Requirement-based scoping", "Custom features", "Flexible architecture", "Project-specific timeline"] },
];

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
