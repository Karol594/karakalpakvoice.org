import React, { useState, useEffect } from 'react';
import { Leaf, Clock } from 'lucide-react';

const Ecology = () => {
  const [lang, setLang] = useState("RU");

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleLangChange = (e) => {
      if (e.detail && e.detail.lang) {
        let newLang = e.detail.lang.toUpperCase();
        if (newLang === 'KAA') newLang = 'KK';
        setLang(newLang);
      }
    };
    window.addEventListener("languageChange", handleLangChange);
    return () => window.removeEventListener("languageChange", handleLangChange);
  }, []);

  const translations = {
    KK: { title: "Жақын күнлерде иске қосамыз", desc: "Ҳәзир актив ислениўде. Күтип турыңыз!", label: "Экология" },
    RU: { title: "Запустим в ближайшие дни", desc: "Сейчас в активной разработке. Ожидайте!", label: "Экология" },
    EN: { title: "Coming Soon", desc: "Currently under active development. Stay tuned!", label: "Ecology" },
    PL: { title: "Wkrótce uruchomimy", desc: "Obecnie w trakcie aktywnego rozwoju. Proszę czekać!", label: "Ekologia" }
  };

  const t = translations[lang] || translations.RU;

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        {/* ЕСКЕРТУ: Бул жерде .png форматы */}
        <img src="/images/ecology.png" alt="Ecology" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
      </div>
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto text-white animate-fade-in-up">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-xl">
            <Leaf size={48} className="text-green-400 animate-pulse" />
          </div>
        </div>
        <div className="inline-block px-4 py-1 mb-4 text-sm font-bold uppercase tracking-widest bg-green-600/80 rounded-full border border-green-400/30">
          {t.label}
        </div>
        <h1 className="text-4xl md:text-6xl font-black mb-6 drop-shadow-lg leading-tight">{t.title}</h1>
        <div className="flex items-center justify-center gap-2 text-lg md:text-2xl text-gray-200 font-light">
          <Clock size={24} className="text-green-400" />
          <p>{t.desc}</p>
        </div>
        <div className="mt-12 w-full max-w-md mx-auto h-2 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 animate-loading-bar w-2/3"></div>
        </div>
      </div>
      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fadeInUp 1s ease-out forwards; }
        @keyframes loadingBar { 0% { width: 0%; } 50% { width: 70%; } 100% { width: 100%; } }
        .animate-loading-bar { animation: loadingBar 2s ease-in-out infinite; }
      `}</style>
    </div>
  );
};
export default Ecology;