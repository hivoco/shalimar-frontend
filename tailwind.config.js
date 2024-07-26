/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "570px",
      md: "570px",
      lg: "570px",
      xl: "570px",
      "2xl": "570px",
    },
    container: {
      center: true,
    },
    extend: {
      backgroundImage: {
        quiz_bg: "url('/images/bg_quiz_screen.png')",
      },
      fontFamily: {
        Barlow: ["Barlow", "sans-serif"],
        RiftSoft: ["Rift Soft", "sans-serif"],
        Montserrat:["Montserrat","sans-serif"]
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in",
      },
    },
  },
  plugins: [],
};
