import React from "react";
import { Link } from "react-router-dom";
import { Bot, Award, Landmark, BookOpen, Users, UserPlus } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full h-full bg-black text-white">
      
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center">
        
        {/* BACKGROUND IMAGE */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center opacity-70"
          style={{ backgroundImage: "url('/images/hero-photo.jpg')" }}
        />

        {/* CONTENT */}
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <h1 className="text-6xl font-extrabold tracking-tight mb-6">
            Karakalpak Voice
          </h1>

          <p className="text-xl text-gray-200 leading-relaxed">
            Қарақалпақ халқының даўысын дүньяға жеткизиў.
            Мәдений мийрасты сақлаў хәм раўажландырыў.
          </p>

          <Link
            to="/about"
            className="mt-10 inline-block px-8 py-3 bg-white text-black rounded-full
                       text-lg font-semibold hover:scale-105 transition"
          >
            Биз туўралы
          </Link>
        </div>
      </section>

      {/* SECTIONS */}
      <section className="px-8 py-20 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">Бөлимлер</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          <Card icon={Award} title="Суверенитет" path="/sovereignty">
            Қарақалпақстан Суверенитети туўралы
          </Card>

          <Card icon={Landmark} title="Декларация" path="/declaration">
            Мәмлекетлик Суверенитет Декларациясы
          </Card>

          <Card icon={BookOpen} title="Конституция" path="/constitution">
            Республика Конституциясы
          </Card>

          <Card icon={Bot} title="QARA-AI" path="/qara-ai">
            Жасанды интеллект платформа
          </Card>

          <Card icon={Bot} title="Ботлар" path="/bots">
            Telegram бот хызметлер
          </Card>

          <Card icon={Users} title="Команда" path="/about">
            Биз туўралы & махсет
          </Card>

        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-purple-600 to-pink-600 text-center">
        <UserPlus size={64} className="mx-auto mb-6" />

        <h2 className="text-4xl font-bold mb-4">
          Қарақалпақстанға қоллаў бериң!
        </h2>

        <p className="text-xl mb-10">
          Қарақалпақстан даўысын дүньяға жеткериўге үлесиңизди қосың!
        </p>

        <Link
          to="/join"
          className="bg-white text-purple-600 px-10 py-4 rounded-full
                     text-lg font-semibold hover:bg-gray-100 transition"
        >
          Қосылыў
        </Link>
      </section>
    </div>
  );
}

/* CARD COMPONENT */
function Card({ icon: Icon, title, children, path }) {
  return (
    <Link
      to={path}
      className="bg-zinc-900 border border-zinc-800 p-8 rounded-xl
                 hover:-translate-y-1 hover:border-purple-500 transition
                 block group"
    >
      <Icon size={40} className="text-purple-400 mb-4 group-hover:text-purple-300" />
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{children}</p>
    </Link>
  );
}
