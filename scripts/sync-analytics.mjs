#!/usr/bin/env node

const siteUrl = (process.env.SITE_URL || process.env.CREA8IV_SITE_URL || "https://crea8ivmedia.com").replace(/\/$/, "");
const token = process.env.CREA8IV_AUTOMATION_TOKEN || "";
const rangeDays = Number(process.env.ANALYTICS_SYNC_DAYS || 28);

if (token.length < 32) {
  console.error("CREA8IV_AUTOMATION_TOKEN is missing or too short.");
  process.exit(1);
}

const response = await fetch(`${siteUrl}/api/admin/automation/`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ action: "sync-analytics", rangeDays }),
});
const body = await response.json().catch(() => ({}));

if (!response.ok) {
  console.error(body.message || `Analytics sync failed with HTTP ${response.status}.`);
  process.exit(1);
}

console.log(JSON.stringify({ ok: body.ok, rangeDays: body.rangeDays, results: body.results }, null, 2));
