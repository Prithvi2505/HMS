import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { BillService } from 'src/app/services/bill.service';
import { showError, showSuccess } from 'src/app/Ngrx/snackbar/snackbar.actions';
import { DynamicFormField } from '../dynamic-form/dynamic-form.component'; 

@Component({
  selector: 'app-bill-form-dialog',
  templateUrl: './bill-form-dialog.component.html',
  styleUrls: ['./bill-form-dialog.component.css'],
})
export class BillFormDialogComponent implements OnInit {
  formConfig: DynamicFormField[] = [];
  title = '';
  submitText = '';
  initialValues: any = {};

  constructor(
    private dialogRef: MatDialogRef<BillFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private billService: BillService,
    private store: Store
  ) {}

  ngOnInit(): void {
    const isEdit = this.data?.mode === 'edit';
    this.title = isEdit ? 'Edit Bill' : 'Add Bill';
    this.submitText = isEdit ? 'Update' : 'Create';

    const raw = this.data?.initialValues || {};
    this.initialValues = {
      ...raw,
      date: raw.date ? new Date(raw.date) : '',
    };

    this.formConfig = [
      { name: 'patientId', label: 'Patient ID', type: 'number', required: true },
      { name: 'amount', label: 'Amount (₹)', type: 'number', required: true },
      {
        name: 'status',
        label: 'Status',
        type: 'select',
        options: [
          { value: 'Paid', label: 'Paid' },
          { value: 'Unpaid', label: 'Unpaid' },
        ],
        required: true,
      },
      { name: 'date', label: 'Billing Date', type: 'date', required: true },
      { name: 'billDetail', label: 'Bill Details', type: 'textarea', required: true },
    ];
  }

  onSubmit(formData: any): void {
    const formattedDate = this.formatDate(formData.date);

    const payload = {
      ...formData,
      date: formattedDate,
      amount: Number(formData.amount),
      patientId: Number(formData.patientId),
    };

    if (this.data?.mode === 'edit') {
      const id = this.data.initialValues?.id;
      if (!id) {
        this.store.dispatch(showError({ message: 'Missing bill ID for update.' }));
        return;
      }

      this.billService.updateBill(id, payload).subscribe({
        next: () => {
          this.store.dispatch(showSuccess({ message: 'Bill updated successfully!' }));
          this.dialogRef.close(true);
        },
        error: (err) => {
          this.store.dispatch(showError({ message: err.error?.message || 'Failed to update bill.' }));
        },
      });
    } else {
      this.billService.createBill(payload).subscribe({
        next: () => {
          this.store.dispatch(showSuccess({ message: 'Bill successfully created!' }));
          this.dialogRef.close(true);
        },
        error: (err) => {
          this.store.dispatch(showError({ message: err.error?.message || 'Failed to create bill.' }));
        },
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  private formatDate(date: string | Date): string {
    const d = new Date(date);
    return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
  }
}
