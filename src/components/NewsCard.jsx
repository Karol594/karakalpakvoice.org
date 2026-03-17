import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Calendar, Globe } from 'lucide-react';

const useLanguage = () => {
  const [lang, setLang] = useState(() => {
    const stored = localStorage.getItem('i18nextLng') || 'KK';
    return stored.toUpperCase() === 'KAA' ? 'KK' : stored.toUpperCase();
  });

  useEffect(() => {
    const handleLanguageChange = (e) => {
      if (e.detail && e.detail.lang) {
        const l = e.detail.lang.toUpperCase();
        setLang(l === 'KAA' ? 'KK' : l);
      }
    };
    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  return lang;
};

const READ_MORE = {
  RU: 'Читать полностью',
  KK: 'Толығырақ оқыў',
  EN: 'Read full article',
  PL: 'Czytaj więcej',
};

const EXCLUSIVE = {
  RU: 'ЭКСКЛЮЗИВ',
  KK: 'ЭКСКЛЮЗИВ',
  EN: 'EXCLUSIVE',
  PL: 'EKSKLUZYWNY',
};

export default function NewsCard({ item }) {
  const lang = useLanguage();
  const [hovered, setHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const getField = (field) => {
    if (!item[field]) return '';
    if (typeof item[field] === 'object') {
      return item[field][lang.toLowerCase()]
        || item[field]['ru']
        || item[field]['kk']
        || '';
    }
    return item[field];
  };

  const title   = getField('title');
  const excerpt = getField('excerpt');
  const category = getField('category');
  const image   = item.image || '/images/news-placeholder.jpg';
  const date    = item.date || '';
  const slug    = item.slug || '#';
  const isExclusive = item.exclusive || false;

  return (
    <a
      href={`/news/${slug}`}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-2xl h-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={title}
    >
      <article
        className="relative rounded-2xl overflow-hidden bg-white dark:bg-[#0f0f0f] border border-gray-100 dark:border-white/5 shadow-md dark:shadow-none transition-all duration-500 flex flex-col h-full"
        style={{
          minHeight: '480px', // Барлық карточкалардың биіктігін теңестіру
          transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
          boxShadow: hovered
            ? '0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(59,130,246,0.2)'
            : '0 2px 20px rgba(0,0,0,0.06)',
          transition: 'transform 0.4s cubic-bezier(.22,.68,0,1.2), box-shadow 0.4s ease',
        }}
      >

        {/* ── Фото блогы ── */}
        <div className="relative w-full overflow-hidden bg-gray-100 dark:bg-black shrink-0" style={{ aspectRatio: '16/9' }}>
          <img
            src={image}
            alt={title}
            onLoad={() => setImgLoaded(true)}
            className="w-full h-full object-cover object-[center_20%] transition-transform duration-700"
            style={{
              transform: hovered ? 'scale(1.06)' : 'scale(1)',
              opacity: imgLoaded ? 1 : 0,
              transition: 'transform 0.7s cubic-bezier(.22,.68,0,1.2), opacity 0.4s ease',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-top from-black/55 via-black/10 to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-400" />
          
          {isExclusive && (
            <div className="absolute top-3 left-3 px-2.5 py-1 bg-red-600 text-white text-[10px] font-black tracking-widest uppercase rounded-md shadow-lg">
              {EXCLUSIVE[lang] || EXCLUSIVE.KK}
            </div>
          )}

          {category && (
            <div className="absolute top-3 right-3 px-2.5 py-1 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold tracking-wider uppercase rounded-md border border-white/10">
              {category}
            </div>
          )}

          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white/80 text-[11px] font-mono">
            <Calendar size={11} />
            <span>{date}</span>
          </div>
        </div>

        {/* ── Мәтін блогы ── */}
        <div className="px-5 pt-4 pb-5 flex flex-col flex-grow">
          <div className="flex items-center gap-1.5 mb-3 opacity-40">
            <Globe size={11} className="text-gray-400 dark:text-gray-500" />
            <span className="text-[10px] font-mono font-bold text-gray-400 dark:text-gray-500 tracking-widest uppercase">{lang}</span>
          </div>

          {/* Тақырып — Максимум 3 жол, биіктігі сақталады */}
          <h3 className="text-base md:text-[17px] font-black leading-tight mb-3 text-gray-900 dark:text-white uppercase tracking-tight line-clamp-3 min-h-[3.3em]">
            <span style={{
                background: hovered ? 'linear-gradient(135deg, #3b82f6, #6366f1)' : 'none',
                WebkitBackgroundClip: hovered ? 'text' : 'unset',
                WebkitTextFillColor: hovered ? 'transparent' : 'unset',
                transition: 'all 0.3s ease',
              }}>
              {title}
            </span>
          </h3>

          {/* Excerpt — Максимум 3 жол */}
          <div className="flex-grow">
            {excerpt && (
              <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400 font-light line-clamp-3">
                {excerpt}
              </p>
            )}
          </div>

          {/* Divider + Read more — Әрқашан ең астында */}
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
            <span className="text-[11px] font-mono text-gray-300 dark:text-gray-600 uppercase tracking-widest">
              karakalpakvoice.org
            </span>
            <span className={`flex items-center gap-1 text-[11px] font-bold text-blue-500 uppercase tracking-wider transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-60'}`}>
              {READ_MORE[lang] || READ_MORE.KK}
              <ArrowUpRight size={13} />
            </span>
          </div>
        </div>

        {/* Hover сызығы */}
        <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-b-2xl transition-all duration-500"
          style={{ width: hovered ? '100%' : '0%' }}
        />
      </article>
    </a>
  );
}