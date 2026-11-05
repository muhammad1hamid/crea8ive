'use client';

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics-events";
import { Bot } from "lucide-react";

/**
 * Mobile sticky conversion bar — one-tap WhatsApp + Book Call.
 *
 * Design-safe & non-redundant by intent:
 *  • Mobile only (`lg:hidden`) — desktop already has the persistent header CTA.
 *  • Slides up only AFTER the hero (scrollY > 560) so it never competes with the
 *    hero's own CTAs or covers the first paint.
 *  • Sits at bottom-0 (z-90); the VoiceAssistant floats at bottom-[90px] (z-95),
 *    so the two never overlap.
 *  • Dismissible, remembered for the session.
 */

const WHATSAPP_URL =
  "https://wa.me/923135147935?text=" +
  encodeURIComponent("Hi Crea8iv Media — I'd like to discuss a project.");

export default function StickyCTA() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(() => {
    try {
      return sessionStorage.getItem("crea8iv_cta_dismissed") === "1";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 560);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dismiss = () => {
    setDismissed(true);
    window.dispatchEvent(new Event("crea8iv:quick-contact-dismissed"));
    try {
      sessionStorage.setItem("crea8iv_cta_dismissed", "1");
    } catch {
      /* ignore */
    }
  };

  if (dismissed || pathname === "/howrahshah" || pathname === "/howrahshah/") return null;

  return (
    <div
      className={`lg:hidden fixed inset-x-0 bottom-0 z-[90] print:hidden transition-transform duration-300 ease-out ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      role="region"
      data-quick-contact="true"
      aria-label="Quick contact"
    >
      <div className="flex items-stretch gap-2 border-t border-[var(--border-soft)] bg-[var(--surface-solid)] px-3 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] backdrop-blur-xl">
        {/* WhatsApp — one tap, no widget to open */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("whatsapp_clicked", { location: "mobile_sticky_cta" })}
          className="flex min-h-11 min-w-0 flex-1 items-center justify-center gap-1 min-[360px]:gap-2 rounded-full border border-[var(--border-interactive)] bg-[var(--surface-1)] py-3 font-orbitron text-[10px] min-[360px]:text-[12px] font-semibold uppercase tracking-[0.1em] text-[var(--text-primary)] transition-colors active:scale-[0.98]"
        >
          <svg className="h-4 w-4 fill-[#25D366]" viewBox="0 0 24 24" aria-hidden>
            <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.87 1.22 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35z" />
            <path d="M12 0C5.37 0 0 5.37 0 12c0 2.13.56 4.12 1.53 5.85L.06 23.45a.5.5 0 00.64.53l5.8-1.52A11.94 11.94 0 0012 24c6.63 0 12-5.37 12-12S18.63 0 12 0zm0 21.82c-1.82 0-3.6-.49-5.06-1.4l-.36-.22-3.75.98 1-3.66-.24-.38A9.82 9.82 0 012.18 12C2.18 6.57 6.57 2.18 12 2.18S21.82 6.57 21.82 12 17.43 21.82 12 21.82z" />
          </svg>
          WhatsApp
        </a>

        {/* Book Call — opens the multi-step lead qualifier */}
        <button
          onClick={() => {
            trackEvent("cta_clicked", { location: "mobile_sticky_cta", button_text: "Book Call" });
            window.dispatchEvent(new CustomEvent("crea8iv:lead", { detail: { source: "mobile_sticky_cta" } }));
          }}
          className="brand-action flex min-h-11 min-w-0 flex-1 items-center justify-center gap-1 min-[360px]:gap-2 rounded-full py-3 font-orbitron text-[10px] min-[360px]:text-[12px] font-semibold uppercase tracking-[0.1em] transition-transform active:scale-[0.98]"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h2.28a1 1 0 01.95.68l1.2 3.59a1 1 0 01-.27 1.06l-1.6 1.6a16 16 0 006.18 6.18l1.6-1.6a1 1 0 011.06-.27l3.59 1.2a1 1 0 01.68.95V19a2 2 0 01-2 2h-1C9.72 21 3 14.28 3 6V5z" />
          </svg>
          Book Call
        </button>

        <button type="button" aria-label="Open Crea8iv Media assistant" title="Open assistant" onClick={() => window.dispatchEvent(new Event("crea8iv:assistant-open"))} className="grid min-h-11 w-11 shrink-0 place-items-center rounded-full border border-[var(--border-interactive)] text-[var(--text-primary)]"><Bot size={20} aria-hidden="true" /></button>

        {/* Dismiss */}
        <button
          onClick={dismiss}
          aria-label="Dismiss quick contact bar"
          className="grid min-h-11 w-11 shrink-0 place-items-center rounded-full text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
