import type { Albara } from './albara';

export interface Factura {
  id: number;
  numero: string;
  clientId: number;
  ivaPercentatge: number;
  estatPagament: 'pendent' | 'pagada';
  albarans: Albara[];
  base: number;
  ivaImport: number;
  total: number;
  creatEl: string;
  actualitzatEl: string;
}

export interface FacturaInput {
  albaraIds: number[];
  ivaPercentatge?: number;
}
