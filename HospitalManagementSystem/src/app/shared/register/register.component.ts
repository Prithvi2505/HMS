import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/services/registration.service';
import { Store } from '@ngrx/store';
import { showSuccess, showError } from 'src/app/Store/snackbar/snackbar.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;
  daysOfWeek = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
  roles = [
    { value: 'patient', viewValue: 'Patient' },
    { value: 'doctor', viewValue: 'Doctor' },
    { value: 'staff', viewValue: 'Staff' }
  ];
  
  genders = ['Male', 'Female', 'Other'];
  staffTypes = ['Nurse', 'Peon', 'Receptionist'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private registrationService: RegistrationService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      role: ['', Validators.required],
      details: this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        gender: ['', Validators.required],
        password: ['', Validators.required]
      })
    });

    this.registrationForm.get('role')!.valueChanges.subscribe(role => {
      this.setRoleForm(role);
    });
  }
  startTimeBeforeEndTimeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const group = control as FormGroup;
    const start = group.get('startTime')?.value;
    const end = group.get('endTime')?.value;

    if (!start || !end) return null;

    const startTime = new Date(`2000-01-01T${start}`);
    const endTime = new Date(`2000-01-01T${end}`);

    return startTime >= endTime ? { startAfterEnd: true } : null;
  };
}

  setRoleForm(role: string) {
    const details = this.registrationForm.get('details') as FormGroup;

    // Remove all possible role-specific fields first
    ['age', 'city', 'mobileNo', 'specialization', 'yearOfExperience', 'type'].forEach(field => {
      if (details.contains(field)) {
        details.removeControl(field);
      }
    });

    // Add based on role
    if (role === 'patient') {
      details.addControl('age', this.fb.control('', Validators.required));
      details.addControl('city', this.fb.control('', Validators.required));
      details.addControl('mobileNo', this.fb.control('', Validators.required));
    } else if (role === 'doctor') {
      details.addControl('specialization', this.fb.control('', Validators.required));
      details.addControl('yearOfExperience', this.fb.control('', Validators.required));
      details.addControl('maxAppointmentsPerDay',this.fb.control('',Validators.required));
      details.addControl('startTime', this.fb.control('', Validators.required));
      details.addControl('endTime', this.fb.control('', Validators.required));
      details.addControl('availableDays', this.fb.control([], Validators.required));

      details.setValidators(this.startTimeBeforeEndTimeValidator());
    } else if (role === 'staff') {
      details.addControl('type', this.fb.control('', Validators.required));
    }
  }

  onRegister() {
    if (this.registrationForm.invalid) return;

    const formData = this.registrationForm.value;
    const payload = formData.details;

    switch (formData.role) {
      case 'patient':
        this.registrationService.registerPatient(payload).subscribe({
          next: () => {
            this.store.dispatch(showSuccess({ message: 'Patient registered successfully' }));
            this.router.navigate(['/login']);
          },
          error: (err) => this.store.dispatch(showError({ message: err.error?.message || 'Error registering patient' }))
        });
        break;

      case 'doctor':
        this.registrationService.registerDoctor(payload).subscribe({
          next: () => {
            this.store.dispatch(showSuccess({ message: 'Doctor registered successfully!' }));
            this.router.navigate(['/login']);
          },
          error: (err) => this.store.dispatch(showError({ message: err.error?.message || 'Error registering doctor' }))
        });
        break;

      case 'staff':
        this.registrationService.registerStaff(payload).subscribe({
          next: () => {
            this.store.dispatch(showSuccess({ message: 'Staff registered successfully' }));
            this.router.navigate(['/login']);
          },
          error: (err) => this.store.dispatch(showError({ message: err.error?.message || 'Error registering staff' }))
        });
        break;
    }
  }


  onCancel() {
    this.router.navigate(['/login']);
    this.registrationForm.reset();
  }
}
