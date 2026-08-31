import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { facturesService } from '../../services/factures';
import { ApiError } from '../../services/api';
import type { Factura } from '../../types/factura';
import DataTable from '../../components/DataTable';
import Spinner from '../../components/Spinner';
import EmptyState from '../../components/EmptyState';
import ErrorState from '../../components/ErrorState';
import Toast from '../../components/Toast';
import { formatMoney } from '../../utils/format';

function FacturesList() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [factures, setFactures] = useState<Factura[] | null>(null);
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
    facturesService
      .list()
      .then(setFactures)
      .catch((err: unknown) => {
        setError(err instanceof ApiError ? err.message : t('factures.error'));
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
  } else if (!factures || factures.length === 0) {
    content = (
      <EmptyState
        title={t('factures.empty.title')}
        description={t('factures.empty.description')}
        action={
          <button
            type="button"
            onClick={() => navigate('/factures/nova')}
            className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
          >
            {t('factures.empty.action')}
          </button>
        }
      />
    );
  } else {
    content = (
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
            {t('nav.factures')}
          </h1>
          <button
            type="button"
            onClick={() => navigate('/factures/nova')}
            className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
          >
            {t('factures.new')}
          </button>
        </div>

        <DataTable
          columns={[
            {
              key: 'numero',
              header: t('factures.column.numero'),
              render: (factura) => (
                <span className="flex items-center gap-2">
                  {factura.numero}
                  {factura.anuladaPer !== null && (
                    <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700 dark:bg-red-900/40 dark:text-red-300">
                      {t('factures.detail.anulada')}
                    </span>
                  )}
                </span>
              ),
            },
            {
              key: 'estatPagament',
              header: t('factures.column.estatPagament'),
              render: (factura) => t(`factures.estatPagament.${factura.estatPagament}`),
            },
            {
              key: 'total',
              header: t('factures.column.total'),
              render: (factura) => formatMoney(factura.total),
            },
          ]}
          rows={factures}
          getRowId={(factura) => factura.id}
          onRowClick={(factura) => navigate(`/factures/${factura.id}`)}
          searchPlaceholder={t('factures.search')}
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

export default FacturesList;
