import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Staff } from '../Model/staff';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  private apiUrl = 'http://localhost:8080/staff';

  constructor(private http: HttpClient) {}

  getAllStaff(): Observable<Staff[]> {
    return this.http.get<Staff[]>(this.apiUrl);
  }

   updateStaff(id: number, updatedData: Partial<Staff>): Observable<Staff> {
      return this.http.put<Staff>(`${this.apiUrl}/update/${id}`, updatedData);
    }
  
    deleteStaff(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
    }
}
