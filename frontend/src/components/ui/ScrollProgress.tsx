'use client';

import { useEffect, useRef } from "react";

/** A thin molten-gradient progress bar pinned to the top of the viewport. */
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      if (ref.current) {
        ref.current.style.transform = `scaleX(${Math.max(0, Math.min(1, progress))})`;
      }
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-molten shadow-[0_0_10px_rgba(255,104,1,0.6)]"
      aria-hidden
    />
  );
}
