"use client";

import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Building2, CircleDot, Flower2, Sofa } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./case-story-stage.module.css";

type StoryProject = {
  id: string; name: string; category: string; status: string; description: string;
  tags: string[]; caseHref: string; liveHref?: string;
  screen: { src: string; alt: string; width: number; height: number };
};

export default function CaseStoryStage({ projects }: { projects: StoryProject[] }) {
  const root = useRef<HTMLElement>(null);
  const shell = useRef<HTMLDivElement>(null);
  const scrollScene = useRef<ScrollTrigger | null>(null);
  const current = useRef(0);
  const [active, setActive] = useState(0);
  const [interactive, setInteractive] = useState(false);

  useEffect(() => {
    const element = root.current;
    const stage = shell.current;
    if (!element || !stage) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    let frame = 0;
    media.add("(min-width: 1024px) and (min-height: 760px) and (prefers-reduced-motion: no-preference)", () => {
      frame = requestAnimationFrame(() => {
        element.dataset.storyMode = "interactive";
        const header = document.querySelector("header");
        const top = Math.max(84, Math.ceil(header?.getBoundingClientRect().height ?? 84)) + 18;
        if (stage.getBoundingClientRect().height > window.innerHeight - top - 20) {
          delete element.dataset.storyMode;
          return;
        }
        setInteractive(true);
        const update = (progress: number) => {
          element.style.setProperty("--story-progress", String(progress));
          const index = Math.min(projects.length - 1, Math.floor(progress * projects.length));
          if (current.current !== index) {
            current.current = index;
            setActive(index);
          }
        };
        scrollScene.current = ScrollTrigger.create({
          trigger: element,
          start: `top top+=${top}`,
          end: () => `+=${Math.round(window.innerHeight * 2.1)}`,
          pin: stage,
          pinType: "fixed",
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: self => update(self.progress),
          onRefresh: self => update(self.progress),
        });
      });
      return () => {
        cancelAnimationFrame(frame);
        scrollScene.current?.kill();
        scrollScene.current = null;
        delete element.dataset.storyMode;
        element.style.removeProperty("--story-progress");
        setInteractive(false);
      };
    });
    return () => { cancelAnimationFrame(frame); media.revert(); };
  }, [projects.length]);

  function choose(event: MouseEvent<HTMLAnchorElement>, index: number) {
    const scene = scrollScene.current;
    if (!scene) return;
    event.preventDefault();
    window.scrollTo({ top: scene.start + (scene.end - scene.start) * ((index + .35) / projects.length), behavior: "smooth" });
  }

  return (
    <section id="featured-case-studies" ref={root} data-home-case-story className={styles.section} aria-labelledby="home-case-studies-heading">
      <div className={styles.shell} ref={shell}>
        <div className={styles.header}>
          <p className={styles.eyebrow}><CircleDot size={15} aria-hidden="true" />Client stories</p>
          <h2 id="home-case-studies-heading">The work is only <em>half the story.</em></h2>
          <p className={styles.intro}>Behind every project is a business challenge. Explore what the client needed, what we worked on and how the solution came together.</p>
          <Link href="/case-studies/" className={styles.allCases}>Explore All Case Studies<ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
        <div className={styles.projects}>
          {projects.map((project, index) => {
            const Icon = [Building2, Sofa, Flower2][index];
            const selected = index === active;
            return <article key={project.id} id={`case-story-${project.id}`} className={styles.project} data-case-story={project.id} data-current={selected} aria-labelledby={`case-story-title-${project.id}`}>
              <div className={styles.information} inert={interactive && !selected} aria-hidden={interactive && !selected ? true : undefined}>
                <p className={styles.category}><Icon size={17} aria-hidden="true" />{project.category}</p>
                <p className={styles.status}>{project.status}</p>
                <h3 id={`case-story-title-${project.id}`}>{project.name}</h3>
                <p className={styles.description}>{project.description}</p>
                <ul className={styles.tags} aria-label={`${project.name} services`}>{project.tags.map((tag, tagIndex) => <li key={tag} style={{ "--tag-delay": `${tagIndex * 55}ms` } as CSSProperties}>{tag}</li>)}</ul>
                <div className={styles.actions}>
                  <Link href={project.caseHref} className={styles.caseLink}>Case Study<ArrowUpRight size={17} aria-hidden="true" /></Link>
                  {project.liveHref && <a href={project.liveHref} target="_blank" rel="noopener noreferrer" className={styles.liveLink}>View Website<ArrowUpRight size={17} aria-hidden="true" /></a>}
                </div>
              </div>
              <div className={styles.visual} aria-hidden={interactive && !selected ? true : undefined}>
                <div className={styles.frame}>
                  <div className={styles.screen}>
                    <Image src={project.screen.src} alt={project.screen.alt} width={project.screen.width} height={project.screen.height} sizes="(max-width: 767px) 90vw, (max-width: 1023px) 52vw, 58vw" loading="lazy" />
                  </div>
                </div>
              </div>
            </article>;
          })}
        </div>
        <nav className={styles.timeline} aria-label="Client stories projects">
          {projects.map((project, index) => <a key={project.id} href={`#case-story-${project.id}`} onClick={event => choose(event, index)} aria-current={interactive && active === index ? "step" : undefined}>
            <span className={styles.dot} aria-hidden="true" /><span className={styles.number}>{String(index + 1).padStart(2, "0")}</span><span>{project.name}</span>
          </a>)}
        </nav>
      </div>
    </section>
  );
}
