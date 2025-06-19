import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Patient } from 'src/app/Model/patient';
import { Doctor } from 'src/app/Model/doctor';
import { Staff } from 'src/app/Model/staff';
import { ShowDetailComponent } from 'src/app/shared/show-detail/show-detail.component';
import { selectPatientList } from 'src/app/Store/patient/patient.selector';
import { loadPatients } from 'src/app/Store/patient/patient.action';
import {selectUserId,selectrole} from 'src/app/Store/auth.seletor';
import { TokenService } from 'src/app/services/token.service';


@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  patients$: Observable<Patient[]> = this.store.select(selectPatientList);
  loggedInUserId: number | null = null;
  role!: string;

  constructor(private store: Store, private dialog: MatDialog,private tokenService:TokenService) { }

  ngOnInit(): void {
    this.store.dispatch(loadPatients());
    this.role = this.tokenService.getUserRole()!;
    this.loggedInUserId = this.tokenService.getUserId()!;
  }

  showDetails(item: Patient | Doctor | Staff): void {
    this.dialog.open(ShowDetailComponent, {
      width: '400px',
      data: item
    });
  }
}