import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorRoutingModule } from './doctor-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { DoctorDetailComponent } from './doctor-detail/doctor-detail.component';


@NgModule({
  declarations: [
    DoctorListComponent,
    DoctorDetailComponent
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    SharedModule
  ]
})
export class DoctorModule { }
