/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      // Color of Project
      colors : {
        primary : "#2B85FF",
        secondary : "#EF863E",
        third : "#AAA"
      },
    },
  },
  plugins: [],
}

