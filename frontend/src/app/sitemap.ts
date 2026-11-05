import { markets } from "@/data/markets";
import { expansionPaths } from '@/data/market-expansion';
import legacyRedirects from '@/data/legacy-redirects.json';
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";
import { stwMoversStudy } from "@/lib/stw-movers-case-study";
import { aiAnswerBriefs } from "@/lib/ai-answer-briefs";
import { aiVisibilityTargets } from "@/lib/ai-visibility-targets";
import { getBlogPageCount } from "@/lib/blog-pagination";
import { comparisonPages } from "@/lib/comparison-pages";
import { marketingAutomationPage } from "@/lib/growth-pages";
import { authorityGuides } from "@/lib/authority-guides";
import { industryPages } from "@/lib/industry-pages";
import { nativePages } from "@/lib/native-pages";
import { playbookPages } from "@/lib/playbook-pages";
import { premiumCaseStudies } from "@/lib/premium-case-studies";
import { seoLandingPages } from "@/lib/seo-landing-pages";
import { isSpamPath } from "@/lib/seo-cleanup";
import { tools } from "@/lib/tools";
import { getAllPages, getAllPosts } from "@/lib/wordpress";

export const revalidate = 3600;
export const dynamic = "force-static";

function validDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // WP-down resilience: fall back to the static entries below so the build
  // never crashes (the live sitemap keeps its last deployed version).
  const [pages, posts] = await Promise.all([
    getAllPages().catch(() => []),
    getAllPosts().catch(() => []),
  ]);
  const entries = new Map<string, MetadataRoute.Sitemap[number]>();
  entries.set(`${SITE_URL}/company-verification/`, { url: `${SITE_URL}/company-verification/`, lastModified: new Date("2026-09-09"), changeFrequency: "yearly", priority: 0.7 });

  for (const page of pages) {
    if (isSpamPath(page.slug)) continue;

    const url = page.slug === "home" ? `${SITE_URL}/` : `${SITE_URL}/${page.slug}/`;
    const lastModified = validDate(page.modified) ?? undefined;
    entries.set(url, {
      url,
      lastModified,
      changeFrequency: page.slug === "home" || page.slug === "blog" ? "weekly" : "monthly",
      priority: page.slug === "home" ? 1 : page.slug === "blog" ? 0.9 : 0.8,
    });
  }

  for (const post of posts) {
    if (isSpamPath(post.slug)) continue;

    const url = `${SITE_URL}/blog/${post.slug}/`;
    const lastModified = validDate(post.modified) ?? validDate(post.date) ?? undefined;
    entries.set(url, {
      url,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const slug of Object.keys(nativePages)) {
    entries.set(`${SITE_URL}/${slug}/`, {
      url: `${SITE_URL}/${slug}/`,
      lastModified: new Date("2026-08-27"),
      changeFrequency: "monthly",
      priority: slug === "growth-systems" || slug === "our-services" ? 0.9 : 0.82,
    });
  }

  const blogUrl = `${SITE_URL}/blog/`;
  const latestPostDate = posts.reduce<Date | null>((latest, post) => {
    const candidate = validDate(post.modified) ?? validDate(post.date);
    if (!candidate) return latest;
    return !latest || candidate > latest ? candidate : latest;
  }, null);
  const existingBlogEntry = entries.get(blogUrl);
  const existingBlogDate = existingBlogEntry?.lastModified
    ? new Date(existingBlogEntry.lastModified)
    : null;

  if (latestPostDate) {
    entries.set(blogUrl, {
      url: blogUrl,
      lastModified:
        existingBlogDate && existingBlogDate > latestPostDate
          ? existingBlogDate
          : latestPostDate,
      changeFrequency: "weekly",
      priority: 0.9,
    });
  }

  for (let page = 2; page <= getBlogPageCount(posts.length); page += 1) {
    entries.set(`${SITE_URL}/blog/page/${page}/`, {
      url: `${SITE_URL}/blog/page/${page}/`,
      lastModified: latestPostDate ?? undefined,
      changeFrequency: "weekly",
      priority: 0.65,
    });
  }

  for (const thinPath of [
    "portfolio",
    "portfolio/websites",
    "portfolio/graphics",
    "portfolio/reels",
    "portfolio/campaigns",
    "case-studies",
    "case-studies/healthcare",
    "case-studies/restaurants",
    "case-studies/salons",
    "case-studies/real-estate-architecture",
    "case-studies/ecommerce",
  ]) {
    entries.delete(`${SITE_URL}/${thinPath}/`);
  }

  entries.set(`${SITE_URL}/software-development/`, {
    url: `${SITE_URL}/software-development/`,
    lastModified: new Date("2026-06-21"),
    changeFrequency: "monthly",
    priority: 0.8,
  });

  entries.set(`${SITE_URL}/software-products/`, {
    url: `${SITE_URL}/software-products/`,
    lastModified: new Date("2026-06-22"),
    changeFrequency: "weekly",
    priority: 0.9,
  });

  entries.set(`${SITE_URL}/platforms/`, {
    url: `${SITE_URL}/platforms/`,
    lastModified: new Date("2026-07-18"),
    changeFrequency: "weekly",
    priority: 0.95,
  });

  entries.set(`${SITE_URL}/syed-qamar-abbas/`, {
    url: `${SITE_URL}/syed-qamar-abbas/`,
    lastModified: new Date("2026-07-14"),
    changeFrequency: "monthly",
    priority: 0.85,
  });

  entries.set(`${SITE_URL}/howrahshah/`, {
    url: `${SITE_URL}/howrahshah/`,
    lastModified: new Date("2026-07-13"),
    changeFrequency: "monthly",
    priority: 0.85,
  });

  entries.set(`${SITE_URL}/ai-search-optimization/`, {
    url: `${SITE_URL}/ai-search-optimization/`,
    lastModified: new Date("2026-07-07"),
    changeFrequency: "weekly",
    priority: 0.9,
  });

  entries.set(`${SITE_URL}/ai-visibility-targets/`, {
    url: `${SITE_URL}/ai-visibility-targets/`,
    lastModified: new Date("2026-09-01"),
    changeFrequency: "weekly",
    priority: 0.86,
  });

  entries.set(`${SITE_URL}/ai-visibility-growth/`, {
    url: `${SITE_URL}/ai-visibility-growth/`,
    lastModified: new Date("2026-09-13"),
    changeFrequency: "weekly",
    priority: 0.88,
  });

  entries.set(`${SITE_URL}/ai-visibility-content-roadmap/`, {
    url: `${SITE_URL}/ai-visibility-content-roadmap/`,
    lastModified: new Date("2026-09-13"),
    changeFrequency: "weekly",
    priority: 0.86,
  });

  entries.set(`${SITE_URL}/ai-citation-sources/`, {
    url: `${SITE_URL}/ai-citation-sources/`,
    lastModified: new Date("2026-09-13"),
    changeFrequency: "weekly",
    priority: 0.86,
  });

  entries.set(`${SITE_URL}/research/`, {
    url: `${SITE_URL}/research/`,
    lastModified: new Date("2026-10-08"),
    changeFrequency: "monthly",
    priority: 0.86,
  });

  entries.set(`${SITE_URL}/ai-visibility-deployment-checklist/`, {
    url: `${SITE_URL}/ai-visibility-deployment-checklist/`,
    lastModified: new Date("2026-09-01"),
    changeFrequency: "monthly",
    priority: 0.72,
  });

  entries.set(`${SITE_URL}/${marketingAutomationPage.slug}/`, {
    url: `${SITE_URL}/${marketingAutomationPage.slug}/`,
    lastModified: new Date("2026-07-14"),
    changeFrequency: "monthly",
    priority: 0.85,
  });

  entries.set(`${SITE_URL}/results/`, {
    url: `${SITE_URL}/results/`,
    lastModified: new Date("2026-07-14"),
    changeFrequency: "monthly",
    priority: 0.9,
  });

  entries.set(`${SITE_URL}/case-studies/`, {
    url: `${SITE_URL}/case-studies/`,
    lastModified: new Date(stwMoversStudy.modified),
    changeFrequency: "monthly",
    priority: 0.86,
  });

  entries.set(stwMoversStudy.url, {
    url: stwMoversStudy.url,
    lastModified: new Date(stwMoversStudy.modified),
    changeFrequency: "monthly",
    priority: 0.84,
  });

  entries.set(`${SITE_URL}/case-studies/buildscape/`, {
    url: `${SITE_URL}/case-studies/buildscape/`,
    lastModified: new Date("2026-09-27"),
    changeFrequency: "monthly",
    priority: 0.84,
  });

  entries.set(`${SITE_URL}/clients/`, {
    url: `${SITE_URL}/clients/`,
    lastModified: new Date("2026-09-01"),
    changeFrequency: "monthly",
    priority: 0.86,
  });

  entries.set(`${SITE_URL}/website-portfolio/`, {
    url: `${SITE_URL}/website-portfolio/`,
    lastModified: new Date("2026-09-01"),
    changeFrequency: "monthly",
    priority: 0.86,
  });

  for (const study of Object.values(premiumCaseStudies)) {
    entries.set(study.caseStudyUrl, {
      url: study.caseStudyUrl,
      lastModified: new Date("2026-09-14"),
      changeFrequency: "monthly",
      priority: 0.82,
    });
  }

  entries.set(`${SITE_URL}/tools/`, {
    url: `${SITE_URL}/tools/`,
    lastModified: new Date("2026-09-19"),
    changeFrequency: "weekly",
    priority: 0.92,
  });

  entries.set(`${SITE_URL}/guides/`, {
    url: `${SITE_URL}/guides/`,
    lastModified: new Date("2026-09-01"),
    changeFrequency: "monthly",
    priority: 0.84,
  });

  entries.set(`${SITE_URL}/answers/`, {
    url: `${SITE_URL}/answers/`,
    lastModified: new Date("2026-09-01"),
    changeFrequency: "monthly",
    priority: 0.84,
  });

  entries.set(`${SITE_URL}/compare/`, {
    url: `${SITE_URL}/compare/`,
    lastModified: new Date("2026-09-01"),
    changeFrequency: "monthly",
    priority: 0.84,
  });

  entries.set(`${SITE_URL}/playbooks/`, {
    url: `${SITE_URL}/playbooks/`,
    lastModified: new Date("2026-09-01"),
    changeFrequency: "monthly",
    priority: 0.84,
  });

  entries.set(`${SITE_URL}/industries/`, {
    url: `${SITE_URL}/industries/`,
    lastModified: new Date("2026-09-01"),
    changeFrequency: "monthly",
    priority: 0.86,
  });

  // Machine-readable resources remain linked from llms.txt, outside the page sitemap.

  for (const page of seoLandingPages) {
    const url = `${SITE_URL}/${page.family}/${page.slug}/`;
    entries.set(url, {
      url,
      lastModified: new Date("2026-09-01"),
      changeFrequency: "monthly",
      priority: page.slug === "pakistan" ? 0.88 : 0.78,
    });
  }

  for (const page of industryPages) {
    entries.set(`${SITE_URL}/industries/${page.slug}/`, {
      url: `${SITE_URL}/industries/${page.slug}/`,
      lastModified: new Date(page.updated),
      changeFrequency: "monthly",
      priority: 0.82,
    });
  }

  for (const target of aiVisibilityTargets) {
    entries.set(`${SITE_URL}${target.primaryUrl}`, {
      url: `${SITE_URL}${target.primaryUrl}`,
      lastModified: new Date("2026-09-01"),
      changeFrequency: "monthly",
      priority: target.priority === "Critical" ? 0.88 : target.priority === "High" ? 0.84 : 0.8,
    });
  }

  for (const guide of authorityGuides) {
    entries.set(`${SITE_URL}/guides/${guide.slug}/`, {
      url: `${SITE_URL}/guides/${guide.slug}/`,
      lastModified: new Date(guide.updated),
      changeFrequency: "monthly",
      priority: guide.slug.includes("website") ? 0.82 : 0.8,
    });
  }

  for (const brief of aiAnswerBriefs) {
    entries.set(`${SITE_URL}/answers/${brief.slug}/`, {
      url: `${SITE_URL}/answers/${brief.slug}/`,
      lastModified: new Date(brief.updated),
      changeFrequency: "monthly",
      priority: brief.slug.includes("website") ? 0.82 : 0.8,
    });
  }

  for (const page of comparisonPages) {
    entries.set(`${SITE_URL}/compare/${page.slug}/`, {
      url: `${SITE_URL}/compare/${page.slug}/`,
      lastModified: new Date(page.updated),
      changeFrequency: "monthly",
      priority: page.slug.includes("website") ? 0.82 : 0.8,
    });
  }

  for (const page of playbookPages) {
    entries.set(`${SITE_URL}/playbooks/${page.slug}/`, {
      url: `${SITE_URL}/playbooks/${page.slug}/`,
      lastModified: new Date(page.updated),
      changeFrequency: "monthly",
      priority: page.slug.includes("website") ? 0.82 : 0.8,
    });
  }


  for (const tool of tools) {
    entries.set(`${SITE_URL}/tools/${tool.slug}/`, {
      url: `${SITE_URL}/tools/${tool.slug}/`,
      lastModified: new Date(tool.updated ?? "2026-08-14"),
      changeFrequency: "monthly",
      priority: 0.82,
    });
  }


  for (const path of ["privacy-policy", "terms-and-conditions"]) {
    entries.set(`${SITE_URL}/${path}/`, {
      url: `${SITE_URL}/${path}/`,
      lastModified: new Date("2026-06-22"),
      changeFrequency: "yearly",
      priority: 0.4,
    });
  }

  for (const slug of ['locations', ...markets.map(m => m.slug), ...expansionPaths]) {
    const url = `https://crea8ivmedia.com/${slug}/`;
    entries.set(url, { url });
  }

  return Array.from(entries.values())
    .filter((entry) => {
      const pathname = new URL(entry.url).pathname;
      return !Object.hasOwn(legacyRedirects, pathname)
        && !isSpamPath(entry.url)
        && !/\/(?:website-portfolio|results)\/[^/]+/.test(entry.url);
    })
    .sort((a, b) => a.url.localeCompare(b.url));
}
