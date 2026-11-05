import ContentShell from "@/components/wordpress/ContentShell";
import { BlogArchiveClient, type BlogArchiveItem } from "@/app/(global)/blog/BlogArchiveClient";
import { BLOG_POSTS_PER_PAGE } from "@/lib/blog-pagination";
import { formatWpDate, normalizeWpUrl, stripHtml } from "@/lib/wordpress";
import { SITE_URL } from "@/lib/site-config";
import { PAGE_METADATA } from "@/lib/seo-metadata";
import type { WPPost } from "@/types/wordpress";

function decodeEntities(value: string) {
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#8217;/g, "'")
    .replace(/&#038;/g, "&");
}

function getPostTitle(post: WPPost) {
  return decodeEntities(stripHtml(post.title.rendered));
}

function getPostExcerpt(post: WPPost) {
  const excerpt = decodeEntities(stripHtml(post.excerpt.rendered || post.content.rendered));
  return excerpt.length > 178 ? `${excerpt.slice(0, 178).trim()}...` : excerpt;
}

function getPostImage(post: WPPost) {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  return normalizeWpUrl(
    media?.media_details?.sizes?.large?.source_url ||
      media?.media_details?.sizes?.medium_large?.source_url ||
      media?.source_url ||
      `${SITE_URL}/img/crea8iv-white-3d-logo.webp`
  );
}

function getReadingTime(post: WPPost) {
  const words = stripHtml(post.content.rendered).split(/\s+/).filter(Boolean).length;
  return Math.max(3, Math.ceil(words / 220));
}

function getCategoryLabel(post: WPPost) {
  const title = getPostTitle(post);
  const excerpt = stripHtml(post.excerpt.rendered || post.content.rendered);
  const haystack = `${post.slug} ${title} ${excerpt}`.toLowerCase();

  if (/(ai search|chatgpt|gemini|claude|perplexity|llmo|geo|aeo|ai overview|ai visibility|citation|knowledge graph|semantic search)/i.test(haystack)) {
    return "AI Search Optimization";
  }

  if (/(founder|brand|branding|authority|entity|syed qamar abbas|crea8iv media)/i.test(haystack)) {
    return "Brand Authority";
  }

  if (/(website|wordpress|next\.js|laravel|core web vitals|web development|landing page|website design)/i.test(haystack)) {
    return "Web Development";
  }

  if (/(automation|whatsapp|crm|booking|follow-up|reminders|saas)/i.test(haystack)) {
    return "AI Automation";
  }

  if (/(google ads|meta ads|facebook ads|instagram ads|paid ads|ad spend|lead generation)/i.test(haystack)) {
    return "Paid Ads";
  }

  if (/(google business profile|google maps|local seo|reviews|dentist|restaurant|salon|clinic|rawalpindi|islamabad)/i.test(haystack)) {
    return "Local SEO";
  }

  if (/(technical seo|semantic seo|entity seo|seo\b|search console|rankings?|organic search)/i.test(haystack)) {
    return "SEO";
  }

  const embeddedCategory = post._embedded?.["wp:term"]?.flat()?.find((term) => term?.name);
  if (embeddedCategory?.name && !/uncategorized/i.test(embeddedCategory.name)) {
    return decodeEntities(embeddedCategory.name);
  }

  return "Digital Marketing";
}

function toBlogArchiveItem(post: WPPost): BlogArchiveItem {
  const title = getPostTitle(post);
  const excerpt = getPostExcerpt(post);
  const category = getCategoryLabel(post);

  return {
    id: post.id,
    slug: post.slug,
    title,
    excerpt,
    image: getPostImage(post),
    category,
    date: formatWpDate(post.date),
    readingTime: getReadingTime(post),
    searchText: `${title} ${excerpt} ${category} ${post.slug}`.toLowerCase(),
  };
}

function archivePath(page: number) {
  return page <= 1 ? "/blog/" : `/blog/page/${page}/`;
}

type BlogArchiveProps = {
  posts: WPPost[];
  allPosts: WPPost[];
  currentPage: number;
  totalPages: number;
};

export function BlogArchive({ posts, allPosts, currentPage, totalPages }: BlogArchiveProps) {
  if (allPosts.length === 0) {
    return (
      <ContentShell title="Insights" eyebrow="Crea8iv Media Blog">
        <div className="mx-auto max-w-3xl px-4 py-24 text-center text-white/70">
          <p>Our latest articles are temporarily unavailable. Please check back shortly.</p>
        </div>
      </ContentShell>
    );
  }

  const isFirstPage = currentPage === 1;
  const pageOffset = (currentPage - 1) * BLOG_POSTS_PER_PAGE;
  const archivePosts = posts.map(toBlogArchiveItem);
  const allArchivePosts = allPosts.map(toBlogArchiveItem);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}${archivePath(currentPage)}#webpage`,
        url: `${SITE_URL}${archivePath(currentPage)}`,
        name: currentPage === 1 ? PAGE_METADATA.blog.title : `${PAGE_METADATA.blog.title} - Page ${currentPage}`,
        description: PAGE_METADATA.blog.description,
        abstract: PAGE_METADATA.blog.summary,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        inLanguage: "en-US",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}${archivePath(currentPage)}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog/` },
          ...(currentPage > 1
            ? [{ "@type": "ListItem", position: 3, name: `Page ${currentPage}`, item: `${SITE_URL}${archivePath(currentPage)}` }]
            : []),
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}${archivePath(currentPage)}#posts`,
        itemListElement: posts.map((post, index) => ({
          "@type": "ListItem",
          position: pageOffset + index + 1,
          url: `${SITE_URL}/blog/${post.slug}/`,
          name: getPostTitle(post),
        })),
      },
    ],
  };

  return (
    <ContentShell>
      <main className="native-page mx-auto max-w-[1360px] px-5 pb-24 pt-44 sm:px-8 lg:px-10">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <BlogArchiveClient
          posts={archivePosts}
          allPosts={allArchivePosts}
          currentPage={currentPage}
          totalPages={totalPages}
          isFirstPage={isFirstPage}
        />
      </main>
    </ContentShell>
  );
}
