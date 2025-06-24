import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from '../Model/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private baseUrl = 'http://localhost:8080/appointments';

  constructor(private http: HttpClient) {}

  getAllAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.baseUrl}`);
  }

  getAppointmentsByDoctorId(id: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.baseUrl}/doctor/${id}`);
  }

  getAppointmentsByPatientId(id: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.baseUrl}/patient/${id}`);
  }

  createAppointment(appointment: any): Observable<Appointment> {
    return this.http.post<Appointment>(`${this.baseUrl}`, appointment);
  }
  getAppointmentCount(doctorId: number, date: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count?doctorId=${doctorId}&date=${date}`);
  }

  updateAppointment(id: number, appointment: any): Observable<Appointment> {
  return this.http.put<Appointment>(`${this.baseUrl}/${id}`, appointment);
}

  deleteAppointment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
