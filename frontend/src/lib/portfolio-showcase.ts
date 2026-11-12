import { resultsCollection, featuredResults, type ResultsWork } from './results-portfolio';
import { caseStudyShowcaseItems } from './case-study-showcase';
import { websitePortfolioItems } from './website-portfolio';
import { premiumCaseStudies } from './premium-case-studies';
import { stwMoversStudy, stwArchitecture, stwFaqs, stwMeasurement } from './stw-movers-case-study';
import portfolioGrids from '@/data/portfolio-grid-assets.json';
import { buildscapeJourney, buildscapeScope } from './buildscape-case-study';

export type ShowcaseWork = ResultsWork & {
  industry: string;
  liveHref?: string;
  studyHref?: string;
  detailHref?: string;
  detailLabel?: string;
  statusLabel?: string;
  services?: string[];
  portfolioCategory?: string;
  story?: { title: string; body?: string; image?: ResultsWork['image']; gallery?: ResultsWork['image'][]; points?: string[] }[];
};

const aliases: Record<string, string> = {
  'home-studio-interior-design': 'home-studio-interiors',
  'co3-premium-rawalpindi-drinks': 'co3-premium-liquid-shop',
  'co3-identity': 'co3-premium-liquid-shop',
  'smile-xperts-identity': 'the-smile-xperts',
  'patientflow-clinic-retention-software': 'patientflow',
};

// Reconcile the existing registries; never infer a live URL from a client's name.
function enrichWork(work: ResultsWork): ShowcaseWork {
  const study = caseStudyShowcaseItems.find(item => item.id === (aliases[work.id] || work.id) || (work.href?.startsWith('/case-studies/') && item.primaryHref === work.href));
  const website = websitePortfolioItems.find(item => item.slug === work.id);
  const preview = featuredResults.find(item => item.id === work.id)?.preview;
  const studyHref = study?.primaryHref.startsWith('/case-studies/') ? study.primaryHref
    : work.href?.startsWith('/case-studies/') ? work.href : undefined;
  const liveHref = work.category === 'Websites'
    ? (website?.external ? website.href : study?.secondaryExternal ? study.secondaryHref : undefined)
    : undefined;
  const detailHref = !studyHref && work.href && work.href !== '/results/' && !work.href.startsWith('https://') ? work.href : undefined;
  const premium = studyHref ? premiumCaseStudies[studyHref.split('/').filter(Boolean).at(-1)!] : undefined;
  const story: NonNullable<ShowcaseWork['story']> = premium ? [
    ...(premium.overview ? [{ title: premium.overview.title, body: premium.overview.body, points: premium.overview.points }] : []),
    { title: 'The challenge', body: premium.challenge.intro, points: premium.challenge.points },
    ...premium.strategy.map(section => ({ title: section.title, body: section.body })),
    { title: premium.execution.title, body: premium.execution.body, points: premium.execution.points },
    { title: 'Desktop & mobile design', body: premium.desktopImage.caption, points: [premium.mobileImage.caption], gallery: [
      { ...premium.desktopImage, width: 1440, height: 1000 }, { ...premium.mobileImage, width: 800, height: 1200 },
    ] },
    ...(premium.responsiveShowcase ? [{ title: premium.responsiveShowcase.title, body: premium.responsiveShowcase.body,
      image: { ...premium.responsiveShowcase, width: 1440, height: 1000 }, points: premium.responsiveShowcase.points }] : []),
    ...premium.creativeExamples.map(image => ({ title: image.title, body: image.body, image: { ...image, width: 1200, height: 900 } })),
    ...(premium.proofGallery || []).map(image => ({ title: image.title, body: image.body, image: { ...image, width: 1440, height: 1000 } })),
    { title: premium.evidenceTitle, body: premium.evidenceCopy, points: premium.outcomes },
    ...(premium.evidenceMetrics?.length ? [{ title: 'Published evidence', points: premium.evidenceMetrics.map(metric => `${metric.label}: ${metric.value}. ${metric.note}`) }] : []),
  ] : website ? [{ title: 'Project scope', body: website.summary, points: website.services }, { title: 'Project outcomes', points: website.outcomes }] : [];
  if (studyHref?.includes(stwMoversStudy.slug)) story.push(
    { title: 'The engagement', body: stwFaqs[0].answer },
    { title: 'Search and service architecture', body: stwMoversStudy.description, points: stwArchitecture.map(row => `${row.role}: ${row.purpose}`) },
    { title: 'Desktop & mobile experience', gallery: [
      { src: stwMoversStudy.desktop, alt: 'STW Movers desktop website', width: 1440, height: 1040 },
      { src: stwMoversStudy.mobile, alt: 'STW Movers mobile website', width: 390, height: 844 },
    ] },
    { title: 'Service pages & traveller answers', gallery: [
      { src: stwMoversStudy.service, alt: 'STW Movers Barcelona airport transfer service page', width: 1440, height: 1000 },
      { src: stwMoversStudy.answers, alt: 'STW Movers public traveller answer hub', width: 1440, height: 1000 },
    ] },
    { title: 'Measurement framework', body: 'Measurement framework, not reported performance.', points: stwMeasurement.map(row => `${row.metric}: ${row.definition} ${row.source}`) },
    { title: stwFaqs[2].question, body: stwFaqs[2].answer },
  );
  if (studyHref === '/case-studies/buildscape/') story.push(
    { title: 'A connected project journey', points: buildscapeJourney.map(([title, body]) => `${title}: ${body}`) },
    { title: 'Delivered & ongoing scope', points: buildscapeScope.map(([title, body, status]) => `${title} (${status}): ${body}`) },
    { title: 'Desktop & mobile experience', gallery: [
      { src: '/img/portfolio/websites/buildscape/buildscape-production-dark-20260927.webp', alt: 'Buildscape desktop website in its dark theme', width: 1440, height: 1000 },
      { src: '/img/portfolio/websites/buildscape/buildscape-production-mobile-20260927.webp', alt: 'Buildscape mobile website', width: 390, height: 844 },
    ] },
    { title: 'Projects & planning answers', gallery: [
      { src: '/img/portfolio/websites/buildscape/buildscape-production-projects-20260927.webp', alt: 'Buildscape project presentation', width: 1440, height: 1000 },
      { src: '/img/portfolio/websites/buildscape/buildscape-production-answer-20260927.webp', alt: 'Buildscape public planning answers', width: 1440, height: 1000 },
    ] },
  );
  return {
    ...work,
    portfolioCategory: portfolioGrids.find(grid => grid.id === work.id)?.category || work.category,
    image: preview || work.image,
    industry: study?.industry || website?.category.replace(/ Website$/, '') || work.description.split(' · ')[0],
    studyHref, liveHref, detailHref,
    services: premium?.deliverables || website?.services || study?.serviceTags,
    story,
    detailLabel: work.linkLabel || 'View project',
    statusLabel: !liveHref && !studyHref && /\bconcept\b|\bdirection\b/i.test(work.description) ? 'Concept' : undefined,
  };
}

const collection = resultsCollection.map(enrichWork);

const missingStudies: ShowcaseWork[] = caseStudyShowcaseItems
  .filter(study => !collection.some(work => (aliases[work.id] || work.id) === study.id || work.studyHref === study.primaryHref))
  .map(study => enrichWork({
    id: study.id, title: study.name, category: 'Websites', description: study.eyebrow,
    image: { src: study.image, alt: study.imageAlt, width: 1280, height: 800 },
    href: study.primaryHref, linkLabel: study.primaryLabel,
  }));

const openingOrder = ['buildscape', 'stw-movers-barcelona', 'co3-identity', 'the-smile-xperts', 'curtain-hive-3d-wallpaper'];
const allWork = [...collection, ...missingStudies];
export const portfolioShowcase = [
  ...openingOrder.flatMap(id => allWork.filter(work => work.id === id)),
  ...allWork.filter(work => !openingOrder.includes(work.id)),
];
