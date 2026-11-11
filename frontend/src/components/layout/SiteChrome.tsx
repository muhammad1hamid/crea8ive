"use client";

import { useEffect, type ReactNode } from "react";
import { getLeadAttribution } from '@/lib/lead-attribution';
import "./ambient-surfaces.css";
import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import DeferredSiteWidgets from "@/components/DeferredSiteWidgets";
import DeferredAnalytics, { type PublicTrackingConfig } from "@/components/DeferredAnalytics";
import ImageAltGuard from "@/components/ImageAltGuard";

export default function SiteChrome({ children, tracking }: { children: ReactNode; tracking?: PublicTrackingConfig }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const immersivePortfolio = pathname?.replace(/\/$/, '') === '/results';
  useEffect(() => { if (!isAdmin) getLeadAttribution(); }, [isAdmin]);

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      {!immersivePortfolio && <ScrollProgress />}
      <Header immersive={immersivePortfolio} ctaHref={immersivePortfolio ? '/contact/' : ''} />
      <div id="smooth-wrapper" className="relative z-[1]">
        <div id="smooth-content">
          <div id="main-content" className="min-h-screen" tabIndex={-1}>{children}</div>
          {!immersivePortfolio && <Footer />}
        </div>
      </div>
      <ImageAltGuard />
      {!immersivePortfolio && <DeferredSiteWidgets />}
      <DeferredAnalytics tracking={tracking} />
    </>
  );
}
