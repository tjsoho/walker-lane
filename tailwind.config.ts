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
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          blue: "#4b637e",
          black: "#191515",
          cream: "#e1ded4",
          brown: {
            light: "#c9b9a6",
            DEFAULT: "#a58d75",
            dark: "#694837",
          }
        },
      },
      fontFamily: {
        kiona: ['var(--font-kiona)'],
        ttNorms: ['var(--font-tt-norms)'],
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
      keyframes: {
        'kenburns-zoom': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' },
        },
      },
      animation: {
        'kenburns-zoom': 'kenburns-zoom 20s ease-out forwards',
      },
    },
  },
  plugins: [],
};

export default config;
