import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Search, X, ChevronLeft, ChevronRight, Play, 
  Download, ZoomIn, ZoomOut, RotateCcw, ArrowLeft, Star, Image, ArrowUp, Clock, Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { loadContent } from '../utils/contentLoader';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar'; 

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

  const erasData = [
    { id: 'ancient', image: '/images/eras/era1.jpg', title: { kk: 'I Бөлим: Әййемги дәўир', ru: 'Раздел I: Древний мир', en: 'Section I: Ancient Era', pl: 'Sekcja I: Starożytność' }, desc: { kk: 'Тумарис, Сақлар ҳәм әййемги бабалар', ru: 'Томирис, Саки и древние предки', en: 'Tomyris, Sakas and ancient ancestors', pl: 'Tomyris, Sakowie i starożytni przodkowie' } },
    { id: 'biys', image: '/images/eras/era2.jpg', title: { kk: 'II Бөлим: Бийлер ҳәм Батырлар', ru: 'Раздел II: Бии и Батыры', en: 'Section II: Biys and Batyrs', pl: 'Sekcja II: Bijowie i Batyrowie' }, desc: { kk: 'Ел қорғаған ерлер тарийхы', ru: 'История защитников народа', en: 'History of the defenders of the people', pl: 'Historia obrońców narodu' } },
    { id: 'classic', image: '/images/eras/era3.jpg', title: { kk: 'III Бөлим: Классика', ru: 'Раздел III: Классика', en: 'Section III: Classical Era', pl: 'Sekcja III: Klasyka' }, desc: { kk: 'Жийен жыраў, Күнхожа, Әжинияз, Бердах', ru: 'Жиен жырау, Кунхожа, Ажинияз, Бердах', en: 'Jiyen Jirau, Kunkhoja, Ajiniyaz, Berdakh', pl: 'Jiyen Jirau, Kunkhoja, Ajiniyaz, Berdakh' } },
    { id: 'new_age', image: '/images/eras/era4.jpg', title: { kk: 'IV Бөлим: Жаңа дәўир', ru: 'Раздел IV: Новая эпоха', en: 'Section IV: New Era', pl: 'Sekcja IV: Nowa Era' }, desc: { kk: 'Жәдидлер, Ағартыўшылар ҳәм Репрессия қурбанлары', ru: 'Джадиды, Просветители и жертвы репрессий', en: 'Jadids, Enlighteners and victims of repression', pl: 'Dżadidzi, Oświeciciele i ofiary represji' } },
    { id: 'independence', image: '/images/eras/era5.jpg', title: { kk: 'V Бөлим: Ғәрезсизлик', ru: 'Раздел V: Независимость', en: 'Section V: Independence', pl: 'Sekcja V: Niepodległość' }, desc: { kk: 'Заманагөй Қарақалпақстан', ru: 'Современный Каракалпакстан', en: 'Modern Karakalpakstan', pl: 'Współczesny Karakałpakstan' } }
  ];

  const uiText = {
    ru: { title: 'На Службе Народа', search: 'Поиск личности...', backToEras: 'К списку эпох', download: 'Скачать', viewGallery: 'Галерея', stayTuned: "Продолжение следует...", comingSoon: "В активной разработке. Ожидайте!", aiImproved: "Улучшено ИИ", original: "Оригинал" },
    kk: { title: 'Ел Хызметинде', search: 'Тулғаны излеў...', backToEras: 'Дәўирлерге қайтыў', download: 'Жүклеў', viewGallery: 'Галерея', stayTuned: "Даўамы бар...", comingSoon: "Ҳәзир актив түрде исленип атыр. Күтиң!", aiImproved: "ИИ жақсартылған", original: "Оригинал" },
    en: { title: 'In Service of the People', search: 'Search...', backToEras: 'Back to Eras', download: 'Download', viewGallery: 'Gallery', stayTuned: "To be continued...", comingSoon: "Under development. Stay tuned!", aiImproved: "AI Enhanced", original: "Original" },
    pl: { title: 'W Służbie Narodu', search: 'Szukaj...', backToEras: 'Powrót', download: 'Pobierz', viewGallery: 'Galeria', stayTuned: "Ciąg dalszy nastąpi...", comingSoon: "W trakcie opracowywania!", aiImproved: "Ulepszone przez AI", original: "Oryginał" }
  };
  const t = uiText[lang] || uiText.ru;

  const getImages = (figure) => {
    if (!figure) return [];
    if (Array.isArray(figure.images) && figure.images.length > 0) return figure.images;
    if (figure.image) return [figure.image];
    return ['/logo2.png'];
  };

  const openLightboxWithImage = (imgSrc) => {
    const images = getImages(selectedFigure);
    const idx = images.findIndex(img => img.includes(imgSrc.trim()));
    if (idx !== -1) setCurrentImageIndex(idx);
    setIsLightboxOpen(true);
  };

  const renderContent = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, index) => {
      if (line.trim() === '') return <div key={index} className="h-4"></div>;

      // 🔹 IMAGE_PAIR: [IMAGE_PAIR:img1.jpg,img2.jpg]
      const imagePairMatch = line.match(/\[IMAGE_PAIR:(.*?),(.*?)\]/);
      if (imagePairMatch) {
        const [_, img1, img2] = imagePairMatch;
        return (
          <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
            <div className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-xl border dark:border-white/10" onClick={() => openLightboxWithImage(img1)}>
              <img src={`/images/figures/${img1.trim()}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt="Original" />
              <div className="absolute bottom-3 left-3 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-bold">{t.original}</div>
            </div>
            <div className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-xl border dark:border-white/10" onClick={() => openLightboxWithImage(img2)}>
              <img src={`/images/figures/${img2.trim()}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt="AI" />
              <div className="absolute bottom-3 left-3 bg-amber-600 text-white px-3 py-1 rounded-full text-xs font-bold">✨ {t.aiImproved}</div>
            </div>
          </div>
        );
      }

      // 🔹 VIDEO: Odysee
      if (line.trim() === '[VIDEO]' && selectedFigure?.odysee_url) {
        return (
          <div key={index} className="my-12 aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-500/20 bg-black">
            <iframe width="100%" height="100%" src={selectedFigure.odysee_url} frameBorder="0" allowFullScreen></iframe>
          </div>
        );
      }

      const parts = line.split(/(\[.*?\]\(.*?\)|(?:\*\*.*?\*\*))/g);
      return (
        <p key={index} className="mb-4 text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300">
          {parts.map((part, i) => {
            const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
            if (linkMatch) {
              const [_, label, url] = linkMatch;
              const isInternal = url.startsWith('/');
              return isInternal ? <Link key={i} to={url} className="text-amber-600 font-bold hover:underline">{label}</Link> 
                                : <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="text-amber-600 font-bold hover:underline">{label}</a>;
            }
            if (part.startsWith('**') && part.endsWith('**')) return <strong key={i} className="font-bold text-gray-900 dark:text-white">{part.slice(2, -2)}</strong>;
            return <span key={i}>{part}</span>;
          })}
        </p>
      );
    });
  };

  const openFigure = (figure) => { setSelectedFigure(figure); setCurrentImageIndex(0); window.scrollTo(0,0); document.body.style.overflow = 'hidden'; };
  const closeFigure = () => { setSelectedFigure(null); document.body.style.overflow = 'auto'; };
  const resetZoom = () => { setScale(1); setPosition({ x: 0, y: 0 }); };
  const handleMouseDown = (e) => { if (scale > 1) { setIsDragging(true); setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y }); } };
  const handleMouseMove = (e) => { if (isDragging && scale > 1) { setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y }); } };

  const filteredFigures = persons.filter(f => {
    if (selectedEra && f.era !== selectedEra.id) return false;
    const term = searchTerm.toLowerCase();
    return (f.title[lang] || '').toLowerCase().includes(term) || (f.excerpt[lang] || '').toLowerCase().includes(term);
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#050505] text-gray-900 dark:text-white pt-24 pb-10 transition-colors">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4">
        {/* HEADER AREA */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-5xl md:text-7xl font-black text-amber-600 uppercase tracking-tighter">{t.title}</h1>
          {selectedEra && (
            <button onClick={() => setSelectedEra(null)} className="flex items-center gap-2 mx-auto text-amber-500 font-bold hover:scale-105 transition-transform">
              <ArrowLeft size={20}/> {t.backToEras}
            </button>
          )}
        </div>

        {/* ERA SELECTION */}
        {!selectedEra && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {erasData.map(era => (
              <div key={era.id} onClick={() => setSelectedEra(era)} className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer shadow-2xl">
                <img src={era.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-2xl font-black text-white group-hover:text-amber-400">{era.title[lang]}</h3>
                  <p className="text-gray-300 text-sm">{era.desc[lang]}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* FIGURES GRID */}
        {selectedEra && (
          <div className="space-y-10">
            <div className="relative max-w-xl mx-auto">
              <input type="text" placeholder={t.search} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full p-4 pl-12 rounded-full bg-white dark:bg-white/5 border border-amber-500/30 outline-none focus:ring-2 ring-amber-500" />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500" size={20} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredFigures.length > 0 ? filteredFigures.map(figure => (
                <div key={figure.id} onClick={() => openFigure(figure)} className="group bg-white dark:bg-white/5 rounded-3xl overflow-hidden shadow-xl cursor-pointer border dark:border-white/10">
                  <div className="h-80 overflow-hidden"><img src={getImages(figure)[0]} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt="" /></div>
                  <div className="p-6"><h3 className="text-xl font-bold group-hover:text-amber-500">{figure.title[lang]}</h3><p className="text-gray-500 text-sm line-clamp-2 mt-2">{figure.excerpt[lang]}</p></div>
                </div>
              )) : <div className="col-span-full text-center py-20 bg-white/5 rounded-3xl border border-dashed border-amber-500/30"><Clock size={48} className="mx-auto text-amber-500 mb-4"/><h2 className="text-2xl font-bold">{t.comingSoon}</h2></div>}
            </div>
          </div>
        )}
      </div>

      {/* FULL-SCREEN FIGURE MODAL */}
      {selectedFigure && (
        <div ref={modalRef} onScroll={(e) => setShowModalScroll(e.target.scrollTop > 400)} className="fixed inset-0 z-[150] bg-white dark:bg-[#050505] overflow-y-auto flex flex-col">
          <div className="sticky top-0 z-[160] bg-white/80 dark:bg-[#050505]/80 backdrop-blur-lg border-b dark:border-white/10"><Navbar /></div>
          
          <button onClick={closeFigure} className="fixed top-24 left-6 z-[170] bg-amber-600 text-white p-3 rounded-full shadow-2xl hover:scale-110 transition-transform"><ArrowLeft size={24}/></button>

          <div className="flex-grow">
            <div className="max-w-5xl mx-auto px-4 pt-10 pb-20">
              <div className="relative h-[50vh] md:h-[70vh] rounded-3xl overflow-hidden mb-12 shadow-2xl bg-black">
                <img src={getImages(selectedFigure)[0]} className="w-full h-full object-contain" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-10 left-10"><h2 className="text-5xl md:text-7xl font-black text-white">{selectedFigure.title[lang]}</h2><p className="text-amber-500 text-2xl font-mono">{selectedFigure.years}</p></div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                  <div className="bg-amber-500/10 border-l-4 border-amber-500 p-6 mb-8 rounded-r-2xl italic text-xl">{selectedFigure.excerpt[lang]}</div>
                  <div className="content-render">{renderContent(selectedFigure.content?.[lang] || "")}</div>
                  <p className="text-amber-500 font-bold text-2xl mt-10">{t.stayTuned}</p>
                </div>

                <div className="space-y-6">
                  <div onClick={() => setIsLightboxOpen(true)} className="relative group cursor-pointer rounded-2xl overflow-hidden border-2 border-amber-500/30">
                    <img src={getImages(selectedFigure)[0]} className="w-full aspect-square object-cover" alt="" />
                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><Image size={40} className="text-white"/><span className="text-white font-bold mt-2">{t.viewGallery} ({getImages(selectedFigure).length})</span></div>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>

          {showModalScroll && <button onClick={() => modalRef.current.scrollTo({top:0, behavior:'smooth'})} className="fixed bottom-10 right-10 p-4 bg-amber-600 text-white rounded-full shadow-2xl animate-bounce"><ArrowUp/></button>}
        </div>
      )}

      {/* LIGHTBOX COMPONENT */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-[300] bg-black/95 flex items-center justify-center select-none" onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={() => setIsDragging(false)}>
          <div className="absolute top-0 w-full p-6 flex justify-between items-center bg-black/50 backdrop-blur-md">
            <div className="flex gap-4">
              <button onClick={() => {setIsLightboxOpen(false); resetZoom();}} className="text-white p-2 hover:bg-white/10 rounded-full"><X size={30}/></button>
              <button onClick={() => setScale(s => Math.min(s+0.5, 4))} className="text-white p-2 hover:bg-white/10 rounded-full"><ZoomIn/></button>
              <button onClick={() => setScale(s => Math.max(s-0.5, 1))} className="text-white p-2 hover:bg-white/10 rounded-full"><ZoomOut/></button>
            </div>
            <a href={getImages(selectedFigure)[currentImageIndex]} download className="bg-amber-600 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2"><Download size={20}/> {t.download}</a>
          </div>
          
          <img src={getImages(selectedFigure)[currentImageIndex]} style={{ transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`, transition: isDragging ? 'none' : 'transform 0.2s' }} className="max-w-full max-h-full object-contain shadow-2xl" draggable="false" />

          {getImages(selectedFigure).length > 1 && scale === 1 && (
            <>
              <button onClick={() => setCurrentImageIndex(i => (i === 0 ? getImages(selectedFigure).length-1 : i-1))} className="absolute left-10 p-4 bg-white/10 text-white rounded-full hover:bg-white/20"><ChevronLeft size={40}/></button>
              <button onClick={() => setCurrentImageIndex(i => (i+1) % getImages(selectedFigure).length)} className="absolute right-10 p-4 bg-white/10 text-white rounded-full hover:bg-white/20"><ChevronRight size={40}/></button>
            </>
          )}
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `.content-render p { margin-bottom: 1.5rem; }` }} />
    </div>
  );
}