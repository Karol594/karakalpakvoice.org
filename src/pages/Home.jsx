import React from "react";
import { Link } from "react-router-dom";
import { Bot, Award, Landmark, BookOpen, Users, UserPlus } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

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
            {t("home.title")}
          </h1>

          <p className="text-xl text-gray-200 leading-relaxed">
            {t("home.subtitle")}
          </p>

          <Link
            to="/about"
            className="mt-10 inline-block px-8 py-3 bg-white text-black rounded-full
                       text-lg font-semibold hover:scale-105 transition"
          >
            {t("home.about")}
          </Link>
        </div>
      </section>

      {/* SECTIONS */}
      <section className="px-8 py-20 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">{t("home.sections")}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          <Card icon={Award} title={t("home.sovereignty")} path="/sovereignty">
            {t("home.sovereignty_desc")}
          </Card>

          <Card icon={Landmark} title={t("home.declaration")} path="/declaration">
            {t("home.declaration_desc")}
          </Card>

          <Card icon={BookOpen} title={t("home.constitution")} path="/constitution">
            {t("home.constitution_desc")}
          </Card>

          <Card icon={Bot} title="QARA-AI" path="/qara-ai">
            {t("home.ai_desc")}
          </Card>

          <Card icon={Bot} title={t("home.bots")} path="/bots">
            {t("home.bots_desc")}
          </Card>

          <Card icon={Users} title={t("home.team")} path="/about">
            {t("home.team_desc")}
          </Card>

        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-purple-600 to-pink-600 text-center">
        <UserPlus size={64} className="mx-auto mb-6" />

        <h2 className="text-4xl font-bold mb-4">
          {t("home.support")}
        </h2>

        <p className="text-xl mb-10">
          {t("home.support_desc")}
        </p>

        <Link
          to="/join"
          className="bg-white text-purple-600 px-10 py-4 rounded-full
                     text-lg font-semibold hover:bg-gray-100 transition"
        >
          {t("home.join")}
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
