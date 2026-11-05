# Scaling Guide

1. Move the portal database from SQLite to MySQL by switching DSN values and running the MySQL migration.
2. Add a cache adapter for shared rate limits when the portal runs on multiple PHP instances.
3. Store uploads outside the web root and move them to object storage if volume grows.
4. Put the static Astro output behind a CDN.
5. Add queue workers only when authenticated workflows require background jobs.
