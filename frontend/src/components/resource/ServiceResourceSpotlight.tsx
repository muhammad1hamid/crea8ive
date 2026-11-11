import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ToolPage } from "@/lib/tools";
import actionStyles from "../homepage-final-cta.module.css";
import resource from "./resource-page.module.css";
import styles from "./service-resource-spotlight.module.css";

export type ServiceResourceLink = { href: string; label: string; description?: string; icon?: string };

function ResourceLinkGroup({ title, links, className }: {
  title: string;
  links: readonly ServiceResourceLink[];
  className: string;
}) {
  return (
    <div className={className}>
      <h3 className={`${resource.eyebrow} ${styles.groupHeading}`}>{title}</h3>
      <ul className={styles.links} aria-label={title} role="list">
        {links.map(({ href, label, description, icon }) => (
          <li key={href}>
            <Link href={href} className={styles.link} prefetch={false}>
              {icon && <Image className={styles.icon} src={icon} alt="" width={80} height={80} sizes="(max-width: 479px) 56px, 80px" loading="lazy" />}
              <span>
                <strong>{label}</strong>
                {description && <span className={styles.linkDescription}>{description}</span>}
              </span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ServiceResourceSpotlight({ tool, image, description, links }: {
  tool: Pick<ToolPage, "slug" | "name" | "category">;
  image: string;
  description: string;
  links: readonly ServiceResourceLink[];
}) {
  const reading = links.filter(({ href }) => href.startsWith("/blog/"));
  const nextSteps = links.filter(({ href }) => !href.startsWith("/blog/"));

  return (
    <div className={styles.layout}>
      <article className={styles.feature}>
        <div className={styles.cover}>
          <Image
            src={image}
            alt=""
            fill
            loading="lazy"
            sizes="(max-width: 899px) 92vw, (max-width: 1350px) 44vw, 570px"
          />
        </div>
        <div className={styles.featureCopy}>
          <p className={`${resource.eyebrow} ${styles.featureLabel}`}>{tool.category} · Free tool</p>
          <h3>{tool.name}</h3>
          <p className={styles.description}>{description}</p>
          <Link href={`/tools/${tool.slug}/`} className={`${actionStyles.primary} ${styles.action}`} prefetch={false}>
            Run free audit <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </article>

      {reading.length > 0 && <ResourceLinkGroup title="Profile guides" links={reading} className={styles.guides} />}
      {nextSteps.length > 0 && <ResourceLinkGroup title="Planning support" links={nextSteps} className={styles.support} />}
    </div>
  );
}
