import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { logout } from 'src/app/Store/auth.action';
import { selectisAuthenticated, selectUserId } from 'src/app/Store/auth.seletor';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isAuthenticated:boolean = false;
constructor(private route : Router, private store:Store){
  this.store.select(selectisAuthenticated).subscribe(auth => {
    this.isAuthenticated = auth;
    console.log(this.isAuthenticated);
  })
}


onLogout() {
  this.store.dispatch(logout());
  localStorage.clear()
  this.route.navigate(['login']);
}


}
