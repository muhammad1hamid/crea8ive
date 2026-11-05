# Ambient surface treatment — 10 September 2026

Implemented theme-specific background gradients and restrained card gloss in src/components/layout/ambient-surfaces.css, imported by SiteChrome. Removed the fixed ambient-grade overlay so background lighting no longer sits above portfolio images and text.

Section pseudo-elements are pointer-events none with negative stacking order inside isolated sections. Dark mode uses orange/amber and champagne light; light mode uses softer peach/champagne. Hero, selected websites and final enquiry sections drift slowly (34–40 seconds). Mobile retains only slower hero drift (46 seconds); prefers-reduced-motion stops the added motion. Card highlights use background gradients and inset shadows, with modest hover edge lighting. No video, WebGL, extra animation JavaScript or new media downloads.

Validation: production build, lint/types and release verification passed (188 routes). Browser inspected dark desktop, light desktop, light mobile, animation durations/layer order, absence of the old overlay, and no mobile horizontal overflow. Reduced-motion behavior defined via CSS media query; not OS-emulated in this check.

Complete release manifest: frontend/.deploy/ambient-surfaces-20260910-manifest.txt. Deployment includes the existing full route audit before success.
