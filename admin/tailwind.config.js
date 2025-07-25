/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        
          primary:'#3B82F6',  
          lightBlueBg: '#F0F8FF', 
          darkGrayText: '#1F2937',
      }
    },
  },
  plugins: [],
}