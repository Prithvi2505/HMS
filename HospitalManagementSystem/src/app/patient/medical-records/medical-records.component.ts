import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { AddMedicalRecordComponent } from 'src/app/dialogs/add-medical-record/add-medical-record.component';
import { EditMedicalRecordComponent } from 'src/app/dialogs/edit-medical-record/edit-medical-record.component';
import { MedicalRecordService } from 'src/app/services/medical-record.service';
import { TokenService } from 'src/app/services/token.service';
import { Store } from '@ngrx/store';
import { showSuccess, showError } from 'src/app/Store/snackbar/snackbar.actions';


@Component({
  selector: 'app-medical-records',
  templateUrl: './medical-records.component.html',
  styleUrls: ['./medical-records.component.css']
})
export class MedicalRecordsComponent implements OnInit {
  showAddButton: boolean = false;
  patientId: number = 0;
  dataSource: any[] = [];
  displayedColumns: string[] = [];
  columnHeaders: { [key: string]: string } = {};
  user = { userid: 0, role: '' };

  constructor(private dialog: MatDialog, private route: ActivatedRoute, private medicalRecordService: MedicalRecordService,
    private tokenService:TokenService,
    private store:Store
  ) { }

  ngOnInit() {
    const urlId = Number(this.route.snapshot.paramMap.get('id'));
    this.user.role = this.tokenService.getUserRole()!;
    this.user.userid = this.tokenService.getUserId()!;
    const { userid, role } = this.user;
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
      }
    });
  }

  onUpdate(item: any) {
    const dialogRef = this.dialog.open(EditMedicalRecordComponent, {
      width: '400px',
      data: item  // pass the room data to be edited
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.route.paramMap.subscribe(params => {
          const id = params.get('id');
          this.patientId = id ? Number(id) : 0;
          this.loadPatientRecords(this.patientId);
        });
      }
    });
  }
  onDelete(item: any) { const confirmDelete = confirm(`Are you sure you want to delete record ID ${item.id}?`);
  if (!confirmDelete) return;

  this.medicalRecordService.deleteRecord(item.id).subscribe({
    next: () => {
      this.store.dispatch(showSuccess({ message: 'Medical record deleted successfully!'}));
      this.loadPatientRecords(this.patientId);
    },
    error: (err) => {
      console.error('Failed to delete medical record:', err);
      this.store.dispatch(showError({ message: err.error?.message || 'Failed to delete medical record.' }));
    }
  });
}

  loadPatientRecords(patientId: number) {
    this.medicalRecordService.getRecordsByPatientId(patientId).subscribe({
      next: (medicalRecords) => this.dataSource = medicalRecords,
      error: (err) => console.error('Failed to fetch patient Medical Record:', err)
    });
  }
}
