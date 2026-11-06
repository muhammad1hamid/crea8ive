# Service orbit spacing and compact popup

The six service icons now sit at equal 60-degree intervals. Selecting one brings it to the top of the orbit and opens a smaller card immediately below it, inside the same visual. The existing icon assets, robot, colors, service copy and links are retained.

## Changes

- Replaced the uneven fixed coordinates (a mix of 45- and 90-degree gaps) with points on one regular circle.
- Retained the 60-second revolution and counter-rotation that keeps icons upright. Selection seeks both existing animation clocks together, then the orbit continues from that position when dismissed.
- Removed the viewport portal, collision-scoring placement and mobile fixed sheet. The popup is positioned relative to the orbit; page scrolling moves the card and orbit together.
- Removed the mobile auto-scroll on selection. Focusing the close button uses `preventScroll`.
- Reduced the card from 390px to a maximum 280px wide, and capped its height at 310px on desktop. Compact typography, badge, accent bar, related-service chips and the existing themed glass surface remain.
- Close and service actions stay visible. The description and related services scroll within the card when space is limited; that region is keyboard focusable. On narrow screens the card can use 24px of the orbit's existing bottom padding.
- Escape returns focus to the selected service. Clicking outside dismisses it and resumes the orbit when the pointer/focus are outside. Hover, keyboard focus, an open panel, an offscreen orbit and a hidden tab retain their pause behaviour.
- Reduced motion uses a static circle and immediate selection positioning, including an explicit override for the site's global transition rule.

Only `frontend/src/components/ui/radial-orbital-timeline.tsx` and its CSS module changed. No dependency or asset changes.

## Verification

- All six services checked at 320, 390, 768 and 1440px, in both themes: **48 popup checks** passed.
- Measured adjacent angles stay within 0.01 degrees of 60 degrees. Selected services align at the top while all gaps remain equal.
- Cards remain attached to their orbit, with no viewport-fixed popup, horizontal overflow or selection-triggered page scroll.
- Every original service title, description, specialty, CTA label and destination matches the before snapshot. Homepage metadata/schema match at every width; other homepage section text and links match at the same desktop viewport as the before snapshot.
- Close controls and service links stay visible; at 320px, keyboard End reaches the final related-service chip in the scrollable content region.
- Normal-motion checks verify the unchanged 60-second loop, hover pause, selected-node alignment, scroll attachment, restart after outside click, rapid service changes and switching to reduced motion.
- Production build passed with all 275 pages generated. Type checks and full lint passed; the four existing lint warnings and existing build tracing/module-format warnings remain outside this update.
- Browser requests used local static reads only. No forms or production API calls were submitted.

Evidence: [layout and content checks](../../reports/service-orbit-2026-11-06/layouts.json), [motion checks](../../reports/service-orbit-2026-11-06/motion.json), [compact control checks](../../reports/service-orbit-2026-11-06/controls.json).

Previews: [idle dark](../../reports/service-orbit-2026-11-06/idle-dark.png), [idle light](../../reports/service-orbit-2026-11-06/idle-light.png), [popup dark](../../reports/service-orbit-2026-11-06/popup-dark.png), [popup light](../../reports/service-orbit-2026-11-06/popup-light.png), [mobile dark](../../reports/service-orbit-2026-11-06/mobile-dark.png), [mobile light](../../reports/service-orbit-2026-11-06/mobile-light.png).
