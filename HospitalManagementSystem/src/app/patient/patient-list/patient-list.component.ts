import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { List } from 'src/app/type/list';
import { NewPatientComponent } from '../new-patient/new-patient.component';
import { PatientDetailComponent } from '../patient-detail/patient-detail.component';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent {

  constructor(private dialog : MatDialog,private router :Router){}
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

  addPatient(){
    const popup = this.dialog.open(NewPatientComponent,{
       enterAnimationDuration:'1000ms',
       exitAnimationDuration:'500ms',
       width:'50%',
      panelClass: 'custom-dialog-container'
     });
     popup.afterClosed().subscribe( res => {
       this.router.navigate(['patient']);
     })
     
   }
 
   

   showDetails() {
    const detailPopup = this.dialog.open(PatientDetailComponent, {
      enterAnimationDuration: '800ms',
      exitAnimationDuration: '400ms',
      width: '60%',
      panelClass: 'custom-dialog-container'
    });

    detailPopup.afterClosed().subscribe(result => {
      console.log('Detail dialog closed', result);
      this.router.navigate(['patient']);
    });
  }

   opendialog(){
 
   }

}
