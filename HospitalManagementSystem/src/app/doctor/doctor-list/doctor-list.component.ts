import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { List } from 'src/app/type/list';
import { NewDoctorComponent } from '../new-doctor/new-doctor.component';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent {
  constructor(private dialog : MatDialog,private router :Router){}
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

    addDoctor(){
      const popup = this.dialog.open(NewDoctorComponent,{
             enterAnimationDuration:'1000ms',
             exitAnimationDuration:'500ms',
             width:'50%',
            panelClass: 'custom-dialog-container'
           });
           popup.afterClosed().subscribe( res => {
             this.router.navigate(['doctor']);
           })
           
         }
       
         opendialog(){
       
         }
}
