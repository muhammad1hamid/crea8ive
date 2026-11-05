export const SOCIAL_LINKS = {
  website: "https://crea8ivmedia.com/",
  googleReview: "https://g.page/r/CTwW1Iro0tIuEAE/review",
  tiktok: "https://www.tiktok.com/@crea8ivmedia?_r=1&_t=ZS-98QrNaUM6w0",
  instagram: "https://www.instagram.com/crea8ivmedia?igsh=MXR4cXcwNzJyOGdiOQ==",
  pinterest: "https://www.pinterest.com/crea8ivmedia/",
  x: "https://x.com/Crea8ivMedia",
  linkedin: "https://www.linkedin.com/company/crea8iv-media/",
  medium: "https://medium.com/@crea8ivmedia",
  snapchat: "https://www.snapchat.com/place/crea8iv-media-digital-marketing-agency/0ebbbaa7-ae51-4044-bb6e-1fefa897a17f?share_id=_51fBB7jbbw&locale=en-US",
  threads: "https://www.threads.com/@crea8ivmedia",
} as const;

export const PLATFORM_LINKS = [
  {
    label: "Website",
    href: SOCIAL_LINKS.website,
    purpose: "Official site",
  },
  {
    label: "Instagram",
    href: SOCIAL_LINKS.instagram,
    purpose: "Social proof",
  },
  {
    label: "TikTok",
    href: SOCIAL_LINKS.tiktok,
    purpose: "Short-form video",
  },
  {
    label: "LinkedIn",
    href: SOCIAL_LINKS.linkedin,
    purpose: "Company profile",
  },
  {
    label: "X / Twitter",
    href: SOCIAL_LINKS.x,
    purpose: "Updates",
  },
  {
    label: "Pinterest",
    href: SOCIAL_LINKS.pinterest,
    purpose: "Creative boards",
  },
  {
    label: "Clutch",
    href: "https://clutch.co/profile/crea8iv-media-marketing-agency-private",
    purpose: "Reviews",
  },
  {
    label: "Reddit",
    href: "https://www.reddit.com/user/Crea8ivmedia/",
    purpose: "Community",
  },
  {
    label: "GoodFirms",
    href: "https://www.goodfirms.co/company/crea8iv-media-marketing-agency-private-limited",
    purpose: "Reviews",
  },
  {
    label: "Linktree",
    href: "https://linktr.ee/crea8ivmedia",
    purpose: "All links",
  },
  {
    label: "Threads",
    href: SOCIAL_LINKS.threads,
    purpose: "Social updates",
  },
  {
    label: "Medium",
    href: SOCIAL_LINKS.medium,
    purpose: "Articles",
  },
  {
    label: "Behance",
    href: "https://www.behance.net/crea8ivmediapk",
    purpose: "Portfolio",
  },
  {
    label: "Snapchat",
    href: SOCIAL_LINKS.snapchat,
    purpose: "Local profile",
  },
] as const;

export const ORGANIZATION_SAME_AS = Array.from(new Set([
  ...PLATFORM_LINKS.map((platform) => platform.href),
  "https://github.com/Crea8ivMedia",
])) as string[];

export const HEADER_SOCIAL_LINKS = [
  { label: "Instagram", href: SOCIAL_LINKS.instagram, icon: "fab fa-instagram" },
  { label: "LinkedIn", href: SOCIAL_LINKS.linkedin, icon: "fab fa-linkedin-in" },
  { label: "TikTok", href: SOCIAL_LINKS.tiktok, icon: "fab fa-tiktok" },
  { label: "X", href: SOCIAL_LINKS.x, icon: "fab fa-x-twitter" },
] as const;
