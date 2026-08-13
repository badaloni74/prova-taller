import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { albaransService } from '../../services/albarans';
import { vehiclesService } from '../../services/vehicles';
import { clientsService } from '../../services/clients';
import { ApiError } from '../../services/api';
import type { Albara } from '../../types/albara';
import type { Vehicle } from '../../types/vehicle';
import type { Client } from '../../types/client';
import Spinner from '../../components/Spinner';
import ErrorState from '../../components/ErrorState';
import ConfirmDialog from '../../components/ConfirmDialog';

function AlbaraDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [albara, setAlbara] = useState<Albara | null>(null);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [client, setClient] = useState<Client | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const load = () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    albaransService
      .get(Number(id))
      .then((data) => {
        setAlbara(data);
        return vehiclesService.get(data.vehicleId);
      })
      .then((v) => {
        setVehicle(v);
        return clientsService.get(v.clientId);
      })
      .then(setClient)
      .catch((err: unknown) => {
        setError(err instanceof ApiError ? err.message : t('albarans.error'));
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleDelete = async () => {
    if (!albara) return;
    setConfirmOpen(false);
    await albaransService.remove(albara.id);
    navigate('/albarans', { state: { toast: t('albarans.toast.deleted') } });
  };

  if (loading) return <Spinner />;
  if (error) return <ErrorState message={error} onRetry={load} retryLabel={t('common.retry')} />;
  if (!albara) return null;

  const isPendent = albara.estat === 'pendent';

  return (
    <div>
      <Link to="/albarans" className="text-sm text-primary-600 hover:underline">
        ← {t('albarans.detail.back')}
      </Link>

      <div className="mt-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
          {albara.numero}
        </h1>
        {isPendent && (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => navigate(`/albarans/${albara.id}/editar`)}
              className="rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {t('albarans.detail.edit')}
            </button>
            <button
              type="button"
              onClick={() => setConfirmOpen(true)}
              className="rounded-md border border-red-300 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950/40"
            >
              {t('albarans.detail.delete')}
            </button>
          </div>
        )}
      </div>

      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        {vehicle && (
          <>
            {t('albarans.detail.vehicle')}:{' '}
            <Link to={`/vehicles/${vehicle.id}`} className="text-primary-600 hover:underline">
              {vehicle.marca} {vehicle.model} — {vehicle.matricula}
            </Link>
            {' · '}
          </>
        )}
        {client && (
          <>
            {t('albarans.detail.client')}:{' '}
            <Link to={`/clients/${client.id}`} className="text-primary-600 hover:underline">
              {client.nom}
            </Link>
          </>
        )}
      </p>

      {albara.facturaId && (
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {t('albarans.detail.factura')}:{' '}
          <Link to={`/factures/${albara.facturaId}`} className="text-primary-600 hover:underline">
            #{albara.facturaId}
          </Link>
        </p>
      )}

      <dl className="mt-6 grid grid-cols-2 gap-4">
        <div>
          <dt className="text-xs uppercase text-slate-500 dark:text-slate-400">
            {t('albarans.detail.estat')}
          </dt>
          <dd className="text-sm text-slate-800 dark:text-slate-100">
            {t(`albarans.estat.${albara.estat}`)}
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase text-slate-500 dark:text-slate-400">
            {t('albarans.detail.data')}
          </dt>
          <dd className="text-sm text-slate-800 dark:text-slate-100">{albara.data}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase text-slate-500 dark:text-slate-400">
            {t('albarans.detail.notes')}
          </dt>
          <dd className="text-sm text-slate-800 dark:text-slate-100">{albara.notes || '—'}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase text-slate-500 dark:text-slate-400">
            {t('albarans.detail.creatEl')}
          </dt>
          <dd className="text-sm text-slate-800 dark:text-slate-100">{albara.creatEl}</dd>
        </div>
      </dl>

      <ConfirmDialog
        open={confirmOpen}
        title={t('common.confirmDeleteTitle')}
        message={t('albarans.confirmDelete')}
        confirmLabel={t('common.delete')}
        cancelLabel={t('common.cancel')}
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}

export default AlbaraDetail;
