import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Doctor } from 'src/app/Model/doctor';
import { MatDialog } from '@angular/material/dialog';
import { Patient } from 'src/app/Model/patient';
import { Staff } from 'src/app/Model/staff';
import { ShowDetailComponent } from 'src/app/shared/show-detail/show-detail.component';
import { selectDoctorList } from 'src/app/Store/doctor/doctor.selector';
import { loadDoctors } from 'src/app/Store/doctor/doctor.action';
import {selectUserId,selectrole} from 'src/app/Store/auth.seletor';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {
  doctors$: Observable<Doctor[]> = this.store.select(selectDoctorList);
  buttonrole: string = 'doctor';
  loggedInUserId: number | null = null;
  role!: string;

  constructor(private store: Store, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.dispatch(loadDoctors());
    this.store.select(selectUserId).subscribe(id => this.loggedInUserId = id);
    console.log(this.loggedInUserId);
  this.store.select(selectrole).subscribe(role => {
    if (role) {
      this.role = role.toLowerCase();
    }
  });
  }

  showDetails(item: Doctor | Patient | Staff): void {
    this.dialog.open(ShowDetailComponent, {
      width: '400px',
      data: item
    });
  }

}