import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          maroon: {
            DEFAULT: "#62060E",
            dark: "#3B0207",
            deep: "#4E040A",
            light: "#7D0A13",
            card: "#6E0811",
            border: "rgba(255, 100, 23, 0.2)",
          },
          orange: {
            DEFAULT: "#FF6417",
            bright: "#FF6417",
            burnt: "#E65100",
            hover: "#FF7B39",
            glow: "rgba(255, 100, 23, 0.35)",
            subtle: "rgba(255, 100, 23, 0.08)",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["'ModeCourt'", "var(--font-inter)", "sans-serif"],
        court: ["'ModeCourt'", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "radial-highlight": "radial-gradient(circle at 50% 0%, rgba(255, 100, 23, 0.15) 0%, transparent 70%)",
        "radial-card": "radial-gradient(circle at 80% 20%, rgba(255, 100, 23, 0.08) 0%, transparent 60%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseSlow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        progress: {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        pulseSlow: "pulseSlow 4s ease-in-out infinite",
        progress: "progress 6s linear forwards",
        fadeUp: "fadeUp 0.6s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
