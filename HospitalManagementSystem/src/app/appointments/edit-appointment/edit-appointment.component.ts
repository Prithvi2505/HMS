import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Store } from '@ngrx/store';
import { showSuccess, showError } from 'src/app/Store/snackbar/snackbar.actions';

@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.css']
})
export class EditAppointmentComponent {
today!: string;
editAppointmentForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EditAppointmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private appointmentService: AppointmentService,private store:Store
  ) {
    this.editAppointmentForm = new FormGroup({
      patientId: new FormControl(data.patientId, Validators.required),
      doctorId: new FormControl(data.doctorId, Validators.required),
      date: new FormControl(data.date, Validators.required),
      time: new FormControl(this.formatTime(data.time), Validators.required),
    });
  }

  private formatTime(time: any): string {
    const date = new Date(time);
    return date.toTimeString().substring(0, 5);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onUpdateAppointment(): void {
    const rawDate = this.editAppointmentForm.value.date;
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

  const updatedAppointment = {
    id: this.data.id,
    patientId: Number(this.editAppointmentForm.value.patientId),
    doctorId: Number(this.editAppointmentForm.value.doctorId),
    date: formattedDate,
    time: this.editAppointmentForm.value.time
  };
    

    this.appointmentService.updateAppointment(updatedAppointment.id, updatedAppointment).subscribe({
      next: () => {
        this.store.dispatch(showSuccess({ message: 'Appointment updated successfully!' }));
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Update failed', err);
        this.store.dispatch(showError({ message: err.error?.message || 'Failed to update appointment' }));
      }
    });
  }
}

