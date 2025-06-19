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
  appointments: Appointment[] = [];
  constructor(private router: Router, private dialogRef: MatDialogRef<AddAppointmentComponent>, private appointmentService: AppointmentService,
    private store:Store
  ) { }
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
    const formattedDate = rawDate ? new Date(rawDate).toISOString().split('T')[0] : '';
    const formData = {
    patientId: Number(this.addAppointmentForm.value.patientId),
    doctorId: Number(this.addAppointmentForm.value.doctorId),
    date: formattedDate,
    time: this.addAppointmentForm.value.time
  };
    this.appointmentService.createAppointment(formData).subscribe({
      next: (response) => {
        console.log('Appointment created:', response);
        this.store.dispatch(showSuccess({ message: 'Appointment successfully created!'}));
        this.dialogRef.close(true); // Pass true to indicate success
      },
      error: (error) => {
        console.error('Error creating appointment:', error);
        this.store.dispatch(showError({ message: error.error?.message || 'Failed to create appointment. Please try again.' }));
      }
    });
  }
}
