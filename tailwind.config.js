/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  // purge: {
  //   enabled: true,
  //   options: {
  //     keyframer: true,
  //     fontFace: true,
  //   },
  // },
  theme: {
    extend: {},
  },
  plugins: [
    require("postcss"),
    require("tailwindcss"),
    require("autoprefixer"),
    require("flowbite/plugin"),
  ],
};
