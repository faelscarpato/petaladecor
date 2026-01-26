import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#359EFF",
        accent: "#d97706",
        "brand-cream": "#FDFBF7",
        "brand-gold": "#C5A35D",
        "background-light": "#f5f7f8",
        "background-dark": "#0f1923",
        "stone-warm": "#f7f3f0",
        clay: "#a68288"
      },
      fontFamily: {
        display: ["Noto Serif", "serif"],
        serif: ["Playfair Display", "serif"]
      },
      borderRadius: {
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      }
    }
  },
  plugins: []
} satisfies Config;
