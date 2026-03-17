import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  KK: 'Толық оқыў',
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

  const title      = getField('title');
  const excerpt    = getField('excerpt');
  const category   = getField('category');
  const image      = item.image || '/images/news-placeholder.jpg';
  const date       = item.date || '';
  const slug       = item.slug || '#';
  const isExclusive = item.exclusive || false;

  return (
    <Link
      to={`/news/${slug}`}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-2xl h-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={title}
    >
      <article
        className="relative rounded-2xl overflow-hidden bg-white dark:bg-[#0f0f0f] border border-gray-100 dark:border-white/5 shadow-md dark:shadow-none transition-all duration-500 flex flex-col h-full"
        style={{
          minHeight: '520px',
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

          {/* Gradient overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)',
              opacity: hovered ? 1 : 0.7,
              transition: 'opacity 0.4s ease',
            }}
          />

          {/* EXCLUSIVE badge */}
          {isExclusive && (
            <div className="absolute top-3 left-3 px-2.5 py-1 bg-red-600 text-white text-[10px] font-black tracking-widest uppercase rounded-md shadow-lg">
              {EXCLUSIVE[lang] || EXCLUSIVE.KK}
            </div>
          )}

          {/* Категория */}
          {category && (
            <div className="absolute top-3 right-3 px-2.5 py-1 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold tracking-wider uppercase rounded-md border border-white/10">
              {category}
            </div>
          )}

          {/* Күн */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white/80 text-[11px] font-mono">
            <Calendar size={11} />
            <span>{date}</span>
          </div>

          {/* Оқыу туймеси — hover гезинде */}
          <div
            className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-[11px] font-bold uppercase tracking-wider rounded-lg shadow-xl"
            style={{
              opacity: hovered ? 1 : 0,
              transform: hovered ? 'translateX(0)' : 'translateX(8px)',
              transition: 'opacity 0.3s ease, transform 0.3s ease',
            }}
          >
            <span>{READ_MORE[lang] || READ_MORE.KK}</span>
            <ArrowUpRight size={13} />
          </div>
        </div>

        {/* ── Текст блогы ── */}
        <div className="px-5 pt-4 pb-5 flex flex-col flex-grow">

          {/* Тил индикаторы */}
          <div className="flex items-center gap-1.5 mb-3 opacity-40">
            <Globe size={11} className="text-gray-400 dark:text-gray-500" />
            <span className="text-[10px] font-mono font-bold text-gray-400 dark:text-gray-500 tracking-widest uppercase">{lang}</span>
          </div>

          {/* Тақырып */}
          <h3 className="text-base md:text-[17px] font-black leading-snug mb-3 text-gray-900 dark:text-white uppercase tracking-tight min-h-[3.3em] line-clamp-3">
            <span
              style={{
                background: hovered
                  ? 'linear-gradient(135deg, #3b82f6, #6366f1)'
                  : 'none',
                WebkitBackgroundClip: hovered ? 'text' : 'unset',
                WebkitTextFillColor: hovered ? 'transparent' : 'unset',
                transition: 'all 0.3s ease',
              }}
            >
              {title}
            </span>
          </h3>

          {/* Excerpt */}
          <div className="flex-grow">
            {excerpt && (
              <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400 font-light line-clamp-3">
                {excerpt}
              </p>
            )}
          </div>

          {/* Divider + Read more */}
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
            <span className="text-[11px] font-mono text-gray-300 dark:text-gray-600 uppercase tracking-widest">
              karakalpakvoice.org
            </span>
            <span
              className="flex items-center gap-1 text-[11px] font-bold text-blue-500 uppercase tracking-wider"
              style={{
                opacity: hovered ? 1 : 0.6,
                transition: 'opacity 0.3s ease',
              }}
            >
              {READ_MORE[lang] || READ_MORE.KK}
              <ArrowUpRight size={13} />
            </span>
          </div>
        </div>

        {/* Жарқырау сызығы — hover */}
        <div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-b-2xl"
          style={{
            width: hovered ? '100%' : '0%',
            transition: 'width 0.5s cubic-bezier(.22,.68,0,1.2)',
          }}
        />
      </article>
    </Link>
  );
}