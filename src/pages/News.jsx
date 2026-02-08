import { Link, useNavigate, useNavigationType } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Clock, ArrowLeft } from 'lucide-react';

export default function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  
  // Қай жолмен келгенін анықтау (POP = артқа қайту, PUSH = жаңа кіру)
  const navType = useNavigationType();

  const currentLang = i18n.language ? i18n.language.toLowerCase() : 'ru';
  const langKey = currentLang === 'kaa' ? 'kk' : currentLang;

  useEffect(() => {
    // Егер адам "Артқа" (POP) түймесімен келмеген болса ғана жоғарыға лақтырамыз
    if (navType !== 'POP') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // Егер "Артқа" деп келсе, браузер өзі орнын сақтап қалады
    
    loadAllArticles();
  }, [langKey, navType]);

  // --- PARSER ---
  const parseFrontMatter = (text) => {
    if (!text) return { title: "No Title", date: "2025-01-01" };
    const data = {};
    const match = text.match(/^---\s*([\s\S]*?)\s*---/);
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

  async function loadAllArticles() {
    try {
      // ✅ ТЕРЕҢ ІЗДЕУ (RECURSIVE) - Барлық папкаларды ақтарады
      const modules = import.meta.glob('/src/content/news/**/*.md', { query: '?raw', import: 'default' });

      const articlePromises = Object.entries(modules).map(async ([path, loader]) => {
        try {
          const content = await loader();
          const data = parseFrontMatter(content);
          
          // Файл атын және жылын алу
          const parts = path.split('/');
          const filename = parts[parts.length - 1].replace('.md', '');
          const folderName = parts[parts.length - 2]; 

          let year = '2025';
          if (data.date) {
            year = data.date.split('-')[0];
          } else if (/^\d{4}$/.test(folderName)) {
             year = folderName;
          }

          const localizedTitle = data[`title_${langKey}`] || data.title || "No Title";
          const localizedExcerpt = data[`desc_${langKey}`] || ""; 

          return { 
            slug: filename, 
            year, 
            ...data,
            title: localizedTitle, 
            excerpt: localizedExcerpt
          };
        } catch (err) {
          console.error("Error parsing MD:", err);
          return null;
        }
      });

      const all = (await Promise.all(articlePromises))
        .filter(Boolean)
        .sort((a, b) => new Date(b.date) - new Date(a.date)); // Ең жаңасы бірінші

      setArticles(all);
    } catch (error) {
      console.error("Error loading news:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 pt-32 pb-24 min-h-screen text-black dark:text-white transition-colors duration-300">
      
      {/* HEADER & BACK BUTTON */}
      <div className="flex flex-col items-center text-center mb-16 relative">
        
        {/* АРТҚА ҚАЙТУ ТҮЙМЕСІ */}
        <button 
          onClick={() => navigate(-1)} 
          className="absolute left-0 top-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500 hidden md:block"
          title="Back"
        >
          <ArrowLeft size={24} />
        </button>

        <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter uppercase">
          {langKey === 'kk' ? 'Соңғы Жаңалықлар' : 
           langKey === 'en' ? 'Latest News' : 
           langKey === 'pl' ? 'Najnowsze Wiadomości' : 'Последние Новости'}
        </h1>
        <div className="h-1 w-24 bg-blue-600 rounded-full"></div>
      </div>

      {loading ? (
        <div className="text-center text-gray-500 animate-pulse mt-20">Loading...</div>
      ) : articles.length === 0 ? (
        <div className="text-center text-gray-500 flex flex-col items-center mt-20">
             <p className="text-xl mb-2">😔</p>
             <p>{langKey === 'kk' ? 'Жаңалықлар табылмады.' : 'Новости не найдены.'}</p>
        </div>
      ) : (
        <div className="grid gap-10">
          {articles.map(article => (
            <Link 
              key={article.slug} 
              to={`/news/${article.year}/${article.slug}`} 
              className="group grid md:grid-cols-[300px_1fr] gap-6 items-start bg-white dark:bg-gray-900 rounded-3xl p-4 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-gray-800"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-200 relative">
                <img 
                  src={article.image || '/logo2.png'} 
                  alt={article.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {article.year}
                </div>
              </div>

              <div className="py-2 pr-4">
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-3 font-mono">
                  <Clock size={16} />
                  <time>{article.date}</time>
                  {article.author && (
                    <>
                      <span>•</span>
                      <span className="text-blue-500">{article.author}</span>
                    </>
                  )}
                </div>

                <h2 className="text-2xl font-bold mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                  {article.title}
                </h2>

                <div className="text-gray-600 dark:text-gray-400 line-clamp-3 mb-4 text-sm leading-relaxed">
                   {article.excerpt}
                </div>
                
                <span className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-wide group-hover:translate-x-2 transition-transform">
                  {langKey === 'kk' ? 'Оқыў' : langKey === 'en' ? 'Read' : 'Читать'} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}