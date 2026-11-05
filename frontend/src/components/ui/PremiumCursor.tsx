'use client';

import { useEffect, useRef } from 'react';

const INTERACTIVE_SELECTOR =
  'a, button, input, textarea, select, summary, [role="button"], [data-cursor], .cmMotion-card';

type CursorMode = 'idle' | 'hover' | 'text' | 'press';

export default function PremiumCursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canUseCursor =
      window.matchMedia('(pointer: fine)').matches &&
      window.matchMedia('(min-width: 768px)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!canUseCursor || !rootRef.current || !haloRef.current || !dotRef.current) {
      return;
    }

    const root = rootRef.current;
    const halo = haloRef.current;
    const dot = dotRef.current;
    const state = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      haloX: window.innerWidth / 2,
      haloY: window.innerHeight / 2,
      mode: 'idle' as CursorMode,
      target: null as HTMLElement | null,
      frame: 0,
      visible: false,
      ticking: false,
    };

    document.documentElement.classList.add('has-premium-cursor');
    root.classList.add('is-enabled');
    root.dataset.mode = 'idle';

    const setMode = (mode: CursorMode) => {
      if (state.mode === mode) return;
      state.mode = mode;
      root.dataset.mode = mode;
    };

    const getInteractiveTarget = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return null;
      const element = target.closest(INTERACTIVE_SELECTOR);
      return element instanceof HTMLElement ? element : null;
    };

    const getMagneticPoint = () => {
      if (!state.target || state.mode === 'text') {
        return { x: state.x, y: state.y };
      }

      const rect = state.target.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      return {
        x: state.x + (centerX - state.x) * 0.08,
        y: state.y + (centerY - state.y) * 0.08,
      };
    };

    const tick = () => {
      const magnetic = getMagneticPoint();
      state.haloX += (magnetic.x - state.haloX) * 0.58;
      state.haloY += (magnetic.y - state.haloY) * 0.58;

      dot.style.transform = `translate3d(${state.x}px, ${state.y}px, 0) translate(-50%, -50%)`;
      halo.style.transform = `translate3d(${state.haloX}px, ${state.haloY}px, 0) translate(-50%, -50%)`;

      state.frame = requestAnimationFrame(tick);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== 'mouse') return;
      state.x = event.clientX;
      state.y = event.clientY;

      if (!state.visible) {
        state.visible = true;
        root.classList.add('is-visible');
      }
      // The rAF loop only starts on the first real pointer move — zero
      // per-frame work during page startup.
      if (!state.ticking) {
        state.ticking = true;
        state.frame = requestAnimationFrame(tick);
      }

      const target = getInteractiveTarget(event.target);
      if (target !== state.target) {
        state.target?.classList.remove('premium-cursor-target');
        state.target = target;
        state.target?.classList.add('premium-cursor-target');
      }

      if (target) {
        const isText = target.matches('input, textarea, [contenteditable="true"]');
        setMode(isText ? 'text' : 'hover');
      } else {
        setMode('idle');
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== 'mouse') return;
      setMode('press');
    };

    const handlePointerUp = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== 'mouse') return;
      const target = getInteractiveTarget(event.target);
      setMode(target ? 'hover' : 'idle');
    };
    const handlePointerLeave = () => {
      state.visible = false;
      root.classList.remove('is-visible');
      state.target?.classList.remove('premium-cursor-target');
      state.target = null;
      setMode('idle');
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    document.documentElement.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      cancelAnimationFrame(state.frame);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      document.documentElement.removeEventListener('pointerleave', handlePointerLeave);
      state.target?.classList.remove('premium-cursor-target');
      document.documentElement.classList.remove('has-premium-cursor');
    };
  }, []);

  return (
    <div ref={rootRef} className="premium-cursor" aria-hidden="true">
      <div ref={haloRef} className="premium-cursor__halo" />
      <div ref={dotRef} className="premium-cursor__dot" />
    </div>
  );
}
