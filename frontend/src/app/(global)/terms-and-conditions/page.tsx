import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { BUSINESS_DETAILS, SITE_URL } from "@/lib/site-config";
import { PAGE_METADATA, pageUrl } from "@/lib/seo-metadata";

const slug = "terms-and-conditions";
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
      dateModified: "2026-06-22",
      inLanguage: "en-PK",
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${canonical}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Terms and Conditions", item: canonical },
      ],
    },
  ],
};

export default function TermsAndConditionsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <LegalPage title="Terms & Conditions" description="These terms govern use of the Crea8iv Media website and provide the general framework for enquiries and services. A signed proposal or service agreement may contain additional project-specific terms." lastUpdated="22 June 2026">
        <h2>1. About these terms</h2>
        <p>This website is operated by <strong>{BUSINESS_DETAILS.legalName}</strong>, trading as <strong>{BUSINESS_DETAILS.brandName}</strong>. By using this website, submitting an enquiry or engaging our services, you agree to these terms together with any written proposal, statement of work, order form or service agreement that applies to your project.</p>

        <h2>2. Our services</h2>
        <p>We provide services that may include digital strategy, Google Ads, Meta Ads, local SEO, social media management, content production, branding, website development, software development and automation. The exact scope, deliverables, fees, assumptions and timelines for paid work are defined in the applicable written proposal or agreement.</p>

        <h2>3. Enquiries, proposals and acceptance</h2>
        <p>Website content and initial discussions are for general information and do not create a binding service commitment. A project begins only when the relevant proposal or agreement is accepted and any required initial payment or onboarding requirement has been completed.</p>

        <h2>4. Client responsibilities</h2>
        <p>Clients must provide accurate information, lawful instructions, timely access, approvals, materials and feedback reasonably required to perform the work. Clients are responsible for having permission to use all text, images, trademarks, customer data, account access and other materials supplied to us.</p>

        <h2>5. Fees, invoices and refunds</h2>
        <p>Fees, payment schedules, taxes, media spend, third-party costs and billing terms are stated in the relevant proposal, invoice or agreement. Advertising budgets and third-party platform charges are separate unless expressly included. Refunds, credits or cancellations are handled according to the applicable agreement and any rights that cannot lawfully be excluded.</p>

        <h2>6. Timelines and changes</h2>
        <p>Delivery dates are reasonable estimates unless a written agreement expressly states otherwise. Delays in access, feedback, approvals, payments, third-party platforms or events outside our reasonable control may affect timing. Work requested outside the agreed scope may require a revised timeline and additional fees approved before that work begins.</p>

        <h2>7. Intellectual property</h2>
        <p>Each party retains ownership of materials it owned before the project. Ownership or licence rights for final deliverables are governed by the applicable written agreement and may depend on full payment. We retain ownership of our pre-existing methods, know-how, reusable components, templates and internal tools. Third-party assets remain subject to their respective licences.</p>

        <h2>8. Marketing and performance results</h2>
        <p>Marketing, search, advertising and software outcomes depend on many factors outside our control, including competition, market demand, budgets, platform policies, algorithms, offer quality, sales follow-up and client decisions. Unless expressly guaranteed in a signed agreement, we do not promise a particular ranking, number of leads, revenue figure or business result.</p>

        <h2>9. Acceptable website use</h2>
        <p>You must not misuse this website, attempt unauthorised access, introduce malicious code, interfere with availability, scrape protected information, impersonate another person, submit unlawful content, or use our content or systems in a way that infringes rights or applicable law.</p>

        <h2>10. Confidentiality and information</h2>
        <p>Project confidentiality obligations are governed by the applicable agreement. Personal information submitted through this website is handled as described in our <Link href="/privacy-policy/">Privacy Policy</Link>.</p>

        <h2>11. Third-party platforms and links</h2>
        <p>Our services may depend on platforms such as Google, Meta, hosting providers, payment services, app stores or other technology vendors. Their availability, policies, approvals, suspensions, pricing and technical changes are outside our control. Links to third-party websites do not constitute an endorsement or responsibility for their content.</p>

        <h2>12. Disclaimers and liability</h2>
        <p>We use reasonable care and skill in providing agreed services. The website is provided on an “as available” basis and general website content is not legal, financial or professional advice for your specific circumstances. To the extent permitted by applicable law, neither party will be liable for indirect, incidental or consequential loss. Nothing in these terms excludes rights or liabilities that cannot lawfully be excluded or limited.</p>

        <h2>13. Suspension and termination</h2>
        <p>Either party may suspend or end services as allowed by the applicable agreement. We may restrict website access or suspend work where there is unlawful use, a security risk, material non-payment or a serious breach, subject to any notice or remedy requirements in the applicable agreement or law.</p>

        <h2>14. Governing law and disputes</h2>
        <p>These terms are governed by the laws of Pakistan. The parties should first attempt to resolve a dispute in good faith. Subject to any mandatory legal rights or agreed dispute process, courts of competent jurisdiction in Rawalpindi, Punjab, Pakistan will have jurisdiction.</p>

        <h2>15. Changes to these terms</h2>
        <p>We may update these website terms when our services, operations or legal requirements change. The latest version will appear on this page with a revised “Last updated” date. Changes do not override a signed project agreement unless that agreement allows them to do so.</p>

        <h2>16. Contact</h2>
        <p>Questions about these terms may be sent to <a href={`mailto:${BUSINESS_DETAILS.email}`}>{BUSINESS_DETAILS.email}</a>, discussed by telephone at <a href={BUSINESS_DETAILS.phoneHref}>{BUSINESS_DETAILS.phoneDisplay}</a>, or delivered to {BUSINESS_DETAILS.address}.</p>
      </LegalPage>
    </>
  );
}
