import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { pecesService } from '../../services/peces';
import { ApiError } from '../../services/api';
import type { Peca } from '../../types/peca';
import Spinner from '../../components/Spinner';
import ErrorState from '../../components/ErrorState';
import ConfirmDialog from '../../components/ConfirmDialog';

function PecaDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [peca, setPeca] = useState<Peca | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const load = () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    pecesService
      .get(Number(id))
      .then(setPeca)
      .catch((err: unknown) => {
        setError(err instanceof ApiError ? err.message : t('peces.error'));
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleDelete = async () => {
    if (!peca) return;
    setConfirmOpen(false);
    setDeleteError(null);
    try {
      await pecesService.remove(peca.id);
      navigate('/peces', { state: { toast: t('peces.toast.deleted') } });
    } catch (err: unknown) {
      setDeleteError(err instanceof ApiError ? err.message : t('peces.error'));
    }
  };

  if (loading) return <Spinner />;
  if (error) return <ErrorState message={error} onRetry={load} retryLabel={t('common.retry')} />;
  if (!peca) return null;

  const fields: [string, string][] = [
    [t('peces.detail.referencia'), peca.referencia || '—'],
    [t('peces.detail.preu'), `${peca.preu.toFixed(2)} €`],
    [t('peces.detail.cost'), peca.cost != null ? `${peca.cost.toFixed(2)} €` : '—'],
    [t('peces.detail.unitat'), peca.unitat],
    [t('peces.detail.proveidor'), peca.proveidor || '—'],
    [t('peces.detail.estoc'), String(peca.estoc)],
    [t('peces.detail.creatEl'), peca.creatEl],
    [t('peces.detail.actualitzatEl'), peca.actualitzatEl],
  ];

  return (
    <div>
      <Link to="/peces" className="text-sm text-primary-600 hover:underline">
        ← {t('peces.detail.back')}
      </Link>

      <div className="mt-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-50">{peca.nom}</h1>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => navigate(`/peces/${peca.id}/editar`)}
            className="rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {t('peces.detail.edit')}
          </button>
          <button
            type="button"
            onClick={() => setConfirmOpen(true)}
            className="rounded-md border border-red-300 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950/40"
          >
            {t('peces.detail.delete')}
          </button>
        </div>
      </div>

      {deleteError && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{deleteError}</p>
      )}

      <dl className="mt-6 grid grid-cols-2 gap-4">
        {fields.map(([label, value]) => (
          <div key={label}>
            <dt className="text-xs uppercase text-slate-500 dark:text-slate-400">{label}</dt>
            <dd className="text-sm text-slate-800 dark:text-slate-100">{value}</dd>
          </div>
        ))}
      </dl>

      <ConfirmDialog
        open={confirmOpen}
        title={t('common.confirmDeleteTitle')}
        message={t('peces.confirmDelete')}
        confirmLabel={t('common.delete')}
        cancelLabel={t('common.cancel')}
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}

export default PecaDetail;
