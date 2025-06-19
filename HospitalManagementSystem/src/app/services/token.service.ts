import { Injectable } from '@angular/core';
import jwt_decode, { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  getToken(): string | null {
    const auth = localStorage.getItem('auth');
    if (!auth) return null;

    try {
      const parsed = JSON.parse(auth);
      return parsed.token || null;
    } catch (error) {
      console.error('Invalid auth object in localStorage:', error);
      return null;
    }
  }

  decodeToken(): any | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  }

  getUserEmail(): string | null {
    const decoded = this.decodeToken();
    return decoded?.sub || null;
  }

  getUserRole(): string | null {
    const decoded = this.decodeToken();
    return decoded?.role || null;
  }

  getUserId(): number | null {
    const decoded = this.decodeToken();
    return decoded?.id || null;
  }

  isTokenExpired(): boolean {
    const decoded = this.decodeToken();
    if (!decoded || !decoded.exp) return true;

    const exp = decoded.exp;
    const now = Math.floor(new Date().getTime() / 1000);
    return exp < now;
  }
}
