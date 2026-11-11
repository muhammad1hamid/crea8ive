"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useTransform, type MotionValue, type PanInfo } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import styles from "./carousel-07.module.css";

export type FanSlide = {
  id: string;
  title: string;
  badge: string;
  image: { src: string; alt: string; width: number; height: number };
  content: ReactNode;
};

type FanConfig = { width: number; shift: number; drop: number; rotate: number; distance: number };
const wrap = (value: number, total: number) => ((value % total) + total) % total;
function configFor(width: number): FanConfig {
  if (width < 700) { const card = Math.min(300, width * .8); return { width: card, shift: card * .72, drop: 22, rotate: 11, distance: 130 }; }
  if (width < 1100) return { width: 340, shift: 240, drop: 32, rotate: 12, distance: 170 };
  return { width: 400, shift: 290, drop: 40, rotate: 12, distance: 200 };
}

function FanCard({ slide, index, total, progress, config, active, enhanced, choose }: {
  slide: FanSlide; index: number; total: number; progress: MotionValue<number>; config: FanConfig;
  active: boolean; enhanced: boolean; choose: (returnFocus?: boolean) => void;
}) {
  const { src, alt, width, height } = slide.image;
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  function cancelHover() {
    if (hoverTimer.current === null) return;
    clearTimeout(hoverTimer.current);
    hoverTimer.current = null;
  }
  useEffect(() => () => {
    if (hoverTimer.current !== null) clearTimeout(hoverTimer.current);
  }, []);

  const offset = useTransform(progress, value => {
    let difference = (index - value) % total;
    if (difference > total / 2) difference -= total;
    if (difference < -total / 2) difference += total;
    return difference;
  });
  const x = useTransform(offset, value => value * config.shift);
  const y = useTransform(offset, value => Math.abs(value) * config.drop);
  const rotate = useTransform(offset, value => value * config.rotate);
  const scale = useTransform(offset, value => 1 - Math.abs(value) * .085);
  const zIndex = useTransform(offset, value => Math.round(20 - Math.abs(value) * 10));

  return <motion.article className={styles.card} data-fan-project={slide.id} data-active={active} aria-labelledby={`fan-title-${slide.id}`} style={{ x, y, rotate, scale, zIndex }}>
    <div className={styles.media}>
      <Image src={src} alt={alt} width={width} height={height} sizes="(max-width: 699px) 80vw, (max-width: 1099px) 340px, 400px" loading="lazy" />
    </div>
    <div className={styles.caption}>
      <span className={styles.badge}>{slide.badge}</span>
      <h3 id={`fan-title-${slide.id}`}>{slide.title}</h3>
      <span className={styles.index} aria-hidden="true">{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
    </div>
    {enhanced && !active && <button className={styles.select} aria-label={`Show ${slide.title} project`} type="button"
      onPointerMove={event => {
        if (event.pointerType !== "mouse" || event.buttons !== 0 || hoverTimer.current !== null) return;
        const button = event.currentTarget;
        // Pointer movement, rather than entry caused by a moving card, starts selection.
        hoverTimer.current = setTimeout(() => {
          hoverTimer.current = null;
          if (button.isConnected && button.matches(":hover")) choose();
        }, 110);
      }}
      onPointerLeave={cancelHover}
      onPointerDown={cancelHover}
      onClick={event => choose(event.currentTarget.matches(":focus-visible"))} />}
  </motion.article>;
}

/** Reference-based fan carousel: real project screens, native controls and horizontal touch gestures. */
export default function CarouselStacked({ slides }: { slides: FanSlide[] }) {
  const stage = useRef<HTMLDivElement>(null);
  const animation = useRef<{ stop: () => void } | null>(null);
  const start = useRef(0);
  const target = useRef(0);
  const dragging = useRef(false);
  const progress = useMotionValue(0);
  const reduced = useReducedMotion();
  const [width, setWidth] = useState(1200);
  const [enhanced, setEnhanced] = useState(false);
  const [active, setActive] = useState(0);
  const config = configFor(width);

  useEffect(() => {
    const element = stage.current;
    if (!element) return;
    const resize = new ResizeObserver(() => setWidth(element.clientWidth));
    resize.observe(element);
    setWidth(element.clientWidth);
    setEnhanced(true);
    return () => { resize.disconnect(); animation.current?.stop(); };
  }, []);

  useEffect(() => {
    if (reduced) { animation.current?.stop(); progress.set(target.current); }
  }, [reduced, progress]);

  function select(next: number) {
    animation.current?.stop();
    target.current = next;
    setActive(wrap(next, slides.length));
    if (reduced) progress.set(next);
    else animation.current = animate(progress, next, { type: "spring", stiffness: 210, damping: 32, mass: .9 });
  }
  function panEnd(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    if (!dragging.current) return;
    const shift = Math.max(-1, Math.min(1, Math.round(-info.offset.x / config.distance - info.velocity.x / 1600)));
    select(Math.round(start.current) + shift);
    requestAnimationFrame(() => { dragging.current = false; });
  }

  if (!slides.length) return null;
  return <div className={styles.carousel}>
    <motion.div ref={stage} className={styles.stage} role="region" aria-roledescription="carousel" aria-label="Featured client projects"
      data-enhanced={enhanced} tabIndex={enhanced ? 0 : -1}
      style={{ "--fan-card-width": `${config.width}px` } as CSSProperties}
      onKeyDown={event => {
        if (event.target !== event.currentTarget) return;
        const value = Math.round(progress.get());
        if (event.key === "ArrowRight") { event.preventDefault(); select(value + 1); }
        if (event.key === "ArrowLeft") { event.preventDefault(); select(value - 1); }
        if (event.key === "Home") { event.preventDefault(); select(value - wrap(value, slides.length)); }
        if (event.key === "End") { event.preventDefault(); select(value - wrap(value, slides.length) + slides.length - 1); }
      }}
      onPanStart={() => { animation.current?.stop(); start.current = progress.get(); dragging.current = false; }}
      onPan={(_, info) => {
        if (!dragging.current && (Math.abs(info.offset.x) < 8 || Math.abs(info.offset.x) < Math.abs(info.offset.y))) return;
        dragging.current = true;
        progress.set(start.current - info.offset.x / config.distance);
      }}
      onPanEnd={panEnd}
      onClickCapture={event => { if (dragging.current) { event.preventDefault(); event.stopPropagation(); } }}>
      {slides.map((slide, index) => <FanCard key={slide.id} slide={slide} index={index} total={slides.length} progress={progress} config={config}
        active={active === index} enhanced={enhanced} choose={returnFocus => {
          const current = target.current;
          if (dragging.current || wrap(current, slides.length) === index) return;
          const delta = wrap(index - wrap(current, slides.length) + Math.floor(slides.length / 2), slides.length) - Math.floor(slides.length / 2);
          select(current + delta);
          if (returnFocus) requestAnimationFrame(() => stage.current?.focus({ preventScroll: true }));
        }} />)}
    </motion.div>
    <div className={styles.controls} hidden={!enhanced}>
      <button type="button" onClick={() => select(Math.round(progress.get()) - 1)} aria-label="Previous client project"><ArrowLeft size={20} aria-hidden="true" /></button>
      <div className={styles.dots} aria-label="Choose a client project">
        {slides.map((slide, index) => <button type="button" key={slide.id} aria-label={`Show ${slide.title}`} aria-current={index === active ? "true" : undefined}
          onClick={() => select(Math.round(progress.get()) - wrap(Math.round(progress.get()), slides.length) + index)}><span /></button>)}
      </div>
      <button type="button" onClick={() => select(Math.round(progress.get()) + 1)} aria-label="Next client project"><ArrowRight size={20} aria-hidden="true" /></button>
      <span className={styles.srOnly} role="status" aria-live="polite" aria-atomic="true">{slides[active].title}, project {active + 1} of {slides.length}</span>
    </div>
    <div className={styles.details}>
      {slides.map((slide, index) => <div key={slide.id} id={`case-story-${slide.id}`} data-case-story={slide.id} data-current={active === index}
        hidden={enhanced && active !== index} role="group" aria-labelledby={`fan-title-${slide.id}`}>{slide.content}</div>)}
    </div>
  </div>;
}
