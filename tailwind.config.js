/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      minWidth: {
        4: '1rem',
      },
      boxShadow: {
        'inner-dark': 'inset 0 0 4rem 1rem rgb(0 0 0 / 0.5)',
      },
    },
  },
  plugins: [],
};
