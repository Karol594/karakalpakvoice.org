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
        sans:  ['Inter', 'Helvetica', 'Arial', 'sans-serif'],
        serif: ['Georgia', 'Times New Roman', 'serif'],
      },

      /* ── Шрифт өлшемдері (18px база) ──────────────────────
         text-sm, text-base, text-lg — барлығы үлкейді      */
      fontSize: {
        'xs':   ['0.75rem',   { lineHeight: '1.1rem'  }],  /* 13.5px */
        'sm':   ['0.875rem',  { lineHeight: '1.3rem'  }],  /* 15.75px */
        'base': ['1rem',      { lineHeight: '1.6rem'  }],  /* 18px ✓ */
        'lg':   ['1.125rem',  { lineHeight: '1.75rem' }],  /* 20.25px */
        'xl':   ['1.25rem',   { lineHeight: '1.875rem'}],  /* 22.5px */
        '2xl':  ['1.5rem',    { lineHeight: '2rem'    }],  /* 27px */
        '3xl':  ['1.875rem',  { lineHeight: '2.25rem' }],  /* 33.75px */
        '4xl':  ['2.25rem',   { lineHeight: '2.5rem'  }],  /* 40.5px */
        '5xl':  ['3rem',      { lineHeight: '1'       }],  /* 54px */
        '6xl':  ['3.75rem',   { lineHeight: '1'       }],  /* 67.5px */
      },

      colors: {
        matrix: {
          bg:     '#080808',
          card:   '#121212',
          border: '#333333',
          text:   '#F4F4F4',
          muted:  '#888888',
        }
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}