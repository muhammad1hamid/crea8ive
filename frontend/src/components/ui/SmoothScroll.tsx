'use client';

import { useEffect } from "react";
import Lenis from "lenis";
import { registerScrollController } from '@/lib/scroll-controller';

/**
 * Apple-style buttery momentum scrolling for the whole document.
 * Disabled under prefers-reduced-motion. Plays nicely with anchor links and
 * framer-motion's useScroll (it dispatches native scroll events).
 */
export default function SmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouchOrSmall =
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(max-width: 1023px)").matches;
    if (prefersReduced || isTouchOrSmall) return;

    const lenis = new Lenis({
      duration: 0.82,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      lerp: 0.14,
    });
    registerScrollController(lenis);

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Smooth-scroll in-page anchor links.
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!target) return;
      const id = target.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: -100 });
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", onClick);
      lenis.destroy();
      registerScrollController(null);
    };
  }, []);

  return null;
}
