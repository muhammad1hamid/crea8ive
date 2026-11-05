type EventProperties = Record<string, string | number | boolean | undefined>;

export type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  clarity?: ((...args: unknown[]) => void) & { q?: unknown[][] };
};

export function analyticsQueue() {
  const target = window as AnalyticsWindow;
  target.dataLayer ||= [];
  target.gtag ||= (...args: unknown[]) => { target.dataLayer!.push(args); };
  target.clarity ||= Object.assign((...args: unknown[]) => {
    target.clarity!.q!.push(args);
  }, { q: [] as unknown[][] });
  return target;
}

export function trackEvent(event: string, properties: EventProperties = {}) {
  if (typeof window === "undefined") return;
  const safeProperties = Object.fromEntries(
    Object.entries(properties).filter(([, value]) => value !== undefined && value !== "")
  );
  const target = analyticsQueue();
  // Use one GA4 command per action; queued commands survive script loading.
  target.gtag!("event", event, safeProperties);
  target.clarity!("event", event);
}
