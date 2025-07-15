import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicFormField } from '../../shared/dynamic-form/dynamic-form.component'; 
import { DoctorService } from 'src/app/services/doctor.service';
import { PatientService } from 'src/app/services/patient.service';
import { TokenService } from 'src/app/services/token.service';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Store } from '@ngrx/store';
import {
  showError,
  showSuccess,
} from 'src/app/Ngrx/snackbar/snackbar.actions';
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
  availableDays: string[] = [];

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
            type: 'auto-select',
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
          {
            name: 'time',
            label: 'Time',
            type: 'select',
            required: true,
            options: []
          },
        ];

        const selectedPatient = patientOptions.find(
          (p) => p.value === this.initialValues.patientId
        );

        this.formGroup.patchValue({
          doctorId: this.userId,
          patientId: selectedPatient?.value || '',
          date: this.initialValues.date
            ? new Date(this.initialValues.date)
            : '',
          time: this.initialValues.time || '',
        });
        this.doctorService.getDoctorById(this.userId!).subscribe((doctor) => {
          this.availableDays = doctor.availableDays || [];
          this.isFormReady = true;
        });
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
            type: 'auto-select',
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
          {
            name: 'time',
            label: 'Time',
            type: 'select',
            required: true,
            options: [],
          },
        ];

        const selectedDoctor = doctorOptions.find(
          (d) => d.value === this.initialValues.doctorId
        );

        this.formGroup.patchValue({
          patientId: this.userId,
          doctorId: selectedDoctor?.value || '',
          date: this.initialValues.date
            ? new Date(this.initialValues.date)
            : '',
          time: this.initialValues.time || '',
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

    if (doctorId) {
     this.doctorService.getDoctorById(doctorId).subscribe((doctor) => {
          this.availableDays = doctor.availableDays || [];
          this.isFormReady = true;
        });
    }
    

    if(this.role == 'patient'){
    if (doctorId && dateObj) {
     this.verifyDayAndSlot(doctorId,dateObj);
    }
    }
    if(this.role == 'doctor'){
    if (this.userId && dateObj) {
     this.verifyDayAndSlot(this.userId,dateObj);
    }
    }
    
  }

  dateFilter: DateFilterFn<Date | null | undefined> = (
    d: Date | null | undefined
  ): boolean => {
    if (!d) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (d < today) return false;

    if (!this.availableDays.length) return false; // doctor not selected yet

    const dayName = d
      .toLocaleDateString('en-US', { weekday: 'long' })
      .toUpperCase();

    return this.availableDays.includes(dayName);
  };

  verifyDayAndSlot(dID:any, date:any){
    const formattedDate = this.formatDate(date);
      const selectedDayOfWeek = new Date(date)
        .toLocaleString('en-US', {
          weekday: 'long',
        })
        .toUpperCase();

      this.doctorService.getDoctorById(dID).subscribe((doctor) => {
        if (!doctor.availableDays.includes(selectedDayOfWeek)) {
          this.dayFullyBooked = true;
          this.availabilityMessage = `Doctor is not available on ${selectedDayOfWeek} ❌`;
          const timeField = this.formConfig.find((f) => f.name === 'time');
          if (timeField) timeField.options = [];
          return;
        }
        this.appointmentService
          .getAppointmentCount(dID, formattedDate)
          .subscribe((count: number) => {
            if (count >= doctor.maxAppointmentsPerDay) {
              this.dayFullyBooked = true;
              this.availabilityMessage = 'All slots are full for this day ❌';
              const timeField = this.formConfig.find((f) => f.name === 'time');
              if (timeField) timeField.options = [];
              return;
            }
            this.appointmentService
              .getAvailableTimeSlots(dID, formattedDate)
              .subscribe((slots: string[]) => {
                const timeField = this.formConfig.find(
                  (f) => f.name === 'time'
                );
                if (timeField) {
                  timeField.options = slots.map((t) => ({
                    label: t,
                    value: t,
                  }));
                }

                this.slotAvailable = !!slots.length;
                this.availabilityMessage = slots.length
                  ? 'Available time slots loaded ✅'
                  : 'No available slots found ❌';
              });
          });
      });
  }

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
