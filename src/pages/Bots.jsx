import React from 'react';
import { Bot } from 'lucide-react';

function Bots() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center space-x-4 mb-6">
          <div className="bg-teal-500 p-4 rounded-full">
            <Bot size={32} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800">Ботлар</h1>
        </div>
        <p className="text-gray-600">Жақын күнлерде ботлар туўралы мәлимет қосылады...</p>
      </div>
    </div>
  );
}

export default Bots;
