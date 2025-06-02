import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorRoutingModule } from './doctor-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { NewDoctorComponent } from './new-doctor/new-doctor.component';


@NgModule({
  declarations: [
    DoctorListComponent,
    NewDoctorComponent
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    SharedModule
  ]
})
export class DoctorModule { }
