import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { AddMedicalRecordComponent } from 'src/app/dialogs/add-medical-record/add-medical-record.component';

@Component({
  selector: 'app-medical-records',
  templateUrl: './medical-records.component.html',
  styleUrls: ['./medical-records.component.css']
})
export class MedicalRecordsComponent {
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
      const all:any = localStorage.getItem('medicalRecords')

      this.dataSource = all ? JSON.parse(all) : [];
      this.displayedColumns = ['id', 'diagnosis', 'yearOfDiagnosis', 'medicineUsed', 'patientId', 'action', 'remove'];
      this.columnHeaders = {
        id: 'ID', diagnosis: 'Diagnosis', yearOfDiagnosis: 'Year',
        medicineUsed: 'Medicine Used', patientId: 'Patient ID',
        action: 'Action', remove: 'Remove'
      };
    }
    
    addMedicalRecord() {
    const dialogRef = this.dialog.open(AddMedicalRecordComponent, {
      width: '500px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed');
      const all = localStorage.getItem('medicalRecords');
      this.dataSource = all ? JSON.parse(all) : [];
    });
  }
    onUpdate(item: any) { console.log('Update', item); }
    onDelete(item: any) { console.log('Delete', item); }
  }
