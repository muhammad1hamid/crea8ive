# Forest-green homepage update — 6 November 2026

Implemented the six requested homepage changes, following the approved “Growth Starts with the Next Step” reference. No new design direction was drawn: the user’s locked reference and existing typography/brand system define this scoped change.

## Delivered

- Problem-led services, work library, connected journey and journal backgrounds are `#064B3B` in both themes. Copy is ivory on green. Light folder faces, service popups and connected-journey cards retain their own readable light palettes.
- Three new 16:10 creative-work mockups fill their image areas at desktop, tablet and mobile sizes. Original artwork and case-study links are preserved.
- The closing CTA is a forest-green rounded card in both themes, with three desktop zones, orange italic headline emphasis, a separate transparent laptop graphic, orange project action and outlined WhatsApp action.
- Mobile order is copy, visual, question, primary/secondary actions and case-study link. All exact CTA text and destinations are unchanged.
- Native one-time card/content/graphic entrances, staggered buttons, hover elevation, keyboard focus and live reduced-motion cancellation. No new package or continuous CTA animation.

## Validation

| Check | Result |
| --- | --- |
| Local preview | http://127.0.0.1:4321/ |
| 320 / 390 / 768 / 1440px, both themes | Passed — 48 section/viewport checks plus 8 final CTA layout checks |
| Four green sections | Computed background `rgb(6, 75, 59)` at every checked size/theme |
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

Two visual review rounds were completed. The first corrected CTA headline line breaks and the scale of its mobile corner accent. A final small journal label colour adjustment improves contrast on green. Read-only browser requests were restricted to local static content. No production forms, WhatsApp messages or backend delivery were triggered. Motion harness timing was corrected to use an active tab, observed animation clocks and instant test scrolling; these were test readiness issues.

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

[Generated asset paths, reference inputs and exact final prompts](asset-prompts.md).
