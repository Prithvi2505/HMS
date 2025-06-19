import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.css']
})
export class EditAppointmentComponent {
editAppointmentForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EditAppointmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private appointmentService: AppointmentService
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
    if (this.editAppointmentForm.invalid) return;

    const formValue = this.editAppointmentForm.value;
    const updatedAppointment = {
      id: this.data.id,
      patientId: formValue.patientId,
      doctorId: formValue.doctorId,
      date: formValue.date,
      time: formValue.time
    };

    this.appointmentService.updateAppointment(updatedAppointment.id, updatedAppointment).subscribe({
      next: () => {
        alert('Appointment updated successfully!');
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Update failed', err);
        alert('Failed to update appointment');
      }
    });
  }
}

