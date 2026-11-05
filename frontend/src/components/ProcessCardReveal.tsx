"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Content is visible in server HTML; motion is an enhancement after entry.
export default function ProcessCardReveal({ children, className }: { children: ReactNode; className: string }) {
  const list = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const element = list.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!element || reducedMotion.matches || !("IntersectionObserver" in window)) return;
    const animations: Animation[] = [];
    const cards = Array.from(element.children);
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        if (!reducedMotion.matches) {
          animations.push(entry.target.animate(
            [{ opacity: 0.65, transform: "translateY(14px)" }, { opacity: 1, transform: "translateY(0)" }],
            { duration: 550, delay: cards.indexOf(entry.target) * 75, easing: "cubic-bezier(.22,1,.36,1)" },
          ));
        }
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.12 });
    cards.forEach(card => observer.observe(card));
    const stopMotion = () => { if (reducedMotion.matches) animations.forEach(animation => animation.cancel()); };
    reducedMotion.addEventListener("change", stopMotion);
    return () => {
      observer.disconnect();
      animations.forEach(animation => animation.cancel());
      reducedMotion.removeEventListener("change", stopMotion);
    };
  }, []);

  return <ol ref={list} className={className} aria-label="Project delivery steps">{children}</ol>;
}
