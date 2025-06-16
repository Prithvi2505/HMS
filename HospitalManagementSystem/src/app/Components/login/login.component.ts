
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { login } from 'src/app/Store/auth.action';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required)
  });

  roles = [
    { value: 'patient', viewValue: 'Patient' },
    { value: 'doctor', viewValue: 'Doctor' },
    { value: 'staff', viewValue: 'Staff' }
  ];

  constructor(
    private router: Router,
    private store: Store,
    private authService: AuthService // Inject service
  ) {}

  onLogin() {
    if (this.loginForm.invalid) {
      alert('Please enter all fields');
      return;
    }

    const loginData = this.loginForm.value as any;

    this.authService.login(loginData).subscribe({
      next: (res) => {
        localStorage.setItem('auth', JSON.stringify({
          token: res.token,
          userid: res.userId,
          role: res.role
        }));
        this.store.dispatch(login({ userid: res.userId.toString(), role: res.role }));
        this.router.navigate(['/home']);
      },
      error: () => {
        alert('Invalid credentials or server error');
      }
    });
  }

  newUser() {
    this.router.navigate(['register']);
  }
}
