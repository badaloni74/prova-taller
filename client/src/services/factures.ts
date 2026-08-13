import { api } from './api';
import type { Factura, FacturaInput } from '../types/factura';

export const facturesService = {
  list: () => api.get<Factura[]>('/factures'),
  listByClient: (clientId: number) => api.get<Factura[]>(`/factures?client_id=${clientId}`),
  get: (id: number) => api.get<Factura>(`/factures/${id}`),
  create: (data: FacturaInput) => api.post<Factura>('/factures', data),
  updatePaymentStatus: (id: number, estatPagament: 'pendent' | 'pagada') =>
    api.patch<Factura>(`/factures/${id}`, { estatPagament }),
};
