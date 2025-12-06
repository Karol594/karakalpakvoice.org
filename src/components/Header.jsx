import React from "react";
import { Globe, DollarSign, CloudSun } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full fixed top-0 left-0 z-50 backdrop-blur bg-black/40 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img src="/images/logo-full.svg" alt="logo" className="h-9" />
        </Link>

        {/* Navigation */}
        <nav className="flex items-center space-x-10 text-gray-200">
          
          {/* Language */}
          <div className="flex items-center space-x-2 cursor-pointer hover:text-white">
            <Globe size={20} />
            <span>Тил: KK</span>
          </div>

          {/* Exchange Rate */}
          <div className="flex items-center space-x-2 cursor-pointer hover:text-white">
            <DollarSign size={20} />
            <span>USD: 11350</span>
          </div>

          {/* Weather */}
          <div className="flex items-center space-x-2 cursor-pointer hover:text-white">
            <CloudSun size={20} />
            <span>Нукус: +4°C</span>
          </div>

        </nav>
      </div>
    </header>
  );
}
