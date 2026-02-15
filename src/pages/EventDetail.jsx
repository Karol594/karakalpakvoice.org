import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { loadContent } from '../utils/contentLoader';
import { 
  Printer, Download, X, Loader2, Maximize2, ZoomIn, 
  ZoomOut, RotateCcw, ArrowLeft, ChevronLeft, ChevronRight, Image as ImageIcon 
} from 'lucide-react';
import { useTheme } from '../components/useTheme';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  // Lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const lang = i18n.language?.startsWith('kk') || i18n.language?.startsWith('kaa') ? 'kk' 
             : i18n.language?.startsWith('en') ? 'en' 
             : i18n.language?.startsWith('pl') ? 'pl' : 'ru';

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const allEvents = await loadContent('events');
      const foundEvent = allEvents.find(item => item.id === id || item.slug === id);
      setArticle(foundEvent);
      setLoading(false);
    }
    fetchData();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#050505]"><Loader2 className="animate-spin text-amber-500" size={48} /></div>;
  if (!article) return <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-[#050505] text-white"><h1>404</h1><button onClick={() => navigate(-1)}>Back</button></div>;

  const images = article.images || (article.image ? [article.image] : []);

  // --- Handlers ---
  const handleDownload = (src) => {
    const link = document.createElement('a');
    link.href = src;
    link.download = `archive-${id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getEmbedUrl = (url) => {
    if (!url) return null;
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s\)]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  const renderContent = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, index) => {
      if (line.trim() === '---' || line.trim() === '***') return <hr key={index} className="my-10 border-gray-200 dark:border-gray-700" />;
      if (line.startsWith('### ')) return <h3 key={index} className="text-2xl font-bold text-amber-600 mt-8 mb-4">{line.replace('### ', '')}</h3>;
      if (line.startsWith('## ')) return <h2 key={index} className="text-3xl font-bold mt-10 mb-5">{line.replace('## ', '')}</h2>;
      if (line.includes('**')) {
        const parts = line.split('**');
        return <p key={index} className="mb-4 text-lg leading-relaxed">{parts.map((part, i) => i % 2 === 1 ? <strong key={i} className="font-bold text-black dark:text-white">{part}</strong> : part)}</p>;
      }
      return <p key={index} className="mb-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">{line}</p>;
    });
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-[#050505] text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Navbar />
      
      <main className="flex-grow max-w-5xl mx-auto w-full px-4 py-12 pt-24">
        
        {/* Navigation & Header */}
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-gray-500 hover:text-amber-500 transition-colors font-bold"
          >
            <ArrowLeft size={20}/> Артқа
          </button>
          <button onClick={() => window.print()} className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full hover:bg-amber-500 transition-colors">
            <Printer size={20} />
          </button>
        </div>

        <header className="mb-12">
          <div className="text-gray-500 dark:text-gray-400 font-mono mb-4 text-lg">
            {article.date}
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            {article.title[lang]}
          </h1>
          <p className="text-xl text-amber-600 dark:text-amber-500 font-medium italic border-l-4 border-amber-500 pl-6 py-2">
            {article.excerpt[lang]}
          </p>
        </header>

        {/* Слайдер (Gallery) */}
        {images.length > 0 && (
          <section className="mb-16">
            <div className="relative aspect-[16/9] bg-black rounded-3xl overflow-hidden shadow-2xl group">
              <img 
                src={images[activeImgIndex]} 
                className="w-full h-full object-contain" 
                alt="Gallery" 
              />
              
              {images.length > 1 && (
                <>
                  <button 
                    onClick={() => setActiveImgIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    onClick={() => setActiveImgIndex(prev => (prev + 1) % images.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
              
              <button 
                onClick={() => { setLightboxOpen(true); setScale(1); }}
                className="absolute bottom-6 right-6 p-4 bg-amber-500 text-white rounded-2xl shadow-xl hover:scale-110 transition-transform"
              >
                <Maximize2 size={24} />
              </button>
            </div>

            {/* Төменгі кішкентай суреттер */}
            <div className="flex gap-4 mt-6 overflow-x-auto pb-2 scrollbar-hide">
              {images.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveImgIndex(idx)}
                  className={`relative shrink-0 w-24 h-16 rounded-xl overflow-hidden border-2 transition-all ${activeImgIndex === idx ? 'border-amber-500 scale-105' : 'border-transparent opacity-50'}`}
                >
                  <img src={img} className="w-full h-full object-cover" alt="thumb" />
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Мәтін (Content) */}
        <article className="bg-white dark:bg-white/5 p-8 md:p-12 rounded-[40px] shadow-sm mb-16">
          <div className="prose dark:prose-invert max-w-none">
            {renderContent(article.content?.[lang] || article.content)}
          </div>
        </article>

        {/* Видео (Егер бар болса) */}
        {article.video && getEmbedUrl(article.video) && (
          <section className="mb-20">
            <h3 className="flex items-center gap-3 text-2xl font-bold mb-8">
              <ImageIcon className="text-amber-500" /> Видео мағлыўмат
            </h3>
            <div className="relative pt-[56.25%] bg-black rounded-[40px] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800">
              <iframe 
                className="absolute top-0 left-0 w-full h-full" 
                src={getEmbedUrl(article.video)} 
                title="YouTube" 
                frameBorder="0" 
                allowFullScreen
              ></iframe>
            </div>
          </section>
        )}

      </main>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[1000] bg-black/95 flex flex-col animate-fade-in">
          <div className="p-6 flex justify-between items-center text-white">
            <div className="flex gap-4">
              <button onClick={() => setLightboxOpen(false)} className="p-2 hover:bg-white/10 rounded-full"><X size={32}/></button>
              <button onClick={() => setScale(s => Math.min(s + 0.5, 4))} className="p-2 hover:bg-white/10 rounded-full"><ZoomIn size={24}/></button>
              <button onClick={() => setScale(s => Math.max(s - 0.5, 1))} className="p-2 hover:bg-white/10 rounded-full"><ZoomOut size={24}/></button>
              <button onClick={() => {setScale(1); setPosition({x:0, y:0})}} className="p-2 hover:bg-white/10 rounded-full"><RotateCcw size={24}/></button>
            </div>
            <button 
              onClick={() => handleDownload(images[activeImgIndex])}
              className="flex items-center gap-2 bg-amber-600 px-6 py-2 rounded-xl font-bold"
            >
              <Download size={20}/> Жүклеў
            </button>
          </div>
          <div className="flex-grow flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing">
            <img 
              src={images[activeImgIndex]} 
              style={{ transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`, transition: 'transform 0.2s' }}
              className="max-w-[90%] max-h-[80vh] object-contain shadow-2xl" 
              alt="Full view"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetail;