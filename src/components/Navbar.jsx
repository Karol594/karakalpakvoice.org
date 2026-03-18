import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Globe, DollarSign, CloudRain, ChevronDown, Sun, Moon, ArrowLeft, Search, Loader2 } from 'lucide-react';
import { useTheme } from './useTheme';
import { useTranslation } from 'react-i18next';

// ==========================================
// 1. ПАРСЕР (Жаңалықлар ушын)
// ==========================================
const parseFrontmatter = (markdown) => {
  const match = markdown.match(/^---\s*([\s\S]*?)\s*---\s*$/m);
  if (!match) return { data: {}, content: markdown };
  
  const frontmatterRaw = match[1];
  const content = markdown.replace(/^---\s*[\s\S]*?---\s*/m, '').trim();

  const data = {};
  let currentKey = null;
  let currentValue = [];
  
  const lines = frontmatterRaw.split('\n');
  
  for (let line of lines) {
    const keyMatch = line.match(/^([a-z_]+):\s*(.*)$/);
    if (keyMatch) {
      if (currentKey) data[currentKey] = currentValue.join('\n').trim().replace(/^['"]|['"]$/g, '');
      currentKey = keyMatch[1];
      const val = keyMatch[2].trim();
      currentValue = val === '|' ? [] : [val.replace(/^['"]|['"]$/g, '')];
    } else if (currentKey) {
      currentValue.push(line);
    }
  }
  if (currentKey) data[currentKey] = currentValue.join('\n').trim().replace(/^['"]|['"]$/g, '');
  
  return { data, content };
};

// ==========================================
// ✅ 2. СТАТИКАЛЫҚ БЕТЛЕР БАЗАСЫ
// ==========================================
const staticPages = [
  { path: '/sovereignty', title_ru: 'Суверенитет', title_kk: 'Суверенитет', title_en: 'Sovereignty', title_pl: 'Suwerenność', date: '1990-12-14', keywords: 'СССР независимость декларация ғәрезсизлик independent declaration soviet union' },
  { path: '/history', title_ru: 'История', title_kk: 'Тарийх', title_en: 'History', title_pl: 'Historia', date: '2024-01-01', keywords: 'история тарих past heritage ancient khorezm' },
  { path: '/geography', title_ru: 'География', title_kk: 'География', title_en: 'Geography', title_pl: 'Geografia', date: '2024-01-01', keywords: 'карта жер nature aral sea' },
  { path: '/culture-art', title_ru: 'Культура и Искусство', title_kk: 'Мәденият ҳәм Искусство', title_en: 'Culture & Art', title_pl: 'Kultura i Sztuka', date: '2024-01-23', keywords: 'музей савицкий лувр painting art өнер' },
  { path: '/aral-sea', title_ru: 'Аральское море', title_kk: 'Арал теңизи', title_en: 'Aral Sea', title_pl: 'Morze Aralskie', date: '2024-01-25', keywords: 'экология море теңиз disaster catastrophe' },
  { path: '/museums', title_ru: 'Музеи', title_kk: 'Музейлер', title_en: 'Museums', title_pl: 'Muzea', date: '2024-01-25', keywords: 'музей тарийх экспонат exhibit history' },
  { path: '/constitution', title_ru: 'Конституция', title_kk: 'Конституция', title_en: 'Constitution', title_pl: 'Konstytucja', date: '1993-04-09', keywords: 'закон право rights law ҳуқық' },
  { path: '/declaration', title_ru: 'Декларация', title_kk: 'Декларация', title_en: 'Declaration', title_pl: 'Deklaracja', date: '1990-12-14', keywords: 'документ 1990 independence' },
  { path: '/flag', title_ru: 'Флаг', title_kk: 'Байрақ', title_en: 'Flag', title_pl: 'Flaga', date: '1992-12-14', keywords: 'символ цвета colors symbols' },
  { path: '/emblem', title_ru: 'Герб', title_kk: 'Герб', title_en: 'Emblem', title_pl: 'Emblem', date: '1993-04-09', keywords: 'символ symbols bird humo' },
  { path: '/anthem', title_ru: 'Гимн', title_kk: 'Гимн', title_en: 'Anthem', title_pl: 'Hymn', date: '1993-12-24', keywords: 'музыка song music ән' }
];

// ==========================================
// 3. МӘЗІР ДЕРЕКТЕРІ
// ==========================================
const menuStructure = {
  RU: [
    { name: 'Каракалпакстан', type: 'dropdown', items: [{ name: 'География', path: '/geography' }, { name: 'История', path: '/history' }, { name: 'Традиции', path: '/traditions' }, { name: 'Культура', path: '/culture-art' }, { name: 'Религия', path: '/religion' }, { name: 'Аральское море', path: '/aral-sea' }, { name: 'Музеи', path: '/museums' }, { name: 'Выдающиеся личности', path: '/famous-people' }, { name: 'Спорт', path: '/sports' }] },
    { name: 'Символика', type: 'dropdown', items: [{ name: 'Суверенитет', path: '/sovereignty' }, { name: 'Декларация', path: '/declaration' }, { name: 'Конституция', path: '/constitution' }, { name: 'Флаг', path: '/flag' }, { name: 'Герб', path: '/emblem' }, { name: 'Гимн', path: '/anthem' }] },
    { name: 'Проекты', type: 'dropdown', items: [{ name: 'Экология', path: '/ecology' }, { name: 'Образование', path: '/education' }, { name: 'Туризм', path: '/tourism' }, { name: 'Свободные Медиа', path: '/free-media' }, { name: 'Цифровое Наследие', path: '/digital-heritage' }] },
    { name: 'О нас', type: 'dropdown', items: [{ name: 'Миссия и Ценности', path: '/mission' }, { name: 'Наша Команда', path: '/team' }, { name: 'Редакционная Политика', path: '/policy' }, { name: 'Контакты', path: '/contacts' }] }
  ],
  KK: [
    { name: 'Қарақалпақстан', type: 'dropdown', items: [{ name: 'География', path: '/geography' }, { name: 'Тарийх', path: '/history' }, { name: 'Дәстүр', path: '/traditions' }, { name: 'Мәденият', path: '/culture-art' }, { name: 'Дин', path: '/religion' }, { name: 'Арал теңизи', path: '/aral-sea' }, { name: 'Музейлер', path: '/museums' }, { name: 'Ел перзентлери', path: '/famous-people' }, { name: 'Спорт', path: '/sports' }] },
    { name: 'Рәмизлер', type: 'dropdown', items: [{ name: 'Суверенитет', path: '/sovereignty' }, { name: 'Декларация', path: '/declaration' }, { name: 'Конституция', path: '/constitution' }, { name: 'Байрақ', path: '/flag' }, { name: 'Герб', path: '/emblem' }, { name: 'Гимн', path: '/anthem' }] },
    { name: 'Жойбарлар', type: 'dropdown', items: [{ name: 'Экология', path: '/ecology' }, { name: 'Билимлендириў', path: '/education' }, { name: 'Туризм', path: '/tourism' }, { name: 'Еркин Медиа', path: '/free-media' }, { name: 'Санлы Мийрас', path: '/digital-heritage' }] },
    { name: 'Биз ҳаққында', type: 'dropdown', items: [{ name: 'Миссия ҳәм Қәдириятлар', path: '/mission' }, { name: 'Бизиң Команда', path: '/team' }, { name: 'Редакциялық Сиясат', path: '/policy' }, { name: 'Байланыс', path: '/contacts' }] }
  ],
  EN: [
    { name: 'Karakalpakstan', type: 'dropdown', items: [{ name: 'Geography', path: '/geography' }, { name: 'History', path: '/history' }, { name: 'Traditions', path: '/traditions' }, { name: 'Culture', path: '/culture-art' }, { name: 'Religion', path: '/religion' }, { name: 'Aral Sea', path: '/aral-sea' }, { name: 'Museums', path: '/museums' }, { name: 'Great Figures', path: '/famous-people' }, { name: 'Sports', path: '/sports' }] },
    { name: 'Symbols', type: 'dropdown', items: [{ name: 'Sovereignty', path: '/sovereignty' }, { name: 'Declaration', path: '/declaration' }, { name: 'Constitution', path: '/constitution' }, { name: 'Flag', path: '/flag' }, { name: 'Emblem', path: '/emblem' }, { name: 'Anthem', path: '/anthem' }] },
    { name: 'Projects', type: 'dropdown', items: [{ name: 'Ecology', path: '/ecology' }, { name: 'Education', path: '/education' }, { name: 'Tourism', path: '/tourism' }, { name: 'Free Media', path: '/free-media' }, { name: 'Digital Heritage', path: '/digital-heritage' }] },
    { name: 'About Us', type: 'dropdown', items: [{ name: 'Mission & Values', path: '/mission' }, { name: 'Our Team', path: '/team' }, { name: 'Editorial Policy', path: '/policy' }, { name: 'Contacts', path: '/contacts' }] }
  ],
  PL: [
    { name: 'Karakalpakstan', type: 'dropdown', items: [{ name: 'Geografia', path: '/geography' }, { name: 'Historia', path: '/history' }, { name: 'Tradycje', path: '/traditions' }, { name: 'Kultura', path: '/culture-art' }, { name: 'Religia', path: '/religion' }, { name: 'Morze Aralskie', path: '/aral-sea' }, { name: 'Muzea', path: '/museums' }, { name: 'Wybitne postacie', path: '/famous-people' }, { name: 'Sport', path: '/sports' }] },
    { name: 'Symbole', type: 'dropdown', items: [{ name: 'Suwerenność', path: '/sovereignty' }, { name: 'Deklaracja', path: '/declaration' }, { name: 'Konstytucja', path: '/constitution' }, { name: 'Flaga', path: '/flag' }, { name: 'Herb', path: '/emblem' }, { name: 'Hymn', path: '/anthem' }] },
    { name: 'Projekty', type: 'dropdown', items: [{ name: 'Ekologia', path: '/ecology' }, { name: 'Edukacja', path: '/education' }, { name: 'Turystyka', path: '/tourism' }, { name: 'Wolne Media', path: '/free-media' }, { name: 'Cyfrowe Dziedzictwo', path: '/digital-heritage' }] },
    { name: 'O nas', type: 'dropdown', items: [{ name: 'Misja i Wartości', path: '/mission' }, { name: 'Nasz Zespół', path: '/team' }, { name: 'Polityka Redakcyjna', path: '/policy' }, { name: 'Kontakt', path: '/contacts' }] }
  ]
};

// ==========================================
// 4. НЕГІЗГІ КОМПОНЕНТ
// ==========================================
export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('RU');
  const [showCurrency, setShowCurrency] = useState(false);
  const [showWeather, setShowWeather] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [allData, setAllData] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const searchInputRef = useRef(null);
  
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen) {
      if (searchInputRef.current) searchInputRef.current.focus();
      document.body.style.overflow = 'hidden';
      if (!isDataLoaded) loadSearchData();
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isSearchOpen]);

  async function loadSearchData() {
    let combinedData = [];
    const staticPagesFormatted = staticPages.map(page => ({
      path: page.path,
      title_ru: page.title_ru, title_kk: page.title_kk, title_en: page.title_en, title_pl: page.title_pl,
      date: page.date,
      searchString: `${page.title_ru} ${page.title_kk} ${page.title_en} ${page.title_pl} ${page.keywords || ''}`.toLowerCase(),
      type: 'page'
    }));
    combinedData = [...staticPagesFormatted];
    try {
      const modules = import.meta.glob('../content/news/**/*.md', { query: '?raw', import: 'default' });
      for (const path in modules) {
        try {
          const rawContent = await modules[path]();
          const { data, content } = parseFrontmatter(rawContent);
          const parts = path.split('/');
          const fileName = parts[parts.length - 1];
          const slug = fileName.replace('.md', '');
          let year = '2024';
          if (parts.length >= 2 && /^\d{4}$/.test(parts[parts.length - 2])) year = parts[parts.length - 2];
          const searchString = [data.title || '', data.title_ru || '', data.title_en || '', data.title_pl || '', data.title_kk || '', content || ''].join(' ').toLowerCase();
          combinedData.push({ path: `/news/${year}/${slug}`, title_ru: data.title_ru || data.title || '', title_kk: data.title || '', title_en: data.title_en || data.title || '', title_pl: data.title_pl || data.title || '', date: data.date, searchString, type: 'news' });
        } catch (err) { console.error("File parse error:", path, err); }
      }
    } catch (error) { console.error("Search loading error:", error); } 
    finally { setAllData(combinedData); setIsDataLoaded(true); }
  }

  useEffect(() => {
    if (searchQuery.length < 2) { setSearchResults([]); return; }
    const results = allData.filter(item => item.searchString.includes(searchQuery.toLowerCase()));
    setSearchResults(results.slice(0, 8));
  }, [searchQuery, allData]);

  const changeLang = (lang) => {
    setCurrentLang(lang);
    window.dispatchEvent(new CustomEvent('languageChange', { detail: { lang } }));
    if (i18n && i18n.changeLanguage) {
        const langCode = lang === 'KK' ? 'kaa' : lang.toLowerCase();
        i18n.changeLanguage(langCode);
    }
  };

  const currentMenu = menuStructure[currentLang] || menuStructure.RU;
  const widgetStatus = { KK: "Жақын арада иске қосылады", RU: "Скоро будет доступно", EN: "Coming Soon", PL: "Wkrótce dostępne" };

  const CurrencyWidget = () => (
    <div className="absolute top-full right-0 mt-2 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 min-w-[200px] z-50">
      <h3 className="font-bold mb-2 text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-2">{currentLang === 'RU' ? 'Валюта' : currentLang === 'KK' ? 'Валюта' : currentLang === 'PL' ? 'Waluta' : 'Currency'}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 italic text-center py-2">{widgetStatus[currentLang]}</p>
    </div>
  );

  const WeatherWidget = () => (
    <div className="absolute top-full right-0 mt-2 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 min-w-[200px] z-50">
      <h3 className="font-bold mb-2 text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-2">{currentLang === 'RU' ? 'Погода' : currentLang === 'KK' ? 'Ҳаўа-райы' : currentLang === 'PL' ? 'Pogoda' : 'Weather'}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 italic text-center py-2">{widgetStatus[currentLang]}</p>
    </div>
  );

  const getLocalizedTitle = (item) => {
    if (currentLang === 'KK') return item.title_kk || item.title_ru;
    if (currentLang === 'EN') return item.title_en || item.title_kk;
    if (currentLang === 'PL') return item.title_pl || item.title_en;
    return item.title_ru || item.title_kk;
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg py-1 md:py-2' 
          : 'bg-white dark:bg-gray-900 py-2 md:py-4'
      }`}>
        <div className="max-w-[1920px] mx-auto px-2 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-28">
            
            {/* ЛОГОТИП СЕКЦИЯСЫ */}
            <div className="flex items-center gap-1 shrink-0 overflow-hidden">
              {location.pathname !== '/' && (
                <button 
                  onClick={() => navigate(-1)} 
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
                >
                  <ArrowLeft size={22} />
                </button>
              )}
              <Link to="/" className="flex items-center gap-2 group">
                <img src="/images/logo2.png" alt="KV" className="h-10 w-10 md:h-24 md:w-24 object-contain transition-transform group-hover:scale-110" />
                
                {/* МОБИЛЬДІК ЖӘНЕ ДЕСКТОП ЛОГОТИП ЖАЗУЫ */}
                <div className="flex flex-col md:flex-row items-start md:items-center leading-none">
                  <span className="text-[22px] md:text-[65px] font-bold text-amber-500 tracking-tighter" style={{ fontFamily: "'Dancing Script', cursive" }}>
                    Karakalpak
                  </span>
                  <span className="text-[18px] md:text-[65px] font-bold text-amber-500 md:ml-3" style={{ fontFamily: "'Dancing Script', cursive" }}>
                    Voice
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden xl:flex items-center space-x-1 ml-auto">
              {currentMenu.map((item, i) => (
                <div key={i} className="relative group">
                  <button className="flex items-center gap-1 px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap">
                    {item.name}
                    <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
                  </button>
                  <div className="absolute left-0 mt-0 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left z-50">
                    <div className="py-2">
                      {item.items.map((subItem, j) => (
                        <Link key={j} to={subItem.path} className="block px-4 py-2 text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 font-medium">
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ОҢ ЖАҚТАҒЫ БАТЫРМАЛАР (БІР ҚАТАРДА) */}
            <div className="flex items-center gap-1 sm:gap-2 ml-2">
               {/* Search */}
               <button onClick={() => setIsSearchOpen(true)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <Search size={20} className="text-gray-700 dark:text-gray-300" />
              </button>

              {/* Currency & Weather (Hidden on small mobile) */}
              <div className="relative hidden sm:block">
                <button onClick={() => { setShowCurrency(!showCurrency); setShowWeather(false); }} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <DollarSign size={18} className="text-gray-700 dark:text-gray-300" />
                </button>
                {showCurrency && <CurrencyWidget />}
              </div>

              {/* Lang Dropdown */}
              <div className="relative group">
                <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-1">
                  <Globe size={18} className="text-gray-700 dark:text-gray-300" />
                  <span className="hidden xs:inline text-xs font-bold text-gray-700 dark:text-gray-300">{currentLang}</span>
                </button>
                <div className="absolute top-full right-0 mt-2 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[140px] z-[110]">
                  {['RU', 'KK', 'EN', 'PL'].map((l) => (
                    <button key={l} onClick={() => changeLang(l)} className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${currentLang === l ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-gray-700 dark:text-gray-300'}`}>
                      {l === 'KK' ? 'KR Қарақалпақ' : l === 'RU' ? '🇷🇺 Русский' : l === 'EN' ? '🇬🇧 English' : '🇵🇱 Polski'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme Toggle */}
              <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                {theme === 'dark' ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-yellow-500" />}
              </button>

              {/* Hamburger (Mobile Menu) */}
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="xl:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                {isMenuOpen ? <X size={24} className="text-gray-700 dark:text-gray-300" /> : <Menu size={24} className="text-gray-700 dark:text-gray-300" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Sidebar/Menu */}
        {isMenuOpen && (
          <div className="xl:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 absolute top-full left-0 right-0 shadow-lg h-screen overflow-y-auto pb-40 animate-fade-in-up">
            <div className="px-4 py-4 space-y-1">
              {currentMenu.map((item, i) => (
                <div key={i} className="border-b border-gray-100 dark:border-gray-800 last:border-0">
                  <button onClick={() => setActiveMobileDropdown(activeMobileDropdown === i ? null : i)} className="w-full flex justify-between items-center px-4 py-3 text-base font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                    {item.name}
                    <ChevronDown size={20} className={`transform transition-transform duration-200 ${activeMobileDropdown === i ? 'rotate-180' : ''}`} />
                  </button>
                  {activeMobileDropdown === i && (
                    <div className="pl-4 pb-2 space-y-1 bg-gray-50 dark:bg-gray-800/50 rounded-lg mb-2">
                      {item.items.map((subItem, j) => (
                        <Link key={j} to={subItem.path} onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 border-l-2 border-transparent hover:border-blue-500 transition-all font-medium">
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content jump */}
      <div className="h-16 md:h-28"></div>

      {/* SEARCH MODAL */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[200] bg-white/95 dark:bg-black/95 backdrop-blur-sm animate-fade-in flex flex-col pt-20">
          <div className="max-w-4xl mx-auto w-full p-4 md:p-8">
            <div className="flex items-center justify-between mb-8">
               <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                 {currentLang === 'KK' ? 'Сайттан излеў' : currentLang === 'EN' ? 'Search Site' : currentLang === 'PL' ? 'Wyszukaj na stronie' : 'Поиск по сайту'}
               </h2>
               <button onClick={() => { setIsSearchOpen(false); setSearchQuery(''); setSearchResults([]); }} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800">
                 <X size={32} className="text-gray-500 dark:text-gray-400" />
               </button>
            </div>
            <div className="relative mb-12">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
              <input ref={searchInputRef} type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={currentLang === 'KK' ? 'Мысалы: Суверенитет, Конституция...' : 'Type to search...'} className="w-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white text-xl md:text-2xl p-6 pl-16 rounded-2xl border-2 border-transparent focus:border-blue-500 focus:outline-none transition-all shadow-inner" />
            </div>
            <div className="overflow-y-auto max-h-[60vh] custom-scrollbar">
              {searchResults.map((result, idx) => (
                <Link key={idx} to={result.path} onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }} className="block p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-500 hover:shadow-lg transition-all mb-4">
                  <span className={`text-xs font-bold px-2 py-1 rounded ${result.type === 'page' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>{result.type.toUpperCase()}</span>
                  <h3 className="text-lg md:text-xl font-bold mt-2">{getLocalizedTitle(result)}</h3>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}