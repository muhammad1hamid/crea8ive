# The Project Journey — mobile process

Replaced only the mobile presentation (699px and below) with four connected, expandable milestones. Original desktop/tablet cards, artwork, section heading, lead and contact CTA remain intact.

## Result

- Stage 01 starts open. Selecting a different stage expands it and collapses the previous stage; all four original titles remain visible.
- Cream discovery/lens, stone layered blueprint, orange build sequence and forest-green improvement cycle give the stages distinct identities. Lightweight SVG motifs use brand colours; no raster assets or dependencies were added.
- Approved descriptions are passed directly from the existing registry, including the exact ongoing-management qualification. The Design → Create → Implement → Test → Release sequence follows the requested specification.
- Four connected stage buttons and a vertical milestone rail show the selection. Native disclosure controls support Enter/Space, plus Up/Down and Home/End focus navigation.
- Short height transitions accommodate intrinsic content; number, progress and motif feedback use transforms/opacity. Rapid selection interrupts cleanly. Reduced-motion changes cancel running height animations. No automatic selection or scroll-position manipulation.
- Native details/summary disclosures remain usable without JavaScript. The enhanced interface exposes expanded states, named content regions, inactive-region inertness and selection announcements.

## Verification

- **20 viewport/theme cases:** 320, 360, 375, 390, 430, 566, 700, 768, 1024 and 1440px, in both themes.
- Every mobile stage opened individually at each phone width. Exactly one expanded control, readable 16px descriptions, adequate touch targets, correct colours, no clipping and no horizontal overflow passed.
- **All eight desktop/tablet screenshots matched pixel-for-pixel.** Original section intro typography/geometry also matched on mobile.
- At 390px, the initial process section is 867px shorter in light mode and 931px shorter in dark mode.
- Original stage names/descriptions, CTA text and `/contact/` destination, artwork SHA-256 hashes, other homepage content/backgrounds and SEO fields matched the baseline.
- Keyboard operation, touch activation, four selected states, progress position, interruption during rapid taps, live reduced-motion changes and no automatic switching passed in both themes. Native no-JavaScript exclusive disclosure operation passed.
- Production build passed, including TypeScript and all 275 pages. Existing filesystem-tracing/module-format notices remain. Lint passed with zero errors and four existing unused-symbol warnings in unrelated files.

## Visual review

Reviewed the narrow layout and all four stage identities. Editorial numbers, asymmetrical panel corners, restrained diagrams and a connected rail distinguish this journey from the neighbouring grids and carousel. Stage 04 retains the complete ongoing-management explanation.

QA used local Chrome and mobile touch emulation. No physical iOS/Android testing, deployment or production form submission was performed.

## Evidence

- [320px, light](mobile-light-320.png)
- [390px, initial light](mobile-light-390.png)
- [Plan selected](mobile-light-390-plan.png)
- [Build & Launch selected](mobile-dark-390-build.png)
- [Learn & Improve selected](mobile-dark-390-learn.png)
- [Viewport checks](qa.json)
- [Touch, animation and fallback checks](interaction-qa.json)
