import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Award, Landmark, BookOpen, Flag, Music, Users, Phone, Mail, MapPin, ArrowRight, Facebook, Instagram, Twitter, Youtube, Send } from "lucide-react";

export default function Home() {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'KK');

  useEffect(() => {
    const handleStorageChange = () => setLang(localStorage.getItem('lang') || 'KK');
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const t = {
    KK: {
      hero: { pre: "karakalpakvoice - Ғәрезсиз Қарақалпақстан мәлимлеме платформасы.", title: "Халқымыздың даўысын дүньяға жеткериў", cta: "Басынан баслаў" },
      sections: [
        { title: "Суверенитет", desc: "Қарақалпақстан Республикасының мәмлекетлик Ғәрезсизлиги", cta: "Толығырақ", path: "/sovereignty", icon: Award },
        { title: "Декларация", desc: "Мәмлекетлик Суверенитет Декларациясы", cta: "Оқыў", path: "/declaration", icon: Landmark },
        { title: "Конституция", desc: "Республика Конституциясы", cta: "Көриў", path: "/constitution", icon: BookOpen },
        { title: "Байрақ", desc: "Қарақалпақстан Республикасының Мәмлекетлик Байрағы", cta: "Толығырақ", path: "/flag", icon: Flag },
        { title: "Гимн", desc: "Қарақалпақстан Республикасының Мәмлекетлик гимни", cta: "Тыңлаў", path: "/anthem", icon: Music },
        { title: "Биз туўралы", desc: "Командамыз ҳәм миссиямыз туўралы", cta: "Танысыў", path: "/about", icon: Users }
      ],
      footer: {
        tagline: "karakalpakvoice.org - бул тек ғана сайт емес, бул санлы миллий Ғәрезсизлик ушын қурал.",
        mission: "Қарақалпақстан халқы ушын 100 пайыз басқарылатуғын медиа-платформа.",
        location: "📍 Мәнзил: Варшава, Польша",
        contact: "Байланысыў",
        join: "Қосылыў"
      }
    },
    RU: {
      hero: { pre: "Karakalpakvoice - Независимая информационная платформа Каракалпакстана", title: "Голос нашего народа достигает мира", cta: "Начать" },
      sections: [
        { title: "Суверенитет", desc: "Государственная независимость Республики Каракалпакстан", cta: "Подробнее", path: "/sovereignty", icon: Award },
        { title: "Декларация", desc: "Декларация государственного суверенитета", cta: "Читать", path: "/declaration", icon: Landmark },
        { title: "Конституция", desc: "Конституция республики Каракалпакстан", cta: "Смотреть", path: "/constitution", icon: BookOpen },
        { title: "Флаг", desc: "Государственный флаг Республики Каракалпакстан", cta: "Подробнее", path: "/flag", icon: Flag },
        { title: "Гимн", desc: "Государственный гимн Республики Каракалпакстан", cta: "Слушать", path: "/anthem", icon: Music },
        { title: "О нас", desc: "О нашей команде и миссии", cta: "Познакомиться", path: "/about", icon: Users }
      ],
      footer: {
        tagline: "karakalpakvoice.org - это не просто сайт, это инструмент для цифровой национальной независимости.",
        mission: "Медиа-платформа, на 100% управляемая для народа Каракалпакстана.",
        location: "📍 Адрес: Варшава, Польша",
        contact: "Контакты",
        join: "Присоединиться"
      }
    },
    EN: {
      hero: { pre: "Karakalpakvoice - Independent Karakalpakstan Information Platform", title: "Our people's voice reaches the world", cta: "Get started" },
      sections: [
        { title: "Sovereignty", desc: "State independence of the Republic of Karakalpakstan", cta: "Learn more", path: "/sovereignty", icon: Award },
        { title: "Declaration", desc: "Declaration of State Sovereignty", cta: "Read", path: "/declaration", icon: Landmark },
        { title: "Constitution", desc: "Constitution of the Republic of Karakalpakstan", cta: "View", path: "/constitution", icon: BookOpen },
        { title: "Flag", desc: "State Flag of the Republic of Karakalpakstan", cta: "Learn more", path: "/flag", icon: Flag },
        { title: "Anthem", desc: "State Anthem of the Republic of Karakalpakstan", cta: "Listen", path: "/anthem", icon: Music },
        { title: "About", desc: "About our team and mission", cta: "Meet us", path: "/about", icon: Users }
      ],
      footer: {
        tagline: "karakalpakvoice.org - not just a website, but a tool for digital national independence.",
        mission: "A media platform 100% managed for the Karakalpak people.",
        location: "📍 Address: Warsaw, Poland",
        contact: "Contact",
        join: "Join"
      }
    },
    PL: {
      hero: { pre: "Karakalpakvoice - Niezależna platforma informacyjna Karakalpakstanu", title: "Głos naszego narodu dociera do świata", cta: "Rozpocznij" },
      sections: [
        { title: "Suwerenność", desc: "Niepodległość państwowa Republiki Karakałpakstanu", cta: "Dowiedz się więcej", path: "/sovereignty", icon: Award },
        { title: "Deklaracja", desc: "Deklaracja suwerenności państwowej", cta: "Czytaj", path: "/declaration", icon: Landmark },
        { title: "Konstytucja", desc: "Konstytucja Republiki Karakałpackiej, cta: "Zobacz", path: "/constitution", icon: BookOpen },
        { title: "Flaga", desc: "Flaga państwowa Republiki Karakałpakstanu", cta: "Dowiedz się więcej", path: "/flag", icon: Flag },
        { title: "Hymn", desc: "Hymn państwowy Republiki Karakałpakstanu", cta: "Słuchaj", path: "/anthem", icon: Music },
        { title: "O nas", desc: "O naszym zespole i misji", cta: "Poznaj nas", path: "/about", icon: Users }
      ],
      footer: {
        tagline: "karakalpakvoice.org - to nie tylko strona, ale narzędzie dla cyfrowej niepodległości narodowej.",
        mission: "Platforma medialna w 100% zarządzana dla narodu karakałpakskiego.",
        location: "📍 Adres: Warszawa, Polska",
        contact: "Kontakt",
        join: "Dołącz"
      }
    }
  }[lang];

  const socialLinks = [
    { icon: Facebook, url: "https://www.facebook.com/share/1FifdzG23b/", label: "Facebook" },
    { icon: Instagram, url: "https://www.instagram.com/karakalpakvoice_org/", label: "Instagram" },
    { icon: Send, url: "https://t.me/kkvoice_org", label: "Telegram" },
    { icon: Twitter, url: "https://x.com/Karakalpak45997", label: "Twitter" },
    { icon: Youtube, url: "https://youtube.com/@karakalpakvoice_org", label: "YouTube" }
  ];

  return (
    <div className="bg-white dark:bg-[#000000] text-black dark:text-white">
      
      {/* HERO */}
      <section className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-b from-gray-50 to-white dark:from-[#1d1d1f] dark:to-[#000000]">
        <div className="max-w-5xl mx-auto text-center pt-20">
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-6 font-medium">
            {t.hero.pre}
          </p>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight leading-[1.05]">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600">
              {t.hero.title}
            </span>
          </h1>
          
          <button className="mt-8 px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full font-semibold text-lg transition-all shadow-xl hover:shadow-2xl hover:scale-105">
            {t.hero.cta}
          </button>

          {/* Social links preview */}
          <div className="mt-16 flex items-center justify-center gap-6">
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-100 dark:bg-gray-900 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-all hover:scale-110"
                aria-label={social.label}
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* SECTIONS */}
      {t.sections.map((section, i) => {
        const Icon = section.icon;
        const nextSection = t.sections[i + 1];
        
        return (
          <div key={i} className="relative">
            <section className="min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-b from-white to-gray-50 dark:from-[#000000] dark:to-[#1d1d1f] border-t border-gray-200 dark:border-gray-800">
              <div className="max-w-6xl w-full">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                  
                  <div className={i % 2 === 0 ? 'order-1' : 'order-2'}>
                    <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full text-sm font-bold mb-6">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    
                    <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-[1.1]">
                      {section.title}
                    </h2>
                    
                    <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
                      {section.desc}
                    </p>
                    
                    <Link 
                      to={section.path}
                      className="inline-flex items-center gap-3 px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-semibold text-lg hover:scale-105 transition-all shadow-lg"
                    >
                      {section.cta}
                      <ArrowRight size={20} />
                    </Link>
                  </div>

                  <div className={i % 2 === 0 ? 'order-2' : 'order-1'}>
                    <div className="relative w-full aspect-square max-w-md mx-auto">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 rounded-[48px] backdrop-blur-sm border border-gray-200 dark:border-gray-800 shadow-2xl" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon size={160} strokeWidth={0.8} className="text-purple-600 dark:text-purple-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {nextSection && (
              <div className="h-24 bg-gray-50 dark:bg-[#1d1d1f] border-t border-gray-200 dark:border-gray-800 flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity">
                <p className="text-xl md:text-2xl font-bold text-center">
                  {nextSection.title}
                </p>
              </div>
            )}
          </div>
        );
      })}

      {/* FOOTER */}
      <footer className="relative bg-gradient-to-br from-purple-600 via-pink-600 to-purple-600 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold mb-6">
              {t.footer.tagline}
            </h3>
            <p className="text-2xl md:text-3xl mb-4 opacity-90">
              {t.footer.mission}
            </p>
            <p className="text-xl opacity-80 flex items-center justify-center gap-2">
              <MapPin size={20} />
              {t.footer.location}
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 justify-center mb-12">
            <Link
              to="/join"
              className="px-10 py-4 bg-white text-purple-600 rounded-full font-bold text-lg hover:scale-105 transition-all text-center"
            >
              {t.footer.join}
            </Link>
            
            <a
              href="mailto:info@karakalpakvoice.org"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-full font-bold text-lg hover:bg-white/20 transition-all"
            >
              <Mail size={20} />
              {t.footer.contact}
            </a>
          </div>

          <div className="flex items-center justify-center gap-6 pt-8 border-t border-white/20">
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all hover:scale-110"
                aria-label={social.label}
              >
                <social.icon size={24} />
              </a>
            ))}
          </div>

          <p className="text-center mt-12 opacity-70 text-sm">
            © 2025 KarakalpakVoice.org. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
    }
