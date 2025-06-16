import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddAppointmentComponent } from 'src/app/dialogs/add-appointment/add-appointment.component';

@Component({
  selector: 'app-appointment-table',
  templateUrl: './appointment-table.component.html',
  styleUrls: ['./appointment-table.component.css']
})
export class AppointmentTableComponent implements OnInit {
  dataSource: any[] = [];
  displayedColumns: string[] = [];
  columnHeaders: { [key: string]: string } = {};
  user = { userid: '', role: '' };

  constructor(private dialog:MatDialog){}

  ngOnInit(){
    const userStr = localStorage.getItem('auth');
    if (userStr) {
      this.user = JSON.parse(userStr);
    }
    const { userid, role } = this.user;
    const all:any = localStorage.getItem('appointments')

      this.dataSource = all ? JSON.parse(all) : [];
      this.displayedColumns = ['id', 'patientId', 'doctorId', 'date', 'time', 'action', 'remove'];
      this.columnHeaders = {
        id: 'ID', patientId: 'Patient ID', doctorId: 'Doctor ID',
        date: 'Date', time: 'Time', action: 'Action', remove: 'Remove'
      };
  }
  
  addAppointment() {
  const dialogRef = this.dialog.open(AddAppointmentComponent, {
    width: '500px',
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('Dialog closed');
    const all = localStorage.getItem('appointments');
    this.dataSource = all ? JSON.parse(all) : [];
  });
}
  onUpdate(item: any) { console.log('Update', item); }
  onDelete(item: any) { console.log('Delete', item); }
  
}
