import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { logout } from 'src/app/Ngrx/auth.action';
import { TokenService } from 'src/app/services/token.service';
import {
  selectisAuthenticated,
  selectrole,
  selectUserId,
} from 'src/app/Ngrx/auth.seletor';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isAuthenticated = false;
  role: string | null = '';
  userId: number | null = 0;
  isMoreActive: boolean = false;

  constructor(
    private router: Router,
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

    // Update isMoreActive on every route change
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkMoreActive();
      }
    });
  }

  checkMoreActive(): void {
    const path = this.router.url;
    this.isMoreActive =
      path.includes('/appointments') ||
      path.includes('/bills') ||
      path.includes('/rooms');
  }

  onLogout(): void {
    this.store.dispatch(logout());
    localStorage.removeItem('auth');
    this.router.navigate(['/login']);
  }
}
