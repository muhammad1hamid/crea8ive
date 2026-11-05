"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { X } from "lucide-react";
import GlassFolder, { type FolderIcon } from "@/components/ui/glass-folder-cards";
import styles from "./portfolio-category-folders.module.css";

export type PortfolioFolder = {
  id: string;
  label: string;
  countLabel: string;
  images: string[];
  icon: FolderIcon;
  tone: "warm" | "green";
};

export default function PortfolioFolderBrowser({ folders, galleries }: {
  folders: PortfolioFolder[];
  galleries: ReactNode[];
}) {
  const id = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const open = selected !== null;

  useEffect(() => {
    if (!open) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = overflow; };
  }, [open]);

  return (
    <>
      <div className={styles.folders} role="region" aria-label="Portfolio categories" tabIndex={0}>
        {folders.map((folder, index) => (
          <GlassFolder
            key={folder.id}
            label={folder.label}
            meta={folder.countLabel}
            images={folder.images}
            icon={folder.icon}
            tone={folder.tone}
            featured={index === 0}
            open={selected === index}
            controls={id}
            onOpen={button => {
              triggerRef.current = button;
              setSelected(index);
              dialogRef.current?.showModal();
              if (dialogRef.current) dialogRef.current.scrollTop = 0;
            }}
          />
        ))}
      </div>
      <dialog
        id={id}
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby={`${id}-title`}
        onClick={event => {
          if (event.target !== event.currentTarget) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          if (event.clientX < bounds.left || event.clientX > bounds.right ||
              event.clientY < bounds.top || event.clientY > bounds.bottom) {
            event.currentTarget.close();
          }
        }}
        onClose={event => {
          if (event.target !== event.currentTarget) return;
          setSelected(null);
          triggerRef.current?.focus({ preventScroll: true });
        }}
      >
        <div className={styles.dialogHeader}>
          <div>
            <h2 id={`${id}-title`}>{selected === null ? "Portfolio" : folders[selected].label}</h2>
            <p>{selected === null ? "" : folders[selected].countLabel}</p>
          </div>
          <button type="button" autoFocus aria-label="Close portfolio folder" onClick={() => dialogRef.current?.close()}>
            <X size={22} aria-hidden="true" />
          </button>
        </div>
        <div className={styles.dialogBody}>
          {galleries.map((gallery, index) => (
            <div key={folders[index].id} hidden={selected !== index} data-folder-gallery={folders[index].id}>
              {gallery}
            </div>
          ))}
        </div>
      </dialog>
    </>
  );
}
