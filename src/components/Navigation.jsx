import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, DollarSign, Cloud, ChevronDown } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'KK');
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );

  const location = useLocation();

  // Mobile меню жабыў
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Dark режим ислетиў
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Тил тандаўын сақтау
  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  // Барлық тиллер ушын текстлер
  const translations = {
    KK: {
      home: 'Бас бет',
      about: 'Биз тўғаралы',
      news: 'Жаңалықлар',
      sovereignty: 'Суверенитет',
      history: 'Тарийх',
      geography: 'География',
      people: 'Тулғалар',
      tradition: 'Дәстүр',
      sport: 'Спорт',
      contact: 'Байланыс',
    },
    RU: {
      home: 'Главная',
      about: 'О нас',
      news: 'Новости',
      sovereignty: 'Суверенитет',
      history: 'История',
      geography: 'География',
      people: 'Личности',
      tradition: 'Традиции',
      sport: 'Спорт',
      contact: 'Контакты',
    },
    EN: {
      home: 'Home',
      about: 'About',
      news: 'News',
      sovereignty: 'Sovereignty',
      history: 'History',
      geography: 'Geography',
      people: 'People',
      tradition: 'Tradition',
      sport: 'Sport',
      contact: 'Contact',
    },
    PL: {
      home: 'Strona główna',
      about: 'O nas',
      news: 'Aktualności',
      sovereignty: 'Suwerenność',
      history: 'Historia',
      geography: 'Geografia',
      people: 'Ludzie',
      tradition: 'Tradycje',
      sport: 'Sport',
      contact: 'Kontakt',
    },
  };

  const languages = [
    { code: 'KK', flag: '🏳️', name: 'Қарақалпақша' },
    { code: 'RU', flag: '🇷🇺', name: 'Русский' },
    { code: 'EN', flag: '🇬🇧', name: 'English' },
    { code: 'PL', flag: '🇵🇱', name: 'Polski' },
  ];

  const navLinks = [
    { path: '/', key: 'home' },
    { path: '/about', key: 'about' },
    { path: '/news', key: 'news' },
    { path: '/sovereignty', key: 'sovereignty' },
    { path: '/history', key: 'history' },
    { path: '/geography', key: 'geography' },
    { path: '/people', key: 'people' },
    { path: '/tradition', key: 'tradition' },
    { path: '/sport', key: 'sport' },
    { path: '/contact', key: 'contact' },
  ];

  const currentLang = languages.find((l) => l.code === lang);

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

          {/* DESKTOP MENU */}
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
                {translations[lang][link.key]}
              </Link>
            ))}
          </div>

          {/* RIGHT WIDGETS */}
          <div className="flex items-center space-x-2 sm:space-x-4">

            {/* DARK MODE */}
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
                  {currentLang.flag} {lang}
                </span>
                <ChevronDown size={14} className="text-gray-500 dark:text-gray-300" />
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
                          setLang(l.code);
                          setShowLangMenu(false);
                        }}
                        className={`w-full px-4 py-3 text-left hover:bg-zinc-200 dark:hover:bg-zinc-800 transition first:rounded-t-lg last:rounded-b-lg flex items-center space-x-3 ${
                          lang === l.code
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
                <div className="text-gray-600 dark:text-gray-400 text-[10px]">
                  UZS/USD
                </div>
              </div>
            </div>

            {/* WEATHER */}
            <div className="hidden md:flex items-center space-x-2 px-3 py-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg">
              <Cloud size={16} className="text-blue-400" />
              <div className="text-xs">
                <div className="text-black dark:text-white font-medium">+4°C</div>
                <div className="text-gray-600 dark:text-gray-400 text-[10px]">
                  Нөкис
                </div>
              </div>
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg transition"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="lg:hidden bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-3 rounded-lg transition ${
                  location.pathname === link.path
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800'
                }`}
              >
                {translations[lang][link.key]}
              </Link>
            ))}

            {/* MOBILE EXTRA INFO */}
            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center justify-between px-4 py-3 bg-zinc-200 dark:bg-zinc-800 rounded-lg">
                  <DollarSign size={16} className="text-green-500" />
                  <div className="text-right">
                    <div className="text-black dark:text-white text-sm font-medium">11350</div>
                    <div className="text-gray-600 dark:text-gray-400 text-xs">USD</div>
                  </div>
                </div>

                <div className="flex items-center justify-between px-4 py-3 bg-zinc-200 dark:bg-zinc-800 rounded-lg">
                  <Cloud size={16} className="text-blue-400" />
                  <div className="text-right">
                    <div className="text-black dark:text-white text-sm font-medium">+4°C</div>
                    <div className="text-gray-600 dark:text-gray-400 text-xs">Нөкис</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </nav>
  );
    }
