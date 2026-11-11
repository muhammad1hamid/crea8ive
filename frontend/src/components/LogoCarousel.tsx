"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { CLIENT_LOGOS, type ClientLogo } from "@/lib/client-logos";
import styles from "./logo-carousel.module.css";

export default function LogoCarousel({ compact = false, logos = CLIENT_LOGOS }: { compact?: boolean; logos?: readonly ClientLogo[] }) {
  const row = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const drag = useRef<{ x: number; scroll: number; moved: boolean } | null>(null);
  const [playing, setPlaying] = useState(true);
  const [visible, setVisible] = useState(false);
  const copies = compact ? [0, 1, 2, 3] : [0, 1, 2];

  useEffect(() => {
    const element = row.current;
    if (!element) return;

    if (!("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "180px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const element = row.current;
    if (!element || !visible || !playing) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let previous = 0;
    let carry = 0;
    const animate = (time: number) => {
      if (previous && !paused.current && !element.contains(document.activeElement)) {
        carry += Math.min(time - previous, 40) * 0.035;
        const distance = Math.floor(carry);
        const loopWidth = element.firstElementChild?.firstElementChild?.clientWidth ?? 0;
        if (distance > 0 && loopWidth > 0) {
          element.scrollLeft = (element.scrollLeft + distance) % loopWidth;
          carry -= distance;
        }
      }
      previous = time;
      frame = requestAnimationFrame(animate);
    };
    const syncMotion = () => {
      cancelAnimationFrame(frame);
      previous = 0;
      carry = 0;
      if (!reduced.matches) frame = requestAnimationFrame(animate);
    };
    syncMotion();
    reduced.addEventListener("change", syncMotion);
    return () => {
      cancelAnimationFrame(frame);
      reduced.removeEventListener("change", syncMotion);
    };
  }, [playing, visible]);
  return <div className={`${styles.carousel} ${compact ? styles.compact : ""}`}>
    <div ref={row} className={styles.viewport} aria-label="Client brands carousel. Press Space to pause or resume automatic sliding." tabIndex={0}
      onMouseEnter={() => { paused.current = true; }} onMouseLeave={() => { paused.current = false; }}
      onKeyDown={event => {
        if (event.target !== event.currentTarget || event.key !== " ") return;
        event.preventDefault();
        if (!event.repeat) setPlaying(current => !current);
      }}
      onTouchStart={() => { paused.current = true; }} onTouchEnd={() => { paused.current = false; }}
      onPointerDown={event => { if (event.pointerType === "mouse" && row.current) drag.current = { x:event.clientX, scroll:row.current.scrollLeft, moved:false }; }}
      onPointerMove={event => { if (drag.current && row.current && event.buttons === 1) { const delta=event.clientX-drag.current.x; if(Math.abs(delta)>5) { drag.current.moved=true; row.current.setPointerCapture(event.pointerId); row.current.scrollLeft=drag.current.scroll-delta; } } }}
      onPointerUp={() => { setTimeout(() => { drag.current=null; },0); }}
      onPointerCancel={() => { drag.current=null; paused.current=false; }}
      onLostPointerCapture={() => { setTimeout(() => { drag.current=null; },0); }}
      onClickCapture={event => { if(drag.current?.moved) { event.preventDefault(); event.stopPropagation(); } }}
      onDragStart={event => event.preventDefault()}>
      <div className={styles.track}>{copies.map(copy=><div className={styles.group} key={copy} aria-hidden={copy > 0 ? true : undefined}>
        {logos.map(logo=><a key={logo.name} href={logo.href || "/results/"} target={logo.href?.startsWith("http") ? "_blank" : undefined} rel={logo.href?.startsWith("http") ? "noopener noreferrer" : undefined} tabIndex={copy > 0 ? -1 : undefined} className={styles.logo} title={logo.name}>
          <Image src={logo.src} alt={`${logo.name} logo`} width={180} height={180} sizes={compact ? "(max-width: 639px) 80px, 96px" : "116px"} loading="lazy" decoding="async" draggable={false} />
        </a>)}
      </div>)}</div>
    </div>
  </div>;
}
