import { Component } from '@angular/core';
import { List } from 'src/app/type/list';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent {
  dummyDoctors : List[]  = [
      { 
        id:"123abc",
        role:"doctor",
        name:"abcdefgh",
        gender:"male"
      },
      { 
        id:"123abd",
        role:"doctor",
        name:"Prithvi",
        gender:"male"
      },
      { 
        id:"123abe",
        role:"doctor",
        name:"Gohil",
        gender:"male"
      },
      { 
        id:"123abf",
        role:"doctor",
        name:"xyzabc",
        gender:"female"
      },
    ]
}
