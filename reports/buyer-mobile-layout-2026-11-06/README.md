# How Buyers Decide — mobile-only layout, 6 November 2026

Updated only the mobile media queries in `frontend/src/components/ui/how-it-works.module.css`.

- Up to 767px: cards 01 and 02 share an equal-width, equal-height first row. Card 03 spans both columns and uses a horizontal flex layout, with its original image on the left and vertically centred content on the right.
- Compact card spacing, number/badge sizing, naturally wrapped 14px descriptions and 44px minimum title-link touch areas. Existing rounded corners, surfaces, borders, shadows and themes are retained.
- Original markup order, all three existing image files, content, links and interaction code are unchanged.
- No horizontal scrolling, carousel or slider is introduced. Other sections have no source changes.

## Validation

- 320, 390, 430, 566, 767, 768, 1024 and 1440px checked in light and dark themes: 16 cases passed.
- Exact pixel comparison passed at 768, 1024 and 1440px in both themes: six identical before/after screenshots.
- First-row width/height equality, full-width third row, image-left/content-right placement, vertical alignment and absence of text/page overflow passed.
- All three existing images decoded successfully; SHA-256 hashes match the before baseline.
- Text, URLs, alt text, other homepage section content/surfaces and SEO metadata/JSON-LD match baseline.
- Keyboard tab order and visible focus remain functional.
- Production build passed with existing WordPress filesystem-tracing and Tailwind module-format notices.
- Read-only browser checks used local static requests. No external enquiry or backend submissions were made.

## Previews

- [390px light](after-light-390.png)
- [566px light — requested viewport](after-light-566.png)
- [320px dark](after-dark-320.png)
- [390px dark](after-dark-390.png)
- [Detailed checks and pixel-comparison results](qa.json)

One visual review round; no new image generation or dependencies.
