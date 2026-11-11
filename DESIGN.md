# Crea8iv Media design contract

## Identity
- Source of truth: `frontend/src/styles/brand-tokens.css`; primary orange is `#FF6801`, not peach or `#F26A21`.
- Preserve the approved homepage hero composition, logo, copy and desktop/mobile hierarchy. Replacement needs explicit approval.
- Homepage sections remain dark with restrained warm lighting; no white bands without approval.
- Preserve existing global theme functionality elsewhere. Client imagery retains its own brand colours.

## Composition
- Prefer unframed editorial sections. Cards are for repeated items and genuinely framed tools, not every section.
- Keep website development, Google Ads and SEO/AI visibility prominent; supporting expertise stays secondary.
- Connect featured work, services, case studies and project enquiries with usable links.
- Use existing typography and breakpoints; no viewport-scaled type or negative letter spacing.
- Active navigation uses its existing underline, not a filled bubble.

## Reusable homepage system
- Owner direction recorded 2026-11-09: use the approved homepage as the visual source for future page revamps. Component locations and typography are recorded in `docs/HOMEPAGE_DESIGN_SYSTEM.md`.
- "How buyers decide" is the preferred typography reference: the existing Josefin Sans family, strong headings, readable paragraph weights and the same responsive hierarchy. Do not introduce a different font pairing per page.
- Keep each approved card family consistent wherever its section type recurs. Insights always uses the existing notched editorial cards. Choose appropriate families and vary content/section composition for interest, rather than redesigning the same cards.
- Reuse presentation and CSS Modules with page-specific data. Keep shared component improvements compatible with the homepage.
- Reuse the existing colourful 3D-style conceptual icon images before generating more. New artwork must match the existing family; it must not imitate official platform logos.
- 3D carousel/perspective cards are excluded from the default reusable library; leave existing instances in place unless a requested page change includes them.
- Preserve existing dark/light theme behaviour and section-specific palette treatments. Brand orange stays `#FF6801`; local artwork accents are not a replacement brand colour.

## Page revamp direction
- Reuse the page's existing message. Light editing for clarity and concision is authorised within a requested revamp, provided every material point, qualification, factual claim and useful link remains intact. Do not replace the content with generic new marketing copy.
- Replace the requested page's old card styling with appropriate homepage card families by default; retain a legacy design only when the owner identifies it for retention. Preserve its content and behaviour. A different visual system or broader redesign is a separate request.
- Keep peer cards visually balanced through consistent padding, image ratios, responsive grid/flex alignment and concise complete copy. Use equal heights within comparable rows; avoid arbitrary fixed heights, clipping, ellipses that hide the message or tiny text.
- Prefer a centred page composition, balanced heading/intro groups and clear CTA placement. Keep long copy, lists and forms aligned for easy reading. Consistency and clarity take priority over forcing every element to be centre-aligned.
- Adapt each requested page's hero to its subject, with the homepage's type, colours, buttons, imagery and motion language. Improve the full page beneath it, including section order, spacing, headings, paragraphs and cards. Preserve protected SEO meaning and functionality.
- Use purposeful images and conceptual visuals where they help explain the page. Reuse existing assets; request the owner's reference before generating new digital-marketing concept artwork. Match the supplied reference and approved brand family.
- Make the page premium, visually appealing and easy to act on through clear hierarchy, specific next steps, genuine evidence, readable contrast and restrained motion. These are design goals, not verified conversion-performance claims.

## Evidence and interaction
- Genuine screenshots must not clip important content or stretch. Use contain sizing and intentional frames.
- Retain intrinsic dimensions/aspect ratios. Lazy-load below-fold media, not the primary hero image.
- Image enlargement must support keyboard use, Escape and return focus.
- Mobile media rails retain swipe, keyboard controls and inspectable images.
- Preserve readable contrast, semantic headings and visible focus. Aim for 44px touch controls.
- Use existing Lucide icons; retain genuine platform/logo colours where appropriate.
- Hover polish needs a keyboard equivalent. Respect reduced motion and clean up animations.

## Approval evidence
- Inspect 390px mobile, 768px tablet, 1440px desktop and 320px narrow layouts.
- Check menus, dialogs, CTAs, overflow, image loading and SEO fields. Screenshots need human review.
- Fix layout before changing copy to fit. The owner has authorised light concision during requested page revamps when the full message survives. Substantive content/factual changes and metadata changes still need their own approval.
