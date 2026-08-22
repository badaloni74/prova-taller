import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import EntityForm from '../../components/EntityForm';
import type { FormField } from '../../components/EntityForm';
import Spinner from '../../components/Spinner';
import { clientsService } from '../../services/clients';
import { ApiError } from '../../services/api';
import { useSubmitGuard } from '../../hooks/useSubmitGuard';

const EMPTY_VALUES = {
  nom: '',
  nif: '',
  telefon: '',
  email: '',
  adreca: '',
  notes: '',
};

function ClientForm() {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [values, setValues] = useState<Record<string, string>>(EMPTY_VALUES);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    if (!isEdit || !id) return;
    clientsService.get(Number(id)).then((client) => {
      setValues({
        nom: client.nom,
        nif: client.nif ?? '',
        telefon: client.telefon ?? '',
        email: client.email ?? '',
        adreca: client.adreca ?? '',
        notes: client.notes ?? '',
      });
      setLoading(false);
    });
  }, [id, isEdit]);

  const fields: FormField[] = [
    { name: 'nom', label: t('clients.form.nom'), required: true },
    { name: 'nif', label: t('clients.detail.nif') },
    { name: 'telefon', label: t('clients.detail.telefon'), type: 'tel' },
    { name: 'email', label: t('clients.detail.email'), type: 'email' },
    { name: 'adreca', label: t('clients.detail.adreca') },
    { name: 'notes', label: t('clients.detail.notes'), type: 'textarea' },
  ];

  const handleChange = (name: string, value: string) => {
    setValues((current) => ({ ...current, [name]: value }));
  };

  const submitClient = async () => {
    const payload = {
      nom: values.nom,
      nif: values.nif || null,
      telefon: values.telefon || null,
      email: values.email || null,
      adreca: values.adreca || null,
      notes: values.notes || null,
    };

    try {
      const client = isEdit
        ? await clientsService.update(Number(id), payload)
        : await clientsService.create(payload);
      navigate(`/clients/${client.id}`);
    } catch (err: unknown) {
      setErrors({ nom: err instanceof ApiError ? err.message : t('clients.error') });
      throw err;
    }
  };

  const { submitting, guardedSubmit } = useSubmitGuard(submitClient);

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
        {isEdit ? t('clients.form.editTitle') : t('clients.form.newTitle')}
      </h1>
      <EntityForm
        fields={fields}
        values={values}
        errors={errors}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={() => navigate(isEdit ? `/clients/${id}` : '/clients')}
        submitLabel={t('common.save')}
        cancelLabel={t('common.cancel')}
        submitting={submitting}
        submittingLabel={t('common.saving')}
      />
    </div>
  );
}

export default ClientForm;
