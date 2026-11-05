# Crea8iv Media — Qatar expansion baseline audit

Date: 20 September 2026 (Asia/Karachi)

## Decision

Extend the existing Next.js website under `/qa/`, preserving the Pakistan URLs, brand assets, content sources, and working conversion infrastructure. Start implementation with the company/entity correction. The current public representation of Crea8iv as a private limited company conflicts with the owner-supplied brief, which states that business is closed and the current Pakistan business is a sole proprietorship.

This report completes the initial repository audit milestone. No website source, production content, external account, or Canva design was changed during this audit. The expansion itself is not implemented.

## Evidence and limits

- Full supplied master brief read; Canva shortlink resolved to design `DAHNCBfbPYM`. Canva design contents were not fetched or edited.
- Portfolio PDF text inspected throughout; Visit Qatar page visually inspected. Portfolio statements remain first-party claims, not independent evidence of commissioning or publication rights.
- Source examined in `frontend/src`, configuration, public discoverability resources, enquiry handler, and existing operational documentation.
- Existing `frontend/out` export dated 19 September 2026 inspected. The release verifier considers it current relative to website source/public assets. This is not a new build.
- Public GET checks covered 221 destinations: 219 existing destinations plus the proposed `/qa/` path and an intentionally nonexistent URL. All 219 existing destinations ended in HTTP 200. The two expected nonexistent destinations returned HTTP 404.
- A public GET returning 200 is availability evidence, not proof of correct rendered content, indexation, rankings, form delivery, or backend functionality. Redirect targets were recorded.
- No Search Console, GA4 reports, CRM data, credentials, private lead database, or production administration was accessed. Ranking and conversion baselines remain unknown.
- The workspace started with 748 modified/deleted/untracked paths. Existing work was preserved. Broad cleanup, reset, and generated-output replacement would be unsafe without reviewing that work.

Evidence files: `baseline.json`, `routes.csv`, `live-routes.json`, `responsive-baseline.json`, `legal-reference-files.txt`, and the six viewport screenshots in this directory. Re-run static export analysis with `python3 scripts/qatar_baseline_audit.py`.

## 1. Framework, content, and build map

| Area | Observed implementation | Qatar implication |
|---|---|---|
| Primary application | `frontend/`: Next.js 14.2.33 App Router, React 18.3.1, TypeScript, Tailwind 3 | Retain framework and component conventions |
| Output | Node rendering and optional static export; `trailingSlash: true` | Test both source routing and deployed static routing |
| Build scripts | `build`, `export`, `release:static`, `verify:release`, `preflight:seo` | Use existing release checks; do not run deployment as part of local implementation |
| Legacy projects | Astro public-site snapshot and Vue client portal under `project/` | Do not mistake these for the main site; Astro snapshot still feeds fallback content |
| Content | Native TS data + WordPress fetch/fallback + Markdown manual posts + admin-published posts | Qatar content should use a deliberate data registry, not duplicate legacy snapshots |
| Route discovery | 83 `page.tsx` source patterns, including admin and parameterized routes | Source-pattern count is not public URL count |
| Public export | 209 sitemap URLs: 188 HTML pages + 21 text/JSON/CSV resources | Preserve known public URLs and compare before/after manifests |
| Runtime | Shell Node 25.9.0; package requires Node >=20 and <25 | Use a supported runtime for implementation build verification |
| Instructions | `frontend/AGENTS.md` asks for installed Next docs before changes; that docs directory is absent | Version-specific official Next 14 docs were consulted for planning |

The root README describes a WordPress workflow; `frontend/README.md` is generic and does not accurately describe the complete current architecture. Runtime source and release scripts are the stronger evidence.

## 2. Route inventory and preservation

The complete export URL/title/description/canonical inventory is in `routes.csv`; source patterns and schema types are in `baseline.json`.

| Family | Existing public HTML coverage |
|---|---|
| Blog | 54 article URLs under `/blog/{slug}/`, archive, and pages 2–3 (57 total) |
| Answers | Hub + 19 answer briefs (20 total) |
| Tools | Hub + 10 tools (11 total) |
| Industries | Hub + 6 industry pages (7 total) |
| Website development | Hub + 8 location/industry pages (9 total) |
| Software development | Hub + 5 specialized pages (6 total) |
| Core location-service families | Meta Ads, Google Ads, GBP, social media, content creation, branding, consultation: 4 each |
| Proof | `/case-studies/` + 4 case studies; `/results/`; website portfolio + Buildscape detail |
| Education | Guides (4), comparisons (6), playbooks (5), AI authority planning pages |
| Business/contact | About, services, contact, consultation, pricing, team, company verification, privacy, terms |
| Products | Platforms, software products, PatientFlow |
| Qatar | No `/qa/` source routes identified; live `/qa/` returns 404 |

Existing industry slugs: `restaurants-cafes`, `clinics-dental`, `architects-interiors`, `ecommerce-retail`, `real-estate-builders`, `education-academies`.

Existing case study slugs: `the-smile-xperts`, `home-studio-interiors`, `co3-premium-liquid-shop`, `hassan-nawaz-architects`. Preserve their attribution and geography; they do not establish Qatar delivery.

**Preservation rule:** retain the home page, all current service/location routes, blog canonical URLs, founder page, proof pages, tools, and legacy redirects until performance and backlink evidence supports a change. This is precautionary preservation, not a claim that all those URLs rank. No current high-performing URL list can be established without Search Console/analytics data.

## 3. Metadata, schema, and indexability

Metadata sources include `src/lib/seo-metadata.ts`, page-level `generateMetadata`/`metadata`, and WordPress metadata helpers. Site schema is emitted from the root layout through `SiteSchema.tsx`; page schema comes from `PageSchema.tsx` and page-specific components.

Export findings:

- All 188 HTML sitemap entries have titles, descriptions, and self-referencing canonical URLs.
- No duplicate title or canonical groups. Blog archive and pagination pages 2 and 3 share one description.
- No `noindex` found on those 188 pages.
- 187 pages have one H1; `/howrahshah/` is the exception (see JSON for count).
- All embedded JSON-LD blocks parsed successfully. This is syntax validation, not a Rich Results Test or factual validation.
- Schema includes Organization, Pakistan LocalBusiness/ProfessionalService, WebSite, Person, Service, BreadcrumbList, Article/BlogPosting, CreativeWork, and software entities. Old company identifiers are still emitted globally.
- No hreflang pairs found. Root HTML has `lang="en"`; root OpenGraph defaults to `en_PK`.
- `robots.ts` allows public crawling, excludes several WordPress/search/feed paths, and references `/sitemap.xml`. Admin-specific noindex/access controls should be checked independently of robots.
- `sitemap.ts` is a flat sitemap, not an existing sitemap index. Qatar needs an explicit sitemap integration decision; do not assume an index already exists.
- Sitemap dates include fixed editorial dates and fallback current dates. Preserve truthful modification dates rather than refreshing every page date at every build.

**Confirmed live mismatch:** `/website-portfolio/buildscape/` appears as a detail page in the export/sitemap but the live request redirects to `/website-portfolio/`. Resolve the deployment redirect versus intended canonical detail page before release.

## 4. Internal links, redirects, orphan and thin-content candidates

Nine anchor destinations absent from the export were checked live. All resolve successfully. Eight use redirects (including old SEO/article spellings); `/patientflow/demo.html` returns 200. These are not nine broken links. Update internal links to final relevant URLs as a separate cleanup, while retaining legacy redirects.

Raw sitemap-page link analysis found these possible orphans:

- `/howrahshah/`
- `/khushal-salon/`
- `/our-team/`
- `/platforms/`

They also did not appear as anchors in the three hydrated sample pages at the checked widths. Header dropdowns are interactive and were not exhaustively expanded, so these remain candidates rather than proven sitewide orphans. Add useful contextual links where warranted.

Shortest body-content candidates include `/faqs/` (122 words), `/case-studies/` (217), `/guides/` (232), and `/our-team/` (253). Directory hubs can legitimately be short; word count alone is not a thin-content diagnosis. Review FAQ usefulness, team content relevance, and the old misspelled article links on the team page. Existing structured service families should be assessed for unique value before reusing their patterns in Qatar.

The baseline script reports both main-element words and words inside `#main-content`. A zero main-element count does not mean an empty page: 159 pages use the shared div-based content wrapper without a native `<main>` element.

## 5. Legal/entity correction map — highest priority

Owner-supplied current facts: Pakistan sole proprietorship; old private limited company closed; Qatar registration unverified. Default Qatar to `prelaunch`. Do not substitute an invented current registration number or legal owner name.

| Source | Required correction |
|---|---|
| `src/lib/site-config.ts` | Replace obsolete company legal-name representation with current verified business form |
| `src/lib/company-registration.ts` | Stop treating old incorporation/tax certificates as current active business credentials |
| `src/components/SiteSchema.tsx` | Remove obsolete current SECP identifier/taxID and align entity facts |
| `src/app/company-verification/page.tsx` | Preserve URL; rewrite to current business information without presenting old certificates as current credentials |
| `src/components/RegistrationTrust.tsx` | Replace current incorporation badge with accurate business information |
| `src/components/layout/Footer.tsx` | Remove current SECP/FBR registration claims |
| `src/components/layout/Header.tsx` | Update verification menu's “Registered” descriptor |
| `src/components/pages/NativeMarketingPage.tsx`, `src/app/[slug]/page.tsx` | Replace hard-coded registration links/badges |
| `src/components/LeadQualifier.tsx`, `PartnershipEnquiry.tsx` | Correct trust copy near conversion forms |
| Privacy/terms | Review operator wording derived from `BUSINESS_DETAILS.legalName` |
| `public/crea8iv-ai-facts.json`, `llms.txt`, `answers.md`, `service-answer-briefs.md`, `ai-citation-sources.md` | Remove stale company facts and regenerate from shared facts |
| `src/lib/social-links.ts` | Review GoodFirms profile using old company-name slug; do not fabricate a replacement URL |
| Historical project documentation | Label superseded where useful; do not confuse historical records with active public content |

Do not globally replace every “Private Limited” match: Buildscape's own client legal name appears in its case study and is a separate entity. Do not delete historical certificates as part of a text cleanup.

Create `src/data/company.ts` (or equivalent) as the facts owner. Keep backward-compatible `BUSINESS_DETAILS` exports while migrating consumers. Include nullable Qatar registration, address, phone, email, GBP and coordinates; central status must control visible wording and schema. A Pakistan office must never be represented as a Qatar office. Existing official Pakistan contact can be used transparently while Qatar contact remains unset.

## 6. Brand and design reuse

Existing header assets: `/img/logo.webp` for dark presentation and `/img/crea8iv-platform-logo-transparent.png` for the light treatment. Other supplied assets include square logos and an existing brand preview image. Reuse these originals without recreating the mark.

The current site has black surfaces, orange accents, light-mode support, and existing typography/spacing primitives. The homepage places a large mascot above copy on mobile; at 375px the main audit CTA falls below the first 1000px viewport. Qatar's brief calls for a more compact, corporate hero, so use a text-first layout and a visible primary audit action. Reuse branding rather than inheriting every visual effect.

Avoid shipping the original portfolio archive or unapproved PDF images as page assets. Use approved, compressed media with explicit dimensions and descriptive alt text.

## 7. Analytics, forms, and WhatsApp

- `DeferredAnalytics.tsx` loads GA4, GTM, Clarity, and Meta Pixel with existing deferred behavior; settings come from the admin store. Do not add a second independent Qatar tag stack.
- `analytics-events.ts` pushes a dataLayer event and a gtag event. Whether GTM also forwards the custom event to the same GA4 property is unverified; check duplication in preview before claiming clean reporting.
- The first-party event allowlist posts selected events to `/api/analytics/event`; new Qatar event names will need explicit handling, and backend acceptance must be tested.
- `PartnershipEnquiry.tsx` submits to `/enquiries/submit.php`, waits for `ok` and a reference before success, includes consent, honeypot, request ID, page and three UTM fields.
- PHP currently validates company/country/email/type/requirements and maps all non-Pakistan submissions to `international`. It does not yet implement the Qatar-specific field and attribution contract.
- Qatar needs name, company, phone, email, website, service, budget, goal, contact preference, message, country, landing page, language, referrer, and UTM content alongside existing campaign fields. Implement frontend and backend together with bounded validation and storage mapping.
- LeadQualifier currently opens WhatsApp; this must not be counted as a saved CRM enquiry or confirmed booking.
- Current WhatsApp destination derives from the official Pakistan business contact. The portfolio's personal phone/email are not approved business contacts and must not be copied into public Qatar CTAs.
- No live form was submitted; enquiry delivery, email notification, and CRM routing are not verified by this audit.

## 8. Portfolio attribution and readiness

The PDF presents an individual's work, including employment at other studios. It does not establish that Crea8iv contracted any named project.

Usable capability categories, subject to publication rights: tourism filming; event cinematography; luxury product films; commercial photography; editing, color, sound and post-production; AI creative production.

| Portfolio material | Publication treatment |
|---|---|
| Visit Qatar, Da-Bangg, Souq Waqif, Local Bazar, Al Zain | Team-member experience with exact verified role, not Crea8iv client claims |
| Global Champions London/Monaco | Individual editing/color/sound experience; do not describe as Qatar client wins |
| Qatar Equestrian Tour | Role heading and narrative differ in scope; verify filming versus post-production credit |
| Hour & Hour / Pilipino Planning Association | Description repeats Visit Qatar campaign text; correct project identity and credits before use |
| Qatar National Football Team AI project | Described as independently created; do not imply an official national-team commission |
| Monaco Perfume AI campaign | Verify commissioning and rights to campaign media before publication |
| View counts | Omit until source links, dates, and current evidence are supplied |

Recommended section label from the brief: “Selected Experience from Our Qatar Production Team.” Asset approvals should record project, rights holder, approved media, credited role, source URL, and permission date. Do not publish personal contact details from the final PDF page.

## 9. Competitor baseline — observed public positioning

These are observations of public positioning, not verified rankings or delivery results. Sources checked during this audit.

| Agency | Observed emphasis | Implication for Crea8iv |
|---|---|---|
| [Sparkia](https://sparkiamedia.com/service/ai-automation/) | Lead/CRM, marketing, chat and operations workflows; automation audit CTA | Automation by itself is not unique; show concrete workflow scope and measurement |
| [NUUN](https://nuundigital.com/) | Research, growth, SEO/GEO, data and AI/software capabilities | Avoid claiming marketing-plus-technology is an uncontested niche |
| [Fookis Labs](https://www.fookislabs.com/) | Brand, production, creative, marketing, analytics and technology with visible project work | Connect approved production work to commercial intent |
| [Digiturnal](https://www.digiturnal.com/) | Strategy, social, production, engineering; Arabic entry point and free-tools navigation | Tools and bilingual navigation are baseline competitive features |
| [Adcreators MENA](https://adcreatorsmena.com/) | Creative/performance positioning and GEO content in search results | Search-result evidence only; direct page retrieval failed, so depth remains unassessed |
| [Paradigm](https://paradigm.qa/digital.php) | SEO, PPC and broader digital services | Use explicit acquisition-to-follow-up workflows to sharpen positioning |

Recommended differentiation is an inference: demonstrate the complete enquiry-to-revenue process with useful diagnostic outputs, transparent measurement, industry workflows, verified project roles, and bilingual content. Do not simply assert competitors lack these capabilities.

## 10. Technical implementation decisions

1. Keep one brand entity and one domain. Add Qatar service-area facts without inventing a locally registered business.
2. Build a typed Qatar route/content registry with genuinely different service and industry content; avoid mechanically generated city pages.
3. Plan root-layout localization before Arabic pages. A nested RTL div does not satisfy the requested server-rendered `<html lang="ar-QA" dir="rtl">`. A route-group/root-layout solution must preserve existing paths, admin behavior, and static export. See [Next 14 internationalization](https://nextjs.org/docs/14/app/building-your-application/routing/internationalization).
4. Pair only published equivalent EN/AR pages, with self-references and reciprocal alternates. Do not point untranslated English pages at an unrelated Arabic hub. See [Google localized-version guidance](https://developers.google.com/search/docs/specialty/international/localized-versions).
5. Add `/sitemap-qatar.xml` and discovery through a deliberate index/robots strategy, retaining `/sitemap.xml` compatibility. Validate sitemap URLs against actual generated routes.
6. Generate machine-readable business facts from the same company data. Treat `llms.txt` as a supplemental resource, not a ranking mechanism. Google's AI guidance does not require a special AI schema or machine-readable AI file: [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features).
7. Reuse existing tools where functionality matches, with QAR and Qatar examples. Existing tools include AI visibility checker, local SEO audit, SEO audit, website performance checker, marketing ROI, Meta/Google budget, patient retention ROI, website ROI, and schema generator. No lead-response calculator exists in this registry.
8. Keep tools honest: local heuristic scores are not actual live ChatGPT/Gemini recommendations. Store actual visibility observations separately with date/platform/evidence.
9. Make pricing quote-based until approved QAR values exist. The proposed 30% promotion is a suggestion in the brief, not a confirmed commercial commitment.

## 11. QA baseline

| Check | Result |
|---|---|
| TypeScript | `tsc --noEmit --incremental false`: passed |
| ESLint errors | `eslint src --ext .ts,.tsx --quiet`: passed; warnings intentionally not reported by this command |
| Existing release verifier | 209 routes, zero missing files, zero duplicate titles; passed |
| Fresh production build | Not run; audit did not alter application code |
| Static metadata/schema scan | Results above; JSON syntax only |
| Public availability | 219/219 existing destinations ended in 200; two intentional/new paths returned 404 |
| Responsive geometry | Home, contact, services tested at 375/430/768/1024/1440/1920; no document horizontal overflow |
| Manual visual sample | Home at 375 and 1440; contact at 375 reviewed; screenshots captured for all three pages at 375/1440 |
| Automated accessibility sample | At 375px, home has two non-keyboard-focusable scroll regions; no WCAG A/AA violations returned for contact/services in this limited run |
| Landmarks | Shared content wrapper is a div; sampled pages have no native main landmark |
| RTL | Not applicable to current pages; no Arabic implementation exists |
| Performance | No new Lighthouse/CWV measurement. Existing visual weight/animation noted; historical Lighthouse files are not current scores |
| Form/CRM delivery | Not tested against production |
| Search rankings/AI visibility | Not measured; no result claims |

Browser checks used the saved local export with third-party requests blocked except Google Fonts. They do not certify all states, carousels, menu interactions, or production integrations.

## 12. Prioritized implementation milestones

| Milestone | Scope | Acceptance criteria |
|---|---|---|
| 1 — Entity foundation | Company source of truth; sole-proprietor correction; Qatar prelaunch status; public facts/schema/trust-copy cleanup | No obsolete current company claims; no fabricated Qatar facts; existing URLs retained; type/lint/build pass |
| 2 — Qatar acquisition foundation | English hub, navigation, core service pages, AI visibility/automation/software hubs, contact, metadata, sitemap, events | Working internal paths; saved-enquiry attribution tested locally; clear contact destination; truthful schema; responsive QA |
| 3 — Bilingual priority set | Arabic root rendering, priority translated pages, EN/AR switch and reciprocal hreflang | Correct server HTML lang/dir, content/typography review, no missing alternate destinations |
| 4 — Sector and proof depth | Unique industries, substantial Doha page, approved production experience, pricing methodology, about | Accurate roles/rights; no invented offices, results, prices or testimonials |
| 5 — Useful content and tools | Qatar tool localization, lead-response calculator, 20 researched article briefs/articles in batches, answer hub | Useful outputs before lead capture; sources/reviewer/date; no automated filler; formulas and inputs tested |
| 6 — Research and measurement | Unpublished research templates; prompt tracking; actual observations; authority assets | Research remains unpublished until data exists; no fabricated measurement |
| 7 — Release | Full regression, links/schema/canonical/hreflang/sitemap, mobile/RTL/a11y/performance, deployment package | Reviewable local build and known limitations; production publication handled separately |

Outstanding business inputs for later milestones: approved Qatar business contact, exact registered-entity details if status changes, media publication rights and corrected roles, approved QAR pricing/promotion terms, Arabic editorial review, and measured Search Console/analytics baselines. These do not block the truthful prelaunch entity foundation.

Suggested Git checkpoint after reviewing only audit-owned files: `docs: audit Qatar expansion baseline and preserve existing route inventory`.
