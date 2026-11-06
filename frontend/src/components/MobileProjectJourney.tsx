"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { ArrowRight, Plus } from "lucide-react";
import ConnectedJourneyMotion from "./ConnectedJourneyMotion";
import styles from "./mobile-project-journey.module.css";

type Stage = { title: string; description: string };
const buildSequence = ["Design", "Create", "Implement", "Test", "Release"];

function StageArtwork({ index }: { index: number }) {
  return <div className={styles.art} aria-hidden="true">
    <svg viewBox="0 0 220 100" fill="none" focusable="false">
      {index === 0 && <>
        <path d="M16 73h53m-40-47h35m-22-9v18" stroke="#0c5446" strokeWidth="1.5" opacity=".35" />
        <rect x="24" y="44" width="55" height="35" rx="6" fill="#e4e8d8" />
        <rect x="52" y="35" width="55" height="44" rx="6" fill="#ffd7ae" />
        <circle cx="133" cy="41" r="28" fill="#fcfaee" stroke="#0c5446" strokeWidth="3" />
        <circle cx="133" cy="41" r="17" stroke="#0c5446" strokeWidth="1.5" strokeDasharray="3 5" />
        <circle cx="133" cy="41" r="5" fill="#ff6801" />
        <path d="m154 62 24 24" stroke="#ff6801" strokeWidth="12" strokeLinecap="round" />
        <path d="m182 29 10-6m-16-5 2-9" stroke="#ff6801" strokeWidth="2.5" strokeLinecap="round" />
      </>}
      {index === 1 && <>
        <path d="M25 20h164M25 44h164M25 68h164M49 10v77M97 10v77M145 10v77M181 10v77" stroke="#0c5446" strokeWidth=".7" opacity=".18" />
        <path d="m48 59 55-29 64 22-55 29z" fill="#c0c4b0" stroke="#0c5446" strokeWidth="1.5" />
        <path d="m48 47 55-29 64 22-55 29z" fill="#e8e2d6" stroke="#0c5446" strokeWidth="1.5" />
        <path d="m48 35 55-29 64 22-55 29z" fill="#f5f0e6" stroke="#0c5446" strokeWidth="1.5" />
        <path d="m82 34 21-11 27 9" stroke="#ff6801" strokeWidth="3" strokeLinecap="round" />
        <circle cx="82" cy="34" r="3" fill="#ff6801" /><path d="m126 27 5 5-7 2" stroke="#ff6801" strokeWidth="2" />
        <path d="M34 83h145m-145-4v8m145-8v8" stroke="#0c5446" strokeWidth="1.2" />
      </>}
      {index === 3 && <>
        <circle cx="110" cy="48" r="36" stroke="#fcfaee" strokeWidth="1" opacity=".18" />
        <circle className={styles.cycle} cx="110" cy="48" r="27" stroke="#ff9a4f" strokeWidth="5" strokeDasharray="135 35" strokeLinecap="round" />
        <path d="m139 20 1 13-12-4M80 76l-1-13 12 4" fill="#ff6801" />
        <path d="m97 51 10 9 18-22" stroke="#fcfaee" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M33 48h26m102 0h26" stroke="#b5cfb5" strokeWidth="1.5" strokeDasharray="3 5" />
        <circle cx="28" cy="48" r="4" fill="#b5cfb5" /><circle cx="192" cy="48" r="4" fill="#ff6801" />
      </>}
    </svg>
  </div>;
}

export default function MobileProjectJourney({ stages }: { stages: Stage[] }) {
  const root = useRef<HTMLDivElement>(null);
  const animations = useRef(new Map<HTMLDetailsElement, Animation>());
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [enhanced, setEnhanced] = useState(false);

  useEffect(() => {
    const panels = Array.from(root.current?.querySelectorAll("details") ?? []);
    const initiallyOpen = panels.findIndex(panel => panel.open);
    setActive(Math.max(0, initiallyOpen));
    setEnhanced(true);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const running = animations.current;
    const settle = () => {
      if (!reduced.matches) return;
      running.forEach(animation => animation.cancel());
      running.clear();
      panels.forEach((panel, index) => { panel.style.height = ""; panel.open = index === activeRef.current; });
    };
    reduced.addEventListener("change", settle);
    return () => { running.forEach(animation => animation.cancel()); running.clear(); reduced.removeEventListener("change", settle); };
  }, []);

  useLayoutEffect(() => {
    if (!enhanced) return;
    activeRef.current = active;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    root.current?.querySelectorAll<HTMLDetailsElement>("details").forEach((panel, index) => {
      const expand = index === active;
      const previous = animations.current.get(panel);
      const wasOpen = panel.open;
      const start = panel.getBoundingClientRect().height;
      previous?.cancel();
      animations.current.delete(panel);
      panel.style.height = "";
      if (reduced || !("animate" in panel) || (!previous && wasOpen === expand)) { panel.open = expand; return; }
      // Native disclosures remain usable without JS. Height animation is a
      // short enhancement; no scroll position or fixed content height is stored.
      panel.open = true;
      const end = expand ? panel.scrollHeight + 2 : panel.querySelector("summary")!.getBoundingClientRect().height + 2;
      panel.style.height = `${start}px`;
      const animation = panel.animate([{ height: `${start}px` }, { height: `${end}px` }], { duration: 380, easing: "cubic-bezier(.22,1,.36,1)" });
      animations.current.set(panel, animation);
      animation.onfinish = () => {
        if (animations.current.get(panel) !== animation) return;
        panel.open = expand;
        panel.style.height = "";
        animations.current.delete(panel);
        animation.cancel();
      };
    });
  }, [active, enhanced]);

  function moveFocus(event: KeyboardEvent<HTMLElement>, index: number) {
    const targets: Partial<Record<string, number>> = { ArrowDown: (index + 1) % stages.length, ArrowUp: (index + stages.length - 1) % stages.length, Home: 0, End: stages.length - 1 };
    const target = targets[event.key];
    if (target === undefined || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    event.preventDefault();
    root.current?.querySelectorAll("summary")[target]?.focus();
  }

  return <ConnectedJourneyMotion className={styles.root}>
    <div ref={root} data-project-journey>
      <div className={styles.intro}>
        <p className={styles.kicker}>THE PROJECT JOURNEY</p>
        <p className={styles.caption}>Four stages. One connected process.</p>
      </div>
      <div className={styles.progress} data-enhanced={enhanced} aria-hidden={!enhanced} style={{ "--journey-position": active / Math.max(1, stages.length - 1) } as CSSProperties}>
        <div className={styles.progressLine} aria-hidden="true"><span /></div>
        {stages.map((stage, index) => <button key={stage.title} type="button" aria-label={`Open stage ${index + 1}: ${stage.title}`} aria-controls={`project-stage-content-${index}`} aria-current={active === index ? "step" : undefined} disabled={!enhanced} onClick={() => setActive(index)}><span>{String(index + 1).padStart(2, "0")}</span></button>)}
      </div>
      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true" hidden={!enhanced}>Stage {active + 1} of {stages.length}: {stages[active]?.title}</p>
      <ol className={styles.panels} aria-label="Project journey milestones">
        {stages.map((stage, index) => <li key={stage.title} data-journey-card data-selected={index === active}>
          <details className={styles.panel} data-stage={index + 1} name={enhanced ? undefined : "mobile-project-journey"} open={index === 0}>
            <summary id={`project-stage-toggle-${index}`} className={styles.toggle} aria-controls={`project-stage-content-${index}`} aria-expanded={enhanced ? index === active : undefined} aria-disabled={enhanced && index === active ? true : undefined} onClick={event => { if (enhanced) { event.preventDefault(); setActive(index); } }} onKeyDown={event => moveFocus(event, index)}>
              <span className={styles.number} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <h3 className={styles.title}>{stage.title}</h3>
              <span className={styles.sign} aria-hidden="true"><Plus size={20} /></span>
            </summary>
            <div id={`project-stage-content-${index}`} className={styles.body} role="region" aria-labelledby={`project-stage-toggle-${index}`} aria-hidden={enhanced ? index !== active : undefined} inert={enhanced && index !== active}>
              <div className={styles.bodyContent}>
                <p>{stage.description}</p>
                {index === 2 ? <ol className={styles.buildFlow} aria-label="Build and launch sequence">{buildSequence.map((step, position) => <li key={step}><span>{step}</span>{position < buildSequence.length - 1 && <ArrowRight size={14} aria-hidden="true" />}</li>)}</ol> : <StageArtwork index={index} />}
              </div>
            </div>
          </details>
        </li>)}
      </ol>
    </div>
  </ConnectedJourneyMotion>;
}
