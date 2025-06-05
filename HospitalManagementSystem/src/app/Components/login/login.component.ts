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
    
  id =  this.loginForm.value.userid as string;
  role = this.loginForm.value.role as string;
  
  constructor(private route : Router, private store:Store){ }
  // roles: role[] = [
  //   {value: 'patient', viewValue: 'Patient'},
  //   {value: 'doctor', viewValue: 'Doctor'},
  //   {value: 'staff', viewValue: 'Staff'},
  // ];
  onLogin(){
    if(this.loginForm.valid){
      this.store.dispatch(login({userid:this.id,role:this.role}))
      localStorage.setItem('auth',JSON.stringify({userid: this.id, role: this.role}))
      console.log("Clicked")
      console.log(this.id)
      console.log(this.role)
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