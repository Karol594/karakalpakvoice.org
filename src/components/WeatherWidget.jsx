import React from 'react';
import { Cloud } from 'lucide-react';
import { useTranslation } from 'react-i18next';

function WeatherWidget() {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
      <div className="flex items-center space-x-2 mb-2">
        <Cloud className="text-blue-500" size={24} />
        <h3 className="font-semibold">Ҳаўа-райы</h3>
      </div>
      <p className="text-sm text-gray-600">Жақын күнлерде қосамыз...</p>
    </div>
  );
}

export default WeatherWidget;
