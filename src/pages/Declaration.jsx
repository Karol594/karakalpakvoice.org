import React, { useState, useEffect } from "react";

/* ═══════════════════════════════════════════════════════════════
   HOOK — экран өлшеми
═══════════════════════════════════════════════════════════════ */
function useScreenSize() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return { isMobile: w < 640, isTablet: w < 1024 };
}

/* ═══════════════════════════════════════════════════════════════
   CSS + GOOGLE FONTS
═══════════════════════════════════════════════════════════════ */
function injectStyles() {
  if (!document.getElementById("decl-gfonts")) {
    const link = document.createElement("link");
    link.id = "decl-gfonts";
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,600&display=swap";
    document.head.appendChild(link);
  }
  if (document.getElementById("decl-css")) return;
  const s = document.createElement("style");
  s.id = "decl-css";
  s.textContent = `
    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    .gold-shimmer {
      background: linear-gradient(90deg,#8b6914 0%,#f5c842 28%,#d4a017 50%,#f5c842 72%,#8b6914 100%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmer 4.5s linear infinite;
    }
    @keyframes fadeUp {
      from { opacity:0; transform:translateY(22px); }
      to   { opacity:1; transform:translateY(0); }
    }
    .fu { animation: fadeUp 0.65s ease both; }
    .decl-scroll::-webkit-scrollbar { width:5px; }
    .decl-scroll::-webkit-scrollbar-track { background:rgba(255,255,255,.02); }
    .decl-scroll::-webkit-scrollbar-thumb { background:rgba(180,130,0,.32); border-radius:3px; }
    .decl-btn { transition: background .25s, border-color .25s; }
    .decl-btn:hover { background:rgba(180,130,0,.12)!important; border-color:rgba(180,130,0,.45)!important; }
    .book-wrap { transition: all 0.5s cubic-bezier(.25,.46,.45,.94); }
    .ext-link { transition: color .2s, border-color .2s; }
    .ext-link:hover { color:#1d4ed8!important; border-color:rgba(180,130,0,.5)!important; }
    @media (max-width:639px) {
      .hero-pad   { padding-top:88px!important; padding-bottom:50px!important; }
      .section-px { padding-left:16px!important; padding-right:16px!important; }
      .text-inner { padding:20px 16px!important; }
    }
  `;
  document.head.appendChild(s);
}

/* ═══════════════════════════════════════════════════════════════
   ТЕМА ТҮСЛЕРИ
═══════════════════════════════════════════════════════════════ */
function getC(theme) {
  const dark = theme !== "light";
  return {
    bg:       dark ? "#080c14"                   : "#f5f0e8",
    bg2:      dark ? "#0d1117"                   : "#ede8d5",
    bgCard:   dark ? "rgba(255,255,255,.015)"    : "rgba(0,0,0,.03)",
    text:     dark ? "#ffffff"                   : "#1e293b",
    muted:    dark ? "#9ca3af"                   : "#64748b",
    sub:      dark ? "#6b7280"                   : "#94a3b8",
    border:   dark ? "rgba(255,255,255,.07)"     : "rgba(0,0,0,.09)",
    gold:     dark ? "#c9930a"                   : "#8b6914",
    goldBrd:  dark ? "rgba(180,130,0,.28)"       : "rgba(120,80,0,.22)",
    goldBg:   dark ? "rgba(180,130,0,.07)"       : "rgba(120,80,0,.05)",
    law:      dark ? "rgba(16,185,129,.06)"      : "rgba(5,150,105,.06)",
    lawBrd:   dark ? "rgba(16,185,129,.22)"      : "rgba(5,150,105,.22)",
    lawText:  dark ? "#10b981"                   : "#047857",
    artBdr:   dark ? "rgba(180,130,0,.30)"       : "rgba(120,80,0,.25)",
    artNum:   dark ? "#c9930a"                   : "#8b6914",
    artTxt:   dark ? "#d1d5db"                   : "#374151",
    preambTxt:dark ? "#9ca3af"                   : "#64748b",
    linkTxt:  dark ? "#c9930a"                   : "#8b6914",
    sectionH: dark ? "#e5e7eb"                   : "#1e293b",
    sectionT: dark ? "#d1d5db"                   : "#374151",
    noteTxt:  dark ? "#9ca3af"                   : "#6b7280",
    chipBg:   dark ? "rgba(180,130,0,.08)"       : "rgba(120,80,0,.06)",
    chipBrd:  dark ? "rgba(180,130,0,.22)"       : "rgba(120,80,0,.18)",
  };
}

/* ═══════════════════════════════════════════════════════════════
   ШРИФТЛЕР
═══════════════════════════════════════════════════════════════ */
const CIN = "'Cinzel', Georgia, 'Times New Roman', serif";
const PLF = "'Playfair Display', Georgia, 'Times New Roman', serif";

/* ═══════════════════════════════════════════════════════════════
   PDF ЖОЛЛАРЫ (public/ қалтасынан)
═══════════════════════════════════════════════════════════════ */
const PDF = {
  KK: "/documents/declaration/1990/—kk/declaration_kk.pdf",
  RU: "/documents/declaration/1990/—ru/declaration_ru.pdf",
  EN: "/documents/declaration/1990/—en/declaration_en.pdf",
  PL: "/documents/declaration/1990/—pl/declaration_pl.pdf",
};

/* ═══════════════════════════════════════════════════════════════
   МАКАЛА ДЕРЕКЛЕРИ — 4 тил
═══════════════════════════════════════════════════════════════ */
const ARTICLE = {
  KK: {
    title: "Қарақалпақстанның Суверен Мәртебеси: Юридикалық Легитимлик ҳәм Институционаллық үзилис (1990-1993)",
    intro: "Бүгинги күнде халықаралық бирге ислесиў, соның ишинде БМШ ҳәм ОБСЕ структуралары ушын ең әҳмийетли сораў:\nӨзбекстан Республикасы Конституциясында Қарақалпақстан не ушын «Суверен Республика» деп аталған?\nБул терминниң «Суверен» сөзиниң сиясий ҳәм ҳуқуқый тийкары қандай ҳүжжетлерге сүйенеди?",
    sovereignLink: { text: "Толық мағлыўматты «Суверенитет» бөлиминде оқың", url: "https://karakalpakvoice.org/sovereignty" },
    answer: "Бул сораўға жуўап Қарақалпақстан халқының өзиниң сиясий еркин, тарийхый ядын ҳәм ҳуқықый дәстүрлерин сақлап қалыўға умтылыўында жатыр.",
    sections: [
      {
        heading: "Суверенитет Декларациясы (1990): Мәмлекеттиң Қайта Тиклениўи",
        body: "Қарақалпақстан Республикасы 1990-жыл 14-декабрь күни «Мәмлекетлик суверенитет ҳаққында Декларация» ҳүжжетин қабыл етти ҳәм оны мәмлекетлик газеталарда бир неше тилде жәриялады. Бул тарийхый ҳүжжет Қарақалпақстанның өз аймағында ҳәкимиятты өзи қәлиплестириў, сиясий статусын өзи белгилеў ҳәм өз келешегине байланыслы әҳимийетли қарарларды өзи қабыл етиўи ҳаққындағы билдириў еди.",
        note: "Бул — халықаралық ҳуқық нормаларына (ICCPR) сай, халықтың өз тәғдирин өзи белгилеў ҳуқықының юридикалық акты. Бул декларация қабыл етилгеннен кейин, Қарақалпақстан Республикасы бурынғы 1978-жылғы автономиялы республика дәўириниң Конституциясы менен енди толық мүнәсибетте өз сиясатын жүргизиўи мүмкин болмады. Себеби жаңа тарийхый шәраятта Қарақалпақстан өзин тек ғана автономиялы аймақ емес, ал суверен сиясий субъект сыпатында көрсетти. Бул қағыйда Қарақалпақстанның кейинги ҳуқықый системасына, миллий институтларына ҳәм конституциялық статусының қәлиплесиўине тийкар болды.",
        links: [
          { text: "Қарақалпақстан Республикасының сырлы ўақыясы", url: "https://fpc.org.uk/the-curious-case-of-the-republic-of-karakalpakstan/" },
          { text: "Қарақалпақстанның автономиялық статусын анықлаў", url: "https://www.world-autonomies.info/territorial-autonomies/karakalpakstan" },
        ],
      },
      {
        heading: "Үш Тәреплеме Келисим (1991): Ресмий Тән Алыў",
        body: "Қарақалпақстанның суверен мәртебеси тек ишки ҳүжжет емес, ал айырым дереклерде Москва ҳәм Ташкент тәрепинен тән алыў белгилери сыпатында тәрийипленеди. 1991-жыл январь айынан баслап Дәўлетбай Шамшетов Қарақалпақстан Республикасы Жоқарғы Кеңесиниң баслығы етип сайланды. Қарақалпақстан өзиниң суверен Конституциясын қабыл етти ҳәм 1991-жыл май айында Қарақалпақстанның жаңа басқыштағы статусын, яғный суверен статусын нызамлы түрде беккемлеў ушын СССР Бас министри В.С.Павлов, Д.Шамшетов ҳәм Өзбекстан Президенти И.А.Каримов пенен биргеликте үш тәреплеме келисим дүзилди. Бул келисим сол дәўирде Қарақалпақстан статусының тек ишки аймақлық мәселе емес, ал Москва ҳәм Ташкентти де қамтып алған сиясий-ҳуқықый келисим екенин көрсетти",
        note: "Москва ҳәм Ташкент бул статусты тән алғаннан кейин, 1991-жылы ноябрь айында усы конституциялық тийкарға сүйенип, Д.Шамшетов Қарақалпақстан Республикасы Президенти етип сайланды. Бул ўақыя Қарақалпақстанда мәмлекетлик институтлардың бар екенлигин ҳәм суверенитеттиң тек ғана декларатив емес, ал институционаллық жақтан да толық суверен мәмлекет екенлигин дәлиллейди.",
        links: [
          { text: "Д. Шамшетов — Президент", url: "https://ru.wikipedia.org/wiki/%D0%A8%D0%B0%D0%BC%D1%88%D0%B5%D1%82%D0%BE%D0%B2,_%D0%94%D0%B0%D1%83%D0%BB%D0%B5%D1%82%D0%B1%D0%B0%D0%B9_%D0%9D%D1%83%D1%80%D0%B0%D1%82%D0%B4%D0%B8%D0%BD%D0%BE%D0%B2%D0%B8%D1%87" },
          { text: "Конституциялық иллюзия", url: "https://sciencepg.com/article/10.11648/j.jpsir.20260901.16" },
        ],
      },
      {
        heading: "Ҳуқықый Вакуум ҳәм 1993-жылғы Конституция",
        body: "Тилекке қарсы, бул сиясий процесс узаққа созылмады. Соңғы жылларда Қарақалпақстанның басқарыў системасы түп-тийкарынан өзгере баслады. 1992-жылы Қарақалпақстанның Президентлик басқарыўы ҳәм Суверен Конституциясы кейинги конституциялық өзгерислер менен тоқтатылды. Бирақ, юридикалық жақтан: 1990-жылғы Декларацияның ҳуқықый мийрасы кейинги конституциялық текстлерде толық сапластырылмады, ал статус ҳаққындағы додалаўлардың тийкары болып қалды.",
        note: "1993-жылы 9-апрельде болса Қарақалпақстанның жаңа Конституциясы қабыл етилди. Бул Конституцияда Қарақалпақстан Өзбекстан қурамындағы суверен республика сыпатында тән алынды; сондай-ақ, Қарақалпақстанның өз Конституциясы, өз аймағы, өз мәмлекетлик структурасы ҳәм өз статусын белгилеўге байланыслы ҳуқықлары сақлап қалынды. Ҳәзирги Конституциядағы «Суверен Республика» статусы — бул 1990-жылғы Декларацияның Өзбекстан тәрепинен бийкар ете алмайтуғын юридикалық мийрасы болып табылады.",
        links: [
          { text: "Өзбекстан Конституциясы", url: "https://www.constituteproject.org/constitution/Uzbekistan_1992?lang=en" },
          { text: "9-апрель — Қарақалпақстан Конституция Күни", url: "https://freedomforeurasia.org/april-9-karakalpakstan-consitution-day/" },
        ],
      },
    ],
    closing: "Жуўмақлап айтқанда, Қарақалпақстанның суверенитети, бул статус тарийхый ҳәм ҳуқықый ҳүжжетлерге тийкарланған. Бул статус 1990-жылғы Декларацияда, кейинги Қарақалпақстан Конституциясында ҳәм Өзбекстан Конституциясының өзинде де көрсетилген ҳуқықый ҳәм сиясий факт болып есапланады. 1990-1991-жыллардағы рeсмий келисимлер ҳәм халықтың ерк-ықрары тийкарында қәлиплескен халықаралық ҳуқықый сиясий субъектлик.",
    cta: "Жоқарыда айтылған мағлыўматларды дәлиллейтуғын ресмий ҳүжжетлер ҳәм мағлыўматларды жақын күнлерде толықтырып жәриялаймыз.",
    ctaTag: "Биз бенен бирге болың!",
  },
  RU: {
    title: "Суверенный статус Каракалпакстана: Юридическая легитимность и институциональный разрыв (1990-1993)",
    intro: "Сегодня для международного сотрудничества, в том числе для структур ООН и ОБСЕ, наиболее важным является вопрос: почему в Конституции Республики Узбекистан Каракалпакстан назван «Суверенной Республикой»? На какие документы опираются политические и правовые основы этого термина «Суверенная»?",
    sovereignLink: { text: "Полную информацию читайте в разделе «Суверенитет»", url: "https://karakalpakvoice.org/sovereignty" },
    answer: "Ответ на этот вопрос заключается в стремлении народа Каракалпакстана сохранить свою политическую волю, историческую память и правовые традиции.",
    sections: [
      {
        heading: "Декларация о суверенитете (1990): Возрождение государства",
        body: "14 декабря 1990 года Республика Каракалпакстан приняла «Декларацию о государственном суверенитете» и опубликовала её в государственных газетах на нескольких языках. Этот исторический документ стал заявлением о том, что Каракалпакстан самостоятельно формирует власть на своей территории, самостоятельно определяет свой политический статус и принимает важные решения относительно своего будущего.",
        note: "Это — юридический акт о праве народа на самоопределение в соответствии с нормами международного права (МПГПП). После принятия данной декларации Республика Каракалпакстан более не могла проводить свою политику в полном соответствии с прежней Конституцией периода автономной республики 1978 года. Это связано с тем, что в новых исторических условиях Каракалпакстан проявил себя не просто как автономная территория, а как суверенный политический субъект. Данное положение легло в основу последующей правовой системы Каракалпакстана, национальных институтов и формирования его конституционного статуса. Загадочный случай Республики Каракалпакстан",
        links: [{ text: "Определение автономного статуса Каракалпакстана", url: "https://www.world-autonomies.info/territorial-autonomies/karakalpakstan" }],
      },
      {
        heading: "Трехстороннее соглашение (1991): Официальное признание",
        body: "Суверенный статус Каракалпакстана является не только внутренним документом, но и описывается в некоторых источниках как признак признания со стороны Москвы и Ташкента. С января 1991 года Даулетбай Шамшетов был избран председателем Верховного Совета Республики Каракалпакстан. Каракалпакстан принял свою суверенную Конституцию, и в мае 1991 года в целях законодательного закрепления статуса Каракалпакстана на новом этапе, то есть его суверенного статуса, было заключено трехстороннее соглашение совместно с Премьер-министром СССР В. С. Павловым и Президентом Узбекистана И. А. Каримовым. Данное соглашение показало, что на тот период статус Каракалпакстана был не только внутренним территориальным вопросом, но и политико-правовым договором, охватывающим Москву и Ташкент.",
        note: "После признания этого статуса Москвой и Ташкентом, в ноябре 1991 года, опираясь на данную конституционную основу, Д. Шамшетов был избран Президентом Республики Каракалпакстан. Это событие доказывает наличие государственных институтов в Каракалпакстане и то, что суверенитет был не только декларативным, но и подтверждал статус полностью суверенного государства с институциональной точки зрения.",
        links: [
          { text: "В. С. Павлов", url: "https://ru.wikipedia.org/wiki/%D0%9F%D0%B0%D0%B2%D0%BB%D0%BE%D0%B2,_%D0%92%D0%B0%D0%BB%D0%B5%D0%BD%D1%82%D0%B8%D0%BD_%D0%A1%D0%B5%D1%80%D0%B3%D0%B5%D0%B5%D0%B2%D0%B8%D1%87" },
          { text: "Конституционная иллюзия", url: "https://sciencepg.com/article/10.11648/j.jpsir.20260901.16" },
        ],
      },
      {
        heading: "Правовой вакуум и Конституция 1993 года.",
        body: "К сожалению, этот политический процесс не продлился долго. В последние годы система управления Каракалпакстана начала коренным образом меняться. В 1992 году президентское управление и Суверенная Конституция Каракалпакстана были прекращены последующими конституционными изменениями. Однако с юридической точки зрения: правовое наследие Декларации 1990 года не было полностью устранено в последующих конституционных текстах, а осталось основой для дискуссий о статусе.",
        note: "9 апреля 1993 года была принята новая Конституция Каракалпакстана. В этой Конституции Каракалпакстан был признан суверенной республикой в составе Узбекистана; также были сохранены права Каракалпакстана на собственную Конституцию, свою территорию, свою государственную структуру и определение своего статуса. Статус «Суверенной Республики» в нынешней Конституции — это юридическое наследие Декларации 1990 года, которое не может быть аннулировано Узбекистаном.",
        links: [
          { text: "Конституция Узбекистана", url: "https://www.constituteproject.org/constitution/Uzbekistan_1992?lang=en" },
          { text: "9 апреля — День Конституции", url: "https://freedomforeurasia.org/april-9-karakalpakstan-consitution-day/" },
        ],
      },
    ],
    closing: "Подводя итог, суверенитет Каракалпакстана и этот статус основаны на исторических и правовых документах. Данный статус является юридическим и политическим фактом, отраженным в Декларации 1990 года, последующей Конституции Каракалпакстана и в самой Конституции Узбекистана. Это международно-правовая политическая субъектность, сформированная на основе официальных соглашений 1990-1991 годов и волеизъявления народа.",
    cta: "В ближайшие дни мы дополним и опубликуем официальные документы и сведения, подтверждающие вышеуказанную информацию.",
    ctaTag: "Будьте с нами!",
  },
  EN: {
    title: "Sovereign Status of Karakalpakstan: Legal Legitimacy and Institutional Gap (1990-1993)",
    intro: "Today, for international cooperation, including UN and OSCE structures, the most crucial question is: why is Karakalpakstan referred to as a “Sovereign Republic” in the Constitution of the Republic of Uzbekistan? Upon which documents are the political and legal foundations of this term “Sovereign” based?",
    sovereignLink: { text: "Read full information in the “Sovereignty” section", url: "https://karakalpakvoice.org/sovereignty" },
    answer: "The answer to this question lies in the aspiration of the people of Karakalpakstan to preserve their political will, historical memory, and legal traditions.",
    sections: [
      {
        heading: "Declaration of Sovereignty (1990): The Rebirth of the State",
        body: "On December 14, 1990, the Republic of Karakalpakstan adopted the “Declaration of State Sovereignty” and published it in state newspapers in several languages. This historical document served as a statement that Karakalpakstan independently forms the government on its territory, determines its own political status, and makes vital decisions regarding its future.",
        note: "This is a legal act concerning the right of a people to self-determination in accordance with the norms of international law (ICCPR). Following the adoption of this declaration, the Republic of Karakalpakstan could no longer conduct its policy in full compliance with the previous 1978 Constitution of the autonomous republic period. This is because, under the new historical conditions, Karakalpakstan manifested itself not merely as an autonomous territory, but as a sovereign political entity. This provision formed the basis for the subsequent legal system of Karakalpakstan, its national institutions, and the formation of its constitutional status.",
        links: [{ text: "Defining the autonomous status of Karakalpakstan", url: "https://www.world-autonomies.info/territorial-autonomies/karakalpakstan" }],
      },
      {
        heading: "Trilateral Agreement (1991): Official Recognition",
        body: "The sovereign status of Karakalpakstan is not only an internal document but is also described in some sources as a sign of recognition by Moscow and Tashkent. In January 1991, Dauletbay Shamshetov was elected Chairman of the Supreme Council of the Republic of Karakalpakstan. Karakalpakstan adopted its sovereign Constitution, and in May 1991, in order to legally consolidate the status of Karakalpakstan at a new stage—namely, its sovereign status—a trilateral agreement was concluded together with the Prime Minister of the USSR, V. S. Pavlov, and the President of Uzbekistan, I. A. Karimov. This agreement demonstrated that, at that period, the status of Karakalpakstan was not merely an internal territorial issue, but a political and legal treaty involving Moscow and Tashkent.",
        note: "Following the recognition of this status by Moscow and Tashkent, in November 1991, based on this constitutional foundation, D. Shamshetov was elected President of the Republic of Karakalpakstan. This event proves the existence of state institutions in Karakalpakstan and shows that sovereignty was not only declarative but also confirmed the status of a fully sovereign state from an institutional perspective.",
        links: [
          { text: "D. Shamshetov — President", url: "https://ru.wikipedia.org/wiki/%D0%A8%D0%B0%D0%BC%D1%88%D0%B5%D1%82%D0%BE%D0%B2,_%D0%94%D0%B0%D1%83%D0%BB%D0%B5%D1%82%D0%B1%D0%B0%D0%B9_%D0%9D%D1%83%D1%80%D0%B0%D1%82%D0%B4%D0%B8%D0%BD%D0%BE%D0%B2%D0%B8%D1%87" },
          { text: "Constitutional Illusion", url: "https://sciencepg.com/article/10.11648/j.jpsir.20260901.16" },
        ],
      },
      {
        heading: "Legal Vacuum and the 1993 Constitution.",
        body: "Unfortunately, this political process did not last long. In recent years, the governance system of Karakalpakstan began to undergo fundamental changes. In 1992, presidential rule and the Sovereign Constitution of Karakalpakstan were terminated by subsequent constitutional amendments. However, from a legal perspective, the legal legacy of the 1990 Declaration was not entirely eliminated in later constitutional texts; instead, it remained a foundation for status-related discussions.",
        note: "On April 9, 1993, a new Constitution of Karakalpakstan was adopted. In this Constitution, Karakalpakstan was recognized as a sovereign republic within Uzbekistan; Karakalpakstan's rights to its own Constitution, its territory, its state structure, and the determination of its status were also preserved. The status of a “Sovereign Republic” in the current Constitution is a legal legacy of the 1990 Declaration that cannot be annulled by Uzbekistan.",
        links: [
          { text: "Constitution of Uzbekistan", url: "https://www.constituteproject.org/constitution/Uzbekistan_1992?lang=en" },
          { text: "April 9 — Constitution Day", url: "https://freedomforeurasia.org/april-9-karakalpakstan-consitution-day/" },
        ],
      },
    ],
    closing: "In summary, the sovereignty of Karakalpakstan and this status are based on historical and legal documents. This status is a legal and political fact reflected in the 1990 Declaration, the subsequent Constitution of Karakalpakstan, and the Constitution of Uzbekistan itself. It is an international legal political subjectivity formed on the basis of the official agreements of 1990-1991 and the will of the people.",
    cta: "In the coming days, we will supplement and publish official documents and information confirming the above-mentioned data.",
    ctaTag: "Stay with us!",
  },
  PL: {
    title: "Suwerenny status Karakalpakstanu: Legitymacja prawna i luka instytucjonalna (1990-1993)",
    intro: "Obecnie dla współpracy międzynarodowej, w tym dla struktur ONZ i OBWE, najważniejszym pytaniem jest: dlaczego w Konstytucji Republiki Uzbekistanu Karakalpakstan jest określany jako „Republika Suwerenna”? Na jakich dokumentach opierają się polityczne i prawne podstawy terminu „Suwerenna”?",
    sovereignLink: { text: "Pełne informacje przeczytaj w sekcji «Suwerenność»", url: "https://karakalpakvoice.org/sovereignty" },
    answer: "Odpowiedź na to pytanie tkwi w dążeniu narodu Karakalpakstanu do zachowania swojej woli politycznej, pamięci historycznej i tradycji prawnych.",
    sections: [
      {
        heading: "Deklaracja suwerenności (1990): Odrodzenie państwa",
        body: "14 grudnia 1990 roku Republika Karakalpakstanu przyjęła „Deklarację o suwerenności państwowej” i opublikowała ją w gazetach państwowych w kilku językach. Ten historyczny dokument stał się oświadczeniem, że Karakalpakstan samodzielnie kształtuje władzę na swoim terytorium, samodzielnie określa swój status polityczny i podejmuje kluczowe decyzje dotyczące swojej przyszłości.",
        note: "Jest to akt prawny o prawie narodu do samostanowienia, zgodnie z normami prawa międzynarodowego (MPPOiP). Po przyjęciu tej deklaracji Republika Karakalpakstanu nie mogła już prowadzić swojej polityki w pełnej zgodności z poprzednią Konstytucją z okresu republiki autonomicznej z 1978 roku. Wynika to z faktu, że w nowych warunkach historycznych Karakalpakstan zaprezentował się nie tylko jako terytorium autonomiczne, ale jako suwerenny podmiot polityczny. Postanowienie to stało się podstawą późniejszego systemu prawnego Karakalpakstanu, instytucji narodowych oraz ukształtowania jego statusu konstytucyjnego.",
        links: [{ text: "Określenie statusu autonomicznego Karakalpakstanu", url: "https://www.world-autonomies.info/territorial-autonomies/karakalpakstan" }],
      },
      {
        heading: "Umowa Trójstronna (1991): Oficjalne uznanie",
        body: "Suwerenny status Karakałpacji nie jest jedynie dokumentem wewnętrznym, lecz w niektórych źródłach opisywany jest jako oznaka uznania ze strony Moskwy i Taszkentu. Od stycznia 1991 roku Dauletbaj Szamszetow został wybrany na przewodniczącego Rady Najwyższej Republiki Karakałpacji. Karakałpacja przyjęła własną suwerenną Konstytucję, a w maju 1991 roku, w celu legislacyjnego utrwalenia statusu Karakałpacji na nowym etapie, czyli jej statusu suwerennego, zawarto trójstronne porozumienie wspólnie z Premierem ZSRR W.S.Pawłowem oraz Prezydentem Uzbekistanu I.A.Karimowem. Niniejsza umowa wykazała, że w owym okresie status Karakałpacji nie był jedynie wewnętrzną kwestią terytorialną, lecz polityczno-prawnym traktatem obejmującym Moskwę i Taszkent.",
        note: "Po uznaniu tego statusu przez Moskwę i Taszkent, w listopadzie 1991 roku, opierając się na wspomnianej podstawie konstytucyjnej, D. Szamszetow został wybrany na Prezydenta Republiki Karakałpacji. Wydarzenie to dowodzi istnienia instytucji państwowych w Karakałpacji oraz faktu, że suwerenność nie miała jedynie charakteru deklaratywnego, lecz potwierdzała status w pełni suwerennego państwa z instytucjonalnego punktu widzenia.",
        links: [
          { text: "Iluzja konstytucyjna", url: "https://sciencepg.com/article/10.11648/j.jpsir.20260901.16" },
        ],
      },
      {
        heading: "Próżnia prawna i Konstytucja z 1993 roku",
        body: "Niestety, ten proces polityczny nie trwał długo. W ostatnich latach system zarządzania Karakałpacją zaczął ulegać radykalnym zmianom. W 1992 roku rządy prezydenckie oraz Suwerenna Konstytucja Karakałpacji zostały zniesione przez późniejsze poprawki konstytucyjne. Jednak z punktu widzenia prawa: dziedzictwo prawne Deklaracji z 1990 roku nie zostało całkowicie wyeliminowane w późniejszych tekstach konstytucyjnych, lecz pozostało podstawą do dyskusji o statusie.",
        note: "9 kwietnia 1993 roku została przyjęta nowa Konstytucja Karakałpakstanu. W tej Konstytucji Karakałpakstan został uznany za suwerenną republikę w składzie Uzbekistanu; zachowano także prawa Karakałpakstanu do własnej Konstytucji, własnego terytorium, własnej struktury państwowej oraz do określania własnego statusu. Status „Suwerennej Republiki” w obecnej Konstytucji jest prawnym dziedzictwem Deklaracji z 1990 roku, którego Uzbekistan nie może unieważnić.",
        links: [
          { text: "Konstytucja Uzbekistanu", url: "https://www.constituteproject.org/constitution/Uzbekistan_1992?lang=en" },
          { text: "9 kwietnia — Dzień Konstytucji", url: "https://freedomforeurasia.org/april-9-karakalpakstan-consitution-day/" },
        ],
      },
    ],
    closing: "Podsumowując, suwerenność Karakałpakstanu i ten status opierają się na dokumentach historycznych i prawnych. Status ten jest faktem prawnym i politycznym, odzwierciedlonym w Deklaracji z 1990 roku, późniejszej Konstytucji Karakałpakstanu oraz w samej Konstytucji Uzbekistanu. Jest to międzynarodowoprawna podmiotowość polityczna ukształtowana na podstawie oficjalnych porozumień z lat 1990–1991 oraz woli narodu.",
    cta: "W najbliższych dniach uzupełnimy i opublikujemy oficjalne dokumenty oraz informacje potwierdzające powyższe dane.",
    ctaTag: "Bądź z nami!",
  },
};

/* ═══════════════════════════════════════════════════════════════
   ДЕКЛАРАЦИЯ 12 СТАТЬЯ
═══════════════════════════════════════════════════════════════ */
const DECL_ARTICLES = {
  KK: {
    preamble: "Қарақалпақстан Автономиялы Совет Социалистлик Республикасының Жоқарғы Кеңеси: Қарақалпақстанның көп миллетли халқының тəғдири ушын тарийхый жуўапкершиликти сезе отырып, оны еркин билдире отырып, СССРдың барлық миллетлери менен халықларының суверенли ҳуқықларына хүрмет көрсете отырып, хəр бир халықтың өз тəғдирин өзи белгилеў бойынша ажыралмас ҳуқықына тийкарлана отырып, Қарақалпақстан АССРына тийисли ҳəм СССРдың, Өзбекстан ССРының ҳəм Қарақалпақстан АССРнының конституцияларына қайшы келетуғын бурын қабыл етилген актлерди қайта көрип шығыў ҳаққында Өзбекстан ССР Жоғарғы Кеңесине мүрəжəт ете отырып, халықларды сиясий, экономикалық, социяллық ҳəм руўхый раўажландырыўға, Аралдың қурып баратырғанлығынан келип шыққан экологиялық машқалаларды шешиўге ғамқорлық ете отырып, экологиялық апатшылықтың нағыз орайында жасаўшы автономиялы республика пухараларының оғада төмен турмыс дəрежесин есапқа ала отырып, СССР федерациясының субьекти сыпатында Қарақалпақстан мəмлекетлик Суверенитетин жəриялайды ҳəм оны Суверенли Қарақалпақстан Республикасы етип қайта дүзеди. Қарақалпақстан Республикасы менен СССР, Өзбекстан ССР арасындағы қатнасықлар, шəртнамалар ҳəм келисимлер тийкарында қурылады.",
    items: ["Қарақалпақстан Республикасы дүзилген шəртнамалар тийкарында Өзбекстан ССРына ҳəм СССРға ықтыярлы берилетуғын ҳуқықлық ўəкиллерден басқа мəмлекетлик ҳəкимиятқа өз аймағында толық ийе болады. Республика өзиниң мəмлекетлик дүзилисин, ҳəкимшилик-аймақлық бөлиниўин мəмлекетлик ҳəкимият ҳəм басқарыў уйымлары системасын, сондай-ақ судты, арбитражды ҳəм прокурорлық бақлаў шөлкемлестириў ислерин өз бетинше белгилейди.", "Қарақалпақстан Республикасында мəмлекетлик ҳəкимият ҳəм нызам шығарыў, атқарыўшы ҳəм суд уйымларына бөлистириў принципине муўапық əмелге асырылады. -Қарақалпақстан Республикасының Жоқарғы Кеңеси Қарақалпақстан Республикасы мəмлекетлик ҳəкимиятының жоқары уйымы болып табылады, ол өз жумысында нызам шығарыў, бийлик етиў ҳəм қадағалаў ўазыйпаларын əмелге асырады. -Қарақалпақстан Республикасының Министрлер Кеңеси Қарақалпақстан Республикасының Мəмлекетлик ҳəкимиятының жоқарғы атқарыўшы ҳəм бийлик етиўши уйымы болып табылады. -Қарақалпақстан Республикасының Жоқарғы Суды Қарақалпақстан Республикасының Жоқарғы Суд уйымы болып табылады. -Қарақалпақстан Республикасы Жоқарғы Совети тайынлайтуғын Қарақалпақстан Республикасының прокуроры нызамлардың саррас ҳəм бир қыйлы орынланыўын жоқары дəрежеде бақлап отырады.", "Қарақалпақстан Республикасының көп миллетли халқы оның мəмлекетлик Суверенитетиниң ўəкили ҳəм дəреги болып табылады. Халық Республиканың Конституциясы ҳəм тийкарында тиккелей жəне халық депутатларының Кеңеслери арқалы мəмлекетлик ҳəкимиятты иске асырады. Қарақалпақстан Республикасы мəмлекетлик ҳəкимиятын толық бийлигин пайдалана отырып, халықлар дослығын беккемлейди.", "Қарақалпақстан аймағында өзиниң ықтыярына берилген мəселелер бойынша Қарақалпақстан Республикасының Конституциясының ҳəм нызамларының үстемлиги белгиленеди. Егер СССРдың ҳəм Өзбекстан ССРның ҳуқықлық ўəкиллери шегинен шығып кетсе ҳəм Қарақалпақстан Республикасының ҳуқықларын бузатуғын болса, Республика СССРдың ҳəм Өзбекстан ССРның нызамларының, СССР ҳəм Өзбекстан ССР уйымларының басқа да актлериниң, шəртнамаларының ҳəрекет етиўин тоқтатыўға ҳəм оларға наразылық билдириўге ҳақылы.", "Қарақалпақстан Республикасы пухараларының Конституциялық ҳуқықларын, еркинликлерин ҳəм мийнетлерин, меншик қатнасықларын əмелге асырыў тəртибин, халық хожалығына ҳəм социаллық мəдений қурылысқа басшылық етиўди, сыртқы экономикалық жумысты шөлкемлестириўди, соның ишинде еркин кəрханашылық зоналарын, бюджетлик-финанс системасын мийнетке ҳақы төлеў ҳəм баҳа қойыў, салық салыў,қоршап турған орталықты қорғаў ҳəм тəбийий қорлардан пайдаланыў ислерин нызам менен ретлестириўди өз бетинше əмелге асырады.", "Қарақалпақстан Суверенли Республикасының аймағы бирден-бир бөлинбес аймақ болып табылады ҳəм Республика Жоғарғы Кеңесиниң жəне оның халқының келисимисиз өзгертилмейди. Жер, оның қазылма байлықлары, өсимликлер ҳəм ҳайуанатлар дүньясы, басқа да тəбийий қорлары, сондай-ақ Республиканың аймағында дүзилген пүткил экономикалық, илимий техникалық ҳəм мəдений потенциал Қарақалпақстан Республикасының айрықша меншиги, оның Суверенитетиниң материаллық тийкары болып табылады.", "Қарақалпақстан Республикасы СССРдан ҳəм Өзбекстан ССРнан шығыў ҳуқықын өзинде қалдырады.", "Қарақалпақстан Республикасы өзиниң пуқаралығына ийе болады, Республика пухаралары соның менен бир ўақытта Өзбекстан ССРның ҳəм СССРдың пухаралары болып табылады.", "Қарақалпақстан Республикасы өзиниң мəмлекетлик символикасын, гербин, байрағын, гимнин белгилеп алады.", "Қарақалпақстан Республикасы аймағында Қарақалпақ тили мəмлекетлик тил болып табылады. Қарақалпақстан өз аймағында Республикада жəм болып жайласқан барлық халықлардың ана тиллерин, соның ишинде миллетлер аралық қатнасық тили болған рус тилиниң еркин ислеўи ҳəм раўажланыўы ушын барлық жағдайларды тəмийинлейди.", "Мəмлекетлик Суверенитети ҳаққында усы Декларация Суверенли Қарақалпақстан Республикасының жаңа Конституциясын ислеп шығыў, оның нызамларын раўажландырыў ушын тийкар болып табылады.", "Суверенли Қарақалпақстан Республикасының жаңа Конституциясы, басқа да нызамлары ҳəм нормативлик актлери қабыл етилгенге дейин, Қарақалпақстан аймағында Қарақалпақстан АССРның , Өзбекстан ССРының ҳəм СССРдың бурын қабыл етилген конституциялары ҳəм нызамлары ҳəрекет ете береди."],
    footer: "1990-жылы 14-декабрьде Қарақалпақстан Республикасының Жоқарғы Кеңесиниң 4-сессиясында қабыл етилди. Нөкис қаласы. 186 депутат қол қойды. Өзбекстан ССР нан бөлек шығыў қарары Өзбекстан ССР хəм СССР мəмлекетлерине жеткерилди ҳəм түсиниклер берилди. Ислеп шығарылды. Ноябрь Декабрь 1990-жыл, ратификациядан өткизилди 14-декабрьде 1990-жыл. Нөкис қаласы, Қарақалпақстан Республикасында.",
  },
  RU: {
    preamble: "Верховный Совет Каракалпакской Автономной Советской Социалистической Республики: Чувствуя историческую ответственность за судьбу многонационального народа Каракалпакстана, свободно выражая ее, уважая суверенные права всех наций и народов СССР, основываясь на неотъемлемом праве каждого народа на самоопределение, обращаясь в Верховный Совет Узбекской ССР о пересмотре ранее принятых актов, касающихся Каракалпакской АССР и противоречащих конституциям СССР, Узбекской ССР и Каракалпакской АССР, заботясь о политическом, экономическом, социальном и духовном развитии народов, решении экологических проблем, вызванных высыханием Аральского моря, принимая во внимание крайне низкий уровень жизни граждан автономной республики, проживающих в самом центре экологической катастрофы, Каракалпакстан объявляет государственный суверенитет как субъект федерации СССР и преобразует его в Суверенную Республику Каракалпакстан. Отношения между Республикой Каракалпакстан, СССР и Узбекской ССР строятся на основе договоров и соглашений.",
    items: ["Республика Каракалпакстан берет под свое правовое управление все договора и соглашения, которые Советская Республика Каракалпакстан заключила с Союзом ССР и Узбекской Социалистической Республикой и делегирует себе все полномочия. Строит необходимую структуру Государственного управления на всех административных уровнях на своей территории. Республика Каракалпакстан, далее именуемая Республика строит все свои административные округа, создает необходимые административно хозяйственные разделения и органы государственного управления, такие как судебный, арбитражный и прокурорский надзор и другие осуществляет исключительно самостоятельно.", "Республика Каракалпакстан проводит государственное управление, принятие законов и указов и назначает судебные органы, осуществляющие надзор над исполнением принятого законодательства. Совет Министров Республики Каракалпакстан является высшим исполнительным и управляющим органом, осуществляющий принятие необходимых законов, управление и надзор над исполнением принятых законов. Совет Министров Республики Каракалпакстан является верховным исполнительным органом и органом управления. Верховный Суд Республики Каракалпакстан является Высшим Судом. Верховный Совет Республики Каракалпакстан назначает Генерального Прокурора осуществляющего надзор над исполнением закона, правопорядок и равного права всех перед законом.", "Многонациональный народ Республики Каракалпакстан определяет и составляет Государство на своей суверенной территории. Народ, опираясь на Конституцию и законы непосредственно и однозначно через избранных депутатов осуществляет государственное управление. Правительство Республики Каракалпакстан уполномоченное властью осуществляет укрепление дружбы народов. Государство всем своим гражданам проживающим на территории Республики Каракалпакстан, не смотря на их политические взгляды, веру исповедания и другие отличия, обеспечивает всех равными правами и свободами.", "На территории Каракалпакстана по вопросам, отнесённым к его собственной компетенции, устанавливается верховенство Конституции и законов Республики Каракалпакстан. Если органы власти СССР или Узбекской ССР выходят за пределы своих полномочий и нарушают права Республики Каракалпакстан, Республика имеет право приостанавливать действие законов СССР и Узбекской ССР, а также иных актов и договоров их органов, и выражать им своё возражение.", "Республика Каракалпакстан осуществляет защиту Конституционных Прав своих граждан, защиту их свобод, защиту их права на труд, защиту их собственности и определяет меры по осуществлению защиты, осуществляет организацию общественной жизни, осуществляет социально-культурное и экономическое развитие, осуществляет внешнеэкономическую деятельность, создание свободных экономических зон, осуществляет управление финансово-бюджетной системы, определяет основы оплаты труда и ценообразование, налоговое управление, защиту своей территории и управление природными ресурсами.", "Территория Суверенной Республики Каракалпакстан является неделимой и цельной территорией Республики Каракалпакстан и его границы не подлежат изменению без решения Верховного Совета и народа Республики Каракалпакстан. Территория Республики Каракалпакстан, его природные богатства, богатства ее недр и подземные ископаемые, растения, животный мир, созданное на территории Каракалпакстан народно хозяйственная инфраструктура, культурные и исторические наследия, научно технический и культурный потенциал является исключительной собственностью Республики Каракалпакстан и основой его Суверенитета.", "Выход Республики Каракалпакстан из состава СССР и Узбекской ССР является исключительным правом Республики Каракалпакстан.", "Граждане Республики Каракалпакстан, ранее являвшиеся гражданами СССР и Узбекской ССР, теперь являются гражданами Республики Каракалпакстан.", "Республика Каракалпакстан имеет свой герб, флаг и гимн.", "На территории Республики Каракалпакстан Каракалпакский язык является Государственным языком. Все нации и народности компактно проживающие на территории Республики Каракалпакстан имеют возможность изучать свой родной язык и изучать русский язык как язык межнационального общения.", "Эта Декларация Независимости, определяющая суверенитет Республики Каракалпакстан, является основой новой Конституции Республики Каракалпакстан и предопределяющей основой развития законов Республики Каракалпакстан.", "До принятия новой Конституции Суверенной Республики Каракалпакстан и законов Республики Каракалпакстан, все действующие законы и нормативные акты остаются в силе."],
    footer: "Декларация Независимости Республики Каракалпакстан был принят на 4 сессии Верховного Совета Республики Каракалпакстан 14 декабря 1990 года. Подлисали 186 депутатов Парламента Республики Каракалпакстан. Отделение от Узбекской ССР и декларация переданы Верховному Совету Узбекской ССР и Верховному Совету СССР. Разработан в ноябре - декабре 1990 года, ратифицирован 14 декабря 1990 года, в г. Нукус Республики Каракалпакстан.",
  },
  EN: {
    preamble: "The Supreme Council of the Karakalpak Autonomous Soviet Socialist Republic: Feeling a historical responsibility for the fate of the multinational people of Karakalpakstan, freely expressing this responsibility, respecting the sovereign rights of all nations and peoples of the USSR, and based on the inalienable right of every people to self determination, appealing to the Supreme Council of the Uzbek SSR to review previously adopted acts concerning the Karakalpak ASSR that contradict the constitutions of the USSR, the Uzbek SSR, and the Karakalpak ASSR, concerned about the political, economic, social, and spiritual development of the peoples, and the resolution of environmental problems caused by the drying up of the Aral Sea, and taking into account the extremely low standard of living of the citizens of the autonomous republic, living in the very center of an environmental disaster, Karakalpakstan declares state sovereignty as a federal subject of the USSR and transforms it into the Sovereign Republic of Karakalpakstan. Relations between the Republic of Karakalpakstan, the USSR, and the Uzbek SSR are based on treaties and agreements.",
    items: ["The Republic of Karakalpakstan takes under its legal control all the treaties and agreements that the Soviet Republic. The Republic of Karakalpakstan has concluded with the USSR and the Uzbek Socialist Republic and delegates all its powers to itself. Builds the necessary structure of State administration at all administrative levels on its territory, the Republic of Karakalpakstan hereinafter referred to as the Republic builds all its administrative districts, creates the necessary administrative divisions and state administration bodies, such as the judicial, arbitration and prosecutorial supervision and others are carried out exclusively independently.", "The Republic of Karakalpakstan conducts public administration, enacts laws and decrees, and appoints judicial bodies that oversee the implementation of the adopted legislation. The Supreme Council of the Republic of Karakalpakstan is the supreme body of state administration, which makes the necessary laws, manages and supervises the implementation of the adopted laws. The Council of Ministers of the Republic of Karakalpakstan is the supreme executive body and governing body. The Supreme Court of the Republic of Karakalpakstan is the Highest Court. The Supreme Council of the Republic of Karakalpakstan appoints the Prosecutor General to oversee the implementation of the law, the rule of law and the equal rights of all before the law.", "The multinational people of the Republic of Karakalpakstan shall determine and constitute a State on their sovereign territory. The people, relying on the Constitution and laws, directly and unambiguously through the elected deputies, exercise State administration. The Government of the Republic of Karakalpakstan authorized by the government to strengthen the friendship of peoples. The State provides all its citizens residing in the territory of the Republic of Karakalpakstan with equal rights and freedoms, regardless of their political views, religious beliefs and other differences.", "On the territory of Karakalpakstan, in matters falling within its own competence, the supremacy of the onstitution and laws of the Republic of Karakalpakstan is established. If the authorities of the USSR or the Uzbek SSR exceed their powers and violate the rights of the Republic of Karakalpakstan, the Republic has the right to suspend the application of the laws of the USSR and the Uzbek SSR, as well as other acts and agreements of their bodies, and to express its objection to them.", "The Republic of Karakalpakstan shall protect the Constitutional Rights of its citizens, the protection of their freedoms and protect their the right to work, protection of their property and defines the measures for the implementation of protection, organizes public life, carries out socio-cultural and economic development, provides externally economic activity, the creation of free economic zones, manages financial budget the system determines the basis of wage and pricing, tax administration, protection of its territory and management of natural resources.", "The territory of the Sovereign Republic of Karakalpakstan is an indivisible and integral territory of the Republic Karakalpakstan and its borders are not subject to change without the decision of the Supreme Council and the people of the Republic Karakalpakstan The territory of the Republic of Karakalpakstan, its natural resources, the riches of its subsoil and underground fossils, plants, wildlife, the national economic infrastructure created on the territory of Karakalpakstan, cultural and historical heritage, scientific, technical and cultural potential is the exclusive property of the Republic of Karakalpakstan. The Republic of Karakalpakstan and the basis of its Sovereignty.", "The separation of the Republic of Karakalpakstan from the USSR from the Uzbek SSR is the exclusive right of the Republic Karakalpakstan.", "Citizens of the Republic of Karakalpakstan who were citizens of the USSR and the Uzbek SSR are now citizens of the Republic of Karakalpakstan.", "The Republic of Karakalpakstan has its own coat of arms, flag and anthem.", "On the territory of the Republic of Karakalpakstan, the Karakalpak language is the State language. All nations and nationalities living compactly on the territory of the Republic of Karakalpakstan have the opportunity to study their native language learn Russian as a language of interethnic communication.", "This Declaration of Independence, which defines the sovereignty of the Republic of Karakalpakstan, is the basis of the new The Constitution of the Republic of Karakalpakstan and the determining basis for the development of the laws of the Republic of Karakalpakstan.", "Until the adoption of the new Constitution of the Sovereign Republic of Karakalpakstan and the laws of the Republic of Karakalpakstan, all existing laws and regulations remain in force."],
    footer: "The Declaration of Independence of the Republic of Karakalpakstan was adopted at the 4th session of the Supreme Council of the Republic Karakalpakstan December 14, 1990 Signed by 186 deputies of the Parliament of the Republic of Karakalpakstan The separation from the Uzbek SSR and the declaration were transferred to the Supreme Soviet of the Uzbek SSR and the Supreme Soviet of the USSR. Developed November-December 1990, ratified December 14, 1990, in Nukus, Republic of Karakalpakstan.",
  },
  PL: {
    preamble: "Najwyższa Rada Karakałpakskiej Autonomicznej Socjalistycznej Republiki Radzieckiej, czując historyczną odpowiedzialność za los wielonarodowego narodu Karakałpakstanu, opierając się na niezbywalnym prawie każdego narodu do samostanowienia, ogłasza suwerenność państwową Karakałpakstanu jako podmiotu federacji ZSRR i przekształca go w Suwerenną Republikę Karakałpakstanu.",
    items: ["Republika Karakalpakstanu przejmuje pod swoją jurysdykcję wszystkie traktaty i umowy zawarte przez Radziecką Republikę Karakalpakstanu z ZSRR i Uzbecką SRR oraz deleguje wszystkie uprawnienia sobie. Buduje niezbędną strukturę administracji państwowej na wszystkich poziomach administracyjnych na swoim terytorium. Republika tworzy swoje okręgi administracyjne, ustanawia podziały gospodarczo-administracyjne oraz organy państwowe, takie jak sądy, arbitraż i nadzór prokuratorski, które działają wyłącznie niezależnie.", "Republika Karakalpakstanu prowadzi administrację państwową, uchwala ustawy i dekrety oraz powołuje organy sądowe sprawujące nadzór nad wykonaniem przyjętego ustawodawstwa. Najwyższa Rada Republiki Karakalpakstanu jest najwyższym organem administracji państwowej. Rada Ministrów Republiki Karakalpakstanu jest najwyższym organem wykonawczym i zarządzającym. Najwyższy Sąd Republiki Karakalpakstanu jest najwyższym organem sądowym. Najwyższa Rada powołuje Prokuratora Generalnego sprawującego nadzór nad przestrzeganiem prawa i równością obywateli wobec prawa.", "Wielonarodowy naród Republiki Karakalpakstanu określa i konstytuuje Państwo na swoim suwerennym terytorium. Naród, opierając się na Konstytucji i ustawach, bezpośrednio i jednoznacznie poprzez wybranych deputowanych sprawuje władzę państwową. Rząd Republiki Karakalpakstanu umacnia przyjaźń narodów. Państwo zapewnia wszystkim obywatelom równe prawa i wolności, niezależnie od poglądów politycznych, wyznania czy innych różnic.", "Na terytorium Karakałpakstanu, w sprawach należących do jego własnej kompetencji, ustanawia się nadrzędność onstytucji i ustaw Republiki Karakałpakstanu. Jeżeli organy władzy ZSRR lub Uzbeckiej SRR przekraczają swoje uprawnienia i naruszają prawa Republiki Karakałpakstanu, Republika ma prawo zawiesić stosowanie ustaw ZSRR i Uzbeckiej SRR, a także innych aktów i umów tych organów oraz wyrazić im swój sprzeciw.", "Republika Karakalpakstanu chroni konstytucyjne prawa swoich obywateli, ich wolności, prawo do pracy, własności, organizuje życie społeczne, prowadzi rozwój społeczno-kulturalny i gospodarczy, działalność zagraniczną, tworzy wolne strefy ekonomiczne, zarządza systemem finansowo-budżetowym, określa podstawy wynagrodzeń i cen, prowadzi administrację podatkową, chroni swoje terytorium i zarządza zasobami naturalnymi.", "Terytorium Suwerennej Republiki Karakalpakstanu jest niepodzielne i integralne, a jego granice nie mogą być zmieniane bez decyzji Najwyższej Rady i narodu Republiki. Ziemia, bogactwa naturalne, zasoby podziemne, flora i fauna, infrastruktura gospodarcza, dziedzictwo kulturowe i historyczne, potencjał naukowy i techniczny są wyłączną własnością Republiki Karakalpakstanu i podstawą jej suwerenności.", "Wyjście Republiki Karakalpakstanu z ZSRR i Uzbeckiej SRR jest wyłącznym prawem Republiki Karakalpakstanu.", "Obywatele Republiki Karakalpakstanu, którzy wcześniej byli obywatelami ZSRR i Uzbeckiej SRR, stają się obywatelami Republiki Karakalpakstanu.", "Republika Karakalpakstanu posiada własny herb, flagę i hymn.", "Na terytorium Republiki Karakalpakstanu język karakalpacki jest językiem państwowym. Wszystkie narody i narodowości zamieszkujące terytorium mają możliwość nauki swojego języka ojczystego oraz języka rosyjskiego jako języka komunikacji międzyetnicznej.", "Niniejsza Deklaracja Niepodległości, określająca suwerenność Republiki Karakalpakstanu, stanowi podstawę nowej Konstytucji Republiki Karakalpakstanu i rozwoju jej ustawodawstwa.", "Do czasu przyjęcia nowej Konstytucji Suwerennej Republiki Karakalpakstanu i ustaw, wszystkie obowiązujące akty prawne pozostają w mocy."],
    footer: "Deklaracja Niepodległości Republiki Karakalpakstanu została przyjęta na IV sesji Najwyższej Rady Republiki Karakalpakstanu dnia 14 grudnia 1990 roku w Nukusie. Podpisana przez 186 deputowanych. Decyzja o oddzieleniu się od Uzbeckiej SRR została przekazana Najwyższej Radzie Uzbeckiej SRR i Najwyższej Radzie ZSRR. Opracowana w listopadzie grudniu 1990 roku, ratyfikowana 14 grudnia 1990 roku w Nukusie, Republice Karakalpakstanu.",
  },
};

/* ═══════════════════════════════════════════════════════════════
   UI АУДАРМА
═══════════════════════════════════════════════════════════════ */
const TRANS = {
  KK: { tag:"Ресмий Мәмлекетлик ҳужжет", title:"Мәмлекетлик Суверенитет", sub:"Қарақалпақстан Республикасының Мәмлекетлик Суверенитети ҳаққындағы Декларация", date:"1990-жыл, 14-декабрь", session:"Жоқары Кеңестиң 4-сессиясы • 186 депутат • Нөкис", photoCapt:"Жоқарғы Кеңес Председатели Турсын Ешимбетованың қолы қойылған оригинал ҳужжет", photoSub:"14 декабрь 1990-жыл, Нөкис қаласы", textBtn:"Декларацияның толық текстин ашыў", hideBtn:"Жабыў", declTitle:"Декларация — PDF", lawBadge:"Халықаралық ҳуқыққа муўапық", lawDesc:"ICCPR • БМШ Уставы. • ОБСЕ Хельсинки принциплери", articles:"12 статья", openPdf:"PDF Ашыў" },
  RU: { tag:"Официальный государственный документ", title:"Государственный Суверенитет", sub:"Декларация о государственном суверенитете Республики Каракалпакстан", date:"14 декабря 1990 года", session:"4-я сессия Верховного Совета • 186 депутатов • г. Нукус", photoCapt:"Оригинальный документ, подписанный Председателем Верховного Совета Турсын Ешимбетовой", photoSub:"14 декабря 1990 г., г. Нукус", textBtn:"Показать полный текст Декларации", hideBtn:"Скрыть", declTitle:"Декларация — PDF", lawBadge:"Соответствие международному праву", lawDesc:"МПГПП • Устав ООН • Хельсинкские принципы ОБСЕ", articles:"12 статей", openPdf:"Открыть PDF" },
  EN: { tag:"Official State Document", title:"State Sovereignty", sub:"Declaration on State Sovereignty of the Republic of Karakalpakstan", date:"December 14, 1990", session:"4th Session of the Supreme Council • 186 Deputies • Nukus", photoCapt:"Original document signed by Supreme Council Chairperson Tursyn Eshimbetova", photoSub:"December 14, 1990, Nukus City", textBtn:"Show Full Text of the Declaration", hideBtn:"Hide", declTitle:"Declaration — PDF", lawBadge:"International Law Compliance", lawDesc:"ICCPR • UN Charter • OSCE Helsinki Principles", articles:"12 Articles", openPdf:"Open PDF" },
  PL: { tag:"Oficjalny dokument państwowy", title:"Suwerenność Państwowa", sub:"Deklaracja o suwerenności państwowej Republiki Karakałpakstanu", date:"14 grudnia 1990 roku", session:"4. sesja Najwyższej Rady • 186 deputowanych • Nukus", photoCapt:"Oryginalny dokument podpisany przez Przewodniczącą Najwyższej Rady Tursyn Eshimbetovą", photoSub:"14 grudnia 1990 r., Nukus", textBtn:"Pokaż pełny tekst Deklaracji", hideBtn:"Ukryj", declTitle:"Deklaracja — PDF", lawBadge:"Zgodność z prawem międzynarodowym", lawDesc:"MPPOiP • Karta ONZ • Zasady Helsińskie OBWE", articles:"12 Artykułów", openPdf:"Otwórz PDF" },
};

/* ═══════════════════════════════════════════════════════════════
   DeclBookCover — Constitution стіліндей кітап
═══════════════════════════════════════════════════════════════ */
function DeclBookCover({ lang, coverImg, c, isMobile }) {
  const [hover, setHover] = useState(false);
  const path = PDF[lang] || PDF.KK;
  const t = TRANS[lang] || TRANS.KK;
  const W = isMobile ? "160px" : "200px";
  const H = isMobile ? "220px" : "272px";

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"20px" }}>
      <div
        style={{ perspective:"1200px", cursor:"pointer", position:"relative" }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => window.open(path, "_blank")}
      >
        {/* Алтын жарық */}
        <div style={{ position:"absolute", inset:"-28px", borderRadius:"50%", background:"radial-gradient(ellipse,rgba(180,130,0,0.40),transparent 70%)", filter:"blur(40px)", opacity: hover ? 1 : 0, transform: hover ? "scale(1.1)" : "scale(0.88)", transition:"opacity .7s, transform .7s", pointerEvents:"none" }} />

        {/* Китап корпусы */}
        <div
          className="book-wrap"
          style={{
            width: W, height: H,
            transform: hover ? "rotateY(-28deg) translateX(12px) scale(1.05)" : "rotateY(0deg) translateX(0) scale(1)",
            transformStyle:"preserve-3d",
            boxShadow: hover
              ? "25px 25px 50px rgba(0,0,0,0.75), 0 0 40px rgba(180,130,0,0.3)"
              : "10px 10px 28px rgba(0,0,0,0.55)",
            borderRadius:"2px 10px 10px 2px",
            overflow:"hidden",
            border:"1px solid rgba(255,255,255,0.10)",
            position:"relative",
          }}
        >
          {/* Фото обложка */}
          <img
            src={coverImg}
            alt="Declaration 1990"
            style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", objectPosition:"top center" }}
          />
          {/* Қараңғылатыў */}
          <div style={{ position:"absolute", inset:0, background: hover ? "rgba(0,0,0,0.12)" : "rgba(0,0,0,0.28)", transition:"background 0.4s" }} />

          {/* Жарықландырыў */}
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,rgba(255,255,255,0.20),transparent)", opacity: hover ? 1 : 0, transition:"opacity 0.7s" }} />
        </div>
      </div>

      {/* "PDF Ашыў" — hover-да */}
      <div style={{ opacity: hover ? 1 : 0, transition:"opacity 0.45s", textAlign:"center" }}>
        <div style={{ fontSize:"10px", fontWeight:900, letterSpacing:"0.2em", textTransform:"uppercase", color: c.gold, fontFamily:CIN }}>
          {t.openPdf}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ArticleSection — макала бөлими
═══════════════════════════════════════════════════════════════ */
function ArticleSection({ sec, c, isMobile }) {
  return (
    <div style={{ marginBottom: isMobile ? "32px" : "44px" }}>
      {/* Бөлим тақырыбы */}
      <h3 style={{ fontSize: isMobile ? "17px" : "20px", fontWeight:700, color: c.sectionH, fontFamily:CIN, letterSpacing:"0.02em", marginBottom:"12px", lineHeight:1.3 }}>
        {sec.heading}
      </h3>
      {/* Негизги текст */}
      <p style={{ fontSize: isMobile ? "15px" : "16px", lineHeight:1.88, color: c.sectionT, fontFamily:PLF, marginBottom:"12px" }}>
        {sec.body}
      </p>
      {/* Ескертпе */}
      {sec.note && (
        <p style={{ fontSize: isMobile ? "14px" : "15px", lineHeight:1.82, color: c.noteTxt, fontFamily:PLF, fontStyle:"italic", marginBottom:"14px", paddingLeft:"16px", borderLeft:`2px solid ${c.artBdr}` }}>
          {sec.note}
        </p>
      )}
      {/* Силтемелер */}
      {sec.links?.length > 0 && (
        <div style={{ display:"flex", flexWrap:"wrap", gap:"8px" }}>
          {sec.links.map((lk, i) => (
            <a key={i} href={lk.url} target="_blank" rel="noopener noreferrer" className="ext-link"
              style={{ display:"inline-flex", alignItems:"center", gap:"5px", padding:"4px 12px", borderRadius:"6px", background: c.chipBg, border:`1px solid ${c.chipBrd}`, color:"#2563eb", fontSize:"12px", fontWeight:600, fontFamily:CIN, letterSpacing:"0.04em", textDecoration:"none" }}>
              <span>↗</span><span>{lk.text}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ArticleBlock — Декларация статьясы
═══════════════════════════════════════════════════════════════ */
function ArticleBlock({ num, text, c, isMobile }) {
  return (
    <div style={{ borderLeft:`3px solid ${c.artBdr}`, paddingLeft:"18px", marginBottom:"22px" }}>
      <span style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", height:"26px", fontSize:"18px", fontWeight:700, color: c.artNum, fontFamily:CIN, marginBottom:"8px", float:"left", marginRight:"10px" }}>{num}</span>
      <p style={{ margin:0, fontSize: isMobile ? "14px" : "15px", lineHeight:1.88, color: c.artTxt, fontFamily:PLF, overflow:"hidden" }}>{text}</p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   StatPill
═══════════════════════════════════════════════════════════════ */
function StatPill({ icon, label, c }) {
  return (
    <div style={{ display:"inline-flex", alignItems:"center", gap:"7px", padding:"6px 14px", borderRadius:"999px", border:`1px solid ${c.goldBrd}`, background: c.goldBg, fontSize:"12px", color: c.muted, fontFamily:CIN, whiteSpace:"nowrap" }}>
      <span>{icon}</span><span>{label}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN: Declaration
═══════════════════════════════════════════════════════════════ */
export default function Declaration() {
  const [lang,      setLang]      = useState("KK");
  const [theme,     setTheme]     = useState("dark");
  const [showText,  setShowText]  = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [lightbox,  setLightbox]  = useState(false);
  const [photoScale,setPhotoScale]= useState(1);
  const { isMobile } = useScreenSize();

  /* Lightbox CSS — бир рет */
  useEffect(() => {
    if (document.getElementById("decl-lb-css")) return;
    const s = document.createElement("style");
    s.id = "decl-lb-css";
    s.textContent = `
      .lb-overlay { position:fixed; inset:0; z-index:9999; background:rgba(0,0,0,.92); display:flex; flex-direction:column; align-items:center; justify-content:center; animation:lbIn .25s ease; backdrop-filter:blur(6px); }
      @keyframes lbIn { from{opacity:0} to{opacity:1} }
      .lb-img { transition:transform .3s cubic-bezier(.25,.46,.45,.94); transform-origin:center; max-width:92vw; max-height:78vh; object-fit:contain; user-select:none; display:block; }
      .lb-ctrl { display:flex; align-items:center; gap:10px; margin-top:20px; }
      .lb-btn { width:44px; height:44px; border-radius:50%; background:rgba(255,255,255,.10); border:1px solid rgba(255,255,255,.22); color:#fff; font-size:19px; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:background .2s; }
      .lb-btn:hover { background:rgba(180,130,0,.38); border-color:rgba(180,130,0,.65); }
      .lb-close { position:absolute; top:18px; right:18px; width:46px; height:46px; border-radius:50%; background:rgba(255,255,255,.08); border:1px solid rgba(255,255,255,.18); color:#fff; font-size:22px; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:background .2s; }
      .lb-close:hover { background:rgba(220,38,38,.55); }
      .lb-scale { color:rgba(255,255,255,.55); font-size:12px; min-width:36px; text-align:center; font-family:monospace; }
      .photo-wrap .photo-btns { opacity:0; transition:opacity .3s; }
      .photo-wrap:hover .photo-btns { opacity:1; }
    `;
    document.head.appendChild(s);
  }, []);

  /* Фото жоллары — public/images/sovereignty/ қалтасынан */
  const PHOTO = "/images/sovereignty/resolution (1).jpg";   // 2-секция: оригинал фото
  const COVER = "/images/sovereignty/declaration-cover.jpg"; // 5-секция: китап обложкасы

  /* Резолюция тексти — 4 тил */
  const RESOLUTION = {
    KK: `ТӨРТИНШИ СЕССИЯ. ҚАРАҚАЛПАҚСТАН АССР ЖОҚАРЫ КЕҢЕСИНИҢ ОН ЕКИНШИ ШАҚЫРЫҚ.

ҚАРАР
Қарақалпақстан АССР Жоқарғы Кеңеси Қарақалпақстан Республикасының мәмлекетлик «Суверенитети ҳаққындағы Декларация» туўралы.

Қарақалпақстан Автономиялы Совет Социалистлик Республикасының Жоқарғы Кеңеси ҚАРАР ЕТЕДИ:

1. Қарақалпақстан Совет Республикасының мәмлекетлик суверенитети ҳаққындағы Декларация тастыйықлансын.

2. СССР Конституциясының 108-статьясына ҳәм «СССР Аўқамы менен федерация субьектлери арасындағы ўәкилликлердиң шегараланыўы ҳаққында»ғы СССР Нызамының 6-статьясына муўапық СССР халық депутатларының IV сезди Қарақалпақстан Совет Республикасының статусын тастыйықлаўды сорайды.

Қарақалпақстан Республикасы Жоқарғы Кеңесиниң Баслығы 
Т.Ешимбетова
Нөкис қаласы, 1990-жыл 14-декабрь. No 82/XII`,

    RU: `ЧЕТВЁРТАЯ СЕССИЯ Верховного Совета КАРАКАЛПАКСКОЙ АССР ДВЕНАДЦАТОГО СОЗЫВА

ПОСТАНОВЛЕНИЕ
Верховного Совета Каракалпакской АССР «О Декларации о государственном суверенитете Советской Республики Каракалпакстан»

Верховный Совет Каракалпакской Автономной Советской Социалистической Республики ПОСТАНОВЛЯЕТ:

1. Утвердить Декларацию о государственном суверенитете Советской Республики Каракалпакстан.

2. В соответствии со статьей 108 Конституции СССР и статьей 6 Закона СССР "О разграничении полномочий между Союзом СССР и субъектами федерации," IV Съезд народных депутатов СССР просит утвердить статус Советской Республики Каракалпакстан.

Председатель Верховного Совета СР Каракалпакстан
Т. Ешимбетова
г. Нукус, 14 декабря 1990 года. No 82/XII`,

    EN: `FOURTH SESSION The Supreme Council of the Karakalpak Autonomous Soviet Socialist Republic
THE TWELFTH CONVOCATION

RESOLUTION
The Supreme Council of the Karakalpak Autonomous Soviet Socialist Republic. On the Declaration of State Sovereignty of the Soviet Republic of Karakalpakstan.

THE Supreme Council of the Karakalpak Autonomous Soviet Socialist Republic DECIDES:

1. To approve the Declaration of State Sovereignty of the Soviet Republic of Karakalpakstan.

2. In accordance with Article 108 of the Constitution of the USSR and Article 6 of the Law of the USSR "On the Delimitation of Powers between the Union of the USSR and the Subjects of the Federation," the IV Congress of People's Deputies of the USSR requests to approve the status of the Soviet Republic of Karakalpakstan.

Chairman of the Supreme Council of the Republic of Karakalpakstan
T. Yeshimbetovа
Nukus, December 14, 1990. No 82/XII`,

    PL: `CZWARTA SESJA Rady Najwyższej KARAKALPAKSKIEJ ASSR
DWUNASTEGO ZWOŁANIA

UCHWAŁA
Rady Najwyższej KARAKALPAKSKIEJ ASSR O deklaracji suwerenności państwowej Republiki Radzieckiej Karakalpakstanu.

Rada Najwyższa Karakalpak Autonomicznej Socjalistycznej Republiki Radzieckiej POSTANAWIA:

1. Zatwierdzenie deklaracji o suwerenności państwowej Republiki Radzieckiej Karakalpakstanu.

2. Zgodnie z artykułem 108 Konstytucji ZSRR i Artykułem 6 ustawy ZSRR o rozgraniczeniu uprawnień między Związkiem ZSRR a podmiotami Federacji, IV Zjazd Deputowanych narodowych ZSRR prosi o zatwierdzenie statusu Republiki Radzieckiej Karakalpakstanu.

Przewodniczący Rady Najwyższej SR Karakalpakstan
T. Jeszimbetova
Nukus, 14 grudnia 1990. No 82/XII`,
  };

  const c = getC(theme);
  const t = TRANS[lang] || TRANS.KK;
  const art = DECL_ARTICLES[lang] || DECL_ARTICLES.KK;
  const article = ARTICLE[lang] || ARTICLE.KK;

  useEffect(() => {
    window.scrollTo({ top:0, behavior:"smooth" });
    injectStyles();

    /* ── Тема детекциясы — ҳәр түрли детальлар ── */
    const readTheme = () => {
      const html  = document.documentElement;
      const body  = document.body;
      // 1) data-theme атрибуты
      const dt = html.getAttribute("data-theme") || body?.getAttribute("data-theme");
      if (dt === "light") { setTheme("light"); return; }
      if (dt === "dark")  { setTheme("dark");  return; }
      // 2) class: "light" ямаса "dark"
      const hcl = html.classList, bcl = body?.classList;
      if (hcl.contains("light") || bcl?.contains("light")) { setTheme("light"); return; }
      if (hcl.contains("dark")  || bcl?.contains("dark"))  { setTheme("dark");  return; }
      // 3) localStorage
      const stored = localStorage.getItem("theme") ||
                     localStorage.getItem("color-mode") ||
                     localStorage.getItem("vite-ui-theme");
      if (stored === "light") { setTheme("light"); return; }
      if (stored === "dark")  { setTheme("dark");  return; }
      // 4) System preference
      if (window.matchMedia?.("(prefers-color-scheme: light)").matches) setTheme("light");
      else setTheme("dark");
    };

    readTheme();

    /* HTML + Body classList / attr өзгергенде */
    const observer = new MutationObserver(readTheme);
    const opts = { attributes:true, attributeFilter:["class","data-theme"] };
    observer.observe(document.documentElement, opts);
    if (document.body) observer.observe(document.body, opts);

    /* localStorage өзгергенде (басқа tab ямаса код) */
    window.addEventListener("storage", readTheme);

    /* system preference өзгергенде */
    const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
    mq?.addEventListener?.("change", readTheme);

    return () => {
      observer.disconnect();
      window.removeEventListener("storage", readTheme);
      mq?.removeEventListener?.("change", readTheme);
    };
  }, []);

  useEffect(() => {
    const onLang  = (e) => { if (e.detail?.lang)  setLang(e.detail.lang); };
    const onTheme = (e) => { if (e.detail?.theme) setTheme(e.detail.theme); };
    const onKey   = (e) => { if (e.key === "Escape") { setLightbox(false); setPhotoScale(1); } };
    window.addEventListener("languageChange", onLang);
    window.addEventListener("themeChange",    onTheme);
    window.addEventListener("keydown",        onKey);
    return () => {
      window.removeEventListener("languageChange", onLang);
      window.removeEventListener("themeChange",    onTheme);
      window.removeEventListener("keydown",        onKey);
    };
  }, []);

  const px = isMobile ? "16px" : "24px";
  const pbSm = isMobile ? "50px" : "80px";

  /* ════════════════════════════
     RENDER
  ════════════════════════════ */
  return (
    <div style={{ minHeight:"100vh", background: c.bg, color: c.text, fontFamily:PLF, transition:"background .4s, color .4s" }}>

      {/* ── 1. HERO ── */}
      <section className="hero-pad" style={{ paddingTop: isMobile ? "92px" : "130px", paddingBottom: isMobile ? "52px" : "90px", paddingLeft:px, paddingRight:px, textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:"40px", left:"50%", transform:"translateX(-50%)", width: isMobile ? "300px" : "650px", height:"400px", borderRadius:"50%", background:`radial-gradient(ellipse,${c.goldBg.replace("0.07","0.10")} 0%,transparent 68%)`, pointerEvents:"none" }} />
        <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", width: isMobile ? "160px" : "280px", height:"3px", background:`linear-gradient(90deg,transparent,${c.gold},#f5c842,${c.gold},transparent)`, opacity:.75 }} />

        <div style={{ maxWidth:"900px", margin:"0 auto", position:"relative" }} className="fu">
          <div style={{ display:"inline-flex", alignItems:"center", gap:"8px", padding:"6px 18px", borderRadius:"999px", border:`1px solid ${c.goldBrd}`, background: c.goldBg, color: c.gold, fontSize: isMobile ? "10px" : "11px", fontWeight:700, letterSpacing:"0.10em", textTransform:"uppercase", marginBottom:"28px", fontFamily:CIN }}>
            <span>⚖</span><span>{t.tag}</span>
          </div>
          <h1 className="gold-shimmer" style={{ fontSize: isMobile ? "clamp(28px,8vw,40px)" : "clamp(36px,6vw,72px)", fontWeight:900, lineHeight:1.08, marginBottom:"20px", letterSpacing:"-1px", fontFamily:CIN }}>
            {t.title}
          </h1>
          <p style={{ fontSize: isMobile ? "14px" : "clamp(15px,2.2vw,19px)", color: c.muted, lineHeight:1.7, maxWidth:"660px", margin:"0 auto 34px" }}>
            {t.sub}
          </p>
          <div style={{ display:"flex", justifyContent:"center", gap:"10px", flexWrap:"wrap" }}>
            <StatPill icon="📅" label={t.date} c={c} />
            <StatPill icon="📜" label={t.articles} c={c} />
            <StatPill icon="🏛" label="186 депутат" c={c} />
            <StatPill icon="📍" label="Нөкис" c={c} />
          </div>
        </div>
      </section>

      {/* ── 2. ОРИГИНАЛ ФОТО ── */}
      <section style={{ padding:`0 ${px} ${pbSm}`, maxWidth:"1000px", margin:"0 auto" }}>
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"24px" }}>
          <div className="photo-wrap" style={{ position:"relative", maxWidth: isMobile ? "320px" : "560px", width:"100%" }}>
            <div style={{ padding:"3px", borderRadius:"16px", background:"linear-gradient(135deg,#c9930a 0%,#6b4c00 30%,#f5c842 50%,#6b4c00 70%,#c9930a 100%)", boxShadow:`0 0 50px rgba(180,130,0,0.22), 0 20px 60px rgba(0,0,0,.70)` }}>
              <div style={{ padding:"5px", borderRadius:"14px", background: c.bg }}>
                <div style={{ borderRadius:"10px", overflow:"hidden", position:"relative" }}>
                  <img src={PHOTO} alt="Турсын Ешімбетова 1990" style={{ width:"100%", display:"block", filter: imgLoaded ? "sepia(8%) contrast(1.06)" : "blur(14px) sepia(30%)", transition:"filter 0.7s", cursor:"zoom-in" }} onLoad={() => setImgLoaded(true)} onClick={() => setLightbox(true)} />
                  <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"70px", background:`linear-gradient(to top, ${c.bg}cc 0%, transparent 100%)` }} />
                </div>
              </div>
            </div>
            {[{ top:"-8px",left:"-8px" },{ top:"-8px",right:"-8px" },{ bottom:"-8px",left:"-8px" },{ bottom:"-8px",right:"-8px" }].map((pos,i) => (
              <div key={i} style={{ position:"absolute", ...pos, width:"20px", height:"20px", border:`2px solid ${c.gold}`, borderRadius:"4px", background: c.bg, zIndex:2 }} />
            ))}

            {/* Hover кнопкалары */}
            <div className="photo-btns" style={{ position:"absolute", top:"14px", right:"14px", display:"flex", gap:"8px", zIndex:10 }}>
              {/* Үлкейтиў */}
              <button onClick={() => setLightbox(true)}
                style={{ width:"38px", height:"38px", borderRadius:"50%", background:"rgba(0,0,0,.62)", border:"1px solid rgba(255,255,255,.25)", color:"#fff", fontSize:"17px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}
                title="Үлкейту / Zoom">
                🔍
              </button>
              {/* Жүклеў */}
              <a href={PHOTO} download="resolution-1990.jpg"
                style={{ width:"38px", height:"38px", borderRadius:"50%", background:"rgba(0,0,0,.62)", border:"1px solid rgba(255,255,255,.25)", color:"#fff", fontSize:"17px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", textDecoration:"none" }}
                title="Жүктеу / Download">
                ⬇
              </a>
            </div>
          </div>

          {/* Фото астындағы жазыў */}
          <div style={{ textAlign:"center", maxWidth:"520px" }}>
            <div style={{ display:"inline-block", padding:"5px 14px", borderRadius:"999px", background: c.goldBg, border:`1px solid ${c.goldBrd}`, color: c.gold, fontSize:"10px", fontWeight:700, letterSpacing:"0.13em", textTransform:"uppercase", marginBottom:"12px", fontFamily:CIN }}>
              Оригинал ҳүжжет
            </div>
            <p style={{ fontSize: isMobile ? "13px" : "15px", color: c.muted, fontWeight:500, lineHeight:1.65, marginBottom:"6px" }}>{t.photoCapt}</p>
            <p style={{ fontSize:"13px", color: c.sub, marginBottom:"4px", fontFamily:CIN }}>{t.photoSub}</p>
            <p style={{ fontSize:"12px", color: c.sub, fontFamily:CIN }}>{t.session}</p>
          </div>

          {/* Таңланған тилдеги ресмий резолюция тексти */}
          <div style={{ maxWidth: isMobile ? "340px" : "600px", width:"100%" }}>
            <div style={{
              borderRadius:"14px",
              border:`1px solid ${c.goldBrd}`,
              background: c.bgCard,
              padding: isMobile ? "20px 18px" : "28px 36px",
            }}>
              {/* Тақырып */}
              <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"18px" }}>
                <div style={{ width:"3px", height:"32px", background: c.gold, borderRadius:"2px", flexShrink:0 }} />
                <div>
                  <div style={{ fontSize:"10px", fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color: c.gold, fontFamily:CIN }}>
                    {lang === "KK" ? "Ресмий Қарар · № 82/XII"
                     : lang === "RU" ? "Официальное Постановление · № 82/XII"
                     : lang === "EN" ? "Official Resolution · No. 82/XII"
                     : "Oficjalna Uchwała · Nr 82/XII"}
                  </div>
                </div>
              </div>
              {/* Резолюция тексти */}
              <pre style={{
                margin:0,
                whiteSpace:"pre-wrap",
                fontFamily: PLF,
                fontSize: isMobile ? "13px" : "14.5px",
                lineHeight:1.85,
                color: c.artTxt,
                letterSpacing:"0.01em",
              }}>
                {RESOLUTION[lang]}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. МАКАЛА — 4 тилдеги аналитикалық текст ── */}
      <section style={{ padding:`0 ${px} ${pbSm}`, maxWidth:"860px", margin:"0 auto" }}>
        <div style={{ padding: isMobile ? "24px 20px" : "40px 48px", borderRadius:"16px", border:`1px solid ${c.goldBrd}`, background: c.bgCard }}>

          {/* Макала тақырыбы */}
          <h2 style={{ fontSize: isMobile ? "17px" : "20px", fontWeight:700, color: c.text, fontFamily:CIN, letterSpacing:"0.02em", lineHeight:1.35, marginBottom:"20px" }}>
            {article.title}
          </h2>

          {/* Кириспе */}
          <p style={{ fontSize: isMobile ? "14px" : "16px", lineHeight:1.88, color: c.muted, fontFamily:PLF, marginBottom:"16px" }}>
            {article.intro}
          </p>

          {/* Суверенитет силтемеси */}
          <a href={article.sovereignLink.url} target="_blank" rel="noopener noreferrer" className="ext-link"
            style={{ display:"inline-flex", alignItems:"center", gap:"6px", padding:"8px 18px", borderRadius:"8px", background: c.goldBg, border:`1px solid ${c.goldBrd}`, color: c.gold, fontSize:"13px", fontWeight:600, fontFamily:CIN, letterSpacing:"0.05em", textDecoration:"none", marginBottom:"20px" }}>
            <span>→</span><span>{article.sovereignLink.text}</span>
          </a>

          {/* Жуўап */}
          <p style={{ fontSize: isMobile ? "14px" : "16px", lineHeight:1.88, color: c.sectionT, fontFamily:PLF, marginBottom:"36px", fontStyle:"italic" }}>
            {article.answer}
          </p>

          {/* Бөлимлер */}
          <div style={{ borderTop:`1px solid ${c.border}`, paddingTop:"32px" }}>
            {article.sections.map((sec, i) => (
              <ArticleSection key={i} sec={sec} c={c} isMobile={isMobile} />
            ))}
          </div>

          {/* Жуўмақ */}
          <div style={{ borderTop:`1px solid ${c.border}`, paddingTop:"24px", marginTop:"8px" }}>
            <p style={{ fontSize: isMobile ? "14px" : "15px", lineHeight:1.88, color: c.muted, fontFamily:PLF, marginBottom:"16px" }}>
              {article.closing}
            </p>
            <div style={{ padding:"14px 18px", borderRadius:"10px", background: c.goldBg, border:`1px solid ${c.goldBrd}` }}>
              <p style={{ margin:0, fontSize: isMobile ? "13px" : "14px", color: c.gold, fontFamily:CIN, letterSpacing:"0.04em" }}>
                {article.cta}
              </p>
              <p style={{ margin:"6px 0 0", fontSize: isMobile ? "14px" : "15px", fontWeight:700, color: c.text, fontFamily:PLF }}>
                {article.ctaTag}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. ДЕКЛАРАЦИЯ ТЕКСТИ — 12 статья ── */}
      <section style={{ padding:`0 ${px} ${pbSm}`, maxWidth:"900px", margin:"0 auto" }}>
        <button className="decl-btn" onClick={() => setShowText(!showText)}
          style={{ width:"100%", padding: isMobile ? "16px 18px" : "20px 28px", borderRadius:"14px", border:`1px solid ${c.goldBrd}`, background: showText ? c.goldBg : c.bgCard, color: c.gold, fontSize: isMobile ? "14px" : "16px", fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between", gap:"12px", fontFamily:CIN, letterSpacing:"0.03em" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
            <div style={{ width: isMobile ? "34px" : "40px", height: isMobile ? "34px" : "40px", borderRadius:"10px", background: c.goldBg, border:`1px solid ${c.goldBrd}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"17px", flexShrink:0 }}>📄</div>
            <span>{showText ? t.hideBtn : t.textBtn}</span>
          </div>
          <span style={{ fontSize:"17px", transition:"transform .35s", transform: showText ? "rotate(180deg)" : "rotate(0deg)", flexShrink:0 }}>▼</span>
        </button>

        {showText && (
          <div className="decl-scroll fu text-inner" style={{ marginTop:"10px", borderRadius:"14px", border:`1px solid ${c.goldBrd}`, background: c.bgCard, maxHeight: isMobile ? "500px" : "680px", overflowY:"auto", padding: isMobile ? "20px 16px" : "36px 44px" }}>

            {/* International Law Badge */}
            <div style={{ display:"flex", alignItems:"flex-start", gap:"12px", padding:"14px 18px", borderRadius:"10px", background: c.law, border:`1px solid ${c.lawBrd}`, marginBottom:"28px" }}>
              <div style={{ width:"30px", height:"30px", borderRadius:"50%", background: c.law, border:`1px solid ${c.lawBrd}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"15px", flexShrink:0 }}>✓</div>
              <div>
                <div style={{ fontSize:"12px", fontWeight:700, color: c.lawText, letterSpacing:"0.06em", fontFamily:CIN }}>{t.lawBadge}</div>
                <div style={{ fontSize:"11px", color: c.sub, marginTop:"3px", fontFamily:CIN }}>{t.lawDesc}</div>
              </div>
            </div>

            {/* Кириспе */}
            <p style={{ fontSize: isMobile ? "14px" : "16px", lineHeight:1.88, color: c.preambTxt, fontFamily:PLF, fontStyle:"italic", borderBottom:`1px solid ${c.border}`, paddingBottom:"24px", marginBottom:"28px" }}>
              {art.preamble}
            </p>

            {/* 12 статья */}
            {art.items.map((text, i) => (
              <ArticleBlock key={i} num={i+1} text={text} c={c} isMobile={isMobile} />
            ))}

            {/* Аяқлаў */}
            <div style={{ marginTop:"28px", paddingTop:"18px", borderTop:`1px solid ${c.border}`, textAlign:"center" }}>
              <p style={{ fontSize:"13px", color: c.sub, fontStyle:"italic", margin:0, fontFamily:PLF }}>{art.footer}</p>
            </div>
          </div>
        )}
      </section>

      {/* ── 5. PDF КИТАП (Constitution стили) ── */}
      <section style={{ padding:`0 ${px} ${isMobile ? "80px" : "130px"}`, position:"relative" }}>
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:"600px", height:"360px", borderRadius:"50%", background:`radial-gradient(ellipse,${c.goldBg.replace("0.07","0.06")} 0%,transparent 70%)`, pointerEvents:"none" }} />

        <div style={{ maxWidth:"1100px", margin:"0 auto", position:"relative" }}>
          <div style={{ textAlign:"center", marginBottom: isMobile ? "44px" : "60px" }}>
            <h2 style={{ fontSize: isMobile ? "22px" : "clamp(26px,4vw,44px)", fontWeight:900, color: c.text, marginBottom:"10px", letterSpacing:"-0.5px", fontFamily:CIN }}>
              {t.declTitle}
            </h2>
          </div>

          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"24px" }}>
            <DeclBookCover lang={lang} coverImg={COVER} c={c} isMobile={isMobile} />
            <p style={{ textAlign:"center", color: c.sub, fontSize:"12px", letterSpacing:"0.04em", fontFamily:CIN }}>
              {" "}
              <a href="https://www.karakalpakvoice.org" target="_blank" rel="noopener noreferrer"
                style={{ color:"#2563eb", textDecoration:"none" }}>
                karakalpakvoice.org
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ── LIGHTBOX МОДАЛЫ ── */}
      {lightbox && (
        <div className="lb-overlay" onClick={(e) => { if (e.target === e.currentTarget) { setLightbox(false); setPhotoScale(1); } }}>
          <button className="lb-close" onClick={() => { setLightbox(false); setPhotoScale(1); }}>✕</button>

          {/* Суўрет */}
          <img
            src={PHOTO}
            alt="Resolution 1990"
            className="lb-img"
            style={{ transform:`scale(${photoScale})` }}
            draggable={false}
          />

          {/* Басқарыў кнопкалары */}
          <div className="lb-ctrl">
            <button className="lb-btn" title="Киширейтиў" onClick={() => setPhotoScale(s => Math.max(0.5, +(s - 0.25).toFixed(2)))}>−</button>
            <span className="lb-scale">{Math.round(photoScale * 100)}%</span>
            <button className="lb-btn" title="Үлкейтиў" onClick={() => setPhotoScale(s => Math.min(4, +(s + 0.25).toFixed(2)))}>+</button>
            <button className="lb-btn" title="Қалпына келтириў" onClick={() => setPhotoScale(1)} style={{ fontSize:"14px" }}>↺</button>
            <a href={PHOTO} download="resolution-1990.jpg" className="lb-btn" title="Жүктеу" style={{ textDecoration:"none" }}>⬇</a>
          </div>

          {/* Нусқаўлар */}
          <p style={{ color:"rgba(255,255,255,.35)", fontSize:"12px", marginTop:"12px", fontFamily:"monospace" }}>
            ESC / click outside — close &nbsp;|&nbsp; + / − — zoom
          </p>
        </div>
      )}
    </div>
  );
}