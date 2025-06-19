import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/services/registration.service';
import { Store } from '@ngrx/store';
import { showSuccess, showError } from 'src/app/Store/snackbar/snackbar.actions';
interface role {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
registrationForm!: FormGroup;

  roles = [
    { value: 'patient', viewValue: 'Patient' },
    { value: 'doctor', viewValue: 'Doctor' },
    { value: 'staff', viewValue: 'Staff' }
  ];
 
  genders = ['Male', 'Female', 'Other'];
  staffTypes = ['Nurse','Peon','Receptionist'];

  constructor(private fb: FormBuilder, private router:Router,
    private registrationService: RegistrationService,
    private store:Store
  ) {}

  ngOnInit() {
    this.registrationForm = this.fb.group({
      role: ['', Validators.required],
      details: this.fb.group({})  // empty at start
    });
    
    // When role changes, update the form controls in details group
    this.registrationForm.get('role')!.valueChanges.subscribe(role => {
      this.setRoleForm(role);
    });
  }

  setRoleForm(role: string) {
    const details = this.fb.group({});
    if (role === 'patient') {
      details.addControl('name', this.fb.control('', Validators.required));
      details.addControl('email', this.fb.control('', [Validators.required, Validators.email]));
      details.addControl('gender', this.fb.control('', Validators.required));
      details.addControl('age', this.fb.control('', Validators.required));
      details.addControl('city', this.fb.control('', Validators.required));
      details.addControl('mobileNo', this.fb.control('', Validators.required));
      details.addControl('password', this.fb.control('', Validators.required));
    } else if (role === 'doctor') {
      details.addControl('name', this.fb.control('', Validators.required));
      details.addControl('email', this.fb.control('', [Validators.required, Validators.email]));
      details.addControl('gender', this.fb.control('', Validators.required));
      details.addControl('specialization', this.fb.control('', Validators.required));
      details.addControl('password', this.fb.control('', Validators.required));
      details.addControl('yearOfExperience', this.fb.control('', Validators.required));
      // add other doctor-specific controls
    } else if (role === 'staff') {
      details.addControl('name', this.fb.control('', Validators.required));
      details.addControl('email', this.fb.control('', [Validators.required, Validators.email]));
      details.addControl('gender', this.fb.control('', Validators.required));
      details.addControl('type', this.fb.control('', Validators.required));
      details.addControl('password', this.fb.control('', Validators.required));
      // add other staff-specific controls
    }
    this.registrationForm.setControl('details', details);
  }

  onRegister() {
    if (this.registrationForm.invalid) return;
  
    const formData = this.registrationForm.value;
    const payload = formData.details;
    console.log(payload);
  
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
          error: (err) => this.store.dispatch(showError({ message: err.error?.message || 'Error registering doctor ' }))
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
    this.router.navigate(['/login'])
    this.registrationForm.reset();
  }
}