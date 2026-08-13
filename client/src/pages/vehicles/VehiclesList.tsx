import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { vehiclesService } from '../../services/vehicles';
import { ApiError } from '../../services/api';
import type { Vehicle } from '../../types/vehicle';
import DataTable from '../../components/DataTable';
import Spinner from '../../components/Spinner';
import EmptyState from '../../components/EmptyState';
import ErrorState from '../../components/ErrorState';
import Toast from '../../components/Toast';

function VehiclesList() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [vehicles, setVehicles] = useState<Vehicle[] | null>(null);
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
    vehiclesService
      .list()
      .then(setVehicles)
      .catch((err: unknown) => {
        setError(err instanceof ApiError ? err.message : t('vehicles.error'));
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
  } else if (!vehicles || vehicles.length === 0) {
    content = (
      <EmptyState
        title={t('vehicles.empty.title')}
        description={t('vehicles.empty.description')}
        action={
          <button
            type="button"
            onClick={() => navigate('/vehicles/nou')}
            className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
          >
            {t('vehicles.empty.action')}
          </button>
        }
      />
    );
  } else {
    content = (
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
            {t('nav.vehicles')}
          </h1>
          <button
            type="button"
            onClick={() => navigate('/vehicles/nou')}
            className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
          >
            {t('vehicles.new')}
          </button>
        </div>

        <DataTable
          columns={[
            { key: 'marca', header: t('vehicles.column.marca') },
            { key: 'model', header: t('vehicles.column.model') },
            { key: 'matricula', header: t('vehicles.column.matricula') },
          ]}
          rows={vehicles}
          getRowId={(vehicle) => vehicle.id}
          onRowClick={(vehicle) => navigate(`/vehicles/${vehicle.id}`)}
          searchPlaceholder={t('vehicles.search')}
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

export default VehiclesList;
