import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { BlogArchive } from "@/app/(global)/blog/BlogArchive";
import { getBlogPageCount, getBlogPageSlice } from "@/lib/blog-pagination";
import { getAllPosts } from "@/lib/wordpress";
import { SITE_URL } from "@/lib/site-config";
import { PAGE_METADATA } from "@/lib/seo-metadata";
import type { WPPost } from "@/types/wordpress";

export const revalidate = 60;

type PageProps = {
  params: Promise<{ page: string }>;
};

function parsePage(value: string) {
  if (!/^\d+$/.test(value)) return null;
  const page = Number(value);
  return Number.isInteger(page) && page > 0 ? page : null;
}

export async function generateStaticParams() {
  const posts = await getAllPosts().catch(() => [] as WPPost[]);
  const totalPages = getBlogPageCount(posts.length);

  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) => ({
    page: String(index + 2),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { page: pageParam } = await params;
  const page = parsePage(pageParam);
  const title = page ? `${PAGE_METADATA.blog.title} - Page ${page}` : PAGE_METADATA.blog.title;
  const url = page ? `${SITE_URL}/blog/page/${page}/` : `${SITE_URL}/blog/`;

  return {
    title: { absolute: title },
    description: PAGE_METADATA.blog.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description: PAGE_METADATA.blog.description,
      url,
      type: "website",
      images: [{ url: `${SITE_URL}/img/crea8iv-white-3d-logo.webp`, width: 900, height: 713, alt: "Crea8iv Media" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: PAGE_METADATA.blog.description,
      images: [`${SITE_URL}/img/crea8iv-white-3d-logo.webp`],
    },
  };
}

export default async function BlogArchivePage({ params }: PageProps) {
  const { page } = await params;
  const currentPage = parsePage(page);
  if (!currentPage) notFound();
  if (currentPage === 1) redirect("/blog/");

  const allPosts = await getAllPosts().catch(() => [] as WPPost[]);
  const totalPages = getBlogPageCount(allPosts.length);

  if (currentPage > totalPages) notFound();

  return (
    <BlogArchive
      posts={getBlogPageSlice(allPosts, currentPage)}
      allPosts={allPosts}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  );
}
