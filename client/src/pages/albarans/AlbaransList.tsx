import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { albaransService } from '../../services/albarans';
import { ApiError } from '../../services/api';
import type { Albara } from '../../types/albara';
import DataTable from '../../components/DataTable';
import Spinner from '../../components/Spinner';
import EmptyState from '../../components/EmptyState';
import ErrorState from '../../components/ErrorState';
import Toast from '../../components/Toast';
import { formatDate } from '../../utils/format';

function AlbaransList() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [albarans, setAlbarans] = useState<Albara[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const state = location.state as { toast?: string } | null;
    if (state?.toast) {
      setToast(state.toast);
      window.history.replaceState({}, '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const load = () => {
    setLoading(true);
    setError(null);
    albaransService
      .list()
      .then(setAlbarans)
      .catch((err: unknown) => {
        setError(err instanceof ApiError ? err.message : t('albarans.error'));
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let content;
  if (loading) {
    content = <Spinner />;
  } else if (error) {
    content = <ErrorState message={error} onRetry={load} retryLabel={t('common.retry')} />;
  } else if (!albarans || albarans.length === 0) {
    content = (
      <EmptyState
        title={t('albarans.empty.title')}
        description={t('albarans.empty.description')}
        action={
          <button
            type="button"
            onClick={() => navigate('/albarans/nou')}
            className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
          >
            {t('albarans.empty.action')}
          </button>
        }
      />
    );
  } else {
    content = (
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
            {t('nav.albarans')}
          </h1>
          <button
            type="button"
            onClick={() => navigate('/albarans/nou')}
            className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
          >
            {t('albarans.new')}
          </button>
        </div>

        <DataTable
          columns={[
            { key: 'numero', header: t('albarans.column.numero') },
            {
              key: 'estat',
              header: t('albarans.column.estat'),
              render: (albara) => t(`albarans.estat.${albara.estat}`),
            },
            { key: 'data', header: t('albarans.column.data'), render: (albara) => formatDate(albara.data) },
          ]}
          rows={albarans}
          getRowId={(albara) => albara.id}
          onRowClick={(albara) => navigate(`/albarans/${albara.id}`)}
          searchPlaceholder={t('albarans.search')}
        />
      </div>
    );
  }

  return (
    <>
      {content}
      {toast && <Toast message={toast} onDismiss={() => setToast(null)} />}
    </>
  );
}

export default AlbaransList;
