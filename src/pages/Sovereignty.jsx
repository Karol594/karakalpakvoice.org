import React from 'react';
import { Award, Calendar, FileText } from 'lucide-react';

function Sovereignty() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center space-x-4 mb-6">
          <div className="bg-blue-500 p-4 rounded-full">
            <Award size={32} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800">Суверенитет</h1>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
            <h2 className="text-2xl font-bold text-blue-900 mb-2">
              Қарақалпақстан Республикасының мәмлекетлик суверенитети
            </h2>
            <div className="flex items-center space-x-2 text-gray-700">
              <Calendar size={18} />
              <span>14 декабрь 1990 жыл</span>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-4">
            1990-жыл 14-декабрьде Қарақалпақстан Республикасы Жоқарғы Кеңеси
            Қарақалпақстан Республикасының мәмлекетлик суверенитети ҳаққындағы Декларацияны 
            қабыл етти.
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
              <FileText size={24} className="text-blue-600" />
              <span>Негизги принциплер:</span>
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start space-x-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Мәмлекетлик ҳәкимияттың толықлығы</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Ҳалықтың өз тәғдирин өзи белгилеў ҳуқықы</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Аймақлық пүтинлик</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Экономикалық ғәрезсизлик</span>
              </li>
            </ul>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6">
            <p className="text-gray-700 italic">
              Толық мағлыўматлар ҳәм ҳүжжетлер жақын күнлерде қосылады...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sovereignty;
