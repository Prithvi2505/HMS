import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { List } from 'src/app/type/list';
import { NewStaffComponent } from '../new-staff/new-staff.component';
import { StaffDetailComponent } from '../staff-detail/staff-detail.component';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css']
})
export class StaffListComponent {

  constructor( private dialog:MatDialog, private router: Router){}
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

    

    addStaff() {
      const popup = this.dialog.open(NewStaffComponent,{
                   enterAnimationDuration:'1000ms',
                   exitAnimationDuration:'500ms',
                   width:'50%',
                  panelClass: 'custom-dialog-container'
                 });
                 popup.afterClosed().subscribe( res => {
                   this.router.navigate(['satff']);
                 })
                 
               }
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
