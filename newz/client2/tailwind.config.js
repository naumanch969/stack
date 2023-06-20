/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "blue": "#0078d2",
        "light-gray": "#f2f2f2",
        "text-gray": "#111",
        "text-gray-dark": "#515151",
      }
    },
  },
  plugins: [],
}