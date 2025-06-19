import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicalRecordService } from 'src/app/services/medical-record.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { showSuccess, showError } from 'src/app/Store/snackbar/snackbar.actions';

@Component({
  selector: 'app-add-medical-record',
  templateUrl: './add-medical-record.component.html',
  styleUrls: ['./add-medical-record.component.css']
})
export class AddMedicalRecordComponent implements OnInit {
  patientId: number = 0;
  constructor(private router:Router, private dialogRef: MatDialogRef<AddMedicalRecordComponent>,
  private medicalService: MedicalRecordService,private store:Store,
  @Inject(MAT_DIALOG_DATA) public data: any){}
  ngOnInit() {
  this.patientId = this.data.patientId;
  }
        addMedicalRecordForm = new FormGroup({
            diagnosis:new FormControl('',Validators.required),
            yearOfDiagnosis: new FormControl('',Validators.required),
            medicineUsed: new FormControl('', Validators.required)
          })
    
        OnCancel(){
          this.dialogRef.close();
        }
    addMedicalRecord() {
    if (this.addMedicalRecordForm.invalid) return;

    const form = this.addMedicalRecordForm.value;

    const record = {
      diagnosis: form.diagnosis,
      yearOfDiagnosis: Number(form.yearOfDiagnosis),
      medicineUsed: form.medicineUsed,
      patientId: Number(this.patientId)
    };
    console.log(this.addMedicalRecordForm.value, "patientId from route:", this.patientId);

    this.medicalService.createRecord(record).subscribe({
      next: () => {
        this.store.dispatch(showSuccess({ message: 'Medical record created successfully!' }));
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error(err);
        console.error('Error from backend:', err.error);
        this.store.dispatch(showError({ message: err.error?.message || 'Failed to create record.' }));
      }
    });
  }
}
