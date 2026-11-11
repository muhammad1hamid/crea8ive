'use client';

import { COMPANY } from "@/data/company";
import { useEffect, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { BUSINESS_DETAILS, GOOGLE_MAPS_PLACE_URL } from '@/lib/site-config';
import { PLATFORM_LINKS, SOCIAL_LINKS } from '@/lib/social-links';
import FooterDisclosure from './FooterDisclosure';
import FooterMobileNavigation from './FooterMobileNavigation';
import { FOOTER_COMPANY_LINKS } from './footer-navigation';
import styles from './footer.module.css';

const PLATFORM_LOGOS = {
  "Website": "/icon.png",
  "Instagram": "/img/platform-logos/instagram.webp",
  "TikTok": "/img/platform-logos/tiktok.webp",
  "LinkedIn": "/img/platform-logos/linkedin.webp",
  "X / Twitter": "/img/platform-logos/x.webp",
  "Pinterest": "/img/platform-logos/pinterest.webp",
  "Clutch": "/img/platform-logos/clutch.webp",
  "Reddit": "/img/platform-logos/reddit.webp",
  "GoodFirms": "/img/platform-logos/goodfirms.webp",
  "Linktree": "/img/platform-logos/linktree.webp",
  "Threads": "/img/platform-logos/threads.webp",
  "Medium": "/img/platform-logos/medium.webp",
  "Behance": "/img/platform-logos/behance.webp",
  "Snapchat": "/img/platform-logos/snapchat.webp",
} satisfies Record<(typeof PLATFORM_LINKS)[number]['label'], string>;

const PLATFORM_GROUP_TITLES = {
  social: 'Social profiles',
  creative: 'Creative & community',
  website: 'Website & reviews',
} as const;

const PLATFORM_GROUP_BY_LABEL = {
  Website: 'website',
  Instagram: 'social',
  TikTok: 'social',
  LinkedIn: 'social',
  'X / Twitter': 'social',
  Pinterest: 'creative',
  Clutch: 'website',
  Reddit: 'creative',
  GoodFirms: 'website',
  Linktree: 'website',
  Threads: 'social',
  Medium: 'creative',
  Behance: 'creative',
  Snapchat: 'social',
} satisfies Record<(typeof PLATFORM_LINKS)[number]['label'], keyof typeof PLATFORM_GROUP_TITLES>;

const footerPlatformGroups = Object.entries(PLATFORM_GROUP_TITLES).map(([id, title]) => ({
  id,
  title,
  platforms: PLATFORM_LINKS.filter(({ label }) => PLATFORM_GROUP_BY_LABEL[label] === id),
}));

function subscribeFooterViewport(onChange: () => void) {
  const query = window.matchMedia('(max-width: 767px)');
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

function getFooterViewport(): 'mobile' | 'desktop' | 'server' {
  return window.matchMedia('(max-width: 767px)').matches ? 'mobile' : 'desktop';
}

export default function Footer() {
  const [currentYear, setCurrentYear] = useState('2026');
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const viewport = useSyncExternalStore(subscribeFooterViewport, getFooterViewport, () => 'server');
  const mobile = viewport === 'mobile';
  const ready = viewport !== 'server';

  // Keep server and first-client markup identical; refresh the calendar year after hydration.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentYear(String(new Date().getFullYear()));
  }, []);

  return (
    <footer data-mobile-ready={ready} className={`${styles.footer} site-footer w-full pb-24 lg:pb-0`}>
      {/* Main Footer Section */}
      <div className="mx-auto max-w-[1600px] px-6 py-20 lg:px-8">
        <div className={`${styles.grid} grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-8`}>
          
          {/* Column 1: Brand Logo & Description */}
          <div className={`${styles.brand} flex flex-col space-y-6`}>
            <Link href="/" className="group inline-flex items-center gap-2.5" aria-label="Crea8iv Media home">
              <Image
                src="/img/crea8iv-header-dark.webp"
                loading="lazy"
                alt="Crea8iv Media"
                width={520}
                height={412}
                className="site-logo-dark h-[76px] w-auto object-contain drop-shadow-[0_0_18px_rgba(255,104,1,0.16)] transition-transform duration-500 group-hover:scale-[1.025]"
              />
              <Image
                src="/img/crea8iv-header-light.webp"
                loading="lazy"
                alt="Crea8iv Media light logo"
                width={1024}
                height={1024}
                className="site-logo-light h-[84px] w-auto object-contain drop-shadow-[0_8px_18px_rgba(12,84,70,0.12)] transition-transform duration-500 group-hover:scale-[1.025]"
              />
            </Link>
            <p className="max-w-[280px] font-inter text-sm leading-6 text-white/80">
              Crea8iv Media designs smart digital ecosystems that transform your brand into a consistent, lead-generating machine.
            </p>
            <div className={`${styles.software} max-w-[280px] border-t border-white/[0.08] pt-5`}>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--icon-color)]">Our Software</p>
              <div className="flex flex-wrap gap-x-4 gap-y-2 font-inter text-sm text-white/70">
                <Link href="/patientflow/" className="transition-colors hover:text-[#FF6801]">PatientFlow<ArrowUpRight className={styles.softwareArrow} size={20} aria-hidden="true" /></Link>
                <Link href="/software-products/" className="w-full text-xs text-white/45 transition-colors hover:text-[#FF6801]">View all software →</Link>
              </div>
            </div>

          </div>

          {/* Column 2: Company Links */}
          <div className={`${styles.company} flex flex-col`}>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--icon-color)] mb-6">
              Company
            </h3>
            <ul className={`${styles.companyLinks} grid grid-cols-2 gap-x-5 font-inter text-sm text-white/90`}>
              {FOOTER_COMPANY_LINKS.map((link) => (
                <li key={link.label} className="flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6801] transition-transform group-hover:scale-125" />
                  <Link href={link.href} className="hover:text-[#FF6801] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <FooterMobileNavigation mobile={mobile} ready={ready} />
          </div>

          {/* Column 3: Contact Details */}
          <div className={`${styles.contact} flex flex-col`}>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--icon-color)] mb-6">
              Contact
            </h3>
            <ul className="space-y-4 font-inter text-sm text-white/80">
              {/* Address */}
              <li className="flex items-start gap-3">
                <span className="text-[var(--icon-color)] mt-1 shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                <span className={styles.desktopAddress}>{BUSINESS_DETAILS.address}</span>
                <a className={styles.mobileAddress} href={GOOGLE_MAPS_PLACE_URL} target="_blank" rel="noopener noreferrer">{BUSINESS_DETAILS.address}</a>
              </li>
              
              {/* Phone */}
              <li className="flex items-center gap-3">
                <span className="text-[var(--icon-color)] shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </span>
                <a href={BUSINESS_DETAILS.phoneHref} className="hover:text-[#FF6801] transition-colors">{BUSINESS_DETAILS.phoneDisplay}</a>
              </li>

              {/* Email */}
              <li className="flex items-center gap-3">
                <span className="text-[var(--icon-color)] shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L22 8m-9 9.932l.07.03c.125.05.25.078.38.078.13 0 .255-.028.38-.078l.07-.03L22 13V6a2 2 0 00-2-2H4a2 2 0 00-2 2v7l9 5.932z" />
                  </svg>
                </span>
                <a href={`mailto:${BUSINESS_DETAILS.email}`} className="hover:text-[#FF6801] transition-colors">{BUSINESS_DETAILS.email}</a>
              </li>
            </ul>
            <div className={`${styles.review} mt-6 max-w-[260px]`}>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--icon-color)]">Google Reviews</p>
              <p className="mt-2 font-inter text-sm leading-6 text-white/70">
                Worked with Crea8iv Media? Share your experience directly on our Google Business Profile.
              </p>
              <a
                href={SOCIAL_LINKS.googleReview}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full bg-[#FF6801] px-5 font-inter text-sm font-semibold text-[#1a0b02] transition-all hover:-translate-y-0.5 hover:bg-[#ff7b20]"
              >
                Leave a Google Review
              </a>
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div className={`${styles.newsletter} flex flex-col`}>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--icon-color)] mb-6">
              Newsletter
            </h3>
            <p id="footer-newsletter-description" className="font-inter text-sm text-white/80 mb-5 leading-6 max-w-[280px]">
              Subscribe to our Newsletter to be updated. We promise not to spam.
            </p>
            <label htmlFor="footer-newsletter-email" className={styles.emailLabel}>Email address</label>
            <form 
              toolname="subscribeNewsletter"
              tooldescription="Subscribes a visitor to Crea8iv Media updates using their email address."
              onSubmit={(e) => {
                e.preventDefault();
                if (email.trim()) {
                  setSubscribeStatus('success');
                  setEmail('');
                  setTimeout(() => setSubscribeStatus('idle'), 4000);
                }
              }}
              className="flex flex-col sm:flex-row gap-3 w-full max-w-[340px] group"
            >
              <div className="relative flex-1">
                <input 
                  name="email"
                  id="footer-newsletter-email"
                  type="email" 
                  aria-label="Newsletter email address"
                  aria-describedby={mobile && subscribeStatus === 'error' ? 'footer-newsletter-description footer-newsletter-error' : 'footer-newsletter-description'}
                  aria-invalid={mobile && subscribeStatus === 'error' ? true : undefined}
                  toolparamdescription="The visitor's email address for receiving Crea8iv Media newsletter updates."
                  autoComplete="email"
                  placeholder="Email Address" 
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (mobile && subscribeStatus === 'error') setSubscribeStatus('idle'); }}
                  onInvalid={() => { if (mobile) setSubscribeStatus('error'); }}
                  className="w-full bg-[#121214] border border-white/10 rounded-full px-5 py-3.5 font-inter text-sm text-white focus:outline-none focus:border-[#FF6801] focus:ring-1 focus:ring-[#FF6801]/50 transition-all placeholder-white/40 shadow-inner"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="w-full sm:w-auto shrink-0 relative overflow-hidden group/btn items-center justify-center rounded-full bg-[#FF6801] px-6 py-3.5 font-inter text-[14px] font-semibold text-white shadow-[0_0_15px_rgba(var(--decorative-rgb),.04)] transition-all duration-300 hover:shadow-glow-hover hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-[gradient-x_1.5s_infinite]" />
                <span className="relative z-10">Subscribe</span>
              </button>
            </form>
            {mobile && subscribeStatus === 'error' && <p id="footer-newsletter-error" className={styles.formError} role="alert">Please enter a valid email address.</p>}
            {subscribeStatus === 'success' && (
              <p className="mt-3 font-inter text-sm text-[#25D366] animate-fade-in" role="status" aria-live="polite">
                ✓ Thanks for subscribing!
              </p>
            )}
          </div>

        </div>

            <div className={`${styles.identityOriginal} mt-10 border-t border-white/[0.08] pt-6`}>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--icon-color)]">Identity Work</p>
              <Link href="/clients/" className="inline-flex min-h-11 items-center text-sm text-white/75 hover:text-[#FF6801]">Explore client identities and selected work →</Link>
            </div>

        <div id="official-platforms" className={styles.platforms}>
          <FooterDisclosure title="Official platforms" id="footer-platforms" mobile={mobile} ready={ready}>
            <div className={styles.platformPanel}>
              <div className={styles.platformHeader}>
                <div>
                  <h3 className={styles.platformHeading}>Official platforms</h3>
                  <p className={styles.platformIntro}>Find Crea8iv Media’s social profiles, reviews, articles, design portfolios and community links.</p>
                </div>
                <a href="https://linktr.ee/crea8ivmedia" target="_blank" rel="me noopener noreferrer" className={styles.platformHub}>
                  Open all links <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
              <div className={styles.platformGroups}>
                {footerPlatformGroups.map(({ id, title, platforms }) => (
                  <div key={id} className={styles.platformGroup}>
                    <h4 id={`footer-platform-group-${id}`} className={styles.platformGroupTitle}>{title}</h4>
                    <ul className={styles.platformLinks} aria-labelledby={`footer-platform-group-${id}`} role="list">
                      {platforms.map(({ label, href, purpose }) => (
                        <li key={label}>
                          <a
                            href={href}
                            target="_blank"
                            rel="me noopener noreferrer"
                            className={styles.platformLink}
                            aria-label={`Open Crea8iv Media on ${label}`}
                            data-platform={label}
                          >
                            <span className={styles.platformLogo} aria-hidden="true">
                              <Image src={PLATFORM_LOGOS[label]} alt="" width={28} height={28} loading="lazy" />
                            </span>
                            <span className={styles.platformCopy}>
                              <span className={styles.platformName}>{label}</span>
                              <span className={styles.platformPurpose}>{purpose}</span>
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </FooterDisclosure>
        </div>
      </div>

      <div className={`${styles.businessInfo} mx-auto max-w-[1600px] px-6 pb-6 lg:px-8`}>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs leading-6 text-white/60">
          <p>{COMPANY.brandName}<span className="block">Pakistan operations · {COMPANY.pakistanEntityType}</span></p>
          <Link href="/locations/" className="inline-flex min-h-11 items-center underline decoration-white/25 underline-offset-4 hover:text-[#FF6801]">International markets · Explore locations ↗</Link>
          <Link href="/company-verification/" className="inline-flex min-h-11 items-center underline decoration-white/25 underline-offset-4 hover:text-[#FF6801]">Business information ↗</Link>
        </div>
      </div>
      {/* Bottom Bar Section */}
      <div className={`${styles.copyright} border-t border-white/[0.06] bg-black`}>
        <div className="mx-auto max-w-[1600px] px-6 py-6 lg:px-8 flex flex-col sm:flex-row sm:flex-wrap items-center justify-between gap-4">
          <p className="font-sans text-center text-sm text-white/60 sm:text-left">
            Copyright © {currentYear} <span className="font-semibold text-white">{BUSINESS_DETAILS.legalName}</span>. All Rights Reserved
          </p>

          <nav className="flex items-center gap-4 font-inter text-xs text-white/60" aria-label="Legal">
            <Link href="/privacy-policy/" className="transition-colors hover:text-[#FF6801]">
              Privacy Policy
            </Link>
            <span aria-hidden="true" className="text-white/20">•</span>
            <Link href="/terms-and-conditions/" className="transition-colors hover:text-[#FF6801]">
              Terms &amp; Conditions
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
