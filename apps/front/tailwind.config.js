/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlue: '#5272F2',
        customBlueOpacity: "#FCF1F4"
      },
      fontFamily: {
        'SFMedium': ['SFMedium'],
        'SFHeavy': ['SFHeavy'],
        'SFRegular': ['SFRegular'],


      },
    },
  },
  plugins: [],
}