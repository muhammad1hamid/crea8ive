'use client';

import { useState, type ReactNode } from 'react';
import styles from './footer.module.css';

export default function FooterDisclosure({ title, id, mobile, ready, children }: { title: string; id: string; mobile: boolean; ready: boolean; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  // Desktop keeps the original content flow. Without JS, every link is visible.
  const expanded = !mobile || !ready || open;
  return <div className={styles.disclosure} data-footer-disclosure={id}>
    <h3 className={styles.disclosureHeading}>
      <button id={`${id}-toggle`} type="button" className={styles.disclosureTrigger} aria-expanded={expanded} aria-controls={`${id}-content`} onClick={() => setOpen(value => !value)}>
        <span>{title}</span><span className={styles.disclosureSign} aria-hidden="true" />
      </button>
    </h3>
    <div id={`${id}-content`} className={styles.disclosureContent} data-expanded={expanded} role={mobile ? 'region' : undefined} aria-labelledby={mobile ? `${id}-toggle` : undefined} aria-hidden={!expanded} inert={!expanded}>
      <div className={styles.disclosureClip}><div className={styles.disclosureBody}>{children}</div></div>
    </div>
  </div>;
}
