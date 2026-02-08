import React, { useState, useEffect } from 'react';
import { GraduationCap, Clock } from 'lucide-react';

const Education = () => {
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
    KK: { title: "Жақын күнлерде иске қосамыз", desc: "Ҳәзир актив ислениўде. Күтип турыңыз!", label: "Билимлендириў" },
    RU: { title: "Запустим в ближайшие дни", desc: "Сейчас в активной разработке. Ожидайте!", label: "Образование" },
    EN: { title: "Coming Soon", desc: "Currently under active development. Stay tuned!", label: "Education" },
    PL: { title: "Wkrótce uruchomimy", desc: "Obecnie w trakcie aktywnego rozwoju. Proszę czekać!", label: "Edukacja" }
  };

  const t = translations[lang] || translations.RU;

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="/images/education.jpg" alt="Education" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
      </div>
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto text-white animate-fade-in-up">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-xl">
            <GraduationCap size={48} className="text-blue-400 animate-pulse" />
          </div>
        </div>
        <div className="inline-block px-4 py-1 mb-4 text-sm font-bold uppercase tracking-widest bg-blue-600/80 rounded-full border border-blue-400/30">
          {t.label}
        </div>
        <h1 className="text-4xl md:text-6xl font-black mb-6 drop-shadow-lg leading-tight">{t.title}</h1>
        <div className="flex items-center justify-center gap-2 text-lg md:text-2xl text-gray-200 font-light">
          <Clock size={24} className="text-blue-400" />
          <p>{t.desc}</p>
        </div>
        <div className="mt-12 w-full max-w-md mx-auto h-2 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 animate-loading-bar w-2/3"></div>
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
export default Education;