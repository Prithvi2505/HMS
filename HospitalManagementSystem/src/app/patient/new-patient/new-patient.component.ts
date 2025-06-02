import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.component.html',
  styleUrls: ['./new-patient.component.css']
})
export class NewPatientComponent {

  constructor(private router:Router){}

  genders: String[]  = [
  'Male','Female'
]

  reNavigate() {
    this.router.navigate(['patient']);
  }

}
