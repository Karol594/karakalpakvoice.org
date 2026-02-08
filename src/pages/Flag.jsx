import React, { useState, useEffect } from 'react';
import { Flag, Facebook, Instagram, Twitter, Youtube, Send, Link as LinkIcon, Check } from 'lucide-react';

// TikTok иконкасы
const TikTokIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

export default function FlagPage() {
  // Тилди localStorage-дан алыў
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'KK');
  const [copied, setCopied] = useState(false); // Силтеме көширилди ме?

  useEffect(() => {
    // Беттиң басына шығыў
    window.scrollTo(0, 0);

    // Тилдиң өзгерисин бақлаў (Custom Event арқалы)
    const handleLangUpdate = (event) => {
      if (event.detail && event.detail.lang) {
        setLang(event.detail.lang);
      }
    };

    window.addEventListener('languageChange', handleLangUpdate);
    
    // Сондай-ақ стандартлы storage event-ти де бақлаў
    const handleStorageChange = () => setLang(localStorage.getItem('lang') || 'KK');
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('languageChange', handleLangUpdate);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Силтемени көшириў функциясы
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const translations = {
    KK: {
      intro: "«МӘМЛЕКЕТ БАЙРАҒЫ»",
      title: "ҚАРАҚАЛПАҚСТАН РЕСПУБЛИКАСЫНЫҢ МӘМЛЕКЕТЛИК БАЙРАҒЫ",
      section1: {
        title: "Байрақтың тарийхы",
        text: `Қарақалпақстан Республикасының Мемлекетлик Байрағы — республиканың мемлекетлик Суверенитетиниң муқаддес символы болып табылады.

«Қарақалпақстан Республикасының Мемлекетлик байрағы ҳаққында»ғы Нызам 1992-жыл 14-декабрьде Қарақалпақстан Республикасы Жоғарғы Кеңесиниң XII сессиясында қабыл етилди. Байрақ бизиң өтмишимиз, бүгинги күнимиз ҳәм жарқын келешегимизди өзинде жәмлеген нышандур.`
      },
      section2: {
        title: "БАЙРАҚТЫҢ СЫПАТЛАМАСЫ ҲӘМ ӨЛШЕМЛЕРИ",
        text: "Қарақалпақстан Республикасының Мемлекетлик байрағы тик төртмүйешли формада болып, горизонтал жайласқан үш түстеги (көк, сары ҳәм жасыл) полосалардан ибарат. Сары түстеги полосаны ақ ҳәм қызыл реңдеги каёмкалар (сызықлар) ажыратып турады.",
        params: "Техникалық параметрлери:",
        specs: [
          "Узынлығы: 250 см",
          "Ени: 125 см",
          "Көк ҳәм жасыл полосалар: ҳәр бири 42 см",
          "Сары полоса: 34 см",
          "Ақ сызықлар: 1 см",
          "Қызыл сызықлар: 2,5 см"
        ],
        stars: "Байрақтың жоқарғы көк полосасында ақ түстеги ярым ай ҳәм оның оң тәрепинде бес жулдыз сүўретленген. Жулдызлар еки қатарда (жоқарыда 2, төменде 3) жайласқан болып, ҳәр бири диаметри 10 см болған айналаға орналасқан."
      },
      section3: {
        title: "СИМВОЛЛАРДЫҢ МӘНИСИ ҲӘМ РЕҢЛЕР ПСИХОЛОГИЯСЫ",
        intro: "Байрақтағы ҳәр бир рең ҳәм белги терең мәниге ийе:",
        meanings: [
          { color: "Көк түс", desc: "Суўдың, бәҳәрдиң ҳәм тынышлықтың символы. Бул рең шығыс халықларында әзелден пәклик ҳәм ашық аспан белгиси сыпатында қәдирленеди." },
          { color: "Сары (алтын) түс", desc: "Қарақалпақстан аймағының басым бөлеги шөллерден ибарат екенлигин, сондай-ақ берекет ҳәм миймандослықты аңлатады." },
          { color: "Жасыл түс", desc: "Тәбияттың жаңаланыўы, жасарыў, исеним, руўханый байлық ҳәм күн нурының белгиси." },
          { color: "Ақ ҳәм Қызыл каёмкалар", desc: "Ақ — пәклик ҳәм тынышлық символы. Қызыл — тамырларда аққан өмирлик күш ҳәм еркинлик белгиси." },
          { color: "Ярым ай", desc: "Мусылман халықлары ушын муқаддес символ, халықтың руўханый мийрасы менен байланыслы." },
          { color: "Бес жулдыз", desc: "Қарақалпақстанның ең әўелги бес қаласының (Нөкис, Хожели, Шымбай, Қоңырат, Тахыятас) белгиси болып, бул қалалар тарийхый тийкар ҳәм исеним символы болып табылады." }
        ]
      },
      section4: {
        title: "ТАРИЙХЫЙ ӨТМИШ",
        subtitle: "Аймақтағы байрақлар эволюциясы",
        intro: "Бүгинги байрағымыз қабыл етилгенге шекем Қарақалпақстан аймағында ҳәр-түрли дәўирлерге байланыслы мәмлекетлик символикалары болған:",
        periods: [
          { period: "Хийўа ханлығы дәўири (1917–1920)", desc: "Қара фондағы сары ай ҳәм жулдыз сүўретленген байрақ." },
          { period: "Хорезм Халық Совет Республикасы (1923–1924)", desc: "Қызыл фонда жазыўлар түсирилген байрақ." },
          { period: "Түркистан АССР (1920–1923)", desc: "Қызыл фон ҳәм жасыл кантондағы ай-жулдыз символикасы." },
          { period: "Қарақалпақ АССР (1934–1992)", desc: "Совет дәўириндеги байрақлар, тийкарынан қызыл фонда республика аты жазылған." }
        ]
      },
      section5: {
        title: "МЕМЛЕКЕТЛИК БАЙРАҚ — МАҚТАНЫШЫМЫЗ!",
        text: `Қарақалпақстан Республикасының Мемлекетлик байрағы халықаралық майданларда — ресмий делегациялардың сапарларында, халықаралық конференцияларда, дүньялық көрмелерде ҳәм спорт жарысларында республикамыздың намысын қорғайды.

Байрағымыз басқа мүрәжәат етилетуғын Ғәрезсиз мәмлекетлердиң байрақлары менен тең ҳуқықлы дәрежеде желбирейди. Өз байрағын ҳүрметлеў — ҳәр бир пуқараның, Қарақалпақстанда жасаўшы ҳәр бир инсанның перзентлик парызы ҳәм мақтанышы болып табылады.`
      },
      conclusion: "БАЙРАҒЫМЫЗ — БИЙИКЛЕРДЕ ЖЕЛБИРЕЙ БЕРСИН!",
      shareTitle: "Биз бенен байланысың",
      copyLink: "Силтемени көшириў",
      copied: "Көширилди!"
    },
    RU: {
      intro: "«ГОСУДАРСТВЕННЫЙ ФЛАГ»",
      title: "ГОСУДАРСТВЕННЫЙ ФЛАГ РЕСПУБЛИКИ КАРАКАЛПАКСТАН",
      section1: {
        title: "История флага",
        text: `Государственный флаг Республики Каракалпакстан — священный символ государственного суверенитета республики.

Закон «О государственном флаге Республики Каракалпакстан» был принят 14 декабря 1992 года на 12-й сессии Верховного Совета Республики Каракалпакстан. Флаг символизирует наше прошлое, настоящее и светлое будущее.`
      },
      section2: {
        title: "ОПИСАНИЕ И РАЗМЕРЫ ФЛАГА",
        text: "Государственный флаг Республики Каракалпакстан представляет собой прямоугольное полотнище, состоящее из трёх горизонтальных полос голубого, желтого и зелёного цветов. Полосу желтого цвета отделяют белые и красные каёмки.",
        params: "Технические параметры:",
        specs: [
          "Длина: 250 см",
          "Ширина: 125 см",
          "Голубая и зеленая полосы: по 42 см",
          "Желтая полоса: 34 см",
          "Белые каёмки: 1 см",
          "Красные каёмки: 2,5 см"
        ],
        stars: "На верхней голубой полосе изображены белый полумесяц и справа от него пять звезд. Звезды расположены в два ряда (вверху 2, внизу 3), каждая вписана в круг диаметром 10 см."
      },
      section3: {
        title: "ЗНАЧЕНИЕ СИМВОЛОВ И ПСИХОЛОГИЯ ЦВЕТОВ",
        intro: "Каждый цвет и символ на флаге имеют глубокий смысл:",
        meanings: [
          { color: "Голубой цвет", desc: "Символ воды и весны. Этот цвет издревле ценится восточными народами как знак чистоты и открытого неба." },
          { color: "Желтый цвет", desc: "Указывает на то, что большая часть Каракалпакстана состоит из пустынь, а также символизирует благополучие и гостеприимство." },
          { color: "Зеленый цвет", desc: "Признак обновления природы, духовности, доверия и солнца." },
          { color: "Белые и красные каёмки", desc: "Белый — чистота и мир. Красный — жизненная сила и единство." },
          { color: "Полумесяц", desc: "Священное воплощение мусульман, символ духовного наследия." },
          { color: "Пять звезд", desc: "Символ жизни и доверия пяти самых древних городов Каракалпакстана (Нукус, Ходжейли, Шымбай, Кунград, Тахиаташ)." }
        ]
      },
      section4: {
        title: "ИСТОРИЧЕСКОЕ ПРОШЛОЕ",
        subtitle: "Эволюция флагов региона",
        intro: "До принятия современного флага в регионе существовали различные государственные символы:",
        periods: [
          { period: "Период Хивинского ханства (1917–1920)", desc: "Флаг с желтым полумесяцем и звездой на черном фоне." },
          { period: "Хорезмская НСР (1923–1924)", desc: "Флаг с надписями на красном фоне." },
          { period: "Каракалпакская АССР (1934–1992)", desc: "Советские флаги на основе флага Узбекской ССР." }
        ]
      },
      section5: {
        title: "ГОСУДАРСТВЕННЫЙ ФЛАГ — НАША ГОРДОСТЬ!",
        text: `Государственный флаг Республики Каракалпакстан защищает честь нашей республики на международных площадках - во время визитов официальных делегаций, международных конференций, всемирных выставок и спортивных соревнований.

Наш флаг будет развеваться наравне с флагами других независимых государств. Уважение к своему флагу - это сыновний долг и гордость каждого гражданина, каждого человека, живущего в Каракалпакстане.`
      },
      conclusion: "ПУСТЬ НАШ ФЛАГ РАЗВЕВАЕТСЯ НА ВЫСОТАХ!",
      shareTitle: "Свяжитесь с нами",
      copyLink: "Скопировать ссылку",
      copied: "Скопировано!"
    },
    EN: {
      intro: "«NATIONAL FLAG»",
      title: "STATE FLAG OF THE REPUBLIC OF KARAKALPAKSTAN",
      section1: {
        title: "History of the Flag",
        text: "The State Flag of the Republic of Karakalpakstan is a sacred symbol of state sovereignty. Adopted on December 14, 1992, at the XII session of the Supreme Council."
      },
      section2: {
        title: "DESCRIPTION AND DIMENSIONS",
        text: "The flag consists of three horizontal stripes: blue, yellow, and green. The yellow stripe is separated by white and red borders.",
        params: "Technical specs:",
        specs: ["Length: 250 cm", "Width: 125 cm", "Blue/Green stripes: 42 cm", "Yellow stripe: 34 cm", "White lines: 1 cm", "Red lines: 2.5 cm"],
        stars: "A white crescent and five stars are depicted on the upper blue stripe. Stars are arranged in two rows (2 above, 3 below)."
      },
      section3: {
        title: "MEANING OF SYMBOLS",
        intro: "Each color and symbol on the flag has a deep meaning:",
        meanings: [
          { color: "Blue", desc: "Symbol of water, spring, and tranquility." },
          { color: "Yellow", desc: "Represents the desert landscape, prosperity, and hospitality." },
          { color: "Green", desc: "Sign of nature's renewal, faith, and sunlight." },
          { color: "Crescent", desc: "Sacred symbol for Muslim peoples." },
          { color: "Five Stars", desc: "Symbol of the five oldest cities (Nukus, Khojeyli, Shimbay, Kungrad, Takhtakupyr)." }
        ]
      },
      section4: {
        title: "HISTORICAL PAST",
        subtitle: "Evolution of flags",
        intro: "Historical flags before 1992:",
        periods: [
          { period: "Khiva Khanate (1917–1920)", desc: "Yellow crescent and star on black background." },
          { period: "Karakalpak ASSR (1934–1992)", desc: "Soviet-era flags based on the Uzbek SSR flag." }
        ]
      },
      section5: {
        title: "STATE FLAG — OUR PRIDE!",
        text: `The national flag of the Republic of Karakalpakstan protects the honor of our republic at international venues - during visits of official delegations, international conferences, world exhibitions and sports competitions.

Our flag will fly along with the flags of other independent states. Respect for one’s flag is the filial duty and pride of every citizen, every person living in Karakalpakstan.`
      },
      conclusion: "MAY OUR FLAG FLY HIGH!",
      shareTitle: "Connect with us",
      copyLink: "Copy Link",
      copied: "Copied!"
    },
    PL: {
      intro: "„FLAGA PAŃSTWOWA”",
      title: "FLAGA PAŃSTWOWA REPUBLIKI KARAKAŁPAKSTANU",
      section1: {
        title: "Historia flagi",
        text: "Flaga Państwowa Republiki Karakałpakstanu jest świętym symbolem suwerenności państwowej republiki. Przyjęta 14 grudnia 1992 roku."
      },
      section2: {
        title: "OPIS I WYMIARY FLAGI",
        text: "Flaga składa się z trzech poziomych kolorowych pasów (niebieskiego, żółtego i zielonego). Żółty pas jest oddzielony białymi i czerwonymi obwódkami.",
        params: "Parametry techniczne:",
        specs: ["Długość: 250 cm", "Szerokość: 125 cm", "Pasy niebieski/zielony: 42 cm", "Pas żółty: 34 cm"],
        stars: "Na górnym niebieskim pasie przedstawiony jest biały półksiężyc i pięć gwiazd ułożonych w dwóch rzędach."
      },
      section3: {
        title: "ZNACZENIE SYMBOLI",
        intro: "Każdy kolor i symbol na fladze ma głębokie znaczenie:",
        meanings: [
          { color: "Kolor niebieski", desc: "Symbol wody, wiosny i spokoju." },
          { color: "Kolor żółty", desc: "Symbol pustyni, dobrobytu i gościnności." },
          { color: "Kolor zielony", desc: "Znak odnowy natury i wiary." },
          { color: "Półksiężyc", desc: "Święty symbol dla narodów muzułmańskich." },
          { color: "Pięć gwiazd", desc: "Symbol pięciu najstarszych miast Karakałpakstanu." }
        ]
      },
      section4: {
        title: "PRZESZŁOŚĆ HISTORYCZNA",
        subtitle: "Ewolucja flag",
        intro: "Dawne symbole regionu:",
        periods: [
          { period: "Chanat Chiwy (1917–1920)", desc: "Żółty półksiężyc i gwiazda na czarnym tle." },
          { period: "Karakałpacka ASRR (1934–1992)", desc: "Flagi okresu sowieckiego." }
        ]
      },
      section5: {
        title: "FLAGA PAŃSTWOWA — NASZA DUMA!",
        text: `Flaga narodowa Republiki Karakalpakstanu chroni honor naszej republiki na arenie międzynarodowej — podczas wizyt oficjalnych delegacji, konferencji międzynarodowych, wystaw światowych i zawodów sportowych.

Nasza flaga będzie powiewać razem z flagami innych niepodległych państw. Szacunek dla Twojej flagi — synowski obowiązek i duma każdego obywatela, każdej osoby mieszkającej w Karakalpakstanie.`
      },
      conclusion: "NIECH NASZA FLAGA POWIEWA WYSOKO!",
      shareTitle: "Połącz się z nami",
      copyLink: "Kopiuj link",
      copied: "Skopiowano!"
    }
  };

  const t = translations[lang] || translations['RU'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-black text-gray-900 dark:text-white pt-32 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Intro */}
        <div className="mb-12 p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md rounded-2xl border-l-4 border-blue-600 shadow-sm">
          <p className="text-lg italic text-gray-700 dark:text-gray-300 leading-relaxed">
            {t.intro}
          </p>
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6">
            <Flag className="w-16 h-16 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            {t.title}
          </h1>
        </div>

        <div className="space-y-12">
          {/* History Section */}
          <section className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
            <h2 className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400">{t.section1.title}</h2>
            <p className="text-lg leading-relaxed whitespace-pre-line text-gray-700 dark:text-gray-300">
              {t.section1.text}
            </p>
          </section>

          {/* Specs Section */}
          <section className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
            <h2 className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400">{t.section2.title}</h2>
            <p className="text-lg mb-8">{t.section2.text}</p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-2xl">
                <h3 className="text-xl font-bold mb-4">{t.section2.params}</h3>
                <ul className="space-y-3">
                  {t.section2.specs.map((s, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800">
                <p className="text-gray-700 dark:text-gray-300 italic leading-relaxed">
                  {t.section2.stars}
                </p>
              </div>
            </div>
          </section>

          {/* Meaning Section */}
          <section className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
            <h2 className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400">{t.section3.title}</h2>
            <p className="text-lg mb-8 text-gray-500">{t.section3.intro}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {t.section3.meanings.map((m, i) => (
                <div key={i} className="p-5 bg-gray-50 dark:bg-gray-700/30 rounded-2xl border border-transparent hover:border-blue-300 transition-all duration-300">
                  <span className="block font-black text-blue-700 dark:text-blue-400 mb-2 uppercase text-sm tracking-widest">{m.color}</span>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Historical Past Section */}
          <section className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
            <h2 className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400">{t.section4.title}</h2>
            <p className="text-lg mb-8 text-gray-500">{t.section4.subtitle}</p>
            <div className="space-y-6">
              <p className="text-gray-700 dark:text-gray-300">{t.section4.intro}</p>
              <ul className="grid gap-4 sm:grid-cols-2">
                 {t.section4.periods.map((p, i) => (
                   <li key={i} className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl border-l-4 border-yellow-500">
                      <strong className="block text-gray-900 dark:text-white mb-1">{p.period}</strong>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{p.desc}</span>
                   </li>
                 ))}
              </ul>
            </div>
          </section>

          {/* Pride Section */}
          <section className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-10 shadow-2xl text-white">
            <h2 className="text-3xl font-bold mb-6">{t.section5.title}</h2>
            <p className="text-xl leading-relaxed opacity-95 whitespace-pre-line">
              {t.section5.text}
            </p>
          </section>
        </div>

        {/* Conclusion */}
        <div className="mt-20 text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-green-500 to-indigo-600">
            {t.conclusion}
          </h2>
        </div>

        {/* ======================================== */}
        {/* SHARE (ТАРҚАТЫЎ) - ТҮСТІ ИКОНКАЛАР + COPY LINK */}
        {/* ======================================== */}
        <div className="mt-16 border-t border-gray-200 dark:border-gray-700 pt-10 text-center">
            <h3 className="text-2xl font-bold mb-8 italic text-gray-900 dark:text-white">{t.shareTitle}</h3>
            <div className="flex flex-wrap justify-center gap-6">
              
              {/* Facebook */}
              <a href="https://www.facebook.com/share/1FifdzG23b/" target="_blank" rel="noreferrer" 
                 style={{ backgroundColor: '#1877F2', color: 'white' }}
                 className="p-4 rounded-full hover:scale-110 transition shadow-lg flex items-center justify-center" title="Facebook">
                <Facebook size={24} />
              </a>

              {/* Telegram */}
              <a href="https://t.me/kkvoice_org" target="_blank" rel="noreferrer" 
                 style={{ backgroundColor: '#0088cc', color: 'white' }}
                 className="p-4 rounded-full hover:scale-110 transition shadow-lg flex items-center justify-center" title="Telegram">
                <Send size={24} />
              </a>

              {/* Instagram */}
              <a href="https://www.instagram.com/karakalpakvoice_org/" target="_blank" rel="noreferrer" 
                 style={{ background: 'linear-gradient(to top right, #f9ce34, #ee2a7b, #6228d7)', color: 'white' }}
                 className="p-4 rounded-full hover:scale-110 transition shadow-lg flex items-center justify-center" title="Instagram">
                <Instagram size={24} />
              </a>

              {/* YouTube */}
              <a href="https://youtube.com/@karakalpakvoice_org" target="_blank" rel="noreferrer" 
                 style={{ backgroundColor: '#FF0000', color: 'white' }}
                 className="p-4 rounded-full hover:scale-110 transition shadow-lg flex items-center justify-center" title="YouTube">
                <Youtube size={24} />
              </a>

              {/* TikTok */}
              <a href="https://www.tiktok.com/@karakalpakvoice" target="_blank" rel="noreferrer" 
                 style={{ backgroundColor: 'black', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}
                 className="p-4 rounded-full hover:scale-110 transition shadow-lg flex items-center justify-center" title="TikTok">
                <TikTokIcon size={24} />
              </a>

              {/* Twitter (X) */}
              <a href="https://x.com/Karakalpak45997" target="_blank" rel="noreferrer" 
                 style={{ backgroundColor: 'black', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}
                 className="p-4 rounded-full hover:scale-110 transition shadow-lg flex items-center justify-center" title="Twitter">
                <Twitter size={24} />
              </a>

              {/* Copy Link Button */}
              <button 
                onClick={copyToClipboard} 
                className={`p-4 rounded-full hover:scale-110 transition shadow-lg flex items-center justify-center gap-2 text-white ${copied ? 'bg-green-600' : 'bg-gray-600'}`}
                title={t.copyLink}
              >
                {copied ? <Check size={24} /> : <LinkIcon size={24} />}
              </button>
            </div>
        </div>

      </div>
    </div>
  );
}