"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CalendarDays, Clock, Search, Sparkles } from "lucide-react";
import styles from "./blog-archive.module.css";

export type BlogArchiveItem = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readingTime: number;
  searchText: string;
};

type BlogArchiveClientProps = {
  posts: BlogArchiveItem[];
  allPosts: BlogArchiveItem[];
  currentPage: number;
  totalPages: number;
  isFirstPage: boolean;
};

const preferredCategoryOrder = [
  "All",
  "AI Search Optimization",
  "SEO",
  "Local SEO",
  "Paid Ads",
  "Web Development",
  "AI Automation",
  "Brand Authority",
  "Digital Marketing",
];

function archivePath(page: number) {
  return page <= 1 ? "/blog/" : `/blog/page/${page}/`;
}

function getCategoryOptions(posts: BlogArchiveItem[]) {
  const categories = new Set(posts.map((post) => post.category));
  return preferredCategoryOrder
    .filter((category) => category === "All" || categories.has(category))
    .concat([...categories].filter((category) => !preferredCategoryOrder.includes(category)).sort());
}

function Pagination({ currentPage, totalPages }: { currentPage: number; totalPages: number }) {
  if (totalPages <= 1) return null;

  return (
    <nav className={`${styles.pagination} mt-12 flex flex-wrap items-center justify-center gap-2`} aria-label="Blog archive pagination">
      {currentPage > 1 ? (
        <Link
          href={archivePath(currentPage - 1)}
          className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white/70 transition hover:border-brand-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300"
        >
          Previous
        </Link>
      ) : null}

      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => {
        const isCurrent = page === currentPage;
        return (
          <Link
            key={page}
            href={archivePath(page)}
            aria-current={isCurrent ? "page" : undefined}
            className={
              isCurrent
                ? "rounded-full border border-brand-500 bg-brand-500 px-4 py-2 text-sm font-bold text-white shadow-glow-sm"
                : "rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white/70 transition hover:border-brand-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300"
            }
          >
            {page}
          </Link>
        );
      })}

      {currentPage < totalPages ? (
        <Link
          href={archivePath(currentPage + 1)}
          className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white/70 transition hover:border-brand-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300"
        >
          Next
        </Link>
      ) : null}
    </nav>
  );
}

function BlogCard({ post, featured = false }: { post: BlogArchiveItem; featured?: boolean }) {
  return (
    <article
      className={`${styles.card} ${featured ? styles.featured : "cm-blog-card"}`}
    >
      <Link
        href={`/blog/${post.slug}/`}
        className={styles.media}
        aria-label={post.title}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.image}
          alt={post.title}
          loading={featured ? "eager" : "lazy"}
          width={1200}
          height={750}
        />
      </Link>

      <div className={styles.copy}>
        {featured ? (
          <span className={styles.category}>
            {post.category}
          </span>
        ) : null}

        <h2>
          <Link
            href={`/blog/${post.slug}/`}
          >
            {post.title}
          </Link>
        </h2>

        <p className={styles.excerpt}>
          {post.excerpt}
        </p>

        <div className={styles.meta}>
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
            <CalendarDays className="h-3.5 w-3.5 shrink-0 text-brand-500" />
            {post.date}
          </span>
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
            <Clock className="h-3.5 w-3.5 shrink-0 text-brand-500" />
            {post.readingTime} min read
          </span>
          <Link
            href={`/blog/${post.slug}/`}
            className={styles.read}
            aria-label={`Read ${post.title}`}
          >
            Read
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function BlogArchiveClient({
  posts,
  allPosts,
  currentPage,
  totalPages,
  isFirstPage,
}: BlogArchiveClientProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");
  const categories = useMemo(() => getCategoryOptions(allPosts), [allPosts]);
  const normalizedQuery = query.trim().toLowerCase();
  const isFilteredView = activeCategory !== "All" || normalizedQuery.length > 0;
  const sourcePosts = isFilteredView ? allPosts : posts;
  const filteredPosts = useMemo(
    () =>
      sourcePosts.filter((post) => {
        const matchesCategory = activeCategory === "All" || post.category === activeCategory;
        const matchesQuery = !normalizedQuery || post.searchText.includes(normalizedQuery);
        return matchesCategory && matchesQuery;
      }),
    [activeCategory, normalizedQuery, sourcePosts]
  );
  const [featuredPost, ...firstPagePosts] = filteredPosts;
  const gridPosts = !isFilteredView && isFirstPage ? firstPagePosts : filteredPosts;

  return (
    <>
      <section className="blog-archive-shell relative mb-7">
        <p className="mb-8 inline-flex items-center gap-4 font-orbitron text-[10px] uppercase tracking-[0.42em] text-brand-300">
          <span className="h-px w-8 bg-brand-500" />
          Insights & Strategy
        </p>
        <h1 className="max-w-[920px] font-orbitron text-[clamp(2.6rem,6vw,4.8rem)] font-semibold leading-[0.96] tracking-normal text-white">
          {currentPage === 1 ? "The Crea8iv Media Blog" : `The Crea8iv Media Blog - Page ${currentPage}`}
        </h1>
        <p className="mt-7 max-w-[760px] text-base leading-8 text-white/62 sm:text-lg">
          Practical digital marketing, Meta & Google Ads, local SEO, content and AI strategy for
          businesses in Rawalpindi, Islamabad & across Pakistan.
        </p>
        <p className="mt-4 inline-flex items-center gap-2 text-sm text-white/52">
          <Sparkles className="h-3.5 w-3.5 text-brand-500" />
          Showing {filteredPosts.length} of {allPosts.length} published articles.
        </p>
      </section>

      <section className={`${styles.filters} mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between`}>
        <div className={styles.categories}>
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            );
          })}
        </div>

        <label className={`${styles.search} relative block w-full max-w-[340px] lg:max-w-[380px]`}>
          <span className="sr-only">Search articles</span>
          <Search className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-300" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search articles..."
            className="h-[58px] w-full rounded-full border border-white/24 bg-black/28 pl-12 pr-5 text-sm text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] outline-none transition placeholder:text-white/35 focus:border-brand-300 focus:bg-black/46 focus:shadow-[0_0_34px_rgba(255,104,1,0.12)]"
          />
        </label>
      </section>

      {!isFilteredView && isFirstPage && featuredPost ? <BlogCard post={featuredPost} featured /> : null}

      {gridPosts.length ? (
        <section className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 xl:gap-7">
          {gridPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </section>
      ) : (
        <section className="mt-10 rounded-[8px] border border-white/12 bg-white/[0.035] p-8 text-center text-white/62">
          No articles matched this filter.
        </section>
      )}

      {!isFilteredView ? <Pagination currentPage={currentPage} totalPages={totalPages} /> : null}

      <section className={styles.invitation}>
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="font-syne text-2xl font-bold text-white">Need a growth plan for your market?</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/65">
              Book a strategy call with Crea8iv Media for SEO, paid ads, and conversion systems tailored to
              Pakistan, Rawalpindi, and Islamabad audiences.
            </p>
          </div>
          <Link
            href="/consultation/"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-500 px-5 py-3 text-sm font-bold text-white shadow-glow-sm transition hover:bg-brand-400"
          >
            Book strategy call
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
