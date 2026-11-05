# Crea8iv Media Website Brand and UX Audit

Date: 2026-08-29 PKT  
Scope: public website, shared navigation, homepage, native service templates, blog/article surfaces, accessibility, conversion paths, and responsive behavior.

## Phase 1: Understand

CREA8IV MEDIA is a Pakistan-based growth studio combining digital marketing, brand and creative work, websites, SEO, paid acquisition, automation, and software. The primary audiences are local service businesses, clinics, restaurants, architects/interior studios, e-commerce brands, and growth-stage operators in Rawalpindi, Islamabad, and Pakistan.

Primary conversion: start a qualified consultation or strategy call.  
Secondary conversions: open a service path, inspect proof/portfolio, use a free growth tool, contact by WhatsApp/call/email, or read an educational insight.

## Phase 2: Audit Findings

### Critical

- Route and content changes must preserve the existing URL structure and trailing-slash behavior. The site has a large content inventory, so shared template changes are safer than mass URL changes.
- Light mode previously depended on broad overrides against hard-coded dark Tailwind surfaces. That created unreadable blog/native-page combinations and unpredictable button contrast.
- Trust should remain first-party. Expired third-party review embeds were already removed; portfolio, founder, location, and case-study signals are now the preferred proof layer.

### High Priority

- The primary navigation exposed too many top-level choices. Seven top-level destinations now cover the decision journey: Home, Solutions, Results, Plans, Platforms, Insights, and About. Free Tools and Careers remain discoverable inside their relevant groups.
- The homepage repeated several long explanatory sections. Buyer-path and public-plan sections were removed from the initial flow because their information is already represented by service tiles, tools, results, and consultation CTAs.
- Shared cards and sections used different hard-coded backgrounds, borders, and text colors. A semantic token layer now controls the page, section, card, text, line, green support, and shadow values in both themes.
- The site needed a keyboard-visible skip link and a stable main content target. These are now part of the shared chrome.

### Medium Priority

- Continue replacing raw utility color values inside older page snapshots with semantic classes where a page is actively edited.
- Add measured proof only where an underlying source or case study exists. Avoid unsupported percentage claims in visible copy or structured data.
- Keep the hero visual art-directed and compressed; use `priority` only for the primary above-the-fold visual and lazy-load the rest.

## Phase 3: Information Architecture

```text
Home /
├── Solutions /growth-systems
│   ├── Paid acquisition /meta-ads, /google-ads
│   ├── Local visibility /google-business-profile-growth
│   ├── Website and creative /website-development, /branding-and-creative
│   └── Automation and AI /marketing-automation, /ai-search-optimization
├── Results /results
│   ├── Industry proof /results/health-clinics, /results/restaurants
│   └── Portfolio groups /results/interiors-architects, /results/e-commerce, /results/logo-identity
├── Plans /pricing
├── Platforms /platforms
│   └── Tools and software /tools, /patientflow, external platforms
├── Insights /blog
├── About /about
│   ├── Founder /syed-qamar-abbas
│   ├── Team /our-team
│   ├── Academy /courses
│   ├── Careers /careers
│   └── Contact /contact
└── Consultation /consultation
```

## Phase 4: Design System Direction

- Brand anchors: charcoal/black, warm orange `#FF6801`, deep green `#0C5446`, cream `#FCFAEE`, and beige `#DBD0BE`.
- Dark mode: near-black page surfaces, cream text, restrained orange emphasis, green as a supporting trust/utility accent.
- Light mode: cream page surface, green primary text, orange action color, white and beige cards, and green-tinted borders/shadows.
- Radius: restrained 10px to 18px for cards and panels; pill shapes are reserved for tags, toggles, and explicit CTA controls.
- Motion: short lift/opacity transitions only; long continuous effects are disabled under reduced-motion preferences.
- Interaction: all meaningful icon controls keep an accessible label, visible focus state, and at least a practical touch target.

## Phase 5: Conversion Rules

- One primary action per viewport: start an audit/strategy call.
- Secondary paths: services, results, free tools, and direct contact.
- Place proof near the first meaningful CTA, not only at the bottom of a page.
- Use topic-specific CTA language on articles: local visibility audit, ads budget plan, website audit, or AI search audit.
- Keep forms short and explain what happens after submission.

## Phase 6: Verification Checklist

- `npm run build`
- Check `/`, `/growth-systems/`, `/results/`, `/blog/`, `/blog/[slug]/`, `/tools/`, `/contact/`, and `/syed-qamar-abbas/` in dark and light modes.
- Confirm no horizontal overflow at 390px, 768px, 1280px, and 1440px widths.
- Confirm keyboard access to navigation, theme toggle, mobile menu, CTAs, forms, and footer links.
- Confirm every edited route retains canonical metadata and its existing URL.
- Confirm hero images are present, meaningful, and not blocking the rest of the page.
- Confirm `prefers-reduced-motion` removes marquee and decorative animation.

## Next Implementation Phases

1. Replace remaining page-specific raw color utilities in priority routes with the token classes.
2. Add route-level visual QA for all page families and repair any remaining light-mode contrast failures.
3. Add an evidence-backed proof/case-study content model and connect it to service pages.
4. Run Lighthouse/axe-style checks and validate Search Console, sitemap, RSS, and structured data after deployment.
