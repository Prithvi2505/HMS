import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Staff } from 'src/app/Model/staff';
import { MatDialog } from '@angular/material/dialog';
import { Doctor } from 'src/app/Model/doctor';
import { Patient } from 'src/app/Model/patient';
import { ShowDetailComponent } from 'src/app/shared/show-detail/show-detail.component'; 
import { selectStaffList } from 'src/app/Ngrx/staff/staff.selector';
import { loadStaff } from 'src/app/Ngrx/staff/staff.action';
import { TokenService } from 'src/app/services/token.service';


@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  allStaff: Staff[] = [];
  filteredStaff: Staff[] = [];
  loggedInUserId: number | null = null;
  role!: string;

  constructor(private store: Store, private dialog: MatDialog,private tokenService:TokenService) {}

  ngOnInit(): void {
    this.role = this.tokenService.getUserRole()!;
    this.loggedInUserId = this.tokenService.getUserId()!;

    this.store.dispatch(loadStaff());

    this.store.select(selectStaffList).subscribe(staff => {
      this.allStaff = staff;
      this.filteredStaff = [...staff];
    });
  }

  showDetails(item: Staff | Doctor | Patient): void {
    this.dialog.open(ShowDetailComponent, {
      width: '400px',
      data: item
    });
  }

  onSearch(term: string): void {
    this.filteredStaff = this.allStaff.filter(s =>
      s.id.toString().includes(term) ||
      s.name.toLowerCase().includes(term) ||
      s.email.toLowerCase().includes(term)
    );
  }

}