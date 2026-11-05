# Visual Release QA

Scope: local production export; homepage, website/social services, case-study archive, Home Studio, Black Petals, Buildscape, website portfolio, tools, ROI calculator, article, contact and pricing templates.

## Findings Fixed

- Calculator pre-use check labels resembled empty result cards. They now form a compact checklist, with smaller mobile heading scale and a restrained tool frame. The calculation logic and copy are unchanged.
- A lower homepage creative section still repeated orange-glow artwork. Two images now show supplied Ajwad Naturals and Venn Dental work; the tools illustration is a non-numeric explanatory graphic, not a claimed performance result.
- Pricing service/bundle cards had inconsistent large radii. These body cards now use consistent 8px framing and more balanced spacing.
- Light-theme enlargement icons inherited dark icon colours on a dark button. Their strokes are now explicitly white.
- Checklist icons now inherit category-specific light/dark colours. Homepage light-mode principle checks use a darker teal.

## Checks

- Visual sweep: 13 routes x dark/light x 390/1440px = 52 combinations. No page overflow, directly clipped headings, broken visible images, browser errors, unlabelled visible fields or buttons below the sweep's 40px threshold were found. Inline links and every possible accessibility criterion are not covered by that button check.
- Extra widths: homepage, pricing and ROI calculator at 320, 768, 1024 and 1920px in both themes = 24 combinations. Overflow checks passed. ROI default-input calculations produced the expected PKR 202,500 monthly difference at each width; this is illustrative calculator arithmetic, not client performance.
- Tool filtering, carousel movement, queued analytics, calculator validation and result events passed existing mobile/desktop interaction checks.
- Final contrast polish was followed by focused gallery/modal, focus return, assistant dock, form-clearance and hero-lock regression checks.
- Content guard compared 266 exported HTML files with the pre-pass snapshot: heading wording/levels, word inventory, metadata/canonicals, route set and link destinations unchanged. Image alternatives were updated only for the two replacement client visuals.
- Release verification: 236 public routes, no missing pages or duplicate titles. Build generated 270 entries. Schema verification: 508 JSON-LD blocks and no regressions.
- TypeScript passed. ESLint has no errors and the same six existing unused-symbol warnings. Whitespace checks passed.

## Hero Protection

Hero source, markup, headline, dimensions and composition remain locked. Screenshot checks allow only the documented tiny renderer tolerance and exclude the separate fixed-header overlay. No hero redesign was performed.

## Reproduce

Run `npm run qa:visual-release` in `frontend` against the static preview on port 4173. Screenshots and results are under `/private/tmp/crea8iv-visual-release`. Existing hero and content guards require their pre-change local fixtures.

## Release Boundary

This is local Chromium-based QA with representative screenshot inspection, not certification of every route/state, physical-device Safari testing or a full screen-reader accessibility audit. No real enquiry was sent and no live deployment or Git push was performed. Performance gains or conversion increases are not claimed.
