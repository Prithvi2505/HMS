
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { login } from 'src/app/Ngrx/auth/auth.action';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service'; 
import { TokenService } from 'src/app/services/token.service';
import { showSuccess, showError } from 'src/app/Ngrx/snackbar/snackbar.actions';

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
    password: new FormControl('', Validators.required)
  });

  constructor(
    private router: Router,
    private store: Store,
    private authService: AuthService ,
    private tokenService: TokenService
  ) {}

  onLogin() {
    if (this.loginForm.invalid) {
      this.store.dispatch(showError({message: 'Please enter all fields' }));
      return;
    }

    const loginData = this.loginForm.value as any;

    this.authService.login(loginData).subscribe({
      next: (res) => {
        localStorage.setItem('auth', JSON.stringify({token: res.token}));
        this.role = this.tokenService.getUserRole()!;
        this.id = this.tokenService.getUserId()!;
        this.store.dispatch(login({ userid: this.id, role: this.role }));
        this.router.navigate(['/home']);
        this.store.dispatch(showSuccess({message: 'LoggedIn Successfully' }));
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
