# Google Drive Portfolio CMS

The portfolio system treats one Google Drive folder as the CMS root.

Required:

```bash
GOOGLE_DRIVE_PORTFOLIO_FOLDER_ID="1KttI3P2RbU03nafvL6xztIiuDKUgF3Uk"
```

Authentication options:

```bash
# Option A: public/shared folder access
GOOGLE_DRIVE_API_KEY="google-api-key"

# Option B: private folder access via service account
GOOGLE_DRIVE_SERVICE_ACCOUNT_EMAIL="portfolio-reader@project.iam.gserviceaccount.com"
GOOGLE_DRIVE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

Optional:

```bash
PORTFOLIO_REVALIDATE_SECONDS="900"
GOOGLE_DRIVE_PORTFOLIO_MAX_DEPTH="3"
```

Optional AI enrichment:

```bash
PORTFOLIO_AI_ENABLED="true"

# Use a private enrichment webhook, or use OpenAI directly.
PORTFOLIO_AI_ENDPOINT="https://your-worker.example.com/portfolio-enrich"
PORTFOLIO_AI_ENDPOINT_TOKEN="secret"

OPENAI_API_KEY="sk-..."
PORTFOLIO_AI_MODEL="gpt-4.1-mini"
```

Drive structure:

```text
Portfolio/
  Client A/
    Logos/
    SEO Reports/
    Meta Ads/
    Instagram Posts/
  Client B/
```

Every direct child folder becomes a project. Files inside nested folders are classified by MIME type, folder path, and filename signals. The app then generates:

- `/portfolio`
- `/portfolio/[client-slug]`
- search/filter data
- galleries and downloads
- dynamic stats
- sitemap entries
- JSON-LD metadata

No project route or card needs to be hand-coded when a new client folder is added.

The repository also includes an exact extracted snapshot of the shared folder tree in `drive-snapshot.ts`. It is used as a local fallback when Google API credentials are unavailable, so `/portfolio` can still render the real client folders that were extracted on June 29, 2026.
