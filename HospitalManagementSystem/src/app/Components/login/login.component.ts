
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { login } from 'src/app/Store/auth.action';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service'; 
import { TokenService } from 'src/app/services/token.service';
import { showSuccess, showError } from 'src/app/Store/snackbar/snackbar.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    id:number = 0
    role:string ='';
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
    private authService: AuthService ,
    private tokenService: TokenService // Inject service
  ) {}

  onLogin() {
    if (this.loginForm.invalid) {
      alert('Please enter all fields');
      return;
    }

    const loginData = this.loginForm.value as any;

    this.authService.login(loginData).subscribe({
      next: (res) => {
        console.log('Login response:', res);
        localStorage.setItem('auth', JSON.stringify({token: res.token}));
        this.role = this.tokenService.getUserRole()!;
        this.id = this.tokenService.getUserId()!;
        this.store.dispatch(login({ userid: this.id, role: this.role }));

        console.log(this.tokenService.getUserEmail());
        console.log(this.tokenService.getUserId());
        console.log(this.tokenService.getUserRole());
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Login error:', err);
        this.store.dispatch(showError({ message: err.error?.message || 'Invalid credentials or server error' }));
      }
    });
  }

  newUser() {
    this.router.navigate(['register']);
  }
}
