import React from 'react';
import { Award, Calendar, FileText, AlertTriangle, ExternalLink, Download, Globe } from 'lucide-react';

function Sovereignty() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-xl p-8 text-white">
        <div className="flex items-center space-x-4 mb-4">
          <div className="bg-white p-4 rounded-full">
            <Award size={40} className="text-blue-600" />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-2">ҚАРАҚАЛПАҚСТАННЫҢ СУВЕРЕНИТЕТИ</h1>
            <p className="text-xl">Ҳақыйқат тарийх ҳәм нызамшылық дәлиллер</p>
          </div>
        </div>
      </div>

      {/* СУВЕРЕНИТЕТ ТАРИЙХЫ */}
      <section className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-4 border-blue-500 pb-2">
          СУВЕРЕНИТЕТ ТАРИЙХЫ
        </h2>

        {/* 1990-жылғы тарийхый мәўрит */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Calendar size={24} className="text-blue-600" />
            <h3 className="text-2xl font-bold text-blue-900">1990-жылғы тарийхый мәўрит</h3>
          </div>
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
            <p className="text-gray-800 leading-relaxed text-lg">
              <strong className="text-blue-900">1990-жыл 14-декабрь</strong> Қарақалпақстан тарийхында ең әҳмийетли ўақыя болды. 
              Қарақалпақстан Жоқарғы Кеңесиниң <strong>186 депутаты бир аўыздан</strong> Мәмлекетлик 
              суверенитет ҳаққындағы декларацияны қабыл етти.
            </p>
          </div>
        </div>

        {/* Үш тәреплеме келисим */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Үш тәреплеме келисим - 1990</h3>
          
          {/* Фото орны 1 */}
          <div className="bg-gray-100 border-2 border-dashed border-gray-400 rounded-lg p-8 mb-4 text-center">
            <div className="flex flex-col items-center justify-center space-y-3">
              <FileText size={48} className="text-gray-400" />
              <p className="text-gray-600 font-semibold">📸 1-ФОТОСҮЎРЕТ ОРНЫ</p>
              <p className="text-sm text-gray-500 max-w-2xl">
                Сүўретте (шептен): Өзбекстан ССР Президенти И.А. Каримов, 
                Қарақалпақстан ЖК Баслығы Даўлетбай Шамшетов ҳәм СССР Бас министри В.С. Павлов
              </p>
            </div>
          </div>

          <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-r-lg">
            <p className="text-gray-800 leading-relaxed">
              Бул тарийхый ушырасыўда <strong>СССР Бас министри В.С. Павлов</strong> Қарақалпақстанның 
              Мәмлекетлик Суверенитети Декларациясын рәсмий түрде тән алды. 
              Бул <span className="text-green-700 font-bold">халықаралық дәрежедеги биринши рәсмий тән алыў</span> болды.
            </p>
          </div>
        </div>
      </section>

      {/* 1990-ЖЫЛҒЫ ДЕКЛАРАЦИЯ ТЕКСТИ */}
      <section className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-4 border-green-500 pb-2">
          1990-ЖЫЛҒЫ ДЕКЛАРАЦИЯ ТЕКСТИ
        </h2>

        <h3 className="text-xl font-bold text-gray-700 mb-4">Рәсмий ҳүжжетлер</h3>

        {/* Фото орны 2 */}
        <div className="bg-gray-100 border-2 border-dashed border-gray-400 rounded-lg p-8 mb-4 text-center">
          <div className="flex flex-col items-center justify-center space-y-3">
            <FileText size={48} className="text-gray-400" />
            <p className="text-gray-600 font-semibold">📸 2-ФОТОСҮЎРЕТ ОРНЫ</p>
            <p className="text-sm text-gray-500">
              Қарақалпақстан Жоқарғы Кеңесиниң Баслығы Т.Ешимбетовтың қолы қойылған 
              рәсмий қарар - 1990-жыл 14-декабрь
            </p>
          </div>
        </div>

        {/* Фото орны 3 */}
        <div className="bg-gray-100 border-2 border-dashed border-gray-400 rounded-lg p-8 mb-6 text-center">
          <div className="flex flex-col items-center justify-center space-y-3">
            <FileText size={48} className="text-gray-400" />
            <p className="text-gray-600 font-semibold">📸 3-ФОТОСҮЎРЕТ ОРНЫ</p>
            <p className="text-sm text-gray-500">
              "Еркин Қарақалпақстан" газетасында 1990-жыл 20-декабрьде жәрияланған Декларация
            </p>
          </div>
        </div>

        {/* Декларация тексти */}
        <div className="bg-gradient-to-br from-blue-50 to-green-50 border-2 border-blue-300 rounded-lg p-6">
          <p className="text-lg text-gray-800 font-semibold mb-4 italic">
            "Қарақалпақстан Автономиялы Совет Социалистлик Республикасының Жоқарғы Кеңеси 
            мәмлекетлик суверенитет ҳаққында ДЕКЛАРАЦИЯ-ны қабыл етеди:
          </p>
          
          <div className="space-y-3 ml-4">
            <div className="flex items-start space-x-3">
              <span className="text-blue-600 font-bold text-xl">1.</span>
              <p className="text-gray-800">Қарақалпақстан мәмлекетлик суверенитетин тастыйықлаў</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-blue-600 font-bold text-xl">2.</span>
              <p className="text-gray-800">Қарақалпақстан халқының өзин-өзи басқарыў ҳуқықын тастыйықлаў</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-blue-600 font-bold text-xl">3.</span>
              <p className="text-gray-800">Өз аймағында толық бийлик етиў ҳуқықын жәриялаў</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-blue-600 font-bold text-xl">4.</span>
              <p className="text-gray-800">Халықаралық қатнасықларға кириў имканиятын нәзерде тутыў</p>
            </div>
          </div>
        </div>
      </section>

      {/* ҚАРАҚАЛПАҚСТАН КОНСТИТУЦИЯСЫ */}
      <section className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-4 border-purple-500 pb-2">
          ҚАРАҚАЛПАҚСТАН КОНСТИТУЦИЯСЫ
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-purple-900 mb-3">Әмелдеги нызамлы статусы</h3>
            <p className="text-gray-800 leading-relaxed mb-4">
              Өзбекстан Конституциясының <strong className="text-purple-700">85-статьясы</strong> бойынша 
              Қарақалпақстан елеге шекем <span className="bg-purple-100 px-2 py-1 rounded font-bold">"Суверен республика"</span> болып 
              есапланады.
            </p>
          </div>

          <div className="bg-purple-50 rounded-lg p-6">
            <h3 className="text-xl font-bold text-purple-900 mb-4 flex items-center space-x-2">
              <FileText size={24} />
              <span>Конституциялық ҳуқықлар:</span>
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <span className="text-purple-600 font-bold text-xl">•</span>
                <span className="text-gray-800">Өз конституциясына ийе болыў ҳуқықы</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-purple-600 font-bold text-xl">•</span>
                <span className="text-gray-800">Мәмлекетлик тиллерди белгилеў ҳуқықы</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-purple-600 font-bold text-xl">•</span>
                <span className="text-gray-800">Өз нызамшылығын қабыл етиў ҳуқықы</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 2022-ЖЫЛҒЫ КОНСТИТУЦИЯЛЫҚ КРИЗИС */}
      <section className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-4 border-red-500 pb-2">
          2022-ЖЫЛҒЫ КОНСТИТУЦИЯЛЫҚ КРИЗИС
        </h2>

        <div className="space-y-6">
          {/* Не болды? */}
          <div>
            <h3 className="text-2xl font-bold text-red-900 mb-3">Не болды?</h3>
            <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg">
              <p className="text-gray-800 leading-relaxed">
                <strong>2022-жыл июльде</strong> Өзбекстан ҳүкимети Қарақалпақстанның 
                <span className="text-red-700 font-bold"> "Суверен" статусын алып таслаўға</span> ҳәрекет етти. 
                Халық оған қарсы шықты.
              </p>
            </div>
          </div>

          {/* Халық реакциясы */}
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Халық реакциясы</h3>
            <div className="bg-gray-50 rounded-lg p-6">
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <span className="text-red-600 font-bold text-xl">•</span>
                  <span className="text-gray-800">Нөкис ҳәм басқа қалаларда мыңлаған адам митингке шықты</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-red-600 font-bold text-xl">•</span>
                  <span className="text-gray-800">Дәўлетмурат Тажимуратов қамаққа алынды</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-red-600 font-bold text-xl">•</span>
                  <span className="text-gray-800"><strong className="text-red-700">21 адам қайтыс болған</strong>, 500 ден аслам адам усланған</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Мирзиёевтиң жуўабы */}
          <div>
            <h3 className="text-2xl font-bold text-blue-900 mb-3">Өзбекстан Президенти Мирзиёевтиң жуўабы</h3>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg mb-4">
              <p className="text-gray-800 leading-relaxed">
                Өзбекстан Президенти Нөкисте Жоқары Кеңесте жыйналыста Қарақалпақстанның 
                <span className="bg-yellow-200 px-2 py-1 rounded font-bold"> Суверен статусына ҳеш қандай өзгерис киритпейтуғунын</span> айтты. 
                Бул Қарақалпақстанның Суверенитет ҳуқықларының әҳмийетин көрсетти.
              </p>
            </div>

            {/* Видео */}
            <div className="bg-gradient-to-br from-red-50 to-blue-50 border-2 border-blue-400 rounded-lg p-6">
              <h4 className="text-xl font-bold text-gray-800 mb-3 flex items-center space-x-2">
                <ExternalLink size={24} className="text-blue-600" />
                <span>Видео дәлиллер</span>
              </h4>
              <p className="text-gray-700 mb-3">
                <strong>2022-жыл 2-июль - Мирзиёевтиң баянаты</strong>
              </p>
              <p className="text-gray-600 italic mb-4">
                Президент Нөкисте: "Қарақалпақстанның суверен статусына ҳеш қандай өзгерис киргизилмейди"
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
                <span className="font-semibold">Видеоны көриў</span>
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
            <h2 className="text-3xl font-bold text-red-900 mb-2">ӘҲМИЙЕТЛИ ЕСКЕРТПЕ!</h2>
            <h3 className="text-xl font-bold text-red-700">Қәлбеки ҳүжжетлерден сақланың!</h3>
          </div>
        </div>

        <div className="bg-white/70 rounded-lg p-6 mb-4">
          <p className="text-gray-800 leading-relaxed mb-4">
            <strong className="text-red-700">Өзбекстан арнаўлы хызметлери (СГБ)</strong> Қарақалпақстанға байланыслы 
            ҳүжжетлерди жалған етип таярлап, интернетке тарқатыў арқалы тарийхты бурмалаўға урынбақта.
          </p>
        </div>

        <div className="bg-green-100 border-l-4 border-green-600 rounded-r-lg p-6">
          <h4 className="text-lg font-bold text-green-900 mb-3">Биз тек ғана рәсмий дереклерден пайдаланамыз:</h4>
          <ul className="space-y-2">
            <li className="flex items-start space-x-3">
              <span className="text-green-600 font-bold">✓</span>
              <span className="text-gray-800">1990-жыл 20-декабрьдеги "Еркин Қарақалпақстан" газетасы</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-green-600 font-bold">✓</span>
              <span className="text-gray-800">Рәсмий мәмлекетлик архив ҳүжжетлери</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-green-600 font-bold">✓</span>
              <span className="text-gray-800">Тиккелей гүўалардың гүўалықлары</span>
            </li>
          </ul>
        </div>
      </section>

      {/* ХАЛЫҚАРАЛЫҚ ҲУҚЫҚ ТИЙКАРЛАРЫ */}
      <section className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-4 border-indigo-500 pb-2 flex items-center space-x-3">
          <Globe size={32} className="text-indigo-600" />
          <span>ХАЛЫҚАРАЛЫҚ ҲУҚЫҚ ТИЙКАРЛАРЫ</span>
        </h2>

        <div className="space-y-6">
          {/* БМШ Режеси */}
          <div className="bg-indigo-50 border-l-4 border-indigo-600 rounded-r-lg p-6">
            <h3 className="text-xl font-bold text-indigo-900 mb-2">БМШ Режеси - 1-статья</h3>
            <p className="text-gray-800 text-lg italic">
              "Барлық халықлардың тең ҳуқықлары ҳәм өзин-өзи басқарыўы"
            </p>
          </div>

          {/* Пуқаралық ҳуқықлар */}
          <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-lg p-6">
            <h3 className="text-xl font-bold text-blue-900 mb-2">
              Пуқаралық ҳәм сиясий ҳуқықлар ҳаққындағы пакт - 1-статья
            </h3>
            <p className="text-gray-800 text-lg italic">
              "Барлық халықлар өзин-өзи басқарыў ҳуқықына ийе."
            </p>
          </div>

          {/* Халықаралық тәжирийбе */}
          <div className="bg-green-50 rounded-lg p-6">
            <h3 className="text-xl font-bold text-green-900 mb-3">Халық аралық ҳуқық</h3>
            <p className="text-gray-800 leading-relaxed">
              Қарақалпақстанның Суверен статусы <strong>Испаниядағы Баск провинциялары</strong> ямаса 
              <strong> Финляндиядағы Аланд атаўлары</strong> сыяқлы халықаралық тәжирийбеге сәйкес келеди.
            </p>
          </div>
        </div>
      </section>

      {/* Footer призыв */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-xl p-8 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Бизлердиң даўысымызды еситиң!</h2>
        <p className="text-2xl font-semibold">Ҳақыйқатлық жеңеди!</p>
      </section>

      {/* Техникалық ескертпе */}
      <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 text-center text-sm text-gray-600">
        <p className="italic">
          <strong>Ескетиў:</strong> Фотоларды кейин қосамыз. Фото орынлары тайын түрде белгиленген.
        </p>
      </div>
    </div>
  );
}

export default Sovereignty;
