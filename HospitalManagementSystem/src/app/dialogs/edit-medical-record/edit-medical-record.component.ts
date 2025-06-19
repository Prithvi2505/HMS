import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MedicalRecordService } from 'src/app/services/medical-record.service';

@Component({
  selector: 'app-edit-medical-record',
  templateUrl: './edit-medical-record.component.html',
  styleUrls: ['./edit-medical-record.component.css']
})
export class EditMedicalRecordComponent {
  editMedicalRecordForm!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EditMedicalRecordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private medicalService: MedicalRecordService
  ) {}

  ngOnInit(): void {
    this.editMedicalRecordForm = new FormGroup({
      diagnosis: new FormControl(this.data.diagnosis, Validators.required),
      yearOfDiagnosis: new FormControl(this.data.yearOfDiagnosis, Validators.required),
      medicineUsed: new FormControl(this.data.medicineUsed, Validators.required)
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onUpdateMedicalRecord(): void {
    if (this.editMedicalRecordForm.invalid) return;

    const updatedRecord = {
      diagnosis: this.editMedicalRecordForm.value.diagnosis,
      yearOfDiagnosis: this.editMedicalRecordForm.value.yearOfDiagnosis,
      medicineUsed: this.editMedicalRecordForm.value.medicineUsed,
      patientId: this.data.patientId
    };

    this.medicalService.updateRecord(this.data.id, updatedRecord).subscribe({
      next: () => {
        alert('Medical record updated successfully!');
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Update failed:', err);
        alert('Failed to update medical record.');
      }
    });
  }
}
