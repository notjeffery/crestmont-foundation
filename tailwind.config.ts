   import type { Config } from "tailwindcss";

   const config: Config = {
     content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
     theme: {
       extend: {
         colors: {
           ink: { DEFAULT: "#111111", 900: "#0A0A0A", 700: "#2A2A2A" },
           burnt: { DEFAULT: "#D9541E", light: "#E8794A", dark: "#B8431A" },
           cream: "#F3EEE3",
         },
         fontFamily: {
           serif: ["var(--font-playfair)", "serif"],
           sans: ["var(--font-inter)", "sans-serif"],
         },
       },
     },
     plugins: [],
   };
   export default config;