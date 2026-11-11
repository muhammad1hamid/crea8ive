/* This is the shared document for two App Router root layouts. */
/* eslint-disable @next/next/no-head-element */
import type { ReactNode } from 'react';
import { COMPANY, QATAR_REGISTERED, QATAR_CONTACT, qatarBusinessDescription } from '@/data/company';
import { getPublicTrackingSettings } from '@/lib/admin/store';
import DeferredAnalytics from '@/components/DeferredAnalytics';
import ImageAltGuard from '@/components/ImageAltGuard';
import QatarEvents from './QatarEvents';
import '@/styles/brand-tokens.css';
import './qatar-base.css';
import './shared-header.css';
import './qatar.css';
import './qatar-luxury.css';
import './qatar-team.css';
import './qatar-growth.css';
import '@/styles/site-typography.css';

export default async function QatarLayout({children,ar=false}:{children:ReactNode;ar?:boolean}) {
 const tracking=await getPublicTrackingSettings();
 const organization = {
  '@context':'https://schema.org','@type':'Organization','@id':`${COMPANY.website}/#organization`,name:COMPANY.brandName,url:COMPANY.website,
  description: qatarBusinessDescription(ar),logo:`${COMPANY.website}/img/crea8iv-logo-square.png`,
  areaServed:[{'@type':'Country',name:'Pakistan'},{'@type':'Country',name:'Qatar'}],
  email:QATAR_CONTACT.email,telephone:QATAR_CONTACT.phone,sameAs:Object.values(COMPANY.socialLinks),
  founder:{'@type':'Person',name:COMPANY.founderName},
  contactPoint:{'@type':'ContactPoint',contactType:'Business enquiries',email:QATAR_CONTACT.email,telephone:QATAR_CONTACT.phone,availableLanguage:['English','Arabic']},
  knowsAbout:['Digital marketing','SEO','AI visibility','Content production','Web development','Business automation'],
  ...(QATAR_REGISTERED ? {subOrganization:{'@type':'Organization','@id':`${COMPANY.website}/qa/#organization`,name:COMPANY.qatarLegalName,identifier:COMPANY.qatarRegistrationNumber,address:COMPANY.qatarAddress,telephone:COMPANY.qatarPhone,email:COMPANY.qatarEmail}} : {}),
 };
 return <html data-theme="dark" lang={ar?'ar-QA':'en-QA'} dir={ar?'rtl':'ltr'}><head>
 <meta name="theme-color" content="#10100f"/>
 <script dangerouslySetInnerHTML={{__html:'window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};'}}/>
 <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(organization).replace(/</g,'\\u003c')}}/>
 <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'WebSite','@id':`${COMPANY.website}/#website`,url:COMPANY.website,name:COMPANY.brandName,publisher:{'@id':`${COMPANY.website}/#organization`}}).replace(/</g,'\\u003c')}}/>
 </head><body className="qa-body"><QatarEvents/>{children}<ImageAltGuard/><DeferredAnalytics tracking={tracking}/></body></html>;
}
