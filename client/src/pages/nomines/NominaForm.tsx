import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import EntityForm from '../../components/EntityForm';
import type { FormField } from '../../components/EntityForm';
import Spinner from '../../components/Spinner';
import { nominesService } from '../../services/nomines';
import { personalService } from '../../services/personal';
import { ApiError } from '../../services/api';
import type { Personal } from '../../types/personal';

const currentDate = new Date();

const EMPTY_VALUES = {
  personalId: '',
  mes: String(currentDate.getMonth() + 1),
  anyNomina: String(currentDate.getFullYear()),
  salariBrut: '',
  deduccions: '0',
};

function NominaForm() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [values, setValues] = useState<Record<string, string>>({
    ...EMPTY_VALUES,
    personalId: searchParams.get('personalId') ?? '',
  });
  const [personal, setPersonal] = useState<Personal[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    personalService.list().then(setPersonal);
  }, []);

  useEffect(() => {
    if (!isEdit || !id) return;
    nominesService.get(Number(id)).then((nomina) => {
      setValues({
        personalId: String(nomina.personalId),
        mes: String(nomina.mes),
        anyNomina: String(nomina.anyNomina),
        salariBrut: String(nomina.salariBrut),
        deduccions: String(nomina.deduccions),
      });
      setLoading(false);
    });
  }, [id, isEdit]);

  const fields: FormField[] = [
    {
      name: 'personalId',
      label: t('nomines.form.empleat'),
      type: 'select',
      required: true,
      placeholder: t('nomines.form.empleatPlaceholder'),
      options: personal.map((persona) => ({ value: String(persona.id), label: persona.nom })),
    },
    { name: 'mes', label: t('nomines.form.mes'), type: 'number', required: true },
    { name: 'anyNomina', label: t('nomines.form.any'), type: 'number', required: true },
    { name: 'salariBrut', label: t('nomines.form.salariBrut'), type: 'number' },
    { name: 'deduccions', label: t('nomines.form.deduccions'), type: 'number' },
  ];

  const handleChange = (name: string, value: string) => {
    setValues((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors: Record<string, string> = {};
    if (!values.personalId) newErrors.personalId = t('common.required');
    if (!values.mes || Number(values.mes) < 1 || Number(values.mes) > 12) {
      newErrors.mes = t('common.required');
    }
    if (!values.anyNomina) newErrors.anyNomina = t('common.required');
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    const payload = {
      personalId: Number(values.personalId),
      mes: Number(values.mes),
      anyNomina: Number(values.anyNomina),
      salariBrut: Number(values.salariBrut) || 0,
      deduccions: Number(values.deduccions) || 0,
    };

    try {
      const nomina = isEdit
        ? await nominesService.update(Number(id), payload)
        : await nominesService.create(payload);
      navigate(`/nomines/${nomina.id}`);
    } catch (err: unknown) {
      setErrors({ personalId: err instanceof ApiError ? err.message : t('nomines.error') });
    }
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <h1 className="mb-4 text-xl font-semibold text-slate-900 dark:text-slate-50">
        {isEdit ? t('nomines.form.editTitle') : t('nomines.form.newTitle')}
      </h1>
      <EntityForm
        fields={fields}
        values={values}
        errors={errors}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={() => navigate(isEdit ? `/nomines/${id}` : '/nomines')}
        submitLabel={t('common.save')}
        cancelLabel={t('common.cancel')}
      />
    </div>
  );
}

export default NominaForm;
