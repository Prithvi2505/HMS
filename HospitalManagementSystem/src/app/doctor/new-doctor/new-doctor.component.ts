import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-doctor',
  templateUrl: './new-doctor.component.html',
  styleUrls: ['./new-doctor.component.css']
})
export class NewDoctorComponent {
constructor(private router:Router){}

  reNavigate() {
    this.router.navigate(['doctor']);
  }
}
