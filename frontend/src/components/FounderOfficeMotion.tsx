"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function FounderOfficeMotion({ children, className }: { children: ReactNode; className: string }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = root.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!element || reduced.matches || !("IntersectionObserver" in window)) return;

    const animations: Animation[] = [];
    const observer = new IntersectionObserver(entries => {
      entries.filter(entry => entry.isIntersecting).forEach((entry, index) => {
        if (!reduced.matches) {
          animations.push(entry.target.animate(
            [{ opacity: 0.65, transform: "translateY(14px)" }, { opacity: 1, transform: "translateY(0)" }],
            { duration: 600, delay: index * 65, easing: "cubic-bezier(.22,1,.36,1)" },
          ));
        }
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    element.querySelectorAll("[data-founder-reveal]").forEach(item => observer.observe(item));
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
