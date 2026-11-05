import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ComparisonPage from "@/components/ComparisonPage";
import { comparisonPages, getComparisonPage } from "@/lib/comparison-pages";
import { SITE_URL } from "@/lib/site-config";

export function generateStaticParams() {
  return comparisonPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getComparisonPage(slug);
  if (!page) return {};

  const canonical = `${SITE_URL}/compare/${page.slug}/`;

  return {
    title: { absolute: page.metaTitle },
    description: page.metaDescription,
    alternates: { canonical },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: canonical,
      type: "article",
      images: [{ url: `${SITE_URL}/img/crea8iv-search-preview.png`, width: 1200, height: 630, alt: page.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
      images: [`${SITE_URL}/img/crea8iv-search-preview.png`],
    },
  };
}

export default async function CompareRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getComparisonPage(slug);
  if (!page) notFound();

  return <ComparisonPage page={page} />;
}
