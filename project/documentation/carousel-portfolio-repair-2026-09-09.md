# Carousel and portfolio asset repair — 9 September 2026

Restored circular logo carousels immediately below the homepage hero and in the footer. Shared LogoCarousel supports automatic motion, hover/focus pause, mouse dragging, native touch scrolling, navigation controls, and reduced-motion preferences. Full logos use object-fit contain. Removed the header background box and resized the existing transparent light-theme logo with CSS to compensate for intrinsic whitespace; original assets unchanged.

Root cause confirmed: all 8 website preview and 14 social-grid image URLs returned HTTP 404 before repair, despite project records and local images being present. Uploaded the 22 referenced images with the changed pages and shared assets. All 22 now return successful image responses. No project data removed.

Deployment: frontend/.deploy/carousel-portfolio-repair-20260909-manifest.txt. Homepage and core routes from previous release updated; image restoration fixes any other page using those same image paths. Cache purge accepted.

Checks: production build/lint/types and release verification passed (188 routes). Added scripts/verify-portfolio-assets.mjs; run with --live after future portfolio deployments. Verified all 22 images locally and live. Browser checked carousel movement and mouse drag, mobile light-theme logo transparency/size, no mobile horizontal overflow, live website cards, live social grids, footer circles, homepage canonical/title/structured data. Native touch scrolling is enabled via browser overflow; no physical phone test performed.
