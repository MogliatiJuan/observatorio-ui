/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx}"],
  theme: {
    extend: {
      fontSize: {
        xs: ["0.695rem", { lineHeight: "0.75rem" }],
        sm: ["0.75rem", { lineHeight: "1rem" }],
        base: ["0.875rem", { lineHeight: "1.25rem" }],
        lg: ["1rem", { lineHeight: "1.5rem" }],
        xl: ["1.125rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.150rem", { lineHeight: "2rem" }],
        "3xl": ["1.175rem", { lineHeight: "2.25rem" }],
      },
      lineHeight: {
        none: "1rem",
      },
      width: {
        line: "0.072rem",
        homeLogo: "45rem",
        fit: "fit-content",
        "detail-screen": "45rem",
        "7/10": "70%",
      },
      height: {
        fit: "fit-content",
        0.3: "0.08rem",
        map: "96.5%",
        outlet: "calc(100vh - 5rem)",
        "13/20": "65%",
        "7/20": "35%",
      },
      backgroundImage: { home: "url('src/assets/backgroundObs.jpg')" },
      colors: {
        subtitle: "#00685B",
      },
    },
  },
  plugins: [],
};
