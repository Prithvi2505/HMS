import { Component } from '@angular/core';
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
export class RegisterComponent {
constructor(private route:Router){}
roles: role[] = [
    {value: 'patient', viewValue: 'Patient'},
    {value: 'doctor', viewValue: 'Doctor'},
    {value: 'staff', viewValue: 'Staff'},
  ];
genders: String[]  = [
  'Male','Female'
]
onRegister(){
this.route.navigate(['login']);
}
onCancel() {
this.route.navigate(['login']);
}
}