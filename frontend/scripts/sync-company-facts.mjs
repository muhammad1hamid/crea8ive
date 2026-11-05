import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
await fs.copyFile(path.join(root,'src/data/qatar-redirects.json'),path.join(root,'public/qatar-redirects.json'));
const company=JSON.parse(await fs.readFile(path.join(root,'src/data/company.json'),'utf8'));
if(!['prelaunch','registered'].includes(company.qatarEntityStatus))throw new Error('Invalid Qatar status');
if(company.qatarEntityStatus==='registered'&&(!company.qatarRegistrationVerified||['qatarLegalName','qatarRegistrationNumber','qatarAddress','qatarPhone','qatarEmail'].some(k=>!company[k])))throw new Error('Qatar registration facts are incomplete');
const file=path.join(root,'public/crea8iv-ai-facts.json');const facts=JSON.parse(await fs.readFile(file,'utf8'));
facts.lastUpdated=company.updated;facts.canonicalWebsite=company.website+'/';
facts.organization={brandName:company.brandName,legalName:company.brandName,businessForm:company.pakistanEntityType,founderAndCEO:company.founderName,location:`${company.addressLocality}, Pakistan`,address:company.pakistanBusinessAddress,phone:company.pakistanPhone,email:company.email,primaryMarkets:['Pakistan','Qatar'],languages:['English','Urdu','Arabic'],businessInformationUrl:company.website+'/company-verification/',qatar:{status:company.qatarEntityStatus,legalName:company.qatarLegalName,registrationNumber:company.qatarRegistrationNumber,address:company.qatarAddress,phone:company.qatarPhone,email:company.qatarEmail,googleBusinessProfile:company.qatarGoogleBusinessProfile,serviceAreas:company.qatarMarkets,languages:company.qatarLanguages}};
facts.qatarServicesUrl=company.website+'/qatar/#services';facts.qatarAnswersUrl=company.website+'/qatar/#faq';facts.qatarContactUrl=company.website+'/qatar/#partnership-enquiry';
facts.organization.primaryMarkets=['Pakistan','United States','United Kingdom','Canada','Australia','United Arab Emirates','Saudi Arabia','Qatar'];
facts.organization.languages=['English','Urdu'];
facts.internationalMarkets={hub:company.website+'/locations/',deliveryBase:'Rawalpindi, Pakistan',officeDisclaimer:'Service markets are not overseas office locations.',publishedLanguage:'English',urls:['us','uk','canada','australia','uae','saudi-arabia','qatar'].map(slug=>company.website+'/'+slug+'/')};
facts.internationalMarkets.servicePages=['us','uk','canada','australia','uae','saudi-arabia'].flatMap(m=>['web-development','google-ads-management','ai-visibility-seo'].map(s=>`${company.website}/${m}/${s}/`));
facts.internationalMarkets.cityPages=['us/new-york','uk/london','canada/toronto','australia/sydney','uae/dubai','saudi-arabia/riyadh'].map(p=>`${company.website}/${p}/`);
await fs.writeFile(file,JSON.stringify(facts,null,2)+'\n');await fs.mkdir(path.join(root,'public/resources'),{recursive:true});await fs.writeFile(path.join(root,'public/resources/crea8iv-ai-facts.json'),JSON.stringify(facts,null,2)+'\n');
const old='CREA8IV MEDIA MARKETING AGENCY (PRIVATE) LIMITED';
for(const name of ['llms.txt','answers.md','service-answer-briefs.md','ai-citation-sources.md']){
 const p=path.join(root,'public',name);let text=await fs.readFile(p,'utf8');
 text=text.replaceAll(old,`${company.brandName}, a Pakistan ${company.pakistanEntityType}`);
 text=text.split('\n').map(line=>/SECP CUIN|FBR taxpayer registration|CUIN 0335790/.test(line)?`- [Business information](${company.website}/company-verification/): Current Pakistan ${company.pakistanEntityType}. Former company credentials are not current business credentials.`:line).join('\n');
 const marker='\n## Qatar business facts (generated)';text=text.split(marker)[0].trimEnd();
 text+=`${marker}\n\n- Brand: ${company.brandName}\n- Delivery base: Rawalpindi, Pakistan\n- Pakistan business form: ${company.pakistanEntityType}\n- Qatar service market: ${company.website}/qatar/\n- All international markets: ${company.website}/locations/\n- Published market-page language: English. Arabic and German pages are not currently published.\n- Priority services: website development, Google Ads management, SEO and AI search visibility.\n- Business answers: ${company.website}/qatar/#faq\n- Official contact: ${company.email}\n- Qatar phone: No local number is claimed.\n- Qatar office: No Qatar office address is claimed.\n- AI visibility work does not guarantee rankings, citations or recommendations.\n`;
 await fs.writeFile(p,text);
}
console.log('Company and Qatar public facts synchronized from src/data/company.json');
