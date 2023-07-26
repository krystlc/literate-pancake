import forms from "@tailwindcss/forms";

export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      /**
       * rough estimate of colors referencing
       * a figma slide and https://coolors.co/
       */
      "space-cadet": "#282639",
      "english-violet": "#3E3C4E",
      "rich-black": "#060417",
      white: "#ffffff",
      "light-green": "#6DDD8B",
      "french-gray": "#B0AFB6",
    },
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
      /**
       * TODO: Rubik font is also referenced in the figma,
       * confirm it's supposed to be implemented or if it's an oversight
       */
    },
    extend: {},
  },
  plugins: [forms],
};
