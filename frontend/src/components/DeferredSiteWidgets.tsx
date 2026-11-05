'use client';

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const VoiceAssistant = dynamic(() => import("@/components/VoiceAssistant"), { ssr: false });
const StickyCTA = dynamic(() => import("@/components/StickyCTA"), { ssr: false });
const LeadQualifier = dynamic(() => import("@/components/LeadQualifier"), { ssr: false });

export default function DeferredSiteWidgets() {
  const [leadQualifierReady, setLeadQualifierReady] = useState(false);
  const [conversionReady, setConversionReady] = useState(false);
  const [assistantReady, setAssistantReady] = useState(false);
  const [initialLeadOpenRequest, setInitialLeadOpenRequest] = useState<{ id: number; source?: string } | null>(null);
  const leadQualifierReadyRef = useRef(false);

  useEffect(() => {
    leadQualifierReadyRef.current = leadQualifierReady;
  }, [leadQualifierReady]);

  useEffect(() => {
    const showConversion = () => setConversionReady(true);
    const showAssistant = () => setAssistantReady(true);
    const conversionTimer = window.setTimeout(showConversion, 12000);
    const assistantTimer = window.setTimeout(showAssistant, 22000);
    const loadLeadQualifier = (event: Event) => {
      if (leadQualifierReadyRef.current) return;
      const source = event instanceof CustomEvent ? event.detail?.source : undefined;
      leadQualifierReadyRef.current = true;
      setLeadQualifierReady(true);
      setInitialLeadOpenRequest({ id: Date.now(), source });
    };

    window.addEventListener("scroll", showConversion, { once: true, passive: true });
    window.addEventListener("crea8iv:lead", loadLeadQualifier);
    window.addEventListener("pointerdown", showAssistant, { once: true, passive: true });
    window.addEventListener("keydown", showAssistant, { once: true });
    window.addEventListener("scroll", showAssistant, { once: true, passive: true });

    return () => {
      window.clearTimeout(conversionTimer);
      window.clearTimeout(assistantTimer);
      window.removeEventListener("scroll", showConversion);
      window.removeEventListener("crea8iv:lead", loadLeadQualifier);
      window.removeEventListener("pointerdown", showAssistant);
      window.removeEventListener("keydown", showAssistant);
      window.removeEventListener("scroll", showAssistant);
    };
  }, []);

  return (
    <>
      {leadQualifierReady ? <LeadQualifier initialOpenRequest={initialLeadOpenRequest} /> : null}
      {conversionReady ? <StickyCTA /> : null}
      {assistantReady ? <VoiceAssistant /> : null}
    </>
  );
}
