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
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    role: new FormControl('',Validators.required)
  })
    
  
  constructor(private route : Router, private store:Store){ }
  roles: role[] = [
    {value: 'patient', viewValue: 'Patient'},
    {value: 'doctor', viewValue: 'Doctor'},
    {value: 'staff', viewValue: 'Staff'},
  ];

  onLogin() {
  if (this.loginForm.invalid) {
    alert("Please enter all fields");
    return;
  }

  const email = this.loginForm.value.email!;
  console.log(email)
  const password = this.loginForm.value.password!;
  console.log(password)
  const role = this.loginForm.value.role!;
  console.log(role)

  // Map role to correct localStorage key
  const roleKeyMap: { [key: string]: string } = {
    patient: 'patients',
    doctor: 'doctors',
    staff: 'staff' // Corrected — no 's' here
  };

  const storageKey = roleKeyMap[role];
  if (!storageKey) {
    alert("Invalid role selected.");
    return;
  }

  const storedUsers = localStorage.getItem(storageKey);
  // console.log(storedUsers)
  if (!storedUsers) {
    alert("No users registered under this role.");
    return;
  }

  let users;
  try {
    users = JSON.parse(storedUsers);
    console.log(users)
    if (!Array.isArray(users)) throw new Error();
  } catch {
    alert("Corrupted data for this role.");
    return;
  }

  const foundUser = users.find((user: any) => user.details.email === email);


  if (!foundUser) {
    alert('No user found with this email for the selected role.');
    return;
  }

  if (foundUser.details.password !== password) {
    alert('Incorrect password. Please try again.');
    return;
  }

  // ✅ Successful login
  this.store.dispatch(login({ userid: email, role: role }));
  localStorage.setItem('auth', JSON.stringify({ userid: email, role: role }));
  this.route.navigate(['/home']);
}

  
  newUser(){
  this.route.navigate(['register'])
}

}