import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Doctor } from 'src/app/Model/doctor';
import { List } from 'src/app/Model/list';
import { Patient } from 'src/app/Model/patient';
import { Staff } from 'src/app/Model/staff';
import { selectrole } from 'src/app/Store/auth.seletor';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  role$:string|null = ""

  constructor(private store:Store,private router:Router){
    this.store.select(selectrole).subscribe(auth => {
      this.role$ = auth
    })
  }

 @Input() showList!: List;
 @Input() action!:(item: Patient|Doctor|Staff) => void;


   onButtonClick() {
    if (this.action) {
      this.action(this.showList as Patient | Doctor | Staff); // Pass the item data to parent
    }
  }
  navToMed(){
    this.router.navigate(['/patient/medicalRecord']);
  }
}
