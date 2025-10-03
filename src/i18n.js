import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      kk: { translation: { welcome: "Хош келдиңиз" } },
      ru: { translation: { welcome: "Добро пожаловать" } },
      en: { translation: { welcome: "Welcome" } },
      pl: { translation: { welcome: "Witamy" } }
    },
    lng: 'kk',
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });

export default i18n;
