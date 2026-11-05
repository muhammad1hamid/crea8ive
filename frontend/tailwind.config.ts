import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Legacy aliases (kept for existing usages)
        primary: '#FF6801',
        accent: '#FF6801',
        dark: '#171716',
        card: 'rgba(255, 255, 255, 0.06)',
        muted: '#b9c4d6',
        // ── Luxury brand ramp ───────────────────────────────────────────────
        brand: {
          50: '#FCFAEE',
          100: '#f7f0df',
          200: '#DBD0BE',
          300: '#ffb27a',
          400: '#ff8a2a',
          500: '#FF6801', // primary accent
          600: '#e85d00',
          700: '#c24a00',
          900: '#3a1700',
          ember: '#ff8a2a',
          molten: '#FF6801',
          cream: '#FCFAEE',
          beige: '#DBD0BE',
          green: '#0C5446',
        },
        ink: {
          950: '#030303',
          900: '#0a0a0c',
          850: '#101012',
          800: '#171716',
        },
      },
      fontFamily: {
        orbitron: ["var(--font-display)", "var(--font-primary)", "sans-serif"],
        inter: ["var(--font-primary)", "Arial", "Helvetica", "sans-serif"],
        sans: ["var(--font-primary)", "Arial", "Helvetica", "sans-serif"],
        syne: ["var(--font-display)", "var(--font-primary)", "sans-serif"],
      },
      boxShadow: {
        // Legacy
        'glow': '0 0 20px rgba(255, 104, 1, 0.35)',
        'glow-hover': '0 0 25px rgba(255, 104, 1, 0.6)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        // Luxury glow system
        'glow-sm': '0 0 12px rgba(255,104,1,.25)',
        'glow-lg': '0 0 40px rgba(255,104,1,.45)',
        'glow-ring': '0 0 0 1px rgba(255,104,1,.5), 0 0 24px rgba(255,104,1,.35)',
        'inset-line': 'inset 0 1px 0 rgba(255,255,255,.06)',
      },
      transitionTimingFunction: {
        // The "Apple" expo-out curve used for entrances + hover.
        'lux': 'cubic-bezier(0.16,1,0.3,1)',
        'lux-in-out': 'cubic-bezier(0.65,0,0.35,1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-x': 'gradient-x 15s ease infinite',
        // Real shimmer sweep (translates an overlay across the element).
        'shimmer': 'shimmer 1.4s cubic-bezier(0.16,1,0.3,1) infinite',
        // Slowly rotating conic border for the nav pill.
        'spin-slow': 'spin 10s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        shimmer: {
          '0%': { transform: 'translateX(-150%)' },
          '100%': { transform: 'translateX(250%)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'ai-glow': 'radial-gradient(circle at center, rgba(255,104,1,0.15) 0%, rgba(0,0,0,0) 70%)',
        'molten': 'linear-gradient(135deg,#ff8a2a 0%,#ff6801 45%,#f54705 100%)',
        'molten-soft': 'linear-gradient(135deg,rgba(255,138,42,.16),rgba(245,71,5,.10))',
      },
    },
  },
  plugins: [],
};

export default config;
