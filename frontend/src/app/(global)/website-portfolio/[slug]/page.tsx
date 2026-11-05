import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { websitePortfolioItems } from "@/lib/website-portfolio";
import RedirectToResults from "@/components/RedirectToResults";
import { SITE_URL } from "@/lib/site-config";

export function generateStaticParams() {
  return websitePortfolioItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "buildscape") {
    const title = "Buildscape Case Study moved | Crea8iv Media";
    const description =
      "The Buildscape case study is available in the Crea8iv Media case-study archive.";

    return {
      title: { absolute: title },
      description,
      alternates: { canonical: `${SITE_URL}/case-studies/buildscape/` },
      openGraph: {
        title,
        description,
        url: `${SITE_URL}/case-studies/buildscape/`,
        type: "article",
        images: [
          {
            url: `${SITE_URL}/img/portfolio/websites/buildscape/buildscape-social-preview.png`,
            width: 1200,
            height: 630,
            alt: "Buildscape website case study preview",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [`${SITE_URL}/img/portfolio/websites/buildscape/buildscape-social-preview.png`],
      },
      robots: { index: false, follow: true },
    };
  }

  const exists = websitePortfolioItems.some((item) => item.slug === slug);
  if (!exists) {
    return { title: { absolute: "Website portfolio | Crea8iv Media" }, robots: { index: false, follow: false } };
  }

  return {
    title: "Website portfolio",
    alternates: { canonical: "https://crea8ivmedia.com/website-portfolio/" },
    robots: { index: false, follow: true },
  };
}

export default async function WebsitePortfolioPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === "buildscape") {
    return <RedirectToResults destination="/case-studies/buildscape/" />;
  }

  if (!websitePortfolioItems.some((item) => item.slug === slug)) {
    notFound();
  }

  return <RedirectToResults destination="/website-portfolio/" />;
}
