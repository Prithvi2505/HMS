import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AssignStaffRoomComponent } from 'src/app/dialogs/assign-staff-room/assign-staff-room.component';

@Component({
  selector: 'app-assigned-room',
  templateUrl: './assigned-room.component.html',
  styleUrls: ['./assigned-room.component.css']
})
export class AssignedRoomComponent {
  dataSource: any[] = [];
  displayedColumns: string[] = [];
  columnHeaders: { [key: string]: string } = {};
  user = { userid: '', role: '' };

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    const userStr = localStorage.getItem('auth');
    if (userStr) {
      this.user = JSON.parse(userStr);
    }
    const all: any = [
      { id: 1, type: 'ICU', capacity: 2, price: 2000, assignedStaffEmail: 'staff1@mail.com' },
      { id: 2, type: 'General', capacity: 4, price: 800, assignedStaffEmail: 'staff2@mail.com' },
      { id: 3, type: 'Private', capacity: 1, price: 5000, assignedStaffEmail: 'staff1@mail.com' }
    ];

    this.dataSource = all;
    const baseColumns = ['id', 'type', 'capacity', 'price', 'assignedStaffEmail'];
    const actionColumns = ['action', 'remove'];

    this.displayedColumns = baseColumns;
    const role = this.user.role.toLowerCase();
if (role === 'doctor') {
  this.displayedColumns = [...baseColumns, ...actionColumns];
}
    this.columnHeaders = {
      id: 'ID', type: 'Type', capacity: 'Capacity', price: 'Price',
      assignedStaffEmail: 'Assigned Staff', action: 'Action', remove: 'Remove'
    };
  }

  assignStaffToRoom() {
    const dialogRef = this.dialog.open(AssignStaffRoomComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed');
      const all = localStorage.getItem('staffToRooms');
      this.dataSource = all ? JSON.parse(all) : [];
    });
  }
  onUpdate(item: any) { console.log('Update', item); }
  onDelete(item: any) { console.log('Delete', item); }

}
