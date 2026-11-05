"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Expand, X, ZoomIn, ZoomOut } from "lucide-react";
import styles from "./evidence-media.module.css";

type EvidenceMediaProps = { src: string; alt: string; sizes: string; className?: string; showExpandControl?: boolean };

export default function EvidenceMedia({ src, alt, sizes, className = "object-contain", showExpandControl = true }: EvidenceMediaProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(false);
  function show() {
    setOpen(true);
    setZoom(false);
    dialog.current?.showModal();
  }
  function close() { dialog.current?.close(); }
  return <>
    <button ref={trigger} type="button" onClick={show} className={styles.trigger} aria-label={`Enlarge ${alt}`} title="Enlarge image">
      <Image src={src} alt={alt} fill sizes={sizes} className={className} loading="lazy" />
      {showExpandControl && <span className={styles.expand}><Expand size={16} aria-hidden="true" /></span>}
    </button>
    <dialog ref={dialog} className={styles.dialog} aria-label={alt} onClick={event => { if (event.target === event.currentTarget) close(); }} onClose={() => { setOpen(false); trigger.current?.focus({ preventScroll: true }); }}>
      {open && <>
        <div className={styles.controls}>
          <button type="button" aria-label={zoom ? "Fit image" : "Zoom image"} title={zoom ? "Fit image" : "Zoom image"} onClick={() => setZoom(!zoom)}>{zoom ? <ZoomOut aria-hidden="true" /> : <ZoomIn aria-hidden="true" />}</button>
          <button type="button" autoFocus aria-label="Close image" title="Close image" onClick={close}><X aria-hidden="true" /></button>
        </div>
        <div className={styles.viewport} data-zoom={zoom}>
          {/* Intrinsic evidence must stay sharp and scrollable when enlarged. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} />
        </div>
      </>}
    </dialog>
  </>;
}
