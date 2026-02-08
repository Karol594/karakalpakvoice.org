import React, { useState, useEffect } from 'react';
import { Users, Target, Shield, Globe, Heart, Facebook, Send, Twitter, Instagram, Youtube, Link as LinkIcon } from 'lucide-react';

export default function Team() {
  const [lang, setLang] = useState("RU"); // Бас тил - Русша
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Бет ашылғанда жоқарыға шығарыў
    window.scrollTo(0, 0);

    // Қараңғы режимди анықлаў
    const checkTheme = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    // Тил өзгергенде қабылдау логикасы
    const handleLangChange = (e) => {
      if (e.detail && e.detail.lang) {
        let newLang = e.detail.lang.toUpperCase();
        if (newLang === 'KAA') newLang = 'KK';
        setLang(newLang);
      }
    };

    window.addEventListener("languageChange", handleLangChange);
    return () => {
      window.removeEventListener("languageChange", handleLangChange);
      observer.disconnect();
    };
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert(lang === 'KK' ? "Силтеме көширилди!" : (lang === 'RU' ? "Ссылка скопирована!" : "Link copied!"));
  };

  const translations = {
    RU: {
      heroTitle: "НАША КОМАНДА",
      heroDesc: "Молодые журналисты, блогеры и активисты — на пути к истине.",
      
      aboutTitle: "КТО МЫ?",
      aboutText1: "Мы — свободная группа, состоящая из молодых журналистов, исследователей, блогеров, экспертов и активистов, неравнодушных к будущему Каракалпакстана.",
      aboutText2: "Наша цель — предоставлять точную, проверенную информацию о Республике, соответствующую международным стандартам, и доносить голос народа до всего мира.",
      aboutText3: "Мы — независимая медиа-инициатива, поддерживающая свободу слова, прозрачность, справедливость и сохранение культурного наследия. Знакомить мир с фактами, историческими данными, культурными сокровищами и правовыми вопросами Каракалпакстана — наша ежедневная работа.",
      aboutText4: "Наша команда — это молодые специалисты с опытом в сферах журналистики, медиа, права, IT, социологии, истории, дипломатии и коммуникаций. Вместе мы создаем объективный, независимый и качественный контент о Каракалпакстане.",

      goalsTitle: "ГЛАВНАЯ ЦЕЛЬ",
      goals: [
        "Предоставление новостей без цензуры и независимо",
        "Защита прав и свобод народа",
        "Сохранение культурного наследия и языка",
        "Донесение до мира точной, проверенной информации о Каракалпакстане",
        "Открытое освещение социальных, экологических и правовых проблем Республики"
      ],

      missionTitle: "НАША МИССИЯ",
      mission: [
        "Донести голос каракалпакского народа до мира",
        "Предоставление международной аудитории качественного, объективного контента, основанного на фактах",
        "Профессиональное освещение правовых, социальных и экологических проблем в регионе",
        "Поддержка молодых журналистов, блогеров и исследователей",
        "Укрепление ценностей прозрачности, справедливости и толерантности в обществе"
      ],

      principlesTitle: "НАШИ ПРИНЦИПЫ",
      principles: [
        { title: "Прозрачность", desc: "Проверка фактов и предоставление точной информации." },
        { title: "Независимость и объективность", desc: "Мы работаем без какого-либо политического или группового влияния." },
        { title: "Многоязычная поддержка", desc: "Расширение аудитории за счет предоставления контента на нескольких языках." },
        { title: "Культурная толерантность", desc: "Поддержка ценностей уважения, мира и единства ко всем нациям." },
        { title: "Защита прав", desc: "Продвижение принципов прав человека, свободы слова и справедливости." },
        { title: "Профессиональная этика", desc: "Мы работаем в соответствии со стандартами журналистики." }
      ],

      partnersTitle: "С КЕМ МЫ РАБОТАЕМ?",
      partnersIntro: "Наши двери открыты для:",
      partnersList: [
        "Молодых журналистов",
        "Блогеров",
        "Правозащитников",
        "Историков",
        "Исследователей",
        "Дизайнеров",
        "IT-специалистов",
        "Всех активистов, интересующихся медиа"
      ],
      partnersFooter: "Каждый человек, желающий внести вклад в создание качественного контента о Каракалпакстане — наш партнер.",
      
      shareTitle: "Свяжитесь с нами"
    },
    KK: {
      heroTitle: "БИЗИҢ КОМАНДА",
      heroDesc: "Жас журналистлер, блогерлер ҳәм белсендилер — ҳақыйқат жолында.",
      
      aboutTitle: "БИЗ КИМБИЗ?",
      aboutText1: "Қарақалпақстанның келешегине бийпәрўа қарамайтуғын жас журналистлер, иззертлеўшилер, блогерлер, экспертлер ҳәм белсендилерден ибарат еркин топарымыз.",
      aboutText2: "Бизиң махсетимиз - Республика ҳаққында анық, тексерилген ҳәм халықаралық стандартқа сай мәлимлеме бериў, халықтың даўысын дүньяға жеткериў.",
      aboutText3: "Биз - сөз еркинлигин, ашық-айдынлықты, әдилликти ҳәм мәдений мийрасты сақлаўды қоллап-қуўатлаўшы ғәрезсиз медиа баслама. Қарақалпақстан ҳаққындағы фактлерди, тарийхый мағлыўматларды, мәдений ғәзийнелерди ҳәм ҳуқықый мәселелерди дүньяға таныстырыў - бизиң күнделикли жумысымыз.",
      aboutText4: "Бизиң команда - журналистика, медиа, ҳуқық, IT, социология, тарийх, дипломатия ҳәм коммуникация тараўларында тәжирийбеси бар жас қәнигелер. Биз биргеликте Қарақалпақстан ҳаққындағы обьектив, ғәрезсиз ҳәм сапалы контентти жаратамыз.",

      goalsTitle: "БАС МАХСЕТИМИЗ",
      goals: [
        "Цензурасыз, гәрезсиз жаңалықлар бериў",
        "Халықтың ҳуқықлары ҳәм еркинлигин қорғаў",
        "Мәдений мийрас ҳәм тилди сақлап қалыў",
        "Қарақалпақстан ҳаққында дүньяға анық, тексерилген мағлыўмат жеткериў",
        "Республикадағы социаллық, экологиялық, ҳуқықый мәселелерди ашық түрде көтериў"
      ],

      missionTitle: "БИЗИҢ МИССИЯМЫЗ",
      mission: [
        "Қарақалпақ халқының даўысын дүньяға жеткериў",
        "Халықаралық аудиторияға сапалы, обьектив, фактлерге тийкарланған контент усыныў",
        "Аймақтағы ҳуқықый, социаллық ҳәм экологиялық мәселелерди профессионал дәрежеде жәриялаў",
        "Жас журналистлер, блогерлер, изертлеўшилерди қоллап-қуўатлаў",
        "Жәмийетте ашық-айдынлық, әдиллик ҳәм кеңпейиллик қәдириятларын беккемлеў"
      ],

      principlesTitle: "БИЗИҢ ПРИНЦИПЛЕРИМИЗ",
      principles: [
        { title: "Ашық-айдынлық", desc: "Фактлерди тексерип, анық мағлыўмат бериў." },
        { title: "Ғәрезсиз ҳәм обьективлик", desc: "Ҳеш қандай сиясий ямаса топарлық тәсирсиз жумыс ислеймиз." },
        { title: "Көп тилли қоллап-қуўатлаў", desc: "Контентти бир неше тилде жеткериў арқалы аудиторияны кеңейтиў." },
        { title: "Мәдений кеңпейиллик", desc: "Барлық миллетлерге ҳүрмет, тынышлық ҳәм аўызбиршилик қәдириятларын қоллап-қуўатлаў." },
        { title: "Ҳуқықты қорғаў", desc: "Инсан ҳуқықлары, сөз еркинлиги ҳәм әдиллик принциплерин алға қойыў." },
        { title: "Кәсиплик этика", desc: "Журналистика стандартларына муўапық жумыс ислеймиз." }
      ],

      partnersTitle: "БИЗ КИМЛЕР МЕНЕН ИСЛЕЙМИЗ?",
      partnersIntro: "Бизиң есигимиз ашық:",
      partnersList: [
        "Жас журналистлерге",
        "Блогерлерге",
        "Ҳуқық қорғаўшыларға",
        "Тарийхшыларға",
        "Изертлеўшилерге",
        "Дизайнерлерге",
        "IT қәнигелерине",
        "Медиаға қызығатуғын барлық белсендилерге"
      ],
      partnersFooter: "Қарақалпақстан ҳаққында сапалы контент жаратыўға үлес қосыўды қәлеген ҳәр бир адам - бизиң шеригимиз.",

      shareTitle: "Биз бенен байланысың"
    },
    EN: {
      heroTitle: "OUR TEAM",
      heroDesc: "Young journalists, bloggers, and activists — on the path to truth.",
      
      aboutTitle: "WHO ARE WE?",
      aboutText1: "We are an independent group of young journalists, researchers, bloggers, experts, and activists who care about the future of Karakalpakstan.",
      aboutText2: "Our goal is to provide accurate, verified information about the Republic in accordance with international standards, and to bring the voice of the people to the world.",
      aboutText3: "We are an independent media initiative supporting freedom of speech, transparency, justice, and the preservation of cultural heritage. Introducing the world to facts, historical data, cultural treasures, and legal issues of Karakalpakstan is our daily work.",
      aboutText4: "Our team consists of young professionals with experience in journalism, media, law, IT, sociology, history, diplomacy, and communications. Together, we create objective, independent, and high-quality content about Karakalpakstan.",

      goalsTitle: "MAIN GOAL",
      goals: [
        "Providing uncensored and independent news",
        "Protecting people's rights and freedoms",
        "Preserving cultural heritage and language",
        "Delivering accurate, verified information about Karakalpakstan to the world",
        "Openly raising social, environmental, and legal issues in the Republic"
      ],

      missionTitle: "OUR MISSION",
      mission: [
        "To bring the voice of the Karakalpak people to the world",
        "Providing the international audience with quality, objective, fact-based content",
        "Professional coverage of legal, social, and environmental issues in the region",
        "Supporting young journalists, bloggers, and researchers",
        "Strengthening the values of transparency, justice, and tolerance in society"
      ],

      principlesTitle: "OUR PRINCIPLES",
      principles: [
        { title: "Transparency", desc: "Fact-checking and providing accurate information." },
        { title: "Independence and Objectivity", desc: "We work without any political or group influence." },
        { title: "Multilingual Support", desc: "Expanding the audience by delivering content in multiple languages." },
        { title: "Cultural Tolerance", desc: "Supporting values of respect, peace, and unity for all nations." },
        { title: "Rights Protection", desc: "Advancing principles of human rights, freedom of speech, and justice." },
        { title: "Professional Ethics", desc: "We work in accordance with journalism standards." }
      ],

      partnersTitle: "WHO DO WE WORK WITH?",
      partnersIntro: "Our doors are open to:",
      partnersList: [
        "Young journalists",
        "Bloggers",
        "Human rights defenders",
        "Historians",
        "Researchers",
        "Designers",
        "IT specialists",
        "All activists interested in media"
      ],
      partnersFooter: "Anyone who wants to contribute to creating quality content about Karakalpakstan is our partner.",
      
      shareTitle: "Connect with us"
    },
    PL: {
      heroTitle: "NASZ ZESPÓŁ",
      heroDesc: "Młodzi dziennikarze, blogerzy i aktywiści – na drodze do prawdy.",
      
      aboutTitle: "KIM JESTEŚMY?",
      aboutText1: "Jesteśmy niezależną grupą młodych dziennikarzy, badaczy, blogerów, ekspertów i aktywistów, którym nie jest obojętna przyszłość Karakałpakstanu.",
      aboutText2: "Naszym celem jest dostarczanie dokładnych, sprawdzonych informacji o Republice zgodnie z międzynarodowymi standardami oraz przekazywanie głosu ludu światu.",
      aboutText3: "Jesteśmy niezależną inicjatywą medialną wspierającą wolność słowa, przejrzystość, sprawiedliwość i zachowanie dziedzictwa kulturowego. Przedstawianie światu faktów, danych historycznych, skarbów kultury i kwestii prawnych Karakałpakstanu to nasza codzienna praca.",
      aboutText4: "Nasz zespół to młodzi profesjonaliści z doświadczeniem w dziedzinie dziennikarstwa, mediów, prawa, IT, socjologii, historii, dyplomacji i komunikacji. Razem tworzymy obiektywne, niezależne i wysokiej jakości treści o Karakałpakstanie.",

      goalsTitle: "GŁÓWNY CEL",
      goals: [
        "Dostarczanie wiadomości bez cenzury i niezależnie",
        "Ochrona praw i wolności ludzi",
        "Zachowanie dziedzictwa kulturowego i języka",
        "Przekazywanie światu dokładnych, sprawdzonych informacji o Karakałpakstanie",
        "Otwarte poruszanie problemów społecznych, ekologicznych i prawnych w Republice"
      ],

      missionTitle: "NASZA MISJA",
      mission: [
        "Przekazać głos narodu karakałpackiego światu",
        "Dostarczanie międzynarodowej publiczności wysokiej jakości, obiektywnych treści opartych na faktach",
        "Profesjonalne relacjonowanie kwestii prawnych, społecznych i ekologicznych w regionie",
        "Wspieranie młodych dziennikarzy, blogerów i badaczy",
        "Wzmacnianie wartości przejrzystości, sprawiedliwości i tolerancji w społeczeństwie"
      ],

      principlesTitle: "NASZE ZASADY",
      principles: [
        { title: "Przejrzystość", desc: "Sprawdzanie faktów i dostarczanie dokładnych informacji." },
        { title: "Niezależność i Obiektywizm", desc: "Pracujemy bez żadnych wpływów politycznych ani grupowych." },
        { title: "Wsparcie Wielojęzyczne", desc: "Poszerzanie grona odbiorców poprzez dostarczanie treści w wielu językach." },
        { title: "Tolerancja Kulturowa", desc: "Wspieranie wartości szacunku, pokoju i jedności dla wszystkich narodów." },
        { title: "Ochrona Praw", desc: "Promowanie zasad praw człowieka, wolności słowa i sprawiedliwości." },
        { title: "Etyka Zawodowa", desc: "Pracujemy zgodnie ze standardami dziennikarskimi." }
      ],

      partnersTitle: "Z KIM WSPÓŁPRACUJEMY?",
      partnersIntro: "Nasze drzwi są otwarte dla:",
      partnersList: [
        "Młodych dziennikarzy",
        "Blogerów",
        "Obrońców praw człowieka",
        "Historyków",
        "Badaczy",
        "Projektantów",
        "Specjalistów IT",
        "Wszystkich aktywistów zainteresowanych mediami"
      ],
      partnersFooter: "Każdy, kto chce przyczynić się do tworzenia wysokiej jakości treści o Karakałpakstanie, jest naszym partnerem.",
      
      shareTitle: "Połącz się z nami"
    }
  };

  const t = translations[lang] || translations.RU;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">
      
      {/* 1. HERO SECTION (ФОТО) */}
      <div className="relative h-auto min-h-[500px] md:h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/team.jpg" 
            alt="Karakalpak Voice Team" 
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto animate-fade-in-up py-20">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-xl">
              <Users size={48} className="text-blue-400" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-2xl uppercase tracking-wider">
            {t.heroTitle}
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 font-light max-w-2xl mx-auto">
            {t.heroDesc}
          </p>
        </div>
      </div>

      {/* 2. MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-16 -mt-10 relative z-20">
        
        {/* About Section */}
        <div className="bg-white dark:bg-gray-900 rounded-[2rem] shadow-xl p-8 md:p-12 mb-12 border border-gray-100 dark:border-gray-800">
          <h2 className="text-3xl font-black mb-6 text-blue-600 dark:text-blue-400 uppercase tracking-wide">
            {t.aboutTitle}
          </h2>
          <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
            <p>{t.aboutText1}</p>
            <p>{t.aboutText2}</p>
            <p>{t.aboutText3}</p>
            <p>{t.aboutText4}</p>
          </div>
        </div>

        {/* GOALS & MISSION GRID */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          
          {/* Goals */}
          <div className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 p-8 rounded-[2rem] shadow-lg border border-blue-100 dark:border-gray-700 hover:-translate-y-1 transition-transform">
            <div className="flex items-center gap-3 mb-6">
              <Target className="text-blue-600 dark:text-blue-400" size={32} />
              <h3 className="text-xl font-bold uppercase">{t.goalsTitle}</h3>
            </div>
            <ul className="space-y-4">
              {t.goals.map((goal, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                  <span className="mt-2 w-2 h-2 rounded-full bg-blue-500 shrink-0"></span>
                  {goal}
                </li>
              ))}
            </ul>
          </div>

          {/* Mission */}
          <div className="bg-gradient-to-br from-purple-50 to-white dark:from-gray-900 dark:to-gray-800 p-8 rounded-[2rem] shadow-lg border border-purple-100 dark:border-gray-700 hover:-translate-y-1 transition-transform">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="text-purple-600 dark:text-purple-400" size={32} />
              <h3 className="text-xl font-bold uppercase">{t.missionTitle}</h3>
            </div>
            <ul className="space-y-4">
              {t.mission.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                  <span className="mt-2 w-2 h-2 rounded-full bg-purple-500 shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* PRINCIPLES */}
        <div className="bg-gradient-to-br from-amber-50 to-white dark:from-gray-900 dark:to-gray-800 p-8 md:p-12 rounded-[2rem] shadow-lg border border-amber-100 dark:border-gray-700 mb-12">
           <div className="flex items-center gap-3 mb-8 justify-center">
              <Globe className="text-amber-600 dark:text-amber-400" size={40} />
              <h3 className="text-3xl font-black uppercase text-center">{t.principlesTitle}</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.principles.map((item, i) => (
                <div key={i} className="p-6 bg-white dark:bg-black/20 rounded-xl border border-amber-200 dark:border-amber-900/30">
                  <h4 className="font-bold text-amber-700 dark:text-amber-400 mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
        </div>

        {/* PARTNERS */}
        <div className="bg-white dark:bg-gray-900 rounded-[2rem] shadow-xl p-8 md:p-12 mb-16 border border-gray-100 dark:border-gray-800 text-center">
          <div className="flex justify-center mb-6">
            <Users className="text-green-600 dark:text-green-400" size={48} />
          </div>
          <h2 className="text-3xl font-black mb-4 text-gray-900 dark:text-white uppercase tracking-wide">
            {t.partnersTitle}
          </h2>
          <p className="text-xl font-medium text-gray-600 dark:text-gray-400 mb-8">{t.partnersIntro}</p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {t.partnersList.map((partner, i) => (
              <span key={i} className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full font-bold shadow-sm hover:scale-105 transition-transform cursor-default">
                {partner}
              </span>
            ))}
          </div>
          
          <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl inline-block">
            <p className="text-lg text-blue-800 dark:text-blue-300 font-medium">
              {t.partnersFooter}
            </p>
          </div>
        </div>

        {/* ------------------------------------------- */}
        {/* 4. SHARE (ТАРҚАТЫЎ) - Updated Social Links */}
        {/* ------------------------------------------- */}
        <section className={`p-10 rounded-[40px] border text-center ${isDarkMode ? "bg-white/5 border-white/10" : "bg-gray-100 border-gray-200"}`}>
          <h3 className="text-2xl font-bold mb-8 italic">{t.shareTitle}</h3>
          <div className="flex flex-wrap justify-center gap-6">
            
            {/* Facebook */}
            <a href="https://www.facebook.com/share/1FifdzG23b/" target="_blank" rel="noreferrer" className="p-4 bg-[#1877F2] text-white rounded-full hover:scale-110 transition shadow-lg" title="Facebook">
              <Facebook size={24} />
            </a>

            {/* Telegram */}
            <a href="https://t.me/kkvoice_org" target="_blank" rel="noreferrer" className="p-4 bg-[#0088cc] text-white rounded-full hover:scale-110 transition shadow-lg" title="Telegram">
              <Send size={24} />
            </a>

            {/* Twitter (X) */}
            <a href="https://x.com/Karakalpak45997" target="_blank" rel="noreferrer" className="p-4 bg-black text-white rounded-full border border-white/20 hover:scale-110 transition shadow-lg" title="Twitter (X)">
              <Twitter size={24} />
            </a>

            {/* Instagram */}
            <a href="https://www.instagram.com/karakalpakvoice_org/" target="_blank" rel="noreferrer" className="p-4 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white rounded-full hover:scale-110 transition shadow-lg" title="Instagram">
              <Instagram size={24} />
            </a>

            {/* YouTube */}
            <a href="https://youtube.com/@karakalpakvoice_org" target="_blank" rel="noreferrer" className="p-4 bg-[#FF0000] text-white rounded-full hover:scale-110 transition shadow-lg" title="YouTube">
              <Youtube size={24} />
            </a>

            {/* Copy Link Button */}
            <button onClick={copyToClipboard} className="p-4 bg-gray-700 text-white rounded-full hover:scale-110 transition shadow-lg flex items-center gap-2 px-6" title="Copy Link">
              <LinkIcon size={20} />
            </button>
          </div>
        </section>

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
}