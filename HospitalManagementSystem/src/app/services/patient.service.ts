import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../Model/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private baseUrl = 'http://localhost:8080/patients';

  constructor(private http: HttpClient) {}

  getAllPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.baseUrl); // Interceptor adds token
  }
   updatePatient(id: number, updatedData: Partial<Patient>): Observable<Patient> {
    return this.http.put<Patient>(`${this.baseUrl}/update/${id}`, updatedData);
  }

  deletePatient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
