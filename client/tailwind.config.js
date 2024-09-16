/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "jump-guy": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-50px)" },
        },
      },
      animation: {
        "jump-guy": "jump-guy 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
