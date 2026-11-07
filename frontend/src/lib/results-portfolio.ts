import grids from "@/data/portfolio-grid-assets.json";
import { caseStudyShowcaseItems } from "@/lib/case-study-showcase";
import { websitePortfolioItems } from "@/lib/website-portfolio";

export type ResultsCategory = "Websites" | "Brand Identity" | "Campaigns & Content";

export type ResultsImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ResultsWork = {
  id: string;
  title: string;
  category: ResultsCategory;
  description: string;
  image: ResultsImage;
  href?: string;
  linkLabel?: string;
  searchTerms?: string;
};

const buildscapeImage: ResultsImage = {
  src: "/img/portfolio/websites/buildscape/buildscape-production-desktop-20260927.webp",
  alt: "Buildscape's construction website with an architectural exterior and copper navigation",
  width: 1440,
  height: 1000,
};

const stwImage: ResultsImage = {
  src: "/img/portfolio/websites/stw-movers/stw-desktop-20261019.webp",
  alt: "STW Movers Barcelona chauffeur website with a black car and airport transfer information",
  width: 1440,
  height: 1040,
};

const smileImage: ResultsImage = {
  src: "/img/portfolio/results/smile-xperts-desktop.webp",
  alt: "The Smile Xperts dental clinic website with its treatment navigation and blue visual identity",
  width: 1440,
  height: 900,
};

const featuredImages = {
  buildscape: buildscapeImage,
  "stw-movers-barcelona": stwImage,
  "the-smile-xperts": smileImage,
};

export const featuredResults = Object.entries(featuredImages).map(([id, image]) => {
  const study = caseStudyShowcaseItems.find(item => item.id === id);
  if (!study) throw new Error(`Missing featured Results case study: ${id}`);
  return { ...study, preview: image };
});

export const additionalResults = caseStudyShowcaseItems.filter(
  study => !featuredResults.some(featured => featured.id === study.id),
);

const websites: ResultsWork[] = websitePortfolioItems.map(item => ({
  id: item.slug,
  title: item.brand === "CREA8IV MEDIA" ? "Crea8iv Media" : item.brand,
  category: "Websites",
  description: item.summary,
  searchTerms: `${item.title} ${item.category} ${item.location}`,
  image: {
    src: item.image,
    alt: item.imageAlt,
    width: item.slug === "buildscape" ? 720 : 960,
    height: item.slug === "buildscape" ? 500 : 1200,
  },
  href: item.href,
  linkLabel: item.linkLabel,
}));

const featuredWebsites: ResultsWork[] = featuredResults.slice(1).map(study => ({
  id: study.id,
  title: study.name,
  category: "Websites",
  description: study.eyebrow,
  image: study.preview,
  href: study.primaryHref,
  linkLabel: "View case study",
}));

const blackPetals = additionalResults.find(study => study.id === "black-petals");
if (!blackPetals) throw new Error("Missing Black Petals case study");

const identityWork: ResultsWork[] = [
  {
    id: "co3-identity",
    title: "CO3 Premium",
    category: "Brand Identity",
    description: "Visual identity and packaging for CO3 Premium, applied across its drinks range.",
    image: {
      src: "/img/homepage/creative-work/co3-landscape-v2.webp",
      alt: "CO3 Premium drinks, cups and packaging in its cream and forest-green brand palette",
      width: 1280,
      height: 800,
    },
    href: "/case-studies/co3-premium-liquid-shop/",
    linkLabel: "View case study",
  },
  {
    id: "smile-xperts-identity",
    title: "The Smile Xperts",
    category: "Brand Identity",
    description: "The visual identity guidelines for The Smile Xperts dental clinic.",
    image: {
      src: "/img/case-studies/the-smile-xperts/the-smile-xperts-brand-guideline-cover.webp",
      alt: "The Smile Xperts brand guidelines with its logo and colour palette",
      width: 1600,
      height: 900,
    },
    href: "/case-studies/the-smile-xperts/",
    linkLabel: "View case study",
  },
];

// Replace export filenames with descriptions of the artwork shown in the original grids.
const gridTitles: Record<string, string> = {
  "E Commerce/,,": "Pet care product campaign",
  "E Commerce/,,,": "Pet retail promotions",
  "E Commerce/WhatsApp Image 2026-06-28 at 1.02.53 AM": "PC and electronics campaign",
  "E Commerce/WhatsApp Image 2026-06-28 at 1.15.24 AM": "Pet care content series",
  "Health Clinics/WhatsApp Image 2026-06-28 at 12.48.59 AM": "Aesthetic clinic content",
  "Health Clinics/WhatsApp Image 2026-06-28 at 12.52.51 AM": "Dental treatments and clinic content",
  "Health Clinics/WhatsApp Image 2026-06-28 at 12.52.52 AM": "Dental practice social grid",
  "Interiors & Architects/coworking grid": "Coworking spaces",
  "Interiors & Architects/pp": "Interior materials and spaces",
  "Interiors & Architects/WhatsApp Image 2026-06-28 at 12.34.54 AM": "Architecture studio content",
  "Interiors & Architects/WhatsApp Image 2026-06-28 at 12.34.55 AM": "Architecture project grid",
  "Interiors & Architects/WhatsApp Image 2026-06-28 at 12.40.03 AM": "Interior design portfolio grid",
  "Restaurants/Blaster Ramadan grid": "Blaster Ramadan campaign",
  "Restaurants/WhatsApp Image 2026-06-28 at 12.52.52 AM": "CO3 Premium drinks content",
  "Health Clinics/venn-dental-instagram-grid-transformation": "Venn Dental",
  "Interiors & Architects/buildscape-instagram-grid-showcase": "Buildscape social content",
  "E Commerce/ajwad-naturals-instagram-grid-showcase": "Ajwad Naturals",
};

const gridLinks: Record<string, string> = {
  "Venn Dental": "/clients/",
  "Buildscape social content": "/case-studies/buildscape/",
  "Ajwad Naturals": "/clients/",
  "CO3 Premium drinks content": "/case-studies/co3-premium-liquid-shop/",
};

const campaigns: ResultsWork[] = grids.map(grid => {
  const title = gridTitles[`${grid.category}/${grid.name}`] ?? grid.label;
  const href = gridLinks[title];
  return {
    id: grid.id,
    title,
    category: "Campaigns & Content",
    description: `${grid.category} · Social media grid`,
    searchTerms: grid.category,
    image: {
      src: grid.optimizedSrc || grid.src,
      alt: `${title} social media artwork and layout`,
      width: grid.optimizedWidth || 900,
      height: grid.optimizedHeight || 1200,
    },
    href,
    linkLabel: href?.startsWith("/case-studies/") ? "View case study" : "View client work",
  };
});

const collection = [
  ...websites,
  ...featuredWebsites,
  {
    id: blackPetals.id,
    title: blackPetals.name,
    category: "Websites",
    description: blackPetals.eyebrow,
    image: {
      src: "/img/case-studies/black-petals/black-petals-live-desktop.webp",
      alt: "Black Petals online flower shop homepage and floral collections",
      width: 2852,
      height: 1538,
    },
    href: blackPetals.primaryHref,
    linkLabel: "View case study",
  },
  ...identityWork,
  ...campaigns,
] satisfies ResultsWork[];

const firstLook = [
  "co3-identity",
  "curtain-hive-3d-wallpaper",
  "client-social-showcases/venn-dental-instagram-grid-transformation.png",
  "co3-premium-rawalpindi-drinks",
  "smile-xperts-identity",
  "Resturants/grid preview/Blaster Ramadan grid.jpg",
  "stw-movers-barcelona",
  "client-social-showcases/ajwad-naturals-instagram-grid-showcase.png",
  "buildscape",
];

const selected = firstLook.flatMap(id => collection.filter(work => work.id === id));
export const resultsCollection = [
  ...selected,
  ...collection.filter(work => !selected.includes(work)),
];
