import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { StaffService } from 'src/app/services/staff.service';
import { showError, showSuccess } from 'src/app/Ngrx/snackbar/snackbar.actions';
import { DynamicFormField } from '../dynamic-form/dynamic-form.component';

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
  isFormReady = false;

  constructor(
    private dialogRef: MatDialogRef<AssignStaffRoomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private staffService: StaffService,
    private store: Store
  ) {}

  ngOnInit(): void {
  this.staffService.getAllStaff().subscribe((staffList: any[]) => {
    

    if (!staffList.length) {
      this.store.dispatch(showError({ message: 'No staff available to assign.' }));
      return;
    }

    const staffOptions = staffList.map((staff: any) => ({
      value: staff.id,
      label: staff.name || `Staff #${staff.id}`,
    }));

    

    this.formConfig = [
      {
        name: 'staffId',
        label: 'Select Staff',
        type: 'auto-select',
        required: true,
        options: staffOptions,
      },
      {
        name: 'roomId',
        label: 'Room ID',
        type: 'number',
        required: true,
      }
    ];

    this.initialValues = this.data?.initialValues || {};
    this.isFormReady = true;
  });
}

  onSubmit(formData: any): void {
    const staffId = Number(formData.staffId);
    const roomId = Number(formData.roomId);

    // Validate dropdown selection
    const staffExists = this.formConfig
      .find(f => f.name === 'staffId')?.options
      ?.some(opt => opt.value === staffId);

    if (!staffExists) {
      this.store.dispatch(showError({ message: 'Staff not found or invalid selection.' }));
      return;
    }

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
