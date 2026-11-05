# Saved enquiry operations

The public form on Company Verification and Contact posts to /enquiries/submit.php. Success is returned only after a SQLite transaction commits. Repeated request IDs return the same reference. Failures retain the form for retry. Email notifications are not enabled; check the saved inbox using the authenticated SSH commands below. No public read endpoint exists.

Host storage: domains/crea8ivmedia.com/.crea8iv-enquiries/enquiries.sqlite (outside public_html). Protect backups as customer data. Do not copy this database into website exports. The endpoint creates storage with restrictive permissions. Runtime needs PHP PDO SQLite and permission to write this private directory.

Run these on Hostinger after SSH login:

```sh
php domains/crea8ivmedia.com/.crea8iv-enquiries/enquiries-admin.php domains/crea8ivmedia.com/.crea8iv-enquiries/enquiries.sqlite summary
php domains/crea8ivmedia.com/.crea8iv-enquiries/enquiries-admin.php domains/crea8ivmedia.com/.crea8iv-enquiries/enquiries.sqlite list
```

The list command returns up to 100 newest enquiries with contact details; use it privately. The summary command returns counts by market, enquiry type and sales status without email or requirements. Mark actual progress with `status REFERENCE qualified`, `call_booked`, `proposal_sent`, `won` or `closed` appended after the database path, instead of `summary`. Default status is `new`. Do not count a form submission as a qualified lead or booked call automatically.

Daily workflow: review new entries, respond through the company mailbox, then update the reference's status. No automatic reply or third-party email transmission is configured. Review retention periodically and handle deletion requests via the published company privacy contact. The query source/medium/campaign and form page are stored with each entry. Analytics receives only saved-event type and market; no enquiry message/email. The new event is `partnership_enquiry_saved`. Page-view-to-save reporting depends on the site's existing analytics configuration; database totals are the source of truth for saved enquiries.

Rate limiting allows eight valid attempts per hourly IP bucket, including retries; expired buckets are removed on new submissions. Origin checks, size limits, field validation, contact agreement and a honeypot run before storage. These are baseline controls; add stronger bot protection if real traffic warrants it.
