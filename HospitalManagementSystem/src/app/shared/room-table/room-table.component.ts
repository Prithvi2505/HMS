import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from 'src/app/services/room.service';
import { TokenService } from 'src/app/services/token.service';
import { Store } from '@ngrx/store';
import { showSuccess, showError } from 'src/app/Ngrx/snackbar/snackbar.actions';
import { RoomFormDialogComponent } from '../room-form-dialog/room-form-dialog.component';
import { AssignStaffRoomDialogComponent } from '../assign-staff-room-dialog/assign-staff-room-dialog.component';
import { SpinnerService } from 'src/app/services/spinner.service';

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
    private tokenService:TokenService,private store:Store,
    private spinnerService:SpinnerService
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
    const dialogRef = this.dialog.open(RoomFormDialogComponent, {
      width: '500px',
      data: { mode: 'add' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadRooms();
      }
    });
  }

  assignStaffToRoom() {
    const dialogRef = this.dialog.open(AssignStaffRoomDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadRooms();
      }
    });
  }
  onUpdate(item: any) {
    const dialogRef = this.dialog.open(RoomFormDialogComponent, {
      width: '400px',
       data: {
      mode: 'edit',
      initialValues: item
    }
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
    this.spinnerService.show();
    this.roomService.getAllRooms().subscribe({
      next: (rooms) => {
        this.dataSource = rooms;
        this.spinnerService.hide();
      },
      error: (err) => {
        console.error('Failed to fetch Rooms:', err);
        this.spinnerService.hide();
      }
    });
  }

}
