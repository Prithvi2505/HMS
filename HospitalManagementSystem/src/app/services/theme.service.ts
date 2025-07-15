import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkTheme = new BehaviorSubject<boolean>(false);
  public isDarkTheme$ = this.isDarkTheme.asObservable();

  constructor() {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('isDarkTheme');
    if (savedTheme) {
      this.isDarkTheme.next(JSON.parse(savedTheme));
    }
    
    // Apply initial theme
    this.applyTheme(this.isDarkTheme.value);
  }

  toggleTheme(): void {
    const newTheme = !this.isDarkTheme.value;
    this.isDarkTheme.next(newTheme);
    localStorage.setItem('isDarkTheme', JSON.stringify(newTheme));
    this.applyTheme(newTheme);
  }

  private applyTheme(isDark: boolean): void {
    if (isDark) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }

  getCurrentTheme(): boolean {
    return this.isDarkTheme.value;
  }
}