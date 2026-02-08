import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, Globe, Sun, Moon, DollarSign, Cloud } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true); // Matrix стилінде дефолт - қараңғы
  const { i18n } = useTranslation();

  // Dark mode логикасы
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  const changeLang = (langCode) => {
    i18n.changeLanguage(langCode.toLowerCase());
    setOpen(false);
  };

  const translations = {
    KK: { home: "БАС БЕТ", about: "БИЗ ҲАҚҚЫМЫЗДА", news: "ЖАҢАЛЫҚЛАР", state: "МӘМЛЕКЕТ", sovereignty: "СУВЕРЕНИТЕТ", declaration: "ДЕКЛАРАЦИЯ", constitution: "КОНСТИТУЦИЯ", symbols: "РӘМИЗЛЕР", flag: "БАЙРАҚ", emblem: "ГЕРБ", anthem: "ГИМН", culture: "МӘДЕНИЕТ", contact: "БАЙЛАНЫС" },
    RU: { home: "ГЛАВНАЯ", about: "О НАС", news: "НОВОСТИ", state: "ГОСУДАРСТВО", sovereignty: "СУВЕРЕНИТЕТ", declaration: "ДЕКЛАРАЦИЯ", constitution: "КОНСТИТУЦИЯ", symbols: "СИМВОЛЫ", flag: "ФЛАГ", emblem: "ГЕРБ", anthem: "ГИМН", culture: "КУЛЬТУРА", contact: "КОНТАКТЫ" },
    EN: { home: "HOME", about: "ABOUT", news: "NEWS", state: "STATE", sovereignty: "SOVEREIGNTY", declaration: "DECLARATION", constitution: "CONSTITUTION", symbols: "SYMBOLS", flag: "FLAG", emblem: "EMBLEM", anthem: "ANTHEM", culture: "CULTURE", contact: "CONTACT" },
    PL: { home: "GŁÓWNA", about: "O NAS", news: "AKTUALNOŚCI", state: "PAŃSTWO", sovereignty: "SUWERENNOŚĆ", declaration: "DEKLARACJA", constitution: "KONSTYTUCJA", symbols: "SYMBOLE", flag: "FLAGA", emblem: "HERB", anthem: "HYMN", culture: "KULTURA", contact: "KONTAKT" }
  };

  const langKey = i18n.language ? i18n.language.split('-')[0].toUpperCase() : "RU";
  const t = translations[langKey] || translations.RU;

  const menu = [
    { label: t.home, path: "/" },
    { label: t.about, path: "/about" },
    { label: t.news, path: "/news" },
    {
      label: t.state,
      sub: [
        { label: t.sovereignty, path: "/sovereignty" },
        { label: t.declaration, path: "/declaration" },
        { label: t.constitution, path: "/constitution" }
      ]
    },
    {
      label: t.symbols,
      sub: [
        { label: t.flag, path: "/flag" },
        { label: t.emblem, path: "/emblem" },
        { label: t.anthem, path: "/anthem" }
      ]
    },
    { label: t.contact, path: "/contact" }
  ];

  const langs = [
    { code: "KK", label: "KK" },
    { code: "RU", label: "RU" },
    { code: "EN", label: "EN" },
    { code: "PL", label: "PL" }
  ];

  return (
    <>
      {/* MATRIX NAV - Fixed Top */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/20">
        
        {/* 1. STATUS BAR (Top Thin Line) - Monospace font for "Technical" look */}
        <div className="bg-[#111] border-b border-white/10 py-1 hidden md:block">
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-[10px] font-mono tracking-widest text-gray-400">
            <div className="flex gap-6">
              <span className="flex items-center gap-1 text-green-500"><DollarSign size={10} /> USD: 12,850</span>
              <span className="flex items-center gap-1 text-blue-500"><DollarSign size={10} /> EUR: 13,950</span>
            </div>
            <div className="flex items-center gap-2">
              <Cloud size={10} /> NUKUS: +18°C / SYSTEM: ONLINE
            </div>
          </div>
        </div>

        {/* 2. MAIN BAR */}
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Logo - Bold & Strict */}
          <Link to="/" className="text-2xl font-black text-white tracking-tighter uppercase flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-600"></div> {/* Square Dot */}
            KARAKALPAK<span className="text-blue-600">VOICE</span>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center h-full">
            {menu.map((item, i) => (
              <div key={i} className="relative group h-full flex items-center">
                {item.sub ? (
                  <>
                    <button className="px-4 py-2 text-sm font-bold text-gray-300 hover:text-white uppercase tracking-wider flex items-center gap-1 transition-colors">
                      {item.label} <ChevronDown size={12} />
                    </button>
                    {/* Dropdown - Square & Bordered */}
                    <div className="absolute top-full left-0 w-48 bg-black border border-white/20 hidden group-hover:block">
                      {item.sub.map((sub, j) => (
                        <Link key={j} to={sub.path} className="block px-6 py-3 text-xs font-bold text-gray-400 hover:text-white hover:bg-white/10 uppercase tracking-widest border-b border-white/10 last:border-0 transition-colors">
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link to={item.path} className="px-4 py-2 text-sm font-bold text-gray-300 hover:text-white uppercase tracking-wider transition-colors hover:underline decoration-blue-600 underline-offset-4">
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* RIGHT ACTIONS */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Theme Toggle - Square Button */}
            <button onClick={() => setDark(!dark)} className="w-8 h-8 flex items-center justify-center border border-white/20 text-gray-400 hover:text-white hover:border-white transition-all">
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Lang Picker - Square */}
            <div className="relative group">
              <button className="h-8 px-3 border border-white/20 flex items-center gap-2 text-xs font-bold text-white uppercase hover:bg-white/10">
                <Globe size={14} /> {langKey}
              </button>
              <div className="absolute top-full right-0 w-full bg-black border border-white/20 hidden group-hover:block">
                {langs.map((l) => (
                  <button key={l.code} onClick={() => changeLang(l.code)} className="block w-full py-2 text-center text-[10px] font-bold text-gray-400 hover:text-white hover:bg-white/10 border-b border-white/10 last:border-0">
                    {l.code}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button onClick={() => setOpen(!open)} className="lg:hidden text-white p-2 border border-white/20">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* MOBILE MENU OVERLAY */}
        {open && (
          <div className="lg:hidden fixed inset-0 top-[64px] bg-black z-40 p-6 border-t border-white/20 overflow-y-auto">
            <div className="flex flex-col gap-6">
              {menu.map((item, i) => (
                <div key={i}>
                  {item.sub ? (
                    <div>
                      <div className="text-lg font-black text-white uppercase mb-2 border-b border-white/10 pb-2">{item.label}</div>
                      <div className="pl-4 flex flex-col gap-3">
                        {item.sub.map((sub, j) => (
                          <Link key={j} to={sub.path} onClick={() => setOpen(false)} className="text-sm font-mono text-gray-400 uppercase">
                            - {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link to={item.path} onClick={() => setOpen(false)} className="text-lg font-black text-white uppercase border-b border-white/10 pb-2 block">
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              
              <div className="grid grid-cols-4 gap-2 mt-4">
                {langs.map(l => (
                  <button key={l.code} onClick={() => changeLang(l.code)} className="border border-white/20 py-2 text-xs font-bold text-white hover:bg-white/10">
                    {l.code}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
      {/* Spacer to push content down */}
      <div className="h-20"></div>
    </>
  );
}