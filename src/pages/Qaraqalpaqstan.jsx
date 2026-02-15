import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Shield, Flag, Clock, Mic, ArrowLeft, Star,
  ChevronLeft, ChevronRight, X, Download, ZoomIn, ZoomOut, RotateCcw
} from 'lucide-react';
import { Link } from 'react-router-dom';

// --- ФОТОЛАРДЫ ИМПОРТЛАЎ ---
import aq1 from '../assets/Ayaz-qala1.jpg';
import aq2 from '../assets/Ayaz-qala2.jpg';
import aq3 from '../assets/Ayaz-qala3.jpg';
import aq4 from '../assets/Ayaz-qala4.jpg';
import aq5 from '../assets/Ayaz-qala5.jpg';
import aq6 from '../assets/Ayaz-qala6.jpg';
import aq7 from '../assets/Ayaz-qala7.jpg';
import aq8 from '../assets/Ayaz-qala8.jpg';
import aq9 from '../assets/Ayaz-qala9.jpg';
import aq10 from '../assets/Ayaz-qala10.jpg';
import aq11 from '../assets/Ayaz-qala11.jpg';

import nk1 from '../assets/nukus1.90.jpg';
import nk2 from '../assets/nukus2.90.jpg';
import nk3 from '../assets/nukus3.90.jpg';
import nk4 from '../assets/nukus4.90.jpg';
import nk5 from '../assets/nukus5.90.jpg';
import nk6 from '../assets/nukus6.90.jpg';

import fl1 from '../assets/flag-free1.jpg';
import fl2 from '../assets/flag-free2.jpg';

import rad1 from '../assets/radio1.jpg';

import heroVideo from '../assets/hero-video.mp4';

// --- СЛАЙДЕР ЖӘНЕ ZOOM КОМПОНЕНТИ ---
const Slideshow = ({ images, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (images.length <= 1 || isLightboxOpen) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval, isLightboxOpen]);

  const resetZoom = () => { setScale(1); setPosition({ x: 0, y: 0 }); };
  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.5, 4));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.5, 1));

  const nextSlide = (e) => {
    e?.stopPropagation();
    resetZoom();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = (e) => {
    e?.stopPropagation();
    resetZoom();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

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

  const downloadImage = (url) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `Karakalpak-Voice-Media.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="relative w-full h-[350px] md:h-[450px] group overflow-hidden rounded-3xl cursor-zoom-in" onClick={() => setIsLightboxOpen(true)}>
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        {images.length > 1 && (
          <>
            <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-amber-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all">
              <ChevronLeft size={24} />
            </button>
            <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-amber-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all">
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>

      {isLightboxOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/95 flex flex-col items-center justify-center select-none">
          <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between bg-black/40 backdrop-blur-md z-[100]">
            <div className="flex items-center gap-2 md:gap-4">
              <button onClick={() => setIsLightboxOpen(false)} className="p-2 hover:bg-white/10 rounded-full text-white"><X size={28} /></button>
              <div className="h-6 w-[1px] bg-white/20 mx-2"></div>
              <button onClick={handleZoomIn} className="p-2 hover:bg-white/10 rounded-full text-white"><ZoomIn size={24} /></button>
              <button onClick={handleZoomOut} className="p-2 hover:bg-white/10 rounded-full text-white"><ZoomOut size={24} /></button>
              <button onClick={resetZoom} className="p-2 hover:bg-white/10 rounded-full text-white"><RotateCcw size={24} /></button>
            </div>
            <button onClick={() => downloadImage(images[currentIndex])} className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 rounded-lg text-white font-bold transition-all">
              <Download size={20} /> <span className="hidden md:inline">Download</span>
            </button>
          </div>
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden" onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
            <img
              src={images[currentIndex]}
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                transition: isDragging ? 'none' : 'transform 0.3s ease-out',
                cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
              }}
              className="max-w-[95%] max-h-[85%] object-contain shadow-2xl pointer-events-auto"
              draggable="false"
            />
            {images.length > 1 && scale === 1 && (
              <>
                <button onClick={prevSlide} className="absolute left-4 md:left-8 p-4 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all"><ChevronLeft size={48} /></button>
                <button onClick={nextSlide} className="absolute right-4 md:right-8 p-4 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all"><ChevronRight size={48} /></button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default function Qaraqalpaqstan() {
  const { i18n } = useTranslation();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const getLanguageKey = () => {
    if (!i18n || !i18n.language) return 'RU';
    const lang = i18n.language.toLowerCase();
    if (lang.startsWith('kk') || lang.startsWith('kaa') || lang === 'uz') return 'KK';
    if (lang.startsWith('en')) return 'EN';
    if (lang.startsWith('pl')) return 'PL';
    return 'RU';
  };

  const currentLang = getLanguageKey();

  const content = {
    RU: {
      backText: "Вернуться назад",
      hero: { title: "КАРАКАЛПАКСТАН", subtitle: "Тысячелетняя цивилизация и Государственный Суверенитет", intro: "Правдивое слово о прошлом, настоящем и будущем каракалпакского народа." },
      sections: [
        { title: "1. Исторические корни: Древние хозяева Турана", text: "Каракалпакский народ — один из этносов Центральной Азии, обладающий самым богатым историческим наследием. Мы — не просто совокупность родов и племён, мы — прямые наследники Аральского моря, дельты Амударьи и древней Хорезмской цивилизации. Наша генетическая память, шежире и духовные ценности — ясное доказательство того, что мы являемся автохтонным (коренным) народом этой земли.", images: [aq1, aq2, aq3, aq4, aq5, aq6, aq7, aq8, aq9, aq10, aq11], icon: Clock },
        { title: "2. XX век: Возрождение государственности", text: "Выход каракалпакской государственности на новую историческую сцену — великое событие:\n\n1924 год: благодаря мужеству Аллаяра Досназарова Каракалпакская область получила статус Автономной Области. Это было признанием нашего народа как политического субъекта.\n\n1932 год: статус был повышен, и Каракалпакстан стал Автономной Советской Социалистической Республикой (ККАССР).\n\n1936 год: по решению Центра (Москвы) Каракалпакстан был включён в состав Узбекской ССР. Однако республика сохранила свои границы, символы и государственную целостность.", images: [nk1, nk2, nk3, nk4, nk5, nk6], icon: Shield },
        { title: "3. 1990 год: Декларация о Суверенитете", text: "Самая великая дата в новой истории Каракалпакстана — 14 декабря 1990 года. Под руководством выдающегося государственного деятеля Давлетбая Шамшетова Верховный Совет принял «Декларацию о Государственном Суверенитете». Этим документом:\n\n— Каракалпакстан провозгласил право самостоятельно определять свою судьбу;\n— политическая и экономическая свобода народа была укреплена;\n— был заложен фундамент для создания современной Конституции, Флага, Герба и Гимна.\n\nСегодня Каракалпакстан — Суверенная Республика, соответствующая нормам международного права и сохранившая свои государственные традиции.", images: [fl1, fl2], icon: Flag },
        { title: "4. Миссия «Karakalpak Voice»: Трибуна Правды", text: "В глобальном информационном пространстве мы противостоим ложным представлениям о нашей стране. Наша цель ясна:\n\n Точность: опираемся только на архивные документы и исторические факты.\n\n Дипломатия: представляем Каракалпакстан миру как открытое, миролюбивое государство, уважающее свой правовой статус.\n\n Цифровое Наследие: сохраняем национальный код, язык и культуру для будущих поколений.\n\nОткройте Каракалпакстан заново вместе с нами!", images: [rad1], icon: Mic }
      ]
    },
    KK: {
      backText: "Изге қайтыў",
      hero: { title: "ҚАРАҚАЛПАҚСТАН", subtitle: "Мың жыллық цивилизация ҳәм Мәмлекетлик Суверенитет", intro: "Қарақалпақ халқының өтмиши, бүгини ҳәм келешеги ҳаққында ҳақыйқый сөз." },
      sections: [
        { title: "1. Тарийхый тамырлар: Туўранның әййемги ийелери", text: "Қарақалпақ халқы — Орайлық Азияның ең бай тарийхқа ийе этносларының бири. Биз тек ғана руў-тайпалардың жыйындысы емеспиз, биз — Арал теңизи, Әмиўдәрья дельтасы ҳәм әййемги Хорезм цивилизациясының тиккелей мийрасхорларымыз. Бизиң генетикалық ядымыз, шежиремиз ҳәм руўхый қәдириятларымыз — бул топырақтың автохтон (жергиликли) халқы екенлигимиздиң айқын дәлийли.", images: [aq1, aq2, aq3, aq4, aq5, aq6, aq7, aq8, aq9, aq10, aq11], icon: Clock },
        { title: "2. ХХ әсир: Мәмлекетшиликтиң қайта тиклениўи", text: "Жаңа дәўирде қарақалпақ мәмлекетшилигиниң қайтадан сахнаға шығыўы — уллы тарийхый ўақыя:\n\n1924-жыл: Аллаяр Досназаровтың ерлиги менен Қарақалпақ аймағы Автоном Облыс статусын алды. Бул — миллетимиздиң сиясий субъект сыпатында тән алыныўы еди.\n\n1932-жыл: Статус көтерилип, Қарақалпақстан Автоном Совет Социалиситлик Республикасына (ҚҚАССР) айланды.\n\n1936-жыл: Орайдың (Москва) шешими менен Қарақалпақстан Өзбекстан ССР қурамына киргизилди. Бирақ, республика өзиниң шегарасын, нышанларын ҳәм мәмлекетлик пүтинлигин сақлап қалды.", images: [nk1, nk2, nk3, nk4, nk5, nk6], icon: Shield },
        { title: "3. 1990-жыл: Суверенитет Декларациясы", text: "Қарақалпақстанның жаңа тарийхындағы ең уллы сәне — 1990-жыл 14-декабрь. Белгили мәмлекет ғайраткери Дәўлетбай Шәмшетов басшылығында Жоқарғы Кеңес «Мәмлекетлик Суверенитет ҳаққындағы Декларацияны» қабыл етти. Бул ҳүжжет арқалы:\n\n— Қарақалпақстан өз тәғдирин өзи белгилеў ҳуқықын жәриялады;\n\n— Халықтың сиясий-экономикалық еркинлиги беккемленди;\n\n— Бүгинги Конституция, Байрақ, Герб ҳәм Гимнниң жаратылыўына тийкар болды.\n\nБүгинги күни Қарақалпақстан — халықаралық ҳуқық нормаларына сай, өзиниң мәмлекетлик дәстүрлерин сақлаған Суверен Республика.", images: [fl1, fl2], icon: Flag },
        { title: "4. «Karakalpak Voice» Миссиясы: Ҳақыйқат минбери", text: "Глобал мағлыўмат майданында елимиз ҳаққындағы қәте түсиниклерге қарсы турамыз. Бизиң махсетимиз айқын:\n\n Анықлық: Тек ғана архив ҳүжжетлери менән тарийхый фактлерге сүйенемиз.\n\n Дипломатия: Қарақалпақстанды ашық, тынышлық сүйер ҳәм өз ҳуқықый статусын ҳүрмет ететуғын ел сыпатында дүньяға танытамыз.\n\n Санлы Мийрас: Миллий кодты, тилди ҳәм мәдениятты келешек әўладқа сақлап қаламыз.\n\nБиз бенен бирге Қарақалпақстанды жаңадан ашың!", images: [rad1], icon: Mic }
      ]
    },
    EN: {
      backText: "Go Back",
      hero: { title: "KARAKALPAKSTAN", subtitle: "A Millennium-Old Civilization and State Sovereignty", intro: "A truthful word about the past, present, and future." },
      sections: [
        { title: "1. Historical Roots", text: "The Karakalpak people are one of the ethnic groups of Central Asia with the richest historical heritage. We are not just a collection of clans and tribes; we are the direct heirs of the Aral Sea, the Amu Darya delta, and the ancient Khorezm civilization. Our genetic memory, genealogical heritage, and spiritual values are clear evidence that we are the autochthonous (indigenous) people of this land.", images: [aq1, aq2, aq3, aq4, aq5, aq6, aq7, aq8, aq9, aq10, aq11], icon: Clock },
        { title: "2. The 20th Century", text: "The re-emergence of Karakalpak statehood in the modern era is a great historical event:\n\n1924: Thanks to the courage of Allayar Dosnazarov, the Karakalpak region received the status of an Autonomous Region. This was the recognition of our nation as a political subject.\n\n1932: The status was elevated, and Karakalpakstan became the Karakalpak Autonomous Soviet Socialist Republic (KASSR).\n\n1936: By the decision of the Center (Moscow), Karakalpakstan was incorporated into the Uzbek SSR. However, the republic preserved its borders, symbols, and state integrity.", images: [nk1, nk2, nk3, nk4, nk5, nk6], icon: Shield },
        { title: "3. 1990: The Declaration", text: "The greatest date in the modern history of Karakalpakstan is December 14, 1990. Under the leadership of the prominent statesman Dauletbay Shamshetov, the Supreme Council adopted the “Declaration on State Sovereignty.” Through this document:\n\n— Karakalpakstan proclaimed the right to determine its own destiny;\n\n— the political and economic freedom of the people was strengthened;\n\n— the foundation was laid for the creation of today’s Constitution, Flag, Emblem, and Anthem.\n\nToday, Karakalpakstan is a Sovereign Republic that complies with international legal norms and preserves its state traditions.", images: [fl1, fl2], icon: Flag },
        { title: "4. Mission", text: "In the global information space, we stand against false perceptions about our country. Our goal is clear:\n\n Accuracy: We rely only on archival documents and historical facts.\n\n Diplomacy: We present Karakalpakstan to the world as an open, peace‑loving state that respects its legal status.\n\n Digital Heritage: We preserve the national code, language, and culture for future generations.\n\nDiscover Karakalpakstan anew with us!", images: [rad1], icon: Mic }
      ]
    },
  PL: {
      backText: "Wróć",
      hero: { title: "KARAKALPAKSTAN", subtitle: "A Millennium-Old Civilization and State Sovereignty", intro: "A truthful word about the past, present, and future." },
      sections: [
        { title: "1. Historyczne korzenie: Starożytni gospodarze Turanu", text: "Naród karakałpacki to jeden z etnosów Azji Centralnej o najbogatszym dziedzictwie historycznym. Nie jesteśmy jedynie zbiorem rodów i plemion — jesteśmy bezpośrednimi spadkobiercami Morza Aralskiego, delty Amu-darii oraz starożytnej cywilizacji Chorezmu. Nasza pamięć genetyczna, rodowody i duchowe wartości są jasnym dowodem na to, że jesteśmy autochtonicznym (rdzennym) narodem tej ziemi.", images: [aq1, aq2, aq3, aq4, aq5, aq6, aq7, aq8, aq9, aq10, aq11], icon: Clock },
        { title: "2. XX wiek: Odrodzenie państwowości", text: "Pojawienie się karakałpackiej państwowości na nowej historycznej scenie to wielkie wydarzenie:\n\n1924 rok: dzięki odwadze Allayara Dosnazarova region Karakałpaków otrzymał status Obwodu Autonomicznego. Było to uznanie naszego narodu jako podmiotu politycznego.\n\n1932 rok: status został podniesiony i Karakałpakstan stał się Karakałpacką Autonomiczną Socjalistyczną Republiką Radziecką (KAASRR).\n\n1936 rok: decyzją Centrum (Moskwy) Karakałpakstan został włączony w skład Uzbeckiej SRR. Jednak republika zachowała swoje granice, symbole i integralność państwową.", images: [nk1, nk2, nk3, nk4, nk5, nk6], icon: Shield },
        { title: "3. 1990 rok: Deklaracja Suwerenności", text: "Najważniejszą datą w nowej historii Karakałpakstanu jest 14 grudnia 1990 roku. Pod przewodnictwem wybitnego działacza państwowego Dauletbaya Shamshetova Rada Najwyższa przyjęła „Deklarację o Suwerenności Państwowej”. Tym dokumentem:\n\n— Karakałpakstan ogłosił prawo do samodzielnego określania własnego losu;\n\n— umocniono polityczną i ekonomiczną wolność narodu;\n\n— położono fundament pod stworzenie współczesnej Konstytucji, Flagi, Herbu i Hymnu.\n\nDziś Karakałpakstan jest Suwerenną Republiką, zgodną z normami prawa międzynarodowego i zachowującą swoje tradycje państwowe.", images: [fl1, fl2], icon: Flag },
        { title: "4. Misja „Karakalpak Voice”: Trybuna Prawdy", text: "W globalnej przestrzeni informacyjnej przeciwstawiamy się fałszywym wyobrażeniom o naszym kraju. Nasz cel jest jasny:\n\n Dokładność: opieramy się wyłącznie na dokumentach archiwalnych i faktach historycznych.\n\n Dyplomacja: przedstawiamy Karakałpakstan światu jako państwo otwarte, miłujące pokój i szanujące swój status prawny.\n\n Cyfrowe Dziedzictwo: zachowujemy narodowy kod, język i kulturę dla przyszłych pokoleń.\n\nOdkryj Karakałpakstan na nowo razem z nami!", images: [rad1], icon: Mic }
      ]
    }
  };

  const t = content[currentLang] || content.RU;

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] text-gray-900 dark:text-white font-sans overflow-x-hidden transition-colors duration-300">
      
      {/* 1. HERO HEADER */}
      <div className="relative h-[85vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-black/60 z-10"></div>
            <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-90">
              <source src={heroVideo} type="video/mp4" />
            </video>
        </div>

        <div className="relative z-20 w-full max-w-7xl mx-auto space-y-6 animate-fade-in-up px-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 backdrop-blur-md">
              <Star size={16} className="text-amber-400 fill-amber-400 animate-pulse" />
              <span className="text-xs md:text-sm font-bold text-amber-300 uppercase tracking-widest">Official Portal</span>
            </div>
            
            <h1 className="font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-500 to-amber-700 leading-none w-full text-center"
                style={{ fontSize: 'clamp(1.2rem, 7.5vw, 7rem)' }}>
              {t.hero.title}
            </h1>
            
            <p className="text-lg md:text-2xl lg:text-3xl font-light text-gray-200 border-b-2 border-amber-500/50 pb-6 inline-block max-w-4xl mx-auto">
              {t.hero.subtitle}
            </p>
            
            <p className="text-gray-400 text-sm md:text-lg italic max-w-2xl mx-auto px-4">
              "{t.hero.intro}"
            </p>
        </div>
      </div>

      {/* 2. SECTIONS */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-20 md:pb-32 space-y-24">
        {t.sections.map((section, index) => (
          <div key={index} className={`flex flex-col md:flex-row items-center gap-8 md:gap-20 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'} group`}>
            <div className="w-full md:w-1/2">
              <Slideshow images={section.images} />
            </div>
            <div className="w-full md:w-1/2 space-y-4 md:space-y-6">
              <h2 className="text-2xl md:text-4xl font-bold text-amber-600 dark:text-amber-100 border-l-4 border-amber-500 pl-4 md:pl-6 leading-tight group-hover:text-amber-500 transition-colors">
                {section.title}
              </h2>
              <div className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-light whitespace-pre-line pl-4 md:pl-6">
                {section.text}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. BACK BUTTON ONLY (Socials removed as they are in global Footer) */}
      <div className="pb-24 px-4">
        <div className="text-center pt-8">
          <Link to="/" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 hover:border-amber-500 hover:text-amber-600 dark:hover:text-amber-400 transition-all">
            <ArrowLeft size={20} /> <span className="font-bold">{t.backText}</span>
          </Link>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fadeInUp 1s ease-out forwards; }
      `}} />
    </div>
  );
}