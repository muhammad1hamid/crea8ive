import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AuthorityGuidePage from "@/components/AuthorityGuidePage";
import { authorityGuides, getAuthorityGuide } from "@/lib/authority-guides";
import { SITE_URL } from "@/lib/site-config";

export function generateStaticParams() {
  return authorityGuides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getAuthorityGuide(slug);
  if (!guide) return {};
  const url = `${SITE_URL}/guides/${guide.slug}/`;

  return {
    title: { absolute: guide.metaTitle },
    description: guide.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: guide.metaTitle,
      description: guide.metaDescription,
      url,
      siteName: "Crea8iv Media",
      type: "article",
      publishedTime: guide.updated,
      modifiedTime: guide.updated,
      images: [{ url: `${SITE_URL}/img/crea8iv-search-preview.png`, width: 1200, height: 630, alt: guide.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.metaTitle,
      description: guide.metaDescription,
      images: [`${SITE_URL}/img/crea8iv-search-preview.png`],
    },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getAuthorityGuide(slug);
  if (!guide) notFound();
  return <AuthorityGuidePage guide={guide} />;
}
