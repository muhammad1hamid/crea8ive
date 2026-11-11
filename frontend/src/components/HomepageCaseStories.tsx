import { homepageCaseStudies } from "@/lib/case-study-showcase";
import CaseStoryStage from "./CaseStoryStage";

const screens: Record<string, { src: string; alt: string; width: number; height: number }> = {
  buildscape: { src: "/img/portfolio/websites/buildscape/buildscape-production-desktop-20260927.webp", alt: "Buildscape construction and architecture website homepage", width: 1440, height: 1000 },
  "home-studio-interiors": { src: "/img/case-studies/home-studio-interiors/proof/home-studio-live-desktop-2026.webp", alt: "Home Studio Interiors website showing interior design services and projects", width: 1600, height: 866 },
  "black-petals": { src: "/img/case-studies/black-petals/black-petals-live-desktop.webp", alt: "Black Petals flower shop website and floral collections", width: 2852, height: 1538 },
};

export default function HomepageCaseStories() {
  return <CaseStoryStage projects={homepageCaseStudies.map(study => ({
    id: study.id,
    name: study.name,
    industry: study.industry,
    market: study.market,
    status: study.statusLabel,
    description: study.eyebrow,
    caseStudyHref: study.primaryHref,
    liveHref: study.secondaryHref,
    image: screens[study.id]?.src ?? study.image,
    imageAlt: screens[study.id]?.alt ?? study.imageAlt,
    imageWidth: screens[study.id]?.width ?? 1440,
    imageHeight: screens[study.id]?.height ?? 900,
  }))} />;
}
