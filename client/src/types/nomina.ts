export interface Nomina {
  id: number;
  personalId: number;
  mes: number;
  anyNomina: number;
  salariBrut: number;
  deduccions: number;
  salariNet: number;
  estatPagament: 'pendent' | 'pagada';
  creatEl: string;
  actualitzatEl: string;
}

export interface NominaInput {
  personalId: number;
  mes: number;
  anyNomina: number;
  salariBrut: number;
  deduccions: number;
}
