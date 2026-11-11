'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Grid2X2, Layers, Search, X } from 'lucide-react';
import { useEffect, useId, useLayoutEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from 'react';
import type { ShowcaseWork } from '@/lib/portfolio-showcase';
import { stageFrames } from './portfolio-stage';
import styles from './portfolio-depth-showcase.module.css';

const motionQuery = '(prefers-reduced-motion: no-preference) and (min-width: 360px) and (min-height: 600px)';
const subscribeMotion = (notify: () => void) => {
  const media = window.matchMedia(motionQuery);
  media.addEventListener('change', notify);
  return () => media.removeEventListener('change', notify);
};
const getMotion = () => window.matchMedia(motionQuery).matches;
const noMotion = () => false;
const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));
const categories = ['All work', 'Websites', 'Brand Identity', 'Campaigns & Content'] as const;

function ThumbnailDetails({ item, children }: { item: ShowcaseWork; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const region = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const openAtPress = useRef(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => {
      if (event.target instanceof Element && !region.current?.contains(event.target) && !event.target.closest('dialog')) setOpen(false);
    };
    document.addEventListener('pointerdown', dismiss);
    return () => document.removeEventListener('pointerdown', dismiss);
  }, [open]);

  return <div ref={region} className={styles.interaction} data-open={open}
    onPointerEnter={event => { if (event.pointerType === 'mouse') setOpen(true); }}
    onPointerLeave={event => {
      if (event.pointerType === 'mouse' && !event.currentTarget.querySelector(':focus-visible') && !document.querySelector('dialog[open]')) setOpen(false);
    }}
    onBlur={event => {
      if (!event.currentTarget.contains(event.relatedTarget) && !document.querySelector('dialog[open]')) setOpen(false);
    }}
    onKeyDown={event => {
      if (event.key === 'Escape' && open) {
        event.stopPropagation();
        trigger.current?.focus({ preventScroll: true });
        setOpen(false);
      }
    }}>
    <button ref={trigger} type="button" className={styles.inspect}
      aria-label={`Project details for ${item.title}`} aria-controls={panelId} aria-expanded={open}
      onPointerDown={() => { openAtPress.current = open; }}
      onFocus={event => { if (event.currentTarget.matches(':focus-visible')) setOpen(true); }}
      onClick={event => { setOpen(event.detail ? !openAtPress.current : !open); }} />
    <div className={styles.panel} id={panelId} inert={!open} aria-hidden={!open}>{children}</div>
  </div>;
}

function ProjectCaption({ item, onPreview }: { item: ShowcaseWork; onPreview: (item: ShowcaseWork, opener: HTMLButtonElement) => void }) {
  const destinationCount = [item.liveHref, item.studyHref, item.detailHref].filter(Boolean).length;
  return <div className={styles.caption}>
    <p className={styles.discipline}>{item.industry}<span aria-hidden="true"> / </span>{item.category}{item.statusLabel ? ` · ${item.statusLabel}` : ''}</p>
    <h2>{item.title}</h2>
    <div className={styles.cardActions}>
      {item.liveHref && <a href={item.liveHref} target="_blank" rel="noopener noreferrer" className={styles.primary}>View live project <ArrowUpRight size={15} aria-hidden="true" /></a>}
      {item.studyHref && <Link href={item.studyHref} prefetch={false} className={item.liveHref ? styles.secondary : styles.primary}>Case study <ArrowUpRight size={15} aria-hidden="true" /></Link>}
      {destinationCount < 2 &&
        <button type="button" className={item.liveHref || item.studyHref ? styles.secondary : styles.primary} onClick={event => onPreview(item, event.currentTarget)}>Project preview <Layers size={15} aria-hidden="true" /></button>}
      {item.detailHref && <Link href={item.detailHref} prefetch={false} className={styles.secondary}>{item.detailLabel} <ArrowUpRight size={15} aria-hidden="true" /></Link>}
    </div>
  </div>;
}

export default function PortfolioDepthShowcase({ work }: { work: ShowcaseWork[] }) {
  const [viewAll, setViewAll] = useState(false);
  const [category, setCategory] = useState<string>('All work');
  const [query, setQuery] = useState('');
  const [position, setPosition] = useState(0);
  const [compact, setCompact] = useState(false);
  const active = Math.round(position);
  const [preview, setPreview] = useState<ShowcaseWork | null>(null);
  const motionAllowed = useSyncExternalStore(subscribeMotion, getMotion, noMotion);
  const animated = motionAllowed && !viewAll;
  const track = useRef<HTMLElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const previewOpener = useRef<HTMLButtonElement | null>(null);
  const filtered = work.filter(item => (category === 'All work' || item.category === category) &&
    `${item.title} ${item.industry} ${item.description}`.toLowerCase().includes(query.toLowerCase().trim()));

  useLayoutEffect(() => {
    if (!animated || !track.current) return;
    const root = track.current;
    let frame = 0;
    let distance = 1;
    let top = 0;
    let camera = 0;
    let target = 0;
    let lastTime = 0;
    const steps = Math.max(0, work.length - 1);
    const readTarget = () => clamp((window.scrollY - top) / distance, 0, 1) * steps;
    const paint = () => {
      setPosition(camera);
      root.style.setProperty('--progress', String(steps ? camera / steps : 0));
    };
    const advance = (now: number) => {
      const dt = Math.max(0, now - lastTime);
      lastTime = now;
      camera += (target - camera) * (1 - Math.exp(-dt / 78));
      if (Math.abs(target - camera) < .001) camera = target;
      paint();
      frame = camera === target ? 0 : requestAnimationFrame(advance);
    };
    const schedule = () => {
      target = readTarget();
      if (Math.abs(target - camera) > 2) camera = target;
      if (!frame) {
        lastTime = performance.now();
        frame = requestAnimationFrame(advance);
      }
    };
    const measure = () => {
      setCompact(document.documentElement.clientWidth < 900);
      top = root.getBoundingClientRect().top + window.scrollY;
      distance = Math.max(1, root.offsetHeight - window.innerHeight);
      cancelAnimationFrame(frame);
      frame = 0;
      camera = target = readTarget();
      paint();
    };
    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', measure);
      cancelAnimationFrame(frame);
    };
  }, [animated, work.length]);

  useEffect(() => {
    const sync = () => {
      if (window.location.hash === '#archive' || window.location.hash === '#website-portfolio' || window.location.hash === '#client-case-studies') {
        setViewAll(true);
        setCategory(window.location.hash === '#archive' ? 'Campaigns & Content' : 'All work');
      }
    };
    const frame = requestAnimationFrame(sync);
    window.addEventListener('hashchange', sync);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('hashchange', sync); };
  }, []);

  function changeView() {
    setViewAll(!viewAll);
    setCategory('All work');
    setQuery('');
    setPosition(0);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function goTo(index: number) {
    if (!track.current || work.length < 2) return;
    const top = track.current.getBoundingClientRect().top + window.scrollY;
    const distance = track.current.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + clamp(index, 0, work.length - 1) / (work.length - 1) * distance, behavior: 'smooth' });
  }

  function openPreview(item: ShowcaseWork, opener: HTMLButtonElement) {
    previewOpener.current = opener;
    setPreview(item);
    dialog.current?.showModal();
  }

  const prints = animated
    ? stageFrames(position, work.length, compact).map(frame => ({ item: work[frame.index], frame }))
    : filtered.map(item => ({ item, frame: null }));

  return (
    <main className={styles.page}>
      <section ref={track} className={styles.track} data-animated={animated} aria-labelledby="results-title"
        style={{ '--steps': Math.max(0, work.length - 1) } as CSSProperties}>
        <div className={styles.stage}>
          <div className={styles.topbar}>
            <Link href="/" className={styles.wordmark} aria-label="Crea8iv Media home">CREA8IV<span> / SELECTED WORK</span></Link>
            {motionAllowed && <button type="button" onClick={changeView} className={styles.viewToggle}>
              {viewAll ? <Layers size={16} aria-hidden="true" /> : <Grid2X2 size={16} aria-hidden="true" />}
              {viewAll ? 'Immersive view' : 'View all'}
            </button>}
          </div>
          <div className={styles.heading}>
            <h1 id="results-title">Our <em>Work</em></h1>
            <p className={styles.srOnly}>Crea8iv Media portfolio of websites, identities and campaigns shaped around real business needs. Good work deserves a closer look.</p>
          </div>
          {!animated && <div className={styles.filters}>
            <div role="group" aria-label="Project categories">{categories.map(item => <button type="button" key={item} aria-pressed={item === category} onClick={() => setCategory(item)}>{item}</button>)}</div>
            <label><Search size={16} aria-hidden="true" /><span className={styles.srOnly}>Search projects</span><input type="search" placeholder="Find a project or industry" value={query} onChange={event => setQuery(event.target.value)} /></label>
          </div>}
          <span id="client-case-studies" /><span id="website-portfolio" /><span id="archive" />
          <div className={styles.collection} id="portfolio-projects">
            {prints.map(({ item, frame }, order) => <article key={item.id}
              className={styles.card} data-category={item.category}
              data-print={frame ? (frame.current ? 'current' : 'preview') : undefined}
              inert={frame ? !frame.current : undefined}
              style={frame ? { transform: frame.transform, opacity: frame.opacity, zIndex: frame.zIndex, '--image-strength': frame.artworkOpacity } as CSSProperties : undefined}
              aria-label={`${item.title}, ${item.industry}`}>
              <div className={styles.artwork}>
                <Image {...item.image} alt={item.image.alt} loading={animated || order < 3 ? 'eager' : 'lazy'} sizes="(max-width: 899px) 90vw, 38vw" />
              </div>
              {frame?.current && <ThumbnailDetails item={item}><ProjectCaption item={item} onPreview={openPreview} /></ThumbnailDetails>}
              {!frame && <ProjectCaption item={item} onPreview={openPreview} />}
              {(!frame || frame.current) && <p className={styles.srOnly}>{item.description}</p>}
            </article>)}
          </div>
          {!animated && !filtered.length && <p className={styles.empty}>No projects match. Try another industry or project name.</p>}
          <div className={styles.bottomBar}>
            {animated ? <>
              <div className={styles.scrollHint}><ArrowDown size={16} aria-hidden="true" /><span>Scroll to explore</span><span className={styles.pointerHint}>Hover for details</span><span className={styles.touchHint}>Tap image for details</span></div>
              <div className={styles.controls}>
                <button type="button" aria-label="Previous project" onClick={() => goTo(active - 1)} disabled={active === 0}><ArrowLeft size={18} /></button>
                <span aria-live="polite" aria-atomic="true">{String(active + 1).padStart(2, '0')} <span>/ {String(work.length).padStart(2, '0')}</span></span>
                <button type="button" aria-label="Next project" onClick={() => goTo(active + 1)} disabled={active >= work.length - 1}><ArrowRight size={18} /></button>
              </div>
            </> : <div className={styles.archiveLinks}><span>{filtered.length} projects</span><Link href="/case-studies/">All case studies</Link><Link href="/our-services/">Our services</Link></div>}
            <Link href="/contact/" className={styles.enquiry}>Discuss your project <ArrowUpRight size={16} aria-hidden="true" /></Link>
          </div>
          {animated && <div className={styles.progress} aria-hidden="true"><span /></div>}
        </div>
      </section>
      <dialog ref={dialog} className={styles.preview} onClose={() => { setPreview(null); previewOpener.current?.focus(); }} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }} aria-label={preview ? `${preview.title} project preview` : 'Project preview'}>
        <button type="button" autoFocus onClick={() => dialog.current?.close()} aria-label="Close project preview"><X size={24} /></button>
        {preview && <><h2>{preview.title}</h2><Image {...preview.image} alt={preview.image.alt} sizes="90vw" /><p>{preview.description}</p></>}
      </dialog>
    </main>
  );
}
