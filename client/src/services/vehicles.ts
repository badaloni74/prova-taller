import { api } from './api';
import type { Vehicle, VehicleInput } from '../types/vehicle';

export const vehiclesService = {
  list: () => api.get<Vehicle[]>('/vehicles'),
  listByClient: (clientId: number) => api.get<Vehicle[]>(`/vehicles?client_id=${clientId}`),
  get: (id: number) => api.get<Vehicle>(`/vehicles/${id}`),
  create: (data: VehicleInput) => api.post<Vehicle>('/vehicles', data),
  update: (id: number, data: VehicleInput) => api.put<Vehicle>(`/vehicles/${id}`, data),
  remove: (id: number) => api.delete<void>(`/vehicles/${id}`),
};
