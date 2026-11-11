import type { Metadata } from "next";
import PageSchema from "@/components/PageSchema";
import HomepageEditorial, { homepageFaqs } from "@/components/HomepageEditorial";
import {
  getFrontPage,
  getPostBySlug,
} from "@/lib/wordpress";
import { loadHomeSnapshot } from "@/lib/wordpress/home-snapshot";
import { PAGE_METADATA } from "@/lib/seo-metadata";

export const revalidate = 3600;
const HOMEPAGE_PREVIEW_IMAGE = "https://crea8ivmedia.com/img/crea8iv-search-preview.png";

export async function generateMetadata(): Promise<Metadata> {
  const page = (await getFrontPage().catch(() => null)) ?? loadHomeSnapshot();

  if (!page) {
    return {};
  }

  const title = PAGE_METADATA.home.title;
  // Override the Yoast description (which was 194 chars and truncated in Google)
  // with a trimmed, ≤160-char version. Design-safe: meta tag only.
  const description = PAGE_METADATA.home.description;
  const ogImage = HOMEPAGE_PREVIEW_IMAGE;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: page.link,
    },
    openGraph: {
      title,
      description,
      url: page.link,
      siteName: "Crea8iv Media",
      images: [{ url: ogImage, width: 1200, height: 630, alt: "Crea8iv Media logo" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

import HeroSection from "@/components/HeroSection";
import CaseStudyShowcase from "@/components/CaseStudyShowcase";
import HomepageBelowHero from "@/components/HomepageBelowHero";

export default async function HomePage() {
  const insightSlugs = ["website-redesign-checklist", "what-is-ai-search-optimization", "website-vs-landing-page"];
  const posts = (await Promise.all(insightSlugs.map(getPostBySlug))).flatMap((post) => post?.status === "publish" ? [post] : []);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://crea8ivmedia.com/#homepage-faq",
    mainEntity: homepageFaqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return (
    <>
      <link
        rel="preload"
        as="image"
        type="image/webp"
        href="/assets/crea8iv-media-vector-hero-420.webp"
        imageSrcSet="/assets/crea8iv-media-vector-hero-420.webp 420w, /assets/crea8iv-media-vector-hero-840.webp 840w"
        imageSizes="(max-width: 767px) 62vw, (max-width: 1199px) 350px, 420px"
        fetchPriority="high"
      />
      <PageSchema slug="home" name={PAGE_METADATA.home.title} description={PAGE_METADATA.home.description} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }} />
      <HeroSection />
      <HomepageBelowHero caseStudies={<CaseStudyShowcase variant="home" />} editorial={<HomepageEditorial posts={posts} />} />
    </>
  );
}
