import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { clientsService } from '../../services/clients';
import { ApiError } from '../../services/api';
import type { Client } from '../../types/client';
import Spinner from '../../components/Spinner';
import ErrorState from '../../components/ErrorState';
import ConfirmDialog from '../../components/ConfirmDialog';

function ClientDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [client, setClient] = useState<Client | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const load = () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    clientsService
      .get(Number(id))
      .then(setClient)
      .catch((err: unknown) => {
        setError(err instanceof ApiError ? err.message : t('clients.error'));
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleDelete = async () => {
    if (!client) return;
    setConfirmOpen(false);
    await clientsService.remove(client.id);
    navigate('/clients', { state: { toast: t('clients.toast.deleted') } });
  };

  if (loading) return <Spinner />;
  if (error) return <ErrorState message={error} onRetry={load} retryLabel={t('common.retry')} />;
  if (!client) return null;

  const fields: [string, string | null][] = [
    [t('clients.detail.nif'), client.nif],
    [t('clients.detail.telefon'), client.telefon],
    [t('clients.detail.email'), client.email],
    [t('clients.detail.adreca'), client.adreca],
    [t('clients.detail.notes'), client.notes],
    [t('clients.detail.creatEl'), client.creatEl],
    [t('clients.detail.actualitzatEl'), client.actualitzatEl],
  ];

  return (
    <div>
      <Link to="/clients" className="text-sm text-primary-600 hover:underline">
        ← {t('clients.detail.back')}
      </Link>

      <div className="mt-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-50">{client.nom}</h1>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => navigate(`/clients/${client.id}/editar`)}
            className="rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {t('clients.detail.edit')}
          </button>
          <button
            type="button"
            onClick={() => setConfirmOpen(true)}
            className="rounded-md border border-red-300 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950/40"
          >
            {t('clients.detail.delete')}
          </button>
        </div>
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-4">
        {fields.map(([label, value]) => (
          <div key={label}>
            <dt className="text-xs uppercase text-slate-500 dark:text-slate-400">{label}</dt>
            <dd className="text-sm text-slate-800 dark:text-slate-100">{value || '—'}</dd>
          </div>
        ))}
      </dl>

      <ConfirmDialog
        open={confirmOpen}
        title={t('common.confirmDeleteTitle')}
        message={t('clients.confirmDelete')}
        confirmLabel={t('common.delete')}
        cancelLabel={t('common.cancel')}
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}

export default ClientDetail;
