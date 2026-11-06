# Forest-green homepage update — 6 November 2026

Implemented the six requested homepage changes, following the approved “Growth Starts with the Next Step” reference. No new design direction was drawn: the user’s locked reference and existing typography/brand system define this scoped change.

## Delivered

- Following the user’s theme clarification, problem-led services, work library, connected journey and journal backgrounds are `#064B3B` only in light mode. Dark mode retains its previous charcoal/brown backgrounds and ambient gradients. Copy is ivory on light-mode green; light folder faces, service popups and connected-journey cards keep readable light palettes.
- Three new 16:10 creative-work mockups fill their image areas at desktop, tablet and mobile sizes. Original artwork and case-study links are preserved.
- The closing CTA is a forest-green rounded card in both themes, with three desktop zones, orange italic headline emphasis, a separate transparent laptop graphic, orange project action and outlined WhatsApp action.
- Mobile order is copy, visual, question, primary/secondary actions and case-study link. All exact CTA text and destinations are unchanged.
- Native one-time card/content/graphic entrances, staggered buttons, hover elevation, keyboard focus and live reduced-motion cancellation. No new package or continuous CTA animation.

## Validation

| Check | Result |
| --- | --- |
| Local preview | http://127.0.0.1:4321/ |
| 320 / 390 / 768 / 1440px, both themes | Passed — 32 final theme/section checks plus 8 CTA layout checks; regenerated creative cards also checked at all four widths |
| Four green sections | Light mode: computed background `rgb(6, 75, 59)` at every checked size |
| Restored dark surfaces | Services `#171513` with original ambient gradients; library `#111411`; connected journey `#0B0B0C` with original gradients; journal `#181818` with original warm gradient |
| Images / overflow | Selected images decoded; no page overflow; creative media remains 16:10 |
| Content and navigation | All 14 direct homepage sections retain normalized text and link destinations |
| SEO baseline | Title, description, canonical, H1 and JSON-LD unchanged |
| Keyboard/dialogs | CTA tab order and visible focus; image/folder Enter, Escape and focus return passed |
| Service orbit | Rotation, hover pause, selected node at 270°, inline compact popup and outside-click resume passed |
| CTA motion | Seven entrance animations observed; reduced-motion preference cancels them; hover lifts primary action 3px |
| Production build | Passed |
| Lint | Passed; four existing unused-function warnings in Header/howrahshah, no new errors |
| Type checks | Passed |
| Code standards | Passed, no failures |
| Site data | Passed: 17 grid items, 175 local assets, 94 redirects and 27 metadata entries checked |
| Public portfolio/homepage asset scan | 68 distinct source asset paths exist, including all four new assets |

The export-only `verify:portfolio-assets` command expects an `out/` static release, which is absent for this local Next.js build. It reported missing export paths; the equivalent public-source path check and browser image decodes passed. No static export or deployment was requested. The build retains the existing eight WordPress filesystem tracing warnings and Tailwind module-format notice.

Three visual review rounds were completed, including the final light-only theme clarification. The first corrected CTA headline line breaks and the scale of its mobile corner accent. The journal label uses a lighter orange only on light-mode green to improve contrast. Read-only browser requests were restricted to local static content. No production forms, WhatsApp messages or backend delivery were triggered. Motion harness timing was corrected to use an active tab, observed animation clocks and instant test scrolling; these were test readiness issues.

## Previews

- [CTA — light desktop](final-light-1440-cta.png)
- [CTA — dark desktop](final-dark-1440-cta.png)
- [CTA — light mobile](final-light-390-cta.png)
- [CTA — tablet](final-light-768-cta.png)
- [Creative mockups — desktop](light-1440-home-creative-work.png)
- [Creative mockups — mobile](light-390-home-creative-work.png)
- [Services](light-1440-home-problem-services.png)
- [Work library](light-1440-home-work-library.png)
- [Connected journey](light-1440-home-how-it-connects.png)
- [Journal](light-1440-home-insights-section.png)
- [Restored dark services](dark-1440-home-problem-services.png)
- [Restored dark work library](dark-1440-home-work-library.png)
- [Restored dark connected journey](dark-1440-home-how-it-connects.png)
- [Restored dark journal](dark-1440-home-insights-section.png)

[Generated asset paths, reference inputs and exact final prompts](asset-prompts.md).
