/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#FFF7FC",
        "bg-secondary": "#ffffff",
        "blue-primary": "#8B93FF",
        "blue-active": "#5755FE",
        "pink-primary": "#FF71CD",
      },
    },
  },
  plugins: [],
};
