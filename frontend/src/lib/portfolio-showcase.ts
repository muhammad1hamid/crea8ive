import { resultsCollection, featuredResults, type ResultsWork } from './results-portfolio';
import { caseStudyShowcaseItems } from './case-study-showcase';
import { websitePortfolioItems } from './website-portfolio';

export type ShowcaseWork = ResultsWork & {
  industry: string;
  liveHref?: string;
  studyHref?: string;
  detailHref?: string;
  detailLabel?: string;
  statusLabel?: string;
};

const aliases: Record<string, string> = {
  'home-studio-interior-design': 'home-studio-interiors',
  'co3-premium-rawalpindi-drinks': 'co3-premium-liquid-shop',
  'co3-identity': 'co3-premium-liquid-shop',
  'smile-xperts-identity': 'the-smile-xperts',
  'patientflow-clinic-retention-software': 'patientflow',
};

// Reconcile the existing registries; never infer a live URL from a client's name.
const collection: ShowcaseWork[] = resultsCollection.map(work => {
  const study = caseStudyShowcaseItems.find(item => item.id === (aliases[work.id] || work.id) || (work.href?.startsWith('/case-studies/') && item.primaryHref === work.href));
  const website = websitePortfolioItems.find(item => item.slug === work.id);
  const preview = featuredResults.find(item => item.id === work.id)?.preview;
  const studyHref = study?.primaryHref.startsWith('/case-studies/') ? study.primaryHref
    : work.href?.startsWith('/case-studies/') ? work.href : undefined;
  const liveHref = work.category === 'Websites'
    ? (website?.external ? website.href : study?.secondaryExternal ? study.secondaryHref : undefined)
    : undefined;
  const detailHref = !studyHref && work.href && work.href !== '/results/' && !work.href.startsWith('https://') ? work.href : undefined;
  return {
    ...work,
    image: preview || work.image,
    industry: study?.industry || website?.category.replace(/ Website$/, '') || work.description.split(' · ')[0],
    studyHref, liveHref, detailHref,
    detailLabel: work.linkLabel || 'View project',
    statusLabel: !liveHref && !studyHref && /\bconcept\b|\bdirection\b/i.test(work.description) ? 'Concept' : undefined,
  };
});

const missingStudies: ShowcaseWork[] = caseStudyShowcaseItems
  .filter(study => !collection.some(work => (aliases[work.id] || work.id) === study.id || work.studyHref === study.primaryHref))
  .map(study => ({
    id: study.id, title: study.name, category: 'Websites', description: study.eyebrow,
    industry: study.industry,
    image: { src: study.image, alt: study.imageAlt, width: 1280, height: 800 },
    studyHref: study.primaryHref.startsWith('/case-studies/') ? study.primaryHref : undefined,
    liveHref: study.secondaryExternal ? study.secondaryHref : undefined,
    detailHref: !study.primaryHref.startsWith('/case-studies/') ? study.primaryHref : undefined,
    detailLabel: study.primaryLabel,
  }));

const openingOrder = ['buildscape', 'stw-movers-barcelona', 'co3-identity', 'the-smile-xperts', 'curtain-hive-3d-wallpaper'];
const allWork = [...collection, ...missingStudies];
export const portfolioShowcase = [
  ...openingOrder.flatMap(id => allWork.filter(work => work.id === id)),
  ...allWork.filter(work => !openingOrder.includes(work.id)),
];
