"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useId, useRef, useState, type RefObject } from "react";
import { motion, useInView, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import styles from "./perspective-tunnel-hero.module.css";

export type TunnelProject = {
  id: string;
  name: string;
  category: string;
  href: string;
  image: string;
  alt: string;
  kind: "website" | "creative";
};

type Stage = { width: number; height: number; compact: boolean; ready: boolean };
const cameraSpring = { stiffness: 60, damping: 25, mass: .5 };

function useCameraParallax(element: RefObject<HTMLDivElement | null>, enabled: boolean) {
  const rawX = useMotionValue(0), rawY = useMotionValue(0);
  const x = useSpring(rawX, cameraSpring), y = useSpring(rawY, cameraSpring);
  useEffect(() => {
    const node = element.current;
    if (!node || !enabled || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const move = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      rawX.set((event.clientX - rect.left) / rect.width * 2 - 1);
      rawY.set((event.clientY - rect.top) / rect.height * 2 - 1);
    };
    const reset = () => { rawX.set(0); rawY.set(0); };
    node.addEventListener("pointermove", move, { passive: true });
    node.addEventListener("pointerleave", reset);
    return () => { node.removeEventListener("pointermove", move); node.removeEventListener("pointerleave", reset); reset(); };
  }, [element, enabled, rawX, rawY]);
  return { x, y };
}

function TunnelCard({ project, index, total, stage, progress, pointer }: {
  project: TunnelProject; index: number; total: number; stage: Stage;
  progress: MotionValue<number>; pointer: { x: MotionValue<number>; y: MotionValue<number> };
}) {
  // Each project reaches the camera at its numbered scroll stop. The next
  // projects recede behind it; passed projects leave the camera naturally.
  const local = useTransform(progress, value => value * (total - 1) - index);
  const z = useTransform(local, [-3, 0, 1.2], [-1600, 0, 950]);
  const opacity = useTransform(local, [-3, -2, -1, 0, .65, 1.2], [0, .15, .65, 1, 1, 0]);
  const pointerEvents = useTransform(local, value => value > -1.5 && value < .9 ? "auto" as const : "none" as const);
  const depthOrder = useTransform(local, value => Math.round((value + total) * 100));
  const angle = index * 137.5 * Math.PI / 180;
  const baseX = Math.cos(angle) * stage.width * (.16 + index % 3 * .025);
  const baseY = Math.sin(angle) * stage.height * (.16 + index % 2 * .025);
  const rotation = (index % 2 ? -1 : 1) * (3 + index % 4);
  const transform = useTransform([z, pointer.x, pointer.y], ([depth, px, py]: number[]) =>
    `translate3d(calc(-50% + ${baseX - px * 20}px), calc(-50% + ${baseY - py * 16}px), ${depth}px) rotateZ(${rotation}deg)`);
  return <motion.a href={project.href} tabIndex={-1} className={styles.tunnelCard} data-tunnel-project={project.id}
    style={{ transform, opacity, pointerEvents, zIndex: depthOrder, width: Math.min(380, Math.max(250, stage.width * .53)) }}>
    <div className={styles.projectImage} data-kind={project.kind}>
      <Image src={project.image} alt="" fill sizes="600px" loading={index < 2 ? "eager" : "lazy"} draggable={false} />
    </div>
    <div className={styles.cardCaption}><span>{project.category}</span><strong>{project.name}</strong><ArrowUpRight size={18} aria-hidden="true" /></div>
  </motion.a>;
}

/** Native scroll-snap is also the no-JS, mobile and reduced-motion fallback. */
function ProjectRail({ projects }: { projects: readonly TunnelProject[] }) {
  const rail = useRef<HTMLDivElement>(null);
  const id = useId();
  const [active, setActive] = useState(0);
  useEffect(() => {
    const node = rail.current;
    if (!node) return;
    let frame = 0;
    const sync = () => {
      frame = 0;
      const first = (node.children[0] as HTMLElement).offsetLeft;
      let next = 0, distance = Infinity;
      Array.from(node.children).forEach((card, index) => {
        const candidate = Math.abs((card as HTMLElement).offsetLeft - first - node.scrollLeft);
        if (candidate < distance) { distance = candidate; next = index; }
      });
      setActive(previous => previous === next ? previous : next);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(sync); };
    node.addEventListener("scroll", schedule, { passive: true });
    const observer = new ResizeObserver(schedule); observer.observe(node);
    return () => { node.removeEventListener("scroll", schedule); observer.disconnect(); cancelAnimationFrame(frame); };
  }, []);
  function navigate(index: number) {
    const node = rail.current, card = node?.children[Math.max(0, Math.min(projects.length - 1, index))] as HTMLElement | undefined;
    if (!node || !card) return;
    node.scrollTo({ left: card.offsetLeft - (node.children[0] as HTMLElement).offsetLeft,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }
  return <div className={styles.railExperience}>
    <div ref={rail} id={id} className={styles.rail} tabIndex={0} role="region" aria-label="Selected portfolio projects" aria-roledescription="carousel"
      onKeyDown={event => {
        if (event.key === "ArrowRight") { event.preventDefault(); navigate(active + 1); }
        if (event.key === "ArrowLeft") { event.preventDefault(); navigate(active - 1); }
        if (event.key === "Home") { event.preventDefault(); navigate(0); }
        if (event.key === "End") { event.preventDefault(); navigate(projects.length - 1); }
      }}>
      {projects.map((project, index) => <Link key={project.id} href={project.href} className={styles.railCard} prefetch={false}>
        <div className={styles.projectImage} data-kind={project.kind}><Image src={project.image} alt={project.alt} fill sizes="(max-width:767px) 86vw, 500px" loading={index < 2 ? "eager" : "lazy"} /></div>
        <div className={styles.cardCaption}><span>{project.category}</span><strong>{project.name}</strong><ArrowUpRight size={20} aria-hidden="true" /></div>
      </Link>)}
    </div>
    <div className={styles.railControls}>
      <span aria-live="polite" aria-atomic="true">{String(active + 1).padStart(2, "0")} <span>/ {String(projects.length).padStart(2, "0")}</span></span>
      <span className={styles.swipeHint}>Swipe to explore <ArrowRight size={14} aria-hidden="true" /></span>
      <button type="button" aria-label="Previous featured project" aria-controls={id} disabled={active === 0} onClick={() => navigate(active - 1)}><ArrowLeft size={18} aria-hidden="true" /></button>
      <button type="button" aria-label="Next featured project" aria-controls={id} disabled={active === projects.length - 1} onClick={() => navigate(active + 1)}><ArrowRight size={18} aria-hidden="true" /></button>
    </div>
  </div>;
}

export default function PerspectiveTunnelHero({ projects }: { projects: readonly TunnelProject[] }) {
  const root = useRef<HTMLElement>(null), visual = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const visible = useInView(root, { margin: "100px" });
  const [stage, setStage] = useState<Stage>({ width: 760, height: 650, compact: false, ready: false });
  const [active, setActive] = useState(0), activeRef = useRef(0);
  const { scrollYProgress } = useScroll({ target: root, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 30, restDelta: .0001 });
  const enhanced = stage.ready && !stage.compact && reduce === false;
  const pointer = useCameraParallax(visual, enhanced && visible);
  useEffect(() => {
    const node = visual.current;
    if (!node) return;
    const observer = new ResizeObserver(() => {
      const rect = node.getBoundingClientRect();
      const next = { width: rect.width || 760, height: rect.height || 650, compact: window.innerWidth < 768, ready: true };
      setStage(previous => previous.width === next.width && previous.height === next.height && previous.compact === next.compact && previous.ready ? previous : next);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  useMotionValueEvent(progress, "change", value => {
    if (!enhanced) return;
    const next = Math.min(projects.length - 1, Math.max(0, Math.round(value * (projects.length - 1))));
    if (next !== activeRef.current) { activeRef.current = next; setActive(next); }
  });
  function selectProject(index: number) {
    const node = root.current;
    if (!node) return;
    const travel = Math.max(0, node.offsetHeight - window.innerHeight);
    window.scrollTo({ top: node.getBoundingClientRect().top + window.scrollY + travel * index / Math.max(1, projects.length - 1), behavior: reduce ? "instant" : "smooth" });
  }
  if (!projects.length) return null;
  const current = projects[active];
  return <section ref={root} id="portfolio-perspective-hero" className={styles.hero} aria-labelledby="portfolio-tunnel-title" data-enhanced={enhanced} data-in-view={visible}>
    <div className={styles.sticky}>
      <div className={styles.copy}>
        <p className={styles.eyebrow}>Selected work</p>
        <h1 id="portfolio-tunnel-title">Our Work{" "}<br /><em>in Action.</em></h1>
        <p className={styles.description}>A curated collection of digital experiences, brand identities and creative campaigns that create real impact.</p>
        <Link href="/contact/" className={styles.cta}>Discuss Your Project <ArrowUpRight size={20} aria-hidden="true" /></Link>
        <div className={styles.disciplines} aria-label="Creative disciplines"><span>Digital experiences</span><span>Brand identities</span><span>Creative campaigns</span></div>
      </div>
      <div className={styles.showcase}>
        <div ref={visual} className={styles.visual}>
          <div className={styles.depthGuides} aria-hidden="true"><i /><i /><span /></div>
          <div className={styles.tunnel} aria-hidden="true">
            <div className={styles.camera}><div className={styles.space}>
              {enhanced && projects.map((project, index) => <TunnelCard key={project.id} project={project} index={index} total={projects.length} stage={stage} progress={progress} pointer={pointer} />)}
            </div></div>
          </div>
          <ProjectRail projects={projects} />
        </div>
        <div className={styles.projectNavigation}>
          <div className={styles.projectIndex} role="group" aria-label="Explore tunnel projects">
            {projects.map((project, index) => <button key={project.id} type="button" aria-label={`Show ${project.name}`} aria-current={index === active ? "true" : undefined} onClick={() => selectProject(index)}><span>{String(index + 1).padStart(2, "0")}</span></button>)}
          </div>
          <Link href={current.href} className={styles.currentProject} prefetch={false}>{current.name}<ArrowUpRight size={17} aria-hidden="true" /></Link>
          <span className={styles.srOnly} role="status" aria-live="polite">Featured project {active + 1} of {projects.length}: {current.name}</span>
        </div>
      </div>
      <a href="#client-case-studies" className={styles.scrollCue}><span className={styles.scrollLine} aria-hidden="true" /><span>Scroll to explore</span><ArrowDown size={15} aria-hidden="true" /></a>
      <span className={styles.cornerNote} aria-hidden="true">CREA8IV / SELECTED WORK</span>
    </div>
  </section>;
}
