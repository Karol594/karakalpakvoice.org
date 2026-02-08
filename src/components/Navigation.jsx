<<<<<<< HEAD
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
=======
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Globe, Menu, X, SunMoon, DollarSign, Cloud, ArrowUp } from "lucide-react";

export default function Navigation() {
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [themeDark, setThemeDark] = useState(localStorage.getItem("theme") === "dark");
  const [showScroll, setShowScroll] = useState(false);
  const [lang, setLang] = useState(localStorage.getItem("lang") || "KK");

  const langRef = useRef();

  useEffect(() => setOpen(false), [location]);

  useEffect(() => {
    if (themeDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [themeDark]);

  useEffect(() => {
    function onDoc(e) {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("pointerdown", onDoc);
    return () => document.removeEventListener("pointerdown", onDoc);
  }, []);

  useEffect(() => {
    function checkScroll() {
      setShowScroll(window.scrollY > 500);
    }
    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  const languages = [
    { code: "KK", label: "ҚҚ", name: "Қарақалпақша", flag: "🏳️" },
    { code: "RU", label: "РУС", name: "Русский", flag: "🇷🇺" },
    { code: "EN", label: "ENG", name: "English", flag: "🇬🇧" },
    { code: "PL", label: "POL", name: "Polski", flag: "🇵🇱" },
  ];

  function changeLang(code) {
    setLang(code);
    localStorage.setItem("lang", code);
    window.dispatchEvent(new Event("storage"));
    setLangOpen(false);
  }

  const translations = {
    KK: {
      about: "Биз туўралы",
      news: "Жаңалықлар",
      history: "Тарийх",
      geography: "География",
      people: "Шахслар",
      religion: "Дин",
      tradition: "Дәстүрлер",
      sport: "Спорт",
      contact: "Байланыс"
    },
    RU: {
      about: "О нас",
      news: "Новости",
      history: "История",
      geography: "География",
      people: "Личности",
      religion: "Религия",
      tradition: "Традиции",
      sport: "Спорт",
      contact: "Контакты"
    },
    EN: {
      about: "About",
      news: "News",
      history: "History",
      geography: "Geography",
      people: "People",
      religion: "Religion",
      tradition: "Traditions",
      sport: "Sport",
      contact: "Contact"
    },
    PL: {
      about: "O nas",
      news: "Aktualności",
      history: "Historia",
      geography: "Geografia",
      people: "Osoby",
      religion: "Religia",
      tradition: "Tradycje",
      sport: "Sport",
      contact: "Kontakt"
    }
  };

  const t = translations[lang];

  const links = [
    { to: "/about", label: t.about },
    { to: "/news", label: t.news },
    { to: "/history", label: t.history },
    { to: "/geography", label: t.geography },
    { to: "/people", label: t.people },
    { to: "/religion", label: t.religion },
    { to: "/tradition", label: t.tradition },
    { to: "/sport", label: t.sport },
    { to: "/contact", label: t.contact },
>>>>>>> ada8ad33363af76bb9bc1b46ad8fc671bbe1487d
  ];

  return (
    <>
<<<<<<< HEAD
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
=======
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="backdrop-blur-md bg-white/80 dark:bg-black/80 border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg">
                  K
                </div>
                <span className="font-semibold text-gray-900 dark:text-white hidden

xt-white hidden sm:inline">
                  KarakalpakVoice
                </span>
              </Link>
            </div>
            
            <div className="flex items-center gap-2">
              
              <div className="hidden md:flex items-center gap-2">
                <div className="px-3 py-1.5 rounded-md bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs flex items-center gap-2">
                  <DollarSign size={14} className="text-green-600 dark:text-green-400" />
                  <span className="font-medium text-gray-900 dark:text-gray-100">11350 UZS</span>
                </div>
                <div className="px-3 py-1.5 rounded-md bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs flex items-center gap-2">
                  <Cloud size={14} className="text-blue-500 dark:text-blue-400" />
                  <span className="font-medium text-gray-900 dark:text-gray-100">+4°C</span>
                </div>
              </div>

              <button
                onClick={() => setThemeDark((s) => !s)}
                className="p-2 rounded-md bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all"
                title={themeDark ? "Светлый режим" : "Темный режим"}
              >
                <SunMoon size={18} className="text-gray-700 dark:text-gray-300" />
              </button>

              <div className="relative" ref={langRef}>
                <button
                  onClick={() => setLangOpen((s) => !s)}
                  className="flex items-center gap-2 px-3 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-md text-sm font-medium transition-all border border-transparent dark:border-zinc-700"
                  title="Тил таңлаў / Язык"
                >
                  <Globe size={16} className="text-purple-600 dark:text-purple-400" />
                  <span className="hidden sm:inline text-gray-700 dark:text-gray-300">
                    {lang}
                  </span>
                </button>

                {langOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-zinc-900 rounded-lg shadow-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden">
                    {languages.map((ln) => (
                      <button
                        key={ln.code}
                        onClick={() => changeLang(ln.code)}
                        className={"w-full text-left px-4 py-3 hover:bg-purple-50 dark:hover:bg-zinc-800 transition-all " + (lang === ln.code ? "bg-purple-100 dark:bg-zinc-800 font-semibold" : "")}
                      >
                        <span className="mr-3 text-xl">{ln.flag}</span>
                        <span className="text-gray-900 dark:text-white">{ln.name}</span>
                        <span className="float-right text-xs text-gray-500 dark:text-gray-400 font-bold">
                          {ln.label}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => setOpen((s) => !s)}
                className="p-2 rounded-md bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all"
                aria-label="Меню"
              >
                {open ? <X size={18} className="text-gray-700 dark:text-gray-300" /> : <Menu size={18} className="text-gray-700 dark:text-gray-300" />}
              </button>
            </div>
>>>>>>> ada8ad33363af76bb9bc1b46ad8fc671bbe1487d
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

<<<<<<< HEAD
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
=======
        {open && (
          <div className="bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 shadow-xl">
            <div className="px-4 py-4 space-y-2 max-h-[70vh] overflow-y-auto">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={"block px-4 py-3 rounded-md font-medium transition-all " + (l

ocation.pathname === l.to ? "bg-purple-600 text-white" : "text-gray-800 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800")}
                >
                  {l.label}
                </Link>
              ))}

              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-2 md:hidden">
                <div className="px-4 py-2 rounded-md bg-zinc-100 dark:bg-zinc-800 text-sm flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <DollarSign size={16} className="text-green-600 dark:text-green-400" />
                    <span className="font-medium text-gray-900 dark:text-gray-100">Курс валют</span>
                  </span>
                  <span className="font-bold text-gray-900 dark:text-gray-100">11350 UZS</span>
                </div>
                <div className="px-4 py-2 rounded-md bg-zinc-100 dark:bg-zinc-800 text-sm flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Cloud size={16} className="text-blue-500 dark:text-blue-400" />
                    <span className="font-medium text-gray-900 dark:text-gray-100">Нөкис</span>
                  </span>
                  <span className="font-bold text-gray-900 dark:text-gray-100">+4°C</span>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-3">
                <button
                  onClick={() => setThemeDark((s) => !s)}
                  className="flex-1 px-4 py-2 rounded-md bg-zinc-100 dark:bg-zinc-800 font-medium text-gray-900 dark:text-gray-100"
                >
                  {themeDark ? "🌞 Жарық" : "🌛 Қараңғы"}
                </button>

                <div className="flex gap-2">
                  {languages.map((ln) => (
                    <button
                      key={ln.code}
                      onClick={() => { changeLang(ln.code); setOpen(false); }}
                      className={"px-3 py-2 rounded-md text-sm font-bold transition-all " + (lang === ln.code ? "bg-purple-600 text-white" : "bg-zinc-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300")}
                    >
                      {ln.label}
                    </button>
                  ))}
                </div>
>>>>>>> ada8ad33363af76bb9bc1b46ad8fc671bbe1487d
              </div>
            </div>
          </div>
        )}
<<<<<<< HEAD
      </nav>
      {/* Spacer to push content down */}
      <div className="h-20"></div>
    </>
  );
}
=======
      </header>

      {showScroll && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-50 p-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-2xl hover:scale-110 transition-all"
          aria-label="Жоқары көтерілү"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </>
  );
    }
>>>>>>> ada8ad33363af76bb9bc1b46ad8fc671bbe1487d
