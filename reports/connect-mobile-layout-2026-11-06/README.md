# How It Connects — compact mobile cards

Updated the existing mobile breakpoint (699px and below) to a **2 + 2 + 1** composition. Cards 01/02 share the first row; 03/04 share the second; 05 spans the full grid width with its illustration on the left and number, heading and description on the right.

## Implementation

- Reused the existing ordered list, five original illustrations, content, brand colours, surfaces, shadows, corners and motion helper.
- Two equal CSS Grid columns stretch cards to their row's natural content height. No fixed card heights, horizontal scrolling or slider.
- Compact number badges, upper-right illustrations, 14px descriptions and responsive padding retain readable text at 320px.
- The fifth card uses Flexbox and vertically centres its illustration against the complete copy block. Its number aligns with the title and description.
- A neutral copy wrapper uses `display: contents` outside the horizontal mobile card, retaining the original tablet/desktop layout.
- The old vertical mobile connector is hidden to avoid running through the new grid's central gutter. Tablet/desktop connectors remain unchanged.
- Existing hover/reveal behaviour is preserved; mobile tap feedback changes only the border. Reduced motion retains the existing near-zero global transition rule and removes hover scale.
- No dependencies, new assets, global CSS edits, copy changes, route changes or other homepage edits.

## Verification

- **20 viewport/theme cases:** 320, 360, 375, 390, 430, 566, 700, 768, 1024 and 1440px in light and dark themes.
- All mobile cases passed the 2 + 2 + 1 arrangement, equal widths/heights within each paired row, horizontal/centred fifth card, readable descriptions and no clipping or horizontal overflow.
- At the five requested widths, total section height decreased by **493, 553, 562, 574 and 609px**, respectively, in both themes. The section heading and introductory paragraphs retained identical geometry and typography.
- All **eight tablet/desktop screenshots matched pixel-for-pixel**. Geometry, heading, card content, CTA and background matched the baseline.
- Original section copy, image URLs/alt text, CTA destination, other homepage content/backgrounds and SEO fields matched the baseline. All five illustration SHA-256 hashes remained unchanged.
- Contact CTA keyboard focus and its existing `/contact/` destination passed. Normal hover/reveal behaviour and reduced motion passed. No browser runtime errors were recorded during the checks.
- Production build passed, including TypeScript and generation of 275 pages. Existing eight filesystem-tracing warnings and the Tailwind module-format notice remain.
- Lint passed: zero errors and four pre-existing unused-symbol warnings in unrelated files.

## Visual review

The two paired rows keep their illustrations and numbers aligned, while the final horizontal card closes the sequence without another tall panel. At 320px, the longest descriptions wrap naturally at 14px; wider mobile layouts gain more breathing room. Original light-theme green and dark-theme surfaces remain intact. No deployment or production enquiry submission was performed.

## Previews

- [320px, light](mobile-light-320.png)
- [390px, light](mobile-light-390.png)
- [390px, dark](mobile-dark-390.png)
- [430px, dark](mobile-dark-430.png)
- [Browser measurements and checks](qa.json)
