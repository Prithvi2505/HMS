export interface Bill {
  id?: number;
  patientId: number;
  amount: number;
  date: string; // 'yyyy-MM-dd'
  billDetail: string;
}