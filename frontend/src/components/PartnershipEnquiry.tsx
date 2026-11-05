'use client';

import { useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { trackEvent } from '@/lib/analytics-events';
import { getLeadAttribution } from '@/lib/lead-attribution';
import { markets } from '@/data/markets';
import styles from './enquiry.module.css';

export default function PartnershipEnquiry({ market = '', initialService = '' }: { market?: string; initialService?: string }) {
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [service, setService] = useState(initialService);
  const requestId = useRef('');
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'saving') return;
    const data = new FormData(event.currentTarget);
    requestId.current ||= crypto.randomUUID();
    setStatus('saving'); setMessage('');
    try {
      const response = await fetch('/enquiries/submit.php', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(15000),
        body: JSON.stringify({ ...Object.fromEntries(data), consent: data.get('consent') === 'on', requestId: requestId.current,
          ...getLeadAttribution(), page: window.location.pathname }),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true || typeof result.reference !== 'string') throw new Error(result.error || 'We could not save your enquiry. Please retry or email info@crea8ivmedia.com.');
      setStatus('success'); setMessage(`Your enquiry has been saved. Reference: ${result.reference}. Our team will reply to the email you provided.`);
      trackEvent('partnership_enquiry_saved', { enquiry_type: String(data.get('type')), market: /^(pakistan|pk|pak)$/i.test(String(data.get('country')).trim()) ? 'pakistan' : 'international' });
      trackEvent('project_enquiry_saved', { country: markets.find(m => m.name === data.get('country'))?.slug || 'other', service: ['web-development','google-ads','ai-visibility','complete-growth-system'].includes(service) ? service : 'unspecified', page: window.location.pathname });
    } catch (error) {
      setStatus('error'); setMessage(error instanceof Error && error.name !== 'TimeoutError' && error.name !== 'SyntaxError' ? error.message : 'We could not confirm your enquiry was saved. Please retry or email info@crea8ivmedia.com.');
    }
  }
  return (
    <section id="partnership-enquiry" className={`${styles.section} registration-surface mx-auto my-12 max-w-5xl p-6 md:p-9`} aria-labelledby="enquiry-title">
      <h2 id="enquiry-title" className="text-3xl font-bold">Let’s discuss your project or partnership</h2>
      <p className="my-5 leading-7">For Pakistan and international clients, sponsors and business partners. Share what you need and we’ll follow up by email.</p>
      {status === 'success' ? <p role="status" className="rounded-xl border border-[var(--border-soft)] p-5">{message}</p> : (
        <form
          toolname="submitPartnershipEnquiry"
          tooldescription="Submits a business project, partnership, or sponsorship enquiry to Crea8iv Media for follow-up by email."
          onSubmit={submit}
          className="grid gap-5 sm:grid-cols-2"
        >
          <label className="grid gap-2">Company or organization<input name="company" required maxLength={160} autoComplete="organization" toolparamdescription="The company or organization making the enquiry." className="registration-input" /></label>
          <label className="grid gap-2">Country<input name="country" required defaultValue={market} maxLength={100} autoComplete="country-name" toolparamdescription="The country where the enquiring organization is based." className="registration-input" /></label>
          <label className="grid gap-2">Your name<input name="name" required maxLength={120} autoComplete="name" className="registration-input" /></label>
          <label className="grid gap-2">Website (optional)<input name="website" type="url" maxLength={500} autoComplete="url" placeholder="https://" className="registration-input" /></label>
          <label className="grid gap-2">Service<select name="service" value={service} onChange={e => setService(e.target.value)} className="registration-input"><option value="">Help me define the scope</option><option value="web-development">Website development</option><option value="google-ads">Google Ads</option><option value="ai-visibility">SEO & AI visibility</option><option value="complete-growth-system">Integrated growth programme</option></select></label>
          <label className="grid gap-2">Phone / WhatsApp (optional)<input name="phone" type="tel" maxLength={30} autoComplete="tel" className="registration-input" /></label>
          <label className="grid gap-2">Budget (optional)<input name="budget" maxLength={50} className="registration-input" placeholder="Amount and currency, or scope first" /></label>
          {service === 'google-ads' && <label className="grid gap-2">Monthly ad spend (optional)<input name="adSpend" maxLength={80} className="registration-input" placeholder="Amount and currency" /></label>}
          {service === 'web-development' && <label className="grid gap-2">Website project<select name="websiteProject" className="registration-input"><option value="new">New website</option><option value="redesign">Redesign</option><option value="improvements">Improve an existing website</option></select></label>}
          {service === 'ai-visibility' && <label className="grid gap-2">Target markets (optional)<input name="targetMarkets" maxLength={200} className="registration-input" /></label>}
          <label className="grid gap-2">Timeline (optional)<input name="timeline" maxLength={100} className="registration-input" placeholder="Your target launch or start date" /></label>
          <label className="grid gap-2">Email<input name="email" type="email" required maxLength={254} autoComplete="email" toolparamdescription="The work email address Crea8iv Media should use for follow-up." className="registration-input" /></label>
          <label className="grid gap-2">Enquiry type<select name="type" required toolparamdescription="The type of enquiry: client project, business partnership, or sponsorship." className="registration-input" defaultValue=""><option value="" disabled>Select a type</option><option value="project">Client project</option><option value="partnership">Business partnership</option><option value="sponsorship">Sponsorship</option></select></label>
          <label className="grid gap-2 sm:col-span-2">What would you like to discuss?<textarea name="requirements" required maxLength={4000} rows={4} placeholder="Project scope, timeline and any supplier onboarding requirements" toolparamdescription="The project scope, timeline, requirements, onboarding needs, or partnership details." className="registration-input" /></label>
          <div hidden aria-hidden="true"><label>Leave this empty<input name="website_check" tabIndex={-1} autoComplete="off" /></label></div>
          <label className="flex items-start gap-3 text-sm leading-6 sm:col-span-2"><input className="mt-1" name="consent" type="checkbox" required toolparamdescription="Consent for Crea8iv Media to store the enquiry and contact the sender about it." /> <span>I agree to Crea8iv Media storing this enquiry and contacting me about it, as explained in the <Link className="underline" href="/privacy-policy/">Privacy Policy</Link>.</span></label>
          <p className="text-sm leading-6 sm:col-span-2">Please share business requirements only; do not include passwords, payment details or identity documents. <Link href="/company-verification/" className="underline">View current business information</Link>.</p>
          {status === 'error' && <p role="alert" className="sm:col-span-2">{message}</p>}
          <button disabled={status === 'saving'} className="min-h-12 rounded-xl bg-[#FF6801] px-6 py-3 font-semibold text-black disabled:opacity-60">{status === 'saving' ? 'Saving enquiry…' : 'Send enquiry'}</button>
        </form>
      )}
    </section>
  );
}
