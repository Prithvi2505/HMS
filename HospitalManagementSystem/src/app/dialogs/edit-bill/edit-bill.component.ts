import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BillService } from 'src/app/services/bill.service';
import { Store } from '@ngrx/store';
import { showSuccess, showError } from 'src/app/Store/snackbar/snackbar.actions';


@Component({
  selector: 'app-edit-bill',
  templateUrl: './edit-bill.component.html',
  styleUrls: ['./edit-bill.component.css']
})
export class EditBillComponent {
  status: string[] = ['Paid', 'Unpaid'];
  editBillForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EditBillComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private billService: BillService,
    private store:Store
  ) {

      this.editBillForm = new FormGroup({
      patientId: new FormControl(data.patientId, Validators.required),
      amount: new FormControl(data.amount, Validators.required),
      status: new FormControl(data.status || 'Unpaid', Validators.required),
      date: new FormControl(this.formatDate(data.date), Validators.required),
      billDetail: new FormControl(data.billDetail, Validators.required)
    });
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // yyyy-MM-dd
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onUpdateBill(): void {
    if (this.editBillForm.invalid) return;

    const updatedBill = {
      amount: this.editBillForm.value.amount,
      status: this.editBillForm.value.status ?? '',
      date: this.editBillForm.value.date,
      billDetail: this.editBillForm.value.billDetail,
      patientId: this.editBillForm.value.patientId
    };

    this.billService.updateBill(this.data.id, updatedBill).subscribe({
      next: () => {
        this.store.dispatch(showSuccess({ message: 'Bill updated successfully!' }));
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Failed to update bill:', err);
        this.store.dispatch(showError({ message: err.error?.message || 'Failed to update bill.' }));
      }
    });
  }
}
