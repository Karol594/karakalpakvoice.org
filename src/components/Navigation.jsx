import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";
import Currency from "./Currency";
import Weather from "./Weather";

export default function Navigation() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const pages = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.about"), path: "/about" },
    { name: t("nav.news"), path: "/news" },
    { name: t("nav.history"), path: "/history" },
    { name: t("nav.geo"), path: "/geo" },
    { name: t("nav.people"), path: "/people" },
    { name: t("nav.traditions"), path: "/traditions" },
    { name: t("nav.sport"), path: "/sport" },
    { name: t("nav.contact"), path: "/contact" }
  ];

  return (
    <nav className="w-full bg-white/70 dark:bg-black/70 backdrop-blur-md border-b border-white/10 dark:border-white/5 fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">

        {/* LOGO */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-purple-600 rounded-lg text-white flex items-center justify-center font-bold">
            K
          </div>
          <span className="font-semibold text-lg dark:text-white">KarakalpakVoice</span>
        </Link>

        {/* RIGHT PANEL: THEME / LANG / WEATHER / CURRENCY / HAMBURGER */}
        <div className="flex items-center space-x-3">
          <ThemeToggle />
          <LanguageSwitcher />
          <Currency />
          <Weather />

          {/* HAMBURGER ALWAYS VISIBLE */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
          >
            ☰
          </button>
        </div>
      </div>

      {/* MOBILE + DESKTOP MENU — ALWAYS INSIDE DRAWER */}
      {menuOpen && (
        <div className="w-full bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 px-4 py-4">
          <div className="flex flex-col space-y-2">
            {pages.map((item, index) => (
              <Link
                onClick={() => setMenuOpen(false)}
                key={index}
                to={item.path}
                className="py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-black dark:text-white"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
