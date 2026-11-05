import type { Metadata } from "next";
import RedirectToResults from "@/components/RedirectToResults";
import { portfolioPages } from "@/lib/growth-pages";

const slugs = Object.keys(portfolioPages).filter((slug) => slug !== "index");

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: { absolute: "Portfolio moved to Results | Crea8iv Media" },
    description: `The ${slug} portfolio category is now part of the main Crea8iv Media Results archive.`,
    alternates: { canonical: "https://crea8ivmedia.com/results/" },
    robots: { index: false, follow: true },
  };
}

export default function PortfolioCategoryPage() {
  return <RedirectToResults />;
}
