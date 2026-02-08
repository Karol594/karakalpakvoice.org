import React, { useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Comments({ url, identifier, title }) {
  const { i18n } = useTranslation();

  // 1. Төмендеги ескертиў тексти ушын аўдармалар
  const footerText = {
    KK: 'Пикир қалдырыў ушын дизимнен өтиң.',
    RU: 'Пожалуйста, войдите, чтобы оставить комментарий.',
    EN: 'Please login to comment.',
    PL: 'Zaloguj się, aby dodać komentarz.'
  };

  // 2. Бас тақырып ушын аўдармалар
  const headerText = {
    KK: 'Пикирлер',
    RU: 'Комментарии',
    EN: 'Comments',
    PL: 'Komentarze'
  };

  // Ҳәзирги тилди анықлаў (default: RU)
  const currentLang = i18n.language && footerText[i18n.language] ? i18n.language : 'RU';

  useEffect(() => {
    // 3. Disqus-ты жүклеў ямаса жаңалаў
    if (window.DISQUS) {
      window.DISQUS.reset({
        reload: true,
        config: function () {
          this.page.url = url;
          this.page.identifier = identifier;
          this.page.title = title;
          this.language = currentLang.toLowerCase(); // disqus киши ҳәрипти қабылдайды (ru, en)
        }
      });
    } else {
      const d = document;
      const s = d.createElement('script');
      
      // КЕЙИН ӨЗГЕРТЕСИЗ: 'karakalpak-voice' орнына өзиңиздиң Disqus ID қоясыз
      s.src = 'https://karakalpak-voice.disqus.com/embed.js'; 
      
      s.setAttribute('data-timestamp', +new Date());
      (d.head || d.body).appendChild(s);
    }
  }, [url, identifier, title, currentLang]);

  return (
    <div className="mt-16 pt-10 border-t border-gray-200 dark:border-gray-800">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
          <MessageSquare size={24} className="text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          {headerText[currentLang]}
        </h3>
      </div>
      
      {/* Disqus усы жерге жүкленеди */}
      <div id="disqus_thread" className="min-h-[200px]"></div>
      
      <p className="text-xs text-center text-gray-400 mt-4">
        Powered by <span className="font-bold">Disqus</span>. {footerText[currentLang]}
      </p>
    </div>
  );
}