import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-material-table',
  templateUrl: './material-table.component.html',
  styleUrls: ['./material-table.component.css']
})
export class MaterialTableComponent {
  @Input() dataSource: any[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() columnHeaders: { [key: string]: string } = {};
  @Input() user: { userid: string; role: string } = { userid: '', role: '' };
  @Input() moduleType: string = '';


  @Output() update = new EventEmitter<any>();
  @Output() remove = new EventEmitter<any>();

  canEdit(element: any): boolean {
  const role = this.user.role?.toLowerCase();
  const userId = this.user.userid;
  switch (this.moduleType) {
    case 'appointment':
      return (role == 'patient' && element.patientId?.toString() == userId) ||
             (role == 'doctor' && element.doctorId?.toString() == userId);

    case 'bill':
      return role == 'doctor'; // Any doctor can edit

    case 'medicalRecord':
      return role == 'doctor' || (role == 'patient' && element.patientId?.toString() == userId);

    case 'assignedRoom':
      return role == 'doctor'; // Only doctors can update/delete

    default:
      return false;
  }
}
}
