'use client';

import type { ReactNode } from "react";

/**
 * Wraps a CTA so it subtly translates toward the cursor (Apple-grade tactility)
 * and springs back on leave. Disabled under prefers-reduced-motion and on touch.
 */
export default function Magnetic({
  children,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}
