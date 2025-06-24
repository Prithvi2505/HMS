// appointment-form-dialog.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppointmentService } from 'src/app/services/appointment.service';
import { DoctorService } from 'src/app/services/doctor.service';
import {
  showError,
  showSuccess,
} from 'src/app/Store/snackbar/snackbar.actions';
import { forkJoin, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { DynamicFormField } from 'src/app/shared/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-appointment-form-dialog',
  templateUrl: './appointment-form-dialog.component.html',
  styleUrls: ['./appointment-form-dialog.component.css'],
})
export class AppointmentFormDialogComponent implements OnInit {
  formConfig: DynamicFormField[] = [];
  title = '';
  submitText = '';
  today: Date = new Date();
  bookedDates: string[] = [];
  slotFull = false;
  maxSlots: number | null = null;
  slotsLeft: number | null = null;
  initialValues: any = {};

  constructor(
    private dialogRef: MatDialogRef<AppointmentFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private appointmentService: AppointmentService,
    private doctorService: DoctorService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.title =
      this.data.mode === 'edit' ? 'Edit Appointment' : 'Add Appointment';
    this.submitText = this.data.mode === 'edit' ? 'Update' : 'Add';

    const raw = this.data.initialValues || {};
    this.initialValues = {
      ...raw,
      date: raw.date ? new Date(raw.date) : '',
    };

    this.formConfig = [
      {
        name: 'patientId',
        label: 'Patient ID',
        type: 'number',
        required: true,
      },
      { name: 'doctorId', label: 'Doctor ID', type: 'number', required: true },
      { name: 'date', label: 'Date', type: 'date', required: true },
      { name: 'time', label: 'Time', type: 'time', required: true },
    ];
  }

  onFormChange = (form: FormGroup) => {
    const doctorId = Number(form.value.doctorId);
    if (!doctorId) return;

    this.slotFull = false;
    this.maxSlots = null;
    this.slotsLeft = null;
    this.bookedDates = [];

    const today = new Date();
    const requests = Array.from({ length: 30 }, (_, i) => {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() + i);
      const formatted = checkDate.toISOString().split('T')[0];

      return this.appointmentService
        .getAppointmentCount(doctorId, formatted)
        .pipe(
          switchMap((count) =>
            this.doctorService.getDoctorById(doctorId).pipe(
              switchMap((doctor) => {
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
  };

  dateFilter = (d: Date | null): boolean => {
    if (!d) return false;
    const localDate = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
      .toISOString()
      .split('T')[0];
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    return !this.bookedDates.includes(localDate) && d >= todayDate;
  };

  onSubmit(formData: any) {
    const rawDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    rawDate.setHours(0, 0, 0, 0);
    if (rawDate < today) {
      this.store.dispatch(showError({ message: 'Cannot select a past date.' }));
      return;
    }

    const formattedDate = `${rawDate.getFullYear()}-${String(
      rawDate.getMonth() + 1
    ).padStart(2, '0')}-${String(rawDate.getDate()).padStart(2, '0')}`;

    const doctorId = Number(formData.doctorId);
    const patientId = Number(formData.patientId);
    const time = formData.time;

    if (this.data.mode === 'edit') {
      const id = this.data.initialValues?.id;
      if (!id) {
        this.store.dispatch(
          showError({ message: 'Missing appointment ID for update.' })
        );
        return;
      }

      forkJoin({
        count: this.appointmentService.getAppointmentCount(
          doctorId,
          formattedDate
        ),
        doctor: this.doctorService.getDoctorById(doctorId),
      })
        .pipe(
          switchMap(({ count, doctor }) => {
            this.maxSlots = doctor.maxAppointmentsPerDay;
            this.slotsLeft = doctor.maxAppointmentsPerDay - count;

            const isSame =
              this.data.initialValues?.doctorId === doctorId &&
              this.data.initialValues?.date === formattedDate &&
              this.data.initialValues?.time === time;

            if (!isSame && this.slotsLeft <= 0) {
              this.store.dispatch(
                showError({ message: 'All slots are full for this day.' })
              );
              return of(null);
            }

            return this.appointmentService.updateAppointment(id, {
              patientId,
              doctorId,
              date: formattedDate,
              time,
            });
          }),
          catchError((err) => {
            this.store.dispatch(
              showError({
                message: err.error?.message || 'Failed to update appointment.',
              })
            );
            return of(null);
          })
        )
        .subscribe((result) => {
          if (result) {
            this.store.dispatch(
              showSuccess({ message: 'Appointment updated successfully!' })
            );
            this.dialogRef.close(true);
          }
        });
      return;
    }

    forkJoin({
      count: this.appointmentService.getAppointmentCount(
        doctorId,
        formattedDate
      ),
      doctor: this.doctorService.getDoctorById(doctorId),
    })
      .pipe(
        switchMap(({ count, doctor }) => {
          this.maxSlots = doctor.maxAppointmentsPerDay;
          this.slotsLeft = doctor.maxAppointmentsPerDay - count;
          this.slotFull = this.slotsLeft <= 0;

          if (this.slotFull) {
            this.store.dispatch(
              showError({ message: 'All slots are full for this day.' })
            );
            return of(null);
          }

          return this.appointmentService.createAppointment({
            patientId,
            doctorId,
            date: formattedDate,
            time,
          });
        }),
        catchError((err) => {
          this.store.dispatch(
            showError({
              message: err.error?.message || 'Failed to create appointment.',
            })
          );
          return of(null);
        })
      )
      .subscribe((result) => {
        if (result) {
          this.store.dispatch(
            showSuccess({ message: 'Appointment successfully created!' })
          );
          this.dialogRef.close(true);
        }
      });
  }

  onCancel() {
    this.dialogRef.close();
  }
}
