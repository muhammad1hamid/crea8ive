import { caseStudyShowcaseItems } from "@/lib/case-study-showcase";
import type { TunnelProject } from "@/components/ui/perspective-tunnel-hero";

function studyHref(id: string) {
  const study = caseStudyShowcaseItems.find(study => study.id === id);
  if (!study) throw new Error(`Missing portfolio hero case study: ${id}`);
  return study.primaryHref;
}

/** Curated real work; project destinations remain owned by the proof registry. */
export const portfolioHeroProjects: readonly TunnelProject[] = [
  { id: "buildscape", name: "Buildscape", category: "Architecture & construction", href: studyHref("buildscape"), image: "/img/portfolio/websites/buildscape/buildscape-production-desktop-20260927.webp", alt: "Buildscape architecture and construction website", kind: "website" },
  { id: "co3-premium-liquid-shop", name: "CO3 Premium", category: "Brand identity", href: studyHref("co3-premium-liquid-shop"), image: "/img/homepage/creative-work/co3-landscape-v2.webp", alt: "CO3 Premium identity applied to packaging and drinks", kind: "creative" },
  { id: "home-studio-interiors", name: "Home Studio Interiors", category: "Interior design", href: studyHref("home-studio-interiors"), image: "/img/case-studies/home-studio-interiors/proof/home-studio-live-desktop-2026.webp", alt: "Home Studio Interiors website and project presentation", kind: "website" },
  { id: "the-smile-xperts", name: "The Smile Xperts", category: "Healthcare experience", href: studyHref("the-smile-xperts"), image: "/img/case-studies/the-smile-xperts/the-smile-xperts-social-preview.png", alt: "The Smile Xperts clinic website and dental brand presentation", kind: "website" },
  { id: "ajwad-naturals", name: "Ajwad Naturals", category: "Creative campaigns", href: "/clients/", image: "/img/homepage/creative-work/ajwad-landscape-v2.webp", alt: "Ajwad Naturals social content and product campaign", kind: "creative" },
  { id: "stw-movers", name: "STW Movers", category: "Travel & transport", href: studyHref("stw-movers-barcelona"), image: "/img/portfolio/websites/stw-movers/stw-desktop-20261019.webp", alt: "STW Movers Barcelona private chauffeur website", kind: "website" },
  { id: "black-petals", name: "Black Petals", category: "E-commerce", href: studyHref("black-petals"), image: "/img/case-studies/black-petals/black-petals-live-desktop.webp", alt: "Black Petals flower shop and floral collections website", kind: "website" },
];
