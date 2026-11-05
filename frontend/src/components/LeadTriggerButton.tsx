'use client';

import type { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics-events";
import type { ServiceTone } from "@/lib/service-tones";

type LeadTriggerButtonProps = {
  children: ReactNode;
  className?: string;
  eventLabel?: string;
  serviceTone?: ServiceTone;
};

export default function LeadTriggerButton({ children, className, eventLabel, serviceTone }: LeadTriggerButtonProps) {
  return (
    <button
      type="button"
      className={className}
      data-service-tone={serviceTone}
      onClick={() => {
        const detail = eventLabel ? { source: eventLabel } : undefined;
        trackEvent("cta_clicked", {
          location: eventLabel ?? "lead_trigger",
          button_text: typeof children === "string" ? children : "Lead trigger",
        });
        window.dispatchEvent(new CustomEvent("crea8iv:lead", { detail }));
      }}
    >
      {children}
    </button>
  );
}
