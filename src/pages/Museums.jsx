import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Send, 
  Twitter, 
  Instagram, 
  Youtube, 
  Link as LinkIcon, 
  ArrowRight
} from 'lucide-react';
import { useTheme } from '../components/useTheme';

// Сүўретлерди импортлаймыз
import imgBuilding from '../assets/savitsky/museum-building.jpg';
import imgBull from '../assets/savitsky/bull-painting.jpg';
import imgChildren from '../assets/savitsky/future-generation.jpg';

const Museums = () => {
  const { i18n } = useTranslation();
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  // Ағымдағы тилди анықлаў
  const currentLang = (i18n.language === 'kaa' || i18n.language === 'kk') ? 'KK' 
                    : i18n.language === 'ru' ? 'RU' 
                    : i18n.language === 'pl' ? 'PL' 
                    : 'EN';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Силтеме көширип алынды! / Link copied!");
  };

  // --- МАЗМУН ДЕРЕКТЕРИ ---
  const articleData = {
    KK: {
      quote: "«Биз — шөлдеги халық емеспиз. Биз — шөлдеги Луврды жаратқан халықпыз.»",
      title: "Шөлдеги Лувр: Неге дүнья «Савицкий» феноменине таң қалады?",
      img1_caption: "Музейдиң жазғы көриниси",
      section1_title: "«Қум арасындағы Гәўҳар»",
      section1_text1: "Адамлар «Шөл» деген сөзди еситкенинде көз алдына шексиз қум, қапырық ыссы ҳәм бос жатырған жерди келтиреди. Бирақ, бизиң Ўатанымыз — Қарақалпақстан бул түсиникти пүткиллей өзгертеди. Азияның қақ орайында, Арал теңиздиң жағасында дүнья мәдениятының ең таңланған орынларының бири жайласқан. Оны батыс журналистлери «Шөлдеги Лувр» деп атайды. Бул — И.В. Савицкий атындағы Қарақалпақстан мәмлекетлик көркем өнер музейи.",
      section1_text2: "Бирақ, бул мақала тек музей имараты ҳаққында емес. Бул — сол музейдиң Нөкис топырағында пайда болыўы ҳәм сақланып қалыўы сыяқлы «феномен» ҳаққында. Бул — биз, қарақалпақ халқының, тек жаўынгер ғана емес, ал жоқары талғамға ийе, мәдениятлы ҳәм интеллектуал миллет екенимиздиң дәлиллемеси.",
      
      museumButton: "Музейлер ҳаққында толық оқыў",

      img2_caption: "В. Лысенконың атақлы «Буқа» (Бык) картинасы",
      section2_title: "«Қадаған етилген Реңлердиң Панасы»",
      section2_text1_part1: "Өткен әсирде, совет ҳүкимети сүўретшилерге еркин дөретиўди қадаған еткен дәўирде, «социалистлик реализм» қәлибине сыймайтуғын мыңлаған әжайып шығармалар жоқ болып кетиў қәўпи астында еди. Дәл сол ўақытта тәғдир Нөкиске ",
      section2_text1_link: "Игорь Савицкий",
      section2_text1_part2: " атлы пидайы инсанды алып келди. Ол Москвадан, Ташкенттен ҳәм басқа қалалардан «жарамсыз» деп табылған, бирақ шын мәнисинде дүньялық шедевр болған авангард сүўретлерди жыйнай баслады.",
      section2_text2: "Дүньяның таң қалатуғын жери мынаў: Неге бул сүўретлер Париж ямаса Лондонда емес, ал Нөкисте сақланып қалды?",
      section2_answer: "Себеби бул жерде оны қабыл ететуғын Жүрек бар еди.",
      section3_title: "«Халық — Руўхый Қорған»",
      section3_text1: "Савицкий бул ғәзийнени жыйнады, дурыс. Бирақ оны ким қорғады? Оны ким сақлады?",
      section3_text2: "Егер жергиликли халықтың мәдений деңгейи төмен болғанда, «бул түсиниксиз нәрселер бизге не керек?» - деп, ол картиналар баяғыда-ақ өртенип, жағылып кетер еди ямаса жертөлелерде ширип кетер еди. Бирақ қарақалпақ халқы ондай етпеди.",
      section3_text3: "Биз, әзелден сулыўлықты таныған халықпыз. Бизиң апаларымыздың тоқыған көк-көйлеги, нағыслар, зергерлеримиздиң соққан сәўкелелериндеги нәзиклик — бул туўма таланттың белгиси. Қарақалпақтың көзи реңге, гармонияға үйренген. Сонлықтан да, Савицкий алып келген өзгеше сүўретлерди халық жатырқамады.",
      section3_text4: "Биз бул дүньялық ғәзийнени үндемей ғана, артық шаўқымсыз, өз баўырымызға басып қорғадық. Бул — халықтың даналығы ҳәм ишки мәдениятының ең үлкен көриниси. Биз сулыўлықты тек жасап ғана қоймай, оны басқалардан да қызғанып, сақлай билетуғын миллетпиз.",
      img3_caption: "Келешек әўлад — тарийх пенен жүзлеспекте",
      section4_title: "«Келешекке Ашылған Есик»",
      section4_text1: "Бүгин Савицкий музейи — жай ғана туристлик объект емес. Бул Қарақалпақстанның визит карточкасы ҳәм интеллектуаллық паспорты. Дүньяның ҳәр мүйешинен келген өнертаныўшылар, Президентлер ҳәм әпиўайы саяхатшылар бул жерде басларын ийеди.",
      section4_text2: "Олар тек картиналарға емес, усы шөл далада усындай бийик руўхыйлықты сақлап қалған Халықтың күшине таң қалады.",
      section4_text3: "Бул музей — биздиң \"Манифестимиздиң\" жанлы дәлиллемеси. Биз тарийхты жарата алған, оны қорғай алған ҳәм келешекке жеткизе алатуғын зиялы халықпыз. Нөкис — дүнья мәдениятының орайларының бири, ҳәм биз буның менен мақтанамыз.",
      final_call: "Келиң, «Шөлдеги Луврды» өз көзиңиз бенен көриң. Бул жерде сиз тек сүўретлерди емес, қарақалпақ халқының кең пейилин ҳәм бийик руўхын сезинесиз.",
      shareTitle: "Биз бенен байланысың:"
    },
    RU: {
      quote: "«Мы — не народ пустыни. Мы — народ, создавший Лувр в пустыне»",
      title: "Лувр в пустыне: Почему мир поражен феноменом Савицкого?",
      img1_caption: "Летний вид музея",
      section1_title: "«Жемчужина среди песков»",
      section1_text1: "Когда люди слышат слово «пустыня», они представляют себе бескрайние пески, знойную жару и пустоту. Однако наша Родина — Каракалпакстан — полностью меняет это представление. В самом сердце Азии, близ Аральского моря, находится один из самых уникальных центров мировой культуры. Западные журналисты называют его «Лувром в пустыне». Это Государственный музей искусств Республики Каракалпакстан имени И.В. Савицкого.",
      section1_text2: "Но эта статья не просто о здании. Речь идет о феномене, о том, как этот музей возник и сохранился именно в Нукусе. Это доказательство того, что мы, каракалпаки — не только народ-воин, но и высокообразованная, культурная и интеллектуальная нация.",
      
      museumButton: "Читать подробнее о музеях",

      img2_caption: "Знаменитая картина В. Лысенко «Бык»",
      section2_title: "«Убежище для запрещённых красок»",
      section2_text1_part1: "В прошлом веке, когда советская власть запрещала художникам творить свободно, тысячи гениальных полотен, не вписывавшихся в рамки «соцреализма», оказались под угрозой уничтожения. Именно тогда судьба привела в Нукус самоотверженного человека — ",
      section2_text1_link: "Игоря Савицкого",
      section2_text1_part2: ". Он начал спасать и привозить из Москвы и Ташкента авангардные картины, которые считались «негодными», но на самом деле были мировыми шедеврами.",
      section2_text2: "Мир удивляется одному: почему эти картины уцелели в Нукусе, а не в Париже или Лондоне?",
      section2_answer: "Потому что здесь было Сердце, которое их приняло.",
      section3_title: "«Народ — Духовная Крепость»",
      section3_text1: "Савицкий собрал это сокровище, верно. Но кто его защитил? Кто его сохранил?",
      section3_text2: "Если бы уровень культуры местного населения был низок, если бы люди сказали: «Зачем нам эта мазня?», эти картины давно бы сгорели в печах или сгнили в подвалах. Но каракалпакский народ этого не допустил.",
      section3_text3: "Мы — народ, который испокон веков ценит красоту. Узоры на платьях наших бабушек, тончайшая работа наших ювелиров — это знак врожденного вкуса. Глаз каракалпака привык к цвету и гармонии. Поэтому народ не отторг, а принял то искусство, которое привез Савицкий.",
      section3_text4: "Мы хранили это мировое сокровище тихо, без лишнего шума, как своё собственное. Это высшее проявление народной мудрости. Мы — нация, которая не просто любуется красотой, но и ревностно оберегает её.",
      img3_caption: "Будущее поколение встречается с историей",
      section4_title: "«Дверь в будущее»",
      section4_text1: "Сегодня музей Савицкого — не просто туристический объект. Это визитная карточка и «интеллектуальный паспорт» Каракалпакстана. Искусствоведы, президенты и путешественники со всего мира склоняют здесь головы.",
      section4_text2: "Они восхищаются не только картинами, но и духом народа, сберегшего такую высокую культуру посреди пустыни.",
      section4_text3: "Этот музей — живое доказательство нашего Манифеста. Мы — просвещенный народ, умеющий творить историю, беречь её и передавать будущему. Нукус — один из центров мировой культуры, и мы этим гордимся.",
      final_call: "Увидьте «Лувр в пустыне» своими глазами. Здесь вы почувствуете не только силу искусства, но и широкую душу каракалпакского народа.",
      shareTitle: "Свяжитесь с нами:"
    },
    EN: {
      quote: "\"We are not a people of the desert. We are the people who created the Louvre in the desert.\"",
      title: "The Louvre in the Desert: Why is the world amazed by the Savitsky phenomenon?",
      img1_caption: "Summer view of the museum",
      section1_title: "\"A Pearl Among the Sands\"",
      section1_text1: "When people hear the word \"desert,\" they imagine endless sand, stifling heat, and emptiness. However, our homeland — Karakalpakstan — completely changes this understanding. In the very heart of Asia, near the shores of the Aral Sea, lies one of the most exquisite centers of world culture. Western journalists call it \"The Louvre in the Desert.\" This is the I.V. Savitsky State Museum of Art of the Republic of Karakalpakstan.",
      section1_text2: "But this article is not just about a building. It is about a phenomenon — how this museum emerged and survived right here in Nukus. It is proof that we, the Karakalpak people, are not only warriors but also a highly educated, cultured, and intellectual nation.",
      
      museumButton: "Read more about museums",

      img2_caption: "V. Lysenko's famous painting \"The Bull\"",
      section2_title: "\"A Sanctuary for Forbidden Colors\"",
      section2_text1_part1: "In the last century, when the Soviet government forbade artists from creating freely, thousands of brilliant works that did not fit the mold of \"Socialist Realism\" were threatened with extinction. At that time, fate brought a selfless man named ",
      section2_text1_link: "Igor Savitsky",
      section2_text1_part2: " to Nukus. He began to rescue and collect avant-garde paintings from Moscow and Tashkent that were deemed \"invalid,\" but were, in truth, world masterpieces.",
      section2_text2: "Here is what surprises the world: Why did these paintings survive in Nukus, and not in Paris or London?",
      section2_answer: "Because here, there was a Heart that accepted them.",
      section3_title: "\"The People as a Spiritual Fortress\"",
      section3_text1: "Savitsky collected this treasure, yes. But who protected it? Who saved it?",
      section3_text2: "If the local population had possessed a low cultural level, asking, \"Why do we need these strange things?\", these paintings would have been burned or rotted in basements long ago. But the Karakalpak people did not let that happen.",
      section3_text3: "We are a people who have known beauty since time immemorial. The intricate patterns on our grandmothers' dresses, the delicate jewelry crafted by our artisans — these are signs of natural talent. The Karakalpak eye is accustomed to color and harmony. Therefore, our people did not reject the unique art that Savitsky brought.",
      section3_text4: "We guarded this global treasure quietly, without fanfare, embracing it as our own. This is the greatest manifestation of our wisdom and inner culture. We are a nation that not only appreciates beauty but jealously guards it.",
      img3_caption: "Future generations meeting history",
      section4_title: "\"A Door to the Future\"",
      section4_text1: "Today, the Savitsky Museum is not just a tourist attraction. It is the business card and \"intellectual passport\" of Karakalpakstan. Art historians, Presidents, and travelers from all over the world bow their heads here.",
      section4_text2: "They admire not only the paintings but also the strength of the people who preserved such high spirituality in the middle of the desert.",
      section4_text3: "This museum is living proof of our Manifesto. We are an enlightened people who know how to create history, protect it, and pass it on to the future. Nukus is one of the centers of world culture, and we are proud of it.",
      final_call: "Come and see the \"Louvre in the Desert\" with your own eyes. Here, you will feel not only the power of art but also the generous soul and high spirit of the Karakalpak people.",
      shareTitle: "Connect with us:"
    },
    PL: {
      quote: "„Nie jesteśmy ludem pustyni. Jesteśmy ludem, który stworzył Luwr na pustyni.”",
      title: "Luwr na pustyni: Dlaczego świat zachwyca się fenomenem Sawickiego?",
      img1_caption: "Letni widok muzeum",
      section1_title: "„Perła wśród piasków”",
      section1_text1: "Kiedy ludzie słyszą słowo „pustynia”, wyobrażają sobie niekończący się piasek, nieznośny upał i pustkę. Jednak nasza Ojczyzna – Karakalpakstan – całkowicie zmienia to wyobrażenie. W samym sercu Azji, niedaleko Morza Aralskiego, znajduje się jedno z najbardziej niezwykłych miejsc światowej kultury. Zachodni dziennikarze nazywają je „Luwrem na pustyni”. To Państwowe Muzeum Sztuki Republiki Karakalpakstanu im. I.V. Sawickiego.",
      section1_text2: "Ale ten artykuł nie dotyczy tylko budynku. Mowa tu o fenomenie – o tym, jak to muzeum powstało i przetrwało właśnie w Nukusie. To dowód na to, że my, Karakalpacy, jesteśmy nie tylko wojownikami, ale także narodem wysoce wykształconym, kulturalnym i intelektualnym.",
      
      museumButton: "Czytaj więcej o muzeach",

      img2_caption: "Słynny obraz W. Łysenki „Byk”",
      section2_title: "„Schronienie dla Zakazanych Barw”",
      section2_text1_part1: "W ubiegłym stuleciu, kiedy władza radziecka zabraniała artystom swobodnego tworzenia, tysiące genialnych dzieł, które nie pasowały do ram „socrealizmu”, było zagrożonych zniszczeniem. Wtedy los sprowadził do Nukusu oddanego człowieka – ",
      section2_text1_link: "Igora Sawickiego",
      section2_text1_part2: ". Zaczął on ratować i gromadzić awangardowe obrazy z Moskwy i Taszkentu, które uznano za „bezwartościowe”, a które w rzeczywistości były światowymi arcydziełami.",
      section2_text2: "Świat dziwi się jednemu: Dlaczego te obrazy przetrwały w Nukusie, a nie w Paryżu czy Londynie?",
      section2_answer: "Odpowiedź jest prosta i głęboka: Ponieważ tutaj było Serce, które je przyjęło.",
      section3_title: "„Naród – Duchowa Twierdza”",
      section3_text1: "Sawicki zebrał ten skarb, to prawda. Ale kto go obronił? Kto go ocalił?",
      section3_text2: "Gdyby poziom kultury miejscowej ludności był niski, gdyby ludzie powiedzieli: „Po co nam te niezrozumiałe rzeczy?”, obrazy te dawno by spłonęły lub zgniły w piwnicach. Ale naród karakalpacki na to nie pozwolił.",
      section3_text3: "Jesteśmy ludem, który od wieków zna wartość piękna. Wzory na sukniach naszych babć, finezja naszej biżuterii – to znak wrodzonego talentu. Oko Karakalpaka jest przyzwyczajone do koloru i harmonii. Dlatego naród nie odrzucił sztuki, którą przywiózł Sawicki.",
      section3_text4: "Strzegliśmy tego światowego skarbu po cichu, bez zbędnego hałasu, traktując go jak własny. To największy przejaw mądrości i wewnętrznej kultury narodu. Jesteśmy narodem, który nie tylko żyje pięknem, ale także zazdrośnie go strzeże.",
      img3_caption: "Przyszłe pokolenie spotyka historię",
      section4_title: "„Drzwi do przyszłości”",
      section4_text1: "Dziś muzeum Sawickiego to nie tylko atrakcja turystyczna. To wizytówka i „intelektualny paszport” Karakalpakstanu. Historycy sztuki, prezydenci i podróżnicy z całego świata chylą tu czoła.",
      section4_text2: "Podziwiają nie tylko obrazy, ale także siłę ducha ludzi, którzy zachowali tak wysoką kulturę pośrodku pustyni.",
      section4_text3: "To muzeum jest żywym świadectwem naszego Manifestu. Jesteśmy oświeconym narodem, który potrafi tworzyć historię, chronić ją i przekazywać przyszłym pokoleniom. Nukus jest jednym z centrów światowej kultury i jesteśmy z tego dumni.",
      final_call: "Zobaczcie „Luwr na pustyni” na własne oczy. Poczujecie tu nie tylko siłę sztuki, ale także wielkoduszność i wysokiego ducha narodu karakalpackiego.",
      shareTitle: "Połącz się z nami:"
    }
  };

  const t = articleData[currentLang] || articleData.RU;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 font-serif">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-[32px] shadow-2xl overflow-hidden animate-fade-in">
        
        {/* --- МАЗМУНЫ --- */}
        <div className="p-6 md:p-12 text-gray-800 dark:text-gray-200 leading-relaxed text-lg">
          
          <div className="text-center italic text-xl text-gray-500 dark:text-gray-400 mb-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl border-l-4 border-blue-500">
            {t.quote}
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-center mb-8 text-gray-900 dark:text-white leading-tight">
            {t.title}
          </h1>

          {/* ФОТО 1 */}
          <figure className="mb-12">
            <img src={imgBuilding} alt={t.img1_caption} className="w-full h-auto rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500" />
            <figcaption className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3 italic">{t.img1_caption}</figcaption>
          </figure>

          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-10 mb-4 border-l-4 border-blue-600 pl-4">
            {t.section1_title}
          </h2>
          <p className="mb-4">{t.section1_text1}</p>
          <p className="mb-8">{t.section1_text2}</p>

          {/* МУЗЕЙЛЕРГЕ ӨТИЎ БАТЫРМАСЫ */}
          <div className="my-8 text-center">
            <Link to="/museums" className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-full shadow-lg transition transform hover:-translate-y-1 hover:shadow-xl text-lg">
              {t.museumButton}
              <ArrowRight size={20} />
            </Link>
          </div>

          {/* ФОТО 2 */}
          <figure className="mb-12">
            <img src={imgBull} alt={t.img2_caption} className="w-full h-auto rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500" />
            <figcaption className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3 italic">{t.img2_caption}</figcaption>
          </figure>

          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-10 mb-4 border-l-4 border-blue-600 pl-4">
            {t.section2_title}
          </h2>
          <p className="mb-4">
            {t.section2_text1_part1}
            {/* САВИЦКИЙГЕ СИЛТЕМЕ */}
            <a 
              href="https://ru.wikipedia.org/wiki/%D0%A1%D0%B0%D0%B2%D0%B8%D1%86%D0%BA%D0%B8%D0%B0,_%D0%98%D0%B3%D0%BE%D1%80%D1%8C_%D0%92%D0%B8%D1%82%D0%B0%D0%BB%D1%8C%D0%B5%D0%B2%D0%B8%D1%87" 
              target="_blank" 
              rel="noreferrer" 
              className="text-blue-600 dark:text-blue-400 underline font-bold hover:text-blue-800 dark:hover:text-blue-200 transition-colors"
              title="Wikipedia"
            >
              {t.section2_text1_link}
            </a>
            {t.section2_text1_part2}
          </p>
          <p className="mb-8 font-medium bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            {t.section2_text2} <br />
            <strong className="text-blue-700 dark:text-blue-300">{t.section2_answer}</strong>
          </p>

          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-10 mb-4 border-l-4 border-blue-600 pl-4">
            {t.section3_title}
          </h2>
          <p className="mb-4">{t.section3_text1}</p>
          <p className="mb-4">{t.section3_text2}</p>
          <p className="mb-4">{t.section3_text3}</p>
          <p className="mb-8">{t.section3_text4}</p>

          {/* ФОТО 3 */}
          <figure className="mb-12">
            <img src={imgChildren} alt={t.img3_caption} className="w-full h-auto rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500" />
            <figcaption className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3 italic">{t.img3_caption}</figcaption>
          </figure>

          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-10 mb-4 border-l-4 border-blue-600 pl-4">
            {t.section4_title}
          </h2>
          <p className="mb-4">{t.section4_text1}</p>
          <p className="mb-4">{t.section4_text2}</p>
          <p className="mb-8">{t.section4_text3}</p>
          
          <div className="text-xl font-bold text-center mt-12 p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl border border-blue-100 dark:border-gray-600 shadow-sm">
            {t.final_call}
          </div>
        </div>

        {/* ------------------------------------------- */}
        {/* 4. SHARE (ТАРҚАТЫЎ)                         */}
        {/* ------------------------------------------- */}
        <div className="p-6 md:p-12 border-t border-gray-100 dark:border-gray-700">
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
          
      </div>
    </div>
  );
};

export default Museums;