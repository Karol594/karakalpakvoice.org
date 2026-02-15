import React, { useState, useEffect } from 'react';
import { ShieldCheck, Globe, Landmark, Scale, Info, Facebook, Instagram, Twitter, Youtube, Send, Link as LinkIcon, Check } from 'lucide-react';

// --- СУРЕТТЕРДІ ОСЫЛАЙ ШАҚЫРАМЫЗ (ИМПОРТ) ---
import originalEmblemImg from '../assets/original-emblem.jpg';
import fakeEmblemImg from '../assets/fake-emblem.jpg';

// TikTok иконкасы
const TikTokIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

export default function Emblem() {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'KK');
  const [copied, setCopied] = useState(false); // Силтеме көширилди ме?

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleLangUpdate = (event) => {
      if (event.detail && event.detail.lang) setLang(event.detail.lang);
    };
    window.addEventListener('languageChange', handleLangUpdate);
    return () => window.removeEventListener('languageChange', handleLangUpdate);
  }, []);

  // Силтемени көшириў функциясы
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const translations = {
    KK: {
      subtitle: "«МӘМЛЕКЕТЛИК ГЕРБ»",
      title: "ҚАРАҚАЛПАҚСТАН РЕСПУБЛИКАСЫНЫҢ МӘМЛЕКЕТЛИК ГЕРБИ",
      intro: <> <a href="https://share.google/y13lzJf599RMMqJBk" target="_blank" rel="noreferrer" className="text-blue-600 underline font-bold">Герб</a> (пол. herb, нем. erbe - «мийрас») — геральдика қағыйдалары тийкарында дүзилген визуал таныў белгиси. </>,
      section1: "«Қарақалпақстан Республикасының мәмлекетлик герби ҳаққында»-ғы Нызам 1993-жыл 9-апрельде Қарақалпақстан Республикасы Жоғарғы Кеңесиниң XII-мәжилисинде қабыл етилди. Қарақалпақстан Республикасының мәмлекетлик герби Қарақалпақстан Республикасының мәмлекетлик нышанын (суверенитетин) билдиреди.",
      section2: <>Қарақалпақстан гербинде таўлар үстинен шығып киятырған қуяш ҳәм әййемги <a href="https://share.google/K51uS0OA8EXdolw2G" target="_blank" rel="noreferrer" className="text-blue-600 underline">зардуштийлик</a> қорғаны — «Шылпық» таўы сүўретленген.</>,
      section3: "Әмиўдәря ҳәм Арал теңизиниң әтирапында оң тәрепинде бийдай масақлары, шеп тәрепинде пахта шақалары ашылып турған ғаўашалар гүлшеңбери бар. Гербтиң жоқарғы бөлиминде алтын жийекли көк сегиз қырлы жулдыз, орайында гүмис ярым ай ҳәм жулдыз жайласқан.",
      section4: <>Гербтиң орайында қанатлары ашылған гүмис реңдеги мификалық <a href="https://share.google/APJKFc7CdQVfVplIt" target="_blank" rel="noreferrer" className="text-blue-600 underline">Қумай</a> қусы сүўретленген. Ол байлық ҳәм пидайылық тымсалы.</>,
      section5: "Төмендеги лентасында «ҚАРАҚАЛПАҚСТАН» жазыўы бар. Ғаўаша ҳәм бийдай шыбықларының гүлшеңбери Қарақалпақстан байрағының лентасы менен байланған.",
      historyDesc: (
        <div className="space-y-4 text-justify">
          <p>Қарақалпақстан Республикасы өзиниң "Суверенитет ҳаққындағы декларациясы"н қабыл еткеннен соң, усы Декларацияның <a href="/declaration" className="text-blue-600 font-bold underline">9-статьясына</a> муўапық республиканың мәмлекетлик нышанларынан бири болған Мәмлекетлик Гербиниң ресмий көринисин тастыйықлады (1-сүўрет). Бул Герб — Қарақалпақстанның мәмлекетлик ғәрезсизлиги ҳәм ҳуқықый статусын белгилейтуғын тийкарғы белгилерден (символлардан) бири сыпатында нызамлы күшке ийе болды.</p>
          <p>Соңғы жылларда түрли сиясий ҳәм ҳәкимшилик тәсирлер нәтийжесинде Гербтиң дәслепки ресмий вариантына өзгерислер киргизилгени бақланбақта (2-сүўрет). Атап айтқанда, Қарақалпақстан Республикасының Суверенитет ҳаққындағы декларациясына тийкарланып қабыл етилген тийкарғы Гербтиң орнына Өзбекстан Республикасы мәмлекетлик байрағының реңлерин сәўлелендиретуғын лентаны өз ишине алған жаңа вариант киргизилди. Бул өзгерис ресмий уйымлардың қарары менен әмелге асырылды ҳәм кейин ала бул жалған вариант (фейк) халықаралық ашық дереклерге, соның ишинде, Википедия платформасына да жайластырылды.</p>
        </div>
      ),
      appealHeader: "ДИПЛОМАТИЯЛЫҚ АШЫҚ МҮРӘЖАТ",
      appealMain: (
        <div className="space-y-4 text-justify">
          <p className="font-bold italic text-lg text-amber-600 dark:text-amber-400">Аллаҳқа тәўекел етип, инсаннан емес, ҳақыйқаттан қорқатуғын халық сыпатында биз Қарақалпақстан Республикасының ҳуқықый статусына, оның тарийхый тийкарларына ҳәм халықаралық нормаларға сәйкес келетуғын мағлыўматларды ҳүрмет пенен итибарға усынамыз.</p>
          <p>Қарақалпақстан Республикасының суверен статусы Өзбекстан Республикасы <a href="https://lex.uz/mobileact/6445145#6447814" target="_blank" rel="noreferrer" className="text-blue-500 underline font-bold">Конституциясында</a> (85-статья) ресмий түрде бекитилген. Бул статус - Қарақалпақстан халқының тарийхый, мәдений ҳәм ҳуқықый өзгешеликлерин түсиниўдиң әҳмийетли элементи болып есапланады. Усы мүнәсибет пенен, мәмлекетлик белгилерге байланыслы мәселелер - тек ғана ишки символикалық мәниске ийе емес, ал ҳуқықый анықлық ҳәм тарийхый ҳақыйқатлықты талап ететуғын тараў болып табылады.</p>
          <p>Соңғы жыллары Қарақалпақстан Мәмлекетлик Гербиниң түп нусқасы ҳаққындағы мәлимлеме мәканында түсинбеўшиликлер ҳәм сәйкес келмеўшиликлер бақланбақта. Бул жағдай тарийхый мағлыўматлардың бузылыўына, ҳуқықый ҳүжжетлердиң мазмунының төменлеўине ҳәм халықтың өз белгилерине байланыслы түсинигиниң бузылыўына алып келиўи мүмкин.</p>
          <p>Усы мүнәсибет пенен биз халықаралық жәмийетшиликтиң итибарын төмендеги мәселеге қаратыўды ҳүрмет пенен сораймыз:</p>
          <ul className="list-disc ml-6 space-y-3">
            <li>Қарақалпақстан Республикасының Мәмлекетлик Герби биринши мәрте Суверенитет ҳаққындағы <a href="/declaration" className="text-blue-500 underline">декларацияның 9-статьясына</a> муўапық қабыл етилген;</li>
            <li>Тийкарғы белги - Қарақалпақстан халқының тарийхый ҳәм ҳуқықый өзине тәнлигин сәўлелендиреди;</li>
            <li>Информация мәканында пайда болған альтернатив вариантлар ҳуқықый тийкарға ийе емес ҳәм тарийхый мағлыўматлар менен сәйкес келмейди;</li>
            <li>Бул мәселе сиясий емес, ҳуқықый анықлық ҳәм тарийхый ҳақыйқатлықты сақлаў мәселеси.</li>
          </ul>
          <p className="pt-4 font-bold">Биз халықаралық шөлкемлерди, дипломатиялық миссияларды, ҳуқық қорғаў институтларын, журналистлерди, изертлеўшилерди ҳәм инсан ҳуқықлары тараўындағы экспертлерди:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li>Қарақалпақстанның ҳуқықый статусына байланыслы мағлыўматлардың анықлығына итибар қаратыў;</li>
            <li>Мәмлекетлик белгилерге байланыслы тарийхый мәлимлемениң бузылмаўын тәмийинлеў;</li>
            <li>Аймақта ҳуқықый анықлық ҳәм ашық-айдынлықты қоллап-қуўатлаў;</li>
            <li>Халықаралық стандартларға муўапық обектив мониторинг жүргизиўге шақырамыз.</li>
          </ul>
          <p className="pt-4 italic text-gray-300">Бул шақырық ҳеш бир тәрепке қарсы қаратылмаған. Бул тарийхый ҳақыйқатты сақлаў, ҳуқықый нормаларды ҳүрмет етиў, мәдений мийрасты қорғаў ҳәм мәлимлеме ашық-айдынлығын тәмийинлеў махсетинде жаратылған ашық ҳәм тыныш баслама болып есапланады.</p>
          <p>Қарақалпақстан халқы халықаралық ҳуқық нормаларын, қоңсылас халықлар менен татыў қатнасықларды ҳәм тыныш раўажланыўды жоқары қәдирлейди. Биз тек ғана ҳақыйқый мағлыўматлардың сақланыўын, ҳуқықый ҳүжжетлердиң бузылмаўын ҳәм тарийхый белгилердиң дурыс көрсетилиўин сораймыз.</p>
        </div>
      ),
      infoQuote: "Халықаралық жәмийетшиликтиң итибары ҳуқықый мәдениятты беккемлеўге үлкен үлес қосады",
      footer: "Қарақалпақстан Республикасының пуқаралары мәмлекетлик гербин ҳүрмет етиўи шәрт.",
      img1: "1-сүўрет: Герб Оригинал фото", img2: "2-сүўрет: Герб фейк фото",
      shareTitle: "Биз бенен байланысың", copyLink: "Силтемени көшириў", copied: "Көширилди!"
    },
    RU: {
      title: "ГОСУДАРСТВЕННЫЙ ГЕРБ РЕСПУБЛИКИ КАРАКАЛПАКСТАН",
      subtitle: "«ГОСУДАРСТВЕННЫЙ ГЕРБ»",
      intro: <> <a href="https://share.google/y13lzJf599RMMqJBk" target="_blank" rel="noreferrer" className="text-blue-600 underline font-bold">Герб</a> — визуальный опознавательный знак по правилам геральдики. </>,
      section1: "Закон «О государственном гербе Республики Каракалпакстан» был принят 9 апреля 1993 года. Государственный герб символизирует суверенитет республики.",
      section2: <>На гербе изображены восходящее солнце и древняя <a href="https://share.google/K51uS0OA8EXdolw2G" target="_blank" rel="noreferrer" className="text-blue-600 underline">зороастрийская</a> крепость «Шылпык».</>,
      section3: "Река Амударья и Аральское море, венок из пшеницы и хлопка. Восьмиконечная звезда с полумесяцем и звездой.",
      section4: <>В центре изображена мифическая птица <a href="https://share.google/APJKFc7CdQVfVplIt" target="_blank" rel="noreferrer" className="text-blue-600 underline">Кумай</a> — символ благородства.</>,
      section5: "Внизу на ленте надпись «ҚАРАҚАЛПАҚСТАН». Венок перевязан лентами в цветах флага Каракалпакстана.",
      historyDesc: (
        <div className="space-y-4 text-justify">
          <p>После принятия Декларации о суверенитете, согласно <a href="/declaration" className="text-blue-600 font-bold underline">статье 9</a>, был утвержден официальный вид Герба (фото 1).</p>
          <p>В последние годы наблюдается внесение изменений в первоначальный официальный вариант Герба под воздействием различных политических и административных факторов (фото 2). В частности, вместо базового Герба, принятого на основе Декларации о суверенитете Республики Каракалпакстан, был введён новый вариант, включающий в себя ленту, отражающую цвета государственного флага Республики Узбекистан. Это изменение было осуществлено решением официальных структур, а впоследствии данный неофициальный (фейковый) вариант был размещён в международных открытых источниках, включая платформу Википедия. Подобные ситуации затрудняют поиск точной информации в информационном пространстве, основанной на первоначальных правовых документах и исторических данных. Несмотря на это, народ Каракалпакстана хорошо знает свои историко‑правовые символы, их подлинный вид и время их принятия. Данный вопрос является важным с точки зрения правового статуса государственных символов, порядка их изменения и сохранения исторической достоверности. Поэтому систематизация сведений о базовом Гербе, их научно‑правовое разъяснение и обеспечение корректного отражения в международном информационном пространстве являются одними из актуальных задач сегодняшнего дня.</p>
        </div>
      ),
      appealHeader: "ОТКРЫТОЕ ДИПЛОМАТИЧЕСКОЕ ОБРАЩЕНИЕ",
      appealMain: (
        <div className="space-y-4 text-justify">
          <p className="font-bold italic text-lg text-amber-500">Как народ, боящийся правды, а не человека, мы с уважением представляем информацию о правовом статусе, исторических основах и международных стандартах Республики Каракалпакстан.</p>
          <p>Суверенный статус Республики Каракалпакстан официально закреплён в <a href="https://lex.uz/mobileact/6445145#6447814" target="_blank" rel="noreferrer" className="text-blue-500 underline font-bold">Конституции</a> Республики Узбекистан (статья 85). Этот статус является важным элементом понимания исторических, культурных и правовых особенностей народа Каракалпакстана. В связи с этим вопросы, связанные с государственными символами, имеют не только внутреннее символическое значение, но и требуют правовой ясности и сохранения исторической достоверности.</p>
          <p>В последние годы в информационном пространстве наблюдаются недопонимания и несоответствия, касающиеся подлинного вида Государственного Герба Каракалпакстана. Такая ситуация может привести к искажению исторических данных, снижению значимости правовых документов и нарушению понимания народом своих собственных символов.</p>
          <p>В связи с этим мы с уважением просим международное сообщество обратить внимание на следующие моменты:</p>
          <ul className="list-disc ml-6 space-y-3">
            <li>Государственный Герб Республики Каракалпакстан впервые был принят в соответствии с <a href="/declaration" className="text-blue-500 underline">9‑й статьёй</a> Декларации о суверенитете;</li>
            <li>Базовый символ отражает историческую и правовую самобытность народа Каракалпакстана;</li>
            <li>Появившиеся в информационном пространстве альтернативные варианты не имеют правовой основы и не соответствуют историческим данным;</li>
            <li>Этот вопрос не является политическим, а относится к сфере правовой ясности и сохранения исторической истины.</li>
          </ul>
          <p className="pt-4 font-bold">Мы призываем международные организации, дипломатические миссии, правозащитные институты, журналистов и экспертов:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li>уделить внимание точности сведений, связанных с правовым статусом Каракалпакстана;</li>
            <li>обеспечить недопущение искажения исторической информации;</li>
            <li>поддерживать правовую ясность и открытость в регионе;</li>
            <li>проводить объективный мониторинг в соответствии с международными стандартами.</li>
          </ul>
          <p className="pt-4 italic text-gray-300">Данное обращение является открытой и мирной инициативой, созданной с целью сохранения исторической истины и защиты культурного наследия. Народ Каракалпакстана высоко ценит нормы международного права, дружественные отношения с соседними народами и мирное развитие. Мы просим только сохранить достоверные данные, не нарушать правовые документы и правильно отображать исторические памятники.</p>
        </div>
      ),
      infoQuote: "Внимание международного сообщества вносит значительный вклад в укрепление правовой культуры.",
      footer: "Граждане обязаны уважать государственный герб.",
      img1: "Фото 1: Оригинал", img2: "Фото 2: Фейк",
      shareTitle: "Свяжитесь с нами", copyLink: "Скопировать ссылку", copied: "Скопировано!"
    },
    EN: {
      title: "STATE EMBLEM OF THE REPUBLIC OF KARAKALPAKSTAN",
      subtitle: "«STATE EMBLEM»",
      intro: <> <a href="https://share.google/y13lzJf599RMMqJBk" target="_blank" rel="noreferrer" className="text-blue-600 underline font-bold">The Coat of Arms</a> (from Polish: herb, German: erbe – “heritage”) is a visual identification mark created based on the rules of heraldry. </>,
      section1: "The Law “On the State Emblem of the Republic of Karakalpakstan” was adopted on April 9, 1993. The State Emblem symbolizes the state sovereignty of the Republic of Karakalpakstan.",
      section2: <>The emblem depicts the sun rising over the mountains and the ancient <a href="https://share.google/K51uS0OA8EXdolw2G" target="_blank" rel="noreferrer" className="text-blue-600 underline">Zoroastrian</a> fortress — Mount “Shylpyk”.</>,
      section3: "The Amu Darya River and the Aral Sea are surrounded by a wreath of wheat ears on the right and cotton branches on the left. At the top is a blue eight-pointed star with a silver crescent and star.",
      section4: <>In the center is the mythical silver-colored <a href="https://share.google/APJKFc7CdQVfVplIt" target="_blank" rel="noreferrer" className="text-blue-600 underline">Kumai</a> bird, a symbol of wealth and dedication.</>,
      section5: "The bottom ribbon bears the inscription “QARAQALPAQSTAN”. The wreath is tied with the ribbon of the flag of Karakalpakstan.",
      historyDesc: (
        <div className="space-y-4 text-justify">
          <p>After the Republic of Karakalpakstan adopted its “Declaration on Sovereignty,” in accordance with <a href="/declaration" className="text-blue-600 font-bold underline">Article 9</a> of this Declaration, the official appearance of the State Emblem was approved (Photo 1). This Emblem acquired legal force as one of the fundamental symbols designating the state sovereignty and legal status of Karakalpakstan.</p>
          <p>In recent years, changes have been observed in the initial official version of the Emblem under the influence of various political and administrative factors (Photo 2). In particular, instead of the basic Emblem, a new version was introduced that includes a ribbon reflecting the colors of the State Flag of the Republic of Uzbekistan. This change was implemented by official institutions, and later this fake version was placed in international open sources, including Wikipedia.</p>
          <p>Such situations make it difficult to find accurate information based on original legal documents. Nevertheless, the people of Karakalpakstan know well their historical‑legal symbols and their original form.</p>
        </div>
      ),
      appealHeader: "DIPLOMATIC OPEN APPEAL",
      appealMain: (
        <div className="space-y-4 text-justify">
          <p className="font-bold italic text-lg text-amber-600 dark:text-amber-400">We fear the truth, not the person, and we respectfully present information that complies with the legal status of the Republic of Karakalpakstan, its historical foundations, and international standards.</p>
          <p>The sovereign status of the Republic of Karakalpakstan is officially enshrined in the <a href="https://lex.uz/mobileact/6445145#6447814" target="_blank" rel="noreferrer" className="text-blue-500 underline font-bold">Constitution</a> of the Republic of Uzbekistan (Article 85). This status is an important element in understanding the historical and legal distinctiveness of the people.</p>
          <p>In this regard, we respectfully request the attention of the international community to the following:</p>
          <ul className="list-disc ml-6 space-y-3">
            <li>The State Emblem was first adopted in accordance with Article 9 of the Declaration on Sovereignty;</li>
            <li>The basic symbol reflects the historical and legal identity of the people of Karakalpakstan;</li>
            <li>Alternative versions in the information space have no legal basis;</li>
            <li>This issue is not political, but one of legal clarity and historical truth.</li>
          </ul>
          <p className="pt-4 font-bold">We call upon international organizations and experts to:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li>Pay attention to the accuracy of information related to Karakalpakstan's status;</li>
            <li>Ensure the preservation of historical information related to state symbols;</li>
            <li>Support legal clarity and transparency in the region;</li>
            <li>Conduct objective monitoring in accordance with international standards.</li>
          </ul>
          <p className="pt-4 italic text-gray-400">This appeal is not directed against any party. It is considered an open and peaceful initiative created for the purpose of preserving historical truth, respecting legal norms, protecting cultural heritage, and ensuring informational transparency.

The people of Karakalpakstan highly value international legal norms, good‑neighborly relations with neighboring peoples, and peaceful development. We ask only for the preservation of truthful information, the non‑distortion of legal documents, and the correct representation of historical symbols.</p>
        </div>
      ),
      infoQuote: "The attention of the international community will make a significant contribution to strengthening the legal culture in the region, preserving historical justice, and ensuring informational openness.",
      footer: "Citizens and residents are obligated to respect the national emblem.",
      img1: "Photo 1: Original", img2: "Photo 2: Fake",
      shareTitle: "Connect with us", copyLink: "Copy Link", copied: "Copied!"
    },
    PL: {
      title: "GODŁO PAŃSTWOWE REPUBLIKI KARAKALPAKSTANU",
      subtitle: "„GODŁO PAŃSTWOWE”",
      intro: <> <a href="https://share.google/y13lzJf599RMMqJBk" target="_blank" rel="noreferrer" className="text-blue-600 underline font-bold">Herb</a> (z polskiego: herb, z niemieckiego: erbe – „dziedzictwo”) to wizualny znak identyfikacyjny stworzony według zasad heraldyki. </>,
      section1: "Ustawa „O Godle Państwowym Republiki Karakalpakstanu” została przyjęta 9 kwietnia 1993 roku. Godło Państwowe symbolizuje suwerenność państwową Republiki Karakalpakstanu.",
      section2: <>Godło przedstawia słońce wschodzące nad górami oraz starożytną <a href="https://share.google/K51uS0OA8EXdolw2G" target="_blank" rel="noreferrer" className="text-blue-600 underline">zoroastryjską</a> twierdzę — górę „Szyłpyk”.</>,
      section3: "Rzeka Amu-daria i Morze Aralskie są otoczone wieńcem z kłosów pszenicy po prawej i gałązek bawełny po lewej stronie. Na górze znajduje się niebieska ośmioramienna gwiazda ze srebrnym półksiężycem.",
      section4: <>W centrum znajduje się mityczny srebrny ptak <a href="https://share.google/APJKFc7CdQVfVplIt" target="_blank" rel="noreferrer" className="text-blue-600 underline">Kumaj</a>, symbol bogactwa i oddania.</>,
      section5: "Na dolnej wstędze widnieje napis „QARAQALPAQSTAN”. Wieniec jest przewiązany wstęgą w barwach flagi Karakalpakstanu.",
      historyDesc: (
        <div className="space-y-4 text-justify">
          <p>Po przyjęciu przez Republikę Karakalpakstanu własnej „Deklaracji o Suwerenności”, zgodnie z <a href="/declaration" className="text-blue-600 font-bold underline">artykułem 9</a> tej Deklaracji (słowo „artykuł 9” przekieruje do sekcji Deklaracji), zatwierdzono oficjalny wygląd Herbu Państwowego, który jest jednym z symboli państwowych republiki (zdjęcie 1). Herb ten uzyskał moc prawną jako jeden z podstawowych znaków (symboli) określających suwerenność państwową i status prawny Karakalpakstanu.</p>
          <p>W ostatnich latach obserwuje się wprowadzenie zmian do pierwotnej oficjalnej wersji Herbu pod wpływem różnych czynników politycznych i administracyjnych (zdjęcie 2). W szczególności, zamiast podstawowego Herbu przyjętego na podstawie Deklaracji o Suwerenności Republiki Karakalpakstanu, wprowadzono nową wersję zawierającą wstęgę odzwierciedlającą barwy flagi państwowej Republiki Uzbekistanu. Zmiana ta została wprowadzona decyzją oficjalnych instytucji, a następnie ta nieoficjalna (fałszywa) wersja została umieszczona w międzynarodowych otwartych źródłach, w tym na platformie Wikipedia.</p>
          <p>Takie sytuacje utrudniają znalezienie dokładnych informacji w przestrzeni informacyjnej, opartych na pierwotnych dokumentach prawnych i danych historycznych. Mimo to naród Karakalpakstanu dobrze zna swoje historyczno‑prawne symbole, ich oryginalną formę oraz okres ich przyjęcia.</p>
          <p>Kwestia ta jest uważana za ważną z punktu widzenia statusu prawnego symboli państwowych, procedury ich zmiany oraz zachowania historycznej autentyczności. Dlatego systematyzacja informacji dotyczących podstawowego Herbu, ich naukowo‑prawne wyjaśnienie oraz zapewnienie ich prawidłowego przedstawienia w międzynarodowej przestrzeni informacyjnej należą do ważnych zadań współczesności.</p>
        </div>
      ),
      appealHeader: "DYPLOMATYCZNE OTWARTE OŚWIADCZENIE",
      appealMain: (
        <div className="space-y-4 text-justify">
          <p className="font-bold italic text-lg text-amber-600 dark:text-amber-400">Jako naród, który boi się prawdy, a nie człowieka, przedstawiamy informacje o statusie prawnym i podstawach historycznych Republiki Karakalpakstanu.</p>
          <p>Suwerenny status Republiki Karakalpakstanu jest oficjalnie zapisany w <a href="https://lex.uz/mobileact/6445145#6447814" target="_blank" rel="noreferrer" className="text-blue-500 underline font-bold">Konstytucji</a> Republiki Uzbekistanu (link do artykułu 85 Konstytucji Uzbekistanu). Status ten jest uważany za ważny element zrozumienia historycznych, kulturowych i prawnych cech narodu Karakalpakstanu. W związku z tym kwestie związane z symbolami państwowymi mają nie tylko wewnętrzne znaczenie symboliczne, lecz także wymagają jasności prawnej i zachowania historycznej autentyczności.</p>
          <p>W ostatnich latach w przestrzeni informacyjnej obserwuje się nieporozumienia i niespójności dotyczące oryginalnej formy Herbu Państwowego Karakalpakstanu. Sytuacja ta może prowadzić do zniekształcenia danych historycznych, obniżenia znaczenia dokumentów prawnych oraz zaburzenia rozumienia przez naród własnych symboli.</p>
          <p className="font-bold mt-6">W związku z tym z szacunkiem prosimy społeczność międzynarodową o zwrócenie uwagi na następujące kwestie:</p>
          <ul className="list-disc ml-6 space-y-3">
            <li>Herb Państwowy Republiki Karakalpakstanu został po raz pierwszy przyjęty zgodnie z <a href="/declaration" className="text-blue-500 underline">artykułem 9</a> Deklaracji o Suwerenności;</li>
            <li>Podstawowy symbol odzwierciedla historyczną i prawną tożsamość narodu Karakalpakstanu;</li>
            <li>Alternatywne wersje, które pojawiły się w przestrzeni informacyjnej, nie mają podstawy prawnej i nie odpowiadają danym historycznym;</li>
            <li>Kwestia ta nie ma charakteru politycznego, lecz dotyczy jasności prawnej i zachowania prawdy historycznej.</li>
          </ul>
          <p className="pt-4 font-bold">Wzywamy organizacje międzynarodowe, misje dyplomatyczne, instytucje ochrony praw człowieka, dziennikarzy, badaczy oraz ekspertów do:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li>zwrócenia uwagi na dokładność informacji dotyczących statusu prawnego Karakalpakstanu;</li>
            <li>zapewnienia, aby historyczne informacje dotyczące symboli państwowych nie były zniekształcane;</li>
            <li>wspierania jasności prawnej i przejrzystości w regionie;</li>
            <li>prowadzenia obiektywnego monitoringu zgodnie ze standardami międzynarodowymi.</li>
          </ul>
          <div className="pt-6 border-t border-white/10 space-y-4">
            <p>Oświadczenie to nie jest skierowane przeciwko żadnej stronie. Jest to otwarta i pokojowa inicjatywa stworzona w celu zachowania prawdy historycznej, poszanowania norm prawnych, ochrony dziedzictwa kulturowego oraz zapewnienia przejrzystości informacyjnej.</p>
            <p>Naród Karakalpakstanu wysoko ceni normy prawa międzynarodowego, dobre stosunki sąsiedzkie z narodami ościennymi oraz pokojowy rozwój. Prosimy jedynie o zachowanie prawdziwych informacji, niezniekształcanie dokumentów prawnych oraz prawidłowe przedstawianie symboli historycznych.</p>
            <p className="text-amber-500 font-bold">Uwaga społeczności międzynarodowej wniesie znaczący wkład w umocnienie kultury prawnej w regionie, zachowanie sprawiedliwości historycznej oraz zapewnienie przejrzystości informacyjnej.</p>
          </div>
        </div>
      ),
      footer: "Obywatele i mieszkańcy są zobowiązani do poszanowania godła narodowego.",
      img1: "Zdjęcie 1: Oryginał", img2: "Zdjęcie 2: Fake",
      shareTitle: "Połącz się z nami", copyLink: "Kopiuj link", copied: "Skopiowano!"
    }
  };

  const t = translations[lang] || translations['KK'];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 text-gray-900 dark:text-white pt-24 pb-20 font-sans">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block p-4 bg-amber-100 dark:bg-amber-900/30 rounded-full mb-6">
            <ShieldCheck className="w-16 h-16 text-amber-600 dark:text-amber-400" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tight">{t.title}</h1>
          <p className="text-xl font-bold text-amber-600 tracking-widest uppercase">{t.subtitle}</p>
        </div>

        {/* Content Body */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border-l-8 border-amber-500 text-xl leading-relaxed">{t.intro}</div>
          
          <div className="grid gap-6">
            <section className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 text-lg leading-relaxed">{t.section1}</section>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-3xl border border-blue-100 dark:border-blue-800 text-lg">{t.section2}</div>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 text-lg">{t.section3}</div>
            </div>
            <section className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 text-lg leading-relaxed">{t.section4}</section>
            <section className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 text-lg leading-relaxed">{t.section5}</section>
          </div>

          {/* Legal History Section */}
          <div className="py-10 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-8">
              <Scale className="text-amber-600 w-8 h-8" />
              <h2 className="text-2xl font-black uppercase tracking-tight">
                {lang === 'EN' ? "Historical and Legal Interpretation" : 
                 lang === 'RU' ? "Историко-правовое толкование" : 
                 lang === 'PL' ? "Interpretacja historyczno-prawna" : 
                 "Тарийхый ҳәм ҳуқықый түсиндирме"}
              </h2>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-700 text-lg mb-12">{t.historyDesc}</div>
            
            {/* Image Comparison */}
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-4 text-center">
                <div className="aspect-square bg-white rounded-3xl border-4 border-green-500 flex items-center justify-center p-6 shadow-xl overflow-hidden">
                  <img src={originalEmblemImg} alt="Original" className="max-w-full max-h-full object-contain" />
                </div>
                <p className="font-bold text-green-600 text-lg uppercase tracking-wide">{t.img1}</p>
              </div>
              <div className="space-y-4 text-center">
                <div className="aspect-square bg-white rounded-3xl border-4 border-red-500 flex items-center justify-center p-6 shadow-xl overflow-hidden grayscale-[0.2]">
                  <img src={fakeEmblemImg} alt="Fake" className="max-w-full max-h-full object-contain" />
                </div>
                <p className="font-bold text-red-600 text-lg uppercase tracking-wide">{t.img2}</p>
              </div>
            </div>
          </div>

          {/* Appeal Section */}
          <section className="bg-slate-900 text-white p-8 md:p-16 rounded-[3.5rem] shadow-2xl relative overflow-hidden border border-slate-700">
            <Globe className="absolute -right-20 -top-20 w-96 h-96 text-white/5 pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-10 border-b border-white/10 pb-6">
                <Landmark className="text-amber-500 w-12 h-12" />
                <h2 className="text-2xl md:text-4xl font-black text-amber-500 tracking-tighter uppercase">{t.appealHeader}</h2>
              </div>
              <div className="text-lg leading-relaxed text-gray-200">{t.appealMain}</div>
              
              <div className="mt-12 p-8 bg-amber-500/10 border border-amber-500/30 rounded-3xl flex items-start gap-4">
                <Info className="text-amber-500 shrink-0 mt-1" />
                <p className="text-lg italic text-gray-300">{t.infoQuote}</p>
              </div>
            </div>
          </section>

          {/* Footer Banner */}
          <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-10 rounded-[2.5rem] text-white text-center shadow-xl">
            <p className="text-2xl font-bold italic tracking-tight">{t.footer}</p>
          </div>

        </div>
      </div>
    </div>
  );
}