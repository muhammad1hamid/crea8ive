# Installation Guide

## Requirements

- Node.js 20+
- PHP 8.2+ with PDO SQLite, or PDO MySQL for MySQL deployments

## Public Website

```bash
cd public-website/astro
npm install
npm run build
```

Deploy `public-website/astro/dist` as the public marketing site.

## Client Portal

```bash
cp config/.env.example config/.env
php client-portal/php/install.php
cd client-portal/vue
npm install
npm run build
php -S 127.0.0.1:8080 -t ../php/public
```

For production, point the portal web root to `client-portal/php/public` and block direct web access to `config`, `database`, `storage`, and `uploads`.

## Refresh Public Content

The checked-in snapshot is sufficient for deployment. To intentionally refresh from WordPress:

```bash
python3 scripts/snapshot_public_site.py --fetch-pages
```

This is an explicit migration-time command, not a runtime dependency.
