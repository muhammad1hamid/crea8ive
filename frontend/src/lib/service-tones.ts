export type ServiceTone = "web" | "search" | "ads" | "brand" | "social" | "automation" | "local" | "content" | "growth";

const tones: ReadonlyArray<readonly [RegExp, ServiceTone]> = [
  [/branding|brand-identity|creative|^brand$|premium first impression/i, "brand"],
  [/google-ads|^ads$|^roi$|marketing-roi|lead generation|lead-ready/i, "ads"],
  [/meta-ads|facebook|linkedin/i, "web"],
  [/social|instagram|pinterest|tiktok/i, "social"],
  [/local|google-business|maps|trust before|whatsapp|healthcare|clinic/i, "local"],
  [/ai-search-optimization|^seo$/i, "search"],
  [/automation|software|schema|ai-|ai visibility|platform/i, "automation"],
  [/website|web-development|^web$|performance/i, "web"],
  [/seo|search|visibility|scan/i, "search"],
  [/content|reels|video/i, "content"],
];

export function getServiceTone(value: string): ServiceTone {
  return tones.find(([pattern]) => pattern.test(value))?.[1] ?? "growth";
}
