import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import ur from './locales/ur.json';

export const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧', dir: 'ltr' },
  { code: 'ur', name: 'اردو', flag: '🇵🇰', dir: 'rtl' },
];

const resources = {
  en: { translation: en },
  ur: { translation: ur },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

// Set direction based on language
i18n.on('languageChanged', (lng) => {
  const lang = languages.find((l) => l.code === lng);
  document.documentElement.dir = lang?.dir || 'ltr';
  document.documentElement.lang = lng;
});

export default i18n;