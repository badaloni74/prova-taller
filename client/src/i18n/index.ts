import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ca from '../locales/ca.json';
import es from '../locales/es.json';

export const LANG_STORAGE_KEY = 'taller:lang:v1';
export type Lang = 'ca' | 'es';

function readStoredLang(): Lang {
  const stored = localStorage.getItem(LANG_STORAGE_KEY);
  return stored === 'ca' || stored === 'es' ? stored : 'es';
}

i18n.use(initReactI18next).init({
  resources: {
    ca: { translation: ca },
    es: { translation: es },
  },
  lng: readStoredLang(),
  fallbackLng: 'es',
  interpolation: { escapeValue: false },
  returnEmptyString: false,
});

i18n.on('languageChanged', (lng) => {
  localStorage.setItem(LANG_STORAGE_KEY, lng);
});

export default i18n;
