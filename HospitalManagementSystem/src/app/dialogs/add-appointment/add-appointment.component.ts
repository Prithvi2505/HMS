import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent {
   appointments: any[] = [];
  constructor(private router:Router,private dialogRef: MatDialogRef<AddAppointmentComponent>){
    const storedAppointments = localStorage.getItem('appointments');
    this.appointments = storedAppointments ? JSON.parse(storedAppointments) : [];
  }
    addAppointmentForm = new FormGroup({
        patientId: new FormControl('', Validators.required),
        doctorId: new FormControl('', Validators.required),
        date: new FormControl('',Validators.required),
        time: new FormControl('',Validators.required)
      })

    OnCancel(){
      this.dialogRef.close();
    }
    addAppointment(){
      if(this.addAppointmentForm.invalid) return; 
      const formData = this.addAppointmentForm.value;
      this.appointments.push(formData)
      localStorage.setItem('appointments', JSON.stringify(this.appointments));
      this.dialogRef.close();
    }
}
