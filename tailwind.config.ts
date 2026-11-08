import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "380px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        background: "#F7F5EF",
        primary: {
          DEFAULT: "#FF4D00",
          hover: "#E04400",
          light: "#FFF0EB",
        },
        secondary: {
          DEFAULT: "#B7F000",
          hover: "#A3D600",
          light: "#F5FFDB",
        },
        accent: {
          DEFAULT: "#784CFF",
          hover: "#6639EB",
          light: "#F0EBFF",
        },
        carbon: "#171717",
        paper: "#F7F5EF",
        sunshine: "#FFE600",
        hotpink: "#FF3388",
        cyanpop: "#00E5FF",
      },
      boxShadow: {
        brutal: "4px 4px 0px #171717",
        "brutal-sm": "2px 2px 0px #171717",
        "brutal-lg": "8px 8px 0px #171717",
        "brutal-xl": "12px 12px 0px #171717",
        "brutal-hover": "1px 1px 0px #171717",
        "brutal-primary": "4px 4px 0px #FF4D00",
        "brutal-secondary": "4px 4px 0px #B7F000",
        "brutal-accent": "4px 4px 0px #784CFF",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-display)", "Impact", "Arial Black", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      animation: {
        marquee: "marquee 22s linear infinite",
        "marquee-reverse": "marquee-reverse 25s linear infinite",
        wiggle: "wiggle 1s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
        shake: "shake 0.5s cubic-bezier(.36,.07,.19,.97) both",
        pulseFast: "pulse 0.8s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shake: {
          "10%, 90%": { transform: "translate3d(-2px, 0, 0)" },
          "20%, 80%": { transform: "translate3d(4px, 0, 0)" },
          "30%, 50%, 70%": { transform: "translate3d(-6px, 0, 0)" },
          "40%, 60%": { transform: "translate3d(6px, 0, 0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;