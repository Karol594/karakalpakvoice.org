import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, BookOpen, Users, Calendar, FileText, ArrowRight } from 'lucide-react';
import { loadContent } from '../utils/contentLoader'; // Біз жасаған комбайнды шақырамыз
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Encyclopedia() {
  // Сайттың тілі (Қәзирше қолмен ауыстырылады, кейін глобалды жасаймыз)
  const [lang, setLang] = useState('RU'); 
  
  // Қай бөлім ашық тұр? (persons, events, documents, terms)
  const [activeTab, setActiveTab] = useState('persons');
  
  // Мағлыұматтар базасы
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Іздеу сөзі
  const [searchQuery, setSearchQuery] = useState('');

  // Тіл кілтін анықтау (сайтта 'RU', бірақ файлда 'ru')
  const langKey = lang.toLowerCase() === 'kk' ? 'kk' : lang.toLowerCase();

  // 1. Комбайнды иске қосамыз (ActiveTab өзгерген сайын)
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const content = await loadContent(activeTab);
      setData(content);
      setLoading(false);
    }
    fetchData();
  }, [activeTab]);

  // 2. Іздеу жүйесі (Фильтр)
  const filteredData = data.filter(item => {
    const title = item.title[langKey] || '';
    const excerpt = item.excerpt[langKey] || '';
    const query = searchQuery.toLowerCase();
    
    return title.toLowerCase().includes(query) || excerpt.toLowerCase().includes(query);
  });

  // Аўдармалар (Интерфейс ушын)
  const ui = {
    RU: {
      title: "Энциклопедия Каракалпакстана",
      subtitle: "История. Личности. Документы.",
      searchPlaceholder: "Поиск по энциклопедии...",
      readMore: "Читать",
      tabs: { persons: "Личности", events: "События", documents: "Документы", terms: "Термины" },
      empty: "Ничего не найдено."
    },
    KK: {
      title: "Қарақалпақстан Энциклопедиясы",
      subtitle: "Тарийх. Тулғалар. Ҳүжжетлер.",
      searchPlaceholder: "Энциклопедиядан излеў...",
      readMore: "Оқыў",
      tabs: { persons: "Тулғалар", events: "Оқыйғалар", documents: "Ҳүжжетлер", terms: "Терминler" },
      empty: "Ҳеш нәрсе табылмады."
    },
    EN: {
      title: "Encyclopedia of Karakalpakstan",
      subtitle: "History. People. Documents.",
      searchPlaceholder: "Search encyclopedia...",
      readMore: "Read",
      tabs: { persons: "People", events: "Events", documents: "Documents", terms: "Terms" },
      empty: "No results found."
    },
    PL: {
      title: "Encyklopedia Karakałpakstanu",
      subtitle: "Historia. Ludzie. Dokumenty.",
      searchPlaceholder: "Przeszukaj encyklopedię...",
      readMore: "Czytać",
      tabs: { persons: "Ludzie", events: "Wydarzenia", documents: "Dokumenty", terms: "Warunki" },
      empty: "Nie znaleziono wyników."
    }
  };

  const t = ui[lang] || ui.RU;

  // Иконкалар
  const icons = {
    persons: Users,
    events: Calendar,
    documents: FileText,
    terms: BookOpen
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#050505] text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar />
      
      {/* 1. БАС БӨЛІМ (HEADER) */}
      <div className="relative bg-blue-900 text-white py-20 px-6">
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-4">{t.title}</h1>
          <p className="text-xl md:text-2xl text-blue-200">{t.subtitle}</p>
          
          {/* Тіл ауыстырғыш (Тест ушын) */}
          <div className="mt-6 flex justify-center gap-4">
            {['RU', 'KK', 'EN', 'PL'].map(l => (
              <button 
                key={l}
                onClick={() => setLang(l)}
                className={`px-4 py-1 rounded-full font-bold text-sm transition-all ${lang === l ? 'bg-white text-blue-900' : 'bg-blue-800 text-white hover:bg-blue-700'}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. БАСҚАРУ ПАНЕЛІ (TABS & SEARCH) */}
      <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-20">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-4 md:p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
            
            {/* Таблар (Бөлимлер) */}
            <div className="flex flex-wrap justify-center gap-2">
              {Object.keys(t.tabs).map((tabKey) => {
                const Icon = icons[tabKey];
                const isActive = activeTab === tabKey;
                return (
                  <button
                    key={tabKey}
                    onClick={() => setActiveTab(tabKey)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${
                      isActive 
                        ? 'bg-blue-600 text-white shadow-lg scale-105' 
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon size={18} />
                    {t.tabs[tabKey]}
                  </button>
                );
              })}
            </div>

            {/* Іздеу (Search) */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full bg-gray-100 dark:bg-gray-800 border-none focus:ring-2 focus:ring-blue-500 transition-all outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. ТІЗІМ (GRID) */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="text-center py-20 text-gray-500 text-xl">
            {t.empty}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredData.map((item) => (
              <Link 
                key={item.slug} 
                to={`/encyclopedia/${activeTab}/${item.slug}`} // Силтеме
                className="group relative bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-800"
              >
                {/* Сурет */}
                <div className="h-48 overflow-hidden bg-gray-200 dark:bg-gray-800">
                  <img 
                    src={item.image || '/logo2.png'} 
                    alt={item.title[langKey]} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                
                {/* Мәтін */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-600 mb-3 uppercase tracking-wider">
                    <span className="bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-md">
                      {item.date?.split('-')[0] || '2025'}
                    </span>
                    {item.tags && item.tags[0] && (
                      <span className="text-gray-500">• {item.tags[0]}</span>
                    )}
                  </div>

                  <h3 className="text-2xl font-bold mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {item.title[langKey]}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">
                    {item.excerpt[langKey]}
                  </p>

                  <div className="flex items-center text-blue-600 font-bold group-hover:gap-2 transition-all">
                    {t.readMore} <ArrowRight size={18} className="ml-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}