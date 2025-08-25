/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'shopify-blue': '#008060',
        'shopify-green': '#5cb85c',
        'shopify-gray': '#637381',
      },
    },
  },
  plugins: [],
}
