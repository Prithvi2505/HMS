import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-staff',
  templateUrl: './new-staff.component.html',
  styleUrls: ['./new-staff.component.css']
})
export class NewStaffComponent {
constructor(private router:Router){}

  genders: String[]  = [
  'Male','Female'
]

  reNavigate() {
    this.router.navigate(['staff']);
  }
}
