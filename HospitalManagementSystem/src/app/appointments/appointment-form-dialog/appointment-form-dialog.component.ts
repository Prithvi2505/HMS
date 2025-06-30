import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicFormField } from 'src/app/shared/dynamic-form/dynamic-form.component';
import { DoctorService } from 'src/app/services/doctor.service';
import { PatientService } from 'src/app/services/patient.service';
import { TokenService } from 'src/app/services/token.service';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Store } from '@ngrx/store';
import {
  showError,
  showSuccess,
} from 'src/app/Store/snackbar/snackbar.actions';
import { DateFilterFn } from '@angular/material/datepicker';

@Component({
  selector: 'app-appointment-form-dialog',
  templateUrl: './appointment-form-dialog.component.html',
})
export class AppointmentFormDialogComponent implements OnInit {
  formTitle = '';
  submitButtonText = '';
  formConfig: DynamicFormField[] = [];
  formGroup!: FormGroup;
  initialValues: any = {};
  isFormReady = false;
  bookedDates: string[] = [];
  slotAvailable: boolean | null = null;
  dayFullyBooked: boolean = false;
  availabilityMessage: string = '';

  role: string | null = '';
  userId!: number | null;

  constructor(
    private dialogRef: MatDialogRef<AppointmentFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private patientService: PatientService,
    private tokenService: TokenService,
    private appointmentService: AppointmentService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.role = this.tokenService.getUserRole();
    this.userId = this.tokenService.getUserId();

    const isEdit = this.data?.mode === 'edit';
    this.formTitle = isEdit ? 'Update Appointment' : 'Book Appointment';
    this.submitButtonText = isEdit ? 'Update' : 'Book';

    // Prepare initial values
    const raw = this.data?.initialValues || {};
    this.initialValues = {
      ...raw,
      date: raw.date ? new Date(raw.date) : '',
    };
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];

    // Initialize form
    this.formGroup = this.fb.group({
      id: [this.initialValues?.id || null],
      doctorId: [this.initialValues?.doctorId || '', Validators.required],
      patientId: [this.initialValues?.patientId || '', Validators.required],
      date: [this.initialValues?.date || '', Validators.required],
      time: [this.initialValues?.time || '', Validators.required],
    });

    // Dynamic form config by role
    if (this.role === 'doctor') {
      this.patientService.getAllPatients().subscribe((patients) => {
        const patientOptions = patients.map((p: any) => ({
          value: p.id,
          label: p.name,
        }));

        this.formConfig = [
          {
            name: 'patientId',
            label: 'Select Patient',
            type: 'select',
            required: true,
            options: patientOptions,
          },
          {
            name: 'date',
            label: 'Date',
            type: 'date',
            required: true,
            min: formattedToday,
          },
          { name: 'time', label: 'Time', type: 'time', required: true },
        ];

        this.formGroup.patchValue({
          doctorId: this.userId,
          ...this.initialValues,
          date: this.initialValues.date
            ? new Date(this.initialValues.date)
            : '',
        });
        this.isFormReady = true;
      });
    } else if (this.role === 'patient') {
      this.doctorService.getAllDoctors().subscribe((doctors) => {
        const doctorOptions = doctors.map((d: any) => ({
          value: d.id,
          label: d.name,
        }));

        this.formConfig = [
          {
            name: 'doctorId',
            label: 'Select Doctor',
            type: 'select',
            required: true,
            options: doctorOptions,
          },
          {
            name: 'date',
            label: 'Date',
            type: 'date',
            required: true,
            min: formattedToday,
          },
          { name: 'time', label: 'Time', type: 'time', required: true },
        ];

        this.formGroup.patchValue({
          patientId: this.userId,
          ...this.initialValues,
          date: this.initialValues.date
            ? new Date(this.initialValues.date)
            : '',
        });
        this.isFormReady = true;
      });
    }
  }

  onFormChanged(form: FormGroup) {
    this.formGroup = form;

    const doctorId = form.get('doctorId')?.value;
    const dateObj = form.get('date')?.value;
    const time = form.get('time')?.value;

    this.availabilityMessage = '';
    this.dayFullyBooked = false;
    this.slotAvailable = null;

    if (doctorId && dateObj) {
      const formattedDate = this.formatDate(dateObj);

      // First: Check total appointments for the day
      this.appointmentService
        .getAppointmentCount(doctorId, formattedDate)
        .subscribe((count) => {
          this.doctorService.getDoctorById(doctorId).subscribe((doctor) => {
            if (count >= doctor.maxAppointmentsPerDay) {
              this.dayFullyBooked = true;
              this.availabilityMessage = 'All slots are full for this day ❌';
              return;
            } else {
              this.dayFullyBooked = false;

              // Only check specific time-slot if time is also selected
              if (time) {
                const formattedTime = this.formatTime(time);

                this.appointmentService
                  .checkAvailability(doctorId, formattedDate, formattedTime)
                  .subscribe((available: boolean) => {
                    this.slotAvailable = available;
                    this.availabilityMessage = available
                      ? 'Slot is available ✅'
                      : 'Selected time is already booked ❌';
                  });
              } else {
                this.availabilityMessage =
                  'Slots are available for the selected day ✅';
              }
            }
          });
        });
    }
  }

  dateFilter: DateFilterFn<Date | null> = (d: Date | null): boolean => {
    if (!d) return false;
    const localDate = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
      .toISOString()
      .split('T')[0];
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    return !this.bookedDates.includes(localDate) && d >= todayDate;
  };

  onSubmit(): void {
    if (this.formGroup.valid) {
      if (this.dayFullyBooked) {
        this.store.dispatch(
          showError({ message: 'All slots are full for this day.' })
        );
        return;
      }
      if (this.slotAvailable === false) {
        this.store.dispatch(
          showError({ message: 'Selected time is unavailable.' })
        );
        return;
      }
      const formData = { ...this.formGroup.value };

      // Fill missing fields by role
      if (this.role === 'doctor') {
        formData.doctorId = this.userId;
      } else if (this.role === 'patient') {
        formData.patientId = this.userId;
      }

      formData.date = this.formatDate(formData.date);
      formData.time = this.formatTime(formData.time);

      const isEdit = this.data?.mode === 'edit';
      const request$ = isEdit
        ? this.appointmentService.updateAppointment(
            this.data.initialValues?.id,
            formData
          )
        : this.appointmentService.createAppointment(formData);

      request$.subscribe({
        next: () => {
          const msg = isEdit
            ? 'Appointment updated successfully!'
            : 'Appointment booked successfully!';
          this.store.dispatch(showSuccess({ message: msg }));
          this.dialogRef.close(true);
        },
        error: (err) => {
          const msg = err?.error?.message || 'Something went wrong.';
          this.store.dispatch(showError({ message: msg }));
        },
      });
    }
  }

  private formatDate(date: string | Date): string {
    const local = new Date(date);
    const year = local.getFullYear();
    const month = (local.getMonth() + 1).toString().padStart(2, '0');
    const day = local.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`; // returns YYYY-MM-DD
  }

  private formatTime(time: any): string {
    if (typeof time === 'string') return time;
    const t = new Date(`1970-01-01T${time}`);
    return t.toTimeString().split(':').slice(0, 2).join(':');
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
