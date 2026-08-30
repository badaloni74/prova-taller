import type { FormEvent } from 'react';

export interface FormFieldOption {
  value: string;
  label: string;
}

export interface FormField {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'tel' | 'textarea' | 'number' | 'select' | 'date';
  required?: boolean;
  options?: FormFieldOption[];
  placeholder?: string;
  min?: number;
}

interface EntityFormProps {
  fields: FormField[];
  values: Record<string, string>;
  errors?: Record<string, string>;
  onChange: (name: string, value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  submitLabel: string;
  cancelLabel: string;
  submitting?: boolean;
  submittingLabel?: string;
}

function EntityForm({
  fields,
  values,
  errors = {},
  onChange,
  onSubmit,
  onCancel,
  submitLabel,
  cancelLabel,
  submitting = false,
  submittingLabel,
}: EntityFormProps) {
  return (
    <form onSubmit={onSubmit} className="flex max-w-lg flex-col gap-4" noValidate>
      {fields.map((field) => (
        <div key={field.name}>
          <label
            htmlFor={field.name}
            className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            {field.label}
            {field.required && <span className="text-red-500"> *</span>}
          </label>

          {field.type === 'textarea' ? (
            <textarea
              id={field.name}
              value={values[field.name] ?? ''}
              onChange={(event) => onChange(field.name, event.target.value)}
              rows={3}
              className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          ) : field.type === 'select' ? (
            <select
              id={field.name}
              value={values[field.name] ?? ''}
              onChange={(event) => onChange(field.name, event.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
              <option value="">{field.placeholder ?? ''}</option>
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              id={field.name}
              type={field.type ?? 'text'}
              min={field.min}
              value={values[field.name] ?? ''}
              onChange={(event) => onChange(field.name, event.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          )}

          {errors[field.name] && (
            <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors[field.name]}</p>
          )}
        </div>
      ))}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 disabled:opacity-50"
        >
          {submitting ? (submittingLabel ?? submitLabel) : submitLabel}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          {cancelLabel}
        </button>
      </div>
    </form>
  );
}

export default EntityForm;
