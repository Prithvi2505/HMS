import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assign-staff-room',
  templateUrl: './assign-staff-room.component.html',
  styleUrls: ['./assign-staff-room.component.css']
})
export class AssignStaffRoomComponent {
  staffToRooms:any[] =[];
   constructor(private router:Router,private dialogRef: MatDialogRef<AssignStaffRoomComponent>){
    const storedstaffToRooms = localStorage.getItem('staffToRooms');
      this.staffToRooms = storedstaffToRooms ? JSON.parse(storedstaffToRooms) : [];
   }
      assignStaffToRoomForm = new FormGroup({
          staffId: new FormControl('', Validators.required),
          roomId: new FormControl('', Validators.required),
        })
  
      OnCancel(){
        this.dialogRef.close();
      }
      assignStaffToRoom(){
        if(this.assignStaffToRoomForm.invalid) return; 
      const formData = this.assignStaffToRoomForm.value;
      this.staffToRooms.push(formData)
      localStorage.setItem('staffToRooms', JSON.stringify(this.staffToRooms));
      this.dialogRef.close();
      }
}
