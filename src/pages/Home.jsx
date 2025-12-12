import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function Home() {
  const { t } = useTranslation();

  const sections = [
    {
      key: "sovereignty",
      title: t("home.sovereignty.title"),
      desc: t("home.sovereignty.desc"),
      path: "/sovereignty",
      bg: "bg-gradient-to-br from-blue-600 to-blue-900"
    },
    {
      key: "declaration",
      title: t("home.declaration.title"),
      desc: t("home.declaration.desc"),
      path: "/declaration",
      bg: "bg-gradient-to-br from-purple-600 to-purple-900"
    },
    {
      key: "constitution",
      title: t("home.constitution.title"),
      desc: t("home.constitution.desc"),
      path: "/constitution",
      bg: "bg-gradient-to-br from-green-600 to-green-900"
    },
    {
      key: "qaraai",
      title: t("home.qaraai.title"),
      desc: t("home.qaraai.desc"),
      path: "/qara-ai",
      bg: "bg-gradient-to-br from-orange-600 to-orange-900"
    },
    {
      key: "bots",
      title: t("home.bots.title"),
      desc: t("home.bots.desc"),
      path: "/bots",
      bg: "bg-gradient-to-br from-teal-600 to-teal-900"
    },
    {
      key: "team",
      title: t("home.team.title"),
      desc: t("home.team.desc"),
      path: "/team",
      bg: "bg-gradient-to-br from-red-600 to-red-900"
    }
  ];

  return (
    <div className="w-full">
      {sections.map((sec, i) => (
        <section
          key={i}
          className={`w-full h-screen flex flex-col justify-center items-center text-center text-white ${sec.bg} px-4`}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-xl">
            {sec.title}
          </h1>
          <p className="text-lg md:text-2xl mb-8 max-w-3xl opacity-90">
            {sec.desc}
          </p>

          <Link
            to={sec.path}
            className="px-8 py-3 mt-4 bg-white text-black font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:bg-gray-200 transition"
          >
            {t("home.open")}
          </Link>
        </section>
      ))}
    </div>
  );
}
