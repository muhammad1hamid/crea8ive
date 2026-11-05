"use client";
import Image from "next/image";
import { useRef } from "react";
import { websitePortfolioItems } from "@/lib/website-portfolio";
import styles from "./website-preview-carousel.module.css";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
export default function WebsitePreviewCarousel({ excludeSlug }: { excludeSlug?: string }) {
  const row=useRef<HTMLDivElement>(null);
  const drag=useRef<{x:number;scroll:number;moved:boolean}|null>(null);
  function scrollProjects(direction: -1 | 1) {
    const rail = row.current;
    if (!rail) return;
    rail.scrollBy({ left: direction * rail.clientWidth * .8, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }
  const clientOrder = ["buildscape", "home-studio-interior-design", "co3-premium-rawalpindi-drinks", "curtain-hive-3d-wallpaper"];
  const projects = websitePortfolioItems.filter(item => item.slug !== excludeSlug).sort((a,b) => {
    const rank = (slug: string) => { const index = clientOrder.indexOf(slug); return index < 0 ? clientOrder.length : index; };
    return rank(a.slug) - rank(b.slug);
  });
  return <div>
    <div className={styles.row} ref={row} role="region" aria-label="Selected website projects" tabIndex={0}
      onPointerDown={e=>{if(e.pointerType==='mouse'&&row.current)drag.current={x:e.clientX,scroll:row.current.scrollLeft,moved:false};}}
      onPointerMove={e=>{if(drag.current&&row.current&&e.buttons===1){const delta=e.clientX-drag.current.x;if(Math.abs(delta)>5){drag.current.moved=true;row.current.setPointerCapture(e.pointerId);row.current.scrollLeft=drag.current.scroll-delta;}}}}
      onPointerUp={()=>setTimeout(()=>{drag.current=null;},0)} onPointerCancel={()=>{drag.current=null;}} onLostPointerCapture={()=>setTimeout(()=>{drag.current=null;},0)} onClickCapture={e=>{if(drag.current?.moved){e.preventDefault();e.stopPropagation();}}} onDragStart={e=>e.preventDefault()}>
      {projects.map(item=>{const external=/^https?:\/\//.test(item.href);return <a key={item.slug} className={styles.card} href={item.href} data-project={item.slug} data-accent={item.accent} target={external?'_blank':undefined} rel={external?'noopener noreferrer':undefined}>
        <div className={styles.media}><Image src={item.image} alt={item.imageAlt} fill sizes="(max-width:639px) 68vw, (max-width:1023px) 48vw, 33vw" draggable={false} /></div>
        <div className={styles.copy}><h3>{item.brand}</h3><p>{item.category}</p><span>{item.linkLabel} <ArrowUpRight aria-hidden="true" size={15} /></span></div>
      </a>;})}
    </div>
    <div className={styles.controls}><span>Selected projects</span><button type="button" title="Previous website projects" aria-label="Previous website projects" onClick={()=>scrollProjects(-1)}><ArrowLeft size={18} aria-hidden="true" /></button><button type="button" title="Next website projects" aria-label="Next website projects" onClick={()=>scrollProjects(1)}><ArrowRight size={18} aria-hidden="true" /></button></div>
  </div>;
}
