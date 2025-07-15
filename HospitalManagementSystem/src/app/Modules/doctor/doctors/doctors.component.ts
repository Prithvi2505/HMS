import { TokenService } from 'src/app/services/token.service'; 
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Doctor } from 'src/app/Model/doctor';
import { MatDialog } from '@angular/material/dialog';
import { Patient } from 'src/app/Model/patient';
import { Staff } from 'src/app/Model/staff';
import { ShowDetailComponent } from 'src/app/shared/show-detail/show-detail.component';  
import { selectDoctorList } from 'src/app/Ngrx/doctor/doctor.selector';
import { loadDoctors } from 'src/app/Ngrx/doctor/doctor.action';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {
  allDoctors: Doctor[] = [];
  filteredDoctors: Doctor[] = [];
  loggedInUserId: number | null = null;
  role!: string;

  constructor(private store: Store, private dialog: MatDialog,private tokenService:TokenService) {}

  ngOnInit(): void { 
    this.role = this.tokenService.getUserRole()!;
    this.loggedInUserId = this.tokenService.getUserId()!;

    this.store.dispatch(loadDoctors());
    this.store.select(selectDoctorList).subscribe(doctors => {
      this.allDoctors = doctors;
      this.filteredDoctors = [...doctors];
    });
  }

  showDetails(item: Doctor | Patient | Staff): void {
    this.dialog.open(ShowDetailComponent, {
      width: '500px',
      data: item
    });
  }
  onSearch(term: string): void {
    this.filteredDoctors = this.allDoctors.filter(d =>
      d.id.toString().includes(term) ||
      d.name.toLowerCase().includes(term) ||
      d.email.toLowerCase().includes(term)
    );
  }

}