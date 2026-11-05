# Responsive QA

Baseline: 45 rendered checks across 13 routes. Homepage widths: 360, 375, 390, 430, 768, 1024, 1280, 1440 and 1920px. Other sampled routes: 390, 768 and 1440px. Reduced-motion enabled; external analytics disabled during capture.

Sources: before/route-inventory.json, before/rendered-audit.json and viewport screenshots in reports/website-refinement-2026-10-21. Normal-motion, light-mode, browser zoom, menu/form success paths and all-page manual screen-reader review are not implied by these baseline results.

## Final Local Results

- Production static export and its TypeScript compilation passed; 239 sitemap routes present, zero missing and zero duplicate HTML titles.
- All 239 original routes retained identical titles, descriptions, canonical URLs, meta robots, H1s, JSON-LD graphs and internal-link sets in the before/after comparison.
- Repeated 45 rendered checks passed: zero document overflow, browser exceptions or broken completed images in the sampled views.
- Twelve homepage interaction combinations passed: dark/light, normal/reduced motion, 390/768/1440px. Project next-control moved the rail; hero copy was unchanged; positioning descriptions use the full card width and no legacy gradients override the new surfaces.
- Refined positioning body-text contrast measured at least 6.416:1 against the solid card surface in the tested themes. This is a component measurement, not full-site WCAG certification.
- Results page carousel received keyboard focus and scrolled with ArrowRight at 390px. Free Audit opened the enquiry modal; no form was submitted.
- ESLint passed with the same six existing unused-symbol warnings (Howrah, homepage unused functions and header). `git diff --check` passed.
- Before/after screenshots were visually inspected for desktop and mobile positioning, plus light-mode mobile. Reproducible evidence: `interaction-checks.json`, both rendered audits and screenshots under the report directory.

Remaining: all-page section review, full form delivery using a controlled recipient, browser zoom, screen-reader testing, automated accessibility scan, mobile menu test suite, live-host QA, Lighthouse and field CWV. Normal/light coverage above applies to the refined components, not all 239 pages. No production changes or measured commercial uplift.

Preview: `http://localhost:4183/` (existing static server). Reproduce with `node scripts/audit-website-refinement.mjs before`, export, then `node scripts/audit-website-refinement.mjs after` and `node scripts/qa-website-refinement.mjs` from `frontend/`. Do not overwrite the saved baseline when checking the same batch again.

## Broader Design Pass

Additional baseline/final template captures: 28 routes x three widths = 84 views per sweep, recorded under `templates-before/` and `templates-after/`. The final template sweep has no overflow or browser errors. Previously observed tablet overflow on `/locations/`, `/qatar/` and `/us/` was resolved by constraining decorative pseudo-elements, without hiding the page's content overflow globally.

`qa-design-interactions.mjs` also verifies visible blog headings, contained thumbnail images, no-result search and reset, category selection, conditional enquiry fields, 16px input text, minimum 44px control height and mobile menu dismissal in six theme/viewport combinations. POST requests are blocked by the test; no delivery success is asserted. H1s and form field/action contracts on all 84 representative views match the baseline. Earlier failed harness attempts were corrected to select the full search value and wait for application hydration rather than interpreting partial input selection/background activity as a feature failure.

Final follow-up verified the enquiry anchor clears the fixed header in all six combinations. These newer results supersede the first batch's pending menu/form-UI items; actual delivery, live hosting, full-site accessibility certification and field performance are still separate. The completed build also passed the repeated 45-view sweep and fresh 239-route metadata/internal-link comparison.
