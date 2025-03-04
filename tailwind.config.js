/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/main.js"],
  theme: {
    extend: {
      fontFamily:{
        poppins: ['poppins', 'serif']
      },
      colors:{
        "primary": '#5ec576',
        "secondary": '#ffcb03',
        "tertiary": "#ff585f",
        "primary-darker": '#4bbb7d',
        "secondary-darker": '#ffbb00',
        "tertiary-darker": '#fd424b',
        "primary-opacity": '#5ec5763a',
        "secondary-opacity": '#ffcd0331',
        "tertiary-opacity": "#ff58602d",
        "lightDark": '#444444',
      },   
      backgroundImage:{
        "gradient-primary": "linear-gradient(to top left, #39b385, #9be15d)",
        "gradient-secondary": "linear-gradient(to top left, #ffb003, #ffcb03)",
      }
    },
  },
  plugins: [],
}

