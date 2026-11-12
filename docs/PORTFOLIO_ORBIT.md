# Full Portfolio page

The `/results/` page uses one finite scroll-driven cinematic lane. `normalizePortfolio` derives
chapters, project order and category boundaries from the existing showcase data.
The six chapters are Websites, Brand Identity, E Commerce, Health Clinics,
Interiors & Architects, and Restaurants. Campaign chapters come from the existing
asset registry; original work categories and source objects remain intact.
Chapter navigation never removes projects from the showcase. View All uses the
same six groups as filters; the legacy archive hash still opens all campaigns.

The logical position is measured in projects and derives from actual document
scroll. Rendering writes transforms directly; React updates the active metadata
only when the nearest project changes. Stable index-based variation gives the
cards depth without randomly changing their paths. The page has finite bounds.

Category buttons navigate to chapter starts with distance-based cubic easing.
They use the registered site Lenis controller when available, otherwise a native
document-scroll tween. Ordinary scrolling has one controller. Large wheel input
can cancel a jump; controls become interactive again once navigation settles.

View All provides a conventional grid with real filters. Returning restores the
previous showcase position. A case study expands from its source card and contracts
back to it, preserving page scroll and keyboard focus. A native dialog provides
the focus boundary; its vertical scroller drives the horizontal editorial strip.
Sections and imagery come from the existing public case-study/project registries.
Projects with limited documentation retain their actual available description
and destination links instead of invented results.

Desktop keeps previous and upcoming previews on opposite sides of a sharp hero.
The approaching card grows forward; the outgoing card retreats into the previous
stack. Two nearby project images crossfade into a full-bleed scene, with
theme-specific readability scrims. Background images are mounted only around the
current project. Fast scrolling temporarily hides the hover actions. On touch
devices, tapping the image opens the project without covering the image first.

Cards retain the original image-first presentation. Their aspect ratio follows
the actual loaded image, so landscape captures stay landscape and portrait work
stays portrait. Contain sizing keeps all four edges visible; no separate footer
panel or padded thumbnail is added. Titles/actions appear over a soft gradient
on hover or keyboard focus. Tapping the image opens its case study directly.
The active card has a restrained orange rim/glow. The scene is dimmed further,
and side previews use additional tilt, fading and reduced brightness.

The case study opens on the same immersive project image. Its Scroll to See
button begins the right-to-left editorial sequence; native wheel/touch and
keyboard scrolling work too. Closing first restores the hero before folding the
whole project back into its source card. Panel layouts adapt to the available
copy and imagery; no fabricated project results are added. Hero images also use
contain sizing. Gallery panels pair existing desktop/mobile screenshots without
generating replacement mockups. Premium study content includes its responsive
showcase and proof gallery where present; STW uses its existing scope/architecture
and measurement data. Buildscape's journey and scope arrays are shared with its
original case-study page through `buildscape-case-study.ts`.

Mobile reduces the depth and visible preview count, with scrollable chapter
labels. Reduced motion shows one project without depth
effects while preserving navigation and case studies. Existing SEO metadata,
canonical URLs and structured data remain owned by the Results route.

## Validation

Run `npm run test:portfolio`, `npm run typecheck` and the normal lint checks from
`frontend/`. Run `node scripts/qa-portfolio-cinematic.mjs` against the local
preview (`PORTFOLIO_QA_URL`, default `http://127.0.0.1:4321`). The browser check
allows local static reads only; `QA_OUTPUT_DIR` selects its evidence folder.
It checks that the sticky stage actually remains onscreen after scrolling,
including on phones, and waits for visible artwork to finish loading.
Browser checks cover forward/reverse category boundaries,
near/distant jumps, keyboard controls, case-study scroll and exact return, View
All filtering and return, both themes, mobile and reduced motion. Smoothness is
a design target, not a measured frame-rate guarantee.
