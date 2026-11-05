import type { ContentType, WPPage, WPPost, WPYoastMeta } from "@/types/wordpress";
import { SITE_URL } from "@/lib/site-config";
import { getCmsPublishedPosts } from "@/lib/admin/public-posts";
import { getDraftUpdatedIsoDate, getManualPosts } from "@/lib/wordpress/manual-posts";
import { readFile } from "fs/promises";
import path from "path";
export { cleanWpHtml, extractWpDocumentParts } from "@/lib/wordpress/html";

const WORDPRESS_SITE_URL =
  process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL ||
  process.env.NEXT_PUBLIC_WP_URL ||
  SITE_URL;

const WORDPRESS_REST_API_URL =
  process.env.WORDPRESS_REST_API_URL ||
  process.env.WP_API_URL ||
  `${WORDPRESS_SITE_URL}/wp-json/wp/v2`;

const WORDPRESS_GRAPHQL_URL =
  process.env.WORDPRESS_GRAPHQL_URL ||
  `${WORDPRESS_SITE_URL}/graphql`;

const WORDPRESS_DATA_SOURCE =
  (process.env.WORDPRESS_DATA_SOURCE || "rest").toLowerCase();

const WORDPRESS_USERNAME =
  process.env.WORDPRESS_USERNAME || process.env.WP_USERNAME || "";

const WORDPRESS_APPLICATION_PASSWORD =
  process.env.WORDPRESS_APPLICATION_PASSWORD ||
  process.env.WP_APP_PASSWORD ||
  "";

const authHeaders: Record<string, string> =
  WORDPRESS_USERNAME && WORDPRESS_APPLICATION_PASSWORD
    ? {
        Authorization: `Basic ${Buffer.from(
          `${WORDPRESS_USERNAME}:${WORDPRESS_APPLICATION_PASSWORD.replace(/\s+/g, "")}`
        ).toString("base64")}`,
      }
    : {};

type SnapshotPage = {
  id: number;
  slug: string;
  link: string;
  title: string;
  content: string;
  excerpt: string;
  parent?: number;
  menuOrder?: number;
  seo?: {
    title?: string;
    description?: string;
    canonical?: string;
    og_title?: string;
    og_description?: string;
    og_url?: string;
    og_site_name?: string;
    twitter_card?: string;
    article_modified_time?: string;
    og_image?: Array<{ url: string; width: number; height: number }>;
    schema?: object;
  };
};

let snapshotPagesPromise: Promise<WPPage[]> | null = null;

async function loadSnapshotPages(): Promise<WPPage[]> {
  if (!snapshotPagesPromise) {
    const snapshotCandidates = [
      path.join(process.cwd(), "..", "project", "public-website", "astro", "src", "data", "pages.json"),
      path.join(process.cwd(), "project", "public-website", "astro", "src", "data", "pages.json"),
      path.join(process.cwd(), "..", "..", "project", "public-website", "astro", "src", "data", "pages.json"),
    ];

    snapshotPagesPromise = Promise.any(
      snapshotCandidates.map((candidate) => readFile(candidate, "utf8")),
    )
      .then((raw) => JSON.parse(raw) as SnapshotPage[])
      .then((pages) =>
        pages.map((page) => ({
          id: page.id,
          slug: page.slug,
          status: "publish",
          link: page.link.startsWith("http") ? page.link : `${SITE_URL}${page.link}`,
          title: { rendered: page.title },
          content: { rendered: page.content, protected: false },
          excerpt: { rendered: page.excerpt, protected: false },
          featured_media: 0,
          date: page.seo?.article_modified_time || "",
          modified: page.seo?.article_modified_time || "",
          parent: page.parent || 0,
          menu_order: page.menuOrder || 0,
          yoast_head_json: page.seo
            ? {
                title: page.seo.title,
                description: page.seo.description,
                og_title: page.seo.og_title,
                og_description: page.seo.og_description,
                og_image: page.seo.og_image,
                og_url: page.seo.og_url,
                og_site_name: page.seo.og_site_name,
                twitter_card: page.seo.twitter_card,
                schema: page.seo.schema,
              }
            : undefined,
        })),
      )
      .catch(() => []);
  }

  return snapshotPagesPromise;
}

async function wordpressFetch<T>(
  path: string,
  init?: RequestInit,
  searchParams?: Record<string, string | number | boolean>
): Promise<T> {
  if (WORDPRESS_DATA_SOURCE === "snapshot") throw new Error("Snapshot-only build: live WordPress fetch disabled");
  const url = new URL(`${WORDPRESS_REST_API_URL}${path}`);

  if (searchParams) {
    Object.entries(searchParams).forEach(([key, value]) => {
      url.searchParams.set(key, String(value));
    });
  }

  // In development: skip the Next.js data cache entirely so stale/empty
  // cached responses never cause 404s. In production, ISR at 60 s is used.
  const cacheStrategy: RequestInit =
    process.env.NODE_ENV === "development"
      ? { cache: "no-store" }
      : { next: { revalidate: 60 } };

  // Retry transient failures (network blips, 429 rate-limit, 5xx) so a brief
  // WordPress hiccup never turns into a 404 for the visitor.
  const maxAttempts = 3;
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const response = await fetch(url.toString(), {
        ...init,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          ...authHeaders,
          ...(init?.headers || {}),
        },
        ...cacheStrategy,
      });

      // Retry on rate-limit / server errors; fail fast on real client errors.
      if (response.status === 429 || response.status >= 500) {
        throw new Error(`WordPress REST ${response.status} (retryable) at ${url.toString()}`);
      }

      if (!response.ok) {
        throw new Error(`WordPress REST error ${response.status} at ${url.toString()}`);
      }

      return (await response.json()) as T;
    } catch (error) {
      lastError = error;
      if (attempt < maxAttempts) {
        await new Promise((r) => setTimeout(r, attempt * 300));
      }
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error(`WordPress REST request failed at ${url.toString()}`);
}

async function getCollection<T>(
  path: string,
  searchParams?: Record<string, string | number | boolean>
): Promise<T[]> {
  const firstUrl = new URL(`${WORDPRESS_REST_API_URL}${path}`);
  const params = { per_page: 100, ...searchParams };

  Object.entries(params).forEach(([key, value]) => {
    firstUrl.searchParams.set(key, String(value));
  });

  const collectionCacheStrategy: RequestInit =
    process.env.NODE_ENV === "development"
      ? { cache: "no-store" }
      : { next: { revalidate: 60 } };

  const firstResponse = await fetch(firstUrl.toString(), {
    headers: {
      Accept: "application/json",
      ...authHeaders,
    },
    ...collectionCacheStrategy,
  });

  if (!firstResponse.ok) {
    throw new Error(`WordPress REST error ${firstResponse.status} at ${firstUrl.toString()}`);
  }

  const totalPages = Number(firstResponse.headers.get("x-wp-totalpages") || "1");
  const firstBatch = (await firstResponse.json()) as T[];

  if (totalPages <= 1) {
    return firstBatch;
  }

  const remaining = await Promise.all(
    Array.from({ length: totalPages - 1 }, (_, index) =>
      wordpressFetch<T[]>(path, undefined, {
        ...params,
        page: index + 2,
      })
    )
  );

  return firstBatch.concat(...remaining);
}

export async function graphqlRequest<T>(query: string, variables?: Record<string, unknown>) {
  if (WORDPRESS_DATA_SOURCE !== "graphql") {
    throw new Error("GraphQL mode is disabled. Enable WORDPRESS_DATA_SOURCE=graphql after WPGraphQL is installed.");
  }

  const { GraphQLClient } = await import("graphql-request");
  const client = new GraphQLClient(WORDPRESS_GRAPHQL_URL, {
    headers: {
      ...authHeaders,
    },
  });
  return client.request<T>(query, variables);
}

export function normalizeWpUrl(url: string) {
  return url
    .replace(/https:\/\/darkgray-eland-964548\.hostingersite\.com/gi, WORDPRESS_SITE_URL)
    .replace(new RegExp(`${WORDPRESS_SITE_URL}/?`, "gi"), "/");
}

export function stripHtml(html: string) {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function getSeoTitle(content: ContentType) {
  return content.yoast_head_json?.title || content.title.rendered;
}

export function getSeoDescription(content: ContentType) {
  return (
    content.yoast_head_json?.description ||
    content.yoast_head_json?.og_description ||
    stripHtml(content.excerpt.rendered || content.content.rendered).slice(0, 160)
  );
}

export function getOpenGraphImage(meta?: WPYoastMeta) {
  const image = meta?.og_image?.[0]?.url;
  if (!image || /crea8iv-media-vector/i.test(image)) {
    return `${WORDPRESS_SITE_URL}/img/crea8iv-search-preview.png`;
  }
  return image;
}

async function mergePosts(livePosts: WPPost[], manualPosts = getManualPosts()) {
  const cmsPosts = await getCmsPublishedPosts().catch(() => []);
  const bySlug = new Map<string, WPPost>();

  for (const post of cmsPosts) {
    bySlug.set(post.slug, post);
  }

  for (const post of manualPosts) {
    if (!bySlug.has(post.slug)) {
      bySlug.set(post.slug, post);
    }
  }

  for (const post of livePosts) {
    if (!bySlug.has(post.slug)) {
      bySlug.set(post.slug, post);
    }
  }

  return Array.from(bySlug.values()).sort(
    (a, b) => +new Date(b.date) - +new Date(a.date)
  );
}

function applyDraftFreshness(post: WPPost) {
  const updatedAt = getDraftUpdatedIsoDate(post.slug);
  if (!updatedAt) return post;

  return {
    ...post,
    modified: updatedAt,
    yoast_head_json: post.yoast_head_json
      ? {
          ...post.yoast_head_json,
          schema:
            post.yoast_head_json.schema && typeof post.yoast_head_json.schema === "object"
              ? {
                  ...(post.yoast_head_json.schema as Record<string, unknown>),
                  dateModified: updatedAt,
                }
              : post.yoast_head_json.schema,
        }
      : post.yoast_head_json,
  };
}

export async function getAllPages() {
  try {
    return await getCollection<WPPage>("/pages", { status: "publish", _embed: 1 });
  } catch {
    return loadSnapshotPages();
  }
}

export async function getAllPosts() {
  try {
    return (await mergePosts(await getCollection<WPPost>("/posts", { status: "publish", _embed: 1 }))).map(
      applyDraftFreshness
    );
  } catch {
    return (await mergePosts([])).map(applyDraftFreshness);
  }
}

export async function getPageBySlug(slug: string) {
  try {
    const pages = await wordpressFetch<WPPage[]>("/pages", undefined, {
      slug,
      status: "publish",
      _embed: 1,
    });
    return pages[0] ?? null;
  } catch {
    const snapshotPages = await loadSnapshotPages();
    return snapshotPages.find((page) => page.slug === slug) ?? null;
  }
}

export async function getPostBySlug(slug: string) {
  const cms = (await getCmsPublishedPosts().catch(() => [])).find((post) => post.slug === slug) ?? null;
  if (cms) {
    return applyDraftFreshness(cms);
  }

  const manual = getManualPosts().find((post) => post.slug === slug) ?? null;

  if (manual) {
    return applyDraftFreshness(manual);
  }

  try {
    const posts = await wordpressFetch<WPPost[]>("/posts", undefined, {
      slug,
      status: "publish",
      _embed: 1,
    });
    return posts[0] ? applyDraftFreshness(posts[0]) : null;
  } catch {
    return null;
  }
}

export async function getRecentPosts(count = 3) {
  try {
    const livePosts = await wordpressFetch<WPPost[]>("/posts", undefined, {
      per_page: count,
      status: "publish",
      _embed: 1,
      orderby: "date",
      order: "desc",
    });
    return (await mergePosts(livePosts)).map(applyDraftFreshness).slice(0, count);
  } catch {
    return (await mergePosts([])).map(applyDraftFreshness).slice(0, count);
  }
}

export async function getFrontPage() {
  const homePage = await getPageBySlug("home");
  if (homePage) {
    return homePage;
  }

  return wordpressFetch<WPPage>("/pages/2206", undefined, { _embed: 1 });
}

export async function resolveContentBySlug(slug: string) {
  let page: WPPage | null = null;
  try {
    page = await getPageBySlug(slug);
  } catch {
    page = null;
  }
  if (page) {
    return { type: "page" as const, data: page };
  }

  const post = await getPostBySlug(slug);
  if (post) {
    return { type: "post" as const, data: post };
  }

  return null;
}

export async function getAllSlugs() {
  const [pages, posts] = await Promise.all([
    getAllPages().catch(() => []),
    getAllPosts().catch(() => []),
  ]);
  return [
    ...pages.map((page) => ({ slug: page.slug })),
    ...posts.map((post) => ({ slug: post.slug })),
  ];
}

export function formatWpDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-PK", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Karachi",
  });
}
