import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { RoomService } from 'src/app/services/room.service';
import { showError, showSuccess } from 'src/app/Store/snackbar/snackbar.actions';
import { DynamicFormField } from '../dynamic-form/dynamic-form.component'; 

@Component({
  selector: 'app-room-form-dialog',
  templateUrl: './room-form-dialog.component.html',
  styleUrls: ['./room-form-dialog.component.css'],
})
export class RoomFormDialogComponent implements OnInit {
  formConfig: DynamicFormField[] = [];
  title = '';
  submitText = '';
  initialValues: any = {};

  constructor(
    private dialogRef: MatDialogRef<RoomFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roomService: RoomService,
    private store: Store
  ) {}

  ngOnInit(): void {
    const isEdit = this.data?.mode === 'edit';
    this.title = isEdit ? 'Edit Room' : 'Add Room';
    this.submitText = isEdit ? 'Update' : 'Create';

    this.initialValues = this.data?.initialValues || {};

    this.formConfig = [
      { name: 'type', label: 'Room Type', type: 'text', required: true },
      { name: 'capacity', label: 'Capacity', type: 'number', required: true },
      { name: 'price', label: 'Price (₹)', type: 'number', required: true }
    ];
  }

  onSubmit(formData: any): void {
    const payload = {
      ...formData,
      capacity: Number(formData.capacity),
      price: Number(formData.price)
    };

    if (this.data?.mode === 'edit') {
      const id = this.data?.initialValues?.id;
      if (!id) {
        this.store.dispatch(showError({ message: 'Missing Room ID for update.' }));
        return;
      }

      this.roomService.updateRoom(id, payload).subscribe({
        next: () => {
          this.store.dispatch(showSuccess({ message: 'Room updated successfully!' }));
          this.dialogRef.close(true);
        },
        error: (err) => {
          this.store.dispatch(showError({ message: err.error?.message || 'Failed to update room.' }));
        }
      });
    } else {
      this.roomService.createRoom(payload).subscribe({
        next: () => {
          this.store.dispatch(showSuccess({ message: 'Room successfully created!' }));
          this.dialogRef.close(true);
        },
        error: (err) => {
          this.store.dispatch(showError({ message: err.error?.message || 'Failed to create room.' }));
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
