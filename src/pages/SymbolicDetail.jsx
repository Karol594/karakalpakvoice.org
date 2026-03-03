import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Download, ExternalLink } from 'lucide-react';
import i18n from 'i18next';

const parseMD = (text) => {
  const fmMatch = text.match(/^---\s*([\s\S]*?)\s*---/);
  const frontMatter = {};
  let body = text;
  if (fmMatch) {
    const fmText = fmMatch[1];
    fmText.split('\n').forEach(line => {
      const parts = line.split(':');
      if (parts.length >= 2) {
        const key = parts[0].trim();
        let value = parts.slice(1).join(':').trim().replace(/^["']|["']$/g, '');
        frontMatter[key] = value;
      }
    });
    body = text.replace(fmMatch[0], '').trim();
  }
  return { frontMatter, body };
};

const renderStyledText = (text) => {
  const parts = text.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} className="font-bold text-black dark:text-white">{part.slice(2, -2)}</strong>;
    }
    const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
    if (linkMatch) {
      return (
        <a key={index} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline inline-flex items-center gap-1 hover:text-blue-500">
          {linkMatch[1]} <ExternalLink size={14} />
        </a>
      );
    }
    return part;
  });
};

export default function SymbolicDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [displayText, setDisplayText] = useState([]);
  const [currentLang, setCurrentLang] = useState(i18n.language || 'kk');

  const translations = {
    KK: { download: "Ресмий нусқаны жүклеў", subtitle: "PDF көринисинде 4 тилде", back: "Артқа қайтыў", official: "РЕСМИЙ ҲҮЖЖЕТ" },
    RU: { download: "Скачать официальную версию", subtitle: "Доступно на 4 языках в формате PDF", back: "Назад", official: "ОФИЦИАЛЬНЫЙ ДОКУМЕНТ" },
    EN: { download: "Download official version", subtitle: "Available in 4 languages in PDF format", back: "Back", official: "OFFICIAL DOCUMENT" },
    PL: { download: "Pobierz oficjalną wersję", subtitle: "Dostępne w 4 językach w formacie PDF", back: "Powrót", official: "OFICJALNY DOKUMENT" }
  };

  const t = translations[currentLang.toUpperCase() === 'KAA' ? 'KK' : currentLang.toUpperCase()] || translations.KK;

  useEffect(() => {
    const handleLangChange = (lng) => {
      setCurrentLang(lng);
    };
    i18n.on('languageChanged', handleLangChange);
    return () => {
      i18n.off('languageChanged', handleLangChange);
    };
  }, []);

  const langKey = currentLang.toUpperCase() === 'KAA' ? 'KK' : currentLang.toUpperCase();

  useEffect(() => {
    window.scrollTo(0, 0);
    loadDoc();
  }, [slug, langKey]);

  async function loadDoc() {
    try {
      setLoading(true);
      const modules = import.meta.glob('/src/content/symbolics/*.md', { query: '?raw', import: 'default' });
      let rawContent = null;
      for (const path in modules) {
        if (path.includes(slug)) {
          rawContent = await modules[path]();
          break;
        }
      }

      if (rawContent) {
        const { frontMatter, body } = parseMD(rawContent);
        setContent(frontMatter);

        const sections = {
          KK: body.match(/# kk KK\s*\n([\s\S]*?)(?=\n# 🇷🇺|# 🇬🇧|# 🇵🇱|$)/),
          RU: body.match(/# 🇷🇺 RU\s*\n([\s\S]*?)(?=\n# kk|# 🇬🇧|# 🇵🇱|$)/),
          EN: body.match(/# 🇬🇧 EN\s*\n([\s\S]*?)(?=\n# kk|# 🇷🇺|# 🇵🇱|$)/),
          PL: body.match(/# 🇵🇱 PL\s*\n([\s\S]*?)(?=\n# kk|# 🇷🇺|# 🇬🇧|$)/)
        };
        
        const targetBody = sections[langKey] ? sections[langKey][1] : body;
        setDisplayText(targetBody.trim().split('\n').filter(p => p.trim() !== ''));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-white font-bold tracking-widest uppercase">ЖҮКЛЕНИП АТЫР...</div>;
  if (!content) return <div className="min-h-screen bg-black flex items-center justify-center text-white font-bold tracking-widest uppercase">404 - ҲҮЖЖЕТ ТАБЫЛМАДЫ</div>;

  return (
    <div className="relative flex flex-col min-h-screen bg-white dark:bg-[#050505] transition-colors duration-500">
      
      {/* ФОН (АНЫҚ КӨРІНЕТІН ФОН) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 bg-no-repeat bg-cover bg-center opacity-40 dark:opacity-20 transition-opacity duration-1000" 
          style={{ 
            backgroundImage: 'url("/images/Flaga12.jpg")',
            backgroundAttachment: 'fixed'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/20 to-white dark:from-[#050505]/80 dark:via-transparent dark:to-[#050505]" />
      </div>

      <div className="relative z-10 flex-grow max-w-5xl mx-auto px-6 pt-32 pb-24 w-full">
        
        {/* 2-МӘСЕЛЕ: АРТҚА ҚАЙТЫУ БАТЫРМАСЫ (КӨК БОЯУ) */}
        <button 
          onClick={() => navigate(-1)} 
          className="group flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white mb-12 transition-all font-black uppercase text-[11px] tracking-[0.2em] py-3 px-6 rounded-xl shadow-lg shadow-blue-500/30 w-fit"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> {t.back}
        </button>

        <header className="mb-20 text-center md:text-left">
          
          {/* 1-МӘСЕЛЕ: БАЙРАҚ ИКОНКАСЫ (ЖАСЫЛ СЫЗЫҚ ОРНЫ) */}
<div className="text-center mb-16">
  <div className="inline-block p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6">
    <img src="/images/Flaga11.jpg" alt="FlagIcon" className="w-16 h-16 object-contain" />
  </div>
  <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
    {t.title}
  </h1>
</div>

<h1 className="text-4xl md:text-7xl font-black mb-10 uppercase text-gray-900 dark:text-white leading-[1.1] tracking-tighter">
  {content[`title_${langKey.toLowerCase()}`] || content.title}
</h1>

{/* РЕСМИ ҚҰЖАТ - СЫРТҚЫ СІЛТЕМЕ */}
<a 
  href="https://karakalpak-karakalpakstan.blogspot.com/2014/06/blog-post.html"
  target="_blank"
  rel="noopener noreferrer"
  className="group inline-flex items-center gap-4 text-xs md:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 w-fit px-6 py-3 rounded-2xl tracking-widest shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 border border-blue-400 mx-auto md:mx-0 mb-10 transition-all duration-300 hover:scale-105"
>
  <Calendar size={18} /> 
  <span>{t.official}: {content.date}</span>
  <ExternalLink size={16} className="opacity-70 group-hover:opacity-100 transition-opacity" />
</a>
</header>

{/* 3-МӘСЕЛЕ: РЕСМИ ҲҮЖЖЕТ БЕЛГІСІ (БҰРЫНҒЫ - ӨШІРУ КЕРЕК) */}
{/* <div className="flex items-center gap-4 text-xs md:text-sm font-bold text-white bg-blue-600 dark:bg-blue-600 w-fit px-6 py-3 rounded-2xl tracking-widest shadow-xl shadow-blue-500/20 border border-blue-400 mx-auto md:mx-0">
  <Calendar size={18} /> 
  <span>{t.official}: {content.date}</span>
</div> */}
        <article className="prose prose-xl md:prose-2xl dark:prose-invert max-w-none text-gray-800 dark:text-gray-200 font-normal relative">
          {displayText.map((p, i) => {
            if (p.startsWith('# ')) return (
              <h2 key={i} className="text-3xl md:text-5xl font-black mt-24 mb-12 text-blue-700 dark:text-blue-500 uppercase border-l-[16px] border-blue-600 pl-8 leading-tight tracking-tight">
                {renderStyledText(p.replace('# ', ''))}
              </h2>
            );
            if (p.startsWith('---')) return <hr key={i} className="my-16 border-gray-200 dark:border-gray-800" />;
            
            const isBoldRow = p.startsWith('**') && p.endsWith('**');
            return (
              <p key={i} className={`mb-10 leading-[1.8] ${isBoldRow ? 'font-bold text-black dark:text-white bg-white/70 dark:bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm' : 'font-normal'}`}>
                {renderStyledText(p)}
              </p>
            );
          })}
        </article>

        {/* PDF ЖҮКЛЕЎ БЛОГЫ */}
        <div className="mt-28 p-8 md:p-14 bg-white/80 dark:bg-gray-900/80 rounded-[3.5rem] border border-gray-200 dark:border-gray-800 backdrop-blur-2xl shadow-2xl shadow-blue-500/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] -z-10 rounded-full" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-14">
            <div className="flex items-center gap-6">
              <div className="p-5 bg-blue-600 rounded-[1.8rem] text-white shadow-2xl shadow-blue-500/40 scale-110">
                <Download size={32} />
              </div>
              <div>
                <h3 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tight leading-none mb-3">{t.download}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-base font-medium">{t.subtitle}</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
  {content[`pdf_${langKey.toLowerCase()}`] && (
    <a 
      href={content[`pdf_${langKey.toLowerCase()}`]} 
      target="_blank" 
      rel="noreferrer" 
      className="flex items-center justify-between p-7 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-3xl font-black transition-all shadow-xl hover:scale-[1.02] active:scale-95 group overflow-hidden relative"
    >
      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      <span className="text-sm uppercase tracking-[0.2em] relative z-10">
        {langKey === 'KK' && 'Ресми нұсқаны жүклеп алыў'}
        {langKey === 'RU' && 'Скачать официальную версию'}
        {langKey === 'EN' && 'Download official version'}
        {langKey === 'PL' && 'Pobierz oficjalną wersję'}
      </span>
      <Download size={24} className="group-hover:translate-y-0.5 transition-transform relative z-10" />
    </a>
  )}
</div>
            ))
          </div>
        </div>
      </div>
  );
}