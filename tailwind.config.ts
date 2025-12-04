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
          blue: "#00356b", // The official Yale Blue
          black: "#222222",
          gray: "#f9f9f9",
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