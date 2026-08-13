export interface Peca {
  id: number;
  nom: string;
  referencia: string | null;
  preu: number;
  cost: number | null;
  unitat: string;
  proveidor: string | null;
  estoc: number;
  creatEl: string;
  actualitzatEl: string;
}

export type PecaInput = Omit<Peca, 'id' | 'creatEl' | 'actualitzatEl'>;
