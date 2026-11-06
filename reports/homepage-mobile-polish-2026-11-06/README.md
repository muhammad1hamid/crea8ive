# Homepage mobile refinements — 6 November 2026

Implemented the seven browser comments while retaining the existing homepage composition, content and destinations.

## Changes

- Mobile Industries introduction is centered. The existing Explore Industries link is centered below the cards and uses brand orange #FF6801. Card text, carousel arrangement and images are preserved.
- Mobile Insights eyebrow, heading, introduction and Explore Insights link are centered. Article cards keep their existing alignment and content.
- Mobile services introduction is centered, with the single existing Explore All Services link visually below the orbit. A CSS subgrid preserves the existing motion wrapper and service-popup behavior; no duplicate CTA was added.
- The client-logo heading is clearer at 28px on mobile and 25px on narrow screens. Existing font family, copy, logo sizes and marquee interactions remain intact.
- The three featured project images now have responsive browser-style mockup frames inside their original media areas. A decorative backdrop reuses each real screenshot to fill the canvas. The primary screenshot retains its intrinsic aspect ratio and remains fully inspectable without stretching or cropping important website UI. The fan-carousel composition, card sizes and original full-screen sources remain unchanged.

## Scope and assets

Eight production files changed. No new dependencies or bitmap assets were introduced. Real project screenshots remain:

- Buildscape: `/img/portfolio/websites/buildscape/buildscape-production-desktop-20260927.webp` — 1440 × 1000.
- Home Studio Interiors: `/img/case-studies/home-studio-interiors/proof/home-studio-live-desktop-2026.webp` — 1600 × 866.
- Black Petals: `/img/case-studies/black-petals/black-petals-live-desktop.webp` — 2852 × 1538.

Alignment/CTA changes use the existing mobile breakpoints. Desktop/tablet section dimensions remain unchanged. Image framing improves the existing project preview at every size. Hero, footer, homepage backgrounds, content, links, SEO fields and unrelated sections remain unchanged. No deployment was performed.

## Verification

- Production build and TypeScript compilation passed. Lint passed with four existing unused-code warnings in unrelated files. Existing WordPress tracing and Tailwind module-format notices remain.
- Sixteen viewport/theme cases passed: 320, 360, 375, 390, 430, 523, 768 and 1440px in light and dark themes.
- No horizontal page overflow; mobile CTA placement, centered intros and orange Industries action verified.
- All three real screenshot sources, natural proportions, contain sizing and browser-frame bounds verified. Measurements use layout dimensions before the fan's rotation is applied.
- Unrelated visible styles and geometry match the baseline. Desktop/tablet outer section dimensions match; all existing copy, links and SEO fields are preserved.
- Fan buttons and keyboard navigation, all three project images, full-screen enlargement, Escape/focus return, service details, related-service lists, orbit hover pause/resume and Industry carousel controls passed in both themes.
- Reduced-motion checks and normal orbit motion were exercised. No production forms were submitted or external services written to.

## Previews and evidence

- [Services below-orbit CTA](after-light-390-services.webp)
- [Industries centered intro and orange CTA](after-light-390-industries.webp)
- [Insights introduction](after-light-390-insights.webp)
- [Logo heading](after-light-390-logos.webp)
- [Buildscape preview](case-light-390-buildscape.webp)
- [Home Studio Interiors preview](case-light-390-home-studio-interiors.webp)
- [Black Petals preview](case-light-390-black-petals.webp)
- [Dark services](after-dark-390-services.webp), [dark Industries](after-dark-390-industries.webp), [dark project preview](case-dark-390-black-petals.webp)
- [Viewport results](qa.json) and [interaction results](interactions.json)

Preview screenshots hide fixed page/browser controls to inspect content; those controls remain in the delivered page. Local preview: `http://127.0.0.1:4321/`.
