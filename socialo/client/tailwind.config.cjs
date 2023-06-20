/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {

        'gray-900': '#202124',
        'gray-800': '#36373a',
        'gray-700': '#4d4d50',
        'gray-600': '#636466',
        'gray-500': '#797a7c',
        'gray-400': '#909092',
        'gray-300': '#a6a6a7',
        'gray-200': '#bcbcbd',
        'gray-100': '#d2d3d3',

        'purple-900': '#170529',
        'purple-800': '#2f0a53',
        'purple-700': '#46107c',
        'purple-600': '#5e15a6',
        'purple-500': '#751ACF',
        'purple-400': '#9148d9',
        'purple-300': '#ac76e2',
        'purple-200': '#c8a3ec',
        'purple-100': '#f1e8fa',


        'link-blue': '#0078f4',
        'text-gray': '#646778',


        'red': '#652826',
        'darkBlue': '#0c3b5f', //dark blue
        'green': '#245a24',
        'yellow': '#655d1a',
        'gray': '#3b3f43',
        'orange': '#492e18',  // brown
        'brown': '#674917',   // orange
        'purple': '#47265d',
        'teal': '#00514c',    // teal
        'blue': '#16565f',    // blue
        'pink': '#641e43',    // pink


      },
      backgroundColor: {
        'gray-background': '#191919',
        'black': '#000',
      },
      backgroundImage: {
        'parallax-image': "url('/assets/bg_1.png')",
      },
      keyframes: {
        sliderName: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(-80px * 12))' }
        },
      },
      animation: {
        'slider': 'sliderName 4s linear infinite',
      },


    },
  },
  variants: {},
  plugins: [],
}; 