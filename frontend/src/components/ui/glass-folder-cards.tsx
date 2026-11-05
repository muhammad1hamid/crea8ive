"use client";

import Image from "next/image";
import { Armchair, Cross, Monitor, Plus, ShoppingCart, Utensils } from "lucide-react";
import { useId } from "react";
import styles from "./glass-folder-cards.module.css";

const backPath = "M0 56A22 22 0 0 1 22 34L146 34C170 34 172 0 198 0L318 0A22 22 0 0 1 340 22L340 250A22 22 0 0 1 318 272L22 272A22 22 0 0 1 0 250Z";
const frontPath = "M0 22A22 22 0 0 1 22 0L118 0C144 0 146 32 172 32L318 32A22 22 0 0 1 340 54L340 176A22 22 0 0 1 318 198L22 198A22 22 0 0 1 0 176Z";

type GlassFolderProps = {
  label: string;
  meta: string;
  images: string[];
  icon: FolderIcon;
  tone?: "warm" | "green";
  featured?: boolean;
  open: boolean;
  controls: string;
  onOpen: (button: HTMLButtonElement) => void;
};
export type FolderIcon = "websites" | "commerce" | "health" | "interiors" | "food";
const categoryIcons = { websites: Monitor, commerce: ShoppingCart, health: Cross, interiors: Armchair, food: Utensils };

/** Folder geometry and hinged glass adapted from the supplied Glass Folder Cards reference. */
export default function GlassFolder({ label, meta, images, icon, tone = "warm", featured = false, open, controls, onOpen }: GlassFolderProps) {
  const id = useId();
  const Icon = categoryIcons[icon];
  return (
    <button
      className={styles.folder}
      type="button"
      data-tone={tone}
      data-open={open}
      data-featured={featured}
      aria-label={`Open ${label}, ${meta}`}
      aria-haspopup="dialog"
      aria-expanded={open}
      aria-controls={controls}
      onClick={event => onOpen(event.currentTarget)}
    >
      <svg className={styles.definitions} aria-hidden="true">
        <defs>
          <clipPath id={`${id}-back`} clipPathUnits="objectBoundingBox">
            <path d={backPath} transform="scale(.0029411765 .0036764706)" />
          </clipPath>
          <clipPath id={`${id}-front`} clipPathUnits="objectBoundingBox">
            <path d={frontPath} transform="scale(.0029411765 .0050505051)" />
          </clipPath>
        </defs>
      </svg>
      {featured && <span className={styles.accentStrokes} aria-hidden="true"><i /><i /><i /></span>}
      <span className={styles.back} style={{ clipPath: `url(#${id}-back)` }} aria-hidden="true" />
      <span className={styles.sheets} aria-hidden="true">
        {images.slice(0, 3).map((src, index) => (
          <span className={styles.sheet} key={src} data-sheet={index}>
            <Image src={src} alt="" fill sizes="(max-width: 639px) 240px, (max-width: 1199px) 30vw, 250px" loading="lazy" />
          </span>
        ))}
      </span>
      <span className={styles.front} style={{ clipPath: `url(#${id}-front)` }}>
        <svg className={styles.rim} viewBox="0 0 340 198" preserveAspectRatio="none" aria-hidden="true">
          <path d={frontPath} />
        </svg>
        <span className={styles.label}>
          <span className={styles.categoryTitle}><span className={styles.icon} aria-hidden="true"><Icon size={22} /></span><span className={styles.title}>{label}</span></span>
          <span className={styles.meta}>{meta}</span>
        </span>
        <span className={styles.key} aria-hidden="true"><Plus size={24} /></span>
      </span>
    </button>
  );
}
