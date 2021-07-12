module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        "120": "550px",
      },
      fontFamily: {
        Roboto: ["Roboto", "sans-serif"],
      },
    },
    customForms: (theme) => ({
      default: {
        checkbox: {
          icon: (iconColor) =>
            `<svg fill="${iconColor}" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" ><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>`,
          iconColor: theme("colors.gray.800"),
          "&:hover": {
            iconColor: theme("colors.gray.700"),
          },
        },
      },
    }),
  },
  variants: {
    extend: {
      display: ["hover", "group-hover"],
      borderWidth: ["hover", "group-hover"],
      borderColor: ["hover", "group-hover"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
