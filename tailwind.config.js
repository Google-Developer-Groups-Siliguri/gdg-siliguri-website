/** @type {import('tailwindcss').Config} */

const roles = {
  pri: "--pri",
  "on-pri": "--on-pri",
  "pri-c": "--pri-c",
  "on-pri-c": "--on-pri-c",
  sec: "--sec",
  "sec-c": "--sec-c",
  "on-sec-c": "--on-sec-c",
  ter: "--ter",
  "ter-c": "--ter-c",
  "on-ter-c": "--on-ter-c",
  srf: "--srf",
  "srf-0": "--srf-0",
  "srf-1": "--srf-1",
  "srf-2": "--srf-2",
  "srf-3": "--srf-3",
  "srf-4": "--srf-4",
  "on-srf": "--on-srf",
  "on-srf-v": "--on-srf-v",
  out: "--out",
  "out-v": "--out-v",
};

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        urbanist: ["Urbanist", "ui-sans-serif", "system-ui", "sans-serif"],
        manrope: ["Manrope", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: Object.fromEntries(
        Object.entries(roles).map(([name, token]) => [name, `var(${token})`])
      ),
      transitionTimingFunction: {
        emph: "cubic-bezier(.22,1,.36,1)",
        spring: "cubic-bezier(.34,1.56,.64,1)",
        bounce: "cubic-bezier(.34,1.4,.64,1)",
      },
      maxWidth: {
        page: "1280px",
      },
    },
  },
  plugins: [],
};
