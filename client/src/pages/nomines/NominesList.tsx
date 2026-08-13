import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { nominesService } from '../../services/nomines';
import { ApiError } from '../../services/api';
import type { Nomina } from '../../types/nomina';
import DataTable from '../../components/DataTable';
import Spinner from '../../components/Spinner';
import EmptyState from '../../components/EmptyState';
import ErrorState from '../../components/ErrorState';
import Toast from '../../components/Toast';

function NominesList() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [nomines, setNomines] = useState<Nomina[] | null>(null);
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
    nominesService
      .list()
      .then(setNomines)
      .catch((err: unknown) => {
        setError(err instanceof ApiError ? err.message : t('nomines.error'));
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
  } else if (!nomines || nomines.length === 0) {
    content = (
      <EmptyState
        title={t('nomines.empty.title')}
        description={t('nomines.empty.description')}
        action={
          <button
            type="button"
            onClick={() => navigate('/nomines/nova')}
            className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
          >
            {t('nomines.empty.action')}
          </button>
        }
      />
    );
  } else {
    content = (
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
            {t('nav.nomines')}
          </h1>
          <button
            type="button"
            onClick={() => navigate('/nomines/nova')}
            className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
          >
            {t('nomines.new')}
          </button>
        </div>

        <DataTable
          columns={[
            {
              key: 'anyNomina',
              header: t('nomines.column.periode'),
              render: (nomina) => `${String(nomina.mes).padStart(2, '0')}/${nomina.anyNomina}`,
            },
            {
              key: 'estatPagament',
              header: t('nomines.column.estatPagament'),
              render: (nomina) => t(`nomines.estatPagament.${nomina.estatPagament}`),
            },
            {
              key: 'salariNet',
              header: t('nomines.column.salariNet'),
              render: (nomina) => `${nomina.salariNet.toFixed(2)} €`,
            },
          ]}
          rows={nomines}
          getRowId={(nomina) => nomina.id}
          onRowClick={(nomina) => navigate(`/nomines/${nomina.id}`)}
          searchPlaceholder={t('nomines.search')}
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

export default NominesList;
