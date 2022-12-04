/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Complex site-specific column configuration
        'homePage': 'minmax(1em, 10%) 28ch auto',
      }
    },
  },
  plugins: [],
}
