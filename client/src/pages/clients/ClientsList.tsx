import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { clientsService } from '../../services/clients';
import { ApiError } from '../../services/api';
import type { Client } from '../../types/client';
import DataTable from '../../components/DataTable';
import Spinner from '../../components/Spinner';
import EmptyState from '../../components/EmptyState';
import ErrorState from '../../components/ErrorState';
import Toast from '../../components/Toast';

function ClientsList() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [clients, setClients] = useState<Client[] | null>(null);
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
    clientsService
      .list()
      .then(setClients)
      .catch((err: unknown) => {
        setError(err instanceof ApiError ? err.message : t('clients.error'));
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
  } else if (!clients || clients.length === 0) {
    content = (
      <EmptyState
        title={t('clients.empty.title')}
        description={t('clients.empty.description')}
        action={
          <button
            type="button"
            onClick={() => navigate('/clients/nou')}
            className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
          >
            {t('clients.empty.action')}
          </button>
        }
      />
    );
  } else {
    content = (
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
            {t('nav.clients')}
          </h1>
          <button
            type="button"
            onClick={() => navigate('/clients/nou')}
            className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
          >
            {t('clients.new')}
          </button>
        </div>

        <DataTable
          columns={[
            { key: 'nom', header: t('clients.column.nom') },
            { key: 'nif', header: t('clients.column.nif') },
            { key: 'telefon', header: t('clients.column.telefon') },
            { key: 'email', header: t('clients.column.email') },
          ]}
          rows={clients}
          getRowId={(client) => client.id}
          onRowClick={(client) => navigate(`/clients/${client.id}`)}
          searchPlaceholder={t('clients.search')}
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

export default ClientsList;
