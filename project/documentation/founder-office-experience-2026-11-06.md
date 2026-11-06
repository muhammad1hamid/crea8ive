# Founder Story and Office Experience

Implemented the supplied founder/office reference in the homepage's existing people section. Desktop pairs the original founder artwork with the story and principles, then places the office introduction beside a real Google Maps preview and address card. Tablet and mobile stack these areas with full-width mobile actions.

## Scope and protected content

- Replaced the old `FounderTrust` markup in `HomepageBelowHero.tsx` with `HomepageFounderOffice.tsx`.
- Added a scoped CSS module and a small `FounderOfficeMotion.tsx` client wrapper. Core content remains server rendered.
- Exempted this section from the homepage's blanket dark-surface override. Light mode now uses warm cream, ink text and a warm-white office card; dark mode uses charcoal, forest green and cream text.
- Kept brand orange `#FF6801` on actions and dark-theme accents. A darker orange text shade in light mode provides readable contrast on cream.
- Retained every supplied paragraph, heading, principle, location tag and CTA label. The five named CTA destinations and founder-image link still point to the original URLs.
- No changes to the hero, header, footer, route registry, company facts, metadata, dependencies or other page components.

## Founder visual

The existing `/assets/syed-qamar-abbas-founder-card.webp` is a complete composite artwork containing the actual founder photograph, name, role and supporting information. It is displayed in full at its original 3:2 ratio, without cropping or replacing the face. Its existing name and role treatment is retained instead of adding a duplicate overlay. This is the main difference from the supplied reference's cleaner portrait-only composition.

The three capabilities sit in a separate restrained strip below the artwork. Their new decorative 3D icons share ivory, forest green, champagne and brand-orange materials.

## Map and office facts

The map uses the site's existing `GOOGLE_MAPS_EMBED_URL`, and its directions and place actions reuse the existing constants in `site-config.ts`. Address and area tags come from the existing company data. Roads and routes were not fabricated. Google controls the map's contents and marker rendering; its preview requires Google's external resources. The address and direct map links remain in server HTML.

The generated building illustration is a small decorative icon, not a photograph or claim about the office's appearance.

## Generated assets

Generated with the built-in ImageGen tool, one transparent image per icon. The 1254px PNG outputs were optimized to 256px WebP with transparency retained. Total additional public image weight is about 66KB.

| Asset | Saved file | Bytes |
| --- | --- | ---: |
| Digital strategy | `frontend/public/img/homepage/founder-office/digital-strategy.webp` | 15,424 |
| Search visibility | `frontend/public/img/homepage/founder-office/search-visibility.webp` | 12,742 |
| Business automation | `frontend/public/img/homepage/founder-office/business-automation.webp` | 18,912 |
| Office building | `frontend/public/img/homepage/founder-office/office-building.webp` | 19,214 |

The complete prompts, mode and final paths are recorded in [the icon prompt set](founder-office-icon-prompts-2026-11-06.json). The founder image was not generated or edited.

## Motion and accessibility

- One-time 600ms fade/up reveals for the portrait, heading, paragraphs, principles and office areas, with a small stagger.
- Native IntersectionObserver and Web Animations; no additional animation dependency.
- Content is visible without JavaScript. Reduced motion skips reveals and removes hover transforms/transitions. Animations, observers and listeners are cleaned up.
- Maximum portrait hover scale 1.015; restrained button/link feedback with visible keyboard focus.
- Existing CTA destinations are preserved; named action targets are at least 44px high.
- Intrinsic image dimensions, below-fold lazy loading, semantic headings, an address element and descriptive founder alt text.

## Verification

Passed:

- Production `npm run build`: 275 pages generated. Existing WordPress filesystem-tracing warnings and the Tailwind configuration module-format notice remain outside this change.
- `npm run typecheck`.
- `npm run lint`: zero errors; four existing unused-function warnings in `howrahshah/page.tsx` and `layout/Header.tsx`.
- `npm run verify:site-data`: no failures.
- `npm run verify:standards`: no warnings or failures.
- Browser checks at 320, 390, 768 and 1440px in both themes: no horizontal overflow or clipped section elements; all five selected images load.
- Original section copy, all six link targets, title, canonical and H1 retained. Other homepage section links and text retained. The case-story section intentionally shows all projects under reduced motion, so its conditional visible text was excluded from the normal-motion snapshot comparison; its source and CSS are unchanged.
- Source comparison against the previous published checkout found changes only in this section's three new components/styles, its homepage import, and the one surface-override exclusion.
- About, founder and contact destinations return HTTP 200 locally. No enquiry forms or production APIs were submitted.
- Keyboard focus, JavaScript-disabled readability and dynamic reduced-motion cancellation passed. Normal-motion reveals run for 600ms and reduced motion has zero active section animations.
- Real Google Maps resources were allowed for read-only preview checks; other external/API requests were blocked.

Browser evidence is in [the QA report](../../reports/founder-office-2026-11-06/qa.json), with [desktop dark](../../reports/founder-office-2026-11-06/desktop-dark.png), [desktop light](../../reports/founder-office-2026-11-06/desktop-light.png), [mobile dark](../../reports/founder-office-2026-11-06/mobile-dark.png) and [mobile light](../../reports/founder-office-2026-11-06/mobile-light.png) previews.

The real map is also verified in a [mobile viewport capture](../../reports/founder-office-2026-11-06/mobile-map-viewport.png). Tall section screenshots can show its pin placeholder because Chrome does not paint the external iframe outside the current viewport; the live map renders when scrolled into view.

This is a local implementation and build verification. It does not certify a production deployment or enquiry delivery.
