# Crea8iv Media UI/UX Master Plan

**9 November 2026 · Locations pilot aur public website rollout**

Approved homepage visual reference hai. Har page ko uske visitor ke kaam ke mutabiq organize karein. Page ke upar offer aur next step samajh aaye, beech mein relevant details aur evidence mile, aur visitor asaani se service, market, project ya enquiry tak pohanch sake. Implementation ek requested page ya template par hogi.

## 1. Locations pilot

Current local build mein saat markets hero ke foran baad ek grid mein hain. Existing globe artwork, teen connected service cards, four-step delivery process, proof links, chaar FAQs aur closing enquiry action bhi maujood hain. Build comparison mein H1, metadata, language alternates, schema aur country destinations verify hue. Fresh desktop/mobile rendering aur interactions abhi verify karne hain. [Locations source](../frontend/src/app/(global)/locations/page.tsx)

| Section | Visitor ka sawal | Review aur polish |
| --- | --- | --- |
| Hero | Aap kya offer karte hain aur delivery kahan se hoti hai? | H1, Rawalpindi se remote delivery aur dono existing actions ko pehli nazar mein clear rakhein. Desktop par copy aur globe ko balance karein. Mobile par heading wraps aur CTA sizing check karein. |
| Markets served | Kya aap meri market serve karte hain? | Saat cards ek hi grid mein. Country name, useful intro aur clear destination. Comparable rows mein heights aur links align hon. 320px par long names aur text poora nazar aaye. |
| Connected services | Website, Google Ads aur SEO/AI ek saath kaise kaam karte hain? | Homepage ke “How it connects” cards aur existing icons use karein. Har service ke points aur link preserve karein. Enquiry flow ko mobile par aasani se scan karne layak rakhein. |
| Remote delivery | Project kaise chalega aur progress kaise review hogi? | Chaar existing steps preserve karein. Mobile process accordion tap aur keyboard se test karein. Long descriptions khulne par layout stable rahe. |
| Proof aur FAQs | Aap ke kaam aur market coverage ko kaise verify karoon? | Case studies, company verification aur About ki links clear rakhein. FAQs mein remote scope, office distinction aur service qualifications intact hon. |
| Closing CTA | Project discuss karne ka next step kya hai? | “Discuss your project” ko homepage ke primary button style mein rakhein aur existing contact destination tak journey verify karein. |

Pilot mein teen tasks chalayein: visitor apni country dhoondh kar open kare, service ko case study se samjhe, aur remote delivery FAQ se contact tak pohanche. Observe karein ke mobile par koi extra scroll, hidden action ya unclear label in tasks ko delay karta hai. Fixes ko observed issue ke mutabiq prioritize karein.

## 2. Shared design system

| Element | Rule |
| --- | --- |
| Typography | Josefin Sans ki existing family aur “How buyers decide” ki heading/body hierarchy. Short introductions aur headings centre-aligned jahan fit hon. Long copy, tables aur forms readable alignment mein. |
| Colour and spacing | Brand orange **#FF6801**, existing dark/light surfaces, cream aur green palette, aur existing responsive spacing. Orange ko primary action aur meaningful emphasis ke liye reserve karein. |
| Cards and buttons | Homepage ki relevant card family aur button treatments reuse karein. Equal padding, consistent image ratio aur aligned actions. Card content lamba ho to responsive layout aur light concision se balance karein. |
| Images and proof | Relevant client visuals, screenshots aur approved illustrations pehle reuse karein. “How it connects” wale dimensional icons reuse karein. Naya marketing concept chahiye ho to owner ka reference pehle lein. |
| Editorial patterns | Repeated Insights mein existing notched editorial cards. Case studies mein actual work aur scope clearly dikhayein. Proof, process aur FAQ sections tab use karein jab woh page ka sawal solve karte hon. |
| Interactions | Clear hover, visible keyboard focus, reduced motion aur 44px touch targets ka aim. 3D carousel/perspective cards default component set se excluded hain. |

Shared component ki appearance ek jagah maintain karein. Page ka title, copy, image, CTA aur list data uske inputs se aaye. Locations mein connected cards, delivery aur FAQ ki reusable presentation available hai. Agla shared component tab extract karein jab doosra page usay use kare. [Homepage design system](HOMEPAGE_DESIGN_SYSTEM.md)

## 3. Rollout order

Yeh recommended order actual navigation aur user journeys par based hai. Har row mein ek representative page review karein, phir wohi pattern related pages par apply karein jab woh scope mein aayen.

| Wave | Routes | UX priority |
| --- | --- | --- |
| 1 · Pilot | `/locations/` | Desktop/mobile QA, country discovery, service links, FAQ aur contact handoff. |
| 2 · Core services | `/website-development/`, `/google-ads/`, `/ai-search-optimization/` | Website Development ka recent revamp reference ke taur par review karein. Google Ads aur AI Search ke liye offer → evidence → process → enquiry flow test karein. |
| 3 · Enquiry and pricing | `/pricing/`, `/contact/`, `/consultation/` | Package differences, next steps, form labels, field errors aur submission states. Local mock data se test karein. |
| 4 · Work and trust | `/results/`, `/case-studies/`, `/website-portfolio/`, phir About aur Company Verification | Genuine work ko scan aur open karna asaan ho. Client, scope aur available evidence ki clear hierarchy ho. |
| 5 · Coverage and catalogue | Country routes, remaining Solutions, `/industries/`, phir Platforms aur Tools | Market/service content ko common layouts par map karein. Countries ka remote delivery scope clear rahe. Tools apni task-specific interaction rakhein. |
| 6 · Editorial | `/blog/`, Guides, Research, Comparisons aur Playbooks | Consistent Insights cards, clear article hierarchy aur relevant links. Article intent aur SEO evidence ke saath page-specific decisions karein. |

Core service pages mein hero aur evidence ka style common ho sakta hai, lekin primary action page ke intent se nikle. Pricing par visitor plans compare kar raha hota hai. Results par work inspect kar raha hota hai. Contact par woh enquiry complete karna chahta hai. Har page ka section order isi kaam ko support kare.

## 4. Har page ki delivery aur QA

1. **Baseline.** Current page ka route, intent, primary action, section order, key links aur SEO fields note karein. Desktop aur mobile captures lein jahan browser access available ho.
2. **Page map.** Existing content ko retain, move ya lightly concise ke taur par map karein. Har section ko approved component family aur relevant asset se match karein. Full message, qualifications aur destinations preserve karein.
3. **Implementation.** Focused branch par page ko revamp karein. Heading hierarchy, copy, cards aur CTA order ko content ke mutabiq test karein. Homepage hero ko approved reference rakhein.
4. **Visual and interaction QA.** **320, 390, 768 aur 1440px** par dark aur light theme inspect karein. Overflow, readable contrast, card heights, image crop, CTA visibility, keyboard focus, navigation, accordions aur reduced motion check karein. Shared component badle to homepage consumer bhi inspect karein.
5. **SEO and build.** Existing URL, title/description, H1 meaning, canonical, indexing, language alternates, structured data aur contextual links compare karein. Relevant checks `frontend/README.md` se run karein. Heavy images aur visible layout shift ke liye comparable before/after capture review karein.
6. **Handoff.** Local preview, before/after evidence, verified flows aur open issues share karein. Deployment authorisation ke baad backup aur separate live verification karein. Form, email ya booking delivery ko uske apne check se verify karein.

**Agla kaam:** Locations ki visual QA complete karein aur sirf observed issues polish karein. Mobile par country discovery aur contact handoff pilot ke main acceptance checks hain. Fresh browser observation saved access restriction ki wajah se abhi pending hai.
