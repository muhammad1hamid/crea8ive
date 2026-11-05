# Crea8iv Media — 2026 SEO, GEO, SXO, SGE & LLMO Audit

**Website:** https://crea8ivmedia.com  
**Audit date:** 21 June 2026  
**Scope:** 21 published WordPress pages, 21 published posts, and 1 native software page (43 canonical routes)  
**Constraint:** Preserve the existing interface, layout, branding, animation behavior, spacing, and normal-state colors.

## Executive summary

The site has strong topical coverage, valid HTTPS, self-referencing canonicals, useful local intent, and no remaining casino-spam posts in the public WordPress API. The current live build nevertheless has systemic metadata, rendering, crawl, performance, and accessibility defects that reduce search clarity and AI extractability.

The safest high-impact fixes have been implemented in the frontend codebase. The optimized export now passes a 43-route rendered crawl with:

- 43/43 routes returning HTTP 200.
- 0 duplicate titles or descriptions.
- 0 titles over 65 rendered characters.
- 0 meta descriptions over 160 characters.
- Exactly 1 H1 on every route.
- 0 broken internal links.
- 0 orphan canonical routes.
- 0 missing form-control labels.
- 0 invalid JSON-LD blocks.
- WebPage-family and BreadcrumbList schema coverage on every applicable route.
- Server-rendered WordPress content on every page, rather than client-only body copy.

The principal unresolved issue is legacy color contrast. Fixing it would require a visible color change, which conflicts with the explicit preservation requirement. Production deployment and post-deploy field validation are also still required.

## Audit methodology

1. Queried the public WordPress REST API to inventory all published pages and posts.
2. Crawled all 43 rendered routes in Chromium.
3. Compared raw server HTML with the hydrated DOM.
4. Checked metadata, canonicals, Open Graph, Twitter cards, heading structure, image attributes, form labels, landmarks, internal links, and JSON-LD.
5. Ran WCAG 2.1 A/AA checks with axe-core.
6. Ran Lighthouse against the live homepage and optimized local templates.
7. Tested desktop at 1440 × 1000 and mobile at 390 × 844.
8. Built both the normal Next.js production build and the Hostinger static export.

## Prioritized findings and actions

| Priority | Finding | Evidence | Applied fix | Expected impact |
|---|---|---|---|---|
| High | WordPress page titles were branded twice | 21 page titles rendered forms such as `... | Crea8iv Media | Crea8iv Media` | Added centrally managed, unique, absolute page titles | Cleaner SERP display, stronger query targeting, higher CTR potential |
| High | Meta descriptions were too long | 13 routes exceeded 160 characters; one reached 373 | Added unique 120–155-character descriptions | Less truncation and clearer search-result value propositions |
| High | Important WordPress body content was client-only | Raw HTML on 11 pages contained fewer than 100 meaningful words while rendered DOM contained up to thousands | Server-rendered the cleaned WordPress content while retaining hydration-safe enhancements | Better crawlability for search engines and non-JavaScript AI crawlers; faster useful paint |
| High | Live sitemap index contains low-value CMS URLs | Live Yoast index exposes 115 URLs across templates, headers, footers, products, taxonomies, forms, teams, and authors | Added a canonical 43-URL sitemap and a legacy `sitemap_index.xml` pointer | Cleaner indexation, lower crawl waste, fewer thin/duplicate URLs |
| High | `/llms.txt` returned 404 | Live request returned a WordPress 404 | Added a 2026 `llms.txt` with entity, service, location, trust, and citation context | Better AI-agent discovery and more reliable brand/entity extraction |
| High | Missing WebPage schema layer | No audited route exposed WebPage schema before remediation | Added WebPage, AboutPage, ContactPage, or CollectionPage as appropriate | Stronger graph relationships and machine understanding |
| High | Incomplete schema graph | WebSite lacked SearchAction; many pages lacked breadcrumbs; pricing schema was stripped inside injected HTML | Added SearchAction, LocalBusiness typing, stable entity IDs, BreadcrumbList coverage, server-rendered pricing ItemList, and Article/WebPage relationships | Better eligibility and entity consistency across search and AI systems |
| High | Multiple H1 elements | 14 routes rendered two H1s | Preserved Elementor H1 styling and changed only the duplicate shell heading semantics | Correct hierarchy with no visible type-scale change |
| High | Current live Core Web Vitals are poor | Live mobile lab: Performance 28, LCP 9.97s, TBT 2.20s, 155 requests | Removed legacy WordPress CSS/JS from native Blog and Software templates; retained it only where legacy content needs it | Blog lab score improved 28→79; TBT 2561ms→53ms; requests 103→51 |
| High | Pricing differed between canonical pricing and service summaries | Service pages and machine markup used different starting prices | Aligned service FAQ prices, Service offers, pricing schema, and `pricing.md` to the visible pricing page | Reduces trust loss and prevents conflicting AI answers |
| Medium | FAQ page was orphaned | `/faqs/` had zero internal incoming links | Replaced redundant footer Home link with FAQs | Improved discoverability without increasing footer height |
| Medium | Three internal routes resolved to 404 in the static export | `/software-products`, `/contact-us`, `/teams/leslie-alexander` | Repointed or normalized each to a canonical route | Prevents dead-end journeys and wasted crawl signals |
| Medium | Optional voice asset generated a 404 on every route | `/voice/welcome.mp3` was probed even though the file was absent | Made the premium audio URL opt-in and retained browser speech fallback | Removes a wasted request and recurring 404 noise |
| Medium | Newsletter input had no accessible name | Repeated on all 43 routes | Added an ARIA label and email autocomplete | Improved screen-reader and form usability |
| Medium | Pricing buttons nested links inside buttons | 3 nested interactive controls on the homepage | Preserved button styling and moved navigation behavior to one control | Correct keyboard and assistive-technology behavior |
| Medium | Loading Instagram grid used a prohibited ARIA label | axe detected `aria-label` on a generic div | Added `role="status"` | Correct loading-state announcement |
| Medium | Normal focus styles were suppressed in several components | Keyboard focus could be difficult to locate | Added a keyboard-only brand focus ring | Better keyboard navigation with no pointer-state visual change |
| Medium | AI bot access was only implicit | WordPress robots did not explicitly identify major AI/search crawlers | Added explicit allow rules for OAI-SearchBot, ChatGPT-User, GPTBot, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended, and Bingbot | Clearer machine access policy and lower accidental blocking risk |
| Medium | Machine-readable pricing was absent | No `/pricing.md` | Added a canonical, dated pricing file | Better AI-agent comparison and pricing extraction |
| Low | Decorative images use empty alt text | 13 homepage images had `alt=""`; none lacked the attribute | Kept empty alt for decorative images; descriptive alt remains on meaningful images | Avoids noisy screen-reader output |

## Metadata and content improvements

- Added a central metadata and summary map for all important pages.
- Kept titles concise and differentiated by page intent.
- Kept descriptions natural, local, and human-readable without keyword stuffing.
- Added complete Open Graph and Twitter metadata to native Blog and Software pages.
- Added AI-readable abstracts to WebPage schema.
- Preserved the existing visible copy except for small accuracy corrections to service prices.
- Kept FAQ and answer content visible wherever FAQPage schema is emitted.
- Removed hidden pricing keyword copy and replaced it with accurate server-rendered structured data.

## Structured data coverage

Implemented and syntax-validated JSON-LD now includes:

- Organization
- LocalBusiness + ProfessionalService
- Person
- WebSite
- SearchAction
- WebPage / AboutPage / ContactPage / CollectionPage
- Service
- BreadcrumbList
- BlogPosting
- FAQPage
- ItemList and Offer for visible pricing
- OfferCatalog

Review and AggregateRating schema were deliberately not added. No verified first-party rating dataset was provided, and manufacturing rating markup would violate structured-data guidelines and trust requirements.

## GEO, SGE and LLMO readiness

### Implemented

- Added `/llms.txt` with concise entity and service definitions.
- Added `/pricing.md` for machine-readable commercial terms.
- Added stable `@id` relationships across organization, business, founder, website, pages, services, articles, and breadcrumbs.
- Added first-paragraph answer blocks and FAQ structures to articles and priority service pages.
- Added dated author, publisher, modified-date, word-count, reading-time, and expertise signals to articles.
- Added canonical internal links between related services, articles, pricing, consultation, and results.
- Explicitly allowed major AI search and assistant crawlers.
- Server-rendered the substantive WordPress content so AI systems do not depend on hydration.

### Recommended after deployment

- Track 20 priority prompts monthly across Google AI Overviews, ChatGPT search, Perplexity, Gemini, Claude, and Copilot.
- Record citation source URL, sentiment, competitor citations, and query intent.
- Publish original Pakistan-specific benchmark data with a transparent methodology and source links.
- Earn third-party entity mentions from credible Pakistan business publications, industry directories, review platforms, and client case studies.

## Accessibility audit

### Fixed without visual redesign

- Missing newsletter label.
- Nested interactive controls.
- Invalid loading-state ARIA semantics.
- Keyboard focus visibility.
- One-H1 hierarchy.
- Missing iframe titles and image loading/decoding normalization already present in the content pipeline.

### Remaining contrast issue

Automated WCAG testing still reports contrast failures across the legacy visual system. Representative failures:

- Legacy card copy: approximately 4.24:1 where WCAG AA requires 4.5:1.
- White Subscribe text on orange: approximately 2.88:1 where normal text requires 4.5:1.

These were not changed because the task explicitly requires preserving colors. A future approved micro-adjustment should slightly brighten muted card copy and use the existing dark CTA text token on orange buttons.

## Core Web Vitals and performance

### Current live homepage lab result

| Metric | Result | 2026 target | Status |
|---|---:|---:|---|
| Performance score | 28 | 90+ | Poor |
| LCP | 9.97s | ≤2.5s | Poor |
| TBT lab proxy | 2.20s | ≤200ms | Poor |
| CLS | 0 | ≤0.1 | Pass |
| Requests | 155 | Template-dependent | High |
| Transfer weight | 2.03 MB | Template-dependent | High |

### Safe improvement measured on Blog template

| Metric | Before | After | Change |
|---|---:|---:|---:|
| Performance score | 28 | 79 | +51 points |
| FCP | 4.78s | 2.13s | -55% |
| TBT | 2561ms | 53ms | -98% |
| Requests | 103 | 51 | -50% |
| Stylesheets | 33 | 2 | -94% |
| Scripts | 41 | 18 | -56% |

The remaining homepage and legacy service-page bottleneck is the global Elementor/theme asset set: roughly 30 stylesheets and a large optional script stack. Removing more of it safely requires per-page CSS/animation coverage testing because those assets can affect the exact design and animations.

## Crawl and indexation

- HTTPS, HSTS, security headers, and canonical host are present.
- All optimized routes return 200.
- Canonicals are self-referencing and use the production domain.
- No broken canonical internal links remain.
- The optimized sitemap contains only the 43 canonical routes.
- `robots.txt` points to the optimized sitemap.
- A compatibility `sitemap_index.xml` points legacy submissions to the canonical sitemap.
- Search Console should remove or replace any previously submitted Yoast child sitemaps after deployment.

## Items requiring external access or business confirmation

1. Google Search Console: index coverage, manual actions, query cannibalization, sitemap submission, and field Core Web Vitals.
2. GA4: organic landing-page engagement, conversion rate, and AI referral baselines.
3. Google Business Profile: exact category, coordinates, opening hours, and NAP confirmation.
4. Verified reviews: source, count, rating value, and permission before Review/AggregateRating markup.
5. Production server: Brotli/Gzip, immutable caching for versioned assets, CDN behavior, and redirect rules.

## Validation completed

- TypeScript: pass.
- Next.js production build: pass.
- Hostinger static export: pass.
- Static routes generated: 50 framework routes, including 43 canonical content routes.
- Rendered crawl: 43/43 pass.
- Broken internal links: 0.
- Duplicate titles/descriptions: 0.
- H1 failures: 0.
- Metadata length failures: 0.
- JSON-LD parse failures: 0.
- Desktop visual comparison: matching layout geometry.
- Mobile visual comparison: matching hero geometry and zero horizontal overflow.
- Deployment: not performed.

## Recommended post-deploy sequence

1. Upload the final static export.
2. Purge Hostinger/LiteSpeed and CDN caches.
3. Verify `/robots.txt`, `/sitemap.xml`, `/sitemap_index.xml`, `/llms.txt`, and `/pricing.md` return 200.
4. Re-run Lighthouse and the 43-route crawl against production.
5. Submit only `https://crea8ivmedia.com/sitemap.xml` in Search Console and Bing Webmaster Tools.
6. Request recrawl for Home, Pricing, Blog, About, and the primary service pages.
7. Monitor rankings, conversions, AI citations, and field CWV for 4–8 weeks.
