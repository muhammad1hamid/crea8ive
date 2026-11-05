import { z } from "zod";

const nonEmptyText = z.string().trim().min(1);
const rootRelativePath = z.string().startsWith("/");

export const pageSeoMetadataSchema = z.object({
  title: nonEmptyText,
  description: nonEmptyText,
  summary: nonEmptyText,
});

export const pageSeoMetadataRecordSchema = z.record(z.string().min(1), pageSeoMetadataSchema);

const imagePresentationSchema = z.object({
  src: rootRelativePath,
  alt: nonEmptyText,
  caption: nonEmptyText,
});

const titledCopySchema = z.object({
  title: nonEmptyText,
  body: nonEmptyText,
});

export const premiumCaseStudySchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  clientName: nonEmptyText,
  clientLegalName: nonEmptyText.optional(),
  clientUrl: z.url(),
  clientAnchorText: nonEmptyText.optional(),
  caseStudyUrl: z.url(),
  metaTitle: nonEmptyText,
  metaDescription: nonEmptyText,
  socialImage: rootRelativePath,
  heroTitle: nonEmptyText,
  subtitle: nonEmptyText,
  eyebrow: nonEmptyText,
  statusLabel: nonEmptyText,
  industry: nonEmptyText,
  location: nonEmptyText,
  market: nonEmptyText,
  platform: nonEmptyText,
  heroImage: imagePresentationSchema,
  desktopImage: imagePresentationSchema,
  mobileImage: imagePresentationSchema,
  accent: z.string().regex(/^#[0-9a-f]{6}$/i),
  accentSoft: nonEmptyText,
  snapshot: z.array(z.object({ label: nonEmptyText, value: nonEmptyText })).min(1),
  overview: z.object({ title: nonEmptyText, body: nonEmptyText, points: z.array(nonEmptyText).optional() }).optional(),
  challenge: z.object({ intro: nonEmptyText, points: z.array(nonEmptyText).min(1) }),
  strategy: z.array(titledCopySchema).min(1),
  execution: z.object({ title: nonEmptyText, body: nonEmptyText, points: z.array(nonEmptyText).min(1) }),
  deliverables: z.array(nonEmptyText).min(1),
  outcomes: z.array(nonEmptyText).min(1),
  technology: z.array(nonEmptyText).min(1),
  evidenceTitle: nonEmptyText,
  evidenceCopy: nonEmptyText,
  responsiveShowcase: z.object({
    src: rootRelativePath,
    alt: nonEmptyText,
    title: nonEmptyText,
    body: nonEmptyText,
    caption: nonEmptyText,
    points: z.array(nonEmptyText).optional(),
  }).optional(),
  creativeExamples: z.array(z.object({ src: rootRelativePath, alt: nonEmptyText, title: nonEmptyText, body: nonEmptyText })).min(1),
  evidenceMetrics: z.array(z.object({ label: nonEmptyText, value: nonEmptyText, note: nonEmptyText })).optional(),
  proofGallery: z.array(z.object({ src: rootRelativePath, alt: nonEmptyText, title: nonEmptyText, body: nonEmptyText })).optional(),
  serviceLinks: z.array(z.object({ label: nonEmptyText, href: z.string().startsWith("/") })).min(1),
  closingTitle: nonEmptyText.optional(),
  closingCopy: nonEmptyText.optional(),
  faq: z.array(z.object({ question: nonEmptyText, answer: nonEmptyText })).optional(),
});

export const premiumCaseStudyRecordSchema = z.record(z.string().min(1), premiumCaseStudySchema);
