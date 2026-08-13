import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { facturesService } from '../../services/factures';
import { clientsService } from '../../services/clients';
import { albaransService } from '../../services/albarans';
import { ApiError } from '../../services/api';
import type { Client } from '../../types/client';
import type { Albara } from '../../types/albara';

function FacturaForm() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [clients, setClients] = useState<Client[]>([]);
  const [clientId, setClientId] = useState(searchParams.get('clientId') ?? '');
  const [pendingAlbarans, setPendingAlbarans] = useState<Albara[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [ivaPercentatge, setIvaPercentatge] = useState('21');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    clientsService.list().then(setClients);
  }, []);

  useEffect(() => {
    setSelectedIds(new Set());
    if (!clientId) {
      setPendingAlbarans([]);
      return;
    }
    albaransService.listByClient(Number(clientId), 'pendent').then(setPendingAlbarans);
  }, [clientId]);

  const toggleAlbara = (id: number) => {
    setSelectedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!clientId) {
      setError(t('factures.form.clientPlaceholder'));
      return;
    }
    if (selectedIds.size === 0) {
      setError(t('factures.form.selectAtLeastOne'));
      return;
    }

    try {
      const factura = await facturesService.create({
        albaraIds: [...selectedIds],
        ivaPercentatge: Number(ivaPercentatge) || 21,
      });
      navigate(`/factures/${factura.id}`);
    } catch (err: unknown) {
      setError(err instanceof ApiError ? err.message : t('factures.error'));
    }
  };

  return (
    <div>
      <h1 className="mb-4 text-xl font-semibold text-slate-900 dark:text-slate-50">
        {t('factures.form.title')}
      </h1>

      <form onSubmit={handleSubmit} className="flex max-w-lg flex-col gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
            {t('factures.form.client')}
          </label>
          <select
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            <option value="">{t('factures.form.clientPlaceholder')}</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.nom}
              </option>
            ))}
          </select>
        </div>

        {clientId && (
          <div>
            <p className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-200">
              {t('factures.form.albaransTitle')}
            </p>
            {pendingAlbarans.length === 0 ? (
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {t('factures.form.noAlbarans')}
              </p>
            ) : (
              <ul className="flex flex-col gap-1">
                {pendingAlbarans.map((albara) => (
                  <li key={albara.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`albara-${albara.id}`}
                      checked={selectedIds.has(albara.id)}
                      onChange={() => toggleAlbara(albara.id)}
                    />
                    <label htmlFor={`albara-${albara.id}`} className="text-sm text-slate-700 dark:text-slate-200">
                      {albara.numero}
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
            {t('factures.form.iva')}
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={ivaPercentatge}
            onChange={(e) => setIvaPercentatge(e.target.value)}
            className="w-32 rounded-md border border-slate-300 px-3 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
        </div>

        {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

        <div className="flex gap-2">
          <button
            type="submit"
            className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
          >
            {t('factures.form.submit')}
          </button>
          <button
            type="button"
            onClick={() => navigate('/factures')}
            className="rounded-md border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {t('common.cancel')}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FacturaForm;
