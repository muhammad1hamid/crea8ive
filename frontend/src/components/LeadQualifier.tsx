'use client';

import { useCallback, useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics-events";

/**
 * Multi-step lead qualifier (Phase 2 conversion upgrade).
 *
 * Opens as a MODAL (zero existing-layout change) on the global window event
 * "crea8iv:lead". Collects service + budget + contact, then hands a structured,
 * pre-qualified message to WhatsApp — no backend needed, fits the WhatsApp-first
 * funnel. A qualified lead beats a raw "contact us" click.
 *
 * Trigger from anywhere:  window.dispatchEvent(new Event("crea8iv:lead"))
 */

const WHATSAPP_NUMBER = "923135147935";

const SERVICES = [
  "Meta Ads (Facebook/Instagram)",
  "Google Ads",
  "Google Business / Local SEO",
  "Social Media Management",
  "Website Development",
  "Branding & Creative",
  "PatientFlow for Clinics",
  "Custom Software / AI Automation",
  "Not sure — need advice",
];

const BUDGETS = [
  "Under PKR 30,000/mo",
  "PKR 30,000–75,000/mo",
  "PKR 75,000–150,000/mo",
  "PKR 150,000+/mo",
  "Not sure yet",
];

const BUSINESS_TYPES = [
  "Clinic / Healthcare",
  "Restaurant / Cafe",
  "Real Estate / Construction",
  "E-commerce",
  "Salon / Aesthetic brand",
  "Professional services",
  "Other local business",
];

const URGENCY = [
  "This week",
  "This month",
  "Next 2–3 months",
  "Researching options",
];

type Data = {
  services: string[];
  budget: string;
  businessType: string;
  urgency: string;
  challenge: string;
  name: string;
  business: string;
  phone: string;
  website: string;
};

type InitialOpenRequest = {
  id: number;
  source?: string;
} | null;

const EMPTY: Data = {
  services: [],
  budget: "",
  businessType: "",
  urgency: "",
  challenge: "",
  name: "",
  business: "",
  phone: "",
  website: "",
};

export default function LeadQualifier({ initialOpenRequest }: { initialOpenRequest?: InitialOpenRequest }) {
  const [open, setOpen] = useState(() => Boolean(initialOpenRequest));
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Data>(EMPTY);
  const panelRef = useRef<HTMLDivElement>(null);

  const openQualifier = useCallback((source?: string) => {
    setData(EMPTY);
    setStep(0);
    setOpen(true);
    trackEvent("lead_qualifier_opened", { source: source ?? "unknown" });
  }, []);

  useEffect(() => {
    if (!initialOpenRequest) return;
    trackEvent("lead_qualifier_opened", { source: initialOpenRequest.source ?? "unknown" });
  }, [initialOpenRequest]);

  // Open on global event; reset to a fresh funnel each time.
  useEffect(() => {
    const onOpen = (event: Event) => {
      const source = event instanceof CustomEvent ? event.detail?.source : undefined;
      openQualifier(source);
    };
    window.addEventListener("crea8iv:lead", onOpen);
    return () => window.removeEventListener("crea8iv:lead", onOpen);
  }, [openQualifier]);

  const close = useCallback(() => setOpen(false), []);

  // Esc to close + lock background scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Move focus into the panel for screen readers / keyboard users.
    requestAnimationFrame(() => panelRef.current?.focus());
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close]);

  const set = (patch: Partial<Data>) => setData((d) => ({ ...d, ...patch }));

  const toggleService = (s: string) =>
    setData((d) => ({
      ...d,
      services: d.services.includes(s) ? d.services.filter((x) => x !== s) : [...d.services, s],
    }));

  const TOTAL = 4; // step 0: services, 1: budget/type, 2: urgency/challenge, 3: details
  const canNext =
    step === 0
      ? data.services.length > 0
      : step === 1
        ? !!data.budget && !!data.businessType
        : step === 2
          ? !!data.urgency
          : data.name.trim().length > 1;

  const goNext = () => {
    if (!canNext) return;
    trackEvent("lead_qualifier_step_completed", {
      step_number: step + 1,
      step_name: ["services", "budget_business_type", "urgency_challenge", "contact"][step],
      service_count: data.services.length,
      budget: data.budget,
      business_type: data.businessType,
      urgency: data.urgency,
    });
    setStep((s) => s + 1);
  };

  const submit = () => {
    const lines = [
      "Hi Crea8iv Media! I'd like a strategy call.",
      `• Services: ${data.services.join(", ")}`,
      `• Budget: ${data.budget}`,
      data.businessType ? `• Business type: ${data.businessType}` : "",
      data.urgency ? `• Urgency: ${data.urgency}` : "",
      data.challenge.trim() ? `• Main challenge: ${data.challenge}` : "",
      `• Name: ${data.name}`,
      data.business.trim() ? `• Business: ${data.business}` : "",
      data.phone.trim() ? `• Phone: ${data.phone}` : "",
      data.website.trim() ? `• Website/social: ${data.website}` : "",
    ].filter(Boolean);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
    trackEvent("lead_qualifier_submitted", {
      event_category: "lead",
      service_count: data.services.length,
      budget: data.budget,
      business_type: data.businessType,
      urgency: data.urgency,
      has_website: Boolean(data.website.trim()),
    });
    window.open(url, "_blank", "noopener,noreferrer");
    close();
  };

  return (
    <>
      {open ? (
        <div className="lead-qualifier-shell fixed inset-0 z-[120] flex items-end justify-center sm:items-center print:hidden">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={close} aria-hidden />

          {/* Panel */}
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Book a strategy call"
            tabIndex={-1}
            className="lead-qualifier-panel relative w-full sm:w-[460px] max-w-full sm:max-w-[calc(100vw-2rem)] overflow-hidden rounded-t-[28px] sm:rounded-[24px] border border-[#FF6801]/30 bg-[#0a0a0a] shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.8),0_0_40px_rgba(255,104,1,0.15)] focus:outline-none"
          >
            {/* Header + progress */}
            <div className="relative px-6 pt-6 pb-4">
              <button
                onClick={close}
                aria-label="Close"
                className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <p className="font-orbitron text-[10px] uppercase tracking-[0.2em] text-[#FF6801]">
                Free Strategy Call · Step {step + 1} of {TOTAL}
              </p>
              <h2 className="mt-2 font-orbitron text-[19px] font-semibold leading-tight text-white">
                {step === 0 && "What do you need help with?"}
                {step === 1 && "What kind of business is this?"}
                {step === 2 && "How urgent is the growth problem?"}
                {step === 3 && "Where should we send your plan?"}
              </h2>
              {step === 0 && (
                <p className="mt-1 font-inter text-[12px] text-white/45">Select all that apply.</p>
              )}
              {/* Progress bar */}
              <div className="mt-4 flex gap-1.5" aria-hidden>
                {Array.from({ length: TOTAL }).map((_, i) => (
                  <span
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                      i <= step ? "bg-[#FF6801]" : "bg-white/10"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Body */}
            <div className="max-h-[52vh] overflow-y-auto px-6 pb-2">
              {step === 0 && (
                <div className="grid grid-cols-1 gap-2">
                  {SERVICES.map((s) => (
                    <ChoiceButton key={s} active={data.services.includes(s)} onClick={() => toggleService(s)}>
                      {s}
                    </ChoiceButton>
                  ))}
                </div>
              )}

              {step === 1 && (
                <div className="grid grid-cols-1 gap-5">
                  <div className="grid gap-2">
                    <p className="font-inter text-[12px] font-medium text-white/54">Business type</p>
                    {BUSINESS_TYPES.map((type) => (
                      <ChoiceButton key={type} active={data.businessType === type} onClick={() => set({ businessType: type })}>
                        {type}
                      </ChoiceButton>
                    ))}
                  </div>
                  <div className="grid gap-2">
                    <p className="font-inter text-[12px] font-medium text-white/54">Monthly marketing budget</p>
                    {BUDGETS.map((b) => (
                      <ChoiceButton key={b} active={data.budget === b} onClick={() => set({ budget: b })}>
                        {b}
                      </ChoiceButton>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4 pt-1">
                  <div className="grid gap-2">
                    {URGENCY.map((item) => (
                      <ChoiceButton key={item} active={data.urgency === item} onClick={() => set({ urgency: item })}>
                        {item}
                      </ChoiceButton>
                    ))}
                  </div>
                  <label className="block">
                    <span className="mb-1.5 block font-inter text-[12px] font-medium text-white/60">Main challenge</span>
                    <textarea
                      value={data.challenge}
                      onChange={(event) => set({ challenge: event.target.value })}
                      placeholder="e.g. Leads are coming but not converting, website is slow, ads are wasting budget..."
                      className="min-h-[92px] w-full resize-none rounded-xl border border-white/10 bg-[#121214] px-4 py-3 font-inter text-[14px] text-white placeholder-white/30 transition-all focus:border-[#FF6801] focus:outline-none focus:ring-1 focus:ring-[#FF6801]/50"
                    />
                  </label>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-3 pt-1">
                  <Field label="Your name *" value={data.name} onChange={(v) => set({ name: v })} placeholder="e.g. Ali Khan" autoFocus />
                  <Field label="Business name" value={data.business} onChange={(v) => set({ business: v })} placeholder="e.g. Khan Dental Clinic" />
                  <Field label="Phone / WhatsApp" value={data.phone} onChange={(v) => set({ phone: v })} placeholder="e.g. 0313 5147935" type="tel" />
                  <Field label="Website or social link" value={data.website} onChange={(v) => set({ website: v })} placeholder="e.g. instagram.com/yourbrand" />
                  <p className="pt-1 font-inter text-[12px] leading-relaxed text-white/45">
                    <a href="/company-verification/" target="_blank" rel="noopener noreferrer" className="mb-2 block text-[#ff9b57] underline">Business information · Pakistan sole proprietorship</a>
                    We&apos;ll open WhatsApp with your details pre-filled so our team can reply fast. No spam, ever.
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between gap-3 border-t border-white/[0.06] px-6 py-4">
              {step > 0 ? (
                <button
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  className="font-inter text-[13px] text-white/55 transition-colors hover:text-white"
                >
                  ← Back
                </button>
              ) : (
                <span />
              )}

              {step < 3 ? (
                <button
                  onClick={goNext}
                  disabled={!canNext}
                  className="rounded-full bg-[#FF6801] px-6 py-2.5 font-orbitron text-[12px] font-semibold uppercase tracking-[0.1em] text-[#1c0d00] shadow-[0_0_15px_rgba(255,104,1,0.3)] transition-all hover:-translate-y-0.5 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
                >
                  Continue
                </button>
              ) : (
                <button
                  onClick={submit}
                  disabled={!canNext}
                  className="flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-2.5 font-orbitron text-[12px] font-semibold uppercase tracking-[0.1em] text-white shadow-[0_0_15px_rgba(37,211,102,0.3)] transition-all hover:-translate-y-0.5 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
                >
                  <svg className="h-4 w-4 fill-white" viewBox="0 0 24 24" aria-hidden>
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 2.13.56 4.12 1.53 5.85L.06 23.45a.5.5 0 00.64.53l5.8-1.52A11.94 11.94 0 0012 24c6.63 0 12-5.37 12-12S18.63 0 12 0z" />
                  </svg>
                  Send on WhatsApp
                </button>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function ChoiceButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-left font-inter text-[14px] transition-all active:scale-[0.99] ${
        active
          ? "border-[#FF6801] bg-[#FF6801]/10 text-white"
          : "border-white/10 bg-white/[0.02] text-white/80 hover:border-[#FF6801]/50 hover:bg-white/[0.04]"
      }`}
    >
      {children}
      <span className={`ml-3 text-[#FF6801] transition-opacity ${active ? "opacity-100" : "opacity-0"}`}>✓</span>
    </button>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  autoFocus,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  autoFocus?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-inter text-[12px] font-medium text-white/60">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="w-full rounded-xl border border-white/10 bg-[#121214] px-4 py-3 font-inter text-[14px] text-white placeholder-white/30 transition-all focus:border-[#FF6801] focus:outline-none focus:ring-1 focus:ring-[#FF6801]/50"
      />
    </label>
  );
}
