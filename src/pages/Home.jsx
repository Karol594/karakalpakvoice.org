import React from "react";
import { Link } from "react-router-dom";
import { Bot, Award, Landmark, BookOpen, Users, UserPlus, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full bg-black text-white">
      
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        
        {/* BACKGROUND */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('/images/hero-photo.jpg')",
            filter: "brightness(0.3)"
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />

        {/* CONTENT */}
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

        {/* SCROLL */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/50 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* SECTIONS */}
      <section className="px-6 py-24 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Бөлимлер
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Қарақалпақстан туўралы исенимли мағлыўмат
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <Card 
            icon={Award} 
            title="Суверенитет" 
            path="/sovereignty" 
            color="purple"
            description="Қарақалпақстан Суверенитети туўралы"
          />

          <Card 
            icon={Landmark} 
            title="Декларация" 
            path="/declaration" 
            color="blue"
            description="Мәмлекетлик Суверенитет Декларациясы"
          />

          <Card 
            icon={BookOpen} 
            title="Конституция" 
            path="/constitution" 
            color="green"
            description="Республика Конституциясы"
          />

          <Card 
            icon={Bot} 
            title="QARA-AI" 
            path="/qara-ai" 
            color="pink"
            description="Жасанды интеллект платформасы"
          />

          <Card 
            icon={Bot} 
            title="Ботлар" 
            path="/bots" 
            color="cyan"
            description="Telegram хызметлер"
          />

          <Card 
            icon={Users} 
            title="Команда" 
            path="/about" 
            color="orange"
            description="Биз туўралы & махсет"
          />
          
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600" />
        
        <div className="relative z-10 text-center px-6">
          <UserPlus size={72} className="mx-auto mb-8 text-white drop-shadow-2xl" />
          
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Қарақалпақстанға қоллаў бериң!
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

/* CARD */
function Card({ icon: Icon, title, description, path, color }) {
  const colorClasses = {
    purple: 'from-purple-500/10 to-purple-600/10 border-purple-500/30 hover:border-purple-400 hover:shadow-purple-500/20',
    blue: 'from-blue-500/10 to-blue-600/10 border-blue-500/30 hover:border-blue-400 hover:shadow-blue-500/20',
    green: 'from-green-500/10 to-green-600/10 border-green-500/30 hover:border-green-400 hover:shadow-green-500/20',
    pink: 'from-pink-500/10 to-pink-600/10 border-pink-500/30 hover:border-pink-400 hover:shadow-pink-500/20',
    cyan: 'from-cyan-500/10 to-cyan-600/10 border-cyan-500/30 hover:border-cyan-400 hover:shadow-cyan-500/20',
    orange: 'from-orange-500/10 to-orange-600/10 border-orange-500/30 hover:border-orange-400 hover:shadow-orange-500/20'
  };

  const iconColors = {
    purple: 'text-purple-400',
    blue: 'text-blue-400',
    green: 'text-green-400',
    pink: 'text-pink-400',
    cyan: 'text-cyan-400',
    orange: 'text-orange-400'
  };

  return (
    <Link
      to={path}
      className={`group relative bg-gradient-to-br ${colorClasses[color]} backdrop-blur-sm border-2 p-8 rounded-2xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 block overflow-hidden`}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-500" />
      
      <Icon size={48} className={`${iconColors[color]} mb-4 group-hover:scale-110 transition-transform relative z-10`} />
      
      <h3 className="text-2xl font-bold mb-3 relative z-10">{title}</h3>
      
      <p className="text-gray-400 leading-relaxed relative z-10">{description}</p>
      
      <div className="mt-4 flex items-center text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity relative z-10">
        <span className={iconColors[color]}>Толығырақ</span>
        <ArrowRight size={16} className={`ml-2 ${iconColors[color]} group-hover:translate-x-1 transition-transform`} />
      </div>
    </Link>
  );
}
