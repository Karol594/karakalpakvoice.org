import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, X, Download, ZoomIn, ZoomOut, RotateCcw, ExternalLink, Copy, Check } from 'lucide-react';

// --- СЛАЙДЕР КОМПОНЕНТИ ---
const Slider = ({ images, current, setCurrent }) => (
  <div className="relative group rounded-xl overflow-hidden shadow-md">
    <img 
      src={images[current]} 
      alt="Тарыхый байрак" 
      className="w-full h-64 object-contain bg-gray-100 dark:bg-gray-700 cursor-pointer hover:scale-105 transition-transform duration-500" 
    />
    <button 
      onClick={(e) => { e.stopPropagation(); setCurrent((current - 1 + images.length) % images.length); }} 
      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all"
    >
      <ChevronLeft size={20} />
    </button>
    <button 
      onClick={(e) => { e.stopPropagation(); setCurrent((current + 1) % images.length); }} 
      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all"
    >
      <ChevronRight size={20} />
    </button>
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
      {images.map((_, idx) => (
        <div key={idx} className={`w-2 h-2 rounded-full ${current === idx ? 'bg-white' : 'bg-white/50'}`} />
      ))}
    </div>
  </div>
);

export default function FlagPage() {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'RU');
  const [currentSlider1, setCurrentSlider1] = useState(0);
  const [currentSlider2, setCurrentSlider2] = useState(0);

  // --- LIGHTBOX ЖАНА ЗУМ АБАЛДАРЫ ---
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {

    window.scrollTo(0, 0);
    const handleLangUpdate = (event) => { if (event.detail?.lang) setLang(event.detail.lang); };
    window.addEventListener('languageChange', handleLangUpdate);
    return () => window.removeEventListener('languageChange', handleLangUpdate);
  }, []);

  // --- АВТОМАТТЫК СЛАЙДЕР ---
  useEffect(() => {
    const int1 = setInterval(() => setCurrentSlider1(prev => (prev + 1) % 2), 3000); // 2 сүрөт үчүн
    const int2 = setInterval(() => setCurrentSlider2(prev => (prev + 1) % 2), 3000); // 2 сүрөт үчүн
    return () => { clearInterval(int1); clearInterval(int2); };
  }, []);

  const openLightbox = (src) => { setLightboxImages([src]); setLightboxIndex(0); setLightboxOpen(true); setScale(1); setPosition({ x: 0, y: 0 }); };
  const openLightboxGallery = (images, startIndex = 0) => { setLightboxImages(images); setLightboxIndex(startIndex); setLightboxOpen(true); setScale(1); setPosition({ x: 0, y: 0 }); };
  const closeLightbox = () => setLightboxOpen(false);
  const navigateLightbox = (dir) => { setLightboxIndex((prev) => (prev + dir + lightboxImages.length) % lightboxImages.length); setScale(1); setPosition({ x: 0, y: 0 }); };
  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.5, 4));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.5, 1));
  const resetZoom = () => { setScale(1); setPosition({ x: 0, y: 0 }); };
  const handleDownload = (src) => { const a = document.createElement('a'); a.href = src; a.download = src.split('/').pop(); a.click(); };

  const handleMouseDown = (e) => { if (scale > 1) { setIsDragging(true); setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y }); } };
  const handleMouseMove = (e) => { if (isDragging && scale > 1) setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y }); };
  const handleMouseUp = () => setIsDragging(false);

  // --- КОТОРМОЛОР (ТОЛУК АЛЫП КЕЛИГЕН) ---
  const translations = {
    RU: {
      intro: "«ГОСУДАРСТВЕННЫЙ ФЛАГ»",
      title: "ГОСУДАРСТВЕННЫЙ ФЛАГ РЕСПУБЛИКИ КАРАКАЛПАКСТАН",
      flagLaw: "Закон о Государственном флаге Суверенной Республики Каракалпакстан",
      download: "Скачать",
      colorToolTitle: "ОФИЦИАЛЬНЫЙ СТАНДАРТ ЦВЕТОВ:\nДля предотвращения искажения и сохранения оригинальных цветов коды HEX, RGB и CMYK полностью соответствуют официальным стандартам о государственных символах Республики Каракалпакстан.\nНажмите на цвет, чтобы скопировать код и обеспечить изготовление продукции в оригинальном цвете.\nЧтобы флаг на изделиях (ткани, бумаге или экране) отображался в подлинном оригинальном цвете, используйте следующие коды. Вы можете скопировать код, нажав на соответствующий цвет: Совет по использованию: Для экранного дизайна используйте коды HEX/RGB, а для печати на ткани или бумаге в типографии — коды CMYK.",
      crescentAndStarsTitle: "Полумесяц и звезды",
      howToUseTitle: "Как использовать?",
      howToUseText: "Скопируйте цвета: Вставьте соответствующий цветовой код в программу для дизайна (Photoshop, CorelDraw и т.д.).\nСоблюдайте пропорции: Если вы планируете использовать флаг в другом размере (например, в крупном формате или в виде маленького настольного флажка), пропорционально уменьшайте или увеличивайте вышеуказанные параметры.\nПроверьте: Лицевая и оборотная стороны флага должны быть симметричны относительно древка.\nДля предотвращения искажения и сохранения оригинальных цветов коды HEX, RGB и CMYK полностью соответствуют официальным стандартам о государственных символах Республики Каракалпакстан.\nНажмите на цвет, чтобы скопировать код и обеспечить изготовление продукции в оригинальном цвете.\nЭто важно для сохранения оригинального вида флага.",
      authorSection: {
        title: "АВТОР ФЛАГА",
        name: "Жоллыбай Изентаев",
        profession: "Народный художник Каракалпакстана",
        desc: "Известный художник, внесший огромный вклад в культуру и искусство Каракалпакстана, создавший эскиз Государственного флага. Нажмите, чтобы узнать больше.",
      },
      section1: { 
        title: "ИСТОРИЯ ПРИНЯТИЯ И ОФИЦИАЛЬНЫЙ ЗАКОН", 
        text: "Государственный флаг Республики Каракалпакстан является священным символом государственного суверенитета Республики.\nЗакон «О государственном флаге Республики Каракалпакстан» был принят 14 декабря 1992 года на XII сессии Верховного Совета Республики Каракалпакстан. Флаг - это символ, олицетворяющий наше прошлое, настоящее и светлое будущее." 
      },
      section2: { 
        title: "ОПИСАНИЕ И РАЗМЕРЫ ФЛАГА",
        text: "Государственный флаг Республики Каракалпакстан представляет собой прямоугольное полотнище, состоящее из трёх горизонтальных полос: синей, золотисто-жёлтой и зелёной.\nЖёлтую полосу отделяют белая и красная каймы (окантовки).",
        params: "Технические параметры:\nОфициальный размер флага — 250 см х 125 см (пропорция 2:1). Все детали должны быть размещены строго на основании следующих размеров:\nДля полного соответствия размеров флага официальным стандартам используйте следующие параметры:",
        specs: ["Длина: 250 см", "Ширина: 125 см", "Синяя и зелёная полосы: по 42 см", "Жёлтая полоса: 34 см", "Красные линии: 2,5 см", "Белые линии: 1 см",], 
        stars: "Полумесяц: Образуется путем пересечения двух окружностей (диаметрами 22 см и 19 см). Расстояние между центрами — 4 см. Расстояние от древка флага до полумесяца — 20 см.\nЗвезды: Пять звезд вписываются в прямоугольник размером 30 см х 15 см. Расстояние от древка флага до этого прямоугольника — 42 см.\nРасположение звезд: В два ряда (в верхнем ряду 2, в нижнем — 3 звезды). Каждая звезда должна вписываться в окружность диаметром 10 см.\nНижняя граница: Нижняя точка полумесяца и вершины лучей нижнего ряда звезд располагаются на одной горизонтальной линии на высоте 10 см от верхней белой полоски." 
      },
      section3: { 
        title: "ЗНАЧЕНИЕ СИМВОЛОВ", 
        intro: "Каждый цвет имеет глубокое значение:", 
        meanings: [
          {color: "Синий", desc: "Символ воды, весны и мира. У восточных народов этот цвет издревле почитается как знак чистоты и ясного неба."}, 
          {color: "Желтый(золотой)", desc: "Указывает на то, что большую часть территории Каракалпакстана занимают пустыни, а также символизирует плодородие, изобилие и гостеприимство."},
          {color: "Зеленый", desc: "Знак обновления природы, молодости, веры, духовного богатства и солнечного света."},
          {color: "Красный", desc: "Символ жизненной силы, текущей в жилах, и стремления к свободе."},
          {color: "Белый", desc: "Символ чистоты и внутреннего спокойствия."},
          {color: "Полумесяц", desc: "Священный символ мусульманских народов, неразрывно связанный с духовным наследием народа."},
          {color: "Пять звезд", desc: "Символизируют пять древнейших городов Каракалпакстана (Ургенч, Кунград, Ходжейли, Чимбай, Шаббаз (Беруни)), являющихся историческим фундаментом и символом верности традициям."}
        ] 
      },
      section4: {
    title: "ИСТОРИЧЕСКОЕ ПРОШЛОЕ",
    subtitle: "Эволюция флагов региона",
    intro: "До принятия современного флага на территории Каракалпакстана в разные периоды существовала следующая символика:",
    periods: [
      { period: "Хивинское ханство (1917–1920)", desc: "Флаг с жёлтой луной и звездой на чёрном фоне.", img: "/images/Flaga01.jpg" },
      { period: "Туркестанская АССР (1920–1921, 1921-1922, 1922-1923)", desc: "Символика полумесяца и звезды на красном фоне с зелёным кантоном.", imgs: ["/images/Flaga02.jpg", "/images/Flaga03.jpg", "/images/Flaga04.jpg", "/images/Flaga05.jpg"] },
      { period: "Хорезмская НСР (1923–1924)", desc: "Флаг с надписями на красном фоне.", img: "/images/Flaga06.jpg" },
      { period: "Каракалпакская АССР (1924–1937, 1937-1941, 1941-1952, 1952-1992)", desc: "Флаги советского периода, преимущественно красного цвета с названием республики.", imgs: ["/images/Flaga07.jpg", "/images/Flaga08.jpg", "/images/Flaga09.jpg", "/images/Flaga10.jpg"] },
      { period: "Суверенная Республика Каракалпакстан (1992.12.14)", desc: "Современный флаг.", img: "/images/Flaga11.jpg" }
    ]
  },
      section5: { 
        title: "ГОСУДАРСТВЕННЫЙ ФЛАГ — НАША ГОРДОСТЬ!", 
        text: "Государственный флаг Республики Каракалпакстан представляет нашу республику на международной арене:\nВо время официальных визитов, на конференциях, всемирных выставках и спортивных соревнованиях.\nНаш флаг развевается наравне с флагами других независимых государств перед зданием ООН.\nУважение к флагу — это патриотический долг и гордость каждого гражданина и каждого человека, живущего в Каракалпакстане.\nЭто символ нашей свободы, независимости и светлого будущего." 
      },
      conclusion: "ПУСТЬ НАШ ФЛАГ РАЗВЕВАЕТСЯ ВЫСОКО!"
    },
    KK: {
      intro: "«МӘМЛЕКЕТ БАЙРАҒЫ»",
      title: "ҚАРАҚАЛПАҚСТАН РЕСПУБЛИКАСЫНЫҢ МӘМЛЕКЕТЛИК БАЙРАҒЫ",
      flagLaw: "Суверен Қарақалпақстан Республикасының Мәмлекетлик байрағы ҳаққындағы нызам",
      download: "Жүклеп алыў",
      colorToolTitle: "РЕҢЛЕРДИҢ РЕСМИЙ СТАНДАРТЫ:\nТүслердиң бузылмаўы ҳәм оригинал түслердиң сақланыўы ушын HEX, RGB ҳәм CMYK кодлары Қарақалпақстан Республикасының мәмлекетлик нышанлары ҳаққындағы ресмий стандартларға толық сәйкес келеди. Түстиң үстине басыў арқалы кодты көширип алың ҳәм өнимниң оригинал түсте шығыўын тәмийинлең. Байрақтың өнимлерде (гезлемеде, қағазда яки экранда) нағыз оригинал реңинде шығыўы ушын төмендеги кодлардан пайдаланың. Түстиң үстине басыў арқылы кодты көширип алыўыңызға болады: Пайдаланыў ушын кеңес: Экрандағы дизайнлар ушын HEX/RGB, ал баспаханада гезлемеде яки қағазға басып шығарыў ушын CMYK кодларын қолланың.",
      crescentAndStarsTitle: "Ярым ай ҳәм жулдызлар",
      howToUseTitle: "Қалай пайдаланыў керек?",
      howToUseText: "Түслерди көширип алың: Дизайн бағдарламасында (Photoshop, CorelDraw т.б.) тийисли түс кодын қойың.\nПропорцияны сақлаң: Егер сиз байрақты басқа өлшемде (мысалы, үлкен формада яки кишкене стол байрағы) ислетпекши болсаңыз, жоқарыдағы пропорцияларды пропорционал түрде киширейтиң яки үлкейтиң.\nТексериң: Байрақтың алдынғы ҳәм артқы тәреплери сапқа салыстырмалы түрде симметриялы болыўы керек.\nБул байрақтың түпнуска көринисин сақлаў ушын әҳмийетли.",
      authorSection: {
        title: "БАЙРАҚТЫҢ АВТОРЫ",
        name: "Жоллыбай Изентаев",
        profession: "Қарақалпақстан халық художниги",
        desc: "Қарақалпақстан мәденияты ҳәм көркем өнерине үлкен үлес қосқан, мәмлекетлик байрақтың эскизин жаратқан белгили художник. Толық мағлыўмат ушын басың.",
      },
      section1: { 
        title: "ҚАБЫЛ ЕТИЛИЎ ТАРИЙХЫ ҲӘМ РЕСМИЙ НЫЗАМ", 
        text: "Қарақалпақстан Республикасының Мемлекетлик Байрағы — республиканың мемлекетлик Суверенитетиниң муқаддес символы болып табылады.\n«Қарақалпақстан Республикасының Мемлекетлик байрағы ҳаққында»ғы Нызам 1992-жыл 14-декабрьде Қарақалпақстан Республикасы Жоғарғы Кеңесиниң XII сессиясында қабыл етилди. Байрақ бизиң өтмишимиз, бүгинги күнимиз ҳәм жарқын келешегимизди өзинде жәмлеген нышандур." 
      },
      section2: { 
        title: "БАЙРАҚТЫҢ СЫПАТЛАМАСЫ ҲӘМ ӨЛШЕМЛЕРИ", 
        params: "Техникалық параметрлери: Байрақтың ресмий өлшеми 250 см х 125 см (пропорциясы 2:1). Барлық детальлар төмендеги қатаң өлшемлер тийкарында жайластырылыўы шәрт:Байрақ өлшемлериниң ресмий стандартларға толық сәйкес келиўи ушын төмендеги өлшемлерден пайдаланың.", 
        specs: ["Узынлығы: 250 см", "Ени: 125 см", "Көк полоса: 42 см", "Жасыл полоса: 42 см", "Сары (охра) полоса: 34 см", "Қызыл сызықлар (каёмкалар): 2,5 см", "Ақ сызықлар (каёмкалар): 1,0 см"], 
        stars: "Ярым ай: Еки шеңбердиң кесисиўинен пайда болады (диаметрлери 22 см ҳәм 19 см). Орайлары арасындағы аралық — 4 см. Байрақ сабынан ярым айға шекемги аралық — 20 см.\nЖулдызлар: Бес жулдыз 30 см х 15 см өлшемдеги тик төртмүйешликтиң ишине жайласады. Байрақ сабынан бул төртмүйешликке шекемги аралық — 42 см.\nЖулдыз жайласыўы: Еки қатарда (жоқарыда 2, төменде 3 жулдыз). Ҳәр бир жулдыз диаметри 10 см болған шеңберге сыйыўы тийис.\nТөменги шегара: Ярым айдың төменги ноқаты ҳәм төменги қатардағы жулдызлардың ушлары жоқарыдағы ақ сызықтан 10 см бийикликтеги бир горизонтал сызықта жайласады."
      },
      section3: { 
        title: "СИМВОЛЛАРДЫҢ МӘНИСИ", 
        intro: "Байрақтағы ҳәр бир рең терең мәниге ийе:", 
        meanings: [
          {color: "Көк түс:", desc: "Суўдың, бәҳәрдиң ҳәм тынышлықтың символы. Бул рең шығыс халықларында әзелден пәклик ҳәм ашық аспан белгиси сыпатында қәдирленеди."}, 
          {color: "Сары (алтын) түс:", desc: "Қарақалпақстан аймағының басым бөлеги шөллерден ибарат екенлигин, сондай-ақ берекет ҳәм миймандослықты аңлатады."},
          {color: "Жасыл түс:", desc: "Тәбияттың жаңаланыўы, жасарыў, исеним, руўханый байлық ҳәм күн нурының белгиси."},
          {color: "Қызыл сызық:", desc: "Қан тамырларда ағып турған өмир қуўаты ҳәм азатлыққа умтылыўдың тымсалы."},
          {color: "Ақ сызық:", desc: "Пәклик ҳәм тынышлық символы."},
          {color: "Ярым ай", desc: "Мусылман халықлары ушын муқаддес символ, халықтың руўханый мийрасы менен байланыслы."},
          {color: "Бес жулдыз", desc: "Қарақалпақстанның әййемги бес қаласының (Гөне-Үргениш, Қоңырат, Хожели, Шымбай, Шаббаз (Беруний)) белгиси болып, бул қалалар тарийхый тийкар ҳәм исеним символы болып табылады."}
        ] 
      },
      section4: {
        title: "ТАРИЙХЫЙ ӨТМИШ",
        subtitle: "Аймақтағы байрақлар эволюциясы",
        intro: "Бүгинги байрағымыз қабыл етилгенге шекем Қарақалпақстан аймағында ҳәр-түрли дәўирлерге байланыслы мәмлекетлик нышанлары болған:",
        periods: [
          { period: "Хийўа ханлығы дәўири (1917–1920)", desc: "Қара фондағы сары ай ҳәм жулдыз сүўретленген байрақ.", img: "/images/Flaga01.jpg" },
          { period: "Түркистан АССР (1920–1920, 1920–1921, 1921-1922, 1922-1923)", desc: "Қызыл фон ҳәм жасыл кантондағы ай-жулдыз таңбасы.", imgs: ["/images/Flaga02.jpg", "/images/Flaga03.jpg", "/images/Flaga04.jpg", "/images/Flaga05.jpg"] },
          { period: "Хорезм Халық Совет Республикасы (1923–1924)", desc: "Қызыл фонда жазыўлар түсирилген байрақ.", img: "/images/Flaga06.jpg" },
          { period: "Қарақалпақстан АССР (1924–1937, 1937-1941, 1941-1952, 1952-1992)", desc: "Совет дәўириндеги байрақлар, тийкарынан қызыл фонда республика аты жазылған.", imgs: ["/images/Flaga07.jpg", "/images/Flaga08.jpg", "/images/Flaga09.jpg", "/images/Flaga10.jpg"] },
          { period: "Суверенли Қарақалпақстан республикасы (1992-12-14)", desc: "Ҳәзирги күндеги байрақ.", img: "/images/Flaga11.jpg" }
        ]
      },
      section5: { 
        title: "МЕМЛЕКЕТЛИК БАЙРАҚ — МАҚТАНЫШЫМЫЗ!", 
        text: "Қарақалпақстан Республикасының Мемлекетлик байрағы халықаралық майданларда — ресмий делегациялардың сапарларында, халықаралық конференцияларда, дүньялық көрмелерде ҳәм спорт жарысларында республикамыздың намысын қорғайды.\nБайрағымыз БМШ имараты алдында басқа Ғәрезсиз мәмлекетлердиң байрақлары менен тең ҳуқықлы дәрежеде желбирейди. Бул еркинлигимиз ҳәм жарқын келешегимиздиң белгиси. Өз байрағын ҳүрметлеў — ҳәр бир пуқараның, Қарақалпақстанда жасаўшы ҳәр бир инсанның перзентлик парызы ҳәм мақтанышы болып табылады. Бул еркинлигимиз ҳәм жарқын келешегимиздиң белгиси." 
      },
      conclusion: "БАЙРАҒЫМЫЗ — БИЙИКЛЕРДЕ ЖЕЛБИРЕЙ БЕРСИН!"
    },
    EN: {
      intro: "«NATIONAL FLAG»",
      title: "THE STATE FLAG OF THE REPUBLIC OF KARAKALPAKSTAN",
      flagLaw: "Law on the State Flag of the Sovereign Republic of Karakalpakstan",
      download: "Download",
      colorToolTitle: "OFFICIAL COLOR STANDARD:\nTo prevent distortion and preserve the original colors, the HEX, RGB and CMYK codes fully comply with the official standards on the state symbols of the Republic of Karakalpakstan.\nClick on the color to copy the code and ensure that the products are produced in the original color.\nTo have the flag displayed in its true original color on products (fabric, paper, or screen), use the following codes. You can copy the code by clicking on the appropriate color: Tip for use: Use HEX/RGB codes for screen design, and CMYK codes for printing on fabric or paper in a printing house.",
      crescentAndStarsTitle: "Crescent and stars",
      howToUseTitle: "How to use it?",
      howToUseText: "Copy the colors: Paste the appropriate color code into a design program (Photoshop, CorelDRAW, etc.).\nKeep the proportions in mind: If you plan to use the flag in a different size (for example, in a large format or as a small desktop flag), reduce or increase the above parameters proportionally.\nCheck: The obverse and reverse sides of the flag must be symmetrical relative to the flagpole.\nTo prevent distortion and preserve the original colors, the HEX, RGB and CMYK codes fully comply with the official standards on the state symbols of the Republic of Karakalpakstan.\nClick on the color to copy the code and ensure that the products are manufactured in the original color. This is important to preserve the original appearance of the flag.",
      authorSection: {
        title: "FLAG AUTHOR",
        name: "Zhollibay Izentaev",
        profession: "People's Artist of Karakalpakstan",
        desc: "A famous artist who made a huge contribution to the culture and art of Karakalpakstan, who created a sketch of the National Flag. Click to learn more.",
        wiki: "Read on Wikipedia"
      },
      section1: {
        title: "ADOPTION HISTORY AND OFFICIAL LAW",
        text: `The State Flag of the Republic of Karakalpakstan is a sacred symbol of the state sovereignty of the Republic.

The Law "On the State Flag of the Republic of Karakalpakstan" was adopted on December 14, 1992, at the XII session of the Supreme Council of the Republic of Karakalpakstan. The flag is a symbol representing our past, present, and bright future.`
      },
      section2: {
        title: "DESCRIPTION AND DIMENSIONS OF THE FLAG:",
        text: "The national flag of the Republic of Karakalpakstan is a rectangular panel consisting of three horizontal stripes: blue, golden yellow and green.\nThe yellow stripe is separated by white and red borders (edging).",
        params: "Technical Parameters:\n The official size of the flag is 250 cm x 125 cm (proportion 2:1). All parts must be placed strictly based on the following dimensions:\nTo fully match the size of the flag to the official standards, use the following parameters:",
        specs: [
          "Length: 250 cm",
          "Width: 125 cm",
          "Blue and green stripes: 42 cm each",
          "Yellow stripe: 34 cm",
          "Red lines: 2.5 cm",
          "White lines: 1 cm"
        ],
        stars: "Crescent: Formed by the intersection of two circles (22 cm and 19 cm in diameter). The distance between the centers is 4 cm. The distance from the flag pole to the crescent moon is 20 cm.\nStars: Five stars fit into a rectangle measuring 30 cm x 15 cm. The distance from the flag pole to this rectangle is 42 cm.\nThe position of the stars: In two rows (2 in the upper row, 3 in the lower row). Each star should fit into a circle with a diameter of 10 cm.\nLower boundary: The lower point of the crescent moon and the tops of the rays of the lower row of stars are located on the same horizontal line at a height of 10 cm from the upper white stripe."
      },
      section3: {
        title: "THE MEANING OF SYMBOLS",
        intro: "Each color has a deep meaning:",
        meanings: [
          { color: "Blue:", desc: "A symbol of water, spring, and peace. In Eastern cultures, this color has long been revered as a sign of purity and the clear sky." },
          { color: "Yellow (Gold):", desc: "Represents the fact that a large part of Karakalpakstan’s territory consists of deserts, while also symbolizing abundance, fertility, and hospitality." },
          {color: "Red", desc: "a symbol of the vitality flowing through the veins and the desire for freedom."},
          { color: "Green:", desc: "A sign of the renewal of nature, youth, faith, spiritual wealth, and sunlight." },
          { color: "White:", desc: "a symbol of purity and inner peace." },
          { color: "Crescent Moon:", desc: "It is a sacred symbol of the Muslim peoples, inextricably linked with the spiritual heritage of the people." },
          { color: "Five Stars:", desc: "They symbolize the five oldest cities of Karakalpakstan (Urgench, Kungrad, Khojeyli, Chimbay, Shabbaz (Beruni)), which are the historical foundation and a symbol of loyalty to traditions." }
        ]
      },
      section4: {
        title: "HISTORICAL PAST",
        subtitle: "Evolution of flags in the region:",
        intro: "Before the adoption of today's flag, there were state symbols of various eras in the territory of Karakalpakstan:",
        periods: [
          { period: "Khiva Khanate (1917–1920):", desc: "A flag featuring a yellow moon and star on a black background.", img: "/images/Flaga01.jpg" },
          { period: "Turkestan ASSR (1920–1920, 1920–1921, 1921-1922, 1922-1923,):", desc: "Crescent and star symbols on a red background with a green canton.", imgs: ["/images/Flaga02.jpg", "/images/Flaga03.jpg", "/images/Flaga04.jpg", "/images/Flaga05.jpg"] },
          { period: "Khorezm People's Soviet Republic (1923–1924,):", desc: "A red flag with inscriptions.", img: "/images/Flaga06.jpg" },
          { period: "Karakalpak ASSR (1924–1937, 1937-1941, 1941-1952, 1952-1992):", desc: "Flags of the Soviet period, primarily red with the name of the republic.", imgs: ["/images/Flaga07.jpg", "/images/Flaga08.jpg", "/images/Flaga09.jpg", "/images/Flaga10.jpg"] },
          { period: "The Sovereign Republic of Karakalpakstan (1992-12-14)", desc: "A modern flag.", img: "/images/Flaga11.jpg" }
        ]
      },
      section5: {
        title: "THE STATE FLAG IS OUR PRIDE!",
        text: `The national flag of the Republic of Karakalpakstan represents our republic in the international arena: During official visits, conferences, world exhibitions and sports competitions.

Our flag flies on a par with the flags of other independent states in front of the UN building.
Respect for the flag is the patriotic duty and pride of every citizen and every person living in Karakalpakstan. It is a symbol of our freedom, independence and a bright future.`
      },
      conclusion: "MAY OUR FLAG FLY HIGH!"
    },
    PL: {
      intro: "„FLAGA PAŃSTWOWA”",
      title: "FLAGA PAŃSTWOWA REPUBLIKI KARAKAŁPAKSTANU",
      flagLaw: "Ustawa o fladze państwowej Suwerennej Republiki Karakalpakstanu",
      download: "Pobierz",
      colorToolTitle: "OFICJALNY STANDARD KOLORÓW:\nAby zapobiec zniekształceniom i zachować oryginalne kolory, kody HEX, RGB I CMYK są w pełni zgodne z oficjalnymi standardami dotyczącymi symboli państwowych Republiki Karakalpakstanu.\nKliknij kolor, aby skopiować kod i upewnić się, że produkty są wykonane w oryginalnym kolorze.\nAby flaga na produktach (tkaninie, papierze lub ekranie) była wyświetlana w oryginalnym oryginalnym kolorze, użyj następujących kodów. Możesz skopiować kod, klikając odpowiedni kolor: wskazówka dotycząca użytkowania: do projektowania ekranu użyj kodów HEX/RGB, A do drukowania na tkaninie lub papierze w drukarni użyj kodów CMYK.",
      crescentAndStarsTitle: "Półksiężyc i gwiazdy",
      howToUseTitle: "Jak używać?",
      howToUseText: "Skopiuj kolory: Wklej odpowiedni kod koloru do programu do projektowania (Photoshop, CorelDraw itp.).\nZachowaj proporcje: jeśli planujesz użyć flagi w innym rozmiarze (na przykład w dużym formacie lub jako mała flaga na stole), zmniejsz lub zwiększ proporcjonalnie powyższe opcje.\nSprawdź: przód i tył flagi powinny być symetryczne względem trzonu.\nAby zapobiec zniekształceniom i zachować oryginalne kolory, kody HEX, RGB I CMYK są w pełni zgodne z oficjalnymi standardami dotyczącymi symboli państwowych Republiki Karakalpakstanu.\nKliknij kolor, aby skopiować kod i upewnić się, że produkty są wykonane w oryginalnym kolorze.",
      authorSection: {
        title: "AUTOR FLAGI",
        name: "Żollibaj Izentajew",
        profession: "Artysta Ludowy Karakalpakstanu",
        desc: "Znany artysta, który wniósł ogromny wkład w kulturę i sztukę Karakalpakstanu, stworzył szkic flagi państwowej. Kliknij, aby dowiedzieć się więcej.",
      },
      section1: { 
        title: "HISTORIA PRZYJĘCIA I OFICJALNA USTAWA", 
        text: "Flaga państwowa Republiki Karakalpakstanu jest świętym symbolem suwerenności państwowej Republiki.\nZakon „O fladze państwowej Republiki Karakalpakstanu” został przyjęty 14 grudnia 1992 roku na XII sesji Rady Najwyższej Republiki Karakalpakstanu. Flaga to symbol reprezentujący naszą przeszłość, teraźniejszość i świetlaną przyszłość." 
      },
      section2: { 
        title: "OPIS I WYMIARY FLAGI", 
        text: "Flaga państwowa Republiki Karakalpakstanu jest prostokątnym płótnem, składającym się z trzech poziomych pasów: niebieskiego, złotożółtego i zielonego.\nŻółty pasek jest oddzielony białymi i czerwonymi obwódkami (obrzeża).",
        params: "Parametry techniczne:\nOficjalny rozmiar flagi 250 cm x 125 cm (proporcja 2:1). Wszystkie części powinny być umieszczone ściśle na podstawie następujących wymiarów:\nAby w pełni dostosować rozmiar flagi do oficjalnych standardów, użyj następujących parametrów:", 
        specs: ["Długość: 250 cm","Szerokość: 125 cm","niebieskie i zielone paski: po 42 cm","żółty pasek: 34 cm","czerwone linie: 2,5 cm", "białe linie: 1 cm",],
        stars: "Półksiężyc: powstaje przez przecięcie dwóch okręgów (średnice 22 cm i 19 cm). Odległość między środkami 4 cm. Odległość od drzewa flagi do półksiężyca 20 cm.\nGwiazdy: pięć gwiazdek pasuje do prostokąta o wymiarach 30 cm x 15 cm, Odległość od trzonu flagi do tego prostokąta wynosi 42 cm.\nUkład gwiazd: w dwóch rzędach (w górnym rzędzie 2, w dolnym 3 gwiazdki). Każda gwiazda powinna pasować do obwodu o średnicy 10 cm.\nDolna granica: dolny punkt półksiężyca i wierzchołki promieni dolnego rzędu gwiazd znajdują się na tej samej poziomej linii na wysokości 10 cm od górnego białego paska." 
      },
      section3: { 
        title: "ZNACZENIE SYMBOLI", 
        intro: "Każdy kolor ma głębokie znaczenie:", 
        meanings: [
          {color: "Niebieski", desc: "Symbol wody, wiosny i pokoju. Wśród ludów wschodnich ten kolor od czasów starożytnych był czczony jako znak czystości i czystego nieba."}, 
          {color: "Żółty (złoty)", desc: "Wskazuje, że większość terytorium Karakalpakstanu zajmują pustynie, a także symbolizuje płodność, obfitość i gościnność."},
          {color: "Zielony", desc: "Znak odnowy natury, młodości, wiary, duchowego bogactwa i słońca."},
          {color: "Czerwony", desc: "Symbol witalności płynącej w żyłach i pragnienia wolności."},
          {color: "Biały", desc: "Symbol czystości i wewnętrznego spokoju."},
          {color: "Półksiężyc", desc: "Święty symbol narodów muzułmańskich, nierozerwalnie związany z duchowym dziedzictwem narodu."},
          {color: "Pięć gwiazd", desc: "Symbolizuje pięć najstarszych miast Karakalpakstanu (Urgencz, Kungrad, Hożejli, Czymbaj, Szabbaz (Beruni)), które są historycznym fundamentem i symbolem wierności tradycjom."}
        ] 
      },
      section4: {
        title: "PRZESZŁOŚĆ HISTORYCZNA",
        subtitle: "Ewolucja flag w regionie:",
        intro: "Przed przyjęciem współczesnej flagi na terytorium Karakalpakstanu w różnych okresach istniała następująca symbolika:",
        periods: [
          { period: "Chanat Chiwy (1917–1920):", desc: "Flaga z żółtym księżycem i gwiazdą na czarnym tle.", img: "/images/Flaga01.jpg" },
          { period: "Turkiestańska ASSR (1920–1921, 1921-1922, 1922-1923):", desc: "Symbolika półksiężyca i gwiazdy na czerwonym tle z zielonym kantonem.", imgs: ["/images/Flaga02.jpg", "/images/Flaga03.jpg", "/images/Flaga04.jpg", "/images/Flaga05.jpg"] },
          { period: "Chorezmska Ludowa Republika Radziecka (1923–1924):", desc: "Czerwona flaga z napisami.", img: "/images/Flaga06.jpg" },
          { period: "Karakałpacka ASSR (1924–1937, 1937-1941, 1941-1952, 1952-1992):", desc: "Na flagach z okresu sowieckiego, głównie na czerwonym tle, widnieje nazwa Republiki.", imgs: ["/images/Flaga07.jpg", "/images/Flaga08.jpg", "/images/Flaga09.jpg", "/images/Flaga10.jpg"] },
          { period: "Suwerenna Republika Karakalpakstanu (1992-12-14):", desc: "Nowoczesna flaga.", img: "/images/Flaga11.jpg" }
        ]
      },
      section5: { 
        title: "FLAGA PAŃSTWOWA — NASZA DUMA!", 
        text: `"Flaga państwowa Republiki Karakalpakstanu reprezentuje naszą Republikę na arenie międzynarodowej: podczas oficjalnych wizyt, na konferencjach, wystawach światowych i zawodach sportowych.\nNasz flaga powiewa na równi z flagami innych Niepodległych Państw przed budynkiem ONZ.\nSzacunek dla flagi to patriotyczny obowiązek i duma każdego obywatela i każdej osoby mieszkającej w Karakalpakstanie.\nJest symbolem naszej wolności, niezależności i świetlanej przyszłości."`
      },
      conclusion: "NIECH NASZA FLAGA ZAWSZE POWIEWA WYSOKO!"
    }
  };

  const t = translations[lang] || translations.RU;

  return (
    <div className="min-h-screen relative text-gray-900 dark:text-white pt-32 pb-20 overflow-x-hidden">
      
      <div className="relative">
        <div 
          className="fixed inset-0 z-0 bg-no-repeat bg-cover bg-center" 
          style={{
            backgroundImage: 'url("/images/Flaga12.jpg")', 
            backgroundAttachment: 'fixed'
          }}
        />
        {/* <div className="fixed inset-0 z-[1] bg-white/30 dark:bg-black/50" /> */}
        
        <div className="relative z-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            
            <div className="mb-12 p-6 bg-white/90 dark:bg-gray-800/90 rounded-2xl border-l-4 border-blue-600 shadow-md">
              <p className="text-lg italic text-gray-800 dark:text-gray-200">{t.intro}</p>
            </div>

            <div className="text-center mb-16">
              <div className="inline-block p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6">
                <img src="/images/Flaga11.jpg" alt="FlagIcon" className="w-16 h-16 object-contain" />
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
                {t.title}
              </h1>
            </div>

            <section className="bg-white/95 dark:bg-gray-800/95 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 mb-12">
              <h2 className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400">{t.section1.title}</h2>
              <p className="text-lg leading-relaxed whitespace-pre-line text-gray-700 dark:text-gray-300 mb-8">
                {t.section1.text}
              </p>
              <div className="flex justify-center border-t border-gray-200 dark:border-gray-700 pt-8">
                <Link to="/symbols/flag-law" className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl hover:scale-105 hover:shadow-xl transition-all duration-300">
                  <span className="text-2xl">📜</span>
                  <span>{t.flagLaw}</span>
                  <ChevronRight size={24} />
                </Link>
              </div>
            </section>

            <section className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 mb-12">
              <div className="mb-12">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
                  <span className="w-8 h-8 flex items-center justify-center bg-amber-600 text-white rounded-lg text-xs">1</span>
                  {t.colorToolTitle}
                </h3>
                {(() => {
                  const [localCopied, setLocalCopied] = React.useState(null);
                  const handleCopy = (text) => {
                    navigator.clipboard.writeText(text);
                    setLocalCopied(text);
                    setTimeout(() => setLocalCopied(null), 2000);
                  };

                  const flagColors = [
                    { name: { RU: "Голубой", KK: "Көк", EN: "Blue", PL: "Błękitny" }, hex: "#008FB8", rgb: "0-143-184", cmyk: "100-21-0-27" },
                    { name: { RU: "Белый", KK: "Ақ", EN: "White", PL: "Biały" }, hex: "#FFFFFF", rgb: "255-255-255", cmyk: "0-0-0-0" },
                    { name: { RU: "Красный", KK: "Қызыл", EN: "Red", PL: "Czerwony" }, hex: "#DB2017", rgb: "219-32-23", cmyk: "0-85-89-14" },
                    { name: { RU: "Охра", KK: "Сары", EN: "Ochre", PL: "Ugier" }, hex: "#F7BE24", rgb: "247-190-36", cmyk: "0-22-85-3" },
                    { name: { RU: "Зеленый", KK: "Жасыл", EN: "Green", PL: "Zielony" }, hex: "#1A9D37", rgb: "26-157-55", cmyk: "83-0-64-38" }
                  ];

                  return (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                      {flagColors.map((c, i) => (
                        <div 
                          key={i} 
                          onClick={() => handleCopy(c.hex)}
                          className="group relative flex flex-col cursor-pointer transition-all duration-300 hover:-translate-y-2"
                        >
                          <div 
                            className="h-32 rounded-t-2xl shadow-inner border border-black/5 flex items-center justify-center"
                            style={{ backgroundColor: c.hex }}
                          >
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                              {localCopied === c.hex ? 
                                <Check className="text-white drop-shadow-md" /> : 
                                <Copy className={`text-white drop-shadow-md ${c.hex === '#FFFFFF' ? '!text-gray-400' : ''}`} />
                              }
                            </div>
                          </div>
                          
                          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-b-2xl border-x border-b border-gray-100 dark:border-gray-600">
                            <span className="block font-bold text-sm mb-2">{c.name[lang] || c.name.RU}</span>
                            <div className="space-y-1">
                              <div className="flex justify-between text-[10px] font-mono opacity-70"><span>HEX:</span> <span>{c.hex}</span></div>
                              <div className="flex justify-between text-[10px] font-mono opacity-70"><span>RGB:</span> <span>{c.rgb}</span></div>
                              <div className="flex justify-between text-[10px] font-mono opacity-70"><span>CMYK:</span> <span>{c.cmyk}</span></div>
                            </div>
                          </div>

                          {localCopied === c.hex && (
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-3 rounded shadow-lg z-50">
                              Көширилди!
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>

              <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-700">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
                  <span className="w-8 h-8 flex items-center justify-center bg-amber-600 text-white rounded-lg text-xs">2</span>
                  {t.section2.title}
                </h3>
                
                <div className="mb-8 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 relative group cursor-pointer" onClick={() => openLightbox('/images/flag-razmer.jpg')}>
                  <img 
                    src="/images/flag-razmer.jpg" 
                    alt="Flag Dimensions" 
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ZoomIn className="text-white w-12 h-12" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
  <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-2xl">
    <h4 className="font-bold mb-4 flex items-center gap-2 text-blue-600 dark:text-blue-400">
      📏 <span className="text-blue-600 dark:text-blue-400">Технические параметры:</span>
      <span className="text-gray-900 dark:text-white font-normal text-sm">
        {t.section2.params}
      </span>
    </h4>
    <ul className="space-y-3">
      {t.section2.specs.map((s, i) => (
        <li key={i} className="flex items-start gap-3 text-gray-700 dark:text-gray-300 text-sm">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 shrink-0" />
          {s}
        </li>
      ))}
    </ul>
  </div>
  <div className="space-y-6">
    <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800">
      <h4 className="font-bold mb-3 flex items-center gap-2 text-blue-600 dark:text-blue-400">🌙 {t.crescentAndStarsTitle}</h4>
      <p className="text-gray-700 dark:text-gray-300 text-sm italic leading-relaxed whitespace-pre-line">{t.section2.stars}</p>
    </div>
    <div className="p-5 bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-100 dark:border-amber-900/30">
      <h4 className="font-bold mb-2 text-amber-700 dark:text-amber-400 text-sm">{t.howToUseTitle}</h4>
      <p className="text-xs text-gray-600 dark:text-gray-400 whitespace-pre-line">{t.howToUseText}</p>
    </div>
  </div>
</div>
</div>
            </section>
              
            <Link to="/author/izentaev" className="block mb-12 transform hover:scale-[1.01] transition-all duration-300">
              <section className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800/90 dark:to-gray-900/90 backdrop-blur-md p-8 rounded-3xl shadow-xl border-2 border-purple-200 dark:border-purple-800 relative group">
                <div className="absolute top-6 right-6 text-purple-400 group-hover:text-purple-600 transition-colors">
                  <ExternalLink size={28} />
                </div>

                <h2 className="text-3xl font-bold mb-6 text-purple-700 dark:text-purple-400 flex items-center gap-3">
                  🎨 {t.authorSection.title}
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="flex justify-center relative">
                    <img 
                      src="/images/figures/jollibay-Izentaev01.jpg" 
                      alt="Жоллыбай Изентаев" 
                      className="w-64 h-64 rounded-full object-cover shadow-2xl border-4 border-white dark:border-gray-700 cursor-zoom-in hover:scale-105 transition-transform duration-300 relative z-20"
                      onClick={(e) => { 
                        e.preventDefault();
                        openLightbox('/images/figures/jollibay-Izentaev01.jpg'); 
                      }}
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="block text-3xl font-black text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {t.authorSection.name}
                    </h3>
                    
                    <p className="text-xl font-semibold text-purple-600 dark:text-purple-300 italic">
                      {t.authorSection.profession}
                    </p>
                    
                    <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                      {t.authorSection.desc}
                    </p>
                  </div>
                </div>
              </section>
            </Link>

            <section className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 mb-12">
              <h2 className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400">{t.section3.title}</h2>
              <p className="text-lg mb-8 text-gray-600 dark:text-gray-400">{t.section3.intro}</p>
              <div className="grid gap-4 sm:grid-cols-2">
                {t.section3.meanings.map((m, i) => (
                  <div key={i} className="p-5 bg-gray-50 dark:bg-gray-700/30 rounded-2xl border border-transparent hover:border-blue-300 transition-all duration-300">
                    <span className="block font-black text-blue-700 dark:text-blue-400 mb-2 uppercase text-sm tracking-widest">{m.color}</span>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{m.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 mb-12">
  <h2 className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400">{t.section4.title}</h2>
  <p className="text-lg mb-8 text-gray-600 dark:text-gray-400">{t.section4.subtitle}</p>
  <div className="space-y-6">
    <p className="text-gray-700 dark:text-gray-300">{t.section4.intro}</p>
    <div className="space-y-6">
      {t.section4.periods.map((p, i) => (
        <div key={i} className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl border-l-4 border-yellow-500">
          <strong className="block text-gray-900 dark:text-white mb-2 text-lg">{p.period}</strong>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{p.desc}</p>
          {p.imgs ? (
            i === 1 ? <Slider images={p.imgs} current={currentSlider1} setCurrent={setCurrentSlider1} /> : <Slider images={p.imgs} current={currentSlider2} setCurrent={setCurrentSlider2} />
          ) : (
            <img 
              src={p.img} 
              alt={p.period} 
              className="w-full h-64 object-contain bg-gray-100 dark:bg-gray-700 rounded-xl cursor-pointer hover:opacity-90 transition"
              onClick={() => openLightbox(p.img)}
            />
          )}
        </div>
      ))}
    </div>

    {/* БАЙРАҚ ТАРИЙХЫ БАТЫРМАСЫ */}
    <div className="mt-12 pt-8 border-t-2 border-blue-200 dark:border-blue-800">
      <Link 
        to="/symbols/flag-history" 
        className="block bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
              <ChevronRight size={28} className="text-white" />
            </div>
            <div>
              <h3 className="text-white text-2xl font-black mb-1">
                {lang === 'RU' && '📖 Полная история флага'}
                {lang === 'KK' && '📖 Байрақтың толық тарийхы'}
                {lang === 'EN' && '📖 Complete flag history'}
                {lang === 'PL' && '📖 Pełna historia flagi'}
              </h3>
              <p className="text-blue-100 text-sm">
                {lang === 'RU' && 'Читать подробную статью →'}
                {lang === 'KK' && 'Толық мақаланы оқыў →'}
                {lang === 'EN' && 'Read full article →'}
                {lang === 'PL' && 'Czytaj pełny artykuł →'}
              </p>
            </div>
          </div>
          <ExternalLink size={24} className="text-white opacity-80" />
        </div>
      </Link>
    </div>

  </div>
</section>

            <section className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-10 shadow-2xl text-white transform transition-all duration-500 hover:scale-[1.02] hover:shadow-purple-500/50 hover:from-purple-700 hover:to-pink-700 mb-12">
  <h2 className="text-3xl font-bold mb-6">{t.section5.title}</h2>
  <p className="text-xl leading-relaxed opacity-95 whitespace-pre-line">{t.section5.text}</p>
</section>

<div className="mt-20 text-center mb-16">
  <h2 className="text-4xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-green-500 to-indigo-600 hover:from-purple-600 hover:via-pink-500 hover:to-indigo-600 transition-all duration-700">
    {t.conclusion}
  </h2>
</div>

      {lightboxOpen && (
        <div className="fixed inset-0 z-[200] bg-black/95 flex flex-col items-center justify-center">
          <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between bg-black/40 backdrop-blur-md z-[210]">
            <div className="flex items-center gap-4">
              <button onClick={closeLightbox} className="text-white hover:bg-white/10 p-2 rounded-full transition"><X size={28} /></button>
              <button onClick={handleZoomIn} className="text-white hover:bg-white/10 p-2 rounded-full transition"><ZoomIn size={24} /></button>
              <button onClick={handleZoomOut} className="text-white hover:bg-white/10 p-2 rounded-full transition"><ZoomOut size={24} /></button>
              <button onClick={resetZoom} className="text-white hover:bg-white/10 p-2 rounded-full transition"><RotateCcw size={24} /></button>
              <div className="hidden sm:block text-white/50 text-sm font-mono">{Math.round(scale * 100)}%</div>
              {lightboxImages.length > 1 && <div className="text-white/70 text-sm font-mono">{lightboxIndex + 1} / {lightboxImages.length}</div>}
            </div>
            <button onClick={() => handleDownload(lightboxImages[lightboxIndex])} className="bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded-lg text-white flex items-center gap-2 transition active:scale-95 shadow-lg">
              <Download size={20} /> {t.download}
            </button>
          </div>
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden" onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
            <img 
              src={lightboxImages[lightboxIndex]} 
              style={{transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`, transition: isDragging ? 'none' : 'transform 0.3s'}} 
              className={`max-w-[95%] max-h-[85%] object-contain select-none ${scale > 1 ? 'cursor-grab active:cursor-grabbing' : ''}`} 
              draggable="false" 
              alt="Lightbox"
            />
          </div>
          {lightboxImages.length > 1 && (
            <>
              <button onClick={() => navigateLightbox(-1)} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-4 rounded-full transition z-[210]"><ChevronLeft size={32} /></button>
              <button onClick={() => navigateLightbox(1)} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-4 rounded-full transition z-[210]"><ChevronRight size={32} /></button>
            </>
          )}
        </div>
      )}
    </div>
     </div>
        </div>
      </div>
  );
}