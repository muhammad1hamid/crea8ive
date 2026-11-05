'use client';

import { useEffect, useLayoutEffect, useRef, useState } from "react";

// Layout effect on the client only (avoids the SSR useLayoutEffect warning).
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Count-up micro-interaction for stat numbers.
 *
 * SSR-safe by design: the server renders the FINAL value (good for SEO / no-JS).
 * On the client, a layout effect resets to 0 BEFORE paint (no flash), then the
 * number animates up the first time it scrolls into view. Values that aren't a
 * leading-number + simple suffix (e.g. "24/7") render static, untouched.
 * Honors prefers-reduced-motion.
 */
export default function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  const match = value.match(/^(\d+)([^\d/]*)$/); // leading int + simple suffix, no "/"
  const animatable = !!match;
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";

  const [display, setDisplay] = useState(value);

  // Before first paint on the client, drop to 0 so there's no visible jump.
  useIsoLayoutEffect(() => {
    if (animatable && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) setDisplay(`0${suffix}`);
  }, []);

  useEffect(() => {
    if (!animatable || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !ref.current) return;

    let raf = 0;
    const node = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      observer.disconnect();
      const started = performance.now();
      const duration = 1400;

      const tick = (now: number) => {
        const t = Math.min(1, (now - started) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplay(`${Math.round(eased * target)}${suffix}`);
        if (t < 1) raf = window.requestAnimationFrame(tick);
      };

      raf = window.requestAnimationFrame(tick);
    }, {
      rootMargin: "-40px",
      threshold: 0,
    });

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [animatable, target, suffix]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
