import React, { useState, useEffect } from "react";
import { BookOpen, Scale, FileText, AlertCircle, Facebook, Instagram, Twitter, Youtube, Send, Link as LinkIcon, Check } from "lucide-react";

// TikTok иконкасы
const TikTokIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

export default function Constitution() {
  const [lang, setLang] = useState("RU");
  const [copied, setCopied] = useState(false); // Силтеме көширилди ме?

  // Бетке кіргенде жоғарыға көтерілу
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Тіл өзгерісін тыңдау
  useEffect(() => {
    const handleLangChange = (e) => {
      if (e.detail?.lang) {
        setLang(e.detail.lang);
      }
    };
    window.addEventListener("languageChange", handleLangChange);
    return () => window.removeEventListener("languageChange", handleLangChange);
  }, []);

  // Силтемени көшириў функциясы
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // 2 секундтан кейин қайтадан қалпына келеди
  };

  const translations = {
    KK: {
      title: "Конституция",
      subtitle: "Қарақалпақстан Республикасы Конституциясы",
      hero: "Халқымыздың ҳуқықый турмысының айнасы",
      intro: [
        "Қарақалпақстан Республикасы Конституциясы тек ғана ҳуқықый ҳүжжет емес, ал халықтың тарийхый статусы ҳәм сиясий турмысының айнасы болып есапланады. Бүгин биз сизге көпшилик билмейтуғын, халықаралық ҳуқық нормаларына да, классикалық конституциялық әмелиятқа да сәйкес келмейтуғын айрықша ҳуқықый жағдайдың гүўасы болыў имканиятын усынамыз.",
        "Қарақалпақстан Республикасының ҳуқықый статусына байланыслы соңғы жылларда жүз берген өзгерислер, тилекке қарсы, аймақтың бурынғы ҳуқықый кепилликлериниң төменлеўине, бир қатар тийкарғы нормалардың қайта көрип шығылыўына алып келген. Бул - тек ғана нызам текстиниң жаңаланыўы емес, ал пүткил бир халықтың ҳуқықый мәканына тәсир ететуғын әҳмийетли процесс болып есапланады.",
        "Биз бул бөлимде Қарақалпақстан Конституциясына байланыслы барлық мағлыўматлар, тарийхый салыстырыўлар, ҳуқықый таллаўлар ҳәм ресмий текстлерди системаластырып, ашық түрде жәрия етемиз. Махсетимиз - ҳәр бир оқыўшыға анық мағлыўматқа тийкарланған түсиник бериў, ҳуқықый өзгерислердиң мәнисин анық көрсетиў.",
        "Жақын күнлерде толық материаллар, көп тилли вариантлар ҳәм терең таллаўлар жәрияланады. Қарақалпақстанның ҳуқықый келешегине бийпәрўа қарамайтуғын ҳәр бир пуқара ушын бул мағлыўмат әҳмийетли болады."
      ],
      cta: "Биз бенен бирге болың - ҳақыйқатты бирге ашайық!",
      sections: [
        { title: "Тарийхый контекст", desc: "Конституциялық өзгерислердиң тарийхый шәкиллениў процесси" },
        { title: "Ҳуқықый таллаў", desc: "Халықаралық ҳуқық нормалары менен салыстырыў" },
        { title: "Ресмий текстлер", desc: "Конституция вариантларының толық мәтинлери" }
      ],
      comingSoon: "Жақында жәрияланады",
      shareTitle: "Биз бенен байланысың",
      copyLink: "Силтемени көшириў",
      copied: "Көширилди!"
    },
    RU: {
      title: "Конституция",
      subtitle: "Конституция Республики Каракалпакстан",
      hero: "Отражение правового статуса народа",
      intro: [
        "Конституция Республики Каракалпакстан — это не просто правовой документ, а отражение исторического статуса и политической идентичности народа. Сегодня мы предлагаем вам возможность ознакомиться с уникальной правовой ситуацией, о которой мало кто знает и которая не вписывается ни в нормы международного права, ни в традиционные конституционные модели.",
        "Изменения, затронувшие правовой статус Республики Каракалпакстан в последние годы, к сожалению, привели к ослаблению прежних правовых гарантий и пересмотру ряда ключевых положений. Это не просто обновление текста закона — это процесс, затрагивающий фундаментальные основы правового положения всего народа.",
        "В данном разделе мы систематизируем и открыто публикуем всю информацию, связанную с Конституцией Каракалпакстана: исторические сопоставления, правовые анализы и официальные тексты. Наша цель — предоставить каждому читателю точное, объективное и информативное понимание сути произошедших правовых изменений.",
        "В ближайшее время будут опубликованы подробные материалы, многоязычные версии и расширенные аналитические обзоры. Эта информация важна для каждого, кто неравнодушен к правовому будущему Каракалпакстана."
      ],
      cta: "Оставайтесь с нами — вместе откроем истину!",
      sections: [
        { title: "Исторический контекст", desc: "Процесс формирования конституционных изменений" },
        { title: "Правовой анализ", desc: "Сравнение с нормами международного права" },
        { title: "Официальные тексты", desc: "Полные тексты версий Конституции" }
      ],
      comingSoon: "Скоро будет опубликовано",
      shareTitle: "Свяжитесь с нами",
      copyLink: "Скопировать ссылку",
      copied: "Скопировано!"
    },
    EN: {
      title: "Constitution",
      subtitle: "Constitution of the Republic of Karakalpakstan",
      hero: "A Reflection of the People's Legal Standing",
      intro: [
        "The Constitution of the Republic of Karakalpakstan is not merely a legal document — it is a reflection of the historical status and political identity of its people. Today, we invite you to explore a unique legal situation that remains largely unknown and does not align with international legal standards or traditional constitutional models.",
        "The changes that have affected the legal status of the Republic of Karakalpakstan in recent years have, unfortunately, led to the weakening of previously established legal guarantees and the revision of several key provisions. This is far more than a routine update of a legal text — it is a process that touches upon the fundamental foundations of the people's legal standing.",
        "In this section, we will systematically collect and openly publish all information related to the Constitution of Karakalpakstan, including historical comparisons, legal analyses, and official texts. Our goal is to provide every reader with clear, accurate, and well‑informed insight into the essence of these legal transformations.",
        "In the coming days, we will release detailed materials, multilingual versions, and expanded analytical reviews. This information is essential for anyone concerned about the legal future of Karakalpakstan."
      ],
      cta: "Stay with us — together, we will uncover the truth.",
      sections: [
        { title: "Historical Context", desc: "The process of constitutional changes formation" },
        { title: "Legal Analysis", desc: "Comparison with international legal standards" },
        { title: "Official Texts", desc: "Complete texts of Constitution versions" }
      ],
      comingSoon: "Coming Soon",
      shareTitle: "Connect with us",
      copyLink: "Copy Link",
      copied: "Copied!"
    },
    PL: {
      title: "Konstytucja",
      subtitle: "Konstytucja Republiki Karakalpakstanu",
      hero: "Zwierciadło prawnego statusu narodu",
      intro: [
        "Konstytucja Republiki Karakalpakstanu to nie tylko akt prawny — to zwierciadło historycznego statusu oraz politycznej tożsamości narodu. Dziś zapraszamy Państwa do zapoznania się z wyjątkową sytuacją prawną, o której niewiele osób wie, a która nie mieści się ani w ramach międzynarodowych standardów prawnych, ani w klasycznych modelach konstytucyjnych.",
        "Zmiany, jakie w ostatnich latach dotknęły status prawny Republiki Karakalpakstanu, niestety doprowadziły do osłabienia wcześniejszych gwarancji prawnych oraz do modyfikacji szeregu kluczowych postanowień. Nie jest to zwykła aktualizacja tekstu ustawy — to proces, który wpływa na fundamentalne podstawy prawnego położenia całego narodu.",
        "W tej sekcji będziemy systematycznie gromadzić i publikować w otwartym dostępie wszystkie informacje dotyczące Konstytucji Karakalpakstanu: historyczne porównania, analizy prawne oraz oficjalne teksty. Naszym celem jest zapewnienie każdemu czytelnikowi rzetelnego, precyzyjnego i opartego na faktach zrozumienia istoty zachodzących zmian prawnych.",
        "W najbliższym czasie opublikujemy szczegółowe materiały, wielojęzyczne wersje oraz pogłębione opracowania analityczne. Informacje te są istotne dla każdego, komu nie jest obojętna przyszłość prawna Karakalpakstanu."
      ],
      cta: "Pozostańcie z nami — wspólnie odkryjemy prawdę.",
      sections: [
        { title: "Kontekst historyczny", desc: "Proces kształtowania zmian konstytucyjnych" },
        { title: "Analiza prawna", desc: "Porównanie z międzynarodowymi standardami prawnymi" },
        { title: "Oficjalne teksty", desc: "Pełne teksty wersji Konstytucji" }
      ],
      comingSoon: "Wkrótce",
      shareTitle: "Połącz się z nami",
      copyLink: "Kopiuj link",
      copied: "Skopiowano!"
    }
  };

  const t = translations[lang] || translations.RU;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black text-black dark:text-white">
      
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-8">
            <BookOpen size={20} />
            <span className="font-medium">{t.title}</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 dark:text-white">{t.subtitle}</h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400">{t.hero}</p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          
          <div className="mb-12 p-6 rounded-2xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
            <div className="flex gap-4">
              <AlertCircle className="flex-shrink-0 text-amber-600 dark:text-amber-400" size={24} />
              <div className="space-y-4">
                {t.intro.map((p, i) => (
                  <p key={i} className="text-gray-700 dark:text-gray-300 leading-relaxed">{p}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-20 text-center">
            <p className="text-xl font-semibold text-blue-600 dark:text-blue-400">{t.cta}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {t.sections.map((s, i) => {
              const icons = [BookOpen, Scale, FileText];
              const Icon = icons[i];
              return (
                <div key={i} className="p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
                  <div className="w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-6">
                    <Icon className="text-blue-600 dark:text-blue-400" size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{s.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{s.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center py-16 px-6 rounded-3xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/40 mb-6">
              <FileText className="text-blue-600 dark:text-blue-400" size={36} />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{t.comingSoon}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{t.intro[3]}</p>
          </div>

        </div>
      </section>

      <div className="h-20"></div>
    </div>
  );
}