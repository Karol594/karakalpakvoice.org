import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Calendar, Download, X, 
  Maximize2, ChevronLeft, ChevronRight, ExternalLink 
} from 'lucide-react';

// Тилди баслаўшы функция
const useTranslation = () => {
  const [lang, setLang] = useState(localStorage.getItem('i18nextLng') || 'KK');
  
  useEffect(() => {
    const handleLanguageChange = (e) => {
      if (e.detail && e.detail.lang) {
        setLang(e.detail.lang);
      }
    };
    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  return { i18n: { language: lang } };
};

// MD файлын оқыў ҳәм ажыратыў функциясы
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
        if (value.startsWith('[') && value.endsWith(']')) {
          frontMatter[key] = value.slice(1, -1).split(',').map(s => s.trim().replace(/^["']|["']$/g, ''));
        } else {
          frontMatter[key] = value;
        }
      }
    });
    body = text.replace(fmMatch[0], '').trim();
  }
  return { frontMatter, body };
};

// Текстти дизайнлаў (Қалың текст, Видео ҳәм Силтемелер)
const renderStyledText = (text) => {
  // Видео, силтеме ҳәм қалың текстти ажыратып алыў ушын
  const parts = text.split(/(\*\*.*?\*\*|\[VIDEO_EMBED:\s*.*?\]|\[.*?\]\(.*?\))/g);
  
  return parts.map((part, index) => {
    if (!part) return null;

    // Қалың текст ушын
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} className="font-bold text-black dark:text-white">{part.slice(2, -2)}</strong>;
    }

    // ЖАҢА ФУНКЦИЯ: Локал видеоларды оқыў ушын
    const videoMatch = part.match(/\[VIDEO_EMBED:\s*(.*?)\]/);
    if (videoMatch) {
      return (
        <div key={index} className="my-8 aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black border border-gray-200 dark:border-white/10">
          <video controls preload="metadata" className="w-full h-full object-cover">
            <source src={videoMatch[1].trim()} type="video/mp4" />
            Сиздиң браузериңиз видео форматын қоллап-қуўатламайды.
          </video>
        </div>
      );
    }

    // Силтемелер (Links) ушын
    const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
    if (linkMatch) {
      return (
        <a 
          key={index} 
          href={linkMatch[2]} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-600 dark:text-blue-400 underline inline-flex items-center gap-1 hover:text-blue-800 transition-colors"
        >
          {linkMatch[1]} <ExternalLink size={14} />
        </a>
      );
    }
    return <span key={index}>{part}</span>;
  });
};

export default function NewsPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [gallery, setGallery] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displayText, setDisplayText] = useState([]);

  const lang = (i18n.language || 'RU').toUpperCase();
  const langKey = lang === 'KAA' ? 'KK' : lang;

  const backText = {
    RU: "Вернуться назад",
    KK: "Артқа қайтыў", 
    EN: "Go Back",
    PL: "Wróć"
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    loadArticle();
  }, [slug, langKey]);

  async function loadArticle() {
    try {
      setLoading(true);
      const modules = import.meta.glob('/src/content/news/**/*.md', { query: '?raw', import: 'default' });
      
      let rawContent = null;
      for (const path in modules) {
        if (path.includes(slug)) {
          rawContent = await modules[path]();
          break;
        }
      }

      if (rawContent) {
        const { frontMatter, body } = parseMD(rawContent);
        setArticle(frontMatter);
        
        let imgs = frontMatter.gallery || (frontMatter.image ? [frontMatter.image] : []);
        setGallery(imgs);

        // ЖАҢА ФОРМАТ (Байрақлар менен яки әпиўайы ҳәриплер менен)
        let ruMatch = body.match(/# 🇷🇺 RU\s*\n([\s\S]*?)(?=\n---|\n# 🇰🇿|\n# kk|\n# 🇬🇧|\n# 🇵🇱|$)/);
        let kkMatch = body.match(/# (?:🇰🇿|kk) KK\s*\n([\s\S]*?)(?=\n---|\n# 🇷🇺|\n# 🇬🇧|\n# 🇵🇱|$)/);
        let enMatch = body.match(/# 🇬🇧 EN\s*\n([\s\S]*?)(?=\n---|\n# 🇷🇺|\n# 🇰🇿|\n# kk|\n# 🇵🇱|$)/);
        let plMatch = body.match(/# 🇵🇱 PL\s*\n([\s\S]*?)(?=\n---|\n# 🇷🇺|\n# 🇰🇿|\n# kk|\n# 🇬🇧|$)/);

        // ЕСКИ ФОРМАТ (Алдыңғы мақалалар бузылмаўы ушын)
        if (!ruMatch) ruMatch = body.match(/Рус тилде:\s*\n([\s\S]*?)(?=\n_{3,}|\nКК тил|\nАнгл тил|\nПЛ тил|$)/);
        if (!kkMatch) kkMatch = body.match(/КК тил(?:де)?:\s*\n([\s\S]*?)(?=\n_{3,}|\nРус тил|\nАнгл тил|\nПЛ тил|$)/);
        if (!enMatch) enMatch = body.match(/Англ тилде:\s*\n([\s\S]*?)(?=\n_{3,}|\nРус тил|\nКК тил|\nПЛ тил|$)/);
        if (!plMatch) plMatch = body.match(/ПЛ тилде:\s*\n([\s\S]*?)(?=\n_{3,}|\nРус тил|\nКК тил|\nАнгл тил|$)/);

        let targetBody = '';
        if (langKey === 'RU' && ruMatch) targetBody = ruMatch[1];
        else if (langKey === 'KK' && kkMatch) targetBody = kkMatch[1];
        else if (langKey === 'EN' && enMatch) targetBody = enMatch[1];
        else if (langKey === 'PL' && plMatch) targetBody = plMatch[1];
        else targetBody = ruMatch ? ruMatch[1] : body;
        
        setDisplayText(targetBody.trim().split('\n').filter(p => p.trim() !== ''));
      }
    } catch (error) {
      console.error("Мақала жүклениўинде қәте жүз берди:", error);
    } finally {
      setLoading(false);
    }
  }

  const downloadImage = (url) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `karakalpak-voice-image-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-white font-mono">ЖҮКЛЕНИП АТЫР...</div>;
  if (!article) return <div className="min-h-screen bg-black flex items-center justify-center text-white">404 - МАҚАЛА ТАБЫЛМАДЫ</div>;

  const currentTitle = article[`title_${langKey.toLowerCase()}`] || article.title;

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-12">
        
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
          <span className="font-bold">{backText[langKey] || backText.RU}</span>
        </button>
        
        <h1 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tight leading-tight text-gray-900 dark:text-white">
          {currentTitle}
        </h1>
        <div className="flex items-center gap-3 text-sm font-mono text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800 pb-6 mb-12">
          <Calendar size={16} /> <span>{article.date}</span>
          <span className="px-2 py-0.5 bg-gray-200 dark:bg-gray-800 rounded text-[10px] text-gray-700 dark:text-gray-400 uppercase">{langKey}</span>
        </div>

        {/* ГАЛЕРЕЯ / СЛАЙДЕР БӨЛИМИ */}
        {gallery.length > 0 && (
          <div className="relative aspect-video rounded-3xl overflow-hidden bg-gray-200 dark:bg-black mb-16 group shadow-2xl border border-gray-200 dark:border-white/5">
            <img 
              src={gallery[currentIndex]} 
              className="w-full h-full object-contain cursor-zoom-in transition-transform duration-700 group-hover:scale-[1.02]" 
              alt="Сүўрет галереясы"
              onClick={() => setIsModalOpen(true)}
            />
            {gallery.length > 1 && (
              <>
                <button 
                  onClick={() => setCurrentIndex((currentIndex - 1 + gallery.length) % gallery.length)} 
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/60 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-blue-600"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={() => setCurrentIndex((currentIndex + 1) % gallery.length)} 
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/60 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-blue-600"
                >
                  <ChevronRight size={24} />
                </button>
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                  {gallery.map((_, i) => (
                    <div key={i} className={`h-1.5 rounded-full transition-all ${i === currentIndex ? 'w-8 bg-blue-500' : 'w-2 bg-white/30'}`} />
                  ))}
                </div>
              </>
            )}
            <div className="absolute top-4 right-4 p-2 bg-black/40 backdrop-blur-sm rounded-lg text-white/50 pointer-events-none">
              <Maximize2 size={20} />
            </div>
          </div>
        )}

        {/* YOUTUBE ВИДЕОСЫ УШЫН (Ески мақалаларда ислеўи ушын) */}
        {article.video_id && (
          <div className="my-16 aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black border border-gray-200 dark:border-white/10">
            <iframe 
              width="100%" 
              height="100%" 
              src={`https://www.youtube-nocookie.com/embed/${article.video_id}?rel=0&modestbranding=1`}
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        )}

        {/* МАҚАЛА ТЕКСТИН ОҚЫЎ */}
        <article className="max-w-none text-xl leading-relaxed font-light text-gray-800 dark:text-gray-300">
          {displayText.map((p, i) => {
            if (p.startsWith('# ')) return <h2 key={i} className="text-3xl font-black mt-16 mb-8 border-l-4 border-blue-600 pl-4 text-gray-900 dark:text-white uppercase tracking-tight">{renderStyledText(p.replace('# ', ''))}</h2>;
            if (p.startsWith('## ')) return <h3 key={i} className="text-2xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">{renderStyledText(p.replace('## ', ''))}</h3>;
            if (p.trim().startsWith('* ')) return <li key={i} className="ml-6 mb-4 list-disc marker:text-blue-500">{renderStyledText(p.replace('* ', ''))}</li>;

            return <p key={i} className="mb-8">{renderStyledText(p)}</p>;
          })}
        </article>

        {/* PDF ЖҮКЛЕП АЛЫЎ БӨЛИМИ */}
        {(article.pdf_kk || article.pdf_ru || article.pdf_en || article.pdf_pl) && (
          <div className="mt-16 p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl border-2 border-blue-200 dark:border-blue-800 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <Download size={24} className="text-white" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                {langKey === 'KK' && '4 тилдеги ресмий нусқа'}
                {langKey === 'RU' && 'Официальная версия на 4 языках'}
                {langKey === 'EN' && 'Official version in 4 languages'}
                {langKey === 'PL' && 'Oficjalna wersja w 4 językach'}
              </h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {article.pdf_kk && (
              <a href={article.pdf_kk} target="_blank" rel="noopener noreferrer" 
                 className="flex items-center gap-2 px-5 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-transform active:scale-95">
                <Download size={20} /> Қарақалпақша (PDF)
              </a>
            )}
              
              {article.pdf_ru && (
              <a href={article.pdf_ru} target="_blank" rel="noopener noreferrer" 
                 className="flex items-center gap-2 px-5 py-3 bg-gray-700 hover:bg-gray-800 text-white rounded-xl font-bold transition-transform active:scale-95">
                <Download size={20} /> Русский (PDF)
              </a>
            )}
              
              {article.pdf_en && (
              <a href={article.pdf_en} target="_blank" rel="noopener noreferrer" 
                 className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-transform active:scale-95">
                <Download size={20} /> English (PDF)
              </a>
            )}
              
              {article.pdf_pl && (
              <a href={article.pdf_pl} target="_blank" rel="noopener noreferrer" 
                 className="flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-transform active:scale-95">
                <Download size={20} /> Polska (PDF)
              </a>
            )}
            </div>
            
            <p className="mt-6 text-sm text-gray-600 dark:text-gray-400 text-center italic">
              {langKey === 'KK' && 'PDF файлын ашып оқыў, көшириў ҳәм принтерге шығарыў мүмкин'}
              {langKey === 'RU' && 'PDF можно открыть для чтения, копирования и печати'}
              {langKey === 'EN' && 'PDF can be opened, read, copied and printed'}
              {langKey === 'PL' && 'Plik PDF można otworzyć, przeczytać, skopiować i wydrukować'}
            </p>
          </div>
        )}
      </div>

      {/* ФОТОЛАРДЫ ТОЛЫҚ ЭКРАНДА АШЫЎ (MODAL) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[999] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-300">
          <button 
            onClick={() => setIsModalOpen(false)} 
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
          >
            <X size={48} />
          </button>
          
          <img 
            src={gallery[currentIndex]} 
            className="max-w-full max-h-[85vh] object-contain shadow-2xl rounded-lg animate-in zoom-in duration-300" 
            alt="Үлкейтилген сүўрет" 
          />
          
          <button 
            onClick={() => downloadImage(gallery[currentIndex])}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-10 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <Download size={24} /> <span>Жүклеп алыў</span>
          </button>
          
          {gallery.length > 1 && (
            <>
              <button onClick={() => setCurrentIndex((currentIndex - 1 + gallery.length) % gallery.length)} className="absolute left-6 text-white/50 hover:text-white transition-colors"><ChevronLeft size={64} /></button>
              <button onClick={() => setCurrentIndex((currentIndex + 1) % gallery.length)} className="absolute right-6 text-white/50 hover:text-white transition-colors"><ChevronRight size={64} /></button>
            </>
          )}
        </div>
      )}

      <style>{`
        .prose a { color: #3b82f6; text-decoration: underline; }
        .animate-in { animation-duration: 300ms; animation-fill-mode: both; }
        .fade-in { animation-name: fadeIn; }
        .zoom-in { animation-name: zoomIn; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes zoomIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
}