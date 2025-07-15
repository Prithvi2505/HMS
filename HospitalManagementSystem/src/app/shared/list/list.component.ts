import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { EditUserComponent } from '../edit-user/edit-user.component'; 
import { Doctor } from 'src/app/Model/doctor';
import { List } from 'src/app/Model/list';
import { Patient } from 'src/app/Model/patient';
import { Staff } from 'src/app/Model/staff';

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
 @Input() loggedInUserId: number | null = null;
 @Input() role!: string; 
 @Input() listType!: 'patient' | 'doctor' | 'staff';


   onButtonClick() {
    if (this.action) {
      this.action(this.showList as Patient | Doctor | Staff); 
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
    width: '500px',
    data: { ...this.showList, role: this.listType} 
  });

  dialogRef.afterClosed().subscribe(result => {
  if (result?.action === 'update' || result?.action === 'delete') {
    this.onButtonClick();
  }
});
}
shouldShowEditIcon(): boolean {
  if (this.role === 'doctor' && (this.listType === 'patient' || this.listType === 'staff')) {
    return true;
  }
  return this.loggedInUserId === this.showList.id && this.role === this.listType;
}

}
