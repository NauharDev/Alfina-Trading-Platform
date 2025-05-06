import type { Config } from "tailwindcss";

export default {
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
        primary: '#2663EB',
        customBlueHover: '#1E4ED8',
        customLightBlueHover: '#EFF6FF',
        inButton: '#000000',
      },
    },
  },
  plugins: [],
} satisfies Config;
