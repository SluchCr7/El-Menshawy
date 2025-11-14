/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg:`#0B3D2E`,
        textGold:`#C8A64B`,
        text2:`#F7F6F2`,
        sandBeige:`#D9C7A3`,
        Black:`#1A1A1A`,
        lightGreen:`#4A7856`
      },
    },
  },
  plugins: [],
};
