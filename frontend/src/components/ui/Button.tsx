'use client';

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Variant = "primary" | "solid" | "ghost";
type Size = "md" | "lg";

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  glow?: boolean;
};

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
  onClick?: () => void;
};

type ButtonAsButton = CommonProps & {
  href?: undefined;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

const base =
  "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-orbitron uppercase tracking-[0.15em] font-semibold transition-all duration-300 ease-lux focus-visible:outline-none focus-visible:shadow-glow-ring will-change-transform select-none";

const sizes: Record<Size, string> = {
  md: "px-7 h-[48px] text-[11px] min-h-[44px]",
  lg: "px-9 h-[56px] text-[12px] min-h-[48px]",
};

const variants: Record<Variant, string> = {
  // Preserve the existing outline/solid API without competing orange rings.
  primary:
    "brand-secondary-action border hover:-translate-y-0.5 active:scale-[0.98]",
  solid:
    "brand-action border hover:-translate-y-0.5 active:scale-[0.98]",
  ghost:
    "brand-text-action px-2 bg-transparent underline underline-offset-4",
};

function Shimmer() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute top-0 bottom-0 left-0 w-1/2 -translate-x-[180%] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover/btn:animate-shimmer"
    />
  );
}

export default function Button(props: ButtonAsLink | ButtonAsButton) {
  const { children, variant = "primary", size = "lg", className } = props;
  const classes = cn(
    "group/btn",
    base,
    variant !== "ghost" && sizes[size],
    variants[variant],
    className
  );

  const inner = (
    <>
      {variant !== "ghost" && <Shimmer />}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </>
  );

  if (props.href !== undefined) {
    const { href, external, onClick } = props;
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick} className={classes}>
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} onClick={onClick} className={classes}>
        {inner}
      </Link>
    );
  }

  const { type = "button", onClick, disabled } = props;
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cn(classes, disabled && "opacity-50 cursor-not-allowed")}>
      {inner}
    </button>
  );
}
