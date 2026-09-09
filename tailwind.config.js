/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-pink': '#EE3364',
        'deep-pink': '#D92756',
        'soft-pink': '#FAD9E2',
        'light-blush': '#FFF3F6',
        'off-white': '#FFFCFC',
        'charcoal': '#151515',
        'medium-grey': '#686868',
        'border-color': '#ECE7E8',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        script: ['Caveat', 'cursive'],
      }
    },
  },
  plugins: [],
}
