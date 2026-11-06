"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import ConnectedJourneyMotion from "../ConnectedJourneyMotion";
import styles from "./radial-orbital-timeline.module.css";

type OrbitalService = {
  name: string;
  title: string;
  outcome: string;
  specialties: string[];
  iconSrc: string;
  href: string;
  label: string;
  tone: string;
  primary?: boolean;
};

type RadialOrbitalTimelineProps = { intro: string; timelineData: OrbitalService[] };
const ORBIT_DURATION = 60_000;

export default function RadialOrbitalTimeline({ intro, timelineData }: RadialOrbitalTimelineProps) {
  const id = useId();
  const orbitRef = useRef<HTMLDivElement>(null);
  const revolveRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [keyboardFocused, setKeyboardFocused] = useState(false);
  const isOpen = activeIndex !== null;
  const orbitRunning = inView && pageVisible && !hovered && !keyboardFocused && !isOpen;

  useEffect(() => {
    const orbit = orbitRef.current;
    if (!orbit) return;
    const observer = new IntersectionObserver(entries => setInView(entries[0].isIntersecting), { threshold: .1 });
    observer.observe(orbit);
    const resize = new ResizeObserver(() => orbit.style.setProperty("--orbit-size", `${orbit.clientWidth}px`));
    resize.observe(orbit);
    orbit.style.setProperty("--orbit-size", `${orbit.clientWidth}px`);
    const onVisibilityChange = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      observer.disconnect();
      resize.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  function dismiss(returnFocus = true) {
    setActiveIndex(null);
    if (returnFocus) triggerRef.current?.focus({ preventScroll: true });
  }

  function selectService(index: number, trigger: HTMLButtonElement) {
    triggerRef.current = trigger;
    setActiveIndex(current => current === index ? null : index);
  }

  useEffect(() => {
    const revolve = revolveRef.current;
    if (activeIndex === null || !revolve) return;
    // Seek the existing orbit and its counter-rotating faces together. This puts
    // the selected service above the in-orbit card without restarting the loop.
    const targetAngle = ((30 - (360 / timelineData.length) * activeIndex) % 360 + 360) % 360;
    revolve.style.setProperty("--orbit-rest-angle", `${targetAngle}deg`);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const orbitAnimation = revolve.getAnimations().find(animation => animation.effect?.getTiming().iterations === Infinity);
    if (reduced.matches || !orbitAnimation) return;
    const clocks = [orbitAnimation, ...Array.from(revolve.querySelectorAll("[data-orbit-face]")).flatMap(face => face.getAnimations().filter(animation => animation.effect?.getTiming().iterations === Infinity))];
    let from = Number(orbitAnimation.currentTime ?? 0);
    let to = Math.floor(from / ORBIT_DURATION) * ORBIT_DURATION + targetAngle / 360 * ORBIT_DURATION;
    if (to - from > ORBIT_DURATION / 2) to -= ORBIT_DURATION;
    if (from - to > ORBIT_DURATION / 2) to += ORBIT_DURATION;
    if (to < 0) { from += ORBIT_DURATION; to += ORBIT_DURATION; }
    const started = performance.now();
    let frame = 0;
    const align = (now: number) => {
      const progress = reduced.matches ? 1 : Math.min(1, (now - started) / 550);
      const eased = 1 - (1 - progress) ** 3;
      clocks.forEach(clock => { clock.currentTime = from + (to - from) * eased; });
      if (progress < 1) frame = requestAnimationFrame(align);
    };
    frame = requestAnimationFrame(align);
    return () => cancelAnimationFrame(frame);
  }, [activeIndex, timelineData.length]);

  useEffect(() => {
    if (isOpen) closeRef.current?.focus({ preventScroll: true });
  }, [isOpen, activeIndex]);

  useEffect(() => {
    if (!isOpen) return;
    function outside(event: PointerEvent) {
      if (!(event.target instanceof Element)) return;
      if (panelsRef.current?.contains(event.target)) return;
      if (orbitRef.current?.contains(event.target) && event.target.closest("[data-orbit-node]")) return;
      setActiveIndex(null);
      setKeyboardFocused(false);
    }
    function escape(event: KeyboardEvent) {
      if (event.key !== "Escape" || event.defaultPrevented) return;
      setActiveIndex(null);
      triggerRef.current?.focus({ preventScroll: true });
    }
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [isOpen]);

  return (
    <ConnectedJourneyMotion className={styles.layout}>
      <div className={styles.copy} data-journey-heading>
        <p className={styles.eyebrow}>Start with the problem</p>
        <h2 id="home-core-services-title">What’s standing between you and your <em>next customer?</em></h2>
        <p className={styles.intro}>{intro}</p>
        <p className={styles.hint}>Select a service to see how it helps.</p>
        <Link href="/our-services/" prefetch={false} className={styles.cta}>
          EXPLORE ALL SERVICES <ArrowUpRight size={20} aria-hidden="true" />
        </Link>
      </div>
      <div className={styles.visual} data-journey-card>
        <div ref={orbitRef} className={styles.stage} role="group" aria-label="Explore services" data-orbit-running={orbitRunning} data-orbit-open={isOpen}
          onPointerEnter={event => { if (event.pointerType === "mouse") setHovered(true); }}
          onPointerLeave={() => setHovered(false)}
          onFocusCapture={event => { if (event.target.matches(":focus-visible")) setKeyboardFocused(true); }}
          onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setKeyboardFocused(false); }}>
          <div className={styles.ring} aria-hidden="true" />
          <Image className={styles.mascot} src="/assets/crea8iv-media-vector-hero-840.webp"
            width={420} height={630} sizes="(max-width: 420px) 125px, 210px" loading="lazy" alt="Crea8iv Media robot mascot" />
          <div ref={revolveRef} className={styles.nodesOrbit}>
            {timelineData.map((service, index) => {
              const angle = (-120 + (360 / timelineData.length) * index) * Math.PI / 180;
              const x = 50 + 40 * Math.cos(angle);
              const y = 50 + 40 * Math.sin(angle);
              const active = index === activeIndex;
              return (
                <div key={service.href} className={styles.node} data-selected={active} data-service-tone={service.tone}
                  style={{ "--node-x": x.toFixed(4) + "%", "--node-y": y.toFixed(4) + "%" } as CSSProperties}>
                  <div className={styles.nodeFace} data-orbit-face>
                    <button className={styles.nodeButton} type="button" data-orbit-node={service.name}
                      aria-label={"Explore " + service.name + " services"} aria-expanded={active} aria-haspopup="dialog"
                      aria-controls={id + "-service-" + index} onClick={event => selectService(index, event.currentTarget)}>
                      <Image className={styles.nodeIcon} src={service.iconSrc} alt="" width={512} height={512} sizes="(max-width: 420px) 56px, (max-width: 767px) 66px, (max-width: 1279px) 76px, 84px" loading="lazy" />
                      <span className={styles.nodeLabel}>{service.name}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div ref={panelsRef} className={styles.panels} hidden={!isOpen}>
            <span className={styles.panelPointer} aria-hidden="true" />
            {timelineData.map((service, index) => (
              <article id={id + "-service-" + index} key={service.href} className={styles.panel}
                data-orbit-service={service.name} hidden={activeIndex !== index} role="dialog" aria-labelledby={id + "-title-" + index}>
                <div className={styles.panelTop}>
                  <span className={styles.serviceName}>{service.name}</span>
                  <button ref={activeIndex === index ? closeRef : undefined} type="button" className={styles.close}
                    aria-label="Close service details" onClick={() => dismiss()}><X size={20} aria-hidden="true" /></button>
                </div>
                <div className={styles.panelBody} tabIndex={0} role="region" aria-label={`${service.name} details and related services`}>
                  <h3 id={id + "-title-" + index}>{service.title}</h3>
                  <p>{service.outcome}</p>
                  <div className={styles.panelAccent} aria-hidden="true"><span /></div>
                  <ul className={styles.specialties} aria-label="Related services">
                    {service.specialties.map(specialty => <li key={specialty}>{specialty}</li>)}
                  </ul>
                </div>
                <Link href={service.href} prefetch={false} className={styles.serviceLink} data-primary-service={service.primary || undefined}>
                  <span>{service.label}</span> <ArrowUpRight size={17} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </ConnectedJourneyMotion>
  );
}
