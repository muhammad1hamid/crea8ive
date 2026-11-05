# Registration evidence and lead conversion

Implemented and deployed on the affected routes: company verification page, unmodified certificate copies, homepage and footer registration strip, About navigation link, qualifier proof link, Organization CUIN/taxID, sitemap entry, AI facts and llms.txt reference. Deployed 9 September 2026.

## Approved evidence-based wording
- SECP registered company; incorporated in Pakistan on 4 May 2026; CUIN 0335790.
- FBR taxpayer registration J002456 (registered 4 May 2026; certificate printed 4 June 2026).
- Legal entity: CREA8IV MEDIA MARKETING AGENCY (PRIVATE) LIMITED.
- Use “View registration” and “Check company on SECP” as proof links.
- Do not describe these documents as service certification, government endorsement, international accreditation, active filer verification, Google/Meta partner certification or a guarantee of results. Keep brand history separate from legal incorporation date.

## Acquisition and sales use
1. Link proposals, supplier profiles, email signatures and relevant directory profiles to /company-verification/ after deployment. Keep the legal entity and identifiers consistent. Do not create keyword-stuffed country pages just for registration.
2. Pair registration proof with relevant portfolio/case-study evidence and clear project scope. Registration addresses identity concerns; portfolio addresses capability concerns.
3. For international buyers and sponsors, use the dedicated partnership email enquiry for country, organization, project, timeline and procurement requirements. Agree currency, deliverables, contract party and payment arrangements separately; certificates alone establish none of these.
4. Keep public proof ungated. Ask for information when discussing a project rather than requiring a lead form to see a certificate.
5. In sales materials, use: “Crea8iv Media is operated by CREA8IV MEDIA MARKETING AGENCY (PRIVATE) LIMITED, incorporated in Pakistan. SECP CUIN: 0335790. FBR taxpayer registration: J002456. Review company documents: https://crea8ivmedia.com/company-verification/”.

## Measurement
The project CTA uses the existing cta_clicked event with location company_verification_project, followed by the existing qualifier events. Qualifier submission opens a prefilled WhatsApp message; it is not proof that a message was sent or a lead received. Partnership form now saves enquiries to private server storage and returns a reference; see enquiry-operations.md. Judge results using actual received qualified enquiries, booked calls and proposals by Pakistan/international/partner segment, alongside page-to-CTA rate. Collect a baseline before attributing lift; no ranking or lead increase is guaranteed.

## Verification and release
Documents were visually reviewed and text extracted. PDF copies remain byte-identical. SECP live lookup could not be fetched during this session; no live company status verification is claimed. Current ATL status requires separate FBR checking. No government marks have been extracted into endorsement badges.
Local TypeScript check and git diff whitespace check passed. Preview route rendered with both proof links and CTAs. Production export and scoped deployment completed; see portfolio-grid-release-2026-09-09.md for release details. Existing workspace contains many unrelated changes; release only an inspected build and do not deploy the entire dirty workspace blindly.
