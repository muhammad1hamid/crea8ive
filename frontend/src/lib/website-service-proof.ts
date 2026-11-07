import { websitePortfolioItems } from "@/lib/website-portfolio";

export const websiteIndustryTargets = [
  {
    title: "Restaurant Website Development",
    description: "Menu discovery, WhatsApp ordering, location trust, Google Business Profile alignment and mobile-first booking or order actions.",
    href: "/website-development/restaurants/",
  },
  {
    title: "Architecture Website Development",
    description: "Project-led portfolios, premium service positioning, consultation paths, local SEO and visual case study structure for architects.",
    href: "/website-development/architecture/",
  },
  {
    title: "Interior Design Website Development",
    description: "Luxury visual presentation, service categories, project galleries, quote flows and trust signals for interior design studios.",
    href: "/website-development/interiors/",
  },
  {
    title: "Clinic and Dental Website Development",
    description: "Treatment pages, doctor trust, appointment CTAs, patient questions, local search structure and WhatsApp booking support.",
    href: "/website-development/clinics/",
  },
  {
    title: "Ecommerce Website Development",
    description: "Product-led shopping experiences, category structure, checkout clarity, conversion copy and SEO-ready product content.",
    href: "/website-development/ecommerce/",
  },
  {
    title: "Business Website Development",
    description: "Fast, mobile-friendly service websites with clear offers, proof, forms, WhatsApp CTAs, schema and search-ready page hierarchy.",
    href: "/website-development/pakistan/",
  },
];

const websiteProofOrder = [
  "home-studio-interior-design",
  "hassan-nawaz-architects",
  "co3-premium-rawalpindi-drinks",
  "curtain-hive-3d-wallpaper",
  "patientflow-clinic-retention-software",
  "crea8iv-media-growth-system",
] as const;

export const selectedWebsiteProof = websiteProofOrder
  .map((projectSlug) => websitePortfolioItems.find((item) => item.slug === projectSlug))
  .filter((item): item is (typeof websitePortfolioItems)[number] => Boolean(item));
