import { useTranslation } from 'react-i18next';

interface PlaceholderProps {
  titleKey: string;
}

function Placeholder({ titleKey }: PlaceholderProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 p-16 text-center dark:border-slate-700">
      <h2 className="text-xl">{t(titleKey)}</h2>
      <p className="mt-2 text-slate-500 dark:text-slate-400">
        {t('placeholder.pendingModule')}
      </p>
    </div>
  );
}

export default Placeholder;
