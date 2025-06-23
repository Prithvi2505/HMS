import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RoomResponse,RoomWithStaff } from '../Model/room';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private apiUrl = 'http://localhost:8080/rooms';

  constructor(private http: HttpClient) {}

  getAllRooms(): Observable<RoomResponse[]> {
    return this.http.get<RoomResponse[]>(`${this.apiUrl}`);
  }
  getRoomById(id: number): Observable<RoomResponse> {
    return this.http.get<RoomResponse>(`${this.apiUrl}/${id}`);
  }
  getRoomsByStaff(staffId: number): Observable<RoomWithStaff[]> {
    return this.http.get<RoomWithStaff[]>(`${this.apiUrl}/by-staff/${staffId}`);
  }
  unassignStaffFromRoom(staffId: number, roomId: number): Observable<any> {
  return this.http.put(`http://localhost:8080/staff/unassign-room/${staffId}/${roomId}`, {});
  }
  createRoom(data: { type: string; capacity: number; price: number }): Observable<RoomResponse> {
    return this.http.post<RoomResponse>(`${this.apiUrl}`, data);
  }
  updateRoom(id: number, data: { type: string; capacity: number; price: number }): Observable<RoomResponse> {
    return this.http.put<RoomResponse>(`${this.apiUrl}/${id}`, data);
  }
  deleteRoom(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

