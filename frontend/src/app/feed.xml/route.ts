// Alias of /rss.xml — same feed, second conventional URL some Pinterest/feed
// tooling defaults to. Re-exports the identical handler so there is exactly
// one place that generates the XML.
export { GET } from "../rss.xml/route";
// Next.js reads route configuration directly from each route file.
export const dynamic = "force-static";
export const revalidate = 3600;
