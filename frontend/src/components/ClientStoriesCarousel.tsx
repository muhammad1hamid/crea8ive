"use client";

import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { Armchair, ArrowUpRight, Building2, ChevronLeft, ChevronRight, Flower2 } from "lucide-react";
import Link from "next/link";
import EvidenceMedia from "./EvidenceMedia";
import styles from "./client-stories.module.css";

export type ClientStory = {
  id: string;
  name: string;
  industry: string;
  description: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  caseStudyHref: string;
  liveHref?: string;
};

export default function ClientStoriesCarousel({ projects }: { projects: ClientStory[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const stage = useRef<HTMLDivElement>(null);
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const blockClickUntil = useRef(0);

  if (!projects.length) return null;

  function move(direction: number) {
    setActiveIndex(index => (index + direction + projects.length) % projects.length);
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      move(event.key === "ArrowRight" ? 1 : -1);
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      setActiveIndex(event.key === "Home" ? 0 : projects.length - 1);
    }
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    swipeStart.current = event.pointerType === "mouse" ? null : { x: event.clientX, y: event.clientY };
  }

  function onPointerUp(event: PointerEvent<HTMLDivElement>) {
    const start = swipeStart.current;
    swipeStart.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy) * 1.3) return;
    blockClickUntil.current = Date.now() + 350;
    move(dx < 0 ? 1 : -1);
  }

  return (
    <div className={styles.carousel}>
      <p id="client-stories-help" className={styles.srOnly}>Use the left and right arrow keys to explore projects, or swipe on a touch screen.</p>
      <div
        ref={stage}
        className={styles.stage}
        role="group"
        aria-roledescription="carousel"
        aria-label="Client projects"
        aria-describedby="client-stories-help"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => { swipeStart.current = null; }}
        onClickCapture={event => {
          if (Date.now() < blockClickUntil.current) {
            event.preventDefault();
            event.stopPropagation();
          }
        }}
      >
        {projects.map((project, index) => {
          const offset = (index - activeIndex + projects.length) % projects.length;
          const position = offset === 0 ? "active" : offset === 1 ? "next" : "previous";
          const isActive = index === activeIndex;
          const Icon = project.id === "buildscape" ? Building2 : project.id === "home-studio-interiors" ? Armchair : Flower2;
          return (
            <article
              key={project.id}
              id={`client-story-${project.id}`}
              data-story-position={position}
              data-story-id={project.id}
              className={styles.card}
              aria-label={`${project.name}, ${index + 1} of ${projects.length}`}
              aria-roledescription="slide"
            >
              <div className={styles.media} style={{ aspectRatio: `${project.imageWidth} / ${project.imageHeight}` }} inert={!isActive} aria-hidden={!isActive}>
                <EvidenceMedia src={project.image} alt={project.imageAlt} sizes="(max-width: 639px) 90vw, (max-width: 1023px) 64vw, 600px" showExpandControl={false} />
              </div>
              <div className={styles.cardBody}>
                <p className={styles.industry}><Icon size={19} aria-hidden="true" />{project.industry}</p>
                <h3>{project.name}</h3>
                <p className={styles.description}>{project.description}</p>
                <div className={styles.projectActions} inert={!isActive} aria-hidden={!isActive}>
                  <Link href={project.caseStudyHref} prefetch={false} className={styles.caseLink}>Read Case Study <ArrowUpRight size={19} aria-hidden="true" /></Link>
                  {project.liveHref && <a href={project.liveHref} className={styles.liveLink} target="_blank" rel="noopener noreferrer">View Live Website <ArrowUpRight size={18} aria-hidden="true" /></a>}
                </div>
              </div>
              {!isActive && <button type="button" className={styles.previewSelect} aria-label={`Show ${project.name}`} onClick={() => { setActiveIndex(index); stage.current?.focus({ preventScroll: true }); }} />}
            </article>
          );
        })}
      </div>
      <div className={styles.footer}>
        <div className={styles.controls} role="group" aria-label="Project navigation">
          <button type="button" className={styles.navArrow} aria-label="Previous project" onClick={() => move(-1)}><ChevronLeft size={23} aria-hidden="true" /></button>
          <div className={styles.indicators}>
            {projects.map((project, index) => <button key={project.id} type="button" className={styles.indicator} aria-label={`Show ${project.name}`} aria-current={index === activeIndex ? "true" : undefined} aria-controls={`client-story-${project.id}`} onClick={() => setActiveIndex(index)}><span /></button>)}
          </div>
          <button type="button" className={styles.navArrow} aria-label="Next project" onClick={() => move(1)}><ChevronRight size={23} aria-hidden="true" /></button>
        </div>
        <Link href="/case-studies/" prefetch={false} className={styles.allCases}>Explore All Case Studies <ArrowUpRight size={19} aria-hidden="true" /></Link>
      </div>
      <p className={styles.srOnly} role="status" aria-live="polite" aria-atomic="true">Project {activeIndex + 1} of {projects.length}: {projects[activeIndex].name}</p>
    </div>
  );
}
