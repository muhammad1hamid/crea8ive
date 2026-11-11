"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Globe2, Palette, Pause, Play, Search, Target, Workflow, X } from "lucide-react";
import { useEffect, useId, useLayoutEffect, useRef, useState, type CSSProperties, type Ref } from "react";
import ConnectedJourneyMotion from "../ConnectedJourneyMotion";
import styles from "./radial-orbital-timeline.module.css";

export type OrbitalService = {
  name: string;
  benefit: string;
  title: string;
  highlight: string;
  outcome: string;
  specialties: { label: string; href: string; iconSrc: string }[];
  iconSrc: string;
  href: string;
  label: string;
};

type RadialOrbitalTimelineProps = { intro: string; timelineData: OrbitalService[] };
type OrbitSelection =
  | { phase: "aligning" | "expanded"; index: number }
  | { phase: "closing"; index: number; nextIndex: number | null };

const ORBIT_DURATION = 60_000;
const ALIGN_DURATION = 650;
const CLOSE_DELAY = 210;

function transitionTo(current: OrbitSelection | null, nextIndex: number | null): OrbitSelection | null {
  if (current && current.phase !== "aligning") {
    return { phase: "closing", index: current.index, nextIndex };
  }
  return nextIndex === null ? null : { phase: "aligning", index: nextIndex };
}

function overlaps(card: DOMRect, popup: DOMRect) {
  const width = Math.min(card.right, popup.right) - Math.max(card.left, popup.left);
  const height = Math.min(card.bottom, popup.bottom) - Math.max(card.top, popup.top);
  return width > 4 && height > 4;
}

const serviceSymbols = {
  Automation: Workflow,
  Strategy: Target,
  "SEO & AI": Search,
  Websites: Globe2,
  Branding: Palette,
};

function ServiceIcon({ service, className = "" }: { service: OrbitalService; className?: string }) {
  const Icon = serviceSymbols[service.name as keyof typeof serviceSymbols];
  return (
    <span className={`${styles.simpleIcon} ${className}`} data-service-icon={service.name} aria-hidden="true">
      {service.name === "Paid Ads" ? <>
        <Image src="/img/platform-logos/google-ads.webp" alt="" width={28} height={28} />
        <Image src="/img/platform-logos/meta-ads.webp" alt="" width={28} height={28} />
      </> : Icon ? <Icon strokeWidth={2} /> : <Image src={service.iconSrc} alt="" width={36} height={36} />}
    </span>
  );
}

function ServiceDetail({ service, id, closeRef, dismiss, modal = false }: {
  modal?: boolean;
  service: OrbitalService;
  id: string;
  closeRef: Ref<HTMLButtonElement>;
  dismiss: () => void;
}) {
  return (
    <article className={styles.panel} data-orbit-service={service.name} role={modal ? undefined : "dialog"}
      aria-labelledby={id + "-detail-title"} aria-describedby={id + "-detail-description"}>
      <div className={styles.panelTop}>
        <span className={styles.serviceName}>
          <ServiceIcon service={service} className={styles.panelIcon} />
          {service.name}
        </span>
        <button ref={closeRef} type="button" className={styles.close} aria-label="Close service details" onClick={dismiss}>
          <X size={21} aria-hidden="true" />
        </button>
      </div>
      <h3 id={id + "-detail-title"}>{service.title}{" "}<span>{service.highlight}</span></h3>
      <p className={styles.description} id={id + "-detail-description"}>{service.outcome}</p>
      <ul className={styles.specialties} aria-label={`${service.name} related services`}>
        {service.specialties.map(specialty => (
          <li key={specialty.href}>
            <Link href={specialty.href} prefetch={false} className={styles.specialtyLink}>
              <Image src={specialty.iconSrc} alt="" width={28} height={28} loading="lazy" />
              <span>{specialty.label}</span>
            </Link>
          </li>
        ))}
      </ul>
      <Link href={service.href} prefetch={false} className={styles.serviceLink}>
        <span>{service.label}</span><ArrowRight size={19} aria-hidden="true" />
      </Link>
    </article>
  );
}

export default function RadialOrbitalTimeline({ intro, timelineData }: RadialOrbitalTimelineProps) {
  const id = useId();
  const stageRef = useRef<HTMLDivElement>(null);
  const revolveRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [compact, setCompact] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [selection, setSelection] = useState<OrbitSelection | null>(null);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [keyboardFocused, setKeyboardFocused] = useState(false);
  const [motionPaused, setMotionPaused] = useState(false);
  const phase = selection?.phase ?? "idle";
  const isEngaged = selection !== null;
  const isClosing = phase === "closing";
  const detailIndex = selection && selection.phase !== "aligning" ? selection.index : null;
  const detail = detailIndex === null ? null : timelineData[detailIndex];
  const orbitRunning = inView && pageVisible && !hovered && !keyboardFocused && !isEngaged && !motionPaused;

  useLayoutEffect(() => {
    const stage = stageRef.current;
    const revolve = revolveRef.current;
    if (!stage || !revolve) return;
    const update = () => setCompact(getComputedStyle(revolve).position !== "absolute");
    update();
    const observer = new ResizeObserver(update);
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!compact || !dialog) return;
    if (detailIndex !== null && !dialog.open) dialog.showModal();
    else if (detailIndex === null && dialog.open) {
      dialog.close();
      triggerRef.current?.focus({ preventScroll: true });
    }
  }, [compact, detailIndex]);

  useEffect(() => {
    if (!compact || detailIndex === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [compact, detailIndex]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new IntersectionObserver(entries => setInView(entries[0].isIntersecting), { threshold: .1 });
    observer.observe(stage);
    const onVisibilityChange = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  function dismiss() {
    setSelection(current => transitionTo(current, null));
    triggerRef.current?.focus();
  }

  function selectService(index: number, trigger: HTMLButtonElement) {
    triggerRef.current = trigger;
    setSelection(current => {
      const requestedIndex = current?.phase === "closing" ? current.nextIndex : current?.index;
      return transitionTo(current, requestedIndex === index ? null : index);
    });
  }

  useLayoutEffect(() => {
    const revolve = revolveRef.current;
    if (selection?.phase !== "aligning" || !revolve) return;
    const targetAngle = (360 - (360 / timelineData.length) * selection.index) % 360;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const clocks = [revolve, ...revolve.querySelectorAll("[data-orbit-face]")]
      .flatMap(element => element.getAnimations().filter(animation => animation.effect?.getTiming().iterations === Infinity));
    const clock = clocks[0];
    const targetTime = targetAngle / 360 * ORBIT_DURATION;
    let from = Number(clock?.currentTime ?? 0);
    const distance = (targetTime - from % ORBIT_DURATION + 1.5 * ORBIT_DURATION) % ORBIT_DURATION - ORBIT_DURATION / 2;
    // Keep every face on the same clock while seeking along the shorter arc.
    if (from + distance < 0) from += ORBIT_DURATION;
    revolve.style.setProperty("--orbit-rest-angle", `${targetAngle}deg`);
    const isCircular = getComputedStyle(revolve).position === "absolute";
    const started = performance.now();
    let frame = 0;
    const align = (now: number) => {
      const instant = reduced.matches || !isCircular || !clock || Math.abs(distance) < 1;
      const progress = instant ? 1 : Math.min(1, Math.max(0, (now - started) / ALIGN_DURATION));
      const eased = 1 - (1 - progress) ** 3;
      clocks.forEach(animation => { animation.currentTime = from + distance * eased; });
      if (progress < 1) {
        frame = requestAnimationFrame(align);
      } else {
        setSelection(current => current === selection ? { phase: "expanded", index: selection.index } : current);
      }
    };
    frame = requestAnimationFrame(align);
    return () => cancelAnimationFrame(frame);
  }, [selection, timelineData.length]);

  useEffect(() => {
    if (!isClosing) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const timer = window.setTimeout(() => {
      setSelection(current => current?.phase === "closing" ? transitionTo(null, current.nextIndex) : current);
    }, reduced.matches ? 0 : CLOSE_DELAY);
    return () => window.clearTimeout(timer);
  }, [isClosing]);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    const panels = panelsRef.current;
    if (!stage || !panels || detailIndex === null) return;
    const cards = Array.from(stage.querySelectorAll<HTMLButtonElement>("[data-orbit-node]"));
    const updateDepth = () => {
      const popup = panels.getBoundingClientRect();
      const behind = cards.map((card, index) => index !== detailIndex && overlaps(card.getBoundingClientRect(), popup));
      cards.forEach((card, index) => card.toggleAttribute("data-orbit-occluded", behind[index]));
    };
    updateDepth();
    const resize = new ResizeObserver(updateDepth);
    resize.observe(stage);
    resize.observe(panels);
    return () => {
      resize.disconnect();
      cards.forEach(card => card.removeAttribute("data-orbit-occluded"));
    };
  }, [detailIndex]);

  useEffect(() => {
    const close = closeRef.current;
    const panels = panelsRef.current;
    if (phase !== "expanded" || !close || !panels) return;
    if (document.activeElement === triggerRef.current || document.activeElement === document.body) {
      close.focus({ preventScroll: true });
    }
  }, [phase, detailIndex]);

  useEffect(() => {
    if (!isEngaged) return;
    function outside(event: PointerEvent) {
      if (!(event.target instanceof Element)) return;
      if (panelsRef.current?.contains(event.target)) return;
      if (stageRef.current?.contains(event.target) && event.target.closest("[data-orbit-node]")) return;
      setSelection(current => transitionTo(current, null));
    }
    function escape(event: KeyboardEvent) {
      if (event.key !== "Escape" || event.defaultPrevented) return;
      setSelection(current => transitionTo(current, null));
      triggerRef.current?.focus();
    }
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [isEngaged]);

  return (
    <ConnectedJourneyMotion className={styles.layout}>
      <div className={styles.copy} data-journey-heading>
        <div className={styles.copyText}>
          <p className={styles.eyebrow}>Start with the problem</p>
          <h2 id="home-core-services-title">What’s blocking your <em>next customer?</em></h2>
          <p className={styles.intro}>{intro}</p>
          <p className={styles.hint}>Select a service to see how it helps.</p>
        </div>
        <Link href="/our-services/" prefetch={false} className={styles.cta}>
          EXPLORE ALL SERVICES <ArrowUpRight size={20} aria-hidden="true" />
        </Link>
      </div>
      <div className={styles.visual} data-journey-card data-orbit-phase={phase}
        onPointerEnter={event => { if (event.pointerType === "mouse") setHovered(true); }}
        onPointerLeave={() => setHovered(false)}
        onFocusCapture={event => { if (event.target.matches(":focus-visible")) setKeyboardFocused(true); }}
        onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setKeyboardFocused(false); }}>
        <div ref={stageRef} className={styles.stage} role="group" aria-label="Explore services" data-orbit-running={orbitRunning}>
          <div className={styles.ring} aria-hidden="true" />
          <div className={styles.mascotScene}>
            <Image className={styles.mascot} src="/assets/crea8iv-media-vector-hero-840.webp"
              width={840} height={1260} sizes="(max-width: 767px) 104px, 190px" loading="lazy" alt="Crea8iv Media robot mascot" />
            <div className={styles.plinth} aria-hidden="true" />
          </div>
          <div ref={revolveRef} className={styles.nodesOrbit}>
            {timelineData.map((service, index) => {
              const angle = (-90 + (360 / timelineData.length) * index) * Math.PI / 180;
              const selected = detailIndex === index;
              const pending = phase === "aligning" && selection?.index === index;
              const labelId = id + "-label-" + index;
              const benefitId = id + "-benefit-" + index;
              return (
                <div key={service.href} className={styles.node} data-selected={selected}
                  style={{ "--node-x": Math.cos(angle).toFixed(6), "--node-y": Math.sin(angle).toFixed(6) } as CSSProperties}>
                  <div className={styles.nodeFace} data-orbit-face>
                    <button className={styles.nodeButton} type="button" data-orbit-node={service.name} data-pending={pending}
                      aria-labelledby={labelId} aria-describedby={benefitId} aria-expanded={selected && !isClosing} aria-haspopup="dialog"
                      aria-controls={id + "-details"} onClick={event => selectService(index, event.currentTarget)}>
                      <ServiceIcon service={service} className={styles.nodeIcon} />
                      <span className={styles.nodeCopy}>
                        <span id={labelId} className={styles.nodeLabel}>{service.name}</span>
                        <span id={benefitId} className={styles.nodeBenefit}>{service.benefit}</span>
                      </span>
                      <span className={styles.nodeArrow} aria-hidden="true"><ArrowRight size={15} /></span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <button className={styles.motionToggle} type="button"
            aria-label={motionPaused ? "Resume service orbit" : "Pause service orbit"}
            onClick={() => setMotionPaused(paused => !paused)}>
            {motionPaused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}
          </button>
        </div>
        {compact ? (
          <dialog ref={dialogRef} className={styles.modal} data-orbit-phase={phase} data-lenis-prevent
            aria-labelledby={id + "-detail-title"} aria-describedby={id + "-detail-description"}
            onCancel={event => { event.preventDefault(); dismiss(); }}
            onClick={event => { if (event.target === event.currentTarget) dismiss(); }}>
            <div ref={panelsRef} className={styles.panels} id={id + "-details"} inert={isClosing}>
              {detail && <ServiceDetail modal key={detail.href} service={detail} id={id} closeRef={closeRef} dismiss={dismiss} />}
            </div>
          </dialog>
        ) : (
          <div ref={panelsRef} className={styles.panels} id={id + "-details"} hidden={!detail} inert={isClosing}>
            {detail && <ServiceDetail key={detail.href} service={detail} id={id} closeRef={closeRef} dismiss={dismiss} />}
          </div>
        )}
      </div>
    </ConnectedJourneyMotion>
  );
}
