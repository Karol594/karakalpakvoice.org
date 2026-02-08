import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Facebook, 
  Send, 
  Twitter, 
  Instagram, 
  Youtube, 
  Link as LinkIcon, 
  PlayCircle,
  ChevronLeft,
  ChevronRight,
  X,        // Жабыў
  ZoomIn,   // Жақынлатыў
  ZoomOut   // Алыслатыў
} from 'lucide-react';
import { useTheme } from '../components/useTheme';

// ---------------------------------------------
// ФОТОЛАРДЫ ИМПОРТЛАЎ
// ---------------------------------------------
// 1. Үстирт
import imgCanyon1 from '../assets/aral/ustyurt-canyon1.jpg';
import imgCanyon2 from '../assets/aral/ustyurt-canyon2.jpg';
import imgCanyon3 from '../assets/aral/ustyurt-canyon3.jpg';
import imgCanyon4 from '../assets/aral/ustyurt-canyon4.jpg';

// 2. Мойнақ
import imgShips1 from '../assets/aral/moynaq-ships1.jpg';
import imgShips2 from '../assets/aral/moynaq-ships2.jpg';
import imgShips3 from '../assets/aral/moynaq-ships3.jpg';
import imgShips4 from '../assets/aral/moynaq-ships4.jpg';

// 3. Судочье
import imgFlamingo1 from '../assets/aral/sudochye-flamingo1.jpg';
import imgFlamingo2 from '../assets/aral/sudochye-flamingo2.jpg';
import imgFlamingo3 from '../assets/aral/sudochye-flamingo3.jpg';
import imgFlamingo4 from '../assets/aral/sudochye-flamingo4.jpg';

// --- СЛАЙДЕР КОМПОНЕНТИ ---
const ImageSlider = ({ images, altText, onImageClick }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = direction === 'left' ? -current.offsetWidth : current.offsetWidth;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative group mb-12">
      <div 
        ref={scrollRef} 
        className="flex overflow-x-auto snap-x snap-mandatory gap-4 scroll-smooth no-scrollbar rounded-2xl shadow-xl"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {images.map((img, index) => (
          <div key={index} className="min-w-full md:min-w-[80%] snap-center relative">
            <img 
              src={img} 
              alt={`${altText} ${index + 1}`} 
              className="w-full h-64 md:h-96 object-cover rounded-2xl cursor-zoom-in hover:brightness-90 transition"
              onClick={() => onImageClick(img)}
            />
          </div>
        ))}
      </div>

      <button 
        onClick={() => scroll('left')} 
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/80 dark:bg-black/30 dark:hover:bg-black/80 backdrop-blur-sm p-2 rounded-full text-white dark:text-white transition opacity-0 group-hover:opacity-100 shadow-lg"
      >
        <ChevronLeft size={32} />
      </button>

      <button 
        onClick={() => scroll('right')} 
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/80 dark:bg-black/30 dark:hover:bg-black/80 backdrop-blur-sm p-2 rounded-full text-white dark:text-white transition opacity-0 group-hover:opacity-100 shadow-lg"
      >
        <ChevronRight size={32} />
      </button>
    </div>
  );
};

const AralSea = () => {
  const { i18n } = useTranslation();
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const shareUrl = window.location.href;

  // --- STATE ---
  const [selectedImage, setSelectedImage] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1); // Zoom state

  // Тилди анықлаў
  const currentLang = (i18n.language === 'kaa' || i18n.language === 'kk') ? 'KK' 
                    : i18n.language === 'ru' ? 'RU' 
                    : i18n.language === 'pl' ? 'PL' 
                    : 'EN';

  // --- ZOOM ФУНКЦИЯЛАРЫ ---
  const handleZoomIn = (e) => {
    e.stopPropagation();
    setZoomLevel(prev => Math.min(prev + 0.5, 3.5)); // Максимум 3.5 есе
  };

  const handleZoomOut = (e) => {
    e.stopPropagation();
    setZoomLevel(prev => Math.max(prev - 0.5, 1)); // Минимум 1 есе
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setZoomLevel(1); // Жабылғанда зумды қайтарыў
  };

  // Силтемени көширип алыў
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    alert(currentLang === 'KK' ? "Силтеме көширип алынды!" : "Link copied!");
  };

  // --- МАЗМУН ДЕРЕКТЕРИ ---
  const articleData = {
    KK: {
      title: "Жердеги Марс: Үстирт платосы ҳәм Аралдың жасырын сулыўлығы",
      subtitle: "«Бул Марс емес, бул — Қарақалпақстан. Жер бетиндеги өзге планетаны ашың»",
      intro: "Дүнья Арал теңизи ҳаққында сөз еткенде, көбинесе «трагедия» ҳәм «апатшылық» деген сөзлерди еситемиз. Биз тарийхты бийкарламаймыз, бирақ биз оған басқа қырынан қараўды усыныс етемиз. Бүгинги Қарақалпақстан — планетамыздағы ең сырлы ҳәм фантастикалық орынлардың бири.",
      
      section1_title: "«Ўақыт тоқтап қалған шатқаллар»",
      section1_text: "Үстирт платосы. Бул — жердиң гигант басқышлар (шыңлар) менен төменге үзилип түсетуғын жери. Усы жардың шетинде турып, өзиңди Марсқа қонған астронавт сыяқлы сезинесең. Шексиз шөл даласы, миллионлаған жыллар даўамында самал менен жонылған әжайып жар таслар ҳәм пүткиллей тынышлық.",
      videoBtn1: "Үстирт видеосын көриў",

      section2_title: "«Барлық қыйыншылықларға қарамастан даўам еткен Өмир»",
      section2_text: "Арал кетти, бирақ ол өзинен кейин қайталанбас ландшафтларды қалдырды. Қуяшта қар сыяқлы жылтыраған шорлықлар ҳәм Мойнақтағы кемелер қойымшылығы — өткен дәўирдиң үнсиз гүўалары.",
      videoBtn2: "Кемелер видеосын көриў",

      section3_text: "Бирақ тәбият өз дегенин ислейди. Судочье көли — бул қайта тирилген оазис. Мыңлаған қызғылт фламинголар, бирқазанлар ҳәм басқа да қуслар бул жерге қайтып келди. Бул — өмирдиң ҳәр қандай жағдайдан күшли екенлигиниң дәлийли.",

      conclusion: "Бүгинги Қарақалпақстан — қайғы емес, ол тәбияттың қүдирети ҳәм басқа ҳеш жерде көриў мүмкин болмаған сулыўлық ҳаққында. Келиң, Жерден кетпестен-ақ «басқа планетаны» өз көзиңиз бенен көриң.",
      footer_note: "Даўамы бар, биз бенен бирге болың...",
      shareTitle: "Биз бенен байланысың:"
    },
    RU: {
      title: "Марс на Земле: Плато Устюрт и скрытая красота Арала",
      subtitle: "«Это не Марс, это — Каракалпакстан. Откройте для себя другую планету на Земле»",
      intro: "Когда мир говорит об Аральском море, часто звучат слова «трагедия» и «катастрофа». Мы не отрицаем историю, но мы предлагаем взглянуть на неё под другим углом. Сегодняшний Каракалпакстан — это одно из самых сюрреалистичных мест на планете.",
      
      section1_title: "«Каньоны, где останавливается время»",
      section1_text: "Плато Устюрт. Это место, где земля обрывается вниз гигантскими ступенями-чинками. Стоя на краю этого обрыва, чувствуешь себя астронавтом, высадившимся на Марсе. Бескрайняя пустынная степь, причудливые скалы, выточенные ветром за миллионы лет.",
      videoBtn1: "Смотреть видео про Устюрт",

      section2_title: "«Жизнь вопреки всему»",
      section2_text: "Арал ушел, но он оставил после себя уникальные ландшафты. Солончаки, сверкающие на солнце, как снег, и кладбище кораблей в Муйнаке — немые свидетели эпохи.",
      videoBtn2: "Смотреть видео про корабли",

      section3_text: "Но природа берет своё. Озеро Судочье — это оазис, возродившийся из пепла. Тысячи розовых фламинго, пеликанов и других птиц вернулись сюда, доказывая, что жизнь сильнее любых обстоятельств.",

      conclusion: "Каракалпакстан сегодня — это не про грусть, это про мощь природы и красоту, которую не увидеть больше нигде. Приезжайте, чтобы увидеть «другую планету», не покидая Землю.",
      footer_note: "Продолжение следует, оставайтесь с нами...",
      shareTitle: "Свяжитесь с нами:"
    },
    EN: {
      title: "Mars on Earth: Ustyurt Plateau and the Hidden Beauty of the Aral",
      subtitle: "This is not Mars, this is Karakalpakstan. Discover another planet on Earth.",
      intro: "When the world speaks of the Aral Sea, words like \"tragedy\" and \"catastrophe\" are often heard. We do not deny history, but we propose looking at it from a different angle. Karakalpakstan today is one of the most surreal places on the planet.",
      
      section1_title: "Canyons Where Time Stops",
      section1_text: "The Ustyurt Plateau. This is a place where the earth breaks off downwards in giant steps (chinks). Standing on the edge of this cliff, you feel like an astronaut who has landed on Mars. Boundless desert steppe, bizarre cliffs carved by wind over millions of years.",
      videoBtn1: "Watch Ustyurt Video",

      section2_title: "Life Against All Odds",
      section2_text: "The Aral is gone, but it has left behind unique landscapes. Salt marshes sparkling in the sun like snow, and the ship graveyard in Moynaq are silent witnesses of an era.",
      videoBtn2: "Watch Ships Video",

      section3_text: "But nature takes its toll. Lake Sudochye is an oasis reborn from ashes. Thousands of pink flamingos, pelicans, and other birds have returned here, proving that life is stronger than any circumstance.",

      conclusion: "Karakalpakstan today is not about sadness; it is about the power of nature and beauty that cannot be seen anywhere else. Come to see \"another planet\" without leaving Earth.",
      footer_note: "To be continued, stay with us...",
      shareTitle: "Connect with us:"
    },
    PL: {
      title: "Mars na Ziemi: Płaskowyż Ustiurt i ukryte piękno Aralu",
      subtitle: "To nie Mars, to Karakalpakstan. Odkryj inną planetę na Ziemi.",
      intro: "Kiedy świat mówi o Morzu Aralskim, często padają słowa „tragedia” i „katastrofa”. Nie zaprzeczamy historii, ale proponujemy spojrzeć na nią z innej perspektywy. Dzisiejszy Karakalpakstan to jedno z najbardziej surrealistycznych miejsc na planecie.",
      
      section1_title: "Kaniony, w których zatrzymuje się czas",
      section1_text: "Płaskowyż Ustiurt. To miejsce, gdzie ziemia urywa się w dół gigantycznymi stopniami (czinkami). Stojąc na krawędzi tego klifu, czujesz się jak astronauta, który wylądował na Marsie. Bezkresny step, dziwaczne skały wyrzeźbione przez wiatr w ciągu milionów lat.",
      videoBtn1: "Obejrzyj wideo o Ustiurcie",

      section2_title: "Życie wbrew wszystkiemu",
      section2_text: "Aral odszedł, ale pozostawił po sobie unikalne krajobrazy. Solniska błyszczące w słońcu jak śnieg i cmentarzysko statków w Mujnaku to niemi świadkowie epoki. Ale natura bierze górę. Jezioro Sudocze to oaza odrodzona z popiołów. Tysiące różowych flamingów, pelikanów i innych ptaków wróciło tutaj, udowadniając, że życie jest silniejsze niż jakiekolwiek okoliczności.",
      
      conclusion: "Karakalpakstan dzisiaj to nie smutek; to potęga natury i piękno, którego nie można zobaczyć nigdzie indziej. Przyjedź, aby zobaczyć „inną planetę”, nie opuszczając Ziemi.",
      footer_note: "Ciąg dalszy nastąpi, zostań z nami...",
      shareTitle: "Połącz się z nami:"
    }
  };

  const t = articleData[currentLang] || articleData.RU;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 font-serif">
      
      {/* LIGHTBOX (ЗУМ МЕНЕН) */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-md animate-fade-in overflow-hidden"
          onClick={closeLightbox}
        >
          {/* Басқарыў панелі (Төбеде) */}
          <div className="absolute top-5 right-5 flex items-center gap-4 z-[101]">
            {/* Zoom Out */}
            <button 
              onClick={handleZoomOut}
              className="p-3 bg-white/20 hover:bg-white/40 text-white rounded-full transition transform hover:scale-110"
              title="Алыслатыў / Zoom Out"
            >
              <ZoomOut size={28} />
            </button>

            {/* Zoom In */}
            <button 
              onClick={handleZoomIn}
              className="p-3 bg-white/20 hover:bg-white/40 text-white rounded-full transition transform hover:scale-110"
              title="Жақынлатыў / Zoom In"
            >
              <ZoomIn size={28} />
            </button>

            {/* Close */}
            <button 
              onClick={closeLightbox}
              className="p-3 bg-red-600/80 hover:bg-red-600 text-white rounded-full transition transform hover:scale-110"
              title="Жабыў / Close"
            >
              <X size={28} />
            </button>
          </div>
          
          {/* Үлкейген сүўрет */}
          <div className="overflow-auto flex items-center justify-center w-full h-full">
            <img 
              src={selectedImage} 
              alt="Full screen view" 
              className="max-w-none transition-transform duration-300 ease-out rounded-lg shadow-2xl"
              style={{ transform: `scale(${zoomLevel})`, cursor: zoomLevel > 1 ? 'grab' : 'zoom-in' }}
              onClick={(e) => e.stopPropagation()} // Фотоға басқанда жабылып қалмауы ушын
            />
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-[32px] shadow-2xl overflow-hidden animate-fade-in">
        
        {/* --- МАЗМУНЫ --- */}
        <div className="p-6 md:p-12 text-gray-800 dark:text-gray-200 leading-relaxed text-lg">
          
          <h1 className="text-3xl md:text-5xl font-bold text-center mb-4 text-gray-900 dark:text-white leading-tight">
            {t.title}
          </h1>
          
          <div className="text-center italic text-xl text-amber-600 dark:text-amber-400 mb-10 font-bold">
            {t.subtitle}
          </div>

          <p className="mb-10 text-lg border-l-4 border-amber-500 pl-4 bg-amber-50 dark:bg-gray-700/30 p-4 rounded-r-lg">
            {t.intro}
          </p>

          {/* ================================================= */}
          {/* 1. БӨЛИМ: ҮСТИРТ (СЛАЙДЕР + ВИДЕО)                */}
          {/* ================================================= */}
          <h2 className="text-2xl font-bold text-amber-600 dark:text-amber-500 mt-12 mb-6">
            {t.section1_title}
          </h2>
          <p className="mb-8">{t.section1_text}</p>

          {/* Слайдер: Үстирт */}
          <ImageSlider 
            images={[imgCanyon1, imgCanyon2, imgCanyon3, imgCanyon4]} 
            altText="Ustyurt Canyon" 
            onImageClick={setSelectedImage}
          />

          <div className="text-center mb-16">
            <a href="https://youtu.be/cRG3OlDuli8?si=pZeAc6TCfxCG9XgV" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full shadow-lg transition transform hover:-translate-y-1">
              <PlayCircle size={28} />
              {t.videoBtn1}
            </a>
          </div>

          {/* ================================================= */}
          {/* 2. БӨЛИМ: КЕМЕЛЕР (СЛАЙДЕР + ВИДЕО)               */}
          {/* ================================================= */}
          <h2 className="text-2xl font-bold text-amber-600 dark:text-amber-500 mt-10 mb-6">
            {t.section2_title}
          </h2>
          <p className="mb-8">{t.section2_text}</p>

          {/* Слайдер: Кемелер */}
          <ImageSlider 
            images={[imgShips1, imgShips2, imgShips3, imgShips4]} 
            altText="Aral Ships" 
            onImageClick={setSelectedImage}
          />

          <div className="text-center mb-16">
            <a href="https://youtu.be/dQlkzTlBAkw?si=fDJlgdNBFpxRvnl7" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full shadow-lg transition transform hover:-translate-y-1">
              <PlayCircle size={28} />
              {t.videoBtn2}
            </a>
          </div>

          {/* ================================================= */}
          {/* 3. БӨЛИМ: ФЛАМИНГО (СЛАЙДЕР)                      */}
          {/* ================================================= */}
          <p className="mb-8">{t.section3_text}</p>

          {/* Слайдер: Фламинго */}
          <ImageSlider 
            images={[imgFlamingo1, imgFlamingo2, imgFlamingo3, imgFlamingo4]} 
            altText="Sudochye Flamingo" 
            onImageClick={setSelectedImage}
          />

          <div className="p-8 bg-amber-50 dark:bg-gray-700/50 rounded-2xl border border-amber-100 dark:border-gray-600 mb-8 mt-12">
            <p className="font-bold text-xl text-center text-amber-900 dark:text-amber-100">{t.conclusion}</p>
          </div>

          <p className="text-center text-gray-500 italic mt-8">{t.footer_note}</p>

        </div>

        {/* ------------------------------------------- */}
        {/* 4. SHARE (ТАРҚАТЫЎ & СИЛТЕМЕЛЕР)            */}
        {/* ------------------------------------------- */}
        <div className="p-6 md:p-12 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
          <section className={`p-10 rounded-[40px] border text-center ${isDarkMode ? "bg-white/5 border-white/10" : "bg-white border-gray-200"}`}>
            <h3 className="text-2xl font-bold mb-8 italic">{t.shareTitle}</h3>
            <div className="flex flex-wrap justify-center gap-6">
              
              <a href="https://www.facebook.com/share/1FifdzG23b/" target="_blank" rel="noreferrer" className="p-4 bg-[#1877F2] text-white rounded-full hover:scale-110 transition shadow-lg" title="Facebook">
                <Facebook size={24} />
              </a>

              <a href="https://t.me/kkvoice_org" target="_blank" rel="noreferrer" className="p-4 bg-[#0088cc] text-white rounded-full hover:scale-110 transition shadow-lg" title="Telegram">
                <Send size={24} />
              </a>

              <a href="https://x.com/Karakalpak45997" target="_blank" rel="noreferrer" className="p-4 bg-black text-white rounded-full border border-white/20 hover:scale-110 transition shadow-lg" title="Twitter (X)">
                <Twitter size={24} />
              </a>

              <a href="https://www.instagram.com/karakalpakvoice_org/" target="_blank" rel="noreferrer" className="p-4 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white rounded-full hover:scale-110 transition shadow-lg" title="Instagram">
                <Instagram size={24} />
              </a>

              <a href="https://youtube.com/@karakalpakvoice_org" target="_blank" rel="noreferrer" className="p-4 bg-[#FF0000] text-white rounded-full hover:scale-110 transition shadow-lg" title="YouTube">
                <Youtube size={24} />
              </a>

              <button onClick={copyToClipboard} className="p-4 bg-gray-700 text-white rounded-full hover:scale-110 transition shadow-lg flex items-center gap-2 px-6" title="Copy Link">
                <LinkIcon size={20} />
              </button>
            </div>
          </section>
        </div>

      </div>
    </div>
  );
};

export default AralSea;