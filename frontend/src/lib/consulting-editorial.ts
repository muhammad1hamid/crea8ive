import type { WPPost } from '@/types/wordpress';
import { FOUNDER } from '@/lib/authority-data';
import { ADDITIONAL_ARTICLE_TREATMENTS } from './consulting-article-notes';

export const EDITORIAL_UPDATED = '2026-09-30';
export const CONSULTATION_URL = 'https://syedqamarabbas.com/business-growth-consultation/';
export const CONSULTING_DISCIPLINES = {
  growth: { name: 'growth strategy', url: 'https://syedqamarabbas.com/expertise/growth-strategy/' },
  acquisition: { name: 'customer acquisition', url: 'https://syedqamarabbas.com/expertise/customer-acquisition/' },
  search: { name: 'SEO and AI search', url: 'https://syedqamarabbas.com/expertise/seo-ai-search/' },
  automation: { name: 'automation strategy', url: 'https://syedqamarabbas.com/expertise/automation-strategy/' },
} as const;
export type Discipline = keyof typeof CONSULTING_DISCIPLINES;
export type ArticleTreatment = {
  audience: string;
  discipline: Discipline | null;
  question: string;
  answer: string;
  tradeoff: string;
  nextStep: string;
  evidence?: { slug: string; context: string };
  consultation?: boolean;
};

export const ARTICLE_TREATMENTS: Record<string, ArticleTreatment> = {
  ...ADDITIONAL_ARTICLE_TREATMENTS,
  'lead-generation-for-builders-and-architects-in-pakistan': {
    audience: 'Construction and architecture business owners', discipline: 'acquisition',
    question: 'Are you short of enquiries, or short of projects that fit?',
    answer: 'Review recent enquiries by project type, service area, budget fit and readiness to proceed. Agree what makes a useful project conversation before choosing a channel or increasing spend.',
    tradeoff: 'A longer enquiry form may improve context but discourage early research. Keep an accessible contact option and compare qualified conversations, not form completion alone.',
    nextStep: 'If the constraint is unclear, compare your channel and qualification priorities with',
    evidence: { slug: 'buildscape', context: 'Buildscape shows service organization, project information and a public project-intake interface. The case study does not verify CRM routing or improved lead quality.' }, consultation: true,
  },
  'google-business-profile-clinics-islamabad-rawalpindi': {
    audience: 'Clinic owners and practice managers', discipline: 'search',
    question: 'Can a patient connect the listing to the right treatment and clinic?',
    answer: 'Check that services, clinician information, contact details and appointment destinations agree across the profile and website. Choose the most important treatment journey and inspect it on a phone.',
    tradeoff: 'More profile activity will not fix inaccurate treatment information or unanswered enquiries. Keep patient records out of public content and assign a person to maintain the information.',
    nextStep: 'For deciding whether the priority is local discovery or service-page clarity, explore',
    evidence: { slug: 'the-smile-xperts', context: 'The Smile Xperts documents treatment-page architecture and appointment paths. It is evidence of website work, not a measured Maps ranking or patient-acquisition result.' },
  },
  'whatsapp-automation-for-clinics-booking-follow-up-and-reminders': {
    audience: 'Clinic owners and reception teams', discipline: 'automation',
    question: 'Which missed handoff should be automated first?',
    answer: 'Map enquiry receipt, reception ownership, appointment confirmation and exceptions before choosing software. Begin with one administrative handoff and record response time and completion.',
    tradeoff: 'A WhatsApp button is not an automated booking system. Keep clinical questions with qualified staff, use appropriate permission for messages and retain a human route when a workflow fails.',
    nextStep: 'If you need to define ownership and workflow boundaries before buying a CRM, explore',
    evidence: { slug: 'the-smile-xperts', context: 'The Smile Xperts illustrates the public appointment-enquiry path. Its case study does not establish automated reminders, clinical triage or completed booking integration.' }, consultation: true,
  },
};

export type CaseTreatment = {
  client: string; audience: string; discipline: Discipline;
  question: string; reasoning: string; tradeoff: string; lesson: string;
  evidence: string; evidenceUrl: string; outcome: string;
};
export const CASE_TREATMENTS: Record<string, CaseTreatment> = {
  'co3-premium-liquid-shop': {
    client: 'CO3 Premium Liquid Shop', audience: 'Cafe and drinks-brand operators', discipline: 'automation',
    question: 'Which menu changes should the team control without a developer?',
    reasoning: 'The agency account describes a public menu, WhatsApp ordering and an admin-managed product system. The operating question is how to keep customer-facing information current while making an order easy to understand.',
    tradeoff: 'An editable menu reduces dependence on code releases but needs permissions, validation and maintenance. A WhatsApp order handoff is not proof of payment, inventory synchronization or delivery completion.',
    lesson: 'List the product, price and availability changes your team makes regularly. Define who approves them and what happens when an order needs clarification before adding more automation.',
    evidence: 'The public website lets a reader inspect menu presentation and the ordering interface. Admin functionality is described in the agency record; it is not independently verifiable through the public site.',
    evidenceUrl: 'https://co3premiumliquids.com/',
    outcome: 'The documented delivery is the website, management system and deployment scope. No approved order-growth, time-saving or revenue dataset with a measurement period is published.',
  },
  'hassan-nawaz-architects': {
    client: 'Hassan Nawaz Architects', audience: 'Architecture studios', discipline: 'search',
    question: 'Can a prospective client connect the portfolio to the service they need?',
    reasoning: 'The documented site combines architectural work, service information and search-oriented content. A useful interpretation is that a portfolio establishes relevance while clear service and contact pages help visitors assess the next step.',
    tradeoff: 'More location and answer pages require distinct, maintained information. Repeating the same claims across pages does not prove local presence or specialist experience.',
    lesson: 'Connect each selected project to a clearly described service. Keep the studio identity and service area accurate before expanding the content footprint.',
    evidence: 'Inspect the Hassan Nawaz Architects website for published projects, service descriptions and contact paths. Technical-file delivery is described in the agency account; visibility in an AI answer is a separate observation.',
    evidenceUrl: 'https://hassannawazarchitects.com/',
    outcome: 'This is a documented website and discoverability foundation. No approved search-position, AI-citation or qualified-lead trend with a measurement period is included.',
  },
  'home-studio-interiors': {
    client: 'Home Studio Interiors', audience: 'Interior-design business owners', discipline: 'growth',
    question: 'How do premium presentation, search visibility and lead handling work together for a high-consideration interiors business?',
    reasoning: 'The updated agency record connects a luxury website, Google Business Profile activity, Meta lead campaigns, social content, automation and a visible lead pipeline. A useful strategic reading is that interior-design growth depends on both desire and operational follow-up: the brand must look premium, but enquiries also need routing, qualification and timely response.',
    tradeoff: 'A strong visual identity can lift trust, but large imagery, paid traffic and many inboxes add maintenance pressure. Campaign results, social views and Business Profile actions should be read as separate platform evidence unless a shared attribution model connects them.',
    lesson: 'Define the project types worth winning, build service pages around those decisions, and connect every enquiry source to a clear follow-up owner before scaling budget.',
    evidence: 'Inspect the published client website, the case-study screenshots and the Meta Ads CSV-backed totals. The evidence supports website delivery, local-profile actions, social visibility and campaign activity; it does not prove a universal ROI model for every future project.',
    evidenceUrl: 'https://homestudiointeriors.pk/',
    outcome: 'The supplied evidence includes Google Business Profile calls and chat clicks for May-August 2026, Meta campaign totals through September 30, 2026, social visibility screenshots and a visible lead-funnel board.',
  },
  buildscape: {
    client: 'Buildscape', audience: 'Construction firms with several service lines', discipline: 'acquisition',
    question: 'How can a broad construction offer produce a useful project conversation?',
    reasoning: 'The documented engagement organizes architecture, engineering, construction and interiors alongside projects and planning answers. Read as a customer journey, this gives a prospective client context before choosing an enquiry path.',
    tradeoff: 'A short contact route suits early questions; a structured project brief collects more context but asks more of the visitor. These are options to evaluate, not a record of alternatives the client rejected.',
    lesson: 'Before commissioning more reach, define the project type, location and scope your team can serve. Then make those choices understandable in the website and enquiry process.',
    evidence: 'Inspect the client project pages and the production captures above. Public interface evidence supports the delivery account; it does not establish internal lead routing or sales outcomes.',
    evidenceUrl: 'https://buildscape.pk/projects/',
    outcome: 'No approved lead-quality, revenue or conversion dataset with a measurement period is published. The documented outcome is the website and ongoing agency scope described above.',
  },
  'the-smile-xperts': {
    client: 'The Smile Xperts', audience: 'Dental clinic owners', discipline: 'search',
    question: 'What should patients be able to verify before making an appointment enquiry?',
    reasoning: 'The project record connects treatment information, doctor profiles, local identity and appointment actions. The practical rationale is to make discovery and trust part of the same journey, instead of expecting an attractive homepage to answer every treatment question.',
    tradeoff: 'Treatment-specific pages provide detail but need clinical review and maintenance. Publishing more pages is not useful if availability or practitioner information becomes inaccurate.',
    lesson: 'Start with the treatments and patient questions that matter most. Check the information and contact route together before adding campaigns or expanding content.',
    evidence: 'Inspect the client website and the desktop and mobile captures in this case study. These illustrate service presentation and enquiry paths, not independently measured appointment growth.',
    evidenceUrl: 'https://thesmilexperts.com/',
    outcome: 'The case study describes a foundation and continuing optimization. No approved before-and-after patient, ranking or revenue figures with a measurement period are available here.',
  },
  'black-petals': {
    client: 'Black Petals', audience: 'Ecommerce brands competing in urgent local demand', discipline: 'acquisition',
    question: 'How do paid search, SEO and the store experience work together when customers need to buy quickly?',
    reasoning: 'The agency record and supplied screenshots connect Google Ads, Shopify analytics, website management and SEO scope for an NYC-focused flower delivery business. A useful interpretation is that the acquisition channel, landing path, merchandising and mobile order experience need to be managed as one system.',
    tradeoff: 'Google Ads conversions, Shopify sales and Shopify channel attribution are separate reporting views. They should guide decisions, but they should not be merged into one ROI claim without a shared attribution model and date range.',
    lesson: 'For ecommerce growth, keep ad intent, collection pages, product trust, mobile UX and reporting definitions aligned before increasing spend. Treat AI-referral rows as signals to investigate, not as complete cross-domain attribution.',
    evidence: 'Inspect the Black Petals case study for supplied Google Ads and Shopify screenshots with visible date ranges, plus live desktop and mobile storefront captures.',
    evidenceUrl: 'https://blackpetals.us/',
    outcome: 'The case publishes source-backed screenshots for annual Shopify sales and sessions, Google Ads scale and selected channel evidence. It does not promise equivalent performance or claim full attribution beyond the platform views.',
  },
};

// A name assigned by a template is not an editorial credit. Imported Markdown
// records without a named author retain agency editorial responsibility.
export function articleCredit(post: WPPost) {
  const recorded = post._embedded?.author?.[0]?.name?.trim();
  const name = recorded && !['admin', 'Administrator'].includes(recorded) ? recorded : 'Crea8iv Media Editorial Team';
  const founder = name === FOUNDER.name;
  const team = name === 'Crea8iv Media Editorial Team' || name === 'Crea8iv Media';
  return {
    name,
    href: founder ? FOUNDER.canonicalPath : '/about/',
    schema: founder ? { '@id': FOUNDER.personId } : team
      ? { '@id': 'https://crea8ivmedia.com/#organization' }
      : { '@type': 'Person', name },
  };
}
