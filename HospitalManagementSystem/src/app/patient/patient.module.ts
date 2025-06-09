import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PatientListComponent } from './patient-list/patient-list.component';
import { MedicalRecordsComponent } from './medical-records/medical-records.component';
import { PatientDetailComponent } from './patient-detail/patient-detail.component';


@NgModule({
  declarations: [
    PatientListComponent,
    MedicalRecordsComponent,
    PatientDetailComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    SharedModule
  ]
})
export class PatientModule { }
