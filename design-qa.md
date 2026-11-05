# Design QA

final result: passed

## Scope

- Desktop navbar visual refinement against the provided Crea8iv glass/orange references.
- Mobile bottom navigation refinement and root layout mount.
- Mobile sidebar/drawer refinement with contact and social sections.
- Premium desktop cursor with minimal dot, magnetic hover ring, trail particles, and click ripple/burst.

## Checks

- Production build: passed with `npm run build`.
- Desktop viewport 1440x900: navbar, CTA, cursor, and homepage hero render without horizontal overflow.
- Mobile viewport 390x844: bottom dock renders with 5 items, drawer opens, drawer contains 8 nav rows, 3 contact rows, and 3 social links.
- Cursor desktop: enabled only on fine pointer, idle dot 6px, hover ring expands to 58px, click creates ripple and particles.
- Mobile cursor: disabled cleanly.
- Browser console: no console errors and no 404s in final desktop/mobile QA pass.

## Notes

- Service-card click-through was verified during QA by clicking the first service card, which navigated to `/google-business-profile-growth/`.
- The service carousel is intentionally always moving, so cursor QA used manual pointer coordinates instead of Playwright's stability wait.
- Second balance pass: mobile dock reduced to 62px high with 16-18px icons, drawer now has one logo, real Font Awesome social icons, no non-working dark/light toggle, and the mobile hero hides extra chips on phone view to prevent bottom-nav overlap.
- Third balance pass: pricing mobile hero margin reduced from 150px to 80px, moving the first pricing heading from about 230px to 160px from the viewport top.
