import React, { useState, useEffect, useRef } from "react";
import fonlogoGold from '../assets/fonlogo_gold.png';
import { Link, useNavigationType } from "react-router-dom";
import {
  Award, Landmark, BookOpen, Flag, Music, Users, ArrowRight,
  MapPin, ShieldCheck, Sparkles, Globe2, Shield, Heart, FileText, Clock,
  X, ZoomIn, ZoomOut, RotateCcw, Download
} from "lucide-react";

// --- КОМПОНЕНТТЕР ---
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageControls from '../components/PageControls';
import Newsletter from '../components/Newsletter';

// --- СИМВОЛИКА СҮРЕТТЕРІ ---
import sovereigntyImg from '../assets/symbols/sovereignty.jpg';
import declarationImg from '../assets/symbols/declaration.jpg';
import constitutionImg from '../assets/symbols/constitution.jpg';
import flagImg from '../assets/symbols/flag.jpg';
import emblemImg from '../assets/symbols/emblem.jpg';
import anthemImg from '../assets/symbols/anthem.jpg';

// --- VALUES DATA ---
import { valuesData } from '../data/valuesData';

// --- MD ФАЙЛДЫ ОҚИТЫН ФУНКЦИЯ ---
const parseFrontMatter = (text) => {
  if (!text) return { title: "No Title", date: "2025-01-01" };
  const match = text.match(/^---\s*([\s\S]*?)\s*---/);
  const data = {};
  if (match) {
    match[1].split('\n').forEach(line => {
      const parts = line.split(':');
      if (parts.length >= 2) {
        const key = parts[0].trim();
        let value = parts.slice(1).join(':').trim();
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        data[key] = value;
      }
    });
  }
  return data;
};

export default function Home() {
  const [lang, setLang] = useState("RU");
  const [latestNews, setLatestNews] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);
  
  // VALUES & TEAM MODAL STATE
  const [selectedValue, setSelectedValue] = useState(null);
  const [showModalScroll, setShowModalScroll] = useState(false);
  const modalRef = useRef(null);

  // IMAGE ZOOM STATE (INSIDE MODAL)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const navType = useNavigationType();

  useEffect(() => {
    if (navType !== "POP") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [navType]);

  useEffect(() => {
    const handleLangChange = (e) => {
      if (e.detail?.lang) {
        setLang(e.detail.lang.toUpperCase());
      }
    };
    window.addEventListener("languageChange", handleLangChange);
    return () => window.removeEventListener("languageChange", handleLangChange);
  }, []);

  useEffect(() => {
    loadLatestNews();
  }, []);

  // --- "АҚЫЛДЫ ПРИНТЕР" ФУНКЦИЯСЫ (Қосалқы, бірақ ShareSection өшірілгендіктен, бұл жерде тікелей шақырылмайды, код сақталды) ---
  const handlePrint = () => {
    if (!selectedValue) return;

    const title = selectedValue.title[lang];
    const content = selectedValue.fullContent[lang];
    const image = selectedValue.image;

    const printWindow = window.open('', '', 'width=900,height=1200');
    
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${title} - Karakalpak Voice</title>
            <style>
              body { font-family: 'Times New Roman', serif; padding: 40px; color: #000; line-height: 1.6; max-width: 800px; margin: 0 auto; }
              h1 { font-size: 28px; text-align: center; margin-bottom: 20px; font-weight: bold; border-bottom: 2px solid #333; padding-bottom: 15px; }
              .image-container { text-align: center; margin-bottom: 30px; }
              img { max-width: 100%; height: auto; max-height: 400px; border-radius: 8px; object-fit: contain; border: 1px solid #ddd; }
              .content { font-size: 16px; text-align: justify; white-space: pre-line; }
              .footer { margin-top: 50px; border-top: 1px solid #ccc; padding-top: 10px; font-size: 12px; text-align: center; color: #555; }
              @media print {
                body { padding: 0; }
                button { display: none; }
              }
            </style>
          </head>
          <body>
            <h1>${title}</h1>
            <div class="image-container">
              <img src="${image}" alt="${title}" />
            </div>
            <div class="content">${content}</div>
            <div class="footer">
              <p>© 2026 Karakalpak-Voice Media Foundation. Warsaw, Poland.</p>
              <p>www.karakalpakvoice.org</p>
            </div>
            <script>
              window.onload = function() {
                window.print();
                setTimeout(function() { window.close(); }, 500);
              }
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    } else {
      alert("Поп-ап айнасы блокланған. Принтерди ашыў ушын рухсат бериң..");
    }
  };

  async function loadLatestNews() {
    try {
      const modules = import.meta.glob('/src/content/news/**/*.md', { 
        query: '?raw',
        import: 'default'
      });

      if (Object.keys(modules).length === 0) {
        setNewsLoading(false);
        return;
      }

      const articlePromises = Object.entries(modules).map(async ([path, loader]) => {
        try {
          const content = await loader();
          const data = parseFrontMatter(content);
          const filename = path.split('/').pop().replace('.md', '');
          const parts = path.split('/');
          const folderName = parts[parts.length - 2];
          let year = '2025';
          if (data.date) {
             year = data.date.split('-')[0];
          } else if (/^\d{4}$/.test(folderName)) {
             year = folderName;
          }
          return {
            id: `${year}-${filename}`,
            year,
            slug: filename,
            date: data.date || '',
            image: data.image || null,
            title: {
              kaa: data.title_kk || data.title || 'Атаў жоқ',
              ru: data.title_ru || data.title || 'Без названия',
              en: data.title_en || data.title || 'No title',
              pl: data.title_pl || data.title || 'Bez tytułu'
            },
            excerpt: {
              kaa: data.excerpt || '',
              ru: data.excerpt_ru || data.excerpt || '',
              en: data.excerpt_en || data.excerpt || '',
              pl: data.excerpt_pl || data.excerpt || ''
            }
          };
        } catch (err) {
          console.error(err);
          return null;
        }
      });

      const allArticles = (await Promise.all(articlePromises))
        .filter(Boolean)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3);

      setLatestNews(allArticles);
    } catch (error) {
      console.error('Жаңалықлар қәтеси:', error);
      setLatestNews([]);
    } finally {
      setNewsLoading(false);
    }
  }

  // --- MODAL HANDLERS ---
  const openValueModal = (valueItem) => {
    setSelectedValue(valueItem);
    document.body.style.overflow = 'hidden'; 
  };

  const closeValueModal = () => {
    setSelectedValue(null);
    document.body.style.overflow = 'auto';
  };

  const handleModalScroll = (e) => {
    if (e.target.scrollTop > 300) setShowModalScroll(true);
    else setShowModalScroll(false);
  };

  const scrollModalToTop = () => {
    if (modalRef.current) {
      modalRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // --- ZOOM HANDLERS ---
  const resetZoom = () => { setScale(1); setPosition({ x: 0, y: 0 }); };
  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.5, 4));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.5, 1));
  const handleMouseDown = (e) => { if (scale > 1) { setIsDragging(true); setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y }); } };
  const handleMouseMove = (e) => { if (isDragging && scale > 1) { setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y }); } };
  const handleMouseUp = () => setIsDragging(false);
  
  const downloadImage = (url) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `Karakalpak-Voice-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const translations = {
    KK: {
      readMore: "Толық оқыў",
      back: "Артқа қайтыў",
      download: "Жүклеп алыў",
      print: "Басып шығарыў",
      meet: "Танысыў",
      hero: { 
        badge: "Дүнья бизди еситеди",
        title: "Қарақалпақстан даўысы",
        subtitle: "Миллий медиа платформасы",
        desc: "Халқымыздың ҳуқықы, тарийхы ҳәм келешеги ушын. Өз тилимизде, өз даўысымыз бенен, дүнья алдында.",
        cta: "Платформаны иззертлеў",
        ctaSecondary: "Жаңалықлар",
        portalDesc: "Әййемги цивилизация ҳәм Мәмлекетлик Суверенитет тутасқан мәнзил. Туўранның муқаддес топырағындағы Қарақалпақ халқының бай тарийхын, еркин руўхын ҳәм айдын келешегин биз бенен бирге ашың."
      },
      manifesto: {
        title: "МАНИФЕСТ",
        subtitle: "Хақыйқаттың Жаңа Мәнзили",
        desc: "Бүгин — Қарақалпақстан тарийхында жаңа бет ашылып атыр. Бул платформа — тек жаңалықлар сайты емес, бул пүткил дүньяға тараған Қарақалпақ халқының басын бириктиретуғын еркин минбер.",
        button: "Толық оқыў"
      },
      news: { 
        title: "Соңғы жаңалықлар", 
        viewAll: "Барлығы →", 
        loading: "Жүкленип атыр", 
        empty: "Жақында жаңалықлар",
        readMore: "Оқыў"
      },
      sections: [
        { title: "Суверенитет", desc: "Мәмлекетлик ғәрезсизлик", path: "/sovereignty", icon: ShieldCheck },
        { title: "Декларация", desc: "Суверенитет ҳаққында", path: "/declaration", icon: Landmark },
        { title: "Конституция", desc: "Тийкарғы нызам", path: "/constitution", icon: BookOpen },
        { title: "Байрақ", desc: "Мәмлекетлик байрақ", path: "/flag", icon: Flag },
        { title: "Герб", desc: "Мәмлекетлик герб", path: "/emblem", icon: Award },
        { title: "Гимн", desc: "Мәмлекетлик гимн", path: "/anthem", icon: Music }
      ],
      values: { title: "Биз не ушын гүресемиз" },
      team: { 
        title: "Команда ҳаққында", 
        desc: "Биз - халықтың өз күши. Дүнья сахнасында Қарақалпақстан даўысын беремиз.",
        link: "Танысыў" 
      },
      footer: { 
        slogan: "Қарақалпақстан дүньяда бар. Қарақалпақстан мәңги бар болады."
      }
    },
    RU: {
      readMore: "Читать полностью",
      back: "Вернуться назад",
      download: "Скачать изображение",
      print: "Распечатать",
      meet: "Познакомиться",
      hero: { 
        badge: "Мир услышит нас",
        title: "Голос Каракалпакстана",
        subtitle: "Национальная медиа-платформа",
        desc: "За права, историю и будущее нашего народа. На нашем языке, нашим голосом, перед лицом мира.",
        cta: "Исследовать платформу",
        ctaSecondary: "Новости",
        portalDesc: "Место, где древняя цивилизация встречается с Государственным Суверенитетом. Откройте для себя истинный дух, богатую историю и светлое будущее каракалпакского народа на священной земле Турана."
      },
      manifesto: {
        title: "МАНИФЕСТ",
        subtitle: "Новый Адрес Истины",
        desc: "Сегодня открывается новая страница в истории Каракалпакстана. Эта платформа — не просто новостной сайт, это свободная трибуна, объединяющая каракалпакский народ по всему миру.",
        button: "Читать полностью"
      },
      news: { 
        title: "Последние новости", 
        viewAll: "Все →", 
        loading: "Загрузка", 
        empty: "Скоро новости",
        readMore: "Читать"
      },
      sections: [
        { title: "Суверенитет", desc: "Государственная независимость", path: "/sovereignty", icon: ShieldCheck },
        { title: "Декларация", desc: "О суверенитете", path: "/declaration", icon: Landmark },
        { title: "Конституция", desc: "Основной закон", path: "/constitution", icon: BookOpen },
        { title: "Флаг", desc: "Государственный флаг", path: "/flag", icon: Flag },
        { title: "Герб", desc: "Государственный герб", path: "/emblem", icon: Award },
        { title: "Гимн", desc: "Государственный гимн", path: "/anthem", icon: Music }
      ],
      values: { title: "За что мы боремся" },
      team: { 
        title: "О команде", 
        desc: "Мы — сила народа. Несем голос Каракалпакстана на мировую арену.",
        link: "Познакомиться" 
      },
      footer: { 
        slogan: "Каракалпакстан есть в мире. Каракалпакстан будет всегда."
      }
    },
    EN: {
      readMore: "Read More",
      back: "Go Back",
      download: "Download Image",
      print: "Print",
      meet: "Meet Us",
      hero: { 
        badge: "The world will hear us",
        title: "Voice of Karakalpakstan",
        subtitle: "National Media Platform",
        desc: "For the rights, history and future of our people. In our language, with our voice, before the world.",
        cta: "Explore Platform",
        ctaSecondary: "News",
        portalDesc: "A destination where ancient civilization meets State Sovereignty. Discover the true spirit, rich history, and bright future of the Karakalpak people on the sacred land of Turan."
      },
      manifesto: {
        title: "MANIFESTO",
        subtitle: "The New Home of Truth",
        desc: "Today marks a new chapter in the history of Karakalpakstan. This platform is not just a news site; it is a free tribune uniting the Karakalpak people worldwide.",
        button: "Read Full"
      },
      news: { 
        title: "Latest News", 
        viewAll: "All →", 
        loading: "Loading", 
        empty: "News coming soon",
        readMore: "Read"
      },
      sections: [
        { title: "Sovereignty", desc: "State independence", path: "/sovereignty", icon: ShieldCheck },
        { title: "Declaration", desc: "On sovereignty", path: "/declaration", icon: Landmark },
        { title: "Constitution", desc: "Fundamental law", path: "/constitution", icon: BookOpen },
        { title: "Flag", desc: "State flag", path: "/flag", icon: Flag },
        { title: "Emblem", desc: "State emblem", path: "/emblem", icon: Award },
        { title: "Anthem", desc: "National anthem", path: "/anthem", icon: Music }
      ],
      values: { title: "What we stand for" },
      team: { 
        title: "About the Team", 
        desc: "We are the power of the people. Bringing Karakalpak voice to the world stage.",
        link: "Meet Us" 
      },
      footer: { 
        slogan: "Karakalpakstan exists in the world. Karakalpakstan will exist forever."
      }
    },
    PL: {
      readMore: "Czytaj więcej",
      back: "Wróć",
      download: "Pobierz obraz",
      print: "Drukuj",
      meet: "Poznaj nas",
      hero: { 
        badge: "Świat nas usłyszy",
        title: "Głos Karakałpacji",
        subtitle: "Narodowa Platforma Medialna",
        desc: "Za prawa, historię i przyszłość naszego narodu. W naszym języku, naszym głosem, przed światem.",
        cta: "Eksploruj Platformę",
        ctaSecondary: "Wiadomości",
        portalDesc: "Miejsce, gdzie starożytna cywilizacja spotyka się z Suwerennością Państwową. Odkryj prawdziwego ducha, bogatą historię i świetlaną przyszłość narodu karakałpackiego na świętej ziemi Turanu."
      },
      manifesto: {
        title: "MANIFEST",
        subtitle: "Nowy Adres Prawdy",
        desc: "Dziś otwiera się nowa strona w historii Karakałpakstanu. Ta platforma to nie tylko serwis informacyjny, to wolna trybuna jednocząca naród karakałpacki na całym świecie.",
        button: "Czytaj całość"
      },
      news: { 
        title: "Najnowsze wiadomości", 
        viewAll: "Wszystkie →", 
        loading: "Ładowanie", 
        empty: "Wkrótce wiadomości",
        readMore: "Czytaj"
      },
      sections: [
        { title: "Suwerenność", desc: "Niepodległość państwowa", path: "/sovereignty", icon: ShieldCheck },
        { title: "Deklaracja", desc: "O suwerenności", path: "/declaration", icon: Landmark },
        { title: "Konstytucja", desc: "Prawo podstawowe", path: "/constitution", icon: BookOpen },
        { title: "Flaga", desc: "Flaga państwowa", path: "/flag", icon: Flag },
        { title: "Herb", desc: "Herb państwowy", path: "/emblem", icon: Award },
        { title: "Hymn", desc: "Hymn państwowy", path: "/anthem", icon: Music }
      ],
      values: { title: "Za co walczymy" },
      team: { 
        title: "O zespole", 
        desc: "Jesteśmy siłą ludu. Niesiemy głos Karakałpaków na światową arenę.",
        link: "Poznaj nas" 
      },
      footer: { 
        slogan: "Karakałpakstan istnieje na świecie. Karakałpakstan będzie istnieć zawsze."
      }
    }
  };

  const t = translations[lang] || translations.RU;
  const currentLangKey = lang === 'KK' ? 'kaa' : lang.toLowerCase();

  const sectionImages = [ sovereigntyImg, declarationImg, constitutionImg, flagImg, emblemImg, anthemImg ];

  const getIconByName = (iconName) => {
    const icons = { Shield, Globe2, Heart, Users };
    return icons[iconName] || Shield;
  };

  const teamData = valuesData.find(item => item.id === 'team');
  const onlyValues = valuesData.filter(item => item.id !== 'team');

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white font-sans overflow-hidden transition-colors duration-300">
      
      {/* Global Background (Gradient) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-black dark:via-blue-950/20 dark:to-purple-950/20 transition-colors duration-500"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-[120px] animate-pulse transition-colors duration-500"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/20 dark:bg-purple-500/10 rounded-full blur-[120px] animate-pulse transition-colors duration-500" style={{animationDelay: '1s'}}></div>
      </div>

      <Navbar />

      {/* --- 1. HERO SECTION --- */}
      <section className="relative flex flex-col items-center justify-center px-4 pt-24 pb-8 md:min-h-screen md:pt-40 md:pb-32 z-10">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-[0.4] dark:opacity-[0.2]">
           <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>

        <div className="max-w-7xl w-full relative z-10">
          <div className="flex flex-col items-center mb-10 animate-fade-in group">
            <Link 
              to="/karakalpakstan" 
              className="text-center relative transition-transform duration-500 hover:scale-105"
            >
              <div className="absolute inset-0 bg-amber-500/10 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              
              <h1 className="text-[11vw] sm:text-[9vw] md:text-[8.5vw] lg:text-[8.2vw] font-black tracking-tighter leading-none mb-2 px-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-amber-200 via-amber-500 to-amber-800 drop-shadow-[0_5px_15px_rgba(0,0,0,0.9)] transition-all duration-500 group-hover:drop-shadow-[0_0_40px_rgba(251,191,36,0.6)]">
                  KARAKALPAKSTAN
                </span>
              </h1>
              
              <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-transparent via-amber-500 to-transparent transition-all duration-700 mx-auto shadow-[0_0_15px_#f59e0b]"></div>
              
              <p className="mt-6 max-w-4xl mx-auto text-amber-500/80 font-medium text-lg md:text-xl leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-2">
                {t.hero.portalDesc}
              </p>
            </Link>

            <div className="flex justify-center mb-20 mt-12">
              <img 
                src={fonlogoGold} 
                alt="Karakalpak Voice Premium Logo" 
                loading="eager"
                width="384"
                height="384"
                className="h-52 md:h-80 lg:h-96 w-auto object-contain drop-shadow-[0_0_45px_rgba(218,165,32,0.9)] hover:scale-105 transition-transform duration-500" 
              />
            </div>

            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-light transition-colors duration-300 text-center">
              {t.hero.desc}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
              <Link 
                to="/about"
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white rounded-full font-semibold overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-blue-500/50 dark:hover:shadow-blue-400/50 transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t.hero.cta}
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-500 dark:to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              
              <Link 
                to="/news"
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white rounded-full font-semibold overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-blue-500/50 dark:hover:shadow-blue-400/50 transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t.hero.ctaSecondary}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-500 dark:to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- MANIFESTO SECTION --- */}
      <section className="relative py-8 md:py-24 px-4 z-10 bg-white/80 dark:bg-black/80 backdrop-blur-sm border-t border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 md:order-1 space-y-8 animate-fade-in">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest text-sm">
                <FileText size={16} />
                <span>{t.hero.subtitle}</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-purple-900 dark:from-white dark:to-gray-400">
                {t.manifesto.title}
              </h2>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                {t.manifesto.subtitle}
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed border-l-4 border-blue-500 pl-6">
                {t.manifesto.desc}
              </p>
              
              <div className="pt-4">
                <Link 
                  to="/manifesto"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-bold shadow-lg hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300 group"
                >
                  {t.manifesto.button}
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="order-1 md:order-2 relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2rem] opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-500"></div>
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-white/20 dark:border-white/10 aspect-[4/3]">
                <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                <img 
                  src="/images/manifesto.png" 
                  alt="Manifesto" 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 2. VALUES SECTION --- */}
      <section className="relative flex flex-col justify-center py-8 px-4 md:min-h-screen md:py-32 md:px-6 z-10">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-[0.4] dark:opacity-[0.2]">
           <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          {/* ТҮЗЕТІЛДІ: Ақ экранда қара түс (text-black), қараңғыда ақ түс (dark:text-white) */}
          <h2 className="text-4xl md:text-6xl font-black text-center mb-12 md:mb-20 tracking-tight text-black dark:text-white">
            {t.values.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {onlyValues.map((item) => {
              const Icon = getIconByName(item.iconKey);
              return (
                <div 
                  key={item.id} 
                  onClick={() => openValueModal(item)}
                  className="group relative h-[450px] rounded-3xl overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 dark:hover:shadow-blue-900/20 transition-all duration-500 border border-gray-200 dark:border-white/10"
                >
                  <img 
                    src={item.image} 
                    alt={item.title[lang]} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30 group-hover:via-black/50 transition-colors duration-500"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-10">
                    <div className="mb-6 p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-300">
                      <Icon size={40} />
                    </div>
                    <h3 className="text-3xl font-black text-white mb-4 drop-shadow-lg">
                      {item.title[lang]}
                    </h3>
                    <p className="text-gray-200 text-lg mb-8 font-medium">
                      {item.shortDesc[lang]}
                    </p>
                    <button className="px-6 py-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-white font-bold hover:bg-white hover:text-black transition-all">
                      {t.readMore}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- VALUES & TEAM MODAL --- */}
      {selectedValue && (
        <div 
          ref={modalRef}
          onScroll={handleModalScroll}
          className="fixed inset-0 z-[100] bg-white dark:bg-[#050505] overflow-y-auto animate-fade-in flex flex-col"
        >
          <div className="sticky top-0 z-[110] bg-white/90 dark:bg-[#050505]/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
             <Navbar />
          </div>

          <PageControls 
            onClose={closeValueModal}
            onBack={closeValueModal}
            textBack={t.back}
            showScrollBtn={showModalScroll}
            onScrollTop={scrollModalToTop}
          />

          <div className="flex-grow w-full mx-auto pb-0 pt-0 mt-0">
            <div 
              className="relative h-[50vh] w-full cursor-zoom-in group"
              onClick={() => setIsLightboxOpen(true)}
            >
              <img 
                src={selectedValue.image} 
                alt={selectedValue.title[lang]} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 md:p-16 w-full max-w-7xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-black text-white mb-2 drop-shadow-lg">
                  {selectedValue.title[lang]}
                </h2>
                <p className="text-xl text-gray-200">{selectedValue.shortDesc[lang]}</p>
              </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 md:px-16 mt-12 pb-20">
              {/* ТҮЗЕТІЛДІ: Модаль ішіндегі мәтін ақ экранда қара, қараңғыда ақ болады */}
              <div className="prose dark:prose-invert max-w-none text-lg leading-relaxed whitespace-pre-line text-black dark:text-white break-words">
                {selectedValue.fullContent[lang]}
              </div>
              
              {/* ShareSection ӨШІРІЛДІ, орны бос. Newsletter орында */}
              <div className="mt-12">
                <Newsletter />
              </div>
            </div>

            <div className="w-full">
              <Footer />
            </div>
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
                <button onClick={() => downloadImage(selectedValue.image)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-bold transition-all">
                  <Download size={20} /> <span className="hidden md:inline">{t.download}</span>
                </button>
              </div>
              <div className="relative w-full h-full flex items-center justify-center overflow-hidden" onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
                <img src={selectedValue.image} alt="" style={{ transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`, transition: isDragging ? 'none' : 'transform 0.3s' }} className="max-w-[95%] max-h-[85%] object-contain shadow-2xl" draggable="false" />
              </div>
            </div>
          )}
        </div>
      )}

      {/* --- 3. NEWS SECTION --- */}
      <section className="relative flex flex-col justify-center py-8 px-4 md:min-h-screen md:py-32 md:px-6 z-10 bg-gray-50/50 dark:bg-white/[0.02] transition-colors duration-500">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-[0.4] dark:opacity-[0.2]">
           <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="flex items-center justify-between mb-12 md:mb-20">
            {/* ТҮЗЕТІЛДІ: Ақ экранда қара түс (text-black), қараңғыда ақ түс (dark:text-white) */}
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-black dark:text-white">{t.news.title}</h2>
            <Link 
              to="/news" 
              className="group flex items-center gap-2 px-6 py-2 rounded-full bg-blue-50 dark:bg-white/10 text-blue-600 dark:text-blue-400 font-bold hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 transition-all shadow-md"
            >
              {t.news.viewAll} <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          {newsLoading ? (
            <div className="text-center py-20">
              <div className="inline-block w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 dark:border-blue-400/20 dark:border-t-blue-400 rounded-full animate-spin"></div>
            </div>
          ) : latestNews.length === 0 ? (
            <div className="text-center py-20 text-gray-500 dark:text-gray-400">{t.news.empty}</div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {latestNews.map((article) => (
                <Link 
                  key={article.id} 
                  to={`/news/${article.year}/${article.slug}`}
                  className="group relative rounded-3xl border border-gray-200/50 dark:border-gray-800/50 bg-white dark:bg-white/[0.02] overflow-hidden hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-500 hover:scale-105 hover:shadow-2xl flex flex-col"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900">
                    <img 
                      src={article.image || "/logo2.png"} 
                      alt={article.title[currentLangKey]} 
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                      <Clock size={14} />
                      <time>{article.date}</time>
                    </div>
                    <h3 className="text-xl font-bold line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-3 text-black dark:text-white">
                      {article.title[currentLangKey] || article.title.kaa}
                    </h3>
                    {(article.excerpt[currentLangKey] || article.excerpt.kaa) && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 transition-colors duration-300 mb-6">
                        {article.excerpt[currentLangKey] || article.excerpt.kaa}
                      </p>
                    )}
                    
                    <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center text-blue-600 dark:text-blue-400 font-bold group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                       {t.news.readMore} <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* --- 4. SECTIONS GRID --- */}
      <section className="relative flex flex-col justify-center py-8 px-4 md:min-h-screen md:py-32 md:px-6 z-10">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-[0.4] dark:opacity-[0.2]">
           <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>

        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {t.sections.map((s, i) => {
            const Icon = s.icon;
            const bgImage = sectionImages[i]; 
            return (
              <Link 
                to={s.path} 
                key={i}
                className="group relative h-80 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 dark:hover:shadow-blue-900/20 transition-all duration-500 cursor-pointer"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${bgImage})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 group-hover:via-black/40 transition-colors duration-500"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-10">
                  <div className="mb-4 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-300">
                    <Icon size={32} />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-wider drop-shadow-lg group-hover:text-blue-300 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-gray-200 text-sm font-medium opacity-90 group-hover:opacity-100 transition-opacity">
                    {s.desc}
                  </p>
                  
                  <span className="mt-4 px-6 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white font-bold hover:bg-white hover:text-black transition-all flex items-center gap-2">
                     {t.readMore} <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* --- 5. TEAM CTA --- */}
      <section className="relative flex flex-col justify-center py-8 px-4 md:min-h-screen md:py-32 md:px-6 z-10">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-[0.4] dark:opacity-[0.2]">
           <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>

        <div className="max-w-5xl mx-auto w-full relative z-10">
          <div 
            onClick={() => teamData && openValueModal(teamData)}
            className="relative rounded-[3rem] overflow-hidden border border-gray-200/50 dark:border-gray-800/50 group hover:shadow-2xl transition-all duration-500 cursor-pointer"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url(${teamData?.image})` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-900/80 to-black/60 group-hover:from-blue-900/70 group-hover:via-purple-900/70 transition-colors duration-500"></div>
            <div className="relative z-10 p-16 md:p-24 text-center text-white space-y-8">
              <Users size={64} className="mx-auto opacity-90" />
              <h2 className="text-4xl md:text-5xl font-black">{t.team.title}</h2>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">{t.team.desc}</p>
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 dark:text-blue-500 rounded-full font-bold hover:scale-105 transition-transform shadow-xl">
                {t.meet} <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>
          
      <div className="flex justify-center mb-2 relative z-10">
        <svg viewBox="0 0 450 100" xmlns="http://www.w3.org/2000/svg" className="h-16 md:h-20 w-auto fill-current text-amber-500 dark:text-amber-400">
          <defs><style>{`@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');`}</style></defs>
          <text x="50%" y="60" textAnchor="middle" style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700, fontSize: "65px" }}>
            Karakalpak-Voice
          </text>
        </svg>
      </div>

      <div className="text-center relative z-10">
        <p className="text-xl md:text-2xl font-light text-gray-600 dark:text-gray-300 max-w-3xl mx-auto italic">
          "{t.footer.slogan}"
        </p>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes gradient { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        .animate-gradient { background-size: 200% 200%; animation: gradient 8s ease infinite; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 1s ease-out; }
      `}} />

      <div style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}>
        <h1>Karakalpakstan Karakalpak Nukus</h1>
        <h2>Қарақалпақстан Қарақалпақ Нөкис Жаңалықлар</h2>
        <p>
          Новости Каракалпакстан Каракалпак Нукус Суверенитет Конституция Декларация 
          Аралское море Лувр Музей Савицкий Корабли Пустыня 
          Declaration Aral Sea Louvre Savitsky Museum Ships Desert
        </p>
      </div>
    </div>
  );
}