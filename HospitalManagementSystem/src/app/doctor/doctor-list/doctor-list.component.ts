import { DoctorDetailComponent } from './../doctor-detail/doctor-detail.component';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { List } from 'src/app/type/list';
import { Store } from '@ngrx/store';
import { selectrole } from 'src/app/Store/auth.seletor';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent {
  role:string|null =""
  constructor(private dialog : MatDialog,private router :Router, private store:Store){
    this.store.select(selectrole).subscribe(auth => {
      this.role = auth
    })
  }
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

    showDetails() {
        const detailPopup = this.dialog.open(DoctorDetailComponent, {
          enterAnimationDuration: '800ms',
          exitAnimationDuration: '400ms',
          width: '60%',
          panelClass: 'custom-dialog-container'
        });
    
        detailPopup.afterClosed().subscribe(result => {
          console.log('Detail dialog closed', result);
          this.router.navigate(['doctor']);
        });
      }
       
         opendialog(){
       
         }
}
