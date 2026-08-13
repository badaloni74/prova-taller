export interface Personal {
  id: number;
  nom: string;
  telefon: string | null;
  email: string | null;
  dni: string | null;
  carrec: string | null;
  dataAlta: string | null;
  salariBase: number | null;
  creatEl: string;
  actualitzatEl: string;
}

export type PersonalInput = Omit<Personal, 'id' | 'creatEl' | 'actualitzatEl'>;
