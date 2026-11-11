import type { Metadata } from 'next';
import InitialDocumentScript from '@/components/InitialDocumentScript';
import SiteSchema from '@/components/SiteSchema';
import SiteChrome from '@/components/layout/SiteChrome';
import { getPublicTrackingSettings } from '@/lib/admin/store';
import '@/styles/brand-tokens.css';
import '../globals.css';
import '@/styles/site-typography.css';

const isHowrahStandalone = process.env.NEXT_PUBLIC_HOWRAH_STANDALONE === 'true';
const howrahSiteUrl = process.env.NEXT_PUBLIC_HOWRAH_SITE_URL || 'https://antiquewhite-chough-517508.hostingersite.com';
const crea8ivSearchPreview = 'https://crea8ivmedia.com/img/crea8iv-search-preview.png';

const themeBootstrapScript = `
  (function () {
    try {
      var saved = window.localStorage.getItem('crea8iv-theme');
      var theme = saved === 'light' || saved === 'dark' ? saved : 'dark';
      document.documentElement.dataset.theme = theme;
      document.documentElement.style.colorScheme = theme;
    } catch (error) {
      document.documentElement.dataset.theme = 'dark';
      document.documentElement.style.colorScheme = 'dark';
    }
  })();
`;

export const metadata: Metadata = {
  metadataBase: new URL(isHowrahStandalone ? howrahSiteUrl : 'https://crea8ivmedia.com'),
  title: {
    default: isHowrahStandalone ? 'Howrah Shah Portfolio' : 'Digital Marketing Agency Rawalpindi | Crea8iv Media',
    template: isHowrahStandalone ? '%s' : '%s | Crea8iv Media',
  },
  description:
    isHowrahStandalone
      ? "Howrah Shah's individual creative portfolio for graphic design, reels, shoots, social media, Meta Ads and AI-assisted content."
      : 'Crea8iv Media is a results-driven digital marketing agency in Rawalpindi. We build lead generation systems using GMB, Meta Ads, Google Ads & AI automation.',
  keywords: isHowrahStandalone
    ? ['Howrah Shah portfolio', 'graphic designer', 'reel editor', 'social media manager', 'Meta Ads', 'AI content creator']
    : ['digital marketing', 'rawalpindi', 'islamabad', 'meta ads', 'google ads', 'SEO', 'social media management'],
  openGraph: {
    type: 'website',
    locale: 'en_PK',
    url: isHowrahStandalone ? howrahSiteUrl : 'https://crea8ivmedia.com',
    siteName: isHowrahStandalone ? 'Howrah Shah Portfolio' : 'Crea8iv Media',
    images: [
      {
        url: isHowrahStandalone
          ? `${howrahSiteUrl.replace(/\/$/, '')}/portfolio-optimized/Logo/hs%20logo.webp`
          : crea8ivSearchPreview,
        width: 1200,
        height: isHowrahStandalone ? 1200 : 630,
        alt: isHowrahStandalone ? 'Howrah Shah Portfolio' : 'Crea8iv Media logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: isHowrahStandalone ? undefined : [crea8ivSearchPreview],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  if (isHowrahStandalone) {
    return (
      <html lang="en" data-theme="dark" suppressHydrationWarning>
        <head>
          <InitialDocumentScript source={themeBootstrapScript} />
          <link rel="icon" href="/favicon.ico" sizes="32x32" />
        </head>
        <body className="antialiased">
          <main className="min-h-screen">{children}</main>
        </body>
      </html>
    );
  }

  const tracking = await getPublicTrackingSettings();
  const gtmId = tracking.googleTagManagerId?.trim() || process.env.NEXT_PUBLIC_GTM_ID || 'GTM-54X5M7K3';

  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <InitialDocumentScript source={themeBootstrapScript} />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#030303" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#FCFAEE" />
        {/* Heavy analytics are injected by DeferredAnalytics after idle/user intent. */}
        {/* Resource hints — kept to 3 preconnect + 1 dns-prefetch (≤4 total)
            because PSI warns ">4 preconnects". Dropped the duplicate
            dns-prefetch for hosts we already preconnect to and lottiefiles
            (rarely loaded above the fold). */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="ai-catalog" href="/.well-known/ai-catalog.json" type="application/ai-catalog+json" />
        {/* Analytics stubs only — tiny inline queues so no event is lost. GA4
            initializes after hydration; the heavier marketing scripts remain
            deferred by DeferredAnalytics. */}
        <InitialDocumentScript source={`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
            `} />
        <InitialDocumentScript source={`
              !function(f){if(f.fbq)return;var n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[]}(window);
            `} />
        <SiteSchema />
        <meta name="p:domain_verify" content="c179487d20076357518abbf90129eaf8" />
        {/* Feed discovery for feed readers / Pinterest / crawlers — see
            src/lib/rss.ts and src/app/rss.xml/route.ts. */}
        <link rel="alternate" type="application/rss+xml" title="Crea8iv Media Blog RSS Feed" href="/rss.xml" />
        <link
          rel="icon"
          href="/favicon.ico"
          sizes="32x32"
        />
      </head>
      <body className="antialiased">
        {/* Google Tag Manager (noscript) — immediately after opening <body>. */}
        {gtmId ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
              title="Google Tag Manager"
            />
          </noscript>
        ) : null}
        {/* End Google Tag Manager (noscript) */}
        <SiteChrome tracking={tracking}>{children}</SiteChrome>
      </body>
    </html>
  );
}
