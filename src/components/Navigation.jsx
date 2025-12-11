import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, DollarSign, Cloud, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );

  const location = useLocation();
  const { t, i18n } = useTranslation();

  // Mobile меню автомат жабылысы
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Dark режим
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Тил тандау
  const languages = [
    { code: 'kk', flag: '🏳️', name: 'Қарақалпақша' },
    { code: 'ru', flag: '🇷🇺', name: 'Русский' },
    { code: 'en', flag: '🇬🇧', name: 'English' },
    { code: 'pl', flag: '🇵🇱', name: 'Polski' },
  ];

  const currentLang = languages.find((l) => l.code === i18n.language);

  // Навигация бетлері
  const navLinks = [
    { path: '/', text: t('nav.home') },
    { path: '/about', text: t('nav.about') },
    { path: '/news', text: t('nav.news') },
    { path: '/history', text: t('nav.history') },
    { path: '/geography', text: t('nav.geography') },
    { path: '/people', text: t('nav.people') },
    { path: '/tradition', text: t('nav.tradition') },
    { path: '/sport', text: t('nav.sport') },
    { path: '/contact', text: t('nav.contact') },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-black/95 backdrop-blur-lg border-b border-zinc-300 dark:border-zinc-800 transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* LOGO */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">K</span>
            </div>
            <span className="hidden sm:block text-black dark:text-white font-bold text-lg group-hover:text-purple-400 transition">
              KarakalpakVoice
            </span>
          </Link>

          {/* Desktop меню */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg transition ${
                  location.pathname === link.path
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800'
                }`}
              >
                {link.text}
              </Link>
            ))}
          </div>

          {/* RIGHT WIDGETS */}
          <div className="flex items-center space-x-2 sm:space-x-4">

            {/* DARK / LIGHT */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white rounded-lg transition"
            >
              {darkMode ? '🌞' : '🌛'}
            </button>

            {/* LANG */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center space-x-2 px-3 py-2 bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white rounded-lg hover:bg-zinc-300 dark:hover:bg-zinc-700 transition"
              >
                <Globe size={16} className="text-purple-400" />
                <span className="hidden sm:inline text-sm font-medium">
                  {currentLang?.flag} {i18n.language.toUpperCase()}
                </span>
                <ChevronDown size={14} />
              </button>

              {showLangMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowLangMenu(false)}
                  />
                  <div className="absolute top-full mt-2 right-0 w-48 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-lg shadow-2xl z-20">
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => {
                          i18n.changeLanguage(l.code);
                          setShowLangMenu(false);
                        }}
                        className={`w-full px-4 py-3 text-left hover:bg-zinc-200 dark:hover:bg-zinc-800 transition flex items-center space-x-3 ${
                          i18n.language === l.code
                            ? 'bg-zinc-300 dark:bg-zinc-800 text-black dark:text-white'
                            : 'text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <span className="text-xl">{l.flag}</span>
                        <span className="text-sm">{l.name}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* КУРС */}
            <div className="hidden md:flex items-center space-x-2 px-3 py-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg">
              <DollarSign size={16} className="text-green-500" />
              <div className="text-xs">
                <div className="text-black dark:text-white font-medium">11350</div>
                <div className="text-gray-600 dark:text-gray-400 text-[10px]">UZS/USD</div>
              </div>
            </div>

            {/* WEATHER */}
            <div className="hidden md:flex items-center space-x-2 px-3 py-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg">
              <Cloud size={16} className="text-blue-500" />
              <div className="text-xs">
                <div className="text-black dark:text-white font-medium">10°C</div>
                <div className="text-gray-600 dark:text-gray-400 text-[10px]">
                  Nukus
                </div>
              </div>
            </div>

            {/* MOBILE BTN */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-black dark:text-white"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="lg:hidden pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-3 rounded-lg ${
                  location.pathname === link.path
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-zinc-200 dark:hover:bg-zinc-800'
                }`}
              >
                {link.text}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
