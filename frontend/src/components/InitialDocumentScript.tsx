"use client";

export default function InitialDocumentScript({ source }: { source: string }) {
  // Execute during HTML parsing. React mounts an inert node if it has to rebuild the document.
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: source }}
    />
  );
}
