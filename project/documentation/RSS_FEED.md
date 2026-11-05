# RSS Feed (Pinterest Auto-Publish)

Live URLs:
- **https://crea8ivmedia.com/rss.xml** (primary)
- **https://crea8ivmedia.com/feed.xml** (alias, identical content)

Paste `https://crea8ivmedia.com/rss.xml` into Pinterest's RSS auto-publish field after claiming the domain (the `p:domain_verify` meta tag is already in every page's `<head>` — `frontend/src/app/layout.tsx`).

## How it works

```
project/documentation/blog-drafts/*.md   (frontmatter + markdown)
              │
              ▼
frontend/src/lib/wordpress/manual-posts.ts   (parses drafts → WPPost objects,
              │                                same shape as live WordPress posts,
              │                                with Yoast-style og_image/schema)
              ▼
frontend/src/lib/wordpress/index.ts → getAllPosts()   (tries live WP first,
              │                                         falls back to manual
              │                                         posts — WP is offline
              │                                         right now, so this is
              │                                         always the manual list)
              ▼
frontend/src/lib/rss.ts → generateRssXml()   (pure XML string builder)
              │
              ▼
frontend/src/app/rss.xml/route.ts  ──┐
frontend/src/app/feed.xml/route.ts ──┴── re-exports the same GET handler
              │
              ▼
      out/rss.xml, out/feed.xml   (written once, at `npm run export` time)
```

**No runtime database or API calls.** Under `output: 'export'` (this project's static-export build mode), a Route Handler with no dynamic segments and `export const dynamic = "force-static"` runs exactly once, at build time, and its response is written to a static file — the same mechanism Next.js uses for `sitemap.xml` and `robots.txt` in this app. There is no server process live on Hostinger; the exported `.xml` files are served as-is by LiteSpeed.

## Publishing a new post = feed updates automatically

Add a new `project/documentation/blog-drafts/YYYY-MM-DD-slug.md` file (the same frontmatter format every existing draft uses: `title`, `slug`, `publish_date`, `category`, optional `meta_title`/`meta_description`/`cover_alt`). The next `npm run export` picks it up automatically — **no manual RSS editing, ever.** It will appear in the feed as long as its `publish_date` is not in the future relative to build time (see `isPublishable()` in `manual-posts.ts`), same rule the blog listing page already follows.

If/when the live WordPress API comes back online, `getAllPosts()` merges live posts with manual drafts automatically (`mergePosts()`), so the feed keeps working without code changes either way.

## Deploying a feed update

The live site is a static export uploaded to Hostinger via rsync — there is no CI/CD pipeline. After adding a post:

```bash
cd frontend
npm run export                     # regenerates out/rss.xml + out/feed.xml
node scripts/test-rss-feed.mjs     # validates before you ship it
```

Then rsync `out/rss.xml`, `out/feed.xml`, and the changed `out/blog/<slug>/` (or whichever pages) to the server — see `project/documentation/DEPLOYMENT.md` and the memory note `perf-overhaul-2026-07` for the exact rsync invocation and the list of pages that are currently safe to redeploy while the WordPress backend is offline.

## Feed structure

Each `<item>` contains every field Pinterest and generic feed readers look for:

| Requirement | Element | Notes |
|---|---|---|
| Title | `<title>` | decoded, HTML-stripped |
| Canonical URL | `<link>` | absolute, e.g. `https://crea8ivmedia.com/blog/<slug>/` |
| Permalink GUID | `<guid isPermaLink="true">` | same as `<link>` |
| Publish date | `<pubDate>` | RFC-822 (`Date.toUTCString()`), e.g. `Tue, 21 Jul 2026 08:00:00 GMT` |
| Author | `<dc:creator>` | CDATA-wrapped name |
| Category | `<category>` (+ `<category domain="post_tag">` per tag) | WordPress's own convention |
| SEO description | `<description>` | CDATA, from Yoast description / excerpt |
| Full content | `<content:encoded>` | CDATA-wrapped HTML — helps feed readers, Google, Bing, AI crawlers digest the full article, not just a snippet |
| **Featured image (Pinterest)** | `<image>`, `<media:content url="..." medium="image" />`, `<enclosure url="..." length="..." type="image/webp" />` | **all three point at the same absolute image URL** — Pinterest's crawler has historically been inconsistent about which tag it reads from, so the image is deliberately repeated across all three |

Channel-level: `<title>`, `<link>`, `<description>`, `<language>`, `<lastBuildDate>`, `<generator>`, a proper RSS 2.0 `<image>` (logo), and a self-referencing `<atom:link rel="self">` (RSS-validator best practice).

Namespaces declared: `media` (Yahoo Media RSS, for `media:content`), `content` (RSS content module, for `content:encoded`), `dc` (Dublin Core, for `dc:creator`), `atom` (for the self-link).

### Image rules (enforced by `src/lib/rss.ts`)

- Always **absolute** (`https://crea8ivmedia.com/...`) — never relative. `toAbsoluteUrl()` guarantees this even if the underlying Yoast/manual-post data has a root-relative path.
- Sourced from the same Open Graph image every other SEO surface uses (`getOpenGraphImage()` — shared with the blog detail page's OG/Twitter/JSON-LD tags, so the feed image always matches what's on the actual page).
- Current covers are 1280×720 (comfortably over Pinterest's 1000px+ minimum).
- `<enclosure length>` is the **real file size in bytes**, read from the file on disk at build time (`fileLengthForUrl()`), falling back to `"0"` only if the image isn't a local file the build can measure.

## Feed discovery

Every page's `<head>` includes:
```html
<link rel="alternate" type="application/rss+xml" title="Crea8iv Media Blog RSS Feed" href="/rss.xml" />
```
This lets feed readers, some crawlers, and Pinterest's own site-scan auto-detect the feed without the URL being pasted manually.

## Content-Type on the live host

Route handlers' response headers (`Content-Type: application/rss+xml`) only apply to `next dev` / `next start` — the deployed site is a static export served entirely by LiteSpeed, which decides Content-Type by file extension. Both `.xml` files would otherwise serve as `application/xml` (same as `sitemap.xml`). `frontend/public/.htaccess` adds:

```apache
<Files "rss.xml">
  ForceType application/rss+xml
</Files>
<Files "feed.xml">
  ForceType application/rss+xml
</Files>
```

plus matching `Cache-Control: public, max-age=3600` and gzip/Brotli compression rules. Verified live via `curl -I https://crea8ivmedia.com/rss.xml` → `content-type: application/rss+xml`.

## Validation

Run after every export:
```bash
node scripts/test-rss-feed.mjs
```

Checks performed:
- Well-formed XML (`xmllint --noout`)
- RSS 2.0 root element + all four namespace declarations present
- `rss.xml` and `feed.xml` produce identical content (ignoring the build timestamp)
- Every `<item>` has: title, absolute link, `guid isPermaLink="true"`, a valid RFC-822 `pubDate`, `dc:creator`, at least one `category`, `description`, `image`, `media:content`, `enclosure` (with type + byte length)
- Every image URL is absolute and same-origin (`https://crea8ivmedia.com`)

As of this writing: **28 passed, 0 failed** — 28 articles detected in the feed.

## Pinterest compatibility checklist

- [x] Valid RSS 2.0 XML (not JSON)
- [x] Served with `Content-Type: application/rss+xml`
- [x] Every item includes title, link, guid, pubDate, description
- [x] Every item includes an absolute featured-image URL, repeated across `<image>`, `<media:content>`, and `<enclosure>`
- [x] Images are 1000px+ wide (1280×720)
- [x] Author, category, and tags (when present) included per item
- [x] Full-content `<content:encoded>` for richer feed-reader/crawler support
- [x] New posts appear automatically on the next `npm run export` — no manual feed editing
- [x] `p:domain_verify` meta tag present site-wide for Pinterest domain claiming
- [x] `<link rel="alternate">` feed-discovery tag in every page's `<head>`
- [x] Feed validates as well-formed XML (`xmllint`) and passes structural RSS 2.0 checks
- [x] Generated at build time only — zero runtime database/API calls
