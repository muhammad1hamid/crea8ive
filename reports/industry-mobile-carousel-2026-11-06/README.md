# Industries — mobile horizontal showcase

Only the existing mobile breakpoint (639px and below) changes. The desktop/tablet mosaic, section heading, introduction, original five images, category labels, industry copy and destinations remain intact.

## Result

- A native horizontal rail uses **86vw cards**, 14px gaps, a visible next-card preview and CSS `scroll-snap`. All cards share the row's natural height, with no fixed card height or clipped descriptions.
- Original full-bleed imagery, rounded corners and orange accents are retained. A mobile dark overlay keeps lower titles and 14px descriptions readable. Original image enlargement stays available with a 44px control.
- Compact navigation displays **01 / 05**, five progress segments and 44px previous/next buttons. Active progress follows native scroll position; boundary buttons disable appropriately.
- Touch swipes, previous/next, Left/Right keys, Home/End and tabbing to offscreen cards are supported. Focus navigation scrolls only the rail; image dialogs retain Escape and focus return.
- No autoplay, automatic rotation, touch interception or continuous animation loop. Active borders/shadows and existing hover feedback provide restrained motion. Reduced motion uses instant navigation.
- A small client component supplies controls around server-rendered card content. Native CSS scrolling and all five cards remain available when JavaScript is disabled. No dependency or asset changes.

## Verification

- **20 viewport/theme cases:** 320, 360, 375, 390, 430, 566, 640, 768, 1024 and 1440px in light and dark themes.
- All requested phone widths passed card sizing, next-card visibility, equal card heights, readable/unclipped content, original image loading, progress controls and no page-level horizontal overflow.
- **Eight tablet/desktop screenshots matched pixel-for-pixel.** Original intro geometry, typography and section surfaces also matched at every tested width.
- At 390px, section height decreased by **1,493px** in both themes. Reductions at 320/360/375/430px were 1,615/1,493/1,493/1,519px, respectively.
- Original copy, card order, image URLs/alt text, links, other homepage content/backgrounds and SEO fields matched the baseline. All five image SHA-256 hashes remained unchanged.
- Keyboard navigation, boundary states, focus on offscreen cards, image enlargement/Escape/focus return, no autoplay and no forced vertical scrolling passed in both themes.
- Chrome mobile touch emulation passed genuine horizontal swipes, independent vertical page swipes, all-five-card access and normal/reduced motion. Swiping did not open image dialogs. JavaScript-disabled native scrolling also reached the final card.
- Production build passed, including TypeScript and generation of 275 pages. Existing eight filesystem-tracing warnings and the Tailwind module-format notice remain.
- Lint passed with zero errors and four pre-existing unused-symbol warnings in unrelated files.

## Visual review and scope

Reviewed narrow/mobile screenshots in both themes, including the fourth card and its updated progress state. The next-card preview makes exploration apparent; image-led cards and a single horizontal row distinguish this section from the adjacent grids. The light-theme counter uses explicit high-contrast text against the existing dark section surface.

Checks used local Chrome and mobile touch emulation, not physical iOS/Android devices. No deployment, production enquiry submission or unrelated homepage edit was performed.

## Previews

- [320px, light](mobile-light-320.png)
- [390px, light](mobile-light-390.png)
- [390px, dark](mobile-dark-390.png)
- [Fourth card and progress, dark](mobile-dark-390-card04.png)
- [Viewport and interaction checks](qa.json)
- [Touch and fallback checks](touch-qa.json)
