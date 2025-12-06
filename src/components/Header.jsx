import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { i18n, t } = useTranslation();

  const changeLang = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="w-full bg-black/70 backdrop-blur-md border-b border-white/10 fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold text-white">
          KarakalpakVoice
        </Link>

        {/* NAV */}
        <nav className="hidden md:flex gap-8 text-white font-medium">
          <Link to="/sovereignty">{t("nav.sovereignty")}</Link>
          <Link to="/news">{t("nav.news")}</Link>
          <Link to="/history">{t("nav.history")}</Link>
          <Link to="/people">{t("nav.people")}</Link>
        </nav>

        {/* LANGUAGE SWITCHER */}
        <div className="flex gap-2">
          <button
            onClick={() => changeLang("kk")}
            className="px-3 py-1 rounded bg-zinc-800 text-white text-sm hover:bg-zinc-700"
          >
            KK
          </button>

          <button
            onClick={() => changeLang("ru")}
            className="px-3 py-1 rounded bg-zinc-800 text-white text-sm hover:bg-zinc-700"
          >
            RU
          </button>

          <button
            onClick={() => changeLang("en")}
            className="px-3 py-1 rounded bg-zinc-800 text-white text-sm hover:bg-zinc-700"
          >
            EN
          </button>

          <button
            onClick={() => changeLang("kz")}
            className="px-3 py-1 rounded bg-zinc-800 text-white text-sm hover:bg-zinc-700"
          >
            KZ
          </button>
        </div>
      </div>
    </header>
  );
}
