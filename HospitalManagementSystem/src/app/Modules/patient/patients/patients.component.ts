import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { Patient } from 'src/app/Model/patient';
import { Doctor } from 'src/app/Model/doctor';
import { Staff } from 'src/app/Model/staff';
import { ShowDetailComponent } from 'src/app/shared/show-detail/show-detail.component'; 
import { selectPatientList } from 'src/app/Ngrx/patient/patient.selector';
import { loadPatients } from 'src/app/Ngrx/patient/patient.action';
import { TokenService } from 'src/app/services/token.service';
import { SpinnerService } from 'src/app/services/spinner.service';


@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  allPatients: Patient[] = [];
  filteredPatients: Patient[] = [];
  loggedInUserId: number | null = null;
  role!: string;

  constructor(private store: Store, 
    private dialog: MatDialog,
    private tokenService:TokenService,
    private spinnerService:SpinnerService
  ) { }

  ngOnInit(): void {
    this.spinnerService.show()
    this.role = this.tokenService.getUserRole()!;
    this.loggedInUserId = this.tokenService.getUserId()!;

    this.store.dispatch(loadPatients());
    this.spinnerService.hide()

    this.store.select(selectPatientList).subscribe(patients => {
      this.allPatients = patients;
      this.filteredPatients = [...patients];
    });
  }

  showDetails(item: Patient | Doctor | Staff): void {
    this.dialog.open(ShowDetailComponent, {
      width: '400px',
      data: item
    });
  }
  onSearch(term: string): void {
    this.filteredPatients = this.allPatients.filter(p =>
      p.id.toString().includes(term) ||
      p.name.toLowerCase().includes(term) ||
      p.email.toLowerCase().includes(term)
    );
  }
}