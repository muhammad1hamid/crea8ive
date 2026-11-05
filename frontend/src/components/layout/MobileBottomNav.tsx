'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import FaIcon, { type FaIconName } from '@/components/ui/FaIcon';

// Icons are inlined SVGs (FaIcon) so the always-visible bottom nav paints on
// the first frame instead of waiting for the async Font Awesome stylesheet.
const navItems: { label: string; href: string; icon: FaIconName; sectionId: string | null }[] = [
  { label: 'Home', href: '/', icon: 'house', sectionId: null },
  { label: 'Services', href: '/#services', icon: 'layer-group', sectionId: 'services' },
  { label: 'Plans', href: '/pricing', icon: 'tag', sectionId: null },
  { label: 'Platforms', href: '/platforms', icon: 'border-all', sectionId: null },
  { label: 'Contact', href: '/contact', icon: 'comment', sectionId: null },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Track which section is in view for hash-based nav items
  useEffect(() => {
    // Route transitions clear the prior page's active section before observing this route.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (pathname !== '/') { setActiveSection(null); return; }

    const sectionIds = navItems.map(i => i.sectionId).filter(Boolean) as string[];
    const observers: IntersectionObserver[] = [];

    // Small delay to let WordPress content mount
    const t = setTimeout(() => {
      sectionIds.forEach((id) => {
        // Try exact id first, then search headings containing the text
        let el = document.getElementById(id);
        if (!el) {
          const headings = document.querySelectorAll('h1, h2, h3');
          for (const h of headings) {
            if ((h.textContent || '').toLowerCase().includes(id)) {
              el = h.closest('section, .elementor-section, .e-con') as HTMLElement;
              break;
            }
          }
        }
        if (!el) return;

        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) setActiveSection(id);
          },
          { rootMargin: '-30% 0px -50% 0px', threshold: 0 }
        );
        observer.observe(el);
        observers.push(observer);
      });
    }, 800);

    return () => {
      clearTimeout(t);
      observers.forEach(o => o.disconnect());
    };
  }, [pathname]);

  return (
    <div className="fixed bottom-0 left-0 w-full z-[90] px-4 pb-[calc(0.55rem+env(safe-area-inset-bottom))] lg:hidden">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-[radial-gradient(68%_68%_at_50%_100%,rgba(var(--decorative-rgb),.04),transparent_72%)]" />
      
      {/* Nav items */}
      <nav className="mobile-bottom-shell relative mx-auto flex h-[62px] max-w-[520px] items-center justify-around rounded-[24px] border border-white/18 bg-[#080604]/58 px-1.5 shadow-[0_16px_42px_-28px_rgba(0,0,0,0.95),0_0_30px_-22px_rgba(var(--decorative-rgb),.04),inset_0_1px_0_rgba(255,255,255,0.13)] backdrop-blur-xl" aria-label="Bottom navigation">
        {navItems.map((item) => {
          let currentlyActive = false;
          if (item.sectionId && pathname === '/') {
            currentlyActive = activeSection === item.sectionId;
          } else if (item.href === '/') {
            currentlyActive = pathname === '/' && !activeSection;
          } else if (!item.sectionId) {
            currentlyActive = pathname === item.href || pathname.startsWith(item.href.split('#')[0]);
          }
          
          return (
            <Link
              key={item.label}
              href={item.href}
              aria-current={currentlyActive ? 'page' : undefined}
              className={`group relative flex h-[52px] w-[62px] flex-col items-center justify-center gap-1 rounded-[18px] font-orbitron transition-all duration-300 ease-lux active:scale-[0.94] ${currentlyActive ? 'text-[var(--icon-color)]' : 'text-white/50 hover:text-white/84'}`}
            >
              {currentlyActive && (
                <span className="absolute bottom-1.5 left-1/2 h-[3px] w-7 -translate-x-1/2 rounded-full bg-[#FF6801] shadow-[0_0_12px_rgba(var(--decorative-rgb),.04)]" />
              )}
              <div className={`relative flex h-6 w-6 items-center justify-center rounded-full transition-all duration-300 ${currentlyActive ? '-translate-y-0.5 text-[var(--icon-color)]' : 'group-hover:-translate-y-0.5'}`}>
                <FaIcon icon={item.icon} className="text-[17px]" />
              </div>
              <span className={`relative text-[8px] font-semibold uppercase leading-none tracking-[0.06em] transition-all duration-300 ${currentlyActive ? 'text-white opacity-95' : 'text-white opacity-[0.5] group-hover:opacity-80'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
