import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import WeatherWidget from '../components/WeatherWidget';
import CurrencyWidget from '../components/CurrencyWidget';
import { Newspaper, Award, Landmark, BookOpen, Bot, Users, UserPlus } from 'lucide-react';

function Home() {
  const { t } = useTranslation();

  const sections = [
    { 
      id: 'sovereignty', 
      path: '/sovereignty',
      title: 'Суверенитет', 
      icon: Award,
      color: 'bg-blue-500',
      description: 'Қарақалпақстан Суверенитети туўралы'
    },
    { 
      id: 'declaration', 
      path: '/declaration',
      title: 'Декларация', 
      icon: Landmark,
      color: 'bg-green-500',
      description: 'Мәмлекетлик Суверенитет Декларациясы'
    },
    { 
      id: 'constitution', 
      path: '/constitution',
      title: 'Конституция', 
      icon: BookOpen,
      color: 'bg-purple-500',
      description: 'Республика Конституциясы'
    },
    { 
      id: 'qara-ai', 
      path: '/qara-ai',
      title: 'QARA-AI', 
      icon: Bot,
      color: 'bg-indigo-500',
      description: 'Жасанды интеллект көмекшиси'
    },
    { 
      id: 'bots', 
      path: '/bots',
      title: 'Ботлар', 
      icon: Bot,
      color: 'bg-teal-500',
      description: 'Telegram ботлары'
    },
    { 
      id: 'about', 
      path: '/about',
      title: 'Биз туўралы', 
      icon: Users,
      color: 'bg-orange-500',
      description: 'Команда ҳәм махсетлер'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Виджетлер */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CurrencyWidget />
        <WeatherWidget />
      </div>

      {/* Соңғы мақалалар */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Newspaper className="text-blue-600" size={28} />
          <h2 className="text-2xl font-bold text-gray-800">Соңғы мақалалар</h2>
        </div>
        <p className="text-gray-600">
          Жақын күнлерде мақалалар жәриялаймыз...
        </p>
      </section>

      {/* Сайт туўралы */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 text-white">
        <h2 className="text-3xl font-bold mb-4">KarakalpakVoice.org</h2>
        <p className="text-lg leading-relaxed">
          Қарақалпақстан халқының даўысын дүнья жүзине жеткизиў, мәдений мийрасын 
          сақлаў ҳәм раўажландырыўға арналған медиа платформа.
        </p>
      </section>

      {/* Негизги бөлимлер */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Link 
              key={section.id}
              to={section.path}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 overflow-hidden block"
            >
              <div className={`${section.color} p-4 flex items-center justify-center`}>
                <Icon size={48} className="text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">{section.title}</h3>
                <p className="text-gray-600">{section.description}</p>
              </div>
            </Link>
          );
        })}
      </section>

      {/* Бизге қосылың */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-8 text-white text-center">
        <UserPlus size={48} className="mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-4">Бизге қосылың!</h2>
        <p className="text-lg mb-6">
          Қарақалпақстан халқының даўысын жеткизиўге өз үлесиңизди қосыңыз
        </p>
        <Link 
          to="/join"
          className="inline-block bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition transform hover:scale-105"
        >
          Қосылыў
        </Link>
      </section>
    </div>
  );
}

export default Home;
