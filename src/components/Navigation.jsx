import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Globe, Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Navigation() {
  const { i18n } = useTranslation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const changeLang = (lng) => {
    i18n.changeLanguage(lng);
    setLangOpen(false);
  };

  const toggleDark = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white dark:bg-black border-b border-gray-300 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold dark:text-white">
          KarakalpakVoice
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex items-center gap-6 text-lg">
          <Link className="hover:text-purple-600 dark:text-gray-300" to="/">Home</Link>
          <Link className="hover:text-purple-600 dark:text-gray-300" to="/news">News</Link>
          <Link className="hover:text-purple-600 dark:text-gray-300" to="/sport">Sport</Link>
          <Link className="hover:text-purple-600 dark:text-gray-300" to="/tradition">Tradition</Link>
          <Link className="hover:text-purple-600 dark:text-gray-300" to="/history">History</Link>

          {/* LANGUAGE SELECT */}
          <div className="relative">
            <button
              className="flex items-center gap-2 dark:text-white"
              onClick={() => setLangOpen(!langOpen)}
            >
              <Globe size={20} />
              {i18n.language.toUpperCase()}
            </button>

            {langOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-zinc-900 shadow-lg rounded-md border dark:border-zinc-700">
                <button onClick={() => changeLang("ru")} className="block w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-800 text-left">Русский</button>
                <button onClick={() => changeLang("kk")} className="block w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-800 text-left">Qaraqalpaqsha</button>
                <button onClick={() => changeLang("en")} className="block w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-800 text-left">English</button>
                <button onClick={() => changeLang("pl")} className="block w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-800 text-left">Polski</button>
              </div>
            )}
          </div>

          {/* DARK MODE */}
          <button onClick={toggleDark} className="dark:text-white">
            {dark ? <Sun size={22} /> : <Moon size={22} />}
          </button>
        </nav>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden dark:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-black border-t border-gray-300 dark:border-gray-700 px-5 py-4 text-lg">
          <Link onClick={() => setMenuOpen(false)} className="block py-2" to="/">Home</Link>
          <Link onClick={() => setMenuOpen(false)} className="block py-2" to="/news">News</Link>
          <Link onClick={() => setMenuOpen(false)} className="block py-2" to="/sport">Sport</Link>
          <Link onClick={() => setMenuOpen(false)} className="block py-2" to="/tradition">Tradition</Link>
          <Link onClick={() => setMenuOpen(false)} className="block py-2" to="/history">History</Link>

          {/* MOBILE LANGUAGE */}
          <div className="mt-4">
            <p className="text-gray-500 dark:text-gray-400 mb-1">Language</p>
            <div className="flex gap-3">
              <button onClick={() => changeLang("ru")} className="px-3 py-1 bg-gray-200 dark:bg-zinc-800 rounded">RU</button>
              <button onClick={() => changeLang("kk")} className="px-3 py-1 bg-gray-200 dark:bg-zinc-800 rounded">KK</button>
              <button onClick={() => changeLang("en")} className="px-3 py-1 bg-gray-200 dark:bg-zinc-800 rounded">EN</button>
              <button onClick={() => changeLang("pl")} className="px-3 py-1 bg-gray-200 dark:bg-zinc-800 rounded">PL</button>
            </div>
          </div>

          {/* MOBILE DARK MODE */}
          <button onClick={toggleDark} className="mt-4 flex items-center gap-2 dark:text-white">
            {dark ? <Sun size={22} /> : <Moon size={22} />} Dark Mode
          </button>
        </div>
      )}
    </header>
  );
}
