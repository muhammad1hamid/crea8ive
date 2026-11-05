# Crea8iv dual-market delivery

20 September 2026. Deployed to Hostinger after the user’s explicit “deploy and live” instruction. No Git commit or push.

## Review the result

- Pakistan: https://crea8ivmedia.com/
- Qatar: https://crea8ivmedia.com/qa/
- Arabic Qatar: https://crea8ivmedia.com/qa/ar/
- Source audit and selected direction: `docs/CREA8IV_DUAL_MARKET_AUDIT.md`.
- Portable project skill: `docs/skills/crea8iv-dual-market/SKILL.md`.
- Before/after screenshots and machine-readable evidence: `reports/dual-market/`.
- Verified export: `/private/tmp/crea8iv-dual-release/frontend/out`. Existing workspace export was not replaced. Preview process is temporary; rebuild before an eventual release.

## Pakistan — preserve and polish

Preserved the robot hero, logo, black/orange identity, typography direction, pill navigation, CTA language, page composition and portfolio. Fixed Tailwind configuration isolation: Qatar's reduced utility build had left the local Pakistan export without desktop layout and typography utilities. Added explicit global config instead of redesigning the hero.

Replaced internal implementation instructions accidentally displayed on the homepage with customer-facing copy, retaining the section composition. Added keyboard access to mobile industry/process scroll regions and reduced-motion handling for hero entrances. Shared header/footer images use smaller derivatives of the same logo; footer images are lazy. Footer distinguishes Pakistan operations and Qatar-market enquiries without inventing a Qatar office.

Repaired legacy WordPress fragment containment: orphan closing divs on About escaped the React wrapper and broke hydration. Both the content and following trust link remain intact. Also fixed an export-only homepage hydration defect: the export script moved a React-owned preload after rendering. It now preserves the rendered markup and preload. The release freshness check considers source files rather than directory mtimes changed by restoring runtime-only directories.

## Qatar — premium growth experience

Selected **Growth Network** from three concepts before implementation. New explicit hero: “Growth systems built for Qatar.” Original architectural concept art, precise service proposition, stable Qatar growth-audit CTA and honest WhatsApp contact fallback. Responsive desktop and mobile art, restrained transform entrance, no animation gate.

Added:
- Linked capability strip for visibility, acquisition, automation, software and content.
- Nine-stage interactive system: AI visibility → traffic → ads → lead → WhatsApp → CRM → follow-up → customer → retention. Each native disclosure explains the work, purpose and next service. Works without JavaScript and by keyboard/touch.
- AI-discovery section with entity, content, citations and structured-data evidence; readiness-check CTA and truthful explanation of limitations.
- Acquisition, automation and software delivery sections with contextual enquiry paths.
- Route-specific growth/visibility modules and distinct industry decision journeys using existing catalogue content.
- Larger editorial team-production preview while retaining individual project credits and other-studio attribution.
- Insights/research links, clearer closing audit CTA and intentional Arabic RTL layouts and type scale.

Preserved 95 Qatar routes, catalogue content, source citations, 15 Arabic pages, real language counterparts, existing tools, contact persistence contract and first-touch attribution. Research methodology remains noindex. Contextual service selection now survives the trip to the enquiry form. Additional details are optional; the required business goal supplies the existing backend requirements field when details are omitted. No backend validation was weakened.

## Media and motion

Built-in image_gen generated the original architecture. Inspected for text, artifacts, wrong landmarks and false location implications; presented as an architectural concept, not a real Qatar property. Final assets:

- `frontend/public/images/qatar/hero/growth-network-1600.webp` — 43,774 bytes.
- `frontend/public/images/qatar/hero/growth-network-960.webp` — responsive desktop alternative.
- `frontend/public/images/qatar/hero/growth-network-mobile.webp` — 22,640 bytes.
- Shared logo derivatives: `frontend/public/img/crea8iv-header-dark.webp` and `crea8iv-header-light.webp` — approximately 12.5 KB combined.

Prompts/provenance are in `docs/qatar-image-prompts/`. Seven supporting service/industry prompts are prepared, not falsely marked as generated assets. Existing approved production stills remain the proof. No playable film source was supplied in the current repository integration, so no fake play controls or invented VideoObject schema were added.

No package added. No Convex, Three.js, new UI kit or additional animation runtime. Qatar modules remain in Qatar roots. CSS/native interactions suffice; existing Motion handles Pakistan hero behavior. All content remains available without animation; reduced motion removes the new entrance effects.

## Performance and hosting

Added streaming gzip for compressible static responses to the existing Node server, with Accept-Encoding negotiation, Vary, q=0 handling, HEAD support and no image recompression. The Next runtime already compresses responses. Apache/CDN deployments must retain their own compression and routing configuration; Node changes are not an Apache configuration change.

Final localhost static-export probe: 390×844, device scale 3, 4× CPU throttle, approximately 1.6 Mbps down / 750 Kbps up, 150ms configured latency:

| Market | LCP | CLS | Observed resource transfer |
|---|---:|---:|---:|
| Qatar | 892 ms | 0 | 207 KB |
| Pakistan | 1,100 ms | 0 | 702 KB |

Single local lab runs, not production field results or an INP certification. Evidence: `performance-final.jsonl`. Qatar estimated first-load JavaScript remains approximately 147 KB; the new server-rendered sections introduce no client island. HTML gzip round-trip validation reduced the sampled homepage body from 356,050 to 51,907 bytes.

## Validation

- Production Next build and fresh isolated static export pass.
- TypeScript, ESLint and Node syntax checks pass.
- 95 Qatar pages: canonical, metadata uniqueness, H1/main landmarks, language, reciprocal alternates, schema syntax/truth guards, internal links and sitemap validation pass; 94 indexable, no orphans.
- All 188 baseline Pakistan HTML routes preserved. Release verifier finds 303 sitemap destinations, zero missing destinations and zero duplicate titles.
- Final responsive matrix passes: 90 samples across 15 routes at 375, 430, 768, 1024, 1440 and 1920; zero horizontal overflow, broken loaded images, or browser runtime errors. All 30 sampled axe WCAG A/AA scans pass. Screenshots cover both market homepages and Arabic at all six widths. Evidence: `reports/dual-market/after/validation.json`.
- Native growth stages work without JavaScript and via keyboard; reduced-motion hero check passes; unknown service query values are rejected.
- Ten English/Arabic browser form checks pass with a mocked local endpoint: error, retry, acknowledged success, attribution, service selection, language and optional-details fallback. No production lead was sent; this is not a new production persistence test.
- Gzip integrity, Vary, q=0, HEAD and image-handling checks pass.

## Remaining release boundaries

Safari WebDriver is installed but refused a session because “Allow remote automation” is disabled in Safari settings. Chromium results do not certify Safari/Firefox. No Safari security setting was changed. Native Arabic editorial review, approved video source/rights for playback, live enquiry routing/storage, live analytics delivery and production Core Web Vitals remain release checks. Qatar official phone/registration/office are still unverified and are not fabricated. Supporting concept prompts are not a delivered image library.

The implementation is ready for local review; the full cross-browser/production acceptance standard is not claimed complete.

## Files changed in this task

Shared/Pakistan: `frontend/src/app/globals.css`, `(global)/layout.tsx`, `components/HeroSection.tsx`, `HeroSection.css`, `HomepageBelowHero.tsx`, `layout/Header.tsx`, `layout/Footer.tsx`, `wordpress/WordPressContent.tsx`, new `styles/brand-tokens.css`.

Qatar: `QatarHome.tsx`, `QatarLayout.tsx`, `QatarPage.tsx`, `QatarContact.tsx`, new `QatarGrowthSystem.tsx`, `QatarVisibility.tsx`, `QatarDelivery.tsx`, `QatarIndustryJourney.tsx`, `qatar-growth.css`; homepage heading consistency in `data/qatar/catalogue.ts` and `arabic.json`.

Infrastructure/evidence: `frontend/server.mjs`, `scripts/static-export.mjs`, `scripts/verify-release.mjs`, new `scripts/verify-dual-market.mjs`, `scripts/verify-dual-forms.mjs`, media assets and the audit/delivery/skill/prompt/evidence files above. The repository had extensive pre-existing changes; its total Git diff is not attributable to this task.

Suggested future checkpoint: `Refine Pakistan experience and evolve Qatar connected-growth website`.


## Production deployment — 20 September 2026

Published the verified isolated static export to Hostinger. Uploaded 193 changed asset/backend files first, then 633 page/data files using delayed updates. No remote files were deleted; existing admin directories and old hashed assets were preserved. The production `.htaccess` tenant-routing block was retained, with only the Buildscape portfolio redirect exception added. Future deployments must preserve this server-only block.

Rollback copies of replaced files are at `/home/u700603111/domains/crea8ivmedia.com/release-backups/dual-market-20260920`, outside the public webroot. The previous homepage and routing file were confirmed present. New-file manifests are saved in `reports/dual-market/live/`.

Post-deployment checks: 354 sitemap/internal-link URLs passed; desktop/mobile Chromium checks passed across Pakistan, Qatar English/Arabic, contact and About pages. Production compression is active. An empty JSON POST to the live enquiry endpoint returned HTTP 422 and a validation error, without creating a lead. Valid submission persistence, analytics delivery, Safari and field Core Web Vitals remain outside this deployment verification.

Evidence: `reports/dual-market/live-route-audit.json`, `reports/dual-market/live/smoke.json`, and live screenshots in the same directory.
