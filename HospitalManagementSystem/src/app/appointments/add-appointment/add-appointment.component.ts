import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Appointment } from 'src/app/Model/appointment';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Store } from '@ngrx/store';
import { showSuccess, showError } from 'src/app/Store/snackbar/snackbar.actions';


@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent {
  today!: string;
  appointments: Appointment[] = [];
  constructor(private router: Router, private dialogRef: MatDialogRef<AddAppointmentComponent>, private appointmentService: AppointmentService,
    private store: Store
  ) {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    this.today = `${year}-${month}-${day}`;
  }
  addAppointmentForm = new FormGroup({
    patientId: new FormControl('', Validators.required),
    doctorId: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    time: new FormControl('', Validators.required)
  })

  OnCancel() {
    this.dialogRef.close();
  }
  
 addAppointment() {
  if (this.addAppointmentForm.invalid) return;

  const rawDate = this.addAppointmentForm.value.date;
  let formattedDate = '';
  if (rawDate) {
    const jsDate = new Date(rawDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // normalize today's date to midnight
    if (jsDate < today) {
      this.store.dispatch(showError({ message: 'Appointment date cannot be in the past.' }));
      return;
    }

    const year = jsDate.getFullYear();
    const month = String(jsDate.getMonth() + 1).padStart(2, '0');
    const day = String(jsDate.getDate()).padStart(2, '0');
    formattedDate = `${year}-${month}-${day}`;
  }

  const formData = {
    patientId: Number(this.addAppointmentForm.value.patientId),
    doctorId: Number(this.addAppointmentForm.value.doctorId),
    date: formattedDate,
    time: this.addAppointmentForm.value.time
  };

  this.appointmentService.createAppointment(formData).subscribe({
    next: (response) => {
      console.log('Appointment created:', response);
      this.store.dispatch(showSuccess({ message: 'Appointment successfully created!' }));
      this.dialogRef.close(true);
    },
    error: (error) => {
      console.error('Error creating appointment:', error);
      this.store.dispatch(showError({ message: error.error?.message || 'Failed to create appointment. Please try again.' }));
    }
  });
}

}
