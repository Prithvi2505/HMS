import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  registerPatient(patient: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/patients/create`, patient);
  }

  registerDoctor(doctor: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/doctors/create`, doctor);
  }

  registerStaff(staff: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/staff/create`, staff);
  }
}
