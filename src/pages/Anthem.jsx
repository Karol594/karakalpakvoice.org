import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { Music, BookOpen, Feather, Mountain, Heart, Users, Volume2, Facebook, Instagram, Twitter, Youtube, Send, Link as LinkIcon, Check } from 'lucide-react';

// TikTok иконкасы
const TikTokIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

export default function AnthemPage() {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'RU');
  const [copied, setCopied] = useState(false); // Силтеме көширилди ме?

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleLangChange = (e) => {
      if (e.detail && e.detail.lang) {
        setLang(e.detail.lang.toUpperCase());
      }
    };

    const handleStorageChange = () => setLang(localStorage.getItem('lang') || 'RU');

    window.addEventListener('languageChange', handleLangChange);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('languageChange', handleLangChange);
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
      title: "ҚАРАҚАЛПАҚСТАН РЕСПУБЛИКАСЫНЫҢ МӘМЛЕКЕТЛИК ГИМНИ",
      subtitle: "«МӘМЛЕКЕТЛИК ГЕРБ»",
=======
import { Music, BookOpen, Feather, Mountain, Heart, Users, Volume2 } from 'lucide-react';

export default function AnthemPage() {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'KK');

  useEffect(() => {
    const handleStorageChange = () => setLang(localStorage.getItem('lang') || 'KK');
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const translations = {
    KK: {
      title: "ҚАРАҚАЛПАҚСТАН РЕСПУБЛИКАСЫНЫҢ МӘМЛЕКЕТЛИК ГИМНИ",
      
>>>>>>> ada8ad33363af76bb9bc1b46ad8fc671bbe1487d
      section1: {
        title: "Улыўма мағлыўмат",
        status: "Статус",
        statusDesc: "Қарақалпақстан Республикасының Мәмлекетлик символы",
        legal: "Ҳуқықлық негиз",
<<<<<<< HEAD
        legalDesc: "«Қарақалпақстан Республикасының Мәмлекетлик гимни ҳаққында» Нызам",
=======
        legalDesc: "«Қарақалпақстан Республикасының Мәмлекетлик гимни ҳаққында»-ғы Нызам",
>>>>>>> ada8ad33363af76bb9bc1b46ad8fc671bbe1487d
        date: "Қабыл етилген күни",
        dateDesc: "1993-жыл 24-декабрь",
        organ: "Орган",
        organDesc: "Қарақалпақстан Республикасы Жоғарғы Кеңесиниң XIV сессиясы"
      },
<<<<<<< HEAD
=======

>>>>>>> ada8ad33363af76bb9bc1b46ad8fc671bbe1487d
      section2: {
        title: "Авторлар",
        music: "Музыка",
        musicAuthor: "Нажимаддин Мухаммеддинов",
<<<<<<< HEAD
        lyrics: "Сөзлер",
        lyricsAuthor: "Ибрагим Юсупов"
      },
      section3: {
        title: "Гимнниң идеясы ҳәм мазмуны",
        intro: "Қарақалпақстан Республикасының гимни халықтың түп қәдириятлары ҳәм туўған жердиң өзгешеликлерин өзинде жәмлейди:",
        values: [
          "Жайҳун бойында жайласқан үлкенниң уллылығы ҳәм әжайыплығы",
          "Елдиң тынышлық сүйиўши сыпаты ҳәм раўажланыўға умтылыўы",
          "Халықтың мийнет сүйгишлиги, батырлығы ҳәм миймандослығы.",
=======
        lyrics: "Сөзи",
        lyricsAuthor: "Ибрайым Юсупов"
      },

      section3: {
        title: "Гимнниң идеясы ҳәм мазмуны",
        intro: "Қарақалпақстан Республикасының гимни халықтың түп қәдириятлары ҳәм туўылған жердиң өзгешеликлерин өзинде жәмлейди:",
        values: [
          "Жайҳун бойында жайласқан үлкениң уллылығы ҳәм әжайыплығы",
          "Елдиң тынышлық сүйиўши сыпаты ҳәм раўажланыўға ынтылыўы",
          "Халықтың мийнет сүйгишлиги, батырлығы ҳәм миймандослығы",
>>>>>>> ada8ad33363af76bb9bc1b46ad8fc671bbe1487d
          "Тарийх ҳәм дәстүрлерге ҳүрмет",
          "Билимге, өсиўге ҳәм жарқын келешекке ынтылыў",
          "«Қарақалпақстан» атын келешек әўладлардың жүрегинде сақлаў идеясы"
        ]
      },
<<<<<<< HEAD
      section4: {
        title: "Символлық мәнис",
        intro: "Гимн бирнеше әҳмийетли функцияларды атқарады.:",
        functions: [
          { title: "Бирлестириўши", desc: "Миллий бирлигимиз ҳәм улыўма шахслығымызды беккемлейди" },
          { title: "Тарийхый", desc: "Әўладлар арасында даўамлылықты жеткерип береди" },
          { title: "Тәрбиялық", desc: "Туўған жерге ҳәм мәмлекетлик қәдириятларға ҳүрметти қәлиплестиреди" },
          { title: "Салтанатлы", desc: "Мәмлекетлик илажлар, есабатлар ҳәм ресмий ўақыяларда қолланылады." }
        ]
      },
=======

      section4: {
        title: "Символлық мәнис",
        intro: "Гимн бирнеше әҳмийетли функцияларды атқарады:",
        functions: [
          { title: "Бирлестириўши", desc: "Миллий бирлик ҳәм улыўма шахслығымызды беккемлейди" },
          { title: "Тарийхый", desc: "Әўладлар арасында даўамлылықты жеткерип береди" },
          { title: "Тәрбиялық", desc: "Туўылған жерге ҳәм мәмлекетлик қәдириятларға ҳүрметти қәлиплестиреди" },
          { title: "Салтанатлы", desc: "Мәмлекетлик илажлар, мәресимлер ҳәм ресмий илажларға жолдаслық етеди" }
        ]
      },

>>>>>>> ada8ad33363af76bb9bc1b46ad8fc671bbe1487d
      section5: {
        title: "Гимнниң қолланылыўы",
        intro: "Мәмлекетлик гимн қолланылады:",
        uses: [
<<<<<<< HEAD
          "Қарақалпақстан Республикасының ресмий шараларында",
          "Мәмлекетлик байрақ көтерилгенде",
          "Халықаралық ушрасыўларда ҳәм дипломатиялық қабыллаўларда",
          "Патриотлық тәрбия ағымында билим бериў орынларында"
        ]
      },
      section6: {
        title: "Визуал белгилер",
        icons: [
          { title: "1993-жылы қабыл етилди", icon: BookOpen },
          { title: "Музыка: Н. Мухаммеддинов", icon: Music },
          { title: "Сөзи: И. Юсупов", icon: Feather },
          { title: "Туўылған жердиң әжайыплығы", icon: Mountain },
=======
          "Қарақалпақстан Республикасының ресмий илажларында",
          "Мәмлекетлик байрақ көтерилгенде",
          "Халықаралық ушрасыўларда ҳәм дипломатиялық қабыллаўларда",
          "Патриотлық тәрбия барысында билим бериў орынларында"
        ]
      },

      section6: {
        title: "Визуал белгилер",
        icons: [
          { title: "1993-жылы 24-декабрь куни қабыл етилди", icon: BookOpen },
          { title: "Музыка: Н. Мухаммеддинов", icon: Music },
          { title: "Сөзи: И. Юсупов", icon: Feather },
          { title: "Туўылған жердиң әжайыплылығы", icon: Mountain },
>>>>>>> ada8ad33363af76bb9bc1b46ad8fc671bbe1487d
          { title: "Әўладлар жүрегинде", icon: Heart },
          { title: "Халық, мәденият, даўамлылық", icon: Users }
        ]
      },
<<<<<<< HEAD
      anthemText: {
        title: "Гимн тексти (Қарақалпақша)",
        lyrics: `Жәйҳун жағасында өскен байтерек,
Түби бир, шақасы мың болар демек,
Сен сондай саялы, қуяшлы елсең,
Тынышлық ҳәм ығбал сендеги тилек.

Нақыраты:
Дыйхан баба нәпеси бар жеринде,
Жуўсан аңқып, кийик қашар шөлинде,
«Қарақалпақстан» деген атыңды,
Әўладлар әдиўлер жүрек төринде.

Айдын келешекке шақырар заман,
Мәртлик мийнет, билим жеткизер оған,
Халқың бар азамат, дос ҳәм мийрибан,
Еркин жайнап-жаснап, мәңги бол аман.

Нақыраты:
Дыйхан баба нәпеси бар жеринде,
Жуўсан аңқып, кийик қашар шөлинде,
«Қарақалпақстан» деген атыңды,
Әўладлар әдиўлер жүрек төринде.`
      },
=======

      anthemText: {
        title: "Гимн тексти (Қарақалпақша)",
        lyrics: "Жәйҳун жағасында өскен байтерек,\nТүби бир, шақасы мың болар демек,\nСен сондай саялы, қуяшлы елсең,\nТынышлық ҳәм ығбал сендеги тилек.\n\nНақыраты:\nДыйхан баба нәпеси бар жеринде,\nЖуўсан аңқып, кийик қашар шөлинде,\n«Қарақалпақстан» деген атыңды,\nӘўладлар әдиўлер жүрек төринде.\n\nАйдын келешекке шақырар заман,\nМәртлик мийнет, билим жеткизер оған,\nХалқың бар азамат, дос ҳәм мийрибан,\nЕркин жайнап-жаснап, мәңги бол аман.\n\nНақыраты:\nДыйхан баба нәпеси бар жеринде,\nЖуўсан аңқып, кийик қашар шөлинде,\n«Қарақалпақстан» деген атыңды,\nӘўладлар әдиўлер жүрек төринде."
      },

>>>>>>> ada8ad33363af76bb9bc1b46ad8fc671bbe1487d
      summary: {
        title: "Қысқаша анықлама",
        name: "Аты",
        nameValue: "Қарақалпақстан Республикасының Мәмлекетлик гимни",
        year: "Бекитилген жылы",
<<<<<<< HEAD
        yearValue: "1993-12-24",
        authors: "Авторлар",
        meaning: "Мәнис",
        meaningValue: "Тынышлық, мийнет, қәдир-қымбат, келешек, туўылған жерге муҳабат"
      },
      shareTitle: "Биз бенен байланысың", copyLink: "Силтемени көшириў", copied: "Көширилди!"
    },
    RU: {
      title: "ГОСУДАРСТВЕННЫЙ ГИМН РЕСПУБЛИКИ КАРАКАЛПАКСТАН",
=======
        yearValue: "1993.12.24",
        authors: "Авторлар",
        meaning: "Мәнис",
        meaningValue: "Тынышлық, мийнет, қәдир-қымбат, келешек, туўылған жерге мухаббат"
      },

      join: {
        title: "Қарақалпақстан даўысын қоллап-қуўатлаң!",
        subtitle: "Даўысыңызды белгилең, халыққа қосылың. Биз бирге күшлимиз!",
        button: "Қосылыў"
      }
    },

    RU: {
      title: "ГОСУДАРСТВЕННЫЙ ГИМН РЕСПУБЛИКИ КАРАКАЛПАКСТАН",
      
>>>>>>> ada8ad33363af76bb9bc1b46ad8fc671bbe1487d
      section1: {
        title: "Общая информация",
        status: "Статус",
        statusDesc: "Государственный символ Республики Каракалпакстан",
        legal: "Правовая основа",
        legalDesc: "Закон «О Государственном гимне Республики Каракалпакстан»",
        date: "Дата принятия",
        dateDesc: "24 декабря 1993 года",
        organ: "Орган",
        organDesc: "XIV сессия Верховного Совета Республики Каракалпакстан"
      },
<<<<<<< HEAD
=======

>>>>>>> ada8ad33363af76bb9bc1b46ad8fc671bbe1487d
      section2: {
        title: "Авторы",
        music: "Музыка",
        musicAuthor: "Наджимаддин Мухаммеддинов",
        lyrics: "Слова",
<<<<<<< HEAD
        lyricsAuthor: "Ибрагим Юсупов"
      },
=======
        lyricsAuthor: "Ибраим Юсупов"
      },

>>>>>>> ada8ad33363af76bb9bc1b46ad8fc671bbe1487d
      section3: {
        title: "Идея и содержание гимна",
        intro: "Гимн Республики Каракалпакстан отражает ключевые ценности народа и особенности родной земли:",
        values: [
          "Величие и красоту края, расположенного у берегов Жайхуна",
          "Мирный характер страны и стремление к благополучию",
          "Трудолюбие, мужество и доброту народа",
          "Уважение к истории и традициям",
          "Стремление к знаниям, развитию и светлому будущему",
          "Идею сохранения имени «Каракалпакстан» в сердцах будущих поколений"
        ]
      },
<<<<<<< HEAD
=======

>>>>>>> ada8ad33363af76bb9bc1b46ad8fc671bbe1487d
      section4: {
        title: "Символическое значение",
        intro: "Гимн выполняет несколько важных функций:",
        functions: [
          { title: "Объединяющая", desc: "Укрепляет национальное единство и общую идентичность" },
          { title: "Историческая", desc: "Передает преемственность поколений" },
          { title: "Воспитательная", desc: "Формирует уважение к родной земле и государственным ценностям" },
          { title: "Торжественная", desc: "Сопровождает государственные мероприятия, церемонии и официальные события" }
        ]
      },
<<<<<<< HEAD
=======

>>>>>>> ada8ad33363af76bb9bc1b46ad8fc671bbe1487d
      section5: {
        title: "Использование гимна",
        intro: "Государственный гимн исполняется:",
        uses: [
          "На официальных мероприятиях Республики Каракалпакстан",
          "При поднятии государственного флага",
          "На международных встречах и дипломатических приемах",
          "В образовательных учреждениях в рамках патриотического воспитания"
        ]
      },
<<<<<<< HEAD
=======

>>>>>>> ada8ad33363af76bb9bc1b46ad8fc671bbe1487d
      section6: {
        title: "Визуальные символы",
        icons: [
          { title: "Принят в 1993 году", icon: BookOpen },
          { title: "Музыка: Н. Мухаммеддинов", icon: Music },
          { title: "Слова: И. Юсупов", icon: Feather },
          { title: "Красота родной земли", icon: Mountain },
          { title: "В сердцах поколений", icon: Heart },
          { title: "Народ, культура, преемственность", icon: Users }
        ]
      },
<<<<<<< HEAD
      anthemText: {
        title: "Текст гимна (перевод на русский)",
        lyrics: `На берегу Джейхуна растёт высокий тополь,
Корням которого тысяча лет,
Ты такой тенистый, солнечный край,
Твое желание это счастье и мир.

Припев:
Дыхание дедушки дехканина есть на твоей земле,
Полынью пахнет, сайгак бегает по твоим пустыням,
Твоё имя «Каракалпакстан, Каракалпакстан»
Потомки произносят в глубине своего сердца.

В светлое будущее зовёт эта эпоха,
Мужество и мудрость преподносят,
Твой народ мужественен, дружелюбен и добр,
Свободным цвети и развивайся, навечно будь таким.

Припев:
Дыхание дедушки дехканина есть на твоей земле,
Полынью пахнет, сайгак бегает по твоим пустыням,
Твоё имя «Каракалпакстан, Каракалпакстан»
Потомки произносят в глубине своего сердца.`
      },
=======

      anthemText: {
        title: "Текст гимна (перевод на русский)",
        lyrics: "На берегу Джейхуна растёт высокий тополь,\nКорням которого тысяча лет,\nТы такой тенистый, солнечный край,\nТвое желание это счастье и мир.\n\nПрипев:\nДыхание дедушки дехканина есть на твоей земле,\nПолынью пахнет, сайгак бегает по твоим пустыням,\nТвоё имя «Каракалпакстан, Каракалпакстан»\nПотомки произносят в глубине своего сердца.\n\nВ светлое будущее зовёт эта эпоха,\nМужество и мудрость преподносят,\nТвой народ мужественен, дружелюбен и добр,\nСвободным цвети и развивайся, навечно будь таким.\n\nПрипев:\nДыхание дедушки дехканина есть на твоей земле,\nПолынью пахнет, сайгак бегает по твоим пустыням,\nТвоё имя «Каракалпакстан, Каракалпакстан»\nПотомки произносят в глубине своего сердца."
      },

>>>>>>> ada8ad33363af76bb9bc1b46ad8fc671bbe1487d
      summary: {
        title: "Краткая справка",
        name: "Название",
        nameValue: "Государственный гимн Республики Каракалпакстан",
        year: "Год утверждения",
<<<<<<< HEAD
        yearValue: "1993-12-24",
=======
        yearValue: "1993.12.24",
>>>>>>> ada8ad33363af76bb9bc1b46ad8fc671bbe1487d
        authors: "Авторы",
        meaning: "Смысл",
        meaningValue: "Мир, труд, достоинство, будущее, любовь к родной земле"
      },
<<<<<<< HEAD
      shareTitle: "Свяжитесь с нами", copyLink: "Скопировать ссылку", copied: "Скопировано!"
   },
    EN: {
      title: "STATE ANTHEM OF THE REPUBLIC OF KARAKALPAKSTAN",
=======

      join: {
        title: "Поддержите голос Каракалпакстана!",
        subtitle: "Выразите свою поддержку, присоединяйтесь к народу. Вместе мы сильнее!",
        button: "Присоединиться"
      }
    },

    EN: {
      title: "STATE ANTHEM OF THE REPUBLIC OF KARAKALPAKSTAN",
      
>>>>>>> ada8ad33363af76bb9bc1b46ad8fc671bbe1487d
      section1: {
        title: "General Information",
        status: "Status",
        statusDesc: "State symbol of the Republic of Karakalpakstan",
        legal: "Legal basis",
        legalDesc: "Law 'On the State Anthem of the Republic of Karakalpakstan'",
        date: "Date of adoption",
        dateDesc: "December 24, 1993",
        organ: "Authority",
        organDesc: "XIV session of the Supreme Council of the Republic of Karakalpakstan"
      },
<<<<<<< HEAD
=======

>>>>>>> ada8ad33363af76bb9bc1b46ad8fc671bbe1487d
      section2: {
        title: "Authors",
        music: "Music",
        musicAuthor: "Nadjimaddin Mukhammeddinov",
        lyrics: "Lyrics",
        lyricsAuthor: "Ibragim Yusupov"
      },
<<<<<<< HEAD
=======

>>>>>>> ada8ad33363af76bb9bc1b46ad8fc671bbe1487d
      section3: {
        title: "Idea and Content of the Anthem",
        intro: "The anthem of the Republic of Karakalpakstan reflects the key values of the people and features of the native land:",
        values: [
          "The greatness and beauty of the region located on the shores of Jayhun",
          "The peaceful nature of the country and aspiration for prosperity",
          "The industriousness, courage and kindness of the people",
          "Respect for history and traditions",
          "Striving for knowledge, development and a bright future",
          "The idea of preserving the name 'Karakalpakstan' in the hearts of future generations"
        ]
      },
<<<<<<< HEAD
=======

>>>>>>> ada8ad33363af76bb9bc1b46ad8fc671bbe1487d
      section4: {
        title: "Symbolic Meaning",
        intro: "The anthem performs several important functions:",
        functions: [
          { title: "Unifying", desc: "Strengthens national unity and common identity" },
          { title: "Historical", desc: "Transmits continuity of generations" },
          { title: "Educational", desc: "Forms respect for the native land and state values" },
          { title: "Ceremonial", desc: "Accompanies state events, ceremonies and official occasions" }
        ]
      },
<<<<<<< HEAD
=======

>>>>>>> ada8ad33363af76bb9bc1b46ad8fc671bbe1487d
      section5: {
        title: "Use of the Anthem",
        intro: "The state anthem is performed:",
        uses: [
          "At official events of the Republic of Karakalpakstan",
          "During the raising of the state flag",
          "At international meetings and diplomatic receptions",
          "In educational institutions as part of patriotic education"
        ]
      },
<<<<<<< HEAD
=======

>>>>>>> ada8ad33363af76bb9bc1b46ad8fc671bbe1487d
      section6: {
        title: "Visual Symbols",
        icons: [
          { title: "Adopted in 1993", icon: BookOpen },
          { title: "Music: N. Mukhammeddinov", icon: Music },
          { title: "Lyrics: I. Yusupov", icon: Feather },
          { title: "Beauty of native land", icon: Mountain },
          { title: "In the hearts of generations", icon: Heart },
          { title: "People, culture, continuity", icon: Users }
        ]
      },
<<<<<<< HEAD
      anthemText: {
        title: "Anthem Text (English translation)",
        lyrics: `On the banks of Jayhun grows a tall poplar,
Whose roots are a thousand years old,
You are such a shady, sunny land,
Your wish is happiness and peace.

Chorus:
The breath of grandfather farmer is on your land,
Smelling of wormwood, saiga runs through your deserts,
Your name "Karakalpakstan, Karakalpakstan"
Descendants pronounce in the depths of their hearts.

This era calls to a bright future,
Courage and wisdom present,
Your people are courageous, friendly and kind,
Flourish freely and develop, be forever so.

Chorus:
The breath of grandfather farmer is on your land,
Smelling of wormwood, saiga runs through your deserts,
Your name "Karakalpakstan, Karakalpakstan"
Descendants pronounce in the depths of their hearts.`
      },
=======

      anthemText: {
        title: "Anthem Text (English translation)",
        lyrics: "On the banks of Jayhun grows a tall poplar,\nWhose roots are a thousand years old,\nYou are such a shady, sunny land,\nYour wish is happiness and peace.\n\nChorus:\nThe breath of grandfather farmer is on your land,\nSmelling of wormwood, saiga runs through your deserts,\nYour name \"Karakalpakstan, Karakalpakstan\"\nDescendants pronounce in the depths of their hearts.\n\nThis era calls to a bright future,\nCourage and wisdom present,\nYour people are courageous, friendly and kind,\nFlourish freely and develop, be forever so.\n\nChorus:\nThe breath of grandfather farmer is on your land,\nSmelling of wormwood, saiga runs through your deserts,\nYour name \"Karakalpakstan, Karakalpakstan\"\nDescendants pronounce in the depths of their hearts."
      },

>>>>>>> ada8ad33363af76bb9bc1b46ad8fc671bbe1487d
      summary: {
        title: "Brief Summary",
        name: "Name",
        nameValue: "State Anthem of the Republic of Karakalpakstan",
        year: "Year of approval",
<<<<<<< HEAD
        yearValue: "1993-12-24",
=======
        yearValue: "24.12.1993",
>>>>>>> ada8ad33363af76bb9bc1b46ad8fc671bbe1487d
        authors: "Authors",
        meaning: "Meaning",
        meaningValue: "Peace, labor, dignity, future, love for native land"
      },
<<<<<<< HEAD
      shareTitle: "Connect with us", copyLink: "Copy Link", copied: "Copied!"
    },
    PL: {
      title: "HYMN PAŃSTWOWY REPUBLIKI KARAKAŁPAKSTANU",
=======

      join: {
        title: "Support the Voice of Karakalpakstan!",
        subtitle: "Make your voice heard, join the people. Together we are stronger!",
        button: "Join"
      }
    },

    PL: {
      title: "HYMN PAŃSTWOWY REPUBLIKI KARAKAŁPAKSTANU",
      
>>>>>>> ada8ad33363af76bb9bc1b46ad8fc671bbe1487d
      section1: {
        title: "Informacje ogólne",
        status: "Status",
        statusDesc: "Symbol państwowy Republiki Karakałpakstanu",
        legal: "Podstawa prawna",
        legalDesc: "Ustawa 'O Hymnie Państwowym Republiki Karakałpakstanu'",
        date: "Data przyjęcia",
        dateDesc: "24 grudnia 1993 roku",
        organ: "Organ",
        organDesc: "XIV sesja Rady Najwyższej Republiki Karakałpakstanu"
      },
<<<<<<< HEAD
=======

>>>>>>> ada8ad33363af76bb9bc1b46ad8fc671bbe1487d
      section2: {
        title: "Autorzy",
        music: "Muzyka",
        musicAuthor: "Nadżimaddin Muchammeddinow",
        lyrics: "Słowa",
        lyricsAuthor: "Ibragim Jusupow"
      },
<<<<<<< HEAD
=======

>>>>>>> ada8ad33363af76bb9bc1b46ad8fc671bbe1487d
      section3: {
        title: "Idea i treść hymnu",
        intro: "Hymn Republiki Karakałpakstanu odzwierciedla kluczowe wartości narodu i cechy ojczystej ziemi:",
        values: [
          "Wielkość i piękno regionu położonego nad brzegami Dżejchunu",
          "Pokojowy charakter kraju i dążenie do dobrobytu",
          "Pracowitość, męstwo i dobroć narodu",
          "Szacunek dla historii i tradycji",
          "Dążenie do wiedzy, rozwoju i jasnej przyszłości",
          "Idea zachowania nazwy 'Karakałpakstan' w sercach przyszłych pokoleń"
        ]
      },
<<<<<<< HEAD
=======

>>>>>>> ada8ad33363af76bb9bc1b46ad8fc671bbe1487d
      section4: {
        title: "Znaczenie symboliczne",
        intro: "Hymn pełni kilka ważnych funkcji:",
        functions: [
          { title: "Jednoczącą", desc: "Wzmacnia jedność narodową i wspólną tożsamość" },
          { title: "Historyczną", desc: "Przekazuje ciągłość pokoleń" },
          { title: "Wychowawczą", desc: "Kształtuje szacunek dla ojczystej ziemi i wartości państwowych" },
          { title: "Uroczystą", desc: "Towarzyszy wydarzeniom państwowym, ceremoniom i oficjalnym okazjom" }
        ]
      },
<<<<<<< HEAD
=======

>>>>>>> ada8ad33363af76bb9bc1b46ad8fc671bbe1487d
      section5: {
        title: "Użycie hymnu",
        intro: "Hymn państwowy jest wykonywany:",
        uses: [
          "Podczas oficjalnych wydarzeń Republiki Karakałpakstanu",
          "Przy podnoszeniu flagi państwowej",
          "Na spotkaniach międzynarodowych i przyjęciach dyplomatycznych",
          "W placówkach edukacyjnych w ramach edukacji patriotycznej"
        ]
      },
<<<<<<< HEAD
=======

>>>>>>> ada8ad33363af76bb9bc1b46ad8fc671bbe1487d
      section6: {
        title: "Symbole wizualne",
        icons: [
          { title: "Przyjęty w 1993 roku", icon: BookOpen },
          { title: "Muzyka: N. Muchammeddinow", icon: Music },
          { title: "Słowa: I. Jusupow", icon: Feather },
          { title: "Piękno ojczystej ziemi", icon: Mountain },
          { title: "W sercach pokoleń", icon: Heart },
          { title: "Naród, kultura, ciągłość", icon: Users }
        ]
      },
<<<<<<< HEAD
      anthemText: {
        title: "Tekst hymnu (tłumaczenie na polski)",
        lyrics: `Nad brzegami Dżejchunu rośnie wysoka topola,
Której korzenie mają tysiąc lat,
Jesteś taką cienistą, słoneczną krainą,
Twoim życzeniem jest szczęście i pokój.

Refren:
Oddech dziadka rolnika jest na twojej ziemi,
Pachnie piołunem, sajga biega po twoich pustyniach,
Twoje imię "Karakałpakstan, Karakałpakstan"
Potomkowie wymawiają w głębi swoich serc.

Ta epoka wzywa do jasnej przyszłości,
Męstwo i mądrość przedstawiają,
Twój naród jest odważny, przyjazny i dobry,
Kwitnij swobodnie i rozwijaj się, bądź na zawsze taki.

Refren:
Oddech dziadka rolnika jest na twojej ziemi,
Pachnie piołunem, sajga biega po twoich pustyniach,
Twoje imię "Karakałpakstan, Karakałpakstan"
Potomkowie wymawiają w głębi swoich serc.`
      },
=======

      anthemText: {
        title: "Tekst hymnu (tłumaczenie na polski)",
        lyrics: "Nad brzegami Dżejchunu rośnie wysoka topola,\nKtórej korzenie mają tysiąc lat,\nJesteś taką cienistą, słoneczną krainą,\nTwoim życzeniem jest szczęście i pokój.\n\nRefren:\nOddech dziadka rolnika jest na twojej ziemi,\nPachnie piołunem, sajga biega po twoich pustyniach,\nTwoje imię \"Karakałpakstan, Karakałpakstan\"\nPotomkowie wymawiają w głębi swoich serc.\n\nTa epoka wzywa do jasnej przyszłości,\nMęstwo i mądrość przedstawiają,\nTwój naród jest odważny, przyjazny i dobry,\nKwitnij swobodnie i rozwijaj się, bądź na zawsze taki.\n\nRefren:\nOddech dziadka rolnika jest na twojej ziemi,\nPachnie piołunem, sajga biega po twoich pustyniach,\nTwoje imię \"Karakałpakstan, Karakałpakstan\"\nPotomkowie wymawiają w głębi swoich serc."
      },

>>>>>>> ada8ad33363af76bb9bc1b46ad8fc671bbe1487d
      summary: {
        title: "Krótkie podsumowanie",
        name: "Nazwa",
        nameValue: "Hymn Państwowy Republiki Karakałpakstanu",
        year: "Rok zatwierdzenia",
<<<<<<< HEAD
        yearValue: "1993-12-24",
=======
        yearValue: "24.12.1993",
>>>>>>> ada8ad33363af76bb9bc1b46ad8fc671bbe1487d
        authors: "Autorzy",
        meaning: "Znaczenie",
        meaningValue: "Pokój, praca, godność, przyszłość, miłość do ojczystej ziemi"
      },
<<<<<<< HEAD
        shareTitle: "Połącz się z nami", copyLink: "Kopiuj link", copied: "Skopiowano!"
    }
  };

  const t = translations[lang] || translations['RU'];
=======

      join: {
        title: "Wesprzyj głos Karakałpakstanu!",
        subtitle: "Wyraź swoje poparcie, dołącz do narodu. Razem jesteśmy silniejsi!",
        button: "Dołącz"
      }
    }
  };

  const t = translations[lang];
>>>>>>> ada8ad33363af76bb9bc1b46ad8fc671bbe1487d

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-black text-gray-900 dark:text-white">
      <div className="max-w-6xl mx-auto px-6 py-20">
        
<<<<<<< HEAD
        {/* 🎵 ANTHEM VIDEO */}
        <section className="mb-16 bg-black rounded-2xl overflow-hidden shadow-2xl">
          <div className="relative w-full aspect-video">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/ftA4RdDbl5M"
              title="Karakalpakstan State Anthem"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          <div className="p-4 text-center text-white bg-gradient-to-r from-purple-700 to-pink-700">
            <p className="text-sm opacity-90">
              Қарақалпақстан Республикасының Мәмлекетлик гимни (ресмий видео)
            </p>
          </div>
        </section>

=======
>>>>>>> ada8ad33363af76bb9bc1b46ad8fc671bbe1487d
        <div className="text-center mb-16">
          <Volume2 className="w-20 h-20 mx-auto mb-6 text-purple-600 dark:text-purple-400 animate-pulse" />
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {t.title}
          </h1>
        </div>

        <section className="mb-16 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-purple-600" />
            {t.section1.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
              <h3 className="font-bold text-purple-700 dark:text-purple-400 mb-2">{t.section1.status}</h3>
              <p>{t.section1.statusDesc}</p>
            </div>
            <div className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
              <h3 className="font-bold text-purple-700 dark:text-purple-400 mb-2">{t.section1.legal}</h3>
              <p>{t.section1.legalDesc}</p>
            </div>
            <div className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
              <h3 className="font-bold text-purple-700 dark:text-purple-400 mb-2">{t.section1.date}</h3>
              <p>{t.section1.dateDesc}</p>
            </div>
            <div className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
              <h3 className="font-bold text-purple-700 dark:text-purple-400 mb-2">{t.section1.organ}</h3>
              <p>{t.section1.organDesc}</p>
            </div>
          </div>
        </section>

        <section className="mb-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 shadow-2xl text-white">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Music className="w-8 h-8" />
            {t.section2.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-center gap-4 p-6 bg-white/10 backdrop-blur-sm rounded-xl">
              <Music className="w-12 h-12" />
              <div>
                <h3 className="font-bold text-lg mb-1">{t.section2.music}</h3>
                <p className="text-xl">{t.section2.musicAuthor}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-white/10 backdrop-blur-sm rounded-xl">
              <Feather className="w-12 h-12" />
              <div>
                <h3 className="font-bold text-lg mb-1">{t.section2.lyrics}</h3>
                <p className="text-xl">{t.section2.lyricsAuthor}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
          <h2 className="text-3xl font-bold mb-6">{t.section3.title}</h2>
          <p className="text-lg mb-6">{t.section3.intro}</p>
          <ul className="space-y-3">
            {t.section3.values.map((value, i) => (
              <li key={i} className="flex items-start gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <span className="text-purple-600 dark:text-purple-400 font-bold text-lg">•</span>
                <span>{value}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
          <h2 className="text-3xl font-bold mb-6">{t.section4.title}</h2>
          <p className="text-lg mb-8">{t.section4.intro}</p>
          <div className="grid md:grid-cols-2 gap-6">
            {t.section4.functions.map((func, i) => (
              <div key={i} className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
                <h3 className="text-xl font-bold text-purple-700 dark:text-purple-400 mb-3">{func.title}</h3>
<<<<<<< HEAD
                <p>{func.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
          <h2 className="text-3xl font-bold mb-6">{t.section5.title}</h2>
          <p className="text-lg mb-6">{t.section5.intro}</p>
          <div className="grid md:grid-cols-2 gap-4">
            {t.section5.uses.map((use, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
                  {i + 1}
                </div>
                <span>{use}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
          <h2 className="text-3xl font-bold mb-8">{t.section6.title}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {t.section6.icons.map((item, i) => {
              const IconComponent = item.icon;
              return (
                <div key={i} className="flex flex-col items-center text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl hover:scale-105 transition-all">
                  <IconComponent className="w-12 h-12 text-purple-600 dark:text-purple-400 mb-4" />
                  <p className="font-medium">{item.title}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mb-16 bg-gradient-to-br from-purple-600 via-pink-600 to-purple-600 rounded-2xl p-8 shadow-2xl text-white">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Music className="w-8 h-8" />
            {t.anthemText.title}
          </h2>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
            <pre className="whitespace-pre-wrap text-lg leading-relaxed font-serif">
              {t.anthemText.lyrics}
            </pre>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
          <h2 className="text-3xl font-bold mb-6">{t.summary.title}</h2>
          <div className="space-y-4">
            <div className="p-5 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
              <h3 className="font-bold text-purple-700 dark:text-purple-400 mb-2">{t.summary.name}</h3>
              <p className="text-lg">{t.summary.nameValue}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-5 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                <h3 className="font-bold text-purple-700 dark:text-purple-400 mb-2">{t.summary.year}</h3>
                <p className="text-lg">{t.summary.yearValue}</p>
              </div>
              <div className="p-5 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                <h3 className="font-bold text-purple-700 dark:text-purple-400 mb-2">{t.summary.authors}</h3>
                <p>{t.section2.musicAuthor}</p>
                <p>{t.section2.lyricsAuthor}</p>
              </div>
            </div>
            <div className="p-5 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
              <h3 className="font-bold text-purple-700 dark:text-purple-400 mb-2">{t.summary.meaning}</h3>
              <p className="text-lg">{t.summary.meaningValue}</p>
            </div>
          </div>
        </section>

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
=======
>>>>>>> ada8ad33363af76bb9bc1b46ad8fc671bbe1487d
