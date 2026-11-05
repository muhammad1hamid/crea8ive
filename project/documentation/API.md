# API Documentation

## `GET /api/session.php`

Returns the authenticated portal user or HTTP `401`.

## `GET /api/leads.php`

Returns the latest 100 audit requests. Requires an authenticated `admin` or `staff` user. Returns HTTP `403` for clients.

## Public Form Posts

`POST /` with `tab=login` authenticates a user. `POST /` with `tab=register` stores an audit request. Both require the rendered CSRF token and are rate limited.
