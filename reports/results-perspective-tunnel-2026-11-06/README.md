# Results portfolio perspective tunnel

Implemented on `/results/` from the supplied master prompt, component reference and local screen recording. The new hero introduces seven real projects above the existing case-study and portfolio galleries.

## Delivered behaviour

- Desktop: two-column introduction, native scrolling through a sticky perspective scene, golden-angle project placement, spring-smoothed depth, pointer parallax and numbered project navigation. Scrolling backward reverses the scene; scrolling past it reaches the existing gallery. No wheel listener, scroll lock or autoplay.
- Mobile: compact native scroll-snap rail with a visible next-card preview, previous/next controls and keyboard Arrow/Home/End navigation.
- Reduced motion and JavaScript-disabled: readable project rail, real links and a normal-height hero. Complete project links remain in server HTML.
- Existing orange `#FF6801`, charcoal/emerald dark theme and warm light theme. Real website screenshots use contain sizing; creative images retain their existing colours.
- Existing contact and project destinations are reused. No invented metrics, testimonials or performance promises.

## Scope and preserved behaviour

Production changes are limited to the Results route, a new hero component/CSS Module and a small project curation file. No dependencies were added. Metadata, canonical, descriptions and schema remain unchanged. The archive uses its existing `headingLevel="h2"` option so the new hero supplies the page's only H1; archive wording and appearance remain unchanged.

The existing header, footer, CaseStudyShowcase and LocalPortfolioArchive source files were hash-compared with the publishing baseline and match exactly. Homepage sections are outside this change.

## Validation

- 16 normal-motion cases: light and dark at 320, 360, 375, 390, 430, 768, 1024 and 1440px. No horizontal page overflow, missing first image or runtime page errors.
- Native wheel movement/reversal, pointer parallax, numbered project selection and sticky release passed.
- Mobile previous/next and End/ArrowLeft keyboard controls passed in both themes.
- Reduced-motion desktop passed in both themes; JavaScript-disabled fallback passed at 320 and 1440px. A 1440×700 short desktop viewport retained a visible CTA without overflow.
- All seven local images and all eight project/contact destinations returned HTTP 200 locally.
- Six protected-region comparisons retained all content, URLs, image sources, sizes, backgrounds, metadata and schema. Four off-screen footer snapshots differed only in responsive Contact/Newsletter heading font-size measurements (13/15px); footer/header sources remain byte-identical to baseline. No footer adjustments were made.
- Typecheck passed. Site-data verification passed. Lint passed with the same four existing unused-component warnings in Header/howrahshah; no new warnings.
- Production build passed using `node node_modules/next/dist/bin/next build --webpack`, including TypeScript and all 275 generated pages. The default Turbopack compiler failed to launch its CSS worker in this local environment; the preview uses Next.js's supported Webpack mode. Build scripts/configuration were not changed.
- The export-only portfolio asset checker could not run against a complete `out/` tree because no static export was prepared for this task. The actual seven hero assets were checked from `public/` and over localhost instead.

Browser requests were restricted to local static reads. No production form submissions, external analytics requests or deployment occurred. Local QA does not certify field performance or backend delivery.

## Preview evidence

- [Desktop, dark](desktop-dark.png)
- [Desktop, light](desktop-light.png)
- [Mobile, dark](mobile-dark.png)
- [Mobile, light](mobile-light.png)
- [Reduced motion](reduced-motion.png)
- [Short desktop](short-desktop.png)
- [Compact QA results and asset list](validation.json)

Three visual inspection rounds were used. The initial tunnel previews were enlarged after review; the no-JS scene height and short-screen spacing were also refined. No imagery was fabricated or regenerated for this task.
