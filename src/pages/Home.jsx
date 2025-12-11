import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Award, Landmark, BookOpen, Bot, Users, UserPlus } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full bg-black text-white pt-16">

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('/images/hero-photo.jpg')",
            filter: "brightness(0.3)"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="mb-6">
            <span className="inline-block px-6 py-2 bg-purple-600/20 backdrop-blur-sm border border-purple-500/50 rounded-full text-purple-300 text-sm font-medium">
              Қарақалпақстан медиа платформасы
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8">
            <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Қарақалпақ Даўысы
            </span>
          </h1>

          <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 leading-relaxed mb-12 max-w-3xl mx-auto">
            Қарақалпақстан халқының даўысын дүньяға жеткизиўге арналған медиа платформа
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/about"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-lg font-bold hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300"
            >
              Биз туўралы 
              <ArrowRight size={20} />
            </Link>
            
            <Link
              to="/news"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full text-lg font-bold hover:bg-white/20 transition-all duration-300"
            >
              Жаңалықлар
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/50 rounded-full animate-pulse" />
          </div>
        </div>
      </section>


      {/* ================= FULLSCREEN 6 SECTIONS ================= */}


      {/* 1 — СУВЕРЕНИТЕТ */}
      <FullscreenBlock
        icon={Award}
        title="Суверенитет"
        description="Қарақалпақстан Суверенитети туўралы"
        link="/sovereignty"
        bg="url('/images/sovereignty.jpg')"
      />

      {/* 2 — ДЕКЛАРАЦИЯ */}
      <FullscreenBlock
        icon={Landmark}
        title="Декларация"
        description="Мәмлекетлик Суверенитет ҳаққындағы Декларациясы"
        link="/declaration"
        bg="url('/images/declaration.jpg')"
      />

      {/* 3 — КОНСТИТУЦИЯ */}
      <FullscreenBlock
        icon={BookOpen}
        title="Конституция"
        description="Республика Конституциясы"
        link="/constitution"
        bg="url('/images/constitution.jpg')"
      />

      {/* 4 — QARA-AI */}
      <FullscreenBlock
        icon={Bot}
        title="QARA-AI"
        description="Жасанды интеллект платформа"
        link="/qara-ai"
        bg="url('/images/qara-ai.jpg')"
      />

      {/* 5 — БОТЛАР */}
      <FullscreenBlock
        icon={Bot}
        title="Ботлар"
        description="Telegram хызметлер"
        link="/bots"
        bg="url('/images/bots.jpg')"
      />

      {/* 6 — КОМАНДА */}
      <FullscreenBlock
        icon={Users}
        title="Команда"
        description="Биз туўралы & махсет"
        link="/about"
        bg="url('/images/team.jpg')"
      />



      {/* CTA — unchanged */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600" />
        
        <div className="relative z-10 text-center px-6">
          <UserPlus size={72} className="mx-auto mb-8 text-white drop-shadow-2xl" />
          
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Қарақалпақ даўысын қоллап-қуўатлаң!
          </h2>
          
          <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-2xl mx-auto leading-relaxed">
            Даўысыңызды белгилең, халыққа қосылың. Биз бирге күшлимиз!
          </p>
          
          <Link
            to="/join"
            className="inline-flex items-center gap-3 bg-white text-purple-600 px-12 py-5 rounded-full text-xl font-bold hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-2xl"
          >
            Қосылыў
            <ArrowRight size={24} />
          </Link>
        </div>
      </section>

    </div>
  );
}



/* ================= FULLSCREEN BLOCK COMPONENT ================= */

function FullscreenBlock({ icon: Icon, title, description, link, bg }) {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center text-center px-6 overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: bg, filter: "brightness(0.25)" }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <Icon size={72} className="mx-auto mb-6 text-purple-300" />

        <h2 className="text-5xl md:text-6xl font-bold mb-6">
          {title}
        </h2>

        <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
          {description}
        </p>

        <Link
          to={link}
          className="inline-flex items-center gap-3 bg-purple-600 px-10 py-4 rounded-full text-white text-lg font-bold hover:bg-purple-700 hover:scale-105 transition-all duration-300"
        >
          Оқыў
          <ArrowRight size={22} />
        </Link>
      </div>
    </section>
  );
}
