/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#3ABFF8',
          DEFAULT: '#0284C7',
          dark: '#0369A1',
        },
      },
      fontFamily: {
        exo: ['Exo', 'sans-serif'],
        bitgrid: ['"Bitcount Grid Double"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
