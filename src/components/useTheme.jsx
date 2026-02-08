import { useState, useEffect, createContext, useContext } from 'react';

// Theme Context жасаймыз
const ThemeContext = createContext();

// Hook - теманы басқа файлларда (Navbar-да) қолданыў ушын
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

// Theme Provider - барлық приложение ушын
export const ThemeProvider = ({ children }) => {
  
  // ✅ ЖАҢАЛАНҒАН "АҚЫЛЛЫ" ЛОГИКА:
  const [theme, setTheme] = useState(() => {
    // 1. Егер браузер емес (сервер) болса, default 'light' қайтарамыз
    if (typeof window === 'undefined') return 'light';

    // 2. Алдымен адамның бурын таңлағанын (LocalStorage) тексеремиз
    const saved = localStorage.getItem('karakalpak-voice-theme');
    if (saved) {
      return saved;
    }

    // 3. Егер таңламаған болса, Компьютердиң/Телефонның режимин тексеремиз
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'; // Система қараңғы болса -> Dark
    }

    // 4. Болмаса -> Light
    return 'light';
  });

  // Theme өзгергенде LocalStorage-ке сақлаў ҳәм HTML-ге класс қосыў
  useEffect(() => {
    const root = document.documentElement;

    // Браузер жадына сақлаў
    localStorage.setItem('karakalpak-voice-theme', theme);
    root.setAttribute('data-theme', theme);
    
    // HTML тегине 'dark' классын қосыў/алып таслаў (Tailwind ушын)
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Theme өзгертиў функциясы
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Theme Toggle түйме компоненти (Бул сизде бар, сақлап қойдым)
export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300 group"
      aria-label="Toggle theme"
      title={theme === 'light' ? 'Қара режимге өтиў' : 'Жарық режимге өтиў'}
    >
      {/* Sun Icon (Light Mode) */}
      <svg
        className={`w-5 h-5 transition-all duration-300 ${
          theme === 'dark' ? 'rotate-0 scale-100' : 'rotate-90 scale-0'
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>

      {/* Moon Icon (Dark Mode) */}
      <svg
        className={`w-5 h-5 absolute top-2 left-2 transition-all duration-300 ${
          theme === 'light' ? 'rotate-0 scale-100' : '-rotate-90 scale-0'
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    </button>
  );
};