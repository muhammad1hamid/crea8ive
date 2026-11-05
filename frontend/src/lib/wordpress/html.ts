import { SITE_URL } from "@/lib/site-config";
import legacyRedirects from "@/data/legacy-redirects.json";

const WORDPRESS_SITE_URL =
  process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL ||
  process.env.NEXT_PUBLIC_WP_URL ||
  SITE_URL;

export function cleanWpHtml(html: string) {
  return annotateWebMcpForms(html
    .replace(/https:\/\/darkgray-eland-964548\.hostingersite\.com/gi, WORDPRESS_SITE_URL)
    .replace(new RegExp(`href=["']https?:\/\/(www\\.)?crea8ivmedia\\.com\/?`, "gi"), 'href="/')
    .replace(/href=["']growth["']/gi, 'href="/growth-systems/"')
    .replace(/href=["']\/?contact-us\/?["']/gi, 'href="/contact/"')
    .replace(/href=["']\/?teams\/leslie-alexander\/?["']/gi, 'href="/our-team/"')
    .replace(/href=(["'])(\/[^"']*)\1/gi, (attribute, quote: string, reference: string) => {
      try {
        const url = new URL(reference, SITE_URL);
        if (url.origin !== SITE_URL) return attribute;
        const pathname = `${url.pathname.replace(/\/+$/, "")}/`;
        const destination = (legacyRedirects as Record<string, string>)[pathname];
        return destination ? `href=${quote}${destination}${url.search}${url.hash}${quote}` : attribute;
      } catch {
        return attribute;
      }
    })
    .replace(/<pre\b[^>]*\bclass=["'][^"']*\bti-widget\b[^"']*["'][^>]*>[\s\S]*?<\/pre>/gi, "")
    .replace(/<template\b[^>]*\bid=["']trustindex-google-widget-html["'][^>]*>[\s\S]*?<\/template>/gi, "")
    .replace(/<div\b[^>]*\bdata-id=["']65eb51f["'][^>]*>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi, "")
    .replace(/<div\b[^>]*\bdata-template-id=["']trustindex-google-widget-html["'][^>]*>\s*<\/div>/gi, "")
    .replace(/<div\b[^>]*\bdata-(?:src|css-url)=["'][^"']*trustindex[^"']*["'][^>]*>\s*<\/div>/gi, "")
    .replace(/<div\b[^>]*\bclass=["'][^"']*\bti-widget\b[^"']*["'][^>]*>[\s\S]*?<\/div>/gi, ""));
}

function annotateWebMcpForms(html: string) {
  return html
    .replace(
      /<form class="cm-form" id="cmContactForm">/g,
      '<form class="cm-form" id="cmContactForm" toolname="submitContactEnquiry" tooldescription="Submits a Crea8iv Media contact enquiry with visitor details, requested service, and project message.">'
    )
    .replace(/<input id="cmName" type="text"/g, '<input id="cmName" name="name" toolparamdescription="The full name of the person contacting Crea8iv Media." type="text"')
    .replace(/<input id="cmPhone" type="tel"/g, '<input id="cmPhone" name="phone" toolparamdescription="The phone or WhatsApp number for follow-up." type="tel"')
    .replace(/<input id="cmEmail" type="email"/g, '<input id="cmEmail" name="email" toolparamdescription="The email address for project follow-up." type="email"')
    .replace(/<select id="cmService" required>/g, '<select id="cmService" name="service" toolparamdescription="The service or business outcome the visitor wants to discuss." required>')
    .replace(/<textarea id="cmMessage"/g, '<textarea id="cmMessage" name="message" toolparamdescription="The visitor project details, goals, timeline, or requirements."')
    .replace(
      /<form id="applicationForm">/g,
      '<form id="applicationForm" toolname="submitCareerApplication" tooldescription="Submits a career application to Crea8iv Media with contact details, role preference, skills, portfolio, and availability.">'
    )
    .replace(/<input type="text" name="fullName"/g, '<input type="text" name="fullName" toolparamdescription="The applicant full name."')
    .replace(/<input type="email" name="email"/g, '<input type="email" name="email" toolparamdescription="The applicant email address."')
    .replace(/<input type="tel" name="phone"/g, '<input type="tel" name="phone" toolparamdescription="The applicant phone or WhatsApp number."')
    .replace(/<input type="text" name="city"/g, '<input type="text" name="city" toolparamdescription="The city where the applicant is based."')
    .replace(/<select name="position"/g, '<select name="position" toolparamdescription="The position the applicant wants to apply for."')
    .replace(/<select name="status"/g, '<select name="status" toolparamdescription="The applicant current work or education status."')
    .replace(/<textarea name="skills"/g, '<textarea name="skills" toolparamdescription="A short summary of the applicant skills."')
    .replace(/<input type="url" name="portfolio"/g, '<input type="url" name="portfolio" toolparamdescription="A portfolio, previous work, or public work sample link."')
    .replace(/<textarea name="whyJoin"/g, '<textarea name="whyJoin" toolparamdescription="Why the applicant wants to join Crea8iv Media."')
    .replace(/<select name="availability"/g, '<select name="availability" toolparamdescription="The applicant availability preference."')
    .replace(
      /<form class="ai-form" id="aiCourseForm">/g,
      '<form class="ai-form" id="aiCourseForm" toolname="submitCourseApplication" tooldescription="Submits an AI course application with contact details, learner type, and application message.">'
    )
    .replace(/<input id="aiName" type="text"/g, '<input id="aiName" name="name" toolparamdescription="The course applicant full name." type="text"')
    .replace(/<input id="aiPhone" type="tel"/g, '<input id="aiPhone" name="phone" toolparamdescription="The course applicant phone or WhatsApp number." type="tel"')
    .replace(/<input id="aiEmail" type="email"/g, '<input id="aiEmail" name="email" toolparamdescription="The course applicant email address." type="email"')
    .replace(/<select id="aiType" required>/g, '<select id="aiType" name="learnerType" toolparamdescription="The learner type or background of the course applicant." required>')
    .replace(/<textarea id="aiMessage"/g, '<textarea id="aiMessage" name="message" toolparamdescription="Why the applicant wants to join the course."')
    .replace(
      /<form class="cm-form" action="#" method="post">/g,
      '<form class="cm-form" action="#" method="post" toolname="bookStrategyCall" tooldescription="Submits a free strategy call enquiry with contact details, business name, and growth goal.">'
    )
    .replace(/id="name" name="name"/g, 'id="name" name="name" toolparamdescription="The visitor full name for the strategy call enquiry."')
    .replace(/id="email" name="email"/g, 'id="email" name="email" toolparamdescription="The visitor email address for the strategy call enquiry."')
    .replace(/id="business" name="business"/g, 'id="business" name="business" toolparamdescription="The visitor business or brand name."')
    .replace(/id="message" name="message"/g, 'id="message" name="message" toolparamdescription="The visitor main business goal or project message."');
}

export function extractWpDocumentParts(html: string) {
  const cleaned = cleanWpHtml(html);

  const styles = Array.from(cleaned.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)).map(
    (match) => match[1].trim()
  );

  const stylesheetHrefs = Array.from(
    cleaned.matchAll(/<link\b[^>]*rel=["'][^"']*stylesheet[^"']*["'][^>]*href=["']([^"']+)["'][^>]*>/gi)
  ).map((match) => cleanWpHtml(match[1]));

  const bodyHtml = cleaned
    .replace(/<head\b[^>]*>[\s\S]*?<\/head>/gi, "")
    .replace(/<!DOCTYPE[^>]*>/gi, "")
    .replace(/<\/?(html|body)\b[^>]*>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<link\b[^>]*rel=["'][^"']*stylesheet[^"']*["'][^>]*>/gi, "")
    .replace(/<pre\b[^>]*\bclass=["'][^"']*\bti-widget\b[^"']*["'][^>]*>[\s\S]*?<\/pre>/gi, "")
    .replace(/<template\b[^>]*\bid=["']trustindex-google-widget-html["'][^>]*>[\s\S]*?<\/template>/gi, "")
    .replace(/<div\b[^>]*\bdata-id=["']65eb51f["'][^>]*>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi, "")
    .replace(/<div\b[^>]*\bdata-template-id=["']trustindex-google-widget-html["'][^>]*>\s*<\/div>/gi, "")
    .replace(/<div\b[^>]*\bdata-(?:src|css-url)=["'][^"']*trustindex[^"']*["'][^>]*>\s*<\/div>/gi, "")
    .replace(/<div\b[^>]*\bclass=["'][^"']*\bti-widget\b[^"']*["'][^>]*>[\s\S]*?<\/div>/gi, "")
    .replace(/Widget not found![\s\S]*?(?:trustindex\.io[^<\s]*|create one[\s\S]*?business\.)/gi, "")
    .trim();

  return {
    bodyHtml,
    styles: styles.filter(Boolean),
    stylesheetHrefs: Array.from(new Set(stylesheetHrefs.filter(Boolean))),
  };
}
