"use client";

import type { CSSProperties, ReactNode } from "react";
import type { PointerEvent } from "react";
import { cn } from "@/lib/utils";
import styles from "./spotlight-card.module.css";

export interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "blue" | "purple" | "green" | "red" | "orange";
  size?: "sm" | "md" | "lg";
  width?: string | number;
  height?: string | number;
  customSize?: boolean;
}

/** A card-local spotlight that follows a mouse or pen and has a keyboard focus state. */
export function GlowCard({
  children,
  className,
  glowColor = "orange",
  size = "md",
  width,
  height,
  customSize = false,
}: GlowCardProps) {
  const dimensions: CSSProperties = { width, height };
  const moveSpotlight = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--spot-x", `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty("--spot-y", `${event.clientY - bounds.top}px`);
  };

  return (
    <article
      className={cn(styles.card, !customSize && styles[size], className)}
      data-tone={glowColor}
      style={dimensions}
      tabIndex={0}
      onPointerMove={moveSpotlight}
    >
      {children}
    </article>
  );
}

export default GlowCard;
