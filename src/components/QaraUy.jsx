import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
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
  X,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import { useTheme } from '../components/useTheme';

// --- ИМПОРТ ФОТОГРАФИЙ ---
// 1. Внешний вид (Exterior)
import imgExt1 from '../assets/tradition/yurt-exterior1.jpg';
import imgExt2 from '../assets/tradition/yurt-exterior2.jpg';
import imgExt3 from '../assets/tradition/yurt-exterior3.jpg';
import imgExt4 from '../assets/tradition/yurt-exterior4.jpg';

// 2. Интерьер (Interior)
import imgInt1 from '../assets/tradition/yurt-interior1.jpg'; 
import imgInt2 from '../assets/tradition/yurt-interior2.jpg';
import imgInt3 from '../assets/tradition/yurt-interior-red3.jpg';
import imgInt4 from '../assets/tradition/yurt-interior-red4.jpg';

// 3. Шанырак (Shanyraq)
import imgShan1 from '../assets/tradition/yurt-shanyraq1.jpg';
import imgShan2 from '../assets/tradition/yurt-shanyraq2.jpg';
import imgShan3 from '../assets/tradition/yurt-shanyraq3.jpg';
import imgShan4 from '../assets/tradition/yurt-shanyraq4.jpg';

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

const QaraUy = () => {
  const { i18n } = useTranslation();
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const shareUrl = window.location.href;

  // --- STATE ---
  const [selectedImage, setSelectedImage] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  
  // Тилди анықлаў
  const currentLang = (i18n.language === 'kaa' || i18n.language === 'kk') ? 'KK' 
                    : i18n.language === 'ru' ? 'RU' 
                    : i18n.language === 'pl' ? 'PL' 
                    : 'EN';

  // --- ZOOM ФУНКЦИЯЛАРЫ ---
  const handleZoomIn = (e) => {
    e.stopPropagation();
    setZoomLevel(prev => Math.min(prev + 0.5, 3.5));
  };

  const handleZoomOut = (e) => {
    e.stopPropagation();
    setZoomLevel(prev => Math.max(prev - 0.5, 1));
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setZoomLevel(1);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    alert(currentLang === 'KK' ? "Силтеме көширип алынды!" : "Link copied!");
  };

  // --- МАЗМУН ДЕРЕКТЕРИ ---
  const articleData = {
    KK: {
      title: "ҚАРА ҮЙ: Әпиўайы баспана емес, пүткил Әлемниң модели",
      subtitle: "«Ата-бабаларымыздың космосты түсиниўи ҳәм инженерлик данышпанлығы»",
      introTitle: "Эко-архитектураның атасы",
      introText: "Бүгинги күнде дүнья архитекторлары \"мобил үйлер,\" \"жасыл архитектура\" ҳәм \"экотурар жайлар\" ҳаққында бас қатырып, технология ҳәм тәбиятты қалай үйлестириў ҳаққында ойлап атырғанда, қарақалпақ халқы буны мың жыл алдын ойлап қойған еди.\n\nҚара үй - бул тек ғана көшпели халықтың баспанасы емес. Бул - Жер ҳәм Аспан арасындағы байланыс, кеңейтилген Космос модели. Қара үйдиң ишине кирген адам тек бир кеңисликке емес, пүткил бир дүньяға, ата-бабаларымыздың ақыл-ойынан туўылған тири философияға қәдем таслайды. Бул - бизиң ең таза, ең бузылмаған миллий кодымыз.",
      qaraLink: "QARA деген не? Толык түсиндирмеси ушын…",
      
      mainContent: `Қара үй барлық түркий көшпенди халықлар мәдениятының белгиси болып есапланады. Ҳақыйқатында да, "Қара үй" сөзи ол қурылатуғын ҳәм ўатан, ата мәкан деп аўдарылатуғын турақлы мәнисти аңлатады. Қара үй - көшпендилердиң мәканы болып, ол өзиниң қолайлылығы ҳәм әмелийлиги менен олардың талапларын толық қанаатландырады. Ол тез соғылады, аңсат жыйналады ҳәм жайлаўдан жайлаўға көшкенде аңсат тасылады. Кийиз қаплама жаўын-шашын, самал ҳәм суўықты өткермейди. Үйде ағаштан исленген ишки бир жуп есиктен басқа қамыс перде менен қалың материалдан исленген тийкарға тигилген сыртқы есик те болады.\n\nҚара үйдиң дийўаллары бир қатар керегеден (канатлардан) ибарат. Кереге сөзи қанат деген мәнини билдиреди, себеби олар ашылып-жабылады. Ҳәр қыйлы үйлер 6, 8, кемнен-кем 12 жыйналатуғын бөлимнен жыйналып қурылады. Егер торларды бир-бири менен тутастырып, шеңбер жасап, үйдиң есигин киргизиў арқалы жуўмақланса, кереге деп аталады.Үйде ағаштан исленген ишки бир жуп есиктен тысқары, қалың материалдан исленген тийкарға тигилген қамыс пердеден исленген сыртқы есик те бар.\n\nҮйдиң төбеси еки шеңберден туратуғын орталық дөңгелек түкке (Шаңарақ) бекитилген узын туғырлардан (уўық) турады, олардың массасы бойынша Шаңарақ үйдиң шеңберинен тыс турады, жарық терезе хызметин атқарады, ал ерте ўақытта, ҚАРА үйлерде қыста турған гезде, ол үрмели моржа хызметин атқарды, сонлықтан ошақ бөлмениң ортасына қойылды. Үйдиң төбеси әдетте үш кийиз бенен бастырылған. Пештахта ҳәм артқы тәрепи ярым шеңбер тәризли, түтин тесигин жабатуғын кийиз (түңлик) туўры мүйешли формада. Узын арқанлар кийиз жабыўдың мүйешлеринен шығады, түтин тесигин ашыў керек болғанда, арқанлардың бири шешип, кийиз бир тәрепке тартылады.\n\nБурынлары үйге арналған өнерментшилик буйымлары келиншектиң жасаўын қураған, оны келиншек анасы басшылығында 6-8 жыл даўамында тойға таярлайтуғын болған. Үйдиң тоқыў безеклериниң палитрасы туўған тәбияттың реңлерин көширди. Ол қоңыр ҳәм қызыл-қоңыр реңлердиң тынық, бирақ тойынған гаммасынан ибарат еди. Қара ҳәм ақ реңлер айрықша орын ийелеп, оларды нағыстың тийкарғы фонына ҳәм нағыслы сызықлар сыпатында пайдаланған.\n\nИшки белбеў ени 30-40 см. жол тәризинде үйдиң сыртынан айланып, ишкерисине қарай нағыс салынған. Ол конструкцияларға турмыслық әҳмийетли конструктивлик турақлылықты береди. Қызыл-қара реңли түксиз жүн лента (қызыл басқур) ени 60-70 см. шатырдың шеңберин беккемлеўде ҳәм оның қыялығын сақлаўда әҳмийетли конструктивлик роль атқарады.\n\nКеңлиги 40-50 см болған ақ басқур ақ пахта тийкарында қурамалы усылда тоқылған ҳәм жүн түк пенен безелген, қызыл лентаның үстинде безелген тәрепи ишке қарай жайласқан. Оның ўазыйпасы кийиздиң созылыўының алдын алыў ушын оны беккемлеў болып табылады. Ашық реңли жүннен тоқылған, ушларында шашақлы баўлар топламы (аяқбаў) үйдиң гүмбезине илдирилип, үлкен сән береди.\n\nҮй шартли түрде үш бөлимге бөлинген. Үй ийесиниң орны қара үйдиң (төрдиң) кирер аўзына қарама-қарсы жайласқан. Ҳүрметли мийманларды қабыллаўда бул орын оларға берилди. Еркеклердиң ярымы киреберистиң шеп тәрепинде болды. Бул жерде ер адамлар кийими, саз әсбаплары, ат үскенелери, ер адамлардың өнерментшилиги ҳәм аң аўлаў қураллары сақланған. Ҳаяллардың ярымында кийим-кеншеклер салынған түйиншиклер, қол дигирман, азық-аўқат сақлайтуғын қаплар, суў сақлайтуғын ойма суўқабақ ыдыслары, ҳаял-қызлар өнерментшилиги буйымларына ийе еди.\n\nҮйде мебель әдетте өте аз - қазанлар, үлкен ыдыслар менен азық-аўқатқа арналған табақлар (ыдыс-аяк), сондай-ақ затларды сақлаўға арналған нағысланған ямаса боялған ағаш сандық. Боялған көрпелер ҳәм көрпешелер әдетте сандықтың үстинде сақланатуғын еди. Әзелден адамлар үйди космос модели менен теңлестирген. Үйде қәсийтли аймақлар болып саналды: табалдырық, ошақ және киребериске қарама-қарсы Ҳүрметли орын (төр), оның үстине қызыл нағыслы ленталардан (қыз-қур) торларының көмеги менен декоратив акцент жасалды. Үйдиң гүмбези ҳәм ошағы қуяш ҳәм оттың тымсалын сәўлелендирген. Үйдиң гүмбез кесиспеси дүньяның түп-түбине қаратылған. Ҳаўа райы жыллы болғанда ол ашық қойылады ҳәм аспан шырақларын бақлаў имканиятын береди.`,

      section1_title: "1. ИНЖЕНЕРИЯ: \"Шегарасыз қаланған шедевр.\"",
      section1_text: `Қарақалпақ ҚАРА үйи - инсаният ойлап тапқан ең жетик мобил архитектура ҳәм инженерлик ойлаўдың шыңы. Бүгинги заман "инновация" деп мақтанатуғын нәрселерди ата-бабаларымыз әлле қашан ислеп қойған.\n\nТез жыйналатуғын конструкция: Онда темир шеге, пластмасса жоқ. Бирақ мың жыллар сынағынан өткен, сүйек ҳәм қайыс пенен беккемленген беккем система бар. Үйди санаўлы саатларда тигип, тап сондай тез жыйнап алыў мүмкин.\n\nКлиматқа бейимлесиў: Қарақалпақ үйлериниң басқа Орайлық Азия халықларынан ең баслы айырмашылығы - оның төбеси конус тәризли (шаты сыяқлы) бийик болып келеди. Бул форма бийкарға танланбаған:\n- Жаўын-шашын тез ағып кетеди;\n- Қар топланбайды;\n- Ишки ҳаўа алмасыўы (вентиляция) идеал дәрежеде болады;\n- Даланың қатты желине қарсы аэродинамикалық турақлылық береди.\n\nСейсмикалық қәўипсизлик: Үйдиң дийўалы - "Кереге" деп аталады (6, 8, 12 гейде 16, 18 қанаттан ибарат). Бул - ийилиўшең, созылыўшаң, бирақ сынбайтуғын "трансформер" конструкция. Жер силкинсе, жай силкинеди, бирақ қуламайды.`,

      section2_title: "2. ШАНАРАҚ ФИЛОСОФИЯСЫ: \"Күнниң көзи ҳәм Тәңириниң нәзери.\"",
      section2_subtitle: "(Исламнан алдынғы исеним)",
      section2_text: `Ата-бабаларымыз аспанға қарап өмир сүрген халық. Олар жулдызлы, күндизги, ай, жыл мәўсимлерин терең түсинген. Сол билим Қара үйдиң төбесинде сәўлеленген.\n\nШанарақ: Үйдиң ең жоқары ноқатына қараў жеткиликли. "Шанарақ" - бул тек ғана түтин шығаратуғын моры емес. Бул - Қуяштың тымсалы, Аспанға ашылған көз, Тәңири менен байланыс. Бурын ол қыста ошақ жағылғанда моры хызметин атқарса, жазда саат хызметин атқарған (күн нуры арқалы ўақытты анықлаған).\n\nУўықлар: Шыңарақты услап турған ийилген ағашлар - "Уўықлар" - шыңараққа нур шашып, оны жылытып турған қуяш нурларын аңлатады. Қарақалпақ уўықларының тек төменги жағы ийилген болып, жоқарғы жағы тик турады, бул үйге тәкирарланбас "конус" формасын береди.`,

      section3_title: "3. ДИЗАЙН ҲӘМ КОД: \"Қызыл реңниң сыры.\"",
      section3_text: `Қарақалпақ Қара үйиниң дүньядағы басқа үйлерден (қазақ, қырғыз, түркмен) ең үлкен айырмашылығы ҳәм бренд белгиси - оның ишки безеўинде.\n\n"Қызыл өңир": Ишке киргенде сизди қызыл реңниң салтанаты күтип алады. Неге қызыл? Бул әпиўайы безеў емес.\nҚызыл - оттың, қанның, өмирдиң символы;\nҚуяш қуўаты ҳәм жаман күшлерден қорғаныў реңи.\nОл үйдиң жумысын "жыллы" көрсетеди ҳәм адамға психологиялық күш береди.\n\nШифрланган хабарлар: "Басқур," "Аяк баў," "Жан баў"лардағы ҳәр бир нағыс - бул жазылмаған китап. Олар тек ғана гөззаллық ушын емес, шаңарақты жаман көзден сақлаўшы тумар (космослық код) ҳәм конструкцияны беккем услап турыўшы инженерлик деталь есапланады.\n\n"Орта Азия халықлары арасында кең тарқалған үйлер ишинде Қарақалпақлардың саўлатлы Қара үйи ең гөззал ҳәм әжайып, терең мәнили безелген үй болып есапланады." - Академик Алкей Маргулан (1964-жылы Москвада болып өткен халық аралық илимий конференциядағы баянатынан).`,

      section4_title: "4. КОСМОГОНИЯ: \"Кеңлик философиясы ҳәм Гармония.\"",
      section4_text: `Әзелден бабаларымыз Қара үйди космостың модели деп билген ҳәм оны еки тең бөлимге бөлген. Бул қарама-қарсылықлардың (Ин ҳәм Ян сыяқлы) тең салмақлылығын сақлаў идеясы.\n\nМүйешсиз кеңислик: Қара үйде мүйеш жоқ. Демек, бул жерде жаман энергия топланбайды, ҳаўа ҳәм энергия еркин айланады. Инсан өзин шексиз даланың бир бөлегиндей сезеди.\n\nОң жақ (Ерлер тәрепи): Есиктен киргенде шеп тәреп (төрден қарағанда оң тәреп). Бул жерде ер адамның кийимлери, ат үскенелери, саз әсбаплары ҳәм аңшылық қураллары турған. Бул - қорғаўшы руўхлардың мәканы.\n\nШеп тәреп (ҳаял-қызлар тәрепи): Есиктен киргенде оң тәреп. Бул жерде азық-аўқат, ыдыс-табақ (сабаяк), кийим-кеншек ҳәм қазан-ошак турған. Бул - берекеттиң мәканы.\n\nТөр (Сакрал орын): Есикке қарама-қарсы турған ең ҳүрметли орын. Төрге "Қызыл қур" тартылып, ең сулыў гилемлер төселген ҳәм жүк жыйналған. Бул жер мийман ҳәм үй ийесиниң абырайлы орны.\n\nШегара: Еки дүньяның шегарасы (ишки - қорғалған ҳәм сыртқы - қәўипли) Босағаны басыўға болмайды, ол үйдиң қорғанышы.`,

      conclusionTitle: "ЖУЎМАҚ: Қара үй - Бизиң Бренд, Бизиң Келешек.",
      conclusionText: `Қара үй өтмиштиң қалдығы емес. Ол - мәдениятымыздың жүреги, руўхымыздың тири шежиреси. Ол - музей, галерея ҳәм руўхый театр.\n\nЕгер бир белги Қарақалпақ халқын толық түсиндире алса - онда ол "Қара үй".\n\nТарийхымыз - оның керегесинде;\nРуўхымыз - шаңарағында;\nТәрбиямыз - төринде;\nБизиң космослық ойлаўымыз дүзилисинде.\n\nҚара үйди көрген ҳәр бир адам: "Бул халықты ҳеш қашан жеңип болмайды. Себеби олардың шаңарағы - Қуяшқа, руўхы - Аспанға байланыслы" деген пикирге келеди.\n\nБул - биз дүньяға мақтаныш пенен көрсете алатуғын, өтмишти сақлап, келешекке жол ашатуғын мәңгилик символымыз.`,
      
      videoBtn: "Видеоны көриў",
      shareTitle: "Биз бенен байланысың:"
    },
    RU: {
      title: "КАРА-УЙ (ЮРТА): Не просто жилище, а модель всей Вселенной",
      subtitle: "«Понимание космоса и инженерная мудрость наших предков»",
      introTitle: "Отец эко-архитектуры",
      introText: "Сегодня, когда мировые архитекторы ломают голову над \"мобильными домами\", \"зеленой архитектурой\" и \"эко-жильем\", размышляя о том, как гармонизировать технологии с природой, каракалпакский народ придумал это еще тысячу лет назад.\n\nQARA-Uy (Юрта) — это не просто жилище кочевого народа. Это связь между Землей и Небом, расширенная модель Космоса. Человек, входящий в юрту, ступает не просто в какое-то пространство, а в целый мир, в живую философию, рожденную разумом наших предков. Это наш самый чистый, неискаженный национальный код.",
      qaraLink: "Что такое QARA? Подробное объяснение здесь…",

      mainContent: `QARA-Uy (буквально "Большой дом") считается символом культуры всех тюркских кочевых народов. В действительности, слово "QARA-Uy" означает место, где она возводится, и несет смысл постоянного обитания, переводимый как родина, отчий край. Юрта — это обитель кочевников, которая благодаря своему удобству и практичности полностью удовлетворяет их требования. Она быстро возводится, легко собирается и так же легко перевозится при переезде с пастбища на пастбище. Войлочное покрытие не пропускает осадки, ветер и холод. В юрте, помимо внутренней пары деревянных дверей, имеется также внешняя дверь из камышовой циновки, пришитой к плотной матерчатой основе.\n\nСтены юрты состоят из ряда решетчатых секций (кереге/канатов). Слово "кереге" означает "крыло" (қанат), так как они складываются и раскладываются. Различные виды юрт собираются из 6, 8, реже из 12 складных секций. Когда решетки соединяют друг с другом, образуя круг, и завершают конструкцию установкой двери, это называется "кереге". Помимо внутренней деревянной двери, есть внешняя дверь из камышовой циновки на плотной основе. Крыша юрты состоит из длинных шестами (уык), прикрепленных к центральному круглому навершию (Шанарак), состоящему из двух обручей. По своей массе Шанарак находится вне окружности основания юрты, он выполняет функцию светового окна, а в прежние времена, когда в QARA-Uy жили зимой, он служил дымоходом, поэтому очаг располагался в центре комнаты. Крыша юрты обычно покрывается тремя слоями войлока. Передняя и задняя части покрытия имеют полукруглую форму, а войлок, закрывающий дымовое отверстие (түнлик), имеет прямоугольную форму. От углов войлочного покрытия отходят длинные веревки; когда нужно открыть дымоход, одну из веревок отвязывают и оттягивают войлок в сторону.\n\nВ старину предметы ремесленного искусства для юрты составляли приданое невесты, которое она готовила к свадьбе под руководством матери в течение 6-8 лет. Палитра тканых украшений юрты копировала цвета родной природы. Она состояла из спокойной, но насыщенной гаммы коричневых и красно-коричневых оттенков. Особое место занимали черный и белый цвета, которые использовались как основной фон для узоров и в качестве контурных линий.\n\nВнутренний пояс (белдеу) шириной 30-40 см в виде дорожки опоясывает юрту снаружи узором внутрь. Он придает конструкции жизненно важную конструктивную устойчивость.\nКрасно-черная безворсовая шерстяная лента (қызыл басқур) шириной 60-70 см играет важную конструктивную роль в укреплении круга купола и сохранении его наклона. Белый баскур (ақ басқур) шириной 40-50 см, сотканный сложным методом на основе белого хлопка и украшенный шерстяным ворсом, располагается поверх красной ленты украшенной стороной внутрь. Его функция — укреплять войлок, предотвращая его растяжение. Пучки шнуров с кисточками на концах (аяқ бау), сплетенные из светлой шерсти, подвешиваются к куполу юрты, придавая ей особую красоту.\n\nЮрта условно делится на три части. Место хозяина дома расположено напротив входа в юрту (төр — почетное место). При приеме уважаемых гостей это место уступалось им. Мужская половина находилась слева от входа. Здесь хранились мужская одежда, музыкальные инструменты, конское снаряжение, предметы мужского ремесла и охотничьи принадлежности. На женской половине находились узлы с одеждой, ручная мельница, мешки для хранения продуктов, резные сосуды из тыквы для воды и предметы женского рукоделия.\n\nМебели в юрте обычно очень мало — казаны, большие блюда и чаши для еды (посуда), а также украшенный узорами или расписной деревянный сундук для хранения вещей. Свернутые одеяла и матрасы обычно хранились на сундуке.\n\nИздревле люди отождествляли юрту с моделью космоса. Сакральными зонами в доме считались: порог, очаг и Почетное место (төр) напротив входа, над которым с помощью сеток из красных узорных лент (қыз-қур) создавался декоративный акцент. Купол юрты и очаг олицетворяли символы солнца и огня. Перекрестие купола юрты (шанарак) направлено в зенит мира. В теплую погоду его оставляют открытым, что дает возможность наблюдать за небесными светилами.`,

      section1_title: "1. ИНЖЕНЕРИЯ: \"Шедевр, возведенный без границ\"",
      section1_text: `Каракалпакская Юрта (QARA-Uy) — это самая совершенная мобильная архитектура, изобретенная человечеством, и вершина инженерной мысли. То, чем сегодня гордится современность, называя "инновациями", наши предки создали уже давно.\n\nБыстросборная конструкция: В ней нет железных гвоздей, нет пластика. Но есть прочная система, прошедшая испытание тысячелетиями, скрепленная костью и сыромятью. Дом можно поставить за считанные часы и так же быстро собрать.\n\nАдаптация к климату: Главное отличие каракалпакских юрт от жилищ других народов Центральной Азии — её крыша (купол) высокая, конусообразная. Эта форма выбрана не случайно:\n- Осадки быстро стекают;\n- Снег не скапливается;\n- Внутренняя воздухообмен (вентиляция) идеален;\n- Обеспечивает аэродинамическую устойчивость против сильных степных ветров.\n\nСейсмическая безопасность: Стены дома называются "Кереге" (состоят из 6, 8, 12, иногда 16, 18 крыльев). Это гибкая, растяжимая, но не ломающаяся конструкция "трансформер". При землетрясении дом шатается, но не рушится.`,

      section2_title: "2. ФИЛОСОФИЯ СЕМЬИ: \"Глаз Солнца и Взор Тенгри\"",
      section2_subtitle: "(Доисламское верование)",
      section2_text: `Наши предки были народом, живущим с взором, обращенным в небо. Они глубоко понимали звезды, смену дня и ночи, луну, времена года. Эти знания нашли отражение в куполе Юрты.\n\nШанарак: Достаточно взглянуть на высшую точку юрты. "Шанарак" — это не просто дымоход. Это символ Солнца, глаз, открытый в Небо, связь с Тенгри (Богом). Раньше, когда зимой топили очаг, он служил дымоходом, а летом — часами (определяли время по солнечному лучу).\n\nУуыки: Изогнутые деревья, поддерживающие Шанарак — "Ууыки" — символизируют солнечные лучи, которые, расходясь от шанарака, согревают его. У Каракалпакских ууыков изогнута только нижняя часть, а верхняя — прямая, что придает юрте неповторимую форму «конуса».`,

      section3_title: "3. ДИЗАЙН И КОД: \"Тайна красного цвета\"",
      section3_text: `Самое большое отличие и бренд каракалпакской Юрты от других юрт в мире (казахских, кыргызских, туркменских) — в её внутреннем оформлении.\n\n"Красный край" (Қызыл өңир): Когда вы входите внутрь, вас встречает торжество красного цвета. Почему красный? Это не просто украшение. Красный — символ огня, крови, жизни;\nЭнергия солнца и цвет защиты от злых сил. Он заставляет убранство дома выглядеть "теплым" и придает человеку психологическую силу.\n\nЗашифрованные послания: Каждый узор на "Баскуре", "Аяк баў", "Жан баў" — это ненаписанная книга. Они служат не только для красоты, это оберег (космический код), защищающий семью от дурного глаза, и инженерная деталь, прочно удерживающая конструкцию.\n\n«Среди юрт, распространенных у народов Средней Азии, величественная каракалпакская Юрта (QARA-Uy) считается самой красивой и удивительной, украшенной с глубоким смыслом». — Академик Алькей Маргулан (из доклада на международной научной конференции в Москве, 1964 год).`,

      section4_title: "4. КОСМОГОНИЯ: \"Философия пространства и Гармония\"",
      section4_text: `С древних времён наши предки воспринимали юрту как модель космоса и делили её на две равные части. Это идея сохранения равновесия противоположностей (как Инь и Ян).\n\nПространство без углов: В юрте нет углов. Значит, здесь не скапливается плохая энергия, воздух и энергия циркулируют свободно. Человек чувствует себя частью бескрайней степи.\n\nПравая сторона (Мужская сторона): При входе в дверь — левая сторона (правая, если смотреть с төр'а). Здесь находилась мужская одежда, конское снаряжение, музыкальные инструменты и охотничье оружие. Это обитель духов-защитников.\n\nЛевая сторона (Женская сторона): При входе в дверь — правая сторона. Здесь располагались продукты, посуда (сабаяк), одежда и казан-очаг. Это обитель изобилия и благодати.\n\nТор (Сакральное место): Самое почетное место напротив двери. На тор натягивали "Красный кур" (кызыл кур), стелили самые красивые ковры и собирали "жүк" (стопка одеял/подушек). Это авторитетное место для гостя и хозяина дома.\n\nПорог: Граница двух миров (внутреннего — защищенного и внешнего — опасного). На порог наступать нельзя, это защита дома.`,

      conclusionTitle: "ЗАКЛЮЧЕНИЕ: Qara-uy — Наш Бренд, Наше Будущее.",
      conclusionText: `Qara-uy — это не пережиток прошлого. Это сердце нашей культуры, живая летопись нашего духа. Это музей, галерея и духовный театр.\n\nЕсли один знак может полностью охарактеризовать каракалпакский народ — то это "Qara-uy".\n\nНаша история — в её решетках (кереге);\nНаш дух — в её шанараке;\nНаше воспитание — в её төр'е;\nНаше космическое мышление — в её строении.\n\nКаждый человек, увидевший Qara-uy приходит к мысли: "Этот народ никогда невозможно победить. Потому что их шанарак связан с Солнцем, а дух — с Небом".\n\nЭто наш вечный символ, который мы с гордостью можем показать миру, сохраняя прошлое и открывая путь в будущее.`,
      
      videoBtn: "Смотреть видео",
      shareTitle: "Свяжитесь с нами:"
    },
    EN: {
      title: "THE KARAKALPAK YURT (QARA ÚY): Not just a shelter, but a model of the entire Universe",
      subtitle: "«Understanding the Cosmos and the engineering wisdom of our ancestors»",
      introTitle: "The Father of Eco-Architecture",
      introText: "Today, when the world's architects are puzzling over \"mobile homes,\" \"green architecture,\" and \"eco-residences,\" thinking about how to harmonize technology with nature, the Karakalpak people conceived this a thousand years ago.\n\nThe Qara Úy (literally \"Great House\") is not just the dwelling of a nomadic people. It is a connection between the Earth and the Sky, an expanded model of the Cosmos. A person stepping into a Qara Úy enters not just a space, but a whole world—a living philosophy born of the wisdom of our ancestors. This is our purest, most undistorted national code.",
      qaraLink: "What is QARA? Full explanation here…",

      mainContent: `The yurt is a symbol of the culture of all Turkic nomadic peoples. In fact, the word "Yurt" originally referred to the campsite or homeland where it was constructed.\nThe yurt is a nomad's dwelling that fully meets their needs due to its convenience and practicality. It is quickly constructed, easily disassembled, and easily transported during migrations from pasture to pasture. The felt cover is impervious to rain, wind, and cold. In addition to the inner pair of wooden doors, the yurt also features an outer door made of a reed screen sewn onto a dense fabric base.\n\nThe walls of the yurt consist of a series of lattice sections called "Qanat". The word qanat means "wing," as they fold and unfold. Different yurts are assembled from 6, 8, or rarely 12 folding sections. When these lattice sections are joined together to form a circle, completed by the installation of the door frame, they are collectively called the Kerege.\n\nThe exterior of the kerege was traditionally lined with reed screens. In the past, people who could not afford felt for the roof used these reed screens instead. They can be easily rolled up to let in fresh air during the summer.\n\nThe roof of the yurt is formed by long poles (Uwıqs) attached to the central circular crown (Shanaraq). The Shanaraq consists of two hoops; its weight holds the entire frame of the yurt together. It serves as a skylight (window), and in the old days, when people lived in yurts during winter, it served as a chimney for the hearth placed in the center of the room. The roof is usually covered with three pieces of felt. The front and rear roof coverings are semicircular, while the felt covering the smoke hole (Tu'n'lik) is rectangular. Long ropes extend from the corners of this covering; when it was necessary to open the smoke hole, one of the ropes was untied and the felt was pulled aside.\n\nIn the old days, handmade textiles for the yurt formed the bride's dowry, which she prepared for her wedding under her mother's guidance over the course of 6–8 years. The palette of the yurt's textile decorations copied the colors of the native nature. It consisted of a calm yet rich range of ochre and red-brown colors. Black and white occupied a special place, used for the main background of ornaments and as contour lines.\n\nThe inner waist belt (Ishki beldew), a strip 30–40 cm wide, runs around the outside of the yurt with the pattern facing inward. It adds vital structural stability to the construction.\nA lint-free woolen ribbon in red and black (Qızıl basqur), 60–70 cm wide, plays an important structural role in securing the roof's circumference and maintaining its slope.\nA white ribbon (Aq basqur), 40–50 cm wide, woven using a complex technique on a white cotton base and decorated with woolen pile, is placed above the red ribbon with the decorated side facing inward. Its function is to reinforce the felt and prevent it from stretching.\nA set of bright woolen cords with tassels at the ends (Ayaqbaw) is suspended from the dome of the yurt to create a stunning decorative effect.\n\nThe yurt is conventionally divided into three parts. The place of the owner (and the place of honor) is located opposite the entrance, called the Tór. When receiving honored guests, this place was yielded to them.\nThe men's half was located to the left of the entrance. Here, men's clothing, musical instruments, horse harnesses, hunting tools, and craftsmanship equipment were stored.\nThe women's half was to the right of the entrance. Here, bundles of clothes, a hand mill, food storage sacks, carved gourd vessels for water, and items for women's crafts were kept.\n\nFurniture in the yurt is usually minimal—cauldrons, large dishes for food (sabaq), and a carved or painted wooden chest for storage. Quilts and mattresses are typically stacked on top of the chest. Since ancient times, people identified the yurt with a model of the Cosmos. The sacred zones in the house were: the threshold, the hearth, and the Tór (place of honor) opposite the entrance, which was decoratively accented with a net of red patterned ribbons (Qız-qur). The dome and the hearth embodied the symbols of the Sun and Fire. The cross-section of the dome (Shanaraq) is oriented toward the cardinal points. In warm weather, it is left open, allowing observation of the celestial bodies.`,

      section1_title: "1. ENGINEERING: \"A Masterpiece Without Borders\"",
      section1_text: `The Karakalpak Yurt is the pinnacle of mobile architecture and engineering thought invented by humanity. What the modern age boasts of as "innovation," our ancestors created long ago.\n\nQuick-assembly construction: It has no iron nails or plastic. But there is a robust system, tested for millennia, fastened with bone and rawhide. The home can be erected in a few hours and dismantled just as quickly.\n\nClimate Adaptation: The main difference between Karakalpak yurts and those of other Central Asian peoples is the high, conical shape of the roof. This form is not chosen by chance:\n- Precipitation drains quickly;\n- Snow does not accumulate;\n- Internal air exchange (ventilation) is ideal;\n- It provides aerodynamic stability against strong steppe winds.\n\nSeismic Safety: The wall is called "Kerege" (consisting of 6, 8, 12, sometimes 16 or 18 wings). It is a flexible, stretchable, yet unbreakable "transformer" structure. If the earth shakes, the house sways but does not collapse.`,

      section2_title: "2. PHILOSOPHY OF THE SHANARAQ: \"Eye of the Sun and Gaze of Tengri\"",
      section2_subtitle: "(Pre-Islamic belief)",
      section2_text: `Our ancestors lived with their eyes turned to the sky. They deeply understood the stars, the sun, the moon, and the seasons. This knowledge is reflected in the roof of the Qara Úy.\n\nShanaraq: Just look at the highest point of the house. The "Shanaraq" is not just a smokehole. It is the symbol of the Sun, an Eye open to the Sky, a connection with Tengri (God). In the past, it served as a chimney in winter and a clock in summer (determining time by the sunbeams).\n\nUwiqs: The curved poles holding the Shanaraq—"Uwiqs"—represent sunbeams radiating from the center and warming the home. Karakalpak uwiqs are curved only at the bottom and straight at the top, giving the yurt its unique "conical" shape.`,

      section3_title: "3. DESIGN AND CODE: \"The Mystery of Red\"",
      section3_text: `The biggest difference and brand identity of the Karakalpak Yurt compared to others (Kazakh, Kyrgyz, Turkmen) lies in its interior decoration.\n\n"Red Edge" (Qızıl óńir): Upon entering, you are greeted by the triumph of the color red. Why red? This is not mere decoration. Red is the symbol of fire, blood, and life; it represents solar energy and protection from evil forces. It makes the home look "warm" and gives psychological strength to the person.\n\nEncrypted Messages: Every pattern on the Basqur, Ayaqbaw, and Janbaw is an unwritten book. They serve not only beauty but act as amulets (cosmic codes) protecting the family from the evil eye, while also serving as engineering details that hold the structure firmly.\n\n"Among the yurts widely spread among the peoples of Central Asia, the majestic Karakalpak Qara Úy is considered the most beautiful, magnificently decorated, and deeply meaningful." — Academician Alkey Margulan (from a paper presented at an international scientific conference in Moscow in 1964).`,

      section4_title: "4. COSMOGONY: \"Philosophy of Space and Harmony\"",
      section4_text: `Since ancient times, our ancestors considered the yurt a model of the cosmos and divided it into two equal parts. This represents the idea of maintaining a balance of opposites (like Yin and Yang).\n\nA space without corners: There are no corners in a Qara Úy. Therefore, no harmful energy accumulates here; air and energy circulate freely. A person feels like a part of the endless steppe.\n\nRight side (Male side): When entering through the door, the left side (which is the right side from the perspective of the Tór). Men's clothing, horse harnesses, musical instruments, and hunting implements were stored here. This is the abode of guardian spirits.\n\nLeft side (Female side): The right side when entering through the door. Food, dishes (sabayaq), clothes, and cauldrons were stored here. This is the abode of abundance.\n\nTór (Sacred place): The most honorable place, located directly opposite the door. The "Red Ribbon" (Qızıl qur) was stretched across the Tór, where the most beautiful carpets were spread and bedding was stacked. This is the place of honor for both the guest and the host.\n\nThreshold: The boundary between two worlds (inner—protected, and outer—dangerous). The threshold must not be stepped on; it is the guardian of the house.`,

      conclusionTitle: "CONCLUSION: The Karakalpak Yurt is Our Brand, Our Future",
      conclusionText: `The Qara Úy is not a relic of the past. It is the heart of our culture, a living record of our spirit. It is a museum, a gallery, and a spiritual theater.\n\nIf one symbol fully describes the Karakalpak people, it is the Qara Úy.\n\nOur history is in its Kerege (walls);\nOur spirit is in its Shanaraq;\nOur upbringing is in its Tór;\nOur cosmic thinking is in its structure.\n\nEveryone who sees the Qara Úy concludes: "This nation can never be defeated. Because their Shanaraq is connected to the Sun, and their spirit is connected to the Sky."\n\nThis is our eternal symbol, which we can proudly show to the world, preserving the past and paving the way to the future.`,
      
      videoBtn: "Watch Video",
      shareTitle: "Connect with us:"
    },
    PL: {
      title: "KARAKALPACKA JURTA (QARA ÚY): Nie tylko schronienie, ale model całego Wszechświata",
      subtitle: "«Zrozumienie kosmosu i mądrość inżynieryjna naszych przodków»",
      introTitle: "Ojciec eko-architektury",
      introText: "Dzisiaj, gdy światowi architekci głowią się nad \"domami mobilnymi\", \"zieloną architekturą\" i \"ekologicznymi domami mieszkalnymi\", zastanawiając się, jak zharmonizować technologię z naturą, naród karakalpacki wymyślił to już tysiąc lat temu.\n\nQara Úy (dosłownie \"Wielki Dom\") to nie tylko schronienie koczowniczego ludu. To połączenie między Ziemią a Niebem, rozszerzony model Kosmosu. Człowiek, który wchodzi do Qara Úy, wkracza nie tylko w pewną przestrzeń, ale w cały świat – żywą filozofię zrodzoną z mądrości naszych przodków. To nasz najczystszy, najbardziej niezniekształcony kod narodowy.",
      qaraLink: "Czym jest QARA? Pełne wyjaśnienie tutaj…",

      mainContent: `Jurta jest symbolem kultury wszystkich tureckich ludów koczowniczych. W rzeczywistości słowo "Jurta" oznacza obozowisko, na którym jest ona wznoszona, i tłumaczy się jako ojczyzna, miejsce rodowe.\nJurta to dom nomadów, który w pełni zaspokaja ich potrzeby dzięki swojej wygodzie i praktyczności. Jest szybka w budowie, łatwa w demontażu i prosta w transporcie podczas koczowniczych wędrówek z pastwiska na pastwisko. Filcowa powłoka nie przepuszcza deszczu, wiatru ani chłodu. Oprócz wewnętrznej pary drewnianych drzwi, w jurcie znajdują się również drzwi zewnętrzne wykonane z trzcinowej maty, przyszytej do podstawy z grubego materiału.\n\nŚciany jurty składają się z szeregu rozkładanych sekcji kratowych zwanych "Qanat". Słowo qanat oznacza "skrzydło", ponieważ sekcje te otwierają się i zamykają. Różne jurty są montowane z 6, 8, a rzadziej 12 składanych części. Kiedy sekcje kratowe łączy się ze sobą, tworząc okrąg zakończony framugą drzwi, nazywa się je Kerege.\n\nZ zewnątrz kerege wykładano matami z trzciny. W przeszłości ludzie, których nie było stać na filc na dach jurty, używali właśnie trzcinowych osłon. Można je łatwo podwinąć, aby latem wpuścić do środka świeże powietrze.\n\nDach jurty tworzą długie żerdzie (Uwıq), przymocowane do centralnej okrągłej korony dachu (Szanyrak/Shanaraq), składającej się z dwóch obręczy. Szanyrak swoją masą utrzymuje szkielet jurty, służy jako okno świetlne, a w dawnych czasach, gdy w Qara Úy mieszkano zimą, służył jako komin, dlatego palenisko umieszczano na środku pomieszczenia. Dach jurty jest zazwyczaj pokryty trzema płatami filcu. Przednia i tylna część pokrycia dachu są półkoliste, a filc zakrywający otwór dymny (Tünlik) ma kształt prostokąta. Od rogów tego filcowego pokrycia biegną długie liny; kiedy trzeba było otworzyć otwór dymny, jedną z lin odwiązywano i odciągano filc na bok.\n\nW dawnych czasach rękodzieło tekstylne do jurty stanowiło posag panny młodej, który przygotowywała ona na wesele pod kierunkiem matki przez 6–8 lat. Paleta dekoracji tekstylnych jurty odwzorowywała barwy rodzimej przyrody. Składała się ze spokojnej, ale jednocześnie nasyconej gamy kolorów ochry i czerwono-brązowych. Szczególne miejsce zajmowały czerń i biel, używane jako główne tło ornamentu oraz jako linie konturowe.\n\nWewnętrzny pas (Ishki beldew) o szerokości 30–40 cm biegnie wokół zewnętrznej strony jurty wzorem skierowanym do wewnątrz. Nadaje on konstrukcji kluczową stabilność strukturalną.\nWełniana, niestrzępiąca się taśma w kolorze czerwono-czarnym (Qızıl basqur) o szerokości 60–70 cm odgrywa ważną rolę konstrukcyjną w mocowaniu obwodu dachu i zachowaniu jego nachylenia.\nBiała taśma (Aq basqur) o szerokości 40–50 cm, tkana skomplikowaną techniką na białej bawełnianej osnowie i zdobiona wełnianym włosiem, znajduje się nad czerwoną taśmą, zdobioną stroną do wewnątrz. Jej funkcją jest wzmocnienie filcu, aby zapobiec jego rozciąganiu.\nZestaw jasnych, wełnianych sznurów z frędzlami na końcach (Ayaqbaw) jest zawieszony u kopuły jurty, tworząc wspaniały efekt dekoracyjny.\n\nJurta jest umownie podzielona na trzy części. Miejsce właściciela domu (i miejsce honorowe) znajduje się naprzeciwko wejścia do jurty (Tór). W przypadku przyjmowania szanownych gości, miejsce to ustępowano im.\nPołowa męska znajdowała się po lewej stronie od wejścia. Przechowywano tu odzież męską, instrumenty muzyczne, uprząż końską, narzędzia rzemieślnicze i myśliwskie.\nPołowa żeńska znajdowała się po prawej stronie od wejścia. Znajdowały się tu tobołki z odzieżą, żarna, worki na żywność, naczynia z wydrążonej dyni na wodę oraz przedmioty kobiecego rękodzieła.\n\nMebli w jurcie jest zazwyczaj niewiele – kotły, duże misy na jedzenie (tabaq), a także rzeźbiona lub malowana drewniana skrzynia do przechowywania rzeczy. Pikowane kołdry i materace zazwyczaj układano na skrzyni. Od starożytności ludzie utożsamiali jurtę z modelem kosmosu. Za strefy sakralne w domu uważano: próg, palenisko i Tór (miejsce honorowe) naprzeciwko wejścia, nad którym tworzono akcent dekoracyjny za pomocą siatki z czerwonych wzorzystych taśm (Qızıl qur). Kopuła jurty i palenisko ucieleśniały symbol słońca i ognia. Przecięcie kopuły jurty (Szanyrak) skierowane jest w zenit świata. W ciepłą pogodę pozostawia się je otwarte, co umożliwia obserwację ciał niebieskich.`,

      section1_title: "1. INŻYNIERIA: \"Arcydzieło bez granic\"",
      section1_text: `Karakałpacka Jurta (Qara Úy) to szczyt mobilnej architektury i myśl inżynieryjna wynaleziona przez ludzkość. To, czym dzisiejszy świat chwali się jako "innowacją", nasi przodkowie stworzyli dawno temu.\n\nSzybki montaż: Nie ma w niej żelaznych gwoździ ani plastiku. Jest za to solidny system, sprawdzony przez tysiąclecia, spięty kością i surową skórą. Dom można postawić w kilka godzin i równie szybko złożyć.\n\nAdaptacja do klimatu: Główna różnica między jurtami karakalpackimi a domami innych narodów Azji Centralnej polega na tym, że ich dach jest wysoki i stożkowaty. Ten kształt nie został wybrany przypadkowo:\n- Opady szybko spływają;\n- Śnieg się nie gromadzi;\n- Wewnętrzna wymiana powietrza (wentylacja) jest idealna;\n- Zapewnia stabilność aerodynamiczną wobec silnych stepowych wiatrów.\n\nBezpieczeństwo sejsmiczne: Ściana domu nazywa się "Kerege" (składa się z 6, 8, 12, czasem 16, 18 skrzydeł). Jest to elastyczna, rozciągliwa, ale niełamliwa konstrukcja typu "transformer". Gdy ziemia się trzęsie, dom kołysze się, ale nie zawala.`,

      section2_title: "2. FILOZOFIA SZANARAKA: \"Oko Słońca i Spojrzenie Tengri\"",
      section2_subtitle: "(Wierzenia przedislamskie)",
      section2_text: `Nasi przodkowie byli ludźmi, którzy żyli z wzrokiem skierowanym w niebo. Głęboko rozumieli gwiazdy, słońce, księżyc i pory roku. Ta wiedza odzwierciedlona jest w dachu Qara Úy.\n\nSzanarak (Shanaraq): Wystarczy spojrzeć na najwyższy punkt domu. "Szanarak" to nie tylko otwór dymny. To symbol Słońca, Oko otwarte na Niebo, więź z Tengri (Bogiem). Dawniej, gdy zimą rozpalano palenisko, służył jako komin, a latem jako zegar (określano czas za pomocą promieni słonecznych).\n\nUwyki (Uwıqs): Wygięte żerdzie podtrzymujące szanarak – "Uwyki" – symbolizują promienie słoneczne, które emanują światłem i ogrzewają dom. Karakalpackie uwyki są wygięte tylko w dolnej części, a w górnej proste, co nadaje jurcie niepowtarzalny kształt "stożka".`,

      section3_title: "3. DESIGN I KOD: \"Tajemnica czerwieni\"",
      section3_text: `Największa różnica i znak firmowy Karakalpackiej Jurty w porównaniu do innych jurt na świecie (kazachskiej, kirgiskiej, turkmeńskiej) leży w jej wystroju wewnętrznym.\n\n"Czerwona krawędź" (Qızıl óńir): Po wejściu wita cię triumf czerwieni. Dlaczego czerwień? To nie tylko dekoracja. Czerwień to symbol ognia, krwi, życia; energia słoneczna i kolor ochronny przed złymi mocami. Sprawia, że dom wydaje się "ciepły" i daje człowiekowi siłę psychiczną.\n\nZaszyfrowane wiadomości: Każdy wzór na "Basqur", "Ayaqbaw", "Janbaw" to nienapisana księga. Służą nie tylko pięknu, ale są amuletami (kodem kosmicznym) chroniącymi rodzinę przed złym okiem oraz elementami inżynieryjnymi, które mocno trzymają konstrukcję.\n\n"Wśród domów szeroko rozpowszechnionych wśród narodów Azji Środkowej, majestatyczny Qara Úy Karakalpaków (Qara Úy) jest uważany za najpiękniejszy i najwspanialej ozdobiony dom o głębokim znaczeniu." – Akademik Alkey Margulan (z referatu na międzynarodowej konferencji naukowej w Moskwie w 1964 roku).`,

      section4_title: "4. KOSMOGONIA: \"Filozofia przestrzeni i Harmonia\"",
      section4_text: `Od starożytności nasi przodkowie uważali jurtę za model kosmosu i dzielili ją na dwie równe części. Jest to idea utrzymania równowagi przeciwieństw (jak Yin i Yang).\n\nPrzestrzeń bez kątów: W Czarnym Domu nie ma kątów. Dlatego nie gromadzi się tu szkodliwa energia, a powietrze i energia krążą swobodnie. Człowiek czuje się częścią bezkresnego stepu.\n\nPrawa strona (Strona męska): Po wejściu przez drzwi – lewa strona (prawa strona, patrząc od strony Tór). Przechowywano tu odzież męską, uprząż końską, instrumenty muzyczne i narzędzia łowieckie. To siedziba duchów opiekuńczych.\n\nLewa strona (Strona żeńska): Prawa strona przy wejściu przez drzwi. Przechowywano tu żywność, naczynia (sabayaq), ubrania i kotły. To siedziba obfitości.\n\nTór (Święte miejsce): Najbardziej honorowe miejsce, znajdujące się naprzeciwko drzwi. Na honorowym miejscu rozciągano "Czerwoną Wstęgę" (Qızıl qur), rozkładano najpiękniejsze dywany i układano dobytek (júk). To miejsce honorowe zarówno dla gościa, jak i gospodarza domu.\n\nPróg: Granica między dwoma światami (wewnętrznym – chronionym i zewnętrznym – niebezpiecznym). Nie wolno następować na próg, jest on strażnikiem domu.`,

      conclusionTitle: "WNIOSEK: Qara Úy to Nasza Marka, Nasza Przyszłość",
      conclusionText: `Qara Úy nie jest reliktem przeszłości. Jest sercem naszej kultury, żywą kroniką naszego ducha. To muzeum, galeria i teatr duchowy.\n\nJeśli jeden symbol w pełni opisuje naród karakalpacki, jest nim Qara Úy.\n\nNasza historia jest w jej Kerege;\nNasz duch jest w jej Szanyraku;\nNasze wychowanie – w jej Tórze;\nNasze kosmiczne myślenie jest w jej strukturze.\n\nKażdy, kto widział Qara Úy, dochodzi do wniosku: "Tego narodu nigdy nie da się pokonać. Ponieważ ich Szanyrak jest związany ze Słońcem, a ich duch jest związany z Niebem".\n\nTo nasz wieczny symbol, który z dumą możemy pokazać światu, zachowując przeszłość i otwierając drogę do przyszłości.`,
      
      videoBtn: "Obejrzyj wideo",
      shareTitle: "Połącz się z nami:"
    }
  };

  const t = articleData[currentLang] || articleData.RU;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 font-serif">
      
      {/* --- LIGHTBOX (ЗУМ МЕНЕН) --- */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-md animate-fade-in overflow-hidden"
          onClick={closeLightbox}
        >
          <div className="absolute top-5 right-5 flex items-center gap-4 z-[101]">
            <button 
              onClick={handleZoomOut}
              className="p-3 bg-white/20 hover:bg-white/40 text-white rounded-full transition transform hover:scale-110"
              title="Zoom Out"
            >
              <ZoomOut size={28} />
            </button>
            <button 
              onClick={handleZoomIn}
              className="p-3 bg-white/20 hover:bg-white/40 text-white rounded-full transition transform hover:scale-110"
              title="Zoom In"
            >
              <ZoomIn size={28} />
            </button>
            <button 
              onClick={closeLightbox}
              className="p-3 bg-red-600/80 hover:bg-red-600 text-white rounded-full transition transform hover:scale-110"
              title="Close"
            >
              <X size={28} />
            </button>
          </div>
          
          <div className="overflow-auto flex items-center justify-center w-full h-full">
            <img 
              src={selectedImage} 
              alt="Full screen view" 
              className="max-w-none transition-transform duration-300 ease-out rounded-lg shadow-2xl"
              style={{ transform: `scale(${zoomLevel})`, cursor: zoomLevel > 1 ? 'grab' : 'zoom-in' }}
              onClick={(e) => e.stopPropagation()} 
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

          <div className="mb-10 text-lg border-l-4 border-amber-500 pl-4 bg-amber-50 dark:bg-gray-700/30 p-6 rounded-r-lg">
            <h3 className="font-bold text-xl mb-2">{t.introTitle}</h3>
            {/* Текст (p) */}
            <p className="whitespace-pre-line mb-8">{t.introText}</p>
            
            {/* ТАРИЙХҚА ӨТЕТУҒЫН ҮЛКЕН БАТЫРМА */}
            <div className="flex justify-center w-full mt-6 mb-2">
              <Link 
                to="/history" 
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-extrabold text-lg md:text-xl rounded-full shadow-lg hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
              >
                <span className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <span className="relative z-10">{t.qaraLink}</span>
                <ChevronRight size={28} className="relative z-10 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

          </div>

          {/* 1. СЛАЙДЕР: ВНЕШНИЙ ВИД */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-amber-600 dark:text-amber-500 mb-6 border-b border-amber-200 dark:border-gray-700 pb-2">
              {t.section1_title}
            </h2>
            <ImageSlider 
              images={[imgExt1, imgExt2, imgExt3, imgExt4]} 
              altText="Yurt Exterior" 
              onImageClick={setSelectedImage}
            />
            <div className="mt-6 whitespace-pre-line leading-relaxed">
              {t.section1_text}
            </div>
          </div>

          <hr className="my-10 border-gray-200 dark:border-gray-700" />

          {/* ОСНОВНОЙ ТЕКСТ ПРО УСТРОЙСТВО ЮРТЫ */}
          <div className="mb-12 whitespace-pre-line leading-relaxed">
            {t.mainContent}
          </div>

          <hr className="my-10 border-gray-200 dark:border-gray-700" />

          {/* 2. СЛАЙДЕР: ШАНЫРАК */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-amber-600 dark:text-amber-500 mb-6 border-b border-amber-200 dark:border-gray-700 pb-2">
              {t.section2_title}
            </h2>
            <p className="text-sm text-gray-500 italic mb-4">{t.section2_subtitle}</p>
            <ImageSlider 
              images={[imgShan1, imgShan2, imgShan3, imgShan4]} 
              altText="Shanyrak" 
              onImageClick={setSelectedImage}
            />
            <div className="mt-6 whitespace-pre-line leading-relaxed">
              {t.section2_text}
            </div>
          </div>

          <hr className="my-10 border-gray-200 dark:border-gray-700" />

          {/* 3. СЛАЙДЕР: ИНТЕРЬЕР */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-amber-600 dark:text-amber-500 mb-6 border-b border-amber-200 dark:border-gray-700 pb-2">
              {t.section3_title}
            </h2>
            <ImageSlider 
              images={[imgInt1, imgInt2, imgInt3, imgInt4]} 
              altText="Yurt Interior Red" 
              onImageClick={setSelectedImage}
            />
            <div className="mt-6 whitespace-pre-line leading-relaxed">
              {t.section3_text}
            </div>
          </div>

          <hr className="my-10 border-gray-200 dark:border-gray-700" />

          {/* 4. КОСМОГОНИЯ */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-amber-600 dark:text-amber-500 mb-6 border-b border-amber-200 dark:border-gray-700 pb-2">
              {t.section4_title}
            </h2>
            <div className="whitespace-pre-line leading-relaxed">
              {t.section4_text}
            </div>
          </div>

          {/* ЗАКЛЮЧЕНИЕ */}
          <div className="p-8 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-gray-700/50 dark:to-gray-800/50 rounded-2xl border border-amber-100 dark:border-gray-600 mb-8 mt-12 shadow-sm">
            <h3 className="font-bold text-2xl text-center text-amber-900 dark:text-amber-100 mb-4">{t.conclusionTitle}</h3>
            <p className="whitespace-pre-line text-lg">{t.conclusionText}</p>
          </div>

          {/* ВИДЕО КНОПКА */}
          <div className="text-center mb-8">
            <a href="https://youtube.com/shorts/Hdg6S8Eq_F0?si=SwJ6iIF7P4ck89UD" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full shadow-lg transition transform hover:-translate-y-1">
              <PlayCircle size={28} />
              {t.videoBtn}
            </a>
          </div>

        </div>

        {/* --- SHARE (ТАРҚАТЫЎ) --- */}
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

export default QaraUy;