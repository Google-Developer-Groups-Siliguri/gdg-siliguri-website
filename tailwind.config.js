/** @type {import('tailwindcss').Config} */

const colorRoles = [
  "primary",
  "on-primary",
  "primary-container",
  "on-primary-container",
  "secondary",
  "on-secondary",
  "secondary-container",
  "on-secondary-container",
  "tertiary",
  "on-tertiary",
  "tertiary-container",
  "on-tertiary-container",
  "error",
  "on-error",
  "error-container",
  "on-error-container",
  "surface",
  "surface-dim",
  "surface-bright",
  "surface-container-lowest",
  "surface-container-low",
  "surface-container",
  "surface-container-high",
  "surface-container-highest",
  "on-surface",
  "on-surface-variant",
  "outline",
  "outline-variant",
  "inverse-surface",
  "inverse-on-surface",
  "inverse-primary",
  "scrim",
];

const googleColors = ["blue", "red", "yellow", "green"].flatMap((name) => [
  `g-${name}`,
  `on-g-${name}`,
  `g-${name}-container`,
  `on-g-${name}-container`,
]);

const tokenColors = Object.fromEntries(
  [...colorRoles, ...googleColors].map((role) => [
    role,
    `rgb(var(--md-${role}) / <alpha-value>)`,
  ])
);

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["ProductSans", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-lg": ["3.5625rem", { lineHeight: "4rem", letterSpacing: "-0.016em" }],
        "display-md": ["2.8125rem", { lineHeight: "3.25rem" }],
        "display-sm": ["2.25rem", { lineHeight: "2.75rem" }],
        "headline-lg": ["2rem", { lineHeight: "2.5rem" }],
        "headline-md": ["1.75rem", { lineHeight: "2.25rem" }],
        "headline-sm": ["1.5rem", { lineHeight: "2rem" }],
        "title-lg": ["1.375rem", { lineHeight: "1.75rem" }],
        "title-md": ["1rem", { lineHeight: "1.5rem", letterSpacing: "0.009em" }],
        "title-sm": ["0.875rem", { lineHeight: "1.25rem", letterSpacing: "0.007em" }],
        "body-lg": ["1rem", { lineHeight: "1.5rem", letterSpacing: "0.031em" }],
        "body-md": ["0.875rem", { lineHeight: "1.25rem", letterSpacing: "0.018em" }],
        "body-sm": ["0.75rem", { lineHeight: "1rem", letterSpacing: "0.033em" }],
        "label-lg": ["0.875rem", { lineHeight: "1.25rem", letterSpacing: "0.007em" }],
        "label-md": ["0.75rem", { lineHeight: "1rem", letterSpacing: "0.042em" }],
        "label-sm": ["0.6875rem", { lineHeight: "1rem", letterSpacing: "0.045em" }],
      },
      borderRadius: {
        "m3-xs": "4px",
        "m3-sm": "8px",
        "m3-md": "12px",
        "m3-lg": "16px",
        "m3-lg-inc": "20px",
        "m3-xl": "28px",
        "m3-xl-inc": "32px",
        "m3-2xl": "48px",
      },
      boxShadow: {
        "elevation-1": "0 1px 2px rgb(0 0 0 / 0.3), 0 1px 3px 1px rgb(0 0 0 / 0.15)",
        "elevation-2": "0 1px 2px rgb(0 0 0 / 0.3), 0 2px 6px 2px rgb(0 0 0 / 0.15)",
        "elevation-3": "0 1px 3px rgb(0 0 0 / 0.3), 0 4px 8px 3px rgb(0 0 0 / 0.15)",
      },
      colors: {
        ...tokenColors,
        brand: {
          blue: "#4285F4",
          red: "#EA4335",
          yellow: "#FBBC04",
          green: "#34A853",
        },
      },
      transitionTimingFunction: {
        "spatial-fast": "cubic-bezier(0.42, 1.67, 0.21, 0.9)",
        spatial: "cubic-bezier(0.38, 1.21, 0.22, 1)",
        "spatial-slow": "cubic-bezier(0.39, 1.29, 0.35, 0.98)",
        "effects-fast": "cubic-bezier(0.31, 0.94, 0.34, 1)",
        effects: "cubic-bezier(0.34, 0.8, 0.34, 1)",
        "effects-slow": "cubic-bezier(0.34, 0.88, 0.34, 1)",
        emphasized: "cubic-bezier(0.2, 0, 0, 1)",
        "emphasized-decelerate": "cubic-bezier(0.05, 0.7, 0.1, 1)",
        "emphasized-accelerate": "cubic-bezier(0.3, 0, 0.8, 0.15)",
      },
      transitionDuration: {
        "spatial-fast": "350ms",
        spatial: "500ms",
        "spatial-slow": "650ms",
        "effects-fast": "150ms",
        effects: "200ms",
        "effects-slow": "300ms",
      },
      keyframes: {
        "spin-slow": { to: { transform: "rotate(360deg)" } },
        "rise-in": {
          from: { opacity: "0", transform: "translateY(24px) scale(0.98)" },
          to: { opacity: "1", transform: "none" },
        },
      },
      animation: {
        "spin-slow": "spin-slow 24s linear infinite",
        "rise-in": "rise-in 650ms cubic-bezier(0.05, 0.7, 0.1, 1) both",
      },
      maxWidth: {
        page: "80rem",
      },
    },
  },
  plugins: [],
};
