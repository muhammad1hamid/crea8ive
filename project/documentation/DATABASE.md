# Database Guide

The portal uses PDO and prepared statements. SQLite and MySQL schemas share the same logical entities:

- `users`: authentication, activation state, and `admin`, `staff`, or `client` role.
- `leads`: observable public registration and audit-request workflow.
- `rate_limits`: per-IP login and registration throttling.
- `audit_logs`: extension point for protected-area activity history.

Use `database/migrations/001_sqlite_schema.sql` by default. For MySQL, change environment values and use `001_mysql_schema.sql`.
