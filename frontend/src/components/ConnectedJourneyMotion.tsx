"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function ConnectedJourneyMotion({ children, className }: { children: ReactNode; className: string }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = root.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!element || reduced.matches || !("IntersectionObserver" in window)) return;
    const cards = Array.from(element.querySelectorAll("[data-journey-card]"));
    const animations: Animation[] = [];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        if (!reduced.matches) {
          const isTrack = entry.target.hasAttribute("data-journey-track");
          const vertical = window.matchMedia("(max-width: 699px)").matches;
          const frames = isTrack
            ? [{ opacity: 0.4, transform: vertical ? "scaleY(.15)" : "scaleX(.15)" }, { opacity: 1, transform: "none" }]
            : [{ opacity: 0.7, transform: "translateY(12px)" }, { opacity: 1, transform: "translateY(0)" }];
          animations.push(entry.target.animate(frames, {
            duration: isTrack ? 800 : 550,
            delay: Math.max(0, cards.indexOf(entry.target)) * 75,
            easing: "cubic-bezier(.22,1,.36,1)",
          }));
        }
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.1 });
    element.querySelectorAll("[data-journey-heading], [data-journey-card], [data-journey-track]").forEach(item => observer.observe(item));
    const stopMotion = () => { if (reduced.matches) animations.forEach(animation => animation.cancel()); };
    reduced.addEventListener("change", stopMotion);
    return () => {
      observer.disconnect();
      animations.forEach(animation => animation.cancel());
      reduced.removeEventListener("change", stopMotion);
    };
  }, []);

  return <div ref={root} className={className}>{children}</div>;
}
