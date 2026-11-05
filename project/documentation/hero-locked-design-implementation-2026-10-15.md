# Hero-Locked Design Implementation

Date: 2026-10-15
Scope: implement the design audit below the existing heroes, without rewriting SEO content.
Deployment: local production export only; no Git push or live deployment.

## Implemented

- Homepage client work and case studies now follow the identity strip, before the long service/strategy explanation and final CTA. No existing section copy or project destinations were removed.
- Client website previews prioritise Buildscape, Home Studio, CO3 and Curtain Hive before agency-owned/product work. Desktop uses a wide landscape lead project and narrower portrait presentations, retaining intrinsic screenshot proportions.
- Services use open two-column rows on desktop and an inset mobile carousel rather than another grid of heavy promotional cards. Category icons remain colour-coded.
- Repeated orange-glow service artwork replaced with supplied identity/social/website assets or simple icon-based explanatory flows. These flows contain no invented campaign outcomes or analytics.
- Below-hero typography, labels, spacing, process presentation and capability metrics use a calmer shared visual scale. Light-mode homepage-body surfaces use neutral greys rather than a continuous cream tint.
- Creative and industry images are contained rather than cropped. A shared native-dialog evidence viewer supports enlargement, zoom, Escape, visible controls, modal focus containment, and focus return.
- Premium case study creative and proof galleries use the same viewer; Home Studio exposes 17 enlargeable creative/evidence images without losing its supplied grids.
- Case-study archive cards have quieter typography, consistent radii and comfortable links. Case-study body panels are less nested and less decorative.
- Shared native marketing and imported-page body cards receive more consistent typography and framing, excluding hero sections.
- Article reading areas have a controlled measure, improved paragraph rhythm, responsive tables, quieter contents navigation and consistent supporting panels. Article headers and SEO copy remain unchanged.
- Mobile assistant launch is integrated into quick contact rather than floating over cards. Dismissing quick contact restores the independent assistant launcher. Existing assistant voice behaviour and enquiry destinations remain available.
- Form focus clears persistent conversion chrome. Duplicate floating theme toggles removed; one header theme control retains the existing preference behaviour.

## Hero Lock

The homepage hero component, mascot, headline, actions, layout and hero styles were not edited during this implementation. Baseline and post-export hero markup, dimensions and headline are compared exactly at 390px and 1440px in dark and light themes. Screenshot comparison excludes the top 96px painted over by the separate fixed header and allows tiny compositor/anti-alias differences (mean RGB difference below 0.1/255; fewer than 0.1% of pixels differing by more than 20/255). Three locked hero source-file hashes also remain unchanged from the pre-change snapshot.

Other page hero compositions were deliberately left in place. In particular, the audit's proposals to redesign the contact robot, replace the website-service blueprint/score hero and reduce the case-study archive hero were not applied, because the user's newer hero-lock instruction takes precedence. No unsupported performance-score wording was silently rewritten as a design change.

## SEO Contract

`scripts/design_content_guard.py` compares exported route sets, metadata/canonicals, heading text and levels, link destinations and content-word multiplicities independently of section order. Scripts, styles and button-label UI are excluded from the word inventory. The pre-change snapshot is `/private/tmp/crea8iv-design-baseline.json`.

No manual article/service-copy or schema rewrites were part of this pass. The comparison covers 266 exported HTML files, including auxiliary export pages; the public release verifier separately checks the 236 sitemap routes.

## Verification Commands

- `python3 scripts/design_content_guard.py check /private/tmp/crea8iv-design-baseline.json`
- `npm run qa:hero-lock`
- `npm run qa:agency-body`
- `npm run qa:colour`
- `npm run qa:audit-ui`
- `npm run lint`
- `npm run typecheck`
- `npm run export`
- `npm run verify:release`
- `npm run verify:audit-schema`
- `npm run verify:portfolio-assets`

For future hero comparisons, run `node scripts/qa-hero-lock.mjs baseline` against the approved static preview before editing. The screenshot fixtures are temporary local QA artifacts, not versioned CI references.

## Verified Results

- Production export: 270 generated entries; release verifier confirms 236 public routes, none missing and no duplicate titles.
- Content guard: 266 HTML files, zero differences in the recorded content/SEO contracts; locked hero source hashes unchanged.
- Hero QA: four dark/light and mobile/desktop combinations passed markup, dimensions and visual tolerance checks.
- Body QA: eight theme/width combinations at 320, 390, 768 and 1440px passed ordering and overflow checks. Modal enlargement, zoom, Escape/focus return, assistant dock, single theme control and form clearance passed.
- General colour QA: 40 route/theme/viewport combinations and three additional homepage widths passed.
- Existing interaction QA: mobile/desktop carousels, event queues and calculator ordering passed without browser errors.
- Schema: 508 JSON-LD blocks, zero schema regressions. Portfolio assets: 59 verified images.
- TypeScript and code-standard checks passed. ESLint has zero errors and the same six pre-existing unused-symbol warnings.

## Limits

This pass does not claim new rankings, increased conversion rates or improved field Core Web Vitals. Those require post-release measurement. No generated analytics, client testimonials, team photography or ranking evidence was created. Existing approved visual assets were reused; a separate generated-visual production phase is not required to use this version.
