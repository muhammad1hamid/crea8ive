# Service Colour and Mobile Refinement

Date: 2026-10-15
Status: implemented and production-export tested locally; not deployed.

## Design Changes

- Central category mapping in `frontend/src/lib/service-tones.ts` and light/dark palette in `frontend/src/styles/service-colours.css`.
- Website development uses blue, search teal, advertising gold, branding pink, social rose, automation violet, and local/contact green. Existing platform marks retain their platform hues. Brand orange remains available for primary actions.
- Shared navigation, footer platform links, service pages, legacy marketing pages, homepage service cards, and tool discovery use semantic category accents.
- Premium positioning cards have useful icons, shorter copy, restrained tinted surfaces, and smaller mobile dimensions.
- Mobile quick actions use a compact two-column layout. Free tools use shorter discovery copy, coloured icons, consistent card heights, and a correctly inset horizontal carousel.
- Website previews respect intrinsic screenshot dimensions. Buildscape's 720 x 500 landscape image no longer occupies a forced portrait frame. Carousel arrows have icon controls and 44px targets.
- Case study screenshot overlays removed; industry and market labels moved into card copy so evidence remains visible.

## Verification

- Production export: 270 generated entries.
- Release verification: 236 routes, no missing routes or duplicate titles.
- Structured data: 508 JSON-LD blocks, no schema regressions.
- Portfolio assets: 57 images verified.
- Service design QA: dark/light at 390px and 1440px; six distinct hero icon colours, compact cards, image ratio, tool gutter, and carousel interaction passed.
- General colour QA: 40 route/theme/viewport combinations plus homepage at 320px, 768px, and 1024px; overflow, CTA contrast, evidence fitting, mobile menu, focus visibility, and enquiry dialog checks passed.
- Audit UI QA: mobile/desktop carousels, calculator ordering, event queues, and browser error checks passed.
- ESLint: no errors; six existing unused-symbol warnings remain.
- Code standards and whitespace checks passed.

## Maintenance

Use `data-service-tone` with the shared mapping for category accents rather than adding independent orange overrides. Keep full screenshots in intrinsic-ratio or contain frames. Run `npm run qa:service-design` against the local static preview on port 4173, or supply `QA_BASE_URL` for another preview.
