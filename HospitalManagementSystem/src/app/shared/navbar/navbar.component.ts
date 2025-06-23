import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TokenService } from 'src/app/services/token.service';
import { logout } from 'src/app/Store/auth.action';
import {
  selectisAuthenticated,
  selectrole,
  selectUserId,
} from 'src/app/Store/auth.seletor';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isAuthenticated: boolean = false;
  role: string | null = '';
  userId: number | null = 0;
  isMoreActive: boolean = false;

  constructor(
    private route: Router,
    private store: Store,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.store.select(selectisAuthenticated).subscribe((auth) => {
      this.isAuthenticated = auth;

      if (auth) {
        this.role = this.tokenService.getUserRole() || '';
        this.userId = this.tokenService.getUserId() || 0;
      } else {
        this.role = '';
        this.userId = 0;
      }
    });

    this.route.events.subscribe(() => this.checkMoreActive());
  }

  checkMoreActive(): void {
    const path = this.route.url;
    this.isMoreActive =
      path.includes('/appointments') ||
      path.includes('/bills') ||
      path.includes('/rooms');
  }
  onLogout() {
    this.store.dispatch(logout());
    localStorage.removeItem('auth');
    this.route.navigate(['login']);
  }
}
