# Buyer journey, service orbit and client project fan — 6 November 2026

Implemented the three requested homepage changes using the site’s existing design system and the attached fan-carousel reference.

## Changes

- Service orbit: desktop stage 560 → 640px, icons 68 → 84px, mascot 170 → 210px. The path radius also increases from 37% to 40% of the stage. Tablet and mobile sizes adapt to available space.
- Popup dimensions remain identical to the before baseline at 320, 390, 768 and 1440px in both themes. Rotation, hover pause, inline popups and existing service links are retained.
- Buyer artwork: three new concepts in orange, forest green, warm ivory and champagne. Discovery uses a lens and a business marker; trust uses a shield and evidence tiles; decision uses a confirmation button and conversation path. Their 7:5 media areas fill cleanly, with no purple/blue palette.
- Client stories: the three existing client projects form an interactive fan. The centre project is prominent; its neighbours sit behind at an angle. Users can drag, swipe, select cards, use arrows/dots or navigate with Arrow keys/Home/End.
- Project descriptions, statuses, service tags, case-study URLs and external website links remain unchanged. Genuine website screenshots retain their full aspect ratios and can be enlarged with keyboard/Escape/focus return.
- The previous pinned scroll scene is replaced with normal page flow. Reduced motion snaps directly to the selected project. With JavaScript disabled, all three projects and their links remain visible.

The established theme behaviour is preserved: the services section uses forest green only in light mode; its dark-mode surface stays as before. Hero, header, other homepage sections and SEO data are unchanged.

## Integration

The project already supports TypeScript, Tailwind CSS 4 and Motion. Reusable UI components belong in `frontend/src/components/ui/`, matching the existing `@/* → ./src/*` alias. Creating a second root `components/ui/` folder would bypass that established structure; no CLI reinitialization is needed.

The adapted reference component lives at `frontend/src/components/ui/carousel-07.tsx`, with scoped styles. The small category pill uses the existing theme’s CSS, so no additional badge/variant package is needed. No package manifests or lockfiles changed.

## Verification

| Check | Result |
| --- | --- |
| 320 / 390 / 768 / 1440px, both themes | 24 section/viewport checks passed |
| Popup size baseline | All eight theme/width combinations identical |
| Images / overflow | Selected images decode; no horizontal page overflow |
| Protected content | Every unrelated section’s normalized text and links match baseline |
| Project evidence | All three names, descriptions, categories, statuses, tags and case/live links match baseline |
| SEO | Title, description, canonical, H1 and JSON-LD match baseline |
| Keyboard | ArrowLeft/Right, Home/End, card selection with focus return passed |
| Image dialog | Enter, Escape and return focus passed |
| Mouse drag | Project changes and settles centrally; no accidental image opening |
| Touch | Horizontal swipe changes project; vertical gesture scrolls the page |
| Reduced motion | Mid-transition preference change settles on the correct selected project |
| No JavaScript | All three projects visible with both links each |
| Lint | Passed; four existing unused-function warnings elsewhere |
| Type checks / production build | Passed |
| Site-data / code standards | Passed |
| Dependencies | No new dependencies |

One visual review round was sufficient. All three brand illustrations and desktop/mobile views were inspected. No production enquiries, external messages, booking actions or live backend submissions were made. Build warnings about WordPress dynamic filesystem tracing and Tailwind module format predate this change.

## Evidence

- [Client fan — light desktop](light-1440-featured-case-studies.png)
- [Client fan — dark desktop](dark-1440-featured-case-studies.png)
- [Client fan — mobile](light-390-featured-case-studies.png)
- [Buyer artwork — light desktop](light-1440-home-buyers-decide.png)
- [Buyer artwork — dark desktop](dark-1440-home-buyers-decide.png)
- [Enlarged orbit — desktop](light-1440-home-problem-services.png)
- [Enlarged orbit — mobile](light-390-home-problem-services.png)
- [Viewport and baseline checks](qa-round1.json)
- [Mouse, touch and fallback checks](interaction-checks.json)
- [Generated asset paths and exact final prompts](asset-prompts.md)
