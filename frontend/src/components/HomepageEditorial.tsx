import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { WPPost } from "@/types/wordpress";
import { stripHtml } from "@/lib/wordpress";
import NotchedProjectCard from "@/components/ui/notched-project-card";
import styles from "./homepage-editorial.module.css";
import HomepageFaq from "./HomepageFaq";
export { homepageFaqs } from "@/data/homepage-faqs";

const insightCovers: Record<string, { image: string; topic: string }> = {
  "website-redesign-checklist": { image: "/wp-content/uploads/2026/10/website-redesign-checklist-blog-thumbnail.webp", topic: "Website growth" },
  "what-is-ai-search-optimization": { image: "/wp-content/uploads/2026/08/what-is-ai-search-optimization-blog-thumbnail.webp", topic: "AI visibility" },
  "website-vs-landing-page": { image: "/wp-content/uploads/2026/09/website-vs-landing-page-blog-thumbnail.webp", topic: "Website strategy" },
};

export default function HomepageEditorial({ posts }: { posts: WPPost[] }) {
  const recentPosts = posts.slice(0, 3).map((post) => ({
    slug: post.slug,
    title: stripHtml(post.title.rendered),
    excerpt: stripHtml(post.excerpt.rendered || post.content.rendered).slice(0, 180),
    image: insightCovers[post.slug]?.image || "/img/crea8iv-search-preview.png",
    topic: insightCovers[post.slug]?.topic || "Insight",
  })).filter((post) => post.title && post.slug);

  return (
    <>
      <section id="home-insights" data-home-insights className={`home-insights-section px-6 py-16 sm:px-8 lg:px-10 lg:py-24 ${styles.insights}`} aria-labelledby="home-insights-heading">
        <div className={styles.inner}>
          <div className={styles.headingRow}>
            <div>
              <div className={styles.eyebrow}><span aria-hidden="true" /> Useful answers <span className={styles.issue}>/ The journal</span></div>
              <h2 id="home-insights-heading" className={styles.heading}>Better questions lead to <em>better decisions.</em></h2>
            </div>
            <div className={styles.introAside}>
              <p>Explore practical perspectives on websites, visibility and marketing, plus straightforward answers about working with us.</p>
              <Link href="/blog/" className={styles.allInsights}>Explore Insights <ArrowUpRight size={18} aria-hidden="true" /></Link>
            </div>
          </div>
          {recentPosts.length ? (
            <div className={styles.grid}>
              {recentPosts.map((post, index) => (
                <article key={post.slug} className={styles.article}>
                  <NotchedProjectCard
                    href={`/blog/${post.slug}/`}
                    title={post.title}
                    description={`${post.excerpt}${post.excerpt.length >= 180 ? "…" : ""}`}
                    image={post.image}
                    imageAlt=""
                    badge={`0${index + 1} / 0${recentPosts.length}`}
                    tags={[post.topic]}
                    surface="var(--journal-ground, #181818)"
                  />
                </article>
              ))}
            </div>
          ) : (
            <p className={styles.fallback}>Browse the Crea8iv Media insights library for practical guidance on websites, search and customer acquisition.</p>
          )}
          <div className={styles.bottomLine} aria-hidden="true"><span>Ideas worth putting to work.</span><span>CREA8IV / INSIGHTS</span></div>
        </div>
      </section>
      <HomepageFaq />

    </>
  );
}
