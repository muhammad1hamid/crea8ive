# Maintenance Guide

- Refresh the marketing snapshot intentionally with `scripts/snapshot_public_site.py --fetch-pages`.
- Review `documentation/ASSET_MIRROR_REPORT.md` after each refresh.
- Apply PHP and Node security updates monthly.
- Back up the SQLite file before migrations, or use managed MySQL backups after scaling.
- Rotate `APP_KEY` and session cookies after any suspected credential exposure.
- For daily SEO publishing from the project root, run `npm run seo:publish -- --slug <post-slug>` after the draft and WebP cover are ready.
- For a faster dry run without touching production, use `npm run seo:publish -- --slug <post-slug> --skip-deploy`.
- To fail fast before a long export when Hostinger or SSH is unavailable, use `npm run seo:deploy:check`.
- The SEO publish pipeline now deploys only the changed blog route, blog archive files, sitemap/feed files, and the custom thumbnail instead of syncing the whole static export every time.
