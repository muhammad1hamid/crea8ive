# Crea8iv Media Website

The active website is the Next.js, React and TypeScript application in `frontend/`.
The latest source is connected to [muhammad1hamid/crea8ive](https://github.com/muhammad1hamid/crea8ive) on the `main` branch.

## Run locally

Use Node.js 20.9 or newer, then run:

```bash
cd frontend
npm ci
npm run dev -- --hostname 127.0.0.1 --port 4321
```

Open [the local website](http://127.0.0.1:4321/). See `frontend/README.md` for environment configuration, hosting and release checks.

```bash
npm run typecheck
npm run lint
npm run verify:site-data
npm run build -- --webpack
```

The repository includes the application source, public assets, server-side code, project documentation and supplementary legacy tools. Installed dependencies, generated builds, local environment settings and enquiry records are kept outside Git.

## Legacy WordPress SEO workflow

This workspace is connected to the live `crea8ivmedia.com` WordPress site through the REST API.

## Files

- `.env.local`: local-only WordPress credentials
- `scripts/wp_api.py`: shared WordPress API client
- `scripts/wp_seo_audit.py`: audits live pages/posts using Yoast output
- `scripts/wp_update_content.py`: updates page/post title, excerpt, content, and status

## Run the SEO audit

```bash
python3 scripts/wp_seo_audit.py --type both
```

This writes CSV reports to `reports/pages_seo_audit.csv` and `reports/posts_seo_audit.csv`.

## Update live content

```bash
python3 scripts/wp_update_content.py --type pages --id 10608 --title "New Title"
```

### Update excerpt

```bash
python3 scripts/wp_update_content.py --type pages --id 10608 --excerpt "New summary text"
```

### Update content from a file

```bash
python3 scripts/wp_update_content.py --type pages --id 10608 --content-file page-content.html
```

### Preview a change without sending it

```bash
python3 scripts/wp_update_content.py --type pages --id 10608 --title "New Title" --dry-run
```

## Current limitation

The live API currently exposes Yoast output for auditing, but not direct Yoast meta title/meta description write fields. That means this workflow can:

- audit live Yoast titles, descriptions, and canonicals
- update WordPress title, excerpt, and content

If direct Yoast meta updates are needed later, we will need to expose those fields through WordPress or add plugin support for them.

## Safely draft harmful or off-topic posts

Preview the flagged post report:

```bash
python3 scripts/wp_cleanup_flagged_posts.py --limit 100
```

Apply a cleanup batch by moving the selected flagged posts to `draft`:

```bash
python3 scripts/wp_cleanup_flagged_posts.py --offset 0 --limit 100 --apply
```

Safer live batches can be paced and retried:

```bash
python3 scripts/wp_cleanup_flagged_posts.py --offset 0 --limit 250 --retries 4 --pause-seconds 0.2 --apply
```

This writes full reports to `reports/flagged_posts.csv` and `reports/flagged_posts.json`.
