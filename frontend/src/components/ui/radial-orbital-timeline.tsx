"use client";

import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
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
type Point = { left: number; top: number };
type PanelPosition = Point & { pointerSide?: "left" | "right" | "top" | "bottom"; pointerOffset?: number; mobileMaxHeight?: number; viewportMaxHeight?: number };
const nodePositions = [[23.84, 23.84], [76.16, 23.84], [87, 50], [76.16, 76.16], [23.84, 76.16], [13, 50]];

function overlap(a: { left: number; top: number; width: number; height: number }, b: DOMRect) {
  return Math.max(0, Math.min(a.left + a.width, b.right) - Math.max(a.left, b.left))
    * Math.max(0, Math.min(a.top + a.height, b.bottom) - Math.max(a.top, b.top));
}

export default function RadialOrbitalTimeline({ intro, timelineData }: RadialOrbitalTimelineProps) {
  const id = useId();
  const orbitRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const mascotRef = useRef<HTMLImageElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [panelPosition, setPanelPosition] = useState<PanelPosition | null>(null);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [keyboardFocused, setKeyboardFocused] = useState(false);
  const isOpen = activeIndex !== null;
  const positioned = panelPosition !== null;
  const orbitRunning = inView && pageVisible && !hovered && !keyboardFocused && !isOpen;

  useEffect(() => {
    const orbit = orbitRef.current;
    if (!orbit) return;
    const observer = new IntersectionObserver(entries => setInView(entries[0].isIntersecting), { threshold: .1 });
    observer.observe(orbit);
    const onVisibilityChange = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  function dismiss(returnFocus = true) {
    setActiveIndex(null);
    setPanelPosition(null);
    if (returnFocus) triggerRef.current?.focus({ preventScroll: true });
  }

  function selectService(index: number, trigger: HTMLButtonElement) {
    triggerRef.current = trigger;
    setPanelPosition(null);
    setActiveIndex(current => current === index ? null : index);
  }

  useEffect(() => {
    if (!isOpen) return;
    let frame = 0;
    function positionPanel() {
      const node = triggerRef.current;
      const layer = panelsRef.current;
      const orbit = orbitRef.current;
      if (!node || !layer || !orbit) return;
      if (window.innerWidth < 768) {
        const nodes = Array.from(orbit.querySelectorAll<HTMLButtonElement>("[data-orbit-node]"));
        const top = Math.min(...nodes.map(button => button.getBoundingClientRect().top));
        const bottom = Math.max(...nodes.map(button => button.querySelector("span")?.getBoundingClientRect().bottom ?? button.getBoundingClientRect().bottom));
        const headerBottom = document.querySelector("header")?.getBoundingClientRect().bottom ?? 84;
        const available = window.innerHeight - 96 - headerBottom - 24 - (bottom - top);
        setPanelPosition({ left: 16, top: 0, mobileMaxHeight: Math.max(180, Math.min(window.innerHeight * .46, available)) });
        return;
      }
      const n = node.getBoundingClientRect();
      const bounds = orbit.getBoundingClientRect();
      const robot = mascotRef.current?.getBoundingClientRect();
      const copy = copyRef.current?.getBoundingClientRect();
      const otherNodes = Array.from(orbit.querySelectorAll<HTMLButtonElement>("[data-orbit-node]"))
        .filter(button => button !== node).map(button => button.getBoundingClientRect());
      const minY = Math.max(16, Math.min(120, (document.querySelector("header")?.getBoundingClientRect().bottom ?? 84) + 12));
      const contactBar = document.querySelector<HTMLElement>("[data-quick-contact]");
      const contactBounds = contactBar?.getBoundingClientRect();
      const contactStyle = contactBar ? getComputedStyle(contactBar) : null;
      const bottomClearance = contactBounds && contactStyle?.display !== "none" && contactStyle?.visibility !== "hidden" && contactBounds.top < window.innerHeight
        ? window.innerHeight - contactBounds.top + 16 : 16;
      const viewportMaxHeight = Math.max(180, window.innerHeight - minY - bottomClearance - 2);
      const activePanel = layer.querySelector<HTMLElement>("[data-orbit-service]:not([hidden])");
      const width = layer.offsetWidth;
      const height = Math.min(activePanel?.scrollHeight ?? layer.offsetHeight, viewportMaxHeight) + 2;
      const maxX = Math.max(16, window.innerWidth - width - 16);
      const minX = 16;
      const maxY = Math.max(minY, window.innerHeight - height - bottomClearance);
      const cx = n.left + n.width / 2;
      const cy = n.top + n.height / 2;
      const candidates = [
        { left: n.right + 14, top: cy - height / 2 },
        { left: n.left - width - 14, top: cy - height / 2 },
        { left: cx - width / 2, top: n.top - height - 14 },
        { left: cx - width / 2, top: n.bottom + 14 },
        { left: bounds.right - width, top: bounds.bottom + 12 },
        { left: bounds.left, top: bounds.bottom + 12 },
        { left: bounds.right - width, top: cy - height / 2 },
        ...(copy ? [{ left: copy.right - width, top: copy.bottom + 18 }] : []),
      ].map(point => ({ left: Math.max(minX, Math.min(maxX, point.left)), top: Math.max(minY, Math.min(maxY, point.top)) }));
      const score = (point: Point) => {
        const rect = { ...point, width, height };
        return (robot ? overlap(rect, robot) * 10 : 0)
          + (copy ? overlap(rect, copy) * 100 : 0)
          + otherNodes.reduce((sum, other) => sum + overlap(rect, other) * 2, 0)
          + (Math.abs(point.left + width / 2 - cx) + Math.abs(point.top + height / 2 - cy)) * .08;
      };
      candidates.sort((a, b) => score(a) - score(b));
      const best: PanelPosition = candidates[0];
      best.viewportMaxHeight = viewportMaxHeight;
      if (n.right <= best.left + 5) best.pointerSide = "left";
      else if (n.left >= best.left + width - 5) best.pointerSide = "right";
      else if (n.bottom <= best.top + 5) best.pointerSide = "top";
      else if (n.top >= best.top + height - 5) best.pointerSide = "bottom";
      if (best.pointerSide) {
        const horizontal = best.pointerSide === "top" || best.pointerSide === "bottom";
        best.pointerOffset = Math.max(38, Math.min((horizontal ? width : height) - 38, horizontal ? cx - best.left : cy - best.top));
      }
      setPanelPosition(best);
    }
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(positionPanel); };
    schedule();
    window.addEventListener("resize", schedule);
    window.addEventListener("scroll", schedule, { passive: true, capture: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("scroll", schedule, true);
    };
  }, [isOpen, activeIndex]);

  useEffect(() => {
    if (!isOpen || !positioned) return;
    closeRef.current?.focus({ preventScroll: true });
    if (window.innerWidth < 768 && orbitRef.current) {
      // Keep the service buttons above the mobile sheet so another service can
      // be selected without dismissing it first.
      const nodes = Array.from(orbitRef.current.querySelectorAll<HTMLElement>("[data-orbit-node]"));
      const top = Math.min(...nodes.map(node => node.getBoundingClientRect().top));
      const headerBottom = document.querySelector("header")?.getBoundingClientRect().bottom ?? 84;
      const distance = top - headerBottom - 12;
      if (Math.abs(distance) > 1) window.scrollBy({ top: distance, behavior: "instant" });
    }
  }, [isOpen, positioned, activeIndex]);

  useEffect(() => {
    if (!isOpen) return;
    function outside(event: PointerEvent) {
      if (!(event.target instanceof Element)) return;
      if (panelsRef.current?.contains(event.target)) return;
      if (orbitRef.current?.contains(event.target) && event.target.closest("[data-orbit-node]")) return;
      setActiveIndex(null);
      setPanelPosition(null);
      setKeyboardFocused(false);
    }
    function escape(event: KeyboardEvent) {
      if (event.key !== "Escape" || event.defaultPrevented) return;
      setActiveIndex(null);
      setPanelPosition(null);
      triggerRef.current?.focus({ preventScroll: true });
    }
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [isOpen]);

  // Closed descriptions remain in server HTML. The same markup enters a portal
  // when opened, so the section's overflow cannot crop a service panel.
  const panels = (
    <div ref={panelsRef} className={styles.panels} hidden={!isOpen} data-positioned={positioned}
      style={{ left: panelPosition?.left, top: panelPosition?.top, visibility: positioned ? "visible" : "hidden", "--panel-pointer-offset": `${panelPosition?.pointerOffset ?? 50}px`, "--mobile-panel-limit": panelPosition?.mobileMaxHeight ? `${panelPosition.mobileMaxHeight}px` : undefined, "--panel-viewport-limit": panelPosition?.viewportMaxHeight ? `${panelPosition.viewportMaxHeight}px` : undefined } as CSSProperties}>
      {panelPosition?.pointerSide && <span className={styles.panelPointer} data-side={panelPosition.pointerSide} aria-hidden="true" />}
      {timelineData.map((service, index) => (
        <article id={id + "-service-" + index} key={service.href} className={styles.panel}
          data-orbit-service={service.name} hidden={activeIndex !== index} role="dialog" aria-labelledby={id + "-title-" + index}>
          <div className={styles.panelTop}>
            <span className={styles.serviceName}>{service.name}</span>
            <button ref={activeIndex === index ? closeRef : undefined} type="button" className={styles.close}
              aria-label="Close service details" onClick={() => dismiss()}><X size={23} aria-hidden="true" /></button>
          </div>
          <h3 id={id + "-title-" + index}>{service.title}</h3>
          <p>{service.outcome}</p>
          <div className={styles.panelAccent} aria-hidden="true"><span /></div>
          <ul className={styles.specialties} aria-label="Related services">
            {service.specialties.map(specialty => <li key={specialty}>{specialty}</li>)}
          </ul>
          <Link href={service.href} prefetch={false} className={styles.serviceLink} data-primary-service={service.primary || undefined}>
            <span>{service.label}</span> <ArrowUpRight size={19} aria-hidden="true" />
          </Link>
        </article>
      ))}
    </div>
  );

  return (
    <ConnectedJourneyMotion className={styles.layout}>
      <div ref={copyRef} className={styles.copy} data-journey-heading>
        <p className={styles.eyebrow}>Start with the problem</p>
        <h2 id="home-core-services-title">What’s standing between you and your <em>next customer?</em></h2>
        <p className={styles.intro}>{intro}</p>
        <p className={styles.hint}>Select a service to see how it helps.</p>
        <Link href="/our-services/" prefetch={false} className={styles.cta}>
          EXPLORE ALL SERVICES <ArrowUpRight size={20} aria-hidden="true" />
        </Link>
      </div>
      <div className={styles.visual} data-journey-card>
        <div ref={orbitRef} className={styles.stage} role="group" aria-label="Explore services" data-orbit-running={orbitRunning}
          onPointerEnter={event => { if (event.pointerType === "mouse") setHovered(true); }}
          onPointerLeave={() => setHovered(false)}
          onFocusCapture={event => { if (event.target.matches(":focus-visible")) setKeyboardFocused(true); }}
          onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setKeyboardFocused(false); }}>
          <div className={styles.ring} aria-hidden="true" />
          <Image ref={mascotRef} className={styles.mascot} src="/assets/crea8iv-media-vector-hero-840.webp"
            width={420} height={630} sizes="(max-width: 420px) 110px, 180px" loading="lazy" alt="Crea8iv Media robot mascot" />
          <div className={styles.nodesOrbit}>
          {timelineData.map((service, index) => {
            const [x, y] = nodePositions[index] ?? [50, 50];
            const active = index === activeIndex;
            return (
              <div key={service.href} className={styles.node} data-selected={active} data-service-tone={service.tone}
                style={{ "--node-x": x + "%", "--node-y": y + "%" } as CSSProperties}>
                <div className={styles.nodeFace}>
                <button className={styles.nodeButton} type="button" data-orbit-node={service.name}
                  aria-label={"Explore " + service.name + " services"} aria-expanded={active} aria-haspopup="dialog"
                  aria-controls={id + "-service-" + index} onClick={event => selectService(index, event.currentTarget)}>
                  <Image className={styles.nodeIcon} src={service.iconSrc} alt="" width={512} height={512} sizes="68px" loading="lazy" />
                  <span className={styles.nodeLabel}>{service.name}</span>
                </button>
                </div>
              </div>
            );
          })}
          </div>
        </div>
      </div>
      {isOpen ? createPortal(panels, document.body) : panels}
    </ConnectedJourneyMotion>
  );
}
