type Attribution = { landing_page: string; referrer: string; source: string; medium: string; campaign: string; content: string };
const key = 'cm-session-acquisition-v1';
export function getLeadAttribution(): Attribution {
  const query = new URLSearchParams(window.location.search);
  const current: Attribution = { landing_page: window.location.pathname.slice(0,180), referrer: document.referrer.split('?')[0].slice(0,500), source: (query.get('utm_source') || '').slice(0,150), medium: (query.get('utm_medium') || '').slice(0,150), campaign: (query.get('utm_campaign') || '').slice(0,150), content: (query.get('utm_content') || '').slice(0,150) };
  try {
    const saved = JSON.parse(sessionStorage.getItem(key) || 'null');
    if (saved && Object.keys(current).every(k => typeof saved[k] === 'string')) return saved;
    sessionStorage.setItem(key, JSON.stringify(current));
  } catch { /* Forms remain usable when browser storage is unavailable. */ }
  return current;
}
