import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import EntityForm from '../../components/EntityForm';
import type { FormField } from '../../components/EntityForm';
import Spinner from '../../components/Spinner';
import { albaransService } from '../../services/albarans';
import { vehiclesService } from '../../services/vehicles';
import { ApiError } from '../../services/api';
import type { Vehicle } from '../../types/vehicle';

const EMPTY_VALUES = {
  vehicleId: '',
  data: '',
  notes: '',
};

function AlbaraForm() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [values, setValues] = useState<Record<string, string>>({
    ...EMPTY_VALUES,
    vehicleId: searchParams.get('vehicleId') ?? '',
  });
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    vehiclesService.list().then(setVehicles);
  }, []);

  useEffect(() => {
    if (!isEdit || !id) {
      setLoading(false);
      return;
    }
    albaransService.get(Number(id)).then((albara) => {
      setValues({
        vehicleId: String(albara.vehicleId),
        data: albara.data ? albara.data.slice(0, 10) : '',
        notes: albara.notes ?? '',
      });
      setLoading(false);
    });
  }, [id, isEdit]);

  const fields: FormField[] = [
    {
      name: 'vehicleId',
      label: t('albarans.form.vehicle'),
      type: 'select',
      required: true,
      placeholder: t('albarans.form.vehiclePlaceholder'),
      options: vehicles.map((vehicle) => ({
        value: String(vehicle.id),
        label: `${vehicle.marca} ${vehicle.model} — ${vehicle.matricula}`,
      })),
    },
    { name: 'data', label: t('albarans.detail.data'), type: 'date' },
    { name: 'notes', label: t('albarans.form.notes'), type: 'textarea' },
  ];

  const handleChange = (name: string, value: string) => {
    setValues((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!values.vehicleId) {
      setErrors({ vehicleId: t('common.required') });
      return;
    }
    setErrors({});

    const payload = {
      vehicleId: Number(values.vehicleId),
      data: values.data ? `${values.data}T00:00:00.000Z` : undefined,
      notes: values.notes || null,
    };

    try {
      const albara = isEdit
        ? await albaransService.update(Number(id), payload)
        : await albaransService.create(payload);
      navigate(`/albarans/${albara.id}`);
    } catch (err: unknown) {
      setErrors({ vehicleId: err instanceof ApiError ? err.message : t('albarans.error') });
    }
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <h1 className="mb-4 text-xl font-semibold text-slate-900 dark:text-slate-50">
        {isEdit ? t('albarans.form.editTitle') : t('albarans.form.newTitle')}
      </h1>
      <EntityForm
        fields={fields}
        values={values}
        errors={errors}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={() => navigate(isEdit ? `/albarans/${id}` : '/albarans')}
        submitLabel={t('common.save')}
        cancelLabel={t('common.cancel')}
      />
    </div>
  );
}

export default AlbaraForm;
