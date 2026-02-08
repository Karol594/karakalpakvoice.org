import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { historyContent } from '../data/historyData';
import { 
  Facebook, 
  Send, 
  Twitter, 
  Instagram, 
  Youtube, 
  Link as LinkIcon,
  ChevronRight,
  PlayCircle,
  Printer,
  Download,
  Maximize2,
  X
} from 'lucide-react';
import { useTheme } from '../components/useTheme';

const History = () => {
  const { i18n } = useTranslation();
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState('');

  // Тилди анықлаў (default: RU -> KK -> EN -> PL)
  const currentLangCode = i18n.language ? i18n.language.toUpperCase() : 'RU';
  const mappedLang = (currentLangCode === 'KAA' || currentLangCode === 'KK') ? 'KK' 
                   : (currentLangCode === 'EN') ? 'EN' 
                   : (currentLangCode === 'PL') ? 'PL' 
                   : 'RU';

  const content = historyContent[mappedLang];

  // Жүктеу батырмасының аудармалары (ЖАҢА)
  const downloadLabels = {
    KK: "Жүклеп алыў",
    RU: "Скачать",
    EN: "Download",
    PL: "Pobierz"
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Силтеме көширип алынды! / Link copied!");
  };

  const handlePrint = () => {
    window.print();
  };

  const openLightbox = (src) => {
    setLightboxSrc(src);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxSrc('');
  };

  const handleDownload = (src) => {
    const link = document.createElement('a');
    link.href = src;
    link.download = src.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`min-h-screen py-12 px-4 md:px-8 font-serif ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-[#f4f4f4] text-gray-900'}`}>
      
      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={closeLightbox}>
          <button onClick={closeLightbox} className="absolute top-4 right-4 text-white p-2 hover:bg-white/20 rounded-full transition">
            <X size={32} />
          </button>
          <div className="relative max-w-5xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <img src={lightboxSrc} alt="Full view" className="max-w-full max-h-[85vh] rounded-lg shadow-2xl" />
            <div className="absolute bottom-[-50px] left-1/2 transform -translate-x-1/2 flex gap-4">
               <button 
                 onClick={() => handleDownload(lightboxSrc)}
                 className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full font-bold hover:bg-gray-200 transition"
               >
                 <Download size={20} /> {downloadLabels[mappedLang]}
               </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto relative">
        
        {/* Print Button (Top Right) */}
        <div className="absolute top-0 right-0 hidden md:block print:hidden">
          <button 
            onClick={handlePrint}
            className={`p-3 rounded-full shadow-lg transition transform hover:scale-110 ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-white hover:bg-gray-100 text-gray-800'}`}
            title="Print Article"
          >
            <Printer size={24} />
          </button>
        </div>

        {/* --- HEADER SECTION --- */}
        <header className="mb-16 text-center animate-fade-in-up">
          <div className="inline-block px-4 py-1 mb-6 text-sm font-bold tracking-widest uppercase bg-gray-200 text-gray-600 rounded-full">
            📅 {content.meta.date}
          </div>
          
          {/* QUOTES - COLOR FIXED */}
          <div className="mb-10 p-6 md:p-8 bg-gradient-to-r from-red-50 to-orange-50 dark:bg-[#1a1a1a] border-l-8 border-red-600 rounded-r-xl shadow-lg">
             <p className="text-xl md:text-2xl font-bold text-red-700 dark:text-red-400 italic mb-4">
               {content.meta.quote1}
             </p>
             <p className="text-xl md:text-2xl font-bold text-red-700 dark:text-red-400 italic">
               {content.meta.quote2}
             </p>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            {content.meta.mainTitle}
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
            {content.meta.subTitle}
          </h2>
        </header>

        {/* --- INTRO SECTION --- */}
        <section className={`mb-16 p-8 md:p-10 rounded-3xl shadow-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <p className="text-lg md:text-xl leading-relaxed mb-6 font-medium">{content.intro.text1}</p>
          <p className="text-lg md:text-xl leading-relaxed mb-6">{content.intro.text2}</p>
          <p className="text-lg md:text-xl leading-relaxed mb-8">{content.intro.text3}</p>
          
          <div className="p-6 bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-600 rounded-r-lg">
             <p className="text-xl font-bold italic text-blue-800 dark:text-blue-300">
               {content.intro.highlight}
             </p>
          </div>
        </section>

        {/* --- MAIN SECTIONS LOOP --- */}
        <div className="space-y-16">
          {content.sections.map((section) => (
            <article key={section.id} className={`p-8 md:p-10 rounded-3xl shadow-lg transition-transform hover:scale-[1.01] duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              
              {/* TITLE */}
              <h2 className="text-2xl md:text-3xl font-extrabold mb-2 text-indigo-700 dark:text-indigo-400 border-b-4 border-indigo-200 dark:border-indigo-800 pb-3 inline-block">
                {section.title}
              </h2>
              {section.subtitle && (
                <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mt-2 mb-4 uppercase">{section.subtitle}</h3>
              )}

              {/* CONTENT */}
              <div className="mt-6 text-lg leading-relaxed whitespace-pre-line text-gray-700 dark:text-gray-300">
                {section.content}
              </div>

              {/* LIST (If exists) */}
              {section.list && (
                <ul className="mt-6 space-y-2">
                  {section.list.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-lg font-bold text-gray-800 dark:text-gray-200">
                      <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {/* EXTRA CONTENT (Historical Evidence) */}
              {section.extraContent && (
                <div className="mt-6 p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-600 text-lg whitespace-pre-line">
                  {section.extraContent}
                </div>
              )}

              {/* WIKIPEDIA LINK (If exists) */}
              {section.wikiLinkText && (
                <div className="mt-6">
                  <a href={section.wikiUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold hover:underline text-lg">
                    <LinkIcon size={20} />
                    {section.wikiLinkText}
                  </a>
                </div>
              )}

              {/* MEDIA: IMAGE (With Zoom and Download) */}
              {section.image && (
                <div className="mt-8 relative group">
                  <img 
                    src={section.image} 
                    alt={section.caption} 
                    onClick={() => openLightbox(section.image)}
                    className="w-full rounded-2xl shadow-md cursor-pointer hover:brightness-90 transition duration-300" 
                  />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition duration-300 flex gap-2">
                     <button onClick={() => openLightbox(section.image)} className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70"><Maximize2 size={20}/></button>
                     <button onClick={() => handleDownload(section.image)} className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70"><Download size={20}/></button>
                  </div>
                  <p className="text-center text-sm text-gray-500 mt-2 italic">{section.caption}</p>
                </div>
              )}

              {/* MEDIA: VIDEO (Local or YouTube) */}
              {section.youtubeId ? (
                // YOUTUBE EMBED
                <div className="mt-8">
                  <div className="relative pt-[56.25%] bg-black rounded-2xl overflow-hidden shadow-lg group">
                    <iframe 
                      className="absolute top-0 left-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${section.youtubeId}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              ) : section.video ? (
                // LOCAL VIDEO (If any remain)
                <div className="mt-8">
                  <div className="relative pt-[56.25%] bg-black rounded-2xl overflow-hidden shadow-lg group">
                    <video 
                       controls 
                       className="absolute top-0 left-0 w-full h-full"
                    >
                      <source src={section.video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div className="flex justify-center mt-3">
                     <button 
                        onClick={() => handleDownload(section.video)} 
                        className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                     >
                        <Download size={16}/> {downloadLabels[mappedLang]}
                     </button>
                  </div>
                </div>
              ) : null}

              {/* MEDIA: COMPARE IMAGES (Side by Side) */}
              {section.compareImages && (
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {section.compareImages.map((img, idx) => (
                    <div key={idx} className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl relative group">
                       <img 
                         src={img.src} 
                         alt="Comparison" 
                         onClick={() => openLightbox(img.src)}
                         className="w-full h-64 object-cover rounded-lg mb-3 shadow-sm cursor-pointer hover:brightness-90 transition" 
                       />
                       <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition duration-300">
                          <button onClick={() => openLightbox(img.src)} className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70"><Maximize2 size={16}/></button>
                       </div>
                       <p className="font-bold text-center text-sm md:text-base">{img.text}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* ACTION BUTTON (Shejire, Ruwlar, Saukele) */}
              {section.buttonLink && (
                <div className="mt-10 flex justify-center print:hidden">
                  <Link 
                    to={section.buttonLink} 
                    className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-extrabold text-lg uppercase tracking-wide rounded-full shadow-lg hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
                  >
                    <span className="relative z-10">{section.buttonText}</span>
                    <ChevronRight size={24} className="relative z-10 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              )}

            </article>
          ))}
        </div>

        {/* --- OUTRO SECTION --- */}
        <section className={`mt-16 p-10 rounded-3xl shadow-xl text-center border-2 border-indigo-100 dark:border-indigo-900 ${isDarkMode ? 'bg-gray-800' : 'bg-gradient-to-b from-white to-gray-50'}`}>
          <h2 className="text-3xl font-bold text-indigo-800 dark:text-indigo-400 mb-6">{content.outro.title}</h2>
          <p className="text-xl leading-relaxed mb-8 text-gray-700 dark:text-gray-300">{content.outro.text}</p>
          <div className="inline-block p-4 border-2 border-dashed border-red-400 rounded-xl">
             <h3 className="text-2xl font-black text-red-600 dark:text-red-400 uppercase tracking-wider">
               {content.outro.slogan}
             </h3>
          </div>
        </section>

        {/* --- TEASER --- */}
        <div className="mt-16 text-center">
           <h2 className="text-xl md:text-2xl font-bold text-red-700 dark:text-red-500 uppercase tracking-[0.2em] animate-pulse">
             {content.teaser}
           </h2>
        </div>

        {/* --- SOCIAL SHARE SECTION --- */}
        <section className={`mt-20 p-10 rounded-[40px] border text-center print:hidden ${isDarkMode ? "bg-white/5 border-white/10" : "bg-gray-100 border-gray-200"}`}>
        <h3 className="text-2xl font-bold mb-8 italic text-gray-700 dark:text-gray-200">
           {currentLangCode === 'RU' ? 'Свяжитесь с нами:' 
            : currentLangCode === 'KK' ? 'Биз бенен байланысың:' 
            : currentLangCode === 'EN' ? 'Connect with us:' 
            : 'Połącz się z nami:'}
        </h3>
        <div className="flex flex-wrap justify-center gap-6">
          
          {/* Facebook */}
          <a href="https://www.facebook.com/share/1FifdzG23b/" target="_blank" rel="noreferrer" className="p-4 bg-[#1877F2] text-white rounded-full hover:scale-110 transition shadow-lg" title="Facebook">
            <Facebook size={24} />
          </a>

          {/* Telegram */}
          <a href="https://t.me/kkvoice_org" target="_blank" rel="noreferrer" className="p-4 bg-[#0088cc] text-white rounded-full hover:scale-110 transition shadow-lg" title="Telegram">
            <Send size={24} />
          </a>

          {/* Twitter (X) */}
          <a href="https://x.com/Karakalpak45997" target="_blank" rel="noreferrer" className="p-4 bg-black text-white rounded-full border border-white/20 hover:scale-110 transition shadow-lg" title="Twitter (X)">
            <Twitter size={24} />
          </a>

          {/* Instagram */}
          <a href="https://www.instagram.com/karakalpakvoice_org/" target="_blank" rel="noreferrer" className="p-4 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white rounded-full hover:scale-110 transition shadow-lg" title="Instagram">
            <Instagram size={24} />
          </a>

          {/* YouTube */}
          <a href="https://youtube.com/@karakalpakvoice_org" target="_blank" rel="noreferrer" className="p-4 bg-[#FF0000] text-white rounded-full hover:scale-110 transition shadow-lg" title="YouTube">
            <Youtube size={24} />
          </a>

          {/* Copy Link Button */}
          <button onClick={copyToClipboard} className="p-4 bg-gray-700 text-white rounded-full hover:scale-110 transition shadow-lg flex items-center gap-2 px-6" title="Copy Link">
            <LinkIcon size={20} />
          </button>
        </div>
      </section>

      </div>
    </div>
  );
};

export default History;