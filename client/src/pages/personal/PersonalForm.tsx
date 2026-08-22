import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import EntityForm from '../../components/EntityForm';
import type { FormField } from '../../components/EntityForm';
import Spinner from '../../components/Spinner';
import { personalService } from '../../services/personal';
import { ApiError } from '../../services/api';
import { useSubmitGuard } from '../../hooks/useSubmitGuard';

const EMPTY_VALUES = {
  nom: '',
  telefon: '',
  email: '',
  dni: '',
  carrec: '',
  dataAlta: '',
  salariBase: '',
};

function PersonalForm() {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [values, setValues] = useState<Record<string, string>>(EMPTY_VALUES);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    if (!isEdit || !id) return;
    personalService.get(Number(id)).then((persona) => {
      setValues({
        nom: persona.nom,
        telefon: persona.telefon ?? '',
        email: persona.email ?? '',
        dni: persona.dni ?? '',
        carrec: persona.carrec ?? '',
        dataAlta: persona.dataAlta ?? '',
        salariBase: persona.salariBase != null ? String(persona.salariBase) : '',
      });
      setLoading(false);
    });
  }, [id, isEdit]);

  const fields: FormField[] = [
    { name: 'nom', label: t('personal.form.nom'), required: true },
    { name: 'telefon', label: t('personal.detail.telefon'), type: 'tel' },
    { name: 'email', label: t('personal.detail.email'), type: 'email' },
    { name: 'dni', label: t('personal.detail.dni') },
    { name: 'carrec', label: t('personal.detail.carrec') },
    { name: 'dataAlta', label: t('personal.detail.dataAlta'), type: 'date' },
    { name: 'salariBase', label: t('personal.detail.salariBase'), type: 'number' },
  ];

  const handleChange = (name: string, value: string) => {
    setValues((current) => ({ ...current, [name]: value }));
  };

  const submitPersonal = async () => {
    const payload = {
      nom: values.nom,
      telefon: values.telefon || null,
      email: values.email || null,
      dni: values.dni || null,
      carrec: values.carrec || null,
      dataAlta: values.dataAlta || null,
      salariBase: values.salariBase ? Number(values.salariBase) : null,
    };

    try {
      const persona = isEdit
        ? await personalService.update(Number(id), payload)
        : await personalService.create(payload);
      navigate(`/personal/${persona.id}`);
    } catch (err: unknown) {
      setErrors({ nom: err instanceof ApiError ? err.message : t('personal.error') });
      throw err;
    }
  };

  const { submitting, guardedSubmit } = useSubmitGuard(submitPersonal);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!values.nom.trim()) {
      setErrors({ nom: t('common.required') });
      return;
    }
    setErrors({});

    await guardedSubmit();
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <h1 className="mb-4 text-xl font-semibold text-slate-900 dark:text-slate-50">
        {isEdit ? t('personal.form.editTitle') : t('personal.form.newTitle')}
      </h1>
      <EntityForm
        fields={fields}
        values={values}
        errors={errors}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={() => navigate(isEdit ? `/personal/${id}` : '/personal')}
        submitLabel={t('common.save')}
        cancelLabel={t('common.cancel')}
        submitting={submitting}
        submittingLabel={t('common.saving')}
      />
    </div>
  );
}

export default PersonalForm;
