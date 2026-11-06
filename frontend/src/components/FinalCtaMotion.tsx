"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function FinalCtaMotion({ children, className }: { children: ReactNode; className: string }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = root.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!element || reduced.matches || !("IntersectionObserver" in window)) return;
    const animations: Animation[] = [];
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      if (!reduced.matches) {
        animations.push(element.animate([{ opacity: .6 }, { opacity: 1 }], { duration: 600, easing: "ease-out" }));
        element.querySelectorAll<HTMLElement>("[data-cta-reveal]").forEach((item, index) => {
          const visual = item.dataset.ctaReveal === "visual";
          animations.push(item.animate([
            { opacity: .65, transform: visual ? "scale(.96)" : "translateY(12px)" },
            { opacity: 1, transform: "none" },
          ], { duration: 600, delay: Math.min(index * 65, 260), easing: "cubic-bezier(.22,1,.36,1)" }));
        });
      }
      observer.disconnect();
    }, { threshold: .12 });
    observer.observe(element);
    const stop = () => { if (reduced.matches) animations.forEach(animation => animation.cancel()); };
    reduced.addEventListener("change", stop);
    return () => { observer.disconnect(); animations.forEach(animation => animation.cancel()); reduced.removeEventListener("change", stop); };
  }, []);

  return <div ref={root} className={className}>{children}</div>;
}
