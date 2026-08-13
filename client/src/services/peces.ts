import { api } from './api';
import type { Peca, PecaInput } from '../types/peca';

export const pecesService = {
  list: () => api.get<Peca[]>('/peces'),
  get: (id: number) => api.get<Peca>(`/peces/${id}`),
  create: (data: PecaInput) => api.post<Peca>('/peces', data),
  update: (id: number, data: PecaInput) => api.put<Peca>(`/peces/${id}`, data),
  remove: (id: number) => api.delete<void>(`/peces/${id}`),
};
