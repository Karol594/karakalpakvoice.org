import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Palette, Music, Hammer, Clock, ArrowRight, Star } from 'lucide-react';

const CultureArt = () => {
  const [lang, setLang] = useState("RU");

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleLangChange = (e) => {
      if (e.detail?.lang) {
        let newLang = e.detail.lang.toUpperCase();
        if (newLang === 'KAA') newLang = 'KK';
        setLang(newLang);
      }
    };
    window.addEventListener("languageChange", handleLangChange);
    return () => window.removeEventListener("languageChange", handleLangChange);
  }, []);

  const translations = {
    KK: {
      heroTitle: "Қарақалпақстан Мәденияты",
      heroDesc: "Әсирлерден жеткен мийрас, дүньяға танылған өнер ҳәм өлмес дәстүрлер.",
      
      // Карточка 1 (Музей)
      museumTitle: "Савицкий Музейи",
      museumDesc: "«Шөлдеги Лувр» — дүньядағы ең үлкен авангард коллекцияларының бири.",
      readMore: "Толық оқыў",
      
      // Карточка 2 (Фольклор)
      folkTitle: "Миллий Фольклор",
      folkDesc: "Жырау намалары, қыз-жигитлер ойыны ҳәм халық аўыз-еки дөретиўшилиги.",
      
      // Карточка 3 (Қол өнери)
      craftTitle: "Қол Өнери & Зергерлик",
      craftDesc: "Сәўкеле, киймешек ҳәм миллий нағыслардың сырлы дүньясы.",
      
      comingSoon: "Жақын күнлерде..."
    },
    RU: {
      heroTitle: "Культура Каракалпакстана",
      heroDesc: "Наследие веков, всемирно известное искусство и бессмертные традиции.",
      
      museumTitle: "Музей Савицкого",
      museumDesc: "«Лувр в пустыне» — одна из крупнейших коллекций авангарда в мире.",
      readMore: "Читать полностью",
      
      folkTitle: "Национальный Фольклор",
      folkDesc: "Мелодии жырау, народные танцы и устное народное творчество.",
      
      craftTitle: "Ремесла и Ювелирное искусство",
      craftDesc: "Тайный мир саукеле, кимешеков и национальных узоров.",
      
      comingSoon: "Скоро открытие..."
    },
    EN: {
      heroTitle: "Culture of Karakalpakstan",
      heroDesc: "Heritage of centuries, world-renowned art, and immortal traditions.",
      
      museumTitle: "Savitsky Museum",
      museumDesc: "The 'Louvre in the Desert' — one of the largest avant-garde collections in the world.",
      readMore: "Read Full",
      
      folkTitle: "National Folklore",
      folkDesc: "Zhyrau melodies, folk dances, and oral traditions.",
      
      craftTitle: "Crafts & Jewelry",
      craftDesc: "The mysterious world of saukele, kimeshek, and national patterns.",
      
      comingSoon: "Coming Soon..."
    },
    PL: {
      heroTitle: "Kultura Karakałpakstanu",
      heroDesc: "Dziedzictwo wieków, światowej sławy sztuka i nieśmiertelne tradycje.",
      
      museumTitle: "Muzeum Sawickiego",
      museumDesc: "„Luwr na pustyni” – jedna z największych kolekcji awangardy na świecie.",
      readMore: "Czytaj całość",
      
      folkTitle: "Narodowy Folklor",
      folkDesc: "Melodie żyrau, tańce ludowe i ustna tradycja ludowa.",
      
      craftTitle: "Rzemiosło i Biżuteria",
      craftDesc: "Tajemniczy świat saukele, kimeszek i narodowych wzorów.",
      
      comingSoon: "Wkrótce..."
    }
  };

  const t = translations[lang] || translations.RU;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">
      
      {/* 1. HERO SECTION (ФОН) */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/culture-hero.jpg" 
            alt="Karakalpak Culture" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-gray-50 dark:to-black"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/50 backdrop-blur-md text-amber-300 font-bold mb-6">
            <Star size={16} className="fill-amber-300" />
            <span>Karakalpak Voice Art</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 drop-shadow-2xl">
            {t.heroTitle}
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 font-light leading-relaxed">
            {t.heroDesc}
          </p>
        </div>
      </div>

      {/* 2. MENU GRID (КАРТОЧКАЛАР) */}
      <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-20 pb-20">
        <div className="grid md:grid-cols-3 gap-8">

          {/* --- CARD 1: MUSEUM (ACTIVE) --- */}
          <div className="group relative bg-white dark:bg-gray-900 rounded-[2rem] shadow-xl overflow-hidden hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:-translate-y-2 border border-gray-100 dark:border-gray-800">
            <div className="relative h-64 overflow-hidden">
              <img 
                src="/images/savitsky-preview.png" 
                alt="Savitsky Museum" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg">
                <Palette size={24} />
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {t.museumTitle}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 line-clamp-3">
                {t.museumDesc}
              </p>
              
              {/* LINK TO MUSEUMS.JSX */}
              <Link 
                to="/museums" 
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider hover:gap-4 transition-all"
              >
                {t.readMore} <ArrowRight size={20} />
              </Link>
            </div>
          </div>

          {/* --- CARD 2: FOLKLORE (COMING SOON) --- */}
          <div className="group relative bg-white dark:bg-gray-900 rounded-[2rem] shadow-xl overflow-hidden opacity-90 border border-gray-100 dark:border-gray-800">
            <div className="relative h-64 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
              <img 
                src="/images/folklore.png" 
                alt="Folklore" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="flex items-center gap-2 px-4 py-2 bg-black/60 rounded-full backdrop-blur-sm border border-white/20 text-white font-bold">
                  <Clock size={16} /> {t.comingSoon}
                </div>
              </div>
              <div className="absolute top-4 right-4 bg-gray-700 text-white p-3 rounded-full">
                <Music size={24} />
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-3 text-gray-500 dark:text-gray-400">
                {t.folkTitle}
              </h3>
              <p className="text-gray-500 dark:text-gray-500">
                {t.folkDesc}
              </p>
            </div>
          </div>

          {/* --- CARD 3: CRAFTS (COMING SOON) --- */}
          <div className="group relative bg-white dark:bg-gray-900 rounded-[2rem] shadow-xl overflow-hidden opacity-90 border border-gray-100 dark:border-gray-800">
            <div className="relative h-64 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
              <img 
                src="/images/crafts.jpg" 
                alt="Crafts" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="flex items-center gap-2 px-4 py-2 bg-black/60 rounded-full backdrop-blur-sm border border-white/20 text-white font-bold">
                  <Clock size={16} /> {t.comingSoon}
                </div>
              </div>
              <div className="absolute top-4 right-4 bg-gray-700 text-white p-3 rounded-full">
                <Hammer size={24} />
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-3 text-gray-500 dark:text-gray-400">
                {t.craftTitle}
              </h3>
              <p className="text-gray-500 dark:text-gray-500">
                {t.craftDesc}
              </p>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default CultureArt;