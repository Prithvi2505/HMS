import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { EditUserComponent } from 'src/app/dialogs/edit-user/edit-user.component';
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
  constructor(private router:Router,private dialog:MatDialog){
  }

 @Input() showList!: List;
 @Input() action!:(item: Patient|Doctor|Staff) => void;
 @Input() role!:string;

   onButtonClick() {
    if (this.action) {
      this.action(this.showList as Patient | Doctor | Staff); // Pass the item data to parent
    }
  }
  navToMed(id:any){
    this.router.navigate([`/patient/${id}/medical-records`]);
  }
  staffAssignedToRoom(id:any){
    this.router.navigate([`/staff/${id}/assigned-rooms`]);
  }
  openEditDialog() {
  const dialogRef = this.dialog.open(EditUserComponent, {
    width: '400px',
    data: { ...this.showList, role: this.role }  // pass role and data
  });

  dialogRef.afterClosed().subscribe(result => {
  if (result?.action === 'update' || result?.action === 'delete') {
    this.onButtonClick(); // Trigger parent's action to re-fetch data
  }
});
}
}
