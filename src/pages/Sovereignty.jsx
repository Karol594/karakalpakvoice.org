import React from 'react';
import { useTranslation } from 'react-i18next';
import { Award, Calendar, FileText, AlertTriangle, ExternalLink, Globe } from 'lucide-react';

function Sovereignty() {
  const { t } = useTranslation();

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-xl p-8 text-white">
        <div className="flex items-center space-x-4 mb-4">
          <div className="bg-white p-4 rounded-full">
            <Award size={40} className="text-blue-600" />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-2">{t('sovereignty.pageTitle')}</h1>
            <p className="text-xl">{t('sovereignty.pageSubtitle')}</p>
          </div>
        </div>
      </div>

      {/* СУВЕРЕНИТЕТ ТАРИЙХЫ */}
      <section className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-4 border-blue-500 pb-2">
          {t('sovereignty.historySection')}
        </h2>

        {/* 1990-жылғы тарийхый мәўрит */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Calendar size={24} className="text-blue-600" />
            <h3 className="text-2xl font-bold text-blue-900">{t('sovereignty.historicEvent')}</h3>
          </div>
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
            <p className="text-gray-800 leading-relaxed text-lg">
              {t('sovereignty.historicEventText')}
            </p>
          </div>
        </div>

        {/* Үш тәреплеме келисим */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">{t('sovereignty.tripartiteTitle')}</h3>
          
          {/* Фото орны 1 */}
          <div className="bg-gray-100 border-2 border-dashed border-gray-400 rounded-lg p-8 mb-4 text-center">
            <div className="flex flex-col items-center justify-center space-y-3">
              <FileText size={48} className="text-gray-400" />
              <p className="text-gray-600 font-semibold">📸 1-ФОТО</p>
              <p className="text-sm text-gray-500 max-w-2xl">
                {t('sovereignty.photo1Caption')}
              </p>
            </div>
          </div>

          <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-r-lg">
            <p className="text-gray-800 leading-relaxed">
              {t('sovereignty.tripartiteText')}
            </p>
          </div>
        </div>
      </section>

      {/* 1990-ЖЫЛҒЫ ДЕКЛАРАЦИЯ ТЕКСТИ */}
      <section className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-4 border-green-500 pb-2">
          {t('sovereignty.declarationSection')}
        </h2>

        <h3 className="text-xl font-bold text-gray-700 mb-4">{t('sovereignty.officialDocs')}</h3>

        {/* Фото орны 2 */}
        <div className="bg-gray-100 border-2 border-dashed border-gray-400 rounded-lg p-8 mb-4 text-center">
          <div className="flex flex-col items-center justify-center space-y-3">
            <FileText size={48} className="text-gray-400" />
            <p className="text-gray-600 font-semibold">📸 2-ФОТО</p>
            <p className="text-sm text-gray-500">
              {t('sovereignty.photo2Caption')}
            </p>
          </div>
        </div>

        {/* Фото орны 3 */}
        <div className="bg-gray-100 border-2 border-dashed border-gray-400 rounded-lg p-8 mb-6 text-center">
          <div className="flex flex-col items-center justify-center space-y-3">
            <FileText size={48} className="text-gray-400" />
            <p className="text-gray-600 font-semibold">📸 3-ФОТО</p>
            <p className="text-sm text-gray-500">
              {t('sovereignty.photo3Caption')}
            </p>
          </div>
        </div>

        {/* Декларация тексти - Көрсетиў/Жасырыў батырмасы */}
        <div className="bg-gradient-to-br from-blue-50 to-green-50 border-2 border-blue-300 rounded-lg p-6">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-blue-900 mb-2">
              {t('sovereignty.declarationSection')}
            </h3>
          </div>
          <details className="cursor-pointer">
            <summary className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition inline-block">
              Толық текстти оқыў / Read Full Text
            </summary>
            <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
              <p className="text-gray-800 whitespace-pre-line leading-relaxed">
                {t('declaration.fullText')}
              </p>
            </div>
          </details>
        </div>
      </section>

      {/* ҚАРАҚАЛПАҚСТАН КОНСТИТУЦИЯСЫ */}
      <section className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-4 border-purple-500 pb-2">
          {t('sovereignty.constitutionSection')}
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-purple-900 mb-3">{t('sovereignty.currentStatus')}</h3>
            <p className="text-gray-800 leading-relaxed">
              {t('sovereignty.currentStatusText')}
            </p>
          </div>

          <div className="bg-purple-50 rounded-lg p-6">
            <h3 className="text-xl font-bold text-purple-900 mb-4 flex items-center space-x-2">
              <FileText size={24} />
              <span>{t('sovereignty.constitutionalRights')}</span>
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <span className="text-purple-600 font-bold text-xl">•</span>
                <span className="text-gray-800">{t('sovereignty.right1')}</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-purple-600 font-bold text-xl">•</span>
                <span className="text-gray-800">{t('sovereignty.right2')}</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-purple-600 font-bold text-xl">•</span>
                <span className="text-gray-800">{t('sovereignty.right3')}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 2022-ЖЫЛҒЫ КОНСТИТУЦИЯЛЫҚ КРИЗИС */}
      <section className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-4 border-red-500 pb-2">
          {t('sovereignty.crisis2022Section')}
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-red-900 mb-3">{t('sovereignty.whatHappened')}</h3>
            <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg">
              <p className="text-gray-800 leading-relaxed">
                {t('sovereignty.whatHappenedText')}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">{t('sovereignty.publicReaction')}</h3>
            <div className="bg-gray-50 rounded-lg p-6">
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <span className="text-red-600 font-bold text-xl">•</span>
                  <span className="text-gray-800">{t('sovereignty.reaction1')}</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-red-600 font-bold text-xl">•</span>
                  <span className="text-gray-800">{t('sovereignty.reaction2')}</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-red-600 font-bold text-xl">•</span>
                  <span className="text-gray-800">{t('sovereignty.reaction3')}</span>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-blue-900 mb-3">{t('sovereignty.mirziyoyevResponse')}</h3>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg mb-4">
              <p className="text-gray-800 leading-relaxed">
                {t('sovereignty.mirziyoyevText')}
              </p>
            </div>

            {/* Видео */}
            <div className="bg-gradient-to-br from-red-50 to-blue-50 border-2 border-blue-400 rounded-lg p-6">
              <h4 className="text-xl font-bold text-gray-800 mb-3 flex items-center space-x-2">
                <ExternalLink size={24} className="text-blue-600" />
                <span>{t('sovereignty.videoEvidence')}</span>
              </h4>
              <p className="text-gray-700 mb-3">
                <strong>{t('sovereignty.videoDate')}</strong>
              </p>
              <p className="text-gray-600 italic mb-4">
                {t('sovereignty.videoQuote')}
              </p>
              <a 
                href="https://youtu.be/dnULLksbU4M?si=rVKuRlkUFV2peECl"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition transform hover:scale-105 shadow-lg"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span className="font-semibold">{t('sovereignty.watchVideo')}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ӘҲМИЙЕТЛИ ЕСКЕРТПЕ */}
      <section className="bg-gradient-to-br from-yellow-50 to-red-50 border-2 border-red-400 rounded-lg shadow-lg p-8">
        <div className="flex items-start space-x-4 mb-4">
          <AlertTriangle size={40} className="text-red-600 flex-shrink-0" />
          <div>
            <h2 className="text-3xl font-bold text-red-900 mb-2">{t('sovereignty.warningSection')}</h2>
            <h3 className="text-xl font-bold text-red-700">{t('sovereignty.warningTitle')}</h3>
          </div>
        </div>

        <div className="bg-white/70 rounded-lg p-6 mb-4">
          <p className="text-gray-800 leading-relaxed">
            {t('sovereignty.warningText')}
          </p>
        </div>

        <div className="bg-green-100 border-l-4 border-green-600 rounded-r-lg p-6">
          <h4 className="text-lg font-bold text-green-900 mb-3">{t('sovereignty.trustedSources')}</h4>
          <ul className="space-y-2">
            <li className="flex items-start space-x-3">
              <span className="text-green-600 font-bold">✓</span>
              <span className="text-gray-800">{t('sovereignty.source1')}</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-green-600 font-bold">✓</span>
              <span className="text-gray-800">{t('sovereignty.source2')}</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-green-600 font-bold">✓</span>
              <span className="text-gray-800">{t('sovereignty.source3')}</span>
            </li>
          </ul>
        </div>
      </section>

      {/* ХАЛЫҚАРАЛЫҚ ҲУҚЫҚ ТИЙКАРЛАРЫ */}
      <section className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-4 border-indigo-500 pb-2 flex items-center space-x-3">
          <Globe size={32} className="text-indigo-600" />
          <span>{t('sovereignty.intlLawSection')}</span>
        </h2>

        <div className="space-y-6">
          <div className="bg-indigo-50 border-l-4 border-indigo-600 rounded-r-lg p-6">
            <h3 className="text-xl font-bold text-indigo-900 mb-2">{t('sovereignty.unCharter')}</h3>
            <p className="text-gray-800 text-lg italic">
              "{t('sovereignty.unCharterText')}"
            </p>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-lg p-6">
            <h3 className="text-xl font-bold text-blue-900 mb-2">
              {t('sovereignty.civilPact')}
            </h3>
            <p className="text-gray-800 text-lg italic">
              "{t('sovereignty.civilPactText')}"
            </p>
          </div>

          <div className="bg-green-50 rounded-lg p-6">
            <h3 className="text-xl font-bold text-green-900 mb-3">{t('sovereignty.intlPractice')}</h3>
            <p className="text-gray-800 leading-relaxed">
              {t('sovereignty.intlPracticeText')}
            </p>
          </div>
        </div>
      </section>

      {/* Footer призыв */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-xl p-8 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">{t('sovereignty.finalMessage')}</h2>
        <p className="text-2xl font-semibold">{t('sovereignty.truthWins')}</p>
      </section>

      {/* Техникалық ескертпе */}
      <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 text-center text-sm text-gray-600">
        <p className="italic">
          {t('sovereignty.photoNote')}
        </p>
      </div>
    </div>
  );
}

export default Sovereignty;
