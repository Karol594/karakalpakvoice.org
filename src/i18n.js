import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import kk from './locales/kk.json';
import ru from './locales/ru.json';
import en from './locales/en.json';
import pl from './locales/pl.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ru: { translation: ru },
      kk: { translation: kk },
      en: { translation: en },
      pl: { translation: pl }
    },
    fallbackLng: "ru",
    interpolation: { escapeValue: false }
  });

export default i18n;