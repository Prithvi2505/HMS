import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bill } from '../Model/bill';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  private baseUrl = 'http://localhost:8080/bills';

  constructor(private http: HttpClient) {}

  getAllBills(): Observable<Bill[]> {
    return this.http.get<Bill[]>(this.baseUrl);
  }

  getBillsByPatientId(patientId: number): Observable<Bill[]> {
    return this.http.get<Bill[]>(`${this.baseUrl}/patient/${patientId}`);
  }

  createBill(bill: Bill): Observable<Bill> {
    return this.http.post<Bill>(`${this.baseUrl}/create`, bill);
  }

  updateBill(id: number, bill: Bill): Observable<Bill> {
  return this.http.put<Bill>(`${this.baseUrl}/${id}`, bill);
  }

  deleteBill(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
