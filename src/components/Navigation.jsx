import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, DollarSign, Cloud, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const location = useLocation();
  const { i18n } = useTranslation();

  // Мобиль меню бет алмасканда жабылады
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const languages = [
    { code: 'kk', flag: '🏳️', name: 'Қарақалпақша' },
    { code: 'ru', flag: '🇷🇺', name: 'Русский' },
    { code: 'en', flag: '🇬🇧', name: 'English' },
    { code: 'pl', flag: '🇵🇱', name: 'Polski' }
  ];

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  // Меню тармақлары
  const navLinks = [
    { path: '/', label: 'Бас' },
    { path: '/about', label: 'Биз туўралы' },
    { path: '/news', label: 'Жаңалықлар' },
    { path: '/contact', label: 'Байланыс' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-lg border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* LOGO */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/50">
              <span className="text-white font-bold text-xl">K</span>
            </div>
            <span className="hidden sm:block text-white font-bold text-lg group-hover:text-purple-400 transition">
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
                    : 'text-gray-300 hover:text-white hover:bg-zinc-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* RIGHT WIDGETS */}
          <div className="flex items-center space-x-2 sm:space-x-4">

            {/* LANGUAGE SELECTOR */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center space-x-2 px-3 py-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition"
              >
                <Globe size={16} className="text-purple-400" />
                <span className="hidden sm:inline text-white text-sm font-medium">
                  {currentLang.flag} {currentLang.code.toUpperCase()}
                </span>
                <ChevronDown size={14} className="text-gray-400" />
              </button>

              {showLangMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowLangMenu(false)}
                  />
                  <div className="absolute top-full mt-2 right-0 w-48 bg-zinc-900 border border-zinc-800 rounded-lg shadow-2xl z-20">
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => {
                          i18n.changeLanguage(l.code);
                          setShowLangMenu(false);
                        }}
                        className={`w-full px-4 py-3 text-left hover:bg-zinc-800 transition flex items-center space-x-3 ${
                          i18n.language === l.code ? 'bg-zinc-800 text-white' : 'text-gray-300'
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

            {/* CURRENCY */}
            <div className="hidden md:flex items-center space-x-2 px-3 py-2 bg-zinc-800 rounded-lg">
              <DollarSign size={16} className="text-green-400" />
              <div className="text-xs">
                <div className="text-white font-medium">11350</div>
                <div className="text-gray-400 text-[10px]">UZS/USD</div>
              </div>
            </div>

            {/* WEATHER */}
            <div className="hidden md:flex items-center space-x-2 px-3 py-2 bg-zinc-800 rounded-lg">
              <Cloud size={16} className="text-blue-400" />
              <div className="text-xs">
                <div className="text-white font-medium">+4°C</div>
                <div className="text-gray-400 text-[10px]">Нөкис</div>
              </div>
            </div>

            {/* BURGER */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-gray-300 hover:text-white hover:bg-zinc-800 rounded-lg transition"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="lg:hidden bg-zinc-900 border-t border-zinc-800 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-3 rounded-lg transition ${
                  location.pathname === link.path
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-zinc-800'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* MOBILE INFO */}
            <div className="pt-4 border-t border-zinc-800 space-y-3">
              <div className="grid grid-cols-2 gap-3">

                <div className="flex items-center justify-between px-4 py-3 bg-zinc-800 rounded-lg">
                  <DollarSign size={16} className="text-green-400" />
                  <div className="text-right">
                    <div className="text-white text-sm font-medium">11350</div>
                    <div className="text-gray-400 text-xs">USD</div>
                  </div>
                </div>

                <div className="flex items-center justify-between px-4 py-3 bg-zinc-800 rounded-lg">
                  <Cloud size={16} className="text-blue-400" />
                  <div className="text-right">
                    <div className="text-white text-sm font-medium">+4°C</div>
                    <div className="text-gray-400 text-xs">Нөкис</div>
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
