# Hostinger Node Migration Notes

Use this folder (`frontend`) as the deploy root for the phase 1 public-site migration.

## Recommended Hostinger Settings

- Framework: Next.js
- Node.js version: 22.x after staging validation
- Install command: `npm ci`
- Build command: `npm run hostinger:build`
- Output directory: `out`
- Start command: `npm start`

The app starts a small Node server from `server.mjs`. It serves the exported
Next.js site from `out` and protects legacy production paths during a same-domain
cutover.

## Why This Target

- The exported sitemap currently matches the live sitemap exactly.
- Static export remains the website payload, while Node handles production path protection.
- `.htaccess` is copied into `out` and contains legacy redirects, cleanup rules, compression, and cache headers.
- `/app/*` is proxied to `https://php-api.crea8ivmedia.com/*`.
- `/clinic/*` temporarily redirects to `https://patientflow.crea8ivmedia.com/*`.
- `/portfolio-optimized/*` can redirect to `ASSET_ORIGIN` so portfolio media
  stays outside the Node deployment archive.
- `/portfolio-assets/*` is no longer part of the required public production
  media path and the Node gateway returns `410 Gone` for it.

## Current Production Blocker

Do not run a domain-level Hostinger Node deploy until optimized public media is protected.

The local `frontend/public` folder is about 1.4GB, mostly legacy portfolio media:

- `frontend/public/portfolio-assets`: about 1.3GB
- `frontend/public/portfolio-optimized`: about 62-80MB depending on build state

`portfolio-assets` is not required for the public Node cutover. The remaining
production media requirement is `portfolio-optimized`, because current visible
portfolio/results pages use those WebP/MP4 preview/play files.

Hostinger Node archive deployment has a much smaller archive limit, so deploying
only the source app can remove or fail to include media that current public pages
reference, especially `/results/` and portfolio-heavy pages.

Safe options before production cutover:

1. Move `portfolio-optimized` to a dedicated static asset subdomain/CDN before
   switching `crea8ivmedia.com` to Node.
2. Keep the public website as the current static export until media is externalized.
3. Use a Hostinger configuration that preserves and serves existing media paths
   outside the Node deployment root, then verify all media URLs before cutover.

The Node gateway in `server.mjs` is ready, but production cutover is blocked until
media preservation is solved.

### 2026-08-19 Verification Checkpoint

Completed locally:

- `npm run export`: passed, 107 static pages generated.
- `npm run preflight:seo`: passed.
- Live sitemap URLs: 88.
- Local exported sitemap URLs: 88.
- Missing locally: 0.
- Extra locally: 0.
- Hostinger Node source archive created: `/tmp/crea8iv-media-node-20260819_010324.zip`.
- Archive size: 29,998,829 bytes, under the 50MB upload limit.
- The archive includes normal public website assets such as favicon/blog images.
- The archive intentionally excludes:
  - `public/portfolio-optimized/*`

Production-like local Node route checks passed:

```text
/ -> 200
/sitemap.xml -> 200
/clinic/login -> 302 https://patientflow.crea8ivmedia.com/login
/app/api/v1/health -> 200 through php-api.crea8ivmedia.com
/services/ -> 301 /our-services/
/casino-test/ -> 410
/portfolio-optimized/... -> 302 https://static.crea8ivmedia.com/portfolio-optimized/...
/portfolio-assets/... -> 410
```

Current blocker:

- `https://static.crea8ivmedia.com/...` is not production-ready yet; HTTPS currently fails during TLS negotiation.
- `http://static.crea8ivmedia.com/...` returns an HTML placeholder-like response, not the real media asset.
- Including `public/portfolio-optimized` inside the Node archive was tested and produced a 94,714,915 byte archive, above the Hostinger 50MB limit.
- `public/portfolio-assets` is not required for the public Node cutover and is
  intentionally not treated as a production dependency.

Conclusion: the main public website Node app is deploy-ready from a code and SEO
parity perspective, but final production switch is blocked until
`static.crea8ivmedia.com` is created with valid HTTPS and
`/portfolio-optimized/` is uploaded at the domain root.

### 2026-08-19 Portfolio Asset Narrowing

Confirmed migration scope after review:

- `/portfolio-assets/` is not required for public production media.
- User-facing links now prefer `playSrc`, `optimizedSrc`, or `posterSrc` instead
  of the original `/portfolio-assets/` source file.
- `/results/editorial/` remains in the sitemap and still returns 200, but it no
  longer renders broken `/portfolio-assets/` media when optimized files are not
  available.
- Exported HTML/text/XML check: `/portfolio-assets/` references = 0 files.
- Exported HTML/text/XML check: `/portfolio-optimized/` references = 17 files.
- Node local route checks:
  - `/portfolio-assets/test.jpg` -> 410.
  - `/portfolio-optimized/...` -> 302 to `ASSET_ORIGIN`.
  - `/results/editorial/` -> 200.
- Latest Hostinger Node source archive:
  `/tmp/crea8iv-media-node-20260819_011208.zip`.
- Latest archive size: 29,999,695 bytes.

Remaining blocker is only `/portfolio-optimized/`, not `/portfolio-assets/`.

### 2026-08-19 Static Asset Upload

Completed:

- Uploaded `frontend/public/portfolio-optimized/` to Hostinger static paths.
- Verified MP4 sample without cache-busting:
  `/portfolio-optimized/Resturants/Reels/CO3%20Mocktail%20reel-play.mp4` -> 200.
- Verified WebP samples with cache-busting:
  `/portfolio-optimized/Brand%20Guidlines/C03%20Brand%20Guildlines-cover.webp?v=20260819` -> 200.
  `/portfolio-optimized/Logo/cre8iv.webp?v=20260819` -> 200.
  `/portfolio-optimized/Health%20Clinics/images/1.webp?v=20260819` -> 200.

Hostinger CDN currently has old cached 404 responses for some bare WebP URLs.
The Node gateway appends `ASSET_VERSION` to static asset redirects to bypass
that stale cache during cutover. Purging Hostinger cache for
`static.crea8ivmedia.com` is still recommended.

### 2026-08-19 Main Domain Cutover Attempt

User approved the production switch with:

```text
approve crea8iv main Node production switch
```

Pre-cutover checks passed immediately before attempting the switch:

- `npm run preflight:seo`: passed.
- Live sitemap URLs: 88.
- Local exported sitemap URLs: 88.
- Missing locally: 0.
- Extra locally: 0.
- Current production homepage: 200.
- Current production `/app/api/v1/health`: 200.
- PatientFlow production `/login`: 200.
- `static.crea8ivmedia.com` WebP and MP4 samples: 200.

Hostinger production cutover was not executed because hPanel blocks creating a
Node/Web App on the apex `crea8ivmedia.com` domain while active subdomains exist.
The exact hPanel blocker shown in the Deploy Web App domain step was:

```text
Your domain can't have active subdomains
```

Checked safe alternatives in hPanel:

- Existing `crea8ivmedia.com` PHP/HTML website card actions only showed
  `Add to favorites`, `Add tag`, `Change domain`, `Website Details`, and
  `Delete`; no safe "convert to Web App" action was available.
- The card Tools menu only showed `File Manager`, `Databases`, and `Analytics`.
- The existing `node-staging.crea8ivmedia.com` Node dashboard exposes deployment
  controls, but its `Manage domain` action opens the parent domain overview and
  did not provide a safe apex-domain swap path.

Conclusion: do not delete or detach active subdomains to force the switch. The
next safe path is to ask Hostinger support whether apex Node apps can coexist
with active subdomains on this plan, or to keep the public apex on PHP/HTML while
serving the already exported static website until Hostinger provides a supported
domain-assignment path.

### 2026-08-19 Hostinger Agent Response

Sent the following support question through Hostinger Agent:

```text
We want to deploy a Node.js Web App on the apex domain crea8ivmedia.com, but hPanel blocks it with: “Your domain can't have active subdomains”.

We must keep existing subdomains active, especially:
patientflow.crea8ivmedia.com
php-api.crea8ivmedia.com
static.crea8ivmedia.com

Please confirm the safe supported way to convert or assign crea8ivmedia.com to a Node.js Web App without deleting/detaching active subdomains or breaking existing services.

If apex Node.js deployment is not supported while active subdomains exist, please suggest the safest alternative architecture for keeping the apex public website on Node.js and preserving all existing subdomains.
```

Hostinger Agent answered that hPanel's blocker is a structural restriction:

- The existing apex website cannot be converted into a Hostinger Node.js Web App
  while active subdomains are attached.
- The documented Hostinger flow is to download backups, remove the existing
  website assignment, and re-add the domain as a Node.js Web App.
- That flow is not compatible with keeping `patientflow.crea8ivmedia.com`,
  `php-api.crea8ivmedia.com`, and `static.crea8ivmedia.com` active without
  detachment.
- Hostinger Agent explicitly advised not to delete or detach those subdomains.
- If the apex must be a Hostinger-managed Node.js Web App, Hostinger says a
  separate domain is needed for that app.

Safe conclusion: do not force a Hostinger apex Node cutover. The practical safe
options are either to keep `crea8ivmedia.com` on the current PHP/HTML hosting, or
host the apex Node frontend on an external Node-capable provider and point only
the apex DNS records there while keeping all subdomain DNS records unchanged.

### 2026-08-19 Force-Apex Path After User Accepted Temporary Downtime

The user later clarified that temporary PatientFlow downtime is acceptable if it
is required to convert `crea8ivmedia.com` to a Hostinger Node app.

Pre-force checks completed:

- `npm run preflight:seo`: passed.
- Live sitemap URLs: 88.
- Local exported sitemap URLs: 88.
- Missing locally: 0.
- Extra locally: 0.
- Forced-apex archive: `/tmp/crea8iv-media-node-forced-apex-20260819.zip`.
- Forced-apex archive size: 30,001,931 bytes.
- `patientflow.crea8ivmedia.com/login`: 200 before any destructive action.
- `php-api.crea8ivmedia.com/api/v1/health`: 200 before any destructive action.

Current hPanel active subdomains before any delete/detach action:

```text
portal.crea8ivmedia.com       /home/u700603111/domains/crea8ivmedia.com/public_html/portal
api.crea8ivmedia.com          /home/u700603111/domains/crea8ivmedia.com/public_html/api
connect.crea8ivmedia.com      /home/u700603111/domains/crea8ivmedia.com/public_html/connect
app.crea8ivmedia.com          /home/u700603111/domains/crea8ivmedia.com/public_html/app
hub.crea8ivmedia.com          /home/u700603111/domains/crea8ivmedia.com/public_html/hub
hubapi.crea8ivmedia.com       /home/u700603111/domains/crea8ivmedia.com/public_html/hubapi
node-staging.crea8ivmedia.com /home/u700603111/domains/crea8ivmedia.com/public_html/node-staging
php-api.crea8ivmedia.com      /home/u700603111/domains/crea8ivmedia.com/public_html/app
patientflow.crea8ivmedia.com  /home/u700603111/domains/crea8ivmedia.com/public_html/patientflow-node
static.crea8ivmedia.com       /home/u700603111/domains/crea8ivmedia.com/public_html/static
```

Destructive deletion/detachment still requires immediate action-time
confirmation because it can break live subdomains and PatientFlow temporarily.

### 2026-08-19 Backup Before Continuing Force Path

User requested:

```text
backup first then continue
```

Completed file backup on Hostinger:

```text
/home/u700603111/backups/crea8ivmedia-public_html-before-node-force-20260819.tar.gz
```

Backup verification:

- Archive size: 1.5G.
- Archive listing verified with `tar -tzf`.
- SHA256:
  `185aa0910dbcf3657f609269401a696d7ac2e151afb15fdfed6a69342a6bbb94`

Database backup status:

- Tried `app/.env` credentials with `mysqldump`: access denied.
- Tried `app/.env.production` credentials with `mysqldump`: access denied.
- Tried sanitized/quote-stripped credentials and `localhost`/`127.0.0.1`:
  access denied.

Current safety decision:

- Do not delete the `patientflow.crea8ivmedia.com` Web App assignment yet.
- hPanel's Web App delete dialog warns that website data, databases, images, and
  custom code may be permanently lost.
- Continue only if a valid database backup is obtained through hPanel/phpMyAdmin
  or the user explicitly accepts continuing without a DB dump.

## Production Environment Variables

Set these in Hostinger for the `crea8ivmedia.com` Node app:

```bash
SITE_URL=https://crea8ivmedia.com
PHP_API_ORIGIN=https://php-api.crea8ivmedia.com
PATIENTFLOW_ORIGIN=https://patientflow.crea8ivmedia.com
ASSET_ORIGIN=https://static.crea8ivmedia.com
ASSET_VERSION=20260819
NO_INDEX=false
```

## Required Preflight

Run:

```bash
npm run export
npm run preflight:seo
```

Production deployment is blocked if the preflight reports any missing or extra sitemap URLs.

After deploying the Node app, verify:

```text
https://crea8ivmedia.com/node-health
https://crea8ivmedia.com/
https://crea8ivmedia.com/sitemap.xml
https://crea8ivmedia.com/robots.txt
https://crea8ivmedia.com/pricing/
https://crea8ivmedia.com/blog/ai-citation-optimization-guide/
https://crea8ivmedia.com/app/api/v1/health
https://crea8ivmedia.com/clinic/login
https://crea8ivmedia.com/portfolio-optimized/
```

## Asset Subdomain Requirement

Before production cutover, create `static.crea8ivmedia.com` or another static
asset host containing this folder at the domain root:

```text
/portfolio-optimized/
```

After that, set `ASSET_ORIGIN=https://static.crea8ivmedia.com` in the Node app.
The public URLs can remain `https://crea8ivmedia.com/portfolio-assets/...`; the
Node server will redirect those requests to the static asset host.

## Cutover Rule

Do not deploy from the repo root. The root `package.json` is not the website app. The website app is this `frontend` directory.
