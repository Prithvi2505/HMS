import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MedicalRecordsComponent } from './medical-records/medical-records.component';
import { PatientsComponent } from './patients/patients.component';


@NgModule({
  declarations: [
    MedicalRecordsComponent,
    PatientsComponent,
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    SharedModule
  ]
})
export class PatientModule { }
