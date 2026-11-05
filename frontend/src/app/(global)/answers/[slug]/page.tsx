import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AiAnswerBriefPage from "@/components/AiAnswerBriefPage";
import { aiAnswerBriefs, getAiAnswerBrief } from "@/lib/ai-answer-briefs";
import { SITE_URL } from "@/lib/site-config";

export function generateStaticParams() {
  return aiAnswerBriefs.map((brief) => ({ slug: brief.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const brief = getAiAnswerBrief(slug);
  if (!brief) return {};

  const canonical = `${SITE_URL}/answers/${brief.slug}/`;

  return {
    title: { absolute: brief.metaTitle },
    description: brief.metaDescription,
    alternates: { canonical },
    openGraph: {
      title: brief.metaTitle,
      description: brief.metaDescription,
      url: canonical,
      type: "article",
      images: [{ url: `${SITE_URL}/img/crea8iv-search-preview.png`, width: 1200, height: 630, alt: brief.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: brief.metaTitle,
      description: brief.metaDescription,
      images: [`${SITE_URL}/img/crea8iv-search-preview.png`],
    },
  };
}

export default async function AnswerBriefRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const brief = getAiAnswerBrief(slug);
  if (!brief) notFound();

  return <AiAnswerBriefPage brief={brief} />;
}
