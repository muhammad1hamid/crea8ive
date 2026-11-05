# Crea8iv Media Node.js Migration SEO Audit

Date: 2026-08-18  
Primary goal: move the public website to a Hostinger Node.js web app without changing design, URLs, canonical signals, or SEO-critical content.

## Executive Summary

The safest current migration path is the `frontend` Next.js static export, not the Astro build.

Why:

- Live sitemap has 88 canonical URLs.
- `frontend/out/sitemap.xml` has the same 88 URLs.
- Live sitemap vs `frontend/out/sitemap.xml`: 0 missing and 0 extra URLs.
- `project/public-website/astro/dist/sitemap-index.xml` currently has 45 URLs, so it misses blog posts, legal pages, software pages, platforms, founder page, and results subpages.
- `npm run build` and `npm run export` pass inside `frontend`.
- `npm run build` passes inside `project/public-website/astro`, but route coverage is incomplete for a no-drop SEO migration.

Recommendation: use `frontend` as the production Node app/export target for phase 1. Keep Astro as an experimental/future rebuild unless its route parity is completed first.

## Current Stack Inventory

### Live Site

- Domain: `https://crea8ivmedia.com/`
- Live host header indicates Hostinger/hPanel/hCDN.
- Homepage serves `HTTP/2 200`.
- Current cache header for HTML: `no-cache, must-revalidate`.
- Live robots file allows crawl access and points to `https://crea8ivmedia.com/sitemap.xml`.
- Live sitemap index at `/sitemap_index.xml` points to `/sitemap.xml`.

### Local Repo

- Main branch: `main`
- Public Node/Next frontend: `frontend`
- Astro public website: `project/public-website/astro`
- Client portal: `project/client-portal/php` and `project/client-portal/vue`
- Existing WordPress API workflow and SEO audit scripts remain in `scripts`

### Build Health

- `frontend`: `npm run build` passed.
- `frontend`: `npm run export` passed.
- `project/public-website/astro`: `npm run build` passed.

## Git / Worktree Risk

There are many modified and untracked files. Do not deploy or overwrite blindly.

Main touched areas:

- `frontend/src/app`
- `frontend/src/components`
- `frontend/src/lib`
- `frontend/public`
- `frontend/out`
- `project/public-website/astro/src`
- `project/public-website/astro/dist`
- `project/documentation`
- `reports`

Before production migration, create a backup branch and commit/snapshot the current working state. This is important because some SEO-critical work is uncommitted.

## URL Parity

### Strongest Candidate

`frontend/out/sitemap.xml` exactly matches the live sitemap URL set.

Result:

- Live URLs: 88
- Next export URLs: 88
- Missing from Next export: 0
- Extra in Next export: 0

### Not Yet Safe For Full Cutover

Astro currently builds 45 pages. It misses these live sitemap URLs:

- All blog post URLs
- `/blog/page/2/`
- `/howrahshah/`
- `/platforms/`
- `/privacy-policy/`
- `/software-development/`
- `/software-products/`
- `/syed-qamar-abbas/`
- `/terms-and-conditions/`
- `/results/brand-guidelines/`
- `/results/e-commerce/`
- `/results/editorial/`
- `/results/health-clinics/`
- `/results/interiors-architects/`
- `/results/logo-identity/`
- `/results/restaurants/`

Do not use the Astro build for production migration until those routes are present and the sitemap matches live exactly.

## SEO-Critical Findings

### 1. Indexed legacy parameter URLs exist

Search results still show a legacy URL pattern like `https://crea8ivmedia.com/?p=4211`.

Risk: duplicate indexed versions and canonical confusion.

Mitigation:

- Keep query-string stripping redirects for `p`, `page_id`, and `attachment_id`.
- Verify `/?p=4211` returns a 301 to `/`.
- Monitor Google Search Console for duplicate and alternate page reports.

### 2. URL structure must remain identical

Risk: even small slug or trailing-slash changes can create temporary ranking volatility.

Mitigation:

- Keep trailing slash format.
- Keep all 88 sitemap URLs unchanged.
- Keep canonical URLs exactly on the same domain and paths.
- Test every sitemap URL on staging before production.

### 3. Blog URLs are the biggest migration risk

Risk: blog posts often carry long-tail traffic and AI search relevance.

Mitigation:

- Use the Next export because it currently includes all blog routes.
- Do not cut over with Astro until blog route generation is complete.
- Preserve blog titles, H1s, descriptions, dates, author, schema, and internal links.

### 4. Design parity must be verified visually

Risk: code migration can preserve URL parity but still hurt conversions if design/layout changes.

Mitigation:

- Capture current live screenshots before cutover.
- Compare staging screenshots for desktop and mobile.
- Required pages: homepage, pricing, contact, blog, blog post, service page, tools page, results page, software products, founder page.

### 5. Redirect/caching file is important

`frontend/public/.htaccess` and `frontend/out/.htaccess` include:

- 410 cleanup rules for historical spam/gambling URLs.
- 410 cleanup for retired WordPress archive surfaces.
- 301 redirects for useful legacy URLs.
- WordPress ID query cleanup.
- RSS content-type fixes.
- Compression and caching rules.

Keep this file in the production deploy package unless Hostinger Node managed deployment overrides `.htaccess`. If Hostinger creates its own routing file for a server-side Node app, these redirects must be recreated in the app/server layer or Hostinger redirect settings.

## Safer Migration Architecture

### Preferred Phase 1 Architecture

Use `frontend` as a static-export Node project:

- Framework: Next.js 14
- Build command: `npm run export`
- Output directory: `out`
- Hosting mode: front-end/static output on Hostinger Node Web App or static file deploy
- Node version: prefer 20.x or 22.x after staging validation

This keeps the public site mostly static, which lowers runtime risk.

### Avoid In Phase 1

Do not move everything into a dynamic server-rendered Node app immediately.

Reasons:

- More runtime process risk on Hostinger.
- More moving parts during SEO-sensitive migration.
- Redirect/caching behavior may change.
- Static export already meets URL parity.

### Phase 2

After public site is stable:

- Decide whether WordPress remains as content source.
- Move content fully into local Markdown/JSON/CMS if desired.
- Migrate portal/backend separately.
- Add dynamic lead forms, dashboards, calculators, CRM/automation features as separate modules.

## Zero-Drop Migration Gates

No migration can honestly guarantee 0 ranking fluctuation, but the following gates minimize risk.

### Gate 1: Freeze

- Freeze live WordPress/content changes.
- Export live sitemap, robots, page titles, meta descriptions, canonicals, H1s, and schema.
- Commit or archive all uncommitted local work.
- Create a rollback zip/backup of current production.

### Gate 2: Build

- Run `npm run export` in `frontend`.
- Confirm `frontend/out` exists.
- Confirm `frontend/out/sitemap.xml` has 88 URLs.
- Confirm live sitemap vs export sitemap has 0 missing and 0 extra URLs.

### Gate 3: Metadata Parity

For every sitemap URL:

- Status should be 200.
- Canonical should self-reference the same URL.
- Title should match or intentionally improve current title.
- Meta description should exist.
- H1 should exist.
- Important schema should exist and match visible content.
- OG tags should exist.

### Gate 4: Redirect Parity

Test:

- HTTP to HTTPS
- non-www to preferred domain
- no trailing slash to trailing slash
- `/?p=4211` to `/`
- old service URLs to current service/blog URLs
- spam/hacked URLs to 410
- retired archive paths to 410 or intentional redirect

### Gate 5: Visual Parity

Compare live vs staging at:

- 390px mobile
- 768px tablet
- 1440px desktop

Pages:

- `/`
- `/pricing/`
- `/contact/`
- `/our-services/`
- `/website-development/`
- `/blog/`
- one high-priority blog post
- `/tools/`
- `/results/`
- `/software-products/`
- `/syed-qamar-abbas/`

### Gate 6: Performance Baseline

Run Lighthouse/PageSpeed on live and staging before cutover:

- Homepage
- Service page
- Blog post
- Tools page

Compare:

- LCP
- INP/TBT
- CLS
- JS transfer size
- image weight
- TTFB

### Gate 7: Staging Index Safety

Staging must be blocked from indexing:

- Use password protection, noindex, or a temporary non-public staging URL.
- Do not submit staging sitemap to Google.
- Do not allow staging URLs to be linked from public profiles.

### Gate 8: Production Cutover

- Deploy during a low-traffic window.
- Keep same domain.
- Keep same URL paths.
- Keep same sitemap URL: `/sitemap.xml`.
- Keep same robots URL: `/robots.txt`.
- Immediately test the top pages and all sitemap URLs.
- Submit sitemap in Search Console.

### Gate 9: 30-Day Monitoring

Daily for first 7 days, then weekly:

- Search Console indexing reports
- 404/410 report
- sitemap discovered/submitted count
- average position and clicks for top queries
- Core Web Vitals
- server logs if available
- form/WhatsApp conversion checks

## Rollback Plan

Before cutover:

- Keep old production backup.
- Keep DNS/hosting settings documented.
- Keep previous deploy package.
- Keep old WordPress instance accessible but not publicly conflicting.

Rollback trigger:

- Major 5xx errors
- Large number of important URLs returning 404
- Sitemap not accessible
- Broken homepage or major layout failure
- Contact/lead flow broken

Rollback action:

- Restore old hosting/site package.
- Keep new deploy on staging for diagnosis.
- Do not change URLs again during rollback; preserve canonical domain.

## Final Recommendation

Proceed with a staged Next.js export migration first. It has the best current SEO parity and lowest runtime risk.

Do not switch production until:

- Current local work is committed/snapshotted.
- Next export sitemap still exactly matches live sitemap.
- Redirects are tested.
- Design screenshots match.
- Search Console baseline is captured.
- Rollback package is ready.
