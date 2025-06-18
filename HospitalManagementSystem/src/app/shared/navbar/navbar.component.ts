import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { logout } from 'src/app/Store/auth.action';
import { selectisAuthenticated, selectrole, selectUserId } from 'src/app/Store/auth.seletor';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isAuthenticated:boolean = false;
  role:string|null = "";
  userId:number|null = 0 ;
constructor(private route : Router, private store:Store){
  this.store.select(selectisAuthenticated).subscribe(auth => {
    this.isAuthenticated = auth;
    console.log(this.isAuthenticated);
  })
  this.store.select(selectrole).subscribe(auth => {
    this.role = auth;
  })
  this.store.select(selectUserId).subscribe(auth => {
    this.userId = auth;
  })
}


onLogout() {
  this.store.dispatch(logout());
  localStorage.removeItem('auth')
  this.route.navigate(['login']);
}


}
