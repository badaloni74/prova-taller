export interface Vehicle {
  id: number;
  clientId: number;
  marca: string;
  model: string;
  matricula: string;
  bastidor: string | null;
  anyMatriculacio: number | null;
  quilometratge: number | null;
  color: string | null;
  creatEl: string;
  actualitzatEl: string;
}

export type VehicleInput = Omit<Vehicle, 'id' | 'creatEl' | 'actualitzatEl'>;
