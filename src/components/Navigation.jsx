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
  ];

  return (
    <>
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
          </div>
        </div>

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
              </div>
            </div>
          </div>
        )}
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
