import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { personalService } from '../../services/personal';
import { ApiError } from '../../services/api';
import type { Personal } from '../../types/personal';
import DataTable from '../../components/DataTable';
import Spinner from '../../components/Spinner';
import EmptyState from '../../components/EmptyState';
import ErrorState from '../../components/ErrorState';
import Toast from '../../components/Toast';

function PersonalList() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [personal, setPersonal] = useState<Personal[] | null>(null);
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
    personalService
      .list()
      .then(setPersonal)
      .catch((err: unknown) => {
        setError(err instanceof ApiError ? err.message : t('personal.error'));
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
  } else if (!personal || personal.length === 0) {
    content = (
      <EmptyState
        title={t('personal.empty.title')}
        description={t('personal.empty.description')}
        action={
          <button
            type="button"
            onClick={() => navigate('/personal/nou')}
            className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
          >
            {t('personal.empty.action')}
          </button>
        }
      />
    );
  } else {
    content = (
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
            {t('nav.personal')}
          </h1>
          <button
            type="button"
            onClick={() => navigate('/personal/nou')}
            className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
          >
            {t('personal.new')}
          </button>
        </div>

        <DataTable
          columns={[
            { key: 'nom', header: t('personal.column.nom') },
            { key: 'carrec', header: t('personal.column.carrec') },
            { key: 'telefon', header: t('personal.column.telefon') },
            { key: 'email', header: t('personal.column.email') },
          ]}
          rows={personal}
          getRowId={(persona) => persona.id}
          onRowClick={(persona) => navigate(`/personal/${persona.id}`)}
          searchPlaceholder={t('personal.search')}
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

export default PersonalList;
