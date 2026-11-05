# Qatar expansion implementation

Prepared 20 September 2026. **Implemented locally; not deployed, committed or pushed.** The original Pakistan URLs remain available. The project already contained extensive unrelated changes before this work; those were preserved.

## Delivered

95 Qatar pages: **80 English and 15 Arabic**. These include 20 service pages, nine industry journeys, an AI visibility hub and eight topic pages, automation/software/content-production hubs, Doha/about/contact/pricing, production capability with attribution rules, five working tools, 20 compact practical guides, business answers and a research methodology page. The research page is `noindex` and excluded from the sitemap. It contains no claimed findings.

| Brief phase | Implementation | Remaining business dependency |
|---|---|---|
| 1 · Company facts | Central company JSON and typed validation; current Pakistan sole-proprietor wording; closed-company claims removed from active trust UI/schema/resources | Owner supplies verified Qatar registration details only when applicable |
| 2–5 · Architecture, navigation, homepage, services | `/qa/` route registry, custom black/orange design, brand assets, mobile navigation, conversion paths | Final owner editorial approval |
| 6–9 · Services, AI, automation, software | Distinct service deliverables/process/measurement; platform-specific primary sources; existing software links | Actual integrations and software demonstrations require delivery scope/access |
| 10 · Production/work | Capability and attribution pages; rights register; existing Pakistan proof clearly labeled | Named portfolio assets, commissioning party, roles and publication permissions |
| 11–13 · Industries, location, about | Nine distinct buying journeys; substantive Doha page; truthful prelaunch identity | Additional locations only with distinct evidence; no fictional office/map pin |
| 14 · Pricing | Four QAR proposal scopes, exclusions and contact route | Approved numeric prices and any promotion terms; no invented discount |
| 15 · Lead handling | Bilingual forms, validation, consent, honeypot, durable existing PHP storage, reference IDs, retry deduplication, Qatar/UTM attribution | Production hosting/storage/response-owner verification; saving does not send email or confirm a calendar appointment |
| 16 · Measurement | All 12 requested events, shared tracking loader, Qatar/language/page dimensions, saved market attribution | Live GA4 DebugView, key-event/custom-dimension configuration and actual qualified-lead data |
| 17 · Technical SEO | Unique metadata, canonicals, graph entities, breadcrumbs, reciprocal language alternates, sitemap index and Qatar segment, robots discovery | Deployed status/redirect checks and Search Console submission |
| 18 · Arabic | Exact 15 priority routes, server-rendered `lang="ar-QA" dir="rtl"`, Arabic labels/copy, matching language switch | Native editorial review and measured keyword validation |
| Additional brief | Five ungated tools; updated AI facts/resources; 20 sourced short guides; seven study protocols; prompt registry, empty evidence tracker/dashboard; 90-day plan and outreach drafts | Genuine observations/research and permission-cleared cases must be collected, not fabricated |

The guides are concise practical articles, not long-form market studies or measured 2027 price reports. Their sources, dated byline and illustrative examples are visible. Related services, tools and individual articles are linked. No named human reviewer is invented.

## Main files

- `frontend/src/data/company.json`, `company.ts`: sole source of company/legal/contact facts. Registration mode fails fast without required verified inputs.
- `frontend/src/data/qatar/`: route catalogue, 20 services, nine industries, Arabic pages, articles, shared types and sitemap data.
- `frontend/src/components/qatar/`: reusable document, page renderer, responsive stylesheet, contact form, tools and event tracking.
- `frontend/src/app/(qatar-en)/` and `(qatar-ar)/`: language-specific root layouts and static page generation.
- Original App Router page tree moved under `frontend/src/app/(global)/`. Route groups do **not** change public URLs. Root API, metadata and feed routes remain outside the group. Imports and static export/portfolio scripts were adjusted.
- `frontend/src/lib/site-config.ts`, `authority-data.ts`, `SiteSchema.tsx`, `RegistrationTrust.tsx`, `Footer.tsx`, `Header.tsx`, native marketing/lead/partnership components and company-verification page: current entity wording and Qatar entry point.
- `frontend/public/enquiries/submit.php`, `scripts/enquiries-admin.php`: existing compatible storage payload extended with Qatar fields; separate market summary.
- `frontend/src/app/api/enquiries/submit/route.ts`, `frontend/src/middleware.ts`, `frontend/server.mjs`: optional Node bridge and protection against serving PHP source. Middleware rewrites the public form path before Next static-file lookup.
- `frontend/src/app/sitemap-index.xml/`, `sitemap-qatar.xml/`, `sitemap.ts`, `robots.ts`: index and language-aware discovery.
- `frontend/scripts/sync-company-facts.mjs`: refreshes public machine-readable facts and business resources before build/export.
- `frontend/public/.htaccess`: preserves the real Buildscape detail page from an overly broad old portfolio redirect.
- `frontend/src/lib/wordpress/index.ts`: optional `WORDPRESS_DATA_SOURCE=snapshot` for reproducible offline builds. Default live behavior remains unchanged.
- `data/qatar/` and `scripts/qatar_visibility_report.py`: research, rights, language mapping, evidence tracking and rollout operations.
- `frontend/scripts/verify-qatar*.mjs`, `scripts/qatar_endpoint_test.py`: repeatable targeted verification. `npm run typecheck` uses source-only config so pre-existing generated build caches cannot report moved routes as missing.

The old company-registration constant is explicitly historical and has no live consumers. Historical certificate files were not represented as current business proof. References to clients' own private-limited identities are unrelated and were preserved.

## Verification and evidence

| Check | Result / evidence |
|---|---|
| Static export and server build | Both passed with Node 24.19.0, Next 14.2.33, snapshot content; no secret files copied/read |
| TypeScript and ESLint | Passed; no lint warnings or errors |
| PHP/Node syntax | Passed |
| Existing URL preservation | 188 of 188 baseline HTML routes exist: `route-preservation.json` |
| Existing release verifier | 303 sitemap destinations, zero missing, zero duplicate HTML titles |
| Qatar routes/metadata/schema/alternates | 95 routes; 94 sitemap entries; zero verifier failures or Qatar orphans: `release-check.json` |
| Responsive/RTL | Eight major pages × six widths (375, 430, 768, 1024, 1440, 1920): no overflow/broken images/browser errors; screenshots in `screenshots/` |
| Accessibility | axe WCAG A/AA checks on those eight pages at 375 and 1440: no automated violations. Visual and keyboard sampling also performed; this is not a full manual accessibility certification |
| Browser functionality | 18 checks passed: five tools, invalid input, mobile menu, language switch, attribution, server-failure/retry, saved English/Arabic enquiries and one submit event after success: `functional-release.json` |
| PHP integration | 13 checks passed: durable saving, same-reference retries, invalid fields/consent/origin/honeypot/body limit, Arabic character limits and stored Qatar/UTMs: `endpoint-release.json` |
| Node static host | Nine checks passed including 404, explicit 503 without backend, PHP forwarding and encoded source protection: `host-release.json` |
| Next runtime | Route/RTL/404/backend/source-protection results in `runtime-release.json` |
| Performance | Next estimates 108 kB first-load JS for Qatar routes. Local unthrottled mobile sample had CLS 0 on four routes. Full figures in `performance-release.json`; external analytics blocked, no production Core Web Vitals or Lighthouse score claimed |

Tests used synthetic `example.invalid` enquiries and private temporary SQLite databases. No live enquiry, external analytics event or outbound message was sent. Automated schema checks validate syntax and supported entity claims, not Google rich-result eligibility.

Two issues found during QA were fixed: the sticky CTA no longer covers contact/tool inputs, and the Next runtime no longer treats the PHP form endpoint as a downloadable static file. Footer image checks now await lazy image decoding to avoid false positives.

Additional targeted mobile input regression passed at 375px with a changed ROI input and no sticky overlay: `mobile-tool-release.json`.

Source-only change inventory: `source-changes.csv` (24 added, 42 modified, 82 unchanged files moved into the global route group). Public resources, scripts, config and reports are described above. Build provenance and source hashes: `build-release.json`.

## Hosting and handover

The reviewed static export is `/private/tmp/crea8iv-qatar-build/frontend/out`; the server build is `/private/tmp/crea8iv-qatar-runtime/frontend`. These are temporary validation artifacts. Existing `frontend/out` and local generated caches were preserved. Rebuild in the approved release workspace before deployment; do not deploy the older existing `frontend/out`.

Use supported Node 20–24. From `frontend`, run `npm run typecheck`, `npm run lint`, `npm run export`, `npm run verify:release`, `npm run verify:qatar`. Use `WORDPRESS_DATA_SOURCE=snapshot` only for a deliberately offline snapshot build. Production CMS and tracking overrides were not accessed; an approved production release must retain the actual host configuration and verify current content.

**Preferred existing hosting path:** Apache/PHP serves the exported site and executes `/enquiries/submit.php`. PHP PDO SQLite must be installed; set private durable storage outside the public document root, preserve it across deployments, back it up, and assign access to the existing enquiry admin workflow.

**Node options:** the static host or Next adapter returns JSON 503 unless `ENQUIRY_PHP_ORIGIN` is explicitly configured. It must point to a separate functioning PHP endpoint, not recursively to the same Node app. Prefer host-level routing directly to PHP with the actual client IP preserved. The simple application bridge uses the proxy IP at PHP, so its existing eight-per-hour limiter is shared by proxied visitors; do not launch a high-volume bridge without a trusted ingress/client-IP design. No email/CRM/calendar connection has been enabled.

For local form tests, start PHP on `127.0.0.1:3118` with a **fresh** `/private/tmp/crea8iv-qatar-test-*` storage directory. Run `node scripts/verify-qatar-functional.mjs` from `frontend`, then `CREA8IV_ENQUIRY_TEST_STORAGE=<same directory> python3 scripts/qatar_endpoint_test.py` from the repository root. Reusing the database may correctly trigger the rate limit. Screenshot QA is `node scripts/verify-qatar-browser.mjs` from `frontend` with the local preview running.

## External dependencies and release decision

The implementation deliberately uses the established Pakistan business contact and labels it clearly. It does not publish a personal portfolio contact, a fictional +974 number, Qatar registration, office, rating, award, testimonial or campaign result. QAR offers are scoped proposals. Arabic human review, permissions and actual measurement remain owner/editorial tasks.

No Canva design was edited. No Google Business Profile was created, no external profile updated, no outreach sent, no tracking account changed and no search-engine result promised.

Suggested Git checkpoint after reviewing the pre-existing working tree: `feat: add bilingual Qatar growth section and truthful entity foundation`. Do not stage unrelated files wholesale.
