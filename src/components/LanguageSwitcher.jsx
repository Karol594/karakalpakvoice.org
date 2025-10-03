import React from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'kk', name: 'Қарақалпақша', flag: '🏳️' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'pl', name: 'Polski', flag: '🇵🇱' }
  ];

  return (
    <div className="flex items-center space-x-2">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => i18n.changeLanguage(lang.code)}
          className={`px-3 py-2 rounded-lg transition flex items-center space-x-1 ${
            i18n.language === lang.code
              ? 'bg-white text-blue-600 font-semibold'
              : 'bg-blue-500 hover:bg-blue-700'
          }`}
          title={lang.name}
        >
          <span>{lang.flag}</span>
          <span className="hidden sm:inline text-sm">{lang.code.toUpperCase()}</span>
        </button>
      ))}
    </div>
  );
}

export default LanguageSwitcher;
