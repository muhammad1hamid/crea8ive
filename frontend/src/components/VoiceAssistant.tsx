'use client';

import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics-events";

/**
 * Crea8iv Media — AI Voice Assistant (digital front-desk).
 * Welcomes visitors, speaks a fixed intro (Web Speech API, with optional
 * pre-generated premium MP3), and routes them to: a custom strategy/proposal
 * (portal), WhatsApp, or View Our Work. It never collects data, never uses the
 * microphone, and never starts a chat.
 */

// Optional premium voice. Configure a real public URL when the asset exists;
// otherwise use browser speech without generating a site-wide 404 request.
const PREMIUM_AUDIO_SRC = process.env.NEXT_PUBLIC_PREMIUM_AUDIO_SRC || "";

const WHATSAPP_URL =
  "https://wa.me/923135147935?text=" +
  encodeURIComponent("Hi Crea8iv Media — I'd like to discuss a project.");
const PORTAL_URL = "https://portal.crea8ivmedia.com";
const WORK_URL = "/results";

const SCRIPT = `Welcome to Crea8iv Media. We help businesses grow through digital marketing, custom software development, A.I. automation, branding, websites, mobile applications, S.E.O., Google Ads, Meta Ads, social media management, and business growth solutions. Whether you need more leads, more sales, better visibility, or a custom software solution to streamline your operations, our team is here to help. To get started, please choose one of the options below. Get a custom strategy and proposal through our client portal, and submit your project requirements. Or connect directly with our team on WhatsApp for immediate assistance. We're excited to help grow your business.`;

type AnalyticsEvent =
  | "assistant_widget_opened"
  | "assistant_voice_played"
  | "assistant_create_account_click"
  | "assistant_whatsapp_click"
  | "assistant_view_work_click";

function track(event: AnalyticsEvent) {
  if (typeof window === "undefined") return;
  trackEvent(event, { event_category: "voice_assistant" });
  window.dispatchEvent(new CustomEvent("crea8iv:analytics", { detail: { event } }));
}

function pickVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis?.getVoices() || [];
  if (!voices.length) return null;
  // Prefer high-quality LOCAL voices first (no network dependency, never fail
  // silently), then well-known remote neural voices, then any English voice.
  const preferred = [
    "Samantha", "Alex", "Daniel", "Karen", "Moira",
    "Google US English",
    "Microsoft Aria Online (Natural) - English (United States)",
    "Microsoft Jenny Online (Natural)", "Microsoft Guy Online (Natural)",
  ];
  for (const name of preferred) {
    const v = voices.find((x) => x.name === name);
    if (v) return v;
  }
  return (
    voices.find((v) => v.lang === "en-US" && v.localService) ||
    voices.find((v) => v.lang === "en-US") ||
    voices.find((v) => v.lang.startsWith("en")) ||
    voices[0]
  );
}

export default function VoiceAssistant() {
  const pathname = usePathname();
  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => {
    const hero = document.querySelector('.premium-hero');
    if (!hero || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting));
    observer.observe(hero);
    return () => observer.disconnect();
  }, [pathname]);
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(() => {
    try {
      return sessionStorage.getItem("crea8iv_assistant_dismissed") === "1";
    } catch {
      return false;
    }
  });
  const [speaking, setSpeaking] = useState(false);
  const [muted, setMuted] = useState(() => {
    try {
      const saved = localStorage.getItem("crea8iv_muted");
      return saved === null ? true : saved === "1";
    } catch {
      return true;
    }
  });
  const [hasPremium, setHasPremium] = useState(false);
  const [mobileVisible, setMobileVisible] = useState(false);
  const [contactDismissed, setContactDismissed] = useState(() => {
    try { return sessionStorage.getItem("crea8iv_cta_dismissed") === "1"; } catch { return false; }
  });
  useEffect(() => {
    const onDismiss = () => setContactDismissed(true);
    window.addEventListener("crea8iv:quick-contact-dismissed", onDismiss);
    return () => window.removeEventListener("crea8iv:quick-contact-dismissed", onDismiss);
  }, []);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);
  const startedRef = useRef(false);
  const keepAliveRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (PREMIUM_AUDIO_SRC) {
      fetch(PREMIUM_AUDIO_SRC, { method: "HEAD" })
        .then((r) => setHasPremium(r.ok))
        .catch(() => setHasPremium(false));
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setMobileVisible(window.scrollY > 560);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const stopSpeaking = useCallback(() => {
    if (keepAliveRef.current) { clearInterval(keepAliveRef.current); keepAliveRef.current = null; }
    try {
      window.speechSynthesis?.cancel();
    } catch {
      /* ignore */
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    startedRef.current = false;
    setSpeaking(false);
  }, []);

  const speak = useCallback(() => {
    if (muted) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Premium pre-generated MP3 path.
    if (hasPremium) {
      try {
        const audio = audioRef.current ?? new Audio(PREMIUM_AUDIO_SRC);
        audioRef.current = audio;
        if (!audio.paused) return; // already playing
        audio.addEventListener("play", () => {
          startedRef.current = true;
          setSpeaking(true);
          track("assistant_voice_played");
        }, { once: true });
        audio.addEventListener("ended", () => setSpeaking(false), { once: true });
        audio.play().catch(() => {});
        return;
      } catch {
        /* fall through to TTS */
      }
    }

    // Web Speech API path.
    const synth = window.speechSynthesis;
    if (!synth) return;
    // Source of truth: if audio is already in progress, don't restart it.
    if (synth.speaking || synth.pending) { startedRef.current = true; return; }

    const utter = new SpeechSynthesisUtterance(SCRIPT);
    utterRef.current = utter; // keep a ref so Chrome doesn't GC it mid-speech
    const v = pickVoice();
    if (v) utter.voice = v;
    utter.lang = v?.lang || "en-US";
    utter.rate = reduce ? 1 : 0.96;
    utter.pitch = 1;
    utter.volume = 1;
    const clearKeepAlive = () => {
      if (keepAliveRef.current) { clearInterval(keepAliveRef.current); keepAliveRef.current = null; }
    };
    utter.onstart = () => { startedRef.current = true; setSpeaking(true); track("assistant_voice_played"); };
    utter.onend = () => { setSpeaking(false); clearKeepAlive(); };
    utter.onerror = () => { setSpeaking(false); clearKeepAlive(); };

    try { synth.speak(utter); } catch { /* ignore */ }

    // onstart is unreliable in Chrome — drive the UI off synth.speaking, and run
    // a keepalive that also resumes long utterances (Chrome cuts them off ~15s).
    clearKeepAlive();
    keepAliveRef.current = setInterval(() => {
      try {
        if (synth.speaking) { startedRef.current = true; setSpeaking(true); synth.resume(); }
        else if (!synth.pending) { setSpeaking(false); clearKeepAlive(); }
      } catch { /* ignore */ }
    }, 800);
  }, [muted, hasPremium]);

  useEffect(() => {
    // Play the welcome on the FIRST user interaction anywhere (browsers block
    // audio before a gesture). The collapsed launcher then SIGNALS it's speaking
    // — the panel does NOT pop open automatically. Clicking the launcher opens it.
    if (dismissed || muted) return;
    const onFirstGesture = () => {
      if (!dismissed && !muted && !startedRef.current) speak();
      cleanup();
    };
    const cleanup = () => {
      window.removeEventListener("pointerdown", onFirstGesture);
      window.removeEventListener("keydown", onFirstGesture);
      window.removeEventListener("touchstart", onFirstGesture);
    };
    window.addEventListener("pointerdown", onFirstGesture);
    window.addEventListener("keydown", onFirstGesture);
    window.addEventListener("touchstart", onFirstGesture);
    return cleanup;
  }, [dismissed, muted, speak]);

  const handleOpen = () => {
    setOpen(true);
    track("assistant_widget_opened");
    speak(); // direct user gesture — reliably starts the voice
  };

  useEffect(() => {
    const openFromDock = () => {
      setOpen(true);
      track("assistant_widget_opened");
      speak();
    };
    window.addEventListener("crea8iv:assistant-open", openFromDock);
    return () => window.removeEventListener("crea8iv:assistant-open", openFromDock);
  }, [speak]);

  const handleClose = () => {
    setOpen(false);
    stopSpeaking();
    setDismissed(true);
    try {
      sessionStorage.setItem("crea8iv_assistant_dismissed", "1");
    } catch {
      /* ignore */
    }
  };

  const toggleMute = () => {
    setMuted((m) => {
      const next = !m;
      if (next) stopSpeaking();
      try { localStorage.setItem("crea8iv_muted", next ? "1" : "0"); } catch { /* ignore */ }
      return next;
    });
  };

  const replay = () => {
    stopSpeaking();
    setMuted(false);
    speak();
  };

  return (
    <div
      data-assistant-root="true"
      className={`fixed bottom-[90px] right-3 z-[1150] print:hidden transition-[opacity,transform] duration-300 sm:right-5 lg:bottom-7 lg:right-7 ${!open && !contactDismissed ? 'max-lg:hidden' : ''} ${heroVisible && !open ? '!hidden' : ''} ${
        mobileVisible ? "max-lg:translate-y-0 max-lg:opacity-100" : "max-lg:pointer-events-none max-lg:translate-y-3 max-lg:opacity-0"
      }`}
      aria-live="polite"
    >
      {!open && (
        <div className="relative flex items-center justify-end">
          {/* Hint / speaking signal label */}
          {speaking && <span className="va-hint pointer-events-none absolute right-[74px] hidden sm:inline whitespace-nowrap rounded-full border border-[#FF6801]/40 bg-[#050505]/90 px-3 py-1.5 font-orbitron text-[10px] uppercase tracking-[0.1em] text-white/85 backdrop-blur-md shadow-glow-sm">Speaking…</span>}

          <button
            onClick={handleOpen}
            aria-label="Open Crea8iv Media assistant"
            className="va-launcher group relative grid h-12 w-12 place-items-center rounded-full border border-[#FF6801]/60 bg-[#050505]/90 shadow-glow backdrop-blur-xl transition-transform duration-300 ease-lux hover:scale-105 sm:h-16 sm:w-16"
          >
            {/* idle invitation ring */}
            <span className="pointer-events-none absolute inset-0 rounded-full border border-[#FF6801]/40 va-ring" />
            {/* extra speaking pulses */}
            {speaking && (
              <>
                <span className="pointer-events-none absolute inset-0 rounded-full border border-[#FF6801]/60 va-pulse" />
                <span className="pointer-events-none absolute inset-0 rounded-full border border-[#FF6801]/40 va-pulse" style={{ animationDelay: "0.45s" }} />
              </>
            )}
            <RobotMark className="h-7 w-7 sm:h-9 sm:w-9" speaking={speaking} />
            {/* Badge: sound-wave bars while speaking, otherwise "AI" */}
            {speaking ? (
              <span className="absolute -top-1 -right-1 flex h-5 items-center gap-[2px] rounded-full bg-[#FF6801] px-1.5">
                <span className="va-bar" />
                <span className="va-bar" style={{ animationDelay: "0.15s" }} />
                <span className="va-bar" style={{ animationDelay: "0.3s" }} />
              </span>
            ) : (
              <span className="absolute -top-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-[#FF6801] text-[10px] font-bold text-white">
                AI
              </span>
            )}
          </button>
        </div>
      )}

      {open && (
        <>
          {/* Mobile backdrop */}
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] lg:hidden" onClick={handleClose} />
          <div
            role="dialog"
            aria-label="Crea8iv Media welcome"
            className="va-panel fixed inset-x-0 bottom-0 z-[105] lg:absolute lg:inset-auto lg:bottom-0 lg:right-0 w-full lg:w-[330px] max-w-full lg:max-w-[calc(100vw-2.5rem)] overflow-hidden rounded-t-[32px] lg:rounded-[24px] rounded-b-none lg:rounded-b-[24px] border-t border-[#FF6801]/35 lg:border bg-[#080808]/98 lg:bg-[#080808]/95 shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.8),0_0_30px_rgba(255,104,1,0.2)] lg:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8),0_0_30px_rgba(255,104,1,0.2)] backdrop-blur-2xl"
          >
          <div className="relative flex flex-col items-center px-6 pt-7 pb-5">
            <button
              onClick={handleClose}
              aria-label="Close assistant"
              className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="relative grid h-20 w-20 place-items-center">
              {speaking && (
                <>
                  <span className="absolute inset-0 rounded-full border border-[#FF6801]/50 va-pulse" />
                  <span className="absolute inset-0 rounded-full border border-[#FF6801]/30 va-pulse" style={{ animationDelay: "0.4s" }} />
                </>
              )}
              <div className="grid h-20 w-20 place-items-center rounded-full border border-[#FF6801]/40 bg-[#0d0d0d] va-breathe">
                <RobotMark className="h-12 w-12" speaking={speaking} />
              </div>
            </div>

            <h3 className="mt-4 font-orbitron text-[15px] font-bold uppercase tracking-[0.12em] text-white">
              Crea8iv Media
            </h3>
            <p className="mt-1 text-center font-inter text-[12.5px] leading-snug text-white/55">
              {speaking ? "Speaking…" : "Your digital growth partner — marketing, software & AI."}
            </p>
          </div>

          <div className="space-y-2.5 px-5 pb-4">
            <a
              href={PORTAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("assistant_create_account_click")}
              className="group flex items-center justify-center gap-2 rounded-2xl bg-molten px-5 py-3 text-center font-orbitron text-[11px] font-semibold uppercase leading-tight tracking-[0.1em] text-white shadow-glow transition-all duration-300 ease-lux hover:-translate-y-0.5 hover:shadow-glow-lg active:scale-[0.98]"
            >
              Get a Custom Strategy &amp; Proposal
              <svg className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("assistant_whatsapp_click")}
              className="flex items-center justify-center gap-2 rounded-full border border-[#25D366]/50 bg-[#25D366]/10 px-5 py-3 font-orbitron text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-all duration-300 ease-lux hover:border-[#25D366] hover:bg-[#25D366]/20 active:scale-[0.98]"
            >
              <svg className="h-4 w-4 fill-[#25D366]" viewBox="0 0 24 24">
                <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.87 1.22 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35z" />
                <path d="M12 0C5.37 0 0 5.37 0 12c0 2.13.56 4.12 1.53 5.85L.06 23.45a.5.5 0 00.64.53l5.8-1.52A11.94 11.94 0 0012 24c6.63 0 12-5.37 12-12S18.63 0 12 0zm0 21.82c-1.82 0-3.6-.49-5.06-1.4l-.36-.22-3.75.98 1-3.66-.24-.38A9.82 9.82 0 012.18 12C2.18 6.57 6.57 2.18 12 2.18S21.82 6.57 21.82 12 17.43 21.82 12 21.82z" />
              </svg>
              Chat on WhatsApp
            </a>

            <a
              href={WORK_URL}
              onClick={() => track("assistant_view_work_click")}
              className="flex items-center justify-center gap-2 rounded-full border border-white/15 bg-transparent px-5 py-3 font-orbitron text-[11px] font-semibold uppercase tracking-[0.12em] text-white/85 transition-all duration-300 ease-lux hover:border-[#FF6801] hover:text-[#FF6801] active:scale-[0.98]"
            >
              View Our Work
            </a>
          </div>

          <div className="flex items-center justify-between border-t border-white/[0.06] px-5 py-3">
            <button
              onClick={toggleMute}
              className="flex items-center gap-1.5 font-inter text-[11px] text-white/65 transition-colors hover:text-white/90"
            >
              {muted ? (
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15zM17 14l4-4m0 4l-4-4" /></svg>
              ) : (
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
              )}
              {muted ? "Voice off" : "Voice on"}
            </button>
            <button
              onClick={replay}
              className="flex items-center gap-1.5 font-inter text-[11px] text-white/65 transition-colors hover:text-[#FF6801]"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              Replay intro
            </button>
          </div>
        </div>
        </>
      )}
    </div>
  );
}

function RobotMark({ className, speaking }: { className?: string; speaking: boolean }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden>
      <rect x="14" y="20" width="36" height="30" rx="12" fill="#111" stroke="#FF6801" strokeWidth="2" />
      <circle cx="32" cy="12" r="3" fill="#FF6801" />
      <line x1="32" y1="15" x2="32" y2="20" stroke="#FF6801" strokeWidth="2" />
      <circle cx="25" cy="33" r="4" fill="#FF6801" className={speaking ? "va-eye" : ""} />
      <circle cx="39" cy="33" r="4" fill="#FF6801" className={speaking ? "va-eye" : ""} />
      <rect x="26" y="42" width="12" height="3" rx="1.5" fill="#FF6801" className={speaking ? "va-mouth" : ""} />
    </svg>
  );
}
