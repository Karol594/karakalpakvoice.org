import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Globe, Moon, Sun } from "lucide-react";
import i18n from "../i18n";
import { useTranslation } from "react-i18next";

export default function Navigation() {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);

  const [lang, setLang] = useState(
    i18n.language.toUpperCase() || "RU"
  );

  const toggleLang = () => {
    if (lang === "RU") {
      setLang("KK");
      i18n.changeLanguage("kk");
    } else if (lang === "KK") {
      setLang("EN");
      i18n.changeLanguage("en");
    } else if (lang === "EN") {
      setLang("PL");
      i18n.changeLanguage("pl");
    } else {
      setLang("RU");
      i18n.changeLanguage("ru");
    }
  };

  const toggleDark = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-black/70 backdrop-blur text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/images/logo-full.svg"
            alt="logo"
            className="h-8 w-auto"
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8 text-lg">

          <Link to="/" className="hover:text-purple-300">
            {t("nav.home")}
          </Link>

          <Link to="/news" className="hover:text-purple-300">
            {t("nav.news")}
          </Link>

          <Link to="/sport" className="hover:text-purple-300">
            {t("nav.sport")}
          </Link>

          <Link to="/tradition" className="hover:text-purple-300">
            {t("nav.tradition")}
          </Link>

          <Link to="/religion" className="hover:text-purple-300">
            {t("nav.religion")}
          </Link>

          <Link to="/history" className="hover:text-purple-300">
            {t("nav.history")}
          </Link>

          <Link to="/geography" className="hover:text-purple-300">
            {t("nav.geography")}
          </Link>

          <Link to="/people" className="hover:text-purple-300">
            {t("nav.people")}
          </Link>

          <Link to="/contact" className="hover:text-purple-300">
            {t("nav.contact")}
          </Link>
        </nav>

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-4">

          {/* LANGUAGE */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1 bg-zinc-800 px-3 py-1 rounded-full text-sm"
          >
            <Globe size={16} />
            {lang}
          </button>

          {/* DARK MODE */}
          <button
            onClick={toggleDark}
            className="p-2 rounded-full bg-zinc-800"
          >
            {dark ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* HAMBURGER */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden p-2"
          >
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="fixed inset-0 bg-black/90 text-white z-50 flex flex-col p-8 space-y-6 text-2xl">

          <button
            onClick={() => setOpen(false)}
            className="self-end mb-6"
          >
            <X size={36} />
          </button>

          <Link to="/" onClick={() => setOpen(false)}>
            {t("nav.home")}
          </Link>

          <Link to="/news" onClick={() => setOpen(false)}>
            {t("nav.news")}
          </Link>

          <Link to="/sport" onClick={() => setOpen(false)}>
            {t("nav.sport")}
          </Link>

          <Link to="/tradition" onClick={() => setOpen(false)}>
            {t("nav.tradition")}
          </Link>

          <Link to="/religion" onClick={() => setOpen(false)}>
            {t("nav.religion")}
          </Link>

          <Link to="/history" onClick={() => setOpen(false)}>
            {t("nav.history")}
          </Link>

          <Link to="/geography" onClick={() => setOpen(false)}>
            {t("nav.geography")}
          </Link>

          <Link to="/people" onClick={() => setOpen(false)}>
            {t("nav.people")}
          </Link>

          <Link to="/contact" onClick={() => setOpen(false)}>
            {t("nav.contact")}
          </Link>
        </div>
      )}
    </header>
  );
}
