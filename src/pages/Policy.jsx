import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, BookOpen, Scale, Lock, Globe, FileText, Mail, MapPin } from 'lucide-react';
import { Facebook, Send, Instagram, Youtube, Twitter } from 'lucide-react';

export default function Policy() {
  const { i18n } = useTranslation();
  
  // Тілді анықтау (KAA -> KK, басқалары сол күйінде)
  const currentLang = i18n.language ? i18n.language.toUpperCase() : 'RU';
  const langKey = currentLang === 'KAA' ? 'KK' : (['EN', 'PL', 'KK', 'RU'].includes(currentLang) ? currentLang : 'RU');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // --- МӘТІНДЕР (4 ТІЛДЕ) ---
  const content = {
    RU: {
      title: "РЕДАКЦИОННАЯ ПОЛИТИКА И УСЛОВИЯ ИСПОЛЬЗОВАНИЯ",
      subtitle: "(EDITORIAL POLICY & TERMS OF USE)",
      intro: "Karakalpak-Voice Digital Platform\nДата вступления в силу: 13 декабря 2025 года\nПоследнее обновление: 2 февраля 2026 года\nЮрисдикция: Варшава, Республика Польша (Европейский Союз)",
      sections: [
        {
          title: "1. ВВЕДЕНИЕ И ПРАВОВОЙ СТАТУС",
          text: `
**1.1. Оператор Платформы**
Платформа «Karakalpak-Voice» (далее — «Платформа») управляется организацией **Karakalpak-Voice Media Foundation** (в процессе регистрации / действующая в соответствии с законодательством Республики Польша).
* **Юридический адрес:** Варшава, Польша (точный адрес предоставляется по официальному запросу).
* **Контакт для юридических вопросов:** legal@karakalpakvoice.org

**1.2. Статус и Миссия**
Мы действуем в правовом поле Европейского Союза. Наш статус выходит за рамки новостного сайта. «Karakalpak-Voice» — это **Цифровой Архив и Энциклопедия**, созданная для:
* Систематизации и хранения истории, культуры и языка каракалпакского народа.
* Документирования нарушений прав человека.
* Обеспечения доступа к информации будущим поколениям (20–30+ лет).

Используя Платформу, вы соглашаетесь с настоящими Условиями. Если вы не согласны, пожалуйста, прекратите использование сайта.
          `
        },
        {
          title: "2. МИССИЯ И ЦЕННОСТИ",
          text: `
**2.1. Миссия**
* **Правда:** Предоставление независимой, верифицированной информации.
* **Память:** Сохранение коллективной памяти народа от забвения.
* **Защита:** Адвокация прав человека через документирование фактов.

**2.2. Принципы**
* **Независимость:** Мы не зависим от правительств, партий или корпораций.
* **Нейтральность:** Мы отделяем факты от мнений.
* **Историческая Ответственность:** Мы осознаем, что пишем историю, а не просто новости.
          `
        },
        {
          title: "3. ТОЧНОСТЬ, ВЕРИФИКАЦИЯ И ИСПРАВЛЕНИЯ",
          text: `
**3.1. Стандарты Верификации**
Мы применяем строгие протоколы проверки фактов (Fact-Checking):
* Информация о правах человека подтверждается минимум из двух независимых источников (где это безопасно для источников).
* Исторические данные базируются на архивных документах и свидетельствах.

**3.2. Политика Исправлений**
* Мы оперативно исправляем фактические ошибки.
* Существенные изменения отмечаются в конце статьи (Correction Notice / UPD).
* Исторические записи не удаляются, но могут быть дополнены новым контекстом.
          `
        },
        {
          title: "4. ПОЛИТИКА ЦИФРОВОГО НАСЛЕДИЯ (ARCHIVAL PLEDGE)",
          text: `
**4.1. Гарантия Долгосрочного Доступа (30+ лет)**
Мы обязуемся поддерживать доступность материалов Платформы в течение минимум 30 лет. Это наш долг перед будущими исследователями и потомками.

**4.2. Целостность и Резервное Копирование**
* **Неизменность:** Структура ссылок (Permalinks) остается стабильной.
* **Резервное копирование:** Мы проводим ежедневное (инкрементальное) и еженедельное (полное) резервное копирование на защищенные серверы в разных географических зонах ЕС.
* **Экстренный план:** В случае прекращения деятельности Фонда, архив будет передан в доверенную международную цифровую библиотеку или правозащитную организацию.
          `
        },
        {
          title: "5. БЕЗОПАСНОСТЬ И ПРАВИЛА ИСПОЛЬЗОВАНИЯ",
          text: `
**5.1. Запрещенные Действия**
В целях защиты Архива строго запрещено:
* Совершать кибератаки (DDoS, SQL-инъекции, Brute-force).
* Использовать автоматические скрипты (Scrapers/Bots) для массового сбора данных без разрешения.
* Пытаться получить несанкционированный доступ к серверам или аккаунтам.
* Распространять вредоносное ПО.
*Нарушители будут преследоваться по законам Польши и ЕС.*

**5.2. Поведение Пользователей**
Мы придерживаемся политики «Нулевой терпимости» (Zero Tolerance) к:
* Языку вражды (Hate Speech), экстремизму, призывам к насилию.
* Травле (Cyberbullying) и доксингу (публикации личных данных).
          `
        },
        {
          title: "6. АВТОРСКОЕ ПРАВО И ЛИЦЕНЗИРОВАНИЕ",
          text: `
**6.1. Владелец Прав**
Весь оригинальный контент (тексты, фото, дизайн, база данных) является интеллектуальной собственностью **Karakalpak-Voice Media Foundation** и защищен законодательством об авторском праве.
**Статус:** All Rights Reserved (Все права защищены), если не указано иное.

**6.2. Добросовестное Использование (Fair Use)**
Мы поддерживаем образование и науку. Разрешается использование материалов:
* **Цель:** Образовательная, научная, журналистская (некоммерческая).
* **Условие:** Обязательная активная гиперссылка на «Karakalpak-Voice».
* **Ограничение:** Запрещено искажение смысла или использование в контексте, противоречащем нашей миссии.
          `
        },
        {
          title: "7. ОТКАЗ ОТ ОТВЕТСТВЕННОСТИ (DISCLAIMER)",
          text: `
* **Третьи лица:** Мы не несем ответственности за содержание внешних сайтов, на которые ведут ссылки.
* **"Как есть":** Материалы предоставляются без гарантий абсолютной полноты, хотя мы к этому стремимся.
* **Мнения:** Мнения авторов колонок или интервьюируемых могут не совпадать с позицией редакции.
          `
        },
        {
          title: "8. КОНФИДЕНЦИАЛЬНОСТЬ (GDPR COMPLIANCE)",
          text: `
Мы действуем в строгом соответствии с **Общим регламентом по защите данных (GDPR / RODO)** ЕС.

**8.1. Контроллер Данных**
Контроллером данных является Karakalpak-Voice Media Foundation (Варшава, Польша).
Email DPO (Data Protection Officer): privacy@karakalpakvoice.org

**8.2. Какие данные мы собираем?**
* **Технические данные:** IP-адреса (в логах безопасности, хранятся 12 мес.), тип браузера.
* **Cookies:** Только необходимые для работы сайта и анонимная аналитика (без идентификации личности).
* **Личные данные:** Email (только если вы сами подписались на рассылку или связались с нами).

**8.3. Ваши права**
Вы имеете право:
* Запросить доступ к своим данным.
* Потребовать их исправления или удаления («Право на забвение»).
* Отозвать согласие на обработку.

**8.4. Безопасность данных**
Данные хранятся на защищенных серверах в пределах Европейской Экономической Зоны (EEA). Мы не продаем и не передаем данные третьим лицам.
          `
        },
        {
          title: "9. ИЗМЕНЕНИЕ УСЛОВИЙ И РАЗРЕШЕНИЕ СПОРОВ",
          text: `
**9.1. Изменения**
Администрация оставляет за собой право обновлять данные Условия.
* О существенных изменениях будет сообщено через баннер на сайте за 30 дней.
* Продолжение использования сайта после обновлений означает согласие с ними.

**9.2. Применимое право**
Все правовые отношения регулируются законодательством **Республики Польша**.
Споры подлежат разрешению в судах г. Варшава.
          `
        },
        {
          title: "10. КОНТАКТНАЯ ИНФОРМАЦИЯ",
          text: `
Для связи с нами используйте соответствующие каналы:

* **Общие вопросы:** info@karakalpakvoice.org
* **Редакция / Пресс-релизы:** editorial@karakalpakvoice.org
* **Юридические вопросы:** legal@karakalpakvoice.org
* **Приватность и GDPR:** privacy@karakalpakvoice.org
* **Безопасность:** security@karakalpakvoice.org

*© 2025-2026 Karakalpak-Voice Media Foundation. Все права защищены. Варшава, Польша.*
          `
        }
      ],
      footerSlogan: "Каракалпакстан есть в мире. Каракалпакстан будет всегда.",
      footerLocation: "Варшава, Польша",
      footerDigital: "Цифровая свобода • Национальный голос"
    },
    KK: {
      title: "РЕДАКЦИЯЛЫҚ СИЯСАТ ҲӘМ ПАЙДАЛАНЫЎ ШӘРТЛЕРИ",
      subtitle: "(EDITORIAL POLICY & TERMS OF USE)",
      intro: "Karakalpak-Voice Digital Platform\nКүшке ениў сәнеси: 2025-жыл 18-декабрь\nСоңғы жаңаланыў: 2026-жыл 2-февраль\nЮрисдикция: Варшава, Польша Республикасы (Европа Аўқамы)",
      sections: [
        {
          title: "1. КИРИСИЎ ҲӘМ ҲУҚЫҚЫЙ СТАТУС",
          text: `
**1.1. Платформа Операторы**
«Karakalpak-Voice» платформасы (кейинги орынларда — «Платформа») **Karakalpak-Voice Media Foundation** шөлкеми тәрепинен басқарылады (дизимнен өтиў процесинде / Польша Республикасы нызамшылығына сәйкес ҳәрекет етеди).
* **Юридикалық мәнзил:** Варшава, Польша (анық мәнзил рәсмий сораў бойынша усынылады).
* **Ҳуқықый мәселелер бойынша байланыс:** legal@karakalpakvoice.org

**1.2. Статус ҳәм Миссия**
Биз Европа Аўқамының ҳуқықый майданында ҳәрекет етемиз. Бизиң статусымыз жай ғана жаңалықлар сайтынан жоқары. «Karakalpak-Voice» — бул төмендеги мақсетлер ушын жаратылған **Санлы Архив ҳәм Энциклопедия**:
* Қарақалпақ халқының тарийхын, мәдениятын ҳәм тилин системаластырыў ҳәм сақлаў.
* Инсан ҳуқықларының бузылыўын ҳужжетлестириў.
* Келешек әўладлар ушын мағлыўматлардың қолжетимлилигин тәмийинлеў.

Платформадан пайдаланыў арқалы сиз усы Шәртлерге разылық бересиз. Егер разы болмасаңыз, сайттан пайдаланыўды тоқтатыўыңызды сораймыз.
          `
        },
        {
          title: "2. МИССИЯ ҲӘМ ҚӘДИРИЯТЛАР",
          text: `
**2.1. Миссия**
* **Ҳақыйқат:** Ғәрезсиз, тексерилген мағлыўматларды усыныў.
* **Естелик:** Халықтың жәмәәтлик ядын умытылыўдан сақлаў.
* **Қорғаў:** Фактлерди ҳужжетлестириў арқалы инсан ҳуқықларын қорғаў (адвокация).

**2.2. Тийкарғы Принциплар**
* **Ғәрезсизлик:** Биз ҳүкиметлерге, партияларға ямаса корпорацияларға ғарезли емеспис.
* **Бейтараплық:** Биз фактлерди пикирлерден ажыратамыз.
* **Тарийхый Жуўапкершилик:** Биз тек жаңалық емес, тарийхты жазып атырғанымызды сезинемиз.
          `
        },
        {
          title: "3. ДӘЛЛИК, ВЕРИФИКАЦИЯ ҲӘМ ДҮЗЕТИЎЛЕР",
          text: `
**3.1. Тексериў Стандартлары**
Жәрияланып атырған мағлыўматлардың нәзиклигин есапқа алып, биз фактлерди тексериўдиң (Fact-Checking) қатаң протоколларын қолланамыз:
* Инсан ҳуқықларына байланыслы мағлыўматлар кеминде еки ғәрезсиз дереккөз арқалы тастыйықланады (егер бул дереккөзлер ушын қәўипсиз болса).
* Тарийхый мағлыўматлар архив ҳужжетлерине ҳәм гүўалықларға тийкарланады.

**3.2. Дүзетиў Сиясаты**
* Биз фактологиялық қәтелерди оператив түрде дүзетемиз.
* Әҳмийетли өзгерислер мақаланың соңында көрсетиледи (Correction Notice / UPD).
* Тарийхый жазбалар өширилмейди, бирақ жаңа контекст пенен толықтырылыўы мүмкин.
          `
        },
        {
          title: "4. САНЛЫ МИЙРАС СИЯСАТЫ (ARCHIVAL PLEDGE)",
          text: `
**4.1. Узақ Мүддетли Қолжетимлилик Кепиллиги**
Биз Платформа материалларының кеминде 30 жыл даўамында қолжетимли болып турыўын тәмийинлеўге миннетлеме аламыз. Бул — келешектеги изертлеўшилер ҳәм урпақлар алдындағы парызымыз.

**4.2. Пүтинлик ҳәм Резерв Көширме**
* **Өзгермеслик:** Силтемелер структурасы (Permalinks) турақлы болып қалады.
* **Резерв көширме (Backup):** Биз ЕА-ның түрли географиялық зоналарындағы қорғалған серверлерде күнделикли (инкрементал) ҳәм ҳәптелик (толық) резерв көширмелерди әмелге асырамыз.
* **Айрықша жағдай жобасы:** Қор (Фонд) өз жумысын тоқтатқан жағдайда, архив исенимли халықаралық санлы китапханаға ямаса ҳуқық қорғаў шөлкемине өткериледи.
          `
        },
        {
          title: "5. ҚӘЎИПСИЗЛИК ҲӘМ ПАЙДАЛАНЫЎ ҚАҒЫЙДАЛАРЫ",
          text: `
**5.1. Қадаған Етилген Ҳәрекетлер**
Архивти қорғаў махсетинде төмендегилерге қатаң тыйым салынады:
* Киберҳүжимлерди әмелге асырыў (DDoS, SQL-инъекциялар, Brute-force).
* Рухсатсыз ғалабалық мағлыўмат жыйнаў ушын автоматластырылған скриптлерди (Scrapers/Bots) пайдаланыў.
* Серверлерге ямаса аккаунтларға рухсатсыз кириўге урыныў.
* Зыянлы бағдарламаларды тарқатыў.
*Тәртипти бузыўшылар Польша ҳәм ЕА нызамларына сәйкес қуўдаланады.*

**5.2. Пайдаланыўшы Тәртиби**
Биз төмендегилерге «Нөл төзимлилик» (Zero Tolerance) сиясатын ұстанамыз:
* Өшпеншилик тили (Hate Speech), экстремизм, зорлық-зомбылыққа шақырыў.
* Киберқуўдалаў (Cyberbullying) ҳәм доксинг (жеке мағлыўматларды жәриялаў).
          `
        },
        {
          title: "6. АВТОРЛЫҚ ҲУҚЫҚ ҲӘМ ЛИЦЕНЗИЯЛАЎ",
          text: `
**6.1. Ҳуқық Ийеси**
Барлық оригинал контент (текстлер, фотолар, дизайн, мағлыўматлар базасы) **Karakalpak-Voice Media Foundation** интеллектуаллық мүлки болып табылады ҳәм авторлық ҳуқық нызамшылығы менен қорғалады.
**Статусы:** Барлық ҳуқықлар қорғалған (All Rights Reserved), егер басқаша көрсетилмеген болса.

**6.2. Ҳадал пайдаланыў (Fair Use)**
Биз билимлендириў ҳәм илимди қоллаймыз. Материаллардан пайдаланыўға рухсат бериледи, егер:
* **Махсет:** Билимлендириў, илимий, журналистикалық (коммерциялық емес).
* **Шәрт:** «Karakalpak-Voice» дерегине актив гиперсилтеме көрсетиў мәжбүрий.
* **Шеклеў:** Мәнисин бурмалаў ямаса бизиң миссиямызға қайшы келетуғын контексте пайдаланыўға тыйым салынады.
          `
        },
        {
          title: "7. ЖУЎАПКЕРШИЛИКТЕН БАС ТАРТЫЎ (DISCLAIMER)",
          text: `
* **Үшинши тәреплер:** Биз силтеме берилген сыртқы сайтлардың мазмуны ушын жуўапкер емеспиз.
* **«Болғанындай» (As Is):** Материаллар абсолют толықлық кепиллигисиз усынылады, деген менен биз соған умтыламыз.
* **Пикирлер:** Колонка авторлары ямаса интервью алыўшылардың пикирлери редакция позициясы менен сәйкес келмеўи мүмкин.
          `
        },
        {
          title: "8. ҚУПИЯЛЫЛЫҚ (GDPR COMPLIANCE)",
          text: `
Биз Европа Аўқамының **Мағлыўматларды қорғаў бойынша улыўма регламентине (GDPR / RODO)** қатаң әмел етемиз.

**8.1. Мағлыўматлар Контроллери**
Мағлыўматлар контроллери — Karakalpak-Voice Media Foundation (Варшава, Польша).
DPO (Мағлыўматларды қорғаў офицери) Email: privacy@karakalpakvoice.org

**8.2. Биз қандай мағлыўматларды жыйнаймыз?**
* **Техникалық мағлыўматлар:** IP-адреслер (қәўипсизлик логларында 12 ай сақланады), браузер түри.
* **Cookies:** Тек сайттың жумысы ушын зәрүр болған ҳәм аноним аналитика (жеке шахсты идентификациялаўсыз).
* **Жеке мағлыўматлар:** Email (тек егер сиз хабарламаға жазылған болсаңыз ямаса биз бенен байланысқа шыққан болсаңыз).

**8.3. Сизиң ҳуқықларыңыз**
Сиз төмендегилерге ҳуқықлысыз:
* Өз мағлыўматларыңызға кириўди талап етиў.
* Оларды дүзетиўди ямаса өшириўди талап етиў («Умытылыў ҳуқықы»).
* Қайта ислеўге берилген разылықты қайтарып алыў.

**8.4. Мағлыўматлар қәўипсизлиги**
Мағлыўматлар Европа Экономикалық Аймағы (EEA) шеңбериндеги қорғалған серверлерде сақланады. Биз мағлыўматларды сатпаймыз ҳәм үшинши тәреплерге бермеймиз.
          `
        },
        {
          title: "9. ШӘРТЛЕРДИ ӨЗГЕРТИЎ ҲӘМ ДАЎЛАРДЫ ШЕШИЎ",
          text: `
**9.1. Өзгерислер**
Администрация усы Шәртлерди жаңалаў ҳуқықын өзинде қалдырады.
* Әҳмийетли өзгерислер ҳаққында сайттағы баннер арқалы 30 күн алдын хабар бериледи.
* Жаңаланыўлардан кейин сайттан пайдаланыўды даўам етиў — олар менен келисиўди билдиреди.

**9.2. Қолланылатуғын ҳуқық**
Барлық ҳуқықый қатнасықлар **Польша Республикасы** нызамшылығы менен тәртипке салынады.
Даўлар Варшава қаласының сотларында шешиледи.
          `
        },
        {
          title: "10. БАЙЛАНЫС МАҒЛЫЎМАТЛАРЫ",
          text: `
Биз бенен байланысыў ушын тийисли каналларды пайдаланың:

* **Улыўма сораўлар:** info@karakalpakvoice.org
* **Редакция / Пресс-релизлер:** editorial@karakalpakvoice.org
* **Юридикалық мәселелер:** legal@karakalpakvoice.org
* **Қупиялылық ҳәм GDPR:** privacy@karakalpakvoice.org
* **Қәўипсизлик:** security@karakalpakvoice.org

*© 2025-2026 Karakalpak-Voice Media Foundation. Барлық ҳуқықлар қорғалған. Варшава, Польша.*
          `
        }
      ],
      footerSlogan: "Қарақалпақстан дүньяда бар. Қарақалпақстан мәңги бар болады.",
      footerLocation: "Варшава, Польша",
      footerDigital: "Санлы еркинлик • Миллий даўыс"
    },
    EN: {
      title: "EDITORIAL POLICY & TERMS OF USE",
      subtitle: "(EDITORIAL POLICY & TERMS OF USE)",
      intro: "Karakalpak-Voice Digital Platform\nEffective Date: December 18, 2025\nLast Updated: February 2, 2026\nJurisdiction: Warsaw, Republic of Poland (European Union)",
      sections: [
        {
          title: "1. INTRODUCTION AND LEGAL STATUS",
          text: `
**1.1. Platform Operator**
The "Karakalpak-Voice" platform (hereinafter referred to as the "Platform") is operated by the **Karakalpak-Voice Media Foundation** (in the process of registration / operating in accordance with the legislation of the Republic of Poland).
* **Registered Address:** Warsaw, Poland (exact address provided upon official request).
* **Contact for Legal Inquiries:** legal@karakalpakvoice.org

**1.2. Status and Mission**
We operate within the legal framework of the European Union. Our status goes beyond that of a news site. "Karakalpak-Voice" is a **Digital Archive and Encyclopedia** created for:
* Systematizing and preserving the history, culture, and language of the Karakalpak people.
* Documenting human rights violations.
* Ensuring access to information for future generations (20–30+ years).

By using the Platform, you agree to these Terms. If you do not agree, please discontinue using the site.
          `
        },
        {
          title: "2. MISSION AND VALUES",
          text: `
**2.1. Mission**
* **Truth:** Providing independent, verified information.
* **Memory:** Preserving the collective memory of the people from oblivion.
* **Protection:** Human rights advocacy through the documentation of facts.

**2.2. Principles**
* **Independence:** We are not dependent on governments, parties, or corporations.
* **Neutrality:** We separate facts from opinions.
* **Historical Responsibility:** We recognize that we are writing history, not just news.
          `
        },
        {
          title: "3. ACCURACY, VERIFICATION, AND CORRECTIONS",
          text: `
**3.1. Verification Standards**
We apply strict Fact-Checking protocols:
* Information regarding human rights is confirmed by at least two independent sources (where safe for the sources).
* Historical data is based on archival documents and testimonies.

**3.2. Correction Policy**
* We promptly correct factual errors.
* Substantial changes are noted at the end of the article (Correction Notice / UPD).
* Historical records are not deleted but may be supplemented with new context.
          `
        },
        {
          title: "4. DIGITAL HERITAGE POLICY (ARCHIVAL PLEDGE)",
          text: `
**4.1. Guarantee of Long-Term Access (30+ years)**
We pledge to maintain the availability of Platform materials for at least 30 years. This is our duty to future researchers and descendants.

**4.2. Integrity and Backup**
* **Immutability:** The link structure (Permalinks) remains stable.
* **Backup:** We conduct daily (incremental) and weekly (full) backups to secure servers in different geographical zones of the EU.
* **Contingency Plan:** In the event of the Foundation's cessation of activities, the archive will be transferred to a trusted international digital library or human rights organization.
          `
        },
        {
          title: "5. SECURITY AND TERMS OF USE",
          text: `
**5.1. Prohibited Activities**
To protect the Archive, it is strictly prohibited to:
* Commit cyberattacks (DDoS, SQL injections, Brute-force).
* Use automated scripts (Scrapers/Bots) for mass data collection without permission.
* Attempt to gain unauthorized access to servers or accounts.
* Distribute malware.
*Violators will be prosecuted under the laws of Poland and the EU.*

**5.2. User Conduct**
We adhere to a "Zero Tolerance" policy regarding:
* Hate Speech, extremism, calls for violence.
* Cyberbullying and doxing (publication of personal data).
          `
        },
        {
          title: "6. COPYRIGHT AND LICENSING",
          text: `
**6.1. Rights Owner**
All original content (texts, photos, design, database) is the intellectual property of the **Karakalpak-Voice Media Foundation** and is protected by copyright law.
**Status:** All Rights Reserved, unless otherwise stated.

**6.2. Fair Use**
We support education and science. The use of materials is permitted:
* **Purpose:** Educational, scientific, journalistic (non-commercial).
* **Condition:** Mandatory active hyperlink to "Karakalpak-Voice".
* **Restriction:** Distortion of meaning or use in a context contradicting our mission is prohibited.
          `
        },
        {
          title: "7. DISCLAIMER",
          text: `
* **Third Parties:** We are not responsible for the content of external sites linked to.
* **"As Is":** Materials are provided without guarantees of absolute completeness, although we strive for it.
* **Opinions:** The opinions of column authors or interviewees may not coincide with the position of the editorial board.
          `
        },
        {
          title: "8. PRIVACY (GDPR COMPLIANCE)",
          text: `
We operate in strict accordance with the **General Data Protection Regulation (GDPR)** of the EU.

**8.1. Data Controller**
The Data Controller is the Karakalpak-Voice Media Foundation (Warsaw, Poland).
Email DPO (Data Protection Officer): privacy@karakalpakvoice.org

**8.2. What Data Do We Collect?**
* **Technical Data:** IP addresses (in security logs, stored for 12 months), browser type.
* **Cookies:** Only those necessary for site operation and anonymous analytics (without personal identification).
* **Personal Data:** Email (only if you subscribed to the newsletter or contacted us yourself).

**8.3. Your Rights**
You have the right to:
* Request access to your data.
* Demand their correction or deletion ("Right to be Forgotten").
* Withdraw consent for processing.

**8.4. Data Security**
Data is stored on secure servers within the European Economic Area (EEA). We do not sell or transfer data to third parties.
          `
        },
        {
          title: "9. MODIFICATION OF TERMS AND DISPUTE RESOLUTION",
          text: `
**9.1. Changes**
The Administration reserves the right to update these Terms.
* Substantial changes will be announced via a banner on the site 30 days in advance.
* Continued use of the site after updates constitutes agreement with them.

**9.2. Governing Law**
All legal relations are governed by the legislation of the **Republic of Poland**.
Disputes are subject to resolution in the courts of Warsaw.
          `
        },
        {
          title: "10. CONTACT INFORMATION",
          text: `
To contact us, please use the appropriate channels:

* **General Inquiries:** info@karakalpakvoice.org
* **Editorial / Press Releases:** editorial@karakalpakvoice.org
* **Legal Inquiries:** legal@karakalpakvoice.org
* **Privacy and GDPR:** privacy@karakalpakvoice.org
* **Security:** security@karakalpakvoice.org

*© 2025-2026 Karakalpak-Voice Media Foundation. All rights reserved. Warsaw, Poland.*
          `
        }
      ],
      footerSlogan: "Karakalpakstan exists in the world. Karakalpakstan will exist forever.",
      footerLocation: "Warsaw, Poland",
      footerDigital: "Digital Freedom • National Voice"
    },
    PL: {
      title: "POLITYKA REDAKCYJNA I WARUNKI UŻYTKOWANIA",
      subtitle: "(EDITORIAL POLICY & TERMS OF USE)",
      intro: "Karakalpak-Voice Digital Platform\nData wejścia w życie: 18 grudnia 2025 r.\nOstatnia aktualizacja: 2 lutego 2026 r.\nJurysdykcja: Warszawa, Rzeczpospolita Polska (Unia Europejska)",
      sections: [
        {
          title: "1. WPROWADZENIE I STATUS PRAWNY",
          text: `
**1.1. Operator Platformy**
Platforma „Karakalpak-Voice” (zwana dalej „Platformą”) jest obsługiwana przez organizację **Karakalpak-Voice Media Foundation** (w trakcie rejestracji / działająca zgodnie z prawem Rzeczypospolitej Polskiej).
* **Adres rejestrowy:** Warszawa, Polska (dokładny adres udostępniany na oficjalny wniosek).
* **Kontakt w sprawach prawnych:** legal@karakalpakvoice.org

**1.2. Status i Misja**
Działamy w ramach prawnych Unii Europejskiej. Nasz status wykracza poza ramy serwisu informacyjnego. „Karakalpak-Voice” to **Cyfrowe Archiwum i Encyklopedia**, stworzona w celu:
* Systematyzacji i zachowania historii, kultury i języka narodu karakałpackiego.
* Dokumentowania naruszeń praw człowieka.
* Zapewnienia dostępu do informacji przyszłym pokoleniom (20–30+ lat).

Korzystając z Platformy, użytkownik akceptuje niniejsze Warunki. Jeśli nie wyrażasz zgody, prosimy o zaprzestanie korzystania z witryny.
          `
        },
        {
          title: "2. MISJA I WARTOŚCI",
          text: `
**2.1. Misja**
* **Prawda:** Dostarczanie niezależnych, zweryfikowanych informacji.
* **Pamięć:** Ochrona zbiorowej pamięci narodu przed zapomnieniem.
* **Ochrona:** Rzecznictwo praw człowieka poprzez dokumentowanie faktów.

**2.2. Zasady**
* **Niezależność:** Nie jesteśmy zależni od rządów, partii politycznych ani korporacji.
* **Neutralność:** Oddzielamy fakty od opinii.
* **Odpowiedzialność Historyczna:** Mamy świadomość, że piszemy historię, a nie tylko newsy.
          `
        },
        {
          title: "3. DOKŁADNOŚĆ, WERYFIKACJA I KOREKTY",
          text: `
**3.1. Standardy Weryfikacji**
Stosujemy ścisłe protokoły sprawdzania faktów (Fact-Checking):
* Informacje dotyczące praw człowieka są potwierdzane przez co najmniej dwa niezależne źródła (tam, gdzie jest to bezpieczne dla źródeł).
* Dane historyczne opierają się na dokumentach archiwalnych i świadectwach.

**3.2. Polityka Korekt**
* Niezwłocznie poprawiamy błędy faktyczne.
* Istotne zmiany są odnotowywane na końcu artykułu (Nota korekcyjna / UPD).
* Zapisy historyczne nie są usuwane, ale mogą być uzupełniane o nowy kontekst.
          `
        },
        {
          title: "4. POLITYKA DZIEDZICTWA CYFROWEGO (ZOBOWIĄZANIE ARCHIWALNE)",
          text: `
**4.1. Gwarancja Długoterminowego Dostępu (30+ lat)**
Zobowiązujemy się do utrzymania dostępności materiałów Platformy przez co najmniej 30 lat. Jest to nasz obowiązek wobec przyszłych badaczy i potomnych.

**4.2. Integralność i Tworzenie Kopii Zapasowych**
* **Niezmienność:** Struktura linków (Permalinks) pozostaje stabilna.
* **Backup:** Przeprowadzamy codzienne (przyrostowe) i cotygodniowe (pełne) kopie zapasowe na bezpiecznych serwerach w różnych strefach geograficznych UE.
* **Plan Awaryjny:** W przypadku zakończenia działalności Fundacji, archiwum zostanie przekazane zaufanej międzynarodowej bibliotece cyfrowej lub organizacji praw człowieka.
          `
        },
        {
          title: "5. BEZPIECZEŃSTWO I WARUNKI UŻYTKOWANIA",
          text: `
**5.1. Zabronione Działania**
W celu ochrony Archiwum surowo zabrania się:
* Dokonywania cyberataków (DDoS, SQL injection, Brute-force).
* Używania automatycznych skryptów (Scrapers/Bots) do masowego pobierania danych bez zezwolenia.
* Prób uzyskania nieautoryzowanego dostępu do serwerów lub kont.
* Rozpowszechniania złośliwego oprogramowania (malware).
*Naruszenia będą ścigane zgodnie z prawem Polski i UE.*

**5.2. Zachowanie Użytkowników**
Stosujemy politykę „Zero Tolerancji” (Zero Tolerance) wobec:
* Mowy nienawiści (Hate Speech), ekstremizmu, nawoływania do przemocy.
* Cyberprzemocy (Cyberbullying) i doxingu (publikowania danych osobowych).
          `
        },
        {
          title: "6. PRAWA AUTORSKIE I LICENCJONOWANIE",
          text: `
**6.1. Właściciel Praw**
Wszelkie oryginalne treści (teksty, zdjęcia, projekt, baza danych) są własnością intelektualną **Karakalpak-Voice Media Foundation** i są chronione prawem autorskim.
**Status:** Wszelkie prawa zastrzeżone (All Rights Reserved), chyba że zaznaczono inaczej.

**6.2. Dozwolony Użytek (Fair Use)**
Wspieramy edukację i naukę. Zezwala się na wykorzystanie materiałów:
* **Cel:** Edukacyjny, naukowy, dziennikarski (niekomercyjny).
* **Warunek:** Obowiązkowy aktywny hiperlink do „Karakalpak-Voice”.
* **Ograniczenie:** Zabrania się zniekształcania znaczenia lub użycia w kontekście sprzecznym z naszą misją.
          `
        },
        {
          title: "7. WYŁĄCZENIE ODPOWIEDZIALNOŚCI (DISCLAIMER)",
          text: `
* **Strony Trzecie:** Nie ponosimy odpowiedzialności za treści zewnętrznych witryn, do których prowadzą linki.
* **„Tak jak jest” (As Is):** Materiały są dostarczane bez gwarancji absolutnej kompletności, choć do niej dążymy.
* **Opinie:** Opinie autorów felietonów lub rozmówców mogą nie być zbieżne ze stanowiskiem redakcji.
          `
        },
        {
          title: "8. PRYWATNOŚĆ (ZGODNOŚĆ Z RODO / GDPR)",
          text: `
Działamy w ścisłej zgodności z **Ogólnym Rozporządzeniem o Ochronie Danych (RODO / GDPR)** UE.

**8.1. Administrator Danych**
Administratorem danych jest Karakalpak-Voice Media Foundation (Warszawa, Polska).
Email IOD (Inspektor Ochrony Danych): privacy@karakalpakvoice.org

**8.2. Jakie dane zbieramy?**
* **Dane techniczne:** Adresy IP (w logach bezpieczeństwa, przechowywane przez 12 miesięcy), typ przeglądarki.
* **Pliki cookies:** Tylko niezbędne do działania strony i anonimowa analityka (bez identyfikacji tożsamości).
* **Dane osobowe:** Email (tylko w przypadku samodzielnego zapisania się do newslettera lub kontaktu z nami).

**8.3. Twoje Prawa**
Masz prawo do:
* Żądania dostępu do swoich danych.
* Żądania ich sprostowania lub usunięcia („Prawo do bycia zapomnianym”).
* Wycofania zgody na przetwarzanie.

**8.4. Bezpieczeństwo Danych**
Dane są przechowywane na bezpiecznych serwerach w obszarze Europejskiego Obszaru Gospodarczego (EOG). Nie sprzedajemy ani nie przekazujemy danych osobom trzecim.
          `
        },
        {
          title: "9. ZMIANA WARUNKÓW I ROZSTRZYGANIE SPORÓW",
          text: `
**9.1. Zmiany**
Administracja zastrzega sobie prawo do aktualizacji niniejszych Warunków.
* O istotnych zmianach poinformujemy za pomocą banera na stronie z 30-dniowym wyprzedzeniem.
* Dalsze korzystanie ze strony po aktualizacjach oznacza zgodę na nie.

**9.2. Prawo Właściwe**
Wszelkie stosunki prawne podlegają ustawodawstwu **Rzeczypospolitej Polskiej**.
Spory podlegają rozstrzygnięciu przez sądy w Warszawie.
          `
        },
        {
          title: "10. DANE KONTAKTOWE",
          text: `
Aby się z nami skontaktować, prosimy korzystać z odpowiednich kanałów:

* **Zapytania ogólne:** info@karakalpakvoice.org
* **Redakcja / Komunikaty prasowe:** editorial@karakalpakvoice.org
* **Kwestie prawne:** legal@karakalpakvoice.org
* **Prywatność i RODO:** privacy@karakalpakvoice.org
* **Bezpieczeństwo:** security@karakalpakvoice.org

*© 2025-2026 Karakalpak-Voice Media Foundation. Wszelkie prawa zastrzeżone. Warszawa, Polska.*
          `
        }
      ],
      footerSlogan: "Karakałpakstan istnieje na świecie. Karakałpakstan będzie istnieć zawsze.",
      footerLocation: "Warszawa, Polska",
      footerDigital: "Wolność Cyfrowa • Głos Narodowy"
    }
  };

  const currentContent = content[langKey] || content.RU;

  return (
    <div className="bg-gray-50 dark:bg-[#000212] min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300 font-sans">
      
      {/* HEADER IMAGE */}
      <div className="relative h-64 md:h-96 w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <img 
          src="/images/policy.jpg" 
          alt="Policy Background" 
          className="w-full h-full object-cover"
          onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=1200&q=80'} // Fallback image if local is missing
        />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
          <ShieldCheck size={64} className="text-white mb-4 opacity-90" />
          <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-2 drop-shadow-lg">
            {currentContent.title}
          </h1>
          <p className="text-sm md:text-base text-gray-300 max-w-2xl font-mono">
            {currentContent.subtitle}
          </p>
        </div>
      </div>

      {/* CONTENT CONTAINER */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        
        {/* Intro Box */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 mb-12">
          <pre className="whitespace-pre-line font-mono text-sm text-gray-600 dark:text-gray-400">
            {currentContent.intro}
          </pre>
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {currentContent.sections.map((section, idx) => (
            <section key={idx} className="relative pl-6 md:pl-8 border-l-2 border-blue-500/30">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500" />
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
                {section.title}
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
                {section.text.split('\n').map((line, i) => {
                  // Bold text handling (**text**)
                  if (line.includes('**')) {
                    const parts = line.split('**');
                    return (
                      <p key={i} className="mb-2">
                        {parts.map((part, j) => (j % 2 === 1 ? <strong key={j} className="text-black dark:text-white">{part}</strong> : part))}
                      </p>
                    );
                  }
                  // Bullet points
                  if (line.trim().startsWith('*')) {
                    return <li key={i} className="ml-4 mb-2 list-disc">{line.replace('*', '').trim()}</li>;
                  }
                  if (line.trim() === '') return <br key={i} />;
                  return <p key={i} className="mb-2">{line}</p>;
                })}
              </div>
            </section>
          ))}
        </div>

      </div>

    </div>
  );
}