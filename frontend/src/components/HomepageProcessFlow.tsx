"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ChartNoAxesCombined, ClipboardList, MessagesSquare, Pause, Play, Rocket } from "lucide-react";
import styles from "./homepage-process-flow.module.css";

const stepIcons = [MessagesSquare, ClipboardList, Rocket, ChartNoAxesCombined];

export default function HomepageProcessFlow({ steps }: {
  steps: readonly { title: string; description: string }[];
}) {
  const root = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const element = root.current;
    if (!element || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      entries => setVisible(entries[0].isIntersecting),
      { threshold: .12 },
    );
    const onVisibilityChange = () => setPageVisible(!document.hidden);
    observer.observe(element);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <div ref={root} className={styles.flow} data-flow-running={visible && pageVisible && !paused}>
      <ol className={styles.steps} aria-label="Project delivery steps">
        {steps.map((step, index) => {
          const Icon = stepIcons[index] ?? ClipboardList;
          return (
            <li key={step.title} className={styles.step}
              style={{ "--flow-delay": `${index * 2.4}s` } as CSSProperties}>
              <div className={styles.stepTop}>
                <span className={styles.icon} data-flow-icon={index} aria-hidden="true"><Icon size={25} strokeWidth={1.8} /></span>
                <span className={styles.number} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              {index < steps.length - 1 && <span className={styles.connector} aria-hidden="true"><span /></span>}
            </li>
          );
        })}
      </ol>
      <div className={styles.motionControl}>
        <button type="button" aria-label={paused ? "Play process animation" : "Pause process animation"}
          aria-pressed={paused} onClick={() => setPaused(value => !value)}>
          {paused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}
        </button>
      </div>
    </div>
  );
}
