import { api } from './api';
import type { Client, ClientInput } from '../types/client';

export const clientsService = {
  list: () => api.get<Client[]>('/clients'),
  get: (id: number) => api.get<Client>(`/clients/${id}`),
  create: (data: ClientInput) => api.post<Client>('/clients', data),
  update: (id: number, data: ClientInput) => api.put<Client>(`/clients/${id}`, data),
  remove: (id: number) => api.delete<void>(`/clients/${id}`),
};
