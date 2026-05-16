import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Volume2, VolumeX, Play, Pause,
  Download, ExternalLink, Share2, Check,
  BookOpen, Scale, AlertTriangle, ChevronDown,
  Info, X, FileText, Clock, Shield
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   АЎДАРМАЛАР
───────────────────────────────────────────────────────────── */
const T = {
  RU: {
    badge: "Юридический Мониторинг · karakalpakvoice.org",
    quote: "«Суверенитет сохраняется не в документах, а в памяти народа.»",
    heroTitle: "СУВЕРЕНИТЕТ УКРАДЕН\nИЛИ СТИРАЕТСЯ ЗАКОННЫМ ПУТЁМ?",
    heroSub: "Декларация 1990 года — незыблемый фундамент нашей государственности. Но защищает ли сегодняшняя Конституция этот фундамент или служит его уничтожению?",
    readFull: "Читать полную статью",
    stat2019: "Конституция 2019",
    stat2021: "Конституция 2021",
    pctLabel: "противоречий с Декларацией",
    audioTitle: "Аудио-введение",
    audioSub: "Прослушайте краткое введение перед чтением",
    audioNote: "~4 минуты · Доступно на 4 языках",
    analysisTitle: "Сравнительный анализ",
    analysisSub: "Статья-за-статьёй: Декларация 1990 vs Конституция 2019/2021",
    analysisNote: "Посмотреть таблицу анализа",
    analysisBtn: "Открыть таблицу анализа",
    analysisDesc: "Выберите полный сравнительный анализ по статьям:",
    open2019: "Открыть Анализ 2019",
    open2021: "Открыть Анализ 2021",
    diag1: "🔴 Прямое противоречие",
    diag2: "🟡 Условное противоречие",
    diag3: "🟢 Без противоречий",
    pdfTitle: "Конституции Каракалпакстана",
    pdfSub: "Официальные документы для скачивания",
    pdfHistoric: "Исторический архив",
    pdf2019label: "Конституция",
    pdf2021label: "Конституция",
    pdfDownload: "Скачать PDF",
    pdfOpen: "Открыть",
    pdfPreparing: "Готовится",
    gandemianTitle: "Гендемианский договор (1873)",
    gandemianSub: "Исторический документ, подтверждающий государственность каракалпакского народа задолго до образования Узбекистана.",
    gandemianBtn: "Читать оригинал",
    gandemianMore: "Подробнее о договоре",
    glossaryTitle: "Юридический словарь",
    glossarySub: "Ключевые термины для понимания анализа",
    shareTitle: "Поделиться статьёй",
    shareSub: "Отправьте ссылку журналистам, дипломатам или правозащитникам",
    shareCopy: "Скопировать ссылку",
    shareCopied: "Скопировано!",
    shareArticle: "Поделиться статьёй",
    scroll: "Листайте вниз",
    terms: [
      { word: "Суверенитет", def: "Право народа самостоятельно управлять своей территорией без вмешательства извне." },
      { word: "Де-факто", def: "«На деле» — ситуация, существующая на практике, но не признанная официально." },
      { word: "Аннексия", def: "Незаконное присоединение территории или поглощение суверенных прав другим государством." },
      { word: "Ратификация", def: "Официальное утверждение международного договора, делающее его юридически обязательным." },
      { word: "ИККПР", def: "Международный пакт о гражданских и политических правах 1966 года — ключевой документ ООН о самоопределении народов." },
      { word: "Декларация", def: "Официальное провозглашение суверенитета, принятое 186 депутатами 14 декабря 1990 года." },
      { word: "Legal gap", def: "Правовое несоответствие — разрыв между декларируемыми нормами и их реальным применением." },
      { word: "Автономия", def: "Право на самоуправление в рамках более крупного государства, включая законодательство и управление." },
    ],
    archiveDocs: [
      { year: "1934", title: "Первая Конституция ККАССР", desc: "Первый официальный документ советской автономии", lang: "RU" },
      { year: "1937", title: "Конституция сталинской эпохи", desc: "Обновление по образцу Конституции СССР 1936 года", lang: "RU" },
      { year: "1978", title: "Последняя советская Конституция", desc: "Действовала до Декларации 1990 года", lang: "RU" },
    ],
  },
  KK: {
    badge: "Юридикалық Мониторинг · karakalpakvoice.org",
    quote: "«Суверенитет — ҳүжжетте емес, халықтың есинде сақланады.»",
    heroTitle: "СУВЕРЕНИТЕТ УРЛАНҒАН БА,\nЯМАСА НЫЗАМЛЫ ТҮРДЕ ӨШИРИЛИП АТЫР МА?",
    heroSub: "1990-жылғы Декларация — мәмлекетшилигимиздиң бузылмас фундаменти. Бирақ бүгинги Конституция сол фундаментти қорғап тур ма, яки оны жоқ етиўге хызмет етип атыр ма?",
    readFull: "Толық мақаланы оқыў",
    stat2019: "2019 Конституция",
    stat2021: "2021 Конституция",
    pctLabel: "Декларацияға қайшылық",
    audioTitle: "Аудио кириспе",
    audioSub: "Оқыўдан алдын қысқаша кириспени тыңлаң",
    audioNote: "~4 минут · 4 тилде",
    analysisTitle: "Салыстырмалы анализ",
    analysisSub: "Статьяма-статья: Декларация 1990 vs Конституция 2019/2021",
    analysisNote: "Анализ кестесин көриў",
    analysisBtn: "Анализ таблицасын ашыў",
    analysisDesc: "Статьялар бойынша толық салыстырмалы анализди таңлаң:",
    open2019: "2019 Анализди ашыў",
    open2021: "2021 Анализди ашыў",
    diag1: "🔴 Тиккелей қайшы",
    diag2: "🟡 Шәртлы қайшы",
    diag3: "🟢 Қайшылық жоқ",
    pdfTitle: "Қарақалпақстан Конституциялары",
    pdfSub: "Ресмий ҳүжжетлер — жүклеп алыўға болады",
    pdfHistoric: "Тарийхый архив",
    pdf2019label: "Конституция",
    pdf2021label: "Конституция",
    pdfDownload: "PDF жүклеў",
    pdfOpen: "Ашыў",
    pdfPreparing: "Таярланып атыр",
    gandemianTitle: "Гендемиан Шәртнамасы (1873)",
    gandemianSub: "Өзбекстан дүзилместен бурын Қарақалпақ халқының мәмлекетшилигин тастыйықлайтуғын тарийхый ҳүжжет.",
    gandemianBtn: "Түпнусқасын оқыў",
    gandemianMore: "Шәртнама туўралы толық оқыў",
    glossaryTitle: "Юридикалық Сөзлик",
    glossarySub: "Анализди түсиниў ушын тийкарғы терминлер",
    shareTitle: "Мақаланы бөлисиў",
    shareSub: "Журналистлерге, дипломатларға, ҳуқық қорғаўшыларға силтемени жибериң",
    shareCopy: "Силтемени көшириў",
    shareCopied: "Көширилди!",
    shareArticle: "Мақаланы бөлисиў",
    scroll: "Төмен қараң",
    terms: [
      { word: "Суверенитет", def: "Халықтың өз аймағын сыртқы тәсирсиз өзи басқарыў ҳуқықы." },
      { word: "Де-факто", def: "«Ис жүзинде» — ресмий тән алынбаса да, әмелде бар болған жағдай." },
      { word: "Аннексия", def: "Басқа мәмлекеттиң суверен ҳуқықларын нызамсыз өзлестирип алыў." },
      { word: "Ратификация", def: "Халықаралық шәртнаманы юридикалық мәжбүрий ететуғын ресмий тастыйықлаў." },
      { word: "ИККПР", def: "1966-жылғы Халықаралық Пухаралық ҳәм Сиясий Ҳуқықлар Пакти — халықлардың өзин-өзи белгилеўин беккемлейтуғын БМШ ҳүжжети." },
      { word: "Декларация", def: "1990-жыл 14-декабрьде 186 депутат қол қойған ресмий суверенитеттиң жәрияланыўы." },
      { word: "Legal gap", def: "Ҳуқықый бослық — жәрияланған нормалар ҳәм оларды нақ қолланыў арасындағы айырмашылық." },
      { word: "Автономия", def: "Ири мәмлекет ишинде — нызамшылық ҳәм басқарыўды ҳәм нормалар арқалы өзин-өзи басқарыў ҳуқықы." },
    ],
    archiveDocs: [
      { year: "1934", title: "ҚҚАССР-дың биринши Конституциясы", desc: "Советлик автономияның биринши ресмий ҳүжжети", lang: "RU" },
      { year: "1937", title: "Сталин дәўириндеги Конституция", desc: "1936-жылғы СССР Конституциясы үлгисинде жаңаланған", lang: "RU" },
      { year: "1978", title: "Соңғы советлик Конституция", desc: "1990-жылғы Декларацияға шекем ҳәрекет еткен", lang: "RU" },
    ],
  },
  EN: {
    badge: "Legal Monitoring · karakalpakvoice.org",
    quote: "\"Sovereignty is preserved not in documents, but in the memory of the people.\"",
    heroTitle: "SOVEREIGNTY: STOLEN\nOR ERASED BY LAW?",
    heroSub: "The 1990 Declaration is the unshakeable foundation of our statehood. But does today's Constitution protect this foundation — or is it being used to dismantle it?",
    readFull: "Read the full article",
    stat2019: "Constitution 2019",
    stat2021: "Constitution 2021",
    pctLabel: "contradictions with Declaration",
    audioTitle: "Audio Introduction",
    audioSub: "Listen to a brief introduction before reading",
    audioNote: "~4 minutes · Available in 4 languages",
    analysisTitle: "Comparative Analysis",
    analysisSub: "Article by article: Declaration 1990 vs Constitution 2019/2021",
    analysisNote: "View the analysis table",
    analysisBtn: "Open Analysis Table",
    analysisDesc: "Select a full comparative analysis by article:",
    open2019: "Open 2019 Analysis",
    open2021: "Open 2021 Analysis",
    diag1: "🔴 Direct contradiction",
    diag2: "🟡 Conditional contradiction",
    diag3: "🟢 No contradiction",
    pdfTitle: "Constitutions of Karakalpakstan",
    pdfSub: "Official documents available for download",
    pdfHistoric: "Historical Archive",
    pdf2019label: "Constitution",
    pdf2021label: "Constitution",
    pdfDownload: "Download PDF",
    pdfOpen: "Open",
    pdfPreparing: "In preparation",
    gandemianTitle: "Treaty of Gеndemian (1873)",
    gandemianSub: "A historical document confirming the statehood of the Karakalpak people long before the formation of Uzbekistan.",
    gandemianBtn: "Read the original",
    gandemianMore: "Learn more about the treaty",
    glossaryTitle: "Legal Glossary",
    glossarySub: "Key terms for understanding the analysis",
    shareTitle: "Share this article",
    shareSub: "Send the link to journalists, diplomats or human rights defenders",
    shareCopy: "Copy link",
    shareCopied: "Copied!",
    shareArticle: "Share article",
    scroll: "Scroll down",
    terms: [
      { word: "Sovereignty", def: "The right of a people to govern their territory without external interference." },
      { word: "De facto", def: "\"In practice\" — a situation that exists in reality but is not officially recognized." },
      { word: "Annexation", def: "The unlawful appropriation of sovereign rights or territory by another state." },
      { word: "Ratification", def: "The formal approval of an international treaty, making it legally binding." },
      { word: "ICCPR", def: "International Covenant on Civil and Political Rights (1966) — the key UN document on the self-determination of peoples." },
      { word: "Declaration", def: "The official proclamation of sovereignty signed by 186 deputies on 14 December 1990." },
      { word: "Legal gap", def: "A legal inconsistency — a gap between declared norms and their actual application." },
      { word: "Autonomy", def: "The right to self-governance within a larger state, including legislation and administration." },
    ],
    archiveDocs: [
      { year: "1934", title: "First Constitution of the KKASSR", desc: "First official document of Soviet autonomy", lang: "RU" },
      { year: "1937", title: "Constitution of the Stalin era", desc: "Updated following the 1936 USSR Constitution", lang: "RU" },
      { year: "1978", title: "Last Soviet Constitution", desc: "Remained in force until the 1990 Declaration", lang: "RU" },
    ],
  },
  PL: {
    badge: "Monitoring Prawny · karakalpakvoice.org",
    quote: '\u201eSuwerenno\u015b\u0107 zachowuje si\u0119 nie w dokumentach, lecz w pami\u0119ci narodu.\u201d',
    heroTitle: "SUWERENNOŚĆ SKRADZIONA\nCZY WYMAZYWANA PRAWNIE?",
    heroSub: "Deklaracja z 1990 roku to niewzruszony fundament naszej państwowości. Ale czy dzisiejsza Konstytucja chroni ten fundament — czy służy jego zniszczeniu?",
    readFull: "Przeczytaj pełny artykuł",
    stat2019: "Konstytucja 2019",
    stat2021: "Konstytucja 2021",
    pctLabel: "sprzeczności z Deklaracją",
    audioTitle: "Wprowadzenie audio",
    audioSub: "Posłuchaj krótkiego wprowadzenia przed czytaniem",
    audioNote: "~4 minuty · Dostępne w 4 językach",
    analysisTitle: "Analiza porównawcza",
    analysisSub: "Artykuł po artykule: Deklaracja 1990 vs Konstytucja 2019/2021",
    analysisNote: "Zobacz tabelę analizy",
    analysisBtn: "Otwórz tabelę analizy",
    analysisDesc: "Wybierz pełną analizę porównawczą według artykułów:",
    open2019: "Otwórz Analizę 2019",
    open2021: "Otwórz Analizę 2021",
    diag1: "🔴 Bezpośrednia sprzeczność",
    diag2: "🟡 Warunkowa sprzeczność",
    diag3: "🟢 Brak sprzeczności",
    pdfTitle: "Konstytucje Karakalpakstanu",
    pdfSub: "Oficjalne dokumenty dostępne do pobrania",
    pdfHistoric: "Archiwum historyczne",
    pdf2019label: "Konstytucja",
    pdf2021label: "Konstytucja",
    pdfDownload: "Pobierz PDF",
    pdfOpen: "Otwórz",
    pdfPreparing: "W przygotowaniu",
    gandemianTitle: "Traktat Gеndemiański (1873)",
    gandemianSub: "Historyczny dokument potwierdzający państwowość narodu karakałpackiego na długo przed powstaniem Uzbekistanu.",
    gandemianBtn: "Czytaj oryginał",
    gandemianMore: "Więcej o traktacie",
    glossaryTitle: "Słownik prawny",
    glossarySub: "Kluczowe terminy do zrozumienia analizy",
    shareTitle: "Udostępnij artykuł",
    shareSub: "Wyślij link dziennikarzom, dyplomatom lub obrońcom praw człowieka",
    shareCopy: "Kopiuj link",
    shareCopied: "Skopiowano!",
    shareArticle: "Udostępnij artykuł",
    scroll: "Przewiń w dół",
    terms: [
      { word: "Suwerenność", def: "Prawo narodu do samodzielnego zarządzania swoim terytorium bez ingerencji z zewnątrz." },
      { word: "De facto", def: "\"W praktyce\" — sytuacja istniejąca w rzeczywistości, lecz nieuznana oficjalnie." },
      { word: "Aneksja", def: "Bezprawne zawłaszczenie suwerennych praw lub terytorium przez inne państwo." },
      { word: "Ratyfikacja", def: "Formalne zatwierdzenie traktatu międzynarodowego, nadające mu moc prawną." },
      { word: "MPPOiP", def: "Międzynarodowy Pakt Praw Obywatelskich i Politycznych z 1966 roku — kluczowy dokument ONZ o samostanowieniu narodów." },
      { word: "Deklaracja", def: "Oficjalne proklamowanie suwerenności, podpisane przez 186 deputowanych 14 grudnia 1990 roku." },
      { word: "Legal gap", def: "Luka prawna — rozbieżność między deklarowanymi normami a ich praktycznym stosowaniem." },
      { word: "Autonomia", def: "Prawo do samorządności w ramach większego państwa, obejmujące legislację i administrację." },
    ],
    archiveDocs: [
      { year: "1934", title: "Pierwsza Konstytucja KKASSR", desc: "Pierwszy oficjalny dokument autonomii radzieckiej", lang: "RU" },
      { year: "1937", title: "Konstytucja epoki stalinowskiej", desc: "Zaktualizowana według wzoru Konstytucji ZSRR z 1936 r.", lang: "RU" },
      { year: "1978", title: "Ostatnia Konstytucja radziecka", desc: "Obowiązywała do Deklaracji z 1990 roku", lang: "RU" },
    ],
  },
};

/* ─────────────────────────────────────────────────────────────
   PDF ДЕРЕКТЕРІ
───────────────────────────────────────────────────────────── */
const PDF_DATA = {
  2019: {
    KK: "/documents/constitution/2019/── kk/constitution_2019_kk.pdf",
    RU: "/documents/constitution/2019/── ru/constitution_ru_2019.pdf",
    EN: "/documents/constitution/2019/── en/constitution_en_2019.pdf",
    PL: "/documents/constitution/2019/── pl/constitution_pl_2019.pdf",
  },
  2021: {
    KK: "/documents/constitution/2021/──kk/constitution_2021_kk.pdf",
    RU: "/documents/constitution/2021/——ru/constitution_2021_ru.pdf",
    EN: "/documents/constitution/2021/——en/constitution_2021_en.pdf",
    PL: "/documents/constitution/2021/——pl/constitution_2021_pl.pdf",
  },
  ARCHIVE: {
    1934: "/documents/constitution/2020/── ru/Кaraкalpaкstan__Konst_1934.pdf",
    1937: "/documents/constitution/2020/── ru/Karakalpaksan_Konst_1937.pdf",
    1978: "/documents/constitution/2020/── ru/Karakalpakstan__Konst_1978.pdf",
  }
};

/* ─────────────────────────────────────────────────────────────
   SCROLL REVEAL ХУК
───────────────────────────────────────────────────────────── */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } },
      { threshold }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return [ref, on];
}

/* ─────────────────────────────────────────────────────────────
   ПРОГРЕСС БАР
───────────────────────────────────────────────────────────── */
function Bar({ pct, color, label, delay, active, theme }) {
  return (
    <div style={{ marginBottom: "12px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "5px" }}>
        <span style={{ color: theme === "dark" ? "rgba(255,255,255,0.6)" : "#475569" }}>{label}</span>
        <span style={{ color, fontWeight: 700 }}>{pct}%</span>
      </div>
      <div style={{ height: "6px", borderRadius: "99px", background: theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)", overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: "99px", background: color,
          width: active ? `${pct}%` : "0%",
          transition: `width 1.2s ease ${delay}ms`
        }} />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   TOOLTIP КОМПОНЕНТІ
───────────────────────────────────────────────────────────── */
function Tooltip({ word, def, theme }) {
  const [open, setOpen] = useState(false);

  return (
    <div 
      style={{ position: "relative", width: "100%" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "16px 20px",
        borderRadius: "12px",
        cursor: "default",
        background: theme === "dark" ? "rgba(255,255,255,0.03)" : "#ffffff",
        border: theme === "dark" ? "1px solid rgba(255,255,255,0.1)" : "1px solid #e2e8f0",
        color: "#3b82f6",
        fontSize: "15px",
        fontWeight: 700,
        transition: "all 0.3s ease",
        boxShadow: open ? "0 10px 25px -5px rgba(59, 130, 246, 0.2)" : "none",
        transform: open ? "translateY(-2px)" : "translateY(0)",
        borderColor: open ? "#3b82f6" : (theme === "dark" ? "rgba(255,255,255,0.1)" : "#e2e8f0")
      }}>
        <Info size={16} />
        {word}
      </div>
      
      {open && (
        <div style={{
          position: "absolute",
          bottom: "100%",
          left: "0",
          width: "100%",
          zIndex: 100,
          marginBottom: "12px",
          padding: "16px",
          borderRadius: "14px",
          background: theme === "dark" ? "#1a1a2e" : "#ffffff",
          border: "2px solid #3b82f6",
          boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
          color: theme === "dark" ? "rgba(255,255,255,0.9)" : "#1e293b",
          fontSize: "14px",
          lineHeight: "1.6",
          animation: "fadeInUp 0.2s ease-out"
        }}>
          <strong style={{ color: "#3b82f6", display: "block", marginBottom: "6px", fontSize: "16px" }}>
            {word}
          </strong>
          {def}
          {/* Tooltip стрелкасы */}
          <div style={{
            position: "absolute",
            top: "100%",
            left: "20px",
            width: "0",
            height: "0",
            borderLeft: "8px solid transparent",
            borderRight: "8px solid transparent",
            borderTop: "8px solid #3b82f6"
          }} />
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   3D PDF КИТАП
───────────────────────────────────────────────────────────── */
function PdfBook({ year, path, title, lang, isDanger, theme }) {
  const [hover, setHover] = useState(false);

  // Суурет мәнзилин импортлаў ямаса тиккелей жолын көрсетиў
  const coverImage = "/images/constitution.jpg";

  return (
    <div
      className="group relative cursor-pointer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ perspective: "1200px" }}
      onClick={() => window.open(path, "_blank")}
    >
      {/* Артқы жарық эффекти (Glow) */}
      <div
        className={`absolute -inset-6 rounded-full blur-[40px] transition-all duration-700 ${
          hover ? "opacity-100 scale-110" : "opacity-0 scale-90"
        } ${isDanger ? "bg-red-600/40" : "bg-blue-500/30"}`}
      />
      
      {/* Китаптың тийкарғы корпусы */}
      <div
        className={`relative w-44 h-60 transition-all duration-500 shadow-[10px_10px_30px_rgba(0,0,0,0.5)] rounded-r-2xl rounded-l-sm overflow-hidden border border-white/10 ${
          hover ? "rotate-y-[-28deg] translate-x-3 scale-105" : "rotate-y-0 translate-x-0"
        }`}
        style={{
          transformStyle: "preserve-3d",
          boxShadow: hover
            ? `25px 25px 50px rgba(0,0,0,0.7), 0 0 40px ${isDanger ? "rgba(220,38,38,0.3)" : "rgba(37,99,235,0.3)"}`
            : "10px 10px 25px rgba(0,0,0,0.5)"
        }}
      >
        {/* Сиз жиберген сууретти китаптың тысы (обложка) етип орнатыў */}
        <img 
          src={coverImage} 
          alt={`Constitution ${year}`}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Суўрет үстиндеги жыл жазыўы (Ортаға көтерилди) */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
        
        {/* bottom-4 класы flex және justify-center кластарына ауыстырылды */}
        <div className="absolute inset-0 flex items-center justify-center pt-16">
          <div className="text-3xl font-black text-white drop-shadow-[0_2px_8px_rgba(0,0,0,1)] tracking-tighter">
            {year}
          </div>
        </div>

        {/* Жылтырақ эффект (Reflections) */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>

      {/* Төменги жақтағы "Ашыў" жазыўы */}
      <div className={`mt-6 text-center transition-all duration-500 ${hover ? "opacity-100 translate-y-0" : "opacity-0"}`}>
        <div className="text-xs font-black tracking-widest uppercase" style={{ color: theme === "dark" ? "#fff" : "#1e293b" }}>
          {lang === "KK" ? "Ашыў" : "Open PDF"}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   БАС КОМПОНЕНТ
───────────────────────────────────────────────────────────── */
export default function Constitution() {
  const [lang, setLang] = useState("RU");
  const [theme, setTheme] = useState(
    document.documentElement.classList.contains("dark") ? "dark" : "light"
  );
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const audioRef = useRef(null);

  const t = T[lang] || T.RU;

  // Жарық/Қараңғы режим үшін CSS айнымалылары
  const c = {
    bg:        theme === "dark" ? "#06060a"   : "#ffffff",
    text:      theme === "dark" ? "#f1f5f9"   : "#0f172a",
    textMuted: theme === "dark" ? "rgba(255,255,255,0.5)" : "#64748b",
    textSub:   theme === "dark" ? "rgba(255,255,255,0.35)" : "#94a3b8",
    cardBg:    theme === "dark" ? "rgba(255,255,255,0.02)" : "#f8fafc",
    cardBorder:theme === "dark" ? "rgba(255,255,255,0.07)" : "#e2e8f0",
    heroBg:    theme === "dark" ? "#06060a"   : "#0f172a",
    heroText:  "#ffffff",
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const handleLang = (e) => { if (e.detail?.lang) setLang(e.detail.lang); };
    const handleTheme = () => {
      setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    };
    window.addEventListener("languageChange", handleLang);
    const observer = new MutationObserver(handleTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => {
      window.removeEventListener("languageChange", handleLang);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setAudioPlaying(false);
    }
  }, [lang]);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (audioPlaying) {
      audioRef.current.pause();
      setAudioPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setAudioPlaying(true);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const fade = (on, delay = 0) => ({
    opacity: on ? 1 : 0,
    transform: on ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
  });

  const [heroRef,  heroOn]  = useReveal(0.1);
  const [audioRef2, audioOn] = useReveal(0.1);
  const [diagRef,  diagOn]  = useReveal(0.1);
  const [pdfRef,   pdfOn]   = useReveal(0.1);
  const [ganRef,   ganOn]   = useReveal(0.1);
  const [glossRef, glossOn] = useReveal(0.1);
  const [shareRef, shareOn] = useReveal(0.1);

  const articlePath = `/symbols/analysis-constitution`;

  return (
    <div style={{
      minHeight: "100vh",
      background: c.bg,
      color: c.text,
      fontFamily: "'DM Sans','Helvetica Neue',sans-serif",
      overflowX: "hidden",
      transition: "all 0.3s ease"
    }}>

      {/* 1. HERO — әрқашан қараңғы фон */}
      <section style={{
        position: "relative", minHeight: "100vh",
        display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        padding: "80px 24px 60px",
        background: "linear-gradient(135deg, #06060a 0%, #0f172a 100%)"
      }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "-5%", left: "15%", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)" }} />
          <div style={{ position: "absolute", bottom: "10%", right: "5%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(220,38,38,0.05) 0%, transparent 70%)" }} />
          <div style={{ position: "absolute", inset: 0, opacity: 0.02, backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "34px 34px" }} />
        </div>

        <div ref={heroRef} style={{ position: "relative", zIndex: 10, maxWidth: "880px", width: "100%", textAlign: "center" }}>
          <div style={{ ...fade(heroOn, 0), display: "inline-flex", alignItems: "center", gap: "8px", padding: "5px 14px", borderRadius: "999px", marginBottom: "24px", background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)", color: "#60a5fa", fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>
            <Scale size={11} /> {t.badge}
          </div>
          <p style={{ ...fade(heroOn, 80), fontSize: "clamp(13px,1.5vw,16px)", color: "rgba(255,255,255,0.45)", fontStyle: "italic", marginBottom: "20px" }}>
            {t.quote}
          </p>
          <h1 style={{ ...fade(heroOn, 150), fontSize: "clamp(2.4rem,7vw,5.5rem)", fontWeight: 900, lineHeight: 1.06, letterSpacing: "-0.03em", color: "#fff", whiteSpace: "pre-line", marginBottom: "22px" }}>
            {t.heroTitle}
          </h1>
          <p style={{ ...fade(heroOn, 250), fontSize: "clamp(15px,1.8vw,18px)", color: "rgba(255,255,255,0.55)", maxWidth: "640px", margin: "0 auto 40px", lineHeight: 1.7 }}>
            {t.heroSub}
          </p>
          <div style={{ ...fade(heroOn, 320), display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", marginBottom: "40px" }}>
            {[
              { label: t.stat2020, pct: "50.0%", color: "#f87171", bg: "rgba(220,38,38,0.08)", border: "rgba(220,38,38,0.2)" },
              { label: t.stat2026, pct: "58.6%", color: "#fb923c", bg: "rgba(234,88,12,0.08)", border: "rgba(234,88,12,0.2)" },
            ].map((s, i) => (
              <div key={i} style={{ padding: "20px 28px", borderRadius: "16px", textAlign: "center", background: s.bg, border: `1px solid ${s.border}`, minWidth: "160px" }}>
                <div style={{ fontSize: "10px", fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "6px" }}>{s.label}</div>
                <div style={{ fontSize: "48px", fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.pct}</div>
                <div style={{ fontSize: "11px", color: s.color, opacity: 0.7, marginTop: "4px" }}>{t.pctLabel}</div>
              </div>
            ))}
          </div>
          <div style={fade(heroOn, 400)}>
            <a
              href={articlePath}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "14px 32px", borderRadius: "999px", background: "#2563eb", color: "#fff", fontWeight: 700, fontSize: "15px", textDecoration: "none", boxShadow: "0 0 40px rgba(37,99,235,0.35)", transition: "all 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "#1d4ed8"}
              onMouseLeave={e => e.currentTarget.style.background = "#2563eb"}
            >
              <BookOpen size={17} />
              {t.readFull}
              <ArrowRight size={17} />
            </a>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: "28px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", color: "rgba(255,255,255,0.25)", fontSize: "11px", animation: "bounce 2s infinite" }}>
          {t.scroll} <ChevronDown size={14} />
        </div>
      </section>

      {/* 2. АУДИО */}
      <section style={{ padding: "60px 24px", background: c.bg }}>
        <div ref={audioRef2} style={{ ...fade(audioOn), maxWidth: "680px", margin: "0 auto", padding: "32px 36px", borderRadius: "20px", background: c.cardBg, border: `1px solid ${c.cardBorder}`, display: "flex", gap: "24px", alignItems: "center", flexWrap: "wrap" }}>
          <button
            onClick={toggleAudio}
            style={{ flexShrink: 0, width: "64px", height: "64px", borderRadius: "50%", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", background: audioPlaying ? "#dc2626" : "#2563eb", boxShadow: audioPlaying ? "0 0 24px rgba(220,38,38,0.4)" : "0 0 24px rgba(37,99,235,0.4)", transition: "all 0.3s" }}
            aria-label={audioPlaying ? "Pause" : "Play"}
          >
            {audioPlaying ? <Pause size={26} color="#fff" /> : <Play size={26} color="#fff" style={{ marginLeft: "3px" }} />}
          </button>
          <div style={{ flex: 1, minWidth: "200px" }}>
            <div style={{ fontWeight: 700, color: c.text, marginBottom: "4px", fontSize: "16px" }}>{t.audioTitle}</div>
            <div style={{ color: c.textMuted, fontSize: "13px", marginBottom: "6px" }}>{t.audioSub}</div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", color: c.textSub, fontSize: "11px" }}>
              <Clock size={11} /> {t.audioNote}
            </div>
          </div>
          <audio ref={audioRef} src={`/audio/constitution_${lang.toLowerCase()}.mp3`} onEnded={() => setAudioPlaying(false)} />
        </div>
      </section>

      {/* 3. АНАЛИЗ ДИАГРАММАСЫ */}
      <section style={{ padding: "20px 24px 80px", background: theme === "dark" ? "transparent" : "#f1f5f9" }}>
        <div ref={diagRef} style={{ ...fade(diagOn), maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(22px,3vw,32px)", fontWeight: 800, color: c.text, marginBottom: "6px" }}>{t.analysisTitle}</h2>
          <p style={{ color: c.textMuted, marginBottom: "32px", fontSize: "14px" }}>{t.analysisSub}</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "28px" }}>
            {/* 2020 */}
            <div style={{ padding: "28px", borderRadius: "18px", background: c.cardBg, border: `1px solid ${c.cardBorder}`, boxShadow: theme === "dark" ? "none" : "0 4px 12px rgba(0,0,0,0.05)" }}>
              <div style={{ fontSize: "12px", fontWeight: 700, color: "#ef4444", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "16px", display: "flex", alignItems: "center", gap: "6px" }}>
                <AlertTriangle size={13} /> 2019
              </div>
              <Bar pct={20.0} color="#ef4444" label={t.diag1} delay={200} active={diagOn} theme={theme} />
              <Bar pct={30.0} color="#f59e0b" label={t.diag2} delay={350} active={diagOn} theme={theme} />
              <Bar pct={50.0} color="#22c55e" label={t.diag3} delay={500} active={diagOn} theme={theme} />
            </div>
            {/* 2026 */}
            <div style={{ padding: "28px", borderRadius: "18px", background: c.cardBg, border: `1px solid ${c.cardBorder}`, boxShadow: theme === "dark" ? "none" : "0 4px 12px rgba(0,0,0,0.05)" }}>
              <div style={{ fontSize: "12px", fontWeight: 700, color: "#f97316", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "16px", display: "flex", alignItems: "center", gap: "6px" }}>
                <AlertTriangle size={13} /> 2021
              </div>
              <Bar pct={26.4} color="#ef4444" label={t.diag1} delay={300} active={diagOn} theme={theme} />
              <Bar pct={32.2} color="#f59e0b" label={t.diag2} delay={450} active={diagOn} theme={theme} />
              <Bar pct={41.4} color="#22c55e" label={t.diag3} delay={600} active={diagOn} theme={theme} />
            </div>
          </div>

          {/* БАТЫРМАЛАР */}
          <div style={{ padding: "32px 24px", borderRadius: "20px", background: c.cardBg, border: `1px solid ${c.cardBorder}`, display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontWeight: 800, color: "#d97706", fontSize: "15px", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {t.analysisBtn}
              </div>
              <div style={{ color: c.textMuted, fontSize: "12px" }}>{t.analysisDesc}</div>
            </div>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
              <Link to="/constitution-analysis-2019" style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "12px 28px", borderRadius: "12px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#ef4444", fontSize: "14px", fontWeight: 800, textDecoration: "none", transition: "all 0.3s" }}>
                <FileText size={16} /> {t.open2019}
              </Link>
              <Link to="/constitution-analysis-2021" style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "12px 28px", borderRadius: "12px", background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.3)", color: "#f97316", fontSize: "14px", fontWeight: 800, textDecoration: "none", transition: "all 0.3s" }}>
                <FileText size={16} /> {t.open2021}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PDF КИТАПТАР */}
      <section style={{ padding: "40px 24px 100px", position: "relative", background: c.bg }}>
        <div ref={pdfRef} style={{ ...fade(pdfOn), maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ marginBottom: "60px" }}>
            <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 900, color: c.text, marginBottom: "12px" }}>{t.pdfTitle}</h2>
            <p style={{ color: c.textMuted, fontSize: "16px", maxWidth: "600px" }}>{t.pdfSub}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 justify-items-center mb-16">
            <PdfBook year="1934" path={PDF_DATA.ARCHIVE[1934]} title="First Autonomous" lang={lang} isDanger={false} theme={theme} />
            <PdfBook year="1937" path={PDF_DATA.ARCHIVE[1937]} title="Stalin Era" lang={lang} isDanger={false} theme={theme} />
            <PdfBook year="1978" path={PDF_DATA.ARCHIVE[1978]} title="Soviet Era" lang={lang} isDanger={false} theme={theme} />
          </div>
          <div className="flex flex-col md:flex-row gap-12 justify-center items-center">
            <PdfBook year="2019" path={PDF_DATA[2019][lang]} title="Sovereign Era" lang={lang} isDanger={true} theme={theme} />
            <PdfBook year="2021" path={PDF_DATA[2021][lang]} title="Current Update" lang={lang} isDanger={true} theme={theme} />
          </div>
        </div>
      </section>

      {/* 5. ГЕНДЕМИАН */}
      <section style={{ padding: "20px 24px 80px", background: theme === "dark" ? "transparent" : "#f8fafc" }}>
        <div ref={ganRef} style={{ ...fade(ganOn), maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ padding: "36px 40px", borderRadius: "20px", background: theme === "dark" ? "linear-gradient(135deg, rgba(109,40,217,0.1) 0%, rgba(59,130,246,0.07) 100%)" : "linear-gradient(135deg, rgba(109,40,217,0.06) 0%, rgba(59,130,246,0.04) 100%)", border: theme === "dark" ? "1px solid rgba(139,92,246,0.25)" : "1px solid rgba(139,92,246,0.2)", position: "relative", overflow: "hidden" }}>
            <div
  style={{
    position: "absolute",
    right: "20px",
    top: "16px",
    fontSize: "80px",
    fontWeight: 900,
    lineHeight: 1,
    userSelect: "none",

    // базалық түс
    color: theme === "dark" ? "rgba(139,92,246,0.12)" : "rgba(109,40,217,0.08)",

    // glow/жарық әсер
    textShadow:
      theme === "dark"
        ? "0 0 18px rgba(139,92,246,0.35), 0 0 46px rgba(59,130,246,0.18)"
        : "0 0 18px rgba(109,40,217,0.18), 0 0 46px rgba(59,130,246,0.10)",

    // animation
    animation: "flicker1873 2.6s ease-in-out infinite",
    opacity: theme === "dark" ? 0.95 : 0.85,
  }}
>
  1873
</div>
            <div style={{ fontSize: "28px", marginBottom: "10px" }}>📜</div>
            <h3 style={{ fontSize: "clamp(18px,2.5vw,24px)", fontWeight: 800, color: theme === "dark" ? "#c4b5fd" : "#6d28d9", marginBottom: "10px" }}>{t.gandemianTitle}</h3>
            <p style={{ color: c.textMuted, fontSize: "14px", lineHeight: 1.7, marginBottom: "24px", maxWidth: "520px" }}>{t.gandemianSub}</p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <a href="https://www.hist.msu.ru/ER/Etext/FOREIGN/hiva.htm" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "11px 20px", borderRadius: "999px", background: "#7c3aed", color: "#fff", fontWeight: 700, fontSize: "13px", textDecoration: "none" }}>
                <ExternalLink size={14} /> {t.gandemianBtn}
              </a>
              <Link
  to="/documents/history/gendemian-treaty"
  style={{
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "11px 20px",
    borderRadius: "999px",
    background: theme === "dark" ? "rgba(124,58,237,0.12)" : "rgba(124,58,237,0.08)",
    border: "1px solid rgba(124,58,237,0.3)",
    color: theme === "dark" ? "#c4b5fd" : "#7c3aed",
    fontWeight: 600,
    fontSize: "13px",
    cursor: "pointer",
    textDecoration: "none"
  }}
>
  {t.gandemianMore}
</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ЮРИДИКАЛЫҚ СӨЗЛИК */}
      <section style={{ padding: "40px 24px 100px", background: c.bg }}>
        <div ref={glossRef} style={{ ...fade(glossOn), maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "44px" }}>
            <h2 style={{ fontSize: "clamp(24px,3vw,32px)", fontWeight: 800, color: c.text, marginBottom: "10px" }}>
              {t.glossaryTitle}
            </h2>
            <p style={{ color: c.textMuted, fontSize: "15px" }}>{t.glossarySub}</p>
          </div>

          {/* 4x2 Grid структурасы */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", 
            gap: "16px" 
          }}>
            {(t.terms || []).map(term => (
              <Tooltip key={term.word} word={term.word} def={term.def} theme={theme} />
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes flicker1873 {
          0%, 100% {
            opacity: 0.72;
            transform: translateZ(0) scale(1);
            filter: drop-shadow(0 0 0px rgba(139,92,246,0));
          }
          10% {
            opacity: 0.95;
            filter: drop-shadow(0 0 16px rgba(139,92,246,0.28));
          }
          20% {
            opacity: 0.78;
            filter: drop-shadow(0 0 8px rgba(139,92,246,0.18));
          }
          35% {
            opacity: 1;
            transform: translateZ(0) scale(1.01);
            filter: drop-shadow(0 0 22px rgba(59,130,246,0.22));
          }
          55% {
            opacity: 0.86;
            filter: drop-shadow(0 0 12px rgba(139,92,246,0.20));
          }
          72% {
            opacity: 0.98;
            filter: drop-shadow(0 0 24px rgba(59,130,246,0.25));
          }
        }

        @keyframes bounce {
          0%,100% { transform: translateX(-50%) translateY(0); }
          50%      { transform: translateX(-50%) translateY(7px); }
        }
        .rotate-y-\\[-28deg\\] { transform: rotateY(-28deg); }
        .rotate-y-0 { transform: rotateY(0deg); }
      `}</style>
    </div>
  );
}