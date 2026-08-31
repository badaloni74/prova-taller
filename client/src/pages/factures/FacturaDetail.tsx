import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { facturesService } from '../../services/factures';
import { clientsService } from '../../services/clients';
import { ApiError } from '../../services/api';
import { useSubmitGuard } from '../../hooks/useSubmitGuard';
import type { Factura } from '../../types/factura';
import type { Client } from '../../types/client';
import Spinner from '../../components/Spinner';
import ErrorState from '../../components/ErrorState';
import { formatMoney } from '../../utils/format';

function FacturaDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [factura, setFactura] = useState<Factura | null>(null);
  const [client, setClient] = useState<Client | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [showRectifyForm, setShowRectifyForm] = useState(false);
  const [motiu, setMotiu] = useState('');
  const [rectifyError, setRectifyError] = useState<string | null>(null);

  const load = () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    facturesService
      .get(Number(id))
      .then((data) => {
        setFactura(data);
        return clientsService.get(data.clientId);
      })
      .then(setClient)
      .catch((err: unknown) => {
        setError(err instanceof ApiError ? err.message : t('factures.error'));
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const togglePaymentStatus = async () => {
    if (!factura) return;
    setUpdating(true);
    const next = factura.estatPagament === 'pagada' ? 'pendent' : 'pagada';
    const updated = await facturesService.updatePaymentStatus(factura.id, next);
    setFactura(updated);
    setUpdating(false);
  };

  const submitRectify = async () => {
    if (!factura) return;
    try {
      const rectificativa = await facturesService.rectify(factura.id, motiu);
      setShowRectifyForm(false);
      setMotiu('');
      navigate(`/factures/${rectificativa.id}`);
    } catch (err: unknown) {
      setRectifyError(err instanceof ApiError ? err.message : t('factures.error'));
      throw err;
    }
  };

  // resetOnSuccess: true porque navegar a /factures/:id de la rectificativa no
  // desmonta este componente (misma ruta, solo cambia el parámetro) — sin esto
  // el botón se quedaría en "Guardando…" para siempre tras el éxito.
  const { submitting: rectifying, guardedSubmit: guardedRectify } = useSubmitGuard(submitRectify, {
    resetOnSuccess: true,
  });

  const handleRectify = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRectifyError(null);

    if (!motiu.trim()) {
      setRectifyError(t('common.required'));
      return;
    }

    await guardedRectify();
  };

  if (loading) return <Spinner />;
  if (error) return <ErrorState message={error} onRetry={load} retryLabel={t('common.retry')} />;
  if (!factura) return null;

  return (
    <div>
      <Link to="/factures" className="text-sm text-primary-600 hover:underline">
        ← {t('factures.detail.back')}
      </Link>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
            {factura.numero}
          </h1>
          {factura.anuladaPer !== null && (
            <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700 dark:bg-red-900/40 dark:text-red-300">
              {t('factures.detail.anulada')}
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            disabled={updating}
            onClick={togglePaymentStatus}
            className="rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {factura.estatPagament === 'pagada'
              ? t('factures.detail.markAsPendent')
              : t('factures.detail.markAsPagada')}
          </button>
          {factura.anuladaPer === null && (
            <button
              type="button"
              onClick={() => setShowRectifyForm((current) => !current)}
              className="rounded-md border border-red-300 px-3 py-1.5 text-sm text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-300 dark:hover:bg-red-950"
            >
              {t('factures.detail.rectify')}
            </button>
          )}
        </div>
      </div>

      {client && (
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {t('factures.detail.client')}:{' '}
          <Link to={`/clients/${client.id}`} className="text-primary-600 hover:underline">
            {client.nom}
          </Link>
        </p>
      )}

      {factura.anuladaPer !== null && (
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {t('factures.detail.rectifyingBy')}:{' '}
          <Link to={`/factures/${factura.anuladaPer}`} className="text-primary-600 hover:underline">
            #{factura.anuladaPer}
          </Link>
        </p>
      )}

      {factura.facturaRectificadaId !== null && (
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {t('factures.detail.rectificaA')}:{' '}
          <Link
            to={`/factures/${factura.facturaRectificadaId}`}
            className="text-primary-600 hover:underline"
          >
            #{factura.facturaRectificadaId}
          </Link>
          {factura.motiuRectificacio && (
            <span>
              {' '}
              — {t('factures.detail.motiuRectificacio')}: {factura.motiuRectificacio}
            </span>
          )}
        </p>
      )}

      {showRectifyForm && (
        <form
          onSubmit={handleRectify}
          noValidate
          className="mt-4 flex flex-col gap-2 rounded-md border border-red-200 p-3 dark:border-red-900"
        >
          <label className="text-xs font-medium text-slate-700 dark:text-slate-200">
            {t('factures.detail.rectifyMotiuLabel')}
          </label>
          <textarea
            value={motiu}
            onChange={(e) => setMotiu(e.target.value)}
            rows={2}
            className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
          <div className="flex items-center gap-2">
            <button
              type="submit"
              disabled={rectifying}
              className="rounded-md bg-red-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
            >
              {rectifying ? t('common.saving') : t('factures.detail.rectifyConfirm')}
            </button>
            <button
              type="button"
              onClick={() => setShowRectifyForm(false)}
              className="rounded-md border border-slate-300 px-4 py-1.5 text-sm text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {t('common.cancel')}
            </button>
          </div>
          {rectifyError && <p className="text-xs text-red-600 dark:text-red-400">{rectifyError}</p>}
        </form>
      )}

      <dl className="mt-6 grid grid-cols-2 gap-4">
        <div>
          <dt className="text-xs uppercase text-slate-500 dark:text-slate-400">
            {t('factures.detail.estatPagament')}
          </dt>
          <dd className="text-sm text-slate-800 dark:text-slate-100">
            {t(`factures.estatPagament.${factura.estatPagament}`)}
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase text-slate-500 dark:text-slate-400">
            {t('factures.detail.iva')}
          </dt>
          <dd className="text-sm text-slate-800 dark:text-slate-100">{factura.ivaPercentatge}%</dd>
        </div>
        <div>
          <dt className="text-xs uppercase text-slate-500 dark:text-slate-400">
            {t('factures.detail.ivaImport')}
          </dt>
          <dd className="text-sm text-slate-800 dark:text-slate-100">{formatMoney(factura.ivaImport)}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase text-slate-500 dark:text-slate-400">
            {t('factures.detail.base')}
          </dt>
          <dd className="text-sm text-slate-800 dark:text-slate-100">{formatMoney(factura.base)}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase text-slate-500 dark:text-slate-400">
            {t('factures.detail.total')}
          </dt>
          <dd className="text-lg font-semibold text-slate-900 dark:text-slate-50">
            {formatMoney(factura.total)}
          </dd>
        </div>
      </dl>

      <div className="mt-8">
        <h2 className="mb-3 text-lg font-semibold text-slate-900 dark:text-slate-50">
          {t('factures.detail.albaransTitle')}
        </h2>
        <ul className="flex flex-col gap-1">
          {factura.albarans.map((albara) => (
            <li key={albara.id}>
              <Link
                to={`/albarans/${albara.id}`}
                className="text-sm text-primary-600 hover:underline"
              >
                {albara.numero}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FacturaDetail;
