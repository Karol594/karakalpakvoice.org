import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { loadContent } from '../utils/contentLoader';
import { 
  Facebook, Send, Twitter, Instagram, Youtube, Link as LinkIcon, 
  Printer, Download, X, Loader2, Maximize2, ZoomIn, ZoomOut, RotateCcw
} from 'lucide-react';
import { useTheme } from '../components/useTheme';

const History = () => {
  const { i18n } = useTranslation();
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- LIGHTBOX & ZOOM STATES ---
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState('');
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const currentLangCode = i18n.language ? i18n.language.toUpperCase() : 'RU';
  const lang = (currentLangCode === 'KAA' || currentLangCode === 'KK') ? 'kk' 
             : (currentLangCode === 'EN') ? 'en' 
             : (currentLangCode === 'PL') ? 'pl' 
             : 'ru';

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const allEvents = await loadContent('events');
      const historyPage = allEvents.find(item => item.id === 'history-main') || allEvents[0];
      setArticle(historyPage);
      setLoading(false);
    }
    fetchData();
  }, []);

  // --- ZOOM FUNCTIONS ---
  const openLightbox = (src) => {
    setLightboxSrc(src);
    setLightboxOpen(true);
    setScale(1); 
    setPosition({ x: 0, y: 0 }); 
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxSrc('');
  };

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.5, 4));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.5, 1));
  const resetZoom = () => { setScale(1); setPosition({ x: 0, y: 0 }); };

  const handleMouseDown = (e) => { 
    if (scale > 1) { 
      setIsDragging(true); 
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y }); 
    } 
  };
  
  const handleMouseMove = (e) => { 
    if (isDragging && scale > 1) { 
      setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y }); 
    } 
  };
  
  const handleMouseUp = () => setIsDragging(false);

  const handleDownload = (src) => {
    const link = document.createElement('a');
    link.href = src;
    link.download = src.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- PARSER ---
  const renderContent = (text) => {
    if (!text) return null;
    
    return text.split('\n').map((line, index) => {
      
      // ✅ 1. СЫЗЫҚШАНЫ ЖОҒАЛТУ (---)
      // Егер қатарда тек "---" тұрса, оны әдемі сызыққа айналдырамыз
      if (line.trim() === '---' || line.trim() === '***') {
        return <hr key={index} className="my-10 border-t border-gray-300 dark:border-gray-700" />;
      }

      // 2. VIDEO
      if (line.includes('youtube.com') || line.includes('youtu.be')) {
        const videoMatch = line.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s\)]+)/);
        if (videoMatch && videoMatch[1]) {
          return (
            <div key={index} className="my-10 relative pt-[56.25%] bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700">
              <iframe 
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoMatch[1]}`}
                title="YouTube video"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          );
        }
      }

      // 3. IMAGE
      if (line.match(/!\[.*?\]\(.*?\)/) && !line.includes('video-placeholder')) {
        const imgMatch = line.match(/!\[(.*?)\]\((.*?)\)/);
        if (imgMatch) {
          return (
            <div key={index} className="my-8 group relative">
              <img 
                src={imgMatch[2]} 
                alt={imgMatch[1]} 
                className="w-full rounded-2xl shadow-lg cursor-pointer hover:opacity-95 transition border border-gray-200 dark:border-gray-700"
                onClick={() => openLightbox(imgMatch[2])} 
              />
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition duration-300">
                 <button onClick={() => openLightbox(imgMatch[2])} className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 backdrop-blur-md">
                    <Maximize2 size={20}/>
                 </button>
              </div>
              {imgMatch[1] && <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-3 italic">{imgMatch[1]}</p>}
            </div>
          );
        }
      }

      // 4. HEADERS
      if (line.startsWith('### ')) return <h3 key={index} className="text-2xl font-bold text-amber-600 dark:text-amber-500 mt-12 mb-6 border-b pb-2 border-gray-200 dark:border-gray-700">{line.replace('### ', '')}</h3>;
      if (line.startsWith('## ')) return <h2 key={index} className="text-3xl font-bold text-gray-900 dark:text-white mt-14 mb-6">{line.replace('## ', '')}</h2>;
      if (line.startsWith('# ')) {
        if (line.includes('RU') || line.includes('KK') || line.includes('EN') || line.includes('PL')) return null;
        return <h1 key={index} className="text-4xl font-black text-blue-800 dark:text-blue-400 mt-10 mb-8">{line.replace('# ', '')}</h1>;
      }

      // 5. BLOCKQUOTE
      if (line.startsWith('> ')) {
        return (
          <div key={index} className="border-l-4 border-amber-500 pl-6 py-4 my-8 bg-amber-50 dark:bg-amber-900/20 italic text-lg text-gray-800 dark:text-gray-200 rounded-r-xl">
            {line.replace('> ', '').replace(/\*\*/g, '')}
          </div>
        );
      }

      // 6. BOLD
      if (line.includes('**')) {
         const parts = line.split('**');
         return (
            <p key={index} className="mb-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                {parts.map((part, i) => i % 2 === 1 ? <strong key={i} className="font-bold text-gray-900 dark:text-white">{part}</strong> : part)}
            </p>
         )
      }

      if (line.trim() === '') return <div key={index} className="h-2"></div>;
      
      return <p key={index} className="mb-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">{line}</p>;
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Силтеме көширип алынды!");
  };

  const handlePrint = () => window.print();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#050505]">
        <Loader2 className="animate-spin text-amber-500" size={48} />
      </div>
    );
  }

  if (!article) return <div className="text-center py-20 text-xl dark:text-white">Мағлыўмат жүкленбеди...</div>;

  return (
    <div className={`min-h-screen py-12 px-4 md:px-8 font-serif ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-[#f4f4f4] text-gray-900'}`}>
      
      {/* ✅ LIGHTBOX WITH ZOOM CONTROLS */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[200] bg-black/95 flex flex-col items-center justify-center select-none animate-fade-in">
          
          {/* Top Controls */}
          <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between bg-black/40 backdrop-blur-md z-[210]">
            <div className="flex items-center gap-4">
              <button onClick={() => { closeLightbox(); resetZoom(); }} className="p-2 hover:bg-white/10 rounded-full text-white"><X size={28} /></button>
              <button onClick={handleZoomIn} className="p-2 hover:bg-white/10 rounded-full text-white" title="Zoom In"><ZoomIn size={24} /></button>
              <button onClick={handleZoomOut} className="p-2 hover:bg-white/10 rounded-full text-white" title="Zoom Out"><ZoomOut size={24} /></button>
              <button onClick={resetZoom} className="p-2 hover:bg-white/10 rounded-full text-white" title="Reset"><RotateCcw size={24} /></button>
            </div>
            <button onClick={() => handleDownload(lightboxSrc)} className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 rounded-lg text-white font-bold transition-all">
              <Download size={20} /> <span className="hidden md:inline">Жүклеў</span>
            </button>
          </div>

          {/* Draggable Image */}
          <div 
            className="relative w-full h-full flex items-center justify-center overflow-hidden" 
            onMouseDown={handleMouseDown} 
            onMouseMove={handleMouseMove} 
            onMouseUp={handleMouseUp} 
            onMouseLeave={handleMouseUp}
          >
            <img 
              src={lightboxSrc} 
              alt="Full view" 
              style={{ transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`, transition: isDragging ? 'none' : 'transform 0.3s' }} 
              className="max-w-[95%] max-h-[85%] object-contain shadow-2xl cursor-grab active:cursor-grabbing" 
              draggable="false" 
            />
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto relative">
        
        {/* Print Button */}
        <div className="absolute top-0 right-0 hidden md:block print:hidden">
          <button onClick={handlePrint} className={`p-3 rounded-full shadow-lg transition transform hover:scale-110 ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-white hover:bg-gray-100 text-gray-800'}`}>
            <Printer size={24} />
          </button>
        </div>

        {/* --- HEADER --- */}
        <header className="mb-16 text-center animate-fade-in-up">
          <div className="inline-block px-4 py-1 mb-6 text-sm font-bold tracking-widest uppercase bg-gray-200 text-gray-600 rounded-full">
            📅 {article.date}
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            {article.title[lang]}
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
            {article.excerpt[lang]}
          </h2>
        </header>

        {/* --- CONTENT --- */}
        <div className="bg-white dark:bg-gray-800 p-6 md:p-12 rounded-3xl shadow-xl transition-colors duration-300">
            {renderContent(article.content[lang])}
        </div>

      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fadeIn 0.6s ease-out forwards; }
      `}} />
    </div>
  );
};

export default History;