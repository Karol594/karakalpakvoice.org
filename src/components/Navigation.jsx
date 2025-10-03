import React from 'react';
import { useTranslation } from 'react-i18next';
import { Home, Newspaper, Trophy, Heart, Church, BookOpen, Map, Users, Mail } from 'lucide-react';

function Navigation({ isOpen, onClose }) {
  const { t } = useTranslation();

  const menuItems = [
    { id: 'home', icon: Home, label: t('nav.home') || 'Бас бет' },
    { id: 'news', icon: Newspaper, label: t('nav.news') || 'Жаңалықлар' },
    { id: 'sport', icon: Trophy, label: t('nav.sport') || 'Спорт' },
    { id: 'tradition', icon: Heart, label: t('nav.tradition') || 'Дәстүр' },
    { id: 'religion', icon: Church, label: t('nav.religion') || 'Дин' },
    { id: 'history', icon: BookOpen, label: t('nav.history') || 'Тарийх' },
    { id: 'geography', icon: Map, label: t('nav.geography') || 'География' },
    { id: 'people', icon: Users, label: t('nav.people') || 'Тулғалар' },
    { id: 'contact', icon: Mail, label: t('nav.contact') || 'Байланысыў' }
  ];

  if (!isOpen) return null;

  return (
    <nav className="bg-blue-700 border-t border-blue-500">
      <div className="container mx-auto px-4 py-4">
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={onClose}
                  className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-blue-600 rounded-lg transition text-left"
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
