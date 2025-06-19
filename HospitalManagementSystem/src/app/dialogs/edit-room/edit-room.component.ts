import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoomService } from 'src/app/services/room.service';
import { Store } from '@ngrx/store';
import { showSuccess, showError } from 'src/app/Store/snackbar/snackbar.actions';


@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css']
})
export class EditRoomComponent {
   editRoomForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditRoomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roomService: RoomService,
    private store:Store
  ) {
    this.editRoomForm = new FormGroup({
      type: new FormControl(data.type, Validators.required),
      capacity: new FormControl(data.capacity, Validators.required),
      price: new FormControl(data.price, Validators.required)
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onUpdateRoom() {
    if (this.editRoomForm.invalid) return;

    const updatedRoom = {
      ...this.data,
      ...this.editRoomForm.value,
      capacity: Number(this.editRoomForm.value.capacity),
      price: Number(this.editRoomForm.value.price)
    };

    this.roomService.updateRoom(updatedRoom.id, updatedRoom).subscribe({
      next: () => {
        this.store.dispatch(showSuccess({ message: 'Room updated successfully!' }));
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.store.dispatch(showError({ message: err.error?.message || 'Update failed.' }));
      }
    });
  }
}
