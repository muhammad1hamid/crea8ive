# Deployment Guide

1. Build the Astro site and Vue portal assets in CI.
2. Upload Astro `dist` to the main-domain document root.
3. Upload the project portal directories to the portal host.
4. Copy `config/.env.example` to `config/.env`, set a random `APP_KEY`, and configure the DSN.
5. Run `php client-portal/php/install.php` once.
6. Configure HTTPS, secure session cookies, HSTS, Brotli/Gzip, and immutable caching for hashed static assets.
7. Keep `config`, `database`, and `storage` outside the public document root.

SQLite is the default. Switch to MySQL by setting `DB_CONNECTION=mysql` and running the MySQL migration against the target database.
