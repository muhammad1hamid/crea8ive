# International market foundation and Qatar consolidation

## Status

Implemented and locally tested. **Not deployed.** This delivers the Qatar consolidation and initial market-hub foundation, not all 59 sections or later phases of the international brief.

## Architecture discovered

- Next.js 14 App Router, React and TypeScript; static export served by the custom Node server or Hostinger's web server.
- Global site owns the shared header, footer, organisation schema and analytics configuration.
- The previous Qatar implementation had separate English and Arabic layouts and 93 exported pages under `/qa/`, plus a dedicated sitemap.
- Existing Pakistan pages, case studies and global service routes are preserved.
- Enquiries use the existing PHP/SQLite endpoint. Next/Node proxies require configured PHP storage; static export does not run PHP itself.

## Implemented

- Removed the six active Qatar route/layout files. Original Qatar components, catalogue, articles and source data remain in the repository for editorial recovery; they are no longer exported as a separate site.
- Added `/locations/`, `/us/`, `/uk/`, `/canada/`, `/australia/`, `/uae/`, `/saudi-arabia/` and `/qatar/`.
- Qatar is one English market page within the main website, as requested, with website, ads, search, evidence, process, FAQ and enquiry sections.
- Market-specific copy discusses real scoping concerns without inventing overseas offices, clients, prices or performance claims.
- Navigation now links to Locations. Footer and business-verification links no longer advertise the old Qatar website.
- Eight hubs have unique titles, canonical URLs and reciprocal English regional alternates; Locations is x-default. No unpublished Arabic/German hreflang is emitted.
- Country hubs emit WebPage, BreadcrumbList, Service and visible-FAQ markup referencing the existing `/#org` and `/#website` IDs.
- Main sitemap includes the eight new routes, excludes `/qa/`, and robots/sitemap index no longer advertise the old Qatar sitemap.
- AI facts and their generator now point to `/qatar/` and `/locations/`, state the Pakistan delivery base and distinguish published English pages from future translations.
- Existing form extended with name, optional phone/site/budget/timeline, service and conditional project/ad-spend/target-market fields.
- Session acquisition context retains the first landing page and UTM fields where browser storage is available. Current submission path is separate. Full referrer query strings are not stored.
- Country/service conversion event uses controlled identifiers and excludes submitted name/email/phone. A successful event requires the backend to confirm saving.
- PHP endpoint accepts the shared Qatar form without demanding legacy Qatar-only fields. Existing payload storage and idempotency are retained.

## Redirect inventory

The authoritative map is `frontend/src/data/qatar-redirects.json`: **94 mappings** (93 pages plus the old sitemap). Both trailing-slash variants are handled.

Examples:

| Old URL | Destination |
| --- | --- |
| `/qa/`, `/qa/ar/`, `/qa/doha/` | `/qatar/` |
| `/qa/contact/` | `/qatar/#partnership-enquiry` |
| `/qa/services/web-development/` | `/qatar/#web-development` |
| `/qa/services/google-ads/` | `/qatar/#google-ads` |
| `/qa/ai-visibility/` | `/qatar/#ai-visibility` |
| `/qa/about/` | `/company-verification/` |
| `/sitemap-qatar.xml` | `/sitemap.xml` |

Topic pages consolidate into relevant sections or existing global services, not a blanket homepage redirect. Consolidation does not guarantee preservation of every old query ranking. Arabic URLs now resolve to English destinations; their source remains available for a future professionally reviewed Arabic release. Unknown `/qa/` paths return 404 rather than exposing stale deployment files.

Rules exist in middleware, the Node server and `.htaccess`. Static export disables Next middleware, so the actual production serving layer must receive its corresponding rules.

## Verification

- `npm run release:static`: 228 routes verified, zero missing routes, zero duplicate titles.
- `node scripts/verify-market-migration.mjs`: all eight hubs and 94 redirect mappings passed; HTTP 301, query preservation, no destination chains, valid destination anchors, sitemap, canonical and hreflang checks.
- `node scripts/qa-markets-browser.mjs`: 390px, 768px and 1440px, dark/light, no horizontal overflow; mocked form submission, conditional input and session attribution tested. External analytics calls were blocked during local testing.
- `php -l public/enquiries/submit.php`: passes.
- `node scripts/qa-market-enquiry.mjs`: synthetic Qatar enquiry saved to isolated local storage; duplicate request returns same reference; missing consent, missing company and invalid website rejected. No real customer lead submitted.
- Screenshots: `frontend/.deploy/market-qa/`.
- Existing hero image lint warnings remain; market media uses reserved aspect ratios and lazy loading. No new live Lighthouse/Core Web Vitals measurements are claimed.

## Remaining brief phases

- Country-by-service landing pages are **not created**. The three priorities currently have substantive sections per market linked to existing global service pages. Dedicated routes require additional service-specific research and editorial depth, not copies of these hubs.
- No city pages created. New York, London, Toronto, Sydney, Dubai, Riyadh and Doha need differentiated buyer research before launch.
- Germany and future markets are not public; the typed registry is extensible but no draft route is advertised.
- Arabic/German translation, native review and RTL QA remain pending. No language-switching UI claims those versions exist.
- Market-specific keyword volumes and Search Console demand have not been verified.
- No new international client results or local testimonials are claimed. Existing case studies are explicitly described as agency-delivery evidence, not local-market results.
- Revenue/lead-quality reporting requires CRM reconciliation and approved analytics configuration. The new event does not establish revenue attribution by itself.
- Live PHP proxy/storage, GA4 event receipt, consent behaviour and analytics deduplication require production verification. Local tests do not prove production storage or tracking.

## Deployment and manual actions

1. Review these market pages and the redirect inventory before release.
2. Deploy the static export, the matching `.htaccess` or Node runtime rules and updated PHP endpoint together. Do not overwrite admin data, credentials or unrelated uploads.
3. Node serving requires `qatar-redirects.json` in its export directory; the build copies it there. Restart Node after runtime changes.
4. Verify `/qa/` and representative deep URLs on production before clearing caches. Keep old files inaccessible through redirects; no recursive production deletion is needed.
5. Submit the updated main sitemap in Search Console/Bing; inspect new canonicals and representative migrated URLs. Monitor redirects/404s and country queries.
6. Confirm `project_enquiry_saved` is received, then configure its conversion/key-event use without duplicating the existing enquiry conversion. Segment by controlled country/service identifiers.
7. Review qualified enquiries and sales feedback before choosing the next country-service or city launch.
