"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Maximize2, Plus, Search, X } from "lucide-react";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import type { ResultsCategory, ResultsWork } from "@/lib/results-portfolio";
import styles from "./results-editorial.module.css";

const categories = ["All Work", "Websites", "Brand Identity", "Campaigns & Content"] as const;
type Filter = (typeof categories)[number];
const initialCount = 9;

export function ResultsReveals() {
  useEffect(() => {
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const elements = document.querySelectorAll("[data-results-editorial] [data-reveal]");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.setAttribute("data-revealed", "true");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    elements.forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return null;
}

function WorkTile({ work, featured = false, onOpen }: {
  work: ResultsWork;
  featured?: boolean;
  onOpen: (event: MouseEvent<HTMLAnchorElement>, work: ResultsWork) => void;
}) {
  const [failed, setFailed] = useState(false);
  const external = work.href?.startsWith("https://");
  const ratio = Math.max(0.55, work.image.width / work.image.height);

  return (
    <article
      className={featured ? `${styles.tile} ${styles.galleryFeature}` : styles.tile}
      data-work-category={work.category}
      data-work-id={work.id}
    >
      <div className={styles.tileMedia} style={{ aspectRatio: ratio }}>
        {failed ? (
          <div className={styles.imageFallback}>
            <span>Crea8iv Media · Selected work</span>
            <strong>{work.title}</strong>
            <span>Preview unavailable</span>
          </div>
        ) : (
          <a href={work.image.src} onClick={event => onOpen(event, work)} className={styles.enlarge} aria-label={`Enlarge ${work.title} preview`}>
            <Image
              {...work.image}
              alt={work.image.alt}
              sizes={featured ? "(max-width: 768px) 94vw, 55vw" : "(max-width: 639px) 94vw, (max-width: 1023px) 45vw, 30vw"}
              loading="lazy"
              onError={() => setFailed(true)}
            />
            <span className={styles.expandIcon}><Maximize2 size={16} aria-hidden="true" /></span>
          </a>
        )}
      </div>
      <div className={styles.tileCopy}>
        <p className={styles.tileCategory}>{work.category}</p>
        <h3>{work.title}</h3>
        <p className={styles.tileDescription}>{work.description}</p>
        {work.href && (
          <Link href={work.href} prefetch={false} className={styles.textLink} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
            {work.linkLabel ?? "Explore project"} <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        )}
      </div>
    </article>
  );
}

function categoryFromHash(): ResultsCategory | undefined {
  if (window.location.hash === "#archive") return "Campaigns & Content";
  if (window.location.hash === "#website-portfolio") return "Websites";
}

export function ResultsCollection({ work }: { work: ResultsWork[] }) {
  const [category, setCategory] = useState<Filter>("All Work");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<ResultsWork | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLAnchorElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const syncHash = () => {
      const filter = categoryFromHash();
      if (!filter) return;
      setCategory(filter);
      setSearch("");
    };
    const frame = requestAnimationFrame(syncHash);
    window.addEventListener("hashchange", syncHash);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", syncHash);
    };
  }, []);

  const query = search.trim().toLowerCase();
  const filtered = work.filter(item =>
    (category === "All Work" || item.category === category) &&
    `${item.title} ${item.category} ${item.description} ${item.searchTerms ?? ""}`.toLowerCase().includes(query),
  );
  const [lead, ...firstTiles] = filtered.slice(0, initialCount);
  const more = filtered.slice(initialCount);

  function openPreview(event: MouseEvent<HTMLAnchorElement>, item: ResultsWork) {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || !dialog.current?.showModal) return;
    event.preventDefault();
    opener.current = event.currentTarget;
    setSelected(item);
    dialog.current.showModal();
  }

  return (
    <>
      <div className={styles.filterBar} data-reveal>
        <div className={styles.filters} role="group" aria-label="Filter portfolio by discipline">
          {categories.map(option => (
            <button type="button" key={option} aria-pressed={category === option} onClick={() => setCategory(option)}>
              {option}
            </button>
          ))}
        </div>
        <label className={styles.search}>
          <Search size={17} aria-hidden="true" />
          <span className={styles.srOnly}>Search the portfolio</span>
          <input type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Search projects" />
        </label>
      </div>
      <p className={styles.resultCount} role="status">
        {filtered.length} {filtered.length === 1 ? "project" : "projects"}
      </p>
      {lead ? (
        <div key={category} className={styles.galleryResults}>
          <WorkTile key={lead.id} work={lead} featured onOpen={openPreview} />
          {firstTiles.length > 0 && (
            <div className={styles.galleryGrid}>
              {firstTiles.map(item => <WorkTile key={item.id} work={item} onOpen={openPreview} />)}
            </div>
          )}
          {more.length > 0 && (
            <details className={styles.moreWork}>
              <summary><span>More from the collection <span>({more.length})</span></span><Plus size={19} aria-hidden="true" /></summary>
              <div className={styles.galleryGrid}>
                {more.map(item => <WorkTile key={item.id} work={item} onOpen={openPreview} />)}
              </div>
            </details>
          )}
        </div>
      ) : (
        <div className={styles.empty}>
          <p>No projects match that search.</p>
          <button type="button" className={styles.textLink} onClick={() => { setCategory("All Work"); setSearch(""); }}>
            Clear filters <ArrowUpRight size={16} aria-hidden="true" />
          </button>
        </div>
      )}
      <dialog
        ref={dialog}
        className={styles.viewer}
        data-results-image
        aria-labelledby="results-preview-title"
        onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}
        onKeyDown={event => {
          if (event.key === "Tab") {
            event.preventDefault();
            closeButton.current?.focus();
          }
        }}
        onClose={() => { setSelected(null); opener.current?.focus({ preventScroll: true }); }}
      >
        <div className={styles.viewerContent}>
          <div className={styles.viewerHeader}>
            <h3 id="results-preview-title">{selected?.title ?? "Project preview"}</h3>
            <button ref={closeButton} type="button" aria-label="Close project preview" onClick={() => dialog.current?.close()}>
              <X size={23} aria-hidden="true" />
            </button>
          </div>
          {selected && <Image {...selected.image} alt={selected.image.alt} loading="eager" sizes="(max-width: 900px) 90vw, 1050px" />}
        </div>
      </dialog>
    </>
  );
}
