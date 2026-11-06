import Link from 'next/link';
import FooterDisclosure from './FooterDisclosure';
import { FOOTER_COMPANY_LINKS, FOOTER_MOBILE_GROUPS } from './footer-navigation';
import styles from './footer.module.css';

export default function FooterMobileNavigation({ mobile, ready }: { mobile: boolean; ready: boolean }) {
  return <nav className={styles.mobileNavigation} aria-label="Footer navigation">
    {FOOTER_MOBILE_GROUPS.map(group => <FooterDisclosure key={group.id} title={group.title} id={`footer-${group.id}`} mobile={mobile} ready={ready}>
      <ul className={styles.mobileLinks}>
        {group.labels.map(label => {
          const link = FOOTER_COMPANY_LINKS.find(item => item.label === label)!;
          return <li key={link.label}><Link href={link.href}>{link.label}</Link></li>;
        })}
      </ul>
      {group.id === 'work' && <Link href="/clients/" className={styles.identityBanner}>
        <span><span className={styles.identityKicker}>Identity Work</span><span className={styles.identityCopy}>Explore client identities and selected work</span></span>
        <span className={styles.identityArrow} aria-hidden="true">→</span>
      </Link>}
    </FooterDisclosure>)}
  </nav>;
}
