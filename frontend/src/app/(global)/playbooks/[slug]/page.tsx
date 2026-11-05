import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PlaybookPage from "@/components/PlaybookPage";
import { getPlaybookPage, playbookPages } from "@/lib/playbook-pages";
import { SITE_URL } from "@/lib/site-config";

export function generateStaticParams() {
  return playbookPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getPlaybookPage(slug);
  if (!page) return {};

  const canonical = `${SITE_URL}/playbooks/${page.slug}/`;

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

export default async function PlaybookRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getPlaybookPage(slug);
  if (!page) notFound();

  return <PlaybookPage page={page} />;
}
