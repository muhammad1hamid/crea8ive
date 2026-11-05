# Logos and footer update — 9 September 2026

Published homepage and core routes listed in frontend/.deploy/logos-footer-20260909-manifest.txt. Other routes retain their previous exported HTML until a subsequent release.

- Homepage identity work uses 24 unique stationary logo tiles: two columns on mobile, four on tablet, six on desktop.
- Header brand has a solid contrast surface; light-theme logo loads eagerly. Footer includes an explicit brand wordmark and eager brand images.
- Company links use two columns. Footer identity logos occupy a full-width grid, including two rows on desktop.
- Removed HomeSeoContent and repeated registration banner from homepage. Metadata and PageSchema remain. Registration is a discreet footer reference with a credentials link.
- Original images and registration documents retained.

Validation: production export, lint/type checks and release verifier passed (188 routes, zero missing, zero duplicate titles). Browser checked 390px and 1440px layouts; no horizontal overflow and all 24 footer logo images loaded.
