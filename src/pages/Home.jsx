import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Award,
  Landmark,
  BookOpen,
  Flag,
  Music,
  Users,
  ArrowRight,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Send,
  MapPin
} from "lucide-react";

export default function Home() {
  // React state арқылы тілді басқару
  const [lang, setLang] = useState("RU");

  // Navigation-дан тіл өзгерісін тыңдау
  useEffect(() => {
    const handleLangChange = (e) => {
      if (e.detail?.lang) {
        setLang(e.detail.lang);
      }
    };
    window.addEventListener("languageChange", handleLangChange);
    return () => window.removeEventListener("languageChange", handleLangChange);
  }, []);

  // Аудармалар объектісі
  const translations = {
    KK: {
      hero: {
        pre: "Қарақалпақстан медиа платформасы",
        title: "Халқымыздың даўысы дүньяға жетеди",
        cta: "Басынан баслаў"
      },
      sections: [
        {
          title: "Суверенитет",
          desc: "Қарақалпақстан Республикасының мәмлекетлик ғәрезсизлиги",
          cta: "Толығырақ",
          path: "/sovereignty",
          icon: Award,
          image: "/images/sovereignty.jpg"
        },
        {
          title: "Декларация",
          desc: "Мәмлекетлик суверенитет ҳаққындағы декларация",
          cta: "Оқыў",
          path: "/declaration",
          icon: Landmark,
          image: "/images/declaration.jpg"
        },
        {
          title: "Конституция",
          desc: "Қарақалпақстан Республикасы Конституциясы",
          cta: "Көриў",
          path: "/constitution",
          icon: BookOpen,
          image: "/images/constitution.jpg"
        },
        {
          title: "Байрақ",
          desc: "Қарақалпақстан Республикасының мәмлекетлик байрағы",
          cta: "Толығырақ",
          path: "/flag",
          icon: Flag,
          image: "/images/flag.jpg"
        },
        {
          title: "Гимн",
          desc: "Қарақалпақстан Республикасының мәмлекетлик гимни",
          cta: "Тыңлаў",
          path: "/anthem",
          icon: Music,
          image: "/images/anthem.jpg"
        },
        {
          title: "Команда",
          desc: "Бизиң команда ҳәм миссия",
          cta: "Танысыў",
          path: "/about",
          icon: Users,
          image: "/images/team.jpg"
        }
      ],
      footer: {
        tagline: "karakalpakvoice.org — санлы миллий ғәрезсизлик платформасы",
        mission: "Қарақалпақ халқы ушын 100% басқарылатуғын медиа",
        location: "Варшава, Польша",
        join: "Қосылыў",
        contact: "Байланыс"
      }
    },

    RU: {
      hero: {
        pre: "Медиа платформа Каракалпакстана",
        title: "Голос нашего народа достигает мира",
        cta: "Начать"
      },
      sections: [
        {
          title: "Суверенитет",
          desc: "Государственная независимость Республики Каракалпакстан",
          cta: "Подробнее",
          path: "/sovereignty",
          icon: Award,
          image: "/images/sovereignty.jpg"
        },
        {
          title: "Декларация",
          desc: "Декларация государственного суверенитета",
          cta: "Читать",
          path: "/declaration",
          icon: Landmark,
          image: "/images/declaration.jpg"
        },
        {
          title: "Конституция",
          desc: "Конституция Республики Каракалпакстан",
          cta: "Смотреть",
          path: "/constitution",
          icon: BookOpen,
          image: "/images/constitution.jpg"
        },
        {
          title: "Флаг",
          desc: "Государственный флаг Республики Каракалпакстан",
          cta: "Подробнее",
          path: "/flag",
          icon: Flag,
          image: "/images/flag.jpg"
        },
        {
          title: "Гимн",
          desc: "Государственный гимн Республики Каракалпакстан",
          cta: "Слушать",
          path: "/anthem",
          icon: Music,
          image: "/images/anthem.jpg"
        },
        {
          title: "Команда",
          desc: "Наша команда и миссия",
          cta: "Познакомиться",
          path: "/about",
          icon: Users,
          image: "/images/team.jpg"
        }
      ],
      footer: {
        tagline: "karakalpakvoice.org — инструмент цифровой независимости",
        mission: "Медиа-платформа, управляемая народом",
        location: "Варшава, Польша",
        join: "Присоединиться",
        contact: "Контакты"
      }
    }
  };

  // Ағымдағы тілді таңдау
  const t = translations[lang] || translations.RU;

  const socials = [
    { icon: Facebook, url: "https://facebook.com" },
    { icon: Instagram, url: "https://instagram.com" },
    { icon: Twitter, url: "https://x.com" },
    { icon: Youtube, url: "https://youtube.com" },
    { icon: Send, url: "https://t.me" }
  ];

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white">

      {/* HERO */}
      <section className="min-h-screen flex items-center justify-center text-center px-6">
        <div className="max-w-5xl">
          <p className="text-lg text-gray-500 mb-6">{t.hero.pre}</p>
          <h1 className="text-6xl md:text-8xl font-bold mb-10">
            {t.hero.title}
          </h1>
          <button className="px-10 py-4 rounded-full bg-black text-white dark:bg-white dark:text-black text-lg font-semibold">
            {t.hero.cta}
          </button>
        </div>
      </section>

      {/* SECTIONS — APPLE STYLE */}
      {t.sections.map((s, i) => {
        const Icon = s.icon;
        return (
          <section
            key={i}
            className="min-h-screen flex items-center px-6 py-24"
          >
            <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-20 items-center">
              <div className={i % 2 === 0 ? "" : "md:order-2"}>
                <h2 className="text-5xl md:text-7xl font-bold mb-6">
                  {s.title}
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-10">
                  {s.desc}
                </p>
                <Link
                  to={s.path}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-black text-white dark:bg-white dark:text-black text-lg font-semibold"
                >
                  {s.cta}
                  <ArrowRight size={20} />
                </Link>
              </div>

              <div className={i % 2 === 0 ? "" : "md:order-1"}>
                <div className="aspect-[4/3] rounded-[32px] overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* FOOTER */}
      <footer className="py-20 px-6 bg-black text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-4xl font-bold mb-4">{t.footer.tagline}</h3>
          <p className="text-xl opacity-80 mb-6">{t.footer.mission}</p>
          <p className="flex justify-center items-center gap-2 opacity-70 mb-10">
            <MapPin size={18} /> {t.footer.location}
          </p>

          <div className="flex justify-center gap-6 mb-10">
            {socials.map((s, i) => {
              const Icon = s.icon;
              return (
                <a key={i} href={s.url} target="_blank" rel="noreferrer">
                  <Icon />
                </a>
              );
            })}
          </div>

          <p className="text-sm opacity-50">
            © 2025 KarakalpakVoice.org
          </p>
        </div>
      </footer>
    </div>
  );
        }
