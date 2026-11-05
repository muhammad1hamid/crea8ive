import { PAGE_METADATA, pageUrl } from "@/lib/seo-metadata";
import { SITE_URL } from "@/lib/site-config";

type PageSchemaProps = {
  slug: string;
  name?: string;
  description?: string;
  pageType?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
  datePublished?: string;
  dateModified?: string;
};

export default function PageSchema({
  slug,
  name,
  description,
  pageType,
  datePublished,
  dateModified,
}: PageSchemaProps) {
  const metadata = PAGE_METADATA[slug];
  const url = pageUrl(slug);
  const type =
    pageType || (slug === "about" ? "AboutPage" : slug === "contact" ? "ContactPage" : "WebPage");
  const resolvedName = name || metadata?.title || "Crea8iv Media";
  const resolvedDescription = description || metadata?.description;
  const isHome = slug === "home";

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": type,
        "@id": `${url}#webpage`,
        url,
        name: resolvedName,
        description: resolvedDescription,
        abstract: metadata?.summary || resolvedDescription,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        primaryImageOfPage: { "@id": `${SITE_URL}/#logo` },
        breadcrumb: isHome ? undefined : { "@id": `${url}#breadcrumb` },
        datePublished,
        dateModified,
        inLanguage: "en-PK",
      },
      ...(!isHome
        ? [
            {
              "@type": "BreadcrumbList",
              "@id": `${url}#breadcrumb`,
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
                { "@type": "ListItem", position: 2, name: resolvedName, item: url },
              ],
            },
          ]
        : []),
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

