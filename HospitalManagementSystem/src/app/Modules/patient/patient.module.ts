import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { SharedModule } from 'src/app/shared/shared.module'; 
import { MedicalRecordsComponent } from './medical-records/medical-records.component';
import { PatientsComponent } from './patients/patients.component';
import { MedicalRecordFormDialogComponent } from './medical-record-form-dialog/medical-record-form-dialog.component';


@NgModule({
  declarations: [
    MedicalRecordsComponent,
    PatientsComponent,
    MedicalRecordFormDialogComponent,
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    SharedModule
  ]
})
export class PatientModule { }
