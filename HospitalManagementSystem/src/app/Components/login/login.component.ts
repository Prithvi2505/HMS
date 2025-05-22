import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(private route : Router){}
  roles: role[] = [
    {value: 'patient', viewValue: 'Patient'},
    {value: 'doctor', viewValue: 'Doctor'},
    {value: 'staff', viewValue: 'Staff'},
  ];
  onLogin(){
    this.route.navigate(['home']);
  }
  newUser(){
  this.route.navigate(['register'])
}

}
