/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.{html,js}",'./public/stylesheets/index.html',
    "views/*.{html,js,ejs}",
  
  ],
  theme: {
    extend: {
      colors: {
        gray: "rgba(0, 0, 0, 0)",
        gainsboro: {
          100: "#d9d9d9",
          200: "rgba(217, 217, 217, 0)",
        },
        whitesmoke: "#f5f5f5",
        darkslategray: {
          100: "#3c3c34",
          200: "rgba(60, 60, 52, 0.6)",
        },
        white: "#fff",
        wheat: "#d7ceb2",
      },
      fontFamily: {
        "helvetica-neue": "'Helvetica Neue'",
        "bebas-neue": "'Bebas Neue'",
      },
    },
    fontSize: {
      "17xl": "2.25rem",
      "29xl": "3rem",
      "13xl": "2rem",
      "5xl": "1.5rem",
      base: "1rem",
      inherit: "inherit",
    },
  },
  corePlugins: {
    preflight: false,
  },
  
};
