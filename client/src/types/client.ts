export interface Client {
  id: number;
  nom: string;
  nif: string | null;
  telefon: string | null;
  email: string | null;
  adreca: string | null;
  notes: string | null;
  creatEl: string;
  actualitzatEl: string;
}

export type ClientInput = Omit<Client, 'id' | 'creatEl' | 'actualitzatEl'>;
