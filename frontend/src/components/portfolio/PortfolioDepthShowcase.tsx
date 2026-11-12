'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react';
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, useSyncExternalStore, type CSSProperties } from 'react';
import type { ShowcaseWork } from '@/lib/portfolio-showcase';
import { normalizePortfolio, cinematicFrame, sceneWeight } from '@/lib/portfolio-orbit';
import { getScrollController } from '@/lib/scroll-controller';
import styles from './portfolio-depth-showcase.module.css';

const subscribe = (notify: () => void) => {
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  media.addEventListener('change', notify);
  return () => media.removeEventListener('change', notify);
};
const reducedSnapshot = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const serverSnapshot = () => true;
const clamp = (value: number, max: number) => Math.max(0, Math.min(max, value));

export default function PortfolioDepthShowcase({ work }: { work: ShowcaseWork[] }) {
  const { categories, projects } = useMemo(() => normalizePortfolio(work), [work]);
  const reduced = useSyncExternalStore(subscribe, reducedSnapshot, serverSnapshot);
  const [viewMode, setViewMode] = useState<'orbit' | 'grid'>('orbit');
  const [activeIndex, setActiveIndex] = useState(0);
  const [gridCategory, setGridCategory] = useState('all');
  const [intent, setIntent] = useState<string | null>(null);
  const [selected, setSelected] = useState<ShowcaseWork | null>(null);
  const track = useRef<HTMLElement>(null);
  const cards = useRef<(HTMLElement | null)[]>([]);
  const scenes = useRef<(HTMLDivElement | null)[]>([]);
  const categoryButtons = useRef<(HTMLButtonElement | null)[]>([]);
  const nav = useRef<HTMLDivElement>(null);
  const indicator = useRef<HTMLSpanElement>(null);
  const position = useRef(0);
  const activeRef = useRef(0);
  const metrics = useRef({ top: 0, distance: 1 });
  const jumpFrame = useRef(0);
  const jumping = useRef(false);
  const changingView = useRef(false);
  const restore = useRef(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const shell = useRef<HTMLDivElement>(null);
  const caseScroll = useRef<HTMLDivElement>(null);
  const strip = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const sourceRect = useRef<DOMRect | null>(null);
  const closing = useRef(false);
  const savedScroll = useRef(0);
  const scrollIdle = useRef<ReturnType<typeof setTimeout> | null>(null);
  const active = projects[activeIndex] || projects[0];
  const activeCategory = categories.find(category => category.id === active?.categoryId) || categories[0];
  const matchesGrid = (entry: (typeof projects)[number]) => gridCategory === 'all' || entry.categoryId === gridCategory
    || (gridCategory === 'campaigns' && entry.project.category === 'Campaigns & Content');
  const panels: NonNullable<ShowcaseWork['story']> = selected ? [{ title: selected.title, body: selected.description, image: selected.image, points: selected.services }, ...(selected.story || [])] : [];

  const paint = useCallback((value: number) => {
    const current = clamp(value, projects.length - 1);
    position.current = current;
    const next = Math.round(current);
    if (activeRef.current !== next) { activeRef.current = next; setActiveIndex(next); }
    const compact = innerWidth < 900;
    cards.current.forEach((card, index) => {
      if (!card) return;
      const frame = cinematicFrame(index, current, compact, reduced);
      Object.assign(card.style, { transform: frame.transform, opacity: String(frame.opacity),
        filter: frame.filter, zIndex: String(frame.zIndex), visibility: frame.visible ? 'visible' : 'hidden' });
      const image = card.querySelector('img');
      if (image?.naturalWidth && image.naturalHeight) card.style.setProperty('--visual-ratio', String(image.naturalWidth / image.naturalHeight));
      card.inert = next !== index || jumping.current;
      card.dataset.focused = String(next === index);
    });
    scenes.current.forEach((scene, index) => {
      if (!scene) return;
      const weight = sceneWeight(index, current, reduced);
      scene.style.opacity = String(weight);
      scene.style.visibility = weight > 0 ? 'visible' : 'hidden';
      scene.style.transform = reduced ? 'none' : `scale(${1.025 + (1 - weight) * .045})`;
    });
    if (track.current) {
      track.current.dataset.position = current.toFixed(3);
      track.current.dataset.navigation = String(jumping.current);
    }
  }, [projects.length, reduced]);

  useLayoutEffect(() => {
    if (viewMode !== 'orbit' || !track.current) return;
    const root = track.current;
    let frame = 0;
    let measured = false;
    const read = () => clamp((scrollY - metrics.current.top) / metrics.current.distance * (projects.length - 1), projects.length - 1);
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(() => {
        frame = 0;
        const value = read();
        if (Math.abs(value - position.current) > .025) {
          root.dataset.scrolling = 'true';
          if (scrollIdle.current) clearTimeout(scrollIdle.current);
          scrollIdle.current = setTimeout(() => { root.dataset.scrolling = 'false'; }, 180);
        }
        paint(value);
      });
    };
    const measure = () => {
      metrics.current = { top: root.getBoundingClientRect().top + scrollY, distance: Math.max(1, root.offsetHeight - innerHeight) };
      if (restore.current || measured) {
        window.scrollTo({ top: metrics.current.top + position.current / Math.max(1, projects.length - 1) * metrics.current.distance, behavior: 'instant' });
        restore.current = false;
      }
      paint(read());
      measured = true;
    };
    const protect = (event: WheelEvent) => {
      if (!jumping.current) return;
      if (Math.abs(event.deltaY) > 160) {
        cancelAnimationFrame(jumpFrame.current); jumping.current = false; setIntent(null);
        getScrollController()?.scrollTo(scrollY, { duration: 0, force: true });
      } else event.preventDefault();
    };
    const protectTouch = (event: TouchEvent) => { if (jumping.current) event.preventDefault(); };
    measure();
    window.addEventListener('scroll', scroll, { passive: true });
    window.addEventListener('resize', measure);
    root.addEventListener('wheel', protect, { passive: false });
    root.addEventListener('touchmove', protectTouch, { passive: false });
    return () => {
      window.removeEventListener('scroll', scroll); window.removeEventListener('resize', measure);
      root.removeEventListener('wheel', protect); root.removeEventListener('touchmove', protectTouch);
      cancelAnimationFrame(frame); cancelAnimationFrame(jumpFrame.current); jumping.current = false;
      if (scrollIdle.current) clearTimeout(scrollIdle.current);
    };
  }, [paint, projects.length, viewMode]);

  useLayoutEffect(() => {
    if (viewMode !== 'orbit') return;
    const index = categories.findIndex(category => category.id === activeCategory?.id);
    const button = categoryButtons.current[index];
    const update = () => { if (button && indicator.current) {
      indicator.current.style.width = `${button.offsetWidth}px`;
      indicator.current.style.transform = `translateX(${button.offsetLeft}px)`;
      nav.current?.scrollTo({ left: Math.max(0, button.offsetLeft - (nav.current.clientWidth - button.offsetWidth) / 2), behavior: reduced ? 'instant' : 'smooth' });
    } };
    update();
    const observer = new ResizeObserver(update);
    if (nav.current) observer.observe(nav.current);
    if (button) observer.observe(button);
    return () => observer.disconnect();
  }, [activeCategory?.id, categories, reduced, viewMode]);

  useEffect(() => {
    const sync = () => {
      if (['#archive', '#website-portfolio', '#client-case-studies'].includes(location.hash)) {
        setViewMode('grid');
        setGridCategory(location.hash === '#archive' ? 'campaigns' : 'all');
      }
    };
    sync(); window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  useLayoutEffect(() => {
    if (viewMode === 'grid') track.current?.querySelectorAll<HTMLElement>('#portfolio-projects > article').forEach(card => {
      card.removeAttribute('style');
      card.inert = false;
    });
    const collection = track.current?.querySelector<HTMLElement>('#portfolio-projects');
    if (!collection || !changingView.current) return;
    collection.getAnimations().forEach(animation => animation.cancel());
    if (reduced) { changingView.current = false; return; }
    const animation = collection.animate([{ opacity: 0, transform: 'scale(.96)' }, { opacity: 1, transform: 'none' }], { duration: 280, easing: 'cubic-bezier(.2,.8,.2,1)' });
    void animation.finished.finally(() => { changingView.current = false; });
  }, [viewMode, reduced, gridCategory]);

  function goTo(index: number, categoryId?: string) {
    if (viewMode !== 'orbit' || !projects.length) return;
    cancelAnimationFrame(jumpFrame.current);
    const destination = clamp(index, projects.length - 1);
    const target = metrics.current.top + destination / Math.max(1, projects.length - 1) * metrics.current.distance;
    const duration = reduced ? 0 : Math.min(1500, 650 + Math.abs(position.current - destination) * 35);
    jumping.current = duration > 0; setIntent(categoryId || null);
    const finish = () => { jumping.current = false; setIntent(null); paint(destination); };
    const controller = getScrollController();
    if (controller && duration) { controller.scrollTo(target, { duration: duration / 1000, force: true, onComplete: finish }); return; }
    const start = scrollY;
    let started = 0;
    const tick = (time: number) => {
      if (!started) started = time;
      const t = duration ? Math.min(1, (time - started) / duration) : 1;
      const eased = t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      window.scrollTo({ top: start + (target - start) * eased, behavior: 'instant' });
      paint(clamp((scrollY - metrics.current.top) / metrics.current.distance * (projects.length - 1), projects.length - 1));
      if (t < 1) jumpFrame.current = requestAnimationFrame(tick); else finish();
    };
    jumpFrame.current = requestAnimationFrame(tick);
  }

  async function changeView() {
    if (changingView.current) return;
    changingView.current = true;
    const collection = track.current?.querySelector<HTMLElement>('#portfolio-projects');
    if (collection && !reduced) await collection.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'scale(.96)' }], { duration: 180, fill: 'forwards' }).finished.catch(() => {});
    if (viewMode === 'orbit') {
      cancelAnimationFrame(jumpFrame.current); jumping.current = false; setIntent(null);
      setViewMode('grid'); window.scrollTo({ top: metrics.current.top, behavior: 'instant' });
    } else { restore.current = true; setViewMode('orbit'); }
  }

  function openProject(project: ShowcaseWork, button: HTMLButtonElement) {
    if (jumping.current) return;
    opener.current = button;
    sourceRect.current = button.closest('article')?.getBoundingClientRect() || null;
    savedScroll.current = scrollY;
    getScrollController()?.scrollTo(savedScroll.current, { duration: 0, force: true });
    closing.current = false;
    setSelected(project);
  }

  useLayoutEffect(() => {
    if (!selected || !dialog.current || !shell.current) return;
    const root = dialog.current;
    shell.current.getAnimations().forEach(animation => animation.cancel());
    root.showModal();
    const rect = sourceRect.current, target = shell.current.getBoundingClientRect();
    if (rect && !reduced) shell.current.animate([
      { transform: `translate(${rect.left - target.left}px,${rect.top - target.top}px) scale(${rect.width / target.width},${rect.height / target.height})`, opacity: .65 },
      { transform: 'none', opacity: 1 },
    ], { duration: 600, easing: 'cubic-bezier(.2,.8,.2,1)' });
    root.querySelector<HTMLButtonElement>('[data-case-close]')?.focus({ preventScroll: true });
    const scroller = caseScroll.current, rail = strip.current;
    let frame = 0;
    let width = scroller?.clientWidth || 1;
    let travel = rail ? rail.scrollWidth - width : 0;
    const update = () => {
      if (!scroller || !rail) return;
      const max = scroller.scrollHeight - scroller.clientHeight;
      const progress = max > 0 ? scroller.scrollTop / max : 0;
      rail.style.transform = `translate3d(${-progress * travel}px,0,0)`;
      rail.querySelectorAll<HTMLElement>('[data-story-panel]').forEach((panel, index) => {
        const distance = index - progress * Math.max(0, panels.length - 1);
        panel.style.setProperty('--panel-offset', reduced ? '0px' : `${Math.max(-1, Math.min(1, distance)) * 9}px`);
        panel.style.setProperty('--panel-scale', reduced ? '1' : String(1 - Math.min(1, Math.abs(distance)) * .018));
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(() => { frame = 0; update(); }); };
    const measure = () => { width = scroller?.clientWidth || 1; travel = rail ? rail.scrollWidth - width : 0; update(); };
    if (scroller) scroller.scrollTop = 0;
    update(); scroller?.addEventListener('scroll', schedule, { passive: true }); window.addEventListener('resize', measure);
    return () => {
      cancelAnimationFrame(frame);
      scroller?.removeEventListener('scroll', schedule); window.removeEventListener('resize', measure);
      root.close(); window.scrollTo({ top: savedScroll.current, behavior: 'instant' });
      opener.current?.focus({ preventScroll: true });
    };
  }, [selected, reduced, panels.length]);

  async function closeProject() {
    if (closing.current) return;
    closing.current = true;
    const rect = sourceRect.current, element = shell.current;
    const rail = strip.current;
    if (rail && !reduced && caseScroll.current && caseScroll.current.scrollTop > 1) {
      await rail.animate([{ transform: getComputedStyle(rail).transform, opacity: 1 }, { transform: 'translate3d(0,0,0)', opacity: 1 }],
        { duration: 300, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'forwards' }).finished.catch(() => {});
      caseScroll.current.scrollTop = 0;
      rail.style.transform = 'translate3d(0,0,0)';
      rail.getAnimations().forEach(animation => animation.cancel());
    }
    if (element && rect && !reduced) {
      const currentTransform = getComputedStyle(element).transform;
      element.getAnimations().forEach(animation => animation.cancel());
      const target = element.getBoundingClientRect();
      await element.animate([{ transform: currentTransform, opacity: 1 },
        { transform: `translate(${rect.left - target.left}px,${rect.top - target.top}px) scale(${rect.width / target.width},${rect.height / target.height})`, opacity: .4 }],
      { duration: 450, easing: 'cubic-bezier(.65,0,.35,1)', fill: 'forwards' }).finished.catch(() => {});
    }
    element?.getAnimations().forEach(animation => animation.cancel());
    setSelected(null);
  }

  function renderProject(project: ShowcaseWork, index: number, orbit: boolean) {
    const frame = cinematicFrame(index, 0, false, reduced);
    return <article key={project.id} ref={orbit ? element => { cards.current[index] = element; } : undefined}
      className={styles.card} data-project-id={project.id} data-focused={index === activeIndex} data-category={project.category}
      style={orbit ? { '--visual-ratio': project.image.width / project.image.height, transform: frame.transform, opacity: frame.opacity, zIndex: frame.zIndex } as CSSProperties : undefined}
      inert={orbit && index !== activeIndex}>
      <div className={styles.artwork}><Image {...project.image} alt={project.image.alt}
        onLoad={event => {
          const image = event.currentTarget;
          image.closest('article')?.style.setProperty('--visual-ratio', String(image.naturalWidth / image.naturalHeight));
        }}
        loading={orbit && Math.abs(index - activeIndex) <= 2 ? 'eager' : 'lazy'} sizes="(max-width:599px) 80vw, (max-width:899px) 70vw, 56vw" /></div>
      {orbit && <span className={styles.previewLabel} aria-hidden="true">{project.title}</span>}
      <button className={styles.inspect} type="button" aria-label={`Explore ${project.title}`} onClick={event => openProject(project, event.currentTarget)} />
      <div className={styles.caption}>
        <p className={styles.discipline}>{project.portfolioCategory || project.category}{!orbit ? ` · ${project.industry}` : ''}{project.statusLabel ? ` · ${project.statusLabel}` : ''}</p>
        <h2>{project.title}</h2>
        {project.services?.length ? <p className={styles.services}>{project.services.slice(0, 3).join(' · ')}</p> : null}
        <div className={styles.cardActions}>
          <button className={styles.primary} type="button" onClick={event => openProject(project, event.currentTarget)}>View Project <ArrowUpRight size={16} /></button>
          {project.liveHref && <a className={styles.secondary} href={project.liveHref} target="_blank" rel="noopener noreferrer">Live Website <ArrowUpRight size={16} /></a>}
        </div>
      </div>
    </article>;
  }

  return <main className={styles.page} data-overlay={!!selected}>
    <section ref={track} className={styles.track} data-mode={viewMode} aria-labelledby="results-title" tabIndex={viewMode === 'orbit' ? 0 : undefined}
      style={{ '--steps': Math.max(1, projects.length - 1) } as CSSProperties}
      onKeyDown={event => {
        if (viewMode !== 'orbit' || selected || event.target instanceof HTMLInputElement) return;
        if (event.key === 'Enter' && event.target === event.currentTarget) {
          const button = cards.current[activeRef.current]?.querySelector<HTMLButtonElement>('button');
          if (button) { event.preventDefault(); openProject(projects[activeRef.current].project, button); }
        }
        if (['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft'].includes(event.key)) {
          event.preventDefault(); goTo(activeRef.current + (['ArrowDown', 'ArrowRight'].includes(event.key) ? 1 : -1));
        }
      }}>
      <div className={styles.stage}>
        {viewMode === 'orbit' && <div className={styles.scene} aria-hidden="true">
          {projects.map((entry, index) => <div key={entry.projectId} ref={element => { scenes.current[index] = element; }} className={styles.sceneImage}
            style={{ opacity: index === 0 ? 1 : 0 }}>
            {Math.abs(index - activeIndex) <= 2 && <Image {...entry.project.image} alt="" sizes="100vw" loading={index === activeIndex ? 'eager' : 'lazy'} />}
          </div>)}
        </div>}
        <div className={styles.topbar}><Link href="/" className={styles.wordmark}>CREA8IV / SELECTED WORK</Link><Link href="/contact/">Discuss your project <ArrowUpRight size={15} /></Link></div>
        <header className={styles.heading}><p>SELECTED WORK</p><h1 id="results-title">Our Work</h1>{viewMode === 'orbit' && <span className={styles.totalCount}>{String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>}</header>
        {viewMode === 'grid' && <div className={styles.filters} role="group" aria-label="Filter all projects">
          <button type="button" aria-pressed={gridCategory === 'all'} onClick={() => setGridCategory('all')}>All projects</button>
          {gridCategory === 'campaigns' && <button type="button" aria-pressed="true">All campaigns</button>}
          {categories.map(category => <button type="button" key={category.id} aria-pressed={gridCategory === category.id} onClick={() => setGridCategory(category.id)}>{category.label}</button>)}
        </div>}
        <div className={styles.collection} id="portfolio-projects" aria-label="Selected projects">
          {projects.map((entry, index) => viewMode === 'orbit' || matchesGrid(entry) ? renderProject(entry.project, index, viewMode === 'orbit') : null)}
        </div>
        <div className={styles.bottomBar}>
          {viewMode === 'orbit' ? <>
            <div className={styles.chapter} aria-live="polite" aria-atomic="true" aria-label={`${active?.categoryLabel}: ${(active?.indexInCategory || 0) + 1} of ${activeCategory?.count || 0}`}><span>{active?.categoryLabel}</span><span>{String((active?.indexInCategory || 0) + 1).padStart(2, '0')} / {String(activeCategory?.count || 0).padStart(2, '0')}</span></div>
            <div ref={nav} className={styles.categoryNav}><div className={styles.categoryItems} role="group" aria-label="Jump to portfolio category">
              {categories.map((category, index) => <button key={category.id} ref={element => { categoryButtons.current[index] = element; }} type="button" aria-current={active?.categoryId === category.id ? 'true' : undefined}
                data-intent={intent === category.id} onClick={() => goTo(category.categoryStartIndex, category.id)}>{category.label}</button>)}
              <span ref={indicator} className={styles.indicator} aria-hidden="true" />
            </div></div>
            <div className={styles.controls}><button type="button" aria-label="Previous project" disabled={!activeIndex} onClick={() => goTo(activeIndex - 1)}><ArrowLeft size={18} /></button><button type="button" aria-label="Next project" disabled={activeIndex === projects.length - 1} onClick={() => goTo(activeIndex + 1)}><ArrowRight size={18} /></button></div>
          </> : <span>{projects.filter(matchesGrid).length} projects</span>}
          <button type="button" className={styles.viewToggle} onClick={changeView}>{viewMode === 'orbit' ? 'View All Projects' : 'Back to Showcase'} <ArrowUpRight size={16} /></button>
        </div>
      </div>
    </section>
    <dialog ref={dialog} className={styles.caseDialog} data-lenis-prevent aria-label={selected ? `${selected.title} case study` : 'Project case study'}
      onCancel={event => { event.preventDefault(); void closeProject(); }}>
      <div ref={shell} className={styles.caseShell}>
        <div className={styles.caseTop}><span>{selected?.category} / {selected?.title}</span><button type="button" data-case-close aria-label="Close case study" onClick={() => void closeProject()}><X size={22} /></button></div>
        <div ref={caseScroll} className={styles.caseScroll} tabIndex={0} aria-label="Scroll to explore the case study" data-lenis-prevent
          onFocusCapture={event => {
            const panel = (event.target as HTMLElement).closest<HTMLElement>('[data-story-panel]');
            if (panel && event.target !== event.currentTarget) {
              const index = Number(panel.dataset.storyPanel);
              const root = event.currentTarget;
              root.scrollTo({ top: index / Math.max(1, panels.length - 1) * (root.scrollHeight - root.clientHeight), behavior: reduced ? 'instant' : 'smooth' });
            }
          }}>
          <div className={styles.caseTrack} style={{ '--panels': Math.max(0, panels.length - 1) } as CSSProperties}>
            <div className={styles.caseViewport}><div ref={strip} className={styles.caseStrip}>
              {panels.map((panel, index) => {
                const images = panel.gallery || (panel.image ? [panel.image] : []);
                return <section className={`${styles.casePanel} ${index === 0 ? styles.caseHero : ''} ${!images.length ? styles.caseTextPanel : ''}`} data-story-panel={index} key={`${index}-${panel.title}`}>
                {index === 0 && panel.image && <div className={styles.caseHeroBackdrop} aria-hidden="true" style={{ backgroundImage: `url("${panel.image.src}")` }} />}
                {images.length > 0 && <div className={`${styles.caseImage} ${images.length > 1 ? styles.caseGallery : ''}`}>{images.map(image => <Image key={image.src} {...image} alt={image.alt} sizes="(max-width:899px) 82vw, 50vw" />)}</div>}
                <div className={styles.caseCopy}><p className={styles.discipline}>{index === 0 ? `${selected?.portfolioCategory || selected?.category} · ${selected?.industry}` : selected?.title}</p><h2>{panel.title}</h2>{panel.body && <p>{panel.body}</p>}
                  {panel.points?.length ? <ul>{panel.points.map(point => <li key={point}>{point}</li>)}</ul> : null}
                  {index === 0 && <div className={styles.cardActions}>{selected?.studyHref && <Link href={selected.studyHref} prefetch={false} className={styles.secondary}>Full case study <ArrowUpRight size={16} /></Link>}{selected?.liveHref && <a href={selected.liveHref} target="_blank" rel="noopener noreferrer" className={styles.primary}>Live Website <ArrowUpRight size={16} /></a>}{selected?.detailHref && <Link href={selected.detailHref} prefetch={false} className={styles.secondary}>{selected.detailLabel} <ArrowUpRight size={16} /></Link>}</div>}
                </div>
              </section>; })}
            </div></div>
          </div>
        </div>
        {panels.length > 1 ? <button type="button" className={styles.caseHint} onClick={() => {
          const root = caseScroll.current;
          if (root) root.scrollBy({ top: (root.scrollHeight - root.clientHeight) / Math.max(1, panels.length - 1), behavior: reduced ? 'instant' : 'smooth' });
        }}>Scroll to See <ArrowRight size={16} /></button> : <span className={styles.caseHint}>Project overview</span>}
      </div>
    </dialog>
  </main>;
}
