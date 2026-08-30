import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { albaransService } from '../../services/albarans';
import { pecesService } from '../../services/peces';
import type { Albara } from '../../types/albara';
import type { Peca } from '../../types/peca';
import { useSubmitGuard } from '../../hooks/useSubmitGuard';
import { formatMoney } from '../../utils/format';

interface AlbaraLiniesSectionProps {
  albara: Albara;
  onUpdate: (updated: Albara) => void;
  editable: boolean;
}

function AlbaraLiniesSection({ albara, onUpdate, editable }: AlbaraLiniesSectionProps) {
  const { t } = useTranslation();
  const [peces, setPeces] = useState<Peca[]>([]);
  const [tipus, setTipus] = useState<'peca' | 'ma_obra'>('peca');
  const [pecaId, setPecaId] = useState('');
  const [descripcio, setDescripcio] = useState('');
  const [quantitat, setQuantitat] = useState('1');
  const [preu, setPreu] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    pecesService.list().then(setPeces);
  }, []);

  const pecaName = (id: number | null) => peces.find((p) => p.id === id)?.nom ?? `#${id}`;

  const submitLinia = async () => {
    try {
      const updated = await albaransService.addLinia(albara.id, {
        tipus,
        pecaId: tipus === 'peca' ? Number(pecaId) : undefined,
        descripcio: tipus === 'ma_obra' ? descripcio : undefined,
        quantitat: Number(quantitat),
        preu: preu ? Number(preu) : undefined,
      });
      onUpdate(updated);
      setPecaId('');
      setDescripcio('');
      setQuantitat('1');
      setPreu('');
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      throw err;
    }
  };

  // resetOnSuccess: true perquè, a diferència dels altres punts d'enviament,
  // aquest formulari no navega en acabar — cal poder tornar a prémer «Afegir
  // línia» de seguida per anotar la línia següent del mateix albarà.
  const { submitting, guardedSubmit } = useSubmitGuard(submitLinia, { resetOnSuccess: true });

  const handleAdd = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!quantitat || Number(quantitat) <= 0) {
      setError(t('common.required'));
      return;
    }
    if (tipus === 'peca' && !pecaId) {
      setError(t('common.required'));
      return;
    }
    if (tipus === 'ma_obra' && !descripcio.trim()) {
      setError(t('common.required'));
      return;
    }
    if (tipus === 'ma_obra' && !(Number(preu) > 0)) {
      // Mensaje fijo en castellano, no traducido: misma decisión que en PecaForm (SPE-07).
      setError('El precio debe ser mayor que cero');
      return;
    }

    await guardedSubmit();
  };

  const handleRemove = async (lineaId: number) => {
    const updated = await albaransService.removeLinia(albara.id, lineaId);
    onUpdate(updated);
  };

  const total = albara.linies.reduce((sum, l) => sum + l.quantitat * l.preu, 0);

  return (
    <div className="mt-8">
      <h2 className="mb-3 text-lg font-semibold text-slate-900 dark:text-slate-50">
        {t('albarans.linies.title')}
      </h2>

      {albara.linies.length === 0 ? (
        <p className="text-sm text-slate-500 dark:text-slate-400">{t('albarans.linies.empty')}</p>
      ) : (
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <th className="px-2 py-2 font-medium text-slate-500 dark:text-slate-400">
                {t('albarans.linies.columnDescripcio')}
              </th>
              <th className="px-2 py-2 font-medium text-slate-500 dark:text-slate-400">
                {t('albarans.linies.columnQuantitat')}
              </th>
              <th className="px-2 py-2 font-medium text-slate-500 dark:text-slate-400">
                {t('albarans.linies.columnPreu')}
              </th>
              <th className="px-2 py-2 font-medium text-slate-500 dark:text-slate-400">
                {t('albarans.linies.columnSubtotal')}
              </th>
              {editable && <th className="px-2 py-2" />}
            </tr>
          </thead>
          <tbody>
            {albara.linies.map((linia) => (
              <tr key={linia.id} className="border-b border-slate-100 dark:border-slate-800">
                <td className="px-2 py-2 text-slate-700 dark:text-slate-200">
                  {linia.tipus === 'peca' ? pecaName(linia.pecaId) : linia.descripcio}
                </td>
                <td className="px-2 py-2 text-slate-700 dark:text-slate-200">{linia.quantitat}</td>
                <td className="px-2 py-2 text-slate-700 dark:text-slate-200">
                  {formatMoney(linia.preu)}
                </td>
                <td className="px-2 py-2 text-slate-700 dark:text-slate-200">
                  {formatMoney(linia.quantitat * linia.preu)}
                </td>
                {editable && (
                  <td className="px-2 py-2 text-right">
                    <button
                      type="button"
                      onClick={() => handleRemove(linia.id)}
                      className="text-sm text-red-600 hover:underline dark:text-red-400"
                    >
                      {t('albarans.linies.remove')}
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} />
              <td className="px-2 py-2 font-semibold text-slate-900 dark:text-slate-50">
                {formatMoney(total)}
              </td>
              {editable && <td />}
            </tr>
          </tfoot>
        </table>
      )}

      {editable && (
        <form
          onSubmit={handleAdd}
          noValidate
          className="mt-4 flex flex-wrap items-end gap-3 rounded-md border border-slate-200 p-3 dark:border-slate-700"
        >
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-700 dark:text-slate-200">
              {t('albarans.linies.tipus')}
            </label>
            <select
              value={tipus}
              onChange={(e) => setTipus(e.target.value as 'peca' | 'ma_obra')}
              className="rounded-md border border-slate-300 px-2 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
              <option value="peca">{t('albarans.linies.tipus.peca')}</option>
              <option value="ma_obra">{t('albarans.linies.tipus.maObra')}</option>
            </select>
          </div>

          {tipus === 'peca' ? (
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700 dark:text-slate-200">
                {t('albarans.linies.peca')}
              </label>
              <select
                value={pecaId}
                onChange={(e) => setPecaId(e.target.value)}
                className="rounded-md border border-slate-300 px-2 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              >
                <option value="">{t('albarans.linies.pecaPlaceholder')}</option>
                {peces.map((peca) => (
                  <option key={peca.id} value={peca.id}>
                    {peca.nom} ({peca.estoc})
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700 dark:text-slate-200">
                {t('albarans.linies.descripcio')}
              </label>
              <input
                type="text"
                value={descripcio}
                onChange={(e) => setDescripcio(e.target.value)}
                className="rounded-md border border-slate-300 px-2 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />
            </div>
          )}

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-700 dark:text-slate-200">
              {tipus === 'ma_obra' ? t('albarans.linies.hores') : t('albarans.linies.quantitat')}
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={quantitat}
              onChange={(e) => setQuantitat(e.target.value)}
              className="w-24 rounded-md border border-slate-300 px-2 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>

          {tipus === 'ma_obra' && (
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700 dark:text-slate-200">
                {t('albarans.linies.preuHora')}
              </label>
              <input
                type="number"
                min="0.01"
                step="0.01"
                value={preu}
                onChange={(e) => setPreu(e.target.value)}
                className="w-24 rounded-md border border-slate-300 px-2 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="rounded-md bg-primary-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-primary-700 disabled:opacity-50"
          >
            {submitting ? t('common.saving') : t('albarans.linies.add')}
          </button>

          {error && <p className="w-full text-xs text-red-600 dark:text-red-400">{error}</p>}
        </form>
      )}
    </div>
  );
}

export default AlbaraLiniesSection;
