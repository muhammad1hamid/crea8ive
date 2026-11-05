/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,ts}"],
  theme: {
    extend: {
      colors: { brand: "#fe6a09" },
      fontFamily: {
        inter: ["Inter", "Inter Fallback", "Arial", "sans-serif"],
        orbitron: ["Orbitron", "Orbitron Fallback", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
