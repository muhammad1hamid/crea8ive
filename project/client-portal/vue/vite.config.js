import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
export default defineConfig({ plugins: [vue()], build: { outDir: "../php/public/assets", emptyOutDir: false, rollupOptions: { output: { entryFileNames: "app.js", assetFileNames: "app.css" } } } });
