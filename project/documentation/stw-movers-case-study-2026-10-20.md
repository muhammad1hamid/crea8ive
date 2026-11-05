# STW Movers Case Study

Prepared for the Crea8iv Media website at `/case-studies/stw-movers-barcelona/`.

## Implementation

- Dedicated server-rendered page using the existing case-study route, agency fonts, shared site chrome, image viewer and project-enquiry trigger.
- Finished English copy covers the business challenge, connected strategy, responsive UX, Nuxt/Vue/TypeScript foundation, Java/Spring Boot backend, service and content architecture, technical SEO, editorial answers, AI discovery, Google Ads preparation, measurement and qualitative outcomes.
- Scoped CSS provides dark/light presentation, editorial sections, a horizontal mobile desktop/mobile image showcase, readable scrollable tables and keyboard focus.
- Unique metadata, absolute canonical, Article and BreadcrumbList graph, visible agency attribution, article dates and a content-date sitemap entry.
- Incoming links from the archive, website development, Google Ads, AI search optimisation and the AI visibility programme. Outgoing agency links use existing routes.

## Evidence and Claim Boundaries

Implementation details, including the stack, ten expanded articles and booking-interface improvements, are supplied in the project brief. They are not inferred from a screenshot or a production build.

Public pages reviewed and captured on 19 October 2026:

- `https://www.stwmovers.com`
- `https://www.stwmovers.com/services/barcelona-airport-transfer`
- `https://www.stwmovers.com/answers`
- `https://www.stwmovers.com/blogs/barcelona-airport-pickup-guide`

Four viewport screenshots are stored as WebP files with explicit dimensions. The social image composes genuine desktop and mobile captures without a fabricated before/after view. Optional cookies were rejected during capture; no booking or enquiry was submitted. Screenshot dates are separate from the article publication/modification date of 20 October 2026.

The page distinguishes implemented scope, prepared infrastructure, public visual evidence and continuing verification. It publishes no traffic, ranking, citation, lead, booking, spend, CPA, ROAS, testimonial or award claims. Google Ads is described as engagement scope and landing preparation, not verified campaign delivery. STW Movers is described as pre-booked private chauffeur transport.

Additional performance reporting requires approved Search Console and analytics exports, campaign account evidence, deduplicated qualified enquiries, confirmed booking records and a dated AI query panel. Each result needs a date range, baseline, comparison period, definition and attribution limitations. Complete production booking verification remains separate from build validation.

## Verification

The focused browser check is `node frontend/scripts/qa-stw-case-study.mjs`, launched from the repository root, or `node scripts/qa-stw-case-study.mjs` from the frontend directory. Set `QA_BASE_URL` to target a different local server.

It covers dark/light at 320, 390, 768 and 1440px; H1, canonical, Open Graph type, JSON-LD, image loading and containment, horizontal overflow, image-dialog keyboard/zoom/focus behaviour, project-enquiry modal activation, internal links, five incoming links and sitemap inclusion. Screenshots are stored under `/private/tmp/crea8iv-stw-qa/`.

Webpack production compilation and TypeScript checks passed. The default Turbopack production build stalled and was stopped before retrying the existing Webpack path. ESLint passed with six pre-existing unused-symbol warnings. The four client URLs returned HTTP 200.

Final verification also passed against the production build served locally: all eight theme/viewport combinations, eight internal destinations, five incoming page links, image-file responses, sitemap inclusion and zero browser errors. The enquiry modal was opened and closed without submitting customer information.

Local preview: `http://localhost:4181/case-studies/stw-movers-barcelona/`.

## Production Release

Published to `https://crea8ivmedia.com/case-studies/stw-movers-barcelona/` on 20 October 2026 following explicit approval. The selective upload included 37 documents covering the case study, archive, four related service pages and sitemap, plus supporting hashed assets and five project images. Homepage HTML and its route payloads were excluded; its server-side SHA-256 remained unchanged after deployment. No new homepage design concepts were published. No Git push was performed in this release.

Affected existing documents were backed up on the host to `crea8iv-stw-backup-1792438124486.tar.gz` before upload. The deployment route audit checked 268 live sitemap/internal-link URLs with zero failures. All six selected pages returned HTTP 200 with the STW content/link, and the live sitemap includes the new canonical URL.

The live page opened in Chrome after the host's normal browser check and displayed the correct title and article text. A full automated live responsive rerun was not completed: hosting anti-bot checks intermittently returned HTTP 403 or prevented the article selector becoming available. The eight-combination responsive/interaction checks described above passed against the local production build; they must not be represented as a completed live-browser sweep. No customer form was submitted.
