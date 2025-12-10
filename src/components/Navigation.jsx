import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, DollarSign, Cloud } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'KK');
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

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
    { path: '/history', key: 'history' },
    { path: '/geography', key: 'geography' },
    { path: '/people', key: 'people' },
    { path: '/tradition', key: 'tradition' },
    { path: '/sport', key: 'sport' },
    { path: '/contact', key: 'contact' },
  ];

  const homeSections = [
    { path: '/sovereignty', key: 'sovereignty' },
    { path: '/declaration', key: 'declaration' },
    { path: '/constitution', key: 'constitution' },
    { path: '/qara-ai', key: 'qara_ai' },
    { path: '/bots', key: 'bots' },
    { path: '/team', key: 'team' },
  ];

  const t = (key) => {
    // Джасап кӱр: JSON-аудармалары `locales/{lang}.json` ішінде `nav`, `home`, т.б. болу керек
    try {
      return window.i18n_resources[lang][key] || key;
    } catch {
      return key;
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-white dark:bg-black border-b dark:border-zinc-800 transition`}>
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
            <div className="hidden lg:flex items-center space-x-4">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg transition ${
                    location.pathname === link.path
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800'
                  }`}
                >
                  {t(`nav.${link.key}`)}
                </Link>
              ))}
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center space-x-2 sm:space-x-4">

              {/* Dark / Light switch */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white rounded-lg transition"
              >
                {darkMode ? '🌞' : '🌛'}
              </button>

              {/* Language selector */}
              <div className="relative">
                <button
                  onClick={() => setShowLangMenu((s) => !s)}
                  className="flex items-center space-x-2 px-3 py-2 bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white rounded-lg hover:bg-zinc-300 dark:hover:bg-zinc-700 transition"
                >
                  <Globe size={16} className="text-purple-400" />
                  <span className="hidden sm:inline text-sm font-medium">
                    {languages.find(l => l.code === lang).flag} {lang}
                  </span>
                  <ChevronDown size={14} className="text-gray-500 dark:text-gray-300" />
                </button>
                {showLangMenu && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowLangMenu(false)} />
                    <div className="absolute top-full mt-2 right-0 w-48 bg-white dark:bg-zinc-900 border dark:border-zinc-800 rounded-lg shadow-2xl z-20">
                      {languages.map(l => (
                        <button
                          key={l.code}
                          onClick={() => { setLang(l.code); setShowLangMenu(false); }}
                          className={`w-full px-4 py-3 text-left hover:bg-zinc-200 dark:hover:bg-zinc-800 transition flex items-center space-x-3 ${
                            lang === l.code ? 'bg-zinc-300 dark:bg-zinc-800 text-black dark:text-white' : 'text-gray-700 dark:text-gray-300'
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

              {/* Курc */}
              <div className="hidden md:flex items-center space-x-2 px-3 py-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg">
                <DollarSign size={16} className="text-green-500" />
                <div className="text-xs">
                  <div className="text-black dark:text-white font-medium">11350</div>
                  <div className="text-gray-600 dark:text-gray-400 text-[10px]">UZS/USD</div>
                </div>
              </div>

              {/* Һауа-райы */}
              <div className="hidden md:flex items-center space-x-2 px-3 py-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg">
                <Cloud size={16} className="text-blue-400" />
                <div className="text-xs">
                  <div className="text-black dark:text-white font-medium">+4°C</div>
                  <div className="text-gray-600 dark:text-gray-400 text-[10px]">Нөкис</div>
                </div>
              </div>

              {/* Mobile burger */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg transition"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile menu list */}
        {isOpen && (
          <div className="lg:hidden bg-white dark:bg-zinc-900 border-t dark:border-zinc-800 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="px-4 py-4 space-y-2">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-3 rounded-lg transition ${
                    location.pathname === link.path
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800'
                  }`}
                >
                  {t(`nav.${link.key}`)}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Егер басты бетсің болса — бөлімдер карточкасын көрсетир */}
      {location.pathname === '/' && (
        <div className="pt-16 bg-white dark:bg-black transition">
          <div className="max-w-6xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold mb-6 text-black dark:text-white">
              {t('sections.title')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {homeSections.map(section => (
                <Link
                  key={section.path}
                  to={section.path}
                  className="block p-6 border rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
                >
                  <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">
                    {t(`nav.${section.key}`)}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {t(`cards.${section.key}`)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
