import { useTranslation } from 'react-i18next';
import type { Lang } from '../i18n';

const LANGS: Lang[] = ['es', 'ca'];

function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  return (
    <div className="flex overflow-hidden rounded-md border border-slate-200 dark:border-slate-700">
      {LANGS.map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => i18n.changeLanguage(lang)}
          aria-pressed={i18n.resolvedLanguage === lang}
          className={`px-3 py-1 text-sm font-medium transition-colors ${
            i18n.resolvedLanguage === lang
              ? 'bg-primary-600 text-white'
              : 'bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-800'
          }`}
        >
          {t(`language.${lang}`)}
        </button>
      ))}
    </div>
  );
}

export default LanguageSwitcher;
