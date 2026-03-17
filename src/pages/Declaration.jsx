import React, { useState, useEffect } from "react";
import { Landmark, FileText, Download, ChevronDown, ChevronUp, Facebook, Instagram, Twitter, Youtube, Send } from "lucide-react";

// TikTok иконкасы (Сырттан қосылды)
const TikTokIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

export default function Declaration() {
  const [lang, setLang] = useState("RU");
  const [showFullText, setShowFullText] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const handleLangChange = (e) => {
      if (e.detail?.lang) setLang(e.detail.lang);
    };
    window.addEventListener("languageChange", handleLangChange);
    return () => window.removeEventListener("languageChange", handleLangChange);
  }, []);

  // ========================================
  // PDF ФАЙЛДАР
  // ========================================
  const pdfLinks = {
    KK: "/documents/declaration_kk.pdf",
    RU: "/documents/declaration_ru.pdf",
    EN: "/documents/declaration_en.pdf",
    PL: "/documents/declaration_pl.pdf"
  };

  const translations = {
    KK: { 
      title: "Декларация", 
      subtitle: "Қарақалпақстан Республикасының Мәмлекетлик Суверенитети ҳаққында",
      fullTextTitle: "Декларацияның толық ресмий тексти",
      showText: "Текстти көрсетиў",
      hideText: "Жасырыў",
      downloadPDF: "PDF жүклеў",
      pdfLanguages: "4 тилдеги PDF нусқасы",
      shareTitle: "Бөлисиў"
    },
    RU: { 
      title: "Декларация", 
      subtitle: "О государственном суверенитете Республики Каракалпакстан",
      fullTextTitle: "Полный официальный текст Декларации",
      showText: "Показать текст",
      hideText: "Скрыть",
      downloadPDF: "Скачать PDF",
      pdfLanguages: "PDF версии на 4 языках",
      shareTitle: "Поделиться"
    },
    EN: { 
      title: "Declaration", 
      subtitle: "On State Sovereignty of the Republic of Karakalpakstan",
      fullTextTitle: "Full Official Text of the Declaration",
      showText: "Show Text",
      hideText: "Hide",
      downloadPDF: "Download PDF",
      pdfLanguages: "PDF versions in 4 languages",
      shareTitle: "Share"
    },
    PL: { 
      title: "Deklaracja", 
      subtitle: "O suwerenności państwowej Republiki Karakałpakstanu",
      fullTextTitle: "Pełny oficjalny tekst Deklaracji",
      showText: "Pokaż tekst",
      hideText: "Ukryj",
      downloadPDF: "Pobierz PDF",
      pdfLanguages: "Wersje PDF w 4 językach",
      shareTitle: "Udostępnij"
    }
  };

  // ========================================
  // ДЕКЛАРАЦИЯ ТЕКСТИ
  // ========================================
  const declarationText = {
    KK: `
ДЕКЛАРАЦИЯ
Қарақалпақстан Республикасының Мәмлекетлик Суверенитети хаққында.

Қарақалпақстан Автономиялы Совет Социалистлик Республикасының Жоқарғы Кеңеси:
Қарақалпақстанның көп миллетли халқының тəғдири ушын тарийхый 
жуўапкершиликти сезе отырып, оны еркин билдире отырып, СССРдың барлық 
миллетлери менен халықларының суверенли ҳуқықларына хүрмет көрсете 
отырып, хəр бир халықтың өз тəғдирин өзи белгилеў бойынша ажыралмас 
ҳуқықына тийкарлана отырып, Қарақалпақстан АССРына тийисли ҳəм 
СССРдың, Өзбекстан ССРының ҳəм Қарақалпақстан АССРнының 
конституцияларына қайшы келетуғын бурын қабыл етилген актлерди қайта 
көрип шығыў ҳаққында Өзбекстан ССР Жоғарғы Кеңесине мүрəжəт ете отырып, 
халықларды сиясий, экономикалық, социяллық ҳəм руўхый раўажландырыўға, 
Аралдың қурып баратырғанлығынан келип шыққан экологиялық 
машқалаларды шешиўге ғамқорлық ете отырып, экологиялық апатшылықтың 
нағыз орайында жасаўшы автономиялы республика пухараларының оғада төмен 
турмыс дəрежесин есапқа ала отырып, СССР федерациясының субьекти 
сыпатында Қарақалпақстан мəмлекетлик Суверенитетин жəриялайды ҳəм оны 
Суверенли Қарақалпақстан Республикасы етип қайта дүзеди.  
Қарақалпақстан Республикасы менен СССР, Өзбекстан ССР арасындағы 
қатнасықлар, шəртнамалар ҳəм келисимлер тийкарында қурылады. 

1. Қарақалпақстан Республикасы дүзилген шəртнамалар тийкарында Өзбекстан 
ССРына ҳəм СССРға ықтыярлы берилетуғын ҳуқықлық ўəкиллерден басқа 
мəмлекетлик ҳəкимиятқа өз аймағында толық ийе болады. Республика өзиниң 
мəмлекетлик дүзилисин, ҳəкимшилик-аймақлық бөлиниўин мəмлекетлик 
ҳəкимият ҳəм басқарыў уйымлары системасын, сондай-ақ судты, арбитражды 
ҳəм прокурорлық бақлаў шөлкемлестириў ислерин өз бетинше белгилейди. 

2. Қарақалпақстан Республикасында мəмлекетлик ҳəкимият ҳəм нызам 
шығарыў, атқарыўшы ҳəм суд уйымларына бөлистириў принципине муўапық 
əмелге асырылады.  -Қарақалпақстан Республикасының Жоқарғы Кеңеси Қарақалпақстан 
Республикасы мəмлекетлик ҳəкимиятының жоқары уйымы болып табылады, ол 
өз жумысында нызам шығарыў, бийлик етиў ҳəм қадағалаў ўазыйпаларын əмелге 
асырады. 
-Қарақалпақстан Республикасының Министрлер Кеңеси Қарақалпақстан 
Республикасының Мəмлекетлик ҳəкимиятының жоқарғы атқарыўшы ҳəм 
бийлик етиўши уйымы болып табылады.  -Қарақалпақстан 
Республикасының 
Жоқарғы Суды Қарақалпақстан 
Республикасының Жоқарғы Суд уйымы болып табылады.  -Қарақалпақстан 
Республикасы 
Жоқарғы 
Совети 
тайынлайтуғын 
Қарақалпақстан Республикасының прокуроры нызамлардың саррас ҳəм бир 
қыйлы орынланыўын жоқары дəрежеде бақлап отырады. 

3. Қарақалпақстан Республикасының көп миллетли халқы оның мəмлекетлик 
Суверенитетиниң ўəкили ҳəм дəреги болып табылады. Халық Республиканың 
Конституциясы ҳəм тийкарында тиккелей жəне халық депутатларының 
Кеңеслери арқалы мəмлекетлик ҳəкимиятты иске асырады. Қарақалпақстан 
Республикасы мəмлекетлик ҳəкимиятын толық бийлигин пайдалана отырып, 
халықлар дослығын беккемлейди. 

4. Қарақалпақстан аймағында өзиниң ықтыярына берилген мəселелер бойынша 
Қарақалпақстан Республикасының Конституциясының ҳəм нызамларының 
үстемлиги белгиленеди. Егер СССРдың ҳəм Өзбекстан ССРның ҳуқықлық 
ўəкиллери шегинен шығып кетсе ҳəм Қарақалпақстан Республикасының 
ҳуқықларын бузатуғын болса, Республика СССРдың ҳəм Өзбекстан ССРның 
нызамларының, СССР ҳəм Өзбекстан ССР уйымларының басқа да актлериниң, 
шəртнамаларының ҳəрекет етиўин тоқтатыўға ҳəм оларға наразылық 
билдириўге ҳақылы. 

5. Қарақалпақстан Республикасы пухараларының Конституциялық ҳуқықларын, 
еркинликлерин ҳəм мийнетлерин, меншик қатнасықларын əмелге асырыў 
тəртибин, халық хожалығына ҳəм социаллық мəдений қурылысқа басшылық 
етиўди, сыртқы экономикалық жумысты шөлкемлестириўди, соның ишинде 
еркин кəрханашылық зоналарын, бюджетлик-финанс системасын мийнетке ҳақы 
төлеў ҳəм баҳа қойыў, салық салыў,қоршап турған орталықты қорғаў ҳəм 
тəбийий қорлардан пайдаланыў ислерин нызам менен ретлестириўди өз бетинше 
əмелге асырады. 

6. Қарақалпақстан Суверенли Республикасының аймағы бирден-бир бөлинбес 
аймақ болып табылады ҳəм Республика Жоғарғы Кеңесиниң жəне оның 
халқының келисимисиз өзгертилмейди. Жер, оның қазылма байлықлары, 
өсимликлер ҳəм ҳайуанатлар дүньясы, басқа да тəбийий қорлары, сондай-ақ 
Республиканың аймағында дүзилген пүткил экономикалық, илимий техникалық 
ҳəм мəдений потенциал Қарақалпақстан Республикасының айрықша меншиги, 
оның Суверенитетиниң материаллық тийкары болып табылады.  

7. Қарақалпақстан Республикасы СССРдан ҳəм Өзбекстан ССРнан шығыў 
ҳуқықын өзинде қалдырады. 

8. Қарақалпақстан Республикасы өзиниң пуқаралығына ийе болады, Республика 
пухаралары соның менен бир ўақытта Өзбекстан ССРның ҳəм СССРдың 
пухаралары болып табылады. 

9. Қарақалпақстан Республикасы өзиниң мəмлекетлик символикасын, гербин, 
байрағын, гимнин белгилеп алады. 

10. Қарақалпақстан Республикасы аймағында Қарақалпақ тили мəмлекетлик тил 
болып табылады. Қарақалпақстан өз аймағында Республикада жəм болып 
жайласқан барлық халықлардың ана тиллерин, соның ишинде миллетлер 
аралық қатнасық тили болған рус тилиниң еркин ислеўи ҳəм раўажланыўы 
ушын барлық жағдайларды тəмийинлейди. 

11. Мəмлекетлик Суверенитети ҳаққында усы Декларация Суверенли 
Қарақалпақстан Республикасының жаңа Конституциясын ислеп шығыў, оның 
нызамларын раўажландырыў ушын тийкар болып табылады. 

12. Суверенли Қарақалпақстан Республикасының жаңа Конституциясы, басқа да 
нызамлары ҳəм нормативлик актлери қабыл етилгенге дейин, Қарақалпақстан 
аймағында Қарақалпақстан АССРның , Өзбекстан ССРының ҳəм СССРдың 
бурын қабыл етилген конституциялары ҳəм нызамлары ҳəрекет ете береди. 

1990-жылы 14-декабрьде Қарақалпақстан Республикасының Жоқарғы Кеңесиниң 
4-сессиясында қабыл етилди. Нөкис қаласы. 186 депутат қол қойды.  

Өзбекстан ССР нан бөлек шығыў қарары Өзбекстан ССР хəм СССР 
мəмлекетлерине жеткерилди ҳəм түсиниклер берилди.  
Ислеп шығарылды. Ноябрь Декабрь 1990-жыл, ратификациядан өткизилди 
14-декабрьде 1990-жыл. Нөкис қаласы, Қарақалпақстан Республикасында.`,

    RU: `
Декларация 
О Государственном суверенитете Республики 
Каракалпакстан. 

Верховный Совет Каракалпакской Автономной Советской Социалистической 
Республики:  
Чувствуя историческую ответственность за судьбу многонационального народа 
Каракалпакстана, свободно выражая ее, уважая суверенные права всех наций и народов 
СССР, основываясь на неотъемлемом праве каждого народа на самоопределение, 
обращаясь в Верховный Совет Узбекской ССР о пересмотре ранее принятых актов, 
касающихся Каракалпакской АССР и противоречащих конституциям СССР, Узбекской 
ССР и Каракалпакской АССР, заботясь о политическом, экономическом, социальном и 
духовном развитии народов, решении экологических проблем, вызванных высыханием 
Аральского моря, принимая во внимание крайне низкий уровень жизни граждан 
автономной республики, проживающих в самом центре экологической катастрофы, 
Каракалпакстан объявляет государственный суверенитет как субъект федерации СССР 
и преобразует его в Суверенную Республику Каракалпакстан.  
Отношения между Республикой Каракалпакстан, СССР и Узбекской ССР строятся на 
основе договоров и соглашений. 

1. Республика Каракалпакстан берет под свое правовое управление все договора и 
соглашения, которые Советская Республика Каракалпакстан заключила с Союзом ССР 
и Узбекской Социалистической Республикой и делегирует себе все полномочия. Строит 
необходимую структуру Государственного управления на всех административных 
уровнях на своей территории.  
Республика Каракалпакстан, далее именуемая Республика строит все свои 
административные округа, создает необходимые административно хозяйственные 
разделения и органы государственного управления, такие как судебный, арбитражный 
и прокурорский надзор и другие осуществляет исключительно самостоятельно. 

2. Республика Каракалпакстан проводит государственное управление, принятие законов 
и указов и назначает судебные органы, осуществляющие надзор над исполнением 
принятого законодательства.  
Совет Министров Республики Каракалпакстан является высшим исполнительным и 
управляющим органом, осуществляющий принятие необходимых законов, управление 
и надзор над исполнением принятых законов.  
Совет Министров Республики Каракалпакстан является верховным исполнительным 
органом и органом управления. Верховный Суд Республики Каракалпакстан является 
Высшим Судом.  
Верховный Совет Республики Каракалпакстан назначает Генерального Прокурора 
осуществляющего надзор над исполнением закона, правопорядок и равного права всех 
перед законом. 

3. Многонациональный народ Республики Каракалпакстан определяет и составляет 
Государство на своей суверенной территории.  
Народ, опираясь на Конституцию и законы непосредственно и однозначно через 
избранных депутатов осуществляет государственное управление. Правительство 
Республики Каракалпакстан уполномоченное властью осуществляет укрепление 
дружбы народов.  
Государство всем своим гражданам проживающим на территории Республики 
Каракалпакстан, не смотря на их политические взгляды, веру исповедания и другие 
отличия, обеспечивает всех равными правами и свободами. 

4. На территории Каракалпакстана по вопросам, отнесённым к его собственной компетенции, устанавливается верховенство Конституции и законов Республики Каракалпакстан.
Если органы власти СССР или Узбекской ССР выходят за пределы своих полномочий и нарушают права Республики Каракалпакстан, Республика имеет право приостанавливать действие законов СССР и Узбекской ССР, а также иных актов и договоров их органов, и выражать им своё возражение. 

5. Республика Каракалпакстан осуществляет защиту Конституционных Прав своих 
граждан, защиту их свобод, защиту их права на труд, защиту их собственности и 
определяет меры по осуществлению защиты, осуществляет организацию 
общественной жизни, осуществляет социально-культурное и экономическое развитие, 
осуществляет 
внешнеэкономическую 
деятельность, 
создание 
свободных 
экономических зон, осуществляет управление финансово-бюджетной системы, 
определяет основы оплаты труда и ценообразование, налоговое управление, защиту 
своей территории и управление природными ресурсами. 

6. Территория Суверенной Республики Каракалпакстан является неделимой и цельной 
территорией Республики Каракалпакстан и его границы не подлежат изменению без 
решения Верховного Совета и народа Республики Каракалпакстан. Территория 
Республики Каракалпакстан, его природные богатства, богатства ее недр и подземные 
ископаемые, растения, животный мир, созданное на территории Каракалпакстан 
народно хозяйственная инфраструктура, культурные и исторические наследия, научно 
технический и культурный потенциал является исключительной собственностью 
Республики Каракалпакстан и основой его Суверенитета.  

7. Выход Республики Каракалпакстан из состава СССР и Узбекской ССР является 
исключительным правом Республики Каракалпакстан. 

8. Граждане Республики Каракалпакстан, ранее являвшиеся гражданами СССР и 
Узбекской ССР, теперь являются гражданами Республики Каракалпакстан. 

9. Республика Каракалпакстан имеет свой герб, флаг и гимн. 

10. На территории Республики Каракалпакстан Каракалпакский язык является 
Государственным языком. Все нации и народности компактно проживающие на 
территории Республики Каракалпакстан имеют возможность изучать свой родной язык 
и изучать русский язык как язык межнационального общения. 

11. Эта Декларация Независимости, определяющая суверенитет Республики 
Каракалпакстан, является основой новой Конституции Республики Каракалпакстан и 
предопределяющей основой развития законов Республики Каракалпакстан. 

12. До принятия новой Конституции Суверенной Республики Каракалпакстан и законов 
Республики Каракалпакстан, все действующие законы и нормативные акты остаются в 
силе. 

Декларация Независимости Республики Каракалпакстан был принят на 4 сессии 
Верховного Совета Республики Каракалпакстан 14 декабря 1990 года. Подлисали 186 
депутатов Парламента Республики Каракалпакстан. 

Отделение от Узбекской ССР и декларация переданы Верховному Совету Узбекской ССР и Верховному Совету СССР.  
Разработан в ноябре - декабре 1990 года, ратифицирован 14 декабря 1990 года, в 
г.Нукус Республики Каракалпакстан.`,

    EN: `
DECLARATION
On State Sovereignty of the Republic of Karakalpakstan

The Supreme Council of the Karakalpak Autonomous Soviet Socialist Republic:
Feeling a historical responsibility for the fate of the multinational people of Karakalpakstan, 
freely expressing this responsibility, respecting the sovereign rights of all nations and peoples 
of the USSR, and based on the inalienable right of every people to self-determination, 
appealing to the Supreme Council of the Uzbek SSR to review previously adopted acts 
concerning the Karakalpak ASSR that contradict the constitutions of the USSR, the Uzbek 
SSR, and the Karakalpak ASSR, concerned about the political, economic, social, and spiritual 
development of the peoples, and the resolution of environmental problems caused by the 
drying up of the Aral Sea, and taking into account the extremely low standard of living of the 
citizens of the autonomous republic, living in the very center of an environmental disaster, 
Karakalpakstan declares state sovereignty as a federal subject of the USSR and transforms it 
into the Sovereign Republic of Karakalpakstan.  
Relations between the Republic of Karakalpakstan, the USSR, and the Uzbek SSR are based 
on treaties and agreements. 

1. The Republic of Karakalpakstan takes under its legal control all the treaties and 
agreements that the Soviet Republic. The Republic of Karakalpakstan has concluded with the 
USSR and the Uzbek Socialist Republic and delegates all its powers to itself. Builds the 
necessary structure of State administration at all administrative levels on its territory, the 
Republic of Karakalpakstan hereinafter referred to as the Republic builds all its 
administrative districts, creates the necessary administrative divisions and state 
administration bodies, such as the judicial, arbitration and prosecutorial supervision and 
others are carried out exclusively independently. 

2. The Republic of Karakalpakstan conducts public administration, enacts laws and decrees, 
and appoints judicial bodies that oversee the implementation of the adopted legislation.  
The Supreme Council of the Republic of Karakalpakstan is the supreme body of state 
administration, which makes the necessary laws, manages and supervises the implementation 
of the adopted laws.  
The Council of Ministers of the Republic of Karakalpakstan is the supreme executive body 
and governing body.  
The Supreme Court of the Republic of Karakalpakstan is the Highest Court.  
The Supreme Council of the Republic of Karakalpakstan appoints the Prosecutor General to 
oversee the implementation of the law, the rule of law and the equal rights of all before the 
law. 

3. The multinational people of the Republic of Karakalpakstan shall determine and constitute 
a State on their sovereign territory.  
The people, relying on the Constitution and laws, directly and unambiguously through the 
elected deputies, exercise State administration. The Government of the Republic of 
Karakalpakstan authorized by the government to strengthen the friendship of peoples.  
The State provides all its citizens residing in the territory of the Republic of Karakalpakstan 
with equal rights and freedoms, regardless of their political views, religious beliefs and other 
differences. 

4. On the territory of Karakalpakstan, in matters falling within its own competence, the supremacy of the Constitution and laws of the Republic of Karakalpakstan is established.
If the authorities of the USSR or the Uzbek SSR exceed their powers and violate the rights of the Republic of Karakalpakstan, the Republic has the right to suspend the application of the laws of the USSR and the Uzbek SSR, as well as other acts and agreements of their bodies, and to express its objection to them. 

5. The Republic of Karakalpakstan shall protect the Constitutional Rights of its citizens, the 
protection of their freedoms and protect their the right to work, protection of their property 
and defines the measures for the implementation of protection, organizes public life, carries 
out socio-cultural and economic development, provides externally economic activity, the 
creation of free economic zones, manages financial budget the system determines the basis of 
wage and pricing, tax administration, protection of its territory and management of natural 
resources. 

6. The territory of the Sovereign Republic of Karakalpakstan is an indivisible and integral 
territory of the Republic Karakalpakstan and its borders are not subject to change without the 
decision of the Supreme Council and the people of the Republic Karakalpakstan The territory 
of the Republic of Karakalpakstan, its natural resources, the riches of its subsoil and 
underground fossils, plants, wildlife, the national economic infrastructure created on the 
territory of Karakalpakstan, cultural and historical heritage, scientific, technical and cultural 
potential is the exclusive property of the Republic of Karakalpakstan. The Republic of 
Karakalpakstan and the basis of its Sovereignty. 

7. The separation of the Republic of Karakalpakstan from the USSR from the Uzbek SSR is 
the exclusive right of the Republic Karakalpakstan. 

8. Citizens of the Republic of Karakalpakstan who were citizens of the USSR and the Uzbek 
SSR are now citizens of the Republic of Karakalpakstan. 

9. The Republic of Karakalpakstan has its own coat of arms, flag and anthem. 

10. On the territory of the Republic of Karakalpakstan, the Karakalpak language is the State 
language. All nations and nationalities living compactly on the territory of the Republic of 
Karakalpakstan have the opportunity to study their native language learn Russian as a 
language of interethnic communication. 

11. This Declaration of Independence, which defines the sovereignty of the Republic of 
Karakalpakstan, is the basis of the new The Constitution of the Republic of Karakalpakstan 
and the determining basis for the development of the laws of the Republic of Karakalpakstan. 

12. Until the adoption of the new Constitution of the Sovereign Republic of Karakalpakstan 
and the laws of the Republic of Karakalpakstan, all existing laws and regulations remain in 
force. 

The Declaration of Independence of the Republic of Karakalpakstan was adopted at the 4th 
session of the Supreme Council of the Republic Karakalpakstan December 14, 1990 Signed 
by 186 deputies of the Parliament of the Republic of Karakalpakstan The separation from the 
Uzbek SSR and the declaration were transferred to the Supreme Soviet of the Uzbek SSR and 
the Supreme Soviet of the USSR. 

Developed November-December 1990, ratified December 14, 1990, in Nukus, Republic of 
Karakalpakstan.`,

    PL: `
DEKLARACJA
O suwerenności państwowej Republiki Karakałpakstanu

Najwyższa Rada Karakalpakskiej Autonomicznej Socjalistycznej Republiki Radzieckiej: 
Czując historyczną odpowiedzialność za los wielonarodowego narodu Karakalpakstanu, 
swobodnie ją wyrażając, szanując suwerenne prawa wszystkich narodów ZSRR, opierając się 
na niezbywalnym prawie każdego narodu do samostanowienia, zwracając się do Najwyższej 
Rady Uzbeckiej SRR o ponowne rozpatrzenie wcześniej przyjętych aktów dotyczących 
Karakalpakskiej ASRR i sprzecznych z konstytucjami ZSRR, Uzbeckiej SRR i 
Karakalpakskiej ASRR, troszcząc się o polityczny, gospodarczy, społeczny i duchowy rozwój 
narodów, rozwiązanie problemów ekologicznych spowodowanych wysychaniem Morza 
Aralskiego, biorąc pod uwagę niezwykle niski poziom życia obywateli autonomicznej 
republiki żyjących w samym centrum katastrofy ekologicznej, Karakalpakstan ogłasza 
suwerenność państwową jako podmiot federacji ZSRR i przekształca ją w Suwerenną 
Republikę Karakalpakstanu.  
Relacje między Republiką Karakalpakstanu, ZSRR i Uzbecką SRR opierają się na traktatach 
i umowach. 

1. Republika Karakalpakstanu przejmuje pod swoją jurysdykcję wszystkie traktaty i umowy 
zawarte przez Radziecką Republikę Karakalpakstanu z ZSRR i Uzbecką SRR oraz deleguje 
wszystkie uprawnienia sobie. Buduje niezbędną strukturę administracji państwowej na 
wszystkich poziomach administracyjnych na swoim terytorium. Republika tworzy swoje 
okręgi administracyjne, ustanawia podziały gospodarczo-administracyjne oraz organy 
państwowe, takie jak sądy, arbitraż i nadzór prokuratorski, które działają wyłącznie 
niezależnie. 

2. Republika Karakalpakstanu prowadzi administrację państwową, uchwala ustawy i dekrety 
oraz powołuje organy sądowe sprawujące nadzór nad wykonaniem przyjętego 
ustawodawstwa.  
Najwyższa Rada Republiki Karakalpakstanu jest najwyższym organem administracji 
państwowej.  
Rada Ministrów Republiki Karakalpakstanu jest najwyższym organem wykonawczym i 
zarządzającym.  
Najwyższy Sąd Republiki Karakalpakstanu jest najwyższym organem sądowym.  
Najwyższa Rada powołuje Prokuratora Generalnego sprawującego nadzór nad 
przestrzeganiem prawa i równością obywateli wobec prawa. 

3. Wielonarodowy naród Republiki Karakalpakstanu określa i konstytuuje Państwo na swoim 
suwerennym terytorium.  
Naród, opierając się na Konstytucji i ustawach, bezpośrednio i jednoznacznie poprzez 
wybranych deputowanych sprawuje władzę państwową. Rząd Republiki Karakalpakstanu 
umacnia przyjaźń narodów.  
Państwo zapewnia wszystkim obywatelom równe prawa i wolności, niezależnie od poglądów 
politycznych, wyznania czy innych różnic. 

4. Na terytorium Karakałpakstanu, w sprawach należących do jego własnej kompetencji, ustanawia się nadrzędność Konstytucji i ustaw Republiki Karakałpakstanu.
Jeżeli organy władzy ZSRR lub Uzbeckiej SRR przekraczają swoje uprawnienia i naruszają prawa Republiki Karakałpakstanu, Republika ma prawo zawiesić stosowanie ustaw ZSRR i Uzbeckiej SRR, a także innych aktów i umów tych organów oraz wyrazić im swój sprzeciw.

5. Republika Karakalpakstanu chroni konstytucyjne prawa swoich obywateli, ich wolności, 
prawo do pracy, własności, organizuje życie społeczne, prowadzi rozwój 
społeczno-kulturalny i gospodarczy, działalność zagraniczną, tworzy wolne strefy 
ekonomiczne, zarządza systemem finansowo-budżetowym, określa podstawy wynagrodzeń i 
cen, prowadzi administrację podatkową, chroni swoje terytorium i zarządza zasobami 
naturalnymi. 

6. Terytorium Suwerennej Republiki Karakalpakstanu jest niepodzielne i integralne, a jego 
granice nie mogą być zmieniane bez decyzji Najwyższej Rady i narodu Republiki. Ziemia, 
bogactwa naturalne, zasoby podziemne, flora i fauna, infrastruktura gospodarcza, 
dziedzictwo kulturowe i historyczne, potencjał naukowy i techniczny są wyłączną własnością 
Republiki Karakalpakstanu i podstawą jej suwerenności. 

7. Wyjście Republiki Karakalpakstanu z ZSRR i Uzbeckiej SRR jest wyłącznym prawem 
Republiki Karakalpakstanu. 

8. Obywatele Republiki Karakalpakstanu, którzy wcześniej byli obywatelami ZSRR i 
Uzbeckiej SRR, stają się obywatelami Republiki Karakalpakstanu. 

9. Republika Karakalpakstanu posiada własny herb, flagę i hymn. 

10. Na terytorium Republiki Karakalpakstanu język karakalpacki jest językiem państwowym. 
Wszystkie narody i narodowości zamieszkujące terytorium mają możliwość nauki swojego 
języka ojczystego oraz języka rosyjskiego jako języka komunikacji międzyetnicznej.  

11. Niniejsza Deklaracja Niepodległości, określająca suwerenność Republiki  
Karakalpakstanu, stanowi podstawę nowej Konstytucji Republiki Karakalpakstanu i rozwoju 
jej ustawodawstwa. 

12. Do czasu przyjęcia nowej Konstytucji Suwerennej Republiki Karakalpakstanu i ustaw, 
wszystkie obowiązujące akty prawne pozostają w mocy. 

Deklaracja Niepodległości Republiki Karakalpakstanu została przyjęta na IV sesji 
Najwyższej Rady Republiki Karakalpakstanu dnia 14 grudnia 1990 roku w Nukusie. 
Podpisana przez 186 deputowanych.  
Decyzja o oddzieleniu się od Uzbeckiej SRR została przekazana Najwyższej Radzie Uzbeckiej 
SRR i Najwyższej Radzie ZSRR.  

Opracowana w listopadzie–grudniu 1990 roku, ratyfikowana 14 grudnia 1990 roku w 
Nukusie, Republice Karakalpakstanu.`};

  const t = translations[lang] || translations.RU;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black text-black dark:text-white">
      
      {/* HERO SECTION */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-8">
            <Landmark size={20} />
            <span className="font-medium">{t.title}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            {t.subtitle}
          </h1>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          
          {/* FULL TEXT BLOCK */}
          <div className="relative mb-12">
            <div className="bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 p-1 rounded-3xl">
              <div className="bg-white dark:bg-gray-900 rounded-[22px] p-8 md:p-12">
                
                {/* HEADER */}
                <div className="flex items-center gap-6 mb-8">
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <FileText className="text-white" size={28} />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {t.fullTextTitle}
                  </h2>
                </div>

                {/* TOGGLE BUTTON */}
                <button
                  onClick={() => setShowFullText(!showFullText)}
                  className="w-full mb-6 px-6 py-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold flex items-center justify-between hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                >
                  <span className="text-lg">{showFullText ? t.hideText : t.showText}</span>
                  {showFullText ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                </button>

                {/* FULL TEXT (when expanded) */}
                {showFullText && (
                  <div className="mb-8 p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-800 max-h-[600px] overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-base leading-relaxed text-gray-800 dark:text-gray-200 font-sans">
                      {declarationText[lang]}
                    </pre>
                  </div>
                )}

                {/* PDF DOWNLOAD BUTTONS */}
                <div className="space-y-4">
                  <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 text-center mb-4">
                    📥 {t.pdfLanguages}
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <a
                      href={pdfLinks.KK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white font-semibold hover:scale-105 transition-transform shadow-lg"
                    >
                      <Download size={24} />
                      <span>Қарақалпақша</span>
                    </a>

                    <a
                      href={pdfLinks.RU}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white font-semibold hover:scale-105 transition-transform shadow-lg"
                    >
                      <Download size={24} />
                      <span>Русский</span>
                    </a>

                    <a
                      href={pdfLinks.EN}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 text-white font-semibold hover:scale-105 transition-transform shadow-lg"
                    >
                      <Download size={24} />
                      <span>English</span>
                    </a>

                    <a
                      href={pdfLinks.PL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 text-white font-semibold hover:scale-105 transition-transform shadow-lg"
                    >
                      <Download size={24} />
                      <span>Polski</span>
                    </a>
                  </div>

                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-4">
                    {lang === 'KK' && '📄 Ресмий архивлик ҳүжжет - 14 декабрь 1990'}
                    {lang === 'RU' && '📄 Официальный архивный документ - 14 декабря 1990'}
                    {lang === 'EN' && '📄 Official archival document - December 14, 1990'}
                    {lang === 'PL' && '📄 Oficjalny dokument archiwalny - 14 grudnia 1990'}
                  </p>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}