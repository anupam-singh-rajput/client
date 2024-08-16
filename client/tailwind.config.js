// // tailwind.config.js
// module.exports = {
//   content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  screens: {
    'sm': '640px',
    'md': '768px',
    'lg': '1024px',
    'xl': '1280px',
    '2xl': '1536px',
  },
}
