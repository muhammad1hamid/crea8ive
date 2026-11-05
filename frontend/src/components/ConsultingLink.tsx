'use client';

import type { ReactNode } from 'react';

type Props = {
  href: string; children: ReactNode; contentType: 'article' | 'case_study' | 'founder' | 'service';
  discipline: string; placement: string; intent?: 'learn' | 'evaluate' | 'request_consultation';
};

export default function ConsultingLink({ href, children, contentType, discipline, placement, intent = 'learn' }: Props) {
  return <a href={href} data-consulting-link onClick={() => {
    const analytics = window as Window & { gtag?: (...args: unknown[]) => void };
    // Use one GA transport. Do not also push a GTM custom event or capture query strings.
    analytics.gtag?.('event', 'consulting_referral', {
      source_page: window.location.pathname,
      content_type: contentType,
      consulting_discipline: discipline,
      link_placement: placement,
      destination: href,
      intent,
      transport_type: 'beacon',
    });
  }}>{children}</a>;
}
