import type { Metadata } from "next";
import { notFound } from "next/navigation";
import IndustryPage from "@/components/IndustryPage";
import { getIndustryPage, industryPages } from "@/lib/industry-pages";
import { SITE_URL } from "@/lib/site-config";

export function generateStaticParams() {
  return industryPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getIndustryPage(slug);
  if (!page) return {};
  const url = `${SITE_URL}/industries/${page.slug}/`;

  return {
    title: { absolute: page.metaTitle },
    description: page.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url,
      siteName: "Crea8iv Media",
      type: "website",
      images: [
        {
          url: `${SITE_URL}/img/crea8iv-search-preview.png`,
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
      images: [`${SITE_URL}/img/crea8iv-search-preview.png`],
    },
  };
}

export default async function IndustryRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getIndustryPage(slug);
  if (!page) notFound();
  return <IndustryPage page={page} />;
}
