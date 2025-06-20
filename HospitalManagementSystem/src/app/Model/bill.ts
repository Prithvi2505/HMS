export interface Bill {
  id?: number;
  patientId: number;
  amount: number;
  status:string;
  date: string; 
  billDetail: string;
}