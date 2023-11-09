/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        selected: "hsl(var(--clr-selected) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
