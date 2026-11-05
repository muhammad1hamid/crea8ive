# Crea8iv Media Omnichannel Week 1 Baseline Audit

Date: 2026-07-03  
Timezone: Asia/Karachi  
Scope: Week 1 baseline for AI answer engines, platform/social search, technical SEO, and local/entity readiness.

## Executive Summary

Crea8iv has a strong technical and entity foundation on the checked live pages. Homepage, blog index, priority service pages, and the two newest articles all return `200`, use one H1, have one canonical URL, avoid `noindex`, and expose valid JSON-LD. The clearest immediate AEO/LLMO freshness issue was `llms.txt`: it was live and crawler-friendly, but still dated `2026-06-21` and missing the two newest commercial articles. That file has now been updated in source to strengthen AI crawler grounding.

## Live Technical Baseline

Checked URLs:

| URL | Status | H1 Count | Canonical | Noindex | JSON-LD |
| --- | --- | ---: | --- | --- | --- |
| `https://crea8ivmedia.com/` | `200` | `1` | `1` | `false` | valid |
| `https://crea8ivmedia.com/blog/` | `200` | `1` | `1` | `false` | valid |
| `https://crea8ivmedia.com/google-business-profile-for-restaurants-in-islamabad-full-setup-guide/` | `200` | `1` | `1` | `false` | valid |
| `https://crea8ivmedia.com/seo-cost-in-pakistan-what-businesses-should-actually-expect-to-pay/` | `200` | `1` | `1` | `false` | valid |
| `https://crea8ivmedia.com/google-ads/` | `200` | `1` | `1` | `false` | valid |
| `https://crea8ivmedia.com/meta-ads/` | `200` | `1` | `1` | `false` | valid |
| `https://crea8ivmedia.com/google-business-profile-growth/` | `200` | `1` | `1` | `false` | valid |
| `https://crea8ivmedia.com/website-development/` | `200` | `1` | `1` | `false` | valid |

## Schema Baseline

Detected schema types across checked pages:

- `Organization`
- `LocalBusiness`
- `ProfessionalService`
- `WebSite`
- `WebPage`
- `CollectionPage`
- `BreadcrumbList`
- `ItemList`
- `Service`
- `Offer`
- `OfferCatalog`
- `Person`
- `ImageObject`
- `PostalAddress`
- `GeoCoordinates`
- `ContactPoint`
- `BlogPosting`
- `FAQPage`
- `Question`
- `Answer`

Initial assessment:

- `Organization`, `LocalBusiness`, and `ProfessionalService` are present on core pages.
- `BlogPosting` is present on checked article pages.
- `FAQPage` is present on checked articles and commercial service pages that expose FAQ-style content.
- No invalid JSON-LD blocks were detected in the checked sample.

## Robots And AI Crawler Access

`https://crea8ivmedia.com/robots.txt` returns `200`.

Important AI/search crawlers are explicitly allowed:

- `OAI-SearchBot`
- `ChatGPT-User`
- `GPTBot`
- `ClaudeBot`
- `Claude-SearchBot`
- `PerplexityBot`
- `Google-Extended`
- `Bingbot`

Initial assessment:

- This is a positive GEO/LLMO/AEO signal because major AI/search crawlers are not blocked.
- Keep this policy under review if the brand later wants different training/crawling rules.

## Sitemap Baseline

`https://crea8ivmedia.com/sitemap.xml` returns `200`.

Confirmed included URLs:

- `https://crea8ivmedia.com/blog/`
- `https://crea8ivmedia.com/google-business-profile-for-restaurants-in-islamabad-full-setup-guide/`
- `https://crea8ivmedia.com/seo-cost-in-pakistan-what-businesses-should-actually-expect-to-pay/`

Initial assessment:

- The newest July article is included, so discovery coverage is present.
- Future improvement: ensure `lastmod` values update accurately when static exports refresh important pages.

## LLM Grounding File

`https://crea8ivmedia.com/llms.txt` returns `200`.

Before fix:

- `Last updated: 2026-06-21`
- Missing the latest `SEO Cost in Pakistan` and `Google Business Profile for Restaurants in Islamabad` guides.

Fix applied in source:

- Updated `Last updated` to `2026-07-03`.
- Added `Google Business Profile for restaurants in Islamabad`.
- Added `SEO cost in Pakistan`.

Source file:

`/Users/mac/Crea8iv Media Website/frontend/public/llms.txt`

Production verification:

- `https://crea8ivmedia.com/llms.txt` returns `200`.
- Live header `last-modified`: `Fri, 03 Jul 2026 11:01:32 GMT`.
- Live file includes `Last updated: 2026-07-03`.
- Live file includes `Google Business Profile for restaurants in Islamabad`.
- Live file includes `SEO cost in Pakistan`.

## AI And Answer Engine Prompt Tracker

These prompts should be tested manually or with connected browser/API tooling in ChatGPT, Perplexity, Claude, Google AI Overviews, and Bing/Copilot:

| Prompt | Target Result | Status |
| --- | --- | --- |
| `Who is Crea8iv Media?` | Brand identified correctly with Rawalpindi/Pakistan context | Pending |
| `What services does Crea8iv Media provide?` | SEO, Google Ads, Meta Ads, GBP, websites, automation, software | Pending |
| `Is Crea8iv Media a good digital marketing agency in Rawalpindi?` | Mentions brand with evidence/citation, avoids unsupported claims | Pending |
| `Best digital marketing agencies in Rawalpindi for Google Ads and SEO` | Crea8iv appears or gap is recorded | Pending |
| `Best Google Business Profile optimization company in Islamabad` | Crea8iv appears or competitor citation gap is recorded | Pending |
| `Which agency in Pakistan helps clinics and restaurants get leads from Google and Meta Ads?` | Crea8iv appears for vertical/service context | Pending |
| `Compare Crea8iv Media with other digital marketing agencies in Rawalpindi` | Accurate comparison with own-site citation | Pending |

Fields to record for every engine:

- Engine
- Prompt
- Brand mention status
- Sentiment
- Claimed services
- Location understanding
- Citations shown
- Missing proof
- Competitors cited
- Required Crea8iv asset or fix

## Competitor Gap Tracker

Competitor discovery prompts:

| Query | Competitors To Capture | Status |
| --- | --- | --- |
| `Best digital marketing agency in Rawalpindi` | Agency names, ranking/citation URLs, proof assets | Pending |
| `Best SEO agency in Islamabad for local businesses` | Agency names, ranking/citation URLs, proof assets | Pending |
| `Best Google Ads agency in Pakistan for clinics` | Agency names, ranking/citation URLs, proof assets | Pending |
| `Best social media marketing agency in Rawalpindi` | Agency names, ranking/citation URLs, proof assets | Pending |
| `Best agency for Google Maps ranking in Islamabad` | Agency names, ranking/citation URLs, proof assets | Pending |

## Platform Search Tracker

| Platform | Query/Check | Desired Signal | Status |
| --- | --- | --- | --- |
| YouTube | `Crea8iv Media` | Official channel, branded videos, service descriptions | Pending |
| YouTube | `Google Ads Pakistan agency` | Search-optimized video titles/descriptions | Pending |
| TikTok | `Crea8iv Media` | Official profile, pinned service content | Pending |
| TikTok | `SEO Rawalpindi` | Spoken keyword + caption + local hashtag coverage | Pending |
| LinkedIn | Crea8iv company page | Complete tagline, About, specialties, website URL, location | Pending |
| Amazon/marketplaces | Ecommerce client pattern | Product title/bullets/image checklist for future client SEO | Pending |

## Priority Fixes Found Today

| Priority | Issue | Impact | Action |
| --- | --- | --- | --- |
| High | `llms.txt` was stale and missing latest commercial guides | AI crawlers may miss the newest evidence assets | Updated source file and deployed to production |
| Medium | Sitemap includes new article but should be monitored for fresh `lastmod` accuracy | Search engines may not receive the strongest freshness signal | Add to future technical sprint |
| Medium | AI prompt results still need manual/API capture | Cannot measure AI citation share yet | Run prompt tracker in Week 1 |

## Next Execution Step

Deploy the updated `llms.txt`, then verify live output includes:

- `Last updated: 2026-07-03`
- `Google Business Profile for restaurants in Islamabad`
- `SEO cost in Pakistan`

Status: complete on production as of `2026-07-03T11:02:29Z`.
