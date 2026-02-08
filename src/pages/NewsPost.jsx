import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Calendar, User, ChevronLeft, ChevronRight, 
  Download, X, Facebook, Send, Twitter, Instagram, Youtube, 
  Link as LinkIcon, Maximize2, Check 
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

// --- UI АУДАРМАЛАРЫ ---
const uiTranslations = {
  RU: {
    back: "Назад",
    date: "Дата",
    author: "Автор",
    share: "Свяжитесь с нами",
    galleryHint: "Нажмите на фото для увеличения",
    download: "Скачать",
    copyLink: "Ссылка скопирована!"
  },
  KK: {
    back: "Изге қайтыў",
    date: "Сәне",
    author: "Автор",
    share: "Биз бенен байланысың",
    galleryHint: "Сүўретти басып үлкейтиң",
    download: "Жүклеп алыў",
    copyLink: "Силтеме көширилди!"
  },
  EN: {
    back: "Back",
    date: "Date",
    author: "Author",
    share: "Connect with us",
    galleryHint: "Click to expand",
    download: "Download",
    copyLink: "Link copied!"
  },
  PL: {
    back: "Wróć",
    date: "Data",
    author: "Autor",
    share: "Connect with us",
    galleryHint: "Kliknij, aby powiększyć",
    download: "Pobierz",
    copyLink: "Link skopiowany!"
  }
};

// --- MD ФАЙЛДЫ ОҚУ (FRONTMATTER БӨЛУ) ---
const parseMD = (text) => {
  // Файлдың басындағы --- ... --- бөлігін аламыз
  const fmMatch = text.match(/^---\s*([\s\S]*?)\s*---/);
  const frontMatter = {};
  let body = text;

  if (fmMatch) {
    const fmText = fmMatch[1];
    fmText.split('\n').forEach(line => {
      const parts = line.split(':');
      if (parts.length >= 2) {
        const key = parts[0].trim();
        let value = parts.slice(1).join(':').trim();
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        frontMatter[key] = value;
      }
    });
    // Frontmatter-ді алып тастап, таза мәтінді аламыз
    body = text.replace(fmMatch[0], '').trim();
  }
  return { frontMatter, body };
};

// --- ЖҰЛДЫЗШАЛАРДЫ ҚАЛЫҢ (BOLD) ҚЫЛУ ---
const renderTextWithBold = (text) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} className="font-bold text-gray-900 dark:text-white">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

export default function NewsPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  
  // Галерея және Зум
  const [galleryImages, setGalleryImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Мәтін бөліктері (Таңдалған тілдегі)
  const [displayedText, setDisplayedText] = useState([]);

  // Тілді анықтау
  const currentLang = i18n.language ? i18n.language.toUpperCase() : 'RU';
  const langKey = currentLang === 'KAA' ? 'KK' : (['EN', 'PL', 'KK', 'RU'].includes(currentLang) ? currentLang : 'RU');
  const ui = uiTranslations[langKey] || uiTranslations.RU;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Тіл ауысқан сайын (langKey) мақаланы қайта жүктейміз
  useEffect(() => {
    loadArticle();
  }, [slug, langKey]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadImage = (url) => {
    if (!url) return;
    const link = document.createElement('a');
    link.href = url;
    link.download = url.substring(url.lastIndexOf('/') + 1);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openModal = (index = 0) => {
    setCurrentSlide(index);
    setIsModalOpen(true);
  };
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);

  async function loadArticle() {
    try {
      setLoading(true);
      
      // 1. БАРЛЫҚ ПАПКАЛАРДАН ІЗДЕУ (Терең іздеу: /**/*.md)
      const modules = import.meta.glob('/src/content/news/**/*.md', { query: '?raw', import: 'default' });
      
      let foundContent = null;
      for (const path in modules) {
        if (path.includes(slug)) {
          foundContent = await modules[path]();
          break;
        }
      }

      if (foundContent) {
        const { frontMatter, body } = parseMD(foundContent);
        setArticle({ ...frontMatter, fullBody: body });
        
        // 2. СУРЕТТЕРДІ ЖИНАУ
        const contentImages = [];
        const imgRegex = /!\[.*?\]\((.*?)\)/g;
        let match;
        while ((match = imgRegex.exec(body)) !== null) {
          contentImages.push(match[1]);
        }
        const allImages = frontMatter.image ? [frontMatter.image, ...contentImages] : contentImages;
        setGalleryImages([...new Set(allImages)]);

        // 3. ТІЛ БОЙЫНША МӘТІНДІ БӨЛУ (ЕҢ МАҢЫЗДЫ ЖЕРІ)
        
        // Windows (\r\n) пен Linux (\n) айырмашылығын жою үшін нормализация жасаймыз
        const normalizedBody = body.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

        // Regex арқылы бөлеміз: жаңа жол (\n) + кез келген бос орын (\s*) + үш сызық (---) + кез келген бос орын (\s*) + жаңа жол (\n)
        const parts = normalizedBody.split(/\n\s*---\s*\n/);
        
        // Егер дұрыс бөлінбесе (мысалы файлда сызықтар жоқ болса), бәрін біріншіге салады
        // Реті: 0=RU, 1=KK, 2=EN, 3=PL
        
        let targetContent = parts[0]; // Default RU

        if (langKey === 'KK' && parts.length > 1) targetContent = parts[1];
        else if (langKey === 'EN' && parts.length > 2) targetContent = parts[2];
        else if (langKey === 'PL' && parts.length > 3) targetContent = parts[3];
        else if (langKey === 'RU') targetContent = parts[0];

        // Мәтін ішінен сурет кодтарын (![...](...)) алып тастаймыз, тек таза мәтін қалу үшін
        const cleanText = targetContent.replace(/!\[.*?\]\((.*?)\)/g, '');
        
        // Параграфтарға бөлеміз
        const paragraphs = cleanText.split('\n').filter(p => p.trim() !== '');
        
        setDisplayedText(paragraphs);

      } else {
        setArticle(null);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-black text-white">Loading...</div>;
  if (!article) return <div className="min-h-screen flex items-center justify-center bg-black text-white">Article Not Found</div>;

  const titleKey = `title_${langKey.toLowerCase()}`;
  const displayTitle = article[titleKey] || article.title;

  return (
    <div className="min-h-screen bg-white dark:bg-[#000212] text-gray-900 dark:text-gray-100 transition-colors duration-300 flex flex-col">
      
      <div className="flex-grow">
        {/* NAV HEADER */}
        <div className="max-w-4xl mx-auto px-6 pt-24 pb-6">
          <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors mb-6 cursor-pointer">
            <ArrowLeft size={20} /> <span>{ui.back}</span>
          </button>
          <h1 className="text-3xl md:text-5xl font-black leading-tight mb-6 text-gray-900 dark:text-white">
            {displayTitle}
          </h1>
          <div className="flex items-center gap-6 text-sm text-gray-500 font-mono border-b border-gray-200 dark:border-gray-800 pb-6 mb-8">
            <div className="flex items-center gap-2"><Calendar size={16} /> <span>{ui.date}: {article.date}</span></div>
          </div>
        </div>

        {/* MAIN IMAGE (ZOOMABLE) */}
        {article.image && (
          <div className="max-w-5xl mx-auto px-4 mb-12">
            <div 
              className="rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 cursor-zoom-in group relative"
              onClick={() => openModal(0)}
            >
              <img src={article.image} alt={displayTitle} className="w-full h-auto object-contain max-h-[600px] bg-gray-100 dark:bg-black transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Maximize2 className="text-white drop-shadow-md" size={48} />
              </div>
            </div>
            <p className="text-center text-sm text-gray-500 mt-2 italic">{ui.galleryHint}</p>
          </div>
        )}

        {/* TEXT CONTENT (ТЕК ТАҢДАЛҒАН ТІЛДЕ) */}
        <article className="max-w-3xl mx-auto px-6 text-lg leading-relaxed text-gray-800 dark:text-gray-300">
          {displayedText.map((p, i) => {
             // Тақырыптарды әдемілеу (#)
             if (p.startsWith('# ')) return <h2 key={i} className="text-3xl font-bold mt-10 mb-4 text-gray-900 dark:text-white">{renderTextWithBold(p.replace('# ', ''))}</h2>;
             if (p.startsWith('## ')) return <h3 key={i} className="text-2xl font-bold mt-8 mb-3 text-gray-900 dark:text-white">{renderTextWithBold(p.replace('## ', ''))}</h3>;
             if (p.startsWith('### ')) return <h4 key={i} className="text-xl font-bold mt-6 mb-2 text-gray-900 dark:text-white">{renderTextWithBold(p.replace('### ', ''))}</h4>;
             if (p.trim().startsWith('* ')) return <li key={i} className="ml-6 list-disc mb-2 marker:text-blue-500">{renderTextWithBold(p.replace('* ', ''))}</li>;
             
             return <p key={i} className="mb-6">{renderTextWithBold(p)}</p>;
          })}
        </article>

        {/* SHARE */}
        <div className="max-w-3xl mx-auto px-6 mt-12 mb-24">
          <div className="p-8 rounded-[40px] border text-center bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10">
            <h3 className="text-2xl font-bold mb-8 italic text-gray-900 dark:text-white">{ui.share}</h3>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="https://www.facebook.com/share/1FifdzG23b/" target="_blank" rel="noreferrer" className="p-4 bg-[#1877F2] text-white rounded-full hover:scale-110 transition shadow-lg"><Facebook size={24} /></a>
              <a href="https://t.me/kkvoice_org" target="_blank" rel="noreferrer" className="p-4 bg-[#0088cc] text-white rounded-full hover:scale-110 transition shadow-lg"><Send size={24} /></a>
              <a href="https://x.com/Karakalpak45997" target="_blank" rel="noreferrer" className="p-4 bg-black text-white rounded-full border border-white/20 hover:scale-110 transition shadow-lg"><Twitter size={24} /></a>
              <a href="https://www.instagram.com/karakalpakvoice_org/" target="_blank" rel="noreferrer" className="p-4 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white rounded-full hover:scale-110 transition shadow-lg"><Instagram size={24} /></a>
              <a href="https://youtube.com/@karakalpakvoice_org" target="_blank" rel="noreferrer" className="p-4 bg-[#FF0000] text-white rounded-full hover:scale-110 transition shadow-lg"><Youtube size={24} /></a>
              
              <button 
                onClick={copyToClipboard} 
                className={`p-4 rounded-full hover:scale-110 transition shadow-lg flex items-center justify-center gap-2 text-white ${copied ? 'bg-green-600' : 'bg-gray-700'}`}
                title={copied ? ui.copyLink : ''}
              >
                {copied ? <Check size={24} /> : <LinkIcon size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- MODAL (FULLSCREEN ZOOM) --- */}
      {isModalOpen && galleryImages.length > 0 && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-white hover:text-red-500 p-2 z-50 transition-colors">
            <X size={40} />
          </button>
          
          <img src={galleryImages[currentSlide]} alt="Fullscreen" className="max-w-full max-h-screen object-contain shadow-2xl" />

          {/* Download Button inside Modal */}
          <button 
            onClick={() => downloadImage(galleryImages[currentSlide])}
            className="absolute top-6 left-6 text-white hover:text-green-500 p-2 z-50 flex items-center gap-2 bg-black/50 rounded-full px-4 py-2"
          >
            <Download size={24} /> <span className="text-sm font-bold">{ui.download}</span>
          </button>

          {galleryImages.length > 1 && (
            <>
              <button onClick={prevSlide} className="absolute left-4 p-4 text-white hover:bg-white/10 rounded-full z-50"><ChevronLeft size={48} /></button>
              <button onClick={nextSlide} className="absolute right-4 p-4 text-white hover:bg-white/10 rounded-full z-50"><ChevronRight size={48} /></button>
            </>
          )}
        </div>
      )}

    </div>
  );
}