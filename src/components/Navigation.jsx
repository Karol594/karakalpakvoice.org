import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Navigation() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);

  const changeLang = () => {
    const order = ["ru", "kk", "en", "pl"];
    const current = i18n.language;
    const next = order[(order.indexOf(current) + 1) % order.length];
    i18n.changeLanguage(next);
  };

  const toggleDark = () => {
    setDark(!dark);
    if (!dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  };

  return (
    <nav className="w-full bg-zinc-900 text-white px-6 py-4 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold">
          Karakalpak Voice
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="hover:text-purple-400">Басты бет</Link>
          <Link to="/news" className="hover:text-purple-400">Жаңалықлар</Link>
          <Link to="/bots" className="hover:text-purple-400">Ботлар</Link>
          <Link to="/about" className="hover:text-purple-400">Туўралы</Link>

          {/* LANG BUTTON */}
          <button
            onClick={changeLang}
            className="px-3 py-1 bg-zinc-800 rounded hover:bg-zinc-700"
          >
            {i18n.language.toUpperCase()}
          </button>

          {/* DARK BUTTON */}
          <button
            onClick={toggleDark}
            className="p-2 rounded hover:bg-zinc-700"
          >
            {dark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* MOBILE BURGER */}
        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden mt-4 flex flex-col gap-4 text-lg">
          <Link to="/" onClick={() => setOpen(false)}>Басты бет</Link>
          <Link to="/news" onClick={() => setOpen(false)}>Жаңалықлар</Link>
          <Link to="/bots" onClick={() => setOpen(false)}>Ботлар</Link>
          <Link to="/about" onClick={() => setOpen(false)}>Туўралы</Link>

          <button
            onClick={changeLang}
            className="w-20 px-3 py-1 bg-zinc-800 rounded"
          >
            {i18n.language.toUpperCase()}
          </button>

          <button
            onClick={toggleDark}
            className="p-2 rounded bg-zinc-800 w-20"
          >
            {dark ? "Light" : "Dark"}
          </button>
        </div>
      )}
    </nav>
  );
}
