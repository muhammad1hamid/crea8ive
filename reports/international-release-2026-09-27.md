# International release: 27 September 2026

## Scope

This release replaces the standalone Qatar website with one main-site market page and adds the English international acquisition structure.

- Locations hub and seven country hubs.
- 18 country-service pages: website development, Google Ads management and SEO/AI visibility for the US, UK, Canada, Australia, UAE and Saudi Arabia.
- Six city planning pages: New York, London, Toronto, Sydney, Dubai and Riyadh.
- Qatar remains one page, following the user's explicit instruction not to recreate a Qatar subsite. Doha and its services are covered within that page.
- Existing Pakistan pages and verified case studies retained.
- No new offices, campaign metrics, testimonials or local-client claims introduced.

## Technical delivery

- Server-rendered/static HTML, unique titles and self-canonicals, reciprocal country-service hreflang, structured breadcrumbs and visible FAQs.
- Country, service and city links connect back to their parent hub. Forms preselect the relevant service.
- Shared enquiry endpoint, optional qualification fields, session landing-page attribution and controlled analytics dimensions.
- Main sitemap and generated AI facts include the expanded paths.
- 94 legacy Qatar redirects map old pages to relevant current pages or sections. Unknown legacy paths return 404.
- Live rewrite configuration is merged rather than overwritten: existing PatientFlow tenant-routing rules are retained.

## Checks before deployment

- Production build: 252 verified routes; zero missing routes or duplicate titles.
- All 24 expanded pages checked in Chrome for HTTP status, canonical, JSON-LD parsing, H1, mobile overflow, parent links and service preselection.
- Desktop/tablet/mobile screenshots in dark/light mode.
- Qatar migration tests cover 94 redirects, query preservation, no destination chains and anchors.
- Shared Qatar form tested with isolated local PHP/SQLite storage in the preceding implementation phase; no production test lead was inserted.

## Release safety

Public-page, rewrite and enquiry-script rollback backup created outside the public directory:
`domains/crea8ivmedia.com/deploy-backups/international-20260927/`.

Assets are uploaded before HTML. No production deletion, admin replacement or credential changes are part of this release.

## Deliberate publication gates

- Arabic and German content is not published or advertised through hreflang. Native editorial review and RTL testing are still required before localization release.
- Germany/Berlin and further cities remain unpublished, rather than shipping thin placeholder pages.
- Search Console/Bing sitemap submission and GA4 key-event configuration require account-level review. No search rankings, live attribution receipt or revenue results are claimed by a successful deployment.
- City pages are practical project-scoping guides, not claims based on keyword-volume studies. Search Console demand and qualified-lead data should inform further expansion.

## Verification record

Production deployment completed on 27 September 2026 (Pakistan time).

- 270 live sitemap/internal-link URLs checked: zero failures.
- All 94 production redirect mappings passed with HTTP 301, query preservation and destination anchors.
- All 24 new pages passed live Chrome checks, including metadata, JSON-LD, mobile overflow and service preselection; desktop/tablet dark/light screenshots captured.
- Live enquiry endpoint returns HTTP 405 for GET, confirming PHP execution. Successful storage was tested locally; no synthetic lead was inserted into production.
- Hostinger cache purge requested and updated responses verified.
- Two deployment issues were found and corrected: LiteSpeed query/fragment ordering, and an over-broad upload exclusion that omitted Next.js app chunks. The missing chunks were uploaded and all browser tests rerun successfully.
- Preserve root-anchored exclusions (`/app/`, `/admin/`) in future deployment scripts; unanchored `app/` also excludes `_next/static/chunks/app/`.
- Existing PatientFlow rewrite rules, admin files, uploads and credentials were preserved.
