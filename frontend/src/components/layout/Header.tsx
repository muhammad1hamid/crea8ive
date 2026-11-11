'use client';

import { useState, useEffect, useRef, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';
import type { ComponentType, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { BUSINESS_DETAILS, PRIMARY_NAV } from '@/lib/site-config';
import { HEADER_SOCIAL_LINKS } from '@/lib/social-links';
import { TOOL_CATEGORIES, type ToolCategory } from '@/lib/tools';
import { cn } from '@/lib/utils';
import Magnetic from '@/components/ui/Magnetic';
import {
  ArrowUpRight,
  Bot,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clapperboard,
  FileChartColumn,
  Globe2,
  GraduationCap,
  HeartPulse,
  Image as ImageIcon,
  LayoutDashboard,
  Mail,
  MapPin,
  Menu,
  Megaphone,
  MessageSquareText,
  Moon,
  Network,
  Palette,
  Phone,
  SearchCheck,
  Sparkles,
  Sun,
  TrendingUp,
  Users,
  X,
} from 'lucide-react';
import { useCallback } from 'react';
import { getServiceTone } from '@/lib/service-tones';
import navigationStyles from './navigation-motion.module.css';

function MobileMenuIcon({label}:{label:string}) {
 const icons:Record<string,ComponentType<{className?:string}>>={Home:Globe2,Qatar:Globe2,Solutions:Sparkles,Results:BriefcaseBusiness,Platforms:LayoutDashboard,About:Users,Plans:FileChartColumn,Insights:FileChartColumn};
 const Icon=icons[label]||ChevronRight;
 return <Icon className="w-5 h-5 shrink-0 text-[var(--icon-color)]"/>;
}

const socialLinks = HEADER_SOCIAL_LINKS;

export type NavChild = { label: string; href: string; displayLabel?: string; group?: string; isNew?: boolean };
export type NavItem = { label: string; href: string; displayLabel?: string } | { label: string; href: string; displayLabel?: string; children: readonly NavChild[] };
const HeaderContext = createContext({ navItems: PRIMARY_NAV as readonly NavItem[], ar: false, showTheme: true, ctaHref: '', startLead: () => { window.dispatchEvent(new Event('crea8iv:lead')); } });
type ThemeMode = 'dark' | 'light';

const freeToolCategoryIcons: Record<ToolCategory, ComponentType<{ className?: string }>> = {
  "SEO": SearchCheck,
  "AI Visibility": Sparkles,
  "Local SEO": Building2,
  "Ads": Megaphone,
  "Website": Globe2,
  "ROI": TrendingUp,
  "Healthcare": HeartPulse,
};

const freeToolShortCopy: Record<string, { label: string; summary: string }> = {
  "AI Visibility Checker": { label: "AI Visibility", summary: "Check AI search readiness." },
  "Local SEO Audit Tool": { label: "Local SEO Audit", summary: "Spot local ranking gaps." },
  "Website SEO Audit Tool": { label: "SEO Audit", summary: "Review core SEO signals." },
  "Website Performance / Conversion Checker": { label: "Performance Check", summary: "Find UX and conversion issues." },
  "Marketing ROI Calculator": { label: "Marketing ROI", summary: "Measure spend vs return." },
  "Meta Ads Budget Calculator": { label: "Meta Ads Budget", summary: "Estimate leads and CPL." },
  "Google Ads Budget / ROAS Calculator": { label: "Google Ads Budget", summary: "Forecast clicks and ROAS." },
  "Patient Retention ROI Calculator": { label: "Patient Retention ROI", summary: "Estimate reactivation value." },
  "Website ROI / Lost Leads Calculator": { label: "Website ROI", summary: "Estimate lost lead value." },
  "Schema Markup Generator": { label: "Schema Generator", summary: "Generate clean JSON-LD." },
};

const menuVisuals: Record<string, { image: string; icon: ComponentType<{ className?: string }>; tone: string; description: string }> = {
  "Case Studies": { image: "", icon: FileChartColumn, tone: "Client engagements", description: "Explore the work and delivery behind each client engagement." },
  "Website Portfolio": { image: "", icon: Globe2, tone: "Web development", description: "Explore our website projects." },
  "Social Grids": { image: "", icon: LayoutDashboard, tone: "Social creative", description: "Browse social content and campaign grids." },
  "Clients": { image: "", icon: Users, tone: "Our clients", description: "Meet the brands we work with." },
  "Growth Systems": { image: "/img/services/ad-concepts/growth-system-ad-concept.webp", icon: TrendingUp, tone: "Lead engine", description: "The central system connecting traffic, conversion, automation, and reporting." },
  "Meta Ads": { image: "/img/services/ad-concepts/meta-advertising-ad-concept.webp", icon: Megaphone, tone: "Paid growth", description: "Campaigns for WhatsApp inquiries, lead forms, retargeting, and bookings." },
  "Google Ads": { image: "/img/services/ad-concepts/google-ads-ad-concept.webp", icon: SearchCheck, tone: "Search intent", description: "Capture high-intent buyers already searching for your service." },
  "Google Business Profile": { image: "/img/services/ad-concepts/google-business-profile-ad-concept.webp", icon: Building2, tone: "Local maps", description: "Improve discovery, calls, reviews, and trust in your local market." },
  "Website Development": { image: "/img/services/ad-concepts/website-development-ad-concept.webp", icon: Globe2, tone: "Conversion asset", description: "Fast, mobile-first pages with trust blocks and lead capture." },
  "Social Media Management": { image: "/img/services/ad-concepts/social-media-management-ad-concept.webp", icon: MessageSquareText, tone: "Content engine", description: "Social content, planning, and profile systems." },
  "Content Creation": { image: "/img/services/ad-concepts/content-reels-ad-concept.webp", icon: Clapperboard, tone: "Reels & posts", description: "Campaign-ready content assets and reels." },
  "Branding & Creative": { image: "/img/services/ad-concepts/brand-identity-ad-concept.webp", icon: Palette, tone: "Identity", description: "Brand systems, logos, visual direction, and creative." },
  "Marketing Automation": { image: "/img/services/ad-concepts/ai-automation-ad-concept.webp", icon: Bot, tone: "Follow-up", description: "Lead routing, WhatsApp replies, reminders, and review requests." },
  "AI Search Optimization": { image: "/img/services/ad-concepts/ai-automation-ad-concept.webp", icon: Sparkles, tone: "AEO/GEO", description: "Entity SEO and structured pages for AI search visibility." },
  "AI Answer Briefs": { image: "/img/services/ad-concepts/ai-automation-ad-concept.webp", icon: Sparkles, tone: "Answer pages", description: "AI-ready answer pages and entity trust." },
  "Industries": { image: "/portfolio-optimized/Interiors%20%26%20Architects%20/grid%20preview/coworking%20grid.webp", icon: Building2, tone: "Industry proof", description: "Service systems by business category." },
  "AI Visibility Targets": { image: "/img/services/ad-concepts/ai-automation-ad-concept.webp", icon: Network, tone: "AI targets", description: "AI search visibility goals and action points." },
  "AI Visibility Growth": { image: "/img/services/ad-concepts/ai-automation-ad-concept.webp", icon: Sparkles, tone: "Growth plan", description: "Weekly AI citation tracking, content refresh, authority and lead measurement." },
  "AI Content Roadmap": { image: "/img/services/ad-concepts/growth-system-ad-concept.webp", icon: FileChartColumn, tone: "Content sprint", description: "Priority guides, comparisons, playbooks, and traffic assets for AI citations." },
  "AI Citation Sources": { image: "/img/services/ad-concepts/ai-automation-ad-concept.webp", icon: CheckCircle2, tone: "Source map", description: "Canonical claim-to-source map for accurate AI citations." },
  "Comparisons": { image: "/img/services/ad-concepts/growth-system-ad-concept.webp", icon: FileChartColumn, tone: "Decision guides", description: "Compare channels, platforms, and service paths." },
  "Playbooks": { image: "/img/services/ad-concepts/growth-system-ad-concept.webp", icon: LayoutDashboard, tone: "Execution", description: "Practical growth playbooks." },
  "PatientFlow": { image: "/img/services/ad-concepts/software-development-ad-concept.webp", icon: HeartPulse, tone: "Healthcare", description: "AI-powered clinic operations, patients, appointments, billing, and communication." },
  "ExamFlow": { image: "/img/services/ad-concepts/software-development-ad-concept.webp", icon: GraduationCap, tone: "Education", description: "Digital examination workflows and intelligent paper generation for institutions." },
  "X-Tempora": { image: "/img/client-logos/optimized/extempora.webp", icon: Network, tone: "EdTech", description: "An educational technology ecosystem for institutions and examination teams." },
  "Crea8iv Portal": { image: "/img/crea8iv-white-3d-logo.webp", icon: LayoutDashboard, tone: "Operations", description: "The workflow and automation platform powering Crea8iv Media operations." },
  "Free Tools": { image: "/img/services/ad-concepts/growth-system-ad-concept.webp", icon: SearchCheck, tone: "Growth tools", description: "Free SEO, AI visibility, ads, ROI, schema, and conversion tools for better decisions." },
  "Full Portfolio": { image: "/portfolio-optimized/Interiors%20%26%20Architects%20/grid%20preview/coworking%20grid.webp", icon: BriefcaseBusiness, tone: "Archive", description: "Selected websites and complete social media grids." },
  "Health Clinics": { image: "/portfolio-optimized/Health%20Clinics/Grid%20preview/WhatsApp%20Image%202026-06-28%20at%2012.48.59%20AM.webp", icon: Building2, tone: "Clinics", description: "Healthcare and aesthetic work built around trust and clarity." },
  "Interiors & Architects": { image: "/portfolio-optimized/Interiors%20%26%20Architects%20/grid%20preview/coworking%20grid.webp", icon: ImageIcon, tone: "Spaces", description: "Visual systems and complete social grids." },
  "Restaurants": { image: "/portfolio-optimized/Resturants/grid%20preview/Blaster%20Ramadan%20grid.webp", icon: ImageIcon, tone: "Food", description: "Food brands and complete campaign grids." },
  "E-commerce": { image: "/portfolio-optimized/E%20commerce/Grid%20Preview/WhatsApp%20Image%202026-06-28%20at%201.02.53%20AM.webp", icon: TrendingUp, tone: "Product", description: "Product creative and commerce-focused visual assets." },
  "Brand Guidelines": { image: "/portfolio-optimized/Brand%20Guidlines/dac%20brand%20guildekines.webp", icon: FileChartColumn, tone: "Brand rules", description: "Identity systems, visual direction, and brand consistency work." },
  "Logo & Identity": { image: "/portfolio-optimized/Logo/cre8iv.webp", icon: Sparkles, tone: "Identity", description: "Logo marks and identity explorations from the real archive." },
  "Websites": { image: "/img/services/ad-concepts/website-development-ad-concept.webp", icon: Globe2, tone: "Web", description: "Business pages, landing pages, SEO foundations, and lead capture." },
  "Graphics & Branding": { image: "/img/services/ad-concepts/brand-identity-ad-concept.webp", icon: ImageIcon, tone: "Identity", description: "Logos, brand kits, campaign visuals, grids, and ad creative." },
  "Reels & Video": { image: "/img/services/ad-concepts/content-reels-ad-concept.webp", icon: Clapperboard, tone: "Motion", description: "Short-form content for trust, attention, ads, and retargeting." },
  "Campaigns": { image: "/img/services/ad-concepts/lead-generation-ad-concept.webp", icon: Megaphone, tone: "Growth", description: "Offer, traffic, conversion, follow-up, and weekly reporting." },
  "About Crea8iv": { image: "/img/falcon-mark.webp", icon: Users, tone: "Company", description: "Who we are, what we build, and how we think about growth." },
  "Company Verification": { image: "/img/crea8iv-white-3d-logo.webp", icon: FileChartColumn, tone: "Business", description: "Current business information and contact details." },
  "Our Team": { image: "/assets/syed-qamar-abbas-founder-card.webp", icon: Users, tone: "Team", description: "People behind strategy, creative, and systems." },
  "Syed Qamar Abbas": { image: "/assets/syed-qamar-abbas-founder-card.webp", icon: Users, tone: "Founder", description: "Founder profile, entity page, and leadership trust signal." },
  "Buyer Guides": { image: "/img/services/ad-concepts/growth-system-ad-concept.webp", icon: FileChartColumn, tone: "Guides", description: "Buyer education and planning guides." },
  "Deployment Checklist": { image: "/img/services/ad-concepts/ai-automation-ad-concept.webp", icon: CheckCircle2, tone: "Checklist", description: "AI visibility deployment checklist." },
  "Academy": { image: "/img/services/ad-concepts/ai-automation-ad-concept.webp", icon: GraduationCap, tone: "Learning", description: "Practical digital training." },
  "Consultation": { image: "/img/services/ad-concepts/growth-system-ad-concept.webp", icon: MessageSquareText, tone: "Audit", description: "Start with a focused business audit." },
  "Careers": { image: "/img/services/ad-concepts/software-development-ad-concept.webp", icon: BriefcaseBusiness, tone: "Hiring", description: "Join the Crea8iv Media team." },
  "Contact": { image: "/img/crea8iv-white-3d-logo.webp", icon: Phone, tone: "Contact", description: "Start a conversation with the team." },
};

function normalizePath(value: string) {
  if (value === "/") return "/";
  return value.replace(/\/$/, "");
}

function isNavActive(pathname: string, href: string, children?: readonly NavChild[]) {
  const current = normalizePath(pathname);
  const target = normalizePath(href);
  return current === target || Boolean(children?.some((child) => normalizePath(child.href) === current));
}

function ThemeToggle({
  theme,
  onToggle,
  className,
}: {
  theme: ThemeMode;
  onToggle: () => void;
  className?: string;
}) {
  const isLight = theme === 'light';

  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "theme-toggle-lux group relative inline-flex h-11 min-w-11 shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full px-3 transition-all duration-300 hover:-translate-y-0.5 focus:outline-none xl:min-w-[92px]",
        className
      )}
      data-theme-toggle="true"
      data-mode={theme}
      aria-pressed={isLight}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      title={isLight ? "Dark mode" : "Light mode"}
    >
      <span className="absolute inset-x-2 top-0 h-px bg-gradient-to-r from-transparent via-[#FF6801]/80 to-transparent" />
      {isLight ? (
        <Moon className="relative h-[18px] w-[18px] text-[var(--brand-green)] transition-transform duration-300 group-hover:-rotate-12" aria-hidden="true" />
      ) : (
        <Sun className="relative h-[18px] w-[18px] text-[var(--icon-color)] transition-transform duration-300 group-hover:rotate-45" aria-hidden="true" />
      )}
      <span className="theme-toggle-label relative hidden text-[10px] font-semibold uppercase tracking-[0.12em] xl:inline">
        {isLight ? "Dark" : "Light"}
      </span>
    </button>
  );
}

export default function Header({ navItems=PRIMARY_NAV, homeHref='/', ctaHref='', utility, ar=false, showTheme=true, immersive=false }: { navItems?: readonly NavItem[]; homeHref?: string; ctaHref?: string; utility?: ReactNode; ar?: boolean; showTheme?: boolean; immersive?: boolean }) {
  const startLead = () => { if(ctaHref) window.location.assign(ctaHref); else window.dispatchEvent(new Event('crea8iv:lead')); };
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const pathname = usePathname();
  const closeMobile = useCallback(() => setMobileOpen(false), []);
  const closeTimerRef = useRef<number | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const navigationToggle = useRef<HTMLButtonElement>(null);
  const [scrollHidden, setScrollHidden] = useState(false);
  const [navigationOpen, setNavigationOpen] = useState(false);
  const headerHidden = immersive ? !navigationOpen : scrollHidden && !mobileOpen && !openDropdown;

  // Hold the last scroll direction until the user reverses it or reaches the top.
  useEffect(() => {
    if (immersive) return;
    const root = document.scrollingElement ?? document.documentElement;
    const getScrollY = () => Math.max(0, Math.min(window.scrollY, root.scrollHeight - root.clientHeight));
    let previousY = getScrollY();
    const onScroll = () => {
      const y = getScrollY();
      const delta = y - previousY;
      if (y > 24 && Math.abs(delta) < 3) return;
      previousY = y;
      const focused = document.activeElement;
      const keyboardInHeader = focused?.matches(':focus-visible') && headerRef.current?.contains(focused);
      setScrollHidden(y > 24 && delta > 0 && !keyboardInHeader);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [immersive, pathname]);

  const closeNavigation = useCallback(() => {
    setNavigationOpen(false);
    setMobileOpen(false);
    setOpenDropdown(null);
    navigationToggle.current?.focus();
  }, []);

  function togglePortfolioNavigation() {
    if (navigationOpen || mobileOpen) closeNavigation();
    else if (window.matchMedia('(min-width: 1280px)').matches) setNavigationOpen(true);
    else setMobileOpen(true);
  }

  useEffect(() => {
    if (!immersive) return;
    const desktop = window.matchMedia('(min-width: 1280px)');
    const resetMenu = () => { setMobileOpen(false); setNavigationOpen(false); };
    desktop.addEventListener('change', resetMenu);
    return () => desktop.removeEventListener('change', resetMenu);
  }, [immersive]);

  useEffect(() => {
    if (!immersive || !navigationOpen) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') closeNavigation(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [immersive, navigationOpen, closeNavigation]);

  const applyTheme = useCallback((nextTheme: ThemeMode) => {
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;
    window.localStorage.setItem('crea8iv-theme', nextTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    applyTheme(theme === 'light' ? 'dark' : 'light');
  }, [applyTheme, theme]);

  const cancelDropdownClose = useCallback(() => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const openMenu = useCallback((label: string) => {
    cancelDropdownClose();
    setOpenDropdown(label);
  }, [cancelDropdownClose]);

  const scheduleDropdownClose = useCallback(() => {
    cancelDropdownClose();
    closeTimerRef.current = window.setTimeout(() => setOpenDropdown(null), 420);
  }, [cancelDropdownClose]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    handler(); // Initialize
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    const currentTheme = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
    // The document theme is set before hydration; sync the control without a theme flash.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(currentTheme);
  }, []);

  useEffect(() => () => cancelDropdownClose(), [cancelDropdownClose]);

  // Route changes close transient navigation UI; pathname is the external router state.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setOpenDropdown(null); setMobileOpen(false); setNavigationOpen(false); setScrollHidden(false); }, [pathname]);

  // Keyboard handler for dropdown
  const handleDropdownKeyDown = useCallback((e: React.KeyboardEvent, label: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpenDropdown(openDropdown === label ? null : label);
    } else if (e.key === 'Escape') {
      setOpenDropdown(null);
    } else if (e.key === 'ArrowDown' && openDropdown === label) {
      e.preventDefault();
      const firstLink = document.getElementById(`header-panel-${label.toLowerCase().replace(/\s+/g,'-')}`)?.querySelector('a[href]') as HTMLElement;
      firstLink?.focus();
    }
  }, [openDropdown]);

  // Keyboard handler for dropdown items
  const handleItemKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      const trigger=document.querySelector<HTMLElement>('header button[aria-expanded="true"]');
      trigger?.focus();
      setOpenDropdown(null);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = (e.currentTarget as HTMLElement).nextElementSibling as HTMLElement;
      next?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = (e.currentTarget as HTMLElement).previousElementSibling as HTMLElement;
      prev?.focus();
    }
  }, []);

  return (
    <HeaderContext.Provider value={{navItems, ar, showTheme, ctaHref, startLead}}>
      {immersive && (
        <button ref={navigationToggle} type="button" className={navigationStyles.toggle}
          aria-controls={mobileOpen ? 'mobile-navigation-drawer' : 'site-navigation'} aria-expanded={navigationOpen || mobileOpen}
          aria-label={navigationOpen || mobileOpen ? 'Hide navigation' : 'Show navigation'}
          onClick={togglePortfolioNavigation}>
          {navigationOpen || mobileOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          <span>{navigationOpen || mobileOpen ? 'Close' : 'Menu'}</span>
        </button>
      )}
      <header
        id="site-navigation"
        ref={headerRef}
        data-hidden={headerHidden}
        data-immersive={immersive || undefined}
        inert={immersive && headerHidden ? true : undefined}
        onFocusCapture={() => setScrollHidden(false)}
        data-market={ctaHref && !immersive ? "qatar" : "global"}
        className={cn(
          navigationStyles.header,
          "fixed top-0 left-0 right-0 z-[1000] border-b border-transparent py-2 transition-all duration-300 ease-out",
          scrolled
            ? "bg-[#030303]/72 border-[var(--border-soft)] shadow-[0_18px_60px_-34px_rgba(var(--decorative-rgb),.04),0_18px_55px_-24px_rgba(0,0,0,0.88)] backdrop-blur-xl"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-[1820px] px-4 sm:px-6 lg:px-10">
          <div className="flex h-[68px] items-center justify-between gap-4 lg:h-[78px] xl:gap-6">
            {/* Logo */}
            <Link href={homeHref} className="site-brand-link group relative flex shrink-0 items-center gap-2" aria-label="Crea8iv Media home">
              <div className="absolute inset-x-2 top-1/2 h-10 -translate-y-1/2 rounded-full bg-[#FF6801] opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-20" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/img/crea8iv-header-dark.webp"
                alt="Crea8iv Media"
                width={520}
                height={412}
                className="site-logo-dark relative h-[46px] w-auto object-contain drop-shadow-[0_0_16px_rgba(255,104,1,0.18)] transition-all duration-500 ease-lux group-hover:scale-[1.025] sm:h-[50px] lg:h-[54px]"
                loading="eager"
                decoding="async"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/img/crea8iv-header-light.webp"
                alt="Crea8iv Media light logo"
                width={1024}
                height={1024}
                className="site-logo-light relative h-[54px] w-auto object-contain drop-shadow-[0_8px_18px_rgba(12,84,70,0.12)] transition-all duration-500 ease-lux group-hover:scale-[1.025] sm:h-[58px] lg:h-[62px]"
                loading="eager"
                decoding="async"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="desktop-primary-nav hidden min-w-0 items-center justify-center min-[1280px]:flex flex-1" aria-label="Primary navigation">
              <div
                data-scrolled={scrolled}
                className={cn(
                  "nav-pill nav-pill-lux flex h-[52px] items-center justify-center rounded-full border px-4 backdrop-blur-xl transition-all duration-500 ease-lux xl:px-6",
                  scrolled
                    ? "bg-[#050505]/66 shadow-[0_10px_35px_-22px_rgba(var(--decorative-rgb),.04),inset_0_1px_0_rgba(255,255,255,0.12)] hover:bg-[#070707]/82"
                    : "bg-[#060606]/42 shadow-[0_18px_42px_-28px_rgba(var(--decorative-rgb),.04),inset_0_1px_0_rgba(255,255,255,0.16)] hover:bg-[#070707]/76"
                )}
              >
                <div className="flex w-full flex-nowrap items-center justify-center gap-0.5 text-center xl:gap-1">
                  {navItems.map((link) =>
                    "children" in link ? (
                      <div
                        key={link.displayLabel || link.label}
                        className="relative"
                        onMouseEnter={() => openMenu(link.label)}
                        onMouseLeave={scheduleDropdownClose}
                      >
                        <button
                          data-active={isNavActive(pathname, link.href, link.children) || openDropdown === link.label}
                          aria-controls={`header-panel-${link.label.toLowerCase().replace(/\s+/g,'-')}`}
                          aria-expanded={openDropdown === link.label}
                          onKeyDown={(e) => handleDropdownKeyDown(e, link.label)}
                          onClick={() => openMenu(link.label)}
                          className={cn(
                          "nav-underline nav-link-lux flex whitespace-nowrap items-center gap-1.5 rounded-full px-[12px] py-2.5 font-orbitron text-[10px] font-semibold uppercase tracking-[0.15em] transition-all duration-300 focus:outline-none xl:px-[15px]",
                          isNavActive(pathname, link.href, link.children) || openDropdown === link.label
                            ? 'text-[var(--icon-color)] [text-shadow:0_0_16px_rgba(var(--decorative-rgb),.04)]'
                            : 'text-white/72 hover:text-white'
                        )}>
                          {link.displayLabel || link.label}
                          <ChevronDown className={cn(
                            "w-3 h-3 transition-transform duration-300",
                            openDropdown === link.label ? 'rotate-180 text-[var(--icon-color)]' : 'text-white/50'
                          )} />
                        </button>

                        {openDropdown === link.label && createPortal(
                          <div
                            onMouseEnter={() => openMenu(link.label)}
                            onMouseLeave={scheduleDropdownClose}
                            className={cn(
                              "desktop-dropdown-viewport fixed left-1/2 top-[94px] z-[1001] -translate-x-1/2 pt-3",
                              "w-[min(640px,calc(100vw-24px))]"
                            )}
                          >
                            <MegaDropdown link={link} onItemKeyDown={handleItemKeyDown} />
                          </div>, document.body
                        )}
                      </div>
                    ) : (
                      <Link
                        key={link.displayLabel || link.label}
                        href={link.href}
                        data-active={isNavActive(pathname, link.href)}
                        className={cn(
                          "nav-underline nav-link-lux whitespace-nowrap rounded-full px-[12px] py-2.5 font-orbitron text-[10px] font-semibold uppercase tracking-[0.15em] transition-all duration-300 focus:outline-none xl:px-[15px]",
                          isNavActive(pathname, link.href)
                            ? 'text-[var(--icon-color)] [text-shadow:0_0_16px_rgba(var(--decorative-rgb),.04)]'
                            : 'text-white/72 hover:text-white'
                        )}
                      >
                        {link.displayLabel || link.label}
                      </Link>
                    )
                  )}
                </div>
              </div>
            </nav>

            {/* CTA + Hamburger */}
            <div className="flex items-center justify-end gap-4 shrink-0">
              {utility}
              {showTheme && <ThemeToggle theme={theme} onToggle={toggleTheme} className={pathname === '/' ? "theme-toggle-mobile hero-header-theme" : "theme-toggle-mobile"} />}

              <Magnetic strength={6} className="hidden md:inline-block">
                <button
                  type="button"
                  onClick={startLead}
                  data-qa-event={ctaHref && !immersive ? 'qatar_booking_click' : undefined}
                  className="desktop-cta-lux glow-border group relative inline-flex h-[42px] items-center justify-center gap-1.5 overflow-hidden rounded-full border border-white/24 bg-white/[0.04] px-[16px] font-orbitron text-[9px] font-bold uppercase tracking-[0.14em] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_14px_36px_-28px_rgba(var(--decorative-rgb),.04)] backdrop-blur-xl transition-all duration-300 ease-lux hover:-translate-y-0.5 hover:border-[#FF6801]/55 hover:bg-white/[0.075] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_20px_46px_-28px_rgba(255,104,1,0.9)] xl:px-[18px]"
                >
                  <span className="pointer-events-none absolute top-0 bottom-0 left-0 w-1/2 -translate-x-[180%] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer" />
                  <span className="relative z-10">{ar?'اطلب مراجعة النمو':ctaHref?'Book Growth Audit':'Book Free Growth Audit'}</span>
                  <ArrowUpRight className="relative z-10 h-3 w-3 text-[var(--icon-color)] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </Magnetic>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen((open) => !open)}
                className="mobile-menu-button group relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/18 bg-white/[0.045] text-white/82 shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_12px_30px_-24px_rgba(var(--decorative-rgb),.04)] backdrop-blur-xl transition-all duration-300 hover:border-[#FF6801]/45 hover:text-white focus:outline-none min-[1280px]:hidden"
                aria-label={mobileOpen ? (ar?"إغلاق القائمة":"Close menu") : (ar?"فتح القائمة":"Open menu")}
                aria-expanded={mobileOpen}
                aria-controls="mobile-navigation-drawer"
              >
                {mobileOpen ? <X className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" /> : <Menu className="w-5 h-5 transition-transform duration-300 group-hover:scale-105" />}
              </button>
            </div>
          </div>
        </div>
      </header>


      {/* Mobile Navigation Overlay */}
      {mobileOpen && <MobileNav open={mobileOpen} onClose={closeMobile} theme={theme} onThemeToggle={toggleTheme} />}
    </HeaderContext.Provider>
  );
}

function MegaDropdown({
  link,
  onItemKeyDown,
}: {
  link: Extract<NavItem, { children: readonly NavChild[] }>;
  onItemKeyDown: (e: React.KeyboardEvent) => void;
}) {
  const { startLead, ctaHref, ar } = useContext(HeaderContext);
  if (link.label === "Platforms") {
    return <PlatformsDropdown link={link} onItemKeyDown={onItemKeyDown} />;
  }

  const eyebrow =
    link.label === "Solutions"
      ? "Growth Menu"
      : link.label === "Results"
        ? "Proof Menu"
        : "Company";
  const headline =
    link.label === "Solutions"
      ? "Choose the right growth channel."
      : link.label === "Results"
        ? "Real portfolio assets and proof."
        : "Meet the team and next steps.";

  return (
    <div
      className="nav-dropdown-lux nav-dropdown-readable max-h-[calc(100vh-104px)] overflow-y-auto rounded-[22px] border border-white/14 bg-[#050505] p-2.5 shadow-[0_34px_90px_-30px_rgba(0,0,0,1),0_22px_54px_-38px_rgba(var(--decorative-rgb),.04),inset_0_1px_0_rgba(255,255,255,0.18)]"
      role="region" id={`header-panel-${link.label.toLowerCase().replace(/\s+/g,'-')}`} aria-label={link.displayLabel || link.label}
    >
      <div className="rounded-[17px] border border-white/[0.12] bg-[linear-gradient(135deg,rgba(255,255,255,.105),rgba(255,255,255,.035)_46%,rgba(var(--decorative-rgb),.04))] px-3.5 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="nav-dropdown-kicker text-[8px] font-bold uppercase tracking-[0.18em] text-[var(--icon-color)]">{eyebrow}</p>
            <h3 className="mt-1 text-[13px] font-semibold leading-5 text-white sm:text-[14px]">{ar?(link.label==='Solutions'?'اختر مسار النمو المناسب':link.label==='Results'?'الأعمال والخبرات مع سياق واضح':'تعرّف على الفريق والخطوة التالية'):headline}</h3>
          </div>
          <Link
            href={link.href}
            
            onKeyDown={onItemKeyDown}
            className="group inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[var(--border-soft)] bg-[#FF6801]/12 px-3 py-2 text-[11px] font-semibold text-white/88 transition hover:bg-[#FF6801] hover:text-[#160b05] focus:outline-none"
          >
            {ar?'عرض الكل':'View all'}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>

      <div className="mt-2.5 grid gap-2 sm:grid-cols-2">
        {link.children.map((child) => {
          const visual = menuVisuals[child.label] ?? menuVisuals["Growth Systems"];
          const Icon = visual.icon;
          return (
            <Link
              key={child.displayLabel || child.label}
              href={child.href}
                    data-service-tone={getServiceTone(child.href)}
              
              onKeyDown={onItemKeyDown}
              className="group/item grid min-h-[58px] grid-cols-[48px_1fr_auto] items-center gap-2.5 rounded-[15px] border border-white/[0.1] bg-white/[0.045] p-2 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition duration-150 hover:border-[#FF6801]/52 hover:bg-white/[0.075] focus:border-[#FF6801]/52 focus:bg-white/[0.075] focus:outline-none"
            >
              <span className="nav-service-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--border-soft)] bg-[#FF6801]/10 text-[var(--icon-color)]">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[12.5px] font-semibold leading-[1.4] text-white">{child.displayLabel || child.label}</span>
                <span className="mt-1 block truncate text-[9px] font-bold uppercase tracking-[0.15em] text-[#FF6801]/78">{visual.tone}</span>
              </span>
              <ChevronRight className="mt-1 h-3.5 w-3.5 shrink-0 text-[#FF6801]/30 transition group-hover/item:translate-x-0.5 group-hover/item:text-[#FF6801]" />
            </Link>
          );
        })}
      </div>

      <div className="mt-2.5 flex items-center justify-between gap-3 rounded-[16px] border border-white/[0.1] bg-white/[0.045] px-3 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
        <p className="min-w-0 truncate text-[11px] leading-5 text-white/72">
          {ar?'لست متأكداً من البداية؟ لنحدد الخطوة التالية.':'Not sure what to choose? Start with a quick audit.'}
        </p>
        <button
          type="button"
          onClick={startLead}
                  data-qa-event={ctaHref ? 'qatar_booking_click' : undefined}
          className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full border border-[var(--border-soft)] px-3 py-2 text-[11px] font-semibold text-[var(--icon-color)] transition hover:bg-[#FF6801] hover:text-[#150804]"
        >
          {ar?'طلب مراجعة':'Book audit'} <ArrowUpRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

function FreeToolsDropdown({
  link,
  onItemKeyDown,
}: {
  link: Extract<NavItem, { children: readonly NavChild[] }>;
  onItemKeyDown: (e: React.KeyboardEvent) => void;
}) {
  const groups = TOOL_CATEGORIES.filter((category): category is ToolCategory => category !== "All");

  const { ar } = useContext(HeaderContext);
  return (
    <div
      className="nav-dropdown-lux nav-dropdown-readable max-h-[calc(100vh-104px)] overflow-y-auto rounded-[22px] border border-white/14 bg-[#050505] p-2.5 shadow-[0_34px_90px_-30px_rgba(0,0,0,1),0_22px_54px_-38px_rgba(var(--decorative-rgb),.04),inset_0_1px_0_rgba(255,255,255,0.18)]"
      role="region" id={`header-panel-${link.label.toLowerCase().replace(/\s+/g,'-')}`} aria-label={link.displayLabel || link.label}
    >
      <div className="rounded-[14px] border border-white/[0.12] bg-[linear-gradient(135deg,#18110d,#0b0b0b_48%,#120a05)] px-3.5 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="nav-dropdown-kicker text-[8px] font-bold uppercase tracking-[0.18em] text-[var(--icon-color)]">Free growth stack</p>
            <h3 className="mt-1 text-[12px] font-semibold leading-4 text-white">All free tools in one place.</h3>
          </div>
          <Link
            href="/tools/"
            
            onKeyDown={onItemKeyDown}
            className="group inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[var(--border-soft)] bg-[#FF6801]/12 px-2.5 py-1.5 text-[10px] font-semibold text-white/88 transition hover:bg-[#FF6801] hover:text-[#160b05] focus:outline-none"
          >
            {ar?'عرض الكل':'View all'}
            <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>

      <div className="mt-2 grid gap-1.5 md:grid-cols-3">
        {groups.map((group) => {
          const Icon = freeToolCategoryIcons[group];
          const groupChildren = link.children.filter((child) => "group" in child && child.group === group);

          if (groupChildren.length === 0) {
            return null;
          }

          return (
            <div key={group} className="rounded-[12px] border border-white/[0.1] bg-[#101010] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              <div className="flex items-center gap-1.5 px-1 pb-1.5">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[9px] border border-[var(--border-soft)] bg-[#FF6801]/10 text-[var(--icon-color)]">
                  <Icon className="h-3 w-3" aria-hidden="true" />
                </span>
                <p className="text-[7px] font-bold uppercase tracking-[0.18em] text-[var(--icon-color)]">{group}</p>
              </div>

              <div className="space-y-0.5">
                {groupChildren.map((child) => {
                  const shortCopy = freeToolShortCopy[child.label];

                  return (
                    <Link
                      key={child.displayLabel || child.label}
                      href={child.href}
                    data-service-tone={getServiceTone(child.href)}
                      
                      onKeyDown={onItemKeyDown}
                      className="group/item flex items-center justify-between gap-2 rounded-[10px] px-2 py-1.5 text-left transition duration-150 hover:bg-white/[0.06] focus:bg-white/[0.06] focus:outline-none"
                    >
                      <span className="min-w-0 flex-1 truncate text-[11px] font-semibold leading-4 text-white">
                        {shortCopy?.label ?? child.label}
                      </span>
                      <ChevronRight className="h-3.5 w-3.5 shrink-0 text-white/28 transition group-hover/item:translate-x-0.5 group-hover/item:text-[#FF6801]" aria-hidden="true" />
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PlatformsDropdown({
  link,
  onItemKeyDown,
}: {
  link: Extract<NavItem, { children: readonly NavChild[] }>;
  onItemKeyDown: (e: React.KeyboardEvent) => void;
}) {
  const groups = ["Healthcare", "Business", "Education", "Marketing"] as const;

  return (
    <div
      className="nav-dropdown-lux nav-dropdown-readable max-h-[calc(100vh-104px)] overflow-y-auto rounded-[22px] border border-white/14 bg-[#050505] p-2.5 shadow-[0_34px_90px_-30px_rgba(0,0,0,1),0_22px_54px_-38px_rgba(var(--decorative-rgb),.04),inset_0_1px_0_rgba(255,255,255,0.18)]"
      role="region" id={`header-panel-${link.label.toLowerCase().replace(/\s+/g,'-')}`} aria-label={link.displayLabel || link.label}
    >
      <div className="rounded-[14px] border border-white/[0.12] bg-[linear-gradient(135deg,#18110d,#0b0b0b_48%,#120a05)] px-4 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]">
        <p className="nav-dropdown-kicker text-[8px] font-bold uppercase tracking-[0.18em] text-[var(--icon-color)]">Software ecosystem</p>
        <h3 className="mt-1 text-[14px] font-semibold leading-5 text-white">Intelligent platforms built for real operations.</h3>
      </div>

      <div className="mt-2.5 grid gap-2 sm:grid-cols-2">
        {groups.map((group) => (
          <div key={group} className="rounded-[14px] border border-white/[0.1] bg-[#101010] p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
            <p className="px-1 pb-2 text-[8px] font-bold uppercase tracking-[0.2em] text-[var(--icon-color)]">{group}</p>
            <div className="space-y-1">
              {link.children.filter((child) => "group" in child && child.group === group).map((child) => {
                const visual = menuVisuals[child.label] ?? menuVisuals["Growth Systems"];
                const Icon = visual.icon;
                const external = child.href.startsWith("http");
                return (
                  <Link
                    key={child.displayLabel || child.label}
                    href={child.href}
                    data-service-tone={getServiceTone(child.href)}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    
                    onKeyDown={onItemKeyDown}
                    className="group/item flex min-h-[48px] items-center gap-2.5 rounded-[11px] px-2 py-2 text-left transition duration-150 hover:bg-white/[0.06] focus:bg-white/[0.06] focus:outline-none"
                  >
                    <span className="nav-service-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--border-soft)] bg-[#FF6801]/10 text-[var(--icon-color)]">
                      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1 text-[12px] font-semibold text-white">
                      {child.displayLabel || child.label}
                      {"isNew" in child && child.isNew ? (
                        <span className="ml-2 inline-flex align-middle rounded-full border border-[var(--border-soft)] bg-[#FF6801]/14 px-1.5 py-0.5 font-orbitron text-[7px] font-bold uppercase tracking-[0.12em] text-[var(--icon-color)]">New</span>
                      ) : null}
                    </span>
                    {external ? <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-white/28 transition group-hover/item:text-[#FF6801]" aria-hidden="true" /> : <ChevronRight className="h-3.5 w-3.5 shrink-0 text-white/28 transition group-hover/item:translate-x-0.5 group-hover/item:text-[#FF6801]" aria-hidden="true" />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <Link
        href="/platforms/"
        
        onKeyDown={onItemKeyDown}
        className="group mt-2.5 flex items-center justify-between rounded-[14px] border border-[var(--border-soft)] bg-[#FF6801]/8 px-4 py-3 text-[12px] font-semibold text-white transition hover:border-[#FF6801]/58 hover:bg-[#FF6801]/14 focus:outline-none"
      >
        View All Platforms
        <ArrowUpRight className="h-4 w-4 text-[var(--icon-color)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
      </Link>
    </div>
  );
}

function MobileNav({
  onClose,
  theme,
  onThemeToggle,
}: {
  open: boolean;
  onClose: () => void;
  theme: ThemeMode;
  onThemeToggle: () => void;
}) {
  const { navItems, startLead, ctaHref, showTheme, ar } = useContext(HeaderContext);
  const [expanded, setExpanded] = useState<string | null>(null);
  const pathname = usePathname();

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    const previous=document.activeElement as HTMLElement | null;
    const oldOverflow=document.body.style.overflow;
    const drawer=document.getElementById('mobile-navigation-drawer');
    const focusable=()=>Array.from(drawer?.querySelectorAll<HTMLElement>('a[href],button:not([disabled])')||[]);
    focusable()[0]?.focus();
    const keydown=(e:KeyboardEvent)=>{
      if(e.key==='Escape'){e.preventDefault();onClose();}
      if(e.key==='Tab'){const items=focusable();const first=items[0],last=items[items.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}}
    };
    document.addEventListener('keydown',keydown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = oldOverflow;
      document.removeEventListener('keydown',keydown);previous?.focus();
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[1100] min-[1280px]:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/72 backdrop-blur-md" 
        onClick={onClose} 
      />

      {/* Drawer */}
      <div
        id="mobile-navigation-drawer"
        role="dialog" aria-modal="true" aria-label={ar?"القائمة الرئيسية":"Main menu"}
        className="mobile-lux-drawer isolate absolute bottom-3 right-3 top-3 flex w-[calc(100%-1.5rem)] max-w-[400px] flex-col overflow-y-auto rounded-[30px] border border-white/16 bg-[#070707]/82 shadow-[0_30px_82px_-32px_rgba(0,0,0,0.95),0_0_46px_-28px_rgba(var(--decorative-rgb),.04)] backdrop-blur-xl"
      >
        <div className="relative flex items-center justify-between px-5 pb-4 pt-5">
          <div>
            <p className="font-orbitron text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--icon-color)]">{ar?'القائمة':'Menu'}</p>
            <p className="mt-1 text-xs text-white/50">{ar?'اختر مسار النمو':'Choose a growth path'}</p>
          </div>
          <div className="flex items-center gap-2">
            {showTheme && <ThemeToggle theme={theme} onToggle={onThemeToggle} className="h-11 w-11 min-w-11 px-0" />}
            <button
              onClick={onClose}
              className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/18 bg-white/[0.045] text-white/72 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition-all duration-300 hover:border-[#FF6801]/50 hover:text-white focus:outline-none"
              aria-label={ar?"إغلاق القائمة":"Close menu"}
            >
              <X className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
            </button>
          </div>
        </div>

        <nav className="flex-1 space-y-2 px-5 pb-4" aria-label="Mobile menu">
          {navItems.map((link) =>
            "children" in link ? (
              <div
                key={link.displayLabel || link.label}
              >
                <button
                  onClick={() => setExpanded(expanded === link.label ? null : link.label)}
                  className={cn(
                    "mobile-drawer-item group flex min-h-[54px] w-full items-center justify-between rounded-[18px] border px-4 font-orbitron text-[11.5px] font-semibold uppercase tracking-[0.13em] transition-all duration-300",
                    isNavActive(pathname, link.href, link.children) || expanded === link.label
                      ? "border-[var(--border-soft)] bg-[#FF6801]/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_14px_34px_-28px_rgba(var(--decorative-rgb),.04)]"
                      : "border-white/10 bg-white/[0.035] text-white/76 hover:border-[#FF6801]/30 hover:bg-white/[0.065] hover:text-white"
                  )}
                >
                  <span className="flex items-center gap-3">
                    <span aria-hidden="true"><MobileMenuIcon label={link.label}/></span>
                    {link.displayLabel || link.label}
                  </span>
                  <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", expanded === link.label ? 'rotate-180 text-[var(--icon-color)]' : 'text-white/44')} />
                </button>
                {expanded === link.label && (
                  <div className="overflow-hidden">
                    <div className="mb-1.5 ml-4 mt-1.5 space-y-1 border-l border-[var(--border-soft)] pl-3">
                      {link.children.map((child, childIndex) => {
                        const group = "group" in child ? child.group : undefined;
                        const previousChild = childIndex > 0 ? link.children[childIndex - 1] : undefined;
                        const previousGroup = previousChild && "group" in previousChild ? previousChild.group : undefined;
                        const external = child.href.startsWith("http");
                        const ChildIcon = (menuVisuals[child.label] ?? menuVisuals["Growth Systems"]).icon;
                        return (
                          <div key={child.displayLabel || child.label}>
                            {group && group !== previousGroup ? <p className="px-3 pb-1 pt-2 font-inter text-[8px] font-bold uppercase tracking-[0.2em] text-[var(--icon-color)]">{group}</p> : null}
                            <Link
                              href={child.href}
                    data-service-tone={getServiceTone(child.href)}
                              target={external ? "_blank" : undefined}
                              rel={external ? "noopener noreferrer" : undefined}
                              onClick={onClose}
                              className={cn(
                                "flex items-center justify-between rounded-xl px-3 py-2 font-orbitron text-[10px] uppercase tracking-[0.11em] transition-all duration-300",
                                normalizePath(pathname) === normalizePath(child.href) ? 'bg-[#FF6801]/10 text-[var(--icon-color)] font-semibold' : 'text-white/56 hover:bg-white/[0.055] hover:text-white'
                              )}
                            >
                              <span className="flex min-w-0 items-center gap-2">
                                <ChildIcon className="h-4 w-4 shrink-0 text-[var(--icon-color)]" aria-hidden="true" />
                                {child.displayLabel || child.label}
                                {"isNew" in child && child.isNew ? (
                                  <span className="ml-2 inline-flex align-middle rounded-full border border-[var(--border-soft)] bg-[#FF6801]/14 px-1.5 py-0.5 font-orbitron text-[7px] font-bold uppercase tracking-[0.12em] text-[var(--icon-color)]">New</span>
                                ) : null}
                              </span>
                              {external ? <ArrowUpRight className="h-3.5 w-3.5 text-white/30" /> : <ChevronRight className="h-3.5 w-3.5 text-white/30" />}
                            </Link>
                          </div>
                        );
                      })}
                      {link.label === "Platforms" ? (
                        <Link
                          href="/platforms/"
                          onClick={onClose}
                          className="mt-2 flex items-center justify-between rounded-xl border border-[var(--border-soft)] bg-[#FF6801]/8 px-3 py-2.5 font-orbitron text-[10px] font-semibold uppercase tracking-[0.11em] text-white transition hover:border-[#FF6801]/55 hover:bg-[#FF6801]/14"
                        >
                          <span>View All Platforms</span>
                          <ArrowUpRight className="h-3.5 w-3.5 text-[var(--icon-color)]" aria-hidden="true" />
                        </Link>
                      ) : null}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div
                key={link.displayLabel || link.label}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className={cn(
                    "mobile-drawer-item group flex min-h-[54px] items-center justify-between rounded-[18px] border px-4 font-orbitron text-[11.5px] font-semibold uppercase tracking-[0.13em] transition-all duration-300",
                    isNavActive(pathname, link.href)
                      ? 'border-[var(--border-soft)] bg-[#FF6801]/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_14px_34px_-28px_rgba(var(--decorative-rgb),.04)]'
                      : 'border-white/10 bg-white/[0.035] text-white/76 hover:border-[#FF6801]/30 hover:bg-white/[0.065] hover:text-white'
                  )}
                >
                  <span className="flex items-center gap-3">
                    <span aria-hidden="true"><MobileMenuIcon label={link.label}/></span>
                    {link.displayLabel || link.label}
                  </span>
                  <ChevronRight className="h-4 w-4 text-white/38 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-[#FF6801]" />
                </Link>
              </div>
            )
          )}
        </nav>

        <div className="px-5 pb-5 pt-1">
          <button
            type="button"
            onClick={() => { onClose(); startLead(); }}
            data-qa-event={ctaHref ? 'qatar_booking_click' : undefined}
            className="brand-action group flex h-[52px] w-full items-center justify-center gap-3 rounded-full font-orbitron text-[11px] font-bold uppercase tracking-[0.14em] transition-all duration-300 active:scale-[0.985]"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black/20">
              <ArrowUpRight className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
            {ar?'اطلب مراجعة النمو':ctaHref?'Book Growth Audit':'Start Scaling'}
          </button>

          <div className="my-4 flex items-center gap-3">
            <span className="h-px flex-1 bg-white/10" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF6801] shadow-[0_0_12px_rgba(var(--decorative-rgb),.04)]" />
            <span className="h-px flex-1 bg-white/10" />
          </div>

          <div className="rounded-[20px] border border-white/10 bg-white/[0.035] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
            {[
              { label: 'Call Us', value: BUSINESS_DETAILS.phoneDisplay, href: BUSINESS_DETAILS.phoneHref, icon: Phone },
              { label: 'Email Us', value: BUSINESS_DETAILS.email, href: `mailto:${BUSINESS_DETAILS.email}`, icon: Mail },
              { label: 'Visit Us', value: 'Rawalpindi, Pakistan', href: '/contact', icon: MapPin },
            ].map((item) => {
              const ContactIcon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={item.href.startsWith('/') ? onClose : undefined}
                  className="group flex min-h-[50px] items-center gap-3 rounded-[16px] px-2.5 transition-colors duration-300 hover:bg-white/[0.055]"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[13px] border border-[var(--border-soft)] bg-black/18 text-[var(--icon-color)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                    <ContactIcon className="h-[18px] w-[18px]" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-orbitron text-[9px] uppercase tracking-[0.12em] text-white/42">{item.label}</span>
                    <span className="mt-0.5 block truncate font-orbitron text-[10.5px] text-white/84">{item.value}</span>
                  </span>
                  <ChevronRight className="h-4 w-4 text-white/38 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-[#FF6801]" />
                </Link>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-center gap-4">
            {socialLinks.map((social) => {
              return (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-soft)] bg-white/[0.035] text-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] transition-all duration-300 hover:border-[#FF6801]/55 hover:text-[#FF6801] hover:shadow-[0_10px_24px_-18px_rgba(255,104,1,0.85),inset_0_1px_0_rgba(255,255,255,0.14)]"
                >
                  {ctaHref?<span className="text-[10px]" aria-hidden="true">{social.label.slice(0,2)}</span>:<i className={`${social.icon} text-[17px] leading-none`} aria-hidden />}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
