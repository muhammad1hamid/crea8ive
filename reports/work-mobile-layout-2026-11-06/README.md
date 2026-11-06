# Featured Buildscape project — mobile layout

Updated only the existing mobile breakpoint (639px and below) in `frontend/src/components/website-portfolio-preview.module.css`.

## Result

- Intro uses the existing typefaces with smaller-screen heading sizes, comfortable line-height and tighter spacing. Both navigation links share a row at 360–430px and wrap naturally at 320px.
- The original 1440 × 1000 Buildscape screenshot and its details share one rounded frame. A 3:2 preview uses `object-fit: contain`, preserving all website UI without stretching or cropping.
- The fullscreen indicator is 44 × 44px. The existing native image dialog, zoom/fit, Escape and focus return remain functional.
- Project information follows the image directly with 20px padding, all three feature points and a full-width orange case-study link with a 48px minimum height.
- CSS-only entrance motion runs on supported browsers; unsupported browsers retain the readable static layout. Reduced-motion mode disables entrance, elevation and tap effects. No new dependencies or client-side JavaScript.

## Verification

- **18 viewport/theme cases:** 320, 360, 375, 390, 430, 640, 768, 1024 and 1440px in light and dark themes.
- Every requested phone width passed: no horizontal overflow, clipped text, missing images or lost feature points; image/details remain directly connected.
- All eight tablet/desktop comparisons retained identical geometry, intro links, controls and styling. Light screenshots matched pixel-for-pixel. Dark screenshots differed only in Chrome's photograph rasterization (mean channel differences 0.26–0.34 out of 255); every pixel outside that image remained identical. The original image's SHA-256 remained unchanged.
- Fullscreen via keyboard and touch, zoom/fit, Escape, close button, focus return and link tab order passed in both themes.
- Normal motion, hover feedback and reduced motion passed. No browser runtime errors were recorded during the interaction checks.
- Original copy, image/alt text, destinations, other homepage content/backgrounds and SEO fields matched the baseline.
- Production build passed, including TypeScript and generation of all 275 pages. Existing filesystem tracing warnings and the Tailwind module-format notice remain.

## Visual review

The project now reads as one unit: full preview, category, project name, scope, features and action. The narrowest view keeps readable text and natural content height. The actual website UI is necessarily small inside a phone preview; its existing fullscreen view provides closer inspection.

The work-library folders, other homepage sections, desktop/tablet breakpoints, original assets and project functionality were not edited. No deployment or production enquiry submission was performed.

## Previews

- [320px, light](mobile-light-320.png)
- [390px, light](mobile-light-390.png)
- [390px, dark](mobile-dark-390.png)
- [430px, dark](mobile-dark-430.png)
- [Browser measurements and checks](qa.json)
