"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Everything renders visible before enhancement and under reduced motion. */
export default function BuyerJourneyMotion({ children, className }: { children: ReactNode; className: string }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = root.current;
    if (!element || !("IntersectionObserver" in window)) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    const seen = new Set<Element>();

    const play = (target: Element, keyframes: Keyframe[], options: KeyframeAnimationOptions) => {
      const animation = target.animate(keyframes, options);
      animations.add(animation);
      const release = () => animations.delete(animation);
      animation.onfinish = release;
      animation.oncancel = release;
    };

    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting || seen.has(entry.target)) continue;
        // Ignore the hidden desktop/mobile alternative, including after resizing.
        if (entry.target.getBoundingClientRect().height === 0) continue;
        seen.add(entry.target);
        observer.unobserve(entry.target);
        if (reduced.matches) continue;
        const target = entry.target;
        if (target.hasAttribute("data-buyer-connection")) {
          target.querySelectorAll("[data-buyer-line]").forEach(line => {
            play(line, [{ strokeDashoffset: "1" }, { strokeDashoffset: "0" }],
              { duration: 1900, easing: "cubic-bezier(.22,.7,.3,1)" });
          });
          target.querySelectorAll("[data-buyer-indicator]").forEach((indicator, index) => {
            play(indicator, [{ opacity: 0 }, { opacity: 1 }],
              { duration: 350, delay: 650 + index * 600, fill: "backwards" });
          });
          target.querySelectorAll("[data-buyer-pulse]").forEach(pulse => {
            play(pulse, [
              { strokeDashoffset: "1.06", opacity: 0 },
              { strokeDashoffset: ".85", opacity: .95, offset: .12 },
              { strokeDashoffset: "0", opacity: .95, offset: .88 },
              { strokeDashoffset: "-.06", opacity: 0 },
            ], { duration: 2200, delay: 150, easing: "ease-in-out", fill: "backwards" });
          });
        } else {
          const step = target.hasAttribute("data-buyer-stage");
          const wide = window.matchMedia("(min-width: 1024px)").matches;
          const order = Number(target.getAttribute("data-buyer-entrance") ?? 0);
          play(target, [
            { opacity: 0, transform: step ? "translateY(20px) scale(.96)" : "translateY(12px)" },
            { opacity: 1, transform: "none" },
          ], {
            duration: step ? 680 : 550,
            delay: step && !wide ? 0 : order * 110,
            easing: "cubic-bezier(.22,1,.36,1)",
            fill: "backwards",
          });
        }
      }
    }, { threshold: .12 });

    element.querySelectorAll("[data-buyer-entrance], [data-buyer-connection]").forEach(target => observer.observe(target));
    const stopMotion = () => {
      if (reduced.matches) animations.forEach(animation => animation.cancel());
    };
    reduced.addEventListener("change", stopMotion);
    return () => {
      observer.disconnect();
      reduced.removeEventListener("change", stopMotion);
      animations.forEach(animation => animation.cancel());
    };
  }, []);

  return <div ref={root} className={className}>{children}</div>;
}
