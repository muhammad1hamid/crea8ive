import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { BUSINESS_DETAILS, SITE_URL } from "@/lib/site-config";
import { PAGE_METADATA, pageUrl } from "@/lib/seo-metadata";

const slug = "privacy-policy";
const details = PAGE_METADATA[slug];
const canonical = pageUrl(slug);

export const metadata: Metadata = {
  title: { absolute: details.title },
  description: details.description,
  alternates: { canonical },
  openGraph: {
    title: details.title,
    description: details.description,
    url: canonical,
    siteName: BUSINESS_DETAILS.brandName,
    type: "website",
    images: [{ url: `${SITE_URL}/img/crea8iv-white-3d-logo.webp`, width: 900, height: 713, alt: BUSINESS_DETAILS.brandName }],
  },
  twitter: {
    card: "summary_large_image",
    title: details.title,
    description: details.description,
    images: [`${SITE_URL}/img/crea8iv-white-3d-logo.webp`],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${canonical}#webpage`,
      url: canonical,
      name: details.title,
      description: details.description,
      abstract: details.summary,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#organization` },
      breadcrumb: { "@id": `${canonical}#breadcrumb` },
      datePublished: "2026-06-22",
      dateModified: "2026-09-09",
      inLanguage: "en-PK",
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${canonical}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Privacy Policy", item: canonical },
      ],
    },
  ],
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <LegalPage title="Privacy Policy" description="This policy explains how Crea8iv Media handles information when you visit our website, contact us, or engage our services." lastUpdated="9 September 2026">
        <h2>1. Who we are</h2>
        <p><strong>{BUSINESS_DETAILS.legalName}</strong>, trading as <strong>{BUSINESS_DETAILS.brandName}</strong>, is a digital marketing and software agency based at {BUSINESS_DETAILS.address}. In this policy, “Crea8iv Media”, “we”, “us” and “our” refer to this business.</p>

        <h2>2. Information we collect</h2>
        <p>Depending on how you interact with us, we may collect:</p>
        <ul>
          <li>Contact details such as your name, business name, email address, telephone number and WhatsApp number.</li>
          <li>Information you provide in enquiry forms, consultation requests, proposals, project briefs, emails, calls or meetings.</li>
          <li>Account, billing and transaction records needed to provide contracted services and maintain business records.</li>
          <li>Technical information such as IP address, browser type, device information, referring pages, pages visited and approximate location.</li>
          <li>Cookie, analytics and advertising data where those technologies are enabled on our website or campaign landing pages.</li>
        </ul>

        <p>Our project and partnership form stores your organization, country, email, enquiry type, requirements, contact agreement and submission time on our hosting server. We also record the form page and campaign source tags to understand how enquiries reach us. Enquiry contents and email addresses are not sent to analytics; a saved-enquiry event records only enquiry type and market segment. Submitting this form does not subscribe you to marketing emails.</p>

        <h2>3. How we use information</h2>
        <p>We use information to respond to enquiries, prepare proposals, deliver and support services, communicate about projects, process authorised transactions, maintain records, secure our systems, measure website and campaign performance, improve our services, and meet applicable legal or regulatory requirements.</p>

        <h2>4. Cookies and analytics</h2>
        <p>Our website may use essential cookies and similar technologies for functionality, security, analytics and advertising measurement. You can restrict cookies through your browser settings, although some website features may not work as intended.</p>

        <h2>5. When we share information</h2>
        <p>We do not sell personal information. We may share limited information with hosting, cloud, analytics, communications, payment, advertising or professional service providers where reasonably necessary to operate the website or deliver an agreed service. We may also disclose information where required by law, to protect legal rights or safety, or as part of a legitimate business reorganisation.</p>

        <h2>6. International service providers</h2>
        <p>Some technology platforms we use may process information outside Pakistan. Where this occurs, we take reasonable steps to select reputable providers and limit the information shared to what is necessary for the relevant purpose.</p>

        <h2>7. Data retention</h2>
        <p>We retain information only for as long as reasonably necessary for the purpose for which it was collected, to provide services, resolve disputes, enforce agreements, maintain appropriate business records, and comply with applicable legal obligations. We then delete, anonymise or securely archive it where appropriate.</p>

        <h2>8. Security</h2>
        <p>We use reasonable administrative, technical and organisational safeguards designed to protect information from unauthorised access, misuse, alteration or loss. No internet transmission or storage system can be guaranteed to be completely secure.</p>

        <h2>9. Your choices and requests</h2>
        <p>You may ask us to provide, correct or delete personal information associated with you, or request that we stop promotional communications. Some requests may be limited where information must be retained for contractual, security or legal reasons. Send requests to <a href={`mailto:${BUSINESS_DETAILS.email}`}>{BUSINESS_DETAILS.email}</a>.</p>

        <h2>10. Children’s privacy</h2>
        <p>Our website and commercial services are not directed to children under 18. We do not knowingly collect personal information from children without appropriate authorisation. If you believe a child has submitted information to us, please contact us.</p>

        <h2>11. Third-party links</h2>
        <p>Our website may link to third-party websites or platforms. Their privacy practices are governed by their own policies, and we are not responsible for content or practices outside our control.</p>

        <h2>12. Changes to this policy</h2>
        <p>We may update this policy when our services, technology or legal obligations change. The latest version will be published on this page with a revised “Last updated” date.</p>

        <h2>13. Contact us</h2>
        <p>Privacy questions or requests can be sent to <a href={`mailto:${BUSINESS_DETAILS.email}`}>{BUSINESS_DETAILS.email}</a> or delivered to {BUSINESS_DETAILS.address}. You may also call <a href={BUSINESS_DETAILS.phoneHref}>{BUSINESS_DETAILS.phoneDisplay}</a>.</p>
      </LegalPage>
    </>
  );
}
