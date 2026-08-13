import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { pecesService } from '../../services/peces';
import { ApiError } from '../../services/api';
import type { Peca } from '../../types/peca';
import DataTable from '../../components/DataTable';
import Spinner from '../../components/Spinner';
import EmptyState from '../../components/EmptyState';
import ErrorState from '../../components/ErrorState';
import Toast from '../../components/Toast';

function PecesList() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [peces, setPeces] = useState<Peca[] | null>(null);
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
    pecesService
      .list()
      .then(setPeces)
      .catch((err: unknown) => {
        setError(err instanceof ApiError ? err.message : t('peces.error'));
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
  } else if (!peces || peces.length === 0) {
    content = (
      <EmptyState
        title={t('peces.empty.title')}
        description={t('peces.empty.description')}
        action={
          <button
            type="button"
            onClick={() => navigate('/peces/nou')}
            className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
          >
            {t('peces.empty.action')}
          </button>
        }
      />
    );
  } else {
    content = (
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
            {t('nav.peces')}
          </h1>
          <button
            type="button"
            onClick={() => navigate('/peces/nou')}
            className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
          >
            {t('peces.new')}
          </button>
        </div>

        <DataTable
          columns={[
            { key: 'nom', header: t('peces.column.nom') },
            { key: 'referencia', header: t('peces.column.referencia') },
            { key: 'preu', header: t('peces.column.preu') },
            { key: 'estoc', header: t('peces.column.estoc') },
          ]}
          rows={peces}
          getRowId={(peca) => peca.id}
          onRowClick={(peca) => navigate(`/peces/${peca.id}`)}
          searchPlaceholder={t('peces.search')}
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

export default PecesList;
