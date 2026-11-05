import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import type { WPPost } from "@/types/wordpress";
import { stripHtml } from "@/lib/wordpress";
import NotchedProjectCard from "@/components/ui/notched-project-card";
import styles from "./homepage-editorial.module.css";

const insightCovers: Record<string, { image: string; topic: string }> = {
  "website-redesign-checklist": { image: "/wp-content/uploads/2026/10/website-redesign-checklist-blog-thumbnail.webp", topic: "Website growth" },
  "what-is-ai-search-optimization": { image: "/wp-content/uploads/2026/08/what-is-ai-search-optimization-blog-thumbnail.webp", topic: "AI visibility" },
  "website-vs-landing-page": { image: "/wp-content/uploads/2026/09/website-vs-landing-page-blog-thumbnail.webp", topic: "Website strategy" },
};

export const homepageFaqs = [
  {
    question: "What does Crea8iv Media help businesses with?",
    answer: "We help businesses improve their websites, search visibility, digital advertising, branding, content and lead-follow-up systems. The work is shaped around the customer journey—from discovery to enquiry.",
  },
  {
    question: "Where is Crea8iv Media based?",
    answer: "Crea8iv Media is based in Rawalpindi, Pakistan, and works with businesses in Islamabad, across Pakistan and in international markets.",
  },
  {
    question: "Do you offer both website development and SEO?",
    answer: "Yes. Website structure, content clarity, technical SEO and conversion paths can be planned together, so the site supports discovery and enquiries after launch.",
  },
  {
    question: "Can you make my business appear in ChatGPT or Google AI results?",
    answer: "We can improve how clearly your website and public business information describe your services and expertise. Inclusion in AI-generated answers or recommendations is decided by each platform and cannot be guaranteed.",
  },
  {
    question: "How are projects priced?",
    answer: "Pricing depends on the services, deliverables, platform requirements and whether the work is one-time or ongoing. We share a defined scope and quotation before starting.",
  },
  {
    question: "How do we get started?",
    answer: "Tell us about your business, the challenge you want to solve and your preferred timeline. We review the requirements and recommend a suitable scope and next step.",
  },
] as const;

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
      <section className={`home-insights-section px-6 py-16 sm:px-8 lg:px-10 lg:py-24 ${styles.insights}`} aria-labelledby="home-insights-heading">
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
      <section id="homepage-faq" className="home-faq-section border-y border-white/10 px-6 py-16 sm:px-8 lg:px-10 lg:py-24" aria-labelledby="home-faq-heading">
        <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[.72fr_1.28fr]">
          <div>
            <p className="home-lux-eyebrow">Before we begin</p>
            <h2 id="home-faq-heading" className="home-lux-heading mt-4">Before we begin, let’s make things clear.</h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/65">Straight answers about our services, search visibility and how a project gets started.</p>
          </div>
          <div className="divide-y divide-white/10 border-y border-white/10">
            {homepageFaqs.map(({ question, answer }) => (
              <details key={question} className="group py-5">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-5 text-base font-semibold text-white marker:hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF6801] [&::-webkit-details-marker]:hidden">
                  {question}<ChevronDown className="h-5 w-5 shrink-0 text-[#FF6801] transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <p className="max-w-3xl pt-3 pr-8 text-sm leading-7 text-white/68">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
