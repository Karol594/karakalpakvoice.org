import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Bot, Award, Landmark, BookOpen, Users, UserPlus } from "lucide-react";

export default function Home() {
  const { t } = useTranslation();
  
  return (
    <div className="w-full bg-black text-white pt-16">
      
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        
        {/* BACKGROUND IMAGE */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('/images/hero-photo.jpg')",
            filter: "brightness(0.4)"
          }}
        />

        {/* GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />

        {/* CONTENT */}
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            {t('home.title')}
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 leading-relaxed mb-10">
            {t('home.subtitle')}
          </p>

          <Link
            to="/about"
            className="inline-block px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-lg font-semibold hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300"
          >
            {t('home.about')}
          </Link>
        </div>

        {/* SCROLL INDICATOR */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* SECTIONS */}
      <section className="px-6 py-24 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('sections.title')}</h2>
          <p className="text-gray-400 text-lg">{t('sections.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card icon={Award} title={t('cards.sovereignty.title')} path="/sovereignty" color="purple">
            {t('cards.sovereignty.description')}
          </Card>

          <Card icon={Landmark} title={t('cards.declaration.title')} path="/declaration" color="blue">
            {t('cards.declaration.description')}
          </Card>

          <Card icon={BookOpen} title={t('cards.constitution.title')} path="/constitution" color="green">
            {t('cards.constitution.description')}
          </Card>

          <Card icon={Bot} title={t('cards.qaraAi.title')} path="/qara-ai" color="pink">
            {t('cards.qaraAi.description')}
          </Card>

          <Card icon={Bot} title={t('cards.bots.title')} path="/bots" color="cyan">
            {t('cards.bots.description')}
          </Card>

          <Card icon={Users} title={t('cards.team.title')} path="/about" color="orange">
            {t('cards.team.description')}
          </Card>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 opacity-90" />
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10" />
        
        <div className="relative z-10 text-center px-6">
          <UserPlus size={64} className="mx-auto mb-6 text-white" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{t('cta.title')}</h2>
          <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-2xl mx-auto">
            {t('cta.subtitle')}
          </p>
          <Link
            to="/join"
            className="inline-block bg-white text-purple-600 px-12 py-5 rounded-full text-lg font-bold hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-2xl"
          >
            {t('cta.button')}
          </Link>
        </div>
      </section>
    </div>
  );
}

/* CARD COMPONENT */
function Card({ icon: Icon, title, children, path, color }) {
  const colors = {
    purple: 'from-purple-500/20 to-purple-600/20 border-purple-500/50 hover:border-purple-400',
    blue: 'from-blue-500/20 to-blue-600/20 border-blue-500/50 hover:border-blue-400',
    green: 'from-green-500/20 to-green-600/20 border-green-500/50 hover:border-green-400',
    pink: 'from-pink-500/20 to-pink-600/20 border-pink-500/50 hover:border-pink-400',
    cyan: 'from-cyan-500/20 to-cyan-600/20 border-cyan-500/50 hover:border-cyan-400',
    orange: 'from-orange-500/20 to-orange-600/20 border-orange-500/50 hover:border-orange-400'
  };

  return (
    <Link
      to={path}
      className={`bg-gradient-to-br ${colors[color]} backdrop-blur-sm border-2 p-8 rounded-2xl hover:-translate-y-2 hover:shadow-2xl hover:shadow-${color}-500/20 transition-all duration-300 block group`}
    >
      <Icon size={48} className={`text-${color}-400 mb-4 group-hover:scale-110 transition-transform`} />
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{children}</p>
    </Link>
  );
}
