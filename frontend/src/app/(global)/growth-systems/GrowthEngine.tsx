"use client";

import { useEffect, useRef, useState } from "react";
import { Compass, FileText, Layout, MapPin, Megaphone, MessageCircle, Palette, Search, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import styles from "./growth-systems.module.css";

const layers = [
  { name: "Visibility", copy: "Google Business Profile, Google Ads, and social platforms bring targeted attention." },
  { name: "Trust", copy: "Branding, creative direction, and consistent visuals build authority and recognition." },
  { name: "Conversion", copy: "Website development and ad systems turn traffic into leads, clients, and sales opportunities." },
] as const;

type Layer = (typeof layers)[number]["name"];

const channels: { label: string; name?: string; icon: LucideIcon; x: number; y: number; layers: Layer[] }[] = [
  { label: "Google Profile", name: "Google Business Profile", icon: MapPin, x: 50, y: 9, layers: ["Visibility"] },
  { label: "Social", name: "Social media", icon: MessageCircle, x: 78, y: 22, layers: ["Visibility"] },
  { label: "Meta Ads", icon: Megaphone, x: 87, y: 48, layers: ["Conversion"] },
  { label: "Google Ads", icon: Search, x: 78, y: 75, layers: ["Visibility", "Conversion"] },
  { label: "Website", icon: Layout, x: 50, y: 84, layers: ["Conversion"] },
  { label: "Brand", name: "Branding", icon: Palette, x: 22, y: 75, layers: ["Trust"] },
  { label: "Content", icon: FileText, x: 13, y: 48, layers: ["Trust"] },
  { label: "Consulting", icon: Compass, x: 22, y: 22, layers: ["Visibility", "Trust", "Conversion"] },
];

export default function GrowthEngine() {
  const diagramRef = useRef<HTMLElement>(null);
  const [entered, setEntered] = useState(false);
  const [active, setActive] = useState<Layer | null>(null);

  useEffect(() => {
    const element = diagramRef.current;
    if (!element || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.intersectionRatio < 0.35) return;
      setEntered(true);
      observer.disconnect();
    }, { threshold: 0.35 });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const connected = channels.map((channel) => ({
    ...channel,
    highlighted: active === null || channel.layers.includes(active),
  }));
  const highlightedChannels = connected.filter(({ highlighted }) => highlighted);

  return (
    <section id="cm-engine" className={`${styles.chapter} ${styles.engine}`} aria-labelledby="growth-engine-title">
      <div className={styles.sectionHeading}>
        <p className={styles.eyebrow}>System Thinking</p>
        <h2 id="growth-engine-title">How the channels <em>work together.</em></h2>
        <p>Search, social and ads bring people in. Your brand, content and website give them a reason to trust you and a clear next step. One strategy connects those decisions so you can measure how they perform together.</p>
      </div>

      <figure ref={diagramRef} className={styles.diagram} data-entered={entered} aria-labelledby="growth-map-caption">
        <figcaption className={styles.mapHeader} id="growth-map-caption">
          <span>Growth channel map</span>
          <span className={styles.mapCount}>{channels.length} channels</span>
        </figcaption>

        <div id="growth-channel-map" className={styles.mapCanvas}>
          <svg className={styles.mapWiring} viewBox="0 0 100 100" aria-hidden="true">
            <circle className={styles.mapOrbit} cx="50" cy="48" r="38" />
            <circle className={styles.mapOrbit} cx="50" cy="48" r="26" />
            {connected.map(({ label, x, y, highlighted }) => (
              <line key={label} className={styles.mapWire} data-highlighted={highlighted} x1="50" y1="48" x2={x} y2={y} />
            ))}
            <g key={active ?? "all"} className={styles.mapSignals}>
              {highlightedChannels.map(({ label, x, y }) => (
                <line key={label} x1="50" y1="48" x2={x} y2={y} pathLength="1" />
              ))}
            </g>
          </svg>
          <div className={styles.mapCore}>
            <Workflow aria-hidden="true" />
            <strong>Growth Core</strong>
          </div>
          <ul className={styles.mapChannels} aria-label="Connected channels">
            {connected.map(({ label, name, icon: Icon, x, y, highlighted }) => (
              <li key={label} data-highlighted={highlighted} style={{ left: `${x}%`, top: `${y}%` }}>
                <span className={styles.mapIcon}><Icon aria-hidden="true" /></span>
                <span className={styles.mapLabel} aria-hidden={name ? true : undefined}>{label}</span>
                {name && <span className="sr-only">{name}</span>}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.mapFilters} role="group" aria-label="Highlight channels by layer">
          {layers.map(({ name }) => (
            <button key={name} type="button" aria-controls="growth-channel-map" aria-pressed={active === name} onClick={() => {
              setEntered(true);
              setActive((previous) => previous === name ? null : name);
            }}>
              {name}
            </button>
          ))}
        </div>
        <span className="sr-only" role="status">
          {active ? `${active} connections highlighted: ${highlightedChannels.map(({ name, label }) => name ?? label).join(", ")}.` : "All growth channels shown."}
        </span>
      </figure>

      <dl className={styles.layers}>
        {layers.map(({ name, copy }, index) => (
          <div key={name} data-active={active === name}>
            <dt><span aria-hidden="true">0{index + 1}</span>{name} Layer</dt>
            <dd>{copy}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
