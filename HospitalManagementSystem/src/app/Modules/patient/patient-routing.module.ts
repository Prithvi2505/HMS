import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicalRecordsComponent } from './medical-records/medical-records.component';
import { PatientsComponent } from './patients/patients.component';

const routes: Routes = [
  {path:'',component:PatientsComponent},
  {path:':id/medical-records',component:MedicalRecordsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
