/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        "guiColor": "#FDA769",
        "btnColor": "#3c8dbc",
        "redColor": "#f56954",
      }
    }
  },
  plugins: []
};