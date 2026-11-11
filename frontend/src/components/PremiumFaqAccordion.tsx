"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { ChevronDown, Layers2 } from "lucide-react";
import styles from "./homepage-faq.module.css";

type FaqItem = { question: string; answer: string };

export default function PremiumFaqAccordion({ items, idPrefix, defaultOpenIndex, children }: {
  items: readonly FaqItem[];
  idPrefix: string;
  defaultOpenIndex?: number;
  children?: ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const cleanups: (() => void)[] = [];
    const finishAnimations: (() => void)[] = [];

    element.querySelectorAll<HTMLDetailsElement>("details").forEach(item => {
      const trigger = item.querySelector("summary");
      if (!trigger) return;
      let animation: Animation | null = null;
      let intendedOpen = item.open;
      const sync = () => trigger.setAttribute("aria-expanded", String(animation ? intendedOpen : item.open));
      sync();

      const toggle = (event: MouseEvent) => {
        if (event.defaultPrevented || reduced.matches || !item.animate) return;
        event.preventDefault();
        const from = item.getBoundingClientRect().height;
        intendedOpen = animation ? !intendedOpen : !item.open;
        animation?.cancel();
        // Measure both native states in one frame. The browser never paints the
        // temporary measurement, and the disclosure still works without JS.
        item.open = intendedOpen;
        const to = item.getBoundingClientRect().height;
        item.open = true;
        animation = item.animate([{ height: `${from}px` }, { height: `${to}px` }], {
          duration: 320,
          easing: "cubic-bezier(.22,1,.36,1)",
        });
        sync();
        animation.onfinish = () => {
          item.open = intendedOpen;
          animation = null;
          sync();
        };
      };

      trigger.addEventListener("click", toggle);
      item.addEventListener("toggle", sync);
      finishAnimations.push(() => animation?.finish());
      cleanups.push(() => {
        animation?.cancel();
        trigger.removeEventListener("click", toggle);
        item.removeEventListener("toggle", sync);
      });
    });

    const stopMotion = () => { if (reduced.matches) finishAnimations.forEach(finish => finish()); };
    reduced.addEventListener("change", stopMotion);
    let observer: IntersectionObserver | undefined;
    const reveals: Animation[] = [];
    if (!reduced.matches && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(entries => {
        entries.filter(entry => entry.isIntersecting).forEach((entry, index) => {
          if (!reduced.matches) reveals.push(entry.target.animate(
            [{ opacity: .7, transform: "translateY(8px)" }, { opacity: 1, transform: "translateY(0)" }],
            { duration: 450, delay: index * 45, easing: "ease-out" },
          ));
          observer?.unobserve(entry.target);
        });
      }, { threshold: .12 });
      element.querySelectorAll("details").forEach(item => observer?.observe(item));
    }
    const stopReveals = () => { if (reduced.matches) reveals.forEach(animation => animation.cancel()); };
    reduced.addEventListener("change", stopReveals);
    return () => {
      cleanups.forEach(cleanup => cleanup());
      observer?.disconnect();
      reveals.forEach(animation => animation.cancel());
      reduced.removeEventListener("change", stopMotion);
      reduced.removeEventListener("change", stopReveals);
    };
  }, [items, children]);

  return (
    <div ref={root} className={styles.accordion}>
      {items.map(({ question, answer }, index) => (
        <FaqDisclosure key={question} question={question} questionId={`${idPrefix}-question-${index}`} answerId={`${idPrefix}-answer-${index}`} defaultOpen={index === defaultOpenIndex}>
          <p>{answer}</p>
        </FaqDisclosure>
      ))}
      {children}
    </div>
  );
}

export function FaqDisclosure({ question, questionId, answerId, defaultOpen = false, className, children }: {
  question: string;
  questionId: string;
  answerId: string;
  defaultOpen?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <details className={className ? `${styles.item} ${className}` : styles.item} open={defaultOpen}>
      <summary className={styles.trigger} aria-controls={answerId} id={questionId}>
        <span className={styles.questionIcon} aria-hidden="true"><Layers2 size={28} strokeWidth={1.5} /></span>
        <span className={styles.question}>{question}</span>
        <ChevronDown className={styles.chevron} size={20} strokeWidth={1.7} aria-hidden="true" />
      </summary>
      <div id={answerId} className={styles.answer} role="region" aria-labelledby={questionId}>
        {children}
      </div>
    </details>
  );
}
