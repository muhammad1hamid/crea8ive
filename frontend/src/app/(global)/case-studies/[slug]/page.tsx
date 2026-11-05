import type { Metadata } from "next";
import BuildscapeCaseStudyPage from "@/components/BuildscapeCaseStudyPage";
import PremiumCaseStudyPage from "@/components/PremiumCaseStudyPage";
import StwMoversCaseStudyPage from "@/components/StwMoversCaseStudyPage";
import RedirectToResults from "@/components/RedirectToResults";
import { caseStudyPages } from "@/lib/growth-pages";
import { premiumCaseStudies, premiumCaseStudySlugs } from "@/lib/premium-case-studies";
import { SITE_URL } from "@/lib/site-config";
import { stwMoversMetadata, stwMoversStudy } from "@/lib/stw-movers-case-study";

const slugs = Object.keys(caseStudyPages).filter((slug) => slug !== "index");

export function generateStaticParams() {
  return Array.from(new Set([...slugs, ...premiumCaseStudySlugs, "buildscape", stwMoversStudy.slug])).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (slug === stwMoversStudy.slug) return stwMoversMetadata;
  if (slug === "buildscape") {
    const title = "Buildscape: Website & Digital Presence Case Study | Crea8iv Media";
    const description =
      "Explore Buildscape's live website and Crea8iv Media's ongoing partnership across web development, local visibility, content, advertising and AI search readiness.";
    const url = `${SITE_URL}/case-studies/buildscape/`;

    return {
      title: { absolute: title },
      description,
      alternates: { canonical: url },
      openGraph: {
        title,
        description,
        url,
        siteName: "Crea8iv Media",
        images: [
          {
            url: `${SITE_URL}/img/portfolio/websites/buildscape/buildscape-production-desktop-20260927.webp`,
            width: 1440,
            height: 1000,
            alt: "Buildscape website case study preview",
          },
        ],
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [`${SITE_URL}/img/portfolio/websites/buildscape/buildscape-production-desktop-20260927.webp`],
      },
      robots: { index: true, follow: true },
    };
  }

  const study = premiumCaseStudies[slug];

  if (study) {
    return {
      title: { absolute: study.metaTitle },
      description: study.metaDescription,
      alternates: { canonical: study.caseStudyUrl },
      openGraph: {
        title: study.metaTitle,
        description: study.metaDescription,
        url: study.caseStudyUrl,
        siteName: "Crea8iv Media",
        images: [
          {
            url: study.socialImage,
            width: 1200,
            height: 630,
            alt: `${study.clientName} case study by Crea8iv Media`,
          },
        ],
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: study.metaTitle,
        description: study.metaDescription,
        images: [study.socialImage],
      },
      robots: { index: true, follow: true },
    };
  }

  return {
    title: { absolute: "Case studies moved to Results | Crea8iv Media" },
    description: `The ${slug} case-study page now points to the main Crea8iv Media Results archive.`,
    alternates: { canonical: "https://crea8ivmedia.com/results/" },
    robots: { index: false, follow: true },
  };
}

export default async function CaseStudyIndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === stwMoversStudy.slug) return <StwMoversCaseStudyPage />;
  if (slug === "buildscape") {
    return <BuildscapeCaseStudyPage />;
  }

  const study = premiumCaseStudies[slug];

  if (study) {
    return <PremiumCaseStudyPage study={study} />;
  }

  return <RedirectToResults />;
}
