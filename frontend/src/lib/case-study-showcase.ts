import { premiumCaseStudies } from "@/lib/premium-case-studies";
import { SITE_URL } from "@/lib/site-config";
import { stwMoversStudy } from "@/lib/stw-movers-case-study";

export type CaseStudyShowcaseItem = {
  id: string;
  name: string;
  eyebrow: string;
  industry: string;
  market: string;
  statusLabel: string;
  proofType: "CaseStudy" | "PortfolioProof" | "PlatformProof" | "ClientProof";
  serviceTags: string[];
  image: string;
  imageAlt: string;
  primaryHref: string;
  primaryLabel: string;
  primaryExternal?: boolean;
  secondaryHref?: string;
  secondaryLabel?: string;
  secondaryExternal?: boolean;
};

const premiumShowcaseOrder = [
  "the-smile-xperts",
  "home-studio-interiors",
  "black-petals",
  "co3-premium-liquid-shop",
  "hassan-nawaz-architects",
] as const;

const orderedPremiumStudies = Object.values(premiumCaseStudies).sort((a, b) => {
  const aIndex = premiumShowcaseOrder.indexOf(a.slug as (typeof premiumShowcaseOrder)[number]);
  const bIndex = premiumShowcaseOrder.indexOf(b.slug as (typeof premiumShowcaseOrder)[number]);
  const aRank = aIndex === -1 ? Number.MAX_SAFE_INTEGER : aIndex;
  const bRank = bIndex === -1 ? Number.MAX_SAFE_INTEGER : bIndex;

  return aRank - bRank || a.clientName.localeCompare(b.clientName);
});

const premiumItems: CaseStudyShowcaseItem[] = orderedPremiumStudies.map((study) => ({
  id: study.slug,
  name: study.clientName,
  eyebrow: study.eyebrow,
  industry: study.industry,
  market: study.market,
  statusLabel: study.statusLabel,
  proofType: "CaseStudy",
  serviceTags: study.deliverables.slice(0, 4),
  image: study.socialImage,
  imageAlt: `${study.clientName} case study main preview`,
  primaryHref: `/case-studies/${study.slug}/`,
  primaryLabel: "Case Study",
  secondaryHref: study.clientUrl,
  secondaryLabel: "View Website",
  secondaryExternal: true,
}));

export const caseStudyShowcaseItems: CaseStudyShowcaseItem[] = [
  {
    id: stwMoversStudy.slug,
    name: stwMoversStudy.name,
    eyebrow: "Website development, search architecture and travel content for a Barcelona private chauffeur business, with ongoing lead-generation preparation.",
    industry: "Private chauffeur / Travel & transport",
    market: "Barcelona, Spain",
    statusLabel: "Implementation case study / Ongoing engagement",
    proofType: "CaseStudy",
    serviceTags: ["Website development", "SEO architecture", "Travel content", "Lead-generation preparation"],
    image: stwMoversStudy.social,
    imageAlt: "STW Movers Barcelona website shown on desktop and mobile",
    primaryHref: `/case-studies/${stwMoversStudy.slug}/`,
    primaryLabel: "Case Study",
    secondaryHref: stwMoversStudy.clientUrl,
    secondaryLabel: "View Website",
    secondaryExternal: true,
  },
  ...premiumItems,
  {
    id: "buildscape",
    name: "Buildscape",
    eyebrow:
      "Website design, development and digital presence work for a construction, architecture and infrastructure brand serving Islamabad and Rawalpindi.",
    industry: "AEC / Construction",
    market: "Islamabad and Rawalpindi, Pakistan",
    statusLabel: "Full case study available",
    proofType: "PortfolioProof",
    serviceTags: ["Website development", "Local visibility", "Content system", "SEO and AI readiness"],
    image: "/img/portfolio/websites/buildscape/buildscape-production-card-20260927.webp",
    imageAlt: "Buildscape website case study preview",
    primaryHref: "/case-studies/buildscape/",
    primaryLabel: "Case Study",
    secondaryHref: "https://buildscape.pk/",
    secondaryLabel: "View Website",
    secondaryExternal: true,
  },
  {
    id: "patientflow",
    name: "PatientFlow",
    eyebrow:
      "Healthcare retention software and clinic automation platform presented as a Crea8iv Media product and conversion-focused website experience.",
    industry: "HealthTech / Software",
    market: "Clinic operators and healthcare teams",
    statusLabel: "Platform proof",
    proofType: "PlatformProof",
    serviceTags: ["SaaS positioning", "Healthcare UX", "Demo journey", "Retention automation"],
    image: "/img/portfolio/websites/patientflow-clinic-retention-software-website-showcase.webp",
    imageAlt: "PatientFlow clinic retention software website preview",
    primaryHref: "/patientflow/",
    primaryLabel: "View Product",
    secondaryHref: "/website-portfolio/",
    secondaryLabel: "More Work",
  },
  {
    id: "cake-art-academy",
    name: "Cake Art Academy",
    eyebrow:
      "Client proof for a bakery and cake education brand. A full evidence-led case study can be added once the approved scope, assets and facts are supplied.",
    industry: "Bakery / Education",
    market: "Pakistan",
    statusLabel: "Client proof link",
    proofType: "ClientProof",
    serviceTags: ["Client proof", "Brand presence", "Website link", "Pending full scope"],
    image: "/img/client-logos/optimized/cake-art-academy.webp",
    imageAlt: "Cake Art Academy client logo",
    primaryHref: "/clients/",
    primaryLabel: "Client Proof",
    secondaryHref: "https://cakeartacademy.org/",
    secondaryLabel: "View Website",
    secondaryExternal: true,
  },
];

const homepageCaseCopy = [
  { id: "buildscape", industry: "Architecture & Construction", eyebrow: "Website design and development, local visibility and content systems for a construction and architecture business." },
  { id: "home-studio-interiors", industry: "Interior Design", eyebrow: "An interiors website and digital experience shaped around service clarity, project presentation and enquiries." },
  { id: "black-petals", industry: "E-commerce / Flowers", eyebrow: "A Shopify and paid-search engagement focused on product discovery, campaign structure and ongoing optimization." },
];

export const homepageCaseStudies = homepageCaseCopy.flatMap((copy) => {
  const study = caseStudyShowcaseItems.find((item) => item.id === copy.id);
  return study ? [{ ...study, ...copy }] : [];
});

export const caseStudyProofSignals = [
  { label: "Proof entries", value: `${caseStudyShowcaseItems.length}` },
  { label: "Live paths", value: "Case study + website" },
  { label: "Claim policy", value: "No fake metrics" },
  { label: "Search layer", value: "SEO + AI clarity" },
] as const;

export function absoluteShowcaseUrl(href: string) {
  return href.startsWith("http") ? href : `${SITE_URL}${href}`;
}

export function showcaseItemToCreativeWork(item: CaseStudyShowcaseItem, position: number) {
  return {
    "@type": "CreativeWork",
    position,
    name: item.name,
    headline: `${item.name} ${item.primaryLabel}`,
    description: item.eyebrow,
    url: absoluteShowcaseUrl(item.primaryHref),
    image: absoluteShowcaseUrl(item.image),
    about: {
      "@type": "Organization",
      name: item.name,
      url: item.secondaryHref ? absoluteShowcaseUrl(item.secondaryHref) : undefined,
    },
    creator: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Crea8iv Media",
      url: `${SITE_URL}/`,
    },
    genre: item.proofType,
    keywords: item.serviceTags.join(", "),
    areaServed: item.market,
  };
}
