import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        yale: {
          blue: "#00356b",
          black: "#222222",
          gray: "#f9f9f9",
          accent: "#FF4500", // 👈 THIS IS THE NEW ORANGE COLOR
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Times New Roman', 'serif'],
        sans: ['var(--font-inter)', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;