import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { personalService } from '../../services/personal';
import { ApiError } from '../../services/api';
import type { Personal } from '../../types/personal';
import Spinner from '../../components/Spinner';
import ErrorState from '../../components/ErrorState';
import ConfirmDialog from '../../components/ConfirmDialog';

function PersonalDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [persona, setPersona] = useState<Personal | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const load = () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    personalService
      .get(Number(id))
      .then(setPersona)
      .catch((err: unknown) => {
        setError(err instanceof ApiError ? err.message : t('personal.error'));
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleDelete = async () => {
    if (!persona) return;
    setConfirmOpen(false);
    await personalService.remove(persona.id);
    navigate('/personal', { state: { toast: t('personal.toast.deleted') } });
  };

  if (loading) return <Spinner />;
  if (error) return <ErrorState message={error} onRetry={load} retryLabel={t('common.retry')} />;
  if (!persona) return null;

  const fields: [string, string][] = [
    [t('personal.detail.telefon'), persona.telefon || '—'],
    [t('personal.detail.email'), persona.email || '—'],
    [t('personal.detail.dni'), persona.dni || '—'],
    [t('personal.detail.carrec'), persona.carrec || '—'],
    [t('personal.detail.dataAlta'), persona.dataAlta || '—'],
    [
      t('personal.detail.salariBase'),
      persona.salariBase != null ? `${persona.salariBase.toFixed(2)} €` : '—',
    ],
    [t('personal.detail.creatEl'), persona.creatEl],
    [t('personal.detail.actualitzatEl'), persona.actualitzatEl],
  ];

  return (
    <div>
      <Link to="/personal" className="text-sm text-primary-600 hover:underline">
        ← {t('personal.detail.back')}
      </Link>

      <div className="mt-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-50">{persona.nom}</h1>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => navigate(`/personal/${persona.id}/editar`)}
            className="rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {t('personal.detail.edit')}
          </button>
          <button
            type="button"
            onClick={() => setConfirmOpen(true)}
            className="rounded-md border border-red-300 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950/40"
          >
            {t('personal.detail.delete')}
          </button>
        </div>
      </div>

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
        message={t('personal.confirmDelete')}
        confirmLabel={t('common.delete')}
        cancelLabel={t('common.cancel')}
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}

export default PersonalDetail;
