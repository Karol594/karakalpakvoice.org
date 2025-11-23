import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import Navigation from './Navigation';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/60 dark:bg-black/40 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo + Menu */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              aria-label="Меню"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            <a href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md hero-gradient flex items-center justify-center shadow-soft-lg">
                {/* Logo: simple initial — replace with svg if available */}
                <span className="font-bold text-white">Q</span>
              </div>
              <div className="leading-tight">
                <h1 className="text-lg md:text-xl font-extrabold tracking-tight">KarakalpakVoice</h1>
                <div className="text-xs text-gray-500 dark:text-gray-400">Қарақалпақтың дауысы</div>
              </div>
            </a>
          </div>

          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-4">
              <a href="/" className="nav-link text-sm text-gray-700 dark:text-gray-200 hover:text-qara-500">Жаңалықлар</a>
              <a href="/sovereignty" className="nav-link text-sm text-gray-700 dark:text-gray-200 hover:text-qara-500">Суверенитет</a>
              <a href="/culture" className="nav-link text-sm text-gray-700 dark:text-gray-200 hover:text-qara-500">Мәдениет</a>
            </nav>

            <LanguageSwitcher />

            <a
              href="/admin"
              className="ml-2 px-3 py-1 rounded-md bg-qara-500 text-white text-sm hover:opacity-95"
            >
              Admin
            </a>
          </div>
        </div>
      </div>

      {/* Mobile navigation (slide) */}
      <Navigation isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
}

export default Header;
