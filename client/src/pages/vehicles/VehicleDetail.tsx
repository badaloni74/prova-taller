import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { vehiclesService } from '../../services/vehicles';
import { clientsService } from '../../services/clients';
import { albaransService } from '../../services/albarans';
import { ApiError } from '../../services/api';
import type { Vehicle } from '../../types/vehicle';
import type { Client } from '../../types/client';
import type { Albara } from '../../types/albara';
import Spinner from '../../components/Spinner';
import ErrorState from '../../components/ErrorState';
import ConfirmDialog from '../../components/ConfirmDialog';

function VehicleDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [client, setClient] = useState<Client | null>(null);
  const [albarans, setAlbarans] = useState<Albara[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const load = () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    vehiclesService
      .get(Number(id))
      .then((data) => {
        setVehicle(data);
        return Promise.all([
          clientsService.get(data.clientId),
          albaransService.listByVehicle(data.id),
        ]);
      })
      .then(([clientData, albaransData]) => {
        setClient(clientData);
        setAlbarans(albaransData);
      })
      .catch((err: unknown) => {
        setError(err instanceof ApiError ? err.message : t('vehicles.error'));
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleDelete = async () => {
    if (!vehicle) return;
    setConfirmOpen(false);
    await vehiclesService.remove(vehicle.id);
    navigate('/vehicles', { state: { toast: t('vehicles.toast.deleted') } });
  };

  if (loading) return <Spinner />;
  if (error) return <ErrorState message={error} onRetry={load} retryLabel={t('common.retry')} />;
  if (!vehicle) return null;

  const fields: [string, string][] = [
    [t('vehicles.detail.matricula'), vehicle.matricula],
    [t('vehicles.detail.bastidor'), vehicle.bastidor || '—'],
    [t('vehicles.detail.anyMatriculacio'), vehicle.anyMatriculacio != null ? String(vehicle.anyMatriculacio) : '—'],
    [t('vehicles.detail.quilometratge'), vehicle.quilometratge != null ? String(vehicle.quilometratge) : '—'],
    [t('vehicles.detail.color'), vehicle.color || '—'],
    [t('vehicles.detail.creatEl'), vehicle.creatEl],
    [t('vehicles.detail.actualitzatEl'), vehicle.actualitzatEl],
  ];

  return (
    <div>
      <Link to="/vehicles" className="text-sm text-primary-600 hover:underline">
        ← {t('vehicles.detail.back')}
      </Link>

      <div className="mt-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
          {vehicle.marca} {vehicle.model}
        </h1>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => navigate(`/vehicles/${vehicle.id}/editar`)}
            className="rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {t('vehicles.detail.edit')}
          </button>
          <button
            type="button"
            onClick={() => setConfirmOpen(true)}
            className="rounded-md border border-red-300 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950/40"
          >
            {t('vehicles.detail.delete')}
          </button>
        </div>
      </div>

      {client && (
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {t('vehicles.detail.client')}:{' '}
          <Link to={`/clients/${client.id}`} className="text-primary-600 hover:underline">
            {client.nom}
          </Link>
        </p>
      )}

      <dl className="mt-6 grid grid-cols-2 gap-4">
        {fields.map(([label, value]) => (
          <div key={label}>
            <dt className="text-xs uppercase text-slate-500 dark:text-slate-400">{label}</dt>
            <dd className="text-sm text-slate-800 dark:text-slate-100">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
            {t('vehicles.detail.albaransTitle')}
          </h2>
          <button
            type="button"
            onClick={() => navigate(`/albarans/nou?vehicleId=${vehicle.id}`)}
            className="rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {t('vehicles.detail.newAlbara')}
          </button>
        </div>
        {albarans.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {t('vehicles.detail.noAlbarans')}
          </p>
        ) : (
          <ul className="flex flex-col gap-1">
            {albarans.map((albara) => (
              <li key={albara.id}>
                <Link
                  to={`/albarans/${albara.id}`}
                  className="text-sm text-primary-600 hover:underline"
                >
                  {albara.numero} — {t(`albarans.estat.${albara.estat}`)}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title={t('common.confirmDeleteTitle')}
        message={t('vehicles.confirmDelete')}
        confirmLabel={t('common.delete')}
        cancelLabel={t('common.cancel')}
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}

export default VehicleDetail;
