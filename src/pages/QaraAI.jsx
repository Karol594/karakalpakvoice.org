import React from 'react';
import { Bot, Clock } from 'lucide-react';

function QaraAI() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-lg p-8 text-white">
        <div className="flex items-center space-x-4 mb-6">
          <div className="bg-white p-4 rounded-full">
            <Bot size={32} className="text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold">QARA-AI</h1>
        </div>
        <div className="bg-yellow-400/20 border-l-4 border-yellow-400 p-6 rounded">
          <div className="flex items-center space-x-3">
            <Clock size={24} className="text-yellow-300" />
            <div>
              <p className="font-bold text-xl mb-1">Жақын күнлерде иске қосамыз</p>
              <p className="text-white/90">Ҳәзир актив ислениўде. Күтип турыңыз!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QaraAI;
