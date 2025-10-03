import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import Navigation from './Navigation';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-blue-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <h1 className="text-xl md:text-2xl font-bold">
              KarakalpakVoice.org
            </h1>
          </div>

          {/* Desktop: Тил таңлаў */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
          </div>

          {/* Гамбургер меню */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-blue-700 rounded-lg transition"
            aria-label="Меню"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile: Тіл таңлаў */}
        <div className="md:hidden mt-3">
          <LanguageSwitcher />
        </div>
      </div>

      {/* Навигация меню */}
      <Navigation isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
}

export default Header;
