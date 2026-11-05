# Security Notes

- PHP sessions use `HttpOnly`, `SameSite=Lax`, and configurable `Secure` cookies.
- Forms require CSRF tokens.
- SQL queries use PDO prepared statements.
- Authentication uses `password_verify`; seed passwords must be generated with `password_hash`.
- Login and registration actions are throttled per IP.
- Output is HTML escaped before rendering.
- Portal APIs enforce authenticated roles.
- Upload support is intentionally not exposed until the original protected portal behavior is available to audit.
