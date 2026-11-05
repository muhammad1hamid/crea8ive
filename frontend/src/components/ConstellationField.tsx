"use client";

import { useEffect, useRef } from "react";

type Props = {
  /**
   * Override the canvas layer classes (position / z-index / blend / opacity).
   * Defaults to a behind-content layer; pass a `mix-blend-screen` over-content
   * layer to glow on top of opaque sections site-wide.
   */
  className?: string;
};

/**
 * Animated constellation network on a 2D canvas: warm-gold particles connected by
 * gradient links that brighten as the cursor moves near them, with additive
 * blending for a soft cinematic glow. Lightweight (no WebGL), DPR-aware, and fully
 * static under `prefers-reduced-motion`. Used both as the portfolio hero backdrop
 * and — over content with screen blend — as the site-wide luxury background.
 */
export default function ConstellationField({
  className = "pointer-events-none fixed inset-0 z-0 opacity-70",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const staticMode =
      reduceMotion ||
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(max-width: 767px)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let disposed = false;
    let lastFrame = 0;

    type Particle = { x: number; y: number; vx: number; vy: number; r: number };
    let particles: Particle[] = [];

    // Pointer in CSS pixels; starts off-screen so links are calm until the user moves.
    const pointer = { x: -9999, y: -9999 };
    const LINK_DIST = 150; // px — max distance to draw a link
    const LINK_DIST_SQ = LINK_DIST * LINK_DIST;
    const POINTER_RADIUS = 220; // px — links/particles within this brighten
    const POINTER_RADIUS_SQ = POINTER_RADIUS * POINTER_RADIUS;
    const FRAME_MS = 1000 / 30;

    const seed = () => {
      // Density tuned to viewport area, capped for cursor/scroll performance.
      const cap = width < 768 ? 38 : 72;
      const target = Math.min(cap, Math.round((width * height) / 26000));
      particles = Array.from({ length: target }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.14,
        vy: (Math.random() - 0.5) * 0.14,
        r: Math.random() * 1.6 + 0.6,
      }));
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, width < 768 ? 1 : 1.4);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around the edges for an endless field.
        if (p.x < -20) p.x = width + 20;
        else if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        else if (p.y > height + 20) p.y = -20;

        // Links to nearby particles.
        for (let j = i + 1; j < particles.length; j += 1) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const distSq = dx * dx + dy * dy;
          if (distSq > LINK_DIST_SQ) continue;
          const dist = Math.sqrt(distSq);

          const midX = (p.x + q.x) / 2;
          const midY = (p.y + q.y) / 2;
          const pointerDx = midX - pointer.x;
          const pointerDy = midY - pointer.y;
          const pointerDistSq = pointerDx * pointerDx + pointerDy * pointerDy;
          const pointerDist = pointerDistSq > POINTER_RADIUS_SQ ? POINTER_RADIUS : Math.sqrt(pointerDistSq);
          const proximity = Math.max(0, 1 - pointerDist / POINTER_RADIUS);

          const base = (1 - dist / LINK_DIST) * 0.16;
          const alpha = base + proximity * 0.4;
          // Warm gold near the cursor, deep ember elsewhere.
          const r = 254;
          const g = Math.round(120 + proximity * 70);
          const b = Math.round(30 + proximity * 30);
          ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
          ctx.lineWidth = 0.6 + proximity * 0.7;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }

        // The particle dot, brighter near the cursor.
        const pdx = p.x - pointer.x;
        const pdy = p.y - pointer.y;
        const pdSq = pdx * pdx + pdy * pdy;
        const pd = pdSq > POINTER_RADIUS_SQ ? POINTER_RADIUS : Math.sqrt(pdSq);
        const prox = Math.max(0, 1 - pd / POINTER_RADIUS);
        ctx.fillStyle = `rgba(255,${Math.round(160 + prox * 60)},${Math.round(70 + prox * 40)},${0.5 + prox * 0.45})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + prox * 0.8, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";
    };

    const loop = (time = 0) => {
      if (disposed) return;
      if (time - lastFrame >= FRAME_MS) {
        draw();
        lastFrame = time;
      }
      raf = requestAnimationFrame(loop);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    };
    const onPointerLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    // Start during idle time (bounded) so seeding + the first canvas frames
    // never compete with hydration or the LCP — the layer simply appears a
    // beat after first paint.
    const start = () => {
      if (disposed) return;
      resize();
      window.addEventListener("resize", resize, { passive: true });

      if (staticMode) {
        // Render one settled frame — elegant, but no motion.
        draw();
      } else {
        window.addEventListener("pointermove", onPointerMove, { passive: true });
        window.addEventListener("pointerleave", onPointerLeave, { passive: true });
        loop();
      }
    };

    let idleId = 0;
    let startTimer = 0;
    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(start, { timeout: 1500 });
    } else {
      startTimer = window.setTimeout(start, 250);
    }

    return () => {
      disposed = true;
      if (idleId) window.cancelIdleCallback?.(idleId);
      clearTimeout(startTimer);
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}
