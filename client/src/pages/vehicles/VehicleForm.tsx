import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import EntityForm from '../../components/EntityForm';
import type { FormField } from '../../components/EntityForm';
import Spinner from '../../components/Spinner';
import { vehiclesService } from '../../services/vehicles';
import { clientsService } from '../../services/clients';
import { ApiError } from '../../services/api';
import type { Client } from '../../types/client';
import { useSubmitGuard } from '../../hooks/useSubmitGuard';

const EMPTY_VALUES = {
  clientId: '',
  marca: '',
  model: '',
  matricula: '',
  bastidor: '',
  anyMatriculacio: '',
  quilometratge: '',
  color: '',
};

function VehicleForm() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [values, setValues] = useState<Record<string, string>>({
    ...EMPTY_VALUES,
    clientId: searchParams.get('clientId') ?? '',
  });
  const [clients, setClients] = useState<Client[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    clientsService.list().then(setClients);
  }, []);

  useEffect(() => {
    if (!isEdit || !id) {
      setLoading(false);
      return;
    }
    vehiclesService.get(Number(id)).then((vehicle) => {
      setValues({
        clientId: String(vehicle.clientId),
        marca: vehicle.marca,
        model: vehicle.model,
        matricula: vehicle.matricula,
        bastidor: vehicle.bastidor ?? '',
        anyMatriculacio: vehicle.anyMatriculacio != null ? String(vehicle.anyMatriculacio) : '',
        quilometratge: vehicle.quilometratge != null ? String(vehicle.quilometratge) : '',
        color: vehicle.color ?? '',
      });
      setLoading(false);
    });
  }, [id, isEdit]);

  const fields: FormField[] = [
    {
      name: 'clientId',
      label: t('vehicles.form.client'),
      type: 'select',
      required: true,
      placeholder: t('vehicles.form.clientPlaceholder'),
      options: clients.map((client) => ({ value: String(client.id), label: client.nom })),
    },
    { name: 'marca', label: t('vehicles.form.marca'), required: true },
    { name: 'model', label: t('vehicles.form.model'), required: true },
    { name: 'matricula', label: t('vehicles.detail.matricula'), required: true },
    { name: 'bastidor', label: t('vehicles.detail.bastidor') },
    { name: 'anyMatriculacio', label: t('vehicles.detail.anyMatriculacio'), type: 'number' },
    { name: 'quilometratge', label: t('vehicles.detail.quilometratge'), type: 'number' },
    { name: 'color', label: t('vehicles.detail.color') },
  ];

  const handleChange = (name: string, value: string) => {
    setValues((current) => ({ ...current, [name]: value }));
  };

  const submitVehicle = async () => {
    const payload = {
      clientId: Number(values.clientId),
      marca: values.marca,
      model: values.model,
      matricula: values.matricula,
      bastidor: values.bastidor || null,
      anyMatriculacio: values.anyMatriculacio ? Number(values.anyMatriculacio) : null,
      quilometratge: values.quilometratge ? Number(values.quilometratge) : null,
      color: values.color || null,
    };

    try {
      const vehicle = isEdit
        ? await vehiclesService.update(Number(id), payload)
        : await vehiclesService.create(payload);
      navigate(`/vehicles/${vehicle.id}`);
    } catch (err: unknown) {
      if (err instanceof ApiError && err.status === 409) {
        setErrors({ matricula: err.message });
      } else {
        setErrors({ marca: err instanceof ApiError ? err.message : t('vehicles.error') });
      }
      throw err;
    }
  };

  const { submitting, guardedSubmit } = useSubmitGuard(submitVehicle);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors: Record<string, string> = {};
    if (!values.clientId) newErrors.clientId = t('common.required');
    if (!values.marca.trim()) newErrors.marca = t('common.required');
    if (!values.model.trim()) newErrors.model = t('common.required');
    if (!values.matricula.trim()) newErrors.matricula = t('common.required');
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    await guardedSubmit();
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <h1 className="mb-4 text-xl font-semibold text-slate-900 dark:text-slate-50">
        {isEdit ? t('vehicles.form.editTitle') : t('vehicles.form.newTitle')}
      </h1>
      <EntityForm
        fields={fields}
        values={values}
        errors={errors}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={() => navigate(isEdit ? `/vehicles/${id}` : '/vehicles')}
        submitLabel={t('common.save')}
        cancelLabel={t('common.cancel')}
        submitting={submitting}
        submittingLabel={t('common.saving')}
      />
    </div>
  );
}

export default VehicleForm;
