# CREA8IV MEDIA Admin Automation Setup

This setup lets scheduled jobs update the private admin/CMS without browser login.

## Required Hostinger Environment Variables

Set these in the Node app environment variables:

- `ADMIN_EMAIL`: owner email for manual admin login.
- `ADMIN_PASSWORD_HASH`: generated scrypt hash, not the plain password.
- `ADMIN_SESSION_SECRET`: long random session signing secret.
- `CREA8IV_AUTOMATION_TOKEN`: long random token used by cron/API automation.
- `SITE_URL`: `https://crea8ivmedia.com`.
- `NO_INDEX`: `false`.
- `GOOGLE_SERVICE_ACCOUNT_JSON`: the service-account JSON, kept server-side only. Do not add this to `NEXT_PUBLIC_*` variables or commit it.
- `GA4_PROPERTY_ID`: numeric GA4 property ID, for example `123456789`.
- `GSC_SITE_URL`: Search Console property, for example `https://crea8ivmedia.com/` or `sc-domain:crea8ivmedia.com`.

Generate the secure values locally:

```bash
npm run admin:secrets -- "your-strong-admin-password"
```

## Automation API

Use this endpoint for scheduled work:

```text
https://crea8ivmedia.com/api/admin/automation/
```

Send the token as a bearer token:

```text
Authorization: Bearer YOUR_CREA8IV_AUTOMATION_TOKEN
```

Supported actions:

- `GET /api/admin/automation/`: status check.
- `POST /api/admin/automation/` with `{ "action": "create-blog", "blog": { ... } }`: create a draft or scheduled blog.
- `POST /api/admin/automation/` with `{ "action": "schedule-blog", "scheduledAt": "2026-08-22T12:00:00+05:00", "blog": { ... } }`: create a scheduled blog.
- `POST /api/admin/automation/` with `{ "action": "run-due" }`: publish due scheduled posts that pass required checks.
- `POST /api/admin/automation/` with `{ "action": "verify", "slugs": ["example-post"] }`: verify live URL, blog index, sitemap, RSS, and thumbnail.
- `POST /api/admin/automation/` with `{ "action": "sync-analytics", "rangeDays": 28 }`: fetch Search Console and GA4 read-only snapshots and replace the previous source snapshots without duplicating totals.

## Daily Analytics Sync

The repository includes `scripts/sync-analytics.mjs` for a Hostinger cron job or another free scheduler. Run it with the server URL and automation token available in the cron environment:

```bash
SITE_URL=https://crea8ivmedia.com ANALYTICS_SYNC_DAYS=28 CREA8IV_AUTOMATION_TOKEN='YOUR_TOKEN' node scripts/sync-analytics.mjs
```

Recommended schedule: once daily after midnight Asia/Karachi. Google reporting data can arrive with a delay, so the dashboard labels the last successful snapshot and never presents missing data as live data.

## First-Party Lead Tracking

The site now stores first-party lead events from important CTAs:

- WhatsApp clicks
- CTA clicks
- Contact/proposal clicks
- Lead qualifier opens/submits
- Tool report requests

These appear under `/admin/analytics`.

## Free Analytics Connections To Add Later

- Google Search Console property access for `https://crea8ivmedia.com/` granted to the service-account email.
- GA4 property ID and read-only service account JSON for reporting; add the service account as a Viewer in GA4.
- Google Tag Manager container ID if GTM should replace hard-coded tags.
- Microsoft Clarity project ID.
- Google Business Profile access for local visibility reporting.
- Optional: Bing Webmaster Tools verification and export access.

Do not use paid CMS or paid SEO APIs for this core workflow.
