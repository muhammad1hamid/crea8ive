import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SeoLandingPage from "@/components/SeoLandingPage";
import {
  getSeoLandingPage,
  getSeoLandingPagesByFamily,
  type SeoLandingPage as SeoLandingPageData,
} from "@/lib/seo-landing-pages";
import { SITE_URL } from "@/lib/site-config";

export type ServiceLandingFamily = SeoLandingPageData["family"];

export function generateServiceLandingStaticParams(family: ServiceLandingFamily) {
  return getSeoLandingPagesByFamily(family).map((page) => ({ slug: page.slug }));
}

export function generateServiceLandingMetadata(
  family: ServiceLandingFamily,
  params: { slug: string },
): Metadata {
  const page = getSeoLandingPage(family, params.slug);
  if (!page) return {};
  const url = `${SITE_URL}/${family}/${page.slug}/`;

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

export function ServiceLandingRoute({
  family,
  params,
}: {
  family: ServiceLandingFamily;
  params: { slug: string };
}) {
  const page = getSeoLandingPage(family, params.slug);
  if (!page) notFound();
  return <SeoLandingPage page={page} />;
}
