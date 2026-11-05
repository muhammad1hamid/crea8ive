import type { Metadata } from "next";
import { PAGE_METADATA, pageUrl } from "@/lib/seo-metadata";
import { nativePages } from "@/lib/native-pages";

export function nativeMetadata(slug: string): Metadata {
  const meta = PAGE_METADATA[slug] ?? {
    title: nativePages[slug]?.title ?? "Crea8iv Media",
    description: nativePages[slug]?.intro ?? "Crea8iv Media digital marketing, SEO, ads, websites, automation, and software services.",
    summary: nativePages[slug]?.intro ?? "",
  };
  const url = pageUrl(slug);

  return {
    title: { absolute: meta.title },
    description: meta.description,
    robots: { index: true, follow: true },
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: meta.title,
      description: meta.description,
      siteName: "Crea8iv Media",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
  };
}
