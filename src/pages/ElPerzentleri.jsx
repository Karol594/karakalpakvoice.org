import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Search, X, ChevronLeft, ChevronRight, Play, 
  Facebook, Instagram, Youtube, Twitter, Send, Check, Link as LinkIcon,
  Download, ZoomIn, ZoomOut, RotateCcw, ArrowLeft, Star, Image, ArrowUp, Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { figuresData, erasData } from '../data/figuresData'; 
import Footer from '../components/Footer';
import Navbar from '../components/Navbar'; 

// Custom TikTok Icon
const TikTokIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

export default function ElPerzentleri() {
  const { i18n } = useTranslation();
  const [selectedEra, setSelectedEra] = useState(null); 
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFigure, setSelectedFigure] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  
  // Modal Scroll state only (Main scroll handled by App.jsx)
  const [showModalScroll, setShowModalScroll] = useState(false); 
  const modalRef = useRef(null);

  // Lightbox & Zoom states
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Language Detection
  const getLang = () => {
    if (!i18n || !i18n.language) return 'RU';
    const lang = i18n.language.toUpperCase();
    if (lang.includes('KK') || lang.includes('KAA') || lang.includes('KR')) return 'KK';
    if (lang.includes('EN')) return 'EN';
    if (lang.includes('PL')) return 'PL';
    return 'RU';
  };
  const lang = getLang();

  // Translations
  const uiText = {
    RU: {
      title: 'Великие Сыны Народа',
      search: 'Поиск личности...',
      shareTitle: 'Свяжитесь с нами',
      copyLink: 'Скопировать ссылку',
      backToHome: 'Назад',
      backToEras: 'Назад к эпохам',
      archiveVideo: 'Архив видео',
      download: 'Скачать изображение',
      viewGallery: 'Смотреть фотогалерею',
      stayTuned: "Оставайтесь с нами.\nПродолжение следует...",
      comingSoon: "Запустим в ближайшие дни\nСейчас в активной разработке. Ожидайте!"
    },
    KK: {
      title: 'Ел Перзентлери',
      search: 'Тулғаны излеў...',
      shareTitle: 'Биз бенен байланысың',
      copyLink: 'Силтемени көшириў',
      backToHome: 'Изге қайтыў',
      backToEras: 'Дәўирлерге қайтыў',
      archiveVideo: 'Архив видео',
      download: 'Сүўретти жүклеп алыў',
      viewGallery: 'Фотогалереяны көриў',
      stayTuned: "Биз бенен бирге болың.\nДаўамы бар...",
      comingSoon: "Жақын күнлери иске түседи\nҲәзир актив түрде исленип атыр. Күтиң!"
    },
    EN: {
      title: 'Great Figures',
      search: 'Search for a person...',
      shareTitle: 'Connect with us',
      copyLink: 'Copy Link',
      backToHome: 'Go back',
      backToEras: 'Back to Eras',
      archiveVideo: 'Archive Video',
      download: 'Download Image',
      viewGallery: 'View Gallery',
      stayTuned: "Stay with us.\nTo be continued...",
      comingSoon: "Launching in the coming days\nCurrently under active development. Stay tuned!"
    },
    PL: {
      title: 'Wielkie Postacie',
      search: 'Szukaj osoby...',
      shareTitle: 'Połącz się z nami',
      copyLink: 'Kopiuj link',
      backToHome: 'Wróć',
      backToEras: 'Powrót do epok',
      archiveVideo: 'Archiwalne wideo',
      download: 'Pobierz obraz',
      viewGallery: 'Zobacz galerię',
      stayTuned: "Zostań z nami.\nCiąg dalszy nastąpi...",
      comingSoon: "Uruchomimy w najbliższych dniach\nObecnie trwają aktywne prace. Czekajcie!"
    }
  };
  const t = uiText[lang];

  // LOGIC: Filter Figures based on selected Era AND Search Term
  const filteredFigures = figuresData.filter(figure => {
    const matchesEra = selectedEra ? figure.era === selectedEra.id : true;
    const matchesSearch = figure.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          figure.content[lang].name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesEra && matchesSearch;
  }).sort((a, b) => a.name.localeCompare(b.name));

  // --- Handlers ---
  const handleEraSelect = (era) => {
    setSelectedEra(era);
    setSearchTerm('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToEras = () => {
    setSelectedEra(null);
    setSearchTerm('');
  };

  const openFigure = (figure) => {
    setSelectedFigure(figure);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeFigure = () => {
    setSelectedFigure(null);
    document.body.style.overflow = 'auto';
  };

  // Modal Scroll Logic
  const handleModalScroll = (e) => {
    if (e.target.scrollTop > 300) setShowModalScroll(true);
    else setShowModalScroll(false);
  };

  const scrollModalToTop = () => {
    if (modalRef.current) modalRef.current.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetZoom = () => { setScale(1); setPosition({ x: 0, y: 0 }); };
  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.5, 4));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.5, 1));
  const handleMouseDown = (e) => { if (scale > 1) { setIsDragging(true); setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y }); } };
  const handleMouseMove = (e) => { if (isDragging && scale > 1) { setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y }); } };
  const handleMouseUp = () => setIsDragging(false);
  const downloadImage = (url) => { const link = document.createElement('a'); link.href = url; link.download = `Karakalpak-Figure-${Date.now()}.jpg`; document.body.appendChild(link); link.click(); document.body.removeChild(link); };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#050505] text-gray-900 dark:text-white pt-24 pb-20 px-4 transition-colors duration-300">
      
      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-12 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 backdrop-blur-md">
          <Star size={16} className="text-amber-400 fill-amber-400 animate-pulse" />
          <span className="text-xs md:text-sm font-bold text-amber-300 uppercase tracking-widest">Official Archive</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-amber-600 dark:text-amber-500 uppercase tracking-tighter">
          {selectedEra ? selectedEra.title[lang] : t.title}
        </h1>
        
        {/* Search Bar */}
        {selectedEra && (
          <div className="relative max-w-xl mx-auto animate-fade-in">
            <input 
              type="text" 
              placeholder={t.search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-4 pl-12 rounded-full bg-white dark:bg-white/10 border border-gray-200 dark:border-white/20 focus:border-amber-500 outline-none shadow-lg transition-all text-gray-900 dark:text-white"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
        )}
      </div>

      {/* --- VIEW 1: ERA SELECTION (5 WINDOWS) --- */}
      {!selectedEra && (
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
          {erasData.map((era) => (
            <div 
              key={era.id}
              onClick={() => handleEraSelect(era)}
              // 1. ТҮЗЕТУ: h-80 -> h-96 және border-amber қосылды
              className="group relative h-96 rounded-3xl overflow-hidden cursor-pointer shadow-xl hover:shadow-amber-500/30 transition-all duration-500 border border-gray-200 dark:border-white/10 hover:border-amber-500"
            >
              <img 
                src={era.image} 
                alt={era.title[lang]} 
                // 1. ТҮЗЕТУ: object-top қосылды (бет-әлпеті дұрыс көрінуі үшін)
                className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-wide group-hover:text-amber-400 transition-colors">
                  {era.title[lang]}
                </h3>
                <p className="text-gray-300 text-sm font-light line-clamp-2">
                  {era.desc[lang]}
                </p>
                <div className="mt-4 flex items-center gap-2 text-amber-500 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                  <span>Ашыў</span> <ChevronRight size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- VIEW 2: FIGURE LIST (INSIDE SELECTED ERA) --- */}
      {selectedEra && (
        <div className="animate-fade-in">
          {/* Back to Eras Button */}
          <div className="max-w-7xl mx-auto mb-8">
            <button 
              onClick={handleBackToEras}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-white/10 hover:bg-amber-500 hover:text-white transition-all shadow-md font-bold text-gray-700 dark:text-gray-200"
            >
              <ArrowLeft size={20} /> {t.backToEras}
            </button>
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFigures.length > 0 ? (
              filteredFigures.map((figure) => (
                <div 
                  key={figure.id}
                  onClick={() => openFigure(figure)}
                  className="group relative bg-white dark:bg-white/5 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-300 cursor-pointer border border-gray-100 dark:border-white/10"
                >
                  <div className="h-96 overflow-hidden relative">
                    <img src={figure.images[0]} alt={figure.name} className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700 filter grayscale group-hover:grayscale-0" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">{figure.content[lang].name}</h3>
                    <p className="text-amber-500 font-mono text-sm mb-2">{figure.years}</p>
                    <p className="text-gray-300 text-sm line-clamp-2">{figure.content[lang].role}</p>
                  </div>
                </div>
              ))
            ) : (
              // 2. ТҮЗЕТУ: "Coming Soon" блогы қосылды
              <div className="col-span-full text-center py-24 animate-fade-in">
                <div className="inline-block p-8 rounded-3xl bg-gray-100 dark:bg-white/5 border border-dashed border-gray-300 dark:border-white/20 max-w-2xl mx-auto">
                   <Clock size={64} className="mx-auto mb-6 text-amber-500 animate-pulse" />
                   <h3 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white whitespace-pre-line leading-relaxed">
                      {t.comingSoon}
                   </h3>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- FULLSCREEN MODAL (DETAILS) --- */}
      {selectedFigure && (
        <>
          <div 
            ref={modalRef}
            onScroll={handleModalScroll}
            className="fixed inset-0 z-[100] bg-white dark:bg-[#050505] overflow-y-auto animate-fade-in flex flex-col"
          >
            {/* Navbar inside Modal */}
            <div className="sticky top-0 z-[110] bg-white/90 dark:bg-[#050505]/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
               <Navbar />
            </div>

            <button onClick={closeFigure} className="fixed top-24 right-4 z-50 p-3 bg-black/10 dark:bg-white/10 hover:bg-red-500 rounded-full backdrop-blur-md transition-colors text-gray-900 dark:text-white">
              <X size={28} />
            </button>
            
            <button onClick={closeFigure} className="fixed top-24 left-4 z-50 p-3 bg-black/10 dark:bg-white/10 hover:bg-amber-500 rounded-full backdrop-blur-md transition-colors text-gray-900 dark:text-white flex items-center gap-2 px-4">
              <ArrowLeft size={24} />
              <span className="hidden md:inline font-bold">{t.backToHome}</span>
            </button>

            <div className="flex-grow max-w-5xl mx-auto pb-20 pt-0 w-full mt-10">
              <div className="relative h-[60vh] md:h-[70vh] bg-black">
                <img src={selectedFigure.images[0]} alt="Main" className="w-full h-full object-contain opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full pointer-events-none text-white">
                  <h2 className="text-4xl md:text-7xl font-black mb-2 drop-shadow-lg">{selectedFigure.content[lang].name}</h2>
                  <p className="text-xl md:text-3xl text-amber-500 font-mono">{selectedFigure.years}</p>
                </div>
              </div>

              <div className="px-4 md:px-12 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12 text-gray-900 dark:text-white">
                <div className="lg:col-span-2 space-y-8">
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-xl font-semibold text-amber-600 dark:text-amber-400 mb-6 border-l-4 border-amber-500 pl-4">{selectedFigure.content[lang].role}</p>
                    <div className="whitespace-pre-line text-lg leading-relaxed text-gray-700 dark:text-gray-300 font-light">
                      {selectedFigure.content[lang].bio}
                      <p className="mt-8 text-xl font-bold italic text-amber-600 dark:text-amber-500 whitespace-pre-line">{t.stayTuned}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-8">
                  {selectedFigure.videoUrl && (
                    <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-white/10 aspect-video">
                      <iframe width="100%" height="100%" src={selectedFigure.videoUrl} title="Video" frameBorder="0" allowFullScreen></iframe>
                    </div>
                  )}
                  <div onClick={() => setIsLightboxOpen(true)} className="rounded-2xl overflow-hidden cursor-pointer group relative border-2 border-amber-500/50 shadow-xl aspect-[4/3] bg-black">
                      <img src={selectedFigure.images[0]} alt="Gallery" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30">
                        <Image size={48} className="text-white mb-2" />
                        <span className="text-white font-bold bg-black/50 px-3 py-1 rounded-full text-sm">{t.viewGallery} ({selectedFigure.images.length})</span>
                      </div>
                  </div>
                </div>
              </div>

              {/* Share in Modal */}
              <div className="mt-20 border-t border-gray-200 dark:border-gray-800 pt-10 text-center px-4 mb-10">
                <h3 className="text-2xl font-bold mb-8 italic text-gray-900 dark:text-white">{t.shareTitle}</h3>
                <div className="flex flex-wrap justify-center gap-6">
                  <a href="https://www.facebook.com/share/1FifdzG23b/" target="_blank" rel="noreferrer" className="p-4 rounded-full bg-[#1877F2] text-white hover:scale-110 transition shadow-lg"><Facebook size={24} /></a>
                  <a href="https://t.me/kkvoice_org" target="_blank" rel="noreferrer" className="p-4 rounded-full bg-[#0088cc] text-white hover:scale-110 transition shadow-lg"><Send size={24} /></a>
                  <a href="https://www.instagram.com/karakalpakvoice_org/" target="_blank" rel="noreferrer" className="p-4 rounded-full bg-gradient-to-tr from-yellow-400 to-purple-600 text-white hover:scale-110 transition shadow-lg"><Instagram size={24} /></a>
                  <a href="https://youtube.com/@karakalpakvoice_org" target="_blank" rel="noreferrer" className="p-4 rounded-full bg-[#FF0000] text-white hover:scale-110 transition shadow-lg"><Youtube size={24} /></a>
                  <a href="https://www.tiktok.com/@karakalpakvoice" target="_blank" rel="noreferrer" className="p-4 rounded-full bg-black text-white border border-gray-600 hover:scale-110 transition shadow-lg"><TikTokIcon size={24} /></a>
                  <a href="https://x.com/Karakalpak45997" target="_blank" rel="noreferrer" className="p-4 rounded-full bg-black text-white border border-gray-600 hover:scale-110 transition shadow-lg"><Twitter size={24} /></a>
                  <button onClick={copyToClipboard} className={`p-4 rounded-full hover:scale-110 transition shadow-lg flex items-center justify-center gap-2 text-white ${copied ? 'bg-green-600' : 'bg-gray-600'}`} title={t.copyLink}>{copied ? <Check size={24} /> : <LinkIcon size={24} />}</button>
                </div>
              </div>
              <Footer />
            </div>

            {/* Lightbox */}
            {isLightboxOpen && (
              <div className="fixed inset-0 z-[200] bg-black/95 flex flex-col items-center justify-center select-none animate-fade-in">
                <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between bg-black/40 backdrop-blur-md z-[210]">
                  <div className="flex items-center gap-4">
                    <button onClick={() => { setIsLightboxOpen(false); resetZoom(); }} className="p-2 hover:bg-white/10 rounded-full text-white"><X size={28} /></button>
                    <button onClick={handleZoomIn} className="p-2 hover:bg-white/10 rounded-full text-white"><ZoomIn size={24} /></button>
                    <button onClick={handleZoomOut} className="p-2 hover:bg-white/10 rounded-full text-white"><ZoomOut size={24} /></button>
                    <button onClick={resetZoom} className="p-2 hover:bg-white/10 rounded-full text-white"><RotateCcw size={24} /></button>
                  </div>
                  <button onClick={() => downloadImage(selectedFigure.images[currentImageIndex])} className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 rounded-lg text-white font-bold transition-all">
                    <Download size={20} /> <span className="hidden md:inline">{t.download}</span>
                  </button>
                </div>
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden" onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
                  <img src={selectedFigure.images[currentImageIndex]} alt="" style={{ transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`, transition: isDragging ? 'none' : 'transform 0.3s' }} className="max-w-[95%] max-h-[85%] object-contain shadow-2xl" draggable="false" />
                  {selectedFigure.images.length > 1 && scale === 1 && (
                    <>
                      <button onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(prev => prev === 0 ? selectedFigure.images.length -1 : prev - 1); }} className="absolute left-8 p-4 bg-white/5 hover:bg-white/10 rounded-full text-white"><ChevronLeft size={48} /></button>
                      <button onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(prev => (prev + 1) % selectedFigure.images.length); }} className="absolute right-8 p-4 bg-white/5 hover:bg-white/10 rounded-full text-white"><ChevronRight size={48} /></button>
                    </>
                  )}
                </div>
                <div className="absolute bottom-8 text-white/80 font-mono">{currentImageIndex + 1} / {selectedFigure.images.length}</div>
              </div>
            )}
          </div>

          {/* Modal Scroll Button */}
          {showModalScroll && (
            <button 
              onClick={scrollModalToTop}
              className="fixed bottom-8 right-8 z-[150] p-4 bg-amber-500 hover:bg-amber-600 text-white rounded-full shadow-2xl transition-all duration-300 animate-bounce"
              title="Scroll to Top"
            >
              <ArrowUp size={24} />
            </button>
          )}
        </>
      )}

      {/* FOOTER CTA (Main Page - Returns to Home) */}
      <div className="text-center mt-20 mb-20">
        <Link to="/" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-amber-500 hover:text-amber-600 dark:hover:text-amber-400 transition-all shadow-lg text-gray-900 dark:text-white">
          <ArrowLeft size={20} /> <span className="font-bold">{t.backToHome}</span>
        </Link>
      </div>
      
      {/* 3. ТҮЗЕТУ: Социал тармақтар (Main Page) қайтарылды */}
      <div className="mt-16 border-t border-gray-200 dark:border-gray-800 pt-10 text-center mb-20">
        <h3 className="text-2xl font-bold mb-8 italic text-gray-900 dark:text-white">{t.shareTitle}</h3>
        <div className="flex flex-wrap justify-center gap-6">
          <a href="https://www.facebook.com/share/1FifdzG23b/" target="_blank" rel="noreferrer" className="p-4 rounded-full bg-[#1877F2] text-white hover:scale-110 transition shadow-lg"><Facebook size={24} /></a>
          <a href="https://t.me/kkvoice_org" target="_blank" rel="noreferrer" className="p-4 rounded-full bg-[#0088cc] text-white hover:scale-110 transition shadow-lg"><Send size={24} /></a>
          <a href="https://www.instagram.com/karakalpakvoice_org/" target="_blank" rel="noreferrer" className="p-4 rounded-full bg-gradient-to-tr from-yellow-400 to-purple-600 text-white hover:scale-110 transition shadow-lg"><Instagram size={24} /></a>
          <a href="https://youtube.com/@karakalpakvoice_org" target="_blank" rel="noreferrer" className="p-4 rounded-full bg-[#FF0000] text-white hover:scale-110 transition shadow-lg"><Youtube size={24} /></a>
          <a href="https://www.tiktok.com/@karakalpakvoice" target="_blank" rel="noreferrer" className="p-4 rounded-full bg-black text-white border border-gray-600 hover:scale-110 transition shadow-lg"><TikTokIcon size={24} /></a>
          <a href="https://x.com/Karakalpak45997" target="_blank" rel="noreferrer" className="p-4 rounded-full bg-black text-white border border-gray-600 hover:scale-110 transition shadow-lg"><Twitter size={24} /></a>
          <button onClick={copyToClipboard} className={`p-4 rounded-full hover:scale-110 transition shadow-lg flex items-center justify-center gap-2 text-white ${copied ? 'bg-green-600' : 'bg-gray-600'}`} title={t.copyLink}>{copied ? <Check size={24} /> : <LinkIcon size={24} />}</button>
        </div>
      </div>

      {/* 4. ТҮЗЕТУ: Басты беттегі "Сары стрелка" жойылды (тек Modal ішінде қалды) */}

      {/* Main Page Footer - App.jsx арқылы қосылады, сондықтан мұнда жоқ */}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
      `}} />
    </div>
  );
}