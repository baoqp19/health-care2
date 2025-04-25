/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00A76F",
        "primary-hover": "#007867",
      },
      backgroundColor: (theme) => ({   // bg-primary
        ...theme('colors'),
      }),
      textColor: (theme) => ({      // text-primary
        ...theme('colors'),
      }),
      borderColor: (theme) => ({    // border-primary
        ...theme('colors'),
      }),
    },
  },
  plugins: [],
};
