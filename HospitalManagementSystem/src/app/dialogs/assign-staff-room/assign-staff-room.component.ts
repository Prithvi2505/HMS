import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { StaffService } from 'src/app/services/staff.service';
import { Store } from '@ngrx/store';
import { showSuccess, showError } from 'src/app/Store/snackbar/snackbar.actions';

@Component({
  selector: 'app-assign-staff-room',
  templateUrl: './assign-staff-room.component.html',
  styleUrls: ['./assign-staff-room.component.css']
})
export class AssignStaffRoomComponent {
    staffId:number = 0;
    roomId:number =0;
   constructor(private router:Router,private dialogRef: MatDialogRef<AssignStaffRoomComponent>, private staffService:StaffService,
    private store:Store
   ){}
      assignStaffToRoomForm = new FormGroup({
          staffId: new FormControl('', Validators.required),
          roomId: new FormControl('', Validators.required),
        })
  
      OnCancel(){
        this.dialogRef.close();
      }
      assignStaffToRoom(){
        if(this.assignStaffToRoomForm.invalid) return; 
        this.staffId = Number(this.assignStaffToRoomForm.value.staffId);
        this.roomId = Number(this.assignStaffToRoomForm.value.roomId);
        this.staffService.assignRoomToStaff(this.staffId,this.roomId).subscribe({
          next: (response) => {
            this.store.dispatch(showSuccess({ message: 'Successfully Assigned Room !!!' }));
            this.dialogRef.close(true); 
          },
          error: (error) => {
            console.error('Error Assigning room:', error);
            this.store.dispatch(showError({ message: error.error?.message || 'Failed to Assign Room. Please try again.' }));
          }
        });
      }
}
