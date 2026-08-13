export interface AlbaraLinia {
  id: number;
  albaraId: number;
  tipus: 'peca' | 'ma_obra';
  pecaId: number | null;
  descripcio: string | null;
  quantitat: number;
  preu: number;
}

export interface Albara {
  id: number;
  numero: string;
  vehicleId: number;
  facturaId: number | null;
  estat: 'pendent' | 'facturat';
  data: string;
  notes: string | null;
  linies: AlbaraLinia[];
  creatEl: string;
  actualitzatEl: string;
}

export interface AlbaraInput {
  vehicleId: number;
  data?: string;
  notes?: string | null;
}

export interface AlbaraLiniaInput {
  tipus: 'peca' | 'ma_obra';
  pecaId?: number;
  descripcio?: string | null;
  quantitat: number;
  preu?: number;
}
