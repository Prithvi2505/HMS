import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { MedicalRecordService } from 'src/app/services/medical-record.service';
import { showError, showSuccess } from 'src/app/Store/snackbar/snackbar.actions';
import { DynamicFormField } from 'src/app/shared/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-medical-record-form-dialog',
  templateUrl: './medical-record-form-dialog.component.html',
  styleUrls: ['./medical-record-form-dialog.component.css'],
})
export class MedicalRecordFormDialogComponent implements OnInit {
  formConfig: DynamicFormField[] = [];
  title = '';
  submitText = '';
  initialValues: any = {};

  constructor(
    private dialogRef: MatDialogRef<MedicalRecordFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private medicalService: MedicalRecordService,
    private store: Store
  ) {}

  ngOnInit(): void {
    const isEdit = this.data?.mode === 'edit';
    this.title = isEdit ? 'Edit Medical Record' : 'Add Medical Record';
    this.submitText = isEdit ? 'Update' : 'Create';

    this.initialValues = this.data?.initialValues || {};
    const patientId = this.data?.patientId || this.initialValues?.patientId;

    this.formConfig = [
      { name: 'diagnosis', label: 'Diagnosis', type: 'text', required: true },
      {
        name: 'yearOfDiagnosis',
        label: 'Year of Diagnosis',
        type: 'number',
        required: true,
      },
      {
        name: 'medicineUsed',
        label: 'Medicine Used',
        type: 'text',
        required: true,
      },
    ];

    this.initialValues.patientId = patientId; // keep patientId ready for later
  }

  onSubmit(formData: any): void {
    const record = {
      ...formData,
      yearOfDiagnosis: Number(formData.yearOfDiagnosis),
      patientId:
        this.data?.patientId || this.data?.initialValues?.patientId || formData.patientId,
    };

    if (this.data?.mode === 'edit') {
      const id = this.data?.initialValues?.id;
      if (!id) {
        this.store.dispatch(
          showError({ message: 'Missing record ID for update.' })
        );
        return;
      }

      this.medicalService.updateRecord(id, record).subscribe({
        next: () => {
          this.store.dispatch(
            showSuccess({ message: 'Medical record updated successfully!' })
          );
          this.dialogRef.close(true);
        },
        error: (err) => {
          this.store.dispatch(
            showError({
              message: err.error?.message || 'Failed to update medical record.',
            })
          );
        },
      });
    } else {
      this.medicalService.createRecord(record).subscribe({
        next: () => {
          this.store.dispatch(
            showSuccess({ message: 'Medical record created successfully!' })
          );
          this.dialogRef.close(true);
        },
        error: (err) => {
          this.store.dispatch(
            showError({
              message: err.error?.message || 'Failed to create medical record.',
            })
          );
        },
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
