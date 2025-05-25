import { Component } from '@angular/core';
import { List } from 'src/app/type/list';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent {

  dummyPatients : List[]  = [
    { 
      id:"123abc",
      role:"patient",
      name:"abcdefgh",
      gender:"male"
    },
    { 
      id:"123abd",
      role:"patient",
      name:"Prithvi",
      gender:"male"
    },
    { 
      id:"123abe",
      role:"patient",
      name:"Gohil",
      gender:"male"
    },
    { 
      id:"123abf",
      role:"patient",
      name:"xyzabc",
      gender:"female"
    },
  ]

}
