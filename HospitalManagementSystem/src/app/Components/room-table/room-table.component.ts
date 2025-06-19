import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AddRoomComponent } from 'src/app/dialogs/add-room/add-room.component';
import { AssignStaffRoomComponent } from 'src/app/dialogs/assign-staff-room/assign-staff-room.component';
import { EditRoomComponent } from 'src/app/dialogs/edit-room/edit-room.component';
import { RoomService } from 'src/app/services/room.service';
import { TokenService } from 'src/app/services/token.service';
import { Store } from '@ngrx/store';
import { showSuccess, showError } from 'src/app/Store/snackbar/snackbar.actions';

@Component({
  selector: 'app-room-table',
  templateUrl: './room-table.component.html',
  styleUrls: ['./room-table.component.css']
})
export class RoomTableComponent implements OnInit {
  dataSource: any[] = [];
  displayedColumns: string[] = [];
  columnHeaders: { [key: string]: string } = {};
  user = { userid: 0, role: '' };
  constructor(private dialog: MatDialog, private route: ActivatedRoute, private roomService: RoomService,
    private tokenService:TokenService,private store:Store
  ) { };

  ngOnInit() {
   this.user.role = this.tokenService.getUserRole()!;
   this.user.userid = this.tokenService.getUserId()!;
    const { userid, role } = this.user;

    const baseColumns = ['id', 'type', 'capacity', 'price'];
    const actionColumns = ['action', 'remove'];

    this.displayedColumns = baseColumns;
    if (this.user.role == 'doctor') {
      this.displayedColumns = [...baseColumns, ...actionColumns];
    }
    this.columnHeaders = {
      id: 'Room Id', type: 'Type', capacity: 'Capacity', price: 'Price', action: 'Action', remove: 'Remove'
    };
    this.loadRooms();
  }
  addRoom() {
    const dialogRef = this.dialog.open(AddRoomComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadRooms();
      }
    });
  }

  assignStaffToRoom() {
    const dialogRef = this.dialog.open(AssignStaffRoomComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadRooms();
      }
    });
  }
  onUpdate(item: any) {
    const dialogRef = this.dialog.open(EditRoomComponent, {
      width: '400px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadRooms();
      }
    });
  }
  onDelete(item: any) {
    const confirmDelete = confirm(`Are you sure you want to delete room ID ${item.id}?`);
    if (!confirmDelete) return;

    this.roomService.deleteRoom(item.id).subscribe({
      next: () => {
        this.store.dispatch(showSuccess({ message: 'Room deleted successfully!' }));
        this.loadRooms(); 
      },
      error: (err) => {
        console.error('Failed to delete room:', err);
        this.store.dispatch(showError({ message: err.error?.message || 'Failed to delete room.' }));
      }
    });
  }

  loadRooms() {
    this.roomService.getAllRooms().subscribe({
      next: (rooms) => this.dataSource = rooms,
      error: (err) => console.error('Failed to fetch Rooms:', err)
    });
  }

}
