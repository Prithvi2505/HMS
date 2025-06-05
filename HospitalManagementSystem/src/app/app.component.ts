import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAuthState } from './Store/auth.seletor';
import { login } from './Store/auth.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HospitalManagementSystem';
  constructor(private store:Store){
      const saved = localStorage.getItem('auth');
        if(saved){
          const auth = JSON.parse(saved)
          this.store.dispatch(login(auth))
        }
  }
  
}
