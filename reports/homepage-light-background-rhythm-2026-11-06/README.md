# Homepage background rhythm — 6 November 2026

The light theme now follows the requested forest-green / warm-cream chapter sequence. The user confirmed that dark-theme colours must remain unchanged and approved changing exposed heading/intro text for readable contrast. Existing card surfaces, image treatments, filled buttons, typography, content, destinations and interactions remain intact.

## Surface mapping

The green is sampled from the existing services orbit: **#064B3B**. Cream reuses the existing customer-reality surface: **#FFF8F1**. No new palette colours or gradients were added.

| Homepage chapter | Light-theme surface |
| --- | --- |
| Hero | Unchanged |
| Client Logos | Forest green |
| Customer Reality | Warm cream |
| Problem-led Services | Forest green |
| Case Studies | Warm cream |
| Selected Portfolio | Forest green |
| Connected Growth | Warm cream |
| Industries | Forest green |
| Why Crea8iv / Team | Warm cream |
| Project Evidence | Forest green |
| A Clear Way to Work | Warm cream |
| Insights & FAQs | Forest green |
| Final CTA / Contact | Warm cream outside the existing CTA card |

Selected Portfolio includes the existing website preview, nested work library and creative showcase. Insights and FAQs share their chapter colour. Their components and order were not rearranged. The mobile featured project keeps its cream card and original dark copy; the unframed desktop/tablet project copy gets readable contrast on green.

## Industries compaction

Only this section receives spacing changes, across both themes: smaller outer padding, tighter heading/card-row spacing and reduced minimum image/card heights. Desktop retains its two-plus-three composition; tablet retains its existing grid; mobile retains its five-card swipe carousel. Content height remains natural, with no viewport-height constraint.

| Width | Original height | Final height | Reduction |
| --- | ---: | ---: | ---: |
| 390px | 933px | 848px | 85px |
| 768px | 1532px | 1310px | 222px |
| 1440px | 1263px | 1055px | 209px |

## Verification

- All 16 viewport/theme cases passed: 320, 360, 375, 390, 430, 768, 1024 and 1440px, in light and dark themes.
- Every chapter has the expected computed background, covers the viewport width and meets the next chapter without an unintended gap. No page overflow.
- Baseline comparison preserved copy, URLs, images, SEO fields, typography and visible geometry outside Industries. All dark-theme background colours match the baseline. Hero and footer content, styles and geometry match.
- Existing internal card backgrounds, borders, shadows and image fits remain unchanged. Industries retains its original visual treatments while its approved spacing/minimum heights are reduced.
- Industry controls, keyboard End/Home navigation, all five cards, image enlargement, Escape/focus return and FAQ expansion passed in both themes. No form submissions or external writes were made.
- Production build and TypeScript compilation passed. Lint passed with four existing unused-code warnings in unrelated files. Build still reports the existing WordPress tracing and Tailwind module-format warnings.
- Reference capture settles resize/scroll state before measurement. Non-visible/inert elements are excluded from geometry comparisons; inherited `currentColor` values are normalized without changing actual border colours.

Four production files changed: `HomepageBelowHero.tsx`, `HomepageEditorial.tsx`, `homepage-background-rhythm.module.css` and `industry-showcase.module.css`. No dependency, backend, hero or footer files changed. No deployment was performed. Local preview remains at `http://127.0.0.1:4321/`.

## Previews

- [Desktop Industries before](before-light-1440-industries.webp) / [after](after-light-1440-industries.webp)
- [Tablet Industries before](before-light-768-industries.webp) / [after](after-light-768-industries.webp)
- [Mobile Industries before](before-light-390-industries.webp) / [after](after-light-390-industries.webp)
- [Mobile Portfolio](after-light-390-portfolio.webp)
- [Mobile Connected Growth](after-light-390-connected.webp)
- [Mobile FAQs](after-light-390-faq.webp)
- [Viewport comparison results](qa.json) and [interaction results](interactions.json)

Screenshots hide fixed browser/page controls for inspection; this does not change the delivered site.
