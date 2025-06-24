// add-appointment.component.ts
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AppointmentService } from 'src/app/services/appointment.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { Store } from '@ngrx/store';
import { showError, showSuccess } from 'src/app/Store/snackbar/snackbar.actions';
import { forkJoin, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent {
  today: Date = new Date();
  bookedDates: string[] = [];
  slotFull = false;
  slotsLeft: number | null = null;
  maxSlots: number | null = null;

  addAppointmentForm = new FormGroup({
    patientId: new FormControl('', Validators.required),
    doctorId: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    time: new FormControl('', Validators.required)
  });

  constructor(
    private dialogRef: MatDialogRef<AddAppointmentComponent>,
    private appointmentService: AppointmentService,
    private doctorService: DoctorService,
    private store: Store
  ) {}

  onCancel() {
    this.dialogRef.close();
  }

  addAppointment() {
    if (this.addAppointmentForm.invalid) return;

    const rawDateString = this.addAppointmentForm.value.date;
    const rawDate = new Date(rawDateString!);
    const timeStr = this.addAppointmentForm.value.time;
    const doctorId = Number(this.addAppointmentForm.value.doctorId);
    const patientId = Number(this.addAppointmentForm.value.patientId);

    const year = rawDate.getFullYear();
    const month = String(rawDate.getMonth() + 1).padStart(2, '0');
    const day = String(rawDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    forkJoin({
      count: this.appointmentService.getAppointmentCount(doctorId, formattedDate),
      doctor: this.doctorService.getDoctorById(doctorId)
    }).pipe(
      switchMap(({ count, doctor }) => {
        this.maxSlots = doctor.maxAppointmentsPerDay;
        this.slotsLeft = doctor.maxAppointmentsPerDay - count;
        this.slotFull = this.slotsLeft <= 0;

        if (this.slotFull) {
          this.store.dispatch(showError({ message: 'All slots are full for this day.' }));
          return of(null);
        }

        return this.appointmentService.createAppointment({
          patientId,
          doctorId,
          date: formattedDate,
          time:timeStr
        });
      }),
      catchError(err => {
        this.store.dispatch(showError({ message: err.error?.message || 'Failed to create appointment.' }));
        return of(null);
      })
    ).subscribe(result => {
      if (result) {
        this.store.dispatch(showSuccess({ message: 'Appointment successfully created!' }));
        this.dialogRef.close(true);
      }
    });
  }

  onDoctorOrDateChange() {
    this.slotFull = false;
    this.maxSlots = null;
    this.slotsLeft = null;
    this.bookedDates = [];

    const doctorId = Number(this.addAppointmentForm.value.doctorId);
    if (!doctorId) return;

    const today = new Date();
    const requests = Array.from({ length: 30 }, (_, i) => {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() + i);
      const formatted = checkDate.toISOString().split('T')[0];

      return this.appointmentService.getAppointmentCount(doctorId, formatted).pipe(
        switchMap(count =>
          this.doctorService.getDoctorById(doctorId).pipe(
            switchMap(doctor => {
              if (count >= doctor.maxAppointmentsPerDay) {
                this.bookedDates.push(formatted);
              }
              return of(null);
            })
          )
        )
      );
    });

    forkJoin(requests).subscribe();
  }

  dateFilter = (d: Date | null): boolean => {
    if (!d) return false;
    const localDate = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().split('T')[0];
    return !this.bookedDates.includes(localDate);
  };
  
}
