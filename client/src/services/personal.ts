import { api } from './api';
import type { Personal, PersonalInput } from '../types/personal';

export const personalService = {
  list: () => api.get<Personal[]>('/personal'),
  get: (id: number) => api.get<Personal>(`/personal/${id}`),
  create: (data: PersonalInput) => api.post<Personal>('/personal', data),
  update: (id: number, data: PersonalInput) => api.put<Personal>(`/personal/${id}`, data),
  remove: (id: number) => api.delete<void>(`/personal/${id}`),
};
