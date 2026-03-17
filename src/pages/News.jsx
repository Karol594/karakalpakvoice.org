import { Link, useNavigate, useNavigationType } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowLeft } from 'lucide-react';
import NewsCard from '../components/NewsCard';

export default function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const navType = useNavigationType();

  const currentLang = i18n.language ? i18n.language.toLowerCase() : 'ru';
  const langKey = currentLang === 'kaa' ? 'kk' : currentLang;

  useEffect(() => {
    if (navType !== 'POP') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    loadAllArticles();
  }, [langKey, navType]);

  const parseFrontMatter = (text) => {
    if (!text) return {};
    const data = {};
    const match = text.match(/^---\s*([\s\S]*?)\s*---/);
    if (!match) return data;

    const lines = match[1].split('\n');
    let currentKey = null;
    let nestedObj = null;

    lines.forEach(line => {
      // Кірістірілген жол: 2+ бос орын + кілт + : + мән
      // Мән ішінде : болса да дұрыс оқиды
      const nestedMatch = line.match(/^(\s{2,})(\w+):\s*(.*)/);
      // Жоғарғы деңгей жол: кілт + : + мән (бос орынсыз басталады)
      const topMatch = line.match(/^(\w[\w-]*):\s*(.*)/);

      if (nestedMatch && currentKey && nestedObj !== null) {
        const subKey = nestedMatch[2].trim();
        let subVal = nestedMatch[3].trim().replace(/^["']|["']$/g, '');
        nestedObj[subKey] = subVal;
        data[currentKey] = { ...nestedObj };

      } else if (topMatch && !nestedMatch) {
        currentKey = topMatch[1].trim();
        let value = topMatch[2].trim();

        if (value === '' || value === '{}') {
          // Кірістірілген объект басталуы
          nestedObj = {};
          data[currentKey] = nestedObj;

        } else if (value.startsWith('[') && value.endsWith(']')) {
          // Жай массив: ["a", "b"]
          data[currentKey] = value
            .slice(1, -1)
            .split(',')
            .map(s => s.trim().replace(/^["']|["']$/g, ''))
            .filter(Boolean);
          nestedObj = null;

        } else if (value.startsWith('-')) {
          // YAML тізімі — бірінші элемент
          nestedObj = null;
          if (!Array.isArray(data[currentKey])) data[currentKey] = [];
          const item = value.replace(/^-\s*/, '').replace(/^["']|["']$/g, '');
          if (item) data[currentKey].push(item);

        } else {
          // Жай мән
          data[currentKey] = value.replace(/^["']|["']$/g, '');
          nestedObj = null;
        }

      } else if (line.match(/^\s*-\s+/) && currentKey) {
        // YAML тізімінің жалғасы (images, tags массивтері)
        const item = line.replace(/^\s*-\s+/, '').replace(/^["']|["']$/g, '').trim();
        if (item) {
          if (!Array.isArray(data[currentKey])) data[currentKey] = [];
          data[currentKey].push(item);
        }
      }
    });

    return data;
  };

  async function loadAllArticles() {
    try {
      const modules = import.meta.glob('/src/content/news/**/*.md', { query: '?raw', import: 'default' });

      const articlePromises = Object.entries(modules).map(async ([path, loader]) => {
        try {
          const content = await loader();
          const data = parseFrontMatter(content);

          const parts = path.split('/');
          const filename = parts[parts.length - 1].replace('.md', '');
          const folderName = parts[parts.length - 2];

          let year = '2025';
          if (data.date) {
            year = data.date.split('-')[0];
          } else if (/^\d{4}$/.test(folderName)) {
            year = folderName;
          }

          // Тилге байланыслы title & excerpt (ДҮЗЕТИЛГЕН НУСҚА)
          const getLocalized = (field) => {
            // 1. Алды менен titles ямаса excerpts сияқлы нускауларды тексеремиз
            const pluralField = field === 'title' ? 'titles' : field === 'excerpt' ? 'excerpts' : field;
            const nestedObj = data[pluralField] || data[field];
            
            if (nestedObj && typeof nestedObj === 'object') {
              return nestedObj[langKey] || nestedObj['ru'] || nestedObj['kk'] || '';
            }
            
            // 2. Егер нысан болмаса, title_ru, title_kk сияқты "flat" форматты тексереміз
            return data[`${field}_${langKey}`] || data[`${field}_ru`] || data[field] || '';
          };

          return {
            slug: filename,
            year,
            ...data,
            title: getLocalized('title'),
            excerpt: getLocalized('excerpt'),
            category: getLocalized('tags') || getLocalized('category'),
          };
        } catch (err) {
          console.error("Error parsing MD:", err);
          return null;
        }
      });

      const all = (await Promise.all(articlePromises))
        .filter(Boolean)
        .sort((a, b) => new Date(b.date) - new Date(a.date));

      setArticles(all);
    } catch (error) {
      console.error("Error loading news:", error);
    } finally {
      setLoading(false);
    }
  }

  const PAGE_TITLES = {
    kk: 'Соңғы Жаңалықлар',
    en: 'Latest News',
    pl: 'Najnowsze Wiadomości',
    ru: 'Последние Новости',
  };

  const EMPTY_TEXT = {
    kk: 'Жаңалықлар табылмады.',
    en: 'No articles found.',
    pl: 'Nie znaleziono artykułów.',
    ru: 'Новости не найдены.',
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pt-32 pb-24 min-h-screen text-gray-900 dark:text-white transition-colors duration-300">

      {/* ── Тақырып ── */}
      <div className="flex flex-col items-center text-center mb-16 relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-0 top-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500 dark:text-gray-400 hidden md:block"
          title="Back"
        >
          <ArrowLeft size={24} />
        </button>

        <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter uppercase text-gray-200 dark:text-white">
          {PAGE_TITLES[langKey] || PAGE_TITLES.ru}
        </h1>
        <div className="h-1 w-24 bg-blue-600 rounded-full" />
      </div>

      {/* ── Жүктеліп атыр ── */}
      {loading && (
        <div className="text-center text-gray-500 dark:text-gray-400 animate-pulse mt-20">
          Loading...
        </div>
      )}

      {/* ── Бос ── */}
      {!loading && articles.length === 0 && (
        <div className="text-center text-gray-500 dark:text-gray-400 flex flex-col items-center mt-20">
          <p className="text-xl mb-2">😔</p>
          <p>{EMPTY_TEXT[langKey] || EMPTY_TEXT.ru}</p>
        </div>
      )}

      {/* ── Карточкалар ── */}
      {!loading && articles.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map(article => (
            <NewsCard
              key={article.slug}
              item={{
                ...article,
                slug: `${article.year}/${article.slug}`,
              }}
            />
          ))}
        </div>
      )}

    </div>
  );
}