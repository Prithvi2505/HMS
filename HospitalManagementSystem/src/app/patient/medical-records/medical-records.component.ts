import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { AddMedicalRecordComponent } from 'src/app/dialogs/add-medical-record/add-medical-record.component';
import { MedicalRecordService } from 'src/app/services/medical-record.service';

@Component({
  selector: 'app-medical-records',
  templateUrl: './medical-records.component.html',
  styleUrls: ['./medical-records.component.css']
})
export class MedicalRecordsComponent {
  showAddButton: boolean = false;
  patientId:number = 0;
  dataSource: any[] = [];
    displayedColumns: string[] = [];
    columnHeaders: { [key: string]: string } = {};
    user = { userid: '', role: '' };
  
    constructor(private dialog:MatDialog, private route:ActivatedRoute, private medicalRecordService: MedicalRecordService){}
  
    ngOnInit(){
      const urlId = this.route.snapshot.paramMap.get('id');
      
      const userStr = localStorage.getItem('auth');
      if (userStr) {
        this.user = JSON.parse(userStr);
      }
      const { userid, role } = this.user;
      const all:any = localStorage.getItem('medicalRecords')

      this.dataSource = all ? JSON.parse(all) : [];
    const baseColumns = ['id', 'diagnosis', 'yearOfDiagnosis', 'medicineUsed', 'patientId'];
    const actionColumns = ['action', 'remove'];

    this.displayedColumns = baseColumns;
    if ((this.user.role === 'patient' && urlId == this.user.userid) ||
        this.user.role === 'doctor') {
      this.displayedColumns = [...baseColumns, ...actionColumns];
              }     
     this.columnHeaders = {
        id: 'ID', diagnosis: 'Diagnosis', yearOfDiagnosis: 'Year',
        medicineUsed: 'Medicine Used', patientId: 'Patient ID',
        action: 'Action', remove: 'Remove'
      };
      
    this.showAddButton = (
    (this.user.role === 'patient' && urlId == this.user.userid) ||
    this.user.role === 'doctor'
  );
  this.route.paramMap.subscribe(params => {
    const id = params.get('id');
    this.patientId = id ? Number(id) : 0;
    this.loadPatientRecords(this.patientId);
  });
    }
    
    addMedicalRecord() {
    const dialogRef = this.dialog.open(AddMedicalRecordComponent, {
      width: '500px',
      data: { patientId: this.patientId }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
      this.route.paramMap.subscribe(params => {
    const id = params.get('id');
    this.patientId = id ? Number(id) : 0;
    this.loadPatientRecords(this.patientId);
  });
  }});
  }
   
    onUpdate(item: any) { console.log('Update', item); }
    onDelete(item: any) { console.log('Delete', item); }

    loadPatientRecords(patientId: number) {
    this.medicalRecordService.getRecordsByPatientId(patientId).subscribe({
      next: (medicalRecords) => this.dataSource = medicalRecords,
      error: (err) => console.error('Failed to fetch patient Medical Record:', err)
    });
  }
  }
