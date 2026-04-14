import { mtConfig } from "@material-tailwind/react";

/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",

    "./src/**/*.{js,ts,jsx,tsx}",

    "./node_modules/@material-tailwind/react/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {},
  },

  plugins: [
    mtConfig({
      colors: {
        primary: {
          default: "#facc15",
          dark: "#eab308",
          light: "#fde047",
          foreground: "#030712",
        },
      },
      darkColors: {
        primary: {
          default: "#facc15",
          dark: "#eab308",
          light: "#fde047",
          foreground: "#030712",
        },
      },
    }),
  ],
};
