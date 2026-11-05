# Compact carousels and homepage images — 9 September 2026

Published manifest: frontend/.deploy/compact-carousels-20260909-manifest.txt.

Logo circles reduced to 116px desktop, 96px mobile, 88px footer. Image area has a circular mask, inset padding and hidden overflow, so square backgrounds stay inside the circle. Motion and drag/swipe controls retained.

Homepage selected websites now uses WebsitePreviewCarousel: five compact cards desktop, three tablet, one full card plus a preview mobile. Full contain-fit images, concise brand/category/link copy, mouse dragging, touch scrolling and previous/next controls. Full portfolio collection retains its detailed grid.

Audited 58 homepage/portfolio/logo image URLs. Found and restored 12 further missing images including Local Services, eight service illustrations, founder portrait, 960px hero variant and restaurant example. All 58 live URLs now return image content. Expanded verify-portfolio-assets.mjs to cover homepage imagery for future releases.

Checks: build/type/lint and release verification passed (188 routes). Browser confirmed circular clipping, five desktop cards, mobile fit without page overflow, working carousel navigation, live Local Services image loaded at naturalWidth 1254, and canonical metadata retained. CDN cache purge accepted. No original assets or project records removed.
