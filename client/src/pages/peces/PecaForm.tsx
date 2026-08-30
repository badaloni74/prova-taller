import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import EntityForm from '../../components/EntityForm';
import type { FormField } from '../../components/EntityForm';
import Spinner from '../../components/Spinner';
import { pecesService } from '../../services/peces';
import { ApiError } from '../../services/api';
import { useSubmitGuard } from '../../hooks/useSubmitGuard';

const EMPTY_VALUES = {
  nom: '',
  referencia: '',
  preu: '0',
  cost: '',
  unitat: 'unitat',
  proveidor: '',
  estoc: '0',
};

function PecaForm() {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [values, setValues] = useState<Record<string, string>>(EMPTY_VALUES);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    if (!isEdit || !id) return;
    pecesService.get(Number(id)).then((peca) => {
      setValues({
        nom: peca.nom,
        referencia: peca.referencia ?? '',
        preu: String(peca.preu),
        cost: peca.cost != null ? String(peca.cost) : '',
        unitat: peca.unitat,
        proveidor: peca.proveidor ?? '',
        estoc: String(peca.estoc),
      });
      setLoading(false);
    });
  }, [id, isEdit]);

  const fields: FormField[] = [
    { name: 'nom', label: t('peces.form.nom'), required: true },
    { name: 'referencia', label: t('peces.detail.referencia') },
    { name: 'preu', label: t('peces.detail.preu'), type: 'number', min: 0.01 },
    { name: 'cost', label: t('peces.detail.cost'), type: 'number', min: 0.01 },
    { name: 'unitat', label: t('peces.detail.unitat') },
    { name: 'proveidor', label: t('peces.detail.proveidor') },
    { name: 'estoc', label: t('peces.detail.estoc'), type: 'number', min: 0 },
  ];

  const handleChange = (name: string, value: string) => {
    setValues((current) => ({ ...current, [name]: value }));
  };

  const submitPeca = async () => {
    const payload = {
      nom: values.nom,
      referencia: values.referencia || null,
      preu: Number(values.preu) || 0,
      cost: values.cost ? Number(values.cost) : null,
      unitat: values.unitat || 'unitat',
      proveidor: values.proveidor || null,
      estoc: Number(values.estoc) || 0,
    };

    try {
      const peca = isEdit
        ? await pecesService.update(Number(id), payload)
        : await pecesService.create(payload);
      navigate(`/peces/${peca.id}`);
    } catch (err: unknown) {
      setErrors({ nom: err instanceof ApiError ? err.message : t('peces.error') });
      throw err;
    }
  };

  const { submitting, guardedSubmit } = useSubmitGuard(submitPeca);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!values.nom.trim()) {
      setErrors({ nom: t('common.required') });
      return;
    }
    if (!(Number(values.preu) > 0)) {
      // Mensaje fijo en castellano, no traducido: decisión explícita del propietario
      // del proyecto para SPE-07, aunque el resto del formulario use i18n (t()).
      setErrors({ preu: 'El precio debe ser mayor que cero' });
      return;
    }
    if (values.cost && !(Number(values.cost) > 0)) {
      setErrors({ cost: 'El coste debe ser mayor que cero' });
      return;
    }
    if (Number(values.estoc) < 0) {
      setErrors({ estoc: 'El estoc no puede ser negativo' });
      return;
    }
    setErrors({});

    await guardedSubmit();
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <h1 className="mb-4 text-xl font-semibold text-slate-900 dark:text-slate-50">
        {isEdit ? t('peces.form.editTitle') : t('peces.form.newTitle')}
      </h1>
      <EntityForm
        fields={fields}
        values={values}
        errors={errors}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={() => navigate(isEdit ? `/peces/${id}` : '/peces')}
        submitLabel={t('common.save')}
        cancelLabel={t('common.cancel')}
        submitting={submitting}
        submittingLabel={t('common.saving')}
      />
    </div>
  );
}

export default PecaForm;
