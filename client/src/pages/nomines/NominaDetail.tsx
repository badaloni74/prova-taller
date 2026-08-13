import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { nominesService } from '../../services/nomines';
import { personalService } from '../../services/personal';
import { ApiError } from '../../services/api';
import type { Nomina } from '../../types/nomina';
import type { Personal } from '../../types/personal';
import Spinner from '../../components/Spinner';
import ErrorState from '../../components/ErrorState';
import ConfirmDialog from '../../components/ConfirmDialog';

function NominaDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [nomina, setNomina] = useState<Nomina | null>(null);
  const [persona, setPersona] = useState<Personal | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [updating, setUpdating] = useState(false);

  const load = () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    nominesService
      .get(Number(id))
      .then((data) => {
        setNomina(data);
        return personalService.get(data.personalId);
      })
      .then(setPersona)
      .catch((err: unknown) => {
        setError(err instanceof ApiError ? err.message : t('nomines.error'));
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleDelete = async () => {
    if (!nomina) return;
    setConfirmOpen(false);
    await nominesService.remove(nomina.id);
    navigate('/nomines', { state: { toast: t('nomines.toast.deleted') } });
  };

  const togglePaymentStatus = async () => {
    if (!nomina) return;
    setUpdating(true);
    const next = nomina.estatPagament === 'pagada' ? 'pendent' : 'pagada';
    const updated = await nominesService.updatePaymentStatus(nomina.id, next);
    setNomina(updated);
    setUpdating(false);
  };

  if (loading) return <Spinner />;
  if (error) return <ErrorState message={error} onRetry={load} retryLabel={t('common.retry')} />;
  if (!nomina) return null;

  return (
    <div>
      <Link to="/nomines" className="text-sm text-primary-600 hover:underline">
        ← {t('nomines.detail.back')}
      </Link>

      <div className="mt-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
          {String(nomina.mes).padStart(2, '0')}/{nomina.anyNomina}
        </h1>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => navigate(`/nomines/${nomina.id}/editar`)}
            className="rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {t('nomines.detail.edit')}
          </button>
          <button
            type="button"
            disabled={updating}
            onClick={togglePaymentStatus}
            className="rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {nomina.estatPagament === 'pagada'
              ? t('nomines.detail.markAsPendent')
              : t('nomines.detail.markAsPagada')}
          </button>
          <button
            type="button"
            onClick={() => setConfirmOpen(true)}
            className="rounded-md border border-red-300 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950/40"
          >
            {t('nomines.detail.delete')}
          </button>
        </div>
      </div>

      {persona && (
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {t('nomines.detail.empleat')}:{' '}
          <Link to={`/personal/${persona.id}`} className="text-primary-600 hover:underline">
            {persona.nom}
          </Link>
        </p>
      )}

      <dl className="mt-6 grid grid-cols-2 gap-4">
        <div>
          <dt className="text-xs uppercase text-slate-500 dark:text-slate-400">
            {t('nomines.detail.estatPagament')}
          </dt>
          <dd className="text-sm text-slate-800 dark:text-slate-100">
            {t(`nomines.estatPagament.${nomina.estatPagament}`)}
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase text-slate-500 dark:text-slate-400">
            {t('nomines.detail.salariBrut')}
          </dt>
          <dd className="text-sm text-slate-800 dark:text-slate-100">
            {nomina.salariBrut.toFixed(2)} €
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase text-slate-500 dark:text-slate-400">
            {t('nomines.detail.deduccions')}
          </dt>
          <dd className="text-sm text-slate-800 dark:text-slate-100">
            {nomina.deduccions.toFixed(2)} €
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase text-slate-500 dark:text-slate-400">
            {t('nomines.detail.salariNet')}
          </dt>
          <dd className="text-lg font-semibold text-slate-900 dark:text-slate-50">
            {nomina.salariNet.toFixed(2)} €
          </dd>
        </div>
      </dl>

      <ConfirmDialog
        open={confirmOpen}
        title={t('common.confirmDeleteTitle')}
        message={t('nomines.confirmDelete')}
        confirmLabel={t('common.delete')}
        cancelLabel={t('common.cancel')}
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}

export default NominaDetail;
