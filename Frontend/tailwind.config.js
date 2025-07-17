import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        
          primary:'#3B82F6',  
          lightBlueBg: '#F0F8FF', 
          darkGrayText: '#1F2937',
      },
      gridTemplateColumns: {
        auto: "repeat(auto-fill,minmax(200px,1fr))",
      },
      keyframes: {
        expandWidth: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
      },
      animation: {
        expandWidth: "expandWidth 1s linear infinite",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".animate-expandWidth": {
          animation: "expandWidth 2s linear infinite",
        },
      });
    }),
  ],
};
