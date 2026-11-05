# CREA8IV MEDIA Admin CMS Production Notes

This admin system is a private server-side CMS for the Next.js app. It cannot run as a pure static export because it needs protected API routes, signed sessions, uploads, activity logs, and server-side content storage.

## Hostinger Node Settings

- Build command: `npm run hostinger:build`
- Start command: `npm run start`
- Root directory: `./`
- Node version: `24.x` or any supported Node version matching `>=20 <25`
- Do not set an output directory for this dynamic deployment.

## Required Environment Variables

- `ADMIN_EMAIL`: owner login email
- `ADMIN_PASSWORD_HASH`: hashed owner password
- `ADMIN_SESSION_SECRET`: long random secret for signed sessions
- `PHP_API_ORIGIN`: existing PHP API origin, usually `https://php-api.crea8ivmedia.com`

Optional:

- `CREA8IV_CMS_DATA_DIR`: persistent data directory for CMS JSON storage
- `CREA8IV_DEPLOY_WEBHOOK_URL`: deploy webhook URL
- `CREA8IV_ALLOW_DEPLOY_COMMAND`: set to `true` only if the server should run the configured deploy command
- `CREA8IV_DEPLOY_COMMAND`: backend deploy/build command if command deploy is enabled
- `GSC_SITE_URL`: Google Search Console property URL
- `GA4_PROPERTY_ID`: GA4 property ID

## Creating The Admin Password Hash

Run locally:

```bash
npm run admin:hash -- "your-strong-password"
```

Copy the printed `ADMIN_PASSWORD_HASH=...` value into Hostinger environment variables. Do not commit the password or the hash into source control.

## Live Admin Routes

- `/admin/login`
- `/admin`
- `/admin/blogs`
- `/admin/blogs/new`
- `/admin/calendar`
- `/admin/media`
- `/admin/seo`
- `/admin/analytics`
- `/admin/schema`
- `/admin/deployments`
- `/admin/settings`
- `/admin/activity`

## Safety

Publishing is blocked when required SEO, schema, thumbnail, slug, or internal-link checks fail. Published CMS posts are merged into the existing public blog data pipeline, so `/blog/`, `/sitemap.xml`, and `/rss.xml` continue to use the canonical public routes.
