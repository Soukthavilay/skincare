import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

import laTranslation from './locales/la.json';
import viTranslation from './locales/vi.json';

const resources = {
  la: { translation: laTranslation },
  vi: { translation: viTranslation }
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'vi',
    debug: true,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
