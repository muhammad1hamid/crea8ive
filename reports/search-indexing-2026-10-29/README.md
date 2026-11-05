# Search indexing review - 29 October 2026

## Verified live baseline

The public sitemap and robots.txt were fetched on 29 October 2026. The sitemap contained 244 distinct page URLs. Every sitemap URL returned HTTP 200 without a redirect, had a single matching canonical, and did not contain a rendered noindex directive. The downloaded URL set matched the local export's 244 URLs. The full read-only observations are in `live-sitemap-audit.json`.

This baseline does not reproduce the older Search Console report's 6,705 missing URLs, 2,294 redirects, 2,454 robots exclusions, 521 crawled-not-indexed URLs or 17 duplicate-without-canonical URLs. The supplied Coverage ZIP contains aggregate counts only, with chart data ending on 16 October. It cannot identify the affected addresses, the current Google-selected canonical, or Google indexing status on 29 October.

## Changes

1. Added a shared registry of 43 already-established permanent migrations, used by Next.js, the Node static server, the sitemap and content link cleanup. These match existing Hostinger rules, except the supported Buildscape detail-to-case-study migration described below.
2. Aligned Node with the reviewed Hostinger redirects. Both slash variants redirect directly, preserve query strings and resolve to exported canonical destinations.
3. Changed `/website-portfolio/buildscape/` to an HTTP 301 to `/case-studies/buildscape/` on Hostinger. Previously the path was specifically exempted from HTTP collection redirects and served a client-side redirect stub. Node and Next.js now use the same destination. Other retired portfolio-detail paths retain the existing collection policy.
4. Rewrote links to reviewed aliases in legacy HTML and article resource panels to their final destinations. The final exported anchor scan found zero remaining links to those aliases.
5. Prevented reviewed redirect sources from entering the sitemap and removed build-time `new Date()` fallbacks for missing content modification dates. Missing dates are omitted rather than invented.
6. Strengthened the release gate: every sitemap entry must exist, be canonical, be crawlable for Googlebot, avoid noindex and refresh redirects, and have a valid non-future modification date if supplied. Known permanent redirect destinations must exist and avoid chains.

## Validation

- `npm run qa:release`: passed, including standards, site data, lint, type checking, static export, release validation, schema, Qatar and portfolio assets. Lint retains the six pre-existing warnings and adds no new warnings.
- `node --test scripts/indexing-audit.test.mjs scripts/redirects-runtime.test.mjs`: passes all five focused tests. The runtime suite covers 43 mappings in both slash forms, direct destination responses, retired portfolio paths, unknown 404s and a representative historical spam 410.
- `npm run qa:browser`: checks seven routes at 390/768/1440px plus the STW interaction suite at 320/390/768/1440px in both themes. Evidence is generated under `reports/browser-pilot/`; no real enquiries or provider APIs are called.
- `node scripts/verify-indexing.mjs`: 244 sitemap pages, 43 reviewed redirects, zero errors.
- All current important pages remain indexable; existing deliberate search/feed/admin robots exclusions are preserved.

## Remaining evidence and follow-up

After deploying the reviewed change through the normal backup/release process, verify the affected redirects on the production host. Submission or validation in Search Console was not performed as part of this code task. No production deployment is claimed.

To complete the historical cleanup, export URL examples for each Search Console exclusion reason. Compare those examples with live responses, sitemap membership, internal links and URL Inspection's Google-selected canonical. Restore an accidentally missing useful page only when its original content and intent are known; use an equivalent destination only where justified. Keep genuinely removed URLs as 404/410 rather than redirecting unrelated URLs to the homepage. Preserve intentionally blocked/non-indexable pages.

The separate local anchor audit also found `/patientflow/demo.html` linked from product pages without an exported demo file. It is outside the current sitemap and cannot be mapped to an equivalent working demo from available evidence. A valid demo destination or demo implementation is needed before replacing that product action; no misleading fallback was introduced here.

The 521 crawled-not-indexed pages require URL-level content and search evidence before rewriting, consolidating or redirecting. Technical fixes do not guarantee indexing or erase historical Search Console counts. Google must recrawl and reassess URLs.

Reference: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
