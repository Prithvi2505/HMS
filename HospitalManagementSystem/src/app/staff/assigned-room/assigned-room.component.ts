import { Component,OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AssignStaffRoomComponent } from 'src/app/dialogs/assign-staff-room/assign-staff-room.component';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from 'src/app/services/room.service';
import { RoomWithStaff } from 'src/app/Model/room';

@Component({
  selector: 'app-assigned-room',
  templateUrl: './assigned-room.component.html',
  styleUrls: ['./assigned-room.component.css']
})
export class AssignedRoomComponent implements OnInit {
  rooms:RoomWithStaff[] = []
  staffId:number = 0;
  dataSource: any[] = [];
  displayedColumns: string[] = [];
  columnHeaders: { [key: string]: string } = {};
  user = { userid: '', role: '' };

  constructor(private dialog: MatDialog, private route:ActivatedRoute, private roomService:RoomService) { }

  ngOnInit() {
    const userStr = localStorage.getItem('auth');
    if (userStr) {
      this.user = JSON.parse(userStr);
    }
    const { userid, role } = this.user;
    const baseColumns = ['roomId', 'type', 'capacity', 'price', 'staffId'];
    const actionColumns = ['action', 'remove'];

    this.displayedColumns = baseColumns;
    if (this.user.role === 'doctor') {
  this.displayedColumns = [...baseColumns, ...actionColumns];
}
    this.columnHeaders = {
      roomId: 'Room Id', type: 'Type', capacity: 'Capacity', price: 'Price',
      staffId: 'Assigned Staff ID', action: 'Action', remove: 'Remove'
    };
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.staffId = id ? Number(id) : 0;
      console.log(this.staffId);
      this.loadRooms(this.staffId);
    });
  }

  assignStaffToRoom() {
    const dialogRef = this.dialog.open(AssignStaffRoomComponent, {
      width: '500px',
      data: { staffId: this.staffId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadRooms(this.staffId);
      }
    });
  }

  onUpdate(item: any) { console.log('Update', item); }
  onDelete(item: any) { console.log('Delete', item); }

  loadRooms(staffId: number) {
    this.roomService.getRoomsByStaff(staffId).subscribe({
      next: (rooms) => this.dataSource = rooms,
      error: (err) => console.error('Failed to fetch Rooms:', err)
    });
  }

}
