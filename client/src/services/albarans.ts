import { api } from './api';
import type { Albara, AlbaraInput, AlbaraLiniaInput } from '../types/albara';

export const albaransService = {
  list: () => api.get<Albara[]>('/albarans'),
  listByVehicle: (vehicleId: number) => api.get<Albara[]>(`/albarans?vehicle_id=${vehicleId}`),
  get: (id: number) => api.get<Albara>(`/albarans/${id}`),
  create: (data: AlbaraInput) => api.post<Albara>('/albarans', data),
  update: (id: number, data: AlbaraInput) => api.put<Albara>(`/albarans/${id}`, data),
  remove: (id: number) => api.delete<void>(`/albarans/${id}`),
  addLinia: (albaraId: number, linia: AlbaraLiniaInput) =>
    api.post<Albara>(`/albarans/${albaraId}/linies`, linia),
  removeLinia: (albaraId: number, lineaId: number) =>
    api.delete<Albara>(`/albarans/${albaraId}/linies/${lineaId}`),
};
