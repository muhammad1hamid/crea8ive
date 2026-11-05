# Local SEO Rollout

## Goal

Rank `crea8ivmedia.com` more competitively for Rawalpindi and Islamabad commercial-intent searches.

## Priority 1: Technical hygiene

- Refresh Yoast indexables so stale `darkgray-eland-964548.hostingersite.com` canonicals stop appearing on live pages.
- Re-check the XML sitemap and page canonicals after the refresh.
- Keep the REST API and XML sitemaps enabled.

## Priority 2: Core commercial pages

- Align the homepage and main service pages with clear `Rawalpindi` and `Islamabad` intent.
- Use concise titles and excerpts that support local relevance without keyword stuffing.
- Keep service pages focused on one service cluster each:
  - Social Media Management
  - Website Development
  - Google Ads
  - Meta Ads
  - Google Business Profile Growth
  - Content Creation
  - Branding
  - Consultation

## Priority 3: Risk control

- Review and clean the gambling/casino blog content because it weakens local business topical trust.
- Keep blog publishing tightly aligned to digital marketing, web development, local SEO, paid ads, AI automation, and business growth.

### Current cleanup milestone

- Safe live drafting was completed through the REST API without deleting content.
- The site has been reduced from roughly `6320` published posts at discovery to `79` published posts after the full cleanup pass.
- Harmful publicly live gambling/casino-style posts are now at `0`.
- The hardened cleanup script uses per-post retries and small pauses so future maintenance runs can survive temporary Hostinger or WordPress connection resets.

## Priority 4: Local authority

- Expand city/service combinations through useful location-aware copy rather than thin doorway pages.
- Strengthen internal links between the homepage, service pages, contact page, and Google Business Profile page.
- Build location proof across the site with business details, service areas, case studies, and trust signals.

## Priority 5: Technical speed hardening

- Finish Yoast SEO data optimization so the site uses cleaner stored SEO data.
- Review LiteSpeed Cache defaults before changing anything aggressive on the live site.
- Confirm page cache, browser cache, CSS/JS optimization, and image lazy loading are enabled where stable.
- Reduce plugin bloat by reviewing inactive, redundant, and sales-banner-heavy plugins before any deeper tuning.
- Measure homepage and core service pages after cleanup so speed work is tied to real pages that matter for ranking.

### Current speed findings

- Live header checks on the homepage and `/our-services/` confirm the site is being served by LiteSpeed.
- `x-litespeed-cache-control: public,max-age=604800` is already present on key pages, so public page caching is active.
- Static Elementor CSS assets are already returning `cache-control: public, max-age=604800` and `expires` headers, so browser-facing asset caching is already live at the server level.
- A fresh 20-page audit shows `0` staging-domain canonical mismatches, so Yoast canonical output is clean even though several Yoast titles and meta descriptions still need shortening.
- The homepage currently loads about `49` CSS files and `63` JS files, so the next meaningful speed gains are more likely to come from plugin weight reduction and careful later CSS/JS tuning than from forcing more low-risk LiteSpeed toggles.

### Current pending-task cleanup - 2026-09-19

- Upgraded the Local SEO Audit tool page metadata and guidance for Rawalpindi, Islamabad, Google Business Profile, map-pack trust, local schema, service-area signals, and local conversion paths.
- Cleared the private admin SEO queue by expanding the seven thin blog records that were failing only the `content_depth` gate.
- Added 2026-09-19 freshness metadata to those refreshed drafts so the blog template can expose updated-date and `dateModified` signals.
- Marked reviewed service-page inventory records as live in the admin store after confirming their SEO title, meta description, H1, CTA, sections, editable slots, and image-alt counts were present.
- Updated tool sitemap freshness so `/tools/`, `/tools/local-seo-audit/`, and the already-refreshed schema generator carry more accurate modification dates.
- Cleared the three overdue scheduled content items by creating the local SEO/GBP/Maps posts for 2026-09-14, 2026-09-16, and 2026-09-18, then verified the static export, sitemap, RSS feed, and admin schedule counters.
