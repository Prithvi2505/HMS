import { Component } from '@angular/core';
import { List } from 'src/app/type/list';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css']
})
export class StaffListComponent {

  dummyStaff : List[]  = [
      { 
        id:"123abc",
        role:"staff",
        name:"abcdefgh",
        gender:"male"
      },
      { 
        id:"123abd",
        role:"staff",
        name:"Prithvi",
        gender:"male"
      },
      { 
        id:"123abe",
        role:"staff",
        name:"Gohil",
        gender:"male"
      },
      { 
        id:"123abf",
        role:"staff",
        name:"xyzabc",
        gender:"female"
      },
    ]
}
