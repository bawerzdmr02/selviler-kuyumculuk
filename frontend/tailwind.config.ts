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
        noir: "#202020",
        charcoal: "#3A3A3A",
        muted: "#616057",
        gold: "#C9A24B",
        "gold-light": "#E5C97B",
        ivory: "#F7F5EE",
        cream: "#FAFAF8",
        surface: "#FFFFFF",
        border: "#E5E1D6",
      },
      fontFamily: {
        serif: ["var(--font-caslon)", "Georgia", "Times New Roman", "serif"],
        sans: ["var(--font-montserrat)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 8px 30px rgba(32, 32, 32, 0.06)",
        "card-hover": "0 16px 40px rgba(201, 162, 75, 0.18)",
        gold: "0 8px 24px rgba(201, 162, 75, 0.28)",
      },
    },
  },
  plugins: [],
};

export default config;
