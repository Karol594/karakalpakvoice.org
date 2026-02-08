/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        // Matrix.org: Тақырыптар үшін "Georgia", мәтін үшін "Inter"
        sans: ['Inter', 'Helvetica', 'Arial', 'sans-serif'],
        serif: ['Georgia', 'Times New Roman', 'serif'], 
      },
      colors: {
        // Matrix қара түстері
        matrix: {
          bg: '#080808',      // Негізгі фон (өте қою)
          card: '#121212',    // Карточкалардың фоны
          border: '#333333',  // Жіңішке сызықтар
          text: '#F4F4F4',    // Ақ мәтін
          muted: '#888888',   // Сұр мәтін
        }
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}