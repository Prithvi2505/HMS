import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent {
   tableType: string = '';
  dataSource: any[] = [];
  displayedColumns: string[] = [];
  columnHeaders: { [key: string]: string } = {};

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.url.subscribe(urlSegment => {
      this.tableType = urlSegment[0].path;
      this.configureTable();
    });
  }

  configureTable() {
    if (this.tableType === 'appointments') {
      this.dataSource = [
        { id: 1, patientId: 101, date: new Date(), time: '10:00 AM', doctorId: 201 }
      ];
      this.displayedColumns = ['id', 'patientId', 'date', 'time', 'doctorId', 'action', 'remove'];
      this.columnHeaders = {
        id: 'ID',
        patientId: 'Patient ID',
        date: 'Date',
        time: 'Time',
        doctorId: 'Doctor ID',
        action: 'Action',
        remove: 'Remove'
      };
    } else if (this.tableType === 'medical-records') {
      this.dataSource = [
        { id: 1, diagnosis: 'Flu', year_of_diagnosis: 2023, medicine_used: 'Paracetamol', patient_id: 101 }
      ];
      this.displayedColumns = ['id', 'diagnosis', 'year_of_diagnosis', 'medicine_used', 'patient_id', 'action', 'remove'];
      this.columnHeaders = {
        id: 'ID',
        diagnosis: 'Diagnosis',
        year_of_diagnosis: 'Year of Diagnosis',
        medicine_used: 'Medicine',
        patient_id: 'Patient ID',
        action: 'Action',
        remove: 'Remove'
      };
    }else if (this.tableType === 'rooms') {
    this.dataSource = [
      { id: 1, type: 'ICU', capacity: 2, price: 1500,staffId: 12 },
      { id: 2, type: 'General', capacity: 4, price: 800,staffId: 17 }
    ];
    this.displayedColumns = ['id', 'type', 'capacity', 'price','staffId' ,'action', 'remove'];
    this.columnHeaders = {
      id: 'ID',
      type: 'Type',
      capacity: 'Capacity',
      price: 'Price',
      staffId:'Staff ID',
      action: 'Action',
      remove: 'Remove'
    };
  }
  else if (this.tableType === 'bills') {
    this.dataSource = [
      { id: 1, amount: 2000, date: new Date(), billDetail: 'X-Ray and Consultation', patientId: 101 },
      { id: 2, amount: 5000, date: new Date(), billDetail: 'Surgery and Stay', patientId: 102 }
    ];
    this.displayedColumns = ['id', 'amount', 'date', 'billDetail', 'patientId', 'action', 'remove'];
    this.columnHeaders = {
      id: 'ID',
      amount: 'Amount',
      date: 'Date',
      billDetail: 'Bill Detail',
      patientId: 'Patient ID',
      action: 'Action',
      remove: 'Remove'
    };
  }
    // Add more table types as needed
  }
  onUpdate(row: any) {
    console.log(`Update ${this.tableType}:`, row);
  }

  onDelete(row: any) {
    console.log(`Delete ${this.tableType}:`, row);
  }
}
