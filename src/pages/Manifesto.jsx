import React, { useState, useEffect } from 'react';
import { Share2, Send, Facebook, Link as LinkIcon, Twitter, Youtube, Instagram, MessageSquare, X, Download, ZoomIn } from 'lucide-react';

const Manifesto = () => {
  const [lang, setLang] = useState("RU"); 
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("karakalpak-voice-theme") === "dark");
  
  // ✅ ЖАҢА: Фотоны үлкейту үшін state (жағдай)
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Комментарий логикасы
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    { id: 1, user: "Азамат", date: "20.01.2026", text: "Бул тарийхый баслама! Аумет тилеймен." },
    { id: 2, user: "Gulnara", date: "20.01.2026", text: "Very important platform for our future." }
  ]);

  useEffect(() => {
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

  const addComment = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    const newComment = {
      id: Date.now(),
      user: "Guest User",
      date: new Date().toLocaleDateString(),
      text: comment
    };
    setComments([newComment, ...comments]);
    setComment('');
  };

  // --- ТЕК МАНИФЕСТ ТЕКСТЛЕРИ ---
  const translations = {
    RU: {
      title: "МАНИФЕСТ КАРАКАЛПАКСКОГО НАРОДА",
      subtitle: "«Мы — Народ, Которого Невозможно Стереть»",
      content: [
        "Мы — не тень великой истории. Мы — её источник.",
        "Мы — потомки Тех, кто стоял у истоков Великой Тартарии.",
        "Мы — Каракалпаки. Когда другие народы только писали летописи, мы пели эпосы длиной в поколения. Когда другие боролись за имя, мы защищали целые миры. Когда исчезали царства, мы несли традицию сквозь пески и бури, сквозь изгнания и забвение.",
        "Мы не числом — мы духом. Не во власти — а в правде. Не в подчинении — а в Суверенитете. Мы первыми подняли знамя свободы среди развалин империй. 14 декабря 1990 года Каракалпакстан стал Суверенной республикой — не прося, а утверждая.",
        "Мы не спрашивали разрешения — мы напомнили миру, что существуем, и имеем право выбирать свой путь. Наш эпос — это не просто поэзия. Это оружие памяти. Наша культура — это не фольклор, а цивилизационная ДНК, пережившая века. Наши земли — не окраина, а центр Великой Истории.",
        "Нас называли «Чёрными клобуками», потому что мы были щитом Руси. Нас хотели стереть из карт, но на глобусах императриц значилось: TARTARIA MAGNUM — земля Каракалпаков. Нас перекраивали, переименовывали, но имя наше сильнее времён.",
        "Мы помним, кто мы. Мы знаем, чьё дело продолжаем. Мы не забыли голос степи, шорох канатов, звон сабель, дыхание огня. Мы — дети пустыни и неба. Мы — хранители эпоса и чести. Мы — живая Тартария. И нас больше не загонят в молчание.",
        "Мы встанем — не для мести, а для правды. Мы поднимем флаг — не против кого-то, а за себя. Мы скажем:"
      ],
      quote: "«Мы были. Мы есть. И мы будем. Мы — Каракалпаки. Народ, которого невозможно стереть»",
      author: "Рахметулла Аймуратов",
      shareTitle: 'Свяжитесь с нами',
      commentTitle: 'Обсуждение',
      placeholder: 'Напишите ваше мнение...',
      send: 'Отправить'
    },
    KK: {
      title: "ҚАРАҚАЛПАҚ ХАЛҚЫНЫҢ МАНИФЕСТИ",
      subtitle: "«Биз – Өшириў Мүмкин Емес Халықпыз»",
      content: [
        "Биз – уллы тарийхтың көлеңкеси емеспиз. Биз – оның булағымыз.",
        "Биз – Уллы Тартарияның басында турғанлардың урпағымыз.",
        "Биз – Қарақалпақлармыз.",
        "Басқа халықлар енди ғана жылнама жазып атырғанында, биз әўладтан-әўладқа жететуғын дәстанларды жырлағанбыз. Басқалар аты ушын гүресип атырғанда, биз пүткил әлемлерди қорғағанбыз. Патшалықлар жоғалып атырғанда, биз дәстүримизди қумлар ҳәм даўыллар арасынан, сүргин ҳәм умыт болыў ишинен алып өттик.",
        "Биз сан менен емес – руўх пененбиз. Ҳәкимиятта емес – ҳақыйқаттамыз. Бағыныўда емес – Суверенитеттемиз. Империялар қыйраған жерде азатлық байрағын биринши болып көтерген де бизбиз.",
        "1990-жылы 14-декабрьде Қарақалпақстан Суверенли республика болды – жалынып емес, тастыйықлап. Биз рухсат сорамадық – биз дүньяға бар екенлигимизди ҳәм өз жолымызды таңлаў ҳуқықымыз бар екенин еслеттик.",
        "Бизиң дәстанымыз – тек ғана поэзия емес. Бул – ядымыздың қуралы. Бизиң мәдениятымыз – фольклор емес, ал әсирлерден аман өткен цивилизациялық ДНК. Бизиң жеримиз – шет аймақ емес, ал Уллы Тарийхтың орайы.",
        "Бизди «Қара бөриклилер» (Чёрные клобуки) деп атаған, себеби биз Русьтың қалқаны болғанбыз. Бизди карталардан өширип тасламақшы болды, бирақ императрицалардың глобусларында: TARTARIA MAGNUM – Қарақалпақлар жери деп жазылған еди. Бизди бөлекледи, атымызды өзгертти, бирақ бизиң атымыз ўақыттан күшлирек.",
        "Биз ким екенимизди ядымызда сақлаймыз. Кимниң исин даўам етип атырғанымызды билемиз. Биз дала даўысын, арқанлардың сықырлаўын, қылышлардың сыңғырын, оттың демин умытпадық.",
        "Биз – шөлдиң ҳәм аспанның перзентлеримиз. Биз – дәстан ҳәм ар-намыстың сақшыларымыз. Биз – тири Тартариямыз. Ҳәм енди бизди ҳешким үнсиз қалыўға мәжбүрлей алмайды.",
        "Биз орнымыздан турамыз – өш алыў ушын емес, ҳақыйқат ушын. Биз байрақты көтеремиз – биреўге қарсы емес, өзимиз ушын. Биз былай деймиз:"
      ],
      quote: "«Биз болғанбыз. Биз бармыз. Ҳәм биз боламыз. Биз – Қарақалпақлармыз. Өшириў мүмкин емес халықпыз».",
      author: "Рахметулла Аймуратов",
      shareTitle: 'Биз бенен байланысың',
      commentTitle: 'Пикирлер',
      placeholder: 'Пикириңизди жазың...',
      send: 'Жибериў'
    },
    EN: {
      title: "MANIFESTO OF THE KARAKALPAK PEOPLE",
      subtitle: "«We Are A People Who Cannot Be Erased»",
      content: [
        "We are not a shadow of great history. We are its source.",
        "We are the descendants of Those who stood at the origins of the Great Tartary.",
        "We are Karakalpaks. When other nations were just writing chronicles, we sang epics that were generations long. When others fought for the name, we defended entire worlds. When the kingdoms disappeared, we carried the tradition through the sands and storms, through exile and oblivion.",
        "We are not in numbers, we are in spirit. Not in power, but in truth. Not in submission, but in Sovereignty. We were the first to raise the banner of freedom among the ruins of empires. On December 14, 1990, Karakalpakstan became a Sovereign Republic — not by asking, but by affirming.",
        "We didn't ask for permission — we reminded the world that we exist and have the right to choose our path. Our epic is not just poetry. It's a weapon of memory. Our culture is not folklore, but civilizational DNA that has survived the centuries. Our lands are not the outskirts, but the center of a Great History.",
        "We were called the \"Black Hoods\" because we were the shield of Russia. They wanted to erase us from the maps, but the empresses' globes said: TARTARIA MAGNUM is the land of the Karakalpaks. We were reshaped and renamed, but our name is stronger than the times.",
        "We remember who we are. We know whose business we are continuing. We have not forgotten the voice of the steppe, the rustle of ropes, the clink of sabres, the breath of fire. We are children of the desert and the sky. We are the guardians of the epic and honor. We are a living Tartary. And we won't be silenced anymore.",
        "We will stand up—not for revenge, but for the truth. We will raise the flag — not against anyone, but for ourselves. We'll say:"
      ],
      quote: "«We were. We are. And we will. We are Karakalpaks. The people who cannot be erased»",
      author: "Rakhmetulla Аymuratov",
      shareTitle: 'Connect with us',
      commentTitle: 'Discussion',
      placeholder: 'Write your thoughts...',
      send: 'Send'
    },
    PL: {
      title: "MANIFEST LUDU KARAKALPAK",
      subtitle: "«Jesteśmy Narodem, Którego Nie Można Wymazać»",
      content: [
        "Nie jesteśmy cieniem wielkiej historii. Jesteśmy jej źródłem.",
        "Jesteśmy potomkami tych, którzy stali u początków Wielkiej Tartarii.",
        "Jesteśmy Karakalpakami. Kiedy inne narody pisały tylko kroniki, śpiewaliśmy eposy o długości pokoleń. Kiedy inni walczyli o imię, chroniliśmy całe światy. Kiedy znikały królestwa, przenosiliśmy tradycję przez piaski i burze, przez wygnania i zapomnienie.",
        "Nie jesteśmy liczbą-jesteśmy duchem. Nie w mocy — ale w prawdzie. Nie w podporządkowaniu — ale w suwerenności. Jako pierwsi wznieśliśmy sztandar wolności wśród ruin imperiów. 14 grudnia 1990 r. Karakalpakstan stał się suwerenną Republiką — nie prosząc, ale twierdząc.",
        "Nie prosiliśmy o pozwolenie — przypomnialiśmy światu, że istniejemy i mamy prawo wybrać własną ścieżkę. Nasza epopeja to nie tylko poezja. To broń pamięci. Nasza kultura nie jest folklorem, ale cywilizacyjnym DNA, które przetrwało wieki. Nasze ziemie nie są obrzeża, ale centrum wielkiej historii.",
        "Nazywano nas \"czarnymi klobukami\", ponieważ byliśmy tarczą Rosji. Chcieliśmy wymazać nas z map, ale na globusach cesarzowych było napisane: TARTARIA MAGNUM — Kraina Karakalpaków. Zostaliśmy przemalowani, przemianowani, ale nasze imię jest silniejsze niż czasy.",
        "Pamiętamy, kim jesteśmy. Wiemy, czyja sprawa trwa. Nie zapomnieliśmy głosu stepu, szelestu Lin, dzwonienia szabli, oddechu ognia. Jesteśmy dziećmi pustyni i nieba. Jesteśmy strażnikami eposu i honoru. Jesteśmy żywą Tartarią. I nie będziemy już zmuszani do milczenia.",
        "Wstaniemy-nie dla zemsty, ale dla prawdy. Podniesiemy flagę - nie przeciwko komuś, ale dla siebie. Powiemy:"
      ],
      quote: "«Byliśmy. Jesteśmy. I będziemy. Jesteśmy Karakalpakami. Naród, którego nie można wymazać»",
      author: "Rachmetulla Aymuratov",
      shareTitle: 'Połącz się z nami',
      commentTitle: 'Dyskusja',
      placeholder: 'Napisz swoją opinię...',
      send: 'Wyślij'
    }
  };

  const t = translations[lang] || translations["RU"];

  return (
    <div style={{ 
      backgroundColor: isDarkMode ? '#111827' : '#f9fafb', 
      color: isDarkMode ? '#f3f4f6' : '#111827', 
      minHeight: '100vh',
      padding: '120px 5% 80px',
      transition: 'background 0.3s ease, color 0.3s ease'
    }}>
      <style>{`
        .manifesto-container {
          max-width: 900px; margin: 0 auto 80px; padding: 60px 40px;
          background: ${isDarkMode ? 'rgba(255,255,255,0.03)' : '#ffffff'};
          border: 1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : '#e5e7eb'};
          border-radius: 4px; box-shadow: 0 20px 40px -10px rgba(0,0,0,0.2); position: relative;
        }
        .manifesto-container::before {
          content: ''; position: absolute; top: 20px; left: 20px; right: 20px; bottom: 20px;
          border: 1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : '#f3f4f6'}; pointer-events: none;
        }
        .manifesto-title { 
          font-family: serif; font-size: clamp(1.8rem, 5vw, 3rem); font-weight: 900; 
          text-align: center; margin-bottom: 20px; letter-spacing: 2px; text-transform: uppercase;
          color: ${isDarkMode ? '#e5e7eb' : '#111827'};
        }
        .manifesto-subtitle {
          font-family: serif; font-size: clamp(1.2rem, 3vw, 1.8rem); font-weight: 600;
          text-align: center; margin-bottom: 50px; font-style: italic; color: #3b82f6;
        }
        .manifesto-text {
          font-family: 'Georgia', serif; font-size: 1.25rem; line-height: 1.9; margin-bottom: 25px;
          text-align: justify; opacity: 0.95;
        }
        .manifesto-quote {
          margin-top: 50px; font-size: 1.5rem; font-weight: bold; text-align: center; padding: 30px;
          border-top: 2px solid #3b82f6; border-bottom: 2px solid #3b82f6; font-style: italic;
          background: ${isDarkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)'};
        }
        .manifesto-author {
          text-align: right; font-weight: bold; margin-top: 20px; font-size: 1.1rem; color: #6b7280;
        }
      `}</style>

      {/* ✅ MANIFESTO SECTION */}
      <div className="manifesto-container">
        <h1 className="manifesto-title">{t.title}</h1>
        <h2 className="manifesto-subtitle">{t.subtitle}</h2>
        
        {/* ✅ ФОТО (Интерактивті: Үлкейту және Басу) */}
        <div 
          className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 mb-10 aspect-video cursor-pointer group"
          onClick={() => setIsModalOpen(true)} // Басқанда модальды ашу
        >
          <img 
            src="/images/manifesto1.jpg" 
            alt="Manifesto" 
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" 
          />
          {/* Үстіне барғанда шығатын белгіше */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
             <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-12 h-12 drop-shadow-lg" />
          </div>
        </div>

        {/* Мәтіндер */}
        <div className="space-y-6">
          {t.content.map((paragraph, index) => (
            <p key={index} className="manifesto-text">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Цитата және Автор */}
        <div className="manifesto-quote">
          {t.quote}
        </div>
        <div className="manifesto-author">
          ✍️ {t.author}
        </div>
      </div>

      {/* ✅ SHARE (ТАРҚАТЫЎ) */}
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

      {/* ✅ LIGHTBOX / MODAL (ФОТОНЫ ҮЛКЕЙТІП КӨРСЕТУ) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-fade-in" onClick={() => setIsModalOpen(false)}>
          <div className="relative max-w-full max-h-full" onClick={(e) => e.stopPropagation()}>
            
            {/* Үлкейген сурет */}
            <img 
              src="/images/manifesto1.jpg" 
              alt="Manifesto Full" 
              className="max-w-full max-h-[85vh] rounded-lg shadow-2xl object-contain"
            />

            {/* Жабу түймесі (X) */}
            <button 
              className="absolute -top-12 right-0 text-white hover:text-red-500 transition-colors p-2"
              onClick={() => setIsModalOpen(false)}
              title="Close"
            >
              <X size={32} />
            </button>

            {/* Жүктеу түймесі (Download) */}
            <a 
              href="/images/manifesto1.jpg" 
              download="Manifesto_Karakalpak_Voice.jpg"
              className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition shadow-lg hover:scale-105 no-underline"
              onClick={(e) => e.stopPropagation()} // Модаль жабылып қалмауы үшін
            >
              <Download size={20} />
              <span>
                {lang === 'KK' ? 'Жүклеп алыў' : 
                 lang === 'RU' ? 'Скачать' : 
                 lang === 'PL' ? 'Pobierz' : 
                 'Download'}
              </span>
            </a>
          </div>
        </div>
      )}

    </div>
  );
};

export default Manifesto;