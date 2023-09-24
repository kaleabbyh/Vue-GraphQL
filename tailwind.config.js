/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      Sans: ["Nunito Sans", "sans-serif"],
    },
    container: {
      center: true,
    },
  },
  plugins: [],
};
