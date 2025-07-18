import { Component,OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from 'src/app/services/room.service';
import { RoomWithStaff } from 'src/app/Model/room';
import { TokenService } from 'src/app/services/token.service';
import { Store } from '@ngrx/store';
import { showSuccess, showError } from 'src/app/Ngrx/snackbar/snackbar.actions';
import { SpinnerService } from 'src/app/services/spinner.service';


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
  user = { userid: 0, role: '' };

  constructor(private dialog: MatDialog, 
    private route:ActivatedRoute, 
    private roomService:RoomService,
    private tokenService:TokenService,
    private store:Store,
    private spinnerService:SpinnerService
  ) { }

  ngOnInit() {
   this.user.role = this.tokenService.getUserRole()!;
  this.user.userid = this.tokenService.getUserId()!;
    const { userid, role } = this.user;
    const baseColumns = ['roomId', 'type', 'capacity', 'price', 'staffId'];
    const actionColumns = ['remove'];

    this.displayedColumns = baseColumns;
    if (this.user.role === 'doctor') {
  this.displayedColumns = [...baseColumns, ...actionColumns];
}
    this.columnHeaders = {
      roomId: 'Room Id', type: 'Type', capacity: 'Capacity', price: 'Price',
      staffId: 'Assigned Staff ID', remove: 'Remove'
    };
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.staffId = id ? Number(id) : 0;
      this.loadRooms(this.staffId);
    });
  }

  onUpdate(item: any) { console.log('Update', item); }
  onDelete(item: any) { 
    if (confirm(`Unassign staff ID ${item.staffId} from room ID ${item.roomId}?`)) {
    this.roomService.unassignStaffFromRoom(item.staffId, item.roomId).subscribe({
      next: () => {
        this.store.dispatch(showSuccess({ message: 'Staff unassigned from room successfully.' }));
        this.loadRooms(this.staffId);
      },
      error: (err) => {
        console.error('Failed to unassign staff:', err);
        this.store.dispatch(showError({ message: err.error?.message || 'Failed to unassign staff from room.' }));
      }
    });
  }}

  loadRooms(staffId: number) {
    this.spinnerService.show();
    this.roomService.getRoomsByStaff(staffId).subscribe({
      next: (rooms) =>{ this.dataSource = rooms;
        this.spinnerService.hide();
      },
      error: (err) => {console.error('Failed to fetch Rooms:', err);
        this.spinnerService.hide();
      }
    });
  }

}
