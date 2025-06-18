import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AddAppointmentComponent } from 'src/app/dialogs/add-appointment/add-appointment.component';
import { Appointment } from 'src/app/Model/appointment';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-appointment-table',
  templateUrl: './appointment-table.component.html',
  styleUrls: ['./appointment-table.component.css']
})
export class AppointmentTableComponent implements OnInit {
  appointments: Appointment[] = [];
  dataSource: any[] = [];
  displayedColumns: string[] = [];
  columnHeaders: { [key: string]: string } = {};
  user = { userid: '', role: '' };

  constructor(private dialog:MatDialog, private route:ActivatedRoute,private appointmentService: AppointmentService){}

  ngOnInit(){
    const urlId = this.route.snapshot.paramMap.get('id');
    const userStr = localStorage.getItem('auth');
    if (userStr) {
      this.user = JSON.parse(userStr);
    }
    const { userid, role } = this.user;
    
      const baseColumns = ['id', 'patientId', 'doctorId', 'date', 'time',];
    const actionColumns = ['action', 'remove'];

    this.displayedColumns = baseColumns;
    if ((this.user.role === 'patient') ||
        (this.user.role === 'doctor' && urlId == this.user.userid)) {
      this.displayedColumns = [...baseColumns, ...actionColumns];
    }
      this.columnHeaders = {
        id: 'ID', patientId: 'Patient ID', doctorId: 'Doctor ID',
        date: 'Date', time: 'Time', action: 'Action', remove: 'Remove'
      };
    
    this.route.paramMap.subscribe(params => {
      const doctorId = params.get('id');
      if (this.user.role === 'doctor' && doctorId) {
        this.loadDoctorAppointments(+doctorId);
      } else {
        this.loadAllAppointments();
      }
    });
   
  }
  
  addAppointment() {
  const dialogRef = this.dialog.open(AddAppointmentComponent, {
    width: '500px',
  });

  dialogRef.afterClosed().subscribe(result => {
  if (result === true) {
     this.route.paramMap.subscribe(params => {
      const doctorId = params.get('id');
      if (this.user.role === 'doctor' && doctorId) {
        this.loadDoctorAppointments(+doctorId);
      } else {
        this.loadAllAppointments();
      }
    });
  }
  });
}

  loadAllAppointments() {
    this.appointmentService.getAllAppointments().subscribe(data => {
    this.appointments = data.map(app => ({
      ...app,
      time: new Date(`1970-01-01T${app.time}`) // Convert string to Date
    }));
    this.dataSource = this.appointments;
  });
  }

  loadDoctorAppointments(id: number) {
    this.appointmentService.getAppointmentsByDoctorId(id).subscribe(data => {
    this.appointments = data.map(app => ({
      ...app,
      time: new Date(`1970-01-01T${app.time}`) // Convert string to Date
    }));
    this.dataSource = this.appointments;
  });
  }

  loadPatientAppointments(id: number) {
    this.appointmentService.getAppointmentsByPatientId(id).subscribe(data => {
    this.appointments = data.map(app => ({
      ...app,
      time: new Date(`1970-01-01T${app.time}`) // Convert string to Date
    }));
    this.dataSource = this.appointments;
  });
  }

  onUpdate(item: any) { console.log('Update', item); }
  onDelete(item: any) { console.log('Delete', item); }
  
}
