export interface Bill {
  id?: number;
  patientId: number;
  amount: number;
  status:string;
  date: string; // 'yyyy-MM-dd'
  billDetail: string;
}