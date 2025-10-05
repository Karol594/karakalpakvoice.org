import React from 'react';
import { Landmark } from 'lucide-react';

function Declaration() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center space-x-4 mb-6">
          <div className="bg-green-500 p-4 rounded-full">
            <Landmark size={32} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800">Декларация</h1>
        </div>
        <p className="text-gray-600">Жақын күнлерде толық мәлимет қосылады...</p>
      </div>
    </div>
  );
}

export default Declaration;
