# Homepage Mixed-Surface Refinement

## Latest Decision

The user rejected the white bands after reviewing the preview. The homepage now uses the charcoal palette throughout, including logos, website work, services, diagnostics, tools, industries, founder and location. Readable service colours, restrained gloss, reduced-motion improvements and the existing content/layout remain. The mixed-surface direction below is historical, not the current approved appearance. QA now asserts that every below-hero section is dark in both theme settings.

## Direction

Apply the supplied motion reference selectively to Crea8iv Media, not its unrelated DEEKORP financial brand. Preserve the approved hero composition, text, routes, metadata, structured data and enquiry logic.

The homepage now combines true white editorial bands with charcoal feature bands. This is a deliberate mixed composition in either global theme, not a replacement for the visitor's theme preference on other pages.

## Section Plan

| Section | Surface | Treatment |
| --- | --- | --- |
| Hero | Softer charcoal in dark mode | Existing composition, imagery and motion retained |
| Client identities | White | Circular client marks remain prominent |
| Website portfolio | White | Contained project screenshots, accessible project accents |
| Case studies | Charcoal | Restrained static card reflection |
| Services | White | Category-specific icon and link colours |
| Premium positioning and shortcuts | Charcoal | Subtle highlights, readable body copy |
| Diagnostics | White | Existing horizontal mobile navigation retained |
| Tools | Pale grey | White cards with service accents |
| Creative work | Charcoal | Existing real client visuals retained |
| Industries | White | Inspectable media, readable small labels |
| Process and delivery proof | Charcoal | Clear sequence, no added scroll pinning |
| Founder and location | White | Existing attribution and contact paths retained |
| Closing CTA | Charcoal | Existing action and text retained |

## Motion Audit And Decisions

- The hero already includes an animated scene and a pause control. No second hero animation controller was added.
- Logo movement already uses visibility observation and pointer/focus pause handling. It now avoids animation-frame scheduling when paused, offscreen or reduced motion is requested, and responds to preference changes.
- Logo previous/next actions now scroll instantly under reduced motion. Pointer cancellation clears drag state.
- Gloss is a static CSS reflection. No animated backdrop blur, particles, custom cursor, artificial progress or content-blocking intro was introduced.
- Hover feedback is restrained; enhanced hover shadows require a fine pointer and normal-motion preference. Content remains server-rendered and visible without reveal scripts.
- No new library or additional media downloads were introduced. No field Core Web Vitals achievement is claimed.

## Verification

The dedicated QA script checks 360, 390, 768 and 1440px viewports across both themes and normal/reduced motion. It checks alternating surfaces, heading contrast, small-label colours, horizontal overflow, H1 preservation, logo navigation and browser errors, and captures section screenshots.

Evidence is stored in `reports/home-mixed-surfaces-2026-10-21/`. Publication and live-host checks are separate from local verification. This refinement has not been deployed as part of implementation.

Completed checks: 16 surface/theme/motion combinations; 45 rendered responsive checks with no overflow or browser errors; 12 existing carousel/interaction combinations; 239 exported routes with unchanged titles, descriptions, canonicals, robots directives, H1s, JSON-LD graphs and internal-link sets. Production export and release verification pass. Lint has no errors and retains six previously recorded unused-function warnings. Screenshots were inspected for mobile services, desktop positioning, industries and the hero. Small industry labels and diagnostic actions were corrected for white-background contrast during review.

## Rollback

Pre-edit source backup: `/private/tmp/crea8iv-before-mixed-surfaces-20261021.tar.gz`. Restore only these task changes if needed; preserve the wider existing worktree.
