import { api } from './api';
import type { Nomina, NominaInput } from '../types/nomina';

export const nominesService = {
  list: () => api.get<Nomina[]>('/nomines'),
  listByPersonal: (personalId: number) => api.get<Nomina[]>(`/nomines?personal_id=${personalId}`),
  get: (id: number) => api.get<Nomina>(`/nomines/${id}`),
  create: (data: NominaInput) => api.post<Nomina>('/nomines', data),
  update: (id: number, data: NominaInput) => api.put<Nomina>(`/nomines/${id}`, data),
  updatePaymentStatus: (id: number, estatPagament: 'pendent' | 'pagada') =>
    api.patch<Nomina>(`/nomines/${id}`, { estatPagament }),
  remove: (id: number) => api.delete<void>(`/nomines/${id}`),
};
