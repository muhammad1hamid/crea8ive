import "server-only";

import { createSign } from "node:crypto";
import {
  addActivity,
  getAdminStore,
  replaceAnalyticsSnapshots,
  updateSettings,
} from "@/lib/admin/store";
import type { AdminSettings, AnalyticsSnapshot, AnalyticsSyncSourceState } from "@/lib/admin/types";

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const GSC_SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";
const GA4_SCOPE = "https://www.googleapis.com/auth/analytics.readonly";

type GoogleServiceAccount = {
  client_email: string;
  private_key: string;
};

type SyncSource = "gsc" | "ga4";

type SyncResult = {
  source: SyncSource;
  status: AnalyticsSyncSourceState["status"];
  rows: number;
  message: string;
  lastSyncedAt: string | null;
};

function base64Url(value: string | Buffer) {
  return Buffer.from(value).toString("base64url");
}

function readServiceAccount(): GoogleServiceAccount | null {
  const encoded = process.env.GOOGLE_SERVICE_ACCOUNT_JSON_BASE64 || "";
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON || (encoded ? Buffer.from(encoded, "base64").toString("utf8") : "");
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as Partial<GoogleServiceAccount>;
    if (!parsed.client_email || !parsed.private_key) return null;
    return { client_email: parsed.client_email, private_key: parsed.private_key.replace(/\\n/g, "\n") };
  } catch {
    return null;
  }
}

async function getAccessToken(scopes: string[]) {
  const account = readServiceAccount();
  if (!account) throw new Error("Google service-account credentials are not configured.");

  const issuedAt = Math.floor(Date.now() / 1000);
  const header = base64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = base64Url(JSON.stringify({
    iss: account.client_email,
    scope: scopes.join(" "),
    aud: TOKEN_URL,
    iat: issuedAt,
    exp: issuedAt + 3600,
  }));
  const unsigned = `${header}.${claim}`;
  const signer = createSign("RSA-SHA256");
  signer.update(unsigned);
  signer.end();
  const assertion = `${unsigned}.${base64Url(signer.sign(account.private_key))}`;
  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion }),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Google token request failed with HTTP ${response.status}.`);
  const body = await response.json() as { access_token?: string };
  if (!body.access_token) throw new Error("Google token response did not include an access token.");
  return body.access_token;
}

async function googleJson<T>(url: string, token: string, body: unknown): Promise<T> {
  const response = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Google API request failed with HTTP ${response.status}.`);
  return response.json() as Promise<T>;
}

function dateRange(rangeDays: number) {
  const end = new Date();
  const start = new Date(end.getTime() - rangeDays * 24 * 60 * 60 * 1000);
  return { startDate: start.toISOString().slice(0, 10), endDate: end.toISOString().slice(0, 10) };
}

function numberValue(value: unknown) {
  const number = Number(value || 0);
  return Number.isFinite(number) ? number : 0;
}

function pathValue(value: string) {
  if (!value) return "/";
  try {
    return value.startsWith("http") ? new URL(value).pathname || "/" : value.startsWith("/") ? value : `/${value}`;
  } catch {
    return "/";
  }
}

async function fetchSearchConsole(settings: AdminSettings, rangeDays: number) {
  const token = await getAccessToken([GSC_SCOPE]);
  const range = dateRange(Math.min(90, Math.max(1, rangeDays)));
  const endpoint = `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(settings.searchConsoleProperty)}/searchAnalytics/query`;
  const body = await googleJson<{ rows?: Array<{ keys?: string[]; clicks?: number; impressions?: number; ctr?: number; position?: number }> }>(endpoint, token, {
    ...range,
    dimensions: ["page", "query", "device", "country"],
    rowLimit: 250,
    type: "web",
  });
  return (body.rows || []).map((row) => ({
    source: "search_console" as const,
    pagePath: pathValue(row.keys?.[0] || "/"),
    query: row.keys?.[1] || "",
    device: row.keys?.[2] || "",
    country: row.keys?.[3] || "",
    impressions: numberValue(row.impressions),
    clicks: numberValue(row.clicks),
    ctr: numberValue(row.ctr) * 100,
    averagePosition: numberValue(row.position),
    sessions: 0,
    users: 0,
    engagementRate: 0,
    scrollDepth: 0,
    ctaClicks: 0,
    contactClicks: 0,
    conversions: 0,
  } satisfies Omit<AnalyticsSnapshot, "id" | "capturedAt">));
}

async function fetchGa4(settings: AdminSettings, rangeDays: number) {
  const token = await getAccessToken([GA4_SCOPE]);
  const range = dateRange(Math.min(90, Math.max(1, rangeDays)));
  const endpoint = `https://analyticsdata.googleapis.com/v1beta/properties/${encodeURIComponent(settings.ga4PropertyId)}:runReport`;
  const body = await googleJson<{
    metricHeaders?: Array<{ name?: string }>;
    rows?: Array<{ dimensionValues?: Array<{ value?: string }>; metricValues?: Array<{ value?: string }> }>;
  }>(endpoint, token, {
    dateRanges: [{ startDate: range.startDate, endDate: range.endDate }],
    dimensions: [{ name: "pagePath" }],
    metrics: [
      { name: "screenPageViews" },
      { name: "sessions" },
      { name: "activeUsers" },
      { name: "engagementRate" },
      { name: "conversions" },
    ],
    limit: 250,
  });
  const headers = (body.metricHeaders || []).map((item) => item.name || "");
  return (body.rows || []).map((row) => {
    const metrics = Object.fromEntries(headers.map((header, index) => [header, numberValue(row.metricValues?.[index]?.value)]));
    return {
      source: "ga4" as const,
      pagePath: pathValue(row.dimensionValues?.[0]?.value || "/"),
      query: "",
      device: "",
      country: "",
      impressions: metrics.screenPageViews || 0,
      clicks: 0,
      ctr: 0,
      averagePosition: 0,
      sessions: metrics.sessions || 0,
      users: metrics.activeUsers || 0,
      engagementRate: (metrics.engagementRate || 0) * 100,
      scrollDepth: 0,
      ctaClicks: 0,
      contactClicks: 0,
      conversions: metrics.conversions || 0,
    } satisfies Omit<AnalyticsSnapshot, "id" | "capturedAt">;
  });
}

function readyState(message: string): AnalyticsSyncSourceState {
  return { status: "ready", lastSyncedAt: null, rows: 0, message };
}

export function getAnalyticsSyncReadiness(settings: AdminSettings) {
  const credentialsReady = Boolean(readServiceAccount());
  return {
    credentialsReady,
    gsc: Boolean(settings.searchConsoleProperty) && credentialsReady ? readyState("Ready for Search Console sync.") : { ...defaultSourceState(settings.searchConsoleProperty, credentialsReady), status: "not_configured" as const },
    ga4: Boolean(settings.ga4PropertyId) && credentialsReady ? readyState("Ready for GA4 sync.") : { ...defaultSourceState(settings.ga4PropertyId, credentialsReady), status: "not_configured" as const },
  };
}

function defaultSourceState(property: string, credentialsReady: boolean): AnalyticsSyncSourceState {
  return {
    status: "not_configured",
    lastSyncedAt: null,
    rows: 0,
    message: property ? (credentialsReady ? "Ready to sync." : "Add GOOGLE_SERVICE_ACCOUNT_JSON on the server.") : "Add the property ID first.",
  };
}

export async function syncAnalytics({ rangeDays = 28, actor = "automation" }: { rangeDays?: number; actor?: string } = {}) {
  const store = await getAdminStore();
  const safeRange = Math.min(90, Math.max(1, Number(rangeDays) || 28));
  const results: SyncResult[] = [];
  let syncState = store.settings.analyticsSync;
  const sources: SyncSource[] = ["gsc", "ga4"];

  for (const source of sources) {
    const configured = source === "gsc" ? store.settings.searchConsoleProperty : store.settings.ga4PropertyId;
    const stateKey = source === "gsc" ? "gsc" : "ga4";
    if (!configured) {
      results.push({ source, status: "not_configured", rows: 0, message: "Property is not configured.", lastSyncedAt: null });
      continue;
    }

    try {
      const snapshots = source === "gsc"
        ? await fetchSearchConsole(store.settings, safeRange)
        : await fetchGa4(store.settings, safeRange);
      const rows = await replaceAnalyticsSnapshots(snapshots[0]?.source || (source === "gsc" ? "search_console" : "ga4"), snapshots, actor);
      const lastSyncedAt = new Date().toISOString();
      const current = syncState?.[stateKey] || defaultSourceState(configured, true);
      syncState = { ...syncState, [stateKey]: { ...current, status: "success", lastSyncedAt, rows, message: `Synced ${rows} row(s) for the last ${safeRange} days.` } };
      await updateSettings({ analyticsSync: syncState }, actor);
      results.push({ source, status: "success", rows, message: `Synced ${rows} row(s).`, lastSyncedAt });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Sync failed.";
      const current = syncState?.[stateKey] || defaultSourceState(configured, true);
      syncState = { ...syncState, [stateKey]: { ...current, status: "error", message } };
      await updateSettings({ analyticsSync: syncState }, actor);
      results.push({ source, status: "error", rows: 0, message, lastSyncedAt: current.lastSyncedAt || null });
    }
  }

  await addActivity({
    actor,
    action: "sync",
    entityType: "analytics",
    message: `Analytics sync completed for the last ${safeRange} days: ${results.map((item) => `${item.source} ${item.status}`).join(", ")}.`,
  });
  return { ok: results.some((item) => item.status === "success"), rangeDays: safeRange, results };
}
