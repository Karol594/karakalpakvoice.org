import React, { useState, useEffect } from "react";
import { ArrowLeft, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LANGS = {
  RU: {
    pageTitle: "2021 — Конституционный анализ РК",
    back: "Назад",
    searchPh: "Поиск статьи...",
    colArticle: "Конституция",
    colCat: "Категория",
    colComp: "Заключение Анализа",
    colDecl: "Декларация",
    summaryTitle: "ИТОГИ АНАЛИЗА КОНСТИТУЦИИ 2021",
    rLabel: "Противоречие",
    aLabel: "Условно",
    gLabel: "Соответствует",
    total: "статей",
    conclusion: "Вывод:",
    resetFilter: "Сбросить фильтр",
    articleLabel: "статья",
    stats: { c: "~58,6% противоречий", d: "83% суверенных прав, предоставленных через декларацию (10 из 12 статей были нарушены), были аннулированы или ограничены Конституцией 2021 года." }
  },
  KK: {
    pageTitle: "2021 — КК Конституциялық анализ",
    back: "Артқа қайтыў",
    searchPh: "Статьяны излеў...",
    colArticle: "Конституция",
    colCat: "Категория",
    colComp: "Анализ жуўмағы",
    colDecl: "Декларация",
    summaryTitle: "2021-ЖЫЛҒЫ КОНСТИТУЦИЯ АНАЛИЗ ЖУЎМАҒЫ",
    rLabel: "Қайшы",
    aLabel: "Шәртли",
    gLabel: "Муўапық",
    total: "статья",
    conclusion: "Жуўмақ:",
    resetFilter: "Фильтрди өшириў",
    articleLabel: "-статья",
    stats: { c: "~58,6% қайшылық", d: "Декларация арқалы берилген суверен ҳуқықлардың (12 статьядан 10ы бузылған) 83% пайызы 2021-жылғы Конституцияда жоқ етилген ямаса шекленген." }
  },
  EN: {
    pageTitle: "2021 — KR Constitutional Analysis",
    back: "Go back",
    searchPh: "Search...",
    colArticle: "Constitution",
    colCat: "Category",
    colComp: "Conclusion of the Analysis",
    colDecl: "Declaration",
    summaryTitle: "2021 CONSTITUTION ANALYSIS SUMMARY",
    rLabel: "Contradictory",
    aLabel: "Conditional",
    gLabel: "Compliant",
    total: "articles",
    conclusion: "Conclusion:",
    resetFilter: "Reset filter",
    articleLabel: "Article",
    stats: { c: "~58,6% contradictions", d: "83% of the sovereign rights granted through the declaration (10 of the 12 articles were violated) were annulled or restricted by the 2021 Constitution." }
  },
  PL: {
    pageTitle: "2021 — Analiza Konstytucyjna RK",
    back: "Wróć",
    searchPh: "Szukaj...",
    colArticle: "Konstytucja",
    colCat: "Kategoria",
    colComp: "Wnioski Z Analizy",
    colDecl: "Deklaracja",
    summaryTitle: "PODSUMOWANIE ANALIZY KONSTYTUCJI 2021",
    rLabel: "Sprzeczne",
    aLabel: "Warunkowe",
    gLabel: "Zgodne",
    total: "artykułów",
    conclusion: "Wniosek:",
    resetFilter: "Usuń filtr",
    articleLabel: "Artykuł",
    stats: { c: "~58,6% sprzeczności", d: "83% suwerennych praw przyznanych w drodze deklaracji (10 z 12 artykułów zostało naruszonych) zostało unieważnionych lub ograniczonych przez Konstytucję z 2021 roku." }
  }
};

const DATA_2021 = [
  {
    id: 1,
    title: "1-статья",
    cat: "red",
    declRefLabel: {
      RU: "1. ГОСУДАРСТВЕННЫЙ СУВЕРЕНИТЕТ",
      KK: "1. МӘМЛЕКЕТЛИК СУВЕРЕНИТЕТ",
      EN: "1. STATE SOVEREIGNTY",
      PL: "1. SUWERENNOŚĆ PAŃSTWOWA"
    },
    declFull: {
      RU: "Республика Каракалпакстан берет под свое правовое управление все договора и соглашения, которые Советская Республика Каракалпакстан заключила с Союзом ССР и Узбекской Социалистической Республикой и делегирует себе все полномочия. Строит необходимую структуру Государственного управления на всех административных уровнях на своей территории. Республика Каракалпакстан, далее именуемая Республика строит все свои административные округа, создает необходимые административно хозяйственные разделения и органы государственного управления, такие как судебный, арбитражный и прокурорский надзор и другие осуществляет исключительно самостоятельно.",
      KK: "Қарақалпақстан Республикасы дүзилген шəртнамалар тийкарында Өзбекстан ССРына ҳəм СССРға ықтыярлы берилетуғын ҳуқықлық ўəкиллерден басқа мəмлекетлик ҳəкимиятқа өз аймағында толық ийе болады. Республика өзиниң мəмлекетлик дүзилисин, ҳəкимшилик-аймақлық бөлиниўин мəмлекетлик ҳəкимият ҳəм басқарыў уйымлары системасын, сондай-ақ судты, арбитражды ҳəм прокурорлық бақлаў шөлкемлестириў ислерин өз бетинше белгилейди.",
      EN: "The Republic of Karakalpakstan takes under its legal control all the treaties and agreements that the Soviet Republic. The Republic of Karakalpakstan has concluded with the USSR and the Uzbek Socialist Republic and delegates all its powers to itself. Builds the necessary structure of State administration at all administrative levels on its territory, the Republic of Karakalpakstan hereinafter referred to as the Republic builds all its administrative districts, creates the necessary administrative divisions and state administration bodies, such as the judicial, arbitration and prosecutorial supervision and others are carried out exclusively independently.",
      PL: "Republika Karakalpakstanu przejmuje pod swoją jurysdykcję wszystkie traktaty i umowy zawarte przez Radziecką Republikę Karakalpakstanu z ZSRR i Uzbecką SRR oraz deleguje wszystkie uprawnienia sobie. Buduje niezbędną strukturę administracji państwowej na wszystkich poziomach administracyjnych na swoim terytorium. Republika tworzy swoje okręgi administracyjne, ustanawia podziały gospodarczo-administracyjne oraz organy państwowe, takie jak sądy, arbitraż i nadzór prokuratorski, które działają wyłącznie niezależnie."
    },
    full: {
      RU: "Каракалпакстан — суверенная демократическая республика, входящая в состав Республики Узбекистан. Названия государства «Республика Каракалпакстан» и «Каракалпакстан» равнозначны.Взаимные отношения Республики Узбекистан и Республики Каракалпакстан в рамках Конституции Республики Узбекистан регулируются договорами и соглашениями, заключенными между Республикой Узбекистан и Республикой Каракалпакстан. Республика Каракалпакстан обладает правом выхода из состава Республики Узбекистан на основании всеобщего референдума народа Каракалпакстана.",
      KK: "Қарақалпақстан – Өзбекстан Республикасының қурамына киретуғын суверенли демократиялық республика. Мәмлекеттиң «Қарақалпақстан Республикасы» ҳәм «Қарақалпақстан» атамасы тең мәнили. Өзбекстан Республикасының ҳәм Қарақалпақстан Республикасының өз ара қатнасықлары Өзбекстан Республикасы Конституциясы көлеминде Өзбекстан Республикасы менен Қарақалпақстан Республикасы арасында дүзилген шәртнамалар және келисимлер арқалы тәртиплестириледи. Қарақалпақстан Республикасы Өзбекстан Республикасының қурамынан Қарақалпақстан халқының ғалаба халықлық референдумы тийкарында шығыў ҳуқықына ийе.",
      EN: "Karakalpakstan is a sovereign democratic republic within the Republic of Uzbekistan. The names “Republic of Karakalpakstan” and “Karakalpakstan” are equivalent. The mutual relations between the Republic of Uzbekistan and the Republic of Karakalpakstan within the framework of the Constitution of the Republic of Uzbekistan are regulated by treaties and agreements concluded between the Republic of Uzbekistan and the Republic of Karakalpakstan. The Republic of Karakalpakstan has the right to secede from the Republic of Uzbekistan on the basis of a nationwide referendum of the people of Karakalpakstan.",
      PL: "Каракалпакстан — суверенная демократическая республика, входящая в состав Республики Узбекистан. Названия государства «Республика Каракалпакстан» и «Каракалпакстан» равнозначны. Взаимные отношения Республики Узбекистан и Республики Каракалпакстан в рамках Конституции Республики Узбекистан регулируются договорами и соглашениями, заключенными между Республикой Узбекистан и Республикой Каракалпакстан. Республика Каракалпакстан обладает правом выхода из состава Республики Узбекистан на основании всеобщего референдума народа Каракалпакстана."
    },
    comp: {
      RU: "ПРОТИВОРЕЧИЕ. В Декларации Каракалпакстан объявлен «суверенной республикой», а отношения с Узбекистаном установлены на равных условиях. В Конституции же определены «суверенная республика в составе Республики Узбекистан» и «в рамках Конституции Узбекистана», а суверенитет ущемлен до статуса автономии.",
      KK: "ҚАЙШЫ. Декларацияда Қарақалпақстан «суверен республика» деп жарияланған, Өзбекстан менен қатнасықлар тең шәрт тийкарында қурылады деп белгиленген. Конституцияда болса «Өзбекстан Республикасы қурамындағы суверен республика» ҳәм «Өзбекстан Конституциясы шеңберинде» деп белгиленип, суверенитет автономиялық мәртебеге дейин кемситилген.",
      EN: "CONTRADICTION. The declaration declared Karakalpakstan a “sovereign republic” and stipulated that relations with Uzbekistan would be built on equal terms. In the Constitution, it is defined as “a sovereign republic within the Republic of Uzbekistan” and “within the framework of the Constitution of Uzbekistan,” and sovereignty is reduced to autonomous status.",
      PL: "SPRZECZNOŚĆ. Deklaracja ogłosiła Karakalpakstan „suwerenną republiką” i przewidywała, że stosunki z Uzbekistanem będą budowane na równych warunkach. W konstytucji określa się ją jako „suwerenną republikę w Republice Uzbekistanu” i „w ramach Konstytucji Uzbekistanu”, a suwerenność sprowadza się do statusu autonomicznego."
    }
  },
  {
    id: 2,
    title: "2-статья",
    cat: "green",
    declRefLabel: {
      RU: "3. НАРОД — ИСТОЧНИК ВЛАСТИ",
      KK: "3. ХАЛЫҚ — ҲӘКИМИЯТ ДЕРЕГИ",
      EN: "3. PEOPLE — SOURCE OF POWER",
      PL: "3. LUD — ŹRÓDŁO WŁADZY"
    },
    declFull: {
      RU: "Многонациональный народ Республики Каракалпакстан определяет и составляет Государство на своей суверенной территории. Народ, опираясь на Конституцию и законы непосредственно и однозначно через избранных депутатов осуществляет государственное управление. Правительство Республики Каракалпакстан уполномоченное властью осуществляет укрепление дружбы народов. Государство всем своим гражданам проживающим на территории Республики Каракалпакстан, не смотря на их политические взгляды, веру исповедания и другие отличия, обеспечивает всех равными правами и свободами.",
      KK: "Қарақалпақстан Республикасының көп миллетли халқы оның мəмлекетлик Суверенитетиниң ўəкили ҳəм дəреги болып табылады. Халық Республиканың Конституциясы ҳəм тийкарында тиккелей жəне халық депутатларының Кеңеслери арқалы мəмлекетлик ҳəкимиятты иске асырады. Қарақалпақстан Республикасы мəмлекетлик ҳəкимиятын толық бийлигин пайдалана отырып, халықлар дослығын беккемлейди.",
      EN: "The multinational people of the Republic of Karakalpakstan shall determine and constitute a State on their sovereign territory. The people, relying on the Constitution and laws, directly and unambiguously through the elected deputies, exercise State administration. The Government of the Republic of Karakalpakstan authorized by the government to strengthen the friendship of peoples. The State provides all its citizens residing in the territory of the Republic of Karakalpakstan with equal rights and freedoms, regardless of their political views, religious beliefs and other differences.",
      PL: "Wielonarodowy naród Republiki Karakalpakstanu określa i konstytuuje Państwo na swoim suwerennym terytorium. Naród, opierając się na Konstytucji i ustawach, bezpośrednio i jednoznacznie poprzez wybranych deputowanych sprawuje władzę państwową. Rząd Republiki Karakalpakstanu umacnia przyjaźń narodów. Państwo zapewnia wszystkim obywatelom równe prawa i wolności, niezależnie od poglądów politycznych, wyznania czy innych różnic."
    },
    full: {
      RU: "Государство выражает волю народа, служит его интересам. Государственные органы и должностные лица ответственны перед обществом и гражданами.",
      KK: "Мәмлекет халықтың ерк-ықрарын билдиреди, оның мәплерине хызмет етеди. Мәмлекетлик уйымлар ҳәм лаўазымлы шахслар жәмийеттиң ҳәм пуқаралардың алдында жуўапкерли.",
      EN: "The state expresses the will of the people and serves their interests. State bodies and officials are accountable to society and to citizens.",
      PL: "Государство выражает волю народа, служит его интересам. Государственные органы и должностные лица ответственны перед обществом и гражданами."
    },
    comp: {
      RU: "СООТВЕТСТВУЕТ. Статья 3 Декларации гласит: «народ осуществляет государственное управление через избранных депутатов» - это соответствует принципу «государство выражает волю народа» в статье 2 Конституции.",
      KK: "МУЎАПЫҚ. Декларацияның 3-статьясында: «халық мәмлекетлик басқарыўды сайланған депутатлар арқалы әмелге асырады» деп белгиленген - бул Конституцияның 2-статьясындағы «мәмлекет халықтың ерк-ықрарын билдиреди» принципине муўапық.",
      EN: "MATCHES. Article 3 of the Declaration states that “the people exercise state governance through elected deputies” - in accordance with the principle of “the state expresses the will of the people” in Article 2 of the Constitution.",
      PL: "ZGODNE. Artykuł 3 deklaracji stanowi, że „Naród sprawuje administrację publiczną za pośrednictwem wybranych posłów” — zgodnie z zasadą „Państwo wyraża wolę narodu” w artykule 2 Konstytucji."
    }
  },
  {
    id: 3,
    title: "3-статья",
    cat: "red",
    declRefLabel: {
      RU: "1. ОСНОВА ОТНОШЕНИЙ",
      KK: "1. ҚАТНАСЫҚЛАР ТИЙКАРЫ",
      EN: "1. BASIS OF RELATIONS",
      PL: "1. PODSTAWA RELACJI"
    },
    declFull: {
      RU: "Республика Каракалпакстан берет под свое правовое управление все договора и соглашения, которые Советская Республика Каракалпакстан заключила с Союзом ССР и Узбекской Социалистической Республикой и делегирует себе все полномочия. Строит необходимую структуру Государственного управления на всех административных уровнях на своей территории. Республика Каракалпакстан, далее именуемая Республика строит все свои административные округа, создает необходимые административно хозяйственные разделения и органы государственного управления, такие как судебный, арбитражный и прокурорский надзор и другие осуществляет исключительно самостоятельно.",
      KK: "Қарақалпақстан Республикасы дүзилген шəртнамалар тийкарында Өзбекстан ССРына ҳəм СССРға ықтыярлы берилетуғын ҳуқықлық ўəкиллерден басқа мəмлекетлик ҳəкимиятқа өз аймағында толық ийе болады. Республика өзиниң мəмлекетлик дүзилисин, ҳəкимшилик-аймақлық бөлиниўин мəмлекетлик ҳəкимият ҳəм басқарыў уйымлары системасын, сондай-ақ судты, арбитражды ҳəм прокурорлық бақлаў шөлкемлестириў ислерин өз бетинше белгилейди.",
      EN: "The Republic of Karakalpakstan takes under its legal control all the treaties and agreements that the Soviet Republic. The Republic of Karakalpakstan has concluded with the USSR and the Uzbek Socialist Republic and delegates all its powers to itself. Builds the necessary structure of State administration at all administrative levels on its territory, the Republic of Karakalpakstan hereinafter referred to as the Republic builds all its administrative districts, creates the necessary administrative divisions and state administration bodies, such as the judicial, arbitration and prosecutorial supervision and others are carried out exclusively independently.",
      PL: "Republika Karakalpakstanu przejmuje pod swoją jurysdykcję wszystkie traktaty i umowy zawarte przez Radziecką Republikę Karakalpakstanu z ZSRR i Uzbecką SRR oraz deleguje wszystkie uprawnienia sobie. Buduje niezbędną strukturę administracji państwowej na wszystkich poziomach administracyjnych na swoim terytorium. Republika tworzy swoje okręgi administracyjne, ustanawia podziały gospodarczo-administracyjne oraz organy państwowe, takie jak sądy, arbitraż i nadzór prokuratorski, które działają wyłącznie niezależnie."
    },
    full: {
      RU: "Республика Каракалпакстан самостоятельно решает вопросы своего административно-территориального устройства, определяет систему органов государственной власти и управления, проводит политику, согласованную с политикой Республики Узбекистан. Территория и границы Республики Каракалпакстан неприкосновенны, не могут быть изменены и неделимы.",
      KK: "Қарақалпақстан Республикасы ҳәкимшилик аймақлық дүзилиси мәселелерин өзинше шешеди, мәмлекетлик ҳәкимият ҳәм басқарыў уйымларының системасын белгилейди, Өзбекстан Республикасы сиясатына үйлесимли сиясатты жүргизеди. Қарақалпақстан Республикасының аймағына ҳәм шегараларына қол қатылмайды, өзгертилиўии ҳәм бөлиниўи мүмкин емес.",
      EN: "The Republic of Karakalpakstan independently resolves issues of its administrative‑territorial structure, determines the system of state authorities and administration, and conducts policies coordinated with the policies of the Republic of Uzbekistan. The territory and borders of the Republic of Karakalpakstan are inviolable, cannot be altered, and are indivisible.",
      PL: "Республика Каракалпакстан самостоятельно решает вопросы своего административно-территориального устройства, определяет систему органов государственной власти и управления, проводит политику, согласованную с политикой Республики Узбекистан. Территория и границы Республики Каракалпакстан неприкосновенны, не могут быть изменены и неделимы."
    },
    comp: {
      RU: "ПРОТИВОРЕЧИЕ. Статья 1 Декларации гласит, что управление осуществляется «только самостоятельно». В Конституции признаётся независимость, но добавлено, что политика должна быть «гармоничной» с Узбекистаном - это ограничивает особую независимость.",
      KK: "ҚАЙШЫ. Декларацияның 1-статьясында айтылыўынша, басқарыў «тек өз бетинше» әмелге асырылады. Конституцияда ғәрезсизлик тән алынады, бирақ сиясат Өзбекстан менен «үйлесимли» болыўы кереклиги қосымша етиледи - бул өз алдына ғәрезсизликти шеклейди.",
      EN: "CONTRADICTION. Article 1 of the Declaration states that governance is carried out “only independently”. The Constitution recognizes independence, but adds that the policy must be “harmonious” with Uzbekistan - this in itself restricts independence.",
      PL: "SPRZECZNOŚĆ. Artykuł 1 deklaracji stanowi, że zarządzanie odbywa się „tylko niezależnie”. Konstytucja uznaje niezależność, ale dodaje, że polityka musi być „harmonijna” z Uzbekistanem - to samo w sobie ogranicza niezależność."
    }
  },
  {
    id: 4,
    title: "4-статья",
    cat: "red",
    declRefLabel: {
      RU: "10. ГОСУДАРСТВЕННЫЙ ЯЗЫК",
      KK: "10. МӘМЛЕКЕТЛИК ТИЛ",
      EN: "10. STATE LANGUAGE",
      PL: "10. JĘZYK PAŃSTWOWY"
    },
    declFull: {
      RU: "На территории Республики Каракалпакстан Каракалпакский язык является Государственным языком. Все нации и народности компактно проживающие на территории Республики Каракалпакстан имеют возможность изучать свой родной язык и изучать русский язык как язык межнационального общения.",
      KK: "Қарақалпақстан Республикасы аймағында Қарақалпақ тили мəмлекетлик тил болып табылады. Қарақалпақстан өз аймағында Республикада жəм болып жайласқан барлық халықлардың ана тиллерин, соның ишинде миллетлер аралық қатнасық тили болған рус тилиниң еркин ислеўи ҳəм раўажланыўы ушын барлық жағдайларды тəмийинлейди.",
      EN: "On the territory of the Republic of Karakalpakstan, the Karakalpak language is the State language. All nations and nationalities living compactly on the territory of the Republic of Karakalpakstan have the opportunity to study their native language learn Russian as a language of interethnic communication.",
      PL: "Na terytorium Republiki Karakalpakstanu język karakalpacki jest językiem państwowym. Wszystkie narody i narodowości zamieszkujące terytorium mają możliwość nauki swojego języka ojczystego oraz języka rosyjskiego jako języka komunikacji międzyetnicznej."
    },
    full: {
      RU: "Государственными языками Республики Каракалпакстан являются каракалпакский язык и узбекский язык. Республика Каракалпакстан обеспечивает уважительное отношение к языкам, обычаям и традициям наций и народностей, проживающих на ее территории, создание условий для их развития.",
      KK: "Қарақалпақ тили ҳәм өзбек тили Қарақалпақстан Республикасының мәмлекетлик тили болып табылады. Қарақалпақстан Республикасы өз аймағында жасаўшы миллетлердиң ҳәм халықлардың тиллерине, үрп-әдетлерине ҳәм дәстүрлерине ҳүрмет пенен қараўды, олардың раўажланыўы ушын жағдайлар дүзиўди тәмийинлейди.",
      EN: "The state languages of the Republic of Karakalpakstan are the Karakalpak language and the Uzbek language. The Republic of Karakalpakstan ensures respectful treatment of the languages, customs, and traditions of the nations and peoples residing on its territory, and creates conditions for their development.",
      PL: "Językami państwowymi Republiki Karakalpakstanu są język karakałpacki i język uzbecki. Republika Karakalpakstanu zapewnia poszanowanie języków, zwyczajów i tradycji narodów i grup etnicznych zamieszkujących jej terytorium oraz stwarza warunki dla ich rozwoju."
    },
    comp: {
      RU: "ПРОТИВОРЕЧИЕ. Декларация устанавливает только каракалпакский язык как государственный. Введение узбекского языка как второго государственного нарушает языковой суверенитет.",
      KK: "ҚАЙШЫ. Декларация тек қарақалпақ тилин мәмлекетлик тил етип белгилеген. Өзбек тилин екинши мәмлекетлик тил сыпатында киргизиў тил суверенитетин бузады.",
      EN: "CONTRADICTION. The Declaration establishes only the Karakalpak language as the state language. The introduction of the Uzbek language as a second state language violates linguistic sovereignty.",
      PL: "SPRZECZNOŚĆ. Deklaracja ustanawia jedynie język karakalpacki jako język państwowy. Wprowadzenie języka uzbeckiego jako drugiego języka państwowego narusza suwerenność językową."
    }
  },
  {
    id: 5,
    title: "5-статья",
    cat: "green",
    declRefLabel: {
      RU: "9. СИМВОЛИКА",
      KK: "9. СИМВОЛИКА",
      EN: "9. SYMBOLS",
      PL: "9. SYMBOLE"
    },
    declFull: {
      RU: "Республика Каракалпакстан имеет свой герб, флаг и гимн.",
      KK: "Қарақалпақстан Республикасы өзиниң мəмлекетлик символикасын, гербин, байрағын, гимнин белгилеп алады.",
      EN: "The Republic of Karakalpakstan has its own coat of arms, flag and anthem.",
      PL: "Republika Karakalpakstanu posiada własny herb, flagę i hymn."
    },
    full: {
      RU: "Республика Каракалпакстан имеет свои государственные символы – флаг, герб, гимн, утверждаемые законом.",
      KK: "Қарақалпақстан Республикасы өзиниң нызам арқалы тастыйықланатуғын мәмлекетлик нышанларына– байрағына, гербине, гимнине ийе.",
      EN: "The Republic of Karakalpakstan has its own state symbols — the flag, the emblem, and the anthem — approved by law.",
      PL: "Republika Karakalpakstanu posiada własne symbole państwowe — flagę, herb i hymn — zatwierdzane ustawą."
    },
    comp: {
      RU: "СООТВЕТСТВУЕТ. Право на собственные символы сохранено.",
      KK: "МУЎАПЫҚ. Өз символикасына ийе болыў ҳуқықы сақланған.",
      EN: "COMPLIANT. The right to own symbols is preserved.",
      PL: "ZGODNE. Prawo do własnych symboli zostało zachowane."
    }
  },
  {
    id: 6,
    title: "6-статья",
    cat: "amber",
    declRefLabel: {
      RU: "1. АДМИНИСТРАТИВНАЯ СТРУКТУРА",
      KK: "1. АДМИНИСТРАТИВЛИК СТРУКТУРА",
      EN: "1. ADMINISTRATIVE STRUCTURE",
      PL: "1. STRUKTURA ADMINISTRACYJNA"
    },
    declFull: {
      RU: "Республика Каракалпакстан берет под свое правовое управление все договора и соглашения, которые Советская Республика Каракалпакстан заключила с Союзом ССР и Узбекской Социалистической Республикой и делегирует себе все полномочия. Строит необходимую структуру Государственного управления на всех административных уровнях на своей территории. Республика Каракалпакстан, далее именуемая Республика строит все свои административные округа, создает необходимые административно хозяйственные разделения и органы государственного управления, такие как судебный, арбитражный и прокурорский надзор и другие осуществляет исключительно самостоятельно.",
      KK: "Қарақалпақстан Республикасы дүзилген шəртнамалар тийкарында Өзбекстан ССРына ҳəм СССРға ықтыярлы берилетуғын ҳуқықлық ўəкиллерден басқа мəмлекетлик ҳəкимиятқа өз аймағында толық ийе болады. Республика өзиниң мəмлекетлик дүзилисин, ҳəкимшилик-аймақлық бөлиниўин мəмлекетлик ҳəкимият ҳəм басқарыў уйымлары системасын, сондай-ақ судты, арбитражды ҳəм прокурорлық бақлаў шөлкемлестириў ислерин өз бетинше белгилейди.",
      EN: "The Republic of Karakalpakstan takes under its legal control all the treaties and agreements that the Soviet Republic. The Republic of Karakalpakstan has concluded with the USSR and the Uzbek Socialist Republic and delegates all its powers to itself. Builds the necessary structure of State administration at all administrative levels on its territory, the Republic of Karakalpakstan hereinafter referred to as the Republic builds all its administrative districts, creates the necessary administrative divisions and state administration bodies, such as the judicial, arbitration and prosecutorial supervision and others are carried out exclusively independently.",
      PL: "Republika Karakalpakstanu przejmuje pod swoją jurysdykcję wszystkie traktaty i umowy zawarte przez Radziecką Republikę Karakalpakstanu z ZSRR i Uzbecką SRR oraz deleguje wszystkie uprawnienia sobie. Buduje niezbędną strukturę administracji państwowej na wszystkich poziomach administracyjnych na swoim terytorium. Republika tworzy swoje okręgi administracyjne, ustanawia podziały gospodarczo-administracyjne oraz organy państwowe, takie jak sądy, arbitraż i nadzór prokuratorski, które działają wyłącznie niezależnie."
    },
    full: {
      RU: "Столица Республики Каракалпакстан – город Нукус.",
      KK: "Қарақалпақстан Республикасының пайтахты – Нөкис қаласы.",
      EN: "TThe capital of the Republic of Karakalpakstan is the city of Nukus.",
      PL: "Stolicą Republiki Karakalpakstanu jest miasto Nukus."
    },
    comp: {
      RU: "УСЛОВНО. Определение столицы не противоречит Декларации, однако статус Нукуса в Конституции рассматривается как административный центр в составе РУз.",
      KK: "ШӘРТЛИ. Пайтахтты белгилеў Декларацияға қайшы емес, бирақ Конституцияда Нөкистиң статусы Өзбекстан қурамындағы административлик орай сыпатында қаралады.",
      EN: "CONDITIONAL. The definition of the capital does not contradict the Declaration, however, Nukus's status in the Constitution is viewed as an administrative center within the Republic of Uzbekistan.",
      PL: "WARUNKOWE. Określenie stolicy nie jest sprzeczne z Deklaracją, jednak status Nukusu w Konstytucji jest traktowany jako centrum administracyjne w ramach Republiki Uzbekistanu."
    }
  },
  {
    id: 7,
    title: "7-статья",
    cat: "red",
    declRefLabel: {
      RU: "3. ПРАВО НАРОДА",
      KK: "3. ХАЛЫҚ ҲУҚЫҚЫ",
      EN: "3. RIGHTS OF THE PEOPLE",
      PL: "3. PRAWA LUDU"
    },
    declFull: {
      RU: "Многонациональный народ Республики Каракалпакстан определяет и составляет Государство на своей суверенной территории. Народ, опираясь на Конституцию и законы непосредственно и однозначно через избранных депутатов осуществляет государственное управление. Правительство Республики Каракалпакстан уполномоченное властью осуществляет укрепление дружбы народов. Государство всем своим гражданам проживающим на территории Республики Каракалпакстан, не смотря на их политические взгляды, веру исповедания и другие отличия, обеспечивает всех равными правами и свободами.",
      KK: "Қарақалпақстан Республикасының көп миллетли халқы оның мəмлекетлик Суверенитетиниң ўəкили ҳəм дəреги болып табылады. Халық Республиканың Конституциясы ҳəм тийкарында тиккелей жəне халық депутатларының Кеңеслери арқалы мəмлекетлик ҳəкимиятты иске асырады. Қарақалпақстан Республикасы мəмлекетлик ҳəкимиятын толық бийлигин пайдалана отырып, халықлар дослығын беккемлейди.",
      EN: "The multinational people of the Republic of Karakalpakstan shall determine and constitute a State on their sovereign territory. The people, relying on the Constitution and laws, directly and unambiguously through the elected deputies, exercise State administration. The Government of the Republic of Karakalpakstan authorized by the government to strengthen the friendship of peoples. The State provides all its citizens residing in the territory of the Republic of Karakalpakstan with equal rights and freedoms, regardless of their political views, religious beliefs and other differences.",
      PL: "Wielonarodowy naród Republiki Karakalpakstanu określa i konstytuuje Państwo na swoim suwerennym terytorium. Naród, opierając się na Konstytucji i ustawach, bezpośrednio i jednoznacznie poprzez wybranych deputowanych sprawuje władzę państwową. Rząd Republiki Karakalpakstanu umacnia przyjaźń narodów. Państwo zapewnia wszystkim obywatelom równe prawa i wolności, niezależnie od poglądów politycznych, wyznania czy innych różnic."
    },
    full: {
      RU: "Народ является единственным источником государственной власти. Государственная власть в Республике Каракалпакстан осуществляется в интересах народа и исключительно органами, уполномоченными на то Конституцией Республики Каракалпакстан и законами, принятым на ее основе. Присвоение полномочий государственной власти, приостановление или прекращение деятельности органов власти в не предусмотренном Конституцией порядке, создание новых и параллельных структур власти являются антиконституционными и влекут ответственность по закону.",
      KK: "Халық мәмлекетлик ҳәкимияттың бирден-бир дереги болып табылады. Қарақалпақстан Республикасында мәмлекетлик ҳәкимият халықтың мәпи ушын Қарақалпақстан Республикасының Конституциясы арқалы және соның тийкарында қабыл етилген нызамлар арқалы тек буған ўәкиллик берилген уйымлар тәрепинен ғана әмелге асырылады. Конституцияда нәзерде тутылмаған тәртипте мәмлекетлик ҳәкимияттың ўәқилликлерин өзлестириў, ҳәкимият уйымларының жумысын тоқтатып қойыў ямаса сапластырыў, ҳәкимияттың жаңа ҳәм параллель дүзилислерин дүзиў Конституцияға қарсы ҳәрекетлер болып табылады ҳәм нызамға муўапық жуўапкершиликке тартыўға тийкар болады.",
      EN: "The people are the sole source of state power. State power in the Republic of Karakalpakstan is exercised in the interests of the people and exclusively by bodies authorized by the Constitution of the Republic of Karakalpakstan and the laws adopted on its basis. The usurpation of state authority, the suspension or termination of the activities of state bodies in a manner not provided for by the Constitution, as well as the creation of new or parallel structures of power, are unconstitutional and entail liability under the law.",
      PL: "Naród jest jedynym źródłem władzy państwowej. Władza państwowa w Republice Karakalpakstanu sprawowana jest w interesie narodu i wyłącznie przez organy upoważnione do tego Konstytucją Republiki Karakalpakstanu oraz ustawami przyjętymi na jej podstawie. Przywłaszczanie sobie uprawnień władzy państwowej, zawieszanie lub zaprzestanie działalności organów władzy w sposób nieprzewidziany Konstytucją, a także tworzenie nowych lub równoległych struktur władzy są niekonstytucyjne i pociągają za sobą odpowiedzialność przewidzianą prawem."
    },
    comp: {
      RU: "ПРОТИВОРЕЧИЕ. Конституция сужает право народа на прямое управление, передавая всю полноту власти органам, действующим в рамках узбекского законодательства.",
      KK: "ҚАЙШЫ. Конституция халықтың тиккелей басқарыў ҳуқықын шеклеп, барлық ҳәкимиятты Өзбекстан нызамшылығы шеңберинде жумыс ислейтуғын уйымларға береди.",
      EN: "CONTRADICTION. The Constitution narrows the people's right to direct governance, transferring full power to bodies operating within the framework of Uzbek legislation.",
      PL: "SPRZECZNOŚĆ. Konstytucja zawęża prawo ludu do bezpośredniego sprawowania władzy, przekazując pełnię władzy organom działającym w ramach ustawodawstwa uzbeckiego."
    }
  },
  {
    id: 8,
    title: "8-статья",
    cat: "red",
    declRefLabel: {
      RU: "8. ГРАЖДАНСТВО",
      KK: "8. ПУХАРАЛЫҚ",
      EN: "8. CITIZENSHIP",
      PL: "8. OBYWATELSTWO"
    },
    declFull: {
      RU: "Граждане Республики Каракалпакстан, ранее являвшиеся гражданами СССР и Узбекской ССР, теперь являются гражданами Республики Каракалпакстан.",
      KK: "Қарақалпақстан Республикасы өзиниң пухаралығына ийе болады, Республика пухаралары соның менен бир ўақытта Өзбекстан ССРның ҳəм СССРдың  пухаралары болып табылады.",
      EN: "Citizens of the Republic of Karakalpakstan who were citizens of the USSR and the Uzbek SSR are now citizens of the Republic of Karakalpakstan.",
      PL: "Obywatele Republiki Karakalpakstanu, którzy wcześniej byli obywatelami ZSRR i Uzbeckiej SRR, stają się obywatelami Republiki Karakalpakstanu."
    },
    full: {
      RU: "Граждан Республики Каракалпакстан составляют граждане Республики Узбекистан проживающие на территории Каракалпакстана.",
      KK: "Қарақалпақстан аймағында жасаўшы Өзбекстан Республикасы пухаралары Қарақалпақстан Республикасының пухараларын қурайды.",
      EN: "Citizens of the Republic of Karakalpakstan are the citizens of the Republic of Uzbekistan residing on the territory of Karakalpakstan.",
      PL: "Obywatelami Republiki Karakalpakstanu są obywatele Republiki Uzbekistanu zamieszkujący na terytorium Karakalpakstanu."
    },
    comp: {
      RU: "ПРОТИВОРЕЧИЕ. Статья 8 Декларации гласит, что Республика Каракалпакстан устанавливает свое гражданство. В Конституции гражданин Республики Каракалпакстан автоматически определяется как гражданин Узбекистана, при этом узбекское гражданство ставится на первое место - гражданский суверенитет утрачен.",
      KK: "ҚАЙШЫ. Декларацияның 8-статьясында Қарақалпақстан Республикасы өзиниң пухаралығын белгилейтуғыны жәрияланды. Конституцияда болса. Қарақалпақстан Республикасы пухарасы автоматлы түрде Өзбекстан пухарасы деп белгиленип, өзбек пухаралығы биринши орынға қойылған - пухаралық суверенитети жоғалтылған.",
      EN: "CONTRADICTION. Article 8 of the Declaration states that the Republic of Karakalpakstan determines its citizenship. In the Constitution, a citizen of the Republic of Karakalpakstan is automatically designated as a citizen of Uzbekistan, and Uzbek citizenship is put first - civil sovereignty is lost.",
      PL: "SPRZECZNOŚĆ. Artykuł 8 deklaracji stanowi, że Republika Karakalpakstanu określa swoje obywatelstwo. W konstytucji obywatel Republiki Karakalpakstan jest automatycznie wyznaczany jako obywatel Uzbekistanu, a obywatelstwo uzbeckie jest stawiane na pierwszym miejscu - suwerenność Obywatelska zostaje utracona."
    }
  },
  {
    id: 9,
    title: "9-статья",
    cat: "amber",
    declRefLabel: {
      RU: "3. ВОЛЕИЗЪЯВЛЕНИЕ",
      KK: "3. ЕРК-ЫҚРАР",
      EN: "3. EXPRESSION OF WILL",
      PL: "3. WYRAŻENIE WOLI"
    },
    declFull: {
      RU: "Многонациональный народ Республики Каракалпакстан определяет и составляет Государство на своей суверенной территории. Народ, опираясь на Конституцию и законы непосредственно и однозначно через избранных депутатов осуществляет государственное управление. Правительство Республики Каракалпакстан уполномоченное властью осуществляет укрепление дружбы народов. Государство всем своим гражданам проживающим на территории Республики Каракалпакстан, не смотря на их политические взгляды, веру исповедания и другие отличия, обеспечивает всех равными правами и свободами.",
      KK: "Қарақалпақстан Республикасының көп миллетли халқы оның мəмлекетлик Суверенитетиниң ўəкили ҳəм дəреги болып табылады. Халық Республиканың Конституциясы ҳəм тийкарында тиккелей жəне халық депутатларының Кеңеслери арқалы мəмлекетлик ҳəкимиятты иске асырады. Қарақалпақстан Республикасы мəмлекетлик ҳəкимиятын толық бийлигин пайдалана отырып, халықлар дослығын беккемлейди.",
      EN: "The multinational people of the Republic of Karakalpakstan shall determine and constitute a State on their sovereign territory. The people, relying on the Constitution and laws, directly and unambiguously through the elected deputies, exercise State administration. The Government of the Republic of Karakalpakstan authorized by the government to strengthen the friendship of peoples. The State provides all its citizens residing in the territory of the Republic of Karakalpakstan with equal rights and freedoms, regardless of their political views, religious beliefs and other differences.",
      PL: "Wielonarodowy naród Republiki Karakalpakstanu określa i konstytuuje Państwo na swoim suwerennym terytorium. Naród, opierając się na Konstytucji i ustawach, bezpośrednio i jednoznacznie poprzez wybranych deputowanych sprawuje władzę państwową. Rząd Republiki Karakalpakstanu umacnia przyjaźń narodów. Państwo zapewnia wszystkim obywatelom równe prawa i wolności, niezależnie od poglądów politycznych, wyznania czy innych różnic."
    },
    full: {
      RU: "Наиболее важные вопросы государственной и общественной жизни выносятся на обсуждение народа, ставятся на народное голосование (референдум). Порядок проведения референдума определяется законом.",
      KK: "Жәмийетлик ҳәм мәмлекетлик турмыстың анағурлым әҳмийетли мәселелери халықтың додалаўына шығарылады, халықлық даўысқа (референдумға) қойылады. Референдумды өткериў тәртиби нызам менен белгиленеди.",
      EN: "The most important issues of state and public life shall be submitted for public discussion and put to a popular vote (referendum). The procedure for conducting a referendum is determined by law.",
      PL: "Najważniejsze kwestie życia państwowego i społecznego poddaje się pod dyskusję narodu i pod głosowanie powszechne (referendum). Tryb przeprowadzania referendum określa ustawa."
    },
    comp: {
      RU: "УСЛОВНО. Принцип проведения референдума близок к Декларации. Однако в Конституции порядок проведения референдума регулируется в рамках закона Узбекистана - воля народа Республики Каракалпакстан остается зависимой от разрешения Узбекистана.",
      KK: "ШӘРТЛИ. Референдум өткериў принципи Декларацияға жақын. Бирақ Конституцияда референдумның тәртиби Өзбекстан нызамы шеңберинде тәртипке салынады - Қарақалпақстан Республикасы халқының ерк-ықрары Өзбекстан рухсатына байланыслы болып қалады.",
      EN: "CONDITIONAL. The principle of holding a referendum is close to a declaration. However, the procedure for holding a referendum in the Constitution will be regulated within the framework of Uzbek law - the will of the people of the Republic of Karakalpakstan will depend on the consent of Uzbekistan.",
      PL: "WARUNKOWE. Zasada przeprowadzenia referendum jest bliska deklaracji. Jednak procedura przeprowadzenia referendum w konstytucji będzie regulowana w ramach prawa uzbeckiego-wola ludu Republiki Karakalpakstanu będzie zależeć od zgody Uzbekistanu."
    }
  },
  {
    id: 10,
    title: "10-статья",
    cat: "amber",
    declRefLabel: {
      RU: "3. ПРЕДСТАВИТЕЛЬСТВО",
      KK: "3. ЎӘКИЛЛИК",
      EN: "3. REPRESENTATION",
      PL: "3. REPREZENTACJA"
    },
    declFull: {
      RU: "Многонациональный народ Республики Каракалпакстан определяет и составляет Государство на своей суверенной территории. Народ, опираясь на Конституцию и законы непосредственно и однозначно через избранных депутатов осуществляет государственное управление. Правительство Республики Каракалпакстан уполномоченное властью осуществляет укрепление дружбы народов. Государство всем своим гражданам проживающим на территории Республики Каракалпакстан, не смотря на их политические взгляды, веру исповедания и другие отличия, обеспечивает всех равными правами и свободами.",
      KK: "Қарақалпақстан Республикасының көп миллетли халқы оның мəмлекетлик Суверенитетиниң ўəкили ҳəм дəреги болып табылады. Халық Республиканың Конституциясы ҳəм тийкарында тиккелей жəне халық депутатларының Кеңеслери арқалы мəмлекетлик ҳəкимиятты иске асырады. Қарақалпақстан Республикасы мəмлекетлик ҳəкимиятын толық бийлигин пайдалана отырып, халықлар дослығын беккемлейди.",
      EN: "The multinational people of the Republic of Karakalpakstan shall determine and constitute a State on their sovereign territory. The people, relying on the Constitution and laws, directly and unambiguously through the elected deputies, exercise State administration. The Government of the Republic of Karakalpakstan authorized by the government to strengthen the friendship of peoples. The State provides all its citizens residing in the territory of the Republic of Karakalpakstan with equal rights and freedoms, regardless of their political views, religious beliefs and other differences.",
      PL: "Wielonarodowy naród Republiki Karakalpakstanu określa i konstytuuje Państwo na swoim suwerennym terytorium. Naród, opierając się na Konstytucji i ustawach, bezpośrednio i jednoznacznie poprzez wybranych deputowanych sprawuje władzę państwową. Rząd Republiki Karakalpakstanu umacnia przyjaźń narodów. Państwo zapewnia wszystkim obywatelom równe prawa i wolności, niezależnie od poglądów politycznych, wyznania czy innych różnic."
    },
    full: {
      RU: "От имени народа Каракалпакстана может выступать только избранный им Жокаргы Кенес республики. Никакая часть общества, политическая партия, общественное объединение, движение или отдельное лицо не могут выступать от имени народа Республики Каракалпакстан.",
      KK: "Қарақалпақстан халқы атынан тек ғана ол сайлаған республиканың Жоқарғы Кеңеси ҳәрекет ете алады. Жәмийеттиң ҳеш бир бөлеги, сиясий партия, жәмийетлик бирлеспе, ҳәрекет ямаса айырым шахс Қарақалпақстан халқының атынан ҳәрекет ете алмайды.",
      EN: "Only the Jokargy Kenes of the republic, elected by the people of Karakalpakstan, may act on behalf of the people of Karakalpakstan. No part of society, political party, public association, movement, or individual may speak on behalf of the people of the Republic of Karakalpakstan.",
      PL: "W imieniu narodu Karakalpakstanu może występować jedynie wybrany przez niego Jokargy Kenes republiki. Żadna część społeczeństwa, partia polityczna, organizacja społeczna, ruch ani osoba prywatna nie mogą występować w imieniu narodu Republiki Karakalpakstanu."
    },
    comp: {
      RU: "УСЛОВНО. Принцип, согласно которому ни одна партия или группа не может выступать от имени народа, соответствует статье 3 Декларации. Однако установлено, что от имени народа может действовать только Верховный Совет, и этот орган действует в рамках конституции Узбекистана.",
      KK: "ШӘРТЛИ. Ҳеш бир партия яки топ халық атынан сөйлей алмайды деген принцип Декларация 3-статьясына муўапық. Бирақ халық атынан тек Жоқарғы Кеңес ҳәрекет ете алады деп белгиленип, бул орган Өзбекстан конституциялық шеңберинде жумыс ислейди.",
      EN: "CONDITIONAL. The principle that no party or group can speak on behalf of the people is enshrined in Article 3 of the Declaration. However, it has been established that only the Supreme Council can act on behalf of the people, and this body operates within the framework of the Constitution of Uzbekistan.",
      PL: "WARUNKOWE. Zasada, że żadna partia ani grupa nie może wypowiadać się w imieniu narodu, jest zapisana w artykule 3 deklaracji. Ustalono jednak, że tylko Rada Najwyższa może działać w imieniu ludu, a organ ten działa w ramach Konstytucji Uzbekistanu."
    }
  },
  {
    id: 11,
    title: "11-статья",
    cat: "amber",
    declRefLabel: {
      RU: "2. РАЗДЕЛЕНИЕ ВЛАСТЕЙ",
      KK: "2. ҲӘКИМИЯТ БӨЛИНИЎИ",
      EN: "2. SEPARATION OF POWERS",
      PL: "2. PODZIAŁ WŁADZY"
    },
    declFull: {
      RU: "Республика Каракалпакстан проводит государственное управление, принятие законов и указов и назначает судебные органы, осуществляющие надзор над исполнением принятого законодательства. Совет Министров Республики Каракалпакстан является высшим исполнительным и управляющим органом, осуществляющий принятие необходимых законов, управление и надзор над исполнением принятых законов. Совет Министров Республики Каракалпакстан является верховным исполнительным органом и органом управления. Верховный Суд Республики Каракалпакстан является Высшим Судом. Верховный Совет Республики Каракалпакстан назначает Генерального Прокурора осуществляющего надзор над исполнением закона, правопорядок и равного права всех перед законом.",
      KK: "Қарақалпақстан Республикасында мəмлекетлик ҳəкимият ҳəм нызам шығарыў, атқарыўшы ҳəм суд уйымларына бөлистириў принципине муўапық əмелге асырылады. -Қарақалпақстан Республикасының Жоқарғы Кеңеси Қарақалпақстан Республикасы мəмлекетлик ҳəкимиятының жоқары уйымы болып табылады, ол өз жумысында нызам шығарыў, бийлик етиў ҳəм қадағалаў ўазыйпаларын əмелге асырады. -Қарақалпақстан Республикасының Министрлер Кеңеси Қарақалпақстан Республикасының Мəмлекетлик ҳəкимиятының жоқарғы атқарыўшы ҳəм бийлик етиўши уйымы болып табылады. -Қарақалпақстан Республикасының Жоқарғы Суды Қарақалпақстан Республикасының Жоқарғы Суд уйымы болып табылады. -Қарақалпақстан Республикасы Жоқарғы Совети тайынлайтуғын Қарақалпақстан Республикасының прокуроры нызамлардың саррас ҳəм бир қыйлы орынланыўын жоқары дəрежеде бақлап отырады.",
      EN: "The Republic of Karakalpakstan conducts public administration, enacts laws and decrees, and appoints judicial bodies that oversee the implementation of the adopted legislation. The Supreme Council of the Republic of Karakalpakstan is the supreme body of state administration, which makes the necessary laws, manages and supervises the implementation of the adopted laws. The Council of Ministers of the Republic of Karakalpakstan is the supreme executive body and governing body. The Supreme Court of the Republic of Karakalpakstan is the Highest Court. The Supreme Council of the Republic of Karakalpakstan appoints the Prosecutor General to oversee the implementation of the law, the rule of law and the equal rights of all before the law.",
      PL: "Republika Karakalpakstanu prowadzi administrację państwową, uchwala ustawy i dekrety oraz powołuje organy sądowe sprawujące nadzór nad wykonaniem przyjętego ustawodawstwa. Najwyższa Rada Republiki Karakalpakstanu jest najwyższym organem administracji państwowej. Rada Ministrów Republiki Karakalpakstanu jest najwyższym organem wykonawczym i zarządzającym. Najwyższy Sąd Republiki Karakalpakstanu jest najwyższym organem sądowym. Najwyższa Rada powołuje Prokuratora Generalnego sprawującego nadzór nad przestrzeganiem prawa i równością obywateli wobec prawa."
    },
    full: {
      RU: "Система государственной власти Республики Каракалпакстан основывается на принципе разделения власти на законодательную, исполнительную и судебную.",
      KK: "Қарақалпақстан Республикасының мәмлекетлик ҳәкимият системасы – ҳәкимияттың нызам шығарыўшы, атқарыўшы ҳәм суд ҳәкимиятларына бөлиниў принципине тийкарланады.",
      EN: "The system of state power of the Republic of Karakalpakstan is based on the principle of separation of powers into legislative, executive, and judicial branches.",
      PL: "System władzy państwowej Republiki Karakalpakstanu opiera się na zasadzie podziału władzy na ustawodawczą, wykonawczą i sądowniczą."
    },
    comp: {
      RU: "УСЛОВНО. Принцип разделения властей формально совпадает с Декларацией. Однако все три ветви власти встроены в единую государственную систему Узбекистана, что ограничивает их суверенный статус",
      KK: "ШӘРТЛИ ҚАЙШЫ. Ҳәкимият бөлиниў принципи Декларация менен формаль түрде сәйкес келеди. Бирақ ҳәкимияттың үш тармағы да Өзбекстанның бирден-бир мәмлекетлик системасына интеграцияласқан, бул олардың суверен статусын шеклейди.",
      EN: "CONDITIONAL. The principle of separation of powers formally matches the Declaration. However, all three branches of power are built into the unified state system of Uzbekistan, limiting their sovereign status",
      PL: "WARUNKOWE. Zasada podziału władzy formalnie pokrywa się z Deklaracją. Jednak wszystkie trzy gałęzie władzy są wbudowane w jednolity system państwowy Uzbekistanu, co ogranicza ich status suwerenny."
    }
  },
  {
    id: 12,
    title: "12-статья",
    cat: "green",
    declRefLabel: {
      RU: "3. ПРАВА ЧЕЛОВЕКА",
      KK: "3. АДАМ ҲУҚЫҚЛАРЫ",
      EN: "3. HUMAN RIGHTS",
      PL: "3. PRAWA CZŁOWIEKA"
    },
    declFull: {
      RU: "Многонациональный народ Республики Каракалпакстан определяет и составляет Государство на своей суверенной территории. Народ, опираясь на Конституцию и законы непосредственно и однозначно через избранных депутатов осуществляет государственное управление. Правительство Республики Каракалпакстан уполномоченное властью осуществляет укрепление дружбы народов. Государство всем своим гражданам проживающим на территории Республики Каракалпакстан, не смотря на их политические взгляды, веру исповедания и другие отличия, обеспечивает всех равными правами и свободами.", 
        KK: "Қарақалпақстан Республикасының көп миллетли халқы оның мəмлекетлик Суверенитетиниң ўəкили ҳəм дəреги болып табылады. Халық Республиканың Конституциясы ҳəм тийкарында тиккелей жəне халық депутатларының Кеңеслери арқалы мəмлекетлик ҳəкимиятты иске асырады. Қарақалпақстан Республикасы мəмлекетлик ҳəкимиятын толық бийлигин пайдалана отырып, халықлар дослығын беккемлейди.", 
        EN: "The multinational people of the Republic of Karakalpakstan shall determine and constitute a State on their sovereign territory. The people, relying on the Constitution and laws, directly and unambiguously through the elected deputies, exercise State administration. The Government of the Republic of Karakalpakstan authorized by the government to strengthen the friendship of peoples. The State provides all its citizens residing in the territory of the Republic of Karakalpakstan with equal rights and freedoms, regardless of their political views, religious beliefs and other differences.", 
        PL: "Wielonarodowy naród Republiki Karakalpakstanu określa i konstytuuje Państwo na swoim suwerennym terytorium. Naród, opierając się na Konstytucji i ustawach, bezpośrednio i jednoznacznie poprzez wybranych deputowanych sprawuje władzę państwową. Rząd Republiki Karakalpakstanu umacnia przyjaźń narodów. Państwo zapewnia wszystkim obywatelom równe prawa i wolności, niezależnie od poglądów politycznych, wyznania czy innych różnic." 
    },
    full: {
      RU: "В Республике Каракалпакстан общественная жизнь развивается на основе многообразия политических институтов, идеологий и мнений. Никакая идеология не может устанавливаться в качестве официальной государственной.",
      KK: "Қарақалпақстан Республикасында жәмийетлик турмыс сиясий институтлардың, идеологиялардың ҳәм пикирлердиң көп түрлилиги тийкарында раўажланады. Ҳеш қандай идеология мәмлекетлик рәсмий идеология сыпатында белгилене алмайды.",
      EN: "Public life in the Republic of Karakalpakstan develops on the basis of the diversity of political institutions, ideologies, and opinions. No ideology may be established as an official state ideology.",
      PL: "Życie społeczne w Republice Karakalpakstanu rozwija się na podstawie różnorodności instytucji politycznych, ideologii i poglądów. Żadna ideologia nie może być ustanowiona jako oficjalna ideologia państwowa."
    },
    comp: {
      RU: "СООТВЕТСТВУЕТ. Идеологический плюрализм соответствует демократическим нормам, заложенным в Декларации.",
      KK: "МУЎАПЫҚ. Идеологиялық плюрализм Декларациядағы демократиялық нормаларға сай келеди.",
      EN: "MATCHES. Ideological pluralism corresponds to the democratic norms laid down in the Declaration.",
      PL: "ZGODNE. Pluralizm ideologiczny odpowiada normom demokratycznym zapisanym w Deklaracji."
    }
  },
  {
    id: 13,
    title: "13-статья",
    cat: "green",
    declRefLabel: {
      RU: "3. ПРАВА ЧЕЛОВЕКА",
      KK: "3. ИНСАН ҲУҚЫҚЛАРЫ",
      EN: "3. HUMAN RIGHTS",
      PL: "3. PRAWA CZŁOWIEKA"
    },
    declFull: {
      RU: "Многонациональный народ Республики Каракалпакстан определяет и составляет Государство на своей суверенной территории. Народ, опираясь на Конституцию и законы непосредственно и однозначно через избранных депутатов осуществляет государственное управление. Правительство Республики Каракалпакстан уполномоченное властью осуществляет укрепление дружбы народов. Государство всем своим гражданам проживающим на территории Республики Каракалпакстан, не смотря на их политические взгляды, веру исповедания и другие отличия, обеспечивает всех равными правами и свободами.",
      KK: "Қарақалпақстан Республикасының көп миллетли халқы оның мəмлекетлик Суверенитетиниң ўəкили ҳəм дəреги болып табылады. Халық Республиканың Конституциясы ҳəм тийкарында тиккелей жəне халық депутатларының Кеңеслери арқалы мəмлекетлик ҳəкимиятты иске асырады. Қарақалпақстан Республикасы мəмлекетлик ҳəкимиятын толық бийлигин пайдалана отырып, халықлар дослығын беккемлейди.",
      EN: "The multinational people of the Republic of Karakalpakstan shall determine and constitute a State on their sovereign territory. The people, relying on the Constitution and laws, directly and unambiguously through the elected deputies, exercise State administration. The Government of the Republic of Karakalpakstan authorized by the government to strengthen the friendship of peoples. The State provides all its citizens residing in the territory of the Republic of Karakalpakstan with equal rights and freedoms, regardless of their political views, religious beliefs and other differences.",
      PL: "Wielonarodowy naród Republiki Karakalpakstanu określa i konstytuuje Państwo na swoim suwerennym terytorium. Naród, opierając się na Konstytucji i ustawach, bezpośrednio i jednoznacznie poprzez wybranych deputowanych sprawuje władzę państwową. Rząd Republiki Karakalpakstanu umacnia przyjaźń narodów. Państwo zapewnia wszystkim obywatelom równe prawa i wolności, niezależnie od poglądów politycznych, wyznania czy innych różnic."
    },
    full: {
      RU: "Демократия в Республике Каракалпакстан базируется на общечеловеческих принципах, согласно которым высшей ценностью является человек, его жизнь, свобода, честь, достоинство и другие неотъемлемые права. Демократические права и свободы защищаются Конституцией и законами.",
      KK: "Қарақалпақстан Республикасында демократия улыўма инсаныйлық принциплерине тийкарланады, буларға муўапық инсан, оның турмысы, еркинлиги, ар-намысы, қәдир-қымбаты ҳәм басқа да ажыралмас ҳуқықлары ең жоқары байлық болып табылады. Демократиялық ҳуқықлар ҳәм еркинликлер Конституция ҳәм нызамлар менен қорғалады.",
      EN: "Democracy in the Republic of Karakalpakstan is based on universal human principles, according to which the highest value is the human being, their life, freedom, honor, dignity, and other inalienable rights. Democratic rights and freedoms are protected by the Constitution and the laws.",
      PL: "Demokracja w Republice Karakalpakstanu opiera się na uniwersalnych zasadach, zgodnie z którymi najwyższą wartością jest człowiek, jego życie, wolność, honor, godność oraz inne niezbywalne prawa. Demokratyczne prawa i wolności są chronione przez Konstytucję i ustawy."
    },
    comp: {
      RU: "СООТВЕТСТВУЕТ. Определение человека как высшей ценности полностью согласуется с целями Декларации по защите прав каждого гражданина.",
      KK: "МУЎАПЫҚ. Инсанды ең жоқары байлық деп белгилеў Декларацияның ҳәр бир пухараның ҳуқықларын қорғаў махсетлерине муўапық келеди.",
      EN: "MATCHES. Defining the human being as the highest value is fully consistent with the Declaration's goals of protecting the rights of every citizen.",
      PL: "ZGODNE. Definiowanie człowieka jako najwyższej wartości jest w pełni zgodne z celami Deklaracji w zakresie ochrony praw każdego obywatela."
    }
  },
  { id: 14, title: "14-статья", 
    cat: "green",
    declRefLabel: { 
      RU: "3. ПРАВОВОЕ УПРАВЛЕНИЕ", 
      KK: "3. ҲУҚЫҚЛЫҚ БАСҚАРЫЎ", 
      EN: "3. LEGAL MANAGEMENT", 
      PL: "3. ZARZĄDZANIE PRAWNE" 
    },
    declFull: { 
        RU: "Многонациональный народ Республики Каракалпакстан определяет и составляет Государство на своей суверенной территории. Народ, опираясь на Конституцию и законы непосредственно и однозначно через избранных депутатов осуществляет государственное управление. Правительство Республики Каракалпакстан уполномоченное властью осуществляет укрепление дружбы народов. Государство всем своим гражданам проживающим на территории Республики Каракалпакстан, не смотря на их политические взгляды, веру исповедания и другие отличия, обеспечивает всех равными правами и свободами.", 
        KK: "Қарақалпақстан Республикасының көп миллетли халқы оның мəмлекетлик Суверенитетиниң ўəкили ҳəм дəреги болып табылады. Халық Республиканың Конституциясы ҳəм тийкарында тиккелей жəне халық депутатларының Кеңеслери арқалы мəмлекетлик ҳəкимиятты иске асырады. Қарақалпақстан Республикасы мəмлекетлик ҳəкимиятын толық бийлигин пайдалана отырып, халықлар дослығын беккемлейди.", 
        EN: "The multinational people of the Republic of Karakalpakstan shall determine and constitute a State on their sovereign territory. The people, relying on the Constitution and laws, directly and unambiguously through the elected deputies, exercise State administration. The Government of the Republic of Karakalpakstan authorized by the government to strengthen the friendship of peoples. The State provides all its citizens residing in the territory of the Republic of Karakalpakstan with equal rights and freedoms, regardless of their political views, religious beliefs and other differences.", 
        PL: "Wielonarodowy naród Republiki Karakalpakstanu określa i konstytuuje Państwo na swoim suwerennym terytorium. Naród, opierając się na Konstytucji i ustawach, bezpośrednio i jednoznacznie poprzez wybranych deputowanych sprawuje władzę państwową. Rząd Republiki Karakalpakstanu umacnia przyjaźń narodów. Państwo zapewnia wszystkim obywatelom równe prawa i wolności, niezależnie od poglądów politycznych, wyznania czy innych różnic." 
    },
    full: { 
        RU: "Государство строит свою деятельность, исходя из интересов благополучия человека и общества, на принципах социальной справедливости и законности.", 
        KK: "Мәмлекет өзиниң жумысын инсанның ҳәм жәмийеттиң абаданлығы мәплерин гөзлеп, социаллық әдиллик ҳәм нызамлылық принциплеринде қурыды.", 
        EN: "The State carries out its activities on the principles of social justice and legality, pursuing the interests of the well-being of the human being and society.", 
        PL: "Państwo opiera swoją działalność na interesach dobrobytu człowieka i społeczeństwa, na zasadach sprawiedliwości społecznej i praworządności." 
    },
    comp: {
      RU: "СООТВЕТСТВУЕТ. Норма о том, что государство действует на основе принципа социальной справедливости, соответствует принципу укрепления дружбы народов и равенства граждан, изложенному в статье 3 Декларации.",
      KK: "МУЎАПЫҚ. Мәмлекет социаллық әдиллик принципи тийкарында жумыс алып барады, деген норма Декларацияның 3-статьясындағы халықлар дослығын беккемлеў ҳәм пуқаралар теңлиги принципине муўапық.",
      EN: "MATCHES. The provision that the state operates on the basis of the principle of social justice corresponds to the principle of strengthening friendship between peoples and equality of citizens, contained in Article 3 of the Declaration.",
      PL: "ZGODNE. Oświadczenie o tym, że państwo działa w oparciu o zasadę sprawiedliwości społecznej, zgodne z zasadą umocnienia przyjaźni między narodami i równości obywateli, zawartego w artykule 3 Deklaracji."
    }
  },
  {
    id: 15,
    title: "15-статья",
    cat: "red",
    declRefLabel: {
      RU: "4. ВЕРХОВЕНСТВО ЗАКОНА",
      KK: "4. НЫЗАМ ҮСТЕМЛИГИ",
      EN: "4. SUPREMACY OF LAW",
      PL: "4. ZWIERZCHNICTWO PRAWA"
    },
    declFull: {
      RU: "Определяется верховенство законов и Конституции на территории Республики Каракалпакстан. Если со стороны правительств СССР и Узбекской ССР нарушаются права граждан Республики Каракалпакстан, то на основании существующих соглашений и законов СССР и УзССР, Республика Каракалпакстан вправе приостановить все принятые межгосударственные соглашения и договора и предъявить им ноту протеста.",
      KK: "Қарақалпақстан аймағында өзиниң ықтыярына берилген мəселелер бойынша Қарақалпақстан Республикасының Конституциясының ҳəм нызамларының үстемлиги белгиленеди. Егер СССРдың ҳəм Өзбекстан ССРның ҳуқықлық ўəкиллери шегинен шығып кетсе ҳəм Қарақалпақстан Республикасының ҳуқықларын бузатуғын болса, Республика СССРдың ҳəм Өзбекстан ССРның нызамларының, СССР ҳəм Өзбекстан ССР уйымларының басқа да актлериниң, шəртнамаларының ҳəрекет етиўин тоқтатыўға ҳəм оларға наразылық билдириўге ҳақылы.",
      EN: "The supremacy of laws and the Constitution in the territory of the Republic of Karakalpakstan is determined. If the rights of citizens of the Republic of Karakalpakstan are violated by the governments of the USSR and the Uzbek SSR, then on the basis of existing agreements and laws of the USSR and the Uzbek SSR, the Republic of Karakalpakstan has the right to suspend all interstate agreements and agreements and submit a note of protest to them.",
      PL: "Na terytorium Republiki Karakalpakstanu obowiązuje nadrzędność Konstytucji i ustaw. Jeśli prawa obywateli Republiki Karakalpakstanu są naruszane przez rządy ZSRR lub Uzbeckiej SRR, Republika ma prawo zawiesić wszystkie umowy międzypaństwowe i przedstawić im notę protestacyjną."
    },
    full: {
      RU: "В Республике Каракалпакстан признается безусловное верховенство Конституций и законов Республики Узбекистан и Республики Каракалпакстан. Государство, его органы, должностные лица, общественные объединения и граждане действуют в соответствии с Конституцией и законами.",
      KK: "Қарақалпақстан Республикасында Өзбекстан Республикасы менен Қарақалпақстан Республикасы Конституцияларының ҳәм нызамларының сөзсиз үстинлиги мойынланады. Мәмлекет, оның уйымлары, лаўазымлы шахслар, жәмийетлик бирлеспелер, пуқаралар Конституцияға ҳәм нызамларға муўапық ҳәрекет етеди.",
      EN: "The unconditional supremacy of the Constitutions and laws of the Republic of Uzbekistan and the Republic of Karakalpakstan is recognized in the Republic of Karakalpakstan. The state, its bodies, officials, public associations, and citizens act in accordance with the Constitution and the laws.",
      PL: "W Republice Karakalpakstanu uznaje się bezwzględne nadrzędstwo Konstytucji i ustaw Republiki Uzbekistanu oraz Republiki Karakalpakstanu. Państwo, jego organy, funkcjonariusze publiczni, organizacje społeczne i obywatele działają zgodnie z Konstytucją i ustawami."
    },
    comp: {
      RU: "ПРОТИВОРЕЧИЕ. Декларация провозглашает исключительное верховенство законов РК. Конституция же признает верховенство законов Узбекистана, что ликвидирует правовой суверенитет.",
      KK: "ҚАЙШЫ. Декларация Қарақалпақстан нызамларының айрықша үстемлигин жәриялайды. Конституция болса Өзбекстан нызамларының үстинлигин таныйды, бул ҳуқықый суверенитетти жоққа шығарады.",
      EN: "CONTRADICTION. The Declaration proclaims the exclusive supremacy of RK laws. The Constitution, however, recognizes the supremacy of Uzbekistan's laws, which eliminates legal sovereignty.",
      PL: "SPRZECZNOŚĆ. Deklaracja proklamuje wyłączne zwierzchnictwo praw RK. Konstytucja uznaje natomiast zwierzchnictwo praw Uzbekistanu, co likwiduje suwerenność prawną."
    }
  },
  {
    id: 16,
    title: "16-статья",
    cat: "amber",
    declRefLabel: {
      RU: "4. ЗАЩИТА СУВЕРЕНИТЕТА",
      KK: "4. СУВЕРЕНИТЕТТИ ҚОРҒАЎ",
      EN: "4. PROTECTION OF SOVEREIGNTY",
      PL: "4. OCHRONA SUWERENNOŚCI"
    },
    declFull: {
      RU: "Определяется верховенство законов и Конституции на территории Республики Каракалпакстан. Если со стороны правительств СССР и Узбекской ССР нарушаются права граждан Республики Каракалпакстан, то на основании существующих соглашений и законов СССР и УзССР, Республика Каракалпакстан вправе приостановить все принятые межгосударственные соглашения и договора и предъявить им ноту протеста.",
      KK: "Қарақалпақстан аймағында өзиниң ықтыярына берилген мəселелер бойынша Қарақалпақстан Республикасының Конституциясының ҳəм нызамларының үстемлиги белгиленеди. Егер СССРдың ҳəм Өзбекстан ССРның ҳуқықлық ўəкиллери шегинен шығып кетсе ҳəм Қарақалпақстан Республикасының ҳуқықларын бузатуғын болса, Республика СССРдың ҳəм Өзбекстан ССРның нызамларының, СССР ҳəм Өзбекстан ССР уйымларының басқа да актлериниң, шəртнамаларының ҳəрекет етиўин тоқтатыўға ҳəм оларға наразылық билдириўге ҳақылы.",
      EN: "The supremacy of laws and the Constitution in the territory of the Republic of Karakalpakstan is determined. If the rights of citizens of the Republic of Karakalpakstan are violated by the governments of the USSR and the Uzbek SSR, then on the basis of existing agreements and laws of the USSR and the Uzbek SSR, the Republic of Karakalpakstan has the right to suspend all interstate agreements and agreements and submit a note of protest to them.",
      PL: "Na terytorium Republiki Karakalpakstanu obowiązuje nadrzędność Konstytucji i ustaw. Jeśli prawa obywateli Republiki Karakalpakstanu są naruszane przez rządy ZSRR lub Uzbeckiej SRR, Republika ma prawo zawiesić wszystkie umowy międzypaństwowe i przedstawić im notę protestacyjną."
    },
    full: {
      RU: "Ни одно из положений настоящей Конституции не может толковаться в ущерб правам и интересам Республики Каракалпакстан. Ни один закон или иной нормативно-правовой акт не может противоречить нормам и принципам Конституции.",
      KK: "Усы Конституциядағы режелердиң бирде биреўи Қарақалпақстан Республикасының ҳуқық ҳәм мәплерине зәлел келетуғындай етип түсиндирилмейди. Бир де нызам ямаса басқа да нормативлик ҳуқықый акти Конституцияның нормаларына ҳәм принциплерине қайшы келиўи мүмкин емес.",
      EN: "No provision of this Constitution may be interpreted to the detriment of the rights and interests of the Republic of Karakalpakstan. No law or other normative legal act may contradict the norms and principles of the Constitution.",
      PL: "Żaden przepis niniejszej Konstytucji nie może być interpretowany na szkodę praw i interesów Republiki Karakalpakstanu. Żadna ustawa ani inny akt normatywno‑prawny nie może być sprzeczny z normami i zasadami Konstytucji."
    },
    comp: {
      RU: "УСЛОВНО. Хотя статья направлена на защиту интересов РК, она вступает в конфликт со ст. 15 о верховенстве законов Узбекистана, что делает её применение ограниченным.",
      KK: "ШӘРТЛИ ҚАЙШЫ. Бул статья Қарақалпақстан мәплерин қорғаўға қаратылған болса да, ол Өзбекстан нызамларының үстинлиги ҳаққындағы 15-статья менен қарама-қайшылыққа түседи, бул оның әмелде қолланылыўын шеклейди.",
      EN: "CONDITIONAL. Although the article is aimed at protecting the interests of the RK, it comes into conflict with Article 15 on the supremacy of Uzbekistan's laws, making its application limited.",
      PL: "WARUNKOWE. Chociaż artykuł ma na celu ochronę interesów RK, wchodzi w konflikt z art. 15 o zwierzchnictwie praw Uzbekistanu, co sprawia, że jego stosowanie jest ograniczone."
    }
  },
  {
    id: 17,
    title: "17-статья",
    cat: "red",
    declRefLabel: {
      RU: "5. ВНЕШНЯЯ ДЕЯТЕЛЬНОСТЬ",
      KK: "5. СЫРТҚЫ ЖУМЫС",
      EN: "5. EXTERNAL ACTIVITY",
      PL: "5. DZIAŁALNOŚĆ ZEWNĘTRZNA"
    },
    declFull: {
      RU: "Республика Каракалпакстан осуществляет защиту Конституционных Прав своих граждан, защиту их свобод, защиту их права на труд, защиту их собственности и определяет меры по осуществлению защиты, осуществляет организацию общественной жизни, осуществляет социально-культурное и экономическое развитие, осуществляет внешнеэкономическую деятельность, создание свободных экономических зон, осуществляет управление финансово-бюджетной системы, определяет основы оплаты труда и ценообразование, налоговое управление, защиту своей территории и управление природными ресурсами.",
      KK: "Қарақалпақстан Республикасы пухараларының Конституциялық ҳуқықларын, еркинликлерин ҳəм мийнетлерин, меншик қатнасықларын əмелге асырыў тəртибин, халық хожалығына ҳəм социаллық мəдений қурылысқа басшылық етиўди, сыртқы экономикалық жумысты шөлкемлестириўди, соның ишинде еркин кəрханашылық зоналарын, бюджетлик-финанс системасын мийнетке ҳақы төлеў ҳəм баҳа қойыў, салық салыў,қоршап турған орталықты қорғаў ҳəм тəбийий қорлардан пайдаланыў ислерин нызам менен ретлестириўди өз бетинше əмелге асырады.",
      EN: "The Republic of Karakalpakstan shall protect the Constitutional Rights of its citizens, the protection of their freedoms and protect their the right to work, protection of their property and defines the measures for the implementation of protection, organizes public life, carries out socio-cultural and economic development, provides externally economic activity, the creation of free economic zones, manages financial budget the system determines the basis of wage and pricing, tax administration, protection of its territory and management of natural resources.",
      PL: "Republika Karakalpakstanu chroni konstytucyjne prawa swoich obywateli, ich wolności, prawo do pracy, własności, organizuje życie społeczne, prowadzi rozwój społeczno-kulturalny i gospodarczy, działalność zagraniczną, tworzy wolne strefy ekonomiczne, zarządza systemem finansowo-budżetowym, określa podstawy wynagrodzeń i cen, prowadzi administrację podatkową, chroni swoje terytorium i zarządza zasobami naturalnymi."
    },
    full: {
      RU: "Международные научные, культурные и внешнеэкономические отношения Республики Каракалпакстан осуществляются в соответствии с законодательством Республики Узбекистан и Республики Каракалпакстан.",
      KK: "Қарақалпақстан Республикасының халықаралық илимий, мәдений ҳәм сыртқы экономикалық қатнасықлары Өзбекстан Республикасының ҳәм Қарақалпақстан Республикасының нызамларына муўапық әмелге асырылады.",
      EN: "International scientific, cultural, and foreign economic relations of the Republic of Karakalpakstan are carried out in accordance with the legislation of the Republic of Uzbekistan and the Republic of Karakalpakstan.",
      PL: "Międzynarodowe stosunki naukowe, kulturalne i zewnętrzno‑ekonomiczne Republiki Karakalpakstanu są realizowane zgodnie z ustawodawstwem Republiki Uzbekistanu i Republiki Karakalpakstanu."
    },
    comp: {
      RU: "ПРОТИВОРЕЧИЕ. Декларация дает право на самостоятельную внешнюю деятельность, тогда как Конституция полностью подчиняет её законодательству Узбекистана.",
      KK: "ҚАЙШЫ. Декларация өз бетинше сыртқы жумыс жүргизиў ҳуқықын береди, ал Конституция болса оны толықтай Өзбекстан нызамшылығына бағындырып қояды.",
      EN: "CONTRADICTION. The Declaration grants the right to independent external activity, whereas the Constitution completely subordinates it to the legislation of Uzbekistan.",
      PL: "SPRZECZNOŚĆ. Deklaracja daje prawo do samodzielnej działalności zewnętrznej, podczas gdy Konstytucja całkowicie podporządkowuje ją ustawodawstwu Uzbekistanu."
    }
  },
  {
    id: 18,
    title: "18-статья",
    cat: "green",
    declRefLabel: {
      RU: "3. РАВЕНСТВО ПРАВ",
      KK: "3. ҲУҚЫҚЛАР ТЕҢЛИГИ",
      EN: "3. EQUALITY OF RIGHTS",
      PL: "3. RÓWNOŚĆ PRAW"
    },
    declFull: {
      RU: "Многонациональный народ Республики Каракалпакстан определяет и составляет Государство на своей суверенной территории. Народ, опираясь на Конституцию и законы непосредственно и однозначно через избранных депутатов осуществляет государственное управление. Правительство Республики Каракалпакстан уполномоченное властью осуществляет укрепление дружбы народов. Государство всем своим гражданам проживающим на территории Республики Каракалпакстан, не смотря на их политические взгляды, веру исповедания и другие отличия, обеспечивает всех равными правами и свободами.",
      KK: "Қарақалпақстан Республикасының көп миллетли халқы оның мəмлекетлик Суверенитетиниң ўəкили ҳəм дəреги болып табылады. Халық Республиканың Конституциясы ҳəм тийкарында тиккелей жəне халық депутатларының Кеңеслери арқалы мəмлекетлик ҳəкимиятты иске асырады. Қарақалпақстан Республикасы мəмлекетлик ҳəкимиятын толық бийлигин пайдалана отырып, халықлар дослығын беккемлейди.",
      EN: "The multinational people of the Republic of Karakalpakstan shall determine and constitute a State on their sovereign territory. The people, relying on the Constitution and laws, directly and unambiguously through the elected deputies, exercise State administration. The Government of the Republic of Karakalpakstan authorized by the government to strengthen the friendship of peoples. The State provides all its citizens residing in the territory of the Republic of Karakalpakstan with equal rights and freedoms, regardless of their political views, religious beliefs and other differences.",
      PL: "Wielonarodowy naród Republiki Karakalpakstanu określa i konstytuuje Państwo na swoim suwerennym terytorium. Naród, opierając się na Konstytucji i ustawach, bezpośrednio i jednoznacznie poprzez wybranych deputowanych sprawuje władzę państwową. Rząd Republiki Karakalpakstanu umacnia przyjaźń narodów. Państwo zapewnia wszystkim obywatelom równe prawa i wolności, niezależnie od poglądów politycznych, wyznania czy innych różnic."
    },
    full: {
      RU: "Все граждане Республики Каракалпакстан имеют одинаковые права и свободы и равны перед законом без различия пола, расы, национальности, языка, религии, социального происхождения, убеждений, личного и общественного положения. Льготы могут быть установлены только законом и должны соответствовать принципам социальной справедливости.",
      KK: "Қарақалпақстан Республикасының барлық пуқаралары бирдей ҳуқықларға және еркинликлерге ийе болып, жынысының, расасының, миллетиниң, тилиниң, дининиң, социаллық шығысының, исенимлериниң, жеке ҳәм жәмийетлик аўҳалының айырмашылығына қарамастан нызам алдында тең. Жеңилликлер тек нызам менен белгилениўи мүмкин ҳәм социаллық әдиллик принциплерине сәйкес келиўи тийис.",
      EN: "All citizens of the Republic of Karakalpakstan have equal rights and freedoms and are equal before the law regardless of sex, race, nationality, language, religion, social origin, beliefs, personal or social status. Privileges may be established only by law and must comply with the principles of social justice.",
      PL: "Wszyscy obywatele Republiki Karakalpakstanu mają równe prawa i wolności oraz są równi wobec prawa, bez względu na płeć, rasę, narodowość, język, religię, pochodzenie społeczne, przekonania, status osobisty i społeczny. Ulgi mogą być ustanawiane wyłącznie ustawą i muszą odpowiadać zasadom sprawiedliwości społecznej."
    },
    comp: {
      RU: "СООТВЕТСТВУЕТ. Положение о всеобщем равенстве перед законом прямо соответствует норме Декларации о равных правах граждан.",
      KK: "МУЎАПЫҚ. Нызам алдындағы улыўмалық теңлик ҳаққындағы реже Декларациядағы пухаралардың тең ҳуқықлығы нормасына тиккелей муўапық келеди.",
      EN: "MATCHES. The provision on universal equality before the law directly corresponds to the Declaration's norm on the equal rights of citizens.",
      PL: "ZGODNE. Postanowienie o powszechnej równości wobec prawa jest bezpośrednio zgodne z normą Deklaracji o równych prawach obywateli."
    }
  },
  {
    id: 19,
    title: "19-статья",
    cat: "green",
    declRefLabel: {
      RU: "3. ЗАЩИТА ПРАВ",
      KK: "3. ҲУҚЫҚЛАРДЫ ҚОРҒАЎ",
      EN: "3. PROTECTION OF RIGHTS",
      PL: "3. OCHRONA PRAW"
    },
    declFull: {
      RU: "Многонациональный народ Республики Каракалпакстан определяет и составляет Государство на своей суверенной территории. Народ, опираясь на Конституцию и законы непосредственно и однозначно через избранных депутатов осуществляет государственное управление. Правительство Республики Каракалпакстан уполномоченное властью осуществляет укрепление дружбы народов. Государство всем своим гражданам проживающим на территории Республики Каракалпакстан, не смотря на их политические взгляды, веру исповедания и другие отличия, обеспечивает всех равными правами и свободами.",
      KK: "Қарақалпақстан Республикасының көп миллетли халқы оның мəмлекетлик Суверенитетиниң ўəкили ҳəм дəреги болып табылады. Халық Республиканың Конституциясы ҳəм тийкарында тиккелей жəне халық депутатларының Кеңеслери арқалы мəмлекетлик ҳəкимиятты иске асырады. Қарақалпақстан Республикасы мəмлекетлик ҳəкимиятын толық бийлигин пайдалана отырып, халықлар дослығын беккемлейди.",
      EN: "The multinational people of the Republic of Karakalpakstan shall determine and constitute a State on their sovereign territory. The people, relying on the Constitution and laws, directly and unambiguously through the elected deputies, exercise State administration. The Government of the Republic of Karakalpakstan authorized by the government to strengthen the friendship of peoples. The State provides all its citizens residing in the territory of the Republic of Karakalpakstan with equal rights and freedoms, regardless of their political views, religious beliefs and other differences.",
      PL: "Wielonarodowy naród Republiki Karakalpakstanu określa i konstytuuje Państwo na swoim suwerennym terytorium. Naród, opierając się na Konstytucji i ustawach, bezpośrednio i jednoznacznie poprzez wybranych deputowanych sprawuje władzę państwową. Rząd Republiki Karakalpakstanu umacnia przyjaźń narodów. Państwo zapewnia wszystkim obywatelom równe prawa i wolności, niezależnie od poglądów politycznych, wyznania czy innych różnic."
    },
    full: {
      RU: "Гражданин Республики Каракалпакстан и государство связаны взаимными правами и взаимной ответственностью. Права и свободы граждан, закрепленные в Конституции и законах, являются незыблемыми и никто не вправе без суда лишить или ограничить их.",
      KK: "Қарақалпақстан Республикасының пуқарасы ҳәм мәмлекет өз ара ҳуқықлар ҳәм өз ара жуўапкершилик пенен байланысады. Пуқаралардың Конституцияда ҳәм нызамларда бекитилген ҳуқықлары менен еркинликлерине қол қатылмайды ҳәм судтың шешимисиз булардан айырыўға ямаса шеклеўге ҳеш кимниң ҳақысы жоқ.",
      EN: "A citizen of the Republic of Karakalpakstan and the state are bound by mutual rights and mutual responsibility. The rights and freedoms of citizens enshrined in the Constitution and laws are inviolable, and no one may be deprived of them or have them restricted without a court decision.",
      PL: "Obywatel Republiki Karakalpakstanu i państwo są związani wzajemnymi prawami i wzajemną odpowiedzialnością. Prawa i wolności obywateli, zagwarantowane w Konstytucji i ustawach, są nienaruszalne i nikt nie ma prawa pozbawić ich lub ograniczyć bez orzeczenia sądu."
    },
    comp: {
      RU: "СООТВЕТСТВУЕТ. Взаимная ответственность государства и гражданина, а также судебная защита прав соответствуют принципам Декларации.",
      KK: "МУЎАПЫҚ. Мәмлекет ҳәм пухараның өзара жуўапкершилиги, сондай-ақ ҳуқықлардың суд арқалы қорғалыўы Декларация принциплерине муўапық келеди.",
      EN: "MATCHES. The mutual responsibility of the state and the citizen, as well as the judicial protection of rights, correspond to the principles of the Declaration.",
      PL: "ZGODNE. Wzajemna odpowiedzialność państwa i obywatela, a także sądowa ochrona praw odpowiadają zasadom Deklaracji."
    }
  },
  {
    id: 20,
    title: "20-статья",
    cat: "green",
    declRefLabel: {
      RU: "3. ОБЩЕСТВЕННОЕ СОГЛАСИЕ",
      KK: "3. ЖӘМИЙЕТЛИК ТАТЫЎЛЫҚ",
      EN: "3. SOCIAL HARMONY",
      PL: "3. ZGODA SPOŁECZNA"
    },
    declFull: {
      RU: "Многонациональный народ Республики Каракалпакстан определяет и составляет Государство на своей суверенной территории. Народ, опираясь на Конституцию и законы непосредственно и однозначно через избранных депутатов осуществляет государственное управление. Правительство Республики Каракалпакстан уполномоченное властью осуществляет укрепление дружбы народов. Государство всем своим гражданам проживающим на территории Республики Каракалпакстан, не смотря на их политические взгляды, веру исповедания и другие отличия, обеспечивает всех равными правами и свободами.",
      KK: "Қарақалпақстан Республикасының көп миллетли халқы оның мəмлекетлик Суверенитетиниң ўəкили ҳəм дəреги болып табылады. Халық Республиканың Конституциясы ҳəм тийкарында тиккелей жəне халық депутатларының Кеңеслери арқалы мəмлекетлик ҳəкимиятты иске асырады. Қарақалпақстан Республикасы мəмлекетлик ҳəкимиятын толық бийлигин пайдалана отырып, халықлар дослығын беккемлейди.",
      EN: "The multinational people of the Republic of Karakalpakstan shall determine and constitute a State on their sovereign territory. The people, relying on the Constitution and laws, directly and unambiguously through the elected deputies, exercise State administration. The Government of the Republic of Karakalpakstan authorized by the government to strengthen the friendship of peoples. The State provides all its citizens residing in the territory of the Republic of Karakalpakstan with equal rights and freedoms, regardless of their political views, religious beliefs and other differences.",
      PL: "Wielonarodowy naród Republiki Karakalpakstanu określa i konstytuuje Państwo na swoim suwerennym terytorium. Naród, opierając się na Konstytucji i ustawach, bezpośrednio i jednoznacznie poprzez wybranych deputowanych sprawuje władzę państwową. Rząd Republiki Karakalpakstanu umacnia przyjaźń narodów. Państwo zapewnia wszystkim obywatelom równe prawa i wolności, niezależnie od poglądów politycznych, wyznania czy innych różnic."
    },
    full: {
      RU: "Осуществление прав и свобод гражданином не должно нарушать законных интересов, прав и свобод других лиц, государства и общества.",
      KK: "Пуқаралар өз ҳуқық ҳәм еркинликлерин әмелге асырыўда басқа шахслардың, мәмлекет ҳәм жәмийеттиң нызамлы мәплери, ҳуқықлары ҳәм еркинликлерине зыян тийгизбеўи шәрт.",
      EN: "The exercise of rights and freedoms by a citizen must not violate the lawful interests, rights, and freedoms of other persons, the state, or society.",
      PL: "Korzystanie przez obywatela z jego praw i wolności nie może naruszać prawnie chronionych interesów, praw i wolności innych osób, państwa ani społeczeństwa."
    },
    comp: {
      RU: "СООТВЕТСТВУЕТ. Баланс прав и обязанностей соответствует норме Декларации об общественном согласии и взаимном уважении прав.",
      KK: "МУЎАПЫҚ. Ҳуқық ҳәм мәжбүриятлар балансы Декларациядағы жәмийиетлик татыўлық ҳәм ҳуқықларға өзара хүрмет көрсетиў нормасына муўапық келеди.",
      EN: "MATCHES. The balance of rights and duties corresponds to the Declaration's norm on social harmony and mutual respect for rights.",
      PL: "ZGODNE. Równowaga praw i obowiązków odpowiada normie Deklaracji o zgodzie społecznej i wzajemnym poszanowaniu praw."
    }
  },
  {
    id: 21,
    title: "21-статья",
    cat: "red",
    declRefLabel: {
      RU: "8. ГРАЖДАНСТВО",
      KK: "8. ПУХАРАЛЫҚ",
      EN: "8. CITIZENSHIP",
      PL: "8. OBYWATELSTWO"
    },
    declFull: {
      RU: "Граждане Республики Каракалпакстан, ранее являвшиеся гражданами СССР и Узбекской ССР, теперь являются гражданами Республики Каракалпакстан.",
      KK: "Қарақалпақстан Республикасы өзиниң пуқаралығына ийе болады, Республика пухаралары соның менен бир ўақытта Өзбекстан ССРның ҳəм СССРдың  пухаралары болып табылады.",
      EN: "Citizens of the Republic of Karakalpakstan who were citizens of the USSR and the Uzbek SSR are now citizens of the Republic of Karakalpakstan.",
      PL: "Obywatele Republiki Karakalpakstanu, którzy wcześniej byli obywatelami ZSRR i Uzbeckiej SRR, stają się obywatelami Republiki Karakalpakstanu."
    },
    full: {
      RU: "В соответствии с установленным в Республике Узбекистан единым гражданством, каждый гражданин Республики Каракалпакстан является гражданином Республики Узбекистан. Основания и порядок приобретения и утраты гражданства определяется Законом Республики Узбекистан о гражданстве. Иностранным гражданам и лицам без гражданства, находящимся на территории Республики Каракалпакстан, обеспечиваются права и свободы в соответствии с нормами международного права. Они несут обязанности, установленные Конституцией и законами Республики Каракалпакстан и международными договорами Республики Узбекистан.",
      KK: "Өзбекстан Республикасында бирден-бир пуқаралықтың белгилениўине муўапық Қарақалпақстан Республикасының ҳәр бир пуқарасы Өзбекстан Республикасының пуқарасы болып табылады. Пуқаралыққа ерисиў ҳәм оннан айырылып қалыў тийкарлары ҳәм тәртиби Өзбекстан Республикасының пуқаралық ҳаққындағы нызамы менен белгиленеди. Қарақалпақстан Республикасы аймағындағы сырт ел пуқаралары ҳәм пуқаралыққа ийе болмаған шахслардың ҳуқық ҳәм еркинликлери халықаралық ҳуқық нормаларына муўапық тәмийинленеди. Олар Қарақалпақстан Республикасының Конституциясы, нызамлары ҳәм Өзбекстан Республикасының халықаралық шәртнамаларында белгиленген миннетлерди атқарады.",
      EN: "In accordance with the unified citizenship established in the Republic of Uzbekistan, every citizen of the Republic of Karakalpakstan is a citizen of the Republic of Uzbekistan. The grounds and procedure for acquiring and losing citizenship are determined by the Law of the Republic of Uzbekistan on Citizenship. Foreign citizens and stateless persons residing on the territory of the Republic of Karakalpakstan are guaranteed rights and freedoms in accordance with the norms of international law. They bear the obligations established by the Constitution and laws of the Republic of Karakalpakstan and by international treaties of the Republic of Uzbekistan.",
      PL: "Zgodnie z obowiązującą w Republice Uzbekistanu zasadą jednolitego obywatelstwa, każdy obywatel Republiki Karakalpakstanu jest obywatelem Republiki Uzbekistanu. Podstawy i tryb nabycia oraz utraty obywatelstwa określa Ustawa Republiki Uzbekistanu o obywatelstwie. Cudzoziemcom i osobom bez obywatelstwa przebywającym na terytorium Republiki Karakalpakstanu zapewnia się prawa i wolności zgodnie z normami prawa międzynarodowego. Podlegają oni obowiązkom ustanowionym Konstytucją i ustawami Republiki Karakalpakstanu oraz umowami międzynarodowymi Republiki Uzbekistanu."
    },
    comp: {
      RU: "ПРОТИВОРЕЧИЕ. В Декларации (ст. 8) провозглашено, что КР определяет своё гражданство самостоятельно. В Конституции гражданство КР поглощено гражданством Узбекистана, и порядок его регулирования передан законам Узбекистана, что полностью ликвидирует гражданский суверенитет.",
      KK: "ҚАЙШЫ. Декларация 8-статьясында Қарақалпақстан Республикасы өзиниң пухаралығын белгилейди деп жәрияланған. Конституцияда болса Қарақалпақстан Республикасы пухарасы Өзбекстан пухарасы деп белгиленип, пухаралықты алыў ҳәм жоғалтыў тәртиби Өзбекстан нызамы арқалы анықланады — Қарақалпақстан Республикасының өз пухаралық суверенитети толығы менен жоқ қылынған.",
      EN: "CONTRADICTION. The Declaration (Art. 8) proclaims that the RK determines its own citizenship independently. In the Constitution, RK citizenship is absorbed by Uzbekistan's citizenship, and its regulation is transferred to the laws of Uzbekistan, completely eliminating civic sovereignty.",
      PL: "SPRZECZNOŚĆ. Deklaracja (art. 8) proklamuje, że RK samodzielnie określa swoje obywatelstwo. W Konstytucji obywatelstwo RK zostało wchłonięte przez obywatelstwo Uzbekistanu, a regulację tego procesu przekazano ustawom Uzbekistanu, co całkowicie likwiduje suwerenność obywatelską."
    }
  },
  {
    id: 22,
    title: "22-статья",
    cat: "green",
    declRefLabel: {
      RU: "3. ПРАВО НА ЖИЗНЬ",
      KK: "3. ЖАСАЎ ҲУҚЫҚЫ",
      EN: "3. RIGHT TO LIFE",
      PL: "3. PRAWO DO ŻYCIA"
    },
    declFull: {
      RU: "Многонациональный народ Республики Каракалпакстан определяет и составляет Государство на своей суверенной территории. Народ, опираясь на Конституцию и законы непосредственно и однозначно через избранных депутатов осуществляет государственное управление. Правительство Республики Каракалпакстан уполномоченное властью осуществляет укрепление дружбы народов. Государство всем своим гражданам проживающим на территории Республики Каракалпакстан, не смотря на их политические взгляды, веру исповедания и другие отличия, обеспечивает всех равными правами и свободами.",
      KK: "Қарақалпақстан Республикасының көп миллетли халқы оның мəмлекетлик Суверенитетиниң ўəкили ҳəм дəреги болып табылады. Халық Республиканың Конституциясы ҳəм тийкарында тиккелей жəне халық депутатларының Кеңеслери арқалы мəмлекетлик ҳəкимиятты иске асырады. Қарақалпақстан Республикасы мəмлекетлик ҳəкимиятын толық бийлигин пайдалана отырып, халықлар дослығын беккемлейди.",
      EN: "The multinational people of the Republic of Karakalpakstan shall determine and constitute a State on their sovereign territory. The people, relying on the Constitution and laws, directly and unambiguously through the elected deputies, exercise State administration. The Government of the Republic of Karakalpakstan authorized by the government to strengthen the friendship of peoples. The State provides all its citizens residing in the territory of the Republic of Karakalpakstan with equal rights and freedoms, regardless of their political views, religious beliefs and other differences.",
      PL: "Wielonarodowy naród Republiki Karakalpakstanu określa i konstytuuje Państwo na swoim suwerennym terytorium. Naród, opierając się na Konstytucji i ustawach, bezpośrednio i jednoznacznie poprzez wybranych deputowanych sprawuje władzę państwową. Rząd Republiki Karakalpakstanu umacnia przyjaźń narodów. Państwo zapewnia wszystkim obywatelom równe prawa i wolności, niezależnie od poglądów politycznych, wyznania czy innych różnic."
    },
    full: {
      RU: "Право на жизнь есть неотъемлемое право каждого человека. Посягательство на нее является тягчайшим преступлением.",
      KK: "Жасаў ҳуқықы ҳәр бир шахстың ажыралмас ҳуқықы болып табылады. Оған қол қатыў ең аўыр жынаят есапланады.",
      EN: "The right to life is the inalienable right of every person. Any encroachment upon it constitutes the gravest crime.",
      PL: "Prawo do życia jest niezbywalnym prawem każdego człowieka. Zamach na życie jest najcięższym przestępstwem."
    },
    comp: {
      RU: "СООТВЕТСТВУЕТ. Принцип незыблемости права на жизнь соответствует нормам Декларации (ст. 3 и 5) о защите прав и свобод граждан.",
      KK: "МУЎАПЫҚ. Жасаў ҳуқықы бузылмас ҳуқық деген принцип Декларация 3 ҳәм 5-статьяларындағы пухаралардың ҳуқықлары ҳәм еркинликлерин қорғаў нормаларына муўапық.",
      EN: "MATCHES. The principle of the inviolability of the right to life corresponds to the norms of the Declaration (Arts. 3 and 5) on the protection of the rights and freedoms of citizens.",
      PL: "ZGODNE. Zasada nienaruszalności prawa do życia odpowiada normom Deklaracji (art. 3 i 5) o ochronie praw i wolności obywatelskich."
    }
  },
  {
    id: 23,
    title: "23-статья",
    cat: "green",
    declRefLabel: {
      RU: "5. ЛИЧНАЯ СВОБОДА",
      KK: "5. ЖЕКЕ БАС ЕРКИНЛИГИ",
      EN: "5. PERSONAL FREEDOM",
      PL: "5. WOLNOŚĆ OSOBISTA"
    },
    declFull: {
      RU: "Республика Каракалпакстан осуществляет защиту Конституционных Прав своих граждан, защиту их свобод, защиту их права на труд, защиту их собственности и определяет меры по осуществлению защиты, осуществляет организацию общественной жизни, осуществляет социально-культурное и экономическое развитие, осуществляет внешнеэкономическую деятельность, создание свободных экономических зон, осуществляет управление финансово-бюджетной системы, определяет основы оплаты труда и ценообразование, налоговое управление, защиту своей территории и управление природными ресурсами.",
      KK: "Қарақалпақстан Республикасы пухараларының Конституциялық ҳуқықларын, еркинликлерин ҳəм мийнетлерин, меншик қатнасықларын əмелге асырыў тəртибин, халық хожалығына ҳəм социаллық мəдений қурылысқа басшылық етиўди, сыртқы экономикалық жумысты шөлкемлестириўди, соның ишинде еркин кəрханашылық зоналарын, бюджетлик-финанс системасын мийнетке ҳақы төлеў ҳəм баҳа қойыў, салық салыў,қоршап турған орталықты қорғаў ҳəм тəбийий қорлардан пайдаланыў ислерин нызам менен ретлестириўди өз бетинше əмелге асырады.",
      EN: "The Republic of Karakalpakstan shall protect the Constitutional Rights of its citizens, the protection of their freedoms and protect their the right to work, protection of their property and defines the measures for the implementation of protection, organizes public life, carries out socio-cultural and economic development, provides externally economic activity, the creation of free economic zones, manages financial budget the system determines the basis of wage and pricing, tax administration, protection of its territory and management of natural resources.",
      PL: "Republika Karakalpakstanu chroni konstytucyjne prawa swoich obywateli, ich wolności, prawo do pracy, własności, organizuje życie społeczne, prowadzi rozwój społeczno-kulturalny i gospodarczy, działalność zagraniczną, tworzy wolne strefy ekonomiczne, zarządza systemem finansowo-budżetowym, określa podstawy wynagrodzeń i cen, prowadzi administrację podatkową, chroni swoje terytorium i zarządza zasobami naturalnymi."
    },
    full: {
      RU: "Каждый имеет право на свободу и личную неприкосновенность. Никто не может быть подвергнут аресту или содержанию под стражей иначе как на основании закона.",
      KK: "Ҳәр бир шахс еркинлик ҳәм жеке қол қатылмаслық ҳуқықына ийе. Нызамға тийкарланбай турып ҳеш ким қамаққа алынбайды ямаса қамақта сақланбайды.",
      EN: "Everyone has the right to freedom and personal inviolability. No one may be subjected to arrest or detention except on the basis of law.",
      PL: "Każdy ma prawo do wolności i nietykalności osobistej. Nikt nie może być aresztowany ani przetrzymywany inaczej niż na podstawie ustawy."
    },
    comp: {
      RU: "СООТВЕТСТВУЕТ. Принцип личной свободы и неприкосновенности соответствует норме Декларации (ст. 5) о защите свобод граждан.",
      KK: "МУЎАПЫҚ. Жеке бас еркинлиги ҳәм қол қатылмаслығы принципи Декларация 5-статьясындағы пуқаралар еркинликлерин қорғаў нормасына муўапық.",
      EN: "MATCHES. The principle of personal freedom and inviolability corresponds to the Declaration's norm (Art. 5) on the protection of citizens' freedoms.",
      PL: "ZGODNE. Zasada wolności osobistej i nietykalności odpowiada normie Deklaracji (art. 5) o ochronie wolności obywatelskich."
    }
  },
  {
    id: 24,
    title: "24-статья",
    cat: "green",
    declRefLabel: {
      RU: "5. ПРАВОВАЯ ЗАЩИТА",
      KK: "5. ҲУҚУҚЫЙ ҚОРҒАЎ",
      EN: "5. LEGAL PROTECTION",
      PL: "5. OCHRONA PRAWNA"
    },
    declFull: {
      RU: "Республика Каракалпакстан осуществляет защиту Конституционных Прав своих граждан, защиту их свобод, защиту их права на труд, защиту их собственности и определяет меры по осуществлению защиты, осуществляет организацию общественной жизни, осуществляет социально-культурное и экономическое развитие, осуществляет внешнеэкономическую деятельность, создание свободных экономических зон, осуществляет управление финансово-бюджетной системы, определяет основы оплаты труда и ценообразование, налоговое управление, защиту своей территории и управление природными ресурсами.",
      KK: "Қарақалпақстан Республикасы пухараларының Конституциялық ҳуқықларын, еркинликлерин ҳəм мийнетлерин, меншик қатнасықларын əмелге асырыў тəртибин, халық хожалығына ҳəм социаллық мəдений қурылысқа басшылық етиўди, сыртқы экономикалық жумысты шөлкемлестириўди, соның ишинде еркин кəрханашылық зоналарын, бюджетлик-финанс системасын мийнетке ҳақы төлеў ҳəм баҳа қойыў, салық салыў,қоршап турған орталықты қорғаў ҳəм тəбийий қорлардан пайдаланыў ислерин нызам менен ретлестириўди өз бетинше əмелге асырады.",
      EN: "The Republic of Karakalpakstan shall protect the Constitutional Rights of its citizens, the protection of their freedoms and protect their the right to work, protection of their property and defines the measures for the implementation of protection, organizes public life, carries out socio-cultural and economic development, provides externally economic activity, the creation of free economic zones, manages financial budget the system determines the basis of wage and pricing, tax administration, protection of its territory and management of natural resources.",
      PL: "Republika Karakalpakstanu chroni konstytucyjne prawa swoich obywateli, ich wolności, prawo do pracy, własności, organizuje życie społeczne, prowadzi rozwój społeczno-kulturalny i gospodarczy, działalność zagraniczną, tworzy wolne strefy ekonomiczne, zarządza systemem finansowo-budżetowym, określa podstawy wynagrodzeń i cen, prowadzi administrację podatkową, chroni swoje terytorium i zarządza zasobami naturalnymi."
    },
    full: {
      RU: "Каждый, обвиняемый в совершении преступления, считается невиновным, пока его виновность не будет установлена законным порядком, путем гласного судебного разбирательства, при котором ему обеспечиваются все возможности для защиты. Никто не может быть подвергнут пыткам, насилию, другому жестокому или унижающему достоинство человека обращению. Никто не может подвергаться медицинским или научным опытам без его согласия.",
      KK: "Жынаят ислегенликте айыпланып атырған ҳәр бир шахстыӊ айыбы судта жәриялылық жолы менен қаралмағанша ҳәм нызамлы тәртипте анықланбағанша айыпсыз есапланады. Судта айыпланып атырған шахсқа өзин қорғаўы ушын барлық мүмкиншиликлер тәмийинленеди. Ҳеш ким қыйнаўларға, күш жумсаўға, басқа да аяўсыз ҳәрекетке ямаса инсанның ар-намысына тийетуғын қатнасықларға дуўшар етилиўи мүмкин емес. Өзиниң келисимиз ҳеш ким медициналық ямаса илимий тәжирийбелерге тартылмайды.",
      EN: "Anyone accused of committing a crime is presumed innocent until their guilt is established in accordance with the law through a public court hearing, during which all opportunities for defense are ensured. No one may be subjected to torture, violence, or any other cruel or degrading treatment. No one may be subjected to medical or scientific experimentation without their consent.",
      PL: "Każdy oskarżony o popełnienie przestępstwa uważa się za niewinnego, dopóki jego wina nie zostanie udowodniona w trybie przewidzianym prawem, w jawnym postępowaniu sądowym, w którym zapewnia mu się wszelkie możliwości obrony. Nikt nie może być poddawany torturom, przemocy ani innemu okrutnemu lub poniżającemu traktowaniu. Nikt nie może być poddawany eksperymentom medycznym lub naukowym bez swojej zgody."
    },
    comp: {
      RU: "СООТВЕТСТВУЕТ. Презумпция невиновности и запрет на пытки соответствуют принципу правовой защиты граждан, заложенному в Декларации (ст. 5).",
      KK: "МУЎАПЫҚ. Айыпсызлық презумпциясы ҳәм азап бериўге тыйым Декларация 5-статьясындағы пухаралардың ҳуқықларын қорғаў принципине муўапық.",
      EN: "MATCHES. The presumption of innocence and the prohibition of torture correspond to the principle of legal protection of citizens laid down in the Declaration (Art. 5).",
      PL: "ZGODNE. Domniemanie niewinności oraz zakaz tortur odpowiadają zasadzie ochrony prawnej obywateli zawartej w Deklaracji (art. 5)."
    }
  },
  {
    id: 25,
    title: "25-статья",
    cat: "green",
    declRefLabel: {
      RU: "5. НЕПРИКОСНОВЕННОСТЬ",
      KK: "5. ҚОЛ ҚАТЫЛМАСЛЫҚ",
      EN: "5. INVIOLABILITY",
      PL: "5. NIETYKALNOŚĆ"
    },
    declFull: {
      RU: "Республика Каракалпакстан осуществляет защиту Конституционных Прав своих граждан, защиту их свобод, защиту их права на труд, защиту их собственности и определяет меры по осуществлению защиты, осуществляет организацию общественной жизни, осуществляет социально-культурное и экономическое развитие, осуществляет внешнеэкономическую деятельность, создание свободных экономических зон, осуществляет управление финансово-бюджетной системы, определяет основы оплаты труда и ценообразование, налоговое управление, защиту своей территории и управление природными ресурсами.",
      KK: "Қарақалпақстан Республикасы пухараларының Конституциялық ҳуқықларын, еркинликлерин ҳəм мийнетлерин, меншик қатнасықларын əмелге асырыў тəртибин, халық хожалығына ҳəм социаллық мəдений қурылысқа басшылық етиўди, сыртқы экономикалық жумысты шөлкемлестириўди, соның ишинде еркин кəрханашылық зоналарын, бюджетлик-финанс системасын мийнетке ҳақы төлеў ҳəм баҳа қойыў, салық салыў,қоршап турған орталықты қорғаў ҳəм тəбийий қорлардан пайдаланыў ислерин нызам менен ретлестириўди өз бетинше əмелге асырады.",
      EN: "The Republic of Karakalpakstan shall protect the Constitutional Rights of its citizens, the protection of their freedoms and protect their the right to work, protection of their property and defines the measures for the implementation of protection, organizes public life, carries out socio-cultural and economic development, provides externally economic activity, the creation of free economic zones, manages financial budget the system determines the basis of wage and pricing, tax administration, protection of its territory and management of natural resources.",
      PL: "Republika Karakalpakstanu chroni konstytucyjne prawa swoich obywateli, ich wolności, prawo do pracy, własności, organizuje życie społeczne, prowadzi rozwój społeczno-kulturalny i gospodarczy, działalność zagraniczną, tworzy wolne strefy ekonomiczne, zarządza systemem finansowo-budżetowym, określa podstawy wynagrodzeń i cen, prowadzi administrację podatkową, chroni swoje terytorium i zarządza zasobami naturalnymi."
    },
    full: {
      RU: "Каждый имеет право на защиту от посягательства на его честь и достоинство, вмешательства в его частную жизнь, на неприкосновенность его жилища. Никто не вправе войти в жилище, производить обыск или осмотр, нарушать тайну переписки и телефонных разговоров иначе как в случае и порядке, предусмотренных законом.",
      KK: "Ҳәр ким өзиниң ар-намысына ҳәм қәдир-қымбатына қол қатыўдан, өзиниң жеке турмысына араласыўдан қорғаныўға ҳақылы, өзиниң турақ жайына қол қатылмаслық ҳуқықына ийе. Нызам менен нәзерде тутылған жағдайдан ҳәм тәртиптен басқа пайытларда ҳеш ким турақ жайға кириўге, онда тинтиў жүргизиўге ямаса көзден өткериўге, хат жазысыў ҳәм телефон арқалы сөйлесиў сырын бузыўға ҳақылы емес.",
      EN: "Everyone has the right to protection from encroachment upon their honor and dignity, interference in their private life, and the inviolability of their home. No one has the right to enter a home, conduct a search or inspection, or violate the secrecy of correspondence and telephone conversations except in cases and in the manner prescribed by law.",
      PL: "Każdy ma prawo do ochrony przed zamachem na jego honor i godność, przed ingerencją w życie prywatne oraz do nietykalności mieszkania. Nikt nie ma prawa wejść do mieszkania, dokonać przeszukania lub oględzin, naruszyć tajemnicy korespondencji i rozmów telefonicznych inaczej niż w przypadkach i trybie przewidzianych ustawą."
    },
    comp: {
      RU: "СООТВЕТСТВУЕТ. Защита чести, достоинства и частной жизни соответствует норме Декларации (ст. 5) о защите прав граждан.",
      KK: "МУЎАПЫҚ. Намыс, абырой ҳәм жеке өмирге қол қатылмаслығы Декларация 5-статьясындағы пухаралар ҳуқықларын қорғаў нормасына муўапық.",
      EN: "MATCHES. Protection of honor, dignity, and private life corresponds to the Declaration's norm (Art. 5) on the protection of citizens' rights.",
      PL: "ZGODNE. Ochrona czci, godności i życia prywatnego odpowiada normie Deklaracji (art. 5) o ochronie praw obywatelskich."
    }
  },
  {
    id: 26,
    title: "26-статья",
    cat: "amber",
    declRefLabel: {
      RU: "5. СВОБОДА ПЕРЕДВИЖЕНИЯ",
      KK: "5. ҲӘРЕКЕТ ЕТИЎ ЕРКИНЛИГИ",
      EN: "5. FREEDOM OF MOVEMENT",
      PL: "5. WOLNOŚĆ PORUSZANIA SIĘ"
    },
    declFull: {
      RU: "Республика Каракалпакстан осуществляет защиту Конституционных Прав своих граждан, защиту их свобод, защиту их права на труд, защиту их собственности и определяет меры по осуществлению защиты, осуществляет организацию общественной жизни, осуществляет социально-культурное и экономическое развитие, осуществляет внешнеэкономическую деятельность, создание свободных экономических зон, осуществляет управление финансово-бюджетной системы, определяет основы оплаты труда и ценообразование, налоговое управление, защиту своей территории и управление природными ресурсами.",
      KK: "Қарақалпақстан Республикасы пухараларының Конституциялық ҳуқықларын, еркинликлерин ҳəм мийнетлерин, меншик қатнасықларын əмелге асырыў тəртибин, халық хожалығына ҳəм социаллық мəдений қурылысқа басшылық етиўди, сыртқы экономикалық жумысты шөлкемлестириўди, соның ишинде еркин кəрханашылық зоналарын, бюджетлик-финанс системасын мийнетке ҳақы төлеў ҳəм баҳа қойыў, салық салыў,қоршап турған орталықты қорғаў ҳəм тəбийий қорлардан пайдаланыў ислерин нызам менен ретлестириўди өз бетинше əмелге асырады.",
      EN: "The Republic of Karakalpakstan shall protect the Constitutional Rights of its citizens, the protection of their freedoms and protect their the right to work, protection of their property and defines the measures for the implementation of protection, organizes public life, carries out socio-cultural and economic development, provides externally economic activity, the creation of free economic zones, manages financial budget the system determines the basis of wage and pricing, tax administration, protection of its territory and management of natural resources.",
      PL: "Republika Karakalpakstanu chroni konstytucyjne prawa swoich obywateli, ich wolności, prawo do pracy, własności, organizuje życie społeczne, prowadzi rozwój społeczno-kulturalny i gospodarczy, działalność zagraniczną, tworzy wolne strefy ekonomiczne, zarządza systemem finansowo-budżetowym, określa podstawy wynagrodzeń i cen, prowadzi administrację podatkową, chroni swoje terytorium i zarządza zasobami naturalnymi."
    },
    full: {
      RU: "Гражданин Республики Каракалпакстан, являясь гражданином Республики Узбекистан, имеет право на свободное передвижение по территории Республики Узбекистан, въезд в Республику Узбекистан и выезд из нее, за исключением ограничений, установленных законом.",
      KK: "Қарақалпақстан Республикасының пуқарасы Өзбекстан Республикасының пуқарасы болыў менен нызамда белгиленген шеклеўлерден тысқары жағдайларда Өзбекстан Республикасы аймағында еркин жүриўге, Өзбекстан Республикасына кириўге ҳәм оннан шығып кетиўге ҳақылы.",
      EN: "A citizen of the Republic of Karakalpakstan, being a citizen of the Republic of Uzbekistan, has the right to freely move throughout the territory of the Republic of Uzbekistan, to enter and leave the Republic of Uzbekistan, except for restrictions established by law.",
      PL: "Obywatel Republiki Karakalpakstanu, będąc obywatelem Republiki Uzbekistanu, ma prawo do swobodnego poruszania się po terytorium Republiki Uzbekistanu, wjazdu do niej i wyjazdu z niej, z wyjątkiem ograniczeń ustanowionych ustawą."
    },
    comp: {
      RU: "УСЛОВНО. В Декларации (ст. 5) закреплено право на свободное передвижение. В Конституции это право ограничено территорией Узбекистана, что делает перемещение граждан КР зависимым от рамок другого государства.",
      KK: "ШӘРТЛИ ҚАЙШЫ. Декларацияның 5-статьясында пухаралардың еркин ҳәрекетлениў ҳуқықы жәрияланған. Конституцияда бул ҳуқық «Өзбекстан Республикасы аймағы бойлап» деп шекленип, Қарақалпақстан Республикасы пухарасының ҳәрекети Өзбекстан шеңбери менен байланыслы болып қалған.",
      EN: "CONDITIONAL. The Declaration (Art. 5) enshrines the right to free movement. In the Constitution, this right is limited to the territory of Uzbekistan, making the movement of RK citizens dependent on the framework of another state.",
      PL: "WARUNKOWE. Deklaracja (art. 5) sankcjonuje prawo do swobodnego poruszania się. W Konstytucji prawo to jest ograniczone do terytorium Uzbekistanu, co uzależnia przemieszczanie się obywateli RK od ram innego państwa."
    }
  },
  { 
    id: 27, title: "27-статья", 
    cat: "green",
    declRefLabel: { 
        RU: "3. ПРАВА И СВОБОДЫ", 
        KK: "3. ҲУҚЫҚ ҲӘМ ЕРКИНЛИКЛЕР", 
        EN: "3. RIGHTS AND FREEDOMS", 
        PL: "3. PRAWA I WOLNOŚCI" 
    },
    declFull: { 
      RU: "Многонациональный народ Республики Каракалпакстан определяет и составляет Государство на своей суверенной территории. Народ, опираясь на Конституцию и законы непосредственно и однозначно через избранных депутатов осуществляет государственное управление. Правительство Республики Каракалпакстан уполномоченное властью осуществляет укрепление дружбы народов. Государство всем своим гражданам проживающим на территории Республики Каракалпакстан, не смотря на их политические взгляды, веру исповедания и другие отличия, обеспечивает всех равными правами и свободами.",
      KK: "Қарақалпақстан Республикасының көп миллетли халқы оның мəмлекетлик Суверенитетиниң ўəкили ҳəм дəреги болып табылады. Халық Республиканың Конституциясы ҳəм тийкарында тиккелей жəне халық депутатларының Кеңеслери арқалы мəмлекетлик ҳəкимиятты иске асырады. Қарақалпақстан Республикасы мəмлекетлик ҳəкимиятын толық бийлигин пайдалана отырып, халықлар дослығын беккемлейди.",
      EN: "The multinational people of the Republic of Karakalpakstan shall determine and constitute a State on their sovereign territory. The people, relying on the Constitution and laws, directly and unambiguously through the elected deputies, exercise State administration. The Government of the Republic of Karakalpakstan authorized by the government to strengthen the friendship of peoples. The State provides all its citizens residing in the territory of the Republic of Karakalpakstan with equal rights and freedoms, regardless of their political views, religious beliefs and other differences.",
      PL: "Wielonarodowy naród Republiki Karakalpakstanu określa i konstytuuje Państwo na swoim suwerennym terytorium. Naród, opierając się na Konstytucji i ustawach, bezpośrednio i jednoznacznie poprzez wybranych deputowanych sprawuje władzę państwową. Rząd Republiki Karakalpakstanu umacnia przyjaźń narodów. Państwo zapewnia wszystkim obywatelom równe prawa i wolności, niezależnie od poglądów politycznych, wyznania czy innych różnic."
    },
    full: { 
        RU: "Каждый человек имеет право на свободу мысли, слова и убеждений. Каждый человек имеет право искать, получать и распространять любую информацию, кроме информации, направленной против существующего конституционного строя, а также иных ограничений, предусмотренных законом. Свобода мнений и их выражения может быть ограничена законом в отношении государственной или иной охраняемой тайны.", 
        KK: "Ҳәр бир адам ой-пикир, сөз ҳәм исеним еркинлигине ийе. Ҳәр бир адам ҳәзирги конституциялық дүзимге қарсы бағдарланған ҳәм нызам менен нәзерде тутылған басқа да шеклеўлерден тысқары ҳәр қандай мәлимлемени излестириўге, алыўға ҳәм таратыўға ҳақылы. Пикирлер ҳәм оларды билдириў еркинлиги мәмлекетлик ямаса басқа да қупыялар бойынша нызам менен шеклениўи мүмкин.", 
        EN: "Everyone shall have the right to freedom of thought, speech, and conviction. Everyone shall have the right to seek, receive, and disseminate any information, except for information directed against the existing constitutional order and other restrictions provided by law. Freedom of opinion and expression may be restricted by law concerning state or other secrets.", 
        PL: "Każdy człowiek ma prawo do wolności myśli, słowa i przekonań. Każdy ma prawo poszukiwać, otrzymywać i rozpowszechniać wszelkie informacje, z wyjątkiem informacji skierowanych przeciwko istniejącemu porządkowi konstytucyjnemu oraz innych ograniczeń przewidzianych ustawą. Wolność poglądów i ich wyrażania może być ograniczona ustawą w zakresie tajemnicy państwowej lub innej prawnie chronionej tajemnicy." 
    },
    comp: { 
        RU: "СООТВЕТСТВУЕТ. Свобода мысли, слова и убеждений напрямую соответствует положению статьи 3 Декларации о «твердом равенстве прав независимо от политических взглядов и религиозных убеждений.»", 
        KK: "МУЎАПЫҚ. Пикирлеў, сөз ҳәм исеним еркинлиги Декларацияның 3-статьясындағы «сиясий көзқараслары ҳәм диний исенимлеринен қатаң бийғарез тең ҳуқықлар» нормасына тиккелей муўапық келеди.", 
        EN: "COMPLIANT. Freedom of thought, speech, and belief is directly consistent with the provision of Article 3 of the Declaration on “strict equality of rights, regardless of political views and religious beliefs”.", 
        PL: "ZGODNE. Wolność myśli, słowa i przekonań jest bezpośrednio zgodna z postanowieniem artykułu 3 deklaracji o „ścisłej równości praw niezależnie od poglądów politycznych i przekonań religijnych”." 
    }
  },
  {
    id: 28,
    title: "28-статья",
    cat: "green",
    declRefLabel: {
      RU: "2. ДЕМОКРАТИЯ",
      KK: "2. ДЕМОКРАТИЯ",
      EN: "2. DEMOCRACY",
      PL: "2. DEMOKRACJA"
    },
    declFull: {
      RU: "Республика Каракалпакстан проводит государственное управление, принятие законов и указов и назначает судебные органы, осуществляющие надзор над исполнением принятого законодательства. Совет Министров Республики Каракалпакстан является высшим исполнительным и управляющим органом, осуществляющий принятие необходимых законов, управление и надзор над исполнением принятых законов. Совет Министров Республики Каракалпакстан является верховным исполнительным органом и органом управления. Верховный Суд Республики Каракалпакстан является Высшим Судом. Верховный Совет Республики Каракалпакстан назначает Генерального Прокурора осуществляющего надзор над исполнением закона, правопорядок и равного права всех перед законом.",
      KK: "Қарақалпақстан Республикасында мəмлекетлик ҳəкимият ҳəм нызам шығарыў, атқарыўшы ҳəм суд уйымларына бөлистириў принципине муўапық əмелге асырылады. -Қарақалпақстан Республикасының Жоқарғы Кеңеси Қарақалпақстан Республикасы мəмлекетлик ҳəкимиятының жоқары уйымы болып табылады, ол өз жумысында нызам шығарыў, бийлик етиў ҳəм қадағалаў ўазыйпаларын əмелге асырады. -Қарақалпақстан Республикасының Министрлер Кеңеси Қарақалпақстан Республикасының Мəмлекетлик ҳəкимиятының жоқарғы атқарыўшы ҳəм бийлик етиўши уйымы болып табылады. -Қарақалпақстан Республикасының Жоқарғы Суды Қарақалпақстан Республикасының Жоқарғы Суд уйымы болып табылады. -Қарақалпақстан Республикасы Жоқарғы Совети тайынлайтуғын Қарақалпақстан Республикасының прокуроры нызамлардың саррас ҳəм бир қыйлы орынланыўын жоқары дəрежеде бақлап отырады.",
      EN: "The Republic of Karakalpakstan conducts public administration, enacts laws and decrees, and appoints judicial bodies that oversee the implementation of the adopted legislation. The Supreme Council of the Republic of Karakalpakstan is the supreme body of state administration, which makes the necessary laws, manages and supervises the implementation of the adopted laws. The Council of Ministers of the Republic of Karakalpakstan is the supreme executive body and governing body. The Supreme Court of the Republic of Karakalpakstan is the Highest Court. The Supreme Council of the Republic of Karakalpakstan appoints the Prosecutor General to oversee the implementation of the law, the rule of law and the equal rights of all before the law.",
      PL: "Republika Karakalpakstanu prowadzi administrację państwową, uchwala ustawy i dekrety oraz powołuje organy sądowe sprawujące nadzór nad wykonaniem przyjętego ustawodawstwa. Najwyższa Rada Republiki Karakalpakstanu jest najwyższym organem administracji państwowej. Rada Ministrów Republiki Karakalpakstanu jest najwyższym organem wykonawczym i zarządzającym. Najwyższy Sąd Republiki Karakalpakstanu jest najwyższym organem sądowym. Najwyższa Rada powołuje Prokuratora Generalnego sprawującego nadzór nad przestrzeganiem prawa i równością obywateli wobec prawa."
    },
    full: {
      RU: "Все государственные органы, общественные объединения и должностные лица Республики Каракалпакстан обязаны обеспечивать гражданам возможность ознакомления с документами, решениями и иными материалами, затрагивающими их права и интересы.",
      KK: "Қарақалпақстан Республикасының барлық мәмлекетлик уйымлары, жәмийетлик бирлеспелери ҳәм лаўазымлы шахслары пуқараларға олардың ҳуқықларына және мәплерине тийисли болған ҳүжжетлер, шешимлер ҳәм басқа да материаллар менен танысыў мүмкиншилигин тәмийинлеўге миннетли.",
      EN: "All state bodies, public associations, and officials of the Republic of Karakalpakstan are obliged to ensure that citizens have the opportunity to familiarize themselves with documents, decisions, and other materials affecting their rights and interests.",
      PL: "Wszystkie organy państwowe, organizacje społeczne i funkcjonariusze publiczni Republiki Karakalpakstanu są zobowiązani zapewnić obywatelom możliwość zapoznania się z dokumentami, decyzjami i innymi materiałami dotyczącymi ich praw i interesów."
    },
    comp: {
      RU: "СООТВЕТСТВУЕТ. Обязанность госорганов знакомить граждан с документами соответствует принципу участия народа в управлении через депутатов (ст. 2 Декларации).",
      KK: "МУЎАПЫҚ. Мәмлекетлик уйымлардың пухараларды ҳүжжетлер менен таныстырыў ўазыйпасы Декларацияның 2-статьясындағы халықтың мәмлекетлик басқарыўын депутатлар арқалы әмелге асырыў принципине муўапық.",
      EN: "MATCHES. The obligation of state bodies to familiarize citizens with documents corresponds to the principle of popular participation in management through deputies (Art. 2 of the Declaration).",
      PL: "ZGODNE. Obowiązek organów państwowych do zapoznawania obywateli z dokumentami odpowiada zasadzie udziału ludu w zarządzaniu poprzez deputowanych (art. 2 Deklaracji)."
    }
  },
  {
    id: 29,
    title: "29-статья",
    cat: "green",
    declRefLabel: {
      RU: "3. СВОБОДА СОВЕСТИ",
      KK: "3. ҲҮЖДАН ЕРКИНЛИГИ",
      EN: "3. FREEDOM OF CONSCIENCE",
      PL: "3. WOLNOŚĆ SUMIENIA"
    },
    declFull: {
      RU: "Многонациональный народ Республики Каракалпакстан определяет и составляет Государство на своей суверенной территории. Народ, опираясь на Конституцию и законы непосредственно и однозначно через избранных депутатов осуществляет государственное управление. Правительство Республики Каракалпакстан уполномоченное властью осуществляет укрепление дружбы народов. Государство всем своим гражданам проживающим на территории Республики Каракалпакстан, не смотря на их политические взгляды, веру исповедания и другие отличия, обеспечивает всех равными правами и свободами.",
      KK: "Қарақалпақстан Республикасының көп миллетли халқы оның мəмлекетлик Суверенитетиниң ўəкили ҳəм дəреги болып табылады. Халық Республиканың Конституциясы ҳəм тийкарында тиккелей жəне халық депутатларының Кеңеслери арқалы мəмлекетлик ҳəкимиятты иске асырады. Қарақалпақстан Республикасы мəмлекетлик ҳəкимиятын толық бийлигин пайдалана отырып, халықлар дослығын беккемлейди.",
      EN: "The multinational people of the Republic of Karakalpakstan shall determine and constitute a State on their sovereign territory. The people, relying on the Constitution and laws, directly and unambiguously through the elected deputies, exercise State administration. The Government of the Republic of Karakalpakstan authorized by the government to strengthen the friendship of peoples. The State provides all its citizens residing in the territory of the Republic of Karakalpakstan with equal rights and freedoms, regardless of their political views, religious beliefs and other differences.",
      PL: "Wielonarodowy naród Republiki Karakalpakstanu określa i konstytuuje Państwo na swoim suwerennym terytorium. Naród, opierając się na Konstytucji i ustawach, bezpośrednio i jednoznacznie poprzez wybranych deputowanych sprawuje władzę państwową. Rząd Republiki Karakalpakstanu umacnia przyjaźń narodów. Państwo zapewnia wszystkim obywatelom równe prawa i wolności, niezależnie od poglądów politycznych, wyznania czy innych różnic."
    },
    full: {
      RU: "Свобода совести гарантируется для всех. Каждый имеет право исповедовать любую религию или не исповедовать никакой. Недопустимо принудительное насаждение религиозных взглядов.",
      KK: "Ҳәмме ушын ҳүждан еркинлигине кепиллик бериледи, ҳәр ким ҳәр қандай динге исениўге ямаса ҳеш қайсысына исенбеўге ҳақылы. Диний көзқарасларды мәжбүрий түрде сиңдириўге жол қойылмайды.",
      EN: "Freedom of conscience is guaranteed for all. Everyone has the right to profess any religion or not to profess any religion. The forced imposition of religious views is inadmissible.",
      PL: "Wolność sumienia jest gwarantowana wszystkim. Każdy ma prawo wyznawać dowolną religię lub nie wyznawać żadnej. Niedopuszczalne jest przymusowe narzucanie poglądów religijnych."
    },
    comp: {
      RU: "СООТВЕТСТВУЕТ. Свобода совести и право на вероисповедание прямо соответствуют норме Декларации (ст. 3) о равенстве прав независимо от религии.",
      KK: "МУЎАПЫҚ. Ар-намыс еркинлиги, динди еркин тутыў ҳуқықы Декларация 3-статьясындағы «диний исенимлеринен қатаң бийғарез тең ҳуқықлар» нормасына тиккелей муўапық.",
      EN: "MATCHES. Freedom of conscience and the right to religious worship directly correspond to the Declaration's norm (Art. 3) on equality of rights regardless of religion.",
      PL: "ZGODNE. Wolność sumienia i prawo do wyznania są bezpośrednio zgodne z normą Deklaracji (art. 3) o równości praw bez względu na religię."
    }
  },
  {
    id: 30,
    title: "30-статья",
    cat: "amber",
    declRefLabel: {
      RU: "3. УЧАСТИЕ В УПРАВЛЕНИИ",
      KK: "3. БАСҚАРЫЎҒА ҚАТНАСЫЎ",
      EN: "3. PARTICIPATION IN MANAGEMENT",
      PL: "3. UDZIAŁ W ZARZĄDZANIU"
    },
    declFull: {
      RU: "Многонациональный народ Республики Каракалпакстан определяет и составляет Государство на своей суверенной территории. Народ, опираясь на Конституцию и законы непосредственно и однозначно через избранных депутатов осуществляет государственное управление. Правительство Республики Каракалпакстан уполномоченное властью осуществляет укрепление дружбы народов. Государство всем своим гражданам проживающим на территории Республики Каракалпакстан, не смотря на их политические взгляды, веру исповедания и другие отличия, обеспечивает всех равными правами и свободами.",
      KK: "Қарақалпақстан Республикасының көп миллетли халқы оның мəмлекетлик Суверенитетиниң ўəкили ҳəм дəреги болып табылады. Халық Республиканың Конституциясы ҳəм тийкарында тиккелей жəне халық депутатларының Кеңеслери арқалы мəмлекетлик ҳəкимиятты иске асырады. Қарақалпақстан Республикасы мəмлекетлик ҳəкимиятын толық бийлигин пайдалана отырып, халықлар дослығын беккемлейди.",
      EN: "The multinational people of the Republic of Karakalpakstan shall determine and constitute a State on their sovereign territory. The people, relying on the Constitution and laws, directly and unambiguously through the elected deputies, exercise State administration. The Government of the Republic of Karakalpakstan authorized by the government to strengthen the friendship of peoples. The State provides all its citizens residing in the territory of the Republic of Karakalpakstan with equal rights and freedoms, regardless of their political views, religious beliefs and other differences.",
      PL: "Wielonarodowy naród Republiki Karakalpakstanu określa i konstytuuje Państwo na swoim suwerennym terytorium. Naród, opierając się na Konstytucji i ustawach, bezpośrednio i jednoznacznie poprzez wybranych deputowanych sprawuje władzę państwową. Rząd Republiki Karakalpakstanu umacnia przyjaźń narodów. Państwo zapewnia wszystkim obywatelom równe prawa i wolności, niezależnie od poglądów politycznych, wyznania czy innych różnic."
    },
    full: {
      RU: "Граждане Республики Каракалпакстан имеют право участвовать в управлении делами общества и государства как непосредственно, так и через своих представителей. Такое участие осуществляется посредством самоуправления, проведения референдумов и демократического формирования государственных органов, а также развития и совершенствования общественного контроля над деятельностью государственных органов. Порядок осуществления общественного контроля над деятельностью государственных органов определяется законом.",
      KK: "Қарақалпақстан Республикасының пуқаралары жәмийеттиң ҳәм мәмлекеттиң ислерин басқарыўға тиккелей, сондай-ақ, өзлериниң ўәкиллери арқалы қатнасыў ҳуқықына ийе. Бундай қатнасыў өзин-өзи басқарыў, референдумлар өткериў ҳәм мәмлекетлик уйымларды демократиялық түрде қәлиплестириў, сондай-ақ, мәмлекетлик уйымлардың жумысы үстинен жәмийетлик қадағалаўды раўажландырыў ҳәм жетилистириў арқалы әмелге асырылады. Мәмлекетлик уйымлардың жумысы үстинен жәмийетлик қадағалаўды әмелге асырыў тәртиби нызам менен белгиленеди.",
      EN: "Citizens of the Republic of Karakalpakstan have the right to participate in the management of the affairs of society and the state both directly and through their representatives. Such participation is exercised through self‑government, the holding of referendums, the democratic formation of state bodies, as well as through the development and improvement of public oversight over the activities of state bodies. The procedure for exercising public oversight over the activities of state bodies is determined by law.",
      PL: "Obywatele Republiki Karakałpacji mają prawo do uczestniczenia w zarządzaniu sprawami społeczeństwa i państwa, zarówno bezpośrednio, jak i za pośrednictwem swoich przedstawicieli. Udział ten realizowany jest poprzez samorządność, przeprowadzanie referendów i demokratyczne formowanie organów państwowych, a także rozwój i doskonalenie kontroli społecznej nad działalnością organów państwowych. Tryb sprawowania kontroli społecznej nad działalnością organów państwowych określa ustawa."
    },
    comp: {
      RU: "УСЛОВНО. Право участия в управлении близко к ст. 3 Декларации. Однако в Конституции это участие ограничено органами, действующими в узбекских конституционных рамках, что не позволяет полностью реализовать суверенное народное управление.",
      KK: "ШӘРТЛИ ҚАЙШЫ. Пухаралардың мәмлекет ислерин басқарыўда қатнасыў ҳуқықы Декларацияның 3-статьясына жақын. Бирақ Конституцияда бул қатнасыў Өзбекстан конституциялық шеңберинде жумыс алып баратуғын шөлкемлер арқалы ғана мүмкин - суверен халық басқарыўы толық тән алынбайды.",
      EN: "CONDITIONAL. The right to participate in management is close to Art. 3 of the Declaration. However, in the Constitution, this participation is limited to bodies operating within the Uzbek constitutional framework, which does not allow for full realization of sovereign popular management.",
      PL: "WARUNKOWE. Prawo do udziału w zarządzaniu jest zbliżone do art. 3 Deklaracji. Jednak w Konstytucji udział ten jest ograniczony do organów działających w uzbeckich ramach konstytucyjnych, co nie pozwala na pełną realizację suwerennego zarządzania ludowego."
    }
  },
  { 
    id: 31, title: "31-статья", cat: "green",
    declRefLabel: { RU: "3. ПРАВО ГОЛОСА", KK: "3. ДАЎЫС БЕРЕЎ ҲУҚЫҚЫ", EN: "3. RIGHT TO VOTE", PL: "3. PRAWO GŁOSU" },
    declFull: { 
        RU: "Многонациональный народ Республики Каракалпакстан определяет и составляет Государство на своей суверенной территории. Народ, опираясь на Конституцию и законы непосредственно и однозначно через избранных депутатов осуществляет государственное управление. Правительство Республики Каракалпакстан уполномоченное властью осуществляет укрепление дружбы народов. Государство всем своим гражданам проживающим на территории Республики Каракалпакстан, не смотря на их политические взгляды, веру исповедания и другие отличия, обеспечивает всех равными правами и свободами.", 
        KK: "Қарақалпақстан Республикасының көп миллетли халқы оның мəмлекетлик Суверенитетиниң ўəкили ҳəм дəреги болып табылады. Халық Республиканың Конституциясы ҳəм тийкарында тиккелей жəне халық депутатларының Кеңеслери арқалы мəмлекетлик ҳəкимиятты иске асырады. Қарақалпақстан Республикасы мəмлекетлик ҳəкимиятын толық бийлигин пайдалана отырып, халықлар дослығын беккемлейди.", 
        EN: "The multinational people of the Republic of Karakalpakstan shall determine and constitute a State on their sovereign territory. The people, relying on the Constitution and laws, directly and unambiguously through the elected deputies, exercise State administration. The Government of the Republic of Karakalpakstan authorized by the government to strengthen the friendship of peoples. The State provides all its citizens residing in the territory of the Republic of Karakalpakstan with equal rights and freedoms, regardless of their political views, religious beliefs and other differences.", 
        PL: "Wielonarodowy naród Republiki Karakalpakstanu określa i konstytuuje Państwo na swoim suwerennym terytorium. Naród, opierając się na Konstytucji i ustawach, bezpośrednio i jednoznacznie poprzez wybranych deputowanych sprawuje władzę państwową. Rząd Republiki Karakalpakstanu umacnia przyjaźń narodów. Państwo zapewnia wszystkim obywatelom równe prawa i wolności, niezależnie od poglądów politycznych, wyznania czy innych różnic." 
    },
    full: { 
        RU: "Граждане имеют право осуществлять свою общественную активность в форме митингов, собраний и демонстраций в соответствии с законами Республики Каракалпакстан. Органы власти имеют право приостанавливать или запрещать проведение этих мероприятий только по соображениям безопасности.", 
        KK: "Пуқаралар өзлериниң жәмийетлик белсендилигин митинглер, жыйналыслар ҳәм демонстрациялар түринде Қарақалпақстан Республикасының нызамларына муўапық әмелге асырыў ҳуқықына ийе. Ҳәкимият уйымлары тек ғана қәўипсизлик себеплерге бола усы илажларды тоқтатыў ямаса олардың өткерилиўине тыйым салыў ҳуқықына ийе.", 
        EN: "Citizens have the right to exercise their social activity in the form of rallies, meetings, and demonstrations in accordance with the laws of the Republic of Karakalpakstan. Authorities have the right to suspend or prohibit these events solely for security reasons.", 
        PL: "Obywatele mają prawo do wyrażania swojej aktywności społecznej w formie wieców, zgromadzeń i demonstracji zgodnie z ustawami Republiki Karakałpakstanu. Organy władzy mają prawo zawiesić lub zakazać przeprowadzenia tych wydarzeń wyłącznie ze względów bezpieczeństwa." 
    },
    comp: {
      RU: "СООТВЕТСТВУЕТ. Право на проведение собраний, митингов и демонстраций соответствует принципу равенства прав и свобод граждан, изложенному в статье 3 Декларации.",
      KK: "МУЎАПЫҚ. Мәжилислер, митинглер ҳәм демонстрациялар өткериў ҳуқықы Декларацияның 3-статьясындағы пуқаралардың тең ҳуқықлары ҳәм еркинликлери принципине муўапық.",
      EN: "MATCHES. The right to hold assemblies, rallies, and demonstrations complies with the principle of equal rights and freedoms of citizens contained in Article 3 of the Declaration.",
      PL: "ZGODNE. Prawo do organizowania zgromadzeń, wieców i demonstracji jest zgodne z zasadą równości praw i wolności obywateli, określoną w artykule 3 deklaracji."
    }
  },
  {
    id: 32,
    title: "32-статья",
    cat: "green",
    declRefLabel: {
      RU: "3. ПРАВО НА ОБЪЕДИНЕНИЕ",
      KK: "3. БИРЛЕСИЎ ҲУҚЫҚЫ",
      EN: "3. RIGHT TO ASSOCIATION",
      PL: "3. PRAWO DO ZRZESZANIA SIĘ"
    },
    declFull: {
      RU: "Многонациональный народ Республики Каракалпакстан определяет и составляет Государство на своей суверенной территории. Народ, опираясь на Конституцию и законы непосредственно и однозначно через избранных депутатов осуществляет государственное управление. Правительство Республики Каракалпакстан уполномоченное властью осуществляет укрепление дружбы народов. Государство всем своим гражданам проживающим на территории Республики Каракалпакстан, не смотря на их политические взгляды, веру исповедания и другие отличия, обеспечивает всех равными правами и свободами.",
      KK: "Қарақалпақстан Республикасының көп миллетли халқы оның мəмлекетлик Суверенитетиниң ўəкили ҳəм дəреги болып табылады. Халық Республиканың Конституциясы ҳəм тийкарында тиккелей жəне халық депутатларының Кеңеслери арқалы мəмлекетлик ҳəкимиятты иске асырады. Қарақалпақстан Республикасы мəмлекетлик ҳəкимиятын толық бийлигин пайдалана отырып, халықлар дослығын беккемлейди.",
      EN: "The multinational people of the Republic of Karakalpakstan shall determine and constitute a State on their sovereign territory. The people, relying on the Constitution and laws, directly and unambiguously through the elected deputies, exercise State administration. The Government of the Republic of Karakalpakstan authorized by the government to strengthen the friendship of peoples. The State provides all its citizens residing in the territory of the Republic of Karakalpakstan with equal rights and freedoms, regardless of their political views, religious beliefs and other differences.",
      PL: "Wielonarodowy naród Republiki Karakalpakstanu określa i konstytuuje Państwo na swoim suwerennym terytorium. Naród, opierając się na Konstytucji i ustawach, bezpośrednio i jednoznacznie poprzez wybranych deputowanych sprawuje władzę państwową. Rząd Republiki Karakalpakstanu umacnia przyjaźń narodów. Państwo zapewnia wszystkim obywatelom równe prawa i wolności, niezależnie od poglądów politycznych, wyznania czy innych różnic."
    },
    full: {
      RU: "Граждане Республики Каракалпакстан имеют право объединяться в профессиональные союзы, политические партии и другие общественные объединения, участвовать в массовых движениях. Никто не может ущемлять права, свободы и достоинства лиц, составляющих оппозиционное меньшинство в политических партиях, общественных объединениях, массовых движениях, а также в представительных органах власти.",
      KK: "Қарақалпақстан Республикасының пуқаралары кәсиплик аўқамларға, сиясий партияларға ҳәм басқа да жәмийетлик бирлеспелерге бирлесиў, ғалаба ҳәрекетлерге қатнасыў ҳуқықына ийе. Сиясий партияларда, жәмийетлик бирлеспелерде, ғалаба ҳәрекетлерде, сондай-ақ, ҳәкимияттың ўәкилликли уйымларында оппозициялық азшылықты қурайтуғын адамлардың ҳуқықларын, еркинликлерин ҳәм қәдир-қымбатын ҳеш ким кемсите алмайды.",
      EN: "Citizens of the Republic of Karakalpakstan have the right to unite in trade unions, political parties, and other public associations, and to participate in mass movements. No one may infringe upon the rights, freedoms, or dignity of persons who constitute an opposition minority in political parties, public associations, mass movements, or in representative bodies of power.",
      PL: "Obywatele Republiki Karakałpacji mają prawo zrzeszać się w związki zawodowe, partie polityczne i inne stowarzyszenia społeczne oraz uczestniczyć w ruchach masowych. Nikt nie może naruszać praw, wolności i godności osób stanowiących mniejszość opozycyjną w partiach politycznych, stowarzyszeniach społecznych, ruchach masowych, a także w przedstawicielskich organach władzy."
    },
    comp: {
      RU: "СООТВЕТСТВУЕТ. Право на объединение в союзы и партии соответствует норме Декларации (ст. 3) о защите свобод граждан.",
      KK: "МУЎАПЫҚ. Кәсиплик аўқамлар, сиясий партиялар ҳәм жәмийиетлик бирлеспелерге биригиў ҳуқықы Декларация 3-статьясындағы пухаралар еркинликлерин қорғаў нормасына муўапық.",
      EN: "MATCHES. The right to unite in unions and parties corresponds to the Declaration's norm (Art. 3) on the protection of citizens' freedoms.",
      PL: "ZGODNE. Prawo do zrzeszania się w związki i partie odpowiada normie Deklaracji (art. 3) o ochronie wolności obywatelskich."
    }
  },
  {
    id: 33,
    title: "33-статья",
    cat: "green",
    declRefLabel: {
      RU: "2. УЧАСТИЕ В УПРАВЛЕНИИ",
      KK: "2. БАСҚАРЫЎҒА ҚАТНАСЫЎ",
      EN: "2. PARTICIPATION IN MANAGEMENT",
      PL: "2. UDZIAŁ W ZARZĄDZANIU"
    },
    declFull: {
      RU: "Республика Каракалпакстан проводит государственное управление, принятие законов и указов и назначает судебные органы, осуществляющие надзор над исполнением принятого законодательства. Совет Министров Республики Каракалпакстан является высшим исполнительным и управляющим органом, осуществляющий принятие необходимых законов, управление и надзор над исполнением принятых законов. Совет Министров Республики Каракалпакстан является верховным исполнительным органом и органом управления. Верховный Суд Республики Каракалпакстан является Высшим Судом. Верховный Совет Республики Каракалпакстан назначает Генерального Прокурора осуществляющего надзор над исполнением закона, правопорядок и равного права всех перед законом.",
      KK: "Қарақалпақстан Республикасында мəмлекетлик ҳəкимият ҳəм нызам шығарыў, атқарыўшы ҳəм суд уйымларына бөлистириў принципине муўапық əмелге асырылады. -Қарақалпақстан Республикасының Жоқарғы Кеңеси Қарақалпақстан Республикасы мəмлекетлик ҳəкимиятының жоқары уйымы болып табылады, ол өз жумысында нызам шығарыў, бийлик етиў ҳəм қадағалаў ўазыйпаларын əмелге асырады. -Қарақалпақстан Республикасының Министрлер Кеңеси Қарақалпақстан Республикасының Мəмлекетлик ҳəкимиятының жоқарғы атқарыўшы ҳəм бийлик етиўши уйымы болып табылады. -Қарақалпақстан Республикасының Жоқарғы Суды Қарақалпақстан Республикасының Жоқарғы Суд уйымы болып табылады. -Қарақалпақстан Республикасы Жоқарғы Совети тайынлайтуғын Қарақалпақстан Республикасының прокуроры нызамлардың саррас ҳəм бир қыйлы орынланыўын жоқары дəрежеде бақлап отырады.",
      EN: "The Republic of Karakalpakstan conducts public administration, enacts laws and decrees, and appoints judicial bodies that oversee the implementation of the adopted legislation. The Supreme Council of the Republic of Karakalpakstan is the supreme body of state administration, which makes the necessary laws, manages and supervises the implementation of the adopted laws. The Council of Ministers of the Republic of Karakalpakstan is the supreme executive body and governing body. The Supreme Court of the Republic of Karakalpakstan is the Highest Court. The Supreme Council of the Republic of Karakalpakstan appoints the Prosecutor General to oversee the implementation of the law, the rule of law and the equal rights of all before the law.",
      PL: "Republika Karakalpakstanu prowadzi administrację państwową, uchwala ustawy i dekrety oraz powołuje organy sądowe sprawujące nadzór nad wykonaniem przyjętego ustawodawstwa. Najwyższa Rada Republiki Karakalpakstanu jest najwyższym organem administracji państwowej. Rada Ministrów Republiki Karakalpakstanu jest najwyższym organem wykonawczym i zarządzającym. Najwyższy Sąd Republiki Karakalpakstanu jest najwyższym organem sądowym. Najwyższa Rada powołuje Prokuratora Generalnego sprawującego nadzór nad przestrzeganiem prawa i równością obywateli wobec prawa."
    },
    full: {
      RU: "Каждый имеет право, как отдельно, так и сообща с другими лицами, обращаться с заявлениями, предложениями и жалобами в компетентные государственные органы, учреждения или к народным представителям. Заявления, предложения или жалобы должны быть рассмотрены в порядке и в сроки, установленные законом.",
      KK: "Ҳәр бир шахс тиккелей өзи ҳәм басқалар менен бирлесип, тийисли мәмлекетлик уйымларға, мәкемелерге ямаса халық ўәкиллерине арзалар бериў, усыныслар көрсетиў ҳәм шағымлар етиў ҳуқықына ийе. Арзалар, усыныслар ямаса шағымлар нызам менен белгиленген тәртипте ҳәм мүддетлерде қарап шығылыўы тийис.",
      EN: "Everyone has the right, individually or jointly with others, to address applications, proposals, and complaints to competent state bodies, institutions, or to representatives of the people. Applications, proposals, or complaints must be reviewed in the manner and within the time limits establishedь by law.",
      PL: "Każdy ma prawo, zarówno indywidualnie, jak i wspólnie z innymi osobami, zwracać się z wnioskami, propozycjami i skargami do właściwych organów państwowych, instytucji lub przedstawicieli ludowych. Wnioski, propozycje lub skargi muszą być rozpatrzone w trybie i terminach określonych ustawą."
    },
    comp: {
      RU: "СООТВЕТСТВУЕТ. Право на обращения соответствует принципу участия народа в управлении, закрепленному в ст. 2 Декларации.",
      KK: "МУЎАПЫҚ. Мәмлекетлик уйымларға өтиниш ҳәм шағым жибериў ҳуқықы Декларация 2-статьясындағы халықтың мәмлекетлик басқарыўға қатнасыў принципине муўапық.",
      EN: "MATCHES. The right to petition corresponds to the principle of popular participation in management anchored in Art. 2 of the Declaration.",
      PL: "ZGODNE. Prawo do petycji odpowiada zasadzie udziału ludu w zarządzaniu zapisanej w art. 2 Deklaracji."
    }
  },
  { 
    id: 34, 
    title: "34-статья", cat: "green",
    declRefLabel: { 
      RU: "5. ЗАЩИТА ТРУДЯЩИХСЯ", 
      KK: "5. МИЙНЕТКЕШЛЕРДИ ҚОРҒАЎ", 
      EN: "5. PROTECTION OF WORKERS", 
      PL: "5. OCHRONA PRACOWNIKÓW" 
    },
    declFull: { 
        RU: "Республика Каракалпакстан осуществляет защиту Конституционных Прав своих граждан, защиту их свобод, защиту их права на труд, защиту их собственности и определяет меры по осуществлению защиты, осуществляет организацию общественной жизни, осуществляет социально-культурное и экономическое развитие, осуществляет внешнеэкономическую деятельность, создание свободных экономических зон, осуществляет управление финансово-бюджетной системы, определяет основы оплаты труда и ценообразование, налоговое управление, защиту своей территории и управление природными ресурсами.", 
        KK: "Қарақалпақстан Республикасы пухараларының Конституциялық ҳуқықларын, еркинликлерин ҳəм мийнетлерин, меншик қатнасықларын əмелге асырыў тəртибин, халық хожалығына ҳəм социаллық мəдений қурылысқа басшылық етиўди, сыртқы экономикалық жумысты шөлкемлестириўди, соның ишинде еркин кəрханашылық зоналарын, бюджетлик-финанс системасын мийнетке ҳақы төлеў ҳəм баҳа қойыў, салық салыў,қоршап турған орталықты қорғаў ҳəм тəбийий қорлардан пайдаланыў ислерин нызам менен ретлестириўди өз бетинше əмелге асырады.", 
        EN: "The Republic of Karakalpakstan shall protect the Constitutional Rights of its citizens, the protection of their freedoms and protect their the right to work, protection of their property and defines the measures for the implementation of protection, organizes public life, carries out socio-cultural and economic development, provides externally economic activity, the creation of free economic zones, manages financial budget the system determines the basis of wage and pricing, tax administration, protection of its territory and management of natural resources.", 
        PL: "Republika Karakalpakstanu chroni konstytucyjne prawa swoich obywateli, ich wolności, prawo do pracy, własności, organizuje życie społeczne, prowadzi rozwój społeczno-kulturalny i gospodarczy, działalność zagraniczną, tworzy wolne strefy ekonomiczne, zarządza systemem finansowo-budżetowym, określa podstawy wynagrodzeń i cen, prowadzi administrację podatkową, chroni swoje terytorium i zarządza zasobami naturalnymi." 
    },
    full: { 
        RU: "Каждый имеет право на собственность. Тайна банковских вкладов и право наследования гарантируются законом.", 
        KK: "Ҳәр бир адам меншик ҳуқықына ийе. Банк аманатларының сыр сақланыўына ҳәм мийраслылық ҳуқықына нызам менен кепиллик бериледи.", 
        EN: "Every person has the right to property. The confidentiality of bank deposits and the right of inheritance are guaranteed by law.", 
        PL: "Każdy ma prawo do własności. Tajemnica wkładów bankowych oraz prawo dziedziczenia są gwarantowane ustawą." 
    },
    comp: {
      RU: "СООТВЕТСТВУЕТ. Право собственности, тайна банковских вкладов и право наследования прямо соответствуют нормам защиты имущества граждан, содержащимся в статье 5 Декларации.",
      KK: "МУЎАПЫҚ. Мүлк ҳуқықы, банк аманатларының сыры ҳәм мийрас ҳуқықы Декларацияның 5-статьясындағы пухаралардың мүлкин қорғаў нормасына муўапық.",
      EN: "MATCHES. Property rights, the secrecy of bank deposits, and inheritance rights correspond directly to the protection of citizens' property in Article 5 of the Declaration.",
      PL: "ZGODNE. Prawo własności, tajemnica depozytów bankowych i prawo dziedziczenia są bezpośrednio zgodne z normami ochrony mienia obywateli zawartymi w artykule 5 deklaracji."
    }
  },
  {
    id: 35,
    title: "35-статья",
    cat: "green",
    declRefLabel: {
      RU: "5. ПРАВО НА ТРУД",
      KK: "5. МИЙНЕТ ҲУҚЫҚЫ",
      EN: "5. RIGHT TO WORK",
      PL: "5. PRAWO DO PRACY"
    },
    declFull: {
      RU: "Республика Каракалпакстан осуществляет защиту Конституционных Прав своих граждан, защиту их свобод, защиту их права на труд, защиту их собственности и определяет меры по осуществлению защиты, осуществляет организацию общественной жизни, осуществляет социально-культурное и экономическое развитие, осуществляет внешнеэкономическую деятельность, создание свободных экономических зон, осуществляет управление финансово-бюджетной системы, определяет основы оплаты труда и ценообразование, налоговое управление, защиту своей территории и управление природными ресурсами.",
      KK: "Қарақалпақстан Республикасы пухараларының Конституциялық ҳуқықларын, еркинликлерин ҳəм мийнетлерин, меншик қатнасықларын əмелге асырыў тəртибин, халық хожалығына ҳəм социаллық мəдений қурылысқа басшылық етиўди, сыртқы экономикалық жумысты шөлкемлестириўди, соның ишинде еркин кəрханашылық зоналарын, бюджетлик-финанс системасын мийнетке ҳақы төлеў ҳəм баҳа қойыў, салық салыў,қоршап турған орталықты қорғаў ҳəм тəбийий қорлардан пайдаланыў ислерин нызам менен ретлестириўди өз бетинше əмелге асырады.",
      EN: "The Republic of Karakalpakstan shall protect the Constitutional Rights of its citizens, the protection of their freedoms and protect their the right to work, protection of their property and defines the measures for the implementation of protection, organizes public life, carries out socio-cultural and economic development, provides externally economic activity, the creation of free economic zones, manages financial budget the system determines the basis of wage and pricing, tax administration, protection of its territory and management of natural resources.",
      PL: "Republika Karakalpakstanu chroni konstytucyjne prawa swoich obywateli, ich wolności, prawo do pracy, własności, organizuje życie społeczne, prowadzi rozwój społeczno-kulturalny i gospodarczy, działalność zagraniczną, tworzy wolne strefy ekonomiczne, zarządza systemem finansowo-budżetowym, określa podstawy wynagrodzeń i cen, prowadzi administrację podatkową, chroni swoje terytorium i zarządza zasobami naturalnymi."
    },
    full: {
      RU: "Каждый имеет право на труд, на свободный выбор работы, на справедливые условия труда и на защиту от безработицы, в порядке, установленном законом. Запрещается принудительный труд, иначе как в порядке исполнения наказания по приговору суда, либо в других случаях, предусмотренных законом.",
      KK: "Ҳәр бир шахс мийнет етиў, жумысты еркин таңлап алыў, әдил мийнет жағдайларында ислеў ҳәм нызамда көрсетилген тәртипте жумыссызлықтан қорғаныў ҳуқықына ийе. Судтың ҳүкими менен тайынланған жазаны өтеў тәртибинен ямаса нызамда көрсетилген тәртиптен басқа жағдайларда мәжбүрий мийнет қадаған етиледи.",
      EN: "Everyone has the right to work, to freely choose employment, to fair working conditions, and to protection against unemployment, in the manner established by law. Forced labor is prohibited, except in the execution of a court sentence or in other cases provided by law.",
      PL: "Każdy ma prawo do pracy, do swobodnego wyboru zatrudnienia, do sprawiedliwych warunków pracy oraz do ochrony przed bezrobociem, w trybie określonym ustawą. Zakazuje się pracy przymusowej, z wyjątkiem wykonywania kary na podstawie wyroku sądu lub w innych przypadkach przewidzianych przez prawo."
    },
    comp: {
      RU: "СООТВЕТСТВУЕТ. Право на труд и запрет принудительного труда прямо соответствуют норме ст. 5 Декларации.",
      KK: "МУЎАПЫҚ. Мийнет ҳуқықы ҳәм мәжбүрий мийнетке тыйым Декларация 5-статьясында «мийнет ҳуқықын қорғаў» деп анық белгиленген нормаға тиккелей муўапық.",
      EN: "MATCHES. The right to work and the prohibition of forced labor directly correspond to the norm of Art. 5 of the Declaration.",
      PL: "ZGODNE. Prawo do pracy i zakaz pracy przymusowej są bezpośrednio zgodne z normą art. 5 Deklaracji."
    }
  },
  {
    id: 36,
    title: "36-статья",
    cat: "green",
    declRefLabel: {
      RU: "5. СОЦИАЛЬНЫЕ ПРАВА",
      KK: "5. СОЦИАЛЛЫҚ ҲУҚЫҚЛАР",
      EN: "5. SOCIAL RIGHTS",
      PL: "5. PRAWA SOCJALNE"
    },
    declFull: {
      RU: "Республика Каракалпакстан осуществляет защиту Конституционных Прав своих граждан, защиту их свобод, защиту их права на труд, защиту их собственности и определяет меры по осуществлению защиты, осуществляет организацию общественной жизни, осуществляет социально-культурное и экономическое развитие, осуществляет внешнеэкономическую деятельность, создание свободных экономических зон, осуществляет управление финансово-бюджетной системы, определяет основы оплаты труда и ценообразование, налоговое управление, защиту своей территории и управление природными ресурсами.",
      KK: "Қарақалпақстан Республикасы пухараларының Конституциялық ҳуқықларын, еркинликлерин ҳəм мийнетлерин, меншик қатнасықларын əмелге асырыў тəртибин, халық хожалығына ҳəм социаллық мəдений қурылысқа басшылық етиўди, сыртқы экономикалық жумысты шөлкемлестириўди, соның ишинде еркин кəрханашылық зоналарын, бюджетлик-финанс системасын мийнетке ҳақы төлеў ҳəм баҳа қойыў, салық салыў,қоршап турған орталықты қорғаў ҳəм тəбийий қорлардан пайдаланыў ислерин нызам менен ретлестириўди өз бетинше əмелге асырады.",
      EN: "The Republic of Karakalpakstan shall protect the Constitutional Rights of its citizens, the protection of their freedoms and protect their the right to work, protection of their property and defines the measures for the implementation of protection, organizes public life, carries out socio-cultural and economic development, provides externally economic activity, the creation of free economic zones, manages financial budget the system determines the basis of wage and pricing, tax administration, protection of its territory and management of natural resources.",
      PL: "Republika Karakalpakstanu chroni konstytucyjne prawa swoich obywateli, ich wolności, prawo do pracy, własności, organizuje życie społeczne, prowadzi rozwój społeczno-kulturalny i gospodarczy, działalność zagraniczną, tworzy wolne strefy ekonomiczne, zarządza systemem finansowo-budżetowym, określa podstawy wynagrodzeń i cen, prowadzi administrację podatkową, chroni swoje terytorium i zarządza zasobami naturalnymi."
    },
    full: {
      RU: "Работающие по найму имеют право на оплачиваемый отдых. Продолжительность рабочего времени, оплачиваемого трудового отпуска определяются законом.",
      KK: "Жалланып ислеўши шахслар ҳақы төленетуғын дем алыс ҳуқықына ийе болады. Жумыс ўақтының, ҳақы төленетуғын мийнет дем алысының мүддети нызам менен белгиленеди.",
      EN: "Employees have the right to paid rest. The duration of working hours and paid leave is determined by law.",
      PL: "Pracownicy najemni mają prawo do płatnego wypoczynku. Czas pracy oraz wymiar płatnego urlopu wypoczynkowego określa ustawa."
    },
    comp: {
      RU: "СООТВЕТСТВУЕТ. Право на оплачиваемый отдых соответствует принципу защиты социально-культурных прав граждан (ст. 5 Декларации).",
      KK: "МУЎАПЫҚ. Төлемли дем алыў ҳуқықы Декларация 5-статьясындағы пухаралардың социаллық-мәдений ҳуқықларын қорғаў принципине муўапық.",
      EN: "MATCHES. The right to paid rest corresponds to the principle of protection of socio-cultural rights of citizens (Art. 5 of the Declaration).",
      PL: "ZGODNE. Prawo do płatnego wypoczynku odpowiada zasadzie ochrony praw społeczno-kulturalnych obywateli (art. 5 Deklaracji)."
    }
  },
  {
    id: 37,
    title: "37-статья",
    cat: "green",
    declRefLabel: {
      RU: "5. СОЦИАЛЬНАЯ ЗАЩИТА",
      KK: "5. СОЦИАЛЛЫҚ ҚОРҒАЎ",
      EN: "5. SOCIAL PROTECTION",
      PL: "5. OCHRONA SOCJALNA"
    },
    declFull: {
      RU: "Республика Каракалпакстан осуществляет защиту Конституционных Прав своих граждан, защиту их свобод, защиту их права на труд, защиту их собственности и определяет меры по осуществлению защиты, осуществляет организацию общественной жизни, осуществляет социально-культурное и экономическое развитие, осуществляет внешнеэкономическую деятельность, создание свободных экономических зон, осуществляет управление финансово-бюджетной системы, определяет основы оплаты труда и ценообразование, налоговое управление, защиту своей территории и управление природными ресурсами.",
      KK: "Қарақалпақстан Республикасы пухараларының Конституциялық ҳуқықларын, еркинликлерин ҳəм мийнетлерин, меншик қатнасықларын əмелге асырыў тəртибин, халық хожалығына ҳəм социаллық мəдений қурылысқа басшылық етиўди, сыртқы экономикалық жумысты шөлкемлестириўди, соның ишинде еркин кəрханашылық зоналарын, бюджетлик-финанс системасын мийнетке ҳақы төлеў ҳəм баҳа қойыў, салық салыў,қоршап турған орталықты қорғаў ҳəм тəбийий қорлардан пайдаланыў ислерин нызам менен ретлестириўди өз бетинше əмелге асырады.",
      EN: "The Republic of Karakalpakstan shall protect the Constitutional Rights of its citizens, the protection of their freedoms and protect their the right to work, protection of their property and defines the measures for the implementation of protection, organizes public life, carries out socio-cultural and economic development, provides externally economic activity, the creation of free economic zones, manages financial budget the system determines the basis of wage and pricing, tax administration, protection of its territory and management of natural resources.",
      PL: "Republika Karakalpakstanu chroni konstytucyjne prawa swoich obywateli, ich wolności, prawo do pracy, własności, organizuje życie społeczne, prowadzi rozwój społeczno-kulturalny i gospodarczy, działalność zagraniczną, tworzy wolne strefy ekonomiczne, zarządza systemem finansowo-budżetowym, określa podstawy wynagrodzeń i cen, prowadzi administrację podatkową, chroni swoje terytorium i zarządza zasobami naturalnymi."
    },
    full: {
      RU: "Каждый имеет право на социальное обеспечение в старости, в случаях утраты трудоспособности, а также потери кормильца и в других, предусмотренных законом случаях. Пенсии, пособия, другие виды социальной помощи не могут быть ниже официально установленного прожиточного минимума.",
      KK: "Ҳәр ким қартайғанда, мийнет етиў уқыбынан айырылғанда, сондай-ақ, асыраўшысынан айырылғанда ҳәм нызам менен нәзерде тутылған басқа да жағдайларда социаллық жақтан тәмийинлениў ҳуқықына ийе. Пенсиялар, напақалар, социаллық жәрдемниң басқа да түрлери рәсмий түрде белгиленген күнелтиў зәрүрлигиниң ең кем муғдарынан аз болыўы мүмкин емес.",
      EN: "Everyone has the right to social security in old age, in cases of loss of working capacity, as well as in the event of the loss of a breadwinner, and in other cases provided by law. Pensions, allowances, and other types of social assistance may not be lower than the officially established minimum standard of living.",
      PL: "Każdy ma prawo do zabezpieczenia społecznego na starość, w przypadku utraty zdolności do pracy, a także utraty żywiciela i w innych przypadkach przewidzianych ustawą. Emerytury, zasiłki i inne formy pomocy społecznej nie mogą być niższe niż oficjalnie ustalona granica minimum egzystencji."
    },
    comp: {
      RU: "СООТВЕТСТВУЕТ. Право на социальное обеспечение соответствует норме Декларации (ст. 5) о защите прав граждан.",
      KK: "МУЎАПЫҚ. Социаллық тәмийинлениў ҳуқықы Декларация 5-статьясындағы пухаралардың ҳуқықларын ҳәм еркинликлерин қорғаў нормасына муўапық.",
      EN: "MATCHES. The right to social security corresponds to the Declaration's norm (Art. 5) on the protection of citizens' rights.",
      PL: "ZGODNE. Prawo do zabezpieczenia społecznego odpowiada normie Deklaracji (art. 5) o ochronie praw obywatelskich."
    }
  },
  {
    id: 38,
    title: "38-статья",
    cat: "green",
    declRefLabel: {
      RU: "5. ОХРАНА ЗДОРОВЬЯ",
      KK: "5. ДЕНСАЎЛЫҚТЫ САҚЛАЎ",
      EN: "5. HEALTH CARE",
      PL: "5. OCHRONA ZDROWIA"
    },
    declFull: {
      RU: "Республика Каракалпакстан осуществляет защиту Конституционных Прав своих граждан, защиту их свобод, защиту их права на труд, защиту их собственности и определяет меры по осуществлению защиты, осуществляет организацию общественной жизни, осуществляет социально-культурное и экономическое развитие, осуществляет внешнеэкономическую деятельность, создание свободных экономических зон, осуществляет управление финансово-бюджетной системы, определяет основы оплаты труда и ценообразование, налоговое управление, защиту своей территории и управление природными ресурсами.",
      KK: "Қарақалпақстан Республикасы пухараларының Конституциялық ҳуқықларын, еркинликлерин ҳəм мийнетлерин, меншик қатнасықларын əмелге асырыў тəртибин, халық хожалығына ҳəм социаллық мəдений қурылысқа басшылық етиўди, сыртқы экономикалық жумысты шөлкемлестириўди, соның ишинде еркин кəрханашылық зоналарын, бюджетлик-финанс системасын мийнетке ҳақы төлеў ҳəм баҳа қойыў, салық салыў,қоршап турған орталықты қорғаў ҳəм тəбийий қорлардан пайдаланыў ислерин нызам менен ретлестириўди өз бетинше əмелге асырады.",
      EN: "The Republic of Karakalpakstan shall protect the Constitutional Rights of its citizens, the protection of their freedoms and protect their the right to work, protection of their property and defines the measures for the implementation of protection, organizes public life, carries out socio-cultural and economic development, provides externally economic activity, the creation of free economic zones, manages financial budget the system determines the basis of wage and pricing, tax administration, protection of its territory and management of natural resources.",
      PL: "Republika Karakalpakstanu chroni konstytucyjne prawa swoich obywateli, ich wolności, prawo do pracy, własności, organizuje życie społeczne, prowadzi rozwój społeczno-kulturalny i gospodarczy, działalność zagraniczną, tworzy wolne strefy ekonomiczne, zarządza systemem finansowo-budżetowym, określa podstawy wynagrodzeń i cen, prowadzi administrację podatkową, chroni swoje terytorium i zarządza zasobami naturalnymi."
    },
    full: {
      RU: "Каждый имеет право на квалифицированное медицинское обслуживание.",
      KK: "Ҳәр бир шахс қәнигели медициналық хызметтен пайдаланыў ҳуқықына ийе.",
      EN: "Everyone has the right to qualified medical care.",
      PL: "Każdy ma prawo do fachowej opieki medycznej."
    },
    comp: {
      RU: "СООТВЕТСТВУЕТ. Право на медицинскую помощь соответствует принципу защиты прав граждан, заложенному в Декларации (ст. 5).",
      KK: "МУЎАПЫҚ. Квалификациялы медициналық жәрдем алыў ҳуқықы Декларация 5-статьясындағы пухаралардың ҳуқықларын қорғаў принципине муўапық.",
      EN: "MATCHES. The right to medical assistance corresponds to the principle of protecting citizens' rights laid down in the Declaration (Art. 5).",
      PL: "ZGODNE. Prawo do pomocy medycznej odpowiada zasadzie ochrony praw obywatelskich zawartej w Deklaracji (art. 5)."
    }
  },
  {
    id: 39,
    title: "39-статья",
    cat: "green",
    declRefLabel: {
      RU: "5. ПРАВО НА ОБРАЗОВАНИЕ",
      KK: "5. БИЛИМ АЛЫЎ ҲУҚЫҚЫ",
      EN: "5. RIGHT TO EDUCATION",
      PL: "5. PRAWO DO EDUKACJI"
    },
    declFull: {
      RU: "Республика Каракалпакстан осуществляет защиту Конституционных Прав своих граждан, защиту их свобод, защиту их права на труд, защиту их собственности и определяет меры по осуществлению защиты, осуществляет организацию общественной жизни, осуществляет социально-культурное и экономическое развитие, осуществляет внешнеэкономическую деятельность, создание свободных экономических зон, осуществляет управление финансово-бюджетной системы, определяет основы оплаты труда и ценообразование, налоговое управление, защиту своей территории и управление природными ресурсами.",
      KK: "Қарақалпақстан Республикасы пухараларының Конституциялық ҳуқықларын, еркинликлерин ҳəм мийнетлерин, меншик қатнасықларын əмелге асырыў тəртибин, халық хожалығына ҳəм социаллық мəдений қурылысқа басшылық етиўди, сыртқы экономикалық жумысты шөлкемлестириўди, соның ишинде еркин кəрханашылық зоналарын, бюджетлик-финанс системасын мийнетке ҳақы төлеў ҳəм баҳа қойыў, салық салыў,қоршап турған орталықты қорғаў ҳəм тəбийий қорлардан пайдаланыў ислерин нызам менен ретлестириўди өз бетинше əмелге асырады.",
      EN: "The Republic of Karakalpakstan shall protect the Constitutional Rights of its citizens, the protection of their freedoms and protect their the right to work, protection of their property and defines the measures for the implementation of protection, organizes public life, carries out socio-cultural and economic development, provides externally economic activity, the creation of free economic zones, manages financial budget the system determines the basis of wage and pricing, tax administration, protection of its territory and management of natural resources.",
      PL: "Republika Karakalpakstanu chroni konstytucyjne prawa swoich obywateli, ich wolności, prawo do pracy, własności, organizuje życie społeczne, prowadzi rozwój społeczno-kulturalny i gospodarczy, działalność zagraniczną, tworzy wolne strefy ekonomiczne, zarządza systemem finansowo-budżetowym, określa podstawy wynagrodzeń i cen, prowadzi administrację podatkową, chroni swoje terytorium i zarządza zasobami naturalnymi."
    },
    full: {
      RU: "Каждый имеет право на образование. Государство гарантирует получение бесплатно общего образования. Школьное дело находится под надзором государства.",
      KK: "Ҳәр ким билим алыў ҳуқықына ийе. Бийпул улыўма билим алыўға мәмлекет тәрепинен кепиллик бериледи. Мектеп иси мәмлекеттиң бақлаўында болады.",
      EN: "Everyone has the right to education. The state guarantees free general education. Schooling is under state supervision.",
      PL: "Każdy ma prawo do edukacji. Państwo gwarantuje bezpłatną edukację ogólną."
    },
    comp: {
      RU: "СООТВЕТСТВУЕТ. Право на образование соответствует принципу социально-культурного развития (ст. 5 Декларации).",
      KK: "МУЎАПЫҚ. Билим алыў ҳуқықы ҳәм мәмлекетлик бийпул улыўма билим бериў кепиллиги Декларацияның 5-статьясындағы социаллық-мәдений раўажланыўды тәмийинлеў принципине муўапық.",
      EN: "MATCHES. The right to education corresponds to the principle of socio-cultural development (Art. 5 of the Declaration).",
      PL: "ZGODNE. Prawo do edukacji odpowiada zasadzie rozwoju społeczno-kulturalnego (art. 5 Deklaracji)."
    }
  },
  {
    id: 40,
    title: "40-статья",
    cat: "green",
    declRefLabel: {
      RU: "5. СВОБОДА ТВОРЧЕСТВА",
      KK: "5. ДӨРЕТИЎШИЛИК ЕРКИНЛИГИ",
      EN: "5. FREEDOM OF CREATIVITY",
      PL: "5. WOLNOŚĆ TWÓRCZOŚCI"
    },
    declFull: {
      RU: "Республика Каракалпакстан осуществляет защиту Конституционных Прав своих граждан, защиту их свобод, защиту их права на труд, защиту их собственности и определяет меры по осуществлению защиты, осуществляет организацию общественной жизни, осуществляет социально-культурное и экономическое развитие, осуществляет внешнеэкономическую деятельность, создание свободных экономических зон, осуществляет управление финансово-бюджетной системы, определяет основы оплаты труда и ценообразование, налоговое управление, защиту своей территории и управление природными ресурсами.",
      KK: "Қарақалпақстан Республикасы пухараларының Конституциялық ҳуқықларын, еркинликлерин ҳəм мийнетлерин, меншик қатнасықларын əмелге асырыў тəртибин, халық хожалығына ҳəм социаллық мəдений қурылысқа басшылық етиўди, сыртқы экономикалық жумысты шөлкемлестириўди, соның ишинде еркин кəрханашылық зоналарын, бюджетлик-финанс системасын мийнетке ҳақы төлеў ҳəм баҳа қойыў, салық салыў,қоршап турған орталықты қорғаў ҳəм тəбийий қорлардан пайдаланыў ислерин нызам менен ретлестириўди өз бетинше əмелге асырады.",
      EN: "The Republic of Karakalpakstan shall protect the Constitutional Rights of its citizens, the protection of their freedoms and protect their the right to work, protection of their property and defines the measures for the implementation of protection, organizes public life, carries out socio-cultural and economic development, provides externally economic activity, the creation of free economic zones, manages financial budget the system determines the basis of wage and pricing, tax administration, protection of its territory and management of natural resources.",
      PL: "Republika Karakalpakstanu chroni konstytucyjne prawa swoich obywateli, ich wolności, prawo do pracy, własności, organizuje życie społeczne, prowadzi rozwój społeczno-kulturalny i gospodarczy, działalność zagraniczną, tworzy wolne strefy ekonomiczne, zarządza systemem finansowo-budżetowym, określa podstawy wynagrodzeń i cen, prowadzi administrację podatkową, chroni swoje terytorium i zarządza zasobami naturalnymi."
    },
    full: {
      RU: "Каждому гарантируется свобода художественного, научного и технического творчества, право на пользование достижениями культуры. Государство заботится о культурном, научном и техническом развитии общества.",
      KK: "Ҳәр бир шахсқа илимий ҳәм техникалық дөретиўшилик еркинлиги, мәденияттың жетискенликлеринен пайдаланыў ҳуқықына кепиллик бериледи. Мәмлекет жәмийеттиң мәдений, илимий ҳәм техникалық раўажланыўына ғамхорлық етеди.",
      EN: "Everyone is guaranteed freedom of artistic, scientific, and technical creativity, and the right to use the achievements of culture. The state promotes the cultural, scientific, and technical development of society.",
      PL: "Każdemu gwarantuje się wolność twórczości artystycznej, naukowej i technicznej oraz prawo do korzystania z dorobku kultury. Państwo dba o rozwój kulturalny, naukowy i techniczny społeczeństwa."
    },
    comp: {
      RU: "СООТВЕТСТВУЕТ. Свобода творчества соответствует принципу, согласно которому культурный и научный потенциал является достоянием РК (ст. 5 Декларации).",
      KK: "МУЎАПЫҚ. Көркем-өнер, илимий ҳәм техникалық дөретиўшилик еркинлиги Декларация 5-статьясындағы мәдений ҳәм илимий потенциал Қарақалпақстан Республикасының айрықша мүлки деген принципине муўапық.",
      EN: "MATCHES. Freedom of creativity corresponds to the principle that cultural and scientific potential is the property of the RK (Art. 5 of the Declaration).",
      PL: "ZGODNE. Wolność twórczości odpowiada zasadzie, że potencjał kulturalny i naukowy jest własnością RK (art. 5 Deklaracji)."
    }
  },
  {
    id: 41,
    title: "41-статья",
    cat: "amber",
    declRefLabel: {
      RU: "5. ЗАЩИТА ПРАВ",
      KK: "5. ҲУҚУҚЛАРДЫ ҚОРҒАЎ",
      EN: "5. PROTECTION OF RIGHTS",
      PL: "5. OCHRONA PRAW"
    },
    declFull: {
      RU: "Республика Каракалпакстан осуществляет защиту Конституционных Прав своих граждан, защиту их свобод, защиту их права на труд, защиту их собственности и определяет меры по осуществлению защиты, осуществляет организацию общественной жизни, осуществляет социально-культурное и экономическое развитие, осуществляет внешнеэкономическую деятельность, создание свободных экономических зон, осуществляет управление финансово-бюджетной системы, определяет основы оплаты труда и ценообразование, налоговое управление, защиту своей территории и управление природными ресурсами.",
      KK: "Қарақалпақстан Республикасы пухараларының Конституциялық ҳуқықларын, еркинликлерин ҳəм мийнетлерин, меншик қатнасықларын əмелге асырыў тəртибин, халық хожалығына ҳəм социаллық мəдений қурылысқа басшылық етиўди, сыртқы экономикалық жумысты шөлкемлестириўди, соның ишинде еркин кəрханашылық зоналарын, бюджетлик-финанс системасын мийнетке ҳақы төлеў ҳəм баҳа қойыў, салық салыў,қоршап турған орталықты қорғаў ҳəм тəбийий қорлардан пайдаланыў ислерин нызам менен ретлестириўди өз бетинше əмелге асырады.",
      EN: "The Republic of Karakalpakstan shall protect the Constitutional Rights of its citizens, the protection of their freedoms and protect their the right to work, protection of their property and defines the measures for the implementation of protection, organizes public life, carries out socio-cultural and economic development, provides externally economic activity, the creation of free economic zones, manages financial budget the system determines the basis of wage and pricing, tax administration, protection of its territory and management of natural resources.",
      PL: "Republika Karakalpakstanu chroni konstytucyjne prawa swoich obywateli, ich wolności, prawo do pracy, własności, organizuje życie społeczne, prowadzi rozwój społeczno-kulturalny i gospodarczy, działalność zagraniczną, tworzy wolne strefy ekonomiczne, zarządza systemem finansowo-budżetowym, określa podstawy wynagrodzeń i cen, prowadzi administrację podatkową, chroni swoje terytorium i zarządza zasobami naturalnymi."
    },
    full: {
      RU: "Государство обеспечивает права и свободы граждан, закрепленные Конституцией и законами.",
      KK: "Мәмлекет пуқаралардың Конституция ҳәм нызамлар менен бекитилген ҳуқықларын жәнееркинликлерин тәмийинлейди.",
      EN: "The state ensures the rights and freedoms of citizens enshrined in the Constitution and the laws.",
      PL: "Państwo zapewnia prawa i wolności obywateli, zapisane w Konstytucji i ustawach."
    },
    comp: {
      RU: "УСЛОВНО. Обеспечение государством прав граждан близко к статье 5 Декларации. Однако в Конституции эта гарантия предоставлена в рамках Конституции Узбекистана, а не на основе суверенного государства.",
      KK: "ШӘРТЛИ ҚАЙШЫ. Мәмлекеттиң пуқаралар ҳуқықларын тәмийинлеўи Декларация 5-статьясына жақын. Бирақ Конституцияда бул кепиллик Өзбекстан Конституциясы шеңберинде берилген, суверен мәмлекет тийкарында емес.",
      EN: "CONDITIONAL. The state's guarantee of citizens' rights is close to Article 5 of the Declaration. However, in the Constitution, this guarantee is provided within the framework of the Constitution of Uzbekistan, and not on the basis of a sovereign state.",
      PL: "WARUNKOWE. Gwarancja Państwa praw obywateli jest zbliżona do artykułu 5 deklaracji. Jednak konstytucja przewiduje tę gwarancję w ramach Konstytucji Uzbekistanu, a nie na podstawie suwerennego państwa."
    }
  },
  {
    id: 42,
    title: "42-статья",
    cat: "green",
    declRefLabel: {
      RU: "2. СУДЕБНАЯ ЗАЩИТА",
      KK: "2. СУДТА ҚОРҒАНЫЎ",
      EN: "2. JUDICIAL PROTECTION",
      PL: "2. OCHRONA SĄDOWA"
    },
    declFull: {
      RU: "Республика Каракалпакстан проводит государственное управление, принятие законов и указов и назначает судебные органы, осуществляющие надзор над исполнением принятого законодательства. Совет Министров Республики Каракалпакстан является высшим исполнительным и управляющим органом, осуществляющий принятие необходимых законов, управление и надзор над исполнением принятых законов. Совет Министров Республики Каракалпакстан является верховным исполнительным органом и органом управления. Верховный Суд Республики Каракалпакстан является Высшим Судом. Верховный Совет Республики Каракалпакстан назначает Генерального Прокурора осуществляющего надзор над исполнением закона, правопорядок и равного права всех перед законом.",
      KK: "Қарақалпақстан Республикасында мəмлекетлик ҳəкимият ҳəм нызам шығарыў, атқарыўшы ҳəм суд уйымларына бөлистириў принципине муўапық əмелге асырылады. -Қарақалпақстан Республикасының Жоқарғы Кеңеси Қарақалпақстан Республикасы мəмлекетлик ҳəкимиятының жоқары уйымы болып табылады, ол өз жумысында нызам шығарыў, бийлик етиў ҳəм қадағалаў ўазыйпаларын əмелге асырады. -Қарақалпақстан Республикасының Министрлер Кеңеси Қарақалпақстан Республикасының Мəмлекетлик ҳəкимиятының жоқарғы атқарыўшы ҳəм бийлик етиўши уйымы болып табылады. -Қарақалпақстан Республикасының Жоқарғы Суды Қарақалпақстан Республикасының Жоқарғы Суд уйымы болып табылады. -Қарақалпақстан Республикасы Жоқарғы Совети тайынлайтуғын Қарақалпақстан Республикасының прокуроры нызамлардың саррас ҳəм бир қыйлы орынланыўын жоқары дəрежеде бақлап отырады.",
      EN: "The Republic of Karakalpakstan conducts public administration, enacts laws and decrees, and appoints judicial bodies that oversee the implementation of the adopted legislation. The Supreme Council of the Republic of Karakalpakstan is the supreme body of state administration, which makes the necessary laws, manages and supervises the implementation of the adopted laws. The Council of Ministers of the Republic of Karakalpakstan is the supreme executive body and governing body. The Supreme Court of the Republic of Karakalpakstan is the Highest Court. The Supreme Council of the Republic of Karakalpakstan appoints the Prosecutor General to oversee the implementation of the law, the rule of law and the equal rights of all before the law.",
      PL: "Republika Karakalpakstanu prowadzi administrację państwową, uchwala ustawy i dekrety oraz powołuje organy sądowe sprawujące nadzór nad wykonaniem przyjętego ustawodawstwa. Najwyższa Rada Republiki Karakalpakstanu jest najwyższym organem administracji państwowej. Rada Ministrów Republiki Karakalpakstanu jest najwyższym organem wykonawczym i zarządzającym. Najwyższy Sąd Republiki Karakalpakstanu jest najwyższym organem sądowym. Najwyższa Rada powołuje Prokuratora Generalnego sprawującego nadzór nad przestrzeganiem prawa i równością obywateli wobec prawa."
    },
    full: {
      RU: "Каждому гарантируется судебная защита его прав и свобод, право обжалования в суд незаконных действий государственных органов, должностных лиц, общественных объединений.",
      KK: "Ҳәр бир шахсқа өзиниң ҳуқық ҳәм еркинликлерин суд арқалы қорғаў, мәмлекетлик уйымлардың, лаўазымлы шахслардың, жәмийетлик бирлеспелердиң нызамсыз ҳәрекетлери үстинен судқа шағым етиў ҳуқықына кепиллик бериледи.",
      EN: "Everyone is guaranteed judicial protection of their rights and freedoms, as well as the right to appeal in court against unlawful actions of state bodies, officials, and public associations.",
      PL: "Każdemu gwarantuje się ochronę sądową jego praw i wolności, prawo do zaskarżenia do sądu niezgodnych z prawem działań organów państwowych, urzędników oraz organizacji społecznych"
    },
    comp: {
      RU: "СООТВЕТСТВУЕТ. Гарантия судебной защиты прав соответствует норме ст. 2 Декларации о самостоятельном осуществлении судебных функций.",
      KK: "МУЎАПЫҚ. Ҳуқықлар ҳәм еркинликлердиң суд қорғаўы кепиллиги Декларацияның 2-статьясындағы суд қадағалаўы функциялары еркинлик пенен әмелге асырылады, деген нормаға муўапық.",
      EN: "MATCHES. The guarantee of judicial protection of rights corresponds to the norm of Art. 2 of the Declaration on the independent exercise of judicial functions.",
      PL: "ZGODNE. Gwarancja sądowej ochrony praw odpowiada normie art. 2 Deklaracji o samodzielnym sprawowaniu funkcji sądowych."
    }
  },
  {
    id: 43,
    title: "43-статья",
    cat: "green",
    declRefLabel: {
      RU: "3. СОЦИАЛЬНАЯ ЗАЩИТА",
      KK: "3. СОЦИАЛЛЫҚ ҚОРҒАЎ",
      EN: "3. SOCIAL PROTECTION",
      PL: "3. OCHRONA SOCJALNA"
    },
    declFull: {
      RU: "Многонациональный народ Республики Каракалпакстан определяет и составляет Государство на своей суверенной территории. Народ, опираясь на Конституцию и законы непосредственно и однозначно через избранных депутатов осуществляет государственное управление. Правительство Республики Каракалпакстан уполномоченное властью осуществляет укрепление дружбы народов. Государство всем своим гражданам проживающим на территории Республики Каракалпакстан, не смотря на их политические взгляды, веру исповедания и другие отличия, обеспечивает всех равными правами и свободами.",
      KK: "Қарақалпақстан Республикасының көп миллетли халқы оның мəмлекетлик Суверенитетиниң ўəкили ҳəм дəреги болып табылады. Халық Республиканың Конституциясы ҳəм тийкарында тиккелей жəне халық депутатларының Кеңеслери арқалы мəмлекетлик ҳəкимиятты иске асырады. Қарақалпақстан Республикасы мəмлекетлик ҳəкимиятын толық бийлигин пайдалана отырып, халықлар дослығын беккемлейди.",
      EN: "The multinational people of the Republic of Karakalpakstan shall determine and constitute a State on their sovereign territory. The people, relying on the Constitution and laws, directly and unambiguously through the elected deputies, exercise State administration. The Government of the Republic of Karakalpakstan authorized by the government to strengthen the friendship of peoples. The State provides all its citizens residing in the territory of the Republic of Karakalpakstan with equal rights and freedoms, regardless of their political views, religious beliefs and other differences.",
      PL: "Wielonarodowy naród Republiki Karakalpakstanu określa i konstytuuje Państwo na swoim suwerennym terytorium. Naród, opierając się na Konstytucji i ustawach, bezpośrednio i jednoznacznie poprzez wybranych deputowanych sprawuje władzę państwową. Rząd Republiki Karakalpakstanu umacnia przyjaźń narodów. Państwo zapewnia wszystkim obywatelom równe prawa i wolności, niezależnie od poglądów politycznych, wyznania czy innych różnic."
    },
    full: {
      RU: "Права несовершеннолетних, нетрудоспособных и одиноких престарелых находятся под защитой государства.",
      KK: "Ер жетпегенлердиң, мийнетке жарамсыз ҳәм жалғыз баслы қартайған шахслардың ҳуқықлары мәмлекет тәрепинен қорғалады.",
      EN: "The rights of minors, persons with disabilities, and elderly individuals living alone are under the protection of the state.",
      PL: "Prawa nieletnich, osób niepełnosprawnych oraz samotnych osób starszych znajdują się pod ochroną państwa."
    },
    comp: {
      RU: "СООТВЕТСТВУЕТ. Защита государством прав уязвимых категорий граждан соответствует норме Декларации о равенстве и защите всех граждан.",
      KK: "МУЎАПЫҚ. Жас өспиримлер, майыплар ҳәм жалғыз кекселердиң ҳуқықларын мәмлекет қорғайды деген принцип Декларация 3 ҳәм 5-статьяларындағы барлық пуқараларға тең ҳуқықлар ҳәм қорғаў нормасына муўапық.",
      EN: "MATCHES. State protection of the rights of vulnerable categories of citizens corresponds to the Declaration's norm on equality and protection of all citizens.",
      PL: "ZGODNE. Ochrona praw grup szczególnie wrażliwych przez państwo odpowiada normie Deklaracji o równości i ochronie wszystkich obywateli."
    }
  },
  {
    id: 44,
    title: "44-статья",
    cat: "green",
    declRefLabel: {
      RU: "3. РАВЕНСТВО ПОЛОВ",
      KK: "3. ЖЫНЫСЛАР ТЕҢЛИГИ",
      EN: "3. GENDER EQUALITY",
      PL: "3. RÓWNOUPRAWNIENIE PŁCI"
    },
    declFull: {
      RU: "Многонациональный народ Республики Каракалпакстан определяет и составляет Государство на своей суверенной территории. Народ, опираясь на Конституцию и законы непосредственно и однозначно через избранных депутатов осуществляет государственное управление. Правительство Республики Каракалпакстан уполномоченное властью осуществляет укрепление дружбы народов. Государство всем своим гражданам проживающим на территории Республики Каракалпакстан, не смотря на их политические взгляды, веру исповедания и другие отличия, обеспечивает всех равными правами и свободами.",
      KK: "Қарақалпақстан Республикасының көп миллетли халқы оның мəмлекетлик Суверенитетиниң ўəкили ҳəм дəреги болып табылады. Халық Республиканың Конституциясы ҳəм тийкарында тиккелей жəне халық депутатларының Кеңеслери арқалы мəмлекетлик ҳəкимиятты иске асырады. Қарақалпақстан Республикасы мəмлекетлик ҳəкимиятын толық бийлигин пайдалана отырып, халықлар дослығын беккемлейди.",
      EN: "The multinational people of the Republic of Karakalpakstan shall determine and constitute a State on their sovereign territory. The people, relying on the Constitution and laws, directly and unambiguously through the elected deputies, exercise State administration. The Government of the Republic of Karakalpakstan authorized by the government to strengthen the friendship of peoples. The State provides all its citizens residing in the territory of the Republic of Karakalpakstan with equal rights and freedoms, regardless of their political views, religious beliefs and other differences.",
      PL: "Wielonarodowy naród Republiki Karakalpakstanu określa i konstytuuje Państwo na swoim suwerennym terytorium. Naród, opierając się na Konstytucji i ustawach, bezpośrednio i jednoznacznie poprzez wybranych deputowanych sprawuje władzę państwową. Rząd Republiki Karakalpakstanu umacnia przyjaźń narodów. Państwo zapewnia wszystkim obywatelom równe prawa i wolności, niezależnie od poglądów politycznych, wyznania czy innych różnic."
    },
    full: {
      RU: "Женщины и мужчины имеют равные права.",
      KK: "Ҳаял-қызлар ҳәм ер адамлар теңдей ҳуқықларға ийе.",
      EN: "Women and men have equal rights.",
      PL: "Kobiety i mężczyźni mają równe prawa."
    },
    comp: {
      RU: "СООТВЕТСТВУЕТ. Принцип равноправия женщин и мужчин прямо соответствует норме ст. 3 Декларации о равенстве всех граждан без различий.",
      KK: "МУЎАПЫҚ. Ҳаял-қызлар ҳәм ер адамлардың тең ҳуқықлылығы принципи Декларация 3-статьясындағы барлық пухараларға парықсыз тең ҳуқықлар кепилленеди деген нормаға тиккелей сәйкес келеди.",
      EN: "MATCHES. The principle of equality between women and men directly corresponds to the norm of Art. 3 of the Declaration on the equality of all citizens without distinction.",
      PL: "ZGODNE. Zasada równouprawnienia kobiet i mężczyzn jest bezpośrednio zgodna z normą art. 3 Deklaracji o równości wszystkich obywateli bez różnicy."
    }
  },
  {
    id: 45,
    title: "45-статья",
    cat: "green",
    declRefLabel: {
      RU: "2. ПРАВОПОРЯДОК",
      KK: "2. ҲУҚУҚТЫҚ ТӘРТИП",
      EN: "2. LEGAL ORDER",
      PL: "2. PORZĄDEK PRAWNY"
    },
    declFull: {
      RU: "Республика Каракалпакстан проводит государственное управление, принятие законов и указов и назначает судебные органы, осуществляющие надзор над исполнением принятого законодательства. Совет Министров Республики Каракалпакстан является высшим исполнительным и управляющим органом, осуществляющий принятие необходимых законов, управление и надзор над исполнением принятых законов. Совет Министров Республики Каракалпакстан является верховным исполнительным органом и органом управления. Верховный Суд Республики Каракалпакстан является Высшим Судом. Верховный Совет Республики Каракалпакстан назначает Генерального Прокурора осуществляющего надзор над исполнением закона, правопорядок и равного права всех перед законом.",
      KK: "Қарақалпақстан Республикасында мəмлекетлик ҳəкимият ҳəм нызам шығарыў, атқарыўшы ҳəм суд уйымларына бөлистириў принципине муўапық əмелге асырылады. -Қарақалпақстан Республикасының Жоқарғы Кеңеси Қарақалпақстан Республикасы мəмлекетлик ҳəкимиятының жоқары уйымы болып табылады, ол өз жумысында нызам шығарыў, бийлик етиў ҳəм қадағалаў ўазыйпаларын əмелге асырады. -Қарақалпақстан Республикасының Министрлер Кеңеси Қарақалпақстан Республикасының Мəмлекетлик ҳəкимиятының жоқарғы атқарыўшы ҳəм бийлик етиўши уйымы болып табылады. -Қарақалпақстан Республикасының Жоқарғы Суды Қарақалпақстан Республикасының Жоқарғы Суд уйымы болып табылады. -Қарақалпақстан Республикасы Жоқарғы Совети тайынлайтуғын Қарақалпақстан Республикасының прокуроры нызамлардың саррас ҳəм бир қыйлы орынланыўын жоқары дəрежеде бақлап отырады.",
      EN: "The Republic of Karakalpakstan conducts public administration, enacts laws and decrees, and appoints judicial bodies that oversee the implementation of the adopted legislation. The Supreme Council of the Republic of Karakalpakstan is the supreme body of state administration, which makes the necessary laws, manages and supervises the implementation of the adopted laws. The Council of Ministers of the Republic of Karakalpakstan is the supreme executive body and governing body. The Supreme Court of the Republic of Karakalpakstan is the Highest Court. The Supreme Council of the Republic of Karakalpakstan appoints the Prosecutor General to oversee the implementation of the law, the rule of law and the equal rights of all before the law.",
      PL: "Republika Karakalpakstanu prowadzi administrację państwową, uchwala ustawy i dekrety oraz powołuje organy sądowe sprawujące nadzór nad wykonaniem przyjętego ustawodawstwa. Najwyższa Rada Republiki Karakalpakstanu jest najwyższym organem administracji państwowej. Rada Ministrów Republiki Karakalpakstanu jest najwyższym organem wykonawczym i zarządzającym. Najwyższy Sąd Republiki Karakalpakstanu jest najwyższym organem sądowym. Najwyższa Rada powołuje Prokuratora Generalnego sprawującego nadzór nad przestrzeganiem prawa i równością obywateli wobec prawa."
    },
    full: {
      RU: "Все граждане несут обязанности, закрепленные за ними в Конституции.",
      KK: "Барлық пуқаралар өзлерине Конституцияда бекитилген миннетлерди атқарады.",
      EN: "All citizens bear the duties assigned to them by the Constitution.",
      PL: "Wszyscy obywatele ponoszą obowiązki nałożone na nich w Konstytucji."
    },
    comp: {
      RU: "СООТВЕТСТВУЕТ. Выполнение гражданами обязанностей соответствует принципу ст. 2 Декларации об осуществлении управления на основе законов.",
      KK: "МУЎАПЫҚ. Пухаралардың Конституция арқалы белгиленген миннетлемелерди орынлаўы Декларацияның 2-статьясындағы халықтың нызамларға сүйенип мәмлекетлик басқарыўды әмелге асырыў принципине муўапық.",
      EN: "MATCHES. The fulfillment of duties by citizens corresponds to the principle of Art. 2 of the Declaration on the exercise of governance based on laws.",
      PL: "ZGODNE. Wypełnianie obowiązków przez obywateli odpowiada zasadzie art. 2 Deklaracji o sprawowaniu rządów na podstawie ustaw."
    }
  },
  {
    id: 46,
    title: "46-статья",
    cat: "green",
    declRefLabel: {
      RU: "3. ОБЩЕСТВЕННОЕ СОГЛАСИЕ",
      KK: "3. ЖӘМИЙЕТЛИК ТАТЫЎЛЫҚ",
      EN: "3. SOCIAL HARMONY",
      PL: "3. ZGODA SPOŁECZNA"
    },
    declFull: {
      RU: "Многонациональный народ Республики Каракалпакстан определяет и составляет Государство на своей суверенной территории. Народ, опираясь на Конституцию и законы непосредственно и однозначно через избранных депутатов осуществляет государственное управление. Правительство Республики Каракалпакстан уполномоченное властью осуществляет укрепление дружбы народов. Государство всем своим гражданам проживающим на территории Республики Каракалпакстан, не смотря на их политические взгляды, веру исповедания и другие отличия, обеспечивает всех равными правами и свободами.",
      KK: "Қарақалпақстан Республикасының көп миллетли халқы оның мəмлекетлик Суверенитетиниң ўəкили ҳəм дəреги болып табылады. Халық Республиканың Конституциясы ҳəм тийкарында тиккелей жəне халық депутатларының Кеңеслери арқалы мəмлекетлик ҳəкимиятты иске асырады. Қарақалпақстан Республикасы мəмлекетлик ҳəкимиятын толық бийлигин пайдалана отырып, халықлар дослығын беккемлейди.",
      EN: "The multinational people of the Republic of Karakalpakstan shall determine and constitute a State on their sovereign territory. The people, relying on the Constitution and laws, directly and unambiguously through the elected deputies, exercise State administration. The Government of the Republic of Karakalpakstan authorized by the government to strengthen the friendship of peoples. The State provides all its citizens residing in the territory of the Republic of Karakalpakstan with equal rights and freedoms, regardless of their political views, religious beliefs and other differences.",
      PL: "Wielonarodowy naród Republiki Karakalpakstanu określa i konstytuuje Państwo na swoim suwerennym terytorium. Naród, opierając się na Konstytucji i ustawach, bezpośrednio i jednoznacznie poprzez wybranych deputowanych sprawuje władzę państwową. Rząd Republiki Karakalpakstanu umacnia przyjaźń narodów. Państwo zapewnia wszystkim obywatelom równe prawa i wolności, niezależnie od poglądów politycznych, wyznania czy innych różnic."
    },
    full: {
      RU: "Граждане обязаны соблюдать Конституцию и законы, уважать права, свободы, честь и достоинство других людей.",
      KK: "Пуқаралар Конституция ҳәм нызамларға әмел етиўге, басқа шахслардың ҳуқықларын, еркинликлерин, ар-намысын ҳәм қәдир-қымбатын ҳүрметлеўге миннетли.",
      EN: "Citizens are obliged to comply with the Constitution and the laws, and to respect the rights, freedoms, honor, and dignity of others.",
      PL: "Obywatele są zobowiązani do przestrzegania Konstytucji i ustaw, poszanowania praw, wolności, czci i godności innych ludzi."
    },
    comp: {
      RU: "СООТВЕТСТВУЕТ. Обязанность соблюдать законы и уважать права других соответствует принципу ст. 3 Декларации о согласии и равенстве.",
      KK: "МУЎАПЫҚ. Конституция ҳәм нызамларды сақлаў, басқалардың ҳуқықларын ҳүрмет етиў миннети Декларацияның 3-статьясындағы теңлик ҳәм жәмийетлик татыўлық принципине муўапық.",
      EN: "MATCHES. The obligation to observe laws and respect the rights of others corresponds to the principle of Art. 3 of the Declaration on harmony and equality.",
      PL: "ZGODNE. Obowiązek przestrzegania ustaw i szanowania praw innych osób odpowiada zasadzie art. 3 Deklaracji o zgodzie i równości."
    }
  },
  {
    id: 47,
    title: "47-статья",
    cat: "green",
    declRefLabel: {
      RU: "6. КУЛЬТУРНОЕ НАСЛЕДИЕ",
      KK: "6. МӘДЕНИЙ МИЙРАС",
      EN: "6. CULTURAL HERITAGE",
      PL: "6. DZIEDZICTWO KULTUROWE"
    },
    declFull: {
      RU: "Территория Суверенной Республики Каракалпакстан является неделимой и цельной территорией Республики Каракалпакстан и его границы не подлежат изменению без решения Верховного Совета и народа Республики Каракалпакстан. Территория Республики Каракалпакстан, его природные богатства, богатства ее недр и подземные ископаемые, растения, животный мир, созданное на территории Каракалпакстан народно хозяйственная инфраструктура, культурные и исторические наследия, научно технический и культурный потенциал является исключительной собственностью Республики Каракалпакстан и основой его Суверенитета.",
      KK: "Қарақалпақстан Суверенли Республикасының аймағы бирден-бир бөлинбес аймақ болып табылады ҳəм Республика Жоғарғы Кеңесиниң жəне оның халқының келисимисиз өзгертилмейди. Жер, оның қазылма байлықлары, өсимликлер ҳəм ҳайуанатлар дүньясы, басқа да тəбийий қорлары, сондай-ақ Республиканың аймағында дүзилген пүткил экономикалық, илимий техникалық ҳəм мəдений потенциал Қарақалпақстан Республикасының айрықша меншиги, оның Суверенитетиниң материаллық тийкары болып табылады.",
      EN: "The territory of the Sovereign Republic of Karakalpakstan is an indivisible and integral territory of the Republic Karakalpakstan and its borders are not subject to change without the decision of the Supreme Council and the people of the Republic Karakalpakstan The territory of the Republic of Karakalpakstan, its natural resources, the riches of its subsoil and underground fossils, plants, wildlife, the national economic infrastructure created on the territory of Karakalpakstan, cultural and historical heritage, scientific, technical and cultural potential is the exclusive property of the Republic of Karakalpakstan. The Republic of Karakalpakstan and the basis of its Sovereignty.",
      PL: "Terytorium Suwerennej Republiki Karakalpakstanu jest niepodzielne i integralne, a jego granice nie mogą być zmieniane bez decyzji Najwyższej Rady i narodu Republiki. Ziemia, bogactwa naturalne, zasoby podziemne, flora i fauna, infrastruktura gospodarcza, dziedzictwo kulturowe i historyczne, potencjał naukowy i techniczny są wyłączną własnością Republiki Karakalpakstanu i podstawą jej suwerenności."
    },
    full: {
      RU: "Граждане обязаны оберегать историческое, духовное и культурное наследие народа Каракалпакстана. Памятники культуры охраняются государством.",
      KK: "Пуқаралар Қарақалпақстан халқының тарийхый, руўхый ҳәм мәдений мийрасларын сақлаўға миннетли. Мәденият естеликлери мәмлекет тәрепинен қорғалады.",
      EN: "Citizens are obliged to preserve the historical, spiritual, and cultural heritage of the people of Karakalpakstan. Cultural monuments are protected by the state.",
      PL: "Obywatele są zobowiązani do ochrony dziedzictwa historycznego, duchowego i kulturowego narodu Karakałpakstanu. Zabytki kultury podlegają ochronie państwa."
    },
    comp: {
      RU: "СООТВЕТСТВУЕТ. Обязанность оберегать наследие прямо соответствует норме ст. 6 Декларации об исключительной собственности РК на эти ценности.",
      KK: "МУЎАПЫҚ. Тарийхый, руўхый ҳәм мәдений мийрасты сақлаў министрлиги Декларацияның 6-статьясындағы мәдений-тарийхый мийрас Қарақалпақстан Республикасының айрықша мүлки деген нормаға тиккелей муўапық келеди.",
      EN: "MATCHES. The duty to protect heritage directly corresponds to the norm of Art. 6 of the Declaration on the exclusive property of the RK over these values.",
      PL: "ZGODNE. Obowiązek ochrony dziedzictwa jest bezpośrednio zgodny z normą art. 6 Deklaracji o wyłącznej własności RK do tych wartości."
    }
  },
  {
    id: 48,
    title: "48-статья",
    cat: "green",
    declRefLabel: {
      RU: "6. ПРИРОДНЫЕ РЕСУРСЫ",
      KK: "6. ТАБИЙҒЫЙ РЕСУРСЛАР",
      EN: "6. NATURAL RESOURCES",
      PL: "6. ZASOBY NATURALNE"
    },
    declFull: {
      RU: "Территория Суверенной Республики Каракалпакстан является неделимой и цельной территорией Республики Каракалпакстан и его границы не подлежат изменению без решения Верховного Совета и народа Республики Каракалпакстан. Территория Республики Каракалпакстан, его природные богатства, богатства ее недр и подземные ископаемые, растения, животный мир, созданное на территории Каракалпакстан народно хозяйственная инфраструктура, культурные и исторические наследия, научно технический и культурный потенциал является исключительной собственностью Республики Каракалпакстан и основой его Суверенитета.",
      KK: "Қарақалпақстан Суверенли Республикасының аймағы бирден-бир бөлинбес аймақ болып табылады ҳəм Республика Жоғарғы Кеңесиниң жəне оның халқының келисимисиз өзгертилмейди. Жер, оның қазылма байлықлары, өсимликлер ҳəм ҳайуанатлар дүньясы, басқа да тəбийий қорлары, сондай-ақ Республиканың аймағында дүзилген пүткил экономикалық, илимий техникалық ҳəм мəдений потенциал Қарақалпақстан Республикасының айрықша меншиги, оның Суверенитетиниң материаллық тийкары болып табылады.",
      EN: "The territory of the Sovereign Republic of Karakalpakstan is an indivisible and integral territory of the Republic Karakalpakstan and its borders are not subject to change without the decision of the Supreme Council and the people of the Republic Karakalpakstan The territory of the Republic of Karakalpakstan, its natural resources, the riches of its subsoil and underground fossils, plants, wildlife, the national economic infrastructure created on the territory of Karakalpakstan, cultural and historical heritage, scientific, technical and cultural potential is the exclusive property of the Republic of Karakalpakstan. The Republic of Karakalpakstan and the basis of its Sovereignty.",
      PL: "Terytorium Suwerennej Republiki Karakalpakstanu jest niepodzielne i integralne, a jego granice nie mogą być zmieniane bez decyzji Najwyższej Rady i narodu Republiki. Ziemia, bogactwa naturalne, zasoby podziemne, flora i fauna, infrastruktura gospodarcza, dziedzictwo kulturowe i historyczne, potencjał naukowy i techniczny są wyłączną własnością Republiki Karakalpakstanu i podstawą jej suwerenności."
    },
    full: {
      RU: "Граждане обязаны бережно относиться к окружающей природной среде.",
      KK: "Пуқаралар қоршап турған тәбийий орталыққа итиятлы қатнас жасаўға миннетли.",
      EN: "Citizens are obliged to treat the surrounding natural environment with care.",
      PL: "Obywatele są zobowiązani do dbałości o środowisko naturalne."
    },
    comp: {
      RU: "СООТВЕТСТВУЕТ. Бережное отношение к среде соответствует принципу ст. 6 Декларации о защите природных богатств как собственности РК.",
      KK: "МУЎАПЫҚ. Тәбийғый орайға феноменаллық қараў министрлиги Декларацияның 6-статьясындағы тәбийғый байлықлар Қарақалпақстан Республикасының айрықша мүлки болып, мәмлекет тәрепинен қорғалады деген принципке муўапық.",
      EN: "MATCHES. Careful treatment of the environment corresponds to the principle of Art. 6 of the Declaration on protecting natural riches as the property of the RK.",
      PL: "ZGODNE. Troska o środowisko odpowiada zasadzie art. 6 Deklaracji o ochronie bogactw naturalnych jako własności RK."
    }
  },
  {
    id: 49,
    title: "49-статья",
    cat: "amber",
    declRefLabel: {
      RU: "5. ФИНАНСОВЫЙ СУВЕРЕНИТЕТ",
      KK: "5. ФИНАНСЛЫҚ СУВЕРЕНИТЕТ",
      EN: "5. FINANCIAL SOVEREIGNTY",
      PL: "5. SUWERENNOŚĆ FINANSOWA"
    },
    declFull: {
      RU: "Республика Каракалпакстан осуществляет защиту Конституционных Прав своих граждан, защиту их свобод, защиту их права на труд, защиту их собственности и определяет меры по осуществлению защиты, осуществляет организацию общественной жизни, осуществляет социально-культурное и экономическое развитие, осуществляет внешнеэкономическую деятельность, создание свободных экономических зон, осуществляет управление финансово-бюджетной системы, определяет основы оплаты труда и ценообразование, налоговое управление, защиту своей территории и управление природными ресурсами.",
      KK: "Қарақалпақстан Республикасы пухараларының Конституциялық ҳуқықларын, еркинликлерин ҳəм мийнетлерин, меншик қатнасықларын əмелге асырыў тəртибин, халық хожалығына ҳəм социаллық мəдений қурылысқа басшылық етиўди, сыртқы экономикалық жумысты шөлкемлестириўди, соның ишинде еркин кəрханашылық зоналарын, бюджетлик-финанс системасын мийнетке ҳақы төлеў ҳəм баҳа қойыў, салық салыў,қоршап турған орталықты қорғаў ҳəм тəбийий қорлардан пайдаланыў ислерин нызам менен ретлестириўди өз бетинше əмелге асырады.",
      EN: "The Republic of Karakalpakstan shall protect the Constitutional Rights of its citizens, the protection of their freedoms and protect their the right to work, protection of their property and defines the measures for the implementation of protection, organizes public life, carries out socio-cultural and economic development, provides externally economic activity, the creation of free economic zones, manages financial budget the system determines the basis of wage and pricing, tax administration, protection of its territory and management of natural resources.",
      PL: "Republika Karakalpakstanu chroni konstytucyjne prawa swoich obywateli, ich wolności, prawo do pracy, własności, organizuje życie społeczne, prowadzi rozwój społeczno-kulturalny i gospodarczy, działalność zagraniczną, tworzy wolne strefy ekonomiczne, zarządza systemem finansowo-budżetowym, określa podstawy wynagrodzeń i cen, prowadzi administrację podatkową, chroni swoje terytorium i zarządza zasobami naturalnymi."
    },
    full: {
      RU: "Граждане обязаны платить установленные законом налоги и местные сборы.",
      KK: "Пуқаралар нызам менен белгиленген салықларды ҳәм жергиликли жыйымларды төлеўге миннетли.",
      EN: "Citizens are obliged to pay taxes and local fees established by law.",
      PL: "Obywatele są zobowiązani do płacenia określonych ustawą podatków oraz opłat lokalnych."
    },
    comp: {
      RU: "УСЛОВНО. Обязанность по уплате налогов не противоречит Декларации. Однако в Конституции налоговая система определяется на основе законов Узбекистана, а в статье 5 Декларации провозглашено право Республики Каракалпакстан самостоятельно определять свою бюджетно-финансовую систему.",
      KK: "ШӘРТЛИ ҚАЙШЫ. Салық төлеў миннети өзи бойынша Декларацияға қайшы емес. Бирақ Конституцияда салық системасы Өзбекстан нызамлары тийкарында белгиленеди, ал Декларация 5-статьясында Қарақалпақстан Республикасының бюджет-финанс системасын өзи белгилеў ҳуқықы жəрияланған.",
      EN: "CONDITIONAL. The obligation to pay taxes itself does not contradict the Declaration. However, the Constitution defines the tax system based on the laws of Uzbekistan, and Article 5 of the Declaration proclaims the Republic of Karakalpakstan’s right to self-determination of its budget and financial system.",
      PL: "WARUNKOWE. Sam obowiązek zapłaty podatku nie jest sprzeczny z deklaracją. Konstytucja określa jednak system podatkowy na podstawie przepisów Uzbekistanu, a Artykuł 5 deklaracji głosi prawo Republiki Karakalpakstanu do samostanowienia swojego budżetu i systemu finansowego."
    }
  },
  {
    id: 50,
    title: "50-статья",
    cat: "red",
    declRefLabel: {
      RU: "8. ГРАЖДАНСТВО",
      KK: "8. ПУҚАРАЛЫҚ",
      EN: "8. CITIZENSHIP",
      PL: "8. OBYWATELSTWO"
    },
    declFull: {
      RU: "Граждане Республики Каракалпакстан, ранее являвшиеся гражданами СССР и Узбекской ССР, теперь являются гражданами Республики Каракалпакстан.",
      KK: "Қарақалпақстан Республикасы өзиниң пуқаралығына ийе болады, Республика пухаралары соның менен бир ўақытта Өзбекстан ССРның ҳəм СССРдың  пухаралары болып табылады.",
      EN: "Citizens of the Republic of Karakalpakstan who were citizens of the USSR and the Uzbek SSR are now citizens of the Republic of Karakalpakstan.",
      PL: "Obywatele Republiki Karakalpakstanu, którzy wcześniej byli obywatelami ZSRR i Uzbeckiej SRR, stają się obywatelami Republiki Karakalpakstanu."
    },
    full: {
      RU: "Защита Республики Узбекистан и Республики Каракалпакстан — долг каждого гражданина Республики Каракалпакстан. Граждане обязаны нести военную или альтернативную службу в порядке, установленном законом.",
      KK: "Өзбекстан Республикасын ҳәм Қарақалпақстан Республикасын қорғаў – Қарақалпақстан Республикасының ҳәр бир пуқарасының миннети. Пуқаралар нызамда белгиленген тәртипте әскерий ямаса альтернативалы хызметти өтеўге миннетли.",
      EN: "The defense of the Republic of Uzbekistan and the Republic of Karakalpakstan is the duty of every citizen of the Republic of Karakalpakstan. Citizens are obliged to perform military or alternative service in the manner prescribed by law.",
      PL: "Obrona Republiki Uzbekistanu oraz Republiki Karakałpakstanu jest obowiązkiem każdego obywatela Republiki Karakałpakstanu. Obywatele są zobowiązani do odbycia służby wojskowej lub alternatywnej w trybie określonym ustawą."
    },
    comp: {
      RU: "ПРОТИВОРЕЧИЕ. Статья 8 определяет гражданина Республики Каракалпакстан исключительно как гражданина Республики Каракалпакстан. В то время как в Конституции «защита Республики Узбекистан и Республики Каракалпакстан» объявлена обязанностью каждого гражданина, гражданин Республики Каракалпакстан обязан защищать и Узбекистан - это нарушает принцип гражданства суверенного государства.",
      KK: "ҚАЙШЫ. Декларация 8-статьясында Қарақалпақстан Республикасының пухарасы тек ғана Қарақалпақстан Республикасының пухарасы деп белгиленген. Конституцияда болса «Өзбекстан Республикасы ҳәм Қарақалпақстан Республикасын қорғаў» ҳәр бир пухараның миннети деп жәрияланып, Қарақалпақстан Республикасы пухарасы Өзбекстанды да қорғаўға мәжбүр - бул суверен мәмлекет пухаралығы принципин бузады.",
      EN: "CONTRADICTION. Article 8 stipulates that a citizen of the Republic of Karakalpakstan is only a citizen of the Republic of Karakalpakstan. In the Constitution, the protection of the Republic of Uzbekistan and the Republic of Karakalpakstan is declared the duty of every citizen, and the citizen of the Republic of Karakalpakstan is obliged to protect Uzbekistan as well - this violates the principle of citizenship of a sovereign state.",
      PL: "SPRZECZNOŚĆ. Artykuł 8 stanowi, że obywatel Republiki Karakalpakstanu jest tylko obywatelem Republiki Karakalpakstanu. W konstytucji Ochrona Republiki Uzbekistanu i Republiki Karakalpakstanu jest uznawana za obowiązek każdego obywatela, a obywatel Republiki Karakalpakstanu jest również zobowiązany do ochrony Uzbekistanu - narusza to zasadę obywatelstwa suwerennego państwa."
    }
  },
  {
    id: 51,
    title: "51-статья",
    cat: "red",
    declRefLabel: {
      RU: "5. ЭКОНОМИЧЕСКАЯ СВОБОДА",
      KK: "5. ЭКОНОМИКАЛЫҚ ЕРКИНЛИК",
      EN: "5. ECONOMIC FREEDOM",
      PL: "5. WOLNOŚĆ EKONOMICZNA"
    },
    declFull: {
      RU: "Республика Каракалпакстан осуществляет защиту Конституционных Прав своих граждан, защиту их свобод, защиту их права на труд, защиту их собственности и определяет меры по осуществлению защиты, осуществляет организацию общественной жизни, осуществляет социально-культурное и экономическое развитие, осуществляет внешнеэкономическую деятельность, создание свободных экономических зон, осуществляет управление финансово-бюджетной системы, определяет основы оплаты труда и ценообразование, налоговое управление, защиту своей территории и управление природными ресурсами.",
      KK: "Қарақалпақстан Республикасы пухараларының Конституциялық ҳуқықларын, еркинликлерин ҳəм мийнетлерин, меншик қатнасықларын əмелге асырыў тəртибин, халық хожалығына ҳəм социаллық мəдений қурылысқа басшылық етиўди, сыртқы экономикалық жумысты шөлкемлестириўди, соның ишинде еркин кəрханашылық зоналарын, бюджетлик-финанс системасын мийнетке ҳақы төлеў ҳəм баҳа қойыў, салық салыў,қоршап турған орталықты қорғаў ҳəм тəбийий қорлардан пайдаланыў ислерин нызам менен ретлестириўди өз бетинше əмелге асырады.",
      EN: "The Republic of Karakalpakstan shall protect the Constitutional Rights of its citizens, the protection of their freedoms and protect their the right to work, protection of their property and defines the measures for the implementation of protection, organizes public life, carries out socio-cultural and economic development, provides externally economic activity, the creation of free economic zones, manages financial budget the system determines the basis of wage and pricing, tax administration, protection of its territory and management of natural resources.",
      PL: "Republika Karakalpakstanu chroni konstytucyjne prawa swoich obywateli, ich wolności, prawo do pracy, własności, organizuje życie społeczne, prowadzi rozwój społeczno-kulturalny i gospodarczy, działalność zagraniczną, tworzy wolne strefy ekonomiczne, zarządza systemem finansowo-budżetowym, określa podstawy wynagrodzeń i cen, prowadzi administrację podatkową, chroni swoje terytorium i zarządza zasobami naturalnymi."
    },
    full: {
      RU: "Основу экономики Каракалпакстана, направленной на развитие рыночных отношений, составляет собственность в ее различных формах. Государство гарантирует свободу экономической деятельности, предпринимательства и труда с учетом приоритетности прав потребителя, равноправие и правовую защиту всех форм собственности. Частная собственность наряду с другими формами собственности неприкосновенна и защищается государством. Собственник может быть лишен ее только в случаях и порядке, предусмотренных законом.",
      KK: "Базар қатнасықларын раўажландырыўға бағдарланған Қарақалпақстан экономикасының тийкарын меншиктиң ҳәр қыйлы түрлери қурайды. Мәмлекет тутыныўшы ҳуқықларының үстинлигин есапқа алып, экономикалық хызметке, исбилерменликке, мийнет еркинлигине, меншиктиң барлық түрлериниң тең ҳуқықлылығына ҳәм олардың ҳуқықый жақтан қорғалыўына кепиллик береди. Басқа да меншик түрлери менен бир қатарда жеке меншикке қол қатылмайды ҳәм оны мәмлекет қорғайды. Меншик ийеси оннан тек нызамда нәзерде тутылған жағдайларда ҳәм тәртипте ғана айырылыўы мүмкин.",
      EN: "The foundation of the economy of Karakalpakstan, aimed at the development of market relations, is property in its various forms. The state guarantees freedom of economic activity, entrepreneurship, and labor, taking into account the priority of consumer rights, as well as equality and legal protection of all forms of property. Private property, along with other forms of property, is inviolable and protected by the state. An owner may be deprived of property only in cases and in the manner prescribed by law.",
      PL: "Obrona Republiki Uzbekistanu oraz Republiki Karakałpakstanu jest obowiązkiem każdego obywatela Republiki Karakałpakstanu. Obywatele są zobowiązani do odbycia służby wojskowej lub alternatywnej w trybie określonym ustawą."
    },
    comp: {
      RU: "ПРОТИВОРЕЧИЕ. Статья 5 Декларации гласит, что Республика Каракалпакстан имеет право самостоятельно регулировать экономическую деятельность, предпринимательство и бюджетно-финансовую систему. В Конституции экономические основы определены в рамках Конституции Узбекистана, а экономический суверенитет Республики Каракалпакстан отменен.",
      KK: "ҚАЙШЫ. Декларацияның 5-статьясында Қарақалпақстан Республикасы экономикалық хызметти, исбилерменликти, бюджет-финанс системасын өз бетинше тәртипке салыў ҳуқықына ийе екени белгиленген. Конституцияда болса экономикалық тийкарлар Өзбекстан Конституциясы шеңберинде белгиленип, Қарақалпақстан Республикасының экономикалық суверенитети бийкар етилген.",
      EN: "CONTRADICTION. Article 5 of the Declaration states that the Republic of Karakalpakstan has the right to independently regulate economic activity, entrepreneurship, and the budget and financial system. In the Constitution, economic foundations are defined within the framework of the Constitution of Uzbekistan, and the economic sovereignty of the Republic of Karakalpakstan is abolished.",
      PL: "SPRZECZNOŚĆ. Artykuł 5 deklaracji stanowi, że Republika Karakalpakstanu ma prawo do samodzielnego regulowania działalności gospodarczej, przedsiębiorczości, systemu budżetowego i finansowego. Konstytucja określa podstawy ekonomiczne w ramach Konstytucji Uzbekistanu, a suwerenność gospodarcza Republiki Karakalpakstanu zostaje zniesiona."
    }
  },
  { id: 52, 
    title: "52-статья", cat: "green",
    declRefLabel: { 
        RU: "5. СОБСТВЕННОСТЬ", 
        KK: "5. МЕНШИК", 
        EN: "5. PROPERTY", 
        PL: "5. WŁASNOŚĆ" 
    },
    declFull: { 
        RU: "Республика Каракалпакстан осуществляет защиту Конституционных Прав своих граждан, защиту их свобод, защиту их права на труд, защиту их собственности и определяет меры по осуществлению защиты, осуществляет организацию общественной жизни, осуществляет социально-культурное и экономическое развитие, осуществляет внешнеэкономическую деятельность, создание свободных экономических зон, осуществляет управление финансово-бюджетной системы, определяет основы оплаты труда и ценообразование, налоговое управление, защиту своей территории и управление природными ресурсами.", 
        KK: "Қарақалпақстан Республикасы пухараларының Конституциялық ҳуқықларын, еркинликлерин ҳəм мийнетлерин, меншик қатнасықларын əмелге асырыў тəртибин, халық хожалығына ҳəм социаллық мəдений қурылысқа басшылық етиўди, сыртқы экономикалық жумысты шөлкемлестириўди, соның ишинде еркин кəрханашылық зоналарын, бюджетлик-финанс системасын мийнетке ҳақы төлеў ҳəм баҳа қойыў, салық салыў,қоршап турған орталықты қорғаў ҳəм тəбийий қорлардан пайдаланыў ислерин нызам менен ретлестириўди өз бетинше əмелге асырады.", 
        EN: "The Republic of Karakalpakstan shall protect the Constitutional Rights of its citizens, the protection of their freedoms and protect their the right to work, protection of their property and defines the measures for the implementation of protection, organizes public life, carries out socio-cultural and economic development, provides externally economic activity, the creation of free economic zones, manages financial budget the system determines the basis of wage and pricing, tax administration, protection of its territory and management of natural resources.", 
        PL: "Republika Karakalpakstanu chroni konstytucyjne prawa swoich obywateli, ich wolności, prawo do pracy, własności, organizuje życie społeczne, prowadzi rozwój społeczno-kulturalny i gospodarczy, działalność zagraniczną, tworzy wolne strefy ekonomiczne, zarządza systemem finansowo-budżetowym, określa podstawy wynagrodzeń i cen, prowadzi administrację podatkową, chroni swoje terytorium i zarządza zasobami naturalnymi" 
    },
    full: { 
        RU: "Собственник по своему усмотрению владеет, пользуется и распоряжается принадлежащим ему имуществом. Использование имущества не должно наносить ущерб экологической среде, нарушать права и охраняемые законом интересы граждан, юридических лиц и государства.", 
        KK: "Меншик ийеси өзине тийисли мүликке өз ықтыярынша ийелик етеди, пайдаланады ҳәм бийлик етеди. Мүликти пайдаланыў экологиялық орталыққа зәлел келтирмеўи, пуқаралардың, юридикалық тәреплердиң ҳәм мәмлекеттиң ҳуқықларын және нызам менен қозғалатуғын мәплерин бузбаўы тийис.", 
        EN: "An owner, at their discretion, possesses, uses, and disposes of the property belonging to them. The use of property must not cause damage to the ecological environment or violate the rights and legally protected interests of citizens, legal entities, and the state.", 
        PL: "Właściciel według własnego uznania posiada, korzysta i rozporządza swoim majątkiem. Korzystanie z majątku nie może szkodzić środowisku naturalnemu ani naruszać praw i prawnie chronionych interesów obywateli, osób prawnych i państwa." 
    },
    comp: {
      RU: "СООТВЕТСТВУЕТ. Принцип добровольного пользования собственником своим имуществом соответствует статье 5 Декларации о защите имущества граждан.",
      KK: "МУЎАПЫҚ. Меншик ийеси өз мүлкинен ықтыярлы түрде пайдаланады деген принцип Декларацияның 5-статьясындағы пухаралардың мүлкин қорғаў нормасына муўапық.",
      EN: "MATCHES. The principle that a property owner uses their property voluntarily complies with Article 5 of the Declaration on the protection of citizens' property.",
      PL: "ZGODNE. Zasada dobrowolnego korzystania przez właściciela z jego mienia jest zgodna z Artykułem 5 deklaracji o ochronie mienia obywateli."
    }
  },
  {
    id: 53,
    title: "53-статья",
    cat: "red",
    declRefLabel: {
      RU: "6. ИСКЛЮЧИТЕЛЬНАЯ СОБСТВЕННОСТЬ",
      KK: "6. АЙРЫҚША МҮЛК",
      EN: "6. EXCLUSIVE PROPERTY",
      PL: "6. WYŁĄCZNA WŁASNOŚĆ"
    },
    declFull: {
      RU: "Территория Суверенной Республики Каракалпакстан является неделимой и цельной территорией Республики Каракалпакстан и его границы не подлежат изменению без решения Верховного Совета и народа Республики Каракалпакстан. Территория Республики Каракалпакстан, его природные богатства, богатства ее недр и подземные ископаемые, растения, животный мир, созданное на территории Каракалпакстан народно хозяйственная инфраструктура, культурные и исторические наследия, научно технический и культурный потенциал является исключительной собственностью Республики Каракалпакстан и основой его Суверенитета.",
      KK: "Қарақалпақстан Суверенли Республикасының аймағы бирден-бир бөлинбес аймақ болып табылады ҳəм Республика Жоғарғы Кеңесиниң жəне оның халқының келисимисиз өзгертилмейди. Жер, оның қазылма байлықлары, өсимликлер ҳəм ҳайуанатлар дүньясы, басқа да тəбийий қорлары, сондай-ақ Республиканың аймағында дүзилген пүткил экономикалық, илимий техникалық ҳəм мəдений потенциал Қарақалпақстан Республикасының айрықша меншиги, оның Суверенитетиниң материаллық тийкары болып табылады.",
      EN: "The territory of the Sovereign Republic of Karakalpakstan is an indivisible and integral territory of the Republic Karakalpakstan and its borders are not subject to change without the decision of the Supreme Council and the people of the Republic Karakalpakstan The territory of the Republic of Karakalpakstan, its natural resources, the riches of its subsoil and underground fossils, plants, wildlife, the national economic infrastructure created on the territory of Karakalpakstan, cultural and historical heritage, scientific, technical and cultural potential is the exclusive property of the Republic of Karakalpakstan. The Republic of Karakalpakstan and the basis of its Sovereignty.",
      PL: "Terytorium Suwerennej Republiki Karakalpakstanu jest niepodzielne i integralne, a jego granice nie mogą być zmieniane bez decyzji Najwyższej Rady i narodu Republiki. Ziemia, bogactwa naturalne, zasoby podziemne, flora i fauna, infrastruktura gospodarcza, dziedzictwo kulturowe i historyczne, potencjał naukowy i techniczny są wyłączną własnością Republiki Karakalpakstanu i podstawą jej suwerenności."
    },
    full: {
      RU: "Земля, ее недра, воды, растительный и животный мир и другие природные ресурсы являются общенациональным богатством, подлежат рациональному использованию и охраняются государством.",
      KK: "Жер, оның қазылма байлықлары, суўлар, өсимлик ҳәм ҳайўанат дүньясы және басқа да тәбийий ресурслар улыўма миллий байлық болып табылады, олардан ақылға уғрас пайдаланыў тийис ҳәм олар мәмлекет тәрепинен қорғалады.",
      EN: "Land, its subsoil, water, flora and fauna, and other natural resources are ational wealth, subject to rational use and protected by the state.",
      PL: "Ziemia, jej zasoby, wody, świat roślinny i zwierzęcy oraz inne zasoby naturalne stanowią bogactwo ogólnonarodowe, podlegają racjonalnemu wykorzystaniu i są chronione przez państwo."
    },
    comp: {
      RU: "ПРОТИВОРЕЧИЕ. В статье 6 Декларации четко определено, что земля, ее недра, растительный и животный мир являются «исключительной собственностью Республики Каракалпакстан». В Конституции эти ресурсы называются «национальным богатством» и охраняются государством - статус «исключительной собственности» был отменен.",
      KK: "ҚАЙШЫ. Декларацияның 6-статьясында жер, жер асты байлықлары, өсимлик ҳәм ҳайўанат дүнясы «Қарақалпақстан Республикасының айрықша мүлки» деп анық белгиленген. Конституцияда болса бул байлықлар «миллий байлық» деп аталып, мәмлекет қорғайтуғыны белгиленген - «айрықша мүлк» статусы алып тасланған.",
      EN: "CONTRADICTION. Article 6 of the Declaration clearly defines land, mineral resources, flora, and fauna as the exclusive property of the Republic of Karakalpakstan. In the Constitution, these resources are designated as “national wealth” and are designated for state protection - the status of “exclusive property” has been removed." ,
      PL: "SPRZECZNOŚĆ. Artykuł 6 deklaracji jasno określa, że ziemia, zasoby mineralne, flora i fauna są wyłączną własnością Republiki Karakalpakstanu. Konstytucja określa te zasoby jako „bogactwo narodowe” i podlega ochronie Państwa - status „wyłącznej własności” został zniesiony."
    }
  },
  {
    id: 54,
    title: "54-статья",
    cat: "green",
    declRefLabel: {
      RU: "3. РАВЕНСТВО ГРАЖДАН",
      KK: "3. ПУҚАРАЛАР ТЕҢЛИГИ",
      EN: "3. EQUALITY OF CITIZENS",
      PL: "3. RÓWNOŚĆ OBYWATELI"
    },
    declFull: {
      RU: "Многонациональный народ Республики Каракалпакстан определяет и составляет Государство на своей суверенной территории. Народ, опираясь на Конституцию и законы непосредственно и однозначно через избранных депутатов осуществляет государственное управление. Правительство Республики Каракалпакстан уполномоченное властью осуществляет укрепление дружбы народов. Государство всем своим гражданам проживающим на территории Республики Каракалпакстан, не смотря на их политические взгляды, веру исповедания и другие отличия, обеспечивает всех равными правами и свободами.",
      KK: "Қарақалпақстан Республикасының көп миллетли халқы оның мəмлекетлик Суверенитетиниң ўəкили ҳəм дəреги болып табылады. Халық Республиканың Конституциясы ҳəм тийкарында тиккелей жəне халық депутатларының Кеңеслери арқалы мəмлекетлик ҳəкимиятты иске асырады. Қарақалпақстан Республикасы мəмлекетлик ҳəкимиятын толық бийлигин пайдалана отырып, халықлар дослығын беккемлейди.",
      EN: "The multinational people of the Republic of Karakalpakstan shall determine and constitute a State on their sovereign territory. The people, relying on the Constitution and laws, directly and unambiguously through the elected deputies, exercise State administration. The Government of the Republic of Karakalpakstan authorized by the government to strengthen the friendship of peoples. The State provides all its citizens residing in the territory of the Republic of Karakalpakstan with equal rights and freedoms, regardless of their political views, religious beliefs and other differences.",
      PL: "Wielonarodowy naród Republiki Karakalpakstanu określa i konstytuuje Państwo na swoim suwerennym terytorium. Naród, opierając się na Konstytucji i ustawach, bezpośrednio i jednoznacznie poprzez wybranych deputowanych sprawuje władzę państwową. Rząd Republiki Karakalpakstanu umacnia przyjaźń narodów. Państwo zapewnia wszystkim obywatelom równe prawa i wolności, niezależnie od poglądów politycznych, wyznania czy innych różnic."
    },
    full: {
      RU: "Общественными объединениями в Республике Каракалпакстан признаются профессиональные союзы, политические партии, общества ученых, женские организации, организации ветеранов и молодежи, творческие союзы, массовые движения и иные объединения граждан, зарегистрированные в установленном законом порядке.",
      KK: "Қарақалпақстан Республикасында нызам менен белгиленген тәртипте дизимге алынған кәсиплик аўқамлар, сиясий партиялар, илимпазлар жәмийетлери, ҳаял-қызлар шөлкемлери, ветеранлар ҳәм жаслар шөлкемлери, дөретиўши аўқамлар, ғалабалық ҳәрекетлер ҳәм пуқаралардың басқа да бирлеспелери жәмийетлик бирлеспелер деп танылады.",
      EN: "Public associations in the Republic of Karakalpakstan include trade unions, political parties, scholarly societies, women’s organizations, veterans’ and youth organizations, creative unions, mass movements, and other associations of citizens registered in accordance with the law.",
      PL: "Organizacjami społecznymi w Republice Karakalpakstanu są związki zawodowe, partie polityczne, stowarzyszenia naukowców, organizacje kobiece, organizacje weteranów i młodzieży, związki twórcze, ruchy masowe oraz inne zrzeszenia obywateli zarejestrowane wtrybie określonym ustawą."
    },
    comp: {
      RU: "СООТВЕТСТВУЕТ. Принцип, согласно которому общественные объединения - профессиональные союзы, политические партии и другие - регистрируются законом, соответствует статье 3 Декларации о равенстве прав граждан.",
      KK: "МУЎАПЫҚ. Жәмийетлик бирлеспелер - кәсиплик аўқамлар, сиясий партиялар ҳәм басқалар нызам менен дизимнен өткерилиўи принципи Пухаралардың ҳуқықлары теңлиги ҳаққындағы декларацияның 3-статьясына сәйкес келеди.",
      EN: "MATCHES. The principle according to which public associations—trade unions, political parties, and others—are registered by law corresponds to Article 3 of the Declaration on the Equality of Citizens’ Rights.",
      PL: "ZGODNE. Zasada, zgodnie z którą stowarzyszenia społeczne — związki zawodowe, partie polityczne i inne — są zarejestrowane w ustawie, jest zgodna z artykułem 3 deklaracji o równości praw obywateli."
    }
  },
  {
    id: 55,
    title: "55-статья",
    cat: "amber",
    declRefLabel: {
      RU: "4. ПОРЯДОК И СУВЕРЕНИТЕТ",
      KK: "4. ТӘРТИП ҲӘМ СУВЕРЕНИТЕТ",
      EN: "4. ORDER AND SOVEREIGNTY",
      PL: "4. PORZĄDEK I SUWERENNOŚĆ"
    },
    declFull: {
      RU: "Определяется верховенство законов и Конституции на территории Республики Каракалпакстан. Если со стороны правительств СССР и Узбекской ССР нарушаются права граждан Республики Каракалпакстан, то на основании существующих соглашений и законов СССР и УзССР, Республика Каракалпакстан вправе приостановить все принятые межгосударственные соглашения и договора и предъявить им ноту протеста.",
      KK: "Қарақалпақстан аймағында өзиниң ықтыярына берилген мəселелер бойынша Қарақалпақстан Республикасының Конституциясының ҳəм нызамларының үстемлиги белгиленеди. Егер СССРдың ҳəм Өзбекстан ССРның ҳуқықлық ўəкиллери шегинен шығып кетсе ҳəм Қарақалпақстан Республикасының ҳуқықларын бузатуғын болса, Республика СССРдың ҳəм Өзбекстан ССРның нызамларының, СССР ҳəм Өзбекстан ССР уйымларының басқа да актлериниң, шəртнамаларының ҳəрекет етиўин тоқтатыўға ҳəм оларға наразылық билдириўге ҳақылы.",
      EN: "The supremacy of laws and the Constitution in the territory of the Republic of Karakalpakstan is determined. If the rights of citizens of the Republic of Karakalpakstan are violated by the governments of the USSR and the Uzbek SSR, then on the basis of existing agreements and laws of the USSR and the Uzbek SSR, the Republic of Karakalpakstan has the right to suspend all interstate agreements and agreements and submit a note of protest to them.",
      PL: "Na terytorium Republiki Karakalpakstanu obowiązuje nadrzędność Konstytucji i ustaw. Jeśli prawa obywateli Republiki Karakalpakstanu są naruszane przez rządy ZSRR lub Uzbeckiej SRR, Republika ma prawo zawiesić wszystkie umowy międzypaństwowe i przedstawić im notę protestacyjną."
    },
    full: {
      RU: "Запрещается создание и деятельность политических партий, а равно других общественных объединений, имеющих целью насильственное изменение конституционного строя, выступающих против суверенитета, целостности и безопасности Республики, конституционных прав и свобод ее граждан пропагандирующих войну, социальную, национальную, религиозную и расовую вражду, посягающих на здоровье и нравственность народа, а также военизированных объединений, политических партий по национальному и религиозному признакам. Запрещается создание тайных обществ и объединений.",
      KK: "Конституциялық дүзимди күш пенен өзгертиўди мақсет етип қойған, Республиканың суверенитетине, пүтинлигине ҳәм қәўипсизлигине, оның пуқараларының конституциялық ҳуқықларына ҳәм еркинликлерине қарсы ҳәрекет ететуғын, урысты, социаллық, миллий, расалық ҳәм диний өшпенлиликти нәсиятлайтуғын, халықтың денсаўлығына ҳәм әдеп-икрамлылығына қол қататуғын сиясий партиялар, басқа да жәмийетлик бирлеспелер, сондай-ақ әскерийлестирилген бирлеспелер, миллий ҳәм диний белгилери бойынша сиясий партиялар дүзиў ҳәм олардың жумыс ислеўи қадаған етиледи. Астыртын жәмийетлер ҳәм бирлеспелер дүзиў қадаған етиледи.",
      EN: "The creation and activity of political parties or other public associations whose aims include the violent alteration of the constitutional order, opposition to the sovereignty, integrity, and security of the Republic, violation of the constitutional rights and freedoms of its citizens, propaganda of war, social, national, religious, or racial hostility, or encroachment upon the health and morality of the people, as well as militarized associations and political parties based on national or religious grounds, are prohibited. The creation of secret societies and associations is prohibited.",
      PL: "Zabrania się tworzenia i działalności partii politycznych oraz innych organizacji społecznych, których celem jest gwałtowna zmiana ustroju konstytucyjnego, występowanie przeciwko suwerenności, integralności i bezpieczeństwu Republiki, przeciwko konstytucyjnym prawom i wolnościom jej obywateli, propagowanie wojny, nienawiści społecznej, narodowej, religijnej lub rasowej, a także naruszanie zdrowia i moralności narodu, jak również tworzenia organizacji paramilitarnych oraz partii politycznych o charakterze narodowym lub religijnym. Zabrania się tworzenia tajnych stowarzyszeń i organizacji."
    },
    comp: {
      RU: "УСЛОВНО. Принцип прекращения деятельности организаций, противоречащих конституционному порядку, не противоречит Декларации. Однако понятие «конституционный порядок» включает в себя и конституционный порядок Узбекистана - это ограничивает суверенный конституционный порядок Республики Каракалпакстан.",
      KK: "ШӘРТЛИ ҚАЙШЫ. Конституциялық тәртипке қарсы шөлкемлерге шек қойыў принципи улыўма Декларацияға қайшы келмейди. Бирақ «конституциялық тәртип» түсиниги Өзбекстан конституциялық тәртибин де өз ишине алады - бул Қарақалпақстан Республикасының суверен конституциялық тәртибин шеклейди.",
      EN: "CONDITIONAL. The principle of termination of the activities of organizations that contradict the constitutional order does not contradict the Declaration. However, the concept of “constitutional order” includes the constitutional order of Uzbekistan, which limits the sovereign constitutional order of the Republic of Karakalpakstan.",
      PL: "WARUNKOWE. Zasada zaprzestania działalności organizacji sprzecznych z porządkiem konstytucyjnym nie jest sprzeczna z deklaracją. Jednak pojęcie „porządku konstytucyjnego” obejmuje również porządek konstytucyjny Uzbekistanu - ogranicza to suwerenny porządek konstytucyjny Republiki Karakalpakstanu."
    }
  },
  {
    id: 56,
    title: "56-статья",
    cat: "green",
    declRefLabel: {
      RU: "3. ОБЩЕСТВЕННОЕ УЧАСТИЕ",
      KK: "3. ЖӘМИЙЕТЛИК ҚАТНАСЫЎ",
      EN: "3. PUBLIC PARTICIPATION",
      PL: "3. UCZESTNICTWO SPOŁECZNE"
    },
    declFull: {
      RU: "Многонациональный народ Республики Каракалпакстан определяет и составляет Государство на своей суверенной территории. Народ, опираясь на Конституцию и законы непосредственно и однозначно через избранных депутатов осуществляет государственное управление. Правительство Республики Каракалпакстан уполномоченное властью осуществляет укрепление дружбы народов. Государство всем своим гражданам проживающим на территории Республики Каракалпакстан, не смотря на их политические взгляды, веру исповедания и другие отличия, обеспечивает всех равными правами и свободами.",
      KK: "Қарақалпақстан Республикасының көп миллетли халқы оның мəмлекетлик Суверенитетиниң ўəкили ҳəм дəреги болып табылады. Халық Республиканың Конституциясы ҳəм тийкарында тиккелей жəне халық депутатларының Кеңеслери арқалы мəмлекетлик ҳəкимиятты иске асырады. Қарақалпақстан Республикасы мəмлекетлик ҳəкимиятын толық бийлигин пайдалана отырып, халықлар дослығын беккемлейди.",
      EN: "The multinational people of the Republic of Karakalpakstan shall determine and constitute a State on their sovereign territory. The people, relying on the Constitution and laws, directly and unambiguously through the elected deputies, exercise State administration. The Government of the Republic of Karakalpakstan authorized by the government to strengthen the friendship of peoples. The State provides all its citizens residing in the territory of the Republic of Karakalpakstan with equal rights and freedoms, regardless of their political views, religious beliefs and other differences.",
      PL: "Wielonarodowy naród Republiki Karakalpakstanu określa i konstytuuje Państwo na swoim suwerennym terytorium. Naród, opierając się na Konstytucji i ustawach, bezpośrednio i jednoznacznie poprzez wybranych deputowanych sprawuje władzę państwową. Rząd Republiki Karakalpakstanu umacnia przyjaźń narodów. Państwo zapewnia wszystkim obywatelom równe prawa i wolności, niezależnie od poglądów politycznych, wyznania czy innych różnic."
    },
    full: {
      RU: "Государство обеспечивает соблюдение прав и законных интересов общественных объединений, создает им равные правовые возможности для участия в общественной жизни. Вмешательство государственных органов и должностных лиц в деятельность общественных объединений, равно как и вмешательство общественных объединений в деятельность государственных органов и должностных лиц не допускается.",
      KK: "Мәмлекет жәмийетлик бирлеспелердиң ҳуқықлары менен нызамлы мәплериниң сақланыўын тәмийинлейди, олардың жәмийетлик турмысқа қатнасыўы ушын теңдей ҳуқық мүмкиншиликлерин дүзеди. Мәмлекетлик уйымлардың ҳәм лаўазымлы шахслардың жумысына жәмийетлик бирлеспелердиң араласыўына, сондай-ақ жәмийетлик бирлеспелердиң жумысына мәмлекетлик уйымлардың ҳәм лаўазымлы шахслардың араласыўына да жол қойылмайды.",
      EN: "The state ensures the observance of the rights and lawful interests of public associations and provides them with equal legal opportunities to participate in public life. Interference by state bodies and officials in the activities of public associations, as well as interference by public associations in the activities of state bodies and officials, is not permitted.",
      PL: "Państwo zapewnia przestrzeganie praw i prawnie chronionych interesów organizacj społecznych oraz stwarza im równe możliwości prawne uczestnictwa w życiu publicznym. Niedopuszczalna jest ingerencja organów państwowych i urzędników w działalność organizacji społecznych, jak również ingerencja organizacji społecznych w działalność organów państwowych i urzędników."
    },
    comp: {
      RU: "СООТВЕТСТВУЕТ. Принцип, согласно которому государство обеспечивает права общественных объединений и создает условия для их равноправного участия в общественной жизни, соответствует критерию равенства в статье 3 Декларации.",
      KK: "МУЎАПЫҚ. Мәмлекет жәмийетлик бирлеспелердиң ҳуқықларын тәмийинлейди ҳәм олардың жәмийетлик турмыста тең қатнасыўына шәраят жаратады, деген принцип Декларацияның 3-статьясындағы теңлик нормасына муўапық.",
      EN: "MATCHES. The principle that the state ensures the rights of public associations and creates conditions for their equal participation in public life is consistent with the equality provision in Article 3 of the Declaration.",
      PL: "ZGODNE. Zasada zapewnienia przez państwo praw stowarzyszeń społecznych i stworzenia warunków dla ich równego udziału w życiu publicznym jest zgodna z postanowieniem o równości w artykule 3 deklaracji."
    }
  },
  {
    id: 57,
    title: "57-статья",
    cat: "green",
    declRefLabel: {
      RU: "5. ТРУДОВЫЕ ПРАВА",
      KK: "5. МИЙНЕТ ҲУҚЫҚЛАРЫ",
      EN: "5. LABOR RIGHTS",
      PL: "5. PRAWA PRACY"
    },
    declFull: {
      RU: "Республика Каракалпакстан осуществляет защиту Конституционных Прав своих граждан, защиту их свобод, защиту их права на труд, защиту их собственности и определяет меры по осуществлению защиты, осуществляет организацию общественной жизни, осуществляет социально-культурное и экономическое развитие, осуществляет внешнеэкономическую деятельность, создание свободных экономических зон, осуществляет управление финансово-бюджетной системы, определяет основы оплаты труда и ценообразование, налоговое управление, защиту своей территории и управление природными ресурсами.",
      KK: "Қарақалпақстан Республикасы пухараларының Конституциялық ҳуқықларын, еркинликлерин ҳəм мийнетлерин, меншик қатнасықларын əмелге асырыў тəртибин, халық хожалығына ҳəм социаллық мəдений қурылысқа басшылық етиўди, сыртқы экономикалық жумысты шөлкемлестириўди, соның ишинде еркин кəрханашылық зоналарын, бюджетлик-финанс системасын мийнетке ҳақы төлеў ҳəм баҳа қойыў, салық салыў,қоршап турған орталықты қорғаў ҳəм тəбийий қорлардан пайдаланыў ислерин нызам менен ретлестириўди өз бетинше əмелге асырады.",
      EN: "The Republic of Karakalpakstan shall protect the Constitutional Rights of its citizens, the protection of their freedoms and protect their the right to work, protection of their property and defines the measures for the implementation of protection, organizes public life, carries out socio-cultural and economic development, provides externally economic activity, the creation of free economic zones, manages financial budget the system determines the basis of wage and pricing, tax administration, protection of its territory and management of natural resources.",
      PL: "Republika Karakalpakstanu chroni konstytucyjne prawa swoich obywateli, ich wolności, prawo do pracy, własności, organizuje życie społeczne, prowadzi rozwój społeczno-kulturalny i gospodarczy, działalność zagraniczną, tworzy wolne strefy ekonomiczne, zarządza systemem finansowo-budżetowym, określa podstawy wynagrodzeń i cen, prowadzi administrację podatkową, chroni swoje terytorium i zarządza zasobami naturalnymi."
    },
    full: {
      RU: "Профессиональные союзы выражают и защищают социально-экономические права и интересы работников. Членство в профессиональных союзах — добровольное.",
      KK: "Кәсиплик аўқамлар хызметкерлердиң социаллық-экономикалық ҳуқықларын ҳәм мәплерин гөзлейди және қорғайды. Кәсиплик шөлкемлерге ағзалық ықтыярлы болады.",
      EN: "Trade unions express and protect the socio‑economic rights and interests of workers. Membership in trade unions is voluntary.",
      PL: "Związki zawodowe wyrażają i chronią społeczno‑ekonomiczne prawa i interesy pracowników. Członkostwo w związkach zawodowych jest dobrowolne."
    },
    comp: {
      RU: "СООТВЕТСТВУЕТ. Профсоюзы защищают социально-экономические права работников. Принцип свободы членства соответствует положению статьи 5 Декларации о защите прав граждан.",
      KK: "МУЎАПЫҚ. Кәсиплик аўқамлар жумысшылардың социаллық-экономикалық ҳуқықларын қорғайды, ағзалық еркин деген принцип Декларацияның 5-статьясындағы пуқаралар ҳуқықларын қорғаў нормасына муўапық.",
      EN: "MATCHES. Trade unions protect the socio-economic rights of employees. The principle of freedom of association corresponds to the provisions of Article 5 of the Declaration on the Protection of the Rights of Citizens.",
      PL: "ZGODNE. Związki zawodowe chronią prawa społeczno-ekonomiczne pracowników. Zasada wolności zrzeszania się jest zgodna z postanowieniami Artykułu 5 deklaracji o ochronie praw obywateli."
    }
  },
  {
    id: 58,
    title: "58-статья",
    cat: "amber",
    declRefLabel: {
      RU: "3. ПРЕДСТАВИТЕЛЬСТВО",
      KK: "3. ЎӘКИЛЛИК",
      EN: "3. REPRESENTATION",
      PL: "3. REPREZENTACJA"
    },
    declFull: {
      RU: "Многонациональный народ Республики Каракалпакстан определяет и составляет Государство на своей суверенной территории. Народ, опираясь на Конституцию и законы непосредственно и однозначно через избранных депутатов осуществляет государственное управление. Правительство Республики Каракалпакстан уполномоченное властью осуществляет укрепление дружбы народов. Государство всем своим гражданам проживающим на территории Республики Каракалпакстан, не смотря на их политические взгляды, веру исповедания и другие отличия, обеспечивает всех равными правами и свободами.",
      KK: "Қарақалпақстан Республикасының көп миллетли халқы оның мəмлекетлик Суверенитетиниң ўəкили ҳəм дəреги болып табылады. Халық Республиканың Конституциясы ҳəм тийкарында тиккелей жəне халық депутатларының Кеңеслери арқалы мəмлекетлик ҳəкимиятты иске асырады. Қарақалпақстан Республикасы мəмлекетлик ҳəкимиятын толық бийлигин пайдалана отырып, халықлар дослығын беккемлейди.",
      EN: "The multinational people of the Republic of Karakalpakstan shall determine and constitute a State on their sovereign territory. The people, relying on the Constitution and laws, directly and unambiguously through the elected deputies, exercise State administration. The Government of the Republic of Karakalpakstan authorized by the government to strengthen the friendship of peoples. The State provides all its citizens residing in the territory of the Republic of Karakalpakstan with equal rights and freedoms, regardless of their political views, religious beliefs and other differences.",
      PL: "Wielonarodowy naród Republiki Karakalpakstanu określa i konstytuuje Państwo na swoim suwerennym terytorium. Naród, opierając się na Konstytucji i ustawach, bezpośrednio i jednoznacznie poprzez wybranych deputowanych sprawuje władzę państwową. Rząd Republiki Karakalpakstanu umacnia przyjaźń narodów. Państwo zapewnia wszystkim obywatelom równe prawa i wolności, niezależnie od poglądów politycznych, wyznania czy innych różnic."
    },
    full: {
      RU: "Политические партии выражают политическую волю различных социальных слоев и групп и через своих избранных демократическим путем представителей участвуют в формировании государственной власти. Политические партии обязаны в установленном порядке представлять Жокаргы Кенесу или уполномоченному им органу публичные отчеты об источниках финансирования своей деятельности.",
      KK: "Сиясий партиялар ҳәр қыйлы социаллық қатламлардың ҳәм топарлардың сиясий еркин билдиреди және өзлериниң демократиялық жол менен сайланған ўәкиллери арқалы мәмлекетлик ҳәкимиятты дүзиўге қатнасады. Сиясий партиялар өз жумысын қаржы менен тәмийинлеў дереклери ҳаққында белгиленген тәртипте Жоқарғы Кеңеске ямаса ол ўәкиллик берген уйымға ашық есап бериўи шәрт.",
      EN: "Political parties express the political will of various social strata and groups and, through their democratically elected representatives, participate in the formation of state power. Political parties are obliged, in the prescribed manner, to submit public reports to the Jokargy Kenes or its authorized body on the sources of financing of their activities.",
      PL: "Partie polityczne wyrażają wolę polityczną różnych warstw i grup społecznych i poprzez swoich demokratycznie wybranych przedstawicieli uczestniczą w kształtowaniu władzy państwowej. Partie polityczne są zobowiązane do przedstawiania Jokargy Kenesowi lub upoważnionemu przez niego organowi publicznych sprawozdań o źródłach finansowania swojej działalności."
    },
    comp: {
      RU: "УСЛОВНО. Участие политических партий в формировании государственной власти близко к Декларации. Однако, согласно Конституции, партии обязаны отчитываться перед Верховным Советом, а этот орган действует в рамках конституции Узбекистана - полный политический плюрализм не может быть признан таким, как в Декларации. Создание каракалпакских политических партий запрещено.",
      KK: "ШӘРТЛИ ҚАЙШЫ. Сиясий партиялардың мәмлекетлик ҳәкимиятты дүзиўге қатнасыўы Декларацияға жақын. Бирақ Конституцияда партиялар Жоқарғы Кеңеске есап бериўге миннетли, ал бул орган Өзбекстан конституциялық шеңберинде жумыс ислейди — толық сиясий плюрализм Декларациядағыдай таныла алмайды. Қарақалпақша сиясий партиялар дүзиў қадаған етилген.",
      EN: "CONDITIONAL. The participation of political parties in the formation of state power is close to the Declaration. However, according to the Constitution, parties are obligated to report to the Supreme Council, and this body operates within the framework of Uzbekistan's constitution - complete political pluralism cannot be recognized as it is in the Declaration. The formation of Karakalpak political parties is prohibited.",
      PL: "WARUNKOWE. Udział partii politycznych w kształtowaniu władzy państwowej jest zbliżony do deklaracji. Jednak, zgodnie z Konstytucją, partii muszą się tłumaczyć przed Radą Najwyższą, a organ ten działa w ramach Konstytucji Uzbekistanu. Nie można uznać pełny pluralizm polityczny, jak w Deklaracji. Tworzenie каракалпакских partii politycznych jest zabronione."
    }
  },
  {
    id: 59,
    title: "59-статья",
    cat: "green",
    declRefLabel: {
      RU: "3. СВОБОДА СОВЕСТИ",
      KK: "3. ҲҮЖДАН ЕРКИНЛИГИ",
      EN: "3. FREEDOM OF CONSCIENCE",
      PL: "3. WOLNOŚĆ SUMIENIA"
    },
    declFull: {
      RU: "Многонациональный народ Республики Каракалпакстан определяет и составляет Государство на своей суверенной территории. Народ, опираясь на Конституцию и законы непосредственно и однозначно через избранных депутатов осуществляет государственное управление. Правительство Республики Каракалпакстан уполномоченное властью осуществляет укрепление дружбы народов. Государство всем своим гражданам проживающим на территории Республики Каракалпакстан, не смотря на их политические взгляды, веру исповедания и другие отличия, обеспечивает всех равными правами и свободами.",
      KK: "Қарақалпақстан Республикасының көп миллетли халқы оның мəмлекетлик Суверенитетиниң ўəкили ҳəм дəреги болып табылады. Халық Республиканың Конституциясы ҳəм тийкарында тиккелей жəне халық депутатларының Кеңеслери арқалы мəмлекетлик ҳəкимиятты иске асырады. Қарақалпақстан Республикасы мəмлекетлик ҳəкимиятын толық бийлигин пайдалана отырып, халықлар дослығын беккемлейди.",
      EN: "The multinational people of the Republic of Karakalpakstan shall determine and constitute a State on their sovereign territory. The people, relying on the Constitution and laws, directly and unambiguously through the elected deputies, exercise State administration. The Government of the Republic of Karakalpakstan authorized by the government to strengthen the friendship of peoples. The State provides all its citizens residing in the territory of the Republic of Karakalpakstan with equal rights and freedoms, regardless of their political views, religious beliefs and other differences.",
      PL: "Wielonarodowy naród Republiki Karakalpakstanu określa i konstytuuje Państwo na swoim suwerennym terytorium. Naród, opierając się na Konstytucji i ustawach, bezpośrednio i jednoznacznie poprzez wybranych deputowanych sprawuje władzę państwową. Rząd Republiki Karakalpakstanu umacnia przyjaźń narodów. Państwo zapewnia wszystkim obywatelom równe prawa i wolności, niezależnie od poglądów politycznych, wyznania czy innych różnic."
    },
    full: {
      RU: "Религиозные организации и объединения отделены от государства и равны перед законом. Государство не вмешивается в деятельность религиозных объединений. ",
      KK: "Диний шөлкемлер ҳәм бирлеспелер мәмлекеттен ажыратылған ҳәм нызам алдында тең. Мәмлекет диний бирлеспелердиң жумысына араласпайды.",
      EN: "Religious organizations and associations are separated from the state and are equal before the law. The state does not interfere in the activities of religious associations.",
      PL: "Organizacje i wspólnoty religijne są oddzielone od państwa i równe wobec prawa. Państwo nie ingeruje w działalność wspólnot religijnych."
    },
    comp: {
      RU: "СООТВЕТСТВУЕТ. Принцип отделения религиозных организаций от государства и равенства перед законом прямо соответствует положению статьи 3 Декларации о «равенстве прав независимо от религиозных убеждений.»",
      KK: "МУЎАПЫҚ. Диний уйымлардың мәмлекеттен ажыратылыўы ҳәм нызам алдында теңлиги принципи Декларация 3-статьясындағы «диний исенимлеринен қәтий нәзер тең ҳуқықлар» нормасына тикелей муўапық.",
      EN: "MATCHES. The principle of separation of religious organizations from the state and their equality before the law is directly consistent with the provision of Article 3 of the Declaration “Equality of Rights Regardless of Religious Beliefs.”",
      PL: "ZGODNE. Zasada oddzielenia organizacji religijnych od państwa i ich równości wobec prawa jest bezpośrednio zgodna z postanowieniem Artykułu 3 deklaracji „równość praw niezależnie od przekonań religijnych.”"
    }
  },
  {
    id: 60,
    title: "60-статья",
    cat: "green",
    declRefLabel: {
      RU: "4. ПОРЯДОК И ЗАКОННОСТЬ",
      KK: "4. ТӘРТИП ҲӘМ НЫЗАМЛЫЛЫҚ",
      EN: "4. ORDER AND LEGALITY",
      PL: "4. PORZĄDEK I PRAWORZĄDNOŚĆ"
    },
    declFull: {
      RU: "Определяется верховенство законов и Конституции на территории Республики Каракалпакстан. Если со стороны правительств СССР и Узбекской ССР нарушаются права граждан Республики Каракалпакстан, то на основании существующих соглашений и законов СССР и УзССР, Республика Каракалпакстан вправе приостановить все принятые межгосударственные соглашения и договора и предъявить им ноту протеста.",
      KK: "Қарақалпақстан аймағында өзиниң ықтыярына берилген мəселелер бойынша Қарақалпақстан Республикасының Конституциясының ҳəм нызамларының үстемлиги белгиленеди. Егер СССРдың ҳəм Өзбекстан ССРның ҳуқықлық ўəкиллери шегинен шығып кетсе ҳəм Қарақалпақстан Республикасының ҳуқықларын бузатуғын болса, Республика СССРдың ҳəм Өзбекстан ССРның нызамларының, СССР ҳəм Өзбекстан ССР уйымларының басқа да актлериниң, шəртнамаларының ҳəрекет етиўин тоқтатыўға ҳəм оларға наразылық билдириўге ҳақылы.",
      EN: "The supremacy of laws and the Constitution in the territory of the Republic of Karakalpakstan is determined. If the rights of citizens of the Republic of Karakalpakstan are violated by the governments of the USSR and the Uzbek SSR, then on the basis of existing agreements and laws of the USSR and the Uzbek SSR, the Republic of Karakalpakstan has the right to suspend all interstate agreements and agreements and submit a note of protest to them.",
      PL: "Na terytorium Republiki Karakalpakstanu obowiązuje nadrzędność Konstytucji i ustaw. Jeśli prawa obywateli Republiki Karakalpakstanu są naruszane przez rządy ZSRR lub Uzbeckiej SRR, Republika ma prawo zawiesić wszystkie umowy międzypaństwowe i przedstawić im notę protestacyjną."
    },
    full: {
      RU: "Роспуск, запрещение или ограничение деятельности общественных объединений могут иметь место только на основании решения суда.",
      KK: "Жәмийетлик бирлеспелерди тарқатыў, олардың жумысына тыйым салыў ямаса шеклеў тек судтың шешими тийкарында әмелге асырылады.",
      EN: "The dissolution, prohibition, or restriction of the activities of public associations may occur only on the basis of a court decision.",
      PL: "Rozwiązanie, zakaz lub ograniczenie działalności organizacji społecznych może nastąpić wyłącznie na podstawie decyzji sądu."
    },
    comp: {
      RU: "СООТВЕТСТВУЕТ. Принцип, согласно которому роспуск общественных объединений возможен только по решению суда, соответствует верховенству закона и правопорядку, изложенным в статье 4 Декларации.",
      KK: "МУЎАПЫҚ. Жәмийетлик бирлеспелерди тарқатыў тек суд қарары арқалы мүмкин деген принцип Декларация 4-статьясындағы нызам үстинлиги ҳәм ҳуқықый тәртип нормасына муўапық.",
      EN: "MATCHES. The principle that the dissolution of public associations is possible only by a court decision is in accordance with the rule of law and the norms of legal procedure contained in Article 4 of the Declaration.",
      PL: "ZGODNE. Zasada, zgodnie z którą rozwiązanie stowarzyszeń społecznych jest możliwe tylko na podstawie decyzji sądu, jest zgodna z praworządnością i normami procesu prawnego zawartymi w artykule 4 deklaracji."
    }
  },
  {
    id: 61,
    title: "61-статья",
    cat: "green",
    declRefLabel: {
      RU: "3. ПРАВА ГРАЖДАН",
      KK: "3. ПУҚАРАЛАР ҲУҚЫҚЛАРЫ",
      EN: "3. CITIZENS' RIGHTS",
      PL: "3. PRAWA OBYWATELSKIE"
    },
    declFull: {
      RU: "Многонациональный народ Республики Каракалпакстан определяет и составляет Государство на своей суверенной территории. Народ, опираясь на Конституцию и законы непосредственно и однозначно через избранных депутатов осуществляет государственное управление. Правительство Республики Каракалпакстан уполномоченное властью осуществляет укрепление дружбы народов. Государство всем своим гражданам проживающим на территории Республики Каракалпакстан, не смотря на их политические взгляды, веру исповедания и другие отличия, обеспечивает всех равными правами и свободами.",
      KK: "Қарақалпақстан Республикасының көп миллетли халқы оның мəмлекетлик Суверенитетиниң ўəкили ҳəм дəреги болып табылады. Халық Республиканың Конституциясы ҳəм тийкарында тиккелей жəне халық депутатларының Кеңеслери арқалы мəмлекетлик ҳəкимиятты иске асырады. Қарақалпақстан Республикасы мəмлекетлик ҳəкимиятын толық бийлигин пайдалана отырып, халықлар дослығын беккемлейди.",
      EN: "The multinational people of the Republic of Karakalpakstan shall determine and constitute a State on their sovereign territory. The people, relying on the Constitution and laws, directly and unambiguously through the elected deputies, exercise State administration. The Government of the Republic of Karakalpakstan authorized by the government to strengthen the friendship of peoples. The State provides all its citizens residing in the territory of the Republic of Karakalpakstan with equal rights and freedoms, regardless of their political views, religious beliefs and other differences.",
      PL: "Wielonarodowy naród Republiki Karakalpakstanu określa i konstytuuje Państwo na swoim suwerennym terytorium. Naród, opierając się na Konstytucji i ustawach, bezpośrednio i jednoznacznie poprzez wybranych deputowanych sprawuje władzę państwową. Rząd Republiki Karakalpakstanu umacnia przyjaźń narodów. Państwo zapewnia wszystkim obywatelom równe prawa i wolności, niezależnie od poglądów politycznych, wyznania czy innych różnic."
    },
    full: {
      RU: "Семья является основной ячейкой общества и имеет право на защиту общества и государства. Брак основывается на свободном согласии и равноправии сторон.",
      KK: "Шаңарақ жәмийеттиң тийкарғы буўыны болып табылады ҳәм жәмийет және мәмлекет тәрепинен орғалыў ҳуқықына ийе Неке тәреплердиң еркин келисимине ҳәм тең ҳуқықлығына тийкарланған.",
      EN: "The family is the fundamental unit of society and has the right to the protection of society and the state. Marriage is based on the free consent and equality of the parties.",
      PL: "Rodzina jest podstawową komórką społeczeństwa i ma prawo do ochrony ze strony społeczeństwa i państwa. Małżeństwo opiera się na dobrowolnej zgodzie i równości stron."
    },
    comp: {
      RU: "СООТВЕТСТВУЕТ. Принцип, согласно которому семья является основной единицей общества, а вступление в брак осуществляется на основе свободного согласия, соответствует положению статьи 3 Декларации о защите прав и свобод граждан.",
      KK: "МУЎАПЫҚ. Шаңарақ жәмийеттиң тийкарғы бирлиги, некеге отырыў еркин разылық тийкарында деген принцип Декларация 3-статьясындағы пухаралар ҳуқықлары ҳәм еркинликлерин қорғаў нормасына муўапық.",
      EN: "MATCHES. The principle that the family is the fundamental unit of society and that marriage is based on free consent is in accordance with the norm of protecting the rights and freedoms of citizens contained in Article 3 of the Declaration.",
      PL: "ZGODNE. Zasada, że rodzina jest podstawową jednostką społeczeństwa, a zawarcie małżeństwa odbywa się na podstawie wolnej zgody, jest zgodna z postanowieniem artykułu 3 deklaracji o ochronie praw i wolności obywateli."
    }
  },
  {
    id: 62,
    title: "62-статья",
    cat: "green",
    declRefLabel: {
      RU: "5. СОЦИАЛЬНЫЕ ПРАВА",
      KK: "5. СОЦИАЛЛЫҚ ҲУҚЫҚЛАР",
      EN: "5. SOCIAL RIGHTS",
      PL: "5. PRAWA SOCJALNE"
    },
    declFull: {
      RU: "Республика Каракалпакстан осуществляет защиту Конституционных Прав своих граждан, защиту их свобод, защиту их права на труд, защиту их собственности и определяет меры по осуществлению защиты, осуществляет организацию общественной жизни, осуществляет социально-культурное и экономическое развитие, осуществляет внешнеэкономическую деятельность, создание свободных экономических зон, осуществляет управление финансово-бюджетной системы, определяет основы оплаты труда и ценообразование, налоговое управление, защиту своей территории и управление природными ресурсами.",
      KK: "Қарақалпақстан Республикасы пухараларының Конституциялық ҳуқықларын, еркинликлерин ҳəм мийнетлерин, меншик қатнасықларын əмелге асырыў тəртибин, халық хожалығына ҳəм социаллық мəдений қурылысқа басшылық етиўди, сыртқы экономикалық жумысты шөлкемлестириўди, соның ишинде еркин кəрханашылық зоналарын, бюджетлик-финанс системасын мийнетке ҳақы төлеў ҳəм баҳа қойыў, салық салыў,қоршап турған орталықты қорғаў ҳəм тəбийий қорлардан пайдаланыў ислерин нызам менен ретлестириўди өз бетинше əмелге асырады.",
      EN: "The Republic of Karakalpakstan shall protect the Constitutional Rights of its citizens, the protection of their freedoms and protect their the right to work, protection of their property and defines the measures for the implementation of protection, organizes public life, carries out socio-cultural and economic development, provides externally economic activity, the creation of free economic zones, manages financial budget the system determines the basis of wage and pricing, tax administration, protection of its territory and management of natural resources.",
      PL: "Republika Karakalpakstanu chroni konstytucyjne prawa swoich obywateli, ich wolności, prawo do pracy, własności, organizuje życie społeczne, prowadzi rozwój społeczno-kulturalny i gospodarczy, działalność zagraniczną, tworzy wolne strefy ekonomiczne, zarządza systemem finansowo-budżetowym, określa podstawy wynagrodzeń i cen, prowadzi administrację podatkową, chroni swoje terytorium i zarządza zasobami naturalnymi."
    },
    full: {
      RU: "Родители обязаны содержать и воспитывать детей до их совершеннолетия. Государство и общество обеспечивают содержание, воспитание и образование детей сирот и детей, лишенных родительской опеки, поощряют благотворительную деятельность по отношению к ним.",
      KK: "Ата-аналар перзентлерин ер жеткенге шекем сақлаўға ҳәм тәрбиялаўға миннетли. Мәмлекет ҳәм жәмийет жетим балалардың ҳәм ата-аналардың қәўендерлигинен айырылған балаларды сақлаў, тәрбиялаў ҳәм олардың билим алыўын тәмийинлейди, балаларға арналған қайырқомлық жумысларын хошаметлейди.",
      EN: "Parents are obliged to support and raise their children until they reach adulthood. The state and society ensure the maintenance, upbringing, and education of orphans and children deprived of parental care, and encourage charitable activities toward them.",
      PL: "Rodzice są zobowiązani utrzymywać i wychowywać dzieci do osiągnięcia przez nie pełnoletności. Państwo i społeczeństwo zapewniają utrzymanie, wychowanie i edukację dzieci sierot oraz dzieci pozbawionych opieki rodzicielskiej, a także wspierają działalność charytatywną na ich rzecz."
    },
    comp: {
      RU: "СООТВЕТСТВУЕТ. Обязанность родителей содержать своих детей и защита государством детей-сирот соответствует принципу обеспечения социальных прав граждан, изложенному в статье 5 Декларации.",
      KK: "МУЎАПЫҚ. ААта-аналардың балаларын бағыў ўазыйпасы ҳәм мәмлекеттиң жетим балаларды қорғаўы Декларацияның 5-статьясындағы пухаралардың социаллық ҳуқықларын тәмийинлеў принципине муўапық.",
      EN: "MATCHES. The duty of parents to care for their children and the protection of orphaned children by the state are in accordance with the principle of ensuring the social rights of citizens contained in Article 5 of the Declaration.",
      PL: "ZGODNE. Obowiązek rodziców do utrzymania swoich dzieci i Ochrona Państwa sierot jest zgodny z zasadą zapewnienia praw socjalnych obywateli, określoną w artykule 5 deklaracji."
    }
  },
  {
    id: 63,
    title: "63-статья",
    cat: "green",
    declRefLabel: {
      RU: "3. РАВЕНСТВО ПЕРЕД ЗАКОНОМ",
      KK: "3. НЫЗАМ АЛДЫНДАҒЫ ТЕҢЛИК",
      EN: "3. EQUALITY BEFORE THE LAW",
      PL: "3. RÓWNOŚĆ WOBEC PRAWA"
    },
    declFull: {
      RU: "Многонациональный народ Республики Каракалпакстан определяет и составляет Государство на своей суверенной территории. Народ, опираясь на Конституцию и законы непосредственно и однозначно через избранных депутатов осуществляет государственное управление. Правительство Республики Каракалпакстан уполномоченное властью осуществляет укрепление дружбы народов. Государство всем своим гражданам проживающим на территории Республики Каракалпакстан, не смотря на их политические взгляды, веру исповедания и другие отличия, обеспечивает всех равными правами и свободами.",
      KK: "Қарақалпақстан Республикасының көп миллетли халқы оның мəмлекетлик Суверенитетиниң ўəкили ҳəм дəреги болып табылады. Халық Республиканың Конституциясы ҳəм тийкарында тиккелей жəне халық депутатларының Кеңеслери арқалы мəмлекетлик ҳəкимиятты иске асырады. Қарақалпақстан Республикасы мəмлекетлик ҳəкимиятын толық бийлигин пайдалана отырып, халықлар дослығын беккемлейди.",
      EN: "The multinational people of the Republic of Karakalpakstan shall determine and constitute a State on their sovereign territory. The people, relying on the Constitution and laws, directly and unambiguously through the elected deputies, exercise State administration. The Government of the Republic of Karakalpakstan authorized by the government to strengthen the friendship of peoples. The State provides all its citizens residing in the territory of the Republic of Karakalpakstan with equal rights and freedoms, regardless of their political views, religious beliefs and other differences.",
      PL: "Wielonarodowy naród Republiki Karakalpakstanu określa i konstytuuje Państwo na swoim suwerennym terytorium. Naród, opierając się na Konstytucji i ustawach, bezpośrednio i jednoznacznie poprzez wybranych deputowanych sprawuje władzę państwową. Rząd Republiki Karakalpakstanu umacnia przyjaźń narodów. Państwo zapewnia wszystkim obywatelom równe prawa i wolności, niezależnie od poglądów politycznych, wyznania czy innych różnic."
    },
    full: {
      RU: "Дети равны перед законом вне зависимости от происхождения и гражданского состояния родителей. Материнство и детство охраняются государством.",
      KK: "Балалар ата-аналарының шығысына ҳәм пуқаралық ҳалатына қарамастан нызам алдында тең. Аналық ҳәм балалық мәмлекет тәрепинен қорғалады.",
      EN: "Children are equal before the law regardless of their origin or the marital status of their parents. Motherhood and childhood are protected by the state.",
      PL: "Dzieci są równe wobec prawa niezależnie od pochodzenia i stanu cywilnego rodziców. Macierzyństwo i dzieciństwo znajdują się pod ochroną państwa."
    },
    comp: {
      RU: "СООТВЕТСТВУЕТ. Принцип равенства детей перед законом и государственной защиты материнства соответствует положению статьи 3 Декларации, гласящему, что всем гражданам гарантируются равные права.",
      KK: "МУЎАПЫҚ. Балалардың нызам алдында теңлиги ҳәм аналықты мәмлекет қорғайды деген принцип Декларацияның 3-статьясындағы барлық пухараларға тең ҳуқықлар кепилленеди деген нормаға муўапық.",
      EN: "MATCHES. The principle of equality of children before the law and state protection of motherhood is consistent with Article 3 of the Declaration, which states that equal rights are guaranteed to all citizens.",
      PL: "ZGODNE. Zasada równości dzieci wobec prawa i państwowej ochrony macierzyństwa jest zgodna z artykułem 3 deklaracji, który stanowi, że wszystkim obywatelom gwarantowane są równe prawa."
    }
  },
  {
    id: 64,
    title: "64-статья",
    cat: "green",
    declRefLabel: {
      RU: "3. ОБЩЕСТВЕННОЕ СОГЛАСИЕ",
      KK: "3. ЖӘМИЙЕТЛИК ТАТЫЎЛЫҚ",
      EN: "3. SOCIAL HARMONY",
      PL: "3. ZGODA SPOŁECZNA"
    },
    declFull: {
      RU: "Многонациональный народ Республики Каракалпакстан определяет и составляет Государство на своей суверенной территории. Народ, опираясь на Конституцию и законы непосредственно и однозначно через избранных депутатов осуществляет государственное управление. Правительство Республики Каракалпакстан уполномоченное властью осуществляет укрепление дружбы народов. Государство всем своим гражданам проживающим на территории Республики Каракалпакстан, не смотря на их политические взгляды, веру исповедания и другие отличия, обеспечивает всех равными правами и свободами.",
      KK: "Қарақалпақстан Республикасының көп миллетли халқы оның мəмлекетлик Суверенитетиниң ўəкили ҳəм дəреги болып табылады. Халық Республиканың Конституциясы ҳəм тийкарында тиккелей жəне халық депутатларының Кеңеслери арқалы мəмлекетлик ҳəкимиятты иске асырады. Қарақалпақстан Республикасы мəмлекетлик ҳəкимиятын толық бийлигин пайдалана отырып, халықлар дослығын беккемлейди.",
      EN: "The multinational people of the Republic of Karakalpakstan shall determine and constitute a State on their sovereign territory. The people, relying on the Constitution and laws, directly and unambiguously through the elected deputies, exercise State administration. The Government of the Republic of Karakalpakstan authorized by the government to strengthen the friendship of peoples. The State provides all its citizens residing in the territory of the Republic of Karakalpakstan with equal rights and freedoms, regardless of their political views, religious beliefs and other differences.",
      PL: "Wielonarodowy naród Republiki Karakalpakstanu określa i konstytuuje Państwo na swoim suwerennym terytorium. Naród, opierając się na Konstytucji i ustawach, bezpośrednio i jednoznacznie poprzez wybranych deputowanych sprawuje władzę państwową. Rząd Republiki Karakalpakstanu umacnia przyjaźń narodów. Państwo zapewnia wszystkim obywatelom równe prawa i wolności, niezależnie od poglądów politycznych, wyznania czy innych różnic."
    },
    full: {
      RU: "Совершеннолетние трудоспособные дети обязаны заботиться о своих родителях.",
      KK: "Ержеткен, мийнетке жарамлы балалар өзлериниң ата-аналарына ғамхорлық көрсетиўге миннетли.",
      EN: "Adult able‑bodied children are obliged to care for their parents.",
      PL: "Pełnoletnie, zdolne do pracy dzieci są zobowiązane troszczyć się o swoich rodziców."
    },
    comp: {
      RU: "СООТВЕТСТВУЕТ. Обязанность взрослых детей заботиться о своих родителях соответствует принципу общественного согласия и правопорядка, изложенному в статье 3 Декларации.",
      KK: "МУЎАПЫҚ. Ержеткен балалардың ата-аналарына ғамхорлық етиў миннетлемеси Декларацияның 3-статьясындағы жәмийетлик татыўлық ҳәм ҳуқықый тәртип принципине муўапық.",
      EN: "MATCHES. The obligation of adult children to care for their parents is in accordance with the principle of social harmony and legal order in Article 3 of the Declaration.",
      PL: "ZGODNE. Obowiązek dorosłych dzieci do opieki nad rodzicami jest zgodny z zasadą zgody społecznej i porządku prawnego określoną w artykule 3 deklaracji."
    }
  },
  {
    id: 65,
    title: "65-статья",
    cat: "amber",
    declRefLabel: {
      RU: "3. СВОБОДА СЛОВА",
      KK: "3. СӨЗ ЕРКИНЛИГИ",
      EN: "3. FREEDOM OF SPEECH",
      PL: "3. WOLNOŚĆ SŁOWA"
    },
    declFull: {
      RU: "Многонациональный народ Республики Каракалпакстан определяет и составляет Государство на своей суверенной территории. Народ, опираясь на Конституцию и законы непосредственно и однозначно через избранных депутатов осуществляет государственное управление. Правительство Республики Каракалпакстан уполномоченное властью осуществляет укрепление дружбы народов. Государство всем своим гражданам проживающим на территории Республики Каракалпакстан, не смотря на их политические взгляды, веру исповедания и другие отличия, обеспечивает всех равными правами и свободами.",
      KK: "Қарақалпақстан Республикасының көп миллетли халқы оның мəмлекетлик Суверенитетиниң ўəкили ҳəм дəреги болып табылады. Халық Республиканың Конституциясы ҳəм тийкарында тиккелей жəне халық депутатларының Кеңеслери арқалы мəмлекетлик ҳəкимиятты иске асырады. Қарақалпақстан Республикасы мəмлекетлик ҳəкимиятын толық бийлигин пайдалана отырып, халықлар дослығын беккемлейди.",
      EN: "The multinational people of the Republic of Karakalpakstan shall determine and constitute a State on their sovereign territory. The people, relying on the Constitution and laws, directly and unambiguously through the elected deputies, exercise State administration. The Government of the Republic of Karakalpakstan authorized by the government to strengthen the friendship of peoples. The State provides all its citizens residing in the territory of the Republic of Karakalpakstan with equal rights and freedoms, regardless of their political views, religious beliefs and other differences.",
      PL: "Wielonarodowy naród Republiki Karakalpakstanu określa i konstytuuje Państwo na swoim suwerennym terytorium. Naród, opierając się na Konstytucji i ustawach, bezpośrednio i jednoznacznie poprzez wybranych deputowanych sprawuje władzę państwową. Rząd Republiki Karakalpakstanu umacnia przyjaźń narodów. Państwo zapewnia wszystkim obywatelom równe prawa i wolności, niezależnie od poglądów politycznych, wyznania czy innych różnic."
    },
    full: {
      RU: "Средства массовой информации свободны и действуют в соответствии с законом. Они несут в установленном порядке ответственность за достоверность информации. Цензура не допускается.",
      KK: "Ғалаба хабар қураллары еркин ҳәм нызамға муўапық ҳәрекет етеди. Олар мәлимлемениң дурыслығы ушын белгиленген тәртипте жуўап береди. Цензураға жол қойылмайды.",
      EN: "The mass media are free and operate in accordance with the law. They bear responsibility,, in the prescribed manner, for the accuracy of the information they disseminate. Censorship is not permitted.",
      PL: "Środki masowego przekazu są wolne i działają zgodnie z ustawą. Poniosą odpowiedzialność, w trybie określonym prawem, za rzetelność przekazywanych informacji. Cenzura jest niedopuszczalna."
    },
    comp: {
      RU: "УСЛОВНО. Свобода СМИ и запрет цензуры близки к статье 5 Декларации. Однако в Конституции эта свобода гарантируется только в рамках законов Узбекистана и не может быть признана свободой СМИ суверенного государства.",
      KK: "ШӘРТЛИ ҚАЙШЫ.  Ғалаба хабар қуралларының еркинлиги ҳәм цензураға тыйым Декларация 5-статьясына жақын. Бирақ Конституцияда бул еркинлик Өзбекстан нызамлары шеңберинде ғана кепилленеди, суверен мәмлекеттиң медиа еркинлиги сыпатында таныла алмайды.",
      EN: "CONDITIONAL. The prohibition of freedom of the media and censorship is close to Article 5 of the Declaration. However, in the Constitution, this freedom is guaranteed only within the framework of the laws of Uzbekistan and cannot be recognized as the freedom of the media of a sovereign state.",
      PL: "WARUNKOWE. Zakaz wolności mediów i cenzury jest zbliżony do artykułu 5 deklaracji. Jednak w Konstytucji wolność ta jest gwarantowana tylko w ramach prawa Uzbekistanu i nie może być uznana za wolność mediów suwerennego państwa."
    }
  },
  {
    id: 66,
    title: "66-статья",
    cat: "amber",
    declRefLabel: {
      RU: "1. АДМИНИСТРАТИВНОЕ УСТРОЙСТВО",
      KK: "1. АДМИНИСТРАТИВЛИК ДҮЗИЛИС",
      EN: "1. ADMINISTRATIVE STRUCTURE",
      PL: "1. USTRÓJ ADMINISTRACYJNY"
    },
    declFull: {
      RU: "Республика Каракалпакстан берет под свое правовое управление все договора и соглашения, которые Советская Республика Каракалпакстан заключила с Союзом ССР и Узбекской Социалистической Республикой и делегирует себе все полномочия. Строит необходимую структуру Государственного управления на всех административных уровнях на своей территории. Республика Каракалпакстан, далее именуемая Республика строит все свои административные округа, создает необходимые административно хозяйственные разделения и органы государственного управления, такие как судебный, арбитражный и прокурорский надзор и другие осуществляет исключительно самостоятельно.",
      KK: "Қарақалпақстан Республикасы дүзилген шəртнамалар тийкарында Өзбекстан ССРына ҳəм СССРға ықтыярлы берилетуғын ҳуқықлық ўəкиллерден басқа мəмлекетлик ҳəкимиятқа өз аймағында толық ийе болады. Республика өзиниң мəмлекетлик дүзилисин, ҳəкимшилик-аймақлық бөлиниўин мəмлекетлик ҳəкимият ҳəм басқарыў уйымлары системасын, сондай-ақ судты, арбитражды ҳəм прокурорлық бақлаў шөлкемлестириў ислерин өз бетинше белгилейди.",
      EN: "The Republic of Karakalpakstan takes under its legal control all the treaties and agreements that the Soviet Republic. The Republic of Karakalpakstan has concluded with the USSR and the Uzbek Socialist Republic and delegates all its powers to itself. Builds the necessary structure of State administration at all administrative levels on its territory, the Republic of Karakalpakstan hereinafter referred to as the Republic builds all its administrative districts, creates the necessary administrative divisions and state administration bodies, such as the judicial, arbitration and prosecutorial supervision and others are carried out exclusively independently.",
      PL: "Republika Karakalpakstanu przejmuje pod swoją jurysdykcję wszystkie traktaty i umowy zawarte przez Radziecką Republikę Karakalpakstanu z ZSRR i Uzbecką SRR oraz deleguje wszystkie uprawnienia sobie. Buduje niezbędną strukturę administracji państwowej na wszystkich poziomach administracyjnych na swoim terytorium. Republika tworzy swoje okręgi administracyjne, ustanawia podziały gospodarczo-administracyjne oraz organy państwowe, takie jak sądy, arbitraż i nadzór prokuratorski, które działają wyłącznie niezależnie."
    },
    full: {
      RU: "Республика Каракалпакстан состоит из районов, городов, поселков, аулов.",
      KK: "Қарақалпақстан Республикасы – районлардан, қалалардан, поселкалардан, аўыллардан ибарат.",
      EN: "The Republic of Karakalpakstan consists of districts, cities, towns, and villages (auls).",
      PL: "Republika Karakalpakstanu składa się z rejonów, miast, osiedli i auli."
    },
    comp: {
      RU: "УСЛОВНО. Статья 1 Декларации предусматривает, что Республика Каракалпакстан Она заявляет о том, что произвольно определяет свои административные единицы. Конституция определяет административно-территориальное устройство, но это устройство подчиняется конституционной базе Узбекистана.",
      KK: "ШӘРТЛИ ҚАЙШЫ. Декларация 1-статьясында Қарақалпақстан Республикасы өзиниң админстративлик бөлимлерин өзбасымшалық пенен белгилейди деп жәрияланган. Конституцияда ҳәкимшилик-аймақлық дүзилис белгиленген, бирақ бул дүзилис Өзбекстан конституциялық шеңберине бойсынған.",
      EN: "CONDITIONAL. Article 1 of the Declaration provides for the Republic of Karakalpakstan It is declared to arbitrarily determine its administrative units. The Constitution defines the administrative-territorial structure, but this structure is subject to the constitutional framework of Uzbekistan.",
      PL: "WARUNKOWE. Artykuł 1 deklaracji stanowi, że Republika Karakalpakstanu Deklaruje, że arbitralnie określa swoje jednostki administracyjne. Konstytucja określa układ administracyjno-terytorialny, ale ten układ podlega konstytucyjnej bazie Uzbekistanu."
    }
  },
  {
    id: 67,
    title: "67-статья",
    cat: "amber",
    declRefLabel: {
      RU: "1. ГОСУДАРСТВЕННОЕ УПРАВЛЕНИЕ",
      KK: "1. МӘМЛЕКЕТЛИК БАСҚАРЫЎ",
      EN: "1. STATE MANAGEMENT",
      PL: "1. ZARZĄDZANIE PAŃSTWOWE"
    },
    declFull: {
      RU: "Республика Каракалпакстан берет под свое правовое управление все договора и соглашения, которые Советская Республика Каракалпакстан заключила с Союзом ССР и Узбекской Социалистической Республикой и делегирует себе все полномочия. Строит необходимую структуру Государственного управления на всех административных уровнях на своей территории. Республика Каракалпакстан, далее именуемая Республика строит все свои административные округа, создает необходимые административно хозяйственные разделения и органы государственного управления, такие как судебный, арбитражный и прокурорский надзор и другие осуществляет исключительно самостоятельно.",
      KK: "Қарақалпақстан Республикасы дүзилген шəртнамалар тийкарында Өзбекстан ССРына ҳəм СССРға ықтыярлы берилетуғын ҳуқықлық ўəкиллерден басқа мəмлекетлик ҳəкимиятқа өз аймағында толық ийе болады. Республика өзиниң мəмлекетлик дүзилисин, ҳəкимшилик-аймақлық бөлиниўин мəмлекетлик ҳəкимият ҳəм басқарыў уйымлары системасын, сондай-ақ судты, арбитражды ҳəм прокурорлық бақлаў шөлкемлестириў ислерин өз бетинше белгилейди.",
      EN: "The Republic of Karakalpakstan takes under its legal control all the treaties and agreements that the Soviet Republic. The Republic of Karakalpakstan has concluded with the USSR and the Uzbek Socialist Republic and delegates all its powers to itself. Builds the necessary structure of State administration at all administrative levels on its territory, the Republic of Karakalpakstan hereinafter referred to as the Republic builds all its administrative districts, creates the necessary administrative divisions and state administration bodies, such as the judicial, arbitration and prosecutorial supervision and others are carried out exclusively independently.",
      PL: "Republika Karakalpakstanu przejmuje pod swoją jurysdykcję wszystkie traktaty i umowy zawarte przez Radziecką Republikę Karakalpakstanu z ZSRR i Uzbecką SRR oraz deleguje wszystkie uprawnienia sobie. Buduje niezbędną strukturę administracji państwowej na wszystkich poziomach administracyjnych na swoim terytorium. Republika tworzy swoje okręgi administracyjne, ustanawia podziały gospodarczo-administracyjne oraz organy państwowe, takie jak sądy, arbitraż i nadzór prokuratorski, które działają wyłącznie niezależnie."
    },
    full: {
      RU: "Образование и упразднение районов и городов, а также изменение их границ производится Жокаргы Кенесом Республики Каракалпакстан.",
      KK: "Районларды ҳәм қалаларды дүзиў ҳәм сапластырыў, сондай-ақ, олардың шегараларын өзгертиў Қарақалпақстан Республикасы Жоқарғы Кеңеси тәрепинен әмелге асырылады.",
      EN: "The formation and abolition of districts and cities, as well as the alteration of their boundaries, shall be carried out by the Jokargy Kenes of the Republic of Karakalpakstan.",
      PL: "Tworzenie i likwidacja rejonów i miast, a także zmiana ich granic, należy do kompetencji Jokargy Kenesu Republiki Karakalpakstanu."
    },
    comp: {
      RU: "УСЛОВНО. Норма о том, что образование и упразднение районов и городов определяются Верховным Советом, близка к Статье 1 Декларации. Однако этот орган действует в рамках конституции Узбекистана - суверенная независимость не признаётся полностью.",
      KK: "ШӘРТЛИ ҚАЙШЫ. Район ҳәм қалаларды дүзиў ҳәм сапластырыў Жоқарғы Кеңес тәрепинен белгиленетуғыны ҳаққындағы норма Декларацияның 1-статьясына жақын. Бирақ бул уйым Өзбекстанның конституциялық шеңберинде жумыс алып барады - суверен ғәрезсизлик толық тән алынбайды.",
      EN: "CONDITIONAL. The provision that the formation and abolition of districts and cities are determined by the Supreme Council is close to Article 1 of the Declaration. However, this body operates within the framework of Uzbekistan's constitution - sovereign independence is not fully recognized.",
      PL: "WARUNKOWE. Postanowienie, że tworzenie i likwidacja dzielnic i miast jest określone przez Radę Najwyższą, jest zbliżone do artykułu 1 deklaracji. Organ ten działa jednak w ramach Konstytucji Uzbekistanu-suwerenna niepodległość nie została w pełni uznana."
    }
  },
  {
    id: 68,
    title: "68-статья",
    cat: "amber",
    declRefLabel: {
      RU: "2. ВЕРХОВНЫЙ ОРГАН",
      KK: "2. ЖОҚАРҒЫ УЙЫМ",
      EN: "2. SUPREME BODY",
      PL: "2. ORGAN NACZELNY"
    },
    declFull: {
      RU: "Республика Каракалпакстан проводит государственное управление, принятие законов и указов и назначает судебные органы, осуществляющие надзор над исполнением принятого законодательства. Совет Министров Республики Каракалпакстан является высшим исполнительным и управляющим органом, осуществляющий принятие необходимых законов, управление и надзор над исполнением принятых законов. Совет Министров Республики Каракалпакстан является верховным исполнительным органом и органом управления. Верховный Суд Республики Каракалпакстан является Высшим Судом. Верховный Совет Республики Каракалпакстан назначает Генерального Прокурора осуществляющего надзор над исполнением закона, правопорядок и равного права всех перед законом.",
      KK: "Қарақалпақстан Республикасында мəмлекетлик ҳəкимият ҳəм нызам шығарыў, атқарыўшы ҳəм суд уйымларына бөлистириў принципине муўапық əмелге асырылады. -Қарақалпақстан Республикасының Жоқарғы Кеңеси Қарақалпақстан Республикасы мəмлекетлик ҳəкимиятының жоқары уйымы болып табылады, ол өз жумысында нызам шығарыў, бийлик етиў ҳəм қадағалаў ўазыйпаларын əмелге асырады. -Қарақалпақстан Республикасының Министрлер Кеңеси Қарақалпақстан Республикасының Мəмлекетлик ҳəкимиятының жоқарғы атқарыўшы ҳəм бийлик етиўши уйымы болып табылады. -Қарақалпақстан Республикасының Жоқарғы Суды Қарақалпақстан Республикасының Жоқарғы Суд уйымы болып табылады. -Қарақалпақстан Республикасы Жоқарғы Совети тайынлайтуғын Қарақалпақстан Республикасының прокуроры нызамлардың саррас ҳəм бир қыйлы орынланыўын жоқары дəрежеде бақлап отырады.",
      EN: "The Republic of Karakalpakstan conducts public administration, enacts laws and decrees, and appoints judicial bodies that oversee the implementation of the adopted legislation. The Supreme Council of the Republic of Karakalpakstan is the supreme body of state administration, which makes the necessary laws, manages and supervises the implementation of the adopted laws. The Council of Ministers of the Republic of Karakalpakstan is the supreme executive body and governing body. The Supreme Court of the Republic of Karakalpakstan is the Highest Court. The Supreme Council of the Republic of Karakalpakstan appoints the Prosecutor General to oversee the implementation of the law, the rule of law and the equal rights of all before the law.",
      PL: "Republika Karakalpakstanu prowadzi administrację państwową, uchwala ustawy i dekrety oraz powołuje organy sądowe sprawujące nadzór nad wykonaniem przyjętego ustawodawstwa. Najwyższa Rada Republiki Karakalpakstanu jest najwyższym organem administracji państwowej. Rada Ministrów Republiki Karakalpakstanu jest najwyższym organem wykonawczym i zarządzającym. Najwyższy Sąd Republiki Karakalpakstanu jest najwyższym organem sądowym. Najwyższa Rada powołuje Prokuratora Generalnego sprawującego nadzór nad przestrzeganiem prawa i równością obywateli wobec prawa."
    },
    full: {
      RU: "Высшим государственным представительным органом власти является Жокаргы Кенес Республики Каракалпакстан, осуществляющий законодательную власть.",
      KK: "Қарақалпақстан Республикасының Жоқарғы Кеңеси жоқары мәмлекетлик ўәкиллик уйымы болып, нызам шығарыўшы ҳәкимиятты әмелге асырады.",
      EN: "The supreme state representative body of authority is the Jokargy Kenes of the Republic of Karakalpakstan, which exercises legislative power.",
      PL: "Najwyższym państwowym organem przedstawicielskim jest Jokargy Kenes Republiki Karakalpakstanu, sprawujący władzę ustawodawczą."
    },
    comp: {
      RU: "УСЛОВНО. Статья 2 Декларации определяет Верховный Совет как «высший орган государственного управления». В Конституции Жокаргы Кенес признан высшим представительным органом, однако его деятельность ограничена в рамках Конституции Узбекистана.",
      KK: "ШӘРТЛИ ҚАЙШЫ. Декларацияның 2-статьясында Жоқарғы Кеңес «мәмлекетлик басқарыўдың жоқары уйымы» деп белгиленген. Конституцияда да Жоқарғы Кеңес жоқары ўәкилликли уйым сыпатында тән алынған, бирақ оның жумысы Өзбекстан конституциясы шеңберинде шекленген.",
      EN: "CONDITIONAL. Article 2 of the Declaration defines the Supreme Council as the highest body of state administration. The Constitution also recognizes the Supreme Council as the highest representative body, but its activities are limited within the framework of the Constitution of Uzbekistan.",
      PL: "WARUNKOWE. Artykuł 2 deklaracji określa Radę Najwyższą jako najwyższy organ administracji publicznej. Konstytucja uznaje również Radę Najwyższą za najwyższy organ przedstawicielski, ale jej działalność jest ograniczona w ramach Konstytucji Uzbekistanu."
    }
  },
  {
    id: 69,
    title: "69-статья",
    cat: "red",
    declRefLabel: {
      RU: "2. САЙЛАНЫЎ",
      KK: "2. САЙЛАНБАЛЫЛЫҚ",
      EN: "2. ELECTABILITY",
      PL: "2. WYBIERALNOŚĆ"
    },
    declFull: {
      RU: "Республика Каракалпакстан проводит государственное управление, принятие законов и указов и назначает судебные органы, осуществляющие надзор над исполнением принятого законодательства. Совет Министров Республики Каракалпакстан является высшим исполнительным и управляющим органом, осуществляющий принятие необходимых законов, управление и надзор над исполнением принятых законов. Совет Министров Республики Каракалпакстан является верховным исполнительным органом и органом управления. Верховный Суд Республики Каракалпакстан является Высшим Судом. Верховный Совет Республики Каракалпакстан назначает Генерального Прокурора осуществляющего надзор над исполнением закона, правопорядок и равного права всех перед законом.",
      KK: "Қарақалпақстан Республикасында мəмлекетлик ҳəкимият ҳəм нызам шығарыў, атқарыўшы ҳəм суд уйымларына бөлистириў принципине муўапық əмелге асырылады. -Қарақалпақстан Республикасының Жоқарғы Кеңеси Қарақалпақстан Республикасы мəмлекетлик ҳəкимиятының жоқары уйымы болып табылады, ол өз жумысында нызам шығарыў, бийлик етиў ҳəм қадағалаў ўазыйпаларын əмелге асырады. -Қарақалпақстан Республикасының Министрлер Кеңеси Қарақалпақстан Республикасының Мəмлекетлик ҳəкимиятының жоқарғы атқарыўшы ҳəм бийлик етиўши уйымы болып табылады. -Қарақалпақстан Республикасының Жоқарғы Суды Қарақалпақстан Республикасының Жоқарғы Суд уйымы болып табылады. -Қарақалпақстан Республикасы Жоқарғы Совети тайынлайтуғын Қарақалпақстан Республикасының прокуроры нызамлардың саррас ҳəм бир қыйлы орынланыўын жоқары дəрежеде бақлап отырады.",
      EN: "The Republic of Karakalpakstan conducts public administration, enacts laws and decrees, and appoints judicial bodies that oversee the implementation of the adopted legislation. The Supreme Council of the Republic of Karakalpakstan is the supreme body of state administration, which makes the necessary laws, manages and supervises the implementation of the adopted laws. The Council of Ministers of the Republic of Karakalpakstan is the supreme executive body and governing body. The Supreme Court of the Republic of Karakalpakstan is the Highest Court. The Supreme Council of the Republic of Karakalpakstan appoints the Prosecutor General to oversee the implementation of the law, the rule of law and the equal rights of all before the law.",
      PL: "Republika Karakalpakstanu prowadzi administrację państwową, uchwala ustawy i dekrety oraz powołuje organy sądowe sprawujące nadzór nad wykonaniem przyjętego ustawodawstwa. Najwyższa Rada Republiki Karakalpakstanu jest najwyższym organem administracji państwowej. Rada Ministrów Republiki Karakalpakstanu jest najwyższym organem wykonawczym i zarządzającym. Najwyższy Sąd Republiki Karakalpakstanu jest najwyższym organem sądowym. Najwyższa Rada powołuje Prokuratora Generalnego sprawującego nadzór nad przestrzeganiem prawa i równością obywateli wobec prawa."
    },
    full: {
      RU: "Жокаргы Кенес Республики Каракалпакстан состоит из 65 депутатов, избираемых по территориальным избирательным округам на многопартийной основе сроком на 5 лет. Правом быть избранным в Жокаргы Кенес Республики Каракалпакстан обладают граждане Республики Узбекистан и Республики Каракалпакстан, достигший ко дню выборов двадцати пяти лет и постоянно проживающий на территории Республики Узбекистан и Республики Каракалпакстан не менее пяти лет. Требования, предъявляемые к кандидатам в депутаты, определяются законом.",
      KK: "Қарақалпақстан Республикасы Жоқарғы Кеңеси – аймақлық сайлаў округлеринен көп партиялық тийкарында 5 жыллық мүддетке сайланатуғын 65 депутаттан ибарат. Сайлаў күни жигирма бес жасқа толған ҳәм кеминде бес жыл Өзбекстан Республикасы ҳәм Қарақалпақстан Республикасы аймағында турақлы жасап атырған Өзбекстан Республикасы ҳәм Қарақалпақстан Республикасы пуқарасы Қарақалпақстан Республикасы Жоқарғы Кеңесине сайланыў ҳуқықына ийе. Депутатлыққа кандидатларға қойылатуғын талаплар нызам менен белгиленеди.",
      EN: "The Jokargy Kenes of the Republic of Karakalpakstan consists of 65 deputies elected from territorial constituencies on a multi-party basis for a term of 5 years. Citizens of the Republic of Uzbekistan and the Republic of Karakalpakstan who have reached the age of twenty-five by the day of the election and have been permanent residents in the territory of the Republic of Uzbekistan and the Republic of Karakalpakstan for at least five years shall have the right to be elected to the Jokargy Kenes of the Republic of Karakalpakstan. The requirements for candidates for deputies shall be determined by law.",
      PL: "Jokargy Kenes Republiki Karakalpakstanu składa się z 65 deputowanych wybieranych w okręgach terytorialnych na zasadzie wielopartyjności na okres 5 lat. Prawo bycia wybranym do Jokargy Kenesu Republiki Karakalpakstanu przysługuje obywatelom Republiki Uzbekistanu i Republiki Karakalpakstanu, którzy w dniu wyborów ukończyli 25 lat i nieprzerwanie zamieszkują na terytorium Republiki Uzbekistanu i Republiki Karakalpakstanu co najmniej pięć lat. Wymogi stawiane kandydatom na deputowanych określa ustawa."
    },
    comp: {
      RU: "ПРОТИВОРЕЧИЕ. Статья 2 Декларации гласит, что депутаты Верховного Совета избираются населением Республики Каракалпакстан. В Конституции же предусмотрено, что кандидат в депутаты должен «постоянно проживать в Республике Узбекистан и Республике Каракалпакстан не менее пяти лет» - право избирать по собственному желанию народа Республики Каракалпакстан зависит от норм Узбекистана.",
      KK: "ҚАЙШЫ. Декларацияның 2-статьясында Жоқарғы Кеңес депутатлары Қарақалпақстан Республикасы халқы тәрепинен сайланатуғыны белгиленген. Конституцияда болса депутатлыққа талабан «Өзбекстан Республикасында ҳәм Қарақалпақстан Республикасында кеминде бес жыл турақлы жасаған» деп шәрт қойылған - Қарақалпақстан Республикасы халқының өз қәлеўи менен сайлаў ҳуқықы Өзбекстан нормальарына байланыслы болып қалған.",
      EN: "CONTRADICTION. Article 2 of the Declaration stipulates that the deputies of the Supreme Council are elected by the people of the Republic of Karakalpakstan. The Constitution stipulates that a candidate for deputy must have resided permanently in the Republic of Uzbekistan and the Republic of Karakalpakstan for at least five years. The right to vote by the will of the people of the Republic of Karakalpakstan remains dependent on the norms of Uzbekistan.",
      PL: "SPRZECZNOŚĆ. Artykuł 2 deklaracji stanowi, że deputowani rady Najwyższej są wybierani przez ludność Republiki Karakalpakstanu. Konstytucja przewiduje, że kandydat na deputowanych musi „stale mieszkać w Republice Uzbekistanu i Republice Karakalpakstanu przez co najmniej pięć lat” - prawo do wyboru na własne życzenie narodu Republiki Karakalpakstanu zależy od norm Uzbekistanu."
    }
  },
  {
    id: 70,
    title: "70-статья",
    cat: "red",
    declRefLabel: {
      RU: "2. ПОЛНОМОЧИЯ",
      KK: "2. ЎӘКИЛЛИКЛЕР",
      EN: "2. POWERS",
      PL: "2. UPRAWNIENIA"
    },
    declFull: {
      RU: "Республика Каракалпакстан проводит государственное управление, принятие законов и указов и назначает судебные органы, осуществляющие надзор над исполнением принятого законодательства. Совет Министров Республики Каракалпакстан является высшим исполнительным и управляющим органом, осуществляющий принятие необходимых законов, управление и надзор над исполнением принятых законов. Совет Министров Республики Каракалпакстан является верховным исполнительным органом и органом управления. Верховный Суд Республики Каракалпакстан является Высшим Судом. Верховный Совет Республики Каракалпакстан назначает Генерального Прокурора осуществляющего надзор над исполнением закона, правопорядок и равного права всех перед законом.",
      KK: "Қарақалпақстан Республикасында мəмлекетлик ҳəкимият ҳəм нызам шығарыў, атқарыўшы ҳəм суд уйымларына бөлистириў принципине муўапық əмелге асырылады. -Қарақалпақстан Республикасының Жоқарғы Кеңеси Қарақалпақстан Республикасы мəмлекетлик ҳəкимиятының жоқары уйымы болып табылады, ол өз жумысында нызам шығарыў, бийлик етиў ҳəм қадағалаў ўазыйпаларын əмелге асырады. -Қарақалпақстан Республикасының Министрлер Кеңеси Қарақалпақстан Республикасының Мəмлекетлик ҳəкимиятының жоқарғы атқарыўшы ҳəм бийлик етиўши уйымы болып табылады. -Қарақалпақстан Республикасының Жоқарғы Суды Қарақалпақстан Республикасының Жоқарғы Суд уйымы болып табылады. -Қарақалпақстан Республикасы Жоқарғы Совети тайынлайтуғын Қарақалпақстан Республикасының прокуроры нызамлардың саррас ҳəм бир қыйлы орынланыўын жоқары дəрежеде бақлап отырады.",
      EN: "The Republic of Karakalpakstan conducts public administration, enacts laws and decrees, and appoints judicial bodies that oversee the implementation of the adopted legislation. The Supreme Council of the Republic of Karakalpakstan is the supreme body of state administration, which makes the necessary laws, manages and supervises the implementation of the adopted laws. The Council of Ministers of the Republic of Karakalpakstan is the supreme executive body and governing body. The Supreme Court of the Republic of Karakalpakstan is the Highest Court. The Supreme Council of the Republic of Karakalpakstan appoints the Prosecutor General to oversee the implementation of the law, the rule of law and the equal rights of all before the law.",
      PL: "Republika Karakalpakstanu prowadzi administrację państwową, uchwala ustawy i dekrety oraz powołuje organy sądowe sprawujące nadzór nad wykonaniem przyjętego ustawodawstwa. Najwyższa Rada Republiki Karakalpakstanu jest najwyższym organem administracji państwowej. Rada Ministrów Republiki Karakalpakstanu jest najwyższym organem wykonawczym i zarządzającym. Najwyższy Sąd Republiki Karakalpakstanu jest najwyższym organem sądowym. Najwyższa Rada powołuje Prokuratora Generalnego sprawującego nadzór nad przestrzeganiem prawa i równością obywateli wobec prawa."
    },
    full: {
      RU: "К исключительным полномочиям Жокаргы Кенеса Республики Каракалпакстан относятся: 1) принятие Конституции Республики Каракалпакстан, внесение в нее изменений и дополнений; 2) принятие законов Республики Каракалпакстан, внесение в них изменений и дополнений, толкование законов Республики Каракалпакстан; 3) принятие государственных стратегических программ экономического и социального развития; 4) избрание Председателя Жокаргы Кенеса Республики Каракалпакстан и его заместителя; 5) образование Президиума Жокаргы Кенеса Республики Каракалпакстан; 6) назначение и освобождение от должности Председателя Совета Министров Республики Каракалпакстан по представлению Председателя Жокаргы Кенеса Республики Каракалпакстан, согласованному с Президентом Республики Узбекистан; 7) назначение и освобождение от должности заместителей Председателя Совета Министров Республики Каракалпакстан и членов Совета Министров Республики Каракалпакстан, образование и упразднение министерств, государственных комитетов и других органов государственного управления Республики Каракалпакстан; 8) избрание Комитета Конституционного надзора Республики Каракалпакстан, избрание и освобождение председателя и его заместителей суда Республики Каракалпакстан, председателя и его заместителя административного суда Республики Каракалпакстан; 9) исключено; 10) назначение и освобождение от должности, по представлению Президиума Жокаргы Кенеса Республики Каракалпакстан, согласованному с Генеральным прокурором Республики Узбекистан, Прокурора Республики Каракалпакстан; 11) исключено; 12) приостановление и отмена решений местных Советов народных депутатов; 13) законодательное регулирование вопросов административно-территориального устройства; 14) определение системы и полномочий республиканских и местных органов государственной власти; 15) утверждение по представлению Совета Министров Республики Каракалпакстан Государственного бюджета Республики Каракалпакстан и отчетов о его исполнении; 16) учреждение государственных наград и почетных званий Республики Каракалпакстан; 17) назначение выборов в Жокаргы Кенес Республики Каракалпакстан и местные представительные органы; образование Центральной избирательной комиссии; 18) внесение в Конституционный суд Республики Узбекистан предложения о соответствии Конституции Республики Узбекистан актов высших органов государственной власти и управления Республики Узбекистан; 19) осуществление парламентского контроля и иных полномочий, предусмотренных настоящей Конституцией.",
      KK: "Қарақалпақстан Республикасы Жоқарғы Кеңесиниң айрықша ўәкилликлерине төмендегилер тийисли: 1) Қарақалпақстан Республикасының Конституциясын қабыл етиў, оған өзгерислер ҳәм қосымшалар киргизиў; 2) Қарақалпақстан Республикасының нызамларын қабыл етиў, оларға өзгерислер ҳәм қосымшалар киргизиў, Қарақалпақстан Республикасының нызамларына түсиник бериў; 3) экономикалық ҳәм социаллық раўажланыўдың мәмлекетлик стратегиялық бағдарламаларын қабыл етиў; 4) Қарақалпақстан Республикасы Жоқарғы Кеңесиниң Баслығы ҳәм оның орынбасарын сайлаў; 5) Қарақалпақстан Республикасы Жоқарғы Кеңесиниң Президиумын дүзиў; 6) Қарақалпақстан Республикасы Жоқарғы Кеңеси Баслығының усыныўы бойынша Өзбекстан Республикасы Президентиниң келисими менен Қарақалпақстан Республикасы Министрлер Кеңесиниң Баслығын тайынлаў ҳәм лаўазымынан босатыў; 7) Қарақалпақстан Республикасы Министрлер Кеңеси Баслығының орынбасарлары ҳәм Қарақалпақстан Республикасы Министрлер Кеңесиниң ағзалары лаўазымына тайынлаў ҳәм босатыў, Қарақалпақстан Республикасының министрликлерин, мәмлекетлик комитетлерин ҳәм басқа да мәмлекетлик басқарыў уйымларын дүзиў ҳәм сапластырыў; 8) Қарақалпақстан Республикасы Конституциялық бақлаў комитетин сайлаў, Қарақалпақстан Республикасы суды баслығы ҳәм оның орынбасарларын ҳәм Қарақалпақстан Республикасы ҳәкимшилик судының баслығы ҳәм орынбасарын сайлаў ҳәм босатыў; 9) АЛЫП ТАСЛАНДЫ; 10) Қарақалпақстан Республикасы Жоқарғы Кеңеси Президиумының усынысы бойынша Өзбекстан Республикасы Бас прокурорының келисими менен, Қарақалпақстан Республикасы Прокурорын тайынлаў ҳәм лаўазымынан босатыў; 11) АЛЫП ТАСЛАНДЫ; 12) халық депутатлары жергиликли Кеңеслериниң шешимлерин тоқтатып қойыў ҳәм бийкарлаў; 13) ҳәкимшилик-аймақлық дүзилис мәселелерин нызамлар менен ретлестириў; 14) республикалық ҳәм жергиликли мәмлекетлик ҳәкимият уйымларының системасын ҳәм ўәкилликлерин белгилеў; 15) Қарақалпақстан Республикасы Министрлер Кеңесиниң усынысы менен Қарақалпақстан Республикасының мәмлекетлик бюджетин тастыйықлаў ҳәм оның орынланыўы бойынша есабатларын тастыйықлаў; 16) Қарақалпақстан Республикасының мәмлекетлик сыйлықларын ҳәм ҳүрметли атақларын шөлкемлестириў; 17) Қарақалпақстан Республикасы Жоқарғы Кеңесине ҳәм жергиликли ўәкилликли уйымларға сайлаўлар белгилеў; Орайлық сайлаў комиссиясын дүзиў; 18) Өзбекстан Республикасының жоқары мәмлекетлик ҳәкимият ҳәм басқарыў уйымлары актлериниң Өзбекстан Республикасы Конституциясына муўапықлығы ҳаққында Өзбекстан Республикасы Конституциялық судына усыныслар бериў; 19) парламент қадағалаўын ҳәм усы Конституцияда нәзерде тутылған басқа да ўәкилликлерди әмелге асырыў.",
      EN: "The exclusive powers of the Jokargy Kenes of the Republic of Karakalpakstan include: 1) adoption of the Constitution of the Republic of Karakalpakstan, and the introduction of amendments and additions thereto; 2) adoption of the laws of the Republic of Karakalpakstan, the introduction of amendments and additions thereto, and the interpretation of the laws of the Republic of Karakalpakstan; 3) adoption of state strategic programs for economic and social development; 4) election of the Chairman of the Jokargy Kenes of the Republic of Karakalpakstan and his deputy; 5) formation of the Presidium of the Jokargy Kenes of the Republic of Karakalpakstan; 6) appointment and dismissal of the Chairman of the Council of Ministers of the Republic Karakalpakstan upon the nomination of the Chairman of the Jokargy Kenes of the Republic of Karakalpakstan, agreed with the President of the Republic of Uzbekistan; 7) appointment and dismissal of the deputy chairmen of the Council of Ministers of the Republic of Karakalpakstan and members of the Council of Ministers of the Republic of Karakalpakstan, and the formation and abolition of ministries, state committees, and other bodies of state administration of the Republic of Karakalpakstan; 8) election of the Committee of Constitutional Oversight of the Republic of Karakalpakstan, the election and dismissal of the chairman and deputy chairmen of the Court of the Republic of Karakalpakstan, and the chairman and deputy chairman of the Administrative Court of the Republic of Karakalpakstan; 9) [EXCLUDED]; 10) appointment and dismissal, upon the submission of the Presidium of the Jokargy Kenes of the Republic of Karakalpakstan and with the agreement of the Prosecutor General of the Republic of Uzbekistan, of the Prosecutor of the Republic of Karakalpakstan; 11) [EXCLUDED]; 12) suspension and annulment of decisions of local Councils of People’s Deputies; 13) legislative regulation of issues of administrative‑territorial structure; 14) determination of the system and powers of republican and local state authorities; 15) approval, upon the submission of the Council of Ministers of the Republic of Karakalpakstan, of the State Budget of the Republic of Karakalpakstan and reports on its execution; 16) establishment of state awards and honorary titles of the Republic of Karakalpakstan; 17) calling elections to the Jokargy Kenes of the Republic of Karakalpakstan and to local representative bodies; formation of the Central Election Commission; 18) submission to the Constitutional Court of the Republic of Uzbekistan of proposals regarding the conformity of acts of the highest state authorities and administration of the Republic of Uzbekistan with the Constitution of the Republic of Uzbekistan; 19) exercise of parliamentary oversight and other powers provided for by this Constitution.",
      PL: "o wyłącznych kompetencji Jokargy Kenesu Republiki Karakalpakstanu należy: 1) uchwalanie Konstytucji Republiki Karakalpakstanu oraz wprowadzanie do niej zmian i uzupełnień; 2) uchwalanie ustaw Republiki Karakalpakstanu, wprowadzanie do nich zmian i uzupełnień oraz ich interpretacja; 3) uchwalanie państwowych programów strategicznych rozwoju gospodarczego i społecznego; 4) ybór Przewodniczącego Jokargy Kenesu Republiki Karakalpakstanu i jego zastępcy; 5) twotworzenie Prezydium Jokargy Kenesu Republiki Karakalpakstanu; 6) powoływanie i odwoływanie Przewodniczącego Rady Ministrów Republiki Karakalpakstanu na wniosek Przewodniczącego Jokargy Kenesu, uzgodniony z Prezydentem Republiki Uzbekistanu; 7) powoływanie i odwoływanie zastępców Przewodniczącego Rady Ministrów oraz członków Rady Ministrów Republiki Karakalpakstanu, tworzenie i likwidacja ministerstw, komitetów państwowych i innych organów administracji państwowej Republiki Karakalpakstanu; 8) wybór Komitetu Nadzoru Konstytucyjnego Republiki Karakalpakstanu, wybór i odwoływanie przewodniczącego i jego zastępców Sądu Republiki Karakalpakstanu oraz przewodniczącego i jego zastępcy Sądu Administracyjnego Republiki Karakalpakstanu; 9) [WYKLUCZONE]; 10) powoływanie i odwoływanie Prokuratora Republiki Karakalpakstanu na wniosek Prezydium Jokargy Kenesu, uzgodniony z Prokuratorem Generalnym Republiki Uzbekistanu; 11) [WYKLUCZONE]; 12) zawieszanie i uchylanie decyzji lokalnych Rad Deputowanych Ludowych; 13) ustawowe regulowanie kwestii podziału terytorialno‑administracyjnego; 14) określanie systemu i kompetencji republikańskich i lokalnych organów władzy państwowej; 15) zatwierdzanie, na wniosek Rady Ministrów Republiki Karakalpakstanu, budżetu państwowego Republiki Karakalpakstanu oraz sprawozdań z jego wykonania; 16) ustanawianie państwowych odznaczeń i tytułów honorowych Republiki Karakalpakstanu; 17) wyznaczanie wyborów do Jokargy Kenesu Republiki Karakalpakstanu i lokalnych organów przedstawicielskich; tworzenie Centralnej Komisji Wyborczej; 18) kierowanie do Sądu Konstytucyjnego Republiki Uzbekistanu wniosków dotyczących zgodności aktów najwyższych organów władzy państwowej i administracji Republiki Uzbekistanu z Konstytucją Republiki Uzbekistanu; 19) sprawowanie kontroli parlamentarnej oraz wykonywanie innych uprawnień przewidzianych niniejszą Konstytucją."
    },
    comp: {
      RU: "ПРОТИВОРЕЧИЕ. Статья 2 Декларации гласит, что Верховный Совет принимает законы и самостоятельно контролирует их исполнение. Согласно Конституции, назначение Председателя Совета Министров Верховным Советом возможно только с «согласия» Президента Узбекистана - исключительные полномочия ограничены Узбекистаном.",
      KK: "ҚАЙШЫ. Декларацияның 2-статьясында Жоқарғы Кеңес нызамларды қабыл етеди ҳәм олардың орынланыўын еркин қадағалайды деп белгиленген. Конституцияда болса Жоқарғы Кеңестиң Министрлер Кеңеси баслығын тайынлаўы Өзбекстан Президентиниң «келисими» менен ғана мүмкин - айрықша ҳәкимиятлар Өзбекстан тәрепинен шекленген.",
      EN: "CONTRADICTION. Article 2 of the Declaration states that the Supreme Council adopts laws and exercises independent control over their implementation. According to the Constitution, the appointment of the Chairman of the Council of Ministers by the Supreme Council is possible only with the “agreement” of the President of Uzbekistan - exclusive powers are limited by Uzbekistan.",
      PL: "SPRZECZNOŚĆ. Artykuł 2 deklaracji stanowi, że Rada Najwyższa uchwala ustawy i sprawuje niezależną kontrolę nad ich wykonywaniem. Zgodnie z konstytucją powołanie Przewodniczącego Rady Ministrów przez Radę Najwyższą jest możliwe tylko za „zgodą” prezydenta Uzbekistanu - wyłączne uprawnienia są ograniczone do Uzbekistanu."
    }
  },
  {
    id: 71,
    title: "71-статья",
    cat: "amber",
    declRefLabel: {
      RU: "2. ПОРЯДОК РАБОТЫ",
      KK: "2. ЖУМЫС ТӘРТИБИ",
      EN: "2. PROCEDURE OF WORK",
      PL: "2. TRYB PRACY"
    },
    declFull: {
      RU: "Республика Каракалпакстан проводит государственное управление, принятие законов и указов и назначает судебные органы, осуществляющие надзор над исполнением принятого законодательства. Совет Министров Республики Каракалпакстан является высшим исполнительным и управляющим органом, осуществляющий принятие необходимых законов, управление и надзор над исполнением принятых законов. Совет Министров Республики Каракалпакстан является верховным исполнительным органом и органом управления. Верховный Суд Республики Каракалпакстан является Высшим Судом. Верховный Совет Республики Каракалпакстан назначает Генерального Прокурора осуществляющего надзор над исполнением закона, правопорядок и равного права всех перед законом.",
      KK: "Қарақалпақстан Республикасында мəмлекетлик ҳəкимият ҳəм нызам шығарыў, атқарыўшы ҳəм суд уйымларына бөлистириў принципине муўапық əмелге асырылады. -Қарақалпақстан Республикасының Жоқарғы Кеңеси Қарақалпақстан Республикасы мəмлекетлик ҳəкимиятының жоқары уйымы болып табылады, ол өз жумысында нызам шығарыў, бийлик етиў ҳəм қадағалаў ўазыйпаларын əмелге асырады. -Қарақалпақстан Республикасының Министрлер Кеңеси Қарақалпақстан Республикасының Мəмлекетлик ҳəкимиятының жоқарғы атқарыўшы ҳəм бийлик етиўши уйымы болып табылады. -Қарақалпақстан Республикасының Жоқарғы Суды Қарақалпақстан Республикасының Жоқарғы Суд уйымы болып табылады. -Қарақалпақстан Республикасы Жоқарғы Совети тайынлайтуғын Қарақалпақстан Республикасының прокуроры нызамлардың саррас ҳəм бир қыйлы орынланыўын жоқары дəрежеде бақлап отырады.",
      EN: "The Republic of Karakalpakstan conducts public administration, enacts laws and decrees, and appoints judicial bodies that oversee the implementation of the adopted legislation. The Supreme Council of the Republic of Karakalpakstan is the supreme body of state administration, which makes the necessary laws, manages and supervises the implementation of the adopted laws. The Council of Ministers of the Republic of Karakalpakstan is the supreme executive body and governing body. The Supreme Court of the Republic of Karakalpakstan is the Highest Court. The Supreme Council of the Republic of Karakalpakstan appoints the Prosecutor General to oversee the implementation of the law, the rule of law and the equal rights of all before the law.",
      PL: "Republika Karakalpakstanu prowadzi administrację państwową, uchwala ustawy i dekrety oraz powołuje organy sądowe sprawujące nadzór nad wykonaniem przyjętego ustawodawstwa. Najwyższa Rada Republiki Karakalpakstanu jest najwyższym organem administracji państwowej. Rada Ministrów Republiki Karakalpakstanu jest najwyższym organem wykonawczym i zarządzającym. Najwyższy Sąd Republiki Karakalpakstanu jest najwyższym organem sądowym. Najwyższa Rada powołuje Prokuratora Generalnego sprawującego nadzór nad przestrzeganiem prawa i równością obywateli wobec prawa."
    },
    full: {
      RU: "Деятельность Жокаргы Кенеса Республики Каракалпакстан осуществляется в порядке, установленном Конституцией и Регламентом Жокаргы Кенеса Республики Каракалпакстан.",
      KK: "Қарақалпақстан Республикасы Жоқарғы Кеңесиниң жумысы Қарақалпақстан Республикасы Конституциясында ҳәм Жоқарғы Кеңесиниң Регламетинде белгиленген тәртипте әмелге асырылады.",
      EN: "The activities of the Jokargy Kenes of the Republic of Karakalpakstan are carried out in the manner established by the Constitution and the Rules of Procedure of the Jokargy Kenes of the Republic of Karakalpakstan.",
      PL: "Działalność Jokargy Kenesu Republiki Karakalpakstanu odbywa się w trybie określonym Konstytucją oraz Regulaminem Jokargy Kenesu Republiki Karakalpakstanu."
    },
    comp: {
      RU: "УСЛОВНО. Норма о том, что деятельность Верховного Совета осуществляется на основе Конституции и Регламента, близка к статье 2 Декларации. Однако эта Конституция подчинена конституционным рамкам Узбекистана - полная самостоятельность не признаётся.",
      KK: "ШӘРТЛИ ҚАЙШЫ. Жоқарғы Кеңестиң жумысы Конституция ҳәм Регламент тийкарында әмелге асырылады, деген норма Декларация 2-статьясына жақын. Бирақ бул Конституция Өзбекстанның конституциялық шеңберине бойсынған - толық өз бетиншелик тән алынбайды.",
      EN: "CONDITIONAL. The provision that the activities of the Supreme Council are carried out on the basis of the Constitution and the Regulations is close to Article 2 of the Declaration. However, this Constitution is subject to the constitutional framework of Uzbekistan - full independence is not recognized.",
      PL: "WARUNKOWE. Norma, że działalność Rady Najwyższej odbywa się na podstawie Konstytucji i regulaminu, jest zbliżona do artykułu 2 deklaracji. Konstytucja ta podlega jednak ramom Konstytucyjnym Uzbekistanu-nie uznaje się pełnej niezależności."
    }
  },
  {
    id: 72,
    title: "72-статья",
    cat: "green",
    declRefLabel: {
      RU: "2. ЗАКОНОДАТЕЛЬНЫЕ ФУНКЦИИ",
      KK: "2. НЫЗАМ ШЫҒАРЫЎ ФУНКЦИЯЛАРЫ",
      EN: "2. LEGISLATIVE FUNCTIONS",
      PL: "2. FUNKCJE USTAWODAWCZE"
    },
    declFull: {
      RU: "Республика Каракалпакстан проводит государственное управление, принятие законов и указов и назначает судебные органы, осуществляющие надзор над исполнением принятого законодательства. Совет Министров Республики Каракалпакстан является высшим исполнительным и управляющим органом, осуществляющий принятие необходимых законов, управление и надзор над исполнением принятых законов. Совет Министров Республики Каракалпакстан является верховным исполнительным органом и органом управления. Верховный Суд Республики Каракалпакстан является Высшим Судом. Верховный Совет Республики Каракалпакстан назначает Генерального Прокурора осуществляющего надзор над исполнением закона, правопорядок и равного права всех перед законом.",
      KK: "Қарақалпақстан Республикасында мəмлекетлик ҳəкимият ҳəм нызам шығарыў, атқарыўшы ҳəм суд уйымларына бөлистириў принципине муўапық əмелге асырылады. -Қарақалпақстан Республикасының Жоқарғы Кеңеси Қарақалпақстан Республикасы мəмлекетлик ҳəкимиятының жоқары уйымы болып табылады, ол өз жумысында нызам шығарыў, бийлик етиў ҳəм қадағалаў ўазыйпаларын əмелге асырады. -Қарақалпақстан Республикасының Министрлер Кеңеси Қарақалпақстан Республикасының Мəмлекетлик ҳəкимиятының жоқарғы атқарыўшы ҳəм бийлик етиўши уйымы болып табылады. -Қарақалпақстан Республикасының Жоқарғы Суды Қарақалпақстан Республикасының Жоқарғы Суд уйымы болып табылады. -Қарақалпақстан Республикасы Жоқарғы Совети тайынлайтуғын Қарақалпақстан Республикасының прокуроры нызамлардың саррас ҳəм бир қыйлы орынланыўын жоқары дəрежеде бақлап отырады.",
      EN: "The Republic of Karakalpakstan conducts public administration, enacts laws and decrees, and appoints judicial bodies that oversee the implementation of the adopted legislation. The Supreme Council of the Republic of Karakalpakstan is the supreme body of state administration, which makes the necessary laws, manages and supervises the implementation of the adopted laws. The Council of Ministers of the Republic of Karakalpakstan is the supreme executive body and governing body. The Supreme Court of the Republic of Karakalpakstan is the Highest Court. The Supreme Council of the Republic of Karakalpakstan appoints the Prosecutor General to oversee the implementation of the law, the rule of law and the equal rights of all before the law.",
      PL: "Republika Karakalpakstanu prowadzi administrację państwową, uchwala ustawy i dekrety oraz powołuje organy sądowe sprawujące nadzór nad wykonaniem przyjętego ustawodawstwa. Najwyższa Rada Republiki Karakalpakstanu jest najwyższym organem administracji państwowej. Rada Ministrów Republiki Karakalpakstanu jest najwyższym organem wykonawczym i zarządzającym. Najwyższy Sąd Republiki Karakalpakstanu jest najwyższym organem sądowym. Najwyższa Rada powołuje Prokuratora Generalnego sprawującego nadzór nad przestrzeganiem prawa i równością obywateli wobec prawa."
    },
    full: {
      RU: "Заседание Жокаргы Кенеса Республики Каракалпакстан является правомочным, если в его работе участвует не менее двух третей общего числа всех депутатов.",
      KK: "Қарақалпақстан Республикасы Жоқарғы Кеңеси мәжилисиниң жумысына барлық депутатлардың улыўма санының кеминде үштен екиси қатнасса толық ҳуқықлы болып табылады.",
      EN: "A session of the Jokargy Kenes of the Republic of Karakalpakstan is deemed valid if no fewer than two‑thirds of the total number of deputies participate in its work.",
      PL: "Posiedzenie Jokargy Kenesu Republiki Karakalpakstanu jest prawomocne, jeżeli uczestniczy w nim co najmniej dwie trzecie ogólnej liczby deputowanych."
    },
    comp: {
      RU: "СООТВЕТСТВУЕТ. Норма о том, что сессия считается действенной, когда в ней участвуют не менее двух третей депутатов, соответствует функциям Жокаргы Кенеса по принятию законов и контролю, изложенным в статье 2 Декларации.",
      KK: "МУЎАПЫҚ. Сессия үштен еки бөлегинен аз болмаған депутатлар қатнасқанында ҳәрекешең деп есапланады деген норма Декларация 2-статьясындағы Жоқарғы Кеңестиң нызамларды қабыл етиў ҳәм қадағалаў функцияларына муўапық.",
      EN: "MATCHES. The requirement that a session is considered active if at least two-thirds of its deputies are present is in accordance with Article 2 of the Declaration, which defines the legislative and supervisory functions of the Supreme Council.",
      PL: "ZGODNE. Norma, że sesja jest uważana za wykonalną, gdy uczestniczy w niej co najmniej dwie trzecie posłów, jest zgodna z funkcjami Jokarga Kenes w zakresie uchwalania ustaw i kontroli, określonymi w artykule 2 deklaracji."
    }
  },
  {
    id: 73,
    title: "73-статья",
    cat: "amber",
    declRefLabel: {
      RU: "2. ПРЕДСТАВИТЕЛЬСТВО ВЛАСТИ",
      KK: "2. ҲӘКИМИЯТ ЎӘКИЛЛИГИ",
      EN: "2. REPRESENTATION OF POWER",
      PL: "2. REPREZENTACJA WŁADZY"
    },
    declFull: {
      RU: "Республика Каракалпакстан проводит государственное управление, принятие законов и указов и назначает судебные органы, осуществляющие надзор над исполнением принятого законодательства. Совет Министров Республики Каракалпакстан является высшим исполнительным и управляющим органом, осуществляющий принятие необходимых законов, управление и надзор над исполнением принятых законов. Совет Министров Республики Каракалпакстан является верховным исполнительным органом и органом управления. Верховный Суд Республики Каракалпакстан является Высшим Судом. Верховный Совет Республики Каракалпакстан назначает Генерального Прокурора осуществляющего надзор над исполнением закона, правопорядок и равного права всех перед законом.",
      KK: "Қарақалпақстан Республикасында мəмлекетлик ҳəкимият ҳəм нызам шығарыў, атқарыўшы ҳəм суд уйымларына бөлистириў принципине муўапық əмелге асырылады. -Қарақалпақстан Республикасының Жоқарғы Кеңеси Қарақалпақстан Республикасы мəмлекетлик ҳəкимиятының жоқары уйымы болып табылады, ол өз жумысында нызам шығарыў, бийлик етиў ҳəм қадағалаў ўазыйпаларын əмелге асырады. -Қарақалпақстан Республикасының Министрлер Кеңеси Қарақалпақстан Республикасының Мəмлекетлик ҳəкимиятының жоқарғы атқарыўшы ҳəм бийлик етиўши уйымы болып табылады. -Қарақалпақстан Республикасының Жоқарғы Суды Қарақалпақстан Республикасының Жоқарғы Суд уйымы болып табылады. -Қарақалпақстан Республикасы Жоқарғы Совети тайынлайтуғын Қарақалпақстан Республикасының прокуроры нызамлардың саррас ҳəм бир қыйлы орынланыўын жоқары дəрежеде бақлап отырады.",
      EN: "The Republic of Karakalpakstan conducts public administration, enacts laws and decrees, and appoints judicial bodies that oversee the implementation of the adopted legislation. The Supreme Council of the Republic of Karakalpakstan is the supreme body of state administration, which makes the necessary laws, manages and supervises the implementation of the adopted laws. The Council of Ministers of the Republic of Karakalpakstan is the supreme executive body and governing body. The Supreme Court of the Republic of Karakalpakstan is the Highest Court. The Supreme Council of the Republic of Karakalpakstan appoints the Prosecutor General to oversee the implementation of the law, the rule of law and the equal rights of all before the law.",
      PL: "Republika Karakalpakstanu prowadzi administrację państwową, uchwala ustawy i dekrety oraz powołuje organy sądowe sprawujące nadzór nad wykonaniem przyjętego ustawodawstwa. Najwyższa Rada Republiki Karakalpakstanu jest najwyższym organem administracji państwowej. Rada Ministrów Republiki Karakalpakstanu jest najwyższym organem wykonawczym i zarządzającym. Najwyższy Sąd Republiki Karakalpakstanu jest najwyższym organem sądowym. Najwyższa Rada powołuje Prokuratora Generalnego sprawującego nadzór nad przestrzeganiem prawa i równością obywateli wobec prawa."
    },
    full: {
      RU: "На заседаниях Жокаргы Кенеса Республики Каракалпакстан и его органов могут участвовать Председатель Совета Министров Республики Каракалпакстан и его заместители, министры, председатели государственных комитетов, руководители других органов государственного управления, председатель Комитета Конституционного надзора, председатель суда Республики Каракалпакстан, председатель административного суда Республики Каракалпакстан, Прокурор Республики Каракалпакстан.",
      KK: "Қарақалпақстан Республикасы Жоқарғы Кеңеси ҳәм оның уйымларының мәжилислерине Қарақалпақстан Республикасы Министрлер Кеңесиниң Баслығы ҳәм оның орынбасарлары, министрлер, мәмлекетлик комитетлердиң баслықлары, басқа да мәмлекетлик басқарыў уйымларының басшылары, Қарақалпақстан Республикасы Конституциялық бақлаў комитетиниң баслығы, Қарақалпақстан Республикасы судының баслығы, Қарақалпақстан Республикасы ҳәкимшилик судының баслығы, Қарақалпақстан Республикасы Прокуроры қатнасыўы мүмкин.",
      EN: "The Chairperson of the Council of Ministers of the Republic of Karakalpakstan and their deputies, ministers, chairpersons of state committees, heads of other state administration bodies, the Chairperson of the Committee of Constitutional Oversight, the Chairperson of the Court of the Republic of Karakalpakstan, the Chairperson of the Administrative Court of the Republic of Karakalpakstan, and the Prosecutor of the Republic of Karakalpakstan ay participate in the sessions of the Jokargy Kenes of the Republic of Karakalpakstan and its bodies.",
      PL: "W posiedzeniach Jokargy Kenesu Republiki Karakalpakstanu i jego organów mogą uczestniczyć: Przewodniczący Rady Ministrów Republiki Karakalpakstanu i jego zastępcy, ministrowie, przewodniczący komitetów państwowych, kierownicy innych organów administracji panstwowej, przewodniczący Komitetu Nadzoru Konstytucyjnego, przewodniczący Sądu Republiki Karakalpakstanu, przewodniczący Sądu Administracyjnego Republiki Karakalpakstanu oraz Prokurator Republiki Karakalpakstanu."
    },
    comp: {
      RU: "УСЛОВНО. Норма о том, что Председатель Совета Министров и другие высокопоставленные должностные лица могут участвовать в сессиях, близка к статье 2 Декларации. Однако назначение этих должностных лиц требует согласия узбекской стороны.",
      KK: "ШӘРТЛИ ҚАЙШЫ. Министрлер Кеңеси баслығы ҳәм басқа да жоқары лаўазымлы шахслар сессияларда қатнаса алатуғыны ҳаққындағы норма Декларация 2-статьясына жақын. Бирақ бул лаўазым ийелериниң тайынланыўы Өзбекстан тәрепиниң келисимин талап етеди.",
      EN: "CONDITIONAL. The provision allowing the Chairman of the Cabinet of Ministers and other high-ranking officials to participate in sessions is similar to Article 2 of the Declaration. However, the appointment of these officials requires the consent of the Uzbek side.",
      PL: "WARUNKOWE. Norma, że Prezes Rady Ministrów i inni wyżsi urzędnicy mogą uczestniczyć w sesjach, jest zbliżona do artykułu 2 deklaracji. Powołanie tych urzędników wymaga jednak zgody strony Uzbeckiej."
    }
  },
  {
    id: 74,
    title: "74-статья",
    cat: "green",
    declRefLabel: {
      RU: "2. НЕПРЕРЫВНОСТЬ ВЛАСТИ",
      KK: "2. ҲӘКИМИЯТТЫҢ ҮЗЛИКСИЗЛИГИ",
      EN: "2. CONTINUITY OF POWER",
      PL: "2. CIĄGŁOŚĆ WŁADZY"
    },
    declFull: {
      RU: "Республика Каракалпакстан проводит государственное управление, принятие законов и указов и назначает судебные органы, осуществляющие надзор над исполнением принятого законодательства. Совет Министров Республики Каракалпакстан является высшим исполнительным и управляющим органом, осуществляющий принятие необходимых законов, управление и надзор над исполнением принятых законов. Совет Министров Республики Каракалпакстан является верховным исполнительным органом и органом управления. Верховный Суд Республики Каракалпакстан является Высшим Судом. Верховный Совет Республики Каракалпакстан назначает Генерального Прокурора осуществляющего надзор над исполнением закона, правопорядок и равного права всех перед законом.",
      KK: "Қарақалпақстан Республикасында мəмлекетлик ҳəкимият ҳəм нызам шығарыў, атқарыўшы ҳəм суд уйымларына бөлистириў принципине муўапық əмелге асырылады. -Қарақалпақстан Республикасының Жоқарғы Кеңеси Қарақалпақстан Республикасы мəмлекетлик ҳəкимиятының жоқары уйымы болып табылады, ол өз жумысында нызам шығарыў, бийлик етиў ҳəм қадағалаў ўазыйпаларын əмелге асырады. -Қарақалпақстан Республикасының Министрлер Кеңеси Қарақалпақстан Республикасының Мəмлекетлик ҳəкимиятының жоқарғы атқарыўшы ҳəм бийлик етиўши уйымы болып табылады. -Қарақалпақстан Республикасының Жоқарғы Суды Қарақалпақстан Республикасының Жоқарғы Суд уйымы болып табылады. -Қарақалпақстан Республикасы Жоқарғы Совети тайынлайтуғын Қарақалпақстан Республикасының прокуроры нызамлардың саррас ҳəм бир қыйлы орынланыўын жоқары дəрежеде бақлап отырады.",
      EN: "The Republic of Karakalpakstan conducts public administration, enacts laws and decrees, and appoints judicial bodies that oversee the implementation of the adopted legislation. The Supreme Council of the Republic of Karakalpakstan is the supreme body of state administration, which makes the necessary laws, manages and supervises the implementation of the adopted laws. The Council of Ministers of the Republic of Karakalpakstan is the supreme executive body and governing body. The Supreme Court of the Republic of Karakalpakstan is the Highest Court. The Supreme Council of the Republic of Karakalpakstan appoints the Prosecutor General to oversee the implementation of the law, the rule of law and the equal rights of all before the law.",
      PL: "Republika Karakalpakstanu prowadzi administrację państwową, uchwala ustawy i dekrety oraz powołuje organy sądowe sprawujące nadzór nad wykonaniem przyjętego ustawodawstwa. Najwyższa Rada Republiki Karakalpakstanu jest najwyższym organem administracji państwowej. Rada Ministrów Republiki Karakalpakstanu jest najwyższym organem wykonawczym i zarządzającym. Najwyższy Sąd Republiki Karakalpakstanu jest najwyższym organem sądowym. Najwyższa Rada powołuje Prokuratora Generalnego sprawującego nadzór nad przestrzeganiem prawa i równością obywateli wobec prawa."
    },
    full: {
      RU: "По истечении срока своих полномочий Жокаргы Кенес Республики Каракалпакстан продолжает свою деятельность вплоть до начала работы Жокаргы Кенеса Республики Каракалпакстан нового созыва. Первое после выборов заседание Жокаргы Кенеса Республики Каракалпакстан созывается Центральной избирательной комиссией не позднее чем через два месяца после выборов.",
      KK: "Өзиниң ўәкиллик мүддети питкеннен кейин Қарақалпақстан Республикасы Жоқарғы Кеңеси жаңа шақырық Қарақалпақстан Республикасы Жоқарғы Кеңесиниң жумысы басланғанға шекем өз жумысын даўам еттиреди. Қарақалпақстан Республикасы Жоқарғы Кеңесиниң сайлаўлардан кейинги биринши мәжилиси Орайлық сайлаў комиссиясы тәрепинен сайлаўлардан кейин еки айдан кешиктирилмей шақырылады.",
      EN: "Upon the expiration of its term of office, the Jokargy Kenes of the Republic of Karakalpakstan continues its activities until the beginning of the work of the newly elected Jokargy Kenes of the Republic of Karakalpakstan. The first session of the Jokargy Kenes of the Republic of Karakalpakstan after elections shall be convened by the Central Election Commission no later than two months after the elections.",
      PL: "Po upływie kadencji Jokargy Kenes Republiki Karakalpakstanu kontynuuje swoją działalność aż do rozpoczęcia pracy przez Jokargy Kenes nowej kadencji. Pierwsze po wyborach posiedzenie Jokargy Kenesu Republiki Karakalpakstanu zwoływane jest przez Centralną Komisję Wyborczą nie później niż dwa miesiące po wyborach."
    },
    comp: {
      RU: "СООТВЕТСТВУЕТ. Норма о том, что после окончания срока полномочий Верховного Совета он продолжает свою деятельность до вступления в должность вновь избранного Верховного Совета, соответствует принципу обеспечения эффективности Верховного Совета, изложенному в статье 2 Декларации.",
      KK: "МУЎАПЫҚ. Жоқарғы Кеңес мүддети жуўмақланғаннан кейин жаңадан сайланған Жоқарғы Кеңес жумысқа кирискенге шекем жумысын даўам еттиреди, деген норма Декларация 2-статьясындағы Жоқарғы Кеңестиң исшеңлигин тәмийинлеў принципине муўапық.",
      EN: "MATCHES. The requirement that the Supreme Council, after its term expires, continues its work until the newly elected Supreme Council enters into office is in accordance with the principle of ensuring the effectiveness of the Supreme Council, as stated in Article 2 of the Declaration.",
      PL: "ZGODNE. Norma, że po zakończeniu kadencji Rady Najwyższej kontynuuje swoją działalność aż do objęcia urzędu nowo wybranej Rady Najwyższej, jest zgodna z zasadą zapewnienia skuteczności Rady Najwyższej, określoną w artykule 2 deklaracji."
    }
  },
  {
    id: 75,
    title: "75-статья",
    cat: "red",
    declRefLabel: {
      RU: "2. ЗАКОНОДАТЕЛЬНАЯ ИНИЦИАТИВА",
      KK: "2. НЫЗАМ ШЫҒАРЫЎ ИНИЦИАТИВАСЫ",
      EN: "2. LEGISLATIVE INITIATIVE",
      PL: "2. INICJATYWA USTAWODAWCZA"
    },
    declFull: {
      RU: "Республика Каракалпакстан проводит государственное управление, принятие законов и указов и назначает судебные органы, осуществляющие надзор над исполнением принятого законодательства. Совет Министров Республики Каракалпакстан является высшим исполнительным и управляющим органом, осуществляющий принятие необходимых законов, управление и надзор над исполнением принятых законов. Совет Министров Республики Каракалпакстан является верховным исполнительным органом и органом управления. Верховный Суд Республики Каракалпакстан является Высшим Судом. Верховный Совет Республики Каракалпакстан назначает Генерального Прокурора осуществляющего надзор над исполнением закона, правопорядок и равного права всех перед законом.",
      KK: "Қарақалпақстан Республикасында мəмлекетлик ҳəкимият ҳəм нызам шығарыў, атқарыўшы ҳəм суд уйымларына бөлистириў принципине муўапық əмелге асырылады. -Қарақалпақстан Республикасының Жоқарғы Кеңеси Қарақалпақстан Республикасы мəмлекетлик ҳəкимиятының жоқары уйымы болып табылады, ол өз жумысында нызам шығарыў, бийлик етиў ҳəм қадағалаў ўазыйпаларын əмелге асырады. -Қарақалпақстан Республикасының Министрлер Кеңеси Қарақалпақстан Республикасының Мəмлекетлик ҳəкимиятының жоқарғы атқарыўшы ҳəм бийлик етиўши уйымы болып табылады. -Қарақалпақстан Республикасының Жоқарғы Суды Қарақалпақстан Республикасының Жоқарғы Суд уйымы болып табылады. -Қарақалпақстан Республикасы Жоқарғы Совети тайынлайтуғын Қарақалпақстан Республикасының прокуроры нызамлардың саррас ҳəм бир қыйлы орынланыўын жоқары дəрежеде бақлап отырады.",
      EN: "The Republic of Karakalpakstan conducts public administration, enacts laws and decrees, and appoints judicial bodies that oversee the implementation of the adopted legislation. The Supreme Council of the Republic of Karakalpakstan is the supreme body of state administration, which makes the necessary laws, manages and supervises the implementation of the adopted laws. The Council of Ministers of the Republic of Karakalpakstan is the supreme executive body and governing body. The Supreme Court of the Republic of Karakalpakstan is the Highest Court. The Supreme Council of the Republic of Karakalpakstan appoints the Prosecutor General to oversee the implementation of the law, the rule of law and the equal rights of all before the law.",
      PL: "Republika Karakalpakstanu prowadzi administrację państwową, uchwala ustawy i dekrety oraz powołuje organy sądowe sprawujące nadzór nad wykonaniem przyjętego ustawodawstwa. Najwyższa Rada Republiki Karakalpakstanu jest najwyższym organem administracji państwowej. Rada Ministrów Republiki Karakalpakstanu jest najwyższym organem wykonawczym i zarządzającym. Najwyższy Sąd Republiki Karakalpakstanu jest najwyższym organem sądowym. Najwyższa Rada powołuje Prokuratora Generalnego sprawującego nadzór nad przestrzeganiem prawa i równością obywateli wobec prawa."
    },
    full: {
      RU: "Право законодательной инициативы в Жокаргы Кенесе Республики Каракалпакстан принадлежит депутатам Жокаргы Кенеса Республики Каракалпакстан, Совету Министров Республики Каракалпакстан, Комитету Конституционного надзора Республики Каракалпакстан, суду Республики Каракалпакстан, административному суду Республики Каракалпакстан, Прокурору Республики Каракалпакстан.",
      KK: "Қарақалпақстан Республикасы Жоқарғы Кеңесинде нызамшылық басламасы ҳуқықына Қарақалпақстан Республикасы Жоқарғы Кеңесиниң депутатлары, Қарақалпақстан Республикасы Министрлер Кеңеси, Қарақалпақстан Республикасы Конституциялық бақлаў комитети, Қарақалпақстан Республикасы суды, Қарақалпақстан Республикасы ҳәкимшилик суды, Қарақалпақстан Республикасы Прокуроры ийе.",
      EN: "The right of legislative initiative in the Jokargy Kenes of the Republic of Karakalpakstan belongs to the deputies of the Jokargy Kenes of the Republic of Karakalpakstan, the Council of Ministers of the Republic of Karakalpakstan, the Committee of Constitutional Oversight of the Republic of Karakalpakstan, the Court of the Republic of Karakalpakstan, the Administrative Court of the Republic of Karakalpakstan, and the Prosecutor of the Republic of Karakalpakstan.",
      PL: "Prawo inicjatywy ustawodawczej w Jokargy Kenesie Republiki Karakalpakstanu przysługuje deputowanym Jokargy Kenesu, Radzie Ministrów Republiki Karakalpakstanu, Komitetowi Nadzoru Konstytucyjnego Republiki Karakalpakstanu, Sądowi Republiki Karakalpakstanu, Sądowi Administracyjnemu Republiki Karakalpakstanu oraz Prokuratorowi Republiki Karakalpakstanu."
    },
    comp: {
      RU: "ПРОТИВОРЕЧИЕ. Статья 2 Декларации гласит, что право творчества принадлежит органам Республики Каракалпакстан. В Конституции право законодательной инициативы предоставлено также прокурору, подчиняющемуся Президенту Узбекистана, - открыта возможность внешнего воздействия на процесс суверенного законотворчества.",
      KK: "ҚАЙШЫ. Декларацияның 2-статьясында нызам дөретиўшилик ҳуқықы Қарақалпақстан Республикасы уйымларына тийисли деп белгиленген. Конституцияда болса нызам дөретиўшилик басламасы ҳуқықы Өзбекстан Президентине бойсыныўшы прокурорға да берилген - суверен нызам дөретиўшилик процесине сырттан тәсир етиў имканияты ашылған.",
      EN: "CONTRADICTION. Article 2 of the Declaration states that the right of legislative activity belongs to the bodies of the Republic of Karakalpakstan. In the Constitution, the right of legislative initiative is also granted to the prosecutor subordinate to the President of Uzbekistan - the possibility of external influence on the process of sovereign lawmaking has been opened.",
      PL: "SPRZECZNOŚĆ. Artykuł 2 deklaracji stanowi, że prawo do kreatywności należy do organów Republiki Karakalpakstanu. W konstytucji prawo inicjatywy ustawodawczej przyznano również prokuratorowi podlegającemu prezydentowi Uzbekistanu-istnieje możliwość zewnętrznego wpływu na proces suwerennego stanowienia prawa."
    }
  },
  {
    id: 76,
    title: "76-статья",
    cat: "amber",
    declRefLabel: {
      RU: "2. СУВЕРЕНИТЕТ ЗАКОНА",
      KK: "2. НЫЗАМ СУВЕРЕНИТЕТИ",
      EN: "2. SOVEREIGNTY OF LAW",
      PL: "2. SUWERENNOŚĆ PRAWA"
    },
    declFull: {
      RU: "Республика Каракалпакстан проводит государственное управление, принятие законов и указов и назначает судебные органы, осуществляющие надзор над исполнением принятого законодательства. Совет Министров Республики Каракалпакстан является высшим исполнительным и управляющим органом, осуществляющий принятие необходимых законов, управление и надзор над исполнением принятых законов. Совет Министров Республики Каракалпакстан является верховным исполнительным органом и органом управления. Верховный Суд Республики Каракалпакстан является Высшим Судом. Верховный Совет Республики Каракалпакстан назначает Генерального Прокурора осуществляющего надзор над исполнением закона, правопорядок и равного права всех перед законом.",
      KK: "Қарақалпақстан Республикасында мəмлекетлик ҳəкимият ҳəм нызам шығарыў, атқарыўшы ҳəм суд уйымларына бөлистириў принципине муўапық əмелге асырылады. -Қарақалпақстан Республикасының Жоқарғы Кеңеси Қарақалпақстан Республикасы мəмлекетлик ҳəкимиятының жоқары уйымы болып табылады, ол өз жумысында нызам шығарыў, бийлик етиў ҳəм қадағалаў ўазыйпаларын əмелге асырады. -Қарақалпақстан Республикасының Министрлер Кеңеси Қарақалпақстан Республикасының Мəмлекетлик ҳəкимиятының жоқарғы атқарыўшы ҳəм бийлик етиўши уйымы болып табылады. -Қарақалпақстан Республикасының Жоқарғы Суды Қарақалпақстан Республикасының Жоқарғы Суд уйымы болып табылады. -Қарақалпақстан Республикасы Жоқарғы Совети тайынлайтуғын Қарақалпақстан Республикасының прокуроры нызамлардың саррас ҳəм бир қыйлы орынланыўын жоқары дəрежеде бақлап отырады.",
      EN: "The Republic of Karakalpakstan conducts public administration, enacts laws and decrees, and appoints judicial bodies that oversee the implementation of the adopted legislation. The Supreme Council of the Republic of Karakalpakstan is the supreme body of state administration, which makes the necessary laws, manages and supervises the implementation of the adopted laws. The Council of Ministers of the Republic of Karakalpakstan is the supreme executive body and governing body. The Supreme Court of the Republic of Karakalpakstan is the Highest Court. The Supreme Council of the Republic of Karakalpakstan appoints the Prosecutor General to oversee the implementation of the law, the rule of law and the equal rights of all before the law.",
      PL: "Republika Karakalpakstanu prowadzi administrację państwową, uchwala ustawy i dekrety oraz powołuje organy sądowe sprawujące nadzór nad wykonaniem przyjętego ustawodawstwa. Najwyższa Rada Republiki Karakalpakstanu jest najwyższym organem administracji państwowej. Rada Ministrów Republiki Karakalpakstanu jest najwyższym organem wykonawczym i zarządzającym. Najwyższy Sąd Republiki Karakalpakstanu jest najwyższym organem sądowym. Najwyższa Rada powołuje Prokuratora Generalnego sprawującego nadzór nad przestrzeganiem prawa i równością obywateli wobec prawa."
    },
    full: {
      RU: "Жокаргы Кенес Республики Каракалпакстан принимает законы, постановления и другие акты. Для принятия закона необходимо большинство голосов всех депутатов Жокаргы Кенеса Республики Каракалпакстан. Законы Республики Каракалпакстан приобретают юридическую силу после принятия Жокаргы Кенесом и официального опубликования в установленном законом порядке.",
      KK: "Қарақалпақстан Республикасы Жоқарғы Кеңеси нызамлар, қарарлар ҳәм басқа да актлер қабыл етеди. Нызамды қабыл етиў ушын Қарақалпақстан Республикасы Жоқарғы Кеңесиниң барлық депутатларының көпшилик даўысы талап етиледи. Қарақалпақстан Республикасының нызамлары Жоқарғы Кеңес тәрепинен қабыл етилип нызамда белгиленген тәртипте рәсмий жәрияланғаннан кейин юридикалық күшке ийе болады.",
      EN: "The Jokargy Kenes of the Republic of Karakalpakstan adopts laws, resolutions, and other acts. A majority of votes of all deputies of the Jokargy Kenes of the Republic of Karakalpakstan is required for the adoption of a law. Laws of the Republic of Karakalpakstan acquire legal force after their adoption by the Jokargy Kenes and their official publication in the manner prescribed by law.",
      PL: "Jokargy Kenes Republiki Karakalpakstanu uchwala ustawy, uchwały i inne akty. Do przyjęcia ustawy wymagana jest większość głosów wszystkich deputowanych Jokargy Kenesu Republiki Karakalpakstanu. Ustawy Republiki Karakalpakstanu uzyskują moc prawną po ich przyjęciu przez Jokargy Kenes i oficjalnym ogłoszeniu w trybie przewidzianym ustawą."
    },
    comp: {
      RU: "УСЛОВНО. Принцип принятия законов большинством голосов всех депутатов близок к статье 2 Декларации. Однако принятые законы не должны противоречить Конституции и законодательству Узбекистана - законодательный суверенитет ограничен.",
      KK: "ШӘРТЛИ ҚАЙШЫ. Нызамлар барлық депутатлардың көпшилик даўысы менен қабыл етилиўи принципи Декларация 2-статьясына жақын. Бирақ қабыл етилген нызамлар Өзбекстан конституциясы ҳәм нызамшылығына қайшы келмеўи шәрт - нызам дөретиўшилик суверенитети шекленген.",
      EN: "CONDITIONAL. The principle that laws are adopted by a majority vote of all deputies is close to Article 2 of the Declaration. However, adopted laws must not contradict the Constitution and legislation of Uzbekistan - legislative sovereignty is limited.",
      PL: "WARUNKOWE. Zasada przyjmowania Ustaw większością głosów wszystkich posłów jest zbliżona do artykułu 2 deklaracji. Jednak uchwalone prawa nie powinny być sprzeczne z konstytucją i ustawodawstwem Uzbekistanu-suwerenność ustawodawcza jest ograniczona."
    }
  },
  {
    id: 77,
    title: "77-статья",
    cat: "green",
    declRefLabel: {
      RU: "2. КОНТРОЛЬНЫЕ ФУНКЦИИ",
      KK: "2. ҚАДАҒАЛАЎ ФУНКЦИЯЛАРЫ",
      EN: "2. OVERSIGHT FUNCTIONS",
      PL: "2. FUNKCJE KONTROLNE"
    },
    declFull: {
      RU: "Республика Каракалпакстан проводит государственное управление, принятие законов и указов и назначает судебные органы, осуществляющие надзор над исполнением принятого законодательства. Совет Министров Республики Каракалпакстан является высшим исполнительным и управляющим органом, осуществляющий принятие необходимых законов, управление и надзор над исполнением принятых законов. Совет Министров Республики Каракалпакстан является верховным исполнительным органом и органом управления. Верховный Суд Республики Каракалпакстан является Высшим Судом. Верховный Совет Республики Каракалпакстан назначает Генерального Прокурора осуществляющего надзор над исполнением закона, правопорядок и равного права всех перед законом.",
      KK: "Қарақалпақстан Республикасында мəмлекетлик ҳəкимият ҳəм нызам шығарыў, атқарыўшы ҳəм суд уйымларына бөлистириў принципине муўапық əмелге асырылады. -Қарақалпақстан Республикасының Жоқарғы Кеңеси Қарақалпақстан Республикасы мəмлекетлик ҳəкимиятының жоқары уйымы болып табылады, ол өз жумысында нызам шығарыў, бийлик етиў ҳəм қадағалаў ўазыйпаларын əмелге асырады. -Қарақалпақстан Республикасының Министрлер Кеңеси Қарақалпақстан Республикасының Мəмлекетлик ҳəкимиятының жоқарғы атқарыўшы ҳəм бийлик етиўши уйымы болып табылады. -Қарақалпақстан Республикасының Жоқарғы Суды Қарақалпақстан Республикасының Жоқарғы Суд уйымы болып табылады. -Қарақалпақстан Республикасы Жоқарғы Совети тайынлайтуғын Қарақалпақстан Республикасының прокуроры нызамлардың саррас ҳəм бир қыйлы орынланыўын жоқары дəрежеде бақлап отырады.",
      EN: "The Republic of Karakalpakstan conducts public administration, enacts laws and decrees, and appoints judicial bodies that oversee the implementation of the adopted legislation. The Supreme Council of the Republic of Karakalpakstan is the supreme body of state administration, which makes the necessary laws, manages and supervises the implementation of the adopted laws. The Council of Ministers of the Republic of Karakalpakstan is the supreme executive body and governing body. The Supreme Court of the Republic of Karakalpakstan is the Highest Court. The Supreme Council of the Republic of Karakalpakstan appoints the Prosecutor General to oversee the implementation of the law, the rule of law and the equal rights of all before the law.",
      PL: "Republika Karakalpakstanu prowadzi administrację państwową, uchwala ustawy i dekrety oraz powołuje organy sądowe sprawujące nadzór nad wykonaniem przyjętego ustawodawstwa. Najwyższa Rada Republiki Karakalpakstanu jest najwyższym organem administracji państwowej. Rada Ministrów Republiki Karakalpakstanu jest najwyższym organem wykonawczym i zarządzającym. Najwyższy Sąd Republiki Karakalpakstanu jest najwyższym organem sądowym. Najwyższa Rada powołuje Prokuratora Generalnego sprawującego nadzór nad przestrzeganiem prawa i równością obywateli wobec prawa."
    },
    full: {
      RU: "Жокаргы Кенес Республики Каракалпакстан избирает из числа депутатов комитеты и комиссии для ведения законопроектной работы, предварительного рассмотрения и подготовки вопросов, вносимых на рассмотрение Жокаргы Кенеса Республики Каракалпакстан, контроля за исполнением законов и иных решений Жокаргы Кенеса Республики Каракалпакстан. Жокаргы Кенес Республики Каракалпакстан создает, в случае необходимости, депутатские, ревизионные и иные комиссии на постоянной или временной основе. Полномочия и порядок деятельности комитетов и комиссий Жокаргы Кенеса Республики Каракалпакстан определяется законом.",
      KK: "Қарақалпақстан Республикасы Жоқарғы Кеңеси нызам жойбарларын таярлаў жумысын жүргизиў, Қарақалпақстан Республикасы Жоқарғы Кеңесиниң талқылаўына усынылатуғын мәселелерди алдын ала қарап шығыў ҳәм таярлаў, нызамлардың ҳәм Қарақалпақстан Республикасы Жоқарғы Кеңесиниң басқа да шешимлериниң орынланыўын қадағалаў ушын депутатлар арасынан комитетлер ҳәм комиссиялар сайлайды. Қарақалпақстан Республикасының Жоқарғы Кеңеси зәрүр жағдайларда турақлы ямаса ўақытша депутатлық, тексериў ҳәм басқа да комиссиялар дүзеди. Қарақалпақстан Республикасы Жоқарғы Кеңеси комитетлери ҳәм комиссияларының ўәкилликлери ҳәм жумыс тәртиби нызам менен белгиленеди.",
      EN: "The Jokargy Kenes of the Republic of Karakalpakstan elects from among its deputies committees and commissions for legislative work, preliminary review and preparation of issues submitted for consideration by the Jokargy Kenes of the Republic of Karakalpakstan, and for monitoring the implementation of laws and other decisions of the Jokargy Kenes of the Republic of Karakalpakstan. The Jokargy Kenes of the Republic of Karakalpakstan may establish, when necessary, deputy, audit, and other commissions on a permanent or temporary basis. The powers and procedures of the committees and commissions of the Jokargy Kenes of the Republic of Karakalpakstan are determined by law.",
      PL: "Jokargy Kenes Republiki Karakalpakstanu wybiera spośród deputowanych komitety i komisje do prowadzenia prac legislacyjnych, wstępnego rozpatrywania i przygotowywania spraw kierowanych pod obrady Jokargy Kenesu oraz do kontroli wykonania ustaw i innych decyzji Jokargy Kenesu. Jokargy Kenes Republiki Karakalpakstanu może w razie potrzeby tworzyć komisje deputackie, rewizyjne i inne — na zasadzie stałej lub tymczasowej. Kompetencje oraz tryb działalności komitetów i komisji Jokargy Kenesu Republiki Karakalpakstanu określa ustawa."
    },
    comp: {
      RU: "СООТВЕТСТВУЕТ. Норма о том, что Верховный Совет избирает комитеты и комиссии для законодательной деятельности, соответствует функциям Верховного Совета по принятию и контролю за исполнением законов, изложенным в статье 2 Декларации.",
      KK: "МУЎАПЫҚ. Жоқарғы Кеңес нызамшылық жумысы ушын комитетлер ҳәм комиссиялар сайлайды деген норма Декларация 2-статьясындағы Жоқарғы Кеңестиң нызамларды қабыл етиў ҳәм орынланыўын қадағалаў функцияларына сәйкес.",
      EN: "MATCHES. The requirement that the Supreme Council elects committees and commissions for legislative activity corresponds to the functions of the Supreme Council in Article 2 of the Declaration regarding the adoption and implementation of laws.",
      PL: "ZGODNE. Norma, że Rada Najwyższa wybiera komitety i komisje do działalności ustawodawczej, odpowiada funkcjom Rady Najwyższej w zakresie przyjmowania i kontroli wykonywania Ustaw określonych w artykule 2 deklaracji."
    }
  },
  {
    id: 78,
    title: "78-статья",
    cat: "green",
    declRefLabel: {
      RU: "2. НЕЗАВИСИМОСТЬ ДЕПУТАТОВ",
      KK: "2. ДЕПУТАТЛАРДЫҢ ЕРКИНЛИГИ.",
      EN: "2. INDEPENDENCE OF DEPUTIES",
      PL: "2. NIEZALEŻNOŚĆ DEPUTOWANYCH"
    },
    declFull: {
      RU: "Республика Каракалпакстан проводит государственное управление, принятие законов и указов и назначает судебные органы, осуществляющие надзор над исполнением принятого законодательства. Совет Министров Республики Каракалпакстан является высшим исполнительным и управляющим органом, осуществляющий принятие необходимых законов, управление и надзор над исполнением принятых законов. Совет Министров Республики Каракалпакстан является верховным исполнительным органом и органом управления. Верховный Суд Республики Каракалпакстан является Высшим Судом. Верховный Совет Республики Каракалпакстан назначает Генерального Прокурора осуществляющего надзор над исполнением закона, правопорядок и равного права всех перед законом.",
      KK: "Қарақалпақстан Республикасында мəмлекетлик ҳəкимият ҳəм нызам шығарыў, атқарыўшы ҳəм суд уйымларына бөлистириў принципине муўапық əмелге асырылады. -Қарақалпақстан Республикасының Жоқарғы Кеңеси Қарақалпақстан Республикасы мəмлекетлик ҳəкимиятының жоқары уйымы болып табылады, ол өз жумысында нызам шығарыў, бийлик етиў ҳəм қадағалаў ўазыйпаларын əмелге асырады. -Қарақалпақстан Республикасының Министрлер Кеңеси Қарақалпақстан Республикасының Мəмлекетлик ҳəкимиятының жоқарғы атқарыўшы ҳəм бийлик етиўши уйымы болып табылады. -Қарақалпақстан Республикасының Жоқарғы Суды Қарақалпақстан Республикасының Жоқарғы Суд уйымы болып табылады. -Қарақалпақстан Республикасы Жоқарғы Совети тайынлайтуғын Қарақалпақстан Республикасының прокуроры нызамлардың саррас ҳəм бир қыйлы орынланыўын жоқары дəрежеде бақлап отырады.",
      EN: "The Republic of Karakalpakstan conducts public administration, enacts laws and decrees, and appoints judicial bodies that oversee the implementation of the adopted legislation. The Supreme Council of the Republic of Karakalpakstan is the supreme body of state administration, which makes the necessary laws, manages and supervises the implementation of the adopted laws. The Council of Ministers of the Republic of Karakalpakstan is the supreme executive body and governing body. The Supreme Court of the Republic of Karakalpakstan is the Highest Court. The Supreme Council of the Republic of Karakalpakstan appoints the Prosecutor General to oversee the implementation of the law, the rule of law and the equal rights of all before the law.",
      PL: "Republika Karakalpakstanu prowadzi administrację państwową, uchwala ustawy i dekrety oraz powołuje organy sądowe sprawujące nadzór nad wykonaniem przyjętego ustawodawstwa. Najwyższa Rada Republiki Karakalpakstanu jest najwyższym organem administracji państwowej. Rada Ministrów Republiki Karakalpakstanu jest najwyższym organem wykonawczym i zarządzającym. Najwyższy Sąd Republiki Karakalpakstanu jest najwyższym organem sądowym. Najwyższa Rada powołuje Prokuratora Generalnego sprawującego nadzór nad przestrzeganiem prawa i równością obywateli wobec prawa."
    },
    full: {
      RU: "Депутатам Жокаргы Кенеса Республики Каракалпакстан в установленном порядке возмещаются расходы, связанные с депутатской деятельностью. Депутаты, работающие в Жокаргы Кенесе Республики Каракалпакстан и его органах на постоянной основе, на период своих полномочий не могут занимать какую-либо иную оплачиваемую должность, заниматься предпринимательской деятельностью.",
      KK: "Қарақалпақстан Республикасының Жоқарғы Кеңеси депутатларының депутатлық жумысы менен байланыслы қәрежетлери белгиленген тәртипте өтеледи. Қарақалпақстан Республикасы Жоқарғы Кеңесинде ҳәм оның уйымларында турақлы тийкарда ислейтуғын депутатлар өз ўәкилликлери дәўиринде ҳақы төленетуғын басқа бир лаўазымды ийелеўи, исбилерменлик жумыс пенен шуғылланыўы мүмкин емес.",
      EN: "Deputies of the Jokargy Kenes of the Republic of Karakalpakstan shall be reimbursed, in the prescribed manner, for expenses related to their parliamentary activities. Deputies working in the Jokargy Kenes of the Republic of Karakalpakstan and its bodies on a permanent basis may not hold any other paid position or engage in entrepreneurial activity during their term of office.",
      PL: "Deputowanym Jokargy Kenesu Republiki Karakalpakstanu przysługuje zwrot kosztów związanych z wykonywaniem mandatu w trybie określonym ustawą. Deputowani pracujący w Jokargy Kenesie i jego organach na zasadzie stałej nie mogą w okresie pełnienia mandatu zajmować żadnego innego płatnego stanowiska ani prowadzić działalności gospodarczej."
    },
    comp: {
      RU: "СООТВЕТСТВУЕТ. Принцип, согласно которому расходы депутатов на парламентскую деятельность покрываются, а постоянно работающие не могут заниматься другой оплачиваемой деятельностью, соответствует положению статьи 2 Декларации о самостоятельной деятельности Жокаргы Кенеса.",
      KK: "МУЎАПЫҚ. Депутатлардың парламентлик жумыс ушын қәрежетлери қапланады, турақлы жумыс ислейтуғынлар басқа ҳақы төленетуғын жумыс ислей алмайды деген принцип Декларацияның 2-статьясындағы Жоқарғы Кеңестиң бийғәрез жумыс ислеўи нормасына муўапық.",
      EN: "MATCHES. The principle that deputies' expenses for parliamentary work are covered, and those who work permanently cannot work in other paid jobs, is in accordance with the norm of independent work of the Supreme Council in Article 2 of the Declaration.",
      PL: "ZGODNE. Zasada, zgodnie z którą wydatki posłów na działalność parlamentarną są pokrywane, A stale pracujący nie mogą wykonywać innej płatnej działalności, odpowiada przepisowi artykułu 2 deklaracji o samodzielnej działalności Jokargi Kenesa."
    }
  },
  {
    id: 79,
    title: "79-статья",
    cat: "amber",
    declRefLabel: {
      RU: "2. СТАТУС ВЫСШЕГО ОРГАНА",
      KK: "2. ЖОҚАРҒЫ УЙЫМ МӘРТЕБЕСИ",
      EN: "2. STATUS OF SUPREME BODY",
      PL: "2. STATUS ORGANU NACZELNEGO"
    },
    declFull: {
      RU: "Депутатам Жокаргы Кенеса Республики Каракалпакстан в установленном порядке возмещаются расходы, связанные с депутатской деятельностью. Депутаты, работающие в Жокаргы Кенесе Республики Каракалпакстан и его органах на постоянной основе, на период своих полномочий не могут занимать какую-либо иную оплачиваемую должность, заниматься предпринимательской деятельностью.",
      KK: "Қарақалпақстан Республикасының Жоқарғы Кеңеси депутатларының депутатлық жумысы менен байланыслы қәрежетлери белгиленген тәртипте өтеледи. Қарақалпақстан Республикасы Жоқарғы Кеңесинде ҳәм оның уйымларында турақлы тийкарда ислейтуғын депутатлар өз ўәкилликлери дәўиринде ҳақы төленетуғын басқа бир лаўазымды ийелеўи, исбилерменлик жумыс пенен шуғылланыўы мүмкин емес.",
      EN: "Deputies of the Jokargy Kenes of the Republic of Karakalpakstan shall be reimbursed, in the prescribed manner, for expenses related to their parliamentary activities. Deputies working in the Jokargy Kenes of the Republic of Karakalpakstan and its bodies on a permanent basis may not hold any other paid position or engage in entrepreneurial activity during their term of office.",
      PL: "Deputowanym Jokargy Kenesu Republiki Karakalpakstanu przysługuje zwrot kosztów związanych z wykonywaniem mandatu w trybie określonym ustawą. Deputowani pracujący w Jokargy Kenesie i jego organach na zasadzie stałej nie mogą w okresie pełnienia mandatu zajmować żadnego innego płatnego stanowiska ani prowadzić działalności gospodarczej."
    },
    full: {
      RU: "Депутат Жокаргы Кенеса Республики Каракалпакстан пользуется правом неприкосновенности. Он не может быть привлечен к уголовной ответственности, арестован или подвергнут мерам административного взыскания, налагаемых в судебном порядке, без согласия Жокаргы Кенеса Республики Каракалпакстан.",
      KK: "Қарақалпақстан Республикасы Жоқарғы Кеңесиниң депутаты қол қатылмаслық ҳуқықынан пайдаланады. Қарақалпақстан Республикасы Жоқарғы Кеңесиниң келисимисиз ол жынайы жуўапкершиликке тартылыўы, қамаққа алыныўы ямаса оған суд тәртибинде берилетуғын ҳәкимшилик жаза шаралары қолланылыўы мүмкин емес.",
      EN: "A deputy of the Jokargy Kenes of the Republic of Karakalpakstan enjoys immunity. They may not be subjected to criminal liability, arrest, or administrative penalties imposed by a court without the consent of the Jokargy Kenes of the Republic of Karakalpakstan.",
      PL: "Deputowany Jokargy Kenesu Republiki Karakalpakstanu korzysta z immunitetu. Nie może on zostać pociągnięty do odpowiedzialności karnej, aresztowany ani poddany środkom administracyjnym nakładanym w trybie sądowym bez zgody Jokargy Kenesu Republiki Karakalpakstanu."
    },
    comp: {
      RU: "УСЛОВНО. Неприкосновенность депутата близка к статье 2 Декларации. Однако в Конституции требуется согласие Верховного Совета, а поскольку Верховный Совет действует в пределах Узбекистана, эта гарантия не может быть признана полностью суверенной.",
      KK: "ШӘРТЛИ ҚАЙШЫ. Депутаттың қол қатылмаслық ҳуқықы Декларация 2-статьясына жақын. Бирақ Конституцияда Жоқарғы Кеңестиң келисими талап етиледи, ал Жоқарғы Кеңес өзи Өзбекстан шеңберинде жумыс ислейтуғынлықтан, бул кепиллик толық суверен таныла алмайды.",
      EN: "CONDITIONAL. A deputy's right to immunity is close to Article 2 of the Declaration. However, the Constitution requires the consent of the Supreme Council, and since the Supreme Council itself operates within the framework of Uzbekistan, this guarantee cannot be recognized as a full sovereign.",
      PL: "WARUNKOWE. Prawo posła do immunitetu jest zbliżone do artykułu 2 deklaracji. Konstytucja wymaga jednak zgody Rady Najwyższej, a ponieważ sama Rada Najwyższa działa w Uzbekistanie, gwarancja ta nie może być uznana za pełną władzę."
    }
  },
  {
    id: 80,
    title: "80-статья",
    cat: "red",
    declRefLabel: {
      RU: "2. ОТВЕТСТВЕННОСТЬ ВЛАСТИ",
      KK: "2. ҲӘКИМИЯТ ЖУЎАПКЕРШИЛИГИ",
      EN: "2. ACCOUNTABILITY OF POWER",
      PL: "2. ODPOWIEDZIALNOŚĆ WŁADZY"
    },
    declFull: {
      RU: "Депутатам Жокаргы Кенеса Республики Каракалпакстан в установленном порядке возмещаются расходы, связанные с депутатской деятельностью. Депутаты, работающие в Жокаргы Кенесе Республики Каракалпакстан и его органах на постоянной основе, на период своих полномочий не могут занимать какую-либо иную оплачиваемую должность, заниматься предпринимательской деятельностью.",
      KK: "Қарақалпақстан Республикасының Жоқарғы Кеңеси депутатларының депутатлық жумысы менен байланыслы қәрежетлери белгиленген тәртипте өтеледи. Қарақалпақстан Республикасы Жоқарғы Кеңесинде ҳәм оның уйымларында турақлы тийкарда ислейтуғын депутатлар өз ўәкилликлери дәўиринде ҳақы төленетуғын басқа бир лаўазымды ийелеўи, исбилерменлик жумыс пенен шуғылланыўы мүмкин емес.",
      EN: "Deputies of the Jokargy Kenes of the Republic of Karakalpakstan shall be reimbursed, in the prescribed manner, for expenses related to their parliamentary activities. Deputies working in the Jokargy Kenes of the Republic of Karakalpakstan and its bodies on a permanent basis may not hold any other paid position or engage in entrepreneurial activity during their term of office.",
      PL: "Deputowanym Jokargy Kenesu Republiki Karakalpakstanu przysługuje zwrot kosztów związanych z wykonywaniem mandatu w trybie określonym ustawą. Deputowani pracujący w Jokargy Kenesie i jego organach na zasadzie stałej nie mogą w okresie pełnienia mandatu zajmować żadnego innego płatnego stanowiska ani prowadzić działalności gospodarczej."
    },
    full: {
      RU: "Председатель Жокаргы Кенеса Республики Каракалпакстан является Руководителем Республики Каракалпакстан и высшим должностным лицом Республики Каракалпакстан. Председатель Жокаргы Кенеса Республики Каракалпакстан избирается Жокаргы Кенесом Республики Каракалпакстан по согласованию с Президентом Республики Узбекистан из числа депутатов Жокаргы Кенеса Республики Каракалпакстан тайным голосованием на срок полномочий Жокаргы Кенеса Республики Каракалпакстан.",
      KK: "Қарақалпақстан Республикасы Жоқарғы Кеңесиниң Баслығы Қарақалпақстан Республикасы Басшысы ҳәм ең жоқары лаўазымлы шахс болып табылады. Қарақалпақстан Республикасы Жоқарғы Кеңесиниң Баслығы Қарақалпақстан Республикасының Жоқарғы Кеңеси тәрепинен Өзбекстан Республикасы Президентиниң келисими менен Қарақалпақстан Республикасы Жоқарғы Кеңесиниң депутатларының арасынан жасырын даўыс бериў жолы менен Қарақалпақстан Республикасы Жоқарғы Кеңесиниң ўәкиллиги мүддетине сайланады.",
      EN: "The Chairperson of the Jokargy Kenes of the Republic of Karakalpakstan is the Head of the Republic of Karakalpakstan and the highest official of the Republic of Karakalpakstan. The Chairperson of the Jokargy Kenes of the Republic of Karakalpakstan is elected by the Jokargy Kenes of the Republic of Karakalpakstan, in agreement with the President of the Republic of Uzbekistan, from among the deputies of the Jokargy Kenes of the Republic of Karakalpakstan, by secret ballot for the term of office of the Jokargy Kenes of the Republic of Karakalpakstan.",
      PL: "Przewodniczący Jokargy Kenesu Republiki Karakalpakstanu jest Kierownikiem Republiki Karakalpakstanu oraz najwyższym urzędnikiem Republiki Karakalpakstanu. Przewodniczący Jokargy Kenesu Republiki Karakalpakstanu jest wybierany przez Jokargy Kenes Republiki Karakalpakstanu, w porozumieniu z Prezydentem Republiki Uzbekistanu, spośród deputowanych Jokargy Kenesu, w głosowaniu tajnym, na okres kadencji Jokargy Kenesu Republiki Karakalpakstanu."
    },
    comp: {
      RU: "ПРОТИВОРЕЧИЕ. В статье 2 Декларации прямо не указано, что Председатель Верховного Совета несет ответственность перед народом Республики Каракалпакстан. В Конституции четко закреплено, что Председатель Верховного Совета избирается с согласия Президента Республики Узбекистан. Высшая должность в Республике Каракалпакстан зависит от разрешения узбекской стороны.",
      KK: "ҚАЙШЫ. Декларацияның 2-статьясында Жоқарғы Кеңес Баслығы Қарақалпақстан Республикасы халқы алдында жуўапкер болатуғыны тиккелей белгиленбеген. Конституцияда болса Жоқарғы Кеңес баслығы «Өзбекстан Республикасы Президентиниң келисими менен сайланады» деп анық белгилеп қойылып, Қарақалпақстан Республикасының жоқары лаўазымы Өзбекстан тәрепиниң руқсатына байланыслы болып қалған.",
      EN: "CONTRADICTION. Article 2 of the Declaration does not explicitly stipulate that the Chairman of the Supreme Council is accountable to the people of the Republic of Karakalpakstan. The Constitution clearly states that the Chairman of the Supreme Council is “elected with the consent of the President of the Republic of Uzbekistan,” and the supreme position of the Republic of Karakalpakstan remains dependent on the permission of the Uzbek side.",
      PL: "SPRZECZNOŚĆ. Artykuł 2 deklaracji nie wskazuje wprost, że przewodniczący Rady Najwyższej jest odpowiedzialny przed ludem Republiki Karakalpakstanu. Konstytucja wyraźnie stwierdza, że przewodniczący Rady Najwyższej jest wybierany za zgodą prezydenta Republiki Uzbekistanu. Najwyższe stanowisko w Republice Karakalpakstanu zależy od zgody strony Uzbeckiej."
    }
  },
  {
    id: 81,
    title: "81-статья",
    cat: "red",
    declRefLabel: {
      RU: "2. САМОСТОЯТЕЛЬНОСТЬ ОРГАНОВ",
      KK: "2. ШӨЛКЕМЛЕРДИҢ ЕРКИНЛИГИ",
      EN: "2. INDEPENDENCE OF BODIES",
      PL: "2. SAMODZIELNOŚĆ ORGANÓW"
    },
    declFull: {
      RU: "Депутатам Жокаргы Кенеса Республики Каракалпакстан в установленном порядке возмещаются расходы, связанные с депутатской деятельностью. Депутаты, работающие в Жокаргы Кенесе Республики Каракалпакстан и его органах на постоянной основе, на период своих полномочий не могут занимать какую-либо иную оплачиваемую должность, заниматься предпринимательской деятельностью.",
      KK: "Қарақалпақстан Республикасының Жоқарғы Кеңеси депутатларының депутатлық жумысы менен байланыслы қәрежетлери белгиленген тәртипте өтеледи. Қарақалпақстан Республикасы Жоқарғы Кеңесинде ҳәм оның уйымларында турақлы тийкарда ислейтуғын депутатлар өз ўәкилликлери дәўиринде ҳақы төленетуғын басқа бир лаўазымды ийелеўи, исбилерменлик жумыс пенен шуғылланыўы мүмкин емес.",
      EN: "Deputies of the Jokargy Kenes of the Republic of Karakalpakstan shall be reimbursed, in the prescribed manner, for expenses related to their parliamentary activities. Deputies working in the Jokargy Kenes of the Republic of Karakalpakstan and its bodies on a permanent basis may not hold any other paid position or engage in entrepreneurial activity during their term of office.",
      PL: "Deputowanym Jokargy Kenesu Republiki Karakalpakstanu przysługuje zwrot kosztów związanych z wykonywaniem mandatu w trybie określonym ustawą. Deputowani pracujący w Jokargy Kenesie i jego organach na zasadzie stałej nie mogą w okresie pełnienia mandatu zajmować żadnego innego płatnego stanowiska ani prowadzić działalności gospodarczej."
    },
    full: {
      RU: "Председатель Жокаргы Кенеса Республики Каракалпакстан: 1) обеспечивает взаимодействие высших органов законодательной и исполнительной власти Республики Каракалпакстан; 2) представляет Жокаргы Кенесу Республики Каракалпакстан доклады о положении дел в республике и по другим важным вопросам; 3) организует проведение в жизнь законов и иных решений Олий Мажлиса Республики Узбекистан, указов и иных актов Президента Республики Узбекистан; организует контроль над исполнением законов и постановлений Жокаргы Кенеса Республики Каракалпакстан; 4) представляет Жокаргы Кенесу Республики Каракалпакстан кандидатуры для избрания заместителя Председателя Жокаргы Кенеса, председателей комитетов и комиссий Жокаргы Кенеса Республики Каракалпакстан; 5) по согласованию с Президентом Республики Узбекистан представляет Жокаргы Кенесу Республики Каракалпакстан кандидатуру на должность Председателя Совета Министров Республики Каракалпакстан; 6) назначает и освобождает от должности хакимов районов и городов и их заместителей с последующим утверждением их соответствующими Советами народных депутатов; 7) представляет Жокаргы Кенесу Республики Каракалпакстан по согласованию с Президиумом Жокаргы Кенеса кандидатуры на должность Председателя и членов Комитета Конституционного надзора Республики Каракалпакстан; 8) представляет Жокаргы Кенесу Республики Каракалпакстан по согласованию с Президентом Республики Узбекистан, на основании заключения Высшего судейского совета Республики Узбекистан кандидатуры на должности председателя и его заместителей суда Республики Каракалпакстан, председателя и его заместителя административного суда Республики Каракалпакстан; 9) представляет Жокаргы Кенесу Республики Каракалпакстан по согласованию с Президиумом Жокаргы Кенеса кандидатуру на должность председателя Государственного комитета Республики Каракалпакстан по охране природы окружающей среды и экологии; 10) осуществляет общее руководство подготовкой вопросов, вносимых на рассмотрение Жокаргы Кенеса, созывает заседание Жокаргы Кенеса, формирует совместно с председателями комитетов и комиссий предложения к его повестке дня; 11) организует работу Жокаргы Кенеса Республики Каракалпакстан и его Президиума, руководит их заседаниями, подписывает законы Республики Каракалпакстан и другие акты, принятые Жокаргы Кенесом Республики Каракалпакстан и его Президиумом, направляет и координирует деятельность комитетов и комиссий Жокаргы Кенеса Республики Каракалпакстан; 12) представляет к государственным наградам Республики Каракалпакстан и присвоению почетных званий Республики Каракалпакстан; 13) возбуждает ходатайство о помиловании осужденных граждан; 14) организует народные обсуждения проектов законов и других важных вопросов государственной жизни; 15) осуществляет другие полномочия, предусмотренные действующим законодательными актами. Председатель Жокаргы Кенеса Республики Каракалпакстан вправе вносить вопросы, отнесенные к его компетенции, на рассмотрение Президиума Жокаргы Кенеса Республики Каракалпакстан.",
      KK: "Қарақалпақстан Республикасы Жоқарғы Кеңесиниң Баслығы: 1) Қарақалпақстан Республикасының жоқары нызам шығарыў ҳәм атқарыў ҳәкимияты уйымларының өз ара байланыслы ҳәрекет етиўин тәмийинлейди; 2) Республикадағы жағдай ҳаққында ҳәм басқа да әҳмийетли мәселелер бойынша Қарақалпақстан Республикасының Жоқарғы Кеңесине баянатлар усынады; 3) Өзбекстан Республикасының нызамларын ҳәм Олий Мажлисиниң басқа да шешимлерин, Өзбекстан Республикасы Президентиниң пәрманларын ҳәм басқа да актлерин турмысқа асырыўды шөлкемлестиреди; Қарақалпақстан Республикасы нызамларының ҳәм Жоқарғы Кеңес қарарларының орынланыўын қадағалаўды шөлкемлестиреди; 4) Қарақалпақстан Республикасы Жоқарғы Кеңесине Жоқарғы Кеңес Баслығының орынбасарын, Қарақалпақстан Республикасы Жоқарғы Кеңесиниң комитетлери ҳәм комиссияларының баслықларын сайлаў ушын кандидатуралар усынады; 5) Өзбекстан Республикасы Президентиниң келисими менен Қарақалпақстан Республикасы Жоқарғы Кеңесине Қарақалпақстан Республикасы Министрлер Кеңесиниң Баслығы лаўазымына кандидатура усынады; 6) Район, қала ҳәкимлерин ҳәм олардың орынбасарларын, кейин ала тийисли халық депутатлары Кеңеслериниң тастыйықлаўы менен тайынлайды ҳәм лаўазымынан босатады; 7) Қарақалпақстан Республикасы Жоқарғы Кеңесине Жоқарғы Кеңес Президиумының келисими менен Қарақалпақстан Республикасы Конституциялық бақлаў комитетиниң баслығы ҳәм ағзалары лаўазымына кандидатураларды усынады; 8) Қарақалпақстан Республикасы Жоқарғы Кеңесине Өзбекстан Республикасы Судьялар жоқары кеңесиниң жуўмағы тийкарында Өзбекстан Республикасы Президентиниң келисими менен Қарақалпақстан Республикасы судының баслығы ҳәм оның орынбасарлары, Қарақалпақстан Республикасы ҳәкимшилик судының баслығы ҳәм оның орынбасары лаўазымларына кандидатуралар усынады; 9) Қарақалпақстан Республикасы Жоқарғы Кеңесине Жоқарғы Кеңес Президиумының келисими менен Қарақалпақстан Республикасы Экология ҳәм қоршаған орталықты қорғаў комитетиниң баслығы лаўазымына кандидатура усынады; 10) Жоқарғы Кеңестиң қарап шығыўына усынылатуғын мәселелерди таярлаўға улыўма басшылықты әмелге асырады. Жоқарғы Кеңестиң мәжилисин шақырады, комитетлер ҳәм комиссиялар баслықлары менен бирликте оның күн тәртибине усыныслар қәлиплестиреди; 11) Қарақалпақстан Республикасы Жоқарғы Кеңесиниң ҳәм оның Президиумының жумысын шөлкемлестиреди, оның мәжилислерине басшылық етеди, Қарақалпақстан Республикасының Жоқарғы Кеңеси ҳәм оның Президиумы тәрепинен қабыл етилген Қарақалпақстан Республикасының нызамлары ҳәм басқа да актлерине қол қояды, Қарақалпақстан Республикасы Жоқарғы Кеңесиниң комитетлери ҳәм комиссияларының жумысын бағдарлайды ҳәм байланыстырады; 12) Қарақалпақстан Республикасының мәмлекетлик сыйлықларына ҳәм Қарақалпақстан Республикасының ҳүрметли атақларына усынады; 13) судланған пуқараларды әпиў етиў ҳаққында мәселе қозғайды; 14) нызам жойбарларының ҳәм мәмлекетлик турмыстың басқа да әҳмийетли мәселелериниң халықлық додаланыўын шөлкемлестиреди 15) ҳәрекеттеги нызамшылық актлери менен нәзерде тутылған басқа да ўәкилликлерди әмелге асырады. Қарақалпақстан Республикасы Жоқарғы Кеңесиниң Баслығы өз ўәкилликлерине тийисли мәселелерди Республикасы Жоқарғы Кеңеси Президиумының қарап шығыўына усыныў ҳуқықына ийе.",
      EN: "The Chairperson of the Jokargy Kenes of the Republic of Karakalpakstan: 1) ensures interaction between the highest legislative and executive bodies of the Republic of Karakalpakstan; 2) presents reports to the Jokargy Kenes of the Republic of Karakalpakstan on the state of affairs in the republic and on other important issues; 3) organizes the implementation of laws and other decisions of the Oliy Majlis of the Republic of Uzbekistan, decrees and other acts of the President of the Republic of Uzbekistan; organizes control over the implementation of laws and resolutions of the Jokargy Kenes of the Republic of Karakalpakstan; 4) submits to the Jokargy Kenes of the Republic of Karakalpakstan candidates for the election of the Deputy Chairperson of the Jokargy Kenes, chairpersons of committees and commissions of the Jokargy Kenes of the Republic of Karakalpakstan; 5) in agreement with the President of the Republic of Uzbekistan, submits to the Jokargy Kenes of the Republic of Karakalpakstan a candidate for the position of Chairperson of the Council of Ministers of the Republic of Karakalpakstan; 6) appoints and dismisses the khakims of districts and cities and their deputies, with subsequent approval by the respective Councils of People’s Deputies; 7) submits to the Jokargy Kenes of the Republic of Karakalpakstan, in agreement with the Presidium of the Jokargy Kenes, candidates for the positions of Chairperson and members of the Committee of Constitutional Oversight of the Republic of Karakalpakstan; 8) submits to the Jokargy Kenes of the Republic of Karakalpakstan, in agreement with the President of the Republic of Uzbekistan and on the basis of the conclusion of the Supreme Judicial Council of the Republic of Uzbekistan, candidates for the positions of chairperson and deputy chairpersons of the Court of the Republic of Karakalpakstan, and the chairperson and deputy chairperson of the Administrative Court of the Republic of Karakalpakstan; 9) submits to the Jokargy Kenes of the Republic of Karakalpakstan, in agreement with the Presidium of the Jokargy Kenes, a candidate for the position of Chairperson of the State Committee of the Republic of Karakalpakstan for Environmental Protection and Ecology; 10) exercises general leadership over the preparation of issues submitted for consideration by the Jokargy Kenes, convenes sessions of the Jokargy Kenes, and jointly with the chairpersons of committees and commissions forms proposals for its agenda; 11) organizes the work of the Jokargy Kenes of the Republic of Karakalpakstan and its Presidium, presides over their sessions, signs the laws of the Republic of Karakalpakstan and other acts adopted by the Jokargy Kenes of the Republic of Karakalpakstan and its Presidium, directs and coordinates the activities of the committees and commissions of the Jokargy Kenes of the Republic of Karakalpakstan; 12) submits proposals for state awards of the Republic of Karakalpakstan and the conferment of honorary titles of the Republic of Karakalpakstan; 13) petitions for the pardon of convicted citizens; 14) organizes public discussions of draft laws and other important issues of state life; 15) xercises other powers provided for by current legislative acts. The Chairperson of the Jokargy Kenes of the Republic of Karakalpakstan has the right to submit matters within his competence for consideration by the Presidium of the Jokargy Kenes of the Republic of Karakalpakstan.",
      PL: "Przewodniczacy Jokargy Kenesu Republiki Karakalpakstanu: 1) zapewnia współdziałanie najwyższych organów władzy ustawodawczej i wykonawczej Republiki Karakalpakstanu; 2) przedstawia Jokargy Kenesowi Republiki Karakalpakstanu sprawozdania o sytuacji w republice oraz w innych ważnych kwestiach; 3) organizuje wdrażanie ustaw i innych decyzji Oliy Majlisu Republiki Uzbekistanu, dekretów i innych aktów Prezydenta Republiki Uzbekistanu; organizuje kontrolę nad wykonaniem ustaw i uchwał Jokargy Kenesu Republiki Karakalpakstanu; 4) przedstawia Jokargy Kenesowi Republiki Karakalpakstanu kandydatury na stanowiska zastępcy Przewodniczącego Jokargy Kenesu, przewodniczących komitetów i komisji Jokargy Kenesu; 5) w porozumieniu z Prezydentem Republiki Uzbekistanu przedstawia Jokargy Kenesowi kandydaturę na stanowisko Przewodniczącego Rady Ministrów Republiki Karakalpakstanu; 6) ianuje i odwołuje hakimów rejonów i miast oraz ich zastępców, z późniejszym zatwierdzeniem przez właściwe Rady Deputowanych Ludowych; 7) przedstawia Jokargy Kenesowi Republiki Karakalpakstanu, w porozumieniu z Prezydium Jokargy Kenesu, kandydatury na stanowiska Przewodniczącego i członków Komitetu Nadzoru Konstytucyjnego Republiki Karakalpakstanu; 8) przedstawia Jokargy Kenesowi Republiki Karakalpakstanu, w porozumieniu z Prezydentem Republiki Uzbekistanu i na podstawie opinii Najwyższej Rady Sędziowskiej Republiki Uzbekistanu, kandydatury na stanowiska przewodniczącego i jego zastępców Sądu Republiki Karakalpakstanu oraz przewodniczącego i jego zastępcy Sądu Administracyjnego Republiki Karakalpakstanu; 9) przedstawia Jokargy Kenesowi Republiki Karakalpakstanu, w porozumieniu z Prezydium Jokargy Kenesu, kandydaturę na stanowisko przewodniczącego Państwowego Komitetu Republiki Karakalpakstanu ds. Ochrony Środowiska Naturalnego i Ekologii; 10) sprawuje ogólne kierownictwo przygotowaniem spraw kierowanych pod obrady Jokargy Kenesu, zwołuje posiedzenia Jokargy Kenesu, wspólnie z przewodniczącymi komitetów i komisji ustala propozycje do porządku obrad; 11) organizuje pracę Jokargy Kenesu i jego Prezydium, przewodniczy ich posiedzeniom, podpisuje ustawy Republiki Karakalpakstanu i inne akty przyjęte przez Jokargy Kenes i jego Prezydium, kieruje i koordynuje działalność komitetów i komisji Jokargy Kenesu; 12) przedstawia kandydatury do odznaczeń państwowych Republiki Karakalpakstanu i nadania tytułów honorowych Republiki Karakalpakstanu; 13) występuje z wnioskiem o ułaskawienie skazanych obywateli; 14) organizuje publiczne konsultacje projektów ustaw i innych ważnych kwestii życia państwowego; 15) wykonuje inne uprawnienia przewidziane obowiązującymi aktami prawnymi. Przewodniczący Jokargy Kenesu Republiki Karakalpakstanu ma prawo kierować sprawy należące do jego kompetencji pod obrady Prezydium Jokargy Kenesu."
    },
    comp: {
      RU: "ПРОТИВОРЕЧИЕ. Статья 2 Декларации гласит, что Республика Каракалпакстан действует независимо. В Конституции четко закреплено, что Председатель Верховного Совета организует исполнение законов и актов Президента Узбекистана. Это высшее должностное лицо Республики Каракалпакстан стало инструментом исполнительной власти Узбекистана.",
      KK: "ҚАЙШЫ. Декларацияның 2-статьясында Қарақалпақстан Республикасы шөлкемлери еркинлик пенен жумыс алып барады, деп белгиленген. Конституцияда болса Жоқарғы Кеңес Баслығы Өзбекстан Президентиниң нызамлары ҳәм актлериниң орынланыўын шөлкемлестиреди деп анық белгилеп қойылып - Қарақалпақстан Республикасының жоқары лаўазымлы шахсы Өзбекстан атқарыўшы ҳәкимиятының қуралына айланған.",
      EN: "CONTRADICTION. Article 2 of the Declaration states that the Republic of Karakalpakstan operates independently. The Constitution clearly stipulates that the Chairman of the Supreme Council organizes the execution of the laws and acts of the President of Uzbekistan - a high-ranking official of the Republic of Karakalpakstan has become an instrument of the executive power of Uzbekistan.",
      PL: "SPRZECZNOŚĆ. Artykuł 2 deklaracji stanowi, że Republika Karakalpakstanu działa samodzielnie. Konstytucja wyraźnie stwierdza, że przewodniczący Rady Najwyższej organizuje wykonywanie ustaw i aktów prezydenta Uzbekistanu-najwyższego urzędnika Republiki Karakalpakstan stał się narzędziem władzy wykonawczej Uzbekistanu."
    }
  },
  {
    id: 82,
    title: "82-статья",
    cat: "amber",
    declRefLabel: {
      RU: "2. КОМПЕТЕНЦИЯ ВЛАСТИ",
      KK: "2. ҲӘКИМИЯТ КОМПЕТЕНЦИЯСЫ",
      EN: "2. COMPETENCE OF POWER",
      PL: "2. KOMPETENCJA WŁADZY"
    },
    declFull: {
      RU: "Депутатам Жокаргы Кенеса Республики Каракалпакстан в установленном порядке возмещаются расходы, связанные с депутатской деятельностью. Депутаты, работающие в Жокаргы Кенесе Республики Каракалпакстан и его органах на постоянной основе, на период своих полномочий не могут занимать какую-либо иную оплачиваемую должность, заниматься предпринимательской деятельностью.",
      KK: "Қарақалпақстан Республикасының Жоқарғы Кеңеси депутатларының депутатлық жумысы менен байланыслы қәрежетлери белгиленген тәртипте өтеледи. Қарақалпақстан Республикасы Жоқарғы Кеңесинде ҳәм оның уйымларында турақлы тийкарда ислейтуғын депутатлар өз ўәкилликлери дәўиринде ҳақы төленетуғын басқа бир лаўазымды ийелеўи, исбилерменлик жумыс пенен шуғылланыўы мүмкин емес.",
      EN: "Deputies of the Jokargy Kenes of the Republic of Karakalpakstan shall be reimbursed, in the prescribed manner, for expenses related to their parliamentary activities. Deputies working in the Jokargy Kenes of the Republic of Karakalpakstan and its bodies on a permanent basis may not hold any other paid position or engage in entrepreneurial activity during their term of office.",
      PL: "Deputowanym Jokargy Kenesu Republiki Karakalpakstanu przysługuje zwrot kosztów związanych z wykonywaniem mandatu w trybie określonym ustawą. Deputowani pracujący w Jokargy Kenesie i jego organach na zasadzie stałej nie mogą w okresie pełnienia mandatu zajmować żadnego innego płatnego stanowiska ani prowadzić działalności gospodarczej."
    },
    full: {
      RU: "Председатель Жокаргы Кенеса Республики Каракалпакстан по вопросам, входящим в его компетенцию, принимает распоряжения.",
      KK: "Қарақалпақстан Республикасы Жоқарғы Кеңесиниң Баслығы өз ўәкилликлерине тийисли мәселелер бойынша бийлик қабыл етеди.",
      EN: "The Chairperson of the Jokargy Kenes of the Republic of Karakalpakstan issues directives on matters within his competence.",
      PL: "Przewodniczący Jokargy Kenesu Republiki Karakalpakstanu wydaje zarządzenia w sprawach należących do jego kompetencji."
    },
    comp: {
      RU: "УСЛОВНО. Принцип, согласно которому Председатель Верховного Совета издаёт законодательные акты в пределах своих полномочий, близок к статье 2 Декларации. Однако, поскольку эти полномочия ограничены конституционными рамками Узбекистана, они не могут полностью представлять суверенную власть.",
      KK: "ШӘРТЛИ ҚАЙШЫ. Жоқарғы Кеңес Баслығы өз ўәкиллиги шеңберинде нызам ҳүжжетлерин шығарады деген принцип Декларацияның 2-статьясына жақын. Бирақ бул ўәкиллик Өзбекстан конституциялық шеңберинде шекленгени себепли толық суверен ҳәкимиятты көрсете алмайды.",
      EN: "CONDITIONAL. The principle that the Chairman of the Supreme Council issues legislative acts within the scope of his/her authority is close to Article 2 of the Declaration. However, due to the fact that this authority is limited within the constitutional framework of Uzbekistan, it cannot represent full sovereign power.",
      PL: "WARUNKOWE. Zasada, że przewodniczący Rady Najwyższej wydaje akty prawne w ramach swoich uprawnień, jest zbliżona do artykułu 2 deklaracji. Jednakże, ponieważ władza ta jest ograniczona w Konstytucyjnych ramach Uzbekistanu, nie może reprezentować pełnej suwerennej władzy."
    }
  },
  {
    id: 83,
    title: "83-статья",
    cat: "amber",
    declRefLabel: {
      RU: "4. ВЕРХОВЕНСТВО ЗАКОНА",
      KK: "4. НЫЗАМ ҮСТЕМЛИГИ",
      EN: "4. SUPREMACY OF LAW",
      PL: "4. ZWIERZCHNICTWO PRAWA"
    },
    declFull: {
      RU: "Определяется верховенство законов и Конституции на территории Республики Каракалпакстан. Если со стороны правительств СССР и Узбекской ССР нарушаются права граждан Республики Каракалпакстан, то на основании существующих соглашений и законов СССР и УзССР, Республика Каракалпакстан вправе приостановить все принятые межгосударственные соглашения и договора и предъявить им ноту протеста.",
      KK: "Қарақалпақстан аймағында өзиниң ықтыярына берилген мəселелер бойынша Қарақалпақстан Республикасының Конституциясының ҳəм нызамларының үстемлиги белгиленеди. Егер СССРдың ҳəм Өзбекстан ССРның ҳуқықлық ўəкиллери шегинен шығып кетсе ҳəм Қарақалпақстан Республикасының ҳуқықларын бузатуғын болса, Республика СССРдың ҳəм Өзбекстан ССРның нызамларының, СССР ҳəм Өзбекстан ССР уйымларының басқа да актлериниң, шəртнамаларының ҳəрекет етиўин тоқтатыўға ҳəм оларға наразылық билдириўге ҳақылы.",
      EN: "The supremacy of laws and the Constitution in the territory of the Republic of Karakalpakstan is determined. If the rights of citizens of the Republic of Karakalpakstan are violated by the governments of the USSR and the Uzbek SSR, then on the basis of existing agreements and laws of the USSR and the Uzbek SSR, the Republic of Karakalpakstan has the right to suspend all interstate agreements and agreements and submit a note of protest to them.",
      PL: "Na terytorium Republiki Karakalpakstanu obowiązuje nadrzędność Konstytucji i ustaw. Jeśli prawa obywateli Republiki Karakalpakstanu są naruszane przez rządy ZSRR lub Uzbeckiej SRR, Republika ma prawo zawiesić wszystkie umowy międzypaństwowe i przedstawić im notę protestacyjną."
    },
    full: {
      RU: "Председатель Жокаргы Кенеса Республики Каракалпакстан может быть отозван Жокаргы Кенесом Республики Каракалпакстан в случае нарушения им Конституции и законов Республики Каракалпакстан. Решение об отзыве принимается большинством голосов не менее двух третей от общего числа депутатов Жокаргы Кенеса Республики Каракалпакстан по инициативе одной третьей части депутатов Жокаргы Кенеса Республики Каракалпакстан с учетом заключения Комитета конституционного надзора Республики Каракалпакстан. Полномочия Председателя Жокаргы Кенеса Республики Каракалпакстан могут быть приостановлены досрочно по собственному заявлению, а также в случае невозможности выполнения своих обязанностей по состоянию здоровья или другим причинам. В этих случаях выборы нового Председателя Жокаргы Кенеса Республики Каракалпакстан проводятся в двух месячный срок.",
      KK: "Қарақалпақстан Республикасы Жоқарғы Кеңесиниң Баслығы Қарақалпақстан Республикасы Конституциясын ҳәм нызамларын бузған жағдайда Қарақалпақстан Республикасы Жоқарғы Кеңеси тәрепинен шақыртып алыныўы мүмкин. Шақыртып алыў ҳаққындағы қарар Қарақалпақстан Республикасы Конституциялық бақлаў комитетиниң жуўмағын есапқа алып, Қарақалпақстан Республикасы Жоқарғы Кеңеси депутатларының үштен бир бөлегиниң басламасы бойынша Қарақалпақстан Республикасы Жоқарғы Кеңеси депутатларының улыўма санының кеминде үштен екисиниң көпшилик даўысы менен қабыл етиледи. Қарақалпақстан Республикасы Жоқарғы Кеңесиниң Баслығы өз ўәкиллигин жеке арзасы бойынша, сондай-ақ, денсаўлығына ҳәм басқа да себеплерге байланыслы ўазыйпаларын атқара алмайтуғын жағдайларда тоқтатыўы мүмкин. Қарақалпақстан Республикасы Жоқарғы Кеңеси Баслығының ўәкиллигин тоқтатыў ҳаққындағы қарар Қарақалпақстан Республикасы Жоқарғы Кеңеси депутатларының улыўма санының көпшилик даўысы менен қабылланады. Бундай жағдайларда еки ай мүддет ишинде Қарақалпақстан Республикасы Жоқарғы Кеңесиниң жаңа Баслығын сайлаў өткериледи.",
      EN: "The Chairperson of the Jokargy Kenes of the Republic of Karakalpakstan may be recalled by the Jokargy Kenes of the Republic of Karakalpakstan in the event of violation of the Constitution and laws of the Republic of Karakalpakstan. A decision on recall is adopted by a majority of no fewer than two‑thirds of the total number of deputies of the Jokargy Kenes of the Republic of Karakalpakstan, upon the initiative of one‑third of the deputies, taking into account the conclusion of the Committee of Constitutional Oversight of the Republic of Karakalpakstan. The powers of the Chairperson of the Jokargy Kenes of the Republic of Karakalpakstan may be terminated early upon his own request, as well as in the event of inability to perform his duties due to health or other reasons. In such cases, elections for a new Chairperson of the Jokargy Kenes of the Republic of Karakalpakstan shall be held within two months.",
      PL: "Przewodniczący Jokargy Kenesu Republiki Karakalpakstanu może zostać odwołany przez Jokargy Kenes w przypadku naruszenia Konstytucji i ustaw Republiki Karakalpakstanu. Decyzja o odwołaniu podejmowana jest większością co najmniej dwóch trzecich ogólnej liczby deputowanych Jokargy Kenesu, na wniosek jednej trzeciej deputowanych, z uwzględnieniem opinii Komitetu Nadzoru Konstytucyjnego Republiki Karakalpakstanu. Uprawnienia Przewodniczącego mogą zostać zakończone przed upływem kadencji na jego własny wniosek, a także w przypadku niemożności wykonywania obowiązków z powodu stanu zdrowia lub innych przyczyn. W takich przypadkach wybory nowego Przewodniczącego Jokargy Kenesu Republiki Karakalpakstanu przeprowadza się w terminie dwóch miesięcy."
    },
    comp: {
      RU: "УСЛОВНО. Возможность отзыва Председателя Верховного Совета за нарушение Конституции и законов близка к принципу верховенства закона, изложенному в статье 4 Декларации. Однако механизм отзыва действует только в рамках Конституции, утвержденной Узбекистаном.",
      KK: "ШӘРТЛИ ҚАЙШЫ. Жоқарғы Кеңес Баслығын Конституция ҳәм нызамларды бузғаны ушын шақырып алыў имканияты Декларацияның 4-статьясындағы нызам үстинлиги принципине жақын. Бирақ шақырып алыў механизми Өзбекстан тастыйықлаған Конституция шеңберинде ғана ислейди.",
      EN: "CONDITIONAL. The possibility of recalling the Chairman of the Supreme Council for violation of the Constitution and laws is close to the principle of the rule of law in Article 4 of the Declaration. However, the recall mechanism operates only within the framework of the Constitution approved by Uzbekistan.",
      PL: "WARUNKOWE. Możliwość odwołania przewodniczącego Rady Najwyższej za naruszenie konstytucji i ustaw jest zbliżona do zasady praworządności zawartej w artykule 4 deklaracji. Jednak mechanizm wycofania działa tylko w ramach Konstytucji zatwierdzonej przez Uzbekistan."
    }
  },
  {
    id: 84,
    title: "84-статья",
    cat: "amber",
    declRefLabel: {
      RU: "2. СТРУКТУРА ПАРЛАМЕНТА",
      KK: "2. ПАРЛАМЕНТ СТРУКТУРАСЫ",
      EN: "2. PARLIAMENT STRUCTURE",
      PL: "2. STRUKTURA PARLAMENTU"
    },
    declFull: {
      RU: "Депутатам Жокаргы Кенеса Республики Каракалпакстан в установленном порядке возмещаются расходы, связанные с депутатской деятельностью. Депутаты, работающие в Жокаргы Кенесе Республики Каракалпакстан и его органах на постоянной основе, на период своих полномочий не могут занимать какую-либо иную оплачиваемую должность, заниматься предпринимательской деятельностью.",
      KK: "Қарақалпақстан Республикасының Жоқарғы Кеңеси депутатларының депутатлық жумысы менен байланыслы қәрежетлери белгиленген тәртипте өтеледи. Қарақалпақстан Республикасы Жоқарғы Кеңесинде ҳәм оның уйымларында турақлы тийкарда ислейтуғын депутатлар өз ўәкилликлери дәўиринде ҳақы төленетуғын басқа бир лаўазымды ийелеўи, исбилерменлик жумыс пенен шуғылланыўы мүмкин емес.",
      EN: "Deputies of the Jokargy Kenes of the Republic of Karakalpakstan shall be reimbursed, in the prescribed manner, for expenses related to their parliamentary activities. Deputies working in the Jokargy Kenes of the Republic of Karakalpakstan and its bodies on a permanent basis may not hold any other paid position or engage in entrepreneurial activity during their term of office.",
      PL: "Deputowanym Jokargy Kenesu Republiki Karakalpakstanu przysługuje zwrot kosztów związanych z wykonywaniem mandatu w trybie określonym ustawą. Deputowani pracujący w Jokargy Kenesie i jego organach na zasadzie stałej nie mogą w okresie pełnienia mandatu zajmować żadnego innego płatnego stanowiska ani prowadzić działalności gospodarczej."
    },
    full: {
      RU: "Для организации работы Жокаргы Кенеса Республики Каракалпакстан и осуществления иных полномочий образуется Президиум Жокаргы Кенеса Республики Каракалпакстан. В состав Президиума Жокаргы Кенеса Республики Каракалпакстан входят Председатель Жокаргы Кенеса, его заместитель, председатели комиссий Жокаргы Кенеса, руководители партийных групп в Жокаргы Кенесе Республики Каракалпакстан.",
      KK: "Қарақалпақстан Республикасы Жоқарғы Кеңесиниң жумысын шөлкемлестириў ҳәм басқа да ўәкилликлерин әмелге асырыў ушын, Қарақалпақстан Республикасы Жоқарғы Кеңесиниң Президиумы дүзиледи. Қарақалпақстан Республикасы Жоқарғы Кеңеси Президиумының қурамына Жоқарғы Кеңес Баслығы, оның орынбасары, Жоқарғы Кеңестиң комитетлери ҳәм комиссияларының баслықлары, Қарақалпақстан Республикасы Жоқарғы Кеңесиндеги партиялық топарлардың басшылары киреди.",
      EN: "To organize the work of the Jokargy Kenes of the Republic of Karakalpakstan and t exercise other powers, the Presidium of the Jokargy Kenes of the Republic of Karakalpakstan is established. The Presidium of the Jokargy Kenes of the Republic of Karakalpakstan includes the Chairperson of the Jokargy Kenes, the Deputy Chairperson, the chairpersons of the committees and commissions of the Jokargy Kenes, and the leaders of party groups in the Jokargy Kenes of the Republic of Karakalpakstan.",
      PL: "W celu organizacji pracy Rady Najwyższej (Dżokargy Kenes) Republiki Karakałpacji oraz wykonywania innych uprawnień tworzone jest Prezydium Rady Najwyższej Republiki Karakałpacji. W skład Prezydium Rady Najwyższej Republiki Karakałpacji wchodzą Przewodniczący Rady Najwyższej, jego zastępca, przewodniczący komitetów i komisji Rady Najwyższej oraz liderzy grup partyjnych w Radzie Najwyższej Republiki Karakałpacji."
    },
    comp: {
      RU: "УСЛОВНО. Норма о формировании Президиума для организации деятельности Верховного Совета близка к принципу обеспечения деятельности Верховного Совета, изложенному в статье 2 Декларации. Однако в состав Президиума входят партийные группы, которые действуют в рамках основного закона Узбекистана.",
      KK: "ШӘРТЛИ ҚАЙШЫ. Жоқарғы Кеңестиң жумысын шөлкемлестириў ушын Президиум дүзилетуғыны ҳаққындағы норма Декларация 2-статьясындағы Жоқарғы Кеңестиң жумысын тәмийинлеў принципине жақын. Бирақ Президиум қурамына партия топарлары киргизилип, олар Өзбекстан тийкарғы нызамы шеңберинде жумыс алып барады.",
      EN: "CONDITIONAL. The provision on the formation of a Presidium for the organization of the activities of the Supreme Council is close to the principle of ensuring the activities of the Supreme Council contained in Article 2 of the Declaration. However, party groups are included in the Presidium and operate within the framework of the Constitution of Uzbekistan.",
      PL: "WARUNKOWE. Postanowienie o utworzeniu Prezydium dla organizacji działalności Rady Najwyższej jest zbliżone do zasady zapewnienia działalności Rady Najwyższej zawartej w artykule 2 deklaracji. Jednak grupy partyjne są częścią Prezydium i działają w ramach Konstytucji Uzbekistanu."
    }
  },
  {
    id: 85,
    title: "85-статья",
    cat: "red",
    declRefLabel: {
      RU: "2. ИСКЛЮЧИТЕЛЬНОЕ ПРАВО",
      KK: "2. АЙРЫҚША ҲУҚЫҚ",
      EN: "2. EXCLUSIVE RIGHT",
      PL: "2. WYŁĄCZNE PRAWO"
    },
    declFull: {
      RU: "Депутатам Жокаргы Кенеса Республики Каракалпакстан в установленном порядке возмещаются расходы, связанные с депутатской деятельностью. Депутаты, работающие в Жокаргы Кенесе Республики Каракалпакстан и его органах на постоянной основе, на период своих полномочий не могут занимать какую-либо иную оплачиваемую должность, заниматься предпринимательской деятельностью.",
      KK: "Қарақалпақстан Республикасының Жоқарғы Кеңеси депутатларының депутатлық жумысы менен байланыслы қәрежетлери белгиленген тәртипте өтеледи. Қарақалпақстан Республикасы Жоқарғы Кеңесинде ҳәм оның уйымларында турақлы тийкарда ислейтуғын депутатлар өз ўәкилликлери дәўиринде ҳақы төленетуғын басқа бир лаўазымды ийелеўи, исбилерменлик жумыс пенен шуғылланыўы мүмкин емес.",
      EN: "Deputies of the Jokargy Kenes of the Republic of Karakalpakstan shall be reimbursed, in the prescribed manner, for expenses related to their parliamentary activities. Deputies working in the Jokargy Kenes of the Republic of Karakalpakstan and its bodies on a permanent basis may not hold any other paid position or engage in entrepreneurial activity during their term of office.",
      PL: "Deputowanym Jokargy Kenesu Republiki Karakalpakstanu przysługuje zwrot kosztów związanych z wykonywaniem mandatu w trybie określonym ustawą. Deputowani pracujący w Jokargy Kenesie i jego organach na zasadzie stałej nie mogą w okresie pełnienia mandatu zajmować żadnego innego płatnego stanowiska ani prowadzić działalności gospodarczej."
    },
    full: {
      RU: "Президиум Жокаргы Кенеса Республики Каракалпакстан: 1) готовит предложения по повестке дня и порядку работы сессии Жокаргы Кенеса; 2) заслушивает сообщения комитетов и комиссий Жокаргы Кенеса о проводимой работе и информации об исполнении законов Республики Каракалпакстан и решений Жокаргы Кенеса; 3) организует планирование законопроектной работы; 4) по предложению Председателя Жокаргы Кенеса предварительно рассматривает проекты законов и другие документы; 5) анализирует предложения и замечания депутатов, высказанные на сессии Жокаргы Кенеса и принимает по ним соответствующие решения; 6) награждает государственными наградами Республики Каракалпакстан и присваивает почетные звания Республики Каракалпакстан; 7) в период между сессиями Жокаргы Кенеса Республики Каракалпакстан по представлению Председателя Совета Министров Республики Каракалпакстан назначает и освобождает от должности заместителей Председателя Совета Министров Республики Каракалпакстан и членов Совета Министров Республики Каракалпакстан, образует и упраздняет министерства, государственные комитеты и другие органы государственного управления Республики Каракалпакстан с последующим внесением постановлений по этим вопросам на утверждение Жокаргы Кенеса Республики Каракалпакстан; 8) назначаются и освобождаются судьи судов Республики Каракалпакстан, председатели и судьи межрайонных, районных (городских) судов Республики Каракалпакстан. 9) представляет Жокаргы Кенесу Республики Каракалпакстан по согласованию с Генеральным прокурором Республики Узбекистан кандидатуру на должность Прокурора Республики Каракалпакстан; 10) в период между сессиями дает согласие на привлечение депутата Жокаргы Кенеса к ответственности в случае и порядке, установленных законом, а также на прекращение с ним трудового договора по инициативе работодателя; 11) рассматривает другие вопросы, связанные с работой Жокаргы Кенеса и эффективным осуществлением депутатами своих полномочий. Президиум Жокаргы Кенеса Республики Каракалпакстан по вопросам, входящим в его компетенцию, издает постановления, которые публикуются в установленном порядке.",
      KK: "Қарақалпақстан Республикасы Жоқарғы Кеңесиниң Президиумы: 1) Жоқарғы Кеңес сессиясының күн тәртиби ҳәм жумыс тәртиби бойынша усыныслар таярлайды; 2) Жоқарғы Кеңес комитетлери ҳәм комиссияларының жүргизип атырған жумысы ҳаққында билдириўлерин ҳәм Қарақалпақстан Республикасы нызамларының ҳәм Жоқарғы Кеңестиң қарарларының орынланыўы бойынша мәлимлемелерин тыңлайды; 3) нызам жойбарлары бойынша жумыстың жобаластырылыўын шөлкемлестиреди; 4) Жоқарғы Кеңес Баслығының усынысы менен нызам жойбарларын ҳәм басқа да ҳүжжетлерди алдын ала қарап шығады; 5) Жоқарғы Кеңестиң сессиясында депутатлардың билдирген усыныс ҳәм пикирлерин талқылайды ҳәм олар бойынша тийисли қарарлар қабыл етеди; 6) Қарақалпақстан Республикасының мәмлекетлик сыйлықлары менен сыйлықлайды ҳәм Қарақалпақстан Республикасының ҳүрметли атақларын береди; 7) Қарақалпақстан Республикасы Жоқарғы Кеңесиниң сессиялары аралығындағы дәўирде Қарақалпақстан Республикасы Министрлер Кеңеси Баслығының усыныўы менен Қарақалпақстан Республикасы Министрлер Кеңеси Баслығының орынбасарларын және Қарақалпақстан Республикасы Министрлер Кеңесиниң ағзаларын тайынлайды ҳәм лаўазымынан босатады, Қарақалпақстан Республикасы министрликлерин, мәмлекетлик комитетлерин ҳәм басқа да мәмлекетлик басқарыў уйымларын дүзеди ҳәм сапластырады, кейин ала бул мәселелер бойынша қарарды Қарақалпақстан Республикасы Жоқарғы Кеңесиниң тастыйықлаўына усынады; 8) Қарақалпақстан Республикасы судларының судьялары, сондай-ақ, районлараралық, районлық ҳәм қалалық судларының баслықлары ҳәм судьяларын тайынлаў, қайта тайынлаў ҳәм лаўазымынан босатыў бойынша қарар қабыл етеди; 9) Қарақалпақстан Республикасы Жоқарғы Кеңесине Өзбекстан Республикасы Бас прокурорының келисими менен Қарақалпақстан Республикасының Прокуроры лаўазымына кандидатура усынады; 10) сессиялар аралығындағы дәўирде Жоқарғы Кеңес депутатын нызам менен белгиленген жағдайда ҳәм тәртипте жуўапкершиликке тартыўға, сондай-ақ, жумыс бериўшиниң басламасы бойынша оның менен мийнет шәртнамасын тоқтатыўға келисим береди; 11) Жоқарғы Кеңестиң жумысына ҳәм депутатлардың өз ўәкилликлерин нәтийжели әмелге асырыўына байланыслы басқа да мәселелерди қарайды. Қарақалпақстан Республикасы Жоқарғы Кеңесиниң Президиумы өз ўәкилликлерине тийисли мәселелер бойынша қарарлар шығарады, олар белгиленген тәртипте жәрияланады.",
      EN: "The Presidium of the Jokargy Kenes of the Republic of Karakalpakstan: 1) prepares proposals for the agenda and the procedure of the session of the Jokargy Kenes; 2) hears reports from the committees and commissions of the Jokargy Kenes on their work and information on the implementation of the laws of the Republic of Karakalpakstan and the decisions of the Jokargy Kenes; 3) organizes the planning of legislative work; 4) upon the proposal of the Chairperson of the Jokargy Kenes, preliminarily reviews draft laws and other documents; 5) analyzes proposals and comments made by deputies during the session of the Jokargy Kenes and adopts appropriate decisions on them; 6) confers state awards of the Republic of Karakalpakstan and grants honorary titles of the Republic of Karakalpakstan; 7) during the period between sessions of the Jokargy Kenes of the Republic of Karakalpakstan, upon the submission of the Chairperson of the Council of Ministers of the Republic of Karakalpakstan, appoints and dismisses the deputy chairpersons of the Council of Ministers of the Republic of Karakalpakstan and members of the Council of Ministers of the Republic of Karakalpakstan, establishes and abolishes ministries, state committees, and other bodies of state administration of the Republic of Karakalpakstan, with subsequent submission of resolutions on these matters for approval by the Jokargy Kenes of the Republic of Karakalpakstan; 8) appoints and dismisses judges of the courts of the Republic of Karakalpakstan, as well as chairpersons and judges of inter‑district and district (city) courts of the Republic of Karakalpakstan; 9) submits to the Jokargy Kenes of the Republic of Karakalpakstan, in agreement with the Prosecutor General of the Republic of Uzbekistan, a candidate for the position of Prosecutor of the Republic of Karakalpakstan; 10) uring the period between sessions, gives consent to bringing a deputy of the Jokargy Kenes to liability in cases and in the manner prescribed by law, as well as to terminating their employment contract at the initiative of the employer; 11) considers other issues related to the work of the Jokargy Kenes and the effective exercise of deputies’ powers. The Presidium of the Jokargy Kenes of the Republic of Karakalpakstan issues resolutions on matters within its competence, which are published in the prescribed manner.",
      PL: "Prezydium Jokargy Kenesu Republiki Karakalpakstanu: 1) przygotowuje propozycje dotyczące porządku obrad i trybu pracy sesji Jokargy Kenesu; 2) wysłuchuje sprawozdań komitetów i komisji Jokargy Kenesu o prowadzonej pracy oraz informacji o wykonaniu ustaw Republiki Karakalpakstanu i decyzji Jokargy Kenesu; 3) organizuje planowanie prac legislacyjnych; 4) na wniosek Przewodniczącego Jokargy Kenesu wstępnie rozpatruje projekty ustaw i inne dokumenty; 5) analizuje propozycje i uwagi deputowanych zgłoszone na sesji Jokargy Kenesu i podejmuje odpowiednie decyzje; 6) przyznaje odznaczenia państwowe Republiki Karakalpakstanu oraz nadaje honorowe tytuły Republiki Karakalpakstanu; 7) w okresie między sesjami, na wniosek Przewodniczącego Rady Ministrów Republiki Karakalpakstanu, powołuje i odwołuje zastępców Przewodniczącego Rady Ministrów oraz członków Rady Ministrów Republiki Karakalpakstanu, tworzy i likwiduje ministerstwa, komitety państwowe i inne organy administracji państwowej Republiki Karakalpakstanu, przedstawiając następnie odpowiednie uchwały do zatwierdzenia przez Jokargy Kenes; 8) powołuje i odwołuje sędziów sądów Republiki Karakalpakstanu, przewodniczących i sędziów sądów międzyrejonowych oraz rejonowych (miejskich) Republiki Karakalpakstanu; 9) przedstawia Jokargy Kenesowi Republiki Karakalpakstanu, w porozumieniu z Prokuratorem Generalnym Republiki Uzbekistanu, kandydaturę na stanowisko Prokuratora Republiki Karakalpakstanu; 10) w okresie między sesjami wyraża zgodę na pociągnięcie deputowanego Jokargy Kenesu do odpowiedzialności w przypadkach i trybie określonych ustawą, a także na rozwiązanie z nim umowy o pracę z inicjatywy pracodawcy; 11) rozpatruje inne kwestie związane z pracą Jokargy Kenesu i skutecznym wykonywaniem obowiązków przez deputowanych. Prezydium Jokargy Kenesu Republiki Karakalpakstanu wydaje uchwały w sprawach należących do jego kompetencji, które są publikowane w trybie przewidzianym prawem."
    },
    comp: {
      RU: "ПРОТИВОРЕЧИЕ. Статья 2 Декларации определяет назначение членов Совета Министров как исключительное право власти Республики Каракалпакстан. Согласно Конституции, Президиум назначает членов Совета Министров в период между сессиями с согласия Президента Узбекистана и формирует министерства - исключительное суверенное право остается зависимым от разрешения узбекской стороны.",
      KK: "ҚАЙШЫ. Декларацияның 2-статьясында Министрлер Кеңеси ағзаларын тайынлаў Қарақалпақстан Республикасы ҳәкимиятының айрықша ҳуқықы деп белгиленген. Конституцияда болса Президиум сессиялар аралығында Министрлер Кеңеси ағзаларын Өзбекстан Президентиниң келисими менен тайынлайды ҳәм министрликлерди дүзеди - айрықша суверен ҳуқық Өзбекстан тәрепиниң рухсатына байланыслы болып қалған.",
      EN: "CONTRADICTION. Article 2 of the Declaration defines the appointment of Council of Ministers members as the exclusive right of the authorities of the Republic of Karakalpakstan. According to the Constitution, the Presidium appoints members of the Council of Ministers between sessions with the consent of the President of Uzbekistan and forms ministries - the exclusive sovereign right remains dependent on the permission of the Uzbek side.",
      PL: "SPRZECZNOŚĆ. Artykuł 2 deklaracji określa powołanie członków Rady Ministrów jako wyłączne prawo organów władzy Republiki Karakalpakstanu. Zgodnie z konstytucją Prezydium powołuje członków Rady Ministrów między sesjami za zgodą prezydenta Uzbekistanu i tworzy Ministerstwa - wyłączne suwerenne prawo pozostaje zależne od zgody strony Uzbeckiej."
    }
  },
  {
    id: 86,
    title: "86-статья",
    cat: "amber",
    declRefLabel: {
      RU: "2. ИСПОЛНИТЕЛЬНЫЙ ОРГАН",
      KK: "2. АТҚАРЫЎШЫ УЙЫМ",
      EN: "2. EXECUTIVE BODY",
      PL: "2. ORGAN WYKONAWCZY"
    },
    declFull: {
      RU: "Депутатам Жокаргы Кенеса Республики Каракалпакстан в установленном порядке возмещаются расходы, связанные с депутатской деятельностью. Депутаты, работающие в Жокаргы Кенесе Республики Каракалпакстан и его органах на постоянной основе, на период своих полномочий не могут занимать какую-либо иную оплачиваемую должность, заниматься предпринимательской деятельностью.",
      KK: "Қарақалпақстан Республикасының Жоқарғы Кеңеси депутатларының депутатлық жумысы менен байланыслы қәрежетлери белгиленген тәртипте өтеледи. Қарақалпақстан Республикасы Жоқарғы Кеңесинде ҳәм оның уйымларында турақлы тийкарда ислейтуғын депутатлар өз ўәкилликлери дәўиринде ҳақы төленетуғын басқа бир лаўазымды ийелеўи, исбилерменлик жумыс пенен шуғылланыўы мүмкин емес.",
      EN: "Deputies of the Jokargy Kenes of the Republic of Karakalpakstan shall be reimbursed, in the prescribed manner, for expenses related to their parliamentary activities. Deputies working in the Jokargy Kenes of the Republic of Karakalpakstan and its bodies on a permanent basis may not hold any other paid position or engage in entrepreneurial activity during their term of office.",
      PL: "Deputowanym Jokargy Kenesu Republiki Karakalpakstanu przysługuje zwrot kosztów związanych z wykonywaniem mandatu w trybie określonym ustawą. Deputowani pracujący w Jokargy Kenesie i jego organach na zasadzie stałej nie mogą w okresie pełnienia mandatu zajmować żadnego innego płatnego stanowiska ani prowadzić działalności gospodarczej."
    },
    full: {
      RU: "Совет Министров Республики Каракалпакстан — Правительство Республики Каракалпакстан — является высшим исполнительно-распорядительным органом государственной власти Республики Каракалпакстан.",
      KK: "Қарақалпақстан Республикасы Министрлер Кеңеси - Қарақалпақстан Республикасының Ҳүкимети Қарақалпақстан Республикасының мәмлекетлик ҳәкимиятының жоқары атқарыўшы - басқарыўшы уйымы болып табылады.",
      EN: "The Council of Ministers of the Republic of Karakalpakstan — the Government of the Republic of Karakalpakstan — is the highest executive and administrative body of state power of the Republic of Karakalpakstan.",
      PL: "Rada Ministrów Republiki Karakalpakstanu — Rząd Republiki Karakalpakstanu — jest najwyższym organem władzy wykonawczo‑administracyjnej Republiki Karakalpakstanu."
    },
    comp: {
      RU: "УСЛОВНО. Статья 2 Декларации определяет Совет Министров как «высший исполнительный орган». Это определение сохраняется и в Конституции, но Совет Министров также определен в качестве органа, исполняющего акты Президента Узбекистана и Кабинета Министров.",
      KK: "ШӘРТЛИ ҚАЙШЫ. Декларацияның 2-статьясында Министрлер Кеңеси «жоқары атқарыўшы уйым» деп белгиленген. Конституцияда да усы анықлама сақланған, бирақ Министрлер Кеңеси Өзбекстан Президентиниң ҳәм Министрлер Кабинетиниң актлерин орынлаўшы уйым сыпатында да белгиленген.",
      EN: "CONDITIONAL. Article 2 of the Declaration designates the Cabinet of Ministers as the highest executive body. This definition is also preserved in the Constitution, but the Cabinet of Ministers is also designated as the body executing the acts of the President of Uzbekistan and the Cabinet of Ministers.",
      PL: "WARUNKOWE. Artykuł 2 Deklaracji określa rada Ministrów jako najwyższy organ władzy wykonawczej. Definicja ta jest również zapisana w Konstytucji, ale Gabinet Ministrów również wyznaczony jako organ, pełniący akty Prezydenta Uzbekistanu i Gabinetu Ministrów."
    }
  },
  {
    id: 87,
    title: "87-статья",
    cat: "red",
    declRefLabel: {
      RU: "2. СУВЕРЕННОЕ УПРАВЛЕНИЕ",
      KK: "2. СУВЕРЕН БАСҚАРЫЎ",
      EN: "2. SOVEREIGN MANAGEMENT",
      PL: "2. SUWERENNE ZARZĄDZANIE"
    },
    declFull: {
      RU: "Депутатам Жокаргы Кенеса Республики Каракалпакстан в установленном порядке возмещаются расходы, связанные с депутатской деятельностью. Депутаты, работающие в Жокаргы Кенесе Республики Каракалпакстан и его органах на постоянной основе, на период своих полномочий не могут занимать какую-либо иную оплачиваемую должность, заниматься предпринимательской деятельностью.",
      KK: "Қарақалпақстан Республикасының Жоқарғы Кеңеси депутатларының депутатлық жумысы менен байланыслы қәрежетлери белгиленген тәртипте өтеледи. Қарақалпақстан Республикасы Жоқарғы Кеңесинде ҳәм оның уйымларында турақлы тийкарда ислейтуғын депутатлар өз ўәкилликлери дәўиринде ҳақы төленетуғын басқа бир лаўазымды ийелеўи, исбилерменлик жумыс пенен шуғылланыўы мүмкин емес.",
      EN: "Deputies of the Jokargy Kenes of the Republic of Karakalpakstan shall be reimbursed, in the prescribed manner, for expenses related to their parliamentary activities. Deputies working in the Jokargy Kenes of the Republic of Karakalpakstan and its bodies on a permanent basis may not hold any other paid position or engage in entrepreneurial activity during their term of office.",
      PL: "Deputowanym Jokargy Kenesu Republiki Karakalpakstanu przysługuje zwrot kosztów związanych z wykonywaniem mandatu w trybie określonym ustawą. Deputowani pracujący w Jokargy Kenesie i jego organach na zasadzie stałej nie mogą w okresie pełnienia mandatu zajmować żadnego innego płatnego stanowiska ani prowadzić działalności gospodarczej."
    },
    full: {
      RU: "Совет Министров Республики Каракалпакстан образуется Жокаргы Кенесом Республики Каракалпакстан. Совет Министров Республики Каракалпакстан обеспечивает руководство эффективным функционированием экономики, социальной и духовной сферы, исполнение законов Республики Узбекистан и иных решений Олий Мажлиса Республики Узбекистан, указов, постановлений и распоряжений Президента Республики Узбекистан, постановлений и распоряжений Кабинета Министров Республики Узбекистан, законов Республики Каракалпакстан и иных решений Жокаргы Кенеса Республики Каракалпакстан, постановлений Президиума Жокаргы Кенеса Республики Каракалпакстан. Совет Министров Республики Каракалпакстан приостанавливает, отменяет акты органов государственного управления Республики Каракалпакстан, а также хакимов районов и городов.",
      KK: "Қарақалпақстан Республикасының Министрлер Кеңеси Қарақалпақстан Республикасының Жоқарғы Кеңеси тәрепинен дүзиледи. Қарақалпақстан Республикасы Министрлер Кеңеси экономиканың нәтийжели ислеўине, социаллық ҳәм руўхый тараўларға басшылық етиўди, Өзбекстан Республикасы нызамларының ҳәм Өзбекстан Республикасы Олий Мажлисиниң басқа да шешимлериниң, Өзбекстан Республикасы Президенти пәрманларының, қарарларының ҳәм бийликлериниң, Өзбекстан Республикасы Министрлер Кабинети қарарларының ҳәм бийликлериниң, Қарақалпақстан Республикасы нызамларының ҳәм Қарақалпақстан Республикасы Жоқарғы Кеңесиниң басқа да шешимлериниң, Қарақалпақстан Республикасы Жоқарғы Кеңеси Президиумы қарарларының орынланыўын тәмийинлейди. Қарақалпақстан Республикасы Министрлер Кеңеси Қарақалпақстан Республикасы мәмлекетлик басқарыў уйымларының, сондай-ақ, районлар ҳәм қалалар ҳәкимлериниң актлерин тоқтатады, бийкарлайды.",
      EN: "The Council of Ministers of the Republic of Karakalpakstan is formed by the Jokargy Kenes of the Republic of Karakalpakstan. The Council of Ministers of the Republic of Karakalpakstan ensures the effective functioning of the economy, the social and spiritual spheres, and the implementation of the laws of the Republic of Uzbekistan and other decisions of the Oliy Majlis of the Republic of Uzbekistan, decrees, resolutions, and orders of the President of the Republic of Uzbekistan, resolutions and orders of the Cabinet of Ministers of the Republic of Uzbekistan, the laws of the Republic of Karakalpakstan and other decisions of the Jokargy Kenes of the Republic of Karakalpakstan, as well as the resolutions of the Presidium of the Jokargy Kenes of the Republic of Karakalpakstan. The Council of Ministers of the Republic of Karakalpakstan suspends or annuls acts of state administration bodies of the Republic of Karakalpakstan, as well as acts of district and city khakims.",
      PL: "Rada Ministrów Republiki Karakalpakstanu jest powoływana przez Jokargy Kenes Republiki Karakalpakstanu. Rada Ministrów Republiki Karakalpakstanu zapewnia kierowanie efektywnym funkcjonowaniem gospodarki, sfery społecznej i duchowej, wykonaniem ustaw Republiki Uzbekistanu i innych decyzji Oliy Majlisu Republiki Uzbekistanu, dekretów, uchwał i zarządzeń Prezydenta Republiki Uzbekistanu, uchwał i zarządzeń Gabinetu Ministrów Republiki Uzbekistanu, ustaw Republiki Karakalpakstanu i innych decyzji Jokargy Kenesu Republiki Karakalpakstanu, uchwał Prezydium Jokargy Kenesu Republiki Karakalpakstanu. Rada Ministrów Republiki Karakalpakstanu zawiesza lub uchyla akty organów administracji państwowej Republiki Karakalpakstanu, a także akty hakimów rejonów i miast."
    },
    comp: {
      RU: "ПРОТИВОРЕЧИЕ. Статья 2 Декларации гласит, что Совет Министров действует самостоятельно в качестве высшего исполнительного органа. В Конституции четко определено, что Совет Министров обеспечивает исполнение решений Олий Мажлиса, указов Президента Узбекистана и подписей Кабинета Министров Узбекистана - исполнительная власть стала непосредственным инструментом Узбекистана.",
      KK: "ҚАЙШЫ. Декларацияның 2-статьясында Министрлер Кеңеси жоқары атқарыўшы уйым сыпатында еркин жумыс алып барады деп белгиленген. Конституцияда болса Министрлер Кеңеси Өзбекстан Олий Мажлиси қарарлары, Өзбекстан Президенти Пәрманлары ҳәм Өзбекстан Министрлер Кабинетиниң қол қойыўларын орынлаўды тәмийинлейтуғыны анық белгиленген - атқарыўшы ҳәкимият Өзбекстанның тиккелей қуралына айланған.",
      EN: "CONTRADICTION. Article 2 of the Declaration stipulates that the Cabinet of Ministers acts independently as the highest executive body. The Constitution clearly stipulates that the Cabinet of Ministers ensures the implementation of decisions of the Oliy Majlis of Uzbekistan, decrees of the President of Uzbekistan, and signatures of the Cabinet of Ministers of Uzbekistan - the executive branch has become a direct instrument of Uzbekistan.",
      PL: "SPRZECZNOŚĆ. Artykuł 2 deklaracji stanowi, że Rada Ministrów działa samodzielnie jako najwyższy organ wykonawczy. Konstytucja wyraźnie stwierdza, że Gabinet Ministrów egzekwuje decyzje Oliy Majlis Uzbekistanu, dekrety prezydenta Uzbekistanu i podpisy Gabinetu Ministrów Uzbekistanu - władza wykonawcza stała się bezpośrednim narzędziem Uzbekistanu."
    }
  },
  {
    id: 88,
    title: "88-статья",
    cat: "red",
    declRefLabel: {
      RU: "2. ГЛАВА ПРАВИТЕЛЬСТВА",
      KK: "2. ҲҮКИМЕТ БАСЛЫҒЫ",
      EN: "2. HEAD OF GOVERNMENT",
      PL: "2. SZEF RZĄDU"
    },
    declFull: {
      RU: "Депутатам Жокаргы Кенеса Республики Каракалпакстан в установленном порядке возмещаются расходы, связанные с депутатской деятельностью. Депутаты, работающие в Жокаргы Кенесе Республики Каракалпакстан и его органах на постоянной основе, на период своих полномочий не могут занимать какую-либо иную оплачиваемую должность, заниматься предпринимательской деятельностью.",
      KK: "Қарақалпақстан Республикасының Жоқарғы Кеңеси депутатларының депутатлық жумысы менен байланыслы қәрежетлери белгиленген тәртипте өтеледи. Қарақалпақстан Республикасы Жоқарғы Кеңесинде ҳәм оның уйымларында турақлы тийкарда ислейтуғын депутатлар өз ўәкилликлери дәўиринде ҳақы төленетуғын басқа бир лаўазымды ийелеўи, исбилерменлик жумыс пенен шуғылланыўы мүмкин емес.",
      EN: "Deputies of the Jokargy Kenes of the Republic of Karakalpakstan shall be reimbursed, in the prescribed manner, for expenses related to their parliamentary activities. Deputies working in the Jokargy Kenes of the Republic of Karakalpakstan and its bodies on a permanent basis may not hold any other paid position or engage in entrepreneurial activity during their term of office.",
      PL: "Deputowanym Jokargy Kenesu Republiki Karakalpakstanu przysługuje zwrot kosztów związanych z wykonywaniem mandatu w trybie określonym ustawą. Deputowani pracujący w Jokargy Kenesie i jego organach na zasadzie stałej nie mogą w okresie pełnienia mandatu zajmować żadnego innego płatnego stanowiska ani prowadzić działalności gospodarczej."
    },
    full: {
      RU: "Совет Министров Республики Каракалпакстан возглавляет Председатель, назначаемый на должность Жокаргы Кенесом Республики Каракалпакстан по представлению Председателя Жокаргы Кенеса, согласованному с Президентом Республики Узбекистан. Председатель Совета Министров Республики Каракалпакстан по должности входит в состав Кабинета Министров Республики Узбекистан. Председатель Совета Министров Республики Каракалпакстан: 1) осуществляет руководство деятельностью правительства и принимает меры для эффективного осуществления ими своих полномочий; 2) представляет Жокаргы Кенесу Республики Каракалпакстан, а в период между сессиями в Президиум Жокаргы Кенеса Республики Каракалпакстан, кандидатуры для назначения и освобождения от должности заместителей Председателя Совета Министров и членов Совета Министров Республики Каракалпакстан; 3) распределяет обязанности между заместителями Председателя Совета Министров с последующим утверждением Президиумом Совета Министров; 4) представляет Жокаргы Кенесу Республики Каракалпакстан, а в период между сессиями в Президиум Жокаргы Кенеса Республики Каракалпакстан, предложения об образовании и упразднении министерств, государственных комитетов и других органов государственного управления Республики Каракалпакстан; 5) представляет Председателю Жокаргы Кенеса Республики Каракалпакстан кандидатуры для назначения и освобождения от должности хакимов районов и городов и их заместителей; 6) председательствует на заседаниях Совета Министров и его Президиума; 7) обеспечивает коллегиальность в работе Совета Министров; 8) принимает решения по отдельным вопросам государственного и хозяйственного управления, не требующим рассмотрения на заседании Совета Министров и его Президиума; 9) осуществляет иные полномочия, отнесенные законом к его компетенции.",
      KK: "Қарақалпақстан Республикасы Министрлер Кеңесин Қарақалпақстан Республикасы Жоқарғы Кеңеси Баслығының усыныўы бойынша Өзбекстан Республикасы Президентиниң келисими менен Жоқарғы Кеңес тәрепинен тайынланатуғын Баслық басқарады. Қарақалпақстан Республикасы Министрлер Кеңесиниң Баслығы лаўазымы бойынша Өзбекстан Республикасы Министрлер Кабинетиниң қурамына киреди. Қарақалпақстан Республикасы Министрлер Кеңесиниң Баслығы: 1) ҳүкиметтиң жумысына басшылық етеди ҳәм оның өз ўәкилликлерин нәтийжели әмелге асырыў ушын илажлар қабыл етеди; 2) Қарақалпақстан Республикасы Жоқарғы Кеңесине, ал сессиялар аралығындағы дәўирде Қарақалпақстан Қарақалпақстан Жоқарғы Кеңесиниң Президиумына Қарақалпақстан Республикасы Министрлер Кеңеси Баслығының орынбасарларын ҳәм Қарақалпақстан Республикасы Министрлер Кеңесиниң ағзаларын тайынлаў ҳәм лаўазымынан босатыў ҳаққында кандидатуралар усынады; 3) Министрлер Кеңеси Баслығының орынбасарлары арасында ўазыйпаларды бөлистиреди ҳәм кейин ала оны Министрлер Кеңесиниң Президиумында тастыйықлатады; 4) Қарақалпақстан Республикасы Жоқарғы Кеңесине, ал сессиялар аралығындағы дәўирде Қарақалпақстан Республикасы Жоқарғы Кеңесиниң Президиумына Қарақалпақстан Республикасының министрликлерин, мәмлекетлик комитетлерин ҳәм басқа да мәмлекетлик басқарыў уйымларын дүзиў ҳәм сапластырыў ҳаққында усыныслар береди; 5) Қарақалпақстан Республикасы Жоқарғы Кеңесиниң Баслығына районлар, қалалар ҳәкимлерин ҳәм олардың орынбасарларын тайынлаў ҳәм лаўазымынан босатыў ҳаққында кандидатуралар усынады; 6) Министрлер Кеңеси ҳәм оның Президиумының мәжилислерине басшылық етеди; 7) Министрлер Кеңесиниң жумысында коллегиаллықты тәмийинлейди; 8) Министрлер Кеңеси ҳәм оның Президиумының мәжилисинде қаралыўды талап етпейтуғын, мәмлекетлик ҳәм хожалық басқарыўының айырым мәселелери бойынша шешимлер қабыл етеди; 9) өз ўәкиллиги шеңберинде нызам тәрепинен белгиленген басқа да ўәкилликлерди әмелге асырады.",
      EN: "The Council of Ministers of the Republic of Karakalpakstan is headed by a Chairperson appointed by the Jokargy Kenes of the Republic of Karakalpakstan upon the submission of the Chairperson of the Jokargy Kenes, agreed with the President of the Republic of Uzbekistan. The Chairperson of the Council of Ministers of the Republic of Karakalpakstan is, by virtue of office, a member of the Cabinet of Ministers of the Republic of Uzbekistan. The Chairperson of the Council of Ministers of the Republic of Karakalpakstan: 1) directs the activities of the government and takes measures to ensure the effective exercise of its powers; 2) submits to the Jokargy Kenes of the Republic of Karakalpakstan, and between sessions to the Presidium of the Jokargy Kenes, candidates for appointment and dismissal of deputy chairpersons of the Council of Ministers and members of the Council of Ministers of the Republic of Karakalpakstan; 3) distributes duties among the deputy chairpersons of the Council of Ministers, with subsequent approval by the Presidium of the Council of Ministers; 4) submits to the Jokargy Kenes of the Republic of Karakalpakstan, and between sessions to the Presidium of the Jokargy Kenes, proposals on the establishment and abolition of inistries, state committees, and other bodies of state administration of the Republic of Karakalpakstan; 5) submits to the Chairperson of the Jokargy Kenes of the Republic of Karakalpakstan candidates for appointment and dismissal of district and city khakims and their deputies; 6) presides over meetings of the Council of Ministers and its Presidium; 7) ensures collegiality in the work of the Council of Ministers; 8) makes decisions on individual issues of state and economic administration that do not require consideration at meetings of the Council of Ministers or its Presidium; 9) exercises other powers assigned to him by law.",
      PL: "Radą Ministrów Republiki Karakalpakstanu kieruje Przewodniczący, powoływany na stanowisko przez Jokargy Kenes Republiki Karakalpakstanu na wniosek Przewodniczącego Jokargy Kenesu, uzgodniony z Prezydentem Republiki Uzbekistanu. Przewodniczący Rady Ministrów Republiki Karakalpakstanu z urzędu wchodzi w skład Gabinetu Ministrów Republiki Uzbekistanu. Przewodniczący Rady Ministrów Republiki Karakalpakstanu: 1) kieruje działalnością rządu i podejmuje działania zapewniające skuteczne wykonywanie jego uprawnień; 2) przedstawia Jokargy Kenesowi Republiki Karakalpakstanu, a w okresie między sesjami — Prezydium Jokargy Kenesu, kandydatury na stanowiska zastępców Przewodniczącego Rady Ministrów oraz członków Rady Ministrów Republiki Karakalpakstanu; 3) rozdziela obowiązki między zastępców Przewodniczącego Rady Ministrów, z późniejszym zatwierdzeniem przez Prezydium Rady Ministrów; 4) przedstawia Jokargy Kenesowi Republiki Karakalpakstanu, a w okresie między sesjami — Prezydium Jokargy Kenesu, propozycje dotyczące tworzenia i likwidacji ministerstw, komitetów państwowych i innych organów administracji państwowej Republiki Karakalpakstanu; 5) przedstawia Przewodniczącemu Jokargy Kenesu Republiki Karakalpakstanu kandydatury na stanowiska hakimów rejonów i miast oraz ich zastępców; 6) przewodniczy posiedzeniom Rady Ministrów i jej Prezydium; 7) zapewnia kolegialność pracy Rady Ministrów; 8) podejmuje decyzje w sprawach państwowych i gospodarczych, które nie wymagają rozpatrzenia na posiedzeniu Rady Ministrów lub jej Prezydium 9) wykonuje inne uprawnienia przewidziane ustawą."
    },
    comp: {
      RU: "ПРОТИВОРЕЧИЕ. Статья 2 Декларации гласит, что Председатель Совета Министров назначается органами Республики Каракалпакстан. Согласно Конституции, Председатель Совета Министров «назначается с согласия Президента Республики Узбекистан» и является членом Кабинета Министров Узбекистана. Глава исполнительной власти подчиняется непосредственно Узбекистану.",
      KK: "ҚАЙШЫ. Декларацияның 2-статьясында Министрлер Кеңесиниң Баслығы Қарақалпақстан Республикасы уйымлары тәрепинен тайынланатуғыны белгиленген. Конституцияда болса Министрлер Кеңеси баслығы «Өзбекстан Республикасы Президентиниң келисими менен тайынланады» ҳәм өзи де Өзбекстан Министрлер Кабинетиниң ағзасы болыўы белгиленген - атқарыўшы ҳәкимияттың басшысы тиккелей Өзбекстанға бойсынады.",
      EN: "CONTRADICTION. Article 2 of the Declaration stipulates that the Chairman of the Council of Ministers is appointed by the bodies of the Republic of Karakalpakstan. The Constitution stipulates that the Chairman of the Cabinet of Ministers is “appointed with the consent of the President of the Republic of Uzbekistan” and is also a member of the Cabinet of Ministers of Uzbekistan. The head of the executive branch is directly subordinate to Uzbekistan.",
      PL: "SPRZECZNOŚĆ. W artykule 2 deklaracji wskazano, że przewodniczący Rady Ministrów jest powoływany przez organy Republiki Karakalpakstanu. Konstytucja stanowi, że przewodniczący Gabinetu Ministrów jest „powoływany za zgodą prezydenta Republiki Uzbekistanu” i jest również członkiem gabinetu ministrów Uzbekistanu. Szef władzy wykonawczej podlega bezpośrednio Uzbekistanowi."
    }
  },
  {
    id: 89,
    title: "89-статья",
    cat: "red",
    declRefLabel: {
      RU: "1. ОТВЕТСТВЕННОСТЬ",
      KK: "1. ЖУЎАПКЕРШИЛИК",
      EN: "1. ACCOUNTABILITY",
      PL: "1. ODPOWIEDZIALNOŚĆ"
    },
    declFull: {
      RU: "Республика Каракалпакстан берет под свое правовое управление все договора и соглашения, которые Советская Республика Каракалпакстан заключила с Союзом ССР и Узбекской Социалистической Республикой и делегирует себе все полномочия. Строит необходимую структуру Государственного управления на всех административных уровнях на своей территории. Республика Каракалпакстан, далее именуемая Республика строит все свои административные округа, создает необходимые административно хозяйственные разделения и органы государственного управления, такие как судебный, арбитражный и прокурорский надзор и другие осуществляет исключительно самостоятельно.",
      KK: "Қарақалпақстан Республикасы дүзилген шəртнамалар тийкарында Өзбекстан ССРына ҳəм СССРға ықтыярлы берилетуғын ҳуқықлық ўəкиллерден басқа мəмлекетлик ҳəкимиятқа өз аймағында толық ийе болады. Республика өзиниң мəмлекетлик дүзилисин, ҳəкимшилик-аймақлық бөлиниўин мəмлекетлик ҳəкимият ҳəм басқарыў уйымлары системасын, сондай-ақ судты, арбитражды ҳəм прокурорлық бақлаў шөлкемлестириў ислерин өз бетинше белгилейди.",
      EN: "The Republic of Karakalpakstan takes under its legal control all the treaties and agreements that the Soviet Republic. The Republic of Karakalpakstan has concluded with the USSR and the Uzbek Socialist Republic and delegates all its powers to itself. Builds the necessary structure of State administration at all administrative levels on its territory, the Republic of Karakalpakstan hereinafter referred to as the Republic builds all its administrative districts, creates the necessary administrative divisions and state administration bodies, such as the judicial, arbitration and prosecutorial supervision and others are carried out exclusively independently.",
      PL: "Republika Karakalpakstanu przejmuje pod swoją jurysdykcję wszystkie traktaty i umowy zawarte przez Radziecką Republikę Karakalpakstanu z ZSRR i Uzbecką SRR oraz deleguje wszystkie uprawnienia sobie. Buduje niezbędną strukturę administracji państwowej na wszystkich poziomach administracyjnych na swoim terytorium. Republika tworzy swoje okręgi administracyjne, ustanawia podziały gospodarczo-administracyjne oraz organy państwowe, takie jak sądy, arbitraż i nadzór prokuratorski, które działają wyłącznie niezależnie."
    },
    full: {
      RU: "Совет Министров Республики Каракалпакстан ответственен и подотчетен перед Жокаргы Кенесом Республики Каракалпакстан. Совет Министров Республики Каракалпакстан не реже одного раза в год отчитывается о своей работе перед Жокаргы Кенесом Республики Каракалпакстан. Совет Министров Республики Каракалпакстан слагает свои полномочия перед вновь избранным Жокаргы Кенесом Республики Каракалпакстан.",
      KK: "Қарақалпақстан Республикасы Министрлер Кеңеси Қарақалпақстан Республикасы Жоқарғы Кеңесиниң алдында жуўапкерли және оған есап береди. Қарақалпақстан Республикасы Министрлер Кеңеси өз жумысы ҳаққында Қарақалпақстан Республикасы Жоқарғы Кеңесиниң алдында ҳәр жылы кеминде бир рет есап береди. Қарақалпақстан Республикасы Министрлер Кеңеси жаңадан сайланған Қарақалпақстан Республикасы Жоқарғы Кеңеси алдында өз ўәкилликлерин тоқтатады.",
      EN: "The Council of Ministers of the Republic of Karakalpakstan is responsible and accountable to the Jokargy Kenes of the Republic of Karakalpakstan. The Council of Ministers of the Republic of Karakalpakstan reports on its activities to the Jokargy Kenes of the Republic of Karakalpakstan at least once a year. The Council of Ministers of the Republic of Karakalpakstan resigns its powers before the newly elected Jokargy Kenes of the Republic of Karakalpakstan.",
      PL: "Rada Ministrów Republiki Karakalpakstanu jest odpowiedzialna i podlega sprawozdawczości przed Jokargy Kenesem Republiki Karakalpakstanu. Rada Ministrów Republiki Karakalpakstanu składa sprawozdanie ze swojej działalności przed Jokargy Kenesem co najmniej raz w roku. Rada Ministrów Republiki Karakalpakstanu składa swoje uprawnienia przed nowo wybranym Jokargy Kenesem Republiki Karakalpakstanu."
    },
    comp: {
      RU: "ПРОТИВОРЕЧИЕ. В Конституции определено, что Председатель Жокаргы Кенеса Республики Каракалпакстан является высшим должностным лицом Республики. В статье 1 Декларации говорится, что Республика обладает полной государственной властью. Если в Конституции высшее должностное лицо имеет статус подотчетного Президенту Республики Узбекистан или подчиняющегося его решениям, это противоречит полному суверенитету, закрепленному в Декларации.",
      KK: "ҚАЙШЫ. Конституцияда Қарақалпақстан Республикасы Жоқарғы Кеңесиниң Баслығы - Республиканың ең жоқары лаўазымлы шахсы екенлиги белгиленген. Декларацияның 1-статьясында Республика «мәмлекетлик ҳәкимиятқа толық ийе» екени айтылған. Конституцияда ең жоқары лаўазымлы шахс Өзбекстан Республикасы Президентине есап бериўши яки оның қарарларына бойсыныўшы статусқа ийе болса, бул Декларациядағы толық суверенитетке қарсы келеди.",
      EN: "CONTRADICTION. The Constitution stipulates that the Chairman of the Supreme Council of the Republic of Karakalpakstan is the highest official of the Republic. Article 1 of the Declaration states that the Republic “has full state power”. If the highest-ranking official in the Constitution has the status of an accountable person to the President of the Republic of Uzbekistan or is subordinate to his decisions, this contradicts the full sovereignty enshrined in the Declaration.",
      PL: "SPRZECZNOŚĆ. Konstytucja stanowi, że przewodniczący Rady Najwyższej Republiki Karakalpakstan jest najwyższym urzędnikiem Republiki. Artykuł 1 deklaracji stanowi, że Republika ma „pełną władzę państwową”. Jeśli najwyższy urzędnik w konstytucji ma status odpowiedzialnego przed prezydentem Republiki Uzbekistanu lub podlega jego decyzjom, jest to sprzeczne z pełną suwerennością zapisaną w deklaracji."
    }
  },
  {
    id: 90,
    title: "90-статья",
    cat: "red",
    declRefLabel: {
      RU: "2. ПРАВОТВОРЧЕСТВО",
      KK: "2. НЫЗАМ ДӨРЕТИЎШИЛИК",
      EN: "2. LAWMAKING",
      PL: "2. STANOWIENIE PRAWA"
    },
    declFull: {
      RU: "Депутатам Жокаргы Кенеса Республики Каракалпакстан в установленном порядке возмещаются расходы, связанные с депутатской деятельностью. Депутаты, работающие в Жокаргы Кенесе Республики Каракалпакстан и его органах на постоянной основе, на период своих полномочий не могут занимать какую-либо иную оплачиваемую должность, заниматься предпринимательской деятельностью.",
      KK: "Қарақалпақстан Республикасының Жоқарғы Кеңеси депутатларының депутатлық жумысы менен байланыслы қәрежетлери белгиленген тәртипте өтеледи. Қарақалпақстан Республикасы Жоқарғы Кеңесинде ҳәм оның уйымларында турақлы тийкарда ислейтуғын депутатлар өз ўәкилликлери дәўиринде ҳақы төленетуғын басқа бир лаўазымды ийелеўи, исбилерменлик жумыс пенен шуғылланыўы мүмкин емес.",
      EN: "Deputies of the Jokargy Kenes of the Republic of Karakalpakstan shall be reimbursed, in the prescribed manner, for expenses related to their parliamentary activities. Deputies working in the Jokargy Kenes of the Republic of Karakalpakstan and its bodies on a permanent basis may not hold any other paid position or engage in entrepreneurial activity during their term of office.",
      PL: "Deputowanym Jokargy Kenesu Republiki Karakalpakstanu przysługuje zwrot kosztów związanych z wykonywaniem mandatu w trybie określonym ustawą. Deputowani pracujący w Jokargy Kenesie i jego organach na zasadzie stałej nie mogą w okresie pełnienia mandatu zajmować żadnego innego płatnego stanowiska ani prowadzić działalności gospodarczej."
    },
    full: {
      RU: "Совет Министров Республики Каракалпакстан на основе и во исполнение законов Республики Узбекистан и иных решений Олий Мажлиса Республики Узбекистан, указов, постановлений и распоряжений Президента Республики Узбекистан, постановлений и распоряжений Кабинета Министров Республики Узбекистан, законов Республики Каракалпакстан и иных решений Жокаргы Кенеса Республики Каракалпакстан, постановлений Президиума Жокаргы Кенеса Республики Каракалпакстан издает постановления и распоряжения, которые обязательны к исполнению на всей территории Республики Каракалпакстан.",
      KK: "Қарақалпақстан Республикасы Министрлер Кеңеси Өзбекстан Республикасы нызамлары ҳәм Өзбекстан Республикасы Олий Мажлисиниң басқа да қарарлары, Өзбекстан Республикасы Президентиниң пәрманлары, қарарлары ҳәм бийликлери, Өзбекстан Республикасы Министрлер Кабинетиниң қарарлары ҳәм бийликлери, Қарақалпақстан Республикасының нызамлары ҳәм Қарақалпақстан Республикасы Жоқарғы Кеңесиниң басқа да қарарлары, Қарақалпақстан Республикасы Жоқарғы Кеңеси Президиумының қарарлары тийкарында және оларды орынлай отырып, Қарақалпақстан Республикасының пүткил аймағында орынланыўы шәртли болған қарарлар менен бийликлер шығарады.",
      EN: "The Council of Ministers of the Republic of Karakalpakstan, on the basis of and in execution of the laws of the Republic of Uzbekistan and other decisions of the Oliy Majlis of the Republic of Uzbekistan, decrees, resolutions, and orders of the President of the Republic of Uzbekistan, resolutions and orders of the Cabinet of Ministers of the Republic of Uzbekistan, the laws of the Republic of Karakalpakstan and other decisions of the Jokargy Kenes of the Republic of Karakalpakstan, and the resolutions of the Presidium of the Jokargy Kenes of the Republic of Karakalpakstan, issues resolutions and orders that are mandatory for execution throughout the territory of the Republic of Karakalpakstan.",
      PL: "Rada Ministrów Republiki Karakalpakstanu, na podstawie i w wykonaniu ustaw Republiki Uzbekistanu i innych decyzji Oliy Majlisu Republiki Uzbekistanu, dekretów, uchwał i zarządzeń Prezydenta Republiki Uzbekistanu, uchwał i zarządzeń Gabinetu Ministrów Republiki Uzbekistanu, ustaw Republiki Karakalpakstanu i innych decyzji Jokargy Kenesu Republiki Karakalpakstanu, uchwał Prezydium Jokargy Kenesu Republiki Karakalpakstanu, wydaje uchwały i zarządzenia obowiązujące na całym terytorium Republiki Karakalpakstanu."
    },
    comp: {
      RU: "ПРОТИВОРЕЧИЕ. Статья 2 Декларации гласит, что Республика Каракалпакстан самостоятельно принимает и исполняет свои законы. В Конституции же установлено, что решения Совета Министров издаются исключительно на основе законов Узбекистана, указов Президента Узбекистана и постановлений Кабинета Министров Узбекистана - исполнительная власть полностью превратилась в механизм, исполняющий акты Узбекистана.",
      KK: "ҚАЙШЫ. Декларацияның 2-статьясында Қарақалпақстан Республикасы өз нызамларын еркин түрде қабыл етеди ҳәм орынлайды деп белгиленген. Конституцияда болса Министрлер Кеңесиниң қарарлары тек ғана Өзбекстан нызамлары, Өзбекстан Президентиниң Пәрманлары ҳәм Өзбекстан Министрлер Кабинетиниң қарарлары тийкарында шығарылыўы белгиленген - атқарыўшы ҳәкимият толық түрде Өзбекстан актлерин орынлаўшы механизмге айланған.",
      EN: "CONTRADICTION. Article 2 of the Declaration states that the Republic of Karakalpakstan independently adopts and enforces its laws. The Constitution stipulates that decisions of the Cabinet of Ministers are made solely on the basis of the laws of Uzbekistan, decrees of the President of Uzbekistan, and resolutions of the Cabinet of Ministers of Uzbekistan - the executive branch has become a full-fledged mechanism for implementing Uzbek legislation.",
      PL: "SPRZECZNOŚĆ. Artykuł 2 deklaracji stanowi, że Republika Karakalpakstanu samodzielnie przyjmuje i stosuje swoje prawa. Konstytucja stanowi, że decyzje Rady Ministrów są podejmowane wyłącznie na podstawie przepisów Uzbekistanu, dekretów prezydenta Uzbekistanu i dekretów Rady Ministrów Uzbekistanu-władza wykonawcza stała się pełnoprawnym mechanizmem wdrażania ustawodawstwa uzbeckiego."
    }
  },
  { id: 91, 
    title: "91-статья", cat: "amber",
    declRefLabel: { 
        RU: "2. ОРГАНЫ УПРАВЛЕНИЯ", 
        KK: "2. БАСҚАРЫЎ УЙЫМЛАРЫ", 
        EN: "2. GOVERNING BODIES", 
        PL: "2. ORGANY ZARZĄDZANIA" 
    },
    declFull: { 
        RU: "Республика Каракалпакстан проводит государственное управление, принятие законов и указов и назначает судебные органы, осуществляющие надзор над исполнением принятого законодательства. Совет Министров Республики Каракалпакстан является высшим исполнительным и управляющим органом, осуществляющий принятие необходимых законов, управление и надзор над исполнением принятых законов. Совет Министров Республики Каракалпакстан является верховным исполнительным органом и органом управления. Верховный Суд Республики Каракалпакстан является Высшим Судом. Верховный Совет Республики Каракалпакстан назначает Генерального Прокурора осуществляющего надзор над исполнением закона, правопорядок и равного права всех перед законом.", 
        KK: "Қарақалпақстан Республикасында мəмлекетлик ҳəкимият ҳəм нызам шығарыў, атқарыўшы ҳəм суд уйымларына бөлистириў принципине муўапық əмелге асырылады. -Қарақалпақстан Республикасының Жоқарғы Кеңеси Қарақалпақстан Республикасы мəмлекетлик ҳəкимиятының жоқары уйымы болып табылады, ол өз жумысында нызам шығарыў, бийлик етиў ҳəм қадағалаў ўазыйпаларын əмелге асырады. -Қарақалпақстан Республикасының Министрлер Кеңеси Қарақалпақстан Республикасының Мəмлекетлик ҳəкимиятының жоқарғы атқарыўшы ҳəм бийлик етиўши уйымы болып табылады. -Қарақалпақстан Республикасының Жоқарғы Суды Қарақалпақстан Республикасының Жоқарғы Суд уйымы болып табылады. -Қарақалпақстан Республикасы Жоқарғы Совети тайынлайтуғын Қарақалпақстан Республикасының прокуроры нызамлардың саррас ҳəм бир қыйлы орынланыўын жоқары дəрежеде бақлап отырады.", 
        EN: "The Republic of Karakalpakstan conducts public administration, enacts laws and decrees, and appoints judicial bodies that oversee the implementation of the adopted legislation. The Supreme Council of the Republic of Karakalpakstan is the supreme body of state administration, which makes the necessary laws, manages and supervises the implementation of the adopted laws. The Council of Ministers of the Republic of Karakalpakstan is the supreme executive body and governing body. The Supreme Court of the Republic of Karakalpakstan is the Highest Court. The Supreme Council of the Republic of Karakalpakstan appoints the Prosecutor General to oversee the implementation of the law, the rule of law and the equal rights of all before the law.", 
        PL: "Republika Karakalpakstanu prowadzi administrację państwową, uchwala ustawy i dekrety oraz powołuje organy sądowe sprawujące nadzór nad wykonaniem przyjętego ustawodawstwa. Najwyższa Rada Republiki Karakalpakstanu jest najwyższym organem administracji państwowej. Rada Ministrów Republiki Karakalpakstanu jest najwyższym organem wykonawczym i zarządzającym. Najwyższy Sąd Republiki Karakalpakstanu jest najwyższym organem sądowym. Najwyższa Rada powołuje Prokuratora Generalnego sprawującego nadzór nad przestrzeganiem prawa i równością obywateli wobec prawa." 
    },
    full: { 
        RU: "Полномочия Совета Министров Республики Каракалпакстан, порядок его деятельности, отношения Совета Министров Республики Каракалпакстан с другими государственными органами Республики Каракалпакстан определяются законом Республики Каракалпакстан.", 
        KK: "Қарақалпақстан Республикасы Министрлер Кеңесиниң ўәкилликлери, оның жумыс тәртиби, Қарақалпақстан Республикасының басқа да мәмлекетлик уйымлары менен Қарақалпақстан Республикасы Министрлер Кеңесиниң мүнәсибетлери Қарақалпақстан Республикасының нызамы менен белгиленеди.", 
        EN: "The powers of the Council of Ministers of the Republic of Karakalpakstan, its procedure of activity, and the relations of the Council of Ministers of the Republic of Karakalpakstan with other state bodies of the Republic of Karakalpakstan shall be determined by the law of the Republic of Karakalpakstan.", 
        PL: "Uprawnienia Rady Ministrów Republiki Karakałpakstanu, tryb jej działalności oraz stosunki Rady Ministrów Republiki Karakałpakstanu z innymi organami państwowymi Republiki Karakałpakstanu określa ustawa Republiki Karakałpakstanu." 
    },
    comp: { 
        RU: "УСЛОВНО. Хотя закон принимается в РК, его содержание жестко ограничено рамками Конституции РУз, что не соответствует понятию суверенного формирования системы органов власти.", 
        KK: "ШӘРТЛИ ҚАЙШЫ. Министрлер Кеңесиниң ўәкилликлери ҚКР нызамы менен белгилениўи Декларацияға жақын. Бирақ бул нызам Өзбекстан шеңберинде қабыл етиледи.", 
        EN: "CONDITIONAL. Although the law is adopted in RK, its content is strictly limited by the Uzbekistan Constitution, which does not match the concept of sovereign formation of the power system.", 
        PL: "WARUNKOWE. Choć ustawa jest przyjmowana w RK, jej treść jest ściśle ograniczona Konstytucją Uzbekistanu, co nie odpowiada suwerennemu formowaniu systemu władzy." 
    }
  },
  {
    id: 92,
    title: "92-статья",
    cat: "amber",
    declRefLabel: {
      RU: "2. ВЫСШИЙ СУДЕБНЫЙ ОРГАН",
      KK: "2. ЖОҚАРҒЫ СОТ УЙЫМЫ",
      EN: "2. SUPREME JUDICIAL BODY",
      PL: "2. NACZELNY ORGAN SĄDOWY"
    },
    declFull: {
      RU: "Депутатам Жокаргы Кенеса Республики Каракалпакстан в установленном порядке возмещаются расходы, связанные с депутатской деятельностью. Депутаты, работающие в Жокаргы Кенесе Республики Каракалпакстан и его органах на постоянной основе, на период своих полномочий не могут занимать какую-либо иную оплачиваемую должность, заниматься предпринимательской деятельностью.",
      KK: "Қарақалпақстан Республикасының Жоқарғы Кеңеси депутатларының депутатлық жумысы менен байланыслы қәрежетлери белгиленген тәртипте өтеледи. Қарақалпақстан Республикасы Жоқарғы Кеңесинде ҳәм оның уйымларында турақлы тийкарда ислейтуғын депутатлар өз ўәкилликлери дәўиринде ҳақы төленетуғын басқа бир лаўазымды ийелеўи, исбилерменлик жумыс пенен шуғылланыўы мүмкин емес.",
      EN: "Deputies of the Jokargy Kenes of the Republic of Karakalpakstan shall be reimbursed, in the prescribed manner, for expenses related to their parliamentary activities. Deputies working in the Jokargy Kenes of the Republic of Karakalpakstan and its bodies on a permanent basis may not hold any other paid position or engage in entrepreneurial activity during their term of office.",
      PL: "Deputowanym Jokargy Kenesu Republiki Karakalpakstanu przysługuje zwrot kosztów związanych z wykonywaniem mandatu w trybie określonym ustawą. Deputowani pracujący w Jokargy Kenesie i jego organach na zasadzie stałej nie mogą w okresie pełnienia mandatu zajmować żadnego innego płatnego stanowiska ani prowadzić działalności gospodarczej."
    },
    full: {
      RU: "Представительными органами власти в районах и городах (кроме городов районного подчинения) являются Советы народных депутатов, возглавляемые хакимами, которые, исходя из интересов государства и граждан, решают вопросы, отнесенные к их компетенции.",
      KK: "Ҳәкимлер тәрепинен басқарылатуғын халық депутатларының Кеңеслери районлардағы ҳәм қалалардағы (районлық бағыныўдағы қалалардан басқа) мәмлекеттиң ҳәм пуқаралардың мәплерине тийкарлана отырып, өз ўәкиллигине тийисли мәселелерди шешетуғын ўәкилликли ҳәкимият уйымлары болып табылады.",
      EN: "The representative bodies of authority in districts and cities (except for cities of district subordination) are the Councils of People's Deputies, headed by khokims, which resolve issues within their competence based on the interests of the state and citizens.",
      PL: "Organami przedstawicielskimi w rejonach i miastach (z wyjątkiem miast podporządkowanych rejonowi) są Rady Deputowanych Ludowych, którym przewodniczą hakimowie. Działając w interesie państwa i obywateli, rozwiązują oni kwestie należące do ich kompetencji."
    },
    comp: {
      RU: "УСЛОВНО. Норма о том, что Суд Республики Каракалпакстан является высшим судебным органом, близка к принципу, изложенному в статье 2 Декларации о том, что Верховный Суд является высшей судебной инстанцией. Однако председатель этого суда назначается с согласия Президента Узбекистана и на основании заключения Высшего судейского совета Узбекистана - независимость ограничена.",
      KK: "ШӘРТЛИ ҚАЙШЫ. Қарақалпақстан Республикасы Суды жоқары суд уйымы деп белгиленген норма Декларация 2-статьясындағы Жоқары Суд жоқары суд инстанциясы деген принципке жақын. Бирақ бул судтың баслығы Өзбекстан Президентиниң келисими ҳәм Өзбекстан Жоқарғы Судялар Кеңесиниң жуўмағы тийкарында тайынланады - ғәрезсизлик шекленген.",
      EN: "CONDITIONAL. The norm defining the Supreme Court of the Republic of Karakalpakstan as a supreme judicial body is close to the principle stated in Article 2 of the Declaration that the Supreme Court is a supreme judicial instance. However, the chairperson of this court is appointed based on the agreement of the President of Uzbekistan and the conclusion of the Supreme Judicial Council of Uzbekistan - independence is limited.",
      PL: "WARUNKOWE. Norma określająca Sąd Najwyższy Republiki Karakalpakstanu jako najwyższy organ sądowy jest zbliżona do zasady określonej w artykule 2 deklaracji, że Sąd Najwyższy jest najwyższą instancją sądową. Jednakże przewodniczący tego sądu jest powoływany na podstawie umowy prezydenta Uzbekistanu i opinii Najwyższej Rady sędziowskiej Uzbekistanu niezależność jest ograniczona."
    }
  },
  {
    id: 93,
    title: "93-статья",
    cat: "amber",
    declRefLabel: {
      RU: "5. ОТСУТСТВИЕ ПРОТИВОРЕЧИЙ",
      KK: "5. ҚАЙШЫЛЫҚТЫҢ ЖОҚЛЫҒЫ",
      EN: "5. NO CONTRADICTIONS",
      PL: "5. BRAK SPRZECZNOŚCI"
    },
    declFull: {
      RU: "Республика Каракалпакстан осуществляет защиту Конституционных Прав своих граждан, защиту их свобод, защиту их права на труд, защиту их собственности и определяет меры по осуществлению защиты, осуществляет организацию общественной жизни, осуществляет социально-культурное и экономическое развитие, осуществляет внешнеэкономическую деятельность, создание свободных экономических зон, осуществляет управление финансово-бюджетной системы, определяет основы оплаты труда и ценообразование, налоговое управление, защиту своей территории и управление природными ресурсами.",
      KK: "Қарақалпақстан Республикасы пухараларының Конституциялық ҳуқықларын, еркинликлерин ҳəм мийнетлерин, меншик қатнасықларын əмелге асырыў тəртибин, халық хожалығына ҳəм социаллық мəдений қурылысқа басшылық етиўди, сыртқы экономикалық жумысты шөлкемлестириўди, соның ишинде еркин кəрханашылық зоналарын, бюджетлик-финанс системасын мийнетке ҳақы төлеў ҳəм баҳа қойыў, салық салыў,қоршап турған орталықты қорғаў ҳəм тəбийий қорлардан пайдаланыў ислерин нызам менен ретлестириўди өз бетинше əмелге асырады.",
      EN: "The Republic of Karakalpakstan shall protect the Constitutional Rights of its citizens, the protection of their freedoms and protect their the right to work, protection of their property and defines the measures for the implementation of protection, organizes public life, carries out socio-cultural and economic development, provides externally economic activity, the creation of free economic zones, manages financial budget the system determines the basis of wage and pricing, tax administration, protection of its territory and management of natural resources.",
      PL: "Republika Karakalpakstanu chroni konstytucyjne prawa swoich obywateli, ich wolności, prawo do pracy, własności, organizuje życie społeczne, prowadzi rozwój społeczno-kulturalny i gospodarczy, działalność zagraniczną, tworzy wolne strefy ekonomiczne, zarządza systemem finansowo-budżetowym, określa podstawy wynagrodzeń i cen, prowadzi administrację podatkową, chroni swoje terytorium i zarządza zasobami naturalnymi."
    },
    full: {
      RU: "К ведению местных органов власти относятся: обеспечение законности, правопорядка и безопасности граждан; вопросы экономического, социального и культурного развития территорий; формирование и исполнение местного бюджета, установление местных налогов, сборов, формирование внебюджетных фондов; руководство местным коммунальным хозяйством; охрана окружающей среды; обеспечение регистрации актов гражданского состояния; принятие нормативных актов, и иные полномочия, не противоречащие Конституции и законодательству Республики Каракалпакстан.",
      KK: "Жергиликли ҳәкимият уйымларының бийлигине төмендеги мәселелер тийисли: нызамлылықты, ҳуқық тәртибин ҳәм пуқаралардың қәўипсизлигин тәмийинлеў; аймақларды экономикалық, социаллық ҳәм мәдений жақтан раўажландырыў мәселелери; жергиликли бюджетти дүзиў ҳәм орынлаў, жергиликли салықларды, жыйымларды белгилеў, бюджеттен тыс қорларды дүзиў; жергиликли коммуналлық хожалыққа басшылық етиў; қоршап турған орталықты қорғаў; пуқаралық ҳалат актлерин дизимге алыўды тәмийинлеў; Қарақалпақстан Республикасының Конституциясына ҳәм нызамшылығына қайшы келмейтуғын нормативлик актлерди қабыл етиў ҳәм басқа да ўәкилликлерди әмелге асырыў.",
      EN: "The jurisdiction of local authorities includes: Ensuring the rule of law, public order, and the security of citizens; issues of economic, social, and cultural development of the territories; formation and execution of the local budget, establishment of local taxes and fees, and formation of extra-budgetary funds; management of local municipal services; environmental protection; ensuring the registration of acts of civil status; adoption of normative acts, and other powers not contradicting the Constitution and the legislation of the Republic of Karakalpakstan.",
      PL: "Do kompetencji lokalnych organów władzy należą:– zapewnienie legalności, porządku publicznego i bezpieczeństwa obywateli;– kwestie rozwoju gospodarczego, społecznego i kulturalnego terytoriów;– tworzenie i wykonywanie lokalnego budżetu, ustalanie lokalnych podatków i opłat, tworzenie funduszy pozabudżetowych;– zarządzanie lokalną gospodarką komunalną;– ochrona środowiska;– zapewnienie rejestracji aktów stanu cywilnego;– przyjmowanie aktów normatywnych oraz inne uprawnienia, które nie są sprzeczne z Konstytucją i ustawodawstwem Republiki Karakalpakstanu."
    },
    comp: {
      RU: "УСЛОВНО. Права местных органов власти по формированию бюджета, охране окружающей среды и принятию законодательных актов схожи со статьей 5 Декларации. Однако эти права ограничены тем, что они «не должны противоречить Конституции и законодательству Республики Каракалпакстан» - это законодательство подчинено основному закону Узбекистана.",
      KK: "ШӘРТЛИ ҚАЙШЫ. Жергиликли ҳәкимияттың бюджетти қәлиплестириў, экологияны қорғаў ҳәм нызамшылық ҳүжжетлер қабыл етиў ҳуқықлары Декларацияның 5-статьясына жақын. Бирақ бул ҳуқықлар «Қарақалпақстан Республикасы Конституциясы ҳәм нызамшылығына қайшы келмеўи шәрт» деп шекленген - бул нызамшылық Өзбекстан тийкарғы нызамына бойсынған.",
      EN: "CONDITIONAL. The rights of local authorities to form the budget, protect the environment, and adopt legislative acts are close to Article 5 of the Declaration. However, these rights are limited to “not contradicting the Constitution and legislation of the Republic of Karakalpakstan” - this legislation is subject to the Constitution of Uzbekistan.",
      PL: "WARUNKOWE. Prawa samorządów do tworzenia budżetu, ochrony środowiska i uchwalania aktów prawnych są zbliżone do artykułu 5 deklaracji. Jednakże prawa te są ograniczone „nie są sprzeczne z konstytucją i ustawodawstwem Republiki Karakalpakstanu” - ustawodawstwo to podlega Konstytucji Uzbekistanu."
    }
  },
  {
    id: 94,
    title: "94-статья",
    cat: "red",
    declRefLabel: {
      RU: "1. ОТСУТСТВИЕ ПРОТИВОРЕЧИЙ",
      KK: "1. ҚАЙШЫЛЫҚТЫҢ ЖОҚЛЫҒЫ",
      EN: "1. NO CONTRADICTIONS",
      PL: "1. BRAK SPRZECZNOŚCI"
    },
    declFull: {
      RU: "Республика Каракалпакстан берет под свое правовое управление все договора и соглашения, которые Советская Республика Каракалпакстан заключила с Союзом ССР и Узбекской Социалистической Республикой и делегирует себе все полномочия. Строит необходимую структуру Государственного управления на всех административных уровнях на своей территории. Республика Каракалпакстан, далее именуемая Республика строит все свои административные округа, создает необходимые административно хозяйственные разделения и органы государственного управления, такие как судебный, арбитражный и прокурорский надзор и другие осуществляет исключительно самостоятельно.",
      KK: "Қарақалпақстан Республикасы дүзилген шəртнамалар тийкарында Өзбекстан ССРына ҳəм СССРға ықтыярлы берилетуғын ҳуқықлық ўəкиллерден басқа мəмлекетлик ҳəкимиятқа өз аймағында толық ийе болады. Республика өзиниң мəмлекетлик дүзилисин, ҳəкимшилик-аймақлық бөлиниўин мəмлекетлик ҳəкимият ҳəм басқарыў уйымлары системасын, сондай-ақ судты, арбитражды ҳəм прокурорлық бақлаў шөлкемлестириў ислерин өз бетинше белгилейди.",
      EN: "The Republic of Karakalpakstan takes under its legal control all the treaties and agreements that the Soviet Republic. The Republic of Karakalpakstan has concluded with the USSR and the Uzbek Socialist Republic and delegates all its powers to itself. Builds the necessary structure of State administration at all administrative levels on its territory, the Republic of Karakalpakstan hereinafter referred to as the Republic builds all its administrative districts, creates the necessary administrative divisions and state administration bodies, such as the judicial, arbitration and prosecutorial supervision and others are carried out exclusively independently.",
      PL: "Republika Karakalpakstanu przejmuje pod swoją jurysdykcję wszystkie traktaty i umowy zawarte przez Radziecką Republikę Karakalpakstanu z ZSRR i Uzbecką SRR oraz deleguje wszystkie uprawnienia sobie. Buduje niezbędną strukturę administracji państwowej na wszystkich poziomach administracyjnych na swoim terytorium. Republika tworzy swoje okręgi administracyjne, ustanawia podziały gospodarczo-administracyjne oraz organy państwowe, takie jak sądy, arbitraż i nadzór prokuratorski, które działają wyłącznie niezależnie."
    },
    full: {
      RU: "Статья исключена из Конституции. Местные органы власти проводят в жизнь законы Республики Узбекистан и иные решения Олий Мажлиса Республики Узбекистан, указы, постановления и распоряжения Президента Республики Узбекистан, постановления и распоряжения Кабинета Министров Республики Узбекистан, законы Республики Каракалпакстан и иные решения Жокаргы Кенеса Республики Каракалпакстан, постановления Президиума Жокаргы Кенеса Республики Каракалпакстан, постановления и распоряжения Совета Министров Республики Каракалпакстан, участвуют в обсуждении вопросов республиканского и местного значения. Решения вышестоящих органов, принятые в пределах предоставленных им компетенций, обязательны для исполнения нижестоящими органами. Срок полномочий Советов народных депутатов и хакимов — 5 лет.",
      KK: "Жергиликли ҳәкимият уйымлары Өзбекстан Республикасының нызамларын, Өзбекстан Республикасы Олий Мажлисиниң басқа да қарарларын, Өзбекстан Республикасы Президентиниң пәрманларын, қарарларын ҳәм бийликлерин, Өзбекстан Республикасы Министрлер Кабинетиниң қарарларын ҳәм бийликлерин, Қарақалпақстан Республикасының нызамларын ҳәм Қарақалпақстан Республикасы Жоқарғы Кеңесиниң басқа да қарарларын, Қарақалпақстан Республикасы Жоқарғы Кеңеси Президиумының қарарларын, Қарақалпақстан Республикасы Министрлер Кеңесиниң қарарларын ҳәм бийликлерин турмысқа асырады, республикалық ҳәм жергиликли әҳмийеттеги мәселелерди додалаўға қатнасады. Жоқары уйымлардың өз ўәкилликлери шеңберинде қабыл еткен шешимлери төменги уйымлардың орынланыўы ушын миннетли. Халық депутатлары Кеңеслериниң ҳәм ҳәкимлердиң ўәкиллик мүдети – 5 жыл.",
      EN: "Local authorities implement the laws of the Republic of Uzbekistan and other decisions of the Oliy Majlis of the Republic of Uzbekistan, decrees, resolutions, and orders of the President of the Republic of Uzbekistan, resolutions and orders of the Cabinet of Ministers of the Republic of Uzbekistan, laws of the Republic of Karakalpakstan and other decisions of the Jokargy Kenes of the Republic of Karakalpakstan, resolutions of the Presidium of the Jokargy Kenes of the Republic of Karakalpakstan, resolutions and orders of the Council of Ministers of the Republic of Karakalpakstan, and participate in the discussion of issues of republic and local significance. Decisions of superior bodies, adopted within the limits of their granted competences, are binding for execution by subordinate bodies. The term of office for the Councils of People's Deputies and khokims is 5 years.",
      PL: "Lokalne organy władzy wdrażają ustawy Republiki Uzbekistanu i inne decyzje Oliy Majlisu Republiki Uzbekistanu, dekrety, uchwały i zarządzenia Prezydenta Republiki Uzbekistanu, uchwały i zarządzenia Gabinetu Ministrów Republiki Uzbekistanu, ustawy Republiki Karakalpakstanu i inne decyzje Jokargy Kenesu Republiki Karakalpakstanu, uchwały Prezydium Jokargy Kenesu Republiki Karakalpakstanu, uchwały i zarządzenia Rady Ministrów Republiki Karakalpakstanu, a także uczestniczą w omawianiu kwestii o znaczeniu republikańskim i lokalnym. Decyzje organów wyższego szczebla, podjęte w granicach ich kompetencji, są obowiązkowe dla organów niższego szczebla. Kadencja Rad Deputowanych Ludowych i hakimów wynosi 5 lat."
    },
    comp: {
      RU: "ПРОТИВОРЕЧИЕ. Статья 1 Декларации гласит, что местные органы власти подчиняются только законам Республики Каракалпакстан. В Конституции четко закреплено, что местные органы власти обязаны исполнять решения Олий Мажлиса (Парламента) Узбекистана, указы Президента Узбекистана и решения Кабинета Министров Узбекистана - местные органы власти подчиняются непосредственно Узбекистану.",
      KK: "ҚАЙШЫ. Декларацияның 1-статьясында жергиликли ҳәкимият уйымлары тек ғана Қарақалпақстан Республикасының нызамларына бойсыныўы белгиленген. Конституцияда болса жергиликли ҳәкимият Өзбекстан Олий Мажлиси қарарларын, Өзбекстан Президенти Пәрманларын ҳәм Өзбекстан Министрлер Кабинети қарарларын орынлаўға мәжбүр екени анық белгиленген - жергиликли ҳәкимият тиккелей Өзбекстанға бойсынады.",
      EN: "CONTRADICTION. Article 1 of the Declaration stipulates that local government bodies are subject only to the laws of the Republic of Karakalpakstan. The Constitution clearly stipulates that local authorities are obligated to comply with the decisions of the Oliy Majlis of Uzbekistan, the decrees of the President of Uzbekistan, and the decisions of the Cabinet of Ministers of Uzbekistan - local authorities are directly subordinate to Uzbekistan.",
      PL: "SPRZECZNOŚĆ. Artykuł 1 deklaracji stanowi, że samorządy podlegają tylko prawom Republiki Karakalpakstanu. Konstytucja wyraźnie określa, że samorządy lokalne są zobowiązane do wykonywania decyzji Oliy Majlis (Parlamentu) Uzbekistanu, dekretów prezydenta Uzbekistanu i decyzji Gabinetu Ministrów Uzbekistanu - samorządy lokalne podlegają bezpośrednio Uzbekistanowi."
    }
  },
  {
    id: 95,
    title: "95-статья",
    cat: "amber",
    declRefLabel: {
      RU: "1. РЕГИОНАЛЬНЫЙ ГЛАВА",
      KK: "1. АЙМАҚ БАСШЫЛАРЫ",
      EN: "1. REGIONAL HEAD",
      PL: "1. SZEF REGIONALNY"
    },
    declFull: {
      RU: "Республика Каракалпакстан берет под свое правовое управление все договора и соглашения, которые Советская Республика Каракалпакстан заключила с Союзом ССР и Узбекской Социалистической Республикой и делегирует себе все полномочия. Строит необходимую структуру Государственного управления на всех административных уровнях на своей территории. Республика Каракалпакстан, далее именуемая Республика строит все свои административные округа, создает необходимые административно хозяйственные разделения и органы государственного управления, такие как судебный, арбитражный и прокурорский надзор и другие осуществляет исключительно самостоятельно.",
      KK: "Қарақалпақстан Республикасы дүзилген шəртнамалар тийкарында Өзбекстан ССРына ҳəм СССРға ықтыярлы берилетуғын ҳуқықлық ўəкиллерден басқа мəмлекетлик ҳəкимиятқа өз аймағында толық ийе болады. Республика өзиниң мəмлекетлик дүзилисин, ҳəкимшилик-аймақлық бөлиниўин мəмлекетлик ҳəкимият ҳəм басқарыў уйымлары системасын, сондай-ақ судты, арбитражды ҳəм прокурорлық бақлаў шөлкемлестириў ислерин өз бетинше белгилейди.",
      EN: "The Republic of Karakalpakstan takes under its legal control all the treaties and agreements that the Soviet Republic. The Republic of Karakalpakstan has concluded with the USSR and the Uzbek Socialist Republic and delegates all its powers to itself. Builds the necessary structure of State administration at all administrative levels on its territory, the Republic of Karakalpakstan hereinafter referred to as the Republic builds all its administrative districts, creates the necessary administrative divisions and state administration bodies, such as the judicial, arbitration and prosecutorial supervision and others are carried out exclusively independently.",
      PL: "Republika Karakalpakstanu przejmuje pod swoją jurysdykcję wszystkie traktaty i umowy zawarte przez Radziecką Republikę Karakalpakstanu z ZSRR i Uzbecką SRR oraz deleguje wszystkie uprawnienia sobie. Buduje niezbędną strukturę administracji państwowej na wszystkich poziomach administracyjnych na swoim terytorium. Republika tworzy swoje okręgi administracyjne, ustanawia podziały gospodarczo-administracyjne oraz organy państwowe, takie jak sądy, arbitraż i nadzór prokuratorski, które działają wyłącznie niezależnie."
    },
    full: {
      RU: "Представительную и исполнительную власть на соответствующей территории возглавляет хаким района, города.",
      KK: "Тийисли аймақта районның, қаланың ҳәкими ўәкилликли ҳәм атқарыў ҳәкимиятын басқарады.",
      EN: "The representative and executive authority in the respective territory is headed by the khokim of the district or city.",
      PL: "Władzę przedstawicielską i wykonawczą na danym terytorium sprawuje hakim rejonu lub miasta."
    },
    comp: {
      RU: "УСЛОВНО. Норма о том, что территориальную исполнительную и представительную власть возглавляет хоким, близка к структуре административного управления в статье 1 Декларации. Но хокимы назначаются в рамках Конституции Узбекистана.",
      KK: "ШӘРТЛИ ҚАЙШЫ. Аймақлық атқарыўшы ҳәм ўәкилликли ҳәкимиятқа ҳәким басшылық етеди деген норма Декларация 1-статьясындағы ҳәкимшилик басқарыў структурасына жақын. Бирақ ҳәкимлер Өзбекстанның конституциялық шеңберинде тайынланады.",
      EN: "CONDITIONAL. The provision that regional executive and representative power is headed by a governor is similar to the administrative management structure in Article 1 of the Declaration. However, governors are appointed within the framework of Uzbekistan's constitution.",
      PL: "WARUNKOWE. Przepis, że regionalną władzą wykonawczą i przedstawicielską kieruje gubernator, jest podobny do struktury zarządzania administracyjnego w artykule 1 deklaracji. Gubernatorzy są jednak mianowani w ramach Konstytucji Uzbekistanu."
    }
  },
  { id: 96, 
    title: "96-статья", cat: "amber",
    declRefLabel: { 
        RU: "1. САМОУПРАВЛЕНИЕ", 
        KK: "1. ӨЗИН-ӨЗИ БАСҚАРЫЎ", 
        EN: "1. SELF-GOVERNMENT", 
        PL: "1. SAMORZĄDNOŚĆ" 
    },
    declFull: { 
        RU: "Республика Каракалпакстан берет под свое правовое управление все договора и соглашения, которые Советская Республика Каракалпакстан заключила с Союзом ССР и Узбекской Социалистической Республикой и делегирует себе все полномочия. Строит необходимую структуру Государственного управления на всех административных уровнях на своей территории. Республика Каракалпакстан, далее именуемая Республика строит все свои административные округа, создает необходимые административно хозяйственные разделения и органы государственного управления, такие как судебный, арбитражный и прокурорский надзор и другие осуществляет исключительно самостоятельно.", 
        KK: "Қарақалпақстан Республикасы дүзилген шəртнамалар тийкарында Өзбекстан ССРына ҳəм СССРға ықтыярлы берилетуғын ҳуқықлық ўəкиллерден басқа мəмлекетлик ҳəкимиятқа өз аймағында толық ийе болады. Республика өзиниң мəмлекетлик дүзилисин, ҳəкимшилик-аймақлық бөлиниўин мəмлекетлик ҳəкимият ҳəм басқарыў уйымлары системасын, сондай-ақ судты, арбитражды ҳəм прокурорлық бақлаў шөлкемлестириў ислерин өз бетинше белгилейди.", 
        EN: "The Republic of Karakalpakstan takes under its legal control all the treaties and agreements that the Soviet Republic. The Republic of Karakalpakstan has concluded with the USSR and the Uzbek Socialist Republic and delegates all its powers to itself. Builds the necessary structure of State administration at all administrative levels on its territory, the Republic of Karakalpakstan hereinafter referred to as the Republic builds all its administrative districts, creates the necessary administrative divisions and state administration bodies, such as the judicial, arbitration and prosecutorial supervision and others are carried out exclusively independently.", 
        PL: "Republika Karakalpakstanu przejmuje pod swoją jurysdykcję wszystkie traktaty i umowy zawarte przez Radziecką Republikę Karakalpakstanu z ZSRR i Uzbecką SRR oraz deleguje wszystkie uprawnienia sobie. Buduje niezbędną strukturę administracji państwowej na wszystkich poziomach administracyjnych na swoim terytorium. Republika tworzy swoje okręgi administracyjne, ustanawia podziały gospodarczo-administracyjne oraz organy państwowe, takie jak sądy, arbitraż i nadzór prokuratorski, które działają wyłącznie niezależnie." 
    },
    full: { 
        RU: "Хокимы районов и городов назначаются и освобождаются от должности Председателем Жокаргы Кенеса Республики Каракалпакстан по представлению Председателя Совета Министров Республики Каракалпакстан и утверждаются соответствующими Кенгашами народных депутатов. Хокимы городов районного подчинения назначаются и освобождаются от должности хокимом района и утверждаются районным Кенгашем народных депутатов.", 
        KK: "Районлардың ҳәм қалалардың ҳәкимлери Қарақалпақстан Республикасы Министрлер Кеңеси Баслығының усыныўы менен Қарақалпақстан Республикасы Жоқарғы Кеңесиниң Баслығы тәрепинен тайынланады, лаўазымынан босатылады ҳәм халық депутатларының тийисли Кеңеслери тәрепинен тастыйықланады. Районлық бағыныўдағы қалалардың ҳәкимлери районның ҳәкими тәрепинен тайынланады ҳәм лаўазымынан босатылады ҳәм халық депутатларының районлық Кеңеси тәрепинен тастыйықланады.", 
        EN: "The khokims of districts and cities shall be appointed and dismissed by the Chairman of the Jokari Kenes of the Republic of Karakalpakstan upon the recommendation of the Chairman of the Council of Ministers of the Republic of Karakalpakstan and shall be confirmed by the relevant Councils of People's Deputies. The khokims of cities under district jurisdiction shall be appointed and dismissed by the district khokim and confirmed by the district Council of People's Deputies.", 
        PL: "Hokimowie rejonów i miast są mianowani i odwoływani przez Przewodniczącego Żokargy Kenesu Republiki Karakałpakstanu na wniosek Przewodniczącego Rady Ministrów Republiki Karakałpakstanu i zatwierdzani przez właściwe Kengasze deputowanych ludowych. Hokimowie miast podporządkowanych rejonowi są mianowani i odwoływani przez hokima rejonu i zatwierdzani przez rejonowy Kengasz deputowanych ludowych." 
    },
    comp: { 
        RU: "УСЛОВНО. В статье 1 Декларации указано, что административные органы образуются самостоятельно республикой. Хотя назначение губернаторов Председателем Верховного Совета напоминает свободу, этот процесс находится под косвенным контролем центральной власти Узбекистана, поскольку сам Председатель Верховного Совета находится в согласовании с Узбекистаном.", 
        KK: "ШӘРТЛИ ҚАЙШЫ. Декларацияның 1-статьясында ҳәкимшилик уйымлардың республика тәрепинен өз бетинше дүзилетуғыны атап өтилген. Ҳәкимлердиң Жоқарғы Кеңес Баслығы тәрепинен тайынланыўы еркинликке уқсаған болса да, бул процесс Өзбекстанның орайлық ҳәкимиятының тиккелей емес қадағалаўында болады, себеби Жоқарғы Кеңес Баслығының өзи Өзбекстан менен келисилген ҳалда болады.", 
        EN: "CONDITIONAL. Article 1 of the Declaration states that administrative bodies are formed independently by the republic. Although the appointment of governors by the Chairman of the Supreme Council is somewhat arbitrary, this process will be under the indirect control of Uzbekistan's central government, as the Chairman of the Supreme Council himself will be in agreement with Uzbekistan.", 
        PL: "WARUNKOWE. Artykuł 1 deklaracji stanowi, że organy administracyjne są tworzone samodzielnie przez Republikę. Chociaż mianowanie gubernatorów przewodniczącym Rady Najwyższej przypomina wolność, proces ten znajduje się pod pośrednią kontrolą centralnej władzy Uzbekistanu, ponieważ sam Przewodniczący Rady Najwyższej jest w porozumieniu z Uzbekistanem." 
    }
  },
  {
    id: 97,
    title: "97-статья",
    cat: "amber",
    declRefLabel: {
      RU: "3. ГУБЕРНАТОР ОТВЕТСТВЕННОСТЬ",
      KK: "3. ҲӘКИМ ЖУЎАПКЕРШИЛИГИ",
      EN: "3. GOVERNOR RESPONSIBILITY",
      PL: "3. Gubernator ODPOWIEDZIALNOŚĆ"
    },
    declFull: {
      RU: "Многонациональный народ Республики Каракалпакстан определяет и составляет Государство на своей суверенной территории. Народ, опираясь на Конституцию и законы непосредственно и однозначно через избранных депутатов осуществляет государственное управление. Правительство Республики Каракалпакстан уполномоченное властью осуществляет укрепление дружбы народов. Государство всем своим гражданам проживающим на территории Республики Каракалпакстан, не смотря на их политические взгляды, веру исповедания и другие отличия, обеспечивает всех равными правами и свободами.",
      KK: "Қарақалпақстан Республикасының көп миллетли халқы оның мəмлекетлик Суверенитетиниң ўəкили ҳəм дəреги болып табылады. Халық Республиканың Конституциясы ҳəм тийкарында тиккелей жəне халық депутатларының Кеңеслери арқалы мəмлекетлик ҳəкимиятты иске асырады. Қарақалпақстан Республикасы мəмлекетлик ҳəкимиятын толық бийлигин пайдалана отырып, халықлар дослығын беккемлейди.",
      EN: "The multinational people of the Republic of Karakalpakstan shall determine and constitute a State on their sovereign territory. The people, relying on the Constitution and laws, directly and unambiguously through the elected deputies, exercise State administration. The Government of the Republic of Karakalpakstan authorized by the government to strengthen the friendship of peoples. The State provides all its citizens residing in the territory of the Republic of Karakalpakstan with equal rights and freedoms, regardless of their political views, religious beliefs and other differences.",
      PL: "Wielonarodowy naród Republiki Karakalpakstanu określa i konstytuuje Państwo na swoim suwerennym terytorium. Naród, opierając się na Konstytucji i ustawach, bezpośrednio i jednoznacznie poprzez wybranych deputowanych sprawuje władzę państwową. Rząd Republiki Karakalpakstanu umacnia przyjaźń narodów. Państwo zapewnia wszystkim obywatelom równe prawa i wolności, niezależnie od poglądów politycznych, wyznania czy innych różnic."
    },
    full: {
      RU: "Хаким района и города осуществляет свои полномочия на принципах единоначалия и несет персональную ответственность за решения и действия руководимых им органов. Хоким района и города представляет соответствующему Кенгашу народных депутатов отчеты по важнейшим и актуальным вопросам социально-экономического развития района, города, по которым Кенгашем народных депутатов принимаются соответствующие решения. Организация деятельности, объем полномочий хакимов и местных Советов народных депутатов и порядок выборов местных Советов народных депутатов регулируются законом.",
      KK: "Районның ҳәм қаланың ҳәкими өз ўәкилликлерин жекке басшылық етиў принциплери тийкарында әмелге асырады және өзи басшылық ететуғын уйымлардың шешимлери ҳәм ҳәрекетлери ушын жеке жуўапкерли болады. Район ҳәм қала ҳәкими тийисли халық депутатлары Кеңесине районның, қаланың социаллық-экономикалық раўажланыўының ең әҳмийетли мәселелери бойынша есабатлар береди, олар бойынша халық депутатлары Кеңеси тәрепинен тийисли шешимлер қабыл етиледи. Ҳәкимлердиң ҳәм халық депутатлары жергиликли Кеңеслериниң жумысын шөлкемлестириў, ўәкилликлериниң көлеми ҳәм халық депутатлары жергиликли Кеңеслерин сайлаў тәртиби нызам менен тәртиплестириледи.",
      EN: "The khokim of a district or city exercises their powers based on the principles of individual leadership and bears personal responsibility for the decisions and actions of the bodies they lead. The khokim of a district or city presents reports to the relevant Kengash of People's Deputies on the most important and pressing issues of the socio-economic development of the district or city, upon which the Kengash of People's Deputies adopts relevant decisions. The organization of activities, the scope of powers of khokims and local Councils of People's Deputies, and the procedure for elections to local Councils of People's Deputies are regulated by law.",
      PL: "Hakim rejonu lub miasta wykonuje swoje uprawnienia na zasadzie jednoosobowego kierownictwa i ponosi osobistą odpowiedzialność za decyzje i działania kierowanych przez siebie organów. Hakim przedstawia właściwej Radzie Deputowanych Ludowych sprawozdania dotyczące najważniejszych i aktualnych kwestii społeczno‑gospodarczego rozwoju rejonu lub miasta, na podstawie których Rada podejmuje odpowiednie decyzje. Organizacja działalności, zakres uprawnień hakimów oraz lokalnych Rad Deputowanych Ludowych, a także tryb wyborów lokalnych Rad Deputowanych Ludowych określa ustawa."
    },
    comp: {
      RU: "УСЛОВНО. Норма о том, что хоким действует на основе принципа личной ответственности и подотчетен перед народом, близка к принципу ответственности перед народом, изложенному в статье 3 Декларации. Однако, поскольку механизм назначения хокима зависит от узбекской стороны, полная ответственность населения не признаётся.",
      KK: "ШӘРТЛИ ҚАЙШЫ. Ҳәким жеке жуўапкершилик принципи тийкарында жумыс алып барады ҳәм халық алдында есап береди, деген норма Декларацияның 3-статьясындағы халық алдында жуўапкершилик принципине жақын. Бирақ ҳәкимниң тайынлаў механизми Өзбекстан тәрепине байланыслы болғанлығы себепли толық халық жуўапкершилиги тән алынбайды.",
      EN: "CONDITIONAL. The provision that the governor acts on the basis of the principle of personal responsibility and is accountable to the people is close to the principle of accountability to the people in Article 3 of the Declaration. However, due to the fact that the mechanism for appointing a khokim depends on the Uzbek side, the full responsibility of the population is not recognized.",
      PL: "WARUNKOWE. Przepis, że gubernator działa na zasadzie osobistej odpowiedzialności i jest odpowiedzialny przed ludem, jest zbliżony do zasady odpowiedzialności wobec narodu w artykule 3 deklaracji. Jednak ze względu na to, że mechanizm mianowania hokima zależy od strony Uzbeckiej, nie uznaje się pełnej odpowiedzialności ludności."
    }
  },
  {
    id: 98,
    title: "98-статья",
    cat: "amber",
    declRefLabel: {
      RU: "1. ПОСТАНОВЛЕНИЯ АКИМОВ",
      KK: "1. ҲӘКИМ ҚАРАРЛАРЫ",
      EN: "1. AKIM RESOLUTIONS",
      PL: "1. POSTANOWIENIA AKIMÓW"
    },
    declFull: {
      RU: "Республика Каракалпакстан берет под свое правовое управление все договора и соглашения, которые Советская Республика Каракалпакстан заключила с Союзом ССР и Узбекской Социалистической Республикой и делегирует себе все полномочия. Строит необходимую структуру Государственного управления на всех административных уровнях на своей территории. Республика Каракалпакстан, далее именуемая Республика строит все свои административные округа, создает необходимые административно хозяйственные разделения и органы государственного управления, такие как судебный, арбитражный и прокурорский надзор и другие осуществляет исключительно самостоятельно.",
      KK: "Қарақалпақстан Республикасы дүзилген шəртнамалар тийкарында Өзбекстан ССРына ҳəм СССРға ықтыярлы берилетуғын ҳуқықлық ўəкиллерден басқа мəмлекетлик ҳəкимиятқа өз аймағында толық ийе болады. Республика өзиниң мəмлекетлик дүзилисин, ҳəкимшилик-аймақлық бөлиниўин мəмлекетлик ҳəкимият ҳəм басқарыў уйымлары системасын, сондай-ақ судты, арбитражды ҳəм прокурорлық бақлаў шөлкемлестириў ислерин өз бетинше белгилейди.",
      EN: "The Republic of Karakalpakstan takes under its legal control all the treaties and agreements that the Soviet Republic. The Republic of Karakalpakstan has concluded with the USSR and the Uzbek Socialist Republic and delegates all its powers to itself. Builds the necessary structure of State administration at all administrative levels on its territory, the Republic of Karakalpakstan hereinafter referred to as the Republic builds all its administrative districts, creates the necessary administrative divisions and state administration bodies, such as the judicial, arbitration and prosecutorial supervision and others are carried out exclusively independently.",
      PL: "Republika Karakalpakstanu przejmuje pod swoją jurysdykcję wszystkie traktaty i umowy zawarte przez Radziecką Republikę Karakalpakstanu z ZSRR i Uzbecką SRR oraz deleguje wszystkie uprawnienia sobie. Buduje niezbędną strukturę administracji państwowej na wszystkich poziomach administracyjnych na swoim terytorium. Republika tworzy swoje okręgi administracyjne, ustanawia podziały gospodarczo-administracyjne oraz organy państwowe, takie jak sądy, arbitraż i nadzór prokuratorski, które działają wyłącznie niezależnie."
    },
    full: {
      RU: "Хаким в пределах предоставленных ему полномочий принимает решения, которые обязательны для исполнения всеми предприятиями, учреждениями, организациями, объединениями, а также должностными лицами и гражданами на соответствующей территории.",
      KK: "Ҳәким өзине берилген ўәкилликлер шеңберинде тийисли аймақтағы барлық кәрханалардың, мәкемелердиң, шөлкемлердиң, бирлеспелердиң, сондай-ақ лаўазымлы шахслардың ҳәм пуқаралардың орынлаўы ушын миннетли болған шешимлер қабыл етеди.",
      EN: "Within the limits of the powers granted to them, the khokim adopts decisions that are binding for execution by all enterprises, institutions, organizations, associations, as well as officials and citizens in the respective territory.",
      PL: "Hakim, w granicach przysługujących mu uprawnień, wydaje decyzje obowiązujące wszystkie przedsiębiorstwa, instytucje, organizacje, zrzeszenia, a także urzędników i obywateli na danym terytorium."
    },
    comp: {
      RU: "УСЛОВНО. Принцип, согласно которому решения правителя обязательны для всех организаций и граждан на соответствующей территории, близок к статье 1 Декларации. Но эти постановления выносятся в рамках предоставленных прав, которые определяются законодательством Узбекистана.",
      KK: "ШӘРТЛИ ҚАЙШЫ. Ҳәкимлердиң қарарлары тийисли аймақтағы барлық шөлкемлер ҳәм пуқаралар ушын мәжбүрий деген принцип Декларацияның 1-статьясына жақын. Бирақ бул қарарлар Өзбекстан нызамшылығы менен белгиленетуғын берилген ҳуқықлар шеңберинде шығарылмақта.",
      EN: "CONDITIONAL. The principle that the ruler's decisions are mandatory for all organizations and citizens in the relevant territory is close to Article 1 of the Declaration. However, these resolutions are issued within the framework of the rights granted, which are determined by the legislation of Uzbekistan.",
      PL: "WARUNKOWE. Zasada wiążących decyzji władcy dla wszystkich organizacji i obywateli na danym terytorium jest zbliżona do artykułu 1 deklaracji. Postanowienia te są jednak podejmowane w ramach przyznanych praw, które są określone przez ustawodawstwo Uzbekistanu."
    }
  },
  {
    id: 99,
    title: "99-статья",
    cat: "green",
    declRefLabel: {
      RU: "3. САМОУПРАВЛЕНИЕ",
      KK: "3. ӨЗИН-ӨЗИ БАСҚАРЫЎ",
      EN: "3. SELF-MANAGEMENT",
      PL: "3. SAMOZARZĄDZANIE"
    },
    declFull: {
      RU: "Многонациональный народ Республики Каракалпакстан определяет и составляет Государство на своей суверенной территории. Народ, опираясь на Конституцию и законы непосредственно и однозначно через избранных депутатов осуществляет государственное управление. Правительство Республики Каракалпакстан уполномоченное властью осуществляет укрепление дружбы народов. Государство всем своим гражданам проживающим на территории Республики Каракалпакстан, не смотря на их политические взгляды, веру исповедания и другие отличия, обеспечивает всех равными правами и свободами.",
      KK: "Қарақалпақстан Республикасының көп миллетли халқы оның мəмлекетлик Суверенитетиниң ўəкили ҳəм дəреги болып табылады. Халық Республиканың Конституциясы ҳəм тийкарында тиккелей жəне халық депутатларының Кеңеслери арқалы мəмлекетлик ҳəкимиятты иске асырады. Қарақалпақстан Республикасы мəмлекетлик ҳəкимиятын толық бийлигин пайдалана отырып, халықлар дослығын беккемлейди.",
      EN: "The multinational people of the Republic of Karakalpakstan shall determine and constitute a State on their sovereign territory. The people, relying on the Constitution and laws, directly and unambiguously through the elected deputies, exercise State administration. The Government of the Republic of Karakalpakstan authorized by the government to strengthen the friendship of peoples. The State provides all its citizens residing in the territory of the Republic of Karakalpakstan with equal rights and freedoms, regardless of their political views, religious beliefs and other differences.",
      PL: "Wielonarodowy naród Republiki Karakalpakstanu określa i konstytuuje Państwo na swoim suwerennym terytorium. Naród, opierając się na Konstytucji i ustawach, bezpośrednio i jednoznacznie poprzez wybranych deputowanych sprawuje władzę państwową. Rząd Republiki Karakalpakstanu umacnia przyjaźń narodów. Państwo zapewnia wszystkim obywatelom równe prawa i wolności, niezależnie od poglądów politycznych, wyznania czy innych różnic."
    },
    full: {
      RU: "Органами самоуправления в поселках, аулах, а также махаллях городов являются сходы граждан, избирающие председателя (аксакала). Порядок выборов, организация деятельности и объем полномочий органов самоуправления регулируются законом.",
      KK: "Посёлкаларда, аўылларда, сондай-ақ, олардың қурамындағы мәҳәллелерде ҳәм де қалалардағы мәҳәллелерде пуқаралар жыйынлары өзин-өзи басқарыў уйымлары болып, олар баслықты (ақсақалды) сайлайды. Өзин-өзи басқарыў уйымларын сайлаў тәртиби, олардың жумысын шөлкемлестириў ҳәм ўәкилликлериниң көлеми нызам менен тәртиплестириледи.",
      EN: "The bodies of self-government in settlements, auls, and city makhallas are the citizens' assemblies, which elect a chairperson (aksakal). The procedure for elections, the organization of activities, and the scope of powers of self-government bodies are regulated by law.",
      PL: "Organami samorządu w osiedlach, aulach oraz mahallach miast są zgromadzenia obywateli, które wybierają przewodniczącego (aksakała). Tryb wyborów, organizacja działalności i zakres uprawnień organów samorządu określa ustawa."
    },
    comp: {
      RU: "СООТВЕТСТВУЕТ. Принцип создания органов самоуправления - сходов граждан - в махаллях и селах соответствует положению статьи 3 Декларации о непосредственном участии населения в государственном управлении.",
      KK: "МУЎАПЫҚ. Мәҳәллелерде, аўылларда өзин-өзи басқарыў уйымлары - пуқаралар жыйыны дүзилетуғыны принципи Декларацияның 3-статьясындағы халықтың тиккелей мәмлекетлик басқарыўда қатнасыўы нормасына муўапық.",
      EN: "MATCHES. The principle of establishing self-governing bodies - citizens' assemblies - in mahallas and villages is in accordance with the norm of direct public participation in state governance outlined in Article 3 of the Declaration.",
      PL: "ZGODNE. Zasada tworzenia organów samorządu-zgromadzeń obywateli-w Mahalli i wioskach odpowiada normom bezpośredniego udziału społeczeństwa w zarządzaniu państwowym, określonym w artykule 3 deklaracji."
    }
  },
  {
    id: 100,
    title: "100-статья",
    cat: "amber",
    declRefLabel: {
      RU: "2. СУДЕБНАЯ СИСТЕМА",
      KK: "2. СУД СИСТЕМАСЫ",
      EN: "2. COURT SYSTEM",
      PL: "2. SYSTEM SĄDOWY"
    },
    declFull: {
      RU: "Депутатам Жокаргы Кенеса Республики Каракалпакстан в установленном порядке возмещаются расходы, связанные с депутатской деятельностью. Депутаты, работающие в Жокаргы Кенесе Республики Каракалпакстан и его органах на постоянной основе, на период своих полномочий не могут занимать какую-либо иную оплачиваемую должность, заниматься предпринимательской деятельностью.",
      KK: "Қарақалпақстан Республикасының Жоқарғы Кеңеси депутатларының депутатлық жумысы менен байланыслы қәрежетлери белгиленген тәртипте өтеледи. Қарақалпақстан Республикасы Жоқарғы Кеңесинде ҳәм оның уйымларында турақлы тийкарда ислейтуғын депутатлар өз ўәкилликлери дәўиринде ҳақы төленетуғын басқа бир лаўазымды ийелеўи, исбилерменлик жумыс пенен шуғылланыўы мүмкин емес.",
      EN: "Deputies of the Jokargy Kenes of the Republic of Karakalpakstan shall be reimbursed, in the prescribed manner, for expenses related to their parliamentary activities. Deputies working in the Jokargy Kenes of the Republic of Karakalpakstan and its bodies on a permanent basis may not hold any other paid position or engage in entrepreneurial activity during their term of office.",
      PL: "Deputowanym Jokargy Kenesu Republiki Karakalpakstanu przysługuje zwrot kosztów związanych z wykonywaniem mandatu w trybie określonym ustawą. Deputowani pracujący w Jokargy Kenesie i jego organach na zasadzie stałej nie mogą w okresie pełnienia mandatu zajmować żadnego innego płatnego stanowiska ani prowadzić działalności gospodarczej."
    },
    full: {
      RU: "Судебная власть в Республике Каракалпакстан действует независимо от законодательной и исполнительной власти, политических партий, иных общественных объединений.",
      KK: "Қарақалпақстан Республикасы суд ҳәкимияты нызам шығарыў ҳәм атқарыў ҳәкимиятларынан, сиясий партиялардан, басқа да жәмийетлик бирлеспелерден бийғәрез ислейди.",
      EN: "The judicial power in the Republic of Karakalpakstan operates independently of the legislative and executive powers, political parties, and other public associations.",
      PL: "Władza sądownicza w Republice Karakalpakstanu działa niezależnie od władzy ustawodawczej i wykonawczej, partii politycznych oraz innych organizacji społecznych."
    },
    comp: {
      RU: "УСЛОВНО. Принцип о том, что судебная власть действует независимо от законодательной и исполнительной власти, близок к положению статьи 2 Декларации о том, что судебные функции осуществляются «только свободно». Однако, поскольку судебная власть действует в рамках конституции Узбекистана, полная независимость не признаётся.",
      KK: "ШӘРТЛИ ҚАЙШЫ. Суд ҳәкимияты нызамшылық ҳәм атқарыўшы ҳәкимияттан ғәрезсиз жумыс алып барады, деген принцип Декларацияның 2-статьясындағы суд функциялары «тек еркинлик пенен» әмелге асырылады, деген нормаға жақын. Бирақ суд ҳәкимияты Өзбекстанның конституциялық шеңберинде жумыс алып барыўы себепли толық ғәрезсизлик тән алынбайды.",
      EN: "CONDITIONAL. The principle that the judiciary operates independently of the legislative and executive branches is close to the provision in Article 2 of the Declaration that judicial functions are exercised “only freely”. However, due to the fact that the judiciary operates within the framework of Uzbekistan's constitution, full independence is not recognized.",
      PL: "WARUNKOWE. Zasada, że władza sądownicza działa niezależnie od władzy ustawodawczej i wykonawczej, jest zbliżona do przepisu artykułu 2 deklaracji, że funkcje sądownicze są wykonywane „tylko swobodnie”. Jednak ze względu na to, że władza sądownicza działa w ramach Konstytucji Uzbekistanu, pełna niezależność nie jest uznawana."
    }
  },
  {
    id: 101,
    title: "101-статья",
    cat: "red",
    declRefLabel: {
      RU: "2. СУДЕБНЫЕ ФУНКЦИИ",
      KK: "2. СУД ФУНКЦИЯЛАРЫ",
      EN: "2. JUDICIAL FUNCTIONS",
      PL: "2. FUNKCJE SĄDOWE"
    },
    declFull: {
      RU: "Депутатам Жокаргы Кенеса Республики Каракалпакстан в установленном порядке возмещаются расходы, связанные с депутатской деятельностью. Депутаты, работающие в Жокаргы Кенесе Республики Каракалпакстан и его органах на постоянной основе, на период своих полномочий не могут занимать какую-либо иную оплачиваемую должность, заниматься предпринимательской деятельностью.",
      KK: "Қарақалпақстан Республикасының Жоқарғы Кеңеси депутатларының депутатлық жумысы менен байланыслы қәрежетлери белгиленген тәртипте өтеледи. Қарақалпақстан Республикасы Жоқарғы Кеңесинде ҳәм оның уйымларында турақлы тийкарда ислейтуғын депутатлар өз ўәкилликлери дәўиринде ҳақы төленетуғын басқа бир лаўазымды ийелеўи, исбилерменлик жумыс пенен шуғылланыўы мүмкин емес.",
      EN: "Deputies of the Jokargy Kenes of the Republic of Karakalpakstan shall be reimbursed, in the prescribed manner, for expenses related to their parliamentary activities. Deputies working in the Jokargy Kenes of the Republic of Karakalpakstan and its bodies on a permanent basis may not hold any other paid position or engage in entrepreneurial activity during their term of office.",
      PL: "Deputowanym Jokargy Kenesu Republiki Karakalpakstanu przysługuje zwrot kosztów związanych z wykonywaniem mandatu w trybie określonym ustawą. Deputowani pracujący w Jokargy Kenesie i jego organach na zasadzie stałej nie mogą w okresie pełnienia mandatu zajmować żadnego innego płatnego stanowiska ani prowadzić działalności gospodarczej."
    },
    full: {
      RU: "Судебная система Республики Каракалпакстан состоит из Суда Республики Каракалпакстан, Административного суда Республики Каракалпакстан, межрайонных, районных (городских) судов по гражданским делам, районных, городских судов по уголовным делам, межрайонных экономических судов и межрайонных административных судов. Организация и порядок деятельности судов определяются законом. Создание чрезвычайных судов не допускается.",
      KK: "Қарақалпақстан Республикасының суд системасы Қарақалпақстан Республикасы суды, Қарақалпақстан Республикасы ҳәкимшилик суды, пуқаралық ислери бойынша районлараралық, районлық (қалалық) судлары, жынаят ислери бойынша районлық ҳәм қалалық судлары, районлараралық, районлық (қалалық) экономикалық судлары ҳәм де районлараралық ҳәкимшилик судларынан ибарат. Судлардың жумыс тәртиби ҳәм оларды шөлкемлестириў нызам менен белгиленеди. Айрықша судларды дүзиўге жол қойылмайды.",
      EN: "The judicial system of the Republic of Karakalpakstan consists of the Court of the Republic of Karakalpakstan, the Administrative Court of the Republic of Karakalpakstan, inter-district, district (city) courts for civil cases, district and city courts for criminal cases, inter-district economic courts, and inter-district administrative courts. The organization and procedure of court activities are determined by law. The creation of extraordinary courts is not permitted.",
      PL: "System sądowniczy Republiki Karakalpakstanu obejmuje: Sąd Republiki Karakalpakstanu, Administracyjny Sąd Republiki Karakalpakstanu, sądy międzyrejonowe i rejonowe (miejskie) ds. cywilnych, sądy rejonowe i miejskie ds. karnych, międzyrejonowe sądy gospodarcze, międzyrejonowe sądy administracyjne Organizacja i tryb działalności sądów określane są ustawą. Tworzenie sądów nadzwyczajnych jest niedopuszczalne."
    },
    comp: {
      RU: "ПРОТИВОРЕЧИЕ. Статья 2 Декларации гласит, что судебные функции осуществляются свободно. Конституция определяет судебную систему, но назначение судей нижестоящей инстанции осуществляется с участием узбекской стороны - полностью независимая судебная система не признается.",
      KK: "ҚАЙШЫ. Декларацияның 2-статьясында суд функциялары еркинлик пенен әмелге асырылыўы белгиленген. Конституцияда суд системасы белгиленген, бирақ төменги инстанция судьяларын тайынлаў Өзбекстан тәрепиниң қатнасыўы менен әмелге асырылады - толық еркин суд системасы тән алынбайды.",
      EN: "CONTRADICTION. Article 2 of the Declaration stipulates that judicial functions are exercised freely. The Constitution defines the judicial system, but the appointment of lower-ranking judges is carried out with the participation of the Uzbek side - a fully independent judicial system is not recognized.",
      PL: "SPRZECZNOŚĆ. Artykuł 2 deklaracji stanowi, że funkcje sądowe są wykonywane swobodnie. Konstytucja określa system sądowniczy, ale powoływanie sędziów niższych instancji odbywa się z udziałem strony Uzbeckiej - całkowicie niezależny system sądowniczy nie jest uznawany."
    }
  },
  {
    id: 102,
    title: "102-статья",
    cat: "amber",
    declRefLabel: {
      RU: "2. ВЕРХОВНЫЙ СУД",
      KK: "2. ЖОҚАРЫ СОТ",
      EN: "2. SUPREME COURT",
      PL: "2. SĄD NAJWYŻSZY"
    },
    declFull: {
      RU: "Депутатам Жокаргы Кенеса Республики Каракалпакстан в установленном порядке возмещаются расходы, связанные с депутатской деятельностью. Депутаты, работающие в Жокаргы Кенесе Республики Каракалпакстан и его органах на постоянной основе, на период своих полномочий не могут занимать какую-либо иную оплачиваемую должность, заниматься предпринимательской деятельностью.",
      KK: "Қарақалпақстан Республикасының Жоқарғы Кеңеси депутатларының депутатлық жумысы менен байланыслы қәрежетлери белгиленген тәртипте өтеледи. Қарақалпақстан Республикасы Жоқарғы Кеңесинде ҳәм оның уйымларында турақлы тийкарда ислейтуғын депутатлар өз ўәкилликлери дәўиринде ҳақы төленетуғын басқа бир лаўазымды ийелеўи, исбилерменлик жумыс пенен шуғылланыўы мүмкин емес.",
      EN: "Deputies of the Jokargy Kenes of the Republic of Karakalpakstan shall be reimbursed, in the prescribed manner, for expenses related to their parliamentary activities. Deputies working in the Jokargy Kenes of the Republic of Karakalpakstan and its bodies on a permanent basis may not hold any other paid position or engage in entrepreneurial activity during their term of office.",
      PL: "Deputowanym Jokargy Kenesu Republiki Karakalpakstanu przysługuje zwrot kosztów związanych z wykonywaniem mandatu w trybie określonym ustawą. Deputowani pracujący w Jokargy Kenesie i jego organach na zasadzie stałej nie mogą w okresie pełnienia mandatu zajmować żadnego innego płatnego stanowiska ani prowadzić działalności gospodarczej."
    },
    full: {
      RU: "Суд Республики Каракалпакстан является высшим органом судебной власти в сфере гражданского, уголовного и экономического судопроизводства.",
      KK: "Қарақалпақстан Республикасы суды пуқаралық, жынаят ҳәм экономикалық судлаў ислерин жүргизиў саласында жоқары суд ҳәкимияты уйымы болып табылады.",
      EN: "The Court of the Republic of Karakalpakstan is the supreme body of judicial power in the sphere of civil, criminal, and economic legal proceedings.",
      PL: "Sąd Republiki Karakalpakstanu jest najwyższym organem władzy sądowniczej w zakresie postępowania cywilnego, karnego i gospodarczego."
    },
    comp: {
      RU: "УСЛОВНО. Норма о том, что Верховный суд Республики Каракалпакстан является высшим судебным органом, близка к принципу Верховного суда как высшей судебной инстанции, изложенному в статье 2 Декларации. Однако председатель этого суда назначается с согласия Президента Узбекистана и на основании заключения Высшего судейского совета Узбекистана - независимость ограничена.",
      KK: "ШӘРТЛИ ҚАЙШЫ. Қарақалпақстан Республикасы Жоқарғы судының жоқары суд уйымы екенлиги ҳаққындағы норма Декларацияның 2-статьясында келтирилген Жоқарғы судтың жоқары суд инстанциясы сыпатындағы принципине жақын. Бирақ бул судтың баслығы Өзбекстан Президентиниң разылығы менен ҳәм Өзбекстан Жоқарғы Судялар Кеңесиниң жуўмағы тийкарында тайынланады - ғәрезлик шекленген.",
      EN: "CONDITIONAL. The provision that the Supreme Court of the Republic of Karakalpakstan is a supreme judicial body is close to the principle of the Supreme Court as a supreme judicial instance, cited in Article 2 of the Declaration. However, the chairperson of this court is appointed with the consent of the President of Uzbekistan and based on the conclusion of the Supreme Judicial Council of Uzbekistan - independence is limited.",
      PL: "WARUNKOWE. Przepis, że Sąd Najwyższy Republiki Karakalpakstanu jest najwyższym organem sądowym, jest zbliżony do zasady Sądu Najwyższego jako najwyższej instancji sądowej określonej w artykule 2 deklaracji. Jednakże przewodniczący tego sądu jest powoływany za zgodą prezydenta Uzbekistanu i na podstawie opinii Najwyższej Rady sędziowskiej Uzbekistanu jego niezależność jest ograniczona."
    }
  },
  {
    id: 103,
    title: "103-статья",
    cat: "red",
    declRefLabel: {
      RU: "2. ИСКЛЮЧЕНО",
      KK: "2. АЛЫП ТАСЛАНҒАН",
      EN: "2. EXCLUDED",
      PL: "2. WYKLUCZONE"
    },
    declFull: {
      RU: "Депутатам Жокаргы Кенеса Республики Каракалпакстан в установленном порядке возмещаются расходы, связанные с депутатской деятельностью. Депутаты, работающие в Жокаргы Кенесе Республики Каракалпакстан и его органах на постоянной основе, на период своих полномочий не могут занимать какую-либо иную оплачиваемую должность, заниматься предпринимательской деятельностью.",
      KK: "Қарақалпақстан Республикасының Жоқарғы Кеңеси депутатларының депутатлық жумысы менен байланыслы қәрежетлери белгиленген тәртипте өтеледи. Қарақалпақстан Республикасы Жоқарғы Кеңесинде ҳәм оның уйымларында турақлы тийкарда ислейтуғын депутатлар өз ўәкилликлери дәўиринде ҳақы төленетуғын басқа бир лаўазымды ийелеўи, исбилерменлик жумыс пенен шуғылланыўы мүмкин емес.",
      EN: "Deputies of the Jokargy Kenes of the Republic of Karakalpakstan shall be reimbursed, in the prescribed manner, for expenses related to their parliamentary activities. Deputies working in the Jokargy Kenes of the Republic of Karakalpakstan and its bodies on a permanent basis may not hold any other paid position or engage in entrepreneurial activity during their term of office.",
      PL: "Deputowanym Jokargy Kenesu Republiki Karakalpakstanu przysługuje zwrot kosztów związanych z wykonywaniem mandatu w trybie określonym ustawą. Deputowani pracujący w Jokargy Kenesie i jego organach na zasadzie stałej nie mogą w okresie pełnienia mandatu zajmować żadnego innego płatnego stanowiska ani prowadzić działalności gospodarczej."
    },
    full: {
      RU: "Статья исключена из Конституции.",
      KK: "Бул статья Конституциядан алып тасланған.",
      EN: "The article has been excluded from the Constitution.",
      PL: "Artykuł został usunięty z Konstytucji."
    },
    comp: {
      RU: "ПРОТИВОРЕЧИЕ. Эта статья была отменена в 2021 году. В19 году Конституция определила Верховный суд по уголовным делам высшим судебным органом по уголовным и административным делам. Статья 2 Декларации гласит, что судебные функции осуществляются свободно и полностью. Удаление данной статьи сократило судебную систему Республики Каракалпакстан и ослабило суверенную судебную власть.",
      KK: "ҚАЙШЫ. Конституция 2021-жылы бул статья АЛЫП ТАСЛАНҒАН. Конституция 2019-жылы Жынаят ислери бойынша Жоқарғы суд жынаят ҳәм ҳәкимшилик ислер бойынша жоқары суд уйымы сыпатында белгиленген еди. Декларацияның 2-статьясында суд функциялары еркин ҳәм толық әмелге асырылатуғыны жәрияланган. Бул статьяны алып таслаў Қарақалпақстан Республикасының суд системасын қысқартып, суверен суд ҳәкимиятын әззилестирген.",
      EN: "CONTRADICTION. In 2021, this article was removed from the Constitution. In 2019, the Supreme Court for Criminal Cases was designated as the supreme judicial body for criminal and administrative cases. Article 2 of the Declaration states that judicial functions are exercised freely and fully. The removal of this article has reduced the judicial system of the Republic of Karakalpakstan and weakened the sovereign judicial power.",
      PL: "SPRZECZNOŚĆ. W 2021 r. artykuł ten został usunięty z Konstytucji. W 2019 roku Sąd Najwyższy w sprawach karnych został wyznaczony przez najwyższy organ sądowy w sprawach karnych i administracyjnych. Artykuł 2 deklaracji stanowi, że funkcje sądowe są wykonywane swobodnie i w pełni. Wykluczenie tego artykułu doprowadziło do zmniejszenia sądownictwa Republiki Karakalpakstanu i osłabienia suwerennej władzy sądowniczej."
    }
  },
  {
    id: 104,
    title: "104-статья",
    cat: "red",
    declRefLabel: {
      RU: "5. ИСКЛЮЧЕНО",
      KK: "5. АЛЫП ТАСЛАНҒАН",
      EN: "5. EXCLUDED",
      PL: "5. WYKLUCZONE"
    },
    declFull: {
      RU: "Республика Каракалпакстан осуществляет защиту Конституционных Прав своих граждан, защиту их свобод, защиту их права на труд, защиту их собственности и определяет меры по осуществлению защиты, осуществляет организацию общественной жизни, осуществляет социально-культурное и экономическое развитие, осуществляет внешнеэкономическую деятельность, создание свободных экономических зон, осуществляет управление финансово-бюджетной системы, определяет основы оплаты труда и ценообразование, налоговое управление, защиту своей территории и управление природными ресурсами.",
      KK: "Қарақалпақстан Республикасы пухараларының Конституциялық ҳуқықларын, еркинликлерин ҳəм мийнетлерин, меншик қатнасықларын əмелге асырыў тəртибин, халық хожалығына ҳəм социаллық мəдений қурылысқа басшылық етиўди, сыртқы экономикалық жумысты шөлкемлестириўди, соның ишинде еркин кəрханашылық зоналарын, бюджетлик-финанс системасын мийнетке ҳақы төлеў ҳəм баҳа қойыў, салық салыў,қоршап турған орталықты қорғаў ҳəм тəбийий қорлардан пайдаланыў ислерин нызам менен ретлестириўди өз бетинше əмелге асырады.",
      EN: "The Republic of Karakalpakstan shall protect the Constitutional Rights of its citizens, the protection of their freedoms and protect their the right to work, protection of their property and defines the measures for the implementation of protection, organizes public life, carries out socio-cultural and economic development, provides externally economic activity, the creation of free economic zones, manages financial budget the system determines the basis of wage and pricing, tax administration, protection of its territory and management of natural resources.",
      PL: "Republika Karakalpakstanu chroni konstytucyjne prawa swoich obywateli, ich wolności, prawo do pracy, własności, organizuje życie społeczne, prowadzi rozwój społeczno-kulturalny i gospodarczy, działalność zagraniczną, tworzy wolne strefy ekonomiczne, zarządza systemem finansowo-budżetowym, określa podstawy wynagrodzeń i cen, prowadzi administrację podatkową, chroni swoje terytorium i zarządza zasobami naturalnymi."
    },
    full: {
      RU: "Статья исключена из Конституции.",
      KK: "Бул статья Конституциядан алып тасланған.",
      EN: "The article has been excluded from the Constitution.",
      PL: "Artykuł został usunięty z Konstytucji."
    },
    comp: {
      RU: "ПРОТИВОРЕЧИЕ. Эта статья была ИСКЛЮЧЕНО в 2021 году. В 2019 году Конституция определила Хозяйственный суд в качестве отдельного судебного органа, разрешающего хозяйственные споры между предприятиями, учреждениями и гражданами. Статья 5 Декларации гласит, что Республика Каракалпакстан самостоятельно осуществляет внешнеэкономические отношения. Отмена хозяйственного суда уничтожила суверенный механизм разрешения экономических споров.",
      KK: "ҚАЙШЫ. Конституция 2021-жылы бул статья АЛЫП ТАСЛАНҒАН. Конституция 2019-жылы Хожалық суды кәрханалар, мәкемелер ҳәм пухаралар арасындағы хожалық даўларын шешетуғын айрықша суд уйымы сыпатында белгиленген еди. Декларациянын 5-статьясында Қарақалпақстан Республикасы сыртқы экономикалық қатнасықларды өз бетинше әмелге асырады деп жәрияланган. Хожалық судын алып таслаў экономикалық даўларды шешиўши суверен механизмди жоқ етти.",
      EN: "CONTRADICTION. In 2021, this article was EXCLUDED from the Constitution. In 2019, the Constitution designated the Economic Court as a separate judicial body that resolves economic disputes between enterprises, institutions, and citizens. Article 5 of the Declaration states that the Republic of Karakalpakstan independently carries out its foreign economic relations. The abolition of the commercial court eliminated the sovereign mechanism for resolving economic disputes.",
      PL: "SPRZECZNOŚĆ. W 2021 r. artykuł ten został WYKLUCZONE z Konstytucji. W 2019 r. Konstytucja określiła Trybunał gospodarczy jako odrębny organ sądowy rozstrzygający spory gospodarcze między przedsiębiorstwami, instytucjami i obywatelami. W artykule 5 deklaracji wskazano, że Republika Karakalpakstanu samodzielnie prowadzi swoje zagraniczne stosunki gospodarcze. Uchylenie sądu handlowego wyeliminowało suwerenny mechanizm rozstrzygania sporów gospodarczych."
    }
  },
  {
    id: 105,
    title: "105-статья",
    cat: "amber",
    declRefLabel: {
      RU: "2. АДМИНИСТРАТИВНЫЙ СУД",
      KK: "2. ҲӘКИМШИЛИК СУДЫ",
      EN: "2. ADMINISTRATIVE COURT",
      PL: "2. SĄD ADMINISTRACYJNY"
    },
    declFull: {
      RU: "Депутатам Жокаргы Кенеса Республики Каракалпакстан в установленном порядке возмещаются расходы, связанные с депутатской деятельностью. Депутаты, работающие в Жокаргы Кенесе Республики Каракалпакстан и его органах на постоянной основе, на период своих полномочий не могут занимать какую-либо иную оплачиваемую должность, заниматься предпринимательской деятельностью.",
      KK: "Қарақалпақстан Республикасының Жоқарғы Кеңеси депутатларының депутатлық жумысы менен байланыслы қәрежетлери белгиленген тәртипте өтеледи. Қарақалпақстан Республикасы Жоқарғы Кеңесинде ҳәм оның уйымларында турақлы тийкарда ислейтуғын депутатлар өз ўәкилликлери дәўиринде ҳақы төленетуғын басқа бир лаўазымды ийелеўи, исбилерменлик жумыс пенен шуғылланыўы мүмкин емес.",
      EN: "Deputies of the Jokargy Kenes of the Republic of Karakalpakstan shall be reimbursed, in the prescribed manner, for expenses related to their parliamentary activities. Deputies working in the Jokargy Kenes of the Republic of Karakalpakstan and its bodies on a permanent basis may not hold any other paid position or engage in entrepreneurial activity during their term of office.",
      PL: "Deputowanym Jokargy Kenesu Republiki Karakalpakstanu przysługuje zwrot kosztów związanych z wykonywaniem mandatu w trybie określonym ustawą. Deputowani pracujący w Jokargy Kenesie i jego organach na zasadzie stałej nie mogą w okresie pełnienia mandatu zajmować żadnego innego płatnego stanowiska ani prowadzić działalności gospodarczej."
    },
    full: {
      RU: "Административный суд Республики Каракалпакстан является органом высшей судебной власти в сфере рассмотрения административных споров по жалобам и заявлениям, возникающим из публично-правовых отношений, и имеет право контролировать судебную деятельность межрайонных административных судов.",
      KK: "Қарақалпақстан Республикасы ҳәкимшилик суды ғалабалық-ҳуқықый қатнасықлардан келип шығатуғын шағымлар ҳәм арзалар бойынша ҳәкимшилик ислерди қарап шығыў саласында жоқары суд ҳәкимияты уйымы болып табылады ҳәм де районлараралық ҳәкимшилик судларының суд жумысы үстинен қадағалаў алып барыў ҳуқықына ийе.",
      EN: "The Administrative Court of the Republic of Karakalpakstan is the highest judicial authority in the consideration of administrative disputes arising from public‑law relations based on complaints and applications, and has the right to supervise the judicial activities of inter‑district administrative courts.",
      PL: "Administracyjny Sąd Republiki Karakalpakstanu jest najwyższym organem władzy sądowniczej w zakresie rozpatrywania sporów administracyjnych wynikających ze skarg i wniosków powstałych na tle stosunków publicznoprawnych oraz posiada prawo kontroli działalności sądowej międzyrejonowych sądów administracyjnych."
    },
    comp: {
      RU: "УСЛОВНО. Норма о том, что административный суд рассматривает административные споры, вытекающие из гражданско-правовых отношений, близка к принципу свободы осуществления судебных функций, изложенному в статье 2 Декларации. Однако председатель этого суда назначается с согласия узбекской стороны.",
      KK: "ШӘРТЛИ ҚАЙШЫ. Ҳәкимшилик суд халық-ҳуқықый қатнасықлардан келип шығатуғын ҳәкимшилик даўларды көрип шығады деген норма Декларация 2-статьясындағы суд функциялары еркинлик пенен әмелге асырылады принципине жақын. Бирақ бул судтың баслығы Өзбекстан тәрепиниң келисими менен тайынланады.",
      EN: "CONDITIONAL. The provision that the administrative court considers administrative disputes arising from civil law relations is close to the principle of free exercise of judicial functions in Article 2 of the Declaration. However, the chairperson of this court is appointed with the consent of the Uzbek side.",
      PL: "WARUNKOWE. Zasada, że Sąd Administracyjny rozpatruje spory administracyjne wynikające ze stosunków cywilnoprawnych, jest zbliżona do zasady swobodnego wykonywania funkcji sądowych w artykule 2 deklaracji. Jednak przewodniczący tego sądu jest powoływany za zgodą strony Uzbeckiej."
    }
  },
  {
    id: 106,
    title: "106-статья",
    cat: "red",
    declRefLabel: {
      RU: "2. ПОДГОТОВКА СУДЕЙ",
      KK: "2. СУДЯЛАРДЫ ТАЯРЛАЎ",
      EN: "2. TRAINING OF JUDGES",
      PL: "2. SZKOLENIE SĘDZIÓW"
    },
    declFull: {
      RU: "Депутатам Жокаргы Кенеса Республики Каракалпакстан в установленном порядке возмещаются расходы, связанные с депутатской деятельностью. Депутаты, работающие в Жокаргы Кенесе Республики Каракалпакстан и его органах на постоянной основе, на период своих полномочий не могут занимать какую-либо иную оплачиваемую должность, заниматься предпринимательской деятельностью.",
      KK: "Қарақалпақстан Республикасының Жоқарғы Кеңеси депутатларының депутатлық жумысы менен байланыслы қәрежетлери белгиленген тәртипте өтеледи. Қарақалпақстан Республикасы Жоқарғы Кеңесинде ҳәм оның уйымларында турақлы тийкарда ислейтуғын депутатлар өз ўәкилликлери дәўиринде ҳақы төленетуғын басқа бир лаўазымды ийелеўи, исбилерменлик жумыс пенен шуғылланыўы мүмкин емес.",
      EN: "Deputies of the Jokargy Kenes of the Republic of Karakalpakstan shall be reimbursed, in the prescribed manner, for expenses related to their parliamentary activities. Deputies working in the Jokargy Kenes of the Republic of Karakalpakstan and its bodies on a permanent basis may not hold any other paid position or engage in entrepreneurial activity during their term of office.",
      PL: "Deputowanym Jokargy Kenesu Republiki Karakalpakstanu przysługuje zwrot kosztów związanych z wykonywaniem mandatu w trybie określonym ustawą. Deputowani pracujący w Jokargy Kenesie i jego organach na zasadzie stałej nie mogą w okresie pełnienia mandatu zajmować żadnego innego płatnego stanowiska ani prowadzić działalności gospodarczej."
    },
    full: {
      RU: "Судьи независимы, подчиняются только закону. Какое-либо вмешательство в деятельность судей по отправлению правосудия недопустимо и влечет ответственность по закону. Неприкосновенность судей гарантируется законом. Судьи не могут быть сенаторами, депутатами представительных органов государственной власти. Судьи не могут состоять членами политических партий, участвовать в политических движениях и занимать какую-либо другую оплачиваемую должность, кроме научной и педагогической деятельности. До истечения срока полномочий судья может быть освобожден от должности лишь по основаниям, указанным в законе.",
      KK: "Судьялар ғәрезсиз болып, тек ғана нызамға бойсынады. Әдил судлаўды әмелге асырыў бойынша судьялардың жумысына ҳәр қандай араласыўға жол қойылмайды ҳәм бул ҳәрекет нызам бойынша жуўапкершиликке алып келеди. Судьяларға қол қатылмаслыққа нызам менен кепиллик бериледи. Судьялар сенатор, мәмлекетлик ҳәкимияттың ўәкилликли уйымларының депутаты болыўы мүмкин емес. Судьялар сиясий партиялардың ағзасы болыўы, сиясий ҳәрекетлерге қатнасыўы, сондай-ақ, илимий ҳәм педагогикалық жумысларынан тысқары ҳақы төленетуғын басқа бир де хызмет түри менен шуғылланыўы мүмкин емес. Ўәкиллик мүддети питпестен бурын судья нызамда көрсетилген тийкарлар бойынша ғана лаўазымынан босатылыўы мүмкин.",
      EN: "Judges are independent and subject only to the law. Any interference in the activities of udges in the administration of justice is inadmissible and entails liability under the law. The inviolability of judges is guaranteed by law. Judges may not be senators or deputies of representative bodies of state power. Judges may not be members of political parties, participate in political movements, or hold any other paid position except for scientific or teaching work. Before the expiration of their term of office, a judge may be dismissed only on the grounds specified by law.",
      PL: "Sędziowie są niezależni i podlegają jedynie ustawie. Jakakolwiek ingerencja w działalność sędziów przy sprawowaniu wymiaru sprawiedliwości jest niedopuszczalna i pociąga za sobą odpowiedzialność przewidzianą prawem. Nietykalność sędziów jest gwarantowana ustawą. Sędziowie nie mogą być senatorami ani deputowanymi organów przedstawicielskich władzy państwowej. Sędziowie nie mogą być członkami partii politycznych, uczestniczyć w ruchach politycznych ani zajmować żadnego innego płatnego stanowiska poza działalnością naukową i dydaktyczną. Przed upływem kadencji sędzia może zostać odwołany ze stanowiska jedynie na podstawach określonych w ustawie."
    },
    comp: {
      RU: "ПРОТИВОРЕЧИЕ. В статье 2 Декларации закреплено, что судебные функции осуществляются «только в самостоятельном порядке». В Конституции провозглашено, что судьи подчиняются только закону, но назначение судей требует согласия Президента Узбекистана и заключения Высшего Судебного Совета Узбекистана независимость судей остается декларативной и фактически принадлежит Узбекистану.",
      KK: "ҚАЙШЫ. Декларацияның 2-статьясында суд функциялары «тек ғана еркин тәртипте» әмелге асырылатуғыны атап өтилген. Конституцияда судьялар тек ғана нызамға бойсыныўы, бирақ судьяларды тайынлаў ушын Өзбекстан Президентиниң разылығы ҳәм Өзбекстан Судялар жоқары кеңесиниң жуўмағы талап етилиўи жәрияланған.",
      EN: "CONTRADICTION. Article 2 of the Declaration stipulates that judicial functions are exercised “only in an independent manner”. The Constitution proclaims that judges are subject only to the law, but the appointment of judges requires the consent of the President of Uzbekistan and the conclusion of the Supreme Judicial Council of Uzbekistan; the independence of judges remains declarative and actually belongs to Uzbekistan.",
      PL: "SPRZECZNOŚĆ. Artykuł 2 deklaracji stanowi, że funkcje sądowe są wykonywane „tylko w sposób niezależny”. Konstytucja głosi, że sędziowie podlegają tylko prawu, ale powoływanie sędziów wymaga zgody prezydenta Uzbekistanu i opinii Najwyższej Rady sędziowskiej Uzbekistanu; niezawisłość sędziów pozostaje deklaratywna i faktycznie należy do Uzbekistanu."
    }
  },
  {
    id: 107,
    title: "107-статья",
    cat: "green",
    declRefLabel: {
      RU: "4. ПРАВОПОРЯДОК",
      KK: "4. ҲУҚУҚЫЙ ТӘРТИП",
      EN: "4. LEGAL ORDER",
      PL: "4. PORZĄDEK PRAWNY"
    },
    declFull: {
      RU: "Определяется верховенство законов и Конституции на территории Республики Каракалпакстан. Если со стороны правительств СССР и Узбекской ССР нарушаются права граждан Республики Каракалпакстан, то на основании существующих соглашений и законов СССР и УзССР, Республика Каракалпакстан вправе приостановить все принятые межгосударственные соглашения и договора и предъявить им ноту протеста.",
      KK: "Қарақалпақстан аймағында өзиниң ықтыярына берилген мəселелер бойынша Қарақалпақстан Республикасының Конституциясының ҳəм нызамларының үстемлиги белгиленеди. Егер СССРдың ҳəм Өзбекстан ССРның ҳуқықлық ўəкиллери шегинен шығып кетсе ҳəм Қарақалпақстан Республикасының ҳуқықларын бузатуғын болса, Республика СССРдың ҳəм Өзбекстан ССРның нызамларының, СССР ҳəм Өзбекстан ССР уйымларының басқа да актлериниң, шəртнамаларының ҳəрекет етиўин тоқтатыўға ҳəм оларға наразылық билдириўге ҳақылы.",
      EN: "The supremacy of laws and the Constitution in the territory of the Republic of Karakalpakstan is determined. If the rights of citizens of the Republic of Karakalpakstan are violated by the governments of the USSR and the Uzbek SSR, then on the basis of existing agreements and laws of the USSR and the Uzbek SSR, the Republic of Karakalpakstan has the right to suspend all interstate agreements and agreements and submit a note of protest to them.",
      PL: "Na terytorium Republiki Karakalpakstanu obowiązuje nadrzędność Konstytucji i ustaw. Jeśli prawa obywateli Republiki Karakalpakstanu są naruszane przez rządy ZSRR lub Uzbeckiej SRR, Republika ma prawo zawiesić wszystkie umowy międzypaństwowe i przedstawić im notę protestacyjną."
    },
    full: {
      RU: "Разбирательство дел во всех судах открытое. Слушание дел в закрытом заседании допускается лишь в случаях, установленных законом.",
      KK: "Барлық судларда ислерди қараў ашық өткериледи. Ислерди жабық мәжилисте тыңлаўға нызамда белгиленген жағдайларда ғана жол қойылады.",
      EN: "Court proceedings in all courts are open. Hearings in closed sessions are permitted only in cases established by law.",
      PL: "Rozpoznawanie spraw we wszystkich sądach jest jawne. Rozpatrywanie spraw na posiedzeniu zamkniętym dopuszcza się jedynie w przypadkach przewidzianych ustawą."
    },
    comp: {
      RU: "СООТВЕТСТВУЕТ. Принцип открытости судопроизводства во всех судах соответствует нормам верховенства закона и правопорядка, изложенным в статье 4 Декларации.",
      KK: "МУЎАПЫҚ. Барлық судларда ис жүргизиў ашық болады деген принцип Декларацияның 4-статьясындағы нызам үстинлиги ҳәм ҳуқықый тәртип нормасына муўапық.",
      EN: "MATCHES. The principle of openness of proceedings in all courts is in accordance with the rule of law and the norms of legal procedure contained in Article 4 of the Declaration.",
      PL: "ZGODNE. Zasada otwartości postępowania we wszystkich sądach jest zgodna z praworządnością i normami procesu prawnego zawartymi w artykule 4 deklaracji."
    }
  },
  {
    id: 108,
    title: "108-статья",
    cat: "red",
    declRefLabel: {
      RU: "10. СУДЕБНЫЕ АКТЫ",
      KK: "10. СУД АКТЛЕРИ",
      EN: "10. JUDICIAL ACTS",
      PL: "10. AKTY SĄDOWE"
    },
    declFull: {
      RU: "На территории Республики Каракалпакстан Каракалпакский язык является Государственным языком. Все нации и народности компактно проживающие на территории Республики Каракалпакстан имеют возможность изучать свой родной язык и изучать русский язык как язык межнационального общения.", 
        KK: "Қарақалпақстан Республикасы аймағында Қарақалпақ тили мəмлекетлик тил болып табылады. Қарақалпақстан өз аймағында Республикада жəм болып жайласқан барлық халықлардың ана тиллерин, соның ишинде миллетлер аралық қатнасық тили болған рус тилиниң еркин ислеўи ҳəм раўажланыўы ушын барлық жағдайларды тəмийинлейди.", 
        EN: "On the territory of the Republic of Karakalpakstan, the Karakalpak language is the State language. All nations and nationalities living compactly on the territory of the Republic of Karakalpakstan have the opportunity to study their native language learn Russian as a language of interethnic communication.", 
        PL: "Na terytorium Republiki Karakalpakstanu język karakalpacki jest językiem państwowym. Wszystkie narody i narodowości zamieszkujące terytorium mają możliwość nauki swojego języka ojczystego oraz języka rosyjskiego jako języka komunikacji międzyetnicznej." 
    },
    full: {
      RU: "В Республике Каракалпакстан судопроизводство ведётся на каракалпакском и узбекском языках либо на языке, которым пользуется большинство населения соответствующей местности. Лицам, участвующим в деле и не владеющим языком судопроизводства, обеспечивается право полностью знакомиться с материалами дела через переводчика, участвовать в судебных действиях и выступать в суде на родном языке.", 
        KK: "Қарақалпақстан Республикасында суд иси қарақалпақ, өзбек тиллеринде ямаса тийисли орынлардағы халықтың көпшилигиниң тилинде жүргизиледи. Суд жүргизилип атырған тилди билмейтуғын иске қатнасыўшыларға дилмаш арқалы истиң материаллары менен толық танысыў ҳәм суд ҳәрекетлерине қатнасыў және судта ана тилинде сөйлеў ҳуқықы тәмийинленеди.", 
        EN: "In the Republic of Karakalpakstan, court proceedings are conducted in the Karakalpak and Uzbek languages or in the language of the majority of the population in a given locality. Participants in the proceedings who do not speak the language in which the court proceedings are conducted are ensured the right to fully acquaint themselves with the case materials and participate in court proceedings through an interpreter, as well as the right to speak in court in their native language.", 
        PL: "W Republice Karakałpakstanu postępowanie sądowe prowadzi się w języku karakałpackim i uzbeckim albo w języku używanym przez większość ludności danej miejscowości. Osobom uczestniczącym w sprawie, które nie znają języka postępowania sądowego, zapewnia się prawo pełnego zapoznania się z materiałami sprawy za pośrednictwem tłumacza, udziału w czynnościach sądowych oraz występowania w sądzie w języku ojczystym." 
    },
    comp: { 
        RU: "ПРОТИВОРЕЧИЕ. В статье 10 Декларации только каракалпакский язык определен государственным языком. В Конституции установлено, что судопроизводство ведется на каракалпакском и узбекском языках, что нарушает языковой суверенитет в судебной сфере.", 
        KK: "ҚАЙШЫ. Декларация 10-статьясында тек қарақалпақ тили мәмлекетлик тил деп белгиленген. Конституцияда суд иси қарақалпақ ҳәм өзбек тиллеринде жүргизиледи деп белгиленип, тил суверенитети суд тараўында да бузылған.", 
        EN: "CONTRADICTION. Article 10 of the Declaration designates only the Karakalpak language as the state language. The Constitution stipulates that court proceedings are conducted in both Karakalpak and Uzbek languages, violating language sovereignty in the judicial sphere as well.", 
        PL: "SPRZECZNOŚĆ. Artykuł 10 deklaracji określa tylko język Karakalpak jako język państwowy. Konstytucja stanowi, że postępowania sądowe są prowadzone zarówno w języku Karakalpak, jak i uzbeckim, naruszając suwerenność językową również w sferze sądowniczej." 
    }
  },
  {
    id: 109,
    title: "109-статья",
    cat: "red",
    declRefLabel: {
      RU: "10. ГОСУДАРСТВЕННЫЙ ЯЗЫК",
      KK: "10. МӘМЛЕКЕТЛИК ТИЛ",
      EN: "10. STATE LANGUAGE",
      PL: "10. JĘZYK PAŃSTWOWY"
    },
    declFull: {
      RU: "На территории Республики Каракалпакстан Каракалпакский язык является Государственным языком. Все нации и народности компактно проживающие на территории Республики Каракалпакстан имеют возможность изучать свой родной язык и изучать русский язык как язык межнационального общения.",
      KK: "Қарақалпақстан Республикасы аймағында Қарақалпақ тили мəмлекетлик тил болып табылады. Қарақалпақстан өз аймағында Республикада жəм болып жайласқан барлық халықлардың ана тиллерин, соның ишинде миллетлер аралық қатнасық тили болған рус тилиниң еркин ислеўи ҳəм раўажланыўы ушын барлық жағдайларды тəмийинлейди.",
      EN: "On the territory of the Republic of Karakalpakstan, the Karakalpak language is the State language. All nations and nationalities living compactly on the territory of the Republic of Karakalpakstan have the opportunity to study their native language learn Russian as a language of interethnic communication.",
      PL: "Na terytorium Republiki Karakalpakstanu język karakalpacki jest językiem państwowym. Wszystkie narody i narodowości zamieszkujące terytorium mają możliwość nauki swojego języka ojczystego oraz języka rosyjskiego jako języka komunikacji międzyetnicznej."
    },
    full: {
      RU: "Судопроизводство в Республике Каракалпакстан ведется на каракалпакском, узбекском языках или на языке большинства населения данной местности. Участвующим в деле лицам, не владеющим языком, на котором ведется судопроизводство, обеспечивается право полного ознакомления с материалами дела, участия в судебных действиях через переводчика и право выступать в суде на родном языке.",
      KK: "Қарақалпақстан Республикасында суд иси қарақалпақ, өзбек тиллеринде ямаса тийисли орынлардағы халықтың көпшилигиниң тилинде жүргизиледи. Суд жүргизилип атырған тилди билмейтуғын иске қатнасыўшыларға дилмаш арқалы истиң материаллары менен толық танысыў ҳәм суд ҳәрекетлерине қатнасыў және судта ана тилинде сөйлеў ҳуқықы тәмийинленеди.",
      EN: "Legal proceedings in the Republic of Karakalpakstan are conducted in the Karakalpak or Uzbek languages, or in the language of the majority population of the given locality. Persons involved in a case who do not know the language of the proceedings are guaranteed the right to fully familiarize themselves with the case materials, to participate in judicial actions through an interpreter, and to speak in court in their native language.",
      PL: "Postępowanie sądowe w Republice Karakalpakstanu prowadzi się w języku karakałpackim, uzbeckim lub w języku większości ludności danej miejscowości. Osobom uczestniczącym w sprawie, które nie znają języka postępowania, zapewnia się prawo pełnego zapoznania się z materiałami sprawy, udziału w czynnościach sądowych za pośrednictwem tłumacza oraz prawo występowania w sądzie w swoim języku ojczystym."
    },
    comp: {
      RU: "ПРОТИВОРЕЧИЕ. Статья 10 Декларации определяет каракалпакский язык в качестве государственного языка на территории Республики Каракалпакстан. В Конституции же установлено, что делопроизводство ведется на каракалпакском или узбекском языке - статус каракалпакского языка как отдельного государственного языка в судебном процессе приравнен к узбекскому.",
      KK: "ҚАЙШЫ. Декларацияның 10-статьясында Қарақалпақстан Республикасы аймағында қарақалпақ тили мәмлекетлик тил сыпатында белгиленген. Конституцияда болса ис жүргизиў қарақалпақ ямаса өзбек тилинде алып барылыўы белгилеп қойылып - суд процесинде қарақалпақ тилиниң айрықша мәмлекетлик тил сыпатындағы статусы өзбек тили менен тең дәрежеге түсирилген.",
      EN: "CONTRADICTION. Article 10 of the Declaration establishes the Karakalpak language as the state language in the territory of the Republic of Karakalpakstan. The Constitution stipulates that proceedings are conducted in either Karakalpak or Uzbek. In court proceedings, the status of the Karakalpak language as a separate state language has been equated with that of the Uzbek language.",
      PL: "SPRZECZNOŚĆ. Artykuł 10 deklaracji stanowi, że język Karakalpak jest językiem państwowym na terytorium Republiki Karakalpakstanu. Konstytucja stanowi, że postępowanie w tej sprawie odbywa się w języku karakalpackim lub uzbeckim. W postępowaniach sądowych status języka Karakalpak jako odrębnego języka państwowego został zrównany z językiem uzbeckim."
    }
  },
  {
    id: 110,
    title: "110-статья",
    cat: "green",
    declRefLabel: {
      RU: "5. ПРАВА И СВОБОДЫ",
      KK: "5. ҲУҚУҚ ҲӘМ ЕРКИНЛИКЛЕР",
      EN: "5. RIGHTS AND FREEDOMS",
      PL: "5. PRAWA I WOLNOŚCI"
    },
    declFull: {
      RU: "Республика Каракалпакстан осуществляет защиту Конституционных Прав своих граждан, защиту их свобод, защиту их права на труд, защиту их собственности и определяет меры по осуществлению защиты, осуществляет организацию общественной жизни, осуществляет социально-культурное и экономическое развитие, осуществляет внешнеэкономическую деятельность, создание свободных экономических зон, осуществляет управление финансово-бюджетной системы, определяет основы оплаты труда и ценообразование, налоговое управление, защиту своей территории и управление природными ресурсами.",
      KK: "Қарақалпақстан Республикасы пухараларының Конституциялық ҳуқықларын, еркинликлерин ҳəм мийнетлерин, меншик қатнасықларын əмелге асырыў тəртибин, халық хожалығына ҳəм социаллық мəдений қурылысқа басшылық етиўди, сыртқы экономикалық жумысты шөлкемлестириўди, соның ишинде еркин кəрханашылық зоналарын, бюджетлик-финанс системасын мийнетке ҳақы төлеў ҳəм баҳа қойыў, салық салыў,қоршап турған орталықты қорғаў ҳəм тəбийий қорлардан пайдаланыў ислерин нызам менен ретлестириўди өз бетинше əмелге асырады.",
      EN: "The Republic of Karakalpakstan shall protect the Constitutional Rights of its citizens, the protection of their freedoms and protect their the right to work, protection of their property and defines the measures for the implementation of protection, organizes public life, carries out socio-cultural and economic development, provides externally economic activity, the creation of free economic zones, manages financial budget the system determines the basis of wage and pricing, tax administration, protection of its territory and management of natural resources.",
      PL: "Republika Karakalpakstanu chroni konstytucyjne prawa swoich obywateli, ich wolności, prawo do pracy, własności, organizuje życie społeczne, prowadzi rozwój społeczno-kulturalny i gospodarczy, działalność zagraniczną, tworzy wolne strefy ekonomiczne, zarządza systemem finansowo-budżetowym, określa podstawy wynagrodzeń i cen, prowadzi administrację podatkową, chroni swoje terytorium i zarządza zasobami naturalnymi."
    },
    full: {
      RU: "Обвиняемому обеспечивается право на защиту. Право на профессиональную юридическую помощь гарантируется на любой стадии следствия и судопроизводства. Для оказания юридической помощи гражданам, предприятиям, организациям и учреждениям действует адвокатура. Организация и порядок деятельности адвокатуры определяются законом.",
      KK: "Айыпланыўшыға қорғаныў ҳуқықы тәмийинленеди. Тергеў ҳәм суд исин жүргизиўдиң ҳәр қандай басқышында кәсиплик юридикалық жәрдем алыў ҳуқықы кепилленеди. Пуқараларға, кәрханаларға, шөлкемлерге ҳәм мәкемелерге юридикалық жәрдем бериў ушын адвокатура хызмет көрсетеди. Адвокатураны шѳлкемлестириў ҳәм оның жумыс тәртиби нызам ҳүжжетлери менен белгиленеди.",
      EN: "The accused is guaranteed the right to defense. The right to professional legal assistance is guaranteed at any stage of investigation and trial. The bar provides legal assistance to citizens, enterprises, organizations, and institutions. The organization and procedure of the bar’s activities are determined by law.",
      PL: "Oskarżonemu zapewnia się prawo do obrony. Prawo do profesjonalnej pomocy prawnej jest gwarantowane na każdym etapie postępowania przygotowawczego i sądowego. W celu udzielania pomocy prawnej obywatelom, przedsiębiorstwom, organizacjom i instytucjom działa adwokatura. Organizacja i tryb działalności adwokatury określane są ustawą."
    },
    comp: {
      RU: "СООТВЕТСТВУЕТ. Принцип, согласно которому обвиняемому гарантируется право на защиту и право на получение адвокатской помощи, соответствует положению статьи 5 Декларации о защите прав и свобод граждан.",
      KK: "МУЎАПЫҚ. Айыпланыўшыға қорғаныў ҳуқықы кепилленеди ҳәм адвокатлық жәрдем алыў ҳуқықы тәмийинленеди деген принцип Декларация 5-статьясындағы пухаралар ҳуқықлары ҳәм еркинликлерин қорғаў нормасына муўапық.",
      EN: "MATCHES. The principle that the accused is guaranteed the right to defense and the right to legal assistance is ensured in accordance with the norm on the protection of the rights and freedoms of citizens contained in Article 5 of the Declaration.",
      PL: "ZGODNE. Zasada zagwarantowania oskarżonemu prawa do obrony i prawa do pomocy prawnej jest zapewniona zgodnie z normą o ochronie praw i wolności obywateli, zawartą w artykule 5 deklaracji."
    }
  },
  {
    id: 111,
    title: "111-статья",
    cat: "red",
    declRefLabel: {
      RU: "3. ИЗБИРАТЕЛЬНОЕ ПРАВО",
      KK: "3. САЙЛАЎ ҲУҚЫҚЫ",
      EN: "3. ELECTORAL RIGHT",
      PL: "3. PRAWO WYBORCZE"
    },
    declFull: {
      RU: "Многонациональный народ Республики Каракалпакстан определяет и составляет Государство на своей суверенной территории. Народ, опираясь на Конституцию и законы непосредственно и однозначно через избранных депутатов осуществляет государственное управление. Правительство Республики Каракалпакстан уполномоченное властью осуществляет укрепление дружбы народов. Государство всем своим гражданам проживающим на территории Республики Каракалпакстан, не смотря на их политические взгляды, веру исповедания и другие отличия, обеспечивает всех равными правами и свободами.",
      KK: "Қарақалпақстан Республикасының көп миллетли халқы оның мəмлекетлик Суверенитетиниң ўəкили ҳəм дəреги болып табылады. Халық Республиканың Конституциясы ҳəм тийкарында тиккелей жəне халық депутатларының Кеңеслери арқалы мəмлекетлик ҳəкимиятты иске асырады. Қарақалпақстан Республикасы мəмлекетлик ҳəкимиятын толық бийлигин пайдалана отырып, халықлар дослығын беккемлейди.",
      EN: "The multinational people of the Republic of Karakalpakstan shall determine and constitute a State on their sovereign territory. The people, relying on the Constitution and laws, directly and unambiguously through the elected deputies, exercise State administration. The Government of the Republic of Karakalpakstan authorized by the government to strengthen the friendship of peoples. The State provides all its citizens residing in the territory of the Republic of Karakalpakstan with equal rights and freedoms, regardless of their political views, religious beliefs and other differences.",
      PL: "Wielonarodowy naród Republiki Karakalpakstanu określa i konstytuuje Państwo na swoim suwerennym terytorium. Naród, opierając się na Konstytucji i ustawach, bezpośrednio i jednoznacznie poprzez wybranych deputowanych sprawuje władzę państwową. Rząd Republiki Karakalpakstanu umacnia przyjaźń narodów. Państwo zapewnia wszystkim obywatelom równe prawa i wolności, niezależnie od poglądów politycznych, wyznania czy innych różnic."
    },
    full: {
      RU: "Граждане Республики Каракалпакстан имеют право избирать и быть избранными в представительные органы. Каждый избиратель имеет один голос. Право голоса, равенство и свобода волеизъявления гарантируются законом. Выборы в Жокаргы Кенес Республики Каракалпакстан, в представительные органы государственной власти районов, городов проводятся соответственно в год истечения конституционного срока их полномочий — в первое воскресенье третьей декады октября. Выборы проводятся на основе всеобщего, равного и прямого избирательного права при тайном голосовании. Право избирать имеют граждане Республики Каракалпакстан, достигшие 18 лет. Не могут быть избранными граждане, признанные судом недееспособными, а также лица, содержащиеся в местах лишения свободы по приговору суда. В выборах не участвуют граждане, признанные судом недееспособными, а также лица, содержащиеся в местах лишения свободы по приговору суда за совершенные тяжкие и особо тяжкие преступления. В любых других случаях прямое или косвенное ограничение избирательных прав граждан не допускается. Гражданин Республики Каракалпакстан не может быть одновременно депутатом более чем в двух представительных органах государственной власти. Для организации и проведения выборов в Жокаргы Кенес Республики Каракалпакстан, а также референдума Республики Каракалпакстан Жокаргы Кенесом Республики Каракалпакстан образуется Центральная избирательная комиссия Республики Каракалпакстан, основными принципами деятельности которой являются независимость, законность, коллегиальность, гласность и справедливость. Центральная избирательная комиссия Республики Каракалпакстан осуществляет свою деятельность на постоянной основе и в своей деятельности руководствуется Конституцией Республики Каракалпакстан, законами о выборах и референдуме Республики Каракалпакстан и другими законодательными актами. Члены Центральной избирательной комиссии Республики Каракалпакстан избираются Жокаргы Кенесом Республики Каракалпакстан по рекомендации районных и городских Кенгашей народных депутатов. Председатель Центральной избирательной комиссии Республики Каракалпакстан избирается из числа ее членов по представлению Председателя Жокаргы Кенеса Республики Каракалпакстан на заседании комиссии. Порядок проведения выборов определяется законом.",
      KK: "Қарақалпақстан Республикасының пуқаралары ўәкилликли уйымларға сайлаў ҳәм сайланыў ҳуқықына ийе. Ҳәр бир сайлаўшы бир даўысқа ийе. Даўыс бериў ҳуқықы, теңлик ҳәм ерк-ықрар билдириў еркинлигине нызам менен кепиллик бериледи. Қарақалпақстан Республикасы Жоқарғы Кеңесине, районлық, қалалық, мәмлекетлик ҳәкимияттың ўәкилликли уйымларына сайлаўлар тийислисинше олардың конституциялық ўәкиллик мүддети питетуғын жылы - октябрь айының үшинши он күнлигиниң биринши екшембисинде өткизиледи. Сайлаўлар улыўма, тең ҳәм тиккелей сайлаў ҳуқықы тийкарында жасырын даўыс бериў жолы менен өткериледи. Сайлаўлар улыўма, тең ҳәм тиккелей сайлаў ҳуқықы тийкарында жасырын даўыс бериў жолы менен өткериледи. Қарақалпақстан Республикасының он сегиз жасқа толған пуқаралары сайлаў ҳуқықына ийе. Суд тәрепинен ҳәрекетке уқыпсыз деп табылған пуқаралар, сондай-ақ, суд ҳүкими менен еркинен айырыў орынларында сақланып турғанлар сайланыўы мүмкин емес. Суд тәрепинен ҳәрекетке уқыпсыз деп табылған, сондай-ақ, аўыр ҳәм жүдә аўыр жынаятлар ислегени ушын суд ҳүкими менен еркинен айырыў орынларында сақланып атырған шахслар сайлаўда қатнаспайды. Ҳәр қандай басқа жағдайларда пуқаралардың сайлаў ҳуқықларын тиккелей ямаса жанапай шеклеўге жол қойылмайды. Қарақалпақстан Республикасының пуқарасы бир ўақыттың өзинде екеўден артық мәмлекетлик ҳәкимияттың ўәкиллик уйымының депутаты болыўы мүмкин емес. Қарақалпақстан Республикасы Жоқарғы Кеңесине сайлаўды ҳәм Қарақалпақстан Республикасының референдумын Республикасы Жоқарғы Кеңеси тәрепинен жумысының тийкарғы принциплери ғәрезсизлик, нызамлылық, коллегиаллық, жәриялылық ҳәм әдилликтен ибарат болған Қарақалпақстан Республикасы Орайлық сайлаў комиссиясы дүзиледи. Қарақалпақстан Республикасы Орайлық сайлаў комиссиясы өз жумысын турақлы түрде әмелге асырады ҳәм өз жумысында Қарақалпақстан Республикасы Конституциясына, Қарақалпақстан Республикасының сайлаў ҳәм референдум ҳаққындағы нызамларына ҳәм басқа да нызамшылық актлери әмел қылады. Қарақалпақстан Республикасы Орайлық сайлаў комиссиясының ағзалары халық депутатлары районлық ҳәм қалалық Кеңеслериниң усынысы бойынша Қарақалпақстан Республикасы Жоқарғы Кеңеси тәрепинен сайланады. Қарақалпақстан Республикасы Орайлық сайлаў комиссиясының комиссия ағзалары арасынан Қарақалпақстан Республикасы Жоқарғы Кеңеси Баслығының усынысы менен комиссия мәжилисинде сайланады. Сайлаўларды өткериў тәртиби нызам менен белгиленеди.",
      EN: "Citizens of the Republic of Karakalpakstan have the right to elect and be elected to representative bodies. Each voter has one vote. The right to vote, equality, and freedom of expression of will are guaranteed by law. Elections to the Jokargy Kenes of the Republic of Karakalpakstan and to representative bodies of state power of districts and cities are held in the year of expiration of their constitutional term of office — on the first Sunday of the third decade of October. Elections are conducted on the basis of universal, equal, and direct suffrage by secret ballot. Citizens of the Republic of Karakalpakstan who have reached the age of 18 have the right to vote. Citizens declared legally incapable by a court, as well as persons held in places of deprivation of liberty under a court sentence, may not be elected. Citizens declared legally incapable by a court, as well as persons held in places of deprivation of liberty under a court sentence for committing serious and especially serious crimes, do not participate in elections. In all other cases, direct or indirect restriction of citizens’ electoral rights is not permitted. A citizen of the Republic of Karakalpakstan may not simultaneously be a deputy in more than two representative bodies of state power. To organize and conduct elections to the Jokargy Kenes of the Republic of Karakalpakstan, as well as the referendum of the Republic of Karakalpakstan, the Central Election Commission of the Republic of Karakalpakstan is established by the Jokargy Kenes of the Republic of Karakalpakstan. Its fundamental principles are independence, legality, collegiality, transparency, and fairness. The Central Election Commission of the Republic of Karakalpakstan operates on a permanent basis and in its activities is guided by the Constitution of the Republic of Karakalpakstan, the laws on elections and the referendum of the Republic of Karakalpakstan, and other legislative acts. Members of the Central Election Commission of the Republic of Karakalpakstan are elected by the Jokargy Kenes of the Republic of Karakalpakstan upon the recommendation of district and city Councils of People's Deputies. The Chairperson of the Central Election Commission of the Republic of Karakalpakstan is elected from among its members upon the submission of the Chairperson of the Jokargy Kenes of the Republic of Karakalpakstan at a meeting of the Commission. The procedure for conducting elections is determined by law.",
      PL: "Obywatele Republiki Karakalpakstanu mają prawo wybierać i być wybierani do organów przedstawicielskich. Każdy wyborca dysponuje jednym głosem. Prawo głosu, równość i swoboda wyrażania woli są gwarantowane ustawą. Wybory do Jokargy Kenesu Republiki Karakalpakstanu oraz do przedstawicielskich organów władzy rejonów i miast przeprowadza się w roku upływu ich konstytucyjnej kadencji — w pierwszą niedzielę trzeciej dekady października. Wybory odbywają się na podstawie powszechnego, równego i bezpośredniego prawa wyborczego, w głosowaniu tajnym. Prawo wybierania mają obywatele Republiki Karakalpakstanu, którzy ukończyli 18 lat. Nie mogą być wybierane osoby uznane przez sąd za niezdolne do czynności prawnych, a także osoby odbywające karę pozbawienia wolności na podstawie wyroku sądu. W wyborach nie uczestniczą osoby uznane przez sąd za niezdolne do czynności prawnych oraz osoby odbywające karę pozbawienia wolności za ciężkie i szczególnie ciężkie przestępstwa. W innych przypadkach jakiekolwiek bezpośrednie lub pośrednie ograniczenie praw wyborczych obywateli jest niedopuszczalne. Obywatel Republiki Karakalpakstanu nie może jednocześnie być deputowanym więcej niż w dwóch przedstawicielskich organach władzy państwowej. W celu organizacji i przeprowadzenia wyborów do Jokargy Kenesu Republiki Karakalpakstanu oraz referendum Republiki Karakalpakstanu, Jokargy Kenes powołuje Centralną Komisję Wyborczą Republiki Karakalpakstanu, której podstawowymi zasadamii działalności są: niezależność, legalność, kolegialność, jawność i sprawiedliwość. Centralna Komisja Wyborcza Republiki Karakalpakstanu działa na stałej podstawie i kieruje się w swojej działalności Konstytucją Republiki Karakalpakstanu, ustawami o wyborach i referendum Republiki Karakalpakstanu oraz innymi aktami prawnymi. Członkowie Centralnej Komisji Wyborczej Republiki Karakalpakstanu są wybierani przez Jokargy Kenes Republiki Karakalpakstanu na podstawie rekomendacji rejonowych i miejskich Kengaszów Deputowanych Ludowych. Przewodniczący Centralnej Komisji Wyborczej Republiki Karakalpakstanu jest wybierany spośród jej członków na posiedzeniu komisji, na wniosek Przewodniczącego Jokargy Kenesu Republiki Karakalpakstanu Tryb przeprowadzania wyborów określa ustawa."
    },
    comp: {
      RU: "ПРОТИВОРЕЧИЕ. Статья 3 Декларации гласит, что население Республики Каракалпакстан является источником государственной власти. Согласно Конституции, избирательная система определяется в рамках Конституции Узбекистана, и Центральная избирательная комиссия формируется по представлению Председателя Верховного Совета. Поскольку сам Председатель Верховного Совета избирается с согласия Президента Узбекистана, суверенная избирательная система Республики Каракалпакстан утрачена.",
      KK: "ҚАЙШЫ. Декларация 3-статьясында Қарақалпақстан Республикасы халқы мәмлекетлик ҳәкимияттың дәреги деп жәрияланған. Конституцияда болса сайлаў системасы Өзбекстан Конституциясы шеңберинде белгиленеди ҳәм Орайлық сайлаў комиссиясы Жоқарғы Кеңес Баслығының усыныўы менен дүзиледи — ал Жоқарғы Кеңес Баслығының өзи Өзбекстан Президентиниң келисими менен сайланатуғынлықтан, Қарақалпақстан Республикасының суверен сайлаў системасы жоғалтылған.",
      EN: "CONTRADICTION. Article 3 of the Declaration proclaims the population of the Republic of Karakalpakstan as the source of state power. According to the Constitution, the electoral system is defined within the framework of the Constitution of Uzbekistan, and the Central Election Commission is formed upon the recommendation of the Chairman of the Supreme Council. Since the Chairman of the Supreme Council is elected with the consent of the President of Uzbekistan, the sovereign electoral system of the Republic of Karakalpakstan has been abolished.",
      PL: "SPRZECZNOŚĆ. Artykuł 3 deklaracji stanowi, że ludność Republiki Karakalpakstanu jest źródłem władzy państwowej. Zgodnie z konstytucją system wyborczy jest ustalany w ramach Konstytucji Uzbekistanu, a Centralna Komisja Wyborcza jest tworzona na wniosek Przewodniczącego Rady Najwyższej. Ponieważ sam Przewodniczący Rady Najwyższej jest wybierany za zgodą prezydenta Uzbekistanu, suwerenny system wyborczy Republiki Karakalpakstanu został utracony."
    }
  },
  {
    id: 112,
    title: "112-статья",
    cat: "amber",
    declRefLabel: {
      RU: "4. КОНСТИТУЦИОННЫЙ НАДЗОР",
      KK: "4. КОНСТИТУЦИЯЛЫҚ ҚАДАҒАЛАЎ",
      EN: "4. CONSTITUTIONAL OVERSIGHT",
      PL: "4. NADZÓR KONSTYTUCYJNY"
    },
    declFull: {
      RU: "Определяется верховенство законов и Конституции на территории Республики Каракалпакстан. Если со стороны правительств СССР и Узбекской ССР нарушаются права граждан Республики Каракалпакстан, то на основании существующих соглашений и законов СССР и УзССР, Республика Каракалпакстан вправе приостановить все принятые межгосударственные соглашения и договора и предъявить им ноту протеста.",
      KK: "Қарақалпақстан аймағында өзиниң ықтыярына берилген мəселелер бойынша Қарақалпақстан Республикасының Конституциясының ҳəм нызамларының үстемлиги белгиленеди. Егер СССРдың ҳəм Өзбекстан ССРның ҳуқықлық ўəкиллери шегинен шығып кетсе ҳəм Қарақалпақстан Республикасының ҳуқықларын бузатуғын болса, Республика СССРдың ҳəм Өзбекстан ССРның нызамларының, СССР ҳəм Өзбекстан ССР уйымларының басқа да актлериниң, шəртнамаларының ҳəрекет етиўин тоқтатыўға ҳəм оларға наразылық билдириўге ҳақылы.",
      EN: "The supremacy of laws and the Constitution in the territory of the Republic of Karakalpakstan is determined. If the rights of citizens of the Republic of Karakalpakstan are violated by the governments of the USSR and the Uzbek SSR, then on the basis of existing agreements and laws of the USSR and the Uzbek SSR, the Republic of Karakalpakstan has the right to suspend all interstate agreements and agreements and submit a note of protest to them.",
      PL: "Na terytorium Republiki Karakalpakstanu obowiązuje nadrzędność Konstytucji i ustaw. Jeśli prawa obywateli Republiki Karakalpakstanu są naruszane przez rządy ZSRR lub Uzbeckiej SRR, Republika ma prawo zawiesić wszystkie umowy międzypaństwowe i przedstawić im notę protestacyjną."
    },
    full: {
      RU: "Конституционный надзор в Республике Каракалпакстан осуществляет Комитет конституционного надзора Республики Каракалпакстан. Комитет конституционного надзора Республики Каракалпакстан избирается Жокаргы Кенесом Республики Каракалпакстан из числа специалистов в области политики и права в составе председателя, заместителя председателя и членов Комитета.Срок полномочий лиц, избранных в Комитет конституционного надзора Республики Каракалпакстан — пять лет. Исполнение обязанностей председателя, заместителя председателя и членов Комитета конституционного надзора Республики Каракалпакстан не совместимо с депутатским мандатом. Лица, избранные в Комитет конституционного надзора Республики Каракалпакстан, не могут одновременно входить в состав органов, акты которых поднадзорны Комитету. Лица, избранные в Комитет конституционного надзора Республики Каракалпакстан, при выполнении своих обязанностей независимы и подчиняются только Конституции Республики Каракалпакстан.",
      KK: "Қарақалпақстан Республикасында Конституциялық бақлаўды Қарақалпақстан Республикасының Конституциялық бақлаў комитети әмелге асырады. Конституциялық бақлаў комитети Қарақалпақстан Республикасы Жоқарғы Кеңеси тәрепинен сиясат ҳәм ҳуқық тараўының қәнигелери арасынан Конституциялық бақлаў комитетиниң баслығы,оның орынбасары ҳәм комитет ағзалары қурамында сайланады. Конституциялық бақлаў комитетине сайланған шахслардың ўәкиллик мүддети - бес жыл. Конституциялық бақлаў комитети баслығының, баслығы орынбасарының ҳәм ағзаларының миннетлерин депутатлық мандат пенен қосып атқарыўға болмайды. Конституциялық бақлаў комитетине сайланған шахслар бир ўақыттың өзинде актлери комитеттиң бақлаўында болған уйымлардың қурамына кире алмайды. Конституциялық бақлаў комитетине сайланған шахслар өз миннетлерин атқарыўда ғәрезсиз болады ҳәм тек Қарақалпақстан Республикасының Конституциясына бойсынады.",
      EN: "Constitutional oversight in the Republic of Karakalpakstan is carried out by the Committee of Constitutional Oversight of the Republic of Karakalpakstan. The Committee of Constitutional Oversight of the Republic of Karakalpakstan is elected by the Jokargy Kenes of the Republic of Karakalpakstan from among specialists in the fields of politics and law, and consists of a chairperson, a deputy chairperson, and members of the Committee. The term of office of those elected to the Committee of Constitutional Oversight of the Republic of Karakalpakstan is five years. The performance of duties by the chairperson, deputy chairperson, and members of the Committee of Constitutional Oversight of the Republic of Karakalpakstan is incompatible with a deputy mandate. Persons elected to the Committee of Constitutional Oversight of the Republic of Karakalpakstan may not simultaneously be members of bodies whose acts are subject to the Committee's oversight. Persons elected to the Committee of Constitutional Oversight of the Republic of Karakalpakstan, in performing their duties, are independent and subject only to the Constitution of the Republic of Karakalpakstan.",
      PL: "Nadzór konstytucyjny w Republice Karakałpakstanu sprawuje Komitet Nadzoru Konstytucyjnego Republiki Karakałpakstanu. Komitet Nadzoru Konstytucyjnego Republiki Karakałpakstanu jest wybierany przez Jokargy Kenes Republiki Karakałpakstanu spośród specjalistów w dziedzinie polityki i prawa, w składzie: przewodniczący, zastępca przewodniczącego oraz członkowie Komitetu. Kadencja osób wybranych do Komitetu Nadzoru Konstytucyjnego Republiki Karakałpakstanu trwa pięć lat. Pełnienie obowiązków przewodniczącego, zastępcy przewodniczącego oraz członków Komitetu Nadzoru Konstytucyjnego Republiki Karakałpakstanu jest niepołączalne z mandatem deputowanego. Osoby wybrane do Komitetu Nadzoru Konstytucyjnego Republiki Karakałpakstanu nie mogą jednocześnie wchodzić w skład organów, których akty podlegają nadzorowi Komitetu. Osoby wybrane do Komitetu Nadzoru Konstytucyjnego Republiki Karakałpakstanu są niezawisłe w wykonywaniu swoich obowiązków i podlegają wyłącznie Konstytucji Republiki Karakalpakstanu."
    },
    comp: {
      RU: "УСЛОВНО. Норма о создании Комитета конституционного надзора близка к принципу верховенства закона, изложенному в статье 4 Декларации. Однако этот комитет действует в рамках признания верховенства Конституции Узбекистана - суверенный конституционный контроль не признается в полной мере.",
      KK: "ШӘРТЛИ ҚАЙШЫ. Конституциялық бақлаў комитети дүзилетуғыны ҳаққындағы норма Декларацияның 4-статьясындағы нызам үстинлиги принципине жақын. Бирақ бул комитет Өзбекстан Конституциясының үстинлигин де тән алатуғын шеңберде жумыс алып барады - суверен конституциялық қадағалаў толық тән алынбайды.",
      EN: "CONDITIONAL. The provision on the formation of a Constitutional Oversight Committee is close to the principle of the rule of law in Article 4 of the Declaration. However, this committee operates within the framework of recognizing the supremacy of the Constitution of Uzbekistan - sovereign constitutional control is not fully recognized.",
      PL: "WARUNKOWE. Postanowienie o utworzeniu Komitetu konstytucyjnego kontroli blisko zasadzie praworządności w artykule 4 Deklaracji. Komitet ten działa jednak w ramach uznania zwierzchnictwa Konstytucji Uzbekistanu-suwerenna Kontrola konstytucyjna nie jest w pełni uznawana."
    }
  },
  {
    id: 113,
    title: "113-статья",
    cat: "red",
    declRefLabel: {
      RU: "4. ЗАЩИТА ЗАКОНОВ",
      KK: "4. НЫЗАМЛАРДЫ ҚОРҒАЎ",
      EN: "4. PROTECTION OF LAWS",
      PL: "4. OCHRONA USTAW"
    },
    declFull: {
      RU: "Определяется верховенство законов и Конституции на территории Республики Каракалпакстан. Если со стороны правительств СССР и Узбекской ССР нарушаются права граждан Республики Каракалпакстан, то на основании существующих соглашений и законов СССР и УзССР, Республика Каракалпакстан вправе приостановить все принятые межгосударственные соглашения и договора и предъявить им ноту протеста.",
      KK: "Қарақалпақстан аймағында өзиниң ықтыярына берилген мəселелер бойынша Қарақалпақстан Республикасының Конституциясының ҳəм нызамларының үстемлиги белгиленеди. Егер СССРдың ҳəм Өзбекстан ССРның ҳуқықлық ўəкиллери шегинен шығып кетсе ҳəм Қарақалпақстан Республикасының ҳуқықларын бузатуғын болса, Республика СССРдың ҳəм Өзбекстан ССРның нызамларының, СССР ҳəм Өзбекстан ССР уйымларының басқа да актлериниң, шəртнамаларының ҳəрекет етиўин тоқтатыўға ҳəм оларға наразылық билдириўге ҳақылы.",
      EN: "The supremacy of laws and the Constitution in the territory of the Republic of Karakalpakstan is determined. If the rights of citizens of the Republic of Karakalpakstan are violated by the governments of the USSR and the Uzbek SSR, then on the basis of existing agreements and laws of the USSR and the Uzbek SSR, the Republic of Karakalpakstan has the right to suspend all interstate agreements and agreements and submit a note of protest to them.",
      PL: "Na terytorium Republiki Karakalpakstanu obowiązuje nadrzędność Konstytucji i ustaw. Jeśli prawa obywateli Republiki Karakalpakstanu są naruszane przez rządy ZSRR lub Uzbeckiej SRR, Republika ma prawo zawiesić wszystkie umowy międzypaństwowe i przedstawić im notę protestacyjną."
    },
    full: {
      RU: "Комитет конституционного надзора Республики Каракалпакстан: 1) по поручению Жокаргы Кенеса Республики Каракалпакстан представляет ему заключения о соответствии проектов законов Республики Каракалпакстан и иных актов, вносимых на рассмотрение Жокаргы Кенеса Республики Каракалпакстан, Конституции Республики Каракалпакстан; 2) по предложениям не менее одной пятой депутатов Жокаргы Кенеса Республики Каракалпакстан, Председателя Жокаргы Кенеса Республики Каракалпакстан представляет Жокаргы Кенесу Республики Каракалпакстан заключения о соответствии законов Республики Каракалпакстан и иных актов, принятых Жокаргы Кенесом Республики Каракалпакстан, Конституции Республики Каракалпакстан; 3) по поручению Жокаргы Кенеса Республики Каракалпакстан представляет ему заключения о соответствии Конституции и законам Республики Каракалпакстан постановлений Президиума и распоряжений Председателя Жокаргы Кенеса Республики Каракалпакстан; 4) по поручению Жокаргы Кенеса Республики Каракалпакстан, по предложениям не менее одной пятой депутатов Жокаргы Кенеса Республики Каракалпакстан, Председателя Жокаргы Кенеса Республики Каракалпакстан представляет Жокаргы Кенесу Республики Каракалпакстан заключение о соответствии постановлений и распоряжений Совета Министров Республики Каракалпакстан Конституции и законам Республики Каракалпакстан; Комитет конституционного надзора Республики Каракалпакстан вправе также по собственной инициативе представлять заключения о соответствии Конституции и законам Республики Каракалпакстан актов высших органов государственной власти и управления Республики Каракалпакстан. Заключение Комитета может быть отклонено лишь решением Жокаргы Кенеса Республики Каракалпакстан, принятым двумя третями голосов от общего числа депутатов Жокаргы Кенеса Республики Каракалпакстан. Организация и порядок деятельности Комитета конституционного надзора Республики Каракалпакстан определяется Законом Республики Каракалпакстан о Конституционном надзоре.",
      KK: "Қарақалпақстан Республикасының Конституциялық бақлаў комитети: 1) Қарақалпақстан Республикасы Жоқарғы Кеңесиниң тапсырмасы менен оған Қарақалпақстан Республикасы Жоқарғы Кеңесине қарап шығыўға усынылып атырған Қарақалпақстан Республикасы нызамларының жойбары ҳәм басқа да актлериниң Қарақалпақстан Республикасы Конституциясына муўапықлығы ҳаққындағы жуўмағын усынады; 2) Қарақалпақстан Республикасы Жоқарғы Кеңеси депутатларының кем дегенде бестен бириниң, Қарақалпақстан Республикасы Жоқарғы Кеңеси Баслығының усынысы менен Қарақалпақстан РеспубликасыЖоқарғы Кеңеси тәрепинен қабыл етилген нызамлардың ҳәм басқа да актлердиң Қарақалпақстан Республикасы Конституциясына муўапықлығы ҳаққындағы жуўмағын Қарақалпақстан Республикасы Жоқарғы Кеңесине усынады; 3) Қарақалпақстан Республикасы Жоқарғы Кеңесиниң тапсырмасы бойынша оған Қарақалпақстан Республикасы Жоқарғы Кеңеси Президиумы қарарларының ҳәм Жоқарғы Кеңес Баслығы бийликлериниң Қарақалпақстан Республикасы Конституциясына ҳәм нызамларына муўапықлығы ҳаққында жуўмағын усынады; 4) Қарақалпақстан Республикасы Жоқарғы Кеңесиниң тапсырмасы, Қарақалпақстан Республикасы Жоқарғы Кеңеси депутатларының кем дегенде бестен бириниң, Қарақалпақстан Республикасы Жоқарғы Кеңеси Баслығының усыныслары бойынша Қарақалпақстан Республикасы Министрлер Кеңесиниң қарар ҳәм бийликлериниң Қарақалпақстан Республикасы Конституциясына ҳәм нызамларына муўапықлығы бойынша жуўмағын Қарақалпақстан Республикасы Жоқарғы Кеңесине усынады; Сондай-ақ, Конституциялық бақлаў комитети өз басламасы бойынша Қарақалпақстан Республикасы жоқары мәмлекетлик ҳәкимият ҳәм басқарыў уйымлары актлериниң Қарақалпақстан Республикасы Конституциясына ҳәм нызамларына муўапықлығы ҳаққындағы жуўмақларды усыныўға ҳақылы. Комитеттиң жуўмағы тек Қарақалпақстан Республикасы Жоқарғы Кеңесиниң барлық депутатларының үштен екисиниң даўысы менен қабылланған Қарақалпақстан Республикасы Жоқарғы Кеңесиниң шешими менен бийкарланыўы мүмкин. Қарақалпақстан Республикасы Конституциялық бақлаў комитетин шөлкемлестириў ҳәм оның жумыс тәртиби Қарақалпақстан Республикасы Конституциялық бақлаў комитети ҳаққындағы Нызам менен белгиленеди.",
      EN: "The Committee of Constitutional Oversight of the Republic of Karakalpakstan: 1) upon instruction of the Jokargy Kenes of the Republic of Karakalpakstan, submits to it conclusions on the conformity of draft laws of the Republic of Karakalpakstan and other acts submitted for consideration by the Jokargy Kenes of the Republic of Karakalpakstan with the Constitution of the Republic of Karakalpakstan; 2) upon proposals from no fewer than one‑fifth of the deputies of the Jokargy Kenes of the Republic of Karakalpakstan or from the Chairperson of the Jokargy Kenes of the Republic of Karakalpakstan, submits to the Jokargy Kenes conclusions on the conformity of laws of the Republic of Karakalpakstan and other acts adopted by the Jokargy Kenes with the Constitution of the Republic of Karakalpakstan; 3) pon instruction of the Jokargy Kenes of the Republic of Karakalpakstan, submits to it conclusions on the conformity of the resolutions of the Presidium and the orders of the Chairperson of the Jokargy Kenes of the Republic of Karakalpakstan with the Constitution and laws of the Republic of Karakalpakstan; 4) upon instruction of the Jokargy Kenes of the Republic of Karakalpakstan, or upon proposals from no fewer than one‑fifth of the deputies of the Jokargy Kenes of the Republic of Karakalpakstan, or from the Chairperson of the Jokargy Kenes of the Republic of Karakalpakstan, submits to the Jokargy Kenes conclusions on the conformity of the resolutions and orders of the Council of Ministers of the Republic of Karakalpakstan with the Constitution and laws of the Republic of Karakalpakstan. The Committee of Constitutional Oversight of the Republic of Karakalpakstan also has the right, on its own initiative, to submit conclusions on the conformity of acts of thehighest bodies of state power and administration of the Republic of Karakalpakstan with the Constitution and laws of the Republic of Karakalpakstan. A conclusion of the Committee may be rejected only by a decision of the Jokargy Kenes of the Republic of Karakalpakstan adopted by two‑thirds of the total number of deputies of the Jokargy Kenes of the Republic of Karakalpakstan. The organization and procedure of the activities of the Committee of Constitutional Oversight of the Republic of Karakalpakstan are determined by the Law of the Republic of Karakalpakstan on Constitutional Oversight.",
      PL: "Komitet Nadzoru Konstytucyjnego Republiki Karakałpakstanu: 1) na zlecenie Dżokargy Kenesu Republiki Karakałpakstanu przedkłada mu opinie o zgodności projektów ustaw Republiki Karakałpakstanu oraz innych aktów wnoszonych pod obrady Jokargy Kenesu Republiki Karakałpakstanu z Konstytucją Republiki Karakałpakstanu; 2) na wniosek co najmniej jednej piątej posłów Rady Najwyższej (Jokargy Kenes) Republiki Karakałpacji lub Przewodniczącego Rady Najwyższej Republiki Karakałpacji przedkłada Radzie Najwyższej Republiki Karakałpacji wnioski w sprawie zgodności ustaw Republiki Karakałpacji oraz innych aktów przyjętych przez Radę Najwyższą Republiki Karakałpacji z Konstytucją Republiki Karakałpacji; 3) na zlecenie Jokargy Kenesu Republiki Karakałpakstanu przedkłada mu opinie o zgodności uchwał Prezydium oraz zarządzeń Przewodniczącego Jokargy Kenesu Republiki Karakałpakstanu z Konstytucją i ustawami Republiki Karakałpakstanu; 4) na zlecenie Jokargy Kenesu Republiki Karakałpakstanu, na wniosek co najmniej jednej piątej deputowanych Jokargy Kenesu Republiki Karakałpakstanu lub Przewodniczącego Jokargy Kenesu Republiki Karakałpakstanu przedkłada Jokargy Kenesowi Republiki Karakałpakstanu opinię o zgodności uchwał i zarządzeń Rady Ministrów Republiki Karakałpakstanu z Konstytucją i ustawami Republiki Karakałpakstanu; Komitet Nadzoru Konstytucyjnego Republiki Karakałpakstanu jest uprawniony także z własnej inicjatywy do przedkładania opinii o zgodności aktów najwyższych organów władzy państwowej i administracji Republiki Karakałpakstanu z Konstytucją i ustawami Republiki Karakałpakstanu. Opinia Komitetu może zostać odrzucona jedynie decyzją Jokargy Kenesu Republiki Karakałpakstanu, podjętą większością dwóch trzecich głosów ogólnej liczby deputowanych Jokargy Kenesu Republiki Karakałpakstanu. Organizację i tryb działania Komitetu Nadzoru Konstytucyjnego Republiki Karakałpakstanu określa Ustawa Republiki Karakałpakstanu o Nadzorze Konstytucyjnym."
    },
    comp: {
      RU: "ПРОТИВОРЕЧИЕ. Статья 4 Декларации гласит, что Республика Каракалпакстан самостоятельно защищает верховенство своего законодательства. Согласно Конституции, заключение Комитета может быть отклонено не менее чем двумя третями голосов Верховного Совета. Сам Верховный Совет действует в рамках конституции Узбекистана.",
      KK: "ҚАЙШЫ. Декларацияның 4-статьясында Қарақалпақстан Республикасы өз нызамларының үстинлигин өзбасымшалық пенен қорғайды деп белгиленген. Конституцияда болса Комитет жуўмағы Жоқарғы Кеңестиң кеминде үштен еки даўысы менен қайтарылыўы мүмкин - Жоқарғы Кеңестиң өзи болса Өзбекстан конституциялық шеңберинде жумыс алып барады.",
      EN: "CONTRADICTION. Article 4 of the Declaration states that the Republic of Karakalpakstan independently upholds the supremacy of its laws. According to the Constitution, the Committee's conclusion can be rejected by at least two-thirds of the votes of the Supreme Council. The Supreme Council itself operates within the framework of the Constitution of Uzbekistan.",
      PL: "SPRZECZNOŚĆ. Artykuł 4 deklaracji wskazuje, że Republika Karakalpakstanu samodzielnie broni praworządności swoich praw. Zgodnie z konstytucją wniosek Komisji może zostać odrzucony co najmniej dwiema trzecimi głosów Rady Najwyższej. Sama Rada Najwyższa działa w ramach Konstytucji Uzbekistanu."
    }
  },
  {
    id: 114,
    title: "114-статья",
    cat: "amber",
    declRefLabel: {
      RU: "2. ПРОКУРОРСКИЙ НАДЗОР",
      KK: "2. ПРОКУРОРЛЫҚ ҚАДАҒАЛАЎ",
      EN: "2. PROSECUTORIAL OVERSIGHT",
      PL: "2. NADZÓR PROKURATORSKI"
    },
    declFull: {
      RU: "Депутатам Жокаргы Кенеса Республики Каракалпакстан в установленном порядке возмещаются расходы, связанные с депутатской деятельностью. Депутаты, работающие в Жокаргы Кенесе Республики Каракалпакстан и его органах на постоянной основе, на период своих полномочий не могут занимать какую-либо иную оплачиваемую должность, заниматься предпринимательской деятельностью.",
      KK: "Қарақалпақстан Республикасының Жоқарғы Кеңеси депутатларының депутатлық жумысы менен байланыслы қәрежетлери белгиленген тәртипте өтеледи. Қарақалпақстан Республикасы Жоқарғы Кеңесинде ҳәм оның уйымларында турақлы тийкарда ислейтуғын депутатлар өз ўәкилликлери дәўиринде ҳақы төленетуғын басқа бир лаўазымды ийелеўи, исбилерменлик жумыс пенен шуғылланыўы мүмкин емес.",
      EN: "Deputies of the Jokargy Kenes of the Republic of Karakalpakstan shall be reimbursed, in the prescribed manner, for expenses related to their parliamentary activities. Deputies working in the Jokargy Kenes of the Republic of Karakalpakstan and its bodies on a permanent basis may not hold any other paid position or engage in entrepreneurial activity during their term of office.",
      PL: "Deputowanym Jokargy Kenesu Republiki Karakalpakstanu przysługuje zwrot kosztów związanych z wykonywaniem mandatu w trybie określonym ustawą. Deputowani pracujący w Jokargy Kenesie i jego organach na zasadzie stałej nie mogą w okresie pełnienia mandatu zajmować żadnego innego płatnego stanowiska ani prowadzić działalności gospodarczej."
    },
    full: {
      RU: "Надзор за точным и единообразным исполнением законов на территории Республики Каракалпакстан осуществляют Прокурор Республики Каракалпакстан и подчиненные ему прокуроры.",
      KK: "Қарақалпақстан Республикасының аймағында нызамлардың дурыс ҳәм бир қыйлы орынланыўын бақлаўды Қарақалпақстан Республикасының Прокуроры ҳәм оған бағынышлы прокурорлар әмелге асырады.",
      EN: "Supervision over the precise and uniform execution of laws on the territory of the Republic of Karakalpakstan shall be exercised by the Procurator of the Republic of Karakalpakstan and procurators subordinate to him.",
      PL: "Nadzór nad ścisłym i jednolitym wykonywaniem ustaw na terytorium Republiki Karakałpakstanu sprawują Prokurator Republiki Karakałpakstanu oraz podlegli mu prokuratorzy."
    },
    comp: {
      RU: "УСЛОВНО. Статья 2 Декларации гласит, что функции прокурорского надзора осуществляются свободно. В Конституции установлено, что прокурорский надзор действует на основе принципа соблюдения закона - сохраняется общий принцип, однако порядок назначения прокурора зависит от Узбекистана.",
      KK: "ШӘРТЛИ ҚАЙШЫ. Декларацияның 2-статьясында прокурорлық қадағалаў функциялары еркинлик пенен әмелге асырылатуғыны белгиленген. Конституцияда прокурорлық қадағалаў нызамға бойсыныў принципи тийкарында жумыс алып барады деп белгиленген - улыўма принцип сақланған, бирақ прокурорды тайынлаў тәртиби Өзбекстанға байланыслы.",
      EN: "CONDITIONAL. Article 2 of the Declaration stipulates that prosecutorial oversight functions are exercised independently. The Constitution stipulates that prosecutorial oversight operates on the principle of compliance with the law - a general principle is observed, but the procedure for appointing a prosecutor depends on Uzbekistan.",
      PL: "WARUNKOWE. Artykuł 2 Deklaracji przewiduje, że funkcje прокурорского nadzoru realizowane są samodzielnie. Konstytucja stanowi, że nadzór prokuratorski działa na zasadzie przestrzegania prawa - przestrzegana jest zasada ogólna, ale sposób mianowania prokuratora zależy od Uzbekistanu."
    }
  },
  {
    id: 115,
    title: "115-статья",
    cat: "red",
    declRefLabel: {
      RU: "2. НАЗНАЧЕНИЕ ПРОКУРОРА",
      KK: "2. ПРОКУРОРДЫ ТАЙЫНЛАЎ",
      EN: "2. APPOINTMENT OF PROSECUTOR",
      PL: "2. MIANOWANIE PROKURATORA"
    },
    declFull: {
      RU: "Депутатам Жокаргы Кенеса Республики Каракалпакстан в установленном порядке возмещаются расходы, связанные с депутатской деятельностью. Депутаты, работающие в Жокаргы Кенесе Республики Каракалпакстан и его органах на постоянной основе, на период своих полномочий не могут занимать какую-либо иную оплачиваемую должность, заниматься предпринимательской деятельностью.",
      KK: "Қарақалпақстан Республикасының Жоқарғы Кеңеси депутатларының депутатлық жумысы менен байланыслы қәрежетлери белгиленген тәртипте өтеледи. Қарақалпақстан Республикасы Жоқарғы Кеңесинде ҳәм оның уйымларында турақлы тийкарда ислейтуғын депутатлар өз ўәкилликлери дәўиринде ҳақы төленетуғын басқа бир лаўазымды ийелеўи, исбилерменлик жумыс пенен шуғылланыўы мүмкин емес.",
      EN: "Deputies of the Jokargy Kenes of the Republic of Karakalpakstan shall be reimbursed, in the prescribed manner, for expenses related to their parliamentary activities. Deputies working in the Jokargy Kenes of the Republic of Karakalpakstan and its bodies on a permanent basis may not hold any other paid position or engage in entrepreneurial activity during their term of office.",
      PL: "Deputowanym Jokargy Kenesu Republiki Karakalpakstanu przysługuje zwrot kosztów związanych z wykonywaniem mandatu w trybie określonym ustawą. Deputowani pracujący w Jokargy Kenesie i jego organach na zasadzie stałej nie mogą w okresie pełnienia mandatu zajmować żadnego innego płatnego stanowiska ani prowadzić działalności gospodarczej."
    },
    full: {
      RU: "Прокурор Республики Каракалпакстан назначается и освобождается Жокаргы Кенесом Республики Каракалпакстан по согласованию с Генеральным прокурором Республики Узбекистан. Прокуроры районов и городов назначаются и освобождаются Генеральным прокурором Республики Узбекистан, по представлению Прокурора Республики Каракалпакстан. Срок полномочий Прокурора Республики Каракалпакстан, прокуроров районов и городов — пять лет.",
      KK: "Қарақалпақстан Республикасының Прокуроры Өзбекстан Республикасының Бас прокуроры менен келисилип, Қарақалпақстан Республикасының Жоқарғы Кеңеси тәрепинен тайынланады ҳәм босатылады. Районлардың ҳәм қалалардың прокурорлары Қарақалпақстан Республикасы Прокурорының усыныўы бойынша Өзбекстан Республикасының Бас прокуроры тәрепинен тайынланады ҳәм босатылады. Қарақалпақстан Республикасы Прокурорының, районлар ҳәм қалалар прокурорларының ўәкиллик мүддети - 5 жыл.",
      EN: "The Procurator of the Republic of Karakalpakstan shall be appointed and dismissed by the Jokargy Kenes of the Republic of Karakalpakstan in coordination with the Procurator General of the Republic of Uzbekistan. Procurators of districts and cities shall be appointed and dismissed by the Procurator General of the Republic of Uzbekistan upon the recommendation of the Procurator of the Republic of Karakalpakstan. The term of office for the Procurator of the Republic of Karakalpakstan and the procurators of districts and cities shall be five years.",
      PL: "Prokurator Republiki Karakałpakstanu jest mianowany i odwoływany przez Jokargy Kenes Republiki Karakałpakstanu w porozumieniu z Prokuratorem Generalnym Republiki Uzbekistanu. Prokuratorzy rejonowi i miejscy są mianowani i odwoływani przez Prokuratora Generalnego Republiki Uzbekistanu na wniosek Prokuratora Republiki Karakałpakstanu. Kadencja Prokuratora Republiki Karakałpakstanu oraz prokuratorów rejonowych i miejskich trwa pięć lat."
    },
    comp: {
      RU: "ПРОТИВОРЕЧИЕ. Статья 2 Декларации определяет назначение Генерального прокурора исключительным правом Верховного Совета Республики Каракалпакстан. Согласно Конституции, прокурор Республики Каракалпакстан назначается с согласия Генерального прокурора Узбекистана - прокурорский суверенитет полностью отменен.",
      KK: "ҚАЙШЫ. Декларацияның 2-статьясында Бас прокурорды тайынлаў Қарақалпақстан Республикасы Жоқарғы Кеңесиниң айрықша ҳуқықы деп белгиленген. Конституцияда болса Қарақалпақстан Республикасы прокуроры Өзбекстан Бас прокурорының келисими менен тайынланады - прокурорлық суверенитет толық бийкар етилген.",
      EN: "CONTRADICTION. Article 2 of the Declaration defines the appointment of the Prosecutor General as the exclusive right of the Supreme Council of the Republic of Karakalpakstan. According to the Constitution, the Prosecutor of the Republic of Karakalpakstan is appointed with the consent of the Prosecutor General of Uzbekistan - prosecutorial sovereignty is completely abolished.",
      PL: "SPRZECZNOŚĆ. Artykuł 2 deklaracji określa powołanie Prokuratora Generalnego na wyłączne prawo Rady Najwyższej Republiki Karakalpakstanu. Zgodnie z konstytucją prokurator Republiki Karakalpakstanu jest powoływany za zgodą Prokuratora Generalnego Uzbekistanu-suwerenność prokuratora została całkowicie zniesiona."
    }
  },
  {
    id: 116,
    title: "116-статья",
    cat: "amber",
    declRefLabel: {
      RU: "2. НЕЗАВИСИМОСТЬ ПРОКУРАТУРЫ",
      KK: "2. ПРОКУРАТУРА ҒӘРЕЗСИЗЛИГИ.",
      EN: "2. PROSECUTORIAL INDEPENDENCE",
      PL: "2. NIEZALEŻNOŚĆ PROKURATURY"
    },
    declFull: {
      RU: "Республика Каракалпакстан проводит государственное управление, принятие законов и указов и назначает судебные органы, осуществляющие надзор над исполнением принятого законодательства. Совет Министров Республики Каракалпакстан является высшим исполнительным и управляющим органом, осуществляющий принятие необходимых законов, управление и надзор над исполнением принятых законов. Совет Министров Республики Каракалпакстан является верховным исполнительным органом и органом управления. Верховный Суд Республики Каракалпакстан является Высшим Судом. Верховный Совет Республики Каракалпакстан назначает Генерального Прокурора осуществляющего надзор над исполнением закона, правопорядок и равного права всех перед законом.", 
        KK: "Қарақалпақстан Республикасында мəмлекетлик ҳəкимият ҳəм нызам шығарыў, атқарыўшы ҳəм суд уйымларына бөлистириў принципине муўапық əмелге асырылады. -Қарақалпақстан Республикасының Жоқарғы Кеңеси Қарақалпақстан Республикасы мəмлекетлик ҳəкимиятының жоқары уйымы болып табылады, ол өз жумысында нызам шығарыў, бийлик етиў ҳəм қадағалаў ўазыйпаларын əмелге асырады. -Қарақалпақстан Республикасының Министрлер Кеңеси Қарақалпақстан Республикасының Мəмлекетлик ҳəкимиятының жоқарғы атқарыўшы ҳəм бийлик етиўши уйымы болып табылады. -Қарақалпақстан Республикасының Жоқарғы Суды Қарақалпақстан Республикасының Жоқарғы Суд уйымы болып табылады. -Қарақалпақстан Республикасы Жоқарғы Совети тайынлайтуғын Қарақалпақстан Республикасының прокуроры нызамлардың саррас ҳəм бир қыйлы орынланыўын жоқары дəрежеде бақлап отырады.", 
        EN: "The Republic of Karakalpakstan conducts public administration, enacts laws and decrees, and appoints judicial bodies that oversee the implementation of the adopted legislation. The Supreme Council of the Republic of Karakalpakstan is the supreme body of state administration, which makes the necessary laws, manages and supervises the implementation of the adopted laws. The Council of Ministers of the Republic of Karakalpakstan is the supreme executive body and governing body. The Supreme Court of the Republic of Karakalpakstan is the Highest Court. The Supreme Council of the Republic of Karakalpakstan appoints the Prosecutor General to oversee the implementation of the law, the rule of law and the equal rights of all before the law.", 
        PL: "Republika Karakalpakstanu prowadzi administrację państwową, uchwala ustawy i dekrety oraz powołuje organy sądowe sprawujące nadzór nad wykonaniem przyjętego ustawodawstwa. Najwyższa Rada Republiki Karakalpakstanu jest najwyższym organem administracji państwowej. Rada Ministrów Republiki Karakalpakstanu jest najwyższym organem wykonawczym i zarządzającym. Najwyższy Sąd Republiki Karakalpakstanu jest najwyższym organem sądowym. Najwyższa Rada powołuje Prokuratora Generalnego sprawującego nadzór nad przestrzeganiem prawa i równością obywateli wobec prawa." 
    },
    full: {
      RU: "Органы прокуратуры Республики Каракалпакстан осуществляют свои полномочия независимо от каких бы то ни было государственных органов, общественных объединений и должностных лиц, подчиняясь только закону. Прокуроры на период своих полномочий приостанавливают членство в политических партиях и других общественных объединениях, преследующих политические цели. Организация, полномочия и порядок деятельности органов прокуратуры определяются законом.",
      KK: "Қарақалпақстан Республикасы прокуратура уйымлары өз ўәкилликлерин ҳәр қандай мәмлекетлик уйымлардан, жәмийетлик бирлеспелерден ҳәм лаўазымлы шахслардан бийғәрез, тек нызамға бойсынған ҳалда әмелге асырады. Прокурорлар өз ўәкилликлери мүддетинде сиясий мақсетлерди гөзлеўши сиясий партияларға ҳәм басқа да жәмийетлик бирлеспелерге ағзалығын тоқтатып турады. Прокуратура уйымларын дүзиў, олардың ўәкилликлери ҳәм жумыс тәртиби нызам менен белгиленеди.",
      EN: "The bodies of the Procuracy of the Republic of Karakalpakstan shall exercise their powers independently of any state bodies, public associations, and officials, being subordinate only to the law. For the duration of their term of office, procurators shall suspend their membership in political parties and other public associations pursuing political goals. The organization, powers, and procedure for the activities of the procuracy bodies shall be determined by law.",
      PL: "Organy prokuratury Republiki Karakałpacji wykonują swoje uprawnienia niezależnie od jakichkolwiek organów państwowych, stowarzyszeń społecznych i osób urzędowych, podlegając wyłącznie ustawie. Prokuratorzy w okresie sprawowania swoich funkcji zawieszają członkostwo w partiach politycznych i innych stowarzyszeniach społecznych dążących do celów politycznych. Organizację, uprawnienia oraz tryb działania organów prokuratury określa ustawa."
    },
    comp: {
      RU: "УСЛОВНО. Запрет на создание частных следственных органов соответствует принципу правопорядка, изложенному в статье 2 Декларации. Содержание не противоречит Декларации.", 
        KK: "ШӘРТЛИ ҚАЙШЫ. Жеке тергеў уйымларын дүзиўге тыйым Декларация 2-статьясындағы ҳуқықый тәртип принципине муўапық. Мазмун жағынан Декларацияға қайшы емес.", 
        EN: "CONDITIONAL. Prohibition on the establishment of private investigative bodies is in accordance with the principle of legal procedure in Article 2 of the Declaration. It does not contradict the Declaration in terms of content.", 
        PL: "WARUNKOWE. Zakaz tworzenia prywatnych organów dochodzeniowych jest zgodny z zasadą postępowania prawnego zawartą w art. Nie jest to sprzeczne z deklaracją pod względem treści." 
    }
  },
  {
    id: 117,
    title: "117-статья",
    cat: "green",
    declRefLabel: {
      RU: "4. ПРАВОПОРЯДОК",
      KK: "4. ҲУҚЫҚЫЙ ТӘРТИП",
      EN: "4. LEGAL ORDER",
      PL: "4. PORZĄDEK PRAWNY"
    },
    declFull: {
      RU: "Определяется верховенство законов и Конституции на территории Республики Каракалпакстан. Если со стороны правительств СССР и Узбекской ССР нарушаются права граждан Республики Каракалпакстан, то на основании существующих соглашений и законов СССР и УзССР, Республика Каракалпакстан вправе приостановить все принятые межгосударственные соглашения и договора и предъявить им ноту протеста.",
      KK: "Қарақалпақстан аймағында өзиниң ықтыярына берилген мəселелер бойынша Қарақалпақстан Республикасының Конституциясының ҳəм нызамларының үстемлиги белгиленеди. Егер СССРдың ҳəм Өзбекстан ССРның ҳуқықлық ўəкиллери шегинен шығып кетсе ҳəм Қарақалпақстан Республикасының ҳуқықларын бузатуғын болса, Республика СССРдың ҳəм Өзбекстан ССРның нызамларының, СССР ҳəм Өзбекстан ССР уйымларының басқа да актлериниң, шəртнамаларының ҳəрекет етиўин тоқтатыўға ҳəм оларға наразылық билдириўге ҳақылы.",
      EN: "The supremacy of laws and the Constitution in the territory of the Republic of Karakalpakstan is determined. If the rights of citizens of the Republic of Karakalpakstan are violated by the governments of the USSR and the Uzbek SSR, then on the basis of existing agreements and laws of the USSR and the Uzbek SSR, the Republic of Karakalpakstan has the right to suspend all interstate agreements and agreements and submit a note of protest to them.",
      PL: "Na terytorium Republiki Karakalpakstanu obowiązuje nadrzędność Konstytucji i ustaw. Jeśli prawa obywateli Republiki Karakalpakstanu są naruszane przez rządy ZSRR lub Uzbeckiej SRR, Republika ma prawo zawiesić wszystkie umowy międzypaństwowe i przedstawić im notę protestacyjną."
    },
    full: {
      RU: "На территории Республики Каракалпакстан запрещается создание и функционирование частных, кооперативных организаций, общественных объединений и их подразделений, самостоятельно выполняющих оперативно-розыскные, следственные и иные специальные функции по борьбе с преступностью. В защите законности и правопорядка, прав и свобод граждан правоохранительным органам могут оказывать содействие общественные объединения и граждане.",
      KK: "Қарақалпақстан Республикасының аймағында жынаятшылыққа қарсы гүресиў бойынша оператив-қыдырыў, тергеў ўазыйпаларын ҳәм басқа да арнаўлы ўазыйпаларды өз бетинше атқаратуғын жеке, кооперативлик шөлкемлерди, жәмийетлик бирлеспелерди ҳәм олардың бөлимшелерин дүзиў және олардың ислеўи қадаған етиледи. Нызамлылықты ҳәм ҳуқық тәртибин, пуқаралардың ҳуқықларын ҳәм еркинликлерин қорғаўда ҳуқық қорғаў уйымларына жәмийетлик бирлеспелер менен пуқаралар жәрдем етиўи мүмкин.",
      EN: "The creation and functioning of private or cooperative organizations, public associations, and their subdivisions independently performing operational-search, investigative, and other special functions for combating crime is prohibited on the territory of the Republic of Karakalpakstan. Public associations and citizens may assist law enforcement agencies in protecting the rule of law, public order, and the rights and freedoms of citizens.",
      PL: "Na terytorium Republiki Karakałpacji zabrania się tworzenia i funkcjonowania prywatnych, spółdzielczych organizacji, stowarzyszeń społecznych oraz ich jednostek strukturalnych, samodzielnie wykonujących czynności operacyjno-rozpoznawcze, śledcze oraz inne funkcje specjalne w zakresie zwalczania przestępczości. W ochronie praworządności i porządku publicznego, praw i wolności obywateli, organom ścigania mogą udzielać pomocy stowarzyszenia społeczne oraz obywatele."
    },
    comp: {
      RU: "СООТВЕТСТВУЕТ. Ограничение самовольного выполнения следственных функций частными или кооперативными организациями осуществляется в соответствии с принципом верховенства закона, изложенным в статье 4 Декларации.",
      KK: "МУЎАПЫҚ. Жеке ямаса кооперативлик шөлкемлердиң өзбасымшалық пенен тергеў функцияларын орынлаўына шек қойыў Декларацияның 4-статьясындағы нызам үстинлиги принципине муўапық.",
      EN: "MATCHES. Restricting the arbitrary performance of investigative functions by private or cooperative organizations is in accordance with the principle of the rule of law in Article 4 of the Declaration.",
      PL: "ZGODNE. Ograniczenie samowolnego wykonywania funkcji śledczych przez organizacje prywatne lub spółdzielcze odbywa się zgodnie z zasadą praworządności określoną w artykule 4 deklaracji."
    }
  },
  {
    id: 118,
    title: "118-статья",
    cat: "amber",
    declRefLabel: {
      RU: "5. БЮДЖЕТНАЯ СИСТЕМА",
      KK: "5. БЮДЖЕТ СИСТЕМАСЫ",
      EN: "5. BUDGET SYSTEM",
      PL: "5. SYSTEM BUDŻETOWY"
    },
    declFull: {
      RU: "Республика Каракалпакстан осуществляет защиту Конституционных Прав своих граждан, защиту их свобод, защиту их права на труд, защиту их собственности и определяет меры по осуществлению защиты, осуществляет организацию общественной жизни, осуществляет социально-культурное и экономическое развитие, осуществляет внешнеэкономическую деятельность, создание свободных экономических зон, осуществляет управление финансово-бюджетной системы, определяет основы оплаты труда и ценообразование, налоговое управление, защиту своей территории и управление природными ресурсами.",
      KK: "Қарақалпақстан Республикасы пухараларының Конституциялық ҳуқықларын, еркинликлерин ҳəм мийнетлерин, меншик қатнасықларын əмелге асырыў тəртибин, халық хожалығына ҳəм социаллық мəдений қурылысқа басшылық етиўди, сыртқы экономикалық жумысты шөлкемлестириўди, соның ишинде еркин кəрханашылық зоналарын, бюджетлик-финанс системасын мийнетке ҳақы төлеў ҳəм баҳа қойыў, салық салыў,қоршап турған орталықты қорғаў ҳəм тəбийий қорлардан пайдаланыў ислерин нызам менен ретлестириўди өз бетинше əмелге асырады.",
      EN: "The Republic of Karakalpakstan shall protect the Constitutional Rights of its citizens, the protection of their freedoms and protect their the right to work, protection of their property and defines the measures for the implementation of protection, organizes public life, carries out socio-cultural and economic development, provides externally economic activity, the creation of free economic zones, manages financial budget the system determines the basis of wage and pricing, tax administration, protection of its territory and management of natural resources.",
      PL: "Republika Karakalpakstanu chroni konstytucyjne prawa swoich obywateli, ich wolności, prawo do pracy, własności, organizuje życie społeczne, prowadzi rozwój społeczno-kulturalny i gospodarczy, działalność zagraniczną, tworzy wolne strefy ekonomiczne, zarządza systemem finansowo-budżetowym, określa podstawy wynagrodzeń i cen, prowadzi administrację podatkową, chroni swoje terytorium i zarządza zasobami naturalnymi."
    },
    full: {
      RU: "Государственный бюджет Республики Каракалпакстан включает в себя республиканский бюджет и местные бюджеты.",
      KK: "Қарақалпақстан Республикасының мәмлекетлик бюджети республикалық ҳәм жергиликли бюджетлерди өз ишине алады.",
      EN: "The State Budget of the Republic of Karakalpakstan shall include the republican budget and local budgets.",
      PL: "Budżet państwowy Republiki Karakałpacji obejmuje budżet republikański oraz budżety lokalne."
    },
    comp: {
      RU: "УСЛОВНО. Норма о том, что государственный бюджет состоит из республиканского и местных бюджетов, близка к принципу статьи 5 Декларации о том, что Республика Каракалпакстан управляет своей бюджетной системой. Однако этот бюджет формируется в рамках законодательства Узбекистана.",
      KK: "ШӘРТЛИ ҚАЙШЫ. Мәмлекетлик бюджет республикалық ҳәм жергиликли бюджетлерден ибарат деген норма Декларация 5-статьясындағы Қарақалпақстан Республикасы өз бюджет системасын басқарады деген принципке жақын. Бирақ бул бюджет Өзбекстан нызамшылығы шеңберинде қәлиплестириледи.",
      EN: "CONDITIONAL. The provision that the state budget consists of republican and local budgets is close to the principle stated in Article 5 of the Declaration that the Republic of Karakalpakstan manages its budget system. However, this budget is formed within the framework of Uzbekistan's legislation.",
      PL: "WARUNKOWE. Przepis, że budżet państwa składa się z budżetów republikańskich i lokalnych, jest zbliżony do zasady określonej w artykule 5 deklaracji, że Republika Karakalpakstan zarządza swoim systemem budżetowym. Budżet ten powstaje jednak w ramach ustawodawstwa Uzbekistanu."
    }
  },
  {
    id: 119,
    title: "119-статья",
    cat: "amber",
    declRefLabel: {
      RU: "5. РАСПРЕДЕЛЕНИЕ ДОХОДОВ",
      KK: "5. ДӘРАМАТЛАРДЫ БӨЛИЎ",
      EN: "5. REVENUE ALLOCATION",
      PL: "5. PODZIAŁ DOCHODÓW"
    },
    declFull: {
      RU: "Республика Каракалпакстан осуществляет защиту Конституционных Прав своих граждан, защиту их свобод, защиту их права на труд, защиту их собственности и определяет меры по осуществлению защиты, осуществляет организацию общественной жизни, осуществляет социально-культурное и экономическое развитие, осуществляет внешнеэкономическую деятельность, создание свободных экономических зон, осуществляет управление финансово-бюджетной системы, определяет основы оплаты труда и ценообразование, налоговое управление, защиту своей территории и управление природными ресурсами.",
      KK: "Қарақалпақстан Республикасы пухараларының Конституциялық ҳуқықларын, еркинликлерин ҳəм мийнетлерин, меншик қатнасықларын əмелге асырыў тəртибин, халық хожалығына ҳəм социаллық мəдений қурылысқа басшылық етиўди, сыртқы экономикалық жумысты шөлкемлестириўди, соның ишинде еркин кəрханашылық зоналарын, бюджетлик-финанс системасын мийнетке ҳақы төлеў ҳəм баҳа қойыў, салық салыў,қоршап турған орталықты қорғаў ҳəм тəбийий қорлардан пайдаланыў ислерин нызам менен ретлестириўди өз бетинше əмелге асырады.",
      EN: "The Republic of Karakalpakstan shall protect the Constitutional Rights of its citizens, the protection of their freedoms and protect their the right to work, protection of their property and defines the measures for the implementation of protection, organizes public life, carries out socio-cultural and economic development, provides externally economic activity, the creation of free economic zones, manages financial budget the system determines the basis of wage and pricing, tax administration, protection of its territory and management of natural resources.",
      PL: "Republika Karakalpakstanu chroni konstytucyjne prawa swoich obywateli, ich wolności, prawo do pracy, własności, organizuje życie społeczne, prowadzi rozwój społeczno-kulturalny i gospodarczy, działalność zagraniczną, tworzy wolne strefy ekonomiczne, zarządza systemem finansowo-budżetowym, określa podstawy wynagrodzeń i cen, prowadzi administrację podatkową, chroni swoje terytorium i zarządza zasobami naturalnymi."
    },
    full: {
      RU: "Разграничение доходов и расходов государственного бюджета Республики Каракалпакстан между республиканскими и местными бюджетами определяется законодательством Республики Каракалпакстан.",
      KK: "Қарақалпақстан Республикасының мәмлекетлик бюджетиниң дәрамат ҳәм қәрежетлерин республикалық ҳәм жергиликли бюджетлерге бөлиў Қарақалпақстан Республикасы нызамлары менен белгиленеди.",
      EN: "The delimitation of revenues and expenditures of the State Budget of the Republic of Karakalpakstan between the republican and local budgets shall be determined by the legislation of the Republic of Karakalpakstan.",
      PL: "Podział dochodów i wydatków budżetu państwowego Republiki Karakałpacji między budżet republikański a budżety lokalne określają przepisy ustawodawstwa Republiki Karakałpacji."
    },
    comp: {
      RU: "УСЛОВНО. Норма о том, что распределение доходов и расходов государственного бюджета определяется законодательством Республики Каракалпакстан, близка к статье 5 Декларации. Но бюджетный суверенитет ограничен.",
      KK: "ШӘРТЛИ ҚАЙШЫ. Мәмлекетлик бюджет дәраматлары ҳәм қәрежетлериниң бөлистирилиўи Қарақалпақстан Республикасының нызамшылығы арқалы белгиленеди, деген норма Декларацияның 5-статьясына жақын. Бирақ бюджетлик суверенитет шекленген.",
      EN: "CONDITIONAL. The provision that the distribution of state budget revenues and expenditures is determined by the legislation of the Republic of Karakalpakstan is close to Article 5 of the Declaration. However, budgetary sovereignty is limited.",
      PL: "WARUNKOWE. Przepis, że podział dochodów i wydatków budżetu państwa jest określony przez ustawodawstwo Republiki Karakalpakstanu, jest zbliżony do artykułu 5 deklaracji. Suwerenność budżetowa jest jednak ograniczona."
    }
  },
  {
    id: 120,
    title: "120-статья",
    cat: "red",
    declRefLabel: {
      RU: "11. ОСНОВА КОНСТИТУЦИИ",
      KK: "11. КОНСТИТУЦИЯ ТИЙКАРЫ",
      EN: "11. CONSTITUTIONAL BASIS",
      PL: "11. PODSTAWA KONSTYTUCJI"
    },
    declFull: {
      RU: "Эта Декларация Независимости, определяющая суверенитет Республики Каракалпакстан, является основой новой Конституции Республики Каракалпакстан и предопределяющей основой развития законов Республики Каракалпакстан.",
      KK: "Мəмлекетлик Суверенитети ҳаққында усы Декларация Суверенли Қарақалпақстан Республикасының жаңа Конституциясын ислеп шығыў, оның нызамларын раўажландырыў ушын тийкар болып табылады. ",
      EN: "This Declaration of Independence, which defines the sovereignty of the Republic of Karakalpakstan, is the basis of the new The Constitution of the Republic of Karakalpakstan and the determining basis for the development of the laws of the Republic of Karakalpakstan.",
      PL: " Niniejsza Deklaracja Niepodległości, określająca suwerenność Republiki Karakalpakstanu, stanowi podstawę nowej Konstytucji Republiki Karakalpakstanu i rozwoju jej ustawodawstwa."
    },
    full: {
      RU: "Изменения в Конституцию Республики Каракалпакстан вносятся законами, принятыми большинством голосов не менее чем двух трети от общего числа депутатов Жокаргы Кенеса или путем проведения референдума Республики Каракалпакстан.",
      KK: "Қарақалпақстан Республикасының Конституциясына өзгерислер Қарақалпақстан Республикасы Жоқарғы Кеңеси депутатларының улыўма санының ең кеминде үштен екисиниң көпшилик даўысы арқалы қабыл етилген нызамы ямаса Қарақалпақстан Республикасының референдумы менен киргизиледи.",
      EN: "Amendments to the Constitution of the Republic of Karakalpakstan shall be introduced by laws adopted by a majority of at least two-thirds of the total number of deputies of the Jokargy Kenes or through a referendum of the Republic of Karakalpakstan.",
      PL: "Zmiany w Konstytucji Republiki Karakałpacji wprowadza się w drodze ustaw przyjętych większością co najmniej dwóch trzecich głosów ogólnej liczby deputowanych Rady Najwyższej (Jokargy Kenes) lub w drodze referendum Republiki Karakałpacji."
    },
    comp: {
      RU: "ПРОТИВОРЕЧИЕ. В статье 11 Декларации объявлено о добровольном принятии новой Конституции суверенной Республикой Каракалпакстан. Однако, поскольку сам Верховный Совет действует в рамках Узбекистана, внесение изменений в Конституцию не признается свободной волей суверенного народа.",
      KK: "ҚАЙШЫ. Декларацияның 11-статьясында жаңа Конституция суверен Қарақалпақстан Республикасының өз қәлеўи менен қабыл етилиўи жәрияланды. Бирақ Жоқарғы Кеңестиң өзи Өзбекстан шеңберинде жумыс алып баратуғын болғанлықтан, Конституцияға өзгерис киргизиў суверен халықтың еркин ерки сыпатында тән алынбайды.",
      EN: "CONTRADICTION. Article 11 of the Declaration declared the adoption of the new Constitution at the discretion of the sovereign Republic of Karakalpakstan. However, since the Supreme Council itself operates within the framework of Uzbekistan, amending the Constitution is not recognized as the free will of the sovereign people.",
      PL: "SPRZECZNOŚĆ. Artykuł 11 deklaracji zapowiadał przyjęcie nowej konstytucji według uznania suwerennej Republiki Karakalpakstanu. Ponieważ jednak sama Rada Najwyższa działa w Uzbekistanie, zmiana konstytucji nie jest uznawana za wolną wolę suwerennego narodu."
    }
  },
  {
    id: 121,
    title: "121-статья",
    cat: "amber",
    declRefLabel: {
      RU: "11. КОНСТИТУЦИОННАЯ РЕФОРМА",
      KK: "11. КОНСТИТУЦИЯЛЫҚ РЕФОРМА",
      EN: "11. CONSTITUTIONAL REFORM",
      PL: "11. REFORMA KONSTYTUCYJNA"
    },
    declFull: {
      RU: "Эта Декларация Независимости, определяющая суверенитет Республики Каракалпакстан, является основой новой Конституции Республики Каракалпакстан и предопределяющей основой развития законов Республики Каракалпакстан.",
      KK: "Мəмлекетлик Суверенитети ҳаққында усы Декларация Суверенли Қарақалпақстан Республикасының жаңа Конституциясын ислеп шығыў, оның нызамларын раўажландырыў ушын тийкар болып табылады. ",
      EN: "This Declaration of Independence, which defines the sovereignty of the Republic of Karakalpakstan, is the basis of the new The Constitution of the Republic of Karakalpakstan and the determining basis for the development of the laws of the Republic of Karakalpakstan.",
      PL: " Niniejsza Deklaracja Niepodległości, określająca suwerenność Republiki Karakalpakstanu, stanowi podstawę nowej Konstytucji Republiki Karakalpakstanu i rozwoju jej ustawodawstwa."
    },
    full: {
      RU: "Жокаргы Кенес Республики Каракалпакстан вправе принять закон об изменениях и поправках к Конституции в течение шести месяцев после внесения соответствующего предложения. Если Жокаргы Кенес Республики Каракалпакстан отклонил предложение об изменении Конституции, оно может быть возобновлено не ранее чем через год.",
      KK: "Қарақалпақстан Республикасының Жоқарғы Кеңеси Конституцияға өзгерислер ҳәм дүзетиӯлер киргизиў ҳаққында нызамды тийисли усыныс болғаннан кейин алты ай даўамында қабыл етиўге ҳақылы. Егер Қарақалпақстан Республикасының Жоқарғы Кеңеси Конституцияға өзгерис киргизиў ҳаққындағы усынысты қайтарса, кеминде бир жылдан соң оны қайталаўға болады.",
      EN: "The Jokargy Kenes of the Republic of Karakalpakstan shall have the right to adopt a law on amendments and additions to the Constitution within six months after the submission of a corresponding proposal. If the Jokargy Kenes of the Republic of Karakalpakstan rejects a proposal to amend the Constitution, it may be reintroduced no earlier than one year later.",
      PL: "Rada Najwyższa (Jokargy Kenes) Republiki Karakałpacji jest uprawniona do uchwalenia ustawy o zmianach i poprawkach do Konstytucji w terminie sześciu miesięcy od przedłożenia stosownego wniosku. Jeżeli Rada Najwyższa Republiki Karakałpacji odrzuciła wniosek o zmianę Konstytucji, może on zostać ponowiony nie wcześniej niż po upływie roku."
    },
    comp: {
      RU: "УСЛОВНО. Порядок внесения изменений в Конституцию схож со статьей 11 Декларации. Однако шестимесячный механизм интересов и предложения определяется в конституционных рамках Узбекистана - суверен не признается правом на конституционную реформу.",
      KK: "ШӘРТЛИ ҚАЙШЫ. Конституцияға өзгерис киргизиў тәртиби Декларацияның 11-статьясына жақын. Бирақ алты айлық мәп ҳәм усыныс механизми Өзбекстан конституциялық шеңберинде белгиленеди - суверен конституциялық реформа ҳуқықы сыпатында тән алынбайды.",
      EN: "CONDITIONAL. The procedure for amending the Constitution is similar to Article 11 of the Declaration. However, the six-month interest and proposal mechanism is defined within the constitutional framework of Uzbekistan - it is not recognized as the right to sovereign constitutional reform.",
      PL: "WARUNKOWE. Procedura zmiany konstytucji jest podobna do Artykułu 11 deklaracji. Sześciomiesięczny mechanizm interesów i propozycji jest jednak określony w konstytucyjnej bazie Uzbekistanu - nie jest uznawany za prawo do suwerennej reformy konstytucyjnej."
    }
  }
];

function Tooltip({ text, label, isDecl, isDark, t }) {
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const color = isDecl ? "#d4af37" : "#3b82f6";

  return (
    <>
      <span
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onMouseMove={(e) => setPos({ x: Math.min(e.clientX + 15, window.innerWidth - 350), y: e.clientY + 15 })}
        style={{ cursor: "help", borderBottom: `1px dotted ${color}`, color: color, fontWeight: 700, fontSize: "14px" }}
      >
        {label}
      </span>
      {show && (
        <div style={{ position: "fixed", left: pos.x, top: pos.y, zIndex: 9999, background: isDark ? "#1a1c1e" : "#ffffff", color: isDark ? "#ffffff" : "#1a1a1a", padding: "15px", borderRadius: "10px", boxShadow: "0 10px 30px rgba(0,0,0,0.2)", maxWidth: "320px", fontSize: "13px", lineHeight: "1.6", border: `1px solid ${color}88`, pointerEvents: "none" }}>
          {/* Енді t.colDecl мен t.colArticle қатесіз жұмыс істейді */}
          <b style={{ color, display: "block", marginBottom: "5px", fontSize: "11px", textTransform: "uppercase" }}>
            {isDecl ? t.colDecl.toUpperCase() : t.colArticle.toUpperCase()}
          </b>
          {text}
        </div>
      )}
    </>
  );
}

export default function ConstitutionAnalysis2021() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [lang, setLang] = useState(localStorage.getItem("i18nextLng")?.toUpperCase().split('-')[0] || "RU");
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains("dark"));

  useEffect(() => {
    // Бет ашылғанда браузерді ең жоғарыға (0,0 координатасына) айналдырады
    window.scrollTo(0, 0);

    const handleLang = (e) => { if (e.detail?.lang) setLang(e.detail.lang.toUpperCase()); };
    window.addEventListener("languageChange", handleLang);
    const obs = new MutationObserver(() => setIsDark(document.documentElement.classList.contains("dark")));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => { 
      window.removeEventListener("languageChange", handleLang); 
      obs.disconnect(); 
    };
  }, []);

  const finalLang = lang === "KAA" ? "KK" : (LANGS[lang] ? lang : "RU");
  const t = LANGS[finalLang];

  const rows = DATA_2021.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase()) || String(r.id).includes(search);
    const matchesFilter = filter === "all" || r.cat === filter;
    return matchesSearch && matchesFilter;
  });

  const theme = {
  text: isDark ? "#ffffff" : "#1a1a1a", // Текст жарық экранда қара (1a1a1a) болады
  bg: isDark ? "#06060a" : "#f5f5f5",
  surface: isDark ? "#0d0d12" : "#ffffff",
  border: isDark ? "#222222" : "#dddddd",
  tableRow: isDark ? "#16161c" : "#f9f9f9"
  };

  return (
    <div style={{ minHeight: "100vh", background: theme.bg, color: theme.text, padding: "40px 20px", transition: "0.3s" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <button onClick={() => navigate(-1)} style={{ background: "#3b82f6", border: "none", color: "#fff", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "8px", padding: "10px 24px", borderRadius: "10px", fontWeight: 800, marginBottom: "30px" }}>
          <ArrowLeft size={20}/> {t.back}
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "18px", marginBottom: "35px" }}>
          <img src="/images/Flaga11.jpg" alt="KK Flag" style={{ width: "65px", height: "auto" }} />
          <h1 style={{ fontSize: "clamp(24px, 4.5vw, 36px)", fontWeight: 900, color: theme.text }}>{t.pageTitle}</h1>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "25px" }}>
            <div style={{ position: "relative", maxWidth: "320px", flex: 1 }}>
                <Search size={18} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "gray" }} />
                <input placeholder={t.searchPh} value={search} onChange={e => setSearch(e.target.value)} style={{ width: "100%", padding: "12px 12px 12px 42px", borderRadius: "12px", background: theme.surface, border: `1px solid ${theme.border}`, color: theme.text, outline: "none" }} />
            </div>
            {filter !== "all" && <button onClick={() => setFilter("all")} style={{ padding: "10px 15px", borderRadius: "10px", background: "#f87171", color: "#fff", border: "none", cursor: "pointer", fontWeight: 700 }}>{t.resetFilter}</button>}
        </div>

        <div style={{ overflowX: "auto", background: theme.surface, borderRadius: "14px", border: `1px solid ${theme.border}` }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "900px" }}>
            <thead>
  <tr style={{ background: theme.tableRow, color: isDark ? "#888" : "#555", fontSize: "12px", textTransform: "uppercase" }}>
    <th style={{ padding: "18px 15px", textAlign: "left" }}>#</th>
    <th style={{ padding: "18px 15px", textAlign: "left" }}>{t.colArticle}</th>
    <th style={{ padding: "18px 15px", textAlign: "left" }}>{t.colCat}</th>
    <th style={{ padding: "18px 15px", textAlign: "left" }}>{t.colDecl}</th>
    <th style={{ padding: "18px 15px", textAlign: "left" }}>{t.colComp}</th>
  </tr>
</thead>
            <tbody>
  {rows.map(r => (
    <tr key={r.id} style={{ borderBottom: `1px solid ${theme.border}` }}>
      <td style={{ padding: "18px 15px", color: "gray", fontFamily: "monospace" }}>{r.id}</td>
      
      {/* 1. Конституция бағаны - "Статья" сөзи 4 тилде шығыўы ушын */}
      <td style={{ padding: "18px 15px" }}>
         <Tooltip 
  text={r.full[finalLang]} 
  label={finalLang === "KK" ? `${r.id}${t.articleLabel}` : `${t.articleLabel} ${r.id}`} 
  isDecl={false} 
  isDark={isDark} 
  t={t} // Осыны қосыңыз
/>
      </td>

      <td style={{ padding: "18px 15px" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "5px 14px", borderRadius: "20px", background: r.cat === 'red' ? 'rgba(239,68,68,0.15)' : r.cat === 'amber' ? 'rgba(245,158,11,0.15)' : 'rgba(16,185,129,0.15)', color: r.cat === 'red' ? '#ef4444' : r.cat === 'amber' ? '#f59e0b' : '#10b981', fontWeight: 800, fontSize: "13px" }}>
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: r.cat === 'red' ? '#ef4444' : r.cat === 'amber' ? '#f59e0b' : '#10b981' }} />
          {t[`${r.cat.charAt(0)}Label`]}
        </span>
      </td>

      {/* 2. Декларация бағаны - 4 тилге автоматты өтиўи ушын */}
      <td style={{ padding: "18px 15px" }}>
        <Tooltip 
  text={r.declFull[finalLang]} 
  label={r.declRefLabel[finalLang]} 
  isDecl={true} 
  isDark={isDark} 
  t={t} // Осыны қосыңыз
/>
      </td>

      <td style={{ padding: "18px 15px", fontSize: "14px", color: theme.text, opacity: 0.9, lineHeight: "1.6" }}>{r.comp[finalLang]}</td>
    </tr>
  ))}
</tbody>
          </table>
        </div>

        <div style={{ marginTop: "45px", padding: "35px", background: theme.surface, borderLeft: "8px solid #d4af37", border: `1px solid ${theme.border}`, borderRadius: "18px" }}>
           <h2 style={{ fontSize: "22px", fontWeight: 900, marginBottom: "25px", color: theme.text }}>📊 {t.summaryTitle}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "30px" }}>
             <div onClick={() => setFilter("red")} style={{ padding: "20px", background: isDark ? "#16161c" : "#fff", borderRadius: "14px", border: filter === "red" ? "2px solid #ef4444" : `1px solid ${theme.border}`, cursor: "pointer" }}>
                <b style={{ color: "#ef4444", display: "block", marginBottom: "8px" }}>🔴 {t.rLabel}</b>
                <span style={{ fontSize: "24px", fontWeight: 900 }}>32</span> <small style={{ color: "gray" }}>(26.4%)</small>
             </div>
             <div onClick={() => setFilter("amber")} style={{ padding: "20px", background: isDark ? "#16161c" : "#fff", borderRadius: "14px", border: filter === "amber" ? "2px solid #f59e0b" : `1px solid ${theme.border}`, cursor: "pointer" }}>
                <b style={{ color: "#f59e0b", display: "block", marginBottom: "8px" }}>🟡 {t.aLabel}</b>
                <span style={{ fontSize: "24px", fontWeight: 900 }}>39</span> <small style={{ color: "gray" }}>(32.2%)</small>
             </div>
             <div onClick={() => setFilter("green")} style={{ padding: "20px", background: isDark ? "#16161c" : "#fff", borderRadius: "14px", border: filter === "green" ? "2px solid #10b981" : `1px solid ${theme.border}`, cursor: "pointer" }}>
                <b style={{ color: "#10b981", display: "block", marginBottom: "8px" }}>🟢 {t.gLabel}</b>
                <span style={{ fontSize: "24px", fontWeight: 900 }}>50</span> <small style={{ color: "gray" }}>(41.4%)</small>
             </div>
          </div>
          <p style={{ color: "#ef4444", fontWeight: 950, fontSize: "20px" }}>{t.conclusion} {t.stats.c}</p>
          <p style={{ color: theme.text, opacity: 0.85, fontSize: "16px", marginTop: "15px", lineHeight: "1.8" }}>{t.stats.d}</p>
        </div>
      </div>
    </div>
  );
}