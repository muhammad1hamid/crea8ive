# Qatar luxury redesign

20 September 2026. Implemented locally; not published or committed.

## What changed

Qatar now uses the actual Pakistan `Header.tsx` component with optional navigation, home-link, consultation-link, language-control and theme settings. Pakistan retains its default navigation and theme controls. Qatar adds a country switch, real English/Arabic counterparts and Qatar-specific service destinations. Shared global products and company proof remain clearly identified. Qatar uses a deliberate dark theme; it does not expose a theme switch that would fail to change its content.

The homepage has been rebuilt around an editorial composition: oversized opening typography, an original orange-and-ivory sculpture, substantial existing project imagery, a connected-capability list, a contrasting ivory industry section, engagement steps, tools, FAQs and a prominent closing invitation. Arabic has its own mirrored composition, language-appropriate type spacing and copy.

Service, industry, guide, pricing, contact and tool pages inherit the refined typography, spacing, quieter borders and CTA treatment. Contact and tool inputs remain free of sticky CTA overlays. Company facts, contacts, prices and project attribution remain truthful.

The hero art is AI-generated decorative imagery, not a client project, office, award or physical product. The existing architecture and PatientFlow portfolio images retain their actual market/product context.

## Files

- `frontend/src/components/layout/Header.tsx`: shared configurable navigation; keyboard, focus and disclosure improvements; vector icons for the mobile menu.
- `frontend/src/components/qatar/QatarNavigation.tsx`: Qatar/Arabic route mapping and country/language controls.
- `frontend/src/components/qatar/QatarHome.tsx`: complete English/Arabic editorial homepage.
- `frontend/src/components/qatar/QatarPage.tsx`, `QatarLayout.tsx`: shared-header integration and inner-page rendering.
- `frontend/src/components/qatar/qatar-luxury.css`: responsive editorial design system.
- `frontend/src/components/qatar/qatar-base.css`, `shared-header.css`, `frontend/tailwind.qatar.config.ts`: only the shared header's utility/style dependencies, without importing the entire Pakistan page stylesheet. Existing Pakistan styles were preserved.
- `frontend/public/img/qatar/qatar-sculpture-v2.webp`: optimized original hero artwork, approximately 43 KB. Original generated PNG remains in the Codex generated-images directory.
- `frontend/src/components/qatar/QatarEvents.tsx`: tracks configured header button clicks as well as links.
- `frontend/src/data/qatar/catalogue.ts`, `arabic.json`: homepage heading consistency with visible content/schema.
- `frontend/scripts/verify-qatar-browser.mjs`, `verify-qatar-functional.mjs`: updated navigation selectors and optional report directory.

## Validation

- Static export and Next server builds pass; source typecheck and lint pass.
- 95 Qatar pages pass canonical, metadata, language, alternate, JSON-LD, link and sitemap checks. Research remains noindex. No Qatar orphan pages.
- All 188 baseline HTML routes remain exported; the existing release verifier reports 303 sitemap destinations, no missing destinations or duplicate titles.
- Eight major pages at six widths (375, 430, 768, 1024, 1440, 1920): 48 samples, no horizontal overflow, broken images, browser errors or sampled axe WCAG A/AA violations.
- Menu tests additionally cover 1280px, desktop dropdowns and mobile drawers in English/Arabic. Focus returns to the trigger after Escape. Contrast and inappropriate ARIA menu semantics found during QA were corrected.
- 18 functional checks pass, including saved English/Arabic enquiries, unsuccessful-backend/retry behavior, attribution, language switching and all five tools. Synthetic enquiries use an isolated local SQLite database.
- Shared-header regression evidence is recorded separately for Pakistan, Qatar English and Qatar Arabic.

Evidence files are in this directory: `release-check.json`, `route-preservation.json`, `responsive-release.json`, `functional-release.json`, `navigation-check.json`, `shared-header-regression.json` and `screenshots/`.

## Performance and release limits

Next estimates **147 kB first-load JavaScript**, compared with 108 kB for the previous simpler Qatar header. The 39 kB increase accompanies reuse of the full shared interactive navigation, icons and link behavior. No animation library, autoplay video or additional npm package was introduced. The hero artwork is approximately 43 KB; the page uses system fonts. These are build/resource observations, not production Core Web Vitals claims.

The refreshed local preview is `http://127.0.0.1:3118/qa/`; Arabic is `/qa/ar/`. It serves the reviewed export from `/private/tmp/crea8iv-qatar-build/frontend/out`. Existing workspace `frontend/out` remains untouched. Rebuild from the updated source for an approved production release.

Existing business dependencies remain: media permissions for additional named Qatar work, approved numerical QAR pricing, official Qatar registration/contact details if introduced, and Arabic editorial review. Nothing was deployed, pushed, sent to external contacts or changed in production accounts.
