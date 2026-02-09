import React, { useState, useEffect } from 'react';
import { Share2, Send, Facebook, Link as LinkIcon, Twitter, Youtube, Instagram, Target, Users, MapPin } from 'lucide-react';

const About = () => {
  const [lang, setLang] = useState("RU"); 
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("karakalpak-voice-theme") === "dark");
  
  useEffect(() => {
    // Бет ашылғанда жоқарыға шығарыў
    window.scrollTo(0, 0);

    const handleLangChange = (e) => {
      if (e.detail && e.detail.lang) {
        let newLang = e.detail.lang.toUpperCase();
        if (newLang === 'KAA') newLang = 'KK';
        setLang(newLang);
      }
    };

    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setIsDarkMode(isDark);
    });

    window.addEventListener("languageChange", handleLangChange);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    
    if (document.documentElement.classList.contains("dark")) setIsDarkMode(true);

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
    KK: {
      introTitle: "Қарақалпақстан халқының еркин даўысы, тарийхы ҳәм келешеги",
      greeting: "Әссаламу әлейкум, қәдирли оқыўшы!",
      introText: "«Karakalpak Voice» — бул тек-ғана сайт емес. Бул — Қарақалпақ халқының ерки, даўысы, тарийхы ҳәм келешеги ушын жаратылған халықаралық медиа минбер. Бүгинги күнде интернет кеңислигинде Қарақалпақстан ҳаққында жалған мағлыўматлар, манипуляция, бурмаланған тарийх ҳәм сиясий пропаганда көбейген бир дәўирде, биз хақыйқатты айтыўды өзимизге парыз деп билемиз.",
      reasonsTitle: "Бул платформа төмендеги себеплерден туўылды:",
      reasons: [
        "Қарақалпақ халқының тарийхы, тили, мәденияты ҳәм дәстүрлерине болған шеклеўлерди ашық көрсетиў ушын;",
        "Республика ҳуқықларының аяқ-асты болыўы ҳәм халықтың өз еркин билдире алмай атырған ҳалықара жағдайын дүньяға жеткериў ушын;",
        "Саны аз халықлар қатарына киретуғын Қарақалпақ халқының жойылып кетиў қәўпин тоқтатыў ушын;",
        "Арал теңизиниң қолдан жасалған қурыўы себепли пайда болған экология апатының ҳақыйқатын дүньяға танытыў ушын;",
        "Жер, суў, қазылма байлықлар, өсимлик ҳәм ҳайўанат дүньясының талан-тараж болыўына көз жумбай, оны фактлер менен көрсетиў ушын;",
        "Қоңсы еллердиң сиясий қуўдалаўы кесиринен үнсиз қалған халықтың даўысын халықаралық жәмийетшиликке жеткериў ушын."
      ],
      newChapter: "Бүгин — Қарақалпақстан тарийхында жаңа бет ашылған күн. Сиз қарап турған «Karakalpak Voice» — бул бийғәрез, еркин, халықаралық платформа. Биз Варшавадан (Польша) ҳәм Нөкистен (Қарақалпақстан) турып, дүньяға үндеў саламыз. Бизиң даўысымыз — бир, махсетимиз — айқын.",
      
      goalsTitle: "Бизиң махсетимиз",
      goals: [
        { title: "Халықтың Үни болыў", desc: "Биз қарапайым халықтың мүддесин қорғаймыз. Айтылмай келген, жасырып келинген мәселелерди ашық, дәлеллер менен, цензурасыз сәўлелендиремиз. Халықтың даўысы — бизиң ең уллы күшимиз." },
        { title: "Тарийхты тиклеў ҳәм сақлаў", desc: "Бизиң бай тарийхымыз, «Суверенитет ҳаққында Декларация», Конституция, уллы тулғалар, мәдений мийрас — булардың барлығы санлы форматта сақланыўы ҳәм келешек урпаққа аман-есен жеткериўи биз ушын қәсийетли мандат." },
        { title: "Көпир болыў", desc: "Қарақалпақстанды Европа ҳәм дүнья жәмийетшилиги менен байланыстырыў — бизиң стратегиялық махсетимиз. Биз халықаралық уйымлар, журналистлер, экологлар, ҳуқық қорғаў институтлары менен байланыс орнатамыз." },
        { title: "Цензурасыз жаңалықлар тарқатыў", desc: "Биз тек тексерилген фактлерди жәриялаймыз. Жалған хабар, манипуляция, пропаганда менен гүресемиз." },
        { title: "Тил, мәденият ҳәм мийрасты сақлаў", desc: "Қарақалпақ тили — халқымыздың жаны. Биз оны сақлаўға, раўажландырыға, мәртебесин көтериўге үлес қосамыз." }
      ],

      langTitle: "Не ушын 4 тилде?",
      langDesc: "Биз өз сөзимизди тек өзимизге емес, пүткил әлемге жеткериўди махсет еттик:",
      langList: [
        "Қарақалпақ тили — Ана тилимизниң мәртебесин көтериў, өзимизди өзимизге танытыў ушын.",
        "Рус тили — Постсоветлик кеңисликке, аймақлық экспертлер ҳәм қоңсылас еллерге фактлерди жеткериў ушын.",
        "Англичан тили — Халықаралық уйымлар, дипломатлар, инвесторлар ҳәм глобал аудитория ушын.",
        "Поляк тили — Европа Орайындағы (әсиресе Варшавадағы) досларымыз ҳәм шериклеслеримиз ушын."
      ],
      langFooter: "Тил — көпир. Биз сол көпирлерди қурамыз.",

      futureTitle: "Келешекте сизди не күтеди?",
      futureList: [
        "Сиясат емес, шынлықты көресиз;",
        "Арал теңизи ҳәм экология мәселелери бойынша илимий, дәлелли материаллар оқыйсыз;",
        "Мәденият, әдебият, музыка, туризм, жаслар жетискенликлери ҳаққында жаңа контентлер табасыз;",
        "Қарақалпақстан ҳаққындағы халықаралық реакциялар, аналитика, эксперт пикирлер менен танысасыз;",
        "«Жалған мәлимет» (Fake news) пенен гүресетуғын тексерилген (фактчекинг) материалларын көресиз."
      ],
      futureFooter: "Бизиң махсет — тек жаңалық тарқатыў емес. Бизиң махсет — халықтың даўысын күшейтиў, хақыйқатты дүньяға жеткериў, келешек ушын жуўапкерлик алыў.",
      finalQuote: "«Халықтың ерки — уллы күш. Биз сол күштиң айнасымыз.»",
      cta: "Биз бенен бирге болың. Пикир қалдырың. Бөлисиң. Бул — СИЗИҢ ДАЎЫСЫҢЫЗ.",

      shareTitle: 'Бөлисиў'
    },
    RU: {
      introTitle: "Международная платформа о свободном голосе, истории и будущем Каракалпакстана",
      greeting: "Здравствуйте, уважаемый читатель!",
      introText: "\"Karakalpak Voice\" - это не просто сайт. Это международная медиа-платформа, созданная для свободы, голоса, истории и будущего каракалпакского народа. Сегодня, когда в интернет-пространстве распространяются ложная информация о Каракалпакстане, манипуляции, искаженная история и политическая пропаганда, мы считаем своим долгом говорить правду.",
      reasonsTitle: "Эта платформа возникла по следующим причинам:",
      reasons: [
        "Для демонстрации ограничений на историю, язык, культуру и традиции каракалпакского народа;",
        "Для того, чтобы донести до всего мира о нарушении прав республики и международном положении, когда население не может выразить свою волю;",
        "Для предотвращения угрозы исчезновения малочисленного каракалпакского народа;",
        "Чтобы продемонстрировать миру реальность экологической катастрофы, вызванной искусственным высыханием Аральского моря;",
        "Для того, чтобы не закрывать глаза на разграбление земли, воды, полезных ископаемых, растительного и животного мира и показать это фактами;",
        "Для донесения до международного сообщества голоса людей, замолчавших из-за политических преследований соседних стран."
      ],
      newChapter: "Сегодня - день, когда в истории Каракалпакстана открылась новая страница. \"Karakalpak Voice\" - это независимая, свободная, международная платформа. Мы обращаемся к миру из Варшавы (Польша) и Нукуса (Каракалпакстан). Наш голос един, наша цель ясна.",
      
      goalsTitle: "Наша цель",
      goals: [
        { title: "Быть голосом народа", desc: "Мы защищаем интересы простого народа. Мы раскрываем невысказанные и скрытые вопросы открыто, с доказательствами, без цензуры. Голос народа - наша величайшая сила." },
        { title: "Восстановление и сохранение истории", desc: "Наша богатая история, Декларация о суверенитете, Конституция, выдающиеся личности, культурное наследие - все это хранится в цифровом формате и благополучно передается будущим поколениям, что является для нас священным мандатом." },
        { title: "Быть мостом", desc: "Связать Каракалпакстан с европейским и мировым сообществом - наша стратегическая цель. Мы налаживаем связи с международными организациями, журналистами, экологами и правоохранительными органами." },
        { title: "Распространение нецензурных новостей", desc: "Мы публикуем только проверенные факты. Мы будем бороться с ложной информацией, манипуляциями и пропагандой." },
        { title: "Сохранение языка, культуры и наследия", desc: "Каракалпакский язык - душа нашего народа. Мы вносим свой вклад в его сохранение, развитие и повышение статуса." }
      ],

      langTitle: "Почему на 4 языках?",
      langDesc: "Мы стремимся донести наши слова не только до себя, но и до всего мира.",
      langList: [
        "Каракалпакский - для повышения статуса нашего родного языка и самореализации.",
        "Русский - для донесения фактов до постсоветского пространства, региональных экспертов и соседних стран.",
        "Английский - для международных организаций, дипломатов, инвесторов и глобальной аудитории.",
        "Польша - для наших друзей и партнеров в Центральной Европе (особенно в Варшаве)."
      ],
      langFooter: "Язык - мост. Мы построим эти мосты.",

      futureTitle: "Что ждёт вас в будущем?",
      futureList: [
        "Вы увидите правду, а не политику.",
        "Вы будете читать научно обоснованные материалы по проблемам Аральского моря и экологии.",
        "Вы найдете новый контент о культуре, литературе, музыке, туризме и достижениях молодежи.",
        "Вы познакомитесь с международными реакциями, аналитикой и критическими мнениями о Каракалпакстане.",
        "Вы увидите фактчекинговые материалы, борющиеся с \"фейковыми новостями.\""
      ],
      futureFooter: "Наша цель - не только распространять новости. Наша цель - повысить голос народа, донести правду до мира и взять на себя ответственность за будущее.",
      finalQuote: "\"Свобода народа - великая сила. Мы - зеркало этой силы.\"",
      cta: "Оставайтесь с нами. Оставьте комментарий. Поделитесь. Это ваш голос.",

      shareTitle: 'Поделиться'
    },
    EN: {
      introTitle: "International media platform dedicated to the free voice, history, and future of the people of Karakalpakstan",
      greeting: "Greetings, dear reader!",
      introText: "\"Karakalpak Voice\" is not just a website. This is an international media platform created for the freedom, voice, history, and future of the Karakalpak people. At a time when false information, manipulation, distorted history, and political propaganda about Karakalpakstan are prevalent on the internet, we consider it our duty to tell the truth.",
      reasonsTitle: "This platform was created for the following reasons:",
      reasons: [
        "To openly demonstrate the limitations on the history, language, culture, and traditions of the Karakalpak people;",
        "To reveal to the world the international situation where the Republic's rights are being violated and the people are unable to express their will;",
        "To stop the threat of extinction of the Karakalpak people, who are among the minority peoples;",
        "To inform the world about the reality of the ecological disaster caused by the artificial desiccation of the Aral Sea;",
        "To demonstrate the plundering of land, water, mineral resources, flora, and fauna with facts, without turning a blind eye;",
        "To convey the voice of the people silenced by the political persecution of neighboring countries to the international community."
      ],
      newChapter: "Today marks a new chapter in the history of Karakalpakstan. The \"Karakalpak Voice\" you are watching is an independent, free, international platform. We are appealing to the world from Warsaw (Poland) and Nukus (Karakalpakstan). Our voice is one, our goal is clear.",
      
      goalsTitle: "Our Goal",
      goals: [
        { title: "To be the voice of the people", desc: "We protect the interests of the common people. We will openly, with evidence, and without censorship, address unspoken and hidden issues. The voice of the people is our greatest strength." },
        { title: "Restoration and preservation of history", desc: "Our rich history, the Declaration of Sovereignty, the Constitution, great personalities, cultural heritage - all of this must be preserved in digital format and safely passed on to future generations - this is a sacred mandate for us." },
        { title: "To become a bridge", desc: "Connecting Karakalpakstan with the European and global community is our strategic goal. We are establishing connections with international organizations, journalists, environmentalists, and human rights institutions." },
        { title: "Distribution of uncensored news", desc: "We will only publish verified facts. We will fight against false information, manipulation, and propaganda." },
        { title: "Preservation of language, culture, and heritage", desc: "The Karakalpak language is the soul of our people. We will contribute to its preservation, development, and enhancement." }
      ],

      langTitle: "Why in 4 languages?",
      langDesc: "We aim to convey our message not only to ourselves but to the whole world.",
      langList: [
        "Karakalpak - To elevate the status of our mother tongue and make ourselves known.",
        "Russian - for conveying facts to the post-Soviet space, regional experts, and neighboring countries.",
        "English - For international organizations, diplomats, investors, and the global audience.",
        "Polish - for our friends and partners in the European center (especially in Warsaw)."
      ],
      langFooter: "Language is a bridge. We will build these bridges.",

      futureTitle: "What awaits you in the future?",
      futureList: [
        "You will see the truth, not politics.",
        "You will read scientifically based materials on the problems of the Aral Sea and ecology.",
        "You will find new content about culture, literature, music, tourism, and youth achievements.",
        "You will get acquainted with international reactions, analysis and critical opinions about Karakalpakstan.",
        "You will see fact-checking materials that combat \"fake news.\""
      ],
      futureFooter: "Our goal is not only to spread the news. Our goal is to raise the voice of the people, bring the truth to the world and take responsibility for the future.",
      finalQuote: "\"The freedom of the people is a great force. We are a mirror of this power.\"",
      cta: "Stay tuned. Leave a comment. Share it. It's your voice.",

      shareTitle: 'Share'
    },
    PL: {
      introTitle: "Uruchomiono międzynarodową platformę medialną o wolnym głosie, historii i przyszłości mieszkańców Karakalpakstanu",
      greeting: "Witaj, drogi czytelniku!",
      introText: "\"Karakalpak Voice\"to nie tylko strona internetowa. Jest to międzynarodowa platforma medialna stworzona dla wolności, głosu, historii i przyszłości ludu Karakalpak. Dziś, gdy w przestrzeni internetowej krążą fałszywe informacje o Karakalpakstanie, manipulacje, zniekształcona historia i propaganda polityczna, uważamy, że naszym obowiązkiem jest mówić prawdę.",
      reasonsTitle: "Platforma ta powstała z następujących powodów:",
      reasons: [
        "Aby zademonstrować ograniczenia dotyczące historii, języka, kultury i tradycji ludu Karakalpak;",
        "Aby przekazać światu naruszenie praw Republiki i sytuacji międzynarodowej, w której ludność nie może wyrazić swojej woli;",
        "Aby zapobiec zagrożeniu wyginięciem Mniejszości karakałpackiej;",
        "Aby pokazać światu rzeczywistość katastrofy ekologicznej spowodowanej sztucznym wysychaniem Morza Aralskiego;",
        "Aby nie przymykać oczu na grabież ziemi, wody, minerałów, świata roślin i zwierząt oraz pokazać to faktami;",
        "Aby przekazać społeczności międzynarodowej głosy osób, które zamilkły z powodu prześladowań politycznych sąsiednich krajów."
      ],
      newChapter: "Dzisiaj jest dzień, w którym w historii Karakalpakstanu otwarto nową stronę. \"Karakalpak Voice,\" na który patrzysz, to niezależna, bezpłatna, międzynarodowa platforma. Zwracamy się do świata z Warszawy (Polska) i Nukusa (Karakalpakstan). Nasz głos jest jeden, nasz cel jest jasny.",
      
      goalsTitle: "Nasz cel",
      goals: [
        { title: "Być głosem ludu", desc: "Chronimy interesy zwykłych ludzi. Ujawniamy niewypowiedziane i ukryte pytania otwarcie, z dowodami, bez cenzury. Głos ludu jest naszą największą siłą." },
        { title: "Przywracanie i zapisywanie historii", desc: "Nasza bogata historia, Deklaracja suwerenności, Konstytucja, wybitne osobistości, dziedzictwo kulturowe są przechowywane cyfrowo i bezpiecznie przekazywane przyszłym pokoleniom, co jest dla nas świętym mandatem." },
        { title: "Być mostem", desc: "Połączenie Karakalpakstanu ze społecznością Europejską i światową jest naszym strategicznym celem. Nawiązujemy kontakty z organizacjami międzynarodowymi, dziennikarzami, ekologami i organami ścigania." },
        { title: "Rozpowszechnianie niecenzuralnych wiadomości", desc: "Publikujemy tylko sprawdzone fakty. Będziemy walczyć z fałszywymi informacjami, manipulacjami i propagandą." },
        { title: "Zachowanie języka, kultury i Dziedzictwa", desc: "Język Karakalpak jest duszą naszego narodu. Przyczyniamy się do jego zachowania, rozwoju i podniesienia statusu." }
      ],

      langTitle: "Dlaczego w 4 językach?",
      langDesc: "Staramy się przekazywać nasze słowa nie tylko sobie, ale i całemu światu.",
      langList: [
        "Karakałpacki - w celu poprawy stanu naszego języka ojczystego i samorealizacji.",
        "Rosyjski - do dotarcia do faktów do przestrzeni postradzieckiej, regionalnych ekspertów i krajów sąsiednich.",
        "Angielski - dla organizacji międzynarodowych, dyplomatów, inwestorów i odbiorców na całym świecie.",
        "Polski - dla naszych przyjaciół i partnerów w Europie (szczególnie w Warszawie)."
      ],
      langFooter: "Język - most. Zbudujemy te mosty.",

      futureTitle: "Co cię czeka w przyszłości?",
      futureList: [
        "Zobaczysz prawdę, a nie politykę.",
        "Przeczytasz naukowo uzasadnione materiały na temat problemów Morza Aralskiego i ekologii.",
        "Znajdziesz nowe treści o kulturze, literaturze, muzyce, turystyce i osiągnięciach młodzieży.",
        "Poznasz międzynarodowe reakcje, analizy i krytyczne opinie na temat Karakalpakstanu.",
        "Zobaczysz materiały sprawdzające fakty walczące z \" fałszywymi wiadomościami.\""
      ],
      futureFooter: "Naszym celem jest nie tylko rozpowszechnianie wiadomości. Naszym celem jest podniesienie głosu ludzi, przekazanie prawdy światu i wzięcie odpowiedzialności za przyszłość.",
      finalQuote: "\"Wolność narodu jest wielką siłą. Jesteśmy zwierciadłem tej mocy.\"",
      cta: "Bądź na bieżąco. Zostaw komentarz. Podzielić się. To twój głos.",

      shareTitle: 'Udostępnij'
    }
  };

  const t = translations[lang] || translations["RU"];

  return (
    <div style={{ 
      backgroundColor: isDarkMode ? '#111827' : '#f9fafb', 
      color: isDarkMode ? '#f3f4f6' : '#111827', 
      minHeight: '100vh',
      padding: '100px 5% 60px',
      transition: 'background 0.3s ease, color 0.3s ease'
    }} className="md:py-32">
      <style>{`
        .intro-section { max-width: 1000px; margin: 0 auto; }
        .hero-title { 
          font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 900; line-height: 1.2;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 25px; text-align: center;
        }
        .section-title { font-size: 2rem; font-weight: 800; margin-bottom: 30px; border-left: 5px solid #3b82f6; padding-left: 20px; }
        .list-box {
          background: ${isDarkMode ? 'rgba(255,255,255,0.03)' : 'white'}; padding: 30px; border-radius: 20px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border: 1px solid ${isDarkMode ? '#374151' : '#e5e7eb'};
        }
        .list-item { display: flex; gap: 15px; margin-bottom: 15px; font-size: 1.1rem; line-height: 1.6; }
        .cards-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 25px; margin-top: 30px; }
        .card { padding: 30px; border-radius: 20px; color: white; background: linear-gradient(145deg, #1e293b, #0f172a); border: 1px solid #334155; transition: transform 0.3s ease; }
        .card:hover { transform: translateY(-5px); }
        .card h3 { font-size: 1.4rem; font-weight: 700; margin-bottom: 15px; color: #60a5fa; }
        .card p { font-size: 1rem; line-height: 1.6; opacity: 0.9; }
        .final-quote-box { text-align: center; padding: 60px 20px; background: linear-gradient(135deg, #2563eb, #4f46e5); border-radius: 30px; color: white; margin-top: 80px; margin-bottom: 60px; }
        .final-quote-text { font-size: clamp(1.5rem, 4vw, 2.5rem); font-weight: 800; font-style: italic; margin-bottom: 20px; }
      `}</style>

      {/* ✅ INTRO & MISSION SECTION (БИЗ ТУУРАЛЫ) */}
      <div className="intro-section">
        <h1 className="hero-title">{t.introTitle}</h1>
        <div style={{fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '20px', color: '#3b82f6', textAlign: 'center'}}>{t.greeting}</div>
        <p style={{fontSize: '1.25rem', lineHeight: '1.8', opacity: 0.9, marginBottom: '60px', textAlign: 'center'}}>{t.introText}</p>

        {/* Reasons List */}
        <div className="mb-16">
          <h2 className="section-title">{t.reasonsTitle}</h2>
          <div className="list-box">
            {t.reasons.map((item, index) => (
              <div key={index} className="list-item">
                <span style={{color: '#ef4444', fontWeight: 'bold'}}>•</span><span>{item}</span>
              </div>
            ))}
          </div>
          <p style={{fontSize: '1.3rem', marginTop: '30px', fontStyle: 'italic', textAlign: 'center', opacity: 0.8, color: '#3b82f6'}}>{t.newChapter}</p>
        </div>

        {/* Goals Cards */}
        <div className="mb-16">
          <h2 className="section-title">{t.goalsTitle}</h2>
          <div className="cards-grid">
            {t.goals.map((goal, index) => (
              <div key={index} className="card">
                <Target className="mb-4 text-blue-400" size={32} />
                <h3>{goal.title}</h3>
                <p>{goal.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div className="mb-16">
          <h2 className="section-title">{t.langTitle}</h2>
          <p style={{fontSize: '1.2rem', marginBottom: '20px'}}>{t.langDesc}</p>
          <div className="list-box">
            {t.langList.map((item, index) => (
              <div key={index} className="list-item"><span style={{color: '#10b981'}}>🌍</span><span>{item}</span></div>
            ))}
          </div>
          <p style={{textAlign: 'center', marginTop: '20px', fontWeight: 'bold', fontSize: '1.2rem', color: '#3b82f6'}}>{t.langFooter}</p>
        </div>

        {/* Future */}
        <div className="mb-16">
          <h2 className="section-title">{t.futureTitle}</h2>
          <div className="list-box">
            {t.futureList.map((item, index) => (
              <div key={index} className="list-item"><span style={{color: '#f59e0b'}}>⚡</span><span>{item}</span></div>
            ))}
          </div>
          <p style={{marginTop: '20px', fontSize: '1.1rem', opacity: 0.9}}>{t.futureFooter}</p>
        </div>

        {/* Final Quote */}
        <div className="final-quote-box">
          <div className="final-quote-text">{t.finalQuote}</div>
          <p style={{fontSize: '1.2rem', opacity: 0.9}}>{t.cta}</p>
        </div>
      </div>

      {/* ✅ SHARE (ТАРҚАТЫЎ) - Комментарийсіз */}
      <section className={`p-10 rounded-[40px] border text-center max-w-[900px] mx-auto mb-10 ${isDarkMode ? "bg-white/5 border-white/10" : "bg-gray-100 border-gray-200"}`}>
        <h3 className="text-2xl font-bold mb-8 italic">{t.shareTitle}</h3>
        <div className="flex flex-wrap justify-center gap-6">
          <a href="https://www.facebook.com/share/1FifdzG23b/" target="_blank" rel="noreferrer" className="p-4 bg-[#1877F2] text-white rounded-full hover:scale-110 transition shadow-lg"><Facebook size={24} /></a>
          <a href="https://t.me/kkvoice_org" target="_blank" rel="noreferrer" className="p-4 bg-[#0088cc] text-white rounded-full hover:scale-110 transition shadow-lg"><Send size={24} /></a>
          <a href="https://x.com/Karakalpak45997" target="_blank" rel="noreferrer" className="p-4 bg-black text-white rounded-full border border-white/20 hover:scale-110 transition shadow-lg"><Twitter size={24} /></a>
          <a href="https://www.instagram.com/karakalpakvoice_org/" target="_blank" rel="noreferrer" className="p-4 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white rounded-full hover:scale-110 transition shadow-lg"><Instagram size={24} /></a>
          <a href="https://youtube.com/@karakalpakvoice_org" target="_blank" rel="noreferrer" className="p-4 bg-[#FF0000] text-white rounded-full hover:scale-110 transition shadow-lg"><Youtube size={24} /></a>
          <button onClick={copyToClipboard} className="p-4 bg-gray-700 text-white rounded-full hover:scale-110 transition shadow-lg flex items-center gap-2 px-6"><LinkIcon size={20} /></button>
        </div>
      </section>

    </div>
  );
};

export default About;