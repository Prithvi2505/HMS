import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { login } from 'src/app/Store/auth.action';
import { FormControl, FormGroup, Validators } from '@angular/forms';


interface role {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    
  
  loginForm = new FormGroup({
    userid: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    role: new FormControl('',Validators.required)
  })
    
  
  constructor(private route : Router, private store:Store){ }
  roles: role[] = [
    {value: 'patient', viewValue: 'Patient'},
    {value: 'doctor', viewValue: 'Doctor'},
    {value: 'staff', viewValue: 'Staff'},
  ];
  onLogin(){
    if(this.loginForm.valid){
    const id = this.loginForm.value.userid!;
    const role = this.loginForm.value.role!;
      this.store.dispatch(login({userid:id,role:role}))
      localStorage.setItem('auth',JSON.stringify({userid: id, role: role}))
      this.route.navigate(['/home']);
    }
    else{
      alert("Please Enter All Fields");
    }
    
  }
  newUser(){
  this.route.navigate(['register'])
}

}