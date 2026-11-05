'use client';

import { COMPANY } from "@/data/company";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Globe2, Palette } from 'lucide-react';
import { BUSINESS_DETAILS } from '@/lib/site-config';
import { PLATFORM_LINKS, SOCIAL_LINKS } from '@/lib/social-links';
import styles from './footer.module.css';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState('2026');
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Keep server and first-client markup identical; refresh the calendar year after hydration.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentYear(String(new Date().getFullYear()));
  }, []);

  return (
    <footer className={`${styles.footer} site-footer w-full pb-24 lg:pb-0`}>
      {/* Main Footer Section */}
      <div className="mx-auto max-w-[1600px] px-6 py-20 lg:px-8">
        <div className={`${styles.grid} grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-8`}>
          
          {/* Column 1: Brand Logo & Description */}
          <div className="flex flex-col space-y-6">
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
            <div className="max-w-[280px] border-t border-white/[0.08] pt-5">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--icon-color)]">Our Software</p>
              <div className="flex flex-wrap gap-x-4 gap-y-2 font-inter text-sm text-white/70">
                <Link href="/patientflow/" className="transition-colors hover:text-[#FF6801]">PatientFlow</Link>
                <Link href="/software-products/" className="w-full text-xs text-white/45 transition-colors hover:text-[#FF6801]">View all software →</Link>
              </div>
            </div>

          </div>

          {/* Column 2: Company Links */}
          <div className="flex flex-col">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--icon-color)] mb-6">
              Company
            </h3>
            <ul className={`${styles.companyLinks} grid grid-cols-2 gap-x-5 font-inter text-sm text-white/90`}>
              {[
                { label: 'FAQs', href: '/faqs' },
                { label: 'About Us', href: '/about' },
                { label: 'Founder', href: '/syed-qamar-abbas' },
                { label: 'Clients', href: '/clients' },
                { label: 'Website Portfolio', href: '/website-portfolio' },
                { label: 'AI Search Optimization', href: '/ai-search-optimization' },
                { label: 'AI Answer Briefs', href: '/answers' },
                { label: 'Industries', href: '/industries' },
                { label: 'AI Visibility Targets', href: '/ai-visibility-targets' },
                { label: 'Deployment Checklist', href: '/ai-visibility-deployment-checklist' },
                { label: 'Buyer Guides', href: '/guides' },
                { label: 'Comparisons', href: '/compare' },
                { label: 'Playbooks', href: '/playbooks' },
                { label: 'Free Growth Tools', href: '/tools' },
                { label: 'Our Software', href: '/software-products' },
                { label: 'Software Development', href: '/software-development' },
                { label: 'Pricing', href: '/pricing' },
                { label: 'Our Services', href: '/growth-systems' },
                { label: 'Careers', href: '/careers' },
                { label: 'Contact Us', href: '/contact' },
              ].map((link) => (
                <li key={link.label} className="flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6801] transition-transform group-hover:scale-125" />
                  <Link href={link.href} className="hover:text-[#FF6801] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="flex flex-col">
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
                <span>{BUSINESS_DETAILS.address}</span>
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
          <div className="flex flex-col">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--icon-color)] mb-6">
              Newsletter
            </h3>
            <p className="font-inter text-sm text-white/80 mb-5 leading-6 max-w-[280px]">
              Subscribe to our Newsletter to be updated. We promise not to spam.
            </p>
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
                  type="email" 
                  aria-label="Newsletter email address"
                  toolparamdescription="The visitor's email address for receiving Crea8iv Media newsletter updates."
                  autoComplete="email"
                  placeholder="Email Address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
            {subscribeStatus === 'success' && (
              <p className="mt-3 font-inter text-sm text-[#25D366] animate-fade-in" role="status" aria-live="polite">
                ✓ Thanks for subscribing!
              </p>
            )}
          </div>

        </div>

            <div className="mt-10 border-t border-white/[0.08] pt-6">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--icon-color)]">Identity Work</p>
              <Link href="/clients/" className="inline-flex min-h-11 items-center text-sm text-white/75 hover:text-[#FF6801]">Explore client identities and selected work →</Link>
            </div>

        <div className="mt-14 border-t border-white/[0.08] pt-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--icon-color)]">
                Official platforms
              </h3>
              <p className="mt-3 max-w-2xl font-inter text-sm leading-6 text-white/70">
                All Crea8iv Media social profiles, review pages, publishing channels, design portfolios, and community links in one place.
              </p>
            </div>
            <a
              href="https://linktr.ee/crea8ivmedia"
              target="_blank"
              rel="me noopener noreferrer"
              className="font-inter text-sm font-semibold text-white transition-colors hover:text-[#FF6801]"
            >
              Open all links
            </a>
          </div>
          <div className="footer-platform-links mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
            {PLATFORM_LINKS.map((platform) => (
              <a
                key={platform.label}
                href={platform.href}
                target="_blank"
                rel="me noopener noreferrer"
                className="footer-platform-link group flex min-h-[86px] flex-col justify-between rounded-xl border border-white/10 bg-white/[0.035] p-4 transition-all duration-200 hover:border-[#FF6801]/70 hover:bg-[#FF6801]/10"
                aria-label={`Open Crea8iv Media on ${platform.label}`}
                data-platform={platform.label}
              >
                <span className="flex items-center gap-3">
                  <span className="footer-platform-icon" aria-hidden="true">
                    <PlatformIcon label={platform.label} />
                  </span>
                  <span className="footer-platform-label font-inter text-sm font-semibold text-white transition-colors group-hover:text-[#FF6801]">
                    {platform.label}
                  </span>
                </span>
                <span className="footer-platform-purpose mt-3 font-inter text-xs text-white/50">
                  {platform.purpose}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-6 pb-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs leading-6 text-white/60">
          <p>{COMPANY.brandName}<span className="block">Pakistan operations · {COMPANY.pakistanEntityType}</span></p>
          <Link href="/locations/" className="inline-flex min-h-11 items-center underline decoration-white/25 underline-offset-4 hover:text-[#FF6801]">International markets · Explore locations ↗</Link>
          <Link href="/company-verification/" className="inline-flex min-h-11 items-center underline decoration-white/25 underline-offset-4 hover:text-[#FF6801]">Business information ↗</Link>
        </div>
      </div>
      {/* Bottom Bar Section */}
      <div className="border-t border-white/[0.06] bg-black">
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

function PlatformIcon({ label }: { label: string }) {
  const className = "h-4 w-4";
  if (label === "Instagram") return <svg className={className} viewBox="0 0 24 24" fill="none"><rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="4.1" stroke="currentColor" strokeWidth="2" /><circle cx="17.6" cy="6.6" r="1.1" fill="currentColor" /></svg>;
  if (label === "TikTok") return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M14.3 3h3c.25 1.8 1.3 3.2 3 3.9V10a8.6 8.6 0 0 1-3-.9v5.7a5.2 5.2 0 1 1-4.5-5.15v3.12a2.2 2.2 0 1 0 1.5 2.03V3Z" /></svg>;
  if (label === "LinkedIn") return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M5.2 7.1A2.1 2.1 0 1 0 5.2 3a2.1 2.1 0 0 0 0 4.1ZM3.4 20.7h3.6V9H3.4v11.7Zm5.9 0h3.6v-6.1c0-1.6.3-3.2 2.3-3.2s2 1.9 2 3.3v6h3.6v-6.8c0-3.3-.7-5.8-4.6-5.8-1.9 0-3.1 1-3.6 1.9h-.1V9H9.3v11.7Z" /></svg>;
  if (label === "X / Twitter") return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M5 4h3.7l4 5.3L17.2 4H19l-5.5 6.4L19.2 20h-3.7l-4.4-5.8L6.8 20H5l5.6-6.6L5 4Zm3.1 1.6H7.1l7.9 12.8h1L8.1 5.6Z" /></svg>;
  if (label === "Pinterest") return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 3.2a8.8 8.8 0 0 0-3.2 17c-.1-1.4 0-3 .4-4.3l1-4.2s-.3-.7-.3-1.7c0-1.6.9-2.8 2.1-2.8 1 0 1.5.7 1.5 1.6 0 1-.6 2.4-.9 3.7-.3 1.1.6 2 1.7 2 2 0 3.4-2.1 3.4-5.1 0-2.7-1.9-4.5-4.7-4.5-3.2 0-5.1 2.4-5.1 4.9 0 1 .4 2.1.8 2.7.1.1.1.2.1.4l-.3 1.1c-.1.4-.4.5-.7.3-1.3-.6-2.1-2.6-2.1-4.2 0-3.4 2.5-6.6 7.2-6.6 3.8 0 6.7 2.7 6.7 6.2 0 3.7-2.3 6.7-5.5 6.7-1.1 0-2.2-.6-2.6-1.3l-.7 2.5c-.3 1.3-1.2 2.8-1.8 3.8.8.2 1.7.4 2.6.4a8.8 8.8 0 1 0 0-17.6Z" /></svg>;
  if (label === "Threads") return <svg className={className} viewBox="0 0 24 24" fill="none"><path d="M17.8 11.2c-.3-2.8-2.3-4.4-5.5-4.4-3.5 0-5.7 2-5.7 5.3 0 3.5 2.2 5.5 5.8 5.5 2.3 0 4.1-.9 5.1-2.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /><path d="M7.2 3.9c1.4-1 3.1-1.5 4.9-1.5 4.9 0 8.7 3.4 8.7 9.2 0 5.9-3.8 9.9-9.4 9.9-5.8 0-9.9-4-9.9-9.7 0-5.7 3.8-9.6 9.6-9.6 4.5 0 7.7 2.1 8.8 5.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>;
  if (label === "Website") return <Globe2 className={className} strokeWidth={1.7} />;
  if (label === "Clutch") return <span className="footer-brand-letter">C</span>;
  if (label === "GoodFirms") return <span className="footer-brand-letter">G</span>;
  if (label === "Linktree") return <span className="footer-brand-letter">L</span>;
  if (label === "Medium") return <span className="footer-brand-letter footer-brand-medium">M</span>;
  if (label === "Blogger") return <span className="footer-brand-letter">B</span>;
  if (label === "Behance") return <span className="footer-brand-letter footer-brand-wide">Be</span>;
  if (label === "Dribbble") return <span className="footer-brand-letter">D</span>;
  if (label === "Snapchat") return <span className="footer-brand-letter">S</span>;
  if (label === "Reddit") return <span className="footer-brand-letter">r/</span>;
  return <Palette className={className} strokeWidth={1.7} />;
}
