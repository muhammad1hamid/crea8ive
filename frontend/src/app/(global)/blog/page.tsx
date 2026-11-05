import type { Metadata } from "next";
import { BlogArchive } from "@/app/(global)/blog/BlogArchive";
import { getBlogPageCount, getBlogPageSlice } from "@/lib/blog-pagination";
import { getAllPosts } from "@/lib/wordpress";
import { SITE_URL } from "@/lib/site-config";
import { PAGE_METADATA } from "@/lib/seo-metadata";
import type { WPPost } from "@/types/wordpress";

export const revalidate = 60;

export const metadata: Metadata = {
  title: { absolute: PAGE_METADATA.blog.title },
  description: PAGE_METADATA.blog.description,
  alternates: {
    canonical: `${SITE_URL}/blog/`,
  },
  openGraph: {
    title: PAGE_METADATA.blog.title,
    description: PAGE_METADATA.blog.description,
    url: `${SITE_URL}/blog/`,
    type: "website",
    images: [{ url: `${SITE_URL}/img/crea8iv-white-3d-logo.webp`, width: 900, height: 713, alt: "Crea8iv Media" }],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_METADATA.blog.title,
    description: PAGE_METADATA.blog.description,
    images: [`${SITE_URL}/img/crea8iv-white-3d-logo.webp`],
  },
};

export default async function BlogPage() {
  const allPosts = await getAllPosts().catch(() => [] as WPPost[]);
  const totalPages = getBlogPageCount(allPosts.length);

  return (
    <BlogArchive
      posts={getBlogPageSlice(allPosts, 1)}
      allPosts={allPosts}
      currentPage={1}
      totalPages={totalPages}
    />
  );
}
