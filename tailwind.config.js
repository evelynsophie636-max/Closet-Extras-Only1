/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: "#F4DDE2",
        beige: "#E9DDCF",
        ivory: "#FFFDF9",
        chocolate: "#0A0A0A",
        taupe: "#A99489",
        champagne: "#C6A36A",
      },
      fontFamily: {
        serif: ['Playfair Display', 'Cormorant Garamond', 'serif'],
        sans: ['DM Sans', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
