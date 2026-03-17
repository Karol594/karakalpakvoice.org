import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Calendar, Download, X, 
  ChevronLeft, ChevronRight, ExternalLink, ZoomIn, ZoomOut 
} from 'lucide-react';

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
  const [scale, setScale] = useState(1);
  const [imgPosition, setImgPosition] = useState({ x: 0, y: 0 });

  const lang = (i18n.language || 'RU').toUpperCase();
  const langKey = lang === 'KAA' ? 'KK' : lang;

  const backText = {
    RU: "Вернуться назад",
    KK: "Артқа қайтыў", 
    EN: "Go Back",
    PL: "Wróć"
  };

  const downloadText = {
    RU: "Скачать",
    KK: "Жүклеп алыў",
    EN: "Download",
    PL: "Pobierz"
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    loadArticle();
  }, [slug, langKey]);

  useEffect(() => {
    if (gallery.length > 1 && !isModalOpen) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % gallery.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [gallery.length, isModalOpen]);

  useEffect(() => {
    if (!isModalOpen) {
      setScale(1);
      setImgPosition({ x: 0, y: 0 });
    }
  }, [isModalOpen]);

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

        const getMatch = (regex) => {
          const m = body.match(regex);
          return m ? m[1] : null;
        };

        let ruMatch = getMatch(/# 🇷🇺 RU\s*\n([\s\S]*?)(?=\n---|\n# 🇰🇿|\n# kk|\n# 🇬🇧|\n# 🇵🇱|$)/);
        let kkMatch = getMatch(/# (?:🇰🇿|kk) KK\s*\n([\s\S]*?)(?=\n---|\n# 🇷🇺|\n# 🇬🇧|\n# 🇵🇱|$)/);
        let enMatch = getMatch(/# 🇬🇧 EN\s*\n([\s\S]*?)(?=\n---|\n# 🇷🇺|\n# 🇰🇿|\n# kk|\n# 🇵🇱|$)/);
        let plMatch = getMatch(/# 🇵🇱 PL\s*\n([\s\S]*?)(?=\n---|\n# 🇷🇺|\n# 🇰🇿|\n# kk|\n# 🇬🇧|$)/);

        if (!ruMatch) ruMatch = getMatch(/Рус тилде:\s*\n([\s\S]*?)(?=\n_{3,}|\nКК тил|\nАнгл тил|\nПЛ тил|$)/);
        if (!kkMatch) kkMatch = getMatch(/КК тил(?:де)?:\s*\n([\s\S]*?)(?=\n_{3,}|\nРус тил|\nАнгл тил|\nПЛ тил|$)/);
        if (!enMatch) enMatch = getMatch(/Англ тилде:\s*\n([\s\S]*?)(?=\n_{3,}|\nРус тил|\nКК тил|\nПЛ тил|$)/);
        if (!plMatch) plMatch = getMatch(/ПЛ тилде:\s*\n([\s\S]*?)(?=\n_{3,}|\nРус тил|\nКК тил|\nАнгл тил|$)/);

        let targetBody = '';
        if (langKey === 'RU' && ruMatch) targetBody = ruMatch;
        else if (langKey === 'KK' && kkMatch) targetBody = kkMatch;
        else if (langKey === 'EN' && enMatch) targetBody = enMatch;
        else if (langKey === 'PL' && plMatch) targetBody = plMatch;
        else targetBody = ruMatch || body;
        
        const paragraphs = targetBody.trim().split(/\n\s*\n/).filter(p => p.trim() !== '');
        setDisplayText(paragraphs);
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
    link.download = `karakalpak-voice-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.3, 3));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.3, 1));

  // ── renderStyledText ──────────────────────────────────────
  const renderStyledText = (text) => {
    if (!text) return null;

    if (text.trim().startsWith('<div') && text.includes('style=')) {
      return <div dangerouslySetInnerHTML={{ __html: text }} />;
    }

    // **[VIDEO]** немесе [VIDEO] → Odysee iframe
    if (/^\*{0,2}\[VIDEO\]\*{0,2}$/.test(text.trim())) {
      const odyseeUrl = article?.odysee_url;
      if (!odyseeUrl) return null;
      return (
        <div className="my-8 aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black border border-gray-200 dark:border-white/10">
          <iframe
            width="100%"
            height="100%"
            src={odyseeUrl}
            title="Odysee video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      );
    }

    // **[IMAGE_PAIR:foto1.jpg,foto2.jpg]** → фото жұбы
    const imagePairMatch = text.match(/^\*{0,2}\[IMAGE_PAIR:(.*?),(.*?)\]\*{0,2}$/);
    if (imagePairMatch) {
      const img1 = `/images/figures/${imagePairMatch[1].trim()}`;
      const img2 = `/images/figures/${imagePairMatch[2].trim()}`;
      return (
        <div className="grid grid-cols-2 gap-4 my-8">
          <img src={img1} alt="" className="rounded-2xl w-full object-cover aspect-[4/3] shadow-lg cursor-zoom-in" onClick={() => { setGallery(g => g.includes(img1) ? g : [...g, img1, img2]); setIsModalOpen(true); }} />
          <img src={img2} alt="" className="rounded-2xl w-full object-cover aspect-[4/3] shadow-lg cursor-zoom-in" onClick={() => { setGallery(g => g.includes(img2) ? g : [...g, img1, img2]); setIsModalOpen(true); }} />
        </div>
      );
    }

    // Жай мәтін — bold, link, video_embed
    const parts = text.split(/(\*\*.*?\*\*|\[VIDEO_EMBED:\s*.*?\]|\[.*?\]\(.*?\))/g);

    return parts.map((part, index) => {
      if (!part) return null;

      // **bold**
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} className="font-bold text-black dark:text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }

      // [VIDEO_EMBED: url] → mp4
      const videoEmbedMatch = part.match(/\[VIDEO_EMBED:\s*(.*?)\]/);
      if (videoEmbedMatch) {
        return (
          <div key={index} className="my-8 aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black border border-gray-200 dark:border-white/10">
            <video controls preload="metadata" className="w-full h-full object-cover">
              <source src={videoEmbedMatch[1].trim()} type="video/mp4" />
              Сизиң браузериңиз видео форматын қоллап-қуўатламайды.
            </video>
          </div>
        );
      }

      // [Мәтін](сілтеме) → ішкі немесе сыртқы
      const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
      if (linkMatch) {
        const linkText = linkMatch[1];
        const linkHref = linkMatch[2];
        const isExternal = linkHref.startsWith('http');

        if (isExternal) {
          return (
            <a
              key={index}
              href={linkHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 underline inline-flex items-center gap-1 hover:text-blue-800 transition-colors"
            >
              {linkText} <ExternalLink size={14} />
            </a>
          );
        }

        // Ішкі сілтеме — бет жоқ болса да көк түсте көрінеді
        return (
          <a
            key={index}
            href={linkHref}
            className="text-blue-600 dark:text-blue-400 font-semibold underline hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          >
            {linkText}
          </a>
        );
      }

      return <span key={index}>{part}</span>;
    });
  };
  // ── renderStyledText АЯҚТАЛДЫ ─────────────────────────────

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white font-mono uppercase">
      ЖҮКЛЕНІП АТЫР...
    </div>
  );
  if (!article) return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      404 - МАҚАЛА ТАБЫЛМАДЫ
    </div>
  );

  const currentTitle = article[`title_${langKey.toLowerCase()}`] || article.title;

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-12">
        
        {/* ── Артқа батырмасы ── */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
          <span className="font-bold uppercase tracking-wider text-xs">{backText[langKey] || backText.RU}</span>
        </button>
        
        {/* ── Тақырып ── */}
        <h1 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tight leading-tight text-gray-900 dark:text-white">
          {currentTitle}
        </h1>
        <div className="flex items-center gap-3 text-sm font-mono text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800 pb-6 mb-12">
          <Calendar size={16} /> 
          <span>{article.date}</span>
          <span className="px-2 py-0.5 bg-gray-200 dark:bg-gray-800 rounded text-[10px] text-gray-700 dark:text-gray-400 uppercase">{langKey}</span>
        </div>

        {/* ── Галерея ── */}
        {gallery.length > 0 && (
          <div className="relative aspect-video rounded-3xl overflow-hidden bg-gray-200 dark:bg-black mb-16 group shadow-2xl border border-gray-200 dark:border-white/5">
            <img 
              src={gallery[currentIndex]} 
              className="w-full h-full object-contain cursor-zoom-in transition-all duration-700" 
              alt="Галерея"
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
          </div>
        )}

        {/* ── YouTube видео ── */}
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
            />
          </div>
        )}

        {/* ── Odysee видео (frontmatter-дан тікелей) ── */}
        {article.odysee_url && !displayText.some(p => /^\*{0,2}\[VIDEO\]\*{0,2}$/.test(p.trim())) && (
          <div className="my-16 aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black border border-gray-200 dark:border-white/10">
            <iframe 
              width="100%" 
              height="100%" 
              src={article.odysee_url}
              title="Odysee video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        )}

        {/* ── Мақала мәтіні ── */}
        <article className="max-w-none text-xl leading-relaxed font-light text-gray-800 dark:text-gray-300">
          {article.is_editorial === "true" && (
            <div className="my-8 p-6 border-l-4 border-red-500 bg-gray-50 dark:bg-gray-900 rounded-r-lg">
              <strong className="block text-red-600 dark:text-red-400 uppercase text-sm mb-2 tracking-wide">
                {langKey === 'RU' && 'РЕДАКЦИОННОЕ ВСТУПЛЕНИЕ'}
                {langKey === 'KK' && 'РЕДАКЦИЯЛЫҚ КИРИСИЎ'}
                {langKey === 'EN' && 'EDITORIAL INTRO'}
                {langKey === 'PL' && 'WSTĘP REDAKCYJNY'}
              </strong>
              <p className="text-base italic">
                {langKey === 'RU' && 'Цифровая платформа «Karakalpak-Voice», в рамках миссии по документированию нарушений прав человека и восстановлению исторического архива, публикует обращение узбекской правозащитницы Елены Урлаевой к Президенту США...'}
                {langKey === 'KK' && '«Karakalpak-Voice» санлы платформасы инсан ҳуқықларының бузылыўын ҳужжетлестириў ҳәм тарийхый архивти қалпына келтириў миссиясы шеңберинде Өзбекстанлы ҳуқық қорғаўшы Елена Урлаеваның АҚШ Президентіне жоллаған мүрәжәтын жәриялайды...'}
                {langKey === 'EN' && 'The Karakalpak-Voice digital platform, as part of its mission to document human rights violations and restore the historical archive, publishes an appeal by Uzbek human rights activist Elena Urlaeva to the President of the United States...'}
                {langKey === 'PL' && 'Platforma cyfrowa „Karakalpak-Voice", w ramach swojej misji dokumentowania naruszeń praw człowieka i odbudowy archiwum historycznego, publikuje apel uzbeckiej obrończyni praw człowieka Eleny Urlaevej do Prezydenta USA...'}
              </p>
            </div>
          )}

          {displayText.map((p, i) => {
            const cleanP = p.trim();

            // ### Тақырып
            if (cleanP.startsWith('### ')) {
              return (
                <h3 key={i} className="text-xl font-black mt-12 mb-4 text-gray-900 dark:text-white uppercase tracking-tight">
                  {renderStyledText(cleanP.replace('### ', ''))}
                </h3>
              );
            }

            // ## Тақырып
            if (cleanP.startsWith('## ')) {
              return (
                <h2 key={i} className="text-3xl font-black mt-16 mb-8 border-l-4 border-blue-600 pl-4 text-gray-900 dark:text-white uppercase tracking-tight">
                  {renderStyledText(cleanP.replace('## ', ''))}
                </h2>
              );
            }

            // # Тақырып
            if (cleanP.startsWith('# ')) {
              return (
                <h2 key={i} className="text-3xl font-black mt-16 mb-8 border-l-4 border-blue-600 pl-4 text-gray-900 dark:text-white uppercase tracking-tight">
                  {renderStyledText(cleanP.replace('# ', ''))}
                </h2>
              );
            }

            return <div key={i} className="mb-8">{renderStyledText(cleanP)}</div>;
          })}
        </article>

        {/* ── PDF жүктеу батырмалары ── */}
        {(article.pdf_kk || article.pdf_ru || article.pdf_en || article.pdf_pl) && (
          <div className="mt-16 p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl border-2 border-blue-200 dark:border-blue-800 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <Download size={24} className="text-blue-600" />
              <h3 className="text-2xl font-black text-gray-900 dark:text-white">PDF</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {article.pdf_kk && (
                <a href={article.pdf_kk} target="_blank" rel="noopener noreferrer" className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-center">
                  Қарақалпақша
                </a>
              )}
              {article.pdf_ru && (
                <a href={article.pdf_ru} target="_blank" rel="noopener noreferrer" className="px-5 py-3 bg-gray-700 hover:bg-gray-800 text-white rounded-xl font-bold text-center">
                  Русский
                </a>
              )}
              {article.pdf_en && (
                <a href={article.pdf_en} target="_blank" rel="noopener noreferrer" className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-center">
                  English
                </a>
              )}
              {article.pdf_pl && (
                <a href={article.pdf_pl} target="_blank" rel="noopener noreferrer" className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-center">
                  Polska
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ── Fullscreen Modal ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[999] bg-black/95 flex items-center justify-center p-4">
          <div className="absolute top-6 right-6 flex items-center gap-3">
            <button onClick={handleZoomOut} className="p-3 bg-white/20 hover:bg-white/30 rounded-full text-white transition backdrop-blur-sm" title="Киширейтіў">
              <ZoomOut size={24} />
            </button>
            <button onClick={handleZoomIn} className="p-3 bg-white/20 hover:bg-white/30 rounded-full text-white transition backdrop-blur-sm" title="Үлкейтіў">
              <ZoomIn size={24} />
            </button>
            <button 
              onClick={() => downloadImage(gallery[currentIndex])} 
              className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full shadow-2xl transition-all hover:scale-105" 
              title="Жүклеп алыў"
            >
              <Download size={20} />
              <span className="hidden md:inline">{downloadText[langKey]}</span>
            </button>
            <button onClick={() => setIsModalOpen(false)} className="p-3 bg-white/20 hover:bg-white/30 rounded-full text-white transition backdrop-blur-sm" title="Жабыў">
              <X size={32} />
            </button>
          </div>
          
          <div 
            className="relative overflow-hidden cursor-grab active:cursor-grabbing max-w-full max-h-[85vh]"
            onMouseDown={(e) => {
              if (scale === 1) return;
              const startX = e.clientX - imgPosition.x;
              const startY = e.clientY - imgPosition.y;
              const onMouseMove = (moveEvent) => {
                setImgPosition({
                  x: moveEvent.clientX - startX,
                  y: moveEvent.clientY - startY
                });
              };
              const onMouseUp = () => {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
              };
              document.addEventListener('mousemove', onMouseMove);
              document.addEventListener('mouseup', onMouseUp);
            }}
          >
            <img 
              src={gallery[currentIndex]} 
              className="max-w-full max-h-[85vh] object-contain rounded-lg transition-transform duration-300 select-none" 
              style={{ 
                transform: `scale(${scale}) translate(${imgPosition.x / scale}px, ${imgPosition.y / scale}px)`,
                transformOrigin: 'center'
              }}
              alt="Fullscreen"
              draggable="false"
            />
          </div>

          {gallery.length > 1 && (
            <>
              <button 
                onClick={() => { setCurrentIndex((prev) => (prev - 1 + gallery.length) % gallery.length); setScale(1); setImgPosition({ x: 0, y: 0 }); }} 
                className="absolute left-6 text-white/70 hover:text-white transition"
              >
                <ChevronLeft size={64} />
              </button>
              <button 
                onClick={() => { setCurrentIndex((prev) => (prev + 1) % gallery.length); setScale(1); setImgPosition({ x: 0, y: 0 }); }} 
                className="absolute right-6 text-white/70 hover:text-white transition"
              >
                <ChevronRight size={64} />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}