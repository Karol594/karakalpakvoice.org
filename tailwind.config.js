/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        qara: {
          50:  '#f5f8ff',
          100: '#e6f0ff',
          300: '#8fb0ff',
          500: '#2563EB', // акцент (қарақалпақ көк)
          700: '#164bd6',
        },
        accent: {
          50: '#fff8fb',
          100: '#ffeef7',
          300: '#ffb3d8',
          500: '#764ba2', // лувр-акцент
        },
        bg: {
          light: '#ffffff',
          dark: '#0f1419'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial'],
      },
      boxShadow: {
        'soft-lg': '0 10px 30px rgba(2,6,23,0.08)'
      }
    },
  },
  plugins: [],
}
