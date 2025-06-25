import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { StaffService } from 'src/app/services/staff.service';
import { showError, showSuccess } from 'src/app/Store/snackbar/snackbar.actions';
import { DynamicFormField } from 'src/app/shared/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-assign-staff-room-dialog',
  templateUrl: './assign-staff-room-dialog.component.html',
  styleUrls: ['./assign-staff-room-dialog.component.css'],
})
export class AssignStaffRoomDialogComponent implements OnInit {
  formConfig: DynamicFormField[] = [];
  title = 'Assign Room to Staff';
  submitText = 'Assign';
  initialValues: any = {};

  constructor(
    private dialogRef: MatDialogRef<AssignStaffRoomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private staffService: StaffService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.formConfig = [
      { name: 'staffId', label: 'Staff ID', type: 'number', required: true },
      { name: 'roomId', label: 'Room ID', type: 'number', required: true }
    ];
  }

  onSubmit(formData: any): void {
    const staffId = Number(formData.staffId);
    const roomId = Number(formData.roomId);

    if (!staffId || !roomId) {
      this.store.dispatch(showError({ message: 'Staff ID and Room ID are required.' }));
      return;
    }

    this.staffService.assignRoomToStaff(staffId, roomId).subscribe({
      next: () => {
        this.store.dispatch(showSuccess({ message: 'Room successfully assigned to staff!' }));
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.store.dispatch(showError({ message: err.error?.message || 'Room assignment failed.' }));
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
