/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  isDarkMode: {
    extend: {
      colors: {
        'purple-400': '#b97ad0',
        'purple-500': '#a759c4',
        'purple-600': '#86479d',
        'purple-800': '#43244e',
        'purple-900': '#211227',

        'bg': '#fff',
        'bg-soft': '#f6f3f3',
        'text-color': '#000',
        'text-color-soft': '#555',
        'logo': '#43244e',
        'border': '#d3d3d3',

        'bg-dark': '#222222',
        'bg-soft-dark': '#333',
        'text-color-dark': '#f5f5f5',
        'text-color-soft-dark': '#555',
        'border-dark': '#444',



      }
    },
  },
  plugins: [],
}