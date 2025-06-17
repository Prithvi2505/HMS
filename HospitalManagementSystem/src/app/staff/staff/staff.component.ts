import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Staff } from 'src/app/Model/staff';
import { MatDialog } from '@angular/material/dialog';
import { Doctor } from 'src/app/Model/doctor';
import { Patient } from 'src/app/Model/patient';
import { ShowDetailComponent } from 'src/app/shared/show-detail/show-detail.component';
import { selectStaffList } from 'src/app/Store/staff/staff.selector';
import { loadStaff } from 'src/app/Store/staff/staff.action';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  staffList$: Observable<Staff[]> = this.store.select(selectStaffList);
  role: string = 'staff';

  constructor(private store: Store, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.dispatch(loadStaff());
  }

  showDetails(item: Staff | Doctor | Patient): void {
    this.dialog.open(ShowDetailComponent, {
      width: '400px',
      data: item
    });
  }

}