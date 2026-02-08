// ФОТОЛАРДЫ ИМПОРТТАУ (Тұлғалар)
import ad1 from '../assets/figures/allayar_dosnazarov1.jpg';
import ad2 from '../assets/figures/allayar_dosnazarov2.jpg';
import ad3 from '../assets/figures/allayar_dosnazarov3.png';
import ad4 from '../assets/figures/allayar_dosnazarov4.jpg';

// ДӘЎИРЛЕР (ERAS) СҮЎРЕТЛЕРИ
import era1 from '../assets/eras/era1.jpg';
import era2 from '../assets/eras/era2.jpg';
import era3 from '../assets/eras/era3.jpg';
import era4 from '../assets/eras/era4.jpg';
import era5 from '../assets/eras/era5.jpg';

// 1. ДӘЎИРЛЕР ДИЗИМИ (5 ERA) - ТИЛ ТӘРТИБИ: RU -> KK -> EN -> PL
export const erasData = [
  {
    id: 'ancient',
    image: era1,
    title: {
      RU: "Древний мир",
      KK: "Әййемги дәўир",
      EN: "Ancient Era",
      PL: "Starożytność"
    },
    desc: {
      RU: "Томирис, Ширак и ранние цивилизации",
      KK: "Тумарис, Шырақ ҳәм дәслепки цивилизациялар.",
      EN: "Tomiris, Shirak and early civilizations",
      PL: "Tomiris, Shirak i wczesne cywilizacje"
    }
  },
  {
    id: 'biyler',
    image: era2,
    title: {
      RU: "Эпоха Биев",
      KK: "Бийлер дәўири",
      EN: "Era of Biys",
      PL: "Era Bijów"
    },
    desc: {
      RU: "Героические эпосы, Едиге, Маман бий",
      KK: "Қаҳарманлық дәстанлар, Едиге, Маман бий",
      EN: "Heroic epics, Edige, Maman biy",
      PL: "Bohaterskie eposy, Edige, Maman biy"
    }
  },
  {
    id: 'classic',
    image: era3,
    title: {
      RU: "Классическая литература",
      KK: "Классикалық әдебият",
      EN: "Classical Literature",
      PL: "Literatura klasyczna"
    },
    desc: {
      RU: "XVIII-XIX века: Жиен жырау, Бердах, Аджинияз",
      KK: "XVIII-XIX әсирлер: Жийен жыраў, Бердақ, Әжинияз",
      EN: "18th-19th centuries: Jien jyrau, Berdakh, Ajiniyaz",
      PL: "XVIII-XIX wiek: Jien jyrau, Berdakh, Ajiniyaz"
    }
  },
  {
    id: 'new_era',
    image: era4,
    title: {
      RU: "Новая эпоха (XX век)",
      KK: "Жаңа дәўир (XX әсир)",
      EN: "New Era (20th Century)",
      PL: "Nowa Era (XX wiek)"
    },
    desc: {
      RU: "Рождение республики, просветители",
      KK: "Республиканың дүзилиўи, ағартыўшылар",
      EN: "Birth of the republic, enlighteners",
      PL: "Narodziny republiki, oświeciciele"
    }
  },
  {
    id: 'independence',
    image: era5,
    title: {
      RU: "Независимость",
      KK: "Ғәрезсизлик",
      EN: "Independence",
      PL: "Niepodległość"
    },
    desc: {
      RU: "Современный Каракалпакстан",
      KK: "Заманагөй Қарақалпақстан",
      EN: "Modern Karakalpakstan",
      PL: "Współczesny Karakałpakstan"
    }
  }
];

// 2. ТУЛҒАЛАР (FIGURES) - "era" КОДЫ ҚОСЫЛДЫ
export const figuresData = [
  {
    id: 'allayar-dosnazarov',
    era: 'new_era', // ⚠️ МАҢЫЗЛЫ: Бул адам 4-дәўирге тийисли
    name: "Аллаяр Досназаров",
    years: "1896 — 1937",
    category: "state_leader",
    images: [ad1, ad2, ad3, ad4],
    videoUrl: "https://www.youtube.com/embed/NiFA3djQHP4",
    
    // МАЗМҰНЫ (4 ТІЛДЕ) - RU -> KK -> EN -> PL
    content: {
      RU: {
        name: "Аллаяр Досназаров Коразович",
        role: "Партийный и государственный деятель Каракалпакстана",
        bio: `Аллаяр Досназаров Коразович (8 мая 1896, 10-й аул Чимбайского района Сырдарьинской области (ныне Караузякский район Каракалпакстана) — 8 декабря 1937) — выдающийся партийный и государственный деятель Каракалпакстана.

Жизнь:
Родился в 1896 году в местности Тербенбес Чимбайского уезда Амударьинского отдела. Первенец в семье. По национальности каракалпак. Родился в семье бедного дехканина. Работал пастухом, с 13 лет рабочим на хлопкоочистительном заводе в Хиве. В 1914–1917 годах работал ремесленником на предприятиях Петро-Александровска (ныне Турткуль).

Деятельность:
Член КПСС с декабря 1918 года. Участник Гражданской войны. В 1918–1921 годах служил в 3-4 полках 1-й Туркестанской армии Красной Армии. Сражался на Северном фронте, затем против басмачей.

С августа 1921 по 1922 год учился в Коммунистическом университете трудящихся Востока им. И.В. Сталина в Москве.

Занимая ответственные посты, уделял особое внимание подготовке национальных кадров. В 1922–1924 годах — первый секретарь Кунградского окружного комитета ВКП(б), заведующий агитационно-пропагандистским отделом Чимбайского райкома.

В 1924 году — председатель контрольной комиссии Амударьинского областного комитета Компартии Туркестана.
Член комиссии по национально-государственному размежеванию Средней Азии (1924), председатель оргбюро по созданию Каракалпакской автономной области.

В 1925 году стал первым секретарем Каракалпакского обкома партии. Активно участвовал в создании нового алфавита, привлечении кадров для обучения детей, открытии педагогического и сельскохозяйственного техникумов в Турткуле.

1926–1930: Студент Среднеазиатского коммунистического университета (Ташкент) и КУТВ (Москва).
1931: Заместитель начальника треста «Металлострой» в Москве.

Арест и гибель:
Арестован в январе 1935 года. 8 апреля 1935 года приговорен к 10 годам лишения свободы. Отбывал наказание в Соловецком лагере. 8 декабря 1937 года расстрелян по решению тройки УНКВД.

Реабилитация:
Реабилитирован решением Верховного суда СССР от 28 сентября 1968 года.

Память:
В 1991 году отмечалось 85-летие А. Досназарова. Снят документальный фильм «Елим деген ер еди...». В Нукусе установлен бюст (2020), его именем названа центральная улица (бывшая Калинина).`
      },
      KK: {
        name: "Аллаяр Досназаров Қораз улы",
        role: "Қарақалпақстан партия ҳәм мәмлекет ғайраткери",
        bio: `Аллаяр Досназаров Қораз улы (1896-жыл 8-май, Сырдәрья ўәлаяты Шымбай районындағы 10-аўыл (ҳәзирги Қарақалпақстанның Қараөзек районы) — 1937-жыл 8-декабрь, Қарақалпақстан партия ҳәм мәмлекет ғайраткери.

Өмири:
Аллаяр Досназаров 1896-жылы Әмиўдәрья бөлиминиң Шымбай районы уезине қараслы Тербенбес деген жеринде (Қараөзек районы аймағы) дүньяға келген. Шаңарақта туңғыш перзент. Миллети — қарақалпақ. Кәмбағал дыйхан шаңарағында туўылған. Қой баққан, кейин 13 жасында Хийўадағы пахта тазалаў заводында жумысшы болып ислеген. 1914-1917-жылларда Әмиўдәрья ўәлаятының Петро-Александровск (ҳәзирги Төрткүл) қаласындағы бир қатар кәрханаларда өнермент болған.

Искерлиги:
Баслы мақала: Аллаяр Досназаровтың хронологиясы
1918-жыл декабрьден КПСС ағзасы. Пуқаралар урысы қатнасыўшысы. 1918-1921-жылларда Қызыл Армия 1-Түркстан армиясының 3-4-полкында хызмет еткен. Арқа фронтта, кейин болса баспашылар менен урысқан. 1919-1920-жылларда полктың қадағалаў комиссиясы баслығы етип сайланды.

1921-жыл августтан 1922-жылға шекем Москвада И.В.Сталин атындағы Шығыс мийнеткешлери коммунистлик университетинде оқыған.

Ол жуўапкер лаўазымларда болып, жергиликли миллет ўәкиллеринен кадрлар таярлаўға айрықша итибар қаратты. 1922-1924-жылларда Болшевиклер Пүткил Аўқам Коммунистлик партиясы Қоңырат округ комитетиниң биринши хаткери, басшы. Партия Шымбай районы-қала комитетиниң үгит-нәсият бөлими.

1924-жылда Түркистан Компартияси Әмиўдәрья ўәлаят комитети қадағалаў комиссиясы баслығы.

1924-жылда Орта Азия миллий-мәмлекет шегараларын белгилеў комиссиясы ағзасы, 1924-1925-жылларда Қарақалпақстан Толық ҳуқықлы ўәлаятын шөлкемлестириў бойынша арнаўлы бюро ҳәм Қарақалпақстан Компартиясы ўәлаят комитети баслығы болған.

А.Досназаров мәмлекет искерлигин «Қосшы» шөлкеминен баслаған, кейининен халық хожалығы ушын кадрлар таярлаў бойынша қысқа мүддетли курслар ашқан.

1925-жылда Қарақалпақ толық ҳуқықлы ўәлаяты Компартияси ўәлаят комитетиниң жуўапкер (биринши) хаткери. 1925-жылда ол жаңа әлипбе жаратыў ҳәм мектеплерде балаларды оқытыў ушын ески кадрларды тартыўда актив қатнасты. Мектеплер ушын жаңа сабақлықлар жаратыў усынысы менен шықты. Жаслар арасынан инталы ул-қызларды Ташкент ҳәм Москва қалаларына оқыўға жиберди. 1925-жылы Досназаровтың актив қатнасыўы менен Төрткүл қаласында педагогика ҳәм аўыл хожалығы техникумлары дүзилди.

1925-1926-жылларда Қарақалпақ автоном округы НКВД полиция басқармасы сиясий комиссары болған.

1926-1930-жылларда Ташкенттеги Орта Азия Коммунистлик университети студенти, кейининен Москвадағы КУТВ - да оқып, оны 1930-жылда тамамлаған. 1930-1931-жылларда Башқурт Автоном Совет Социалистик Республикасы Жумысшы ҳәм дыйхан инспекциясы Орайлық қадағалаў комиссиясы - халық комиссарлығы коллегиясы ағзасы болып сайланған.

1931-жылдан Москвадағы «Металлострой» трести баслығының орынбасары.

Өмириниң соңғы жыллары
Аллаяр Досназаров 1935-жыл январьда қамаққа алынды. 1935-жыл 8-апрельде СССР Жоқары суды Әскерий коллегиясы тәрепинен судланып, РСФСР Жынаят кодексиниң 58-8-бәнтлери бойынша 10-жыл тутқынға алыў жазасына ҳүким етилген. Жазаны Соловецкий қамақханасында өтеген. 1937-жыл 10-ноябрьде УНКВД ЛО арнаўлы үшлиги статьялары бойынша ҳүким етилди. Арт. РСФСР Жынаят кодексиниң 58-8-11 өлим жазасы берилип, 1937-жыл 8-декабрьде атылған.

Ақланыўы
СССР Жоқарғы судының 1968-жыл 28-сентябрьдеги қарары менен А.Қ.Досназаров ақланды

Қәбири
Жазыўшы Алпысбай Султанов, Шоманай районы «Ташкент» дыйхан хожалығының турғыны Байрам Шаниязович Сейтниязов ҳәм Досназаров Аллаяр Қораз улының иниси Алламбергенниң перзенти Хожамбергенниң генжетай баласы Баҳадыр менен биргеликте узақ Карелия елиндеги Кем жеринде Беломор-Балтик каналын өз қолы менен қазған А. Досназаровтың жатқан топырағын таўып, басына мрамордан қулпы-тас қойды.

Бул ийгиликли исти «Аллаяр жолы» этно-мәдений бирлеспесиниң ағзалары қызғын қуўатлады.

Карелия Республикасы Кем муниципал районы ҳәкимшилиги баслығы Разумейчик Юрий Константинович, оның орынбасары Белостоцкий Сергей Анатолевичке, районлық «Поморе» үлкетаныў музейиниң директоры Устин Ирина Илинична А.Досназаровтың басына ескерткиш қулпы тас қойыўда жәрдем еткен.

Ҳүрметлениўи

Нөкис қаласындағы А. Досназаров бюсты
1991-жылы Қарақалпақстан Республикасында А.Қ.Досназаровтың 85 жыллық юбилейи белгиленди. Усы сәнеге байланыслы «Қарақалпақфилм» киностудиясы «Елим деген ер еди...» атлы ҳүжжетли фильм сүўретке алды.

Қарақалпақ халқының даңқлы перзенти ушын Қараөзек районында ескерткиш орнатылған.

2020-жылы 18-сентябрьде Қарақалпақстан Республикасының пайтахты — Нөкис қаласында А. Досназаровтың бюсты ашылды.

Нөкис қаласының бас көшеси Аллаяр Досназаров (бурынғы Калинин көшеси) атына қойылған.`
      },
      EN: {
        name: "Allayar Dosnazarov Korazuly",
        role: "Party and State Figure of Karakalpakstan",
        bio: `Allayar Dosnazarov Korazuly (May 8, 1896, 10th village of Chimbay district, Syrdarya region (now Karauzak district of Karakalpakstan) — December 8, 1937) was a prominent party and state figure of Karakalpakstan.

Early Life:
Born in 1896 in Terbenbes, Chimbay district. He was the eldest child in a poor peasant family. Nationality: Karakalpak. He worked as a shepherd, and at age 13 became a worker at a cotton gin in Khiva. From 1914 to 1917, he worked as a craftsman in Petro-Alexandrovsk (now Turtkul).

Career:
Member of the CPSU since December 1918. Participant in the Civil War. Served in the Red Army (1918-1921), fighting on the Northern Front and against the Basmachi movement.
Studied at the Communist University of the Toilers of the East in Moscow (1921-1922).

He played a key role in the formation of Karakalpak statehood.
1924: Member of the commission for the national-territorial delimitation of Central Asia. Chairman of the Organizational Bureau for the creation of the Karakalpak Autonomous Region.
1925: First Secretary of the Karakalpak Regional Committee of the Communist Party. He focused on creating a new alphabet, education reforms, and established pedagogical and agricultural technical colleges in Turtkul.

1926–1930: Studied in Tashkent and Moscow.
1931: Deputy Head of the "Metallostroy" Trust in Moscow.

Arrest and Death:
Arrested in January 1935. Sentenced to 10 years in prison on April 8, 1935. Served his sentence in the Solovetsky prison camp. On December 8, 1937, he was executed by firing squad.

Rehabilitation:
Rehabilitated by the Supreme Court of the USSR on September 28, 1968.

Legacy:
In 1991, his 85th anniversary was celebrated, and a documentary film was released. A monument stands in Karauzak district. In 2020, a bust was unveiled in Nukus. The main street of Nukus is named after him.`
      },
      PL: {
        name: "Allayar Dosnazarov Korazuly",
        role: "Działacz partyjny i państwowy Karakałpakstanu",
        bio: `Allayar Dosnazarov Korazuly (8 maja 1896, okręg Szymbaj — 8 grudnia 1937) — wybitny działacz partyjny i państwowy Karakałpakstanu.

Życiorys:
Urodził się w 1896 roku w ubogiej rodzinie chłopskiej. Z narodowości Karakałpak. Pracował jako pasterz, a od 13 roku życia jako robotnik w fabryce bawełny w Chiwie. W latach 1914–1917 pracował w Pietrowo-Aleksandrowsku (obecnie Turtkul).

Działalność:
Członek KPZR od 1918 roku. Uczestnik wojny domowej, służył w Armii Czerwonej. Studiował na Komunistycznym Uniwersytecie Pracujących Wschodu w Moskwie (1921–1922).

Odegrał kluczową rolę w tworzeniu państwowości karakałpackiej. W 1924 roku brał udział w wytyczaniu granic Azji Środkowej. W 1925 roku został pierwszym sekretarzem Komitetu Obwodowego Partii w Karakałpakstanie. Zainicjował reformy edukacji, tworzenie nowego alfabetu oraz otwarcie szkół technicznych.

Aresztowanie i śmierć:
Aresztowany w styczniu 1935 roku. Skazany na 10 lat łagru, karę odbywał na Sołowkach. Rozstrzelany 8 grudnia 1937 roku.

Rehabilitacja:
Zrehabilitowany wyrokiem Sądu Najwyższego ZSRR 28 września 1968 roku.

Pamięć:
W 1991 roku obchodzono jego 85. rocznicę urodzin. W Nukusie znajduje się jego popiersie (odsłonięte w 2020 r.), a jego imieniem nazwano główną ulicę miasta.`
      }
    }
  }
];