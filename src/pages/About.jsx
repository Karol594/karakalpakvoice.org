import React, { useState, useEffect } from 'react';
import { Target, Shield, Globe, Heart, Users, CheckCircle } from 'lucide-react';

export default function About() {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'KK');

  useEffect(() => {
    const handleStorageChange = () => setLang(localStorage.getItem('lang') || 'KK');
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const content = {
    KK: {
      title: "БИЗ ТУЎРАЛЫ",
      intro: "Қарақалпақстан Даўысы — бул Қарақалпақстан халқының еркин мағлыўматлар алыў ҳәм өз пикирлерин билдириў мүмкиншилигин беретуғын платформа.",
      mission: {
        title: "БИЗИҢ МИССИЯМЫЗ",
        items: [
          "Қарақалпақ халқының даўысын әлемге жеткизиў",
          "Цензурасыз ҳәм объективли мәлимлеме бериў",
          "Мәдений мийрас пенен тилди сақлаў",
          "Халықтың ҳуқықларын қорғаў"
        ]
      },
      principles: {
        title: "БИЗИҢ ПРИНЦИПЛЕРИМИЗ",
        items: [
          "Ашықлық ҳәм шынайылық",
          "Көп тилли қоллап-қуўатлаў",
          "Мәдений толерантлық",
          "Ғәрезсиз ҳәм объективлилик"
        ]
      },
      team: {
        title: "КОМАНДА",
        desc: "Биз - жас журналистлер, блогерлер ҳәм белсендилер топарымыз. Бизиң махсетимиз - Қарақалпақстан ҳаққында дурыс мағлыўматларды дүньяға тарқатыў."
      }
    },
    RU: {
      title: "О НАС",
      intro: "Голос Каракалпакстана — это платформа, предоставляющая народу Каракалпакстана возможность свободно получать информацию и выражать свое мнение.",
      mission: {
        title: "НАША МИССИЯ",
        items: [
          "Донести голос Каракалпакского народа до мира",
          "Предоставить информацию без цензуры и объективно",
          "Сохранить культурное наследие и язык",
          "Защитить права народа"
        ]
      },
      principles: {
        title: "НАШИ ПРИНЦИПЫ",
        items: [
          "Открытость и честность",
          "Многоязычная поддержка",
          "Культурная толерантность",
          "Беспристрастность и объективность"
        ]
      },
      team: {
        title: "КОМАНДА",
        desc: "Мы — группа молодых журналистов, блогеров и активистов. Наша цель — распространить правдивую информацию о Каракалпакстане по всему миру."
      }
    },
    EN: {
      title: "ABOUT US",
      intro: "Karakalpak Voice is a platform that provides the people of Karakalpakstan with the opportunity to freely access information and express their opinions.",
      mission: {
        title: "OUR MISSION",
        items: [
          "Bring the voice of the Karakalpak people to the world",
          "Provide uncensored and objective information",
          "Preserve cultural heritage and language",
          "Protect the rights of the people"
        ]
      },
      principles: {
        title: "OUR PRINCIPLES",
        items: [
          "Openness and honesty",
          "Multilingual support",
          "Cultural tolerance",
          "Impartiality and objectivity"
        ]
      },
      team: {
        title: "TEAM",
        desc: "We are a group of young journalists, bloggers, and activists. Our goal is to spread truthful information about Karakalpakstan around the world."
      }
    },
    PL: {
      title: "O NAS",
      intro: "Głos Karakałpakstanu to platforma zapewniająca narodowi karakałpakskiemu możliwość swobodnego dostępu do informacji i wyrażania swoich opinii.",
      mission: {
        title: "NASZA MISJA",
        items: [
          "Donieść głos narodu Кarakałpakskiego do świata",
          "Dostarczyć informacje bez cenzury i obiektywnie",
          "Zachować dziedzictwo kulturowe i język",
          "Chronić prawa narodu"
        ]
      },
      principles: {
        title: "NASZE ZASADY",
        items: [
          "Otwartość i uczciwość",
          "Wsparcie wielojęzyczne",
          "Tolerancja kulturowa",
          "Bezstronność i obiektywizm"
        ]
      },
      team: {
        title: "ZESPÓŁ",
        desc: "Jesteśmy grupą młodych dziennikarzy, blogerów i aktywistów. Naszym celem jest rozpowszechnienie prawdziwych informacji o Karakałpakstanie na całym świecie."
      }
    }
  }[lang];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* HEADER */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            {content.title}
          </h1>
          <p className="text-2xl md:text-3xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
            {content.intro}
          </p>
        </div>

        {/* MISSION */}
        <section className="mb-20 p-12 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-3xl border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 bg-purple-600 rounded-2xl">
              <Target size={32} className="text-white" />
            </div>
            <h2 className="text-4xl font-bold">{content.mission.title}</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {content.mission.items.map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-6 bg-white/50 dark:bg-black/20 rounded-2xl backdrop-blur-sm">
                <CheckCircle size={24} className="text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1" />
                <p className="text-lg leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PRINCIPLES */}
        <section className="mb-20 p-12 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-3xl border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 bg-blue-600 rounded-2xl">
              <Shield size={32} className="text-white" />
            </div>
            <h2 className="text-4xl font-bold">{content.principles.title}</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {content.principles.items.map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-6 bg-white/50 dark:bg-black/20 rounded-2xl backdrop-blur-sm">
                <CheckCircle size={24} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                <p className="text-lg leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TEAM */}
        <section className="p-12 bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-3xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
              <Users size={32} className="text-white" />
            </div>
            <h2 className="text-4xl font-bold">{content.team.title}</h2>
          </div>
          
          <p className="text-2xl leading-relaxed opacity-90">
            {content.team.desc}
          </p>

          <div className="mt-12 grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe size={40} />
              </div>
              <p className="text-lg font-semibold">Глобальная миссия</p>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart size={40} />
              </div>
              <p className="text-lg font-semibold">С любовью к народу</p>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield size={40} />
              </div>
              <p className="text-lg font-semibold">Защита правды</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
