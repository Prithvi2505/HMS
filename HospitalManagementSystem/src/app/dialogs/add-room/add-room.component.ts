import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RoomService } from 'src/app/services/room.service';
import { Store } from '@ngrx/store';
import { showSuccess, showError } from 'src/app/Store/snackbar/snackbar.actions';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent {

    constructor(private router: Router, private dialogRef: MatDialogRef<AddRoomComponent>, private roomService: RoomService,
      private store:Store
    ) {}
    addRoomForm = new FormGroup({
      type: new FormControl('', Validators.required),
      capacity: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required)
    })

     OnCancel() {
    this.dialogRef.close();
  }
  addRoom() {
    if (this.addRoomForm.invalid) return;
    const formData = {
      type: this.addRoomForm.value.type ?? '',
      capacity:Number(this.addRoomForm.value.capacity),
      price: Number(this.addRoomForm.value.price),
    };

    this.roomService.createRoom(formData).subscribe({
      next: (response) => {
        this.store.dispatch(showSuccess({ message: 'Room successfully created!'}));
        this.dialogRef.close(true); 
      },
      error: (error) => {
        console.error('Error creating Room:', error);
        this.store.dispatch(showError({ message: error.error?.message || 'Failed to create Room. Please try again.' }));
      }
    });
  }
}
