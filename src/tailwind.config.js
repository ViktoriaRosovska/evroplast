/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.ts", "./**/*.html", "./node_modules/flowbite/**/*.js"],
  theme: {
    container: {
      // default breakpoints but with 40px removed
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "3rem",
      },
    },
  },

  plugins: [require("flowbite/plugin")],
};
