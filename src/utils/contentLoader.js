import yaml from 'js-yaml';

export async function loadContent(type) {
  let modules;
  
  switch (type) {
    case 'persons':
      modules = import.meta.glob('../content/persons/*.md', { query: '?raw', import: 'default' });
      break;
    case 'events':
      modules = import.meta.glob('../content/events/*.md', { query: '?raw', import: 'default' });
      break;
    case 'documents':
      modules = import.meta.glob('../content/documents/*.md', { query: '?raw', import: 'default' });
      break;
    case 'terms':
      modules = import.meta.glob('../content/terms/*.md', { query: '?raw', import: 'default' });
      break;
    default:
      return [];
  }

  const items = [];

  for (const path in modules) {
    try {
      const rawContent = await modules[path]();
      const parsed = parseMarkdown(rawContent);
      const slug = path.split(/[/\\]/).pop().replace('.md', '');
      
      items.push({ slug, ...parsed });
    } catch (e) {
      console.error(`Файлды оқыў қәтеси: ${path}`, e);
      continue;
    }
  }

  return items;
}

function parseMarkdown(text) {
  const metaMatch = text.match(/^---\s*([\s\S]*?)\s*---/);
  let metadata = {};
  let contentBody = text;

  if (metaMatch) {
    const metaString = metaMatch[1];
    contentBody = text.replace(metaMatch[0], '').trim();
    try {
      metadata = yaml.load(metaString) || {};
    } catch (e) {
      console.error("YAML қатесі:", e);
      metadata = {}; 
    }
  }

  // ✅ ЖАҢАРТЫЛҒАН БӨЛУ ТӘСІЛІ (Splitter)
  // Бұл Regex: "#" белгісінен басталатын және ішінде "RU", "KK", "EN" немесе "PL" бар жолдарды іздейді.
  // Флагтарға, басқа сөздерге қарамайды.
  const sections = splitByLanguage(contentBody);

  return {
    ...processMetadata(metadata), 
    content: sections
  };
}

function splitByLanguage(text) {
  const result = { ru: "", kk: "", en: "", pl: "" };
  if (!text) return result;

  // 1. Барлық мәтінді жол-жолға бөлеміз
  const lines = text.split('\n');
  let currentLang = null;
  let buffer = [];

  for (let line of lines) {
    // 2. Егер жол "# ... RU" немесе "# ... KK" деп басталса - тілді ауыстырамыз
    // (regex: басында # бар, кейін кез келген символдар, сосын RU/KK/EN/PL бар)
    const langMatch = line.match(/^#\s+.*(RU|KK|EN|PL)/i);

    if (langMatch) {
      // Егер алдында бір тіл жинап жатқан болсақ, соны сақтаймыз
      if (currentLang && buffer.length > 0) {
        result[currentLang] = buffer.join('\n').trim();
      }
      
      // Жаңа тілді анықтаймыз
      const code = langMatch[1].toUpperCase();
      if (code === 'RU') currentLang = 'ru';
      else if (code === 'KK') currentLang = 'kk';
      else if (code === 'EN') currentLang = 'en';
      else if (code === 'PL') currentLang = 'pl';
      
      // Буферді тазалаймыз (жаңа тіл үшін)
      buffer = [];
    } else {
      // Егер бұл тақырып болмаса, және тіл таңдаулы тұрса - мәтінді жинаймыз
      if (currentLang) {
        buffer.push(line);
      }
    }
  }

  // Соңғы жиналған бөлікті сақтаймыз
  if (currentLang && buffer.length > 0) {
    result[currentLang] = buffer.join('\n').trim();
  }

  return result;
}

function processMetadata(meta) {
  const defaultTitle = { ru: "...", kk: "...", en: "...", pl: "..." };
  const defaultExcerpt = { ru: "", kk: "", en: "", pl: "" };

  return {
    ...meta,
    title: (typeof meta.title === 'object') ? meta.title : { 
      ru: meta.title || defaultTitle.ru,
      kk: meta.title || defaultTitle.kk,
      en: meta.title || defaultTitle.en,
      pl: meta.title || defaultTitle.pl
    },
    excerpt: (typeof meta.excerpt === 'object') ? meta.excerpt : {
      ru: meta.excerpt || defaultExcerpt.ru,
      kk: meta.excerpt || defaultExcerpt.kk,
      en: meta.excerpt || defaultExcerpt.en,
      pl: meta.excerpt || defaultExcerpt.pl
    }
  };
}