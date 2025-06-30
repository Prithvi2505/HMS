import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../Model/patient';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private baseUrl = 'http://localhost:8080/patients';

  constructor(private http: HttpClient) {}

  getAllPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.baseUrl); // Interceptor adds token
  }
  updatePatient(
    id: number,
    updatedData: Partial<Patient>
  ): Observable<Patient> {
    return this.http.put<Patient>(`${this.baseUrl}/${id}`, updatedData);
  }
  getPatientById(id: number) {
    return this.http.get<Patient>(`${this.baseUrl}/${id}`);
  }

  deletePatient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  getPatientsByName(name: string): Observable<{ id: number; name: string }[]> {
    return this.http.get<{ id: number; name: string }[]>(
      `${this.baseUrl}/search`,
      {
        params: { name },
      }
    );
  }
}
