# Crea8iv Media Colour System Implementation

Date: 15 October 2026
Release state: Implemented locally; production deployment and Git push not performed.
Preview: http://localhost:4173/

## Delivered

- Removed the shared animated orange wash behind every section and the root ambient element.
- Removed the homepage's decorative orange background orbs while retaining the mascot, platform artwork and genuine client imagery.
- Introduced separate action, accent-text, icon, focus, interactive-border and supporting-surface roles for dark and light themes.
- Changed repeated warm backgrounds, card borders and shadows to quiet neutral treatments across shared home, portfolio, case-study, service, tool, location and navigation components.
- Retained orange primary CTAs and selected states. Secondary actions and default service icons are neutral.
- Preserved the existing Button outline/solid variant contract; removed competing orange outline glows.
- Improved reading-copy weight without changing the configured font family or rewriting content.
- Added scoped presentation rules for legacy WordPress pages, including contact/pricing surfaces, readable light-mode text, dark labels on orange CTAs, and visible light-mode wireframes.
- Kept client artwork, screenshot sources, media aspect ratios, object-contain fitting and carousel behaviour intact.
- Made the mobile contact bar's secondary action quieter, its primary action explicit, and its dismiss target 44px wide.
- Added `npm run qa:colour` for repeatable browser checks and screenshots.

## Colour Roles

| Role | Dark theme | Light theme |
|---|---|---|
| Main canvas | #080808 | Existing light/cream surfaces |
| Section surface | #121212 | #f0f3f1 |
| Supporting copy | #c7c7c7 | #424d48 |
| Primary action | #ff6801 | #ff6801 |
| Action label | #170b03 | #170b03 |
| Accent text | #ff9b58 | #963900 |
| Default icons | #c7d6d0 | #315e51 |
| Focus | #ffb27a | #963900 |

Original brand colours remain available. The existing green supports selected proof areas rather than replacing orange everywhere. No new image assets, JavaScript dependencies or animation libraries were added.

## Verification

Final checks passed:

- Production static export: 270 generated build entries; TypeScript passed.
- Release verification: 236 sitemap routes, zero missing routes, zero duplicate titles.
- Schema regression: 508 JSON-LD blocks across 236 sitemap pages, zero regressions.
- Portfolio assets: 57 homepage/portfolio images verified.
- Site data and code standards: zero failures.
- Qatar: 94 legacy redirects resolve to 15 exported destinations.
- Colour QA: all 40 page/theme/viewport combinations plus three additional homepage widths passed.
- Existing audit UI QA: carousel/filtering, calculator validation/results and queued tracking events passed at 390px and 1440px.
- Lint: zero errors, six pre-existing unused-code warnings.
- `git diff --check`: passed.

The colour gate covers 10 representative routes at 390px and 1440px in both themes (40 combinations), plus homepage overflow checks at 320px, 768px and 1024px. It checks primary-action contrast, neutral navigation borders, removal of ambient layers, uncropped evidence media, legacy light-mode labels and wireframes, mobile-menu state, visible keyboard focus, and opening the consultation dialog. Screenshots are saved to `/private/tmp/crea8iv-colour-qa/`.

The separate audit UI gate covers mobile tool filtering/carousel movement, calculator validation/results and analytics event queues at 390px and 1440px. It does not submit an enquiry or verify delivery to external analytics accounts.

## Boundaries

- Existing URLs, metadata, schema, internal destinations, marketing content and client statistics were not rewritten for this colour refresh.
- Earlier uncommitted editorial, audit and tracking work remains intact.
- Automated browser runs block external requests for deterministic local QA. This is not a full WCAG certification or an external-font/network delivery test.
- No ranking, conversion-rate or Core Web Vitals improvement is claimed without live measurement.
- Review the local preview before publishing. Keep the previous deployed build as the rollback artifact when deployment is authorized.
