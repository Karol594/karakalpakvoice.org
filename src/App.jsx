import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import WeatherWidget from './components/WeatherWidget';
import CurrencyWidget from './components/CurrencyWidget';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Виджетлер - Курс валюта ҳәм Ҳаўа-райы */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <CurrencyWidget />
          <WeatherWidget />
        </div>

        {/* Соңғы мақала секциясы */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Соңғы мақалалар
          </h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600">
              Жақын күнлерде мақалалар жәриялаймыз...
            </p>
          </div>
        </section>

        {/* Сайт туўралы қысқаша */}
        <section className="mb-12 bg-blue-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4 text-blue-900">
            Сайт туўралы
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            KarakalpakVoice.org - Қарақалпақстан халқының даўысын дүнья жүзине жеткизиў, 
            мәдений мийрасын сақлаў ҳәм раўажландырыўға арналған медиа платформа.
          </p>
        </section>

        {/* Негизги бөлимлер */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Суверенитет */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition">
            <h3 className="text-xl font-bold mb-3 text-blue-600">Суверенитет</h3>
            <p className="text-gray-600">
              Қарақалпақстан суверенитети туўралы толық мағлыўматлар
            </p>
          </div>

          {/* Декларация */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition">
            <h3 className="text-xl font-bold mb-3 text-blue-600">Декларация</h3>
            <p className="text-gray-600">
              Декларацияның толық тексти 4 тилде
            </p>
          </div>

          {/* Конституция */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition">
            <h3 className="text-xl font-bold mb-3 text-blue-600">Конституция</h3>
            <p className="text-gray-600">
              Конституция тексти ҳәм түсиндирмелер
            </p>
          </div>

          {/* QARA-AI */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition">
            <h3 className="text-xl font-bold mb-3 text-purple-600">QARA-AI</h3>
            <p className="text-gray-600">
              Жақын күнлерде иске қосамыз, ҳәзир ислениўде...
            </p>
          </div>

          {/* Ботлар */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition">
            <h3 className="text-xl font-bold mb-3 text-green-600">Ботлар</h3>
            <p className="text-gray-600">
              Telegram ботлары менен таныс болың
            </p>
          </div>

          {/* Биз туўралы */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition">
            <h3 className="text-xl font-bold mb-3 text-orange-600">Биз туўралы</h3>
            <p className="text-gray-600">
              Команда ҳәм мақсетлеримиз туўралы
            </p>
          </div>
        </section>

        {/* Бизге қосылың */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Бизге қосылың!</h2>
          <p className="text-lg mb-6">
            Қарақалпақстан халқының даўысын жеткизиўге қосылыңыз
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
            Қосылыў
          </button>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
