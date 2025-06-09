import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { List } from 'src/app/type/list';
import { StaffDetailComponent } from '../staff-detail/staff-detail.component';
import { selectrole } from 'src/app/Store/auth.seletor';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css']
})
export class StaffListComponent {

 role:string|null =""
  constructor(private dialog : MatDialog,private router :Router, private store:Store){
    this.store.select(selectrole).subscribe(auth => {
      this.role = auth
    })
  }
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

    showDetails() {
        const detailPopup = this.dialog.open(StaffDetailComponent, {
          enterAnimationDuration: '800ms',
          exitAnimationDuration: '400ms',
          width: '60%',
          panelClass: 'custom-dialog-container'
        });
    
        detailPopup.afterClosed().subscribe(result => {
          console.log('Detail dialog closed', result);
          this.router.navigate(['satff']);
        });
      }
             
               opendialog(){
             
               }
    

}
