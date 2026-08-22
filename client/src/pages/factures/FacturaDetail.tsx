import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { facturesService } from '../../services/factures';
import { clientsService } from '../../services/clients';
import { ApiError } from '../../services/api';
import type { Factura } from '../../types/factura';
import type { Client } from '../../types/client';
import Spinner from '../../components/Spinner';
import ErrorState from '../../components/ErrorState';
import { formatMoney } from '../../utils/format';

function FacturaDetail() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const [factura, setFactura] = useState<Factura | null>(null);
  const [client, setClient] = useState<Client | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

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

  if (loading) return <Spinner />;
  if (error) return <ErrorState message={error} onRetry={load} retryLabel={t('common.retry')} />;
  if (!factura) return null;

  return (
    <div>
      <Link to="/factures" className="text-sm text-primary-600 hover:underline">
        ← {t('factures.detail.back')}
      </Link>

      <div className="mt-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
          {factura.numero}
        </h1>
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
      </div>

      {client && (
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {t('factures.detail.client')}:{' '}
          <Link to={`/clients/${client.id}`} className="text-primary-600 hover:underline">
            {client.nom}
          </Link>
        </p>
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
