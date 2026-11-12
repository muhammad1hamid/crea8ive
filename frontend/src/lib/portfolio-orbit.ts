import type { ShowcaseWork } from './portfolio-showcase';

export function normalizePortfolio(work: ShowcaseWork[]) {
  const categoryOf = (project: ShowcaseWork) => project.portfolioCategory || project.category;
  const labels = [...new Set(work.map(categoryOf))];
  let cursor = 0;
  const categories = labels.map(label => {
    const projects = work.filter(project => categoryOf(project) === label);
    const category = { id: label.toLowerCase().replace(/[^a-z0-9]+/g, '-'), label,
      categoryStartIndex: cursor, categoryEndIndex: cursor + projects.length - 1, count: projects.length };
    cursor += projects.length;
    return category;
  });
  const projects = categories.flatMap(category => work.filter(project => categoryOf(project) === category.label)
    .map((project, indexInCategory) => ({ project, projectId: project.id, categoryId: category.id,
      categoryLabel: category.label, indexInCategory, globalIndex: category.categoryStartIndex + indexInCategory,
      categoryStartIndex: category.categoryStartIndex, categoryEndIndex: category.categoryEndIndex })));
  return { categories, projects };
}

/** A finite, two-sided lane: the approaching preview grows into the hero plane. */
export function cinematicFrame(index: number, position: number, compact: boolean, reduced: boolean) {
  const d = index - position;
  const depth = Math.abs(d);
  if (reduced) return { transform: 'translate(-50%, -50%)', opacity: Math.round(position) === index ? 1 : 0,
    filter: 'none', zIndex: Math.round(position) === index ? 1000 : 0, visible: Math.round(position) === index };
  const seed = ((index * 17) % 11 - 5) / 5;
  const variation = Math.min(1, depth);
  const side = Math.sign(d);
  const x = side * (Math.min(depth, 1) * (compact ? 54 : 41) + Math.max(0, depth - 1) * (compact ? 20 : 18));
  const y = (Math.min(depth, 1) * 4 - Math.max(0, depth - 1) * 3 + seed * .7 * variation);
  const scale = Math.max(.48, 1 - Math.min(depth, 1) * .27 - Math.max(0, depth - 1) * .12);
  const visible = depth < (compact ? 1.7 : 2.8);
  return { transform: `translate(-50%, -50%) translate3d(${x}vw, ${y}svh, ${-Math.min(depth, 3) * 65}px) rotateY(${-side * Math.min(depth, 1) * (compact ? 10 : 22)}deg) rotateZ(${(side * (compact ? 1.5 : 3) + seed * .6) * variation}deg) scale(${scale})`,
    opacity: Math.max(0, 1 - depth * .38), filter: `blur(${Math.min(2.8, depth * .85)}px) saturate(${Math.max(.6, 1 - depth * .18)}) brightness(${Math.max(.6, 1 - depth * .14)})`,
    zIndex: 1000 - Math.round(depth * 100), visible };
}

/** At most two images contribute to the scene; no frame-by-frame React updates. */
export function sceneWeight(index: number, position: number, reduced: boolean) {
  if (reduced) return index === Math.round(position) ? 1 : 0;
  const distance = Math.abs(index - position);
  const t = Math.max(0, 1 - distance);
  return t * t * (3 - 2 * t);
}
