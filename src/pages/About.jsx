import React from 'react';
import { Users } from 'lucide-react';

function About() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center space-x-4 mb-6">
          <div className="bg-orange-500 p-4 rounded-full">
            <Users size={32} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800">Биз туўралы</h1>
        </div>
        <p className="text-gray-600 leading-relaxed">
          KarakalpakVoice.org - Қарақалпақстан халқының даўысын дүнья жүзине жеткизиў, 
          мәдений мийрасын сақлаў, раўажландырыў ҳәм келеси әўладларға жеткизиўди 
          махсет етип қойған медиа платформа.
        </p>
      </div>
    </div>
  );
}

export default About;
