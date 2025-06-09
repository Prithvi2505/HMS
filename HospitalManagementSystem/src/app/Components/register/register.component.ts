import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  patients: any[] = [];
  doctors: any[] = [];
  staff: any[] = [];

  constructor(private fb: FormBuilder, private router:Router) {}

  ngOnInit() {
    this.registrationForm = this.fb.group({
      role: ['', Validators.required],
      details: this.fb.group({})  // empty at start
    });
    
    this.patients = JSON.parse(localStorage.getItem('patients') || '[]');
    this.doctors = JSON.parse(localStorage.getItem('doctors') || '[]');
    this.staff = JSON.parse(localStorage.getItem('staff') || '[]');

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
      details.addControl('mobile_no', this.fb.control('', Validators.required));
      details.addControl('password', this.fb.control('', Validators.required));
    } else if (role === 'doctor') {
      details.addControl('name', this.fb.control('', Validators.required));
      details.addControl('email', this.fb.control('', [Validators.required, Validators.email]));
      details.addControl('gender', this.fb.control('', Validators.required));
      details.addControl('specialization', this.fb.control('', Validators.required));
      details.addControl('department', this.fb.control('', Validators.required));
      details.addControl('password', this.fb.control('', Validators.required));
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
    switch (formData.role) {
      case 'patient':
        this.patients.push(formData);
        localStorage.setItem('patients', JSON.stringify(this.patients));
        alert("Registered New user")
        this.router.navigate(['/login'])
        console.log(this.patients)
        break;
      case 'doctor':
        this.doctors.push(formData);
        localStorage.setItem('doctors', JSON.stringify(this.doctors));
        alert("Registered New user")
        this.router.navigate(['/login'])
        console.log(this.doctors)
        break;
      case 'staff':
        this.staff.push(formData);
        localStorage.setItem('staff', JSON.stringify(this.staff));
        alert("Registered New user")
        this.router.navigate(['/login'])
        console.log(this.staff)
        break;
  }
}

  onCancel() {
    this.router.navigate(['/login'])
    this.registrationForm.reset();
  }
}