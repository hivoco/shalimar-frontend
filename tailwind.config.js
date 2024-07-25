/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      extend: {
        backgroundImage: (theme) => ({
          logo: "url('svg/Tata-gluco-logo.svg')",
          ss: "url('/svg/star.svg')",
        }),
      },
      fontFamily: {
        Inter: ["Inter", "sans-serif"],
        LtEnergy: ["LT Energy", "sans-serif"],
        Heebo:["Heebo","sans-serif"],
        DarkerGrotesque:["DarkerGrotesque","sans-serif"],
      },
    },
  },
  plugins: [],
};
