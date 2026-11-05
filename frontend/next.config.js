const path = require("node:path");
const legacyRedirects = require("./src/data/legacy-redirects.json");

/** @type {import('next').NextConfig} */
const isStaticExport =
  process.env.CREA8IV_STATIC_EXPORT === "true" || process.env.EXPORT === "true";

const nextConfig = {
  reactStrictMode: true,
  // Move local chunks off URLs cached by the old immutable development headers.
  assetPrefix: process.env.NODE_ENV === "development" ? "/__crea8iv_dev" : undefined,
  outputFileTracingRoot: path.resolve(__dirname),
  poweredByHeader: false,
  compress: true,
  // Keep the development compiler isolated from production/static builds.
  // Sharing one .next directory can leave the dev server with production
  // chunk paths after a build runs alongside localhost.
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
  output: isStaticExport ? "export" : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "crea8ivmedia.com" },
      { protocol: "https", hostname: "darkgray-eland-964548.hostingersite.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async headers() {
    if (isStaticExport) {
      return [];
    }

    return [
      {
        source: "/img/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/assets/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/wp-content/uploads/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/portfolio-optimized/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/favicon.ico",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/apple-touch-icon.png",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/sitemap.xml",
        headers: [
          { key: "Cache-Control", value: "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400" },
        ],
      },
      {
        source: "/rss.xml",
        headers: [
          { key: "Cache-Control", value: "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400" },
        ],
      },
      {
        source: "/feed.xml",
        headers: [
          { key: "Cache-Control", value: "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400" },
        ],
      },
      {
        source: "/robots.txt",
        headers: [
          { key: "Cache-Control", value: "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400" },
        ],
      },
    ];
  },
  async redirects() {
    if (isStaticExport) {
      return [];
    }

    return [
      ...Object.entries(legacyRedirects).map(([source, destination]) => ({
        source: source.replace(/\/$/, ""), destination, permanent: true,
      })),
      { source: "/website-portfolio/:slug", destination: "/website-portfolio/", permanent: true },
      { source: "/results/:slug", destination: "/results/", permanent: true },
      {
        source: "/clinic/:path*",
        destination: "https://patientflow.crea8ivmedia.com/:path*",
        permanent: false,
      },
      {
        source: "/clinic",
        destination: "https://patientflow.crea8ivmedia.com/login",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
