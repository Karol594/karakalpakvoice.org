import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  MapPin, Mail, ShieldCheck, Heart, Globe 
} from 'lucide-react';

export default function Footer() {
  const { i18n } = useTranslation();
  
  const currentLang = i18n.language ? i18n.language.toUpperCase() : 'RU';
  const langKey = currentLang === 'KAA' ? 'KK' : (['EN', 'PL', 'KK', 'RU'].includes(currentLang) ? currentLang : 'RU');

  const t = {
    RU: {
      desc: "Независимая медиа-платформа и цифровой архив, посвященный истории, культуре и правам человека в Каракалпакстане.",
      cols: { projects: "Проекты", about: "О нас", contact: "Контакты" },
      links: {
        news: "Новости", 
        history: "История и Культура",
        mission: "Наша миссия", 
        team: "Команда",
        policy: "Редакционная политика"
      },
      rights: "Все права защищены."
    },
    KK: {
      desc: "Қарақалпақстан тарийхы, мәденияты ҳәм инсан ҳуқықларына бағышланған ғәрезсиз медиа-платформа ҳәм санлы архив.",
      cols: { projects: "Жойбарлар", about: "Биз ҳаққымызда", contact: "Байланыс" },
      links: {
        news: "Жаңалықлар", 
        history: "Тарийх ҳәм Мәденият",
        mission: "Миссиямыз", 
        team: "Команда",
        policy: "Редакциялық сиясат"
      },
      rights: "Барлық ҳуқықлар қорғалған."
    },
    EN: {
      desc: "Independent media platform and digital archive dedicated to the history, culture, and human rights in Karakalpakstan.",
      cols: { projects: "Projects", about: "About Us", contact: "Contact Info" },
      links: {
        news: "Latest News", 
        history: "History & Culture",
        mission: "Our Mission", 
        team: "Our Team",
        policy: "Editorial Policy"
      },
      rights: "All rights reserved."
    },
    PL: {
      desc: "Niezależna platforma medialna i archiwum cyfrowe poświęcone historii, kulturze i prawom człowieka w Karakałpakstanie.",
      cols: { projects: "Projekty", about: "O nas", contact: "Kontakt" },
      links: {
        news: "Wiadomości", 
        history: "Historia i Kultura",
        mission: "Nasza misja", 
        team: "Zespół",
        policy: "Polityka redakcyjna"
      },
      rights: "Wszelkie prawa zastrzeżone."
    }
  };

  const content = t[langKey] || t.RU;

  return (
    <footer className="relative bg-[#111] text-gray-300 font-sans border-t border-gray-800">
      
      {/* 1. ҚАРАҚАЛПАҚША НАҒЫС */}
      <div className="w-full h-12 relative overflow-hidden border-b border-gray-800">
         <div className="absolute inset-0 bg-[url('/images/hero-pattern.png')] bg-contain opacity-30"></div>
         <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 via-transparent to-green-900/60"></div>
      </div>
      
      {/* 2. НЕГІЗГІ БӨЛІМ */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* COL 1: LOGO & DESC */}
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-3 group">
             {/* ЛОГОТИП */}
             <img 
               src="/images/logo2.png" 
               alt="Logo" 
               className="w-12 h-12 object-contain group-hover:scale-110 transition duration-300"
             />
             {/* ✅ ТҮЗЕТІЛДІ: text-amber-400 (АЛТЫН ТҮС) */}
             <span className="text-2xl font-serif font-bold text-amber-400 tracking-wide group-hover:text-white transition">
               Karakalpak Voice
             </span>
          </Link>
          <p className="text-sm leading-relaxed text-gray-400">
            {content.desc}
          </p>
        </div>

        {/* COL 2: PROJECTS */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6 border-l-4 border-blue-600 pl-3 uppercase tracking-wider">
            {content.cols.projects}
          </h3>
          <ul className="space-y-3 text-sm">
            <li><Link to="/news" className="hover:text-blue-400 transition flex items-center gap-2"><span>•</span> {content.links.news}</Link></li>
            <li><Link to="/history" className="hover:text-blue-400 transition flex items-center gap-2"><span>•</span> {content.links.history}</Link></li>
          </ul>
        </div>

        {/* COL 3: ABOUT & LEGAL */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6 border-l-4 border-yellow-500 pl-3 uppercase tracking-wider">
            {content.cols.about}
          </h3>
          <ul className="space-y-3 text-sm">
            <li><Link to="/about" className="hover:text-yellow-400 transition flex items-center gap-2"><span>•</span> {content.links.mission}</Link></li>
            <li><Link to="/team" className="hover:text-yellow-400 transition flex items-center gap-2"><span>•</span> {content.links.team}</Link></li>
            <li><Link to="/policy" className="hover:text-yellow-400 transition flex items-center gap-2 font-medium text-white/90">
              <ShieldCheck size={14} /> {content.links.policy}
            </Link></li>
          </ul>
        </div>

        {/* COL 4: CONTACT */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6 border-l-4 border-green-500 pl-3 uppercase tracking-wider">
            {content.cols.contact}
          </h3>
          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-green-500 mt-1 shrink-0" />
              <span className="text-gray-400">Warsaw, Poland<br/>(EU Jurisdiction)</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-green-500 shrink-0" />
              <a href="mailto:info@karakalpakvoice.org" className="hover:text-white transition">info@karakalpakvoice.org</a>
            </div>
          </div>
        </div>

      </div>

      {/* COPYRIGHT BAR */}
      <div className="bg-[#0a0a0a] py-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 text-center md:text-left">
          <p>© 2025-2026 Karakalpak-Voice Media Foundation. {content.rights}</p>
          <div className="flex gap-6 items-center justify-center md:justify-start">
             <Globe size={14} className="text-blue-500" />
             <span>Warsaw • EU</span>
          </div>
        </div>
      </div>

    </footer>
  );
}