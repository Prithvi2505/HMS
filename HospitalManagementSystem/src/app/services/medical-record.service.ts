import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:8080/medical-records';

@Injectable({
  providedIn: 'root'
})
export class MedicalRecordService {
  constructor(private http: HttpClient) { }

  createRecord(record: any): Observable<any> {
    return this.http.post(`${BASE_URL}/create`, record);
  }

  getAllRecords(): Observable<any[]> {
    return this.http.get<any[]>(BASE_URL);
  }

  getRecordById(id: number): Observable<any> {
    return this.http.get(`${BASE_URL}/${id}`);
  }

  getRecordsByPatientId(patientId: number): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_URL}/patient/${patientId}`);
  }

  updateRecord(id: number, record: any): Observable<any> {
    return this.http.put<any>(`${BASE_URL}/${id}`, record);
  }

  deleteRecord(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/delete/${id}`);
  }
}
