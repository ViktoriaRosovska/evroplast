/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.ts", "./**/*.html", "./node_modules/flowbite/**/*.js"],
  theme: {
    container: {
      // default breakpoints but with 40px removed
      screens: {
        sm: "320px",
        md: "748px",
        lg: "984px",
        xl: "1900px",
      },
    },
  },

  plugins: [require("flowbite/plugin")],
};
