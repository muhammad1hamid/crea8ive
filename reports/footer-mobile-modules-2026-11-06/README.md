# Mobile footer modules — 6 November 2026

The mobile footer now uses four collapsed navigation groups and a separate Official platforms disclosure. PatientFlow, contact details, Google Reviews and the newsletter remain compact individual modules. Identity Work appears once in the Work & Industries group with its original description and destination.

All original company, software, identity, contact, review, social and legal links were preserved. The platform registry contains 14 platforms, including Clutch and Reddit; all remain available. The existing configured Google Maps destination is also used for the mobile address.

## Scope

Five production files in `frontend/src/components/layout/`. The mobile breakpoint is below 768px. Desktop company ordering, platform layout, logos, copy, URLs and form placement retain their original presentation. Other homepage content, backgrounds, assets and SEO were compared with the baseline and remained unchanged. No dependencies were added.

## Validation

- Production build and TypeScript compilation passed (275 static pages).
- Lint passed with four existing unused-code warnings in unrelated files. Build retains the existing WordPress filesystem-tracing warnings and Tailwind module-format notice.
- Twenty viewport/theme cases: 320, 360, 375, 390, 430, 566, 767, 768, 1024 and 1440px in light and dark themes.
- All five disclosures start closed on mobile; every group was expanded and checked. Company navigation has 20 original entries plus the relocated Identity Work banner, without duplicate visible navigation entries.
- All 14 platform URLs, labels, targets and rel attributes match the original inventory. The two-column expanded platform layout has no clipped labels or overflow.
- Touch controls, Enter/Space toggling, Tab order, inert collapsed regions, reduced motion and a JavaScript-disabled fallback passed. Links remain present in server-rendered HTML and readable without JavaScript.
- Newsletter required/invalid-email validation and the existing local success feedback were checked with an isolated fixture. No POST requests or production submissions were made.
- Desktop/tablet geometry, visible content and link inventories match the baseline exactly. At 1024/1440px screenshots were pixel-identical in both themes. At 768px raster differences were limited to four light-theme and three dark-theme color channels, each differing by one level; layout and content match exactly. Baseline/current images are included.

## Newsletter limitation

The user explicitly asked to skip backend integration for now. The original form only displays local success feedback; it does not send subscriptions to a service. That existing behavior is preserved. No subscription delivery is claimed.

## Previews

- [Light mobile](preview-light-390.png)
- [Dark mobile](preview-dark-390.png)
- [All modules expanded](inspect-light-390-open.png)
- [Viewport and inventory checks](qa.json)
- [Interaction checks](interactions.json)

Preview captures hide fixed browser/page controls to inspect footer content; no production page sections were removed. No deployment was performed.
