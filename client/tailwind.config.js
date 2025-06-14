/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(-202deg, #FBF8EF 0%, #CDECED 15%, #BEE1D8 46%, #F3FFFD 72%, #B6CDCF 81%, #F8F7F7 100%)',
        'feature-gradient': 'linear-gradient(-202deg, #2f90aeac 0%, #eff2f2 15%, #e9f0ee 46%, #F3FFFD 72%, #96bbbe 81%, #f7f8f8 100%)',
      }
    },
  },
  plugins: [],
}

