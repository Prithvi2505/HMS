import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddAppointmentComponent } from 'src/app/dialogs/add-appointment/add-appointment.component';
import { AddBillComponent } from 'src/app/dialogs/add-bill/add-bill.component';
import { AssignStaffRoomComponent } from 'src/app/dialogs/assign-staff-room/assign-staff-room.component';
import { AddMedicalRecordComponent } from 'src/app/dialogs/add-medical-record/add-medical-record.component';



@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html'
})
export class DataTableComponent implements OnInit {
  dataSource: any[] = [];
  displayedColumns: string[] = [];
  columnHeaders: { [key: string]: string } = {};
  tableType = '';
  patientIdParam: number | null = null;

  user = { userid: '', role: '' };

  constructor(private route: ActivatedRoute,private dialog: MatDialog) {}

  ngOnInit(): void {
    const userStr = localStorage.getItem('auth');
    if (userStr) {
      this.user = JSON.parse(userStr);
    }
    this.route.url.subscribe(urlSegment => {
      this.tableType = urlSegment[0].path;

      this.route.params.subscribe(params => {
        this.patientIdParam = params['patientId'] ? Number(params['patientId']) : null;
        this.configureTable();
      });
    });
  }

  configureTable() {
    const { userid, role } = this.user;

    if (this.tableType === 'appointments') {
      const all = [
        { id: 1, patientId: 101, patientEmail: 'pat1@mail.com', doctorId: 201, doctorEmail: 'doc1@mail.com', date: new Date(), time: new Date() },
        { id: 2, patientId: 102, patientEmail: 'pat2@mail.com', doctorId: 201, doctorEmail: 'doc1@mail.com', date: new Date(), time: new Date() },
        { id: 3, patientId: 101, patientEmail: 'pat1@mail.com', doctorId: 202, doctorEmail: 'doc2@mail.com', date: new Date(), time: new Date() }
      ];

      this.dataSource = role === 'doctor'
        ? all.filter(a => a.doctorEmail === userid)
        : role === 'patient'
          ? all.filter(a => a.patientEmail === userid)
          : all;

      this.displayedColumns = ['id', 'patientId', 'doctorId', 'date', 'time', 'action', 'remove'];
      this.columnHeaders = {
        id: 'ID', patientId: 'Patient ID', doctorId: 'Doctor ID',
        date: 'Date', time: 'Time', action: 'Action', remove: 'Remove'
      };
    }

    if (this.tableType === 'bills') {
      const all = [
        { id: 1, amount: 2000, date: new Date(), billDetail: 'X-Ray', patientId: 101, patientEmail: 'pat1@mail.com' },
        { id: 2, amount: 3000, date: new Date(), billDetail: 'Consultation', patientId: 102, patientEmail: 'pat2@mail.com' }
      ];

      this.dataSource = this.patientIdParam
        ? all.filter(b => b.patientId === this.patientIdParam)
        : role === 'patient'
          ? all.filter(b => b.patientEmail === userid)
          : all;

      this.displayedColumns = ['id', 'amount', 'date', 'billDetail', 'patientId', 'action', 'remove'];
      this.columnHeaders = {
        id: 'ID', amount: 'Amount', date: 'Date',
        billDetail: 'Bill Detail', patientId: 'Patient ID',
        action: 'Action', remove: 'Remove'
      };
    }

    if (this.tableType === 'rooms') {
      const all = [
        { id: 1, type: 'ICU', capacity: 2, price: 2000, assignedStaffEmail: 'staff1@mail.com' },
        { id: 2, type: 'General', capacity: 4, price: 800, assignedStaffEmail: 'staff2@mail.com' },
        { id: 3, type: 'Private', capacity: 1, price: 5000, assignedStaffEmail: 'staff1@mail.com' }
      ];

      this.dataSource = role === 'staff'
        ? all.filter(r => r.assignedStaffEmail === userid)
        : all;

      this.displayedColumns = ['id', 'type', 'capacity', 'price', 'assignedStaffEmail', 'action', 'remove'];
      this.columnHeaders = {
        id: 'ID', type: 'Type', capacity: 'Capacity', price: 'Price',
        assignedStaffEmail: 'Assigned Staff', action: 'Action', remove: 'Remove'
      };
    }

    if (this.tableType === 'medical-records') {
      const all = [
        { id: 1, diagnosis: 'Flu', year_of_diagnosis: 2023, medicine_used: 'Paracetamol', patient_id: 101, patientEmail: 'pat1@mail.com' },
        { id: 2, diagnosis: 'Cold', year_of_diagnosis: 2024, medicine_used: 'Antibiotic', patient_id: 102, patientEmail: 'pat2@mail.com' }
      ];

      this.dataSource = this.patientIdParam
        ? all.filter(r => r.patient_id === this.patientIdParam)
        : role === 'patient'
          ? all.filter(r => r.patientEmail === userid)
          : all;

      this.displayedColumns = ['id', 'diagnosis', 'year_of_diagnosis', 'medicine_used', 'patient_id', 'action', 'remove'];
      this.columnHeaders = {
        id: 'ID', diagnosis: 'Diagnosis', year_of_diagnosis: 'Year',
        medicine_used: 'Medicine Used', patient_id: 'Patient ID',
        action: 'Action', remove: 'Remove'
      };
    }
  }

  addAppointment() {
    const dialogRef = this.dialog.open(AddAppointmentComponent, {
      width: '500px',
    });
     dialogRef.afterClosed().subscribe(result => {
        console.log('Dialog closed');
      });
  }
  
  addBill() {
    const dialogRef = this.dialog.open(AddBillComponent, {
      width: '500px',
    });
     dialogRef.afterClosed().subscribe(result => {
        console.log('Dialog closed');
      });
  }
  
  assignStaffToRoom() {
   const dialogRef = this.dialog.open(AssignStaffRoomComponent, {
      width: '500px',
    });
     dialogRef.afterClosed().subscribe(result => {
        console.log('Dialog closed');
      });
  }
  
  addMedicalRecord() {
    const dialogRef = this.dialog.open(AddMedicalRecordComponent, {
      width: '500px',
    });
     dialogRef.afterClosed().subscribe(result => {
        console.log('Dialog closed');
      });
  }
  

  onUpdate(item: any) { console.log('Update', item); }
  onDelete(item: any) { console.log('Delete', item); }
}
