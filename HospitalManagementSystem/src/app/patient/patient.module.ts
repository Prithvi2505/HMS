import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PatientListComponent } from './patient-list/patient-list.component';
import { NewPatientComponent } from './new-patient/new-patient.component';


@NgModule({
  declarations: [
    PatientListComponent,
    NewPatientComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    SharedModule
  ]
})
export class PatientModule { }
