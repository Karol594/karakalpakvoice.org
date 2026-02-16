import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Search, X, ChevronLeft, ChevronRight, Play, 
  Facebook, Instagram, Youtube, Twitter, Send, Check, Link as LinkIcon,
  Download, ZoomIn, ZoomOut, RotateCcw, ArrowLeft, Star, Image, ArrowUp, Clock, Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { loadContent } from '../utils/contentLoader';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar'; 

const TikTokIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

export default function ElPerzentleri() {
  const { i18n } = useTranslation();
  
  // DATA
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);

  // NAVIGATION STATES
  const [selectedEra, setSelectedEra] = useState(null); 
  const [selectedFigure, setSelectedFigure] = useState(null); 

  // UI STATES
  const [searchTerm, setSearchTerm] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showModalScroll, setShowModalScroll] = useState(false); 
  const modalRef = useRef(null);

  // LIGHTBOX STATES
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const data = await loadContent('persons');
      setPersons(data);
      setLoading(false);
    }
    fetchData();
    window.scrollTo(0, 0);
  }, []);

  const getLang = () => {
    if (!i18n || !i18n.language) return 'ru';
    const lang = i18n.language.toLowerCase();
    if (lang.includes('kk') || lang.includes('kaa')) return 'kk';
    if (lang.includes('en')) return 'en';
    if (lang.includes('pl')) return 'pl';
    return 'ru';
  };
  const lang = getLang();

  // --- ДӘҮИРЛЕР (ERAS) ---
  const erasData = [
    {
      id: 'ancient',
      image: '/images/eras/era1.jpg',
      title: { kk: 'I Бөлим: Әййемги дәўир', ru: 'Раздел I: Древний мир', en: 'Section I: Ancient Era', pl: 'Sekcja I: Starożytność' },
      desc: { kk: 'Тумарис, Сақлар ҳәм әййемги бабалар', ru: 'Томирис, Саки и древние предки', en: 'Tomyris, Sakas and ancient ancestors', pl: 'Tomyris, Sakowie i starożytni przodkowie' }
    },
    {
      id: 'biys',
      image: '/images/eras/era2.jpg',
      title: { kk: 'II Бөлим: Бийлер ҳәм Батырлар', ru: 'Раздел II: Бии и Батыры', en: 'Section II: Biys and Batyrs', pl: 'Sekcja II: Bijowie i Batyrowie' },
      desc: { kk: 'Ел қорғаған ерлер тарийхы', ru: 'История защитников народа', en: 'History of the defenders of the people', pl: 'Historia obроńców narodu' }
    },
    {
      id: 'classic',
      image: '/images/eras/era3.jpg',
      title: { kk: 'III Бөлим: Классика', ru: 'Раздел III: Классика', en: 'Section III: Classical Era', pl: 'Sekcja III: Klasyka' },
      desc: { kk: 'Жийен жыраў, Күнхожа, Әжинияз, Бердах', ru: 'Жиен жырау, Кунхожа, Ажинияз, Бердах', en: 'Jiyen Jirau, Kunkhoja, Ajiniyaz, Berdakh', pl: 'Jiyen Jirau, Kunkhoja, Ajiniyaz, Berdakh' }
    },
    {
      id: 'new_age',
      image: '/images/eras/era4.jpg',
      title: { kk: 'IV Бөлим: Жаңа дәўир', ru: 'Раздел IV: Новая эпоха', en: 'Section IV: New Era', pl: 'Sekcja IV: Nowa Era' },
      desc: { kk: 'Жәдидлер, Ағартыўшылар ҳәм Репрессия қурбанлары', ru: 'Джадиды, Просветители и жертвы репрессий', en: 'Jadids, Enlighteners and victims of repression', pl: 'Dżadidzi, Oświeciciele i ofiary represji' }
    },
    {
      id: 'independence',
      image: '/images/eras/era5.jpg',
      title: { kk: 'V Бөлим: Ғәрезсизлик', ru: 'Раздел V: Независимость', en: 'Section V: Independence', pl: 'Sekcja V: Niepodległość' },
      desc: { kk: 'Заманагөй Қарақалпақстан', ru: 'Современный Каракалпакстан', en: 'Modern Karakalpakstan', pl: 'Współczesny Karakałpakstan' }
    }
  ];

  const uiText = {
    ru: { title: 'На Службе Народа', search: 'Поиск личности...', shareTitle: 'Свяжитесь с нами', copyLink: 'Скопировать ссылку', backToHome: 'Назад', backToEras: 'К списку эпох', archiveVideo: 'Архив видео', download: 'Скачать изображение', viewGallery: 'Смотреть фотогалерею', stayTuned: "Оставайтесь с нами.\nПродолжение следует...", comingSoon: "Запустим в ближайшие дни\nСейчас в активной разработке. Ожидайте!", selectEra: "Выберите Эпоху" },
    kk: { title: 'Ел Хызметинде', search: 'Тулғаны излеў...', shareTitle: 'Биз бенен байланысың', copyLink: 'Силтемени көшириў', backToHome: 'Изге қайтыў', backToEras: 'Дәўирлерге қайтыў', archiveVideo: 'Архив видео', download: 'Сүўретти жүклеп алыў', viewGallery: 'Фотогалереяны көриў', stayTuned: "Биз бенен бирге болың.\nДаўамы бар...", comingSoon: "Жақын күнлери иске түседи\nҲәзир актив түрде исленип атыр. Күтиң!", selectEra: "Дәўирди таңлаң" },
    en: { title: 'In Service of the People', search: 'Search for a person...', shareTitle: 'Connect with us', copyLink: 'Copy Link', backToHome: 'Go back', backToEras: 'Back to Eras', archiveVideo: 'Archive Video', download: 'Download Image', viewGallery: 'View Gallery', stayTuned: "Stay with us.\nTo be continued...", comingSoon: "Launching in the coming days\nCurrently under active development. Stay tuned!", selectEra: "Select an Era" },
    pl: { title: 'W Służbie Narodu', search: 'Szukaj osoby...', shareTitle: 'Połącz się z nami', copyLink: 'Kopiuj link', backToHome: 'Wróć', backToEras: 'Powrót do epok', archiveVideo: 'Archiwalne wideo', download: 'Pobierz obraz', viewGallery: 'Zobacz galerię', stayTuned: "Zostań z nami.\nCiąg dalszy nastąpi...", comingSoon: "Uruchomimy w najbliższych dniach\nObecnie trwają aktywne prace. Czekajcie!", selectEra: "Wybierz Epokę" }
  };
  const t = uiText[lang] || uiText.ru;

  const filteredFigures = persons
    .filter(figure => {
      if (selectedEra && figure.era !== selectedEra.id) return false;
      const title = figure.title[lang] || '';
      const desc = figure.excerpt[lang] || '';
      const term = searchTerm.toLowerCase();
      return title.toLowerCase().includes(term) || desc.toLowerCase().includes(term);
    })
    .sort((a, b) => {
      const nameA = a.title[lang] || '';
      const nameB = b.title[lang] || '';
      return nameA.localeCompare(nameB, lang, { sensitivity: 'base' });
    });

  const renderContent = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, index) => {
      if (line.trim() === '') return <div key={index} className="h-2"></div>;
      const parts = line.split(/(\[.*?\]\(.*?\)|(?:\*\*.*?\*\*))/g);
      return (
        <p key={index} className="mb-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          {parts.map((part, i) => {
            const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
            if (linkMatch) {
              const [_, label, url] = linkMatch;
              if (url.startsWith('/')) {
                return <Link key={i} to={url} className="text-blue-600 dark:text-blue-400 font-bold hover:underline cursor-pointer">{label}</Link>;
              }
              return <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 font-bold hover:underline cursor-pointer">{label}</a>;
            }
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={i} className="font-bold text-gray-900 dark:text-white">{part.slice(2, -2)}</strong>;
            }
            return <span key={i}>{part}</span>;
          })}
        </p>
      );
    });
  };

  const getEmbedUrl = (url) => {
    if (!url) return '';
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s\)]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
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

  const handleModalScroll = (e) => { if (e.target.scrollTop > 300) setShowModalScroll(true); else setShowModalScroll(false); };
  const scrollModalToTop = () => { if (modalRef.current) modalRef.current.scrollTo({ top: 0, behavior: 'smooth' }); };
  const copyToClipboard = () => { navigator.clipboard.writeText(window.location.href); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const resetZoom = () => { setScale(1); setPosition({ x: 0, y: 0 }); };
  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.5, 4));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.5, 1));
  const handleMouseDown = (e) => { if (scale > 1) { setIsDragging(true); setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y }); } };
  const handleMouseMove = (e) => { if (isDragging && scale > 1) { setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y }); } };
  const handleMouseUp = () => setIsDragging(false);
  const downloadImage = (url) => { const link = document.createElement('a'); link.href = url; link.download = `Karakalpak-Figure-${Date.now()}.jpg`; document.body.appendChild(link); link.click(); document.body.removeChild(link); };
  
  const getImages = (figure) => {
    if (!figure) return [];
    if (Array.isArray(figure.images)) return figure.images;
    if (figure.image) return [figure.image];
    return ['/logo2.png'];
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#050505] text-gray-900 dark:text-white pt-24 pb-20 px-4 transition-colors duration-300">
      
      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-12 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 backdrop-blur-md">
          <Star size={16} className="text-amber-400 fill-amber-400 animate-pulse" />
          <span className="text-xs md:text-sm font-bold text-amber-300 uppercase tracking-widest">Official Archive</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-amber-600 dark:text-amber-500 uppercase tracking-tighter">
          {t.title}
        </h1>

        {selectedEra && (
          <div className="animate-fade-in">
             <h2 className="text-2xl font-bold text-gray-600 dark:text-gray-300">{selectedEra.title[lang]}</h2>
             <button onClick={() => setSelectedEra(null)} className="mt-4 text-amber-600 hover:underline flex items-center justify-center gap-2 mx-auto">
                <ArrowLeft size={16}/> {t.backToEras}
             </button>
          </div>
        )}
      </div>

      {!selectedEra && !loading && (
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
           {erasData.map((era) => (
             <div key={era.id} onClick={() => setSelectedEra(era)} className="group relative h-96 rounded-3xl overflow-hidden cursor-pointer shadow-xl border border-gray-200 dark:border-white/10 hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-300">
                <img src={era.image} alt={era.title[lang]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8">
                   <h3 className="text-2xl font-black text-white mb-2 group-hover:text-amber-400 transition-colors">{era.title[lang]}</h3>
                   <p className="text-gray-300 text-sm font-medium">{era.desc[lang]}</p>
                </div>
             </div>
           ))}
        </div>
      )}

      {selectedEra && (
        <div className="animate-fade-in">
          <div className="relative max-w-xl mx-auto mb-10">
            <input type="text" placeholder={t.search} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full p-4 pl-12 rounded-full bg-white dark:bg-white/10 border border-gray-200 dark:border-white/20 focus:border-amber-500 outline-none shadow-lg transition-all text-gray-900 dark:text-white" />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>

          {loading ? (
             <div className="flex justify-center py-20"><Loader2 className="animate-spin text-amber-500" size={48} /></div>
          ) : (
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredFigures.length > 0 ? (
                filteredFigures.map((figure) => {
                  const images = getImages(figure);
                  return (
                    <div key={figure.id || figure.slug} onClick={() => openFigure(figure)} className="group relative bg-white dark:bg-white/5 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-300 cursor-pointer border border-gray-100 dark:border-white/10">
                      <div className="h-96 overflow-hidden relative">
                        <img src={images[0]} alt={figure.title[lang]} className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700 filter grayscale group-hover:grayscale-0" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">{figure.title[lang]}</h3>
                        <p className="text-amber-500 font-mono text-sm mb-2">{figure.date || ''}</p>
                        <p className="text-gray-300 text-sm line-clamp-2">{figure.excerpt[lang]}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full text-center py-24 animate-fade-in">
                  <div className="inline-block p-10 rounded-3xl bg-gray-100 dark:bg-white/5 border border-dashed border-gray-300 dark:border-white/20 max-w-2xl mx-auto shadow-inner">
                     <Clock size={64} className="mx-auto mb-6 text-amber-500 animate-pulse" />
                     <h3 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white whitespace-pre-line leading-relaxed">{t.comingSoon}</h3>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {selectedFigure && (
        <>
          <div ref={modalRef} onScroll={handleModalScroll} className="fixed inset-0 z-[100] bg-white dark:bg-[#050505] overflow-y-auto animate-fade-in flex flex-col">
            <div className="sticky top-0 z-[110] bg-white/90 dark:bg-[#050505]/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
               <Navbar />
            </div>

            <button onClick={closeFigure} className="fixed top-24 right-4 z-50 p-3 bg-black/10 dark:bg-white/10 hover:bg-red-500 rounded-full backdrop-blur-md transition-colors text-gray-900 dark:text-white"><X size={28} /></button>
            <button onClick={closeFigure} className="fixed top-24 left-4 z-50 p-3 bg-black/10 dark:bg-white/10 hover:bg-amber-500 rounded-full backdrop-blur-md transition-colors text-gray-900 dark:text-white flex items-center gap-2 px-4"><ArrowLeft size={24} /><span className="hidden md:inline font-bold">{t.backToEras}</span></button>

            <div className="flex-grow max-w-5xl mx-auto pb-20 pt-0 w-full mt-10">
              <div className="relative h-[60vh] md:h-[70vh] bg-black">
                <img src={getImages(selectedFigure)[0]} alt="Main" className="w-full h-full object-contain opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full pointer-events-none text-white">
                  <h2 className="text-4xl md:text-7xl font-black mb-2 drop-shadow-lg">{selectedFigure.title[lang]}</h2>
                  <p className="text-xl md:text-3xl text-amber-500 font-mono">{selectedFigure.date}</p>
                </div>
              </div>

              <div className="px-4 md:px-12 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12 text-gray-900 dark:text-white">
                <div className="lg:col-span-2 space-y-8">
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-xl font-semibold text-amber-600 dark:text-amber-400 mb-6 border-l-4 border-amber-500 pl-4">{selectedFigure.excerpt[lang]}</p>
                    <div className="whitespace-pre-line text-lg leading-relaxed text-gray-700 dark:text-gray-300 font-light">
                      {renderContent(selectedFigure.content[lang])}
                      <p className="mt-8 text-xl font-bold italic text-amber-600 dark:text-amber-500 whitespace-pre-line">{t.stayTuned}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-8">
                  {selectedFigure.videoUrl && (
                    <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-white/10 aspect-video">
                      <iframe width="100%" height="100%" src={getEmbedUrl(selectedFigure.videoUrl)} title="Video" frameBorder="0" allowFullScreen></iframe>
                    </div>
                  )}
                  <div onClick={() => setIsLightboxOpen(true)} className="rounded-2xl overflow-hidden cursor-pointer group relative border-2 border-amber-500/50 shadow-xl aspect-[4/3] bg-black">
                      <img src={getImages(selectedFigure)[0]} alt="Gallery" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30">
                        <Image size={48} className="text-white mb-2" />
                        <span className="text-white font-bold bg-black/50 px-3 py-1 rounded-full text-sm">{t.viewGallery} ({getImages(selectedFigure).length})</span>
                      </div>
                  </div>
                </div>
              </div>
              
              {/* МЫНА ЖЕРДЕГІ АРТЫҚ ӘЛЕУМЕТТІК ЖЕЛІЛЕР ӨШІРІЛДІ (Дубликат еді) */}
            </div>

             <Footer />
             
            {isLightboxOpen && (
              <div className="fixed inset-0 z-[200] bg-black/95 flex flex-col items-center justify-center select-none animate-fade-in">
                <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between bg-black/40 backdrop-blur-md z-[210]">
                  <div className="flex items-center gap-4">
                    <button onClick={() => { setIsLightboxOpen(false); resetZoom(); }} className="p-2 hover:bg-white/10 rounded-full text-white"><X size={28} /></button>
                    <button onClick={handleZoomIn} className="p-2 hover:bg-white/10 rounded-full text-white"><ZoomIn size={24} /></button>
                    <button onClick={handleZoomOut} className="p-2 hover:bg-white/10 rounded-full text-white"><ZoomOut size={24} /></button>
                    <button onClick={resetZoom} className="p-2 hover:bg-white/10 rounded-full text-white"><RotateCcw size={24} /></button>
                  </div>
                  <button onClick={() => downloadImage(getImages(selectedFigure)[currentImageIndex])} className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 rounded-lg text-white font-bold transition-all"><Download size={20} /> <span className="hidden md:inline">{t.download}</span></button>
                </div>
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden" onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
                  <img src={getImages(selectedFigure)[currentImageIndex]} alt="" style={{ transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`, transition: isDragging ? 'none' : 'transform 0.3s' }} className="max-w-[95%] max-h-[85%] object-contain shadow-2xl" draggable="false" />
                  {getImages(selectedFigure).length > 1 && scale === 1 && (
                    <>
                      <button onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(prev => prev === 0 ? getImages(selectedFigure).length -1 : prev - 1); }} className="absolute left-8 p-4 bg-white/5 hover:bg-white/10 rounded-full text-white"><ChevronLeft size={48} /></button>
                      <button onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(prev => (prev + 1) % getImages(selectedFigure).length); }} className="absolute right-8 p-4 bg-white/5 hover:bg-white/10 rounded-full text-white"><ChevronRight size={48} /></button>
                    </>
                  )}
                </div>
                <div className="absolute bottom-8 text-white/80 font-mono">{currentImageIndex + 1} / {getImages(selectedFigure).length}</div>
              </div>
            )}
          </div>

          {showModalScroll && (
            <button onClick={scrollModalToTop} className="fixed bottom-8 right-8 z-[150] p-4 bg-amber-500 hover:bg-amber-600 text-white rounded-full shadow-2xl transition-all duration-300 animate-bounce" title="Scroll to Top"><ArrowUp size={24} /></button>
          )}
        </>
      )}
      
      {/* МЫНА ЖЕРДЕГІ ЕКІНШІ АРТЫҚ БЛОК ТА ӨШІРІЛДІ */}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
      `}} />
    </div>
  );
}