import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "@next/next/no-html-link-for-pages": "warn",
      "react-hooks/immutability": "warn",
      "react-hooks/set-state-in-effect": "warn",
    },
  },
  {
    files: ["next.config.js"],
    rules: { "@typescript-eslint/no-require-imports": "off" },
  },
  {
    // These components deliberately use document navigation for the legacy /qa/*
    // route family so Hostinger can apply its full-page redirect rules.
    files: ["src/components/qatar/**/*.tsx"],
    rules: { "@next/next/no-html-link-for-pages": "off" },
  },
  globalIgnores([
    "node_modules/**",
    ".next/**",
    ".next-dev/**",
    "out/**",
    "build/**",
    "coverage/**",
    "next-env.d.ts",
  ]),
]);
