"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import styles from "./industry-showcase.module.css";

function closestCard(rail: HTMLDivElement) {
  const cards = Array.from(rail.children) as HTMLElement[];
  const first = cards[0]?.offsetLeft ?? 0;
  let closest = 0;
  let distance = Infinity;
  cards.forEach((card, index) => {
    const nextDistance = Math.abs(card.offsetLeft - first - rail.scrollLeft);
    if (nextDistance < distance) { closest = index; distance = nextDistance; }
  });
  return closest;
}

export default function IndustryMobileCarousel({ children, count }: { children: ReactNode; count: number }) {
  const railRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const query = window.matchMedia("(max-width: 639px)");
    let frame = 0;
    const sync = () => {
      frame = 0;
      const current = query.matches ? closestCard(rail) : 0;
      setActive(current);
      Array.from(rail.children).forEach((card, index) => {
        card.toggleAttribute("data-industry-active", query.matches && index === current);
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(sync); };
    const changeMode = () => { setMobile(query.matches); sync(); };
    const resize = new ResizeObserver(schedule);
    resize.observe(rail);
    rail.addEventListener("scroll", schedule, { passive: true });
    query.addEventListener("change", changeMode);
    changeMode();
    return () => {
      resize.disconnect();
      rail.removeEventListener("scroll", schedule);
      query.removeEventListener("change", changeMode);
      cancelAnimationFrame(frame);
      Array.from(rail.children).forEach(card => card.removeAttribute("data-industry-active"));
    };
  }, []);

  function navigate(index: number, behavior: ScrollBehavior = "smooth") {
    const rail = railRef.current;
    if (!rail || !window.matchMedia("(max-width: 639px)").matches) return;
    const first = rail.children[0] as HTMLElement | undefined;
    const card = rail.children[Math.max(0, Math.min(count - 1, index))] as HTMLElement | undefined;
    if (!first || !card) return;
    rail.scrollTo({
      left: card.offsetLeft - first.offsetLeft,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : behavior,
    });
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!mobile || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || (event.target as HTMLElement).closest("dialog")) return;
    const current = railRef.current ? closestCard(railRef.current) : active;
    const targets: Partial<Record<string, number>> = { ArrowLeft: current - 1, ArrowRight: current + 1, Home: 0, End: count - 1 };
    const index = targets[event.key];
    if (index === undefined) return;
    event.preventDefault();
    navigate(index, event.key === "Home" || event.key === "End" ? "instant" : "smooth");
  }

  return <>
    <div className={styles.mobileNav} role="group" aria-label="Industry carousel navigation" aria-hidden={!mobile}>
      <span className={styles.counter} role="status" aria-live="polite" aria-atomic="true">
        <span aria-hidden="true">{String(active + 1).padStart(2, "0")} <span className={styles.total}>/ {String(count).padStart(2, "0")}</span></span>
        <span className="sr-only">Industry {active + 1} of {count}</span>
      </span>
      <div className={styles.segments} aria-hidden="true">
        {Array.from({ length: count }, (_, index) => <span key={index} data-current={index === active} />)}
      </div>
      <div className={styles.mobileControls}>
        <button type="button" aria-label="Previous industry" aria-controls="home-industry-carousel" disabled={!mobile || active === 0} onClick={() => navigate(active - 1)}><ArrowLeft size={19} aria-hidden="true" /></button>
        <button type="button" aria-label="Next industry" aria-controls="home-industry-carousel" disabled={!mobile || active === count - 1} onClick={() => navigate(active + 1)}><ArrowRight size={19} aria-hidden="true" /></button>
      </div>
    </div>
    <span id="home-industry-swipe-hint" className="sr-only" hidden={!mobile}>Swipe to explore all five industries, or use the Left and Right arrow keys. Home selects the first card and End selects the last.</span>
    <div ref={railRef} id="home-industry-carousel" className={styles.gallery}
      role={mobile ? "region" : undefined} aria-roledescription={mobile ? "carousel" : undefined}
      aria-label={mobile ? "Industries" : undefined} aria-describedby={mobile ? "home-industry-swipe-hint" : undefined}
      tabIndex={mobile ? 0 : undefined} onKeyDown={handleKeyDown}
      onFocusCapture={event => {
        const target = event.target as HTMLElement;
        if (!mobile || target.closest("dialog")) return;
        const card = target.closest("article");
        const rail = railRef.current;
        if (card && rail) navigate(Array.from(rail.children).indexOf(card), "instant");
      }}>
      {children}
    </div>
  </>;
}
