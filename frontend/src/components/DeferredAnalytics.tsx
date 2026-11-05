"use client";

import { useEffect } from "react";
import { analyticsQueue } from "@/lib/analytics-events";

const FALLBACK_GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-54X5M7K3";
const FALLBACK_GA4_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || process.env.GA4_MEASUREMENT_ID || "G-4T16NR75HT";
const FALLBACK_CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || "ynq6hs77ex";
const LEGACY_CLARITY_IDS = new Set(["xnu42t9hxh"]);
const FALLBACK_FB_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "1368855895308448";

export type PublicTrackingConfig = {
  googleTagManagerId?: string;
  ga4MeasurementId?: string;
  microsoftClarityProjectId?: string;
  metaPixelId?: string;
};

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  clarity?: ((...args: unknown[]) => void) & { q?: unknown[] };
  fbq?: (...args: unknown[]) => void;
  _fbq?: unknown;
  crea8ivPixelId?: string;
};

function injectScript(src: string, id: string) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.src = src;
  script.async = true;
  document.head.appendChild(script);
}

function resolveClarityProjectId(id?: string) {
  const projectId = id?.trim();
  if (!projectId || LEGACY_CLARITY_IDS.has(projectId)) return FALLBACK_CLARITY_ID;
  return projectId;
}

export default function DeferredAnalytics({ tracking }: { tracking?: PublicTrackingConfig }) {
  useEffect(() => {
    let loaded = false;
    let ga4Initialized = false;
    let timer = 0;
    let idleTimer = 0;
    let scrollTimer = 0;
    const gtmId = tracking?.googleTagManagerId?.trim() || FALLBACK_GTM_ID;
    const ga4MeasurementId = tracking?.ga4MeasurementId?.trim() || FALLBACK_GA4_MEASUREMENT_ID;
    const clarityId = resolveClarityProjectId(tracking?.microsoftClarityProjectId);
    const fbPixelId = tracking?.metaPixelId?.trim() || FALLBACK_FB_PIXEL_ID;

    const initializeGA4 = () => {
      if (ga4Initialized || !ga4MeasurementId) return;
      ga4Initialized = true;

      const analyticsWindow = analyticsQueue();
      analyticsWindow.gtag!("js", new Date());
      analyticsWindow.gtag!("config", ga4MeasurementId);
      injectScript(
        `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga4MeasurementId)}`,
        "ga4-gtag"
      );
    };

    const load = () => {
      if (loaded) return;
      loaded = true;
      window.clearTimeout(timer);
      window.clearTimeout(scrollTimer);

      const analyticsWindow = analyticsQueue() as AnalyticsWindow;

      initializeGA4();

      if (gtmId) {
        analyticsWindow.dataLayer!.push({ "gtm.start": Date.now(), event: "gtm.js" });
        injectScript(`https://www.googletagmanager.com/gtm.js?id=${gtmId}`, "gtm-deferred");
      }

      if (clarityId) {
        analyticsWindow.clarity = analyticsWindow.clarity || function clarityQueue(...args: unknown[]) {
          analyticsWindow.clarity!.q = analyticsWindow.clarity!.q || [];
          analyticsWindow.clarity!.q.push(args);
        };
        injectScript(`https://www.clarity.ms/tag/${encodeURIComponent(clarityId)}?ref=bwt`, "clarity-deferred");
      }

      if (fbPixelId) {
        type PixelQueue = ((...args: unknown[]) => void) & {
          callMethod?: (...args: unknown[]) => void;
          queue: unknown[][];
          push?: PixelQueue;
          loaded: boolean;
          version: string;
        };
        if (!analyticsWindow.fbq) {
          const pixel = Object.assign((...args: unknown[]) => {
            if (pixel.callMethod) pixel.callMethod(...args);
            else pixel.queue.push(args);
          }, { queue: [] as unknown[][], loaded: true, version: "2.0" }) as PixelQueue;
          pixel.push = pixel;
          analyticsWindow.fbq = pixel;
          analyticsWindow._fbq = pixel;
        }
        if (analyticsWindow.crea8ivPixelId !== fbPixelId) {
          analyticsWindow.fbq!("init", fbPixelId);
          analyticsWindow.fbq!("track", "PageView");
          analyticsWindow.crea8ivPixelId = fbPixelId;
        }
        injectScript("https://connect.facebook.net/en_US/fbevents.js", "fb-pixel-deferred");
      }
    };

    const onFirstIntent = () => load();
    const onScrollIntent = () => {
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(load, 2500);
    };
    const schedule = () => {
      window.clearTimeout(timer);
      const analyticsWindow = window as Window & {
        requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
        cancelIdleCallback?: (handle: number) => void;
      };

      timer = window.setTimeout(() => {
        if (analyticsWindow.requestIdleCallback) {
          idleTimer = analyticsWindow.requestIdleCallback(load, { timeout: 3000 });
          return;
        }

        load();
      }, 1200);
    };

    const cancelScheduledLoad = () => {
      window.clearTimeout(timer);
      window.clearTimeout(scrollTimer);
      const idleWindow = window as Window & {
        cancelIdleCallback?: (handle: number) => void;
      };

      if (idleTimer && idleWindow.cancelIdleCallback) {
        idleWindow.cancelIdleCallback(idleTimer);
      }
    };

    analyticsQueue();
    initializeGA4();
    schedule();
    window.addEventListener("pointerdown", onFirstIntent, { once: true, passive: true });
    window.addEventListener("keydown", onFirstIntent, { once: true });
    window.addEventListener("scroll", onScrollIntent, { once: true, passive: true });

    return () => {
      cancelScheduledLoad();
      window.removeEventListener("pointerdown", onFirstIntent);
      window.removeEventListener("keydown", onFirstIntent);
      window.removeEventListener("scroll", onScrollIntent);
    };
  }, [
    tracking?.googleTagManagerId,
    tracking?.ga4MeasurementId,
    tracking?.microsoftClarityProjectId,
    tracking?.metaPixelId,
  ]);

  return null;
}
